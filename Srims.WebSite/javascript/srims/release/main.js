Srims.Main = new function() {
}
//var projectOutAmount = 0;
Srims.Main.render = function() {

	this._viewport = new Ext.Viewport({
		layout: 'border',
		items: [Srims.TopBar.getTopBar(), Srims.MenuBar.getMenuBar(), Srims.WorkSpace.getWorkSpace()]
	});

	//执行轮询
	Srims.Poll.startPolls()

	var ab = Srims.MenuBar.getMenuBar().body;
	ab.on('mousedown', Srims.Action.doAction, null, {
		delegate: 'a'
	});
	ab.on('click', Ext.emptyFn, null, {
		delegate: 'a',
		preventDefault: true
	});
};
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertXmlReader.superclass.constructor.call(this, Srims.experts.Expert);
    },
    readRecords: function(responseXML){
        var result = Srims.experts.ExpertXmlReader.superclass.readRecords.call(this, responseXML);
        
        result.records.showProjectCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowProjectCount", responseXML));
        result.records.showPaperCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowPaperCount", responseXML));
        result.records.showPatentCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowPatentCount", responseXML));
        result.records.showAwardCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowAwardCount", responseXML));
        
        return result;
    }
});
Srims.ExpertNavigatePanel = function() {
    Srims.ExpertNavigatePanel.superclass.constructor.call(this, {
        collapsible: false,
        title: '我要...',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        id: "DivExpertNavigatePanel",
        html: Srims.ExpertNavigatePanel._getHtml()
    });
};
Ext.extend(Srims.ExpertNavigatePanel, Ext.Panel);

Srims.ExpertNavigatePanel._getHtml = function() {
    var items = [];
    items[items.length] = Srims.ExpertNavigatePanel._getItem('建立项目', '通过立项向导建立和输入您的纵向、横向项目。', 'project-new', 'Srims.ExpertNavigatePanel.Action.newProject');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('分配经费', '选择并分配项目经费给项目成员。分配经费前请先确认项目已经建立。', 'fund-allocate', 'Srims.ExpertNavigatePanel.Action.fundAllocate');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('委托项目', '将项目委托给其它专家进行管理。被委托的专家对于该项目将具有和您相同的权限。', 'project-delegate', 'Srims.ExpertNavigatePanel.Action.projectDelegate');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('申请文印', '申请使用学校公章或证明材料，例如校长签名章、法人证明复印件等。', 'stamp-apply', 'Srims.ExpertNavigatePanel.Action.stampApply');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('查看成果', '查看您的成果，包括主持、参与的项目，所获奖励，发表论文等。', 'achieve-view', 'Srims.ExpertNavigatePanel.Action.achieveView');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('查询专家', '查询全校教师/职工的联系方式，包括所在院系、办公电话、电子邮箱等。', 'expert-simple-query', 'Srims.ExpertNavigatePanel.Action.expertSimpleQuery');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('完善资料', '完善自身的科研简历，方便科技处向上级部门和企业推荐您。', 'prefect-stuff', 'Srims.ExpertNavigatePanel.Action.prefectStuff');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('修改密码', '请您定期修改密码，保证账户安全。', 'change-password', 'Srims.ExpertNavigatePanel.Action.changePassword');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('获得帮助', '有问题无法解决？您可以致电科技处相关工作人员。点击查看各科室联系方式。', 'help', 'Srims.ExpertNavigatePanel.Action.help');
    items[items.length] = Srims.ExpertNavigatePanel._getItem('意见建议', '您在使用系统中有好的建议和意见可以提供给我们以便于我们尽快改进', 'advice', 'Srims.ExpertNavigatePanel.Action.advice');
    var html = '';
    for (var i = 0; i < items.length; i++) {
        if (i % 2 == 0)
            html += '<div style="width:620px;height:60px;">' + Srims.ExpertNavigatePanel._NavigateItemHtmlTemplate.apply(items[i]);
        else
            html += Srims.ExpertNavigatePanel._NavigateItemHtmlTemplate.apply(items[i]) + '</div>';
    }
    if (items.length % 2 == 1) {
        html += '<div>';
    }

    return html;
}
Srims.ExpertNavigatePanel._getItem = function(title, description, icon, action) {
    return {
        title: title,
        description: description,
        icon: icon,
        action: action
    };
}
//Srims.ExpertNavigatePanel._NavigateItemHtmlTemplate = new Ext.XTemplate(
//	'<a href="javascript:{action}(this);">',
//		'<div style="width:305px;float:left">',
//			'<div style="width:55px;float:left;">',
//				'<img src="/images/expert-navigate/{icon}.png" style="width:48px;height:48px;" />',
//			'</div>',
//			'<div style="width:245px;float:left">',
//				'<strong>{title}</strong><br />',
//				'{description}',
//			'</div>',
//		'</div>',
//	'</a>');
Srims.ExpertNavigatePanel._NavigateItemHtmlTemplate = new Ext.XTemplate('<a href="javascript:{action}(this);">', '<div style="width:305px;float:left">', '<div style="width:55px;float:left;">', '<img src="/images/expert-navigate/{icon}.png" style="width:48px;height:48px;" />', '</div>', '<div style="width:245px;float:left">', '<strong>{title}</strong><br />', '{description}', '</div>', '</div>', '</a>');

Srims.ExpertNavigatePanel.Action = function() {
};
Srims.ExpertNavigatePanel.Action.newProject = function(element) {
    Srims.Load.loadProjectModule('Srims.projects.showHorizontalChooseWindow()');
};

