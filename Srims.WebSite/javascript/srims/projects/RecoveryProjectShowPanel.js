if (!Srims.projects)
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
