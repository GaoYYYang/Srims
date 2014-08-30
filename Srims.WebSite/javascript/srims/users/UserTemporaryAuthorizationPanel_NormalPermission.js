
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryAuthorizationPanel_NormalPermission = function(){
    this._checkBoxPowerItem = new Srims.component.CheckBoxGroup({
        hideLabel: true,
        cls: 'srims-checkboxGroup-userPermission',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.users.UserPermissionItem.store)
    })
    Srims.users.UserTemporaryAuthorizationPanel_NormalPermission.superclass.constructor.call(this, {
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
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel_NormalPermission, Ext.form.FormPanel);
