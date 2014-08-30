using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Util.Data.EntityPrase;
using System.IO;
using System.Text.RegularExpressions;

namespace MIS.Util.Data.LinqGenerater
{
    /// <summary>
    /// Ling的实体类代码生成器
    /// </summary>
    public class LinqEntityCodeGenerater
    {
        private Entity[] _Entitis;
        private string _BaseNameSpace;
        private string[] _UsingNameSpaces;
        private string _Path;
        private bool _OverwriteMainCode;

        /// <summary>
        /// 生成Linq的实体代码
        /// </summary>
        /// <param name="path">路径</param>
        /// <param name="baseNameSpace">基于的命名空间</param>
        /// <param name="entities">要生成的实体</param>
        /// <param name="usingNameSpaces">需要附加的命名空间</param>
        /// <param name="overwriteMainCode">是否覆盖已有的主代码文件</param>
        public void Generate(string path, string baseNameSpace, Entity[] entities, string[] usingNameSpaces, bool overwriteMainCode)
        {
            if (!Directory.Exists(path))
                throw new ArgumentNullException("目录不存在。");

            _Path = path.EndsWith("/") ? path : path + "/";
            _Entitis = entities;
            _BaseNameSpace = baseNameSpace;
            _UsingNameSpaces = usingNameSpaces;
            _OverwriteMainCode = overwriteMainCode;

            foreach (var entity in entities)
                buildEntityCode(entity);
        }

        private void buildEntityCode(Entity entity)
        {
            var path = _Path + entity.Module;
            if (!Directory.Exists(path)) Directory.CreateDirectory(path);

            buildMainCode(entity);
            buildDesingerCode(entity);
        }
        private void buildMainCode(Entity entity)
        {
            string fileName = _Path + entity.Module + "/" + entity.Name + ".cs";
            if (!_OverwriteMainCode && File.Exists(fileName))
                return;
            if (File.Exists(fileName))
                File.Delete(fileName);

            var writer = File.CreateText(fileName);

            writeUsingNameSpace(writer, entity);
            writeNameSpaceBegin(entity, writer);

            writeClassNameBegin(entity, writer, true);
            writeClassNameEnd(writer);

            writer.WriteLine();
            writeExtentionClass(entity, writer);

            writeNameSapceEnd(writer);

            writer.Close();
        }

        private void buildDesingerCode(Entity entity)
        {
            string designerFileName = _Path + entity.Module + "/" + entity.Name + ".designer.cs";
            string mainCodeFileContent = File.ReadAllText(_Path + entity.Module + "/" + entity.Name + ".cs");

            if (File.Exists(designerFileName)) File.Delete(designerFileName);
            var writer = File.CreateText(designerFileName);

            writeUsingNameSpace(writer, entity);
            writeNameSpaceBegin(entity, writer);
            writeClassNameBegin(entity, writer, false);

            writeIdAndTimeStamp(writer);
            writer.WriteLine();

            writeFields(entity, mainCodeFileContent, writer);
            writer.WriteLine();

            writeProperties(entity, mainCodeFileContent, writer);

            writeClassNameEnd(writer);
            writeNameSapceEnd(writer);

            writer.Close();
        }

        private void writeUsingNameSpace(StreamWriter writer, Entity entity)
        {
            List<string> nsList = new List<string>();
            nsList.Add("using System;");
            nsList.Add("using System.Collections.Generic;");
            nsList.Add("using System.Data.Linq;");
            nsList.Add("using System.Linq;");
            nsList.Add("using System.Text;");
            nsList.Add("");

            foreach (var ns in _UsingNameSpaces)
                nsList.Add("using " + ns + ";");
            nsList.Add("");

            foreach (var item in entity.ItemList)
            {
                if (item.ItemType != ItemType.ForeignKey)
                    continue;
                var relatedEntity = _Entitis.Single(e => e.Name == item.EntityName);
                var ns = "using " + _BaseNameSpace + @"." + relatedEntity.Module + @";";

                if (!nsList.Contains(ns)) nsList.Add(ns);
            }

            if (!String.IsNullOrEmpty(nsList.Last())) nsList.Add("");

            foreach (var ns in nsList)
                writer.WriteLine(ns);
        }

