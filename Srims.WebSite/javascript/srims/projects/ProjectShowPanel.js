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
