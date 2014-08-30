using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Papers;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 文科论文作者
    /// </summary>
    public partial class LiberalArtsPaperAuthor : Entity<LiberalArtsPaperAuthor>
    {

        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(!string.IsNullOrEmpty(Name), "作者名称不能为空");
            validater.AddCondition(_LiberalArtsPaper.Entity != null, "作者对应的论文不能为空");
            validater.AddCondition(_Order > 0, "作者位次必须大于零");
            validater.AddCondition(database.LiberalArtsPaperAuthors.Count(p => p.LiberalArtsPaperID == _LiberalArtsPaperID && p.Order == _Order && p.ID != _ID) == 0, "作者的位次不能相同");
        }
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
        public static LogDescriptionItem[] GetPaperAuthorDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "LiberalArtsPaperID", Title = "论文(文科)的ID" });
            list.Add(new LogDescriptionItem { Name = "ExpertID", Title = "专家的ID" });
            list.Add(new LogDescriptionItem { Name = "Name", Title = "作者名称" });
            list.Add(new LogDescriptionItem { Name = "EnglishName", Title = "英文名" });
            list.Add(new LogDescriptionItem { Name = "Order", Title = "位次" });
            list.Add(new LogDescriptionItem { Name = "IsLinkMan", Title = "是否通讯作者" });

            return list.ToArray();
        }
    }

    /// <summary>
    /// 文科论文作者的业务扩展
    /// </summary>
    public static class LiberalArtsPaperAuthorBusinessExtension
    {
    }
    /// <summary>
    /// 文科论文作者的查询扩展
    /// </summary>
    public static class LiberalArtsPaperAuthorQueryExtension
    {
        /// <summary>
        /// 取得论文作者
        /// </summary>
        /// <param name="query"></param>
        /// <param name="paperID"></param>
        /// <returns></returns>
        public static IList<LiberalArtsPaperAuthor> GetByPaperID(this IQueryable<LiberalArtsPaperAuthor> query, int paperID)
        {
            return query
                .Where(pa => pa.LiberalArtsPaperID == paperID)
                .OrderBy(pa => pa.Order)
                .ToList();
        }
    }
    /// <summary>
    /// 文科论文作者的权限扩展
    /// </summary>
    public static class LiberalArtsPaperAuthorPermissionExtension
    {
    }
}
