using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using System.Transactions;
using Srims.Server.Business.Common;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Runtime.Serialization;
using Srims.Server.Business.Projects;

namespace Srims.Server.Business.Type
{
    /// <summary>
    /// 管理费比例
    /// </summary>
    public partial class ManagementFees : Entity<ManagementFees>
    {
        /// <summary>
        /// 复制一个同于自己的实体
        /// </summary>
        /// <returns></returns>
        public object Clone()
        {
            return this.MemberwiseClone();
        }
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();
            list.Add(new LogDescriptionItem { Name = "ID", Title = "管理费比例ID号" });
            list.Add(new LogDescriptionItem { Name = "Type", Title = "管理费收取类别" });
            list.Add(new LogDescriptionItem { Name = "FundTotal", Title = "经费额度" });
            list.Add(new LogDescriptionItem { Name = "Fee", Title = "学校管理费" });
            list.Add(new LogDescriptionItem { Name = "PerformancePay", Title = "绩效工资" });
            list.Add(new LogDescriptionItem { Name = "Remark", Title = "备注" });

            return list.ToArray();
        }
        ///<summary>
        ///构造函数
        ///</summary>
        public ManagementFees()
        {
        }
    }

    /// <summary>
    /// 管理费比例的业务扩展
    /// </summary>
    public static class MangementFeesBusinessExtension
    {
    }
    /// <summary>
    /// 管理费比例的查询扩展
    /// </summary>
    public static class MangementFeesQueryExtension
    {
        /// <summary>
        /// 查询所有管理费收取类别
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public static IList<string> GetAllManagementFees(this IQueryable<ManagementFees> query)
        {
            return (from mf in query select mf.Type).Distinct().ToList();
        }

        /// <summary>
        /// 根据管理费收取类型名称查询所有管理费收取规则
        /// </summary>
        /// <param name="query"></param>
        /// <param name="managementFeeType">管理费收取类别</param>
        /// <param name="projectTypeID">项目类型ID</param>
        /// <param name="projectLevel">项目等级</param>
        /// <param name="contractTotal">项目合同额</param>
        /// <param name="fundTotal">计划到校经费</param>
        /// <param name="arriveSchoolFee">到校经费</param>
        /// <param name="deviceCost">购置设备费（此处包括购置设备费和基本建设费）</param>
        /// <param name="paraType">费率类型（间接费用费率还是绩效费率）</param>
        /// <param name="paraType">Database</param>
        /// <returns></returns>
        public static int GetAllManagementFeesByType(this IQueryable<ManagementFees> query, string managementFeeType, int projectTypeID, ProjectLevel projectLevel, long contractTotal, long fundTotal, long arriveSchoolFee, long deviceCost, string paraType, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");

            if (!string.IsNullOrEmpty(managementFeeType))
                managementFeeType = managementFeeType.Trim();
            //如果传入的管理费收取类别为空，则按照重大专项项目来进行费用收取率计算
            if (string.IsNullOrEmpty(managementFeeType))
                return GetMajorSpecialProjectsRate(query, managementFeeType, projectTypeID, projectLevel, contractTotal, fundTotal, arriveSchoolFee, deviceCost, paraType, database);
            //固定费率项目费率
            return query.GetFixRate(managementFeeType, fundTotal, paraType);
        }
        /// <summary>
        ///  获取固定费率类项目的间接费率和绩效费率
        /// </summary>
        /// <param name="query"></param>
        /// <param name="managementFeeType"></param>
        /// <param name="fundtotal"></param>
        /// <param name="paraType"></param>
        /// <returns></returns>
        private static int GetFixRate(this IQueryable<ManagementFees> query, string managementFeeType, long fundtotal, string paraType)
        {
            //根据类型名称进行查询，获取经费额度最小的项
            if (!string.IsNullOrEmpty(managementFeeType))
            {
                var matchFundTotal = query
                    .Where(mf => mf.Type == managementFeeType)
                        .Where(mf => mf.FundTotal >= fundtotal)
                        .Min(mf => mf.FundTotal);
                var q = query
                    .Where(mff => mff.FundTotal == matchFundTotal
                    && mff.Type == managementFeeType)
                    .SingleOrDefault();
                if (q == null)
                    return 0;
                if (paraType == "overheadExpenseInRate")
                    return q.Fee + q.PerformancePay;
                else if (paraType == "overheadExpensePerformancePayRate")
                    return q.PerformancePay;
            }
            return 0;
        }
        /// <summary>
        /// 获取重大专项类项目对应的间接费用费率和绩效费率
        /// </summary>
        /// <param name="query"></param>
        /// <param name="managementFeeType"></param>
        /// <param name="projectTypeID"></param>
        /// <param name="projectLevel"></param>
        /// <param name="contractTotal"></param>
        /// <param name="fundTotal"></param>
        /// <param name="arriveSchoolFee"></param>
        /// <param name="deviceCost"></param>
        /// <param name="paraType"></param>
        /// <returns></returns>
        private static int GetMajorSpecialProjectsRate(this IQueryable<ManagementFees> query, string managementFeeType, int projectTypeID, ProjectLevel projectLevel, long contractTotal, long fundTotal, long arriveSchoolFee, long deviceCost, string paraType, IDatabase database)
        {
            //int[] projectTypeIDs = { 7, 8, 11, 13, 23, 30, 70, 117 };
            var projectType = database.ProjectTypes.SingleOrDefault(c => c.ID == projectTypeID);
            //如果项目类型为8类对应项目
            if (projectType.IsBudget == true && projectType.ID != 12)
            {
                if (projectLevel == ProjectLevel.Perside)//主持
                {
                    if (paraType == "overheadExpenseInRate")
                        return Convert.ToInt32(CalculateOverheadExpenseRate2((double)(contractTotal / 1000000), (double)(fundTotal / 1000000), (double)(deviceCost / 1000000)));
                    else if (paraType == "overheadExpensePerformancePayRate")
                        return Convert.ToInt32(CalculatePerformancePayRate2((double)(contractTotal / 1000000), (double)(fundTotal / 1000000), (double)(deviceCost / 1000000)));
                }
                else//非主持
                    if (contractTotal == arriveSchoolFee)//合同额与到校经费相等
                    {
                        if (paraType == "overheadExpenseInRate")
                            return 1400;
                        else if (paraType == "overheadExpensePerformancePayRate")
                            return 0;
                    }
                    else//合同额与到校经费不相等
                        if (paraType == "overheadExpenseInRate")
                            return Convert.ToInt32(CalculateOverheadExpenseRate2((double)(contractTotal / 1000000), (double)(fundTotal / 1000000), (double)(deviceCost / 1000000)));
                        else if (paraType == "overheadExpensePerformancePayRate")
                            return Convert.ToInt32(CalculatePerformancePayRate2((double)(contractTotal / 1000000),(double)( fundTotal / 1000000), (double)(deviceCost / 1000000)));
            }
            else if (projectTypeID == 12)//若为重大专项
            {
                if (projectLevel == ProjectLevel.Perside)//主持
                {
                    if (paraType == "overheadExpenseInRate")
                        return Convert.ToInt32((1 - ((double)contractTotal + 0.13 * (double)deviceCost) / (1.13 * (double)contractTotal)) * 10000.0);
                    else if (paraType == "overheadExpensePerformancePayRate")
                        return Convert.ToInt32(0.05 * (1 / 1.13 - ((double)deviceCost) / (1.13 * (double)contractTotal)) * 10000.0);
                }
                else//非主持
                    if (contractTotal == arriveSchoolFee)//合同额与到校经费相等
                    {
                        if (paraType == "overheadExpenseInRate")
                            return 1400;
                        else if (paraType == "overheadExpensePerformancePayRate")
                            return 0;
                    }
                    else//合同额与到校经费不相等
                        if (paraType == "overheadExpenseInRate")
                            return Convert.ToInt32((1 - ((double)contractTotal + 0.13 * (double)deviceCost) / (1.13 * (double)contractTotal)) * 10000.0);
                        else if (paraType == "overheadExpensePerformancePayRate")
                        {
                           //carlsirce 2013.1.11 修改算法 return Convert.ToInt32(0.05 * (1 / 1.13 - (double)deviceCost) / (1.13 * (double)contractTotal) * 10000.0);
                            return Convert.ToInt32(0.05 * (1 / 1.13 - ((double)deviceCost) / (1.13 * (double)contractTotal)) * 10000.0);
                        }
                
            }
            else
                return query.GetFixRate(managementFeeType, fundTotal, paraType);

            return 0;
        }
        /// <summary>
        /// 间接费率（合同额与到校经费不相等）
        /// </summary>
        /// <param name="fundtotal"></param>
        /// <param name="deviceCost"></param>
        /// <returns></returns>
        private static int CalculateOverheadExpenseRate(long fundtotal, long deviceCost)
        {
            var stepOne = ((double)fundtotal * 5.0 + (double)deviceCost) / 6.0;
            if (stepOne - deviceCost <= 500.0 * Money.MONEY_UNIT)
                return Convert.ToInt32(((double)fundtotal - stepOne) / (double)fundtotal * 1000000.0);

            var stepTwo = ((double)fundtotal - (double)deviceCost - 35.0 * Money.MONEY_UNIT) * 100.0 / 113.0 + (double)deviceCost;
            if ((stepTwo - (double)deviceCost) > 500.0 * Money.MONEY_UNIT && (stepTwo - (double)deviceCost) <= 1000.0 * Money.MONEY_UNIT)
                return Convert.ToInt32(((double)fundtotal - stepTwo) / (double)fundtotal * 1000000);

            var stepThree = ((double)fundtotal - (double)deviceCost - 65.0 * Money.MONEY_UNIT) * 10 / 11.0 + (double)deviceCost;
            if (stepThree - (double)deviceCost > 1000.0)
                return Convert.ToInt32(((double)fundtotal - stepThree) / (double)fundtotal * 1000000.0);
            return 0;

        }
        /// <summary>
        /// 间接费率（合同额与到校经费不相等），此算法与120服务器网页版小软件一致
        /// </summary>
        /// <param name="fundtotal"></param>
        /// <param name="deviceCost"></param>
        /// <returns></returns>
        private static double CalculateOverheadExpenseRate2(double contractTotal, double fundtotal, double deviceCost)
        {


            var fund = contractTotal - deviceCost;
            var y = (double)fund * 5.0 / 6.0;
            var z = (double)fundtotal / contractTotal;
            if (y <= 500)
                return ((double)fund - y) / (double)fundtotal * 10000.0 * z;

            y = (fund - 35) * 100.0 / 113.0;
            if (y > 500 && y <= 1000)
                return ((double)fund - y) / (double)fundtotal * 10000 * z;

            y = (fund - 65) * 10.0 / 11.0;
            if (y > 1000)
                return (fund - y) / (double)fundtotal * 10000.0 * z;
            return 0;
        }
        /// <summary>
        /// 绩效费率（合同额与到校经费不相等）
        /// </summary>
        /// <param name="fundtotal"></param>
        /// <param name="deviceCost"></param>
        /// <returns></returns>
        private static int CalculatePerformancePayRate(long fundtotal, long deviceCost)
        {
            return Convert.ToInt32(((double)fundtotal - CalculateOverheadExpenseRate(fundtotal, deviceCost) / 10000.0 * (double)fundtotal - (double)deviceCost) / (20.0 * (double)fundtotal) * 10000.0);

        }
        /// <summary>
        /// 绩效费率（合同额与到校经费不相等），此算法与120服务器网页版小软件一致
        /// </summary>
        /// <param name="fundtotal"></param>
        /// <param name="deviceCost"></param>
        /// <returns></returns>
        private static double CalculatePerformancePayRate2(double contractTotal, double fundtotal, double deviceCost)
        {
            double fund = contractTotal - deviceCost;
            var y = (double)fund * 5.0 / 6.0;
            var z = (double)fundtotal / contractTotal;
            if (y <= 500)
            {
                var x = fund - y;
                y = contractTotal - x;
                var jixiao = (y - deviceCost) / 20.0;
                return ((double)jixiao) / (double)fundtotal * 10000 * z;
            }

            y = (fund - 35) * 100.0 / 113.0;
            if (y > 500 && y <= 1000)
            {
                var x = fund - y;
                y = contractTotal - x;
                var jixiao = (y - deviceCost) / 20.0;
                return ((double)jixiao) / (double)fundtotal * 10000 * z;
            }

            y = (fund - 65) * 10.0 / 11.0;
            if (y > 1000)
            {
                var x = fund - y;
                y = contractTotal - x;
                var jixiao = (y - deviceCost) / 20.0;
                return ((double)jixiao) / (double)fundtotal * 10000 * z;
            }
            return 0;
        }
        /// <summary>
        /// 管理费比例查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>2
        /// <returns></returns>
        public static QueryResult<ManagementFees> Query(this IQueryable<ManagementFees> query, ManagementFeesQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.AsQueryable();
            q = SortQuery(q, queryInformation.SortInfor);

            return new QueryResult<ManagementFees>(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count());

        }
        private static IQueryable<ManagementFees> SortQuery(IQueryable<ManagementFees> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(mf => mf.ID);
            else if (sortInfo.Field.EqualIgnoreCase("Type"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(mf => mf.Type) : query.OrderByDescending(mf => mf.Type);
            else if (sortInfo.Field.EqualIgnoreCase("FundTotal"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(mf => mf.FundTotal) : query.OrderByDescending(mf => mf.FundTotal);
            else if (sortInfo.Field.EqualIgnoreCase("Fee"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(mf => mf.Fee) : query.OrderByDescending(mf => mf.Fee);
            else if (sortInfo.Field.EqualIgnoreCase("PerformancePay"))
                return sortInfo.Direction == SortDirection.ASC ? query.OrderBy(mf => mf.PerformancePay) : query.OrderByDescending(mf => mf.PerformancePay);
            else return query = query.OrderByDescending(mf => mf.ID);
        }
    }
    /// <summary>
    /// 管理费比例的权限扩展
    /// </summary>
    public static class MangementFeesPermissionExtension
    {
    }
}
