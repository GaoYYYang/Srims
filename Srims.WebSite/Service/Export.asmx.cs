using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml;
using System.Xml.Linq;
using System.Text;
using System.Web.Services;
using System.ComponentModel;
using System.Web.Caching;
using System.Data;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.Business.Documents;
using Srims.Server.UI.Awards;
using Srims.Server.Business.Awards;
using Srims.Server.UI.Papers;
using Srims.Server.Business.Papers;
using Srims.Server.UI.Patents;
using Srims.Server.Business.Patents;
using Srims.Server.UI.Projects;
using Srims.Server.Business.Projects;
//using Srims.Server.UI.Statistic;
//using Srims.Server.Business.Statistic;

namespace Srims.WebSite.Service
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class ExportService : WebServiceBase
    {
        [WebMethod]
        public void SendDataForStatisticExport()
        {
            var content = Request.GetString("content");
            var guid = Guid.NewGuid();
            Context.Cache[guid.ToString()] = content;
            Response.Write(guid);
        }

        [WebMethod]
        public void GetDataForStatisticExport()
        {
            var guid = Request.GetGuid("guid");
            var content = Context.Cache[guid.ToString()].ToString();
   
            Response.Clear();
            Response.ClearContent();
            Response.ClearHeaders();

            Response.AddHeader("Content-Disposition", "attachment;filename=" + "result.xls");
            Response.AddHeader("Content-Transfer-Encoding", "binary");
            Response.ContentType = "data:application/vnd.ms-excel";
            Response.ContentEncoding = System.Text.Encoding.UTF8;

            Response.Write(content);
            Response.Flush();
            Response.End();
        }

        [WebMethod]
        public void SendData()
        {
            string excelTitle = Request.GetString("excelTitle");

            XmlDocument storeXmlDocument = new XmlDocument();
            XmlDocument columnsXmlDocument = new XmlDocument();
            storeXmlDocument.LoadXml(Request.GetString("contentStoreXml"));
            columnsXmlDocument.LoadXml(Request.GetString("selectColumns"));
            XDocument storeXDocument = XDocument.Load(new XmlNodeReader(storeXmlDocument));
            XDocument columnsXDocument = XDocument.Load(new XmlNodeReader(columnsXmlDocument));
            int columnsCount = Convert.ToInt16(columnsXDocument.Root.Elements().Single(p => p.Name.LocalName == "selectedCount").Value);

            string[][] columnsArrary = getColumnsArray(columnsXDocument);
            //拼excel字符串  excelXml   
            var excelXml = getExcelXML(columnsArrary, columnsCount, storeXDocument, excelTitle);

            var guid = Guid.NewGuid();
            Context.Cache[guid.ToString()] = excelXml;
            Response.Write(guid);
        }

        [WebMethod]
        public void GetData()
        {
            var guid = Request.GetGuid("guid");
            var content = Context.Cache[guid.ToString()].ToString();

            Response.Clear();
            Response.ClearContent();
            Response.ClearHeaders();

            Response.AddHeader("Content-Disposition", "attachment;filename=" + Request.GetString("FileName"));
            Response.AddHeader("Content-Transfer-Encoding", "binary");
            Response.ContentType = "data:application/vnd.ms-excel";
            Response.ContentEncoding = System.Text.Encoding.UTF8;

            Response.Write(content);
            Response.Flush();
            Response.End();
        }


        private string[][] getColumnsArray(XDocument columns)
        {
            string[] nameArray = columns.Root.Elements().Single(p => p.Name.LocalName == "selectedName").Value.Split(',');
            string[] boxLabelArray = columns.Root.Elements().Single(p => p.Name.LocalName == "selectedBoxLabel").Value.Split(',');
            string[] renderArray = columns.Root.Elements().Single(p => p.Name.LocalName == "selectedRenderer").Value.Split(',');
            string[] widthArray = columns.Root.Elements().Single(p => p.Name.LocalName == "selectedWidth").Value.Split(',');
            string[][] columnsArray = new string[4][];
            columnsArray[0] = nameArray;
            columnsArray[1] = boxLabelArray;
            columnsArray[2] = renderArray;
            columnsArray[3] = widthArray;

            return columnsArray;
        }
        private int[] getColumnsWidthArray(XDocument columns)
        {
            string[] widthStringArray = columns.Root.Elements().Single(p => p.Name.LocalName == "selectedWidth").Value.Split(',');
            int[] widthArray = new int[widthStringArray.Length];
            for (int i = 0; i < widthStringArray.Length; i++)
                widthArray[i] = Convert.ToInt32(widthStringArray[i]);
            return widthArray;
        }
        private StringBuilder getExcelXML(string[][] columnsArray, int columnsCount, XDocument storeXDocument, string ExcelTitle)
        {
            int worksheetHeight = Convert.ToInt16(storeXDocument.Root.Elements().First().Value) * 20 + 20;
            int worksheetWidth = columnsCount * 300 + 50;
            StringBuilder worksheetXml = creatWorksheet(columnsArray, columnsCount, storeXDocument, ExcelTitle);

            StringBuilder exportExcelXml = new StringBuilder();
            exportExcelXml.Append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
            exportExcelXml.Append("<ss:Workbook xmlns:ss=\"urn:schemas-microsoft-com:office:spreadsheet\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">");
            exportExcelXml.Append("<o:DocumentProperties><o:Title>");
            exportExcelXml.Append(ExcelTitle);
            exportExcelXml.Append("</o:Title></o:DocumentProperties>");
            exportExcelXml.Append("<ss:ExcelWorkbook>");
            exportExcelXml.Append("<ss:WindowHeight>");
            exportExcelXml.Append(worksheetHeight);
            exportExcelXml.Append("</ss:WindowHeight>");
            exportExcelXml.Append("<ss:WindowWidth>");
            exportExcelXml.Append(worksheetWidth);
            exportExcelXml.Append("</ss:WindowWidth>");
            exportExcelXml.Append("<ss:ProtectStructure>False</ss:ProtectStructure>");
            exportExcelXml.Append("<ss:ProtectWindows>False</ss:ProtectWindows>");
            exportExcelXml.Append("</ss:ExcelWorkbook>");
            exportExcelXml.Append("<ss:Styles>");
            exportExcelXml.Append("<ss:Style ss:ID=\"Default\">");
            exportExcelXml.Append("<ss:Alignment ss:Vertical=\"Top\" ss:WrapText=\"1\" />");
            exportExcelXml.Append("<ss:Font ss:FontName=\"arial\" ss:Size=\"10\" />");
            exportExcelXml.Append("<ss:Borders>");
            exportExcelXml.Append("<ss:Border ss:Color=\"#e4e4e4\" ss:Weight=\"1\" ss:LineStyle=\"Continuous\" ss:Position=\"Top\" />");
            exportExcelXml.Append("<ss:Border ss:Color=\"#e4e4e4\" ss:Weight=\"1\" ss:LineStyle=\"Continuous\" ss:Position=\"Bottom\" />");
            exportExcelXml.Append("<ss:Border ss:Color=\"#e4e4e4\" ss:Weight=\"1\" ss:LineStyle=\"Continuous\" ss:Position=\"Left\" />");
            exportExcelXml.Append("<ss:Border ss:Color=\"#e4e4e4\" ss:Weight=\"1\" ss:LineStyle=\"Continuous\" ss:Position=\"Right\" />");
            exportExcelXml.Append("</ss:Borders>");
            exportExcelXml.Append("<ss:Interior />");
            exportExcelXml.Append("<ss:NumberFormat />");
            exportExcelXml.Append("<ss:Protection />");
            exportExcelXml.Append("</ss:Style>");
            exportExcelXml.Append("<ss:Style ss:ID=\"title\">");
            exportExcelXml.Append("<ss:Borders />");
            exportExcelXml.Append("<ss:Font />");
            exportExcelXml.Append("<ss:Alignment ss:WrapText=\"1\" ss:Vertical=\"Center\" ss:Horizontal=\"Center\" />");
            exportExcelXml.Append("<ss:NumberFormat ss:Format=\"@\" />");
            exportExcelXml.Append("</ss:Style>");
            exportExcelXml.Append("<ss:Style ss:ID=\"headercell\">");
            exportExcelXml.Append("<ss:Font ss:Bold=\"1\" ss:Size=\"10\" />");
            exportExcelXml.Append("<ss:Alignment ss:WrapText=\"1\" ss:Horizontal=\"Center\" />");
            exportExcelXml.Append("<ss:Interior ss:Pattern=\"Solid\" ss:Color=\"#A3C9F1\" />");
            exportExcelXml.Append("</ss:Style>");
            exportExcelXml.Append("</ss:Styles>");
            exportExcelXml.Append(worksheetXml);
            exportExcelXml.Append("</ss:Workbook>");
            return exportExcelXml;
        }
        private StringBuilder creatWorksheet(string[][] columnsArray, int columnsCount, XDocument storeXDocument, string title)
        {
            int dataCount = Convert.ToInt16(storeXDocument.Root.Elements().First().Value);
            XElement listElement = storeXDocument.Root.Elements().Last();

            StringBuilder columnXml = new StringBuilder();
            StringBuilder headerXml = new StringBuilder();
            for (var i = 0; i < columnsCount; i++)
            {
                columnXml.Append("<ss:Column ss:AutoFitWidth=\"1\" ss:Width=\"");
                columnXml.Append(columnsArray[3][i]);
                columnXml.Append("\" />");
                headerXml.Append("<ss:Cell ss:StyleID=\"headercell\">");
                headerXml.Append("<ss:Data ss:Type=\"String\">");
                headerXml.Append(columnsArray[1][i]);
                headerXml.Append("</ss:Data>");
                headerXml.Append("<ss:NamedCell ss:Name=\"Print_Titles\" /></ss:Cell>");
            }
            StringBuilder headerDetailXml = getHeader(title, columnsCount, dataCount, headerXml, columnXml);
            headerDetailXml = appendHeaderDetailXml(listElement, headerDetailXml, columnsArray, columnsCount);
            StringBuilder resultXml = getResultXml(headerDetailXml);
            return resultXml;
        }
        private StringBuilder getHeader(string title, int columnsCount, int dataCount, StringBuilder headerXml, StringBuilder columnXml)
        {
            StringBuilder headerDetailXml = new StringBuilder();
            headerDetailXml.Append("<ss:Worksheet ss:Name=\"");
            headerDetailXml.Append(title);
            headerDetailXml.Append("\">");
            headerDetailXml.Append("<ss:Names>");
            headerDetailXml.Append("<ss:NamedRange ss:Name=\"Print_Titles\" ss:RefersTo=\"=\'");
            headerDetailXml.Append(title);
            headerDetailXml.Append("\'!R1:R2\" />");
            headerDetailXml.Append("</ss:Names>");
            headerDetailXml.Append("<ss:Table x:FullRows=\"1\" x:FullColumns=\"1\"");
            headerDetailXml.Append(" ss:ExpandedColumnCount=\"");
            headerDetailXml.Append(columnsCount + 2);
            headerDetailXml.Append("\" ss:ExpandedRowCount=\"");
            headerDetailXml.Append(dataCount + 1);
            headerDetailXml.Append("\">");
            headerDetailXml.Append(columnXml);
            headerDetailXml.Append("<ss:Row ss:AutoFitHeight=\"1\">");
            headerDetailXml.Append(headerXml);
            headerDetailXml.Append("</ss:Row>");

            return headerDetailXml;
        }
        private StringBuilder appendHeaderDetailXml(XElement listElement, StringBuilder headerDetailXml, string[][] columnsArray, int columnsCount)
        {
            foreach (XElement record in listElement.Elements())
            {
                headerDetailXml.Append("<ss:Row>");
                for (var j = 0; j < columnsCount; j++)
                {
                    string data = "";
                    //carlsirce 修改
                    var element = record.Elements().FirstOrDefault(e => e.Name.LocalName == columnsArray[0][j]) == null ? null : record.Elements().FirstOrDefault(e => e.Name.LocalName == columnsArray[0][j]);
                    if (element != null)
                        data = element.Value;

                    string renderedData = renderData(data, columnsArray[2][j]);
                    headerDetailXml.Append("<ss:Cell ss:StyleID=\"Default\"><ss:Data ss:Type=\"String\">");
                    headerDetailXml.Append("<![CDATA[");
                    headerDetailXml.Append(renderedData);
                    headerDetailXml.Append("]]>");
                    headerDetailXml.Append("</ss:Data></ss:Cell>");

                }
                headerDetailXml.Append("</ss:Row>");
            }

            return headerDetailXml;
        }
        private StringBuilder getResultXml(StringBuilder headerDetailXml)
        {
            StringBuilder resultXml = new StringBuilder();
            resultXml.Append(headerDetailXml);
            resultXml.Append("</ss:Table>");
            resultXml.Append("<x:WorksheetOptions>");
            resultXml.Append("<x:PageSetup>");
            resultXml.Append("<x:Layout x:CenterHorizontal=\"1\" x:Orientation=\"Landscape\" />");
            resultXml.Append("<x:Footer x:Data=\"Page &amp;P of &amp;N\" x:Margin=\"0.5\" />");
            resultXml.Append("<x:PageMargins x:Top=\"0.5\" x:Right=\"0.5\" x:Left=\"0.5\" x:Bottom=\"0.8\" />");
            resultXml.Append("</x:PageSetup>");
            resultXml.Append("<x:FitToPage />");
            resultXml.Append("<x:Print>");
            resultXml.Append("<x:PrintErrors>Blank</x:PrintErrors>");
            resultXml.Append("<x:FitWidth>1</x:FitWidth>");
            resultXml.Append("<x:FitHeight>32767</x:FitHeight>");
            resultXml.Append("<x:ValidPrinterInfo />");
            resultXml.Append("<x:VerticalResolution>600</x:VerticalResolution>");
            resultXml.Append("</x:Print>");
            resultXml.Append("<x:Selected />");
            resultXml.Append("<x:DoNotDisplayGridlines />");
            resultXml.Append("<x:ProtectObjects>False</x:ProtectObjects>");
            resultXml.Append("<x:ProtectScenarios>False</x:ProtectScenarios>");
            resultXml.Append("</x:WorksheetOptions>");
            resultXml.Append("</ss:Worksheet>");
            return resultXml;
        }
        private string renderData(string value, string renderString)
        {
            switch (renderString)
            {
                case "":
                    return value;
                case "Date":
                    return dateRender(value);
                case "Boolean":
                    return booleanRender(value);
                case "moneyRender":
                    return moneyRender(value);
                case "influenceFactor":
                    return influenceFactorRender(value);
                case "enum":
                    return enumRender(value);
                case "sex":
                    return SexRender(value);
            }
            return value;
        }
        private string dateRender(string value)
        {
            if (value == "")
                return string.Empty;

            string dateString = "";
            dateString = value.Substring(0, 4) + "年" + value.Substring(5, 2) + '月' + value.Substring(8, 2) + '日';
            return dateString;
        }
        private string booleanRender(string value)
        {
            if (value == "")
                return string.Empty;

            return value == "False" ? "否" : "是";
        }
        private string SexRender(string value)
        {
            if (value == "")
                return string.Empty;

            return value == "Man" ? "男" : "女";
        }
        private string influenceFactorRender(string value)
        {
            if (value == "" || value == null)
                return "";
            float a = Convert.ToSingle(value);
            float b = a / 1000;
            string c = b.ToString();
            return c;
        }
        private string enumRender(string value)
        {
            switch (value)
            {
                case "Book":
                    return "著作";
                case "CSSCI":
                    return "CSSCI";
                case "CSSCIExten":
                    return "CSSCI扩展版";


                case "WaitingStartInformation":
                    return "填写立项信息";
                case "WaitingStartCensor":
                    return "等待立项审核";
                case "ProjectProcessing":
                    return "在研";
                case "WaitingEndCensor":
                    return "等待结项审核";
                case "ProjectEnd":
                    return "已结项";
                case "WithDraw":
                    return "撤销";
                case "Terminate":
                    return "终止";
                case "Join":
                    return "参与";
                case "Perside":
                    return "主持";
                case "SubPerside":
                    return "副主持";
                case "Addition":
                    return "附加";

                case "TheFirstResponsibleUnion":
                    return "第一责任单位";
                case "Invention":
                    return "发明专利";
                case "Application":
                    return "实用新型";
                case "Design":
                    return "外观设计";
                case "PCT":
                    return "PCT阶段";
                case "Reject":
                    return "驳回";
                case "Cancel":
                    return "撤回";
                case "Publish":
                    return "公开";
                case "Censor":
                    return "实审";
                case "TreatCancel":
                    return "视为撤回";
                case "AcceptCase":
                    return "受理";
                case "Accredit":
                    return "授权";
                case "Abandon":
                    return "专利权放弃";
                case "Resume":
                    return "专利权恢复";
                case "End":
                    return "专利权终止";

                case "School":
                    return "中国海洋大学";
                case "UnitOut":
                    return "外单位";
                case "SchoolUnitOut":
                    return "中国海洋大学+外单位";
                case "UnitOutSchool":
                    return "外单位+中国海洋大学";
                case "B":
                    return "B";
                case "J":
                    return "J";
                case "S":
                    return "S";
                case "Article":
                    return "Article(文章)";
                case "Correction":
                    return "Correction(更正)";
                case "Editiorial_Material":
                    return "Editiorial_Material(编辑资料)";
                case "Letter":
                    return "Letter(简讯)";
                case "Meeting_Abstract":
                    return "Meeting_Abstract(会议摘要)";
                case "Note":
                    return "Note(纪要)";
                case "Riview":
                    return "Riview(评论)";
                case "ProceedingsPaper":
                    return "ProceedingsPaper";
                case "others":
                    return "其他";
                case "Chinese":
                    return "中文";
                case "English":
                    return "英语";
                case "GerMan":
                    return "德语";
                case "Japanese":
                    return "日语";
                case "Rumanian":
                    return "俄语";
                case "Spanish":
                    return "西班牙语";

                case "UnPrinted":
                    return "未打印";
                case "NotSignIn":
                    return "已打印/未签收";
                case "SignIn":
                    return "签收/未分配";
                case "Allocated":
                    return "已分配";
                case "WaitingCensor":
                    return "未审核";
                case "Canceled":
                    return "作废";




                default:
                    return "未知";
            }
        }
        private string moneyRender(string value)
        {
            if (value == "")
                return "";
            if (value == "0")
                return "0";

            long money = Convert.ToInt64(value);
            return ((double)money / 100 / 10000).ToString() ;
        }
    }
}