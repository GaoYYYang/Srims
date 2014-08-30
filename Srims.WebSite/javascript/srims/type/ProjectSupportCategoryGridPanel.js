
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportCategoryGridPanel = function(projectType, projectTypeStore){

    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    this._store = new Srims.type.ProjectSupportCategoryStore();
    this._store.gird = this;
    this._columnModel = new Srims.type.ProjectSupportCategoryGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.type.ProjectSupportCategoryGridPanel_ToolBar(this._selections, this._store, this._projectType, this._projectTypeStore);
    
    //public methods
    this.getProjectSupportCategoryStore = function(){
        return this._store;
    }
    
    Srims.type.ProjectSupportCategoryGridPanel.superclass.constructor.call(this, {
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
            projectTypeID: projectType.get('id')
        }
    });
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectSupportCategory = grid.getProjectSupportCategoryStore().getAt(rowIndex);
        Srims.type.editProjectSupportCategory(projectSupportCategory, this._store, this._projectType, this._projectTypeStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.type.ProjectSupportCategoryGridPanel, Srims.component.GridPanel, {});
