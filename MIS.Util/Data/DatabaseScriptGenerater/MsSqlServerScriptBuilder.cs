using System;
using System.Collections.Generic;
using System.Text;

using MIS.Util.Data.EntityPrase;

namespace MIS.Util.Data.DatabaseScriptGenerater
{
    /// <summary>
    /// Sql数据库建库脚本生成器
    /// </summary>
    public static class MsSqlServerScriptBuilder
    {
        /// <summary>
        /// 生成建库脚本，包含删除对象的脚本
        /// </summary>
        /// <param name="entityList">要被生成的实体集合</param>
        /// <returns>生成的脚本</returns>
        public static string GetSqlScript(Entity[] entityList)
        {
            return GetSqlScript(entityList, true);
        }
        /// <summary>
        /// 生成建库脚本
        /// </summary>
        /// <param name="entityList">要被生成的实体集合</param>
        /// <param name="isIncludeTableDrop">是否生成对象的删除脚本</param>
        /// <returns>生成的脚本</returns>
        public static string GetSqlScript(Entity[] entityList, bool isIncludeTableDrop)
        {
            StringBuilder builder = new StringBuilder();
            var foreignKeyList = getForeignKeyList(entityList);

            if (isIncludeTableDrop)
            {
                buildForeignKeyDropScript(foreignKeyList, builder);
                buildTableDropScript(entityList, builder);
            }

            buildTableCreateScript(entityList, builder);

            buildPrimayKeyScript(entityList, builder);
            buildForeignKeyScript(foreignKeyList, builder);

            builidForeignKeyIndex(foreignKeyList, builder);

            return builder.ToString();
        }

        private static ForeignKey[] getForeignKeyList(Entity[] tables)
        {
            var foreignKeyList = new List<ForeignKey>();

            foreach (Entity table in tables)
                foreach (Item column in table.ItemList)
                    if (column.ItemType == ItemType.ForeignKey)
                        foreignKeyList.Add(new ForeignKey
                        {
                            ParentTableName = table.Name,
                            ChildTableName = column.EntityName,
                            ColumnName = column.Name + "ID",
                            KeyName = String.Format("FK_{0}_{1}", table.Name, column.Name)
                        });

            return foreignKeyList.ToArray();
        }

        private static void buildForeignKeyDropScript(ForeignKey[] foreignKeyList, StringBuilder builder)
        {
            //if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[FK_Student_Major]') and OBJECTPROPERTY(id, N'IsForeignKey') = 1)
            //ALTER TABLE [dbo].[Student] DROP CONSTRAINT FK_Student_Major
            //GO
            foreach (var foreignKey in foreignKeyList)
            {
                builder.AppendFormat("if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[{0}]') and OBJECTPROPERTY(id, N'IsForeignKey') = 1)", foreignKey.KeyName);
                builder.AppendLine();
                builder.AppendFormat("ALTER TABLE [dbo].[{0}] DROP CONSTRAINT {1}", foreignKey.ParentTableName, foreignKey.KeyName);
                builder.AppendLine();
                builder.AppendLine("GO");
                builder.AppendLine();
            }
        }

        private static void buildTableDropScript(Entity[] tables, StringBuilder builder)
        {
            //if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[Administrator]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
            //drop table [dbo].[Administrator]
            //GO

            //if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[Article_Administrator]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)
            //drop table [dbo].[Article_Administrator]
            //GO

            foreach (Entity table in tables)
            {
                builder.AppendFormat(@"if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[{0}]') and OBJECTPROPERTY(id, N'IsUserTable') = 1)", table.Name);
                builder.AppendLine();

                builder.AppendFormat(@"drop table [dbo].[{0}]", table.Name);
                builder.AppendLine();

                builder.AppendLine(@"GO");

                builder.AppendLine();
            }
        }

        private static void buildTableCreateScript(Entity[] tables, StringBuilder builder)
        {
            //CREATE TABLE [dbo].[Service] (
            //    [ServiceID] [int] IDENTITY (1, 1) NOT NULL ,
            //    [Name] [nvarchar] (255) COLLATE Chinese_PRC_CI_AS NOT NULL ,
            //    [Title] [nvarchar] (255) COLLATE Chinese_PRC_CI_AS NOT NULL ,
            //    [Guid] [nvarchar] (255) COLLATE Chinese_PRC_CI_AS NOT NULL ,
            //    [ModuleGuid] [nvarchar] (255) COLLATE Chinese_PRC_CI_AS NOT NULL ,
            //    [ParameterDescription] [text] COLLATE Chinese_PRC_CI_AS NOT NULL ,
            //    [Description] [text] COLLATE Chinese_PRC_CI_AS NOT NULL ,
            //    [TimeStamp] [timestamp] NULL
            //) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
            //GO
            foreach (Entity table in tables)
            {
                builder.AppendFormat("CREATE TABLE [dbo].[{0}] (", table.Name);
                builder.AppendLine();

                for (int i = 0; i < table.ItemList.Count; i++)
                {
                    buildColumn(table.ItemList[i], builder);
                    builder.Append(" ,");
                    builder.AppendLine();
                }
                builder.AppendLine("    [TimeStamp] [timestamp] NULL");
                builder.AppendLine(") ON [PRIMARY]");
                builder.AppendLine(@"GO");
                builder.AppendLine();
            }
        }
        private static void buildColumn(Item column, StringBuilder builder)
        {
            switch (column.ItemType)
            {
                case ItemType.Bool:
                    builder.AppendFormat("    [{0}] [bit]", column.Name);
                    break;

                case ItemType.DateTime:
                    builder.AppendFormat("    [{0}] [datetime]", column.Name);
                    break;

                case ItemType.Bytes:
                    builder.AppendFormat("    [{0}] [image]", column.Name);
                    break;

                case ItemType.ForeignKey:
                    builder.AppendFormat("    [{0}] [int]", column.Name + "ID");
                    break;

                case ItemType.Enum:
                case ItemType.Int:
                    builder.AppendFormat("    [{0}] [int]", column.Name);
                    break;

                case ItemType.Long:
                    builder.AppendFormat("    [{0}] [bigint]", column.Name);
                    break;

                case ItemType.PrimaryKey:
                    builder.AppendFormat("    [{0}] [int] IDENTITY (1, 1) ", column.Name);
                    break;

                case ItemType.Text:
                    builder.AppendFormat("    [{0}] [nvarchar] (255) COLLATE Chinese_PRC_CI_AS", column.Name);
                    break;

                case ItemType.LongText:
                    builder.AppendFormat("    [{0}] [nvarchar] (MAX) COLLATE Chinese_PRC_CI_AS", column.Name);
                    break;
                case ItemType.Guid:
                    builder.AppendFormat("    [{0}] [uniqueidentifier]", column.Name);
                    break;
            }

            if (column.ItemType == ItemType.PrimaryKey || column.Require)
                builder.Append(" NOT NULL");
        }

