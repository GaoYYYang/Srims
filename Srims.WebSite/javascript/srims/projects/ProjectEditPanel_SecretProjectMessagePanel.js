
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_SecretProjectMessagePanel = function(){
    Srims.projects.ProjectEditPanel_SecretProjectMessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: Srims.currentUser.hasPermission_AddSecretProject,
        html: '<span style="color:#FF0000">注意：如果项目信息涉密，请直接提交书面材料至科技处！</span>'
    });
}
Ext.extend(Srims.projects.ProjectEditPanel_SecretProjectMessagePanel, Ext.Panel);
