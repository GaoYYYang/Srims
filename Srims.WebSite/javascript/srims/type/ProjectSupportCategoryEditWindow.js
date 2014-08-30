
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportCategoryEditWindow = function(id, projectSupportCategory, projectType, store, projectTypeStore){

    this._id = id;
    this._projectSupportCategory = projectSupportCategory;
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
        fieldLabel: '类别名称',
        value: this._projectSupportCategory.get('name'),
        allowBlank: false,
        width: 160
    });
    this._checkBoxIsGetOverheadExpense = new Ext.form.Checkbox({
        fieldLabel: '是否收取管理费',
        checked: this._projectSupportCategory.get('isGetOverheadExpense')
    });
    var Items = [this._textFieldName, this._checkBoxIsGetOverheadExpense];
    
    Srims.type.ProjectSupportCategoryEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectSupportCategory.isNew() ? '新建项目资助类别信息' : '编辑项目资助类别信息',
        iconCls: projectSupportCategory.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 135,
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
        this._projectSupportCategory.set("name", this._textFieldName.getValue());
        this._projectSupportCategory.set("isGetOverheadExpense", this._checkBoxIsGetOverheadExpense.checked ? "true" : "false");
        this._projectSupportCategory.set("projectTypeID", this._projectType.get('id'));
    }
    this._save = function(){
        var projectSupportCategory = this._projectSupportCategory;
        projectSupportCategory.beginEdit();
        this._assignValues();
        projectSupportCategory.commit();
        
        Ext.Ajax.request({
            url: Srims.service.type.ProjectSupportCategoryService + '/Save',
            params: projectSupportCategory.data,
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
Ext.extend(Srims.type.ProjectSupportCategoryEditWindow, Ext.Window, {})

