using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Stamps;
using Srims.Server.Business.Users;
using Srims.Server.Business;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Projects;
using System.Web;

namespace Srims.Server.UI.Stamps
{
    /// <summary>
    /// 文印申请扩展
    /// </summary>
    public static class StampApplicationExtension
    {
        /// <summary>
        /// 显示文印
        /// </summary>
        /// <param name="stampApplication"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowStampApplication(StampApplication stampApplication, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", stampApplication.ID);
            response.WriteTagWithValue("CurrentState", stampApplication.CurrentState.State);
            response.WriteTagWithValue("CurrentStateTime", stampApplication.CurrentState.DateTime);
            response.WriteTagWithValue("Operator", stampApplication.CurrentState.Operator);
            response.WriteTagWithValue("KeyWord", stampApplication.KeyWord);
            response.WriteTagWithValue("Manager", stampApplication.Manager);
            response.WriteTagWithValue("ManagerPhone", stampApplication.ManagerPhone);
            response.WriteTagWithValue("ManagerEmail", stampApplication.ManagerEmail);
            response.WriteTagWithValue("PrincipalID", stampApplication.Principal.ID);
            response.WriteTagWithValue("Principal", stampApplication.Principal.Name);
            response.WriteTagWithValue("StampReason", stampApplication.StampReason);

            response.WriteTagWithValue("StampStuffFromID", stampApplication.StampStuffFromID);
            response.WriteTagWithValue("StampStuffFromName", stampApplication.StampStuffFromName);
            response.WriteTagWithValue("StuffNumber", stampApplication.StuffNumber);
            response.WriteTagWithValue("IsDuplexPrint", stampApplication.IsDuplexPrint);
            response.WriteTagWithValue("SealPerforation", stampApplication.SealPerforation);
            response.WriteTagWithValue("ExpertPrint", stampApplication.ExpertPrint);
            response.WriteTagWithValue("StampApplicationTypeID", stampApplication.StampApplicationTypeID);
            response.WriteTagWithValue("StampApplicationTypeName", stampApplication.StampApplicationType.Name);
            response.WriteTagWithValue("IsProjectRelated", stampApplication.StampApplicationType.IsProjectRelated);
            response.WriteTagWithValue("IsTwiceCancer", stampApplication.StampApplicationType.IsTwiceCancer);
            response.WriteTagWithValue("StampApplicationTypeGroupName", stampApplication.StampApplicationType.StampApplicationTypeGroup.Name);
            response.WriteTagWithValue("StampApplicationTypeGroupID", stampApplication.StampApplicationType.StampApplicationTypeGroup.ID);

            //has
            response.WriteTagWithValue("HasPermission_Show", user.HasPermission_ShowStamp(stampApplication, database));
            response.WriteTagWithValue("HasPermission_Censor", user.HasPermission_CensorStamp(database, stampApplication));
            response.WriteTagWithValue("HasPermission_DepartmentCensor", user.HasPermission_DepartmentCensorStamp(database, stampApplication));
            response.WriteTagWithValue("HasPermission_Edit", user.HasPermission_EditStampApplication(stampApplication, database));
            response.WriteTagWithValue("HasPermission_Stamp", user.HasPermission_Stamp(database));
            response.WriteTagWithValue("HasPermission_Submit", user.HasPermission_SubmitStamp(stampApplication, database));
            response.WriteTagWithValue("HasPermission_CancleSubmit", user.HasPermission_CancleSubmitStamp(stampApplication, database));
            response.WriteTagWithValue("HasPermission_ManageStampStuff", user.HasPermission_ManageStampStuff(stampApplication, database));

