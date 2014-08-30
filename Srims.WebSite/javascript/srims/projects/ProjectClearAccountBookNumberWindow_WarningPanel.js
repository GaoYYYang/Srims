
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectClearAccountBookNumberWindow_WarningPanel = function(){
    Srims.projects.ProjectClearAccountBookNumberWindow_WarningPanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">警告：清空项目账本号操作不可撤销，不可修改；请仔细填写清空项目账本号的理由！</span>'
    });
}
Ext.extend(Srims.projects.ProjectClearAccountBookNumberWindow_WarningPanel, Ext.Panel);
