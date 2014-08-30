if (!Srims.projects)
	Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_BasicForm = function(project) {

    this._project = project;
    this._user = Srims.currentLoginLog.user;
    this._userIsExpert = this._user.userRoleType == 'Expert';
    this._hasSecondCollege = this._user.hasSecondCollege;

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '项目名称',
        value: project.get('name'),
        allowBlank: false,
        width: 480
    });
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        value: project.get('number'),
        disabled: project.get('isHorizontal'),
        hidden: this._userIsExpert && project.get('isHorizontal'),
        hideLabel: this._userIsExpert && project.get('isHorizontal'),
        width: 160
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密',
        checked: project.get('isSecret'),
        hidden: this._userIsExpert,
        hideLabel: this._userIsExpert,
        disabled: !Srims.currentUser.hasPermission_AddSecretProject
    });
    this._comboBoxPrincipal = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '项目负责人',
        value: !project.isNew() ? project.get('principal') : this._userIsExpert ? this._user.name : project.get('principal'),
        selectEntityId: !project.isNew() ? project.get('principalId') : this._userIsExpert ? this._user.expertId : project.get('principalId'),
        allowBlank: false,
        disabled: this._userIsExpert,
        hidden: this._userIsExpert,
        hideLabel: this._userIsExpert,
        width: 160
    });
    this._checkboxIsSecondCollege = new Ext.form.Checkbox({
        fieldLabel: '双聘单位',
        checked: project.get('isPrincipalSecondCollege')
        //disabled: this._userIsExpert ? (this._hasSecondCollege ? false : true) : true
    });

    this._comboBoxPrincipalDelegate = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '委托负责人',
        value: project.get('principalDelegate'),
        selectEntityId: project.get('principalDelegateId'),
        hidden: this._userIsExpert,
        hideLabel: this._userIsExpert,
        width: 160
    });
    this._comboBoxLevel = new Ext.form.ComboBox({
        fieldLabel: '项目级别',
        value: project.get('level'),
        store: Srims.projects.projectLevelStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        disabled: project.get('isHorizontal'),
        allowBlank: false,
        listWidth: 160,
        hidden: this._userIsExpert && project.get('isHorizontal'),
        hideLabel: this._userIsExpert && project.get('isHorizontal'),
        width: 160
    });
    this._comboBoxState = new Ext.form.ComboBox({
        fieldLabel: '项目状态',
        value: project.isNew() ? (Srims.currentUser.userRoleType == Srims.users.UserRoleType.Administrator ? Srims.projects.ProjectState.ProjectProcessing : Srims.projects.ProjectState.WaitingStartInformation) : project.get('state'),
        store: Srims.projects.projectStateEditStore,
        disabled: Srims.currentUser.userRoleType != Srims.users.UserRoleType.Administrator,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        listWidth: 160,
        hidden: this._userIsExpert && project.get('isHorizontal'),
        hideLabel: this._userIsExpert && project.get('isHorizontal'),
        width: 160
    });
    this._comboBoxResearchType = new Srims.component.NoticeTextComboBox({
        fieldLabel: '研究类型',
        value: project.get('researchType'),
        noticeTextType: 'ProjectResearchType',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._comboBoxCooperationType = new Srims.component.NoticeTextComboBox({
        fieldLabel: '合作类型',
        noticeTextType: 'ProjectCooperationType',
        value: project.get('cooperationType'),
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._dateFieldStartDate = new Ext.form.DateField({
        fieldLabel: '开始时间',
        value: project.get('startDate'),
        maxValue: project.get('endDate'),
        allowBlank: false,
        width: 160
    });
    this._dateFieldEndDate = new Ext.form.DateField({
        fieldLabel: '结束时间',
        value: project.get('endDate'),
        minValue: project.get('startDate'),
        allowBlank: false,
        width: 160
    });
    this._comboBoxFirstLevelSubject = new Srims.component.EntityComboBox({
        fieldLabel: '一级学科',
        editable: true,
        store: new Srims.common.SubjectFirstLevelStoreForApply(),
        displayField: 'name',
        value: project.get('firstLevelSubjectName'),
        entityId: project.get('firstLevelSubjectId'),
        allowBlank: this._userIsExpert ? false : true,
        width: 160
    });
    this._comboBoxSecondLevelSubject = new Srims.component.EntityComboBox({
        fieldLabel: '二级学科',
        mode: 'local',
        editable: true,
        store: new Srims.common.SubjectSecondLevelStoreForApply(),
        displayField: 'name',
        value: project.get('secondLevelSubjectName'),
        entityId: project.get('secondLevelSubjectId'),
        allowBlank: this._userIsExpert ? false : true,
        width: 160
    });
    this._comboBoxBase = new Srims.component.EntityComboBox({
        fieldLabel: '所属基地',
        editable: true,
        store: new Srims.bases.BaseStore(Srims.service.bases.BaseService + '/GetForShow', {}),
        displayField: 'name',
        value: project.get('baseName'),
        entityId: project.get('baseId'),
        width: 300,
        listWidth: 300
    });
    this._textFieldTaskComingFrom = new Ext.form.TextField({
        fieldLabel: '委托单位',
        value: project.get('taskComingFrom'),
        allowBlank:false,
        width: 160
    });
    //取得所在省份或城市
    this._getProvinceOrCity = function(project, index) {
        var project_taskCorporationPlace = project.get('corporationPlace');
        if (project_taskCorporationPlace != undefined && project_taskCorporationPlace.toString().trim() != '')
            project_taskCorporationPlace = project_taskCorporationPlace.split(' ')[index];
        else
            project_taskCorporationPlace = undefined;
        return project_taskCorporationPlace
    }
    var project_taskCorporationPlace_province = this._getProvinceOrCity(project, 0);
    this._comboBoxTaskCorporationPlace_Province = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        value: project_taskCorporationPlace_province,
        store: Provinces,
        allowBlank: false,
        editable: false,
        triggerAction: 'all',
        width: 65
    });
    var project_taskCorporationPlace_city = this._getProvinceOrCity(project, 1);
    this._comboBoxTaskCorporationPlace_City = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        hideLabel: true,
        value: project_taskCorporationPlace_city,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: project_taskCorporationPlace_province == undefined ? new Array() : Provinces.getCities(project_taskCorporationPlace_province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: false,
        editable: false,
        mode: 'local',
        triggerAction: 'all',
        width: 65
    });

    this.columnOneItems = [this._textFieldNumber, this._comboBoxPrincipal, this._comboBoxPrincipalDelegate, this._comboBoxLevel, this._comboBoxResearchType, this._dateFieldStartDate, this._comboBoxFirstLevelSubject];
    this.columnTwoItems = [this._checkboxIsSecret, this._checkboxIsSecondCollege, this._comboBoxState, this._comboBoxCooperationType, this._dateFieldEndDate, this._comboBoxSecondLevelSubject]

    if (project.get('isHorizontal')) {
        this.columnOneItems[this.columnOneItems.length] = this._textFieldTaskComingFrom;
        this.columnTwoItems[this.columnTwoItems.length] = new Ext.Panel({
            widht: 300,
            layout: 'column',
            items: [new Ext.Panel({
                width: 180,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Province
            }), new Ext.Panel({
                width: 80,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_City
            })]
        })
    }

    Srims.projects.ProjectEditPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: this.columnOneItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: this.columnTwoItems
            })]
        }), this._comboBoxBase]
    });

    //刷新学科的初始联动
    this._resetSubject = function(project) {
        if (project.get('firstLevelSubjectId') != undefined && project.get('firstLevelSubjectId') != '') {
            this._comboBoxSecondLevelSubject.store.load({
                params: {
                    firstLevelSubjectId: project.get('firstLevelSubjectId')
                }
            });
        } else
            this._comboBoxSecondLevelSubject.disable();
    }
    //学科的级联选择
    this._comboBoxFirstLevelSubject.comboBoxSecondLevelSubject = this._comboBoxSecondLevelSubject;
    this._resetSubject(project);

    //开始时间和结束之间之间的关联
    this._dateFieldStartDate.dateFieldEndDate = this._dateFieldEndDate;
    this._dateFieldEndDate.dateFieldStartDate = this._dateFieldStartDate;

    //城市之间的联动
    this._comboBoxTaskCorporationPlace_Province.comboBoxTaskCorporationPlace_City = this._comboBoxTaskCorporationPlace_City;

    //method
    this.assginValues = function() {
        this._project.set('name', this._textFieldName.getValue());
        this._project.set('number', this._textFieldNumber.getValue());
        this._project.set('state', this._comboBoxState.getValue());
        this._project.set('number', this._textFieldNumber.getValue());
        this._project.set('principal', this._comboBoxPrincipal.getText());
        this._project.set('isPrincipalSecondCollege', this._checkboxIsSecondCollege.getValue());
        this._project.set('principalId', this._comboBoxPrincipal.getValue());
        this._project.set('level', this._comboBoxLevel.getValue());
        this._project.set('firstLevelSubjectId', this._comboBoxFirstLevelSubject.getValue());
        this._project.set('firstLevelSubjectName', this._comboBoxFirstLevelSubject.getText());
        this._project.set('secondLevelSubjectId', this._comboBoxSecondLevelSubject.getValue());
        this._project.set('secondLevelSubjectName', this._comboBoxSecondLevelSubject.getText());
        this._project.set('researchType', this._comboBoxResearchType.getValue());
        this._project.set('cooperationType', this._comboBoxCooperationType.getValue());
        this._project.set('startDate', this._dateFieldStartDate.getValue());
        this._project.set('endDate', this._dateFieldEndDate.getValue());
        this._project.set('isSecret', this._checkboxIsSecret.getValue());
        this._project.set('baseId', this._comboBoxBase.getValue());
        this._project.set('baseName', this._comboBoxBase.getText());
        this._project.set('principalDelegate', this._comboBoxPrincipalDelegate.getText());
        this._project.set('principalDelegateId', this._comboBoxPrincipalDelegate.getValue());
        this._project.set('subjectName', this._comboBoxFirstLevelSubject.getText());
        if (this._comboBoxSecondLevelSubject.getValue() != undefined)
            this._project.set('subjectName', this._comboBoxFirstLevelSubject.getText() + ' - ' + this._comboBoxSecondLevelSubject.getText());

        if (this._project.get('isHorizontal')) {
            this._project.set('corporationPlace', this._comboBoxTaskCorporationPlace_Province.getValue() + ' ' + this._comboBoxTaskCorporationPlace_City.getValue());
            this._project.set('taskComingFrom', this._textFieldTaskComingFrom.getValue());
        }
    }
    this.isValid = function(preventMark) {

        var result = true;
        if (project.get('isHorizontal')) {
            result = this._textFieldName.isValid(preventMark) && result;
            result = this._comboBoxPrincipal.isValid(preventMark) && result;
            result = this._comboBoxResearchType.isValid(preventMark) && result;
            result = this._comboBoxCooperationType.isValid(preventMark) && result;
            result = this._comboBoxTaskCorporationPlace_Province.isValid(preventMark) && result;
            result = this._comboBoxTaskCorporationPlace_City.isValid(preventMark) && result;
            result = this._textFieldTaskComingFrom.isValid(preventMark) && result;
        }
        else {
            result = this._textFieldName.isValid(preventMark) && result;
            result = this._textFieldNumber.isValid(preventMark) && result;
            result = this._checkboxIsSecret.isValid(preventMark) && result;
            result = this._comboBoxPrincipal.isValid(preventMark) && result;
            result = this._comboBoxPrincipalDelegate.isValid(preventMark) && result;
            result = this._comboBoxLevel.isValid(preventMark) && result;
            result = this._comboBoxState.isValid(preventMark) && result;
            result = this._comboBoxResearchType.isValid(preventMark) && result;
            result = this._comboBoxCooperationType.isValid(preventMark) && result;
            result = this._dateFieldStartDate.isValid(preventMark) && result;
            result = this._dateFieldEndDate.isValid(preventMark) && result;
            result = this._comboBoxFirstLevelSubject.isValid(preventMark) && result;
            result = this._comboBoxSecondLevelSubject.isValid(preventMark) && result;
            result = this._comboBoxBase.isValid(preventMark) && result;

        }
        return result;
    }
    //event method
    this.onComboBoxFirstLevelSubject_Select = function(comboBox) {
        //处理学科的联动
        var firstLevelSubjectId = comboBox.getValue();
        var comboBoxSecondLevelSubject = comboBox.comboBoxSecondLevelSubject;

        if (firstLevelSubjectId == undefined) {
            return;
        }

        comboBoxSecondLevelSubject.enable();
        comboBoxSecondLevelSubject.setValue(undefined);
        comboBoxSecondLevelSubject.store.load({
            params: {
                firstLevelSubjectId: firstLevelSubjectId
            }
        });
    }
    this.onComboBoxFirstLevelSubject_Change = function(comboBox) {
        //处理一级学科为空的情况
        var firstLevelSubjectId = comboBox.getValue();
        var comboBoxSecondLevelSubject = comboBox.comboBoxSecondLevelSubject;

        if (firstLevelSubjectId != undefined) {
            return;
        }

        comboBoxSecondLevelSubject.disable();
        comboBoxSecondLevelSubject.setValue(undefined);
        comboBoxSecondLevelSubject.store.removeAll();
    }
    this.onComboBoxTaskCorporationPlace_Province_Select = function(comboBox) {
        var province = comboBox.getValue();
        var comboBoxTaskCorporationPlace_City = comboBox.comboBoxTaskCorporationPlace_City;
        var cityStore = comboBoxTaskCorporationPlace_City.store;
        var cities = Provinces.getCities(province);

        cityStore.loadData(cities);

        if (cityStore.getCount() == 1) {
            comboBoxTaskCorporationPlace_City.setValue(cities[0][0]);
        } else {
            comboBoxTaskCorporationPlace_City.setValue(undefined);
        }
    }
    //event
    this._comboBoxFirstLevelSubject.on('select', this.onComboBoxFirstLevelSubject_Select);
    this._comboBoxFirstLevelSubject.on('change', this.onComboBoxFirstLevelSubject_Change);

    this._comboBoxPrincipal.checkboxIsSecondCollege = this._checkboxIsSecondCollege;
    this.comboBoxPrincipal_Change = function(comboBox) {
        //处理专家变化
        var expertSecondCollege = comboBox.getEntity().get('college2');
        if (expertSecondCollege != '') {
            comboBox.checkboxIsSecondCollege.setDisabled(false);
        };
    }
    this._comboBoxPrincipal.on('select', this.comboBoxPrincipal_Change);

    this._comboBoxTaskCorporationPlace_Province.on('select', this.onComboBoxTaskCorporationPlace_Province_Select);

    this._dateFieldStartDate.on('change', function(dataField, newValue) {
        dataField.dateFieldEndDate.setMinValue(newValue);
    });
    this._dateFieldEndDate.on('change', function(dataField, newValue) {
        dataField.dateFieldStartDate.setMaxValue(newValue);
    });
    //刷新
    this._resetFormPanel = function(project) {
        this._project = project;
        this._textFieldName.setValue(project.get('name'));
        this._comboBoxResearchType.setValue(project.get('researchType'));
        this._comboBoxCooperationType.setValue(project.get('cooperationType'));

        this._dateFieldStartDate.setValue(project.get('startDate'));
        this._dateFieldStartDate.setMaxValue(project.get('endDate'));
        this._dateFieldEndDate.setValue(project.get('endDate'));
        this._dateFieldEndDate.setMinValue(project.get('startDate'));
        this._textFieldTaskComingFrom.setValue(project.get('taskComingFrom'));

        this._comboBoxFirstLevelSubject.setValue(project.get('firstLevelSubjectName'));
        this._comboBoxFirstLevelSubject.setSelectEntityId(project.get('firstLevelSubjectId'));
        this._comboBoxSecondLevelSubject.setValue(project.get('secondLevelSubjectName'));
        this._comboBoxSecondLevelSubject.setSelectEntityId(project.get('secondLevelSubjectId'));
        this._comboBoxBase.setValue(project.get('baseName'));
        this._comboBoxBase.setSelectEntityId(project.get('baseId'));

        this._textFieldNumber.setValue(project.get('number'));
        this._checkboxIsSecret.setValue(project.get('isSecret'));
        this._comboBoxLevel.setValue(project.get('level'));
        this._comboBoxState.setValue(project.isNew() ? (Srims.currentUser.userRoleType == Srims.users.UserRoleType.Administrator ? Srims.projects.ProjectState.ProjectProcessing : Srims.projects.ProjectState.WaitingStartInformation) : project.get('state'));

        this._comboBoxPrincipal.setValue(!project.isNew() ? project.get('principal') : this._userIsExpert ? this._user.name : project.get('principal'));
        this._checkboxIsSecondCollege.setValue(project.get('IsPrincipalSecondCollege'));
        this._comboBoxPrincipal.setSelectEntityId(!project.isNew() ? project.get('principalId') : this._userIsExpert ? this._user.expertId : project.get('principalId'));
        this._comboBoxPrincipalDelegate.setValue(project.get('principalDelegate'));
        this._comboBoxPrincipalDelegate.setSelectEntityId(project.get('principalDelegateId'));

        var project_taskCorporationPlace_province = this._getProvinceOrCity(project, 0);
        this._comboBoxTaskCorporationPlace_Province.setValue(project_taskCorporationPlace_province);
        var project_taskCorporationPlace_city = this._getProvinceOrCity(project, 1);
        this._comboBoxTaskCorporationPlace_City.setValue(project_taskCorporationPlace_city);

        this._resetSubject(project);
    }
}
Ext.extend(Srims.projects.ProjectEditPanel_BasicForm, Ext.form.FormPanel);