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
using Srims.Server.Business.Users;

namespace Srims.WebSite
{
    public partial class RecoveryPrint : System.Web.UI.Page
    {
        private Recovery recovery;

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
            recovery = this.Request.GetEntity<Recovery>(Database.Recovery, "RecoveryID");
        }
        protected void Page_Load(object sender, EventArgs e) { }
        //carlsirce2013.3.26
        protected String UserIP
        {
            get { return Context.Request.UserHostAddress; }
        }
        /// <summary>
        /// 取得当前用户登陆记录
        /// </summary>
        /// <returns>如果当前用户未登陆，返回空</returns>
        protected UserLoginLog GetUserLoginLog()
        {
            var token = GetToken();
            if (!token.HasValue)
                return null;

            return Database
                .UserLoginLogs
                .GetActiveUserLoginLog(token.Value, UserIP);
        }
        /// <summary>
        /// 取得该次登陆令牌
        /// </summary>
        /// <returns></returns>
        protected Guid? GetToken()
        {
            string token;

            token = Context.Request["token"];
            if (token != null)
                return new Guid(token);

            token = Context.Request["ys-token"];
            if (token != null)
                return new Guid(token.Replace("s%3A", string.Empty));

            return null;

        }
        /// <summary>
        /// 取得当前登陆的用户，如果当前用户未登陆，返回空
        /// </summary>
        protected new User User
        {
            get
            {
                var userLoginLog = GetUserLoginLog();
                return userLoginLog == null ? null : userLoginLog.User;
            }
        }

        private void Display()
        {
            LabelTime.Text = DateTime.Now.ToLongDateString().ToString();
            RecoveryVoucherNumber.Text = recovery.VoucherNumber == null ? "" : recovery.VoucherNumber.ToShowAsHtmlString();
            RecoveryProjectPrincipal.Text = recovery.Project.Principal == null ? "" : recovery.Project.Principal.Name.ToShowAsHtmlString();
            ExpertNumber.Text = recovery.Project.Principal == null ? "&nbsp;" : recovery.Project.Principal.Number.ToShowAsHtmlString();
            RecoveryProjectName.Text = recovery.Project.Name.ToShowAsHtmlString();
            RecoveryProjectDepartment.Text = recovery.Project.Principal.College == null ? "" : recovery.Project.Principal.College.Name.ToShowAsHtmlString();
            RecoveryProjectType.Text = recovery.Project.GetProjectInfo_Type(Database.ProjectInfo_Types).Type.Name.ToShowAsHtmlString();
            FundAlreadyIn.Text = recovery.CurrentAllocationIn == null ? recovery.Project.Fund.FundAlreadyIn.ToShowAsMoney() : recovery.CurrentAllocationIn.Value.ToShowAsMoney();
            ReceivedOverheadExpenses.Text = (recovery.ReceivedOverheadExpensesIn + recovery.ReceivedOverheadExpensesMiddle + recovery.ReceivedPerformancePay.Value).ToShowAsMoney();
            OverheadExpensesAmount.Text = (recovery.PlanedOverheadExpensesIn + recovery.PlanedOverheadExpensesMiddle + recovery.PlanedPerformancePay.Value).ToShowAsMoney();
            AdjustAmount.Text = (recovery.PlanedOverheadExpensesIn + recovery.PlanedPerformancePay.Value + recovery.PlanedOverheadExpensesMiddle - recovery.ReceivedOverheadExpensesMiddle - recovery.ReceivedOverheadExpensesIn - recovery.ReceivedPerformancePay.Value).ToShowAsMoney();
            RecoveryAmount.Text = (recovery.PlanedOverheadExpensesIn - recovery.ReceivedOverheadExpensesIn).ToShowAsMoney();
            Literal1.Text = (recovery.PlanedPerformancePay.Value - recovery.ReceivedPerformancePay.Value).ToShowAsMoney();

            Literal2.Text = (recovery.PlanedOverheadExpensesMiddle - recovery.ReceivedOverheadExpensesMiddle).ToShowAsMoney();
            var member = recovery.Project.Principal;
            var fundmember = Database.FundMembers.SingleOrDefault(c => c.Expert == member && c.AccountBookNumber.Substring(5, 1) != "9" && c.ProjectInfo_Fund.Project == recovery.Project);
            PrincipalAcountBookNumber.Text = fundmember == null ? "" : fundmember.AccountBookNumber == null ? "" : fundmember.AccountBookNumber.ToShowAsHtmlString();
            Remark.Text = recovery.Remark == null ? "" : recovery.Remark.ToShowAsHtmlString();
            LabelVacherMakerName.Text = User.Name;

            Literal3after.Text = recovery.PlanedOverheadExpensesIn.ToShowAsMoney();     //调整后学校间接费用
            Literal4after.Text = recovery.PlanedOverheadExpensesMiddle.ToShowAsMoney();    //调整后二级单位间接费用
            Literal5after.Text = recovery.PlanedPerformancePay.Value.ToShowAsMoney();      //调整后课题组间接费用



        }
    }
}
