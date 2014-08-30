using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Statistic
{
    /// <summary>
    /// 统计扩展
    /// </summary>
    public static class StatisticShowExtension
    {
        /// <summary>
        /// 以XML方式显示
        /// </summary>
        /// <param name="dataTable"></param>
        /// <param name="response"></param>
        public static void ShowAsXml(this DataTable dataTable, HttpResponse response)
        {
            //没有统计数据的情况
            if (dataTable == null)
                return; ;

            response.WriteTagBegin("Statistic");

            //列
            response.WriteTagBegin("Columns");
            for (int i = 0; i < dataTable.Columns.Count; i++)
            {
                response.WriteTagBegin("Column");

                //列的标题
                response.WriteTagWithValue("Title", _GetColumnTitle(dataTable.Columns[i]));
                //列的名称：下划线加列序号
                response.WriteTagWithValue("Name", "_" + i.ToString());

                response.WriteTagEnd("Column");
            }
            response.WriteTagEnd("Columns");

            //行
            response.WriteTagBegin("Rows");
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                response.WriteTagBegin("Row");
                for (int j = 0; j < dataTable.Columns.Count; j++)
                {
                    //构造值
                    var cell = Convert.ToString(dataTable.Rows[i][j]);
                    var value = String.IsNullOrEmpty(cell) ? "[全部]" : cell;

                    //列名称与输出的列的情况对应
                    response.WriteTagWithValue("_" + j.ToString(), value);
                }
                response.WriteTagEnd("Row");
            }
            response.WriteTagEnd("Rows");

            response.WriteTagEnd("Statistic");
        }

        private static string _GetColumnTitle(DataColumn column)
        {
            var columnTitle = column.ColumnName;
            columnTitle = columnTitle == Business.Statistics.Statistic.HEAD_COLUMN_NAME ? "统计" : columnTitle;
            return columnTitle;
        }
    }
}
