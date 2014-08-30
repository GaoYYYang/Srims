
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogGridPanel_ToolBar = function(store, selection, queryParams, panelId) {
    this._store = store;
    this._panelId = panelId;
    this._selection = selection;
    this._buttonSet = new Ext.Toolbar.Button({
        iconCls: 'icon-log-Set',
        text: '日志设置',
        minWidth: 60,
        handler: function() {
            Srims.common.LogSet();
        },
        tooltip: '日志设置'
    });
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            Srims.common.showLogQueryWindow('Log_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>日志查询</b><br/>对日志信息进行复杂查询'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.showLog(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>查看日志</b><br/>显示该条日志的详细信息'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        //buttonAlign: 'center',
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新日志列表'
    });
    this._buttonRemindAndSendEmail = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '执行提醒功能',
        handler: function() {
            Ext.MessageBox.confirm('执行提醒功能', '确定执行吗，每天执行一次即可！', function(buttonId) {
                if (buttonId == 'yes') {
                    Ext.Ajax.request({
                        url: Srims.service.common.SystemSettingService + '/RemindAndSendEmail',
                        scope: this,
                        success: function(response) {
                            Ext.Msg.alert(response.responseText);
                        }
                    });
                }
            });

        },
        tooltip: '<b>执行提醒功能</b><br/>'
    });
    Srims.common.LogGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSet, this._buttonQuery, this._buttonShow, this._buttonRemindAndSendEmail, this._buttonRefresh]
    });
}
Ext.extend(Srims.common.LogGridPanel_ToolBar, Ext.Toolbar);
