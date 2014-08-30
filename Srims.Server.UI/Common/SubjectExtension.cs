using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using MIS.Common.Query;

using Srims.Server.Business;
using Srims.Server.Business.Common;
using Srims.Server.Business.Users;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 学科相关扩展
    /// </summary>
    public static class SubjectExtension
    {
        /// <summary>
        /// 学科显示扩展
        /// </summary>
        /// <param name="subjectFirstLevel"></param>
        /// <param name="response"></param>
        public static void ShowSubjectFirstLevel(SubjectFirstLevel subjectFirstLevel, HttpResponse response)
        {
            response.WriteTagWithValue("ID", subjectFirstLevel.ID);
            response.WriteTagWithValue("Name", subjectFirstLevel.Name);
            response.WriteTagWithValue("Code", subjectFirstLevel.Code);
        }
        /// <summary>
        ///一级学科列表显示扩展
        /// </summary>
        /// <param name="subjectFirstLevelList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<SubjectFirstLevel> subjectFirstLevelList, HttpResponse response)
        {
            ShowDelegate<SubjectFirstLevel> showDelegate = new ShowDelegate<SubjectFirstLevel>(ShowSubjectFirstLevel);
            subjectFirstLevelList.Show<SubjectFirstLevel>(response, showDelegate);
        }
        /// <summary>
        /// 显示一级学科查询结果
        /// </summary>
        /// <param name="subjectfirstlevelResult">一级学科结果</param>
        /// <param name="response">输出</param>
        public static void Show(this QueryResult<SubjectFirstLevel> subjectfirstlevelResult, HttpResponse response)
        {
            ShowDelegate<SubjectFirstLevel> showDelegate = new ShowDelegate<SubjectFirstLevel>(ShowSubjectFirstLevel);
            subjectfirstlevelResult.Show<SubjectFirstLevel>(response, showDelegate);
        }
        /// <summary>
        /// 二级学科显示扩展
        /// </summary>
        /// <param name="subjectSecondLevel"></param>
        /// <param name="response"></param>
        public static void ShowSubjectSecondLevel(SubjectSecondLevel subjectSecondLevel, HttpResponse response)
        {
            response.WriteTagWithValue("ID", subjectSecondLevel.ID);
            response.WriteTagWithValue("Name", subjectSecondLevel.Name);
            response.WriteTagWithValue("Code", subjectSecondLevel.Code);
            response.WriteTagWithValue("SubjectFirstLevelID", subjectSecondLevel.SubjectFirstLevelID);
            response.WriteTagWithValue("SubjectFirstLevelName", subjectSecondLevel.SubjectFirstLevel.Name);
            response.WriteTagWithValue("ChildCode", subjectSecondLevel.ChildCode);
        }
        /// <summary>
        /// 二级学科列表显示扩展
        /// </summary>
        /// <param name="subjectSecondLevelList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<SubjectSecondLevel> subjectSecondLevelList, HttpResponse response)
        {
            ShowDelegate<SubjectSecondLevel> showDelegate = new ShowDelegate<SubjectSecondLevel>(ShowSubjectSecondLevel);
            subjectSecondLevelList.Show<SubjectSecondLevel>(response, showDelegate);
        }
        /// <summary>
        /// 显示二级学科的查询结果
        /// </summary>
        /// <param name="subjectsecondlevelResult">二级学科结果</param>
        /// <param name="response">输出</param>
        public static void Show(this QueryResult<SubjectSecondLevel> subjectsecondlevelResult, HttpResponse response)
        {
            ShowDelegate<SubjectSecondLevel> showDelegate = new ShowDelegate<SubjectSecondLevel>(ShowSubjectSecondLevel);
            subjectsecondlevelResult.Show<SubjectSecondLevel>(response, showDelegate);
        }
        /// <summary>
        ///取得一级学科
        /// </summary> 
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static SubjectFirstLevel GetSubjectFirstLevel(this HttpRequest request, IDatabase database, User user)
        {
            var subjectfirstlevel = request.getSubjectFirstLevel(database, user);
            subjectfirstlevel.Name = request.GetString("Name").Replace(" ", "");
            subjectfirstlevel.Code = request.GetString("Code");
            return subjectfirstlevel;
        }
        private static SubjectFirstLevel getSubjectFirstLevel(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.SubjectFirstLevels.GetByID(id.Value);

            var subjectfirstlevel = new SubjectFirstLevel();
            return subjectfirstlevel;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldSubjectFirstLevel(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getSubjectFirstLevel(database, user).Clone();
            return oldEntity;
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static Object GetOldSubjectSecondLevel(this HttpRequest request, IDatabase database, User user)
        {
            Object oldEntity = new Object();
            oldEntity = request.getSubjectsecondlevel(database, user).Clone();
            return oldEntity;
        }
        /// <summary>
        /// 取得二级学科
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static SubjectSecondLevel GetSubjectSecondLevel(this HttpRequest request, IDatabase database, User user)
        {
            var subjectsecondlevel = request.getSubjectsecondlevel(database, user);
            subjectsecondlevel.SubjectFirstLevel = request.GetEntity<SubjectFirstLevel>(database.SubjectFirstLevels, "subjectFirstLevelId");
            subjectsecondlevel.Name = request.GetString("Name").Replace(" ", "");
            subjectsecondlevel.ChildCode = request.GetString("Childcode");
            subjectsecondlevel.Code = subjectsecondlevel.SubjectFirstLevel.Code + subjectsecondlevel.ChildCode;

            return subjectsecondlevel;
        }
        private static SubjectSecondLevel getSubjectsecondlevel(this HttpRequest request, IDatabase database, User user)
        {
            var id = request.GetInt("id");
            if (id.HasValue)
                return database.SubjectSecondLevels.GetByID(id.Value);
            var subjectsecondlevel = new SubjectSecondLevel();
            return subjectsecondlevel;
        }
    }
}
