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
    public static class StampApplicationTypeExtension
    {
        /// <summary>
        /// 显示文印
        /// </summary>
        /// <param name="stampApplicationType"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowStampApplicationType(StampApplicationType stampApplicationType, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", stampApplicationType.ID);
            response.WriteTagWithValue("Name", stampApplicationType.Name);
            response.WriteTagWithValue("IsProjectRelated", stampApplicationType.IsProjectRelated);
            response.WriteTagWithValue("IsTwiceCancer", stampApplicationType.IsTwiceCancer);
            response.WriteTagWithValue("StampApplicationTypeGroupName", stampApplicationType.StampApplicationTypeGroup.Name);
            response.WriteTagWithValue("StampApplicationTypeGroupID", stampApplicationType.StampApplicationTypeGroup.ID);

            response.WriteTagWithValue("Can_Delete", stampApplicationType.Can_Delete(database));

        }
        /// <summary>
        /// 文印查询的显示扩展
        /// </summary>
        /// <param name="stampApplicationQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<StampApplicationType> stampApplicationQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<StampApplicationType> showDelegate = new ShowDelegateWithUserAndDatabase<StampApplicationType>(ShowStampApplicationType);
            stampApplicationQueryResult.Show<StampApplicationType>(response, user, database, showDelegate);
        }

        /// <summary>
        /// 取得图章编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static StampApplicationType GetStampApplicationType(this HttpRequest request, IDatabase database, User user)
        {
            var stampApplicationType = request.getStampApplicationType(database, user);
            if (request.GetBoolean("IsTwiceCancer").HasValue)
                stampApplicationType.IsTwiceCancer = request.GetBoolean("IsTwiceCancer").Value;
            if (request.GetBoolean("IsProjectRelated").HasValue)
                stampApplicationType.IsProjectRelated = request.GetBoolean("IsProjectRelated").Value;
            if (request.GetInt("StampApplicationTypeGroupID").HasValue)
            {
                var StampApplicationTypeGroup = database.StampApplicationTypeGroups.GetByID(request.GetInt("StampApplicationTypeGroupID").Value);
                stampApplicationType.StampApplicationTypeGroup = StampApplicationTypeGroup;
            }
            if (!string.IsNullOrEmpty(request.GetString("Name")))
                stampApplicationType.Name = request.GetString("Name");
            return stampApplicationType;
        }

        private static StampApplicationType getStampApplicationType(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.StampApplicationTypes.GetByID(id.Value);
            var stamp = new StampApplicationType();
            return stamp;
        }
        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldStampApplicationType(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getStampApplicationType(database, user).Clone();
            return oldEntity;
        }

    }
}
