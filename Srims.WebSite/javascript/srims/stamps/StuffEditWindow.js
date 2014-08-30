
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffEditWindow = function(id, stuff, stampApplication, store, stampApplicationStore){

    this._id = id;
    this._stuff = stuff;
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
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '文件名称',
        value: this._stuff.get('stuffName'),
        allowBlank: false,
        width: 160
    });
    this._comboBoxStuffTypes = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文件类型',
        value: this._stuff.get('stuffType'),
        displayField: 'name',
        noticeTextType: 'StuffType',
        editable: true,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    
    this._textFieldStuffType = new Ext.form.TextField({
        fieldLabel: '文件类型',
        value: this._stuff.get('stuffType'),
        allowBlank: false,
        disabled: true,
        width: 160
    });
    var Items = [this._textFieldName, this._comboBoxStuffTypes, this._textFieldStuffType];
    
    Srims.stamp.StuffEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: stuff.isNew() ? '新建用印文件信息' : '编辑用印文件信息',
        iconCls: stuff.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 170,
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
    
    this.validTextField = function(textField){
        if (textField.getValue() && textField.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: textField.fieldLabel + '错误',
                msg: '您输入的值只有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
        
    }
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldName.isValid(preventMark) && result;
        result = this._textFieldStuffType.isValid(preventMark) && result;
        result = this._comboBoxStuffTypes.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        result = this.validTextField(this._textFieldStuffType) && result;
        return result;
    }
    this._assignValues = function(){
        this._stuff.set("stuffName", this._textFieldName.getValue());
        this._stuff.set("stuffType", this._textFieldStuffType.getValue());
        this._stuff.set("stampApplicationID", this._stampApplication.get('id'));
    }
    this._setTextFieldStuffType = function(){
        if (this._comboBoxStuffTypes.getValue() == '其他') {
            this._textFieldStuffType.enable();
            this._textFieldStuffType.setValue('');
        }
        else {
            this._textFieldStuffType.disable();
            this._textFieldStuffType.setValue(this._comboBoxStuffTypes.getValue());
        }
    }
    this._comboBoxStuffTypes.panel = this;
    this._comboBoxStuffTypes.on('select', function(){
        var panel = this.panel;
        panel._setTextFieldStuffType();
    });
    this._save = function(){
        var stuff = this._stuff;
        stuff.beginEdit();
        this._assignValues();
        stuff.commit();
        
        Ext.Ajax.request({
            url: Srims.service.stamp.StuffService + '/Save',
            params: stuff.data,
            scope: this,
            success: function(){
                this._store.load();
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
Ext.extend(Srims.stamp.StuffEditWindow, Ext.Window, {});
