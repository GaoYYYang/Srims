
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectGridPanel = function(id, projectStore, title, iconCls, expertAttendType, queryParams) {

    //fields
    this._projectStore = projectStore;

    this._projectStore.gird = this;
    this._expertAttendType = expertAttendType;
    this._columnModel = new Srims.projects.RecoveryprojectGridPanel_ColumnModel();
    this._selection = new Ext.grid.RowSelectionModel();
    this._filters = new Srims.projects.RecoveryProjectGridPanel_GridFilters();
    this._toolbar = new Srims.projects.RecoveryProjectGridPanel_ToolBar(this, id, queryParams);
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
    //event
    this._projectStore.on('load', function(store, records) {
        if (records.PerformanceSum == undefined || records.OverheadExpensesSum == null)
            records.PerformanceSum = records.OverheadExpensesSum = 0;

        var fundSumMessage = String.format("<font size='8px'> 总学校间接费用差值：<strong>{0}</strong>，总二级单位间接费用差值：<strong>{1}</strong>，总课题组间接费用和绩效差值：<strong>{2}</strong></font>", Money.render(records.OverheadExpensesSum), Money.render(records.OverheadExpensesMiddleSum), Money.render(records.PerformanceSum));
        Ext.get(store.gird._textItemFundSum.id).update(fundSumMessage);
    });
    //constructor
    Srims.projects.RecoveryProjectGridPanel.superclass.constructor.call(this, params);
    this.on('celldblclick', onCellDblClick);

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var project = grid.getStore().getAt(rowIndex);
        Srims.projects.showProject_Recovery(project);
    }
};
Ext.extend(Srims.projects.RecoveryProjectGridPanel, Srims.component.GridPanel);
