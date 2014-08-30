
if (!Srims.tupe) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportSubFieldGridPanel = function(projectSupportField, projectSupportFieldStore, projectType, projectTypeStore){

    this._projectSupportField = projectSupportField;
    this._projectSupportFieldStore = projectSupportFieldStore;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    this._store = new Srims.type.ProjectSupportSubFieldStore();
    this._store.gird = this;
    this._columnModel = new Srims.type.ProjectSupportSubFieldGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.type.ProjectSupportSubFieldGridPanel_ToolBar(this._selections, this._store, this._projectSupportField, this._projectSupportFieldStore, this._projectType, this._projectTypeStore);
    
    //public methods
    this.getProjectSupportSubFieldStore = function(){
        return this._store;
    }
    
    Srims.type.ProjectSupportSubFieldGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    this._store.load({
        params: {
            projectSupportFieldID: projectSupportField.get('id')
        }
    });
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectSupportSubField = grid.getProjectSupportSubFieldStore().getAt(rowIndex);
        Srims.type.editProjectSupportSubField(projectSupportSubField, this._store, this._projectSupportField, this._projectSupportFieldStore, this._projectType, this._projectTypeStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.type.ProjectSupportSubFieldGridPanel, Srims.component.GridPanel, {});


