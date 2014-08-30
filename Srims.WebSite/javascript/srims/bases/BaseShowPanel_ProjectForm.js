
if (!Srims.bases) 
    Ext.namespace("Srims.bases");

//用户查看项目详细信息
Srims.bases.project = undefined;
Srims.bases.showProject = function(){
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: Srims.bases.project.get('id')
        },
        success: function(response){
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectXmlReader()
            });
            var project = store.getAt(0);
            Srims.projects.showProject(project);
        }
    });
}

Srims.bases.BaseShowPanel_ProjectForm = function(base){

    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.projects.projectGridPanel_MyJoinProject_ColumnModel();
    this._store = new Srims.projects.ProjectSimpleStore(Srims.service.bases.BaseService + '/GetProjects', {
        baseId: base.get('id')
    });
    Srims.bases.BaseShowPanel_ProjectForm.superclass.constructor.call(this, {
        store: this._store,
        colModel: this._columnModel,
        sm: this._selections,
        enableColumnHide: false,
        title: '承担的项目',
        enableColumnMove: true,
        enableHdMenu: false,
        border: true,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有项目信息'
        }
    });
    
    this._store.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var project = grid.getStore().getAt(rowIndex);
        if (!project.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '该用户名没有查看该项目的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.bases.project = project;
        Srims.Load.loadProjectModule('Srims.bases.showProject();');
    }
}
Ext.extend(Srims.bases.BaseShowPanel_ProjectForm, Ext.grid.GridPanel);

