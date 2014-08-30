using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

using Srims.Server.UI.Stamps;
using Srims.Server.Business.Stamps;
using System.Transactions;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

namespace Srims.WebSite.Service.Stamps
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class StampApplicationWebService : WebServiceBase
    {

        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .StampApplications
                .Query(Request.GetStampQueryInformation(), User, Database, null, null)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void QueryForCensor()
        {
            Response.WriteXmlHead();
            Database
                .StampApplications
               .Query(Request.GetStampQueryInformation(), User, Database, StampState.Submit, null)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void QueryForStampFeedback()
        {
            Response.WriteXmlHead();
            Database
                .StampApplications
               .Query(Request.GetStampQueryInformation(), User, Database, StampState.DepartmentCensorPass, StampState.CensorPassComplete)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void QueryForDepartmentCensor()
        {
            Response.WriteXmlHead();
            Database
                .StampApplications
               .Query(Request.GetStampQueryInformation(), User, Database, StampState.CensorPass, null)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetWaitingCensorStamp()
        {
            Response.WriteXmlHead();
            Database
                .StampApplications
                .GetWaitingCensorStampApplication(User, Database)
                .Show(Response);
        }
        [WebMethod]
        public void GetWaitingDepartmentCensorStamp()
        {
            Response.WriteXmlHead();
            Database
                .StampApplications
                .GetWaitingDepartmentCensorStampApplication(User, Database)
                .Show(Response);
        }
        [WebMethod]
        public void GetStampReasons()
        {
            Response.WriteXmlHead();
            Database
               .StampApplications
               .StampReasons()
               .Show(Response);
        }
        [WebMethod]
        public void CancleSubmitStamp()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");
            if (!User.HasPermission_CancleSubmitStamp(stamp, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                stamp.CancleSubmit(User, Database);

                var description = string.Format("取消文印提交,对应的文印详情为：\n{0}", stamp.ToString());
                Log.Write(User.Name, (int)LogType.SubmitStamp, description, Request.UserHostAddress, "取消文印提交", Database);

                var state = stamp.CurrentState;
                var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
                Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

                Response.WriteXmlHead();
                stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
                ts.Complete();
            }
        }
        [WebMethod]
        public void SubmitStamp()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");
            if (!User.HasPermission_SubmitStamp(stamp, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("提交文印,对应的文印详情为：\n{0}", stamp.ToString());
                Log.Write(User.Name, (int)LogType.SubmitStamp, description, Request.UserHostAddress, "提交文印", Database);

                stamp.Submit(User, Database);

                var state = stamp.CurrentState;
                var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
                Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

                Response.WriteXmlHead();
                stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
                ts.Complete();
            }
        }
        [WebMethod]
        public void CensorPassStamp()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");

            if (!User.HasPermission_CensorStamp(Database, stamp))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("文印审核通过，对应文印详情为：\n{0}", stamp.ToString());
                Log.Write(User.Name, (int)LogType.CensorPassStamp, description, Request.UserHostAddress, "文印审核通过", Database);

                stamp.CensorPass(User, Database);

                var state = stamp.CurrentState;
                var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
                Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

                Response.WriteXmlHead();
                stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
                ts.Complete();
            }
        }
        [WebMethod]
        public void DepartmentCensorPassStamp()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");

            if (!User.HasPermission_DepartmentCensorStamp(Database, stamp))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("文印部门审核通过，对应文印详情为：\n{0}", stamp.ToString());
                Log.Write(User.Name, (int)LogType.DepartmentCensorPassStamp, description, Request.UserHostAddress, "文印部门审核通过", Database);

                stamp.DepartmentCensorPass(User, Database);

                var state = stamp.CurrentState;
                var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
                Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

                Response.WriteXmlHead();
                stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
                ts.Complete();
            }
        }
        [WebMethod]
        public void CensorPassCompleteStamp()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");

            if (!User.CanCensorCompleteStamp(stamp, Database))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("初审直接审核通过，对应文印详情为：\n{0}", stamp.ToString());
                Log.Write(User.Name, (int)LogType.CensorPassStamp, description, Request.UserHostAddress, "文印初审直接审核通过", Database);

                stamp.CensorPassComplete(User, Database);

                var state = stamp.CurrentState;
                var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
                Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

                Response.WriteXmlHead();
                stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
                ts.Complete();
            }
        }
        //[WebMethod]
        //public void WaitDepartmentCensorStamp()
        //{
        //    var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");

        //    if (!User.HasPermission_CensorStamp(Database, stamp))
        //        throw new HasNoPermissionException();
        //    using (TransactionScope ts = new TransactionScope())
        //    {
        //        var description = string.Format("提交部门审核，对应文印详情为：\n{0}", stamp.ToString());
        //        Log.Write(User.Name, (int)LogType.CensorPassStamp, description, Request.UserHostAddress, "提交部门审核", Database);

        //        stamp.WaitDepartmentCensor(User, Database);

        //        var state = stamp.CurrentState;
        //        var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
        //        Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

        //        Response.WriteXmlHead();
        //        stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
        //        ts.Complete();
        //    }
        //}
        [WebMethod]
        public void DepartmentCensorRejectStamp()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");
            var remark = Request.GetString("remark");

            if (!User.HasPermission_DepartmentCensorStamp(Database, stamp))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("文印部门审核驳回，对应文印详情为：\n{0}", stamp.ToString());
                Log.Write(User.Name, (int)LogType.CensorRejectStamp, description, Request.UserHostAddress, "文印部门审核驳回", Database);

                stamp.DepartmentCensorReject(User, remark, Database);
                var state = stamp.CurrentState;
                var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
                Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

                Response.WriteXmlHead();
                stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
                ts.Complete();
            }
        }

        [WebMethod]
        public void CensorRejectStamp()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");
            var remark = Request.GetString("remark");

            if (!User.HasPermission_CensorStamp(Database, stamp) && !User.HasPermission_CensorCompleteStamp(Database, stamp))
                throw new HasNoPermissionException();
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("文印审核驳回，对应文印详情为：\n{0}", stamp.ToString());
                Log.Write(User.Name, (int)LogType.CensorRejectStamp, description, Request.UserHostAddress, "文印审核驳回", Database);

                stamp.CensorReject(User, remark, Database);
                var state = stamp.CurrentState;
                var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
                Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

                Response.WriteXmlHead();
                stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
                ts.Complete();
            }
        }
        [WebMethod]
        public void StampStamp()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");
            if (!User.HasPermission_Stamp(Database))
                throw new HasNoPermissionException();

            stamp.StampMyStamp(Database.Stuffs, Database, User);

            if (stamp.AllIsStamped(Database.Stuffs, Database))
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("文印盖章，对应文印详情为：\n{0}", stamp.ToString());
                    Log.Write(User.Name, (int)LogType.StampStamp, description, Request.UserHostAddress, "文印盖章", Database);

                    stamp.Stamped(User, Database);
                    var state = stamp.CurrentState;
                    var stateDescription = Log.GetEditOperationDescription(new StampStateHistory(), state, StampStateHistory.GetDescriptionItems(), true);
                    Log.Write(User.Name, (int)LogType.NewStampStateHistory, stateDescription, Request.UserHostAddress, "新建文印历史状态", Database);

                    Response.WriteXmlHead();
                    stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void Save()
        {
            var oldStamp = Request.GetOldStampApplication(Database, User);
            var stamp = Request.GetStampApplication(Database, User);
            var currentState = stamp.CurrentState;
            var isNew = stamp.IsNew;
            using (TransactionScope ts = new TransactionScope())
            {
                if (isNew)
                {
                    stamp.CurrentState = null;
                    var description = string.Format("添加文印\n  对应的文印项目来源为：{0}。", stamp.StampStuffFromName)
                        + Log.GetEditOperationDescription(new StampApplication(), stamp, StampApplication.GetDescriptionItems(), true);
                    Log.Write(User.Name, (int)LogType.AddStamp, description, Request.UserHostAddress, "添加文印", Database);

                    stamp.Save(Database);
                    currentState.StampApplication = stamp;
                }

                currentState.Save(Database);
                stamp.CurrentState = currentState;
                var editDescription = Log.GetEditOperationDescription(oldStamp, stamp, StampApplication.GetDescriptionItems(), false);
                Log.Write(User.Name, (int)LogType.EditStamp, editDescription, Request.UserHostAddress, "编辑文印", Database);

                stamp.Save(Database);
                if (isNew)
                {
                    if (!User.IsExpert)
                    {
                        stamp.SendMessageToPrincipal(User, "审核通过", Database);
                        stamp.SendMessageToAdmin(User, "审核通过", Database, PermissionItem.ManageStampFeedback);
                    }
                    else
                        stamp.SendMessageToAdmin(User, "提交文印申请", Database, PermissionItem.ManageStamp);
                }
                if (!isNew)
                    stamp.DeleteAllStuffs(Database);
                ts.Complete();
            }
            Response.WriteXmlHead();
            stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
        }

        [WebMethod]
        public void Delete()
        {
            var stamp = Request.GetEntity<StampApplication>(Database.StampApplications, "stampApplicationID");

            if (stamp != null)
                using (TransactionScope ts = new TransactionScope())
                {
                    var description = string.Format("删除文印，对应文印详情为：\n{0}", stamp.ToString());
                    Log.Write(User.Name, (int)LogType.DeleteStamp, description, Request.UserHostAddress, "文印删除", Database);

                    stamp.Delete(Database);
                    ts.Complete();
                }
        }
        [WebMethod]
        public void GetById()
        {
            var stamp = Request.GetEntity(Database.StampApplications, "stampApplicationId");

            Response.WriteXmlHead();
            stamp.ShowInList(Response, User, Database, StampApplicationExtension.ShowStampApplication);
        }

    }
}
