if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundMember = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'expertNumber',
    type: 'string',
    mapping: 'ExpertNumber'
}, {
    name: 'isExpertSecondCollege',
    type: 'string',
    mapping: 'IsExpertSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'expertId',
    type: 'int',
    mapping: 'ExpertId'
}, {
    name: 'hasPermission_ResetAccountBookNumber',
    type: 'bool',
    mapping: 'HasPermission_ResetAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canResetAccountBookNumber',
    type: 'bool',
    mapping: 'CanResetAccountBookNumber',
    convert: Boolean.toBoolean
}]);

    Srims.data.Entity.apply(Srims.fund.FundMember);