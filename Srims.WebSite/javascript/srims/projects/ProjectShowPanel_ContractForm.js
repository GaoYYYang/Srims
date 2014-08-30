
if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.douments) 
    Ext.namespace('Srims.douments');

Srims.projects.ProjectShowPanel_ContractForm = function(projectId){
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: projectId == undefined ? 0 : projectId
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel();
    
    this._gridPanelContract = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'type',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有合同信息'
        }
    });
    Srims.projects.ProjectShowPanel_ContractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '合同信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelContract]
    });
    if (projectId) 
        this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this._gridPanelContract.on('celldblclick', onCellDblClick);
    
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_ContractForm, Ext.form.FormPanel, {});
