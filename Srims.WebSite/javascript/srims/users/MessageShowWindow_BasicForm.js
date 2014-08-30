
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageShowWindow_BasicForm = function(message){
    this._message = message;
    
    this._textFieldTitle = new Ext.form.TextField({
        fieldLabel: '标题',
        value: message.get('title'),
        readOnly: true,
        width: 465
    })
    this._textFieldSender = new Ext.form.TextField({
        fieldLabel: '发信人',
        value: message.get('sender'),
        readOnly: true,
        width: 120
    })
    this._textFieldData = new Ext.form.TextField({
        fieldLabel: '日期',
        value: Date.render(message.get('dateTime')),
        readOnly: true,
        width: 120
    })
    this._textFieldIsRead = new Ext.form.TextField({
        fieldLabel: '是否已读',
        value: Boolean.render(message.get('isRead')),
        readOnly: true,
        width: 120
    })
    Srims.users.MessageShowWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldTitle, this._textFieldSender, this._textFieldData, this._textFieldIsRead]
    });
}
Ext.extend(Srims.users.MessageShowWindow_BasicForm, Ext.form.FormPanel);
