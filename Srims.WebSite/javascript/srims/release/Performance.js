if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'projectNumber',
    type: 'string',
    mapping: 'ProjectNumber'
}, {
    name: 'canAllocate',
    type: 'bool',
    mapping: 'CanAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'fundAllocationIn',
    type: 'int',
    mapping: 'FundAllocationIn'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'allocationDateTime',
    type: 'date',
    mapping: 'AllocationDateTime'
}, {
    name: 'performanceTotal',
    type: 'int',
    mapping: 'PerformanceTotal'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'arrivedPerformance',
    type: 'int',
    mapping: 'ArrivedPerformance'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'state',
    type: 'string',
    mapping: 'CurrentState'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPricinpalName',
    type: 'string',
    mapping: 'ProjectPricinpalName'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'isCancel',
    type: 'bool',
    mapping: 'IsCancel',
    convert: Boolean.toBoolean
},{
    name: 'isHorizontal',
    type: 'bool',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'performanceID',
    type: 'int',
    mapping: 'performanceID'
}, {
    name: 'hasPermission_Allocation',
    type: 'bool',
    mapping: 'HasPermission_Allocation',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Canel',
    type: 'bool',
    mapping: 'HasPermission_Canel',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Censor',
    type: 'bool',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Submit',
    type: 'bool',
    mapping: 'HasPermission_Submit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UndoSubmit',
    type: 'bool',
    mapping: 'HasPermission_UndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Correct',
    type: 'bool',
    mapping: 'HasPermission_Correct',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocation',
    type: 'bool',
    mapping: 'CanAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canCancel',
    type: 'bool',
    mapping: 'CanCancel',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'bool',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'bool',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmit',
    type: 'bool',
    mapping: 'CanSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoSubmit',
    type: 'bool',
    mapping: 'CanUndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canCorrect',
    type: 'bool',
    mapping: 'CanCorrect',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocationPerformancePay',
    type: 'bool',
    mapping: 'CanAllocationPerformancePay',
    convert: Boolean.toBoolean
}, {
    name: 'canChangePerformanceAmount',
    type: 'bool',
    mapping: 'CanChangePerformanceAmount',
    convert: Boolean.toBoolean
}, {
    name: 'arrivedOverheadexpensesExpert',
    type: 'int',
    mapping: 'ArrivedOverheadexpensesExpert',
}, {
    name: 'expertIndirectFee',
    type: 'int',
    mapping: 'ExpertIndirectFee',
}
]);

    Srims.data.Entity.apply(Srims.performance.PerformanceAllocation);
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.listWaitingCensorPerformance_Horizontal = function() {
    Srims.performance.listPerformanceAllocation('performanceAllocationGridPanel_WaitingCensor_Horizontal', '审核横向绩效分配', 'icon-fund-allocation-waiting-censor-horizontal-project', true, Srims.performance.performanceAllocationState.WaitingCensor, false);
}
Srims.performance.listWaitingCensorPerformance_Vertical = function() {
    Srims.performance.listPerformanceAllocation('performanceAllocationGridPanel_WaitingCensor_Vertical', '审核纵向绩效分配', 'icon-fund-allocation-waiting-censor-vertical-project', false, Srims.performance.performanceAllocationState.WaitingCensor, false);
}


Srims.performance.listAllPerformanceAllocation = function() {
    Srims.performance.listPerformanceAllocation('performanceAllocationGridPanel_All', '绩效分配记录', 'icon-fund-allocation-list', undefined, undefined);
}
//carlsirce2013.5.14 加入未分配绩效分配
Srims.performance.listUnallocatedPerformanceAllocation = function() {
    Srims.performance.listPerformanceAllocation('performanceAllocationGridPanel_Unallocated', '未分配课题组间接费用及绩效', 'icon-fund-allocation-list', undefined, "UnSubmit,Reject", true);
}
Srims.performance.listPerformanceAllocation = function(panelId, title, iconcls, isHorizontal, state, isCheckBox) {
    var fundAllocationStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (!panel) {
        queryParams = getFundAllocationQueryParams(isHorizontal, state);
        fundAllocationStore = new Srims.performance.PerformanceAllocationStore(Srims.service.performance.PerformanceAllocationService + '/Query', queryParams);
        panel = new Srims.performance.PerformanceAllocationGridPanel(panelId, fundAllocationStore, title, iconcls, queryParams, isCheckBox);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
function getFundAllocationQueryParams(isHorizontal, state) {
    var params = {};

    if (state != undefined)
        params.performanceAllocationState = state;
    if (isHorizontal != undefined)
        params.isHorizontal = isHorizontal;

    return params;
}

Srims.performance.showFundAllocationQueryWindow = function(id, store, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.performance.PerformanceAllocationQueryWindow(id, store, queryParams);
    }
    gridPanel.queryWindow = window;
    window.show();

    new Ext.KeyMap(id, {
        key: 13,
        scope: this,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.performance.showPerformanceAllocationInfoByPerformanceAllocation = function(performanceAllocation) {
    Srims.performance.showPerformanceAllocationInfo(performanceAllocation);
}
Srims.performance.showPerformanceAllocationInfo = function(performanceAllocation) {
    var panelId = 'showPerformanceAllocation' + performanceAllocation.get('id');
    var panel = Srims.WorkSpace.active(panelId);

    if (!panel) {
        panel = new Srims.performance.PerformanceAllocationShowPanel(panelId, performanceAllocation);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.performance.showFundAllocationCensorWindow = function(fundAllocation, isCensorPass) {
    var windowId = isCensorPass ? 'performanceAllocationCensorPassWindow' + fundAllocation.get('id') : 'performanceAllocationCensorRejectWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);

    if (!window) {
        var window = new Srims.performance.PerformanceAllocationCensorWindow(id, fundAllocation, isCensorPass);
    }
    window.show();
}
Srims.performance.submitPerformanceAllocation = function(performanceAllocation, panel) {
    var isHorizontal = performanceAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;

    Srims.performance.SaveFundAllocationForChangeState(performanceAllocation, '/Submit', undefined, poolAction, undefined, panel);
}
Srims.performance.undoSubmitFundAllocation = function(fundAllocation, panel) {
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;

    Srims.performance.SaveFundAllocationForChangeState(fundAllocation, '/UndoSubmit', undefined, poolAction, undefined, panel);
}
Srims.performance.censorPassFundAllocation = function(fundAllocation, remark, censorWindow) {
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend : Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend;
    Srims.performance.SaveFundAllocationForChangeState(fundAllocation, '/CensorPass', remark, poolAction, censorWindow, undefined);
}
Srims.performance.censorRejectFundAllocation = function(fundAllocation, remark, censorWindow) {
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;

    Srims.performance.SaveFundAllocationForChangeState(fundAllocation, '/CensorReject', remark, poolAction, censorWindow, undefined);
}
Srims.performance.cancelFundAllocation = function(fundAllocation, remark) {
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend : Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend;

    Srims.performance.SaveFundAllocationForChangeState(fundAllocation, '/Cancel', remark, poolAction, undefined, undefined);
}
Srims.performance.SaveFundAllocationForChangeState = function(fundAllocation, subUrl, remark, pollAction, censorWindow, expertGuidPanel) {
    var params = {};
    params.performanceAllocationId = fundAllocation.get('id');
    if (remark != undefined)
        params.remark = remark;

    Ext.Ajax.request({
        url: Srims.service.performance.PerformanceAllocationService + subUrl,
        params: params,
        success: function() {
            if (censorWindow)
                censorWindow.close();

            if (pollAction != null)
                for (var i = 0; i < pollAction.length; i++)
                Srims.Poll.startPollAction(pollAction[i]);

            var panelId = fundAllocation.get('isHorizontal') ? 'fundAllocationGridPanel_WaitingCensor_Horizontal' : 'fundAllocationGridPanel_WaitingCensor_Vertical';
            var panel = Ext.getCmp(panelId);
            if (panel)
                panel.getStore().load();

            if (!expertGuidPanel)
                fundAllocation.panel.refresh();
            //仅用于专家向导
            if (expertGuidPanel) {
                if (fundAllocation.get('state') == Srims.fund.fundAllocationState.WaitingCensor)
                    fundAllocation.panel.refresh();
                else
                    Srims.expertGuide.next(expertGuidPanel);
            }
        }
    });
}
Srims.performance.clearFundMemberAccountBookNumber = function(fundMember, store) {
    Ext.Ajax.request({
        url: Srims.service.fund.FundMemberService + '/ClearAccountBookNumber',
        params: {
            fundMemberId: fundMember.get('id')
        },
        success: function() {
            store.load();
        }
    });
}
Srims.performance.CorrectAllocationDateTime = function(fundAllocation) {
    var windowId = 'fundAllocationCorrectDateTimeWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);

    if (!window) {
        var window = new Srims.fund.FundAllocationCorrectDateTimeWindow(fundAllocation);
    }
    window.show();
}
Srims.performance.CorrectAllocation = function(fundAllocation) {
    var windowId = 'fundAllocationCorrectWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);

    if (!window) {
        var window = new Srims.fund.FundAllocationCorrectWindow(fundAllocation);
    }
    window.show();
}


Srims.performance.showFundAllocationPerformanceWindow = function(performanceAllocation) {
    var windowId = 'fundAllocaitonPerformanceWindow';
    var window = Ext.getCmp(windowId);
    if (!window) {
        var window = new Srims.performance.PerformanceAllocationWindow(windowId, performanceAllocation);
    }
    window.show();

}
Srims.performance.showPerformanceAllocationInfo = function(performanceAllocation) {
    var panelId = 'showPerformanceAllocation' + performanceAllocation.get('id');
    var panel = Srims.WorkSpace.active(panelId);

    if (!panel) {
        panel = new Srims.performance.PerformanceAllocationShowPanel(panelId, performanceAllocation);
        Srims.WorkSpace.addPanel(panel);
    }
}
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationCensorWindow = function(id, fundAllocation, isCensorPass) {

    this._fundAllocation = fundAllocation;

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonCensor = new Ext.Button({
        minWidth: 80,
        text: isCensorPass ? '审核通过' : '审核驳回',
        window: this
    });

    this._fieldCensorState = new Ext.form.Field({
        fieldLabel: '审核状态',
        value: isCensorPass ? '审核通过' : '审核驳回',
        readOnly: true,
        width: 160
    });
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        height: 60,
        width: 230
    });

    Srims.performance.PerformanceAllocationCensorWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isCensorPass ? '审核通过经过经费分配' : '审核驳回经费分配',
        width: 370,
        autoHeight: true,
        labelWidth: 60,
        bodyStyle: 'padding:10px 10px 20px 10px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._fieldCensorState, this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });

    this.buttonCensor_click = function(button, e) {
        var window = this.window;

        if (isCensorPass)
            Srims.performance.censorPassFundAllocation(window._fundAllocation, window._textRemark.getValue(), window);
        else
            Srims.performance.censorRejectFundAllocation(window._fundAllocation, window._textRemark.getValue(), window);
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.performance.PerformanceAllocationCensorWindow, Ext.Window);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationCorrectDateTimeWindow = function(fundallocation) {

    this._fundAllocation = fundallocation;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._dateFieldDateTime = new Ext.form.DateField({
        fieldLabel: '分配时间',
        value: this._fundAllocation.get('allocationDateTime'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    Srims.performance.PerformanceAllocationCorrectDateTimeWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '纠正经费分配时间',
        width: 300,
        labelWidth: 70,
        height: 160,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._dateFieldDateTime],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldDateTime.isValid(preventMark) && result;
        
        return result;
    }
    this._save = function(){
        var fundAllocationDateTime = this._dateFieldDateTime.getValue().format("Y-m-d H:i:s");
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/CorrectDateTime',
            params: {
                fundAllocationId: this._fundAllocation.get('id'),
                fundAllocationDateTime: fundAllocationDateTime
            },
            scope: this,
            success: function(){
                var panel = this._fundAllocation.panel;
                panel.fundAllocation = this._fundAllocation;
                panel.refresh();
                
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.performance.PerformanceAllocationCorrectDateTimeWindow, Ext.Window, {})
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationCorrectWindow = function(fundAllocation) {

	this._fundAllocation = fundAllocation;

	this._buttonClose = new Ext.Button({
		minWidth: 70,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.close();
		}
	});
	var load_url = Srims.service.fund.VoucherService + '/GetByFundAllocation';
	this._store = new Srims.fund.VoucherStore(load_url, {
		fundAllocationId: this._fundAllocation.get('id')
	});
	this._selections = new Ext.grid.RowSelectionModel();
	this._columnModel = new Ext.grid.ColumnModel([{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber'
	},{
		header: "经费成员",
		dataIndex: 'expertName'
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		renderer: Money.render
	},{
		header: "校内金额(万元)",
		dataIndex: 'allocationIn',
		renderer: Money.render
	},{
		header: "外协金额(万元)",
		dataIndex: 'allocationOut',
		renderer: Money.render
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber'
	},{
		id: 'voucherState',
		header: "状态",
		dataIndex: 'voucherState',
		hidden: false,
		renderer: Srims.fund.VoucherStateRender
	}]);
	this._tbar = new Srims.performance.VoucherGridPanel_ToolBar(this._selections, this._store, undefined, undefined, false, true, fundAllocation, false, true);

	this._gridPanelVoucher = new Ext.grid.GridPanel({
		store: this._store,
		colModel: this._columnModel,
		enableColumnHide: false,
		enableColumnMove: true,
		enableHdMenu: false,
		border: false,
		tbar: this._tbar,
		sm: this._selections,
		width: 700,
		height: 200,
		autoExpand: true,
		autoExpandColumn: 'voucherState',
		stripeRows: true,
		loadMask: true,
		stateful: false,
		viewConfig: {
			autoFill: true,
			scrollOffset: 0,
			forceFit: true,
			emptyText: '没有凭单信息'
		}
	});

	this._store.load();
	function onCellDblClick(grid, rowIndex, columnIndex, e) {
		var voucher = grid.getStore().getAt(rowIndex);
		if (!voucher.get('canEdit'))
			return;

		Srims.fund.editVoucher(fundAllocation, voucher);
	};

	this._gridPanelVoucher.on('celldblclick', onCellDblClick);

	Srims.performance.PerformanceAllocationCorrectWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '纠正经费分配',
		autoHeight: true,
		width: 710,
		modal: true,
		deferredRender: false,
		stateful: false,
		frame: true,
		closeAction: 'close',
		layout: 'form',
		resizable: false,
		items: [this._gridPanelVoucher],
		buttons: [this._buttonClose]
	});
}
Ext.extend(Srims.performance.PerformanceAllocationCorrectWindow, Ext.Window, {})
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationGridPanel = function(id, performanceAllocationStore, title, iconCls, queryParams, isCheckBox) {

    this._store = performanceAllocationStore;
    this._store.gird = this;
    this._isCheckBox = isCheckBox;
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert' && this._isCheckBox) {
        this._selections = new Ext.grid.CheckboxSelectionModel({ handleMouseDown: function(g, rowIndex, e) {
            if (e.button !== 0 || this.isLocked()) {
                return;
            }
            var view = this.grid.getView();
            if (e.shiftKey && !this.singleSelect && this.last !== false) { // shift事件
                var last = this.last;
                this.selectRange(last, rowIndex, e.ctrlKey);
                this.last = last; // reset the last     
                view.focusRow(rowIndex);
            } else {
                var isSelected = this.isSelected(rowIndex);
                if (isSelected) {
                    this.deselectRow(rowIndex);
                } else if (!isSelected || this.getCount() > 1) {
                    this.selectRow(rowIndex, true);
                    view.focusRow(rowIndex);
                }
            }
        }
        });
        this._columnModel = new Srims.performance.PerformanceAllocationGridPanel_ColumnModel(true, this._selections);
    }
    else {
        this._selections = new Ext.grid.RowSelectionModel();
        this._columnModel = new Srims.performance.PerformanceAllocationGridPanel_ColumnModel(false, this._selections);
    }
    this._filters = new Srims.performance.PerformanceAllocationGridPanel_GridFilters();
    this._toolBar = new Srims.performance.PerformanceAllocationGridPanel_ToolBar(this._selections, this._store, id, queryParams, false);

    this._textItemFundSum = new Ext.Toolbar.TextItem('');
    Srims.performance.PerformanceAllocationGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        tbar: this._toolBar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._store,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录',
            items: [this._textItemFundSum]
        })
    });

    this.on('celldblclick', onCellDblClick);
    this._store.on('load', function(store, records) {
        if (records.overheadExpensesExpertSum == undefined)
            records.overheadExpensesExpertSum = 0;

        var fundSumMessage = String.format(" <font size='8'>可分配的课题组间接费用及绩效：<strong>{0}</strong></font>", Money.render(records.overheadExpensesExpertSum));

        Ext.get(store.gird._textItemFundSum.id).update(fundSumMessage);
    });
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var fundAllocation = grid.getStore().getAt(rowIndex);
        Srims.performance.showPerformanceAllocationInfo(fundAllocation);
    }
}
Ext.extend(Srims.performance.PerformanceAllocationGridPanel, Srims.component.GridPanel, {});

if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceAllocationGridPanel_ColumnModel = function(isCheckBox, selectModel) {
    if (isCheckBox) {
        Srims.performance.PerformanceAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [selectModel, {
            header: 'id',
            hidden: true
        }, {
            header: '项目编号',
            dataIndex: 'projectNumber',
            width: 20,
            sortable: false,
            hidden: false
        }, {
            header: '项目名称',
            dataIndex: 'projectName',
            sortable: true,
            width: 300
        }, {
            header: '项目类型',
            dataIndex: 'typeName',
            sortable: true,
            width: 300
        }, {
            header: '项目负责人',
            dataIndex: 'projectPricinpalName',
            sortable: true,
            width: 300
        }, {
            header: '项目间接费',
            dataIndex: 'indirectCosts',
            width: 40,
            renderer: Money.render,
            hidden: true

        }, {
            header: '项目绩效',
            dataIndex: 'projectPerformancePay',
            width: 40,
            renderer: Money.render,
            hidden: true
        }, {
            header: '校内绩效',
            dataIndex: 'performancePay',
            width: 40,
            renderer: Money.render,
            hidden: true
        }, {
            header: '本次校内分配',
            dataIndex: 'fundAllocationIn',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '已到课题组间接费用及绩效',
            dataIndex: 'arrivedOverheadexpensesExpert',
            width: 80,
            renderer: Money.render
        }, {
            header: '课题组间接费用',
            dataIndex: 'expertIndirectFee',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '绩效',
            dataIndex: 'arrivedPerformance',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '是否允许分配',
            dataIndex: 'canAllocate',
            width: 40,
            renderer: function(value) {
                return value == true ? '是' : '否';
            },
            sortable: true,
            hidden: true
        }, {
            header: '当前状态',
            dataIndex: 'state',
            sortable: true,
            width: 60,
            renderer: Srims.performance.fundAllocationStateRender,
            hidden: true
        }, {
            header: '当前状态时间',
            dataIndex: 'dateTime',
            width: 100,
            renderer: Date.render,
            hidden: true
        }, {
            id: 'operator',
            header: '当前状态操作人',
            dataIndex: 'operator',
            hidden: true
}])
        }
        else {
            Srims.performance.PerformanceAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [{
                header: 'id',
                hidden: true
            }, {
                header: '项目编号',
                dataIndex: 'projectNumber',
                width: 20,
                sortable: false,
                hidden: false
            }, {
                header: '项目名称',
                dataIndex: 'projectName',
                sortable: true,
                width: 300
            }, {
                header: '项目类型',
                dataIndex: 'typeName',
                sortable: true,
                width: 300
            }, {
                header: '项目负责人',
                dataIndex: 'projectPricinpalName',
                sortable: true,
                width: 300
            }, {
                header: '本次校内分配',
                dataIndex: 'fundAllocationIn',
                sortable: false,
                width: 80,
                renderer: Money.render,
                hidden: true
            }, {
                header: '已到课题组间接费用及绩效',
                dataIndex: 'arrivedOverheadexpensesExpert',
                width: 80,
                renderer: Money.render
            }, {
                header: '是否允许分配',
                dataIndex: 'canAllocate',
                width: 40,
                renderer: function(value) {
                    return value == true ? '是' : '否';
                },
                sortable: true,
                hidden: true
            }, {
                header: '分配时间',
                dataIndex: 'allocationDateTime',
                sortable: true,
                width: 100,
                renderer: Date.render,
                hidden: true
            }, {
                header: '当前状态',
                dataIndex: 'state',
                sortable: true,
                width: 60,
                renderer: Srims.performance.fundAllocationStateRender,
                hidden: true
            }, {
                header: '当前状态时间',
                dataIndex: 'dateTime',
                width: 100,
                renderer: Date.render,
                hidden: true
            }, {
                id: 'operator',
                header: '当前状态操作人',
                dataIndex: 'operator',
                hidden: true
}])
            }
        }
        Ext.extend(Srims.performance.PerformanceAllocationGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationGridPanel_ToolBar = function(selection, store, panelId, queryParams, canDelete, panel) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._canDelete = canDelete;
    this._panel = panel;

    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        hidden: false,
        handler: function() {
            Srims.performance.showFundAllocationQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>经费分配查询</b><br/>对经费分配信息进行查询'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看项目',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var performanceAllocation = this.selection.getSelected();
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: performanceAllocation.get('projectID')
                },
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectXmlReader()
                    });
                    var project = store.getAt(0);
                    Srims.projects.showProject(project);
                    //Srims.Load.loadProjectModule('Srims.projects.showProject(project);');
                }
            });
            //Srims.performance.showPerformanceAllocationInfo(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看分配</b><br/>显示所选经费分配的详细信息'
    });
    this._buttonAllocatePerformance = new Ext.Toolbar.Button({
        iconCls: 'icon-performance',
        text: '查看课题组间接费用分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.performance.showPerformanceAllocationInfoByPerformanceAllocation(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b><br/>对所选经费下拨进行分配'
    });
    this._buttonEnableAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-performance',
        text: '开启课题组间接费用和绩效分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.MessageBox.confirm('开启分配', '你确定要开启所选分配吗？该操作不可恢复！', function(button) {
                if (button == 'yes') {
                    var param = '';
                    for (var i = 0; i < selection.selections.length; i++) {
                        param += selection.selections.items[i].get('id');
                        param += ',';
                    }
                    Ext.Ajax.request({
                        url: Srims.service.performance.PerformanceAllocationService + '/EnableAllocate',
                        params: {
                            performanceAllocationIds: param
                        },
                        success: function(response) {
                            Ext.MessageBox.alert('提示', '已成功开启' + response.responseText + '条绩效分配！');
                            store.load();
                        }
                    });
                }
            }, this);

        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b><br/>对所选经费下拨进行分配'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        panel: this._panel,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var performanceAllocation = this.selection.getSelected();
            if (performanceAllocation.get('canAllocate') == true) {
                Ext.MessageBox.alert('提示', '已开启课题组间接费用和绩效分配，不能删除！');
                return
            }
            var store = this.panel._store;
            Ext.MessageBox.confirm('删除经费下拨', '你确定要删除这个课题组间接费用和绩效下拨吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Ext.Ajax.request({
                        url: Srims.service.performance.PerformanceAllocationService + '/Delete',
                        params: {
                            performanceAllocationId: performanceAllocation.get('id')
                        },
                        success: function(response) {
                            Ext.MessageBox.alert('提示', '已成功删除！');
                            Srims.performance.PerformanceCallBack(store.window, response, store, undefined, true);
                            store.load();
                        }
                    });
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除课题组间接费用和绩效下拨</b><br/>删除选中的未分配课题组间接费用和绩效下拨'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费分配列表'
    });

    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        hidden: this._canDelete,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token', 'fundAllocationState', 'isHorizontal', 'IsStatistic'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    var items = [this._buttonQuery, this._buttonShow, this._buttonAllocatePerformance, this._buttonEnableAllocate, this._buttonDelete, new Ext.Toolbar.TextItem('&nbsp;  &nbsp; &nbsp; &nbsp;   <font color="FF0000">  说明：本次分配校内经费值为0时，则该记录由系统自动调整产生。</font>'), new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];

    Srims.performance.PerformanceAllocationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });



    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonAllocatePerformance = this._buttonAllocatePerformance;
    this._selection.buttonEnableAllocate = this._buttonEnableAllocate;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonQuery = this._buttonQuery
    this._selection.canDelete = this._canDelete;
    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonAllocatePerformance = selection.buttonAllocatePerformance;
        var buttonEnableAllocate = selection.buttonEnableAllocate;
        var buttonQuery = selection.buttonQuery;
        var buttonDelete = selection.buttonDelete;

        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonAllocatePerformance.hide();
            buttonEnableAllocate.hide();
            buttonDelete.hide();
            return;
        }
        if (user.userRoleType != 'Expert') {
            if (selection.getSelected().get('canAllocate') != true) {
                buttonEnableAllocate.setVisible(true);
                buttonEnableAllocate.setDisabled(false);
            }
            else {
                buttonEnableAllocate.setVisible(false);
                buttonEnableAllocate.setDisabled(true);
            }
            if (selection.getSelected().get('canAllocate') != true && selection.canDelete == true) {
                buttonDelete.setVisible(true);
                buttonDelete.setDisabled(false);
            }
        }
        buttonShow.setVisible(true);
        buttonShow.setDisabled(false);
        buttonAllocatePerformance.setVisible(true);
        buttonAllocatePerformance.setDisabled(false);
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.performance.PerformanceAllocationGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationQueryWindow = function(id, store, queryParams) {

    this._id = id;
    this._store = store;
    this._params = queryParams;

    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function() {
            this.window.clearParams();
            this.window.buildParams();
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    this._comboBoxProjectName = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目名称',
        width: 180
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '负责人',
        width: 180
    });
    this._comboBoxProjectNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        width: 180
    });
    this._checkboxFundAllocationStates = new Srims.component.CheckBoxGroup({
        fieldLabel: '状态',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.performance.fundAllocationStore),
        cls: 'srims-checkboxGroup'
    });
    this._checkBoxCanAllocate = new Ext.form.Checkbox({
        fieldLabel: '是否允许分配',
        width: 180
    });
    Srims.performance.PerformanceAllocationQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '查询',
        iconCls: 'icon-query',
        width: 500,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            border: false,
            frame: true,
            height: 180,
            items: [this._comboBoxProjectName, this._comboBoxExpert, this._comboBoxProjectNumber]//, this._checkboxFundAllocationStates, this._checkBoxCanAllocate]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });

    this.buildParams = function(queryParams) {
        queryParams.projectName = this._comboBoxProjectName.getText();
        queryParams.expertName = this._comboBoxExpert.getText();
        queryParams.projectNumber = this._comboBoxProjectNumber.getValue();
        // queryParams.canAllocate = this._checkBoxCanAllocate.getValue();
        //  queryParams.performanceAllocationState = this._checkboxFundAllocationStates.getSelecetedValue();
    }
    this.clearParams = function() {
        this._comboBoxProjectName.reset();
        this._comboBoxExpert.reset();
        this._comboBoxProjectNumber.reset();
        //   this._checkBoxCanAllocate.reset();
        // this._checkboxFundAllocationStates.reset();
    }
    this.query = function(button, e) {
        var window = button.window;
        var params = window._params;
        window.buildParams(params);

        Srims.SetQueryParams.removeNullparams(params);
        window._store.load();
        window.hide();
    }
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.performance.PerformanceAllocationQueryWindow, Ext.Window);

if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel = function(id, perfomanceAllocation) {

    this._fundAllocation = perfomanceAllocation;
    this._fundAllocation.panel = this;

    this._toolBar = new Srims.performance.PerformanceAllocationShowPanel_ToolBar(this._fundAllocation, this);
    this._formPanelBasic = new Srims.performance.PerformanceAllocationShowPanel_BasicForm(this._fundAllocation);
    //this._formPanelProjectInfor = new Srims.performance.PerformanceAllocationShowPanel_ProjectInforForm(this._fundAllocation.get('projectID'));


    this._formPanelFundAllocationStateHistory = new Srims.performance.PerformanceAllocationShowPanel_StateHistoryForm(this._fundAllocation);
    this._formPanelFundMember = new Srims.performance.PerformanceAllocationShowPanel_FundMemberForm(this._fundAllocation.get('projectID'));
    this._formVoucher = new Srims.performance.PerformanceAllocationShowPanel_VoucherForm(this._fundAllocation, false);
    //this._formPerfomanceStateHistory = new Srims.fund.PerformanceAllocationShowPanel_PerfomanceStateHistoryForm(this._fundAllocation);
    var items = [];


    items = [this._formPanelBasic, this._formVoucher, this._formPanelFundMember, this._formPanelFundAllocationStateHistory];

    Srims.performance.PerformanceAllocationShowPanel.superclass.constructor.call(this, {
        id: id,
        title: '绩效分配',
        tbar: this._toolBar,
        frame: true,
        iconCls: 'icon-fund-allocation-show',
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        items: items
    });

    this.refresh = function() {
        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceAllocationService + '/GetById',
            params: {
                performanceAllocationId: perfomanceAllocation.get('id')
            },
            scope: this,
            success: function(response) {
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.performance.PerformanceAllocationXmlReader()
                });
                var currentFundAllocation = store.getAt(0);
                this._fundAllocation = currentFundAllocation;
                currentFundAllocation.panel = this;

                this._formPanelBasic.resetComponnentsValue(currentFundAllocation);
                this._formPanelFundAllocationStateHistory._store.load();
                this._formPanelFundMember._store.load();
                this._formVoucher._store.load();
                this._formVoucher._tbar.resetComponentFundAllocation(currentFundAllocation);
                this._toolBar.resetButtonVisibleAndDisabled(currentFundAllocation);
                this._toolBar.resetButtonFundAllocation(currentFundAllocation);
            }
        });
    }
}

Ext.extend(Srims.performance.PerformanceAllocationShowPanel, Ext.Panel, {});
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel_BasicForm = function(fundAllocation) {

    this._fundAllocation = fundAllocation;

    this._textFieldProject = new Ext.form.TextField({
        fieldLabel: '项目名称',
        value: fundAllocation.get('projectName'),
        readOnly: true,
        width: 560
    });
    this._textFieldProjectPrincipal = new Ext.form.TextField({
        fieldLabel: '项目负责人',
        value: fundAllocation.get('projectPricinpalName'),
        readOnly: true,
        width: 160
    });
    this._textFieldProjectType = new Ext.form.TextField({
        fieldLabel: '项目类型',
        value: fundAllocation.get('projectTypeName'),
        readOnly: true,
        width: 160
    });

    this._textFieldAllocationOverheadPerformancePay = new Ext.form.TextField({
        fieldLabel: '绩效金额',
        value: Money.render(fundAllocation.get('arrivedPerformance')),
        readOnly: true,
        width: 160
    });

    this._textFieldAllocationAll = new Ext.form.TextField({
        fieldLabel: '到账总额',
        value: Money.render(fundAllocation.get('arrivedOverheadexpensesExpert')),
        readOnly: true,
        width: 160
    });


    this._textFieldAllocationExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接经费',
        value: Money.render(fundAllocation.get('arrivedOverheadexpensesExpert') - fundAllocation.get('arrivedPerformance')),
        readOnly: true,
        width: 160
    });



    this._textFieldAllocationPerformancePay = new Ext.form.TextField({
        fieldLabel: '已分配绩效',
        value: Money.render(fundAllocation.get('allocatedPerformance')),
        readOnly: true,
        width: 160
    });
    this._textFieldFundState = new Ext.form.TextField({
        fieldLabel: '绩效状态',
        value: Srims.performance.fundAllocationStateRender(fundAllocation.get('state')),
        readOnly: true,
        width: 160
    });
    this._textFieldFundCancelState = new Ext.form.TextField({
        fieldLabel: '是否已作废',
        value: fundAllocation.get('isCancel') ? '已作废' : '正常',
        readOnly: true,
        width: 160
    });
    this._textFieldOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: fundAllocation.get('operator'),
        readOnly: true,
        width: 160
    });
    this._textFieldOperateTime = new Ext.form.TextField({
        fieldLabel: '操作时间',
        value: Date.render(fundAllocation.get('dateTime')),
        readOnly: true,
        width: 160
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '审核备注',
        value: fundAllocation.get('remark'),
        readOnly: true,
        width: 560
    });

    var columnFirstItems = [this._textFieldProjectPrincipal, this._textFieldAllocationAll, this._textFieldAllocationOverheadPerformancePay, this._textFieldFundState, this._textFieldOperator];
    var columnSecondItems = [this._textFieldProjectType, this._textFieldAllocationExpert, this._textFieldAllocationPerformancePay, this._textFieldOperateTime, this._textFieldFundCancelState];

    Srims.performance.PerformanceAllocationShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '课题组间接费用分配基本信息',
        frame: true,
        labelWidth: 70,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        layout: 'form',
        items: [this._textFieldProject, new Ext.Panel({
            labelWidth: 70,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                items: columnFirstItems
            }), new Ext.Panel({
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldRemark]
    });
    this.resetComponnentsValue = function(fundAllocation) {
        this._textFieldAllocationPerformancePay.setValue(Money.render(fundAllocation.get('allocatedPerformance')));
        this._textFieldFundState.setValue(Srims.performance.fundAllocationStateRender(fundAllocation.get('state')));
        this._textFieldOperator.setValue(fundAllocation.get('operator'));
        this._textFieldOperateTime.setValue(Date.render(fundAllocation.get('dateTime')));
        this._textFieldRemark.setValue(fundAllocation.get('remark'));
        this._textFieldAllocationExpert.setValue(Money.render(fundAllocation.get('arrivedOverheadexpensesExpert') - fundAllocation.get('arrivedPerformance')));
        this._textFieldAllocationAll.setValue(Money.render(fundAllocation.get('arrivedOverheadexpensesExpert')));
        this._textFieldAllocationOverheadPerformancePay.setValue(Money.render(fundAllocation.get('arrivedPerformance')));
    }
}
Ext.extend(Srims.performance.PerformanceAllocationShowPanel_BasicForm, Ext.form.FormPanel, {});
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryprojectGridPanel_ShowColumnModel = function() {
    Srims.projects.RecoveryprojectGridPanel_ShowColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "学校间接费用差值",
        dataIndex: 'overheadExpensesInAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "二级单位间接费用差值",
        dataIndex: 'overheadExpensesMiddleAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "课题组间接费用及绩效差值",
        dataIndex: 'performancePayAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "校内调整间接费用",
        dataIndex: 'recoveryAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "凭单号",
        dataIndex: 'voucherNumber',
        width: 100,
        sortable: true,
        hidden: false
    }, {
        header: "打印状态",
        dataIndex: 'isPrint',
        width: 90,
        sortable: true,
        hidden: false
    }, {
        header: "打印日期",
        dataIndex: 'printDateTime',
        width: 120,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: '是否作废',
        dataIndex: 'isCanceled',
        width: 40,
        renderer: function(value) {
            return value == true ? '是' : '否';
        },
        sortable: true,
        hidden: false
    }, {
        header: "备注",
        dataIndex: 'remark',
        width: 100,
        sortable: true,
        hidden: false
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.projects.RecoveryprojectGridPanel_ShowColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.RecoveryProjectStore.superclass.constructor.call(this, new Srims.projects.RecoveryProjectXmlReader(), load_url, params);
    }
});
Srims.projects.RecoveryProjectSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.projects.RecoveryProjectSimpleStore.superclass.constructor.call(this, new Srims.projects.RecoveryProjectSimpleXmlReader(), load_url, params);
    }
});
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.projects.RecoveryProjectXmlReader.superclass.constructor.call(this, Srims.projects.Recovery);
    },
    readRecords: function(responseXML) {
        var result = Srims.projects.RecoveryProjectXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.PerformanceSum = parseInt(Ext.DomQuery.selectValue("PerformanceSum", responseXML), 10);
        result.records.OverheadExpensesSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesSum", responseXML), 10);
        result.records.OverheadExpensesMiddleSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesMiddleSum", responseXML), 10);
        return result;
    }
});
Srims.projects.RecoveryProjectSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.projects.RecoveryProjectXmlReader.superclass.constructor.call(this, Srims.projects.Recovery);
    }
});if (!Srims.projects)
    Ext.namespace('Srims.projects');
Srims.projects.Recovery = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'isCanceled',
    type: 'boolean',
    mapping: 'IsCanceled',
    convert: Boolean.toBoolean
}, { name: 'pid',
    type: 'int',
    mapping: 'PID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'principalNumber',
    type: 'string',
    mapping: 'PrincipalNumber'
}, {
    name: 'principalEmail',
    type: 'string',
    mapping: 'PrincipalEmail'
}, {
    name: 'isPrincipalSecondCollege',
    type: 'string',
    mapping: 'IsPrincipalSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'principalCollege',
    type: 'string',
    mapping: 'PrincipalCollege'
}, {
    name: 'principalId',
    type: 'string',
    mapping: 'PrincipalID'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'subjectName',
    type: 'string',
    mapping: 'SubjectName'
}, {
    name: 'firstLevelSubjectId',
    type: 'string',
    mapping: 'FirstLevelSubjectID'
}, {
    name: 'firstLevelSubjectName',
    type: 'string',
    mapping: 'FirstLevelSubjectName'
}, {
    name: 'secondLevelSubjectId',
    type: 'string',
    mapping: 'SecondLevelSubjectID'
}, {
    name: 'secondLevelSubjectName',
    type: 'string',
    mapping: 'SecondLevelSubjectName'
}, {
    name: 'researchType',
    type: 'string',
    mapping: 'ResearchType'
}, {
    name: 'cooperationType',
    type: 'string',
    mapping: 'CooperationType'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'isSecret',
    type: 'boolean',
    mapping: 'IsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'baseId',
    type: 'string',
    mapping: 'BaseID'
}, {
    name: 'baseName',
    type: 'string',
    mapping: 'BaseName'
}, {
    name: 'principalDelegate',
    type: 'string',
    mapping: 'PrincipalDelegate'
}, {
    name: 'principalDelegateId',
    type: 'string',
    mapping: 'PrincipalDelegateID'
}, {
    name: 'creator',
    type: 'string',
    mapping: 'Creator'
}, {
    name: 'createDate',
    type: 'date',
    mapping: 'CreateDate'
}, {
    name: 'corporationPlace',
    type: 'string',
    mapping: 'CorporationPlace'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'taskComingFrom',
    type: 'string',
    mapping: 'TaskComingFrom'
}, {
    name: 'isHorizontal',
    type: 'boolean',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'rankId',
    type: 'int',
    mapping: 'RankID'
}, {
    name: 'rankName',
    type: 'string',
    mapping: 'RankName'
}, {
    name: 'typeId',
    type: 'int',
    mapping: 'TypeID'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'typeShortName',
    type: 'string',
    mapping: 'TypeShortName'
}, {
    name: 'supportCategoryId',
    type: 'int',
    mapping: 'SupportCategoryID'
}, {
    name: 'supportCategoryName',
    type: 'string',
    mapping: 'SupportCategoryName'
}, {
    name: 'supportFieldId',
    type: 'int',
    mapping: 'SupportFieldID'
}, {
    name: 'supportFieldName',
    type: 'string',
    mapping: 'SupportFieldName'
}, {
    name: 'supportSubFieldId',
    type: 'int',
    mapping: 'SupportSubFieldID'
}, {
    name: 'supportSubFieldName',
    type: 'string',
    mapping: 'SupportSubFieldName'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'fundAlreadyHardware',
    type: 'int',
    mapping: 'FundAlreadyHardware'
}, {
    name: 'fundAlreadyIn',
    type: 'int',
    mapping: 'FundAlreadyIn'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'fundAlreadyTotal',
    type: 'int',
    mapping: 'FundAlreadyTotal'
}, {
    name: 'fundContract',
    type: 'int',
    mapping: 'FundContract'
}, {
    name: 'fundFrom',
    type: 'string',
    mapping: 'FundFrom'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}, {
    name: 'fundPlanHardware',
    type: 'int',
    mapping: 'FundPlanHardware'
}, {
    name: 'fundPlanIn',
    type: 'int',
    mapping: 'FundPlanIn'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'overheadExpenseInTotal',
    type: 'int',
    mapping: 'OverheadExpenseInTotal'
}, {
    name: 'overheadExpenseOutTotal',
    type: 'int',
    mapping: 'OverheadExpenseOutTotal'
}, {
    name: 'overheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyIn'//校内已收间接费用
}, {
    name: 'overheadExpensesAlreadyOut',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyOut'
}, {
    name: 'overheadExpensesInStandard',
    type: 'int',
    mapping: 'OverheadExpensesInStandard'
}, {
    name: 'performancePayStandard',
    type: 'int',
    mapping: 'PerformancePayStandard'
}, {
    name: 'fundManageProportion',
    type: 'int',
    mapping: 'FundManageProportion'	//国家规定管理费比例
}, {
    name: 'planedPerformancePay',
    type: 'int',
    mapping: 'PlanedPerformancePay'//总绩效工资
}, {
    name: 'receivedPerformancePay',
    type: 'int',
    mapping: 'ReceivedPerformancePay'//已分配绩效工资
}, {
    name: 'receivedOverheadExpensesIn',
    type: 'int',
    mapping: 'ReceivedOverheadExpensesIn'	//追缴单-已收管理费
}, {
    name: 'planedOverheadExpensesIn',
    type: 'int',
    mapping: 'PlanedOverheadExpensesIn'	//追缴单-应收管理费
}, {
    name: 'currentAllocationIn',
    type: 'int',
    mapping: 'CurrentAllocationIn'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'	//凭单号
}, {
    name: 'recoveryAmount',
    type: 'int',
    mapping: 'RecoveryAmount'	//追缴金额
}, {
    name: 'performancePayAmount',
    type: 'int',
    mapping: 'PerformancePayAmount'	//追缴绩效
}, {
    name: 'overheadExpensesInAmount',
    type: 'int',
    mapping: 'OverheadExpensesInAmount'	//追缴管理费
}, {
    name: 'overheadExpensesMiddleAmount',
    type: 'int',
    mapping: 'OverheadExpensesMiddleAmount'	//追缴二级单位间接费用
}, {
    name: 'printDateTime',
    type: 'date',
    mapping: 'PrintDateTime'	//追缴单-打印时间
}, {
    name: 'isPrint',
    type: 'string',
    mapping: 'IsPrint'	//追缴单-是否已打印
}, {
    name: 'isChangeByHand',
    type: 'string',
    mapping: 'IsChangeByHand'	//追缴单-是否已打印
}, {
    name: 'performanceAmount',
    type: 'int',
    mapping: 'PerformanceAmount'	//追缴单-绩效金额
}, {
    name: 'equipmentCost',
    type: 'int',
    mapping: 'EquipmentCost'
}, {
    name: 'borrowAmount',
    type: 'int',
    mapping: 'BorrowAmount'
}, {
    name: 'returnAmount',
    type: 'int',
    mapping: 'ReturnAmount'
}, {
    name: 'projectAccountNumber',
    type: 'string',
    mapping: 'ProjectAccountNumber'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_WithDraw',
    type: 'boolean',
    mapping: 'HasPermission_WithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'canWithDraw',
    type: 'boolean',
    mapping: 'CanWithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Terminate',
    type: 'boolean',
    mapping: 'HasPermission_Terminate',
    convert: Boolean.toBoolean
}, {
    name: 'canTerminate',
    type: 'boolean',
    mapping: 'CanTerminate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectMember',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMember',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectMember',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectMember',
    type: 'boolean',
    mapping: 'CanShow_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanEdit_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanShow_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectContract',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMainContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMainContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectContract',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectContract',
    type: 'boolean',
    mapping: 'CanShow_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectContract',
    type: 'boolean',
    mapping: 'CanCensor_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectDoucment',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectDoucment',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectDocument',
    type: 'boolean',
    mapping: 'CanEdit_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectDocument',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectDocument',
    type: 'boolean',
    mapping: 'CanShow_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectDocument',
    type: 'boolean',
    mapping: 'CanCensor_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canRequire_ProjectDocument',
    type: 'boolean',
    mapping: 'CanRequire_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitStart',
    type: 'boolean',
    mapping: 'CanSubmitStart',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitEnd',
    type: 'boolean',
    mapping: 'CanSubmitEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoStart',
    type: 'boolean',
    mapping: 'CanUndoStart',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoEnd',
    type: 'boolean',
    mapping: 'CanUndoEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorStart',
    type: 'boolean',
    mapping: 'CanCensorStart',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorEnd',
    type: 'boolean',
    mapping: 'CanCensorEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canSetDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanSetDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanClearDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearProjectAccountBookNumber',
    type: 'boolean',
    mapping: 'CanClearProjectAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'planedOverheadExpensesMiddle',
    type: 'int',
    mapping: 'PlanedOverheadExpensesMiddle'
}, {
    name: 'receivedOverheadExpensesMiddle',
    type: 'int',
    mapping: 'ReceivedOverheadExpensesMiddle'
}, {
    name: 'overheadExpensesMiddleAmount',
    type: 'int',
    mapping: 'OverheadExpensesMiddleAmount'
}



]);
Srims.data.Entity.apply(Srims.projects.Recovery);
//if (!Srims.projects) 
//    Ext.namespace('Srims.projects');

//Srims.projects.ProjectShowPanel_RecoveryForm = function(project){

//    this._project = project;
//    this._recoveryvoucherNumber = new Ext.form.Field({
//        fieldLabel: '追缴凭单号',
//        value: project.get('recoveryvoucherNumber'),
//        readOnly: true,
//        width: 140
//    });//
//    this._roverheadExpensesAmount = new Ext.form.Field({
//        fieldLabel: '应收间接费',
//        value: Money.render(project.get('roverheadExpensesAmount')),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryAmount = new Ext.form.Field({
//        fieldLabel: '追缴间接费',
//        value: Money.render(project.get('recoveryAmount')),
//        readOnly: true,
//        width: 140
//    }); //
//    this._fieldMark = new Ext.form.Field({
//        fieldLabel: '备注',
//        value: project.get('rremark'),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryPrintState = new Ext.form.Field({
//        fieldLabel: '打印状态',
//        value: project.get('recoveryPrintState'),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryPrintDate = new Ext.form.Field({
//        fieldLabel: '打印日期',
//        value: Date.render(project.get('recoveryPrintDate')),
//        readOnly: true,
//        width: 140
//    }); //

//    var items = [ new Ext.Panel({
//        widht: 600,
//        layout: 'column',
//        items: [new Ext.Panel({
//            width: 300,
//            layout: 'form',
//            style: 'width:300px',
//            items: [this._roverheadExpensesAmount, this._recoveryPrintState, this._recoveryvoucherNumber]
//        }), new Ext.Panel({
//            width: 300,
//            style: 'width:300px',
//            layout: 'form',
//            items: [this._recoveryAmount, this._recoveryPrintDate, this._fieldMark]
//        })]
//    })];
//    if (project.get('isHorizontal')) 
//        items.shift();
//    
//    Srims.projects.ProjectShowPanel_RecoveryForm.superclass.constructor.call(this, {
//        collapsible: true,
//        title: '项目追缴单信息',
//        autoHeight: true,
//        frame: true,
//        labelWidth: 80,
//        bodyStyle: 'padding:5px 5px 0',
//        style: 'margin-bottom: 2px',
//        defaultType: 'textfield',
//        titleCollapse: true,
//        items: items
//    });
//    //method
//    this.resetComponentValue = function(project){
//    this._roverheadExpensesAmount.setValue(project.get('roverheadExpensesAmount'));
//    this._recoveryAmount.setValue(project.get('recoveryAmount'));
//    this._recoveryPrintState.setValue(project.get('recoveryPrintState'));
//    this._recoveryPrintDate.setValue(project.get('recoveryPrintDate'));
//    this._recoveryvoucherNumber.setValue(project.get('recoveryvoucherNumber'));
//    this._fieldMark.setValue(project.get('rremark'));
//    }
//}
//Ext.extend(Srims.projects.ProjectShowPanel_RecoveryForm, Ext.form.FormPanel);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_RecoveryForm = function(project) {
this._project = project;
var params = {};
    params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.projects.ProjectService + '/GetRecoveryByPID';
    this._store = new Srims.projects.RecoveryProjectStore(load_url, params);
    this._columnModel = new Srims.projects.RecoveryprojectGridPanel_ShowColumnModel();

    this._gridPanelProjectMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoExpandColumn: 'taskName',
        autoExpand: true,
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有追缴单记录'
        }
    });

    Srims.projects.ProjectShowPanel_RecoveryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目间接费用调整信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectMember]
    });
    if (project.get('id'))
        this._store.load();

    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_RecoveryForm, Ext.FormPanel, {});
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel_StateHistoryForm = function(performance) {

    var load_url = Srims.service.performance.PerformanceAllocationStateHistoryService + '/GetByPerformanceAllocation';
    this._store = new Srims.performance.PerformanceAllocationStateHistoryStore(load_url, {
        performanceID: performance.get('id')
    });
    this._columnModel = new Srims.performance.PerformanceAllocationStateHistoryGridPanel_ColumnModel();

    this._gridPanelFundAllocationStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'accountBookNumber',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有状态历史信息'
        }
    });

    Srims.performance.PerformanceAllocationShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '绩效分配状态历史信息',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundAllocationStateHistory]
    });

    this._store.load();
}
Ext.extend(Srims.performance.PerformanceAllocationShowPanel_StateHistoryForm, Ext.form.FormPanel, {});


if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationShowPanel_ToolBar = function(fundAllocation, panel) {

    this._fundAllocation = fundAllocation;

    this._buttonPerformanceAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '填写/修改绩效分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            var fundAllocation = this.fundAllocation;
            fundAllocation.panel = panel;
            Srims.performance.showFundAllocationPerformanceWindow(fundAllocation);
        },
        hidden: true,
        tooltip: '<b>填写绩效分配。</b>'
    });


    this._buttonAllocationPerformance = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '绩效分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.performance.newPerformanceVoucher(this.fundAllocation, "绩效");
        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b><br/>对所选经费下拨进行分配<br/>已分配绩效：' + Money.render(fundAllocation.get('allocatedPerformance')) + '，未分配绩效：' + Money.render(fundAllocation.get('arrivedPerformance') - fundAllocation.get('allocatedPerformance')) + '，绩效总额：' + Money.render(fundAllocation.get('arrivedPerformance'))
    });
    this._buttonSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-submit',
        text: '提交',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('提交经费分配', '你确定要提交这次经费分配吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.submitPerformanceAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交经费分配</b><br/>提交本次经费分配'
    });
    this._buttonUndoSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-submit',
        text: '撤销提交',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('撤销经费分配', '你确定要撤销这次经费分配吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.undoSubmitFundAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销提交经费分配</b><br/>撤销提交本次经费分配'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        panel: panel,
        handler: function() {
            var islegal = true;
            var vouchers = this.panel._formVoucher._gridPanelVoucher.store.getRange();
            for (var i = 0; i < vouchers.length; i++) {
                if (String.isEmpty(vouchers[i].get('accountBookNumber')) ||
				String.Trim(vouchers[i].get('accountBookNumber')) == '新建') {
                    islegal = false;
                    break;
                }
            }

            if (!islegal) {
                Ext.Msg.show({
                    title: '凭单审核通过错误',
                    msg: '分配生成的凭单中有凭单号为空或新建，请输入正确的账本号后，再审核通过',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return;
            }
            //判断绩效经费成员是不是在项目成员中
            Ext.Ajax.request({
                url: Srims.service.performance.PerformanceAllocationService + '/CheckExpertByPerformanceAllocation',
                params: {
                    PerformanceAllocationId: fundAllocation.get('id')
                },
                scope: this,
                success: function(response) {
                    if (response.responseText != 'blank')
                        Ext.MessageBox.show({
                            title: '经费成员不在项目成员中',
                            msg: response.responseText,
                            buttons: Ext.MessageBox.YESNO,
                            scope: this,
                            fn: function(button) {
                                if (button == 'yes')
                                    Srims.performance.showFundAllocationCensorWindow(this.fundAllocation, true);
                            },
                            icon: Ext.MessageBox.QUESTION
                        });
                    else {
                        Srims.performance.showFundAllocationCensorWindow(this.fundAllocation, true);
                    }
                }
            });
            //Srims.performance.showFundAllocationCensorWindow(this.fundAllocation, true);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过本次经费分配'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        handler: function() {
            Srims.performance.showFundAllocationCensorWindow(this.fundAllocation, false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回本次经费分配'
    });
    this._buttonCancel = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel',
        text: '作废',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        handler: function() {

            Ext.MessageBox.confirm('作废经费分配', '你确定要作废这次经费分配吗？此操作不可撤销', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.cancelFundAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>作废</b><br/>作废本次经费分配'
    });
    this._buttonAllocationCorrect = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配纠正',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('纠正经费分配', '纠正经费分配前，请先确认经费分配时间是否正确。', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.CorrectAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>纠正经费分配</b><br/>对经费分配进行纠正'
    });
    this._buttonAllocationDateTimeCorrect = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation-datetime-correct',
        text: '分配日期纠正',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.performance.CorrectAllocationDateTime(this.fundAllocation)
        },
        hidden: true,
        tooltip: '<b>纠正经费分配日期</b><br/>对经费分配的日期进行纠正'
    });

    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            panel.refresh();
        },
        tooltip: '<b>刷新经费分配信息</b><br/>刷新经费分配信息'
    });

    items = [this._buttonPerformanceAllocation, this._buttonAllocationPerformance, this._buttonSubmit, this._buttonUndoSubmit, this._buttonCensorPass, this._buttonCensorReject, this._buttonCancel, this._buttonAllocationDateTimeCorrect, this._buttonAllocationCorrect, new Ext.Toolbar.TextItem('&nbsp;  &nbsp; &nbsp; &nbsp;   <font color="FF0000">  提醒： 绩效经费具体分配事宜请联系财务处。</font>'), new Ext.Toolbar.Fill(), this._buttonRefresh];

    Srims.performance.PerformanceAllocationShowPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    this._buttonAllocationDateTimeCorrect.setVisible(fundAllocation.get('canCorrect'));
    this._buttonAllocationDateTimeCorrect.setDisabled(!fundAllocation.get('canCorrect'));
    this._buttonPerformanceAllocation.setVisible(fundAllocation.get('canChangePerformanceAmount'));
    this._buttonAllocationCorrect.setVisible(fundAllocation.get('canCorrect'));
    this._buttonAllocationCorrect.setDisabled(!fundAllocation.get('canCorrect'));

    this.resetButtonVisibleAndDisabled = function(fundAllocation) {

        this._fundAllocation = fundAllocation;

        if (fundAllocation.get('canAllocation') || fundAllocation.get('canSubmit')) {

            this._buttonAllocationPerformance.setVisible(fundAllocation.get('hasPermission_Allocation') && !fundAllocation.get('isCancel'));
            this._buttonAllocationPerformance.setDisabled(!fundAllocation.get('canAllocation'));
            this._buttonSubmit.setVisible(fundAllocation.get('hasPermission_Submit'));
            this._buttonSubmit.setDisabled(!fundAllocation.get('canSubmit'));
        } else {
            this._buttonSubmit.setVisible(false);
        }
        this._buttonPerformanceAllocation.setVisible(fundAllocation.get('canChangePerformanceAmount'));
        this._buttonUndoSubmit.setVisible(fundAllocation.get('canUndoSubmit'));
        this._buttonUndoSubmit.setDisabled(!fundAllocation.get('canUndoSubmit'));

        this._buttonCensorPass.setVisible(fundAllocation.get('canCensorPass'));
        this._buttonCensorPass.setDisabled(!fundAllocation.get('canCensorPass'));

        this._buttonCensorReject.setVisible(fundAllocation.get('canCensorReject'));
        this._buttonCensorReject.setDisabled(!fundAllocation.get('canCensorReject'));

        this._buttonCancel.setVisible(fundAllocation.get('canCancel'));
        this._buttonCancel.setDisabled(!fundAllocation.get('canCancel'));

        this._buttonAllocationDateTimeCorrect.setVisible(fundAllocation.get('canCorrect'));
        this._buttonAllocationDateTimeCorrect.setDisabled(!fundAllocation.get('canCorrect'));

        this._buttonAllocationCorrect.setVisible(fundAllocation.get('canCorrect'));
        this._buttonAllocationCorrect.setDisabled(!fundAllocation.get('canCorrect'));
    }
    this.resetButtonFundAllocation = function(fundAllocation) {
        this._buttonSubmit.fundAllocation = fundAllocation;
        this._buttonUndoSubmit.fundAllocation = fundAllocation;
        this._buttonCensorPass.fundAllocation = fundAllocation;
        this._buttonCensorReject.fundAllocation = fundAllocation;
        this._buttonCancel.fundAllocation = fundAllocation;
        this._buttonAllocationCorrect.fundAllocation = fundAllocation;
        this._buttonAllocationDateTimeCorrect.fundAllocation = fundAllocation;
        this._buttonAllocationPerformance.fundAllocation = fundAllocation;
    }
    this.resetButtonVisibleAndDisabled(fundAllocation);
}
Ext.extend(Srims.performance.PerformanceAllocationShowPanel_ToolBar, Ext.Toolbar);if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationShowPanel_VoucherForm = function(perfomance, isExpertGuid) {

    var load_url = Srims.service.performance.PerformanceVoucherService + '/GetByPerformanceAllocation';
    this._store = new Srims.performance.PerformanceVoucherStore(load_url, {
        performanceId: perfomance.get('id')
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Ext.grid.ColumnModel([{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "凭单号",
        dataIndex: 'voucherNumber',
        hidden: isExpertGuid
    }, {
        header: "经费成员",
        dataIndex: 'expertName'
    }, {
        header: "绩效金额(万元)",
        dataIndex: 'performancePay',
        renderer: Money.render
    }, {
        header: "课题组间接费用金额(万元)",
        dataIndex: 'overheadExpensesExpertRest',
        renderer: Money.render
    }, {
        header: "账本号",
        dataIndex: 'accountBookNumber'
    }, {
        id: 'voucherState',
        header: "状态",
        dataIndex: 'voucherState',
        hidden: isExpertGuid,
        renderer: Srims.performance.VoucherStateRender
}]);
        this._tbar = new Srims.performance.PerformanceVoucherGridPanel_ToolBar(this._selections, this._store, undefined, undefined, false, true, perfomance, isExpertGuid, false);

        this._gridPanelVoucher = new Ext.grid.GridPanel({
            store: this._store,
            colModel: this._columnModel,
            enableColumnHide: false,
            enableColumnMove: true,
            enableHdMenu: false,
            border: false,
            tbar: this._tbar,
            sm: this._selections,
            width: 700,
            autoExpand: true,
            autoExpandColumn: 'voucherState',
            style: isExpertGuid == true ? 'padding:10px' : '',
            stripeRows: true,
            loadMask: true,
            autoHeight: true,
            stateful: false,
            viewConfig: {
                autoFill: true,
                scrollOffset: 0,
                forceFit: true,
                emptyText: '没有凭单信息'
            }
        });

        Srims.performance.PerformanceAllocationShowPanel_VoucherForm.superclass.constructor.call(this, {
            collapsible: true,
            title: '绩效分配凭单信息',
            frame: true,
            labelWidth: 100,
            layout: 'form',
            bodyStyle: 'padding:0 5px 0',
            style: 'margin-bottom: 2px',
            defaultType: 'textfield',
            titleCollapse: true,
            items: [this._gridPanelVoucher]
        });

        this._store.load();
        //仅专家向导使用
        this._gridPanelVoucher.form = this;
        this._gridPanelVoucher.refresh = function() {

            Ext.Ajax.request({
                url: Srims.service.fund.perfomanceService + '/GetById',
                params: {
                    perfomanceId: this.perfomance.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.fund.perfomanceXmlReader()
                    });
                    var currentperfomance = store.getAt(0);
                    this._perfomance = currentperfomance;
                    currentperfomance.panel = this;

                    this.getStore().load();
                    this.form._tbar.resetComponentperfomance(currentperfomance);
                    if (currentperfomance.get('canAllocation')) {
                        this.button.panel.next();
                        this.button.setText('分配');
                    } else if (currentperfomance.get('canSubmit'))
                        this.button.setText('提交');
                    else
                        this.button.setText('撤销提交');
                }
            });
        }
        function onCellDblClick(grid, rowIndex, columnIndex, e) {
            var voucher = grid.getStore().getAt(rowIndex);
            if (!voucher.get('canEdit'))
                return;

            Srims.fund.editVoucher(perfomance, voucher);
        };

        this._gridPanelVoucher.on('celldblclick', onCellDblClick);
    }
    Ext.extend(Srims.performance.PerformanceAllocationShowPanel_VoucherForm, Ext.form.FormPanel, {});
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


if (!Srims.performance)
    Ext.namespace('Srims.performance');

Ext.namespace('Srims.performance.performanceAllocationState');

Srims.performance.performanceAllocationState.UnSubmit = 'UnSubmit';
Srims.performance.performanceAllocationState.WaitingCensor = 'WaitingCensor';
Srims.performance.performanceAllocationState.Reject = 'Reject';
Srims.performance.performanceAllocationState.Passed = 'Passed';
Srims.performance.performanceAllocationState.Canceled = 'Canceled';

Srims.performance.fundAllocationStateRender = function(value) {
    switch (value) {
        case 'UnSubmit':
            return '未提交/待分配';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '未知';
    }
}
Srims.performance.fundAllocationStateFilterItems = [{
    id: 'UnSubmit',
    text: '未提交'
}, {
    id: 'WaitingCensor',
    text: '等待审核'
}, {
    id: 'Reject',
    text: '审核驳回'
}, {
    id: 'Passed',
    text: '审核通过'
}, {
    id: 'Canceled',
    text: '作废'
}];

Srims.performance.fundAllocationStore = [['UnSubmit', '未提交'], ['WaitingCensor', '等待审核'], ['Reject', '审核驳回'], ['Passed', '审核通过'], ['Canceled', '作废']];

if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceAllocationStateHistory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.performance.PerformanceAllocationStateHistory);


if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStateHistoryGridPanel_ColumnModel = function() {
    Srims.performance.PerformanceAllocationStateHistoryGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.performance.fundAllocationStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        id: 'remark',
        header: "备注",
        dataIndex: 'remark'
}])
    }
    Ext.extend(Srims.performance.PerformanceAllocationStateHistoryGridPanel_ColumnModel, Ext.grid.ColumnModel);


if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceAllocationStateHistoryStore.superclass.constructor.call(this, new Srims.performance.PerformanceAllocationStateHistoryXmlReader(), load_url, params);
    }
});



if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceAllocationStateHistoryXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceAllocationStateHistory);
    }
});


if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceAllocationStore.superclass.constructor.call(this, new Srims.performance.PerformanceAllocationXmlReader(), load_url, params);
    }
});



if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceAllocationXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceAllocation);
    },
    readRecords: function(responseXML) {
        var result = Srims.performance.PerformanceAllocationXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.overheadExpensesExpertSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesExpertSum", responseXML), 10);
        return result;
    }
});

/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.Performance = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'fundAllocationIn',
    type: 'int',
    mapping: 'FundAllocationIn'
}, {
    name: 'fundAllocationOverheadExpensesIn',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesIn'
}, {
    name: 'fundAllocationOverheadExpensesMiddle',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesMiddle'
}, {
    name: 'allocatedOverheadExpensesExpert',
    type: 'int',
    mapping: 'AllocatedOverheadExpensesExpert'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'isCancel',
    type: 'boolean',
    mapping: 'IsCancel',
    convert: Boolean.toBoolean
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'projectNumber',
    type: 'string',
    mapping: 'ProjectNumber'
}, {
    name: 'arrivedPerformance',
    type: 'int',
    mapping: 'ArrivedPerformance'
}, {
    name: 'descendPerformance',
    type: 'int',
    mapping: 'DescendPerformance'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'hasPermission_Censor',
    type: 'boolean',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Allocation',
    type: 'boolean',
    mapping: 'HasPermission_Allocation',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'boolean',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowAlloction',
    type: 'boolean',
    mapping: 'HasPermission_ShowAlloction',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'boolean',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocation',
    type: 'boolean',
    mapping: 'CanAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'isAllocated',
    type: 'boolean',
    mapping: 'IsAllocated',
    convert: Boolean.toBoolean
}, {
    name: 'foundationTime',
    type: 'date',
    mapping: 'FoundationTime'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}]);
    Srims.data.Entity.apply(Srims.performance.Performance);
/**
* @author dulintao//gychange 2013.5.14
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.listPerformance = function() {
    Srims.performance.Performancelist('listPerformance', '课题组间接费用及绩效到账(暂存)', 'icon-fund-waiting-allocation-vertical-project');
}

Srims.performance.Performancelist = function(panelId, title, iconcls) {
    var performanceStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (!panel) {
        performanceStore = new Srims.performance.PerformanceStore(Srims.service.performance.PerformanceService + '/Query', queryParams);
        panel = new Srims.performance.PerformanceGridPanel(panelId, performanceStore, title, iconcls, queryParams);
        //panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
    if (panel)
        performanceStore = panel.getStore();
}


// 查看绩效
Srims.performance.ShowPerformance = function(performance, store) {
    var panelId = 'PerformationShowPanel' + performance.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        panel = new Srims.performance.PerformanceAllocationShowPanel(panelId, performance);
        Srims.WorkSpace.addPanel(panel);
    }
    if (panel) {
        Srims.WorkSpace.active(panel);
    }

    //    Srims.performance.PerformanceAllocationShowPanel
    //    Ext.Ajax.request({
    //        url: Srims.service.projects.ProjectService + '/GetById',
    //        params: {
    //            projectId: performance.get('projectID')
    //        },
    //        success: function(response) {
    //            var store = new Ext.data.Store({
    //                data: response.responseXML,
    //                reader: new Srims.projects.ProjectXmlReader()
    //            });
    //            var project = store.getAt(0);
    //            Srims.projects.showProject(project);
    //        }
    //    });
}
//查询绩效
Srims.performance.showPerformanceQueryWindow = function(id, store, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.performance.PerformanceQueryWindow(id, store, queryParams);

    // gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
//显示绩效下拨窗口
Srims.performance.showPerformanceDescendManageWindow = function(performance, store) {
    var id = 'PerformanceDescendManageWindow' + performance.get('id');
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.performance.PerformanceDescendManageWindow(id, performance, store);
    window.show();
}
//显示绩效下拨子窗口
Srims.performance.newPerformanceDescend = function(performance, store, manageWindow) {
    var Id = "NewPerformanceDescend" + performance.get('id');
    var window = Ext.getCmp(id);
    if (!window) {
        var performanceAllocation = new Srims.performance.PerformanceAllocation({});
        var window = new Srims.performance.PerformanceDescendWindow(Id, performance, performanceAllocation, store, manageWindow);
    }
    window.show();
}

Srims.performance.PerformanceCallBack = function(manageWindow, response, store, window, isStartPoll) {

    if (manageWindow) {
        var performanceStore = new Ext.data.Store({
            data: response.responseXML,
            reader: new Srims.performance.PerformanceSimpleXmlReader()
        });
        var currentperformance = performanceStore.getAt(0);
        manageWindow._performanceDescendManageWindow_PerformanceInfoPanel.resetComponentValues(currentperformance);
        // manageWindow.resetButtonVisibleAndDisabled(currentFinace);
    }

    if (store)
        store.load();

    if (window)
        window.close();

    if (isStartPoll) {
        Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingAllocationProjectPerformance);
    }
}/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceGridPanel = function(id, performanceStore, title,
		iconCls, queryParams) {
    // fields
    this._performanceStore = performanceStore;
    this._performanceStore.grid = this;

    // public method
    this.GetPerformanceStore = function() {
        return this._performanceStore;
    };


    // controls
    //this._selections = new Ext.grid.RowSelectionModel();
    this._selections = new Ext.grid.CheckboxSelectionModel({ handleMouseDown: function(g, rowIndex, e) {
        if (e.button !== 0 || this.isLocked()) {
            return;
        }
        var view = this.grid.getView();
        if (e.shiftKey && !this.singleSelect && this.last !== false) { // shift事件
            var last = this.last;
            this.selectRange(last, rowIndex, e.ctrlKey);
            this.last = last; // reset the last     
            view.focusRow(rowIndex);
        } else {
            var isSelected = this.isSelected(rowIndex);
            if (isSelected) {
                this.deselectRow(rowIndex);
            } else if (!isSelected || this.getCount() > 1) {
                this.selectRow(rowIndex, true);
                view.focusRow(rowIndex);
            }
        }
    }
    });

    this._columnModel = new Srims.performance.PerformancePanel_ColumnModel(this._selections); // 位于文件outsourcingPanel_ColumnModel.js
    this._filters = new Srims.performance.PerformanceGridPanel_GridFilters(); // 位于文件outsourcingGridPanel_GridFilters.js
    this._toolbar = new Srims.performance.PerformanceGridPanel_ToolBar(
			this._performanceStore, this._selections, queryParams, id); // 位于文件outsourcingGridPanel_ToolBar.js

    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的校绩单位'
    });
    //carlsirce2013.4.1 加入绩效统计内容
    this._textItemFundSum = new Ext.Toolbar.TextItem('');
    // constructor
    Srims.performance.PerformanceGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._performanceStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._performanceStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录',
            items: [this._textItemFundSum]
        })
    });
    this._performanceStore.load();
    // event
    this.on('celldblclick', onCellDblClick);
    this._performanceStore.on('load', function(store, records) {
        if (records.performancePaySum == undefined || records.arrivedPerformanceSum == null || records.allocatedPerformanceSum == null || records.descendPerformancSum == null)
            records.performancePaySum = records.arrivedPerformanceSum = records.allocatedPerformanceSum = records.descendPerformancSum = 0;

        var fundSumMessage = String.format(" <font size='8'>学校间接费用：<strong>{0}</strong>，二级单位间接费用：<strong>{1}</strong>，课题组间接费用及绩效：<strong>{2}</strong>，已下拨：<strong>{3}</strong></font>", Money.render(records.overheadExpensesInSum), Money.render(records.overheadExpensesMiddleSum), Money.render(records.receivedPerformance), Money.render(records.descendPerformance));
        Ext.get(store.grid._textItemFundSum.id).update(fundSumMessage);
    });
    // private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var performance = grid.getStore().getAt(rowIndex);
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/GetById',
            params: {
                projectId: performance.get('projectID')
            },
            success: function(response) {
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.projects.ProjectXmlReader()
                });
                var project = store.getAt(0);
                Srims.projects.showProject(project);
                //Srims.Load.loadProjectModule('Srims.projects.showProject(project);');
            }
        });

    }
}
Ext.extend(Srims.performance.PerformanceGridPanel, Ext.grid.GridPanel);/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformancePanel_ColumnModel = function(selectModel) {
    Srims.performance.PerformancePanel_ColumnModel.superclass.constructor.call(this, [selectModel, {
        header: 'id',
        hidden: true,
        dataIndex: 'id',
    }, {
        header: '项目编号',
        dataIndex: 'projectNumber',
        width: 20,
        sortable: false,
        hidden: false
    }, {
        header: '项目名称',
        dataIndex: 'projectName',
        width: 20,
        sortable: false,
        hidden: false
    }, {
        header: '项目类型',
        dataIndex: 'typeName',
        width: 20,
        sortable: true,
        hidden: false
    }, {
        header: '负责人',
        dataIndex: 'expertName',
        width: 20,
        sortable: true,
        hidden: false
    },  {
        header: '本次分配校内经费',
        dataIndex: 'fundAllocationIn',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    },  {
        header: '本次分配学校间接费',
        dataIndex: 'fundAllocationOverheadExpensesIn',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    },  {
        header: '本次分配二级单位间接费',
        dataIndex: 'fundAllocationOverheadExpensesMiddle',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    }, {
        header: '本次课题组间接费和绩效',
        dataIndex: 'arrivedPerformance',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    }, {
        header: '已下拨课题组间接费和绩效',
        dataIndex: 'descendPerformance',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    },  {
        header: '已下拨课题组间接费',
        dataIndex: 'allocatedOverheadExpensesExpert',
        width: 40,
        renderer: Money.render,
        sortable: false,
        hidden: false
    },{
        header: '已分绩效',
        dataIndex: 'allocatedPerformance',
        width: 40,
        renderer: Money.render,
        sortable: false,
        hidden: false
    }, {
        header: '是否作废',
        dataIndex: 'isCancel',
        width: 40,
        renderer: function(value) {
            return value == true ? '是' : '否';
        },
        sortable: true,
        hidden: false
    }, {
        header: '是否下拨完成',
        dataIndex: 'isAllocated',
        width: 40,
        renderer: function(value) {
            return value == true ? '是' : '否';
        },
        sortable: true,
        hidden: false
    }, {
        header: "产生日期",
        dataIndex: 'foundationTime',
        width: 80,
        sortable: true,
        hidden: true,
        renderer: Date.render

    }, {
        header: "经费来源",
        dataIndex: 'fundFromUnit',
        width: 80,
        sortable: true,
        hidden: true

    }, {
        header: "来款单位",
        dataIndex: 'fundFromUnitAddress',
        width: 80,
        sortable: true,
        hidden: true
    }
]);
}
Ext.extend(Srims.performance.PerformancePanel_ColumnModel, Ext.grid.ColumnModel);/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceGridPanel_GridFilters = function() {
    Srims.performance.PerformanceGridPanel_GridFilters.superclass.constructor.call(this, {
			    filters: [{
			        type: 'string',
			        dataIndex: 'projectName'
			    }, {
			        type: 'string',
			        dataIndex: 'typeName'
			    }, {
			        type: 'string',
			        dataIndex: 'expertName'
			    }]
    });
}
Ext.extend(Srims.performance.PerformanceGridPanel_GridFilters, Ext.grid.GridFilters);/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceGridPanel_ToolBar = function(store, selection,
		queryParams, panelID) {
    this._store = store;
    this._panelID = panelID;
    this._selection = selection;
    var user = Srims.currentLoginLog.user;

    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.performance.showPerformanceQueryWindow('Performance_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));

        },
        tooltip: '<b>查询绩效单位</b><br/>填写相应效绩单位信息建立新的绩效单位'
    });

    this._buttonDescendPerformance = new Ext.Toolbar.Button({
        iconCls: 'icon-performance',
        text: '课题组间接费用和绩效下拨/查看',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0 || this.selection.getSelected().get('arrivedPerformance') <= 0)
                return;
            Srims.performance.showPerformanceDescendManageWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>下拨绩效</b><br/>下拨后生成绩效分配条目'
    });

    this._buttonDescendSelectedPerformance = new Ext.Toolbar.Button({
        iconCls: 'icon-performance',
        text: '课题组间接费和绩效批量下拨',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.MessageBox.confirm('课题组间接费和绩效批量下拨', '你确定要下拨所选课题组间接费和绩效吗？该操作会把所选条目剩余可下拨金额一次性完全下拨！', function(button) {
                if (button == 'yes') {
                    var param = '';
                    for (var i = 0; i < selection.selections.length; i++) {
                        param += selection.selections.items[i].get('id');
                        param += ',';
                    }
                    Ext.Ajax.request({
                        url: Srims.service.performance.PerformanceService + '/CheckPositive',
                        params: {
                            performanceIds: param
                        },
                        success: function(response) {
                            if (response.responseText == 'true')
                                Ext.MessageBox.confirm('注意', '所选条目对应的项目存在对课题组间接费用的追缴，请注意下拨金额，继续批量下拨吗？', function(button) {
                                    if (button != 'yes')
                                        return;
                                    Ext.Ajax.request({
                                        url: Srims.service.performance.PerformanceService + '/DescendSelectedPerformance',
                                        params: {
                                            performanceIds: param
                                        },
                                        success: function(response) {
                                            Ext.MessageBox.alert('提示', '已成功下拨' + response.responseText + '条记录！');
                                            store.load();
                                        }
                                    });
                                }, this);
                                else {
                                    Ext.Ajax.request({
                                        url: Srims.service.performance.PerformanceService + '/DescendSelectedPerformance',
                                        params: {
                                            performanceIds: param
                                        },
                                        success: function(response) {
                                            Ext.MessageBox.alert('提示', '已成功下拨' + response.responseText + '条记录！');
                                            store.load();
                                        }
                                    });
                            }

                        }
                    });

                }
            }, this);

        },
        hidden: true,
        tooltip: '<b>分配绩效工资</b><br/>对所选经费下拨进行分配'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新绩效单位列表'
    });

    Srims.performance.PerformanceGridPanel_ToolBar.superclass.constructor.call(this,
			{
			    items: [this._buttonQuery, this._buttonDescendPerformance, this._buttonDescendSelectedPerformance, new Ext.Toolbar.Fill(), this._buttonRefresh]
			});
    // initial
    this._selection.buttonQuery = this._buttonQuery;
    this._selection.buttonDescend = this._buttonDescendPerformance;
    this._selection.buttonDescendSelectedPerformance = this._buttonDescendSelectedPerformance;
    // event methods
    this._onSelection_selectionChange = function(selection) {
        var buttonQuery = selection.buttonQuery;
        var buttonDescend = selection.buttonDescend;
        var buttonDescendSelectedPerformance = selection.buttonDescendSelectedPerformance;
        if (selection.getCount() == 0 || selection.getSelected().get('arrivedPerformance') <= 0) {
            buttonDescend.hide();
            buttonDescendSelectedPerformance.hide();
            return;
        }
        buttonDescend.setVisible(user.userRoleType != 'Expert');
        buttonDescendSelectedPerformance.setVisible(user.userRoleType != 'Expert');
    }
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.performance.PerformanceGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceQueryWindow = function(id, store, queryParams) {

    this._id = id;
    this._store = store;
    this._params = queryParams;

    this._basicPanel = new Srims.performance.PerformanceQueryWindow_InforPanel();

    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function() {
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function() {
            var window = this.window;
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    Srims.performance.PerformanceQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '查询',
        iconCls: 'icon-voucher-query',
        width: 700,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [new Ext.Panel({
            width: 700,
            layout: 'form',
            labelWidth: 120,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });

    this.getParams = function() {
        var params = this._params;
        this._basicPanel.buildParams(params);
        return params;
    }
    this.clearParams = function() {
        this._basicPanel.clearParams();
    }

    this.query = function(button) {
        var window = button.window;
        window.getParams();

        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.performance.PerformanceQueryWindow, Ext.Window);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceQueryWindow_InforPanel = function() {

    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '负责人',
        width: 166
    });
    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目名称',
        width: 166
    });
    this._comboBoxProjectType = new Ext.form.TextField({
        fieldLabel: '项目类型',
        width: 150
    });
    this._comboBoxProjectNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        width: 150
    });
    this._checkBoxIsCanceled = new Ext.form.Checkbox({
        fieldLabel: '已作废'
    });
    this._checkBoxIsCanceled2 = new Ext.form.Checkbox({
        fieldLabel: '未作废'
    });
    this._checkBoxIsAllocated = new Ext.form.Checkbox({
        fieldLabel: '已完全下拨'
    });
    this._checkBoxIsAllocated2 = new Ext.form.Checkbox({
        fieldLabel: '未完全下拨'
    });
    this._startDateBegin = new Ext.form.DateField({
        fieldLabel: '项目开始时间',
        width: 180
    });
    this._startDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 180
    });
    this._allocationDateBegin = new Ext.form.DateField({
        fieldLabel: '审核通过时间',
        width: 180
    });
    this._allocationDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 180
    });
    this._adjustDateBegin = new Ext.form.DateField({
        fieldLabel: '间接费调整时间',
        width: 180
    });
    this._adjustDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 180
    });


    //   var columnFirstItems = [this._comboBoxProject]//, this._textFieldAccountBookNumber, this._dateFieldFinanceAllocationDateBegin];
    // var columnSecondItems = [this._comboBoxProjectNumber]//, this._numberFieldFinanceNumber, this._dateFieldFinanceAllocationDateEnd];
    var columnThirdItems = [this._comboBoxProject, this._comboBoxProjectNumber, this._checkBoxIsAllocated, this._checkBoxIsCanceled, this._startDateBegin, this._allocationDateBegin, this._adjustDateBegin]

    var columnFourthItems = [this._comboBoxProjectType, this._comboBoxExpert, this._checkBoxIsAllocated2, this._checkBoxIsCanceled2, this._startDateEnd, this._allocationDateEnd, this._adjustDateEnd]
    Srims.performance.PerformanceQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'column',
        width: 800,
        labelWidth: 100,
        items: [new Ext.Panel({
            width: 300,
            layout: 'form',
            labelWidth: 100,
            items: columnThirdItems
        }), new Ext.Panel({
            width: 300,
            labelWidth: 100,
            layout: 'form',
            items: columnFourthItems

        })]
    });

    this.buildParams = function(params) {
        params.isAllocated = this._checkBoxIsAllocated.getValue();
        params.isCanceled = this._checkBoxIsCanceled.getValue();
        params.isAllocated2 = this._checkBoxIsAllocated2.getValue();
        params.isCanceled2 = this._checkBoxIsCanceled2.getValue();
        params.expertName = this._comboBoxExpert.getText();
        params.projectName = this._comboBoxProject.getText();

        params.startDateStart = Date.format(this._startDateBegin.getValue());
        params.startDateEnd = Date.format(this._startDateEnd.getValue());

        params.allocationDateStart = Date.format(this._allocationDateBegin.getValue());
        params.allocationDateEnd = Date.format(this._allocationDateEnd.getValue());

        params.adjustDateStart = Date.format(this._adjustDateBegin.getValue());
        params.adjustDateEnd = Date.format(this._adjustDateEnd.getValue());
        params.typeName = this._comboBoxProjectType.getValue();
        params.projectNumber = this._comboBoxProjectNumber.getValue();

    }

    this.clearParams = function() {
        this._checkBoxIsCanceled.reset();
        this._checkBoxIsAllocated.reset();
        this._checkBoxIsCanceled2.reset();
        this._checkBoxIsAllocated2.reset();
        this._comboBoxExpert.reset();
        this._comboBoxProject.reset();
        this._comboBoxProjectNumber.reset();
        this._startDateBegin.reset();
        this._startDateEnd.reset();
        this._allocationDateBegin.reset();
        this._allocationDateEnd.reset();
        this._adjustDateBegin.reset();
        this._adjustDateEnd.reset();
        this._comboBoxProjectType.reset();
    }
}
Ext.extend(Srims.performance.PerformanceQueryWindow_InforPanel, Ext.FormPanel);

if (!Srims.performance)
    Ext.namespace('Srims.performance');
    
Srims.performance.PerformanceShowPanel=function(performanceStore,panelID,performance){
	this._performance=performance;
	this._id=panelID;
	this._performanceStore=performanceStore;

	this._formPanelBasic = new Srims.performance.PerformanceShowPanel_BasicForm(performance);
	//constructor
	Srims.performance.PerformanceShowPanel.superclass.constructor.call(this,{
				id : this._id,
				style : 'padding:5px;width:1200px',
				closable : true,
				//frame : true,
				deferHeight : false,
				buttonAlign : 'center',
				title :'绩效分配',
				iconCls : 'icon-show',
				tbar : this._ToolBar,
				items : [this._formPanelBasic]
	});

}
Ext.extend(Srims.performance.PerformanceShowPanel, Ext.Panel, {});if (!Srims.performance)
	Ext.namespace("Srims.performance");
	
Srims.performance.PerformanceShowPanel_BasicForm=function(performance){
	this._performance=performance;
	this._textFieldProject=new Ext.form.TextField({
		fieldLabel:'项目名称',
		value:performance.get('projectName'),
		readonly:true,
		width:560
	});
	this._textFieldExpert=new Ext.form.TextField({
		fieldLabel:'项目负责人',
		value:performance.get('expertName'),
		readonly:true,
		width:160
	});
	this._textFieldArrived=new Ext.form.TextField({
		fieldLabel:'已到绩效',
	    value:performance.get('arrivedPerformance'),
		readonly:true,
		width:160
	});
	this._textFieldAllocated=new Ext.form.TextField({
		fieldLabel:'已分绩效',
		value:performance.get('allocatedPerformance'),
		readonly:true,
		width:160
	});
	var columnFirstItems=[this._textFieldProject,this._textFieldExpert,this._textFieldArrived,this._textFieldAllocated];
	Srims.performance.PerformanceShowPanel_BasicForm.superclass.constructor.call(this,{
		collapsible: true,
		title: '绩效分配基本信息',
		Height: 500,
		frame: true,
		labelWidth: 130,
		bodyStyle: 'padding:5px 5px 0',
		style: 'margin-bottom: 2px',
		defaultType: 'textfield',
		titleCollapse: true,
		Items:[new Ext.Panel({
		labelWidth: 130,
		width:400,
		layout: 'column',
		style: 'width:400px',
		Items:columnFirstItems
		})]
	});
//	   this.resetComponentValue = function(performance) {
//        this._performance.set('projectName', this._textFieldProject.getValue());
//        this._performance.set('expertName', this._textFieldExpert.getValue());
//        this._performance.set('arrivedPerformance', this._textFieldArrived.getValue());
//        this._performance.set('allocatedPerformance', this._textFieldAllocated.getValue());
    }

	Ext.extend(Srims.performance.PerformanceShowPanel_BasicForm, Ext.form.FormPanel, {});/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceStore.superclass.constructor.call(this, new Srims.performance.PerformanceXmlReader(), load_url, params);
    }
});

Srims.performance.PerformanceSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceSimpleStore.superclass.constructor.call(this, new Srims.performance.PerformanceSimpleXmlReader(), load_url, params);
    }
});
/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceXmlReader.superclass.constructor.call(this, Srims.performance.Performance);
    },
    //carlsirce2013.4.1 ���뼨Чͳ��
    readRecords: function(responseXML) {
        var result = Srims.performance.PerformanceXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.overheadExpensesInSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesInSum", responseXML), 10);
        result.records.overheadExpensesMiddleSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesMiddleSum", responseXML), 10);
        result.records.receivedPerformance = parseInt(Ext.DomQuery.selectValue("ReceivedPerformance", responseXML), 10);
        result.records.descendPerformance = parseInt(Ext.DomQuery.selectValue("DescendPerformance", responseXML), 10);
        return result;
    }
});
Srims.performance.PerformanceSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceSimpleXmlReader.superclass.constructor.call(this, Srims.performance.Performance);
    }
});


if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationWindow = function(id, fundAllocation) {

    this._id = id;
    this._fundAllocation = fundAllocation;
    this._currentAllocationTotal = fundAllocation.get('arrivedOverheadexpensesExpert') / 1000000;

    this._title = '填写绩效分配(填写范围0-' + this._currentAllocationTotal + '万元)' + '。<br/><font color=red>注意：可分配金额与绩效分配额度差值为课题组间接费用，</br>课题组间接费用自动划分到课题负责人名下.。</font>';

    this._fundAllocationOutNumberField = new Ext.form.NumberField({
        //blankText: this._title,
        width: 200,
        fieldLabel: '指定绩效分配额度',
        window: this,
        allowNegative: false,
        decimalPrecision: 6,
        labelStyle: 'margin-top:20px;margin-left:80px',
        style: 'margin-top:20px;margin-left:20px',
        maxValue: this._currentAllocationTotal,
        minValue: 0
    })
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        handler: function() {


            var window = this.window;
            if (!window.isValid(false))
                return;
            var fundOut = window._fundAllocationOutNumberField.getValue() * 1000000;
            Ext.Ajax.request({
                url: Srims.service.performance.PerformanceAllocationService + '/GetPerformanceAmountForAllocate',
                params: {
                    ID: fundAllocation.get('id'),
                    Amount: fundOut
                },
                scope: this,
                success: function(response) {
                    window._fundAllocation.panel.refresh();


                    window.close();

                }
            });
        }

    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });

    Srims.performance.PerformanceAllocationWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: 'icon-finance-query',
        width: 500,
        height: 150,
        style: 'padding:5px',
        layout: 'form',
        resizable: false,
        items: [this._fundAllocationOutNumberField],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fundAllocationOutNumberField.isValid(preventMark) && result;
        return result;
    }


}
Ext.extend(Srims.performance.PerformanceAllocationWindow, Ext.Window);
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucher = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'totalPerformancePay',
    type: 'int',
    mapping: 'TotalPerformancePay'
}, {
    name: 'allocatedPerformancePay',
    type: 'int',
    mapping: 'AllocatedPerformancePay'
}, {
    name: 'performanceAccountBookNumber',
    type: 'string',
    mapping: 'PerformanceAccountBookNumber'
}, {
    name: 'financeNumber',
    type: 'string',
    mapping: 'FinanceNumber'
}, {
    name: 'isRead',
    type: 'bool',
    mapping: 'IsRead',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesOut',
    type: 'int',
    mapping: 'OverheadExpensesOut'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'currentStateID',
    type: 'int',
    mapping: 'CurrentStateID'
}, {
    name: 'voucherState',
    type: 'string',
    mapping: 'VoucherState'
}, {
    name: 'financeAllocationDateTime',
    type: 'date',
    mapping: 'FinanceAllocationDateTime'
}, {
    name: 'stateDateTime',
    type: 'date',
    mapping: 'StateDateTime'
}, {
    name: 'stateOperator',
    type: 'string',
    mapping: 'StateOperator'
}, {
    name: 'stateRemark',
    type: 'string',
    mapping: 'StateRemark'
}, {
    name: 'performanceAllocationId',
    type: 'int',
    mapping: 'PerformanceAllocationId'
}, {
    name: 'fundAllocationOverheadExpenses',
    type: 'int',
    mapping: 'FundAllocationOverheadExpenses'
}, {
    name: 'fundAllocationDateTime',
    type: 'date',
    mapping: 'FundAllocationDateTime'
}, {
    name: 'fundAllocationOverheadExpensesIn',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesIn'
}, {
    name: 'fundAllocationOverheadExpensesOut',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesOut'
}, {
    name: 'fundAllocationStateDateTime',
    type: 'date',
    mapping: 'FundAllocationStateDateTime'
}, {
    name: 'fundAllocationStateOperator',
    type: 'string',
    mapping: 'FundAllocationStateOperator'
}, {
    name: 'fundAllocationStateRemark',
    type: 'string',
    mapping: 'FundAllocationStateRemark'
}, {
    name: 'fundAllocationState',
    type: 'string',
    mapping: 'FundAllocationState'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPrincipal',
    type: 'string',
    mapping: 'ProjectPrincipal'
}, {
    name: 'projectIsSecret',
    type: 'bool',
    mapping: 'ProjectIsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'projectTypePreCode',
    type: 'string',
    mapping: 'ProjectTypePreCode'
}, {
    name: 'financeID',
    type: 'int',
    mapping: 'FinanceID'
}, {
    name: 'financeAmount',
    type: 'int',
    mapping: 'FinanceAmount'
}, {
    name: 'financeReceivedDate',
    type: 'date',
    mapping: 'FinanceReceivedDate'
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'isBorrow',
    type: 'bool',
    mapping: 'IsBorrow',
    convert: Boolean.toBoolean
}, {
    name: 'userIsExpert',
    type: 'bool',
    mapping: 'UserIsExpert',
    convert: Boolean.toBoolean
}, {
    name: 'fundMemberID',
    type: 'int',
    mapping: 'FundMemberID'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'isExpertSecondCollege',
    type: 'string',
    mapping: 'IsExpertSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'deparment',
    type: 'string',
    mapping: 'Deparment'
}, {
    name: 'expertCollegeCode',
    type: 'string',
    mapping: 'ExpertCollegeCode'
}, {
    name: 'hasPermission_Show',
    type: 'bool',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'bool',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'bool',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Print',
    type: 'bool',
    mapping: 'HasPermission_Print',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetPrint',
    type: 'bool',
    mapping: 'HasPermission_ResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetAccountBookNumber',
    type: 'bool',
    mapping: 'HasPermission_ResetAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_SignIn',
    type: 'bool',
    mapping: 'HasPermission_SignIn',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ReturnVoucher',
    type: 'bool',
    mapping: 'HasPermission_ReturnVoucher',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_FinanceAllocate',
    type: 'bool',
    mapping: 'HasPermission_FinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_CancelFinanceAllocate',
    type: 'bool',
    mapping: 'HasPermission_CancelFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Print',
    type: 'bool',
    mapping: 'HasPermission_Print',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetPrint',
    type: 'bool',
    mapping: 'HasPermission_ResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowFundAllocation',
    type: 'bool',
    mapping: 'HasPermission_ShowFundAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'bool',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'bool',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'bool',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canPrint',
    type: 'bool',
    mapping: 'CanPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canResetPrint',
    type: 'bool',
    mapping: 'CanResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canResetAccountBookNumber',
    type: 'bool',
    mapping: 'CanResetAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canSignIn',
    type: 'bool',
    mapping: 'CanSignIn',
    convert: Boolean.toBoolean
}, {
    name: 'canReturnVoucher',
    type: 'bool',
    mapping: 'CanReturnVoucher',
    convert: Boolean.toBoolean
}, {
    name: 'canFinanceAllocate',
    type: 'bool',
    mapping: 'CanFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canFinanceAllocate',
    type: 'bool',
    mapping: 'CanFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canCancelFinanceAllocate',
    type: 'bool',
    mapping: 'CanCancelFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canResetPrint',
    type: 'bool',
    mapping: 'CanResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canShowFundAllocation',
    type: 'bool',
    mapping: 'CanShowFundAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesExpert',
    type: 'int',
    mapping: 'OverheadExpensesExpert'
}, {
    name: 'overheadExpensesExpertRest',
    type: 'int',
    mapping: 'OverheadExpensesExpertRest'
}, {
    name: 'performanceAllocationExpertTotal',
    type: 'int',
    mapping: 'PerformanceAllocationExpertTotal'
}, {
    name: 'performanceAllocationArrivedPerformance',
    type: 'int',
    mapping: 'PerformanceAllocationArrivedPerformance'
}
]);

Srims.data.Entity.apply(Srims.performance.PerformanceVoucher);
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.performance.PerformanceVoucherStore.superclass.constructor.call(this, new Srims.performance.PerformanceVoucherXmlReader(), load_url, params);
    }
});

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceVoucherXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceVoucher);
    },
    //carlsirce2013.12.23 ���뼨Чͳ��
    readRecords: function(responseXML) {
        var result = Srims.performance.PerformanceVoucherXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.overheadExpensesExpertSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesExpertSum", responseXML), 10);
        result.records.performanceSum = parseInt(Ext.DomQuery.selectValue("PerformanceSum", responseXML), 10);
        result.records.overheadExpensesExpertSumRest = parseInt(Ext.DomQuery.selectValue("OverheadExpensesExpertSumRest", responseXML), 10);
        return result;
    }
});
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherGridPanel_ToolBar = function(selection, store, panelId, queryParams, isFinanceManage, isFundAllocation, fundAllocation, isExpertGuid, isCorrect) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._fundAllocation = fundAllocation;
    if (this._fundAllocation) {
        this._fundAllocation.store = store;
        this._fundAllocation.toobBar = this;
    }
    var user = Srims.currentLoginLog.user;
    this._isExpert = user.userRoleType == 'Expert' ? true : false;
    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">分配产生的凭单信息</b>',
        minWidth: 60
    });
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.performance.showVoucherQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, isFinanceManage, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>凭单查询</b><br/>对凭单信息进行复杂查询'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.performance.editVoucher(this.fundAllocation, this.selection.getSelected(), '绩效');
        },
        hidden: true,
        tooltip: '<b>编辑凭单</b><br/>编辑选中的凭单'
    });
    this._buttonResetAccountBookNumber = new Ext.Toolbar.Button({
        iconCls: 'icon-edit-account-book-nunber',
        text: '编辑账本号',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.performance.showEditAccountBookNumberWindow(this.selection.getSelected(), this.fundAllocation);
        },
        hidden: true,
        tooltip: '<b>编辑凭单账本号</b><br/>当凭单账本号为新建时，编辑凭单账本号'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除凭单', '你确定要删除这个凭单吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.performance.deleteVoucher(this.selection.getSelected(), this.fundAllocation, isCorrect);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除凭单</b><br/>删除选中的凭单'
    });
    this._buttonShowVoucher = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        isExpert: this._isExpert,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            if (this.isExpert)
                Srims.performance.SetIsReadAndshowVoucher(this.selection.getSelected(), this.store, isFinanceManage);
            else
                Srims.performance.showVoucher(this.selection.getSelected(), this.store, isFinanceManage);
        },
        tooltip: '<b>查看凭单信息</b>'
    });
    this._buttonFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.performance.newVoucher(this.fundAllocation, isCorrect);
        },
        tooltip: '<b>分配经费</b><br/>对所选经费下拨进行分配'
    });
    this._buttonShowFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '查看分配信息',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.performance.showVoucherFundAllocationInfo(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看该凭单对应的经费分配情况</b>'
    });
    this._buttonSignIn = new Ext.Toolbar.Button({
        iconCls: 'icon-sign-in',
        text: '签收',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '签收凭单';
            message = '你确定要签收这张凭单吗？';
            action = 'signIn';
            methodName = '/VoucherSignIn';
            Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>签收凭单</b><br/>签收凭单'
    });

    this._buttonReturn = new Ext.Toolbar.Button({
        iconCls: 'icon-return',
        text: '退回',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '退回凭单';
            message = '你确定要退回这张凭单吗？';
            action = 'return';
            methodName = '/VoucherReturn';
            Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>退回凭单</b>、'
    });

    this._buttonAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-allocate',
        text: '分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.allocateVoucher(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>分配</b>'
    });

    this._buttonCancleAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel-allocate',
        text: '取消分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '取消分配凭单';
            message = '你确定要取消这张凭单的分配吗？';
            action = 'cancel';
            methodName = '/VoucherCancleAllocate';
            Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>取消分配</b>'
    });
    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '打印凭单';
            message = '你确定要打印这张凭单吗？';
            action = 'print';
            methodName = '/VoucherPrint';

            if (this.selection.getSelected().get('accountBookNumber').substring(0, 4) == "9999") {
                Ext.Msg.show({
                    title: '不能打印',
                    msg: '账本号对应的学院为其它，请找超级管理员手动修改账本号。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
                Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
            }
        },
        tooltip: '<b>打印凭单</b>'
    });
    this._buttonResetPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print-reset',
        text: '重置打印',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '重置打印';
            message = '你确定要重置打印这张凭单吗？';
            action = 'resetPrint';
            methodName = '/VoucherResetPrint';
            Srims.performance.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>重置打印</b>'
    });
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出已签收凭单',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.finance.exportSignInVoucher(queryParams);
        },
        tooltip: '<b>导出已签收凭单</b><br/>导出已签收凭单'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        toolbar: this,
        fundAllocation: this._fundAllocation,
        handler: function() {
            this.store.load();

            //用于数据纠错
            if (isCorrect)
                Ext.Ajax.request({
                    url: Srims.service.fund.FundAllocationService + '/GetById',
                    params: {
                        fundAllocationId: fundAllocation.get('id')
                    },
                    scope: this,
                    success: function(response) {
                        var fundAllocationstore = new Ext.data.Store({
                            data: response.responseXML,
                            reader: new Srims.fund.FundAllocationXmlReader()
                        });
                        var currentFundAllocation = fundAllocationstore.getAt(0);
                        currentFundAllocation.panel = this.fundAllocation.panel;
                        currentFundAllocation.store = this.store;
                        currentFundAllocation.toobBar = this.toobBar;
                        this.toolbar.resetComponentFundAllocation(currentFundAllocation);
                    }
                });
        },
        tooltip: '<b>刷新列表</b><br/>更新凭单财务列表列表'
    });

    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            if (isFinanceManage)
                queryParams.voucherState = Srims.fund.FinanceVoucherState;
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    var items;
    if (isFundAllocation) {
        if (isExpertGuid)
            items = [this._buttonHeader, this._buttonShowVoucher, this._buttonEdit, this._buttonDelete, this._buttonResetAccountBookNumber]
        else {
            if (isCorrect)
                items = [this._buttonFundAllocation, this._buttonShowVoucher, this._buttonEdit, this._buttonDelete, this._buttonResetAccountBookNumber, new Ext.Toolbar.Fill(), this._buttonRefresh];
            else
                items = [this._buttonShowVoucher, this._buttonEdit, this._buttonDelete, this._buttonResetAccountBookNumber];
        }
    }
    else {
        if (isFinanceManage)
            items = [this._buttonQuery, this._buttonShowVoucher, this._buttonSignIn, this._buttonReturn, this._buttonAllocate, this._buttonCancleAllocate, new Ext.Toolbar.Fill(), this._buttonExport, this._buttonRefresh, this._buttonReset];
        else
            items = [this._buttonQuery, this._buttonShowVoucher, this._buttonPrint, this._buttonResetPrint, this._buttonShowFundAllocation, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    }
    Srims.performance.PerformanceVoucherGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items,
        height: 25
    });
    //initial
    this._selection.buttonShowVoucher = this._buttonShowVoucher;
    this._selection.buttonPrint = this._buttonPrint;
    this._selection.buttonResetPrint = this._buttonResetPrint;
    this._selection.buttonSignIn = this._buttonSignIn;
    this._selection.buttonReturn = this._buttonReturn;
    this._selection.buttonAllocate = this._buttonAllocate;
    this._selection.buttonCancleAllocate = this._buttonCancleAllocate;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonResetAccountBookNumber = this._buttonResetAccountBookNumber;
    this._selection.buttonShowFundAllocation = this._buttonShowFundAllocation;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShowVoucher = selection.buttonShowVoucher;
        var buttonPrint = selection.buttonPrint;
        var buttonResetPrint = selection.buttonResetPrint;
        var buttonSignIn = selection.buttonSignIn;
        var buttonReturn = selection.buttonReturn;
        var buttonAllocate = selection.buttonAllocate;
        var buttonCancleAllocate = selection.buttonCancleAllocate;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonResetAccountBookNumber = selection.buttonResetAccountBookNumber;
        var buttonShowFundAllocation = selection.buttonShowFundAllocation;

        if (selection.getCount() == 0) {
            buttonShowVoucher.hide();
            buttonPrint.hide();
            buttonResetPrint.hide();
            buttonSignIn.hide();
            buttonReturn.hide();
            buttonAllocate.hide();
            buttonCancleAllocate.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonResetAccountBookNumber.hide();
            buttonShowFundAllocation.hide();
            return;
        }

        var voucher = selection.getSelected();

        buttonResetAccountBookNumber.setVisible(voucher.get('hasPermission_ResetAccountBookNumber'));
        buttonResetAccountBookNumber.setDisabled(!voucher.get('canResetAccountBookNumber'));

        if (!isCorrect) {
            buttonEdit.setVisible(voucher.get('hasPermission_Edit'));
            buttonEdit.setDisabled(!voucher.get('canEdit'));

            buttonDelete.setVisible(voucher.get('hasPermission_Delete'));
            buttonDelete.setDisabled(!voucher.get('canDelete'));
        }
        else {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);

            buttonDelete.setVisible(true);
            buttonDelete.setDisabled(false);
        }

        buttonShowFundAllocation.setVisible(voucher.get('hasPermission_ShowFundAllocation'));
        buttonShowFundAllocation.setDisabled(!voucher.get('canShowFundAllocation'));

        buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
        buttonSignIn.setDisabled(!voucher.get('canSignIn'));

        buttonShowVoucher.setVisible(voucher.get('hasPermission_Show'));
        buttonShowVoucher.setDisabled(!voucher.get('canShow'));

        buttonPrint.setVisible(voucher.get('hasPermission_Print'));
        buttonPrint.setDisabled(!voucher.get('canPrint'));

        buttonResetPrint.setVisible(voucher.get('hasPermission_ResetPrint'));
        buttonResetPrint.setDisabled(!voucher.get('canResetPrint'));

        buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
        buttonSignIn.setDisabled(!voucher.get('canSignIn'));

        buttonReturn.setVisible(voucher.get('hasPermission_ReturnVoucher'));
        buttonReturn.setDisabled(!voucher.get('canReturnVoucher'));

        buttonAllocate.setVisible(voucher.get('hasPermission_FinanceAllocate'));
        buttonAllocate.setDisabled(!voucher.get('canFinanceAllocate'));

        buttonCancleAllocate.setVisible(voucher.get('hasPermission_CancelFinanceAllocate'));
        buttonCancleAllocate.setDisabled(!voucher.get('canCancelFinanceAllocate'));
    }
    this.resetComponentFundAllocation = function(currentFundAllocation) {
        this._buttonEdit.fundAllocation = currentFundAllocation;
        this._buttonDelete.fundAllocation = currentFundAllocation;
        this._buttonFundAllocation.fundAllocation = currentFundAllocation;
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.performance.PerformanceVoucherGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.performance)
    Ext.namespace("Srims.performance");
    

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.performance.listVoucher = function() {
    Srims.performance._listVoucher('VoucherList', '凭单列表', 'icon-fund-voucher');
}
Srims.performance.listMyVoucher = function() {
    Srims.fund._listVoucher('MyVoucherList', '凭单列表', 'icon-fund-voucher');
}
Srims.performance._listVoucher = function(id, name, iconCls, queryParams) {
    var panelId = 'PerformanceVoucherGridPanel_' + id;
    var voucherStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        voucherStore = panel.getStore();
        voucherStore.load();
    }
    else {
        voucherStore = new Srims.performance.PerformanceVoucherStore(Srims.service.performance.PerformanceVoucherService + '/Query', queryParams);
        panel = new Srims.performance.PerformanceVoucherGridPanel(panelId, voucherStore, name, iconCls, queryParams);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.performance.showVoucherQueryWindow = function(id, store, queryParams, isFinanceManage, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.performance.PerformanceVoucherQueryWindow(id, store, queryParams, isFinanceManage);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.performance.changeVoucherState = function(voucher, store, title, message, action, methodName, isFinanceManage) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.performanceVoucherID = voucher.get('id');
            Ext.Ajax.request({
                url: Srims.service.performance.PerformanceVoucherService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.performance.PerformanceVoucherXmlReader()
                    });
                    var editedVoucher = newstore.getAt(0);
                    var panelId = (isFinanceManage ? 'PerformanceVoucherFinanceShowPanel' : 'PerformanceVoucherShowPanel') + editedVoucher.get('id');
                    if (Ext.getCmp(panelId))
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                    Srims.performance.showVoucher(editedVoucher, store, isFinanceManage);
                    if (action == 'print')
                        window.open('PerformanceVoucherPrint.aspx?PerformanceVoucherID=' + voucher.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                }
            });
        }
    }, this);
}
Srims.performance.SetIsReadAndshowVoucher = function(voucher, store, isFinanceManage) {
    var params = {
        voucherID: voucher.get('id')
    }

    Ext.Ajax.request({
        url: Srims.service.fund.VoucherService + '/SetIsRead',
        params: params,
        scope: this,
        success: function() {
            store.load();
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_MyUnReadVoucher());
            Srims.performance.showVoucher(voucher, store, isFinanceManage);
        }
    });

}
Srims.performance.showVoucher = function(voucher, store, isFinanceManage) {
    var panelId = (isFinanceManage ? 'PerformanceVoucherFinanceShowPanel' : 'PerformanceVoucherShowPanel') + voucher.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    var panel = new Srims.performance.PerformanceVoucherShowPanel(panelId, voucher, store, isFinanceManage);
    Srims.WorkSpace.addPanel(panel);
}
Srims.performance.newPerformanceVoucher = function(performanceAllocation, allocationName) {
    var windowId = 'NewPerformanceVoucher' + allocationName;
    var voucher = new Srims.performance.PerformanceVoucher({});
    Srims.performance.ShowVoucherEditWindow(performanceAllocation, voucher, windowId, allocationName);
}
Srims.performance.editVoucher = function(fundAllocation, voucher, allocationName) {
    var windowId = 'EditPerformanceVoucher' + voucher.get('id');
    Srims.performance.ShowVoucherEditWindow(fundAllocation, voucher, windowId, allocationName);
}

Srims.performance.ShowVoucherEditWindow = function(performanceAllocation, voucher, windowId, allocationName) {
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: performanceAllocation.get('projectID')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectSimpleXmlReader()
            });
            var project = store.getAt(0);
            Ext.Ajax.request({
                url: Srims.service.common.NoticeTextService + '/Get',
                params: {
                    type: 'PerformanceAllocation'
                },
                success: function(response) {

                    var noticeTextStore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.common.NoticeTextXmlReader()
                    });
                    var minAllocationMoney = noticeTextStore.getAt(0).get('value') * 1000000;
                    var window = Ext.getCmp(windowId);

                    if (!window)
                        var window = new Srims.performance.PerformanceVoucherEditWindow(id, performanceAllocation, voucher, project, allocationName, minAllocationMoney);

                    window.show();
                }
            })

        }
    })
}

Srims.performance.deleteVoucher = function(voucher, fundAllocation, isCorrect) {
    Ext.Ajax.request({
        url: Srims.service.performance.PerformanceVoucherService + '/Delete',
        params: {
            voucherId: voucher.get('id'),
        },
        success: function() {
            //仅用于专家向导
            fundAllocation.panel.fundAllocation = fundAllocation;
            fundAllocation.panel.refresh();

            if (fundAllocation.store)
                fundAllocation.store.load();

            //用于数据纠错
            if (isCorrect)
                Ext.Ajax.request({
                    url: Srims.service.fund.FundAllocationService + '/GetById',
                    params: {
                        fundAllocationId: fundAllocation.get('id')
                    },
                    scope: this,
                    success: function(response) {
                        var store = new Ext.data.Store({
                            data: response.responseXML,
                            reader: new Srims.fund.FundAllocationXmlReader()
                        });
                        var currentFundAllocation = store.getAt(0);
                        currentFundAllocation.panel = fundAllocation.panel;
                        currentFundAllocation.store = fundAllocation.store;
                        currentFundAllocation.toobBar = fundAllocation.toobBar;
                        currentFundAllocation.toobBar.resetComponentFundAllocation(currentFundAllocation);
                    }
                });
        }
    });
}

Srims.performance.showEditAccountBookNumberWindow = function(voucher, fundAllocation) {
    var windowId = 'ResetPerformanceVoucherAccountBookNumber' + voucher.get('id');
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.performance.PerformanceVoucherEditAccountBookNumberWindow(windowId, voucher, fundAllocation);

    window.show();
}
Srims.performance.showVoucherFundAllocationInfo = function(voucher) {
    Ext.Ajax.request({
        url: Srims.service.performance.PerformanceAllocationService + '/GetById',
        params: {
            performanceAllocationId: voucher.get('performanceAllocationId')
        },
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.performance.PerformanceAllocationXmlReader()
            });
            var currentPerformanceAllocation = store.getAt(0);
            Srims.performance.showPerformanceAllocationInfo(currentPerformanceAllocation);
        }
    });
}
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherEditWindow = function(id, fundAllocation, voucher, project, allocatinName, minAllocationMoney) {

    this._fundAllocation = fundAllocation;
    this._project = project;
    this._voucher = voucher;
    PerformanceVoucherEditWindow = this.window;
    this._allocatinName = allocatinName;

    //绩效分配
    var fundAllocationAmount = fundAllocation.get('arrivedPerformance') - fundAllocation.get('allocatedPerformance');
    this._canAllocationAmount = voucher.isNew() ? fundAllocationAmount : fundAllocationAmount + voucher.get('performancePay');



    this._inForm = new Srims.performance.PerformanceVoucherEditWindow_InForm(fundAllocation, voucher, project, this._canAllocationAmount, this._projectCanAllocationInAmount, allocatinName, minAllocationMoney);


    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });

    Srims.performance.PerformanceVoucherEditWindow.superclass.constructor.call(this, {
        id: id,
        title: this._allocatinName+'分配',
        width: 950,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._inForm],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._inForm.focus();


    this.validate = function(preventMark) {
        var result = true;

        result = this._inForm.validate(preventMark) && result;

        return result;
    }
    this.save = function() {
        var voucher = this._voucher;

        voucher.beginEdit();
        this._inForm.assginValues();
        voucher.commit();

        var params = voucher.data;


        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceVoucherService + '/Save',
            params: params,
            scope: this,
            success: function() {
                var panel = this._fundAllocation.panel;
                if (panel == undefined) {
                    this.close();
                    return;
                }

                panel.fundAllocation = this._fundAllocation;
                panel.refresh();


                this.close();
            }
        });
    }
    this.buttonSave_click = function(button, e) {
        var window = this.window;
        if (!window.validate(false))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.performance.PerformanceVoucherEditWindow, Ext.Window);if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherEditWindow_InForm = function(fundAllocation, voucher, project, canAllocationAmount, projectCanAllocationInAmount, allocatinName, minAllocationMoney) {

    this._fundAllocation = fundAllocation;
    this._voucher = voucher;
    this._project = project;
    this._allocatinName = allocatinName;

    this._comboBoxFundMember = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '经费成员',
        value: this._voucher.get('expertName'),
        selectEntityId: this._voucher.get('expertID'),
        allowBlank: false,
        width: 160
    });
    this._checkboxIsSecondCollege = new Ext.form.Checkbox({
        fieldLabel: '双聘单位',
        checked: this._voucher.get('isExpertSecondCollege'),
        disabled: true
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: this._allocatinName + '分配(万元)',
        value: this._voucher.get('performancePay'),
        allowBlank: false,
        msgTarget: 'side',
        allowNegative: false,
        width: 160
    });

    var items;
    items = [this._comboBoxFundMember, this._checkboxIsSecondCollege, this._numberFieldFundAmount];
    Srims.performance.PerformanceVoucherEditWindow_InForm.superclass.constructor.call(this, {
        title: '注意：可分配绩效总额：' + Money.render(fundAllocation.get('arrivedPerformance')) + '，已分配绩效：' + Money.render(fundAllocation.get('allocatedPerformance')) + '，未分配绩效：' + Money.render(canAllocationAmount) + '。<br />每笔分配金额不能小于：' + Money.render(minAllocationMoney) + '；剩余金额小于' + Money.render(minAllocationMoney) + '，将不能分配',

        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 100,
        items: items
    });
    this._comboBoxFundMember.checkboxIsSecondCollege = this._checkboxIsSecondCollege;
    this.comboBoxFundMember_Change = function(comboBox) {
        //检查经费成员是否是项目成员
        var expertID = comboBox.getEntity().get('id');
        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceAllocationService + '/CheckExpertByID',
            params: {
                ExpertId: expertID,
                FundAllocationId: fundAllocation.get('id')
            },
            scope: this,
            success: function(response) {
                if (!Boolean.toBoolean(response.responseText))
                    Ext.MessageBox.show({
                        title: '确认绩效分配成员',
                        msg: '注意：您添加的绩效分配成员不在项目成员中！',
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        fn: function(button) {
                            if (button == 'yes')
                                return true;
                        },
                        icon: Ext.MessageBox.QUESTION
                    });
            }
        });
        //处理专家变化
        var expertSecondCollege = comboBox.getEntity().get('college2');
        if (expertSecondCollege != '') {
            comboBox.checkboxIsSecondCollege.setDisabled(false);
        };
    }
    this._comboBoxFundMember.on('change', this.comboBoxFundMember_Change);

    this.validateFundAmount = function() {
        var panel = this.panel;

        var fundAmount = this.getMoney();

        if (fundAmount > canAllocationAmount) {
            this.invalidText = '分配金额不能大于经费未分配总额：' + Money.render(canAllocationAmount);
            return false;
        }
        if (fundAmount < minAllocationMoney) {
            this.invalidText = '分配金额不能小于：' + Money.render(minAllocationMoney);
            return false;
        }
        if (canAllocationAmount - fundAmount < minAllocationMoney) {
            if (canAllocationAmount - fundAmount != 0) {
                this.invalidText = '剩余金额小于' + Money.render(minAllocationMoney) + '，将不能分配';
                return false;
            }
        }


        return true;
    }
    this._numberFieldFundAmount.panel = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;

    this.validate = function(preventMark) {
        var result = true;

        result = this._comboBoxFundMember.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;

        return result;
    }
    this.assginValues = function() {
        this._voucher.set('performancePay', this._numberFieldFundAmount.getMoney());
        this._voucher.set('projectID', this._fundAllocation.get('projectID'));
        this._voucher.set('expertID', this._comboBoxFundMember.getValue());
        this._voucher.set('expertName', this._comboBoxFundMember.getText());
        this._voucher.set('isExpertSecondCollege', this._checkboxIsSecondCollege.getValue());
        this._voucher.set('performanceAllocationId', this._fundAllocation.get('id'));

    }
    this.focus = function() {
        this._comboBoxFundMember.focus(false, true);
    }
}
Ext.extend(Srims.performance.PerformanceVoucherEditWindow_InForm, Ext.form.FormPanel, {})
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherGridPanel = function(id, voucherStore, title, iconCls, queryParams, isFinanceManage) {

    //fields
    this._store = voucherStore;
    this._store.grid = this;
    var user = Srims.currentLoginLog.user;
    var isExpert = user.userRoleType == 'Expert' ? true : false;
    //controls    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.performance.PerformanceVoucherGridPanel_ColumnModel(isFinanceManage, isExpert);
    this._toolbar = new Srims.performance.PerformanceVoucherGridPanel_ToolBar(this._selections, this._store, id, queryParams, isFinanceManage, false, undefined);
    this._textItemFundSum = new Ext.Toolbar.TextItem('');
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._store,
        displayInfo: true,
        displayMsg: '当前是第{0}条-第{1}条，共{2}条',
        emptyMsg: '没有可以显示的记录',
        items: [this._textItemFundSum]
    });
    //constructor
    Srims.performance.PerformanceVoucherGridPanel.superclass.constructor.call(this, params);
    //event

    this.on('celldblclick', onCellDblClick);

    this._store.on('load', function(store, records) {

        var fundSumMessage = String.format(" <font size='8'>课题组间接费用及绩效：<strong>{0}</strong>，绩效：<strong>{1}</strong>，课题组间接费用：<strong>{2}</strong></font>", Money.render(records.overheadExpensesExpertSum), Money.render(records.performanceSum), Money.render(records.overheadExpensesExpertSumRest));
        Ext.get(store.grid._textItemFundSum.id).update(fundSumMessage);
    });
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var voucher = grid.getStore().getAt(rowIndex);
        Srims.performance.showVoucher(voucher, grid._store, isFinanceManage);
    }
}
Ext.extend(Srims.performance.PerformanceVoucherGridPanel, Srims.component.GridPanel);
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceVoucherGridPanel_ColumnModel = function(value, metadata, record) {

    if (record.get('isRead') == false)
        metadata.css = "voucher_unread " + metadata.css;

    return value;
};
Srims.performance.PerformanceVoucherGridPanel_ColumnModel = function(isFinanceManage, isExpert) {
    Srims.performance.PerformanceVoucherGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return value;
        }
    }, {
        header: "凭单号",
        dataIndex: 'voucherNumber',
        sortable: true,
        width: 40,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return value;
        }
    }, {
        header: "专家",
        dataIndex: 'expertName',
        sortable: true,
        width: 30,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return value;
        }
    }, {
        header: "项目名称",
        dataIndex: 'projectName',
        sortable: true,
        hidden: false,
        width: 90,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return value;
        }
    }, {
        header: "状态",
        dataIndex: 'voucherState',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value) {
            return Srims.performance.VoucherStateRender(value);
        }
    }, {
        header: "财务分配时间",
        dataIndex: 'financeAllocationDateTime',
        width: 20,
        sortable: true,
        hidden: !isFinanceManage,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Date.render(value);
        }
    }, {
        header: "制单号",
        dataIndex: 'financeNumber',
        width: 40,
        sortable: true,
        hidden: !isFinanceManage,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return value;
        }
    }, {
        header: "账本号",
        dataIndex: 'accountBookNumber',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return value;
        }
    }, {
        header: "课题组间接费用及绩效(万元)",
        dataIndex: 'overheadExpensesExpert',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Money.render(value);
        }
    }, {
        header: "课题组间接费用(万元)",
        dataIndex: 'overheadExpensesExpertRest',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Money.render(value);
        }
    }, {
        header: "绩效分配(万元)",
        dataIndex: 'performancePay',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Money.render(value);
        }
    }, {
        header: "是否已读",
        dataIndex: 'isRead',
        width: 40,
        sortable: true,
        hidden: true,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Boolean.render(value);
        }
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.performance.PerformanceVoucherGridPanel_ColumnModel, Ext.grid.ColumnModel);
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

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherQueryWindow_InforPanel = function(isFinanceManage) {

var voucherStateStore = isFinanceManage ? Srims.performance.VoucherStateForFinanceStore : Srims.performance.VoucherStateStore;

    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        width: 150
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家',
        width: 167
    });
    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目名称',
        width: 167
    });
    this._dateFieldFinanceAllocationDateBegin = new Ext.form.DateField({
        fieldLabel: '财务分配时间',
        width: 150
    });
    this._dateFieldFinanceAllocationDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        width: 150
    });
    this._numberFieldFinanceNumber = new Ext.form.NumberField({
        fieldLabel: '财务制单号',
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false,
        minLength: 5,
        maxLength: 5,
        width: 150
    });
    this._checkBoxIsHorizontal = new Ext.form.Checkbox({
        fieldLabel: '是否横向项目'
    });
    this._checkboxGroupVoucherStates = new Srims.component.CheckBoxGroup({
        fieldLabel: '凭单状态',
        cls: 'srims-checkboxGroup',
        columns: isFinanceManage ? 3 : 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(voucherStateStore)
    });
    var columnFirstItems = [this._textFieldVoucherNumber, this._comboBoxProject, this._textFieldAccountBookNumber, this._dateFieldFinanceAllocationDateBegin];
    var columnSecondItems = [this._comboBoxExpert, this._checkBoxIsHorizontal, this._numberFieldFinanceNumber, this._dateFieldFinanceAllocationDateEnd];

    Srims.performance.PerformanceVoucherQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 252,
                layout: 'form',
                labelWidth: 80,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 90,
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._checkboxGroupVoucherStates]
    });

    this.buildParams = function(params) {
        params.voucherNumber = this._textFieldVoucherNumber.getValue();
        params.accountBookNumber = this._textFieldAccountBookNumber.getValue();
        params.financeNumber = this._numberFieldFinanceNumber.getValue();
        params.isHorizontal = this._checkBoxIsHorizontal.checked ? "true" : "";
        params.allocationDateTimeStart = Date.format(this._dateFieldFinanceAllocationDateBegin.getValue());
        params.allocationDateTimeEnd = Date.format(this._dateFieldFinanceAllocationDateEnd.getValue());
        params.voucherState = this._checkboxGroupVoucherStates.getSelecetedValue();
        params.expertName = this._comboBoxExpert.getText();
        params.projectName = this._comboBoxProject.getText();
    }

    this.clearParams = function() {
        this._textFieldVoucherNumber.reset();
        this._textFieldAccountBookNumber.reset();
        this._numberFieldFinanceNumber.reset();
        this._checkBoxIsHorizontal.reset();
        this._dateFieldFinanceAllocationDateBegin.reset();
        this._dateFieldFinanceAllocationDateEnd.reset();
        this._checkboxGroupVoucherStates.reset();
        this._comboBoxExpert.reset();
        this._comboBoxProject.reset();
    }
}
Ext.extend(Srims.performance.PerformanceVoucherQueryWindow_InforPanel, Ext.FormPanel);

if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel = function(panelId, voucher, store, isFinanceManage) {

    this._id = panelId;
    this._voucher = voucher;
    this._store = store;

    this._basicForm = new Srims.performance.PerformanceVoucherShowPanel_BasicForm(voucher);
    this._stateHistoryForm = new Srims.performance.PerformanceVoucherShowPanel_StateHistoryForm(voucher);
    this._fundAllocationForm = new Srims.performance.PerformanceVoucherShowPanel_FundAllocationForm(voucher);
    //this._financeForm = new Srims.performance.PerformanceVoucherShowPanel_FinanceFor(voucher);
    this._toolBar = new Srims.performance.PerformanceVoucherShowPanel_ToolBar(voucher, this._store, this._id, isFinanceManage);

    var user = Srims.currentLoginLog.user;
    this._isExpert = user.userRoleType == 'Expert' ? true : false;

    var items = [];
    items = [this._basicForm, this._fundAllocationForm, this._stateHistoryForm];

    Srims.performance.PerformanceVoucherShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '课题组间接费用及绩效凭单' + this._voucher.get('voucherNumber'),
        iconCls: 'icon-show',
        tbar: this._isExpert ? undefined : this._toolBar,
        items: items
    });
    this.resetValues = function(voucher) {
        var fundAllocation = Srims.performance.getFundAllocationFromVoucher(voucher);
        //var finance = Srims.fund.getFinanceFromVoucher(voucher);
        this._basicForm.resetValues(voucher);
        this._fundAllocationForm.resetComponnentsValue(fundAllocation);
        //this._financeForm.resetComponnentsValue(finance);
    }
}
Ext.extend(Srims.performance.PerformanceVoucherShowPanel, Ext.Panel, {});
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel_BasicForm = function(voucher) {
    this._voucher = voucher;

    this._textFieldFundMember = new Ext.form.TextField({
        fieldLabel: '绩效经费成员',
        value: voucher.get('expertName'),
        readOnly: true,
        width: 160
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '绩效账本号',
        value: voucher.get('accountBookNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldFinanceNumber = new Ext.form.TextField({
        fieldLabel: '财务制单号',
        value: voucher.get('financeNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '绩效金额',
        value: Money.render(voucher.get('performancePay')),
        readOnly: true,
        width: 160
    });
    this._textFieldExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接费用',
        value: Money.render(voucher.get('overheadExpensesExpert')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.performance.VoucherStateRender(voucher.get('voucherState')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentStateTime = new Ext.form.TextField({
        fieldLabel: '当前状态时间',
        value: Date.render(voucher.get('stateDateTime')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentStateOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: voucher.get('stateOperator'),
        readOnly: true,
        width: 160
    });
    var columnFirstItems = [this._textFieldFundMember, this._textFieldAmount, this._textFieldCurrentStateTime, this._textFieldCurrentStateOperator];
    var columnSecondItems = [this._textFieldAccountBookNumber, this._textFieldExpert, this._textFieldFinanceNumber, this._textFieldCurrentState];

    Srims.performance.PerformanceVoucherShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '凭单基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });

    //方法
    this.resetValues = function(voucher) {
        this._textFieldFundMember.setValue(voucher.get('expertName'));
        this._textFieldAccountBookNumber.setValue(voucher.get('accountBookNumber'));
        this._textFieldFinanceNumber.setValue(voucher.get('financeNumber'));
        this._textFieldAmount.setValue(Money.render(voucher.get('allocationIn')) + '(管理费：' + Money.render(voucher.get('overheadExpensesIn')) + ')');
        this._textFieldCurrentState.setValue(Srims.fund.VoucherStateRender(voucher.get('voucherState')));
        this._textFieldCurrentStateTime.setValue(Date.render(voucher.get('stateDateTime')));
        this._textFieldCurrentStateOperator.setValue(voucher.get('stateOperator'));
        this._textFieldPerformanceAccountBookNumber.setValue(voucher.get('performanceAccountBookNumber'));
        this._textFieldAllocationPerformancePay.setValue(Money.render(voucher.get('performancePay')));
        this._textFieldExpert.setValue(Money.render(voucher.get('overheadExpensesExpert')));
    }
}
Ext.extend(Srims.performance.PerformanceVoucherShowPanel_BasicForm, Ext.form.FormPanel, {});
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherShowPanel_ToolBar = function(voucher, store, panelId, isFinanceManage) {

    //fields
    this._voucher = voucher;
    this._panelId = panelId;
    this._store = store;
    //controls
    this._buttonSignIn = new Ext.Toolbar.Button({
        iconCls: 'icon-sign-in',
        text: '签收',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        handler: function() {
            titile = '签收凭单';
            message = '你确定要签收这张凭单吗？';
            action = 'signIn';
            methodName = '/VoucherSignIn';
            Srims.performance.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>签收凭单</b><br/>签收凭单'
    });

    this._buttonReturn = new Ext.Toolbar.Button({
        iconCls: 'icon-return',
        text: '退回',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        hidden: true,
        handler: function() {
            titile = '退回凭单';
            message = '你确定要退回这张凭单吗？';
            action = 'return';
            methodName = '/VoucherReturn';
            Srims.performance.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>退回凭单</b>、'
    });

    this._buttonAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-allocate',
        text: '分配',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        hidden: true,
        handler: function() {
            Srims.finance.allocateVoucher(this.voucher, this.store);
        },
        tooltip: '<b>分配</b>'
    });

    this._buttonCancleAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel-allocate',
        text: '取消分配',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        handler: function() {
            titile = '取消分配凭单';
            message = '你确定要取消这张凭单的分配吗？';
            action = 'cancel';
            methodName = '/VoucherCancleAllocate';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>取消分配</b>'
    });

    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        hidden: true,
        handler: function() {
            titile = '打印凭单';
            message = '你确定要打印这张凭单吗？';
            action = 'print';
            methodName = '/VoucherPrint';
            if (this.voucher.get('accountBookNumber').substring(0, 4) == "9999") {
                Ext.Msg.show({
                    title: '不能打印',
                    msg: '账本号对应的学院为其它，请找超级管理员手动修改账本号。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
                Srims.performance.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
            }
        },
        tooltip: '<b>打印凭单</b>'
    });
    this._buttonResetPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print-reset',
        text: '重置打印',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        hidden: true,
        handler: function() {
            titile = '重置打印';
            message = '你确定要重置打印这张凭单吗？';
            action = 'resetPrint';
            methodName = '/VoucherResetPrint';
            Srims.performance.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>重置打印</b>'
    });
    this._buttonShowFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '查看分配信息',
        minWidth: 60,
        voucher: this._voucher,
        handler: function() {
            Srims.performance.showVoucherFundAllocationInfo(this.voucher);
        },
        hidden: true,
        tooltip: '<b>查看该凭单对应的经费分配情况</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.performance.PerformanceVoucherService + '/GetById',
                params: {
                    voucherId: this.voucher.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.performance.PerformanceVoucherXmlReader()
                    });
                    var currentVoucher = store.getAt(0);
                    var panel = Ext.getCmp(isFinanceManage ? 'VoucherFinanceShowPanel' : 'VoucherShowPanel' + currentVoucher.get('id'));
                    panel.resetValues(currentVoucher);
                    panel._stateHistoryForm._store.load();
                }
            });
        },
        tooltip: '<b>刷新凭单</b><br/>更新凭单显示信息'
    });
    //initial
    this._buttonPrint.setVisible(voucher.get('hasPermission_Print'));
    this._buttonPrint.setDisabled(!voucher.get('canPrint'));

    this._buttonResetPrint.setVisible(voucher.get('hasPermission_ResetPrint'));
    this._buttonResetPrint.setDisabled(!voucher.get('canResetPrint'));

    this._buttonShowFundAllocation.setVisible(voucher.get('hasPermission_ShowFundAllocation'));
    this._buttonShowFundAllocation.setDisabled(!voucher.get('canShowFundAllocation'));

    this._buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
    this._buttonSignIn.setDisabled(!voucher.get('canSignIn'));

    this._buttonReturn.setVisible(voucher.get('hasPermission_ReturnVoucher'));
    this._buttonReturn.setDisabled(!voucher.get('canReturnVoucher'));

    this._buttonAllocate.setVisible(voucher.get('hasPermission_FinanceAllocate'));
    this._buttonAllocate.setDisabled(!voucher.get('canFinanceAllocate'));

    this._buttonCancleAllocate.setVisible(voucher.get('hasPermission_CancelFinanceAllocate'));
    this._buttonCancleAllocate.setDisabled(!voucher.get('canCancelFinanceAllocate'));

    var items;
    if (isFinanceManage)
        items = [this._buttonSignIn, this._buttonReturn, this._buttonAllocate, this._buttonCancleAllocate, new Ext.Toolbar.Fill(), this._buttonRefresh];
    else
        items = [this._buttonPrint, this._buttonResetPrint, this._buttonShowFundAllocation, new Ext.Toolbar.Fill(), this._buttonRefresh];
    Srims.performance.PerformanceVoucherShowPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });

}
Ext.extend(Srims.performance.PerformanceVoucherShowPanel_ToolBar, Ext.Toolbar);

if (!Srims.performance)
    Ext.namespace("Srims.performance");

Ext.namespace('Srims.performance.VoucherState');

Srims.performance.VoucherState.UnPrinted = 'UnPrinted';
Srims.performance.VoucherState.NotSignIn = 'NotSignIn';
Srims.performance.VoucherState.SignIn = 'SignIn';
Srims.performance.VoucherState.Allocated = 'Allocated';

Srims.performance.VoucherStateRender = function(value) {
    switch (value) {
        case 'UnPrinted':
            return '审核通过/未打印';
        case 'NotSignIn':
            return '已打印/未签收';
        case 'SignIn':
            return '签收/未分配';
        case 'Allocated':
            return '已分配';
        case 'WaitingCensor':
            return '未审核';
        case 'Canceled':
            return '作废';
        case 'Reject':
            return '审核驳回';
        default:
            return '未知';
    }
}
Srims.performance.FinanceVoucherState = "NotSignIn,SignIn,Allocated";
Srims.performance.VoucherStateFilterItems = [{
    id: 'UnPrinted',
    text: '未打印'
}, {
    id: 'NotSignIn',
    text: '已打印/未签收'
}, {
    id: 'SignIn',
    text: '签收/未分配'
}, {
    id: 'Allocated',
    text: '已分配'
}];

    Srims.performance.VoucherStateStore = [['UnPrinted', '未打印'], ['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
    Srims.performance.VoucherStateForFinanceStore = [['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];

if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherStateHistory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

    Srims.data.Entity.apply(Srims.performance.PerformanceVoucherStateHistory);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherStateHistoryColumnModel = function() {
    Srims.performance.PerformanceVoucherStateHistoryColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.performance.VoucherStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        header: "备注",
        dataIndex: 'remark'
}])
    }
    Ext.extend(Srims.performance.PerformanceVoucherStateHistoryColumnModel, Ext.grid.ColumnModel)

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(voucherId) {
        Srims.performance.PerformanceVoucherStateHistoryStore.superclass.constructor.call(this, new Srims.performance.PerformanceVoucherStateHistoryXmlReader(), Srims.service.performance.PerformanceVoucherStateHistoryService + '/GetVoucherStateHistories', {
            PerformanceVoucherID: voucherId
        });
    }
});
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceVoucherStateHistoryXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceVoucherStateHistory);
    }
});

if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel_StateHistoryForm = function(voucher) {
    this._voucher = voucher;
    this._store = new Srims.performance.PerformanceVoucherStateHistoryStore(voucher.get('id'));

    this._columnModel = new Srims.performance.PerformanceVoucherStateHistoryColumnModel();

    this._gridPanelVoucherStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有凭单状态历史信息'
        }
    });

    Srims.performance.PerformanceVoucherShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '凭单状态历史信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelVoucherStateHistory]
    });

    this._store.load();
}

Ext.extend(Srims.performance.PerformanceVoucherShowPanel_StateHistoryForm, Ext.form.FormPanel, {});

if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel_FundAllocationForm = function(voucher) {
    this._voucher = voucher;
    this._voucherFundAllocation = Srims.performance.getFundAllocationFromVoucher(this._voucher);
    return new Srims.performance.PerformanceAllocationShowPanel_BasicForm(this._voucherFundAllocation);
}
Srims.performance.getFundAllocationFromVoucher = function(voucher) {
    var fundAllocation = new Srims.performance.PerformanceAllocation({});
    fundAllocation.set('allocationDateTime', voucher.get('fundAllocationDateTime'));
    fundAllocation.set('performanceTotal', voucher.get('totalPerformancePay'));
    fundAllocation.set('performancePay', voucher.get('allocatedPerformancePay'));

    fundAllocation.set('dateTime', voucher.get('fundAllocationStateDateTime'));
    fundAllocation.set('operator', voucher.get('fundAllocationStateOperator'));
    fundAllocation.set('remark', voucher.get('fundAllocationStateRemark'));
    fundAllocation.set('state', voucher.get('fundAllocationState'));

    fundAllocation.set('projectName', voucher.get('projectName'));
    fundAllocation.set('projectTypeName', voucher.get('projectType'));
    fundAllocation.set('projectPricinpalName', voucher.get('projectPrincipal'));
    fundAllocation.set('arrivedOverheadexpensesExpert', voucher.get('performanceAllocationExpertTotal'));
    fundAllocation.set('arrivedPerformance', voucher.get('performanceAllocationArrivedPerformance'));

    return fundAllocation;
}

if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceVoucherShowPanel_FinanceForm = function(voucher) {
    this._voucher = voucher;
    this._voucherFinance = Srims.performance.getFinanceFromVoucher(this._voucher);
    this._isBorrow = voucher.get('isBorrow');
    return new Srims.fund.FinanceShowForm(this._voucherFinance, this._isBorrow);
}
Srims.performance.getFinanceFromVoucher = function(voucher) {
    var finance = new Srims.fund.Finance({});
    finance.set('amount', voucher.get('financeAmount'));
    finance.set('receivedDate', voucher.get('financeReceivedDate'));
    finance.set('voucherNumber', voucher.get('financeVoucherNumber'));
    finance.set('abstract', voucher.get('financeAbstract'));

    return finance;
}

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherQueryWindow = function(id, store, queryParams, isFinanceManage) {

    this._id = id;
    this._store = store;
    this._params = queryParams;

    this._basicPanel = new Srims.performance.PerformanceVoucherQueryWindow_InforPanel(isFinanceManage);

    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function() {
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function() {
            var window = this.window;
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    Srims.performance.PerformanceVoucherQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '凭单查询',
        iconCls: 'icon-voucher-query',
        width: 603,
        height: 226,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 600,
            layout: 'form',
            labelWidth: 90,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });

    this.getParams = function() {
        var params = this._params;
        this._basicPanel.buildParams(params);
        if (isFinanceManage && !params.voucherState)
            params.voucherState = Srims.fund.FinanceVoucherState;
        return params;
    }
    this.clearParams = function() {
        this._basicPanel.clearParams();
    }

    this.query = function(button) {
        var window = button.window;
        window.getParams();

        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.performance.PerformanceVoucherQueryWindow, Ext.Window);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherEditAccountBookNumberWindow = function(id, voucher, fundAllocation) {

    this._voucher = voucher;
    this._fundAllocation = fundAllocation;

    this._InforPanel = new Srims.performance.PerformanceVoucherEditAccountBookNumberWindow_InforPanel();
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '修 改',
        window: this
    });

    this._fieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        allowBlank: false,
        value: this._voucher.get('accountBookNumber'),
        width: 160
    });

    Srims.performance.PerformanceVoucherEditAccountBookNumberWindow.superclass.constructor.call(this, {
        id: id,
        title: '编辑账本号',
        width: 400,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._InforPanel, new Ext.Panel({
            layout: 'form',
            bodyStyle: 'padding:5px 10px 0 10px',
            height: 70,
            frame: true,
            labelWidth: 50,
            items: [this._fieldAccountBookNumber]
        })],

        buttons: [this._buttonSave, this._buttonClose]
    });

    this.validateAccountBookNumber = function() {
        var accountBookNumber = this.getValue();
        var fundMemberCollegeCode = String.isEmpty(this.window._voucher.get('expertCollegeCode')) ? '' : this.window._voucher.get('expertCollegeCode').substr(0, 1);
        var projectTypePreCode = this.window._voucher.get('projectTypePreCode');

        //账本号只能是数字和字母
        var accountBookNumberpattern = /^[A-Z|a-z|0-9]{10}$/;
        var accountBookNumberWithDivisionpattern = /^[A-Z|a-z|0-9]{4}-[A-Z|a-z|0-9]{6}$/;

        var fundMemberStore = this.window._fundAllocation.panel._formPanelFundMember._store;
        var fundMembers = fundMemberStore.getRange();

        for (var i = 0; i < fundMembers.length; i++) {
            if (this.window._voucher.get('expertID') == fundMembers[i].get('expertId'))
                continue;

            if (accountBookNumber == fundMembers[i].get('accountBookNumber')) {
                this.invalidText = '账本号不能重复';
                return false;
            }
        }
        //设定特殊用户
        var user = Srims.currentLoginLog.user;
        if (user.loginId == 'yuandong' || user.loginId == 'admin')
            return true;

        var DivisionPosition = accountBookNumber.indexOf('-');
        var hasDivision = DivisionPosition >= 0;

        if (!hasDivision && !accountBookNumberpattern.test(accountBookNumber) || hasDivision && !accountBookNumberWithDivisionpattern.test(accountBookNumber)) {
            this.invalidText = '账本号格式不对：账本号长度必须为10位；除第五位可以为为"-"外，账本号只能是数字或字母';
            return false;
        }
        if (fundMemberCollegeCode != '' && accountBookNumber.substr(0, 1) != fundMemberCollegeCode) {
            this.invalidText = '账本号的前四位必须是专家的院系代码';
            return false;
        }

        var accountBookNumberProjectTypeCode = hasDivision ? accountBookNumber.substr(5, 2) : accountBookNumber.substr(4, 2);
        if (!String.isEmpty(projectTypePreCode) && accountBookNumberProjectTypeCode != projectTypePreCode) {
            this.invalidText = '第五位和第六位必须是项目类型代码：' + projectTypePreCode;
            return false;
        }

        return true;
    }

    this._fieldAccountBookNumber.window = this;
    this._fieldAccountBookNumber.validator = this.validateAccountBookNumber;

    this.validate = function(preventMark) {
        var result = true;
        result = this._fieldAccountBookNumber.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceVoucherService + '/SaveForSetAccountBookNumber',
            params: {
                voucherId: this._voucher.get('id'),
                accountBookNumber: this._fieldAccountBookNumber.getValue()
            },
            scope: this,
            success: function() {
                this._fundAllocation.panel.refresh();
                this.close();
            }
        });
    }
    this.buttonSave_click = function(button, e) {
        var window = button.window;

        if (!window.validate(false))
            return;

        Ext.MessageBox.confirm('编辑账本号', '你确定输入的账本号正确吗？此操作不可撤销，不可修改。', function(buttonId) {
            if (buttonId == 'yes') {
                button.setText('正在修改');
                button.disable();

                window.save();
            }
        }, this);
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.performance.PerformanceVoucherEditAccountBookNumberWindow, Ext.Window);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherEditAccountBookNumberWindow_InforPanel = function() {
    Srims.performance.PerformanceVoucherEditAccountBookNumberWindow_InforPanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">警告：账本号编辑操作不可撤销，编辑后不可修改，请仔细填写！</span>'
    });
}
Ext.extend(Srims.performance.PerformanceVoucherEditAccountBookNumberWindow_InforPanel, Ext.Panel);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceDescendManageWindow = function(id, performance, store) {

    this._id = id;
    this._performance = performance;

    this._performanceDescendManageWindow_PerformanceInfoPanel = new Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel(performance);
    this._PerformanceAllocationManageWindow_PerformanceAllocationPanel = new Srims.performance.PerformanceAllocationManageWindow_PerformanceAllocationPanel(performance, this);

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });
    this._buttonDescend = new Ext.Button({
        minWidth: 80,
        text: '下 拨',
        window: this,
        handler: function() {
            var window = this.window;
            if (this.ownerCt._performance.get('isAllocated') == true) {
                Ext.Msg.alert('提示', '该笔钱无可下拨余额');
                return;
            }
            if (this.ownerCt._performance.get('isCancel') == true) {
                Ext.Msg.alert('提示', '该笔钱已作废');
                return;
            }
            Srims.performance.newPerformanceDescend(window._performanceDescendManageWindow_PerformanceInfoPanel._performance, window._PerformanceAllocationManageWindow_PerformanceAllocationPanel._gridPanelPerformanceAllocation.getStore(), window);
        }
    });

    var user = Srims.currentLoginLog.user;


    Srims.performance.PerformanceDescendManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '课题组间接费用和绩效下拨管理',
        iconCls: 'icon-fund-descend-Manage',
        width: 900,
        height: 580,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [this._performanceDescendManageWindow_PerformanceInfoPanel, this._PerformanceAllocationManageWindow_PerformanceAllocationPanel],
        buttons: [this._buttonDescend, this._buttonClose]
    });

    //    this.resetButtonVisibleAndDisabled = function(currentFinance) {

    //    }
    this.on('hide', function() {
        store.load();
    })
}
Ext.extend(Srims.performance.PerformanceDescendManageWindow, Ext.Window);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationManageWindow_PerformanceAllocationPanel = function(performance, window) {

    this._performance = performance;
    params = {
        performanceId: performance.get('id')
    }
    this._store = new Srims.performance.PerformanceAllocationStore(Srims.service.performance.PerformanceAllocationService + '/GetByPerformance', params);
    this._store.window = window;
    this._store.performance = performance;

    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.performance.PerformanceAllocationGridPanel_ColumnModel(false, this._selections);
    this._toolBar = new Srims.performance.PerformanceAllocationGridPanel_ToolBar(this._selections, this._store, id, params, true, this);

    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.height = 160;
    params.tbar = this._toolBar;
    params.defaultBBar = false;

    this._gridPanelPerformanceAllocation = new Srims.component.GridPanel(params);

    Srims.performance.PerformanceAllocationManageWindow_PerformanceAllocationPanel.superclass.constructor.call(this, {
        collapsible: true,
        title: '课题组间接费用和绩效记录',
        frame: true,
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: false,
        items: [this._gridPanelPerformanceAllocation]
    });
    this._store.load();

    this._gridPanelPerformanceAllocation.window = window;
    this._gridPanelPerformanceAllocation.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var performanceAllocation = grid.getStore().getAt(rowIndex);
        Srims.performance.showperformanceAllocationInfoByperformanceAllocation(performanceAllocation);
        window.hide();
    }
}
Ext.extend(Srims.performance.PerformanceAllocationManageWindow_PerformanceAllocationPanel, Ext.FormPanel, {});


if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel = function(performance) {

    this._performance = performance;

    this._textFieldProjectName = new Ext.form.TextField({
        fieldLabel: '对应项目',
        value: performance.get('projectName'),
        width: 300,
        readOnly: true
    });
    this._dateFieldReceiveDate = new Ext.form.TextField({
        fieldLabel: '到帐日期',
        value: Date.render(performance.get('foundationTime')),
        readOnly: true,
        width: 200
    });
    this._numberFieldArrivedPerformance = new Ext.form.TextField({
        fieldLabel: '到帐金额',
        value: Money.render(performance.get('arrivedPerformance')),
        readOnly: true,
        width: 300
    });
    this._numberFieldDescendPerformance = new Ext.form.TextField({
        fieldLabel: '已下拨金额',
        value: Money.render(performance.get('descendPerformance')),
        readOnly: true,
        width: 200
    });

    this._checkboxIsCancel = new Ext.form.Checkbox({
        fieldLabel: '是否作废',
        checked: performance.get('isCancel'),
        readOnly: true
    });
    this._checkboxIsAllocated = new Ext.form.Checkbox({
        fieldLabel: '是否全部下拨',
        checked: performance.get('isAllocated'),
        readOnly: true
    });


    this._toolBar = new Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar(performance, this);

    var columnOneItems = [this._textFieldProjectName, this._numberFieldArrivedPerformance, this._checkboxIsAllocated];
    var columnTowItems = [this._dateFieldReceiveDate, this._numberFieldDescendPerformance, this._checkboxIsCancel];
    Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 70,
        tbar: this._toolBar,
        items: [new Ext.Panel({
            width: 900,
            layout: 'column',
            items: [new Ext.Panel({
                columnWidth: .6,
                labelWidth: 90,
                layout: 'form',
                items: columnOneItems
            }), new Ext.Panel({
                columnWidth: .4,
                labelWidth: 90,
                layout: 'form',
                items: columnTowItems
            })]
        })]
    });

    this.resetComponentValues = function(currentperformance) {
        this._numberFieldDescendPerformance.setValue(Money.render(currentperformance.get('descendPerformance')));
        this._checkboxIsCancel.setValue(currentperformance.get('isCancel'));
        this._checkboxIsAllocated.setValue(currentperformance.get('isAllocated'));
        this._performance = currentperformance;
        if (this.ownerCt) {
            this.ownerCt._performance = currentperformance;
        }
    }
}
Ext.extend(Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel, Ext.form.FormPanel, {})


if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar = function(performance, window) {
    //fields
    this._performance = performance;
    this._window = window;

    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">绩效到帐基本信息</b>',
        minWidth: 60
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        window: this._window,
        performance: this._performance,
        handler: function() {
            var store = new Srims.performance.PerformanceSimpleStore(Srims.service.performance.PerformanceService + '/GetByID', {
                performanceId: this.performance.get('id')
            });
            store.window = this.window;
            store.on('load', function() {
                var currentperformance = this.getAt(0);
                this.window.resetComponentValues(currentperformance);
            });
            store.load();
        },
        tooltip: '<b>刷新绩效到帐</b><br/>更新绩效到帐信息'
    });


    var items = [this._buttonHeader, new Ext.Toolbar.Fill(), this._buttonRefresh];

    Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
}
Ext.extend(Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar, Ext.Toolbar);

if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceDescendWindow = function(id, performance, performanceAllocation, store, manageWindow) {

    this._id = id;
    this._store = store;
    this._performance = performance;
    this._performanceAllocation = performanceAllocation;
    this._manageWindow = manageWindow;

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });


    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: '下拨金额(万元)',
        value: this._performanceAllocation.get('amount'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });

    Srims.performance.PerformanceDescendWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '课题组间接费用和绩效',
        width: 440,
        height: 160,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._numberFieldFundAmount],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.validateFundAmount = function() {
        var performance = this.window._performance;
        var performanceAllocation = this.window.__performanceAllocation;

        if (this.getMoney() <= 0) {
            this.invalidText = '下拨金额必须大于0';
            return false;
        }
        var UndescendAmount = performance.get('arrivedPerformance') - performance.get('descendPerformance')
        if (this.getMoney() > UndescendAmount) {
            this.invalidText = '下拨金额不能大于经费到帐信息的未下拨金额' + Money.render(UndescendAmount);
            return false;
        }

        return true;
    }

    this._numberFieldFundAmount.window = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;

    this.validate = function(preventMark) {
        var result = true;

        result = this._numberFieldFundAmount.isValid(preventMark) && result;

        return result;
    }
    this.assginValues = function(params) {
        params.performanceID = this._performance.get('id');
        params.amount = this._numberFieldFundAmount.getMoney();
    }
    this.save = function() {
        var params = {};
        this.assginValues(params);

        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceAllocationService + '/Save',
            params: params,
            scope: this,
            success: function(response) {
                Srims.performance.PerformanceCallBack(this._manageWindow, response, store, this, true);
            }
        });
    }
    this.buttonSave_click = function(button, e) {
        var window = button.window;

        if (!window.validate(false))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();

        store.load();
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.performance.PerformanceDescendWindow, Ext.Window);
/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceAllocationGridPanel_GridFilters = function() {
    Srims.performance.PerformanceGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'projectName'
        }, {
            type: 'string',
            dataIndex: 'typeName'
        }, {
            type: 'string',
            dataIndex: 'projectPricinpalName'
        }
        
]
    });
}
Ext.extend(Srims.performance.PerformanceAllocationGridPanel_GridFilters, Ext.grid.GridFilters);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundMemberXmlReader.superclass.constructor.call(this, Srims.fund.FundMember);
    }
});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundMemberStore.superclass.constructor.call(this, new Srims.fund.FundMemberXmlReader(), load_url, params);
    }
});


if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundMember = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'expertNumber',
    type: 'string',
    mapping: 'ExpertNumber'
}, {
    name: 'isExpertSecondCollege',
    type: 'string',
    mapping: 'IsExpertSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'expertId',
    type: 'int',
    mapping: 'ExpertId'
}, {
    name: 'hasPermission_ResetAccountBookNumber',
    type: 'bool',
    mapping: 'HasPermission_ResetAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canResetAccountBookNumber',
    type: 'bool',
    mapping: 'CanResetAccountBookNumber',
    convert: Boolean.toBoolean
}]);

    Srims.data.Entity.apply(Srims.fund.FundMember);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberGridPanel_ColumnModel = function(){
    Srims.fund.FundMemberGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true
    }, {
        header: '专家姓名',
        dataIndex: 'expertName',
        width: 100
    }, {
        header: '工作证号',
        dataIndex: 'expertNumber',
        width: 100
    }, {
        id: 'accountBookNumber',
        header: '账本号',
        dataIndex: 'accountBookNumber'
    }])
}
Ext.extend(Srims.fund.FundMemberGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.Project = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'outsourcingAlreadyAmountString',
    type: 'string',
    mapping: 'OutsourcingAlreadyAmountString'
}, {
    name: 'trueOverheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'TrueOverheadExpensesAlreadyIn'
}, {
    name: 'outsourcingPlanAmountString',
    type: 'string',
    mapping: 'OutsourcingPlanAmountString'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'recoveryvoucherNumber',
    type: 'string',
    mapping: 'RecoveryvoucherNumber'
}, {
    name: 'roverheadExpensesAmount',
    type: 'string',
    mapping: 'RoverheadExpensesAmount'
}, {
    name: 'recoveryAmount',
    type: 'string',
    mapping: 'RecoveryAmount'
}, {
    name: 'rremark',
    type: 'string',
    mapping: 'Rremark'
}, {
    name: 'recoveryPrintState',
    type: 'string',
    mapping: 'RecoveryPrintState'
}, {
    name: 'recoveryPrintDate',
    type: 'string',
    mapping: 'RecoveryPrintDate'
},
{
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'principalNumber',
    type: 'string',
    mapping: 'PrincipalNumber'
}, {
    name: 'principalEmail',
    type: 'string',
    mapping: 'PrincipalEmail'
}, {
    name: 'isPrincipalSecondCollege',
    type: 'string',
    mapping: 'IsPrincipalSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'principalCollege',
    type: 'string',
    mapping: 'PrincipalCollege'
}, {
    name: 'principalId',
    type: 'string',
    mapping: 'PrincipalID'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'subjectName',
    type: 'string',
    mapping: 'SubjectName'
}, {
    name: 'firstLevelSubjectId',
    type: 'string',
    mapping: 'FirstLevelSubjectID'
}, {
    name: 'firstLevelSubjectName',
    type: 'string',
    mapping: 'FirstLevelSubjectName'
}, {
    name: 'secondLevelSubjectId',
    type: 'string',
    mapping: 'SecondLevelSubjectID'
}, {
    name: 'secondLevelSubjectName',
    type: 'string',
    mapping: 'SecondLevelSubjectName'
}, {
    name: 'researchType',
    type: 'string',
    mapping: 'ResearchType'
}, {
    name: 'cooperationType',
    type: 'string',
    mapping: 'CooperationType'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'isSecret',
    type: 'boolean',
    mapping: 'IsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'baseId',
    type: 'string',
    mapping: 'BaseID'
}, {
    name: 'baseName',
    type: 'string',
    mapping: 'BaseName'
}, {
    name: 'principalDelegate',
    type: 'string',
    mapping: 'PrincipalDelegate'
}, {
    name: 'principalDelegateId',
    type: 'string',
    mapping: 'PrincipalDelegateID'
}, {
    name: 'creator',
    type: 'string',
    mapping: 'Creator'
}, {
    name: 'createDate',
    type: 'date',
    mapping: 'CreateDate'
}, {
    name: 'corporationPlace',
    type: 'string',
    mapping: 'CorporationPlace'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'taskComingFrom',
    type: 'string',
    mapping: 'TaskComingFrom'
}, {
    name: 'isHorizontal',
    type: 'boolean',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'rankId',
    type: 'int',
    mapping: 'RankID'
}, {
    name: 'rankName',
    type: 'string',
    mapping: 'RankName'
}, {
    name: 'typeId',
    type: 'int',
    mapping: 'TypeID'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'typeShortName',
    type: 'string',
    mapping: 'TypeShortName'
}, {
    name: 'supportCategoryId',
    type: 'int',
    mapping: 'SupportCategoryID'
}, {
    name: 'supportCategoryName',
    type: 'string',
    mapping: 'SupportCategoryName'
}, {
    name: 'supportFieldId',
    type: 'int',
    mapping: 'SupportFieldID'
}, {
    name: 'supportFieldName',
    type: 'string',
    mapping: 'SupportFieldName'
}, {
    name: 'supportSubFieldId',
    type: 'int',
    mapping: 'SupportSubFieldID'
}, {
    name: 'supportSubFieldName',
    type: 'string',
    mapping: 'SupportSubFieldName'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'fundAlreadyHardware',
    type: 'int',
    mapping: 'FundAlreadyHardware'
}, {
    name: 'fundAlreadyIn',
    type: 'int',
    mapping: 'FundAlreadyIn'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'fundAlreadyTotal',
    type: 'int',
    mapping: 'FundAlreadyTotal'
}, {
    name: 'fundContract',
    type: 'int',
    mapping: 'FundContract'
}, {
    name: 'fundFrom',
    type: 'string',
    mapping: 'FundFrom'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}, {
    name: 'fundPlanHardware',
    type: 'int',
    mapping: 'FundPlanHardware'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'fundPlanIn',
    type: 'int',
    mapping: 'FundPlanIn'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'overheadExpenseInTotal',
    type: 'int',
    mapping: 'OverheadExpenseInTotal'
}, {
    name: 'overheadExpenseOutTotal',
    type: 'int',
    mapping: 'OverheadExpenseOutTotal'
}, {
    name: 'overheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyIn'
}, {
    name: 'overheadExpensesAlreadyOut',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyOut'
}, {
    name: 'overheadExpensesInStandard',
    type: 'int',
    mapping: 'OverheadExpensesInStandard'
}, {
    name: 'performancePayStandard',
    type: 'int',
    mapping: 'PerformancePayStandard'
}, {
    name: 'fundManageProportion',
    type: 'int',
    mapping: 'FundManageProportion'	//国家规定管理费比例
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'//校内绩效工资
}, {
    name: 'performancePayAlready',
    type: 'int',
    mapping: 'PerformancePayAlready'//已分配绩效工资
}, {
    name: 'receivedOverheadExpenses',
    type: 'int',
    mapping: 'ReceivedOverheadExpenses'	//追缴单-已收管理费
}, {
    name: 'overheadExpensesAmount',
    type: 'int',
    mapping: 'OverheadExpensesAmount'	//追缴单-应收管理费
}, {
    name: 'recoveryAmount',
    type: 'int',
    mapping: 'RecoveryAmount'	//追缴金额 
}, {
    name: 'printDateTime',
    type: 'string',
    mapping: 'PrintDateTime'	//追缴单-打印时间
}, {
    name: 'isPrint',
    type: 'string',
    mapping: 'IsPrint'	//追缴单-是否已打印
}, {
    name: 'equipmentCost',
    type: 'int',
    mapping: 'EquipmentCost'
}, {
    name: 'borrowAmount',
    type: 'int',
    mapping: 'BorrowAmount'
}, {
    name: 'returnAmount',
    type: 'int',
    mapping: 'ReturnAmount'
}, {
    name: 'projectAccountNumber',
    type: 'string',
    mapping: 'ProjectAccountNumber'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_WithDraw',
    type: 'boolean',
    mapping: 'HasPermission_WithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'canWithDraw',
    type: 'boolean',
    mapping: 'CanWithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Terminate',
    type: 'boolean',
    mapping: 'HasPermission_Terminate',
    convert: Boolean.toBoolean
}, {
    name: 'canTerminate',
    type: 'boolean',
    mapping: 'CanTerminate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectMember',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMember',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectMember',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectMember',
    type: 'boolean',
    mapping: 'CanShow_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanEdit_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanShow_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectContract',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMainContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMainContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectContract',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectContract',
    type: 'boolean',
    mapping: 'CanShow_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectContract',
    type: 'boolean',
    mapping: 'CanCensor_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectDoucment',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectDoucment',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectDocument',
    type: 'boolean',
    mapping: 'CanEdit_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectDocument',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectDocument',
    type: 'boolean',
    mapping: 'CanShow_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectDocument',
    type: 'boolean',
    mapping: 'CanCensor_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canRequire_ProjectDocument',
    type: 'boolean',
    mapping: 'CanRequire_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitStart',
    type: 'boolean',
    mapping: 'CanSubmitStart',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitEnd',
    type: 'boolean',
    mapping: 'CanSubmitEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoStart',
    type: 'boolean',
    mapping: 'CanUndoStart',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoEnd',
    type: 'boolean',
    mapping: 'CanUndoEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorStart',
    type: 'boolean',
    mapping: 'CanCensorStart',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorEnd',
    type: 'boolean',
    mapping: 'CanCensorEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canSetDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanSetDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanClearDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearProjectAccountBookNumber',
    type: 'boolean',
    mapping: 'CanClearProjectAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canCompleteIn',
    type: 'boolean',
    mapping: 'CanCompleteIn',
    convert: Boolean.toBoolean
}, {
    name: 'campusIndirectCosts',
    type: 'int',
    mapping: 'CampusIndirectCosts'
}, {
    name: 'overheadExpenseMiddleTotal',
    type: 'int',
    mapping: 'OverheadExpenseMiddleTotal'
}, {
    name: 'overheadExpenseExpertTotal',
    type: 'int',
    mapping: 'OverheadExpenseExpertTotal'
}

]);
Srims.data.Entity.apply(Srims.projects.Project);
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectStore.superclass.constructor.call(this, new Srims.projects.ProjectXmlReader(), load_url, params);
    },
});

Srims.projects.ProjectSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectSimpleStore.superclass.constructor.call(this, new Srims.projects.ProjectSimpleXmlReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectXmlReader.superclass.constructor.call(this, Srims.projects.Project);
    },
    readRecords: function(responseXML){
        var result = Srims.projects.ProjectXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.fundSum = parseInt(Ext.DomQuery.selectValue("FundSum", responseXML), 10);
        result.records.fundReceivedSum = parseInt(Ext.DomQuery.selectValue("FundReceivedSum", responseXML), 10);
        
        return result;
    }
});
Srims.projects.ProjectSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectXmlReader.superclass.constructor.call(this, Srims.projects.Project);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectLevel');

Srims.projects.ProjectLevel.Perside = 'Perside';
Srims.projects.ProjectLevel.Join = 'Join';
Srims.projects.ProjectLevel.Addition = 'Addition';
Srims.projects.ProjectLevel.Coordinate='Coordinate';

Srims.projects.projectLevelRender = function(value, metadata){
    switch (value) {
        case 'Join':
            return '参与';
        case 'Perside':
            return '主持';
        case 'Addition':
            return '附加';
        case 'Coordinate':
        	return '配套';
        default:
            return '未知';
    }
}
Srims.projects.projectLevelStore = [['Perside', '主持'], ['Join', '参与'], ['Addition', '附加'],['Coordinate','配套']];

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectState');

Srims.projects.ProjectState.WaitingStartInformation = 'WaitingStartInformation';
Srims.projects.ProjectState.WaitingStartCensor = 'WaitingStartCensor';
Srims.projects.ProjectState.ProjectProcessing = 'ProjectProcessing';
Srims.projects.ProjectState.WaitingEndCensor = 'WaitingEndCensor';
Srims.projects.ProjectState.ProjectEnd = 'ProjectEnd';
Srims.projects.ProjectState.ProjectDelete = 'Deleted';
Srims.projects.ProjectState.WithDraw = 'WithDraw';
Srims.projects.ProjectState.Terminate = 'Terminate';

Srims.projects.projectStateRender = function(value, metadata){
    switch (value) {
        case 'WaitingStartInformation':
            return '填写立项信息';
        case 'WaitingStartCensor':
            return '等待立项审核';
        case 'ProjectProcessing':
            return '在研';
        case 'WaitingEndCensor':
            return '等待结项审核';
        case 'ProjectEnd':
            return '已结项';
        case 'WithDraw':
            return '撤销';
        case 'Terminate':
            return '终止';
        case 'Defer':
            return '延期';
        case 'DeferEnd':
            return '延期结题';
        default:
            return '未知';
    }
}
Srims.projects.projectStateFilterItems = [{
    id: 'WaitingStartInformation',
    text: '填写立项信息'
}, {
    id: 'WaitingStartCensor',
    text: '等待立项审核'
}, {
    id: 'ProjectProcessing',
    text: '在研'
}, {
    id: 'WaitingEndCensor',
    text: '等待结项审核'
}, {
    id: 'ProjectEnd',
    text: '已结项'
}, {
    id: 'Defer',
    text: '延期'
}, {
    id: 'DeferEnd',
    text: '延期结题'
}];

Srims.projects.projectStateStore = [['WaitingStartInformation', '填写立项信息'], ['WaitingStartCensor', '等待立项审核'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateEditStore = [['WaitingStartInformation', '填写立项信息'], ['ProjectProcessing', '在研'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateQueryStore = [['WaitingStartInformation', '未提交'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['WithDraw', '撤销'], ['Terminate', '终止'], ['Defer', '延期'], ['DeferEnd', '延期结题']];

if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.douments) 
    Ext.namespace('Srims.douments');

Srims.projects.ProjectShowPanel_ContractForm = function(projectId){
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: projectId == undefined ? 0 : projectId
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel();
    
    this._gridPanelContract = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'type',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有合同信息'
        }
    });
    Srims.projects.ProjectShowPanel_ContractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '合同信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelContract]
    });
    if (projectId) 
        this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this._gridPanelContract.on('celldblclick', onCellDblClick);
    
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_ContractForm, Ext.form.FormPanel, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');
if (!Srims.fund)
    Ext.namespace('Srims.fund');
//纵向项目列表
Srims.projects.listVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanl_VerticalProjectList_ID, '纵向项目列表', false, 'icon-project-vertical-list', showQueryWindow, undefined, undefined);
}
Srims.projects.listWaitingStartCensorVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingStartCensorVerticalProjectList_ID, '等待立项审核纵向项目列表', false, 'icon-project-vertical-censor-start', showQueryWindow, Srims.projects.ProjectState.WaitingStartCensor, undefined);
}
Srims.projects.listWaitingEndCensorVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingEndCensorVericalProjectList_ID, '等待结项审核纵向项目列表', false, 'icon-project-vertical-censor-end', showQueryWindow, Srims.projects.ProjectState.WaitingEndCensor, undefined);
}
//横向项目列表
Srims.projects.listHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanl_HorizontalProjectList_ID, '横向项目列表', true, 'icon-project-horizontal-list', showQueryWindow, undefined, undefined);
}
Srims.projects.listWaitingStartCensorHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingStartCensorHorizontalProjectList_ID, '等待立项审核横向项目列表', true, 'icon-project-horizontal-censor-start', showQueryWindow, Srims.projects.ProjectState.WaitingStartCensor, undefined);
}
Srims.projects.listWaitingEndCensorHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingEndCensorHorizontalProjectList_ID, '等待结项审核横向项目列表', true, 'icon-project-horizontal-censor-end', showQueryWindow, Srims.projects.ProjectState.WaitingEndCensor, undefined);
}
//需添加追缴单的项目列表
Srims.projects.listRecoveryProject = function() {
    Srims.projects._listRecoveryProject(Srims.projects.GridPanl_RecoveryProjectList_ID, '间接费用调整项目列表', 'icon-project-horizontal-list', undefined);
}
//专家项目列表
Srims.projects.listMyPrincipalProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyPrincipalProjectList, '我负责的项目列表', undefined, 'icon-project-my-project-principal', false, undefined, 'Principal');
}
Srims.projects.listMyParticipateProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyParticipateProjectList, '我参与的项目列表', undefined, 'icon-project-my-project-join', false, undefined, 'Participate');
}
Srims.projects.listMyDelegateProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyDelegateProjectList, '我被委托的项目列表', undefined, 'icon-project-my-project-delegate', false, undefined, 'Delegate');
}

Srims.projects._listRecoveryProject = function(panelId, name, iconCls, expertAttendType) {
    var projectStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel)
        projectStore = panel.getStore();
    else {

        queryParams = getRecoveryProjectQueryParams(expertAttendType);
        projectStore = new Srims.projects.RecoveryProjectStore(Srims.service.projects.ProjectService + '/RecoveryQuery', queryParams);
        panel = new Srims.projects.RecoveryProjectGridPanel(panelId, projectStore, name, iconCls, expertAttendType, queryParams);
        panel.getStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
}


Srims.projects._listProject = function(panelId, name, isHorizontal, iconCls, showQueryWindow, projectState, expertAttendType) {
    var projectStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel)
        projectStore = panel.getStore();
    else {
        queryParams = getProjectQueryParams(isHorizontal, projectState, expertAttendType);
        projectStore = new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/Query', queryParams);
        panel = new Srims.projects.ProjectGridPanel(panelId, projectStore, name, iconCls, isHorizontal, projectState, expertAttendType, queryParams);
        panel.getStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        queryParams = projectStore.getExtraParams();
        Srims.projects.showProjectQueryWindow(panelId + '_QueryWindow', projectStore, isHorizontal, queryParams, panel);
    }
}
function getRecoveryProjectQueryParams(expertAttendType) {
    var params = {};
    if (expertAttendType)
        params.expertAttendType = expertAttendType;
    return params;
}
function getProjectQueryParams(isHorizontal, projectState, expertAttendType) {
    var params = {};

    if (projectState) {
        params.state = projectState;
        params.isCensor = true;
    }
    if (expertAttendType)
        params.expertAttendType = expertAttendType;
    if (isHorizontal != undefined)
        params.isHorizontal = isHorizontal;

    return params;
}

Srims.projects.showProjectQueryWindow = function(id, store, isHorizontal, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.projects.ProjectQueryWindow(id, store, isHorizontal, queryParams);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.projects.confirmProjectPrincipalToSendEmail = function(queryParams) {
    var projectStore = undefined;
    var panelId = 'projectGridPanel_SendEmail';
    var panel = Srims.WorkSpace.active(panelId);

    if (panel)
        Srims.WorkSpace.getWorkSpace().remove(panel);

    projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/QueryForEmail', queryParams);
    panel = new Srims.projects.ProjectEmailGridPanel(panelId, projectStore, '发送邮件项目列表', 'icon-email');
    panel.getStore().load();

    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.exportProject = function(filterParams, queryParams) {
    var windowId = 'ProjectExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.projects.ProjectService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('基本信息字段', Srims.projects.ProjectExport_Column.basic);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('类型信息字段', Srims.projects.ProjectExport_Column.Type);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('经费信息字段', Srims.projects.ProjectExport_Column.fund);

    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Project');
}
Srims.projects.newProject = function(isHorizontal) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    var startDate = new Date();
    var endDate = new Date(startDate.getFullYear() + 2, 11, 31);

    var project = new Srims.projects.Project({});
    project.set('isHorizontal', isHorizontal);
    project.set('level', Srims.projects.ProjectLevel.Perside);
    project.set('state', Srims.projects.ProjectState.WaitingStartInformation);
    project.set('startDate', startDate);
    project.set('endDate', endDate);
    if (userIsExpert)
        Srims.projects.showExpertGuidProjectEditPanel(project, userIsExpert);
    else {
        var panelId = isHorizontal ? Srims.projects.Panel_NewHorizontalProject_ID : Srims.projects.Panel_NewVerticalProject_ID;
        if (Srims.WorkSpace.active(panelId))
            return;

        var panel = new Srims.projects.ProjectEditPanel(panelId, project);
        Srims.WorkSpace.addPanel(panel);
    }
}

Srims.projects.editProject = function(project) {
    var panelId = 'ProjectEditPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;

    var panel = new Srims.projects.ProjectEditPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}

Srims.projects.showProject = function(project) {
    var panelId = 'ProjectShowPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId)) {
        Ext.getCmp(panelId).resetComponentValue(project);
        return;
    }
    var panel = new Srims.projects.ProjectShowPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.showProject_Recovery = function(project) {

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: project.get('pid')
        },
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectSimpleXmlReader()
            });
            var currentProject = store.getAt(0);

            var panelId = 'ProjectShowPanel' + project.get('pid');
            if (Srims.WorkSpace.active(panelId)) {
                return;
            }
            var panel = new Srims.projects.ProjectShowPanel(panelId, currentProject);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}
//编辑追缴单
Srims.projects.showRecoveryProject = function(project) {
    var panelId = 'RecoveryProjectShowPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId)) {
        return;
    }
    else {
        var panel = new Srims.projects.RecoveryProjectShowPanel(panelId, project);
        Srims.WorkSpace.addPanel(panel);
    }
}

Srims.projects.deleteProject = function(project) {
    var user = Srims.currentLoginLog.user;
    var gridPanelID;
    if (user.userRoleType == 'Expert') {
        if (user.name == project.get('principal'))
            gridPanelID = Srims.projects.GridPanel_MyPrincipalProjectList;
        else
            gridPanelID = Srims.projects.GridPanel_MyDelegateProjectList;
    }
    else
        gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanl_HorizontalProjectList_ID : Srims.projects.GridPanl_VerticalProjectList_ID;
    Srims.projects.saveForChangeState(project, Srims.projects.ProjectState.ProjectDelete, '', '/Delete', undefined, gridPanelID, '删除项目成功', '成功删除项目：' + project.get('name'));
}
Srims.projects.withDrawProject = function(project) {
    Srims.projects.endProjectUnNormal(project, Srims.projects.ProjectState.WithDraw, '/WithDraw', '撤销项目成功', '成功撤销项目：' + project.get('name'), undefined);
}
Srims.projects.terminateProject = function(project) {
    Srims.projects.endProjectUnNormal(project, Srims.projects.ProjectState.Terminate, '/Terminate', '终止项目成功', '成功终止项目：' + project.get('name'), undefined);
}
Srims.projects.endProjectUnNormal = function(project, projectState, subUrl, msg, msgInfo) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanl_HorizontalProjectList_ID : Srims.projects.GridPanl_VerticalProjectList_ID;
    Srims.projects.saveForChangeState(project, projectState, '', subUrl, undefined, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.censorStart_Pass = function(project, isCensorDocumentAndContract) {
    Srims.projects.censorStart(project, '', Srims.projects.ProjectState.ProjectProcessing, '/CensorStartPass', '审核通过立项申请成功', '成功审核通过项目：' + project.get('name') + '的立项申请', isCensorDocumentAndContract);
}
Srims.projects.censorStart_Reject = function(project, remark, isCensorDocumentAndContract) {
    Srims.projects.censorStart(project, remark, Srims.projects.ProjectState.WaitingStartInformation, '/CensorStartReject', '审核驳回立项申请成功', '成功审核驳回项目：' + project.get('name') + '的立项申请', isCensorDocumentAndContract);
}
Srims.projects.censorEnd_Pass = function(project) {
    var _params = {};
    _params.projectID = project.get('id');

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/CanEnd',
        params: _params,
        success: function(response) {

            if (Boolean.toBoolean(response.responseText)) {
                Srims.projects.censorEnd(project, '', Srims.projects.ProjectState.ProjectEnd, '/CensorEndPass', '审核通过结项申请成功', '成功审核通过项目：' + project.get('name') + '的结项申请');
            }
            else {
                Ext.Msg.show({
                    title: '不能结项',
                    msg: '该项目不能结项，请检查是否有主合同或者文档，并且都审核通过，或者经费是否分配完毕。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
            }

        }
    });
    //添加项目结项条件
    //Srims.projects.censorEnd(project, '', Srims.projects.ProjectState.ProjectEnd, '/CensorEndPass', '审核通过结项申请成功', '成功审核通过项目：' + project.get('name') + '的结项申请');
}
Srims.projects.censortEnd_Reject = function(project, remark) {
    Srims.projects.censorEnd(project, remark, Srims.projects.ProjectState.ProjectProcessing, '/CensorEndReject', '审核驳回结项申请成功', '成功审核驳回项目：' + project.get('name') + '的结项申请');
}
Srims.projects.censorStart = function(project, remark, projectState, subUrl, msg, msgInfo, isCensorDocumentAndContract) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanel_WaitingStartCensorHorizontalProjectList_ID : Srims.projects.GridPanel_WaitingStartCensorVerticalProjectList_ID;

    var pollActions = [];
    pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingStartCensorHorizontalProjectCount : Srims.Poll.getPollAction_WaitingStartCensorVerticalProjectCount;
    if (isCensorDocumentAndContract) {
        pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount : Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount;
        pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount : Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount;
    }

    Srims.projects.saveForChangeState(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, isCensorDocumentAndContract);
}
Srims.projects.censorEnd = function(project, remark, projectState, subUrl, msg, msgInfo) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanel_WaitingEndCensorHorizontalProjectList_ID : Srims.projects.GridPanel_WaitingEndCensorVericalProjectList_ID;

    var pollActions = [];
    pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingEndCensorHorizontalProjectCount : Srims.Poll.getPollAction_WaitingEndCensorVerticalProjectCount;

    Srims.projects.saveForChangeState(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.submitStart = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingStartCensor, '/SubmitStart', '提交立项申请成功', '成功提交项目：' + project.get('name') + '的立项申请', undefined);
}
Srims.projects.undoStart = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingStartInformation, '/UndoSubmitStart', '撤销立项申请成功', '成功撤销项目：' + project.get('name') + '的立项申请', undefined);
}
Srims.projects.submitEnd = function(project) {
    var _params = {};
    _params.projectID = project.get('id');

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/CanEnd',
        params: _params,
        success: function(response) {

            if (Boolean.toBoolean(response.responseText)) {
                Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingEndCensor, '/SubmitEnd', '提交结项申请成功', '成功提交项目：' + project.get('name') + '的结项申请', undefined);
            }
            else {
                Ext.Msg.show({
                    title: '不能提交结项申请',
                    msg: '该项目不能提交结项申请，请检查是否有主合同或者文档，并且都审核通过，或者经费是否分配完毕。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
            }

        }
    });
    //  Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingEndCensor, '/SubmitEnd', '提交结项申请成功', '成功提交项目：' + project.get('name') + '的结项申请', undefined);
}
Srims.projects.undoEnd = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.ProjectProcessing, '/UndoSubmitEnd', '撤销结项申请成功', '成功撤销项目：' + project.get('name') + '的结项申请', undefined);
}
Srims.projects.submitByPrincipal = function(project, projectState, subUrl, msg, msgInfo) {
    var user = Srims.currentLoginLog.user;
    var gridPanelID = project.get('principalId') == user.id ? Srims.projects.GridPanel_MyPrincipalProjectList : Srims.projects.GridPanel_MyDelegateProjectList;

    Srims.projects.saveForChangeState(project, projectState, '', subUrl, undefined, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.saveForChangeState = function(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, isCensorDocumentAndContract) {

    var _params = {};
    _params.projectID = project.get('id');
    _params.remark = remark;

    if (isCensorDocumentAndContract != undefined)
        _params.IsCensorDocumentAndContract = isCensorDocumentAndContract;

    project.beginEdit();
    project.set('state', projectState);
    project.commit();

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + subUrl,
        params: _params,
        success: function(response) {
            //从showPanel上改变项目状态
            var showPanel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
            if (showPanel) {
                if (projectState == Srims.projects.ProjectState.ProjectDelete)
                    Srims.WorkSpace.getWorkSpace().remove(showPanel);
                else {
                    //取得项目   
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });

                    var currentProject = store.getAt(0);
                    showPanel._formPanelBasic.resetComponentValue(currentProject);
                    showPanel._toolBar._resetButtonVisibleAndDisabled(currentProject);
                    showPanel._toolBar._resetButtonProject(currentProject);
                    showPanel._formPanelStateHistory._store.load();
                }
            }
            //执行轮询
            if (pollActions) {
                for (var i = 0; i < pollActions.length; i++)
                    Srims.Poll.startPollAction(pollActions[i]);
            }

            //刷新GridPanel
            var gridPanel = Ext.getCmp(gridPanelID);
            if (gridPanel) {
                if (projectState == Srims.projects.ProjectState.ProjectDelete)
                    Srims.WorkSpace.active(gridPanelID);
                Ext.getCmp(gridPanelID).getStore().load({
                    callback: function() {
                        Ext.Msg.show({
                            title: msg,
                            msg: msgInfo,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                });
            }
            else {
                Ext.Msg.show({
                    title: msg,
                    msg: msgInfo,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    });
}
Srims.projects.rejectProjectCensor = function(project, isStart) {
    var windowId = isStart ? 'rejectProjectCensorWindow_start' + project.get('id') : 'rejectProjectCensorWindow_end' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectCensorRejectWindow(windowId, project, isStart);
    window.show();
}
Srims.projects.showSetDelegatePrincipalWindow = function(projects, store) {
    var windowId = 'setDelegatePrincipalWindow';

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectSetDelegatePrincipalWindow(windowId, projects, store);
    window.show();
}
Srims.projects.clearDeletatePrincipal = function(projects, store) {
    Srims.projects.saveDelegatePrincipal(projects, '', '/ClearDelegatePrincipal', store, '成功取消委托负责人', '成功取消项目委托负责人');
}
Srims.projects.setDeletatePrincipal = function(projects, expertId, store) {
    Srims.projects.saveDelegatePrincipal(projects, expertId, '/SetDelegatePrincipal', store, '成功指定委托负责人', '成功指定项目委托负责人');
}
Srims.projects.saveDelegatePrincipal = function(projects, expertId, subUrl, store, msg, msgInfo) {
    var projectsId = '';
    for (var i = 0; i < projects.length; i++) {
        projectsId += projects[i].get('id') + ',';
    }

    var _params = {};
    _params.projectsID = projectsId;
    _params.principalDelegateId = expertId;

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + subUrl,
        params: _params,
        success: function(response) {
            store.load({
                callback: function() {
                    Ext.Msg.show({
                        title: msg,
                        msg: msgInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
            });
        }
    });
}
Srims.projects.showWaitingSetDelegateWindow = function() {
    var windowId = 'myProjectWaitingSetDelegateWindow';
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectWaitringSetDelegateWindow(windowId);

    window.show();
}

Srims.projects.showProjectMemberWindow = function(project) {
    var windowId = 'ProjectMemberWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectMemberWindow(windowId, project);
    else
        window._projectMemberGridPanel.getStore().load()
    window.show();
}
Srims.projects.newProjectMember = function(project, store) {
    var windowId = 'NewProjectMemberWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        var projectMember = new Srims.projects.ProjectMember({});
        window = new Srims.projects.ProjectMemberEditWindow(windowId, projectMember, project, store);
    }
    window.show();
}
Srims.projects.editProjectMember = function(project, projectMember, store) {
    var windowId = 'EditProjectMemberWindow' + projectMember.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.projects.ProjectMemberEditWindow(windowId, projectMember, project, store);
    }
    window.show();
}
Srims.projects.showPayPlanItemWindow = function(project) {
    var windowId = 'PayPlanItemWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.fund.PayPlanItemWindow(windowId, project);
    else
        window._payPlanItemGridPanel.getStore().load()
    window.show();
}
Srims.projects.newProjectPayPlanItem = function(project, store) {
    var windowId = 'NewProjectPayPlanItem' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        var projectPayPlanItem = new Srims.fund.PayPlanItem({});
        window = new Srims.fund.PayPlanItemEditWindow(windowId, projectPayPlanItem, project, store);
    }
    window.show();
}
Srims.projects.editProjectPayPlanItem = function(project, projectPayPlanItem, store) {
    var windowId = 'EditProjectPayPlanItem' + projectPayPlanItem.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.fund.PayPlanItemEditWindow(windowId, projectPayPlanItem, project, store);
    }
    window.show();
}
Srims.projects.showContractWindow = function(project) {
    var windowId = 'ContractWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.ContractWindow(windowId, project)
    else
        window._contractGridPanel.getStore().load();
    window.show();
}
Srims.projects.uploadMainContract = function(project, store) {
    Srims.projects.uploadContract(project, store, true);
}
Srims.projects.uploadOutContract = function(project, store) {
    Srims.projects.uploadContract(project, store, false);
}
Srims.projects.uploadContract = function(project, store, isMain) {
    var windowId = isMain ? ('submitMainContract' + project.get('id')) : ('submitOutContract' + project.get('id'));

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.documents.ContractUploadWindow(windowId, project, store, isMain);
    }
    window.show();
}
Srims.projects.deleteContract = function(project, contract, store) {
    Srims.documents.deleteResource(contract.get('contractResource'), contract.get('id'), Srims.service.documents.ContractService + '/Delete', store, '成功删除合同', '删除合同成功');
}
Srims.projects.downLoadContract = function(contract) {
    Srims.documents.downLoadResource(contract.get('contractResource'), '/GetContract');
}
Srims.projects.censorContractPass = function(contract, store, isHorizontal) {
    Srims.projects.censorContract(contract, Srims.CensorState.passed, '/CensorPass', store, isHorizontal, undefined);
}
Srims.projects.showCensorContractRejectWindow = function(contract, store, isHorizontal) {
    var windowId = 'censorContractRejectWindow' + contract.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.ContractCensorRejectWindow(windowId, contract, store, isHorizontal);

    window.show();
}
Srims.projects.censorContractReject = function(contract, store, isHorizontal, remark) {
    Srims.projects.censorContract(contract, Srims.CensorState.reject, '/CensorReject', store, isHorizontal, remark);
}
Srims.projects.censorContract = function(contract, censorState, subUrl, store, isHorizontal, remark) {
    var params = {};
    params.contractId = contract.get('id');
    if (remark != undefined)
        params.remark = remark;

    Ext.Ajax.request({
        url: Srims.service.documents.ContractService + subUrl,
        params: params,
        success: function() {
            store.load();
            isHorizontal ? Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount) : Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount);
        }
    });
}
Srims.projects.listWaitingCenorHorizontalProjecctContracts = function() {
    Srims.projects.listWaitingCensorContracts('WaitingCenorHorizontalProjecctContracts', '横向项目合同审核', true, 'icon-project-horizontal-censor-contract');
}
Srims.projects.listWaitingCenorVerticalProjecctContracts = function() {
    Srims.projects.listWaitingCensorContracts('WaitingCenorVerticalProjecctContracts', '纵向项目合同审核', false, 'icon-project-vertical-censor-contract');
}
Srims.projects.listWaitingCensorContracts = function(panelId, title, isHorizontal, iconCls) {
    var contractStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {
        isHorizontal: isHorizontal
    };
    if (panel)
        contractStore = panel.getStore();
    else {
        contractStore = new Srims.documents.ContractStore(Srims.service.documents.ContractService + '/GetWaitingCensorContracts', params);
        panel = new Srims.documents.ContractCensorGridPanel(panelId, title, contractStore, iconCls);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.showDocumentWindow = function(project) {
    var windowId = 'DocumentWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentWindow(windowId, project)
    else
        window._documentGridPanel.getStore().load();
    window.show();
}
Srims.projects.showRequireDocumentWindow = function(project, store) {
    var windowId = 'DocumentRequireWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentRequireWindow(windowId, project, store)
    window.show();
}
Srims.projects.uploadDocument = function(project, store) {
    var windowId = 'submitDocument' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.documents.DocumentUploadWindow(windowId, project, store);
    }
    window.show();
}
Srims.projects.downLoadDocument = function(document) {
    var documentResource = document.get('documentResource');
    if (documentResource == '' || documentResource == null || documentResource == undefined) {
        Ext.Msg.show({
            title: '文档查看失败',
            msg: '该文档还没有上传',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    Srims.documents.downLoadResource(document.get('documentResource'), '/GetDocument');
}
Srims.projects.deleteDocument = function(project, document, store) {
    Srims.documents.deleteResource(document.get('documentResource'), document.get('id'), Srims.service.documents.DocumentService + '/Delete', store, '成功删除文档', '删除文档成功');
}
Srims.projects.listWaitingCenorHorizontalProjecctDocuments = function() {
    Srims.projects.listWaitingCenorDocuments('WaitingCenorHorizontalProjecctDocuments', '横向项目文档审核', true, 'icon-project-horizontal-censor-document');
}
Srims.projects.listWaitingCenorVerticalProjecctDocuments = function() {
    Srims.projects.listWaitingCenorDocuments('WaitingCenorVerticalProjecctDocuments', '纵向项目文档审核', false, 'icon-project-vertical-censor-document');
}
Srims.projects.listWaitingCenorDocuments = function(panelId, title, isHorizontal, iconCls) {
    var documentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {
        isHorizontal: isHorizontal
    };

    if (panel)
        documentStore = panel.getStore();
    else {
        documentStore = new Srims.documents.DocumentStore(Srims.service.documents.DocumentService + '/GetWaitingCensorDocuments', params);
        panel = new Srims.documents.DocumentCensorGridPanel(panelId, title, documentStore, iconCls);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.censorDocumentPass = function(document, store, isHorizontal) {
    Srims.projects.censorDocument(document, Srims.CensorState.passed, '/CensorPass', store, isHorizontal, undefined);
}
Srims.projects.showCensorDocumentRejectWindow = function(document, store, isHorizontal) {
    var windowId = 'censorDocumentRejectWindow' + document.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentCensorRejectWindow(windowId, document, store, isHorizontal);

    window.show();
}
Srims.projects.censorDocumentReject = function(document, store, isHorizontal, remark) {
    Srims.projects.censorDocument(document, Srims.CensorState.reject, '/CensorReject', store, isHorizontal, remark);
}
Srims.projects.censorDocument = function(document, censorState, subUrl, store, isHorizontal, remark) {
    var params = {};
    params.documentId = document.get('id');
    if (remark != undefined)
        params.remark = remark;

    Ext.Ajax.request({
        url: Srims.service.documents.DocumentService + subUrl,
        params: params,
        success: function() {
            store.load();
            isHorizontal ? Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount) : Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount);
        }
    });
}
Srims.projects.listMyUnsubmitDocument = function() {
    var panelId = 'MyUnsubmitDocumentGridPanel';
    var documentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);

    if (panel) {
        documentStore = panel.getStore();
        documentStore.load();
    }
    else {
        documentStore = new Srims.documents.DocumentStore(Srims.service.documents.DocumentService + '/GetExpertUnSubmitDocument');
        panel = new Srims.documents.DocumentMyUnsubmitDocumentGridPanel(panelId, '我的待提交的文档', documentStore, 'icon-expert-my-unsubmit-document');
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.clearProjectAccountBookNumber = function(project) {
    var windowId = 'clearProjectAccountBookNumberWindow' + project.get('id');
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.projects.ProjectClearAccountBookNumberWindow(windowId, project);

    window.show();
}
Srims.projects.showHorizontalChooseWindow = function() {
    var windowId = 'horizontalChooseWindow';
    var window = Ext.getCmp(windowId);

    if (!window) {
        Ext.MessageBox.show({
            title: '项目是否涉密',
            msg: '您申请的项目是否涉密？<br />注意：如果项目信息涉密，请直接提交书面材料至科技处！',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            fn: function(button) {
            if (button == 'yes')
                Ext.MessageBox.show({
                    title: '申请涉密项目',
                    msg: '请联系科技处相关负责人！',
                    buttons: Ext.MessageBox.OK,
                    scope: this,
                    fn: function(button) {
                    }
                });
                if (button == 'no') {
                    window = new Srims.projects.ProjectRankSelectWindow(windowId);
                    window.show();
                }
            },
            icon: Ext.MessageBox.QUESTION
        });

    }
}
Srims.projects.showExpertGuidProjectEditPanel = function(project) {
    var panelId = 'ExpertGuidProjectEditPabel' + (project.get('isHorizontal') ? 'Horizontal' : 'Vertical');
    if (Srims.WorkSpace.active(panelId))
        return;

    var panel = new Srims.projects.ExpertGuidProjectEditPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.showImportWindow = function(store) {
    var windowId = 'ProjectImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.projects.ProjectService + '/Import', '导入项目数据', false);

    window.show();
}
Srims.projects.showRecoveryImportWindow = function(store) {
    var windowId = 'RecoveryImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.projects.ProjectService + '/ImportRecovery', '导入追缴单数据', false);

    window.show();
}
Srims.projects.printRecovery = function(recovery, store, title, message, action, methodName) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.ID = recovery.get('id');
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.RecoveryProjectXmlReader()
                    });
                    if (action == 'print')
                        window.open('RecoveryPrint.aspx?RecoveryID=' + recovery.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                }
            });
        }
    }, this);
}
//对于专家提交的申请，需要管理员填写校内间接费和校内绩效
Srims.projects.completeIn = function(project, gridPanel) {
    var windowId = 'CompleteInWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.projects.ProjectCompleteInWindow(windowId, project, gridPanel);

    window.show();
}
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryState = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.projects.ProjectHistoryState);


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryStateStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
    
        var load_url = Srims.service.projects.StateHistoryService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.isNew() ? 0 : project.get('id')
        }
        Srims.projects.ProjectHistoryStateStore.superclass.constructor.call(this, new Srims.projects.ProjectHistoryStateXmLReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryStateXmLReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectHistoryStateXmLReader.superclass.constructor.call(this, Srims.projects.ProjectHistoryState);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegatePrincipalWindow = function(id, projects, store){

    this._projects = projects;
    this._store = store;
    this._id = id;
    
    this._helpPanel = new Ext.Panel({
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '提示：<ul style="text-indent:2em"><li>在下面的输入框中输入专家<span style="color: Red;">姓名</span>或专家<span style="color: Red;">姓名首字母缩写</span>查找并选择专家</li></ul>'
    });
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isvalidate(false)) 
                return false;
            Srims.projects.setDeletatePrincipal(window._projects, window._comboBoxExpert.getValue(), window._store);
            window.close();
        }
    });
    
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '委托负责人',
        width: 150,
        itemCls: 'combox-set-delegate',
        allowBlank: false
    });
    
    this.isvalidate = function(preventMark){
        var result = true;
        
        result = this._comboBoxExpert.isValid(preventMark) && result;
        result = this.vidateDelegatePrincipal() && result;
        
        return result;
    }
    this.vidateDelegatePrincipal = function(){
        for (var i = 0; i < this._projects.length; i++) {
            var project = this._projects[i];
            var principalId = project.get('principalId');
            if (principalId == this._comboBoxExpert.getValue()) {
                Ext.Msg.show({
                    title: '指定委托负责人错误',
                    msg: '项目的委托负责人不能是项目的负责人',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return false;
            }
        }
        return true;
    }
    Srims.projects.ProjectSetDelegatePrincipalWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '指定项目委托负责人',
        iconCls: 'icon-set-delegate-principal',
        width: 450,
        labelWidth: 70,
        autoHeight: true,
        modal: true,
        closeAction: 'close',
        deferredRender: false,
        layout: 'form',
        items: [this._helpPanel, this._comboBoxExpert],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.focus = function(){
        this._comboBoxExpert.focus(false, true);
    }
    this.focus();
}
Ext.extend(Srims.projects.ProjectSetDelegatePrincipalWindow, Ext.Window, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectExport_Column = function() {
}

Srims.projects.ProjectExport_Column.basic = [['Name', '项目名称', , '100'], ['Number', '项目编号', , '100'], ['State', '项目状态', 'enum', '100'],
    ['Principal', '项目负责人', , '100'], ['PrincipalNumber', '负责人工作证号', , '100'], ['PrincipalCollege', '所属学院', , '100'], ['PrincipalDelegate', '委托负责人', , '100'], ['Level', '项目等级', 'enum', '100'],
    ['SubjectName', '所属学科', , '100'], ['ResearchType', '研究类型', , '100'], ['CooperationType', '合作类型', , '100'], ['StartDate', '开始日期', 'Date', '80'],
    ['EndDate', '结束日期', 'Date', '80'], ['IsSecret', '是否涉密', 'Boolean', '20'], ['BaseName', '基地名称', , '100'], ['Creator', '创建人', , '100'],
    ['CreateDate', '创建时间', 'Date', '80'], ['CorporationPlace', '公司地址', , '100'], ['Remark', '备注', , '100'], ['TaskComingFrom', '委托单位', , '100']];

Srims.projects.ProjectExport_Column.Type = [['RankName', '等级名称', , '100'], ['TypeName', '类型名称', , '100'], ['SupportCategoryName', '资助类别', , '100'],
    ['SupportFieldName', '资助领域', , '100'], ['SupportSubFieldName', '资助子领域', , '100']];

Srims.projects.ProjectExport_Column.fund = [['FundContract', '合同额', 'moneyRender', '80'], ['FundTotal', '到校经费', 'moneyRender', '80'],
    ['FundPlanIn', '计划校内分配', 'moneyRender', '80'], ['FundPlanOut', '计划外协分配', 'moneyRender', '80'], ['FundPlanHardware', '计划硬件分配', 'moneyRender', '80'],
    ['FundReceived', '已到经费', 'moneyRender', '80'], ['FundAlreadyTotal', '已分配经费', 'moneyRender', '80'], ['FundAlreadyIn', '已校内分配', 'moneyRender', '80'],
    ['FundAlreadyOut', '已外协分配', 'moneyRender', '80'], ['FundAlreadyHardware', '已硬件分配', 'moneyRender', '80'], ['FundFrom', '经费来源', , '100'],
    ['FundFromUnit', '来款单位', , '100'], ['FundFromUnitAddress', '来款单位地址', , '100'],
    ['OverheadExpenseOutTotal', '外协管理费总额', 'moneyRender', '80'], ['OverheadExpensesAlreadyIn', '已收校内管理费', 'moneyRender', '80'],
    ['OverheadExpensesAlreadyOut', '已收外协管理费', 'moneyRender', '80'], ['IndirectCosts', '项目总间接费用', 'moneyRender', '80'], ['ProjectPerformancePay', '项目总绩效', 'moneyRender', '80'],
    ['OverheadExpenseInTotal', '校内管理费', 'moneyRender', '80'], ['PerformancePay', '校内绩效', 'moneyRender', '80'], ['PerformancePayStandard', '校内基准绩效', 'moneyRender', '80'],
    ['OverheadExpensesInStandard', '校内基准间接费用', 'moneyRender', '80'], ['EquipmentCost', '设备购置费', 'moneyRender', '80'], ['ProjectAccountNumber', '账本号', '', '80']
    , ['OutsourcingPlanAmountString', '外协计划分配', '', '100'], ['OutsourcingAlreadyAmountString', '外协已分配', '', '100'], ['AllocatedPerformance', '实发绩效', 'moneyRender', '80']];


if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_BasicForm = function(project) {

    //field
    this._project = project;

    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '项目名称',
        value: project.get('name'),
        readOnly: true,
        width: 480
    });
    this._fieldNumber = new Ext.form.Field({
        fieldLabel: '项目编号',
        value: project.get('number'),
        readOnly: true,
        width: 160
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密',
        hidden: true,
        hideLabel: true,
        checked: project.get('isSecret'),
        readOnly: true
    });
    this._fieldPrincipal = new Ext.form.Field({
        fieldLabel: '项目负责人',
        value: project.get('principal'),
        readOnly: true,
        width: 160
    });
    this._fieldPrincipalDelegate = new Ext.form.Field({
        fieldLabel: '委托负责人',
        value: project.get('principalDelegate'),
        readOnly: true,
        width: 160
    });
    this._fieldLevel = new Ext.form.Field({
        fieldLabel: '项目级别',
        value: Srims.projects.projectLevelRender(project.get('level')),
        readOnly: true,
        width: 160
    });
    this._fieldState = new Ext.form.Field({
        fieldLabel: '项目状态',
        value: Srims.projects.projectStateRender(project.get('state')),
        readOnly: true,
        width: 160
    });
    this._fieldResearchType = new Ext.form.Field({
        fieldLabel: '研究类型',
        value: project.get('researchType'),
        readOnly: true,
        width: 160
    });
    this._fieldCooperationType = new Ext.form.Field({
        fieldLabel: '合作类型',
        value: project.get('cooperationType'),
        readOnly: true,
        width: 160
    });
    this._fieldStartDate = new Ext.form.Field({
        fieldLabel: '开始时间',
        value: Date.render(project.get('startDate')),
        readOnly: true,
        width: 160
    });
    this._fieldEndDate = new Ext.form.Field({
        fieldLabel: '结束时间',
        value: Date.render(project.get('endDate')),
        readOnly: true,
        width: 160
    });
    this._fieldFirstLevelSubject = new Ext.form.Field({
        fieldLabel: '一级学科',
        value: project.get('firstLevelSubjectName'),
        readOnly: true,
        width: 160
    });
    this._fieldSecondLevelSubject = new Ext.form.Field({
        fieldLabel: '二级学科',
        value: project.get('secondLevelSubjectName'),
        readOnly: true,
        width: 160
    });
    this._fieldBase = new Ext.form.Field({
        fieldLabel: '所属基地',
        value: project.get('baseName'),
        readOnly: true,
        width: 300
    });
    this._fieldTaskComingFrom = new Ext.form.Field({
        fieldLabel: '委托单位',
        readOnly: true,
        value: project.get('taskComingFrom'),
        width: 160
    });
    this._fieldTaskCorporationPlace = new Ext.form.Field({
        fieldLabel: '单位所在地',
        value: project.get('corporationPlace'),
        readOnly: true,
        width: 160
    });

    //constructor        
    var columnOneItems = [this._fieldNumber, this._fieldPrincipal, this._fieldLevel, this._fieldResearchType, this._fieldStartDate, this._fieldFirstLevelSubject];
    var columnTwoItems = [this._checkboxIsSecret, this._fieldPrincipalDelegate, this._fieldState, this._fieldCooperationType, this._fieldEndDate, this._fieldSecondLevelSubject];

    if (project.get('isHorizontal')) {
        columnOneItems[columnOneItems.length] = this._fieldTaskComingFrom;
        columnTwoItems[columnTwoItems.length] = this._fieldTaskCorporationPlace;
    }
    Srims.projects.ProjectShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldName, new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: columnOneItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnTwoItems
            })]
        }), this._fieldBase]
    });
    this.resetComponentValue = function(project) {
        this._fieldName.setValue(project.get('name'));
        this._fieldNumber.setValue(project.get('number'));
        this._checkboxIsSecret.setValue(project.get('isSecret'));
        this._fieldPrincipal.setValue(project.get('principal'));
        this._fieldPrincipalDelegate.setValue(project.get('principalDelegate'));
        this._fieldLevel.setValue(Srims.projects.projectLevelRender(project.get('level')));
        this._fieldState.setValue(Srims.projects.projectStateRender(project.get('state')));
        this._fieldResearchType.setValue(project.get('researchType'));
        this._fieldCooperationType.setValue(project.get('cooperationType'));
        this._fieldStartDate.setValue(Date.render(project.get('startDate')));
        this._fieldEndDate.setValue(Date.render(project.get('endDate')));
        this._fieldFirstLevelSubject.setValue(project.get('firstLevelSubjectName'));
        this._fieldSecondLevelSubject.setValue(project.get('secondLevelSubjectName'))
        this._fieldBase.setValue(project.get('baseName'));
        this._fieldTaskComingFrom.setValue(project.get('taskComingFrom'));
        this._fieldTaskCorporationPlace.setValue(project.get('corporationPlace'));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_MemberForm = function(project){
    this._project = project;
    
    this._store = new Srims.projects.ProjectMemberStore(project);
    this._columnModel = new Srims.projects.ProjectMemberGridPanel_ColumnModel();
    
    this._gridPanelProjectMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoExpandColumn: 'taskName',
        autoExpand: true,
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true
        }
    });
    
    Srims.projects.ProjectShowPanel_MemberForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目成员',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectMember]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_MemberForm, Ext.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_TypeForm = function(project){

    this._project = project;
    
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '项目级别',
        value: project.get('rankName'),
        readOnly: true,
        width: 160
    });
    this._fieldType = new Ext.form.Field({
        fieldLabel: '项目类型',
        value: project.get('typeName'),
        readOnly: true,
        width: 300
    });
    this._fieldSupportCategory = new Ext.form.Field({
        fieldLabel: '资助类别',
        value: project.get('supportCategoryName'),
        readOnly: true,
        width: 160
    });
    this._fieldSupportField = new Ext.form.Field({
        fieldLabel: '资助领域',
        value: project.get('supportFieldName'),
        readOnly: true,
        width: 160
    });
    this._fieldSupportSubField = new Ext.form.Field({
        fieldLabel: '资助子领域',
        value: project.get('supportSubFieldName'),
        readOnly: true,
        width: 160
    });
    
    var items = [this._fieldRank, this._fieldType, this._fieldSupportCategory, new Ext.Panel({
        widht: 600,
        layout: 'column',
        items: [new Ext.Panel({
            width: 300,
            layout: 'form',
            style: 'width:300px',
            items: [this._fieldSupportField]
        }), new Ext.Panel({
            width: 300,
            style: 'width:300px',
            layout: 'form',
            items: [this._fieldSupportSubField]
        })]
    })];
    if (project.get('isHorizontal')) 
        items.shift();
    
    Srims.projects.ProjectShowPanel_TypeForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '分类信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: items
    });
    //method
    this.resetComponentValue = function(project){
        this._fieldRank.setValue(project.get('rankName'));
        this._fieldType.setValue(project.get('typeName'));
        this._fieldSupportCategory.setValue(project.get('supportCategoryName'));
        this._fieldSupportField.setValue(project.get('supportFieldName'));
        this._fieldSupportSubField.setValue(project.get('supportSubFieldName'));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_TypeForm, Ext.form.FormPanel);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_FundForm = function(project) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._fieldFundContract = new Ext.form.Field({
        fieldLabel: '项目合同额',
        value: Money.render(project.get('fundContract')),
        readOnly: true,
        width: 140
    });
    this._fieldFundTotal = new Ext.form.Field({
        fieldLabel: '到校经费',
        value: Money.render(project.get('fundTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundPlanIn = new Ext.form.Field({
        fieldLabel: '计划校内分配',
        value: Money.render(project.get('fundPlanIn')),
        readOnly: true,
        width: 140
    });
    this._fieldFundPlanOut = new Ext.form.Field({
        fieldLabel: '计划外协分配',
        value: Money.render(project.get('fundPlanOut')),
        readOnly: true,
        width: 140
    });
    this._fieldFundReceived = new Ext.form.Field({
        fieldLabel: '已到经费',
        value: Money.render(project.get('fundReceived')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyTotal = new Ext.form.Field({
        fieldLabel: '已分配经费',
        value: Money.render(project.get('fundAlreadyTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyIn = new Ext.form.Field({
        fieldLabel: '已分配校内经费',
        value: Money.render(project.get('fundAlreadyIn')),
        readOnly: true,
        width: 140
    });
    this._fieldfundAlreadyOut = new Ext.form.Field({
        fieldLabel: '已分配外协经费',
        value: Money.render(project.get('fundAlreadyOut')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyHardware = new Ext.form.Field({
        fieldLabel: '已分配硬件经费',
        value: Money.render(project.get('fundAlreadyHardware')),
        readOnly: true,
        width: 140
    });
    this._fieldProjectOverheadExpensesTotal = new Ext.form.Field({
        fieldLabel: '项目总间接费',
        value: Money.render(project.get('indirectCosts')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldProjectPerformanceTotal = new Ext.form.Field({
        fieldLabel: '项目总绩效',
        value: Money.render(project.get('projectPerformancePay')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpensesInStandard = new Ext.form.Field({
        fieldLabel: '校内基准间接费',
        value: Money.render(project.get('overheadExpensesInStandard')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpenseInTotal = new Ext.form.Field({
        fieldLabel: '校内合同间接费',
        value: Money.render(project.get('campusIndirectCosts')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadSchool = new Ext.form.Field({
        fieldLabel: '学校间接费',
        value: Money.render(project.get('overheadExpenseInTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadCompus = new Ext.form.Field({
        fieldLabel: '二级单位间接费',
        value: Money.render(project.get('overheadExpenseMiddleTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpert = new Ext.form.Field({
        fieldLabel: '课题组间接费',
        value: Money.render(project.get('overheadExpenseExpertTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpenseOutTotal = new Ext.form.Field({
        fieldLabel: '外协分配管理费',
        value: Money.render(project.get('overheadExpenseOutTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundManageProportion = new Ext.form.Field({
        fieldLabel: '国家规定管理费比例',
        value: ExpenseRate.render(project.get('fundManageProportion')),
        readOnly: true,
        width: 140
    });
    this._fieldPerformancePay = new Ext.form.Field({
        fieldLabel: '校内合同绩效',
        value: project.get('overheadExpenseInTotal') < 0 ? '' : Money.render(project.get('performancePay')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldAllocatedPerformence = new Ext.form.Field({
        fieldLabel: '课题组暂存（考虑追缴）',
        value: Money.render(project.get('allocatedPerformance')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldPerformancePayAlready = new Ext.form.Field({
        fieldLabel: '课题组暂存（不考虑追缴）',
        value: Money.render(project.get('performancePayAlready')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldOverheadExpensesAlreadyIn = new Ext.form.Field({
        fieldLabel: '已收学校间接费（不考虑追缴）',
        value: Money.render(project.get('overheadExpensesAlreadyIn')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldTrueOverheadExpensesAlreadyIn = new Ext.form.Field({
        fieldLabel: '实收学校间接费（考虑追缴）',
        value: Money.render(project.get('trueOverheadExpensesAlreadyIn')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldBorrowAmount = new Ext.form.Field({
        fieldLabel: '借款金额',
        value: Money.render(project.get('borrowAmount')),
        readOnly: true,
        width: 140
    });
    this._fieldReturnAmount = new Ext.form.Field({
        fieldLabel: '还款金额',
        value: Money.render(project.get('returnAmount')),
        readOnly: true,
        width: 140
    });
    this._fieldFundFrom = new Ext.form.Field({
        fieldLabel: '经费来源',
        value: project.get('fundFrom'),
        readOnly: true,
        width: 300
    });
    this._fieldFundFromUnit = new Ext.form.Field({
        fieldLabel: '来款单位',
        value: project.get('fundFromUnit'),
        readOnly: true,
        width: 300
    });
    this._fieldFundFromUnitAddress = new Ext.form.Field({
        fieldLabel: '来款单位地址',
        value: project.get('fundFromUnitAddress'),
        readOnly: true,
        width: 420
    });
    this._fieldPerformancePayStandard = new Ext.form.Field({
        fieldLabel: '校内基准绩效',
        value: Money.render(project.get('performancePayStandard')),
        hidden: userIsExpert,
        hideLabel: userIsExpert, //&& (project.get("state") == "WaitingStartInformation" || project.get("state") == "WaitingStartCensor")
        readOnly: true,
        width: 140
    });
    this._numberFieldEquipmentCost = new Ext.form.Field({
        fieldLabel: '设备购置费',
        value: Money.render(project.get('equipmentCost')),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    Srims.projects.ProjectShowPanel_FundForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        items: [new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldFundContract, this._fieldFundPlanIn, this._fieldFundReceived, this._fieldFundAlreadyIn, this._numberFieldEquipmentCost, this._fieldProjectOverheadExpensesTotal, this._fieldOverheadExpensesInStandard, this._fieldOverheadExpenseInTotal, this._fieldOverheadSchool]
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: [this._fieldFundTotal, this._fieldFundPlanOut, this._fieldFundAlreadyTotal, this._fieldfundAlreadyOut, this._fieldOverheadExpenseOutTotal, this._fieldProjectPerformanceTotal, this._fieldPerformancePayStandard, this._fieldPerformancePay, this._fieldOverheadCompus]
            })]
        }), this._fieldOverheadExpert,
     new Ext.Panel({
         width: 600,
         layout: 'column',
         items: [new Ext.Panel({
             width: 300,
             layout: 'form',
             style: 'width:300px',
             items: [this._fieldBorrowAmount, this._fieldPerformancePayAlready, this._fieldOverheadExpensesAlreadyIn]
         }), new Ext.Panel({
             width: 300,
             style: 'width:300px',
             layout: 'form',
             items: [this._fieldReturnAmount, this._fieldAllocatedPerformence, this._fieldTrueOverheadExpensesAlreadyIn]
         })]
     })

     , this._fieldFundFrom, this._fieldFundFromUnit, this._fieldFundFromUnitAddress]
    });
    //method
    this.resetComponentValue = function(project) {
        this._fieldFundContract.setValue(Money.render(project.get('fundContract')));
        this._fieldFundTotal.setValue(Money.render(project.get('fundTotal')));
        this._fieldFundPlanIn.setValue(Money.render(project.get('fundPlanIn')));
        this._fieldFundPlanOut.setValue(Money.render(project.get('fundPlanOut')));
        this._fieldFundReceived.setValue(Money.render(project.get('fundReceived')));
        this._fieldFundAlreadyTotal.setValue(Money.render(project.get('fundAlreadyTotal')));
        this._fieldFundAlreadyIn.setValue(Money.render(project.get('fundAlreadyIn')));
        this._fieldfundAlreadyOut.setValue(Money.render(project.get('fundAlreadyOut')));
        this._fieldFundAlreadyHardware.setValue(Money.render(project.get('fundAlreadyHardware')));
        this._fieldOverheadExpensesInStandard.setValue(Money.render(project.get('overheadExpensesInStandard')));
        this._fieldOverheadExpenseInTotal.setValue(Money.render(project.get('campusIndirectCosts')));
        this._fieldOverheadExpenseOutTotal.setValue(Money.render(project.get('overheadExpenseOutTotal')));
        this._fieldFundManageProportion.setValue(project.get('fundManageProportion'));
        this._fieldPerformancePay.setValue(Money.render(project.get('performancePay')));
        this._fieldAllocatedPerformence.setValue(Money.render(project.get('allocatedPerformance')));
        this._fieldPerformancePayAlready.setValue(Money.render(project.get('performancePayAlready')));
        this._fieldOverheadExpensesAlreadyIn.setValue(Money.render(project.get('overheadExpensesAlreadyIn')));
        this._fieldTrueOverheadExpensesAlreadyIn.setValue(Money.render(project.get('trueOverheadExpensesAlreadyIn')));
        this._fieldBorrowAmount.setValue(Money.render(project.get('borrowAmount')));
        this._fieldReturnAmount.setValue(Money.render(project.get('returnAmount')));
        this._fieldPerformancePayStandard.setValue(Money.render(project.get('performancePayStandard')));
        this._fieldProjectOverheadExpensesTotal.setValue(Money.render(project.get('indirectCosts'))); //
        this._fieldProjectPerformanceTotal.setValue(Money.render(project.get('projectPerformancePay'))); //
        this._fieldFundFrom.setValue(project.get('fundFrom'));
        this._fieldFundFromUnit.setValue(project.get('fundFromUnit'));
        this._fieldFundFromUnitAddress.setValue(project.get('fundFromUnitAddress'));
        this._numberFieldEquipmentCost.setValue(Money.render(project.get('equipmentCost')));
        this._fieldOverheadSchool.setValue(Money.render(project.get('overheadExpenseInTotal')));
        this._fieldOverheadCompus.setValue(Money.render(project.get('overheadExpenseMiddleTotal')));
        this._fieldOverheadExpert.setValue(Money.render(project.get('overheadExpenseExpertTotal')));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundForm, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.ProjectShowPanel_FundBorrowForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.fund.FundDescendService + '/GetBorrowByProjectId';
    this._store = new Srims.fund.FundDescendStore(load_url, params);
    this._columnModel = new Srims.fund.FundDescendGridPanel_ColumnModel(true, true, false);
    
    this._gridPanelBorrow = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有借款记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_FundBorrowForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '借款记录',
        autoHeight: true,
        hidden: project.get('borrowAmount') == 0,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelBorrow]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundBorrowForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.ProjectShowPanel_FundReturnForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.fund.FinanceFundDescendService + '/GetReturnByProjectId';
    this._store = new Srims.fund.FinanceFundDescendStore(load_url, params);
    this._columnModel = new Srims.fund.FinanceFundDescendGridPanel_ColumnModel(true, true);
    
    this._gridPanelFundReturn = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有还款记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_FundReturnForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '还款记录',
        autoHeight: true,
        hidden: project.get('borrowAmount') == 0,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundReturn]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundReturnForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.projectShowPanel_PayPlanItemForm = function(project){

    this._project = project;
    this._store = new Srims.fund.PayPlanItemStore(project);
    this._columnModel = new Srims.fund.PayPlanItemGridPanel_ColumnModel();
    
    
    this._gridPanelPayPlanItem = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 300,
        autoExpand: true,
        autoExpandColumn: 'amount',
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有经费到帐计划'
        }
    });
    
    Srims.projects.projectShowPanel_PayPlanItemForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费到帐计划',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelPayPlanItem]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.projectShowPanel_PayPlanItemForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.projectFundAllocation = undefined;
Srims.projects.showProjectFundAllocation = function(){
    Srims.fund.showFundAllocationInfo(Srims.projects.projectFundAllocation);
}

Srims.projects.ProjectShowPanel_FundAllocationForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.fund.FundAllocationService + '/GetByProjectID';
    this._store = new Srims.fund.FundAllocationStore(load_url, params);
    this._columnModel = new Srims.fund.FundAllocationGridPanel_ColumnModel(false);
    
    this._gridPanelFundAllocation = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有经费分配记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_FundAllocationForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配记录',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundAllocation]
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundAllocation = grid.getStore().getAt(rowIndex);
        Srims.projects.projectFundAllocation = fundAllocation;
        
        Srims.Load.loadFundModule('Srims.projects.showProjectFundAllocation();');
    };
    this._gridPanelFundAllocation.on('celldblclick', onCellDblClick);
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundAllocationForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.projects.projectPerformanceAllocation = undefined;
Srims.projects.showProjectPerformanceAllocation = function(){
Srims.performance.showPerformanceAllocationInfo(Srims.projects.projectPerformanceAllocation);
}

Srims.projects.ProjectShowPanel_PerformanceAllocationForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.performance.PerformanceAllocationService + '/GetByProjectID';
    this._store = new Srims.performance.PerformanceAllocationStore(load_url, params);
    this._columnModel = new Srims.performance.PerformanceAllocationGridPanel_ColumnModel(false);
    
    this._gridPanelFundAllocation = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有绩效分配记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_PerformanceAllocationForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '绩效分配记录',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundAllocation]
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundAllocation = grid.getStore().getAt(rowIndex);
        Srims.projects.projectPerformanceAllocation = fundAllocation;
        
        Srims.Load.loadPerformanceModule('Srims.projects.showProjectPerformanceAllocation();');
    };
    this._gridPanelFundAllocation.on('celldblclick', onCellDblClick);
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_PerformanceAllocationForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.douments) 
    Ext.namespace('Srims.douments');

Srims.projects.ProjectShowPanel_DocumentForm = function(project){
    this._project = project;
    
    var load_url = Srims.service.documents.DocumentService + '/GetByProjectID';
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    this._store = new Srims.documents.DocumentStore(load_url, params);
    
    this._columnModel = new Srims.documents.DocumentGridPanel_ColumnModel();
    
    this._gridPanelDocument = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 720,
        autoExpand: true,
        autoExpandColumn: 'censorDateTime',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有文档信息'
        }
    });
    
    Srims.projects.ProjectShowPanel_DocumentForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '文档信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelDocument]
    });
    if (project.get('id')) 
        this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this._gridPanelDocument.on('celldblclick', onCellDblClick);
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
    
}
Ext.extend(Srims.projects.ProjectShowPanel_DocumentForm, Ext.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.douments) 
    Ext.namespace('Srims.douments');

Srims.projects.ProjectShowPanel_ContractForm = function(projectId){
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: projectId == undefined ? 0 : projectId
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel();
    
    this._gridPanelContract = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'type',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有合同信息'
        }
    });
    Srims.projects.ProjectShowPanel_ContractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '合同信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelContract]
    });
    if (projectId) 
        this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this._gridPanelContract.on('celldblclick', onCellDblClick);
    
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_ContractForm, Ext.form.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_StateHistoryForm = function(project){
    this._project = project;
    
    this._store = new Srims.projects.ProjectHistoryStateStore(project);
    
    this._columnModel = new Ext.grid.ColumnModel([{
        header: "id",
        hidden: true
    }, {
        header: "项目状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.projects.projectStateRender
    }, {
        header: "时间",
        dataIndex: 'dateTime',
        width: 80,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        id: 'remark',
        header: "备注",
        dataIndex: 'remark'
    }]);
    
    this._gridPanelProjectStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoHeight: true,
        autoExpandColumn: 'remark',
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true
        }
    });
    
    Srims.projects.ProjectShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目状态历史',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectStateHistory]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_StateHistoryForm, Ext.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace("Srims.projects");

Srims.projects.ProjectShowPanel_SystemForm = function(project){

    this._project = project;
    
    this._fieldCreator = new Ext.form.Field({
        fieldLabel: '创建人',
        value: project.get('creator'),
        readOnly: true,
        width: 160
    });
    
    this._fieldCreatorDate = new Ext.form.Field({
        fieldLabel: '创建时间',
        value: Date.render(project.get('createDate')),
        readOnly: true,
        width: 160
    });
    
    Srims.projects.ProjectShowPanel_SystemForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '系统信息',
        autoHeight: true,
        frame: true,
        labelWidth: 70,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldCreator]
            }), new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldCreatorDate]
            })]
        })]
    });
    
    this.setProject = function(project){
        this._project = project;
        this._fieldCreator.setValue(project.get('creator'));
        this._fieldCreatorDate.setValue(Date.render(project.get('createDate')));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_SystemForm, Ext.form.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_RemarkForm = function(project){
    this._project = project;
    
    this._textAreaRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        hideLabel: true,
        value: project.get('remark'),
        readOnly: true,
        width: 570
    });
    Srims.projects.ProjectShowPanel_RemarkForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '备注',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textAreaRemark]
    });
    this.resetComponentValue = function(project){
        this._textAreaRemark = this._project.get('remark');
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_RemarkForm, Ext.FormPanel);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel = function(panelId, project) {

    // field
    this._project = project;
    this._id = panelId;

    // controls
    this._formPanelProjectOut = new Srims.projects.ProjectShowPanel_ProjectOutForm(project);
    this._formPanelBasic = new Srims.projects.ProjectShowPanel_BasicForm(project);
    this._formPanelMember = new Srims.projects.ProjectShowPanel_MemberForm(project);
    this._formPanelType = new Srims.projects.ProjectShowPanel_TypeForm(project);
    this._formPanelRecovery = new Srims.projects.ProjectShowPanel_RecoveryForm(project);
    this._formPanelFund = new Srims.projects.ProjectShowPanel_FundForm(project);
    this._formPanelFundBorrow = new Srims.projects.ProjectShowPanel_FundBorrowForm(project);
    this._formPanelFundReturn = new Srims.projects.ProjectShowPanel_FundReturnForm(project);
    this._formPanelPayPlanItem = new Srims.projects.projectShowPanel_PayPlanItemForm(project);
    this._formPanelFundAllocation = new Srims.projects.ProjectShowPanel_FundAllocationForm(project);

    this._formPanelPerformanceAllocation = new Srims.projects.ProjectShowPanel_PerformanceAllocationForm(project);
    this._formPanelDocument = new Srims.projects.ProjectShowPanel_DocumentForm(project);
    this._formPanelContract = new Srims.projects.ProjectShowPanel_ContractForm(project
			.get('id'));
    this._formPanelStateHistory = new Srims.projects.ProjectShowPanel_StateHistoryForm(project);
    this._formPanelSystem = new Srims.projects.ProjectShowPanel_SystemForm(project);
    this._formPanelRemark = new Srims.projects.ProjectShowPanel_RemarkForm(project);
    this._toolBar = new Srims.projects.ProjectShowPanel_ToolBar(project,
			this._id);

    // constructor
    Srims.projects.ProjectShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._project.get('name'),
        iconCls: 'icon-project-show',
        tbar: this._toolBar,
        items: [this._formPanelProjectOut, this._formPanelBasic, this._formPanelMember,
						this._formPanelType, this._formPanelFund, this._formPanelRecovery,
						this._formPanelFundBorrow, this._formPanelFundReturn,
						this._formPanelPayPlanItem,
						this._formPanelFundAllocation, this._formPanelPerformanceAllocation, this._formPanelDocument,
						this._formPanelContract, this._formPanelStateHistory,
						this._formPanelSystem, this._formPanelRemark]
    });
    // 方法
    this.resetComponentValue = function(project) {

        this._formPanelBasic.resetComponentValue(project);
        this._formPanelFund.resetComponentValue(project);
        this._formPanelType.resetComponentValue(project);
        this._formPanelRemark.resetComponentValue(project);
        this._formPanelMember.setProject(project);
        this._formPanelFundBorrow.setProject(project);
        this._formPanelFundReturn.setProject(project);
        this._formPanelPayPlanItem.setProject(project);
        this._formPanelDocument.setProject(project);
        this._formPanelContract.setProject(project);
        this._formPanelStateHistory.setProject(project);
        this._formPanelSystem.setProject(project);
    }
    this.resetProject = function(project) {
        this._toolBar.setVisible(false);
        this._project = project;
        this._formPanelBasic.resetComponentValue(project);
        this._formPanelFund.resetComponentValue(project);
        this._formPanelType.resetComponentValue(project);
        this._formPanelRemark.resetComponentValue(project);
        this._formPanelMember.setProject(project);
        this._formPanelFundBorrow.setProject(project);
        this._formPanelFundReturn.setProject(project);
        this._formPanelPayPlanItem.setProject(project);
        this._formPanelDocument.setProject(project);
        this._formPanelContract.setProject(project);
        this._formPanelStateHistory.setProject(project);
        this._formPanelSystem.setProject(project);
        
    }

    this.next = function() {
        Srims.projects.submitStart(this._project);
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.projects.ProjectShowPanel, Ext.Panel, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_ToolBar = function(project) {

    //fields
    this._project = project;
    this._showPanel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));

    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.editProject(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目</b><br/>编辑这个项目的基本、类别、经费等信息'
    });
    this._buttonMemberManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '成员管理',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.showProjectMemberWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b><br/>编辑这个项目的成员信息'
    });
    this._buttonPayPlanItemManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-pay-plan-item',
        text: '付款计划管理',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.showPayPlanItemWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目付款计划</b><br/>编辑这个项目的付款计划信息'
    });
    this._buttonContractManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-contract',
        text: '合同管理',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.showContractWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目合同</b><br/>编辑这个项目的合同信息'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-document',
        text: '文档管理',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.showDocumentWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目文档</b><br/>编辑这个项目的文档信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            Ext.MessageBox.confirm('删除项目', '你确定要删除这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.deleteProject(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除项目</b><br/>删除这个项目'
    });
    this._buttonWithDraw = new Ext.Toolbar.Button({
        iconCls: 'icon-withDraw',
        text: '撤消',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!this.project)
                return;

            Ext.MessageBox.confirm('撤销项目', '你确定要撤销这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.withDrawProject(this.project)
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤消项目</b><br/>撤消选中的项目'
    });
    this._buttonTerminate = new Ext.Toolbar.Button({
        iconCls: 'icon-terminate',
        text: '终止',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!this.project)
                return;

            Ext.MessageBox.confirm('终止项目', '你确定要终止这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.terminateProject(this.project)
            }, this);
        },
        hidden: true,
        tooltip: '<b>终止项目</b><br/>终止选中的项目'
    });
    this._buttonCensorStartPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '通过立项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            Ext.MessageBox.show({
                title: '审核通过立项申请',
                msg: '您需要同时审核通过该项目的合同和文档吗？<br />点击“是”按钮，同时审核通过项目的合同和文档；<br />点击“否”按钮，仅审核通过项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                buttons: Ext.MessageBox.YESNOCANCEL,
                scope: this,
                fn: function(button) {
                    if (button == 'yes')
                        Srims.projects.censorStart_Pass(this.project, true);
                    if (button == 'no')
                        Srims.projects.censorStart_Pass(this.project, false);
                },
                icon: Ext.MessageBox.QUESTION
            });
        },
        hidden: !project.get('canCensorStart'),
        tooltip: '<b>审核通过</b><br/>审核通过这个项目的立项申请'
    });
    this._buttonCensorEndPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '通过结项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            Ext.MessageBox.confirm('审核通过结项申请', '你确定要审核通过这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.censorEnd_Pass(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过这个项目的结项申请'
    });
    this._buttonCensorStartReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '驳回立项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.rejectProjectCensor(this.project, true);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回这个项目的立项申请'
    });
    this._buttonCensorEndReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '驳回结项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.rejectProjectCensor(this.project, false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回这个项目的结项申请'
    });
    this._buttonSubmitStart = new Ext.Toolbar.Button({
        iconCls: 'icon-submit-start',
        text: '提交立项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            var flag = false;
            var msgInfo = '由于以下原因，项目立项申请可能会被驳回：<br/><br/><br/>';
            var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
            if (panel._formPanelMember._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px;">项目未指定任何成员<br/></span>';
            }
            if (panel._formPanelContract._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px">项目未提交合同<br/></span>';
            }
            if (panel._formPanelPayPlanItem._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px">项目到帐计划不完整<br/></span><br/>';
            }
            msgInfo += '建议您补充完上述信息后再提交<br/>';
            if (flag)
                msgInfo += '你仍然要提交这个项目的立项申请吗？';
            else
                msgInfo = '你确定要提交这个项目的立项申请吗？';

            Ext.MessageBox.confirm('提交立项申请', msgInfo, function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.submitStart(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交立项申请</b><br/>提交这个项目的立项申请'
    });
    this._buttonSubmitEnd = new Ext.Toolbar.Button({
        iconCls: 'icon-submit-end',
        text: '提交结项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Ext.MessageBox.confirm('提交结项申请', '你确定要提交这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.submitEnd(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交结项申请</b><br/>提交这个项目的结项申请'
    });
    this._buttonUndoStart = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-start',
        text: '撤销立项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Ext.MessageBox.confirm('撤销立项申请', '你确定要撤销这个项目的立项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.undoStart(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销立项申请</b><br/>撤销这个项目的立项申请'
    });
    this._buttonUndoEnd = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-end',
        text: '撤销结项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            Ext.MessageBox.confirm('撤销结项申请', '你确定要撤销这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.undoEnd(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销结项申请</b><br/>撤销这个项目的结项申请'
    });
    this._buttonClearAccountBookNumber = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-project-account-book-number',
        text: '清空账本号',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.clearProjectAccountBookNumber(this.project);
        },
        hidden: true,
        tooltip: '<b>清空项目账本号</b><br/>清空这个项目的账本号'
    });
    this._buttonDocumentModelManage = new Ext.Toolbar.Button({
        iconCls: 'icon-Document-model-manage',
        text: '下载文档模板',
        minWidth: 60,
        project: this._project,
        handler: function() {
            Srims.type.showDocumentModelManageWindow(this.project.get('typeId'), this.project.get('typeName'), true);
        },
        tooltip: '<b>下载项目类型文档模板</b><br/>下载该项目类型的文档模板'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        project: this._project,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: this.project.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });
                    var currentProject = store.getAt(0);
                    var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + currentProject.get('id'));

                    panel.resetComponentValue(currentProject);
                    panel._formPanelMember._store.load();
                    panel._formPanelPayPlanItem._store.load();
                    panel._formPanelFundAllocation._store.load();
                    panel._formPanelPerformanceAllocation._store.load();
                    panel._formPanelFundBorrow._store.load();
                    panel._formPanelFundReturn._store.load();
                    panel._formPanelDocument._store.load();
                    panel._formPanelContract._store.load();
                    panel._formPanelProjectOut._store.load();
                    panel._formPanelStateHistory._store.load();
                    panel._toolBar._resetButtonVisibleAndDisabled(currentProject);
                    panel._toolBar._resetButtonProject(currentProject);
                }
            });
        },
        tooltip: '<b>刷新项目信息</b><br/>刷新项目的全部信息'
    });
    var user = Srims.currentLoginLog.user;
    var buttonItems = [this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage];
    if (user.userRoleType == Srims.users.UserRoleType.Administrator) {
        buttonItems[buttonItems.length] = this._buttonCensorStartPass;
        buttonItems[buttonItems.length] = this._buttonCensorStartReject;
        buttonItems[buttonItems.length] = this._buttonCensorEndPass;
        buttonItems[buttonItems.length] = this._buttonCensorEndReject;
        buttonItems[buttonItems.length] = this._buttonDocumentModelManage
        buttonItems[buttonItems.length] = this._buttonClearAccountBookNumber;
        buttonItems[buttonItems.length] = this._buttonWithDraw;
        buttonItems[buttonItems.length] = this._buttonTerminate;
    }
    if (user.userRoleType == Srims.users.UserRoleType.Expert) {
        buttonItems[buttonItems.length] = this._buttonSubmitStart;
        buttonItems[buttonItems.length] = this._buttonSubmitEnd;
        buttonItems[buttonItems.length] = this._buttonUndoStart;
        buttonItems[buttonItems.length] = this._buttonUndoEnd;
    }
    buttonItems[buttonItems.length] = [this._buttonDelete];
    buttonItems[buttonItems.length] = new Ext.Toolbar.Fill();
    buttonItems[buttonItems.length] = [this._buttonRefresh];
    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });
    //重设button属性，外部调用
    this._resetButtonVisibleAndDisabled = function(project) {
        this._buttonEdit.setVisible(project.get('hasPermission_Edit'));
        this._buttonEdit.setDisabled(!project.get('canEdit'));

        this._buttonDelete.setVisible(project.get('hasPermission_Delete'));
        this._buttonDelete.setDisabled(!project.get('canDelete'));

        this._buttonWithDraw.setVisible(project.get('hasPermission_WithDraw'));
        this._buttonWithDraw.setDisabled(!project.get('canWithDraw'));

        this._buttonTerminate.setVisible(project.get('hasPermission_Terminate'));
        this._buttonTerminate.setDisabled(!project.get('canTerminate'));

        this._buttonMemberManage.setVisible(project.get('hasPermission_ShowProejectMember'));
        this._buttonMemberManage.setDisabled(!project.get('canShow_ProjectMember'));

        this._buttonPayPlanItemManage.setVisible(project.get('hasPermission_ShowProejectPayPlanItem'));
        this._buttonPayPlanItemManage.setDisabled(!project.get('canShow_ProjectPayPlanItem'));

        this._buttonContractManage.setVisible(project.get('hasPermission_ShowProejectContract'));
        this._buttonContractManage.setDisabled(!project.get('canShow_ProjectContract'));

        this._buttonDocumentManage.setVisible(project.get('hasPermission_ShowProejectDocument'));
        this._buttonDocumentManage.setDisabled(!project.get('canShow_ProjectDocument'));

        this._buttonCensorEndPass.setVisible(project.get('canCensorEnd'));
        this._buttonCensorEndReject.setVisible(project.get('canCensorEnd'));

        this._buttonCensorStartPass.setVisible(project.get('canCensorStart'));
        this._buttonCensorStartReject.setVisible(project.get('canCensorStart'));

        this._buttonSubmitStart.setVisible(project.get('canSubmitStart'));
        this._buttonSubmitEnd.setVisible(project.get('canSubmitEnd'));
        this._buttonUndoStart.setVisible(project.get('canUndoStart'));
        this._buttonUndoEnd.setVisible(project.get('canUndoEnd'));

        this._buttonClearAccountBookNumber.setVisible(project.get('canClearProjectAccountBookNumber'));
        this._buttonClearAccountBookNumber.setDisabled(!project.get('canClearProjectAccountBookNumber'))
    }
    this._resetButtonProject = function(project) {
        this._buttonEdit.project = project;
        this._buttonDelete.project = project;
        this._buttonWithDraw.project = project;
        this._buttonTerminate.project = project;
        this._buttonMemberManage.project = project;
        this._buttonPayPlanItemManage.project = project;
        this._buttonContractManage.project = project;
        this._buttonDocumentManage.project = project;
        this._buttonCensorEndPass.project = project;
        this._buttonCensorEndReject.project = project;
        this._buttonCensorStartPass.project = project;
        this._buttonCensorStartReject.project = project;
        this._buttonSubmitStart.project = project;
        this._buttonSubmitEnd.project = project;
        this._buttonUndoStart.project = project;
        this._buttonUndoEnd.project = project;
        this._buttonDocumentModelManage.project = project;
        this._buttonClearAccountBookNumber.project = project;
    }
    this._resetButtonVisibleAndDisabled(this._project);
}
Ext.extend(Srims.projects.ProjectShowPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel = function() {
    this._project = new Srims.projects.Project({});
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    var a = this._project.get("id");
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();
    this._amounts = 0;
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar(this, this._store, this._selections);
    this._toolBar.parentPanel = this;
    Srims.projects.ExpertGuideProjectOutGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        tbar: this._toolBar,
        width: 500,
        height: 170,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });

    this.validateedit = function(obj) {
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;
        //        var newstore=this._store.load();
        if (column == 0) {
            var corporation = editor.getValue();
            if (String.isEmpty(corporation)) {

                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协公司不能为空',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }
        }
        if (column == 1) {
            var allocationAmount = Money.toMoney(editor.getValue());
            if (grid.length > this._store.getRange().length)
                grid._amounts += allocationAmount;
            else
                grid._amounts += obj.value - obj.originalValue;
            if (allocationAmount <= 0) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配必须大于0',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }

        }
        return true;
    }
    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.project = project;
        this._store.toolBar = this._toolBar;

        this._store.load();
    }

    this.next = function() {
        var projectOuts = this._store.getRange();
        var flag = 1;
        for (var i = 0; i < projectOuts.length; i++) {
            if (projectOuts[i].get('amount') <= 0 || projectOuts[i].get('outSourcingName') == '')
                flag = 0;
        }
        if (flag == 0) {
            Ext.Msg.show({
                title: '外协填写错误',
                msg: '请检查所有外协单位不为空且分配数额大于0！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }
        else {
            Srims.expertGuide.next(this);
        }
    }
    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel, Ext.grid.EditorGridPanel, {});
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel = function() {
    Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "外拨单位",
        dataIndex: 'outSourcingName',
        sortable: false,
        hidden: false,
        width: 300,
        editor: new Srims.component.OutsourcingSearch.SearchComboBox({
            getValue: function() {
                return this.getText();
            },
            allowBlank: false,
            width: 300
        })
    }, {
        header: '外协分配合同额(万元)',
        dataIndex: 'amount',
         allowDecimals :true,
        sortable: false,
        width: 200,
        editor: new Srims.component.MoneyField({
            allowNegative: false,
            width: 200
        })
}]);
    }
    Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel, Ext.grid.ColumnModel);if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar = function(grid, store, selection) {

    this._selection = selection;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">外协分配</b>',
        minWidth: 60
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加外协预算',
        minWidth: 60,
        grid: grid,
        store: store,
        handler: function() {


            var voucherOut = new Srims.projects.ProjectOut({
                outSourcingName: '',
                amount: ''
            });

            this.grid.stopEditing();
            this.store.insert(0, voucherOut);
            this.grid.startEditing(0, 0);

        },
        tooltip: '<b>添加外协预算</b><br/>'
    });
    this._buttonNew2 = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建外协单位',
        minWidth: 60,
        store: store,
        handler: function() {
            this.store.grid = grid;
            //Srims.common.NewOutsourcing(this.store, true);
            Srims.common.showIsExistWindow(this.store);
        },
        tooltip: '<b>新建外协单位</b><br/>填写相应外协单位信息建立新的外协单位'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        selection: selection,
        store: store,
        minWidth: 60,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除外协分配', '你确定要删除这个外协分配吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    this.store.remove(this.selection.getSelected());
                    if (userIsExpert) {
                        this.panel.parentPanel._amounts = 0;
                        var outStore = this.store;
                        var projectOuts = outStore.getRange();
                        for (var i = 0; i < projectOuts.length; i++) {
                            this.panel.parentPanel._amounts += projectOuts[i].get('amount');
                        }
                    }
                    if (!userIsExpert) {
                        var amountB = 0;
                        var outStore = this.store;
                        var projectOuts = outStore.getRange();
                        for (var i = 0; i < projectOuts.length; i++) {
                            amountB += projectOuts[i].get('amount');
                        }
                        this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(amountB);
                        this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanIn.setValue(this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundTotal.getValue() - this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanOut.getValue())
                    }
                }

            }, this);
        },
        hidden: true,
        tooltip: '<b>删除外协预算</b><br/>删除选中的外协预算'
    });
    this._buttonDelete.panel = this;
    var items = [this._buttonHeader, this._buttonNew, this._buttonNew2, this._buttonDelete];
    Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items,
        height: 25
    });

    //initial
    this._selection.buttonDelete = this._buttonDelete;
    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonDelete = this.buttonDelete;

        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }

        buttonDelete.setVisible(true);
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar, Ext.Toolbar);if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectOut = Ext.data.Record.create([{
    name: 'amount',
    type: 'float',
    mapping: 'Amount'
}, {
    name: 'outSourcingName',
    type: 'string',
    mapping: 'OutsourcingName'
}]);
    Srims.data.Entity.apply(Srims.projects.ProjectOut);if (!Srims.projects)
    Ext.namespace("Srims.projects");

Srims.projects.ProjectOutStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.projects.ProjectOutStore.superclass.constructor.call(this, new Srims.projects.ProjectOutXmlReader(), load_url, params);
    }
});
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectOutXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.projects.ProjectOutXmlReader.superclass.constructor.call(this, Srims.projects.ProjectOut);
    }
});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_ProjectOutForm = function(project) {
    this._project = project;
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar(this, this._store, this._selections);
    this._toolBar.parentPanel = this;
    Srims.projects.ProjectEditPanel_ProjectOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协信息',
        store: this._store,
        cm: this._columnModel,
        tbar: this._toolBar,
        height: 170,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });

    this._store.load();
    this.validateedit = function(obj) {
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;

        var amountB = 0;
        var outStore = this._store;
        var projectOuts = outStore.getRange();
        for (var i = 0; i < projectOuts.length; i++) {
            if (projectOuts[i].get('amount')) {
                amountB += projectOuts[i].get('amount') * 1000000;
            }
        }
        amountB = amountB / 1000000;

        if (column == 0) {
            var corporation = editor.getValue();
            if (String.isEmpty(corporation)) {

                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协单位不能为空',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }
        }
        if (column == 1) {
            var allocationAmount = Money.toMoney(editor.getValue());
            if (grid.length > outStore.getRange().length) {
                var a = 0;
                a += obj.value;
                this.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(amountB + a);
            }
            else {
                var newValue = amountB * 1000000 + (obj.value * 1000000 - obj.originalValue * 1000000);
                this.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(newValue/1000000);
            }
            this.parentPanel._formPanelFund._numberFieldFundPlanIn.setValue(this.parentPanel._formPanelFund._numberFieldFundTotal.getValue() - this.parentPanel._formPanelFund._numberFieldFundPlanOut.getValue());

            if (allocationAmount <= 0) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配必须大于0',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }

        }
        return true;
    }
    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.project = project;
        this._store.toolBar = this._toolBar;
        this._store.load();
    }

    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.projects.ProjectEditPanel_ProjectOutForm, Ext.grid.EditorGridPanel, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_ProjectOutForm = function(project) {
    this._project = project;
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();

    this._gridPanelProjectMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoExpandColumn: 'taskName',
        autoExpand: true,
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true
        }
    });

    Srims.projects.ProjectShowPanel_ProjectOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectMember]
    });
    if (project.get('id'))
        this._store.load();

    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_ProjectOutForm, Ext.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_SecretProjectMessagePanel = function(){
    Srims.projects.ProjectEditPanel_SecretProjectMessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: Srims.currentUser.hasPermission_AddSecretProject,
        html: '<span style="color:#FF0000">注意：如果项目信息涉密，请直接提交书面材料至科技处！</span>'
    });
}
Ext.extend(Srims.projects.ProjectEditPanel_SecretProjectMessagePanel, Ext.Panel);
if (!Srims.projects)
	Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_BasicForm = function(project) {

    this._project = project;
    this._user = Srims.currentLoginLog.user;
    this._userIsExpert = this._user.userRoleType == 'Expert';
    this._hasSecondCollege = this._user.hasSecondCollege;

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '项目名称',
        value: project.get('name'),
        allowBlank: false,
        width: 480
    });
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        value: project.get('number'),
        disabled: project.get('isHorizontal'),
        hidden: this._userIsExpert && project.get('isHorizontal'),
        hideLabel: this._userIsExpert && project.get('isHorizontal'),
        width: 160
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密',
        checked: project.get('isSecret'),
        hidden: this._userIsExpert,
        hideLabel: this._userIsExpert,
        disabled: !Srims.currentUser.hasPermission_AddSecretProject
    });
    this._comboBoxPrincipal = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '项目负责人',
        value: !project.isNew() ? project.get('principal') : this._userIsExpert ? this._user.name : project.get('principal'),
        selectEntityId: !project.isNew() ? project.get('principalId') : this._userIsExpert ? this._user.expertId : project.get('principalId'),
        allowBlank: false,
        disabled: this._userIsExpert,
        hidden: this._userIsExpert,
        hideLabel: this._userIsExpert,
        width: 160
    });
    this._checkboxIsSecondCollege = new Ext.form.Checkbox({
        fieldLabel: '双聘单位',
        checked: project.get('isPrincipalSecondCollege')
        //disabled: this._userIsExpert ? (this._hasSecondCollege ? false : true) : true
    });

    this._comboBoxPrincipalDelegate = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '委托负责人',
        value: project.get('principalDelegate'),
        selectEntityId: project.get('principalDelegateId'),
        hidden: this._userIsExpert,
        hideLabel: this._userIsExpert,
        width: 160
    });
    this._comboBoxLevel = new Ext.form.ComboBox({
        fieldLabel: '项目级别',
        value: project.get('level'),
        store: Srims.projects.projectLevelStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        disabled: project.get('isHorizontal'),
        allowBlank: false,
        listWidth: 160,
        hidden: this._userIsExpert && project.get('isHorizontal'),
        hideLabel: this._userIsExpert && project.get('isHorizontal'),
        width: 160
    });
    this._comboBoxState = new Ext.form.ComboBox({
        fieldLabel: '项目状态',
        value: project.isNew() ? (Srims.currentUser.userRoleType == Srims.users.UserRoleType.Administrator ? Srims.projects.ProjectState.ProjectProcessing : Srims.projects.ProjectState.WaitingStartInformation) : project.get('state'),
        store: Srims.projects.projectStateEditStore,
        disabled: Srims.currentUser.userRoleType != Srims.users.UserRoleType.Administrator,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        listWidth: 160,
        hidden: this._userIsExpert && project.get('isHorizontal'),
        hideLabel: this._userIsExpert && project.get('isHorizontal'),
        width: 160
    });
    this._comboBoxResearchType = new Srims.component.NoticeTextComboBox({
        fieldLabel: '研究类型',
        value: project.get('researchType'),
        noticeTextType: 'ProjectResearchType',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._comboBoxCooperationType = new Srims.component.NoticeTextComboBox({
        fieldLabel: '合作类型',
        noticeTextType: 'ProjectCooperationType',
        value: project.get('cooperationType'),
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._dateFieldStartDate = new Ext.form.DateField({
        fieldLabel: '开始时间',
        value: project.get('startDate'),
        maxValue: project.get('endDate'),
        allowBlank: false,
        width: 160
    });
    this._dateFieldEndDate = new Ext.form.DateField({
        fieldLabel: '结束时间',
        value: project.get('endDate'),
        minValue: project.get('startDate'),
        allowBlank: false,
        width: 160
    });
    this._comboBoxFirstLevelSubject = new Srims.component.EntityComboBox({
        fieldLabel: '一级学科',
        editable: true,
        store: new Srims.common.SubjectFirstLevelStoreForApply(),
        displayField: 'name',
        value: project.get('firstLevelSubjectName'),
        entityId: project.get('firstLevelSubjectId'),
        allowBlank: this._userIsExpert ? false : true,
        width: 160
    });
    this._comboBoxSecondLevelSubject = new Srims.component.EntityComboBox({
        fieldLabel: '二级学科',
        mode: 'local',
        editable: true,
        store: new Srims.common.SubjectSecondLevelStoreForApply(),
        displayField: 'name',
        value: project.get('secondLevelSubjectName'),
        entityId: project.get('secondLevelSubjectId'),
        allowBlank: this._userIsExpert ? false : true,
        width: 160
    });
    this._comboBoxBase = new Srims.component.EntityComboBox({
        fieldLabel: '所属基地',
        editable: true,
        store: new Srims.bases.BaseStore(Srims.service.bases.BaseService + '/GetForShow', {}),
        displayField: 'name',
        value: project.get('baseName'),
        entityId: project.get('baseId'),
        width: 300,
        listWidth: 300
    });
    this._textFieldTaskComingFrom = new Ext.form.TextField({
        fieldLabel: '委托单位',
        value: project.get('taskComingFrom'),
        allowBlank:false,
        width: 160
    });
    //取得所在省份或城市
    this._getProvinceOrCity = function(project, index) {
        var project_taskCorporationPlace = project.get('corporationPlace');
        if (project_taskCorporationPlace != undefined && project_taskCorporationPlace.toString().trim() != '')
            project_taskCorporationPlace = project_taskCorporationPlace.split(' ')[index];
        else
            project_taskCorporationPlace = undefined;
        return project_taskCorporationPlace
    }
    var project_taskCorporationPlace_province = this._getProvinceOrCity(project, 0);
    this._comboBoxTaskCorporationPlace_Province = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        value: project_taskCorporationPlace_province,
        store: Provinces,
        allowBlank: false,
        editable: false,
        triggerAction: 'all',
        width: 65
    });
    var project_taskCorporationPlace_city = this._getProvinceOrCity(project, 1);
    this._comboBoxTaskCorporationPlace_City = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        hideLabel: true,
        value: project_taskCorporationPlace_city,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: project_taskCorporationPlace_province == undefined ? new Array() : Provinces.getCities(project_taskCorporationPlace_province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: false,
        editable: false,
        mode: 'local',
        triggerAction: 'all',
        width: 65
    });

    this.columnOneItems = [this._textFieldNumber, this._comboBoxPrincipal, this._comboBoxPrincipalDelegate, this._comboBoxLevel, this._comboBoxResearchType, this._dateFieldStartDate, this._comboBoxFirstLevelSubject];
    this.columnTwoItems = [this._checkboxIsSecret, this._checkboxIsSecondCollege, this._comboBoxState, this._comboBoxCooperationType, this._dateFieldEndDate, this._comboBoxSecondLevelSubject]

    if (project.get('isHorizontal')) {
        this.columnOneItems[this.columnOneItems.length] = this._textFieldTaskComingFrom;
        this.columnTwoItems[this.columnTwoItems.length] = new Ext.Panel({
            widht: 300,
            layout: 'column',
            items: [new Ext.Panel({
                width: 180,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Province
            }), new Ext.Panel({
                width: 80,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_City
            })]
        })
    }

    Srims.projects.ProjectEditPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: this.columnOneItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: this.columnTwoItems
            })]
        }), this._comboBoxBase]
    });

    //刷新学科的初始联动
    this._resetSubject = function(project) {
        if (project.get('firstLevelSubjectId') != undefined && project.get('firstLevelSubjectId') != '') {
            this._comboBoxSecondLevelSubject.store.load({
                params: {
                    firstLevelSubjectId: project.get('firstLevelSubjectId')
                }
            });
        } else
            this._comboBoxSecondLevelSubject.disable();
    }
    //学科的级联选择
    this._comboBoxFirstLevelSubject.comboBoxSecondLevelSubject = this._comboBoxSecondLevelSubject;
    this._resetSubject(project);

    //开始时间和结束之间之间的关联
    this._dateFieldStartDate.dateFieldEndDate = this._dateFieldEndDate;
    this._dateFieldEndDate.dateFieldStartDate = this._dateFieldStartDate;

    //城市之间的联动
    this._comboBoxTaskCorporationPlace_Province.comboBoxTaskCorporationPlace_City = this._comboBoxTaskCorporationPlace_City;

    //method
    this.assginValues = function() {
        this._project.set('name', this._textFieldName.getValue());
        this._project.set('number', this._textFieldNumber.getValue());
        this._project.set('state', this._comboBoxState.getValue());
        this._project.set('number', this._textFieldNumber.getValue());
        this._project.set('principal', this._comboBoxPrincipal.getText());
        this._project.set('isPrincipalSecondCollege', this._checkboxIsSecondCollege.getValue());
        this._project.set('principalId', this._comboBoxPrincipal.getValue());
        this._project.set('level', this._comboBoxLevel.getValue());
        this._project.set('firstLevelSubjectId', this._comboBoxFirstLevelSubject.getValue());
        this._project.set('firstLevelSubjectName', this._comboBoxFirstLevelSubject.getText());
        this._project.set('secondLevelSubjectId', this._comboBoxSecondLevelSubject.getValue());
        this._project.set('secondLevelSubjectName', this._comboBoxSecondLevelSubject.getText());
        this._project.set('researchType', this._comboBoxResearchType.getValue());
        this._project.set('cooperationType', this._comboBoxCooperationType.getValue());
        this._project.set('startDate', this._dateFieldStartDate.getValue());
        this._project.set('endDate', this._dateFieldEndDate.getValue());
        this._project.set('isSecret', this._checkboxIsSecret.getValue());
        this._project.set('baseId', this._comboBoxBase.getValue());
        this._project.set('baseName', this._comboBoxBase.getText());
        this._project.set('principalDelegate', this._comboBoxPrincipalDelegate.getText());
        this._project.set('principalDelegateId', this._comboBoxPrincipalDelegate.getValue());
        this._project.set('subjectName', this._comboBoxFirstLevelSubject.getText());
        if (this._comboBoxSecondLevelSubject.getValue() != undefined)
            this._project.set('subjectName', this._comboBoxFirstLevelSubject.getText() + ' - ' + this._comboBoxSecondLevelSubject.getText());

        if (this._project.get('isHorizontal')) {
            this._project.set('corporationPlace', this._comboBoxTaskCorporationPlace_Province.getValue() + ' ' + this._comboBoxTaskCorporationPlace_City.getValue());
            this._project.set('taskComingFrom', this._textFieldTaskComingFrom.getValue());
        }
    }
    this.isValid = function(preventMark) {

        var result = true;
        if (project.get('isHorizontal')) {
            result = this._textFieldName.isValid(preventMark) && result;
            result = this._comboBoxPrincipal.isValid(preventMark) && result;
            result = this._comboBoxResearchType.isValid(preventMark) && result;
            result = this._comboBoxCooperationType.isValid(preventMark) && result;
            result = this._comboBoxTaskCorporationPlace_Province.isValid(preventMark) && result;
            result = this._comboBoxTaskCorporationPlace_City.isValid(preventMark) && result;
            result = this._textFieldTaskComingFrom.isValid(preventMark) && result;
        }
        else {
            result = this._textFieldName.isValid(preventMark) && result;
            result = this._textFieldNumber.isValid(preventMark) && result;
            result = this._checkboxIsSecret.isValid(preventMark) && result;
            result = this._comboBoxPrincipal.isValid(preventMark) && result;
            result = this._comboBoxPrincipalDelegate.isValid(preventMark) && result;
            result = this._comboBoxLevel.isValid(preventMark) && result;
            result = this._comboBoxState.isValid(preventMark) && result;
            result = this._comboBoxResearchType.isValid(preventMark) && result;
            result = this._comboBoxCooperationType.isValid(preventMark) && result;
            result = this._dateFieldStartDate.isValid(preventMark) && result;
            result = this._dateFieldEndDate.isValid(preventMark) && result;
            result = this._comboBoxFirstLevelSubject.isValid(preventMark) && result;
            result = this._comboBoxSecondLevelSubject.isValid(preventMark) && result;
            result = this._comboBoxBase.isValid(preventMark) && result;

        }
        return result;
    }
    //event method
    this.onComboBoxFirstLevelSubject_Select = function(comboBox) {
        //处理学科的联动
        var firstLevelSubjectId = comboBox.getValue();
        var comboBoxSecondLevelSubject = comboBox.comboBoxSecondLevelSubject;

        if (firstLevelSubjectId == undefined) {
            return;
        }

        comboBoxSecondLevelSubject.enable();
        comboBoxSecondLevelSubject.setValue(undefined);
        comboBoxSecondLevelSubject.store.load({
            params: {
                firstLevelSubjectId: firstLevelSubjectId
            }
        });
    }
    this.onComboBoxFirstLevelSubject_Change = function(comboBox) {
        //处理一级学科为空的情况
        var firstLevelSubjectId = comboBox.getValue();
        var comboBoxSecondLevelSubject = comboBox.comboBoxSecondLevelSubject;

        if (firstLevelSubjectId != undefined) {
            return;
        }

        comboBoxSecondLevelSubject.disable();
        comboBoxSecondLevelSubject.setValue(undefined);
        comboBoxSecondLevelSubject.store.removeAll();
    }
    this.onComboBoxTaskCorporationPlace_Province_Select = function(comboBox) {
        var province = comboBox.getValue();
        var comboBoxTaskCorporationPlace_City = comboBox.comboBoxTaskCorporationPlace_City;
        var cityStore = comboBoxTaskCorporationPlace_City.store;
        var cities = Provinces.getCities(province);

        cityStore.loadData(cities);

        if (cityStore.getCount() == 1) {
            comboBoxTaskCorporationPlace_City.setValue(cities[0][0]);
        } else {
            comboBoxTaskCorporationPlace_City.setValue(undefined);
        }
    }
    //event
    this._comboBoxFirstLevelSubject.on('select', this.onComboBoxFirstLevelSubject_Select);
    this._comboBoxFirstLevelSubject.on('change', this.onComboBoxFirstLevelSubject_Change);

    this._comboBoxPrincipal.checkboxIsSecondCollege = this._checkboxIsSecondCollege;
    this.comboBoxPrincipal_Change = function(comboBox) {
        //处理专家变化
        var expertSecondCollege = comboBox.getEntity().get('college2');
        if (expertSecondCollege != '') {
            comboBox.checkboxIsSecondCollege.setDisabled(false);
        };
    }
    this._comboBoxPrincipal.on('select', this.comboBoxPrincipal_Change);

    this._comboBoxTaskCorporationPlace_Province.on('select', this.onComboBoxTaskCorporationPlace_Province_Select);

    this._dateFieldStartDate.on('change', function(dataField, newValue) {
        dataField.dateFieldEndDate.setMinValue(newValue);
    });
    this._dateFieldEndDate.on('change', function(dataField, newValue) {
        dataField.dateFieldStartDate.setMaxValue(newValue);
    });
    //刷新
    this._resetFormPanel = function(project) {
        this._project = project;
        this._textFieldName.setValue(project.get('name'));
        this._comboBoxResearchType.setValue(project.get('researchType'));
        this._comboBoxCooperationType.setValue(project.get('cooperationType'));

        this._dateFieldStartDate.setValue(project.get('startDate'));
        this._dateFieldStartDate.setMaxValue(project.get('endDate'));
        this._dateFieldEndDate.setValue(project.get('endDate'));
        this._dateFieldEndDate.setMinValue(project.get('startDate'));
        this._textFieldTaskComingFrom.setValue(project.get('taskComingFrom'));

        this._comboBoxFirstLevelSubject.setValue(project.get('firstLevelSubjectName'));
        this._comboBoxFirstLevelSubject.setSelectEntityId(project.get('firstLevelSubjectId'));
        this._comboBoxSecondLevelSubject.setValue(project.get('secondLevelSubjectName'));
        this._comboBoxSecondLevelSubject.setSelectEntityId(project.get('secondLevelSubjectId'));
        this._comboBoxBase.setValue(project.get('baseName'));
        this._comboBoxBase.setSelectEntityId(project.get('baseId'));

        this._textFieldNumber.setValue(project.get('number'));
        this._checkboxIsSecret.setValue(project.get('isSecret'));
        this._comboBoxLevel.setValue(project.get('level'));
        this._comboBoxState.setValue(project.isNew() ? (Srims.currentUser.userRoleType == Srims.users.UserRoleType.Administrator ? Srims.projects.ProjectState.ProjectProcessing : Srims.projects.ProjectState.WaitingStartInformation) : project.get('state'));

        this._comboBoxPrincipal.setValue(!project.isNew() ? project.get('principal') : this._userIsExpert ? this._user.name : project.get('principal'));
        this._checkboxIsSecondCollege.setValue(project.get('IsPrincipalSecondCollege'));
        this._comboBoxPrincipal.setSelectEntityId(!project.isNew() ? project.get('principalId') : this._userIsExpert ? this._user.expertId : project.get('principalId'));
        this._comboBoxPrincipalDelegate.setValue(project.get('principalDelegate'));
        this._comboBoxPrincipalDelegate.setSelectEntityId(project.get('principalDelegateId'));

        var project_taskCorporationPlace_province = this._getProvinceOrCity(project, 0);
        this._comboBoxTaskCorporationPlace_Province.setValue(project_taskCorporationPlace_province);
        var project_taskCorporationPlace_city = this._getProvinceOrCity(project, 1);
        this._comboBoxTaskCorporationPlace_City.setValue(project_taskCorporationPlace_city);

        this._resetSubject(project);
    }
}
Ext.extend(Srims.projects.ProjectEditPanel_BasicForm, Ext.form.FormPanel);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_TypeForm = function(project) {

    this._project = project;

    this._comboBoxRank = new Srims.component.EntityComboBox({
        fieldLabel: '项目级别',
        store: new Srims.type.ProjectRankStore(Srims.service.type.ProjectRankService + '/GetVerticalRanksForEdit'),
        displayField: 'name',
        value: project.get('rankName'),
        entityId: project.get('rankId'),
        editable: false,
        allowBlank: false,
        width: 160,
        listWidth: 160
    });
    this._comboBoxType = new Srims.component.EntityComboBox({
        fieldLabel: '项目类型',
        mode: 'local',
        store: new Srims.type.ProjectTypeStore(Srims.service.type.ProjectTypeService + '/GetForEdit'),
        displayField: 'name',
        value: project.get('typeName'),
        entityId: project.get('typeId'),
        editable: false,
        allowBlank: false,
        width: 300,
        listWidth: 300
    });
    this._comboBoxSupportCategory = new Srims.component.EntityComboBox({
        fieldLabel: '资助类别',
        mode: 'local',
        store: new Srims.type.ProjectSupportCategoryStore(),
        displayField: 'name',
        value: project.get('supportCategoryName'),
        entityId: project.get('supportCategoryId'),
        editable: true,
        width: 160,
        hidden: project.get('isHorizontal'),
        hideLabel: project.get('isHorizontal'),
        listWidth: 160
    });
    this._comboBoxSupportField = new Srims.component.EntityComboBox({
        fieldLabel: '资助领域',
        mode: 'local',
        store: new Srims.type.ProjectSupportFieldStore(),
        displayField: 'name',
        value: project.get('supportFieldName'),
        entityId: project.get('supportFieldId'),
        editable: true,
        width: 160,
        hidden: project.get('isHorizontal'),
        hideLabel: project.get('isHorizontal'),
        listWidth: 160
    });
    this._comboBoxSupportSubField = new Srims.component.EntityComboBox({
        fieldLabel: '资助子领域',
        id: '1',
        mode: 'local',
        store: new Srims.type.ProjectSupportSubFieldStore(),
        displayField: 'name',
        value: project.get('supportSubFieldName'),
        entityId: project.get('supportSubFieldId'),
        editable: true,
        hidden: project.get('isHorizontal'),
        hideLabel: project.get('isHorizontal'),
        width: 160,
        listWidth: 160
    });
    var items = [this._comboBoxRank, this._comboBoxType, this._comboBoxSupportCategory, new Ext.Panel({
        widht: 600,
        layout: 'column',
        items: [new Ext.Panel({
            width: 300,
            layout: 'form',
            style: 'width:300px',
            items: [this._comboBoxSupportField]
        }), new Ext.Panel({
            width: 300,
            style: 'width:300px',
            layout: 'form',
            items: [this._comboBoxSupportSubField]
        })]
    })];
    if (project.get('isHorizontal'))
        items.shift();

    Srims.projects.ProjectEditPanel_TypeForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '分类信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: items
    });

    //initial
    this._comboBoxRank.comboBoxType = this._comboBoxType;
    this._comboBoxType.comboBoxSupportCategory = this._comboBoxSupportCategory;
    this._comboBoxType.comboBoxSupportField = this._comboBoxSupportField;
    this._comboBoxSupportField.comboBoxSupportSubField = this._comboBoxSupportSubField;

    if (project.get('rankId')) {
        this._comboBoxType.store.load({
            params: {
                projectRankId: project.get('rankId')
            }
        });
    }
    else
        if (project.get('isHorizontal')) {
        this._comboBoxType.store.proxy.conn.url = Srims.service.type.ProjectTypeService + '/GetHorizontalTypesForEdit';
        this._comboBoxType.store.load();
    }
    else {
        this._comboBoxType.disable();
    }

    if (project.get('typeId')) {
        this._comboBoxSupportCategory.store.load({
            params: {
                projectTypeId: project.get('typeId')
            }
        });
        this._comboBoxSupportField.store.load({
            params: {
                projectTypeId: project.get('typeId')
            }
        });
    }
    else {
        this._comboBoxSupportCategory.disable();
        this._comboBoxSupportField.disable();
    }

    if (project.get('supportFieldId')) {
        this._comboBoxSupportSubField.store.load({
            params: {
                projectSupportFieldId: project.get('supportFieldId')
            }
        });
    }
    else {
        this._comboBoxSupportSubField.disable();
    }

    //method
    this.assginValues = function() {
        this._project.set('rankId', this._comboBoxRank.getValue());
        this._project.set('rankName', this._comboBoxRank.getText());
        this._project.set('typeId', this._comboBoxType.getValue());
        this._project.set('typeName', this._comboBoxType.getText());
        this._project.set('supportCategoryId', this._comboBoxSupportCategory.getValue());
        this._project.set('supportCategoryName', this._comboBoxSupportCategory.getText());
        this._project.set('supportFieldId', this._comboBoxSupportField.getValue());
        this._project.set('supportFieldName', this._comboBoxSupportField.getText());
        this._project.set('supportSubFieldId', this._comboBoxSupportSubField.getValue());
        this._project.set('supportSubFieldName', this._comboBoxSupportSubField.getText());
    }
    this.isValid = function(preventMark) {
        var result = true;

        if (!this._project.get('isHorizontal'))
            result = this._comboBoxRank.isValid(preventMark) && result;

        result = this._comboBoxType.isValid(preventMark) && result;

        return result;
    }

    //event method
    this._onComboBoxRank_select = function(comboBox) {
        var projectRankId = comboBox.getValue();
        var comboBoxType = comboBox.comboBoxType;

        comboBoxType.setValue(undefined);
        if (projectRankId == undefined) {
            comboBoxType.disable();
            comboBoxType.store.removeAll();
        }
        else {
            comboBoxType.enable();
            comboBoxType.store.load({
                params: {
                    projectRankId: projectRankId
                }
            });
        }
        comboBoxType.fireEvent('select', comboBoxType);
    }
    this._onComboBoxType_select = function(comboBox) {
        var projectTypeId = comboBox.getValue();
        var comboBoxSupportCategory = comboBox.comboBoxSupportCategory;
        var comboBoxSupportField = comboBox.comboBoxSupportField;

        comboBoxSupportCategory.setValue(undefined);
        comboBoxSupportField.setValue(undefined);

        if (projectTypeId == undefined) {
            comboBoxSupportCategory.disable();
            comboBoxSupportCategory.store.removeAll();

            comboBoxSupportField.disable();
            comboBoxSupportField.store.removeAll();
        }
        else {
            comboBoxSupportCategory.enable();
            comboBoxSupportCategory.store.load({
                params: {
                    projectTypeId: projectTypeId
                }
            });

            comboBoxSupportField.enable();
            comboBoxSupportField.store.load({
                params: {
                    projectTypeId: projectTypeId
                }
            });

        }
        comboBoxSupportField.fireEvent('select', comboBoxSupportField);
    }
    this._onComboBoxSupportField_select = function(comboBox) {
        var projectSupportFieldId = comboBox.getValue();
        var comboBoxSupportSubField = comboBox.comboBoxSupportSubField;

        comboBoxSupportSubField.setValue(undefined);
        if (projectSupportFieldId == undefined) {
            comboBoxSupportSubField.disable();
            comboBoxSupportSubField.store.removeAll();
        }
        else {
            comboBoxSupportSubField.enable();
            comboBoxSupportSubField.store.load({
                params: {
                    projectSupportFieldId: projectSupportFieldId
                }
            });
        }
    }

    //event
    this._comboBoxRank.on('select', this._onComboBoxRank_select);
    this._comboBoxType.on('select', this._onComboBoxType_select);
    this._comboBoxSupportField.on('select', this._onComboBoxSupportField_select);
    this._comboBoxSupportField.on('change', function(comboBox) {
        comboBox.fireEvent('select', comboBox);
    });
    //初始化
    this._initial = function(project) {
        if (project.get('rankId')) {
            this._comboBoxType.store.load({
                params: {
                    projectRankId: project.get('rankId')
                }
            });
        }
        else
            if (project.get('isHorizontal')) {
            this._comboBoxType.store.proxy.conn.url = Srims.service.type.ProjectTypeService + '/GetHorizontalTypesForEdit';
            this._comboBoxType.store.load();
        }
        else {
            this._comboBoxType.disable();
        }

        if (project.get('typeId')) {
            this._comboBoxSupportCategory.store.load({
                params: {
                    projectTypeId: project.get('typeId')
                }
            });
            this._comboBoxSupportField.store.load({
                params: {
                    projectTypeId: project.get('typeId')
                }
            });
        }
        else {
            this._comboBoxSupportCategory.disable();
            this._comboBoxSupportField.disable();
        }

        if (project.get('supportFieldId')) {
            this._comboBoxSupportSubField.store.load({
                params: {
                    projectSupportFieldId: project.get('supportFieldId')
                }
            });
        }
        else {
            this._comboBoxSupportSubField.disable();
        }

    }
    //刷新
    this._resetFormPanel = function(project) {
        this._project = project;

        this._comboBoxRank.setValue(project.get('rankName'));
        this._comboBoxRank.setSelectEntityId(project.get('rankId'));
        this._comboBoxType.setValue(project.get('typeName'));
        this._comboBoxType.setSelectEntityId(project.get('typeId'));
        this._comboBoxSupportCategory.setValue(project.get('supportCategoryName'));
        this._comboBoxSupportCategory.setSelectEntityId(project.get('supportCategoryId'));
        this._comboBoxSupportField.setValue(project.get('supportFieldName'));
        this._comboBoxSupportField.setSelectEntityId(project.get('supportFieldId'));
        this._comboBoxSupportSubField.setValue(project.get('supportSubFieldName'));
        this._comboBoxSupportSubField.setSelectEntityId(project.get('supportSubFieldId'));

        this._initial(project);
    }
}
Ext.extend(Srims.projects.ProjectEditPanel_TypeForm, Ext.form.FormPanel);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_FundForm = function(project, formBasic,
		formType, projectOutPanel) {
    this._project = project;
    this._formBasic = formBasic;
    this._formType = formType;
    this._formFund = this;
    this._projectOutPanel = projectOutPanel;

    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    this._numberFieldFundContract = new Srims.component.MoneyField({
        fieldLabel: '项目合同额(万元)',
        value: project.get('fundContract'),
        allowBlank: false,
        width: 120
    });
    this._fieldOverheadExpensesInStandard = new Srims.component.MoneyField({
        fieldLabel: '校内基准间接费',
        value: project.get('overheadExpensesInStandard'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 120
    });
    this._numberFieldFundTotal = new Srims.component.MoneyField({
        fieldLabel: '到校经费(万元)',
        value: project.get('fundTotal'),
        allowBlank: false,
        disabled: project.get('level') == Srims.projects.ProjectLevel.Perside,
        width: 120
    });
    this._numberFieldFundPlanIn = new Srims.component.MoneyField({
        fieldLabel: '计划校内分配(万元)',
        value: project.get('fundPlanIn'), //
        allowBlank: false,
        disabled: true,
        width: 120
    });
    var amountA = 0;

    this._numberFieldFundPlanOut = new Srims.component.MoneyField({
        fieldLabel: '计划外协分配(万元)',
        value: project.get('fundPlanOut'),
        allowBlank: false,
        disabled: true,
        width: 120
    });

    this._numberFieldOverheadExpenseInTotal = new Srims.component.MoneyField({
        fieldLabel: '校内合同间接费(万元)',
        value: project.get('campusIndirectCosts'),
        disabled: Srims.currentUser.isExpert,
        allowBlank: false,
        readOnly: Srims.currentUser.isExpert,
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._numberFieldOverheadExpenseOutTotal = new Srims.component.MoneyField({
        fieldLabel: '外协分配管理费(万元)',
        value: project.get('overheadExpenseOutTotal'),
        disabled: !Srims.currentUser.isSuper,
        allowBlank: false,
        hidden: (userIsExpert && project.get('isHorizontal')) || (!project.get('isHorizontal')),
        hideLabel: (userIsExpert && project.get('isHorizontal')) || (!project.get('isHorizontal')),
        width: 120
    });
    this._percentFieldFundManageProportion = new Srims.component.PercentField({
        fieldLabel: '国家规定管理费比例',
        value: project.get('fundManageProportion'),
        allowBlank: false,
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 120
    });
    this._numberFieldPerformancePay = new Srims.component.MoneyField({
        fieldLabel: '校内合同绩效(万元)',
        value: project.get('performancePay') + 0,
        disabled: Srims.currentUser.isExpert,
        allowBlank: false,
        readOnly: Srims.currentUser.isExpert,
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._numberFieldPerformancePayAlready = new Srims.component.MoneyField({
        fieldLabel: '已分配绩效工资(万元)',
        value: project.get('performancePayAlready'),
        disabled: !Srims.currentUser.isSuper,
        allowBlank: false,
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 120
    });
    this._textFieldFundFrom = new Ext.form.TextField({
        fieldLabel: '经费来源',
        value: project.get('fundFrom'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300
    });
    this._textFieldFundFromUnit = new Ext.form.TextField({
        fieldLabel: '来款单位',
        value: project.get('fundFromUnit'),
        width: 300
    });
    this._textFieldFundFromUnitAddress = new Ext.form.TextField({
        fieldLabel: '来款单位地址',
        value: project.get('fundFromUnitAddress'),
        width: 420
    });
    this._numberFieldEquipmentCost = new Srims.component.MoneyField({
        fieldLabel: '总设备购置费(万元)',
        value: project.get('equipmentCost'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        allowBlank: false,
        width: 120
    });
    this._fieldPerformancePayStandard = new Srims.component.MoneyField({
        fieldLabel: '校内基准绩效',
        value: project.get('performancePayStandard'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 120
    });
    this._fieldProjectOverheadExpensesTotal = new Srims.component.MoneyField({
        fieldLabel: '项目总间接费',
        value: project.get('indirectCosts'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._fieldProjectPerformanceTotal = new Srims.component.MoneyField({
        fieldLabel: '项目总绩效',
        value: project.get('projectPerformancePay'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    Srims.projects.ProjectEditPanel_FundForm.superclass.constructor.call(this,
			{
			    collapsible: true,
			    title: '经费信息',
			    autoHeight: true,
			    frame: true,
			    labelWidth: 140,
			    bodyStyle: 'padding:5px 5px 0',
			    style: 'margin-bottom: 2px',
			    defaultType: 'textfield',
			    titleCollapse: true,
			    listeners: {
			        afterlayout: function(panel) {
			            if (userIsExpert)
			                if (panel._projectOutPanel) {
			                var amount = panel._projectOutPanel._amounts;
			                panel._numberFieldFundPlanOut.setValue(amount);
			            }

			        }
			    },
			    items: [
						new Ext.Panel({
						    widht: 600,
						    layout: 'column',
						    items: [new Ext.Panel({
						        width: 300,
						        layout: 'form',
						        style: 'width:300px',
						        items: [
										this._numberFieldFundContract,
										this._numberFieldFundPlanIn,
										this._numberFieldEquipmentCost,
										this._fieldProjectOverheadExpensesTotal,
										this._numberFieldOverheadExpenseInTotal,
										this._fieldOverheadExpensesInStandard

							]
						    }), new Ext.Panel({
						        width: 300,
						        style: 'width:300px',
						        layout: 'form',
						        items: [
										this._numberFieldFundTotal,
										this._numberFieldFundPlanOut,
										this._numberFieldOverheadExpenseOutTotal,
										this._fieldProjectPerformanceTotal,
										this._numberFieldPerformancePay,
										this._fieldPerformancePayStandard

										]
						    })]
						}), this._textFieldFundFrom,
						this._textFieldFundFromUnit,
						this._textFieldFundFromUnitAddress]

			});


    // method
    this.assginValues = function() {
        this._project.set('fundContract', this._numberFieldFundContract
						.getMoney());
        this._project.set('fundTotal', this._numberFieldFundTotal.getMoney());
        this._project.set('fundPlanIn', this._numberFieldFundPlanIn.getMoney());
        this._project.set('indirectCosts', this._fieldProjectOverheadExpensesTotal.getMoney());
        this._project.set('projectPerformancePay', this._fieldProjectPerformanceTotal.getMoney());
        this._project.set('fundPlanOut', this._numberFieldFundPlanOut
						.getMoney());
        this._project.set('overheadExpenseInTotal',
				this._numberFieldOverheadExpenseInTotal.getMoney() - this._numberFieldPerformancePay.getMoney());
        if (this._numberFieldOverheadExpenseOutTotal.getMoney())
            this._project.set('overheadExpenseOutTotal', this._numberFieldOverheadExpenseOutTotal.getMoney());
        else
            this._project.set('overheadExpenseOutTotal', 0);
        //this._numberFieldOverheadExpenseOutTotal.getMoney());
        this._project.set('fundManageProportion',
				this._percentFieldFundManageProportion.getValue());
        this._project.set('performancePay', this._numberFieldPerformancePay
						.getMoney());
        this._project.set('performancePayAlready', 0);
        this._project.set('fundFrom', this._textFieldFundFrom.getValue());
        this._project.set('fundFromUnit', this._textFieldFundFromUnit
						.getValue());
        this._project.set('fundFromUnitAddress',
				this._textFieldFundFromUnitAddress.getValue());
        this._project.set('equipmentCost',
				this._numberFieldEquipmentCost.getMoney());
        this._project.set('projectPerformancePay', this._fieldProjectPerformanceTotal.getMoney());
        this._project.set('campusIndirectCosts', this._numberFieldOverheadExpenseInTotal.getMoney());
        
    }
    this.isValid = function(preventMark) {
        var result = true;
        //result = this._Amount.isValid(preventMark) && result;
        if (project.get('isHorizontal')) {
            result = this._numberFieldFundContract.isValid(preventMark) && result;


        }
        else {
            result = this._numberFieldFundContract.isValid(preventMark) && result;
            result = this._numberFieldFundTotal.isValid(preventMark) && result;
            result = this._numberFieldFundPlanIn.isValid(preventMark) && result;
            result = this._numberFieldFundPlanOut.isValid(preventMark) && result;
            result = this._numberFieldOverheadExpenseInTotal.isValid(preventMark)
				&& result;
            result = this._numberFieldEquipmentCost.isValid(preventMark) && result;
            //            result = this._numberFieldOverheadExpenseOutTotal.isValid(preventMark)
            //				&& result;
            result = this._percentFieldFundManageProportion.isValid(preventMark)
				&& result;
            result = this._numberFieldPerformancePay.isValid(preventMark) && result;
            result = this._fieldProjectPerformanceTotal.isValid(preventMark) && result;
            //		&& result;
        }

        return result;
    }
    this.validateOverheadExpenseIn = function() {
        if (this._numberFieldFundPlanIn.getMoney() >= this._numberFieldOverheadExpenseInTotal
				.getMoney())
            return true;

        Ext.Msg.show({
            title: '校内管理费错误',
            msg: '校内管理费不能大于项目的计划校内分配',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    this.validateOverheadExpenseOut = function() {
        if (this._numberFieldFundPlanOut.getMoney() >= this._numberFieldOverheadExpenseOutTotal
				.getMoney())
            return true;

        Ext.Msg.show({
            title: '外协管理费错误',
            msg: '外协管理费不能大于项目的计划外协分配',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    // 获取新提出的管理费方案中的费率
    this.getManagementFees = function(managementFeeType,
			projectType_RateFieldName, projectTypeId, projectRankId, fundTotal, arriveSchoolFee, deviceCost, contractTotal) {
        if (userIsExpert)
            return 0;
        var params = {};
        var result = {};
        var managementFee_Fee = undefined;
        var managementFee_PerformancePay = undefined;
        var managementFee = undefined;

        if (managementFeeType == undefined || fundTotal == undefined
				|| projectType_RateFieldName == undefined || isNaN(fundTotal)
				|| fundTotal == '')
            return 0;
        params.ManagementFeeType = managementFeeType;
        params.paraType = projectType_RateFieldName;
        params.projectTypeId = projectTypeId;
        params.projectLevel = projectRankId;
        params.fundTotal = Math.round(fundTotal * 10000 * 1000000 / 10000);
        params.arriveSchoolFee = Math.round(arriveSchoolFee * 10000 * 1000000 / 10000);
        params.deviceCost = Math.round(deviceCost * 10000 * 1000000 / 10000);
        params.contractTotal = Math.round(contractTotal * 10000 * 1000000 / 10000);

        var conn = Ext.lib.Ajax.getConnectionObject().conn;
        var url = Srims.service.type.ManagementFeesService
				+ '/GetAllManagementFeesByType';
        // 以GET方式发送参数在IE浏览器下无法获取返回值，需要添加Header属性使用POST方法
        conn.open('POST', url, false);
        conn.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=UTF-8");
        conn.send('ManagementFeeType=' + params.ManagementFeeType
				 + '&paraType=' + params.paraType
				 + '&projectTypeId=' + params.projectTypeId
				 + '&projectLevel=' + params.projectLevel
				 + '&fundTotal=' + params.fundTotal
				 + '&arriveSchoolFee=' + params.arriveSchoolFee
				 + '&deviceCost=' + params.deviceCost
				 + '&contractTotal=' + params.contractTotal);
        if (conn.status == '200') {
            var rateResult = conn.responseText;
            if (!isNaN(rateResult))
                return parseInt(rateResult);
        }
        //        Ext.Msg.show({
        //            title: '费率获取错误',
        //            msg: '无法获取对应的管理费率，将按照0来计算',
        //            buttons: Ext.Msg.OK,
        //            icon: Ext.MessageBox.WARNING
        //        });

        return 0;
    }
    this.getOverheadExpenseRate = function(projectType_RateFieldName, newValue) {
        var projectType = formType._comboBoxType.getEntity();
        var projectSupportCategory = formType._comboBoxSupportCategory
				.getEntity();

        if (projectType == undefined)
            return undefined;

        // 考虑某些资助类别不收取管理费的情况
        if (projectSupportCategory != undefined
				&& !projectSupportCategory.get('isGetOverheadExpense'))
            return 0;
        // 原8521费率
        /*
        * if (projectType.get('isBudget') && projectType_RateFieldName ==
        * 'overheadExpenseInRate') return this.getOverheadExpenseBudgetRate();
        */
        if (projectType_RateFieldName == 'overheadExpensePerformancePayRate'
				|| projectType_RateFieldName == 'overheadExpenseInRate') {
            var managementFeeType = projectType.get('managementFeesType');
            var projectTypeId = projectType.get('id');
            var projectRankId = formBasic._comboBoxLevel.getValue();
            var fundTotal = this._numberFieldFundPlanIn.getValue();
            var arriveSchoolFee = this._numberFieldFundTotal.getValue();
            var deviceCost = this._numberFieldEquipmentCost.getValue();
            var contractTotal = this._numberFieldFundContract.getValue();

            return this.getManagementFees(managementFeeType,
					projectType_RateFieldName, projectTypeId, projectRankId, fundTotal, arriveSchoolFee, deviceCost, contractTotal).div(10000);
        }

        return projectType.get(projectType_RateFieldName).div(10000); // 百分数以万分之一为单位
    }
    // 此函数暂时不用啦啦啦
    this.getOverheadExpenseBudgetRate = function() {
        var fundContract = parseFloat(this._numberFieldFundContract.getValue())
				* 10000 * 100;
        var baseLine = [0, 100 * 100 * 10000, 500 * 100 * 10000,
				1000 * 100 * 10000];
        var baseRate = [0.08, 0.05, 0.02, 0.01];

        var i = 0;
        var rate = 0;

        for (i = 1; i <= (parseInt(baseLine.length, 10) - 1)
				&& parseFloat(baseLine[i]) < fundContract; i++) {
            var baselineValue1 = parseFloat(baseLine[i]);
            var baselineValue2 = parseFloat(baseLine[i - 1]);
            var baseRateValue1 = parseFloat(baseRate[i - 1]);
            rate += (parseFloat((baselineValue1).sub(baselineValue2)))
					.mul(baseRateValue1);
        }

        var baseLineValue = parseFloat(baseLine[i - 1]);
        var baseRateValue = parseFloat(baseRate[i - 1]);
        var fundLeveal = parseFloat((parseFloat((fundContract)
				.sub(baseLineValue))).mul(baseRateValue));
        var overheadExpenseAll = parseFloat(((parseFloat(rate)).add(fundLeveal)))

        return parseFloat((overheadExpenseAll).div(fundContract));
    }

    this.updateOverheadExpense = function() {
        if (this._numberFieldFundPlanIn.getValue() != '')
            this._onNumberFieldFundPlan_Change(this._numberFieldFundPlanIn,
        					this._numberFieldFundPlanIn.getValue(), '');

        if (this._numberFieldFundPlanOut.getValue() != '')
            this._onNumberFieldFundPlan_Change(this._numberFieldFundPlanOut,
        					this._numberFieldFundPlanOut.getValue(), '');
    }

    // event method
    this._onFormBasic_ProjectLevel_Select = function(comboBox_ProjectLevel) {
        var numberFieldFundContract = comboBox_ProjectLevel.formFund._numberFieldFundContract;
        var numberFieldFundTotal = comboBox_ProjectLevel.formFund._numberFieldFundTotal;

        if (comboBox_ProjectLevel.getValue() == Srims.projects.ProjectLevel.Perside) {
            var oldValue = numberFieldFundTotal.getValue();
            var newValue = numberFieldFundContract.getValue();
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.disable();
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        } else if (comboBox_ProjectLevel.getValue() == Srims.projects.ProjectLevel.Join) {
            var oldValue = numberFieldFundTotal.getValue();
            var newValue = numberFieldFundContract.getValue();
            numberFieldFundTotal.enable();
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue); //参与 函数
        }
        else {
            numberFieldFundTotal.enable();
        }
    }
    this._onFormType_Type_Selelct = function(comboBox) {
        if (comboBox.getValue() == undefined)
            return;
        comboBox.formFund._numberFieldOverheadExpenseOutTotal.setValue(0);
        //如果是类型是科技转让，则没有外协经费，经费为0.（2013、2、23）
        if (comboBox.getValue() == 3) {
            var formFund = comboBox.formFund;
            formFund._numberFieldFundPlanIn.setDisabled(true);
            formFund._numberFieldFundPlanOut.setDisabled(true);
            formFund._numberFieldFundPlanOut.setValue(0);
            formFund._numberFieldFundPlanIn.setValue(formFund._numberFieldFundTotal.getMoney() / 1000000);
            return;
        }

        else {
            var formFund = comboBox.formFund;


            if (userIsExpert) {
                if (formFund._projectOutPanel) {
                    var amount = formFund._projectOutPanel._amounts;
                    formFund._numberFieldFundPlanOut.setValue(amount);
                }
            }
            else {
                var amountB = 0;
                var outStore = formFund.parentPanel._projectOutPanel._store;
                var projectOuts = outStore.getRange();
                for (var i = 0; i < projectOuts.length; i++) {
                    amountB += projectOuts[i].get('amount');
                }

                formFund._numberFieldFundPlanOut.setValue(amountB);
            }

        }
        comboBox.formFund._numberFieldFundPlanIn.setValue((comboBox.formFund._numberFieldFundTotal.getMoney() - comboBox.formFund._numberFieldFundPlanOut.getMoney()) / 1000000); //3.2wanshang 
        comboBox.formFund.updateOverheadExpense();
    }
    this._onFormBasic_TaskComingFrom_Change = function(textFieldTaskComingFrom,
			newValue, oldValue) {
        var formFund = textFieldTaskComingFrom.formFund;
        var textFieldFundFrom = formFund._textFieldFundFrom;
        var textFieldFundFromUnit = formFund._textFieldFundFromUnit;

        if (textFieldFundFrom.getValue() == ''
				|| textFieldFundFrom.getValue() == oldValue)
            textFieldFundFrom.setValue(newValue);
        if (textFieldFundFromUnit.getValue() == ''
				|| textFieldFundFromUnit.getValue() == oldValue)
            textFieldFundFromUnit.setValue(newValue);
    }
    /////合同额变化
    this._onNumberFieldFundContract_Change = function(numberFieldFundContract,
			newValue, oldValue) {
        var formFund = numberFieldFundContract.formFund;
        var numberFieldFundTotal = numberFieldFundContract.numberFieldFundTotal;

        formFund.updateOverheadExpense();

        if (numberFieldFundTotal.getValue() == oldValue) {
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        }
    }
    this._numberFieldEquipmentCost_Change = function(numberFieldEquipmentCost, newValue, oldValue) {
        var formFund = numberFieldEquipmentCost.formFund;
        var numberFieldFundTotal = numberFieldEquipmentCost.numberFieldFundTotal;

        formFund.updateOverheadExpense();

        if (numberFieldFundTotal.getValue() == oldValue) {
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        }
    }
    /////到校经费变化
    this._onNumberFieldFundTotal_Change = function(numberFieldFundTotal,
			newValue, oldValue) {
        var formFund = numberFieldFundTotal.formFund; //3.2晚上
        var numberFieldFundPlanIn = numberFieldFundTotal.numberFieldFundPlanIn;
        var numberFieldFundPlanOut = numberFieldFundTotal.numberFieldFundPlanOut;
        var numberFieldFundPlanIn_OldValue = numberFieldFundPlanIn.getValue();
        var numberFieldFundPlanOut_OldValue = numberFieldFundPlanOut.getValue();

        var isAllocatedEmpty = numberFieldFundPlanIn_OldValue == ''
        				&& numberFieldFundPlanOut_OldValue == '';
        var isAllocatedDefault = numberFieldFundPlanIn_OldValue == oldValue
        				&& numberFieldFundPlanOut_OldValue == '0';

        if (isAllocatedEmpty || isAllocatedDefault) {
            numberFieldFundPlanIn.setValue(newValue);
            numberFieldFundPlanIn.fireEvent('change', numberFieldFundPlanIn,
        					newValue, numberFieldFundPlanIn_OldValue);

            numberFieldFundPlanOut.setValue(0);
            numberFieldFundPlanOut.fireEvent('change', numberFieldFundPlanOut,
        					'0', numberFieldFundPlanOut_OldValue);
        }
        //3.2晚上
        formFund._numberFieldFundPlanIn.setValue((formFund._numberFieldFundTotal.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000);
        formFund.updateOverheadExpense();
    }
    this._onNumberFieldFundPlan_Change = function(numberFieldPlan, newValue,
			oldValue, SycnOtherPlanItem) {
        var formFund = numberFieldPlan.formFund;
        var numberFieldOverheadExpense = numberFieldPlan.numberFieldOverheadExpense;
        var projectType_RateFieldName = numberFieldPlan.projectType_RateFieldName;

        // 同步校内和外协，使其和等于总经费
        //        if (SycnOtherPlanItem == undefined) {
        //            var fundTotal = parseFloat(formFund._numberFieldFundTotal
        //					.getValue());
        //            var otherFundPlan = fundTotal.sub(parseFloat(newValue));
        //            if (otherFundPlan < 0)
        //                otherFundPlan = undefined;

        //            var otherPlanItem = numberFieldPlan.otherPlanItem;
        //            var otherFundPlan_OldValue = otherPlanItem.getValue();

        //            otherPlanItem.setValue(otherFundPlan);
        //            otherPlanItem.fireEvent('change', otherPlanItem, otherFundPlan,
        //					otherFundPlan_OldValue, true);

        //            formFund._numberFieldFundTotal.validate();
        //        }

        var overheadExpenseRate = formFund.getOverheadExpenseRate(
				projectType_RateFieldName, newValue);

        // 无法计算管理费的情况
        if ((newValue != '0' && newValue == '')
				|| overheadExpenseRate == undefined) {
            if (numberFieldOverheadExpense.getValue() != ''
					|| numberFieldOverheadExpense.getValue() == '0') {
                numberFieldOverheadExpense.setValue('');
            }
            return;
        }

        // 为判断是否已经手工指定准备条件
        var overheadExpense_Old = numberFieldOverheadExpense.getValue();
        var isForceReCalculate = oldValue == '';
        var isOldEmpty = overheadExpense_Old == '';
        var isOldDefault = parseFloat(overheadExpense_Old) == parseFloat(oldValue)
				.mul(overheadExpenseRate).toFixed(6);
        // 判断费用 有没有更改
        var isChange = parseFloat(overheadExpense_Old) != parseFloat(newValue)
				.mul(overheadExpenseRate).toFixed(6);

        // 如果不是手工指定，即为空或为默认
        if (isForceReCalculate || isOldEmpty || isOldDefault || isChange) {
            var overheadExpense_New = parseFloat(newValue)
					.mul(overheadExpenseRate);
            numberFieldOverheadExpense.setValue(overheadExpense_New);
            numberFieldOverheadExpense.fireEvent('change',
					numberFieldOverheadExpense, overheadExpense_New,
					overheadExpense_Old);
            numberFieldOverheadExpense.beforeBlur();
        }

        // 处理总绩效工资
        if (projectType_RateFieldName == 'overheadExpenseInRate') {
            numberFieldPlan.numberFieldOverheadExpense = formFund._fieldPerformancePayStandard;
            numberFieldPlan.projectType_RateFieldName = 'overheadExpensePerformancePayRate';
            numberFieldPlan.fireEvent('change', numberFieldPlan, newValue,
            		oldValue, true);
            numberFieldPlan.numberFieldOverheadExpense = formFund._fieldOverheadExpensesInStandard;
            numberFieldPlan.projectType_RateFieldName = 'overheadExpenseInRate';
            var rankId = formType._comboBoxType.getEntity();
            var isBudget = rankId.get('isBudget');
            if (!isBudget) {
                formFund._numberFieldPerformancePay.setValue(formFund._fieldPerformancePayStandard.getValue());
                formFund._numberFieldOverheadExpenseInTotal.setValue(formFund._fieldOverheadExpensesInStandard.getValue());
            }
        }

    }
    this._numberFieldFundContract_Validator = function(value) {
        var formFund = this.formFund;
        formFund._numberFieldFundPlanIn.setValue((formFund._numberFieldFundTotal.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000);
        if (this.getMoney() < formFund._numberFieldFundPlanOut.getMoney()) {
            this.invalidText = '合同额应大于预分配外协经费。';
            return false;
        }

        return true;
    }

    // validator
    this._numberFieldFundTotal_Validator = function(value) {
        var formFund = this.formFund;
        formFund._numberFieldFundPlanIn.setValue((this.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000); //修改到校经费变化校内计划分配
        if (this.getMoney() > formFund._numberFieldFundContract.getMoney()) {
            this.invalidText = '总经费（到校经费）不能大于合同额。';
            return false;
        }

        if (formFund._numberFieldFundPlanIn.getMoney()
				&& formFund._numberFieldFundPlanIn.getMoney()
						.add(formFund._numberFieldFundPlanOut.getMoney()) != this
						.getMoney()) {
            this.invalidText = '校内分配和外协分配的和必须等于总经费（到校经费）。';
            return false;
        }
        if (project.get('fundAlreadyTotal') > this.getMoney()) {
            this.invalidText = '到校经费必须大于项目的已到经费';
            return false;
        }
        return true;
    }

    this._numberFieldEquimentCost_Validator = function(value) {
        var formFund = this.formFund;

        if (this.getMoney() > formFund._numberFieldFundContract.getMoney()) {
            this.invalidText = '设备购置费不能大于合同额。';
            return false;
        }

        return true;
    }
    // initial controls
    this._formBasic._comboBoxLevel.formFund = this;
    this._formBasic._textFieldTaskComingFrom.formFund = this;

    this._formType._comboBoxType.formFund = this;
    this._formType._comboBoxSupportCategory.formFund = this;

    this._numberFieldFundContract.formFund = this;
    this._numberFieldFundContract.numberFieldFundTotal = this._numberFieldFundTotal;
    this._numberFieldFundContract.validator = this._numberFieldFundContract_Validator;

    this._numberFieldEquipmentCost.formFund = this;
    this._numberFieldEquipmentCost.numberFieldFundTotal = this._numberFieldFundTotal;

    this._numberFieldFundTotal.formFund = this;
    this._numberFieldFundTotal.numberFieldFundPlanIn = this._numberFieldFundPlanIn;
    this._numberFieldFundTotal.numberFieldFundPlanOut = this._numberFieldFundPlanOut;
    this._numberFieldFundTotal.numberFieldPerformancePay = this._numberFieldPerformancePay;
    this._numberFieldFundTotal.validator = this._numberFieldFundTotal_Validator;

    this._numberFieldEquipmentCost.formFund = this;
    this._numberFieldEquipmentCost.validator = this._numberFieldEquimentCost_Validator;



    // 间接管理费
    this._numberFieldFundPlanIn.formFund = this;
    this._numberFieldFundPlanIn.numberFieldOverheadExpense = this._fieldOverheadExpensesInStandard;
    this._numberFieldFundPlanIn.projectType_RateFieldName = 'overheadExpenseInRate';
    this._numberFieldFundPlanIn.otherPlanItem = this._numberFieldFundPlanOut;

    this._numberFieldFundPlanOut.formFund = this;
    this._numberFieldFundPlanOut.numberFieldOverheadExpense = this._numberFieldOverheadExpenseOutTotal;
    this._numberFieldFundPlanOut.projectType_RateFieldName = 'overheadExpenseOutRate';
    this._numberFieldFundPlanOut.otherPlanItem = this._numberFieldFundPlanIn;

    // event
    this._formBasic._comboBoxLevel.on('select',
			this._onFormBasic_ProjectLevel_Select);
    this._formBasic._textFieldTaskComingFrom.on('change',
			this._onFormBasic_TaskComingFrom_Change);
    this._formType._comboBoxType.projectOutPanel = this._projectOutPanel;
    this._formType._comboBoxType.on('select', this._onFormType_Type_Selelct);
    this._formType._comboBoxSupportCategory.on('select',
			this._onFormType_Type_Selelct);

    this._numberFieldFundContract.on('change',
			this._onNumberFieldFundContract_Change);
    this._numberFieldFundTotal
			.on('change', this._onNumberFieldFundTotal_Change);
    this._numberFieldEquipmentCost.on('change',
			this._numberFieldEquipmentCost_Change);
    this._numberFieldFundPlanIn
			.on('change', this._onNumberFieldFundPlan_Change);
    this._numberFieldFundPlanOut.on('change',
			this._onNumberFieldFundPlan_Change);

    // 刷新
    this._resetFormPanel = function(project, formBasic, formType) {
        this._project = project;
        this._formBasic = formBasic;
        this._formType = formType;
        this._numberFieldFundContract.setValue(Money.render(project
						.get('fundContract'), false));
        this._numberFieldFundTotal.setValue(Money.render(project
						.get('fundTotal'), false));
        this._fieldProjectOverheadExpensesTotal.setValue(Money.render(project
						.get('indirectCosts'), false)); //
        this._fieldProjectPerformanceTotal.setValue(Money.render(project
						.get('projectPerformancePay'), false)); //
        this._numberFieldFundTotal
				.setDisabled(project.get('level') == Srims.projects.ProjectLevel.Perside);
        this._numberFieldFundPlanIn.setValue(Money.render(project
						.get('fundPlanIn'), false));
        this._numberFieldFundPlanOut.setValue(Money.render(project
						.get('fundPlanOut'), false));
        this._numberFieldOverheadExpenseInTotal.setValue(Money.render(project
						.get('overheadExpenseInTotal'), false) + Money.render(project
						.get('performancePay'), false));
        this._numberFieldOverheadExpenseOutTotal.setValue(Money.render(project
						.get('overheadExpenseOutTotal'), false));
        this._percentFieldFundManageProportion.setValue(Money.render(project
						.get('fundManageProportion'), false));
        this._numberFieldPerformancePay.setValue(Money.render(project
						.get('performancePay'), false));
        this._fieldProjectPerformanceTotal.setValue(Money.render(project
						.get('projectPerformancePay'), false));
        this._numberFieldPerformancePayAlready.setValue(Money.render(project
						.get('performancePayAlready'), false));
        this._textFieldFundFrom.setValue(project.get('fundFrom'));
        this._textFieldFundFromUnit.setValue(project.get('fundFromUnit'));
        this._textFieldFundFromUnitAddress.setValue(project
				.get('fundFromUnitAddress'));

    }
}
Ext.extend(Srims.projects.ProjectEditPanel_FundForm, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_RemarkForm = function(project){
    this._project = project;
    
    this._textAreaRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        hideLabel: true,
        value: project.get('remark'),
        width: 570
    });
    Srims.projects.ProjectEditPanel_RemarkForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '备注',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textAreaRemark]
    });
    
    //method
    this.assginValues = function(){
        this._project.set('remark', this._textAreaRemark.getValue());
    }
    this.isValid = function(preventMark){
        return true;
    }
    //刷新
    this._resetFormPanel = function(project){
    
        this._project = project;
        this._textAreaRemark.setValue(project.get('remark'));
    }
}
Ext.extend(Srims.projects.ProjectEditPanel_RemarkForm, Ext.FormPanel);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel = function(id, project, unsubmitProjectStore, isExpetEdit, projectOutPanel) {


    this._project = project;
    this._unsubmitProjectStore = unsubmitProjectStore;
    this._title = project.isNew() ? project.get('isHorizontal') ? '新建横向项目' : '新建纵向项目' : project.get('name');

    var projectOutAmount = 0;


    this._secretProjectMessagePanel = new Srims.projects.ProjectEditPanel_SecretProjectMessagePanel();

    this._formPanelBasic = new Srims.projects.ProjectEditPanel_BasicForm(project);
    this._formPanelType = new Srims.projects.ProjectEditPanel_TypeForm(project);

    //    this.validatFundForm = function() {
    //        var panel = this.panel;
    //        var projectOutStore = panel._projectOutPanel._store;
    //        var projectOuts = projectOutStore.getRange();
    //        for (var i = 0; i < projectOuts.length; i++) {
    //            projectOutAmount += projectOuts[i].get('amount');
    //        }
    //        this._numberFieldFundPlanOut.setValue(projectOutAmount);
    //        return true;
    //    }

    this._formPanelFund = new Srims.projects.ProjectEditPanel_FundForm(project, this._formPanelBasic, this._formPanelType, projectOutPanel);
    this._formPanelFund.parentPanel = this;
    //    this._formPanelFund.panel = this;
    //    this._formPanelFund.validator = this.validatFundForm;

    this._formPanelRemark = new Srims.projects.ProjectEditPanel_RemarkForm(project);

    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        hidden: isExpetEdit == true,
        panel: this
    });
    //carlsirce2013.2.28 控制项目编辑页面下的外协编辑框的显示
    if (Srims.currentLoginLog.user.userRoleType != 'Expert') {

        this._projectOutPanel = new Srims.projects.ProjectEditPanel_ProjectOutForm(project);
        this._projectOutPanel.parentPanel = this;
        Srims.projects.ProjectEditPanel.superclass.constructor.call(this, {
            id: id,
            style: 'padding:5px; width:1200px',
            closable: true,
            deferHeight: false,
            buttonAlign: 'center',
            title: isExpetEdit ? '' : this._title,
            iconCls: project.isNew() ? 'icon-project-new' : 'icon-project-edit',
            items: [this._projectOutPanel, this._formPanelBasic, this._formPanelType, this._formPanelFund, this._formPanelRemark],
            buttons: [this._buttonSave]
        });
    }
    else {
        Srims.projects.ProjectEditPanel.superclass.constructor.call(this, {
            id: id,
            style: 'padding:5px; width:1200px',
            closable: true,
            deferHeight: false,
            buttonAlign: 'center',
            title: isExpetEdit ? '' : this._title,
            iconCls: project.isNew() ? 'icon-project-new' : 'icon-project-edit',
            items: [this._formPanelBasic, this._formPanelType, this._formPanelFund, this._formPanelRemark],
            buttons: [this._buttonSave]
        });
    }


    //method
    this.assginValues = function() {
        this._formPanelBasic.assginValues();
        this._formPanelType.assginValues();
        this._formPanelFund.assginValues();
        this._formPanelRemark.assginValues();
    }

    this.isValid = function(preventMark) {
        var result = true;

        result = this._formPanelBasic.isValid(preventMark) && result;
        result = this._formPanelType.isValid(preventMark) && result;
        result = this._formPanelFund.isValid(preventMark) && result;
        result = this._formPanelRemark.isValid(preventMark) && result;

        return result;
    }
    this.save = function() {
        //        if (this._formPanelFund._numberFieldFundContract.getMoney() * 0.4 < this._formPanelFund._numberFieldFundPlanOut.getMoney() && this._project.get('isHorizontal')) {
        //            Ext.Msg.show({
        //                title: '不能保存',
        //                msg: '计划外协经费不能超过合同额的40%。',
        //                buttons: Ext.Msg.OK,
        //                icon: Ext.MessageBox.WARNING
        //            });
        //            this._buttonSave.enable();
        //            return;
        //        }
        //carlsirce2013.3.11 判断横向项目外协经费比例
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/GetFundOutRatio',
            scope: this,
            success: function(response) {
                if (response.responseText) {
                    if (this._formPanelFund._numberFieldFundContract.getMoney() * response.responseText / 100 < this._formPanelFund._numberFieldFundPlanOut.getMoney() && this._project.get('isHorizontal')) {
                        Ext.Msg.show({
                            title: '不能保存',
                            msg: '计划外协经费不能超过合同额的' + response.responseText + '%。',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        this._buttonSave.enable();
                        return;
                    }
                }
            }
        });
//        if ((this._formPanelFund._numberFieldOverheadExpenseInTotal.getMoney() < 0.95 * this._formPanelFund._fieldOverheadExpensesInStandard.getMoney() || this._formPanelFund._numberFieldPerformancePay.getMoney() > 1.05 * this._formPanelFund._fieldPerformancePayStandard.getMoney()) && !Srims.currentUser.isSuper && !this._project.get('isHorizontal')) {
//            Ext.Msg.show({
//                title: '无权限保存',
//                msg: '您所编辑的绩效与间接费已经超过基准值5%，不能保存，请联系超级管理员编辑。',
//                buttons: Ext.Msg.OK,
//                icon: Ext.MessageBox.WARNING
//            });
//            this._buttonSave.enable();
//            return;
//        }
        var project = this._project;
        project.beginEdit();
        this.assginValues();
        project.commit();

        project.data.startDateValue = project.data.startDate.format("Y-m-d H:i:s");
        project.data.endDateValue = project.data.endDate.format("Y-m-d H:i:s");
        //carlsirce2013.2.28 加入外协单位保存
        //专家用户新建时
        if (this.parentPanel) {
            var projectOutPanel = this.parentPanel._ProjectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var projectOutString = '';

            for (var i = 0; i < projectOuts.length; i++) {
                projectOutString += Money.toMoney(projectOuts[i].get('amount'));
                projectOutString += '###';
                projectOutString += projectOuts[i].get('outSourcingName');
                projectOutString += '|||';
            }
            project.data.projectOutString = projectOutString;
        }
        //管理员用户编辑保存时
        if (this._projectOutPanel) {
            var projectOutPanel = this._projectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var projectOutString = '';

            for (var i = 0; i < projectOuts.length; i++) {
                projectOutString += Money.toMoney(projectOuts[i].get('amount'));
                projectOutString += '###';
                projectOutString += projectOuts[i].get('outSourcingName');
                projectOutString += '|||';
            }
            project.data.projectOutString = projectOutString;
        }
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/Save',
            params: project.data,
            scope: this,
            success: function(response) {
                if (this._unsubmitProjectStore)
                    this._unsubmitProjectStore.load();
                //此处是为了在修改项目信息时，刷新前边的GridPanel
                var project = this._project;
                if (project.projectStore != undefined) {
                    project.projectStore.load();
                }
                delete project.data.startDateValue;
                delete project.data.endDateValue;

                if (isExpetEdit == undefined)
                    Srims.WorkSpace.getWorkSpace().remove(this);

                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.projects.ProjectSimpleXmlReader()
                });
                var project = store.getAt(0);

                //仅用户专家向导，刷新其他面板
                if (isExpetEdit == true) {
                    this.panel.panel.setIconClass('icon-project-edit');
                    this.panel.panel.setTitle('项目' + project.get('name') + '立项申请');
                    this.panel.panel._memberManagePanel.setProject(project);
                    Srims.expertGuide.next(this);
                    return;
                }

                Srims.projects.showProject(project);
            }
        });

    }
    this.validateProjectName = function() {
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/CountByName',
            params: {
                name: this._formPanelBasic._textFieldName.getValue()
            },
            scope: this,
            success: this._onValidateProjectName
        });
    }
    this._onValidateProjectName = function(response) {
        if (parseInt(response.responseText) > 0) {
            Ext.MessageBox.confirm('项目重名', '目前已存在和该项目重名的项目，是否继续？', function(buttonId) {
                if (buttonId == 'yes') {
                    this.save();
                }
                else {
                    this._buttonSave.setText('保 存');
                    this._buttonSave.enable();
                }
            }, this);
        }
        else {
            this.save();
        }
    }
    //event method
    this._onButonSave_Click = function(button, e) {
        var panel = button.panel;
        //alert(panel._formPanelBasic._comboBoxBase.getEntity().get('name'));

        if (!panel.isValid(false))
            return;

        var project = panel._project;
        panel.assginValues();
        //carlsirce2013.3.1 验证管理员编辑项目时的外协信息
        if (panel._projectOutPanel) {
            var projectOutPanel = panel._projectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var flag = 1;
            for (var i = 0; i < projectOuts.length; i++) {
                if (projectOuts[i].get('amount') <= 0 || projectOuts[i].get('outSourcingName') == '')
                    flag = 0;
            }
            if (flag == 0) {
                Ext.Msg.show({
                    title: '外协填写错误',
                    msg: '请检查所有外协单位不为空且分配数额大于0！',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
        }
        //验证到校经费必须大于计划外协经费与外协管理费的和
        if (panel._formPanelFund._numberFieldOverheadExpenseOutTotal.getValue() > panel._formPanelFund._numberFieldFundPlanIn.getValue()) {
            Ext.Msg.show({
                title: '填写错误',
                msg: '到校经费必须大于计划外协分配与外协管理费之和！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        //当项目的外协经费为零时，提示是否保存
        if (project.get('fundPlanOut') <= 0) {
            Ext.MessageBox.confirm('外协分配为零', '外协分配为0,你确定要继续吗？   ', function(buttonId) {
                if (buttonId == 'yes')
                    panel.saveAction(button);
            }, this);
        }
        else
            panel.saveAction(button);
    }
    this.saveAction = function(button) {
        button.setText('正在保存');
        button.disable();

        if (this._project.isNew())
            this.validateProjectName();
        else
            this.save();
    }

    //event
    this._buttonSave.on('click', this._onButonSave_Click);

    //刷新(仅用于专家向导)
    this.setProject = function(project) {
        this._project = project;
        this.setTitle(project.isNew() ? project.get('isHorizontal') ? '新建横向项目' : '新建纵向项目' : project.get('name'));
        this._formPanelBasic._resetFormPanel(this._project);
        this._formPanelType._resetFormPanel(this._project);
        this._formPanelFund._resetFormPanel(this._project, this._formPanelBasic, this._formPanelType);
        this._formPanelRemark._resetFormPanel(this._project);
    }

    this.next = function() {
        if (!this.isValid(false))
            return;
        this.save();
    }
}
Ext.extend(Srims.projects.ProjectEditPanel, Ext.Panel, {});
if (!Srims.projects)
	Ext.namespace('Srims.projects');

Srims.projects.ProjectMember = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'name',
	type: 'string',
	mapping: 'Name'
},{
	name: 'expertID',
	type: 'int',
	mapping: 'ExpertID'
},{
	name: 'number',
	type: 'string',
	mapping: 'Number'
},{
	name: 'isExpertSecondCollege',
	type: 'string',
	mapping: 'IsExpertSecondCollege',
	convert: Boolean.toBoolean
},{
	name: 'order',
	type: 'string',
	mapping: 'Order'
},{
	name: 'taskNo',
	type: 'string',
	mapping: 'TaskNo'
},{
	name: 'taskName',
	type: 'string',
	mapping: 'TaskName'
}]);
Srims.data.Entity.apply(Srims.projects.ProjectMember);
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel = function(project){

    this._project = project;
    this._store = new Srims.projects.ProjectMemberStore(project);
    this._columnModel = new Srims.projects.ProjectMemberGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ProjectMemberGridPanel_ToolBar(this._selections, this._store, this._project);
    
    this.params = {};
    this.params.sm = this._selections;
    this.params.store = this._store;
    this.params.colModel = this._columnModel;
    this.params.tbar = this._toolBar;
    this.params.height = 220;
    
    //constructor
    Srims.projects.ProjectMemberGridPanel.superclass.constructor.call(this, this.params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectMember = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectMember(this._project, projectMember, this._store);
    }
    this.on('celldblclick', onCellDblClick);
    
    this._reset = function(project){
        this._project = project;
        this._store.load({
            params: {
                projectId: project.get('id')
            }
        });
        this._toolBar._reset(this._store, this._project);
    }
    
};
Ext.extend(Srims.projects.ProjectMemberGridPanel, Srims.component.GridPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel_ColumnModel = function(){
    Srims.projects.ProjectMemberGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "姓名",
        dataIndex: 'name',
        width: 70
    }, {
        header: "位次",
        dataIndex: 'order',
        width: 40
    }, {
        header: "工作证号",
        dataIndex: 'number',
        width: 70
    }, {
        header: "子课题编号",
        dataIndex: 'taskNo',
        width: 100
    }, {
        id: 'taskName',
        header: "子课题名称",
        dataIndex: 'taskName'
    }]);
}
Ext.extend(Srims.projects.ProjectMemberGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
        var load_url = Srims.service.projects.ProjectMemberService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.get('id');
        }
        Srims.projects.ProjectMemberStore.superclass.constructor.call(this, new Srims.projects.ProjectMemberXmlReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectMemberXmlReader.superclass.constructor.call(this, Srims.projects.ProjectMember);
    }
});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._projectMemberGridPanel = new Srims.projects.ProjectMemberGridPanel(this._project);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.projects.ProjectMemberWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目“' + this._project.get('name') + '”成员管理',
        iconCls: 'icon-project-member-manage',
        width: 600,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._projectMemberGridPanel],
        buttons: [this._buttonClose]
    });
    this._projectMemberGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelMember._store.load();
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.projects.ProjectMemberWindow, Ext.Window, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel_ToolBar = function(selection, store, project){

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.newProjectMember(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>新建项目成员</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.projects.editProjectMember(this.project, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除项目成员', '你确定要删除这个项目成员吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projectMemberID = this.selection.getSelected().get('id');
                    
                    Ext.Ajax.request({
                        url: Srims.service.projects.ProjectMemberService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function(){
                            this.store.load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        project: this._project,
        handler: function(){
            this.store = new Srims.projects.ProjectMemberStore(project);
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目成员列表'
    });
    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });
    
    this._buttonNew.setVisible(project.get('hasPermission_EditProjectMember'));
    this._buttonNew.setDisabled(!project.get('canEdit_ProjectMember'));
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        buttonEdit.setVisible(project.get('hasPermission_EditProjectMember'));
        buttonEdit.setDisabled(!project.get('canEdit_ProjectMember'));
        
        buttonDelete.setVisible(project.get('hasPermission_EditProjectMember'));
        buttonDelete.setDisabled(!project.get('canEdit_ProjectMember'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    
}
Ext.extend(Srims.projects.ProjectMemberGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.projects)
	Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberEditWindow = function(id, projectMember, project, store) {

	this._id = id;
	this._projectMember = projectMember;
	this._project = project;
	this._store = store;

	this._buttonClose = new Ext.Button({
		minWidth: 80,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.close();
		}
	});
	this._buttonSave = new Ext.Button({
		minWidth: 80,
		text: '保 存',
		window: this
	});

	this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
		fieldLabel: '专家',
		width: 140,
		value: this._projectMember.get('name'),
		selectEntityId: this._projectMember.get('expertID'),
		allowBlank: false
	});
	this._checkboxIsSecondCollege = new Ext.form.Checkbox({
		fieldLabel: '双聘单位',
		checked: this._projectMember.get('isExpertSecondCollege'),
		disabled: true
	});
	this._textFieldOrder = new Ext.form.NumberField({
		fieldLabel: '位次',
		width: 80,
		value: this._projectMember.get('order'),
		maxValue: 500,
		minValue: 1,
		allowBlank: false,
		allowDecimals: false,
		allowNegative: false
	});
	this._textFieldTaskName = new Ext.form.TextField({
		fieldLabel: '子课题名称',
		value: this._projectMember.get('taskName'),
		width: 180
	});
	this._textFieldTaskNO = new Ext.form.TextField({
		fieldLabel: '子课题编号',
		value: this._projectMember.get('taskNo'),
		width: 180
	});
	Srims.projects.ProjectMemberEditWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '编辑项目成员信息',
		width: 350,
		labelWidth: 70,
		height: 200,
		modal: true,
		bodyStyle: 'padding:10px 10px 0',
		deferredRender: false,
		frame: true,
		closeAction: 'close',
		layout: 'form',
		resizable: false,
		items: [this._textFieldOrder, this._comboBoxExpert,this._checkboxIsSecondCollege, this._textFieldTaskName, this._textFieldTaskNO],
		buttons: [this._buttonSave, this._buttonClose]
	});

	this._validateOrderAndExpert = function() {
		var projectMembers = this._store.getRange();
		var projectMemberOrder = this._textFieldOrder.getValue();
		var expertID = this._comboBoxExpert.getValue();

		for (var i = 0; i < projectMembers.length; i++) {
			if (this._projectMember == projectMembers[i])
				continue;

			if (projectMemberOrder == projectMembers[i].get('order')) {
				Ext.Msg.show({
					title: '成员位次错误',
					msg: '成员位次不能重复，请重新输入位次',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.WARNING
				});
				return false;
			}
			if (expertID == projectMembers[i].get('expertID')) {
				Ext.Msg.show({
					title: '专家错误',
					msg: '该专家已经是这个项目的成员，请重新选择专家',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.WARNING
				});
				return false;
			}
		}
		return true;
	}
	this._comboBoxExpert.checkboxIsSecondCollege= this._checkboxIsSecondCollege;
	this.comboBoxExpert_Change = function(comboBox) {
		//处理专家变化
		var expertSecondCollege = comboBox.getEntity().get('college2');
		if (expertSecondCollege != '') {
			comboBox.checkboxIsSecondCollege.setDisabled(false);
		};
	}
	this._comboBoxExpert.on('change', this.comboBoxExpert_Change);

	this._isValid = function(preventMark) {
		var result = true;

		result = this._textFieldOrder.isValid(preventMark) && result;
		result = this._textFieldTaskNO.isValid(preventMark) && result;
		result = this._textFieldTaskName.isValid(preventMark) && result;
		result = this._comboBoxExpert.isValid(preventMark) && result;
		result = this._validateOrderAndExpert() && result;

		return result;
	}
	this._assignValues = function() {
		this._projectMember.set('expertID', this._comboBoxExpert.getValue());
		this._projectMember.set('order', this._textFieldOrder.getValue());
		this._projectMember.set('isExpertSecondCollege', this._checkboxIsSecondCollege.getValue());
		this._projectMember.set('taskName', this._textFieldTaskName.getValue());
		this._projectMember.set('taskNo', this._textFieldTaskNO.getValue());
		this._projectMember.set('projectID', this._project.get('id'));
	}
	this._save = function() {
		var projectMember = this._projectMember;
		projectMember.beginEdit();
		this._assignValues();
		projectMember.commit();

		Ext.Ajax.request({
			url: Srims.service.projects.ProjectMemberService + '/Save',
			params: projectMember.data,
			scope: this,
			success: function() {
				this._store.load();
				this.close();
			}
		});
	}
	this._buttonSave_Click = function(button) {
		var window = button.window;

		if (!window._isValid(false))
			return;

		button.setText('正在保存');
		button.disable();

		window._save();
	}
	this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.projects.ProjectMemberEditWindow, Ext.Window, {})
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectCensorRejectWindow = function(id, project, isStart){

    this._id = id;
    this._project = project;
    this._isStart = isStart;
    
    this._buttonReject = new Ext.Button({
        minWidth: 80,
        text: '驳回',
        window: this,
        handler: function(){
            var window = this.window;
            var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '(' + window._textRejectRemark.getValue() + ')';
            
            if (window._isStart) 
                Ext.MessageBox.show({
                    title: '审核驳回立项申请',
                    msg: '您需要同时审核驳回该项目的合同和文档吗？<br />点击“是”按钮，同时审核驳回项目的合同和文档；<br />点击“否”按钮，仅审核驳回项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                    buttons: Ext.MessageBox.YESNOCANCEL,
                    scope: this,
                    fn: function(button){
                        if (button == 'yes') 
                            Srims.projects.censorStart_Reject(window._project, remark, true);
                        if (button == 'no') 
                            Srims.projects.censorStart_Reject(wndow._project, remark, false);
                    },
                    icon: Ext.MessageBox.QUESTION
                });
            else 
                Srims.projects.censortEnd_Reject(window._project, remark);
            
            window.close();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
        fieldLabel: '驳回理由',
        noticeTextType: 'ProjectCensorRejectReason',
        listWidth: 160,
        width: 130
    });
    this._textRejectRemark = new Ext.form.TextArea({
        fieldLabel: '详细说明',
        height: 60,
        width: 200
    });
    
    Srims.projects.ProjectCensorRejectWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._isStart ? '驳回项目立项申请' : '驳回项目结项申请',
        iconCls: 'icon-censor-reject',
        width: 320,
        labelWidth: 70,
        height: 180,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxRejectReson, this._textRejectRemark],
        buttons: [this._buttonReject, this._buttonClose]
    });
}
Ext.extend(Srims.projects.ProjectCensorRejectWindow, Ext.Window, {})

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRank = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}]);
Srims.data.Entity.apply(Srims.type.ProjectRank);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectRankXmlReader.superclass.constructor.call(this, Srims.type.ProjectRank);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.type.ProjectRankStore.superclass.constructor.call(this, new Srims.type.ProjectRankXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectType = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isBudget',
    type: 'boolean',
    mapping: 'IsBudget',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpenseInRate',
    type: 'int',
    mapping: 'OverheadExpenseInRate'
}, {
    name: 'overheadExpenseOutRate',
    type: 'int',
    mapping: 'OverheadExpenseOutRate'
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'administration',
    type: 'string',
    mapping: 'Administration'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'bakCode',
    type: 'string',
    mapping: 'BakCode'
}, {
    name: 'perCode',
    type: 'string',
    mapping: 'PerCode'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'isExploit',
    type: 'boolean',
    mapping: 'IsExploit',
    convert: Boolean.toBoolean
}, {
    name: 'isHorizontalType',
    type: 'boolean',
    mapping: 'IsHorizontalType',
    convert: Boolean.toBoolean
}, {
    name: 'projectComingFrom',
    type: 'string',
    mapping: 'ProjectComingFrom'
}, {
    name: 'projectRankID',
    type: 'int',
    mapping: 'ProjectRankID'
}, {
    name: 'projectRank',
    type: 'string',
    mapping: 'ProjectRank'
}, {
    name: 'subjectNature',
    type: 'string',
    mapping: 'SubjectNatrue'
}, {
	name: 'managementFeesType',
	type: 'string',
	mapping: 'ManagementFeesType'
},{
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageProjectSupportField',
    type: 'boolean',
    mapping: 'HasPermission_ManageProjectSupportField',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageProjectSupportCategory',
    type: 'boolean',
    mapping: 'HasPermission_ManageProjectSupportCategory',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UploadDocumentModel',
    type: 'boolean',
    mapping: 'HasPermission_UploadDocumentModel',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canManageProjectSupportField',
    type: 'boolean',
    mapping: 'CanManageProjectSupportField',
    convert: Boolean.toBoolean
}, {
    name: 'canManageProjectSupportCategory',
    type: 'boolean',
    mapping: 'CanManageProjectSupportCategory',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectType);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectTypeXmlReader.superclass.constructor.call(this, Srims.type.ProjectType);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.type.ProjectTypeStore.superclass.constructor.call(this, new Srims.type.ProjectTypeXmlReader(), load_url, params);
    }
});
if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FundDescend = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'projectName',
	type: 'string',
	mapping: 'ProjectName'
},{
	name: 'projectPrincipalName',
	type: 'string',
	mapping: 'ProjectPrincipalName'
},{
	name: 'projectID',
	type: 'int',
	mapping: 'ProjectID'
},{
	name: 'amount',
	type: 'int',
	mapping: 'Amount'
},{
	name: 'receivedAmount',
	type: 'int',
	mapping: 'ReceivedAmount'
},{
	name: 'descendDateTime',
	type: 'date',
	mapping: 'DescendDateTime'
},{
	name: 'operator',
	type: 'string',
	mapping: 'Operator'
},{
	name: 'state',
	type: 'string',
	mapping: 'State'
},{
	name: 'financeVoucherNumber',
	type: 'string',
	mapping: 'FinanceVoucherNumber'
},{
	name: 'financeAbstract',
	type: 'string',
	mapping: 'FinanceAbstract'
},{
	name: 'hasPermission_Edit',
	type: 'bool',
	mapping: 'HasPermission_Edit',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_Censor',
	type: 'bool',
	mapping: 'HasPermission_Censor',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_Delete',
	type: 'bool',
	mapping: 'HasPermission_Delete',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_ShowAlloction',
	type: 'bool',
	mapping: 'HasPermission_ShowAlloction',
	convert: Boolean.toBoolean
},{
	name: 'canEdit',
	type: 'bool',
	mapping: 'CanEdit',
	convert: Boolean.toBoolean
},{
	name: 'canDelete',
	type: 'bool',
	mapping: 'CanDelete',
	convert: Boolean.toBoolean
},{
	name: 'canCensorPass',
	type: 'bool',
	mapping: 'CanCensorPass',
	convert: Boolean.toBoolean
},{
	name: 'canCensorReject',
	type: 'bool',
	mapping: 'CanCensorReject',
	convert: Boolean.toBoolean
},{
	name: 'canShowAllocation',
	type: 'bool',
	mapping: 'CanShowAllocation',
	convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.fund.FundDescend);if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FundDescendGridPanel_ColumnModel = function(isBorrow, isNotNeedProjectName, isShowFinanceInfo) {
	Srims.fund.FundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: 'id',
		dataIndex: 'ID',
		sortable: false,
		hidden: true
	},{
		header: isBorrow ? '借款项目' : '下拨项目',
		dataIndex: 'projectName',
		sortable: false,
		hidden: isNotNeedProjectName,
		width: 300
	},{
		header: '项目负责人',
		dataIndex: 'projectPrincipalName',
		sortable: false,
		hidden: isNotNeedProjectName
	},{
		header: isBorrow ? '借款金额（万元）' : '下拨金额(万元)',
		dataIndex: 'amount',
		sortable: true,
		renderer: Money.render
	},{
		header: '经费凭单号',
		dataIndex: 'financeVoucherNumber',
		sortable: false,
		hidden: !isShowFinanceInfo
	},{
		header: '经费说明',
		dataIndex: 'financeAbstract',
		sortable: false,
		hidden: !isShowFinanceInfo,
		width: 200
	},{
		header: isBorrow ? '借款时间' : '下拨时间',
		dataIndex: 'descendDateTime',
		sortable: true,
		renderer: Date.render
	},{
		header: isBorrow ? '已还金额' : '实到金额(万元)',
		dataIndex: 'receivedAmount',
		sortable: true,
		renderer: Money.render
	},{
		id: 'operator',
		header: isBorrow ? '借款人' : '下拨人',
		dataIndex: 'operator'
	},{
		header: '当前状态',
		dataIndex: 'state',
		renderer: Srims.fund.fundDescendStateRender
	}])
}
Ext.extend(Srims.fund.FundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundDescendState');

Srims.fund.fundDescendState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundDescendState.Reject = 'Reject';
Srims.fund.fundDescendState.Passed = 'Passed';
Srims.fund.fundDescendState.AllocationCompleted = 'AllocationCompleted';

Srims.fund.fundDescendStateRender = function(value){
    switch (value) {
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '待分配';
        case 'AllocationCompleted':
            return '分配完成';
        default:
            return '未知';
    }
}

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundDescendStore.superclass.constructor.call(this, new Srims.fund.FundDescendXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundDescendXmlReader.superclass.constructor.call(this, Srims.fund.FundDescend);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescend = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'operateDateTime',
    type: 'date',
    mapping: 'OperateDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'isReturn',
    type: 'bool',
    mapping: 'IsReturn',
    convert: Boolean.toBoolean
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'hasPermission_EditReturn',
    type: 'bool',
    mapping: 'HasPermission_EditReturn',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DeleteReturn',
    type: 'bool',
    mapping: 'HasPermission_DeleteReturn',
    convert: Boolean.toBoolean
}, {
    name: 'canEditReturn',
    type: 'bool',
    mapping: 'CanEditReturn',
    convert: Boolean.toBoolean
}, {
    name: 'canDeleteReturn',
    type: 'bool',
    mapping: 'CanDeleteReturn',
    convert: Boolean.toBoolean
}]);

Srims.data.Entity.apply(Srims.fund.FinanceFundDescend);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendGridPanel_ColumnModel = function(isNotNeedProjectName, isShowFinanceInfo){
    Srims.fund.FinanceFundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '经费凭单号',
        dataIndex: 'financeVoucherNumber',
        sortable: false,
        hidden: !isShowFinanceInfo
    }, {
        header: '经费说明',
        dataIndex: 'financeAbstract',
        sortable: false,
        hidden: !isShowFinanceInfo,
        width: 200
    }, {
        header: '还款项目',
        dataIndex: 'projectName',
        sortable: false,
        hidden: isNotNeedProjectName,
        width: 300
    }, {
        header: '还款金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        renderer: Money.render
    }, {
        header: '还款时间',
        dataIndex: 'operateDateTime',
        sortable: true,
        renderer: Date.render
    }, {
        id: 'operator',
        header: '还款人',
        dataIndex: 'operator'
    }])
}
Ext.extend(Srims.fund.FinanceFundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceFundDescendStore.superclass.constructor.call(this, new Srims.fund.FinanceFundDescendXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceFundDescendXmlReader.superclass.constructor.call(this, Srims.fund.FinanceFundDescend);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItem = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}]);

Srims.data.Entity.apply(Srims.fund.PayPlanItem);


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
    
        var load_url = Srims.service.fund.PayPlanItemService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.isNew() ? 0 : project.get('id')
        }
        Srims.fund.PayPlanItemStore.superclass.constructor.call(this, new Srims.fund.PayPlanItemXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.PayPlanItemXmlReader.superclass.constructor.call(this, Srims.fund.PayPlanItem);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemGridPanel = function(project){

    this._project = project;
    this._store = new Srims.fund.PayPlanItemStore(project);
    this._columnModel = new Srims.fund.PayPlanItemGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.fund.PayPlanItemGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    
    Srims.fund.PayPlanItemGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var payPlanItem = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectPayPlanItem(this._project, payPlanItem, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.fund.PayPlanItemGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.PayPlanItemGridPanel_ToolBar = function(selection, store, project){

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.newProjectPayPlanItem(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>新建付款计划</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.projects.editProjectPayPlanItem(this.project, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑付款计划</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('删除付款计划', '你确定要删除这个付款计划吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projetPayPlanItemID = this.selection.getSelected().get('id');
                    
                    Ext.Ajax.request({
                        url: Srims.service.fund.PayPlanItemService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function(){
                            this.store.load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除付款计划</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费到帐计划列表'
    });
    Srims.fund.PayPlanItemGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });
    
    this._buttonNew.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
    this._buttonNew.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
    
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        buttonEdit.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
        buttonEdit.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
        
        buttonDelete.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
        buttonDelete.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    this._store.toolBar = this;
    this._store.on('load', function(){
        var projectPayPlanItems = this.getRange();
        var projectFundTotal = this.toolBar._project.get('fundTotal');
        var projectPayPlanAmountTotal = 0;
        for (var i = 0; i < projectPayPlanItems.length; i++) 
            projectPayPlanAmountTotal += projectPayPlanItems[i].get('amount');
        
        this.toolBar._buttonNew.setDisabled(projectFundTotal <= projectPayPlanAmountTotal);
    });
}
Ext.extend(Srims.fund.PayPlanItemGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');
Srims.fund.PayPlanItemGridPanel_ColumnModel = function(){
    Srims.fund.PayPlanItemGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '到帐时间',
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        id: 'amount',
        header: '到帐金额(万元)',
        dataIndex: 'amount',
        renderer: Money.render
    }]);
}
Ext.extend(Srims.fund.PayPlanItemGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._payPlanItemGridPanel = new Srims.fund.PayPlanItemGridPanel(this._project);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.fund.PayPlanItemWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目：' + this._project.get('name') + '付款计划管理',
        iconCls: 'icon-project-pay-plan-item',
        width: 500,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._payPlanItemGridPanel],
        buttons: [this._buttonClose]
    });
    this._payPlanItemGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelPayPlanItem._store.load();
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.fund.PayPlanItemWindow, Ext.Window, {});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.PayPlanItemEditWindow = function(id, payPlanItem, project, store){

    this._id = id;
    this._payPlanItem = payPlanItem;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._dateFieldDateTime = new Ext.form.DateField({
        fieldLabel: '到款时间',
        value: this._payPlanItem.get('dateTime'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    this._numberFieldAmount = new Srims.component.MoneyField({
        fieldLabel: '数额(万元)',
        value: this._payPlanItem.get('amount'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    Srims.fund.PayPlanItemEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '编辑项目付款计划信息',
        width: 300,
        labelWidth: 70,
        height: 160,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._dateFieldDateTime, this._numberFieldAmount],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._validAmount = function(){
        var amount = this._numberFieldAmount.getMoney();
        
        if (amount == 0) {
            Ext.Msg.show({
                title: '付款金额错误',
                msg: '付款金额必须大于零',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        
        var projectPayPlanItems = this._store.getRange();
        var projectFundTotal = this._project.get('fundTotal');
        var projectPayPlanAmountTotal = 0;
        for (var i = 0; i < projectPayPlanItems.length; i++) {
            if (this._payPlanItem == projectPayPlanItems[i]) 
                continue;
            projectPayPlanAmountTotal += projectPayPlanItems[i].get('amount');
        }
        if (projectFundTotal < projectPayPlanAmountTotal + amount) {
            Ext.Msg.show({
                title: '付款金额错误',
                msg: '计划付款金额不能大于项目的到校经费金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldDateTime.isValid(preventMark) && result;
        result = this._numberFieldAmount.isValid(preventMark) && result;
        result = this._validAmount() && result;
        
        return result;
    }
    this._assignValues = function(){
        this._payPlanItem.set('dateTime', this._dateFieldDateTime.getValue());
        this._payPlanItem.set('amount', this._numberFieldAmount.getMoney());
        this._payPlanItem.set('projectID', this._project.get('id'));
    }
    this._save = function(){
        var payPlanItem = this._payPlanItem;
        payPlanItem.beginEdit();
        this._assignValues();
        payPlanItem.commit();
        
        payPlanItem.data.dateTime = payPlanItem.data.dateTime.format("Y-m-d H:i:s");
        
        Ext.Ajax.request({
            url: Srims.service.fund.PayPlanItemService + '/Save',
            params: payPlanItem.data,
            scope: this,
            success: function(){
                var payPlanItem = this._payPlanItem;
                delete payPlanItem.data.dateTime;
                this._store.load();
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.fund.PayPlanItemEditWindow, Ext.Window, {})
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'allocationDateTime',
    type: 'date',
    mapping: 'AllocationDateTime'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'projectNumber',
    type: 'string',
    mapping: 'ProjectNumber'
}, {
    name: 'allocationTotal',
    type: 'int',
    mapping: 'AllocationTotal'
}, {
    name: 'allocationIn',
    type: 'int',
    mapping: 'AllocationIn'
}, {
    name: 'allocationOut',
    type: 'int',
    mapping: 'AllocationOut'
},
{
    name: 'allocationWantOut',
    type: 'int',
    mapping: 'AllocationWantOut'
}, {
    name: 'performanceTotal',
    type: 'int',
    mapping: 'PerformanceTotal'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'allocationHardware',
    type: 'int',
    mapping: 'AllocationHardware'
}, {
    name: 'overheadExpensesOut',
    type: 'int',
    mapping: 'OverheadExpensesOut'
}, {
    name: 'overheadPerformancePay',
    type: 'int',
    mapping: 'OverheadPerformancePay'
}, {
    name: 'state',
    type: 'string',
    mapping: 'CurrentState'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPricinpalName',
    type: 'string',
    mapping: 'ProjectPricinpalName'
}, {
    name: 'projectTypeName',
    type: 'string',
    mapping: 'ProjectTypeName'
}, {
    name: 'isHorizontal',
    type: 'bool',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'financeID',
    type: 'int',
    mapping: 'FinanceID'
}, {
    name: 'financeAmount',
    type: 'int',
    mapping: 'FinanceAmount'
}, {
    name: 'financeReceivedDate',
    type: 'date',
    mapping: 'FinanceReceivedDate'
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'isBorrow',
    type: 'bool',
    mapping: 'IsBorrow',
    convert: Boolean.toBoolean
}, {
    name: 'fundDescendID',
    type: 'int',
    mapping: 'FundDescendID'
}, {
    name: 'hasPermission_Allocation',
    type: 'bool',
    mapping: 'HasPermission_Allocation',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Canel',
    type: 'bool',
    mapping: 'HasPermission_Canel',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Censor',
    type: 'bool',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Submit',
    type: 'bool',
    mapping: 'HasPermission_Submit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UndoSubmit',
    type: 'bool',
    mapping: 'HasPermission_UndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Correct',
    type: 'bool',
    mapping: 'HasPermission_Correct',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocation',
    type: 'bool',
    mapping: 'CanAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canCancel',
    type: 'bool',
    mapping: 'CanCancel',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'bool',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'bool',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmit',
    type: 'bool',
    mapping: 'CanSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoSubmit',
    type: 'bool',
    mapping: 'CanUndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canCorrect',
    type: 'bool',
    mapping: 'CanCorrect',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocationPerformancePay',
    type: 'bool',
    mapping: 'CanAllocationPerformancePay',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesMiddle',
    type: 'int',
    mapping: 'OverheadExpensesMiddle'
}, {
    name: 'overheadExpensesExpert',
    type: 'int',
    mapping: 'OverheadExpensesExpert'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}
]);

Srims.data.Entity.apply(Srims.fund.FundAllocation);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundAllocationStore.superclass.constructor.call(this, new Srims.fund.FundAllocationXmlReader(), load_url, params);
    }
});



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundAllocationXmlReader.superclass.constructor.call(this, Srims.fund.FundAllocation);
    }
    
});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundAllocationState');

Srims.fund.fundAllocationState.UnSubmit = 'UnSubmit';
Srims.fund.fundAllocationState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundAllocationState.Reject = 'Reject';
Srims.fund.fundAllocationState.Passed = 'Passed';
Srims.fund.fundAllocationState.Canceled = 'Canceled';

Srims.fund.fundAllocationStateRender = function(value){
    switch (value) {
        case 'UnSubmit':
            return '未提交/待分配';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '未知';
    }
}
Srims.fund.fundAllocationStateFilterItems = [{
    id: 'UnSubmit',
    text: '未提交'
}, {
    id: 'WaitingCensor',
    text: '等待审核'
}, {
    id: 'Reject',
    text: '审核驳回'
}, {
    id: 'Passed',
    text: '审核通过'
}, {
    id: 'Canceled',
    text: '作废'
}];

Srims.fund.fundAllocationStore = [['UnSubmit', '未提交'], ['WaitingCensor', '等待审核'], ['Reject', '审核驳回'], ['Passed', '审核通过'], ['Canceled', '作废']];
if (!Srims.fund)
    Ext.namespace('Srims.fund');
Srims.fund.FundAllocationGridPanel_ColumnModel = function(isShowProjectName) {
    Srims.fund.FundAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true
    }, {
        header: '项目编号',
        dataIndex: 'projectNumber',
        width: 300,
        hidden: !isShowProjectName
    }, {
        header: '分配项目',
        dataIndex: 'projectName',
        width: 300,
        hidden: !isShowProjectName
    }, {
        header: '分配时间',
        dataIndex: 'allocationDateTime',
        sortable: true,
        width: 100,
        renderer: Date.render
    }, {
        header: '分配总额',
        dataIndex: 'allocationTotal',
        sortable: true,
        width: 80,
        renderer: Money.render
    }, {
        header: '直接费用',
        dataIndex: 'allocationIn',
        width: 80,
        renderer: Money.render
    }, {
        header: '项目总绩效',
        dataIndex: 'PerformanceTotal',
        width: 80,
        renderer: Money.render,
        hidden: !isShowProjectName
    }, {
        header: '校内绩效',
        dataIndex: 'overheadPerformancePay',
        width: 80,
        renderer: Money.render,
        hidden: !isShowProjectName
    }, {
        header: '课题组间接费用及绩效',
        dataIndex: 'overheadExpensesExpert',
        width: 80,
        renderer: Money.render
    }, {
        header: '外协分配',
        dataIndex: 'allocationOut',
        width: 80,
        renderer: Money.render
    }, {
        header: '当前状态',
        dataIndex: 'state',
        sortable: true,
        width: 60,
        renderer: Srims.fund.fundAllocationStateRender
    }, {
        header: '当前状态时间',
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        id: 'operator',
        header: '当前状态操作人',
        dataIndex: 'operator'
}])
    }
    Ext.extend(Srims.fund.FundAllocationGridPanel_ColumnModel, Ext.grid.ColumnModel);if (!Srims.fund)
	Ext.namespace('Srims.fund');
Srims.fund.VoucherGridPanel_ColumnModel_Renderer = function(value, metadata, record) {

	if (record.get('isRead') == false)
		metadata.css = "voucher_unread " + metadata.css;

	return value;
};
Srims.fund.VoucherGridPanel_ColumnModel = function(isFinanceManage, isExpert) {
	Srims.fund.VoucherGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber',
		sortable: true,
		width: 40,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "专家",
		dataIndex: 'expertName',
		sortable: true,
		width: 30,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "项目名称",
		dataIndex: 'projectName',
		sortable: true,
		hidden: false,
		width: 90,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "状态",
		dataIndex: 'voucherState',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Srims.fund.VoucherStateRender(value);
		}
	},{
		header: "财务分配时间",
		dataIndex: 'financeAllocationDateTime',
		width: 20,
		sortable: true,
		hidden: !isFinanceManage,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Date.render(value);
		}
	},{
		header: "制单号",
		dataIndex: 'financeNumber',
		width: 40,
		sortable: true,
		hidden: !isFinanceManage,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "硬件费(万元)",
		dataIndex: 'allocationHardware',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "校内分配(万元)",
		dataIndex: 'allocationIn',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "绩效账本号",
		dataIndex: 'performanceAccountBookNumber',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "绩效分配(万元)",
		dataIndex: 'performancePay',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "外协分配(万元)",
		dataIndex: 'allocationOut',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "已读",
		dataIndex: 'isRead',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Boolean.render(value);
		}
	},{
		header: "校内分配管理费(万元)",
		dataIndex: 'overheadExpensesIn',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "外协分配管理费(万元)",
		dataIndex: 'overheadExpensesOut',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "绩效管理费(万元)",
		dataIndex: 'overheadPerformancePay',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "管理费(万元)",
		dataIndex: 'overheadExpenses',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	}]);

	this.defaultSortable = false;
}
Ext.extend(Srims.fund.VoucherGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.Document = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'author',
    type: 'string',
    mapping: 'Author'
}, {
    name: 'censor',
    type: 'string',
    mapping: 'Censor'
}, {
    name: 'censorDateTime',
    type: 'date',
    mapping: 'CensorDateTime'
}, {
    name: 'deadline',
    type: 'date',
    mapping: 'Deadline'
}, {
    name: 'isRequire',
    type: 'boolean',
    mapping: 'IsRequire',
    convert: Boolean.toBoolean
}, {
    name: 'documentResource',
    type: 'string',
    mapping: 'DocumentResource'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'submitDateTime',
    type: 'date',
    mapping: 'SubmitDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectIsHorizontal',
    type: 'boolean',
    mapping: 'ProjectIsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.documents.Document);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.DocumentXmlReader.superclass.constructor.call(this, Srims.documents.Document);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.DocumentStore.superclass.constructor.call(this, new Srims.documents.DocumentXmlReader(), load_url, params);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentGridPanel_ColumnModel = function(){
    Srims.documents.DocumentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '文档名称',
        dataIndex: 'name',
        width: 100
    }, {
        header: '状态',
        dataIndex: 'state',
        width: 70,
        renderer: Srims.CensorState.Render
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        width: 110,
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author',
        width: 80
    }, {
        header: '审核人',
        dataIndex: 'censor',
        width: 80
    }, {
        id: 'censorDateTime',
        header: '审核时间',
        dataIndex: 'censorDateTime',
        renderer: Date.render
    }, {
        header: '催缴截止时间',
        dataIndex: 'deadline',
        width: 110,
        renderer: Date.render
    }, {
        header: '是否必须',
        dataIndex: 'isRequire',
        width: 70,
        renderer: Boolean.render
    }])
};

Ext.extend(Srims.documents.DocumentGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentGridPanel = function(project){

    this._project = project;
    
    var load_url = Srims.service.documents.DocumentService + '/GetByProjectID';
    var params = {
        projectId: project.get('id')
    };
    this._store = new Srims.documents.DocumentStore(load_url, params);
    this._columnModel = new Srims.documents.DocumentGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DocumentGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 270;
    
    Srims.documents.DocumentGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.DocumentGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.DocumentGridPanel_ToolBar = function(selection, store, project){

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;
    
    //controls
    this._buttonRequireDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-require-document',
        text: '催缴文档',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.showRequireDocumentWindow(this.project, this.store);
        },
        tooltip: '<b>催缴文档</b>'
    });
    this._buttonSubmitDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传文档',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.uploadDocument(this.project, this.store);
        },
        tooltip: '<b>上传文档</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.downLoadDocument(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的项目文档'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorDocumentPass(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过文档</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.showCensorDocumentRejectWindow(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除文档', '你确定要删除这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.deleteDocument(this.project, this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文档</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目文档列表'
    });
    Srims.documents.DocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonRequireDocument, this._buttonSubmitDocument, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    this._buttonSubmitDocument.setVisible(project.get('hasPermission_EditProjectDoucment'));
    this._buttonSubmitDocument.setDisabled(!project.get('canEdit_ProjectDocument'));
    this._buttonRequireDocument.setVisible(project.get('canRequire_ProjectDocument'));
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        var document = selection.getSelected();
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonDelete.setVisible(document.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!document.get('canDelete'));
        
        buttonShow.setVisible(project.get('hasPermission_ShowProejectDocument'));
        buttonShow.setDisabled(!project.get('canShow_ProjectDocument'));
        
        buttonCensorPass.setVisible(project.get('canCensor_ProjectDocument') && document.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(project.get('canCensor_ProjectDocument') && document.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DocumentGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentCensorGridPanel_ColumnModel = function(){
    Srims.documents.DocumentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '文档名称',
        dataIndex: 'name'
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author'
    }])
};

Ext.extend(Srims.documents.DocumentCensorGridPanel_ColumnModel, Ext.grid.ColumnModel)


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentCensorGridPanel = function(id, title, store, iconCls){

    this._store = store;
    this._columnModel = new Srims.documents.DocumentCensorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DocumentCensorGridPanel_ToolBar(this._selections, this._store)
    
    var params = {};
    
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.documents.DocumentCensorGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.DocumentCensorGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.DocumentCensorGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.downLoadDocument(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的项目文档'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorDocumentPass(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过文档</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.showCensorDocumentRejectWindow(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目文档列表'
    });
    Srims.documents.DocumentCensorGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonShow.setVisible(true);
        buttonCensorPass.setVisible(true);
        buttonCensorReject.setVisible(true);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DocumentCensorGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._documentGridPanel = new Srims.documents.DocumentGridPanel(this._project);
    this._requireMessage = new Srims.documents.DocumentWindow_RequireMessage();
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.documents.DocumentWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目：' + this._project.get('name') + '文档管理',
        iconCls: 'icon-project-contract',
        width: 780,
        height: 380,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._requireMessage, this._documentGridPanel],
        buttons: [this._buttonClose]
    });
    this._documentGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelDocument._store.load();
        //如果用户是专家，刷新专家待提交的文档列表
        var user = Srims.currentLoginLog.user;
        if (user.userRoleType == 'Expert') {
            var panel = Srims.WorkSpace.active('MyUnsubmitDocumentGridPanel');
            if (panel) {
                documentStore = panel.getStore();
                documentStore.load();
            }
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_ExpertUnsubmitDocumentCount);
        }
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.documents.DocumentWindow, Ext.Window, {});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentWindow_RequireMessage = function(){
    Srims.documents.DocumentWindow_RequireMessage.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        html: '<span style="color:#FF0000">注意：如果文档状态是‘未提交’，说明您有被催缴上传的文档，请及时上传！</span>'
    });
}
Ext.extend(Srims.documents.DocumentWindow_RequireMessage, Ext.Panel);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentUploadWindow = function(id, project, store){

    this._id = id;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid(false)) 
                return false;
            
            var saveParams = {
                projectId: window._project.get('id'),
                documentName: window._comboBoxDocumentName.getValue()
            }
            
            window.formPanel = window._formPanelDocument;
            window.store = window._store;
            
            Srims.documents.submitResource(window, saveParams, Srims.service.documents.DocumentService + '/UpLoad', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._project.get('name') + '的文档')
        }
    });
    this._comboBoxDocumentName = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文档名称',
        noticeTextType: 'DocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传文档',
        width: 160,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        
        return result;
    }
    Srims.documents.DocumentUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目文档',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.documents.DocumentUploadWindow, Ext.Window, {})

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentRequireWindow = function(id, project, store){

    this._id = id;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonRequire = new Ext.Button({
        minWidth: 70,
        text: '催缴',
        window: this,
        handler: function(){
            var window = this.window;
            var documentNames = window._checkboxGroupDocumentName.getSelecetedValue();
            if (documentNames.length == 0) {
                Ext.Msg.show({
                    title: '文档名称不能为空',
                    msg: '催缴文档，文档名称不能为空，请指定文档名称',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            if (!window.validate(false)) 
                return;
            
            Ext.Ajax.request({
                url: Srims.service.documents.DocumentService + '/RequireDocument',
                params: {
                    projectId: window._project.get('id'),
                    documentNames: documentNames,
                    deadLine: window._dateFieldDeadLine.getValue() ? window._dateFieldDeadLine.getValue().format("Y-m-d H:i:s") : '',
                    isRequire: window._checkboxIsRequire.getValue()
                },
                success: function(){
                    window._store.load();
                    window.close();
                }
            });
        }
    });
    this._checkboxGroupDocumentName = new Srims.component.CheckBoxGroup({
        fieldLabel: '文档名称',
        columns: 3,
        items: Srims.documents.DocumentRequireWindow.DocumentTypeStore.checkboxGroupItems,
        cls: 'srims-checkboxGroup-documentName',
        allowBlank: false
    });
    this._dateFieldDeadLine = new Ext.form.DateField({
        fieldLabel: '截止日期',
        allowBlank: false,
        width: 150
    });
    this._checkboxIsRequire = new Ext.form.Checkbox({
        fieldLabel: '是否必须'
    });
    
    Srims.documents.DocumentRequireWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '催缴项目文档',
        width: 550,
        labelWidth: 60,
        height: 260,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: new Ext.Panel({
            layout: 'form',
            labelWidth: 60,
            height: 230,
            bodyStyle: 'padding: 10px 0 0 10px',
            frame: true,
            items: [this._checkboxGroupDocumentName, this._dateFieldDeadLine, this._checkboxIsRequire]
        }),
        buttons: [this._buttonRequire, this._buttonClose]
    });
    this.validate = function(preventMark){
        var result = true;
        
        result = this._dateFieldDeadLine.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.documents.DocumentRequireWindow, Ext.Window, {})

Srims.documents.DocumentRequireWindow.DocumentTypeStore = new Srims.data.IDValueRecordStore(Srims.service.documents.DocumentService + "/GetDocumentNames");
Srims.documents.DocumentRequireWindow.DocumentTypeStore.load({
    callback: Srims.documents.DocumentRequireWindow.DocumentTypeStore.buildCheckboxGroupItems
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentCensorRejectWindow = function(id, document, store, isHorizontal){

    this._document = document;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonCensor = new Ext.Button({
        minWidth: 80,
        text: '审核驳回',
        window: this
    });
    
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '驳回理由',
        height: 60,
        width: 240
    });
    
    Srims.documents.DocumentCensorRejectWindow.superclass.constructor.call(this, {
        id: id,
        title: '审核驳回文档：' + this._document.get('name'),
        width: 370,
        autoHeight: true,
        labelWidth: 60,
        bodyStyle: 'padding:10px 10px 20px 10px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });
    
    this.buttonCensor_click = function(button, e){
        var window = this.window;
        var remark = window._textRemark.getValue();
        
        Srims.projects.censorDocumentReject(window._document, store, isHorizontal, remark);
        window.close();
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.documents.DocumentCensorRejectWindow, Ext.Window);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.Contract = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'contractNumber',
    type: 'string',
    mapping: 'ContractNumber'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'author',
    type: 'string',
    mapping: 'Author'
}, {
    name: 'censor',
    type: 'string',
    mapping: 'Censor'
}, {
    name: 'censorDateTime',
    type: 'date',
    mapping: 'CensorDateTime'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'submitDateTime',
    type: 'date',
    mapping: 'SubmitDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectIsHorizontal',
    type: 'boolean',
    mapping: 'ProjectIsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'projectId',
    type: 'int',
    mapping: 'ProjectId'
}, {
    name: 'contractResource',
    type: 'string',
    mapping: 'ContractResource'
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.documents.Contract);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.ContractXmlReader.superclass.constructor.call(this, Srims.documents.Contract);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.ContractStore.superclass.constructor.call(this, new Srims.documents.ContractXmlReader(), load_url, params);
    }
});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractGridPanel = function(project){

    this._project = project;
    
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: project.get('id')
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel(project.get('isHorizontal'));
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.ContractGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    
    Srims.documents.ContractGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.ContractGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.ContractGridPanel_ColumnModel = function(isHorizontal){
    Srims.documents.ContractGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '合同编号',
        dataIndex: 'contractNumber',
        width: 100,
        hidden: !isHorizontal
    }, {
        id: 'type',
        header: '合同类型',
        dataIndex: 'type',
        renderer: Srims.documents.contractTypeRender
    }, {
        header: '状态',
        dataIndex: 'state',
        width: 70,
        renderer: Srims.CensorState.Render
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        width: 110,
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author',
        width: 80
    }, {
        header: '审核人',
        dataIndex: 'censor',
        width: 80
    }, {
        id: 'censorDateTime',
        header: '审核时间',
        dataIndex: 'censorDateTime',
        renderer: Date.render
    }])
};

Ext.extend(Srims.documents.ContractGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.documents)
    Ext.namespace('Srims.documents');
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.documents.ContractGridPanel_ToolBar = function(selection, store, project) {

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传主合同',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            Srims.projects.uploadMainContract(this.project, this.store);
        },
        tooltip: '<b>上传主合同</b>'
    });
    this._buttonSubmitOutContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传外协合同',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            Srims.projects.uploadOutContract(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>上传外协合同</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var contract = this.selection.getSelected();
            Srims.projects.downLoadContract(contract);
        },
        hidden: true,
        tooltip: '<b>查看项目合同</b><br/>查看选中的项目合同'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.MessageBox.confirm('审核通过合同', '你确定要审核通过这个项目合同吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    Srims.projects.censorContractPass(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过项目合同</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.projects.showCensorContractRejectWindow(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回合同</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除合同', '你确定要删除这个合同吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    Srims.projects.deleteContract(this.project, this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除合同</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目合同列表'
    });
    Srims.documents.ContractGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitMainContract, this._buttonSubmitOutContract, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, this._buttonRefresh]
    });

    this._buttonSubmitMainContract.setVisible(project.get('hasPermission_EditProjectContract'));
    this._buttonSubmitMainContract.setDisabled(!project.get('canEdit_ProjectMainContract'));
    this._buttonSubmitOutContract.setVisible(project.get('hasPermission_EditProjectContract'));
    this._buttonSubmitOutContract.setDisabled(!project.get('canEdit_ProjectContract'));

    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    this._selection.buttonSubmitMainContract = this._buttonSubmitMainContract;
    this._selection.project = this._project;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        Ext.Ajax.request({
            url: Srims.service.documents.ContractService + '/GetMainContractByProjectID',
            params: {
                projectId: project.get('id')
            },
            scope: this,
            success: function(response) {
                if (response.responseText == "0")
                    selection.buttonSubmitMainContract.setDisabled(false);

            }
        });

        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        var contract = selection.getSelected();

        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }

        buttonDelete.setVisible(contract.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!contract.get('canDelete'));

        buttonShow.setVisible(project.get('hasPermission_ShowProejectContract'));
        buttonShow.setDisabled(!project.get('canShow_ProjectContract'));

        buttonCensorPass.setVisible(project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    this._store.toolBar = this;
    this._store.on('load', function() {
        var contracts = this.getRange();
        for (var i = 0; i < contracts.length; i++) {
            if (contracts[i].get('type') == Srims.documents.ContractType.MainContract) {
                this.toolBar._buttonSubmitMainContract.setDisabled(true);
                return;
            }
        }
        this.toolBar._buttonSubmitMainContract.setDisabled(!project.get('canEdit_ProjectMainContract'));
    });
}
Ext.extend(Srims.documents.ContractGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._contractGridPanel = new Srims.documents.ContractGridPanel(this._project);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.documents.ContractWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目：' + this._project.get('name') + '合同管理',
        iconCls: 'icon-project-contract',
        width: 700,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._contractGridPanel],
        buttons: [this._buttonClose]
    });
    this._contractGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelContract._store.load();
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.documents.ContractWindow, Ext.Window, {});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Ext.namespace('Srims.documents.ContractType');

Srims.documents.ContractType.MainContract = 'MainContract';
Srims.documents.ContractType.OutContract = 'OutContract';

Srims.documents.contractTypeRender = function(value){
    switch (value) {
        case 'MainContract':
            return '主合同';
        case 'OutContract':
            return '外协合同';
        default:
            return '未知';
    }
}
Srims.documents.contractTypeFilterItems = [{
    id: 'MainContract',
    text: '主合同'
}, {
    id: 'OutContract',
    text: '外协合同'
}];

Srims.documents.contractTypeStore = [['MainContract', '主合同'], ['OutContract', '外协合同']];
Srims.documents.contractTypeEditStore = [['MainContract', '主合同'], ['OutContract', '外协合同']];

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractUploadWindow = function(id, project, store, isMain){

    this._id = id;
    this._project = project;
    this._store = store;
    this._isMain = isMain;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid(false)) 
                return false;
            
            var saveParams = {
                projectId: window._project.get('id'),
                contractType: window._isMain ? Srims.documents.ContractType.MainContract : Srims.documents.ContractType.OutContract
            }
            
            window.formPanel = window._formPanelContract;
            window.store = window._store;
            
            Srims.documents.submitResource(window, saveParams, Srims.service.documents.ContractService + '/UpLoad', '正在上传项目合同', '上传合同成功', '成功上传项目：' + window._project.get('name') + '的合同');
        }
    });
    this._fieldContractType = new Ext.form.Field({
        fieldLabel: '合同类型',
        value: this._isMain ? '主合同' : '外协合同',
        readOnly: true,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadContract',
        fieldLabel: '上传合同',
        width: 160,
        emptyText: '请选择要上传的合同',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelContract = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fieldContractType, this._fileUploadField]
    });
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        
        return result;
    }
    
    Srims.documents.ContractUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目合同',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelContract],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.documents.ContractUploadWindow, Ext.Window, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorRejectWindow = function(id, contract, store, isHorizontal){

    this._contract = contract;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonCensor = new Ext.Button({
        minWidth: 80,
        text: '审核驳回',
        window: this
    });
    
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '驳回理由',
        height: 60,
        width: 240
    });
    
    Srims.documents.ContractCensorRejectWindow.superclass.constructor.call(this, {
        id: id,
        title: '审核驳回项目合同：',
        width: 370,
        autoHeight: true,
        labelWidth: 60,
        bodyStyle: 'padding:10px 10px 20px 10px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });
    
    this.buttonCensor_click = function(button, e){
        var window = this.window;
        var remark = window._textRemark.getValue();
        
        Srims.projects.censorContractReject(window._contract, store, isHorizontal, remark);
        window.close();
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.documents.ContractCensorRejectWindow, Ext.Window);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorGridPanel_ColumnModel = function(){
    Srims.documents.ContractCensorGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '合同类型',
        dataIndex: 'type',
        renderer: Srims.documents.contractTypeRender
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author'
    }])
};

Ext.extend(Srims.documents.ContractCensorGridPanel_ColumnModel, Ext.grid.ColumnModel)


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorGridPanel = function(id, title, store, iconCls){

    this._store = store;
    this._columnModel = new Srims.documents.ContractCensorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.ContractCensorGridPanel_ToolBar(this._selections, this._store)
    
    var params = {};
    
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.documents.ContractCensorGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.ContractCensorGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.ContractCensorGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.downLoadContract(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看合同</b><br/>查看选中的项目合同'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过合同', '你确定要审核通过这个项目合同吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorContractPass(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过合同</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.showCensorContractRejectWindow(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回合同</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目合同列表'
    });
    Srims.documents.ContractCensorGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonShow.setVisible(true);
        buttonCensorPass.setVisible(true);
        buttonCensorReject.setVisible(true);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.ContractCensorGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentMyUnsubmitDocumentGridPanel = function(id, title, store, iconCls){

    this._store = store;
    this._columnModel = new Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar(this._selections)
    
    var params = {};
    
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 270;
    
    Srims.documents.DocumentMyUnsubmitDocumentGridPanel.superclass.constructor.call(this, params);
};
Ext.extend(Srims.documents.DocumentMyUnsubmitDocumentGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar = function(selection){

    //fields
    this._selection = selection;
    
    //controls
    this._buttonUpload = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: this.selection.getSelected().get('projectID')
                },
                scope: this,
                success: function(response){
                
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });
                    var project = store.getAt(0);
                    Srims.projects.showDocumentWindow(project);
                }
            });
        },
        hidden: true,
        tooltip: '<b>上传文档</b><br/>进入上传文档页面'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新我未提交的文档列表'
    });
    Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonUpload, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    //initial
    this._selection.buttonUpload = this._buttonUpload;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonUpload = selection.buttonUpload;
        
        if (selection.getCount() == 0) {
            buttonUpload.hide();
            return;
        }
        
        buttonUpload.setVisible(true);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel = function(){
    Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '催缴文档名称',
        dataIndex: 'name'
    }, {
        header: '催缴截止时间',
        dataIndex: 'deadline',
        width: 110,
        renderer: Date.render
    }, {
        header: '是否必须',
        dataIndex: 'isRequire',
        width: 70,
        renderer: Boolean.render
    }])
};

Ext.extend(Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel, Ext.grid.ColumnModel)


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModel = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'resource',
    type: 'string',
    mapping: 'Resource'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.documents.DocumentModel);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.DocumentModelXmlReader.superclass.constructor.call(this, Srims.documents.DocumentModel);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.DocumentModelStore.superclass.constructor.call(this, new Srims.documents.DocumentModelXmlReader(), load_url, params);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelManageWindow = function(id, projectTypeId, projectTypeName, isProjectShow){

    this._id = id;
    this._projectTypeId = projectTypeId;
    this._DocumentModelGridPanel = new Srims.documents.DocumentModelGridPanel(this._projectTypeId, isProjectShow);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.documents.DocumentModelManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectTypeName + '文档模板管理',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._DocumentModelGridPanel],
        buttons: [this._buttonClose]
    });
    
    this._DocumentModelGridPanel.getStore().load();
}
Ext.extend(Srims.documents.DocumentModelManageWindow, Ext.Window, {});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelGridPanel = function(projectTypeId, isProjectShow){

    this._projectTypeId = projectTypeId;
    
    var load_url = Srims.service.documents.DocumentModelService + '/GetByProjectType';
    var params = {
        projectTypeId: projectTypeId
    };
    this._store = new Srims.documents.DocumentModelStore(load_url, params);
    
    this._columnModel = new Srims.documents.DocumentModelGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DcoumentModelGridPanel_ToolBar(this._selections, this._store, this._projectTypeId, isProjectShow)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 200;
    
    Srims.documents.DocumentModelGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var documentModel = grid.getStore().getAt(rowIndex);
        Srims.type.downLoadDocumemtModel(documentModel);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.DocumentModelGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DcoumentModelGridPanel_ToolBar = function(selection, store, projectTypeId, isProjectShow){

    //fields
    this._selection = selection;
    this._store = store;
    this._projectTypeId = projectTypeId;
    
    //controls
    this._buttonSubmitDocumentModel = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传文档模板',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectTypeId: this._projectTypeId,
        handler: function(){
            Srims.type.showUploadDocumentModelWindow(this.projectTypeId, this.store);
        },
        hidden: isProjectShow,
        tooltip: '<b>上传文档模板</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: isProjectShow ? '下载' : '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.type.downLoadDocumemtModel(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档模板</b><br/>查看选中的项目类型文档模板'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteDocumentModel(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>文档模板</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目类型文档模板列表'
    });
    Srims.documents.DcoumentModelGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitDocumentModel, this._buttonShow, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            return;
        }
        var documentModel = selection.getSelected();
        
        buttonDelete.setVisible(documentModel.get('hasPermission_Delete') && !isProjectShow);
        buttonDelete.setDisabled(!documentModel.get('canDelete'));
        
        buttonShow.setVisible(documentModel.get('hasPermission_Show'));
        buttonShow.setDisabled(!documentModel.get('canShow'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DcoumentModelGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentModelGridPanel_ColumnModel = function(){
    Srims.documents.DocumentModelGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '文档类型',
        dataIndex: 'name'
    }])
};

Ext.extend(Srims.documents.DocumentModelGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelUploadWindow = function(id, projectTypeId, store){

    this._id = id;
    this._projectTypeId = projectTypeId;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
        
        }
    });
    
    this._comboBoxDocumentName = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文档名称',
        noticeTextType: 'DocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._comboBoxDocumentName.getStore().on('load', function(){
        var outerContract = new Srims.common.NoticeText({
            value: '外协合同'
        });
        this.insert(0, outerContract);
        
        var mainContract = new Srims.common.NoticeText({
            value: '主合同'
        });
        this.insert(0, mainContract);
    })
    
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocumentModel',
        fieldLabel: '上传文档模板',
        width: 160,
        emptyText: '请选择要上传的文档模板',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocumentModel = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    
    Srims.documents.DocumentModelUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传文档模板',
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        height: 170,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocumentModel],
        buttons: [this._buttonUpload, this._buttonClose]
    });
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        result = this._fileUploadField.isValid(preventMark) && result;
        
        return result;
    }
    this._buttonUpload_click = function(){
        var window = this.window;
        
        if (!window.isValid(false)) 
            return;
        
        // this.setText('正在保存');
        // this.disable();
        
        var saveParams = {
            projectTypeId: window._projectTypeId,
            DocumentType: window._comboBoxDocumentName.getValue()
        }
        
        window.formPanel = window._formPanelDocumentModel;
        window.store = window._store;
        
        Srims.documents.submitResource(window, saveParams, Srims.service.documents.DocumentModelService + '/UpLoadDocumentModel', '正在上传文档模板', '上传文档模板成功', '成功上传文档模板');
    }
    this._buttonUpload.window = this;
    this._buttonUpload.on('click', this._buttonUpload_click);
}
Ext.extend(Srims.documents.DocumentModelUploadWindow, Ext.Window, {})

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleType = new function(){
};

Srims.users.UserRoleType.Administrator = 'Administrator';
Srims.users.UserRoleType.Expert = 'Expert';


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.projectGridPanel_ColumnModel = function(){
    Srims.projects.projectGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "编号",
        dataIndex: 'number',
        width: 100,
        sortable: true,
        hidden: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "所属学院",
        dataIndex: 'principalCollege',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "等级",
        dataIndex: 'rankName',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'typeName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "类型（简称）",
        dataIndex: 'typeShortName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "到校经费",
        dataIndex: 'fundTotal',
        width: 60,
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "已到经费",
        dataIndex: 'fundReceived',
        width: 60,
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "开始日期",
        dataIndex: 'startDate',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "结束日期",
        dataIndex: 'endDate',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "负责人工作证号",
        dataIndex: 'principalNumber',
        sortable: false,
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 30,
        sortable: false,
        hidden: true,
        renderer: Srims.projects.projectStateRender
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: false,
        hidden: true,
        width: 10,
        renderer: Srims.projects.projectLevelRender
    }, {
        header: "所属学科",
        dataIndex: 'subjectName',
        sortable: false,
        hidden: true
    }, {
        header: "研究类型",
        dataIndex: 'researchType',
        sortable: false,
        hidden: true
    }, {
        header: "合作类型",
        dataIndex: 'cooperationType',
        sortable: false,
        hidden: true
    }, {
        header: "所属基地",
        dataIndex: 'baseName',
        sortable: false,
        hidden: true
    }, {
        header: "保密",
        dataIndex: 'isSecret',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "委托负责人",
        dataIndex: 'principalDelegate',
        sortable: false,
        hidden: true
    }, {
        header: "建立人",
        dataIndex: 'creator',
        sortable: false,
        hidden: true
    }, {
        header: "建立日期",
        dataIndex: 'createDate',
        sortable: true,
        hidden: true,
        renderer: Date.render
    }, {
        header: "公司所在地",
        dataIndex: 'corporationPlace',
        sortable: false,
        hidden: true
    }, {
        header: "资助类别",
        dataIndex: 'supportCategoryName',
        sortable: false,
        hidden: true
    }, {
        header: "资助领域",
        dataIndex: 'supportField',
        sortable: false,
        hidden: true
    }, {
        header: "资助子领域",
        dataIndex: 'supportField',
        sortable: false,
        hidden: true
    }, {
        header: "硬件分配",
        dataIndex: 'fundAlreadyHardware',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已分配经费",
        dataIndex: 'fundAlreadyTotal',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已分配校内经费",
        dataIndex: 'fundAlreadyIn',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已分配外协",
        dataIndex: 'fundAlreadyOut',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "合同额",
        dataIndex: 'fundContract',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "经费来源",
        dataIndex: 'fundFrom',
        sortable: false,
        hidden: true
    }, {
        header: "来款单位",
        dataIndex: 'fundFromUnit',
        sortable: false,
        hidden: true
    }, {
        header: "来款单位地址",
        dataIndex: 'fundFromUnitAddress',
        sortable: false,
        hidden: true
    }, {
        header: "计划外协",
        dataIndex: 'fundPlanOut',
        sortable: true,
        hidden: true,
        renderer: Money.render
          }, {
        header: "设备购置费",
        dataIndex: 'equipmentCost',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "计划硬件费",
        dataIndex: 'fundPlanHardware',
        sortable: true,
        hidden: true,
              renderer: Money.render  
    }, {
        header: "计划校内分配",
        dataIndex: 'fundPlanIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "总校内管理费",
        dataIndex: 'overheadExpenseInTotal',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "总外协管理费",
        dataIndex: 'overheadExpenseOutTotal',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已收校内管理费",
        dataIndex: 'overheadExpensesAlreadyIn',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已收外协管理费",
        dataIndex: 'overheadExpensesAlreadyOut',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "校内基准间接费",
        dataIndex: 'overheadExpensesInStandard',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "校内基准绩效",
        dataIndex: 'PerformanceInStandard',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "项目间接费用",
        dataIndex: 'indirectCosts',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "项目绩效",
        dataIndex: 'projectPerformancePay',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "校内绩效",
        dataIndex: 'performancePay',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "备注",
        dataIndex: 'remark',
        sortable: false,
        hidden: true
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.projectGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.projectGridPanel_MyJoinProject_ColumnModel = function(){
    Srims.projects.projectGridPanel_MyJoinProject_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "编号",
        dataIndex: 'number',
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'typeName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: false,
        hidden: false,
        width: 30,
        renderer: Srims.projects.projectLevelRender
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.projectGridPanel_MyJoinProject_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.projectRankVerticalFilterItems = [{
    id: '国家级',
    text: '国家级'
}, {
    id: '省部级',
    text: '省部级'
}, {
    id: '校级',
    text: '校级'
}, {
    id: '市厅级',
    text: '市厅级'
},{
    id: '其它',
    text: '其它'
}];

Srims.projects.ProjectGridPanel_GridFilters = function(){
    Srims.projects.ProjectGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'number'
        }, {
            type: 'string',
            dataIndex: 'principal'
        }, {
            type: 'date',
            dataIndex: 'startDate'
        }, {
            type: 'date',
            dataIndex: 'endDate'
        }, {
            type: 'numeric',
            money: true,
            dataIndex: 'fundTotal'
        }, {
            type: 'list',
            dataIndex: 'rankName',
            options: Srims.projects.projectRankVerticalFilterItems,
            phpMode: true
        }, {
            type: 'string',
            dataIndex: 'typeName'
        }, {
            type: 'string',
            dataIndex: 'typeShortName'
        }, {
            type: 'list',
            dataIndex: 'state',
            options: Srims.projects.projectStateFilterItems,
            phpMode: true
        }]
    });
}
Ext.extend(Srims.projects.ProjectGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectGridPanel_ToolBar = function(gridPanel, panelId, queryParams) {

    //fields
    this._gridPanel = gridPanel;
    this._isHorizontal = gridPanel._isHorizontal;
    this._selection = gridPanel._selection;
    this._store = gridPanel._projectStore;
    this._projectState = gridPanel._projectSate;
    this._expertAttendType = gridPanel._expertAttendType;
    this._panelId = panelId;
    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        gridPanel: this._gridPanel,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            Srims.projects.showProjectQueryWindow(this.panelId + '_QueryWindow', this.store, this.isHorizontal, queryParams, this.gridPanel);
        },
        tooltip: '<b>项目查询</b><br/>对项目信息进行复杂查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.projects.showImportWindow(this.store);
        },
        tooltip: '<b>项目导入</b><br/>将项目从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        isHorizontal: this._isHorizontal,
        handler: function() {
            Srims.projects.newProject(this.isHorizontal);
        },
        tooltip: '<b>新建项目</b><br/>输入项目信息以新建项目',
        hidden: this._isHorizontal ? !user.hasPermission_EditAnyHorizontalProject : !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showProject(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看项目</b><br/>显示所选项目的详细信息'
    });
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出',
        minWidth: 60,
        selection: this._selection,
        gridPanel: this._gridPanel,
        store: this._store,
        handler: function() {
            Srims.projects.exportProject(this.store.lastOptions.params, queryParams);
        },
        tooltip: '<b>导出项目</b><br/>导出所查询的项目',
        hidden: !user.hasPermission_EditAnyHorizontalProject && !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonEmail = new Ext.Toolbar.Button({
        iconCls: 'icon-email',
        text: '发送邮件',
        minWidth: 60,
        store: this._store,
        handler: function() {

            var filterParams = {};
            for (var param in this.store.lastOptions.params)
                filterParams[param] = this.store.lastOptions.params[param];
            for (var param in queryParams)
                filterParams[param] = queryParams[param];

            Srims.projects.confirmProjectPrincipalToSendEmail(filterParams);
        },
        tooltip: '<b>发送邮件</b><br/>给查询项目的负责人发送邮件',
        hidden: !user.hasPermission_EditAnyHorizontalProject && !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.editProject(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目</b><br/>编辑选中项目的基本、类别、经费等信息'
    });
    this._buttonMemberManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '成员管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showProjectMemberWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b><br/>编辑选中项目的成员信息'
    });
    this._buttonPayPlanItemManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-pay-plan-item',
        text: '付款计划',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showPayPlanItemWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目付款计划</b><br/>编辑选中项目的付款计划信息'
    });
    this._buttonContractManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-contract',
        text: '合同管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showContractWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目合同</b><br/>编辑选中项目的合同信息'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-document',
        text: '文档管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showDocumentWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目文档</b><br/>编辑选中项目的文档信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除项目', '你确定要删除这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.deleteProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除项目</b><br/>删除选中的项目'
    });
    this._buttonWithDraw = new Ext.Toolbar.Button({
        iconCls: 'icon-withDraw',
        text: '撤消',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('撤销项目', '你确定要撤销这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.withDrawProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤消项目</b><br/>撤消选中的项目'
    });
    this._buttonTerminate = new Ext.Toolbar.Button({
        iconCls: 'icon-terminate',
        text: '终止',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('终止项目', '你确定要终止这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.terminateProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>终止项目</b><br/>终止选中的项目'
    });
    this._buttonCensorStartPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过立项申请',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.show({
                title: '审核通过立项申请',
                msg: '您需要同时审核通过该项目的合同和文档吗？<br />点击“是”按钮，同时审核通过项目的合同和文档；<br />点击“否”按钮，仅审核通过项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                buttons: Ext.MessageBox.YESNOCANCEL,
                scope: this,
                fn: function(button) {
                    if (button == 'yes')
                        Srims.projects.censorStart_Pass(this.selection.getSelected(), true);
                    if (button == 'no')
                        Srims.projects.censorStart_Pass(this.selection.getSelected(), false);
                },
                icon: Ext.MessageBox.QUESTION
            });
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过选中项目的立项申请'
    });
    //对于专家提交的特定项目类型项目申请，需要由管理员先完善校内间接费和校内绩效
    this._buttonCompleteIn = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '填写校内间接费和绩效',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var project = this.selection.getSelected();
            project.projectStore = gridPanel.getStore();
            Srims.projects.editProject(project);
        },
        hidden: true,
        tooltip: '<b>填写校内间接费和绩效</b><br/>填写校内间接费和绩效'
    });
    this._buttonCensorEndPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过结项申请',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('审核通过结项申请', '你确定要审核通过这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.censorEnd_Pass(this.selection.getSelected());
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过选中项目的结项申请'
    });
    this._buttonCensorStartReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回立项申请',
        minWidth: 60,
        selection: this._selection,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.rejectProjectCensor(this.selection.getSelected(), true);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回选中的项目'
    });
    this._buttonCensorEndReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回结项申请',
        minWidth: 60,
        selection: this._selection,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.rejectProjectCensor(this.selection.getSelected(), false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回选中的项目'
    });

    this._buttonSetDelegatePrincipal = new Ext.Toolbar.Button({
        iconCls: 'icon-set-delegate-principal',
        text: '指定委托负责人',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.projects.showSetDelegatePrincipalWindow([this.selection.getSelected()], this.store);
        },
        hidden: true,
        tooltip: '<b>指定委托负责人</b><br/>为选中的项目指定委托负责人'
    });
    this._buttonClearDelegatePrincipal = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-delegate-principal',
        text: '取消委托负责人',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('取消委托负责人', '你确定要取消这个项目的委托负责人吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.clearDeletatePrincipal([this.selection.getSelected()], this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>取消委托负责人</b><br/>为选中的项目取消委托负责人'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        projectState: this._projectState,
        isHorizontal: this._isHorizontal,
        expertAttendType: this._expertAttendType,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            if (this.isHorizontal != undefined)
                params[params.length] = 'isHorizontal';
            if (this.projectState) {
                params[params.length] = 'state';
                params[params.length] = 'isCensor';
            }
            if (this.expertAttendType)
                params[params.length] = 'expertAttendType';
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();

            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var buttonItems;
    if (this._expertAttendType)
        buttonItems = [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage, this._buttonDelete, this._buttonSetDelegatePrincipal, this._buttonClearDelegatePrincipal, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    else {
        if (!this._projectState)
            buttonItems = [this._buttonQuery, this._buttonNew, this._buttonExport, this._buttonEmail, this._buttonShow, this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage, this._buttonWithDraw, this._buttonTerminate, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        if (this._projectState == Srims.projects.ProjectState.WaitingStartCensor)
            buttonItems = [this._buttonShow, this._buttonCompleteIn, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        
            //buttonItems = [this._buttonShow, this._buttonCompleteIn, this._buttonCensorStartPass, this._buttonCensorStartReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        if (this._projectState == Srims.projects.ProjectState.WaitingEndCensor)
            buttonItems = [this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
   
            //buttonItems = [this._buttonShow, this._buttonCensorEndPass, this._buttonCensorEndReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    }

    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });

    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonMemberManage = this._buttonMemberManage;
    this._selection.buttonPayPlanItemManage = this._buttonPayPlanItemManage;
    this._selection.buttonContractManage = this._buttonContractManage;
    this._selection.buttonDocumentManage = this._buttonDocumentManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonWithDraw = this._buttonWithDraw;
    this._selection.buttonTerminate = this._buttonTerminate;
    this._selection.buttonCensorStartPass = this._buttonCensorStartPass;
    this._selection.buttonCensorStartReject = this._buttonCensorStartReject;
    this._selection.buttonCensorEndPass = this._buttonCensorEndPass;
    this._selection.buttonCensorEndReject = this._buttonCensorEndReject;
    this._selection.buttonClearDelegatePrincipal = this._buttonClearDelegatePrincipal;
    this._selection.buttonSetDelegatePrincipal = this._buttonSetDelegatePrincipal;
    this._selection.projectState = this._projectState;
    this._selection.buttonCompleteIn = this._buttonCompleteIn;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonMemberManage = selection.buttonMemberManage;
        var buttonPayPlanItemManage = selection.buttonPayPlanItemManage;
        var buttonContractManage = selection.buttonContractManage;
        var buttonDocumentManage = selection.buttonDocumentManage;
        var buttonDelete = selection.buttonDelete;
        var buttonWithDraw = selection.buttonWithDraw;
        var buttonTerminate = selection.buttonTerminate;
        var buttonCensorStartPass = selection.buttonCensorStartPass;
        var buttonCensorStartReject = selection.buttonCensorStartReject;
        var buttonCensorEndPass = selection.buttonCensorEndPass;
        var buttonCensorEndReject = selection.buttonCensorEndReject;
        var buttonClearDelegatePrincipal = selection.buttonClearDelegatePrincipal;
        var buttonSetDelegatePrincipal = selection.buttonSetDelegatePrincipal;
        var buttonCompleteIn = selection.buttonCompleteIn;

        var projectState = selection.projectState;

        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonMemberManage.hide();
            buttonPayPlanItemManage.hide();
            buttonContractManage.hide();
            buttonDocumentManage.hide();
            buttonDelete.hide();
            buttonCensorStartPass.hide();
            buttonCensorStartReject.hide();
            buttonCensorEndPass.hide();
            buttonCensorEndReject.hide();
            buttonClearDelegatePrincipal.hide();
            buttonSetDelegatePrincipal.hide();
            buttonCompleteIn.hide();
            return;
        }

        var project = selection.getSelected();

        buttonShow.setVisible(project.get('hasPermission_Show'));
        buttonShow.setDisabled(!project.get('canShow'));

        buttonEdit.setVisible(project.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!project.get('canEdit'));

        buttonDelete.setVisible(project.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!project.get('canDelete'));

        buttonWithDraw.setVisible(project.get('hasPermission_WithDraw'));
        buttonWithDraw.setDisabled(!project.get('canWithDraw'));

        buttonTerminate.setVisible(project.get('hasPermission_Terminate'));
        buttonTerminate.setDisabled(!project.get('canTerminate'));

        buttonMemberManage.setVisible(project.get('hasPermission_ShowProejectMember'));
        buttonMemberManage.setDisabled(!project.get('canShow_ProjectMember'));

        buttonPayPlanItemManage.setVisible(project.get('hasPermission_ShowProejectPayPlanItem'));
        buttonPayPlanItemManage.setDisabled(!project.get('canShow_ProjectPayPlanItem'));

        buttonContractManage.setVisible(project.get('hasPermission_ShowProejectContract'));
        buttonContractManage.setDisabled(!project.get('canShow_ProjectContract'));

        buttonDocumentManage.setVisible(project.get('hasPermission_ShowProejectDocument'));
        buttonDocumentManage.setDisabled(!project.get('canShow_ProjectDocument'));

        buttonCensorStartPass.setVisible(project.get('canCensorStart'));
        buttonCensorStartReject.setVisible(project.get('canCensorStart'));
        buttonCensorEndPass.setVisible(project.get('canCensorEnd'));
        buttonCensorEndReject.setVisible(project.get('canCensorEnd'));
        buttonClearDelegatePrincipal.setVisible(project.get('canClearDelegatePrincipal'));
        buttonSetDelegatePrincipal.setVisible(project.get('canSetDelegatePrincipal'));

        buttonCompleteIn.setVisible(project.get('canCompleteIn'));

    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ProjectGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectGridPanel = function(id, projectStore, title, iconCls, isHorizontal, projectState, expertAttendType, queryParams){

    //fields
    this._projectStore = projectStore;
    this._isHorizontal = isHorizontal;
    this._projectSate = projectState;
    this._projectStore.gird = this;
    this._expertAttendType = expertAttendType;
    
    //controls  
    if (expertAttendType == 'Participate') 
        this._columnModel = new Srims.projects.projectGridPanel_MyJoinProject_ColumnModel();
    else 
        this._columnModel = new Srims.projects.projectGridPanel_ColumnModel();
    
    this._selection = new Ext.grid.RowSelectionModel();
    this._filters = new Srims.projects.ProjectGridPanel_GridFilters();
    this._toolbar = new Srims.projects.ProjectGridPanel_ToolBar(this, id, queryParams);
    this._textItemFundSum = new Ext.Toolbar.TextItem('');
    
    this._bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._projectStore,
        plugins: this._filters,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录",
        items: [this._textItemFundSum]
    })
    
    var params = {};
    params.sm = this._selection;
    params.store = this._projectStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.bbar = this._bbar;
    
    //constructor
    Srims.projects.ProjectGridPanel.superclass.constructor.call(this, params);
    //event
    if (expertAttendType != 'Participate') {
        this._projectStore.on('load', function(store, records){
            if (records.fundSum == undefined || records.fundSum == null) 
                records.fundSum = records.fundReceivedSum = 0;
            
            var fundSumMessage = String.format(" 总经费：<strong>{0}</strong>，已到经费：<strong>{1}</strong>", Money.render(records.fundSum), Money.render(records.fundReceivedSum));
            Ext.get(store.gird._textItemFundSum.id).update(fundSumMessage);
        });
        this.on('celldblclick', onCellDblClick);
    }
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var project = grid.getStore().getAt(rowIndex);
        if (!project.get('canShow')) 
            return;
        Srims.projects.showProject(project);
    }
};
Ext.extend(Srims.projects.ProjectGridPanel, Srims.component.GridPanel);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeText = Ext.data.Record.create([{
    name: 'value',
    type: 'string',
    mapping: 'Value'
}, {
    name: 'valueSpell',
    type: 'string',
    mapping: 'ValueSpell'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}]);
Srims.data.Entity.apply(Srims.common.NoticeText);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeTextStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(url, type){
        Srims.common.NoticeTextStore.superclass.constructor.call(this, new Srims.common.NoticeTextXmlReader(), url, {
            type: type
        });
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.NoticeTextXmlReader.superclass.constructor.call(this, Srims.common.NoticeText);
    }
});