Srims.ExpertNavigatePanel.Action.fundAllocate = function(element) {
    Srims.Action.actions['expert-guid-fund-allocation']();
};
Srims.ExpertNavigatePanel.Action.fundDescend = function(element) {
    Srims.Action.actions['expert-guid-fund-descend']();
};
Srims.ExpertNavigatePanel.Action.projectDelegate = function(element) {
    Srims.Action.actions['project-waiting-set-delegate']();
};
Srims.ExpertNavigatePanel.Action.stampApply = function(element) {
    Srims.Action.actions['stamp-apply']();
};
Srims.ExpertNavigatePanel.Action.expertSimpleQuery = function(element) {
    Srims.Action.actions['expert-simple-query']();
};
Srims.ExpertNavigatePanel.Action.achieveView = function(element) {
    Srims.Action.actions['achieve-view']();
};
Srims.ExpertNavigatePanel.Action.prefectStuff = function(element) {
    Srims.Load.loadExpertModule('Srims.experts.ExpertAction.showExpertSelfInfo()');
};
Srims.ExpertNavigatePanel.Action.changePassword = function(element) {
    Srims.Action.actions['change-password']();
};
Srims.ExpertNavigatePanel.Action.help = function(element) {
    Srims.Action.actions['help']();
};
Srims.ExpertNavigatePanel.Action.advice = function(element) {
    window.open('mailto:luoyi@ouc.edu.cn?cc=chujiajie@ouc.edu.cn;yuanning@ouc.edu.cn;kejichu@ouc.edu.cn', '_blank');
};
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
                                                        };Srims.TopBar = new function() {
}
Srims.TopBar.getTopBar = function(pollList) {
    if (Srims.TopBar._topBar)
        return Srims.TopBar._topBar;
    var user = Srims.currentLoginLog.user;
    var topBarHtml = '';
    topBarHtml += '<h1 id="TopBar" class="x-panel-header">';
    topBarHtml += '	<div style="margin-left:5px;display:inline;float:left"><img class="icon-srims" src="../images/s.gif">欢迎使用中国海洋大学科研信息管理系统    </div>';

    topBarHtml += '	<div style="text-align:right;display:inline;float:right;">';
    topBarHtml += '您好： '+user.name+' ！        ';
    topBarHtml += '		<a href="#" onclick="Srims.Action.actions[\'message-list\']()"><img class="icon-message-list" src="../images/s.gif"><span id=SpanMessages>短消息</span></>';
    topBarHtml += '		<a href="#" onclick="Srims.Action.actions[\'expert-simple-query\']()"><img class="icon-expert-search" src="../images/s.gif">专家查询</>';
    //topBarHtml += '		<a href="#" onclick=""><img class="icon-help" src="../images/s.gif">获得帮助</>';
    topBarHtml += '		<a href="#" onclick="Srims.Action.actions[\'change-password\']()"><img class="icon-change-password" src="../images/s.gif">修改密码</>';
    topBarHtml += '		<a href="#" id="TopBarAction_Logout" onclick="Srims.TopBar._logout();"><img class="icon-logout" src="../images/s.gif">退出登录</>';
    topBarHtml += '	</div>'
    topBarHtml += '</h1>';
    topBarHtml += '';

    Srims.Poll.addPollAction(Srims.Poll.getPollAction_UnreadMessagesCount);

    Srims.TopBar._topBar = new Ext.Panel({
        region: 'north',
        html: topBarHtml,
        autoHeight: true,
        border: false,
        margins: '0 0 5 0'
    });

    return Srims.TopBar._topBar;
}
Srims.TopBar._logout = function() {
	Ext.MessageBox.show({
		title: '退出登陆',
		msg: '您确定退出登陆？',
		//animEl: 'TopBarAction_Logout',
		buttons: Ext.MessageBox.YESNO,
		icon: Ext.MessageBox.QUESTION,
		fn: Srims.TopBar._logout_confirm
	});
}
Srims.TopBar._logout_confirm = function(buttonId) {
	if (buttonId == 'yes') {
		Srims.Login.logout();
	}
};Srims.WorkSpace = new function() {
}
Ext.ux.TabCloseMenu = function() {
	var tabs, menu, ctxItem;
	this.init = function(tp) {
		tabs = tp;
		tabs.on('contextmenu', onContextMenu);
	}
	function onContextMenu(ts, item, e) {
		if (!menu) { // create context menu on first right click
			menu = new Ext.menu.Menu([{
				id: tabs.id + '-close',
				text: '关闭该页',
				handler: function() {
					tabs.remove(ctxItem);
				}
			},{
				id: tabs.id + '-close-others',
				text: '关闭其他页',
				handler: function() {
					tabs.items.each( function(item) {
						if (item.closable && item != ctxItem) {
							tabs.remove(item);
						}
					});
				}
			},{
				id: tabs.id + '-close-all',
				text: '关闭所有页',
				handler: function() {
					tabs.items.each( function(item) {
						if (item.closable) {
							tabs.remove(item);
						}
					});
				}
			}]);
		}
		ctxItem = item;
		var items = menu.items;
		items.get(tabs.id + '-close').setDisabled(!item.closable);
		var disableOthers = true;
		tabs.items.each( function() {
			if (this != item && this.closable) {
				disableOthers = false;
				return false;
			}
		});
		items.get(tabs.id + '-close-others').setDisabled(disableOthers);
		menu.showAt(e.getPoint());
	}

};
Srims.WorkSpace.getWorkSpace = function() {

	if (Srims.WorkSpace._workSpace)
		return Srims.WorkSpace._workSpace;

	var items = [];

	var myUnReadMessagePanel = new Ext.form.FormPanel({
		collapsible: true,
		style: 'margin-bottom: 2px; width:100%',
		title: '未读短消息',
		frame: true,
		autoHeight: true,
		items: [{
			html: '<div id="divUnReadMesseages" style="width:100%"></div>'
		}]
	});

	if (Srims.currentUser.userRoleType == 'Expert') {
		items = [new Srims.ExpertNavigatePanel(), myUnReadMessagePanel];
	} else {
		items = [myUnReadMessagePanel];
	}

	Srims.WorkSpace._workSpace = new Ext.TabPanel({
		deferredRender: false,
		frame: true,
		enableTabScroll: true,
		autoScroll: true,
		defaults: {
			autoScroll: true
		},
		layoutOnTabChange: true,
		plugins: new Ext.ux.TabCloseMenu(),
		region: 'center',
		items: [{
			frame: true,
			title: '首页',
			style: 'padding:2px;',
			iconCls: 'icon-task',
			items: items
		}],
		activeItem: 0
	});

	return Srims.WorkSpace._workSpace;
}
Srims.WorkSpace.active = function(panelId) {
	var workSpace = Srims.WorkSpace.getWorkSpace();
	var panel = workSpace.findById(panelId);
	if (panel) {
		workSpace.scrollToTab(panel, true);
		workSpace.setActiveTab(panel);
		return panel;
	}

	return undefined;
}
Srims.WorkSpace.addPanel = function(panel) {
	var workSpace = Srims.WorkSpace.getWorkSpace();
	workSpace.add(panel);
	workSpace.doLayout();
	workSpace.scrollToTab(panel, true);
	workSpace.setActiveTab(panel);
};Srims.Action = new function() {
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
//短消息使用
Srims.MessageAction = new function() {
}
//查看项目
Srims.MessageAction.response_project = undefined;
Srims.MessageAction.showDocumentManageWindow = false;
Srims.MessageAction.showContractManageWindow = false;
Srims.MessageAction.showProject = function(projectId, isShowDocumentManageWindow, isShowContractManageWindow) {
	Srims.MessageAction.showDocumentManageWindow = isShowDocumentManageWindow;
	Srims.MessageAction.showContractManageWindow = isShowContractManageWindow;

	Ext.Ajax.request({
		url: Srims.service.projects.ProjectService + '/GetById',
		params: {
			projectId: projectId
		},
		scope: this,
		success: function(response) {
			Srims.MessageAction.response_project = response;
			Srims.Load.loadProjectModule('Srims.MessageAction.showProject_Response();');
		}
	});
}
Srims.MessageAction.showProject_Response = function() {
	var store = new Ext.data.Store({
		data: Srims.MessageAction.response_project.responseXML,
		reader: new Srims.projects.ProjectSimpleXmlReader()
	});
	var project = store.getAt(0);
	Srims.projects.showProject(project);

	if (Srims.MessageAction.showDocumentManageWindow)
		Srims.projects.showDocumentWindow(project);
	if (Srims.MessageAction.showContractManageWindow)
		Srims.projects.showContractWindow(project);
}
//查看奖励文档
Srims.MessageAction.response_award = undefined;
Srims.MessageAction.showAwardDocument = function(awardId) {
	Ext.Ajax.request({
		url: Srims.service.awards.AwardService + '/GetById',
		params: {
			awardId: awardId
		},
		scope: this,
		success: function(response) {
			Srims.MessageAction.response_award = response;
			Srims.Load.loadAwardModule('Srims.MessageAction.showResponse_award();');
		}
	});
}
Srims.MessageAction.showResponse_award = function() {
	var store = new Ext.data.Store({
		data: Srims.MessageAction.response_award.responseXML,
		reader: new Srims.awards.AwardXmlReader()
	});
	var award = store.getAt(0);
	Srims.awards.showAwardDocumentManageWindow(award);
}
//查看文印
Srims.MessageAction.response_Stamp = undefined;
Srims.MessageAction.showForExpert = false;
Srims.MessageAction.isForcensor = undefined;
Srims.MessageAction.showStamp = function(stampApplicationId, showForExpert, isForcensor) {
	Srims.MessageAction.showForExpert = showForExpert;
	Srims.MessageAction.isForcensor = isForcensor;
	Ext.Ajax.request({
		url: Srims.service.stamp.StampApplicationService + '/GetById',
		params: {
			stampApplicationId: stampApplicationId
		},
		scope: this,
		success: function(response) {
			Srims.MessageAction.response_stamp = response;
			Srims.Load.loadStampModel('Srims.MessageAction.showStamp_Response()');
		}
	});
}
Srims.MessageAction.showStamp_Response = function() {
	var store = new Ext.data.Store({
		data: Srims.MessageAction.response_stamp.responseXML,
		reader: new Srims.stamp.StampApplicationXmlReader()
	});
	var stamp = store.getAt(0);
	Srims.stamp.showStampApplication(stamp, undefined, Srims.MessageAction.isForcensor);
};Srims.Poll = new function() {
}
Srims.Poll.pollActionList = [];

Srims.Poll.getPollAction_WaitingStartCensorVerticalProjectCount = function() {
    var url = Srims.service.projects.ProjectService + '/GetWaitingStartCensorVerticalProjectCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingStartCensorVerticalProjects', '审核项目立项');
}
Srims.Poll.getPollAction_WaitingStartCensorHorizontalProjectCount = function() {
    var url = Srims.service.projects.ProjectService + '/GetWaitingStartCensorHorizontalProjectCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingStartCensorHorizontalProjects', '审核项目立项');
}
//审核外协单位13.3.3
Srims.Poll.getPollAction_WaitingStartCensorOutsourcingCount = function() {
    var url = Srims.service.common.OutsourcingService + '/DisVerfiy';
    Srims.Poll.getPollAction(url, 'SpanWaitingStartCensorOutsourcing', '审核项目立项：外协单位');
}
Srims.Poll.getPollAction_WaitingEndCensorVerticalProjectCount = function() {
    var url = Srims.service.projects.ProjectService + '/GetWaitingEndCensorVerticalProjectCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingEndCensorVerticalProjects', '审核项目结项');
}
Srims.Poll.getPollAction_WaitingEndCensorHorizontalProjectCount = function() {
    var url = Srims.service.projects.ProjectService + '/GetWaitingEndCensorHorizontalProjectCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingEndCensorHorizontalProjects', '审核项目结项');
}
Srims.Poll.getPollAction_UnreadMessagesCount = function() {
    var url = Srims.service.users.MessageService + '/GetUnReadMessageCount';
    Srims.Poll.getPollAction(url, 'SpanMessages', '短消息');
}
Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount = function() {
    var url = Srims.service.documents.DocumentService + '/GetWaitingCensorDocumentsCountOfVerticalProjects';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorDocumentsOfVerticalProjects', '审核项目文档');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount = function() {
    var url = Srims.service.documents.DocumentService + '/GetWaitingCensorDocumentsCountOfHorizonalProjects';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorDocumentsOfHorizontalProjects', '审核项目文档');
}
Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount = function() {
    var url = Srims.service.documents.ContractService + '/GetWaitingCensorContractsCountOfVerticalProjects';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorContractsOfVerticalProjects', '审核项目合同');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount = function() {
    var url = Srims.service.documents.ContractService + '/GetWaitingCensorContractsCountOfHorizonalProjects';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorContractsOfHorizontalProjects', '审核项目合同');
}
Srims.Poll.getPollAction_ExpertUnsubmitDocumentCount = function() {
    var url = Srims.service.documents.DocumentService + '/GetExpertUnSubmitDocumentCount';
    Srims.Poll.getPollAction(url, 'ExpertUnsubmitDocument', '待提交的文档');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundDescend = function() {
    var url = Srims.service.fund.FundDescendService + '/GetWaitingCensorFundDescendCount_Horizontal';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorHorizontalProjectFundDescend', '审核经费下拨');
}
Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend = function() {
    var url = Srims.service.fund.FundDescendService + '/GetWaitingAllocationFundDescendCount_Vertical';
    Srims.Poll.getPollAction(url, 'SpanWaitingAllocationVerticalProjectFundDescend', '纵向未分配经费');
}
Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend = function() {
    var url = Srims.service.fund.FundDescendService + '/GetWaitingAllocationFundDescendCount_Horizontal';
    Srims.Poll.getPollAction(url, 'SpanWaitingAllocationHorizontalProjectFundDescend', '横向未分配经费');
}
Srims.Poll.getPollAction_MyWaitingAllocationFundDescend = function() {
    var url = Srims.service.fund.FundDescendService + '/GetMyWaitingAllocationFundDescendCount';
    Srims.Poll.getPollAction(url, 'SpanMyWaitingAllocationFundDescend', '经费分配');
}
Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation = function() {
    var url = Srims.service.fund.FundAllocationService + '/GetWaitingCensorVerticalProjectFundAllcation';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorVerticalProjectFundAllocation', '审核经费分配');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation = function() {
    var url = Srims.service.fund.FundAllocationService + '/GetWaitingCensorHorizontalProjectFundAllcation';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorHorizontalProjectFundAllocation', '审核经费分配');
}
Srims.Poll.getPollAction_MyUnReadVoucher = function() {
    var url = Srims.service.fund.VoucherService + '/GetMyUnReadVoucherCount';
    Srims.Poll.getPollAction(url, 'SpanMyUnReadVoucher', '我的经费凭单');
}
Srims.Poll.getPollAction_WaitingCensorStamp = function() {
    var url = Srims.service.stamp.StampApplicationService + '/GetWaitingCensorStamp';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorStamp', '待审核文印');
}
Srims.Poll.getPollAction_WaitingDepartmentCensorStamp = function() {
    var url = Srims.service.stamp.StampApplicationService + '/GetWaitingDepartmentCensorStamp';
    Srims.Poll.getPollAction(url, 'SpanWaitingDepartmentCensorStamp', '待审核文印');
}
Srims.Poll.getPollAction_WaitingCensorAwardDocument = function() {
    var url = Srims.service.documents.AwardDocumentService + '/GetWaitingCensorCount';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorAwardDoucment', '待审核奖励文档');
}
Srims.Poll.getPollAction_WaitingCensorExpertEdit = function() {
    var url = Srims.service.experts.ExpertInfoHistoryService + '/GetWaitingCensorExpertEdit';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorExpertEdit', '审核专家编辑信息');
}

Srims.Poll.getPollAction_WaitingAllocationProjectPerformance = function() {
    var url = Srims.service.performance.PerformanceAllocationService + '/GetWaitingAllocationProjectPerformance';
    Srims.Poll.getPollAction(url, 'SpanWaitingAllocationProjectPerformance', '课题组间接费查询');
}

Srims.Poll.getPollAction_WaitingCensorVerticalProjectPerformanceAllocation = function() {
    var url = Srims.service.performance.PerformanceAllocationService + '/GetWaitingCensorVerticalProjectPerformance';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorVerticalProjectPerformanceAllocation', '审核绩效分配');
}
Srims.Poll.getPollAction_WaitingCensorHorizontalProjectPerformanceAllocation = function() {
    var url = Srims.service.performance.PerformanceAllocationService + '/GetWaitingCensorHorizontalProjectPerformance';
    Srims.Poll.getPollAction(url, 'SpanWaitingCensorHorizontalProjectPerformanceAllocation', '审核绩效分配');
}
Srims.Poll.getPollAction = function(url, domID, domText) {
    Ext.Ajax.request({
        url: url,
        method: 'POST',
        scope: this,
        success: function(response) {
            var node = Ext.DomQuery.selectNode('/Record', response.responseXML);
            var value = Ext.DomQuery.selectValue('/Count', node);
            if (Ext.getDom(domID))
                Ext.getDom(domID).innerHTML = parseInt(value, 10) > 0 ? "<span style='font-weight:bolder'>" + domText + '(' + value + ')</span>' : domText;
        }
    });
}
Srims.Poll.addPollAction = function(pollAction) {
    Srims.Poll.pollActionList[Srims.Poll.pollActionList.length] = pollAction;
}
Srims.Poll.startPolls = function() {
    for (var i = 0; i < Srims.Poll.pollActionList.length; i++) {
        this.action = {
            run: Srims.Poll.pollActionList[i],
            interval: 1000 * 60 * 5
        }
        Ext.TaskMgr.start(this.action);
    }
}
Srims.Poll.startPollAction = function(pollAction) {
    if (pollAction == undefined)
        return;
    pollAction();
};Srims.exportAction = function(){
}

Srims.exportAction.setExportQueryParams = function(filterParams, queryParams){
    var exportParams = {};
    Object.clone(exportParams, [filterParams, queryParams]);
    exportParams.limit = 10000;
    exportParams.token = null;
    return exportParams;
}
Srims.exportAction.showExportWindow = function(windowId, queryUrl, params, columns, excelTitle){
    var window = new Srims.component.ExportWindow(windowId, queryUrl, params, columns, excelTitle);
    window.show();
}


Srims.exportAction.exportToExcel = function(store, columns, excelTitle){

    var contentXML = Srims.exportAction.getExcelXml(columns, store, excelTitle);
    
    Ext.Ajax.request({
        url: Srims.service.ExportService + '/SendDataForStatisticExport',
        method: 'POST',
        params: {
            content: contentXML
        },
        success: function(response){
            var guid = response.responseText;
            document.location.href = Srims.service.ExportService + '/GetDataForStatisticExport?guid=' + guid;
        }
    })
}


//将要导出的数据拼成Excel格式的XML
//columns:选择导出的列
//exportStore:需要独处的数据
//excelTitle:导出的Excel的名称
Srims.exportAction.getExcelXml = function(columns, exportStore, excelTitle){
    var worksheet = Srims.exportAction.createWorksheet(columns, exportStore, excelTitle);
    
    var exportExcelXml = new Ext.ux.StringBuilder('<?xml version="1.0" encoding="utf-8"?>');
    
    exportExcelXml.append('<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">').append('<o:DocumentProperties><o:Title>').append(excelTitle).append('</o:Title></o:DocumentProperties>').append('<ss:ExcelWorkbook>').append('<ss:WindowHeight>').append(worksheet.height).append('</ss:WindowHeight>').append('<ss:WindowWidth>').append(worksheet.width).append('</ss:WindowWidth>').append('<ss:ProtectStructure>False</ss:ProtectStructure>').append('<ss:ProtectWindows>False</ss:ProtectWindows>').append('</ss:ExcelWorkbook>').append('<ss:Styles>').append('<ss:Style ss:ID="Default">').append('<ss:Alignment ss:Vertical="Top" ss:WrapText="1" />').append('<ss:Font ss:FontName="arial" ss:Size="10" />').append('<ss:Borders>').append('<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />').append('<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />').append('<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />').append('<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />').append('</ss:Borders>').append('<ss:Interior />').append('<ss:NumberFormat />').append('<ss:Protection />').append('</ss:Style>').append('<ss:Style ss:ID="title">').append('<ss:Borders />').append('<ss:Font />').append('<ss:Alignment ss:WrapText="1" ss:Vertical="Center" ss:Horizontal="Center" />').append('<ss:NumberFormat ss:Format="@" />').append('</ss:Style>').append('<ss:Style ss:ID="headercell">').append('<ss:Font ss:Bold="1" ss:Size="10" />').append('<ss:Alignment ss:WrapText="1" ss:Horizontal="Center" />').append('<ss:Interior ss:Pattern="Solid" ss:Color="#A3C9F1" />').append('</ss:Style>').append('</ss:Styles>').append(worksheet.xml).append('</ss:Workbook>');
    
    return exportExcelXml.toString();
}

//拼WorkSheet部分的XML
Srims.exportAction.createWorksheet = function(columns, exportStore, title){
    // Calculate cell data types and extra class names which affect formatting
    var columnsArray = columns.Name;
    var columnLabelsArray = columns.BoxLabel;
    var columnRendererArray = columns.Renderer;
    
    var cellType = [];
    var collumnsCount = columnsArray.length;
    var totalWidth = 0;
    
    var columnXmlArray = new Array();
    var headerXmlArray = new Array();
    for (var i = 0; i < collumnsCount; i++) {
        var field = exportStore.recordType.prototype.fields.get(columnsArray[i]);
        var thisColumnWidth = field.width == null ? 100 : field.width;
        totalWidth += thisColumnWidth;
        
        columnXmlArray.push('<ss:Column ss:AutoFitWidth="1" ss:Width="');
        columnXmlArray.push(thisColumnWidth);
        columnXmlArray.push('" />');
        headerXmlArray.push('<ss:Cell ss:StyleID="headercell">');
        headerXmlArray.push('<ss:Data ss:Type="String">');
        headerXmlArray.push(columnLabelsArray[i]);
        headerXmlArray.push('</ss:Data>');
        headerXmlArray.push('<ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>');
    }
    var columnXml = columnXmlArray.join("");
    columnXmlArray = null;
    var headerXml = headerXmlArray.join("");
    headerXmlArray = null;
    var result = {
        height: 9000,
        width: Math.floor(totalWidth * 30) + 50
    };
    
    
    // Generate worksheet header details.
    var headerDetailXml = new Array();
    headerDetailXml.push('<ss:Worksheet ss:Name="' + title + '">');
    headerDetailXml.push('<ss:Names>');
    headerDetailXml.push('<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'');
    headerDetailXml.push(title);
    headerDetailXml.push('\'!R1:R2" />');
    headerDetailXml.push('</ss:Names>');
    headerDetailXml.push('<ss:Table x:FullRows="1" x:FullColumns="1"');
    headerDetailXml.push(' ss:ExpandedColumnCount="');
    headerDetailXml.push(collumnsCount + 2);
    headerDetailXml.push('" ss:ExpandedRowCount="');
    headerDetailXml.push(exportStore.getCount() + 1);
    headerDetailXml.push('">');
    headerDetailXml.push(columnXml);
    headerDetailXml.push('<ss:Row ss:AutoFitHeight="1">');
    headerDetailXml.push(headerXml);
    headerDetailXml.push('</ss:Row>');
    
    // Generate the data rows from the data in the Store
    var rowsDataXml = new Array();
    for (var i = 0; i < exportStore.data.items.length; i++) {
    
        var cellDataXml = new Array();
        
        for (var j = 0; j < collumnsCount; j++) {
            var renderer = columnRendererArray[j];
            
            if (renderer == '' || renderer == null || renderer == undefined) 
                var cellData = exportStore.data.items[i].data[columnsArray[j]];
            else 
                var cellData = renderer(exportStore.data.items[i].data[columnsArray[j]]);
            
            cellDataXml[j] = '<ss:Cell ss:StyleID="Default"><ss:Data ss:Type="' + 'String' + '">' + '<![CDATA[' + cellData + ']]>' + '</ss:Data></ss:Cell>';
        }
        
        rowsDataXml[i] = '<ss:Row>' + cellDataXml.join('') + '</ss:Row>';
    }
    headerDetailXml.push(rowsDataXml.join(''));
    var headerDetail = new Ext.ux.StringBuilder(headerDetailXml.join(''));
    result.xml = headerDetail.append('</ss:Table>').append('<x:WorksheetOptions>').append('<x:PageSetup>').append('<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />').append('<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />').append('<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />').append('</x:PageSetup>').append('<x:FitToPage />').append('<x:Print>').append('<x:PrintErrors>Blank</x:PrintErrors>').append('<x:FitWidth>1</x:FitWidth>').append('<x:FitHeight>32767</x:FitHeight>').append('<x:ValidPrinterInfo />').append('<x:VerticalResolution>600</x:VerticalResolution>').append('</x:Print>').append('<x:Selected />').append('<x:DoNotDisplayGridlines />').append('<x:ProtectObjects>False</x:ProtectObjects>').append('<x:ProtectScenarios>False</x:ProtectScenarios>').append('</x:WorksheetOptions>').append('</ss:Worksheet>');
    return result;
};



Srims.CensorState = new function(){
};

Srims.CensorState.unSubmited='UnSubmited';
Srims.CensorState.waitingCensor='WaitingCensor';
Srims.CensorState.reject='Reject';
Srims.CensorState.passed='Passed';
Srims.CensorState.canceled='Canceled';

Srims.CensorState.Render = function(value){
    switch (value) {
        case 'UnSubmited':
            return '未提交';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '<span class="error">未知</span>';
    }
};
Ext.namespace('Srims.SubjectNature');

Srims.SubjectNature.Science = 'Science';
Srims.SubjectNature.Liberal = 'Liberal';


Srims.subjectNatureRender = function(value, metadata){
    switch (value) {
        case 'Science':
            return '理工科';
        case 'Liberal':
            return '文科';
        default:
            return '未知';
    }
}
Srims.subjectNatureStore = [['Science', '理工科'], ['Liberal', '文科']];

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.submitResource = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){
    var user = Srims.currentLoginLog.user;
    
    window.formPanel.getForm().submit({
        params: saveParams,
        url: Srims.service.ResourceService + '/IsSizeable',
        failure: function(){
            if (user.userRoleType == 'Administrator' && user.isSuper) {
                Ext.MessageBox.confirm('上传文件大于100M', '上传文件大于20M，你确定要上传文件吗？', function(buttonId){
                    if (buttonId == 'yes') 
                        Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
                }, this);
            }
            else 
                Ext.Msg.show({
                    title: '不能上传文件',
                    msg: '每个文件不能大于100M，请联系超级管理员上传大于20M的文件。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
        },
        success: function(form, action){
            Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
        }
        
    });
}
Srims.documents.submitResources = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){

    window.formPanel.getForm().submit({
        params: saveParams,
        url: requestUrl,
        waitMsg: waitMsg,
        method: 'post',
        success: function(form, action){
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            if (window.store) 
                window.store.load();
            
            window.close();
        }
    });
    
}
Srims.documents.deleteResource = function(documentGuid, id, url, store, msg, msgInfo){
    var _params = {
        guid: documentGuid,
        id: id
    }
    Ext.Ajax.request({
        url: url,
        params: _params,
        success: function(){
            store.load();
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    });
}

Srims.documents.downLoadResource = function(guid, subUrl){
    var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1
    
    document.location.href = '/Service/Resource.asmx' + subUrl + '?guid=' + guid + '&isIE=' + isIE;
}



if (!Srims.expertGuide) 
    Ext.namespace('Srims.expertGuide');

Srims.expertGuide.showFundAllocationProcessPanel = function(){
    var panelId = 'expertGuid_FundAllocationProcessPanel';
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        panel = new Srims.fund.ExpertGuidFundAllocationPanel(panelId, 'icon-expert-guid-fund-allocation');
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.expertGuide.showFundDescendProcessPanel = function(){
    var panelId = 'expertGuid_FundAllocationProcessPanel';
    var panel = Ext.getCmp(panelId);
    if (panel) 
        Srims.WorkSpace.getWorkSpace().remove(panel);
    
    var panelId = 'expertGuid_FundDescendProcessPanel';
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        panel = new Srims.fund.ExpertGuidFundDescendPanel(panelId, 'icon-expert-guid-fund-descend');
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.expertGuide.closeFundDescendProcessPanel = function(){
    var panelId = 'expertGuid_FundDescendProcessPanel';
    var panel = Ext.getCmp(panelId);
    if (panel) 
        Srims.WorkSpace.getWorkSpace().remove(panel);
}
Srims.expertGuide.getCompleteHtml = function(html){
    return '<div class="expert-guide-complete-description"><div class="expert-guide-complete-image"><img width="80" height="80" src="../images/expert-navigate/complete.png"/></div>' + html + '</div>';
}
Srims.expertGuide.next = function(panel){
    panel.button.setText('正在执行下一步');
    panel.button.disable();
    
    panel.panel._processStep++;
    panel.panel.reset();
}


if (!Srims.expertGuide) 
    Ext.namespace('Srims.expertGuide');

Srims.expertGuide.fundAllocation_ProcessDescriptionStore = [{
    name: '选择经费',
    icon: 'fund-allocation/fund-select',
    description: '<fieldset><legend>帮助</legend><div class="expert-guide-description">请在下面的列表中选择您要分配的项目，然后点击"下一步"。<br />如果下面的列表中没有您要分配经费的项目，可能的原因是经费还没有下拨到这个项目，请<a href="#" onclick="Srims.ExpertNavigatePanel.Action.fundDescend()">单击此处进行经费下拨</a>（仅限横向项目）。如有其它疑问，请与管理员联系。</div></fieldset>'
}, {
    name: '分配/提交',
    icon: 'fund-allocation/allocate',
    buttonNextText: '分配',
    description: '<fieldset><legend>帮助</legend><div class="expert-guide-description">点击“分配”按钮将经费分配到经费成员。<br />分配完所有经费后，点击“提交”按钮提交经费分配。</div></fieldset>'
}, {
    name: '完成',
    icon: 'fund-allocation/complete',
    description: Srims.expertGuide.getCompleteHtml('<div class="expert-guide-description"><ul><li>您的经费分配申请已提交成功！请等待管理员审核。</li></li>管理员审核通过后，将给您发送提醒邮件，请注意的查收。</li><li><br />请点击”完成“按钮，退出本向导</li></ul></div>')
}];

Srims.expertGuide.fundDescend_ProcessDescriptionStore = [{
    name: '选择经费',
    icon: 'fund-descend/finance-select',
    description: '<fieldset><legend>提示信息</legend><div  class="expert-guide-description"><ul><li>请输入您的经费来款信息的基本信息（至少填写一个查询项），点击“查询”按钮进行查询。</li></li>然后在查询结果中选择您的经费到来款信息。点击“下一步”继续。</li></ul></div></fieldset>'
}, {
    name: '选择下拨项目',
    icon: 'fund-descend/project-select',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>在下面的列表中选择您要下拨的项目。您只能对横向项目进行经费下拨。</li><li>如果列表中没有您要下拨的项目，请确定这个项目是否立项。如果没有立项，<a href="#">点进这里</a>进行项目立项；如果已经立项，请确定您的立项申请是否被管理员审核通过。</li></ul></div></fieldset>'
}, {
    name: '填写下拨金额',
    icon: 'fund-descend/amount-edit',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>请输入下拨金额。</li><li>下拨金额必须大于零且不能大于项目的未到金额。</li></ul></div></fieldset>'
}, {
    name: '确认提交',
    icon: 'fund-descend/confirm',
    buttonNextText: '提交',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>请确认下拨信息是否正确。确认无误后，点击“提交”按钮提交审核申请，等待管理员审核。</li><li>如果需要修改，请点击“上一步”，进行修改。</li></ul></div></fieldset>'
}, {
    name: '完成',
    icon: 'fund-descend/complete',
    description: Srims.expertGuide.getCompleteHtml('<div class="expert-guide-description"><ul><li>您的经费下拨申请已提交成功！请等待管理员审核。</li></li>管理员审核通过后，将给您发送提醒邮件，请注意的查收。审核通过后，您即可分配此笔经费。</li><li><br />请点击”完成“按钮，退出本向导</li></ul></div>')
}];

Srims.expertGuide.StampApply_ProcessDescriptionStore = [{
    name: '基本信息',
    icon: 'stamp-apply/edit-basic',
    description: '<fieldset><legend>提示信息</legend><div  class="expert-guide-description"><ul><li>请输入您的文印申请的基本信息<font color="#FF0000">（涉密材料不用提交)</font>，其中<font color="#FF0000">项目</font>来源可查询，若<font color="#FF0000">填写\'其它\'</font>，则在下面的项目来源输入框中手动添加；<font color="#FF0000">经办人默认为负责人</font>，也可填写他人。点击“下一步”继续。上传盖章文档必须为pdf格式，不大于20M。如果您想重新选择文印是否与项目相关，请关闭本页面后重新打开。</li></ul></div></fieldset>'
}, {
    name: '材料/章型',
    icon: 'stamp-apply/edit-stuff',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>在下面的材料列表中点击添加在弹出的窗口中添加新的材料信息；如要删除已有的材料信息，在列表中选择此材料，点击删除按钮即可。</li><li>点击”下一步“按钮，进行文印的提交。</li></ul></div></fieldset>'
}, {
    name: '确认提交',
    icon: 'stamp-apply/confirm',
    buttonNextText: '提交',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>请确认文印信息是否正确。确认无误后，点击“提交”按钮提交审核申请，等待管理员审核。</li><li>如果需要修改，请点击“上一步”，进行修改。</li></ul></div></fieldset>'
}, {
    name: '完成',
    icon: 'stamp-apply/complete',
    description: Srims.expertGuide.getCompleteHtml('<div class="expert-guide-description"><ul><li>您的文印申请已提交成功！请等待管理员审核。</li></li>管理员审核通过后，将给您发送提醒邮件，请注意查收。审核通过后，您即可进行文印盖章。</li><li><br />请点击”完成“按钮，退出本向导</li></ul></div>')
}];

Srims.expertGuide.ProjectEdit_ProcessDescriptionStore = [{
    name: '选择/新建',
    icon: 'project-new/select-or-new',
    description: '<fieldset><legend>提示信息</legend><div  class="expert-guide-description"><ul><li>请选择待提交列表中一个的项目，点击“下一步”继续编辑提交，或者直接点击“下一步”新建一个项目。</li></ul></div></fieldset>'
}, {
    name: '外协信息',
    icon: 'project-new/basic',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>如项目有外协经费，请先填写“外协分配”，“外协单位”名称在系统数据库中没有的请点击“新建外协单位”添加，须经管理员审核通过后方可完成该项目立项。</li><li><span style="color:red">如项目类型为“科技成果转让”或没有外协分配，则直接点击“下一步”按钮，进行项目基本信息录入。</span></li><li><span style="color:red">外协单位可进行模糊查询，查询的内容必须连续。例如，“中国海洋大学”可以输入“中国”或“海洋”或“大学”或“中国海”等等，不能输入“海大”等简称。如果外协单位中查找不到你所需要的单位，请点击“新建外协单位”。</span></li></ul></div></fieldset>'
},{
    name: '基本信息',
    icon: 'project-new/basic',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>编辑项目的基本信息</li><li>点击”下一步“按钮，进行项目成员管理。</li></ul></div></fieldset>'
}, {
    name: '成员管理',
    icon: 'project-new/member',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>管理项目成员。请严格按照项目批复或合同任务书中位次添加完成人员，该信息将导入人事处岗位评聘系统，作为职称评定的依据，若之前未全部添加，请联系项目管理员补充。</li><li>点击”下一步“按钮，进行项目合同的管理。</li></ul></div></fieldset>'
}, {
    name: '合同管理',
    icon: 'project-new/contract',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>管理项目合同。</li><li>点击”下一步“按钮，进行项目的文档管理。</li></ul></div></fieldset>'
}, {
    name: '文档管理',
    icon: 'project-new/document',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>管理项目文档。</li><li>点击”下一步“按钮，进行项目的付款计划管理。</li></ul></div></fieldset>'
}, {
    name: '付款计划',
    icon: 'project-new/pay-plan',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>管理项目的付款计划。</li><li>点击”下一步“按钮，确认已编辑的信息。</li></ul></div></fieldset>'
}, {
    name: '确认提交',
    icon: 'project-new/confirm',
    buttonNextText: '提交立项申请',
    description: '<fieldset><legend>提示信息</legend><div style="margin: 10px; color:Red">请注意：您还有最后一步需要操作：</div><div class="expert-guide-description"><ul><li>请确认项目信息是否正确。确认无误后，点击“提交”按钮提交项目，等待管理员审核。</li><li>如果需要修改，请点击“上一步”，进行修改。</li></ul></div></fieldset>'
}, {
    name: '完成',
    icon: 'project-new/complete',
    description: Srims.expertGuide.getCompleteHtml('<div class="expert-guide-description"><ul><li>您的项目已提交成功！请等待管理员审核。</li></li>管理员审核通过后，将给您发送提醒邮件，请注意查收。</li><li><br />请点击”完成“按钮，退出本向导</li></ul></div>')
}];

if (!Srims.expertGuide) 
    Ext.namespace('Srims.expertGuide');

Srims.expertGuide.testProcessDescriptionStore1 = [{
    name: '选择经费分配',
    icon: 'test/step1'
}, {
    name: '经费分配',
    icon: 'test/step2'
}, {
    name: '确认提交',
    icon: 'test/step3'
}, {
    name: '完成',
    icon: 'test/step4'
}];

Srims.expertGuide.testProcessDescriptionStore2 = [{
    name: '单步骤',
    icon: 'test/step1'
}];

Srims.expertGuide.ProcessesShowForm = function(processesDescriptionStore, title){

    this._title = title;
    this._processesDescriptionStore = processesDescriptionStore;
    this._stepIdArray = Srims.expertGuide.ProcessesShowForm._getStepIdArray(processesDescriptionStore);
    
    Srims.expertGuide.ProcessesShowForm.superclass.constructor.call(this, {
        closable: false,
        height: 80,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._title,
        collapsible: true,
        frame: true,
        bodyStyle: 'padding:0px 15px 0',
        style: 'margin-bottom: 5px',
        html: Srims.expertGuide.ProcessesShowForm._getItemsHtml(processesDescriptionStore, this._stepIdArray)
    });
    
    this.setCurrentStep = function(stepNumber){
        for (var i = 0; i < processesDescriptionStore.length; i++) {
            var current_id = this._stepIdArray[i];
            
            if (i == 0) {
                if (stepNumber > 0) 
                    this._setImage(current_id, processesDescriptionStore[i].icon);
                else 
                    this._setImage(current_id, processesDescriptionStore[i].icon + '-unfinished');
                
                continue;
            }
            
            var sepereter_id = this._stepIdArray[i - 1] + '-' + current_id;
            
            if (i < stepNumber) {
                this._setImage(current_id, processesDescriptionStore[i].icon);
                this._setImage(sepereter_id, 'step-sepereter');
            }
            else {
                this._setImage(current_id, processesDescriptionStore[i].icon + '-unfinished');
                this._setImage(sepereter_id, 'step-sepereter-unfinished');
            }
            
        }
    };
    
    this._setImage = function(id, src){
        Ext.getDom(id).src = 'images/expert-navigate/' + src + '.png';
    }
}
Ext.extend(Srims.expertGuide.ProcessesShowForm, Ext.Panel, {});

Srims.expertGuide.ProcessesShowForm._getStepIdArray = function(processesDescriptionStore){
    var idArray = [];
    for (var i = 0; i < processesDescriptionStore.length; i++) {
        var id = Ext.id();
        idArray[idArray.length] = id;
        processesDescriptionStore[i].elementId = id;
    }
    return idArray;
}

Srims.expertGuide.ProcessesShowForm._getItemsHtml = function(processesDescriptionStore, stepIdArray){
    var html = '<div style="float: right">';
    
    html += Srims.expertGuide.ProcessesShowForm._ProcessesItemHtmlTemplate.apply(processesDescriptionStore[0]);
    for (var i = 1; i < processesDescriptionStore.length; i++) {
        html += '<div style="text-align:center; width: 20px; float:left;"><image id="' + stepIdArray[i - 1] + '-' + stepIdArray[i] + '" src="images/expert-navigate/step-sepereter-unfinished.png"></div>';
        html += Srims.expertGuide.ProcessesShowForm._ProcessesItemHtmlTemplate.apply(processesDescriptionStore[i]);
    }
    
    html += '</div>';
    return html;
}

Srims.expertGuide.ProcessesShowForm._ProcessesItemHtmlTemplate = new Ext.XTemplate('<div style="text-align:center; width: 80px; float:left;">', '<image width="24" height="24" id="{elementId}" src="images/expert-navigate/{icon}-unfinished.png">', '<br />', '{name}', '</div>');

if (!Srims.expertGuide) 
    Ext.namespace('Srims.expertGuide');

Srims.expertGuide.SingleProcessOperatePanel = function(guidName, processesDescriptionStore, processesPanels) {

    this._buttonPreviousStep = new Ext.Button({
        minWidth: 80,
        text: '上一步',
        form: this
    });
    this._buttonNextStep = new Ext.Button({
        minWidth: 80,
        text: '下一步',
        form: this
    });
    this._buttonComplete = new Ext.Button({
        minWidth: 80,
        text: '完成',
        form: this
    });
    this._params = {};
    this._processesDescriptionStore = processesDescriptionStore;
    this._processesPanels = processesPanels;
    this._processStep = 0;

    var divId = 'DivExpertGuid_' + guidName;
    this._helpDescriptionPanel = new Ext.Panel({
        bodyStyle: 'padding:10px 5px 10px 5px',
        style: 'margin-bottom: 2px',
        html: '<div id=' + divId + '>'
    });

    var items = [this._helpDescriptionPanel];
    for (var i = 0; i < this._processesPanels.length; i++) {
        this._processesPanels[i].panel = this;
        this._processesPanels[i].button = this._buttonNextStep;
        items[items.length] = this._processesPanels[i];
    }

    Srims.expertGuide.SingleProcessOperatePanel.superclass.constructor.call(this, {
        deferHeight: false,
        buttonAlign: 'left',
        title: '占用',
        items: items,
        buttons: [this._buttonPreviousStep, this._buttonNextStep, this._buttonComplete]
    });

    //控制按钮的显示
    this.setButtonVisible = function() {

        this._buttonPreviousStep.setVisible(this._processStep + 1 != this._processesDescriptionStore.length);
        this._buttonPreviousStep.setDisabled(this._processStep == 0);

        this._buttonNextStep.setVisible(this._processStep + 1 != this._processesDescriptionStore.length);
        this._buttonComplete.setVisible(this._processStep + 1 == this._processesDescriptionStore.length);
    }
    this.setButtonVisible();
    //控制panel的显示
    this.setPanelVisible = function() {
        for (var i = 1; i < this.items.length; i++) {
            if (this.items.get(i))
                this.items.get(i).setVisible(this._processStep + 1 == i);
        }
        //控制控件获得焦点
        if (this.items.get(this._processStep + 1) && this.items.get(this._processStep + 1).focus)
            this.items.get(this._processStep + 1).focus();

        this.doLayout();
    }
    this.setPanelVisible();
    //控制title的显示
    this.setPanelTitle = function() {
        var title = this._processesDescriptionStore[this._processStep].name;
        this.setTitle(title);
    }
    this.setPanelTitle();
    //控制帮助说明的显示
    this.setHelpDescription = function() {
        if (!Ext.getDom(divId))
            this._helpDescriptionPanel.html = '<div id=' + divId + '>' + this._processesDescriptionStore[this._processStep].description + '</div>';
        else {
            Ext.getDom(divId).innerHTML = ' ';
            Ext.getDom(divId).innerHTML = this._processesDescriptionStore[this._processStep].description;
        }
    }
    this.setHelpDescription();
    //控制按钮文字的显示
    this.setButtonText = function() {
        if (this._processesDescriptionStore[this._processStep].buttonNextText)
            this._buttonNextStep.setText(this._processesDescriptionStore[this._processStep].buttonNextText);
        else
            this._buttonNextStep.setText('下一步');

        if (this._processesDescriptionStore[this._processStep].buttonPreviousText)
            this._buttonPreviousStep.setText(this._processesDescriptionStore[this._processStep].buttonNextText);
        else
            this._buttonPreviousStep.setText('上一步');

        this._buttonNextStep.setDisabled(false);
    }
    this.setButtonText();
    //控制进度图标的显示
    this.setProcessesIcons = function() {
        this.panel._processesShowPanel.setCurrentStep(this._processStep + 1);
    }
    //重置页面
    this.reset = function() {
        this.setButtonVisible();
        this.setPanelVisible();
        this.setProcessesIcons();
        this.setPanelTitle();
        this.setHelpDescription();
        this.setProcessesIcons();
        this.setButtonText();
    }

    this.buttonPreviousStep_click = function(button, e) {
        var form = this.form;
        if (form._processesPanels[form._processStep].previous) {
            form._processesPanels[form._processStep].previous();
        }

        form._processStep = form._processStep - 1;
        form.reset();
    }
    this.buttonNextStep_click = function(button, e) {
        var form = this.form;
            form._processesPanels[form._processStep].next();
        
    }
    this.buttonComplete_click = function(button, e) {
        var form = this.form;
        Srims.WorkSpace.getWorkSpace().remove(form.panel);
    }
    this._buttonPreviousStep.on('click', this.buttonPreviousStep_click);
    this._buttonNextStep.on('click', this.buttonNextStep_click);
    this._buttonComplete.on('click', this.buttonComplete_click);
}
Ext.extend(Srims.expertGuide.SingleProcessOperatePanel, Ext.Panel, {});


if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.IDValueRecord = Ext.data.Record.create([{
    name: 'id',
    type: 'string',
    mapping: 'ID'
}, {
    name: 'value',
    type: 'string',
    mapping: 'Value'
}]);
Srims.data.Entity.apply(Srims.data.IDValueRecord);

Srims.data.IDValueRecordXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.data.IDValueRecordXmlReader.superclass.constructor.call(this, Srims.data.IDValueRecord);
    }
});

Srims.data.IDValueRecordStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.data.IDValueRecordStore.superclass.constructor.call(this, (new Srims.data.IDValueRecordXmlReader()), load_url);
    },
    buildGridFilterItems: function(){
        this.gridFilterItems = [];
        for (var i = 0; i < this.getCount(); i++) {
            this.gridFilterItems[this.gridFilterItems.length] = {
                id: this.getAt(i).get('id'),
                text: this.getAt(i).get('value')
            };
        }
    },
    buildCheckboxGroupItems: function(){
        this.checkboxGroupItems = [];
        for (var i = 0; i < this.getCount(); i++) {
            this.checkboxGroupItems[this.checkboxGroupItems.length] = {
                boxLabel: this.getAt(i).get('value'),
                name: this.getAt(i).get('id')
            };
        }
    }
});

