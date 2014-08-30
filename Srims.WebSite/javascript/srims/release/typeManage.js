
if (!Srims.type) 
    Ext.namespace('Srims.type');

Ext.namespace('Srims.type.ProjectFrom');

Srims.type.ProjectFrom.NineSevenThreePlan = 'NineSevenThreePlan';
Srims.type.ProjectFrom.CountryScienceAndTechnologyPlan = 'CountryScienceAndTechnologyPlan';
Srims.type.ProjectFrom.Country863Plan = 'Country863Plan';
Srims.type.ProjectFrom.CounrtyNatualScienceFund = 'CounrtyNatualScienceFund';
Srims.type.ProjectFrom.DepartMentInChargeScienceAndTechnology = 'DepartMentInChargeScienceAndTechnology';
Srims.type.ProjectFrom.CountryDepartOfPlanAndScienceAndTechnology = 'CountryDepartOfPlanAndScienceAndTechnology';
Srims.type.ProjectFrom.CounntryEconomyScienceAndTechnology = 'CounntryEconomyScienceAndTechnology';
Srims.type.ProjectFrom.StateDepartMentScienceAndTechnology = 'StateDepartMentScienceAndTechnology';
Srims.type.ProjectFrom.ProvinceScienceAndTechnology = 'ProvinceScienceAndTechnology';
Srims.type.ProjectFrom.CorporationAndCareerDepartmentDelegate = 'CorporationAndCareerDepartmentDelegate';
Srims.type.ProjectFrom.InternationalCorporation = 'InternationalCorporation';
Srims.type.ProjectFrom.PersonizeProject = 'PersonizeProject';
Srims.type.ProjectFrom.other = 'other';
Srims.type.ProjectFrom.NationalSocialScienceFundProjectSeparateDisciplines = 'NationalSocialScienceFundProjectSeparateDisciplines';
Srims.type.ProjectFrom.NationalSocialScienceFundProject = 'NationalSocialScienceFundProject';
Srims.type.ProjectFrom.OtherCentralSocialSpecialProjects = 'OtherCentralSocialSpecialProjects';
Srims.type.ProjectFrom.AncientBooksoftheNationalUniversitiesCommission = 'AncientBooksoftheNationalUniversitiesCommission';
Srims.type.ProjectFrom.MinistryOfEducationHumanitiesAndSocialScienceResearchProject = 'MinistryOfEducationHumanitiesAndSocialScienceResearchProject';
Srims.type.ProjectFrom.NationalPlanningOfficeOfEducation = 'NationalPlanningOfficeOfEducation';
Srims.type.ProjectFrom.ProvinceSocialScienceFundProject = 'ProvinceSocialScienceFundProject';
Srims.type.ProjectFrom.OtherGovernmentProjects = 'OtherGovernmentProjects';
Srims.type.ProjectFrom.EducationDepartmentOfProvince = 'EducationDepartmentOfProvince';
Srims.type.ProjectFrom.SchoolSocialScienceFundProject = 'SchoolSocialScienceFundProject';

