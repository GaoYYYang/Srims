using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Papers
{
    /// <summary>
    /// 论文类型
    /// </summary>
    public enum PaperType
    {
        /// <summary>
        /// 未知
        /// </summary>
        Unknown = 0,
        /// <summary>
        /// 文章
        /// </summary>
        Article = 1,
        /// <summary>
        /// 修正
        /// </summary>
        Correction = 2,
        /// <summary>
        /// 编者按，社论
        /// </summary>
        Editiorial_Material = 3,
        /// <summary>
        /// 文字
        /// </summary>
        Letter = 4,
        /// <summary>
        /// 会议摘要
        /// </summary>
        Meeting_Abstract = 5,
        /// <summary>
        /// 笔记
        /// </summary>
        Note = 6,
        /// <summary>
        /// 回顾
        /// </summary>
        Riview = 7,
        /// <summary>
        /// proceedingsPaper
        /// </summary>
        ProceedingsPaper = 8,
    }
}
