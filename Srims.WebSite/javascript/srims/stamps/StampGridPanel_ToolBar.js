
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.stamp.newStamp(this.store);
        },
        tooltip: '<b>添加图章</b><br/>输入图章信息以添加图章'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.editStamp(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑图章</b><br/>编辑选中图章的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.deleteStamp(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除用印文件</b>'
    });
    var user = Srims.currentLoginLog.user;
    Srims.stamp.StampGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
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
        
        var stamp = selection.getSelected();
        
        buttonEdit.setVisible(stamp.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!stamp.get('canEdit'));
        
        buttonDelete.setVisible(stamp.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!stamp.get('canEdit'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StampGridPanel_ToolBar, Ext.Toolbar);
