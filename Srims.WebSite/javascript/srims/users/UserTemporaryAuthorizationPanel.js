
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryAuthorizationPanel = function(id, user){
    this._user = user;
    this._normalPermissionPanel = new Srims.users.UserTemporaryAuthorizationPanel_NormalPermission();
    this._manageProjectsByTypePanel = new Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType();
    this._permissionEndDatePanel = new Srims.users.UserTemporaryAuthorizationPanel_EndDate();
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        panel: this
    });
    
    Srims.users.UserTemporaryAuthorizationPanel.superclass.constructor.call(this, {
        id: id,
        closable: true,
        title: '临时授权于用户' + user.get('name'),
        labelWidth: 80,
        frame: true,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        deferHeight: false,
        iconCls: 'icon-user-permission-edit',
        items: [this._permissionEndDatePanel, this._normalPermissionPanel, this._manageProjectsByTypePanel],
        buttons: [this._buttonSave]
    });
    
    //methods
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/SaveForTemporaryAuthorizationPermissions',
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
        this._normalPermissionPanel.buildParams(params);
        this._manageProjectsByTypePanel.buildParams(params);
        this._permissionEndDatePanel.buildParams(params);
        if (params.accreditDateTime != null && params.accreditDateTime != '') 
            params.accreditDateTime = params.accreditDateTime.format("Y-m-d H:i:s");
        params.permissionEndDate = params.permissionEndDate.format("Y-m-d H:i:s");
        params.UserID = this._user.get('id');
        return params;
    }
    this.isValid = function(preventMark){
        return this._permissionEndDatePanel.isValid(preventMark);
    }
    this.isDateValidate = function(){
        return this._permissionEndDatePanel._dateFieldEndDate.getValue() >= this._permissionEndDatePanel._dateFieldAccreditDateTime.getValue();
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var panel = button.panel;
        if (!panel.isValid(false)) 
            return;
        if (!panel.isDateValidate()) {
            Ext.Msg.show({
                title: '权限有效期设置错误',
                msg: '权限终止时间不能小于权限开始时间！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            })
            return false;
        }
        
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel, Ext.Panel, {});
