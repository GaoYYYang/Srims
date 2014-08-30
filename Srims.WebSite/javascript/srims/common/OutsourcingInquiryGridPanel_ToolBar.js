/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingInquiryGridPanel_ToolBar = function(store, selection,
		queryParams, panelID) {
    this._store = store;
    this._panelID = panelID;
    this._selection = selection;

    this._buttonVerfiy = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.InquiryOneOutsourcing(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看外协单位</b><br/>查看外协单位的名称等详细信息'
    });

    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新外协单位列表'
    });
    Srims.common.OutsourcingInquiryGridPanel_ToolBar.superclass.constructor.call(this,
			{
			    items: [this._buttonVerfiy, new Ext.Toolbar.Fill(), this._buttonRefresh]
			});
    // initial

    this._selection.buttonVerfiy = this._buttonVerfiy;

    // 外协选择变化
    this._onSelection_selectionChange = function(selection) {

        var buttonVerfiy = selection.buttonVerfiy;

        if (selection.getCount() == 0) {

            buttonVerfiy.hide();

            return;
        }
        var outsourcing = selection.getSelected();

        if (outsourcing.get('hasPermission_Edit')) {
            buttonVerfiy.setVisible(true);
            buttonVerfiy.setDisabled(false);
        }


    }
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.common.OutsourcingInquiryGridPanel_ToolBar, Ext.Toolbar);