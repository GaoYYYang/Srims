
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertGridPanel = function(id, expertStore, title, iconCls, queryParams){
    //fields
    this._id = id;
    this._expertStore = expertStore;
    this._expertStore.grid = this;
    //controls
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._filters = new Srims.experts.ExpertGridPanel_GridFilters();
    this._columnModel = new Srims.experts.ExpertGridPanel_ColumnModel(expertStore);
    this._toolbar = new Srims.experts.ExpertGridPanel_ToolBar(this._expertStore, this._selections, id, queryParams);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的专家'
    });
    
    //public methods
    this.getStore = function(){
        return this._expertStore;
    };
    this.onDestroy = function(){
        if (this.queryPanel) {
            Srims.WorkSpace.getWorkSpace().remove(this.queryPanel);
        }
        Srims.experts.ExpertGridPanel.superclass.onDestroy.call(this);
    }
    //constructor
    Srims.experts.ExpertGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._expertStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._expertStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._expertStore.columnModel = this._columnModel;
    this._expertStore.on('load', function(store, records){
        var columnModel = store.columnModel;
        var showProjectIndex = columnModel.findColumnIndex('projectCount');
        var showPaperIndex = columnModel.findColumnIndex('paperCount');
        var showPatentIndex = columnModel.findColumnIndex('patentCount');
        var showAwardIndex = columnModel.findColumnIndex('awardCount');
        
        columnModel.setHidden(showProjectIndex, !records.showProjectCount);
        columnModel.setHidden(showPaperIndex, !records.showPaperCount);
        columnModel.setHidden(showPatentIndex, !records.showPatentCount);
        columnModel.setHidden(showAwardIndex, !records.showAwardCount);
    });
    this._expertStore.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var expert = grid.getStore().getAt(rowIndex);
        Srims.experts.ExpertAction.showExpert(expert);
    };
    }
Ext.extend(Srims.experts.ExpertGridPanel, Ext.grid.GridPanel);
