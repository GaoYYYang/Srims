
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.MyAchieveViewWindow_BasicPanel = function() {
    Srims.experts.MyAchieveViewWindow_BasicPanel.superclass.constructor.call(this, {
        collapsible: false,
        title: '查看我的成果',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        id: "DivMyAchieveViewNavigatePanel",
        html: Srims.experts.MyAchieveViewWindow_BasicPanel._getHtml()
    });
}
Ext.extend(Srims.experts.MyAchieveViewWindow_BasicPanel, Ext.Panel);

Srims.experts.MyAchieveViewWindow_BasicPanel._getHtml = function() {
    var items = [];
    items[items.length] = Srims.experts.MyAchieveViewWindow_BasicPanel._getItem('我负责的项目', '查看您的项目、成员管理、付款计划、合同管理、文档管理、指定取消委托负责人等操作。', 'project-principal', 'Srims.experts.MyAchieveViewWindow_BasicPanel.Action.myPrincipalProject');
    items[items.length] = Srims.experts.MyAchieveViewWindow_BasicPanel._getItem('委托给我的项目', '查看您的被委托的项目、成员管理、付款计划、合同管理、文档管理人等操作。', 'project-delegate', 'Srims.experts.MyAchieveViewWindow_BasicPanel.Action.myProjectDelegate');
    items[items.length] = Srims.experts.MyAchieveViewWindow_BasicPanel._getItem('我参与的项目', '查看您所参与的项目。', 'project-member', 'Srims.experts.MyAchieveViewWindow_BasicPanel.Action.myProjectJoin');
    items[items.length] = Srims.experts.MyAchieveViewWindow_BasicPanel._getItem('我的经费凭单', '查看您的经费凭单。', 'voucher', 'Srims.experts.MyAchieveViewWindow_BasicPanel.Action.myVoucher');
    items[items.length] = Srims.experts.MyAchieveViewWindow_BasicPanel._getItem('我的论文', '对您的论文进行查看、导出等操作。', 'paper', 'Srims.experts.MyAchieveViewWindow_BasicPanel.Action.expertMyPaper');
    items[items.length] = Srims.experts.MyAchieveViewWindow_BasicPanel._getItem('我的专利', '对您的专利进行查看、导出等操作。', 'patent', 'Srims.experts.MyAchieveViewWindow_BasicPanel.Action.expertMyPatent');
    items[items.length] = Srims.experts.MyAchieveViewWindow_BasicPanel._getItem('我的奖励', '对您的奖励进行查看、文档管理、导出等操作。', 'award', 'Srims.experts.MyAchieveViewWindow_BasicPanel.Action.expertMyAward');

    var html = '';
    for (var i = 0; i < items.length; i++) {
        if (i % 2 == 0)
            html += '<div style="width:620px;height:60px;">' + Srims.experts.MyAchieveViewWindow_BasicPanel._NavigateItemHtmlTemplate.apply(items[i]);
        else
            html += Srims.experts.MyAchieveViewWindow_BasicPanel._NavigateItemHtmlTemplate.apply(items[i]) + '</div>';
    }
    if (items.length % 2 == 1) {
        html += '<div>';
    }

    return html;
}
Srims.experts.MyAchieveViewWindow_BasicPanel._getItem = function(title, description, icon, action) {
    return {
        title: title,
        description: description,
        icon: icon,
        action: action
    };
}

Srims.experts.MyAchieveViewWindow_BasicPanel._NavigateItemHtmlTemplate = new Ext.XTemplate('<a href="javascript:{action}(this);">', '<div style="width:305px;float:left">', '<div style="width:55px;float:left;">', '<img src="/images/expert-my-achieve/{icon}.png" style="width:48px;height:48px;" />', '</div>', '<div style="width:245px;float:left">', '<strong>{title}</strong><br />', '{description}', '</div>', '</div>', '</a>');

Srims.experts.MyAchieveViewWindow_BasicPanel.Action = function() {
};
Srims.experts.MyAchieveViewWindow_BasicPanel.Action.myPrincipalProject = function(element) {
    Srims.Action.actions['project-my-project-principal']();
    Ext.getCmp('MyAchieveViewWindow').close();
};

Srims.experts.MyAchieveViewWindow_BasicPanel.Action.myProjectDelegate = function(element) {
    Srims.Action.actions['project-my-project-delegate']();
    Ext.getCmp('MyAchieveViewWindow').close();
};
Srims.experts.MyAchieveViewWindow_BasicPanel.Action.fundDescend = function(element) {
    Srims.Action.actions['expert-guid-fund-descend']();
    Ext.getCmp('MyAchieveViewWindow').close();
};
Srims.experts.MyAchieveViewWindow_BasicPanel.Action.myProjectJoin = function(element) {
    Srims.Action.actions['project-my-project-join']();
    Ext.getCmp('MyAchieveViewWindow').close();
};
Srims.experts.MyAchieveViewWindow_BasicPanel.Action.myVoucher = function(element) {
    Srims.Action.actions['expert-my-voucher']();
    Ext.getCmp('MyAchieveViewWindow').close();
};
Srims.experts.MyAchieveViewWindow_BasicPanel.Action.expertMyPaper = function(element) {
    Srims.Action.actions['expert-my-paper']();
    Ext.getCmp('MyAchieveViewWindow').close();
};
Srims.experts.MyAchieveViewWindow_BasicPanel.Action.expertMyPatent = function(element) {
    Srims.Action.actions['expert-my-patent']();
    Ext.getCmp('MyAchieveViewWindow').close();
};
Srims.experts.MyAchieveViewWindow_BasicPanel.Action.expertMyAward = function(element) {
    Srims.Action.actions['expert-my-award']();
    Ext.getCmp('MyAchieveViewWindow').close();
};



