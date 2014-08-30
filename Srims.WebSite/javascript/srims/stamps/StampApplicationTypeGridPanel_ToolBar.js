
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;

  //  var user = Srims.currentLoginLog.user;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.stamp.StampApplicationTypeAction.newStampApplicationType();
        },
        tooltip: '<b>新建文印申请类型</b><br/>输入新建的文印申请类型的信息'
    });
   
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.StampApplicationTypeAction.editStampApplicationType(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑文印申请类型</b><br/>编辑所选文印申请类型'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除文印申请类型', '你确定要删除这个文印申请类型吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.id = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.stamp.StampApplicationTypeService + '/Delete',
                        scope: this,
                        params: _params,
                        success: function() {
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel)
                                panel.getStampApplicationTypeStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文印申请类型</b><br/>删除所选文印申请类型'
    });
    this._buttonFirstAdmin = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '编辑一级审核管理员',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.StampApplicationTypeAction.showFirstAdminWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑一级审核管理员</b><br/>编辑选中文印申请类型的一级审核管理员'
    });
    this._buttonSecondAdmin = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '编辑二级审核管理员',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.StampApplicationTypeAction.showSecondAdminWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑二级审核管理员</b><br/>编辑选中文印申请类型的二级审核管理员'
    });

    Srims.stamp.StampApplicationTypeGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonFirstAdmin, this._buttonSecondAdmin]
    });

    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonFirstAdmin = this._buttonFirstAdmin;
    this._selection.buttonSecondAdmin = this._buttonSecondAdmin;

    //event methods
    this._onSelection_selectionChange = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonFirstAdmin = selection.buttonFirstAdmin;
        var buttonSecondAdmin = selection.buttonSecondAdmin;

        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            buttonFirstAdmin.hide();
            buttonSecondAdmin.hide();
            return;
        }

        var stampApplicationType = selection.getSelected();


        buttonDelete.setDisabled(!stampApplicationType.get('can_Delete'));
        
        buttonDelete.show();
        buttonEdit.show();
        buttonFirstAdmin.show();
        buttonSecondAdmin.show();


    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.stamp.StampApplicationTypeGridPanel_ToolBar, Ext.Toolbar);
