
if (!Srims.documents)
    Ext.namespace('Srims.documents');
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.documents.ContractGridPanel_ToolBar = function(selection, store, project) {

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传主合同',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            Srims.projects.uploadMainContract(this.project, this.store);
        },
        tooltip: '<b>上传主合同</b>'
    });
    this._buttonSubmitOutContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传外协合同',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            Srims.projects.uploadOutContract(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>上传外协合同</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var contract = this.selection.getSelected();
            Srims.projects.downLoadContract(contract);
        },
        hidden: true,
        tooltip: '<b>查看项目合同</b><br/>查看选中的项目合同'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.MessageBox.confirm('审核通过合同', '你确定要审核通过这个项目合同吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    Srims.projects.censorContractPass(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
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
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.projects.showCensorContractRejectWindow(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回合同</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除合同', '你确定要删除这个合同吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    Srims.projects.deleteContract(this.project, this.selection.getSelected(), this.store);
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
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目合同列表'
    });
    Srims.documents.ContractGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitMainContract, this._buttonSubmitOutContract, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, this._buttonRefresh]
    });

    this._buttonSubmitMainContract.setVisible(project.get('hasPermission_EditProjectContract'));
    this._buttonSubmitMainContract.setDisabled(!project.get('canEdit_ProjectMainContract'));
    this._buttonSubmitOutContract.setVisible(project.get('hasPermission_EditProjectContract'));
    this._buttonSubmitOutContract.setDisabled(!project.get('canEdit_ProjectContract'));

    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    this._selection.buttonSubmitMainContract = this._buttonSubmitMainContract;
    this._selection.project = this._project;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        Ext.Ajax.request({
            url: Srims.service.documents.ContractService + '/GetMainContractByProjectID',
            params: {
                projectId: project.get('id')
            },
            scope: this,
            success: function(response) {
                if (response.responseText == "0")
                    selection.buttonSubmitMainContract.setDisabled(false);

            }
        });

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

        buttonShow.setVisible(project.get('hasPermission_ShowProejectContract'));
        buttonShow.setDisabled(!project.get('canShow_ProjectContract'));

        buttonCensorPass.setVisible(project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    this._store.toolBar = this;
    this._store.on('load', function() {
        var contracts = this.getRange();
        for (var i = 0; i < contracts.length; i++) {
            if (contracts[i].get('type') == Srims.documents.ContractType.MainContract) {
                this.toolBar._buttonSubmitMainContract.setDisabled(true);
                return;
            }
        }
        this.toolBar._buttonSubmitMainContract.setDisabled(!project.get('canEdit_ProjectMainContract'));
    });
}
Ext.extend(Srims.documents.ContractGridPanel_ToolBar, Ext.Toolbar);