            //can
            response.WriteTagWithValue("CanShow", user.CanShowStamp(stampApplication, database));
            response.WriteTagWithValue("CanCensor", user.CanCensorStamp(stampApplication, database));
            response.WriteTagWithValue("CanDepartmentCensor", user.CanDepartmentCensorStamp(stampApplication, database));
            response.WriteTagWithValue("CanEdit", user.CanEditStampApplication(stampApplication, database));
            response.WriteTagWithValue("CanStamp", user.CanStamp(stampApplication, database));
            response.WriteTagWithValue("CanSubmit", user.CanSubmitStamp(stampApplication, database));
            response.WriteTagWithValue("CanCancleSubmit", user.CanCancleSubmitStamp(stampApplication, database));
            response.WriteTagWithValue("CanManageStampStuff", user.CanManageStampStuff(stampApplication, database));
            //carlsirce2013.8.28是否可初审最终通过
            response.WriteTagWithValue("CanCensorPassComplete", user.CanCensorCompleteStamp(stampApplication, database));

        }
        /// <summary>
        /// 文印查询的显示扩展
        /// </summary>
        /// <param name="stampApplicationQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<StampApplication> stampApplicationQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<StampApplication> showDelegate = new ShowDelegateWithUserAndDatabase<StampApplication>(ShowStampApplication);
            stampApplicationQueryResult.Show<StampApplication>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得文印编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static StampApplication GetStampApplication(this HttpRequest request, IDatabase database, User user)
        {
            var stamp = request.getStampApplication(database, user);

            stamp.KeyWord = request.GetString("keyWord");
            stamp.Manager = request.GetString("Manager");
            stamp.ManagerPhone = request.GetString("ManagerPhone");
            stamp.ManagerEmail = request.GetString("ManagerEmail");
            stamp.Principal = request.GetEntity<Expert>(database.Experts, "PrincipalID");
            stamp.StampReason = request.GetString("StampReason");
            stamp.StampStuffFrom = request.GetEntity<Project>(database.Projects, "StampStuffFromID");
            stamp.StampStuffFromName = stamp.StampStuffFrom == null ? request.GetString("StampStuffFromName") : stamp.StampStuffFrom.Name;
            stamp.StuffNumber = request.GetInt("StuffNumber").Value;
            stamp.IsDuplexPrint = request.GetBoolean("IsDuplexPrint").Value;
            stamp.SealPerforation = request.GetBoolean("SealPerforation").Value;
            stamp.ExpertPrint = request.GetBoolean("ExpertPrint").Value;
            stamp.StampApplicationType = request.GetEntity<StampApplicationType>(database.StampApplicationTypes, "StampApplicationTypeID");
            stamp.CurrentState = getStampState(request, stamp, user, database);
            

            return stamp;
        }

        private static StampApplication getStampApplication(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.StampApplications.GetByID(id.Value);
            var stamp = new StampApplication();
            return stamp;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldStampApplication(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getStampApplication(database, user).Clone();
            return oldEntity;
        }
        private static StampStateHistory getStampState(HttpRequest request, StampApplication stampApplication, User user, IDatabase database)
        {
            StampStateHistory stampStateHistory = stampApplication.CurrentState;
            if (stampApplication.IsNew || stampStateHistory.State == StampState.CensorReject)
            {
                stampStateHistory = new StampStateHistory();
                stampStateHistory.StampApplication = stampApplication;

                if (user.IsExpert)
                    stampStateHistory.State = StampState.Submit;
                else if (!user.IsExpert)
                    if (stampApplication.StampApplicationType.IsTwiceCancer == true)
                        stampStateHistory.State = StampState.CensorPass;
                    else
                        stampStateHistory.State = StampState.CensorPassComplete;

                stampStateHistory.DateTime = DateTime.Now;
                stampStateHistory.Operator = user.Name;
            }
            else if (!stampApplication.IsNew && stampStateHistory.State == StampState.UnSubmit && user.IsExpert)
            {
                stampApplication.Submit(user, database);
                stampStateHistory = stampApplication.CurrentState;
            }
            else if (stampStateHistory.State == StampState.CensorReject)
            {
                if (user.IsExpert)
                    stampApplication.Submit(user, database);
                else if (!user.IsExpert)
                    stampApplication.CensorPass(user, database);
                stampStateHistory = stampApplication.CurrentState;
            }
            return stampStateHistory;
        }
    }
}
