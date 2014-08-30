
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageEditWindow_ContentForm = function(message){
    this.message = message;
    
    this._htmlEditor = new Ext.form.HtmlEditor({
        fieldLabel: '内容',
        hideLabel: true,
        value: message.get('content'),
        height: 200,
        width: 550
    })
    Srims.users.MessageEditWindow_ContentForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '内容',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._htmlEditor]
    });
    
    //method
    this.assignValues = function(){
        message.set('content', this._htmlEditor.getValue());
    }
}
Ext.extend(Srims.users.MessageEditWindow_ContentForm, Ext.form.FormPanel);
