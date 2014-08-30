
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel = function(id, user){
    this._user = user;
    this._permissionManage = new Srims.users.UserPermissionEditPanel_PermissionManage(user, this);
    this._customPermission = new Srims.users.UserPermissionEditPanel_CustomPermission(user);
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        panel: this
    });
    
    Srims.users.UserPermissionEditPanel.superclass.constructor.call(this, {
        id: id,
        closable: true,
        title: user.get('name') + '权限编辑',
        labelWidth: 80,
        frame: true,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        deferHeight: false,
        iconCls: 'icon-user-permission-edit',
        items: [this._permissionManage, this._customPermission],
        buttons: [this._buttonSave]
    });
    
    //methods
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/SaveForPermission',
            params: this.getParams(),
            scope: this,
            success: function(){
                panel = Srims.WorkSpace.active('UserGridPanel');
                if (panel) 
                    panel.getUserStore().load();
                else {
                    userStore = new Srims.users.UserStore(Srims.service.users.UserService + '/Query');
                    panel = new Srims.users.UserGridPanel('UserGridPanel', userStore, '用户模块', 'icon-user-list');
                    Srims.WorkSpace.addPanel(panel);
                }
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        })
    }
    this.getParams = function(){
        var params = {};
        this._permissionManage.buildParams(params);
        this._customPermission.buildParams(params);
        params.UserID = this._user.get('id');
        return params;
    }
    this.clearParams = function(){
        this._customPermission.clearParams();
    }
    //event
    this._permissionManage._checkBoxIsCustomPower.on('check', check);
    
    function check(checkbox, checked){
        var panel = checkbox.panel;
        if (!checked) {
            Ext.Ajax.request({
                url: Srims.service.users.UserService + '/ClearUserAllPermissions',
                params: {
                    userID: user.get('id')
                },
                scope: this,
                success: function(){
                    panel.clearParams();
                }
            })
        }
        this.panel._customPermission.setDisabled(!checked);
    }
    this._onButtonSave_Click = function(button, e){
        var panel = button.panel;
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.UserPermissionEditPanel, Ext.Panel, {});
