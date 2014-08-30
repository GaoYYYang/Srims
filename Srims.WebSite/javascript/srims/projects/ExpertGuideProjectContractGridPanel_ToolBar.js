

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.documents) 
    Ext.namespace('Srims.documents');


Srims.projects.ExpertGuideProjectContractGridPanel_ToolBar = function(panel){

    //fields
    this._panel = panel;
    
    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传主合同',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.uploadMainContract(this.panel._project, this.panel._store);
        },
        hidden: true,
        tooltip: '<b>上传主合同</b>'
    });
    this._buttonSubmitOutContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传外协合同',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.uploadOutContract(this.panel._project, this.panel._store);
        },
        hidden: true,
        tooltip: '<b>上传外协合同</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            var contract = this.panel._selections.getSelected();
            Srims.projects.downLoadContract(contract);
        },
        hidden: true,
        tooltip: '<b>查看项目合同</b><br/>查看选中的项目合同'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过合同', '你确定要审核通过这个项目合同吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorContractPass(this.panel._selections.getSelected(), this.panel._store, this.panel._project.get('isHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过项目合同</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Srims.projects.showCensorContractRejectWindow(this.panel._selections.getSelected(), this.panel._store, this.panel._project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回合同</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除合同', '你确定要删除这个合同吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.deleteContract(this.panel._project, this.panel._selections.getSelected(), this.panel._store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除合同</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            this.panel.setProject(this.panel._project);
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目合同列表'
    });
    Srims.projects.ExpertGuideProjectContractGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitMainContract, this._buttonSubmitOutContract, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, this._buttonRefresh]
    });
    
    this.setProject = function(project){
        this._panel._store.project = project;
        this._buttonSubmitMainContract.setVisible(project.get('hasPermission_EditProjectContract'));
        this._buttonSubmitOutContract.setVisible(project.get('hasPermission_EditProjectContract'));
        this._buttonSubmitOutContract.setDisabled(!project.get('canEdit_ProjectContract'));
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
        var contract = selection.getSelected();
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonDelete.setVisible(contract.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!contract.get('canDelete'));
        
        buttonShow.setVisible(buttonShow.panel._project.get('hasPermission_ShowProejectContract'));
        buttonShow.setDisabled(!buttonShow.panel._project.get('canShow_ProjectContract'));
        
        buttonCensorPass.setVisible(buttonCensorPass.panel._project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(buttonCensorPass.panel._project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._panel._selections.on('selectionchange', this._onSelection_selectionChagne);
    this._panel._store.toolBar = this;
    this._panel._store.project = this._panel._project;
    this._panel._store.on('load', function(){
        var contracts = this.getRange();
        for (var i = 0; i < contracts.length; i++) {
            if (contracts[i].get('type') == Srims.documents.ContractType.MainContract) {
                this.toolBar._buttonSubmitMainContract.setDisabled(true);
                return;
            }
        }
        this.toolBar._buttonSubmitMainContract.setDisabled(!this.project.get('canEdit_ProjectMainContract'));
    });
}
Ext.extend(Srims.projects.ExpertGuideProjectContractGridPanel_ToolBar, Ext.Toolbar);
