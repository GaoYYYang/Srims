using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.DataAccess;

using Srims.Tools.DataUpdate.Updaters;

namespace Srims.Tools.DataUpdate
{
    /// <summary>
    /// 更新管理器
    /// </summary>
    public class UpdaterManager
    {
        private EventHandler<NewMessageEventArgs> _NewMessage;
        private string _ConnectionString;
        private List<IUpdater> _UpdaterList = new List<IUpdater>();

        /// <summary>
        /// 有信息产生时触发此事件。
        /// </summary>
        public event EventHandler<NewMessageEventArgs> NewMessage
        {
            add { _NewMessage += value; }
            remove { _NewMessage -= value; }
        }

        /// <summary>
        /// 构造导入管理器
        /// </summary>
        /// <param name="newDatabaseConnectionString">新数据库连接字符串</param>
        public UpdaterManager(string connectionString, string resourceOutPutDirectory)
        {
            this._NewMessage = new EventHandler<NewMessageEventArgs>(onNewMessage);
            this._ConnectionString = connectionString;

            _UpdaterList.Add(new ResourceUpdater(resourceOutPutDirectory));

            initialUpdaterList();
        }
        private void onNewMessage(object sender, NewMessageEventArgs e) { }

        private void initialUpdaterList()
        {
            foreach (var updater in _UpdaterList)
            {
                updater.NewMessage += new EventHandler<NewMessageEventArgs>(importer_NewMessage);
                updater.ConnectionString = _ConnectionString;
            }
        }
        private void importer_NewMessage(object sender, NewMessageEventArgs e)
        {
            _NewMessage(sender, e);
        }

        /// <summary>
        /// 更新数据
        /// </summary>
        public void Update()
        {
            //忽略外协经费的业务规则
            //var database = Database.New(_ConnectionString);
            //var systemSetting = database.SystemSettings.GetSystemSetting();
            //var radio = systemSetting.FundOutRatio;
            //systemSetting.FundOutRatio = 100;
            //systemSetting.Save(database);

            for (int i = 0; i < _UpdaterList.Count; i++)
                _UpdaterList[i].Update();

            //还原外协经费的业务规则
            //systemSetting.FundOutRatio = radio;
            //systemSetting.Save(database);
        }
    }
}
