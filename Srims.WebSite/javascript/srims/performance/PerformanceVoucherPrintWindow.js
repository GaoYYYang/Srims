
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherPrintWindow = function(id, voucher) {
    this._id = id;
    this._voucher = voucher;

    this._buttonPrint = new Ext.Button({
        id: 'voucher-print-button',
        minWidth: 80,
        text: '打 印',
        window: this,
        handler: function() {
            this.window.print();
        }
    });


    Srims.performance.PerformanceVoucherPrintWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '打印凭单' + voucher.get('voucherNumber'),
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        width: 800,
        autoHeight: true,
        closeAction: 'hide',
        layout: 'form',
        buttonAlign: 'center',
        resizable: false,
        items: new Ext.TabPanel({
            activeTab: 0,
            border: false,
            items: [{
                html: getTableElement(voucher)
}]
            }),
            buttons: [this._buttonPrint]
        });

    }
    Ext.extend(Srims.performance.PerformanceVoucherPrintWindow, Ext.Window);

    getTableElement = function(voucher) {
        var now = new Date();
        var voucherPrintTable = new Ext.ux.StringBuilder('<style type="text/css">');

        voucherPrintTable.append('#TableVoucherDetial{ width: 700px;height: 180px; border-bottom: solid 1px Black;border-right: solid 1px Black;}');
        voucherPrintTable.append('.tableDetial{width: 698px;height: 30px;}');
        voucherPrintTable.append('.label{text-align: center;border-left: solid 1px Black;border-top: solid 1px Black;}');
        voucherPrintTable.append('.data{border-top: solid 1px Black;text-align: left;padding-left: 5px;border-left: solid 1px Black;}');
        voucherPrintTable.append('</style>');
        voucherPrintTable.append('<form id="MainForm" runat="server">');

        voucherPrintTable.append('<div id="title" class="print" style="padding-top: 30px">');
        voucherPrintTable.append('<div id="title1" style="text-align: center; font-size: large"><p>中国海洋大学科技经费下款通知书</p></div>');
        voucherPrintTable.append('<div id="title2"><label id="LabelTime" runat="server" style="padding-left: 35px;">');
        voucherPrintTable.append(now.toUTCString());
        voucherPrintTable.append('</label><label id="LabelVacherNumber" runat="server" style="padding-left: 150px;">');
        voucherPrintTable.append('凭单号：' + voucher.get('voucherNumber'));
        voucherPrintTable.append('</label><label id="LabelUnit" runat="server" style="padding-left: 150px;">单位：万元</label></div></div>');

        voucherPrintTable.append('<div id="DivVoucherDetail" style="margin-left: 15px;">');
        voucherPrintTable.append('<table id="TableVoucherDetial" cellpadding="0" cellspacing="0">');

        voucherPrintTable.append('<tr><td>');
        voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
        voucherPrintTable.append('<tr>');
        voucherPrintTable.append('<td class="label " style="width: 65px;">负责人</td>');
        voucherPrintTable.append('<td class="data " style="width: 65px;">');
        voucherPrintTable.append(voucher.get('expertName'));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label" style="width: 70px;">课题名称</td>');
        voucherPrintTable.append('<td class="data " colspan="3">');
        if (voucher.get('projectIsSecret'))
            voucherPrintTable.append('******');
        else
            voucherPrintTable.append(voucher.get('projectName'));
        voucherPrintTable.append('</td></tr></table></td></tr>');

        voucherPrintTable.append('<tr><td>');
        voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
        voucherPrintTable.append('<tr>');
        voucherPrintTable.append('<td class="label " style="width: 70px;">所在院系</td>');
        voucherPrintTable.append('<td class="data " colspan="2">');
        voucherPrintTable.append(voucher.get('deparment'));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label " style="width: 70px;">项目种类</td>');
        voucherPrintTable.append('<td class="data" colspan="2">');
        voucherPrintTable.append(voucher.get('projectType'));
        voucherPrintTable.append('</td></tr></table></td></tr>');

        voucherPrintTable.append('<tr><td>');
        voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
        voucherPrintTable.append('<tr>');
        voucherPrintTable.append('<td class="label" style="width: 70px;">到款时间</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(Date.render(voucher.get('financeReceivedDate')));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label">凭证编号</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(voucher.get('financeVoucherNumber'));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label " style="width: 40px;">摘要</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(voucher.get('financeAbstract'));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label " style="width: 40px;">金额</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(Money.render(voucher.get('financeAmount'), false));
        voucherPrintTable.append('</td></tr></table></td></tr>');

        voucherPrintTable.append('<tr><td>');
        voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
        voucherPrintTable.append('<tr>');
        voucherPrintTable.append('<td class="label" style="width: 120px;">本帐卡分配经费</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(Money.render(voucher.get('amount'), false));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label " style="width: 65px;">帐本号</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(voucher.get('accountBookNumber'));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class=" label " style="width: 70px;">校内分配</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(Money.render(voucher.get('allocationIn'), false));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label" style="width: 90px;">校内管理费</td>');
        voucherPrintTable.append('<td class="data">');
        voucherPrintTable.append(Money.render(voucher.get('overheadExpensesIn'), false));
        voucherPrintTable.append('</td></tr></table></td></tr>');

        voucherPrintTable.append('<tr><td>');
        voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
        voucherPrintTable.append('<tr>');
        voucherPrintTable.append('<td class="label " style="width: 80px;">外协分配</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(Money.render(voucher.get('allocationOut'), false));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label " style="width: 90px;">外协管理费</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(Money.render(voucher.get('overheadExpensesOut'), false));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('<td class="label " style="width: 90px;">总管理费</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(Money.render(voucher.get('overheadExpenses'), false));
        voucherPrintTable.append('</td></tr></table></td></tr>');

        ////外协单位列表
        var store = new Srims.fund.VoucherOutStore(voucher.get('id'));
        for (var i = 0; i < store.getCount(); i++) {
            var voucherOut = store.getAt(i);
            voucherPrintTable.append('<tr><td>');
            voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
            voucherPrintTable.append('<tr>');
            voucherPrintTable.append('<td class="label " style="height: 28px; width: 80px;">外协单位</td>');
            voucherPrintTable.append('<td class="data ">');
            voucherPrintTable.append(voucherOut.get('corporation'));
            voucherPrintTable.append('</td>');
            voucherPrintTable.append('td class="label " style="height: 28px; width: 50px;">金额</td>');
            voucherPrintTable.append('<td class="data ">');
            voucherPrintTable.append(Money.render(voucherOut.get('amount'), false));
            voucherPrintTable.append('</td></tr></table></td></tr>');
        }

        voucherPrintTable.append('<tr><td>');
        voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
        voucherPrintTable.append('<tr>');
        voucherPrintTable.append('<td class="label " style="width: 65px;">备注</td>');
        voucherPrintTable.append('<td class="data " colspan="5">请于10个工作日内到财务处办理手续</td>');
        voucherPrintTable.append('</tr></table></td></tr></table></div>');

        voucherPrintTable.append('<label id="LabelCachet" runat="server" style="padding-left: 35px;">公章</label>');
        voucherPrintTable.append('<label id="LabelVacherMaker" runat="server" style="padding-left: 110px;">');
        voucherPrintTable.append('制单人：' + voucher.get('fundAllocationStateOperator'));
        voucherPrintTable.append('</label>');
        voucherPrintTable.append('<label id="LabelVoucnerCensor" runat="server" style="padding-left: 110px;">审核：</label>');
        voucherPrintTable.append('<label id="LabelTransactor" runat="server" style="padding-left: 110px;">经办人：</label>');
        voucherPrintTable.append('</form>');


        return voucherPrintTable.toString();

    }
