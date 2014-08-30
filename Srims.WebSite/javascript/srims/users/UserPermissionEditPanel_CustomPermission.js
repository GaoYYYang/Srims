
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_CustomPermission = function(user){
    this._user = user;
    this._permissionNormal = new Srims.users.UserPermissionEditPanel_CustomPermission_PermissionNormal(user);
    this._permissionByType = new Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType(user);
    
    Srims.users.UserPermissionEditPanel_CustomPermission.superclass.constructor.call(this, {
        collapsible: true,
        title: '自定义权限',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        disabled: !user.get('isCustomPermission'),
        titleCollapse: true,
        items: [this._permissionNormal, this._permissionByType]
    })
    
    this.buildParams = function(params){
        this._permissionNormal.buildParams(params);
        this._permissionByType.buildParams(params);
    }
    this.clearParams = function(){
        this._permissionNormal.clearParams();
        this._permissionByType.clearParams();
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission, Ext.Panel, {});
