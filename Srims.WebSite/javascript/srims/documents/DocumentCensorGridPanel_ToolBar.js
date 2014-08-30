
if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.DocumentCensorGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.downLoadDocument(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的项目文档'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorDocumentPass(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过文档</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.showCensorDocumentRejectWindow(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目文档列表'
    });
    Srims.documents.DocumentCensorGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonShow.setVisible(true);
        buttonCensorPass.setVisible(true);
        buttonCensorReject.setVisible(true);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DocumentCensorGridPanel_ToolBar, Ext.Toolbar);

