Srims.Load = function() {
};
Srims.Load.isLoadReleaseJs = false;

Srims.Load.isMainLoad = false;
Srims.Load.isExpertSimpleQueryLoad = false;
Srims.Load.isProjectLoad = false;
Srims.Load.isFundLoad = false;
Srims.Load.isPaperLoad = false;
Srims.Load.isAwardLoad = false;
Srims.Load.isAnnouncementLoad = false;
Srims.Load.isMessageLoad = false;
Srims.Load.isSubjectLoad = false;
Srims.Load.isUserLoad = false;
Srims.Load.isLogLoad = false;
Srims.Load.isStatisticLoad = false;
Srims.Load.isSystemSettingLoad = false;
Srims.Load.isFinanceLoad = false;
Srims.Load.isDepartmentLoad = false;
Srims.Load.isTypeLoad = false;
Srims.Load.isStampLoad = false;
Srims.Load.isBaseLoad = false;

// load js
Srims.Load._jsToLoad = undefined;
Srims.Load._jsLoadCallBack = undefined;

Srims.Load.loadJs = function(js, name, callback) {
    Srims.Load._jsToLoad = js;
    Srims.Load._jsLoadCallBack = callback;
    Srims.Load._showLoadingAnimation(name);
    Srims.Load._loadJs();
}
Srims.Load._loadJs = function() {
    var js = Srims.Load._jsToLoad;
    var callback = Srims.Load._jsLoadCallBack;

    if (Ext.type(js) != 'string') {
        if (js.length == 1) {
            js = js[0];
        } else {
            js = js.shift();
            callback = Srims.Load._loadJs;
        }
    }

    Ext.Ajax.request({
        url: '/javascript' + js,
        success: Srims.Load._onLoadJs,
        method: 'GET',
        scope: callback
    });
}
Srims.Load._onLoadJs = function(response) {
    eval(response.responseText);
    if (this != Srims.Load._loadJs) {
        Srims.Load._hideLoadingAnimation();
    }

    this();
}
Srims.Load._showLoadingAnimation = function(name) {
    if (!Srims.Load.isMainLoad)
        return;

    Srims.Load._loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在加载' + name + '...'
    });
    Srims.Load._loadingAnimation.show();
};
Srims.Load._hideLoadingAnimation = function() {
    if (Srims.Load._loadingAnimation)
        Srims.Load._loadingAnimation.hide();
}
// load login form
Srims.Load.loadLoginForm = function() {
    var js = ["/srims/common/Announcement.js"];
    js[js.length] = "/srims/common/AnnouncementXmlReader.js";
    js[js.length] = "/srims/common/AnnouncementStore.js";
    js[js.length] = "/srims/FormLogin.js";
    js[js.length] = "/srims/AnnouncementIndexRender.js";

    Srims.Load.loadJs(js, '登陆窗口', Srims.Load._onLoadLoginForm);
}
Srims.Load._onLoadLoginForm = function() {
    var formLogin = new Srims.FormLogin(Ext.get('DivWrapper'));
    Ext.get("DivLoading").remove();

    formLogin.render();
    Srims.AnnouncementIndexRender.render(Ext.get('DivWrapper'));

    window.onresize = function() {
        var formLogin = Srims.FormLogin.getFormLogin();
        if (formLogin)
            formLogin.render();
    };
}
// load main
Srims.Load.loadMain = function() {
    Srims.Load.loadJs("/srims/Provider.js", '状态', Srims.Load._onloadProvider);
}
Srims.Load._onloadProvider = function() {

    Srims.Provider.instance.loadState(function() {
        if (Srims.Load.isLoadReleaseJs) {
            Srims.Load.loadJs("/srims/release/main.js", '主窗口',
							Srims.Load._onLoadJs_main);
            return;
        }
        // load main js
        var js = ["/srims/Main.js"];
        js[js.length] = "/srims/experts/ExpertXmlReader.js";
        js[js.length] = "/srims/ExpertNavigatePanel.js";
        js[js.length] = "/srims/MenuBar.js";
        js[js.length] = "/srims/TopBar.js";
        js[js.length] = "/srims/WorkSpace.js";
        js[js.length] = "/srims/Action.js";
        js[js.length] = "/srims/MessageAction.js";
        js[js.length] = "/srims/Poll.js";
        js[js.length] = "/srims/ExportAction.js";
        js[js.length] = "/srims/CensorState.js";
        js[js.length] = "/srims/SubjectNature.js";

        js[js.length] = "/srims/documents/ResourceAction.js";

        js[js.length] = "/srims/expertGuide/ExpertGuideAction.js";
        js[js.length] = "/srims/expertGuide/ProcessDescriptionStore.js";
        js[js.length] = "/srims/expertGuide/ProcessesShowForm.js";
        js[js.length] = "/srims/expertGuide/SingleProcessOperatePanel.js";

        js[js.length] = "/srims/data/IDValueRecord.js";
        js[js.length] = "/srims/data/XmlStore.js";
        js[js.length] = "/srims/data/XmlReader.js";
        js[js.length] = "/srims/data/Entity.js";
        js[js.length] = "/srims/component/CheckboxGroup.js";
        js[js.length] = "/srims/component/GridPanel.js";
        js[js.length] = "/srims/component/EntityComboBox.js";
        js[js.length] = "/srims/component/EntitySearch.js";
        js[js.length] = "/srims/component/MagazineSearch.js";
        js[js.length] = "/srims/component/ExpertSearch.js";
        js[js.length] = "/srims/component/OutsourcingSearch.js";
        js[js.length] = "/srims/component/ProjectSearch.js";
        js[js.length] = "/srims/component/FinanceSearch.js";
        js[js.length] = "/srims/component/NoticeTextComboBox.js";
        js[js.length] = "/srims/component/ThousandPercentField.js";
        js[js.length] = "/srims/component/PercentField.js";
        js[js.length] = "/srims/component/UserSearch.js";
        js[js.length] = "/srims/component/AdministratorSearch.js";
        js[js.length] = "/srims/component/QueryWindow_MemberPanel.js";
        js[js.length] = "/srims/component/NoticeTextSearchBox.js";
        js[js.length] = "/srims/component/MoneyField.js";
        js[js.length] = "/srims/component/ExportWindow.js";
        js[js.length] = "/srims/component/ExportWindow_EntityColumnsForm.js";
        js[js.length] = "/srims/component/FileUploadField.js";
        js[js.length] = "/srims/component/GetAllManagementFeesComboBox.js";

        js[js.length] = "/srims/papers/MagazineQueryWindow_InforPanel.js";
        js[js.length] = "/srims/awards/AwardQueryWindow_OtherPanel.js";
        js[js.length] = "/srims/patents/PatentQueryWindow_OtherPanel.js";

        js[js.length] = "/srims/experts/ExpertQueryPanel_Project_Type.js";
        js[js.length] = "/srims/projects/ProjectQueryWindow_BasicPanel.js";

        js[js.length] = "/srims/component/RadioGroup.js";
        js[js.length] = "/srims/component/AwardSearch.js";

        js[js.length] = "/srims/common/ViewDefineWindow.js";
        js[js.length] = "/srims/common/ViewShowWindow.js";
        js[js.length] = "/srims/common/ViewTypeStore.js";
        js[js.length] = "/srims/common/ViewGridPanel.js";
        js[js.length] = "/srims/common/ViewGridPanel_ColumnModel.js";
        js[js.length] = "/srims/common/ViewGridPanel_ToolBar.js";
        js[js.length] = "/srims/common/ViewStore.js";
        js[js.length] = "/srims/common/ViewXmlReader.js";
        js[js.length] = "/srims/common/ViewAction.js";
        js[js.length] = "/srims/common/View.js";

        Srims.Load.loadJs(js, '主窗口', Srims.Load._onLoadJs_main);
    });
}
Srims.Load._onLoadJs_main = function() {
    Srims.Load.isMainLoad = true;
    window.onresize = Ext.emptyFn;

    Ext.get('DivCopyRight').remove();
    Ext.get('DivWrapper').remove();
    //carlsirce2013.4.1 页面加载完毕后移除漂浮文字
    Ext.get('smallsoftware').remove();
    Ext.getBody().setStyle('text-align', 'left');

    Srims.Main.render();

    var user = Srims.currentLoginLog.user;
    if (user.isNeedEditPassword) {
        Ext.Msg.show({
            title: '修改密码',
            msg: '您是第一次登录本系统或者您的密码刚被重置，为了您的账号的安全，请及时修改密码',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
    }

    // 加载短消息模块
    Srims.Load
			.loadMessageModule('Srims.users.MessageAction.listMyUnReadMessages();');
}
Srims.Load.loadExpertSimpleQuery = function(callbackFunctionString) {

    if (Srims.Load.isExpertSimpleQueryLoad) {
        eval(callbackFunctionString);
        return;
    }

    var js = ["/srims/users/UserRoleType.js"];
    js[js.length] = "/srims/experts/ExpertSimpleQuery.js";

    Srims.Load.isExpertSimpleQueryLoad = true;
    Srims.Load.loadJs(js, '专家查询', function() {
        eval(callbackFunctionString)
    });
}
Srims.Load.loadProjectModule = function(callbackFunctionString) {
    if (Srims.Load.isProjectLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isProjectLoad = true;

    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/project.js", '项目模块', function() {
            eval(callbackFunctionString);
        });
        return;
    }

    // load project js
    var js = ["/srims/common/Subject.js"];
    js[js.length] = "/srims/EmailAction.js";
    js[js.length] = "/srims/users/UserRoleType.js";
    js[js.length] = "/srims/component/ProvinceCityPanel.js";
    js[js.length] = "/srims/component/EmailEditWindow.js";

    js[js.length] = "/srims/experts/Department.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";

    js[js.length] = "/srims/bases/Base.js";
    js[js.length] = "/srims/bases/BaseStore.js";
    js[js.length] = "/srims/bases/BaseXmlReader.js";

    js[js.length] = "/srims/type/TypeAction.js";
    js[js.length] = "/srims/type/ProjectRank.js";
    js[js.length] = "/srims/type/ProjectRankXmlReader.js";
    js[js.length] = "/srims/type/ProjectRankStore.js";
    js[js.length] = "/srims/type/ProjectType.js";
    js[js.length] = "/srims/type/ProjectTypeXmlReader.js";
    js[js.length] = "/srims/type/ProjectTypeStore.js";
    js[js.length] = "/srims/type/ProjectSupportCategory.js";
    js[js.length] = "/srims/type/ProjectSupportCategoryXmlReader.js";
    js[js.length] = "/srims/type/ProjectSupportCategoryStore.js";
    js[js.length] = "/srims/type/ProjectSupportField.js";
    js[js.length] = "/srims/type/ProjectSupportFieldXmlReader.js";
    js[js.length] = "/srims/type/ProjectSupportFieldStore.js";
    js[js.length] = "/srims/type/ProjectSupportSubField.js";
    js[js.length] = "/srims/type/ProjectSupportSubFieldXmlReader.js";
    js[js.length] = "/srims/type/ProjectSupportSubFieldStore.js";
    js[js.length] = "/srims/type/ProjectSubjectNature.js";
    js[js.length] = "/srims/type/MangementFees.js";
    js[js.length] = "/srims/type/MangementFeesStore.js";
    js[js.length] = "/srims/type/ManagementFeesXmlReader.js";

    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";

    js[js.length] = "/srims/documents/Document.js";
    js[js.length] = "/srims/documents/DocumentXmlReader.js";
    js[js.length] = "/srims/documents/DocumentStore.js";
    js[js.length] = "/srims/documents/DocumentGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/DocumentGridPanel.js";
    js[js.length] = "/srims/documents/DocumentGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/DocumentCensorGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/DocumentCensorGridPanel.js";
    js[js.length] = "/srims/documents/DocumentCensorGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/DocumentWindow.js";
    js[js.length] = "/srims/documents/DocumentWindow_RequireMessage.js";
    js[js.length] = "/srims/documents/DocumentUploadWindow.js";
    js[js.length] = "/srims/documents/DocumentRequireWindow.js";
    js[js.length] = "/srims/documents/DocumentCensorRejectWindow.js";
    js[js.length] = "/srims/documents/Contract.js";
    js[js.length] = "/srims/documents/ContractXmlReader.js";
    js[js.length] = "/srims/documents/ContractStore.js";
    js[js.length] = "/srims/documents/ContractGridPanel.js";
    js[js.length] = "/srims/documents/ContractGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/ContractGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/ContractWindow.js";
    js[js.length] = "/srims/documents/ContractType.js";
    js[js.length] = "/srims/documents/ContractUploadWindow.js";
    js[js.length] = "/srims/documents/ContractCensorRejectWindow.js";
    js[js.length] = "/srims/documents/ContractCensorGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/ContractCensorGridPanel.js";
    js[js.length] = "/srims/documents/ContractCensorGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/DocumentMyUnsubmitDocumentGridPanel.js";
    js[js.length] = "/srims/documents/DocumentMyUnsubmitDocumentGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/DocumentMyUnsubmitDocumentGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/DocumentModel.js";
    js[js.length] = "/srims/documents/DocumentModelXmlReader.js";
    js[js.length] = "/srims/documents/DocumentModelStore.js";
    js[js.length] = "/srims/documents/DocumentModelManageWindow.js";
    js[js.length] = "/srims/documents/DocumentModelGridPanel.js";
    js[js.length] = "/srims/documents/DocumentModelGridPanel_Toolbar.js";
    js[js.length] = "/srims/documents/DocumentModelGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/DocumentModelUpLoadWindow.js";

    js[js.length] = "/srims/projects/ProjectComponentID.js";
    js[js.length] = "/srims/projects/ProjectLevel.js";
    js[js.length] = "/srims/projects/ProjectState.js";
    js[js.length] = "/srims/projects/Project.js";
    js[js.length] = "/srims/projects/ProjectStore.js";
    js[js.length] = "/srims/projects/ProjectXmlReader.js";
    js[js.length] = "/srims/projects/ProjectHistoryState.js";
    js[js.length] = "/srims/projects/ProjectHistoryStateStore.js";
    js[js.length] = "/srims/projects/ProjectHistoryStateXmlReader.js";
    js[js.length] = "/srims/projects/ProjectSetDelegatePrincipalWindow.js";
    js[js.length] = "/srims/projects/ProjectExport_Column.js";
    js[js.length] = "/srims/projects/ProjectCompleteInWindow.js";

    js[js.length] = "/srims/fund/FundAllocation.js";
    js[js.length] = "/srims/fund/FundAllocationStore.js";
    js[js.length] = "/srims/fund/FundAllocationXmlReader.js";
    js[js.length] = "/srims/fund/FundAllocationState.js";
    js[js.length] = "/srims/fund/FundAllocationGridPanel_ColumnModel.js";

    js[js.length] = "/srims/performance/PerformanceAllocation.js";
    js[js.length] = "/srims/performance/PerformanceAllocationStore.js";
    js[js.length] = "/srims/performance/PerformanceAllocationXmlReader.js";
    js[js.length] = "/srims/performance/PerformanceAllocationState.js";
    js[js.length] = "/srims/performance/PerformanceAllocationGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/PayPlanItem.js";
    js[js.length] = "/srims/fund/PayPlanItemStore.js";
    js[js.length] = "/srims/fund/PayPlanItemXmlReader.js";
    js[js.length] = "/srims/fund/PayPlanItemGridPanel.js";
    js[js.length] = "/srims/fund/PayPlanItemGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/PayPlanItemGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/PayPlanItemWindow.js";
    js[js.length] = "/srims/fund/PayPlanItemEditWindow.js";

    js[js.length] = "/srims/fund/FundDescend.js";
    js[js.length] = "/srims/fund/FundDescendGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FundDescendState.js";
    js[js.length] = "/srims/fund/FundDescendStore.js";
    js[js.length] = "/srims/fund/FundDescendXmlReader.js";

    js[js.length] = "/srims/fund/FinanceFundDescend.js";
    js[js.length] = "/srims/fund/FinanceFundDescendGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FinanceFundDescendStore.js";
    js[js.length] = "/srims/fund/FinanceFundDescendXmlReader.js";

    js[js.length] = "/srims/projects/ProjectGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectGridPanel_MyJoinProject_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectGridPanel_GridFilters.js";
    js[js.length] = "/srims/projects/ProjectGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ProjectGridPanel.js";

    js[js.length] = "/srims/projects/RecoveryProjectGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/RecoveryProjectGridPanel_ShowColumnModel.js";
    js[js.length] = "/srims/projects/RecoveryProjectGridPanel_GridFilters.js";
    js[js.length] = "/srims/projects/RecoveryProjectGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/RecoveryProjectGridPanel.js";
    js[js.length] = "/srims/projects/RecoveryProjectStore.js";
    js[js.length] = "/srims/projects/RecoveryProjectXmlReader.js";
    js[js.length] = "/srims/projects/Recovery.js";

    js[js.length] = "/srims/projects/RecoveryProjectShowPanel.js";
    js[js.length] = "/srims/projects/RecoveryProjectShowPanel_ToolBar.js";
    js[js.length] = "/srims/projects/RecoveryProjectShowPanel_FundForm.js";
    //    js[js.length] = "/srims/projects/RecoveryProjectEditPanel.js";
    //    js[js.length] = "/srims/projects/RecoveryProjectEditPanel_BasicForm.js";

    js[js.length] = "/srims/projects/ProjectEmailGridPanel.js";
    js[js.length] = "/srims/projects/ProjectEmailGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ProjectEmailGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/projects/ProjectQueryWindow_TypePanel.js";
    js[js.length] = "/srims/projects/ProjectQueryWindow_FundPanel.js";
    js[js.length] = "/srims/projects/ProjectQueryWindow.js";

    js[js.length] = "/srims/projects/ProjectEditPanel_SecretProjectMessagePanel.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_BasicForm.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_TypeForm.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_FundForm.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_RemarkForm.js";
    js[js.length] = "/srims/projects/ProjectEditPanel.js";

    js[js.length] = "/srims/projects/ProjectShowPanel_BasicForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_MemberForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_RecoveryForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_TypeForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_FundForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_FundBorrowForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_FundReturnForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_PayPlanItemForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_FundAllocationForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_PerformanceAllocationForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_DocumentForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_ContractForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_StateHistoryForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_SystemForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_RemarkForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_ToolBar.js";

    js[js.length] = "/srims/projects/ProjectMember.js";
    js[js.length] = "/srims/projects/ProjectMemberGridPanel.js";
    js[js.length] = "/srims/projects/ProjectMemberGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectMemberStore.js";
    js[js.length] = "/srims/projects/ProjectMemberXmlReader.js";
    js[js.length] = "/srims/projects/ProjectMemberWindow.js";
    js[js.length] = "/srims/projects/ProjectMemberGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ProjectMemberEditWindow.js";
    js[js.length] = "/srims/projects/ProjectCensorRejectWindow.js";

    js[js.length] = "/srims/projects/ProjectClearAccountBookNumberWindow.js";
    js[js.length] = "/srims/projects/ProjectClearAccountBookNumberWindow_WarningPanel.js";

    js[js.length] = "/srims/projects/ProjectRankSelectWindow.js";
    js[js.length] = "/srims/projects/MyUnsubmitProjectsGridPanel.js";
    js[js.length] = "/srims/projects/MyUnsubmitProjectsGridPanel_ColumnModel.js";

    js[js.length] = "/srims/projects/ExpertGuideProjectEditPanel.js";
    js[js.length] = "/srims/projects/ExperGuideProjectMemberGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectMemberGridPanel.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectContractGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectContractGridPanel.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectDocumentGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectDocumentGridPanel.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectPayPlanItemGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectPayPlanItemGridPanel.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectEditPanel.js";

    js[js.length] = "/srims/projects/ProjectWaitingSetDelegateWindow.js";
    js[js.length] = "/srims/projects/ProjectSetDelegateGridPanel.js";
    js[js.length] = "/srims/projects/ProjectSetDelegateGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectSetDelegateGridPanel_ToolBar.js";

    js[js.length] = "/srims/component/ImportWindow.js";
    js[js.length] = "/srims/projects/projectAction.js";


    //carlsirce2013.2.27 新加入文件
    js[js.length] = "/srims/projects/ExpertGuideProjectOutGridPanel.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectOutGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectOutGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ProjectOut.js";
    js[js.length] = "/srims/projects/ProjectOutStore.js";
    js[js.length] = "/srims/projects/ProjectOutXmlReader.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_ProjectOutForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_ProjectOutForm.js";
    js[js.length] = "/srims/common/Outsourcing.js";
    js[js.length] = "/srims/common/OutsourcingCensorRejectWindow.js";


    js[js.length] = "/srims/common/OutsourcingIsExistWindow.js";
    //    js[js.length] = "/srims/common/OutsourcingIsExistWindow_GridPanel.js";
    //    js[js.length] = "/srims/common/OutsourcingIsExistWindow_GridPanel_ColumnModel.js";
    js[js.length] = "/srims/common/OutsourcingIsExistWindow_InForm.js";

    js[js.length] = "/srims/common/OutsourcingProvinceXmlReader.js";
    js[js.length] = "/srims/common/OutsourcingProvinceCities.js";
    js[js.length] = "/srims/common/OutsourcingProvinceStore.js";

    js[js.length] = "/srims/common/OutsourcingAction.js";
    js[js.length] = "/srims/common/OutsourcingCompanyType.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_Basic.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_Document.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_ToolBar.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_newToolBar.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_FileUpLoad.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_FileUpLoad2.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_FileUpLoad3.js";
    js[js.length] = "/srims/documents/DocumentUploadWindow.js";
    js[js.length] = "/srims/component/FileUploadWindow.js";
    js[js.length] = "/srims/component/FileUploadField.js";
    js[js.length] = "/srims/documents/ResourceAction.js";
    js[js.length] = "/srims/common/OutsourcingXmlReader.js";
    js[js.length] = "/srims/common/OutsourcingStore.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_ToolBar.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_Basic.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel.js";


    Srims.Load.loadJs(js, '项目模块', function() {
        eval(callbackFunctionString)
    });
}
// 经费模块
Srims.Load.loadFundModule = function(callbackFunctionString) {

    if (Srims.Load.isFundLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isFundLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/fund.js", '经费模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }

    // load fund js
    var js = ["/srims/fund/Finance.js"];

    js[js.length] = "/srims/projects/Project.js";
    js[js.length] = "/srims/projects/ProjectStore.js";
    js[js.length] = "/srims/projects/ProjectXmlReader.js";
    js[js.length] = "/srims/projects/ProjectLevel.js";
    js[js.length] = "/srims/projects/ProjectState.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_ContractForm.js";

    js[js.length] = "/srims/documents/Contract.js";
    js[js.length] = "/srims/documents/ContractXmlReader.js";
    js[js.length] = "/srims/documents/ContractStore.js";
    js[js.length] = "/srims/documents/ContractGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/ContractType.js";
    js[js.length] = "/srims/documents/ResourceAction.js";

    js[js.length] = "/srims/type/ProjectRank.js";
    js[js.length] = "/srims/type/ProjectRankXmlReader.js";
    js[js.length] = "/srims/type/ProjectRankStore.js";
    js[js.length] = "/srims/type/ProjectType.js";
    js[js.length] = "/srims/type/ProjectTypeXmlReader.js";
    js[js.length] = "/srims/type/ProjectTypeStore.js";

    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";

    js[js.length] = "/srims/fund/FinanceGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FinanceGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/FinanceGridPanel.js";
    js[js.length] = "/srims/fund/FinanceStore.js";
    js[js.length] = "/srims/fund/FinanceXmlReader.js";
    js[js.length] = "/srims/fund/FinanceAction.js";
    js[js.length] = "/srims/fund/FinanceQueryWindow_InforPanel.js";
    js[js.length] = "/srims/fund/FinanceQueryWindow.js";
    js[js.length] = "/srims/fund/FinanceEditWindow.js";
    js[js.length] = "/srims/fund/FinanceShowForm.js";

    js[js.length] = "/srims/fund/FundDescendAction.js";
    js[js.length] = "/srims/fund/FundDescend.js";
    js[js.length] = "/srims/fund/FundDescendGridPanel.js";
    js[js.length] = "/srims/fund/FundDescendGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/FundDescendGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FundDescendState.js";
    js[js.length] = "/srims/fund/FundDescendStore.js";
    js[js.length] = "/srims/fund/FundDescendXmlReader.js";
    js[js.length] = "/srims/fund/FundDescendQueryWindow.js";
    js[js.length] = "/srims/fund/FundDescendManageWindow.js";
    js[js.length] = "/srims/fund/FundDescendManageWindow_FinanceInfoPanel.js";
    js[js.length] = "/srims/fund/FundDescendManageWindow_FinanceInfoPanel_ToolBar.js";
    js[js.length] = "/srims/fund/FundDescendManageWindow_FundDescendPanel.js";
    js[js.length] = "/srims/fund/FundDescendManageWindow_FundReturnPanel.js";
    js[js.length] = "/srims/fund/FundDescendManageWindow_MessagePanel.js";
    js[js.length] = "/srims/fund/FundDescendWindow.js";
    js[js.length] = "/srims/fund/FundDescendCensorRejectWindow.js";

    js[js.length] = "/srims/fund/FundDescendStateHistoryGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FundDescendStateHistory.js";
    js[js.length] = "/srims/fund/FundDescendStateHistoryStore.js";
    js[js.length] = "/srims/fund/FundDescendStateHistoryXmlReader.js";

    js[js.length] = "/srims/fund/FundDescend_ReturnWindow.js";
    js[js.length] = "/srims/fund/FundDescend_ExpertWindow.js";

    js[js.length] = "/srims/fund/FundBatchDescendWindow.js";
    js[js.length] = "/srims/fund/FundBatchDescendWindow_EditGridPanel.js";
    js[js.length] = "/srims/fund/FundBatchDescendWindow_EditGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FundBatchDescendWindow_ProjectSimpleQueryPanel.js";

    js[js.length] = "/srims/fund/FinanceFundDescend.js";
    js[js.length] = "/srims/fund/FinanceFundDescendGridPanel.js";
    js[js.length] = "/srims/fund/FinanceFundDescendGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/FinanceFundDescendGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FinanceFundDescendStore.js";
    js[js.length] = "/srims/fund/FinanceFundDescendXmlReader.js";

    js[js.length] = "/srims/fund/FundAllocation.js";
    js[js.length] = "/srims/fund/FundAllocationAction.js";
    js[js.length] = "/srims/fund/FundAllocationXmlReader.js";
    js[js.length] = "/srims/fund/FundAllocationStore.js";
    js[js.length] = "/srims/fund/FundAllocationState.js";
    js[js.length] = "/srims/fund/FundAllocationOutWindow.js";


    js[js.length] = "/srims/fund/FundAllocationShowPanel_BasicForm.js";
    js[js.length] = "/srims/fund/FundAllocationShowPanel_FundMemberForm.js";
    js[js.length] = "/srims/fund/FundAllocationShowPanel_ProjectInforForm.js";
    js[js.length] = "/srims/fund/FundAllocationShowPanel_StateHistoryForm.js";
    js[js.length] = "/srims/fund/FundAllocationShowPanel_FundDescendStateHistoryForm.js";
    js[js.length] = "/srims/fund/FundAllocationShowPanel_VoucherForm.js";
    js[js.length] = "/srims/fund/FundAllocationShowPanel_ToolBar.js";
    js[js.length] = "/srims/fund/FundAllocationShowPanel.js";
    js[js.length] = "/srims/fund/FundAllocationCensorWindow.js";

    js[js.length] = "/srims/fund/FundAllocationGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FundAllocationGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/FundAllocationGridPanel.js";
    js[js.length] = "/srims/fund/FundAllocationQueryWindow.js";

    js[js.length] = "/srims/fund/FundAllocationStateHistoryGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FundAllocationStateHistory.js";
    js[js.length] = "/srims/fund/FundAllocationStateHistoryStore.js";
    js[js.length] = "/srims/fund/FundAllocationStateHistoryXmlReader.js";

    js[js.length] = "/srims/fund/FundMemberXmlReader.js";
    js[js.length] = "/srims/fund/FundMemberStore.js";
    js[js.length] = "/srims/fund/FundMember.js";
    js[js.length] = "/srims/fund/FundMemberGridPanel_ColumnModel.js";

    js[js.length] = "/srims/fund/VoucherAction.js";
    js[js.length] = "/srims/fund/Voucher.js";
    js[js.length] = "/srims/fund/VoucherXmlReader.js";
    js[js.length] = "/srims/fund/VoucherStore.js";
    js[js.length] = "/srims/fund/VoucherState.js";
    js[js.length] = "/srims/fund/VoucherGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/VoucherGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/VoucherGridPanel.js";
    js[js.length] = "/srims/fund/VoucherQueryWindow_InforPanel.js";
    js[js.length] = "/srims/fund/VoucherQueryWindow.js";
    js[js.length] = "/srims/fund/VoucherOut.js";
    js[js.length] = "/srims/fund/VoucherOutXmlReader.js";
    js[js.length] = "/srims/fund/VoucherOutStore.js";
    js[js.length] = "/srims/fund/VoucherOutColumnModel.js";
    js[js.length] = "/srims/fund/VoucherStateHistory.js";
    js[js.length] = "/srims/fund/VoucherStateHistoryColumnModel.js";
    js[js.length] = "/srims/fund/VoucherStateHistoryXmlReader.js";
    js[js.length] = "/srims/fund/VoucherStateHistoryStore.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_BasicForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_StateHistoryForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_FundAllocationForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_VoucherOutForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_FinanceForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_ToolBar.js";
    js[js.length] = "/srims/fund/VoucherShowPanel.js";
    js[js.length] = "/srims/fund/VoucherPrintWindow.js";

    js[js.length] = "/srims/fund/ProjectOut.js";
    js[js.length] = "/srims/fund/ProjectOutStore.js";
    js[js.length] = "/srims/fund/ProjectOutXmlReader.js";

    js[js.length] = "/srims/fund/VoucherEditWindow.js";
    js[js.length] = "/srims/fund/VoucherEditWindow_InForm.js";
    js[js.length] = "/srims/fund/VoucherEditWindow_Out_EditorGridPanel.js";
    js[js.length] = "/srims/fund/VoucherEditWindow_Out_EditorGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/VoucherEditWindow_Out_EditorGridPanel_ColumnModel.js";

    js[js.length] = "/srims/fund/VoucherEditAccountBookNumberWindow.js";
    js[js.length] = "/srims/fund/VoucherEditAccountBookNumberWindow_InforPanel.js";

    js[js.length] = "/srims/fund/MyWaitingAllocationFundDescendGridPanel.js";
    js[js.length] = "/srims/fund/MyWaitingAllocationFundDescendGridPanel_Column.js";

    js[js.length] = "/srims/fund/FinanceSelectPanel.js";
    js[js.length] = "/srims/fund/FinanceSelectPanel_QueryPanel.js";
    js[js.length] = "/srims/fund/FinanceSelectGridPanel.js";
    js[js.length] = "/srims/fund/FinanceSelectGridPanel_ColumnModel.js";

    js[js.length] = "/srims/fund/ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel.js";
    js[js.length] = "/srims/fund/ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel.js";
    js[js.length] = "/srims/fund/ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel.js";

    js[js.length] = "/srims/fund/ExpertGuidFundAllocationPanel.js";
    js[js.length] = "/srims/fund/ExpertGuidFundDescendPanel.js";

    js[js.length] = "/srims/fund/FinanceVouchersShowWindow.js";
    js[js.length] = "/srims/fund/FinannceVouchersShowWindow_VoucherGridPanel.js";
    js[js.length] = "/srims/fund/FinannceVouchersShowWindow_VoucherGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/FinannceVouchersShowWindow_VoucherGridPanel_ColumnModel.js";

    js[js.length] = "/srims/fund/FundAllocationCorrectDateTimeWindow.js";
    js[js.length] = "/srims/fund/FundAllocationCorrectWindow.js";
    js[js.length] = "/srims/users/UserRoleType.js";

    js[js.length] = "/srims/component/ImportWindow.js";
    Srims.Load.loadJs(js, '经费模块', function() {
        eval(callbackFunctionString)
    });
}
Srims.Load.loadBaseModule = function(callbackFunctionString) {

    if (Srims.Load.isBaseLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isBaseLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/base.js", '基地模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }
    // load base js
    var js = ["/srims/bases/Base.js"];
    js[js.length] = ["/srims/bases/BaseAction.js"];
    js[js.length] = ["/srims/bases/BaseStore.js"];
    js[js.length] = ["/srims/bases/BaseXmlReader.js"];
    js[js.length] = ["/srims/bases/BaseGridPanel.js"];
    js[js.length] = ["/srims/bases/BaseGridPanel_ToolBar.js"];
    js[js.length] = ["/srims/bases/BaseGridPanel_GridFilter.js"];
    js[js.length] = ["/srims/bases/BaseGridPanel_ColumnModel.js"];
    js[js.length] = ["/srims/bases/BaseEditWindow.js"];
    js[js.length] = ["/srims/bases/BaseEditWindow_BasicForm.js"];
    js[js.length] = ["/srims/bases/BaseShowPanel.js"];
    js[js.length] = ["/srims/bases/BaseShowPanel_BasicForm.js"];
    js[js.length] = ["/srims/bases/BaseShowPanel_ProjectForm.js"];
    js[js.length] = ["/srims/bases/BaseShowPanel_ToolBar.js"];

    js[js.length] = "/srims/projects/Project.js";
    js[js.length] = "/srims/projects/ProjectStore.js";
    js[js.length] = "/srims/projects/ProjectXmlReader.js";
    js[js.length] = "/srims/projects/ProjectGridPanel_MyJoinProject_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectLevel.js";

    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";

    Srims.Load.loadJs(js, '经基地模块', function() {
        eval(callbackFunctionString)
    });
}
// 论文模块
Srims.Load.loadPaperModule = function(callbackFunctionString) {

    if (Srims.Load.isPaperLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isPaperLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/paper.js", '论文模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }

    // load paper js
    var js = ["/srims/papers/Language.js"];

    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";
    js[js.length] = "/srims/common/SystemSettingStore.js";
    js[js.length] = "/srims/common/SystemSettingXmlReader.js";
    js[js.length] = "/srims/common/SystemSetting.js";




    js[js.length] = "/srims/experts/Department.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";

    js[js.length] = "/srims/papers/PublishType.js";
    js[js.length] = "/srims/papers/Magazine.js";
    js[js.length] = "/srims/papers/MagazineXmlReader.js";
    js[js.length] = "/srims/papers/MagazineStore.js";
    js[js.length] = "/srims/papers/MagazineAction.js";
    js[js.length] = "/srims/papers/MagazineGridPanel_ColumnModel.js";
    js[js.length] = "/srims/papers/MagazineGridPanel_GridFilters.js";
    js[js.length] = "/srims/papers/MagazineGridPanel_ToolBar.js";
    js[js.length] = "/srims/papers/MagazineGridPanel.js";

    js[js.length] = "/srims/papers/MagazineInformation.js";
    js[js.length] = "/srims/papers/MagazineInformationGridPanel_ColumnModel.js";
    js[js.length] = "/srims/papers/MagazineInformationGridPanel_ToolBar.js";
    js[js.length] = "/srims/papers/MagazineInformationGridPanel.js";
    js[js.length] = "/srims/papers/MagazineInformationStore.js";
    js[js.length] = "/srims/papers/MagazineInformationXmlReader.js";
    js[js.length] = "/srims/papers/MagazineQueryWindow.js";
    js[js.length] = "/srims/papers/MagazineShowPanel_BasicForm.js";
    js[js.length] = "/srims/papers/MagazineShowPanel_YearInforForm.js";
    js[js.length] = "/srims/papers/MagazineShowPanel_OccupationForm.js";
    js[js.length] = "/srims/papers/MagazineShowPanel_ToolBar.js";
    js[js.length] = "/srims/papers/MagazineShowPanel.js";
    js[js.length] = "/srims/papers/MagazineEditPanel_BasicForm.js";
    js[js.length] = "/srims/papers/MagazineEditPanel.js";
    js[js.length] = "/srims/papers/MagazineInformationEditPanel.js";
    js[js.length] = "/srims/papers/MagazineInformationEditWindow.js";
    js[js.length] = "/srims/papers/MagazineInformationWindow.js";

    js[js.length] = "/srims/papers/MagazineOccupation.js";
    js[js.length] = "/srims/papers/MagazineOccupationGridPanel_ColumnModel.js";
    js[js.length] = "/srims/papers/MagazineOccupationGridPanel_ToolBar.js";
    js[js.length] = "/srims/papers/MagazineOccupationGridPanel.js";
    js[js.length] = "/srims/papers/MagazineOccupationStore.js";
    js[js.length] = "/srims/papers/MagazineOccupationXmlReader.js";
    js[js.length] = "/srims/papers/MagazineOccupationEditPanel.js";
    js[js.length] = "/srims/papers/MagazineOccupationEditWindow.js";
    js[js.length] = "/srims/papers/MagazineOccupationWindow.js";
    js[js.length] = "/srims/papers/MagazineOccupationManageGridPanel.js";

    js[js.length] = "/srims/papers/Paper.js";
    js[js.length] = "/srims/papers/LiberalArtsPaper.js";
    js[js.length] = "/srims/papers/PaperAction.js";
    js[js.length] = "/srims/papers/PaperAuthor.js";
    js[js.length] = "/srims/papers/PaperAuthorStore.js";
    js[js.length] = "/srims/papers/PaperAuthorXmlReader.js";
    js[js.length] = "/srims/papers/PaperAuthorGridPanel_ColumnModel.js";
    js[js.length] = "/srims/papers/PaperAuthorGridPanel_ToolBar.js";
    js[js.length] = "/srims/papers/PaperAuthorGridPanel.js";
    js[js.length] = "/srims/papers/PaperAuhtorEditWindow.js";
    js[js.length] = "/srims/papers/PaperAuthorWindow.js";

    js[js.length] = "/srims/papers/LiberalArtsPaperAuthor.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperAuthorStore.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperAuthorXmlReader.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperAuthorGridPanel_ColumnModel.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperAuthorGridPanel_ToolBar.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperAuthorGridPanel.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperAuhtorEditWindow.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperAuthorWindow.js";

    js[js.length] = "/srims/papers/PaperGridPanel_ColumnModel.js";
    js[js.length] = "/srims/papers/PaperGridPanel_GridFilters.js";
    js[js.length] = "/srims/papers/PaperGridPanel_ToolBar.js";
    js[js.length] = "/srims/papers/PaperGridPanel.js";
    js[js.length] = "/srims/papers/PaperIndexedType.js";
    js[js.length] = "/srims/papers/PaperStore.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperStore.js";
    js[js.length] = "/srims/papers/PaperType.js";
    js[js.length] = "/srims/papers/PaperXmlReader.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperXmlReader.js";
    js[js.length] = "/srims/papers/SignUnit.js";

    js[js.length] = "/srims/papers/LiberalArtsPaperEditPanel_AbstractForm.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperEditPanel_BasicForm.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperEditPanel_OtherBasicForm.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperEditPanel.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperGridPanel_ColumnModel.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperGridPanel_GridFilters.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperGridPanel_ToolBar.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperGridPanel.js";

    js[js.length] = "/srims/papers/LiberalArtsPaperShowPanel_ToolBar.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperShowPanel_OtherBasicForm.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperShowPanel_BaisicForm.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperShowPanel_AuthorForm.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperShowPanel_AbstractForm.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperShowPanel.js";


    js[js.length] = "/srims/papers/ResultsType.js";


    js[js.length] = "/srims/papers/LiberalArtsPaperQueryWindow_OtherPanel.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperQueryWindow_ExpertPanel.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperQueryWindow.js";

    js[js.length] = "/srims/papers/PaperEditPanel_AbstractForm.js";
    js[js.length] = "/srims/papers/PaperEditPanel_BasicForm.js";
    js[js.length] = "/srims/papers/PaperEditPanel_OtherBasicForm.js";
    js[js.length] = "/srims/papers/PaperEditPanel.js";
    js[js.length] = "/srims/papers/PaperQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/papers/PaperQueryWindow_ExpertPanel.js";
    js[js.length] = "/srims/papers/PaperQueryWindow_MagazinePanel.js";
    js[js.length] = "/srims/papers/PaperQueryWindow_OtherPanel.js";
    js[js.length] = "/srims/papers/PaperQueryWindow.js";
    js[js.length] = "/srims/papers/PaperShowPanel_AbstractForm.js";
    js[js.length] = "/srims/papers/PaperShowPanel_AuthorForm.js";
    js[js.length] = "/srims/papers/PaperShowPanel_BaisicForm.js";
    js[js.length] = "/srims/papers/PaperShowPanel_MagazineForm.js";
    js[js.length] = "/srims/papers/PaperShowPanel_MagazineYearInforForm.js";
    js[js.length] = "/srims/papers/PaperShowPanel_OtherBasicForm.js";
    js[js.length] = "/srims/papers/PaperShowPanel_ToolBar.js";
    js[js.length] = "/srims/papers/PaperShowPanel.js";
    js[js.length] = "/srims/papers/PaperExport_Column.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperExport_Column.js";

    js[js.length] = "/srims/papers/LiberalArtsPaperEditPanel_MessagePanel.js";
    js[js.length] = "/srims/papers/PaperEditPanel_MessagePanel.js";
    js[js.length] = "/srims/component/ImportWindow.js";

    Srims.Load.loadJs(js, '论文模块', function() {
        eval(callbackFunctionString)
    });
}
Srims.Load.loadAnnouncementModule = function(callbackFunctionString) {
    if (Srims.Load.isAnnouncementLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isAnnouncementLoad = true;

    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/announcement.js", '通知模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }

    // load announcement js
    var js = ["/srims/common/Announcement.js"];

    js[js.length] = "/srims/common/AnnouncementXmlReader.js";
    js[js.length] = "/srims/common/AnnouncementStore.js";
    js[js.length] = "/srims/common/AnnouncementState.js";

    js[js.length] = "/srims/common/AnnouncementGridPanel_ColumnModel.js";
    js[js.length] = "/srims/common/AnnouncementGridPanel_GridFilters.js";
    js[js.length] = "/srims/common/AnnouncementGridPanel_ToolBar.js";
    js[js.length] = "/srims/common/AnnouncementGridPanel.js";

    js[js.length] = "/srims/common/AnnouncementEditWindow.js";
    js[js.length] = "/srims/common/AnnouncementEditWindow_BasicForm.js";
    js[js.length] = "/srims/common/AnnouncementEditWindow_ContentForm.js";

    js[js.length] = "/srims/common/AnnouncementShowWindow.js";
    js[js.length] = "/srims/common/AnnouncementShowWindow_BasicForm.js";
    js[js.length] = "/srims/common/AnnouncementShowWindow_ContentForm.js";

    js[js.length] = "/srims/common/AnnouncementAction.js";

    Srims.Load.loadJs(js, '通知模块', function() {
        eval(callbackFunctionString)
    });
}
Srims.Load.loadPatentModule = function(callbackFunctionString) {
    if (Srims.Load.isPatentLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isPatentLoad = true;

    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/Patent.js", '专利模块', function() {
            eval(callbackFunctionString);
        });
        return;
    }
    // load patent js
    var js = ["/srims/patents/Patent.js"];

    js[js.length] = "/srims/experts/Department.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";
    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";
    js[js.length] = "/srims/component/ExpertSearch.js";

    js[js.length] = "/srims/patents/PatentStore.js";
    js[js.length] = "/srims/patents/PatentReader.js";
    js[js.length] = "/srims/patents/PatentAction.js";
    js[js.length] = "/srims/patents/PatentGridPanel.js";
    js[js.length] = "/srims/patents/PatentGridPanel_ColumnModel.js";
    js[js.length] = "/srims/patents/PatentGridPanel_ToolBar.js";

    js[js.length] = "/srims/patents/PatentInventerStore.js";
    js[js.length] = "/srims/patents/PatentInventerReader.js";
    js[js.length] = "/srims/patents/PatentInventer.js";
    js[js.length] = "/srims/patents/PatentAgencyStore.js";
    js[js.length] = "/srims/patents/PatentAgencyReader.js";
    js[js.length] = "/srims/patents/PatentAgency.js";

    js[js.length] = "/srims/patents/PatentShowPanel.js";
    js[js.length] = "/srims/patents/PatentShowPanel_BasicForm.js";
    js[js.length] = "/srims/patents/PatentShowPanel_IntroductionForm.js";
    js[js.length] = "/srims/patents/PatentLawState.js";
    js[js.length] = "/srims/patents/PatentLevel.js";
    js[js.length] = "/srims/patents/PatentType.js";
    js[js.length] = "/srims/patents/PatentExport_Columns.js";

    js[js.length] = "/srims/patents/PatentInventerFormPanel.js";
    js[js.length] = "/srims/patents/PatentInventerGridPanel.js";
    js[js.length] = "/srims/patents/PatentInventerGridPanel_ColumnModel.js";
    js[js.length] = "/srims/patents/PatentInventerGridPanel_ToolBar.js";
    js[js.length] = "/srims/patents/PatentQueryWindow.js";
    js[js.length] = "/srims/patents/PatentQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/patents/PatentQueryWindow_ExpertPanel.js";

    js[js.length] = "/srims/patents/PatentEditWindow.js";
    js[js.length] = "/srims/patents/PatentEditWindow_BasicForm.js";
    js[js.length] = "/srims/patents/PatentEditWindow_BasicForm_MustWrite.js";

    js[js.length] = "/srims/patents/PatentInventerManageWindow.js";
    js[js.length] = "/srims/patents/PatentInventerManageWindow_AddInventer.js";

    js[js.length] = "/srims/patents/PatentAgencyAction.js";
    js[js.length] = "/srims/patents/PatentAgencyEditWindow.js";
    js[js.length] = "/srims/patents/PatentAgencyGridPanel.js";
    js[js.length] = "/srims/patents/PatentAgencyGridPanel_ColumnModel.js";
    js[js.length] = "/srims/patents/PatentAgencyGridPanel_GridFilter.js";
    js[js.length] = "/srims/patents/PatentAgencyGridPanel_ToolBar.js";

    js[js.length] = "/srims/component/ImportWindow.js";
    Srims.Load.loadJs(js, '专利模块', function() {
        eval(callbackFunctionString)
    });
}
Srims.Load.loadAwardModule = function(callbackFunctionString) {
    if (Srims.Load.isAwardLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isAwardLoad = true;

    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/Award.js", '奖励模块', function() {
            eval(callbackFunctionString);
        });
        return;
    }
    // load award js
    var js = ["/srims/awards/Award.js"];

    js[js.length] = "/srims/experts/Department.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";
    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";
    js[js.length] = "/srims/component/ExpertSearch.js";

    js[js.length] = "/srims/awards/AwardStore.js";
    js[js.length] = "/srims/awards/AwardReader.js";
    js[js.length] = "/srims/awards/AwardWinner.js";
    js[js.length] = "/srims/awards/AwardWinnerStore.js";
    js[js.length] = "/srims/awards/AwardWinnerReader.js";
    js[js.length] = "/srims/awards/AwardAction.js";
    js[js.length] = "/srims/awards/AwardGridPanel.js";
    js[js.length] = "/srims/awards/AwardGridPanel_ColumnModel.js";
    js[js.length] = "/srims/awards/AwardGridPanel_ToolBar.js";
    js[js.length] = "/srims/awards/AwardGridPanel_GridFilters.js";
    js[js.length] = "/srims/awards/AwardWinnerGridPanel_ColumnModel.js";
    js[js.length] = "/srims/awards/AwardShowPanel.js";
    js[js.length] = "/srims/awards/AwardShowPanel_BasicForm.js";
    js[js.length] = "/srims/awards/AwardShowPanel_ToolBar.js";
    js[js.length] = "/srims/awards/AwardWinnerFormPanel.js";
    js[js.length] = "/srims/awards/AwardWinnerGridPanel.js";
    js[js.length] = "/srims/awards/AwardWinnerManageWindow.js";
    js[js.length] = "/srims/awards/AwardWinnerManageWindow_ToolBar.js";
    js[js.length] = "/srims/awards/AwardWinnerManageWindow_AddWinner.js";
    js[js.length] = "/srims/awards/AwardShowPanel_IntroductionForm.js";
    js[js.length] = "/srims/awards/AwardQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/awards/AwardQueryWindow_ExpertPanel.js";

    js[js.length] = "/srims/awards/AwardQueryWindow.js";
    js[js.length] = "/srims/awards/AwardEditWindow.js";
    js[js.length] = "/srims/awards/AwardEditWindow_BasicForm.js";

    js[js.length] = "/srims/documents/AwardDocument.js";
    js[js.length] = "/srims/documents/AwardDocumentXmlReader.js";
    js[js.length] = "/srims/documents/AwardDocumentStore.js";
    js[js.length] = "/srims/documents/AwardDocumentManageWindow.js";
    js[js.length] = "/srims/documents/AwardDocumentGridPanel.js";
    js[js.length] = "/srims/documents/AwardDocumentGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/AwardDocumentGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/AwardDocumentUploadWindow.js";
    js[js.length] = "/srims/documents/AwardDocumentCensorRejectWindow.js";

    js[js.length] = "/srims/component/ImportWindow.js";

    js[js.length] = "/srims/awards/AwardExportColumns.js";

    Srims.Load.loadJs(js, '奖励模块', function() {
        eval(callbackFunctionString)
    });
}
Srims.Load.loadStatisticModule = function(callbackFunctionString) {
    if (Srims.Load.isStatisticLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isStatisticLoad = true;

    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/statistic.js", '统计模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }

    // load statistic js
    var js = ["/srims/statistic/StatisticAction.js"];

    // common
    js[js.length] = "/srims/CensorState.js";
    js[js.length] = "/srims/users/UserRoleType.js";
    js[js.length] = "/srims/component/ProvinceCityPanel.js";

    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";

    js[js.length] = "/srims/experts/Department.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";

    js[js.length] = "/srims/bases/Base.js";
    js[js.length] = "/srims/bases/BaseStore.js";
    js[js.length] = "/srims/bases/BaseXmlReader.js";

    // project statistic
    js[js.length] = "/srims/type/ProjectRank.js";
    js[js.length] = "/srims/type/ProjectRankXmlReader.js";
    js[js.length] = "/srims/type/ProjectRankStore.js";
    js[js.length] = "/srims/type/ProjectType.js";
    js[js.length] = "/srims/type/ProjectTypeXmlReader.js";
    js[js.length] = "/srims/type/ProjectTypeStore.js";
    js[js.length] = "/srims/type/ProjectSupportCategory.js";
    js[js.length] = "/srims/type/ProjectSupportCategoryXmlReader.js";
    js[js.length] = "/srims/type/ProjectSupportCategoryStore.js";
    js[js.length] = "/srims/type/ProjectSupportField.js";
    js[js.length] = "/srims/type/ProjectSupportFieldXmlReader.js";
    js[js.length] = "/srims/type/ProjectSupportFieldStore.js";
    js[js.length] = "/srims/type/ProjectSupportSubField.js";
    js[js.length] = "/srims/type/ProjectSupportSubFieldXmlReader.js";
    js[js.length] = "/srims/type/ProjectSupportSubFieldStore.js";
    js[js.length] = "/srims/type/ProjectSubjectNature.js";

    js[js.length] = "/srims/projects/ProjectComponentID.js";
    js[js.length] = "/srims/projects/ProjectLevel.js";
    js[js.length] = "/srims/projects/ProjectState.js";
    js[js.length] = "/srims/projects/Project.js";
    js[js.length] = "/srims/projects/ProjectStore.js";
    js[js.length] = "/srims/projects/ProjectXmlReader.js";
    js[js.length] = "/srims/projects/ProjectHistoryState.js";
    js[js.length] = "/srims/projects/ProjectHistoryStateStore.js";
    js[js.length] = "/srims/projects/ProjectHistoryStateXmlReader.js";
    js[js.length] = "/srims/projects/projectQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/projects/projectQueryWindow_TypePanel.js";
    js[js.length] = "/srims/projects/projectQueryWindow_FundPanel.js";

    // paper statistic
    js[js.length] = "/srims/papers/Language.js";
    js[js.length] = "/srims/papers/PublishType.js";
    js[js.length] = "/srims/papers/PaperIndexedType.js";
    js[js.length] = "/srims/papers/PaperType.js";
    js[js.length] = "/srims/papers/SignUnit.js";

    js[js.length] = "/srims/papers/Magazine.js";
    js[js.length] = "/srims/papers/MagazineXmlReader.js";
    js[js.length] = "/srims/papers/MagazineStore.js";

    js[js.length] = "/srims/papers/MagazineInformation.js";
    js[js.length] = "/srims/papers/MagazineInformationStore.js";
    js[js.length] = "/srims/papers/MagazineInformationXmlReader.js";
    js[js.length] = "/srims/papers/MagazineQueryWindow_InforPanel.js";

    js[js.length] = "/srims/papers/Paper.js";
    js[js.length] = "/srims/papers/LiberalArtsPaper.js";

    js[js.length] = "/srims/papers/PaperAuthor.js";
    js[js.length] = "/srims/papers/PaperAuthorStore.js";
    js[js.length] = "/srims/papers/PaperAuthorXmlReader.js";

    js[js.length] = "/srims/papers/PaperQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/papers/PaperQueryWindow_ExpertPanel.js";
    js[js.length] = "/srims/papers/PaperQueryWindow_MagazinePanel.js";
    js[js.length] = "/srims/papers/PaperQueryWindow_OtherPanel.js";

    // award
    js[js.length] = "/srims/awards/Award.js";
    js[js.length] = "/srims/awards/AwardStore.js";
    js[js.length] = "/srims/awards/AwardReader.js";
    js[js.length] = "/srims/awards/AwardWinner.js";
    js[js.length] = "/srims/awards/AwardWinnerStore.js";
    js[js.length] = "/srims/awards/AwardWinnerReader.js";

    js[js.length] = "/srims/awards/AwardQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/awards/AwardQueryWindow_ExpertPanel.js";

    // patent
    js[js.length] = "/srims/patents/Patent.js";
    js[js.length] = "/srims/patents/PatentStore.js";
    js[js.length] = "/srims/patents/PatentReader.js";
    js[js.length] = "/srims/patents/PatentAction.js";

    js[js.length] = "/srims/patents/PatentInventer.js";
    js[js.length] = "/srims/patents/PatentInventerStore.js";
    js[js.length] = "/srims/patents/PatentInventerReader.js";

    js[js.length] = "/srims/patents/PatentAgency.js";
    js[js.length] = "/srims/patents/PatentAgencyStore.js";
    js[js.length] = "/srims/patents/PatentAgencyReader.js";

    js[js.length] = "/srims/patents/PatentLawState.js";
    js[js.length] = "/srims/patents/PatentLevel.js";
    js[js.length] = "/srims/patents/PatentType.js";

    js[js.length] = "/srims/patents/PatentQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/patents/PatentQueryWindow_ExpertPanel.js";

    // statistic
    js[js.length] = "/srims/statistic/Store.js";
    js[js.length] = "/srims/statistic/DateTimeForm.js";
    js[js.length] = "/srims/statistic/FundDescendDateTimeForm.js";
    js[js.length] = "/srims/statistic/DimensionSelectForm.js";
    js[js.length] = "/srims/statistic/ProjectStatisticWindow.js";
    js[js.length] = "/srims/statistic/FundTotalStatisticWindow.js";
    js[js.length] = "/srims/statistic/FundDescendStatisticWindow.js";
    js[js.length] = "/srims/statistic/VoucherStatisticWindow.js";
    js[js.length] = "/srims/statistic/ProjectCountStatisticWindow.js";
    js[js.length] = "/srims/statistic/PaperStatisticWindow.js";
    js[js.length] = "/srims/statistic/PatentStatisticWindow.js";
    js[js.length] = "/srims/statistic/AwardStatisticWindow.js";
    js[js.length] = "/srims/statistic/VoucherInformationForm.js";

    Srims.Load.loadJs(js, '统计模块', function() {
        eval(callbackFunctionString)
    });
}
Srims.Load.loadMessageModule = function(callbackFunctionString) {
    if (Srims.Load.isMessageLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isMessageLoad = true;

    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/message.js", "短消息模块", function() {
            eval(callbackFunctionString)
        })
        return;
    }

    // load message js
    var js = ["/srims/users/Message.js"];

    js[js.length] = "/srims/users/MessageXmlReader.js";
    js[js.length] = "/srims/users/MessageStore.js";

    js[js.length] = "/srims/users/MessageGridPanel.js";
    js[js.length] = "/srims/users/MessageGridPanel_ColumnModel.js";
    js[js.length] = "/srims/users/MessageGridPanel_ToolBar.js";

    js[js.length] = "/srims/users/MessageEditWindow.js";
    js[js.length] = "/srims/users/MessageEditWindow_BasicForm.js";
    js[js.length] = "/srims/users/MessageEditWindow_ContentForm.js";

    js[js.length] = "/srims/users/MessageShowWindow.js";
    js[js.length] = "/srims/users/MessageShowWindow_BasicForm.js";
    js[js.length] = "/srims/users/MessageShowWindow_ContentForm.js";

    js[js.length] = "/srims/users/MessageAction.js";

    Srims.Load.loadJs(js, '短消息模块', function() {
        eval(callbackFunctionString)
    });
}
Srims.Load.loadSubjectModule = function(callbackFunctionString) {

    if (Srims.Load.isSubjectLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isSubjectLoad = true;

    Ext.namespace('Srims.subjects');
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/subject.js", '学科模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }
    // load subject js
    var js = ["/srims/common/subject.js"];

    js[js.length] = "/srims/common/SubjectAction.js";
    js[js.length] = "/srims/common/SubjectFirstLevel.js";
    js[js.length] = "/srims/common/SubjectFirstLevelEditWindow.js";
    js[js.length] = "/srims/common/SubjectFirstLevelGridPanel.js";
    js[js.length] = "/srims/common/SubjectFirstLevelGridPanel_ColumnModel.js";
    js[js.length] = "/srims/common/SubjectFirstLevelGridPanel_GridFilters.js";
    js[js.length] = "/srims/common/SubjectFirstLevelGridPanel_ToolBar.js";
    js[js.length] = "/srims/common/SubjectFirstLevelStore.js";
    js[js.length] = "/srims/common/SubjectFirstLevelXmlReader.js";
    js[js.length] = "/srims/common/SubjectFirstLevelList.js";

    js[js.length] = "/srims/common/SubjectSecondLevelStore.js";
    js[js.length] = "/srims/common/SubjectSecondLevelGridPanel.js";
    js[js.length] = "/srims/common/SubjectSecondLevelGridPanel_ColumnModel.js";
    js[js.length] = "/srims/common/SubjectSecondLevelGridPanel_GridFilters.js";
    js[js.length] = "/srims/common/SubjectSecondLevelGridPanel_ToolBar.js";
    js[js.length] = "/srims/common/SubjectSecondEditWindow.js";
    js[js.length] = "/srims/common/SubjectSecondLevel.js";
    js[js.length] = "/srims/common/SubjectSecondLevelXmlReader.js";
    js[js.length] = "/srims/common/SubjectSecondLevelList.js";

    Srims.Load.loadJs(js, '学科模块', function() {
        eval(callbackFunctionString)
    });
}
// 提示文本模块
Srims.Load.loadNoticeTextModule = function(callbackFunctionString) {
    if (Srims.Load.isNoticeTextLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isNoticeTextLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/NoticeText.js", '提示文本管理', function() {
            eval(callbackFunctionString)
        });
        return;
    }
    // load noticeText js
    var js = ["/srims/common/noticeText.js"];
    js[js.length] = "/srims/common/NoticeTextManage.js";
    js[js.length] = "/srims/common/NoticeTextManagePanel.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextTypeStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";
    js[js.length] = "/srims/common/NoticeTextInforManage.js";
    js[js.length] = "/srims/common/NoticeTextInforManageForAddText.js";

    Srims.Load.loadJs(js, '提示文本管理', function() {
        eval(callbackFunctionString)
    })
}
// 系统设置模块
Srims.Load.LoadSystemSettingModel = function(callbackFunctionString) {
    if (Srims.Load.isSystemSettingLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isSystemSettingLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/systemSetting.js", '系统设置模块',
				function() {

				    eval(callbackFunctionString)
				});
        return;
    }
    // load system setting js
    var js = ["/srims/common/SystemSetting.js"];
    js[js.length] = "/srims/common/SystemSettingAction.js";
    js[js.length] = "/srims/common/SystemSettingWindow.js";
    js[js.length] = "/srims/common/SystemSettingWindow_FundForm.js";
    js[js.length] = "/srims/common/SystemSettingWindow_AdminRateForm.js";
    js[js.length] = "/srims/common/SystemSettingWindow_SendMaillForm.js";
    js[js.length] = "/srims/common/SystemSettingWindow_WindowsServerForm.js";
    js[js.length] = "/srims/common/SystemSettingWindowsServiceStore.js";
    js[js.length] = "/srims/common/SystemSettingStore.js";
    js[js.length] = "/srims/common/SystemSettingXmlReader.js";
    js[js.length] = "/srims/common/SystemSettingWindow_PaperDescriptionForm.js";

    Srims.Load.loadJs(js, '系统设置模块', function() {
        eval(callbackFunctionString)
    })
}
// 部门模块
Srims.Load.loadDepartmentModel = function(callbackFunctionString) {
    if (Srims.Load.isDepartmentLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isDepartmentLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/department.js", '部门模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }
    // load department js
    var js = ["/srims/experts/Department.js"];

    js[js.length] = "/srims/experts/DepartmentGridPanel_ColumnModel.js";
    js[js.length] = "/srims/experts/DepartmentGridPanel.js";
    js[js.length] = "/srims/experts/DepartmentList.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";
    js[js.length] = "/srims/experts/DepartmentGridPanel_GridFilters.js";
    js[js.length] = "/srims/experts/DepartmentGridPanel_ToolBar.js";
    js[js.length] = "/srims/experts/DepartmentAction.js";
    js[js.length] = "/srims/experts/DepartmentEditWindow.js";

    Srims.Load.loadJs(js, '部门模块', function() {
        eval(callbackFunctionString)
    })
}
// 日志模块
Srims.Load.loadLogModel = function(callbackFunctionString) {
    if (Srims.Load.isLogLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isLogLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/log.js", '日志模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }

    // load log js
    var js = ["/srims/common/Log.js"];
    js[js.length] = "/srims/data/IDValueRecord.js";
    js[js.length] = "/srims/data/XmlStore.js";
    js[js.length] = "/srims/data/XmlReader.js";
    js[js.length] = "/srims/data/Entity.js";

    js[js.length] = "/srims/common/LogGridPanel.js";
    js[js.length] = "/srims/common/LogGridPanel_ColumnModel.js";
    js[js.length] = "/srims/common/LogGridPanel_GridFilters.js";
    js[js.length] = "/srims/common/LogGridPanel_ToolBar.js"
    js[js.length] = "/srims/common/LogShowPanel.js"
    js[js.length] = "/srims/common/LogList.js";
    js[js.length] = "/srims/common/LogXmlReader.js";
    js[js.length] = "/srims/common/LogStore.js";
    js[js.length] = "/srims/common/LogAction.js";
    js[js.length] = "/srims/common/LogSetPanel.js";
    js[js.length] = "/srims/common/LogcheckBoxGroupModelStore.js";
    js[js.length] = "/srims/common/LogSetPanel_UserForm.js";
    js[js.length] = "/srims/common/LogSetPanel_ProjectForm.js";
    js[js.length] = "/srims/common/LogSetPanel_TextForm.js";
    js[js.length] = "/srims/common/LogSetPanel_TypeForm.js";
    js[js.length] = "/srims/common/LogSetPanel_FundForm.js";
    js[js.length] = "/srims/common/LogSetPanel_PaperForm.js";
    js[js.length] = "/srims/common/LogSetPanel_PatentForm.js";
    js[js.length] = "/srims/common/LogSetPanel_AwardForm.js";
    js[js.length] = "/srims/common/LogSetPanel_BaseForm.js";
    js[js.length] = "/srims/common/LogSetPanel_CommonForm.js";
    js[js.length] = "/srims/common/LogSetPanel_ExpertsForm.js";
    js[js.length] = "/srims/common/LogSetPanel_StampForm.js";
    js[js.length] = "/srims/common/SystemSettingStore.js";
    js[js.length] = "/srims/common/SystemSettingXmlReader.js";
    js[js.length] = "/srims/common/LogQueryWindow_InforPanel.js";
    js[js.length] = "/srims/common/LogQueryWindow.js";
    js[js.length] = ["/srims/common/SystemSetting.js"];

    Srims.Load.loadJs(js, '日志模块', function() {
        eval(callbackFunctionString)
    })
}
Srims.Load.loadUserModule = function(callbackFunctionString) {
    if (Srims.Load.isUserLoad) {
        eval(callbackFunctionString);
        return;
    }

    Srims.Load.isUserLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/user.js", "用户模块", function() {
            eval(callbackFunctionString)
        })
        return;
    }

    // load user js
    var js = ["/srims/users/User.js"];
    js[js.length] = "/srims/users/UserStore.js";
    js[js.length] = "/srims/users/UserXmlReader.js";

    js[js.length] = "/srims/users/UserRole.js";
    js[js.length] = "/srims/users/UserRoleStore.js";
    js[js.length] = "/srims/users/UserRoleXmlReader.js";
    js[js.length] = "/srims/users/UserRoleType.js";
    js[js.length] = "/srims/users/UserPermissionItem.js";

    js[js.length] = "/srims/users/UserGridPanel.js";
    js[js.length] = "/srims/users/UserGridPanel_ColumnModel.js";
    js[js.length] = "/srims/users/UserGridPanel_GridFilters.js";
    js[js.length] = "/srims/users/UserGridPanel_ToolBar.js";

    js[js.length] = "/srims/users/UserPermissionEditPanel.js";
    js[js.length] = "/srims/users/UserPermissionEditPanel_PermisssionManage.js";
    js[js.length] = "/srims/users/UserPermissionEditPanel_CustomPermission_PermissionNormal.js";
    js[js.length] = "/srims/users/UserPermissionEditPanel_CustomPermission_PermissionByType.js";
    js[js.length] = "/srims/users/UserPermissionEditPanel_CustomPermission_PermissionByType_Show.js";
    js[js.length] = "/srims/users/UserPermissionEditPanel_CustomPermission_PermissionByType_Edit.js";
    js[js.length] = "/srims/users/UserPermissionEditPanel_CustomPermission.js";

    js[js.length] = "/srims/users/UserAppointCollegeAdministratorGridPanel.js";
    js[js.length] = "/srims/users/AppointCollegeAdministrator.js";

    js[js.length] = "/srims/users/UserTemporaryAuthorizationPanel.js";
    js[js.length] = "/srims/users/UserTemporaryAuthorizationPanel_NormalPermission.js";
    js[js.length] = "/srims/users/UserTemporaryAuthorizationPanel_ManageProjectsByType.js";
    js[js.length] = "/srims/users/UserTemporaryAuthorizationPanel_ManageProjectsByType_Show.js";
    js[js.length] = "/srims/users/UserTemporaryAuthorizationPanel_ManageProjectsByType_Edit.js";
    js[js.length] = "/srims/users/UserTemporaryAuthorizationPanel_EndDate.js";

    js[js.length] = "/srims/users/UserBasicInformationEditWindow.js";

    js[js.length] = "/srims/users/UserTemporaryPermission.js";
    js[js.length] = "/srims/users/UserTemporaryPermissionStore.js";
    js[js.length] = "/srims/users/UserTemporaryPermissionXmlReader.js";

    js[js.length] = "/srims/users/UserRetractTemporaryAuthorizationGridPanel.js";
    js[js.length] = "/srims/users/UserRetractTemporaryAuthorizationGridPanel_ColumnModel.js";
    js[js.length] = "/srims/users/UserRetractTemporaryAuthorizationGridPanel_ToolBar.js";

    js[js.length] = "/srims/users/ActiveUsersGridPanel.js";
    js[js.length] = "/srims/users/ActiveUsersGridPanel_ToolBar.js";

    js[js.length] = "/srims/users/UserLockEditWindow.js";

    js[js.length] = "/srims/users/UserAction.js";

    Srims.Load.loadJs(js, '用户模块', function() {
        eval(callbackFunctionString)
    });
}
// 专家模块
Srims.Load.loadExpertModule = function(callbackFunctionString) {
    if (Srims.Load.isExpertLoad) {
        eval(callbackFunctionString);
        return;
    }

    Srims.Load.isExpertLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/expert.js", "专家模块", function() {
            eval(callbackFunctionString)
        })
        return;
    }

    // load expert js
    var js = ["/srims/experts/Expert.js"];

    js[js.length] = "/srims/common/subject.js";

    js[js.length] = "/srims/component/NoticeTextComboBox.js";

    js[js.length] = "/srims/experts/Department.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";

    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";

    js[js.length] = "/srims/experts/ExpertStore.js";
    js[js.length] = "/srims/experts/ExpertXmlReader.js";

    js[js.length] = "/srims/experts/ExpertGridPanel.js";
    js[js.length] = "/srims/experts/ExpertGridPanel_GridFilters.js";
    js[js.length] = "/srims/experts/ExpertGridPanel_ColumnModel.js";
    js[js.length] = "/srims/experts/ExpertGridPanel_ToolBar.js";
    js[js.length] = "/srims/experts/ExpertExport_Column.js";

    js[js.length] = "/srims/experts/ExpertProject.js";
    js[js.length] = "/srims/experts/ExpertProjectStore.js";
    js[js.length] = "/srims/experts/ExpertProjectXmlReader.js";

    js[js.length] = "/srims/experts/ExpertAward.js";
    js[js.length] = "/srims/experts/ExpertAwardStore.js";
    js[js.length] = "/srims/experts/ExpertAwardXmlReader.js";

    js[js.length] = "/srims/experts/ExpertPaper.js";
    js[js.length] = "/srims/experts/ExpertPaperStore.js";
    js[js.length] = "/srims/experts/ExpertPaperXmlReader.js";

    js[js.length] = "/srims/experts/ExpertLiberalArtsPaper.js";
    js[js.length] = "/srims/experts/ExpertLiberalArtsPaperStore.js";
    js[js.length] = "/srims/experts/ExpertLiberalArtsPaperXmlReader.js";
    js[js.length] = "/srims/papers/LiberalArtsPaperXmlReader.js";

    js[js.length] = "/srims/experts/ExpertPatent.js";
    js[js.length] = "/srims/experts/ExpertPatentStore.js";
    js[js.length] = "/srims/experts/ExpertPatentXmlReader.js";

    js[js.length] = "/srims/experts/ExpertShowPanel.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_ToolBar.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_Basic.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_ParticipantProjects_ColumnModel.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_ParticipantProjects.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_ChargeProjects_ColumnModel.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_ChargeProjects.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_Awards.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_Awards_ColumnModel.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_Papers.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_Papers_ColumnModel.js";

    js[js.length] = "/srims/experts/ExpertShowPanel_LiberalArtsPapers.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_LiberalArtsPapers_ColumnModel.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_Patents.js";
    js[js.length] = "/srims/experts/ExpertShowPanel_Patents_ColumnModel.js";

    js[js.length] = "/srims/experts/ExpertQueryPanel.js";
    js[js.length] = "/srims/experts/ExpertQueryPanel_Basic.js";
    js[js.length] = "/srims/experts/ExpertQueryPanel_Award.js";
    js[js.length] = "/srims/papers/PaperIndexedType.js";
    js[js.length] = "/srims/experts/ExpertQueryPanel_Paper.js";
    js[js.length] = "/srims/patents/PatentLawState.js";
    js[js.length] = "/srims/patents/PatentType.js";
    js[js.length] = "/srims/experts/ExpertQueryPanel_Patent.js";
    js[js.length] = "/srims/projects/ProjectLevel.js";
    js[js.length] = "/srims/projects/ProjectState.js";
    js[js.length] = "/srims/experts/ExpertQueryPanel_Project.js";
    js[js.length] = "/srims/experts/ExpertQueryPanel_Project_Basic.js";
    js[js.length] = "/srims/experts/ExpertQueryPanel_Project_Fund.js";
    js[js.length] = "/srims/experts/ExpertQueryPanel_Statistic.js";
    js[js.length] = "/srims/experts/SexType.js";
    js[js.length] = "/srims/component/RadioGroup.js";

    js[js.length] = "/srims/experts/ExpertEditPanel.js";
    js[js.length] = "/srims/experts/ExpertEditPanel_Basic.js";
    js[js.length] = "/srims/experts/ExpertLinkWayEditWindow.js";
    js[js.length] = "/srims/experts/ExpertLinkWayWindow_LinkWayForm.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_TextField.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_TextArea.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_NumberField.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_DateField.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_EntityComboBox.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_Label.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_NoticeTextComboBox.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_ComboBox.js";
    js[js.length] = "/srims/experts/ExpertEditPanel_MessagePanel.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_LinkedEntityComboBox.js";
    js[js.length] = "/srims/experts/ExpertEdit_Administrator_LanguageNoticeTextComboBox.js";

    js[js.length] = "/srims/experts/ExpertInfoHistory.js";
    js[js.length] = "/srims/experts/ExpertInfoHistoryStore.js";
    js[js.length] = "/srims/experts/ExpertInfoHistoryXmlReader.js";

    js[js.length] = "/srims/experts/ExpertInfoHistoryGridPanel.js";
    js[js.length] = "/srims/experts/ExpertInfoHistoryGridPanel_ColumnModel.js";
    js[js.length] = "/srims/experts/ExpertInfoHistoryGridPanel_ToolBar.js";
    js[js.length] = "/srims/experts/ExpertInfoHistoryPropertyValueType.js";
    js[js.length] = "/srims/experts/ExpertInfoHistoryShowWindow.js";

    js[js.length] = "/srims/experts/ExpertAction.js";

    js[js.length] = "/srims/component/ImportWindow.js";

    Srims.Load.loadJs(js, '专家模块', function() {
        eval(callbackFunctionString)
    });
}
// 财务模块
Srims.Load.loadFinanceModule = function(callbackFunctionString) {

    if (Srims.Load.isFinanceLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isFinanceLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/finance.js", '财务模块', function() {
            eval(callbackFunctionString);
        });
        return;
    }

    // load finance js
    var js = ["/srims/fund/Finance.js"];
    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";

    js[js.length] = "/srims/finance/FinanceBak.js";
    js[js.length] = "/srims/finance/FinanceBakXmlReader.js";
    js[js.length] = "/srims/finance/FinanceBakStore.js";
    js[js.length] = "/srims/finance/FinanceBakGridPanel_ColumnModel.js";
    js[js.length] = "/srims/finance/FinanceBakGridPanel_ToolBar.js";
    js[js.length] = "/srims/finance/FinanceBakGridPanel.js";
    js[js.length] = "/srims/finance/FinanceBakExport_Column.js";
    js[js.length] = "/srims/finance/VoucherExport_Column.js";

    js[js.length] = "/srims/fund/FinanceGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FinanceGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/FinanceGridPanel.js";
    js[js.length] = "/srims/fund/FinanceStore.js";
    js[js.length] = "/srims/fund/FinanceXmlReader.js";
    js[js.length] = "/srims/fund/FinanceQueryWindow_InforPanel.js";
    js[js.length] = "/srims/fund/FinanceQueryWindow.js";
    js[js.length] = "/srims/fund/FinanceAction.js";
    js[js.length] = "/srims/fund/FinanceShowForm.js";

    js[js.length] = "/srims/fund/FundAllocation.js";
    js[js.length] = "/srims/fund/FundAllocationXmlReader.js";
    js[js.length] = "/srims/fund/FundAllocationStore.js";
    js[js.length] = "/srims/fund/FundAllocationState.js";
    js[js.length] = "/srims/fund/FundAllocationShowPanel_BasicForm.js";
    js[js.length] = "/srims/fund/FundAllocationGridPanel_ColumnModel.js";

    js[js.length] = "/srims/fund/Voucher.js";
    js[js.length] = "/srims/fund/VoucherAction.js";
    js[js.length] = "/srims/fund/VoucherXmlReader.js";
    js[js.length] = "/srims/fund/VoucherStore.js";
    js[js.length] = "/srims/fund/VoucherState.js";
    js[js.length] = "/srims/fund/VoucherGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/VoucherGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/VoucherGridPanel.js";
    js[js.length] = "/srims/fund/VoucherQueryWindow_InforPanel.js";
    js[js.length] = "/srims/fund/VoucherQueryWindow.js";
    js[js.length] = "/srims/fund/VoucherOut.js";
    js[js.length] = "/srims/fund/VoucherOutXmlReader.js";
    js[js.length] = "/srims/fund/VoucherOutStore.js";
    js[js.length] = "/srims/fund/VoucherOutColumnModel.js";
    js[js.length] = "/srims/fund/VoucherStateHistory.js";
    js[js.length] = "/srims/fund/VoucherStateHistoryColumnModel.js";
    js[js.length] = "/srims/fund/VoucherStateHistoryXmlReader.js";
    js[js.length] = "/srims/fund/VoucherStateHistoryStore.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_BasicForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_ToolBar.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_StateHistoryForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_FundAllocationForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_VoucherOutForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel_FinanceForm.js";
    js[js.length] = "/srims/fund/VoucherShowPanel.js";

    js[js.length] = "/srims/finance/FinanceAction.js";
    js[js.length] = "/srims/finance/FinanceInvoiceEditWindow.js";
    js[js.length] = "/srims/finance/VoucherFinanceAllocatieWindow.js";

    Srims.Load.loadJs(js, '财务模块', function() {

        eval(callbackFunctionString)
    });
}
// 类型模块
Srims.Load.loadTypeModel = function(callbackFunctionString) {
    if (Srims.Load.isTypeLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isTypeLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/typeManage.js", '类型模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }

    // load type js
    var js = ["/srims/type/ProjectForm.js"];
    js[js.length] = ["/srims/type/TypeAction.js"];

    js[js.length] = ["/srims/documents/DocumentModelEditWindow.js"];
    js[js.length] = ["/srims/documents/DocumentModelEditWindow_projectTypeSelectForm.js"];
    js[js.length] = ["/srims/documents/DocumentModelEditWindow_documentTypeSelectForm.js"];
    js[js.length] = ["/srims/documents/DocumentModelEditWindow_documentTypeModelPanel.js"];

    js[js.length] = ["/srims/documents/DocumentModel.js"];
    js[js.length] = ["/srims/documents/DocumentModelXmlReader.js"];
    js[js.length] = ["/srims/documents/DocumentModelStore.js"];

    js[js.length] = ["/srims/documents/DocumentModelManageWindow.js"];
    js[js.length] = ["/srims/documents/DocumentModelGridPanel.js"];
    js[js.length] = ["/srims/documents/DocumentModelGridPanel_Toolbar.js"];
    js[js.length] = ["/srims/documents/DocumentModelGridPanel_ColumnModel.js"];
    js[js.length] = ["/srims/documents/DocumentModelUpLoadWindow.js"];

    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";
    js[js.length] = ["/srims/type/ProjectRank.js"];
    js[js.length] = ["/srims/type/ProjectRankStore.js"];
    js[js.length] = ["/srims/type/ProjectRankXmlReader.js"];
    js[js.length] = ["/srims/type/ProjectSupportCategory.js"];
    js[js.length] = ["/srims/type/ProjectSupportCategoryStore.js"];
    js[js.length] = ["/srims/type/ProjectSupportCategoryXmlReader.js"];
    js[js.length] = ["/srims/type/ProjectSupportField.js"];
    js[js.length] = ["/srims/type/ProjectSupportFieldStore.js"];
    js[js.length] = ["/srims/type/ProjectSupportFieldXmlReader.js"];
    js[js.length] = ["/srims/type/ProjectSupportSubField.js"];
    js[js.length] = ["/srims/type/ProjectSupportSubFieldStore.js"];
    js[js.length] = ["/srims/type/ProjectSupportSubFieldXmlReader.js"];
    js[js.length] = ["/srims/type/ProjectType.js"];
    js[js.length] = ["/srims/type/ProjectTypeGridPanel_ColumnModel.js"];
    js[js.length] = ["/srims/type/ProjectTypeGridPanel_Filter.js"];
    js[js.length] = ["/srims/type/ProjectTypeGridPanel_ToolBar.js"];
    js[js.length] = ["/srims/type/ProjectTypeGridPanel.js"];
    js[js.length] = ["/srims/type/ProjectTypeStore.js"];
    js[js.length] = ["/srims/type/ProjectTypeXmlReader.js"];
    js[js.length] = ["/srims/type/ProjectTypeQueryWindow_InforPanel.js"];
    js[js.length] = ["/srims/type/ProjectTypeQueryWindow.js"];
    js[js.length] = ["/srims/type/ProjectSupportCategoryGridPanel_ColumnModel.js"];
    js[js.length] = ["/srims/type/ProjectSupportFieldGridPanel_ColumnModel.js"];
    js[js.length] = ["/srims/type/ProjectTypeShowPanel_BasicForm.js"];
    js[js.length] = ["/srims/type/ProjectTypeShowPanel_ProjectSupportCategoryForm.js"];
    js[js.length] = ["/srims/type/ProjectTypeShowPanel_ProjectSupportFieldForm.js"]
    js[js.length] = ["/srims/type/ProjectTypeShowPanel_ToolBar.js"];
    js[js.length] = ["/srims/type/ProjectTypeShowPanel.js"];
    js[js.length] = ["/srims/type/ProjectTypeEditWindow_BasicForm.js"]
    js[js.length] = ["/srims/type/ProjectTypeEditWindow.js"];
    js[js.length] = ["/srims/type/ProjectSupportCategoryGridPanel_ToolBar.js"];
    js[js.length] = ["/srims/type/ProjectSupportCategoryGridPanel.js"]
    js[js.length] = ["/srims/type/ProjectSupportCategoryManageWindow.js"];
    js[js.length] = ["/srims/type/ProjectSupportCategoryEditWindow.js"];
    js[js.length] = ["/srims/type/ProjectSupportFieldGridPanel_ToolBar.js"];
    js[js.length] = ["/srims/type/ProjectSupportFieldGridPanel.js"]
    js[js.length] = ["/srims/type/ProjectSupportFieldManageWindow.js"];
    js[js.length] = ["/srims/type/ProjectSupportFieldEditWindow.js"];
    js[js.length] = ["/srims/type/ProjectSupportSubFieldGridPanel_ColumnModel.js"];
    js[js.length] = ["/srims/type/ProjectSupportSubFieldGridPanel_ToolBar.js"];
    js[js.length] = ["/srims/type/ProjectSupportSubFieldGridPanel.js"]
    js[js.length] = ["/srims/type/ProjectSupportSubFieldManageWindow.js"];
    js[js.length] = ["/srims/type/ProjectSupportSubFieldEditWindow.js"];
    js[js.length] = "/srims/type/ProjectSubjectNature.js";

    // 管理费比例管理
    js[js.length] = ["/srims/type/MangementFees.js"];
    js[js.length] = ["/srims/type/MangementFeesStore.js"];
    js[js.length] = ["/srims/type/ManagementFeesXmlReader.js"];
    // js[js.length] =
    // ["/srims/type/ManagementFeesComponent_GetAllManagementFees.js"];

    js[js.length] = ["/srims/type/ManagementFeesGridPanel.js"];
    js[js.length] = ["/srims/type/ManagementFeesGridPanel_ColumnModel.js"];
    js[js.length] = ["/srims/type/ManagementFeesGridPanel_ToolBar.js"];
    js[js.length] = ["/srims/type/ManagementFeesGridPanel_GridFilter.js"];
    js[js.length] = ["/srims/type/ManagementFeesEditWindow.js"];
    js[js.length] = ["/srims/type/ManagementFeesEditWindow_BasicForm.js"];
    js[js.length] = ["/srims/type/ManagementFeesShowPanel.js"];
    js[js.length] = ["/srims/type/ManagementFeesShowPanel_BasicForm.js"];
    js[js.length] = ["/srims/type/ManagementFeesShowPanel_ToolBar.js"];

    js[js.length] = "/srims/component/ImportWindow.js";

    Srims.Load.loadJs(js, '类型模块', function() {
        eval(callbackFunctionString)
    })
}
Srims.Load.loadStampModel = function(callbackFunctionString) {

    if (Srims.Load.isStampLoad) {
        eval(callbackFunctionString);
        return;
    }
    Srims.Load.isStampLoad = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/stamps.js", '文印模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }

    // load Stamp js
    var js = ["/srims/stamps/StampApplication.js"];

    js[js.length] = "/srims/experts/Department.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";
    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";
    js[js.length] = "/srims/component/ExpertSearch.js";

    js[js.length] = "/srims/stamps/StampAction.js";
    js[js.length] = "/srims/stamps/StampApplicationGridPanel_ColumnModel.js";
    js[js.length] = "/srims/stamps/StampApplicationGridPanel_ToolBar.js";
    js[js.length] = "/srims/stamps/StampApplicationGridPanel.js";

    js[js.length] = "/srims/stamps/StampApplicationEditPanel_ShowPanel.js";
    js[js.length] = "/srims/stamps/StampApplicationEditPanel_StuffPanel.js";
    js[js.length] = "/srims/stamps/StampApplicationEditPanel_BasicForm.js";
    js[js.length] = "/srims/stamps/StampApplicationEditPanel_StuffGridForm.js";
    js[js.length] = "/srims/stamps/StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel.js";
    js[js.length] = "/srims/stamps/StampApplicationEditPanel_StuffStampEditGridPanel.js";
    js[js.length] = "/srims/stamps/StampApplicationEditPanel_StuffStampForm.js";
    js[js.length] = "/srims/stamps/StampApplicationEditPanel.js";

    js[js.length] = "/srims/stamps/StampApplicationEditWindow_InforForm.js";
    js[js.length] = "/srims/stamps/StampApplicationEditWindow.js";
    js[js.length] = "/srims/stamps/StampApplicationShowPanel_BasicForm.js";
    js[js.length] = "/srims/stamps/StampApplicationShowPanel_StateHistoryForm.js";
    js[js.length] = "/srims/stamps/StampApplicationShowPanel_StuffForm.js";
    js[js.length] = "/srims/stamps/StampApplicationShowPanel_ToolBar.js";
    js[js.length] = "/srims/stamps/StampApplicationShowPanel.js";
    js[js.length] = "/srims/stamps/StampApplicationQueryWindow_BasicPanel.js";
    js[js.length] = "/srims/stamps/StampApplicationQueryWindow_PrincipalPanel.js";
    js[js.length] = "/srims/stamps/StampApplicationQueryWindow.js";
    js[js.length] = "/srims/stamps/StampApplicationStore.js";
    js[js.length] = "/srims/stamps/StampApplicationXmlReader.js";
    js[js.length] = "/srims/stamps/StampState.js";
    js[js.length] = "/srims/stamps/StampStateHistory.js";
    js[js.length] = "/srims/stamps/StampStateHistoryStore.js";
    js[js.length] = "/srims/stamps/StampStateHistoryXmlReader.js";
    js[js.length] = "/srims/stamps/StampStateHistoryGridPanel_ColumnModel.js";
    js[js.length] = "/srims/stamps/Stuff.js";
    js[js.length] = "/srims/stamps/StuffStore.js";
    js[js.length] = "/srims/stamps/StuffXmlReader.js";
    js[js.length] = "/srims/stamps/StuffGridPanel_ColumnModel.js";
    js[js.length] = "/srims/stamps/StuffGridPanel_ToolBar.js";
    js[js.length] = "/srims/stamps/StuffGridPanel.js";
    js[js.length] = "/srims/stamps/StuffEditWindow.js";
    js[js.length] = "/srims/stamps/StuffManageWindow.js";
    js[js.length] = "/srims/stamps/StuffStamp.js";
    js[js.length] = "/srims/stamps/StuffStampStore.js";
    js[js.length] = "/srims/stamps/StuffStampXmlReader.js";
    js[js.length] = "/srims/stamps/StuffStampEditWindow.js";
    js[js.length] = "/srims/stamps/StuffStampGridPanel_ColumnModel.js";
    js[js.length] = "/srims/stamps/StuffStampGridPanel_ToolBar.js";
    js[js.length] = "/srims/stamps/StuffStampGridPanel.js";
    js[js.length] = "/srims/stamps/StuffStampManageWindow.js";
    js[js.length] = "/srims/stamps/Stamp.js";
    js[js.length] = "/srims/stamps/StampStore.js";
    js[js.length] = "/srims/stamps/StampXmlReader.js";
    js[js.length] = "/srims/stamps/StampGridPanel.js";
    js[js.length] = "/srims/stamps/StampGridPanel_ColumnModel.js";
    js[js.length] = "/srims/stamps/StampGridPanel_ToolBar.js";
    js[js.length] = "/srims/stamps/StampManageWindow.js";
    js[js.length] = "/srims/stamps/StampEditWindow.js";
    js[js.length] = "/srims/stamps/StampCensorRejectWindow.js";

    js[js.length] = "/srims/stamps/StampApplicationTypeAction.js";
    js[js.length] = "/srims/stamps/StampApplicationType.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeXmlReader.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeStore.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeStoreForGroup.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeGridPanel.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeGridPanel_ToolBar.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeGridPanel_ColumnModel.js";

    js[js.length] = "/srims/stamps/StampApplicationTypeEditWindow.js";
    js[js.length] = "/srims/stamps/StampAdminMemberWindow.js";
    js[js.length] = "/srims/stamps/StampAdminMemberGridPanel.js";
    js[js.length] = "/srims/stamps/StampAdminMember.js";
    js[js.length] = "/srims/stamps/StampAdminMemberXmlReader.js";
    js[js.length] = "/srims/stamps/StampAdminMemberStore.js";
    js[js.length] = "/srims/stamps/StampAdminMemberGridPanel_ColumnModel.js";
    js[js.length] = "/srims/stamps/StampAdminMemberGridPanel_ToolBar.js";
    js[js.length] = "/srims/stamps/StampAdminMemberEditWindow.js";


    js[js.length] = "/srims/stamps/StampApplicationTypeGroup.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeGroupXmlReader.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeGroupStore.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeGroupGridPanel.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeGroupGridPanel_ToolBar.js";
    js[js.length] = "/srims/stamps/StampApplicationTypeGroupGridPanel_ColumnModel.js";

    js[js.length] = "/srims/stamps/StampApplicationTypeGroupEditWindow.js";

    Srims.Load.loadJs(js, '文印模块', function() {
        eval(callbackFunctionString)
    })
}

//    
//     
//      
//    
//      



Srims.Load.loadAchieveViewModule = function(callbackFunctionString) {
    if (Srims.Load.isAchieveViewLoad) {
        eval(callbackFunctionString);
        return;
    }
    var js = ["/srims/experts/MyAchieveView.js"];
    js[js.length] = "/srims/experts/MyAchieveViewWindow.js";
    js[js.length] = "/srims/experts/MyAchieveViewWindow_BasicPanel.js";

    Srims.Load.isAchieveViewLoad = true;
    Srims.Load.loadJs(js, '我的成果', function() {
        eval(callbackFunctionString);
    });
}
Srims.Load.loadHelpModule = function(callbackFunctionString) {
    if (Srims.Load.isHelpModuleLoad) {
        eval(callbackFunctionString);
        return;
    }
    var js = ["/srims/experts/GetHelp.js"];
    js[js.length] = "/srims/experts/GetHelpWindow_BasicPanel.js";
    js[js.length] = "/srims/experts/GetHelpWindow_BasicPanelPlan.js";
    js[js.length] = "/srims/experts/GetHelpWindow_BasicPanelBase.js";
    js[js.length] = "/srims/experts/GetHelpWindow_BasicPanelexploit.js";
    js[js.length] = "/srims/experts/GetHelpWindow_BasicPanelAchieve.js";
    js[js.length] = "/srims/experts/GetHelpWindow_BasicPanelImportSpecial.js";
    js[js.length] = "/srims/experts/GetHelpWindow_BasicPanelScience.js";
    js[js.length] = "/srims/experts/GetHelpWindow.js";

    Srims.Load.isHelpModuleLoad = true;
    Srims.Load.loadJs(js, '获得帮助', function() {
        eval(callbackFunctionString);
    });
}
Srims.Load.loadChangePasswordModule = function(callbackFunctionString) {
    if (Srims.Load.isChangePasswordModuleLoad) {
        eval(callbackFunctionString);
        return;
    }
    var js = ["/srims/users/ChangePassword.js"];
    js[js.length] = "/srims/users/ChangePasswordWindow.js";

    Srims.Load.isChangePasswordModuleLoad = true;
    Srims.Load.loadJs(js, '修改密码', function() {
        eval(callbackFunctionString);
    });
};
// 外协单位
Srims.Load.loadOutsourcingModule = function(callbackFunctionString) {
    if (Srims.Load.isOutsourcingModuleload) {
        eval(callbackFunctionString);
        return;
    }
    // load Outsourcing js
    var js = ["/srims/common/Outsourcing.js"];

    js[js.length] = "/srims/component/FileUploadWindow.js";
    js[js.length] = "/srims/component/FileUploadField.js";
    js[js.length] = "/srims/common/OutsourcingVerfiyPanel.js";
    js[js.length] = "/srims/documents/ResourceAction.js";

    js[js.length] = "/srims/component/ProvinceCityPanel.js";

    js[js.length] = "/srims/projects/ProjectLevel.js";
    js[js.length] = "/srims/projects/ProjectState.js";

    js[js.length] = "/srims/experts/Department.js";
    js[js.length] = "/srims/experts/DepartmentStore.js";
    js[js.length] = "/srims/experts/DepartmentXmlReader.js";

    js[js.length] = "/srims/common/OutsourcingCensorRejectWindow.js";
    js[js.length] = "/srims/common/OutsourcingInquiryPanel_Basic.js";

    js[js.length] = "/srims/common/OutsourcingIsExistWindow.js";
    //    js[js.length] = "/srims/common/OutsourcingIsExistWindow_GridPanel.js";
    //    js[js.length] = "/srims/common/OutsourcingIsExistWindow_GridPanel_ColumnModel.js";
    js[js.length] = "/srims/common/OutsourcingIsExistWindow_InForm.js";

    js[js.length] = "/srims/common/OutsourcingInquiryPanel.js";
    js[js.length] = "/srims/common/OutsourcingXmlReader.js";
    js[js.length] = "/srims/common/OutsourcingProvinceXmlReader.js";
    js[js.length] = "/srims/common/OutsourcingProvinceCities.js";
    js[js.length] = "/srims/common/OutsourcingProvinceStore.js";
    js[js.length] = "/srims/common/OutsourcingStore.js";
    js[js.length] = "/srims/common/OutsourcingGridPanel_GridFilters.js";
    js[js.length] = "/srims/common/OutsourcingGridPanel_ColumnModel.js";
    js[js.length] = "/srims/common/OutsourcingGridPanel_ToolBar.js";
    js[js.length] = "/srims/common/OutsourcingGridPanel.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_Basic.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_Document.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_ToolBar.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_newToolBar.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_FileUpLoad.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_FileUpLoad2.js";
    js[js.length] = "/srims/common/OutsourcingEditPanel_FileUpLoad3.js";
    //carlsirce2013.5.13
    js[js.length] = "/srims/common/OutsourcingAllocation.js";
    js[js.length] = "/srims/common/OutsourcingAllocationStore.js";
    js[js.length] = "/srims/common/OutsourcingAllocationXmlReader.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo_ColumnModel.js";
    //carlsirce2013.6.22
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo_ToolBar.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo_QueryWindow.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo_QueryWindow_TypePanel.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo_GridFilters.js";

    js[js.length] = "/srims/documents/DocumentUploadWindow.js";

    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";

    js[js.length] = "/srims/common/OutsourcingCompanyType.js"; //
    js[js.length] = "/srims/common/OutsourcingEditPanel.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_ToolBar.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_Basic.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel.js";
    js[js.length] = "/srims/common/OutsourcingAction.js";

    Srims.Load.isOutsourcingModuleload = true;
    Srims.Load.loadJs(js, '外协单位管理模块', function() {
        eval(callbackFunctionString);
    });
};
// 外协单位
Srims.Load.loadOutsourcingUnitModule = function(callbackFunctionString) {
    if (Srims.Load.isOutsourcingUnitModuleload) {
        eval(callbackFunctionString);
        return;
    }
    // load Outsourcing js
    var js = ["/srims/common/OutsourcingUnit.js"];

    js[js.length] = "/srims/component/FileUploadWindow.js";
    js[js.length] = "/srims/common/OutsourcingCompanyManageType.js";
    js[js.length] = "/srims/common/OutsourcingCompanyManageTypeStore.js";
    js[js.length] = "/srims/common/OutsourcingCompanyManageTypeXmlReader.js";
    js[js.length] = "/srims/common/OutsourcingUnitXmlReader.js";
    js[js.length] = "/srims/common/OutsourcingUnitStore.js";
    js[js.length] = "/srims/common/OutsourcingUnitGridPanel_GridFilters.js";
    js[js.length] = "/srims/common/OutsourcingUnitGridPanel_ColumnModel.js";
    js[js.length] = "/srims/common/OutsourcingUnitGridPanel_ToolBar.js";
    js[js.length] = "/srims/common/OutsourcingUnitGridPanel.js";
    js[js.length] = "/srims/common/OutsourcingUnitShowPanel_ToolBar.js";
    js[js.length] = "/srims/common/OutsourcingUnitShowPanel_Basic.js";
    js[js.length] = "/srims/common/OutsourcingUnitShowPanel.js";
    js[js.length] = "/srims/common/OutsourcingUnitEditPanel_Basic.js";
    js[js.length] = "/srims/common/OutsourcingUnitExpertEditPanel_Basic.js";
    js[js.length] = "/srims/common/OutsourcingUnitEditPanel.js";
    js[js.length] = "/srims/common/OutsourcingUnitAction.js";
    //carlsirce2013.5.13
    js[js.length] = "/srims/common/OutsourcingAllocation.js";
    js[js.length] = "/srims/common/OutsourcingAllocationStore.js";
    js[js.length] = "/srims/common/OutsourcingAllocationXmlReader.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo.js";
    js[js.length] = "/srims/common/OutsourcingShowPanel_AllocationInfo_ColumnModel.js";

    Srims.Load.isOutsourcingUnitModuleload = true;
    Srims.Load.loadJs(js, '外协单位管理模块', function() {
        eval(callbackFunctionString);
    });
};
// 绩效分配
Srims.Load.loadPerformanceModule = function(callbackFunctionString) {

    if (Srims.Load.isPefomrmanceModuleload) {
        eval(callbackFunctionString);
        return;
    }

    Srims.Load.isPefomrmanceModuleload = true;
    if (Srims.Load.isLoadReleaseJs) {
        Srims.Load.loadJs("/srims/release/Performance.js", '效绩分配模块', function() {
            eval(callbackFunctionString)
        });
        return;
    }

    // load Performance js
    var js = ["/srims/performance/PerformanceAllocation.js"];
    js[js.length] = "/srims/performance/PerformanceAllocationAction.js";
    js[js.length] = "/srims/performance/PerformanceAllocationCensorWindow.js";
    js[js.length] = "/srims/performance/PerformanceAllocationCorrectDateTimeWindow.js";
    js[js.length] = "/srims/performance/PerformanceAllocationCorrectWindow.js";
    js[js.length] = "/srims/performance/PerformanceAllocationGridPanel.js";
    js[js.length] = "/srims/performance/PerformanceAllocationGridPanel_ColumnModel.js";
    js[js.length] = "/srims/performance/PerformanceAllocationGridPanel_ToolBar.js";
    js[js.length] = "/srims/performance/PerformanceAllocationQueryWindow.js";
    js[js.length] = "/srims/performance/PerformanceAllocationShowPanel.js";
    js[js.length] = "/srims/performance/PerformanceAllocationShowPanel_BasicForm.js";

    js[js.length] = "/srims/projects/RecoveryProjectGridPanel_ShowColumnModel.js";
    js[js.length] = "/srims/projects/RecoveryProjectStore.js";
    js[js.length] = "/srims/projects/RecoveryProjectXmlReader.js";
    js[js.length] = "/srims/projects/Recovery.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_RecoveryForm.js";
    js[js.length] = "/srims/performance/PerformanceAllocationShowPanel_StateHistoryForm.js";
    js[js.length] = "/srims/performance/PerformanceAllocationShowPanel_ToolBar.js";
    js[js.length] = "/srims/performance/PerformanceAllocationShowPanel_VoucherForm.js";
    js[js.length] = "/srims/performance/PerformanceAllocationShowPanel_FundMemberForm.js";
    js[js.length] = "/srims/performance/PerformanceAllocationState.js";
    js[js.length] = "/srims/performance/PerformanceAllocationStateHistory.js";
    js[js.length] = "/srims/performance/PerformanceAllocationStateHistoryGridPanel_ColumnModel.js";
    js[js.length] = "/srims/performance/PerformanceAllocationStateHistoryStore.js";
    js[js.length] = "/srims/performance/PerformanceAllocationStateHistoryXmlReader.js";
    js[js.length] = "/srims/performance/PerformanceAllocationStore.js";
    js[js.length] = "/srims/performance/PerformanceAllocationXmlReader.js";


    js[js.length] = "/srims/performance/Performance.js";
    js[js.length] = "/srims/performance/PerformanceAction.js";
    js[js.length] = "/srims/performance/PerformanceGridPanel.js";
    js[js.length] = "/srims/performance/PerformanceGridPanel_ColumnModel.js";
    js[js.length] = "/srims/performance/PerformanceGridPanel_GridFilters.js";
    js[js.length] = "/srims/performance/PerformanceGridPanel_ToolBar.js";
    js[js.length] = "/srims/performance/PerformanceQueryWindow.js";
    js[js.length] = "/srims/performance/PerformanceQueryWindow_InforPanel.js";
    js[js.length] = "/srims/performance/PerformanceShowPanel.js";
    js[js.length] = "/srims/performance/PerformanceShowPanel_BasicForm.js";
    js[js.length] = "/srims/performance/PerformanceStore.js";
    js[js.length] = "/srims/performance/PerformanceXmlReader.js";
    js[js.length] = "/srims/performance/PerformanceAllocationWindow.js",

    js[js.length] = "/srims/performance/PerformanceVoucher.js";
    js[js.length] = "/srims/performance/PerformanceVoucherStore.js";
    js[js.length] = "/srims/performance/PerformanceVoucherXmlReader.js";
    js[js.length] = "/srims/performance/PerformanceVoucherGridPanel_ToolBar.js";
    js[js.length] = "/srims/performance/PerformanceVoucherAction.js";
    js[js.length] = "/srims/performance/PerformanceVoucherEditWindow.js";
    js[js.length] = "/srims/performance/PerformanceVoucherEditWindow_InForm.js";
    js[js.length] = "/srims/performance/PerformanceVoucherGridPanel.js";
    js[js.length] = "/srims/performance/PerformanceVoucherGridPanel_ColumnModel.js";
    js[js.length] = "/srims/performance/PerformanceVoucherPrintWindow.js";
    js[js.length] = "/srims/performance/PerformanceVoucherQueryWindow_InforPanel.js";
    js[js.length] = "/srims/performance/PerformanceVoucherShowPanel.js";
    js[js.length] = "/srims/performance/PerformanceVoucherShowPanel_BasicForm.js";
    js[js.length] = "/srims/performance/PerformanceVoucherShowPanel_ToolBar.js";
    js[js.length] = "/srims/performance/PerformanceVoucherState.js";
    js[js.length] = "/srims/performance/PerformanceVoucherStateHistory.js";
    js[js.length] = "/srims/performance/PerformanceVoucherStateHistoryColumnModel.js";
    js[js.length] = "/srims/performance/PerformanceVoucherStateHistoryStore.js";
    js[js.length] = "/srims/performance/PerformanceVoucherStateHistoryXmlReader.js";
    js[js.length] = "/srims/performance/PerformanceVoucherShowPanel_StateHistoryForm.js";
    js[js.length] = "/srims/performance/PerformanceVoucherShowPanel_FundAllocationForm.js";
    js[js.length] = "/srims/performance/PerformanceVoucherShowPanel_FinanceForm.js";
    js[js.length] = "/srims/performance/PerformanceVoucherQueryWindow.js";
    js[js.length] = "/srims/performance/PerformanceVoucherEditAccountBookNumberWindow.js";
    js[js.length] = "/srims/performance/PerformanceVoucherEditAccountBookNumberWindow_InforPanel.js";
    //carlsirce 2013.5.15 新加入
    js[js.length] = "/srims/performance/PerformanceDescendManageWindow.js";
    js[js.length] = "/srims/performance/PerformanceDescendManageWindow_PerformanceAllocationPanel.js";
    js[js.length] = "/srims/performance/PerformanceDescendManageWindow_PerformanceInfoPanel.js";
    js[js.length] = "/srims/performance/PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar.js";
    js[js.length] = "/srims/performance/PerformanceDescendWindow.js";
    js[js.length] = "/srims/performance/PerformanceAllocationGridPanel_GridFilters.js";

    js[js.length] = "/srims/fund/FundMemberXmlReader.js";
    js[js.length] = "/srims/fund/FundMemberStore.js";
    js[js.length] = "/srims/fund/FundMember.js";
    js[js.length] = "/srims/fund/FundMemberGridPanel_ColumnModel.js";


    js[js.length] = "/srims/projects/Project.js";
    js[js.length] = "/srims/projects/ProjectStore.js";
    js[js.length] = "/srims/projects/ProjectXmlReader.js";
    js[js.length] = "/srims/projects/ProjectLevel.js";
    js[js.length] = "/srims/projects/ProjectState.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_ContractForm.js";
    js[js.length] = "/srims/projects/ProjectAction.js";
    js[js.length] = "/srims/projects/ProjectHistoryState.js";
    js[js.length] = "/srims/projects/ProjectHistoryStateStore.js";
    js[js.length] = "/srims/projects/ProjectHistoryStateXmlReader.js";
    js[js.length] = "/srims/projects/ProjectSetDelegatePrincipalWindow.js";
    js[js.length] = "/srims/projects/ProjectExport_Column.js";

    js[js.length] = "/srims/projects/ProjectShowPanel_BasicForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_MemberForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_TypeForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_FundForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_FundBorrowForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_FundReturnForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_PayPlanItemForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_FundAllocationForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_PerformanceAllocationForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_DocumentForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_ContractForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_StateHistoryForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_SystemForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_RemarkForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_ToolBar.js";

    //carlsirce 2013.3.25 新加入
    js[js.length] = "/srims/projects/ExpertGuideProjectOutGridPanel.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectOutGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/ExpertGuideProjectOutGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ProjectOut.js";
    js[js.length] = "/srims/projects/ProjectOutStore.js";
    js[js.length] = "/srims/projects/ProjectOutXmlReader.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_ProjectOutForm.js";
    js[js.length] = "/srims/projects/ProjectShowPanel_ProjectOutForm.js";


    js[js.length] = "/srims/projects/ProjectEditPanel_SecretProjectMessagePanel.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_BasicForm.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_TypeForm.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_FundForm.js";
    js[js.length] = "/srims/projects/ProjectEditPanel_RemarkForm.js";
    js[js.length] = "/srims/projects/ProjectEditPanel.js";

    js[js.length] = "/srims/projects/ProjectMember.js";
    js[js.length] = "/srims/projects/ProjectMemberGridPanel.js";
    js[js.length] = "/srims/projects/ProjectMemberGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectMemberStore.js";
    js[js.length] = "/srims/projects/ProjectMemberXmlReader.js";
    js[js.length] = "/srims/projects/ProjectMemberWindow.js";
    js[js.length] = "/srims/projects/ProjectMemberGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ProjectMemberEditWindow.js";
    js[js.length] = "/srims/projects/ProjectCensorRejectWindow.js";


    js[js.length] = "/srims/type/ProjectRank.js";
    js[js.length] = "/srims/type/ProjectRankXmlReader.js";
    js[js.length] = "/srims/type/ProjectRankStore.js";
    js[js.length] = "/srims/type/ProjectType.js";
    js[js.length] = "/srims/type/ProjectTypeXmlReader.js";
    js[js.length] = "/srims/type/ProjectTypeStore.js";

    js[js.length] = "/srims/fund/FundDescend.js";
    js[js.length] = "/srims/fund/FundDescendGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FundDescendState.js";
    js[js.length] = "/srims/fund/FundDescendStore.js";
    js[js.length] = "/srims/fund/FundDescendXmlReader.js";

    js[js.length] = "/srims/fund/FinanceFundDescend.js";
    js[js.length] = "/srims/fund/FinanceFundDescendGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/FinanceFundDescendStore.js";
    js[js.length] = "/srims/fund/FinanceFundDescendXmlReader.js";

    js[js.length] = "/srims/fund/PayPlanItem.js";
    js[js.length] = "/srims/fund/PayPlanItemStore.js";
    js[js.length] = "/srims/fund/PayPlanItemXmlReader.js";
    js[js.length] = "/srims/fund/PayPlanItemGridPanel.js";
    js[js.length] = "/srims/fund/PayPlanItemGridPanel_ToolBar.js";
    js[js.length] = "/srims/fund/PayPlanItemGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/PayPlanItemWindow.js";
    js[js.length] = "/srims/fund/PayPlanItemEditWindow.js";

    js[js.length] = "/srims/fund/FundAllocation.js";
    js[js.length] = "/srims/fund/FundAllocationStore.js";
    js[js.length] = "/srims/fund/FundAllocationXmlReader.js";
    js[js.length] = "/srims/fund/FundAllocationState.js";
    js[js.length] = "/srims/fund/FundAllocationGridPanel_ColumnModel.js";
    js[js.length] = "/srims/fund/VoucherGridPanel_ColumnModel.js";

    js[js.length] = "/srims/documents/Document.js";
    js[js.length] = "/srims/documents/DocumentXmlReader.js";
    js[js.length] = "/srims/documents/DocumentStore.js";
    js[js.length] = "/srims/documents/DocumentGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/DocumentGridPanel.js";
    js[js.length] = "/srims/documents/DocumentGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/DocumentCensorGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/DocumentCensorGridPanel.js";
    js[js.length] = "/srims/documents/DocumentCensorGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/DocumentWindow.js";
    js[js.length] = "/srims/documents/DocumentWindow_RequireMessage.js";
    js[js.length] = "/srims/documents/DocumentUploadWindow.js";
    js[js.length] = "/srims/documents/DocumentRequireWindow.js";
    js[js.length] = "/srims/documents/DocumentCensorRejectWindow.js";
    js[js.length] = "/srims/documents/Contract.js";
    js[js.length] = "/srims/documents/ContractXmlReader.js";
    js[js.length] = "/srims/documents/ContractStore.js";
    js[js.length] = "/srims/documents/ContractGridPanel.js";
    js[js.length] = "/srims/documents/ContractGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/ContractGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/ContractWindow.js";
    js[js.length] = "/srims/documents/ContractType.js";
    js[js.length] = "/srims/documents/ContractUploadWindow.js";
    js[js.length] = "/srims/documents/ContractCensorRejectWindow.js";
    js[js.length] = "/srims/documents/ContractCensorGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/ContractCensorGridPanel.js";
    js[js.length] = "/srims/documents/ContractCensorGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/DocumentMyUnsubmitDocumentGridPanel.js";
    js[js.length] = "/srims/documents/DocumentMyUnsubmitDocumentGridPanel_ToolBar.js";
    js[js.length] = "/srims/documents/DocumentMyUnsubmitDocumentGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/DocumentModel.js";
    js[js.length] = "/srims/documents/DocumentModelXmlReader.js";
    js[js.length] = "/srims/documents/DocumentModelStore.js";
    js[js.length] = "/srims/documents/DocumentModelManageWindow.js";
    js[js.length] = "/srims/documents/DocumentModelGridPanel.js";
    js[js.length] = "/srims/documents/DocumentModelGridPanel_Toolbar.js";
    js[js.length] = "/srims/documents/DocumentModelGridPanel_ColumnModel.js";
    js[js.length] = "/srims/documents/DocumentModelUpLoadWindow.js";
    js[js.length] = "/srims/users/UserRoleType.js";


    js[js.length] = "/srims/projects/ProjectGridPanel_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectGridPanel_MyJoinProject_ColumnModel.js";
    js[js.length] = "/srims/projects/ProjectGridPanel_GridFilters.js";
    js[js.length] = "/srims/projects/ProjectGridPanel_ToolBar.js";
    js[js.length] = "/srims/projects/ProjectGridPanel.js";




    js[js.length] = "/srims/common/NoticeText.js";
    js[js.length] = "/srims/common/NoticeTextStore.js";
    js[js.length] = "/srims/common/NoticeTextXmlReader.js";

    Srims.Load.loadJs(js, '效绩分配模块', function() {
        eval(callbackFunctionString);
    });
};