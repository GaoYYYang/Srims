
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentGridPanel = function(project){

    this._project = project;
    
    var load_url = Srims.service.documents.DocumentService + '/GetByProjectID';
    var params = {
        projectId: project.get('id')
    };
    this._store = new Srims.documents.DocumentStore(load_url, params);
    this._columnModel = new Srims.documents.DocumentGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DocumentGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 270;
    
    Srims.documents.DocumentGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.DocumentGridPanel, Srims.component.GridPanel, {});
