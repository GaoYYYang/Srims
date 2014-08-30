
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;

    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.stamp.StampApplicationTypeAction.newStampApplicationTypeGroup();
        },
        tooltip: '<b>新建文印申请类型组</b><br/>输入新建的文印申请类型组的信息'
    });

    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.StampApplicationTypeAction.editStampApplicationTypeGroup(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑文印申请类型组</b><br/>编辑所选文印申请类型组的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除文印申请类型组', '你确定要删除这个文印申请类型组吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.id = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.stamp.StampApplicationTypeGroupService + '/Delete',
                        scope: this,
                        params: _params,
                        success: function() {
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel)
                                panel.getStampApplicationTypeGroupStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文印申请类型组</b><br/>删除所选文印申请类型组的信息'
    });


    Srims.stamp.StampApplicationTypeGroupGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonDelete, this._buttonEdit]
    });

    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChange = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;


        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonEdit.hide();
            return;
        }

        var stampApplicationTypeGroup = selection.getSelected();
        buttonDelete.setDisabled(!stampApplicationTypeGroup.get('can_Delete'));
        buttonDelete.show();
        buttonEdit.show();
      
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.stamp.StampApplicationTypeGroupGridPanel_ToolBar, Ext.Toolbar);
