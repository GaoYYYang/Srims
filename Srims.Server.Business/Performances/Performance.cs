using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;
using System.Transactions;




using MIS.Common;
using MIS.Common.Query;
using MIS.Common.Validate;

using Srims.Server.Business.Common;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Performances;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;

namespace Srims.Server.Business.Performances
{
    /// <summary>
    /// 绩效
    /// </summary>
    public partial class Performance : Entity<Performance>
    {
        /// <summary>
        /// 取得实体的各个字段项
        /// </summary>
        /// <returns></returns>
        public static LogDescriptionItem[] GetDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "FundAllocationID", Title = "对应经费分配ID" });
            list.Add(new LogDescriptionItem { Name = "ArrivedPerformance", Title = "绩效金额" });
            list.Add(new LogDescriptionItem { Name = "IsAllocated", Title = "是否分配完成" });

            return list.ToArray();
        }
        ///// <summary>
        ///// 取得对应的对应经费分配
        ///// </summary>
        public FundAllocation FundAllocation
        {
            get { return _FundAllocation.Entity; }
            set
            {
                _FundAllocation.Entity = value;
                if (value != null)
                {
                    _FundAllocationID = value.ID;
                    _Project.Entity = FundAllocation.FundDescend.ProjectInfo_Fund.Project;
                    _ProjectID = _Project.Entity.ID;
                }
                else
                    _FundAllocationID = null;
            }
        }



        /// <summary>
        /// 取得该绩效对应的绩效分配
        /// </summary>
        /// <param name="database"></param>
        /// <returns></returns>
        public List<PerformanceAllocation> GetPerformanceAllocation(IDatabase database)
        {
            var performanceAllocation = database.PerformanceAllocations.Where(q => q.PerformanceID == _ID && q.CurrentState.State != PerformanceAllocationState.Canceled).ToList();
            return performanceAllocation;
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Project.Entity != null, "项目不能为空");
            validater.AddCondition(((_DescendPerformance <= _ArrivedPerformance) && _ArrivedPerformance > 0) || _ArrivedPerformance <= 0, "下拨总额不能超过绩效总额");
        }
        /// <summary>
        /// 更新统计信息
        /// </summary>
        /// <param name="database"></param>
        public override void UpdateStatistic(IDatabase database)
        {
            var performanceallocations = this.GetPerformanceAllocation(database);
            this.DescendPerformance = 0;
            foreach (var item in performanceallocations)
            {
                this.DescendPerformance += item.ArrivedPerformance;
                this.DescendPerformance += item.ArrivedOverheadexpensesExpert;
            }
            if (this.DescendPerformance == this.ArrivedPerformance)
                this.IsAllocated = true;
            else
                this.IsAllocated = false;
        }
    }

    /// <summary>
    /// 绩效的业务扩展
    /// </summary>
    public static class PerformanceBusinessExtension
    {
    }
    /// <summary>
    /// 绩效的查询扩展
    /// </summary>
    public static class PerformanceQueryExtension
    {
        /// <summary>
        /// 绩效查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static PerformanceQueryResult Query(this IEntityDataAccess<Performance> query, PerformanceQueryInformation queryInformation, User user, IDatabase database)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");
            if (user == null)
                throw new ArgumentNullException("user");

            //查询
            var q = query.GetPermanceAllocation(queryInformation, user).Distinct();

            //排序
            q = sortQuery(q, queryInformation.SortInfo);
            var b = q.ToList();
            //构造查询结果
            var total = q.Select(p => p.ID).Count();
            long overheadExpensesInSum = 0, overheadExpensesMiddleSum = 0, receivedPerformance = 0, descendPerformance = 0;
            foreach (var item in q.Where(c => c.IsCancel != true))
            {
                if (item.Recovery != null)
                {
                    overheadExpensesInSum += item.Recovery.PlanedOverheadExpensesIn - item.Recovery.ReceivedOverheadExpensesIn;
                    overheadExpensesMiddleSum += item.Recovery.PlanedOverheadExpensesMiddle - item.Recovery.ReceivedOverheadExpensesMiddle;
                }
                if (item.FundAllocation != null)
                {
                    overheadExpensesInSum += item.FundAllocation.GetOverheadExpensesInAlready(database);
                    overheadExpensesMiddleSum += item.FundAllocation.GetOverheadExpensesMiddleAlready(database);
                }
                receivedPerformance += item.ArrivedPerformance;
                descendPerformance += item.DescendPerformance;
            }
            var total2 = q.Where(p => p.IsCancel == false).ToList().Count();
            return new PerformanceQueryResult(
                q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(),
                total,
                overheadExpensesInSum, overheadExpensesMiddleSum, receivedPerformance, descendPerformance);

        }

        private static IQueryable<Performance> sortQuery(IQueryable<Performance> query, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return query = query.OrderByDescending(q => q.FoundationTime);

            else if (sortInfo.Field.EqualIgnoreCase("ExpertName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.Project.Principal.Name)
                    : query.OrderByDescending(p => p.Project.Principal.Name);
            else if (sortInfo.Field.EqualIgnoreCase("TypeName"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.Project.Type.Type.Name)
                    : query.OrderByDescending(p => p.Project.Type.Type.Name);

            else if (sortInfo.Field.EqualIgnoreCase("ArrivedPerformance"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.ArrivedPerformance)
                    : query.OrderByDescending(p => p.ArrivedPerformance);
            else if (sortInfo.Field.EqualIgnoreCase("DescendPerformance"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.DescendPerformance)
                    : query.OrderByDescending(q => q.DescendPerformance);
            else if (sortInfo.Field.EqualIgnoreCase("IsCanceled"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.IsCancel)
                    : query.OrderByDescending(q => q.IsCancel);
            else if (sortInfo.Field.EqualIgnoreCase("IsAllocated"))
                return sortInfo.Direction == SortDirection.ASC
                    ? query.OrderBy(q => q.IsCancel)
                    : query.OrderByDescending(q => q.IsAllocated);
            else
                return query = query.OrderByDescending(q => q.FoundationTime);
        }

        /// <summary>
        /// 取得绩效分配
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IQueryable<Performance> GetPermanceAllocation(this IEntityDataAccess<Performance> query, PerformanceQueryInformation queryInformation, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.getPerformance(user);
            if (queryInformation != null)
                q = q.Intersect(query.getPerformancen(queryInformation));

            return q;
        }
        private static IQueryable<Performance> getPerformancen(this IEntityDataAccess<Performance> query, PerformanceQueryInformation queryInformation)
        {
            var q = query.AsQueryable();

            if (queryInformation.ProjectName != null)
                queryInformation.ProjectName = queryInformation.ProjectName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ProjectName))
                q = q.Where(pq => pq.Project.Name.Contains(queryInformation.ProjectName) || pq.Project.NameSpell.Contains(queryInformation.ProjectName));

            if (queryInformation.ProjectNumber != null)
                queryInformation.ProjectNumber = queryInformation.ProjectNumber.Trim();
            if (!string.IsNullOrEmpty(queryInformation.ProjectNumber))
                q = q.Where(pq => pq.Project.Number.Contains(queryInformation.ProjectNumber));

            if (queryInformation.TypeName != null)
                queryInformation.TypeName = queryInformation.TypeName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.TypeName))
                q = q.Where(pq => pq.Project.Type.Type.Name.Contains(queryInformation.TypeName.Trim()) || pq.Project.Type.Type.ShortName.Contains(queryInformation.TypeName.Trim()));

            if (!string.IsNullOrEmpty(queryInformation.PrincipalName))
                queryInformation.PrincipalName = queryInformation.PrincipalName.Trim();
            if (!string.IsNullOrEmpty(queryInformation.PrincipalName))
                q = q.Where(pq => pq.Project.Principal.Name.Equals(queryInformation.PrincipalName) || pq.Project.Principal.NameSpell.Equals(queryInformation.PrincipalName));

            if (queryInformation.IsCanceled.HasValue && queryInformation.IsCanceled2.HasValue)
            {
                if (queryInformation.IsCanceled.Value == true && queryInformation.IsCanceled2.Value == false)
                    q = q.Where(pq => pq.IsCancel == true);
                if (queryInformation.IsCanceled2.Value == true && queryInformation.IsCanceled.Value == false)
                    q = q.Where(pq => pq.IsCancel == false);
            }
            if (queryInformation.IsAllocated.HasValue && queryInformation.IsAllocated2.HasValue)
            {
                if (queryInformation.IsAllocated.Value == true && queryInformation.IsAllocated2.Value == false)
                    q = q.Where(pq => pq.IsAllocated == true);
                if (queryInformation.IsAllocated2.Value == true && queryInformation.IsAllocated.Value == false)
                    q = q.Where(pq => pq.IsAllocated == false);
            }

            if (queryInformation.StartDate != null)
            {
                if (queryInformation.StartDate.Start.HasValue)
                    q = q.Where(p => p.Project.StartDate >= queryInformation.StartDate.Start);
                if (queryInformation.StartDate.End.HasValue)
                    q = q.Where(p => p.Project.StartDate <= queryInformation.StartDate.End);
            }
            if (queryInformation.AllocationDate != null && queryInformation.AdjustDate == null)
            {
                q = q.Where(c => c.FundAllocation != null);
                if (queryInformation.AllocationDate.Start.HasValue)
                    q = q.Where(p => p.FundAllocation.CurrentState.DateTime >= queryInformation.AllocationDate.Start && p.FundAllocation.CurrentState.State == FundAllocationState.Passed);
                if (queryInformation.AllocationDate.End.HasValue)
                    q = q.Where(p => p.FundAllocation.CurrentState.DateTime <= queryInformation.AllocationDate.End && p.FundAllocation.CurrentState.State == FundAllocationState.Passed);
            }
            if (queryInformation.AllocationDate == null && queryInformation.AdjustDate != null)
            {
                q = q.Where(c => c.Recovery != null);
                if (queryInformation.AdjustDate.Start.HasValue)
                    q = q.Where(p => p.Recovery.OperateTime >= queryInformation.AdjustDate.Start);
                if (queryInformation.AdjustDate.End.HasValue)
                    q = q.Where(p => p.Recovery.OperateTime <= queryInformation.AdjustDate.End);
            }
            if (queryInformation.AllocationDate != null && queryInformation.AdjustDate != null)
            {
                q = q.Where(c => c.FundAllocation != null && c.Recovery != null);
            }
            return q;
        }
        private static IQueryable<Performance> getPerformance(this IEntityDataAccess<Performance> query, User user)
        {
            if (user.IsSuper)
                return query;

            if (user.IsExpert)
                return query.Where(q => q.Project.Principal.User == user);

            var database = query.Database;
            var projectTypeIDList = user.GetCanEditVerticalTypes(database)
            .Union(user.GetCanEditHorizontalTypes(database))
            .Select(pt => pt.ID)
            .ToList();

            return query.Where(q => projectTypeIDList.Contains(q.Project.Type.TypeID));
        }

    }
    /// <summary>
    /// 绩效的权限扩展
    /// </summary>
    public static class PerformancePermissionExtension
    {
        /// <summary>
        /// 判断用户是否有权限查看某一绩效的分配信息
        /// </summary>
        /// <param name="user"></param>
        /// <param name="performance"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool HasPermission_ShowAlloction(this User user, Performance performance, IDatabase database)
        {
            if (user.IsExpert)
                return performance.Project.IsPrincipal(user);

            return false;
        }
        /// <summary>
        /// 是否能够查看某一绩效分配
        /// </summary>
        /// <param name="user"></param>
        /// <param name="fundDescend"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static bool CanShowAllocation(this User user, Performance performance, IDatabase database)
        {
            return user.HasPermission_ShowAlloction(performance, database);
        }
    }
}
