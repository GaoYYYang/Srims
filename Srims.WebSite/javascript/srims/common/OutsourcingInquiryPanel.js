
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingInquiryPanel = function(id, store, queryParams, gridPanel) {

    this._id = id;
    this._store = store;
    this._params = queryParams;

    //this._relation = new Srims.experts.ExpertQueryPanel_Relation();
    this._basic = new Srims.common.OutsourcingInquiryPanel_Basic();

    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        panel: this,
        handler: function() {
            this.panel.clearParams();
            queryParams = this.panel.getParams();
            this.panel._store.load();
            Srims.WorkSpace.active(gridPanel._id);
        }
    });
    //查询外协单位
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        panel: this,
        handler: function() {
            var panel = this.panel;
            queryParams = panel.getParams();
            panel._store.load();
            Srims.WorkSpace.active(gridPanel._id);
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        panel: this,
        handler: function() {
            var panel = this.panel;
            panel.clearParams();
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        panel: this,
        handler: function() {
            var panel = this.panel;

            panel.getParams();
            Srims.common.newView(Srims.common.ViewType.ExpertQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    })
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        panel: this,
        handler: function() {
            var panel = this.panel;

            Srims.common.showViewWindow(Srims.common.ViewType.ExpertQuery);
            panel.hide();
        }
    })
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        panel: this,
        handler: function() {
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });

    var user = Srims.currentLoginLog.user;
    var items = [this._basic];

    Srims.common.OutsourcingInquiryPanel.superclass.constructor.call(this, ({
        id: id,
        title: '外协单位查询',
        iconCls: 'icon-expert-query',
        closable: true,
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        deferHeight: false,
        titleCollapse: true,
        items: items,
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    }))

    this.getParams = function() {
        var params = this._params;
        this._basic.buildParams(params);
        return params;
    }
    this.clearParams = function() {
        this._basic.clearParams();
    }

    this.getGridPanel = function() {
        var gridPanelID = "OutourcingGridPanel";
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
    }
    this.query = function(button) {
        var panel = button.panel;
        panel.getGridPanel();
        panel.getParams();

        Srims.SetQueryParams.removeNullparams(queryParams);
        panel._store.load();
    }
}
Ext.extend(Srims.common.OutsourcingInquiryPanel, Ext.Panel, {});
