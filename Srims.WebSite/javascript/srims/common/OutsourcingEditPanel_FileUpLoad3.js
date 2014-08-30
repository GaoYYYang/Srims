
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.DocumentUploadWindow3 = function(id, outsourcing, store) {

    this._id = id;
    this._outsourcing = outsourcing;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
            projectId: window._outsourcing.get('id')
            }

            window.formPanel = window._formPanelDocument;
            window.store = window._store;

            Srims.documents.submitResource(window, saveParams, Srims.service.common.OutsourcingService + '/Import', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._outsourcing.get('name') + '的文档')
        }
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传税务登记证',
        width: 360,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 100,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fileUploadField]
    });
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        return result;
    }
    Srims.common.DocumentUploadWindow3.superclass.constructor.call(this, {
        id: this._id,
        title: '上传税务登记证',
        fileUpload: true,
        width: 510,
        labelWidth: 100,
        height: 120,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.common.DocumentUploadWindow3, Ext.Window, {})
