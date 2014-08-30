
if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar = function(selection){

    //fields
    this._selection = selection;
    
    //controls
    this._buttonUpload = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: this.selection.getSelected().get('projectID')
                },
                scope: this,
                success: function(response){
                
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });
                    var project = store.getAt(0);
                    Srims.projects.showDocumentWindow(project);
                }
            });
        },
        hidden: true,
        tooltip: '<b>上传文档</b><br/>进入上传文档页面'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新我未提交的文档列表'
    });
    Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonUpload, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    //initial
    this._selection.buttonUpload = this._buttonUpload;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonUpload = selection.buttonUpload;
        
        if (selection.getCount() == 0) {
            buttonUpload.hide();
            return;
        }
        
        buttonUpload.setVisible(true);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar, Ext.Toolbar);