Srims.type.projectFromRender = function(value, metadata){
    switch (value) {
        case 'NineSevenThreePlan':
            return '973计划';
        case 'CountryScienceAndTechnologyPlan':
            return '国家科技攻关计划';
        case 'Country863Plan':
            return '863';
        case 'CounrtyNatualScienceFund':
            return '国家自然科学基金';
        case 'DepartMentInChargeScienceAndTechnology':
            return '主管部门科技项目';
        case 'CountryDepartOfPlanAndScienceAndTechnology':
            return '国家计委和科技部其他项目';
        case 'CounntryEconomyScienceAndTechnology':
            return '国家经贸委科技项目';
        case 'StateDepartMentScienceAndTechnology':
            return '国务院其他部门科技项目';
        case 'ProvinceScienceAndTechnology':
            return '省市自治区科技计划项目';
        case 'CorporationAndCareerDepartmentDelegate':
            return '企事业单位委托项目';
        case 'InternationalCorporation':
            return '国际合作项目';
        case 'PersonizeProject':
            return '自选课题';
        case 'other':
            return '其他科技项目';
        case 'NationalSocialScienceFundProjectSeparateDisciplines':
            return '国家社科基金单列学科项目';
        case 'NationalSocialScienceFundProject':
            return '国家社科基金项目';
        case 'OtherCentralSocialSpecialProjects':
            return '中央其他部门社科专门项目';
        case 'AncientBooksoftheNationalUniversitiesCommission':
            return '全国高校古籍整理研究工作委员会';
        case 'MinistryOfEducationHumanitiesAndSocialScienceResearchProject':
            return '教育部人文社科研究项目';
        case 'NationalPlanningOfficeOfEducation':
            return '全国教育科学规划办公室';
        case 'ProvinceSocialScienceFundProject':
            return '省市自治区社科基金项目';
        case 'OtherGovernmentProjects':
            return '地市厅局等政府部门项目';
        case 'EducationDepartmentOfProvince':
            return '省教育厅社科项目';
        case 'SchoolSocialScienceFundProject':
            return '学校社科项目';
        default:
            return '未知';
    }
}
Srims.type.projectFormStore = [['NineSevenThreePlan', '973计划'], ['CountryScienceAndTechnologyPlan', '国家科技攻关计划'], ['Country863Plan', '863'], ['CounrtyNatualScienceFund', '国家自然科学基金'], ['DepartMentInChargeScienceAndTechnology', '主管部门科技项目'], ['CountryDepartOfPlanAndScienceAndTechnology', '国家计委和科技部其他项目'], ['CounntryEconomyScienceAndTechnology', '国家经贸委科技项目'], ['StateDepartMentScienceAndTechnology', '国务院其他部门科技项目'], ['ProvinceScienceAndTechnology', '省市自治区科技计划项目'], ['CorporationAndCareerDepartmentDelegate', '企事业单位委托项目'], ['InternationalCorporation', '国际合作项目'], ['PersonizeProject', '自选课题'], ['other', '其他科技项目'], 
['NationalSocialScienceFundProjectSeparateDisciplines', '国家社科基金单列学科项目'],
 ['NationalSocialScienceFundProject', '国家社科基金项目'], 
 ['OtherCentralSocialSpecialProjects', '中央其他部门社科专门项目'], 
 ['AncientBooksoftheNationalUniversitiesCommission', '全国高校古籍整理研究工作委员会'], 
 ['MinistryOfEducationHumanitiesAndSocialScienceResearchProject', '教育部人文社科研究项目'], 
 ['NationalPlanningOfficeOfEducation', '全国教育科学规划办公室'],
  ['ProvinceSocialScienceFundProject', '省市自治区社科基金项目'], 
 ['OtherGovernmentProjects', '地市厅局等政府部门项目'],
  ['EducationDepartmentOfProvince', '省教育厅社科项目'],
   ['SchoolSocialScienceFundProject', '学校社科项目'], 
	  [['Unknown'], ['未知']]];

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
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentModelEditWindow = function(id, projectRankStore){

    this._id = id;
    
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
    
    this._projectTypeSelectForm = new Srims.documents.DocumentModelEditWindow_projectTypeSelectForm(projectRankStore);
    this._DocumentTypeSelectForm = new Srims.documents.DocumentModelEditWindow_documentTypeSelectForm();
    
    Srims.documents.DocumentModelEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目类型文档模板',
        fileUpload: true,
        width: 837,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 320,
            layout: 'form',
            autoScroll: true,
            autoHeight: true,
            items: [this._projectTypeSelectForm]
        }), new Ext.Panel({
            layout: 'form',
            autoScroll: true,
            items: [this._DocumentTypeSelectForm]
        })],
        buttons: [this._buttonUpload, this._buttonClose]
    });
    
    this._buttonUpload.window = this;
    this._buttonUpload_Click = function(){
        var projectTypesID = this.window._projectTypeSelectForm.getProjectTypeId();
        if (projectTypesID.length == 0) {
            Ext.Msg.show({
                title: '上传文档错误',
                msg: '请选择项目类型',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        var documentTypes = this.window._DocumentTypeSelectForm.getDoucumentType();
        if (documentTypes.length == 0) {
            Ext.Msg.show({
                title: '上传文档错误',
                msg: '至少需要输入一个文档类型模板',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        var saveParams = {
            projectTypesID: projectTypesID,
            documentTypes: documentTypes
        }
        this.window.formPanel = this.window._DocumentTypeSelectForm;
        Srims.documents.submitResource(this.window, saveParams, Srims.service.documents.DocumentModelService + '/UpLoadDocumentModels', '正在上传项目类型模板', '上传文项目类型模板成功', '成功上传项目类型模板')
    }
    
    this._buttonUpload.on('click', this._buttonUpload_Click);
}
Ext.extend(Srims.documents.DocumentModelEditWindow, Ext.Window)

if (!Srims.documents) 
    Ext.namespace("Srims.documents");

Srims.documents.DocumentModelEditWindow_projectTypeSelectForm = function(projectRankStore){

    var load_url = Srims.service.type.ProjectTypeService + '/GetByRankId';
    this._store = new Srims.type.ProjectTypeStore(load_url);
    
    this._getProjectRankButtons = function(){
        var buttons = [];
        for (var i = 0; i < projectRankStore.getCount(); i++) {
            var projectRank = projectRankStore.getAt(i);
            var button = new Ext.Toolbar.Button({
                text: projectRank.get('name'),
                minWidth: 30,
                projectRank: projectRank,
                store: this._store,
                handler: function(){
                    this.store.load({
                        params: {
                            projectRankId: this.projectRank.get('id')
                        }
                    });
                },
                tooltip: '<b>更新项目类型</b><br/>更新项目类型'
            });
            buttons[buttons.length] = button;
        }
        return buttons;
    };
    this._toolbar = new Ext.Toolbar({
        items: this._getProjectRankButtons()
    });
    
    this._selection = new Ext.grid.CheckboxSelectionModel();
    this._columnModel = new Ext.grid.ColumnModel([this._selection, {
        header: "类别名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false
    }]);
    
    var params = {};
    params.sm = this._selection;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.height = 500;
    params.width = 300;
    params.defaultBBar = false;
    this._gridPanelProjectType = new Srims.component.GridPanel(params);
    
    Srims.documents.DocumentModelEditWindow_projectTypeSelectForm.superclass.constructor.call(this, {
        title: '选择项目类型',
        autoWidth: true,
        autoHeight: true,
        layout: 'form',
        frame: true,
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectType]
    });
    
    this.getProjectTypeId = function(){
        var records = this._selection.getSelections();
        var projectTypesID = '';
        for (var i = 0; i < records.length; i++) 
            projectTypesID += records[i].get('id') + ',';
        
        return projectTypesID;
    }
    this._store.load({
        params: {
            projectRankId: projectRankStore.getAt(0).get('id')
        }
    });
}
Ext.extend(Srims.documents.DocumentModelEditWindow_projectTypeSelectForm, Ext.form.FormPanel, {});



if (!Srims.documents) 
    Ext.namespace("Srims.documents");

Srims.documents.DocumentModelEditWindow_documentTypeSelectForm = function(projectRankStore){

    this._panelMainContract = new Srims.documents.DocumentModelEditWindow_documentTypeModelPanel('主合同');
    this._panelOutContract = new Srims.documents.DocumentModelEditWindow_documentTypeModelPanel('外协合同');
    
    this._documentTypeStore = new Srims.common.NoticeTextStore(Srims.service.common.NoticeTextService + '/Get', 'DocumentName');
    
    this._documentTypeStore.form = this;
    this._documentTypeStore.on('load', function(){
        for (var i = 0; i < this.getCount(); i++) 
            this.form.items.add(this.form.items.length, new Srims.documents.DocumentModelEditWindow_documentTypeModelPanel(this.getAt(i).get('value')));
        
        this.form.doLayout();
    })
    
    var items = [this._panelMainContract, this._panelOutContract]
    
    Srims.documents.DocumentModelEditWindow_documentTypeSelectForm.superclass.constructor.call(this, {
        fileUpload: true,
        bodyStyle: 'padding:0 0 0 10px',
        title: '上传合同及文档模板',
        width: 500,
        height: 537,
        layout: 'form',
        frame: true,
        items: items
    });
    
    this.getDoucumentType = function(){
        var documentTypes = '';
        var items = this.items.getRange();
        for (var i = 0; i < items.length; i++) {
            var itemId = items[i].getId();
            var upLoadField = Ext.getCmp(itemId.substr(1, itemId.length - 1));
            
            if (upLoadField.getValue() != '') 
                documentTypes += upLoadField.getId() + ',';
        }
        
        return documentTypes;
    }
    this._documentTypeStore.load();
}
Ext.extend(Srims.documents.DocumentModelEditWindow_documentTypeSelectForm, Ext.FormPanel, {});



if (!Srims.documents) 
    Ext.namespace("Srims.documents");

Srims.documents.DocumentModelEditWindow_documentTypeModelPanel = function(documentName){
    this._fieldDocumentName = new Ext.form.Field({
        //id: documentName,
        fieldLabel: '文档名称',
        value: documentName,
        readOnly: true,
        width: 130
    });
    this._fileUploadFieldDocument = new Srims.component.FileUploadField({
        id: documentName,
        fieldLabel: '上传模板',
        width: 160,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    Srims.documents.DocumentModelEditWindow_documentTypeModelPanel.superclass.constructor.call(this, {
        id: '_' + documentName,
        bodyStyle: 'padding:5px 0 5px 0',
        layout: 'column',
        items: [new Ext.Panel({
            labelWidth: 60,
            width: 220,
            layout: 'form',
            items: [this._fieldDocumentName]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: [this._fileUploadFieldDocument]
        })]
    })
}
Ext.extend(Srims.documents.DocumentModelEditWindow_documentTypeModelPanel, Ext.Panel, {});



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

Srims.type.ProjectRankStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.type.ProjectRankStore.superclass.constructor.call(this, new Srims.type.ProjectRankXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectRankXmlReader.superclass.constructor.call(this, Srims.type.ProjectRank);
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

Srims.type.ProjectSupportCategoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportCategoryService + '/Query';
        Srims.type.ProjectSupportCategoryStore.superclass.constructor.call(this, new Srims.type.ProjectSupportCategoryXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportCategoryXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportCategory);
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

Srims.type.ProjectSupportFieldStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportFieldService + '/Query';
        Srims.type.ProjectSupportFieldStore.superclass.constructor.call(this, new Srims.type.ProjectSupportFieldXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportFieldXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportField);
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

Srims.type.ProjectSupportSubFieldStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportSubFieldService + '/Query';
        Srims.type.ProjectSupportSubFieldStore.superclass.constructor.call(this, new Srims.type.ProjectSupportSubFieldXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportSubFieldXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportSubField);
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

Srims.type.ProjectTypeGridPanel_ColumnModel = function(){
    Srims.type.ProjectTypeGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "类别名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false
    }, {
        header: "项目等级",
        dataIndex: 'projectRank',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "类别简称",
        dataIndex: 'shortName',
        sortable: true,
        hidden: true
    }, {
        header: "名称拼写",
        dataIndex: 'nameSpell',
        sortable: true,
        hidden: true
    }, {
//        header: "校内管理费率",
//        dataIndex: 'overheadExpenseInRate',
//        sortable: true,
//        renderer: ExpenseRate.render,
//        width: 30,
//        hidden: false
//    }, {
//        header: "外协管理费率",
//        dataIndex: 'overheadExpenseOutRate',
//        sortable: true,
//        hidden: false,
//        renderer: ExpenseRate.render,
//        width: 30
//    }, {
        header: "专管部门",
        dataIndex: 'administration',
        width: 30,
        sortable: true,
        hidden: false
    }, {
        header: "分类代码",
        dataIndex: 'code',
        width: 30,
        sortable: true,
        hidden: false
    }, {
        header: "备用代码",
        dataIndex: 'bakCode',
        width: 30,
        sortable: true,
        hidden: true
    }, {
        header: "原来代码",
        dataIndex: 'perCode',
        width: 30,
        sortable: true,
        hidden: true
    }, {
        header: "预算制",
        dataIndex: 'isBudget',
        width: 20,
        sortable: true,
        hidden: false,
        renderer: Boolean.render
    }, {
        header: "开发类项目",
        dataIndex: 'isExploit',
        width: 20,
        sortable: true,
        hidden: false,
        renderer: Boolean.render
    }, {
        header: "横向项目",
        dataIndex: 'isHorizontalType',
        width: 20,
        sortable: true,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "项目来源",
        dataIndex: 'projectComingFrom',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: Srims.type.projectFromRender
    }, {
        header: "学科分类",
        dataIndex: 'subjectNature',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: Srims.type.projectSubjectNatureRender
    },{
    	header: "管理费收取类别",
    	dataIndex: 'managementFeesType',
    	width: 40,
    	sortable: true,
    	hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.type.ProjectTypeGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeGridPanel_GridFilters = function(){
    Srims.type.ProjectTypeGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'list',
            labelField: 'value',
            dataIndex: 'projectRank',
            store: new Srims.data.IDValueRecordStore(Srims.service.type.ProjectRankService + '/GetAllRanksForFilter'),
            phpMode: true
        }]
    });
}
Ext.extend(Srims.type.ProjectTypeGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeGridPanel_ToolBar = function(selection, store, panelId, queryParams){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._queryParams = queryParams;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.type.showProjectTypeQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>项目类别查询</b><br/>对项目类别进行查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.type.showImportWindow(this.store);
        },
        tooltip: '<b>项目资助领域导入</b><br/>将项目资助领域从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.type.newProjectType(this.store);
        },
        tooltip: '<b>添加项目分类</b><br/>输入项目分类信息以添加类别'
    });
    this._buttonEditDocumentModel = new Ext.Toolbar.Button({
        iconCls: 'icon-upload-project-type-document-model',
        text: '上传类型文档模板',
        minWidth: 60,
        handler: function(){
            Srims.type.showProjectTypeDocumentModelEditWindow();
        },
        tooltip: '<b>添加项目分类</b><br/>输入项目分类信息以添加类别'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.type.showProjectType(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查项目分类</b><br/>显示所选类别的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.editProjectType(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑项目分类</b><br/>编辑选中项目类别的信息'
    });
    this._buttonProjectSupportFieldManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-category',
        text: '项目资助领域管理',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.type.showProjectSupportFieldManageWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>项目资助领域管理</b><br/>项目资助领域管理'
    });
    this._buttonProjectSupportCategoryManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-field',
        text: '项目资助类别管理',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.showProjectSupportCategoryManageWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>项目资助类别管理</b><br/>项目资助类别管理'
    });
    this._buttonDocumentModelManage = new Ext.Toolbar.Button({
        iconCls: 'icon-Document-model-manage',
        text: '文档模板管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.type.showDocumentModelManageWindow(this.selection.getSelected().get('id'), this.selection.getSelected().get('name'), false);
        },
        hidden: true,
        tooltip: '<b>查项目类型文档模板</b><br/>显示所选类别的文档模板'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteProjectType(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除项目分类</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目分类列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    
    Srims.type.ProjectTypeGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonNew, this._buttonEditDocumentModel, this._buttonDocumentModelManage, this._buttonShow, this._buttonEdit, this._buttonDelete, this._buttonProjectSupportFieldManage, this._buttonProjectSupportCategoryManage, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDocumentModelManage = this._buttonDocumentModelManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonProjectSupportFieldManage = this._buttonProjectSupportFieldManage;
    this._selection.buttonProjectSupportCategoryManage = this._buttonProjectSupportCategoryManage;
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonProjectSupportFieldManage = selection.buttonProjectSupportFieldManage;
        var buttonProjectSupportCategoryManage = selection.buttonProjectSupportCategoryManage;
        var buttonDocumentModelManage = selection.buttonDocumentModelManage;
        
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonProjectSupportFieldManage.hide();
            buttonProjectSupportCategoryManage.hide();
            buttonDocumentModelManage.hide();
            return;
        }
        
        var projectType = selection.getSelected();
        
        buttonShow.setVisible(projectType.get('hasPermission_Show'));
        buttonShow.setDisabled(!projectType.get('canShow'));
        
        buttonEdit.setVisible(projectType.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!projectType.get('canEdit'));
        
        buttonDelete.setVisible(projectType.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!projectType.get('canDelete'));
        
        buttonProjectSupportFieldManage.setVisible(projectType.get('hasPermission_ManageProjectSupportField'));
        buttonProjectSupportFieldManage.setDisabled(!projectType.get('canManageProjectSupportField'));
        
        buttonProjectSupportCategoryManage.setVisible(projectType.get('hasPermission_ManageProjectSupportCategory'));
        buttonProjectSupportCategoryManage.setDisabled(!projectType.get('canManageProjectSupportCategory'));
        
        buttonDocumentModelManage.setVisible(projectType.get('hasPermission_UploadDocumentModel'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.type.ProjectTypeGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeGridPanel = function(id, store, title, iconCls, queryParams){

    //fields
    this._store = store;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.type.ProjectTypeGridPanel_ColumnModel();
    this._toolbar = new Srims.type.ProjectTypeGridPanel_ToolBar(this._selections, this._store, id, queryParams);
    this._filters = new Srims.type.ProjectTypeGridPanel_GridFilters();
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.plugins = this._filters;
    params.defaultBBar = true;
    
    //constructor
    Srims.type.ProjectTypeGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectType = grid.getStore().getAt(rowIndex);
        Srims.type.showProjectType(projectType, grid._store);
    }
}
Ext.extend(Srims.type.ProjectTypeGridPanel, Srims.component.GridPanel);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.type.ProjectTypeStore.superclass.constructor.call(this, new Srims.type.ProjectTypeXmlReader(), load_url, params);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectTypeXmlReader.superclass.constructor.call(this, Srims.type.ProjectType);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeQueryWindow_InforPanel = function(){

    this._checkboxGroupProjectRanks = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目等级',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.type.ProjectTypeQueryWindow_InforPanel.ProjectRankStore.checkboxGroupItems
    });
    Srims.type.ProjectTypeQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        widht: 500,
        labelWidth: 90,
        items: [this._checkboxGroupProjectRanks]
    });
    
    this.buildParams = function(params){
        params.projectRank = this._checkboxGroupProjectRanks.getSelecetedValue();
    }
    
    this.clearParams = function(){
        this._checkboxGroupProjectRanks.reset();
    }
}
Ext.extend(Srims.type.ProjectTypeQueryWindow_InforPanel, Ext.FormPanel);

