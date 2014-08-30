
if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.projects.projectPerformanceAllocation = undefined;
Srims.projects.showProjectPerformanceAllocation = function(){
Srims.performance.showPerformanceAllocationInfo(Srims.projects.projectPerformanceAllocation);
}

Srims.projects.ProjectShowPanel_PerformanceAllocationForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.performance.PerformanceAllocationService + '/GetByProjectID';
    this._store = new Srims.performance.PerformanceAllocationStore(load_url, params);
    this._columnModel = new Srims.performance.PerformanceAllocationGridPanel_ColumnModel(false);
    
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
            emptyText: '没有绩效分配记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_PerformanceAllocationForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '绩效分配记录',
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
        Srims.projects.projectPerformanceAllocation = fundAllocation;
        
        Srims.Load.loadPerformanceModule('Srims.projects.showProjectPerformanceAllocation();');
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
Ext.extend(Srims.projects.ProjectShowPanel_PerformanceAllocationForm, Ext.FormPanel, {});

