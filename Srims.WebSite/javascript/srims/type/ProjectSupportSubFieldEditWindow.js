
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportSubFieldEditWindow = function(id, projectSupportSubField, store, projectSupportField, projectSupportFieldStore, projectType, projectTypeStore){

    this._id = id;
    this._projectSupportSubField = projectSupportSubField;
    this._store = store;
    this._projectSupportField = projectSupportField;
    this._projectSupportFieldStore = projectSupportFieldStore;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
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
        fieldLabel: '子领域名称',
        value: this._projectSupportSubField.get('name'),
        allowBlank: false,
        width: 160
    });
    
    var Items = [this._textFieldName];
    
    Srims.type.ProjectSupportSubFieldEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectSupportSubField.isNew() ? '新建项目资助子领域信息' : '编辑项目资助子领域信息',
        iconCls: projectSupportSubField.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 80,
        height: 114,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.validTextField = function(textField){
        if (textField.getValue().trim().length == 0) {
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
        result = this.validTextField(this._textFieldName) && result;
        return result;
    }
    this._assignValues = function(){
        this._projectSupportSubField.set("name", this._textFieldName.getValue());
        this._projectSupportSubField.set("projectSupportFiledID", this._projectSupportField.get('id'));
    }
    this._save = function(){
        var projectSupportSubField = this._projectSupportSubField;
        projectSupportSubField.beginEdit();
        this._assignValues();
        projectSupportSubField.commit();
        
        Ext.Ajax.request({
            url: Srims.service.type.ProjectSupportSubFieldService + '/Save',
            params: projectSupportSubField.data,
            scope: this,
            success: function(){
                this._store.load({
                    params: {
                        projectSupportFieldID: projectSupportField.get('id')
                    }
                });
                this._projectSupportFieldStore.load({
                    params: {
                        projectTypeID: projectType.get('id')
                    }
                });
                this._projectTypeStore.load();
                var panelId = "ProjectTypeShowPanel" + projectType.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.type.showProjectType(projectType, this._projectTypeStore);
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
Ext.extend(Srims.type.ProjectSupportSubFieldEditWindow, Ext.Window, {})