if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.XmlStore = Ext.extend(Ext.data.Store, {
    constructor: function(reader, load_url, params){
    
        if (params == undefined) 
            params = {};
        
        params.token = 'undefined';
        if (Srims.currentLoginLog) 
            params.token = Srims.currentLoginLog.token;
        this.params = params;
        
        Srims.data.XmlStore.superclass.constructor.call(this, {
        
            remoteSort: true,
            totalProperty: 'total',
            proxy: new Ext.data.HttpProxy(new Ext.data.Connection({
                url: load_url,
                method: 'POST',
                extraParams: params
            })),
            reader: reader
        });
    },
    getExtraParams: function(){
        return this.params;
    }
});

if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.XmlReader = Ext.extend(Ext.data.XmlReader, {
    constructor: function(record){
        Srims.data.XmlReader.superclass.constructor.call(this, {
            totalRecords: 'Total',
            record: 'Record',
            id: 'ID'
        }, record);
    }
});

if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.Entity = function(){
}
Srims.data.Entity.isNew = function(){
    return this.get('id') == undefined || this.get('id') == 0;
}
Srims.data.Entity.apply = function(subClass){
    subClass.prototype.isNew = Srims.data.Entity.isNew;
}

if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.CheckBoxGroup = Ext.extend(Ext.form.CheckboxGroup, {

    getSelecetedValue: function() {
        var returnValue = '';
        var checkboxGroupItems = this.items;

        for (var i = 0; i < checkboxGroupItems.length; i++) {
            if (checkboxGroupItems.itemAt(i).checked) {
                returnValue += checkboxGroupItems.itemAt(i).name + ',';
            }
        }
        return returnValue;
    },
    getSelecetedValueNameAndBoxLabel: function() {

        var returnValue = {};
        returnValue.Name = [];
        returnValue.BoxLabel = [];
        returnValue.Renderer = [];
        returnValue.Width = [];
        var checkboxGroupItems = this.items;

        for (var i = 0; i < checkboxGroupItems.length; i++) {
            if (checkboxGroupItems.itemAt(i).checked) {
                returnValue.Name.push(checkboxGroupItems.itemAt(i).name);
                returnValue.BoxLabel.push(checkboxGroupItems.itemAt(i).boxLabel);
                returnValue.Renderer.push(checkboxGroupItems.itemAt(i).renderFunction == undefined ? '' : checkboxGroupItems.itemAt(i).renderFunction);
                returnValue.Width.push(checkboxGroupItems.itemAt(i).columnsWidth);
            }
        }
        return returnValue;
    },
    setAllValueSelectedNameAndBoxLabel: function() {
        var checkboxGroupItems = this.items;

        for (var i = 0; i < checkboxGroupItems.length; i++)
            checkboxGroupItems.itemAt(i).setValue(true);
    }
});


Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray = function(array, checkedValues) {

    var items = [];
    for (var i = 0; i < array.length; i++) {
        items[i] = {
            boxLabel: array[i][1],
            name: array[i][0],
            renderFunction: array[i][2],
            columnsWidth: array[i][3]
        };
    }
    if (checkedValues && checkedValues.length > 0) {
        var checkedValuesArray = checkedValues.split(",");
        if (checkedValuesArray && checkedValuesArray.length > 0) {
            for (var j = 0; j < checkedValuesArray.length; j++) {
                for (var k = 0; k < items.length; k++) {
                    if (checkedValuesArray[j] == items[k].name) {
                        items[k].checked = true;
                        break;
                    }
                }
            }
        }
    }
    return items;
}

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.GridPanel = Ext.extend(Ext.grid.GridPanel, {
    constructor: function(params){
    
        if (params.stateful == undefined) 
            params.stateful = true;
        if (params.enableColumnHide == undefined) 
            params.enableColumnHide = true;
        if (params.enableColumnMove == undefined) 
            params.enableColumnMove = true;
        if (params.border == undefined) 
            params.border = false;
        if (params.region == undefined) 
            params.region = 'center';
        if (params.loadMask == undefined) 
            params.loadMask = true;
        if (params.closable == undefined) 
            params.closable = true;
        if (params.defaultBBar) 
            params.bbar = new Ext.PagingToolbar({
                pageSize: 40,
                store: params.store,
                plugins: params.plugins,
                displayInfo: true,
                displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
                emptyMsg: "没有可以显示的记录"
            })
        params.view = new Ext.grid.GridView({
            forceFit: true,
            ignoreAdd: true,
            emptyText: '没有满足条件的记录'
        });
        
        this._store = params.store;
        Srims.component.GridPanel.superclass.constructor.call(this, params);
    },
    getStore: function(){
        return this._store;
    },
    onDestroy: function(){
        if (this.queryWindow) {
            this.queryWindow.show();
            this.queryWindow.close();
        }
        Srims.component.GridPanel.superclass.onDestroy.call(this);
    }
})

