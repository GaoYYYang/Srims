
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
