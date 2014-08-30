
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