if (!Srims.component) 
    Ext.namespace('Srims.component');
Srims.component.EntityComboBox = function(params) {

    this.selectEntityId = params.entityId;
    params.valueFiled = 'id';
    params.lazyInit = false;
    params.triggerAction = 'all';
    params.forceSelection = true;
    params.store.comboBox = this;

    Srims.component.EntityComboBox.superclass.constructor.call(this, params);
    params.store.on('load', function(store, records) {
        if (records.length == 0)
            store.comboBox.disable();
    });

}

Ext.extend(Srims.component.EntityComboBox, Ext.form.ComboBox, {
    onSelect: function(record) {
        this.selectEntityId = record.get('id');
        Srims.component.EntityComboBox.superclass.onSelect.call(this, record);
    },
    getValue: function() {
        return Srims.component.EntityComboBox.superclass.getValue.call(this) != '' ? this.selectEntityId : undefined;
    },
    getText: function() {
        return Srims.component.EntityComboBox.superclass.getValue.call(this)
    },
    getEntity: function() {
        var selectId = this.getValue();
        if (selectId == undefined)
            return undefined;

        return this.store.getById(selectId);
    },
    setSelectEntityId: function(value) {
        this.selectEntityId = value;
    }
});


if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.EntitySearch = function(){
}

Srims.component.EntitySearch.SearchComboBox = Ext.extend(Ext.form.ComboBox, {
    typeAhead: false,
    triggerClass: 'searchComboBoxTrigger',
    minChars: 2,
    listWidth: 300,
    itemSelector: 'div.search-item',
    onLoad: function(){
        if (this.store.getCount() <= 0) {
            this.selectEntity = undefined;
            this.selectEntityId = undefined;
        }
        Srims.component.EntitySearch.SearchComboBox.superclass.onLoad.call(this);
    },
    onSelect: function(record){
        this.selectEntity = record;
        this.selectEntityId = record.get('id');
        
        Srims.component.EntitySearch.SearchComboBox.superclass.onSelect.call(this, record);
    },
    getSelectEntityId: function(){
        return Srims.component.EntitySearch.SearchComboBox.superclass.getValue.call(this) != '' ? this.selectEntityId : undefined;
    },
    getEntity: function(){
        return Srims.component.EntitySearch.SearchComboBox.superclass.getValue.call(this) != '' ? this.selectEntity : undefined;
    },
    getValue: function(){
        return this.getSelectEntityId();
    },
    getText: function(){
        return Srims.component.EntityComboBox.superclass.getValue.call(this);
    },
    validator: function(){
        if (this.getSelectEntityId() == undefined || this.getSelectEntityId() == null) 
            return false;
        else 
            return true;
    },
    setSelectEntityId: function(value){
        this.selectEntityId = value;
    }
})

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.MagazineSearch = function(){
}
Srims.component.MagazineSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
    displayField: 'fullName',
    tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{fullName},{shortName},{ISSN}', '</div></tpl>'),
    onRender: function(B, A) {
        var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
        new Ext.ToolTip({
            target: this.getId(),
            html: '您可以通过输入杂志<span style="color:Red;">全称</span>或简称<span style="color:Red;">或ISSN</span>查找并选择杂志'
        });
        return result;
    }
});
if (!Srims.component)
	Ext.namespace('Srims.component');

