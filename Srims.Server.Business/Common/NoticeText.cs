using System;
using System.Collections.Generic;
using System.Data.Linq;
using System.Linq;
using System.Text;

using MIS.Common;
using MIS.Common.Validate;
using MIS.Common.Query;

using Srims.Server.Business.Users;


namespace Srims.Server.Business.Common
{
    /// <summary>
    /// 提示文本
    /// </summary>
    public partial class NoticeText : Entity<NoticeText>
    {
        /// <summary>
        /// 取得或设置提示文本名称
        /// </summary>
        public string Value
        {
            get { return _Value; }
            set
            {
                _Value = value;
                _ValueSpell = Spell.GetSpell(value);
            }
        }
       
    }
    /// <summary>
    /// 提示文本的业务扩展
    /// </summary>
    public static class NoticeTextBusinessExtension
    {
    }
    /// <summary>
    /// 提示文本的查询扩展
    /// </summary>
    public static class NoticeTextQueryExtension
    {       
        /// <summary>
        ///  取得某一个类别的提示文本
        /// </summary>
        /// <param name="query">提示文本查询</param>
        /// <param name="type">提示文本类型</param>
        /// <returns>该类型的提示文本</returns>
        public static IList<NoticeText> Get(this IQueryable<NoticeText> query, NoticeTextType type)
        {
            return query
                .Where(nt => nt.Type == type)
                .ToList();
        }
        /// <summary>
        /// 取得提示文本
        /// </summary>
        /// <param name="query"></param>
        /// <param name="type"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public static IList<NoticeText> NoticeTexts(this IQueryable<NoticeText>query,NoticeTextType type,string value)
        {
            var noticeTextArray = value.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            var list = new List<NoticeText>();

            foreach (var noticeTextValue in noticeTextArray)
            {
                NoticeText noticeText = new NoticeText();
                noticeText.Type = type;
                noticeText.Value = noticeTextValue;               
                list.Add(noticeText);
            }
            return list;
        }

        /// <summary>
        /// 取得某一类型提示文本的值
        /// </summary>
        /// <param name="query"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public static IList<string> GetNoticeTextValue(this IQueryable<NoticeText> query, NoticeTextType type)
        {
            return query
               .Where(nt => nt.Type == type)
               .Select(nt => nt.Value)
               .ToList();
        }
        /// <summary>
        /// 取得含有关键字的某类提示文本
        /// </summary>
        /// <param name="query"></param>
        /// <param name="type"></param>
        /// <param name="keyWord"></param>
        /// <returns></returns>
        public static IList<NoticeText> SearchNoticeText(this IQueryable<NoticeText> query, NoticeTextType type, string keyWord)
        {
            if (keyWord != null) keyWord = keyWord.Trim();

            return query
                .Where(n => n.Type == type
                    && (n.Value.StartsWith(keyWord)
                        || n.ValueSpell.Equals(keyWord)))
                .ToList();
        }
    }
    /// <summary>
    /// 提示文本的权限扩展
    /// </summary>
    public static class NoticeTextPermissionExtension
    {
    }
}
