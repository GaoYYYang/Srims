
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescend = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'operateDateTime',
    type: 'date',
    mapping: 'OperateDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'isReturn',
    type: 'bool',
    mapping: 'IsReturn',
    convert: Boolean.toBoolean
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'hasPermission_EditReturn',
    type: 'bool',
    mapping: 'HasPermission_EditReturn',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DeleteReturn',
    type: 'bool',
    mapping: 'HasPermission_DeleteReturn',
    convert: Boolean.toBoolean
}, {
    name: 'canEditReturn',
    type: 'bool',
    mapping: 'CanEditReturn',
    convert: Boolean.toBoolean
}, {
    name: 'canDeleteReturn',
    type: 'bool',
    mapping: 'CanDeleteReturn',
    convert: Boolean.toBoolean
}]);

Srims.data.Entity.apply(Srims.fund.FinanceFundDescend);
