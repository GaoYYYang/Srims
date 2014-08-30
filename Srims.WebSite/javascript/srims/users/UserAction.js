
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserAction = function(){
}
Srims.users.UserAction.listUser = function(showNewWindow){
    panelId = 'UserGridPanel';
    userStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    if (panel) {
        userStore = panel.getUserStore();
    }
    else {
        userStore = new Srims.users.UserStore(Srims.service.users.UserService + '/Query');
        panel = new Srims.users.UserGridPanel(panelId, userStore, '用户模块', 'icon-user-list');
        Srims.WorkSpace.addPanel(panel);
    }
    
    if (showNewWindow) 
        Srims.users.UserAction.newUser();
};
Srims.users.UserAction.basicInfoEditUser = function(user){
    var id = 'EditBasicInfoUserWindow' + user.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) 
        window = new Srims.users.UserBasicInformationEditWindow(id, user);
    
    window.show();
};
Srims.users.UserAction.permissionEditUser = function(user){
    var panelId = 'EditPermissionUserPanel' + user.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        panel = new Srims.users.UserPermissionEditPanel(panelId, user);
        Srims.WorkSpace.addPanel(panel);
    }
};
Srims.users.UserAction.newUser = function(){
    var id = 'NewUserWindow';
    var window = Ext.getCmp(id);
    
    if (!window) {
        user = new Srims.users.User({});
        window = new Srims.users.UserBasicInformationEditWindow(id, user);
    }
    
    window.show();
};
Srims.users.UserAction.appointCollegeAdministrator = function(user){
    var panelId = 'AppointCollegeAdministratorGridPanel' + user.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        panel = new Srims.users.UserAppointCollegeAdministratorGridPanel(panelId, user);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.users.UserAction.UserTemporaryAuthorization = function(user){
    var panelId = 'UserTemporaryAuthorization' + user.get('id');
    var panel = Srims.WorkSpace.active(panel);
    
    if (!panel) {
        panel = new Srims.users.UserTemporaryAuthorizationPanel(panelId, user);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.users.UserAction.listTemporaryPermission = function(user){
    panelId = 'TemporaryPermissionGridPanel' + user.get('id');
    temporaryPermissionStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (panel) {
        temporaryPermissionStore = panel.getpermissionStore();
    }
    else {
        temporaryPermissionStore = new Srims.users.UserTemporaryPermissionStore(Srims.service.users.UserService + '/GetTemporaryUserPermissions', {
            userID: user.get('id')
        });
        panel = new Srims.users.UserRetractTemporaryAuthorizationGridPanel(panelId, temporaryPermissionStore, user.get('name') + '的临时权限', 'icon-userTemporary-list');
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.users.UserAction.lockUser = function(user){
    var panelId = 'LockUserEditWindow' + user.get('id');
    var window = Ext.getCmp(panelId);
    
    if (!window) {
        window = new Srims.users.UserLockEditWindow(panelId, user);
    }
    window.show();
}
Srims.users.UserAction.listActiveUsers = function(){
    panelId = 'ActiveUserGridPanel';
    userStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    if (panel) {
        userStore = panel.getUserStore();
    }
    else {
        userStore = new Srims.users.UserStore(Srims.service.users.UserService + '/ActiveUsersQuery');
        panel = new Srims.users.ActiveUsersGridPanel(panelId, userStore, '当前在线用户', 'icon-activeuser-list');
        Srims.WorkSpace.addPanel(panel);
    }
}
