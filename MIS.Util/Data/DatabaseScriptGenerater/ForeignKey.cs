using System;
using System.Collections.Generic;
using System.Text;

namespace MIS.Util.Data.DatabaseScriptGenerater
{
    class ForeignKey
    {
        public string ParentTableName { get; set; }
        public string ChildTableName { get; set; }
        public string KeyName { get; set; }
        public string ColumnName { get; set; }
    }
}
