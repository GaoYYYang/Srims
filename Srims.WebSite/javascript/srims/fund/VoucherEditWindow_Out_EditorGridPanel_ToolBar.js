
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditWindow_Out_EditGridPanel_ToolBar = function(grid, store, selection){

    this._selection = selection;
    
    this._buttonHeader = new Ext.Toolbar.Button({
    text: '<b style="color:#15428B">外协分配，</b>' + '<b style="color:#FF0000">注意：请在“本次分配”列中添加本次需分配的外协单位额度！</b>',
        minWidth: 60
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        grid: grid,
        store: store,
        handler: function(){
        
            if (this.store.getCount() >= 10) {
                Ext.Msg.show({
                    title: '添加外协错误',
                    msg: '一张凭单最多添加5个外协公司',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            
            var voucherOut = new Srims.fund.VoucherOut({
                corporation: '',
                amount: ''
            });
            
            this.grid.stopEditing();
            this.store.insert(0, voucherOut);
            this.grid.startEditing(0, 0);
            
        },
        tooltip: '<b>添加外拨公司</b><br/>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        selection: selection,
        store: store,
        minWidth: 60,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除外协分配', '你确定要删除这个外协分配吗？', function(buttonId){
                if (buttonId == 'yes') 
                    this.store.remove(this.selection.getSelected());
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除外拨公司</b><br/>删除选中的外拨公司'
    });
    
    var items = [this._buttonHeader];
    Srims.fund.VoucherEditWindow_Out_EditGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items,
        height: 25
    });
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    //event methods
    this._onSelection_selectionChagne = function(selection){
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
Ext.extend(Srims.fund.VoucherEditWindow_Out_EditGridPanel_ToolBar, Ext.Toolbar);

