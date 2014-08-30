using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using MIS.Common;

using Srims.Server.Business.Fund;
using Srims.Server.DataAccess;
using Srims.Server.UI.HttpExtension;
using System.Text;

namespace Srims.WebSite
{
    public partial class HorizonVoucherPrint : System.Web.UI.Page
    {
        private Voucher voucher;

        private Database _Database = Database.New(ConfigurationManager.ConnectionStrings["SrimsDatabase"].ConnectionString);
        protected string _VoucherOutListHtmlString;

        /// <summary>
        /// 取得数据库访问
        /// </summary>
        public Database Database
        {
            get { return _Database; }
        }

        /// <summary>
        /// 重载的初始化完成，构造查询条件
        /// </summary>
        /// <param name="e"></param>
        protected override void OnInitComplete(EventArgs e)
        {
            base.OnInitComplete(e);
            InitialQueryCondition();
        }
        /// <summary>
        /// 重载的加载函数
        /// </summary>
        /// <param name="e"></param>
        protected override void OnLoad(EventArgs e)
        {
            Display();
            DataBind();

            base.OnLoad(e);
        }
        /// <summary>
        /// 初始化查询条件
        /// </summary>
        protected void InitialQueryCondition()
        {
            voucher = this.Request.GetEntity<Voucher>(Database.Vouchers, "VoucherID");
        }
        protected void Page_Load(object sender, EventArgs e)
        {
        }
        protected void Display()
        {
            LabelVoucnerCensor.Visible = !(voucher.AllocationOut == 0);
            FundAllocation fundAllocation = voucher.FundAllocation;
            Finance finance = fundAllocation.FundDescend.GetFinance(Database.FinanceFundDescends);
            FundMember fundMember = voucher.FundMember;

            string getFundDate = finance == null ? string.Empty : finance.ReceivedDate.ToString();

            LabelTime.Text = DateTime.Now.ToLongDateString().ToString();

            LiteralVoucherNumber.Text = voucher.VoucherNumber.ToShowAsHtmlString();
            LiteralVoucherFundMember.Text = fundMember.Expert == null ? "&nbsp;" : fundMember.Expert.Name.ToShowAsHtmlString();

            ExpertNumber.Text = fundMember.Expert == null ? "&nbsp;" : fundMember.Expert.Number.ToShowAsHtmlString();

            if (fundAllocation.FundDescend != null)
                LiteralProjectName.Text = fundAllocation.FundDescend.ProjectInfo_Fund.Project.IsSecret ? "******" : fundAllocation.FundDescend.ProjectInfo_Fund.Project.Name.ToShowAsHtmlString();
            else
                LiteralProjectName.Text = "&nbsp;";

            if (voucher.FundMember.IsExpertSecondCollege == true && voucher.FundMember.Expert != null && voucher.FundMember.Expert.College2 != null)
                LiteralExpertDepartment.Text = voucher.FundMember.Expert.College2.Name.ToShowAsHtmlString();
            else if (voucher.FundMember.IsExpertSecondCollege != true && voucher.FundMember.Expert != null && voucher.FundMember.Expert.College != null)
                LiteralExpertDepartment.Text = voucher.FundMember.Expert.College.Name.ToShowAsHtmlString();
            else
                LiteralExpertDepartment.Text = "&nbsp;";


            if (voucher.FundAllocation.FundDescend != null)
                LiteralProjectType.Text = fundAllocation.FundDescend.ProjectInfo_Fund.Project.GetProjectInfo_Type(Database.ProjectInfo_Types).Type.Name.ToShowAsHtmlString();
            else
                LiteralProjectType.Text = "&nbsp;";

            LiteralGetFundTime.Text = string.IsNullOrEmpty(getFundDate) ? "&nbsp;" : getFundDate.Substring(0, getFundDate.IndexOf(' '));
            LiteralProjectAllocationFund.Text = voucher.GetAmount().ToShowAsMoney();
            LiteralAccountBookNumber.Text = voucher.AccountBookNumber.ToShowAsHtmlString();
            if ((voucher.ID == 17580 || voucher.ID == 17581 || voucher.ID == 17582 || voucher.ID == 17583 || voucher.ID == 14178))
            {
                LiteralInnerAllocation.Text = voucher.AllocationIn.ToShowAsMoney();
            }
            else
            {
                LiteralInnerAllocation.Text = (voucher.AllocationIn + voucher.OverheadExpensesIn + voucher.OverheadExpensesOut + voucher.OverheadExpensesExpert + voucher.OverheadExpensesMiddle).ToShowAsMoney();
            }
            // LabelChargeFee.Text = voucher.OverheadExpensesIn.ToShowAsMoney();
            LiteralOvheadExpenseOut.Text = voucher.OverheadExpensesOut.ToShowAsMoney();
            LiteralOvheadExpenseTotal.Text = voucher.AllocationIn.ToShowAsMoney();
            LiteralAssistanceAllocation.Text = voucher.AllocationOut.ToShowAsMoney();

            LabelVacherMakerName.Text = fundAllocation.CurrentState.Operator.ToShowAsHtmlString();
            //LiteralPerformancePay.Text = voucher.PerformancePay.ToShowAsMoney();
            LiteralOverheadPerformancePay.Text = voucher.OverheadExpensesIn.ToShowAsMoney();
            ExpertIndirectFee.Text = voucher.OverheadExpensesExpert.ToShowAsMoney();




            if (finance != null)
            {
                LiteralAbstract.Text = finance.Abstract.ToShowAsHtmlString();
                LiteralTotalFund.Text = finance.Amount.ToShowAsMoney();
                LabelFinanceVoucherNumber.Text = finance.VoucherNumber.ToShowAsHtmlString();
            }
            else
            {
                LiteralAbstract.Text = "经费来源于借款";
                LiteralTotalFund.Text = "&nbsp;";
                LabelFinanceVoucherNumber.Text = "&nbsp;";
            }

            var voucherList = voucher.GetVoucherOut(Database.VoucherOuts);
            var stringBuilder = new StringBuilder();
            var fontSize = voucherList.Count <= 3 ? 16 : 12;
            var height = voucherList.Count <= 3 ? 30 : 90 / voucherList.Count;
            if (voucherList.Count != 0)
            {
                stringBuilder.Append("<tr><td><table class=\"tableDetial\" cellpadding=\"0\" cellspacing=\"0\">");
            }
            foreach (var voucherOut in voucherList)
            {
                stringBuilder.Append("<tr>");
                stringBuilder.AppendFormat("<td class=\"label\" style=\"height:{0}px;font-size:{1}px;width: 70px;\">外协单位</td>", height, fontSize);
                stringBuilder.AppendFormat("<td class=\"data\" style=\"height:{0}px;font-size:{1}px;\">{2}</td>", height, fontSize, voucherOut.Outsourcing == null ? voucherOut.Corporation : voucherOut.Outsourcing.Name);
                stringBuilder.AppendFormat("<td class=\"label\" style=\"height:{0}px;font-size:{1}px; width: 70px;\">金额：</td>", height, fontSize);
                stringBuilder.AppendFormat("<td class=\"label\" style=\"height:{0}px;font-size:{1}px;width: 70px;\">{2}</td>", height, fontSize, voucherOut.Amount.ToShowAsMoney());
                stringBuilder.Append("</tr>");
            }
            if (voucherList.Count != 0)
            {
                stringBuilder.Append("</table></td></tr>");
            }
            _VoucherOutListHtmlString = stringBuilder.ToString();
            //ListViewVoucherDetail_OutList.DataSource = voucher.GetVoucherOut(Database.VoucherOuts);
            DataBind();
        }
    }
}