using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business;
using Srims.Server.Business.Users;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Common;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Fund;

using Srims.Server.DataAccess;
using Srims.Server.Business.Experts;

namespace Srims.Tools.DataImport.Importer
{
    /// <summary>
    /// 数据转换器的基类
    /// </summary>
    /// <typeparam name="OldType">旧类型</typeparam>
    /// <typeparam name="NewType">新类型</typeparam>
    public abstract class ImporterBase<OldType, NewType> : IImporter
        where OldType : class
        where NewType : Entity<NewType>
    {
        private EventHandler<NewMessageEventArgs> _NewMessage;

        private string _OldDatabaseConnectionString;
        private string _NewDatabaseConnectionString;

        private Database _NewDatabase;
        private SrimsV4DataContext _OldDatabase;

        /// <summary>
        /// 有信息产生时触发此事件。
        /// </summary>
        public event EventHandler<NewMessageEventArgs> NewMessage
        {

            add { _NewMessage += value; }
            remove { _NewMessage -= value; }
        }
        /// <summary>
        /// 设置或取得旧数据库连接字符串
        /// </summary>
        public string OldDatabaseConnectionString
        {
            get { return _OldDatabaseConnectionString; }
            set
            {
                this._OldDatabaseConnectionString = value;
                this._OldDatabase = new SrimsV4DataContext(value);
            }
        }
        /// <summary>
        /// 设置或取得新数据库连接字符串
        /// </summary>
        public string NewDatabaseConnectionString
        {
            get { return _NewDatabaseConnectionString; }
            set
            {
                this._NewDatabaseConnectionString = value;
                this._NewDatabase = Database.New(value);
            }
        }

        /// <summary>
        /// 取得旧数据库访问入口
        /// </summary>
        protected SrimsV4DataContext OldDatabase
        {
            get { return _OldDatabase; }
        }
        /// <summary>
        /// 取得新数据库访问入口
        /// </summary>
        protected Database NewDatabase
        {
            get { return _NewDatabase; }
        }

        /// <summary>
        /// 构造数据导入器
        /// </summary>
        /// <param name="oldDatabaseConnectionString">原数据库连接字符串</param>
        /// <param name="newDatabaseConnectionString">新数据库连接字符串</param>
        internal ImporterBase()
        {
            this._NewMessage = new EventHandler<NewMessageEventArgs>(onNewMessage);
        }
        private void onNewMessage(object sender, NewMessageEventArgs e)
        {
        }

        /// <summary>
        /// 需子类重写属性:取得资源列
        /// 如果表中存在资源关联列，重写该属性返回列名
        /// </summary>
        protected virtual string ResourceColumn { get { return null; } }
        /// <summary>
        /// 需子类重写属性:是否使用SaveAction保存
        /// </summary>
        protected virtual bool IsUseSaveAction { get { return true; } }

        /// <summary>
        /// 清空数据
        /// </summary>
        public virtual void Clear()
        {
            WriteMessage(MesssageType.Information, String.Format("正在清除新数据库中所有{0}数据...", EntityName));

            if (!string.IsNullOrEmpty(ResourceColumn))
                NewDatabase.ExecuteCommand(String.Format(@"DELETE FROM [Resource] WHERE [Guid] IN (SELECT [{1}] FROM {0})", typeof(NewType).Name, ResourceColumn));

            NewDatabase.ExecuteCommand(String.Format("DELETE FROM [{0}]", typeof(NewType).Name));

            WriteMessage(MesssageType.Information, String.Format("新数据库中所有{0}已经清除.", EntityName));
        }

        /// <summary>
        /// 导入数据
        /// </summary>
        public void Import()
        {
            WriteMessage(MesssageType.Information, String.Format("导入{0}数据...", EntityName));

            int count = 0;
            int successCount = 0;
            var oldEntities = GetOldEntities().ToList();
            int total = oldEntities.Count();

            foreach (var oldEntity in oldEntities)
            {
                try
                {
                    count++;
                    NewType newEntity = GetNewEntity(oldEntity);

                    if (IsUseSaveAction)
                    {
                        newEntity.Save(NewDatabase);
                    }
                    else
                    {
                        if (newEntity.IsNew)
                            NewDatabase.GetTable<NewType>().InsertOnSubmit(newEntity);

                        NewDatabase.SubmitChanges();
                    }

                    successCount++;
                    WriteMessage(
                        MesssageType.Information,
                        String.Format("导入{0}({2}/{3},{4:N2}%):{1}", EntityName, GetEntityDescription(oldEntity), count, total, (float)count * 100 / (float)total)
                    );
                }
                catch (Exception e)
                {
                    WriteMessage(
                        MesssageType.Error,
                        String.Format("导入{0}数据时发生错误! {1} 错误信息:{2}.", EntityName, GetEntityDescription(oldEntity), e.Message)
                    );
                }
                finally
                {
                    System.GC.Collect();
                    ResetNewDatabase();
                }
            }

            _NewDatabase.Dispose();
            _NewDatabase = null;

            _OldDatabase.Dispose();
            _OldDatabase = null;

            oldEntities = null;
            System.GC.Collect();

            WriteMessage(MesssageType.Information, String.Format("导入{0}数据完成!", EntityName));
            WriteMessage(MesssageType.Information, String.Format("原有{0}数据{1}条,成功导入{0}数据{2}条.", EntityName, total, successCount));
        }

        /// <summary>
        /// 输出信息。派生类通过此方法输出各种信息
        /// </summary>
        /// <param name="messageType">信息类型</param>
        /// <param name="message">信息内容</param>
        protected void WriteMessage(MesssageType messageType, string message)
        {
            _NewMessage(this, new NewMessageEventArgs(messageType, message));
        }
        /// <summary>
        /// 重置数据库，用于再装换数据失败时，抛弃当前修改
        /// </summary>
        protected void ResetNewDatabase()
        {
            this._NewDatabase = Database.New(_NewDatabaseConnectionString);
        }
        /// <summary>
        /// 解析时间
        /// </summary>
        /// <param name="dateTimeString">字符串</param>
        /// <returns>时间</returns>
        protected DateTime? ParseDateTime(string dateTimeString)
        {
            if (string.IsNullOrEmpty(dateTimeString)) return null;

            dateTimeString = dateTimeString.Trim().Replace("-", String.Empty);

            DateTime result = DateTime.MinValue;
            int year, month, day;
            try
            {
                if (dateTimeString.Length == 4)
                {
                    if (!Int32.TryParse(dateTimeString, out year))
                        return null;
                    result = new DateTime(year, 1, 1);
                }
                if (dateTimeString.Length == 6)
                {
                    if (!Int32.TryParse(dateTimeString.Substring(0, 4), out year))
                        return null;
                    if (!Int32.TryParse(dateTimeString.Substring(4, 2), out month))
                        return null;

                    result = new DateTime(year, month, 1);
                }
                else if (dateTimeString.Length == 8)
                {
                    if (!Int32.TryParse(dateTimeString.Substring(0, 4), out year))
                        return null;
                    if (!Int32.TryParse(dateTimeString.Substring(4, 2), out month))
                        return null;
                    if (!Int32.TryParse(dateTimeString.Substring(6, 2), out day))
                        return null;

                    result = new DateTime(year, month, day);
                }

            }
            catch
            {
                WriteMessage(MesssageType.Warning, "无效的日期(" + dateTimeString + ")");
                return null;
            }

            if (result < new DateTime(1753, 1, 1) || result > new DateTime(9999, 12, 31))
            {
                WriteMessage(MesssageType.Warning, "无效的日期(" + dateTimeString + ")");
                return null;
            }

            return result;
        }

        /// <summary>
        /// 可被子类重写的方法：返回要导入的数据集
        /// </summary>
        /// <returns></returns>
        protected virtual IQueryable<OldType> GetOldEntities()
        {
            return _OldDatabase.GetTable<OldType>();
        }
        /// <summary>
        /// 需子类重写属性:取得实体的名称
        /// </summary>
        protected abstract string EntityName { get; }
        /// <summary>
        /// 需子类从写的方法:取得原实体的描述
        /// </summary>
        /// <param name="oldEntity">原实体</param>
        /// <returns>描述</returns>
        protected abstract string GetEntityDescription(OldType oldEntity);
        /// <summary>
        /// 需子类重写的方法:将旧的实体转换成新的实体
        /// </summary>
        /// <param name="oldEntity">旧的实体</param>
        /// <returns>新的实体</returns>
        protected abstract NewType GetNewEntity(OldType oldEntity);

        protected Department GetNewCollegeByOld(int? oldCollegeID)
        {
            if (!oldCollegeID.HasValue)
                return null;

            var oldCollege = OldDatabase
                .Department_Olds
                .Single(d => d.ID == oldCollegeID.Value);

            return NewDatabase
                    .Departments
                    .Single(d => d.IsCollege && d.Name == oldCollege.Name);
        }
        /// <summary>
        /// 提供给子类使用的功能方法：根据旧专家库中的专家ID取得新专家
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected Expert GetNewExpertByOld(int? id)
        {
            if (!id.HasValue)
                return null;

            var oldEntity = OldDatabase
                .Expert_Olds
                .SingleOrDefault(e => e.ID == id.Value);

            if (oldEntity == null)
                return null;

            return NewDatabase
                .Experts
                .SingleOrDefault(e => e.Number == oldEntity.Number);
        }
        /// <summary>
        /// 提供给子类使用的功能方法：根据旧的学科代码ID取得新的学科代码
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected SubjectSecondLevel GetSubjectSecondLevelByOld(int? id)
        {
            if (!id.HasValue)
                return null;

            var oldEntity = OldDatabase
                .SubjectSecondLevel_Olds
                .SingleOrDefault(e => e.ID == id.Value);

            if (oldEntity == null)
                return null;

            return NewDatabase
                .SubjectSecondLevels
                .SingleOrDefault(e => e.Code == oldEntity.Code);
        }
        /// <summary>
        /// 提供给子类使用的功能方法：根据旧的项目ID取得新项目
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected Base GetNewBaseByOld(Base_Old base_Old)
        {
            if (base_Old == null)
                return null;

            return NewDatabase
                .Bases
                .SingleOrDefault(b => b.Name == base_Old.Name);
        }
        /// <summary>
        /// 提供给子类使用的功能方法：根据旧的项目ID取得新项目
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected Project GetNewProjectByOld(int? id)
        {
            if (!id.HasValue)
                return null;

            return NewDatabase
                .Projects
                .SingleOrDefault(p => p.OldID == id);
        }
        /// <summary>
        /// 提供给子类使用的功能方法：根据旧的项目经费信息ID取得新项目经费信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        protected ProjectInfo_Fund GetNewProjectInfo_FundByOld(int? id)
        {
            if (!id.HasValue)
                return null;

            var oldProjectInfo_Fund = OldDatabase
                .ProjectInfo_Fund_Olds
                .SingleOrDefault(pif => pif.ID == id.Value);

            if (oldProjectInfo_Fund == null)
                return null;

            return NewDatabase
                .Projects
                .Single(p => p.OldID == oldProjectInfo_Fund.ProjectID)
                .Fund;
        }

    }
}
