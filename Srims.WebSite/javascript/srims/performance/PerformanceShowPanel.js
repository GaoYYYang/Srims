
if (!Srims.performance)
    Ext.namespace('Srims.performance');
    
Srims.performance.PerformanceShowPanel=function(performanceStore,panelID,performance){
	this._performance=performance;
	this._id=panelID;
	this._performanceStore=performanceStore;

	this._formPanelBasic = new Srims.performance.PerformanceShowPanel_BasicForm(performance);
	//constructor
	Srims.performance.PerformanceShowPanel.superclass.constructor.call(this,{
				id : this._id,
				style : 'padding:5px;width:1200px',
				closable : true,
				//frame : true,
				deferHeight : false,
				buttonAlign : 'center',
				title :'绩效分配',
				iconCls : 'icon-show',
				tbar : this._ToolBar,
				items : [this._formPanelBasic]
	});

}
Ext.extend(Srims.performance.PerformanceShowPanel, Ext.Panel, {});