        private void writeNameSpaceBegin(Entity entity, StreamWriter writer)
        {
            writer.WriteLine(@"namespace " + _BaseNameSpace + @"." + entity.Module);
            writer.WriteLine(@"{");
        }
        private void writeNameSapceEnd(StreamWriter writer)
        {
            writer.WriteLine(@"}");
        }

        private void writeClassNameBegin(Entity entity, StreamWriter writer, bool withBaseClass)
        {
            writer.WriteLine(@"    /// <summary>");
            writer.WriteLine(@"    /// " + entity.Title);
            writer.WriteLine(@"    /// </summary>");
            if (withBaseClass)
                writer.WriteLine(@"    public partial class {0} : Entity<{0}>", entity.Name);
            else
                writer.WriteLine(@"    public partial class {0}", entity.Name);
            writer.WriteLine(@"    {");
        }
        private void writeClassNameEnd(StreamWriter writer)
        {
            writer.WriteLine(@"    }");
        }

        private void writeExtentionClass(Entity entity, StreamWriter writer)
        {
            writer.WriteLine(@"    /// <summary>");
            writer.WriteLine(@"    /// {0}的业务扩展", entity.Title);
            writer.WriteLine(@"    /// </summary>");
            writer.WriteLine(@"    public static class {0}BusinessExtension", entity.Name);
            writer.WriteLine(@"    {");

            writer.WriteLine(@"    }");
            writer.WriteLine(@"    /// <summary>");
            writer.WriteLine(@"    /// {0}的查询扩展", entity.Title);
            writer.WriteLine(@"    /// </summary>");
            writer.WriteLine(@"    public static class {0}QueryExtension", entity.Name);
            writer.WriteLine(@"    {");
            writer.WriteLine(@"    }");

            writer.WriteLine(@"    /// <summary>");
            writer.WriteLine(@"    /// {0}的权限扩展", entity.Title);
            writer.WriteLine(@"    /// </summary>");
            writer.WriteLine(@"    public static class {0}PermissionExtension", entity.Name);
            writer.WriteLine(@"    {");
            writer.WriteLine(@"    }");
        }

