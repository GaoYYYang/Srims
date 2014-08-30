
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_StateHistoryForm = function(project){
    this._project = project;
    
    this._store = new Srims.projects.ProjectHistoryStateStore(project);
    
    this._columnModel = new Ext.grid.ColumnModel([{
        header: "id",
        hidden: true
    }, {
        header: "项目状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.projects.projectStateRender
    }, {
        header: "时间",
        dataIndex: 'dateTime',
        width: 80,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        id: 'remark',
        header: "备注",
        dataIndex: 'remark'
    }]);
    
    this._gridPanelProjectStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoHeight: true,
        autoExpandColumn: 'remark',
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true
        }
    });
    
    Srims.projects.ProjectShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目状态历史',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectStateHistory]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_StateHistoryForm, Ext.FormPanel, {});
