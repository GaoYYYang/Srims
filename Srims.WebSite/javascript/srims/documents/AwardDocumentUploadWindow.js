
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentUploadWindow = function(id, award, store){

    this._id = id;
    this._award = award;
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
        noticeTextType: 'AwardDocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传文档',
        width: 160,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        
        return result;
    }
    Srims.documents.AwardDocumentUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目文档',
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
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
    this._buttonUpload_click = function(){
        var window = this.window;
        
        if (!window.isValid(false)) 
            return;
        
        this.setText('正在保存');
        this.disable();
        
        var saveParams = {
            awardId: window._award.get('id'),
            name: window._comboBoxDocumentName.getValue()
        }
        
        window.formPanel = window._formPanelDocument;
        window.store = window._store;
        
        Srims.documents.submitResource(window, saveParams, Srims.service.documents.AwardDocumentService + '/UpLoad', '正在上传奖励文档', '上传文档奖励成功', '成功上传奖励文档');
    }
    this._buttonUpload.window = this;
    this._buttonUpload.on('click', this._buttonUpload_click);
}
Ext.extend(Srims.documents.AwardDocumentUploadWindow, Ext.Window, {})
