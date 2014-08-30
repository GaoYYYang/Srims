
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampEditWindow = function(id, stamp, store){

    this._id = id;
    this._stamp = stamp;
    this._store = store;
    
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
    
    this._textFieldType = new Ext.form.TextField({
        fieldLabel: '图章类型',
        value: this._stamp.get('type'),
        allowBlank: false,
        width: 160
    });
    this._comboBoxOwner = new Srims.component.UserSearch.SearchComboBox({
        fieldLabel: '拥有者',
        value: this._stamp.get('owner'),
        selectEntityId: this._stamp.get('ownerID'),
        editable: true,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 300,
        width: 178
    });
    var Items = [this._textFieldType, this._comboBoxOwner];
    
    Srims.stamp.StampEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: stamp.isNew() ? '新建图章信息' : '编辑图章信息',
        iconCls: stamp.isNew() ? 'icon-new' : 'icon-edit',
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
    
    this.validTextField = function(textField){
        if (textField.getValue() && String.Trim(textField.getValue()).length == 0) {
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
    this._validateType = function(){
        var stamps = this._store.getRange();
        var type = String.Trim(this._textFieldType.getValue());
        
        for (var i = 0; i < stamps.length; i++) {
            if (this._stamp == stamps[i]) 
                continue;
            
            if (type == stamps[i].get('type')) {
                Ext.Msg.show({
                    title: '印章类型已存在',
                    msg: '印章类型不能重复，请重新输入',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldType.isValid(preventMark) && result;
        result = this._comboBoxOwner.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldType) && result;
        result = this._validateType() && result;
        return result;
    }
    this._assignValues = function(){
        this._stamp.set("type", String.Trim(this._textFieldType.getValue()));
        this._stamp.set("ownerID", this._comboBoxOwner.getValue());
    }
    
    this._save = function(){
        var stamp = this._stamp;
        stamp.beginEdit();
        this._assignValues();
        stamp.commit();
        
        Ext.Ajax.request({
            url: Srims.service.stamp.StampService + '/Save',
            params: stamp.data,
            scope: this,
            success: function(){
                this._store.load();
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
Ext.extend(Srims.stamp.StampEditWindow, Ext.Window, {})
