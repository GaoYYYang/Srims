
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationEditPanel_StuffGridForm = function(stampApplication, stampApplicationStore, stuffStore, isforStampApplicationEditPanel){

    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    
    this._stuffGridPanel = new Srims.stamp.StuffGridPanel(this._stampApplication, this._stampApplicationStore, stuffStore, isforStampApplicationEditPanel);
    
    Srims.stamp.StampApplicationEditPanel_StuffGridForm.superclass.constructor.call(this, {
        title: '材料列表',
        widht: 500,
        //Height: 380,
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._stuffGridPanel]
    });
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffGridForm, Ext.Panel, {});
