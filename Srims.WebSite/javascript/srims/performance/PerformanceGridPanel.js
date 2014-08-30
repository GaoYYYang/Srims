/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceGridPanel = function(id, performanceStore, title,
		iconCls, queryParams) {
    // fields
    this._performanceStore = performanceStore;
    this._performanceStore.grid = this;

    // public method
    this.GetPerformanceStore = function() {
        return this._performanceStore;
    };


    // controls
    //this._selections = new Ext.grid.RowSelectionModel();
    this._selections = new Ext.grid.CheckboxSelectionModel({ handleMouseDown: function(g, rowIndex, e) {
        if (e.button !== 0 || this.isLocked()) {
            return;
        }
        var view = this.grid.getView();
        if (e.shiftKey && !this.singleSelect && this.last !== false) { // shift事件
            var last = this.last;
            this.selectRange(last, rowIndex, e.ctrlKey);
            this.last = last; // reset the last     
            view.focusRow(rowIndex);
        } else {
            var isSelected = this.isSelected(rowIndex);
            if (isSelected) {
                this.deselectRow(rowIndex);
            } else if (!isSelected || this.getCount() > 1) {
                this.selectRow(rowIndex, true);
                view.focusRow(rowIndex);
            }
        }
    }
    });

    this._columnModel = new Srims.performance.PerformancePanel_ColumnModel(this._selections); // 位于文件outsourcingPanel_ColumnModel.js
    this._filters = new Srims.performance.PerformanceGridPanel_GridFilters(); // 位于文件outsourcingGridPanel_GridFilters.js
    this._toolbar = new Srims.performance.PerformanceGridPanel_ToolBar(
			this._performanceStore, this._selections, queryParams, id); // 位于文件outsourcingGridPanel_ToolBar.js

    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的校绩单位'
    });
    //carlsirce2013.4.1 加入绩效统计内容
    this._textItemFundSum = new Ext.Toolbar.TextItem('');
    // constructor
    Srims.performance.PerformanceGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._performanceStore,
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
            store: this._performanceStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录',
            items: [this._textItemFundSum]
        })
    });
    this._performanceStore.load();
    // event
    this.on('celldblclick', onCellDblClick);
    this._performanceStore.on('load', function(store, records) {
        if (records.performancePaySum == undefined || records.arrivedPerformanceSum == null || records.allocatedPerformanceSum == null || records.descendPerformancSum == null)
            records.performancePaySum = records.arrivedPerformanceSum = records.allocatedPerformanceSum = records.descendPerformancSum = 0;

        var fundSumMessage = String.format(" <font size='8'>学校间接费用：<strong>{0}</strong>，二级单位间接费用：<strong>{1}</strong>，课题组间接费用及绩效：<strong>{2}</strong>，已下拨：<strong>{3}</strong></font>", Money.render(records.overheadExpensesInSum), Money.render(records.overheadExpensesMiddleSum), Money.render(records.receivedPerformance), Money.render(records.descendPerformance));
        Ext.get(store.grid._textItemFundSum.id).update(fundSumMessage);
    });
    // private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var performance = grid.getStore().getAt(rowIndex);
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/GetById',
            params: {
                projectId: performance.get('projectID')
            },
            success: function(response) {
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.projects.ProjectXmlReader()
                });
                var project = store.getAt(0);
                Srims.projects.showProject(project);
                //Srims.Load.loadProjectModule('Srims.projects.showProject(project);');
            }
        });

    }
}
Ext.extend(Srims.performance.PerformanceGridPanel, Ext.grid.GridPanel);