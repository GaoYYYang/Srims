using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;

using Srims.Server.Business;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using Srims.Server.Business.Awards;

using MIS.Common;

using Srims.Server.DataAccess;

namespace Srims.Server.DataExchange.AwardImport
{
    /// <summary>
    /// 奖励导入
    /// </summary>
    public static class AwardImport
    {
        /// <summary>
        /// 项目导入
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        public static string ImportAward(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "AwardImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Award";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder importLog = new StringBuilder();
            StringBuilder awardImportId = new StringBuilder();

            StringBuilder expertMatchString = new StringBuilder();

            int importAwardCount = 0;//导入奖励个数
            int awardWinnerOrder = 0;//奖励成员的位次

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                string name = row[0].ToString().Trim();
                string winnerString = row[1].ToString().Trim();
                string rank = row[2].ToString().Trim();
                string awardClass = row[3].ToString().Trim();
                string year = row[4].ToString().Trim();
                string attendType = row[5].ToString().Trim();
                string unit = row[6].ToString().Trim();
                string classify = row[7].ToString().Trim();
                string college = row[8].ToString().Trim();
                string remark = row[9].ToString().Trim();
                string projectName = row[10].ToString().Trim();
                string awardAbstract = row[11].ToString().Trim();

                database = Database.New();
                Award award = new Award();

                try
                {
                    award.Name = name;
                    name.AddNoticeText(NoticeTextType.AwardName, database);

                    award.AttendType = attendType;
                    attendType.AddNoticeText(NoticeTextType.AwardAttendType, database);

                    award.AuthorisedUnit = unit;
                    award.Class = awardClass;
                    awardClass.AddNoticeText(NoticeTextType.AwardClass, database);

                    award.Classification = classify;
                    classify.AddNoticeText(NoticeTextType.AwardClassification, database);

                    award.Introduction = awardAbstract;
                    award.Project = projectName;
                    award.Rank = rank;
                    rank.AddNoticeText(NoticeTextType.AwardRank, database);

                    award.Remark = remark;
                    award.Year = Convert.ToInt32(year);

                    award.College = college.GetCollege(database);

                    award.Save(database);
                    importAwardCount++;
                    awardImportId.AppendFormat("{0}", award.ID);

                    //导入奖励成员
                    awardWinnerOrder = 1;
                    var awardWinners = winnerString.Split(new char[] { '，' }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (var awardWinner in awardWinners)
                    {
                        AwardWinner winner = new AwardWinner();
                        winner.Award = award;
                        winner.Order = awardWinnerOrder++;
                        winner.Expert = awardWinner.GetAwardWinner(expertMatchString, award.College, award, database);
                        winner.Name = awardWinner;

                        winner.Save(database);
                    }
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入奖励时发生错误，奖励名称为{0}，获奖年度为：{1}, 错误信息为：{2}", name, year, e.Message));
                }

            }
            importLog.AppendFormat("成功导入奖励{0}项， 奖励id为{1}\n", importAwardCount, awardImportId.ToString());
            importLog.AppendFormat("获奖人匹配情况如下：\n{0}", expertMatchString.ToString());

            writer.WriteLine(importLog.ToString());

            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
    }
}
