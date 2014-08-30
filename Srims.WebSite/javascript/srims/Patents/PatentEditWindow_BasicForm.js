
if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentEditWindow_BasicPanel = function(patent){
    this.patent = patent;
    
    
    this._ApplicationTime = new Ext.form.DateField({
        fieldLabel: '申请时间',
        value: patent.get('applicationDateTime'),
        width: 160
    });
    this._AuthorizedTime = new Ext.form.DateField({
        fieldLabel: '授权时间',
        value: patent.get('authorizeDateTime'),
        width: 160
    });
    this._LawStateTime = new Ext.form.DateField({
        fieldLabel: '法律状态时间',
        value: patent.get('lawStateTime'),
        width: 160
    });
    this._College = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        value: patent.get('collegeName'),
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        emptyText: '请选择学院',
        entityId: patent.get('collegeID'),
        editable: true,
        triggerAction: 'all',
        width: 160
    });
    this._PatentCategory = new Srims.component.NoticeTextComboBox({
        fieldLabel: '专利分类',
        value: patent.get('category'),
        emptyText: '请选择专利分类',
        noticeTextType: "PatentCategory",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        width: 160
    });
    this._patentLevel = new Ext.form.ComboBox({
        fieldLabel: '专利级别',
        value: patent.get('level'),
        store: Srims.patents.PatentLevelStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        width: 160
    });
    
    this._PatentAgency = new Srims.component.EntityComboBox({
        fieldLabel: '代理机构',
        value: patent.get('agencyName'),
        store: new Srims.patents.PatentAgencyStore(Srims.service.patents.PatentAgencyService + '/Query'),
        displayField: 'agencyName',
        emptyText: '请选择代理机构',
        entityId: patent.get('agencyID'),
        editable: true,
        triggerAction: 'all',
        width: 220
    });
    this._textFieldAgent = new Ext.form.TextField({
        fieldLabel: '代理人',
        value: patent.get('agent'),
        width: 160
    });
    this._PatentMainCategoryNumber = new Ext.form.TextField({
        fieldLabel: '主分类号',
        value: patent.get('mainCategoryNumber'),
        width: 441
    });
    this._PatentAllCategoryNumber = new Ext.form.TextField({
        fieldLabel: '全部分类号',
        value: patent.get('allCategoryNumber'),
        width: 441
    });
    
    this._fieldRemark = new Ext.form.TextArea({
        fieldLabel: '专利备注',
        value: patent.get('remark'),
        height: 40,
        width: 441
    });
    this._fieldIntroduction = new Ext.form.TextArea({
        fieldLabel: '专利简介',
        value: patent.get('introduction'),
        scroll: true,
        height: 120,
        width: 441
    });
    
    //constructor
    var columnOneItems = [this._ApplicationTime, this._LawStateTime, this._College, this._textFieldAgent];
    var columnTwoItems = [this._PatentCategory, this._AuthorizedTime, this._patentLevel];
    
    Srims.patents.PatentEditWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        width: 585,
        items: [new Ext.Panel({
            widht: 580,
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
        }), this._PatentAgency, this._PatentMainCategoryNumber, this._PatentAllCategoryNumber, this._fieldRemark, this._fieldIntroduction]
    });
    
    //method
    this.assignValues = function(){
        this.patent.set('applicationDateTime', Date.format(this._ApplicationTime.getValue()));
        this.patent.set('authorizeDateTime', Date.format(this._AuthorizedTime.getValue()));
        this.patent.set('lawStateTime', Date.format(this._LawStateTime.getValue()));
        this.patent.set('collegeID', this._College.getValue());
        this.patent.set('agencyID', this._PatentAgency.getValue());
        this.patent.set('agent', this._textFieldAgent.getValue());
        this.patent.set('category', this._PatentCategory.getValue());
        this.patent.set('level', this._patentLevel.getValue());
        this.patent.set('remark', this._fieldRemark.getValue());
        this.patent.set('introduction', this._fieldIntroduction.getValue());
        
        this.patent.set('mainCategoryNumber', this._PatentMainCategoryNumber.getValue());
        this.patent.set('allCategoryNumber', this._PatentAllCategoryNumber.getValue());
    }
    
    this.clearParams = function(){
        this._ApplicationTime.reset();
        this._AuthorizedTime.reset();
        this._LawStateTime.reset();
        this._College.reset();
        this._PatentCategory.reset();
        this._fieldIntroduction.reset();
        this._patentLevel.reset();
        this._fieldRemark.reset();
        this._PatentAgency.reset();
        
        this._PatentMainCategoryNumber.reset();
        this._PatentAllCategoryNumber.reset();
    }
    
    this._ValidateTime = function(){
        var result = true;
        if (this._AuthorizedTime.getValue() && this._ApplicationTime.getValue()) {
            result = (this._ApplicationTime.getValue() < this._AuthorizedTime.getValue()) && result;
            if (this._ApplicationTime.getValue() >= this._AuthorizedTime.getValue()) {
                Ext.Msg.show({
                    title: '您输入的时间有错误',
                    msg: '申请时间应早于授权时间，请重新输入。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        }
        
        if (this._LawStateTime.getValue() && this._ApplicationTime.getValue()) {
            result = (this._ApplicationTime.getValue() < this._LawStateTime.getValue()) && result;
            if (this._ApplicationTime.getValue() >= this._LawStateTime.getValue()) {
                Ext.Msg.show({
                    title: '您输入的时间有错误',
                    msg: '申请时间应早于法律状态时间，请重新输入。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        }
        
        return result;
    }
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._ValidateTime() && result;
        
        return result;
    }
}
Ext.extend(Srims.patents.PatentEditWindow_BasicPanel, Ext.FormPanel);




