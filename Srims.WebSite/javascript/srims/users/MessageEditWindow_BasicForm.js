
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageEditWindow_BasicForm = function(message){
    this.message = message;
    
    this._comboBoxReceiver = new Srims.component.UserSearch.SearchComboBox({
        fieldLabel: '收信人',
        value: message.get('receiver'),
        selectEntityId: message.get('receiverID'),
        allowBlank: false,
        width: 160
    })
    this._textFieldTitle = new Ext.form.TextField({
        fieldLabel: '标题',
        value: message.get('title'),
        allowBlank: false,
        width: 465
    });
    Srims.users.MessageEditWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._comboBoxReceiver, this._textFieldTitle]
    });
    //method
    this.assignValues = function(){
        this.message.set('receiver', this._comboBoxReceiver.getText());
        this.message.set('receiverID', this._comboBoxReceiver.getValue());
        this.message.set('title', this._textFieldTitle.getValue());
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldTitle.isValid(preventMark) && result;
        result = this._comboBoxReceiver.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.users.MessageEditWindow_BasicForm, Ext.form.FormPanel);

