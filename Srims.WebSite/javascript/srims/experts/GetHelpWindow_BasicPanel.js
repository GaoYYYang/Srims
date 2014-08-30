if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.GetHelpWindow_BasicPanel = function(){
    Srims.experts.GetHelpWindow_BasicPanel.superclass.constructor.call(this, {
        collapsible: false,
        height:75,
        frame: true,
        bodyStyle: 'padding:0px 0px 0',
        style: 'margin-bottom: 0px', 
        html: Srims.experts.GetHelpWindow_BasicPanel._getHtml()
    });
};
Ext.extend(Srims.experts.GetHelpWindow_BasicPanel, Ext.Panel);

Srims.experts.GetHelpWindow_BasicPanel._getHtml = function(){
    var items = [];
    items[items.length] = Srims.experts.GetHelpWindow_BasicPanel._getItem('综合科', '科技处主页建设与维护、科研管理信息系统维护,文件管理工作、科技处规章制度的拟订,科技统计、公章管理。');
    items[items.length] = Srims.experts.GetHelpWindow_BasicPanel._getItem('', '电话：0532-66781725','联系人：吴俊龙','地址:行远楼406房间','邮箱：wjl@ouc.edu.cn');
  
    var html = '';
    for (var i = 0; i < items.length; i++) {
        if (i % 2 == 0) 
            html += '<div style="width:620px;height:70px;">' + Srims.experts.GetHelpWindow_BasicPanel._NavigateItemHtmlTemplate.apply(items[i]);
        else 
            html += Srims.experts.GetHelpWindow_BasicPanel._NavigateItemHtmlTemplate.apply(items[i]) + '</div>';
    }
    if (items.length % 2 == 1) {
        html += '<div>';
    }
    
    return html;
}
Srims.experts.GetHelpWindow_BasicPanel._getItem = function(title, descriptionPhone,descriptionName,descriptionEmail,descriptionAddress){
    return {
        title: title,
        descriptionPhone: descriptionPhone, 
		descriptionName:descriptionName,
		descriptionEmail:descriptionEmail,
		descriptionAddress:descriptionAddress   
    };
}

Srims.experts.GetHelpWindow_BasicPanel._NavigateItemHtmlTemplate = new Ext.XTemplate('<div style="width:305px;float:left">', '<div style="width:80px;float:left;">', '</div>', '<div style="width:300px;float:left">', '<strong>{title}</strong><br />', '{descriptionPhone}','&nbsp &nbsp  {descriptionName}<br />','{descriptionEmail}','&nbsp &nbsp  {descriptionAddress}', '</div>', '</div>', '</a>');
