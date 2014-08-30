using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.ServiceProcess;
using System.Text;
using System.Timers;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Users;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Documents;

using Srims.Server.DataAccess;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.DataAutoImport;

using jmail;
using System.Data.OleDb;

using System.Reflection;
using Excel = Microsoft.Office.Interop.Excel;

namespace Srims.WindowsService
{
    partial class SrimsService : ServiceBase
    {
        private const int startWorkTimeOfHour = 1;

        private bool isStart = false;
        public SrimsService()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            Timer timer = new Timer(60 * 60 * 1000);
            timer.Elapsed += new ElapsedEventHandler(timer_Elapsed);
            timer.Enabled = true;
        }

        void timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            var time = DateTime.Now;
            if (time.Hour == startWorkTimeOfHour)
                startWork();

        }

        private void startWork()
        {
            try
            {
                IDatabase database = GetDataBase.GetNewDataBase();

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.ExpertAutoImport, database))
                    ExpertImporter.ImportExperts(new DataBaseDelegate(GetDataBase.GetNewDataBase));

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.FinanceAutoImport, database))
                    FinanceImporter.ImportFinance(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.PatentEmailAutoSent, database))
                    database.PatentInventers.PayPatentFeeRemind(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.ProjectEndAwoke, database))
                    database.Projects.EndAwoke(database);

                //  if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.AdminWorkAwoke, database))
                //      database.Users.WorkRemind();

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.FundAllocation, database))
                    database.FundDescends.FundAllocationRemind(database);


                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.VoucherPrint, database))
                {
                    database.Vouchers.VoucherPrintRemind(database);
                    database.Vouchers.VoucherPrintRemindToAdmin(database);
                }

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.VoucherPrintedRemind, database))
                    database.VoucherStateHistories.VoucherPrintedRemind(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.ExpertCensorRemind, database))
                    database.ExpertCensorInfos.SendMailToAdmin(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorVerticalProjectRemind, database))
                    database.Projects.CensorVerticalProjectRemind(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorHorizontalProjectRemind, database))
                    database.Projects.CensorHorizontalProjectRemind(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorDocumentRemaind, database))
                    database.Documents.CeasorDocumentRemaind(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorContractRemaind, database))
                    database.Contracts.CensorContractRemaind(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorFundAllocationRemaind, database))
                    database.FundAllocations.CensorFundAllocationRemaind(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorProjectRemaind, database))
                    database.Projects.CensorProjectRemaind(database);

                if (database.SystemSettings.GetSystemSetting().IsWindowsServiceAutoRun((int)WindowsServiceType.CensorFundDescendRemaind, database))
                    database.FundDescends.CensorFundDescendRemaind(database);

            }
            catch (Exception e)
            {
                EventLog.WriteEntry(e.ToString());
            }
        }
        protected override void OnStop()
        {
            // TODO: Add code here to perform any tear-down necessary to stop your service.
        }
    }
}
