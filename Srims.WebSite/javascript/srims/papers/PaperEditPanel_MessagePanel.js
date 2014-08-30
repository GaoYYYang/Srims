
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperEditPanel_MessagePanel = function(systemSetting){
    Srims.papers.PaperEditPanel_MessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">' + systemSetting + '</span>'
    });
}
Ext.extend(Srims.papers.PaperEditPanel_MessagePanel, Ext.Panel);
