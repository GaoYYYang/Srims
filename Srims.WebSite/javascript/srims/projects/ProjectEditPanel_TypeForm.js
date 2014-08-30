
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_TypeForm = function(project) {

    this._project = project;

    this._comboBoxRank = new Srims.component.EntityComboBox({
        fieldLabel: '项目级别',
        store: new Srims.type.ProjectRankStore(Srims.service.type.ProjectRankService + '/GetVerticalRanksForEdit'),
        displayField: 'name',
        value: project.get('rankName'),
        entityId: project.get('rankId'),
        editable: false,
        allowBlank: false,
        width: 160,
        listWidth: 160
    });
    this._comboBoxType = new Srims.component.EntityComboBox({
        fieldLabel: '项目类型',
        mode: 'local',
        store: new Srims.type.ProjectTypeStore(Srims.service.type.ProjectTypeService + '/GetForEdit'),
        displayField: 'name',
        value: project.get('typeName'),
        entityId: project.get('typeId'),
        editable: false,
        allowBlank: false,
        width: 300,
        listWidth: 300
    });
    this._comboBoxSupportCategory = new Srims.component.EntityComboBox({
        fieldLabel: '资助类别',
        mode: 'local',
        store: new Srims.type.ProjectSupportCategoryStore(),
        displayField: 'name',
        value: project.get('supportCategoryName'),
        entityId: project.get('supportCategoryId'),
        editable: true,
        width: 160,
        hidden: project.get('isHorizontal'),
        hideLabel: project.get('isHorizontal'),
        listWidth: 160
    });
    this._comboBoxSupportField = new Srims.component.EntityComboBox({
        fieldLabel: '资助领域',
        mode: 'local',
        store: new Srims.type.ProjectSupportFieldStore(),
        displayField: 'name',
        value: project.get('supportFieldName'),
        entityId: project.get('supportFieldId'),
        editable: true,
        width: 160,
        hidden: project.get('isHorizontal'),
        hideLabel: project.get('isHorizontal'),
        listWidth: 160
    });
    this._comboBoxSupportSubField = new Srims.component.EntityComboBox({
        fieldLabel: '资助子领域',
        id: '1',
        mode: 'local',
        store: new Srims.type.ProjectSupportSubFieldStore(),
        displayField: 'name',
        value: project.get('supportSubFieldName'),
        entityId: project.get('supportSubFieldId'),
        editable: true,
        hidden: project.get('isHorizontal'),
        hideLabel: project.get('isHorizontal'),
        width: 160,
        listWidth: 160
    });
    var items = [this._comboBoxRank, this._comboBoxType, this._comboBoxSupportCategory, new Ext.Panel({
        widht: 600,
        layout: 'column',
        items: [new Ext.Panel({
            width: 300,
            layout: 'form',
            style: 'width:300px',
            items: [this._comboBoxSupportField]
        }), new Ext.Panel({
            width: 300,
            style: 'width:300px',
            layout: 'form',
            items: [this._comboBoxSupportSubField]
        })]
    })];
    if (project.get('isHorizontal'))
        items.shift();

    Srims.projects.ProjectEditPanel_TypeForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '分类信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: items
    });

    //initial
    this._comboBoxRank.comboBoxType = this._comboBoxType;
    this._comboBoxType.comboBoxSupportCategory = this._comboBoxSupportCategory;
    this._comboBoxType.comboBoxSupportField = this._comboBoxSupportField;
    this._comboBoxSupportField.comboBoxSupportSubField = this._comboBoxSupportSubField;

    if (project.get('rankId')) {
        this._comboBoxType.store.load({
            params: {
                projectRankId: project.get('rankId')
            }
        });
    }
    else
        if (project.get('isHorizontal')) {
        this._comboBoxType.store.proxy.conn.url = Srims.service.type.ProjectTypeService + '/GetHorizontalTypesForEdit';
        this._comboBoxType.store.load();
    }
    else {
        this._comboBoxType.disable();
    }

    if (project.get('typeId')) {
        this._comboBoxSupportCategory.store.load({
            params: {
                projectTypeId: project.get('typeId')
            }
        });
        this._comboBoxSupportField.store.load({
            params: {
                projectTypeId: project.get('typeId')
            }
        });
    }
    else {
        this._comboBoxSupportCategory.disable();
        this._comboBoxSupportField.disable();
    }

    if (project.get('supportFieldId')) {
        this._comboBoxSupportSubField.store.load({
            params: {
                projectSupportFieldId: project.get('supportFieldId')
            }
        });
    }
    else {
        this._comboBoxSupportSubField.disable();
    }

    //method
    this.assginValues = function() {
        this._project.set('rankId', this._comboBoxRank.getValue());
        this._project.set('rankName', this._comboBoxRank.getText());
        this._project.set('typeId', this._comboBoxType.getValue());
        this._project.set('typeName', this._comboBoxType.getText());
        this._project.set('supportCategoryId', this._comboBoxSupportCategory.getValue());
        this._project.set('supportCategoryName', this._comboBoxSupportCategory.getText());
        this._project.set('supportFieldId', this._comboBoxSupportField.getValue());
        this._project.set('supportFieldName', this._comboBoxSupportField.getText());
        this._project.set('supportSubFieldId', this._comboBoxSupportSubField.getValue());
        this._project.set('supportSubFieldName', this._comboBoxSupportSubField.getText());
    }
    this.isValid = function(preventMark) {
        var result = true;

        if (!this._project.get('isHorizontal'))
            result = this._comboBoxRank.isValid(preventMark) && result;

        result = this._comboBoxType.isValid(preventMark) && result;

        return result;
    }

    //event method
    this._onComboBoxRank_select = function(comboBox) {
        var projectRankId = comboBox.getValue();
        var comboBoxType = comboBox.comboBoxType;

        comboBoxType.setValue(undefined);
        if (projectRankId == undefined) {
            comboBoxType.disable();
            comboBoxType.store.removeAll();
        }
        else {
            comboBoxType.enable();
            comboBoxType.store.load({
                params: {
                    projectRankId: projectRankId
                }
            });
        }
        comboBoxType.fireEvent('select', comboBoxType);
    }
    this._onComboBoxType_select = function(comboBox) {
        var projectTypeId = comboBox.getValue();
        var comboBoxSupportCategory = comboBox.comboBoxSupportCategory;
        var comboBoxSupportField = comboBox.comboBoxSupportField;

        comboBoxSupportCategory.setValue(undefined);
        comboBoxSupportField.setValue(undefined);

        if (projectTypeId == undefined) {
            comboBoxSupportCategory.disable();
            comboBoxSupportCategory.store.removeAll();

            comboBoxSupportField.disable();
            comboBoxSupportField.store.removeAll();
        }
        else {
            comboBoxSupportCategory.enable();
            comboBoxSupportCategory.store.load({
                params: {
                    projectTypeId: projectTypeId
                }
            });

            comboBoxSupportField.enable();
            comboBoxSupportField.store.load({
                params: {
                    projectTypeId: projectTypeId
                }
            });

        }
        comboBoxSupportField.fireEvent('select', comboBoxSupportField);
    }
    this._onComboBoxSupportField_select = function(comboBox) {
        var projectSupportFieldId = comboBox.getValue();
        var comboBoxSupportSubField = comboBox.comboBoxSupportSubField;

        comboBoxSupportSubField.setValue(undefined);
        if (projectSupportFieldId == undefined) {
            comboBoxSupportSubField.disable();
            comboBoxSupportSubField.store.removeAll();
        }
        else {
            comboBoxSupportSubField.enable();
            comboBoxSupportSubField.store.load({
                params: {
                    projectSupportFieldId: projectSupportFieldId
                }
            });
        }
    }

    //event
    this._comboBoxRank.on('select', this._onComboBoxRank_select);
    this._comboBoxType.on('select', this._onComboBoxType_select);
    this._comboBoxSupportField.on('select', this._onComboBoxSupportField_select);
    this._comboBoxSupportField.on('change', function(comboBox) {
        comboBox.fireEvent('select', comboBox);
    });
    //初始化
    this._initial = function(project) {
        if (project.get('rankId')) {
            this._comboBoxType.store.load({
                params: {
                    projectRankId: project.get('rankId')
                }
            });
        }
        else
            if (project.get('isHorizontal')) {
            this._comboBoxType.store.proxy.conn.url = Srims.service.type.ProjectTypeService + '/GetHorizontalTypesForEdit';
            this._comboBoxType.store.load();
        }
        else {
            this._comboBoxType.disable();
        }

        if (project.get('typeId')) {
            this._comboBoxSupportCategory.store.load({
                params: {
                    projectTypeId: project.get('typeId')
                }
            });
            this._comboBoxSupportField.store.load({
                params: {
                    projectTypeId: project.get('typeId')
                }
            });
        }
        else {
            this._comboBoxSupportCategory.disable();
            this._comboBoxSupportField.disable();
        }

        if (project.get('supportFieldId')) {
            this._comboBoxSupportSubField.store.load({
                params: {
                    projectSupportFieldId: project.get('supportFieldId')
                }
            });
        }
        else {
            this._comboBoxSupportSubField.disable();
        }

    }
    //刷新
    this._resetFormPanel = function(project) {
        this._project = project;

        this._comboBoxRank.setValue(project.get('rankName'));
        this._comboBoxRank.setSelectEntityId(project.get('rankId'));
        this._comboBoxType.setValue(project.get('typeName'));
        this._comboBoxType.setSelectEntityId(project.get('typeId'));
        this._comboBoxSupportCategory.setValue(project.get('supportCategoryName'));
        this._comboBoxSupportCategory.setSelectEntityId(project.get('supportCategoryId'));
        this._comboBoxSupportField.setValue(project.get('supportFieldName'));
        this._comboBoxSupportField.setSelectEntityId(project.get('supportFieldId'));
        this._comboBoxSupportSubField.setValue(project.get('supportSubFieldName'));
        this._comboBoxSupportSubField.setSelectEntityId(project.get('supportSubFieldId'));

        this._initial(project);
    }
}
Ext.extend(Srims.projects.ProjectEditPanel_TypeForm, Ext.form.FormPanel);
