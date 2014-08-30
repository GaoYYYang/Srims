
if (!Srims.documents) 
    Ext.namespace("Srims.documents");

Srims.documents.DocumentModelEditWindow_documentTypeModelPanel = function(documentName){
    this._fieldDocumentName = new Ext.form.Field({
        //id: documentName,
        fieldLabel: '文档名称',
        value: documentName,
        readOnly: true,
        width: 130
    });
    this._fileUploadFieldDocument = new Srims.component.FileUploadField({
        id: documentName,
        fieldLabel: '上传模板',
        width: 160,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    Srims.documents.DocumentModelEditWindow_documentTypeModelPanel.superclass.constructor.call(this, {
        id: '_' + documentName,
        bodyStyle: 'padding:5px 0 5px 0',
        layout: 'column',
        items: [new Ext.Panel({
            labelWidth: 60,
            width: 220,
            layout: 'form',
            items: [this._fieldDocumentName]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: [this._fileUploadFieldDocument]
        })]
    })
}
Ext.extend(Srims.documents.DocumentModelEditWindow_documentTypeModelPanel, Ext.Panel, {});


