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
