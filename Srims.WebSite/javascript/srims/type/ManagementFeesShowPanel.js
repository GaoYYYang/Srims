
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
Ext.extend(Srims.type.ManagementFeesShowPanel, Ext.Panel, {});