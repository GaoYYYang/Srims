
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageShowWindow_ContentForm = function(message){
    this._message = message;
    
    this._labelContent = new Ext.form.Label({
        scroll: true,
        html: message.get('content'),
        width: 550
    })
    Srims.users.MessageShowWindow_ContentForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '内容',
        height: 200,
        autoScroll: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._labelContent]
    });
}
Ext.extend(Srims.users.MessageShowWindow_ContentForm, Ext.form.FormPanel);
