/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.Performance = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'fundAllocationIn',
    type: 'int',
    mapping: 'FundAllocationIn'
}, {
    name: 'fundAllocationOverheadExpensesIn',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesIn'
}, {
    name: 'fundAllocationOverheadExpensesMiddle',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesMiddle'
}, {
    name: 'allocatedOverheadExpensesExpert',
    type: 'int',
    mapping: 'AllocatedOverheadExpensesExpert'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'isCancel',
    type: 'boolean',
    mapping: 'IsCancel',
    convert: Boolean.toBoolean
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'projectNumber',
    type: 'string',
    mapping: 'ProjectNumber'
}, {
    name: 'arrivedPerformance',
    type: 'int',
    mapping: 'ArrivedPerformance'
}, {
    name: 'descendPerformance',
    type: 'int',
    mapping: 'DescendPerformance'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'hasPermission_Censor',
    type: 'boolean',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Allocation',
    type: 'boolean',
    mapping: 'HasPermission_Allocation',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'boolean',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowAlloction',
    type: 'boolean',
    mapping: 'HasPermission_ShowAlloction',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'boolean',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocation',
    type: 'boolean',
    mapping: 'CanAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'isAllocated',
    type: 'boolean',
    mapping: 'IsAllocated',
    convert: Boolean.toBoolean
}, {
    name: 'foundationTime',
    type: 'date',
    mapping: 'FoundationTime'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}]);
    Srims.data.Entity.apply(Srims.performance.Performance);
