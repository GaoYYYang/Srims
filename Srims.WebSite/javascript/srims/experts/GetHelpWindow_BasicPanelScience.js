if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.GetHelpWindow_BasicPanelScience = function(){
    Srims.experts.GetHelpWindow_BasicPanelScience.superclass.constructor.call(this, {
        collapsible: false,
        height:75,
        frame: true,
        bodyStyle: 'padding:0px 0px 0',
        style: 'margin-bottom: 0px',
        html: Srims.experts.GetHelpWindow_BasicPanelScience._getHtml()
    });
};
Ext.extend(Srims.experts.GetHelpWindow_BasicPanelScience, Ext.Panel);

Srims.experts.GetHelpWindow_BasicPanelScience._getHtml = function(){
    var items = [];
    items[items.length] = Srims.experts.GetHelpWindow_BasicPanelScience._getItem('科协办公室', '挂靠学校各级学会的管理，文件与档案管理，科协办公室的其它工作。');
    items[items.length] = Srims.experts.GetHelpWindow_BasicPanelScience._getItem('', '电话：0532-66781725','联系人：孙丽萍','地址:行远楼406房间','邮箱：lipingsun@ouc.edu.cn');
  
    var html = '';
    for (var i = 0; i < items.length; i++) {
        if (i % 2 == 0) 
            html += '<div style="width:620px;height:60px;">' + Srims.experts.GetHelpWindow_BasicPanelScience._NavigateItemHtmlTemplate.apply(items[i]);
        else 
            html += Srims.experts.GetHelpWindow_BasicPanelScience._NavigateItemHtmlTemplate.apply(items[i]) + '</div>';
    }
    if (items.length % 2 == 1) {
        html += '<div>';
    }
    
    return html;
}
Srims.experts.GetHelpWindow_BasicPanelScience._getItem = function(title, descriptionPhone,descriptionName,descriptionEmail,descriptionAddress){
    return {
        title: title,
        descriptionPhone: descriptionPhone, 
		descriptionName:descriptionName,
		descriptionEmail:descriptionEmail,
		descriptionAddress:descriptionAddress   
    };
}

Srims.experts.GetHelpWindow_BasicPanelScience._NavigateItemHtmlTemplate = new Ext.XTemplate('<div style="width:305px;float:left">', '<div style="width:80px;float:left;">', '</div>', '<div style="width:300px;float:left">', '<strong>{title}</strong><br />', '{descriptionPhone}','&nbsp &nbsp  {descriptionName}<br />','{descriptionEmail}','&nbsp &nbsp  {descriptionAddress}', '</div>', '</div>', '</a>');
