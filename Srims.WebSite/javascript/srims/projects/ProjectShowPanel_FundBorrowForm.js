
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.ProjectShowPanel_FundBorrowForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.fund.FundDescendService + '/GetBorrowByProjectId';
    this._store = new Srims.fund.FundDescendStore(load_url, params);
    this._columnModel = new Srims.fund.FundDescendGridPanel_ColumnModel(true, true, false);
    
    this._gridPanelBorrow = new Ext.grid.GridPanel({
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
            emptyText: '没有借款记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_FundBorrowForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '借款记录',
        autoHeight: true,
        hidden: project.get('borrowAmount') == 0,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelBorrow]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundBorrowForm, Ext.FormPanel, {});

