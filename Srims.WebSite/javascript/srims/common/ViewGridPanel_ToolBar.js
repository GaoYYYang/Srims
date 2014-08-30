
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewGridPanel_ToolBar = function(selection, store, viewType){
    //fields
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonOperate = new Ext.Toolbar.Button({
        iconCls: Srims.common.ViewType.getIconCls(viewType),
        text: '执行',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.common.doViewAction(this.selection.getSelected());
        },
        hidden: true,
        tooltip: Srims.common.viewTypeRender(viewType)
    });
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.common.exportViewResult(this.selection.getSelected());
        },
        tooltip: '<b>导出统计结果</b><br/>导出该统计视图统计的结果',
        hidden: true
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
            Ext.MessageBox.confirm('删除视图', '你确定要删除这个视图吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.common.deleteView(this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '删除视图'
    });
    this._buttonRename = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '重命名',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.common.renameView(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '删除视图'
    });
    
    Srims.common.ViewGridPanel_ToolBar.superclass.constructor.call(this, {
        height: 25,
        items: [this._buttonOperate, this._buttonRename, this._buttonExport, this._buttonDelete]
    });
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonOperate = this._buttonOperate;
    this._selection.buttonExport = this._buttonExport;
    this._selection.buttonRename = this._buttonRename;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonOperate = selection.buttonOperate;
        var buttonExport = selection.buttonExport;
        var buttonRename = selection.buttonRename;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonOperate.hide();
            buttonExport.hide();
            buttonRename.hide();
            
            return;
        }
        
        var view = selection.getSelected();
        
        buttonDelete.setVisible(view.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!view.get('canDelete'));
        
        buttonRename.setVisible(view.get('hasPermission_Rename'));
        buttonRename.setDisabled(!view.get('canRename'));
        
        buttonOperate.setVisible(true);
        buttonExport.setVisible(Array.itemIsExistInArray(Srims.common.staticViewType, view.get('type')));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.common.ViewGridPanel_ToolBar, Ext.Toolbar);
