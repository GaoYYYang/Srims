
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectGridPanel_ToolBar = function(gridPanel, panelId, queryParams) {

    //fields
    this._gridPanel = gridPanel;
    this._isHorizontal = gridPanel._isHorizontal;
    this._selection = gridPanel._selection;
    this._store = gridPanel._projectStore;
    this._projectState = gridPanel._projectSate;
    this._expertAttendType = gridPanel._expertAttendType;
    this._panelId = panelId;
    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.projects.showRecoveryImportWindow(this.store);
        },
        tooltip: '<b>项目导入</b><br/>将项目从excel表导入到数据库中'
    });
    this._buttonMark = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '添加间接费用调整备注',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            else {
                if (this.selection.getSelected().get('isPrint') == "已打印") {
                    Ext.Msg.show({
                        title: '不能打印',
                        msg: '本间接费用调整单已打印。',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else
                    Srims.projects.showRecoveryProject(this.selection.getSelected());
            }

        },
        hidden: false,
        tooltip: '<b>请选择一条，添加间接费用调整单备注、是否手动修改等</b><br/>对选中的间接费用调整单描述详细信息'
    });

    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        hidden: false,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            else {
                if (this.selection.getSelected().get('isPrint') == "已打印") {
                    Ext.Msg.show({
                        title: '不能打印',
                        msg: '本间接费用调整单已打印。',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    title = '打印间接费用调整单';
                    message = '你确定要打印这张间接费用调整单吗？';
                    action = 'print';
                    methodName = '/RecoveryPrint';
                    Srims.projects.printRecovery(this.selection.getSelected(), this.store, title, message, action, methodName);
                }
            }
        },
        tooltip: '<b>打印间接费用调整单</b>'
    });
    this._buttonResetPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print-reset',
        text: '重置打印',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: false,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            else {
                if (this.selection.getSelected().get('isPrint') == "未打印") {
                    Ext.Msg.show({
                        title: '未打印',
                        msg: '本间接费用调整单未打印。',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    title = '重置打印';
                    message = '你确定要重置打印这张间接费用调整单吗？';
                    action = '';
                    methodName = '/RecoveryResetPrint';
                    Srims.projects.printRecovery(this.selection.getSelected(), this.store, title, message, action, methodName);
                }
            }

        },
        tooltip: '<b>重置打印</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看项目',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showProject_Recovery(this.selection.getSelected());
        },
        hidden: false,
        tooltip: '<b>查看项目</b><br/>显示所选项目的详细信息'
    });


    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新间接费用调整单列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = [];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
            //清空筛选条件
            var filters = Ext.getCmp(this._panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var buttonItems;
    if (user.userRoleType == 'Expert')
        buttonItems = [this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh];
    else
    buttonItems = [this._buttonImport, this._buttonMark, this._buttonPrint, this._buttonResetPrint, this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh];

    Srims.projects.RecoveryProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });


    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var project = selection.getSelected();
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.RecoveryProjectGridPanel_ToolBar, Ext.Toolbar);
