
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineEditPanel_BasicForm = function(magazine){
    this._magazine = magazine;
    
    this._textFieldFullName = new Ext.form.TextField({
        fieldLabel: '全称',
        value: magazine.get('fullName'),
        allowBlank: false,
        width: 400
    });
    this._textFieldShortName = new Ext.form.TextField({
        fieldLabel: '简称',
        value: magazine.get('shortName'),
        width: 150
    });
    this._textFieldISSN = new Ext.form.TextField({
        fieldLabel: 'ISSN',
        value: magazine.get('issn'),
        allowBlank: false,
        width: 150
    });
    this._comboBoxLanguage = new Ext.form.ComboBox({
        fieldLabel: '语种',
        value: magazine.get('language'),
        store: Srims.papers.languageStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 150,
        width: 150
    });
    this._comboBoxPublishType = new Ext.form.ComboBox({
        fieldLabel: '出版类型',
        value: magazine.get('publishType'),
        store: Srims.papers.publishTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 150,
        width: 150
    });
    this._textFieldSubjectClass = new Srims.component.NoticeTextSearch.SearchComboBox({
        fieldLabel: '学科分类',
        value: magazine.get('subjectClass'),
        noticeTextType: "SubjectClass",
        width: 418
    });
    this._comboBoxSubjectRank = new Srims.component.NoticeTextComboBox({
        fieldLabel: '期刊等级',
        noticeTextType: 'SubjectRank',
        value: magazine.get('subjectRank'),
        allowBlank: true,
        listWidth: 150,
        width: 150
    });
    this._textFieldPublishCompany = new Ext.form.TextField({
        fieldLabel: '出版公司',
        value: magazine.get('publishCompany'),
        width: 150
    });
    this._textFieldPublishCompanyCity = new Ext.form.TextField({
        fieldLabel: '公司所在城市',
        value: magazine.get('publishCompanyCity'),
        width: 400
    });
    this._textFieldPublishCompanyAddress = new Ext.form.TextField({
        fieldLabel: '公司地址',
        value: magazine.get('publishCompanyAddress'),
        width: 400
    });
    var columnFirstItems = [this._textFieldShortName, this._comboBoxLanguage, this._comboBoxSubjectRank];
    var columnSecondItems = [this._textFieldISSN, this._comboBoxPublishType, this._textFieldPublishCompany];
    
    Srims.papers.MagazineEditPanel_BasicForm.superclass.constructor.call(this, {
        title: '',
        Height: 350,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldFullName, new Ext.Panel({
            widht: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 250,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldSubjectClass, this._textFieldPublishCompanyCity, this._textFieldPublishCompanyAddress]
    });
    
    this.assginValues = function(){
        this._magazine.set('fullName', this._textFieldFullName.getValue());
        this._magazine.set('shortName', this._textFieldShortName.getValue());
        this._magazine.set('issn', this._textFieldISSN.getValue());
        this._magazine.set('language', this._comboBoxLanguage.getValue());
        this._magazine.set('publishType', this._comboBoxPublishType.getValue());
        this._magazine.set('subjectRank', this._comboBoxSubjectRank.getValue());
        this._magazine.set('publishCompany', this._textFieldPublishCompany.getValue());
        this._magazine.set('publishCompanyCity', this._textFieldPublishCompanyCity.getValue());
        this._magazine.set('publishCompanyAddress', this._textFieldPublishCompanyAddress.getValue());
        this._magazine.set('subjectClass', this._textFieldSubjectClass.getValue());
    }
    this.validTextField = function(textField){
        if (textField.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: textField.fieldLabel + '错误',
                msg: '您输入的值只有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
        
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldFullName.isValid(preventMark) && result;
        result = this._textFieldShortName.isValid(preventMark) && result;
        result = this._textFieldISSN.isValid(preventMark) && result;
        result = this._comboBoxLanguage.isValid(preventMark) && result;
        result = this._comboBoxPublishType.isValid(preventMark) && result;
        result = this._comboBoxSubjectRank.isValid(preventMark) && result;
        result = this._textFieldPublishCompany.isValid(preventMark) && result;
        result = this._textFieldPublishCompanyCity.isValid(preventMark) && result;
        result = this._textFieldPublishCompanyAddress.isValid(preventMark) && result;
        result = this._textFieldSubjectClass.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldFullName) && result;
        result = this.validTextField(this._textFieldISSN) && result;
        return result;
    }
}

Ext.extend(Srims.papers.MagazineEditPanel_BasicForm, Ext.form.FormPanel, {});
