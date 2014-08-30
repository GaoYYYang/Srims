
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundBatchDescendWindow_EditGridPanel = function(finance, store){

    this._store = store;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FundBatchDescendWindow_EditGridPanel_ColumnModel();
    Srims.fund.FundBatchDescendWindow_EditGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        height: 258,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        autoExpand: true,
        autoExpandColumn: 'fundDescend',
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });
    
    this.validateedit = function(obj){
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;
        
        var descendAmount = Money.toMoney(editor.getValue());
        if (descendAmount <= 0) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '下拨金额必须大于0',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        if (descendAmount > finance.get('amount') - finance.get('descendAmount')) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '下拨金额必须大于经费到帐的未下拨金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        var canDescendAmount = record.get('fundCanDescend');
        if (descendAmount > canDescendAmount) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '下拨金额不能大于项目的未到金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        return true;
    }
    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.fund.FundBatchDescendWindow_EditGridPanel, Ext.grid.EditorGridPanel, {});
