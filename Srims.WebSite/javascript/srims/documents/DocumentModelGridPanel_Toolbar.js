
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

