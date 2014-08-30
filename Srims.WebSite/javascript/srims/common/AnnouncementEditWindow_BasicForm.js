
if (!Srims.common) 
    Ext.namespace('Srims.common');
	
	Srims.common.AnnouncementEditWindow_BasicForm = function(announcement){
    this._announcement = announcement;

    this._textFieldTitle = new Ext.form.TextField({
        fieldLabel: '通知标题',
        value: announcement.get('title'),
        allowBlank: false,
        width: 465
    });
    this._comboBoxState = new Ext.form.ComboBox({
        fieldLabel: '通知状态',
        value: announcement.get('state'),
        store: Srims.common.AnnouncementState.editStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    
    Srims.common.AnnouncementEditWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldTitle, this._comboBoxState]
    });
    //method
    this.assignValues = function(){
        this._announcement.set('title', this._textFieldTitle.getValue());
        this._announcement.set('state', this._comboBoxState.getValue());
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldTitle.isValid(preventMark) && result;
        result = this._comboBoxState.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.common.AnnouncementEditWindow_BasicForm, Ext.form.FormPanel);
