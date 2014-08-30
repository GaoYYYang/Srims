using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;
using System.Transactions;

using Srims.Server.Business.Performances;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Performances;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Performance
{
    /// <summary>
    /// Summary description for PerformanceVoucherWebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class PerformanceVoucherWebService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .PerformanceVouchers
                .Query(Request.GetPerformanceVoucherQueryInformantion(User), Database, User)
                .Show(Response, User, Database);
        }

        [WebMethod]
        public void GetByPerformanceAllocation()
        {
            Response.WriteXmlHead();

            Database
                .PerformanceVouchers
                .GetByPerformanceAllocation(Request.GetInt("performanceId").Value)
                .Show(Response, User, Database, PerformanceVoucherExtension.ShowVoucher);
        }
        [WebMethod]
        public void Save()
        {
            var oldVoucher = Request.GetOldVoucher(Database);
            var voucher = Request.GetVoucher(User, Database);
            bool newVoucher = voucher.IsNew;
            var currentState = voucher.CurrentState;

            if (!User.CanEdit(voucher, Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {

                if (newVoucher)
                    voucher.CurrentState = null;

                voucher.Save(Database);
                currentState.Save(Database);

                if (newVoucher)
                {
                    voucher.CurrentState = currentState;
                    voucher.Save(Database);
                }

                voucher.Save(Database);




                // 新建或编辑凭单（newVoucher:绩效凭单号）
                var description = string.Format("{0}\n对应经费成员为：{1}。\n{2}", newVoucher ? "新绩效分配" : "编辑绩效分配", voucher.FundMember.Expert.Name, Log.GetEditOperationDescription(oldVoucher, voucher, PerformanceVoucher.GetDescriptionItems(), newVoucher));
                Log.Write(User.Name, newVoucher ? (int)LogType.VoucherNew : (int)LogType.VoucherEdit, description, Request.UserHostAddress, newVoucher ? "新建绩效凭单" : "编辑绩效凭单", Database);

                ts.Complete();
            }
        }

        [WebMethod]
        public void Delete()
        {
            var voucher = Request.GetEntity(Database.PerformanceVouchers, "VoucherId");

            if (!User.CanDelete(voucher, Database))
                throw new HasNoPermissionException();

            voucher.Delete(Database);
        }
        //打印绩效凭单
        [WebMethod]
        public void VoucherPrint()
        {
            var performanceVoucher = Request.GetEntity<PerformanceVoucher>(Database.PerformanceVouchers, "performanceVoucherID");
            if (!User.HasPermission_Print(performanceVoucher, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("凭单打印，对应的绩效凭单号为：{0}。", performanceVoucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherPrint, description, Request.UserHostAddress, "绩效凭单打印", Database);

                performanceVoucher.Print(User, Database);
                Response.WriteXmlHead();
                performanceVoucher.ShowInList(Response, User, Database, PerformanceVoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        //重置打印
        [WebMethod]
        public void VoucherResetPrint()
        {
            var performanceVoucher = Request.GetEntity<PerformanceVoucher>(Database.PerformanceVouchers, "performanceVoucherID");

            if (!User.HasPermission_ResetPerformanceVoucherPrint())
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("重置绩效凭单打印状态，对应的绩效凭单号为：{0}。", performanceVoucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherSetPrint, description, Request.UserHostAddress, "重置绩效凭单打印状态", Database);

                performanceVoucher.UnPrinted(User, Database);
                Response.WriteXmlHead();
                performanceVoucher.ShowInList(Response, User, Database, PerformanceVoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        //签收绩效凭单
        [WebMethod]
        public void VoucherSignIn()
        {
            var performanceVoucher = Request.GetEntity<PerformanceVoucher>(Database.PerformanceVouchers, "performanceVoucherID");
            if (!User.HasPermission_SignIn(Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("签收绩效凭单，对应的绩效凭单号为：{0}。", performanceVoucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherSignIn, description, Request.UserHostAddress, "签收绩效凭单", Database);

                performanceVoucher.SignIn(User, Database);
                Response.WriteXmlHead();
                performanceVoucher.ShowInList(Response, User, Database, PerformanceVoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        //退回绩效凭单
        [WebMethod]
        public void VoucherReturn()
        {
            var performanceVoucher = Request.GetEntity<PerformanceVoucher>(Database.PerformanceVouchers, "performanceVoucherID");
            if (!User.HasPermission_ReturnVoucher(Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("设置绩效凭单状态为退回，对应的凭单号为：{0}。", performanceVoucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherReturn, description, Request.UserHostAddress, "设置绩效凭单状态为退回", Database);

                performanceVoucher.Return(User, Database);
                Response.WriteXmlHead();
                performanceVoucher.ShowInList(Response, User, Database, PerformanceVoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        //取消分配绩效凭单
        [WebMethod]
        public void VoucherCancleAllocate()
        {
            var performanceVoucher = Request.GetEntity<PerformanceVoucher>(Database.PerformanceVouchers, "performanceVoucherID");
            if (!User.HasPermission_CancelFinanceAllocate(Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("设置绩效凭单状态为取消分配，对应的绩效凭单号为：{0}。", performanceVoucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherCancelAllocate, description, Request.UserHostAddress, "设置绩效凭单状态为取消分配", Database);

                performanceVoucher.FinanceNumber = null;
                performanceVoucher.FinanceAllocateDateTime = null;
                performanceVoucher.CancelAllocate(User, Database);
                Response.WriteXmlHead();
                performanceVoucher.ShowInList(Response, User, Database, PerformanceVoucherExtension.ShowVoucher);
                ts.Complete();
            }
        }
        //财务分配（绩效凭单号）
        [WebMethod]
        public void VoucherAllocate()
        {
            var performanceVoucher = Request.GetFinanceAllocatdVoucher(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                performanceVoucher.Save(Database);
                var description = string.Format("财务分配，对应的绩效凭单号为：{0}。", performanceVoucher.VoucherNumber);
                Log.Write(User.Name, (int)LogType.VoucherAllocate, description, Request.UserHostAddress, "财务分配", Database);
                Response.WriteXmlHead();
                performanceVoucher.ShowInList(Response, User, Database, PerformanceVoucherExtension.ShowVoucher);
                ts.Complete();
            }
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
                .PerformanceVouchers
                .GetMyUnReadVouchers(User)
                .Show(Response);
        }

        [WebMethod]
        public void GetById()
        {
            var voucher = Request.GetEntity(Database.PerformanceVouchers, "voucherId");

            Response.WriteXmlHead();
            voucher.ShowInList(Response, User, Database, PerformanceVoucherExtension.ShowVoucher);
        }
        [WebMethod]
        public void SaveForSetAccountBookNumber()
        {
            var voucher = Request.GetEntity(Database.PerformanceVouchers, "VoucherId");
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
    }
}
