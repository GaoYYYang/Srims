
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberWindow = function(id, stampApplicationType, title, sign) {

    this._id = id;
    this._sign = sign;
    this._title = title;
    this._stampApplicationType = stampApplicationType;
    if (this._sign) {
        this._stampAdminMemberGridPanel = new Srims.stamp.StampAdminMemberGridPanel(this._stampApplicationType,this._sign);
    }
    else {
        this._stampAdminMemberGridPanel = new Srims.stamp.StampAdminMemberGridPanel(this._stampApplicationType,this._sign);
    }

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    Srims.stamp.StampAdminMemberWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '文印申请类型“' + this._stampApplicationType.get('name') + '“' + this._title,
        iconCls: 'icon-project-member-manage',
        width: 500,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        resizable: false,
        modal: true,
        items: [this._stampAdminMemberGridPanel],
        buttons: [this._buttonClose]
    });
    this._stampAdminMemberGridPanel.getStore().load();
    //    this.hideWindow = function() {
    //        var panel = Ext.getCmp(Srims.stamp.Panel_ShowProject_ID + project.get('id'));
    //        if (panel)
    //            panel._formPanelMember._store.load();
    //    }
    //    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.stamp.StampAdminMemberWindow, Ext.Window, {});



