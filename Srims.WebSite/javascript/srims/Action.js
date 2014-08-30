Srims.Action = new function() {
};
Srims.Action.doAction = function(e, t) {
    e.stopEvent();
    var actionName = t.id.replace('MenuBarItem-a-', '');

    if (!Srims.Action.actions[actionName]) {
        alert('对不起，该功能尚未实现。');
        return;
    }

    Srims.Action.actions[actionName]();
};
Srims.Action.actions = {
    'project-vertical-new': function() {
        Ext.MessageBox.show({
            title: '项目是否涉密',
            msg: '您申请的项目是否涉密？<br />注意：如果项目信息涉密，请直接提交书面材料至科技处！',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            fn: function(button) {
                if (button == 'no')
                    Srims.Load.loadProjectModule('Srims.projects.newProject(false);');
                if (button == 'yes')
                    Ext.MessageBox.show({
                        title: '项目涉密',
                        msg: '请联系科技处相关负责人！',
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        fn: function(button) {
                        }
                    });
            },
            icon: Ext.MessageBox.QUESTION
        });
    },
    'project-vertical-list': function() {
        Srims.Load.loadProjectModule('Srims.projects.listVerticalProject(false);');
    },
    'project-vertical-query': function() {
        Srims.Load.loadProjectModule('Srims.projects.listVerticalProject(true);');
    },
    'project-vertical-censor-start': function() {
        Srims.Load.loadProjectModule('Srims.projects.listWaitingStartCensorVerticalProject (false);');
    },
    'project-vertical-censor-end': function() {
        Srims.Load.loadProjectModule('Srims.projects.listWaitingEndCensorVerticalProject (false);');
    },
    'project-vertical-censor-document': function() {
        Srims.Load.loadProjectModule('Srims.projects.listWaitingCenorVerticalProjecctDocuments ();');
    },
    'project-vertical-censor-contract': function() {
        Srims.Load.loadProjectModule('Srims.projects.listWaitingCenorVerticalProjecctContracts ();');
    },
    'project-vertical-censor-fund-allocation': function() {
        Srims.Load.loadFundModule('Srims.fund.listWaitingCensorFundAllocation_Vertical();');
    },
    'project-horizontal-censor-start': function() {
        Srims.Load.loadProjectModule('Srims.projects.listWaitingStartCensorHorizontalProject (false);');
    },
    'project-horizontal-censor-end': function() {
        Srims.Load.loadProjectModule('Srims.projects.listWaitingEndCensorHorizontalProject (false);');
    },
    'project-horizontal-new': function() {
        Ext.MessageBox.show({
            title: '项目是否涉密',
            msg: '您申请的项目是否涉密？<br />注意：如果项目信息涉密，请直接提交书面材料至科技处！',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            fn: function(button) {
                if (button == 'no')
                    Srims.Load.loadProjectModule('Srims.projects.newProject(true);');
                if (button == 'yes')
                    Ext.MessageBox.show({
                        title: '申请涉密项目',
                        msg: '请联系科技处相关负责人！',
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        fn: function(button) {
                        }
                    });
            },
            icon: Ext.MessageBox.QUESTION
        });
    },
    'project-horizontal-list': function() {
        Srims.Load.loadProjectModule('Srims.projects.listHorizontalProject(false);');
    },
    'project-horizontal-query': function() {
        Srims.Load.loadProjectModule('Srims.projects.listHorizontalProject(true);');
    },
    'project-horizontal-censor-document': function() {
        Srims.Load.loadProjectModule('Srims.projects.listWaitingCenorHorizontalProjecctDocuments();');
    },
    'project-horizontal-censor-contract': function() {
        Srims.Load.loadProjectModule('Srims.projects.listWaitingCenorHorizontalProjecctContracts();');
    },
    'project-horizontal-censor-fund-descend': function() {
        Srims.Load.loadFundModule('Srims.fund.listWaitingCensorFundDescend_Horizontal() ;');
    },
    'project-horizontal-censor-fund-allocation': function() {
        Srims.Load.loadFundModule('Srims.fund.listWaitingCensorFundAllocation_Horizontal();');
    },
    'project-waiting-set-delegate': function() {
        Srims.Load.loadProjectModule('Srims.projects.showWaitingSetDelegateWindow()');
    },
    'expert-simple-query': function() {
        Srims.Load.loadExpertSimpleQuery('Srims.experts.ExpertSimpleQuery.window.show();');
    },
    'project-my-project-principal': function() {
        Srims.Load.loadProjectModule('Srims.projects.listMyPrincipalProject();');
    },
    'project-my-project-join': function() {
        Srims.Load.loadProjectModule('Srims.projects.listMyParticipateProject();');
    },
    'project-my-project-delegate': function() {
        Srims.Load.loadProjectModule('Srims.projects.listMyDelegateProject();');
    },
    'expert-my-unsubmit-document': function() {
        Srims.Load.loadProjectModule('Srims.projects.listMyUnsubmitDocument()');
    },
    'announcement-list': function() {
        Srims.Load.loadAnnouncementModule('Srims.common.AnnouncementAction.listAnnouncement(false);');
    },
    'announcement-new': function() {
        Srims.Load.loadAnnouncementModule('Srims.common.AnnouncementAction.listAnnouncement(true);');
    },
    'subject-level-first': function() {
        Srims.Load.loadSubjectModule('Srims.common.listSubjectFirstLevel();');
    },
    'subject-level-second': function() {
        Srims.Load.loadSubjectModule('Srims.common.listSubjectSecondLevel();');
    },
    'user-list': function() {
        Srims.Load.loadUserModule('Srims.users.UserAction.listUser(false);');
    },
    'user-new': function() {
        Srims.Load.loadUserModule('Srims.users.UserAction.listUser(true);');
    },
    'expert-list': function() {
        Srims.Load.loadExpertModule('Srims.experts.ExpertAction.listExpert(false);')
    },
    'expert-query': function() {
        Srims.Load.loadExpertModule('Srims.experts.ExpertAction.listExpert(true);')
    },
    'expert-new': function() {
        Srims.Load.loadExpertModule('Srims.experts.ExpertAction.newExpert();')
    },
    'expert-edit-censor': function() {
        Srims.Load.loadExpertModule('Srims.experts.ExpertAction.showWaitingCensorExpertInfoHistories();')
    },
    'activeuser-list': function() {
        Srims.Load.loadUserModule('Srims.users.UserAction.listActiveUsers();');
    },
    'notoiceText-manage': function() {
        Srims.Load.loadNoticeTextModule('Srims.common.NoticeTextShowForm();');
    },
    'message-list': function() {
        Srims.Load.loadMessageModule('Srims.users.MessageAction.listMyMessages()');
    },
    'paper-new': function() {
        Srims.Load.loadPaperModule('Srims.papers.newPaper()');
    },
    'paper-list': function() {
        Srims.Load.loadPaperModule('Srims.papers.listPaper(false)');
    },
    'paper-query': function() {
        Srims.Load.loadPaperModule('Srims.papers.listPaper(true)');
    },
    'liberalartspaper-new': function() {
        Srims.Load.loadPaperModule('Srims.papers.newLiberalArtsPaper()');
    },
    'liberalartspaper-list': function() {
        Srims.Load.loadPaperModule('Srims.papers.listLiberalArtsPaper(false)');
    },
    'liberalartspaper-query': function() {
        Srims.Load.loadPaperModule('Srims.papers.listLiberalArtsPaper(true)');
    },
    'expert-my-paper': function() {
        Srims.Load.loadPaperModule('Srims.papers.listPaper(false)');
    },
    'magazine-new': function() {
        Srims.Load.loadPaperModule('Srims.papers.newMagazine()');
    },
    'magazine-list': function() {
        Srims.Load.loadPaperModule('Srims.papers.listMagazine(false)');
    },
    'magazine-query': function() {
        Srims.Load.loadPaperModule('Srims.papers.listMagazine(true)');
    },
    'patent-list': function() {
        Srims.Load.loadPatentModule('Srims.patents.listPatent(false,false);');
    },
    'patent-query': function() {
        Srims.Load.loadPatentModule('Srims.patents.listPatent(true,false);');
    },
    'patent-new': function() {
        Srims.Load.loadPatentModule('Srims.patents.listPatent(false,true);');
    },
    'patent-agency-manage': function() {
        Srims.Load.loadPatentModule('Srims.patents.listPatentAgency();');
    },
    'expert-my-patent': function() {
        Srims.Load.loadPatentModule('Srims.patents.listPatent(false,false);');
    },
    'award-list': function() {
        Srims.Load.loadAwardModule('Srims.awards.listAward(false,false);');
    },
    'award-query': function() {
        Srims.Load.loadAwardModule('Srims.awards.listAward(true,false);');
    },
    'award-new': function() {
        Srims.Load.loadAwardModule('Srims.awards.listAward(false,true);');
    },
    'award-waiting-censor-document': function() {
        Srims.Load.loadAwardModule('Srims.awards.listWaitingCensorDocument();');
    },
    'award-expert-match': function() {
        Srims.Load.loadAwardModule('Srims.awards.listAward(false,true);');
    },
    'expert-my-award': function() {
        Srims.Load.loadAwardModule('Srims.awards.listAward(false,false);');
    },
    'log-manage': function() {
        Srims.Load.loadLogModel('Srims.common.listLog();');
    },
    'statistic-project-count': function() {
        Srims.Load.loadStatisticModule('Srims.common.showViewWindow("ProjectCountStatic");');
    },
    'statistic-fund-total': function() {
        Srims.Load.loadStatisticModule('Srims.common.showViewWindow("ProjectFundTotalStatic");');
    },
    'statistic-fund-descend': function() {
        Srims.Load.loadStatisticModule('Srims.common.showViewWindow("FundDescendStatic");');
    },
    'statistic-voucher': function() {
        Srims.Load.loadStatisticModule('Srims.common.showViewWindow("FundAllocationStatic");');
    },
    'statistic-paper': function() {
        Srims.Load.loadStatisticModule('Srims.common.showViewWindow("PaperStatic");');
    },
    'statistic-patent': function() {
        Srims.Load.loadStatisticModule('Srims.common.showViewWindow("PatentStatic");');
    },
    'statistic-award': function() {
        Srims.Load.loadStatisticModule('Srims.common.showViewWindow("AwardStatic");');
    },
    'system-setting': function() {
        Srims.Load.LoadSystemSettingModel('Srims.common.systemSettingWindows();');
    },
    'fund-finance': function() {
        Srims.Load.loadFundModule('Srims.fund.listFinance()');
    },
    'fund-waiting-allocation-vertical-project': function() {
        Srims.Load.loadFundModule('Srims.fund.listWaitingAlloactionFundDescend_vertical()');
    },
    'fund-waiting-allocation-horizontal-project': function() {
        Srims.Load.loadFundModule('Srims.fund.listWaitingAlloactionFundDescend_Horizontal()');
    },
    'fund-lent': function() {
        Srims.Load.loadFundModule('Srims.fund.listFundBorrow_UnCompleteReturn()');
    },
    'expert-fund-descend': function() {
        Srims.Load.loadFundModule('Srims.fund.listMyDescendFund()');
    },
    'expert-fund-allocation': function() {
        Srims.Load.loadFundModule('Srims.fund.listMyFundDesend()');
    },
    'expert-performance-allocation': function() {
        Srims.Load.loadFundModule('Srims.fund.listMyPerformanceDesend()');
    },
    'finance-information': function() {
        Srims.Load.loadFinanceModule('Srims.finance.listFinance()');
    },
    'notice-text-manage': function() {
        Srims.Load.loadNoticeTextModule('Srims.common.noticeTextManage();')
    },
    'voucher-finance-state': function() {
        Srims.Load.loadFinanceModule('Srims.finance.listVoucherFinance()');
    },
    'fund-voucher': function() {
        Srims.Load.loadFundModule('Srims.fund.listVoucher()');
    },
    'voucher-finance-financebak': function() {
        Srims.Load.loadFinanceModule('Srims.finance.listFinanceBak()');
    },
    'fund-allocation': function() {
        Srims.Load.loadFundModule('Srims.fund.listFundAllcation()');
    },
    'department-manage': function() {
        Srims.Load.loadDepartmentModel('Srims.experts.listDepartment();');
    },
    'expert-my-voucher': function() {
        Srims.Load.loadFundModule('Srims.fund.listMyVoucher()');
    },
    'type-type': function() {
        Srims.Load.loadTypeModel('Srims.type.listProjectType()');
    },
    'type-managementfees': function() {
        Srims.Load.loadTypeModel('Srims.type.listManagementFees()');
    },
    'stamp-list': function() {
        Srims.Load.loadStampModel('Srims.stamp.listStamps(false)');
    },
    'stamp-censor': function() {
        Srims.Load.loadStampModel('Srims.stamp.listWaitingCensorStamps()');
    },
    'stamp-apply': function() {
        Srims.Load.loadStampModel('Srims.stamp.newStampApplication()');
    },
    'waitingStamp-list': function() {
        Srims.Load.loadStampModel('Srims.stamp.listWaitingStampStamps()');
    },
    'stampDepartment-censor': function() {
        Srims.Load.loadStampModel('Srims.stamp.listWaitingDepartmentCensorStamps()');
    },
    'departmentStamp-list': function() {
        Srims.Load.loadStampModel('Srims.stamp.listDepartmentStamps(false)');
    },
    'expert-stamp-apply': function() {
        Srims.Load.loadStampModel('Srims.stamp.newStampApplication()');
    },
    'expert-my-stamp': function() {
        Srims.Load.loadStampModel('Srims.stamp.listMyStamps()');
    },
    'stamp-manage': function() {
        Srims.Load.loadStampModel('Srims.stamp.showStampManageWindow()');
    },
    'expert-guid-fund-descend': function() {
        Srims.Load.loadFundModule('Srims.expertGuide.showFundDescendProcessPanel()');
    },
    'expert-guid-fund-allocation': function() {
        Srims.Load.loadFundModule('Srims.expertGuide.showFundAllocationProcessPanel()');
    },
    'achieve-view': function() {
        Srims.Load.loadAchieveViewModule('Srims.experts.myAchieveView()');
    },
    'help': function() {
        Srims.Load.loadHelpModule('Srims.experts.getHelp()');
    },
    'change-password': function() {
        Srims.Load.loadChangePasswordModule('Srims.users.changePassword()');
    },
    'magazine-Occupation': function() {
        Srims.Load.loadPaperModule('Srims.papers.listMagazineOccupation()');
    },
    'base-new': function() {
        Srims.Load.loadBaseModule('Srims.bases.listBase(true)');
    },
    'base-list': function() {
        Srims.Load.loadBaseModule('Srims.bases.listBase(false)');
    },
    'outsourcing-manage': function() {
        Srims.Load.loadOutsourcingModule('Srims.common.ListOutsourcing(false)');
    },
    'outsourcing-inquiry': function() {
        Srims.Load.loadOutsourcingModule('Srims.common.ListOutsourcing(true)');
    },
    'outsourcing-statistics': function() {
        Srims.Load.loadOutsourcingModule('Srims.common.StatisticsOutsourcing()');
    },
    'outsourcingunit-manage': function() {
        Srims.Load.loadOutsourcingUnitModule('Srims.common.ListOutsourcingUnit()');
    },
    'performance-manage': function() {
        Srims.Load.loadperformanceModule('Srims.common.ListPerformance()');
    },
    'recovery-manage': function() {
        Srims.Load.loadProjectModule('Srims.projects.listRecoveryProject();');
    },
    'performance-list': function() {
        Srims.Load.loadPerformanceModule('Srims.performance.listPerformance()');
    },
    'performanceallocation-waiting-allocation-project': function() {
        Srims.Load.loadPerformanceModule('Srims.performance.listUnallocatedPerformanceAllocation()');
    },
    'performance-allocation': function() {
        Srims.Load.loadPerformanceModule('Srims.performance.listAllPerformanceAllocation()');
    },
    'performance-voucher': function() {
        Srims.Load.loadPerformanceModule('Srims.performance.listVoucher()');
    },
    'project-horizontal-censor-performance-allocation': function() {
        Srims.Load.loadPerformanceModule('Srims.performance.listWaitingCensorPerformance_Horizontal()');
    },
    'project-vertical-censor-performance-allocation': function() {
        Srims.Load.loadPerformanceModule('Srims.performance.listWaitingCensorPerformance_Vertical()');
    },
    'stampapplication-type-group': function() {
        Srims.Load.loadStampModel('Srims.stamp.StampApplicationTypeAction.listStampApplicationTypeGroup();');
    },'stampapplication-type': function() {
        Srims.Load.loadStampModel('Srims.stamp.StampApplicationTypeAction.listStampApplicationType();');
    }
};
