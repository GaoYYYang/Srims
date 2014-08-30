/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingGridPanel_ToolBar = function(store, selection,
		queryParams, panelID) {
    this._store = store;
    this._panelID = panelID;
    this._selection = selection;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            //Srims.common.NewOutsourcing(this.store, false);
            Srims.common.showIsExistWindow(this.store);
        },
        tooltip: '<b>新建外协单位</b><br/>填写相应外协单位信息建立新的外协单位'
    });
    this._buttonIsExist = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查重',
        minWidth: 60,
        handler: function() {
            Srims.common.showIsExistWindow();
        },
        tooltip: '<b>查询欲添加的外协单位是否存在</b><br/>填写相应外协单位信息查询系统外协单位库中的外协单位'
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
            Srims.common.ShowOutsourcing(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看外协单位<b/><br/>显示所选外协单位的详细信息'
    });
    this._buttonUpFile1 = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传企业法人证书',
        minWidth: 60,
        selection: this._selection,

        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.showOutsourcingImportWindow(this.selection.getSelected(), store, '上传企业法人证书');
        },
        hidden: true,
        tooltip: '<b>上传企业法人证书<b/><br/>'
    });
    this._buttonUpFile2 = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传机构代码证',
        minWidth: 60,
        selection: this._selection,

        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.showOutsourcingImportWindow(this.selection.getSelected(), store, '上传机构代码证');
        },
        hidden: true,
        tooltip: '<b>上传机构代码证<b/><br/>'
    });
    this._buttonUpFile3 = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传税务登记证',
        selection: this._selection,
        minWidth: 60,

        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.showOutsourcingImportWindow(this.selection.getSelected(), store, '上传税务登记证');
        },
        hidden: true,
        tooltip: '<b>上传税务登记证<b/><br/>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.EditOutsourcing(this.selection.getSelected(), store, false);
        },
        hidden: true,
        tooltip: '<b>编辑</b><br/>编辑所选外协单位'
    });
    this._buttonVerfiy = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '审核',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.VerfiyOutsourcing(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>审核外协单位</b><br/>审核外协单位的名称、地址、电话、负责人、负责人邮箱等详细信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount == 0)
                return;
            Srims.common.DeleteOutsourcing(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除</b><br/>删除所选外协单位'
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
    Srims.common.OutsourcingGridPanel_ToolBar.superclass.constructor.call(this,
			{
			    items: [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonVerfiy,
						this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
			});
    // initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonVerfiy = this._buttonVerfiy;
    this._selection.buttonUpFile1 = this._buttonUpFile1;
    this._selection.buttonUpFile2 = this._buttonUpFile2;
    this._selection.buttonUpFile3 = this._buttonUpFile3;
    // 外协选择变化
    this._onSelection_selectionChange = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonVerfiy = selection.buttonVerfiy;
        var buttonUpFile1 = selection.buttonUpFile1;

        var buttonUpFile2 = selection.buttonUpFile2;

        var buttonUpFile3 = selection.buttonUpFile3;
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonVerfiy.hide();
            buttonUpFile1.hide();
            buttonUpFile2.hide();
            buttonUpFile3.hide();
            return;
        }
        var outsourcing = selection.getSelected();
        var d = outsourcing.get('hasPermission_Edit');
        buttonShow.show();



        if ((outsourcing.get('currentUserID') == outsourcing.get('userID')) || (outsourcing.get('hasPermission_Edit'))) {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);
            buttonDelete.setVisible(true);
            buttonDelete.setDisabled(false);
            buttonUpFile3.setVisible(true);
            buttonUpFile2.setVisible(true);
            buttonUpFile1.setVisible(true);

        }
        else {

            buttonEdit.setVisible(false);
            buttonEdit.setDisabled(true);
            buttonDelete.setVisible(false);
            buttonDelete.setDisabled(true);

        }
        if (outsourcing.get('hasPermission_Edit')) {
            buttonVerfiy.setVisible(true);
            buttonVerfiy.setDisabled(false);
        }
        if (outsourcing.get('isVerify') == "审核通过")   //
        {
            buttonVerfiy.hide();
            buttonUpFile1.hide();
            buttonUpFile2.hide();
            buttonUpFile3.hide();
        }
        if (outsourcing.get('companyCard'))
            buttonUpFile1.setDisabled(true);
        if (outsourcing.get('groupCard'))
            buttonUpFile2.setDisabled(true);
        if (outsourcing.get('taxCard'))
            buttonUpFile3.setDisabled(true);

        if (userIsExpert && (outsourcing.get('isVerify') == "审核驳回")) {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);        //
        }
    }
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.common.OutsourcingGridPanel_ToolBar, Ext.Toolbar);