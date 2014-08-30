using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;
using System.Transactions;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.Business.Projects;
using Srims.Server.Business;
using Srims.Server.UI;
using Srims.Server.UI.Fund;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Common;
using Srims.Server.DataExchange.OutsourcingImport;

namespace Srims.WebSite.Service.Fund
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class VoucherWebService : WebServiceBase
    {

        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Vouchers
                .Query(Request.GetVoucherQueryInformation(User), Database, User)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetByFundAllocation()
        {
            Response.WriteXmlHead();

            Database
                .Vouchers
                .GetByFundAllocation(Request.GetInt("FundAllocationId").Value)
                .Show(Response, User, Database, VoucherExtension.ShowVoucher);
        }
        [WebMethod]
        public void VoucherPrint()
        {
            var voucher = Request.GetEntity<Voucher>(Database.Vouchers, "voucherID");
            if (!User.HasPermission_Print(voucher, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("凭单打印，对应的凭单号为：{0}。", voucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherPrint, description, Request.UserHostAddress, "凭单打印", Database);

                voucher.Print(User, Database);
                Response.WriteXmlHead();
                voucher.ShowInList(Response, User, Database, VoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        [WebMethod]
        public void VoucherResetPrint()
        {
            var voucher = Request.GetEntity<Voucher>(Database.Vouchers, "voucherID");

            if (!User.HasPermission_ResetPrint())
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("重置凭单打印状态，对应的凭单号为：{0}。", voucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherSetPrint, description, Request.UserHostAddress, "重置凭单打印状态", Database);

                voucher.UnPrinted(User, Database);
                Response.WriteXmlHead();
                voucher.ShowInList(Response, User, Database, VoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        [WebMethod]
        public void VoucherSignIn()
        {
            var voucher = Request.GetEntity<Voucher>(Database.Vouchers, "voucherID");
            if (!User.HasPermission_SignIn(Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("签收凭单，对应的凭单号为：{0}。", voucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherSignIn, description, Request.UserHostAddress, "签收凭单", Database);

                voucher.SignIn(User, Database);
                Response.WriteXmlHead();
                voucher.ShowInList(Response, User, Database, VoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        [WebMethod]
        public void VoucherReturn()
        {
            var voucher = Request.GetEntity<Voucher>(Database.Vouchers, "voucherID");
            if (!User.HasPermission_ReturnVoucher(Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("设置凭单状态为退回，对应的凭单号为：{0}。", voucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherReturn, description, Request.UserHostAddress, "设置凭单状态为退回", Database);

                voucher.Return(User, Database);
                Response.WriteXmlHead();
                voucher.ShowInList(Response, User, Database, VoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        [WebMethod]
        public void VoucherCancleAllocate()
        {
            var voucher = Request.GetEntity<Voucher>(Database.Vouchers, "voucherID");
            if (!User.HasPermission_CancelFinanceAllocate(Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("设置凭单状态为取消分配，对应的凭单号为：{0}。", voucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherCancelAllocate, description, Request.UserHostAddress, "设置凭单状态为取消分配", Database);

                voucher.FinanceNumber = null;
                voucher.FinanceAllocateDateTime = null;
                voucher.CancelAllocate(User, Database);
                Response.WriteXmlHead();
                voucher.ShowInList(Response, User, Database, VoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        //财务分配（凭单号）
        [WebMethod]
        public void VoucherAllocate()
        {
            var voucher = Request.GetFinanceAllocatdVoucher(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                voucher.Save(Database);
                var description = string.Format("财务分配，对应的凭单号为：{0}。", voucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherAllocate, description, Request.UserHostAddress, "财务分配", Database);
                Response.WriteXmlHead();
                voucher.ShowInList(Response, User, Database, VoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Save()
        {
            bool isCorrect = Request.GetBoolean("IsCorrect").Value;
            var oldVoucher = Request.GetOldVoucher(Database);
            var voucher = Request.GetVoucher(User, isCorrect, Database);
            bool newVoucher = voucher.IsNew;
            var currentState = voucher.CurrentState;
            //判断还能否继续存入凭单
            var fundAllocation = voucher.FundAllocation;
            if (fundAllocation.AllocationIn + fundAllocation.AllocationOut + fundAllocation.OverheadExpensesIn + fundAllocation.OverheadExpensesOut+fundAllocation.OverheadExpensesExpert+fundAllocation.OverheadExpensesMiddle == fundAllocation.FundDescend.Amount)
                return;
            if (voucher.FundMember.Expert != fundAllocation.FundDescend.ProjectInfo_Fund.Project.Principal && voucher.AllocationIn == 0)
                return;

            #region 所有项目中，有实际分配经费的人员，如果在‘项目成员’中没有的，系统自动添加到‘项目成员’中，位次按照分配经费先后顺序，从999开始排序号，依次递减。
            if (!Database.ProjectMemebers.Any(c => c.Expert == voucher.FundMember.Expert && c.Project == voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project))
            {
                int i;
                //获取最小位次
                var smallorder = Database.ProjectMemebers.Where(c => c.Project == voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project && c.Order > 500).ToList();
                if (smallorder.Count == 0)
                {
                    i = 999;
                }
                else
                {
                    i = smallorder.Min(c => c.Order);
                    i--;
                }
                ProjectMember member = new ProjectMember();
                member.Project = voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project;
                member.Expert = voucher.FundMember.Expert;
                member.Order = i;
                member.Save(Database);
            }
            #endregion
            if (!isCorrect && !User.CanEdit(voucher, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                if (!newVoucher)
                {
                    var voucherOuts = Database.VoucherOuts.GetByVoucherID(voucher.ID);
                    foreach (var voucherOut in voucherOuts)
                        voucherOut.Delete(Database);
                }

                if (newVoucher)
                    voucher.CurrentState = null;

                voucher.Save(Database);
                currentState.Save(Database);

                if (newVoucher)
                {
                    voucher.CurrentState = currentState;
                    voucher.Save(Database);
                }

                var voucherOutList = Request.GetVoucherOuts(Database);

                foreach (var voucherOut in voucherOutList)
                {
                    voucherOut.Voucher = voucher;
                    voucherOut.Save(Database);
                }

                voucher.Save(Database);

                voucher.OverheadExpensesOut = voucher.GetOverheadExpenseOut();
                voucher.Save(Database);

                //当是数据纠错功能时，更新项目经费数据
                if (isCorrect)
                    voucher.FundAllocation.FundDescend.Save(Database);

                // 新建或编辑凭单（newVoucher:凭单号）
                var description = string.Format("{0}\n对应经费成员为：{1}。\n{2}", newVoucher ? "新经费分配" : "编辑经费分配", voucher.FundMember.Expert.Name, Log.GetEditOperationDescription(oldVoucher, voucher, Voucher.GetDescriptionItems(), newVoucher));
                Log.Write(User.Name, newVoucher ? (int)LogType.VoucherNew : (int)LogType.VoucherEdit, description, Request.UserHostAddress, newVoucher ? "新建凭单" : "编辑凭单", Database);

                ts.Complete();
            }
        }
        [WebMethod]
        public void SaveForSetAccountBookNumber()
        {
            var voucher = Request.GetEntity(Database.Vouchers, "VoucherId");
            string oldAccountBookNumber = voucher.VoucherNumber;
            string accountBookNumber = Request.GetString("AccountBookNumber");

            if (!User.CanResetAccountBookNumber(voucher, Database))
                throw new HasNoPermissionException();
            if (!voucher.IsAccountBookNumberLegal(accountBookNumber, User))
                throw new ArgumentException("账本号不符合规则");

            voucher.FundMember.AccountBookNumber = accountBookNumber;
            voucher.AccountBookNumber = accountBookNumber;
            //修改凭单账本号（凭单号）,同时更新项目账本号计数器        
            using (TransactionScope ts = new TransactionScope())
            {
                voucher.Save(Database);
                voucher.FundMember.ProjectInfo_Fund.UpdateAccountBookNumber(Database);

                string description = string.Format("编辑凭单账本号；\n 原来账本号为：{0}，修改后为：{1}；\n凭单ID为：{2}", oldAccountBookNumber, voucher.AccountBookNumber, voucher.ID);
                Log.Write(User.Name, (int)LogType.SetAccountBookNumber, description, Request.UserHostAddress, "编辑凭单账本号", Database);

                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var voucher = Request.GetEntity(Database.Vouchers, "VoucherId");
            bool iscorrect = Request.GetBoolean("IsCorrect").Value;

            if (!iscorrect && !User.CanDelete(voucher, Database))
                throw new HasNoPermissionException();

            voucher.Delete(Database);

            //当时数据纠错功能时，更新项目经费数据
            if (iscorrect)
                voucher.FundAllocation.FundDescend.Save(Database);

        }
        [WebMethod]
        public void SetIsRead()
        {
            var voucher = Request.GetEntity(Database.Vouchers, "voucherID");
            if (User.IsExpert)
                voucher.IsRead = true;
            voucher.Save(Database);
        }
        [WebMethod]
        public void GetMyUnReadVoucherCount()
        {
            if (!User.IsExpert)
                throw new ArgumentException("只有专家有这个权限");

            Response.WriteXmlHead();
            Database
                .Vouchers
                .GetMyUnReadVouchers(User)
                .Show(Response);
        }
        [WebMethod]
        public void GetById()
        {
            var voucher = Request.GetEntity(Database.Vouchers, "voucherId");

            Response.WriteXmlHead();
            voucher.ShowInList(Response, User, Database, VoucherExtension.ShowVoucher);
        }
        [WebMethod]
        public void CheckIsPrinciple()
        {
            bool isCorrect = Request.GetBoolean("IsCorrect").Value;
            var voucher = Request.GetVoucher(User, isCorrect, Database);
            string voucherOutsString = Request.GetString("voucherOutString");
            if (voucherOutsString == null || string.IsNullOrEmpty(voucherOutsString.Trim()))
            {
                Response.Write("true");
            }
            else
            {
                if (voucher.FundMember.Expert == voucher.FundAllocation.FundDescend.ProjectInfo_Fund.Project.Principal)
                    Response.Write("true");
                else
                    Response.Write("false");
            }
        }
        [WebMethod]
        public void DecideOutsourcingGrid()
        {
            var fundAllocation = Database.FundAllocations.GetByID(Request.GetInt("FundAllocationId").Value);
            var expertID = Request.GetInt("ExpertId").Value;
            if (fundAllocation.FundDescend.ProjectInfo_Fund.Project.Principal.ID == expertID)
            {
                Response.Write("true");
            }
            else
            {
                Response.Write("false");
            }
        }
        [WebMethod]
        public void CheckExpertIsAllocated()
        {
            var fundAllocation = Database.FundAllocations.GetByID(Request.GetInt("FundAllocationId").Value);
            var expertID = Request.GetInt("ExpertId").Value;
            var vouchers = Database.Vouchers.Where(c => c.FundAllocation == fundAllocation);
            bool flag=false;
            foreach (var item in vouchers)
            {
                if (item.FundMember.ExpertID == expertID)
                {
                    flag = true;
                }
            }
            if (flag == true)
                Response.Write("true");
            else
                Response.Write("false");
        }
        //carlsirce 2013.6.28 更新新旧外协名称
        [WebMethod]
        public void ImportOutsourcingName()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.OutsourcingNameUpdate(postedFiles[0], Request, User);
            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
    }
}
