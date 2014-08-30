
if (!Srims.common)
    Ext.namespace('Srims.common');

//用于查看外协的详细项目信息
Srims.common.allocationinfoRecord = undefined;
Srims.common.showProject = function() {
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: Srims.common.allocationinfoRecord.get('projectId')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectXmlReader()
            });
            var project = store.getAt(0);
            Srims.projects.showProject(project);
        }
    });
}
Srims.common.OutsourcingShowPanel_AllocationInfo = function(outsourcing, id, queryParams) {
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该外协暂时没有分到经费'
    });
    this._showPanelID = id;
    this._panelID = 'OutsourcingAllocationInfo' + outsourcing.get('id');
    this._outsourcing = outsourcing;
    if (!queryParams) {
        this._queryParams = {};
        this._queryParams.ID = this._outsourcing.get('id');
    }
    this._expander = new Ext.grid.RowExpander({
        tpl: new Ext.Template(
            '<br><p style="padding-left:20px;">凭单明细: 该外协单位在该项目下生成了{voucherCount}张凭单。</p><br><p  style="padding-left:20px;line-height:1.5em;">{voucherDetail}</p><br><br>'
        )
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.common.OutsourcingShowPanel_AllocationInfo_ColumnModel(this._expander);
    this._store = new Srims.common.OutsourcingAllocationStore(Srims.service.common.OutsourcingService + '/GetAllocatedInfo', this._queryParams);
    this._toolbar = new Srims.common.OutsourcingShowPanel_AllocationInfo_ToolBar(this._showPanelID, this._store, this._queryParams, this._outsourcing);
    this._filters = new Srims.common.OutsourcingShowPanel_AllocationInfo_GridFilters();
    this._textItemFundSum = new Ext.Toolbar.TextItem('');

    Srims.common.OutsourcingShowPanel_AllocationInfo.superclass.constructor.call(this, {
        id: this._panelID,
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        sm: this._selections,
        store: this._store,
        plugins: [this._filters, this._expander],
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        autoHeight: true,
        title: '该外协公司的相关项目',
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._store,
            // plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录',
            items: [this._textItemFundSum]
        })
    })
    this._store.load();
    this._store.grid = this;
    this.on('celldblclick', onCellDblClick);
    this._store.on('load', function(store, records) {
        if (records.ProjectOutAllAmount == undefined || records.AllocatedAllAmount == null)
            records.ProjectOutAllAmount = records.AllocatedAllAmount = 0;

        var fundSumMessage = String.format(" 外协计划分配总额：<strong>{0}</strong>，已分配外协总额：<strong>{1}</strong>", Money.render(records.ProjectOutAllAmount), Money.render(records.AllocatedAllAmount));
        Ext.get(store.grid._textItemFundSum.id).update(fundSumMessage);
    });
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var allocationinfoRecord = grid.getStore().getAt(rowIndex);
        if (!allocationinfoRecord.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该项目的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.common.allocationinfoRecord = allocationinfoRecord;
        Srims.Load.loadProjectModule('Srims.common.showProject();');
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo, Ext.grid.GridPanel);