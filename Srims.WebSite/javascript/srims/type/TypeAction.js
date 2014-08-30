
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