// ManagementFees
if (!Srims.type)
	Ext.namespace('Srims.type');

Srims.type.ManagementFees = Ext.data.Record.create([{
			name : 'id',
			type : 'int',
			mapping : 'ID'
		}, {
			name : 'type',
			type : 'string',
			mapping : 'Type'
		}, {
			name : 'fundtotal',
			type : 'int',
			mapping : 'FundTotal'
		}, {
			name : 'fee',
			type : 'int',
			mapping : 'Fee'
		}, {
			name : 'performancepay',
			type : 'int',
			mapping : 'PerformancePay'
		}, {
			name : 'remark',
			type : 'string',
			mapping : 'Remark'
		}]);
Srims.data.Entity.apply(Srims.type.ManagementFees);

Srims.type.GetAllManagementFees = Ext.data.Record.create([{
			name : 'id',
			type : 'string',
			mapping : 'ID'
		}, {
			name : 'value',
			type : 'string',
			mapping : 'Value'
		}]);
Srims.data.Entity.apply(Srims.type.GetAllManagementFees);
