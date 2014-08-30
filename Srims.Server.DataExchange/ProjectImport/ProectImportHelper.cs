using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Bases;
using Srims.Server.Business.Common;

namespace Srims.Server.DataExchange.ProjectImport
{
    /// <summary>
    /// 项目导入帮组
    /// </summary>
    public static class ProectImportHelper
    {
        /// <summary>
        /// 取得专家
        /// </summary>
        /// <param name="expertName"></param>
        /// <param name="projectName"></param>
        /// <param name="expertMatchStringBuilder"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Expert GetExpert(this string expertName, string projectName, StringBuilder expertMatchStringBuilder, IDatabase database, bool isPrincipal)
        {
            if (string.IsNullOrEmpty(expertName))
                return null;

            var expertList = database.Experts.GetByName(expertName);
            if (expertList.Count == 1)
                return expertList.Single();

            if (expertList.Count == 0)
            {
                if (isPrincipal)
                    expertMatchStringBuilder.AppendFormat("项目：{0} 负责人：{1},没有匹配到校内专家，项目导入失败\n", projectName, expertName);
                else
                    expertMatchStringBuilder.AppendFormat("项目：{0} 成员：{1},没有匹配到校内专家。\n", projectName, expertName);
                return null;
            }

            expertMatchStringBuilder.AppendFormat("项目：{0} {1}：{2}， 根据姓名匹配校内专家，匹配到多位专家，自动匹配的专家的工作证号为：{3}，专家学院为{4}.\n\n",
                projectName, isPrincipal ? "负责人" : "成员", expertName, expertList.First().Number, expertList.First().CollegeID.HasValue ? expertList.First().College.Name : "所属学院为空");

            return expertList.First();
        }
        /// <summary>
        /// 取得项目的级别
        /// </summary>
        /// <param name="projectLevel"></param>
        /// <returns></returns>
        public static ProjectLevel GetProjectLevel(this string projectLevel)
        {
            switch (projectLevel)
            {
                case "主持":
                    return ProjectLevel.Perside;
                case "副主持":
                    return ProjectLevel.SubPerside;
                case "参与":
                    return ProjectLevel.Join;
                case "附加":
                    return ProjectLevel.SubPerside;
                default:
                    return ProjectLevel.Unknown;
            }
        }
        /// <summary>
        /// 取得项目状态
        /// </summary>
        /// <param name="projectState"></param>
        /// <returns></returns>
        public static ProjectState GetProjectState(this string projectState)
        {
            switch (projectState)
            {
                case "在研":
                    return ProjectState.ProjectProcessing;
                case "已结项":
                    return ProjectState.ProjectEnd;

                default:
                    return ProjectState.Unknown;
            }
        }
        /// <summary>
        /// 取得项目等级
        /// </summary>
        /// <param name="rankName"></param>
        /// <param name="isHorizontal"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static ProjectRank GetProjectRank(this string rankName, bool isHorizontal, IDatabase database, StringBuilder projectTypeString)
        {
            if (string.IsNullOrEmpty(rankName))
                return null;

            var projectRank = database.ProjectRanks.GetByName(rankName);
            if (projectRank == null)
                projectTypeString.AppendFormat("项目等级：{0}未找到，导入失败\n", rankName);

            return projectRank;
        }
        /// <summary>
        /// 取得项目类型
        /// </summary>
        /// <param name="typeName"></param>
        /// <param name="subjectNature"></param>
        /// <param name="projectRank"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static ProjectType GetProjectType(this string typeName, SubjectNature subjectNature, ProjectRank projectRank, IDatabase database, StringBuilder projectTypeString)
        {
            if (string.IsNullOrEmpty(typeName))
                return null;

            var projectType = database.ProjectTypes.GetByName(typeName, projectRank.ID, subjectNature);
            if (projectType == null)
                projectTypeString.AppendFormat("项目类型：{0}未找到，项目导入失败\n", typeName);

            return projectType;
        }
        /// <summary>
        /// 取得项目资助类别
        /// </summary>
        /// <param name="supportCategoryName"></param>
        /// <param name="projectType"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static ProjectSupportCategory GetProjectSupportCategory(this string supportCategoryName, ProjectType projectType, IDatabase database, StringBuilder projectTypeString)
        {
            if (string.IsNullOrEmpty(supportCategoryName))
                return null;

            var projectSupportCategory = database.ProjectSupportCategories.GetByName(supportCategoryName, projectType.ID);
            if (projectSupportCategory == null)
                projectTypeString.AppendFormat("项目资助类别：{0}未找到,所属项目类型为：{1}。\n", supportCategoryName, projectType.Name);

            return projectSupportCategory;
        }
        /// <summary>
        /// 取得项目资助领域
        /// </summary>
        /// <param name="supportCategoryName"></param>
        /// <param name="projectType"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static ProjectSupportField GetProjectSupportField(this string supportFieldName, ProjectType projectType, IDatabase database, StringBuilder projectTypeString)
        {
            if (string.IsNullOrEmpty(supportFieldName))
                return null;

            var projectSupportField = database.ProjectSupportFields.GetByName(supportFieldName, projectType.ID);
            if (projectSupportField == null)
                projectTypeString.AppendFormat("项目资助领域：{0}未找到,所属项目类型为：{1}\n", supportFieldName, projectType.Name);

            return projectSupportField;

        }
        /// <summary>
        /// 取得项目资助子领域
        /// </summary>
        /// <param name="supportCategoryName"></param>
        /// <param name="projectType"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static ProjectSupportSubField GetProjectSupportSubField(this string supportSubFieldName, ProjectSupportField projectSupportField, IDatabase database, StringBuilder projectTypeString)
        {
            if (string.IsNullOrEmpty(supportSubFieldName))
                return null;

            if (projectSupportField == null)
                return null;

            var projectSupportSubField = database.ProjectSupportSubFields.GetByName(supportSubFieldName, projectSupportField.ID);
            if (projectSupportSubField == null)
                projectTypeString.AppendFormat("项目资助子领域：{0},未找到,所属资助子领域为{1}, 项目类别为{2}\n", supportSubFieldName, projectSupportField.Name, projectSupportField.ProjectType.Name);

            return projectSupportSubField;
        }
        /// <summary>
        /// 取得基地
        /// </summary>
        /// <param name="baseName"></param>
        /// <param name="projectName"></param>
        /// <param name="baseMatchString"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Base GetBase(this string baseName, string projectName, StringBuilder baseMatchString, IDatabase database)
        {
            if (string.IsNullOrEmpty(baseName))
                return null;

            var currentBase = database.Bases.GetByName(baseName);
            if (currentBase == null)
                baseMatchString.AppendFormat("项目：{0}所属基地{1}，没有在数据库中匹配到\n", projectName, baseName);

            return currentBase;

        }
        /// <summary>
        /// 取得一级学科
        /// </summary>
        /// <param name="subjectFirstLevelName"></param>
        /// <param name="projectName"></param>
        /// <param name="subjectMatchString"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static SubjectFirstLevel GetSubjectFirstLevel(this string subjectFirstLevelName, string projectName, StringBuilder subjectMatchString, IDatabase database)
        {
            if (string.IsNullOrEmpty(subjectFirstLevelName))
                return null;

            var subjectFirstLevel = database.SubjectFirstLevels.GetByName(subjectFirstLevelName);
            if (subjectFirstLevel == null)
                subjectMatchString.AppendFormat("一级学科{0}没有匹配到，所属项目为：{1}\n", subjectFirstLevelName, projectName);

            return subjectFirstLevel;
        }
        /// <summary>
        /// 取得二级学科
        /// </summary>
        /// <param name="subjectSecondLevelName"></param>
        /// <param name="projectName"></param>
        /// <param name="subjectFirstLevel"></param>
        /// <param name="subjectMatchString"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static SubjectSecondLevel GetsubjectSecondLevel(this string subjectSecondLevelName, string projectName, SubjectFirstLevel subjectFirstLevel, StringBuilder subjectMatchString, IDatabase database)
        {
            if (string.IsNullOrEmpty(subjectSecondLevelName))
                return null;

            if (subjectFirstLevel == null)
                return null;

            var subjectSecondLevel = database.SubjectSecondLevels.GetByFirstAndSecondName(subjectFirstLevel.Name, subjectSecondLevelName);
            if (subjectSecondLevel == null)
                subjectMatchString.AppendFormat("二级学科{0}没有匹配到， 所属一级学科为{1}， 项目为{2}\n", subjectSecondLevelName, subjectFirstLevel.Name, projectName);

            return subjectSecondLevel;
        }
        /// <summary>
        /// 取得横向项目的项目编号
        /// </summary>
        /// <param name="year"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static string GetHorizontalProjectNumber(this int year, IDatabase database)
        {
            int max = 0;
            int count = 0;

            var numberlist = database.Projects.Where(q => q.TypeID.HasValue && q.Type.Rank.IsHorizontal
                && q.Number.StartsWith(year.ToString()))
                .Select(q => q.Number)
                .ToList();

            foreach (string number in numberlist)
            {
                count = Convert.ToInt32(number.Substring(4, 3));
                if (count > max)
                    max = count;
            }

            return year + string.Format("{0:D3}", count + 1);
        }

    }
}