Srims.type.ProjectTypeQueryWindow_InforPanel.ProjectRankStore = new Srims.data.IDValueRecordStore(Srims.service.type.ProjectRankService + '/GetAllRanksForFilter');
Srims.type.ProjectTypeQueryWindow_InforPanel.ProjectRankStore.load({
    callback: Srims.type.ProjectTypeQueryWindow_InforPanel.ProjectRankStore.buildCheckboxGroupItems
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeQueryWindow = function(id, store, queryParams){

    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.type.ProjectTypeQueryWindow_InforPanel();
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 60,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 60,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 60,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 60,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.type.ProjectTypeQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目类型查询',
        iconCls: 'icon-query',
        width: 500,
        height: 146,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 500,
            layout: 'form',
            labelWidth: 90,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        this._basicPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    
    this.query = function(button){
        var window = button.window;
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.type.ProjectTypeQueryWindow, Ext.Window);

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportCategoryGridPanel_ColumnModel = function(){
    Srims.type.ProjectSupportCategoryGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false
    }, {
        header: "项目类别",
        dataIndex: 'projectType',
        width: 50,
        sortable: false,
        hidden: false
    }, {
        header: "是否收取管理费",
        dataIndex: 'isGetOverheadExpense',
        width: 50,
        sortable: false,
        renderer: Boolean.render,
        hidden: false
    }])
}
Ext.extend(Srims.type.ProjectSupportCategoryGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportFieldGridPanel_ColumnModel = function(){
    Srims.type.ProjectSupportFieldGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false
    }, {
        header: "项目类别",
        dataIndex: 'projectType',
        width: 50,
        sortable: false,
        hidden: false
    }])
}
Ext.extend(Srims.type.ProjectSupportFieldGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeShowPanel_BasicForm = function(projectType){

    this._projectType = projectType;
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: this._projectType.get('name'),
        width: 390,
        readOnly: true
    });
    
    this._textFieldProjectRank = new Ext.form.TextField({
        fieldLabel: '项目等级',
        value: this._projectType.get('projectRank'),
        width: 160,
        readOnly: true
    });
    this._textFieldOverheadExpenseInRate = new Ext.form.TextField({
        fieldLabel: '校内管理费率',
        value: ExpenseRate.render(this._projectType.get('overheadExpenseInRate')),
        width: 160,
        readOnly: true
    });
    this._textFieldCode = new Ext.form.TextField({
        fieldLabel: '分类代码',
        value: this._projectType.get('code'),
        width: 160,
        readOnly: true
    });
    
    this._textFieldAdministration = new Ext.form.TextField({
        fieldLabel: '专管部门',
        value: this._projectType.get('administration'),
        width: 160,
        readOnly: true
    });
    this._textFieldOverheadExpenseOutRate = new Ext.form.TextField({
        fieldLabel: '外协管理费率',
        value: ExpenseRate.render(this._projectType.get('overheadExpenseOutRate')),
        width: 160,
        readOnly: true
    });
    this._textFieldIsBudget = new Ext.form.TextField({
        fieldLabel: '是否预算制',
        value: Boolean.render(this._projectType.get('isBudget')),
        width: 160,
        readOnly: true
    });
    this._textFieldIsExploit = new Ext.form.TextField({
        fieldLabel: '是否同年单账本号',
        value: Boolean.render(this._projectType.get('isExploit')),
        width: 160,
        readOnly: true
    });
    
    this._textFieldProjectComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源',
        value: Srims.type.projectFromRender(this._projectType.get('projectComingFrom')),
        width: 160,
        readOnly: true
    });
    this._textFieldProjectSubjectNature = new Ext.form.TextField({
        fieldLabel: '学科分类',
        value: Srims.type.projectSubjectNatureRender(this._projectType.get('subjectNature')),
        width: 160,
        readOnly: true
    });
    this._managementFeesType = new Ext.form.TextField({
        fieldLabel: '管理费收取类别',
        value: this._projectType.get('managementFeesType'),
        width: 160
    });
    
    var columnFirstItems = [this._textFieldProjectRank, this._textFieldOverheadExpenseInRate, this._textFieldCode, this._textFieldProjectComingFrom, this._textFieldProjectSubjectNature, this._managementFeesType];
    var columnSecondItems = [this._textFieldAdministration, this._textFieldOverheadExpenseOutRate, this._textFieldIsBudget, this._textFieldIsExploit];
    
    Srims.type.ProjectTypeShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 400,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
}
Ext.extend(Srims.type.ProjectTypeShowPanel_BasicForm, Ext.form.FormPanel, {});

