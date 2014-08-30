
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.MyUnsubmitProjectsGridPanel = function(project, projectStore, isSetHorizontal){

    //fields
    this._project = project;
    this._projectStore = projectStore;
    this._projectStore.gird = this;
    //controls  
    
    this._selection = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });
    this._selection.grid = this;
    this._columnModel = new Srims.projects.MyUnsubmitProjectsGridPanel_ColumnModel(this._selection);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的记录'
    });
    
    Srims.projects.MyUnsubmitProjectsGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._projectStore,
        sm: this._selection,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        width: 800,
        view: this._view,
        autoHeight: true
    });
    this._projectStore.load();
    
    this.next = function(){
        if (this._selection.getSelected()) {
            var project = this._selection.getSelected();
            if (project.get('id') != this.panel.panel._panelBasic._project.get('id')) {
                this.panel.panel._panelBasic.setProject(project);
                this.parentPanel._ProjectOutPanel.setProject(project);
                this.panel.panel.setIconClass('icon-project-edit');
                this.panel.panel.setTitle('项目' + project.get('name') + '立项申请');
            }
        }
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.projects.MyUnsubmitProjectsGridPanel, Srims.component.GridPanel);
