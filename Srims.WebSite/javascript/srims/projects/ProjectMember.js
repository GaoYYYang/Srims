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