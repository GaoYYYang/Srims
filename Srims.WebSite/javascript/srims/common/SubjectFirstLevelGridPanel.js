if (!Srims.common)
    Ext.namespace('Srims.common');


Srims.common.SubjectFirstLevelGridPanel = function(id, subjectStore, title, iconCls) {
    //fields
    this._subjectStore = subjectStore;
    this._subjectStore.grid = this;

    //control
    this._selection = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.common.SubjectFirstLevelGridPanel_ColumnModel();
    this._filters = new Srims.common.SubjectFirstLevelGridPanel_GridFilters();
    this._toolbar = new Srims.common.SubjectFirstLevelGridPanel_ToolBar(this._selection, this._subjectStore, id);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的学科'
    })

    //public methods
    this.getSubjectStore = function() {
        return this._subjectStore;
    }

    //constructor
    Srims.common.SubjectFirstLevelGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._subjectStore,
        sm: this._selection,
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
            store: this._subjectStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
};
Ext.extend(Srims.common.SubjectFirstLevelGridPanel, Ext.grid.GridPanel);
