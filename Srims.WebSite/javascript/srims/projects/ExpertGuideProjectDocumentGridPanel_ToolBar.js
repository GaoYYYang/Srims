
if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.projects.ExpertGuideProjectDocumentGridPanel_ToolBar = function(panel){

    //fields
    this._panel = panel;
    
    //controls
    this._buttonRequireDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-require-document',
        text: '催缴文档',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.showRequireDocumentWindow(this.panel._project, this.panel._store);
        },
        tooltip: '<b>催缴文档</b>'
    });
    this._buttonSubmitDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传文档',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.uploadDocument(this.panel._project, this.panel._store);
        },
        tooltip: '<b>上传文档</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Srims.projects.downLoadDocument(this.panel._selections.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的项目文档'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorDocumentPass(this.panel._selections.getSelected(), this.panel._store, this.panel._project.get('isHorizontal'));
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
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Srims.projects.showCensorDocumentRejectWindow(this.panel._selections.getSelected(), this.panel._store, this.panel._project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除文档', '你确定要删除这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.deleteDocument(this.panel._project, this.panel._selections.getSelected(), this.panel._store);
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
        panel: this._panel,
        handler: function(){
            this.panel._store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目文档列表'
    });
    Srims.projects.ExpertGuideProjectDocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonRequireDocument, this._buttonSubmitDocument, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    this.setProject = function(project){
    
        this._buttonSubmitDocument.setVisible(this._panel._project.get('hasPermission_EditProjectDoucment'));
        this._buttonSubmitDocument.setDisabled(!this._panel._project.get('canEdit_ProjectDocument'));
        this._buttonRequireDocument.setVisible(this._panel._project.get('canRequire_ProjectDocument'));
        
    }
    
    //initial
    this._panel._selections.buttonDelete = this._buttonDelete;
    this._panel._selections.buttonShow = this._buttonShow;
    this._panel._selections.buttonCensorPass = this._buttonCensorPass;
    this._panel._selections.buttonCensorReject = this._buttonCensorReject;
    
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
        
        buttonDelete.setVisible(document.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!document.get('canDelete'));
        
        buttonShow.setVisible(buttonShow.panel._project.get('hasPermission_ShowProejectDocument'));
        buttonShow.setDisabled(!buttonShow.panel._project.get('canShow_ProjectDocument'));
        
        buttonCensorPass.setVisible(buttonCensorPass.panel._project.get('canCensor_ProjectDocument') && document.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(buttonCensorPass.panel._project.get('canCensor_ProjectDocument') && document.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._panel._selections.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ExpertGuideProjectDocumentGridPanel_ToolBar, Ext.Toolbar);
