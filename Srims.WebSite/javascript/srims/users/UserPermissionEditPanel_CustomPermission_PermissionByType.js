
if (!Srims.users) 
    Ext.namespace('Srims.users');
Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType = function(user){

    this._user = user;
    this._hasPermissionShow = new Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Show(user);
    this._hasPermissionEdit = new Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Edit(user);
    
    Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType.superclass.constructor.call(this, {
        title: '项目管理权限',
        frame: true,
        layout: 'column',
        labelWidth: 150,
        items: [this._hasPermissionShow, this._hasPermissionEdit]
    })
    
    this.buildParams = function(params){
        this._hasPermissionShow.buildParams(params);
        this._hasPermissionEdit.buildParams(params);
    }
    this.clearParams = function(){
        this._hasPermissionShow.clearParams();
        this._hasPermissionEdit.clearParams();
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType, Ext.Panel, {});

