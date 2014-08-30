
if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementShowWindow_ContentForm = function(announcement){
    this._announcement = announcement;
    
    this._textContent = new Ext.form.TextArea({
        fieldLabel: '内容',
        hideLabel: true,
        scroll: true,
        value: announcement.get('content'),
        readOnly: true,
        height: 220,
        width: 550
    });
    Srims.common.AnnouncementShowWindow_ContentForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '内容',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textContent]
    });
}
Ext.extend(Srims.common.AnnouncementShowWindow_ContentForm, Ext.form.FormPanel);
