
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffStampEditWindow = function(id, stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore){

    this._id = id;
    this._stuffStamp = stuffStamp;
    this._stuff = stuff;
    this._stuffStore = stuffStore;
    this._stampApplication = stampApplication;
    this._store = store;
    this._stampApplicationStore = stampApplicationStore;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    
    this._numberFieldNumber = new Ext.form.NumberField({
        fieldLabel: '盖章数量',
        value: this._stuffStamp.get('number'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    ///待修改
    this._comboBoxStampTypes = new Srims.component.EntityComboBox({
        fieldLabel: '图章类型',
        value: this._stuffStamp.get('type'),
        store: new Srims.stamp.StampStore(Srims.service.stamp.StampService + '/Query'),
        entityId: this._stuffStamp.get('stampID'),
        displayField: 'type',
        editable: true,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    var Items = [this._comboBoxStampTypes, this._numberFieldNumber];
    
    Srims.stamp.StuffStampEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: stuffStamp.isNew() ? '新建文件用印信息' : '编辑文件用印信息',
        iconCls: stuffStamp.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        result = this._comboBoxStampTypes.isValid(preventMark) && result;
        result = this._numberFieldNumber.isValid(preventMark) && result;
        return result;
    }
    this._assignValues = function(){
        this._stuffStamp.set("number", this._numberFieldNumber.getValue());
        this._stuffStamp.set("stampID", this._comboBoxStampTypes.getValue());
        this._stuffStamp.set("stuffID", this._stuff.get('id'));
    }
    this._save = function(){
        var stuffStamp = this._stuffStamp;
        stuffStamp.beginEdit();
        this._assignValues();
        stuffStamp.commit();
        
        Ext.Ajax.request({
            url: Srims.service.stamp.StuffStampService + '/Save',
            params: stuffStamp.data,
            scope: this,
            success: function(){
                this._store.load();
                this._stuffStore.load();
                if (this._stampApplicationStore) 
                    this._stampApplicationStore.load();
                var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.stamp.showStampApplication(stampApplication, stampApplicationStore);
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.stamp.StuffStampEditWindow, Ext.Window, {});
