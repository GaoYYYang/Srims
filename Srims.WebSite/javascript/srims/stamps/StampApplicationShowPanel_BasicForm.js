if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationShowPanel_BasicForm = function(stampApplication) {
    this._stampApplication = stampApplication;

    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._stampApplication.get('keyWord'),
        readOnly: true,
        width: 160
    });
    this._textFieldStuffComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源',
        value: this._stampApplication.get('stampStuffFromName'),
        readOnly: true,
        width: 360
    });
    this._textFieldManager = new Ext.form.TextField({
        fieldLabel: '经办人',
        value: this._stampApplication.get('manager'),
        readOnly: true,
        width: 160
    });
    this._textFieldManagerPhone = new Ext.form.TextField({
        fieldLabel: '经办人电话',
        value: this._stampApplication.get('managerPhone'),
        readOnly: true,
        width: 160
    });
    this._textFieldManagerEmail = new Ext.form.TextField({
        fieldLabel: '经办人邮箱',
        value: this._stampApplication.get('managerEmail'),
        readOnly: true,
        width: 160
    });
    this._textFieldNUmber = new Ext.form.TextField({
        fieldLabel: '材料份数',
        value: this._stampApplication.get('stuffNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 160,
        value: this._stampApplication.get('principal'),
        readOnly: true
    });
    
    this._textFieldCurrentState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.stamp.StampStateRender(this._stampApplication.get('currentState')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentStateTime = new Ext.form.TextField({
        fieldLabel: '当前状态时间',
        value: Date.render(this._stampApplication.get('currentStateTime')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentStateOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: this._stampApplication.get('operator'),
        readOnly: true,
        width: 160
    });
    this._isDuplexPrint = new Ext.form.Checkbox({
        fieldLabel: '双面打印',
        readOnly: true,
        checked: this._stampApplication.get('isDuplexPrint')
    });
    this._sealPerforation = new Ext.form.Checkbox({
        fieldLabel: '骑缝章',
        readOnly: true,
        checked: this._stampApplication.get('sealPerforation')
    });
    this._expertPrint = new Ext.form.Checkbox({
        fieldLabel: '专家自行打印',
        readOnly: true,
        checked: this._stampApplication.get('expertPrint')
    });
    this._textFieldStampApplicationType = new Ext.form.TextField({
        fieldLabel: '文印申请类型',
        value: this._stampApplication.get('stampApplicationTypeName'),
        readOnly: true,
        width: 360
    });
    this._textFieldStampApplicationTypeGroup = new Ext.form.TextField({
        fieldLabel: '文印申请类型组',
        value: this._stampApplication.get('stampApplicationTypeGroupName'),
        readOnly: true,
        width: 360
    });
    var columnFirstItems = [this._textFieldPrincipal, this._textFieldManager,  this._textFieldCurrentState, this._expertPrint, this._isDuplexPrint, this._sealPerforation];
    var columnSecondItems = [this._textFieldKeyWord, this._textFieldManagerPhone, this._textFieldManagerEmail, this._textFieldNUmber, this._textFieldCurrentStateOperator, this._textFieldCurrentStateTime];

    Srims.stamp.StampApplicationShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 90,
        layout: 'form',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldStuffComingFrom, this._textFieldStampApplicationTypeGroup, this._textFieldStampApplicationType,new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                labelWidth: 90,
                width: 300,
                layout: 'form',
                style: 'width:350px',
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 90,
                width: 300,
                style: 'width:350px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });

    //方法
    this.resetValues = function(stamp) {
        this._textFieldStuffComingFrom.setValue(stamp.get('stampStuffFromName'));
        this._textFieldPrincipal.setValue(stamp.get('principal'));
        this._textFieldKeyWord.setValue(stamp.get('keyWord'));
        this._textFieldManager.setValue(stamp.get('manager'));
        this._textFieldManagerPhone.setValue(stamp.get('managerPhone'));
        this._textFieldManagerEmail.setValue(stamp.get('managerEmail'));
       // this._textFieldStampReason.setValue(stamp.get('stampReason'));
        this._textFieldNUmber.setValue(stamp.get('stuffNumber'));
        this._textFieldCurrentState.setValue(Srims.stamp.StampStateRender(stamp.get('currentState')));
        this._textFieldCurrentStateTime.setValue(Date.render(stamp.get('currentStateTime')));
        this._textFieldCurrentStateOperator.setValue(stamp.get('operator'));
        this._isDuplexPrint.setValue(stamp.get('isDuplexPrint'));
        this._sealPerforation.setValue(stamp.get('sealPerforation'));
        this._expertPrint.setValue(stamp.get('expertPrint'));
        this._textFieldStampApplicationType.setValue(stamp.get('stampApplicationTypeName'));
        this._textFieldStampApplicationTypeGroup.setValue(stamp.get('stampApplicationTypeGroupName'));

    }
}
Ext.extend(Srims.stamp.StampApplicationShowPanel_BasicForm, Ext.Panel, {});