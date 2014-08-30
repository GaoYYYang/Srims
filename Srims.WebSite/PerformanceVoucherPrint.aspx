<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PerformanceVoucherPrint.aspx.cs"
    Inherits="Srims.WebSite.PerformanceVoucherPrint" %>

<%@ Import Namespace="Srims.Server.Business.Performances" %>
<%@ Import Namespace="MIS.Common" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>VoucharPrint</title>
    <style type="text/css">
        #TableVoucherDetial
        {
            width: 700px;
            height: 160px;
            border-bottom: solid 1px Black;
            border-right: solid 1px Black;
        }
        .tableDetial
        {
            width: 698px;
            height: 39px;
        }
        .label
        {
            text-align: center;
            border-left: solid 1px Black;
            border-top: solid 1px Black;
        }
        .data
        {
            border-top: solid 1px Black;
            text-align: left;
            padding-left: 5px;
            border-left: solid 1px Black;
        }
    </style>
    <style type="text/css" media="print">
        .noprint
        {
            display: none;
        }
    </style>
</head>
<body style="background-color: inherit;">
    <object id="WebBrowser" height="0" width="0" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"
        viewastext>
    </object>
    <form id="MainForm" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <div id="title" style="padding-top: 30px">
        <div id="title1" style="text-align: center; font-size: large">
            中国海洋大学科技课题组间接费用及绩效分配通知书</p>
        </div>
        <div id="title2">
            <asp:Label ID="LabelTime" runat="server" Style="padding-left: 35px;"></asp:Label>
            <asp:Label ID="LabelVacherNumber" runat="server" Text="凭单号：" Style="padding-left: 150px;"></asp:Label><asp:Literal
                ID="LiteralVoucherNumber" runat="server"></asp:Literal>
            <asp:Label ID="LabelUnit" runat="server" Text="单位：万元" Style="padding-left: 150px;"></asp:Label></div>
    </div>
    <div id="DivVoucherDetail" style="margin-left: 15px;">
        <table id="TableVoucherDetial" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label " style="width: 70px;">
                                负责人
                            </td>
                            <td class="data " style="width: 65px;">
                                <asp:Literal ID="LiteralVoucherFundMember" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 70px;">
                                职工号
                            </td>
                            <td class="data " style="width: 65px;">
                                <asp:Literal ID="ExpertNumber" runat="server"></asp:Literal>
                            </td>
                            <td class="label" style="width: 70px;">
                                课题名称
                            </td>
                            <td class="data " colspan="3">
                                <asp:Literal ID="LiteralProjectName" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label " style="width: 70px;">
                                所在院系
                            </td>
                            <td class="data " colspan="2" style="width: 135px;">
                                <asp:Literal ID="LiteralExpertDepartment" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 70px;">
                                项目种类
                            </td>
                            <td class="data" colspan="2">
                                <asp:Literal ID="LiteralProjectType" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label " style="width: 70px;">
                                到款时间
                            </td>
                            <td class="data " style="width: 90px;">
                                <asp:Literal ID="LiteralGetFundTime" runat="server"></asp:Literal>
                            </td>
                            <td class="label" style="width: 70px;">
                                凭证编号
                            </td>
                            <td class="data ">
                                <asp:Label ID="LabelFinanceVoucherNumber" runat="server"></asp:Label>
                            </td>
                            <td class="label " style="width: 40px;">
                                摘要
                            </td>
                            <td class="data ">
                                <asp:Literal ID="LiteralAbstract" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 150px;">
                                课题组间接费用及绩效总额
                            </td>
                            <td class="data" style="padding-right: 10px;">
                                <asp:Literal ID="LiteralTotalFund" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label " style="width: 70px;">
                                课题组间接费用分配
                            </td>
                            <td class="data " style="width: 260px;">
                                <asp:Literal ID="ExpertIndirect" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 70px;">
                                绩效分配
                            </td>
                            <td class="data " style="width: 260px;">
                                <asp:Literal ID="LiteralPerformancePay" runat="server"></asp:Literal>
                            </td>
                            <td class="label" style="width: 65px;">
                                帐本号
                            </td>
                            <td class="data" style="width: 110px;">
                                <asp:Literal ID="LiteralAccountBookNumber" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label " style="width: 70px;">
                                备注
                            </td>
                            <td class="data " colspan="5">
                                请于10个工作日内到财务处办理手续
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    <asp:Label ID="LabelCachet" runat="server" Text="公章" Style="padding-left: 35px;"></asp:Label>
    <asp:Label ID="LabelVacherMaker" runat="server" Text="制单人：" Style="padding-left: 110px;"></asp:Label>
    <asp:Label ID="LabelVacherMakerName" runat="server"></asp:Label>
    <asp:Label ID="LabelVoucnerCensor" runat="server" Text="审核：" Style="padding-left: 110px;"></asp:Label>
    <asp:Label ID="LabelTransactor" runat="server" Text="经办人：" Style="padding-left: 110px;"></asp:Label>
    <div>
    </div>
    <div id="printdiv" class="noprint" style="margin-top: 10px">
        <input type="button" value="打印" id="ButtonPrint" onclick="window.print();window.close();"
            style="margin-left: 680px; width: 40px; height: 25px;" />
    </div>
    </form>
</body>
</html>
