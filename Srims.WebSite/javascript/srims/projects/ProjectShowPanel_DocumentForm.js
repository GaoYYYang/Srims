
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.douments) 
    Ext.namespace('Srims.douments');

Srims.projects.ProjectShowPanel_DocumentForm = function(project){
    this._project = project;
    
    var load_url = Srims.service.documents.DocumentService + '/GetByProjectID';
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    this._store = new Srims.documents.DocumentStore(load_url, params);
    
    this._columnModel = new Srims.documents.DocumentGridPanel_ColumnModel();
    
    this._gridPanelDocument = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 720,
        autoExpand: true,
        autoExpandColumn: 'censorDateTime',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有文档信息'
        }
    });
    
    Srims.projects.ProjectShowPanel_DocumentForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '文档信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelDocument]
    });
    if (project.get('id')) 
        this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this._gridPanelDocument.on('celldblclick', onCellDblClick);
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
    
}
Ext.extend(Srims.projects.ProjectShowPanel_DocumentForm, Ext.FormPanel, {});
