
if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperEditPanel_MessagePanel = function(systemSetting) {
    Srims.papers.LiberalArtsPaperEditPanel_MessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">' + systemSetting + '</span>'
    });
}
Ext.extend(Srims.papers.LiberalArtsPaperEditPanel_MessagePanel, Ext.Panel);