        private static void buildPrimayKeyScript(Entity[] tables, StringBuilder builder)
        {
            foreach (Entity table in tables)
                foreach (Item column in table.ItemList)
                    if (column.ItemType == ItemType.PrimaryKey)
                        buildPrimayKeyColumnScript(table, column, builder);
        }
        private static void buildPrimayKeyColumnScript(Entity table, Item column, StringBuilder builder)
        {
            //ALTER TABLE [dbo].[Article_Administrator] WITH NOCHECK ADD 
            //    CONSTRAINT [PK_Article_Administrator] PRIMARY KEY  CLUSTERED 
            //    (
            //        [ArticleAdministratorID]
            //    )  ON [PRIMARY] 
            //GO
            builder.AppendFormat("ALTER TABLE [dbo].[{0}] WITH NOCHECK ADD", table.Name);
            builder.AppendLine();

            builder.AppendFormat("    CONSTRAINT [PK_{0}] PRIMARY KEY  CLUSTERED", table.Name);
            builder.AppendLine();

            builder.AppendLine("    (");

            builder.AppendFormat("        [{0}]", column.Name);
            builder.AppendLine();

            builder.AppendLine("    )  ON [PRIMARY]");
            builder.AppendLine("GO");

        }

        private static void buildForeignKeyScript(ForeignKey[] foreignKeyList, StringBuilder builder)
        {
            //ALTER TABLE [dbo].[Student] ADD 
            //    CONSTRAINT [FK_Student_Major] FOREIGN KEY 
            //    (
            //        [Major]
            //    ) REFERENCES [dbo].[Major] (
            //        [Id]
            //    ) ON DELETE CASCADE 
            //GO
            foreach (var foreignKey in foreignKeyList)
            {

                //ALTER TABLE [dbo].[Student] WITH NOCHECK   ADD 
                builder.AppendFormat("ALTER TABLE [dbo].[{0}] WITH NOCHECK  ADD ", foreignKey.ParentTableName);
                builder.AppendLine();
                //    CONSTRAINT [FK_Student_Major] FOREIGN KEY 
                builder.AppendFormat("    CONSTRAINT [{0}] FOREIGN KEY ", foreignKey.KeyName);
                builder.AppendLine();
                //    (
                builder.AppendLine("    (");
                //        [Major]
                builder.AppendFormat("        [{0}]", foreignKey.ColumnName);
                builder.AppendLine();
                //    ) REFERENCES [dbo].[Major] (
                builder.AppendFormat("    ) REFERENCES [dbo].[{0}] (", foreignKey.ChildTableName);
                builder.AppendLine();
                //        [Id]
                builder.AppendFormat("        [{0}]", "ID");
                builder.AppendLine();
                //    ) ON DELETE CASCADE 
                builder.AppendLine("    ) ");
                //GO                
                builder.AppendLine("GO");

                builder.AppendLine();
            }
        }

        private static void builidForeignKeyIndex(ForeignKey[] foreignKeyList, StringBuilder builder)
        {
            //CREATE NONCLUSTERED INDEX [IX_Contract_ProjectID] ON [dbo].[Contract] 
            //(
            //    [ProjectID] ASC
            //)
            //GO
            foreach (var foreignKey in foreignKeyList)
            {
                //CREATE NONCLUSTERED INDEX [IX_Contract_ProjectID] ON [dbo].[Contract] 
                builder.AppendFormat("CREATE NONCLUSTERED INDEX [IX_{0}_{1}] ON [dbo].[{0}] ", foreignKey.ParentTableName, foreignKey.ColumnName);
                builder.AppendLine();
                //(
                builder.AppendLine("    (");
                //    [ProjectID] ASC
                builder.AppendFormat("    [{0}] ASC", foreignKey.ColumnName);
                builder.AppendLine();
                //)
                builder.AppendLine("    ) ");
                //GO
                builder.AppendLine("GO");

                builder.AppendLine();
            }
        }

    }
}
