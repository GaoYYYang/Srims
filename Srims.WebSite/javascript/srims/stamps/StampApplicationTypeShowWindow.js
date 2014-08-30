
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');
Srims.stamp.StampApplicationTypeShowWindow = function(id, stampApplicationType) {
    //field
    this._stampApplicationType = stampApplicationType;
    this._id = id;
    this._title = stampApplicationType.get('name');

    //controls
    //this._formPanelBasic = new Srims.stamp.StampApplicationTypeShowWindow_BasicForm(this._stampApplicationType);

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: stampApplicationType.get('name'),
        readOnly: true,
        width: 120
    });
    this._textFieldFirstName = new Ext.form.TextField({
        fieldLabel: '对应组',
        value: stampApplicationType.get('stampApplicationTypeGroup'),
        readOnly: true,
        width: 120
    });
    this._textFieldTwice = new Ext.form.TextField({
        fieldLabel: '是否二次审核',
        value: stampApplicationType.get('isTwiceCancer'),
        readOnly: true,
        width: 60
    });
    this._textFieldProject = new Ext.form.TextField({
        fieldLabel: '是否项目相关',
        value: stampApplicationType.get('isProjectRelated'),
        readOnly: true,
        width: 60
    });

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    })

    //constructor
    Srims.stamp.StampApplicationTypeShowWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 300,
        height: 185,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        closeAction: 'hide',
        buttonAlign: 'center',
        title: '文印申请类型详细信息',
        resizable: false,
        modal: true,
        iconCls: 'icon-announcement-show',
        items: [this._textFieldFirstName, this._textFieldName, this._textFieldTwice, this._textFieldProject],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.stamp.StampApplicationTypeShowWindow, Ext.Window);

