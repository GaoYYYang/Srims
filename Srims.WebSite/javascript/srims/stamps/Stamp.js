if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.Stamp = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'type',
	type: 'string',
	mapping: 'Type'
},{
	name: 'ownerID',
	type: 'int',
	mapping: 'OwnerID'
},{
	name: 'owner',
	type: 'string',
	mapping: 'Owner'
},{
	name: 'number',
	type: 'int',
	mapping: 'Number'
},{
	name: 'pagination',
	type: 'int',
	mapping: 'Pagination'
},{
	name: 'hasPermission_Edit',
	type: 'boolean',
	mapping: 'HasPermission_Edit',
	convert: Boolean.toBoolean
},{
	name: 'canEdit',
	type: 'boolean',
	mapping: 'CanEdit',
	convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.stamp.Stamp);