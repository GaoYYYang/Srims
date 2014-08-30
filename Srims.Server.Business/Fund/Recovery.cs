using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Bases;
using Srims.Server.Business.Common;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Fund;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Type;
using Srims.Server.Business.Users;
using Srims.Server.Business.Performances;
namespace Srims.Server.Business.Fund
{
    /// <summary>
    /// 追缴单
    /// </summary>
    public partial class Recovery : Entity<Recovery>
    {


        /// <summary>
        /// 将凭单状态设置为已打印
        /// </summary>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public void Print(User user, IDatabase database)
        {
            this.IsPrint = true;
            this.Save(database);
        }
        /// <summary>
        /// 作废追缴单
        /// </summary>
        /// <param name="database"></param>
        public void Cancel(User user, IDatabase database)
        {
            this.IsCanceled = true;
            var performance = database.Performances.SingleOrDefault(c => c.Recovery == this);
            if (performance != null)
            {

                performance.IsCancel = true;
                performance.Save(database);
                var performanceallocations = database.PerformanceAllocations.Where(c => c.Performance == performance && c.CurrentState.State != PerformanceAllocationState.Canceled).ToList();
                if (performanceallocations.Count != 0)
                {
                    foreach (var performanceallocation in performanceallocations)
                        performanceallocation.Cancel(user, "源于调整单作废", database);
                }
            }
        }
    }

    /// <summary>
    /// 追缴单的业务扩展
    /// </summary>
    public static class RecoveryBusinessExtension
    {

    }
    /// <summary>
    /// 追缴单的查询扩展
    /// </summary>
    public static class RecoveryQueryExtension
    {
        public static RecoveryQueryResult Query(this IQueryable<Recovery> query, RecoveryProjectQueryInformation queryInformation, IDatabase database, User user)
        {
            if (query == null)
                throw new ArgumentNullException("query");
            if (queryInformation == null)
                throw new ArgumentNullException("queryInformation");

            var q = query.GetRecovery(queryInformation, database, user).Distinct();
            q = SortQuery(q, queryInformation.SortInfo);
            return new RecoveryQueryResult(q.Skip(queryInformation.Start).Take(queryInformation.Limit).ToList(), q.Count(), q.Where(p => p.IsCanceled != true).ToList().Sum(c => c.PlanedPerformancePay.Value - c.ReceivedPerformancePay.Value), q.Where(p => p.IsCanceled != true).ToList().Sum(c => c.PlanedOverheadExpensesIn - c.ReceivedOverheadExpensesIn), q.Where(p => p.IsCanceled != true).ToList().Sum(c => c.PlanedOverheadExpensesMiddle - c.ReceivedOverheadExpensesMiddle));

        }

        private static IQueryable<Recovery> SortQuery(IQueryable<Recovery> q, SortInfo sortInfo)
        {
            if (sortInfo == null)
                return q.OrderByDescending(p => p.ID);
            else if (sortInfo.Field.EqualIgnoreCase("Principal"))
                return sortInfo.Direction == SortDirection.ASC
                    ? q.OrderBy(p => p.Project.Principal.Name)
                    : q.OrderByDescending(p => p.Project.Principal.Name);
            else if (sortInfo.Field.EqualIgnoreCase("VoucherNumber"))
                return sortInfo.Direction == SortDirection.ASC
                    ? q.OrderBy(p => p.VoucherNumber)
                    : q.OrderByDescending(p => p.VoucherNumber);
            else if (sortInfo.Field.EqualIgnoreCase("PrincipalCollege"))
                return sortInfo.Direction == SortDirection.ASC
                    ? q.OrderBy(p => p.Project.Principal.College.Name)
                    : q.OrderByDescending(p => p.Project.Principal.College.Name);
            else if (sortInfo.Field.EqualIgnoreCase("OperateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? q.OrderBy(p => p.OperateTime)
                    : q.OrderByDescending(p => p.OperateTime);
            else if (sortInfo.Field.EqualIgnoreCase("Operator"))
                return sortInfo.Direction == SortDirection.ASC
                    ? q.OrderBy(p => p.Operator)
                    : q.OrderByDescending(p => p.Operator);
            else if (sortInfo.Field.EqualIgnoreCase("IsPrint"))
                return sortInfo.Direction == SortDirection.ASC
                    ? q.OrderBy(p => p.IsPrint)
                    : q.OrderByDescending(p => p.IsPrint);
            else if (sortInfo.Field.EqualIgnoreCase("PrintDateTime"))
                return sortInfo.Direction == SortDirection.ASC
                    ? q.OrderBy(p => p.PrintDateTime)
                    : q.OrderByDescending(p => p.PrintDateTime);
            else if (sortInfo.Field.EqualIgnoreCase("Name"))
                return sortInfo.Direction == SortDirection.ASC
                    ? q.OrderBy(p => p.Project.Name)
                    : q.OrderByDescending(p => p.Project.Name);
            else
                return q.OrderByDescending(p => p.ID);

        }
        /// <summary>
        /// GetRecovery
        /// </summary>
        /// <param name="query"></param>
        /// <param name="queryInformation"></param>
        /// <param name="database"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static IQueryable<Recovery> GetRecovery(this IQueryable<Recovery> query, RecoveryProjectQueryInformation queryInformation, IDatabase database, User user)
        {

            var q = query.AsQueryable();
            if (queryInformation.Principal != null)
                queryInformation.Principal = queryInformation.Principal.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Principal))
                q = q.Where(pq => pq.Project.Principal.Name.Equals(queryInformation.Principal) || pq.Project.Principal.NameSpell.Equals(queryInformation.Principal));
            if (queryInformation.Name != null) queryInformation.Name = queryInformation.Name.Trim();
            if (!string.IsNullOrEmpty(queryInformation.Name))
                q = q.Where(fa => fa.Project.Name.Contains(queryInformation.Name) || fa.Project.NameSpell.Contains(queryInformation.Name));
            if (user.IsExpert)
            {
                q = q.Where(e => e.Project.Principal.User == user);

            }
            if (user.UserRole.Type == UserRoleType.Administrator)
            {
                var projectTypeIDList = user.GetCanCensorHorizontalProjectTypes(database)
                        .Union(user.GetCanCensorVerticalProjectTypes(database))
                        .Select(pt => pt.ID)
                        .ToList();

                q = q.Where(p => projectTypeIDList.Contains(p.Project.Type.Type.ID));
            }
            return q;
        }

        /// <summary>
        /// 根据项目取得经费分配记录
        /// </summary>
        /// <param name="query"></param>
        /// <param name="project"></param>
        /// <returns></returns>
        public static IList<Recovery> GetByProject(this IQueryable<Recovery> query, Project project)
        {

            return query
                .Where(q => q.ProjectID == project.ID)
                .OrderBy(q => q.ID)
                .ToList();

        }

    }


    /// <summary>
    /// 追缴单的权限扩展
    /// </summary>
    public static class RecoveryPermissionExtension
    {
    }
}
