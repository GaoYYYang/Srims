if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.GetHelpWindow_BasicPanelPlan = function(){
    Srims.experts.GetHelpWindow_BasicPanelPlan.superclass.constructor.call(this, {
        collapsible: false,
        height:75,
        frame: true,
        bodyStyle: 'padding:0px 0px 0',
        style: 'margin-bottom: 0px',
        html: Srims.experts.GetHelpWindow_BasicPanelPlan._getHtml()
    });
};
Ext.extend(Srims.experts.GetHelpWindow_BasicPanelPlan, Ext.Panel);

Srims.experts.GetHelpWindow_BasicPanelPlan._getHtml = function(){
    var items = [];
    items[items.length] = Srims.experts.GetHelpWindow_BasicPanelPlan._getItem('计划管理科', '973计划、863计划、国家科技支撑计划、NSFC、教育部项目以及其他级别项目的计划管理。');
    items[items.length] = Srims.experts.GetHelpWindow_BasicPanelPlan._getItem('', '电话：0532-66782723','联系人：李  岩','地址: 行远楼404房间','邮箱：liyan12@ouc.edu.cn');
  
    var html = '';
    for (var i = 0; i < items.length; i++) {
        if (i % 2 == 0) 
            html += '<div style="width:620px;height:60px;">' + Srims.experts.GetHelpWindow_BasicPanelPlan._NavigateItemHtmlTemplate.apply(items[i]);
        else 
            html += Srims.experts.GetHelpWindow_BasicPanelPlan._NavigateItemHtmlTemplate.apply(items[i]) + '</div>';
    }
    if (items.length % 2 == 1) {
        html += '<div>';
    }
    
    return html;
}
Srims.experts.GetHelpWindow_BasicPanelPlan._getItem = function(title, descriptionPhone,descriptionName,descriptionEmail,descriptionAddress){
    return {
        title: title,
        descriptionPhone: descriptionPhone, 
		descriptionName:descriptionName,
		descriptionEmail:descriptionEmail,
		descriptionAddress:descriptionAddress   
    };
}

Srims.experts.GetHelpWindow_BasicPanelPlan._NavigateItemHtmlTemplate = new Ext.XTemplate('<div style="width:305px;float:left">', '<div style="width:80px;float:left;">', '</div>', '<div style="width:300px;float:left">', '<strong>{title}</strong><br />', '{descriptionPhone}','&nbsp &nbsp &nbsp {descriptionName}<br />','{descriptionEmail}','&nbsp &nbsp &nbsp{descriptionAddress}', '</div>', '</div>', '</a>');
