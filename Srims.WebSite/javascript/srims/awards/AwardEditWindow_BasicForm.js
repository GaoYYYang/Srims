
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardEditWindow_BasicPanel = function(award){
    this.award = award;
    
    this._fieldName = new Srims.component.NoticeTextSearch.SearchComboBox({
        fieldLabel: '奖励名称',
        noticeTextType: "AwardName",
        value: award.get('name'),
        width: 300
    });
    this._fieldProjectName = new Ext.form.TextField({
        fieldLabel: '奖励项目名称',
        value: award.get('projectName'),
        width: 441
    });
    this._fieldRank = new Srims.component.NoticeTextComboBox({
        fieldLabel: '奖励级别',
        value: award.get('rank'),
        emptyText: '请选择奖励级别',
        noticeTextType: "AwardRank",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldAttendType = new Srims.component.NoticeTextComboBox({
        fieldLabel: '参与类型',
        value: award.get('attendType'),
        allowBlank: false,
        emptyText: '请选择参与类型',
        noticeTextType: "AwardAttendType",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldAuthorisedUnit = new Srims.component.NoticeTextComboBox({
        fieldLabel: '授奖单位',
        value: award.get('authorisedUnit'),
        emptyText: '请选择授奖单位',
        noticeTextType: "AwardAuthorisedUnit",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldClassification = new Srims.component.NoticeTextComboBox({
        fieldLabel: '奖种',
        value: award.get('classification'),
        emptyText: '请选择奖种',
        noticeTextType: "AwardClassification",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldYear = new Ext.form.NumberField({
        fieldLabel: '年度',
        value: award.get('year'),
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 160
    });
    this._fieldClass = new Srims.component.NoticeTextComboBox({
        fieldLabel: '等级',
        value: award.get('class'),
        emptyText: '请选择等级',
        noticeTextType: "AwardClass",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldRemark = new Ext.form.TextField({
        fieldLabel: '奖励备注',
        value: award.get('remark'),
        width: 441
    });
    this._fieldIntroduction = new Ext.form.TextArea({
        fieldLabel: '奖励简介',
        value: award.get('introduction'),
        scroll: true,
        height: 120,
        width: 441
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        emptyText: '请选择所属学院',
        value: award.get('collegeName'),
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        entityId: award.get('collegeID'),
        editable: false,
        triggerAction: 'all',
        width: 160
    });
    
    var user = Srims.currentLoginLog.user;
    var value = award.get('subjectNature');
    
    if (user.hasPermission_editLiteralAward && !user.hasPermission_editScienceAward) 
        value = Srims.SubjectNature.Liberal;
    if (!user.hasPermission_editLiteralAward && user.hasPermission_editScienceAward) 
        value = Srims.SubjectNature.Science;
    
    this._comboBoxSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科性质',
        value: value,
        store: Srims.subjectNatureStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        disabled: !(user.hasPermission_editLiteralAward && user.hasPermission_editScienceAward),
        width: 160
    });
    
    //constructor
    var columnOneItems = [this._fieldRank, this._fieldAttendType, this._fieldAuthorisedUnit, this._comboBoxCollege];
    var columnTwoItems = [this._fieldYear, this._fieldClass, this._fieldClassification, this._comboBoxSubjectNature];
    
    Srims.awards.AwardQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        width: 660,
        items: [this._fieldName, new Ext.Panel({
            widht: 660,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: columnOneItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                items: columnTwoItems
            })]
        }), this._fieldRemark, this._fieldProjectName, this._fieldIntroduction]
    });
    
    //method
    this.assignValues = function(){
        this.award.set('name', this._fieldName.getValue());
        this.award.set('projectName', this._fieldProjectName.getValue());
        this.award.set('attendType', this._fieldAttendType.getValue());
        this.award.set('rank', this._fieldRank.getValue());
        this.award.set('attendType', this._fieldAttendType.getValue());
        this.award.set('authorisedUnit', this._fieldAuthorisedUnit.getValue());
        this.award.set('collegeID', this._comboBoxCollege.getValue());
        this.award.set('classification', this._fieldClassification.getValue());
        this.award.set('year', this._fieldYear.getValue());
        this.award.set('class', this._fieldClass.getValue());
        this.award.set('remark', this._fieldRemark.getValue());
        this.award.set('introduction', this._fieldIntroduction.getValue());
        this.award.set('subjectNature', this._comboBoxSubjectNature.getValue());
    }
    
    this.clearParams = function(){
        this._fieldName.reset();
        this._fieldProjectName.reset();
        this._fieldAttendType.reset();
        this._fieldRank.reset();
        this._fieldAttendType.reset();
        this._fieldAuthorisedUnit.reset();
        this._fieldClassification.reset();
        this._fieldYear.reset();
        this._fieldClass.reset();
        this._fieldRemark.reset();
        this._fieldIntroduction.reset();
    }
    
    this._ValidateAwardName = function(){
        if (this._fieldName.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: '名称错误',
                msg: '您输入的名称只有空格，请重新输入有意义的名称。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._fieldName.isValid(preventMark) && result;
        result = this._fieldAttendType.isValid(preventMark) && result;
        result = this._fieldYear.isValid(preventMark) && result;
        result = this._ValidateAwardName() && result;
        return result;
    }
}

Ext.extend(Srims.awards.AwardEditWindow_BasicPanel, Ext.FormPanel);

