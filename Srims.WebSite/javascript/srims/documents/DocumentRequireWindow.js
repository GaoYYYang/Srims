
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentRequireWindow = function(id, project, store){

    this._id = id;
    this._project = project;
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
    this._buttonRequire = new Ext.Button({
        minWidth: 70,
        text: '催缴',
        window: this,
        handler: function(){
            var window = this.window;
            var documentNames = window._checkboxGroupDocumentName.getSelecetedValue();
            if (documentNames.length == 0) {
                Ext.Msg.show({
                    title: '文档名称不能为空',
                    msg: '催缴文档，文档名称不能为空，请指定文档名称',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            if (!window.validate(false)) 
                return;
            
            Ext.Ajax.request({
                url: Srims.service.documents.DocumentService + '/RequireDocument',
                params: {
                    projectId: window._project.get('id'),
                    documentNames: documentNames,
                    deadLine: window._dateFieldDeadLine.getValue() ? window._dateFieldDeadLine.getValue().format("Y-m-d H:i:s") : '',
                    isRequire: window._checkboxIsRequire.getValue()
                },
                success: function(){
                    window._store.load();
                    window.close();
                }
            });
        }
    });
    this._checkboxGroupDocumentName = new Srims.component.CheckBoxGroup({
        fieldLabel: '文档名称',
        columns: 3,
        items: Srims.documents.DocumentRequireWindow.DocumentTypeStore.checkboxGroupItems,
        cls: 'srims-checkboxGroup-documentName',
        allowBlank: false
    });
    this._dateFieldDeadLine = new Ext.form.DateField({
        fieldLabel: '截止日期',
        allowBlank: false,
        width: 150
    });
    this._checkboxIsRequire = new Ext.form.Checkbox({
        fieldLabel: '是否必须'
    });
    
    Srims.documents.DocumentRequireWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '催缴项目文档',
        width: 550,
        labelWidth: 60,
        height: 260,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: new Ext.Panel({
            layout: 'form',
            labelWidth: 60,
            height: 230,
            bodyStyle: 'padding: 10px 0 0 10px',
            frame: true,
            items: [this._checkboxGroupDocumentName, this._dateFieldDeadLine, this._checkboxIsRequire]
        }),
        buttons: [this._buttonRequire, this._buttonClose]
    });
    this.validate = function(preventMark){
        var result = true;
        
        result = this._dateFieldDeadLine.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.documents.DocumentRequireWindow, Ext.Window, {})

Srims.documents.DocumentRequireWindow.DocumentTypeStore = new Srims.data.IDValueRecordStore(Srims.service.documents.DocumentService + "/GetDocumentNames");
Srims.documents.DocumentRequireWindow.DocumentTypeStore.load({
    callback: Srims.documents.DocumentRequireWindow.DocumentTypeStore.buildCheckboxGroupItems
});
