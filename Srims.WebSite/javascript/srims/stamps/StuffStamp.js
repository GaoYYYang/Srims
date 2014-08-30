if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.StuffStamp = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'stuffID',
	type: 'int',
	mapping: 'StuffID'
},{
	name: 'stampID',
	type: 'int',
	mapping: 'StampID'
},{
	name: 'stampOwner',
	type: 'string',
	mapping: 'StampOwner'
},{
	name: 'type',
	type: 'string',
	mapping: 'Type'
},{
	name: 'number',
	type: 'int',
	mapping: 'Number'
},{
	name: 'pagination',
	type: 'int',
	mapping: 'Pagination'
},{
	name: 'haspermission_Edit',
	type: 'boolean',
	mapping: 'Haspermission_Edit',
	convert: Boolean.toBoolean
},{
	name: 'canEdit',
	type: 'boolean',
	mapping: 'CanEdit',
	convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.stamp.StuffStamp);