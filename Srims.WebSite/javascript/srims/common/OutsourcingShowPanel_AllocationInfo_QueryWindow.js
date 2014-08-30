
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow = function(id, store, queryParams, gridPanel, outsourcing) {

    this._id = id;
    this._store = store;
    this._gridPanel = gridPanel;
    this._outsoucing = outsourcing;
    this._queryParams = queryParams;
    this._basicPanel = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel();
    this._typePanel = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_TypePanel(true);
    this._fundPanel = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel();
    this._memberPanel = new Srims.component.QueryWindow_MemberPanel('项目成员信息');

    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function() {
            this.window.getGridPanel();
            this.window.clearParams();

            Srims.SetQueryParams.clearParams(queryParams, new Array('token', 'ID'));
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function() {
            var window = this.window;

            window.getParams();

            Srims.common.newView(Srims.common.ViewType.OutsourcingAllocationInfoQuery, Srims.SetQueryParams.toJSON(queryParams));

        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function() {
            Srims.common.showViewWindow(Srims.common.ViewType.OutsourcingAllocationInfoQuery);

            this.window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目查询',
        iconCls: 'icon-project-horizontal-query',
        width: 850,
        height: 610,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        stateful: false,
        resizable: false,
        items: [new Ext.Panel({
            width: 520,
            layout: 'form',
            autoScroll: true,
            height: 535,
            labelWidth: 100,
            autoScroll: true,
            items: [this._basicPanel, this._fundPanel, this._memberPanel]
        }), new Ext.Panel({
            layout: 'form',
            autoScroll: true,
            labelWidth: 100,
            items: [this._typePanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });

    this.getParams = function() {
        this._basicPanel.buildParams(this._queryParams);
        this._fundPanel.buildParams(this._queryParams);
        this._memberPanel.buildParams(this._queryParams);
        this._typePanel.buildParams(this._queryParams);
    }
    this.clearParams = function() {
        this._basicPanel.clearParams();
        this._fundPanel.clearParams();
        this._memberPanel.clearParams();
        this._typePanel.clearParams();
    }
    this.getGridPanel = function() {
        var gridPanelID = this._gridPanel.id;
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._OutsourcingAllocationInfoForm._filters.clearFilters();
    }
    this.query = function(button) {
        var window = button.window;
        window.getGridPanel();
        window.getParams();

        Srims.SetQueryParams.removeNullparams(this._queryParams);
        window._store.load();
        window.hide();
    }
    //event
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow, Ext.Window);

