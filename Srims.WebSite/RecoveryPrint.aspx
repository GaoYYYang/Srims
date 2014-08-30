<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RecoveryPrint.aspx.cs"
    Inherits="Srims.WebSite.RecoveryPrint" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>RecoveryPrint</title>
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
            height: 30px;
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
<body>
    <form id="MainForm" runat="server">
    <div id="title" style="padding-top: 30px">
        <div id="title1" style="text-align: center; font-size: large">
            中国海洋大学科技经费间接费用调整凭单
        </div>
        <div id="title2">
            <asp:Label ID="LabelTime" runat="server" Style="padding-left: 35px;"></asp:Label>
            <asp:Label ID="RecoveryNumber" runat="server" Text="凭单号：" Style="padding-left: 150px;"></asp:Label><asp:Literal
                ID="RecoveryVoucherNumber" runat="server"></asp:Literal>
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
                                <asp:Literal ID="RecoveryProjectPrincipal" runat="server"></asp:Literal>
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
                                <asp:Literal ID="RecoveryProjectName" runat="server"></asp:Literal>
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
                                <asp:Literal ID="RecoveryProjectDepartment" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 70px;">
                                项目种类
                            </td>
                            <td class="data" colspan="2">
                                <asp:Literal ID="RecoveryProjectType" runat="server"></asp:Literal>
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
                                校内已分配经费
                            </td>
                            <td class="data ">
                                <asp:Literal ID="FundAlreadyIn" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 65px;">
                                校内已收间接费用
                            </td>
                            <td class="data" style="width: 110px;">
                                <asp:Literal ID="ReceivedOverheadExpenses" runat="server"></asp:Literal>
                            </td>
                            <td class=" label " style="width: 70px;">
                                校内应收间接费用
                            </td>
                            <td class="data ">
                                <asp:Literal ID="OverheadExpensesAmount" runat="server"></asp:Literal>
                            </td>
                            <td class=" label " style="width: 70px;">
                                调整金额
                            </td>
                            <td class="data ">
                                <asp:Literal ID="AdjustAmount" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label " style="width: 120px;">
                                其中，学校间接费用调整
                            </td>
                            <td class="data ">
                                <asp:Literal ID="RecoveryAmount" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 120px;">
                                二级单位间接费用调整
                            </td>
                            <td class="data ">
                                <asp:Literal ID="Literal2" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 120px;">
                                课题组间接费用及绩效调整
                            </td>
                            <td class="data ">
                                <asp:Literal ID="Literal1" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 90px;">
                                调整账本号
                            </td>
                            <td class="data ">
                                <asp:Literal ID="PrincipalAcountBookNumber" runat="server"></asp:Literal>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
              <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label " style="width: 120px;">
                                调整后，学校间接费用
                            </td>
                            <td class="data ">
                                <asp:Literal ID="Literal3after" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 120px;">
                                二级单位间接费用
                            </td>
                            <td class="data ">
                                <asp:Literal ID="Literal4after" runat="server"></asp:Literal>
                            </td>
                            <td class="label " style="width: 120px;">
                                课题组间接费用及绩效
                            </td>
                            <td class="data ">
                                <asp:Literal ID="Literal5after" runat="server"></asp:Literal>
                            </td>

                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td>
                    <table class="tableDetial" cellpadding="0" cellspacing="0">
                        <tr>
                            <td class="label " style="width: 65px;">
                                备注
                            </td>
                            <td class="data " colspan="5">
                                请于10个工作日内到财务处办理手续。&nbsp;&nbsp;
                                <asp:Literal ID="Remark" runat="server"></asp:Literal>
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