if (Srims.type) 
    Ext.namespace("Srims.type");
Srims.type.ProjectTypeShowPanel_ProjectSupportCategoryForm = function(projectType){
    this._projectType = projectType;
    this._store = new Srims.type.ProjectSupportCategoryStore();
    
    this._columnModel = new Srims.type.ProjectSupportCategoryGridPanel_ColumnModel();
    
    this._gridPanelProjectSupportCategory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有资助类别信息'
        }
    });
    
    Srims.type.ProjectTypeShowPanel_ProjectSupportCategoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目资助类别信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectSupportCategory]
    });
    this._store.load({
        params: {
            projectTypeID: projectType.get('id')
        }
    });
}
Ext.extend(Srims.type.ProjectTypeShowPanel_ProjectSupportCategoryForm, Ext.FormPanel, {});

if (Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeShowPanel_ProjectSupportFieldForm = function(projectType){
    this._projectType = projectType;
    this._store = new Srims.type.ProjectSupportFieldStore();
    
    this._columnModel = new Srims.type.ProjectSupportFieldGridPanel_ColumnModel();
    
    this._gridPanelProjectSupportField = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有资助领域信息'
        }
    });
    
    Srims.type.ProjectTypeShowPanel_ProjectSupportFieldForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目资助领域信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectSupportField]
    });
    this._store.load({
        params: {
            projectTypeID: projectType.get('id')
        }
    });
}
Ext.extend(Srims.type.ProjectTypeShowPanel_ProjectSupportFieldForm, Ext.FormPanel, {});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeShowPanel_ToolBar = function(projectType, store){

    //fields
    this._projectType = projectType;
    this._store = store;
    
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        projectType: this._projectType,
        store: this._store,
        handler: function(){
            Srims.type.editProjectType(this.projectType, this.store);
        },
        hidden: true,
        tooltip: '<b>编辑项目分类</b><br/>编辑选中项目类别的信息'
    });
    this._buttonProjectSupportFieldManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-category',
        text: '项目资助领域管理',
        minWidth: 60,
        projectType: this._projectType,
        store: this._store,
        handler: function(){
            Srims.type.showProjectSupportFieldManageWindow(this.projectType, this.store);
        },
        hidden: true,
        tooltip: '<b>项目资助领域管理</b><br/>项目资助领域管理'
    });
    this._buttonProjectSupportCategoryManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-field',
        text: '项目资助类别管理',
        minWidth: 60,
        projectType: this._projectType,
        store: this._store,
        handler: function(){
            Srims.type.showProjectSupportCategoryManageWindow(this.projectType, this.store);
        },
        hidden: true,
        tooltip: '<b>项目资助类别管理</b><br/>项目资助类别管理'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        projectType: this._projectType,
        store: this._store,
        handler: function(){
            Srims.type.deleteProjectType(this.projectType, this.store);
        },
        hidden: true,
        tooltip: '<b>删除项目分类</b>'
    });
    
    Srims.type.ProjectTypeShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonDelete, this._buttonProjectSupportFieldManage, this._buttonProjectSupportCategoryManage]
    });
    
    //initial
    
    this._buttonEdit.setVisible(this._projectType.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!this._projectType.get('canEdit'));
    
    this._buttonDelete.setVisible(this._projectType.get('hasPermission_Delete'));
    this._buttonDelete.setDisabled(!this._projectType.get('canDelete'));
    
    this._buttonProjectSupportFieldManage.setVisible(this._projectType.get('hasPermission_ManageProjectSupportField'));
    this._buttonProjectSupportFieldManage.setDisabled(!this._projectType.get('canManageProjectSupportField'));
    
    this._buttonProjectSupportCategoryManage.setVisible(this._projectType.get('hasPermission_ManageProjectSupportCategory'));
    this._buttonProjectSupportCategoryManage.setDisabled(!this._projectType.get('canManageProjectSupportCategory'));
    
}
Ext.extend(Srims.type.ProjectTypeShowPanel_ToolBar, Ext.Toolbar);

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeShowPanel = function(panelId, projectType, store){

    this._panelId = panelId;
    this._projectType = projectType;
    this._store = store;
    
    this._basicForm = new Srims.type.ProjectTypeShowPanel_BasicForm(this._projectType);
    this._supportCategoryForm = new Srims.type.ProjectTypeShowPanel_ProjectSupportCategoryForm(this._projectType);
    this._supportFieldFrom = new Srims.type.ProjectTypeShowPanel_ProjectSupportFieldForm(this._projectType);
    this._toolBar = new Srims.type.ProjectTypeShowPanel_ToolBar(this._projectType, this._store);
    
    Srims.type.ProjectTypeShowPanel.superclass.constructor.call(this, {
        id: this._panelId,
        style: 'padding:5px; width:1200px',
        closable: true,
        frame: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._projectType.get('name'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: [this._basicForm, this._supportCategoryForm, this._supportFieldFrom]
    });
    
}
Ext.extend(Srims.type.ProjectTypeShowPanel, Ext.Panel, {});

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeEditWindow_BasicForm = function(projectType){
    this._projectType = projectType;
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: this._projectType.get('name'),
        allowBlank: false,
        width: 390
    });
    
    this._textFieldShortName = new Ext.form.TextField({
        fieldLabel: '简称',
        value: this._projectType.get('shortName'),
        width: 160
    });
    this._entityComboBoxProjectRank = new Srims.component.EntityComboBox({
        fieldLabel: '项目等级',
        store: new Srims.type.ProjectRankStore(Srims.service.type.ProjectRankService + '/GetAllRanks'),
        displayField: 'name',
        editable: true,
        value: this._projectType.get('projectRank'),
        entityId: this._projectType.get('projectRankID'),
        listWidth: 160,
        allowBlank: false,
        width: 160
    });
    this._numberFieldOverheadExpenseInRate = new Srims.component.PercentField({
        fieldLabel: '校内管理费率',
        value: this._projectType.get('overheadExpenseInRate'),
        width: 160
    });
    this._numberFieldCode = new Ext.form.TextField({
        fieldLabel: '分类代码',
        value: this._projectType.get('code'),
		regex: /(^\d{2}$)/,
        allowDecimals: false,
        allowNegative: false,
        maxLength: 2,
        minLength: 2,
        width: 160
    });
    this._numberFieldPerCode = new Ext.form.NumberField({
        fieldLabel: '原来代码',
        value: this._projectType.get('perCode'),
        allowNegative: false,
        width: 160
    });
    this._textFieldAdministration = new Ext.form.TextField({
        fieldLabel: '专管部门',
        value: this._projectType.get('administration'),
        width: 160
    });
    this._numberFieldOverheadExpenseOutRate = new Srims.component.PercentField({
        fieldLabel: '外协管理费率',
        value: this._projectType.get('overheadExpenseOutRate'),
        width: 160
    });
    this._numberFieldBakCode = new Ext.form.NumberField({
        fieldLabel: '备用代码',
        value: this._projectType.get('bakCode'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._checkBoxIsBudget = new Ext.form.Checkbox({
        fieldLabel: '是否预算制',
        checked: this._projectType.get('isBudget')
    });
    this._checkBoxIsExploit = new Ext.form.Checkbox({
        fieldLabel: '是否同年单账本号',
        checked: this._projectType.get('isExploit')
    });
    this._comboBoxProjectComingFrom = new Ext.form.ComboBox({
        fieldLabel: '项目来源',
        value: this._projectType.get('projectComingFrom'),
        store: Srims.type.projectFormStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._comboBoxProjectSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        value: this._projectType.get('subjectNature'),
        store: Srims.type.projectSubjectNatureStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._entityComboBoxManagementFeesType = new Srims.component.GetAllManagementFeesComboBox({
        fieldLabel: '管理费收取类别',
        value: this._projectType.get('managementFeesType'),
        displayField: 'value',
        editable: true,
        listWidth: 600,
        allowBlank: true,
        width: 160
    });
    
    var columnFirstItems = [this._textFieldShortName, this._entityComboBoxProjectRank, this._numberFieldOverheadExpenseInRate, this._numberFieldCode, this._numberFieldPerCode, this._comboBoxProjectComingFrom, this._entityComboBoxManagementFeesType];
    var columnSecondItems = [this._textFieldAdministration, this._numberFieldOverheadExpenseOutRate, this._numberFieldBakCode, this._checkBoxIsExploit, this._checkBoxIsBudget, this._comboBoxProjectSubjectNature];
    Srims.type.ProjectTypeEditWindow_BasicForm.superclass.constructor.call(this, {
        // collapsible: true,
        title: '',
        widht: 600,
        Height: 417,
        frame: true,
        labelWidth: 90,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:350px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:350px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    this.assginValues = function(){
        this._projectType.set('name', this._textFieldName.getValue());
        this._projectType.set('isBudget', this._checkBoxIsBudget.checked ? "true" : "false");
        this._projectType.set('overheadExpenseInRate', this._numberFieldOverheadExpenseInRate.getValue());
        this._projectType.set('overheadExpenseOutRate', this._numberFieldOverheadExpenseOutRate.getValue());
        this._projectType.set('administration', this._textFieldAdministration.getValue());
        this._projectType.set('shortName', this._textFieldShortName.getValue());
        this._projectType.set('code', this._numberFieldCode.getValue());
        this._projectType.set('bakCode', this._numberFieldBakCode.getValue());
        this._projectType.set('perCode', this._numberFieldPerCode.getValue());
        this._projectType.set('isExploit', this._checkBoxIsExploit.checked ? "true" : "false");
        this._projectType.set('projectComingFrom', this._comboBoxProjectComingFrom.getValue());
        this._projectType.set('projectRankID', this._entityComboBoxProjectRank.getValue());
        this._projectType.set('subjectNature', this._comboBoxProjectSubjectNature.getValue());
        this._projectType.set('managementFeesType', this._entityComboBoxManagementFeesType.getValue());
    }
    this.validTextField = function(textField){
        if (textField.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: textField.fieldLabel + '错误',
                msg: '您输入的值有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
        
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldName.isValid(preventMark) && result;
        result = this._numberFieldOverheadExpenseInRate.isValid(preventMark) && result;
        result = this._numberFieldOverheadExpenseOutRate.isValid(preventMark) && result;
        result = this._entityComboBoxProjectRank.isValid(preventMark) && result;
        result = this._numberFieldCode.isValid(preventMark) && result;
        result = this._numberFieldCode.isValid(preventMark) && result;
        result = this._numberFieldBakCode.isValid(preventMark) && result;
        result = this._comboBoxProjectSubjectNature.isValid(preventMark) && result;
        result = this._comboBoxProjectComingFrom.isValid(preventMark) && result;
       // result = this._entityComboBoxManagementFeesType.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        result = this.validTextField(this._textFieldShortName) && result;
        return result;
    }    
}

Ext.extend(Srims.type.ProjectTypeEditWindow_BasicForm, Ext.form.FormPanel, {});


if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeEditWindow = function(id, projectType, store){

    this._id = id;
    this._projectType = projectType;
    this._store = store;
    
    var isNew = this._projectType.isNew();
    this._title = this._projectType.isNew() ? "新建项目类型" : this._projectType.get('name');
    this._formPanelBasic = new Srims.type.ProjectTypeEditWindow_BasicForm(this._projectType);
    
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    
    Srims.type.ProjectTypeEditWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 304,
        width: 680,
        buttonAlign: 'center',
        title: this._title,
        iconCls: projectType.isNew() ? 'icon-new' : 'icon-edit',
        items: [this._formPanelBasic],
        buttons: [this._buttonSave]
    });
    
    this.assginValues = function(){
        this._formPanelBasic.assginValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelBasic.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var projectType = this._projectType;
        projectType.beginEdit();
        this.assginValues();
        projectType.commit();
        Ext.Ajax.request({
            url: Srims.service.type.ProjectTypeService + '/Save',
            params: projectType.data,
            scope: this,
            success: function(response){
            
                Srims.WorkSpace.getWorkSpace().remove(this);
                store.load();
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.type.ProjectTypeXmlReader()
                });
                var newProjectType = newstore.getAt(0);
                if (!isNew) {
                    var panelId = 'ProjectTypeShowPanel' + newProjectType.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.type.showProjectType(newProjectType, store);
            }
        });
    }
    this._onButonSave_Click = function(button, e){
        var panel = button.panel;
        
        if (!panel.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButonSave_Click);
}
Ext.extend(Srims.type.ProjectTypeEditWindow, Ext.Window, {});


if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryGridPanel_ToolBar = function(selection, store, projectType, projectTypeStore){

    //fields
    this._selection = selection;
    this._store = store;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            Srims.type.newProjectSupportCategory(this.store, this.projectType, this.projectTypeStore);
        },
        tooltip: '<b>添加项目资助类别</b><br/>输入项目资助类别信息以添加资助类别'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.editProjectSupportCategory(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>编辑项目资助类别</b><br/>编辑选中项目资助类别的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteProjectSupportCategory(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>删除项目资助类别</b>'
    });
    var user = Srims.currentLoginLog.user;
    Srims.type.ProjectSupportCategoryGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
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
        
        var projectSupportCategory = selection.getSelected();
        
        buttonEdit.setVisible(projectSupportCategory.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!projectSupportCategory.get('canEdit'));
        
        buttonDelete.setVisible(projectSupportCategory.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!projectSupportCategory.get('canDelete'));
        
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.type.ProjectSupportCategoryGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportCategoryGridPanel = function(projectType, projectTypeStore){

    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    this._store = new Srims.type.ProjectSupportCategoryStore();
    this._store.gird = this;
    this._columnModel = new Srims.type.ProjectSupportCategoryGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.type.ProjectSupportCategoryGridPanel_ToolBar(this._selections, this._store, this._projectType, this._projectTypeStore);
    
    //public methods
    this.getProjectSupportCategoryStore = function(){
        return this._store;
    }
    
    Srims.type.ProjectSupportCategoryGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    this._store.load({
        params: {
            projectTypeID: projectType.get('id')
        }
    });
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectSupportCategory = grid.getProjectSupportCategoryStore().getAt(rowIndex);
        Srims.type.editProjectSupportCategory(projectSupportCategory, this._store, this._projectType, this._projectTypeStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.type.ProjectSupportCategoryGridPanel, Srims.component.GridPanel, {});

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportCategoryManageWindow = function(id, projectType, store){

    this._id = id;
    this._projectType = projectType;
    this._projectTypeStore = store;
    this._supportCategoryGridPanel = new Srims.type.ProjectSupportCategoryGridPanel(this._projectType, this._projectTypeStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.type.ProjectSupportCategoryManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目类型' + this._projectType.get('name') + '资助类别管理',
        iconCls: 'icon-type-support-category',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._supportCategoryGridPanel],
        buttons: [this._buttonClose]
    });
    //this._supportCategoryGridPanel.getProjectSupportCategoryStore().load();
}
Ext.extend(Srims.type.ProjectSupportCategoryManageWindow, Ext.Window, {});

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportCategoryEditWindow = function(id, projectSupportCategory, projectType, store, projectTypeStore){

    this._id = id;
    this._projectSupportCategory = projectSupportCategory;
    this._projectType = projectType;
    this._store = store;
    this._projectTypeStore = projectTypeStore;
    
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
        window: this
    });
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '类别名称',
        value: this._projectSupportCategory.get('name'),
        allowBlank: false,
        width: 160
    });
    this._checkBoxIsGetOverheadExpense = new Ext.form.Checkbox({
        fieldLabel: '是否收取管理费',
        checked: this._projectSupportCategory.get('isGetOverheadExpense')
    });
    var Items = [this._textFieldName, this._checkBoxIsGetOverheadExpense];
    
    Srims.type.ProjectSupportCategoryEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectSupportCategory.isNew() ? '新建项目资助类别信息' : '编辑项目资助类别信息',
        iconCls: projectSupportCategory.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
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
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldName.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        return result;
    }
    this._assignValues = function(){
        this._projectSupportCategory.set("name", this._textFieldName.getValue());
        this._projectSupportCategory.set("isGetOverheadExpense", this._checkBoxIsGetOverheadExpense.checked ? "true" : "false");
        this._projectSupportCategory.set("projectTypeID", this._projectType.get('id'));
    }
    this._save = function(){
        var projectSupportCategory = this._projectSupportCategory;
        projectSupportCategory.beginEdit();
        this._assignValues();
        projectSupportCategory.commit();
        
        Ext.Ajax.request({
            url: Srims.service.type.ProjectSupportCategoryService + '/Save',
            params: projectSupportCategory.data,
            scope: this,
            success: function(){
                this._store.load({
                    params: {
                        projectTypeID: projectType.get('id')
                    }
                });
                this._projectTypeStore.load();
                var panelId = "ProjectTypeShowPanel" + projectType.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.type.showProjectType(projectType, this._projectTypeStore);
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
Ext.extend(Srims.type.ProjectSupportCategoryEditWindow, Ext.Window, {})


if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldGridPanel_ToolBar = function(selection, store, projectType, projectTypeStore){

    //fields
    this._selection = selection;
    this._store = store;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            Srims.type.newProjectSupportField(this.store, this.projectType, this.projectTypeStore);
        },
        tooltip: '<b>添加项目资助领域</b><br/>输入项目资助领域信息以添加资助领域'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.editProjectSupportField(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>编辑项目资助领域</b><br/>编辑选中项目资助领域的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteProjectSupportField(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>删除项目资助领域</b>'
    });
    this._buttonProjectSupportSubFieldManage = new Ext.Toolbar.Button({
        iconCls: 'icon-type-support-sub-field',
        text: '项目资助子领域管理',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.showProjectSupportSubFieldManageWindow(this.selection.getSelected(), this.store, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>项目资助子领域管理</b><br/>项目资助子领域管理'
    });
    var user = Srims.currentLoginLog.user;
    Srims.type.ProjectSupportFieldGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonProjectSupportSubFieldManage, this._buttonDelete]
    });
    
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonProjectSupportSubFieldManage = this._buttonProjectSupportSubFieldManage;
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonProjectSupportSubFieldManage = selection.buttonProjectSupportSubFieldManage;
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            buttonProjectSupportSubFieldManage.hide();
            return;
        }
        
        var projectSupportField = selection.getSelected();
        
        buttonEdit.setVisible(projectSupportField.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!projectSupportField.get('canEdit'));
        
        buttonDelete.setVisible(projectSupportField.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!projectSupportField.get('canDelete'));
        
        buttonProjectSupportSubFieldManage.setVisible(projectSupportField.get('hasPermission_ManageSubField'));
        buttonProjectSupportSubFieldManage.setDisabled(!projectSupportField.get('canManageSubField'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.type.ProjectSupportFieldGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportFieldGridPanel = function(projectType, projectTypeStore){

    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    this._store = new Srims.type.ProjectSupportFieldStore();
    this._store.gird = this;
    this._columnModel = new Srims.type.ProjectSupportFieldGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.type.ProjectSupportFieldGridPanel_ToolBar(this._selections, this._store, this._projectType, this._projectTypeStore);
    
    //public methods
    this.getProjectSupportFieldStore = function(){
        return this._store;
    }
    
    Srims.type.ProjectSupportFieldGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    this._store.load({
        params: {
            projectTypeID: projectType.get('id')
        }
    });
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectSupportField = grid.getProjectSupportFieldStore().getAt(rowIndex);
        Srims.type.editProjectSupportField(projectSupportField, this._store, this._projectType, this._projectTypeStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.type.ProjectSupportFieldGridPanel, Srims.component.GridPanel, {});

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportFieldManageWindow = function(id, projectType, store){

    this._id = id;
    this._projectType = projectType;
    this._projectTypeStore = store;
    this._supportFieldGridPanel = new Srims.type.ProjectSupportFieldGridPanel(this._projectType, this._projectTypeStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.type.ProjectSupportFieldManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目类型' + this._projectType.get('name') + '资助领域管理',
        iconCls: 'icon-type-support-field',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._supportFieldGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.type.ProjectSupportFieldManageWindow, Ext.Window, {});

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportFieldEditWindow = function(id, projectSupportField, projectType, store, projectTypeStore){

    this._id = id;
    this._projectSupportField = projectSupportField;
    this._projectType = projectType;
    this._store = store;
    this._projectTypeStore = projectTypeStore;
    
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
        window: this
    });
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '领域名称',
        value: this._projectSupportField.get('name'),
        allowBlank: false,
        width: 160
    });
    
    var Items = [this._textFieldName];
    
    Srims.type.ProjectSupportFieldEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectSupportField.isNew() ? '新建项目资助领域信息' : '编辑项目资助领域信息',
        iconCls: projectSupportField.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 80,
        height: 114,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
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
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldName.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        return result;
    }
    this._assignValues = function(){
        this._projectSupportField.set("name", this._textFieldName.getValue());
        this._projectSupportField.set("projectTypeID", this._projectType.get('id'));
    }
    this._save = function(){
        var projectSupportField = this._projectSupportField;
        projectSupportField.beginEdit();
        this._assignValues();
        projectSupportField.commit();
        
        Ext.Ajax.request({
            url: Srims.service.type.ProjectSupportFieldService + '/Save',
            params: projectSupportField.data,
            scope: this,
            success: function(){
                this._store.load({
                    params: {
                        projectTypeID: projectType.get('id')
                    }
                });
                this._projectTypeStore.load();
                var panelId = "ProjectTypeShowPanel" + projectType.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.type.showProjectType(projectType, this._projectTypeStore);
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
Ext.extend(Srims.type.ProjectSupportFieldEditWindow, Ext.Window, {})

if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportSubFieldGridPanel_ColumnModel = function(){
    Srims.type.ProjectSupportSubFieldGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false
    }, {
        header: "项目资助领域",
        dataIndex: 'projectSupportField',
        width: 60,
        sortable: false,
        hidden: false
    }])
}
Ext.extend(Srims.type.ProjectSupportSubFieldGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldGridPanel_ToolBar = function(selection, store, projectSupportField, projectSupportFieldStore, projectType, projectTypeStore){

    //fields
    this._selection = selection;
    this._store = store;
    this._projectSupportField = projectSupportField;
    this._projectSupportFieldStore = projectSupportFieldStore;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectSupportField: this._projectSupportField,
        projectSupportFieldStore: this._projectSupportFieldStore,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            Srims.type.newProjectSupportSubField(this.store, this.projectSupportField, this.projectSupportFieldStore, this.projectType, this.projectTypeStore);
        },
        tooltip: '<b>添加项目资助子领域</b><br/>输入项目资助子领域信息以添加资助子领域'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        projectSupportField: this._projectSupportField,
        projectSupportFieldStore: this._projectSupportFieldStore,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.editProjectSupportSubField(this.selection.getSelected(), this.store, this.projectSupportField, this.projectSupportFieldStore, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>编辑项目资助子领域</b><br/>编辑选中项目资助子领域的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        projectSupportField: this._projectSupportField,
        projectSupportFieldStore: this._projectSupportFieldStore,
        projectType: this._projectType,
        projectTypeStore: this._projectTypeStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.type.deleteProjectSupportSubField(this.selection.getSelected(), this.store, this.projectSupportField, this.projectSupportFieldStore, this.projectType, this.projectTypeStore);
        },
        hidden: true,
        tooltip: '<b>删除项目资助子领域</b>'
    });
    var user = Srims.currentLoginLog.user;
    Srims.type.ProjectSupportSubFieldGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
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
        
        var projectSupportSubFiled = selection.getSelected();
        
        buttonEdit.setVisible(projectSupportSubFiled.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!projectSupportSubFiled.get('canEdit'));
        
        buttonDelete.setVisible(projectSupportSubFiled.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!projectSupportSubFiled.get('canDelete'));
        
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.type.ProjectSupportSubFieldGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.tupe) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportSubFieldGridPanel = function(projectSupportField, projectSupportFieldStore, projectType, projectTypeStore){

    this._projectSupportField = projectSupportField;
    this._projectSupportFieldStore = projectSupportFieldStore;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    this._store = new Srims.type.ProjectSupportSubFieldStore();
    this._store.gird = this;
    this._columnModel = new Srims.type.ProjectSupportSubFieldGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.type.ProjectSupportSubFieldGridPanel_ToolBar(this._selections, this._store, this._projectSupportField, this._projectSupportFieldStore, this._projectType, this._projectTypeStore);
    
    //public methods
    this.getProjectSupportSubFieldStore = function(){
        return this._store;
    }
    
    Srims.type.ProjectSupportSubFieldGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    this._store.load({
        params: {
            projectSupportFieldID: projectSupportField.get('id')
        }
    });
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var projectSupportSubField = grid.getProjectSupportSubFieldStore().getAt(rowIndex);
        Srims.type.editProjectSupportSubField(projectSupportSubField, this._store, this._projectSupportField, this._projectSupportFieldStore, this._projectType, this._projectTypeStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.type.ProjectSupportSubFieldGridPanel, Srims.component.GridPanel, {});



if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportSubFieldManageWindow = function(id, projectSupportField, projectSupportFieldStore, projectType, projectTypeStore){

    this._id = id;
    this._projectSupportField = projectSupportField;
    this._projectSupportFieldStore = projectSupportFieldStore;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
    this._supportSubFieldGridPanel = new Srims.type.ProjectSupportSubFieldGridPanel(this._projectSupportField, this._projectSupportFieldStore, this._projectType, this._projectTypeStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.type.ProjectSupportSubFieldManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目资助子领域' + this._projectSupportField.get('name') + '项目资助子领域管理',
        iconCls: 'icon-type-support-sub-field',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._supportSubFieldGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.type.ProjectSupportSubFieldManageWindow, Ext.Window, {});



if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectSupportSubFieldEditWindow = function(id, projectSupportSubField, store, projectSupportField, projectSupportFieldStore, projectType, projectTypeStore){

    this._id = id;
    this._projectSupportSubField = projectSupportSubField;
    this._store = store;
    this._projectSupportField = projectSupportField;
    this._projectSupportFieldStore = projectSupportFieldStore;
    this._projectType = projectType;
    this._projectTypeStore = projectTypeStore;
    
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
        window: this
    });
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '子领域名称',
        value: this._projectSupportSubField.get('name'),
        allowBlank: false,
        width: 160
    });
    
    var Items = [this._textFieldName];
    
    Srims.type.ProjectSupportSubFieldEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: projectSupportSubField.isNew() ? '新建项目资助子领域信息' : '编辑项目资助子领域信息',
        iconCls: projectSupportSubField.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 80,
        height: 114,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
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
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldName.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        return result;
    }
    this._assignValues = function(){
        this._projectSupportSubField.set("name", this._textFieldName.getValue());
        this._projectSupportSubField.set("projectSupportFiledID", this._projectSupportField.get('id'));
    }
    this._save = function(){
        var projectSupportSubField = this._projectSupportSubField;
        projectSupportSubField.beginEdit();
        this._assignValues();
        projectSupportSubField.commit();
        
        Ext.Ajax.request({
            url: Srims.service.type.ProjectSupportSubFieldService + '/Save',
            params: projectSupportSubField.data,
            scope: this,
            success: function(){
                this._store.load({
                    params: {
                        projectSupportFieldID: projectSupportField.get('id')
                    }
                });
                this._projectSupportFieldStore.load({
                    params: {
                        projectTypeID: projectType.get('id')
                    }
                });
                this._projectTypeStore.load();
                var panelId = "ProjectTypeShowPanel" + projectType.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.type.showProjectType(projectType, this._projectTypeStore);
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
Ext.extend(Srims.type.ProjectSupportSubFieldEditWindow, Ext.Window, {})

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
if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesGridPanel = function(id, store, title, iconCls,
		queryParams) {
	
	// fields
	this._store = store;
	this._store.grid = this;

	this._selections = new Ext.grid.RowSelectionModel();

	// controls
	this._columnModel = new Srims.type.ManagementFeesGridPanel_ColumnModel();// 位于文件ManagementFeesGridPanel_ColumnModel.js中
	this._toolbar = new Srims.type.ManagementFeesGridPanel_ToolBar(
			this._selections, this._store, id, queryParams);// 位于文件ManagementFeesGridPanel_ToolBar.js中
	this._filter = new Srims.type.ManagementFeesGridPanel_GridFilter();// 位于文件ManagementFeesGridPanel_GridFilter.js中

	// constructor
	var params = {};
	params.sm = this._selections;
	params.store = this._store;
	params.id = id;
	params.title = title;
	params.iconCls = iconCls;
	params.colModel = this._columnModel;
	params.tbar = this._toolbar;
	params.plugins = this._filter;
	params.defaultBBar = true;

	Srims.type.ManagementFeesGridPanel.superclass.constructor
			.call(this, params);

	// event
    this.on('celldblclick', onCellDblClick);

	// private methods
	function onCellDblClick(grid, rowIndex, columnIndex, e) {
		var managementFee = grid.getStore().getAt(rowIndex);
		Srims.type.showManagementFee(managementFee, grid._store);
	}
}
Ext.extend(Srims.type.ManagementFeesGridPanel, Srims.component.GridPanel);if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesGridPanel_ColumnModel = function() {
	Srims.type.ManagementFeesGridPanel_ColumnModel.superclass.constructor.call(
			this, [{
						header : 'id',
						dataIndex : 'id',
						hidden : true,
						hideable : false
					}, {
						header : '管理费收取类别',
						dataIndex : 'type',
						sortable : true,
						hidden : false
					}, {
						header : '经费额度（万元）',
						dataIndex : 'fundtotal',
						sortable : true,
						renderer : Money.render,
						hidden : false
					}, {
						header : '管理费',
						dataIndex : 'fee',
						renderer: ExpenseRate.render,
						hidden : false
					}, {
						header : '绩效工资',
						dataIndex : 'performancepay',
						sortable : true,
						renderer: ExpenseRate.render,
						hidden : false
					}, {
						header : '备注',
						dataIndex : 'remark',
						flex : 1,
						hidden : false
					}])
}
Ext
		.extend(Srims.type.ManagementFeesGridPanel_ColumnModel,
				Ext.grid.ColumnModel);if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesGridPanel_ToolBar = function(selection, store,
		panelId, queryParams) {
	// field
	this._panelId = panelId;
	this._selection = selection;
	this._store = store;
	this._queryParams = queryParams;

	// controls

	this._buttonNew = new Ext.Toolbar.Button({
				iconCls : 'icon-new',
				text : '添加',
				minWidth : 60,
				selection : this._selection,
				store : this._store,
				handler : function() {
					Srims.type.newManagementFee(this.store);
				},
				tooltip : '<b>添加管理费收取分类</b><br/>输入管理费收取分类信息以添加类别'
			});
	this._buttonShow = new Ext.Toolbar.Button({
				iconCls : 'icon-show',
				text : '查看',
				minWidth : 60,
				store : this._store,
				selection : this._selection,
				handler : function() {
					if (this.selection.getCount() == 0)
						return;

					Srims.type.showManagementFee(this.selection.getSelected(),
							this.store);
				},
				hidden : true,
				tooltip : '<b>查管理费收取分类</b><br/>显示所选类别的详细信息'
			});
	this._buttonEdit = new Ext.Toolbar.Button({
				iconCls : 'icon-edit',
				text : '编辑',
				minWidth : 60,
				selection : this._selection,
				store : this._store,
				handler : function() {
					if (this.selection.getCount() == 0)
						return;
					Srims.type.editManagementFee(this.selection.getSelected(),
							this.store);
				},
				hidden : true,
				tooltip : '<b>编辑管理费收取分类</b><br/>编辑选中项目类别的信息'
			});
	this._buttonDelete = new Ext.Toolbar.Button({
				iconCls : 'icon-delete',
				text : '删除',
				minWidth : 60,
				store : this._store,
				selection : this._selection,
				handler : function() {
					if (this.selection.getCount() == 0)
						return;
					Srims.type.deleteManagementFee(
							this.selection.getSelected(), this.store)
				},
				hidden : true,
				tooltip : '<b>删除管理费收取分类</b>'
			});
	this._buttonRefresh = new Ext.Toolbar.Button({
				iconCls : 'icon-refresh',
				text : '刷新',
				minWidth : 60,
				store : this._store,
				handler : function() {
					this.store.load();
				},
				tooltip : '<b>刷新列表</b><br/>更新管理费收取分类列表'
			});
	this._buttonReset = new Ext.Toolbar.Button({
				iconCls : 'icon-reset',
				text : '重置',
				minWidth : 60,
				store : this._store,
				panelId : this._panelId,
				handler : function() {
					// 清空查询条件
					var params = ['token'];
					Srims.SetQueryParams.clearParams(queryParams, params);
					this.store.load();
				},
				tooltip : '<b>重置列表</b><br/>清空查询条件，重置列表'
			});

	Srims.type.ManagementFeesGridPanel_ToolBar.superclass.constructor.call(
			this, {
				items : [this._buttonNew, this._buttonShow, this._buttonEdit,
						this._buttonDelete, new Ext.Toolbar.Fill(),
						this._buttonRefresh, this._buttonReset]
			});

	// initial
	this._selection.buttonShow = this._buttonShow;
	this._selection.buttonEdit = this._buttonEdit;
	this._selection.buttonDelete = this._buttonDelete;

	// event method
	this._onSelection_selectionChagne = function(selection) {
		var buttonShow = selection.buttonShow;
		var buttonEdit = selection.buttonEdit;
		var buttonDelete = selection.buttonDelete;

		if (selection.getCount() == 0) {
			buttonShow.hide();
			buttonEdit.hide();
			buttonDelete.hide();
			return;
		}
		var managementFees = selection.getSelected();

		// 按钮显示权限未完成
		buttonShow.setVisible(true);
		buttonEdit.setVisible(true);
		buttonDelete.setVisible(true);
		// 按钮显示权限结束
	}
	// event
	this._selection.on('selectionchange', this._onSelection_selectionChagne);

}
Ext.extend(Srims.type.ManagementFeesGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.type)
	Ext.namespace("Srims.type");

Srims.type.ManagementFeesGridPanel_GridFilter = function() {
	Srims.type.ManagementFeesGridPanel_GridFilter.superclass.constructor.call(
			this, {
				filters : [{
							type : 'string',
							dataIndex : 'type'
						}]
			});
}
Ext.extend(Srims.type.ManagementFeesGridPanel_GridFilter,Ext.grid.GridFilters);if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesEditWindow = function(id, managementFee, store) {
	this._id = id;
	this._managementFee = managementFee;
	this._store = store;


	var isNew = this._managementFee.isNew();
	this._title = this._managementFee.isNew() ? "新建管理费类别" : this._managementFee
			.get('type');
	this._formPanelBasic = new Srims.type.ManagementFeesEditWindwow_BasicForm(this._managementFee);// 在文件

	this._buttonSave = new Ext.Button({
				minWidth : 100,
				text : '保 存',
				panel : this
			});
	Srims.type.ManagementFeesEditWindow.superclass.constructor.call(this, {
				id : this._id,
				style : 'padding:5px; width:1200px',
				closable : true,
				height : 278,
				width : 680,
				buttonAlign : 'center',
				title : this._title,
				iconCls : managementFee.isNew() ? 'icon-new' : 'icon-edit',
				items : [this._formPanelBasic],
				buttons : [this._buttonSave]
			});
	this.assignValues = function() {
		this._formPanelBasic.assignValues();
	}
	this.isValid = function(preventMark) {
		var result = true;
		result = this._formPanelBasic.isValid(preventMark) && result;
		return result;
	}
	this.save = function() {
		var managementFee = this._managementFee;
		managementFee.beginEdit();
		this.assignValues();
		managementFee.commit();
		Ext.Ajax.request({
					url : Srims.service.type.ManagementFeesService + '/Save',
					params : managementFee.data,
					scope : this,
					success : function(response) {
						Srims.WorkSpace.getWorkSpace().remove(this);
						store.load();
						var newstore = new Ext.data.Store({
									data : response.responseXML,
									reader : new Srims.type.ManagementFeesXmlReader()
								});
						var newManagementFee = newstore.getAt(0);
						if (!isNew) {
							var panelId = 'ManagementFeesShowPanel'
									+ newManagementFee.get('id');
							if (Ext.getCmp(panelId))
								Srims.WorkSpace.getWorkSpace().remove(
										Ext.getCmp(panelId), true);
						}
						Srims.type.showManagementFee(newManagementFee, store);// 在文件TypeAction.js中
					}
				})
	}
	this._onButtonSave_Click = function(button, e) {
		var panel = button.panel;
		if (!panel.isValid(false))
			return;

		button.setText('正在保存');
		button.disable();
		panel.save();
	}

	this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.type.ManagementFeesEditWindow, Ext.Window, {});if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFeesEditWindwow_BasicForm = function(managementFee) {
	this._managementFee = managementFee;

	this._textFieldType = new Ext.form.TextField({
				fieldLabel : '管理费收取类别',
				value : this._managementFee.get('type'),
				allowBlank : false,
				width : 390
			});
	this._textFieldFundTotal = new Srims.component.MoneyField({
				fieldLabel : '经费额度（万元）≤',
				value : this._managementFee.get('fundtotal'),
				allowBlank : false,
				width : 160
			});
	this._textFieldFee = new Srims.component.PercentField({
				fieldLabel : '学校管理费比例（%）',
				value : this._managementFee.get('fee'),
				allowBlank : false,
				width : 160
			});
	this._textFieldPerformancePay = new Srims.component.PercentField({
				fieldLabel : '绩效工资比例（%）',
				value : this._managementFee.get('performancepay'),
				allowBlank : false,
				width : 160
			});
	this._textFieldRemark = new Ext.form.TextArea({
				fieldLabel : '备注',
				value : this._managementFee.get('remark'),
				width : 390
			});

	var columnFirstItems = [this._textFieldFundTotal, this._textFieldFee];
	var columnSecondItems = [this._textFieldPerformancePay];

	Srims.type.ManagementFeesEditWindwow_BasicForm.superclass.constructor.call(
			this, {
				title : '',
				width : 600,
				height : 427,
				frame : true,
				labelWidth : 130,
				bodyStyle : 'padding:5px 5px 0',
				style : 'margin-bottom:2px',
				defaultType : 'textfield',
				titleCollapse : true,
				items : [this._textFieldType, new Ext.Panel({
									width : 600,
									layout : 'column',
									items : [new Ext.Panel({
														width : 300,
														layout : 'form',
														items : columnFirstItems
													}), new Ext.Panel({
														width : 300,
														layout : 'form',
														items : columnSecondItems
													})]
								}), this._textFieldRemark]
			});
	this.assignValues = function() {
		this._managementFee.set('type', this._textFieldType.getValue());
		this._managementFee.set('fundtotal', this._textFieldFundTotal
						.getMoney());
		this._managementFee.set('fee', this._textFieldFee.getValue());
		this._managementFee.set('performancepay', this._textFieldPerformancePay
						.getValue());
		this._managementFee.set('remark', this._textFieldRemark.getValue());
	}
	this.validTextField = function(textField) {
		if (textField.getValue().trim().length == 0) {
			Ext.Msg.show({
						title : textField.fieldLabel + '错误',
						msg : '您输入的值有空格，请重新输入。',
						button : Ext.Msg.OK,
						icon : Ext.MessageBox.WARNING
					});
			return false;
		}
		return true;
	}
	this.isValid = function(preventMark) {
		var result = true;
		result = this._textFieldType.isValid(preventMark) && result;
		result = this._textFieldFundTotal.isValid(preventMark) && result;
		result = this._textFieldFee.isValid(preventMark) && result;
		result = this._textFieldPerformancePay.isValid(preventMark) && result;
		result = this._textFieldRemark.isValid(preventMark) && result;
		result = this.validTextField(this._textFieldType) && result;
		return result;
	}

}
Ext.extend(Srims.type.ManagementFeesEditWindwow_BasicForm, Ext.form.FormPanel,
		{});
if (!Srims.type)
	Ext.namespace("Srims.type");

Srims.type.ManagementFeesShowPanel = function(panelId, managementFee, store) {
	this._panelId = panelId;
	this._managementFee = managementFee;
	this._store = store;

	this._basicForm = new Srims.type.ManagementFeesShowPanel_BasicForm(this._managementFee);// 位于文件ManagementFeesShowPanel_BasicForm.js中
	this._toolBar = new Srims.type.ManagementFeesShowPanel_ToolBar(
			this._managementFee, this._store);// 位于文件 ManagementFeesShowPanel_ToolBar.js中

	Srims.type.ManagementFeesShowPanel.superclass.constructor.call(this, {
				id : this._panelId,
				style : 'padding:5px;width:1200px',
				closable : true,
				frame : true,
				deferHeight : false,
				buttonAlign : 'center',
				title : this._managementFee.get('type'),
				iconCls : 'icon-show',
				tbar : this._toolBar,
				items : [this._basicForm]
			});
}
Ext.extend(Srims.type.ManagementFeesShowPanel, Ext.Panel, {});if (!Srims.type)
	Ext.namespace("Srims.type");

Srims.type.ManagementFeesShowPanel_BasicForm = function(managementFee) {
	this._managementFee = managementFee;

	this._textFieldType = new Ext.form.TextField({
				fieldLabel : '管理费收取类别',
				value : this._managementFee.get('type'),
				allowBlank : false,
				width : 390
			});
	this._textFieldFundTotal = new Ext.form.TextField({
				fieldLabel : '经费额度（万元）≤',
				value : Money.render(this._managementFee.get('fundtotal')),
				allowBlank : false,
				width : 160
			});
	this._textFieldFee = new Ext.form.TextField({
				fieldLabel : '学校管理费比例（%）',
				value : ExpenseRate.render(this._managementFee.get('fee')),
				allowBlank : false,
				width : 160
			});
	this._textFieldPerformancePay = new Ext.form.TextField({
				fieldLabel : '绩效工资比例（%）',
				value : ExpenseRate.render(this._managementFee
						.get('performancepay')),
				allowBlank : false,
				width : 160
			});
	this._textFieldRemark = new Ext.form.TextArea({
				fieldLabel : '备注',
				value : this._managementFee.get('remark'),
				width : 390
			});

	var columnFirstItems = [this._textFieldFundTotal, this._textFieldFee];
	var columnSecondItems = [this._textFieldPerformancePay];
	Srims.type.ManagementFeesShowPanel_BasicForm.superclass.constructor.call(
			this, {
				collapsible : true,
				title : '基本信息',
				Height : 500,
				frame : true,
				labelWidth : 130,
				bodyStyle : 'padding:5px 5px 0',
				style : 'margin-bottom: 2px',
				defaultType : 'textfield',
				titleCollapse : true,
				items : [this._textFieldType, new Ext.Panel({
									labelWidth : 130,
									widht : 800,
									layout : 'column',
									items : [new Ext.Panel({
														width : 400,
														layout : 'form',
														style : 'width:400px',
														items : columnFirstItems
													}), new Ext.Panel({
														width : 400,
														style : 'width:400px',
														layout : 'form',
														items : columnSecondItems
													})]
								}), this._textFieldRemark]
			});
}
Ext
		.extend(Srims.type.ManagementFeesShowPanel_BasicForm,
				Ext.form.FormPanel, {});if (!Srims.type)
	Ext.namespace("Srims.type");

Srims.type.ManagementFeesShowPanel_ToolBar = function(managementFee, store) {
	// field
	this._managementFee = managementFee;
	this._store = store;

	// controls
	this._buttonEdit = new Ext.Toolbar.Button({
				iconCls : 'icon-edit',
				text : '编辑',
				minEidth : 60,
				managementFee : this._managementFee,
				store : this._store,
				handler : function() {
					Srims.type
							.editManagementFee(this.managementFee, this.store);
				}
			});
	this._buttonDelete = new Ext.Toolbar.Button({
				iconCls : 'icon-delete',
				text : '删除',
				minEidth : 60,
				managementFee : this._managementFee,
				store : this._store,
				handler : function() {
					Srims.type.deleteManagementFee(this.managementFee,
							this.store)
				},
				//hidden : true,
				tooltip : '<b>删除类别信息</b>'
			});

	Srims.type.ManagementFeesShowPanel_ToolBar.superclass.constructor.call(
			this, {
				items : [this._buttonEdit,this._buttonDelete]
			});

	// 权限控制 未完成
}
Ext.extend(Srims.type.ManagementFeesShowPanel_ToolBar, Ext.Toolbar);
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
