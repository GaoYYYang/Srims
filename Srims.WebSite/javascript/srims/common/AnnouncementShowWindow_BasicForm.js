
if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementShowWindow_BasicForm = function(announcement){
    this._announcement = announcement;
    
    this._textFieldTitle = new Ext.form.TextField({
        fieldLabel: '标题',
        value: announcement.get('title'),
        readOnly: true,
        width: 465
    });
    this._textFieldUserName = new Ext.form.TextField({
        fieldLabel: '作者',
        value: announcement.get('userName'),
        readOnly: true,
        width: 120
    })
    this._textFieldData = new Ext.form.TextField({
        fieldLabel: '日期',
        value: Date.render(announcement.get('dateTime')),
        readOnly: true,
        width: 120
    })
    this._textFieldState = new Ext.form.TextField({
        fieldLabel: '状态',
        value: Srims.common.AnnouncementState.render(announcement.get('state')),
        readOnly: true,
        width: 120
    })
    
    Srims.common.AnnouncementShowWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 40,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldTitle, this._textFieldUserName, this._textFieldData, this._textFieldState]
    });
}
Ext.extend(Srims.common.AnnouncementShowWindow_BasicForm, Ext.form.FormPanel);
