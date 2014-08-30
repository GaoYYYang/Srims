
if (!Srims.documents) 
    Ext.namespace("Srims.documents");

Srims.documents.DocumentModelEditWindow_projectTypeSelectForm = function(projectRankStore){

    var load_url = Srims.service.type.ProjectTypeService + '/GetByRankId';
    this._store = new Srims.type.ProjectTypeStore(load_url);
    
    this._getProjectRankButtons = function(){
        var buttons = [];
        for (var i = 0; i < projectRankStore.getCount(); i++) {
            var projectRank = projectRankStore.getAt(i);
            var button = new Ext.Toolbar.Button({
                text: projectRank.get('name'),
                minWidth: 30,
                projectRank: projectRank,
                store: this._store,
                handler: function(){
                    this.store.load({
                        params: {
                            projectRankId: this.projectRank.get('id')
                        }
                    });
                },
                tooltip: '<b>更新项目类型</b><br/>更新项目类型'
            });
            buttons[buttons.length] = button;
        }
        return buttons;
    };
    this._toolbar = new Ext.Toolbar({
        items: this._getProjectRankButtons()
    });
    
    this._selection = new Ext.grid.CheckboxSelectionModel();
    this._columnModel = new Ext.grid.ColumnModel([this._selection, {
        header: "类别名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false
    }]);
    
    var params = {};
    params.sm = this._selection;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.height = 500;
    params.width = 300;
    params.defaultBBar = false;
    this._gridPanelProjectType = new Srims.component.GridPanel(params);
    
    Srims.documents.DocumentModelEditWindow_projectTypeSelectForm.superclass.constructor.call(this, {
        title: '选择项目类型',
        autoWidth: true,
        autoHeight: true,
        layout: 'form',
        frame: true,
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectType]
    });
    
    this.getProjectTypeId = function(){
        var records = this._selection.getSelections();
        var projectTypesID = '';
        for (var i = 0; i < records.length; i++) 
            projectTypesID += records[i].get('id') + ',';
        
        return projectTypesID;
    }
    this._store.load({
        params: {
            projectRankId: projectRankStore.getAt(0).get('id')
        }
    });
}
Ext.extend(Srims.documents.DocumentModelEditWindow_projectTypeSelectForm, Ext.form.FormPanel, {});


