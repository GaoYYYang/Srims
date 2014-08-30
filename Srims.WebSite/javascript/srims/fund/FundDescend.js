if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FundDescend = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'projectName',
	type: 'string',
	mapping: 'ProjectName'
},{
	name: 'projectPrincipalName',
	type: 'string',
	mapping: 'ProjectPrincipalName'
},{
	name: 'projectID',
	type: 'int',
	mapping: 'ProjectID'
},{
	name: 'amount',
	type: 'int',
	mapping: 'Amount'
},{
	name: 'receivedAmount',
	type: 'int',
	mapping: 'ReceivedAmount'
},{
	name: 'descendDateTime',
	type: 'date',
	mapping: 'DescendDateTime'
},{
	name: 'operator',
	type: 'string',
	mapping: 'Operator'
},{
	name: 'state',
	type: 'string',
	mapping: 'State'
},{
	name: 'financeVoucherNumber',
	type: 'string',
	mapping: 'FinanceVoucherNumber'
},{
	name: 'financeAbstract',
	type: 'string',
	mapping: 'FinanceAbstract'
},{
	name: 'hasPermission_Edit',
	type: 'bool',
	mapping: 'HasPermission_Edit',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_Censor',
	type: 'bool',
	mapping: 'HasPermission_Censor',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_Delete',
	type: 'bool',
	mapping: 'HasPermission_Delete',
	convert: Boolean.toBoolean
},{
	name: 'hasPermission_ShowAlloction',
	type: 'bool',
	mapping: 'HasPermission_ShowAlloction',
	convert: Boolean.toBoolean
},{
	name: 'canEdit',
	type: 'bool',
	mapping: 'CanEdit',
	convert: Boolean.toBoolean
},{
	name: 'canDelete',
	type: 'bool',
	mapping: 'CanDelete',
	convert: Boolean.toBoolean
},{
	name: 'canCensorPass',
	type: 'bool',
	mapping: 'CanCensorPass',
	convert: Boolean.toBoolean
},{
	name: 'canCensorReject',
	type: 'bool',
	mapping: 'CanCensorReject',
	convert: Boolean.toBoolean
},{
	name: 'canShowAllocation',
	type: 'bool',
	mapping: 'CanShowAllocation',
	convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.fund.FundDescend);