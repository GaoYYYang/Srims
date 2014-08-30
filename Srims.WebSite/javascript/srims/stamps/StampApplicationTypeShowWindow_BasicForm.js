
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');
Srims.stamp.StampApplicationTypeShowWindow_BasicForm = function(stampApplicationType) {
    this._stampApplicationType = stampApplicationType;

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: stampApplicationType.get('name'),
        readOnly: true,
        width: 120
    });
    this._textFieldTwice = new Ext.form.TextField({
        fieldLabel: '是否二次审核',
        value: stampApplicationType.get('isTwiceCancer'),
        readOnly: true,
        width: 60
    });
    this._textFieldProject = new Ext.form.TextField({
        fieldLabel: '是否项目相关',
        value: stampApplicationType.get('isProjectRelated'),
        readOnly: true,
        width: 60
    });

    Srims.stamp.StampApplicationTypeShowWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '文印申请类型信息',
        autoHeight: true,
        //    frame: true,
        labelWidth: 90,
        bodyStyle: 'padding:5px 5px 0',
        // style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, this._textFieldTwice, this._textFieldProject]
    });
}
Ext.extend(Srims.stamp.StampApplicationTypeShowWindow_BasicForm, Ext.form.FormPanel);
