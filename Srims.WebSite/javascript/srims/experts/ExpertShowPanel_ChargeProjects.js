
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

//用于查看专家的详细项目信息
Srims.experts.project = undefined;
Srims.experts.showProject = function(){
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: Srims.experts.project.get('id')
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
Srims.experts.ExpertShowPanel_ChargeProjects = function(expert){
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有负责的项目'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_ChargeProjects_ColumnModel();
    this._store = new Srims.experts.ExpertProjectStore(Srims.service.experts.ExpertService + '/GetExpertChargeProjects', {
        expertId: expert.get('id')
    });
    Srims.experts.ExpertShowPanel_ChargeProjects.superclass.constructor.call(this, {
        id: 'ExpertChargeProjects' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        sm: this._selections,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        autoHeight: true,
        title: '负责的项目',
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        view: this._view
    })
    this._store.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var project = grid.getStore().getAt(rowIndex);
        if (!project.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该项目的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.project = project;
        Srims.Load.loadProjectModule('Srims.experts.showProject();');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_ChargeProjects, Ext.grid.GridPanel);
