using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Papers;
using Srims.Server.Business.Common;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 杂志信息
    /// </summary>
    public partial class MagazineInformation : Entity<MagazineInformation>
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
        public static LogDescriptionItem[] GetMagazineInformationDescriptionItems()
        {
            List<LogDescriptionItem> list = new List<LogDescriptionItem>();

            list.Add(new LogDescriptionItem { Name = "MagazineID", Title = "杂志的ID" });
            list.Add(new LogDescriptionItem { Name = "Year", Title = "年份" });
            list.Add(new LogDescriptionItem { Name = "SubAirer", Title = "分区" });
            list.Add(new LogDescriptionItem { Name = "InfluenceFactor", Title = "影响因子" });
            list.Add(new LogDescriptionItem { Name = "CiteFrequency", Title = "被引频次" });
            list.Add(new LogDescriptionItem { Name = "InstantExponent", Title = "即时指数" });
            list.Add(new LogDescriptionItem { Name = "PaperCount", Title = "论文数" });
            list.Add(new LogDescriptionItem { Name = "CiteHalfLife", Title = "引用半衰期" });

            return list.ToArray();
        }
        /// <summary>
        /// 验证操作
        /// </summary>
        /// <param name="validater"></param>
        /// <param name="database"></param>
        protected override void ValidateAction(Validater validater, IDatabase database)
        {
            validater.AddCondition(_Magazine.Entity != null, "对应的杂志不能为空");
        }
    }

    /// <summary>
    /// 杂志信息的业务扩展
    /// </summary>
    public static class MagazineInformationBusinessExtension
    {
    }
    /// <summary>
    /// 杂志信息的查询扩展
    /// </summary>
    public static class MagazineInformationQueryExtension
    {
        /// <summary>
        /// 取得对应杂志的信息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="magazineID"></param>
        /// <returns></returns>
        public static IList<MagazineInformation> GetMagazineInformationByMagazineID(this IQueryable<MagazineInformation> query, int magazineID)
        {
            return query
                .Where(m => m.MagazineID == magazineID)
                .OrderBy(m => m.Year)
                .ToList();
        }
    }
    /// <summary>
    /// 杂志信息的权限扩展
    /// </summary>
    public static class MagazineInformationPermissionExtension
    {
    }
}
