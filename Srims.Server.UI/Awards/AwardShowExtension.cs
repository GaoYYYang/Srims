using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Srims.Server.Business.Awards;
using System.Web;

using MIS.Common.Query;
using Srims.Server.Business;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Experts;
//using Srims.Server.Business.Projects;

namespace Srims.Server.UI.Awards
{
    /// <summary>
    /// 奖励的显示扩展
    /// </summary>
    public static class AwardShowExtension
    {
        /// <summary>
        /// 显示奖励
        /// </summary>
        /// <param name="award">要显示的奖励</param>
        /// <param name="response">输出</param>
        /// <param name="user">当前用户</param>
        /// <param name="database">数据库</param>
        public static void ShowAward(Award award, HttpResponse response, User user, IDatabase database)
        {
            //basic
            response.WriteTagWithValue("ID", award.ID);
            response.WriteTagWithValue("Name", award.Name);
            response.WriteTagWithValue("Rank", award.Rank);
            response.WriteTagWithValue("Class", award.Class);
            response.WriteTagWithValue("AttendType", award.AttendType);
            response.WriteTagWithValue("Introduction", award.Introduction);
            response.WriteTagWithValue("AuthorisedUnit", award.AuthorisedUnit);
            response.WriteTagWithValue("Classification", award.Classification);
            response.WriteTagWithValue("Remark", award.Remark);
            response.WriteTagWithValue("Year", award.Year);
            response.WriteTagWithValue("ProjectName", award.Project);
            response.WriteTagWithValue("SubjectNature", award.SubjectNature);
            //firstWinner
            var firstWinner = award.GetFirstWinner(database.AwardWinners);
            response.WriteTagWithValue("AwardFirstWinnerName", firstWinner == null ? string.Empty : firstWinner.Name);
            response.WriteTagWithValue("NameSpell", firstWinner == null ? string.Empty :
                                                                                      (firstWinner.Expert == null ? string.Empty : firstWinner.Expert.NameSpell));

            //winners
            IList<AwardWinner> winners = award.GetAwardWinners(database.AwardWinners);
            string winnersString = "";
            if (winners.Count() > 0)
            {
                foreach (var winner in winners)
                    winnersString += winner.Name + ',';
            }
            winnersString += ",,,,,";
            var winnersArray = winnersString.Split(',');
            response.WriteTagWithValue("AwardSecondWinnerName", winnersArray[1]);
            response.WriteTagWithValue("AwardThirdWinnerName", winnersArray[2]);
            response.WriteTagWithValue("AwardFourthWinnerName", winnersArray[3]);
            response.WriteTagWithValue("AwardFifthWinnerName", winnersArray[4]);


            //college
            response.WriteTagWithValue("CollegeID", award.CollegeID);
            response.WriteTagWithValue("CollegeName", award.College == null ? string.Empty : award.College.Name);

            //hasPower            
            response.WriteTagWithValue("HasPermission_ShowAward", user.HasPermission_ShowAward(award, database));
            response.WriteTagWithValue("HasPermission_EditAward", user.HasPermission_EditAward(award, database));
            response.WriteTagWithValue("HasPermission_ShowAwardDocument", user.HasPermission_ShowAwardDocument(award, database));
            response.WriteTagWithValue("HasPermission_UploadAwardDocument", user.HasPermission_UploadAwardDocument(award, database));

            //can
            response.WriteTagWithValue("CanShowAward", user.CanShowAward(award, database));
            response.WriteTagWithValue("CanEditAward", user.CanEditAward(award, database));
            response.WriteTagWithValue("CanShowAwardDocument", user.CanShowAwardDocument(award, database));
            response.WriteTagWithValue("CanUploadAwardDocument", user.CanUploadAwardDocument(award, database));
        }
        /// <summary>
        /// 奖励查询结果显示
        /// </summary>
        /// <param name="awardQueryResult"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<Award> awardQueryResult, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Award> showDelegate = new ShowDelegateWithUserAndDatabase<Award>(ShowAward);
            awardQueryResult.Show<Award>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 奖励列表显示
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this List<Award> list, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagBegin("List");

            foreach (var award in list)
            {
                response.WriteTagBegin("Record");
                ShowAward(award, response, user, database);
                response.WriteTagEnd("Record");
            }

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 显示奖励（专家）
        /// </summary>
        /// <param name="award"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowAwardForExpert(this Award award, Expert expert, User user, HttpResponse response, IDatabase database)
        {
            response.WriteTagBegin("Record");

            response.WriteTagWithValue("ID", award.ID);
            response.WriteTagWithValue("Name", award.Name);
            response.WriteTagWithValue("Year", award.Year);
            response.WriteTagWithValue("Rank", award.Rank);
            response.WriteTagWithValue("Class", award.Class);
            response.WriteTagWithValue("Order", expert.GetMyAwardOrder(database.AwardWinners, award.ID));
            response.WriteTagWithValue("Project", award.Project);
            response.WriteTagWithValue("CanShowAward", user.CanShowAward(award, database));

            response.WriteTagEnd("Record");
        }
        /// <summary>
        /// 显示奖励（专家）
        /// </summary>
        /// <param name="list"></param>
        /// <param name="response"></param>
        /// <param name="database"></param>
        /// <param name="expert"></param>
        /// <param name="user"></param>
        public static void ShowForExpert(this IList<Award> list, HttpResponse response, IDatabase database, Expert expert, User user)
        {
            response.WriteTagBegin("List");

            foreach (var award in list)
                award.ShowAwardForExpert(expert, user, response, database);

            response.WriteTagEnd("List");
        }
        /// <summary>
        /// 保存奖励时，取得该奖励
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Award GetAward(this HttpRequest request, IDatabase database)
        {
            var award = request.getAward(database);

            award.Name = request.GetString("Name");
            award.Project = request.GetString("ProjectName");
            award.AuthorisedUnit = request.GetString("AuthorisedUnit");
            award.Rank = request.GetString("Rank");
            award.Class = request.GetString("Class");
            award.AttendType = request.GetString("AttendType");
            award.Classification = request.GetString("Classification");
            award.Introduction = request.GetString("Introduction");
            award.Remark = request.GetString("Remark");
            award.Year = request.GetInt("Year");
            award.College = request.GetEntity(database.Departments, "CollegeID");
            award.SubjectNature = request.GetEnum<SubjectNature>("SubjectNature");

            return award;
        }
        private static Award getAward(this HttpRequest request, IDatabase database)
        {
            var id = request.GetInt("ID");
            if (id.HasValue)
                return database.Awards.GetByID(id.Value);
            return new Award();
        }
        /// <summary>
        /// 取得新建的空实体或者编辑之前的旧实体
        /// </summary>
        /// <param name="request"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Object GetOldEntity(this HttpRequest request, IDatabase database)
        {
            Object oldEntity = new Object();
            oldEntity = request.getAward(database).Clone();
            return oldEntity;
        }
    }
}
