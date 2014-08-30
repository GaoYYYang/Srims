
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectGridPanel = function(id, projectStore, title, iconCls, isHorizontal, projectState, expertAttendType, queryParams){

    //fields
    this._projectStore = projectStore;
    this._isHorizontal = isHorizontal;
    this._projectSate = projectState;
    this._projectStore.gird = this;
    this._expertAttendType = expertAttendType;
    
    //controls  
    if (expertAttendType == 'Participate') 
        this._columnModel = new Srims.projects.projectGridPanel_MyJoinProject_ColumnModel();
    else 
        this._columnModel = new Srims.projects.projectGridPanel_ColumnModel();
    
    this._selection = new Ext.grid.RowSelectionModel();
    this._filters = new Srims.projects.ProjectGridPanel_GridFilters();
    this._toolbar = new Srims.projects.ProjectGridPanel_ToolBar(this, id, queryParams);
    this._textItemFundSum = new Ext.Toolbar.TextItem('');
    
    this._bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._projectStore,
        plugins: this._filters,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录",
        items: [this._textItemFundSum]
    })
    
    var params = {};
    params.sm = this._selection;
    params.store = this._projectStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.bbar = this._bbar;
    
    //constructor
    Srims.projects.ProjectGridPanel.superclass.constructor.call(this, params);
    //event
    if (expertAttendType != 'Participate') {
        this._projectStore.on('load', function(store, records){
            if (records.fundSum == undefined || records.fundSum == null) 
                records.fundSum = records.fundReceivedSum = 0;
            
            var fundSumMessage = String.format(" 总经费：<strong>{0}</strong>，已到经费：<strong>{1}</strong>", Money.render(records.fundSum), Money.render(records.fundReceivedSum));
            Ext.get(store.gird._textItemFundSum.id).update(fundSumMessage);
        });
        this.on('celldblclick', onCellDblClick);
    }
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var project = grid.getStore().getAt(rowIndex);
        if (!project.get('canShow')) 
            return;
        Srims.projects.showProject(project);
    }
};
Ext.extend(Srims.projects.ProjectGridPanel, Srims.component.GridPanel);
