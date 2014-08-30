if (!Srims.stanp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationQueryWindow_BasicPanel = function(stampState) {

    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        width: 150
    });
    this._textFieldStuffComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源',
        width: 300
    });
    this._textFieldStampApplicationType = new Ext.form.TextField({
        fieldLabel: '文印申请类型',
        width: 300
    });
    this._textFieldStampApplicationTypeGroup = new Ext.form.TextField({
        fieldLabel: '文印申请类型组',
        width: 300
    });
    this._textFieldManager = new Ext.form.TextField({
        fieldLabel: '经办人',
        width: 150
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 150
    });
    this._comboBoxStampReasons = new Srims.component.NoticeTextComboBox({
        fieldLabel: '盖章事由',
        displayField: 'name',
        noticeTextType: 'StampReason',
        editable: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._checkBoxGroupCurrentState = new Srims.component.CheckBoxGroup({
        fieldLabel: '当前状态',
        cls: 'srims-checkboxGroup',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.stamp.StampStateStore),
        columns: 4
    });
    this._comboBoxStuffTypes = new Srims.component.NoticeTextComboBox({
        fieldLabel: '材料类型',
        displayField: 'name',
        noticeTextType: 'StuffType',
        editable: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._comboBoxStampTypes = new Srims.component.EntityComboBox({
        fieldLabel: '盖章类型',
        store: new Srims.stamp.StampStore({}, Srims.service.stamp.StampService + '/Query'),
        displayField: 'type',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });

    this._dateFieldStateDateStart = new Ext.form.DateField({
        fieldLabel: '操作时间',
        width: 150
    });
    this._dateFieldStateDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._textFieldAdministrator = new Ext.form.TextField({
        fieldLabel: '初审管理员',
        width: 150
    });
    this._textFieldDepartmentAdminiatrator = new Ext.form.TextField({
        fieldLabel: '部门管理员',
        width: 150
    });
    var items1 = [this._textFieldPrincipal, this._textFieldAdministrator, this._comboBoxStampReasons, this._comboBoxStampTypes, this._dateFieldStateDateStart];
    var items2 = [this._textFieldManager, this._textFieldDepartmentAdminiatrator, this._textFieldKeyWord, this._comboBoxStuffTypes, this._dateFieldStateDateEnd];
    var items = [];

    if (stampState == undefined)
        items = [this._textFieldStuffComingFrom, this._textFieldStampApplicationType, this._textFieldStampApplicationTypeGroup, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: items1
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: items2
            })]
        }), this._checkBoxGroupCurrentState];
    else
        items = [this._textFieldStuffComingFrom, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 100,
                items: items1
            }), new Ext.Panel({
                labelWidth: 100,
                layout: 'form',
                items: items2
            })]
        })];

    Srims.stamp.StampApplicationQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: items
    });

    this.buildParams = function(params) {
        params.keyWord = this._textFieldKeyWord.getValue();
        params.manager = this._textFieldManager.getValue();
        params.principal = this._textFieldPrincipal.getValue();
        params.stampStuffFromName = this._textFieldStuffComingFrom.getValue();
        params.stampAdministrator = this._textFieldAdministrator.getValue();
        params.stampDepartmentAdministrator = this._textFieldDepartmentAdminiatrator.getValue();
        params.stampApplicationType = this._textFieldStampApplicationType.getValue();
        params.stampApplicationTypeGroup = this._textFieldStampApplicationTypeGroup.getValue();
        if (stampState == undefined)
            params.currentState = this._checkBoxGroupCurrentState.getSelecetedValue();
        params.stampStuffs = this._comboBoxStuffTypes.getValue();
        params.stampTypes = this._comboBoxStampTypes.getText();
        params.stampReasons = this._comboBoxStampReasons.getValue();

        params.StateDateStart = Date.format(this._dateFieldStateDateStart.getValue());
        params.StateDateEnd = Date.format(this._dateFieldStateDateEnd.getValue());
    }
    this.clearParams = function() {
        this._textFieldKeyWord.reset();
        this._textFieldManager.reset();
        this._textFieldManager.reset();
        this._textFieldStuffComingFrom.reset();
        if (stampState == undefined)
            this._checkBoxGroupCurrentState.reset();
        this._comboBoxStuffTypes.reset();
        this._comboBoxStampTypes.reset();
        this._textFieldStampApplicationType.reset();
        this._textFieldStampApplicationTypeGroup.reset();
        this._comboBoxStampReasons.reset();
    }
}
Ext.extend(Srims.stamp.StampApplicationQueryWindow_BasicPanel, Ext.FormPanel);