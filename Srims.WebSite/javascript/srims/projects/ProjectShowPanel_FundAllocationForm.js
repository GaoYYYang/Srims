
if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.projectFundAllocation = undefined;
Srims.projects.showProjectFundAllocation = function(){
    Srims.fund.showFundAllocationInfo(Srims.projects.projectFundAllocation);
}

Srims.projects.ProjectShowPanel_FundAllocationForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.fund.FundAllocationService + '/GetByProjectID';
    this._store = new Srims.fund.FundAllocationStore(load_url, params);
    this._columnModel = new Srims.fund.FundAllocationGridPanel_ColumnModel(false);
    
    this._gridPanelFundAllocation = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有经费分配记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_FundAllocationForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配记录',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundAllocation]
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundAllocation = grid.getStore().getAt(rowIndex);
        Srims.projects.projectFundAllocation = fundAllocation;
        
        Srims.Load.loadFundModule('Srims.projects.showProjectFundAllocation();');
    };
    this._gridPanelFundAllocation.on('celldblclick', onCellDblClick);
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundAllocationForm, Ext.FormPanel, {});

