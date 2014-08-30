if (!Srims.common)
    Ext.namespace('Srims.common');


Srims.common.SubjectSecondLevelGridPanel = function(id, subjectSecStore, title, iconCls) {
    //fields
    this._subjectStore = subjectSecStore;
    this._subjectStore.grid = this;

    //control
    this._selection = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.common.SubjectSecondLevelGridPanel_ColumnModel();
    this._filters = new Srims.common.SubjectSecondLevelGridPanel_GridFilters();
    this._toolbar = new Srims.common.SubjectSecondLevelGridPanel_ToolBar(this._selection, this._subjectStore, id);
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
    Srims.common.SubjectSecondLevelGridPanel.superclass.constructor.call(this, {
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
Ext.extend(Srims.common.SubjectSecondLevelGridPanel, Ext.grid.GridPanel);