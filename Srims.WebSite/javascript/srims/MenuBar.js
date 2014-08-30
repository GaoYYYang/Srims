Srims.MenuBar = new function() {
}
Srims.MenuBar.getMenuBar = function() {
    if (Srims.MenuBar._menuBar)
        return Srims.MenuBar._menuBar;

    Srims.MenuBar._menuBar = new Ext.Panel({
        region: 'west',
        collapsible: true,
        width: 200,
        autoScroll: true,
        split: true,
        frame: true,
        titleCollapse: true,
        id: "DivPanelMenu",
        items: Srims.MenuBar._getMenuItems()
    });
    return Srims.MenuBar._menuBar;
}
Srims.MenuBar._getMenuItems = function() {
    var items = new Array();
    var user = Srims.currentLoginLog.user;

    if (user.userRoleType == 'Expert') {
        items[items.length] = Srims.MenuBar._getMenuItem_expertProjectStart();
        items[items.length] = Srims.MenuBar._getMenuItem_expertMyProject();
        items[items.length] = Srims.MenuBar._getMenuItem_expertMyFund();
        //items[items.length] = Srims.MenuBar._getMenuItem_RecoveryManage();
        items[items.length] = Srims.MenuBar._getMenuItem_PerformanceManage(user);
        items[items.length] = Srims.MenuBar._getMenuItem_expertMyAchievement();
        items[items.length] = Srims.MenuBar._getMenuItem_expertMyStamp();
        items[items.length] = Srims.MenuBar._getMenuItem_Expert_outsourcingManage();
        items[items.length] = Srims.MenuBar._getMenuItem_expertTechnologySupport();

    }
    if (user.hasPermission_ShowAnyVerticalProject) {
        items[items.length] = Srims.MenuBar
				._getMenuItem_projectVerticalManage(user);
    }
    if (user.hasPermission_ShowAnyHorizontalProject)
        items[items.length] = Srims.MenuBar
				._getMenuItem_projectHorizontalManage(user);
    if (user.hasPermission_ManageType)
        items[items.length] = Srims.MenuBar._getMenuItem_typeManage(user);
    if (user.hasPermission_ManageFund)
        items[items.length] = Srims.MenuBar._getMenuItem_fundManage(user);
    if (user.userRoleType == 'Administrator') {
        items[items.length] = Srims.MenuBar._getMenuItem_RecoveryManage();
        items[items.length] = Srims.MenuBar._getMenuItem_PerformanceManage(user);
    }
    if (user.hasPermission_ManageFinance)
        items[items.length] = Srims.MenuBar._getMenuItem_financeManage();
    if (user.hasPermission_ExportFinanceData)
        items[items.length] = Srims.MenuBar._getMenuItem_financeExportManage();
    if (user.hasPermission_ManageBase)
        items[items.length] = Srims.MenuBar._getMenuItem_baseManage();
    if (user.hasPermission_ManagePaper)
        items[items.length] = Srims.MenuBar._getMenuItem_paperManage(user);
    if (user.hasPermission_ManagePaper)
        items[items.length] = Srims.MenuBar._getMenuItem_liberalArtsPaperManage(user);
    if (user.hasPermission_ManageAward)
        items[items.length] = Srims.MenuBar._getMenuItem_AwardManage(user);
    if (user.hasPermission_ManagePatent)
        items[items.length] = Srims.MenuBar._getMenuItem_PatentManage(user);
    if (user.hasPermission_ManageStamp)
        items[items.length] = Srims.MenuBar._getMenuItem_stampManage(user);
    if (user.HasPermission_StampDepartmentPrincipal)
        items[items.length] = Srims.MenuBar
				._getMenuItem_DepartmentStampManage(user);
    if (user.hasPermission_ManageStampFeedback)
        items[items.length] = Srims.MenuBar._getMenuItem_StampFeedbackManage();
    if (user.isSuper)
        items[items.length] = Srims.MenuBar._getMenuItem_StampApplicationType();
    if (user.hasPermission_ManageAnnouncement)
        items[items.length] = Srims.MenuBar._getMenuItem_Announcement();
    if (user.hasPermission_ManageSubjectLevel)
        items[items.length] = Srims.MenuBar
				._getMenuItem_subjectFirstLevelManage();
    if (user.hasPermission_ShowExpert || user.hasPermission_EditExpertLinkWay
			|| user.hasPermission_EditExpert)
        items[items.length] = Srims.MenuBar._getMenuItem_Expert(user);

    if (user.isSuper || user.userRoleType == 'Administrator')
        items[items.length] = Srims.MenuBar._getMenuItem_outsourcingManage();


    if (user.hasPermission_Statistic)
        items[items.length] = Srims.MenuBar._getMenuItem_Statistic();

    if (user.isSuper || user.hasPermission_ResetUserPassword)
        items[items.length] = Srims.MenuBar._getMenuItem_User(user);

    if (user.isSuper)
        items[items.length] = Srims.MenuBar._getMenuItem_SystemManage();
    if (user.userRoleType == 'Administrator')
        items[items.length] = Srims.MenuBar
				._getMenuItem_AdminTechnologySupport();


    return items;
}
// expert
Srims.MenuBar._getMenuItem_expertProjectStart = function() {
    return Srims.MenuBar._getMenuItem('项目立项', 'icon-expert-project-new', [{
        title: '新建纵向项目',
        action: 'project-vertical-new'
    }, {
        title: '新建横向项目',
        action: 'project-horizontal-new'
}]);
    }
    Srims.MenuBar._getMenuItem_expertMyProject = function() {
        var items = [{
            title: '我负责的项目',
            action: 'project-my-project-principal'
        }, {
            title: '委托给我的项目',
            action: 'project-my-project-delegate'
        }, {
            title: '我参与的项目',
            action: 'project-my-project-join'
        }, {
            title: "<span id=ExpertUnsubmitDocument>待提交文档</span>",
            action: 'expert-my-unsubmit-document'
}];

            Srims.Poll
			.addPollAction(Srims.Poll.getPollAction_ExpertUnsubmitDocumentCount);

            return Srims.MenuBar._getMenuItem('我的项目', 'icon-expert-my-project', items);
        }
        Srims.MenuBar._getMenuItem_expertMyAchievement = function() {
            return Srims.MenuBar._getMenuItem('我的成果', 'icon-expert-my-achievement', [{
                title: '我的论文',
                action: 'expert-my-paper'
            }, {
                title: '我的专利',
                action: 'expert-my-patent'
            }, {
                title: '我的奖励',
                action: 'expert-my-award'
}]);
            }
            Srims.MenuBar._getMenuItem_expertMyStamp = function() {
                return Srims.MenuBar._getMenuItem('我的文印', 'icon-expert-my-stamp', [{
                    title: '文印申请',
                    action: 'expert-stamp-apply'
                }, {
                    title: '我的文印',
                    action: 'expert-my-stamp'
}]);
                }
                Srims.MenuBar._getMenuItem_expertMyFund = function() {
                    Srims.Poll
			.addPollAction(Srims.Poll.getPollAction_MyWaitingAllocationFundDescend);
                    Srims.Poll.addPollAction(Srims.Poll.getPollAction_MyUnReadVoucher);
                    return Srims.MenuBar._getMenuItem('我的经费', 'icon-expert-my-fund', [{
                        title: "<span id=SpanMyUnReadVoucher>我的经费凭单</span>",
                        action: 'expert-my-voucher'
                    }, {
                        title: '经费查询与下拨',
                        action: 'expert-fund-descend'
                    }, {
                        title: "<span id=SpanMyWaitingAllocationFundDescend>经费分配</span>",
                        action: 'expert-fund-allocation'
}]);
                    }
                    // manage
                    Srims.MenuBar._getMenuItem_projectVerticalManage = function(user) {
                        var items = new Array();
                        if (user.hasPermission_EditAnyVerticalProject)
                            items[items.length] = {
                                title: '新建纵向项目',
                                action: 'project-vertical-new'
                            };
                        items[items.length] = {
                            title: '纵向项目列表',
                            action: 'project-vertical-list'
                        };
                        items[items.length] = {
                            title: '纵向项目查询',
                            action: 'project-vertical-query'
                        };
                        if (user.hasPermission_CensorAnyVerticalProject) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingStartCensorVerticalProjects>审核项目立项</span>",
                                action: 'project-vertical-censor-start'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingStartCensorVerticalProjectCount);
                            items[items.length] = {
                                title: "<span id=SpanWaitingEndCensorVerticalProjects>审核项目结项</span>",
                                action: 'project-vertical-censor-end'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingStartCensorHorizontalProjectCount);
                        }
                        if (user.hasPermission_CensorVerticalProjectDocuments) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorDocumentsOfVerticalProjects>审核项目文档</span>",
                                action: 'project-vertical-censor-document'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount);
                        }
                        if (user.hasPermission_CensorVerticalProjectContracts) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorContractsOfVerticalProjects>审核项目合同</span>",
                                action: 'project-vertical-censor-contract'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount);
                        }
                        if (user.HasPermission_CensorVerticalProjectFundAllocation) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorVerticalProjectFundAllocation>审核经费分配</span>",
                                action: 'project-vertical-censor-fund-allocation'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation);
                        }
                        if (user.HasPermission_CensorVerticalProjectPerformationAllocation) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorVerticalProjectPerformanceAllocation>审核绩效分配</span>",
                                action: 'project-vertical-censor-performance-allocation'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectPerformanceAllocation);
                        }
                        return Srims.MenuBar._getMenuItem('纵向项目管理', 'icon-project-vertical', items);
                    }
                    Srims.MenuBar._getMenuItem_projectHorizontalManage = function(user) {
                        var items = new Array();
                        if (user.hasPermission_EditAnyHorizontalProject)
                            items[items.length] = {
                                title: '新建横向项目',
                                action: 'project-horizontal-new'
                            };
                        items[items.length] = {
                            title: '横向项目列表',
                            action: 'project-horizontal-list'
                        };
                        items[items.length] = {
                            title: '横向项目查询',
                            action: 'project-horizontal-query'
                        };
                        if (user.hasPermission_CensorAnyHorizontalProject) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingStartCensorHorizontalProjects>审核项目立项</span>",
                                action: 'project-horizontal-censor-start'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingEndCensorVerticalProjectCount);
                            items[items.length] = {
                                title: "<span id=SpanWaitingEndCensorHorizontalProjects>审核项目结项</span>",
                                action: 'project-horizontal-censor-end'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingEndCensorHorizontalProjectCount);
                        }
                        if (user.hasPermission_CensorHorizontalProjectDocuments) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorDocumentsOfHorizontalProjects>审核项目文档</span>",
                                action: 'project-horizontal-censor-document'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount);
                        }
                        if (user.hasPermission_CensorHorizontalProjectContracts) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorContractsOfHorizontalProjects>审核项目合同</span>",
                                action: 'project-horizontal-censor-contract'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount);
                        }
                        if (user.HasPermission_CensorHorizontalProjectFundDescends) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorHorizontalProjectFundDescend>审核经费下拨</span>",
                                action: 'project-horizontal-censor-fund-descend'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundDescend);
                        }
                        if (user.HasPermission_CensorHorizontalProjectFundAllocation) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorHorizontalProjectFundAllocation>审核经费分配</span>",
                                action: 'project-horizontal-censor-fund-allocation'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation);
                        }
                        if (user.HasPermission_CensorHorizontalProjectPerformationAllocation) {
                            items[items.length] = {
                                title: "<span id=SpanWaitingCensorHorizontalProjectPerformanceAllocation>审核绩效分配</span>",
                                action: 'project-horizontal-censor-performance-allocation'
                            };
                            Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectPerformanceAllocation);
                        }
                        return Srims.MenuBar._getMenuItem('横向项目管理', 'icon-project-horizontal',
			items);
                    }
                    Srims.MenuBar._getMenuItem_subjectFirstLevelManage = function() {
                        return Srims.MenuBar._getMenuItem('学科管理', 'icon-subject', [{
                            title: '一级学科管理',
                            action: 'subject-level-first'
                        }, {
                            title: '二级学科管理',
                            action: 'subject-level-second'
}])
                        }
                        Srims.MenuBar._getMenuItem_stampManage = function(user) {
                            var items = new Array();

                            items[items.length] = {
                                title: '文印申请',
                                action: 'stamp-apply'
                            };
                            items[items.length] = {
                                title: '文印记录',
                                action: 'stamp-list'
                            };
                            if (user.hasPermission_CensorStamp) {
                                items[items.length] = {
                                    title: "<span id=SpanWaitingCensorStamp>待审核文印</span>",
                                    action: 'stamp-censor'
                                };
                                Srims.Poll.addPollAction(Srims.Poll.getPollAction_WaitingCensorStamp);
                            }
                            if (user.isSuper) {
                                items[items.length] = {
                                    title: '图章管理',
                                    action: 'stamp-manage'
                                };
                            }
                            return Srims.MenuBar._getMenuItem('文印管理', 'icon-stamp', items);
                        }
                        Srims.MenuBar._getMenuItem_DepartmentStampManage = function(user) {
                            var items = new Array();

                            items[items.length] = {
                                title: '文印记录',
                                action: 'departmentStamp-list'
                            };
                            if (user.HasPermission_StampDepartmentPrincipal) {
                                items[items.length] = {
                                    title: "<span id=SpanWaitingDepartmentCensorStamp>待审核文印</span>",
                                    action: 'stampDepartment-censor'
                                };
                                Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingDepartmentCensorStamp);
                            }

                            return Srims.MenuBar._getMenuItem('部门文印管理', 'icon-stamp', items);
                        }
                        Srims.MenuBar._getMenuItem_StampFeedbackManage = function() {
                            return Srims.MenuBar._getMenuItem('校办用印反馈', 'icon-stampFeedback', [{
                                title: '文印列表',
                                action: 'waitingStamp-list'
}]);
                            }
                            Srims.MenuBar._getMenuItem_StampApplicationType = function() {
                                return Srims.MenuBar._getMenuItem('文印申请类型管理', 'icon-stampApplicationType', [{
                                    title: '文印申请类型管理',
                                    action: 'stampapplication-type'
                                }, {
                                    title: '文印申请类型对应组管理',
                                    action: 'stampapplication-type-group'
}]);
                                }
                                Srims.MenuBar._getMenuItem_fundManage = function(user) {
                                    var items = [];
                                    items[items.length] = {
                                        title: '经费到账（暂存）',
                                        action: 'fund-finance'
                                    };
                                    items[items.length] = {
                                        title: '经费分配记录',
                                        action: 'fund-allocation'
                                    };
                                    if (user.HasPermission_AllocationVerticalProjectFundDescend) {
                                        items[items.length] = {
                                            title: "<span id=SpanWaitingAllocationVerticalProjectFundDescend>纵向未分配经费</span>",
                                            action: 'fund-waiting-allocation-vertical-project'
                                        }
                                        Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend);
                                    }
                                    if (user.HasPermission_AllocationHorizontalProjectFundDescend) {
                                        items[items.length] = {
                                            title: "<span id=SpanWaitingAllocationHorizontalProjectFundDescend>横向未分配经费</span>",
                                            action: 'fund-waiting-allocation-horizontal-project'
                                        }
                                        Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend);
                                    }
                                    items[items.length] = {
                                        title: '经费凭单',
                                        action: 'fund-voucher'
                                    }
                                    if (user.HasPermissionFundlent)
                                        items[items.length] = {
                                            title: '未完成还款的借款记录',
                                            action: 'fund-lent'
                                        }
                                    return Srims.MenuBar._getMenuItem('经费管理', 'icon-fund', items);
                                }
                                Srims.MenuBar._getMenuItem_financeManage = function() {
                                    return Srims.MenuBar._getMenuItem('财务管理', 'icon-finance', [{
                                        title: '经费到帐信息',
                                        action: 'finance-information'
                                    }, {
                                        title: '凭单财务状态',
                                        action: 'voucher-finance-state'
}]);
                                    }
                                    Srims.MenuBar._getMenuItem_financeExportManage = function() {
                                        return Srims.MenuBar._getMenuItem('财务信息导出', 'icon-finance', [{
                                            title: '财务经费到帐信息',
                                            action: 'voucher-finance-financebak'
}]);
                                        }
                                        Srims.MenuBar._getMenuItem_typeManage = function(user) {
                                            var items = [];
                                            items[items.length] = {
                                                title: '项目分类管理',
                                                action: 'type-type'
                                            };
                                            if (user.isSuper)
                                                items[items.length] = {
                                                    title: '管理费比例管理',
                                                    action: 'type-managementfees'
                                                }

                                            return Srims.MenuBar._getMenuItem('分类管理', 'icon-type', items);
                                        }
                                        Srims.MenuBar._getMenuItem_baseManage = function() {
                                            return Srims.MenuBar._getMenuItem('基地管理', 'icon-base', [{
                                                title: '新建基地',
                                                action: 'base-new'
                                            }, {
                                                title: '基地列表',
                                                action: 'base-list'
}]);
                                            }
                                            Srims.MenuBar._getMenuItem_paperManage = function(user) {
                                                var items = [];
                                                if (user.hasPermission_EditPaper)
                                                    items[items.length] = {
                                                        title: '添加论文',
                                                        action: 'paper-new'
                                                    };
                                                items[items.length] = {
                                                    title: '论文列表',
                                                    action: 'paper-list'
                                                };
                                                items[items.length] = {
                                                    title: '论文查询',
                                                    action: 'paper-query'
                                                };
                                                if (user.hasPermission_EditPaper) {
                                                    items[items.length] = {
                                                        title: '添加杂志',
                                                        action: 'magazine-new'
                                                    };
                                                    items[items.length] = {
                                                        title: '杂志列表',
                                                        action: 'magazine-list'
                                                    };
                                                    items[items.length] = {
                                                        title: '杂志查询',
                                                        action: 'magazine-query'
                                                    };
                                                    items[items.length] = {
                                                        title: '杂志任职',
                                                        action: 'magazine-Occupation'
                                                    };
                                                }
                                                return Srims.MenuBar._getMenuItem('论文管理', 'icon-paper', items);
                                            }
                                            Srims.MenuBar._getMenuItem_liberalArtsPaperManage = function(user) {
                                                var items = [];
                                                if (user.hasPermission_EditPaper)
                                                    items[items.length] = {
                                                        title: '添加文科论文',
                                                        action: 'liberalartspaper-new'
                                                    };
                                                items[items.length] = {
                                                    title: '文科论文列表',
                                                    action: 'liberalartspaper-list'
                                                };
                                                items[items.length] = {
                                                    title: '文科论文查询',
                                                    action: 'liberalartspaper-query'
                                                };
                                                return Srims.MenuBar._getMenuItem('文科论文管理', 'icon-liberalartspaper', items);
                                            }
                                            Srims.MenuBar._getMenuItem_Announcement = function() {
                                                return Srims.MenuBar._getMenuItem('通知管理', 'icon-announcement', [{
                                                    title: '新建通知',
                                                    action: 'announcement-new'
                                                }, {
                                                    title: '通知列表',
                                                    action: 'announcement-list'
}]);
                                                }
                                                Srims.MenuBar._getMenuItem_PatentManage = function(user) {
                                                    var items = [];
                                                    if (user.hasPermission_EditPatent)
                                                        items[items.length] = {
                                                            title: '添加专利',
                                                            action: 'patent-new'
                                                        };
                                                    items[items.length] = {
                                                        title: '专利列表',
                                                        action: 'patent-list'
                                                    };
                                                    items[items.length] = {
                                                        title: '专利查询',
                                                        action: 'patent-query'
                                                    };
                                                    items[items.length] = {
                                                        title: '代理机构管理',
                                                        action: 'patent-agency-manage'
                                                    };
                                                    return Srims.MenuBar._getMenuItem('专利管理', 'icon-patent', items);
                                                }
                                                Srims.MenuBar._getMenuItem_AwardManage = function(user) {
                                                    var items = [];
                                                    if (user.hasPermission_editLiteralAward
			|| user.hasPermission_editScienceAward)
                                                        items[items.length] = {
                                                            title: '添加奖励',
                                                            action: 'award-new'
                                                        };
                                                    items[items.length] = {
                                                        title: '奖励列表',
                                                        action: 'award-list'
                                                    };
                                                    items[items.length] = {
                                                        title: '奖励查询',
                                                        action: 'award-query'
                                                    };
                                                    if (user.hasPermission_editLiteralAward
			|| user.hasPermission_editScienceAward) {
                                                        items[items.length] = {
                                                            title: "<span id=SpanWaitingCensorAwardDoucment>到审核奖励文档</span>",
                                                            action: 'award-waiting-censor-document'
                                                        };
                                                        Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorAwardDocument);
                                                    }

                                                    return Srims.MenuBar._getMenuItem('奖励管理', 'icon-award', items);
                                                }
                                                Srims.MenuBar._getMenuItem_User = function(user) {
                                                    var items = [];
                                                    items[items.length] = {
                                                        title: '用户列表',
                                                        action: 'user-list'
                                                    };
                                                    if (user.isSuper) {
                                                        items[items.length] = {
                                                            title: '当前在线用户',
                                                            action: 'activeuser-list'
                                                        };
                                                        items[items.length] = {
                                                            title: '新建管理员',
                                                            action: 'user-new'
                                                        };
                                                    }
                                                    return Srims.MenuBar._getMenuItem('用户管理', 'icon-user', items);
                                                }
                                                Srims.MenuBar._getMenuItem_Expert = function(user) {
                                                    var items = [];
                                                    items[items.length] = {
                                                        title: '专家列表',
                                                        action: 'expert-list'
                                                    };
                                                    if (user.hasPermission_EditExpert)
                                                        items[items.length] = {
                                                            title: '添加专家',
                                                            action: 'expert-new'
                                                        };
                                                    items[items.length] = {
                                                        title: '专家查询',
                                                        action: 'expert-query'
                                                    };
                                                    if (user.hasPermission_EditExpert) {
                                                        items[items.length] = {
                                                            title: "<span id=SpanWaitingCensorExpertEdit>审核专家编辑信息</span>",
                                                            action: 'expert-edit-censor'

                                                        };
                                                        Srims.Poll
				.addPollAction(Srims.Poll.getPollAction_WaitingCensorExpertEdit);
                                                    }

                                                    return Srims.MenuBar._getMenuItem('专家管理', 'icon-expert', items);
                                                }
                                                Srims.MenuBar._getMenuItem_baseManage = function() {
                                                    var items = [];
                                                    items[items.length] = {
                                                        title: "新建基地",
                                                        action: "base-new"
                                                    };
                                                    items[items.length] = {
                                                        title: "基地列表",
                                                        action: "base-list"
                                                    };

                                                    return Srims.MenuBar._getMenuItem("基地管理", 'icon-base', items);
                                                }
                                                Srims.MenuBar._getMenuItem_Statistic = function() {

                                                    var user = Srims.currentLoginLog.user;
                                                    var items = [];

                                                    if (user.hasPermission_ProjectCountStatistic)
                                                        items[items.length] = {
                                                            title: '项目数目统计',
                                                            action: 'statistic-project-count'
                                                        };
                                                    if (user.hasPermission_FundTotalStatistic)
                                                        items[items.length] = {
                                                            title: '项目总经费统计',
                                                            action: 'statistic-fund-total'
                                                        };
                                                    if (user.hasPermission_FundDescendStatistic)
                                                        items[items.length] = {
                                                            title: '经费到账统计',
                                                            action: 'statistic-fund-descend'
                                                        };
                                                    if (user.hasPermission_VoucherStatistic)
                                                        items[items.length] = {
                                                            title: '经费分配（凭单）统计',
                                                            action: 'statistic-voucher'
                                                        };
                                                    if (user.hasPermission_PaperStatistic)
                                                        items[items.length] = {
                                                            title: '论文统计',
                                                            action: 'statistic-paper'
                                                        };
                                                    if (user.hasPermission_PatentStatistic)
                                                        items[items.length] = {
                                                            title: '专利统计',
                                                            action: 'statistic-patent'
                                                        };
                                                    if (user.hasPermission_AwardStatistic)
                                                        items[items.length] = {
                                                            title: '奖励统计',
                                                            action: 'statistic-award'
                                                        };

                                                    return Srims.MenuBar._getMenuItem('统计', 'icon-statistic', items);
                                                }
                                                Srims.MenuBar._getMenuItem_SystemManage = function() {
                                                    return Srims.MenuBar._getMenuItem('系统管理', 'icon-setting', [{
                                                        title: '系统设置',
                                                        action: 'system-setting'
                                                    }, {
                                                        title: '提示文本管理',
                                                        action: 'notice-text-manage'
                                                    }, {
                                                        title: '部门管理',
                                                        action: 'department-manage'
                                                    },
                                                {
                                                    title: '日志管理',
                                                    action: 'log-manage'
                                                }
                                                    ]);
                                                }
                                                Srims.MenuBar._getMenuItem_RecoveryManage = function() {
                                                    return Srims.MenuBar._getMenuItem('间接费用调整管理', 'icon-setting', [{
                                                        title: '间接费用调整管理',
                                                        action: 'recovery-manage'
}]);

                                                    }
                                                    Srims.MenuBar._getMenuItem_PerformanceManage = function(user) {
                                                        var items = [];
                                                        if (user.userRoleType != 'Expert') {
                                                            items[items.length] = {
                                                                title: "课题组间接费暂存",
                                                                action: 'performance-list'
                                                            }
                                                            items[items.length] = {
                                                                title: "课题组间接费控制",
                                                                action: 'performanceallocation-waiting-allocation-project'
                                                            }
                                                            items[items.length] = {
                                                                title: '分配记录',
                                                                action: 'performance-allocation'
                                                            }
                                                            items[items.length] = {
                                                                title: '凭单列表',
                                                                action: 'performance-voucher'
                                                            }

                                                        }
                                                        else {

                                                            items[items.length] = {
                                                                title: "<span id=SpanWaitingAllocationProjectPerformance>课题组间接费查询</span>",
                                                                action: 'performanceallocation-waiting-allocation-project'
                                                            }
                                                            //Srims.Poll.addPollAction(Srims.Poll.getPollAction_WaitingAllocationProjectPerformance);
                                                        }
                                                        //                                                        items[items.length] = {
                                                        //                                                            title: '分配记录',
                                                        //                                                            action: 'performance-allocation'
                                                        //                                                        }
                                                        //                                                        items[items.length] = {
                                                        //                                                            title: '凭单列表',
                                                        //                                                            action: 'performance-voucher'
                                                        //                                                        }

                                                        return Srims.MenuBar._getMenuItem('课题组间接费用', 'icon-setting', items);

                                                    }
                                                    Srims.MenuBar._getMenuItem_Expert_outsourcingManage = function() {
                                                        return Srims.MenuBar._getMenuItem('外协单位管理', 'icon-expert', [{
                                                            title: '外协单位管理',
                                                            action: 'outsourcing-manage'
}]);

                                                        }
                                                        Srims.MenuBar._getMenuItem_outsourcingManage = function() {
                                                            return Srims.MenuBar._getMenuItem('外协单位管理', 'icon-expert', [{
                                                                title: '编辑外协单位',
                                                                action: 'outsourcing-manage'
                                                            }, {
                                                                title: '外协单位查询',
                                                                action: 'outsourcing-inquiry'
                                                            }
                                                            //                                                        , {
                                                            //                                                            title: '外协单位统计',
                                                            //                                                            action: 'outsourcing-statistics'
                                                            //                                                        }
]);

                                                        }
                                                        Srims.MenuBar._getMenuItem_AdminTechnologySupport = function() {
                                                            return new Ext.Panel({
                                                                frame: true,
                                                                title: '技术支持',
                                                                collapsible: true,
                                                                iconCls: 'icon-technology-support',
                                                                html: '<ul style="color:#15428B"><li>中国海洋大学</li><li>并行与分布式实验室</li><li>yuandong1222@gmail.com</li><li>13573888215</li></ul>',
                                                                titleCollapse: true
                                                            });

                                                        }
                                                        Srims.MenuBar._getMenuItem_expertTechnologySupport = function() {
                                                            return new Ext.Panel({
                                                                frame: true,
                                                                title: '版权所有',
                                                                collapsible: true,
                                                                iconCls: 'icon-technology-support',
                                                                html: '<ul style="color:#15428B"><li>中国海洋大学科技处</li><li>电话：(0532)66781725</li><li>传真：(0532)66782658</li><li>Email: kjc@ouc.edu.cn</li></ul>',
                                                                titleCollapse: true
                                                            });

                                                        }
                                                        Srims.MenuBar._getMenuItem = function(title, iconCls, items) {

                                                            var html = '<ul class="">';

                                                            for (var i = 0; i < items.length; i++) {
                                                                var item = items[i];
                                                                html += String.format('<li id="MenuBarItem-li-{0}">', item.action);
                                                                html += String.format('<img src="../images/s.gif" class="icon-{0}"/>',
				item.action);
                                                                html += String.format(
				'<a id="MenuBarItem-a-{0}" class="" href="#">{1}</a>',
				item.action, item.title);
                                                                html += String.format('</li>');
                                                            }

                                                            html += '</ul>';

                                                            return new Ext.Panel({
                                                                frame: true,
                                                                title: title,
                                                                collapsible: true,
                                                                iconCls: iconCls,
                                                                html: html,
                                                                titleCollapse: true
                                                            });
                                                        };