        private void writeIdAndTimeStamp(StreamWriter writer)
        {
            writer.WriteLine(@"        #region ID和时间戳

        private int _ID = NEW_ENTITY_ID;
        private byte[] _TimeStamp = new byte[] { };

        /// <summary>
        /// 取得ID
        /// </summary>
        public override int ID
        {
            get { return _ID; }
        }
        /// <summary>
        /// 取得时间戳
        /// </summary>
        public override byte[] TimeStamp
        {
            get { return _TimeStamp; }
        }

        #endregion");
        }
        private void writeFields(Entity entity, string mainCodeFileContent, StreamWriter writer)
        {
            writer.WriteLine("        #region 成员");
            writer.WriteLine();

            foreach (var item in entity.ItemList)
            {
                if (item.ItemType == ItemType.PrimaryKey)
                    continue;

                string fieldName = item.ItemType == ItemType.ForeignKey ? item.Name + "ID" : item.Name;
                if (!Regex.Match(mainCodeFileContent, @"private \w* _" + fieldName + ";").Success)
                    writer.WriteLine("        private {0} _{1};", getType(item), fieldName);

                //private EntityRef<Project> _Project;
                if (item.ItemType == ItemType.ForeignKey)
                {
                    var filed = String.Format("        private EntityRef<{0}> _{1};", item.EntityName, item.Name);
                    if (!mainCodeFileContent.Contains(filed))
                        writer.WriteLine(filed);
                }
            }

            writer.WriteLine();
            writer.WriteLine("        #endregion");
        }
        private void writeProperties(Entity entity, string mainCodeFileContent, StreamWriter writer)
        {
            writer.WriteLine("        #region 属性");
            writer.WriteLine();

            foreach (var item in entity.ItemList)
            {
                if (item.ItemType == ItemType.PrimaryKey)
                    continue;

                string fieldName = item.ItemType == ItemType.ForeignKey ? item.Name + "ID" : item.Name;
                if (!Regex.Match(mainCodeFileContent, @"public [\w\s\[\]]* " + fieldName).Success)
                {
                    //summary
                    writer.WriteLine("        /// <summary>");
                    if (item.ItemType == ItemType.ForeignKey)
                        writer.WriteLine("        /// 取得对应{0}的ID", item.Title);
                    else
                        writer.WriteLine("        /// 取得或设置" + item.Title);
                    writer.WriteLine("        /// </summary>");

                    //Description
                    if (!String.IsNullOrEmpty(item.Description))
                        writer.WriteLine("        /// <remarks>{0}</remarks>", item.Description);

                    //property name
                    writer.WriteLine("        public {0} {1}", getType(item), fieldName);

                    //body
                    writer.WriteLine("        {");
                    writer.WriteLine("            get {{ return _{0}; }}", fieldName);
                    if (item.ItemType != ItemType.ForeignKey)
                        writer.WriteLine("            set {{ _{0} = value; }}", fieldName);
                    writer.WriteLine("        }");
                }

                if (item.ItemType == ItemType.ForeignKey)
                {
                    ///// <summary>
                    ///// 取得或设置对应的项目
                    ///// </summary>
                    //public Project Project
                    //{
                    //    get { return _Project.Entity; }
                    //    set
                    //    {
                    //        _Project.Entity = value;
                    //        _ProjectID = value == null ? 0 : value.ID;
                    //    }
                    //}
                    var title = String.Format("public( override)? {0} {1}", item.EntityName, item.Name);
                    if (!Regex.Match(mainCodeFileContent, title).Success)
                    {
                        //summary
                        writer.WriteLine("        /// <summary>");
                        writer.WriteLine("        /// 取得对应的{0}", item.Title);
                        writer.WriteLine("        /// </summary>");

                        //Description
                        if (!String.IsNullOrEmpty(item.Description))
                            writer.WriteLine("        /// <remarks>{0}</remarks>", item.Description);

                        //property name
                        writer.WriteLine("        public {0} {1}", item.EntityName, item.Name);

                        //body
                        writer.WriteLine("        {");
                        writer.WriteLine("            get {{ return _{0}.Entity; }}", item.Name);
                        writer.WriteLine("            set");
                        writer.WriteLine("            {");
                        writer.WriteLine("                _{0}.Entity = value;", item.Name);
                        if (item.Require)
                            writer.WriteLine("                _{0}ID = value == null ? 0 : value.ID;", item.Name);
                        else
                            writer.WriteLine("                _{0}ID = value == null ? null : new int?(value.ID);", item.Name);
                        writer.WriteLine("            }");
                        writer.WriteLine("        }");
                    }
                }
            }

            writer.WriteLine();
            writer.WriteLine("        #endregion");
        }

        private string getType(Item item)
        {
            switch (item.ItemType)
            {
                case ItemType.Int:
                case ItemType.ForeignKey:
                    return item.Require ? "int" : "int?";
                case ItemType.Long:
                    return item.Require ? "long" : "long?";
                case ItemType.Enum:
                    return item.EnumName;
                case ItemType.Text:
                case ItemType.LongText:
                    return "string";
                case ItemType.DateTime:
                    return item.Require ? "DateTime" : "DateTime?";
                case ItemType.Bool:
                    return item.Require ? "bool" : "bool?";
                case ItemType.Bytes:
                    return "byte[]";
                case ItemType.Guid:
                    return item.Require ? "Guid" : "Guid?";
                case ItemType.PrimaryKey:
                default:
                    throw new InvalidDataException();
            }
        }
    }
}
