
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType = function(){
    this._manageProjectsByType_Show = new Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Show();
    this._manageProjectsByType_Edit = new Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Edit();
    
    Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType.superclass.constructor.call(this, {
        title: '项目管理权限',
        frame: true,
        layout: 'column',
        labelWidth: 150,
        items: [this._manageProjectsByType_Show, this._manageProjectsByType_Edit]
    })
    
    this.buildParams = function(params){
        this._manageProjectsByType_Show.buildParams(params);
        this._manageProjectsByType_Edit.buildParams(params);
    }
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType, Ext.Panel, {});
