
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevel = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}]);
Srims.data.Entity.apply(Srims.common.SubjectFirstLevel);

Srims.common.SubjectFirstLevelStoreForApply = function(){
    Srims.common.SubjectFirstLevelStoreForApply.superclass.constructor.call(this, {
        url: Srims.service.common.SubjectService + '/GetSubjectFirstLevel',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            id: 'ID'
        }, Srims.common.SubjectFirstLevel)
    });
}
Ext.extend(Srims.common.SubjectFirstLevelStoreForApply, Ext.data.Store);

Srims.common.SubjectSecondLevel = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'childCode',
    type: 'string',
    mapping: 'ChildCode'
}, {
    name: 'subjectFirstLevelId',
    type: 'string',
    mapping: 'SubjectFirstLevelID'
}, {
    name: 'subjectFirstLevelName',
    type: 'string',
    mapping: 'SubjectFirstLevelName'
}]);
Srims.data.Entity.apply(Srims.common.SubjectSecondLevel);

Srims.common.SubjectSecondLevelStoreForApply = function(){
    Srims.common.SubjectSecondLevelStoreForApply.superclass.constructor.call(this, {
        url: Srims.service.common.SubjectService + '/GetSubjectSecondLevel',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            id: 'ID'
        }, Srims.common.SubjectSecondLevel),
        autoLoad: false
    });
}
Ext.extend(Srims.common.SubjectSecondLevelStoreForApply, Ext.data.Store);

Srims.emailAction = function(){
};

Srims.emailAction.sendEmail = function(emails){
    if (emails.length == 0) {
        Ext.Msg.show({
            title: '发送邮件错误',
            msg: '您没有选择收件人',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    
    var windowId = 'SendEmialWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.component.EmailEditWindow(windowId, '发送邮件', 'icon-email', emails);
    }
    window.show();
};
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleType = new function(){
};

Srims.users.UserRoleType.Administrator = 'Administrator';
Srims.users.UserRoleType.Expert = 'Expert';


if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.ProvinceCityPanel = function(fieldLabel, province, city, allowBlank){
    this._fieldLabel = fieldLabel;
    this._province = province;
    this._city = city;
    this._allowBlank = allowBlank;
    
    this._comboBox_Province = new Ext.form.ComboBox({
        fieldLabel: this._fieldLabel,
        store: Provinces,
        allowBlank: true,
        forceSelection: true,
        triggerAction: 'all',
        mode: 'local',
        lazyLoad: false,
        width: 100
    });
    this._comboBox_City = new Ext.form.ComboBox({
        fieldLabel: this._fieldLabel,
        hideLabel: true,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: this._province == undefined ? new Array() : Provinces.getCities(this._province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: true,
        forceSelection: true,
        mode: 'local',
        triggerAction: 'all',
        lazyLoad: false,
        width: 100
    });
    
    this._comboBox_Province.comboBox_City = this._comboBox_City;
    
    this.onComboBox_Province_Select = function(comboBox){
        var province = comboBox.getValue();
        var comboBox_City = comboBox.comboBox_City;
        var cityStore = comboBox_City.store;
        var cities = Provinces.getCities(province);
        
        cityStore.loadData(cities);
        
        if (cityStore.getCount() == 1) {
            comboBox_City.setValue(cities[0][0]);
        }
        else {
            comboBox_City.setValue(undefined);
        }
    };
    this._comboBox_Province.on('select', this.onComboBox_Province_Select);
    Srims.component.ProvinceCityPanel.superclass.constructor.call(this, {
        widht: 300,
        layout: 'column',
        labelWidth: 60,
        items: [new Ext.Panel({
            width: 180,
            labelWidth: 60,
            layout: 'form',
            items: this._comboBox_Province
        }), new Ext.Panel({
            width: 100,
            layout: 'form',
            items: this._comboBox_City
        })]
    });
}
Ext.extend(Srims.component.ProvinceCityPanel, Ext.Panel);

if (!Srims.component) 
    Ext.namespace('Srims.component');
	
Srims.component.EmailEditWindow = function(id, title, iconCls, emails){

    this._buttonCancel = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function(){
            this.window.close();
        }
    });
    this._buttonSend = new Ext.Button({
        minWidth: 80,
        text: '发 送',
        window: this
    });
    this._comboBoxReceiver = new Ext.form.TextArea({
        fieldLabel: '收件人',
        value: emails,
        allowBlank: false,
        width: 500,
        height: 50
    })
    this._textFieldSubject = new Ext.form.TextField({
        fieldLabel: '主题',
        allowBlank: false,
        width: 500
    });
    this._textAreaContent = new Ext.form.TextArea({
        hideLabel: true,
        height: 210,
        allowBlank: false,
        style: 'margin-top:10px',
        width: 555
    });
    Srims.component.EmailEditWindow.superclass.constructor.call(this, {
        id: id,
        title: title,
        iconCls: iconCls,
        labelWidth: 50,
        bodyStyle: 'padding: 10px 0 0 10px',
        width: 600,
        height: 400,
        closeAction: 'close',
        resizable: false,
        layout: 'form',
        items: [this._comboBoxReceiver, this._textFieldSubject, this._textAreaContent],
        buttons: [this._buttonSend, this._buttonCancel]
    });
    //method
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._comboBoxReceiver.isValid(preventMark) && result;
        result = this._textFieldSubject.isValid(preventMark) && result;
        result = this._textAreaContent.isValid(preventMark) && result;
        
        return result;
    }
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.common.EmailService + '/SendEmail',
            params: {
                receiverAddresses: this._comboBoxReceiver.getValue(),
                subject: this._textFieldSubject.getValue(),
                content: this._textAreaContent.getValue()
            },
            scope: this,
            success: function(){
                Ext.Msg.show({
                    title: '邮件发送成功',
                    msg: '已经成功发送邮件',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.close();
            }
        })
    }
    //event
    this._on_buttonSend_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        button.setText('正在发送');
        button.disable();
        
        window.save();
    }
    this._buttonSend.on('click', this._on_buttonSend_Click);
}
Ext.extend(Srims.component.EmailEditWindow, Ext.Window);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.Department = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isCollege',
    type: 'boolean',
    mapping: 'IsCollege',
    convert: Boolean.TureOrFalseToYesOrNo
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
},{
    name: 'haspermissin_Add',
    type: 'boolean',
    mapping: 'Haspermissin_Add',
    convert: Boolean.toBoolean
},{
    name: 'canadd',
    type: 'boolean',
    mapping: 'Canadd',
    convert: Boolean.toBoolean
},{
    name: 'haspermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.experts.Department);


if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.DepartmentStore.superclass.constructor.call(this, new Srims.experts.DepartmentXmlReader(), load_url, params);
    }
});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.DepartmentXmlReader.superclass.constructor.call(this, Srims.experts.Department);
    }
});

if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.Base = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'academyDirectorID',
    type: 'int',
    mapping: 'AcademyDirectorID'
}, {
    name: 'academyDirectorName',
    type: 'string',
    mapping: 'AcademyDirectorName'
}, {
    name: 'address',
    type: 'string',
    mapping: 'Address'
}, {
    name: 'administration',
    type: 'string',
    mapping: 'Administration'
}, {
    name: 'directorID',
    type: 'int',
    mapping: 'DirectorID'
}, {
    name: 'directorName',
    type: 'string',
    mapping: 'DirectorName'
}, {
    name: 'fax',
    type: 'string',
    mapping: 'Fax'
}, {
    name: 'phone',
    type: 'string',
    mapping: 'Phone'
}, {
    name: 'rank',
    type: 'string',
    mapping: 'Rank'
}, {
    name: 'zip',
    type: 'string',
    mapping: 'Zip'
}, {
    name: 'isDirectorSchoolExpert',
    type: 'boolean',
    mapping: 'IsDirectorSchoolExpert',
    convert: Boolean.toBoolean
}, {
    name: 'isAcademyDirectorSchoolExpert',
    type: 'boolean',
    mapping: 'IsAcademyDirectorSchoolExpert',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.bases.Base);

if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.bases.BaseStore.superclass.constructor.call(this, new Srims.bases.BaseXmlReader(), load_url, params);
    }
});

if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.bases.BaseXmlReader.superclass.constructor.call(this, Srims.bases.Base);
    }
});

if (!Srims.type)
	Ext.namespace("Srims.type");

Srims.type.listProjectType = function() {
	Srims.type._listProjectType('ProjectTypeList', '项目分类列表', 'icon-type-list');
}

Srims.type._listProjectType = function(id, name, iconCls) {
	var panelId = 'ProjectTypeGridPanel_' + id;
	var store = undefined;
	var panel = Srims.WorkSpace.active(panelId);
	var queryParams = {};

	if (panel) {
		store = panel.getStore();
		store.load();
	} else {
		store = new Srims.type.ProjectTypeStore(
				Srims.service.type.ProjectTypeService + '/Query', queryParams);
		panel = new Srims.type.ProjectTypeGridPanel(panelId, store, name,
				iconCls, queryParams);
		panel.getStore().load();

		Srims.WorkSpace.addPanel(panel);
	}
}
Srims.type.showProjectTypeQueryWindow = function(id, store, params, gridPanel) {
	var window = Ext.getCmp(id);
	if (!window)
		window = new Srims.type.ProjectTypeQueryWindow(id, store, params);

	gridPanel.queryWindow = window;
	window.show();

	var map = new Ext.KeyMap(id, {
				key : 13,
				fn : function() {
					if (!window.hidden)
						window.query(window._buttonQuery);
				}
			});
}
Srims.type.showProjectType = function(projectType, store) {
	var panelId = "ProjectTypeShowPanel" + projectType.get('id');
	if (Srims.WorkSpace.active(panelId))
		return;
	var panel = new Srims.type.ProjectTypeShowPanel(panelId, projectType, store);
	Srims.WorkSpace.addPanel(panel);
}
Srims.type.newProjectType = function(store) {
	var windowId = 'NewProjectType';
	var window = Ext.getCmp(windowId);
	if (!window) {
		var projectType = new Srims.type.ProjectType({});
		window = new Srims.type.ProjectTypeEditWindow(windowId, projectType,
				store);
	}
	window.show();
}
Srims.type.editProjectType = function(projectType, store) {
	var windowId = 'EditProjectType' + projectType.get('id');
	var window = Ext.getCmp(windowId);
	if (!window)
		window = new Srims.type.ProjectTypeEditWindow(windowId, projectType,
				store);
	window.show();
}
Srims.type.deleteProjectType = function(projectType, store) {
	Ext.MessageBox.confirm('删除项目类型', '你确定要删除这个项目类型吗？', function(buttonId) {
		if (buttonId == 'yes') {
			var params = {};
			params.projectTypeID = projectType.get('id');

			Ext.Ajax.request({
						url : Srims.service.type.ProjectTypeService + '/Delete',
						params : params,
						scope : this,
						success : function() {
							var panelId = "ProjectTypeShowPanel"
									+ projectType.get('id');
							closePanel(panelId);
							var windowId = "EditProjectType"
									+ projectType.get('id');
							closeWindow(windowId);
							store.load();
						}
					});
		}
	}, this);
}
Srims.type.showProjectSupportCategoryManageWindow = function(projectType, store) {
	var windowId = "ProjectSupportCategoryManageWindow" + projectType.get('id');
	var window = Ext.getCmp(windowId);
	if (!window)
		window = new Srims.type.ProjectSupportCategoryManageWindow(windowId,
				projectType, store);
	else
		window._supportCategoryGridPanel.getProjectSupportCategoryStore().load(
				{
					params : {
						projectTypeID : projectType.get('id')
					}
				});
	window.show();
}
Srims.type.newProjectSupportCategory = function(store, projectType,
		projectTypeStore) {
	var windowId = "NewProjectSupportCategory";
	var window = Ext.getCmp(windowId)
	if (!window) {
		var projectSupportCategory = new Srims.type.ProjectSupportCategory({});
		window = new Srims.type.ProjectSupportCategoryEditWindow(windowId,
				projectSupportCategory, projectType, store, projectTypeStore);
	}
	window.show();
}
Srims.type.editProjectSupportCategory = function(projectSupportCategory, store,
		projectType, projectTypeStore) {
	var windowId = "EditProjectSupportCategory"
			+ projectSupportCategory.get('id');
	var window = Ext.getCmp(windowId)
	if (!window)
		window = new Srims.type.ProjectSupportCategoryEditWindow(windowId,
				projectSupportCategory, projectType, store, projectTypeStore);
	window.show();
}
Srims.type.deleteProjectSupportCategory = function(projectSupportCategory,
		store, projectType, projectTypeStore) {
	Ext.MessageBox.confirm('删除项目资助类型', '你确定要删除这个项目资助类型吗？', function(buttonId) {
				if (buttonId == 'yes') {
					var params = {};
					params.projectSupportCategoryID = projectSupportCategory
							.get('id');

					Ext.Ajax.request({
								url : Srims.service.type.ProjectSupportCategoryService
										+ '/Delete',
								params : params,
								scope : this,
								success : function() {
									store.load({
												params : {
													projectTypeID : projectType
															.get('id')
												}
											});
									projectTypeStore.load();
									var panelId = "ProjectTypeShowPanel"
											+ projectType.get('id');
									closePanel(panelId);
									Srims.type.showProjectType(projectType,
											projectTypeStore);
								}
							});
				}
			}, this);
}
Srims.type.showProjectSupportFieldManageWindow = function(projectType, store) {
	var windowId = "ProjectSupportFieldManageWindow" + projectType.get('id');
	var window = Ext.getCmp(windowId);
	if (!window)
		window = new Srims.type.ProjectSupportFieldManageWindow(windowId,
				projectType, store);
	else
		window._supportFieldGridPanel.getProjectSupportFieldStore().load({
					params : {
						projectTypeID : projectType.get('id')
					}
				});
	window.show();
}
Srims.type.newProjectSupportField = function(store, projectType,
		projectTypeStore) {
	var windowId = "NewProjectSupportField";
	var window = Ext.getCmp(windowId)
	if (!window) {
		var projectSupportField = new Srims.type.ProjectSupportField({});
		window = new Srims.type.ProjectSupportFieldEditWindow(windowId,
				projectSupportField, projectType, store, projectTypeStore);
	}
	window.show();
}
Srims.type.editProjectSupportField = function(projectSupportField, store,
		projectType, projectTypeStore) {
	var windowId = "EditProjectSupportField" + projectSupportField.get('id');
	var window = Ext.getCmp(windowId)
	if (!window)
		window = new Srims.type.ProjectSupportFieldEditWindow(windowId,
				projectSupportField, projectType, store, projectTypeStore);
	window.show();
}
Srims.type.deleteProjectSupportField = function(projectSupportField, store,
		projectType, projectTypeStore) {
	Ext.MessageBox.confirm('删除项目资助领域', '你确定要删除这个项目资助领域吗？', function(buttonId) {
		if (buttonId == 'yes') {
			var params = {};
			params.projectSupportFieldID = projectSupportField.get('id');

			Ext.Ajax.request({
				url : Srims.service.type.ProjectSupportFieldService + '/Delete',
				params : params,
				scope : this,
				success : function() {
					store.load({
								params : {
									projectTypeID : projectType.get('id')
								}
							});
					projectTypeStore.load();
					var panelId = "ProjectTypeShowPanel"
							+ projectType.get('id');
					closePanel(panelId);
					var windowId = "ProjectSupportSubFieldManageWindow"
							+ projectSupportField.get('id');
					closeWindow(windowId);
					Srims.type.showProjectType(projectType, projectTypeStore);
				}
			});
		}
	}, this);
}
Srims.type.showProjectSupportSubFieldManageWindow = function(
		projectSupportField, projectSupportFieldStore, projectType,
		projectTypeStore) {
	var windowId = "ProjectSupportSubFieldManageWindow"
			+ projectSupportField.get('id');
	var window = Ext.getCmp(windowId);
	if (!window)
		window = new Srims.type.ProjectSupportSubFieldManageWindow(windowId,
				projectSupportField, projectSupportFieldStore, projectType,
				projectTypeStore);
	else
		window._supportSubFieldGridPanel.getProjectSupportSubFieldStore().load(
				{
					params : {
						projectSupportFieldID : projectSupportField.get('id')
					}
				});
	window.show();
}
Srims.type.newProjectSupportSubField = function(store, projectSupportField,
		projectSupportFieldStore, projectType, projectTypeStore) {
	var windowId = "NewProjectSupportSubField";
	var window = Ext.getCmp(windowId)
	if (!window) {
		var projectSupportSubField = new Srims.type.ProjectSupportSubField({});
		window = new Srims.type.ProjectSupportSubFieldEditWindow(windowId,
				projectSupportSubField, store, projectSupportField,
				projectSupportFieldStore, projectType, projectTypeStore);
	}
	window.show();
}
Srims.type.editProjectSupportSubField = function(projectSupportSubField, store,
		projectSupportField, projectSupportFieldStore, projectType,
		projectTypeStore) {
	var windowId = "EditProjectSupportSubField"
			+ projectSupportSubField.get('id');
	var window = Ext.getCmp(windowId)
	if (!window)
		window = new Srims.type.ProjectSupportSubFieldEditWindow(windowId,
				projectSupportSubField, store, projectSupportField,
				projectSupportFieldStore, projectType, projectTypeStore);
	window.show();
}
Srims.type.deleteProjectSupportSubField = function(projectSupportSubField,
		store, projectSupportField, projectSupportFieldStore, projectType,
		projectTypeStore) {
	Ext.MessageBox.confirm('删除项目资助子领域', '你确定要删除这个项目资助子领域吗？',
			function(buttonId) {
				if (buttonId == 'yes') {
					var params = {};
					params.projectSupportSubFieldID = projectSupportSubField
							.get('id');

					Ext.Ajax.request({
						url : Srims.service.type.ProjectSupportSubFieldService
								+ '/Delete',
						params : params,
						scope : this,
						success : function() {
							store.load({
										params : {
											projectSupportFieldID : projectSupportField
													.get('id')
										}
									});
							projectSupportFieldStore.load({
										params : {
											projectTypeID : projectType
													.get('id')
										}
									});
							projectTypeStore.load();
							var panelId = "ProjectTypeShowPanel"
									+ projectType.get('id');
							closePanel(panelId);
							Srims.type.showProjectType(projectType,
									projectTypeStore);
						}
					});
				}
			}, this);
}
function closePanel(panelId) {
	if (Srims.WorkSpace.active(panelId)) {
		var panel = Ext.getCmp(panelId);
		Srims.WorkSpace.getWorkSpace().remove(panel);
	}
}

function closeWindow(windowId) {
	var window = Ext.getCmp(windowId);
	if (window)
		window.close();
}

Srims.type.showProjectTypeDocumentModelEditWindow = function() {
	var store = new Srims.type.ProjectRankStore(Srims.service.type.ProjectRankService
			+ '/GetAllRanks');

	store.on('load', function() {
		var windowId = 'projectTypeDocumentModelEditWindow';
		var window = Ext.getCmp(windowId);
		if (!window)
			window = new Srims.documents.DocumentModelEditWindow(windowId, this);
		window.show();
	});
	store.load();
}
Srims.type.showDocumentModelManageWindow = function(projectTypeId,
		projectTypeName, isProjectShow) {
	var windowId = 'DocumentModelManageWindow' + projectTypeId;
	var window = Ext.getCmp(windowId);
	if (!window)
		window = new Srims.documents.DocumentModelManageWindow(windowId,
				projectTypeId, projectTypeName, isProjectShow);

	window.show();
}
Srims.type.showUploadDocumentModelWindow = function(projectTypeId, store) {
	var windowId = 'DocumentModelUploadWindow' + projectTypeId;
	var window = Ext.getCmp(windowId);
	if (!window)
		window = new Srims.documents.DocumentModelUploadWindow(windowId,
				projectTypeId, store);
	window.show();
}
Srims.type.downLoadDocumemtModel = function(documentModel) {
	var documentModelResource = documentModel.get('resource');
	Srims.documents.downLoadResource(documentModel.get('resource'),
			'/GetDocumentModel');
}
Srims.type.deleteDocumentModel = function(documentModel, store) {
	Srims.documents.deleteResource(documentModel.get('resource'), documentModel
					.get('id'), Srims.service.documents.DocumentModelService
					+ '/DeleteDocumnetModel', store, '成功删除文档模板', '成功删除文档模板');
}
Srims.type.showImportWindow = function(store) {
	var windowId = 'ProjectSupportFieldImportWindow';
	var window = Ext.getCmp(windowId);

	if (!window)
		window = new Srims.component.ImportWindow(windowId, store,
				Srims.service.type.ProjectSupportFieldService + '/Import',
				'导入项目资助领域数据', false);

	window.show();
}

Srims.type.listManagementFees = function() {
	Srims.type._listManagementFees('ManagementFeesList', '管理费比例管理',
			'icon-type-list');
}

Srims.type._listManagementFees = function(id, name, iconCls) {

	var panelId = 'ManagementFeesGidePanel_' + id;
	var store = undefined;
	var panel = Srims.WorkSpace.active(panelId);
	var queryParams = {};
	if (panel) {
		store = panel.getStore();
		store.load();
	} else {
		store = new Srims.type.ManagementFeesStore(
				Srims.service.type.ManagementFeesService + '/Query',
				queryParams);
		panel = new Srims.type.ManagementFeesGridPanel(panelId, store, name,
				iconCls, queryParams);
		panel.getStore().load();

		Srims.WorkSpace.addPanel(panel);
	}
}

Srims.type.newManagementFee = function(store) {
	var windowId = 'NewManagementFee';
	var window = Ext.getCmp(windowId);
	if (!window) {
		var managementFee = new Srims.type.ManagementFees({});
		// Ext.MessageBox.alert('Test',windowId);
		window = new Srims.type.ManagementFeesEditWindow(windowId,
				managementFee, store);
	}
	window.show();
}

Srims.type.editManagementFee = function(managementFee, store) {
	var windowId = 'EditManagementFee' + managementFee.get('id');
	var window = Ext.getCmp(windowId);
	if (!window)
		window = new Srims.type.ManagementFeesEditWindow(windowId,
				managementFee, store);
	window.show();
}

Srims.type.deleteManagementFee = function(managementFee, store) {
	Ext.MessageBox.confirm('删除管理费收取类别', '你确定要删除这个类别吗？', function(buttonId) {
				if (buttonId == 'yes') {
					var params = {};
					params.managementFeeID = managementFee.get('id');
					Ext.Ajax.request({
								url : Srims.service.type.ManagementFeesService
										+ '/Delete',
								params : params,
								scope : this,
								success : function() {
									var panelId = 'ManagementFeeShowPanel'
											+ managementFee.get('id');
									closePanel(panelId);
									var windowId = 'EditManagementFee'
											+ managementFee.get('id');
									closeWindow(windowId);
									store.load();
								}
							});
				}
			}, this);
}

Srims.type.showManagementFee = function(managementFee, store) {
  var panelId = "ManagementFeeShowPanel" + managementFee.get('id');
  if (Srims.WorkSpace.active(panelId))
    return;
  var panel = new Srims.type.ManagementFeesShowPanel(panelId, managementFee, store);
  Srims.WorkSpace.addPanel(panel);
}
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRank = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}]);
Srims.data.Entity.apply(Srims.type.ProjectRank);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectRankXmlReader.superclass.constructor.call(this, Srims.type.ProjectRank);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.type.ProjectRankStore.superclass.constructor.call(this, new Srims.type.ProjectRankXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectType = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isBudget',
    type: 'boolean',
    mapping: 'IsBudget',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpenseInRate',
    type: 'int',
    mapping: 'OverheadExpenseInRate'
}, {
    name: 'overheadExpenseOutRate',
    type: 'int',
    mapping: 'OverheadExpenseOutRate'
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'administration',
    type: 'string',
    mapping: 'Administration'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'bakCode',
    type: 'string',
    mapping: 'BakCode'
}, {
    name: 'perCode',
    type: 'string',
    mapping: 'PerCode'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'isExploit',
    type: 'boolean',
    mapping: 'IsExploit',
    convert: Boolean.toBoolean
}, {
    name: 'isHorizontalType',
    type: 'boolean',
    mapping: 'IsHorizontalType',
    convert: Boolean.toBoolean
}, {
    name: 'projectComingFrom',
    type: 'string',
    mapping: 'ProjectComingFrom'
}, {
    name: 'projectRankID',
    type: 'int',
    mapping: 'ProjectRankID'
}, {
    name: 'projectRank',
    type: 'string',
    mapping: 'ProjectRank'
}, {
    name: 'subjectNature',
    type: 'string',
    mapping: 'SubjectNatrue'
}, {
	name: 'managementFeesType',
	type: 'string',
	mapping: 'ManagementFeesType'
},{
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageProjectSupportField',
    type: 'boolean',
    mapping: 'HasPermission_ManageProjectSupportField',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageProjectSupportCategory',
    type: 'boolean',
    mapping: 'HasPermission_ManageProjectSupportCategory',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UploadDocumentModel',
    type: 'boolean',
    mapping: 'HasPermission_UploadDocumentModel',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canManageProjectSupportField',
    type: 'boolean',
    mapping: 'CanManageProjectSupportField',
    convert: Boolean.toBoolean
}, {
    name: 'canManageProjectSupportCategory',
    type: 'boolean',
    mapping: 'CanManageProjectSupportCategory',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectType);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectTypeXmlReader.superclass.constructor.call(this, Srims.type.ProjectType);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.type.ProjectTypeStore.superclass.constructor.call(this, new Srims.type.ProjectTypeXmlReader(), load_url, params);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isGetOverheadExpense',
    type: 'boolean',
    mapping: 'IsGetOverheadExpense',
    convert: Boolean.toBoolean
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectSupportCategory);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportCategoryXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportCategory);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportCategoryService + '/Query';
        Srims.type.ProjectSupportCategoryStore.superclass.constructor.call(this, new Srims.type.ProjectSupportCategoryXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportField = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageSubField',
    type: 'boolean',
    mapping: 'HasPermission_ManageSubField',
    convert: Boolean.toBoolean
}, {
    name: 'canManageSubField',
    type: 'boolean',
    mapping: 'CanManageSubField',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectSupportField);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportFieldXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportField);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportFieldService + '/Query';
        Srims.type.ProjectSupportFieldStore.superclass.constructor.call(this, new Srims.type.ProjectSupportFieldXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubField = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'projectSupportField',
    type: 'string',
    mapping: 'ProjectSupportField'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectSupportSubField);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportSubFieldXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportSubField);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportSubFieldService + '/Query';
        Srims.type.ProjectSupportSubFieldStore.superclass.constructor.call(this, new Srims.type.ProjectSupportSubFieldXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Ext.namespace('Srims.type.ProjectSubjectNature');

Srims.type.ProjectSubjectNature.Science = 'Science';
Srims.type.ProjectSubjectNature.Liberal = 'Liberal';


Srims.type.projectSubjectNatureRender = function(value, metadata){
    switch (value) {
        case 'Science':
            return '理工科';
        case 'Liberal':
            return '文科';
        default:
            return '未知';
    }
}
Srims.type.projectSubjectNatureStore = [['Science', '理工科'], ['Liberal', '文科'], ['Unknown', '未知']];
// ManagementFees
if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFees = Ext.data.Record.create([{
			name : 'id',
			type : 'int',
			mapping : 'ID'
		}, {
			name : 'type',
			type : 'string',
			mapping : 'Type'
		}, {
			name : 'fundtotal',
			type : 'int',
			mapping : 'FundTotal'
		}, {
			name : 'fee',
			type : 'int',
			mapping : 'Fee'
		}, {
			name : 'performancepay',
			type : 'int',
			mapping : 'PerformancePay'
		}, {
			name : 'remark',
			type : 'string',
			mapping : 'Remark'
		}]);
Srims.data.Entity.apply(Srims.type.ManagementFees);

Srims.type.GetAllManagementFees = Ext.data.Record.create([{
			name : 'id',
			type : 'string',
			mapping : 'ID'
		}, {
			name : 'value',
			type : 'string',
			mapping : 'Value'
		}]);
Srims.data.Entity.apply(Srims.type.GetAllManagementFees);
if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesStore = Ext.extend(Srims.data.XmlStore, {
			constructor : function(load_url, params) {
				Srims.type.ManagementFeesStore.superclass.constructor.call(
						this, new Srims.type.ManagementFeesXmlReader(),
						load_url, params);
			}
		});

Srims.type.GetManagementFeesStore = Ext.extend(Srims.data.XmlStore, {
			constructor : function(load_url) {
				Srims.type.GetManagementFeesStore.superclass.constructor.call(
						this, new Srims.type.GetManagementFeesXmlReader(),
						load_url)
			}
		});// XmlReader
if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesXmlReader = Ext.extend(Srims.data.XmlReader, {
			constructor : function() {
				Srims.type.ManagementFeesXmlReader.superclass.constructor.call(
						this, Srims.type.ManagementFees);
			}
		});

Srims.type.GetManagementFeesXmlReader = Ext.extend(Srims.data.XmlReader, {
			constructor : function() {
				Srims.type.GetManagementFeesXmlReader.superclass.constructor
						.call(this, Srims.type.GetAllManagementFees)
			}
		});
if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeText = Ext.data.Record.create([{
    name: 'value',
    type: 'string',
    mapping: 'Value'
}, {
    name: 'valueSpell',
    type: 'string',
    mapping: 'ValueSpell'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}]);
Srims.data.Entity.apply(Srims.common.NoticeText);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeTextStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(url, type){
        Srims.common.NoticeTextStore.superclass.constructor.call(this, new Srims.common.NoticeTextXmlReader(), url, {
            type: type
        });
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.NoticeTextXmlReader.superclass.constructor.call(this, Srims.common.NoticeText);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.Document = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'author',
    type: 'string',
    mapping: 'Author'
}, {
    name: 'censor',
    type: 'string',
    mapping: 'Censor'
}, {
    name: 'censorDateTime',
    type: 'date',
    mapping: 'CensorDateTime'
}, {
    name: 'deadline',
    type: 'date',
    mapping: 'Deadline'
}, {
    name: 'isRequire',
    type: 'boolean',
    mapping: 'IsRequire',
    convert: Boolean.toBoolean
}, {
    name: 'documentResource',
    type: 'string',
    mapping: 'DocumentResource'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'submitDateTime',
    type: 'date',
    mapping: 'SubmitDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectIsHorizontal',
    type: 'boolean',
    mapping: 'ProjectIsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.documents.Document);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.DocumentXmlReader.superclass.constructor.call(this, Srims.documents.Document);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.DocumentStore.superclass.constructor.call(this, new Srims.documents.DocumentXmlReader(), load_url, params);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentGridPanel_ColumnModel = function(){
    Srims.documents.DocumentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '文档名称',
        dataIndex: 'name',
        width: 100
    }, {
        header: '状态',
        dataIndex: 'state',
        width: 70,
        renderer: Srims.CensorState.Render
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        width: 110,
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author',
        width: 80
    }, {
        header: '审核人',
        dataIndex: 'censor',
        width: 80
    }, {
        id: 'censorDateTime',
        header: '审核时间',
        dataIndex: 'censorDateTime',
        renderer: Date.render
    }, {
        header: '催缴截止时间',
        dataIndex: 'deadline',
        width: 110,
        renderer: Date.render
    }, {
        header: '是否必须',
        dataIndex: 'isRequire',
        width: 70,
        renderer: Boolean.render
    }])
};

Ext.extend(Srims.documents.DocumentGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentGridPanel = function(project){

    this._project = project;
    
    var load_url = Srims.service.documents.DocumentService + '/GetByProjectID';
    var params = {
        projectId: project.get('id')
    };
    this._store = new Srims.documents.DocumentStore(load_url, params);
    this._columnModel = new Srims.documents.DocumentGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DocumentGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 270;
    
    Srims.documents.DocumentGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.DocumentGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.DocumentGridPanel_ToolBar = function(selection, store, project){

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;
    
    //controls
    this._buttonRequireDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-require-document',
        text: '催缴文档',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.showRequireDocumentWindow(this.project, this.store);
        },
        tooltip: '<b>催缴文档</b>'
    });
    this._buttonSubmitDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传文档',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.uploadDocument(this.project, this.store);
        },
        tooltip: '<b>上传文档</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.downLoadDocument(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的项目文档'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorDocumentPass(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过文档</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.showCensorDocumentRejectWindow(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除文档', '你确定要删除这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.deleteDocument(this.project, this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文档</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目文档列表'
    });
    Srims.documents.DocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonRequireDocument, this._buttonSubmitDocument, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    this._buttonSubmitDocument.setVisible(project.get('hasPermission_EditProjectDoucment'));
    this._buttonSubmitDocument.setDisabled(!project.get('canEdit_ProjectDocument'));
    this._buttonRequireDocument.setVisible(project.get('canRequire_ProjectDocument'));
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        var document = selection.getSelected();
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonDelete.setVisible(document.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!document.get('canDelete'));
        
        buttonShow.setVisible(project.get('hasPermission_ShowProejectDocument'));
        buttonShow.setDisabled(!project.get('canShow_ProjectDocument'));
        
        buttonCensorPass.setVisible(project.get('canCensor_ProjectDocument') && document.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(project.get('canCensor_ProjectDocument') && document.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DocumentGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentCensorGridPanel_ColumnModel = function(){
    Srims.documents.DocumentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '文档名称',
        dataIndex: 'name'
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author'
    }])
};

Ext.extend(Srims.documents.DocumentCensorGridPanel_ColumnModel, Ext.grid.ColumnModel)


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentCensorGridPanel = function(id, title, store, iconCls){

    this._store = store;
    this._columnModel = new Srims.documents.DocumentCensorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DocumentCensorGridPanel_ToolBar(this._selections, this._store)
    
    var params = {};
    
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.documents.DocumentCensorGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.DocumentCensorGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.DocumentCensorGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.downLoadDocument(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的项目文档'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorDocumentPass(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过文档</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.showCensorDocumentRejectWindow(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目文档列表'
    });
    Srims.documents.DocumentCensorGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonShow.setVisible(true);
        buttonCensorPass.setVisible(true);
        buttonCensorReject.setVisible(true);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DocumentCensorGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._documentGridPanel = new Srims.documents.DocumentGridPanel(this._project);
    this._requireMessage = new Srims.documents.DocumentWindow_RequireMessage();
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.documents.DocumentWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目：' + this._project.get('name') + '文档管理',
        iconCls: 'icon-project-contract',
        width: 780,
        height: 380,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._requireMessage, this._documentGridPanel],
        buttons: [this._buttonClose]
    });
    this._documentGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelDocument._store.load();
        //如果用户是专家，刷新专家待提交的文档列表
        var user = Srims.currentLoginLog.user;
        if (user.userRoleType == 'Expert') {
            var panel = Srims.WorkSpace.active('MyUnsubmitDocumentGridPanel');
            if (panel) {
                documentStore = panel.getStore();
                documentStore.load();
            }
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_ExpertUnsubmitDocumentCount);
        }
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.documents.DocumentWindow, Ext.Window, {});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentWindow_RequireMessage = function(){
    Srims.documents.DocumentWindow_RequireMessage.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        html: '<span style="color:#FF0000">注意：如果文档状态是‘未提交’，说明您有被催缴上传的文档，请及时上传！</span>'
    });
}
Ext.extend(Srims.documents.DocumentWindow_RequireMessage, Ext.Panel);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentUploadWindow = function(id, project, store){

    this._id = id;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid(false)) 
                return false;
            
            var saveParams = {
                projectId: window._project.get('id'),
                documentName: window._comboBoxDocumentName.getValue()
            }
            
            window.formPanel = window._formPanelDocument;
            window.store = window._store;
            
            Srims.documents.submitResource(window, saveParams, Srims.service.documents.DocumentService + '/UpLoad', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._project.get('name') + '的文档')
        }
    });
    this._comboBoxDocumentName = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文档名称',
        noticeTextType: 'DocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传文档',
        width: 160,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        
        return result;
    }
    Srims.documents.DocumentUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目文档',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.documents.DocumentUploadWindow, Ext.Window, {})

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentRequireWindow = function(id, project, store){

    this._id = id;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonRequire = new Ext.Button({
        minWidth: 70,
        text: '催缴',
        window: this,
        handler: function(){
            var window = this.window;
            var documentNames = window._checkboxGroupDocumentName.getSelecetedValue();
            if (documentNames.length == 0) {
                Ext.Msg.show({
                    title: '文档名称不能为空',
                    msg: '催缴文档，文档名称不能为空，请指定文档名称',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            if (!window.validate(false)) 
                return;
            
            Ext.Ajax.request({
                url: Srims.service.documents.DocumentService + '/RequireDocument',
                params: {
                    projectId: window._project.get('id'),
                    documentNames: documentNames,
                    deadLine: window._dateFieldDeadLine.getValue() ? window._dateFieldDeadLine.getValue().format("Y-m-d H:i:s") : '',
                    isRequire: window._checkboxIsRequire.getValue()
                },
                success: function(){
                    window._store.load();
                    window.close();
                }
            });
        }
    });
    this._checkboxGroupDocumentName = new Srims.component.CheckBoxGroup({
        fieldLabel: '文档名称',
        columns: 3,
        items: Srims.documents.DocumentRequireWindow.DocumentTypeStore.checkboxGroupItems,
        cls: 'srims-checkboxGroup-documentName',
        allowBlank: false
    });
    this._dateFieldDeadLine = new Ext.form.DateField({
        fieldLabel: '截止日期',
        allowBlank: false,
        width: 150
    });
    this._checkboxIsRequire = new Ext.form.Checkbox({
        fieldLabel: '是否必须'
    });
    
    Srims.documents.DocumentRequireWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '催缴项目文档',
        width: 550,
        labelWidth: 60,
        height: 260,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: new Ext.Panel({
            layout: 'form',
            labelWidth: 60,
            height: 230,
            bodyStyle: 'padding: 10px 0 0 10px',
            frame: true,
            items: [this._checkboxGroupDocumentName, this._dateFieldDeadLine, this._checkboxIsRequire]
        }),
        buttons: [this._buttonRequire, this._buttonClose]
    });
    this.validate = function(preventMark){
        var result = true;
        
        result = this._dateFieldDeadLine.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.documents.DocumentRequireWindow, Ext.Window, {})

Srims.documents.DocumentRequireWindow.DocumentTypeStore = new Srims.data.IDValueRecordStore(Srims.service.documents.DocumentService + "/GetDocumentNames");
Srims.documents.DocumentRequireWindow.DocumentTypeStore.load({
    callback: Srims.documents.DocumentRequireWindow.DocumentTypeStore.buildCheckboxGroupItems
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentCensorRejectWindow = function(id, document, store, isHorizontal){

    this._document = document;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonCensor = new Ext.Button({
        minWidth: 80,
        text: '审核驳回',
        window: this
    });
    
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '驳回理由',
        height: 60,
        width: 240
    });
    
    Srims.documents.DocumentCensorRejectWindow.superclass.constructor.call(this, {
        id: id,
        title: '审核驳回文档：' + this._document.get('name'),
        width: 370,
        autoHeight: true,
        labelWidth: 60,
        bodyStyle: 'padding:10px 10px 20px 10px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });
    
    this.buttonCensor_click = function(button, e){
        var window = this.window;
        var remark = window._textRemark.getValue();
        
        Srims.projects.censorDocumentReject(window._document, store, isHorizontal, remark);
        window.close();
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.documents.DocumentCensorRejectWindow, Ext.Window);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.Contract = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'contractNumber',
    type: 'string',
    mapping: 'ContractNumber'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'author',
    type: 'string',
    mapping: 'Author'
}, {
    name: 'censor',
    type: 'string',
    mapping: 'Censor'
}, {
    name: 'censorDateTime',
    type: 'date',
    mapping: 'CensorDateTime'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'submitDateTime',
    type: 'date',
    mapping: 'SubmitDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectIsHorizontal',
    type: 'boolean',
    mapping: 'ProjectIsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'projectId',
    type: 'int',
    mapping: 'ProjectId'
}, {
    name: 'contractResource',
    type: 'string',
    mapping: 'ContractResource'
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.documents.Contract);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.ContractXmlReader.superclass.constructor.call(this, Srims.documents.Contract);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.ContractStore.superclass.constructor.call(this, new Srims.documents.ContractXmlReader(), load_url, params);
    }
});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractGridPanel = function(project){

    this._project = project;
    
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: project.get('id')
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel(project.get('isHorizontal'));
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.ContractGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    
    Srims.documents.ContractGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.ContractGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.ContractGridPanel_ColumnModel = function(isHorizontal){
    Srims.documents.ContractGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '合同编号',
        dataIndex: 'contractNumber',
        width: 100,
        hidden: !isHorizontal
    }, {
        id: 'type',
        header: '合同类型',
        dataIndex: 'type',
        renderer: Srims.documents.contractTypeRender
    }, {
        header: '状态',
        dataIndex: 'state',
        width: 70,
        renderer: Srims.CensorState.Render
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        width: 110,
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author',
        width: 80
    }, {
        header: '审核人',
        dataIndex: 'censor',
        width: 80
    }, {
        id: 'censorDateTime',
        header: '审核时间',
        dataIndex: 'censorDateTime',
        renderer: Date.render
    }])
};

Ext.extend(Srims.documents.ContractGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.documents)
    Ext.namespace('Srims.documents');
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.documents.ContractGridPanel_ToolBar = function(selection, store, project) {

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传主合同',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            Srims.projects.uploadMainContract(this.project, this.store);
        },
        tooltip: '<b>上传主合同</b>'
    });
    this._buttonSubmitOutContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传外协合同',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            Srims.projects.uploadOutContract(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>上传外协合同</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var contract = this.selection.getSelected();
            Srims.projects.downLoadContract(contract);
        },
        hidden: true,
        tooltip: '<b>查看项目合同</b><br/>查看选中的项目合同'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.MessageBox.confirm('审核通过合同', '你确定要审核通过这个项目合同吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    Srims.projects.censorContractPass(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过项目合同</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.projects.showCensorContractRejectWindow(this.selection.getSelected(), this.store, this.project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回合同</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除合同', '你确定要删除这个合同吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    Srims.projects.deleteContract(this.project, this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除合同</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目合同列表'
    });
    Srims.documents.ContractGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitMainContract, this._buttonSubmitOutContract, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, this._buttonRefresh]
    });

    this._buttonSubmitMainContract.setVisible(project.get('hasPermission_EditProjectContract'));
    this._buttonSubmitMainContract.setDisabled(!project.get('canEdit_ProjectMainContract'));
    this._buttonSubmitOutContract.setVisible(project.get('hasPermission_EditProjectContract'));
    this._buttonSubmitOutContract.setDisabled(!project.get('canEdit_ProjectContract'));

    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    this._selection.buttonSubmitMainContract = this._buttonSubmitMainContract;
    this._selection.project = this._project;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        Ext.Ajax.request({
            url: Srims.service.documents.ContractService + '/GetMainContractByProjectID',
            params: {
                projectId: project.get('id')
            },
            scope: this,
            success: function(response) {
                if (response.responseText == "0")
                    selection.buttonSubmitMainContract.setDisabled(false);

            }
        });

        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        var contract = selection.getSelected();

        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }

        buttonDelete.setVisible(contract.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!contract.get('canDelete'));

        buttonShow.setVisible(project.get('hasPermission_ShowProejectContract'));
        buttonShow.setDisabled(!project.get('canShow_ProjectContract'));

        buttonCensorPass.setVisible(project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    this._store.toolBar = this;
    this._store.on('load', function() {
        var contracts = this.getRange();
        for (var i = 0; i < contracts.length; i++) {
            if (contracts[i].get('type') == Srims.documents.ContractType.MainContract) {
                this.toolBar._buttonSubmitMainContract.setDisabled(true);
                return;
            }
        }
        this.toolBar._buttonSubmitMainContract.setDisabled(!project.get('canEdit_ProjectMainContract'));
    });
}
Ext.extend(Srims.documents.ContractGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._contractGridPanel = new Srims.documents.ContractGridPanel(this._project);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.documents.ContractWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目：' + this._project.get('name') + '合同管理',
        iconCls: 'icon-project-contract',
        width: 700,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._contractGridPanel],
        buttons: [this._buttonClose]
    });
    this._contractGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelContract._store.load();
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.documents.ContractWindow, Ext.Window, {});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Ext.namespace('Srims.documents.ContractType');

Srims.documents.ContractType.MainContract = 'MainContract';
Srims.documents.ContractType.OutContract = 'OutContract';

Srims.documents.contractTypeRender = function(value){
    switch (value) {
        case 'MainContract':
            return '主合同';
        case 'OutContract':
            return '外协合同';
        default:
            return '未知';
    }
}
Srims.documents.contractTypeFilterItems = [{
    id: 'MainContract',
    text: '主合同'
}, {
    id: 'OutContract',
    text: '外协合同'
}];

Srims.documents.contractTypeStore = [['MainContract', '主合同'], ['OutContract', '外协合同']];
Srims.documents.contractTypeEditStore = [['MainContract', '主合同'], ['OutContract', '外协合同']];

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractUploadWindow = function(id, project, store, isMain){

    this._id = id;
    this._project = project;
    this._store = store;
    this._isMain = isMain;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid(false)) 
                return false;
            
            var saveParams = {
                projectId: window._project.get('id'),
                contractType: window._isMain ? Srims.documents.ContractType.MainContract : Srims.documents.ContractType.OutContract
            }
            
            window.formPanel = window._formPanelContract;
            window.store = window._store;
            
            Srims.documents.submitResource(window, saveParams, Srims.service.documents.ContractService + '/UpLoad', '正在上传项目合同', '上传合同成功', '成功上传项目：' + window._project.get('name') + '的合同');
        }
    });
    this._fieldContractType = new Ext.form.Field({
        fieldLabel: '合同类型',
        value: this._isMain ? '主合同' : '外协合同',
        readOnly: true,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadContract',
        fieldLabel: '上传合同',
        width: 160,
        emptyText: '请选择要上传的合同',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelContract = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fieldContractType, this._fileUploadField]
    });
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        
        return result;
    }
    
    Srims.documents.ContractUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目合同',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelContract],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.documents.ContractUploadWindow, Ext.Window, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorRejectWindow = function(id, contract, store, isHorizontal){

    this._contract = contract;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonCensor = new Ext.Button({
        minWidth: 80,
        text: '审核驳回',
        window: this
    });
    
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '驳回理由',
        height: 60,
        width: 240
    });
    
    Srims.documents.ContractCensorRejectWindow.superclass.constructor.call(this, {
        id: id,
        title: '审核驳回项目合同：',
        width: 370,
        autoHeight: true,
        labelWidth: 60,
        bodyStyle: 'padding:10px 10px 20px 10px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });
    
    this.buttonCensor_click = function(button, e){
        var window = this.window;
        var remark = window._textRemark.getValue();
        
        Srims.projects.censorContractReject(window._contract, store, isHorizontal, remark);
        window.close();
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.documents.ContractCensorRejectWindow, Ext.Window);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorGridPanel_ColumnModel = function(){
    Srims.documents.ContractCensorGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '合同类型',
        dataIndex: 'type',
        renderer: Srims.documents.contractTypeRender
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author'
    }])
};

Ext.extend(Srims.documents.ContractCensorGridPanel_ColumnModel, Ext.grid.ColumnModel)


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractCensorGridPanel = function(id, title, store, iconCls){

    this._store = store;
    this._columnModel = new Srims.documents.ContractCensorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.ContractCensorGridPanel_ToolBar(this._selections, this._store)
    
    var params = {};
    
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.documents.ContractCensorGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.ContractCensorGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.ContractCensorGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.downLoadContract(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看合同</b><br/>查看选中的项目合同'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过合同', '你确定要审核通过这个项目合同吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorContractPass(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过合同</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.projects.showCensorContractRejectWindow(this.selection.getSelected(), this.store, this.selection.getSelected().get('projectIsHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回合同</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目合同列表'
    });
    Srims.documents.ContractCensorGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonShow.setVisible(true);
        buttonCensorPass.setVisible(true);
        buttonCensorReject.setVisible(true);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.ContractCensorGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentMyUnsubmitDocumentGridPanel = function(id, title, store, iconCls){

    this._store = store;
    this._columnModel = new Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar(this._selections)
    
    var params = {};
    
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 270;
    
    Srims.documents.DocumentMyUnsubmitDocumentGridPanel.superclass.constructor.call(this, params);
};
Ext.extend(Srims.documents.DocumentMyUnsubmitDocumentGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar = function(selection){

    //fields
    this._selection = selection;
    
    //controls
    this._buttonUpload = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: this.selection.getSelected().get('projectID')
                },
                scope: this,
                success: function(response){
                
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });
                    var project = store.getAt(0);
                    Srims.projects.showDocumentWindow(project);
                }
            });
        },
        hidden: true,
        tooltip: '<b>上传文档</b><br/>进入上传文档页面'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新我未提交的文档列表'
    });
    Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonUpload, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    //initial
    this._selection.buttonUpload = this._buttonUpload;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonUpload = selection.buttonUpload;
        
        if (selection.getCount() == 0) {
            buttonUpload.hide();
            return;
        }
        
        buttonUpload.setVisible(true);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DocumentMyUnsubmitDocumentGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel = function(){
    Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '催缴文档名称',
        dataIndex: 'name'
    }, {
        header: '催缴截止时间',
        dataIndex: 'deadline',
        width: 110,
        renderer: Date.render
    }, {
        header: '是否必须',
        dataIndex: 'isRequire',
        width: 70,
        renderer: Boolean.render
    }])
};

Ext.extend(Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel, Ext.grid.ColumnModel)


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModel = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'resource',
    type: 'string',
    mapping: 'Resource'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.documents.DocumentModel);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.DocumentModelXmlReader.superclass.constructor.call(this, Srims.documents.DocumentModel);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.DocumentModelStore.superclass.constructor.call(this, new Srims.documents.DocumentModelXmlReader(), load_url, params);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelManageWindow = function(id, projectTypeId, projectTypeName, isProjectShow){

    this._id = id;
    this._projectTypeId = projectTypeId;
    this._DocumentModelGridPanel = new Srims.documents.DocumentModelGridPanel(this._projectTypeId, isProjectShow);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.documents.DocumentModelManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectTypeName + '文档模板管理',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._DocumentModelGridPanel],
        buttons: [this._buttonClose]
    });
    
    this._DocumentModelGridPanel.getStore().load();
}
Ext.extend(Srims.documents.DocumentModelManageWindow, Ext.Window, {});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelGridPanel = function(projectTypeId, isProjectShow){

    this._projectTypeId = projectTypeId;
    
    var load_url = Srims.service.documents.DocumentModelService + '/GetByProjectType';
    var params = {
        projectTypeId: projectTypeId
    };
    this._store = new Srims.documents.DocumentModelStore(load_url, params);
    
    this._columnModel = new Srims.documents.DocumentModelGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.DcoumentModelGridPanel_ToolBar(this._selections, this._store, this._projectTypeId, isProjectShow)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 200;
    
    Srims.documents.DocumentModelGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var documentModel = grid.getStore().getAt(rowIndex);
        Srims.type.downLoadDocumemtModel(documentModel);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.DocumentModelGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DcoumentModelGridPanel_ToolBar = function(selection, store, projectTypeId, isProjectShow){

    //fields
    this._selection = selection;
    this._store = store;
    this._projectTypeId = projectTypeId;
    
    //controls
    this._buttonSubmitDocumentModel = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传文档模板',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectTypeId: this._projectTypeId,
        handler: function(){
            Srims.type.showUploadDocumentModelWindow(this.projectTypeId, this.store);
        },
        hidden: isProjectShow,
        tooltip: '<b>上传文档模板</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: isProjectShow ? '下载' : '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.type.downLoadDocumemtModel(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档模板</b><br/>查看选中的项目类型文档模板'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteDocumentModel(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>文档模板</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目类型文档模板列表'
    });
    Srims.documents.DcoumentModelGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitDocumentModel, this._buttonShow, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            return;
        }
        var documentModel = selection.getSelected();
        
        buttonDelete.setVisible(documentModel.get('hasPermission_Delete') && !isProjectShow);
        buttonDelete.setDisabled(!documentModel.get('canDelete'));
        
        buttonShow.setVisible(documentModel.get('hasPermission_Show'));
        buttonShow.setDisabled(!documentModel.get('canShow'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.DcoumentModelGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentModelGridPanel_ColumnModel = function(){
    Srims.documents.DocumentModelGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '文档类型',
        dataIndex: 'name'
    }])
};

Ext.extend(Srims.documents.DocumentModelGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelUploadWindow = function(id, projectTypeId, store){

    this._id = id;
    this._projectTypeId = projectTypeId;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
        
        }
    });
    
    this._comboBoxDocumentName = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文档名称',
        noticeTextType: 'DocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._comboBoxDocumentName.getStore().on('load', function(){
        var outerContract = new Srims.common.NoticeText({
            value: '外协合同'
        });
        this.insert(0, outerContract);
        
        var mainContract = new Srims.common.NoticeText({
            value: '主合同'
        });
        this.insert(0, mainContract);
    })
    
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocumentModel',
        fieldLabel: '上传文档模板',
        width: 160,
        emptyText: '请选择要上传的文档模板',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocumentModel = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    
    Srims.documents.DocumentModelUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传文档模板',
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        height: 170,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocumentModel],
        buttons: [this._buttonUpload, this._buttonClose]
    });
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        result = this._fileUploadField.isValid(preventMark) && result;
        
        return result;
    }
    this._buttonUpload_click = function(){
        var window = this.window;
        
        if (!window.isValid(false)) 
            return;
        
        // this.setText('正在保存');
        // this.disable();
        
        var saveParams = {
            projectTypeId: window._projectTypeId,
            DocumentType: window._comboBoxDocumentName.getValue()
        }
        
        window.formPanel = window._formPanelDocumentModel;
        window.store = window._store;
        
        Srims.documents.submitResource(window, saveParams, Srims.service.documents.DocumentModelService + '/UpLoadDocumentModel', '正在上传文档模板', '上传文档模板成功', '成功上传文档模板');
    }
    this._buttonUpload.window = this;
    this._buttonUpload.on('click', this._buttonUpload_click);
}
Ext.extend(Srims.documents.DocumentModelUploadWindow, Ext.Window, {})

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.GridPanl_VerticalProjectList_ID = 'ProjectGridPanel_VerticalList';
Srims.projects.GridPanl_HorizontalProjectList_ID = 'ProjectGridPanel_HorizontalList';
Srims.projects.GridPanel_WaitingStartCensorVerticalProjectList_ID = 'ProjectGridPanel_VerticalWaitingStartCensorList';
Srims.projects.GridPanel_WaitingEndCensorVericalProjectList_ID = 'ProjectGridPanel_VerticalWaitingEndCensorList';
Srims.projects.GridPanel_WaitingStartCensorHorizontalProjectList_ID = 'ProjectGridPanel_HorizontalWaitingStartCensorList';
Srims.projects.GridPanel_WaitingEndCensorHorizontalProjectList_ID = 'ProjectGridPanel_HorizontalWaitingEndCensorList';
Srims.projects.GridPanel_MyPrincipalProjectList = 'MyPrincipalProjectList';
Srims.projects.GridPanel_MyParticipateProjectList = 'MyParticipateProjectList';
Srims.projects.GridPanel_MyDelegateProjectList = 'MyDelegateProjectList';


Srims.projects.Panel_NewVerticalProject_ID = 'NewVerticalPrjectPanel';
Srims.projects.Panel_NewHorizontalProject_ID = 'NewHorizontalPrjectPanel';

Srims.projects.Panel_ShowProject_ID = 'ProjectShowPanel';

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectLevel');

Srims.projects.ProjectLevel.Perside = 'Perside';
Srims.projects.ProjectLevel.Join = 'Join';
Srims.projects.ProjectLevel.Addition = 'Addition';
Srims.projects.ProjectLevel.Coordinate='Coordinate';

Srims.projects.projectLevelRender = function(value, metadata){
    switch (value) {
        case 'Join':
            return '参与';
        case 'Perside':
            return '主持';
        case 'Addition':
            return '附加';
        case 'Coordinate':
        	return '配套';
        default:
            return '未知';
    }
}
Srims.projects.projectLevelStore = [['Perside', '主持'], ['Join', '参与'], ['Addition', '附加'],['Coordinate','配套']];

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectState');

Srims.projects.ProjectState.WaitingStartInformation = 'WaitingStartInformation';
Srims.projects.ProjectState.WaitingStartCensor = 'WaitingStartCensor';
Srims.projects.ProjectState.ProjectProcessing = 'ProjectProcessing';
Srims.projects.ProjectState.WaitingEndCensor = 'WaitingEndCensor';
Srims.projects.ProjectState.ProjectEnd = 'ProjectEnd';
Srims.projects.ProjectState.ProjectDelete = 'Deleted';
Srims.projects.ProjectState.WithDraw = 'WithDraw';
Srims.projects.ProjectState.Terminate = 'Terminate';

Srims.projects.projectStateRender = function(value, metadata){
    switch (value) {
        case 'WaitingStartInformation':
            return '填写立项信息';
        case 'WaitingStartCensor':
            return '等待立项审核';
        case 'ProjectProcessing':
            return '在研';
        case 'WaitingEndCensor':
            return '等待结项审核';
        case 'ProjectEnd':
            return '已结项';
        case 'WithDraw':
            return '撤销';
        case 'Terminate':
            return '终止';
        case 'Defer':
            return '延期';
        case 'DeferEnd':
            return '延期结题';
        default:
            return '未知';
    }
}
Srims.projects.projectStateFilterItems = [{
    id: 'WaitingStartInformation',
    text: '填写立项信息'
}, {
    id: 'WaitingStartCensor',
    text: '等待立项审核'
}, {
    id: 'ProjectProcessing',
    text: '在研'
}, {
    id: 'WaitingEndCensor',
    text: '等待结项审核'
}, {
    id: 'ProjectEnd',
    text: '已结项'
}, {
    id: 'Defer',
    text: '延期'
}, {
    id: 'DeferEnd',
    text: '延期结题'
}];

Srims.projects.projectStateStore = [['WaitingStartInformation', '填写立项信息'], ['WaitingStartCensor', '等待立项审核'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateEditStore = [['WaitingStartInformation', '填写立项信息'], ['ProjectProcessing', '在研'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateQueryStore = [['WaitingStartInformation', '未提交'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['WithDraw', '撤销'], ['Terminate', '终止'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.Project = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'outsourcingAlreadyAmountString',
    type: 'string',
    mapping: 'OutsourcingAlreadyAmountString'
}, {
    name: 'trueOverheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'TrueOverheadExpensesAlreadyIn'
}, {
    name: 'outsourcingPlanAmountString',
    type: 'string',
    mapping: 'OutsourcingPlanAmountString'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'recoveryvoucherNumber',
    type: 'string',
    mapping: 'RecoveryvoucherNumber'
}, {
    name: 'roverheadExpensesAmount',
    type: 'string',
    mapping: 'RoverheadExpensesAmount'
}, {
    name: 'recoveryAmount',
    type: 'string',
    mapping: 'RecoveryAmount'
}, {
    name: 'rremark',
    type: 'string',
    mapping: 'Rremark'
}, {
    name: 'recoveryPrintState',
    type: 'string',
    mapping: 'RecoveryPrintState'
}, {
    name: 'recoveryPrintDate',
    type: 'string',
    mapping: 'RecoveryPrintDate'
},
{
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'principalNumber',
    type: 'string',
    mapping: 'PrincipalNumber'
}, {
    name: 'principalEmail',
    type: 'string',
    mapping: 'PrincipalEmail'
}, {
    name: 'isPrincipalSecondCollege',
    type: 'string',
    mapping: 'IsPrincipalSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'principalCollege',
    type: 'string',
    mapping: 'PrincipalCollege'
}, {
    name: 'principalId',
    type: 'string',
    mapping: 'PrincipalID'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'subjectName',
    type: 'string',
    mapping: 'SubjectName'
}, {
    name: 'firstLevelSubjectId',
    type: 'string',
    mapping: 'FirstLevelSubjectID'
}, {
    name: 'firstLevelSubjectName',
    type: 'string',
    mapping: 'FirstLevelSubjectName'
}, {
    name: 'secondLevelSubjectId',
    type: 'string',
    mapping: 'SecondLevelSubjectID'
}, {
    name: 'secondLevelSubjectName',
    type: 'string',
    mapping: 'SecondLevelSubjectName'
}, {
    name: 'researchType',
    type: 'string',
    mapping: 'ResearchType'
}, {
    name: 'cooperationType',
    type: 'string',
    mapping: 'CooperationType'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'isSecret',
    type: 'boolean',
    mapping: 'IsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'baseId',
    type: 'string',
    mapping: 'BaseID'
}, {
    name: 'baseName',
    type: 'string',
    mapping: 'BaseName'
}, {
    name: 'principalDelegate',
    type: 'string',
    mapping: 'PrincipalDelegate'
}, {
    name: 'principalDelegateId',
    type: 'string',
    mapping: 'PrincipalDelegateID'
}, {
    name: 'creator',
    type: 'string',
    mapping: 'Creator'
}, {
    name: 'createDate',
    type: 'date',
    mapping: 'CreateDate'
}, {
    name: 'corporationPlace',
    type: 'string',
    mapping: 'CorporationPlace'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'taskComingFrom',
    type: 'string',
    mapping: 'TaskComingFrom'
}, {
    name: 'isHorizontal',
    type: 'boolean',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'rankId',
    type: 'int',
    mapping: 'RankID'
}, {
    name: 'rankName',
    type: 'string',
    mapping: 'RankName'
}, {
    name: 'typeId',
    type: 'int',
    mapping: 'TypeID'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'typeShortName',
    type: 'string',
    mapping: 'TypeShortName'
}, {
    name: 'supportCategoryId',
    type: 'int',
    mapping: 'SupportCategoryID'
}, {
    name: 'supportCategoryName',
    type: 'string',
    mapping: 'SupportCategoryName'
}, {
    name: 'supportFieldId',
    type: 'int',
    mapping: 'SupportFieldID'
}, {
    name: 'supportFieldName',
    type: 'string',
    mapping: 'SupportFieldName'
}, {
    name: 'supportSubFieldId',
    type: 'int',
    mapping: 'SupportSubFieldID'
}, {
    name: 'supportSubFieldName',
    type: 'string',
    mapping: 'SupportSubFieldName'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'fundAlreadyHardware',
    type: 'int',
    mapping: 'FundAlreadyHardware'
}, {
    name: 'fundAlreadyIn',
    type: 'int',
    mapping: 'FundAlreadyIn'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'fundAlreadyTotal',
    type: 'int',
    mapping: 'FundAlreadyTotal'
}, {
    name: 'fundContract',
    type: 'int',
    mapping: 'FundContract'
}, {
    name: 'fundFrom',
    type: 'string',
    mapping: 'FundFrom'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}, {
    name: 'fundPlanHardware',
    type: 'int',
    mapping: 'FundPlanHardware'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'fundPlanIn',
    type: 'int',
    mapping: 'FundPlanIn'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'overheadExpenseInTotal',
    type: 'int',
    mapping: 'OverheadExpenseInTotal'
}, {
    name: 'overheadExpenseOutTotal',
    type: 'int',
    mapping: 'OverheadExpenseOutTotal'
}, {
    name: 'overheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyIn'
}, {
    name: 'overheadExpensesAlreadyOut',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyOut'
}, {
    name: 'overheadExpensesInStandard',
    type: 'int',
    mapping: 'OverheadExpensesInStandard'
}, {
    name: 'performancePayStandard',
    type: 'int',
    mapping: 'PerformancePayStandard'
}, {
    name: 'fundManageProportion',
    type: 'int',
    mapping: 'FundManageProportion'	//国家规定管理费比例
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'//校内绩效工资
}, {
    name: 'performancePayAlready',
    type: 'int',
    mapping: 'PerformancePayAlready'//已分配绩效工资
}, {
    name: 'receivedOverheadExpenses',
    type: 'int',
    mapping: 'ReceivedOverheadExpenses'	//追缴单-已收管理费
}, {
    name: 'overheadExpensesAmount',
    type: 'int',
    mapping: 'OverheadExpensesAmount'	//追缴单-应收管理费
}, {
    name: 'recoveryAmount',
    type: 'int',
    mapping: 'RecoveryAmount'	//追缴金额 
}, {
    name: 'printDateTime',
    type: 'string',
    mapping: 'PrintDateTime'	//追缴单-打印时间
}, {
    name: 'isPrint',
    type: 'string',
    mapping: 'IsPrint'	//追缴单-是否已打印
}, {
    name: 'equipmentCost',
    type: 'int',
    mapping: 'EquipmentCost'
}, {
    name: 'borrowAmount',
    type: 'int',
    mapping: 'BorrowAmount'
}, {
    name: 'returnAmount',
    type: 'int',
    mapping: 'ReturnAmount'
}, {
    name: 'projectAccountNumber',
    type: 'string',
    mapping: 'ProjectAccountNumber'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_WithDraw',
    type: 'boolean',
    mapping: 'HasPermission_WithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'canWithDraw',
    type: 'boolean',
    mapping: 'CanWithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Terminate',
    type: 'boolean',
    mapping: 'HasPermission_Terminate',
    convert: Boolean.toBoolean
}, {
    name: 'canTerminate',
    type: 'boolean',
    mapping: 'CanTerminate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectMember',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMember',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectMember',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectMember',
    type: 'boolean',
    mapping: 'CanShow_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanEdit_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanShow_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectContract',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMainContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMainContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectContract',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectContract',
    type: 'boolean',
    mapping: 'CanShow_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectContract',
    type: 'boolean',
    mapping: 'CanCensor_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectDoucment',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectDoucment',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectDocument',
    type: 'boolean',
    mapping: 'CanEdit_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectDocument',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectDocument',
    type: 'boolean',
    mapping: 'CanShow_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectDocument',
    type: 'boolean',
    mapping: 'CanCensor_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canRequire_ProjectDocument',
    type: 'boolean',
    mapping: 'CanRequire_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitStart',
    type: 'boolean',
    mapping: 'CanSubmitStart',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitEnd',
    type: 'boolean',
    mapping: 'CanSubmitEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoStart',
    type: 'boolean',
    mapping: 'CanUndoStart',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoEnd',
    type: 'boolean',
    mapping: 'CanUndoEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorStart',
    type: 'boolean',
    mapping: 'CanCensorStart',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorEnd',
    type: 'boolean',
    mapping: 'CanCensorEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canSetDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanSetDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanClearDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearProjectAccountBookNumber',
    type: 'boolean',
    mapping: 'CanClearProjectAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canCompleteIn',
    type: 'boolean',
    mapping: 'CanCompleteIn',
    convert: Boolean.toBoolean
}, {
    name: 'campusIndirectCosts',
    type: 'int',
    mapping: 'CampusIndirectCosts'
}, {
    name: 'overheadExpenseMiddleTotal',
    type: 'int',
    mapping: 'OverheadExpenseMiddleTotal'
}, {
    name: 'overheadExpenseExpertTotal',
    type: 'int',
    mapping: 'OverheadExpenseExpertTotal'
}

]);
Srims.data.Entity.apply(Srims.projects.Project);
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectStore.superclass.constructor.call(this, new Srims.projects.ProjectXmlReader(), load_url, params);
    },
});

Srims.projects.ProjectSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectSimpleStore.superclass.constructor.call(this, new Srims.projects.ProjectSimpleXmlReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectXmlReader.superclass.constructor.call(this, Srims.projects.Project);
    },
    readRecords: function(responseXML){
        var result = Srims.projects.ProjectXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.fundSum = parseInt(Ext.DomQuery.selectValue("FundSum", responseXML), 10);
        result.records.fundReceivedSum = parseInt(Ext.DomQuery.selectValue("FundReceivedSum", responseXML), 10);
        
        return result;
    }
});
Srims.projects.ProjectSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectXmlReader.superclass.constructor.call(this, Srims.projects.Project);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryState = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.projects.ProjectHistoryState);


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryStateStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
    
        var load_url = Srims.service.projects.StateHistoryService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.isNew() ? 0 : project.get('id')
        }
        Srims.projects.ProjectHistoryStateStore.superclass.constructor.call(this, new Srims.projects.ProjectHistoryStateXmLReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryStateXmLReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectHistoryStateXmLReader.superclass.constructor.call(this, Srims.projects.ProjectHistoryState);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegatePrincipalWindow = function(id, projects, store){

    this._projects = projects;
    this._store = store;
    this._id = id;
    
    this._helpPanel = new Ext.Panel({
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '提示：<ul style="text-indent:2em"><li>在下面的输入框中输入专家<span style="color: Red;">姓名</span>或专家<span style="color: Red;">姓名首字母缩写</span>查找并选择专家</li></ul>'
    });
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isvalidate(false)) 
                return false;
            Srims.projects.setDeletatePrincipal(window._projects, window._comboBoxExpert.getValue(), window._store);
            window.close();
        }
    });
    
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '委托负责人',
        width: 150,
        itemCls: 'combox-set-delegate',
        allowBlank: false
    });
    
    this.isvalidate = function(preventMark){
        var result = true;
        
        result = this._comboBoxExpert.isValid(preventMark) && result;
        result = this.vidateDelegatePrincipal() && result;
        
        return result;
    }
    this.vidateDelegatePrincipal = function(){
        for (var i = 0; i < this._projects.length; i++) {
            var project = this._projects[i];
            var principalId = project.get('principalId');
            if (principalId == this._comboBoxExpert.getValue()) {
                Ext.Msg.show({
                    title: '指定委托负责人错误',
                    msg: '项目的委托负责人不能是项目的负责人',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return false;
            }
        }
        return true;
    }
    Srims.projects.ProjectSetDelegatePrincipalWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '指定项目委托负责人',
        iconCls: 'icon-set-delegate-principal',
        width: 450,
        labelWidth: 70,
        autoHeight: true,
        modal: true,
        closeAction: 'close',
        deferredRender: false,
        layout: 'form',
        items: [this._helpPanel, this._comboBoxExpert],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.focus = function(){
        this._comboBoxExpert.focus(false, true);
    }
    this.focus();
}
Ext.extend(Srims.projects.ProjectSetDelegatePrincipalWindow, Ext.Window, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectExport_Column = function() {
}

Srims.projects.ProjectExport_Column.basic = [['Name', '项目名称', , '100'], ['Number', '项目编号', , '100'], ['State', '项目状态', 'enum', '100'],
    ['Principal', '项目负责人', , '100'], ['PrincipalNumber', '负责人工作证号', , '100'], ['PrincipalCollege', '所属学院', , '100'], ['PrincipalDelegate', '委托负责人', , '100'], ['Level', '项目等级', 'enum', '100'],
    ['SubjectName', '所属学科', , '100'], ['ResearchType', '研究类型', , '100'], ['CooperationType', '合作类型', , '100'], ['StartDate', '开始日期', 'Date', '80'],
    ['EndDate', '结束日期', 'Date', '80'], ['IsSecret', '是否涉密', 'Boolean', '20'], ['BaseName', '基地名称', , '100'], ['Creator', '创建人', , '100'],
    ['CreateDate', '创建时间', 'Date', '80'], ['CorporationPlace', '公司地址', , '100'], ['Remark', '备注', , '100'], ['TaskComingFrom', '委托单位', , '100']];

Srims.projects.ProjectExport_Column.Type = [['RankName', '等级名称', , '100'], ['TypeName', '类型名称', , '100'], ['SupportCategoryName', '资助类别', , '100'],
    ['SupportFieldName', '资助领域', , '100'], ['SupportSubFieldName', '资助子领域', , '100']];

Srims.projects.ProjectExport_Column.fund = [['FundContract', '合同额', 'moneyRender', '80'], ['FundTotal', '到校经费', 'moneyRender', '80'],
    ['FundPlanIn', '计划校内分配', 'moneyRender', '80'], ['FundPlanOut', '计划外协分配', 'moneyRender', '80'], ['FundPlanHardware', '计划硬件分配', 'moneyRender', '80'],
    ['FundReceived', '已到经费', 'moneyRender', '80'], ['FundAlreadyTotal', '已分配经费', 'moneyRender', '80'], ['FundAlreadyIn', '已校内分配', 'moneyRender', '80'],
    ['FundAlreadyOut', '已外协分配', 'moneyRender', '80'], ['FundAlreadyHardware', '已硬件分配', 'moneyRender', '80'], ['FundFrom', '经费来源', , '100'],
    ['FundFromUnit', '来款单位', , '100'], ['FundFromUnitAddress', '来款单位地址', , '100'],
    ['OverheadExpenseOutTotal', '外协管理费总额', 'moneyRender', '80'], ['OverheadExpensesAlreadyIn', '已收校内管理费', 'moneyRender', '80'],
    ['OverheadExpensesAlreadyOut', '已收外协管理费', 'moneyRender', '80'], ['IndirectCosts', '项目总间接费用', 'moneyRender', '80'], ['ProjectPerformancePay', '项目总绩效', 'moneyRender', '80'],
    ['OverheadExpenseInTotal', '校内管理费', 'moneyRender', '80'], ['PerformancePay', '校内绩效', 'moneyRender', '80'], ['PerformancePayStandard', '校内基准绩效', 'moneyRender', '80'],
    ['OverheadExpensesInStandard', '校内基准间接费用', 'moneyRender', '80'], ['EquipmentCost', '设备购置费', 'moneyRender', '80'], ['ProjectAccountNumber', '账本号', '', '80']
    , ['OutsourcingPlanAmountString', '外协计划分配', '', '100'], ['OutsourcingAlreadyAmountString', '外协已分配', '', '100'], ['AllocatedPerformance', '实发绩效', 'moneyRender', '80']];


if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectCompleteInWindow = function(id, project, gridPanel) {

    this._id = id;
    this._project = project;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '提交',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });


    this._textFieldOverheadExpenceInStandard = new Srims.component.MoneyField({
        fieldLabel: '校内基准间接费',
        value: project.get('overheadExpensesInStandard'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300,
        readOnly: true
    });
    this._textFieldPerformanceInStandard = new new Srims.component.MoneyField({
        fieldLabel: '校内基准绩效',
        value: project.get('performancePayStandard'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300,
        readOnly: true
    });
    this._textFieldPerformanceIn = new new Srims.component.MoneyField({
        fieldLabel: '校内绩效',
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300,
        allowBlank: false
    });
    this._textFieldOverheadExpenceIn = new new Srims.component.MoneyField({
        fieldLabel: '校内间接费',
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300,
        allowBlank: false
    });


    Srims.projects.ProjectCompleteInWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '完善校内间接费和校内绩效',
        iconCls: 'icon-censor-reject',
        width: 320,
        labelWidth: 70,
        height: 180,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._textFieldOverheadExpenceInStandard, this._textFieldPerformanceInStandard, this._textFieldOverheadExpenceIn, this._textFieldPerformanceIn],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this.assginValues = function() {
        this._project.set('performancePay', this._textFieldPerformanceIn.getValue());
        this._project.set('overheadExpenseInTotal', this._textFieldOverheadExpenceIn.getValue() - this._textFieldPerformanceIn.getValue());
    }
    this.isValid = function(preventMark) {
        var result = true;

        result = this._textFieldOverheadExpenceIn.isValid(preventMark) && result;
        result = this._textFieldPerformanceIn.isValid(preventMark) && result;

        return result;
    }
    //event method
    this._onButonSave_Click = function(button, e) {
        var window = button.window;

        if (!window.isValid(false))
            return;

        var project = window._project;
        window.assginValues();

        window.saveAction(button);
    }
    this.saveAction = function(button) {
        button.setText('正在保存');
        button.disable();

        this.save();
    }
    this.save = function() {

        var project = this._project;
        project.beginEdit();
        this.assginValues();
        project.commit();


        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/Save',
            params: project.data,
            scope: this,
            success: function(response) {
                gridPanel.store.load();
                this.close();
            }
        });

    }

    //event
    this._buttonSave.on('click', this._onButonSave_Click);

}
Ext.extend(Srims.projects.ProjectCompleteInWindow, Ext.Window, {})
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'allocationDateTime',
    type: 'date',
    mapping: 'AllocationDateTime'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'projectNumber',
    type: 'string',
    mapping: 'ProjectNumber'
}, {
    name: 'allocationTotal',
    type: 'int',
    mapping: 'AllocationTotal'
}, {
    name: 'allocationIn',
    type: 'int',
    mapping: 'AllocationIn'
}, {
    name: 'allocationOut',
    type: 'int',
    mapping: 'AllocationOut'
},
{
    name: 'allocationWantOut',
    type: 'int',
    mapping: 'AllocationWantOut'
}, {
    name: 'performanceTotal',
    type: 'int',
    mapping: 'PerformanceTotal'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'allocationHardware',
    type: 'int',
    mapping: 'AllocationHardware'
}, {
    name: 'overheadExpensesOut',
    type: 'int',
    mapping: 'OverheadExpensesOut'
}, {
    name: 'overheadPerformancePay',
    type: 'int',
    mapping: 'OverheadPerformancePay'
}, {
    name: 'state',
    type: 'string',
    mapping: 'CurrentState'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPricinpalName',
    type: 'string',
    mapping: 'ProjectPricinpalName'
}, {
    name: 'projectTypeName',
    type: 'string',
    mapping: 'ProjectTypeName'
}, {
    name: 'isHorizontal',
    type: 'bool',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'financeID',
    type: 'int',
    mapping: 'FinanceID'
}, {
    name: 'financeAmount',
    type: 'int',
    mapping: 'FinanceAmount'
}, {
    name: 'financeReceivedDate',
    type: 'date',
    mapping: 'FinanceReceivedDate'
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'isBorrow',
    type: 'bool',
    mapping: 'IsBorrow',
    convert: Boolean.toBoolean
}, {
    name: 'fundDescendID',
    type: 'int',
    mapping: 'FundDescendID'
}, {
    name: 'hasPermission_Allocation',
    type: 'bool',
    mapping: 'HasPermission_Allocation',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Canel',
    type: 'bool',
    mapping: 'HasPermission_Canel',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Censor',
    type: 'bool',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Submit',
    type: 'bool',
    mapping: 'HasPermission_Submit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UndoSubmit',
    type: 'bool',
    mapping: 'HasPermission_UndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Correct',
    type: 'bool',
    mapping: 'HasPermission_Correct',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocation',
    type: 'bool',
    mapping: 'CanAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canCancel',
    type: 'bool',
    mapping: 'CanCancel',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'bool',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'bool',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmit',
    type: 'bool',
    mapping: 'CanSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoSubmit',
    type: 'bool',
    mapping: 'CanUndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canCorrect',
    type: 'bool',
    mapping: 'CanCorrect',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocationPerformancePay',
    type: 'bool',
    mapping: 'CanAllocationPerformancePay',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesMiddle',
    type: 'int',
    mapping: 'OverheadExpensesMiddle'
}, {
    name: 'overheadExpensesExpert',
    type: 'int',
    mapping: 'OverheadExpensesExpert'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}
]);

Srims.data.Entity.apply(Srims.fund.FundAllocation);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundAllocationStore.superclass.constructor.call(this, new Srims.fund.FundAllocationXmlReader(), load_url, params);
    }
});



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundAllocationXmlReader.superclass.constructor.call(this, Srims.fund.FundAllocation);
    }
    
});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundAllocationState');

Srims.fund.fundAllocationState.UnSubmit = 'UnSubmit';
Srims.fund.fundAllocationState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundAllocationState.Reject = 'Reject';
Srims.fund.fundAllocationState.Passed = 'Passed';
Srims.fund.fundAllocationState.Canceled = 'Canceled';

Srims.fund.fundAllocationStateRender = function(value){
    switch (value) {
        case 'UnSubmit':
            return '未提交/待分配';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '未知';
    }
}
Srims.fund.fundAllocationStateFilterItems = [{
    id: 'UnSubmit',
    text: '未提交'
}, {
    id: 'WaitingCensor',
    text: '等待审核'
}, {
    id: 'Reject',
    text: '审核驳回'
}, {
    id: 'Passed',
    text: '审核通过'
}, {
    id: 'Canceled',
    text: '作废'
}];

Srims.fund.fundAllocationStore = [['UnSubmit', '未提交'], ['WaitingCensor', '等待审核'], ['Reject', '审核驳回'], ['Passed', '审核通过'], ['Canceled', '作废']];
if (!Srims.fund)
    Ext.namespace('Srims.fund');
Srims.fund.FundAllocationGridPanel_ColumnModel = function(isShowProjectName) {
    Srims.fund.FundAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true
    }, {
        header: '项目编号',
        dataIndex: 'projectNumber',
        width: 300,
        hidden: !isShowProjectName
    }, {
        header: '分配项目',
        dataIndex: 'projectName',
        width: 300,
        hidden: !isShowProjectName
    }, {
        header: '分配时间',
        dataIndex: 'allocationDateTime',
        sortable: true,
        width: 100,
        renderer: Date.render
    }, {
        header: '分配总额',
        dataIndex: 'allocationTotal',
        sortable: true,
        width: 80,
        renderer: Money.render
    }, {
        header: '直接费用',
        dataIndex: 'allocationIn',
        width: 80,
        renderer: Money.render
    }, {
        header: '项目总绩效',
        dataIndex: 'PerformanceTotal',
        width: 80,
        renderer: Money.render,
        hidden: !isShowProjectName
    }, {
        header: '校内绩效',
        dataIndex: 'overheadPerformancePay',
        width: 80,
        renderer: Money.render,
        hidden: !isShowProjectName
    }, {
        header: '课题组间接费用及绩效',
        dataIndex: 'overheadExpensesExpert',
        width: 80,
        renderer: Money.render
    }, {
        header: '外协分配',
        dataIndex: 'allocationOut',
        width: 80,
        renderer: Money.render
    }, {
        header: '当前状态',
        dataIndex: 'state',
        sortable: true,
        width: 60,
        renderer: Srims.fund.fundAllocationStateRender
    }, {
        header: '当前状态时间',
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        id: 'operator',
        header: '当前状态操作人',
        dataIndex: 'operator'
}])
    }
    Ext.extend(Srims.fund.FundAllocationGridPanel_ColumnModel, Ext.grid.ColumnModel);if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'projectNumber',
    type: 'string',
    mapping: 'ProjectNumber'
}, {
    name: 'canAllocate',
    type: 'bool',
    mapping: 'CanAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'fundAllocationIn',
    type: 'int',
    mapping: 'FundAllocationIn'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'allocationDateTime',
    type: 'date',
    mapping: 'AllocationDateTime'
}, {
    name: 'performanceTotal',
    type: 'int',
    mapping: 'PerformanceTotal'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'arrivedPerformance',
    type: 'int',
    mapping: 'ArrivedPerformance'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'state',
    type: 'string',
    mapping: 'CurrentState'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPricinpalName',
    type: 'string',
    mapping: 'ProjectPricinpalName'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'isCancel',
    type: 'bool',
    mapping: 'IsCancel',
    convert: Boolean.toBoolean
},{
    name: 'isHorizontal',
    type: 'bool',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'performanceID',
    type: 'int',
    mapping: 'performanceID'
}, {
    name: 'hasPermission_Allocation',
    type: 'bool',
    mapping: 'HasPermission_Allocation',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Canel',
    type: 'bool',
    mapping: 'HasPermission_Canel',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Censor',
    type: 'bool',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Submit',
    type: 'bool',
    mapping: 'HasPermission_Submit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UndoSubmit',
    type: 'bool',
    mapping: 'HasPermission_UndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Correct',
    type: 'bool',
    mapping: 'HasPermission_Correct',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocation',
    type: 'bool',
    mapping: 'CanAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canCancel',
    type: 'bool',
    mapping: 'CanCancel',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'bool',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'bool',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmit',
    type: 'bool',
    mapping: 'CanSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoSubmit',
    type: 'bool',
    mapping: 'CanUndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canCorrect',
    type: 'bool',
    mapping: 'CanCorrect',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocationPerformancePay',
    type: 'bool',
    mapping: 'CanAllocationPerformancePay',
    convert: Boolean.toBoolean
}, {
    name: 'canChangePerformanceAmount',
    type: 'bool',
    mapping: 'CanChangePerformanceAmount',
    convert: Boolean.toBoolean
}, {
    name: 'arrivedOverheadexpensesExpert',
    type: 'int',
    mapping: 'ArrivedOverheadexpensesExpert',
}, {
    name: 'expertIndirectFee',
    type: 'int',
    mapping: 'ExpertIndirectFee',
}
]);

    Srims.data.Entity.apply(Srims.performance.PerformanceAllocation);
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.performance.PerformanceAllocationStore.superclass.constructor.call(this, new Srims.performance.PerformanceAllocationXmlReader(), load_url, params);
    }
});



if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.performance.PerformanceAllocationXmlReader.superclass.constructor.call(this, Srims.performance.PerformanceAllocation);
    },
    readRecords: function(responseXML) {
        var result = Srims.performance.PerformanceAllocationXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.overheadExpensesExpertSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesExpertSum", responseXML), 10);
        return result;
    }
});


if (!Srims.performance)
    Ext.namespace('Srims.performance');

Ext.namespace('Srims.performance.performanceAllocationState');

Srims.performance.performanceAllocationState.UnSubmit = 'UnSubmit';
Srims.performance.performanceAllocationState.WaitingCensor = 'WaitingCensor';
Srims.performance.performanceAllocationState.Reject = 'Reject';
Srims.performance.performanceAllocationState.Passed = 'Passed';
Srims.performance.performanceAllocationState.Canceled = 'Canceled';

Srims.performance.fundAllocationStateRender = function(value) {
    switch (value) {
        case 'UnSubmit':
            return '未提交/待分配';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '未知';
    }
}
Srims.performance.fundAllocationStateFilterItems = [{
    id: 'UnSubmit',
    text: '未提交'
}, {
    id: 'WaitingCensor',
    text: '等待审核'
}, {
    id: 'Reject',
    text: '审核驳回'
}, {
    id: 'Passed',
    text: '审核通过'
}, {
    id: 'Canceled',
    text: '作废'
}];

Srims.performance.fundAllocationStore = [['UnSubmit', '未提交'], ['WaitingCensor', '等待审核'], ['Reject', '审核驳回'], ['Passed', '审核通过'], ['Canceled', '作废']];

if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceAllocationGridPanel_ColumnModel = function(isCheckBox, selectModel) {
    if (isCheckBox) {
        Srims.performance.PerformanceAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [selectModel, {
            header: 'id',
            hidden: true
        }, {
            header: '项目编号',
            dataIndex: 'projectNumber',
            width: 20,
            sortable: false,
            hidden: false
        }, {
            header: '项目名称',
            dataIndex: 'projectName',
            sortable: true,
            width: 300
        }, {
            header: '项目类型',
            dataIndex: 'typeName',
            sortable: true,
            width: 300
        }, {
            header: '项目负责人',
            dataIndex: 'projectPricinpalName',
            sortable: true,
            width: 300
        }, {
            header: '项目间接费',
            dataIndex: 'indirectCosts',
            width: 40,
            renderer: Money.render,
            hidden: true

        }, {
            header: '项目绩效',
            dataIndex: 'projectPerformancePay',
            width: 40,
            renderer: Money.render,
            hidden: true
        }, {
            header: '校内绩效',
            dataIndex: 'performancePay',
            width: 40,
            renderer: Money.render,
            hidden: true
        }, {
            header: '本次校内分配',
            dataIndex: 'fundAllocationIn',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '已到课题组间接费用及绩效',
            dataIndex: 'arrivedOverheadexpensesExpert',
            width: 80,
            renderer: Money.render
        }, {
            header: '课题组间接费用',
            dataIndex: 'expertIndirectFee',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '绩效',
            dataIndex: 'arrivedPerformance',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '是否允许分配',
            dataIndex: 'canAllocate',
            width: 40,
            renderer: function(value) {
                return value == true ? '是' : '否';
            },
            sortable: true,
            hidden: true
        }, {
            header: '当前状态',
            dataIndex: 'state',
            sortable: true,
            width: 60,
            renderer: Srims.performance.fundAllocationStateRender,
            hidden: true
        }, {
            header: '当前状态时间',
            dataIndex: 'dateTime',
            width: 100,
            renderer: Date.render,
            hidden: true
        }, {
            id: 'operator',
            header: '当前状态操作人',
            dataIndex: 'operator',
            hidden: true
}])
        }
        else {
            Srims.performance.PerformanceAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [{
                header: 'id',
                hidden: true
            }, {
                header: '项目编号',
                dataIndex: 'projectNumber',
                width: 20,
                sortable: false,
                hidden: false
            }, {
                header: '项目名称',
                dataIndex: 'projectName',
                sortable: true,
                width: 300
            }, {
                header: '项目类型',
                dataIndex: 'typeName',
                sortable: true,
                width: 300
            }, {
                header: '项目负责人',
                dataIndex: 'projectPricinpalName',
                sortable: true,
                width: 300
            }, {
                header: '本次校内分配',
                dataIndex: 'fundAllocationIn',
                sortable: false,
                width: 80,
                renderer: Money.render,
                hidden: true
            }, {
                header: '已到课题组间接费用及绩效',
                dataIndex: 'arrivedOverheadexpensesExpert',
                width: 80,
                renderer: Money.render
            }, {
                header: '是否允许分配',
                dataIndex: 'canAllocate',
                width: 40,
                renderer: function(value) {
                    return value == true ? '是' : '否';
                },
                sortable: true,
                hidden: true
            }, {
                header: '分配时间',
                dataIndex: 'allocationDateTime',
                sortable: true,
                width: 100,
                renderer: Date.render,
                hidden: true
            }, {
                header: '当前状态',
                dataIndex: 'state',
                sortable: true,
                width: 60,
                renderer: Srims.performance.fundAllocationStateRender,
                hidden: true
            }, {
                header: '当前状态时间',
                dataIndex: 'dateTime',
                width: 100,
                renderer: Date.render,
                hidden: true
            }, {
                id: 'operator',
                header: '当前状态操作人',
                dataIndex: 'operator',
                hidden: true
}])
            }
        }
        Ext.extend(Srims.performance.PerformanceAllocationGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItem = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}]);

Srims.data.Entity.apply(Srims.fund.PayPlanItem);


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
    
        var load_url = Srims.service.fund.PayPlanItemService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.isNew() ? 0 : project.get('id')
        }
        Srims.fund.PayPlanItemStore.superclass.constructor.call(this, new Srims.fund.PayPlanItemXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.PayPlanItemXmlReader.superclass.constructor.call(this, Srims.fund.PayPlanItem);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemGridPanel = function(project){

    this._project = project;
    this._store = new Srims.fund.PayPlanItemStore(project);
    this._columnModel = new Srims.fund.PayPlanItemGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.fund.PayPlanItemGridPanel_ToolBar(this._selections, this._store, this._project)
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    
    Srims.fund.PayPlanItemGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var payPlanItem = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectPayPlanItem(this._project, payPlanItem, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.fund.PayPlanItemGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.PayPlanItemGridPanel_ToolBar = function(selection, store, project){

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.newProjectPayPlanItem(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>新建付款计划</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.projects.editProjectPayPlanItem(this.project, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑付款计划</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('删除付款计划', '你确定要删除这个付款计划吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projetPayPlanItemID = this.selection.getSelected().get('id');
                    
                    Ext.Ajax.request({
                        url: Srims.service.fund.PayPlanItemService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function(){
                            this.store.load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除付款计划</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费到帐计划列表'
    });
    Srims.fund.PayPlanItemGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });
    
    this._buttonNew.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
    this._buttonNew.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
    
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        buttonEdit.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
        buttonEdit.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
        
        buttonDelete.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
        buttonDelete.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    this._store.toolBar = this;
    this._store.on('load', function(){
        var projectPayPlanItems = this.getRange();
        var projectFundTotal = this.toolBar._project.get('fundTotal');
        var projectPayPlanAmountTotal = 0;
        for (var i = 0; i < projectPayPlanItems.length; i++) 
            projectPayPlanAmountTotal += projectPayPlanItems[i].get('amount');
        
        this.toolBar._buttonNew.setDisabled(projectFundTotal <= projectPayPlanAmountTotal);
    });
}
Ext.extend(Srims.fund.PayPlanItemGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');
Srims.fund.PayPlanItemGridPanel_ColumnModel = function(){
    Srims.fund.PayPlanItemGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '到帐时间',
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        id: 'amount',
        header: '到帐金额(万元)',
        dataIndex: 'amount',
        renderer: Money.render
    }]);
}
Ext.extend(Srims.fund.PayPlanItemGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._payPlanItemGridPanel = new Srims.fund.PayPlanItemGridPanel(this._project);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.fund.PayPlanItemWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目：' + this._project.get('name') + '付款计划管理',
        iconCls: 'icon-project-pay-plan-item',
        width: 500,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._payPlanItemGridPanel],
        buttons: [this._buttonClose]
    });
    this._payPlanItemGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelPayPlanItem._store.load();
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.fund.PayPlanItemWindow, Ext.Window, {});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.PayPlanItemEditWindow = function(id, payPlanItem, project, store){

    this._id = id;
    this._payPlanItem = payPlanItem;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._dateFieldDateTime = new Ext.form.DateField({
        fieldLabel: '到款时间',
        value: this._payPlanItem.get('dateTime'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    this._numberFieldAmount = new Srims.component.MoneyField({
        fieldLabel: '数额(万元)',
        value: this._payPlanItem.get('amount'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    Srims.fund.PayPlanItemEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '编辑项目付款计划信息',
        width: 300,
        labelWidth: 70,
        height: 160,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._dateFieldDateTime, this._numberFieldAmount],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._validAmount = function(){
        var amount = this._numberFieldAmount.getMoney();
        
        if (amount == 0) {
            Ext.Msg.show({
                title: '付款金额错误',
                msg: '付款金额必须大于零',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        
        var projectPayPlanItems = this._store.getRange();
        var projectFundTotal = this._project.get('fundTotal');
        var projectPayPlanAmountTotal = 0;
        for (var i = 0; i < projectPayPlanItems.length; i++) {
            if (this._payPlanItem == projectPayPlanItems[i]) 
                continue;
            projectPayPlanAmountTotal += projectPayPlanItems[i].get('amount');
        }
        if (projectFundTotal < projectPayPlanAmountTotal + amount) {
            Ext.Msg.show({
                title: '付款金额错误',
                msg: '计划付款金额不能大于项目的到校经费金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldDateTime.isValid(preventMark) && result;
        result = this._numberFieldAmount.isValid(preventMark) && result;
        result = this._validAmount() && result;
        
        return result;
    }
    this._assignValues = function(){
        this._payPlanItem.set('dateTime', this._dateFieldDateTime.getValue());
        this._payPlanItem.set('amount', this._numberFieldAmount.getMoney());
        this._payPlanItem.set('projectID', this._project.get('id'));
    }
    this._save = function(){
        var payPlanItem = this._payPlanItem;
        payPlanItem.beginEdit();
        this._assignValues();
        payPlanItem.commit();
        
        payPlanItem.data.dateTime = payPlanItem.data.dateTime.format("Y-m-d H:i:s");
        
        Ext.Ajax.request({
            url: Srims.service.fund.PayPlanItemService + '/Save',
            params: payPlanItem.data,
            scope: this,
            success: function(){
                var payPlanItem = this._payPlanItem;
                delete payPlanItem.data.dateTime;
                this._store.load();
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.fund.PayPlanItemEditWindow, Ext.Window, {})
if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FundDescend = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'projectName',
	type: 'string',
	mapping: 'ProjectName'
},{
	name: 'projectPrincipalName',
	type: 'string',
	mapping: 'ProjectPrincipalName'
},{
	name: 'projectID',
	type: 'int',
	mapping: 'ProjectID'
},{
	name: 'amount',
	type: 'int',
	mapping: 'Amount'
},{
	name: 'receivedAmount',
	type: 'int',
	mapping: 'ReceivedAmount'
},{
	name: 'descendDateTime',
	type: 'date',
	mapping: 'DescendDateTime'
},{
	name: 'operator',
	type: 'string',
	mapping: 'Operator'
},{
	name: 'state',
	type: 'string',
	mapping: 'State'
},{
	name: 'financeVoucherNumber',
	type: 'string',
	mapping: 'FinanceVoucherNumber'
},{
	name: 'financeAbstract',
	type: 'string',
	mapping: 'FinanceAbstract'
},{
	name: 'hasPermission_Edit',
	type: 'bool',
	mapping: 'HasPermission_Edit',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_Censor',
	type: 'bool',
	mapping: 'HasPermission_Censor',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_Delete',
	type: 'bool',
	mapping: 'HasPermission_Delete',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_ShowAlloction',
	type: 'bool',
	mapping: 'HasPermission_ShowAlloction',
	convert: Boolean.toBoolean
},{
	name: 'canEdit',
	type: 'bool',
	mapping: 'CanEdit',
	convert: Boolean.toBoolean
},{
	name: 'canDelete',
	type: 'bool',
	mapping: 'CanDelete',
	convert: Boolean.toBoolean
},{
	name: 'canCensorPass',
	type: 'bool',
	mapping: 'CanCensorPass',
	convert: Boolean.toBoolean
},{
	name: 'canCensorReject',
	type: 'bool',
	mapping: 'CanCensorReject',
	convert: Boolean.toBoolean
},{
	name: 'canShowAllocation',
	type: 'bool',
	mapping: 'CanShowAllocation',
	convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.fund.FundDescend);if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FundDescendGridPanel_ColumnModel = function(isBorrow, isNotNeedProjectName, isShowFinanceInfo) {
	Srims.fund.FundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: 'id',
		dataIndex: 'ID',
		sortable: false,
		hidden: true
	},{
		header: isBorrow ? '借款项目' : '下拨项目',
		dataIndex: 'projectName',
		sortable: false,
		hidden: isNotNeedProjectName,
		width: 300
	},{
		header: '项目负责人',
		dataIndex: 'projectPrincipalName',
		sortable: false,
		hidden: isNotNeedProjectName
	},{
		header: isBorrow ? '借款金额（万元）' : '下拨金额(万元)',
		dataIndex: 'amount',
		sortable: true,
		renderer: Money.render
	},{
		header: '经费凭单号',
		dataIndex: 'financeVoucherNumber',
		sortable: false,
		hidden: !isShowFinanceInfo
	},{
		header: '经费说明',
		dataIndex: 'financeAbstract',
		sortable: false,
		hidden: !isShowFinanceInfo,
		width: 200
	},{
		header: isBorrow ? '借款时间' : '下拨时间',
		dataIndex: 'descendDateTime',
		sortable: true,
		renderer: Date.render
	},{
		header: isBorrow ? '已还金额' : '实到金额(万元)',
		dataIndex: 'receivedAmount',
		sortable: true,
		renderer: Money.render
	},{
		id: 'operator',
		header: isBorrow ? '借款人' : '下拨人',
		dataIndex: 'operator'
	},{
		header: '当前状态',
		dataIndex: 'state',
		renderer: Srims.fund.fundDescendStateRender
	}])
}
Ext.extend(Srims.fund.FundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundDescendState');

Srims.fund.fundDescendState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundDescendState.Reject = 'Reject';
Srims.fund.fundDescendState.Passed = 'Passed';
Srims.fund.fundDescendState.AllocationCompleted = 'AllocationCompleted';

Srims.fund.fundDescendStateRender = function(value){
    switch (value) {
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '待分配';
        case 'AllocationCompleted':
            return '分配完成';
        default:
            return '未知';
    }
}

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundDescendStore.superclass.constructor.call(this, new Srims.fund.FundDescendXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundDescendXmlReader.superclass.constructor.call(this, Srims.fund.FundDescend);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescend = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'operateDateTime',
    type: 'date',
    mapping: 'OperateDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'isReturn',
    type: 'bool',
    mapping: 'IsReturn',
    convert: Boolean.toBoolean
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'hasPermission_EditReturn',
    type: 'bool',
    mapping: 'HasPermission_EditReturn',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DeleteReturn',
    type: 'bool',
    mapping: 'HasPermission_DeleteReturn',
    convert: Boolean.toBoolean
}, {
    name: 'canEditReturn',
    type: 'bool',
    mapping: 'CanEditReturn',
    convert: Boolean.toBoolean
}, {
    name: 'canDeleteReturn',
    type: 'bool',
    mapping: 'CanDeleteReturn',
    convert: Boolean.toBoolean
}]);

Srims.data.Entity.apply(Srims.fund.FinanceFundDescend);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendGridPanel_ColumnModel = function(isNotNeedProjectName, isShowFinanceInfo){
    Srims.fund.FinanceFundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '经费凭单号',
        dataIndex: 'financeVoucherNumber',
        sortable: false,
        hidden: !isShowFinanceInfo
    }, {
        header: '经费说明',
        dataIndex: 'financeAbstract',
        sortable: false,
        hidden: !isShowFinanceInfo,
        width: 200
    }, {
        header: '还款项目',
        dataIndex: 'projectName',
        sortable: false,
        hidden: isNotNeedProjectName,
        width: 300
    }, {
        header: '还款金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        renderer: Money.render
    }, {
        header: '还款时间',
        dataIndex: 'operateDateTime',
        sortable: true,
        renderer: Date.render
    }, {
        id: 'operator',
        header: '还款人',
        dataIndex: 'operator'
    }])
}
Ext.extend(Srims.fund.FinanceFundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceFundDescendStore.superclass.constructor.call(this, new Srims.fund.FinanceFundDescendXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceFundDescendXmlReader.superclass.constructor.call(this, Srims.fund.FinanceFundDescend);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.projectGridPanel_ColumnModel = function(){
    Srims.projects.projectGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "编号",
        dataIndex: 'number',
        width: 100,
        sortable: true,
        hidden: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "所属学院",
        dataIndex: 'principalCollege',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "等级",
        dataIndex: 'rankName',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'typeName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "类型（简称）",
        dataIndex: 'typeShortName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "到校经费",
        dataIndex: 'fundTotal',
        width: 60,
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "已到经费",
        dataIndex: 'fundReceived',
        width: 60,
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "开始日期",
        dataIndex: 'startDate',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "结束日期",
        dataIndex: 'endDate',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "负责人工作证号",
        dataIndex: 'principalNumber',
        sortable: false,
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 30,
        sortable: false,
        hidden: true,
        renderer: Srims.projects.projectStateRender
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: false,
        hidden: true,
        width: 10,
        renderer: Srims.projects.projectLevelRender
    }, {
        header: "所属学科",
        dataIndex: 'subjectName',
        sortable: false,
        hidden: true
    }, {
        header: "研究类型",
        dataIndex: 'researchType',
        sortable: false,
        hidden: true
    }, {
        header: "合作类型",
        dataIndex: 'cooperationType',
        sortable: false,
        hidden: true
    }, {
        header: "所属基地",
        dataIndex: 'baseName',
        sortable: false,
        hidden: true
    }, {
        header: "保密",
        dataIndex: 'isSecret',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "委托负责人",
        dataIndex: 'principalDelegate',
        sortable: false,
        hidden: true
    }, {
        header: "建立人",
        dataIndex: 'creator',
        sortable: false,
        hidden: true
    }, {
        header: "建立日期",
        dataIndex: 'createDate',
        sortable: true,
        hidden: true,
        renderer: Date.render
    }, {
        header: "公司所在地",
        dataIndex: 'corporationPlace',
        sortable: false,
        hidden: true
    }, {
        header: "资助类别",
        dataIndex: 'supportCategoryName',
        sortable: false,
        hidden: true
    }, {
        header: "资助领域",
        dataIndex: 'supportField',
        sortable: false,
        hidden: true
    }, {
        header: "资助子领域",
        dataIndex: 'supportField',
        sortable: false,
        hidden: true
    }, {
        header: "硬件分配",
        dataIndex: 'fundAlreadyHardware',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已分配经费",
        dataIndex: 'fundAlreadyTotal',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已分配校内经费",
        dataIndex: 'fundAlreadyIn',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已分配外协",
        dataIndex: 'fundAlreadyOut',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "合同额",
        dataIndex: 'fundContract',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "经费来源",
        dataIndex: 'fundFrom',
        sortable: false,
        hidden: true
    }, {
        header: "来款单位",
        dataIndex: 'fundFromUnit',
        sortable: false,
        hidden: true
    }, {
        header: "来款单位地址",
        dataIndex: 'fundFromUnitAddress',
        sortable: false,
        hidden: true
    }, {
        header: "计划外协",
        dataIndex: 'fundPlanOut',
        sortable: true,
        hidden: true,
        renderer: Money.render
          }, {
        header: "设备购置费",
        dataIndex: 'equipmentCost',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "计划硬件费",
        dataIndex: 'fundPlanHardware',
        sortable: true,
        hidden: true,
              renderer: Money.render  
    }, {
        header: "计划校内分配",
        dataIndex: 'fundPlanIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "总校内管理费",
        dataIndex: 'overheadExpenseInTotal',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "总外协管理费",
        dataIndex: 'overheadExpenseOutTotal',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已收校内管理费",
        dataIndex: 'overheadExpensesAlreadyIn',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已收外协管理费",
        dataIndex: 'overheadExpensesAlreadyOut',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "校内基准间接费",
        dataIndex: 'overheadExpensesInStandard',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "校内基准绩效",
        dataIndex: 'PerformanceInStandard',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "项目间接费用",
        dataIndex: 'indirectCosts',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "项目绩效",
        dataIndex: 'projectPerformancePay',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "校内绩效",
        dataIndex: 'performancePay',
        sortable: true,
        hidden: true,
        renderer: Money.render
    }, {
        header: "备注",
        dataIndex: 'remark',
        sortable: false,
        hidden: true
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.projectGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.projectGridPanel_MyJoinProject_ColumnModel = function(){
    Srims.projects.projectGridPanel_MyJoinProject_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "编号",
        dataIndex: 'number',
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'typeName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: false,
        hidden: false,
        width: 30,
        renderer: Srims.projects.projectLevelRender
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.projectGridPanel_MyJoinProject_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.projectRankVerticalFilterItems = [{
    id: '国家级',
    text: '国家级'
}, {
    id: '省部级',
    text: '省部级'
}, {
    id: '校级',
    text: '校级'
}, {
    id: '市厅级',
    text: '市厅级'
},{
    id: '其它',
    text: '其它'
}];

Srims.projects.ProjectGridPanel_GridFilters = function(){
    Srims.projects.ProjectGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'number'
        }, {
            type: 'string',
            dataIndex: 'principal'
        }, {
            type: 'date',
            dataIndex: 'startDate'
        }, {
            type: 'date',
            dataIndex: 'endDate'
        }, {
            type: 'numeric',
            money: true,
            dataIndex: 'fundTotal'
        }, {
            type: 'list',
            dataIndex: 'rankName',
            options: Srims.projects.projectRankVerticalFilterItems,
            phpMode: true
        }, {
            type: 'string',
            dataIndex: 'typeName'
        }, {
            type: 'string',
            dataIndex: 'typeShortName'
        }, {
            type: 'list',
            dataIndex: 'state',
            options: Srims.projects.projectStateFilterItems,
            phpMode: true
        }]
    });
}
Ext.extend(Srims.projects.ProjectGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectGridPanel_ToolBar = function(gridPanel, panelId, queryParams) {

    //fields
    this._gridPanel = gridPanel;
    this._isHorizontal = gridPanel._isHorizontal;
    this._selection = gridPanel._selection;
    this._store = gridPanel._projectStore;
    this._projectState = gridPanel._projectSate;
    this._expertAttendType = gridPanel._expertAttendType;
    this._panelId = panelId;
    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        gridPanel: this._gridPanel,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            Srims.projects.showProjectQueryWindow(this.panelId + '_QueryWindow', this.store, this.isHorizontal, queryParams, this.gridPanel);
        },
        tooltip: '<b>项目查询</b><br/>对项目信息进行复杂查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.projects.showImportWindow(this.store);
        },
        tooltip: '<b>项目导入</b><br/>将项目从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        isHorizontal: this._isHorizontal,
        handler: function() {
            Srims.projects.newProject(this.isHorizontal);
        },
        tooltip: '<b>新建项目</b><br/>输入项目信息以新建项目',
        hidden: this._isHorizontal ? !user.hasPermission_EditAnyHorizontalProject : !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showProject(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看项目</b><br/>显示所选项目的详细信息'
    });
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出',
        minWidth: 60,
        selection: this._selection,
        gridPanel: this._gridPanel,
        store: this._store,
        handler: function() {
            Srims.projects.exportProject(this.store.lastOptions.params, queryParams);
        },
        tooltip: '<b>导出项目</b><br/>导出所查询的项目',
        hidden: !user.hasPermission_EditAnyHorizontalProject && !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonEmail = new Ext.Toolbar.Button({
        iconCls: 'icon-email',
        text: '发送邮件',
        minWidth: 60,
        store: this._store,
        handler: function() {

            var filterParams = {};
            for (var param in this.store.lastOptions.params)
                filterParams[param] = this.store.lastOptions.params[param];
            for (var param in queryParams)
                filterParams[param] = queryParams[param];

            Srims.projects.confirmProjectPrincipalToSendEmail(filterParams);
        },
        tooltip: '<b>发送邮件</b><br/>给查询项目的负责人发送邮件',
        hidden: !user.hasPermission_EditAnyHorizontalProject && !user.hasPermission_EditAnyVerticalProject
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.editProject(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目</b><br/>编辑选中项目的基本、类别、经费等信息'
    });
    this._buttonMemberManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '成员管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showProjectMemberWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b><br/>编辑选中项目的成员信息'
    });
    this._buttonPayPlanItemManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-pay-plan-item',
        text: '付款计划',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showPayPlanItemWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目付款计划</b><br/>编辑选中项目的付款计划信息'
    });
    this._buttonContractManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-contract',
        text: '合同管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showContractWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目合同</b><br/>编辑选中项目的合同信息'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-document',
        text: '文档管理',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showDocumentWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑项目文档</b><br/>编辑选中项目的文档信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除项目', '你确定要删除这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.deleteProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除项目</b><br/>删除选中的项目'
    });
    this._buttonWithDraw = new Ext.Toolbar.Button({
        iconCls: 'icon-withDraw',
        text: '撤消',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('撤销项目', '你确定要撤销这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.withDrawProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤消项目</b><br/>撤消选中的项目'
    });
    this._buttonTerminate = new Ext.Toolbar.Button({
        iconCls: 'icon-terminate',
        text: '终止',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('终止项目', '你确定要终止这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.terminateProject(this.selection.getSelected())
            }, this);
        },
        hidden: true,
        tooltip: '<b>终止项目</b><br/>终止选中的项目'
    });
    this._buttonCensorStartPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过立项申请',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.show({
                title: '审核通过立项申请',
                msg: '您需要同时审核通过该项目的合同和文档吗？<br />点击“是”按钮，同时审核通过项目的合同和文档；<br />点击“否”按钮，仅审核通过项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                buttons: Ext.MessageBox.YESNOCANCEL,
                scope: this,
                fn: function(button) {
                    if (button == 'yes')
                        Srims.projects.censorStart_Pass(this.selection.getSelected(), true);
                    if (button == 'no')
                        Srims.projects.censorStart_Pass(this.selection.getSelected(), false);
                },
                icon: Ext.MessageBox.QUESTION
            });
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过选中项目的立项申请'
    });
    //对于专家提交的特定项目类型项目申请，需要由管理员先完善校内间接费和校内绩效
    this._buttonCompleteIn = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '填写校内间接费和绩效',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var project = this.selection.getSelected();
            project.projectStore = gridPanel.getStore();
            Srims.projects.editProject(project);
        },
        hidden: true,
        tooltip: '<b>填写校内间接费和绩效</b><br/>填写校内间接费和绩效'
    });
    this._buttonCensorEndPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过结项申请',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('审核通过结项申请', '你确定要审核通过这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.censorEnd_Pass(this.selection.getSelected());
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过选中项目的结项申请'
    });
    this._buttonCensorStartReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回立项申请',
        minWidth: 60,
        selection: this._selection,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.rejectProjectCensor(this.selection.getSelected(), true);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回选中的项目'
    });
    this._buttonCensorEndReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回结项申请',
        minWidth: 60,
        selection: this._selection,
        projectState: this._projectState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.rejectProjectCensor(this.selection.getSelected(), false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回选中的项目'
    });

    this._buttonSetDelegatePrincipal = new Ext.Toolbar.Button({
        iconCls: 'icon-set-delegate-principal',
        text: '指定委托负责人',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.projects.showSetDelegatePrincipalWindow([this.selection.getSelected()], this.store);
        },
        hidden: true,
        tooltip: '<b>指定委托负责人</b><br/>为选中的项目指定委托负责人'
    });
    this._buttonClearDelegatePrincipal = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-delegate-principal',
        text: '取消委托负责人',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('取消委托负责人', '你确定要取消这个项目的委托负责人吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.clearDeletatePrincipal([this.selection.getSelected()], this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>取消委托负责人</b><br/>为选中的项目取消委托负责人'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        projectState: this._projectState,
        isHorizontal: this._isHorizontal,
        expertAttendType: this._expertAttendType,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            if (this.isHorizontal != undefined)
                params[params.length] = 'isHorizontal';
            if (this.projectState) {
                params[params.length] = 'state';
                params[params.length] = 'isCensor';
            }
            if (this.expertAttendType)
                params[params.length] = 'expertAttendType';
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();

            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var buttonItems;
    if (this._expertAttendType)
        buttonItems = [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage, this._buttonDelete, this._buttonSetDelegatePrincipal, this._buttonClearDelegatePrincipal, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    else {
        if (!this._projectState)
            buttonItems = [this._buttonQuery, this._buttonNew, this._buttonExport, this._buttonEmail, this._buttonShow, this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage, this._buttonWithDraw, this._buttonTerminate, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        if (this._projectState == Srims.projects.ProjectState.WaitingStartCensor)
            buttonItems = [this._buttonShow, this._buttonCompleteIn, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        
            //buttonItems = [this._buttonShow, this._buttonCompleteIn, this._buttonCensorStartPass, this._buttonCensorStartReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
        if (this._projectState == Srims.projects.ProjectState.WaitingEndCensor)
            buttonItems = [this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
   
            //buttonItems = [this._buttonShow, this._buttonCensorEndPass, this._buttonCensorEndReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    }

    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });

    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonMemberManage = this._buttonMemberManage;
    this._selection.buttonPayPlanItemManage = this._buttonPayPlanItemManage;
    this._selection.buttonContractManage = this._buttonContractManage;
    this._selection.buttonDocumentManage = this._buttonDocumentManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonWithDraw = this._buttonWithDraw;
    this._selection.buttonTerminate = this._buttonTerminate;
    this._selection.buttonCensorStartPass = this._buttonCensorStartPass;
    this._selection.buttonCensorStartReject = this._buttonCensorStartReject;
    this._selection.buttonCensorEndPass = this._buttonCensorEndPass;
    this._selection.buttonCensorEndReject = this._buttonCensorEndReject;
    this._selection.buttonClearDelegatePrincipal = this._buttonClearDelegatePrincipal;
    this._selection.buttonSetDelegatePrincipal = this._buttonSetDelegatePrincipal;
    this._selection.projectState = this._projectState;
    this._selection.buttonCompleteIn = this._buttonCompleteIn;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonMemberManage = selection.buttonMemberManage;
        var buttonPayPlanItemManage = selection.buttonPayPlanItemManage;
        var buttonContractManage = selection.buttonContractManage;
        var buttonDocumentManage = selection.buttonDocumentManage;
        var buttonDelete = selection.buttonDelete;
        var buttonWithDraw = selection.buttonWithDraw;
        var buttonTerminate = selection.buttonTerminate;
        var buttonCensorStartPass = selection.buttonCensorStartPass;
        var buttonCensorStartReject = selection.buttonCensorStartReject;
        var buttonCensorEndPass = selection.buttonCensorEndPass;
        var buttonCensorEndReject = selection.buttonCensorEndReject;
        var buttonClearDelegatePrincipal = selection.buttonClearDelegatePrincipal;
        var buttonSetDelegatePrincipal = selection.buttonSetDelegatePrincipal;
        var buttonCompleteIn = selection.buttonCompleteIn;

        var projectState = selection.projectState;

        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonMemberManage.hide();
            buttonPayPlanItemManage.hide();
            buttonContractManage.hide();
            buttonDocumentManage.hide();
            buttonDelete.hide();
            buttonCensorStartPass.hide();
            buttonCensorStartReject.hide();
            buttonCensorEndPass.hide();
            buttonCensorEndReject.hide();
            buttonClearDelegatePrincipal.hide();
            buttonSetDelegatePrincipal.hide();
            buttonCompleteIn.hide();
            return;
        }

        var project = selection.getSelected();

        buttonShow.setVisible(project.get('hasPermission_Show'));
        buttonShow.setDisabled(!project.get('canShow'));

        buttonEdit.setVisible(project.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!project.get('canEdit'));

        buttonDelete.setVisible(project.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!project.get('canDelete'));

        buttonWithDraw.setVisible(project.get('hasPermission_WithDraw'));
        buttonWithDraw.setDisabled(!project.get('canWithDraw'));

        buttonTerminate.setVisible(project.get('hasPermission_Terminate'));
        buttonTerminate.setDisabled(!project.get('canTerminate'));

        buttonMemberManage.setVisible(project.get('hasPermission_ShowProejectMember'));
        buttonMemberManage.setDisabled(!project.get('canShow_ProjectMember'));

        buttonPayPlanItemManage.setVisible(project.get('hasPermission_ShowProejectPayPlanItem'));
        buttonPayPlanItemManage.setDisabled(!project.get('canShow_ProjectPayPlanItem'));

        buttonContractManage.setVisible(project.get('hasPermission_ShowProejectContract'));
        buttonContractManage.setDisabled(!project.get('canShow_ProjectContract'));

        buttonDocumentManage.setVisible(project.get('hasPermission_ShowProejectDocument'));
        buttonDocumentManage.setDisabled(!project.get('canShow_ProjectDocument'));

        buttonCensorStartPass.setVisible(project.get('canCensorStart'));
        buttonCensorStartReject.setVisible(project.get('canCensorStart'));
        buttonCensorEndPass.setVisible(project.get('canCensorEnd'));
        buttonCensorEndReject.setVisible(project.get('canCensorEnd'));
        buttonClearDelegatePrincipal.setVisible(project.get('canClearDelegatePrincipal'));
        buttonSetDelegatePrincipal.setVisible(project.get('canSetDelegatePrincipal'));

        buttonCompleteIn.setVisible(project.get('canCompleteIn'));

    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ProjectGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectGridPanel = function(id, projectStore, title, iconCls, isHorizontal, projectState, expertAttendType, queryParams){

    //fields
    this._projectStore = projectStore;
    this._isHorizontal = isHorizontal;
    this._projectSate = projectState;
    this._projectStore.gird = this;
    this._expertAttendType = expertAttendType;
    
    //controls  
    if (expertAttendType == 'Participate') 
        this._columnModel = new Srims.projects.projectGridPanel_MyJoinProject_ColumnModel();
    else 
        this._columnModel = new Srims.projects.projectGridPanel_ColumnModel();
    
    this._selection = new Ext.grid.RowSelectionModel();
    this._filters = new Srims.projects.ProjectGridPanel_GridFilters();
    this._toolbar = new Srims.projects.ProjectGridPanel_ToolBar(this, id, queryParams);
    this._textItemFundSum = new Ext.Toolbar.TextItem('');
    
    this._bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._projectStore,
        plugins: this._filters,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录",
        items: [this._textItemFundSum]
    })
    
    var params = {};
    params.sm = this._selection;
    params.store = this._projectStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.bbar = this._bbar;
    
    //constructor
    Srims.projects.ProjectGridPanel.superclass.constructor.call(this, params);
    //event
    if (expertAttendType != 'Participate') {
        this._projectStore.on('load', function(store, records){
            if (records.fundSum == undefined || records.fundSum == null) 
                records.fundSum = records.fundReceivedSum = 0;
            
            var fundSumMessage = String.format(" 总经费：<strong>{0}</strong>，已到经费：<strong>{1}</strong>", Money.render(records.fundSum), Money.render(records.fundReceivedSum));
            Ext.get(store.gird._textItemFundSum.id).update(fundSumMessage);
        });
        this.on('celldblclick', onCellDblClick);
    }
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var project = grid.getStore().getAt(rowIndex);
        if (!project.get('canShow')) 
            return;
        Srims.projects.showProject(project);
    }
};
Ext.extend(Srims.projects.ProjectGridPanel, Srims.component.GridPanel);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryprojectGridPanel_ColumnModel = function() {
    Srims.projects.RecoveryprojectGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "凭单号",
        dataIndex: 'voucherNumber',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "项目编号",
        dataIndex: 'number',
        width: 60,
        sortable: false,
        hidden: false
    }, {
        header: "项目名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        renderer: function(value) {
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "所属学院",
        dataIndex: 'principalCollege',
        width: 40,
        sortable: true,
        hidden: true
    }, {
        header: "已分配校内经费",
        dataIndex: 'currentAllocationIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已收学校间接费用",
        dataIndex: 'receivedOverheadExpensesIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "应收学校间接费用",
        dataIndex: 'planedOverheadExpensesIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "学校间接费用差值",
        dataIndex: 'overheadExpensesInAmount',
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        header: "已收二级单位间接费用",
        dataIndex: 'receivedOverheadExpensesMiddle',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "应收二级单位间接费用",
        dataIndex: 'planedOverheadExpensesMiddle',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "二级单位间接费用差值",
        dataIndex: 'overheadExpensesMiddleAmount',
        sortable: false,
     
        renderer: Money.render
    },{
        header: "应发课题组间接费用及绩效金额",
        dataIndex: 'planedPerformancePay',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已发课题组间接费用及绩效金额",
        dataIndex: 'receivedPerformancePay',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "课题组间接费用及绩效差值",
        dataIndex: 'performancePayAmount',
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        header: "校内调整间接费用",
        dataIndex: 'recoveryAmount',
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        header: "调整前学校间接费用",
        dataIndex: 'oldOverheadExpensesIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整后学校间接费用",
        dataIndex: 'newOverheadExpensesIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    },  {
        header: "调整前项目校内课题组间接费用及绩效",
        dataIndex: 'oldPerformancePay',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整后项目校内课题组间接费用及绩效",
        dataIndex: 'newPerformancePay',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整前校内计划分配",
        dataIndex: 'oldFundPlanIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整后校内计划分配",
        dataIndex: 'newFundPlanIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整时间",
        dataIndex: 'operateTime',
        sortable: true,
        hidden: true,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        sortable: true,
        hidden: true,
    }, {
        header: "备注",
        dataIndex: 'remark',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "账本号",
        dataIndex: 'accountBookNumber',
        width: 40,
        sortable: false,
        hidden: true
    },{
        header: "是否作废",
        dataIndex: 'isCanceled',
        width: 40,
        sortable: true,
        hidden: false,
            renderer: function(value) {
            return value == true ? '<span>是</span>' : '<span>否</span>';
        }
    }, {
        header: "是否打印",
        dataIndex: 'isPrint',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "打印日期",
        dataIndex: 'printDateTime',
        width: 40,
        sortable: true,
        hidden: true,
        renderer: Date.render
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.projects.RecoveryprojectGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryprojectGridPanel_ShowColumnModel = function() {
    Srims.projects.RecoveryprojectGridPanel_ShowColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "学校间接费用差值",
        dataIndex: 'overheadExpensesInAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "二级单位间接费用差值",
        dataIndex: 'overheadExpensesMiddleAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "课题组间接费用及绩效差值",
        dataIndex: 'performancePayAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "校内调整间接费用",
        dataIndex: 'recoveryAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "凭单号",
        dataIndex: 'voucherNumber',
        width: 100,
        sortable: true,
        hidden: false
    }, {
        header: "打印状态",
        dataIndex: 'isPrint',
        width: 90,
        sortable: true,
        hidden: false
    }, {
        header: "打印日期",
        dataIndex: 'printDateTime',
        width: 120,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: '是否作废',
        dataIndex: 'isCanceled',
        width: 40,
        renderer: function(value) {
            return value == true ? '是' : '否';
        },
        sortable: true,
        hidden: false
    }, {
        header: "备注",
        dataIndex: 'remark',
        width: 100,
        sortable: true,
        hidden: false
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.projects.RecoveryprojectGridPanel_ShowColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectGridPanel_GridFilters = function() {
    Srims.projects.RecoveryProjectGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'principal'
        }, {
            type: 'string',
            dataIndex: 'name'
}]
        });
    }
    Ext.extend(Srims.projects.RecoveryProjectGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectGridPanel_ToolBar = function(gridPanel, panelId, queryParams) {

    //fields
    this._gridPanel = gridPanel;
    this._isHorizontal = gridPanel._isHorizontal;
    this._selection = gridPanel._selection;
    this._store = gridPanel._projectStore;
    this._projectState = gridPanel._projectSate;
    this._expertAttendType = gridPanel._expertAttendType;
    this._panelId = panelId;
    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.projects.showRecoveryImportWindow(this.store);
        },
        tooltip: '<b>项目导入</b><br/>将项目从excel表导入到数据库中'
    });
    this._buttonMark = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '添加间接费用调整备注',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            else {
                if (this.selection.getSelected().get('isPrint') == "已打印") {
                    Ext.Msg.show({
                        title: '不能打印',
                        msg: '本间接费用调整单已打印。',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else
                    Srims.projects.showRecoveryProject(this.selection.getSelected());
            }

        },
        hidden: false,
        tooltip: '<b>请选择一条，添加间接费用调整单备注、是否手动修改等</b><br/>对选中的间接费用调整单描述详细信息'
    });

    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        hidden: false,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            else {
                if (this.selection.getSelected().get('isPrint') == "已打印") {
                    Ext.Msg.show({
                        title: '不能打印',
                        msg: '本间接费用调整单已打印。',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    title = '打印间接费用调整单';
                    message = '你确定要打印这张间接费用调整单吗？';
                    action = 'print';
                    methodName = '/RecoveryPrint';
                    Srims.projects.printRecovery(this.selection.getSelected(), this.store, title, message, action, methodName);
                }
            }
        },
        tooltip: '<b>打印间接费用调整单</b>'
    });
    this._buttonResetPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print-reset',
        text: '重置打印',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: false,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            else {
                if (this.selection.getSelected().get('isPrint') == "未打印") {
                    Ext.Msg.show({
                        title: '未打印',
                        msg: '本间接费用调整单未打印。',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    title = '重置打印';
                    message = '你确定要重置打印这张间接费用调整单吗？';
                    action = '';
                    methodName = '/RecoveryResetPrint';
                    Srims.projects.printRecovery(this.selection.getSelected(), this.store, title, message, action, methodName);
                }
            }

        },
        tooltip: '<b>重置打印</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看项目',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.projects.showProject_Recovery(this.selection.getSelected());
        },
        hidden: false,
        tooltip: '<b>查看项目</b><br/>显示所选项目的详细信息'
    });


    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新间接费用调整单列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = [];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
            //清空筛选条件
            var filters = Ext.getCmp(this._panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var buttonItems;
    if (user.userRoleType == 'Expert')
        buttonItems = [this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh];
    else
    buttonItems = [this._buttonImport, this._buttonMark, this._buttonPrint, this._buttonResetPrint, this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh];

    Srims.projects.RecoveryProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });


    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var project = selection.getSelected();
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.RecoveryProjectGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectGridPanel = function(id, projectStore, title, iconCls, expertAttendType, queryParams) {

    //fields
    this._projectStore = projectStore;

    this._projectStore.gird = this;
    this._expertAttendType = expertAttendType;
    this._columnModel = new Srims.projects.RecoveryprojectGridPanel_ColumnModel();
    this._selection = new Ext.grid.RowSelectionModel();
    this._filters = new Srims.projects.RecoveryProjectGridPanel_GridFilters();
    this._toolbar = new Srims.projects.RecoveryProjectGridPanel_ToolBar(this, id, queryParams);
    this._textItemFundSum = new Ext.Toolbar.TextItem('');

    this._bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._projectStore,
        plugins: this._filters,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录",
        items: [this._textItemFundSum]
    })

    var params = {};
    params.sm = this._selection;
    params.store = this._projectStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.bbar = this._bbar;
    //event
    this._projectStore.on('load', function(store, records) {
        if (records.PerformanceSum == undefined || records.OverheadExpensesSum == null)
            records.PerformanceSum = records.OverheadExpensesSum = 0;

        var fundSumMessage = String.format("<font size='8px'> 总学校间接费用差值：<strong>{0}</strong>，总二级单位间接费用差值：<strong>{1}</strong>，总课题组间接费用和绩效差值：<strong>{2}</strong></font>", Money.render(records.OverheadExpensesSum), Money.render(records.OverheadExpensesMiddleSum), Money.render(records.PerformanceSum));
        Ext.get(store.gird._textItemFundSum.id).update(fundSumMessage);
    });
    //constructor
    Srims.projects.RecoveryProjectGridPanel.superclass.constructor.call(this, params);
    this.on('celldblclick', onCellDblClick);

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var project = grid.getStore().getAt(rowIndex);
        Srims.projects.showProject_Recovery(project);
    }
};
Ext.extend(Srims.projects.RecoveryProjectGridPanel, Srims.component.GridPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.RecoveryProjectStore.superclass.constructor.call(this, new Srims.projects.RecoveryProjectXmlReader(), load_url, params);
    }
});
Srims.projects.RecoveryProjectSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.projects.RecoveryProjectSimpleStore.superclass.constructor.call(this, new Srims.projects.RecoveryProjectSimpleXmlReader(), load_url, params);
    }
});
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.projects.RecoveryProjectXmlReader.superclass.constructor.call(this, Srims.projects.Recovery);
    },
    readRecords: function(responseXML) {
        var result = Srims.projects.RecoveryProjectXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.PerformanceSum = parseInt(Ext.DomQuery.selectValue("PerformanceSum", responseXML), 10);
        result.records.OverheadExpensesSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesSum", responseXML), 10);
        result.records.OverheadExpensesMiddleSum = parseInt(Ext.DomQuery.selectValue("OverheadExpensesMiddleSum", responseXML), 10);
        return result;
    }
});
Srims.projects.RecoveryProjectSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.projects.RecoveryProjectXmlReader.superclass.constructor.call(this, Srims.projects.Recovery);
    }
});if (!Srims.projects)
    Ext.namespace('Srims.projects');
Srims.projects.Recovery = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'isCanceled',
    type: 'boolean',
    mapping: 'IsCanceled',
    convert: Boolean.toBoolean
}, { name: 'pid',
    type: 'int',
    mapping: 'PID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'principalNumber',
    type: 'string',
    mapping: 'PrincipalNumber'
}, {
    name: 'principalEmail',
    type: 'string',
    mapping: 'PrincipalEmail'
}, {
    name: 'isPrincipalSecondCollege',
    type: 'string',
    mapping: 'IsPrincipalSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'principalCollege',
    type: 'string',
    mapping: 'PrincipalCollege'
}, {
    name: 'principalId',
    type: 'string',
    mapping: 'PrincipalID'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'subjectName',
    type: 'string',
    mapping: 'SubjectName'
}, {
    name: 'firstLevelSubjectId',
    type: 'string',
    mapping: 'FirstLevelSubjectID'
}, {
    name: 'firstLevelSubjectName',
    type: 'string',
    mapping: 'FirstLevelSubjectName'
}, {
    name: 'secondLevelSubjectId',
    type: 'string',
    mapping: 'SecondLevelSubjectID'
}, {
    name: 'secondLevelSubjectName',
    type: 'string',
    mapping: 'SecondLevelSubjectName'
}, {
    name: 'researchType',
    type: 'string',
    mapping: 'ResearchType'
}, {
    name: 'cooperationType',
    type: 'string',
    mapping: 'CooperationType'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'isSecret',
    type: 'boolean',
    mapping: 'IsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'baseId',
    type: 'string',
    mapping: 'BaseID'
}, {
    name: 'baseName',
    type: 'string',
    mapping: 'BaseName'
}, {
    name: 'principalDelegate',
    type: 'string',
    mapping: 'PrincipalDelegate'
}, {
    name: 'principalDelegateId',
    type: 'string',
    mapping: 'PrincipalDelegateID'
}, {
    name: 'creator',
    type: 'string',
    mapping: 'Creator'
}, {
    name: 'createDate',
    type: 'date',
    mapping: 'CreateDate'
}, {
    name: 'corporationPlace',
    type: 'string',
    mapping: 'CorporationPlace'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'taskComingFrom',
    type: 'string',
    mapping: 'TaskComingFrom'
}, {
    name: 'isHorizontal',
    type: 'boolean',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'rankId',
    type: 'int',
    mapping: 'RankID'
}, {
    name: 'rankName',
    type: 'string',
    mapping: 'RankName'
}, {
    name: 'typeId',
    type: 'int',
    mapping: 'TypeID'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'typeShortName',
    type: 'string',
    mapping: 'TypeShortName'
}, {
    name: 'supportCategoryId',
    type: 'int',
    mapping: 'SupportCategoryID'
}, {
    name: 'supportCategoryName',
    type: 'string',
    mapping: 'SupportCategoryName'
}, {
    name: 'supportFieldId',
    type: 'int',
    mapping: 'SupportFieldID'
}, {
    name: 'supportFieldName',
    type: 'string',
    mapping: 'SupportFieldName'
}, {
    name: 'supportSubFieldId',
    type: 'int',
    mapping: 'SupportSubFieldID'
}, {
    name: 'supportSubFieldName',
    type: 'string',
    mapping: 'SupportSubFieldName'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'fundAlreadyHardware',
    type: 'int',
    mapping: 'FundAlreadyHardware'
}, {
    name: 'fundAlreadyIn',
    type: 'int',
    mapping: 'FundAlreadyIn'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'fundAlreadyTotal',
    type: 'int',
    mapping: 'FundAlreadyTotal'
}, {
    name: 'fundContract',
    type: 'int',
    mapping: 'FundContract'
}, {
    name: 'fundFrom',
    type: 'string',
    mapping: 'FundFrom'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}, {
    name: 'fundPlanHardware',
    type: 'int',
    mapping: 'FundPlanHardware'
}, {
    name: 'fundPlanIn',
    type: 'int',
    mapping: 'FundPlanIn'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'overheadExpenseInTotal',
    type: 'int',
    mapping: 'OverheadExpenseInTotal'
}, {
    name: 'overheadExpenseOutTotal',
    type: 'int',
    mapping: 'OverheadExpenseOutTotal'
}, {
    name: 'overheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyIn'//校内已收间接费用
}, {
    name: 'overheadExpensesAlreadyOut',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyOut'
}, {
    name: 'overheadExpensesInStandard',
    type: 'int',
    mapping: 'OverheadExpensesInStandard'
}, {
    name: 'performancePayStandard',
    type: 'int',
    mapping: 'PerformancePayStandard'
}, {
    name: 'fundManageProportion',
    type: 'int',
    mapping: 'FundManageProportion'	//国家规定管理费比例
}, {
    name: 'planedPerformancePay',
    type: 'int',
    mapping: 'PlanedPerformancePay'//总绩效工资
}, {
    name: 'receivedPerformancePay',
    type: 'int',
    mapping: 'ReceivedPerformancePay'//已分配绩效工资
}, {
    name: 'receivedOverheadExpensesIn',
    type: 'int',
    mapping: 'ReceivedOverheadExpensesIn'	//追缴单-已收管理费
}, {
    name: 'planedOverheadExpensesIn',
    type: 'int',
    mapping: 'PlanedOverheadExpensesIn'	//追缴单-应收管理费
}, {
    name: 'currentAllocationIn',
    type: 'int',
    mapping: 'CurrentAllocationIn'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'	//凭单号
}, {
    name: 'recoveryAmount',
    type: 'int',
    mapping: 'RecoveryAmount'	//追缴金额
}, {
    name: 'performancePayAmount',
    type: 'int',
    mapping: 'PerformancePayAmount'	//追缴绩效
}, {
    name: 'overheadExpensesInAmount',
    type: 'int',
    mapping: 'OverheadExpensesInAmount'	//追缴管理费
}, {
    name: 'overheadExpensesMiddleAmount',
    type: 'int',
    mapping: 'OverheadExpensesMiddleAmount'	//追缴二级单位间接费用
}, {
    name: 'printDateTime',
    type: 'date',
    mapping: 'PrintDateTime'	//追缴单-打印时间
}, {
    name: 'isPrint',
    type: 'string',
    mapping: 'IsPrint'	//追缴单-是否已打印
}, {
    name: 'isChangeByHand',
    type: 'string',
    mapping: 'IsChangeByHand'	//追缴单-是否已打印
}, {
    name: 'performanceAmount',
    type: 'int',
    mapping: 'PerformanceAmount'	//追缴单-绩效金额
}, {
    name: 'equipmentCost',
    type: 'int',
    mapping: 'EquipmentCost'
}, {
    name: 'borrowAmount',
    type: 'int',
    mapping: 'BorrowAmount'
}, {
    name: 'returnAmount',
    type: 'int',
    mapping: 'ReturnAmount'
}, {
    name: 'projectAccountNumber',
    type: 'string',
    mapping: 'ProjectAccountNumber'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_WithDraw',
    type: 'boolean',
    mapping: 'HasPermission_WithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'canWithDraw',
    type: 'boolean',
    mapping: 'CanWithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Terminate',
    type: 'boolean',
    mapping: 'HasPermission_Terminate',
    convert: Boolean.toBoolean
}, {
    name: 'canTerminate',
    type: 'boolean',
    mapping: 'CanTerminate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectMember',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMember',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectMember',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectMember',
    type: 'boolean',
    mapping: 'CanShow_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanEdit_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanShow_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectContract',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMainContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMainContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectContract',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectContract',
    type: 'boolean',
    mapping: 'CanShow_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectContract',
    type: 'boolean',
    mapping: 'CanCensor_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectDoucment',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectDoucment',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectDocument',
    type: 'boolean',
    mapping: 'CanEdit_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectDocument',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectDocument',
    type: 'boolean',
    mapping: 'CanShow_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectDocument',
    type: 'boolean',
    mapping: 'CanCensor_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canRequire_ProjectDocument',
    type: 'boolean',
    mapping: 'CanRequire_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitStart',
    type: 'boolean',
    mapping: 'CanSubmitStart',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitEnd',
    type: 'boolean',
    mapping: 'CanSubmitEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoStart',
    type: 'boolean',
    mapping: 'CanUndoStart',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoEnd',
    type: 'boolean',
    mapping: 'CanUndoEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorStart',
    type: 'boolean',
    mapping: 'CanCensorStart',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorEnd',
    type: 'boolean',
    mapping: 'CanCensorEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canSetDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanSetDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanClearDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearProjectAccountBookNumber',
    type: 'boolean',
    mapping: 'CanClearProjectAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'planedOverheadExpensesMiddle',
    type: 'int',
    mapping: 'PlanedOverheadExpensesMiddle'
}, {
    name: 'receivedOverheadExpensesMiddle',
    type: 'int',
    mapping: 'ReceivedOverheadExpensesMiddle'
}, {
    name: 'overheadExpensesMiddleAmount',
    type: 'int',
    mapping: 'OverheadExpensesMiddleAmount'
}



]);
Srims.data.Entity.apply(Srims.projects.Recovery);if (!Srims.projects)
	Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectShowPanel = function(panelId, project) {
	// field
	this._project = project;
	this._id = panelId;//
	// controls
	this._formPanelFund = new Srims.projects.RecoveryProjectShowPanel_FundForm(panelId, project);
	// constructor
	Srims.projects.RecoveryProjectShowPanel.superclass.constructor.call(this, {
				id : this._id,
				style : 'padding:5px; width:1200px',
				closable : true,
				deferHeight : false,
				buttonAlign : 'center',
				title : this._project.get('name'),
				iconCls : 'icon-project-show',
				items: [this._formPanelFund]
});
}
Ext.extend(Srims.projects.RecoveryProjectShowPanel, Ext.Panel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectShowPanel_ToolBar = function(project){

    //fields
    this._project = project;
    this._showPanel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
    
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '打印',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.editProject(this.project);
        },
        hidden: true,
        tooltip: '<b>打印追缴单</b><br/>打印这个项目的追缴单信息'
    });
    this._buttonMemberManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '成员管理',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.showProjectMemberWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b><br/>编辑这个项目的成员信息'
    });
    this._buttonPayPlanItemManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-pay-plan-item',
        text: '付款计划管理',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.showPayPlanItemWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目付款计划</b><br/>编辑这个项目的付款计划信息'
    });
    this._buttonContractManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-contract',
        text: '合同管理',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.showContractWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目合同</b><br/>编辑这个项目的合同信息'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-document',
        text: '文档管理',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.showDocumentWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目文档</b><br/>编辑这个项目的文档信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            Ext.MessageBox.confirm('删除项目', '你确定要删除这个项目吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.deleteProject(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除项目</b><br/>删除这个项目'
    });
    this._buttonWithDraw = new Ext.Toolbar.Button({
        iconCls: 'icon-withDraw',
        text: '撤消',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!this.project) 
                return;
            
            Ext.MessageBox.confirm('撤销项目', '你确定要撤销这个项目吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.withDrawProject(this.project)
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤消项目</b><br/>撤消选中的项目'
    });
    this._buttonTerminate = new Ext.Toolbar.Button({
        iconCls: 'icon-terminate',
        text: '终止',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!this.project) 
                return;
            
            Ext.MessageBox.confirm('终止项目', '你确定要终止这个项目吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.terminateProject(this.project)
            }, this);
        },
        hidden: true,
        tooltip: '<b>终止项目</b><br/>终止选中的项目'
    });
    this._buttonCensorStartPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '通过立项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            Ext.MessageBox.show({
                title: '审核通过立项申请',
                msg: '您需要同时审核通过该项目的合同和文档吗？<br />点击“是”按钮，同时审核通过项目的合同和文档；<br />点击“否”按钮，仅审核通过项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                buttons: Ext.MessageBox.YESNOCANCEL,
                scope: this,
                fn: function(button){
                    if (button == 'yes') 
                        Srims.projects.censorStart_Pass(this.project, true);
                    if (button == 'no') 
                        Srims.projects.censorStart_Pass(this.project, false);
                },
                icon: Ext.MessageBox.QUESTION
            });
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过这个项目的立项申请'
    });
    this._buttonCensorEndPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '通过结项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            Ext.MessageBox.confirm('审核通过结项申请', '你确定要审核通过这个项目的结项申请吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.censorEnd_Pass(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过这个项目的结项申请'
    });
    this._buttonCensorStartReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '驳回立项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.rejectProjectCensor(this.project, true);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回这个项目的立项申请'
    });
    this._buttonCensorEndReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '驳回结项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.rejectProjectCensor(this.project, false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回这个项目的结项申请'
    });
    this._buttonSubmitStart = new Ext.Toolbar.Button({
        iconCls: 'icon-submit-start',
        text: '提交立项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            var flag = false;
            var msgInfo = '由于以下原因，项目立项申请可能会被驳回：<br/><br/><br/>';
            var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
            if (panel._formPanelMember._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px;">项目未指定任何成员<br/></span>';
            }
            if (panel._formPanelContract._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px">项目未提交合同<br/></span>';
            }
            if (panel._formPanelPayPlanItem._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px">项目到帐计划不完整<br/></span><br/>';
            }
            msgInfo += '建议您补充完上述信息后再提交<br/>';
            if (flag) 
                msgInfo += '你仍然要提交这个项目的立项申请吗？';
            else 
                msgInfo = '你确定要提交这个项目的立项申请吗？';
            
            Ext.MessageBox.confirm('提交立项申请', msgInfo, function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.submitStart(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交立项申请</b><br/>提交这个项目的立项申请'
    });
    this._buttonSubmitEnd = new Ext.Toolbar.Button({
        iconCls: 'icon-submit-end',
        text: '提交结项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Ext.MessageBox.confirm('提交结项申请', '你确定要提交这个项目的结项申请吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.submitEnd(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交结项申请</b><br/>提交这个项目的结项申请'
    });
    this._buttonUndoStart = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-start',
        text: '撤销立项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Ext.MessageBox.confirm('撤销立项申请', '你确定要撤销这个项目的立项申请吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.undoStart(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销立项申请</b><br/>撤销这个项目的立项申请'
    });
    this._buttonUndoEnd = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-end',
        text: '撤销结项申请',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            
            Ext.MessageBox.confirm('撤销结项申请', '你确定要撤销这个项目的结项申请吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.undoEnd(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销结项申请</b><br/>撤销这个项目的结项申请'
    });
    this._buttonClearAccountBookNumber = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-project-account-book-number',
        text: '清空账本号',
        minWidth: 60,
        project: this._project,
        handler: function(){
            if (!project) 
                return;
            Srims.projects.clearProjectAccountBookNumber(this.project);
        },
        hidden: true,
        tooltip: '<b>清空项目账本号</b><br/>清空这个项目的账本号'
    });
    this._buttonDocumentModelManage = new Ext.Toolbar.Button({
        iconCls: 'icon-Document-model-manage',
        text: '下载文档模板',
        minWidth: 60,
        project: this._project,
        handler: function(){
            Srims.type.showDocumentModelManageWindow(this.project.get('typeId'), this.project.get('typeName'), true);
        },
        tooltip: '<b>下载项目类型文档模板</b><br/>下载该项目类型的文档模板'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        project: this._project,
        handler: function(){
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: this.project.get('id')
                },
                scope: this,
                success: function(response){
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });
                    var currentProject = store.getAt(0);
                    var panel = Ext.getCmp(Srims.projects.Panel_ShowRecoveryProject_ID + currentProject.get('id'));
                    
                    panel.resetComponentValue(currentProject);
                    panel._formPanelMember._store.load();
                    panel._formPanelPayPlanItem._store.load();
                    panel._formPanelFundAllocation._store.load();
                    panel._formPanelFundBorrow._store.load();
                    panel._formPanelFundReturn._store.load();
                    panel._formPanelDocument._store.load();
                    panel._formPanelContract._store.load();
                    panel._formPanelStateHistory._store.load();
                    panel._toolBar._resetButtonVisibleAndDisabled(currentProject);
                    panel._toolBar._resetButtonProject(currentProject);
                }
            });
        },
        tooltip: '<b>刷新项目信息</b><br/>刷新项目的全部信息'
    });

    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        //store: this._store,
        project: this._project,
        hidden: true,
        handler: function() {
            titile = '打印凭单';
            message = '你确定要打印这张凭单吗？';
            action = 'print';
            methodName = '/VoucherPrint';
            if (this.voucher.get('accountBookNumber').substring(0, 4) == "9999") {
                Ext.Msg.show({
                    title: '不能打印',
                    msg: '账本号对应的学院为其它，请找超级管理员手动修改账本号。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
                Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
                Srims.fund.changeVoucherState = function(voucher, store, title, message, action, methodName, isFinanceManage) {
                    Ext.MessageBox.confirm(title, message, function(buttonId) {
                        if (buttonId == 'yes') {
                            var params = {};
                            params.voucherID = voucher.get('id');
                            Ext.Ajax.request({
                                url: Srims.service.fund.VoucherService + methodName,
                                params: params,
                                scope: this,
                                success: function(response) {
                                    store.load();
                                    var newstore = new Ext.data.Store({
                                        data: response.responseXML,
                                        reader: new Srims.fund.VoucherXmlReader()
                                    });
                                    var editedVoucher = newstore.getAt(0);
                                    var panelId = (isFinanceManage ? 'VoucherFinanceShowPanel' : 'VoucherShowPanel') + editedVoucher.get('id');
                                    if (Ext.getCmp(panelId))
                                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                                    Srims.fund.showVoucher(editedVoucher, store, isFinanceManage);
                                    if (action == 'print')
                                        window.open('VoucherPrint.aspx?VoucherID=' + voucher.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                                }
                            });
                        }
                    }, this);
                }
            }
        },
        tooltip: '<b>打印凭单</b>'
    });
    
    var user = Srims.currentLoginLog.user;
    var buttonItems = [this._buttonEdit, this._buttonPrint];
   // var buttonItems = [this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage];
    //    if (user.userRoleType == Srims.users.UserRoleType.Administrator) {
//        buttonItems[buttonItems.length] = this._buttonCensorStartPass;
//        buttonItems[buttonItems.length] = this._buttonCensorStartReject;
//        buttonItems[buttonItems.length] = this._buttonCensorEndPass;
//        buttonItems[buttonItems.length] = this._buttonCensorEndReject;
//        buttonItems[buttonItems.length] = this._buttonDocumentModelManage
//        buttonItems[buttonItems.length] = this._buttonClearAccountBookNumber;
//        buttonItems[buttonItems.length] = this._buttonWithDraw;
//        buttonItems[buttonItems.length] = this._buttonTerminate;
//    }
//    if (user.userRoleType == Srims.users.UserRoleType.Expert) {
//        buttonItems[buttonItems.length] = this._buttonSubmitStart;
//        buttonItems[buttonItems.length] = this._buttonSubmitEnd;
//        buttonItems[buttonItems.length] = this._buttonUndoStart;
//        buttonItems[buttonItems.length] = this._buttonUndoEnd;
//    }
  //  buttonItems[buttonItems.length] = [this._buttonDelete];
    buttonItems[buttonItems.length] = new Ext.Toolbar.Fill();
    buttonItems[buttonItems.length] = [this._buttonRefresh];
    Srims.projects.RecoveryProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });
    //重设button属性，外部调用
    this._resetButtonVisibleAndDisabled = function(project) {
//        this._buttonPrint.setVisible(voucher.get(''));
//        this._buttonPrint.setDisabled(!voucher.get(''));
        
        this._buttonEdit.setVisible(project.get('hasPermission_Edit'));
        this._buttonEdit.setDisabled(!project.get('canEdit'));
        
        this._buttonDelete.setVisible(project.get('hasPermission_Delete'));
        this._buttonDelete.setDisabled(!project.get('canDelete'));
        
        this._buttonWithDraw.setVisible(project.get('hasPermission_WithDraw'));
        this._buttonWithDraw.setDisabled(!project.get('canWithDraw'));
        
        this._buttonTerminate.setVisible(project.get('hasPermission_Terminate'));
        this._buttonTerminate.setDisabled(!project.get('canTerminate'));
        
        this._buttonMemberManage.setVisible(project.get('hasPermission_ShowProejectMember'));
        this._buttonMemberManage.setDisabled(!project.get('canShow_ProjectMember'));
        
        this._buttonPayPlanItemManage.setVisible(project.get('hasPermission_ShowProejectPayPlanItem'));
        this._buttonPayPlanItemManage.setDisabled(!project.get('canShow_ProjectPayPlanItem'));
        
        this._buttonContractManage.setVisible(project.get('hasPermission_ShowProejectContract'));
        this._buttonContractManage.setDisabled(!project.get('canShow_ProjectContract'));
        
        this._buttonDocumentManage.setVisible(project.get('hasPermission_ShowProejectDocument'));
        this._buttonDocumentManage.setDisabled(!project.get('canShow_ProjectDocument'));
        
        this._buttonCensorEndPass.setVisible(project.get('canCensorEnd'));
        this._buttonCensorEndReject.setVisible(project.get('canCensorEnd'));
        
        this._buttonCensorStartPass.setVisible(project.get('canCensorStart'));
        this._buttonCensorStartReject.setVisible(project.get('canCensorStart'));
        
        this._buttonSubmitStart.setVisible(project.get('canSubmitStart'));
        this._buttonSubmitEnd.setVisible(project.get('canSubmitEnd'));
        this._buttonUndoStart.setVisible(project.get('canUndoStart'));
        this._buttonUndoEnd.setVisible(project.get('canUndoEnd'));
        
        this._buttonClearAccountBookNumber.setVisible(project.get('canClearProjectAccountBookNumber'));
        this._buttonClearAccountBookNumber.setDisabled(!project.get('canClearProjectAccountBookNumber'))
    }
    this._resetButtonProject = function(project){
        this._buttonEdit.project = project;
        this._buttonDelete.project = project;
        this._buttonWithDraw.project = project;
        this._buttonTerminate.project = project;
        this._buttonMemberManage.project = project;
        this._buttonPayPlanItemManage.project = project;
        this._buttonContractManage.project = project;
        this._buttonDocumentManage.project = project;
        this._buttonCensorEndPass.project = project;
        this._buttonCensorEndReject.project = project;
        this._buttonCensorStartPass.project = project;
        this._buttonCensorStartReject.project = project;
        this._buttonSubmitStart.project = project;
        this._buttonSubmitEnd.project = project;
        this._buttonUndoStart.project = project;
        this._buttonUndoEnd.project = project;
        this._buttonDocumentModelManage.project = project;
        this._buttonClearAccountBookNumber.project = project;
    }
    this._resetButtonVisibleAndDisabled(this._project);
}
Ext.extend(Srims.projects.RecoveryProjectShowPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectShowPanel_FundForm = function(panelId, project) {
    this._project = project;
    this._fieldName = new Ext.form.Field({
        fieldLabel: '项目名称',
        value: project.get('name'),
        readOnly: true,
        width: 440
    }); //
    this._fieldNumber = new Ext.form.Field({
        fieldLabel: '项目编号',
        value: project.get('number'),
        readOnly: true,
        width: 140
    }); //
    this._fieldPrincipal = new Ext.form.Field({
        fieldLabel: '项目负责人',
        value: project.get('principal'),
        readOnly: true,
        width: 140
    }); //
    this._fieldVoucher = new Ext.form.Field({
        fieldLabel: '凭单号',
        value: project.get('voucherNumber'),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyIn = new Ext.form.Field({
        fieldLabel: '已分配校内经费',
        value: Money.render(project.get('fundAlreadyIn')),
        readOnly: true,
        width: 140
    }); //
    this._numberFieldPerformance = new Ext.form.Field({
        fieldLabel: '绩效金额',
        value: Money.render(project.get('performanceAmount')),
        readOnly: true,
        width: 140
    });
    this._fieldBorrowAmount = new Ext.form.Field({
        fieldLabel: '校内已收间接费用',
        value: Money.render(project.get('overheadExpensesAlreadyIn')),
        readOnly: true,
        width: 140
    }); //
    this._fieldReturnAmount = new Ext.form.Field({
        fieldLabel: '校内应收间接费用',
        value: Money.render(project.get('overheadExpensesAmount')),
        readOnly: true,
        width: 140
    }); //
    this._numberFieldRecovery = new Ext.form.Field({
        fieldLabel: '校内补缴间接费用',
        value: Money.render(project.get('recoveryAmount')),
        readOnly: true,
        width: 140
    }); //
    this._fieldMark = new Ext.form.Field({
        fieldLabel: '添加备注',
        value: project.get('remark'),
        allowBlank: false,
        readOnly: false,
        width: 440
    }); //
    this._checkboxIsChangeByHand = new Ext.form.Checkbox({
        fieldLabel: '是否手动修改',
        checked: project.get('isChangeByHand')
    });
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        hidden: false,
        panel: this,
        handler: function() {
        var panel = this.panel;
        if (!panel.isValid(false))
            return;
        this.setText('已保存');
        this.disable();
        panel.save();
        }
    }); //
    Srims.projects.RecoveryProjectShowPanel_FundForm.superclass.constructor.call(this, {

        collapsible: true,
        title: '间接费用调整信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        items: [new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [
             new Ext.Panel({
                 width: 600,
                 layout: 'form',
                 style: 'width:450px',
                 items: [this._fieldName]
             }),
            new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldNumber, this._fieldVoucher, this._fieldBorrowAmount, this._fieldReturnAmount]

            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',

                items: [this._fieldPrincipal, this._numberFieldPerformance, this._fieldFundAlreadyIn, this._numberFieldRecovery]
            }), new Ext.Panel({
                width: 600,
                layout: 'form',
                style: 'width:450px',
                items: [this._fieldMark]
               // items: [this._fieldMark, this._checkboxIsChangeByHand]
            })]
        })
        ], buttons: [this._buttonSave]
    });

        this.save = function() {
        var project = this._project;
        
        project.beginEdit();
        this.assginValues();
        project.commit();
     
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/RecoverySave',
            params: project.data,
            scope: this,
            success: function(response) {
            Srims.WorkSpace.getWorkSpace().remove(panelId);
//                var newstore = new Ext.data.Store({
//                    data: response.responseXML,
//                    reader: new Srims.projects.RecoveryProjectXmlReader()
//                });
//                var newproject = newstore.getAt(0);
                Srims.projects.showRecoveryProject(project);
            }
        });

    }

    this.assginValues = function() {
        this._project.set('remark', this._fieldMark.getValue());
        this._project.set('isChangeByHand', this._checkboxIsChangeByHand.getValue());
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fieldMark.isValid(preventMark) && result;
        result = this._checkboxIsChangeByHand.isValid(preventMark) && result;
        return result;
    }
}
Ext.extend(Srims.projects.RecoveryProjectShowPanel_FundForm, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEmailGridPanel = function(id, projectStore, title, iconCls){

    //fields
    this._projectStore = projectStore;
    
    //controls  
    this._selection = new Ext.grid.CheckboxSelectionModel();
    this._toolbar = new Srims.projects.ProjectEmailGridPanel_ToolBar(this._selection, this._projectStore);
    this._columnModel = new Srims.projects.ProjectEmailGridPanel_ColumnModel(this._selection);
    
    this._bbar = new Ext.PagingToolbar({
        pageSize: 9999999,
        store: this._projectStore,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录"
    })
    
    var params = {};
    params.sm = this._selection;
    params.store = this._projectStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.bbar = this._bbar;
    params.loadMask = false;
    
    var loadMask = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在加载数据......'
    });
    this._projectStore.loadMask = loadMask;
    this._projectStore.selection = this._selection;
    //事件
    this._projectStore.on('beforeload', function(){
        this.loadMask.show();
    })
    this._projectStore.on('load', function(){
        this.loadMask.hide();
        this.selection.selectAll();
    })
    Srims.projects.ProjectEmailGridPanel.superclass.constructor.call(this, params);
};
Ext.extend(Srims.projects.ProjectEmailGridPanel, Srims.component.GridPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEmailGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonEmail = new Ext.Toolbar.Button({
        iconCls: 'icon-email',
        text: '发送邮件',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            var records = this.selection.getSelections();
            var emails = [];
            for (var i = 0; i < records.length; i++) {
                var email = records[i].get('principalEmail');
                if (!Array.itemIsExistInArray(emails, email)) 
                    emails[emails.length] = email;
            }
            Srims.emailAction.sendEmail(emails.toString());
        },
        tooltip: '<b>发送邮件</b><br/>给查询项目的负责人发送邮件'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    
    Srims.projects.ProjectEmailGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEmail, new Ext.Toolbar.Fill(), this._buttonRefresh],
        height: 25
    });
}
Ext.extend(Srims.projects.ProjectEmailGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEmailGridPanel_ColumnModel = function(sm){
    Srims.projects.ProjectEmailGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        sortable: false,
        hidden: false
    }, {
        header: "负责人工作证号",
        dataIndex: 'principalNumber',
        sortable: false,
        hidden: false
    }, {
        header: "负责人Email",
        dataIndex: 'principalEmail',
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.ProjectEmailGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectQueryWindow_BasicPanel = function(isHorizontal){
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '编号',
        width: 150
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        width: 150
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._dateFieldStartDateBegin = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 150
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._dateFieldEndDateBegin = new Ext.form.DateField({
        fieldLabel: '结束时间',
        width: 150
    });
    this._dateFieldEndDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._checkboxGroupLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectLevelStore, Srims.projects.ProjectLevel.Perside)
    });
    this._checkboxGroupState = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectStateQueryStore)
    });
    this._textFieldTaskFroms = new Ext.form.TextField({
        fieldLabel: '任务来源',
        width: 150
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密'
    });
    this._comboBoxProjectSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        store: Srims.type.projectSubjectNatureStore,
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._panelCorporationPlace = new Srims.component.ProvinceCityPanel('单位地址', undefined, undefined, true);
    
    
    var columnOneItems = [this._textFieldNumber, this._textFieldPrincipal, this._dateFieldStartDateBegin, this._dateFieldEndDateBegin, this._checkboxIsSecret];
    var columnTwoItems = [this._textFieldName, this._comboBoxCollege, this._dateFieldStartDateEnd, this._dateFieldEndDateEnd];
    var columnItems = [];
    if (isHorizontal || isHorizontal == undefined) {
        columnTwoItems[columnTwoItems.length] = this._textFieldTaskFroms;
        columnOneItems[columnOneItems.length] = this._comboBoxProjectSubjectNature;
        columnItems[columnItems.length] = this._panelCorporationPlace;
    }
    else 
        columnTwoItems[columnTwoItems.length] = this._comboBoxProjectSubjectNature;
    
    columnItems[columnItems.length] = this._checkboxGroupLevel;
    columnItems[columnItems.length] = this._checkboxGroupState;
    
    Srims.projects.ProjectQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoWidth: true,
        autoHeight: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnTwoItems
            })]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: columnItems
        })]
    });
    
    this.buildParams = function(params){
        params.number = this._textFieldNumber.getValue();
        params.name = this._textFieldName.getValue();
        params.principal = this._textFieldPrincipal.getValue();
        params.principalCollege = this._comboBoxCollege.getText();
        
        var subjectNatureName = this._comboBoxProjectSubjectNature.getRawValue();
        if (!String.isEmpty(subjectNatureName)) 
            params.subjectNature = this._comboBoxProjectSubjectNature.getValue();
        else 
            params.subjectNature = ''
        
        params.startDateStart = Date.format(this._dateFieldStartDateBegin.getValue());
        params.startDateEnd = Date.format(this._dateFieldStartDateEnd.getValue());
        params.endDateStart = Date.format(this._dateFieldEndDateBegin.getValue());
        params.endDateEnd = Date.format(this._dateFieldEndDateEnd.getValue());
        params.level = this._checkboxGroupLevel.getSelecetedValue();
        params.state = this._checkboxGroupState.getSelecetedValue();
        params.isSecret = this._checkboxIsSecret.checked ? this._checkboxIsSecret.getValue() : '';
        
        if (isHorizontal || isHorizontal == undefined) {
            params.taskFroms = this._textFieldTaskFroms.getValue();
            params.corporationPlace = '';
            if (this._panelCorporationPlace._comboBox_Province.getRawValue() != '') 
                params.corporationPlace = this._panelCorporationPlace._comboBox_Province.getRawValue() + ' ' + this._panelCorporationPlace._comboBox_City.getRawValue();
        }
    }
    this.clearParams = function(){
        this._textFieldNumber.reset();
        this._textFieldName.reset();
        this._textFieldPrincipal.reset();
        this._comboBoxCollege.reset();
        this._dateFieldStartDateBegin.reset();
        this._dateFieldStartDateEnd.reset();
        this._dateFieldEndDateBegin.reset();
        this._dateFieldEndDateEnd.reset();
        this._textFieldTaskFroms.reset();
        this._checkboxGroupLevel.reset();
        this._checkboxGroupState.reset();
        this._comboBoxProjectSubjectNature.reset();
        
        if (isHorizontal) {
            this._checkboxIsSecret.reset();
            this._panelCorporationPlace._comboBox_Province.reset();
            this._panelCorporationPlace._comboBox_City.reset();
        }
    }
}
Ext.extend(Srims.projects.ProjectQueryWindow_BasicPanel, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.projects.ProjectQueryWindow_TypePanel = function(isHorizonal, isPermission){

    this._isHorizonal = isHorizonal;
    
    var loader = new Ext.tree.TreeLoader({
        dataUrl: Srims.service.type.ProjectRankService + '/GetTypeString',
        baseParams: {
            isPermission: isPermission == false ? false : true
        },
        baseAttrs: {
            uiProvider: Ext.tree.TreeCheckNodeUI
        }
    });
    var root = new Ext.tree.AsyncTreeNode({
        id: isHorizonal == undefined ? ' ' : isHorizonal ? 'true' : 'false',
        text: '项目类型选择',
        leaf: false,
        loader: loader,
        expandable: true,
        expanded: true
    });
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        root: root,
        singleExpand: false,
        autoWidth: true,
        height: isHorizonal ? 523 : 496,
        autoScroll: true,
        checkModel: 'multiple',
        onlyLeafCheckable: false,
        animate: true
    });
    tree.on('checkchange', function(node, checked){
        node.attributes.checked = checked;
        //处理父节点
        var nodeparent = node.parentNode;
        while (nodeparent != null) {
            var isChecked = isHasChildNodeChecked(nodeparent)
            nodeparent.ui.toggleCheck(isChecked);
            nodeparent.attributes.checked = isChecked;
            nodeparent = nodeparent.parentNode;
        }
        //处理子节点
        setAllChildNodeCheckedToFlase(node, checked);
        //以后学习参考，勿删
        //node.eachChild(function(child){
        //  child.ui.toggleCheck(false);
        // child.attributes.checked = false;
        // child.fireEvent('checkchange', child, false);
        //});
    
    }, tree);
    function setAllChildNodeCheckedToFlase(node, checked){
        node.ui.toggleCheck(checked);
        node.attributes.checked = checked;
        
        var childNodes = node.childNodes;
        if (childNodes.length == 0) 
            return;
        
        for (var i = 0; i < childNodes.length; i++) {
            childNodes[i].ui.toggleCheck(false);
            childNodes[i].attributes.checked = false;
            setAllChildNodeCheckedToFlase(childNodes[i], false);
        }
    }
    function isHasChildNodeChecked(node){
        var childNodes = node.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].attributes.checked) 
                return true;
        }
        
        return false;
    }
    
    Srims.projects.ProjectQueryWindow_TypePanel.superclass.constructor.call(this, {
        title: '类型信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoScroll: true,
        width: 300,
        items: tree
    });
    
    this.buildParams = function(params){
        params.rankName = '';
        params.typeName = '';
        params.supportCategoryName = '';
        params.supportFieldName = '';
        params.supportSubFieldName = '';
        
        var rankNodes = root.childNodes;
        if (rankNodes == null) 
            return;
        for (var i = 0; i < rankNodes.length; i++) {
            if (rankNodes[i].attributes.checked) {
                params.rankName += rankNodes[i].text + ',';
                var typeNodes = rankNodes[i].childNodes;
                if (typeNodes == null) 
                    continue;
                for (var j = 0; j < typeNodes.length; j++) {
                    if (typeNodes[j].attributes.checked) {
                        params.typeName += typeNodes[j].text + ',';
                        
                        var supportCategoryNodes = null;
                        var supportFieldNodes = null;
                        if (typeNodes[j].firstChild != null) 
                            supportCategoryNodes = typeNodes[j].firstChild.childNodes;
                        if (typeNodes[j].lastChild != null) 
                            supportFieldNodes = typeNodes[j].lastChild.childNodes;
                        if (supportCategoryNodes == null && supportFieldNodes == null) 
                            continue;
                        if (supportCategoryNodes != null) 
                            for (var k = 0; k < supportCategoryNodes.length; k++) {
                                if (supportCategoryNodes[k].attributes.checked) {
                                    params.supportCategoryName += supportCategoryNodes[k].text + ',';
                                }
                            }
                        if (supportFieldNodes != null) 
                            for (var m = 0; m < supportFieldNodes.length; m++) {
                                if (supportFieldNodes[m].attributes.checked) {
                                    params.supportFieldName += supportFieldNodes[m].text + ',';
                                    var supportSubFieldNodes = supportFieldNodes[m].childNodes;
                                    if (supportSubFieldNodes == null) 
                                        continue;
                                    for (var n = 0; n < supportSubFieldNodes.length; n++) {
                                        if (supportSubFieldNodes[n].attributes.checked) {
                                            params.supportSubFieldName += supportSubFieldNodes[n].text + ',';
                                        }
                                    }
                                }
                            }
                    }
                }
            }
        }
    }
    this.clearParams = function(){
        setAllChildNodeCheckedToFlase(root, false);
        
    }
}
Ext.extend(Srims.projects.ProjectQueryWindow_TypePanel, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectQueryWindow_FundPanel = function(){

    this._textFieldFundFroms = new Ext.form.TextField({
        fieldLabel: '资金来源',
        width: 280
    });
    this._numberFieldFundTotalBegin = new Srims.component.MoneyField({
        fieldLabel: '到校经费(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundTotalEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractBegin = new Srims.component.MoneyField({
        fieldLabel: '合同额(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundReceiedBegin = new Srims.component.MoneyField({
        fieldLabel: '已到经费(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundReceivedEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._checkboxIsBorrowMoney = new Ext.form.Checkbox({
        fieldLabel: '借款'
    });
    this._checkboxIsNotReturnAll = new Ext.form.Checkbox({
        fieldLabel: '未还清借款'
    });
    Srims.projects.ProjectQueryWindow_FundPanel.superclass.constructor.call(this, {
        title: '经费信息',
        frame: true,
        layout: 'form',
        labelWidth: 100,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 100,
                items: [this._numberFieldFundTotalBegin, this._numberFieldFundContractBegin, this._numberFieldFundReceiedBegin, this._checkboxIsNotReturnAll]
            }), new Ext.Panel({
                labelWidth: 30,
                layout: 'form',
                items: [this._numberFieldFundTotalEnd, this._numberFieldFundContractEnd, this._numberFieldFundReceivedEnd, this._checkboxIsBorrowMoney]
            })]
        }), this._textFieldFundFroms]
    });
    
    this.buildParams = function(params){
        params.fundFroms = this._textFieldFundFroms.getValue();
        params.fundTotalStart = this._numberFieldFundTotalBegin.getMoney();
        params.fundTotalEnd = this._numberFieldFundTotalEnd.getMoney();
        params.fundContractStart = this._numberFieldFundContractBegin.getMoney();
        params.fundContractEnd = this._numberFieldFundContractEnd.getMoney();
        params.fundReceivedStart = this._numberFieldFundReceiedBegin.getMoney();
        params.fundReceivedEnd = this._numberFieldFundReceivedEnd.getMoney();
        params.isBorrowMoney = this._checkboxIsBorrowMoney.checked ? this._checkboxIsBorrowMoney.getValue() : '';
        params.isNotReturnAll = this._checkboxIsNotReturnAll.checked ? this._checkboxIsNotReturnAll.getValue() : '';
    }
    this.clearParams = function(){
        this._textFieldFundFroms.reset();
        this._numberFieldFundTotalBegin.reset();
        this._numberFieldFundTotalEnd.reset();
        this._numberFieldFundContractBegin.reset();
        this._numberFieldFundContractEnd.reset();
    }
}
Ext.extend(Srims.projects.ProjectQueryWindow_FundPanel, Ext.FormPanel);


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectQueryWindow = function(id, store, isHorizontal, queryParams){

    this._id = id;
    this._store = store;
    this._isHorizontal = isHorizontal;
    
    this._basicPanel = new Srims.projects.ProjectQueryWindow_BasicPanel(this._isHorizontal);
    this._typePanel = new Srims.projects.ProjectQueryWindow_TypePanel(this._isHorizontal, true);
    this._fundPanel = new Srims.projects.ProjectQueryWindow_FundPanel();
    this._memberPanel = new Srims.component.QueryWindow_MemberPanel('项目成员信息');
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.getGridPanel();
            this.window.clearParams();
            
            Srims.SetQueryParams.clearParams(queryParams, new Array('isHorizontal', 'token'));
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            
            window.getParams();
            if (isHorizontal) 
                Srims.common.newView(Srims.common.ViewType.HorizontalProjectQuery, Srims.SetQueryParams.toJSON(queryParams));
            else 
                Srims.common.newView(Srims.common.ViewType.VerticalProjectQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            if (isHorizontal) 
                Srims.common.showViewWindow(Srims.common.ViewType.HorizontalProjectQuery);
            else 
                Srims.common.showViewWindow(Srims.common.ViewType.VerticalProjectQuery);
            
            this.window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.projects.ProjectQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isHorizontal ? '横向项目查询' : '纵向项目查询',
        iconCls: isHorizontal ? 'icon-project-horizontal-query' : 'icon-project-vertical-query',
        width: 850,
        height: 610,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        stateful: false,
        resizable: false,
        items: [new Ext.Panel({
            width: 520,
            layout: 'form',
            autoScroll: true,
            height: 535,
            labelWidth: 100,
            autoScroll: true,
            items: [this._basicPanel, this._fundPanel, this._memberPanel]
        }), new Ext.Panel({
            layout: 'form',
            autoScroll: true,
            labelWidth: 100,
            items: [this._typePanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    });
    
    this.getParams = function(){
        this._basicPanel.buildParams(queryParams);
        this._fundPanel.buildParams(queryParams);
        this._memberPanel.buildParams(queryParams);
        this._typePanel.buildParams(queryParams);
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._fundPanel.clearParams();
        this._memberPanel.clearParams();
        this._typePanel.clearParams();
    }
    this.getGridPanel = function(){
        var gridPanelID = this._isHorizontal ? Srims.projects.GridPanl_HorizontalProjectList_ID : Srims.projects.GridPanl_VerticalProjectList_ID;
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
    }
    this.query = function(button){
        var window = button.window;
        window.getGridPanel();
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
    //event
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.projects.ProjectQueryWindow, Ext.Window);


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_SecretProjectMessagePanel = function(){
    Srims.projects.ProjectEditPanel_SecretProjectMessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: Srims.currentUser.hasPermission_AddSecretProject,
        html: '<span style="color:#FF0000">注意：如果项目信息涉密，请直接提交书面材料至科技处！</span>'
    });
}
Ext.extend(Srims.projects.ProjectEditPanel_SecretProjectMessagePanel, Ext.Panel);
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
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_FundForm = function(project, formBasic,
		formType, projectOutPanel) {
    this._project = project;
    this._formBasic = formBasic;
    this._formType = formType;
    this._formFund = this;
    this._projectOutPanel = projectOutPanel;

    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    this._numberFieldFundContract = new Srims.component.MoneyField({
        fieldLabel: '项目合同额(万元)',
        value: project.get('fundContract'),
        allowBlank: false,
        width: 120
    });
    this._fieldOverheadExpensesInStandard = new Srims.component.MoneyField({
        fieldLabel: '校内基准间接费',
        value: project.get('overheadExpensesInStandard'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 120
    });
    this._numberFieldFundTotal = new Srims.component.MoneyField({
        fieldLabel: '到校经费(万元)',
        value: project.get('fundTotal'),
        allowBlank: false,
        disabled: project.get('level') == Srims.projects.ProjectLevel.Perside,
        width: 120
    });
    this._numberFieldFundPlanIn = new Srims.component.MoneyField({
        fieldLabel: '计划校内分配(万元)',
        value: project.get('fundPlanIn'), //
        allowBlank: false,
        disabled: true,
        width: 120
    });
    var amountA = 0;

    this._numberFieldFundPlanOut = new Srims.component.MoneyField({
        fieldLabel: '计划外协分配(万元)',
        value: project.get('fundPlanOut'),
        allowBlank: false,
        disabled: true,
        width: 120
    });

    this._numberFieldOverheadExpenseInTotal = new Srims.component.MoneyField({
        fieldLabel: '校内合同间接费(万元)',
        value: project.get('campusIndirectCosts'),
        disabled: Srims.currentUser.isExpert,
        allowBlank: false,
        readOnly: Srims.currentUser.isExpert,
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._numberFieldOverheadExpenseOutTotal = new Srims.component.MoneyField({
        fieldLabel: '外协分配管理费(万元)',
        value: project.get('overheadExpenseOutTotal'),
        disabled: !Srims.currentUser.isSuper,
        allowBlank: false,
        hidden: (userIsExpert && project.get('isHorizontal')) || (!project.get('isHorizontal')),
        hideLabel: (userIsExpert && project.get('isHorizontal')) || (!project.get('isHorizontal')),
        width: 120
    });
    this._percentFieldFundManageProportion = new Srims.component.PercentField({
        fieldLabel: '国家规定管理费比例',
        value: project.get('fundManageProportion'),
        allowBlank: false,
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 120
    });
    this._numberFieldPerformancePay = new Srims.component.MoneyField({
        fieldLabel: '校内合同绩效(万元)',
        value: project.get('performancePay') + 0,
        disabled: Srims.currentUser.isExpert,
        allowBlank: false,
        readOnly: Srims.currentUser.isExpert,
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._numberFieldPerformancePayAlready = new Srims.component.MoneyField({
        fieldLabel: '已分配绩效工资(万元)',
        value: project.get('performancePayAlready'),
        disabled: !Srims.currentUser.isSuper,
        allowBlank: false,
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 120
    });
    this._textFieldFundFrom = new Ext.form.TextField({
        fieldLabel: '经费来源',
        value: project.get('fundFrom'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300
    });
    this._textFieldFundFromUnit = new Ext.form.TextField({
        fieldLabel: '来款单位',
        value: project.get('fundFromUnit'),
        width: 300
    });
    this._textFieldFundFromUnitAddress = new Ext.form.TextField({
        fieldLabel: '来款单位地址',
        value: project.get('fundFromUnitAddress'),
        width: 420
    });
    this._numberFieldEquipmentCost = new Srims.component.MoneyField({
        fieldLabel: '总设备购置费(万元)',
        value: project.get('equipmentCost'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        allowBlank: false,
        width: 120
    });
    this._fieldPerformancePayStandard = new Srims.component.MoneyField({
        fieldLabel: '校内基准绩效',
        value: project.get('performancePayStandard'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 120
    });
    this._fieldProjectOverheadExpensesTotal = new Srims.component.MoneyField({
        fieldLabel: '项目总间接费',
        value: project.get('indirectCosts'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    this._fieldProjectPerformanceTotal = new Srims.component.MoneyField({
        fieldLabel: '项目总绩效',
        value: project.get('projectPerformancePay'),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 120
    });
    Srims.projects.ProjectEditPanel_FundForm.superclass.constructor.call(this,
			{
			    collapsible: true,
			    title: '经费信息',
			    autoHeight: true,
			    frame: true,
			    labelWidth: 140,
			    bodyStyle: 'padding:5px 5px 0',
			    style: 'margin-bottom: 2px',
			    defaultType: 'textfield',
			    titleCollapse: true,
			    listeners: {
			        afterlayout: function(panel) {
			            if (userIsExpert)
			                if (panel._projectOutPanel) {
			                var amount = panel._projectOutPanel._amounts;
			                panel._numberFieldFundPlanOut.setValue(amount);
			            }

			        }
			    },
			    items: [
						new Ext.Panel({
						    widht: 600,
						    layout: 'column',
						    items: [new Ext.Panel({
						        width: 300,
						        layout: 'form',
						        style: 'width:300px',
						        items: [
										this._numberFieldFundContract,
										this._numberFieldFundPlanIn,
										this._numberFieldEquipmentCost,
										this._fieldProjectOverheadExpensesTotal,
										this._numberFieldOverheadExpenseInTotal,
										this._fieldOverheadExpensesInStandard

							]
						    }), new Ext.Panel({
						        width: 300,
						        style: 'width:300px',
						        layout: 'form',
						        items: [
										this._numberFieldFundTotal,
										this._numberFieldFundPlanOut,
										this._numberFieldOverheadExpenseOutTotal,
										this._fieldProjectPerformanceTotal,
										this._numberFieldPerformancePay,
										this._fieldPerformancePayStandard

										]
						    })]
						}), this._textFieldFundFrom,
						this._textFieldFundFromUnit,
						this._textFieldFundFromUnitAddress]

			});


    // method
    this.assginValues = function() {
        this._project.set('fundContract', this._numberFieldFundContract
						.getMoney());
        this._project.set('fundTotal', this._numberFieldFundTotal.getMoney());
        this._project.set('fundPlanIn', this._numberFieldFundPlanIn.getMoney());
        this._project.set('indirectCosts', this._fieldProjectOverheadExpensesTotal.getMoney());
        this._project.set('projectPerformancePay', this._fieldProjectPerformanceTotal.getMoney());
        this._project.set('fundPlanOut', this._numberFieldFundPlanOut
						.getMoney());
        this._project.set('overheadExpenseInTotal',
				this._numberFieldOverheadExpenseInTotal.getMoney() - this._numberFieldPerformancePay.getMoney());
        if (this._numberFieldOverheadExpenseOutTotal.getMoney())
            this._project.set('overheadExpenseOutTotal', this._numberFieldOverheadExpenseOutTotal.getMoney());
        else
            this._project.set('overheadExpenseOutTotal', 0);
        //this._numberFieldOverheadExpenseOutTotal.getMoney());
        this._project.set('fundManageProportion',
				this._percentFieldFundManageProportion.getValue());
        this._project.set('performancePay', this._numberFieldPerformancePay
						.getMoney());
        this._project.set('performancePayAlready', 0);
        this._project.set('fundFrom', this._textFieldFundFrom.getValue());
        this._project.set('fundFromUnit', this._textFieldFundFromUnit
						.getValue());
        this._project.set('fundFromUnitAddress',
				this._textFieldFundFromUnitAddress.getValue());
        this._project.set('equipmentCost',
				this._numberFieldEquipmentCost.getMoney());
        this._project.set('projectPerformancePay', this._fieldProjectPerformanceTotal.getMoney());
        this._project.set('campusIndirectCosts', this._numberFieldOverheadExpenseInTotal.getMoney());
        
    }
    this.isValid = function(preventMark) {
        var result = true;
        //result = this._Amount.isValid(preventMark) && result;
        if (project.get('isHorizontal')) {
            result = this._numberFieldFundContract.isValid(preventMark) && result;


        }
        else {
            result = this._numberFieldFundContract.isValid(preventMark) && result;
            result = this._numberFieldFundTotal.isValid(preventMark) && result;
            result = this._numberFieldFundPlanIn.isValid(preventMark) && result;
            result = this._numberFieldFundPlanOut.isValid(preventMark) && result;
            result = this._numberFieldOverheadExpenseInTotal.isValid(preventMark)
				&& result;
            result = this._numberFieldEquipmentCost.isValid(preventMark) && result;
            //            result = this._numberFieldOverheadExpenseOutTotal.isValid(preventMark)
            //				&& result;
            result = this._percentFieldFundManageProportion.isValid(preventMark)
				&& result;
            result = this._numberFieldPerformancePay.isValid(preventMark) && result;
            result = this._fieldProjectPerformanceTotal.isValid(preventMark) && result;
            //		&& result;
        }

        return result;
    }
    this.validateOverheadExpenseIn = function() {
        if (this._numberFieldFundPlanIn.getMoney() >= this._numberFieldOverheadExpenseInTotal
				.getMoney())
            return true;

        Ext.Msg.show({
            title: '校内管理费错误',
            msg: '校内管理费不能大于项目的计划校内分配',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }
    this.validateOverheadExpenseOut = function() {
        if (this._numberFieldFundPlanOut.getMoney() >= this._numberFieldOverheadExpenseOutTotal
				.getMoney())
            return true;

        Ext.Msg.show({
            title: '外协管理费错误',
            msg: '外协管理费不能大于项目的计划外协分配',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.WARNING
        });
        return false;
    }

    // 获取新提出的管理费方案中的费率
    this.getManagementFees = function(managementFeeType,
			projectType_RateFieldName, projectTypeId, projectRankId, fundTotal, arriveSchoolFee, deviceCost, contractTotal) {
        if (userIsExpert)
            return 0;
        var params = {};
        var result = {};
        var managementFee_Fee = undefined;
        var managementFee_PerformancePay = undefined;
        var managementFee = undefined;

        if (managementFeeType == undefined || fundTotal == undefined
				|| projectType_RateFieldName == undefined || isNaN(fundTotal)
				|| fundTotal == '')
            return 0;
        params.ManagementFeeType = managementFeeType;
        params.paraType = projectType_RateFieldName;
        params.projectTypeId = projectTypeId;
        params.projectLevel = projectRankId;
        params.fundTotal = Math.round(fundTotal * 10000 * 1000000 / 10000);
        params.arriveSchoolFee = Math.round(arriveSchoolFee * 10000 * 1000000 / 10000);
        params.deviceCost = Math.round(deviceCost * 10000 * 1000000 / 10000);
        params.contractTotal = Math.round(contractTotal * 10000 * 1000000 / 10000);

        var conn = Ext.lib.Ajax.getConnectionObject().conn;
        var url = Srims.service.type.ManagementFeesService
				+ '/GetAllManagementFeesByType';
        // 以GET方式发送参数在IE浏览器下无法获取返回值，需要添加Header属性使用POST方法
        conn.open('POST', url, false);
        conn.setRequestHeader("Content-Type",
				"application/x-www-form-urlencoded;charset=UTF-8");
        conn.send('ManagementFeeType=' + params.ManagementFeeType
				 + '&paraType=' + params.paraType
				 + '&projectTypeId=' + params.projectTypeId
				 + '&projectLevel=' + params.projectLevel
				 + '&fundTotal=' + params.fundTotal
				 + '&arriveSchoolFee=' + params.arriveSchoolFee
				 + '&deviceCost=' + params.deviceCost
				 + '&contractTotal=' + params.contractTotal);
        if (conn.status == '200') {
            var rateResult = conn.responseText;
            if (!isNaN(rateResult))
                return parseInt(rateResult);
        }
        //        Ext.Msg.show({
        //            title: '费率获取错误',
        //            msg: '无法获取对应的管理费率，将按照0来计算',
        //            buttons: Ext.Msg.OK,
        //            icon: Ext.MessageBox.WARNING
        //        });

        return 0;
    }
    this.getOverheadExpenseRate = function(projectType_RateFieldName, newValue) {
        var projectType = formType._comboBoxType.getEntity();
        var projectSupportCategory = formType._comboBoxSupportCategory
				.getEntity();

        if (projectType == undefined)
            return undefined;

        // 考虑某些资助类别不收取管理费的情况
        if (projectSupportCategory != undefined
				&& !projectSupportCategory.get('isGetOverheadExpense'))
            return 0;
        // 原8521费率
        /*
        * if (projectType.get('isBudget') && projectType_RateFieldName ==
        * 'overheadExpenseInRate') return this.getOverheadExpenseBudgetRate();
        */
        if (projectType_RateFieldName == 'overheadExpensePerformancePayRate'
				|| projectType_RateFieldName == 'overheadExpenseInRate') {
            var managementFeeType = projectType.get('managementFeesType');
            var projectTypeId = projectType.get('id');
            var projectRankId = formBasic._comboBoxLevel.getValue();
            var fundTotal = this._numberFieldFundPlanIn.getValue();
            var arriveSchoolFee = this._numberFieldFundTotal.getValue();
            var deviceCost = this._numberFieldEquipmentCost.getValue();
            var contractTotal = this._numberFieldFundContract.getValue();

            return this.getManagementFees(managementFeeType,
					projectType_RateFieldName, projectTypeId, projectRankId, fundTotal, arriveSchoolFee, deviceCost, contractTotal).div(10000);
        }

        return projectType.get(projectType_RateFieldName).div(10000); // 百分数以万分之一为单位
    }
    // 此函数暂时不用啦啦啦
    this.getOverheadExpenseBudgetRate = function() {
        var fundContract = parseFloat(this._numberFieldFundContract.getValue())
				* 10000 * 100;
        var baseLine = [0, 100 * 100 * 10000, 500 * 100 * 10000,
				1000 * 100 * 10000];
        var baseRate = [0.08, 0.05, 0.02, 0.01];

        var i = 0;
        var rate = 0;

        for (i = 1; i <= (parseInt(baseLine.length, 10) - 1)
				&& parseFloat(baseLine[i]) < fundContract; i++) {
            var baselineValue1 = parseFloat(baseLine[i]);
            var baselineValue2 = parseFloat(baseLine[i - 1]);
            var baseRateValue1 = parseFloat(baseRate[i - 1]);
            rate += (parseFloat((baselineValue1).sub(baselineValue2)))
					.mul(baseRateValue1);
        }

        var baseLineValue = parseFloat(baseLine[i - 1]);
        var baseRateValue = parseFloat(baseRate[i - 1]);
        var fundLeveal = parseFloat((parseFloat((fundContract)
				.sub(baseLineValue))).mul(baseRateValue));
        var overheadExpenseAll = parseFloat(((parseFloat(rate)).add(fundLeveal)))

        return parseFloat((overheadExpenseAll).div(fundContract));
    }

    this.updateOverheadExpense = function() {
        if (this._numberFieldFundPlanIn.getValue() != '')
            this._onNumberFieldFundPlan_Change(this._numberFieldFundPlanIn,
        					this._numberFieldFundPlanIn.getValue(), '');

        if (this._numberFieldFundPlanOut.getValue() != '')
            this._onNumberFieldFundPlan_Change(this._numberFieldFundPlanOut,
        					this._numberFieldFundPlanOut.getValue(), '');
    }

    // event method
    this._onFormBasic_ProjectLevel_Select = function(comboBox_ProjectLevel) {
        var numberFieldFundContract = comboBox_ProjectLevel.formFund._numberFieldFundContract;
        var numberFieldFundTotal = comboBox_ProjectLevel.formFund._numberFieldFundTotal;

        if (comboBox_ProjectLevel.getValue() == Srims.projects.ProjectLevel.Perside) {
            var oldValue = numberFieldFundTotal.getValue();
            var newValue = numberFieldFundContract.getValue();
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.disable();
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        } else if (comboBox_ProjectLevel.getValue() == Srims.projects.ProjectLevel.Join) {
            var oldValue = numberFieldFundTotal.getValue();
            var newValue = numberFieldFundContract.getValue();
            numberFieldFundTotal.enable();
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue); //参与 函数
        }
        else {
            numberFieldFundTotal.enable();
        }
    }
    this._onFormType_Type_Selelct = function(comboBox) {
        if (comboBox.getValue() == undefined)
            return;
        comboBox.formFund._numberFieldOverheadExpenseOutTotal.setValue(0);
        //如果是类型是科技转让，则没有外协经费，经费为0.（2013、2、23）
        if (comboBox.getValue() == 3) {
            var formFund = comboBox.formFund;
            formFund._numberFieldFundPlanIn.setDisabled(true);
            formFund._numberFieldFundPlanOut.setDisabled(true);
            formFund._numberFieldFundPlanOut.setValue(0);
            formFund._numberFieldFundPlanIn.setValue(formFund._numberFieldFundTotal.getMoney() / 1000000);
            return;
        }

        else {
            var formFund = comboBox.formFund;


            if (userIsExpert) {
                if (formFund._projectOutPanel) {
                    var amount = formFund._projectOutPanel._amounts;
                    formFund._numberFieldFundPlanOut.setValue(amount);
                }
            }
            else {
                var amountB = 0;
                var outStore = formFund.parentPanel._projectOutPanel._store;
                var projectOuts = outStore.getRange();
                for (var i = 0; i < projectOuts.length; i++) {
                    amountB += projectOuts[i].get('amount');
                }

                formFund._numberFieldFundPlanOut.setValue(amountB);
            }

        }
        comboBox.formFund._numberFieldFundPlanIn.setValue((comboBox.formFund._numberFieldFundTotal.getMoney() - comboBox.formFund._numberFieldFundPlanOut.getMoney()) / 1000000); //3.2wanshang 
        comboBox.formFund.updateOverheadExpense();
    }
    this._onFormBasic_TaskComingFrom_Change = function(textFieldTaskComingFrom,
			newValue, oldValue) {
        var formFund = textFieldTaskComingFrom.formFund;
        var textFieldFundFrom = formFund._textFieldFundFrom;
        var textFieldFundFromUnit = formFund._textFieldFundFromUnit;

        if (textFieldFundFrom.getValue() == ''
				|| textFieldFundFrom.getValue() == oldValue)
            textFieldFundFrom.setValue(newValue);
        if (textFieldFundFromUnit.getValue() == ''
				|| textFieldFundFromUnit.getValue() == oldValue)
            textFieldFundFromUnit.setValue(newValue);
    }
    /////合同额变化
    this._onNumberFieldFundContract_Change = function(numberFieldFundContract,
			newValue, oldValue) {
        var formFund = numberFieldFundContract.formFund;
        var numberFieldFundTotal = numberFieldFundContract.numberFieldFundTotal;

        formFund.updateOverheadExpense();

        if (numberFieldFundTotal.getValue() == oldValue) {
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        }
    }
    this._numberFieldEquipmentCost_Change = function(numberFieldEquipmentCost, newValue, oldValue) {
        var formFund = numberFieldEquipmentCost.formFund;
        var numberFieldFundTotal = numberFieldEquipmentCost.numberFieldFundTotal;

        formFund.updateOverheadExpense();

        if (numberFieldFundTotal.getValue() == oldValue) {
            numberFieldFundTotal.setValue(newValue);
            numberFieldFundTotal.fireEvent('change', numberFieldFundTotal,
					newValue, oldValue);
        }
    }
    /////到校经费变化
    this._onNumberFieldFundTotal_Change = function(numberFieldFundTotal,
			newValue, oldValue) {
        var formFund = numberFieldFundTotal.formFund; //3.2晚上
        var numberFieldFundPlanIn = numberFieldFundTotal.numberFieldFundPlanIn;
        var numberFieldFundPlanOut = numberFieldFundTotal.numberFieldFundPlanOut;
        var numberFieldFundPlanIn_OldValue = numberFieldFundPlanIn.getValue();
        var numberFieldFundPlanOut_OldValue = numberFieldFundPlanOut.getValue();

        var isAllocatedEmpty = numberFieldFundPlanIn_OldValue == ''
        				&& numberFieldFundPlanOut_OldValue == '';
        var isAllocatedDefault = numberFieldFundPlanIn_OldValue == oldValue
        				&& numberFieldFundPlanOut_OldValue == '0';

        if (isAllocatedEmpty || isAllocatedDefault) {
            numberFieldFundPlanIn.setValue(newValue);
            numberFieldFundPlanIn.fireEvent('change', numberFieldFundPlanIn,
        					newValue, numberFieldFundPlanIn_OldValue);

            numberFieldFundPlanOut.setValue(0);
            numberFieldFundPlanOut.fireEvent('change', numberFieldFundPlanOut,
        					'0', numberFieldFundPlanOut_OldValue);
        }
        //3.2晚上
        formFund._numberFieldFundPlanIn.setValue((formFund._numberFieldFundTotal.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000);
        formFund.updateOverheadExpense();
    }
    this._onNumberFieldFundPlan_Change = function(numberFieldPlan, newValue,
			oldValue, SycnOtherPlanItem) {
        var formFund = numberFieldPlan.formFund;
        var numberFieldOverheadExpense = numberFieldPlan.numberFieldOverheadExpense;
        var projectType_RateFieldName = numberFieldPlan.projectType_RateFieldName;

        // 同步校内和外协，使其和等于总经费
        //        if (SycnOtherPlanItem == undefined) {
        //            var fundTotal = parseFloat(formFund._numberFieldFundTotal
        //					.getValue());
        //            var otherFundPlan = fundTotal.sub(parseFloat(newValue));
        //            if (otherFundPlan < 0)
        //                otherFundPlan = undefined;

        //            var otherPlanItem = numberFieldPlan.otherPlanItem;
        //            var otherFundPlan_OldValue = otherPlanItem.getValue();

        //            otherPlanItem.setValue(otherFundPlan);
        //            otherPlanItem.fireEvent('change', otherPlanItem, otherFundPlan,
        //					otherFundPlan_OldValue, true);

        //            formFund._numberFieldFundTotal.validate();
        //        }

        var overheadExpenseRate = formFund.getOverheadExpenseRate(
				projectType_RateFieldName, newValue);

        // 无法计算管理费的情况
        if ((newValue != '0' && newValue == '')
				|| overheadExpenseRate == undefined) {
            if (numberFieldOverheadExpense.getValue() != ''
					|| numberFieldOverheadExpense.getValue() == '0') {
                numberFieldOverheadExpense.setValue('');
            }
            return;
        }

        // 为判断是否已经手工指定准备条件
        var overheadExpense_Old = numberFieldOverheadExpense.getValue();
        var isForceReCalculate = oldValue == '';
        var isOldEmpty = overheadExpense_Old == '';
        var isOldDefault = parseFloat(overheadExpense_Old) == parseFloat(oldValue)
				.mul(overheadExpenseRate).toFixed(6);
        // 判断费用 有没有更改
        var isChange = parseFloat(overheadExpense_Old) != parseFloat(newValue)
				.mul(overheadExpenseRate).toFixed(6);

        // 如果不是手工指定，即为空或为默认
        if (isForceReCalculate || isOldEmpty || isOldDefault || isChange) {
            var overheadExpense_New = parseFloat(newValue)
					.mul(overheadExpenseRate);
            numberFieldOverheadExpense.setValue(overheadExpense_New);
            numberFieldOverheadExpense.fireEvent('change',
					numberFieldOverheadExpense, overheadExpense_New,
					overheadExpense_Old);
            numberFieldOverheadExpense.beforeBlur();
        }

        // 处理总绩效工资
        if (projectType_RateFieldName == 'overheadExpenseInRate') {
            numberFieldPlan.numberFieldOverheadExpense = formFund._fieldPerformancePayStandard;
            numberFieldPlan.projectType_RateFieldName = 'overheadExpensePerformancePayRate';
            numberFieldPlan.fireEvent('change', numberFieldPlan, newValue,
            		oldValue, true);
            numberFieldPlan.numberFieldOverheadExpense = formFund._fieldOverheadExpensesInStandard;
            numberFieldPlan.projectType_RateFieldName = 'overheadExpenseInRate';
            var rankId = formType._comboBoxType.getEntity();
            var isBudget = rankId.get('isBudget');
            if (!isBudget) {
                formFund._numberFieldPerformancePay.setValue(formFund._fieldPerformancePayStandard.getValue());
                formFund._numberFieldOverheadExpenseInTotal.setValue(formFund._fieldOverheadExpensesInStandard.getValue());
            }
        }

    }
    this._numberFieldFundContract_Validator = function(value) {
        var formFund = this.formFund;
        formFund._numberFieldFundPlanIn.setValue((formFund._numberFieldFundTotal.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000);
        if (this.getMoney() < formFund._numberFieldFundPlanOut.getMoney()) {
            this.invalidText = '合同额应大于预分配外协经费。';
            return false;
        }

        return true;
    }

    // validator
    this._numberFieldFundTotal_Validator = function(value) {
        var formFund = this.formFund;
        formFund._numberFieldFundPlanIn.setValue((this.getMoney() - formFund._numberFieldFundPlanOut.getMoney()) / 1000000); //修改到校经费变化校内计划分配
        if (this.getMoney() > formFund._numberFieldFundContract.getMoney()) {
            this.invalidText = '总经费（到校经费）不能大于合同额。';
            return false;
        }

        if (formFund._numberFieldFundPlanIn.getMoney()
				&& formFund._numberFieldFundPlanIn.getMoney()
						.add(formFund._numberFieldFundPlanOut.getMoney()) != this
						.getMoney()) {
            this.invalidText = '校内分配和外协分配的和必须等于总经费（到校经费）。';
            return false;
        }
        if (project.get('fundAlreadyTotal') > this.getMoney()) {
            this.invalidText = '到校经费必须大于项目的已到经费';
            return false;
        }
        return true;
    }

    this._numberFieldEquimentCost_Validator = function(value) {
        var formFund = this.formFund;

        if (this.getMoney() > formFund._numberFieldFundContract.getMoney()) {
            this.invalidText = '设备购置费不能大于合同额。';
            return false;
        }

        return true;
    }
    // initial controls
    this._formBasic._comboBoxLevel.formFund = this;
    this._formBasic._textFieldTaskComingFrom.formFund = this;

    this._formType._comboBoxType.formFund = this;
    this._formType._comboBoxSupportCategory.formFund = this;

    this._numberFieldFundContract.formFund = this;
    this._numberFieldFundContract.numberFieldFundTotal = this._numberFieldFundTotal;
    this._numberFieldFundContract.validator = this._numberFieldFundContract_Validator;

    this._numberFieldEquipmentCost.formFund = this;
    this._numberFieldEquipmentCost.numberFieldFundTotal = this._numberFieldFundTotal;

    this._numberFieldFundTotal.formFund = this;
    this._numberFieldFundTotal.numberFieldFundPlanIn = this._numberFieldFundPlanIn;
    this._numberFieldFundTotal.numberFieldFundPlanOut = this._numberFieldFundPlanOut;
    this._numberFieldFundTotal.numberFieldPerformancePay = this._numberFieldPerformancePay;
    this._numberFieldFundTotal.validator = this._numberFieldFundTotal_Validator;

    this._numberFieldEquipmentCost.formFund = this;
    this._numberFieldEquipmentCost.validator = this._numberFieldEquimentCost_Validator;



    // 间接管理费
    this._numberFieldFundPlanIn.formFund = this;
    this._numberFieldFundPlanIn.numberFieldOverheadExpense = this._fieldOverheadExpensesInStandard;
    this._numberFieldFundPlanIn.projectType_RateFieldName = 'overheadExpenseInRate';
    this._numberFieldFundPlanIn.otherPlanItem = this._numberFieldFundPlanOut;

    this._numberFieldFundPlanOut.formFund = this;
    this._numberFieldFundPlanOut.numberFieldOverheadExpense = this._numberFieldOverheadExpenseOutTotal;
    this._numberFieldFundPlanOut.projectType_RateFieldName = 'overheadExpenseOutRate';
    this._numberFieldFundPlanOut.otherPlanItem = this._numberFieldFundPlanIn;

    // event
    this._formBasic._comboBoxLevel.on('select',
			this._onFormBasic_ProjectLevel_Select);
    this._formBasic._textFieldTaskComingFrom.on('change',
			this._onFormBasic_TaskComingFrom_Change);
    this._formType._comboBoxType.projectOutPanel = this._projectOutPanel;
    this._formType._comboBoxType.on('select', this._onFormType_Type_Selelct);
    this._formType._comboBoxSupportCategory.on('select',
			this._onFormType_Type_Selelct);

    this._numberFieldFundContract.on('change',
			this._onNumberFieldFundContract_Change);
    this._numberFieldFundTotal
			.on('change', this._onNumberFieldFundTotal_Change);
    this._numberFieldEquipmentCost.on('change',
			this._numberFieldEquipmentCost_Change);
    this._numberFieldFundPlanIn
			.on('change', this._onNumberFieldFundPlan_Change);
    this._numberFieldFundPlanOut.on('change',
			this._onNumberFieldFundPlan_Change);

    // 刷新
    this._resetFormPanel = function(project, formBasic, formType) {
        this._project = project;
        this._formBasic = formBasic;
        this._formType = formType;
        this._numberFieldFundContract.setValue(Money.render(project
						.get('fundContract'), false));
        this._numberFieldFundTotal.setValue(Money.render(project
						.get('fundTotal'), false));
        this._fieldProjectOverheadExpensesTotal.setValue(Money.render(project
						.get('indirectCosts'), false)); //
        this._fieldProjectPerformanceTotal.setValue(Money.render(project
						.get('projectPerformancePay'), false)); //
        this._numberFieldFundTotal
				.setDisabled(project.get('level') == Srims.projects.ProjectLevel.Perside);
        this._numberFieldFundPlanIn.setValue(Money.render(project
						.get('fundPlanIn'), false));
        this._numberFieldFundPlanOut.setValue(Money.render(project
						.get('fundPlanOut'), false));
        this._numberFieldOverheadExpenseInTotal.setValue(Money.render(project
						.get('overheadExpenseInTotal'), false) + Money.render(project
						.get('performancePay'), false));
        this._numberFieldOverheadExpenseOutTotal.setValue(Money.render(project
						.get('overheadExpenseOutTotal'), false));
        this._percentFieldFundManageProportion.setValue(Money.render(project
						.get('fundManageProportion'), false));
        this._numberFieldPerformancePay.setValue(Money.render(project
						.get('performancePay'), false));
        this._fieldProjectPerformanceTotal.setValue(Money.render(project
						.get('projectPerformancePay'), false));
        this._numberFieldPerformancePayAlready.setValue(Money.render(project
						.get('performancePayAlready'), false));
        this._textFieldFundFrom.setValue(project.get('fundFrom'));
        this._textFieldFundFromUnit.setValue(project.get('fundFromUnit'));
        this._textFieldFundFromUnitAddress.setValue(project
				.get('fundFromUnitAddress'));

    }
}
Ext.extend(Srims.projects.ProjectEditPanel_FundForm, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_RemarkForm = function(project){
    this._project = project;
    
    this._textAreaRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        hideLabel: true,
        value: project.get('remark'),
        width: 570
    });
    Srims.projects.ProjectEditPanel_RemarkForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '备注',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textAreaRemark]
    });
    
    //method
    this.assginValues = function(){
        this._project.set('remark', this._textAreaRemark.getValue());
    }
    this.isValid = function(preventMark){
        return true;
    }
    //刷新
    this._resetFormPanel = function(project){
    
        this._project = project;
        this._textAreaRemark.setValue(project.get('remark'));
    }
}
Ext.extend(Srims.projects.ProjectEditPanel_RemarkForm, Ext.FormPanel);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel = function(id, project, unsubmitProjectStore, isExpetEdit, projectOutPanel) {


    this._project = project;
    this._unsubmitProjectStore = unsubmitProjectStore;
    this._title = project.isNew() ? project.get('isHorizontal') ? '新建横向项目' : '新建纵向项目' : project.get('name');

    var projectOutAmount = 0;


    this._secretProjectMessagePanel = new Srims.projects.ProjectEditPanel_SecretProjectMessagePanel();

    this._formPanelBasic = new Srims.projects.ProjectEditPanel_BasicForm(project);
    this._formPanelType = new Srims.projects.ProjectEditPanel_TypeForm(project);

    //    this.validatFundForm = function() {
    //        var panel = this.panel;
    //        var projectOutStore = panel._projectOutPanel._store;
    //        var projectOuts = projectOutStore.getRange();
    //        for (var i = 0; i < projectOuts.length; i++) {
    //            projectOutAmount += projectOuts[i].get('amount');
    //        }
    //        this._numberFieldFundPlanOut.setValue(projectOutAmount);
    //        return true;
    //    }

    this._formPanelFund = new Srims.projects.ProjectEditPanel_FundForm(project, this._formPanelBasic, this._formPanelType, projectOutPanel);
    this._formPanelFund.parentPanel = this;
    //    this._formPanelFund.panel = this;
    //    this._formPanelFund.validator = this.validatFundForm;

    this._formPanelRemark = new Srims.projects.ProjectEditPanel_RemarkForm(project);

    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        hidden: isExpetEdit == true,
        panel: this
    });
    //carlsirce2013.2.28 控制项目编辑页面下的外协编辑框的显示
    if (Srims.currentLoginLog.user.userRoleType != 'Expert') {

        this._projectOutPanel = new Srims.projects.ProjectEditPanel_ProjectOutForm(project);
        this._projectOutPanel.parentPanel = this;
        Srims.projects.ProjectEditPanel.superclass.constructor.call(this, {
            id: id,
            style: 'padding:5px; width:1200px',
            closable: true,
            deferHeight: false,
            buttonAlign: 'center',
            title: isExpetEdit ? '' : this._title,
            iconCls: project.isNew() ? 'icon-project-new' : 'icon-project-edit',
            items: [this._projectOutPanel, this._formPanelBasic, this._formPanelType, this._formPanelFund, this._formPanelRemark],
            buttons: [this._buttonSave]
        });
    }
    else {
        Srims.projects.ProjectEditPanel.superclass.constructor.call(this, {
            id: id,
            style: 'padding:5px; width:1200px',
            closable: true,
            deferHeight: false,
            buttonAlign: 'center',
            title: isExpetEdit ? '' : this._title,
            iconCls: project.isNew() ? 'icon-project-new' : 'icon-project-edit',
            items: [this._formPanelBasic, this._formPanelType, this._formPanelFund, this._formPanelRemark],
            buttons: [this._buttonSave]
        });
    }


    //method
    this.assginValues = function() {
        this._formPanelBasic.assginValues();
        this._formPanelType.assginValues();
        this._formPanelFund.assginValues();
        this._formPanelRemark.assginValues();
    }

    this.isValid = function(preventMark) {
        var result = true;

        result = this._formPanelBasic.isValid(preventMark) && result;
        result = this._formPanelType.isValid(preventMark) && result;
        result = this._formPanelFund.isValid(preventMark) && result;
        result = this._formPanelRemark.isValid(preventMark) && result;

        return result;
    }
    this.save = function() {
        //        if (this._formPanelFund._numberFieldFundContract.getMoney() * 0.4 < this._formPanelFund._numberFieldFundPlanOut.getMoney() && this._project.get('isHorizontal')) {
        //            Ext.Msg.show({
        //                title: '不能保存',
        //                msg: '计划外协经费不能超过合同额的40%。',
        //                buttons: Ext.Msg.OK,
        //                icon: Ext.MessageBox.WARNING
        //            });
        //            this._buttonSave.enable();
        //            return;
        //        }
        //carlsirce2013.3.11 判断横向项目外协经费比例
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/GetFundOutRatio',
            scope: this,
            success: function(response) {
                if (response.responseText) {
                    if (this._formPanelFund._numberFieldFundContract.getMoney() * response.responseText / 100 < this._formPanelFund._numberFieldFundPlanOut.getMoney() && this._project.get('isHorizontal')) {
                        Ext.Msg.show({
                            title: '不能保存',
                            msg: '计划外协经费不能超过合同额的' + response.responseText + '%。',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        this._buttonSave.enable();
                        return;
                    }
                }
            }
        });
//        if ((this._formPanelFund._numberFieldOverheadExpenseInTotal.getMoney() < 0.95 * this._formPanelFund._fieldOverheadExpensesInStandard.getMoney() || this._formPanelFund._numberFieldPerformancePay.getMoney() > 1.05 * this._formPanelFund._fieldPerformancePayStandard.getMoney()) && !Srims.currentUser.isSuper && !this._project.get('isHorizontal')) {
//            Ext.Msg.show({
//                title: '无权限保存',
//                msg: '您所编辑的绩效与间接费已经超过基准值5%，不能保存，请联系超级管理员编辑。',
//                buttons: Ext.Msg.OK,
//                icon: Ext.MessageBox.WARNING
//            });
//            this._buttonSave.enable();
//            return;
//        }
        var project = this._project;
        project.beginEdit();
        this.assginValues();
        project.commit();

        project.data.startDateValue = project.data.startDate.format("Y-m-d H:i:s");
        project.data.endDateValue = project.data.endDate.format("Y-m-d H:i:s");
        //carlsirce2013.2.28 加入外协单位保存
        //专家用户新建时
        if (this.parentPanel) {
            var projectOutPanel = this.parentPanel._ProjectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var projectOutString = '';

            for (var i = 0; i < projectOuts.length; i++) {
                projectOutString += Money.toMoney(projectOuts[i].get('amount'));
                projectOutString += '###';
                projectOutString += projectOuts[i].get('outSourcingName');
                projectOutString += '|||';
            }
            project.data.projectOutString = projectOutString;
        }
        //管理员用户编辑保存时
        if (this._projectOutPanel) {
            var projectOutPanel = this._projectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var projectOutString = '';

            for (var i = 0; i < projectOuts.length; i++) {
                projectOutString += Money.toMoney(projectOuts[i].get('amount'));
                projectOutString += '###';
                projectOutString += projectOuts[i].get('outSourcingName');
                projectOutString += '|||';
            }
            project.data.projectOutString = projectOutString;
        }
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/Save',
            params: project.data,
            scope: this,
            success: function(response) {
                if (this._unsubmitProjectStore)
                    this._unsubmitProjectStore.load();
                //此处是为了在修改项目信息时，刷新前边的GridPanel
                var project = this._project;
                if (project.projectStore != undefined) {
                    project.projectStore.load();
                }
                delete project.data.startDateValue;
                delete project.data.endDateValue;

                if (isExpetEdit == undefined)
                    Srims.WorkSpace.getWorkSpace().remove(this);

                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.projects.ProjectSimpleXmlReader()
                });
                var project = store.getAt(0);

                //仅用户专家向导，刷新其他面板
                if (isExpetEdit == true) {
                    this.panel.panel.setIconClass('icon-project-edit');
                    this.panel.panel.setTitle('项目' + project.get('name') + '立项申请');
                    this.panel.panel._memberManagePanel.setProject(project);
                    Srims.expertGuide.next(this);
                    return;
                }

                Srims.projects.showProject(project);
            }
        });

    }
    this.validateProjectName = function() {
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/CountByName',
            params: {
                name: this._formPanelBasic._textFieldName.getValue()
            },
            scope: this,
            success: this._onValidateProjectName
        });
    }
    this._onValidateProjectName = function(response) {
        if (parseInt(response.responseText) > 0) {
            Ext.MessageBox.confirm('项目重名', '目前已存在和该项目重名的项目，是否继续？', function(buttonId) {
                if (buttonId == 'yes') {
                    this.save();
                }
                else {
                    this._buttonSave.setText('保 存');
                    this._buttonSave.enable();
                }
            }, this);
        }
        else {
            this.save();
        }
    }
    //event method
    this._onButonSave_Click = function(button, e) {
        var panel = button.panel;
        //alert(panel._formPanelBasic._comboBoxBase.getEntity().get('name'));

        if (!panel.isValid(false))
            return;

        var project = panel._project;
        panel.assginValues();
        //carlsirce2013.3.1 验证管理员编辑项目时的外协信息
        if (panel._projectOutPanel) {
            var projectOutPanel = panel._projectOutPanel;
            var projectOutStore = projectOutPanel._store;
            var projectOuts = projectOutStore.getRange();
            var flag = 1;
            for (var i = 0; i < projectOuts.length; i++) {
                if (projectOuts[i].get('amount') <= 0 || projectOuts[i].get('outSourcingName') == '')
                    flag = 0;
            }
            if (flag == 0) {
                Ext.Msg.show({
                    title: '外协填写错误',
                    msg: '请检查所有外协单位不为空且分配数额大于0！',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
        }
        //验证到校经费必须大于计划外协经费与外协管理费的和
        if (panel._formPanelFund._numberFieldOverheadExpenseOutTotal.getValue() > panel._formPanelFund._numberFieldFundPlanIn.getValue()) {
            Ext.Msg.show({
                title: '填写错误',
                msg: '到校经费必须大于计划外协分配与外协管理费之和！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }

        //当项目的外协经费为零时，提示是否保存
        if (project.get('fundPlanOut') <= 0) {
            Ext.MessageBox.confirm('外协分配为零', '外协分配为0,你确定要继续吗？   ', function(buttonId) {
                if (buttonId == 'yes')
                    panel.saveAction(button);
            }, this);
        }
        else
            panel.saveAction(button);
    }
    this.saveAction = function(button) {
        button.setText('正在保存');
        button.disable();

        if (this._project.isNew())
            this.validateProjectName();
        else
            this.save();
    }

    //event
    this._buttonSave.on('click', this._onButonSave_Click);

    //刷新(仅用于专家向导)
    this.setProject = function(project) {
        this._project = project;
        this.setTitle(project.isNew() ? project.get('isHorizontal') ? '新建横向项目' : '新建纵向项目' : project.get('name'));
        this._formPanelBasic._resetFormPanel(this._project);
        this._formPanelType._resetFormPanel(this._project);
        this._formPanelFund._resetFormPanel(this._project, this._formPanelBasic, this._formPanelType);
        this._formPanelRemark._resetFormPanel(this._project);
    }

    this.next = function() {
        if (!this.isValid(false))
            return;
        this.save();
    }
}
Ext.extend(Srims.projects.ProjectEditPanel, Ext.Panel, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_BasicForm = function(project) {

    //field
    this._project = project;

    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '项目名称',
        value: project.get('name'),
        readOnly: true,
        width: 480
    });
    this._fieldNumber = new Ext.form.Field({
        fieldLabel: '项目编号',
        value: project.get('number'),
        readOnly: true,
        width: 160
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密',
        hidden: true,
        hideLabel: true,
        checked: project.get('isSecret'),
        readOnly: true
    });
    this._fieldPrincipal = new Ext.form.Field({
        fieldLabel: '项目负责人',
        value: project.get('principal'),
        readOnly: true,
        width: 160
    });
    this._fieldPrincipalDelegate = new Ext.form.Field({
        fieldLabel: '委托负责人',
        value: project.get('principalDelegate'),
        readOnly: true,
        width: 160
    });
    this._fieldLevel = new Ext.form.Field({
        fieldLabel: '项目级别',
        value: Srims.projects.projectLevelRender(project.get('level')),
        readOnly: true,
        width: 160
    });
    this._fieldState = new Ext.form.Field({
        fieldLabel: '项目状态',
        value: Srims.projects.projectStateRender(project.get('state')),
        readOnly: true,
        width: 160
    });
    this._fieldResearchType = new Ext.form.Field({
        fieldLabel: '研究类型',
        value: project.get('researchType'),
        readOnly: true,
        width: 160
    });
    this._fieldCooperationType = new Ext.form.Field({
        fieldLabel: '合作类型',
        value: project.get('cooperationType'),
        readOnly: true,
        width: 160
    });
    this._fieldStartDate = new Ext.form.Field({
        fieldLabel: '开始时间',
        value: Date.render(project.get('startDate')),
        readOnly: true,
        width: 160
    });
    this._fieldEndDate = new Ext.form.Field({
        fieldLabel: '结束时间',
        value: Date.render(project.get('endDate')),
        readOnly: true,
        width: 160
    });
    this._fieldFirstLevelSubject = new Ext.form.Field({
        fieldLabel: '一级学科',
        value: project.get('firstLevelSubjectName'),
        readOnly: true,
        width: 160
    });
    this._fieldSecondLevelSubject = new Ext.form.Field({
        fieldLabel: '二级学科',
        value: project.get('secondLevelSubjectName'),
        readOnly: true,
        width: 160
    });
    this._fieldBase = new Ext.form.Field({
        fieldLabel: '所属基地',
        value: project.get('baseName'),
        readOnly: true,
        width: 300
    });
    this._fieldTaskComingFrom = new Ext.form.Field({
        fieldLabel: '委托单位',
        readOnly: true,
        value: project.get('taskComingFrom'),
        width: 160
    });
    this._fieldTaskCorporationPlace = new Ext.form.Field({
        fieldLabel: '单位所在地',
        value: project.get('corporationPlace'),
        readOnly: true,
        width: 160
    });

    //constructor        
    var columnOneItems = [this._fieldNumber, this._fieldPrincipal, this._fieldLevel, this._fieldResearchType, this._fieldStartDate, this._fieldFirstLevelSubject];
    var columnTwoItems = [this._checkboxIsSecret, this._fieldPrincipalDelegate, this._fieldState, this._fieldCooperationType, this._fieldEndDate, this._fieldSecondLevelSubject];

    if (project.get('isHorizontal')) {
        columnOneItems[columnOneItems.length] = this._fieldTaskComingFrom;
        columnTwoItems[columnTwoItems.length] = this._fieldTaskCorporationPlace;
    }
    Srims.projects.ProjectShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldName, new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: columnOneItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnTwoItems
            })]
        }), this._fieldBase]
    });
    this.resetComponentValue = function(project) {
        this._fieldName.setValue(project.get('name'));
        this._fieldNumber.setValue(project.get('number'));
        this._checkboxIsSecret.setValue(project.get('isSecret'));
        this._fieldPrincipal.setValue(project.get('principal'));
        this._fieldPrincipalDelegate.setValue(project.get('principalDelegate'));
        this._fieldLevel.setValue(Srims.projects.projectLevelRender(project.get('level')));
        this._fieldState.setValue(Srims.projects.projectStateRender(project.get('state')));
        this._fieldResearchType.setValue(project.get('researchType'));
        this._fieldCooperationType.setValue(project.get('cooperationType'));
        this._fieldStartDate.setValue(Date.render(project.get('startDate')));
        this._fieldEndDate.setValue(Date.render(project.get('endDate')));
        this._fieldFirstLevelSubject.setValue(project.get('firstLevelSubjectName'));
        this._fieldSecondLevelSubject.setValue(project.get('secondLevelSubjectName'))
        this._fieldBase.setValue(project.get('baseName'));
        this._fieldTaskComingFrom.setValue(project.get('taskComingFrom'));
        this._fieldTaskCorporationPlace.setValue(project.get('corporationPlace'));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_MemberForm = function(project){
    this._project = project;
    
    this._store = new Srims.projects.ProjectMemberStore(project);
    this._columnModel = new Srims.projects.ProjectMemberGridPanel_ColumnModel();
    
    this._gridPanelProjectMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoExpandColumn: 'taskName',
        autoExpand: true,
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true
        }
    });
    
    Srims.projects.ProjectShowPanel_MemberForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目成员',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectMember]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_MemberForm, Ext.FormPanel, {});

//if (!Srims.projects) 
//    Ext.namespace('Srims.projects');

//Srims.projects.ProjectShowPanel_RecoveryForm = function(project){

//    this._project = project;
//    this._recoveryvoucherNumber = new Ext.form.Field({
//        fieldLabel: '追缴凭单号',
//        value: project.get('recoveryvoucherNumber'),
//        readOnly: true,
//        width: 140
//    });//
//    this._roverheadExpensesAmount = new Ext.form.Field({
//        fieldLabel: '应收间接费',
//        value: Money.render(project.get('roverheadExpensesAmount')),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryAmount = new Ext.form.Field({
//        fieldLabel: '追缴间接费',
//        value: Money.render(project.get('recoveryAmount')),
//        readOnly: true,
//        width: 140
//    }); //
//    this._fieldMark = new Ext.form.Field({
//        fieldLabel: '备注',
//        value: project.get('rremark'),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryPrintState = new Ext.form.Field({
//        fieldLabel: '打印状态',
//        value: project.get('recoveryPrintState'),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryPrintDate = new Ext.form.Field({
//        fieldLabel: '打印日期',
//        value: Date.render(project.get('recoveryPrintDate')),
//        readOnly: true,
//        width: 140
//    }); //

//    var items = [ new Ext.Panel({
//        widht: 600,
//        layout: 'column',
//        items: [new Ext.Panel({
//            width: 300,
//            layout: 'form',
//            style: 'width:300px',
//            items: [this._roverheadExpensesAmount, this._recoveryPrintState, this._recoveryvoucherNumber]
//        }), new Ext.Panel({
//            width: 300,
//            style: 'width:300px',
//            layout: 'form',
//            items: [this._recoveryAmount, this._recoveryPrintDate, this._fieldMark]
//        })]
//    })];
//    if (project.get('isHorizontal')) 
//        items.shift();
//    
//    Srims.projects.ProjectShowPanel_RecoveryForm.superclass.constructor.call(this, {
//        collapsible: true,
//        title: '项目追缴单信息',
//        autoHeight: true,
//        frame: true,
//        labelWidth: 80,
//        bodyStyle: 'padding:5px 5px 0',
//        style: 'margin-bottom: 2px',
//        defaultType: 'textfield',
//        titleCollapse: true,
//        items: items
//    });
//    //method
//    this.resetComponentValue = function(project){
//    this._roverheadExpensesAmount.setValue(project.get('roverheadExpensesAmount'));
//    this._recoveryAmount.setValue(project.get('recoveryAmount'));
//    this._recoveryPrintState.setValue(project.get('recoveryPrintState'));
//    this._recoveryPrintDate.setValue(project.get('recoveryPrintDate'));
//    this._recoveryvoucherNumber.setValue(project.get('recoveryvoucherNumber'));
//    this._fieldMark.setValue(project.get('rremark'));
//    }
//}
//Ext.extend(Srims.projects.ProjectShowPanel_RecoveryForm, Ext.form.FormPanel);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_RecoveryForm = function(project) {
this._project = project;
var params = {};
    params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.projects.ProjectService + '/GetRecoveryByPID';
    this._store = new Srims.projects.RecoveryProjectStore(load_url, params);
    this._columnModel = new Srims.projects.RecoveryprojectGridPanel_ShowColumnModel();

    this._gridPanelProjectMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoExpandColumn: 'taskName',
        autoExpand: true,
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有追缴单记录'
        }
    });

    Srims.projects.ProjectShowPanel_RecoveryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目间接费用调整信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectMember]
    });
    if (project.get('id'))
        this._store.load();

    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_RecoveryForm, Ext.FormPanel, {});
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_TypeForm = function(project){

    this._project = project;
    
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '项目级别',
        value: project.get('rankName'),
        readOnly: true,
        width: 160
    });
    this._fieldType = new Ext.form.Field({
        fieldLabel: '项目类型',
        value: project.get('typeName'),
        readOnly: true,
        width: 300
    });
    this._fieldSupportCategory = new Ext.form.Field({
        fieldLabel: '资助类别',
        value: project.get('supportCategoryName'),
        readOnly: true,
        width: 160
    });
    this._fieldSupportField = new Ext.form.Field({
        fieldLabel: '资助领域',
        value: project.get('supportFieldName'),
        readOnly: true,
        width: 160
    });
    this._fieldSupportSubField = new Ext.form.Field({
        fieldLabel: '资助子领域',
        value: project.get('supportSubFieldName'),
        readOnly: true,
        width: 160
    });
    
    var items = [this._fieldRank, this._fieldType, this._fieldSupportCategory, new Ext.Panel({
        widht: 600,
        layout: 'column',
        items: [new Ext.Panel({
            width: 300,
            layout: 'form',
            style: 'width:300px',
            items: [this._fieldSupportField]
        }), new Ext.Panel({
            width: 300,
            style: 'width:300px',
            layout: 'form',
            items: [this._fieldSupportSubField]
        })]
    })];
    if (project.get('isHorizontal')) 
        items.shift();
    
    Srims.projects.ProjectShowPanel_TypeForm.superclass.constructor.call(this, {
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
    //method
    this.resetComponentValue = function(project){
        this._fieldRank.setValue(project.get('rankName'));
        this._fieldType.setValue(project.get('typeName'));
        this._fieldSupportCategory.setValue(project.get('supportCategoryName'));
        this._fieldSupportField.setValue(project.get('supportFieldName'));
        this._fieldSupportSubField.setValue(project.get('supportSubFieldName'));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_TypeForm, Ext.form.FormPanel);

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_FundForm = function(project) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._fieldFundContract = new Ext.form.Field({
        fieldLabel: '项目合同额',
        value: Money.render(project.get('fundContract')),
        readOnly: true,
        width: 140
    });
    this._fieldFundTotal = new Ext.form.Field({
        fieldLabel: '到校经费',
        value: Money.render(project.get('fundTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundPlanIn = new Ext.form.Field({
        fieldLabel: '计划校内分配',
        value: Money.render(project.get('fundPlanIn')),
        readOnly: true,
        width: 140
    });
    this._fieldFundPlanOut = new Ext.form.Field({
        fieldLabel: '计划外协分配',
        value: Money.render(project.get('fundPlanOut')),
        readOnly: true,
        width: 140
    });
    this._fieldFundReceived = new Ext.form.Field({
        fieldLabel: '已到经费',
        value: Money.render(project.get('fundReceived')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyTotal = new Ext.form.Field({
        fieldLabel: '已分配经费',
        value: Money.render(project.get('fundAlreadyTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyIn = new Ext.form.Field({
        fieldLabel: '已分配校内经费',
        value: Money.render(project.get('fundAlreadyIn')),
        readOnly: true,
        width: 140
    });
    this._fieldfundAlreadyOut = new Ext.form.Field({
        fieldLabel: '已分配外协经费',
        value: Money.render(project.get('fundAlreadyOut')),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyHardware = new Ext.form.Field({
        fieldLabel: '已分配硬件经费',
        value: Money.render(project.get('fundAlreadyHardware')),
        readOnly: true,
        width: 140
    });
    this._fieldProjectOverheadExpensesTotal = new Ext.form.Field({
        fieldLabel: '项目总间接费',
        value: Money.render(project.get('indirectCosts')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldProjectPerformanceTotal = new Ext.form.Field({
        fieldLabel: '项目总绩效',
        value: Money.render(project.get('projectPerformancePay')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpensesInStandard = new Ext.form.Field({
        fieldLabel: '校内基准间接费',
        value: Money.render(project.get('overheadExpensesInStandard')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpenseInTotal = new Ext.form.Field({
        fieldLabel: '校内合同间接费',
        value: Money.render(project.get('campusIndirectCosts')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldOverheadSchool = new Ext.form.Field({
        fieldLabel: '学校间接费',
        value: Money.render(project.get('overheadExpenseInTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadCompus = new Ext.form.Field({
        fieldLabel: '二级单位间接费',
        value: Money.render(project.get('overheadExpenseMiddleTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpert = new Ext.form.Field({
        fieldLabel: '课题组间接费',
        value: Money.render(project.get('overheadExpenseExpertTotal')),
        hidden: userIsExpert || project.get('isHorizontal'),
        hideLabel: userIsExpert || project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    this._fieldOverheadExpenseOutTotal = new Ext.form.Field({
        fieldLabel: '外协分配管理费',
        value: Money.render(project.get('overheadExpenseOutTotal')),
        readOnly: true,
        width: 140
    });
    this._fieldFundManageProportion = new Ext.form.Field({
        fieldLabel: '国家规定管理费比例',
        value: ExpenseRate.render(project.get('fundManageProportion')),
        readOnly: true,
        width: 140
    });
    this._fieldPerformancePay = new Ext.form.Field({
        fieldLabel: '校内合同绩效',
        value: project.get('overheadExpenseInTotal') < 0 ? '' : Money.render(project.get('performancePay')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        readOnly: true,
        width: 140
    });
    this._fieldAllocatedPerformence = new Ext.form.Field({
        fieldLabel: '课题组暂存（考虑追缴）',
        value: Money.render(project.get('allocatedPerformance')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldPerformancePayAlready = new Ext.form.Field({
        fieldLabel: '课题组暂存（不考虑追缴）',
        value: Money.render(project.get('performancePayAlready')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldOverheadExpensesAlreadyIn = new Ext.form.Field({
        fieldLabel: '已收学校间接费（不考虑追缴）',
        value: Money.render(project.get('overheadExpensesAlreadyIn')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldTrueOverheadExpensesAlreadyIn = new Ext.form.Field({
        fieldLabel: '实收学校间接费（考虑追缴）',
        value: Money.render(project.get('trueOverheadExpensesAlreadyIn')),
        hidden: userIsExpert,
        hideLabel: userIsExpert,
        width: 140
    });
    this._fieldBorrowAmount = new Ext.form.Field({
        fieldLabel: '借款金额',
        value: Money.render(project.get('borrowAmount')),
        readOnly: true,
        width: 140
    });
    this._fieldReturnAmount = new Ext.form.Field({
        fieldLabel: '还款金额',
        value: Money.render(project.get('returnAmount')),
        readOnly: true,
        width: 140
    });
    this._fieldFundFrom = new Ext.form.Field({
        fieldLabel: '经费来源',
        value: project.get('fundFrom'),
        readOnly: true,
        width: 300
    });
    this._fieldFundFromUnit = new Ext.form.Field({
        fieldLabel: '来款单位',
        value: project.get('fundFromUnit'),
        readOnly: true,
        width: 300
    });
    this._fieldFundFromUnitAddress = new Ext.form.Field({
        fieldLabel: '来款单位地址',
        value: project.get('fundFromUnitAddress'),
        readOnly: true,
        width: 420
    });
    this._fieldPerformancePayStandard = new Ext.form.Field({
        fieldLabel: '校内基准绩效',
        value: Money.render(project.get('performancePayStandard')),
        hidden: userIsExpert,
        hideLabel: userIsExpert, //&& (project.get("state") == "WaitingStartInformation" || project.get("state") == "WaitingStartCensor")
        readOnly: true,
        width: 140
    });
    this._numberFieldEquipmentCost = new Ext.form.Field({
        fieldLabel: '设备购置费',
        value: Money.render(project.get('equipmentCost')),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        readOnly: true,
        width: 140
    });
    Srims.projects.ProjectShowPanel_FundForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        items: [new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldFundContract, this._fieldFundPlanIn, this._fieldFundReceived, this._fieldFundAlreadyIn, this._numberFieldEquipmentCost, this._fieldProjectOverheadExpensesTotal, this._fieldOverheadExpensesInStandard, this._fieldOverheadExpenseInTotal, this._fieldOverheadSchool]
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: [this._fieldFundTotal, this._fieldFundPlanOut, this._fieldFundAlreadyTotal, this._fieldfundAlreadyOut, this._fieldOverheadExpenseOutTotal, this._fieldProjectPerformanceTotal, this._fieldPerformancePayStandard, this._fieldPerformancePay, this._fieldOverheadCompus]
            })]
        }), this._fieldOverheadExpert,
     new Ext.Panel({
         width: 600,
         layout: 'column',
         items: [new Ext.Panel({
             width: 300,
             layout: 'form',
             style: 'width:300px',
             items: [this._fieldBorrowAmount, this._fieldPerformancePayAlready, this._fieldOverheadExpensesAlreadyIn]
         }), new Ext.Panel({
             width: 300,
             style: 'width:300px',
             layout: 'form',
             items: [this._fieldReturnAmount, this._fieldAllocatedPerformence, this._fieldTrueOverheadExpensesAlreadyIn]
         })]
     })

     , this._fieldFundFrom, this._fieldFundFromUnit, this._fieldFundFromUnitAddress]
    });
    //method
    this.resetComponentValue = function(project) {
        this._fieldFundContract.setValue(Money.render(project.get('fundContract')));
        this._fieldFundTotal.setValue(Money.render(project.get('fundTotal')));
        this._fieldFundPlanIn.setValue(Money.render(project.get('fundPlanIn')));
        this._fieldFundPlanOut.setValue(Money.render(project.get('fundPlanOut')));
        this._fieldFundReceived.setValue(Money.render(project.get('fundReceived')));
        this._fieldFundAlreadyTotal.setValue(Money.render(project.get('fundAlreadyTotal')));
        this._fieldFundAlreadyIn.setValue(Money.render(project.get('fundAlreadyIn')));
        this._fieldfundAlreadyOut.setValue(Money.render(project.get('fundAlreadyOut')));
        this._fieldFundAlreadyHardware.setValue(Money.render(project.get('fundAlreadyHardware')));
        this._fieldOverheadExpensesInStandard.setValue(Money.render(project.get('overheadExpensesInStandard')));
        this._fieldOverheadExpenseInTotal.setValue(Money.render(project.get('campusIndirectCosts')));
        this._fieldOverheadExpenseOutTotal.setValue(Money.render(project.get('overheadExpenseOutTotal')));
        this._fieldFundManageProportion.setValue(project.get('fundManageProportion'));
        this._fieldPerformancePay.setValue(Money.render(project.get('performancePay')));
        this._fieldAllocatedPerformence.setValue(Money.render(project.get('allocatedPerformance')));
        this._fieldPerformancePayAlready.setValue(Money.render(project.get('performancePayAlready')));
        this._fieldOverheadExpensesAlreadyIn.setValue(Money.render(project.get('overheadExpensesAlreadyIn')));
        this._fieldTrueOverheadExpensesAlreadyIn.setValue(Money.render(project.get('trueOverheadExpensesAlreadyIn')));
        this._fieldBorrowAmount.setValue(Money.render(project.get('borrowAmount')));
        this._fieldReturnAmount.setValue(Money.render(project.get('returnAmount')));
        this._fieldPerformancePayStandard.setValue(Money.render(project.get('performancePayStandard')));
        this._fieldProjectOverheadExpensesTotal.setValue(Money.render(project.get('indirectCosts'))); //
        this._fieldProjectPerformanceTotal.setValue(Money.render(project.get('projectPerformancePay'))); //
        this._fieldFundFrom.setValue(project.get('fundFrom'));
        this._fieldFundFromUnit.setValue(project.get('fundFromUnit'));
        this._fieldFundFromUnitAddress.setValue(project.get('fundFromUnitAddress'));
        this._numberFieldEquipmentCost.setValue(Money.render(project.get('equipmentCost')));
        this._fieldOverheadSchool.setValue(Money.render(project.get('overheadExpenseInTotal')));
        this._fieldOverheadCompus.setValue(Money.render(project.get('overheadExpenseMiddleTotal')));
        this._fieldOverheadExpert.setValue(Money.render(project.get('overheadExpenseExpertTotal')));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundForm, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.ProjectShowPanel_FundBorrowForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.fund.FundDescendService + '/GetBorrowByProjectId';
    this._store = new Srims.fund.FundDescendStore(load_url, params);
    this._columnModel = new Srims.fund.FundDescendGridPanel_ColumnModel(true, true, false);
    
    this._gridPanelBorrow = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有借款记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_FundBorrowForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '借款记录',
        autoHeight: true,
        hidden: project.get('borrowAmount') == 0,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelBorrow]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundBorrowForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.ProjectShowPanel_FundReturnForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.fund.FinanceFundDescendService + '/GetReturnByProjectId';
    this._store = new Srims.fund.FinanceFundDescendStore(load_url, params);
    this._columnModel = new Srims.fund.FinanceFundDescendGridPanel_ColumnModel(true, true);
    
    this._gridPanelFundReturn = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有还款记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_FundReturnForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '还款记录',
        autoHeight: true,
        hidden: project.get('borrowAmount') == 0,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundReturn]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundReturnForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.projectShowPanel_PayPlanItemForm = function(project){

    this._project = project;
    this._store = new Srims.fund.PayPlanItemStore(project);
    this._columnModel = new Srims.fund.PayPlanItemGridPanel_ColumnModel();
    
    
    this._gridPanelPayPlanItem = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 300,
        autoExpand: true,
        autoExpandColumn: 'amount',
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有经费到帐计划'
        }
    });
    
    Srims.projects.projectShowPanel_PayPlanItemForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费到帐计划',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelPayPlanItem]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.projectShowPanel_PayPlanItemForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.projectFundAllocation = undefined;
Srims.projects.showProjectFundAllocation = function(){
    Srims.fund.showFundAllocationInfo(Srims.projects.projectFundAllocation);
}

Srims.projects.ProjectShowPanel_FundAllocationForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.fund.FundAllocationService + '/GetByProjectID';
    this._store = new Srims.fund.FundAllocationStore(load_url, params);
    this._columnModel = new Srims.fund.FundAllocationGridPanel_ColumnModel(false);
    
    this._gridPanelFundAllocation = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有经费分配记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_FundAllocationForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配记录',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundAllocation]
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundAllocation = grid.getStore().getAt(rowIndex);
        Srims.projects.projectFundAllocation = fundAllocation;
        
        Srims.Load.loadFundModule('Srims.projects.showProjectFundAllocation();');
    };
    this._gridPanelFundAllocation.on('celldblclick', onCellDblClick);
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_FundAllocationForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.projects.projectPerformanceAllocation = undefined;
Srims.projects.showProjectPerformanceAllocation = function(){
Srims.performance.showPerformanceAllocationInfo(Srims.projects.projectPerformanceAllocation);
}

Srims.projects.ProjectShowPanel_PerformanceAllocationForm = function(project){
    this._project = project;
    
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.performance.PerformanceAllocationService + '/GetByProjectID';
    this._store = new Srims.performance.PerformanceAllocationStore(load_url, params);
    this._columnModel = new Srims.performance.PerformanceAllocationGridPanel_ColumnModel(false);
    
    this._gridPanelFundAllocation = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'operator',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有绩效分配记录'
        }
    });
    
    Srims.projects.ProjectShowPanel_PerformanceAllocationForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '绩效分配记录',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundAllocation]
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundAllocation = grid.getStore().getAt(rowIndex);
        Srims.projects.projectPerformanceAllocation = fundAllocation;
        
        Srims.Load.loadPerformanceModule('Srims.projects.showProjectPerformanceAllocation();');
    };
    this._gridPanelFundAllocation.on('celldblclick', onCellDblClick);
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_PerformanceAllocationForm, Ext.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.douments) 
    Ext.namespace('Srims.douments');

Srims.projects.ProjectShowPanel_DocumentForm = function(project){
    this._project = project;
    
    var load_url = Srims.service.documents.DocumentService + '/GetByProjectID';
    var params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    this._store = new Srims.documents.DocumentStore(load_url, params);
    
    this._columnModel = new Srims.documents.DocumentGridPanel_ColumnModel();
    
    this._gridPanelDocument = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 720,
        autoExpand: true,
        autoExpandColumn: 'censorDateTime',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有文档信息'
        }
    });
    
    Srims.projects.ProjectShowPanel_DocumentForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '文档信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelDocument]
    });
    if (project.get('id')) 
        this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this._gridPanelDocument.on('celldblclick', onCellDblClick);
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
    
}
Ext.extend(Srims.projects.ProjectShowPanel_DocumentForm, Ext.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.douments) 
    Ext.namespace('Srims.douments');

Srims.projects.ProjectShowPanel_ContractForm = function(projectId){
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: projectId == undefined ? 0 : projectId
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel();
    
    this._gridPanelContract = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'type',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有合同信息'
        }
    });
    Srims.projects.ProjectShowPanel_ContractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '合同信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelContract]
    });
    if (projectId) 
        this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this._gridPanelContract.on('celldblclick', onCellDblClick);
    
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_ContractForm, Ext.form.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_StateHistoryForm = function(project){
    this._project = project;
    
    this._store = new Srims.projects.ProjectHistoryStateStore(project);
    
    this._columnModel = new Ext.grid.ColumnModel([{
        header: "id",
        hidden: true
    }, {
        header: "项目状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.projects.projectStateRender
    }, {
        header: "时间",
        dataIndex: 'dateTime',
        width: 80,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        id: 'remark',
        header: "备注",
        dataIndex: 'remark'
    }]);
    
    this._gridPanelProjectStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoHeight: true,
        autoExpandColumn: 'remark',
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true
        }
    });
    
    Srims.projects.ProjectShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目状态历史',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectStateHistory]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_StateHistoryForm, Ext.FormPanel, {});

if (!Srims.projects) 
    Ext.namespace("Srims.projects");

Srims.projects.ProjectShowPanel_SystemForm = function(project){

    this._project = project;
    
    this._fieldCreator = new Ext.form.Field({
        fieldLabel: '创建人',
        value: project.get('creator'),
        readOnly: true,
        width: 160
    });
    
    this._fieldCreatorDate = new Ext.form.Field({
        fieldLabel: '创建时间',
        value: Date.render(project.get('createDate')),
        readOnly: true,
        width: 160
    });
    
    Srims.projects.ProjectShowPanel_SystemForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '系统信息',
        autoHeight: true,
        frame: true,
        labelWidth: 70,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldCreator]
            }), new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldCreatorDate]
            })]
        })]
    });
    
    this.setProject = function(project){
        this._project = project;
        this._fieldCreator.setValue(project.get('creator'));
        this._fieldCreatorDate.setValue(Date.render(project.get('createDate')));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_SystemForm, Ext.form.FormPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_RemarkForm = function(project){
    this._project = project;
    
    this._textAreaRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        hideLabel: true,
        value: project.get('remark'),
        readOnly: true,
        width: 570
    });
    Srims.projects.ProjectShowPanel_RemarkForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '备注',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textAreaRemark]
    });
    this.resetComponentValue = function(project){
        this._textAreaRemark = this._project.get('remark');
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_RemarkForm, Ext.FormPanel);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel = function(panelId, project) {

    // field
    this._project = project;
    this._id = panelId;

    // controls
    this._formPanelProjectOut = new Srims.projects.ProjectShowPanel_ProjectOutForm(project);
    this._formPanelBasic = new Srims.projects.ProjectShowPanel_BasicForm(project);
    this._formPanelMember = new Srims.projects.ProjectShowPanel_MemberForm(project);
    this._formPanelType = new Srims.projects.ProjectShowPanel_TypeForm(project);
    this._formPanelRecovery = new Srims.projects.ProjectShowPanel_RecoveryForm(project);
    this._formPanelFund = new Srims.projects.ProjectShowPanel_FundForm(project);
    this._formPanelFundBorrow = new Srims.projects.ProjectShowPanel_FundBorrowForm(project);
    this._formPanelFundReturn = new Srims.projects.ProjectShowPanel_FundReturnForm(project);
    this._formPanelPayPlanItem = new Srims.projects.projectShowPanel_PayPlanItemForm(project);
    this._formPanelFundAllocation = new Srims.projects.ProjectShowPanel_FundAllocationForm(project);

    this._formPanelPerformanceAllocation = new Srims.projects.ProjectShowPanel_PerformanceAllocationForm(project);
    this._formPanelDocument = new Srims.projects.ProjectShowPanel_DocumentForm(project);
    this._formPanelContract = new Srims.projects.ProjectShowPanel_ContractForm(project
			.get('id'));
    this._formPanelStateHistory = new Srims.projects.ProjectShowPanel_StateHistoryForm(project);
    this._formPanelSystem = new Srims.projects.ProjectShowPanel_SystemForm(project);
    this._formPanelRemark = new Srims.projects.ProjectShowPanel_RemarkForm(project);
    this._toolBar = new Srims.projects.ProjectShowPanel_ToolBar(project,
			this._id);

    // constructor
    Srims.projects.ProjectShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._project.get('name'),
        iconCls: 'icon-project-show',
        tbar: this._toolBar,
        items: [this._formPanelProjectOut, this._formPanelBasic, this._formPanelMember,
						this._formPanelType, this._formPanelFund, this._formPanelRecovery,
						this._formPanelFundBorrow, this._formPanelFundReturn,
						this._formPanelPayPlanItem,
						this._formPanelFundAllocation, this._formPanelPerformanceAllocation, this._formPanelDocument,
						this._formPanelContract, this._formPanelStateHistory,
						this._formPanelSystem, this._formPanelRemark]
    });
    // 方法
    this.resetComponentValue = function(project) {

        this._formPanelBasic.resetComponentValue(project);
        this._formPanelFund.resetComponentValue(project);
        this._formPanelType.resetComponentValue(project);
        this._formPanelRemark.resetComponentValue(project);
        this._formPanelMember.setProject(project);
        this._formPanelFundBorrow.setProject(project);
        this._formPanelFundReturn.setProject(project);
        this._formPanelPayPlanItem.setProject(project);
        this._formPanelDocument.setProject(project);
        this._formPanelContract.setProject(project);
        this._formPanelStateHistory.setProject(project);
        this._formPanelSystem.setProject(project);
    }
    this.resetProject = function(project) {
        this._toolBar.setVisible(false);
        this._project = project;
        this._formPanelBasic.resetComponentValue(project);
        this._formPanelFund.resetComponentValue(project);
        this._formPanelType.resetComponentValue(project);
        this._formPanelRemark.resetComponentValue(project);
        this._formPanelMember.setProject(project);
        this._formPanelFundBorrow.setProject(project);
        this._formPanelFundReturn.setProject(project);
        this._formPanelPayPlanItem.setProject(project);
        this._formPanelDocument.setProject(project);
        this._formPanelContract.setProject(project);
        this._formPanelStateHistory.setProject(project);
        this._formPanelSystem.setProject(project);
        
    }

    this.next = function() {
        Srims.projects.submitStart(this._project);
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.projects.ProjectShowPanel, Ext.Panel, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_ToolBar = function(project) {

    //fields
    this._project = project;
    this._showPanel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));

    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.editProject(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目</b><br/>编辑这个项目的基本、类别、经费等信息'
    });
    this._buttonMemberManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '成员管理',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.showProjectMemberWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b><br/>编辑这个项目的成员信息'
    });
    this._buttonPayPlanItemManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-pay-plan-item',
        text: '付款计划管理',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.showPayPlanItemWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目付款计划</b><br/>编辑这个项目的付款计划信息'
    });
    this._buttonContractManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-contract',
        text: '合同管理',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.showContractWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目合同</b><br/>编辑这个项目的合同信息'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-project-document',
        text: '文档管理',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.showDocumentWindow(this.project);
        },
        hidden: true,
        tooltip: '<b>编辑项目文档</b><br/>编辑这个项目的文档信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            Ext.MessageBox.confirm('删除项目', '你确定要删除这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.deleteProject(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除项目</b><br/>删除这个项目'
    });
    this._buttonWithDraw = new Ext.Toolbar.Button({
        iconCls: 'icon-withDraw',
        text: '撤消',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!this.project)
                return;

            Ext.MessageBox.confirm('撤销项目', '你确定要撤销这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.withDrawProject(this.project)
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤消项目</b><br/>撤消选中的项目'
    });
    this._buttonTerminate = new Ext.Toolbar.Button({
        iconCls: 'icon-terminate',
        text: '终止',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!this.project)
                return;

            Ext.MessageBox.confirm('终止项目', '你确定要终止这个项目吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.terminateProject(this.project)
            }, this);
        },
        hidden: true,
        tooltip: '<b>终止项目</b><br/>终止选中的项目'
    });
    this._buttonCensorStartPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '通过立项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            Ext.MessageBox.show({
                title: '审核通过立项申请',
                msg: '您需要同时审核通过该项目的合同和文档吗？<br />点击“是”按钮，同时审核通过项目的合同和文档；<br />点击“否”按钮，仅审核通过项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                buttons: Ext.MessageBox.YESNOCANCEL,
                scope: this,
                fn: function(button) {
                    if (button == 'yes')
                        Srims.projects.censorStart_Pass(this.project, true);
                    if (button == 'no')
                        Srims.projects.censorStart_Pass(this.project, false);
                },
                icon: Ext.MessageBox.QUESTION
            });
        },
        hidden: !project.get('canCensorStart'),
        tooltip: '<b>审核通过</b><br/>审核通过这个项目的立项申请'
    });
    this._buttonCensorEndPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '通过结项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            Ext.MessageBox.confirm('审核通过结项申请', '你确定要审核通过这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.censorEnd_Pass(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过这个项目的结项申请'
    });
    this._buttonCensorStartReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '驳回立项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.rejectProjectCensor(this.project, true);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回这个项目的立项申请'
    });
    this._buttonCensorEndReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '驳回结项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.rejectProjectCensor(this.project, false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回这个项目的结项申请'
    });
    this._buttonSubmitStart = new Ext.Toolbar.Button({
        iconCls: 'icon-submit-start',
        text: '提交立项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            var flag = false;
            var msgInfo = '由于以下原因，项目立项申请可能会被驳回：<br/><br/><br/>';
            var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
            if (panel._formPanelMember._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px;">项目未指定任何成员<br/></span>';
            }
            if (panel._formPanelContract._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px">项目未提交合同<br/></span>';
            }
            if (panel._formPanelPayPlanItem._store.getCount() == 0) {
                flag = true;
                msgInfo += '<span style="margin-left: 50px">项目到帐计划不完整<br/></span><br/>';
            }
            msgInfo += '建议您补充完上述信息后再提交<br/>';
            if (flag)
                msgInfo += '你仍然要提交这个项目的立项申请吗？';
            else
                msgInfo = '你确定要提交这个项目的立项申请吗？';

            Ext.MessageBox.confirm('提交立项申请', msgInfo, function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.submitStart(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交立项申请</b><br/>提交这个项目的立项申请'
    });
    this._buttonSubmitEnd = new Ext.Toolbar.Button({
        iconCls: 'icon-submit-end',
        text: '提交结项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Ext.MessageBox.confirm('提交结项申请', '你确定要提交这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.submitEnd(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>提交结项申请</b><br/>提交这个项目的结项申请'
    });
    this._buttonUndoStart = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-start',
        text: '撤销立项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Ext.MessageBox.confirm('撤销立项申请', '你确定要撤销这个项目的立项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.undoStart(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销立项申请</b><br/>撤销这个项目的立项申请'
    });
    this._buttonUndoEnd = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-end',
        text: '撤销结项申请',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;

            Ext.MessageBox.confirm('撤销结项申请', '你确定要撤销这个项目的结项申请吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.projects.undoEnd(this.project);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销结项申请</b><br/>撤销这个项目的结项申请'
    });
    this._buttonClearAccountBookNumber = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-project-account-book-number',
        text: '清空账本号',
        minWidth: 60,
        project: this._project,
        handler: function() {
            if (!project)
                return;
            Srims.projects.clearProjectAccountBookNumber(this.project);
        },
        hidden: true,
        tooltip: '<b>清空项目账本号</b><br/>清空这个项目的账本号'
    });
    this._buttonDocumentModelManage = new Ext.Toolbar.Button({
        iconCls: 'icon-Document-model-manage',
        text: '下载文档模板',
        minWidth: 60,
        project: this._project,
        handler: function() {
            Srims.type.showDocumentModelManageWindow(this.project.get('typeId'), this.project.get('typeName'), true);
        },
        tooltip: '<b>下载项目类型文档模板</b><br/>下载该项目类型的文档模板'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        project: this._project,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + '/GetById',
                params: {
                    projectId: this.project.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });
                    var currentProject = store.getAt(0);
                    var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + currentProject.get('id'));

                    panel.resetComponentValue(currentProject);
                    panel._formPanelMember._store.load();
                    panel._formPanelPayPlanItem._store.load();
                    panel._formPanelFundAllocation._store.load();
                    panel._formPanelPerformanceAllocation._store.load();
                    panel._formPanelFundBorrow._store.load();
                    panel._formPanelFundReturn._store.load();
                    panel._formPanelDocument._store.load();
                    panel._formPanelContract._store.load();
                    panel._formPanelProjectOut._store.load();
                    panel._formPanelStateHistory._store.load();
                    panel._toolBar._resetButtonVisibleAndDisabled(currentProject);
                    panel._toolBar._resetButtonProject(currentProject);
                }
            });
        },
        tooltip: '<b>刷新项目信息</b><br/>刷新项目的全部信息'
    });
    var user = Srims.currentLoginLog.user;
    var buttonItems = [this._buttonEdit, this._buttonMemberManage, this._buttonPayPlanItemManage, this._buttonContractManage, this._buttonDocumentManage];
    if (user.userRoleType == Srims.users.UserRoleType.Administrator) {
        buttonItems[buttonItems.length] = this._buttonCensorStartPass;
        buttonItems[buttonItems.length] = this._buttonCensorStartReject;
        buttonItems[buttonItems.length] = this._buttonCensorEndPass;
        buttonItems[buttonItems.length] = this._buttonCensorEndReject;
        buttonItems[buttonItems.length] = this._buttonDocumentModelManage
        buttonItems[buttonItems.length] = this._buttonClearAccountBookNumber;
        buttonItems[buttonItems.length] = this._buttonWithDraw;
        buttonItems[buttonItems.length] = this._buttonTerminate;
    }
    if (user.userRoleType == Srims.users.UserRoleType.Expert) {
        buttonItems[buttonItems.length] = this._buttonSubmitStart;
        buttonItems[buttonItems.length] = this._buttonSubmitEnd;
        buttonItems[buttonItems.length] = this._buttonUndoStart;
        buttonItems[buttonItems.length] = this._buttonUndoEnd;
    }
    buttonItems[buttonItems.length] = [this._buttonDelete];
    buttonItems[buttonItems.length] = new Ext.Toolbar.Fill();
    buttonItems[buttonItems.length] = [this._buttonRefresh];
    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: buttonItems,
        height: 25
    });
    //重设button属性，外部调用
    this._resetButtonVisibleAndDisabled = function(project) {
        this._buttonEdit.setVisible(project.get('hasPermission_Edit'));
        this._buttonEdit.setDisabled(!project.get('canEdit'));

        this._buttonDelete.setVisible(project.get('hasPermission_Delete'));
        this._buttonDelete.setDisabled(!project.get('canDelete'));

        this._buttonWithDraw.setVisible(project.get('hasPermission_WithDraw'));
        this._buttonWithDraw.setDisabled(!project.get('canWithDraw'));

        this._buttonTerminate.setVisible(project.get('hasPermission_Terminate'));
        this._buttonTerminate.setDisabled(!project.get('canTerminate'));

        this._buttonMemberManage.setVisible(project.get('hasPermission_ShowProejectMember'));
        this._buttonMemberManage.setDisabled(!project.get('canShow_ProjectMember'));

        this._buttonPayPlanItemManage.setVisible(project.get('hasPermission_ShowProejectPayPlanItem'));
        this._buttonPayPlanItemManage.setDisabled(!project.get('canShow_ProjectPayPlanItem'));

        this._buttonContractManage.setVisible(project.get('hasPermission_ShowProejectContract'));
        this._buttonContractManage.setDisabled(!project.get('canShow_ProjectContract'));

        this._buttonDocumentManage.setVisible(project.get('hasPermission_ShowProejectDocument'));
        this._buttonDocumentManage.setDisabled(!project.get('canShow_ProjectDocument'));

        this._buttonCensorEndPass.setVisible(project.get('canCensorEnd'));
        this._buttonCensorEndReject.setVisible(project.get('canCensorEnd'));

        this._buttonCensorStartPass.setVisible(project.get('canCensorStart'));
        this._buttonCensorStartReject.setVisible(project.get('canCensorStart'));

        this._buttonSubmitStart.setVisible(project.get('canSubmitStart'));
        this._buttonSubmitEnd.setVisible(project.get('canSubmitEnd'));
        this._buttonUndoStart.setVisible(project.get('canUndoStart'));
        this._buttonUndoEnd.setVisible(project.get('canUndoEnd'));

        this._buttonClearAccountBookNumber.setVisible(project.get('canClearProjectAccountBookNumber'));
        this._buttonClearAccountBookNumber.setDisabled(!project.get('canClearProjectAccountBookNumber'))
    }
    this._resetButtonProject = function(project) {
        this._buttonEdit.project = project;
        this._buttonDelete.project = project;
        this._buttonWithDraw.project = project;
        this._buttonTerminate.project = project;
        this._buttonMemberManage.project = project;
        this._buttonPayPlanItemManage.project = project;
        this._buttonContractManage.project = project;
        this._buttonDocumentManage.project = project;
        this._buttonCensorEndPass.project = project;
        this._buttonCensorEndReject.project = project;
        this._buttonCensorStartPass.project = project;
        this._buttonCensorStartReject.project = project;
        this._buttonSubmitStart.project = project;
        this._buttonSubmitEnd.project = project;
        this._buttonUndoStart.project = project;
        this._buttonUndoEnd.project = project;
        this._buttonDocumentModelManage.project = project;
        this._buttonClearAccountBookNumber.project = project;
    }
    this._resetButtonVisibleAndDisabled(this._project);
}
Ext.extend(Srims.projects.ProjectShowPanel_ToolBar, Ext.Toolbar);
if (!Srims.projects)
	Ext.namespace('Srims.projects');

Srims.projects.ProjectMember = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'name',
	type: 'string',
	mapping: 'Name'
},{
	name: 'expertID',
	type: 'int',
	mapping: 'ExpertID'
},{
	name: 'number',
	type: 'string',
	mapping: 'Number'
},{
	name: 'isExpertSecondCollege',
	type: 'string',
	mapping: 'IsExpertSecondCollege',
	convert: Boolean.toBoolean
},{
	name: 'order',
	type: 'string',
	mapping: 'Order'
},{
	name: 'taskNo',
	type: 'string',
	mapping: 'TaskNo'
},{
	name: 'taskName',
	type: 'string',
	mapping: 'TaskName'
}]);
Srims.data.Entity.apply(Srims.projects.ProjectMember);
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel = function(project){

    this._project = project;
    this._store = new Srims.projects.ProjectMemberStore(project);
    this._columnModel = new Srims.projects.ProjectMemberGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ProjectMemberGridPanel_ToolBar(this._selections, this._store, this._project);
    
    this.params = {};
    this.params.sm = this._selections;
    this.params.store = this._store;
    this.params.colModel = this._columnModel;
    this.params.tbar = this._toolBar;
    this.params.height = 220;
    
    //constructor
    Srims.projects.ProjectMemberGridPanel.superclass.constructor.call(this, this.params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectMember = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectMember(this._project, projectMember, this._store);
    }
    this.on('celldblclick', onCellDblClick);
    
    this._reset = function(project){
        this._project = project;
        this._store.load({
            params: {
                projectId: project.get('id')
            }
        });
        this._toolBar._reset(this._store, this._project);
    }
    
};
Ext.extend(Srims.projects.ProjectMemberGridPanel, Srims.component.GridPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel_ColumnModel = function(){
    Srims.projects.ProjectMemberGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "姓名",
        dataIndex: 'name',
        width: 70
    }, {
        header: "位次",
        dataIndex: 'order',
        width: 40
    }, {
        header: "工作证号",
        dataIndex: 'number',
        width: 70
    }, {
        header: "子课题编号",
        dataIndex: 'taskNo',
        width: 100
    }, {
        id: 'taskName',
        header: "子课题名称",
        dataIndex: 'taskName'
    }]);
}
Ext.extend(Srims.projects.ProjectMemberGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
        var load_url = Srims.service.projects.ProjectMemberService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.get('id');
        }
        Srims.projects.ProjectMemberStore.superclass.constructor.call(this, new Srims.projects.ProjectMemberXmlReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectMemberXmlReader.superclass.constructor.call(this, Srims.projects.ProjectMember);
    }
});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._projectMemberGridPanel = new Srims.projects.ProjectMemberGridPanel(this._project);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.projects.ProjectMemberWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目“' + this._project.get('name') + '”成员管理',
        iconCls: 'icon-project-member-manage',
        width: 600,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._projectMemberGridPanel],
        buttons: [this._buttonClose]
    });
    this._projectMemberGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelMember._store.load();
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.projects.ProjectMemberWindow, Ext.Window, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberGridPanel_ToolBar = function(selection, store, project){

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.newProjectMember(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>新建项目成员</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.projects.editProjectMember(this.project, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除项目成员', '你确定要删除这个项目成员吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projectMemberID = this.selection.getSelected().get('id');
                    
                    Ext.Ajax.request({
                        url: Srims.service.projects.ProjectMemberService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function(){
                            this.store.load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        project: this._project,
        handler: function(){
            this.store = new Srims.projects.ProjectMemberStore(project);
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目成员列表'
    });
    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });
    
    this._buttonNew.setVisible(project.get('hasPermission_EditProjectMember'));
    this._buttonNew.setDisabled(!project.get('canEdit_ProjectMember'));
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        buttonEdit.setVisible(project.get('hasPermission_EditProjectMember'));
        buttonEdit.setDisabled(!project.get('canEdit_ProjectMember'));
        
        buttonDelete.setVisible(project.get('hasPermission_EditProjectMember'));
        buttonDelete.setDisabled(!project.get('canEdit_ProjectMember'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    
}
Ext.extend(Srims.projects.ProjectMemberGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.projects)
	Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberEditWindow = function(id, projectMember, project, store) {

	this._id = id;
	this._projectMember = projectMember;
	this._project = project;
	this._store = store;

	this._buttonClose = new Ext.Button({
		minWidth: 80,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.close();
		}
	});
	this._buttonSave = new Ext.Button({
		minWidth: 80,
		text: '保 存',
		window: this
	});

	this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
		fieldLabel: '专家',
		width: 140,
		value: this._projectMember.get('name'),
		selectEntityId: this._projectMember.get('expertID'),
		allowBlank: false
	});
	this._checkboxIsSecondCollege = new Ext.form.Checkbox({
		fieldLabel: '双聘单位',
		checked: this._projectMember.get('isExpertSecondCollege'),
		disabled: true
	});
	this._textFieldOrder = new Ext.form.NumberField({
		fieldLabel: '位次',
		width: 80,
		value: this._projectMember.get('order'),
		maxValue: 500,
		minValue: 1,
		allowBlank: false,
		allowDecimals: false,
		allowNegative: false
	});
	this._textFieldTaskName = new Ext.form.TextField({
		fieldLabel: '子课题名称',
		value: this._projectMember.get('taskName'),
		width: 180
	});
	this._textFieldTaskNO = new Ext.form.TextField({
		fieldLabel: '子课题编号',
		value: this._projectMember.get('taskNo'),
		width: 180
	});
	Srims.projects.ProjectMemberEditWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '编辑项目成员信息',
		width: 350,
		labelWidth: 70,
		height: 200,
		modal: true,
		bodyStyle: 'padding:10px 10px 0',
		deferredRender: false,
		frame: true,
		closeAction: 'close',
		layout: 'form',
		resizable: false,
		items: [this._textFieldOrder, this._comboBoxExpert,this._checkboxIsSecondCollege, this._textFieldTaskName, this._textFieldTaskNO],
		buttons: [this._buttonSave, this._buttonClose]
	});

	this._validateOrderAndExpert = function() {
		var projectMembers = this._store.getRange();
		var projectMemberOrder = this._textFieldOrder.getValue();
		var expertID = this._comboBoxExpert.getValue();

		for (var i = 0; i < projectMembers.length; i++) {
			if (this._projectMember == projectMembers[i])
				continue;

			if (projectMemberOrder == projectMembers[i].get('order')) {
				Ext.Msg.show({
					title: '成员位次错误',
					msg: '成员位次不能重复，请重新输入位次',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.WARNING
				});
				return false;
			}
			if (expertID == projectMembers[i].get('expertID')) {
				Ext.Msg.show({
					title: '专家错误',
					msg: '该专家已经是这个项目的成员，请重新选择专家',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.WARNING
				});
				return false;
			}
		}
		return true;
	}
	this._comboBoxExpert.checkboxIsSecondCollege= this._checkboxIsSecondCollege;
	this.comboBoxExpert_Change = function(comboBox) {
		//处理专家变化
		var expertSecondCollege = comboBox.getEntity().get('college2');
		if (expertSecondCollege != '') {
			comboBox.checkboxIsSecondCollege.setDisabled(false);
		};
	}
	this._comboBoxExpert.on('change', this.comboBoxExpert_Change);

	this._isValid = function(preventMark) {
		var result = true;

		result = this._textFieldOrder.isValid(preventMark) && result;
		result = this._textFieldTaskNO.isValid(preventMark) && result;
		result = this._textFieldTaskName.isValid(preventMark) && result;
		result = this._comboBoxExpert.isValid(preventMark) && result;
		result = this._validateOrderAndExpert() && result;

		return result;
	}
	this._assignValues = function() {
		this._projectMember.set('expertID', this._comboBoxExpert.getValue());
		this._projectMember.set('order', this._textFieldOrder.getValue());
		this._projectMember.set('isExpertSecondCollege', this._checkboxIsSecondCollege.getValue());
		this._projectMember.set('taskName', this._textFieldTaskName.getValue());
		this._projectMember.set('taskNo', this._textFieldTaskNO.getValue());
		this._projectMember.set('projectID', this._project.get('id'));
	}
	this._save = function() {
		var projectMember = this._projectMember;
		projectMember.beginEdit();
		this._assignValues();
		projectMember.commit();

		Ext.Ajax.request({
			url: Srims.service.projects.ProjectMemberService + '/Save',
			params: projectMember.data,
			scope: this,
			success: function() {
				this._store.load();
				this.close();
			}
		});
	}
	this._buttonSave_Click = function(button) {
		var window = button.window;

		if (!window._isValid(false))
			return;

		button.setText('正在保存');
		button.disable();

		window._save();
	}
	this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.projects.ProjectMemberEditWindow, Ext.Window, {})
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectCensorRejectWindow = function(id, project, isStart){

    this._id = id;
    this._project = project;
    this._isStart = isStart;
    
    this._buttonReject = new Ext.Button({
        minWidth: 80,
        text: '驳回',
        window: this,
        handler: function(){
            var window = this.window;
            var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '(' + window._textRejectRemark.getValue() + ')';
            
            if (window._isStart) 
                Ext.MessageBox.show({
                    title: '审核驳回立项申请',
                    msg: '您需要同时审核驳回该项目的合同和文档吗？<br />点击“是”按钮，同时审核驳回项目的合同和文档；<br />点击“否”按钮，仅审核驳回项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                    buttons: Ext.MessageBox.YESNOCANCEL,
                    scope: this,
                    fn: function(button){
                        if (button == 'yes') 
                            Srims.projects.censorStart_Reject(window._project, remark, true);
                        if (button == 'no') 
                            Srims.projects.censorStart_Reject(wndow._project, remark, false);
                    },
                    icon: Ext.MessageBox.QUESTION
                });
            else 
                Srims.projects.censortEnd_Reject(window._project, remark);
            
            window.close();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
        fieldLabel: '驳回理由',
        noticeTextType: 'ProjectCensorRejectReason',
        listWidth: 160,
        width: 130
    });
    this._textRejectRemark = new Ext.form.TextArea({
        fieldLabel: '详细说明',
        height: 60,
        width: 200
    });
    
    Srims.projects.ProjectCensorRejectWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._isStart ? '驳回项目立项申请' : '驳回项目结项申请',
        iconCls: 'icon-censor-reject',
        width: 320,
        labelWidth: 70,
        height: 180,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxRejectReson, this._textRejectRemark],
        buttons: [this._buttonReject, this._buttonClose]
    });
}
Ext.extend(Srims.projects.ProjectCensorRejectWindow, Ext.Window, {})

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectClearAccountBookNumberWindow = function(id, project){

    this._project = project;
    
    this._WarningPanel = new Srims.projects.ProjectClearAccountBookNumberWindow_WarningPanel();
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonClear = new Ext.Button({
        minWidth: 80,
        text: '清 空',
        window: this
    });
    
    this._textClearAccountBookNumberReason = new Ext.form.TextArea({
        fieldLabel: '清空账本号理由',
        height: 60,
        allowBlank: false,
        width: 230
    });
    Srims.projects.ProjectClearAccountBookNumberWindow.superclass.constructor.call(this, {
        id: id,
        title: '清空项目账本号',
        width: 430,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._WarningPanel, new Ext.Panel({
            layout: 'form',
            bodyStyle: 'padding:5px 10px 0 10px',
            height: 85,
            frame: true,
            labelWidth: 100,
            items: [this._textClearAccountBookNumberReason]
        })],
        
        buttons: [this._buttonClear, this._buttonClose]
    });
    
    this.validate = function(preventMark){
        var result = true;
        result = this._textClearAccountBookNumberReason.isValid(preventMark) && result;
        return result;
    }
    this.clear = function(){
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/ClearProjectAccountBookNumber',
            params: {
                projectId: this._project.get('id'),
                clearReason: this._textClearAccountBookNumberReason.getValue()
            },
            scope: this,
            success: function(){
                Ext.Msg.show({
                    title: '清空项目账本号',
                    msg: '成功清空项目的账本号',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.close();
            }
        });
    }
    this._buttonClear_Click = function(button, e){
        var window = button.window;
        
        if (!window.validate(false)) 
            return;
        
        Ext.MessageBox.confirm('清空项目账本号确认', '你确定要清空这个项目的账本号吗？', function(buttonId){
            if (buttonId == 'yes') {
                button.setText('正在清空');
                button.disable();
                
                window.clear();
            }
        }, this);
    }
    this._buttonClear.on('click', this._buttonClear_Click);
}
Ext.extend(Srims.projects.ProjectClearAccountBookNumberWindow, Ext.Window);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectClearAccountBookNumberWindow_WarningPanel = function(){
    Srims.projects.ProjectClearAccountBookNumberWindow_WarningPanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">警告：清空项目账本号操作不可撤销，不可修改；请仔细填写清空项目账本号的理由！</span>'
    });
}
Ext.extend(Srims.projects.ProjectClearAccountBookNumberWindow_WarningPanel, Ext.Panel);

if (!Srims.projects) 
    Ext.namespace("Srims.projects");

Srims.projects.ProjectRankSelectWindow = function(id){

    this._newProject = new Srims.projects.Project({});
    var startDate = new Date();
    var endDate = new Date(startDate.getFullYear() + 2, 11, 31);
    this._newProject.set('level', Srims.projects.ProjectLevel.Perside);
    this._newProject.set('state', Srims.projects.ProjectState.WaitingStartInformation);
    this._newProject.set('startDate', startDate);
    this._newProject.set('endDate', endDate);
    
    this._id = id;
    
    this._buttonClose = new Ext.Button({
        minWidth: 60,
        text: '确 定',
        window: this
    });
    
    this._projectRankRadioGroup = new Srims.component.RadioGroup({
        allowBlank: false,
        items: Srims.component.RadioGroup.ProjectRankStoreFunction(),
        width: 300
    });
    
    Srims.projects.ProjectRankSelectWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '请选择项目等级',
        width: 300,
        height: 100,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        resizable: false,
        items: [new Ext.Panel({
            width: 300,
            autoHeight: true,
            titile: '',
            frame: true,
            items: this._projectRankRadioGroup
        })],
        buttonAlign: 'center',
        buttons: [this._buttonClose]
    });
    this.assignValue = function(){
        this._newProject.set('isHorizontal', this._projectRankRadioGroup.getValue() == 'true' ? true : false);
        
    }
    this._buttonClose_Click = function(button){
        var window = button.window;
        if (window._projectRankRadioGroup.getValue() == 'false' && window._projectRankRadioGroup.getRadio(1).checked == false) {
            Ext.Msg.show({
                title: '项目横纵向不能为空',
                msg: '请选择项目横纵向',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        window.assignValue();
        window.close();
        Srims.projects.showExpertGuidProjectEditPanel(window._newProject);
    }
    this._buttonClose.on('click', this._buttonClose_Click)
}
Ext.extend(Srims.projects.ProjectRankSelectWindow, Ext.Window, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.MyUnsubmitProjectsGridPanel = function(project, projectStore, isSetHorizontal){

    //fields
    this._project = project;
    this._projectStore = projectStore;
    this._projectStore.gird = this;
    //controls  
    
    this._selection = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });
    this._selection.grid = this;
    this._columnModel = new Srims.projects.MyUnsubmitProjectsGridPanel_ColumnModel(this._selection);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的记录'
    });
    
    Srims.projects.MyUnsubmitProjectsGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._projectStore,
        sm: this._selection,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        width: 800,
        view: this._view,
        autoHeight: true
    });
    this._projectStore.load();
    
    this.next = function(){
        if (this._selection.getSelected()) {
            var project = this._selection.getSelected();
            if (project.get('id') != this.panel.panel._panelBasic._project.get('id')) {
                this.panel.panel._panelBasic.setProject(project);
                this.parentPanel._ProjectOutPanel.setProject(project);
                this.panel.panel.setIconClass('icon-project-edit');
                this.panel.panel.setTitle('项目' + project.get('name') + '立项申请');
            }
        }
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.projects.MyUnsubmitProjectsGridPanel, Srims.component.GridPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.MyUnsubmitProjectsGridPanel_ColumnModel = function(sm){
    Srims.projects.MyUnsubmitProjectsGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'typeName',
        width: 80,
        sortable: true,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.MyUnsubmitProjectsGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace("Srims.projects");

Srims.projects.ExpertGuidProjectEditPanel = function(id, newProject) {
    this._id = id;
    this._project = newProject;
    this._isHorizontal = newProject.get('isHorizontal');
    var params = {};
    params.isHorizontal = this._isHorizontal;
    this._projectStore = new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/GetMyUnsubmitProjects', params);

    this._panelUnSubmitProjects = new Srims.projects.MyUnsubmitProjectsGridPanel(this._project, this._projectStore, this._isSetHorizontal);
    this._panelUnSubmitProjects.parentPanel = this;
    this._ProjectOutPanel = new Srims.projects.ExpertGuideProjectOutGridPanel();
    var basicPanelId = this._isHorizontal ? "ProjectEditHorizontal" : "ProjectEditVertical";


    this._panelBasic = new Srims.projects.ProjectEditPanel(basicPanelId, this._project, this._projectStore, true, this._ProjectOutPanel);
    this._panelBasic.parentPanel = this;
    this._memberManagePanel = new Srims.projects.ExpertGuideProjectMemberGridPanel();
    this._contractManagePanel = new Srims.projects.ExpertGuideProjectContractGridPanel(this._project.get('isHorizontal'));
    this._documentManagePanel = new Srims.projects.ExpertGuideProjectDocumentGridPanel();
    this._payPlanItemManangePanel = new Srims.projects.ExpertGuideProjectPayPlanItemGridPanel();
    var showPanelId = this._isHorizontal ? "ProjectShowHorizontal" : "ProjectShowVertical";
    this._projectShowPanel = new Srims.projects.ProjectShowPanel(showPanelId, this._project);
    this._processPanels = [this._panelUnSubmitProjects, this._ProjectOutPanel, this._panelBasic, this._memberManagePanel, this._contractManagePanel, this._documentManagePanel, this._payPlanItemManangePanel, this._projectShowPanel];

    this._processDescriptionStore = Srims.expertGuide.ProjectEdit_ProcessDescriptionStore;
    this._processesShowPanel = new Srims.expertGuide.ProcessesShowForm(this._processDescriptionStore, '项目立项流程');
    var guideName = this._isHorizontal ? "HorizontalProjectEdit" : "VerticalProjectEdit";
    this._ProjectEditSingleProcessOperatePanel = new Srims.expertGuide.SingleProcessOperatePanel(guideName, this._processDescriptionStore, this._processPanels);

    this._ProjectEditSingleProcessOperatePanel.panel = this;
    this._processDescriptionStore.panel = this;

    Srims.projects.ExpertGuidProjectEditPanel.superclass.constructor.call(this, {
        id: this._id,
        iconCls: 'icon-project-new',
        title: newProject.get('isHorizontal') ? '横向项目立项' : '纵向项目立项',
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        height: 224,
        width: 650,
        items: [this._processesShowPanel, this._ProjectEditSingleProcessOperatePanel]
    });
}
Ext.extend(Srims.projects.ExpertGuidProjectEditPanel, Ext.Panel, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectMemberGridPanel_ToolBar = function(panel) {

    //fields
    this._panel = panel;

    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        panel: this._panel,
        handler: function() {
            Srims.projects.newProjectMember(this.panel._project, this.panel._store);
        },
        hidden: true,
        tooltip: '<b>新建项目成员</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        panel: this._panel,
        handler: function() {
            if (this.panel._selections.getCount() == 0)
                return;
            Srims.projects.editProjectMember(this.panel._project, this.panel._selections.getSelected(), this.panel._store);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
            if (this.panel._selections.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除项目成员', '你确定要删除这个项目成员吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projectMemberID = this.panel._selections.getSelected().get('id');

                    Ext.Ajax.request({
                        url: Srims.service.projects.ProjectMemberService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function() {
                            this.panel._store.load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>编辑项目成员</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
            this.panel.setProject(this.panel._project);
        },
        tooltip: '<b>刷新列表</b><br/>更新项目成员列表'
    });
    Srims.projects.ProjectGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });

    this.setProject = function(project) {
        this._buttonNew.setVisible(project.get('hasPermission_EditProjectMember'));
        this._buttonNew.setDisabled(!project.get('canEdit_ProjectMember'));
    }

    //initial
    this._panel._selections.buttonEdit = this._buttonEdit;
    this._panel._selections.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;

        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }

        buttonEdit.setVisible(buttonEdit.panel._project.get('hasPermission_EditProjectMember'));
        buttonEdit.setDisabled(!buttonEdit.panel._project.get('canEdit_ProjectMember'));

        buttonDelete.setVisible(buttonDelete.panel._project.get('hasPermission_EditProjectMember'));
        buttonDelete.setDisabled(!buttonDelete.panel._project.get('canEdit_ProjectMember'));
    }
    //events
    this._panel._selections.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ExpertGuideProjectMemberGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectMemberGridPanel = function() {

    this._project = new Srims.projects.Project({});
    this._store = new Srims.projects.ProjectMemberStore(this._project);
    this._columnModel = new Srims.projects.ProjectMemberGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectMemberGridPanel_ToolBar(this);

    this.params = {};
    this.params.sm = this._selections;
    this.params.store = this._store;
    this.params.colModel = this._columnModel;
    this.params.tbar = this._toolBar;
    this.params.height = 220;
    this.params.width = 600;

    //constructor
    Srims.projects.ProjectMemberGridPanel.superclass.constructor.call(this, this.params);

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var projectMember = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectMember(this._project, projectMember, this._store);
    }
    this.on('celldblclick', onCellDblClick);

    this.setProject = function(project) {
        this._project = project;

        this._toolBar.setProject(project);

        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }

    this.next = function() {
    Ext.MessageBox.confirm('项目成员', '是否已完成所有项目成员的填写？', function(buttonId) {
            if (buttonId == 'yes') {

                this.panel.panel._contractManagePanel.setProject(this._project);
                Srims.expertGuide.next(this);
            }
            else {
                return;
            }

        }, this);
    }
    this.previous = function() {
        this.panel.panel._panelBasic.setProject(this._project);
    }
};
Ext.extend(Srims.projects.ExpertGuideProjectMemberGridPanel, Srims.component.GridPanel, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.documents) 
    Ext.namespace('Srims.documents');


Srims.projects.ExpertGuideProjectContractGridPanel_ToolBar = function(panel){

    //fields
    this._panel = panel;
    
    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传主合同',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.uploadMainContract(this.panel._project, this.panel._store);
        },
        hidden: true,
        tooltip: '<b>上传主合同</b>'
    });
    this._buttonSubmitOutContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传外协合同',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.uploadOutContract(this.panel._project, this.panel._store);
        },
        hidden: true,
        tooltip: '<b>上传外协合同</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            var contract = this.panel._selections.getSelected();
            Srims.projects.downLoadContract(contract);
        },
        hidden: true,
        tooltip: '<b>查看项目合同</b><br/>查看选中的项目合同'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过合同', '你确定要审核通过这个项目合同吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorContractPass(this.panel._selections.getSelected(), this.panel._store, this.panel._project.get('isHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过项目合同</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Srims.projects.showCensorContractRejectWindow(this.panel._selections.getSelected(), this.panel._store, this.panel._project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回合同</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除合同', '你确定要删除这个合同吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.deleteContract(this.panel._project, this.panel._selections.getSelected(), this.panel._store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除合同</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            this.panel.setProject(this.panel._project);
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目合同列表'
    });
    Srims.projects.ExpertGuideProjectContractGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitMainContract, this._buttonSubmitOutContract, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, this._buttonRefresh]
    });
    
    this.setProject = function(project){
        this._panel._store.project = project;
        this._buttonSubmitMainContract.setVisible(project.get('hasPermission_EditProjectContract'));
        this._buttonSubmitOutContract.setVisible(project.get('hasPermission_EditProjectContract'));
        this._buttonSubmitOutContract.setDisabled(!project.get('canEdit_ProjectContract'));
    }
    
    //initial
    this._panel._selections.buttonDelete = this._buttonDelete;
    this._panel._selections.buttonShow = this._buttonShow;
    this._panel._selections.buttonCensorPass = this._buttonCensorPass;
    this._panel._selections.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        var contract = selection.getSelected();
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonDelete.setVisible(contract.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!contract.get('canDelete'));
        
        buttonShow.setVisible(buttonShow.panel._project.get('hasPermission_ShowProejectContract'));
        buttonShow.setDisabled(!buttonShow.panel._project.get('canShow_ProjectContract'));
        
        buttonCensorPass.setVisible(buttonCensorPass.panel._project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(buttonCensorPass.panel._project.get('canCensor_ProjectContract') && contract.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._panel._selections.on('selectionchange', this._onSelection_selectionChagne);
    this._panel._store.toolBar = this;
    this._panel._store.project = this._panel._project;
    this._panel._store.on('load', function(){
        var contracts = this.getRange();
        for (var i = 0; i < contracts.length; i++) {
            if (contracts[i].get('type') == Srims.documents.ContractType.MainContract) {
                this.toolBar._buttonSubmitMainContract.setDisabled(true);
                return;
            }
        }
        this.toolBar._buttonSubmitMainContract.setDisabled(!this.project.get('canEdit_ProjectMainContract'));
    });
}
Ext.extend(Srims.projects.ExpertGuideProjectContractGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectContractGridPanel = function(isHorizontal){

    this._project = new Srims.projects.Project({});
    
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: 0
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel(isHorizontal);
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectContractGridPanel_ToolBar(this);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    params.width = 600;
    
    Srims.projects.ExpertGuideProjectContractGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this.on('celldblclick', onCellDblClick);
    
    this.setProject = function(project){
        this._project = project;
        
        this._store.params.projectId = this._project.get('id');
        this._store.project = project;
        this._store.toolBar = this._toolBar;
        this._store.on('load', function(){
            this.toolBar.setProject(project);
        });
        this._store.load();
    }
    
    this.next = function(){
        if (this._store.getCount() == 0) {
            Ext.MessageBox.confirm('请上传合同', '您未上传任何合同，您的立项申请可能会被驳回，是否上传合同？', function(buttonId){
                if (buttonId == 'yes') {
                    return;
                }
                else {
                    this.panel.panel._documentManagePanel.setProject(this._project);
                    Srims.expertGuide.next(this);
                }
                
            }, this);
        }
        else {
            this.panel.panel._documentManagePanel.setProject(this._project);
            Srims.expertGuide.next(this);
        }
    }
};
Ext.extend(Srims.projects.ExpertGuideProjectContractGridPanel, Srims.component.GridPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.projects.ExpertGuideProjectDocumentGridPanel_ToolBar = function(panel){

    //fields
    this._panel = panel;
    
    //controls
    this._buttonRequireDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-require-document',
        text: '催缴文档',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.showRequireDocumentWindow(this.panel._project, this.panel._store);
        },
        tooltip: '<b>催缴文档</b>'
    });
    this._buttonSubmitDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传文档',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.uploadDocument(this.panel._project, this.panel._store);
        },
        tooltip: '<b>上传文档</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Srims.projects.downLoadDocument(this.panel._selections.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的项目文档'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.censorDocumentPass(this.panel._selections.getSelected(), this.panel._store, this.panel._project.get('isHorizontal'));
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过文档</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Srims.projects.showCensorDocumentRejectWindow(this.panel._selections.getSelected(), this.panel._store, this.panel._project.get('isHorizontal'));
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除文档', '你确定要删除这个项目文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.projects.deleteDocument(this.panel._project, this.panel._selections.getSelected(), this.panel._store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文档</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            this.panel._store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新项目文档列表'
    });
    Srims.projects.ExpertGuideProjectDocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonRequireDocument, this._buttonSubmitDocument, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    this.setProject = function(project){
    
        this._buttonSubmitDocument.setVisible(this._panel._project.get('hasPermission_EditProjectDoucment'));
        this._buttonSubmitDocument.setDisabled(!this._panel._project.get('canEdit_ProjectDocument'));
        this._buttonRequireDocument.setVisible(this._panel._project.get('canRequire_ProjectDocument'));
        
    }
    
    //initial
    this._panel._selections.buttonDelete = this._buttonDelete;
    this._panel._selections.buttonShow = this._buttonShow;
    this._panel._selections.buttonCensorPass = this._buttonCensorPass;
    this._panel._selections.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        var document = selection.getSelected();
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonDelete.setVisible(document.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!document.get('canDelete'));
        
        buttonShow.setVisible(buttonShow.panel._project.get('hasPermission_ShowProejectDocument'));
        buttonShow.setDisabled(!buttonShow.panel._project.get('canShow_ProjectDocument'));
        
        buttonCensorPass.setVisible(buttonCensorPass.panel._project.get('canCensor_ProjectDocument') && document.get('state') == Srims.CensorState.waitingCensor);
        buttonCensorReject.setVisible(buttonCensorPass.panel._project.get('canCensor_ProjectDocument') && document.get('state') == Srims.CensorState.waitingCensor);
    }
    //events
    this._panel._selections.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ExpertGuideProjectDocumentGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectDocumentGridPanel = function(){

    this._project = new Srims.projects.Project({});
    
    var load_url = Srims.service.documents.DocumentService + '/GetByProjectID';
    var params = {
        projectId: 0
    };
    this._store = new Srims.documents.DocumentStore(load_url, params);
    this._columnModel = new Srims.documents.DocumentGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectDocumentGridPanel_ToolBar(this);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 270;
    params.width = 900;
    
    Srims.projects.ExpertGuideProjectDocumentGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
    
    
    this.setProject = function(project){
        this._project = project;
        
        this._toolBar.setProject(project);
        
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
    
    this.next = function(){
        if (this._store.getCount() == 0) {
            Ext.MessageBox.confirm('请上传文档', '您未上传任何文档，您的立项申请可能会被驳回，是否上传文档？', function(buttonId){
                if (buttonId == 'yes') {
                    return;
                }
                else {
                    this.panel.panel._payPlanItemManangePanel.setProject(this._project);
                    Srims.expertGuide.next(this);
                }
                
            }, this);
        }
        else {
            this.panel.panel._payPlanItemManangePanel.setProject(this._project);
            Srims.expertGuide.next(this);
        }
    }
    
};
Ext.extend(Srims.projects.ExpertGuideProjectDocumentGridPanel, Srims.component.GridPanel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.ExpertGuideProjectPayPlanItemGridPanel_ToolBar = function(panel){

    //fields
    this._panel = panel;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.newProjectPayPlanItem(this.panel._project, this.panel._store);
        },
        hidden: true,
        tooltip: '<b>新建付款计划</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            Srims.projects.editProjectPayPlanItem(this.panel._project, this.panel._selections.getSelected(), this.panel._store);
        },
        hidden: true,
        tooltip: '<b>编辑付款计划</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('删除付款计划', '你确定要删除这个付款计划吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projetPayPlanItemID = this.panel._selections.getSelected().get('id');
                    
                    Ext.Ajax.request({
                        url: Srims.service.fund.PayPlanItemService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function(){
                            this.panel._store.load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除付款计划</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            this.panel._store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费到帐计划列表'
    });
    Srims.projects.ExpertGuideProjectPayPlanItemGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });
    
    this.setProject = function(project){
        this._buttonNew.setVisible(this._panel._project.get('hasPermission_EditProjectPayPlanItem'));
        this._buttonNew.setDisabled(!this._panel._project.get('canEdit_ProjectPayPlanItem'));
    }
    
    
    //initial
    this._panel._selections.buttonEdit = this._buttonEdit;
    this._panel._selections.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        buttonEdit.setVisible(buttonEdit.panel._project.get('hasPermission_EditProjectPayPlanItem'));
        buttonEdit.setDisabled(!buttonEdit.panel._project.get('canEdit_ProjectPayPlanItem'));
        
        buttonDelete.setVisible(buttonDelete.panel._project.get('hasPermission_EditProjectPayPlanItem'));
        buttonDelete.setDisabled(!buttonDelete.panel._project.get('canEdit_ProjectPayPlanItem'));
    }
    //events
    this._panel._selections.on('selectionchange', this._onSelection_selectionChagne);
    this._panel._store.toolBar = this;
    this._panel._store.on('load', function(){
        var projectPayPlanItems = this.getRange();
        var projectFundTotal = this.toolBar._panel._project.get('fundTotal');
        var projectPayPlanAmountTotal = 0;
        for (var i = 0; i < projectPayPlanItems.length; i++) 
            projectPayPlanAmountTotal += projectPayPlanItems[i].get('amount');
        
        this.toolBar._buttonNew.setDisabled(projectFundTotal <= projectPayPlanAmountTotal);
    });
}
Ext.extend(Srims.projects.ExpertGuideProjectPayPlanItemGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectPayPlanItemGridPanel = function(project){

    this._project = new Srims.projects.Project({});
    this._store = new Srims.fund.PayPlanItemStore(this._project);
    this._columnModel = new Srims.fund.PayPlanItemGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectPayPlanItemGridPanel_ToolBar(this);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    params.width = 600;
    
    Srims.projects.ExpertGuideProjectPayPlanItemGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var payPlanItem = grid.getStore().getAt(rowIndex);
        Srims.projects.editProjectPayPlanItem(this._project, payPlanItem, this._store);
    }
    this.on('celldblclick', onCellDblClick);
    
    this.setProject = function(project){
        this._project = project;
        
        this._toolBar.setProject(project);
        
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
    
    this.next = function(){
    
        this.panel.panel._projectShowPanel.resetProject(this._project);
        Srims.expertGuide.next(this);
    }
};
Ext.extend(Srims.projects.ExpertGuideProjectPayPlanItemGridPanel, Srims.component.GridPanel, {});

if (!Srims.projects) 
    Ext.namespace("Srims.projects");

Srims.projects.ExpertGuidProjectEditPanel = function(id, newProject) {
    this._id = id;
    this._project = newProject;
    this._isHorizontal = newProject.get('isHorizontal');
    var params = {};
    params.isHorizontal = this._isHorizontal;
    this._projectStore = new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/GetMyUnsubmitProjects', params);

    this._panelUnSubmitProjects = new Srims.projects.MyUnsubmitProjectsGridPanel(this._project, this._projectStore, this._isSetHorizontal);
    this._panelUnSubmitProjects.parentPanel = this;
    this._ProjectOutPanel = new Srims.projects.ExpertGuideProjectOutGridPanel();
    var basicPanelId = this._isHorizontal ? "ProjectEditHorizontal" : "ProjectEditVertical";


    this._panelBasic = new Srims.projects.ProjectEditPanel(basicPanelId, this._project, this._projectStore, true, this._ProjectOutPanel);
    this._panelBasic.parentPanel = this;
    this._memberManagePanel = new Srims.projects.ExpertGuideProjectMemberGridPanel();
    this._contractManagePanel = new Srims.projects.ExpertGuideProjectContractGridPanel(this._project.get('isHorizontal'));
    this._documentManagePanel = new Srims.projects.ExpertGuideProjectDocumentGridPanel();
    this._payPlanItemManangePanel = new Srims.projects.ExpertGuideProjectPayPlanItemGridPanel();
    var showPanelId = this._isHorizontal ? "ProjectShowHorizontal" : "ProjectShowVertical";
    this._projectShowPanel = new Srims.projects.ProjectShowPanel(showPanelId, this._project);
    this._processPanels = [this._panelUnSubmitProjects, this._ProjectOutPanel, this._panelBasic, this._memberManagePanel, this._contractManagePanel, this._documentManagePanel, this._payPlanItemManangePanel, this._projectShowPanel];

    this._processDescriptionStore = Srims.expertGuide.ProjectEdit_ProcessDescriptionStore;
    this._processesShowPanel = new Srims.expertGuide.ProcessesShowForm(this._processDescriptionStore, '项目立项流程');
    var guideName = this._isHorizontal ? "HorizontalProjectEdit" : "VerticalProjectEdit";
    this._ProjectEditSingleProcessOperatePanel = new Srims.expertGuide.SingleProcessOperatePanel(guideName, this._processDescriptionStore, this._processPanels);

    this._ProjectEditSingleProcessOperatePanel.panel = this;
    this._processDescriptionStore.panel = this;

    Srims.projects.ExpertGuidProjectEditPanel.superclass.constructor.call(this, {
        id: this._id,
        iconCls: 'icon-project-new',
        title: newProject.get('isHorizontal') ? '横向项目立项' : '纵向项目立项',
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        height: 224,
        width: 650,
        items: [this._processesShowPanel, this._ProjectEditSingleProcessOperatePanel]
    });
}
Ext.extend(Srims.projects.ExpertGuidProjectEditPanel, Ext.Panel, {});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectWaitringSetDelegateWindow = function(id){

    this._id = id;
    this._projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/GetMyProcessingProject');
    this._setDelegateGridPanel = new Srims.projects.ProjectSetDelegateGridPanel(this._projectStore);
    this._helpPanel = new Ext.Panel({
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '提示：<ul style="text-indent:2em"><li>1、委托项目：选择您要委托的项目，点击<span style="color:#FF0000">“指定项目委托负责人”</span>按钮，进行项目委托。</li><li>2、取消委托：选择项目，点击<span style="color:#FF0000">“取消项目委托负责人”</span>按钮，取消项目委托</li></ul>'
    });
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.projects.ProjectWaitringSetDelegateWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '委托项目管理',
        iconCls: 'icon-set-delegate-principal',
        width: 700,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._helpPanel, this._setDelegateGridPanel],
        buttons: [this._buttonClose]
    });
    this._projectStore.load();
}
Ext.extend(Srims.projects.ProjectWaitringSetDelegateWindow, Ext.Window, {});


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegateGridPanel = function(projectStore){

    //fields
    this._projectStore = projectStore;
    
    //controls  
    this._selection = new Ext.grid.CheckboxSelectionModel();
    this._toolbar = new Srims.projects.ProjectSetDelegateGridPanel_ToolBar(this._selection, this._projectStore);
    this._columnModel = new Srims.projects.ProjectSetDelegateGridPanel_ColumnModel(this._selection);
    
    var params = {};
    params.sm = this._selection;
    params.store = this._projectStore;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.defaultBBar = false;
    params.height = 300;
    
    Srims.projects.ProjectSetDelegateGridPanel.superclass.constructor.call(this, params);
};
Ext.extend(Srims.projects.ProjectSetDelegateGridPanel, Srims.component.GridPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegateGridPanel_ColumnModel = function(sm){
    Srims.projects.ProjectSetDelegateGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "编号",
        dataIndex: 'number',
        sortable: false,
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        width: 200,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "项目类型",
        dataIndex: 'typeName',
        sortable: false,
        hidden: false
    }, {
        header: "委托负责人",
        dataIndex: 'principalDelegate',
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.ProjectSetDelegateGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegateGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonSetDelegate = new Ext.Toolbar.Button({
        iconCls: 'icon-set-delegate-principal',
        text: '指定项目委托负责人',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            var records = this.selection.getSelections();
            if (records.length == 0) {
                Ext.Msg.show({
                    title: '项目不能为空',
                    msg: '请选择至少一个项目',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            Srims.projects.showSetDelegatePrincipalWindow(records, this.store);
        },
        tooltip: '<b>指定项目委托负责人</b><br/>指定选中项目的委托负责人'
    });
    this._buttonClearDelegate = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-delegate-principal',
        text: '取消项目委托负责人',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            var records = this.selection.getSelections();
            if (records.length == 0) {
                Ext.Msg.show({
                    title: '项目不能为空',
                    msg: '请选择至少一个项目',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            Ext.MessageBox.confirm('取消委托负责人', '你确定要取消所选择项目的委托负责人吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.clearDeletatePrincipal(records, this.store);
            }, this);
            
        },
        tooltip: '<b>取消项目委托负责人</b><br/>取消选中项目的委托负责人'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    
    Srims.projects.ProjectSetDelegateGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSetDelegate, this._buttonClearDelegate, new Ext.Toolbar.Fill(), this._buttonRefresh],
        height: 25
    });
}
Ext.extend(Srims.projects.ProjectSetDelegateGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.ImportWindow = function(id, store, importUrl, description, isMagazienInformation) {

    this._id = id;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '导 入',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            window.formPanel = window._formPanelData;
            window.store = window._store;

            var params = {};
            if (isMagazienInformation)
                params.year = window._numberFieldYear.getValue();

            window.formPanel.getForm().submit({
                params: params,
                url: importUrl,
                waitMsg: '正在导入数据，请耐心等候....',
                success: function(form, action) {
                    Ext.Msg.show({
                        title: '成功导入数据',
                        msg: '导入数据成功',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });

                    if (window.store)
                        window.store.load();

                    window.close();

                    var jsonData = Ext.util.JSON.decode(action.response.responseText);
                    var logDocumentName = jsonData.LogDocumentName;

                    Srims.documents.downLoadResource(logDocumentName, '/GetImportLog');
                }
            });
        }
    });
    this._fieldDesprition = new Ext.form.Field({
        fieldLabel: '说明',
        value: description,
        readOnly: true,
        width: 180
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 180,
        allowBlank: false
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'ImportData',
        fieldLabel: '选择数据文件',
        width: 180,
        emptyText: '请选择要导入的数据文件',
        allowBlank: false,
        fileTypes: ['xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });

    var items = [];
    if (isMagazienInformation)
        items = [this._fieldDesprition, this._numberFieldYear, this._fileUploadField];
    else
        items = [this._fieldDesprition, this._fileUploadField];

    this._formPanelData = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        autoHeight: true,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: items
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        if (isMagazienInformation)
            result = this._numberFieldYear.isValid(preventMark) && result;

        return result;
    }

    Srims.component.ImportWindow.superclass.constructor.call(this, {
        id: this._id,
        title: description,
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelData],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.component.ImportWindow, Ext.Window, {})

if (!Srims.projects)
    Ext.namespace('Srims.projects');
if (!Srims.fund)
    Ext.namespace('Srims.fund');
//纵向项目列表
Srims.projects.listVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanl_VerticalProjectList_ID, '纵向项目列表', false, 'icon-project-vertical-list', showQueryWindow, undefined, undefined);
}
Srims.projects.listWaitingStartCensorVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingStartCensorVerticalProjectList_ID, '等待立项审核纵向项目列表', false, 'icon-project-vertical-censor-start', showQueryWindow, Srims.projects.ProjectState.WaitingStartCensor, undefined);
}
Srims.projects.listWaitingEndCensorVerticalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingEndCensorVericalProjectList_ID, '等待结项审核纵向项目列表', false, 'icon-project-vertical-censor-end', showQueryWindow, Srims.projects.ProjectState.WaitingEndCensor, undefined);
}
//横向项目列表
Srims.projects.listHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanl_HorizontalProjectList_ID, '横向项目列表', true, 'icon-project-horizontal-list', showQueryWindow, undefined, undefined);
}
Srims.projects.listWaitingStartCensorHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingStartCensorHorizontalProjectList_ID, '等待立项审核横向项目列表', true, 'icon-project-horizontal-censor-start', showQueryWindow, Srims.projects.ProjectState.WaitingStartCensor, undefined);
}
Srims.projects.listWaitingEndCensorHorizontalProject = function(showQueryWindow) {
    Srims.projects._listProject(Srims.projects.GridPanel_WaitingEndCensorHorizontalProjectList_ID, '等待结项审核横向项目列表', true, 'icon-project-horizontal-censor-end', showQueryWindow, Srims.projects.ProjectState.WaitingEndCensor, undefined);
}
//需添加追缴单的项目列表
Srims.projects.listRecoveryProject = function() {
    Srims.projects._listRecoveryProject(Srims.projects.GridPanl_RecoveryProjectList_ID, '间接费用调整项目列表', 'icon-project-horizontal-list', undefined);
}
//专家项目列表
Srims.projects.listMyPrincipalProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyPrincipalProjectList, '我负责的项目列表', undefined, 'icon-project-my-project-principal', false, undefined, 'Principal');
}
Srims.projects.listMyParticipateProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyParticipateProjectList, '我参与的项目列表', undefined, 'icon-project-my-project-join', false, undefined, 'Participate');
}
Srims.projects.listMyDelegateProject = function() {
    Srims.projects._listProject(Srims.projects.GridPanel_MyDelegateProjectList, '我被委托的项目列表', undefined, 'icon-project-my-project-delegate', false, undefined, 'Delegate');
}

Srims.projects._listRecoveryProject = function(panelId, name, iconCls, expertAttendType) {
    var projectStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel)
        projectStore = panel.getStore();
    else {

        queryParams = getRecoveryProjectQueryParams(expertAttendType);
        projectStore = new Srims.projects.RecoveryProjectStore(Srims.service.projects.ProjectService + '/RecoveryQuery', queryParams);
        panel = new Srims.projects.RecoveryProjectGridPanel(panelId, projectStore, name, iconCls, expertAttendType, queryParams);
        panel.getStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
}


Srims.projects._listProject = function(panelId, name, isHorizontal, iconCls, showQueryWindow, projectState, expertAttendType) {
    var projectStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel)
        projectStore = panel.getStore();
    else {
        queryParams = getProjectQueryParams(isHorizontal, projectState, expertAttendType);
        projectStore = new Srims.projects.ProjectStore(Srims.service.projects.ProjectService + '/Query', queryParams);
        panel = new Srims.projects.ProjectGridPanel(panelId, projectStore, name, iconCls, isHorizontal, projectState, expertAttendType, queryParams);
        panel.getStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        queryParams = projectStore.getExtraParams();
        Srims.projects.showProjectQueryWindow(panelId + '_QueryWindow', projectStore, isHorizontal, queryParams, panel);
    }
}
function getRecoveryProjectQueryParams(expertAttendType) {
    var params = {};
    if (expertAttendType)
        params.expertAttendType = expertAttendType;
    return params;
}
function getProjectQueryParams(isHorizontal, projectState, expertAttendType) {
    var params = {};

    if (projectState) {
        params.state = projectState;
        params.isCensor = true;
    }
    if (expertAttendType)
        params.expertAttendType = expertAttendType;
    if (isHorizontal != undefined)
        params.isHorizontal = isHorizontal;

    return params;
}

Srims.projects.showProjectQueryWindow = function(id, store, isHorizontal, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.projects.ProjectQueryWindow(id, store, isHorizontal, queryParams);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.projects.confirmProjectPrincipalToSendEmail = function(queryParams) {
    var projectStore = undefined;
    var panelId = 'projectGridPanel_SendEmail';
    var panel = Srims.WorkSpace.active(panelId);

    if (panel)
        Srims.WorkSpace.getWorkSpace().remove(panel);

    projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/QueryForEmail', queryParams);
    panel = new Srims.projects.ProjectEmailGridPanel(panelId, projectStore, '发送邮件项目列表', 'icon-email');
    panel.getStore().load();

    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.exportProject = function(filterParams, queryParams) {
    var windowId = 'ProjectExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.projects.ProjectService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('基本信息字段', Srims.projects.ProjectExport_Column.basic);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('类型信息字段', Srims.projects.ProjectExport_Column.Type);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('经费信息字段', Srims.projects.ProjectExport_Column.fund);

    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Project');
}
Srims.projects.newProject = function(isHorizontal) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    var startDate = new Date();
    var endDate = new Date(startDate.getFullYear() + 2, 11, 31);

    var project = new Srims.projects.Project({});
    project.set('isHorizontal', isHorizontal);
    project.set('level', Srims.projects.ProjectLevel.Perside);
    project.set('state', Srims.projects.ProjectState.WaitingStartInformation);
    project.set('startDate', startDate);
    project.set('endDate', endDate);
    if (userIsExpert)
        Srims.projects.showExpertGuidProjectEditPanel(project, userIsExpert);
    else {
        var panelId = isHorizontal ? Srims.projects.Panel_NewHorizontalProject_ID : Srims.projects.Panel_NewVerticalProject_ID;
        if (Srims.WorkSpace.active(panelId))
            return;

        var panel = new Srims.projects.ProjectEditPanel(panelId, project);
        Srims.WorkSpace.addPanel(panel);
    }
}

Srims.projects.editProject = function(project) {
    var panelId = 'ProjectEditPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;

    var panel = new Srims.projects.ProjectEditPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}

Srims.projects.showProject = function(project) {
    var panelId = 'ProjectShowPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId)) {
        Ext.getCmp(panelId).resetComponentValue(project);
        return;
    }
    var panel = new Srims.projects.ProjectShowPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.showProject_Recovery = function(project) {

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: project.get('pid')
        },
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectSimpleXmlReader()
            });
            var currentProject = store.getAt(0);

            var panelId = 'ProjectShowPanel' + project.get('pid');
            if (Srims.WorkSpace.active(panelId)) {
                return;
            }
            var panel = new Srims.projects.ProjectShowPanel(panelId, currentProject);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}
//编辑追缴单
Srims.projects.showRecoveryProject = function(project) {
    var panelId = 'RecoveryProjectShowPanel' + project.get('id');
    if (Srims.WorkSpace.active(panelId)) {
        return;
    }
    else {
        var panel = new Srims.projects.RecoveryProjectShowPanel(panelId, project);
        Srims.WorkSpace.addPanel(panel);
    }
}

Srims.projects.deleteProject = function(project) {
    var user = Srims.currentLoginLog.user;
    var gridPanelID;
    if (user.userRoleType == 'Expert') {
        if (user.name == project.get('principal'))
            gridPanelID = Srims.projects.GridPanel_MyPrincipalProjectList;
        else
            gridPanelID = Srims.projects.GridPanel_MyDelegateProjectList;
    }
    else
        gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanl_HorizontalProjectList_ID : Srims.projects.GridPanl_VerticalProjectList_ID;
    Srims.projects.saveForChangeState(project, Srims.projects.ProjectState.ProjectDelete, '', '/Delete', undefined, gridPanelID, '删除项目成功', '成功删除项目：' + project.get('name'));
}
Srims.projects.withDrawProject = function(project) {
    Srims.projects.endProjectUnNormal(project, Srims.projects.ProjectState.WithDraw, '/WithDraw', '撤销项目成功', '成功撤销项目：' + project.get('name'), undefined);
}
Srims.projects.terminateProject = function(project) {
    Srims.projects.endProjectUnNormal(project, Srims.projects.ProjectState.Terminate, '/Terminate', '终止项目成功', '成功终止项目：' + project.get('name'), undefined);
}
Srims.projects.endProjectUnNormal = function(project, projectState, subUrl, msg, msgInfo) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanl_HorizontalProjectList_ID : Srims.projects.GridPanl_VerticalProjectList_ID;
    Srims.projects.saveForChangeState(project, projectState, '', subUrl, undefined, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.censorStart_Pass = function(project, isCensorDocumentAndContract) {
    Srims.projects.censorStart(project, '', Srims.projects.ProjectState.ProjectProcessing, '/CensorStartPass', '审核通过立项申请成功', '成功审核通过项目：' + project.get('name') + '的立项申请', isCensorDocumentAndContract);
}
Srims.projects.censorStart_Reject = function(project, remark, isCensorDocumentAndContract) {
    Srims.projects.censorStart(project, remark, Srims.projects.ProjectState.WaitingStartInformation, '/CensorStartReject', '审核驳回立项申请成功', '成功审核驳回项目：' + project.get('name') + '的立项申请', isCensorDocumentAndContract);
}
Srims.projects.censorEnd_Pass = function(project) {
    var _params = {};
    _params.projectID = project.get('id');

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/CanEnd',
        params: _params,
        success: function(response) {

            if (Boolean.toBoolean(response.responseText)) {
                Srims.projects.censorEnd(project, '', Srims.projects.ProjectState.ProjectEnd, '/CensorEndPass', '审核通过结项申请成功', '成功审核通过项目：' + project.get('name') + '的结项申请');
            }
            else {
                Ext.Msg.show({
                    title: '不能结项',
                    msg: '该项目不能结项，请检查是否有主合同或者文档，并且都审核通过，或者经费是否分配完毕。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
            }

        }
    });
    //添加项目结项条件
    //Srims.projects.censorEnd(project, '', Srims.projects.ProjectState.ProjectEnd, '/CensorEndPass', '审核通过结项申请成功', '成功审核通过项目：' + project.get('name') + '的结项申请');
}
Srims.projects.censortEnd_Reject = function(project, remark) {
    Srims.projects.censorEnd(project, remark, Srims.projects.ProjectState.ProjectProcessing, '/CensorEndReject', '审核驳回结项申请成功', '成功审核驳回项目：' + project.get('name') + '的结项申请');
}
Srims.projects.censorStart = function(project, remark, projectState, subUrl, msg, msgInfo, isCensorDocumentAndContract) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanel_WaitingStartCensorHorizontalProjectList_ID : Srims.projects.GridPanel_WaitingStartCensorVerticalProjectList_ID;

    var pollActions = [];
    pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingStartCensorHorizontalProjectCount : Srims.Poll.getPollAction_WaitingStartCensorVerticalProjectCount;
    if (isCensorDocumentAndContract) {
        pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount : Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount;
        pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount : Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount;
    }

    Srims.projects.saveForChangeState(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, isCensorDocumentAndContract);
}
Srims.projects.censorEnd = function(project, remark, projectState, subUrl, msg, msgInfo) {
    var gridPanelID = project.get('isHorizontal') ? Srims.projects.GridPanel_WaitingEndCensorHorizontalProjectList_ID : Srims.projects.GridPanel_WaitingEndCensorVericalProjectList_ID;

    var pollActions = [];
    pollActions[pollActions.length] = project.get('isHorizontal') ? Srims.Poll.getPollAction_WaitingEndCensorHorizontalProjectCount : Srims.Poll.getPollAction_WaitingEndCensorVerticalProjectCount;

    Srims.projects.saveForChangeState(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.submitStart = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingStartCensor, '/SubmitStart', '提交立项申请成功', '成功提交项目：' + project.get('name') + '的立项申请', undefined);
}
Srims.projects.undoStart = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingStartInformation, '/UndoSubmitStart', '撤销立项申请成功', '成功撤销项目：' + project.get('name') + '的立项申请', undefined);
}
Srims.projects.submitEnd = function(project) {
    var _params = {};
    _params.projectID = project.get('id');

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/CanEnd',
        params: _params,
        success: function(response) {

            if (Boolean.toBoolean(response.responseText)) {
                Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingEndCensor, '/SubmitEnd', '提交结项申请成功', '成功提交项目：' + project.get('name') + '的结项申请', undefined);
            }
            else {
                Ext.Msg.show({
                    title: '不能提交结项申请',
                    msg: '该项目不能提交结项申请，请检查是否有主合同或者文档，并且都审核通过，或者经费是否分配完毕。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
            }

        }
    });
    //  Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.WaitingEndCensor, '/SubmitEnd', '提交结项申请成功', '成功提交项目：' + project.get('name') + '的结项申请', undefined);
}
Srims.projects.undoEnd = function(project) {
    Srims.projects.submitByPrincipal(project, Srims.projects.ProjectState.ProjectProcessing, '/UndoSubmitEnd', '撤销结项申请成功', '成功撤销项目：' + project.get('name') + '的结项申请', undefined);
}
Srims.projects.submitByPrincipal = function(project, projectState, subUrl, msg, msgInfo) {
    var user = Srims.currentLoginLog.user;
    var gridPanelID = project.get('principalId') == user.id ? Srims.projects.GridPanel_MyPrincipalProjectList : Srims.projects.GridPanel_MyDelegateProjectList;

    Srims.projects.saveForChangeState(project, projectState, '', subUrl, undefined, gridPanelID, msg, msgInfo, undefined);
}
Srims.projects.saveForChangeState = function(project, projectState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo, isCensorDocumentAndContract) {

    var _params = {};
    _params.projectID = project.get('id');
    _params.remark = remark;

    if (isCensorDocumentAndContract != undefined)
        _params.IsCensorDocumentAndContract = isCensorDocumentAndContract;

    project.beginEdit();
    project.set('state', projectState);
    project.commit();

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + subUrl,
        params: _params,
        success: function(response) {
            //从showPanel上改变项目状态
            var showPanel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
            if (showPanel) {
                if (projectState == Srims.projects.ProjectState.ProjectDelete)
                    Srims.WorkSpace.getWorkSpace().remove(showPanel);
                else {
                    //取得项目   
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.ProjectSimpleXmlReader()
                    });

                    var currentProject = store.getAt(0);
                    showPanel._formPanelBasic.resetComponentValue(currentProject);
                    showPanel._toolBar._resetButtonVisibleAndDisabled(currentProject);
                    showPanel._toolBar._resetButtonProject(currentProject);
                    showPanel._formPanelStateHistory._store.load();
                }
            }
            //执行轮询
            if (pollActions) {
                for (var i = 0; i < pollActions.length; i++)
                    Srims.Poll.startPollAction(pollActions[i]);
            }

            //刷新GridPanel
            var gridPanel = Ext.getCmp(gridPanelID);
            if (gridPanel) {
                if (projectState == Srims.projects.ProjectState.ProjectDelete)
                    Srims.WorkSpace.active(gridPanelID);
                Ext.getCmp(gridPanelID).getStore().load({
                    callback: function() {
                        Ext.Msg.show({
                            title: msg,
                            msg: msgInfo,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                });
            }
            else {
                Ext.Msg.show({
                    title: msg,
                    msg: msgInfo,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    });
}
Srims.projects.rejectProjectCensor = function(project, isStart) {
    var windowId = isStart ? 'rejectProjectCensorWindow_start' + project.get('id') : 'rejectProjectCensorWindow_end' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectCensorRejectWindow(windowId, project, isStart);
    window.show();
}
Srims.projects.showSetDelegatePrincipalWindow = function(projects, store) {
    var windowId = 'setDelegatePrincipalWindow';

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectSetDelegatePrincipalWindow(windowId, projects, store);
    window.show();
}
Srims.projects.clearDeletatePrincipal = function(projects, store) {
    Srims.projects.saveDelegatePrincipal(projects, '', '/ClearDelegatePrincipal', store, '成功取消委托负责人', '成功取消项目委托负责人');
}
Srims.projects.setDeletatePrincipal = function(projects, expertId, store) {
    Srims.projects.saveDelegatePrincipal(projects, expertId, '/SetDelegatePrincipal', store, '成功指定委托负责人', '成功指定项目委托负责人');
}
Srims.projects.saveDelegatePrincipal = function(projects, expertId, subUrl, store, msg, msgInfo) {
    var projectsId = '';
    for (var i = 0; i < projects.length; i++) {
        projectsId += projects[i].get('id') + ',';
    }

    var _params = {};
    _params.projectsID = projectsId;
    _params.principalDelegateId = expertId;

    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + subUrl,
        params: _params,
        success: function(response) {
            store.load({
                callback: function() {
                    Ext.Msg.show({
                        title: msg,
                        msg: msgInfo,
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });
                }
            });
        }
    });
}
Srims.projects.showWaitingSetDelegateWindow = function() {
    var windowId = 'myProjectWaitingSetDelegateWindow';
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectWaitringSetDelegateWindow(windowId);

    window.show();
}

Srims.projects.showProjectMemberWindow = function(project) {
    var windowId = 'ProjectMemberWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.projects.ProjectMemberWindow(windowId, project);
    else
        window._projectMemberGridPanel.getStore().load()
    window.show();
}
Srims.projects.newProjectMember = function(project, store) {
    var windowId = 'NewProjectMemberWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        var projectMember = new Srims.projects.ProjectMember({});
        window = new Srims.projects.ProjectMemberEditWindow(windowId, projectMember, project, store);
    }
    window.show();
}
Srims.projects.editProjectMember = function(project, projectMember, store) {
    var windowId = 'EditProjectMemberWindow' + projectMember.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.projects.ProjectMemberEditWindow(windowId, projectMember, project, store);
    }
    window.show();
}
Srims.projects.showPayPlanItemWindow = function(project) {
    var windowId = 'PayPlanItemWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.fund.PayPlanItemWindow(windowId, project);
    else
        window._payPlanItemGridPanel.getStore().load()
    window.show();
}
Srims.projects.newProjectPayPlanItem = function(project, store) {
    var windowId = 'NewProjectPayPlanItem' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        var projectPayPlanItem = new Srims.fund.PayPlanItem({});
        window = new Srims.fund.PayPlanItemEditWindow(windowId, projectPayPlanItem, project, store);
    }
    window.show();
}
Srims.projects.editProjectPayPlanItem = function(project, projectPayPlanItem, store) {
    var windowId = 'EditProjectPayPlanItem' + projectPayPlanItem.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.fund.PayPlanItemEditWindow(windowId, projectPayPlanItem, project, store);
    }
    window.show();
}
Srims.projects.showContractWindow = function(project) {
    var windowId = 'ContractWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.ContractWindow(windowId, project)
    else
        window._contractGridPanel.getStore().load();
    window.show();
}
Srims.projects.uploadMainContract = function(project, store) {
    Srims.projects.uploadContract(project, store, true);
}
Srims.projects.uploadOutContract = function(project, store) {
    Srims.projects.uploadContract(project, store, false);
}
Srims.projects.uploadContract = function(project, store, isMain) {
    var windowId = isMain ? ('submitMainContract' + project.get('id')) : ('submitOutContract' + project.get('id'));

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.documents.ContractUploadWindow(windowId, project, store, isMain);
    }
    window.show();
}
Srims.projects.deleteContract = function(project, contract, store) {
    Srims.documents.deleteResource(contract.get('contractResource'), contract.get('id'), Srims.service.documents.ContractService + '/Delete', store, '成功删除合同', '删除合同成功');
}
Srims.projects.downLoadContract = function(contract) {
    Srims.documents.downLoadResource(contract.get('contractResource'), '/GetContract');
}
Srims.projects.censorContractPass = function(contract, store, isHorizontal) {
    Srims.projects.censorContract(contract, Srims.CensorState.passed, '/CensorPass', store, isHorizontal, undefined);
}
Srims.projects.showCensorContractRejectWindow = function(contract, store, isHorizontal) {
    var windowId = 'censorContractRejectWindow' + contract.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.ContractCensorRejectWindow(windowId, contract, store, isHorizontal);

    window.show();
}
Srims.projects.censorContractReject = function(contract, store, isHorizontal, remark) {
    Srims.projects.censorContract(contract, Srims.CensorState.reject, '/CensorReject', store, isHorizontal, remark);
}
Srims.projects.censorContract = function(contract, censorState, subUrl, store, isHorizontal, remark) {
    var params = {};
    params.contractId = contract.get('id');
    if (remark != undefined)
        params.remark = remark;

    Ext.Ajax.request({
        url: Srims.service.documents.ContractService + subUrl,
        params: params,
        success: function() {
            store.load();
            isHorizontal ? Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectContractCount) : Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectContractCount);
        }
    });
}
Srims.projects.listWaitingCenorHorizontalProjecctContracts = function() {
    Srims.projects.listWaitingCensorContracts('WaitingCenorHorizontalProjecctContracts', '横向项目合同审核', true, 'icon-project-horizontal-censor-contract');
}
Srims.projects.listWaitingCenorVerticalProjecctContracts = function() {
    Srims.projects.listWaitingCensorContracts('WaitingCenorVerticalProjecctContracts', '纵向项目合同审核', false, 'icon-project-vertical-censor-contract');
}
Srims.projects.listWaitingCensorContracts = function(panelId, title, isHorizontal, iconCls) {
    var contractStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {
        isHorizontal: isHorizontal
    };
    if (panel)
        contractStore = panel.getStore();
    else {
        contractStore = new Srims.documents.ContractStore(Srims.service.documents.ContractService + '/GetWaitingCensorContracts', params);
        panel = new Srims.documents.ContractCensorGridPanel(panelId, title, contractStore, iconCls);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.showDocumentWindow = function(project) {
    var windowId = 'DocumentWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentWindow(windowId, project)
    else
        window._documentGridPanel.getStore().load();
    window.show();
}
Srims.projects.showRequireDocumentWindow = function(project, store) {
    var windowId = 'DocumentRequireWindow' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentRequireWindow(windowId, project, store)
    window.show();
}
Srims.projects.uploadDocument = function(project, store) {
    var windowId = 'submitDocument' + project.get('id');

    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.documents.DocumentUploadWindow(windowId, project, store);
    }
    window.show();
}
Srims.projects.downLoadDocument = function(document) {
    var documentResource = document.get('documentResource');
    if (documentResource == '' || documentResource == null || documentResource == undefined) {
        Ext.Msg.show({
            title: '文档查看失败',
            msg: '该文档还没有上传',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    Srims.documents.downLoadResource(document.get('documentResource'), '/GetDocument');
}
Srims.projects.deleteDocument = function(project, document, store) {
    Srims.documents.deleteResource(document.get('documentResource'), document.get('id'), Srims.service.documents.DocumentService + '/Delete', store, '成功删除文档', '删除文档成功');
}
Srims.projects.listWaitingCenorHorizontalProjecctDocuments = function() {
    Srims.projects.listWaitingCenorDocuments('WaitingCenorHorizontalProjecctDocuments', '横向项目文档审核', true, 'icon-project-horizontal-censor-document');
}
Srims.projects.listWaitingCenorVerticalProjecctDocuments = function() {
    Srims.projects.listWaitingCenorDocuments('WaitingCenorVerticalProjecctDocuments', '纵向项目文档审核', false, 'icon-project-vertical-censor-document');
}
Srims.projects.listWaitingCenorDocuments = function(panelId, title, isHorizontal, iconCls) {
    var documentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {
        isHorizontal: isHorizontal
    };

    if (panel)
        documentStore = panel.getStore();
    else {
        documentStore = new Srims.documents.DocumentStore(Srims.service.documents.DocumentService + '/GetWaitingCensorDocuments', params);
        panel = new Srims.documents.DocumentCensorGridPanel(panelId, title, documentStore, iconCls);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.censorDocumentPass = function(document, store, isHorizontal) {
    Srims.projects.censorDocument(document, Srims.CensorState.passed, '/CensorPass', store, isHorizontal, undefined);
}
Srims.projects.showCensorDocumentRejectWindow = function(document, store, isHorizontal) {
    var windowId = 'censorDocumentRejectWindow' + document.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.documents.DocumentCensorRejectWindow(windowId, document, store, isHorizontal);

    window.show();
}
Srims.projects.censorDocumentReject = function(document, store, isHorizontal, remark) {
    Srims.projects.censorDocument(document, Srims.CensorState.reject, '/CensorReject', store, isHorizontal, remark);
}
Srims.projects.censorDocument = function(document, censorState, subUrl, store, isHorizontal, remark) {
    var params = {};
    params.documentId = document.get('id');
    if (remark != undefined)
        params.remark = remark;

    Ext.Ajax.request({
        url: Srims.service.documents.DocumentService + subUrl,
        params: params,
        success: function() {
            store.load();
            isHorizontal ? Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectDocumentCount) : Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorVerticalProjectDocumentCount);
        }
    });
}
Srims.projects.listMyUnsubmitDocument = function() {
    var panelId = 'MyUnsubmitDocumentGridPanel';
    var documentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);

    if (panel) {
        documentStore = panel.getStore();
        documentStore.load();
    }
    else {
        documentStore = new Srims.documents.DocumentStore(Srims.service.documents.DocumentService + '/GetExpertUnSubmitDocument');
        panel = new Srims.documents.DocumentMyUnsubmitDocumentGridPanel(panelId, '我的待提交的文档', documentStore, 'icon-expert-my-unsubmit-document');
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.projects.clearProjectAccountBookNumber = function(project) {
    var windowId = 'clearProjectAccountBookNumberWindow' + project.get('id');
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.projects.ProjectClearAccountBookNumberWindow(windowId, project);

    window.show();
}
Srims.projects.showHorizontalChooseWindow = function() {
    var windowId = 'horizontalChooseWindow';
    var window = Ext.getCmp(windowId);

    if (!window) {
        Ext.MessageBox.show({
            title: '项目是否涉密',
            msg: '您申请的项目是否涉密？<br />注意：如果项目信息涉密，请直接提交书面材料至科技处！',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            fn: function(button) {
            if (button == 'yes')
                Ext.MessageBox.show({
                    title: '申请涉密项目',
                    msg: '请联系科技处相关负责人！',
                    buttons: Ext.MessageBox.OK,
                    scope: this,
                    fn: function(button) {
                    }
                });
                if (button == 'no') {
                    window = new Srims.projects.ProjectRankSelectWindow(windowId);
                    window.show();
                }
            },
            icon: Ext.MessageBox.QUESTION
        });

    }
}
Srims.projects.showExpertGuidProjectEditPanel = function(project) {
    var panelId = 'ExpertGuidProjectEditPabel' + (project.get('isHorizontal') ? 'Horizontal' : 'Vertical');
    if (Srims.WorkSpace.active(panelId))
        return;

    var panel = new Srims.projects.ExpertGuidProjectEditPanel(panelId, project);
    Srims.WorkSpace.addPanel(panel);
}
Srims.projects.showImportWindow = function(store) {
    var windowId = 'ProjectImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.projects.ProjectService + '/Import', '导入项目数据', false);

    window.show();
}
Srims.projects.showRecoveryImportWindow = function(store) {
    var windowId = 'RecoveryImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.projects.ProjectService + '/ImportRecovery', '导入追缴单数据', false);

    window.show();
}
Srims.projects.printRecovery = function(recovery, store, title, message, action, methodName) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.ID = recovery.get('id');
            Ext.Ajax.request({
                url: Srims.service.projects.ProjectService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.projects.RecoveryProjectXmlReader()
                    });
                    if (action == 'print')
                        window.open('RecoveryPrint.aspx?RecoveryID=' + recovery.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                }
            });
        }
    }, this);
}
//对于专家提交的申请，需要管理员填写校内间接费和校内绩效
Srims.projects.completeIn = function(project, gridPanel) {
    var windowId = 'CompleteInWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.projects.ProjectCompleteInWindow(windowId, project, gridPanel);

    window.show();
}
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel = function() {
    this._project = new Srims.projects.Project({});
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    var a = this._project.get("id");
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();
    this._amounts = 0;
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar(this, this._store, this._selections);
    this._toolBar.parentPanel = this;
    Srims.projects.ExpertGuideProjectOutGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        tbar: this._toolBar,
        width: 500,
        height: 170,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });

    this.validateedit = function(obj) {
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;
        //        var newstore=this._store.load();
        if (column == 0) {
            var corporation = editor.getValue();
            if (String.isEmpty(corporation)) {

                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协公司不能为空',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }
        }
        if (column == 1) {
            var allocationAmount = Money.toMoney(editor.getValue());
            if (grid.length > this._store.getRange().length)
                grid._amounts += allocationAmount;
            else
                grid._amounts += obj.value - obj.originalValue;
            if (allocationAmount <= 0) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配必须大于0',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }

        }
        return true;
    }
    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.project = project;
        this._store.toolBar = this._toolBar;

        this._store.load();
    }

    this.next = function() {
        var projectOuts = this._store.getRange();
        var flag = 1;
        for (var i = 0; i < projectOuts.length; i++) {
            if (projectOuts[i].get('amount') <= 0 || projectOuts[i].get('outSourcingName') == '')
                flag = 0;
        }
        if (flag == 0) {
            Ext.Msg.show({
                title: '外协填写错误',
                msg: '请检查所有外协单位不为空且分配数额大于0！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }
        else {
            Srims.expertGuide.next(this);
        }
    }
    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel, Ext.grid.EditorGridPanel, {});
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel = function() {
    Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "外拨单位",
        dataIndex: 'outSourcingName',
        sortable: false,
        hidden: false,
        width: 300,
        editor: new Srims.component.OutsourcingSearch.SearchComboBox({
            getValue: function() {
                return this.getText();
            },
            allowBlank: false,
            width: 300
        })
    }, {
        header: '外协分配合同额(万元)',
        dataIndex: 'amount',
         allowDecimals :true,
        sortable: false,
        width: 200,
        editor: new Srims.component.MoneyField({
            allowNegative: false,
            width: 200
        })
}]);
    }
    Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel, Ext.grid.ColumnModel);if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar = function(grid, store, selection) {

    this._selection = selection;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">外协分配</b>',
        minWidth: 60
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加外协预算',
        minWidth: 60,
        grid: grid,
        store: store,
        handler: function() {


            var voucherOut = new Srims.projects.ProjectOut({
                outSourcingName: '',
                amount: ''
            });

            this.grid.stopEditing();
            this.store.insert(0, voucherOut);
            this.grid.startEditing(0, 0);

        },
        tooltip: '<b>添加外协预算</b><br/>'
    });
    this._buttonNew2 = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建外协单位',
        minWidth: 60,
        store: store,
        handler: function() {
            this.store.grid = grid;
            //Srims.common.NewOutsourcing(this.store, true);
            Srims.common.showIsExistWindow(this.store);
        },
        tooltip: '<b>新建外协单位</b><br/>填写相应外协单位信息建立新的外协单位'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        selection: selection,
        store: store,
        minWidth: 60,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除外协分配', '你确定要删除这个外协分配吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    this.store.remove(this.selection.getSelected());
                    if (userIsExpert) {
                        this.panel.parentPanel._amounts = 0;
                        var outStore = this.store;
                        var projectOuts = outStore.getRange();
                        for (var i = 0; i < projectOuts.length; i++) {
                            this.panel.parentPanel._amounts += projectOuts[i].get('amount');
                        }
                    }
                    if (!userIsExpert) {
                        var amountB = 0;
                        var outStore = this.store;
                        var projectOuts = outStore.getRange();
                        for (var i = 0; i < projectOuts.length; i++) {
                            amountB += projectOuts[i].get('amount');
                        }
                        this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(amountB);
                        this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanIn.setValue(this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundTotal.getValue() - this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanOut.getValue())
                    }
                }

            }, this);
        },
        hidden: true,
        tooltip: '<b>删除外协预算</b><br/>删除选中的外协预算'
    });
    this._buttonDelete.panel = this;
    var items = [this._buttonHeader, this._buttonNew, this._buttonNew2, this._buttonDelete];
    Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items,
        height: 25
    });

    //initial
    this._selection.buttonDelete = this._buttonDelete;
    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonDelete = this.buttonDelete;

        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }

        buttonDelete.setVisible(true);
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar, Ext.Toolbar);if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectOut = Ext.data.Record.create([{
    name: 'amount',
    type: 'float',
    mapping: 'Amount'
}, {
    name: 'outSourcingName',
    type: 'string',
    mapping: 'OutsourcingName'
}]);
    Srims.data.Entity.apply(Srims.projects.ProjectOut);if (!Srims.projects)
    Ext.namespace("Srims.projects");

Srims.projects.ProjectOutStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.projects.ProjectOutStore.superclass.constructor.call(this, new Srims.projects.ProjectOutXmlReader(), load_url, params);
    }
});
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectOutXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.projects.ProjectOutXmlReader.superclass.constructor.call(this, Srims.projects.ProjectOut);
    }
});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_ProjectOutForm = function(project) {
    this._project = project;
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar(this, this._store, this._selections);
    this._toolBar.parentPanel = this;
    Srims.projects.ProjectEditPanel_ProjectOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协信息',
        store: this._store,
        cm: this._columnModel,
        tbar: this._toolBar,
        height: 170,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });

    this._store.load();
    this.validateedit = function(obj) {
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;

        var amountB = 0;
        var outStore = this._store;
        var projectOuts = outStore.getRange();
        for (var i = 0; i < projectOuts.length; i++) {
            if (projectOuts[i].get('amount')) {
                amountB += projectOuts[i].get('amount') * 1000000;
            }
        }
        amountB = amountB / 1000000;

        if (column == 0) {
            var corporation = editor.getValue();
            if (String.isEmpty(corporation)) {

                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协单位不能为空',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }
        }
        if (column == 1) {
            var allocationAmount = Money.toMoney(editor.getValue());
            if (grid.length > outStore.getRange().length) {
                var a = 0;
                a += obj.value;
                this.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(amountB + a);
            }
            else {
                var newValue = amountB * 1000000 + (obj.value * 1000000 - obj.originalValue * 1000000);
                this.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(newValue/1000000);
            }
            this.parentPanel._formPanelFund._numberFieldFundPlanIn.setValue(this.parentPanel._formPanelFund._numberFieldFundTotal.getValue() - this.parentPanel._formPanelFund._numberFieldFundPlanOut.getValue());

            if (allocationAmount <= 0) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配必须大于0',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }

        }
        return true;
    }
    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.project = project;
        this._store.toolBar = this._toolBar;
        this._store.load();
    }

    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.projects.ProjectEditPanel_ProjectOutForm, Ext.grid.EditorGridPanel, {});

if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_ProjectOutForm = function(project) {
    this._project = project;
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();

    this._gridPanelProjectMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoExpandColumn: 'taskName',
        autoExpand: true,
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true
        }
    });

    Srims.projects.ProjectShowPanel_ProjectOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectMember]
    });
    if (project.get('id'))
        this._store.load();

    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_ProjectOutForm, Ext.FormPanel, {});
/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.Outsourcing = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'legalRepresentativeName',
    type: 'string',
    mapping: 'LegalRepresentativeName'
}, {
    name: 'registeredCapital',
    type: 'string',
    mapping: 'RegisteredCapital'
}, {
    name: 'registeredCardNumber',
    type: 'string',
    mapping: 'RegisteredCardNumber'
}, {
    name: 'organizationCode',
    type: 'string',
    mapping: 'OrganizationCode'
}, {
    name: 'taxNumber',
    type: 'string',
    mapping: 'TaxNumber'
}, {
    name: 'companyType',
    type: 'string',
    mapping: 'CompanyType'
},
 {
     name: 'managementType',
     type: 'string',
     mapping: 'ManagementType'
 },
  {
      name: 'businessScope',
      type: 'string',
      mapping: 'BusinessScope'
  },
  {
      name: 'createDateTime',
      type: 'date',
      mapping: 'CreateDateTime'
  },
  {
      name: 'dealDateTimeStart',
      type: 'date',
      mapping: 'DealDateTimeStart'
  },
   {
       name: 'dealDateTimeEnd',
       type: 'date',
       mapping: 'DealDateTimeEnd'
   },
  {
      name: 'remark',
      type: 'string',
      mapping: 'Remark'
  }, {
      name: 'isVerify',
      type: 'string',
      mapping: 'IsVerify'
  }, {
      name: 'hasPermission_Edit',
      type: 'boolean',
      mapping: 'HasPermission_Edit',
      convert: Boolean.toBoolean
  }, {
      name: 'hasPermission_Delete',
      type: 'boolean',
      mapping: 'HasPermission_Delete',
      convert: Boolean.toBoolean
  }, {
      name: 'canEdit',
      type: 'boolean',
      mapping: 'CanEdit',
      convert: Boolean.toBoolean
  }, {
      name: 'vefiy',
      type: 'string',
      mapping: 'Vefiy'
  }, {
      name: 'currentUserID',
      type: 'string',
      mapping: '  CurrentUserID'
  },
   {
       name: 'userID',
       type: 'string',
       mapping: '  UserID'
   }, {
   name: 'address',
       type: 'string',
       mapping: 'Address'
   },
 {
     name: 'canDelete',
     type: 'boolean',
     mapping: 'CanDelete'
 },
 {
     name: 'taxCard',
     type: 'string',
     mapping: 'TaxCard'
 },
 {
     name: 'companyCard',
     type: 'string',
     mapping: 'CompanyCard'
 },
 {
     name: 'groupCard',
     type: 'string',
     mapping: 'GroupCard'
 },
 {
     name: 'projectNumber',
     type: 'string',
     mapping: 'ProjectNumber'
 },
 {
     name: 'projectName',
     type: 'string',
     mapping: 'ProjectName'
 },
 {
     name: 'projectRank',
     type: 'string',
     mapping: 'ProjectRank'
 },
 {
     name: 'projectType',
     type: 'string',
     mapping: 'ProjectType'
 },
 {
     name: 'projectOutAmount',
     type: 'int',
     mapping: 'ProjectOutAmount'
 },
 {
     name: 'allocatedAmount',
     type: 'int',
     mapping: 'AllocatedAmount'
}]);
Srims.data.Entity.apply(Srims.common.Outsourcing);if (!Srims.common)
    Ext.namespace('Srims.common');
Srims.common.OutsourcingCensorRejectWindow = function(id, outsourcing) {
this._id = id;
this._outsourcing = outsourcing;

this._buttonReject = new Ext.Button({
    minWidth: 80,
    text: '驳回',
    window: this,
    handler: function() {
        var window = this.window;
        var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '(' + window._textRejectRemark.getValue() + ')';

            Ext.MessageBox.show({
                title: '审核驳回立项申请：外协单位的添加',
                msg: '您确定驳回该外协单位的添加吗？<br />点击“是”按钮，驳回该外协单位；<br />点击“否”按钮，取消审核外协单位的立项申请。',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                fn: function(button) {
                    if (button == 'yes')
                        Srims.common.censorStart_Reject(window._outsourcing, remark);
                },
                icon: Ext.MessageBox.QUESTION
            });

        window.close();
    }
});
this._buttonClose = new Ext.Button({
    minWidth: 80,
    text: '取消',
    window: this,
    handler: function() {
        var window = this.window;
        window.close();
    }
});
this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
    fieldLabel: '驳回理由',
    noticeTextType: 'ProjectCensorRejectReason',
    listWidth: 160,
    width: 130
});
this._textRejectRemark = new Ext.form.TextArea({
    fieldLabel: '详细说明',
    height: 60,
    width: 200
});

Srims.common.OutsourcingCensorRejectWindow.superclass.constructor.call(this, {
    id: this._id,
    title:  '驳回项目立项申请:外协单位的添加' ,
    iconCls: 'icon-censor-reject',
    width: 320,
    labelWidth: 70,
    height: 180,
    modal: true,
    bodyStyle: 'padding:10px 10px 0',
    deferredRender: false,
    frame: true,
    closeAction: 'hide',
    layout: 'form',
    resizable: false,
    items: [this._comboBoxRejectReson, this._textRejectRemark],
    buttons: [this._buttonReject, this._buttonClose]
});
}
Ext.extend(Srims.common.OutsourcingCensorRejectWindow, Ext.Window, {});if (!Srims.common)
    Ext.namespace('Srims.common');
Srims.common.IsOutsourcingExistWindow = function(store) {

    this._inForm = new Srims.common.OutsourcingIsExistWindow_InForm();
    //this._editGridPanel = new Srims.common.OutsourcingIsExistWindow_GridPanel();

    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查询',
        window: this,
        handler: function() {
            var window = this.window;
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService + '/WeatherExistOutsourcing',
                params: {
                    Name: window._inForm._textFieldName.getValue(),
                    OrganizationCode: window._inForm._textFieldOrganizationCode.getRawValue() + '-' + window._inForm._codeNinethNumber.getRawValue()
                },
                scope: this,
                success: function(response) {
                    window.close();
                    if (response.responseText != "")
                        Ext.Msg.show({
                            title: '已存在相应外协单位,请不要重复添加！信息如下：',
                            msg: response.responseText,
                            buttons: Ext.Msg.OK
                        });
                    else {
                        Ext.Msg.show({
                            title: '系统中不存在相应外协单位',
                            msg: '系统中不存在相应外协单位，您可以选择新建，添加您需要的外协单位',
                            buttons: Ext.Msg.OK
                        });
                        var IsInformation = window._inForm._textFieldName.getValue() + '?;' + window._inForm._textFieldOrganizationCode.getRawValue() + '?;' + window._inForm._codeNinethNumber.getRawValue();
                        Srims.common.NewOutsourcing(IsInformation, store, false);
                    }

                }
            });
        }
    });
    this.web = new Ext.Button({
        style: "font-size:12px;color:#FF0000",
        text: '全国组织机构代码管理中心'
    });
    this.webcilick = function() {
        window.open('http://www.nacao.org.cn/', '_blank');

    };
    this.web.on('click', this.webcilick, this);
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    Srims.common.IsOutsourcingExistWindow.superclass.constructor.call(this, {
        id: "IsOutsourcingExist",
        title: '<b style="color:#FF0000">请先输入"外协单位全称"或"组织代码"来查询欲添加的外协单位是否存在!</b>',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        layout: 'form',
        items: [this._inForm],
        buttons: [this.web, this._buttonQuery, this._buttonClose]
    });
}
Ext.extend(Srims.common.IsOutsourcingExistWindow, Ext.Window);if (!Srims.common)
    Ext.namespace("Srims.common");
Srims.common.OutsourcingIsExistWindow_InForm = function() {
    this._notice = new Ext.form.Label({
        style: "font-size:12px;color:#FF0000",
        text: '您可以输入"外协单位全称"或"组织代码"来查询欲添加的外协单位是否存在!'
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        allowBlank: true,
        width: 200
    });
    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        allowBlank: true,
        width: 90,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '8' }
    });
    this._codeShortLine = new Ext.form.Label({
        text: '-'
    });
    this._codeNinethNumber = new Ext.form.NumberField({
        fieldLabel: '第九位',
        hideLabel: true,
        allowBlank: true,
        width: 20,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '1' }
    });
    this.items = [this._textFieldName];

    this.items[this.items.length] = new Ext.Panel({
        width: 500,
        layout: 'column',
        items: [new Ext.Panel({
            width: 200,
            layout: 'form',
            items: this._textFieldOrganizationCode
        }), new Ext.Panel({
            width: 10,
            layout: 'form',
            items: this._codeShortLine
        }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
    });



    this.web1 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '如果您不知道新建外协单位的组织机构代码，可在'
    });
    this.web2 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '全国组织机构代码管理中心'
    });
    this.web3 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '网站查询。'
    });
    
    this.items[this.items.length] = new Ext.Panel({
        layout: 'column',
        items: [new Ext.Panel({
            layout: 'form',
            items: this.web1
        }), new Ext.Panel({

            layout: 'form',
            items: this.web2
        }), new Ext.Panel({

            layout: 'form',
            items: this.web3
        })
            ]
    });
    



    Srims.common.OutsourcingIsExistWindow_InForm.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 100,
        items: this.items
    });
}
Ext.extend(Srims.common.OutsourcingIsExistWindow_InForm, Ext.form.FormPanel, {});if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.common.OutsourcingProvinceXmlReader.superclass.constructor.call(
						this, Srims.common.OutsourcingProvinceCities);
    }
});/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceCities = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}]);
Srims.data.Entity.apply(Srims.common.OutsourcingProvinceCities);/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.common.OutsourcingProvinceStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingProvinceXmlReader(), load_url,
						params);
    }
});/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');
//列出外协单位
Srims.common.ListOutsourcing = function(showOutsourcingQueryPanel) {
    var panelId = 'OutourcingGridPanel';
    var outsourcingStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        outsourcingStore = panel.GetOutsourcingStore();
    } else {
        outsourcingStore = new Srims.common.OutsourcingStore(Srims.service.common.OutsourcingService
				+ '/Query', queryParams);
        panel = new Srims.common.OutsourcingGridPanel(panelId,
				outsourcingStore, '外协单位列表', 'icon-outsourcing-list', queryParams);
        Srims.WorkSpace.addPanel(panel);
    }
    if (showOutsourcingQueryPanel)
        Srims.common.showOutsourcingQueryPanel(outsourcingStore, queryParams, panel);
};
//查重
Srims.common.showIsExistWindow = function(store) {
    var window = Ext.getCmp("IsOutsourcingExist");
    if (!window)
        var window = new Srims.common.IsOutsourcingExistWindow(store);
    // window._editGridPanel.getStore().load();
    window.show();
}
Srims.common.showOutsourcingQueryPanel = function(store, queryParams, gridPanel) {
    var panelId = 'OutsourcingInquiryPanel'
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        panel = new Srims.common.OutsourcingInquiryPanel(panelId, store, queryParams, gridPanel)
        Srims.WorkSpace.addPanel(panel);
    }

    gridPanel.queryPanel = panel;

    var map = new Ext.KeyMap(panelId, {
        key: 13,
        fn: function() {
            if (!panel.hidden)
                panel.query(panel._buttonQuery);
        }
    });
};
Srims.common.StatisticsOutsourcing = function() {

};
// 查看外协单位
Srims.common.ShowOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingShowPanel' + outsourcing.get('id');
    var panel = Srims.WorkSpace.active(panelID);

    if (panel) {
        panel = new Srims.common.OutsourcingShowPanel(store, panelID,
				outsourcing);
    } else {
        panel = new Srims.common.OutsourcingShowPanel(store, panelID,
				outsourcing)
        Srims.WorkSpace.addPanel(panel);
    }
};
// 新建外协单位
Srims.common.NewOutsourcing = function(IsInformation, store, IsExpert) {
    var panelID = 'NewOutsourcing';
    var outsourcing = new Srims.common.Outsourcing({});

    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingEditPanel(IsInformation, panelID, outsourcing,
			store, IsExpert);
    Srims.WorkSpace.addPanel(panel);
};
// 编辑外协单位
Srims.common.EditOutsourcing = function(outsourcing, store, IsExpert) {
    var panelID = 'OutsourcingEditPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingEditPanel(' ?; ?; ', panelID, outsourcing,
			store, IsExpert);
    Srims.WorkSpace.addPanel(panel);
};
Srims.common.VerfiyOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingVerfiyPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingVerfiyPanel(' ?; ?; ', panelID, outsourcing,
			store);
    Srims.WorkSpace.addPanel(panel);
};

Srims.common.InquiryOneOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingInquiryPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingInquiryPanel(panelID, outsourcing,
			store);
    Srims.WorkSpace.addPanel(panel);
};
Srims.common.setSelectOutsourcingID = function(outsourcing, store) {
    var _params = {};
    _params.id = outsourcing.get('id');
    Ext.Ajax.request({
        url: Srims.service.common.OutsourcingService
										+ '/SetCurrentSelectSourcingID',
        scope: this,
        params: _params
    });
};
//通过注册上传外协单位相关文档
Srims.common.uploadDocument = function(outsourcing, store, title) {
    var windowId = 'newOutsourcingImportWindow' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.component.FileUploadWindow(windowId, store, Srims.service.common.OutsourcingService + '/Import', title, false, outsourcing);

    window.show();
}

//驳回外协单位
Srims.common.saveForChangeState = function(outsourcing, outsourcingState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo) {

    //    var _params = {};
    //    _params.outsourcingID = outsourcing.get('id');
    //    _params.remark = remark;

    //    outsourcing.beginEdit();
    //    outsourcing.set('isVerify', outsourcingState); //
    //    outsourcing.commit();

    Ext.Ajax.request({
        url: Srims.service.common.OutsourcingService + subUrl,
        params: outsourcing.data,
        success: function(response) {
            //从showPanel上改变外协状态

            //执行轮询
            if (pollActions) {
                for (var i = 0; i < pollActions.length; i++)
                    Srims.Poll.startPollAction(pollActions[i]);
            }

            //刷新GridPanel
            var gridPanel = Ext.getCmp(gridPanelID);
            if (gridPanel) {
                Srims.WorkSpace.active(gridPanelID);
                Ext.getCmp(gridPanelID).getStore().load({
                    callback: function() {
                        Ext.Msg.show({
                            title: msg,
                            msg: msgInfo,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                });
            }
            var showPanel = 'OutsourcingVerfiyPanel' + outsourcing.get('id'); ;
            if (showPanel) {
                Srims.WorkSpace.getWorkSpace().remove(showPanel);

                //取得外协
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.common.OutsourcingXmlReader()
                });

                var newOutsourcing = newStore.getAt(0);
                Srims.common.ShowOutsourcing(newOutsourcing);
            }
            else {
                Ext.Msg.show({
                    title: msg,
                    msg: msgInfo,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    });
}

Srims.common.censorStart = function(outsourcing, remark, outsourcingState, subUrl, msg, msgInfo) {
    var gridPanelID = 'OutourcingGridPanel';
    var pollActions = [];
    pollActions[pollActions.length] = Srims.Poll.getPollAction_WaitingStartCensorOutsourcingCount;

    Srims.common.saveForChangeState(outsourcing, outsourcingState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo);
}
Srims.common.censorStart_Reject = function(outsourcing, remark) {
    Srims.common.censorStart(outsourcing, remark, '审核驳回', '/DisVerfiy', '审核驳回立项：外协单位的添加申请成功', '成功审核驳回外协单位：' + outsourcing.get('name') + '的申请');
}
Srims.common.rejectOutsourcingCensor = function(outsourcing) {
    var windowId = 'rejectOutsourcingCensorWindow_start' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.common.OutsourcingCensorRejectWindow(windowId, outsourcing);
    window.show();
}

// 删除外协单位
Srims.common.DeleteOutsourcing = function(outsourcing, store) {
    Ext.MessageBox.confirm('删除该外协单位', '你确定要删除这个外协单位吗？', function(buttonID) {
        if (buttonID == 'yes') {
            var _params = {};
            _params.id = outsourcing.get('id');
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService
										+ '/Delete',
                scope: this,
                params: _params,
                success: function() {
                    var showPanelID = 'OutsourcingShowPanel'
											+ outsourcing.get('id');
                    showPanel = Ext.getCmp(showPanelID);
                    if (showPanel)
                        Srims.WorkSpace.getWorkSpace()
												.remove(showPanel);
                    var editPanelID = 'OutsourcingEditPanel'
											+ outsourcing.get('id');
                    editPanel = Ext.getCmp(editPanelID);
                    if (editPanel)
                        Srims.WorkSpace.getWorkSpace()
												.remove(editPanel);
                    store.load();
                },
                failure: function() {
                    Ext.Msg.show({
                        title: '删除失败',
                        msg: '服务器删除错误，请重新删除！',
                        buttons: Ext.Msg.OK
                    });

                }
            });
        }
    }, this);
};
//通过表格导入外协相关文档
Srims.common.showOutsourcingImportWindow = function(outsourcing, store, title) {
    var windowId = 'OutsourcingImportWindow' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    Srims.common.setSelectOutsourcingID(outsourcing, store);
    if (!window)
        window = new Srims.component.FileUploadWindow(windowId, store, Srims.service.common.OutsourcingService + '/Import', title, false);

    window.show();
}

Srims.common.downLoadDocument = function(document) {
    var documentResource = document;
    if (documentResource == '' || documentResource == null || documentResource == undefined) {
        Ext.Msg.show({
            title: '文档查看失败',
            msg: '该文档还没有上传',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    Srims.documents.downLoadResource(document, '/GetOutsourcingDocument');
}

Srims.common.showOutsourcingShowPanel_AllocationInfo_QueryWindow = function(id, store, queryParams, gridPanel,outsourcing) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow(id, store, queryParams, gridPanel,outsourcing);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
if (!Srims.common)
    Ext.namespace('Srims.common');
Ext.namespace('Srims.common.OutsourcingCompanyType');
Srims.common.OutsourcingCompanyType.institution = 'institution';
Srims.common.OutsourcingCompanyType.collectively_owned = 'collectively_owned';
Srims.common.OutsourcingCompanyType.joint_equity = 'joint_equity ';
Srims.common.OutsourcingCompanyType.associated = 'associated';
Srims.common.OutsourcingCompanyType.LLC = 'LLC';
Srims.common.OutsourcingCompanyType.LTD = 'LTD';
Srims.common.OutsourcingCompanyType.privateC = 'privateC';
Srims.common.OutsourcingCompanyType.GOT_joint_venture = 'GOT_joint_venture';
Srims.common.OutsourcingCompanyType.GOT_cooperative_venture = 'GOT_cooperative_venture';
Srims.common.OutsourcingCompanyType.GOT_private_venture = 'GOT_private_venture';
Srims.common.OutsourcingCompanyType.GOT_ownjoint_venture = 'GOT_ownjoint_venture';
Srims.common.OutsourcingCompanyType.cf_joint = 'cf_joint';
Srims.common.OutsourcingCompanyType.cf_cooperation = 'cf_cooperation';
Srims.common.OutsourcingCompanyType.overseas = 'overseas';
Srims.common.OutsourcingCompanyType.FICLS = 'FICLS';

Srims.common.outsourcingCompanyTypeRender = function(value, metadata) {
    switch (value) {
        case 'institution':
            return '事业单位';
        case 'collectively_owned':
            return '集体企业';
        case 'joint_equity':
            return '股份合作企业';
        case 'associated':
            return '联营企业';
        case 'LLC':
            return '有限责任公司';
        case 'LTD':
            return '股份有限公司';
        case 'privateC':
            return '私营企业';
        case 'GOT_joint_venture':
            return '合资经营企业(港或澳、台资)';
        case 'GOT_cooperative_venture':
            return '合作经营企业(港或澳、台资)';
        case 'GOT_private_venture':
            return '港、澳、台商独资经营企业';
        case 'GOT_ownjoint_venture':
            return '港、澳、台商投资股份有限公司';
        case 'cf_joint':
            return '中外合资经营企业';
        case 'cf_cooperation':
            return '中外合作经营企业';
        case 'overseas':
            return '外资企业';
        case 'FICLS':
            return '外商投资股份有限公司';
        default:
            return '未知';
    }
}
//Srims.common.outsourcingCompanyTypeStore = [['事业单位', '事业单位'], ['collectively_owned', '集体企业'], ['joint_equity ', '股份合作企业'], ['associated', '联营企业'], ['LLC', '有限责任公司'], ['LTD', '股份有限公司'], ['privateC', '私营企业'], ['GOT_joint_venture', '合资经营企业(港或澳、台资)'], ['GOT_cooperative_venture', '合作经营企业(港或澳、台资)'], ['GOT_private_venture', '港、澳、台商独资经营企业'], ['GOT_ownjoint_venture', '港、澳、台商投资股份有限公司'], ['cf_joint', '中外合资经营企业'], ['cf_cooperation', '中外合作经营企业'], ['overseas', '外资企业'], ['FICLS', '外商投资股份有限公司']];
Srims.common.outsourcingCompanyTypeStore = [['事业单位', '事业单位'], ['集体企业', '集体企业'], ['股份合作企业 ', '股份合作企业'], ['联营企业', '联营企业'], ['有限责任公司', '有限责任公司'], ['股份有限公司', '股份有限公司'], ['私营企业', '私营企业'], ['合资经营企业(港或澳、台资)', '合资经营企业(港或澳、台资)'], ['合作经营企业(港或澳、台资)', '合作经营企业(港或澳、台资)'], ['港、澳、台商独资经营企业', '港、澳、台商独资经营企业'], ['港、澳、台商投资股份有限公司', '港、澳、台商投资股份有限公司'], ['中外合资经营企业', '中外合资经营企业'], ['中外合作经营企业', '中外合作经营企业'], ['外资企业', '外资企业'], ['外商投资股份有限公司', '外商投资股份有限公司']];
/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingEditPanel = function(IsInformation, id, outsourcing, store, IsExpert) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._id = id;
    var clickTimes = 0;
    this._outsourcing = outsourcing;
    this._store = store;
    this._title = outsourcing.isNew() ? "新建外协单位" : '编辑外协单位-'
			+ outsourcing.get('name');
    this.importUrl = "";
    this._basicForm = new Srims.common.OutsourcingEditPanel_Basic(IsInformation, outsourcing); // 位于文件Srims.common.OutsourcingEditPanel_Basic.js中
    //this._documentForm = new Srims.common.OutsourcingEditPanel_Document(outsourcing);
    //this._tabDocument = new Srims.common.OutsourcingEditPanel_tabDocument(outsourcing);
    this._buttonSubmitDocument = new Srims.common.OutsourcingEditPanel_ToolBar(this);
    this._newbuttonSubmitDocument = new Srims.common.OutsourcingEditPanel_newToolBar(this);
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保存',
        panel: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 100,
        text: '重置',
        panel: this,
        handler: function() {
            var panel = this.panel;
            panel.clearParams();
        }
    });
    this._buttonCanel = new Ext.Button({
        minWidth: 100,
        text: '取消',
        panel: this,
        handler: function() {
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });
    Srims.common.OutsourcingEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px;width:1200px;',
        closable: true,
        frame: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._title,
        iconCls: this._outsourcing.isNew()
						? 'icon-outsourcing-new'
						: 'icon-outsourcing-edit',
        items: [this._basicForm, this._newbuttonSubmitDocument, this._buttonSubmitDocument],
        buttons: [this._buttonSave, this._buttonCanel]
    });
    // method
    this.assignValues = function() {
        this._basicForm.assignValues();
    }
    this.clearParams = function() {
        this._basicForm.clearParams();
    }
    this.isValid = function(preventMark) {
        var result = true;

        result = this._basicForm.isValid(preventMark) && result;

        return result;
    }
    this.save = function() {
        var outsourcing = this._outsourcing;
        var isNew = this._outsourcing.isNew();
        var Isexpert = IsExpert;
        outsourcing.beginEdit();
        this.assignValues();
        outsourcing.commit();
        if (userIsExpert)
            if (!(outsourcing.get('taxCard') && outsourcing.get('companyCard') && outsourcing.get('groupCard')))
            Ext.Msg.show({
                title: '提示',
                msg: '您有为填完的空或者未提交的文件！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        if (!userIsExpert)
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService + '/Save',
                params: outsourcing.data,
                scope: this,
                success: function(response) {
                    //if (this._store)
                    //  this._store.load();//reflesh grid
                    Srims.WorkSpace.getWorkSpace().remove(this);

                    var newStore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.common.OutsourcingXmlReader()
                    });

                    var newOutsourcing = newStore.getAt(0);

                    if (!Isexpert) {
                        if (!isNew) {
                            var panelID = 'OutsourcingShowPanel' + newOutsourcing.get('id');
                            if (Ext.getCmp(panelID))
                                Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);

                        }
                        var gridPanel = Ext.getCmp('OutourcingGridPanel');
                        if (gridPanel) {
                            Srims.WorkSpace.active('OutourcingGridPanel');
                            Ext.getCmp('OutourcingGridPanel').getStore().load();
                        }
                        Srims.common.ShowOutsourcing(newOutsourcing, newOutsourcing);
                    }
                    if (Isexpert) {
                        var projectOut = new Srims.projects.ProjectOut({ outSourcingName: newOutsourcing.get('name'), amount: '' });
                        store.insert(0, projectOut);
                        store.grid.startEditing(0, 0);
                    }
                }
            });

            if (userIsExpert)
                Ext.Ajax.request({
                    url: Srims.service.common.OutsourcingService + '/Save',
                    params: outsourcing.data,
                    scope: this,
                    success: function(response) {
                        if (this._store)
                            this._store.load(); //reflesh grid
                        Srims.WorkSpace.getWorkSpace().remove(this);
                    }
                });
    }
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;
        if (!panel.isValid(false))
            return;

        //        button.setText('正在保存');
        //        button.disable();
        panel.save();
    }

    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.OutsourcingEditPanel, Ext.Panel, {});/**
* @author dulintao
*/
Srims.common.OutsourcingEditPanel_Basic = function(IsInformation, outsourcing) {

    this._user = Srims.currentLoginLog.user;
    this._userIsExpert = this._user.userRoleType == 'Expert';
    this._outsourcing = outsourcing;

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        value: outsourcing.isNew() ? IsInformation.split('?;')[0] : outsourcing.get('name'),
        allowBlank: false,
        width: 200
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
        fieldLabel: '法人代表',
        value: outsourcing.get('legalRepresentativeName'),
        allowBlank: false,
        width: 200
    });
    this._textFieldRegisteredCapital = new Ext.form.NumberField({
        fieldLabel: '注册资本(万元)',
        value: outsourcing.get('registeredCapital'),
        allowBlank: false,
        width: 200
    });
    this.validatCardNumber = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        var lCardNumber = value.length;
        if (!isNaN(value))
            if (lCardNumber == 12 || lCardNumber == 15) {

            return true;
        }
        else {
            this.invalidText = '请正确输入12或15位的注册号！';
            return false;
        }
    }
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        value: outsourcing.get('registeredCardNumber'),
        allowBlank: true,
        validator: this.validatCardNumber,
        width: 200
    });
    this._textFieldRegisteredCardNumber.panel = this;
    this._textFieldRegisteredCardNumber.validator = this.validatCardNumber;

    this.validatOrganizationCode = function() {
        var panel = this.panel;
        var value = this.getRawValue();
        var lCodeNumber = String(value).length;
        if (!isNaN(value))
            if (lCodeNumber == 8) {
            return true;
        }
        else {
            this.invalidText = '请正确输入8位本体代码！';
            return false;
        }
    }
    this.validatNinethNumber = function() {
        var panel = this.panel;
        var valueNine = this.getValue();
        var nineIsOne = valueNine.length;
        if (nineIsOne != 1) {
            this.invalidText = '请输入一位校验码！';
            return false;
        }
        else {
            var code = panel._textFieldOrganizationCode.getRawValue();
            var totleCode = 0;
            totleCode = code[0] * 3 + code[1] * 7 + code[2] * 9 + code[3] * 10 + code[4] * 5 + code[5] * 8 + code[6] * 4 + code[7] * 2;
            var compare = 11 - totleCode % 11;

            if ((valueNine >= 0 && valueNine <= 9) || (valueNine >= 'a' && valueNine <= 'z') || (valueNine >= 'A' && valueNine <= 'Z')) {
                if (compare == 0 || compare == 11)
                    if (valueNine == 0)
                    return true;
                if (compare == 10)
                    if (valueNine == "x" || valueNine == "X")
                    return true;
                if (compare < 10 && compare >= 1)
                    if (valueNine == compare)
                    return true;
                else {
                    this.invalidText = '校验码输入错误！';
                    return false;
                }
            }
            else {
                this.invalidText = '校验码必须为数字或字母！';
                return false;
            }
        }
    }

    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        value: outsourcing.isNew() ? IsInformation.split('?;')[1] : outsourcing.get('organizationCode') ? outsourcing.get('organizationCode').split('-')[0] : '',
        allowBlank: false,
        maxLength: 8,
        width: 65,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '8' }
    });
    this._codeShortLine = new Ext.form.Label({
        text: '    —'
    });
    this._codeNinethNumber = new Ext.form.TextField({
        fieldLabel: '第九位',
        hideLabel: true,
        value: outsourcing.isNew() ? IsInformation.split('?;')[2] : outsourcing.get('organizationCode') ? outsourcing.get('organizationCode').split('-')[1] : '',
        allowBlank: false,
        width: 20,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '1' }
    });
    this._textFieldOrganizationCode.panel = this;
    this._textFieldOrganizationCode.validator = this.validatOrganizationCode;
    this._codeNinethNumber.panel = this;
    this._codeNinethNumber.validator = this.validatNinethNumber;

    this.validatTaxNumber = function() {
        var panel = this.panel;
        var value = this.getValue();
        var lTaxNumber = value.length;
        //        if (!outsourcing.isNew()) {
        //            var provincecity = panel._comboBoxTaskCorporationPlace_Town.getRawValue() + ' ' + panel._comboBoxTaskCorporationPlace_City.getRawValue();
        //            //////////////////////////
        //            Ext.Ajax.request(this, {
        //                url: Srims.service.common.OutsourcingService + '/GetByCityName',
        //                params: { provincecity: provincecity },
        //                scope: this,
        //                success: function(response) {
        //                var adv = response.responseText; 
        //                }
        //            });
        //        }
        //        else
        var adv = panel._comboBoxTaskCorporationPlace_City.getValue();
        var OCode = panel._textFieldOrganizationCode.getValue() + panel._codeNinethNumber.getValue();
        if (lTaxNumber != 15) {
            this.invalidText = '您输入的税号位数不等于15位！';
            return false;
        }
        else {
            if (outsourcing.isNew()) {
                if (value.substring(0, 6) == adv) {
                    var lastNine = value.substring(6, 15);
                    if (lastNine == OCode) {
                        return true;
                    }
                    else {
                        this.invalidText = '后九位必须与组织代码相符合！';
                        return false;
                    }
                }

                else {
                    this.invalidText = '前六位必须与选择的地区代码一致！';
                    return false;
                }
            }
            if (!outsourcing.isNew()) {
                var lastNine = value.substring(6, 15);
                if (lastNine == OCode) {
                    return true;
                }
                else {
                    this.invalidText = '后九位必须与组织代码相符合！';
                    return false;
                }
            }
        }
    }

    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        value: outsourcing.get('taxNumber'),
        allowBlank: false,
        width: 200
    });
    this._textFieldTaxNumber.panel = this;

    this._textFieldTaxNumber.validator = this.validatTaxNumber;


    this._textFieldCompanyType = new Ext.form.ComboBox({
        fieldLabel: '公司类型',
        value: outsourcing.get('companyType'),
        store: Srims.common.outsourcingCompanyTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        emptyText: '请选择公司类型',
        listWidth: 200,
        allowBlank: false,
        width: 200
    });
    var scheduleType = [
    ['1', '一级', ''],
    ['2', '二级', ''],
    ['3', '三级', ''],
    ['4', '四级', ''],
    ['5', '五级', '']
];
    this._textFieldManagementType = new Ext.form.ComboBox({
        store: scheduleType,
        displayField: 'lb',
        fieldLabel: '管理类别',
        value: outsourcing.get('managementType'),
        triggerAction: 'all',
        typeAhead: true,
        mode: 'local',
        emptyText: '请选择类别',
        selectOnFocus: true,
        width: 200
    });

    this._textFieldCreateDateTime = new Ext.form.DateField({
        fieldLabel: '成立时间',
        value: outsourcing.get('createDateTime'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this.validatStart = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        if (this.getValue() < panel._textFieldCreateDateTime.getValue()) {
            this.invalidText = '营业期限初始时间在成立时间之后！';
            return false;
        }
        else {
            return true;
        }
    };
    this._textFieldDealDateTimeStart = new Ext.form.DateField({
        fieldLabel: '营业期限',
        value: outsourcing.get('dealDateTimeStart'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this._textFieldDealDateTimeStart.panel = this;
    this._textFieldDealDateTimeStart.validator = this.validatStart;

    this.validatEndTime = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        if (this.getValue() > panel._textFieldDealDateTimeStart.getValue()) {

            return true;
        }
        else {
            this.invalidText = '营业期限结束时间在开始时间之后！';
            return false;
        }
    }
    this._textFieldDealDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        value: outsourcing.get('dealDateTimeEnd'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this._textFieldDealDateTimeEnd.panel = this;
    this._textFieldDealDateTimeEnd.validator = this.validatEndTime;

    this._textFieldBusinessScope = new Ext.form.TextArea({
        fieldLabel: '经营范围',
        value: outsourcing.get('businessScope'),
        allowBlank: true,
        width: 600,
        height: 100
    });
    this._textFieldRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        value: outsourcing.get('remark'),
        allowBlank: true,
        width: 600,
        height: 100
    });
    this._textFieldIsVerify = new Ext.form.TextField({
        fieldLabel: '审核状态',
        value: outsourcing.get('isVerify'),
        allowBlank: false,
        width: 600,
        height: 100
    });

    //取得所在省份或城市
    this._getProvinceOrCity = function(outsourcing, index) {
        var outsourcing_taskCorporationPlace = outsourcing.get('address');
        if (outsourcing_taskCorporationPlace != undefined && outsourcing_taskCorporationPlace.toString().trim() != '')
            outsourcing_taskCorporationPlace = outsourcing_taskCorporationPlace.split(' ')[index];
        else
            outsourcing_taskCorporationPlace = undefined;
        return outsourcing_taskCorporationPlace
    }
    var outsourcing_taskCorporationPlace_province = this._getProvinceOrCity(outsourcing, 0); //? this._getProvinceOrCity(outsourcing, 0) : "";
    this._comboBoxTaskCorporationPlace_Province = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        value: outsourcing_taskCorporationPlace_province,
        store: newProvinces,
        allowBlank: false,
        emptyText: '选择省',
        editable: false,
        triggerAction: 'all',
        listWidth: 65,
        panel: this,
        width: 50
    });
    var outsourcing_taskCorporationPlace_town = this._getProvinceOrCity(outsourcing, 1); //? this._getProvinceOrCity(outsourcing, 1) : "";
    this._comboBoxTaskCorporationPlace_Town = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        hideLabel: true,
        value: outsourcing_taskCorporationPlace_town,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: outsourcing_taskCorporationPlace_province == undefined ? new Array() : newProvinces.getCities(outsourcing_taskCorporationPlace_province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: false,
        emptyText: '选择市',
        editable: false,
        mode: 'local',
        triggerAction: 'all',
        listWidth: 65,
        width: 50
    });
    var outsourcing_taskCorporationPlace_city = this._getProvinceOrCity(outsourcing, 2); //? this._getProvinceOrCity(outsourcing, 2) : "";
    this._comboBoxTaskCorporationPlace_City = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        hideLabel: true,
        value: outsourcing_taskCorporationPlace_city,
        store: new Srims.common.OutsourcingProvinceStore(Srims.service.common.OutsourcingService + '/GetProvinceAreasByProvinceName'),
        valueField: 'id',
        displayField: 'name',
        allowBlank: false,
        emptyText: '选择区',
        editable: false,
        mode: 'local',
        triggerAction: 'all',
        listWidth: 65,
        width: 50
    });
    //城市之间的联动

    this.onComboBoxTaskCorporationPlace_Town_Select = function(comboBox) {
        var province = comboBox.getValue();
        comboBox.comboBoxTaskCorporationPlace_City.setValue("");
        comboBox.comboBoxTaskCorporationPlace_City.store.load({ params: { provinceName: province} });
    }
    this.onComboBoxTaskCorporationPlace_Province_Select = function(comboBox) {
        var province = comboBox.getValue();
        comboBox.comboBoxTaskCorporationPlace_Town.setValue("");
        comboBox.comboBoxTaskCorporationPlace_Town.comboBoxTaskCorporationPlace_City.setValue("");

        var comboBoxTaskCorporationPlace_Town = comboBox.comboBoxTaskCorporationPlace_Town;
        var cityStore = comboBoxTaskCorporationPlace_Town.store;
        var cities = newProvinces.getCities(province);
        cityStore.loadData(cities);
        comboBoxTaskCorporationPlace_Town.setValue(undefined);

    }
    this._comboBoxTaskCorporationPlace_Town.comboBoxTaskCorporationPlace_City = this._comboBoxTaskCorporationPlace_City;
    this._comboBoxTaskCorporationPlace_Town.on('select', this.onComboBoxTaskCorporationPlace_Town_Select);
    this._comboBoxTaskCorporationPlace_Province.comboBoxTaskCorporationPlace_Town = this._comboBoxTaskCorporationPlace_Town;
    this._comboBoxTaskCorporationPlace_Province.on('select', this.onComboBoxTaskCorporationPlace_Province_Select);

    if (this._userIsExpert) {
        this.items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart];

        this.items2 = [this._textFieldCompanyType]//, this._textFieldTaxNumber, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd];
        this.items2[this.items2.length] = new Ext.Panel({
            widht: 400,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Province
            }), new Ext.Panel({
                width: 75,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Town
            }), new Ext.Panel({
                width: 80,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_City
            })]
        });
        this.items2[this.items2.length] = this._textFieldTaxNumber;
        this.items2[this.items2.length] = this._textFieldCreateDateTime;
        this.items2[this.items2.length] = this._textFieldDealDateTimeEnd;



        this.items1[this.items1.length] = new Ext.Panel({
            widht: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._textFieldOrganizationCode
            }), new Ext.Panel({
                width: 20,
                layout: 'form',
                items: this._codeShortLine
            }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
        });
    }
    else {
        this.items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldTaxNumber];
        this.items2 = [this._textFieldCompanyType]//, this._textFieldManagementType, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd];

        this.items2[this.items2.length] = new Ext.Panel({
            widht: 400,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Province
            }), new Ext.Panel({
                width: 75,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Town
            }), new Ext.Panel({
                width: 80,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_City
            })]
        });

        this.items2[this.items2.length] = this._textFieldManagementType;
        this.items2[this.items2.length] = this._textFieldCreateDateTime;
        this.items2[this.items2.length] = this._textFieldDealDateTimeEnd;
        this.items2[this.items2.length] = new Ext.Panel({
            widht: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._textFieldOrganizationCode
            }), new Ext.Panel({
                width: 20,
                layout: 'form',
                items: this._codeShortLine
            }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
        });
    }

    Srims.common.OutsourcingEditPanel_Basic.superclass.constructor.call(this, {
        title: '基本信息',
        Height: 350,
        frame: true,
        labelWidth: 120,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:400px',
                items: this.items1
            }), new Ext.Panel({
                width: 400,
                style: 'width:300px',
                layout: 'form',
                items: this.items2
            })]
        }), this._textFieldBusinessScope, this._textFieldRemark]
    });
    this.assignValues = function() {
        this._outsourcing.set('name', this._textFieldName.getValue());
        this._outsourcing.set('legalRepresentativeName', this._textFieldLegalRepresentativeName.getValue());
        this._outsourcing.set('registeredCapital', this._textFieldRegisteredCapital.getValue());
        this._outsourcing.set('registeredCardNumber', this._textFieldRegisteredCardNumber.getValue());
        this._outsourcing.set('organizationCode', this._textFieldOrganizationCode.getRawValue() + "-" + this._codeNinethNumber.getValue());
        this._outsourcing.set('taxNumber', this._textFieldTaxNumber.getValue());
        this._outsourcing.set('companyType', this._textFieldCompanyType.getValue());
        this._outsourcing.set('managementType', this._textFieldManagementType.getRawValue());
        if (this._textFieldCreateDateTime.getValue() == null || this._textFieldCreateDateTime.getValue() == "" || this._textFieldCreateDateTime.getValue() == undefined)
            this._outsourcing.set('createDateTime', null);
        else
            this._outsourcing.set('createDateTime', this._textFieldCreateDateTime.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeStart.getValue() == null || this._textFieldDealDateTimeStart.getValue() == "" || this._textFieldDealDateTimeStart.getValue() == undefined)
            this._outsourcing.set('dealDateTimeStart', null);
        else
            this._outsourcing.set('dealDateTimeStart', this._textFieldDealDateTimeStart.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeEnd.getValue() == null || this._textFieldDealDateTimeEnd.getValue() == "" || this._textFieldDealDateTimeEnd.getValue() == undefined)
            this._outsourcing.set('dealDateTimeEnd', null);
        else
            this._outsourcing.set('dealDateTimeEnd', this._textFieldDealDateTimeEnd.getValue().format('Y/m/d'));
        this._outsourcing.set('businessScope', this._textFieldBusinessScope.getValue());
        this._outsourcing.set('remark', this._textFieldRemark.getValue());
        if (!this._userIsExpert)
            this._outsourcing.set('isVerify', "审核通过");
        else {
            if (this._textFieldIsVerify.getValue() == null || this._textFieldIsVerify.getValue() == "" || this._textFieldIsVerify.getValue() == undefined)
                this._outsourcing.set('isVerify', "未审核");
            else
                this._outsourcing.set('isVerify', this._textFieldIsVerify.getValue());
        }
        this._outsourcing.set('address', this._comboBoxTaskCorporationPlace_Province.getValue() + ' ' + this._comboBoxTaskCorporationPlace_Town.getRawValue() + ' ' + this._comboBoxTaskCorporationPlace_City.getRawValue());

    }
    //清除所有输入框
    this.clearParams = function() {
        this._textFieldName.reset();
        this._textFieldLegalRepresentativeName.reset();
        this._textFieldRegisteredCapital.reset();
        this._textFieldRegisteredCardNumber.reset();
        this._textFieldOrganizationCode.reset();
        this._textFieldTaxNumber.reset();
        this._textFieldCompanyType.reset();
        this._textFieldManagementType.reset();
        this._textFieldCreateDateTime.reset();
        this._textFieldDealDateTimeStart.reset();
        this._textFieldDealDateTimeEnd.reset();
        this._textFieldBusinessScope.reset();
        this._textFieldRemark.reset();
        this._comboBoxTaskCorporationPlace_Province.reset();
        this._comboBoxTaskCorporationPlace_Town.reset();
        this._comboBoxTaskCorporationPlace_City.reset();
    }
    //对各输入框进行验证结果进行统计
    this.isValid = function(preventMark) {
        var result = true;
        if (this._userIsExpert) {
            result = this._textFieldName.isValid() && result;
            result = this._textFieldLegalRepresentativeName.isValid() && result;
            result = this._textFieldRegisteredCapital.isValid() && result;
            result = this._textFieldRegisteredCardNumber.isValid(preventMark) && result;
            result = this._textFieldOrganizationCode.isValid() && result;
            result = this._textFieldTaxNumber.isValid() && result;
            result = this._textFieldCompanyType.isValid() && result;
            //result = this._textFieldManagementType.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_Province.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_Town.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_City.isValid() && result;
            //result = this._textFieldCreateDateTime.isValid() && result;
            result = this._textFieldDealDateTimeStart.isValid() && result;
            result = this._textFieldDealDateTimeEnd.isValid() && result;
            //result = this._textFieldBusinessScope.isValid() && result;
            return result;
        }
        else
            return result;
    }
}
Ext.extend(Srims.common.OutsourcingEditPanel_Basic, Ext.form.FormPanel);
Srims.common.OutsourcingEditPanel_Document = function(outsourcing) {

    this._outsourcing = outsourcing;

    this._LegalRepresentativefileUploadField = new Srims.component.FileUploadField({
    id: 'upLegalRepresentativeLoadDocument',
        fieldLabel: '上传企业法人证书',
        width: 300,
        emptyText: '请选择要上传的法人证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._LegalRepresentativebuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });

    this._OrganizationCodefileUploadField = new Srims.component.FileUploadField({
    id: 'upOrganizationCodeLoadDocument',
        fieldLabel: '上传机构代码证书',
        width: 300,
        emptyText: '请选择要上传的机构代码证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._OrganizationCodebuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });
    this._TaxfileUploadField = new Srims.component.FileUploadField({
        id: 'upTaxLoadDocument',
        fieldLabel: '上传税务登记证书',
        width: 300,
        emptyText: '请选择要上传的税务登记证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._TaxbuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });
    var items1 = [this._LegalRepresentativefileUploadField, this._LegalRepresentativebuttonUpload];
    var items2 = [this._OrganizationCodefileUploadField, this._OrganizationCodebuttonUpload];
    var items3 = [this._TaxfileUploadField, this._TaxbuttonUpload];
    Srims.common.OutsourcingEditPanel_Basic.superclass.constructor.call(this, {

    activeTab: 0,
    title: '上传外协文档',
        Height: 150,
        frame: true,
        labelWidth: 120,
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
                style: 'width:400px',
                items: [this._LegalRepresentativefileUploadField]
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: [this._LegalRepresentativebuttonUpload]
            })]
        }),

        new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:400px',
                items: this._OrganizationCodefileUploadField
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: this._OrganizationCodebuttonUpload
            })]
        }),

        new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:400px',
                items: this._TaxfileUploadField
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: this._TaxbuttonUpload
            })]
        })
        
        ]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_Document, Ext.TabPanel);

if (!Srims.common)
    Ext.namespace('Srims.common');

if (!Srims.documents)
    Ext.namespace('Srims.documents');


Srims.common.OutsourcingEditPanel_ToolBar = function(panel) {

    //fields
    this._panel = panel;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传企业法人证书',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '企业法人证书');
    },
        hidden: false,
        tooltip: '<b>上传外协单位文档：企业法人证书</b>'
    });
    this._buttonupOrganizationCodeLoadDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传组织机构代码证',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '组织机构代码证');
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：组织机构代码证</b>'
    });
    this._buttonupTaxLoadDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传税务登记证',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '税务登记证');
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：税务登记证</b>'
    });

    Srims.common.OutsourcingEditPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitMainContract,this._buttonupOrganizationCodeLoadDocument,this._buttonupTaxLoadDocument]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_ToolBar, Ext.Toolbar);


if (!Srims.common)
    Ext.namespace('Srims.common');

if (!Srims.documents)
    Ext.namespace('Srims.documents');


Srims.common.OutsourcingEditPanel_newToolBar = function(panel) {

    //fields
    this._panel = panel;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传外协单位文档',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
            //Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store);
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：企业法人证书、组织机构代码证、税务登记证</b>'
    });
    this._newTextLabel = new Ext.form.Label({
        style: "font-size:12px;color:blue",
        text: '上传外协单位文档，    '
    });
    this._PTextLabel = new Ext.form.Label({
        style: "font-size:12px;color:#FF0000",
        text: '         请注意：上传文件要求加盖对方单位的公章，以彩色扫描件形式上传！'
    });

    Srims.common.OutsourcingEditPanel_newToolBar.superclass.constructor.call(this, {
        items: [this._newTextLabel,this._PTextLabel]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_newToolBar, Ext.Toolbar);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.DocumentUploadWindow = function(id, outsourcing, store) {

    this._id = id;
    this._outsourcing = outsourcing;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
            projectId: window._outsourcing.get('id'),
                documentName: window._comboBoxDocumentName.getValue()
            }

            window.formPanel = window._formPanelDocument;
            window.store = window._store;

            Srims.documents.submitResource(window, saveParams, Srims.service.common.OutsourcingService + '/Import', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._project.get('name') + '的文档')
        }
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传企业法人证书',
        width: 360,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 100,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [ this._fileUploadField]
    });
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        return result;
    }
    Srims.common.DocumentUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传企业法人证书',
        fileUpload: true,
        width: 510,
        labelWidth: 100,
        height: 120,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.common.DocumentUploadWindow, Ext.Window, {})

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.DocumentUploadWindow2 = function(id, outsourcing, store) {

    this._id = id;
    this._outsourcing = outsourcing;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
            projectId: window._outsourcing.get('id'),
                documentName: window._comboBoxDocumentName.getValue()
            }

            window.formPanel = window._formPanelDocument;
            window.store = window._store;

            Srims.documents.submitResource(window, saveParams, Srims.service.common.OutsourcingService + '/Import', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._project.get('name') + '的文档')
        }
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传机构代码证',
        width: 360,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 100,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fileUploadField]
    });
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        return result;
    }
    Srims.common.DocumentUploadWindow2.superclass.constructor.call(this, {
        id: this._id,
        title: '上传组织机构代码证',
        fileUpload: true,
        width: 510,
        labelWidth: 100,
        height: 120,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.common.DocumentUploadWindow2, Ext.Window, {})

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.DocumentUploadWindow3 = function(id, outsourcing, store) {

    this._id = id;
    this._outsourcing = outsourcing;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
            projectId: window._outsourcing.get('id')
            }

            window.formPanel = window._formPanelDocument;
            window.store = window._store;

            Srims.documents.submitResource(window, saveParams, Srims.service.common.OutsourcingService + '/Import', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._outsourcing.get('name') + '的文档')
        }
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传税务登记证',
        width: 360,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 100,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fileUploadField]
    });
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        return result;
    }
    Srims.common.DocumentUploadWindow3.superclass.constructor.call(this, {
        id: this._id,
        title: '上传税务登记证',
        fileUpload: true,
        width: 510,
        labelWidth: 100,
        height: 120,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.common.DocumentUploadWindow3, Ext.Window, {})

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentUploadWindow = function(id, project, store){

    this._id = id;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid(false)) 
                return false;
            
            var saveParams = {
                projectId: window._project.get('id'),
                documentName: window._comboBoxDocumentName.getValue()
            }
            
            window.formPanel = window._formPanelDocument;
            window.store = window._store;
            
            Srims.documents.submitResource(window, saveParams, Srims.service.documents.DocumentService + '/UpLoad', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._project.get('name') + '的文档')
        }
    });
    this._comboBoxDocumentName = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文档名称',
        noticeTextType: 'DocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传文档',
        width: 160,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        
        return result;
    }
    Srims.documents.DocumentUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目文档',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.documents.DocumentUploadWindow, Ext.Window, {})

if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.FileUploadWindow = function(id, store, importUrl, description, isMagazienInformation, outsourcing) {

    this._id = id;
    this._store = store;
    this._outsourcing = outsourcing;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '导 入',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            window.formPanel = window._formPanelData;
            window.store = window._store;
            window.outsourcing = window._outsourcing;

            var params = {};
            if (isMagazienInformation)
                params.year = window._numberFieldYear.getValue();

            window.formPanel.getForm().submit({
                params: params,
                url: importUrl,
                //                waitMsg: '正在导入数据，请耐心等候....',
                success: function(form, action) {
                    //                    //                success: function(response) {
                    //                    if (window.store)
                    //                        window.store.load();
                    var nam = action.result.data[0].name;
                    if (description == '企业法人证书') {
  
                        window.outsourcing.set('companyCard', nam);
                    }
                    if (description == '组织机构代码证')
                        window.outsourcing.set('groupCard', action.result.data[0].name);
                    if (description == '税务登记证')
                        window.outsourcing.set('taxCard', action.result.data[0].name);
                    Ext.Msg.show({
                        title: '成功导入数据',
                        msg: '导入数据成功',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });

                    window.close();
                }
            });
        }
    });
    this._fieldDesprition = new Ext.form.Field({
        fieldLabel: '说明',
        value: description,
        readOnly: true,
        width: 180
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 180,
        allowBlank: false
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'ImportData',
        fieldLabel: '选择数据文件',
        width: 180,
        emptyText: '请选择要导入的数据文件',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc', 'docx'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });

    var items = [];
    if (isMagazienInformation)
        items = [this._fieldDesprition, this._numberFieldYear, this._fileUploadField];
    else
        items = [this._fieldDesprition, this._fileUploadField];

    this._formPanelData = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        autoHeight: true,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: items
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        if (isMagazienInformation)
            result = this._numberFieldYear.isValid(preventMark) && result;

        return result;
    }

    Srims.component.FileUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: description,
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelData],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.component.FileUploadWindow, Ext.Window, {});

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.FileUploadField = function(params){
    Srims.component.FileUploadField.superclass.constructor.call(this, params);
}
Ext.extend(Srims.component.FileUploadField, Ext.form.FileUploadField, {
    validator: function(){
        var x = this.getValue();
        if (!x) 
            return;
        if (this.fileTypes.length == 0) 
            return true;
        
        var patn = '/'
        var docType = '';
        for (var i = 0; i < this.fileTypes.length; i++) {
            patn += '\.' + this.fileTypes[i] + '$|';
            docType += this.fileTypes[i] + '，';
        }
        patn = patn.substring(0, patn.length - 1);
        patn += '/i';
        patn = eval(patn);
        
        docType = docType.substring(0, docType.length - 1);
        if (!patn.test(x)) {
            this.invalidText = '只能上传' + docType + '文档。';
            return false;
        }
        return true;
    }
});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.submitResource = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){
    var user = Srims.currentLoginLog.user;
    
    window.formPanel.getForm().submit({
        params: saveParams,
        url: Srims.service.ResourceService + '/IsSizeable',
        failure: function(){
            if (user.userRoleType == 'Administrator' && user.isSuper) {
                Ext.MessageBox.confirm('上传文件大于100M', '上传文件大于20M，你确定要上传文件吗？', function(buttonId){
                    if (buttonId == 'yes') 
                        Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
                }, this);
            }
            else 
                Ext.Msg.show({
                    title: '不能上传文件',
                    msg: '每个文件不能大于100M，请联系超级管理员上传大于20M的文件。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
        },
        success: function(form, action){
            Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
        }
        
    });
}
Srims.documents.submitResources = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){

    window.formPanel.getForm().submit({
        params: saveParams,
        url: requestUrl,
        waitMsg: waitMsg,
        method: 'post',
        success: function(form, action){
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            if (window.store) 
                window.store.load();
            
            window.close();
        }
    });
    
}
Srims.documents.deleteResource = function(documentGuid, id, url, store, msg, msgInfo){
    var _params = {
        guid: documentGuid,
        id: id
    }
    Ext.Ajax.request({
        url: url,
        params: _params,
        success: function(){
            store.load();
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    });
}

Srims.documents.downLoadResource = function(guid, subUrl){
    var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1
    
    document.location.href = '/Service/Resource.asmx' + subUrl + '?guid=' + guid + '&isIE=' + isIE;
}


/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingXmlReader = Ext.extend(Srims.data.XmlReader, {
			constructor : function() {
				Srims.common.OutsourcingXmlReader.superclass.constructor.call(
						this, Srims.common.Outsourcing);
			}
		});/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingStore = Ext.extend(Srims.data.XmlStore, {
			constructor : function(load_url, params) {
				Srims.common.OutsourcingStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingXmlReader(), load_url,
						params);
			}
		});/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace(Srims.common);
Srims.common.OutsourcingShowPanel_ToolBar = function(outsourcing, panelID, store) {
    this._outsourcing = outsourcing;
    this._panelID = panelID;
    this._store = store;

    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        outsourcing: this._outsourcing,
        store: this._store,
        handler: function() {
            if (!this.outsourcing)
                return;
            Srims.common.EditOutsourcing(this.outsourcing, this.store, false);
        },
        hidden: true,
        tooltip: '<b>编辑外协单位</b><br/>编辑外协单位的名称、地址、电话、负责人、负责人邮箱等详细信息'
    });
    this._buttonVerfiy = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '审核',
        minWidth: 60,
        outsourcing: this._outsourcing,
        store: this._store,
        handler: function() {
            if (!this.outsourcing)
                return;
            Srims.common.VerfiyOutsourcing(this.outsourcing, this.store);
        },
        hidden: true,
        tooltip: '<b>审核外协单位</b><br/>审核外协单位的名称、地址、电话、负责人、负责人邮箱等详细信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        outsourcing: this._outsourcing,
        store: this._store,
        handler: function() {
            if (!this.outsourcing)
                return;
            Srims.common.DeleteOutsourcing(this.outsourcing, this.store);
        },
        hidden: true,
        tooltip: '<b>删除该外协单位</b><br/>删除该外协单位所有信息'
    });
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
    iconCls: 'icon-Document-model-manage',
    text: '下载企业法人证书',
    outsourcing: this._outsourcing,
    minWidth: 60,
    disabled: !outsourcing.get('companyCard'),
        panel: this._panel,
        handler: function() {
                var id = outsourcing.get('id');
                Srims.documents.downLoadResource(id, '/GetOutSoucingFile1');
                return;
        },
        hidden: false,
        tooltip: '<b>下载外协单位文档：企业法人证书</b>'
    });
    this._buttonupOrganizationCodeLoadDocument = new Ext.Toolbar.Button({
    iconCls: 'icon-Document-model-manage',
    text: '下载组织机构代码证',
    outsourcing: this._outsourcing,
    minWidth: 60,
    disabled: !outsourcing.get('groupCard'),
        panel: this._panel,
        handler: function() {
            var id = outsourcing.get('id');
        Srims.documents.downLoadResource(id, '/GetOutSoucingFile2');
        },
        hidden: false,
        tooltip: '<b>下载外协单位文档：组织机构代码证</b>'
    });
    this._buttonupTaxLoadDocument = new Ext.Toolbar.Button({
    iconCls: 'icon-Document-model-manage',
    text: '下载税务登记证',
    outsourcing: this._outsourcing,
    minWidth: 60,
    disabled: !outsourcing.get('taxCard'),
        panel: this._panel,
        handler: function() {
            var id = outsourcing.get('id');
        Srims.documents.downLoadResource(id, '/GetOutSoucingFile3');
        },
        hidden: false,
        tooltip: '<b>下载外协单位文档：税务登记证</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        outsourcing: this._outsourcing,
        panelID: this._panelID,
        handler: function() {
            var params = {};
            params.id = this.outsourcing.get('id');
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService
								+ '/GetById',
                params: params,
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.common
												.OutsourcingXmlReader()
                    });
                    var currentOutsourcing = store.getAt(0);
                    var panel = Ext.getCmp(this.panelID)
                    panel.resetComponentValue(currentOutsourcing);
                    panel._toolBar
									._resetButtonVisibleAndDisabled(currentOutsourcing);
                    panel._toolBar._resetButtonOutsourcing(currentOutsourcing);
                }
            });
        },
        tooltip: '<b>刷新外协单位信息</b><br/>刷新外协单位全部信息'
    });
    var buttonItems = [this._buttonEdit, this._buttonVerfiy, this._buttonDelete,this._buttonSubmitMainContract,this._buttonupOrganizationCodeLoadDocument,this._buttonupTaxLoadDocument, new Ext.Toolbar.Fill(),
			this._buttonRefresh];
    Srims.common.OutsourcingShowPanel_ToolBar.superclass.constructor.call(this,
			{
			    items: buttonItems,
			    height: 25
			});
    // 重设button属性
    this._resetButtonVisibleAndDisabled = function(outsourcing) {
        var ture = outsourcing.get('hasPermission_Vefiy');
        this._buttonVerfiy.setVisible(outsourcing.get('hasPermission_Vefiy'));
        this._buttonVerfiy.setDisabled(!outsourcing.get('hasPermission_Vefiy'));
        this._buttonEdit.setVisible(outsourcing.get('hasPermission_Edit'));
        this._buttonEdit.setDisabled(!outsourcing.get('canEdit'));

        this._buttonDelete.setVisible(outsourcing.get('hasPermission_Delete'));
        this._buttonDelete.setDisabled(!outsourcing.get('canDelete'));
    }
    this._resetButtonOutsourcing = function(outsourcing) {
        this._buttonEdit.outsourcing = outsourcing;
        this._buttonDelete.outsourcing = outsourcing;
        this._buttonVerfiy.outsourcing = outsourcing;
        this._buttonRefresh.outsourcing = outsourcing;
    }
    this._resetButtonVisibleAndDisabled(this._outsourcing);
}
Ext.extend(Srims.common.OutsourcingShowPanel_ToolBar, Ext.Toolbar);/**
* @author dulintao
*/
Srims.common.OutsourcingShowPanel_Basic = function(outsourcing) {
this._outsourcing = outsourcing;
this._user = Srims.currentLoginLog.user;
this._userIsExpert = this._user.userRoleType == 'Expert';
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        value: outsourcing.get('name'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
    fieldLabel: '法人代表',
        value: outsourcing.get('legalRepresentativeName'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldRegisteredCapital = new Ext.form.TextField({
    fieldLabel: '注册资本(万元)',
        value: outsourcing.get('registeredCapital'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        value: outsourcing.get('registeredCardNumber'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        value: outsourcing.get('organizationCode'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        value: outsourcing.get('taxNumber'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldCompanyType = new Ext.form.TextField({
        fieldLabel: '公司类型',
        value: outsourcing.get('companyType'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldManagementType = new Ext.form.TextField({
        fieldLabel: '管理类别',
        value: outsourcing.get('managementType'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });

    this._textFieldCreateDateTime = new Ext.form.DateField({
        fieldLabel: '成立时间',
        value: outsourcing.get('createDateTime'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200,
        readOnly: true
    });

    this._textFieldDealDateTimeStart = new Ext.form.DateField({
    fieldLabel: '营业期限',
        value: outsourcing.get('dealDateTimeStart'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldDealDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        value: outsourcing.get('dealDateTimeEnd'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200
    });
    this._textFieldBusinessScope = new Ext.form.TextArea({
        fieldLabel: '经营范围',
        value: outsourcing.get('businessScope'),
        allowBlank: true,
        width: 600,
        height: 100,
        readOnly: true
    });
    this._textFieldRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        value: outsourcing.get('remark'),
        allowBlank: true,
        width: 600,
        height: 100,
        readOnly: true
    });
    this._textFieldIsVerify = new Ext.form.TextField({
        fieldLabel: '审核状态',
        value: outsourcing.get('isVerify'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldAddress = new Ext.form.TextField({
        fieldLabel: '单位所在地',
        value: outsourcing.get('address'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    if (this._userIsExpert) {
        var items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldIsVerify];
        var items2 = [this._textFieldOrganizationCode, this._textFieldCompanyType, this._textFieldTaxNumber, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd, this._textFieldAddress];
    }
    else {
        var items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldTaxNumber, this._textFieldAddress];
        var items2 = [this._textFieldOrganizationCode, this._textFieldCompanyType, this._textFieldManagementType, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd, this._textFieldIsVerify];
    }
    Srims.common.OutsourcingShowPanel_Basic.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 130,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            labelWidth: 130,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:400px',
                items: items1
            }), new Ext.Panel({
                width: 400,
                style: 'width:400px',
                layout: 'form',
                items: items2
            })]
        }), this._textFieldBusinessScope, this._textFieldRemark]
    });
    this.resetComponentValue = function(outsourcing) {
        this._outsourcing.set('name', this._textFieldName.getValue());
        this._outsourcing.set('legalRepresentativeName', this._textFieldLegalRepresentativeName.getValue());
        this._outsourcing.set('registeredCapital', this._textFieldRegisteredCapital.getValue());
        this._outsourcing.set('registeredCardNumber', this._textFieldRegisteredCardNumber.getValue());
        this._outsourcing.set('organizationCode', this._textFieldOrganizationCode.getValue());
        this._outsourcing.set('taxNumber', this._textFieldTaxNumber.getValue());
        this._outsourcing.set('companyType', this._textFieldCompanyType.getValue());
        this._outsourcing.set('managementType', this._textFieldManagementType.getValue());
        if (this._textFieldCreateDateTime.getValue() == null || this._textFieldCreateDateTime.getValue() == "" || this._textFieldCreateDateTime.getValue() == undefined)
        this._outsourcing.set('createDateTime', null);
        else
        this._outsourcing.set('createDateTime', this._textFieldCreateDateTime.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeStart.getValue() == null || this._textFieldDealDateTimeStart.getValue() == "" || this._textFieldDealDateTimeStart.getValue() == undefined)
        this._outsourcing.set('dealDateTimeStart', null);
        else
        this._outsourcing.set('dealDateTimeStart', this._textFieldDealDateTimeStart.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeEnd.getValue() == null || this._textFieldDealDateTimeEnd.getValue() == "" || this._textFieldDealDateTimeEnd.getValue() == undefined)
        this._outsourcing.set('dealDateTimeEnd', null);
        else
        this._outsourcing.set('dealDateTimeEnd', this._textFieldDealDateTimeEnd.getValue().format('Y/m/d'));
        this._outsourcing.set('businessScope', this._textFieldBusinessScope.getValue());
        this._outsourcing.set('remark', this._textFieldRemark.getValue());
        this._outsourcing.set('isVerify', this._textFieldIsVerify.getValue());

        this._outsourcing.set('corporationPlace', this._textFieldAddress.getValue());
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_Basic, Ext.form.FormPanel, {});
/**
* @author dulintao
*/
Srims.common.OutsourcingShowPanel = function(outsourcingStore, panelID,
		outsourcing, queryParams) {
    this._outsourcing = outsourcing;
    this._id = panelID;
    this._outsourcingStore = outsourcingStore;
    // control
    this._basicForm = new Srims.common.OutsourcingShowPanel_Basic(this._outsourcing); // 位于文件OutsourcingShowPanel_Basic.js中
    this._OutsourcingAllocationInfoForm = new Srims.common.OutsourcingShowPanel_AllocationInfo(this._outsourcing, this._id, queryParams);
    this._toolBar = new Srims.common.OutsourcingShowPanel_ToolBar(
			this._outsourcing, this._id, this._outsourcingStore); // 位于文件OutsourcingShowPanel_Toolbar.js中

    Srims.common.OutsourcingShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px;width:1200px',
        closable: true,
        frame: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._outsourcing.get('name'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: [this._basicForm, this._OutsourcingAllocationInfoForm]
    });
    //重置所有控件值
    this.resetComponentValue = function(outsourcing) {
        this._basicForm.resetComponentValue(outsourcing);
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel, Ext.Panel, {});