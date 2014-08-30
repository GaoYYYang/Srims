if (!Srims.performance)
	Ext.namespace("Srims.performance");
	
Srims.performance.PerformanceShowPanel_BasicForm=function(performance){
	this._performance=performance;
	this._textFieldProject=new Ext.form.TextField({
		fieldLabel:'项目名称',
		value:performance.get('projectName'),
		readonly:true,
		width:560
	});
	this._textFieldExpert=new Ext.form.TextField({
		fieldLabel:'项目负责人',
		value:performance.get('expertName'),
		readonly:true,
		width:160
	});
	this._textFieldArrived=new Ext.form.TextField({
		fieldLabel:'已到绩效',
	    value:performance.get('arrivedPerformance'),
		readonly:true,
		width:160
	});
	this._textFieldAllocated=new Ext.form.TextField({
		fieldLabel:'已分绩效',
		value:performance.get('allocatedPerformance'),
		readonly:true,
		width:160
	});
	var columnFirstItems=[this._textFieldProject,this._textFieldExpert,this._textFieldArrived,this._textFieldAllocated];
	Srims.performance.PerformanceShowPanel_BasicForm.superclass.constructor.call(this,{
		collapsible: true,
		title: '绩效分配基本信息',
		Height: 500,
		frame: true,
		labelWidth: 130,
		bodyStyle: 'padding:5px 5px 0',
		style: 'margin-bottom: 2px',
		defaultType: 'textfield',
		titleCollapse: true,
		Items:[new Ext.Panel({
		labelWidth: 130,
		width:400,
		layout: 'column',
		style: 'width:400px',
		Items:columnFirstItems
		})]
	});
//	   this.resetComponentValue = function(performance) {
//        this._performance.set('projectName', this._textFieldProject.getValue());
//        this._performance.set('expertName', this._textFieldExpert.getValue());
//        this._performance.set('arrivedPerformance', this._textFieldArrived.getValue());
//        this._performance.set('allocatedPerformance', this._textFieldAllocated.getValue());
    }

	Ext.extend(Srims.performance.PerformanceShowPanel_BasicForm, Ext.form.FormPanel, {});