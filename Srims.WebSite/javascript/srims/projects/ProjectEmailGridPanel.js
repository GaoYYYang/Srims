
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEmailGridPanel = function(id, projectStore, title, iconCls){

    //fields
    this._projectStore = projectStore;
    
    //controls  
    this._selection = new Ext.grid.CheckboxSelectionModel();
    this._toolbar = new Srims.projects.ProjectEmailGridPanel_ToolBar(this._selection, this._projectStore);
    this._columnModel = new Srims.projects.ProjectEmailGridPanel_ColumnModel(this._selection);
    
    this._bbar = new Ext.PagingToolbar({
        pageSize: 9999999,
        store: this._projectStore,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录"
    })
    
    var params = {};
    params.sm = this._selection;
    params.store = this._projectStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.bbar = this._bbar;
    params.loadMask = false;
    
    var loadMask = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在加载数据......'
    });
    this._projectStore.loadMask = loadMask;
    this._projectStore.selection = this._selection;
    //事件
    this._projectStore.on('beforeload', function(){
        this.loadMask.show();
    })
    this._projectStore.on('load', function(){
        this.loadMask.hide();
        this.selection.selectAll();
    })
    Srims.projects.ProjectEmailGridPanel.superclass.constructor.call(this, params);
};
Ext.extend(Srims.projects.ProjectEmailGridPanel, Srims.component.GridPanel);
