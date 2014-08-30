using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Awards;

namespace Srims.Server.DataExchange.AwardImport
{
    public static class AwardImportHelper
    {
        /// <summary>
        /// 取得获奖人
        /// </summary>
        /// <param name="expertName"></param>
        /// <param name="expertMatchString"></param>
        /// <param name="college"></param>
        /// <param name="award"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Expert GetAwardWinner(this string expertName, StringBuilder expertMatchString, Department college, Award award, IDatabase database)
        {
            if (string.IsNullOrEmpty(expertName))
                return null;

            var expertList = database.Experts.GetByName(expertName);
            //当匹配到一个专家时，返回该专家
            if (expertList.Count == 1)
                return expertList.Single();

            //当没有匹配到专家时，返回空
            if (expertList.Count == 0)
                return null;

            //当匹配到多个专家时，根据专家的学院进行匹配

            //当学院为空时
            if (college == null)
            {
                expertMatchString.AppendFormat("{0}年度的奖励{1}，其成员{2}匹配到多个校内专家， 因为该奖励所属的学院为其他，自动匹配到的专家的工作证号为：{3}\n",
                    award.Year, award.Name, expertName, expertList.First().Number);

                return expertList.First();
            }

            //当学院不为空时
            expertList = expertList.Where(q => q.CollegeID.HasValue && q.CollegeID.Value == college.ID).ToList();

            if (expertList.Count == 0)
            {
                expertMatchString.AppendFormat("{0}年度的奖励{1}，其成员{2}匹配到多个校内专家， 但根据奖励所属的学院：{3}，未匹配到校内专家\n",
                    award.Year, award.Name, expertName, award.College.Name);

                return null;
            }

            if (expertList.Count == 1)
            {
                expertMatchString.AppendFormat("{0}年度的奖励{1}，其成员{2}匹配到多个校内专家， 根据奖励所属学院为：{3}， 匹配到该学院的专家， 专家的工作证号为：{4}\n", award.Year, award.Name, expertName, college.Name, expertList.Single().Number);
                return expertList.Single();
            }

            expertMatchString.AppendFormat("{0}年度的奖励{1}，其成员{2}匹配到多个校内专家， 根据奖励所属学院为：{3}， 匹配到该学院的专家，但仍匹配到多名专家，自动匹配的该学院专家的工作证号为：{4}\n", award.Year, award.Name, expertName, college.Name, expertList.First().Number);

            return expertList.First();
        }
    }
}
