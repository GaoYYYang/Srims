
if (!Srims.experts)
    Ext.namespace('Srims.experts');

//添加专家的时候，仅编辑专家的以下信息；其它信息待添加完后再编辑。
Srims.experts.ExpertEditPanel_Basic = function(expert, isNew) {
    this._expert = expert;
    this._textFieldNumber = new Ext.form.NumberField({
        fieldLabel: '工作证号',
        allowBlank: false,
        regex: /^20\d{5}$/,
        allowDecimals: false,
        allowNegative: false,
        width: 200
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '姓名',
        allowBlank: false,
        width: 200
    });
    this._textFieldNameSpell = new Ext.form.TextField({
        fieldLabel: '姓名拼音缩写',
        allowBlank: false,
        width: 200
    });
    this._comboBoxSex = new Ext.form.ComboBox({
        fieldLabel: '性别',
        store: Srims.experts.SexType.store,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 200,
        width: 184
    });
    this._dateFieldBirthday = new Ext.form.DateField({
        fieldLabel: '出生日期',
        allowBlank: false,
        width: 200
    });
    this._radioIsOnjob = new Srims.component.RadioGroup({
        fieldLabel: '是否在职',
        allowBlank: false,
        items: Srims.component.RadioGroup.StoreFunction('isOnjob', expert, false)
    });
    this._radioIsChinese = new Srims.component.RadioGroup({
        fieldLabel: '是否中国国籍',
        allowBlank: false,
        items: Srims.component.RadioGroup.StoreFunction('isChinese', expert, false)
    });
    this._numberFieldMobilePhone = new Ext.form.NumberField({
        fieldLabel: '移动电话',
        regex: /^1[3,5]\d{9}$/,
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 200
    });
    this._fieldCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        allowBlank: false,
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 200
    });
        this._fieldCollege2 = new Srims.component.EntityComboBox({
        fieldLabel: '双聘单位',
        allowBlank: false,
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 200
    });
    this._fieldDepartment = new Srims.component.EntityComboBox({
        fieldLabel: '所属部门',
        allowBlank: false,
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllDepartment'),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 200
    });

    var items1 = [this._textFieldName, this._textFieldNameSpell, this._fieldCollege,this._fieldCollege2, this._fieldDepartment, this._radioIsChinese];
    var items2 = [this._comboBoxSex, this._dateFieldBirthday, this._textFieldNumber, this._numberFieldMobilePhone, this._radioIsOnjob];

    Srims.experts.ExpertEditPanel_Basic.superclass.constructor.call(this, {
        title: '基本信息',
        Height: 350,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:300px',
                items: items1
            }), new Ext.Panel({
                width: 450,
                style: 'width:300px',
                layout: 'form',
                items: items2
            })]
        })]
    });

    this.assignValues = function() {
        this._expert.set('name', this._textFieldName.getValue());
        this._expert.set('nameSpell', this._textFieldNameSpell.getValue());
        this._expert.set('sex', this._comboBoxSex.getValue());
        this._expert.set('number', this._textFieldNumber.getValue());
        this._expert.set('birthday', this._dateFieldBirthday.getValue());
        this._expert.set('collegeID', this._fieldCollege.getValue());
         this._expert.set('college2ID', this._fieldCollege2.getValue());
        this._expert.set('departmentID', this._fieldDepartment.getValue());
        this._expert.set('isOnjob', this._radioIsOnjob.getValue());
        this._expert.set('isChinese', this._radioIsChinese.getValue());
        this._expert.set('mobilePhone', this._numberFieldMobilePhone.getValue());
    }
    this.clearParams = function() {
        this._textFieldName.reset();
        this._comboBoxSex.reset();
        this._textFieldNumber.reset();
        this._dateFieldBirthday.reset();
        this._fieldCollege.reset();
         this._fieldCollege2.reset();
        this._fieldDepartment.reset();
        this._textFieldNameSpell.reset();
        this._radioIsOnjob.reset();
        this._numberFieldMobilePhone.reset();
        this._radioIsChinese.reset();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._textFieldName.isValid(preventMark) && result;
        result = this._comboBoxSex.isValid(preventMark) && result;
        result = this._textFieldNumber.isValid(preventMark) && result;
        result = this._dateFieldBirthday.isValid(preventMark) && result;
        result = this._fieldCollege.isValid(preventMark) && result;
        result = this._fieldCollege2.isValid(preventMark) && result;
        result = this._fieldDepartment.isValid(preventMark) && result;
        result = this._textFieldNameSpell.isValid(preventMark) && result;
        result = this._radioIsOnjob.isValid(preventMark) && result;
        result = this._numberFieldMobilePhone.isValid(preventMark) && result;
        result = this._radioIsChinese.isValid(preventMark) && result;
        return result;
    }



}
Ext.extend(Srims.experts.ExpertEditPanel_Basic, Ext.form.FormPanel);
