
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelUploadWindow = function(id, projectTypeId, store){

    this._id = id;
    this._projectTypeId = projectTypeId;
    this._store = store;
    
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
        
        }
    });
    
    this._comboBoxDocumentName = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文档名称',
        noticeTextType: 'DocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._comboBoxDocumentName.getStore().on('load', function(){
        var outerContract = new Srims.common.NoticeText({
            value: '外协合同'
        });
        this.insert(0, outerContract);
        
        var mainContract = new Srims.common.NoticeText({
            value: '主合同'
        });
        this.insert(0, mainContract);
    })
    
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocumentModel',
        fieldLabel: '上传文档模板',
        width: 160,
        emptyText: '请选择要上传的文档模板',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocumentModel = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    
    Srims.documents.DocumentModelUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传文档模板',
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        height: 170,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocumentModel],
        buttons: [this._buttonUpload, this._buttonClose]
    });
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        result = this._fileUploadField.isValid(preventMark) && result;
        
        return result;
    }
    this._buttonUpload_click = function(){
        var window = this.window;
        
        if (!window.isValid(false)) 
            return;
        
        // this.setText('正在保存');
        // this.disable();
        
        var saveParams = {
            projectTypeId: window._projectTypeId,
            DocumentType: window._comboBoxDocumentName.getValue()
        }
        
        window.formPanel = window._formPanelDocumentModel;
        window.store = window._store;
        
        Srims.documents.submitResource(window, saveParams, Srims.service.documents.DocumentModelService + '/UpLoadDocumentModel', '正在上传文档模板', '上传文档模板成功', '成功上传文档模板');
    }
    this._buttonUpload.window = this;
    this._buttonUpload.on('click', this._buttonUpload_click);
}
Ext.extend(Srims.documents.DocumentModelUploadWindow, Ext.Window, {})
