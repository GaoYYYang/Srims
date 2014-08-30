
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
