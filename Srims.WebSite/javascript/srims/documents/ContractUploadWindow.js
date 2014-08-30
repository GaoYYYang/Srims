
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractUploadWindow = function(id, project, store, isMain){

    this._id = id;
    this._project = project;
    this._store = store;
    this._isMain = isMain;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid(false)) 
                return false;
            
            var saveParams = {
                projectId: window._project.get('id'),
                contractType: window._isMain ? Srims.documents.ContractType.MainContract : Srims.documents.ContractType.OutContract
            }
            
            window.formPanel = window._formPanelContract;
            window.store = window._store;
            
            Srims.documents.submitResource(window, saveParams, Srims.service.documents.ContractService + '/UpLoad', '正在上传项目合同', '上传合同成功', '成功上传项目：' + window._project.get('name') + '的合同');
        }
    });
    this._fieldContractType = new Ext.form.Field({
        fieldLabel: '合同类型',
        value: this._isMain ? '主合同' : '外协合同',
        readOnly: true,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadContract',
        fieldLabel: '上传合同',
        width: 160,
        emptyText: '请选择要上传的合同',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelContract = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fieldContractType, this._fileUploadField]
    });
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        
        return result;
    }
    
    Srims.documents.ContractUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目合同',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelContract],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.documents.ContractUploadWindow, Ext.Window, {});
