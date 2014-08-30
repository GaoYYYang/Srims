
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
