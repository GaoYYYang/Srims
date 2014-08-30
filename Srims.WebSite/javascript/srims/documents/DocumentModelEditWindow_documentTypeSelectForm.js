
if (!Srims.documents) 
    Ext.namespace("Srims.documents");

Srims.documents.DocumentModelEditWindow_documentTypeSelectForm = function(projectRankStore){

    this._panelMainContract = new Srims.documents.DocumentModelEditWindow_documentTypeModelPanel('主合同');
    this._panelOutContract = new Srims.documents.DocumentModelEditWindow_documentTypeModelPanel('外协合同');
    
    this._documentTypeStore = new Srims.common.NoticeTextStore(Srims.service.common.NoticeTextService + '/Get', 'DocumentName');
    
    this._documentTypeStore.form = this;
    this._documentTypeStore.on('load', function(){
        for (var i = 0; i < this.getCount(); i++) 
            this.form.items.add(this.form.items.length, new Srims.documents.DocumentModelEditWindow_documentTypeModelPanel(this.getAt(i).get('value')));
        
        this.form.doLayout();
    })
    
    var items = [this._panelMainContract, this._panelOutContract]
    
    Srims.documents.DocumentModelEditWindow_documentTypeSelectForm.superclass.constructor.call(this, {
        fileUpload: true,
        bodyStyle: 'padding:0 0 0 10px',
        title: '上传合同及文档模板',
        width: 500,
        height: 537,
        layout: 'form',
        frame: true,
        items: items
    });
    
    this.getDoucumentType = function(){
        var documentTypes = '';
        var items = this.items.getRange();
        for (var i = 0; i < items.length; i++) {
            var itemId = items[i].getId();
            var upLoadField = Ext.getCmp(itemId.substr(1, itemId.length - 1));
            
            if (upLoadField.getValue() != '') 
                documentTypes += upLoadField.getId() + ',';
        }
        
        return documentTypes;
    }
    this._documentTypeStore.load();
}
Ext.extend(Srims.documents.DocumentModelEditWindow_documentTypeSelectForm, Ext.FormPanel, {});