Srims.component.ExpertSearch = function() {
}
Srims.component.ExpertSearch.Record = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'name',
	type: 'string',
	mapping: 'Name'
},{
	name: 'number',
	type: 'string',
	mapping: 'Number'
},{
	name: 'college',
	type: 'string',
	mapping: 'College'
},{
	name: 'college2',
	type: 'string',
	mapping: 'College2'
},{
	name: 'post',
	type: 'string',
	mapping: 'Post'
}]);
Srims.component.ExpertSearch.Store = Ext.extend(Ext.data.Store, {
	url: Srims.service.experts.ExpertService + '/SearchExpert',
	reader: new Ext.data.XmlReader({
		record: 'Record',
		idProperty: 'ID'
	}, Srims.component.ExpertSearch.Record)
});
Srims.component.ExpertSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
	store: new Srims.component.ExpertSearch.Store(),
	displayField: 'name',
	tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{name}({number}): {college} {post}', '</div></tpl>'),
	onRender: function(B, A) {
		var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);

		new Ext.ToolTip({
			target: this.getId(),
			html: '您可以通过输入专家<span style="color: Red;">姓名</span>或专家<span style="color: Red;">姓名首字母缩写</span>查找并选择专家'
		});

		return result;
	}
})
if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.OutsourcingSearch = function() {
}
Srims.component.OutsourcingSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'taxNumber',
    type: 'string',
    mapping: 'TaxNumber'
}, {
    name: 'legalRepresentativeName',
    type: 'string',
    mapping: 'LegalRepresentativeName'
}]);
    Srims.component.OutsourcingSearch.Store = Ext.extend(Ext.data.Store, {
        url: Srims.service.common.OutsourcingService + '/SearchOutsourcing',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            idProperty: 'ID'
        }, Srims.component.OutsourcingSearch.Record)
    });
    Srims.component.OutsourcingSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
        store: new Srims.component.OutsourcingSearch.Store(),
        displayField: 'name',
        tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{name}({legalRepresentativeName}): {legalRepresentativeName} {post}', '</div></tpl>'),
        onRender: function(B, A) {
            var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
            new Ext.ToolTip({
                target: this.getId(),
                html: '您可以通过输入外协<span style="color: Red;">名称</span>或者法定代表人姓名<span style="color: Red;"></span>查找并选择外协'
            });

            return result;
        }
    })
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.ProjectSearch = function(){
}
Srims.component.ProjectSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'borrowAmount',
    type: 'int',
    mapping: 'BorrowAmount'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'returnAmount',
    type: 'int',
    mapping: 'ReturnAmount'
}]);

Srims.component.ProjectSearch.Store = function(isReturn){
    Srims.component.ProjectSearch.Store.superclass.constructor.call(this, {
        url: isReturn == undefined ? Srims.service.projects.ProjectService + '/Search' : isReturn ? Srims.service.projects.ProjectService + '/SearchForReturn' : Srims.service.projects.ProjectService + '/SearchForFundDescend',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            idProperty: 'ID'
        }, Srims.component.ProjectSearch.Record)
    })
};
Ext.extend(Srims.component.ProjectSearch.Store, Ext.data.Store);

Srims.component.ProjectSearch.SearchComboBox = function(params){
    if (params.isReturn == undefined) 
        params.tpl = new Ext.XTemplate('<table border="1" class="searchTable" cellpadding="0" cellspacing="0"><tr><td>项目名称</td><td>项目编号</td><td>负责人</td></tr>', '<tpl for="."><tr class="search-item" style="padding: 1px">', '<td style="width:300px">{name}</td><td style="width:120px">{number}</td><td style="width:60px">{principal}</td>', '</tr></tpl>', '</table>');
    else 
        if (params.isReturn) 
            params.tpl = new Ext.XTemplate('<table border="1" class="searchTable" cellpadding="0" cellspacing="0"><tr><td>项目名称</td><td>项目编号</td><td>负责人</td><td>借款金额</td><td>已还金额</td></tr>', '<tpl for="."><tr class="search-item" style="padding: 1px">', '<td style="width:300px">{name}</td><td style="width:120px">{number}</td><td style="width:60px">{principal}</td> <td style="width:60px">{[Money.render(values.borrowAmount)]}</td><td style="width:60px">{[Money.render(values.returnAmount)]}</td>', '</tr></tpl>', '</table>');
        else 
            params.tpl = new Ext.XTemplate('<table border="1" class="searchTable" cellpadding="0" cellspacing="0"><tr><td>项目名称</td><td>项目编号</td><td>负责人</td><td>到校经费</td><td>可下拨金额</td></tr>', '<tpl for="."><tr class="search-item" style="padding: 1px">', '<td style="width:300px">{name}</td><td style="width:120px">{number}</td><td style="width:60px">{principal}</td> <td style="width:60px">{[Money.render(values.fundTotal)]}</td><td style="width:80px">{[Money.render(values.fundCanDescend)]}</td>', '</tr></tpl>', '</table>');
    
    params.store = new Srims.component.ProjectSearch.Store(params.isReturn);
    Srims.component.ProjectSearch.SearchComboBox.superclass.constructor.call(this, params);
};
Ext.extend(Srims.component.ProjectSearch.SearchComboBox, Srims.component.EntitySearch.SearchComboBox, {
    displayField: 'name',
    listWidth: 620,
    itemSelector: 'tr.search-item',
    onRender: function(B, A){
        var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
        
        new Ext.ToolTip({
            target: this.getId(),
            html: '您可以通过输入项目<span style="color: Red;">名称，编号</span>或负责人<span style="color: Red;">姓名首字母缩写</span>查找并选择项目'
        });
        return result;
    }
});

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.FinanceSearch = function(){
}
Srims.component.FinanceSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'receivedDate',
    type: 'date',
    mapping: 'ReceivedDate'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'descendAmount',
    type: 'int',
    mapping: 'DescendAmount'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}]);
Srims.component.FinanceSearch.Store = Ext.extend(Ext.data.Store, {
    url: Srims.service.fund.FinanceService + '/Search',
    reader: new Ext.data.XmlReader({
        record: 'Record',
        idProperty: 'ID'
    }, Srims.component.FinanceSearch.Record)
});

Srims.component.FinanceSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
    store: new Srims.component.FinanceSearch.Store(),
    displayField: 'abstract',
    minChars: 1,
    listWidth: 500,
    tpl: new Ext.XTemplate('<table border="1" class="searchTable" cellpadding="0" cellspacing="0"><tr><td>凭单号</td><td>到帐时间</td><td>到帐金额</td><td>已下拨金额</td><td>说明</td></tr>', '<tpl for="."><tr class="search-item" style="padding: 1px">', '<td style="width:60px">{voucherNumber}</td><td style="width:100px">{[Date.render(values.receivedDate)]}</td><td style="width:70px">{[Money.render(values.amount)]}</td><td style="width:70px">{[Money.render(values.descendAmount)]}</td><td style="width:200px">{abstract}</td>', '</tr></tpl>', '</table>'),
    itemSelector: 'tr.search-item',
    onRender: function(B, A){
        var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
        
        new Ext.ToolTip({
            target: this.getId(),
            html: '您可以通过输入经费到帐信息的<span style="color: Red;">凭单号，到帐金额</span>查找并选择经费到帐信息'
        });
        return result;
    }
});

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.NoticeTextComboBox = Ext.extend(Ext.form.ComboBox, {
    constructor: function(params){
        params.store = new Srims.common.NoticeTextStore(Srims.service.common.NoticeTextService + "/SearchNoticeText", params.noticeTextType);
        params.displayField = 'value';
        params.valueFiled = 'value';
        params.mode = 'remote';
        params.lazyInit = false;
        params.editable = false;
        params.triggerAction = 'all';
        params.forceSelection = true;
        Srims.component.NoticeTextComboBox.superclass.constructor.call(this, params);
    },
    getStore: function(){
        return this.store;
    }
})

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.ThousandPercentField = Ext.extend(Ext.form.NumberField, {
    constructor: function(params){
        params.value = InfluenceFactor.render(params.value);
        params.allowNegative = false;
        params.decimalPrecision = 3;
        Srims.component.ThousandPercentField.superclass.constructor.call(this, params);
    },
    getValue: function(){
        var value = this.getRawValue();
        if (value == '' || value == undefined) 
            return '';
        
        return parseFloat(value).mul(1000);
    }
})


if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.PercentField = Ext.extend(Ext.form.NumberField, {
    constructor: function(params){
        params.value = ExpenseRate.render(params.value);
        params.allowNegative = false;
        params.decimalPrecision = 2;
        Srims.component.PercentField.superclass.constructor.call(this, params);
    },
    getValue: function(){
        var value = this.getRawValue();
        if (value == '' || value == undefined) 
            return '';
        
        return parseFloat(value).mul(100);
    }
})

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.UserSearch = function(){
}
Srims.component.UserSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'email',
    type: 'string',
    mapping: 'Email'
}, {
    name: 'officePhone',
    type: 'string',
    mapping: 'OfficePhone'
}]);
Srims.component.UserSearch.Store = Ext.extend(Ext.data.Store, {
    url: Srims.service.users.UserService + '/SearchUser',
    reader: new Ext.data.XmlReader({
        record: 'Record',
        idProperty: 'ID'
    }, Srims.component.UserSearch.Record)
});
Srims.component.UserSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
    store: new Srims.component.UserSearch.Store(),
    displayField: 'name',
    tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{name}', '<tpl if="this.isEmpty(email)==false">', ':邮箱 {email}', '</tpl>', '<tpl if="this.isEmpty(officePhone)==false">', ',电话 {officePhone}', '</tpl>', '</div></tpl>', {
        isEmpty: function(str){
            return String.isEmpty(str);
        }
    }),
    onRender: function(B, A){
        var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
        
        new Ext.ToolTip({
            target: this.getId(),
            html: '您可以通过输入用户<span style="color:Red;">姓名</span>或用户<span style="color:Red;">姓名首字母拼音</span>查找并选择用户'
        });
        return result;
    }
});

if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.AdministratorSearch = function() {
}
Srims.component.AdministratorSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'email',
    type: 'string',
    mapping: 'Email'
}, {
    name: 'officePhone',
    type: 'string',
    mapping: 'OfficePhone'
}]);
    Srims.component.AdministratorSearch.Store = Ext.extend(Ext.data.Store, {
        url: Srims.service.users.UserService + '/SearchAdministrator',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            idProperty: 'ID'
        }, Srims.component.AdministratorSearch.Record)
    });
    Srims.component.AdministratorSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
        store: new Srims.component.AdministratorSearch.Store(),
        displayField: 'name',
        tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{name}', '<tpl if="this.isEmpty(email)==false">', ':邮箱 {email}', '</tpl>', '<tpl if="this.isEmpty(officePhone)==false">', ',电话 {officePhone}', '</tpl>', '</div></tpl>', {
            isEmpty: function(str) {
                return String.isEmpty(str);
            }
        }),
        onRender: function(B, A) {
            var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);

            new Ext.ToolTip({
                target: this.getId(),
                html: '您可以通过输入用户<span style="color:Red;">姓名</span>或用户<span style="color:Red;">姓名首字母拼音</span>查找并选择用户'
            });
            return result;
        }
    });

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.QueryWindow_MemberPanel = function(titleName){

    this._textFieldAgeBegin = new Ext.form.NumberField({
        fieldLabel: '专家年龄',
        width: 150,
        allowDecimals: false,
        allowNegative: false
    });
    this._textFieldAgeEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 150,
        allowDecimals: false,
        allowNegative: false
    });
    this._textFieldPostLevelBegin = new Ext.form.NumberField({
        fieldLabel: '职称级别',
        width: 150,
        allowDecimals: false,
        allowNegative: false
    });
    this._textFieldPostLevelEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 150,
        allowDecimals: false,
        allowNegative: false
    });
    this._checkboxGroupAcademyDegree = new Srims.component.CheckBoxGroup({
        fieldLabel: '专家学历',
        columns: 4,
        items: Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore.checkboxGroupItems,
        cls: 'srims-checkboxGroup-expert'
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._checkboxIsPostOrAcademyDegree = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '学历和职称是或的关系'
    })
    
    Srims.component.QueryWindow_MemberPanel.superclass.constructor.call(this, {
        title: titleName,
        frame: true,
        layout: 'form',
        labelWidth: 70,
        items: [new Ext.Panel({
            layout: 'column',
            labelWidth: 70,
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 70,
                width: 250,
                items: [this._textFieldAgeBegin, this._textFieldPostLevelBegin]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 20,
                items: [this._textFieldAgeEnd, this._textFieldPostLevelEnd]
            })]
        }), this._comboBoxCollege, this._checkboxGroupAcademyDegree, this._checkboxIsPostOrAcademyDegree]
    });
    
    this.buildParams = function(params){
        params.birthdayStart = Date.renderAsAge(this._textFieldAgeBegin.getValue());
        params.birthdayEnd = Date.renderAsAge(this._textFieldAgeEnd.getValue());
        params.postLevelStart = this._textFieldPostLevelBegin.getValue();
        params.postLevelEnd = this._textFieldPostLevelEnd.getValue();
        params.academyDegrees = this._checkboxGroupAcademyDegree.getSelecetedValue();
        params.college = this._comboBoxCollege.getText();
        params.isPostOrAcademyDegree = this._checkboxIsPostOrAcademyDegree.checked ? 'true' : '';
    }
    this.clearParams = function(){
        this._textFieldAgeBegin.reset();
        this._textFieldAgeEnd.reset();
        this._textFieldPostLevelBegin.reset();
        this._textFieldPostLevelEnd.reset();
        this._checkboxGroupAcademyDegree.reset();
        this._comboBoxCollege.reset();
        this._checkboxIsPostOrAcademyDegree.reset();
    }
}
Ext.extend(Srims.component.QueryWindow_MemberPanel, Ext.FormPanel);

Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore = new Srims.data.IDValueRecordStore(Srims.service.experts.ExpertService + '/GetExpertAcademyDegree');
Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore.load({
    callback: Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore.buildCheckboxGroupItems
});






if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.NoticeTextSearch = function(){
}
Srims.component.NoticeTextSearch.SearchComboBox = Ext.extend(Ext.form.ComboBox, {
    constructor: function(params){
        params.store = new Srims.common.NoticeTextStore(Srims.service.common.NoticeTextService + "/SearchNoticeText", params.noticeTextType);
        params.displayField = 'value';
        params.typeAhead = false;
        params.triggerClass = 'searchComboBoxTrigger';
        params.minChars = 2;
        params.editable = true;
        params.listWidth = 160;
        params.tpl = new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{value}', '</div></tpl>');
        params.itemSelector = 'div.search-item';
        params.onSelect = function(record){
            this.selectNoticeText = record.get('value') + ',';
            this.setValue(String.isEmpty(this.getValue()) ? this.selectNoticeText : this.getValue().substring(0, this.getValue().lastIndexOf(',') + 1) + this.selectNoticeText);
            this.collapse();
        };
        Srims.component.NoticeTextSearch.SearchComboBox.superclass.constructor.call(this, params);
    }
})

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.MoneyField = function(params){
    params.value = Money.render(params.value, false);
    params.allowNegative = false;
    params.decimalPrecision = 6;
    params.maxValue = 99999;
    
    Srims.component.MoneyField.superclass.constructor.call(this, params);
}
Ext.extend(Srims.component.MoneyField, Ext.form.NumberField, {
    getMoney: function(){
        var value = this.getRawValue();
        if (value == '' || value == undefined) 
            return '';
        
        return parseFloat(value).mul(100).mul(10000);
    }
});


if (!Srims.component)
    Ext.namespace("Srims.component");

