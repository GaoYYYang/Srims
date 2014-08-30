
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendGridPanel_ToolBar = function(selection, store, panelId, queryParams, isDescendPage){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">经费还款信息</b>',
        minWidth: 60
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
            
            Ext.MessageBox.confirm('删除还款记录', '你确定要删除这个还款记录吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.fund.deleteFundReturn(this.selection.getSelected(), this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除经费下拨</b><br/>删除选中的经费下拨'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费下拨列表'
    });
    
    var items = [this._buttonHeader, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh];
    
    Srims.fund.FinanceFundDescendGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    
    this._buttonHeader.setVisible(isDescendPage);
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }
        
        var financeFundDescend = selection.getSelected();
        
        buttonDelete.setVisible(financeFundDescend.get('hasPermission_DeleteReturn') && isDescendPage == true);
        buttonDelete.setDisabled(!financeFundDescend.get('canDeleteReturn'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FinanceFundDescendGridPanel_ToolBar, Ext.Toolbar);
