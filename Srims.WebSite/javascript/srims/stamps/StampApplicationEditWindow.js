
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditWindow = function(id, stampApplication, store){

    this._id = id;
    this._stampApplication = stampApplication;
    this._store = store;
    
    var isNew = this._stampApplication.isNew();
    this._title = this._stampApplication.isNew() ? "文印申请" : "编辑文印";
    
    this._formPanelBasic = new Srims.stamp.StampApplicationEditWindow_InforForm(this._stampApplication);
    
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    
    Srims.stamp.StampApplicationEditWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 224,
        width: 650,
        buttonAlign: 'center',
        title: this._title,
        iconCls: stampApplication.isNew() ? 'icon-new' : 'icon-edit',
        items: [this._formPanelBasic],
        buttons: [this._buttonSave]
    });
    
    this.assginValues = function(){
        this._formPanelBasic.assginValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelBasic.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var stampApplication = this._stampApplication;
        stampApplication.beginEdit();
        this.assginValues();
        stampApplication.commit();
        Ext.Ajax.request({
            url: Srims.service.stamp.StampApplicationService + '/Save',
            params: stampApplication.data,
            scope: this,
            success: function(response){
            
                Srims.WorkSpace.getWorkSpace().remove(this);
                if (store) 
                    store.load();
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.stamp.StampApplicationXmlReader()
                });
                var newStampApplication = newstore.getAt(0);
                if (!isNew) {
                    var panelId = 'StampApplicationShowPanel' + newStampApplication.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.stamp.showStampApplication(newStampApplication, store);
            }
        });
    }
    this._onButonSave_Click = function(button, e){
        var panel = button.panel;
        
        if (!panel.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButonSave_Click);
}
Ext.extend(Srims.stamp.StampApplicationEditWindow, Ext.Window, {});
