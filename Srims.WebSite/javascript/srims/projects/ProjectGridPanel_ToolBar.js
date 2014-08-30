
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectGridPanel_ToolBar = function(gridPanel, panelId, queryParams) {

    //fields
    this._gridPanel = gridPanel;
    this._isHorizontal = gridPanel._isHorizontal;
    this._selection = gridPanel._selection;
    this._store = gridPanel._projectStore;
    this._projectState = gridPanel._projectSate;
    this._expertAttendType = gridPanel._expertAttendType;
    this._panelId = panelId;
    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        gridPanel: this._gridPanel,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            Srims.projects.showProjectQueryWindow(this.panelId + '_QueryWindow', this.store, this.isHorizontal, queryParams, this.gridPanel);
        },
        tooltip: '<b>项目查询</b><br/>对项目信息进行复杂查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.projects.showImportWindow(this.store);
        },
        tooltip: '<b>项目导入</b><br/>将项目从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        isHorizontal: this._isHorizontal,
        handler: function() {
            Srims.projects.newProject(this.isHorizontal);
        },
        tooltip: '<b>新建项目</b><br/>输入项目信息以新建项目',
        hidden: this._isHorizontal ? !user.hasPermission_EditAnyHorizontalProject : !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showProject(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看项目</b><br/>显示所选项目的详细信息'
    });
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出',
        minWidth: 60,
        selection: this._selection,
        gridPanel: this._gridPanel,
        store: this._store,
        handler: function() {
            Srims.projects.exportProject(this.store.lastOptions.params, queryParams);
        },
        tooltip: '<b>导出项目</b><br/>导出所查询的项目',
        hidden: !user.hasPermission_EditAnyHorizontalProject && !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonEmail = new Ext.Toolbar.Button({
        iconCls: 'icon-email',
        text: '发送邮件',
        minWidth: 60,
        store: this._store,
        handler: function() {

            var filterParams = {};
            for (var param in this.store.lastOptions.params)
                filterParams[param] = this.store.lastOptions.params[param];
            for (var param in queryParams)
                filterParams[param] = queryParams[param];

            Srims.projects.confirmProjectPrincipalToSendEmail(filterParams);
        },
        tooltip: '<b>发送邮件</b><br/>给查询项目的负责人发送邮件',
        hidden: !user.hasPermission_EditAnyHorizontalProject && !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.editProject(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目</b><br/>编辑选中项目的基本、类别、经费等信息'
    });
    this._buttonMemberManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '成员管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showProjectMemberWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b><br/>编辑选中项目的成员信息'
    });
    this._buttonPayPlanItemManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-pay-plan-item',
        text: '付款计划',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showPayPlanItemWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目付款计划</b><br/>编辑选中项目的付款计划信息'
    });
    this._buttonContractManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-contract',
        text: '合同管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showContractWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目合同</b><br/>编辑选中项目的合同信息'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-document',
        text: '文档管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showDocumentWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目文档</b><br/>编辑选中项目的文档信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除项目', '你确定要删除这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.deleteProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除项目</b><br/>删除选中的项目'
    });
    this._buttonWithDraw = new Ext.Toolbar.Button({
        iconCls: 'icon-withDraw',
        text: '撤消',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('撤销项目', '你确定要撤销这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.withDrawProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤消项目</b><br/>撤消选中的项目'
    });
    this._buttonTerminate = new Ext.Toolbar.Button({
        iconCls: 'icon-terminate',
        text: '终止',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('终止项目', '你确定要终止这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.terminateProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>终止项目</b><br/>终止选中的项目'
    });
    this._buttonCensorStartPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过立项申请',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.show({
                title: '审核通过立项申请',
                msg: '您需要同时审核通过该项目的合同和文档吗？<br />点击“是”按钮，同时审核通过项目的合同和文档；<br />点击“否”按钮，仅审核通过项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                buttons: Ext.MessageBox.YESNOCANCEL,
                scope: this,
                fn: function(button) {
                    if (button == 'yes')
                        Srims.projects.censorStart_Pass(this.selection.getSelected(), true);
                    if (button == 'no')
                        Srims.projects.censorStart_Pass(this.selection.getSelected(), false);
                },
                icon: Ext.MessageBox.QUESTION
            });
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过选中项目的立项申请'
    });
    //对于专家提交的特定项目类型项目申请，需要由管理员先完善校内间接费和校内绩效
    this._buttonCompleteIn = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '填写校内间接费和绩效',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var project = this.selection.getSelected();
            project.projectStore = gridPanel.getStore();
            Srims.projects.editProject(project);
        },
        hidden: true,
        tooltip: '<b>填写校内间接费和绩效</b><br/>填写校内间接费和绩效'
    });
    this._buttonCensorEndPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过结项申请',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('审核通过结项申请', '你确定要审核通过这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.censorEnd_Pass(this.selection.getSelected());
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过选中项目的结项申请'
    });
    this._buttonCensorStartReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回立项申请',
        minWidth: 60,
        selection: this._selection,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.rejectProjectCensor(this.selection.getSelected(), true);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回选中的项目'
    });
    this._buttonCensorEndReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回结项申请',
        minWidth: 60,
        selection: this._selection,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.rejectProjectCensor(this.selection.getSelected(), false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回选中的项目'
    });

    this._buttonSetDelegatePrincipal = new Ext.Toolbar.Button({
        iconCls: 'icon-set-delegate-principal',
        text: '指定委托负责人',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.projects.showSetDelegatePrincipalWindow([this.selection.getSelected()], this.store);
        },
        hidden: true,
        tooltip: '<b>指定委托负责人</b><br/>为选中的项目指定委托负责人'
    });
    this._buttonClearDelegatePrincipal = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-delegate-principal',
        text: '取消委托负责人',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('取消委托负责人', '你确定要取消这个项目的委托负责人吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.clearDeletatePrincipal([this.selection.getSelected()], this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>取消委托负责人</b><br/>为选中的项目取消委托负责人'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        projectState: this._projectState,
        isHorizontal: this._isHorizontal,
        expertAttendType: this._expertAttendType,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            if (this.isHorizontal != undefined)
                params[params.length] = 'isHorizontal';
            if (this.projectState) {
                params[params.length] = 'state';
                params[params.length] = 'isCensor';
            }
            if (this.expertAttendType)
                params[params.length] = 'expertAttendType';
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();

            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var buttonItems;
    if (this._expertAttendType)
        buttonItems = [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage, this._buttonDelete, this._buttonSetDelegatePrincipal, this._buttonClearDelegatePrincipal, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    else {
        if (!this._projectState)
            buttonItems = [this._buttonQuery, this._buttonNew, this._buttonExport, this._buttonEmail, this._buttonShow, this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage, this._buttonWithDraw, this._buttonTerminate, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        if (this._projectState == Srims.projects.ProjectState.WaitingStartCensor)
            buttonItems = [this._buttonShow, this._buttonCompleteIn, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        
            //buttonItems = [this._buttonShow, this._buttonCompleteIn, this._buttonCensorStartPass, this._buttonCensorStartReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        if (this._projectState == Srims.projects.ProjectState.WaitingEndCensor)
            buttonItems = [this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
   
            //buttonItems = [this._buttonShow, this._buttonCensorEndPass, this._buttonCensorEndReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    }

    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });

    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonMemberManage = this._buttonMemberManage;
    this._selection.buttonPayPlanItemManage = this._buttonPayPlanItemManage;
    this._selection.buttonContractManage = this._buttonContractManage;
    this._selection.buttonDocumentManage = this._buttonDocumentManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonWithDraw = this._buttonWithDraw;
    this._selection.buttonTerminate = this._buttonTerminate;
    this._selection.buttonCensorStartPass = this._buttonCensorStartPass;
    this._selection.buttonCensorStartReject = this._buttonCensorStartReject;
    this._selection.buttonCensorEndPass = this._buttonCensorEndPass;
    this._selection.buttonCensorEndReject = this._buttonCensorEndReject;
    this._selection.buttonClearDelegatePrincipal = this._buttonClearDelegatePrincipal;
    this._selection.buttonSetDelegatePrincipal = this._buttonSetDelegatePrincipal;
    this._selection.projectState = this._projectState;
    this._selection.buttonCompleteIn = this._buttonCompleteIn;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonMemberManage = selection.buttonMemberManage;
        var buttonPayPlanItemManage = selection.buttonPayPlanItemManage;
        var buttonContractManage = selection.buttonContractManage;
        var buttonDocumentManage = selection.buttonDocumentManage;
        var buttonDelete = selection.buttonDelete;
        var buttonWithDraw = selection.buttonWithDraw;
        var buttonTerminate = selection.buttonTerminate;
        var buttonCensorStartPass = selection.buttonCensorStartPass;
        var buttonCensorStartReject = selection.buttonCensorStartReject;
        var buttonCensorEndPass = selection.buttonCensorEndPass;
        var buttonCensorEndReject = selection.buttonCensorEndReject;
        var buttonClearDelegatePrincipal = selection.buttonClearDelegatePrincipal;
        var buttonSetDelegatePrincipal = selection.buttonSetDelegatePrincipal;
        var buttonCompleteIn = selection.buttonCompleteIn;

        var projectState = selection.projectState;

        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonMemberManage.hide();
            buttonPayPlanItemManage.hide();
            buttonContractManage.hide();
            buttonDocumentManage.hide();
            buttonDelete.hide();
            buttonCensorStartPass.hide();
            buttonCensorStartReject.hide();
            buttonCensorEndPass.hide();
            buttonCensorEndReject.hide();
            buttonClearDelegatePrincipal.hide();
            buttonSetDelegatePrincipal.hide();
            buttonCompleteIn.hide();
            return;
        }

        var project = selection.getSelected();

        buttonShow.setVisible(project.get('hasPermission_Show'));
        buttonShow.setDisabled(!project.get('canShow'));

        buttonEdit.setVisible(project.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!project.get('canEdit'));

        buttonDelete.setVisible(project.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!project.get('canDelete'));

        buttonWithDraw.setVisible(project.get('hasPermission_WithDraw'));
        buttonWithDraw.setDisabled(!project.get('canWithDraw'));

        buttonTerminate.setVisible(project.get('hasPermission_Terminate'));
        buttonTerminate.setDisabled(!project.get('canTerminate'));

        buttonMemberManage.setVisible(project.get('hasPermission_ShowProejectMember'));
        buttonMemberManage.setDisabled(!project.get('canShow_ProjectMember'));

        buttonPayPlanItemManage.setVisible(project.get('hasPermission_ShowProejectPayPlanItem'));
        buttonPayPlanItemManage.setDisabled(!project.get('canShow_ProjectPayPlanItem'));

        buttonContractManage.setVisible(project.get('hasPermission_ShowProejectContract'));
        buttonContractManage.setDisabled(!project.get('canShow_ProjectContract'));

        buttonDocumentManage.setVisible(project.get('hasPermission_ShowProejectDocument'));
        buttonDocumentManage.setDisabled(!project.get('canShow_ProjectDocument'));

        buttonCensorStartPass.setVisible(project.get('canCensorStart'));
        buttonCensorStartReject.setVisible(project.get('canCensorStart'));
        buttonCensorEndPass.setVisible(project.get('canCensorEnd'));
        buttonCensorEndReject.setVisible(project.get('canCensorEnd'));
        buttonClearDelegatePrincipal.setVisible(project.get('canClearDelegatePrincipal'));
        buttonSetDelegatePrincipal.setVisible(project.get('canSetDelegatePrincipal'));

        buttonCompleteIn.setVisible(project.get('canCompleteIn'));

    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ProjectGridPanel_ToolBar, Ext.Toolbar);
