using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using MIS.Common.Message;

using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.DataAccess;

using Srims.Tools.DataImport.Importer.Common;
using Srims.Tools.DataImport.Importer.Users;
using Srims.Tools.DataImport.Importer.Bases;
using Srims.Tools.DataImport.Importer.Projects;
using Srims.Tools.DataImport.Importer.Documents;
using Srims.Tools.DataImport.Importer.Type;
using Srims.Tools.DataImport.Importer.Fund;
using Srims.Tools.DataImport.Importer.Awards;
using Srims.Tools.DataImport.Importer.Patents;
using Srims.Tools.DataImport.Importer.Papers;
using Srims.Tools.DataImport.Importer.Experts;

namespace Srims.Tools.DataImport
{
    /// <summary>
    /// 导入管理器
    /// </summary>
    public class ImportManager
    {
        private EventHandler<NewMessageEventArgs> _NewMessage;

        private string _OldDatabaseConnectionString;
        private string _NewDatabaseConnectionString;

        private List<IImporter> importerList = new List<IImporter>
        {
            //Common
            new CountImporter(),
            new LogImporter(),
            new NoticeTextImporter(),
            new SubjectFirstLevelImporter(),
            new SubjectSecondLevelImporter(),
            new SystemSettingImporter(),
            new AnnouncementImporter(),

            //Type
            new ProjectRankImporter(),
            new ProjectTypeImporter(),
            new ProjectSupportCategoryImporter(),
            new ProjectSupportFieldImporter(),
            new ProjectSupportSubFieldImporter(),

            //Users
            new UserRoleImporter(),
            new UserImporter(),
            new DepartmentImporter(),
            new ExpertImporter(),

            //Bases
            new BaseImporter(),

            //Projects
            new ProjectImporter(),
            new ProjectStateHistoryImporter(),
            new ProjectMemberImporter(),
            new ProjectInfo_TypeImporter(),

            //Fund
            new AccountBookNumberCountImporter(),
            new ProjectInfo_FundImporter(),
            new PayPlanItemImporter(),
            new FinanceImporter(),
            new FinanceBakImporter(),
            new FundMemberImporter(),
            new FundDescendImporter(),
            new FundDescendStateHistoryImporter(),
            new FundAllocationImporter(),
            new FundAllocationStateHistoryImporter(),
            new VoucherImporter(),
            new VoucherStateHistoryimporter(),
            new VoucherOutImporter(),

            //Documents
            new ContractImporter(),
            new DocumentImporter(),

            //Award
            new AwardImporter(),
            new AwardWinnerImporter(),

            //Patents
            new PatentAgencyImporter(),
            new PatentImporter(),
            new PatentInventerImporter(),

            //Papers
            new MagazineImporter(),
            new MagazineSubjectClassimporter(),
            new MagazineInformationImporter(),
            new PaperImporter(),
            new PaperIndexedImporter(),
            new PaperAuthorImporter(),
            new SubjectClassChineseEnglishImporter(),
        };

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
        /// <param name="oldDatabaseConnectionString">原数据库连接字符串</param>
        /// <param name="newDatabaseConnectionString">新数据库连接字符串</param>
        public ImportManager(string oldDatabaseConnectionString, string newDatabaseConnectionString)
        {
            this._NewMessage = new EventHandler<NewMessageEventArgs>(onNewMessage);

            this._OldDatabaseConnectionString = oldDatabaseConnectionString;
            this._NewDatabaseConnectionString = newDatabaseConnectionString;

            initialImportList();
        }
        private void onNewMessage(object sender, NewMessageEventArgs e) { }
        private void initialImportList()
        {
            foreach (var importer in importerList)
            {
                importer.NewMessage += new EventHandler<NewMessageEventArgs>(importer_NewMessage);
                importer.OldDatabaseConnectionString = _OldDatabaseConnectionString;
                importer.NewDatabaseConnectionString = _NewDatabaseConnectionString;
            }
        }
        private void importer_NewMessage(object sender, NewMessageEventArgs e)
        {
            _NewMessage(sender, e);
        }

        /// <summary>
        /// 清空数据
        /// </summary>
        public void Clear()
        {
            for (int i = importerList.Count - 1; i >= 0; i--)
                importerList[i].Clear();
        }
        /// <summary>
        /// 导入数据
        /// </summary>
        public void Import()
        {
            for (int i = 0; i < importerList.Count; i++)
                importerList[i].Import();
        }
    }
}
