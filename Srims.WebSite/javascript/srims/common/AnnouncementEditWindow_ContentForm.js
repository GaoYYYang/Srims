
if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementEditWindow_ContentForm = function(announcement){
    this._announcement = announcement;
    
    this._textContent = new Ext.form.TextArea({
        fieldLabel: '内容',
        hideLabel: true,
        value: announcement.get('content'),
        allowBlank: false,
        height: 280,
        width: 550
    });
    Srims.common.AnnouncementEditWindow_ContentForm.superclass.constructor.call(this, {
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
    
    //method
    this.assignValues = function(){
        announcement.set('content', this._textContent.getValue());
    }
    this.isValid = function(preventMark){
        return this._textContent.isValid(preventMark);
    }
}
Ext.extend(Srims.common.AnnouncementEditWindow_ContentForm, Ext.form.FormPanel);
