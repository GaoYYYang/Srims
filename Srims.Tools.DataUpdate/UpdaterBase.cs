using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business;
using Srims.Server.DataAccess;

namespace Srims.Tools.DataUpdate
{
    /// <summary>
    /// 数据更新器的基类
    /// </summary>
    /// <typeparam name="T">新类型</typeparam>
    public abstract class UpdaterBase<T> : IUpdater
        where T : Entity<T>
    {
        private EventHandler<NewMessageEventArgs> _NewMessage;
        private string _ConnectionString;
        private Database _Database;

        /// <summary>
        /// 有信息产生时触发此事件。
        /// </summary>
        public event EventHandler<NewMessageEventArgs> NewMessage
        {
            add { _NewMessage += value; }
            remove { _NewMessage -= value; }
        }
        /// <summary>
        /// 取得或者设置连接字符串
        /// </summary>
        public string ConnectionString
        {
            get { return _ConnectionString; }
            set { _ConnectionString = value; }
        }
        /// <summary>
        /// 取得新数据库访问入口
        /// </summary>
        protected Database Database
        {
            get { return _Database; }
        }

        /// <summary>
        /// 构造数据导入器
        /// </summary>
        /// <param name="oldDatabaseConnectionString">原数据库连接字符串</param>
        /// <param name="newDatabaseConnectionString">新数据库连接字符串</param>
        internal UpdaterBase()
        {
            this._NewMessage = new EventHandler<NewMessageEventArgs>(onNewMessage);
        }
        private void onNewMessage(object sender, NewMessageEventArgs e) { }

        /// <summary>
        /// 导入数据
        /// </summary>
        public void Update()
        {
            WriteMessage(MesssageType.Information, String.Format("开始更新{0}信息...", EntityName));

            ResetNewDatabase();

            var entityIDs = GetOldEntities().Select(e => e.ID).ToList();
            int total = entityIDs.Count;
            int count = 0;
            int successCount = 0;

            foreach (var entityID in entityIDs)
            {
                var entity = Database.GetTable<T>().GetByID(entityID);
                try
                {
                    count++;

                    UpdateAction(entity);

                    successCount++;
                    WriteMessage(
                        MesssageType.Information,
                        String.Format("更新{4}信息({0}/{1},{2:N2}): {3}", count, total, (float)count * 100 / (float)total, GetEntityDescription(entity), EntityName)
                    );
                }
                catch (Exception e)
                {
                    WriteMessage(
                        MesssageType.Error,
                        String.Format("更新{2}信息发生错误! {0} 错误信息:{1}.", GetEntityDescription(entity), e.Message, EntityName)
                    );
                    continue;
                }
                finally
                {
                    ResetNewDatabase();
                    System.GC.Collect();
                }
            }

            WriteMessage(MesssageType.Information, String.Format("更新{0}信息完成!", EntityName));
            WriteMessage(MesssageType.Information, String.Format("共有{2}信息{0}条，成功更新{1}条。.", total, successCount, EntityName));
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
            this._Database = Database.New(_ConnectionString);
        }

        /// <summary>
        /// 需子类重写属性:取得实体的名称
        /// </summary>
        protected abstract string EntityName { get; }
        /// <summary>
        /// 需子类从写的方法:取得实体的描述
        /// </summary>
        /// <param name="entity">实体</param>
        /// <returns>描述</returns>
        protected abstract string GetEntityDescription(T entity);
        /// <summary>
        /// 清空数据
        /// </summary>
        public virtual void Clear() { }
        /// <summary>
        /// 可被子类重写的方法：返回要导入的数据集
        /// </summary>
        /// <returns></returns>
        protected abstract IQueryable<T> GetOldEntities();
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity">实体</param>
        protected abstract void UpdateAction(T entity);
    }
}
