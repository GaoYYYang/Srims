namespace MIS.Util.Data.EntityPrase
{
    /// <summary>
    /// 实体的成员类型
    /// </summary>
    public enum ItemType
    {
        /// <summary>
        /// 未知类型
        /// </summary>
        Unknown,
        /// <summary>
        /// 整型
        /// </summary>
        Int,
        /// <summary>
        /// 长整型
        /// </summary>
        Long,
        /// <summary>
        /// 枚举
        /// </summary>
        Enum,
        /// <summary>
        /// 文本
        /// </summary>
        Text,
        /// <summary>
        /// 长文本
        /// </summary>
        LongText,
        /// <summary>
        /// 日期
        /// </summary>
        DateTime,
        /// <summary>
        /// 布尔
        /// </summary>
        Bool,
        /// <summary>
        /// 二进制流
        /// </summary>
        Bytes,
        /// <summary>
        /// 全球统一表示
        /// </summary>
        Guid,
        /// <summary>
        /// 主键
        /// </summary>
        PrimaryKey,
        /// <summary>
        /// 外键
        /// </summary>
        ForeignKey,
    }
}