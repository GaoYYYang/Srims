
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_CustomPermission_PermissionNormal = function(user){
    this._user = user;
    this._checkBoxPowerItem = new Srims.component.CheckBoxGroup({
        hideLabel: true,
        cls: 'srims-checkboxGroup-userPermission',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.users.UserPermissionItem.store, user.get('normalPermission'))
    })
    Srims.users.UserPermissionEditPanel_CustomPermission_PermissionNormal.superclass.constructor.call(this, {
        collapsible: true,
        title: '一般权限',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._checkBoxPowerItem]
    })
    
    this.buildParams = function(params){
        params.customPermission_PermissionNormal = this._checkBoxPowerItem.getSelecetedValue();
    }
    this.clearParams = function(){
        this._checkBoxPowerItem.reset();
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission_PermissionNormal, Ext.form.FormPanel);

