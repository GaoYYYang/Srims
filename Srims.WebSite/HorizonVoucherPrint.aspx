<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HorizonVoucherPrint.aspx.cs" Inherits="Srims.WebSite.HorizonVoucherPrint" %>

<%@ Import Namespace="Srims.Server.Business.Fund" %>
<%@ Import Namespace="MIS.Common" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>VoucharPrint</title>
    <style type="text/css">
        #TableVoucherDetial
        {
            width: 700px;
            height: 180px;
            border-bottom: solid 1px Black;
            border-right: solid 1px Black;
        }
        .tableDetial
        {
            width: 698px;
            height: 30px;
        }
        .label
        {
            text-align: center;
            border-left: solid 1px Black;
            border-top: solid 1px Black;
            padding-left: 5px;
        }
        .data
        {
            border-top: solid 1px Black;
            text-align: left;
            padding-left: 5px;
            border-left: solid 1px Black;
        }
        .style1
        {
            text-align: center;
            border-left: solid 1px Black;
            border-top: solid 1px Black;
            padding-left: 5px;
            width: 117px;
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
            中国海洋大学科技经费下款通知书</p>
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
                            <td class="data " colspan="2">
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
                            <td class="label" style="width: 70px;">
                                到款时间
                            </td>
                            <td class="data " style="">
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
                            <td class="label " style="width: 40px;">
                                金额
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
                            <td class="label" style="width: 120px;">
                                本帐卡分配经费
                            </td>
                            <td class="data ">
                                <asp:Literal ID="LiteralProjectAllocationFund" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 65px;">
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
                            <td class="data" style="width: 70px;">
                                校内分配
                            </td>
                            <td class="data">
                                <asp:Literal ID="LiteralInnerAllocation" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 70px;">
                                外协分配
                            </td>
                            <td class="data " style="width: 90px;">
                                <asp:Literal ID="LiteralAssistanceAllocation" runat="server"></asp:Literal>
                            </td>
                            <td class="label" style="width: 70px;">
                                外协管理费
                            </td>
                            <td class="data" style="width: 100px;">
                                <asp:Literal ID="LiteralOvheadExpenseOut" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label" style="width: 74px;">
                                直接费用
                            </td>
                            <td class="data" style="width: 90px;">
                                <asp:Literal ID="LiteralOvheadExpenseTotal" runat="server"></asp:Literal>
                            </td>
                            <td class="style1">
                                学校和二级单位间接费用
                            </td>
                            <td class="data" style="width: 100px;">
                                <asp:Literal ID="LiteralOverheadPerformancePay" runat="server"></asp:Literal>
                            </td>
                            
                            <td class="label" style="width: 70px;">
                                课题组间接费用
                            </td>
                            <td class="data" style="width: 100px;">
                                <asp:Literal ID="ExpertIndirectFee" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <%=_VoucherOutListHtmlString %>
            <tr>
                <td>
                    <table cellpadding="0" cellspacing="0" style="height: 20px; width: 698px;">
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
