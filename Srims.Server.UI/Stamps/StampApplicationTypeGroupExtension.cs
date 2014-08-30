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
    public static class StampApplicationTypeGroupExtension
    {
        /// 显示文印
        /// </summary>
        /// <param name="stampApplicationType"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowStampApplicationTypeGroup(StampApplicationTypeGroup stampApplicationTypeGroup, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", stampApplicationTypeGroup.ID);
            response.WriteTagWithValue("Name", stampApplicationTypeGroup.Name);

            response.WriteTagWithValue("Can_Delete", stampApplicationTypeGroup.Can_Delete(database));

        }
        
        /// <summary>
        /// 文印查询的显示扩展
        /// </summary>
        /// <param name="stampApplicationQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<StampApplicationTypeGroup> stampApplicationQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<StampApplicationTypeGroup> showDelegate = new ShowDelegateWithUserAndDatabase<StampApplicationTypeGroup>(ShowStampApplicationTypeGroup);
            stampApplicationQueryResult.Show<StampApplicationTypeGroup>(response, user, database, showDelegate);
        }

        /// <summary>
        /// 取得图章编辑信息
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static StampApplicationTypeGroup GetStampApplicationTypeGroup(this HttpRequest request, IDatabase database, User user)
        {
            var stampApplicationType = request.getStampApplicationTypeGroup(database, user);
            if (!string.IsNullOrEmpty(request.GetString("Name")))
                stampApplicationType.Name = request.GetString("Name");
            return stampApplicationType;
        }
        private static StampApplicationTypeGroup getStampApplicationTypeGroup(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.StampApplicationTypeGroups.GetByID(id.Value);
            var stamp = new StampApplicationTypeGroup();
            return stamp;
        }

        /// <summary>
        ///  取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldStampApplicationTypeGroup(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getStampApplicationTypeGroup(database, user).Clone();
            return oldEntity;
        }
    }
}
