
if (!Srims.users) 
    Ext.namespace('Srims.users');


Srims.users.UserTemporaryAuthorizationPanel_EndDate = function(){
    this._dateFieldAccreditDateTime = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 120
    })
    this._dateFieldEndDate = new Ext.form.DateField({
        fieldLabel: '有效期至',
        allowBlank: false,
        width: 120
    })
    Srims.users.UserTemporaryAuthorizationPanel_EndDate.superclass.constructor.call(this, ({
        title: '设置权限有效期',
        frame: true,
        layout: 'column',
        items: [new Ext.Panel({
            width: 280,
            layout: 'form',
            border: false,
            items: [this._dateFieldAccreditDateTime]
        }), new Ext.Panel({
            width: 280,
            layout: 'form',
            border: false,
            items: [this._dateFieldEndDate]
        })]
    }))
    //methods
    this.buildParams = function(params){
        params.accreditDateTime = this._dateFieldAccreditDateTime.getValue();
        params.permissionEndDate = this._dateFieldEndDate.getValue();
    }
    this.isValid = function(preventMark){
        return this._dateFieldEndDate.isValid(preventMark);
    }
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel_EndDate, Ext.Panel, {});
