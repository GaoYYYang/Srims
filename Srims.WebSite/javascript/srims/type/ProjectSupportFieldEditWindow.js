
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportFieldEditWindow = function(id, projectSupportField, projectType, store, projectTypeStore){

    this._id = id;
    this._projectSupportField = projectSupportField;
    this._projectType = projectType;
    this._store = store;
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
        fieldLabel: '领域名称',
        value: this._projectSupportField.get('name'),
        allowBlank: false,
        width: 160
    });
    
    var Items = [this._textFieldName];
    
    Srims.type.ProjectSupportFieldEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectSupportField.isNew() ? '新建项目资助领域信息' : '编辑项目资助领域信息',
        iconCls: projectSupportField.isNew() ? 'icon-new' : 'icon-edit',
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
        this._projectSupportField.set("name", this._textFieldName.getValue());
        this._projectSupportField.set("projectTypeID", this._projectType.get('id'));
    }
    this._save = function(){
        var projectSupportField = this._projectSupportField;
        projectSupportField.beginEdit();
        this._assignValues();
        projectSupportField.commit();
        
        Ext.Ajax.request({
            url: Srims.service.type.ProjectSupportFieldService + '/Save',
            params: projectSupportField.data,
            scope: this,
            success: function(){
                this._store.load({
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
Ext.extend(Srims.type.ProjectSupportFieldEditWindow, Ext.Window, {})