Srims.component.ExportWindow = function(id, queryUrl, params, items, title) {
    this._id = id;
    this._title = title;
    this._items = items;
    this._queryUrl = queryUrl;
    this._params = params;

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonAll = new Ext.Button({
        minWidth: 80,
        text: '全 选',
        window: this,
        handler: function() {
            var window = this.window;
            window.selectAll();
        }
    });
    this._buttonExport = new Ext.Button({
        id: 'grid-excel-button',
        minWidth: 80,
        text: '导 出',
        window: this,
        storeQueryParams: this._params,
        storeQueryUrl: this._queryUrl,
        title: this._title,
        handler: function() {
            Ext.MessageBox.confirm('导出确认', '您将要进行的操作可能需要很长的时间，是否继续？', function(buttonId) {
                if (buttonId == 'yes') {
                    this.window.beginExport(this.title, this.storeQueryUrl, this.storeQueryParams, this.window);
                }
                else {
                    this.window.close();
                }
            }, this);

        }
    });

    Srims.component.ExportWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '请选择要导出的列',
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        width: 800,
        autoHeight: true,
        closeAction: 'close',
        layout: 'form',
        buttonAlign: 'center',
        resizable: false,
        items: this._items,
        buttons: [this._buttonAll, this._buttonReset, this._buttonClose, this._buttonExport]
    });

    this.clearParams = function() {
        for (var i = 0; i < this._items.length; i++) {
            this._items[i]._checkboxGroup.reset();
            this._items[i].checkBox.reset();
        }
    }
    this.beginExport = function(title, storeQueryUrl, storeQueryParams, window) {
        var exportStoreXml = undefined;
        Srims.Load._showLoadingAnimation('数据');
        Ext.Ajax.request({
            url: storeQueryUrl,
            scope: this,
            method: 'POST',
            timeout: 1200000,
            params: storeQueryParams,
            failure: function(response) {
                var a = response.responseText;
                alert('导出失败，请重新导出');
            },
            success: function(response) {
                var storeXml = response.responseText;
                window.sendData(storeXml, title);
            }
        })
        window.close();
    }
    this.getSelectedColumns = function() {
        var selectedCoummns = {};
        selectedCoummns.Name = [];
        selectedCoummns.BoxLabel = [];
        selectedCoummns.Renderer = [];
        selectedCoummns.Width = [];
        for (var i = 0; i < this._items.length; ) {
            selectedCoummns.Name = selectedCoummns.Name.concat(this._items[i]._checkboxGroup.getSelecetedValueNameAndBoxLabel().Name);
            selectedCoummns.BoxLabel = selectedCoummns.BoxLabel.concat(this._items[i]._checkboxGroup.getSelecetedValueNameAndBoxLabel().BoxLabel);
            selectedCoummns.Renderer = selectedCoummns.Renderer.concat(this._items[i]._checkboxGroup.getSelecetedValueNameAndBoxLabel().Renderer);
            selectedCoummns.Width = selectedCoummns.Width.concat(this._items[i]._checkboxGroup.getSelecetedValueNameAndBoxLabel().Width);
            i++;
        }
        var selectedColumnsString = '<selectedCoummns>' + '<selectedCount>' + selectedCoummns.Name.length.toString() + '</selectedCount>';
        selectedColumnsString += '<selectedName>' + selectedCoummns.Name.toString() + '</selectedName>';
        selectedColumnsString += '<selectedBoxLabel>' + selectedCoummns.BoxLabel.toString() + '</selectedBoxLabel>';
        selectedColumnsString += '<selectedRenderer>' + selectedCoummns.Renderer.toString() + '</selectedRenderer>';
        selectedColumnsString += '<selectedWidth>' + selectedCoummns.Width.toString() + '</selectedWidth>' + '</selectedCoummns>';

        return selectedColumnsString;
    }
    this.selectAll = function() {
        for (var i = 0; i < this._items.length; i++)
            this._items[i]._checkboxGroup.setAllValueSelectedNameAndBoxLabel();
    }


    this.URLencode = function(sStr) {
        return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
    }
    this.sendData = function(storeXml, title) {
        var columnsString = this.getSelectedColumns();
        var date = new Date();
        //var fileName = title + date.toLocaleString();
        var fileName = title;
        Ext.Ajax.request({
            url: Srims.service.ExportService + '/SendData',
            method: 'POST',
            scope: this,
            params: {
                contentStoreXml: storeXml,
                selectColumns: columnsString,
                excelTitle: title
            },
            success: function(response) {
                Srims.Load._hideLoadingAnimation();
                var guid = response.responseText;
                document.location.href = Srims.service.ExportService + '/GetData?FileName=' + this.URLencode(fileName) + '.xls&guid=' + guid;
            }
        })
    }
}
Ext.extend(Srims.component.ExportWindow, Ext.Window);

if (!Srims.component) 
    Ext.namespace("Srims.component");

Srims.component.ExportWindow_EntityColumnForm = function(title, array){

    this._checkboxGroup = new Srims.component.CheckBoxGroup({
        hideLabel: true,
        columns: array.length > 4 ? 5 : array.length,
        width: 700,
        cls: 'srims-checkboxGroup-export-Column',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(array)
    });
    this.checkBox = new Ext.form.Checkbox({
        hideLabel: true,
        checkboxGroup: this._checkboxGroup,
        width: 20,
        handler: function(){
            if (this.checked) 
                this.checkboxGroup.setAllValueSelectedNameAndBoxLabel();
            else 
                this.checkboxGroup.reset();
        }
    })
    Srims.component.ExportWindow_EntityColumnForm.superclass.constructor.call(this, {
        title: title,
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        titleCollapse: true,
        layout: 'form',
        items: [new Ext.Panel({
            layout: 'column',
            autoWidth: true,
            items: [new Ext.Panel({
                layout: 'form',
                items: this.checkBox
            }), new Ext.Panel({
                layout: 'form',
                autoWidth: true,
                items: this._checkboxGroup
            })]
        })]
    });
}
Ext.extend(Srims.component.ExportWindow_EntityColumnForm, Ext.form.FormPanel, {});

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.FileUploadField = function(params){
    Srims.component.FileUploadField.superclass.constructor.call(this, params);
}
Ext.extend(Srims.component.FileUploadField, Ext.form.FileUploadField, {
    validator: function(){
        var x = this.getValue();
        if (!x) 
            return;
        if (this.fileTypes.length == 0) 
            return true;
        
        var patn = '/'
        var docType = '';
        for (var i = 0; i < this.fileTypes.length; i++) {
            patn += '\.' + this.fileTypes[i] + '$|';
            docType += this.fileTypes[i] + '，';
        }
        patn = patn.substring(0, patn.length - 1);
        patn += '/i';
        patn = eval(patn);
        
        docType = docType.substring(0, docType.length - 1);
        if (!patn.test(x)) {
            this.invalidText = '只能上传' + docType + '文档。';
            return false;
        }
        return true;
    }
});

// 重定义新Combox组件,获取所有管理费收取类别
if (!Srims.component)
	Ext.namespace('Srims.component');

Srims.component.GetAllManagementFeesComboBox = Ext.extend(Ext.form.ComboBox, {
	constructor : function(params) {
		params.store = new Srims.type.GetManagementFeesStore(Srims.service.type.ManagementFeesService
				+ '/GetAllManagementFees');
		params.displayField = 'value';
		params.valueFiled = 'value';
		params.mode = 'remote';
		params.lazyInit = false;
		params.editable = false;
		params.triggerAction = 'all';
		params.forceSelection = true;
		Srims.component.GetAllManagementFeesComboBox.superclass.constructor.call(
				this, params);
	},
	getStore : function() {
		return this.store;
	}
})
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineQueryWindow_InforPanel = function(isMagazineQuery){

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '杂志名称',
        width: 150
    });
    this._textFieldISSN = new Ext.form.TextField({
        fieldLabel: 'ISSN',
        width: 150
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLengthText: 4,
        maxLengthText: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldInfluenceFactorBegin = new Srims.component.ThousandPercentField({
        fieldLabel: '影响因子',
        maxLength: 6,
        width: 150
    });
    this._numberFieldInfluenceFactorEnd = new Srims.component.ThousandPercentField({
        fieldLabel: '至',
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequencyBegin = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequencyEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirerBegin = new Ext.form.NumberField({
        fieldLabel: '分区',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirerEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._textFieldSubjectClass = new Srims.component.NoticeTextSearch.SearchComboBox({
        fieldLabel: '学科分类',
        noticeTextType: "SubjectClass",
        width: 168
    });
    this._checkboxGroupLanguages = new Srims.component.CheckBoxGroup({
        fieldLabel: '语种',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.languageStore)
    });
    this._checkboxGroupSubjectRanks = new Srims.component.CheckBoxGroup({
        fieldLabel: '期刊等级',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.checkboxGroupItems
    });
    
    var columnFirstItems = [this._textFieldName, this._textFieldSubjectClass];
    var columnSecondItems = [this._textFieldISSN];
    var columnItems = [this._checkboxGroupLanguages];
    if (isMagazineQuery) {
        columnFirstItems[columnFirstItems.length] = this._numberFieldInfluenceFactorBegin;
        columnFirstItems[columnFirstItems.length] = this._numberFieldCiteFrequencyBegin;
        columnFirstItems[columnFirstItems.length] = this._numberFieldSubAirerBegin;
        
        columnSecondItems[columnSecondItems.length] = this._numberFieldYear;
        columnSecondItems[columnSecondItems.length] = this._numberFieldInfluenceFactorEnd;
        columnSecondItems[columnSecondItems.length] = this._numberFieldCiteFrequencyEnd;
        columnSecondItems[columnSecondItems.length] = this._numberFieldSubAirerEnd;
        
        columnItems[columnItems.length] = this._checkboxGroupSubjectRanks;
    }
    
    Srims.papers.MagazineQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '杂志信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnSecondItems
            })]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: columnItems
        })]
    });
    
    this.buildParams = function(params){
        params.fullName = this._textFieldName.getValue();
        params.iSSN = this._textFieldISSN.getValue();
        params.language = this._checkboxGroupLanguages.getSelecetedValue();
        params.subjectClass = this._textFieldSubjectClass.getValue();
        
        if (isMagazineQuery) {
            params.subjectRank = this._checkboxGroupSubjectRanks.getSelecetedValue();
            params.citeFrequencyStart = this._numberFieldCiteFrequencyBegin.getValue();
            params.citeFrequencyEnd = this._numberFieldCiteFrequencyEnd.getValue();
            params.influenceFactorStart = this._numberFieldInfluenceFactorBegin.getValue();
            params.influenceFactorEnd = this._numberFieldInfluenceFactorEnd.getValue();
            params.subAirerStart = this._numberFieldSubAirerBegin.getValue();
            params.subAirerEnd = this._numberFieldSubAirerEnd.getValue();
            params.year = this._numberFieldYear.getValue();
        }
    }
    
    this.clearParams = function(){
        this._textFieldName.reset();
        this._textFieldISSN.reset();
        this._checkboxGroupLanguages.reset();
        this._textFieldSubjectClass.reset();
        if (isMagazineQuery) {
            this._checkboxGroupSubjectRanks.reset();
            this._numberFieldCiteFrequencyBegin.reset();
            this._numberFieldCiteFrequencyEnd.reset();
            this._numberFieldInfluenceFactorBegin.reset();
            this._numberFieldInfluenceFactorEnd.reset();
            this._numberFieldYear.reset();
        }
    }
}
Ext.extend(Srims.papers.MagazineQueryWindow_InforPanel, Ext.FormPanel);

Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore = new Srims.data.IDValueRecordStore(Srims.service.papers.MagazineService + '/GetSubjectRank');
Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.load({
    callback: Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.buildCheckboxGroupItems
});


if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardQueryWindow_OtherPanel = function() {

    this._checkboxGroupAwardRank = new Srims.component.CheckBoxGroup({
        fieldLabel: '奖励级别',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore.checkboxGroupItems
    });
    this._checkboxGroupAuthorizedUnit = new Srims.component.CheckBoxGroup({
        fieldLabel: '授奖单位',
        cls: 'srims-checkboxGroup-signUnit',
        columns: 4,
        items: Srims.awards.AwardQueryWindow_OtherPanel.AuthorizedUnitQueryStore.checkboxGroupItems
    });
    this._checkboxGroupAttendType = new Srims.component.CheckBoxGroup({
        fieldLabel: '参与类型',
        cls: 'srims-checkboxGroup',
        items: Srims.awards.AwardQueryWindow_OtherPanel.AttendTypeQueryStore.checkboxGroupItems
    });
    this._checkboxGroupClass = new Srims.component.CheckBoxGroup({
        fieldLabel: '等级',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore.checkboxGroupItems
    });
    this._checkboxGroupClassification = new Srims.component.CheckBoxGroup({
        fieldLabel: '奖种',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore.checkboxGroupItems
    });

    Srims.awards.AwardQueryWindow_OtherPanel.superclass.constructor.call(this, {
        title: '其他信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 681,
        autoHeight: true,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            items: [this._checkboxGroupClassification, this._checkboxGroupClass, this._checkboxGroupAwardRank, this._checkboxGroupAuthorizedUnit, this._checkboxGroupAttendType]
        })]
    });

    this.buildParams = function(params) {

        params.Rank = this._checkboxGroupAwardRank.getSelecetedValue();
        params.Class = this._checkboxGroupClass.getSelecetedValue();
        params.AuthorisedUnit = this._checkboxGroupAuthorizedUnit.getSelecetedValue();
        params.Classification = this._checkboxGroupClassification.getSelecetedValue();
        params.AttendType = this._checkboxGroupAttendType.getSelecetedValue();

    }

    this.clearParams = function(params) {

        this._checkboxGroupAwardRank.reset();
        this._checkboxGroupClass.reset();
        this._checkboxGroupClassification.reset();
        this._checkboxGroupAuthorizedUnit.reset();
        this._checkboxGroupAttendType.reset();
    }
}
Ext.extend(Srims.awards.AwardQueryWindow_OtherPanel, Ext.FormPanel);


Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetRankItems');
Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore.buildCheckboxGroupItems
});
Srims.awards.AwardQueryWindow_OtherPanel.AttendTypeQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetAttendTypeItems');
Srims.awards.AwardQueryWindow_OtherPanel.AttendTypeQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.AttendTypeQueryStore.buildCheckboxGroupItems
});
Srims.awards.AwardQueryWindow_OtherPanel.AuthorizedUnitQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetAuthorUnitItems');
Srims.awards.AwardQueryWindow_OtherPanel.AuthorizedUnitQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.AuthorizedUnitQueryStore.buildCheckboxGroupItems
});
Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetClassItems');
Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore.buildCheckboxGroupItems
});
Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetClassificationItems');
Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore.buildCheckboxGroupItems
});








if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentQueryWindow_OtherPanel = function() {

    this._patentTypes = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利类别',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentTypeStore)
    });
    this._patentLawState = new Srims.component.CheckBoxGroup({
        fieldLabel: '法律状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentLawStateStore)
    });
    this._patentLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentLevelStore)
    });

    this._PatentCategory = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利分类',
        cls: 'srims-checkboxGroup-signUnit',
        columns: 3,
        items: Srims.patents.PatentQueryWindow_OtherPanel.PatentCategoryStore.checkboxGroupItems
    });
    this._Country = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利国别',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.patents.PatentQueryWindow_OtherPanel.CountryStore.checkboxGroupItems
    });

    Srims.patents.PatentQueryWindow_OtherPanel.superclass.constructor.call(this, {
        title: '其他信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 681,
        autoHeight: true,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            items: [this._PatentCategory, this._patentLevel, this._Country, this._patentTypes, this._patentLawState]
        })]
    });

    this.buildParams = function(params) {
        params.Types = this._patentTypes.getSelecetedValue();
        params.LawStates = this._patentLawState.getSelecetedValue();
        params.Levels = this._patentLevel.getSelecetedValue();
        params.Countrys = this._Country.getSelecetedValue();
        params.Categorys = this._PatentCategory.getSelecetedValue();
    }

    this.clearParams = function(params) {
        this._patentTypes.reset();
        this._patentLevel.reset();
        this._patentLawState.reset();
        this._Country.reset();
        this._PatentCategory.reset();
    }
}
Ext.extend(Srims.patents.PatentQueryWindow_OtherPanel, Ext.FormPanel);

