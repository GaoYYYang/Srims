using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MIS.Common.Mails
{
    /// <summary>
    /// 邮件附件
    /// </summary>
    public class Attachment
    {
        private string _Name;
        private byte[] _Data;

        /// <summary>
        /// 取得附件名称
        /// </summary>
        public string Name
        {
            get { return _Name; }
        }
        /// <summary>
        /// 取得附件数据
        /// </summary>
        public byte[] Data
        {
            get { return _Data; }
        }

        /// <summary>
        /// 构造附件
        /// </summary>
        /// <param name="name">附件名称，可为空</param>
        /// <param name="data">数据</param>
        public Attachment(string name, byte[] data)
        {
            if (data == null)
                throw new ArgumentNullException("data");

            _Name = name;
            _Data = data;
        }
    }
}
