if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.StampStateHistory = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'StampID',
	type: 'int',
	mapping: 'StampID'
},{
	name: 'state',
	type: 'string',
	mapping: 'State'
},{
	name: 'operator',
	type: 'string',
	mapping: 'Operator'
},{
	name: 'remark',
	type: 'string',
	mapping: 'Remark'
},{
	name: 'dateTime',
	type: 'string',
	mapping: 'DateTime'
}]);
Srims.data.Entity.apply(Srims.stamp.StampStateHistory);