Srims.patents.PatentQueryWindow_OtherPanel.PatentCategoryStore = new Srims.data.IDValueRecordStore(Srims.service.patents.PatentService + '/GetCategoryItems');
Srims.patents.PatentQueryWindow_OtherPanel.PatentCategoryStore.load({
    callback: Srims.patents.PatentQueryWindow_OtherPanel.PatentCategoryStore.buildCheckboxGroupItems
});
Srims.patents.PatentQueryWindow_OtherPanel.CountryStore = new Srims.data.IDValueRecordStore(Srims.service.patents.PatentService + '/GetCountryItems');
Srims.patents.PatentQueryWindow_OtherPanel.CountryStore.load({
    callback: Srims.patents.PatentQueryWindow_OtherPanel.CountryStore.buildCheckboxGroupItems
});





if (!Srims.experts) 
    Ext.namespace('Srims.experts');
Srims.experts.ExpertQueryPanel_Project_Type = function(){

    var projectRankItems = Srims.experts.ExpertQueryPanel_Project_Type.RankStore.checkboxGroupItems;
    this._checkBoxGroupProjectRank = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目类型',
        cls: 'srims-checkboxGroup',
        columns: projectRankItems.length > 6 ? 5 : projectRankItems.length,
        items: projectRankItems
    })
    
    Srims.experts.ExpertQueryPanel_Project_Type.superclass.constructor.call(this, ({
        collapsible: true,
        title: '类型信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._checkBoxGroupProjectRank]
    }))
    
    this.buildParams = function(params){
        params.projectRank = this._checkBoxGroupProjectRank.getSelecetedValue();
    }
    this.clearParams = function(){
        this._checkBoxGroupProjectRank.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Project_Type, Ext.Panel, {});

Srims.experts.ExpertQueryPanel_Project_Type.RankStore = new Srims.data.IDValueRecordStore(Srims.service.type.ProjectRankService + '/GetRankString');
Srims.experts.ExpertQueryPanel_Project_Type.RankStore.load({
    callback: Srims.experts.ExpertQueryPanel_Project_Type.RankStore.buildCheckboxGroupItems
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectQueryWindow_BasicPanel = function(isHorizontal){
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '编号',
        width: 150
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        width: 150
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._dateFieldStartDateBegin = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 150
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._dateFieldEndDateBegin = new Ext.form.DateField({
        fieldLabel: '结束时间',
        width: 150
    });
    this._dateFieldEndDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._checkboxGroupLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectLevelStore, Srims.projects.ProjectLevel.Perside)
    });
    this._checkboxGroupState = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectStateQueryStore)
    });
    this._textFieldTaskFroms = new Ext.form.TextField({
        fieldLabel: '任务来源',
        width: 150
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密'
    });
    this._comboBoxProjectSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        store: Srims.type.projectSubjectNatureStore,
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._panelCorporationPlace = new Srims.component.ProvinceCityPanel('单位地址', undefined, undefined, true);
    
    
    var columnOneItems = [this._textFieldNumber, this._textFieldPrincipal, this._dateFieldStartDateBegin, this._dateFieldEndDateBegin, this._checkboxIsSecret];
    var columnTwoItems = [this._textFieldName, this._comboBoxCollege, this._dateFieldStartDateEnd, this._dateFieldEndDateEnd];
    var columnItems = [];
    if (isHorizontal || isHorizontal == undefined) {
        columnTwoItems[columnTwoItems.length] = this._textFieldTaskFroms;
        columnOneItems[columnOneItems.length] = this._comboBoxProjectSubjectNature;
        columnItems[columnItems.length] = this._panelCorporationPlace;
    }
    else 
        columnTwoItems[columnTwoItems.length] = this._comboBoxProjectSubjectNature;
    
    columnItems[columnItems.length] = this._checkboxGroupLevel;
    columnItems[columnItems.length] = this._checkboxGroupState;
    
    Srims.projects.ProjectQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoWidth: true,
        autoHeight: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnTwoItems
            })]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: columnItems
        })]
    });
    
    this.buildParams = function(params){
        params.number = this._textFieldNumber.getValue();
        params.name = this._textFieldName.getValue();
        params.principal = this._textFieldPrincipal.getValue();
        params.principalCollege = this._comboBoxCollege.getText();
        
        var subjectNatureName = this._comboBoxProjectSubjectNature.getRawValue();
        if (!String.isEmpty(subjectNatureName)) 
            params.subjectNature = this._comboBoxProjectSubjectNature.getValue();
        else 
            params.subjectNature = ''
        
        params.startDateStart = Date.format(this._dateFieldStartDateBegin.getValue());
        params.startDateEnd = Date.format(this._dateFieldStartDateEnd.getValue());
        params.endDateStart = Date.format(this._dateFieldEndDateBegin.getValue());
        params.endDateEnd = Date.format(this._dateFieldEndDateEnd.getValue());
        params.level = this._checkboxGroupLevel.getSelecetedValue();
        params.state = this._checkboxGroupState.getSelecetedValue();
        params.isSecret = this._checkboxIsSecret.checked ? this._checkboxIsSecret.getValue() : '';
        
        if (isHorizontal || isHorizontal == undefined) {
            params.taskFroms = this._textFieldTaskFroms.getValue();
            params.corporationPlace = '';
            if (this._panelCorporationPlace._comboBox_Province.getRawValue() != '') 
                params.corporationPlace = this._panelCorporationPlace._comboBox_Province.getRawValue() + ' ' + this._panelCorporationPlace._comboBox_City.getRawValue();
        }
    }
    this.clearParams = function(){
        this._textFieldNumber.reset();
        this._textFieldName.reset();
        this._textFieldPrincipal.reset();
        this._comboBoxCollege.reset();
        this._dateFieldStartDateBegin.reset();
        this._dateFieldStartDateEnd.reset();
        this._dateFieldEndDateBegin.reset();
        this._dateFieldEndDateEnd.reset();
        this._textFieldTaskFroms.reset();
        this._checkboxGroupLevel.reset();
        this._checkboxGroupState.reset();
        this._comboBoxProjectSubjectNature.reset();
        
        if (isHorizontal) {
            this._checkboxIsSecret.reset();
            this._panelCorporationPlace._comboBox_Province.reset();
            this._panelCorporationPlace._comboBox_City.reset();
        }
    }
}
Ext.extend(Srims.projects.ProjectQueryWindow_BasicPanel, Ext.FormPanel);

if (!Srims.component)
    Ext.namespace('Srims.component');


Srims.component.RadioGroup = Ext.extend(Ext.form.RadioGroup, {
    getName: function() {
        return this.items.first().getName();
    },
    getValue: function() {
        var v;
        this.items.each(function(item) {
            v = item.getRawValue();
            return !item.getValue();
        });
        return v;
    },
    setValue: function(v) {
        this.items.each(function(item) {
            item.setValue(item.getRawValue() == v);
        });
    },
    getRadio: function(i) {
        return this.items.get(i);
    }



});
Srims.component.RadioGroup.StoreFunction = function(nameString, expert, isShow) {
    var items = [{
        readOnly: isShow == true ? true : false,
        boxLabel: '是',
        name: nameString,
        inputValue: true,
        checked: isShow == true ? true : (expert.get(nameString) == 'True' ? true : false)
    }, {
        readOnly: isShow == true ? true : false,
        boxLabel: '否',
        name: nameString,
        inputValue: false,
        checked: expert.get(nameString) == 'False' ? true : false
    }, {
        readOnly: isShow == true ? true : false,
        boxLabel: '未知',
        name: nameString,
        inputValue: null,
        checked: expert.get(nameString) != 'True' && expert.get(nameString) != 'False' ? true : false
}];
        return items;
    }

    Srims.component.RadioGroup.SexStoreFunction = function(nameString, expert, isShow) {
        var items = [{
            readOnly: isShow == true ? true : false,
            boxLabel: '男',
            name: nameString,
            inputValue: 'Man',
            checked: expert.get(nameString) == 'Man' ? true : false
        }, {
            readOnly: isShow == true ? true : false,
            boxLabel: '女',
            name: nameString,
            inputValue: 'Woman',
            checked: expert.get(nameString) == 'Woman' ? true : false
}];
            return items;
        }
        Srims.component.RadioGroup.ProjectRankStoreFunction = function() {
            var items = [{
                boxLabel: '横向',
                name: 'ProjectRank',
                inputValue: 'true'
            }, {
                boxLabel: '纵向',
                name: 'ProjectRank',
                inputValue: 'false'
}];
                return items;
            }

