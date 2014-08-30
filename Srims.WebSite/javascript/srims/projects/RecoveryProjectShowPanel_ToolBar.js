
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectShowPanel_ToolBar = function(project){

    //fields
    this._project = project;
    this._showPanel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
    
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '打印',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.editProject(this.project);
        },
        hidden: true,
        tooltip: '<b>打印追缴单</b><br/>打印这个项目的追缴单信息'
    });
    this._buttonMemberManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '成员管理',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.showProjectMemberWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b><br/>编辑这个项目的成员信息'
    });
    this._buttonPayPlanItemManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-pay-plan-item',
        text: '付款计划管理',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.showPayPlanItemWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目付款计划</b><br/>编辑这个项目的付款计划信息'
    });
    this._buttonContractManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-contract',
        text: '合同管理',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.showContractWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目合同</b><br/>编辑这个项目的合同信息'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-document',
        text: '文档管理',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.showDocumentWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目文档</b><br/>编辑这个项目的文档信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            Ext.MessageBox.confirm('删除项目', '你确定要删除这个项目吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.deleteProject(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除项目</b><br/>删除这个项目'
    });
    this._buttonWithDraw = new Ext.Toolbar.Button({
        iconCls: 'icon-withDraw',
        text: '撤消',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!this.project) 
                return;
            
            Ext.MessageBox.confirm('撤销项目', '你确定要撤销这个项目吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.withDrawProject(this.project)
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤消项目</b><br/>撤消选中的项目'
    });
    this._buttonTerminate = new Ext.Toolbar.Button({
        iconCls: 'icon-terminate',
        text: '终止',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!this.project) 
                return;
            
            Ext.MessageBox.confirm('终止项目', '你确定要终止这个项目吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.terminateProject(this.project)
            }, this);
        },
        hidden: true,
        tooltip: '<b>终止项目</b><br/>终止选中的项目'
    });
    this._buttonCensorStartPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '通过立项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            Ext.MessageBox.show({
                title: '审核通过立项申请',
                msg: '您需要同时审核通过该项目的合同和文档吗？<br />点击“是”按钮，同时审核通过项目的合同和文档；<br />点击“否”按钮，仅审核通过项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                buttons: Ext.MessageBox.YESNOCANCEL,
                scope: this,
                fn: function(button){
                    if (button == 'yes') 
                        Srims.projects.censorStart_Pass(this.project, true);
                    if (button == 'no') 
                        Srims.projects.censorStart_Pass(this.project, false);
                },
                icon: Ext.MessageBox.QUESTION
            });
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过这个项目的立项申请'
    });
    this._buttonCensorEndPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '通过结项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            Ext.MessageBox.confirm('审核通过结项申请', '你确定要审核通过这个项目的结项申请吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.censorEnd_Pass(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过这个项目的结项申请'
    });
    this._buttonCensorStartReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '驳回立项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.rejectProjectCensor(this.project, true);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回这个项目的立项申请'
    });
    this._buttonCensorEndReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '驳回结项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.rejectProjectCensor(this.project, false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回这个项目的结项申请'
    });
    this._buttonSubmitStart = new Ext.Toolbar.Button({
        iconCls: 'icon-submit-start',
        text: '提交立项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            var flag = false;
            var msgInfo = '由于以下原因，项目立项申请可能会被驳回：<br/><br/><br/>';
            var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
            if (panel._formPanelMember._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px;">项目未指定任何成员<br/></span>';
            }
            if (panel._formPanelContract._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px">项目未提交合同<br/></span>';
            }
            if (panel._formPanelPayPlanItem._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px">项目到帐计划不完整<br/></span><br/>';
            }
            msgInfo += '建议您补充完上述信息后再提交<br/>';
            if (flag) 
                msgInfo += '你仍然要提交这个项目的立项申请吗？';
            else 
                msgInfo = '你确定要提交这个项目的立项申请吗？';
            
            Ext.MessageBox.confirm('提交立项申请', msgInfo, function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.submitStart(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交立项申请</b><br/>提交这个项目的立项申请'
    });
    this._buttonSubmitEnd = new Ext.Toolbar.Button({
        iconCls: 'icon-submit-end',
        text: '提交结项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Ext.MessageBox.confirm('提交结项申请', '你确定要提交这个项目的结项申请吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.submitEnd(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交结项申请</b><br/>提交这个项目的结项申请'
    });
    this._buttonUndoStart = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-start',
        text: '撤销立项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Ext.MessageBox.confirm('撤销立项申请', '你确定要撤销这个项目的立项申请吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.undoStart(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销立项申请</b><br/>撤销这个项目的立项申请'
    });
    this._buttonUndoEnd = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-end',
        text: '撤销结项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            Ext.MessageBox.confirm('撤销结项申请', '你确定要撤销这个项目的结项申请吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.undoEnd(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销结项申请</b><br/>撤销这个项目的结项申请'
    });
    this._buttonClearAccountBookNumber = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-project-account-book-number',
        text: '清空账本号',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.clearProjectAccountBookNumber(this.project);
        },
        hidden: true,
        tooltip: '<b>清空项目账本号</b><br/>清空这个项目的账本号'
    });
    this._buttonDocumentModelManage = new Ext.Toolbar.Button({
        iconCls: 'icon-Document-model-manage',
        text: '下载文档模板',
        minWidth: 60,
        project: this._project,
        handler: function(){
            Srims.type.showDocumentModelManageWindow(this.project.get('typeId'), this.project.get('typeName'), true);
        },
        tooltip: '<b>下载项目类型文档模板</b><br/>下载该项目类型的文档模板'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        project: this._project,
        handler: function(){
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: this.project.get('id')
                },
                scope: this,
                success: function(response){
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });
                    var currentProject = store.getAt(0);
                    var panel = Ext.getCmp(Srims.projects.Panel_ShowRecoveryProject_ID + currentProject.get('id'));
                    
                    panel.resetComponentValue(currentProject);
                    panel._formPanelMember._store.load();
                    panel._formPanelPayPlanItem._store.load();
                    panel._formPanelFundAllocation._store.load();
                    panel._formPanelFundBorrow._store.load();
                    panel._formPanelFundReturn._store.load();
                    panel._formPanelDocument._store.load();
                    panel._formPanelContract._store.load();
                    panel._formPanelStateHistory._store.load();
                    panel._toolBar._resetButtonVisibleAndDisabled(currentProject);
                    panel._toolBar._resetButtonProject(currentProject);
                }
            });
        },
        tooltip: '<b>刷新项目信息</b><br/>刷新项目的全部信息'
    });

    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        //store: this._store,
        project: this._project,
        hidden: true,
        handler: function() {
            titile = '打印凭单';
            message = '你确定要打印这张凭单吗？';
            action = 'print';
            methodName = '/VoucherPrint';
            if (this.voucher.get('accountBookNumber').substring(0, 4) == "9999") {
                Ext.Msg.show({
                    title: '不能打印',
                    msg: '账本号对应的学院为其它，请找超级管理员手动修改账本号。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
                Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
                Srims.fund.changeVoucherState = function(voucher, store, title, message, action, methodName, isFinanceManage) {
                    Ext.MessageBox.confirm(title, message, function(buttonId) {
                        if (buttonId == 'yes') {
                            var params = {};
                            params.voucherID = voucher.get('id');
                            Ext.Ajax.request({
                                url: Srims.service.fund.VoucherService + methodName,
                                params: params,
                                scope: this,
                                success: function(response) {
                                    store.load();
                                    var newstore = new Ext.data.Store({
                                        data: response.responseXML,
                                        reader: new Srims.fund.VoucherXmlReader()
                                    });
                                    var editedVoucher = newstore.getAt(0);
                                    var panelId = (isFinanceManage ? 'VoucherFinanceShowPanel' : 'VoucherShowPanel') + editedVoucher.get('id');
                                    if (Ext.getCmp(panelId))
                                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                                    Srims.fund.showVoucher(editedVoucher, store, isFinanceManage);
                                    if (action == 'print')
                                        window.open('VoucherPrint.aspx?VoucherID=' + voucher.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                                }
                            });
                        }
                    }, this);
                }
            }
        },
        tooltip: '<b>打印凭单</b>'
    });
    
    var user = Srims.currentLoginLog.user;
    var buttonItems = [this._buttonEdit, this._buttonPrint];
   // var buttonItems = [this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage];
    //    if (user.userRoleType == Srims.users.UserRoleType.Administrator) {
//        buttonItems[buttonItems.length] = this._buttonCensorStartPass;
//        buttonItems[buttonItems.length] = this._buttonCensorStartReject;
//        buttonItems[buttonItems.length] = this._buttonCensorEndPass;
//        buttonItems[buttonItems.length] = this._buttonCensorEndReject;
//        buttonItems[buttonItems.length] = this._buttonDocumentModelManage
//        buttonItems[buttonItems.length] = this._buttonClearAccountBookNumber;
//        buttonItems[buttonItems.length] = this._buttonWithDraw;
//        buttonItems[buttonItems.length] = this._buttonTerminate;
//    }
//    if (user.userRoleType == Srims.users.UserRoleType.Expert) {
//        buttonItems[buttonItems.length] = this._buttonSubmitStart;
//        buttonItems[buttonItems.length] = this._buttonSubmitEnd;
//        buttonItems[buttonItems.length] = this._buttonUndoStart;
//        buttonItems[buttonItems.length] = this._buttonUndoEnd;
//    }
  //  buttonItems[buttonItems.length] = [this._buttonDelete];
    buttonItems[buttonItems.length] = new Ext.Toolbar.Fill();
    buttonItems[buttonItems.length] = [this._buttonRefresh];
    Srims.projects.RecoveryProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });
    //重设button属性，外部调用
    this._resetButtonVisibleAndDisabled = function(project) {
//        this._buttonPrint.setVisible(voucher.get(''));
//        this._buttonPrint.setDisabled(!voucher.get(''));
        
        this._buttonEdit.setVisible(project.get('hasPermission_Edit'));
        this._buttonEdit.setDisabled(!project.get('canEdit'));
        
        this._buttonDelete.setVisible(project.get('hasPermission_Delete'));
        this._buttonDelete.setDisabled(!project.get('canDelete'));
        
        this._buttonWithDraw.setVisible(project.get('hasPermission_WithDraw'));
        this._buttonWithDraw.setDisabled(!project.get('canWithDraw'));
        
        this._buttonTerminate.setVisible(project.get('hasPermission_Terminate'));
        this._buttonTerminate.setDisabled(!project.get('canTerminate'));
        
        this._buttonMemberManage.setVisible(project.get('hasPermission_ShowProejectMember'));
        this._buttonMemberManage.setDisabled(!project.get('canShow_ProjectMember'));
        
        this._buttonPayPlanItemManage.setVisible(project.get('hasPermission_ShowProejectPayPlanItem'));
        this._buttonPayPlanItemManage.setDisabled(!project.get('canShow_ProjectPayPlanItem'));
        
        this._buttonContractManage.setVisible(project.get('hasPermission_ShowProejectContract'));
        this._buttonContractManage.setDisabled(!project.get('canShow_ProjectContract'));
        
        this._buttonDocumentManage.setVisible(project.get('hasPermission_ShowProejectDocument'));
        this._buttonDocumentManage.setDisabled(!project.get('canShow_ProjectDocument'));
        
        this._buttonCensorEndPass.setVisible(project.get('canCensorEnd'));
        this._buttonCensorEndReject.setVisible(project.get('canCensorEnd'));
        
        this._buttonCensorStartPass.setVisible(project.get('canCensorStart'));
        this._buttonCensorStartReject.setVisible(project.get('canCensorStart'));
        
        this._buttonSubmitStart.setVisible(project.get('canSubmitStart'));
        this._buttonSubmitEnd.setVisible(project.get('canSubmitEnd'));
        this._buttonUndoStart.setVisible(project.get('canUndoStart'));
        this._buttonUndoEnd.setVisible(project.get('canUndoEnd'));
        
        this._buttonClearAccountBookNumber.setVisible(project.get('canClearProjectAccountBookNumber'));
        this._buttonClearAccountBookNumber.setDisabled(!project.get('canClearProjectAccountBookNumber'))
    }
    this._resetButtonProject = function(project){
        this._buttonEdit.project = project;
        this._buttonDelete.project = project;
        this._buttonWithDraw.project = project;
        this._buttonTerminate.project = project;
        this._buttonMemberManage.project = project;
        this._buttonPayPlanItemManage.project = project;
        this._buttonContractManage.project = project;
        this._buttonDocumentManage.project = project;
        this._buttonCensorEndPass.project = project;
        this._buttonCensorEndReject.project = project;
        this._buttonCensorStartPass.project = project;
        this._buttonCensorStartReject.project = project;
        this._buttonSubmitStart.project = project;
        this._buttonSubmitEnd.project = project;
        this._buttonUndoStart.project = project;
        this._buttonUndoEnd.project = project;
        this._buttonDocumentModelManage.project = project;
        this._buttonClearAccountBookNumber.project = project;
    }
    this._resetButtonVisibleAndDisabled(this._project);
}
Ext.extend(Srims.projects.RecoveryProjectShowPanel_ToolBar, Ext.Toolbar);
