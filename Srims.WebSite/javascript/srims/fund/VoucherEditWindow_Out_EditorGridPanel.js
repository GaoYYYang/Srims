
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditWindow_Out_EditGridPanel = function(fundAllocation, project, store, canAllocationAmount, projectCanAllocationOutAmount) {

    this._fundAllocation = fundAllocation;
    this._project = project;
    this._store = store;
    

    this._selections = new Ext.grid.RowSelectionModel();
    /** 复选框
    this._selections = new Ext.grid.CheckboxSelectionModel({ handleMouseDown: Ext.emptyFn });
    this._selections.grid = this;
    */
    this._columnModel = new Srims.fund.VoucherEditWindow_Out_EditGridPanel_ColumnModel(this._fundAllocation);
    this._tbar = new Srims.fund.VoucherEditWindow_Out_EditGridPanel_ToolBar(this, this._store, this._selections);
    Srims.fund.VoucherEditWindow_Out_EditGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        tbar: this._tbar,
        height: 170,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        loadMask: true,
        disabled: projectCanAllocationOutAmount == 0,
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

        if (column == 4) {
            var allocationAmount = Money.toMoney(editor.getValue());
            var maxAmount = record.get('amount');
            var alreadyAllocated = record.get('alreadyAllocated');
            var remainAmount = maxAmount - alreadyAllocated;


            if (allocationAmount > remainAmount) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配金额不能大于经费未分配总额：' + Money.render(remainAmount),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }
            if (allocationAmount > projectCanAllocationOutAmount) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配金额不能大于经费分配的最高外协分配金额：' + Money.render(projectCanAllocationOutAmount),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }

            record.set('remainAllocated', remainAmount - allocationAmount);
        }
        return true;
    }
    /** 只有复选框选中，才能够被编辑
    this.beforeedit = function(e) {
    switch (e.column) {   // e.column可以判定激活了那一列的编辑器
    case 5:
    {
    if (!this.getSelectionModel().isIdSelected(e.row + 1)) {
    e.cancel = true; // 取消用户编辑操作 
    }

                    break;
    }
    default:
    break;
    }
    }*/

    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.fund.VoucherEditWindow_Out_EditGridPanel, Ext.grid.EditorGridPanel, {});
