
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_ProjectOutForm = function(project) {
    this._project = project;
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();

    this._gridPanelProjectMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoExpandColumn: 'taskName',
        autoExpand: true,
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true
        }
    });

    Srims.projects.ProjectShowPanel_ProjectOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectMember]
    });
    if (project.get('id'))
        this._store.load();

    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_ProjectOutForm, Ext.FormPanel, {});
