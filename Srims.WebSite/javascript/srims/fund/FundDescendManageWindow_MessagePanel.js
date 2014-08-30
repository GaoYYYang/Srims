
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow_MessagePanel = function(){
    Srims.fund.FundDescendManageWindow_MessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">注意：如果这个经费到帐信息有未审核的经费下拨，强烈建议您先审核后下拨</span>'
    });
}
Ext.extend(Srims.fund.FundDescendManageWindow_MessagePanel, Ext.Panel);
