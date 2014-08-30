
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberGridPanel_ToolBar = function(selection, store, stampApplicationType, sign) {

    //fields
    this._selection = selection;
    this._store = store;
    this._stampApplicationType = stampApplicationType;
    this._sign = sign;

    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        sign: this._sign,
        stampApplicationType: this._stampApplicationType,
        handler: function() {
            Srims.stamp.StampApplicationTypeAction.newStampAdminMember(this.stampApplicationType, this.store, this.sign);
        },
        
        tooltip: '<b>新建一级审核管理员</b>'
    });
    //    this._buttonEdit = new Ext.Toolbar.Button({
    //        iconCls: 'icon-edit',
    //        text: '编辑',
    //        minWidth: 60,
    //        selection: this._selection,
    //        store: this._store,
    //        project: this._stampApplicationType,
    //        handler: function() {
    //            if (this.selection.getCount() == 0)
    //                return;
    //            Srims.stamp.editStampAdminMember(this.stampApplicationType, this.selection.getSelected(), this.store);
    //        },
    //        hidden: true,
    //        tooltip: '<b>编辑项目成员</b>'
    //    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        sign: this._sign,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除该文印申请类型一级审核管理员', '你确定要删除这个文印申请类型的一级审核管理员吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.ID = this.selection.getSelected().get('id');
                    if (this.sign) {
                        Ext.Ajax.request({
                            url: Srims.service.stamp.StampFirstAdminService + '/Delete',
                            params: _params,
                            scope: this,
                            success: function() {
                                this.store.load();
                            }
                        });
                    }
                    else {
                        Ext.Ajax.request({
                            url: Srims.service.stamp.StampSecondAdminService + '/Delete',
                            params: _params,
                            scope: this,
                            success: function() {
                                this.store.load();
                            }
                        });
                    }
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>编辑一级审核管理员</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        stampApplicationType: this._stampApplicationType,
        handler: function() {
            this.store = new Srims.stamp.StampAdminMemberStore(stampApplicationType);
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新一级审核管理员列表'
    });
    Srims.stamp.StampAdminMemberGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonDelete, this._buttonRefresh]
    });


  
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        this._selection = selection;
       
        var buttonDelete = this._selection.buttonDelete;

        if (this._selection.getCount() == 0) {
           
            buttonDelete.hide();
            return;
        }
        buttonDelete.show();
       
    }

    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StampAdminMemberGridPanel_ToolBar, Ext.Toolbar);
