
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentWindow_RequireMessage = function(){
    Srims.documents.DocumentWindow_RequireMessage.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        html: '<span style="color:#FF0000">注意：如果文档状态是‘未提交’，说明您有被催缴上传的文档，请及时上传！</span>'
    });
}
Ext.extend(Srims.documents.DocumentWindow_RequireMessage, Ext.Panel);
