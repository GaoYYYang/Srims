
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentGridPanel_ToolBar = function(selection, store, award, isCensor){

    //fields
    this._selection = selection;
    this._store = store;
    this._award = award;
    
    this._buttonSubmitDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传奖励文档',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        award: this._award,
        handler: function(){
            Srims.awards.showAwardDocumentUploadWindow(this.award, this.store);
        },
        tooltip: '<b>上传奖励文档文档</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.awards.downLoadAwardDocument(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的奖励文档'
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
            
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个奖励文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.awards.censorPassAwardDoucment(this.selection.getSelected(), this.store);
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
            Srims.awards.showAwardDocumentCensorRejctWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除文档', '你确定要删除这个奖励文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.awards.deleteAwardDocument(this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文档</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新奖励文档列表'
    });
    Srims.documents.AwardDocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitDocument, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    this._buttonSubmitDocument.setVisible(!isCensor && award.get('hasPermission_UploadAwardDocument'));
    if (award) 
        this._buttonSubmitDocument.setDisabled(!award.get('canUploadAwardDocument'));
    
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        var document = selection.getSelected();
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonDelete.setVisible(document.get('hasPermission_Delete') && !isCensor);
        buttonDelete.setDisabled(!document.get('canDelete'));
        
        buttonShow.setVisible(true);
        buttonShow.setDisabled(false);
        
        buttonCensorPass.setVisible(document.get('canCensorPass'));
        buttonCensorReject.setVisible(document.get('canCensorReject'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.AwardDocumentGridPanel_ToolBar, Ext.Toolbar);

