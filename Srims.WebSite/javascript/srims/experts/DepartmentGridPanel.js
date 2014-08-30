
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentGridPanel = function(id, departmentStore, title, iconCls){
    //fields
    this._departmentStore = departmentStore;
    this._departmentStore.grid = this;
    
    //control
    this._selection = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.DepartmentGridPanel_ColumnModel();
	this._filters = new Srims.experts.DepartmentGridPanel_GridFilters();
	this._toolbar= new Srims.experts.DepartmentGridPanel_ToolBar(this._selection,departmentStore,id);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的部门'
    })
    
    //public methods
    this.getDepartmentStore = function(){
        return this._departmentStore;
    }
    
    //constructor
    Srims.experts.DepartmentGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._departmentStore,
        sm: this._selection,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins:this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._departmentStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
};
Ext.extend(Srims.experts.DepartmentGridPanel, Ext.grid.GridPanel);
