
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelEditWindow = function(id, projectRankStore){

    this._id = id;
    
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
    
    this._projectTypeSelectForm = new Srims.documents.DocumentModelEditWindow_projectTypeSelectForm(projectRankStore);
    this._DocumentTypeSelectForm = new Srims.documents.DocumentModelEditWindow_documentTypeSelectForm();
    
    Srims.documents.DocumentModelEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目类型文档模板',
        fileUpload: true,
        width: 837,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 320,
            layout: 'form',
            autoScroll: true,
            autoHeight: true,
            items: [this._projectTypeSelectForm]
        }), new Ext.Panel({
            layout: 'form',
            autoScroll: true,
            items: [this._DocumentTypeSelectForm]
        })],
        buttons: [this._buttonUpload, this._buttonClose]
    });
    
    this._buttonUpload.window = this;
    this._buttonUpload_Click = function(){
        var projectTypesID = this.window._projectTypeSelectForm.getProjectTypeId();
        if (projectTypesID.length == 0) {
            Ext.Msg.show({
                title: '上传文档错误',
                msg: '请选择项目类型',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        var documentTypes = this.window._DocumentTypeSelectForm.getDoucumentType();
        if (documentTypes.length == 0) {
            Ext.Msg.show({
                title: '上传文档错误',
                msg: '至少需要输入一个文档类型模板',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        var saveParams = {
            projectTypesID: projectTypesID,
            documentTypes: documentTypes
        }
        this.window.formPanel = this.window._DocumentTypeSelectForm;
        Srims.documents.submitResource(this.window, saveParams, Srims.service.documents.DocumentModelService + '/UpLoadDocumentModels', '正在上传项目类型模板', '上传文项目类型模板成功', '成功上传项目类型模板')
    }
    
    this._buttonUpload.on('click', this._buttonUpload_Click);
}
Ext.extend(Srims.documents.DocumentModelEditWindow, Ext.Window)