if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.AwardNameSearch = function() {
}
Srims.component.AwardNameSearch.SearchComboBox = Ext.extend(Ext.form.ComboBox, {
    constructor: function(params) {
        params.store = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + "/SearchAwardName");
        params.displayField = 'value';
        params.typeAhead = false;
        params.triggerClass = 'searchComboBoxTrigger';
        params.minChars = 2;
        params.editable = true;
        params.listWidth = 160;
        params.tpl = new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{value}', '</div></tpl>');
        params.itemSelector = 'div.search-item';
        params.onSelect = function(record) {
            this.selectAwardName = record.get('value');
            Srims.component.AwardNameSearch.SearchComboBox.superclass.onSelect.call(this, record);
        };
        params.getSelectAwardName = function() {
            return Srims.component.AwardNameSearch.SearchComboBox.superclass.getValue.call(this);
        };
        params.getValue = function() {
            return this.getSelectAwardName();
        },
        Srims.component.AwardNameSearch.SearchComboBox.superclass.constructor.call(this, params);
    }
})
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewDefineWindow = function(id, view, store){

    this._id = id;
    this._view = view;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    
    this._textFieldViewName = new Ext.form.TextField({
        fieldLabel: '视图说明',
        width: 300,
        maxValue: 200,
        minValue: 1,
        value: view.get('name'),
        allowBlank: false
    });
    this._checkboxIsPublic = new Ext.form.Checkbox({
        fieldLabel: '是否公开',
        disabled: !Srims.common.ViewType.isCanPublic(view.get('type'))
    });
    
    Srims.common.ViewDefineWindow.superclass.constructor.call(this, {
        id: this._id,
        title: view.isNew() ? ('新建' + Srims.common.viewTypeRender(view.get('type')) + '视图') : '编辑视图：' + view.get('name'),
        width: 450,
        labelWidth: 70,
        height: 150,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._textFieldViewName, this._checkboxIsPublic],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldViewName.isValid(preventMark) && result;
        return result;
    }
    this._assignValues = function(){
        this._view.set('isPublic', this._checkboxIsPublic.getValue());
        this._view.set('name', this._textFieldViewName.getValue());
    }
    this._save = function(){
        this._assignValues();
        Ext.Ajax.request({
            url: Srims.service.common.ViewService + '/Save',
            params: {
                definition: this._view.get('definition'),
                isPublic: this._view.get('isPublic'),
                name: this._view.get('name'),
                viewType: this._view.get('type'),
                viewId: this._view.isNew() ? '' : this._view.get('id')
            },
            scope: this,
            success: function(){
                Ext.Msg.show({
                    title: '保存视图成功',
                    msg: '成功保存视图',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                if (store) 
                    store.load();
                
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.common.ViewDefineWindow, Ext.Window, {})

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewShowWindow = function(id, store, viewType){

    this._id = id;
    this._store = store;
    this._viewGridPanel = new Srims.common.ViewGridPanel(this._store, viewType);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonDefineSelf = new Ext.Button({
        minWidth: 80,
        text: '自定义',
        window: this,
        handler: function(){
            this.setText('正在转入...');
            this.setDisabled(true);
            
            eval(Srims.common.ViewType.getDefineSelfFunction(viewType));
            this.window.close();
        }
    });
    
    Srims.common.ViewShowWindow.superclass.constructor.call(this, {
        id: this._id,
        title: Srims.common.viewTypeRender(viewType) + '视图',
        iconCls: Srims.common.ViewType.getIconCls(viewType),
        width: 700,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._viewGridPanel],
        buttons: [this._buttonDefineSelf, this._buttonClose]
    });
    
    this._store.window = this;
    this._store.on('load', function(){
        if (this.getCount() == 0) {
            eval(Srims.common.ViewType.getDefineSelfFunction(viewType));
            this.window.close();
        }
    })
    
    this._store.load();
}
Ext.extend(Srims.common.ViewShowWindow, Ext.Window, {});


if (!Srims.common) 
    Ext.namespace('Srims.common');

Ext.namespace('Srims.common.ViewType');

Srims.common.ViewType.ProjectCountStatic = 'ProjectCountStatic';
Srims.common.ViewType.ProjectFundTotalStatic = 'ProjectFundTotalStatic';
Srims.common.ViewType.FundDescendStatic = 'FundDescendStatic';
Srims.common.ViewType.FundAllocationStatic = 'FundAllocationStatic';
Srims.common.ViewType.PaperStatic = 'PaperStatic';
Srims.common.ViewType.PatentStatic = 'PatentStatic';
Srims.common.ViewType.AwardStatic = 'AwardStatic';
Srims.common.ViewType.VerticalProjectQuery = 'VerticalProjectQuery';
Srims.common.ViewType.HorizontalProjectQuery = 'HorizontalProjectQuery';
Srims.common.ViewType.PaperQuery = 'PaperQuery';
Srims.common.ViewType.LiberalArtsPaperQuery = 'LiberalArtsPaperQuery';
Srims.common.ViewType.PatentQuery = 'PatentQuery';
Srims.common.ViewType.AwardQuery = 'AwardQuery';
Srims.common.ViewType.ExpertQuery = 'ExpertQuery';
Srims.common.ViewType.OutsourcingAllocationInfoQuery = 'OutsourcingAllocationInfoQuery';

Srims.common.staticViewType = ['ProjectCountStatic', 'ProjectFundTotalStatic', 'FundDescendStatic', 'FundAllocationStatic', 'PaperStatic', 'LiberalArtsPaperStatic','PatentStatic', 'AwardStatic'];
Srims.common.queryType = ['VerticalProjectQuery', 'HorizontalProjectQuery', 'PaperQuery', 'LiberalArtsPaperQuery', 'PatentQuery', 'AwardQuery', 'ExpertQuery', 'OutsourcingAllocationInfoQuery'];
//取得服务器端url
Srims.common.ViewType.getStaticSubUrl = function(value){
    switch (value) {
        case 'ProjectCountStatic':
            return Srims.service.statistic.StatisticsService + '/ProjectCount';
        case 'ProjectFundTotalStatic':
            return Srims.service.statistic.StatisticsService + '/FundTotal';
        case 'FundDescendStatic':
            return Srims.service.statistic.StatisticsService + '/FundDescend';
        case 'FundAllocationStatic':
            return Srims.service.statistic.StatisticsService + '/Voucher';
        case 'PaperStatic':
            return Srims.service.statistic.StatisticsService + '/Paper';
        case 'PatentStatic':
            return Srims.service.statistic.StatisticsService + '/Patent';
        case 'AwardStatic':
            return Srims.service.statistic.StatisticsService + '/Award';
        case 'VerticalProjectQuery':
            return Srims.service.projects.ProjectService + '/Query';
        case 'HorizontalProjectQuery':
            return Srims.service.projects.ProjectService + '/Query';
        case 'PaperQuery':
            return Srims.service.papers.PaperService + '/Query';
        case 'LiberalArtsPaperQuery':
            return Srims.service.papers.LiberalArtsPaperService + '/Query';
        case 'PatentQuery':
            return Srims.service.patents.PatentService + '/Query';
        case 'AwardQuery':
            return Srims.service.awards.AwardService + '/Query';
        case 'ExpertQuery':
            return Srims.service.experts.ExpertService + '/Query';
        case 'OutsourcingAllocationInfoQuery':
            return Srims.service.common.OutsourcingService + '/GetAllocatedInfo';
            
        default:
            return 'unknown';
    }
}
//取得视图图标
Srims.common.ViewType.getIconCls = function(value, metadata){
    switch (value) {
        case 'ProjectCountStatic':
            return 'icon-statistic-project-count';
        case 'ProjectFundTotalStatic':
            return 'icon-statistic-fund-total';
        case 'FundDescendStatic':
            return 'icon-statistic-fund-descend';
        case 'FundAllocationStatic':
            return 'icon-statistic-voucher';
        case 'PaperStatic':
            return 'icon-statistic-paper';
        case 'PatentStatic':
            return 'icon-statistic-patent';
        case 'AwardStatic':
            return 'icon-statistic-award';
        case 'VerticalProjectQuery':
            return 'icon-query';
        case 'HorizontalProjectQuery':
            return 'icon-query';
        case 'PaperQuery':
            return 'icon-query';
        case 'LiberalArtsPaperQuery':
            return 'icon-query';
        case 'PatentQuery':
            return 'icon-query';
        case 'AwardQuery':
            return 'icon-query';
        case 'ExpertQuery':
            return 'icon-query';
        case 'OutsourcingAllocationInfoQuery':
            return 'icon-query';
        default:
            return '未知';
    }
}
//取得视图结果显示图标
Srims.common.ViewType.getResultShowIconCls = function(value, metadata){
    switch (value) {
        case 'ProjectCountStatic':
            return 'icon-statistic-project-count';
        case 'ProjectFundTotalStatic':
            return 'icon-statistic-fund-total';
        case 'FundDescendStatic':
            return 'icon-statistic-fund-descend';
        case 'FundAllocationStatic':
            return 'icon-statistic-voucher';
        case 'PaperStatic':
            return 'icon-statistic-paper';
        case 'LiberalArtsPaperStatic':
            return 'icon-statistic-paper';
        case 'PatentStatic':
            return 'icon-statistic-patent';
        case 'AwardStatic':
            return 'icon-statistic-award';
        case 'VerticalProjectQuery':
            return 'icon-project-vertical-list';
        case 'HorizontalProjectQuery':
            return 'icon-project-horizontal-list';
        case 'PaperQuery':
            return 'icon-paper-list';
        case 'PatentQuery':
            return 'icon-patent-list';
        case 'AwardQuery':
            return 'icon-award-list';
        case 'ExpertQuery':
            return 'icon-expert-list';
        default:
            return '未知';
    }
}
//取得返回自定义函数
Srims.common.ViewType.getDefineSelfFunction = function(value, metadata){
    switch (value) {
        case 'ProjectCountStatic':
            return 'Srims.statistic.statisticProjectCount();';
        case 'ProjectFundTotalStatic':
            return 'Srims.statistic.statisticFundTotal();';
        case 'FundDescendStatic':
            return 'Srims.statistic.statisticFundDescend();';
        case 'FundAllocationStatic':
            return 'Srims.statistic.statisticVoucher();';
        case 'PaperStatic':
            return 'Srims.statistic.statisticPaper();';
        case 'LiberalArtsPaperStatic':
            return 'Srims.statistic.statisticLiberalArtsPaper();';
        case 'PatentStatic':
            return 'Srims.statistic.statisticPatent();';
        case 'AwardStatic':
            return 'Srims.statistic.statisticAward();';
        case 'VerticalProjectQuery':
            return 'Srims.projects.listVerticalProject(true);';
        case 'HorizontalProjectQuery':
            return 'Srims.projects.listHorizontalProject(true);';
        case 'PaperQuery':
            return 'Srims.papers.listPaper(true);';
        case 'PatentQuery':
            return 'Srims.patents.listPatent(true,false);';
        case 'AwardQuery':
            return 'Srims.awards.listAward(true,false);';
        case 'ExpertQuery':
            return 'Srims.experts.ExpertAction.listExpert(true);';
        default:
            return '未知';
    }
}
//是否能够公开
Srims.common.ViewType.isCanPublic = function(value){
    var user = Srims.currentLoginLog.user;
    switch (value) {
        case 'ProjectCountStatic':
            return user.hasPermission_ProjectCountStatisticViewManage;
        case 'ProjectFundTotalStatic':
            return user.hasPermission_FundTotalStatisticViewManage;
        case 'FundDescendStatic':
            return user.hasPermission_FundDescendStatisticViewManage;
        case 'FundAllocationStatic':
            return user.hasPermission_VoucherStatisticViewManage;
        case 'PaperStatic':
            return user.hasPermission_PaperStatisticViewManage;
        case 'LiberalArtsPaperStatic':
            return user.hasPermission_LiberalArtsPaperStatisticViewManage;
        case 'PatentStatic':
            return user.hasPermission_PatentStatisticViewManage;
        case 'AwardStatic':
            return user.hasPermission_AwardStatisticViewManage;
        default:
            return false;
    }
}
//取得统计渲染函数
Srims.common.ViewType.getStaticRender = function(value){
    switch (value) {
        case 'ProjectFundTotalStatic':
            return 'Money.render';
        case 'FundDescendStatic':
            return 'Money.render';
        case 'FundAllocationStatic':
            return 'Money.render';
        default:
            return '';
    }
}
//取得查询，store
Srims.common.viewTypeStore = function(value, queryParams){
    switch (value) {
        case 'VerticalProjectQuery':
            return new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/Query', queryParams);
        case 'HorizontalProjectQuery':
            return new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/Query', queryParams);
        case 'PaperQuery':
            return new Srims.papers.PaperStore(Srims.service.papers.PaperService + '/Query', queryParams);
        case 'LiberalArtsPaperQuery':
            return new Srims.papers.PaperStore(Srims.service.papers.LiberalArtsPaperService + '/Query', queryParams);
        case 'PatentQuery':
            return new Srims.patents.PatentStore(Srims.service.patents.PatentService + '/Query', queryParams);
        case 'AwardQuery':
            return new Srims.awards.AwardStore(Srims.service.awards.AwardService + '/Query', queryParams);
        case 'ExpertQuery':
            return new Srims.experts.ExpertStore(Srims.service.experts.ExpertService + '/Query', queryParams);
        default:
            return '未知';
    }
}
//渲染
Srims.common.viewTypeRender = function(value, metadata){
    switch (value) {
        case 'ProjectCountStatic':
            return '项目数目统计';
        case 'ProjectFundTotalStatic':
            return '项目总经费统计';
        case 'FundDescendStatic':
            return '项目到帐经费统计';
        case 'FundAllocationStatic':
            return '经费分配统计';
        case 'PaperStatic':
            return '论文统计';
        case 'PatentStatic':
            return '专利统计';
        case 'AwardStatic':
            return '奖励统计';
        case 'VerticalProjectQuery':
            return '纵向项目查询';
        case 'HorizontalProjectQuery':
            return '横向项目查询';
        case 'PaperQuery':
            return '论文查询';
        case 'LiberalArtsPaperQuery':
            return '文科论文查询';
        case 'PatentQuery':
            return '专利查询';
        case 'AwardQuery':
            return '奖励查询';
        case 'ExpertQuery':
            return '专家查询';
        default:
            return '未知';
    }
}



if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewGridPanel = function(store, viewType){

    this._store = store;
    this._columnModel = new Srims.common.ViewGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.common.ViewGridPanel_ToolBar(this._selections, this._store, viewType)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 300;
    
    //constructor
    Srims.common.ViewGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var view = grid.getStore().getAt(rowIndex);
        
        Srims.common.doViewAction(view);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.common.ViewGridPanel, Srims.component.GridPanel, {});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewGridPanel_ColumnModel = function(){
    Srims.common.ViewGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "视图类型",
        dataIndex: "type",
        width: 100,
        sortable: false,
        renderer: Srims.common.viewTypeRender,
        hidden: true
    }, {
        header: "视图名称",
        dataIndex: 'name',
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "是否公开",
        dataIndex: 'isPublic',
        width: 100,
        sortable: false,
        hidden: true
    }, {
        header: "建立用户",
        dataIndex: 'userName',
        width: 100,
        sortable: false,
        hidden: true
    }]);
}
Ext.extend(Srims.common.ViewGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewGridPanel_ToolBar = function(selection, store, viewType){
    //fields
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonOperate = new Ext.Toolbar.Button({
        iconCls: Srims.common.ViewType.getIconCls(viewType),
        text: '执行',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.common.doViewAction(this.selection.getSelected());
        },
        hidden: true,
        tooltip: Srims.common.viewTypeRender(viewType)
    });
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.common.exportViewResult(this.selection.getSelected());
        },
        tooltip: '<b>导出统计结果</b><br/>导出该统计视图统计的结果',
        hidden: true
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
            Ext.MessageBox.confirm('删除视图', '你确定要删除这个视图吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.common.deleteView(this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '删除视图'
    });
    this._buttonRename = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '重命名',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.common.renameView(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '删除视图'
    });
    
    Srims.common.ViewGridPanel_ToolBar.superclass.constructor.call(this, {
        height: 25,
        items: [this._buttonOperate, this._buttonRename, this._buttonExport, this._buttonDelete]
    });
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonOperate = this._buttonOperate;
    this._selection.buttonExport = this._buttonExport;
    this._selection.buttonRename = this._buttonRename;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonOperate = selection.buttonOperate;
        var buttonExport = selection.buttonExport;
        var buttonRename = selection.buttonRename;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonOperate.hide();
            buttonExport.hide();
            buttonRename.hide();
            
            return;
        }
        
        var view = selection.getSelected();
        
        buttonDelete.setVisible(view.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!view.get('canDelete'));
        
        buttonRename.setVisible(view.get('hasPermission_Rename'));
        buttonRename.setDisabled(!view.get('canRename'));
        
        buttonOperate.setVisible(true);
        buttonExport.setVisible(Array.itemIsExistInArray(Srims.common.staticViewType, view.get('type')));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.common.ViewGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.ViewStore.superclass.constructor.call(this, new Srims.common.ViewXmlReader(), load_url, params);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.ViewXmlReader.superclass.constructor.call(this, Srims.common.View);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.newView = function(viewType, viewDefination){
    var windowId = 'NewViewDefineWindow' + viewType;
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        var view = new Srims.common.View({
            type: viewType,
            definition: viewDefination
        });
        window = new Srims.common.ViewDefineWindow(windowId, view, undefined);
    }
    
    window.show();
}
Srims.common.renameView = function(view, store){
    var windowId = 'EditViewDefineWindow' + view.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.common.ViewDefineWindow(windowId, view, store);
    }
    
    window.show();
}
Srims.common.showViewWindow = function(viewType){
    var windowId = 'viewWindow' + viewType;
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        var store = new Srims.common.ViewStore(Srims.service.common.ViewService + '/GetByUser', {
            viewType: viewType
        });
        window = new Srims.common.ViewShowWindow(windowId, store, viewType);
    }
    window.show();
}
Srims.common.deleteView = function(view, store){
    Ext.Ajax.request({
        url: Srims.service.common.ViewService + '/Delete',
        params: {
            viewId: view.get('id')
        },
        scope: this,
        success: function(){
            store.load();
        }
    });
}
Srims.common.exportViewResult = function(view){
    Srims.common.doStaticViewAction(view, true);
};
Srims.common.doViewAction = function(view){
    if (Array.itemIsExistInArray(Srims.common.staticViewType, view.get('type'))) 
        Srims.common.doStaticViewAction(view, false);
    if (Array.itemIsExistInArray(Srims.common.queryType, view.get('type'))) 
        Srims.common.doQueryViewAction(view);
}

Srims.common.doStaticViewAction = function(view, isExport){
    Srims.common._loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在进行统计：' + view.get('name') + '...'
    });
    Srims.common._loadingAnimation.show();
    Ext.Ajax.request({
        url: Srims.common.ViewType.getStaticSubUrl(view.get('type')),
        params: Ext.util.JSON.decode(view.get('definition')),
        scope: this,
        success: function(response){
            Srims.common.staticResponseFunction(response, view, isExport);
            Srims.common._loadingAnimation.hide();
        }
    });
}
Srims.common.staticResponseFunction = function(response, view, isExport){
    var title = view.get('name');
    var iconCls = Srims.common.ViewType.getResultShowIconCls(view.get('type'));
    var renderer = Srims.common.ViewType.getStaticRender(view.get('type'));
    
    if (isExport) 
        Srims.statistic.exportToExcel(title, response, renderer);
    else 
        Srims.statistic.showResult(title, iconCls, response, renderer);
}

Srims.common.doQueryViewAction = function(view){
    var store = Srims.common.viewTypeStore(view.get('type'), Ext.util.JSON.decode(view.get('definition')));
    var title = view.get('name');
    var iconCls = Srims.common.ViewType.getResultShowIconCls(view.get('type'));
    var panelId = 'queryView_' + view.get('type') + '_' + view.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    var viewType = view.get('type');
    
    if (panel) 
        return;
    
    if (viewType == Srims.common.ViewType.VerticalProjectQuery) 
        panel = new Srims.projects.ProjectGridPanel(panelId, store, title, iconCls, false, undefined, undefined, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.HorizontalProjectQuery) 
        panel = new Srims.projects.ProjectGridPanel(panelId, store, title, iconCls, true, undefined, undefined, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.PaperQuery)
        panel = new Srims.papers.PaperGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.LiberalArtsPaperQuery)
        panel = new Srims.papers.LiberalArtsPaperGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));   
    if (viewType == Srims.common.ViewType.PatentQuery) 
        panel = new Srims.patents.PatentGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.AwardQuery) 
        panel = new Srims.awards.AwardGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));
    if (viewType == Srims.common.ViewType.ExpertQuery) 
        panel = new Srims.experts.ExpertGridPanel(panelId, store, title, iconCls, Ext.util.JSON.decode(view.get('definition')));
    
    Srims.WorkSpace.addPanel(panel);
    store.load();
}

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.View = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'definition',
    type: 'string',
    mapping: 'Definition'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'isPublic',
    type: 'boolean',
    mapping: 'IsPublic',
    convert: Boolean.toBoolean
}, {
    name: 'userID',
    type: 'int',
    mapping: 'UserID'
}, {
    name: 'userName',
    type: 'int',
    mapping: 'UserName'
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Rename',
    type: 'boolean',
    mapping: 'HasPermission_Rename',
    convert: Boolean.toBoolean
}, {
    name: 'canRename',
    type: 'boolean',
    mapping: 'CanRename',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.common.View);
