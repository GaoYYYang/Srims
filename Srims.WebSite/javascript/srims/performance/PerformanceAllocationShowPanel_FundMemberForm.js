
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel_FundMemberForm = function(projectId) {

    var load_url = Srims.service.fund.FundMemberService + '/GetByProject';
    this._store = new Srims.fund.FundMemberStore(load_url, {
        projectId: projectId,
        isPerformance: true
    });
    this._columnModel = new Srims.fund.FundMemberGridPanel_ColumnModel();

    this._gridPanelFundMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        autoExpandColumn: 'remark',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有经费成员信息'
        }
    });

    Srims.performance.PerformanceAllocationShowPanel_FundMemberForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费成员信息（双击经费成员清空账本号）',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundMember]
    });

    this._store.load();

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var fundMember = grid.getStore().getAt(rowIndex);

        if (!fundMember.get('canResetAccountBookNumber')) {
            Ext.Msg.show({
                title: '清空账本号错误',
                msg: '您没有清空账本号的权限或该经费成员不能清空账本号',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        Ext.MessageBox.confirm('清空经费成员账本号', '你确定要清除这个经费成员的账本号吗，此操作不可撤销？', function(buttonId) {
            if (buttonId == 'yes')
                Srims.fund.clearFundMemberAccountBookNumber(fundMember, grid.getStore());
        }, this);
    };
    this._gridPanelFundMember.on('celldblclick', onCellDblClick);
}
Ext.extend(Srims.performance.PerformanceAllocationShowPanel_FundMemberForm, Ext.form.FormPanel, {});

