
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_PermissionManage = function(user, panel){
    this._user = user;
    this._checkBoxAllowMultiLogin = new Ext.form.Checkbox({
        fieldLabel: '允许多人登陆',
        checked: user.get('allowMultiLogin')
    });
    this._checkBoxIsSuper = new Ext.form.Checkbox({
        fieldLabel: '是否超级用户',
        checked: user.get('isSuper'),
        disabled: user.get('userRoleType') == Srims.users.UserRoleType.Expert
    });
    this._checkBoxIsCustomPower = new Ext.form.Checkbox({
        fieldLabel: '自定义权限',
        checked: user.get('isCustomPermission'),
        panel: panel,
        disabled: user.get('userRoleType') == Srims.users.UserRoleType.Expert
    });
    
    Srims.users.UserPermissionEditPanel_PermissionManage.superclass.constructor.call(this, {
        collapsible: true,
        title: '用户权限管理',
        autoHeight: true,
        frame: true,
        layout: 'form',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            width: 600,
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                width: 180,
                items: [this._checkBoxAllowMultiLogin]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                width: 180,
                items: [this._checkBoxIsSuper]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: [this._checkBoxIsCustomPower]
            })]
        })]
    })
    
    //method
    this.buildParams = function(params){
        params.AllowMultiLogin = this._checkBoxAllowMultiLogin.getValue();
        params.IsSuper = this._checkBoxIsSuper.getValue();
        params.IsCustomPermission = this._checkBoxIsCustomPower.getValue();
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_PermissionManage, Ext.form.FormPanel);
