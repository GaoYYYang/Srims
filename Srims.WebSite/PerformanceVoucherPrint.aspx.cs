using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using MIS.Common;

using Srims.Server.Business.Performances;
using Srims.Server.DataAccess;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Fund;


namespace Srims.WebSite
{
    public partial class PerformanceVoucherPrint : System.Web.UI.Page
    {
        private PerformanceVoucher performanceVoucher;

        private Database _Database = Database.New(ConfigurationManager.ConnectionStrings["SrimsDatabase"].ConnectionString);

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
            performanceVoucher = this.Request.GetEntity<PerformanceVoucher>(Database.PerformanceVouchers, "PerformanceVoucherID");
        }
        protected void Page_Load(object sender, EventArgs e)
        {
        }
        protected void Display()
        {
            PerformanceAllocation performanceAllocation = performanceVoucher.PerformanceAllocation;
            Finance finance = performanceAllocation.Performance.FundAllocation == null ? null : performanceAllocation.Performance.FundAllocation.FundDescend.GetFinance(Database.FinanceFundDescends);
            FundMember fundMember = performanceVoucher.FundMember;

            string getFundDate = finance == null ? string.Empty : finance.ReceivedDate.ToString();

            LabelTime.Text = DateTime.Now.ToLongDateString().ToString();

            LiteralVoucherNumber.Text = performanceVoucher.VoucherNumber.ToShowAsHtmlString();
            LiteralVoucherFundMember.Text = fundMember.Expert == null ? "&nbsp;" : fundMember.Expert.Name.ToShowAsHtmlString();
            ExpertNumber.Text = fundMember.Expert == null ? "&nbsp;" : fundMember.Expert.Number.ToShowAsHtmlString();

            if (performanceAllocation.Performance.Project != null)
                LiteralProjectName.Text = performanceAllocation.Performance.Project.IsSecret ? "******" : performanceAllocation.Performance.Project.Name.ToShowAsHtmlString();
            else
                LiteralProjectName.Text = "&nbsp;";

            if (performanceVoucher.FundMember.IsExpertSecondCollege == true && performanceVoucher.FundMember.Expert != null && performanceVoucher.FundMember.Expert.College2 != null)
                LiteralExpertDepartment.Text = performanceVoucher.FundMember.Expert.College2.Name.ToShowAsHtmlString();
            else if (performanceVoucher.FundMember.IsExpertSecondCollege != true && performanceVoucher.FundMember.Expert != null && performanceVoucher.FundMember.Expert.College != null)
                LiteralExpertDepartment.Text = performanceVoucher.FundMember.Expert.College.Name.ToShowAsHtmlString();
            else
                LiteralExpertDepartment.Text = "&nbsp;";


            if (performanceVoucher.PerformanceAllocation.Performance.Project != null)
                LiteralProjectType.Text = performanceAllocation.Performance.Project.GetProjectInfo_Type(Database.ProjectInfo_Types).Type.Name.ToShowAsHtmlString();
            else
                LiteralProjectType.Text = "&nbsp;";

            LiteralGetFundTime.Text = string.IsNullOrEmpty(getFundDate) ? "&nbsp;" : getFundDate.Substring(0, getFundDate.IndexOf(' '));
            LiteralAccountBookNumber.Text = performanceVoucher.AccountBookNumber.ToShowAsHtmlString();
            LabelVacherMakerName.Text = performanceAllocation.CurrentState.Operator.ToShowAsHtmlString();
            //20131221change
            LiteralPerformancePay.Text = performanceVoucher.PerformancePay.ToShowAsMoney();

            LiteralTotalFund.Text = ((performanceVoucher.OverheadExpensesExpert == null ? 0 : performanceVoucher.OverheadExpensesExpert.Value) + performanceVoucher.PerformancePay).ToShowAsMoney();

            ExpertIndirect.Text = (performanceVoucher.OverheadExpensesExpert == null ? 0 : performanceVoucher.OverheadExpensesExpert.Value).ToShowAsMoney();

            if (finance != null)
            {
                LiteralAbstract.Text = finance.Abstract.ToShowAsHtmlString();
                LabelFinanceVoucherNumber.Text = finance.VoucherNumber.ToShowAsHtmlString();
            }
            else
            {
                LiteralAbstract.Text = "经费来源于间接费用调整";
                LabelFinanceVoucherNumber.Text = "&nbsp;";
            }

            DataBind();
        }
    }
}
