
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
