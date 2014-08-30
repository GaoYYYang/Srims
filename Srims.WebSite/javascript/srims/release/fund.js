
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.Finance = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'receivedDate',
    type: 'date',
    mapping: 'ReceivedDate'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'isInvoiced',
    type: 'bool',
    mapping: 'IsInvoiced',
    convert: Boolean.toBoolean
}, {
    name: 'invoiceType',
    type: 'string',
    mapping: 'InvoiceType'
}, {
    name: 'invoiceTime',
    type: 'date',
    mapping: 'InvoiceTime'
}, {
    name: 'invoiceNumber',
    type: 'string',
    mapping: 'InvoiceNumber'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'descendAmount',
    type: 'int',
    mapping: 'DescendAmount'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}, {
    name: 'remarks',
    type: 'string',
    mapping: 'Remarks'
}, {
    name: 'hasPermission_Show',
    type: 'bool',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'bool',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Descend',
    type: 'bool',
    mapping: 'HasPermission_Descend',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Invoice',
    type: 'bool',
    mapping: 'HasPermission_Invoice',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DeleteInvoice',
    type: 'bool',
    mapping: 'HasPermission_DeleteInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditInvoice',
    type: 'bool',
    mapping: 'HasPermission_EditInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermisson_ShowVouchers',
    type: 'bool',
    mapping: 'HasPermisson_ShowVouchers',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'bool',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'bool',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canDescend',
    type: 'bool',
    mapping: 'CanDescend',
    convert: Boolean.toBoolean
}, {
    name: 'canInvoice',
    type: 'bool',
    mapping: 'CanInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'canDeleteInvoice',
    type: 'bool',
    mapping: 'CanDeleteInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'canEditInvoice',
    type: 'bool',
    mapping: 'CanEditInvoice',
    convert: Boolean.toBoolean
}, {
    name: 'canShowVouchers',
    type: 'bool',
    mapping: 'CanShowVouchers',
    convert: Boolean.toBoolean
}]);

Srims.data.Entity.apply(Srims.fund.Finance);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.Project = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'outsourcingAlreadyAmountString',
    type: 'string',
    mapping: 'OutsourcingAlreadyAmountString'
}, {
    name: 'trueOverheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'TrueOverheadExpensesAlreadyIn'
}, {
    name: 'outsourcingPlanAmountString',
    type: 'string',
    mapping: 'OutsourcingPlanAmountString'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'recoveryvoucherNumber',
    type: 'string',
    mapping: 'RecoveryvoucherNumber'
}, {
    name: 'roverheadExpensesAmount',
    type: 'string',
    mapping: 'RoverheadExpensesAmount'
}, {
    name: 'recoveryAmount',
    type: 'string',
    mapping: 'RecoveryAmount'
}, {
    name: 'rremark',
    type: 'string',
    mapping: 'Rremark'
}, {
    name: 'recoveryPrintState',
    type: 'string',
    mapping: 'RecoveryPrintState'
}, {
    name: 'recoveryPrintDate',
    type: 'string',
    mapping: 'RecoveryPrintDate'
},
{
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'principalNumber',
    type: 'string',
    mapping: 'PrincipalNumber'
}, {
    name: 'principalEmail',
    type: 'string',
    mapping: 'PrincipalEmail'
}, {
    name: 'isPrincipalSecondCollege',
    type: 'string',
    mapping: 'IsPrincipalSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'principalCollege',
    type: 'string',
    mapping: 'PrincipalCollege'
}, {
    name: 'principalId',
    type: 'string',
    mapping: 'PrincipalID'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'subjectName',
    type: 'string',
    mapping: 'SubjectName'
}, {
    name: 'firstLevelSubjectId',
    type: 'string',
    mapping: 'FirstLevelSubjectID'
}, {
    name: 'firstLevelSubjectName',
    type: 'string',
    mapping: 'FirstLevelSubjectName'
}, {
    name: 'secondLevelSubjectId',
    type: 'string',
    mapping: 'SecondLevelSubjectID'
}, {
    name: 'secondLevelSubjectName',
    type: 'string',
    mapping: 'SecondLevelSubjectName'
}, {
    name: 'researchType',
    type: 'string',
    mapping: 'ResearchType'
}, {
    name: 'cooperationType',
    type: 'string',
    mapping: 'CooperationType'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'isSecret',
    type: 'boolean',
    mapping: 'IsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'baseId',
    type: 'string',
    mapping: 'BaseID'
}, {
    name: 'baseName',
    type: 'string',
    mapping: 'BaseName'
}, {
    name: 'principalDelegate',
    type: 'string',
    mapping: 'PrincipalDelegate'
}, {
    name: 'principalDelegateId',
    type: 'string',
    mapping: 'PrincipalDelegateID'
}, {
    name: 'creator',
    type: 'string',
    mapping: 'Creator'
}, {
    name: 'createDate',
    type: 'date',
    mapping: 'CreateDate'
}, {
    name: 'corporationPlace',
    type: 'string',
    mapping: 'CorporationPlace'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'taskComingFrom',
    type: 'string',
    mapping: 'TaskComingFrom'
}, {
    name: 'isHorizontal',
    type: 'boolean',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'rankId',
    type: 'int',
    mapping: 'RankID'
}, {
    name: 'rankName',
    type: 'string',
    mapping: 'RankName'
}, {
    name: 'typeId',
    type: 'int',
    mapping: 'TypeID'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'typeShortName',
    type: 'string',
    mapping: 'TypeShortName'
}, {
    name: 'supportCategoryId',
    type: 'int',
    mapping: 'SupportCategoryID'
}, {
    name: 'supportCategoryName',
    type: 'string',
    mapping: 'SupportCategoryName'
}, {
    name: 'supportFieldId',
    type: 'int',
    mapping: 'SupportFieldID'
}, {
    name: 'supportFieldName',
    type: 'string',
    mapping: 'SupportFieldName'
}, {
    name: 'supportSubFieldId',
    type: 'int',
    mapping: 'SupportSubFieldID'
}, {
    name: 'supportSubFieldName',
    type: 'string',
    mapping: 'SupportSubFieldName'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'fundAlreadyHardware',
    type: 'int',
    mapping: 'FundAlreadyHardware'
}, {
    name: 'fundAlreadyIn',
    type: 'int',
    mapping: 'FundAlreadyIn'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'fundAlreadyTotal',
    type: 'int',
    mapping: 'FundAlreadyTotal'
}, {
    name: 'fundContract',
    type: 'int',
    mapping: 'FundContract'
}, {
    name: 'fundFrom',
    type: 'string',
    mapping: 'FundFrom'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}, {
    name: 'fundPlanHardware',
    type: 'int',
    mapping: 'FundPlanHardware'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'fundPlanIn',
    type: 'int',
    mapping: 'FundPlanIn'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'overheadExpenseInTotal',
    type: 'int',
    mapping: 'OverheadExpenseInTotal'
}, {
    name: 'overheadExpenseOutTotal',
    type: 'int',
    mapping: 'OverheadExpenseOutTotal'
}, {
    name: 'overheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyIn'
}, {
    name: 'overheadExpensesAlreadyOut',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyOut'
}, {
    name: 'overheadExpensesInStandard',
    type: 'int',
    mapping: 'OverheadExpensesInStandard'
}, {
    name: 'performancePayStandard',
    type: 'int',
    mapping: 'PerformancePayStandard'
}, {
    name: 'fundManageProportion',
    type: 'int',
    mapping: 'FundManageProportion'	//国家规定管理费比例
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'//校内绩效工资
}, {
    name: 'performancePayAlready',
    type: 'int',
    mapping: 'PerformancePayAlready'//已分配绩效工资
}, {
    name: 'receivedOverheadExpenses',
    type: 'int',
    mapping: 'ReceivedOverheadExpenses'	//追缴单-已收管理费
}, {
    name: 'overheadExpensesAmount',
    type: 'int',
    mapping: 'OverheadExpensesAmount'	//追缴单-应收管理费
}, {
    name: 'recoveryAmount',
    type: 'int',
    mapping: 'RecoveryAmount'	//追缴金额 
}, {
    name: 'printDateTime',
    type: 'string',
    mapping: 'PrintDateTime'	//追缴单-打印时间
}, {
    name: 'isPrint',
    type: 'string',
    mapping: 'IsPrint'	//追缴单-是否已打印
}, {
    name: 'equipmentCost',
    type: 'int',
    mapping: 'EquipmentCost'
}, {
    name: 'borrowAmount',
    type: 'int',
    mapping: 'BorrowAmount'
}, {
    name: 'returnAmount',
    type: 'int',
    mapping: 'ReturnAmount'
}, {
    name: 'projectAccountNumber',
    type: 'string',
    mapping: 'ProjectAccountNumber'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_WithDraw',
    type: 'boolean',
    mapping: 'HasPermission_WithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'canWithDraw',
    type: 'boolean',
    mapping: 'CanWithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Terminate',
    type: 'boolean',
    mapping: 'HasPermission_Terminate',
    convert: Boolean.toBoolean
}, {
    name: 'canTerminate',
    type: 'boolean',
    mapping: 'CanTerminate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectMember',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMember',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectMember',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectMember',
    type: 'boolean',
    mapping: 'CanShow_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanEdit_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanShow_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectContract',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMainContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMainContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectContract',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectContract',
    type: 'boolean',
    mapping: 'CanShow_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectContract',
    type: 'boolean',
    mapping: 'CanCensor_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectDoucment',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectDoucment',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectDocument',
    type: 'boolean',
    mapping: 'CanEdit_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectDocument',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectDocument',
    type: 'boolean',
    mapping: 'CanShow_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectDocument',
    type: 'boolean',
    mapping: 'CanCensor_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canRequire_ProjectDocument',
    type: 'boolean',
    mapping: 'CanRequire_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitStart',
    type: 'boolean',
    mapping: 'CanSubmitStart',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitEnd',
    type: 'boolean',
    mapping: 'CanSubmitEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoStart',
    type: 'boolean',
    mapping: 'CanUndoStart',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoEnd',
    type: 'boolean',
    mapping: 'CanUndoEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorStart',
    type: 'boolean',
    mapping: 'CanCensorStart',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorEnd',
    type: 'boolean',
    mapping: 'CanCensorEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canSetDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanSetDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanClearDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearProjectAccountBookNumber',
    type: 'boolean',
    mapping: 'CanClearProjectAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canCompleteIn',
    type: 'boolean',
    mapping: 'CanCompleteIn',
    convert: Boolean.toBoolean
}, {
    name: 'campusIndirectCosts',
    type: 'int',
    mapping: 'CampusIndirectCosts'
}, {
    name: 'overheadExpenseMiddleTotal',
    type: 'int',
    mapping: 'OverheadExpenseMiddleTotal'
}, {
    name: 'overheadExpenseExpertTotal',
    type: 'int',
    mapping: 'OverheadExpenseExpertTotal'
}

]);
Srims.data.Entity.apply(Srims.projects.Project);
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectStore.superclass.constructor.call(this, new Srims.projects.ProjectXmlReader(), load_url, params);
    },
});

Srims.projects.ProjectSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectSimpleStore.superclass.constructor.call(this, new Srims.projects.ProjectSimpleXmlReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectXmlReader.superclass.constructor.call(this, Srims.projects.Project);
    },
    readRecords: function(responseXML){
        var result = Srims.projects.ProjectXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.fundSum = parseInt(Ext.DomQuery.selectValue("FundSum", responseXML), 10);
        result.records.fundReceivedSum = parseInt(Ext.DomQuery.selectValue("FundReceivedSum", responseXML), 10);
        
        return result;
    }
});
Srims.projects.ProjectSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectXmlReader.superclass.constructor.call(this, Srims.projects.Project);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectLevel');

Srims.projects.ProjectLevel.Perside = 'Perside';
Srims.projects.ProjectLevel.Join = 'Join';
Srims.projects.ProjectLevel.Addition = 'Addition';
Srims.projects.ProjectLevel.Coordinate='Coordinate';

Srims.projects.projectLevelRender = function(value, metadata){
    switch (value) {
        case 'Join':
            return '参与';
        case 'Perside':
            return '主持';
        case 'Addition':
            return '附加';
        case 'Coordinate':
        	return '配套';
        default:
            return '未知';
    }
}
Srims.projects.projectLevelStore = [['Perside', '主持'], ['Join', '参与'], ['Addition', '附加'],['Coordinate','配套']];

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectState');

Srims.projects.ProjectState.WaitingStartInformation = 'WaitingStartInformation';
Srims.projects.ProjectState.WaitingStartCensor = 'WaitingStartCensor';
Srims.projects.ProjectState.ProjectProcessing = 'ProjectProcessing';
Srims.projects.ProjectState.WaitingEndCensor = 'WaitingEndCensor';
Srims.projects.ProjectState.ProjectEnd = 'ProjectEnd';
Srims.projects.ProjectState.ProjectDelete = 'Deleted';
Srims.projects.ProjectState.WithDraw = 'WithDraw';
Srims.projects.ProjectState.Terminate = 'Terminate';

Srims.projects.projectStateRender = function(value, metadata){
    switch (value) {
        case 'WaitingStartInformation':
            return '填写立项信息';
        case 'WaitingStartCensor':
            return '等待立项审核';
        case 'ProjectProcessing':
            return '在研';
        case 'WaitingEndCensor':
            return '等待结项审核';
        case 'ProjectEnd':
            return '已结项';
        case 'WithDraw':
            return '撤销';
        case 'Terminate':
            return '终止';
        case 'Defer':
            return '延期';
        case 'DeferEnd':
            return '延期结题';
        default:
            return '未知';
    }
}
Srims.projects.projectStateFilterItems = [{
    id: 'WaitingStartInformation',
    text: '填写立项信息'
}, {
    id: 'WaitingStartCensor',
    text: '等待立项审核'
}, {
    id: 'ProjectProcessing',
    text: '在研'
}, {
    id: 'WaitingEndCensor',
    text: '等待结项审核'
}, {
    id: 'ProjectEnd',
    text: '已结项'
}, {
    id: 'Defer',
    text: '延期'
}, {
    id: 'DeferEnd',
    text: '延期结题'
}];

Srims.projects.projectStateStore = [['WaitingStartInformation', '填写立项信息'], ['WaitingStartCensor', '等待立项审核'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateEditStore = [['WaitingStartInformation', '填写立项信息'], ['ProjectProcessing', '在研'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateQueryStore = [['WaitingStartInformation', '未提交'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['WithDraw', '撤销'], ['Terminate', '终止'], ['Defer', '延期'], ['DeferEnd', '延期结题']];

if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.douments) 
    Ext.namespace('Srims.douments');

Srims.projects.ProjectShowPanel_ContractForm = function(projectId){
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: projectId == undefined ? 0 : projectId
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel();
    
    this._gridPanelContract = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'type',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有合同信息'
        }
    });
    Srims.projects.ProjectShowPanel_ContractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '合同信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelContract]
    });
    if (projectId) 
        this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this._gridPanelContract.on('celldblclick', onCellDblClick);
    
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_ContractForm, Ext.form.FormPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.Contract = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'contractNumber',
    type: 'string',
    mapping: 'ContractNumber'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'author',
    type: 'string',
    mapping: 'Author'
}, {
    name: 'censor',
    type: 'string',
    mapping: 'Censor'
}, {
    name: 'censorDateTime',
    type: 'date',
    mapping: 'CensorDateTime'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'submitDateTime',
    type: 'date',
    mapping: 'SubmitDateTime'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectIsHorizontal',
    type: 'boolean',
    mapping: 'ProjectIsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'projectId',
    type: 'int',
    mapping: 'ProjectId'
}, {
    name: 'contractResource',
    type: 'string',
    mapping: 'ContractResource'
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.documents.Contract);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.ContractXmlReader.superclass.constructor.call(this, Srims.documents.Contract);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.ContractStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.ContractStore.superclass.constructor.call(this, new Srims.documents.ContractXmlReader(), load_url, params);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.ContractGridPanel_ColumnModel = function(isHorizontal){
    Srims.documents.ContractGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '合同编号',
        dataIndex: 'contractNumber',
        width: 100,
        hidden: !isHorizontal
    }, {
        id: 'type',
        header: '合同类型',
        dataIndex: 'type',
        renderer: Srims.documents.contractTypeRender
    }, {
        header: '状态',
        dataIndex: 'state',
        width: 70,
        renderer: Srims.CensorState.Render
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        width: 110,
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'author',
        width: 80
    }, {
        header: '审核人',
        dataIndex: 'censor',
        width: 80
    }, {
        id: 'censorDateTime',
        header: '审核时间',
        dataIndex: 'censorDateTime',
        renderer: Date.render
    }])
};

Ext.extend(Srims.documents.ContractGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Ext.namespace('Srims.documents.ContractType');

Srims.documents.ContractType.MainContract = 'MainContract';
Srims.documents.ContractType.OutContract = 'OutContract';

Srims.documents.contractTypeRender = function(value){
    switch (value) {
        case 'MainContract':
            return '主合同';
        case 'OutContract':
            return '外协合同';
        default:
            return '未知';
    }
}
Srims.documents.contractTypeFilterItems = [{
    id: 'MainContract',
    text: '主合同'
}, {
    id: 'OutContract',
    text: '外协合同'
}];

Srims.documents.contractTypeStore = [['MainContract', '主合同'], ['OutContract', '外协合同']];
Srims.documents.contractTypeEditStore = [['MainContract', '主合同'], ['OutContract', '外协合同']];

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.submitResource = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){
    var user = Srims.currentLoginLog.user;
    
    window.formPanel.getForm().submit({
        params: saveParams,
        url: Srims.service.ResourceService + '/IsSizeable',
        failure: function(){
            if (user.userRoleType == 'Administrator' && user.isSuper) {
                Ext.MessageBox.confirm('上传文件大于100M', '上传文件大于20M，你确定要上传文件吗？', function(buttonId){
                    if (buttonId == 'yes') 
                        Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
                }, this);
            }
            else 
                Ext.Msg.show({
                    title: '不能上传文件',
                    msg: '每个文件不能大于100M，请联系超级管理员上传大于20M的文件。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
        },
        success: function(form, action){
            Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
        }
        
    });
}
Srims.documents.submitResources = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){

    window.formPanel.getForm().submit({
        params: saveParams,
        url: requestUrl,
        waitMsg: waitMsg,
        method: 'post',
        success: function(form, action){
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            if (window.store) 
                window.store.load();
            
            window.close();
        }
    });
    
}
Srims.documents.deleteResource = function(documentGuid, id, url, store, msg, msgInfo){
    var _params = {
        guid: documentGuid,
        id: id
    }
    Ext.Ajax.request({
        url: url,
        params: _params,
        success: function(){
            store.load();
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    });
}

Srims.documents.downLoadResource = function(guid, subUrl){
    var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1
    
    document.location.href = '/Service/Resource.asmx' + subUrl + '?guid=' + guid + '&isIE=' + isIE;
}



if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRank = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}]);
Srims.data.Entity.apply(Srims.type.ProjectRank);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectRankXmlReader.superclass.constructor.call(this, Srims.type.ProjectRank);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.type.ProjectRankStore.superclass.constructor.call(this, new Srims.type.ProjectRankXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectType = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isBudget',
    type: 'boolean',
    mapping: 'IsBudget',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpenseInRate',
    type: 'int',
    mapping: 'OverheadExpenseInRate'
}, {
    name: 'overheadExpenseOutRate',
    type: 'int',
    mapping: 'OverheadExpenseOutRate'
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'administration',
    type: 'string',
    mapping: 'Administration'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'bakCode',
    type: 'string',
    mapping: 'BakCode'
}, {
    name: 'perCode',
    type: 'string',
    mapping: 'PerCode'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'isExploit',
    type: 'boolean',
    mapping: 'IsExploit',
    convert: Boolean.toBoolean
}, {
    name: 'isHorizontalType',
    type: 'boolean',
    mapping: 'IsHorizontalType',
    convert: Boolean.toBoolean
}, {
    name: 'projectComingFrom',
    type: 'string',
    mapping: 'ProjectComingFrom'
}, {
    name: 'projectRankID',
    type: 'int',
    mapping: 'ProjectRankID'
}, {
    name: 'projectRank',
    type: 'string',
    mapping: 'ProjectRank'
}, {
    name: 'subjectNature',
    type: 'string',
    mapping: 'SubjectNatrue'
}, {
	name: 'managementFeesType',
	type: 'string',
	mapping: 'ManagementFeesType'
},{
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageProjectSupportField',
    type: 'boolean',
    mapping: 'HasPermission_ManageProjectSupportField',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageProjectSupportCategory',
    type: 'boolean',
    mapping: 'HasPermission_ManageProjectSupportCategory',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UploadDocumentModel',
    type: 'boolean',
    mapping: 'HasPermission_UploadDocumentModel',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canManageProjectSupportField',
    type: 'boolean',
    mapping: 'CanManageProjectSupportField',
    convert: Boolean.toBoolean
}, {
    name: 'canManageProjectSupportCategory',
    type: 'boolean',
    mapping: 'CanManageProjectSupportCategory',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectType);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectTypeXmlReader.superclass.constructor.call(this, Srims.type.ProjectType);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.type.ProjectTypeStore.superclass.constructor.call(this, new Srims.type.ProjectTypeXmlReader(), load_url, params);
    }
});

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeText = Ext.data.Record.create([{
    name: 'value',
    type: 'string',
    mapping: 'Value'
}, {
    name: 'valueSpell',
    type: 'string',
    mapping: 'ValueSpell'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}]);
Srims.data.Entity.apply(Srims.common.NoticeText);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeTextStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(url, type){
        Srims.common.NoticeTextStore.superclass.constructor.call(this, new Srims.common.NoticeTextXmlReader(), url, {
            type: type
        });
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.NoticeTextXmlReader.superclass.constructor.call(this, Srims.common.NoticeText);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel_ColumnModel = function(isFinanceManage, isExpertGuid){
    Srims.fund.FinanceGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '到款时间',
        dataIndex: 'receivedDate',
        width: 100,
        sortable: true,
        renderer: Date.render
    }, {
        header: '凭单号',
        dataIndex: 'voucherNumber',
        sortable: true,
        width: 80
    }, {
        header: '金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        width: 80,
        renderer: Money.render
    }, {
        header: '已下拨金额(万元)',
        dataIndex: 'descendAmount',
        sortable: true,
        width: 80,
        renderer: Money.render,
        hidden: isFinanceManage
    }, {
        header: '发票类型',
        dataIndex: 'invoiceType',
        sortable: true,
        width: 100
    }, {
        header: '发票时间',
        dataIndex: 'invoiceTime',
        renderer: Date.render,
        sortable: true,
        width: 80
    }, {
        header: '发票号',
        dataIndex: 'invoiceNumber',
        sortable: true,
        width: 80
    }, {
        header: '说明',
        dataIndex: 'abstract',
        width: 150
		}, {
        header: '备注',
        dataIndex: 'remarks',
        width: 150
    }])
}
Ext.extend(Srims.fund.FinanceGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel_ToolBar = function(selection, store, panelId, queryParams, isFinanceManage) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;

    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.fund.showFinanceQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>经费到帐查询</b><br/>对经费到帐信息进行复杂查询'
    });
    this._buttonNewFinance = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新经费到帐',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.newFinance(this.store);
        },
        tooltip: '<b>新经费到帐</b>'
    });

    this._buttonDescend = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-descend',
        text: '下拨/还款',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.fund.showFundDescendManageWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>下拨经费</b><br/>对所选经费进行下拨'
    });
    this._buttonShowVouchers = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-voucher',
        text: '凭单信息',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.fund.showVouchers(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看凭单信息</b><br/>查看该经费到帐信息对应的所有凭单'
    });

    this._buttonImportAuto = new Ext.Toolbar.Button({
        iconCls: 'icon-finance-auto-import',
        text: '自动从财务导入经费',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.atuoImportFinance(this.store);
        },
        tooltip: '<b>自动从财务导入经费</b>、'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入文科',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.showImportArtsWindow(this.store);
        },
        hidden: false,
        tooltip: '<b>文科项目数据导入</b><br/>将文科项目数据从excel表导入到数据库中'
    });
    this._buttonImportFinance = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入暂存',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.showImportFinanceWindow(this.store);
        },
        hidden: false,
        tooltip: '<b>暂存数据导入</b><br/>将数据从excel表导入到数据库中'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.fund.deleteFinance(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除经费到帐信息</b>'
    });
    this._buttonInvoice = new Ext.Toolbar.Button({
        iconCls: 'icon-invoice-new',
        text: '开发票',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.invoiceFinance(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>自开发票</b>、'
    });
    this._buttonEditInvoice = new Ext.Toolbar.Button({
        iconCls: 'icon-invoice-edit',
        text: '编辑发票',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.invoiceFinance(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>自开发票</b>、'
    });
    this._buttonDeleteInvoice = new Ext.Toolbar.Button({
        iconCls: 'icon-invoice-delete',
        text: '删除发票',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.deleteInvoice(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除发票</b>'
    });

    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费到帐列表'
    });

    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    var items;
    if (isFinanceManage)
        items = [this._buttonImport, this._buttonImportFinance, this._buttonQuery, this._buttonInvoice, this._buttonEditInvoice, this._buttonDeleteInvoice, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    else
        items = [this._buttonImport, this._buttonImportFinance, this._buttonQuery, this._buttonNewFinance, this._buttonImportAuto, this._buttonDescend, this._buttonShowVouchers, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    Srims.fund.FinanceGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    //initial
    this._selection.buttonDescend = this._buttonDescend;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonInvoice = this._buttonInvoice;
    this._selection.buttonEditInvoice = this._buttonEditInvoice;
    this._selection.buttonDeleteInvoice = this._buttonDeleteInvoice;
    this._selection.buttonShowVouchers = this._buttonShowVouchers;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonDescend = selection.buttonDescend;
        var buttonDelete = selection.buttonDelete;
        var buttonInvoice = selection.buttonInvoice;
        var buttonEditInvoice = selection.buttonEditInvoice;
        var buttonDeleteInvoice = selection.buttonDeleteInvoice;
        var buttonShowVouchers = selection.buttonShowVouchers;


        if (selection.getCount() == 0) {
            buttonDescend.hide();
            buttonDelete.hide();
            buttonInvoice.hide();
            buttonEditInvoice.hide();
            buttonDeleteInvoice.hide();
            buttonShowVouchers.hide();
            return;
        }

        var finance = selection.getSelected();

        buttonDescend.setVisible(finance.get('hasPermission_Descend'));

        buttonDelete.setVisible(finance.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!finance.get('canDelete'));

        buttonInvoice.setVisible(finance.get('hasPermission_Invoice'));
        buttonInvoice.setDisabled(!finance.get('canInvoice'));

        buttonDeleteInvoice.setVisible(finance.get('hasPermission_DeleteInvoice'));
        buttonDeleteInvoice.setDisabled(!finance.get('canDeleteInvoice'));

        buttonEditInvoice.setVisible(finance.get('hasPermission_EditInvoice'));
        buttonEditInvoice.setDisabled(!finance.get('canEditInvoice'));

        buttonShowVouchers.setVisible(finance.get('hasPermisson_ShowVouchers'));
        buttonShowVouchers.setDisabled(!finance.get('canShowVouchers'));
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FinanceGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceGridPanel = function(id, financeStore, title, iconCls, queryParams, isFinanceManage){

    this._store = financeStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FinanceGridPanel_ColumnModel(isFinanceManage);
    
    this._toolBar = new Srims.fund.FinanceGridPanel_ToolBar(this._selections, this._store, id, queryParams, isFinanceManage);
    this._textItemFinanceSum = new Ext.Toolbar.TextItem('');
    
    this._bbar = new Ext.PagingToolbar({
        pageSize: 40,
        store: this._store,
        displayInfo: true,
        displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
        emptyMsg: "没有可以显示的记录",
        items: [this._textItemFinanceSum]
    });
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;                                                 
    params.bbar = this._bbar;
    
    Srims.fund.FinanceGridPanel.superclass.constructor.call(this, params);
    
    this._store.on('load', function(store, records){
        if (records.financeSum == undefined || records.financeSum == null) 
            records.financeSum = records.financeDescendSum = 0;
        
        var financeSumMessage = String.format(" 总经费：<strong>{0}</strong>，已下拨经费：<strong>{1}</strong>", Money.render(records.financeSum), Money.render(records.financeDescendSum));
        Ext.get(store.gird._textItemFinanceSum.id).update(financeSumMessage);
    });
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var finance = grid.getStore().getAt(rowIndex);
        if (!isFinanceManage) 
            Srims.fund.showFundDescendManageWindow(finance, grid.getStore());
    }
}
Ext.extend(Srims.fund.FinanceGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceStore.superclass.constructor.call(this, new Srims.fund.FinanceXmlReader(), load_url, params);
    }
});
Srims.fund.FinanceSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceStore.superclass.constructor.call(this, new Srims.fund.FinanceSimpleXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceXmlReader.superclass.constructor.call(this, Srims.fund.Finance);
    },
    readRecords: function(responseXML){
        var result = Srims.fund.FinanceXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.financeSum = parseInt(Ext.DomQuery.selectValue("FinanceSum", responseXML), 10);
        result.records.financeDescendSum = parseInt(Ext.DomQuery.selectValue("FinanceDescendSum", responseXML), 10);
        
        return result;    
    }
});
Srims.fund.FinanceSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceSimpleXmlReader.superclass.constructor.call(this, Srims.fund.Finance);
    }
});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.listFinance = function(){
    Srims.fund._listFinance('FinanceList', '经费到帐计划列表', 'icon-fund-finance');
}
Srims.fund._listFinance = function(id, name, iconCls, queryParams){
    var panelId = 'FinanceGridPanel_' + id;
    var financeStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    queryParams.isDescendAll = false;
    
    if (panel) {
        financeStore = panel.getStore();
        financeStore.load();
    }
    else {
        financeStore = new Srims.fund.FinanceStore(Srims.service.fund.FinanceService + '/Query', queryParams);
        panel = new Srims.fund.FinanceGridPanel(panelId, financeStore, name, iconCls, queryParams, false);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.fund.showFinanceQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.fund.FinanceQueryWindow(id, store, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
Srims.fund.newFinance = function(store){
    var Id = "NewFinanceWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var finance = new Srims.fund.Finance({});
        var window = new Srims.fund.FinanceEditWindow(Id, finance, store);
    }
    window.show();
}
Srims.fund.deleteFinance = function(finance, store){
    Ext.MessageBox.confirm('删除经费到帐', '你确定要删除这个经费到帐信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.financeID = finance.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.fund.FinanceService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    store.load();
                }
            });
        }
    }, this);
}
Srims.fund.atuoImportFinance = function(store){
    var loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在从财务处下载数据，请耐心等待...'
    });
    loadingAnimation.show();
    
    Ext.Ajax.request({
        url: Srims.service.fund.FinanceService + '/AutoImportFinance',
        scope: this,
        success: function(){
            store.load();
            loadingAnimation.hide();
        }
    });
}
Srims.fund.showVouchers = function(finance){
    var windowId = "financeVouchersShowWindow_" + finance.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.fund.FinanceVouchersShowWindow(windowId, finance);
    
    window.show();
}

Srims.fund.showImportArtsWindow = function(store){
    var windowId = 'ArtsImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.fund.FinanceService + '/Import', '文科项目数据导入', false);
    
    window.show();
}

Srims.fund.showImportFinanceWindow = function(store) {
    var windowId = 'FinanceImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.fund.FinanceService + '/ImportFinance', '暂存数据导入', false);

    window.show();
}
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceStateStore = [['True', '已下拨完'], ['False', '未下拨完'], ['', '全部']];

Srims.fund.FinanceQueryWindow_InforPanel = function(){

    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        width: 150
    });
    this._dateFieldReceiveDateBegin = new Ext.form.DateField({
        fieldLabel: '到帐日期',
        width: 150
    });
    this._dateFieldReceiveDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._numberFieldAmountBegin = new Srims.component.MoneyField({
        fieldLabel: '经费额(万元)',
        allowNegative: false,
        width: 150
    });
    this._numberFieldAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 150
    });
    this._comboBoxIsDescendAll = new Ext.form.ComboBox({
        fieldLabel: '状态',
        store: Srims.fund.FinanceStateStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 150,
        width: 150
    });
    this._checkBoxIsInvoiced = new Ext.form.Checkbox({
        fieldLabel: '是否已开发票'
    });
    this._textFieldAbstract = new Ext.form.TextField({
        fieldLabel: '摘要',
        width: 150
    });
    var columnFirstItems = [this._textFieldVoucherNumber, this._dateFieldReceiveDateBegin, this._numberFieldAmountBegin, this._checkBoxIsInvoiced];
    var columnSecondItems = [this._comboBoxIsDescendAll, this._dateFieldReceiveDateEnd, this._numberFieldAmountEnd, this._textFieldAbstract];
    
    Srims.fund.FinanceQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 80,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 40,
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    this.buildParams = function(params){
        params.voucherNumber = this._textFieldVoucherNumber.getValue();
        params.isDescendAll = this._comboBoxIsDescendAll.getValue();
        params.isInvoiced = this._checkBoxIsInvoiced.checked ? "true" : "";
        params.amountStart = this._numberFieldAmountBegin.getMoney();
        params.amountEnd = this._numberFieldAmountEnd.getMoney();
        params.receivedDateStart = Date.format(this._dateFieldReceiveDateBegin.getValue());
        params.receivedDateEnd = Date.format(this._dateFieldReceiveDateEnd.getValue());
        params.financeAbstract = this._textFieldAbstract.getValue();
    }
    
    this.clearParams = function(){
        this._textFieldVoucherNumber.reset();
        this._comboBoxIsDescendAll.reset();
        this._numberFieldAmountBegin.reset();
        this._numberFieldAmountEnd.reset();
        this._dateFieldReceiveDateBegin.reset();
        this._dateFieldReceiveDateEnd.reset();
        this._checkBoxIsInvoiced.reset();
        this._textFieldAbstract.reset();
    }
}
Ext.extend(Srims.fund.FinanceQueryWindow_InforPanel, Ext.FormPanel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceQueryWindow = function(id, store, queryParams){

    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.fund.FinanceQueryWindow_InforPanel();
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.fund.FinanceQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费到帐查询',
        iconCls: 'icon-finance-query',
        width: 500,
        height: 197,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 500,
            layout: 'form',
            labelWidth: 90,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        this._basicPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    
    this.query = function(button){
        var window = button.window;
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.fund.FinanceQueryWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceEditWindow = function(id, finance, store){

    this._id = id;
    this._finance = finance;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        allowBlank: false,
        width: 180
    });
    this._dateFieldReceiveDate = new Ext.form.DateField({
        fieldLabel: '到帐日期',
        allowBlank: false,
        width: 180
    });
    this._numberFieldAmount = new Srims.component.MoneyField({
        fieldLabel: '经费额(万元)',
        allowNegative: false,
        allowBlank: false,
        width: 180
    });
    this._textAreaAbstract = new Ext.form.TextArea({
        fieldLabel: '说明',
        width: 180
    });
    
    Srims.fund.FinanceEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '新建经费到帐信息',
        iconCls: 'icon-new',
        width: 350,
        labelWidth: 90,
        height: 300,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._dateFieldReceiveDate, this._textFieldVoucherNumber, this._numberFieldAmount, this._textAreaAbstract],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldReceiveDate.isValid(preventMark) && result;
        result = this._textFieldVoucherNumber.isValid(preventMark) && result;
        result = this._numberFieldAmount.isValid(preventMark) && result;
        result = this._textAreaAbstract.isValid(preventMark) && result;
        
        return result;
    }
    
    this._assignValues = function(){
        this._finance.set('voucherNumber', this._textFieldVoucherNumber.getValue());
        this._finance.set('amount', this._numberFieldAmount.getMoney());
        this._finance.set('receivedDate', Date.format(this._dateFieldReceiveDate.getValue()));
        this._finance.set('abstract', this._textAreaAbstract.getValue());
        
    }
    
    this._save = function(){
        var finance = this._finance;
        finance.beginEdit();
        this._assignValues();
        finance.commit();
        
        Ext.Ajax.request({
            url: Srims.service.fund.FinanceService + '/Save',
            params: finance.data,
            scope: this,
            success: function(){
                this._store.load();
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.fund.FinanceEditWindow, Ext.Window, {})


if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceShowForm = function(finance, isBorrow){

    this._finance = finance;
    
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '金额',
        value: Money.render(finance.get('amount')),
        readOnly: true,
        width: 160
    });
    this._textFieldReceivedTime = new Ext.form.TextField({
        fieldLabel: '到帐时间',
        value: Date.render(finance.get('receivedDate')),
        readOnly: true,
        width: 160
    });
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        value: finance.get('voucherNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '描述',
        value: finance.get('abstract'),
        readOnly: true,
        width: 300
    });
    this._textFieldIsBorrowReamrk = new Ext.form.TextField({
        fieldLabel: '特别说明：',
        value: '此经费来源于借款',
        readOnly: true,
        width: 300
    });
    var columnFirstItems = [this._textFieldReceivedTime, this._textFieldAmount];
    var columnSecondItems = [this._textFieldVoucherNumber];
    
    Srims.fund.FinanceShowForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: isBorrow ? [this._textFieldIsBorrowReamrk] : [new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 400,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldRemark]
    });
    
    this.resetComponnentsValue = function(finance){
        this._textFieldAmount.setValue(Money.render(finance.get('amount')));
        this._textFieldReceivedTime.setValue(Date.render(finance.get('receivedDate')));
        this._textFieldVoucherNumber.setValue(finance.get('voucherNumber'));
        this._textFieldRemark.setValue(finance.get('abstract'));
    }
}

Ext.extend(Srims.fund.FinanceShowForm, Ext.form.FormPanel, {});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.listWaitingAlloactionFundDescend_Horizontal = function(){
    Srims.fund.listFundDescend('fundDescendGridPanel_WaitingAllocation_Horizontal', '横向未分配经费列表', 'icon-fund-waiting-allocation-horizontal-project', true, Srims.fund.fundDescendState.Passed, undefined, undefined, true);
}
Srims.fund.listWaitingAlloactionFundDescend_vertical = function(){
    Srims.fund.listFundDescend('fundDescendGridPanel_WaitingAllocation_Vertical', '纵向未分配经费列表', 'icon-fund-waiting-allocation-vertical-project', false, Srims.fund.fundDescendState.Passed, undefined, undefined, true);
}
Srims.fund.listWaitingCensorFundDescend_Horizontal = function(){
    Srims.fund.listFundDescend('fundDescendGridPanel_WaitingCensor_Horizontal', '横向待审核经费下拨列表', 'icon-project-horizontal-censor-fund-descend', true, Srims.fund.fundDescendState.WaitingCensor, undefined, undefined, true);
}
Srims.fund.listFundBorrow_UnCompleteReturn = function(){
    Srims.fund.listFundDescend('FundBorrow_UnCompleteReturn', '未完成还款的借款记录', 'icon-fund-lent', undefined, undefined, undefined, true, false);
}
Srims.fund.listMyFundDesend = function(){
    Srims.fund.listFundDescend('myFundDescendGridPanel', '未分配经费列表', 'icon-expert-fund-allocation', undefined, Srims.fund.fundDescendState.Passed, undefined, undefined, true);
}
Srims.fund.listMyPerformanceDesend = function() {
    Srims.fund.listPerformanceDescend('myPerformanceDescendGridPanel', '未分配课题组间接费用及绩效列表', 'icon-expert-fund-allocation', undefined, Srims.fund.fundDescendState.Passed, undefined, undefined, true);
}
Srims.fund.listMyDescendFund = function(){
    Srims.fund.listFundDescend('myDescendFundGridPanel', '我下拨但未分配的经费列表', 'icon-my-descend-fund', undefined, undefined, true, undefined, true);
}

Srims.fund.listFundDescend = function(panelId, title, iconcls, isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn, isShowFinanceInfo){
    var fundDescendStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    var isBorrow = isBorrow_UnCompleteReturn == undefined ? false : true;
    var isCensor = state == Srims.fund.fundDescendState.WaitingCensor ? true : false;
    
    if (!panel) {
        queryParams = getFundDeacendQueryParams(isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn);
        fundDescendStore = new Srims.fund.FundDescendStore(Srims.service.fund.FundDescendService + '/Query', queryParams);
        panel = new Srims.fund.FundDescendGridPanel(panelId, fundDescendStore, title, iconcls, queryParams, isBorrow, isExpertDescend, isCensor, isShowFinanceInfo);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
    if (panel) 
        fundDescendStore = panel.getStore();
}
Srims.fund.listPerformanceDescend = function(panelId, title, iconcls, isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn, isShowFinanceInfo) {
//    var fundDescendStore = undefined;
//    var panel = Srims.WorkSpace.active(panelId);
//    var queryParams = {};
//    var isBorrow = isBorrow_UnCompleteReturn == undefined ? false : true;
//    var isCensor = state == Srims.fund.fundDescendState.WaitingCensor ? true : false;

//    if (!panel) {
//        queryParams = getFundDeacendQueryParams(isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn);
//        fundDescendStore = new Srims.fund.FundDescendStore(Srims.service.fund.FundDescendService + '/Query', queryParams);
//        panel = new Srims.fund.FundDescendGridPanel(panelId, fundDescendStore, title, iconcls, queryParams, isBorrow, isExpertDescend, isCensor, isShowFinanceInfo);
//        panel.getStore().load();

//        Srims.WorkSpace.addPanel(panel);
//    }
//    if (panel)
//        fundDescendStore = panel.getStore();
}
function getFundDeacendQueryParams(isHorizontal, state, isExpertDescend, isBorrow_UnCompleteReturn){
    var params = {};
    
    if (state != undefined) 
        params.fundDescendState = state;
    if (isHorizontal != undefined) 
        params.isHorizontal = isHorizontal;
    if (isExpertDescend != undefined) 
        params.isExpertDescend = isExpertDescend;
    if (isBorrow_UnCompleteReturn != undefined) 
        params.isBorrow_UnCompleteReturn = isBorrow_UnCompleteReturn;
    
    return params;
}

Srims.fund.showFundDescendQueryWindow = function(id, store, queryParams, isBorrow, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.fund.FundDescendQueryWindow(id, store, queryParams, isBorrow);
    }
    gridPanel.queryWindow = window;
    window.show();
    
    new Ext.KeyMap(id, {
        key: 13,
        scope: this,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
Srims.fund.showFundDescendManageWindow = function(finance, store){
    var id = 'FundDescendManageWindow' + finance.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.fund.FundDescendManageWindow(id, finance, store);
    window.show();
}
Srims.fund.newFundDescend = function(finance, store, manageWindow){
    var Id = "NewFundDescendWindow" + finance.get('id');
    var window = Ext.getCmp(id);
    if (!window) {
        var fundDescend = new Srims.fund.FundDescend({});
        var window = new Srims.fund.FundDescendWindow(Id, finance, fundDescend, store, manageWindow, false);
    }
    window.show();
}
Srims.fund.editFundDescend = function(fundDescend, store){
    var Id = "editFundDescendWindow" + fundDescend.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.fund.FundDescendWindow(Id, store.finance, fundDescend, store, store.window, false);
    window.show();
}
Srims.fund.newBatchFundDescend = function(finance, store, manageWindow){
    var Id = "NewBatchFundDescendWindow" + finance.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.fund.FundBatchDescendWindow(Id, finance, store, manageWindow);
    
    window.show();
}
Srims.fund.fundDescend_delete = function(fundDescend, store){
    Srims.fund.FundDescend_ChangeState(fundDescend, store, '', '/Delete', '经费下拨删除成功', '成功删除选定的经费下拨');
}
Srims.fund.FundDesend_CenorPass = function(fundDescend, store){
    Srims.fund.FundDescend_ChangeState(fundDescend, store, '', '/CensorPass', '经费下拨审核通过成功', '成功审核通过选定的经费下拨');
}
Srims.fund.showFundDescendCensorRejectWindow = function(fundDescend, store){
    var Id = "FundDescendCensorRejectWindow" + fundDescend.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.fund.FundDescendCensorRejectWindow(Id, fundDescend, store);
    window.show();
}
Srims.fund.FundDescend_CensorReject = function(fundDescend, store, remark){
    Srims.fund.FundDescend_ChangeState(fundDescend, store, remark, '/CensorReject', '经费下拨审核驳回成功', '成功审核驳回选定的经费下拨');
}
Srims.fund.FundDescend_ChangeState = function(fundDescend, store, remark, subUrl, title, msg){
    Ext.Ajax.request({
        url: Srims.service.fund.FundDescendService + subUrl,
        params: {
            fundDescendId: fundDescend.get('id'),
            remark: remark
        },
        scope: this,
        success: function(response){
            Ext.Msg.show({
                title: title,
                msg: msg,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            Srims.fund.FundDescendCallBack(store.window, response, store, undefined, true);
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundDescend);
        }
    });
}
Srims.fund.FundDescendCallBack = function(manageWindow, response, store, window, isStartPoll){

    if (manageWindow) {
        var financeStore = new Ext.data.Store({
            data: response.responseXML,
            reader: new Srims.fund.FinanceSimpleXmlReader()
        });
        var currentFinace = financeStore.getAt(0);
        manageWindow._fundDescendManageWindow_FinanceInfoPanel.resetComponentValues(currentFinace);
        manageWindow.resetButtonVisibleAndDisabled(currentFinace);
    }
    
    if (store) 
        store.load();
    
    if (window) 
        window.close();
    
    if (isStartPoll) {
        Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend);
        Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend);
    }
}

Srims.fund.newFundLent = function(store){
    var Id = "NewLentMoneyWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var fundDescend = new Srims.fund.FundDescend({});
        var window = new Srims.fund.FundDescendWindow(Id, undefined, fundDescend, store, undefined, true);
    }
    window.show();
}

Srims.fund.NewFundReturn = function(finance, store, manageWindow, project){
    var Id = "NewFundDescend_ReturnWindow" + finance.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.fund.FundDescend_ReturnWindow(Id, finance, store, manageWindow, project);
    
    window.show();
}
Srims.fund.deleteFundReturn = function(fundReturn, store){
    Ext.Ajax.request({
        url: Srims.service.fund.FinanceFundDescendService + '/Delete',
        params: {
            financeFundDescendId: fundReturn.get('id')
        },
        scope: this,
        success: function(response){
            store.load();
            Ext.Msg.show({
                title: '成功删除还款记录',
                msg: '成功删除选定的还款记录',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            var financeStore = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.fund.FinanceSimpleXmlReader()
            });
            var currentFinace = financeStore.getAt(0);
            var window = store.window;
            window._fundDescendManageWindow_FinanceInfoPanel.resetComponentValues(currentFinace);
        }
    });
}
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
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendGridPanel = function(id, fundDescendStore, title, iconCls, queryParams, isBorrow, isExpert, isCensor, isShowFinanceInfo){

    this._store = fundDescendStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FundDescendGridPanel_ColumnModel(isBorrow, false, isShowFinanceInfo);
    
    this._toolBar = new Srims.fund.FundDescendGridPanel_ToolBar(this._selections, this._store, id, queryParams, false, isBorrow, isExpert, isCensor);
    
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.fund.FundDescendGridPanel.superclass.constructor.call(this, params);
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundDescend = grid.getStore().getAt(rowIndex);
        Srims.fund.showFundAllocationInfoByFundDescend(fundDescend);
    }
}
Ext.extend(Srims.fund.FundDescendGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendGridPanel_ToolBar = function(selection, store, panelId, queryParams, isDescendPage, isBorrow, isExpert, isCensor){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.fund.showFundDescendQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, isBorrow, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>经费下拨查询</b><br/>对经费下拨信息进行查询'
    });
    this._buttonDescend = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-descend',
        text: '经费查询与下拨',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.expertGuide.showFundDescendProcessPanel();
        },
        hidden: !isExpert,
        tooltip: '<b>下拨经费</b><br/>对所选经费进行下拨'
    });
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">经费下拨信息</b>',
        minWidth: 60
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.fund.editFundDescend(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑经费下拨</b><br/>编辑选中经费下拨信息'
    });
    this._buttonAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            var user = Srims.currentLoginLog.user;
            if (user.userRoleType == 'Administrator') {
                Srims.fund.showFundAllocationInfoByFundDescend(this.selection.getSelected());
                //从经费下拨上直接点分配
                var window = this.store.window;
                if (window) 
                    window.hide();
            }
            else
                Srims.fund.showFundAllocationInfoByFundDescend(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>分配经费</b><br/>对所选经费下拨进行分配'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除经费下拨', '你确定要删除这个经费下拨吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.fund.fundDescend_delete(this.selection.getSelected(), this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除经费下拨</b><br/>删除选中的经费下拨'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('审核通过经费下拨', '你确定要审核通过这个经费下拨吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.fund.FundDesend_CenorPass(this.selection.getSelected(), this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过经费下拨</b><br/>如果不能审核通过，可能的原因为：对应的经费到帐已经被下拨过，请查看对应的经费到帐的下拨信息'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.fund.showFundDescendCensorRejectWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>审核驳回经费下拨</b>'
    });
    this._buttonLent = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-lent',
        text: '借款',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.fund.newFundLent(store);
        },
        tooltip: '<b>借款</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费下拨列表'
    });
    
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token', 'isStaticstics', 'fundDescendState', 'isHorizontal', 'isExpertDescend'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    
    var user = Srims.currentLoginLog.user;
    var items = [this._buttonQuery, this._buttonDescend, this._buttonHeader, this._buttonLent, this._buttonAllocation, this._buttonEdit, this._buttonDelete];
    
    if (user.userRoleType == 'Administrator') {
        items[items.length] = this._buttonCensorPass;
        items[items.length] = this._buttonCensorReject;
    }
    items[items.length] = new Ext.Toolbar.Fill();
    items[items.length] = this._buttonRefresh;
    items[items.length] = this._buttonReset;
    
    Srims.fund.FundDescendGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    
    this._buttonQuery.setVisible(isDescendPage == false);
    this._buttonReset.setVisible(isDescendPage == false);
    this._buttonLent.setVisible(isBorrow == true);
    
    this._buttonHeader.setVisible(isDescendPage);
    
    //initial
    this._selection.buttonAllocation = this._buttonAllocation;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonAllocation = selection.buttonAllocation;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonAllocation.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        var fundDescend = selection.getSelected();
        
        buttonAllocation.setVisible(fundDescend.get('hasPermission_ShowAlloction') && (!isCensor || isDescendPage));
        buttonAllocation.setDisabled(!fundDescend.get('canShowAllocation'));
        
        buttonCensorPass.setVisible(fundDescend.get('hasPermission_Censor') && isCensor == true);
        buttonCensorPass.setDisabled(!fundDescend.get('canCensorPass'));
        
        buttonCensorReject.setVisible(fundDescend.get('hasPermission_Censor') && isCensor == true);
        buttonCensorReject.setDisabled(!fundDescend.get('canCensorReject'));
        
        buttonEdit.setVisible(fundDescend.get('hasPermission_Edit') && isDescendPage == true);
        buttonEdit.setDisabled(!fundDescend.get('canEdit'));
        
        buttonDelete.setVisible(fundDescend.get('hasPermission_Delete') && (isDescendPage == true || isBorrow == true || isExpert == true));
        buttonDelete.setDisabled(!fundDescend.get('canDelete'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FundDescendGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FundDescendGridPanel_ColumnModel = function(isBorrow, isNotNeedProjectName, isShowFinanceInfo) {
	Srims.fund.FundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: 'id',
		dataIndex: 'ID',
		sortable: false,
		hidden: true
	},{
		header: isBorrow ? '借款项目' : '下拨项目',
		dataIndex: 'projectName',
		sortable: false,
		hidden: isNotNeedProjectName,
		width: 300
	},{
		header: '项目负责人',
		dataIndex: 'projectPrincipalName',
		sortable: false,
		hidden: isNotNeedProjectName
	},{
		header: isBorrow ? '借款金额（万元）' : '下拨金额(万元)',
		dataIndex: 'amount',
		sortable: true,
		renderer: Money.render
	},{
		header: '经费凭单号',
		dataIndex: 'financeVoucherNumber',
		sortable: false,
		hidden: !isShowFinanceInfo
	},{
		header: '经费说明',
		dataIndex: 'financeAbstract',
		sortable: false,
		hidden: !isShowFinanceInfo,
		width: 200
	},{
		header: isBorrow ? '借款时间' : '下拨时间',
		dataIndex: 'descendDateTime',
		sortable: true,
		renderer: Date.render
	},{
		header: isBorrow ? '已还金额' : '实到金额(万元)',
		dataIndex: 'receivedAmount',
		sortable: true,
		renderer: Money.render
	},{
		id: 'operator',
		header: isBorrow ? '借款人' : '下拨人',
		dataIndex: 'operator'
	},{
		header: '当前状态',
		dataIndex: 'state',
		renderer: Srims.fund.fundDescendStateRender
	}])
}
Ext.extend(Srims.fund.FundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundDescendState');

Srims.fund.fundDescendState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundDescendState.Reject = 'Reject';
Srims.fund.fundDescendState.Passed = 'Passed';
Srims.fund.fundDescendState.AllocationCompleted = 'AllocationCompleted';

Srims.fund.fundDescendStateRender = function(value){
    switch (value) {
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '待分配';
        case 'AllocationCompleted':
            return '分配完成';
        default:
            return '未知';
    }
}

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundDescendStore.superclass.constructor.call(this, new Srims.fund.FundDescendXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundDescendXmlReader.superclass.constructor.call(this, Srims.fund.FundDescend);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendQueryWindow = function(id, store, queryParams, isBorrow){

    this._id = id;
    this._store = store;
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            this.window.buildParams();
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    this._textFieldProjectName = new Ext.form.TextField({
        fieldLabel: isBorrow ? '借款项目' : '下拨项目',
        width: 300
    });
    this._dateFieldDescendDateBegin = new Ext.form.DateField({
        fieldLabel: isBorrow ? '借款日期' : '下拨日期',
        width: 130
    });
    this._dateFieldDescendDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 130
    });
    this._numberFieldDescendAmountBegin = new Srims.component.MoneyField({
        fieldLabel: isBorrow ? '借款金额(万元)' : '下拨金额(万元)',
        allowNegative: false,
        width: 130
    });
    this._numberFieldDescendAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 130
    });
    
    var columnFirstItems = [this._dateFieldDescendDateBegin, this._numberFieldDescendAmountBegin];
    var columnSecondItems = [this._dateFieldDescendDateEnd, this._numberFieldDescendAmountEnd];
    
    Srims.fund.FundDescendQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isBorrow ? '借款查询' : '经费下拨查询',
        iconCls: 'icon-query',
        width: 500,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            border: false,
            frame: true,
            height: 140,
            items: [this._textFieldProjectName, new Ext.Panel({
                layout: 'column',
                items: [new Ext.Panel({
                    width: 240,
                    layout: 'form',
                    labelWidth: 90,
                    items: columnFirstItems
                }), new Ext.Panel({
                    layout: 'form',
                    labelWidth: 20,
                    items: columnSecondItems
                })]
            })]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.buildParams = function(){
        queryParams.ProjectName = this._textFieldProjectName.getValue();
        queryParams.DescendAmountStart = this._numberFieldDescendAmountBegin.getMoney();
        queryParams.DescendAmountEnd = this._numberFieldDescendAmountEnd.getMoney();
        queryParams.DescendDateTimeStart = Date.format(this._dateFieldDescendDateBegin.getValue());
        queryParams.DescendDateTimeEnd = Date.format(this._dateFieldDescendDateEnd.getValue());
    }
    this.clearParams = function(){
        this._textFieldProjectName.reset();
        this._numberFieldDescendAmountBegin.reset();
        this._numberFieldDescendAmountEnd.reset();
        this._dateFieldDescendDateBegin.reset();
        this._dateFieldDescendDateEnd.reset();
    }
    this.query = function(button, e){
        var window = button.window;
        window.buildParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.fund.FundDescendQueryWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow = function(id, finance, store){

    this._id = id;
    this._finance = finance;
    
    this._fundDescendManageWindow_FinanceInfoPanel = new Srims.fund.FundDescendManageWindow_FinanceInfoPanel(finance);
    this._fundDescendManageWindow_FundDescendPanel = new Srims.fund.FundDescendManageWindow_FundDescendPanel(finance, this);
    this._fundDescendManageWindow_FundReturnPanel = new Srims.fund.FundDescendManageWindow_FundReturnPanel(finance, this);
    this._fundDescendManageWindow_MessagePanel = new Srims.fund.FundDescendManageWindow_MessagePanel();
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    this._buttonDescend = new Ext.Button({
        minWidth: 80,
        text: '下 拨',
        disabled: !this._finance.get('canDescend'),
        hidden: !this._finance.get('hasPermission_Descend'),
        window: this,
        handler: function(){
            var window = this.window;
            Srims.fund.newFundDescend(finance, window._fundDescendManageWindow_FundDescendPanel._gridPanelFundDescend.getStore(), window);
        }
    });
    this._buttonBatchDescend = new Ext.Button({
        minWidth: 80,
        text: '批量下拨',
        disabled: !this._finance.get('canDescend'),
        hidden: !this._finance.get('hasPermission_Descend'),
        window: this,
        handler: function(){
            var window = this.window;
            Srims.fund.newBatchFundDescend(finance, window._fundDescendManageWindow_FundDescendPanel._gridPanelFundDescend.getStore(), window);
        }
    });
    
    var user = Srims.currentLoginLog.user;
    this._buttonReturn = new Ext.Button({
        minWidth: 80,
        text: '还 款',
        window: this,
        disabled: !this._finance.get('canDescend'),
        hidden: !user.HasPermissionFundReturn,
        handler: function(){
            var window = this.window;
            Srims.fund.NewFundReturn(finance, window._fundDescendManageWindow_FundReturnPanel._gridPanelFinanceFundDescend.getStore(), window, undefined);
        }
    });
    
    Srims.fund.FundDescendManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费下拨管理',
        iconCls: 'icon-fund-descend-Manage',
        width: 900,
        height: 580,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [this._fundDescendManageWindow_MessagePanel, this._fundDescendManageWindow_FinanceInfoPanel, this._fundDescendManageWindow_FundDescendPanel, this._fundDescendManageWindow_FundReturnPanel],
        buttons: [this._buttonDescend, this._buttonBatchDescend, this._buttonReturn, this._buttonClose]
    });
    
    this.resetButtonVisibleAndDisabled = function(currentFinance){
        this._buttonDescend.setVisible(currentFinance.get('hasPermission_Descend'));
        this._buttonDescend.setDisabled(!currentFinance.get('canDescend'));
        
        this._buttonBatchDescend.setVisible(currentFinance.get('hasPermission_Descend'));
        this._buttonBatchDescend.setDisabled(!currentFinance.get('canDescend'));
        
        this._buttonReturn.setVisible(user.HasPermissionFundReturn);
        this._buttonReturn.setDisabled(!currentFinance.get('canDescend'));
    }
    this.on('hide', function(){
        store.load();
    })
}
Ext.extend(Srims.fund.FundDescendManageWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundDescendManageWindow_FinanceInfoPanel = function(finance){

    this._finance = finance;
    
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        value: finance.get('voucherNumber'),
        width: 150,
        readOnly: true
    });
    this._dateFieldReceiveDate = new Ext.form.TextField({
        fieldLabel: '到帐日期',
        value: Date.render(finance.get('receivedDate')),
        readOnly: true,
        width: 150
    });
    this._numberFieldAmount = new Ext.form.TextField({
        fieldLabel: '到帐金额',
        value: Money.render(finance.get('amount')),
        readOnly: true,
        width: 150
    });
    this._numberFieldDescendAmount = new Ext.form.TextField({
        fieldLabel: '已下拨金额',
        value: Money.render(finance.get('descendAmount')),
        readOnly: true,
        width: 150
    });
    this._textAreaAbstract = new Ext.form.TextField({
        fieldLabel: '说明',
        value: finance.get('abstract'),
        readOnly: true,
        width: 350
    });
    this._checkboxIsInvoiced = new Ext.form.Checkbox({
        fieldLabel: '是否开发票',
        checked: finance.get('isInvoiced'),
        readOnly: true
    });
    this._textFieldInvoiceTime = new Ext.form.TextField({
        fieldLabel: '开发票时间',
        value: finance.get('invoiceTime'),
        width: 150,
        readOnly: true
    });
    this._textFieldInvoiceType = new Ext.form.TextField({
        fieldLabel: '发票类型',
        value: finance.get('invoiceType'),
        width: 150,
        readOnly: true
    });
    this._textFieldInvoiceNumber = new Ext.form.TextField({
        fieldLabel: '发票号',
        value: finance.get('invoiceNumber'),
        width: 150,
        readOnly: true
    });
    this._toolBar = new Srims.fund.FundDescendManageWindow_FinanceInfoPanel_ToolBar(finance, this);
    
    var columnOneItems = [this._textFieldVoucherNumber, this._numberFieldAmount, this._textFieldInvoiceNumber];
    var columnTowItems = [this._dateFieldReceiveDate, this._checkboxIsInvoiced, this._textFieldInvoiceType];
    var columnthreeItems = [this._numberFieldDescendAmount, this._textFieldInvoiceTime];
    Srims.fund.FundDescendManageWindow_FinanceInfoPanel.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 70,
        tbar: this._toolBar,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 280,
                labelWidth: 70,
                layout: 'form',
                items: columnOneItems
            }), new Ext.Panel({
                width: 280,
                labelWidth: 70,
                layout: 'form',
                items: columnTowItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 70,
                items: columnthreeItems
            })]
        }), this._textAreaAbstract]
    });
    
    this.resetComponentValues = function(currentfinance){
        this._numberFieldDescendAmount.setValue(Money.render(currentfinance.get('descendAmount')));
        this._checkboxIsInvoiced.setValue(currentfinance.get('isInvoiced'));
        this._textFieldInvoiceTime.setValue(currentfinance.get('invoiceTime'));
        this._textFieldInvoiceType.setValue(currentfinance.get('invoiceType'));
        this._textFieldInvoiceNumber.setValue(currentfinance.get('invoiceNumber'));
    }
}
Ext.extend(Srims.fund.FundDescendManageWindow_FinanceInfoPanel, Ext.form.FormPanel, {})


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow_FinanceInfoPanel_ToolBar = function(finance, window){
    //fields
    this._finance = finance;
    this._window = window;
    
    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">经费到帐基本信息</b>',
        minWidth: 60
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        window: this._window,
        finance: this._finance,
        handler: function(){
            var store = new Srims.fund.FinanceSimpleStore(Srims.service.fund.FinanceService + '/GetByID', {
                financeId: this.finance.get('id')
            });
            store.window = this.window;
            store.on('load', function(){
                var currentfinance = this.getAt(0);
                this.window.resetComponentValues(currentfinance);
            })
            store.load();
        },
        tooltip: '<b>刷新经费到帐</b><br/>更新经费到帐信息'
    })
    
    
    var items = [this._buttonHeader, new Ext.Toolbar.Fill(), this._buttonRefresh];
    
    Srims.fund.FundDescendManageWindow_FinanceInfoPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
}
Ext.extend(Srims.fund.FundDescendManageWindow_FinanceInfoPanel_ToolBar, Ext.Toolbar);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow_FundDescendPanel = function(finance, window){

    this._project = finance;
    params = {
        financeId: finance.get('id')
    }
    this._store = new Srims.fund.FundDescendStore(Srims.service.fund.FundDescendService + '/GetByFinance', params);
    this._store.window = window;
    this._store.finance = finance;
    
    this._columnModel = new Srims.fund.FundDescendGridPanel_ColumnModel(false, false, false);
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.fund.FundDescendGridPanel_ToolBar(this._selections, this._store, undefined, undefined, true, false, false, true);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.height = 160;
    params.tbar = this._toolBar;
    params.defaultBBar = false;
    
    this._gridPanelFundDescend = new Srims.component.GridPanel(params);
    
    Srims.fund.FundDescendManageWindow_FundDescendPanel.superclass.constructor.call(this, {
        collapsible: true,
        title: '',
        frame: true,
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: false,
        items: [this._gridPanelFundDescend]
    });
    this._store.load();
    
    this._gridPanelFundDescend.window = window;
    this._gridPanelFundDescend.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundDescend = grid.getStore().getAt(rowIndex);
        Srims.fund.showFundAllocationInfoByFundDescend(fundDescend);
        window.hide();
    }
}
Ext.extend(Srims.fund.FundDescendManageWindow_FundDescendPanel, Ext.FormPanel, {});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow_FundReturnPanel = function(finance, window){

    this._project = finance;
    params = {
        financeId: finance.get('id')
    }
    this._store = new Srims.fund.FinanceFundDescendStore(Srims.service.fund.FinanceFundDescendService + '/GetByFinance', params);
    this._store.window = window;
    this._columnModel = new Srims.fund.FinanceFundDescendGridPanel_ColumnModel(false, false);
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.fund.FinanceFundDescendGridPanel_ToolBar(this._selections, this._store, undefined, undefined, true);
    
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.height = 125;
    params.tbar = this._toolBar;
    params.defaultBBar = false;
    
    this._gridPanelFinanceFundDescend = new Srims.component.GridPanel(params);
    
    Srims.fund.FundDescendManageWindow_FundReturnPanel.superclass.constructor.call(this, {
        collapsible: true,
        title: '',
        frame: true,
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: false,
        items: [this._gridPanelFinanceFundDescend]
    });
    this._store.load();
}
Ext.extend(Srims.fund.FundDescendManageWindow_FundReturnPanel, Ext.FormPanel, {});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendManageWindow_MessagePanel = function(){
    Srims.fund.FundDescendManageWindow_MessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">注意：如果这个经费到帐信息有未审核的经费下拨，强烈建议您先审核后下拨</span>'
    });
}
Ext.extend(Srims.fund.FundDescendManageWindow_MessagePanel, Ext.Panel);

if (!Srims.fund)
    Ext.namespace('Srims.fund');
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.fund.FundDescendWindow = function(id, finance, fundDescend, store, manageWindow, isLent) {

    this._id = id;
    this._store = store;
    this._finance = finance;
    this._fundDescend = fundDescend;
    this._manageWindow = manageWindow;

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });

    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: isLent ? '借款项目' : '下拨项目',
        value: this._fundDescend.get('projectName'),
        selectEntityId: this._fundDescend.get('projectID'),
        allowBlank: false,
        isReturn: false,
        width: 300
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: isLent ? '借款金额(万元)' : '下拨金额(万元)',
        value: this._fundDescend.get('amount'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });

    Srims.fund.FundDescendWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isLent ? '项目借款' : '经费下拨',
        width: 440,
        height: 160,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxProject, this._numberFieldFundAmount],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.validateFundAmount = function() {
        var finance = this.window._finance;
        var fundDescend = this.window._fundDescend;

        if (this.getMoney() <= 0) {
            this.invalidText = '下拨金额必须大于0';
            return false;
        }
        if (isLent)
            return true;

        var financeUndescendAmount = fundDescend.isNew() ? (finance.get('amount') - finance.get('descendAmount')) : (finance.get('amount') - finance.get('descendAmount') + fundDescend.get('amount'));
        if (this.getMoney() > financeUndescendAmount) {
            this.invalidText = '下拨金额不能大于经费到帐信息的未下拨金额';
            return false;
        }

        return true;
    }

    this._numberFieldFundAmount.window = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;

    this.validate = function(preventMark) {
        var result = true;

        result = this._comboBoxProject.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;

        return result;
    }
    this.assginValues = function(params) {
        params.projectID = this._comboBoxProject.getSelectEntityId();
        params.amount = this._numberFieldFundAmount.getMoney();
        params.isLent = isLent;

        if (!isLent)
            params.financeId = this._finance.get('id');
        if (!this._fundDescend.isNew())
            params.FundDescendId = this._fundDescend.get('id');
        if (!this._fundDescend.isNew() && this._fundDescend.get('projectID') != this._comboBoxProject.getSelectEntityId())
            params.oldProjectId = this._fundDescend.get('projectID');
    }
    this.save = function() {
        var params = {};
        this.assginValues(params);

        Ext.Ajax.request({
            url: Srims.service.fund.FundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(response) {
                Srims.fund.FundDescendCallBack(this._manageWindow, response, store, this, true);
            }

        });
    }
    this.buttonSave_click = function(button, e) {
        var window = button.window;

        if (!window.validate(false))
            return;

        var store = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/GetById', {
            projectId: window._comboBoxProject.getSelectEntityId()
        });
        store.numberFieldFundAmount = window._numberFieldFundAmount;

        store.on('load', function() {
            var project = this.getAt(0);
            var numberFieldFundAmount = this.numberFieldFundAmount;
            var isChangeProject = !fundDescend.isNew() && project.get('id') != fundDescend.get('projectID');
            var projectCanFundDescendAmount;

            if (fundDescend.isNew() || isChangeProject)
                projectCanFundDescendAmount = project.get('fundCanDescend');
            else
                projectCanFundDescendAmount = project.get('fundCanDescend') + fundDescend.get('amount');

            if (numberFieldFundAmount.getMoney() > projectCanFundDescendAmount) {
                Ext.Msg.show({
                    title: '经费下拨错误',
                    msg: '下拨金额不能大于项目的未下拨金额',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return;
            }
            //加入三四级外协公司控制

            var paramsProjectID = {};
            paramsProjectID.projectID = window._comboBoxProject.getSelectEntityId();

            Ext.Ajax.request({
                url: Srims.service.fund.FundDescendService + '/GetOutsourcingAmountByProject',
                params: paramsProjectID,
                scope: this,
                success: function(response) {
                    var outsourcingAmount = parseInt(response.responseText);
                    if (outsourcingAmount < 0)
                        outsourcingAmount = 0;
                    projectCanFundDescendAmount = project.get('fundPlanIn') - project.get('fundAlreadyIn') + outsourcingAmount;
                    if (numberFieldFundAmount.getMoney() > projectCanFundDescendAmount) {
                        Ext.Msg.show({
                            title: '经费下拨警告',
                            msg: '因该项目存在三级或四级外协公司，最多可以下拨' + Money.render(projectCanFundDescendAmount) + '。',
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.WARNING
                        });
                        //暂时屏蔽控制，只提示。
                        //return;
                    }
                    button.setText('正在保存');
                    button.disable();

                    window.save();
                }
            });


        })
        store.load();
    }

    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.FundDescendWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendCensorRejectWindow = function(id, fundDescend, store){

    this._id = id;
    this._fundDescend = fundDescend;
    this._store = store;
    
    this._buttonReject = new Ext.Button({
        minWidth: 80,
        text: '驳回',
        window: this,
        handler: function(){
            var window = this.window;
            var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '（' + window._textRejectRemark.getValue() + ')';
            Srims.fund.FundDescend_CensorReject(window._fundDescend, window._store, remark);
            window.close();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
        fieldLabel: '驳回理由',
        noticeTextType: 'FundDescendRejectReason',
        listWidth: 160,
        width: 130
    });
    this._textRejectRemark = new Ext.form.TextArea({
        fieldLabel: '详细说明',
        height: 60,
        width: 200
    });
    
    Srims.fund.FundDescendCensorRejectWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '驳回经费下拨申请',
        iconCls: 'icon-censor-reject',
        width: 320,
        labelWidth: 70,
        height: 180,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxRejectReson, this._textRejectRemark],
        buttons: [this._buttonReject, this._buttonClose]
    });
}
Ext.extend(Srims.fund.FundDescendCensorRejectWindow, Ext.Window, {})

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStateHistoryGridPanel_ColumnModel = function(){
    Srims.fund.FundDescendStateHistoryGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.fund.fundDescendStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        id: 'remark',
        header: "备注",
        dataIndex: 'remark'
    }])
}
Ext.extend(Srims.fund.FundDescendStateHistoryGridPanel_ColumnModel, Ext.grid.ColumnModel);


if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundDescendStateHistory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.fund.FundDescendStateHistory);


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundDescendStateHistoryStore.superclass.constructor.call(this, new Srims.fund.FundDescendStateHistoryXmlReader(), load_url, params);
    }
});



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundDescendStateHistoryXmlReader.superclass.constructor.call(this, Srims.fund.FundDescendStateHistory);
    }
});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.FundDescend_ReturnWindow = function(id, finance, store, manageWindow, project){

    this._id = id;
    this._store = store;
    this._finance = finance;
    this._manageWindow = manageWindow;
    this._project = project;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    
    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '还款项目',
        value: this._project == undefined ? undefined : this._project.get('name'),
        selectEntityId: this._project == undefined ? undefined : this._project.get('id'),
        allowBlank: false,
        isReturn: true,
        disabled: this._project != undefined,
        width: 300
    });
    this._comboBoxFinance = new Srims.component.FinanceSearch.SearchComboBox({
        fieldLabel: '经费到帐',
        allowBlank: false,
        width: 300
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: '还款金额(万元)',
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    var items = [];
    if (finance != undefined) 
        items = [this._comboBoxProject, this._numberFieldFundAmount];
    else 
        items = [this._comboBoxProject, this._comboBoxFinance, this._numberFieldFundAmount];
    
    Srims.fund.FundDescend_ReturnWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目还款',
        width: 440,
        autoHeight: true,
        bodyStyle: 'padding:10px 10px 30px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.validateFundAmount = function(){
        var finance = this.window._finance;
        var fundDescend = this.window._fundDescend;
        var project = this.window._comboBoxProject.getEntity();
        
        if (this.getMoney() <= 0) {
            this.invalidText = '还款金额必须大于0';
            return false;
        }
        
        var financeCanReturnAmount = finance.get('amount') - finance.get('descendAmount');
        if (this.getMoney() > financeCanReturnAmount) {
            this.invalidText = '还款金额不能大于经费到帐信息的未下拨金额';
            return false;
        }
        
        var projectUnreturnAmount = project.get('borrowAmount') - project.get('returnAmount');
        if (this.getMoney() > projectUnreturnAmount) {
            this.invalidText = '还款金额不能大于项目的未还款金额';
            return false;
        }
        
        return true;
    }
    
    this._numberFieldFundAmount.window = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;
    
    this.validate = function(preventMark){
        var result = true;
        
        result = this._comboBoxProject.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;
        if (this._finance == undefined) 
            result = this._comboBoxFinance.isValid(preventMark) && result;
        
        return result;
    }
    this.assginValues = function(params){
        params.projectID = this._comboBoxProject.getSelectEntityId();
        params.amount = this._numberFieldFundAmount.getMoney();
        params.financeId = this._finance == undefined ? this._comboBoxFinance.getSelectEntityId() : this._finance.get('id');
    }
    this.save = function(){
        var params = {};
        this.assginValues(params);
        
        Ext.Ajax.request({
            url: Srims.service.fund.FinanceFundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(response){
                Srims.fund.FundDescendCallBack(manageWindow, response, store, this, false);
            }
        });
    }
    this.buttonSave_click = function(button, e){
        var window = button.window;
        
        if (!window.validate(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.FundDescend_ReturnWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.FundDescend_ExpertWindow = function(id, store){

    this._id = id;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    
    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '下拨项目',
        allowBlank: false,
        isReturn: false,
        width: 300
    });
    this._comboBoxFinance = new Srims.component.FinanceSearch.SearchComboBox({
        fieldLabel: '经费到帐',
        allowBlank: false,
        width: 300
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: '下拨金额(万元)',
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    
    items = [this._comboBoxFinance, this._comboBoxProject, this._numberFieldFundAmount];
    
    Srims.fund.FundDescend_ExpertWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费下拨',
        width: 440,
        autoHeight: true,
        bodyStyle: 'padding:10px 10px 30px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.validateFundAmount = function(){
        var finance = this.window._comboBoxFinance.getEntity();
        var project = this.window._comboBoxProject.getEntity();
        
        if (this.getMoney() <= 0) {
            this.invalidText = '下拨金额必须大于0';
            return false;
        }
        
        var financeCanDescendAmount = finance.get('amount') - finance.get('descendAmount');
        if (this.getMoney() > financeCanDescendAmount) {
            this.invalidText = '下拨金额不能大于经费到帐信息的未下拨金额';
            return false;
        }
        
        var projectCanDescendAmount = project.get('fundTotal') - project.get('fundReceived');
        if (this.getMoney() > projectCanDescendAmount) {
            this.invalidText = '下拨金额不能大于项目的未下拨金额';
            return false;
        }
        
        return true;
    }
    
    this._numberFieldFundAmount.window = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;
    
    this.validate = function(preventMark){
        var result = true;
        
        result = this._comboBoxProject.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;
        result = this._comboBoxFinance.isValid(preventMark) && result;
        
        return result;
    }
    this.assginValues = function(params){
        params.isLent = false;
        params.projectID = this._comboBoxProject.getSelectEntityId();
        params.amount = this._numberFieldFundAmount.getMoney();
        params.financeId = this._finance == undefined ? this._comboBoxFinance.getSelectEntityId() : this._finance.get('id');
    }
    this.save = function(){
        var params = {};
        this.assginValues(params);
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(){
                if (store) 
                    store.load();
                
                this.close();
            }
        });
    }
    this.buttonSave_click = function(button, e){
        var window = button.window;
        
        if (!window.validate(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this.buttonSave_click);
    this._comboBoxProject.on('focus', function(){
        var user = Srims.currentLoginLog.user;
        this.setValue(user.name);
        this.store.load({
            params: {
                query: this.getText()
            }
        });
    })
}
Ext.extend(Srims.fund.FundDescend_ExpertWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.FundBatchDescendWindow = function(id, finance, store, manageWindow){

    this._id = id;
    this._store = store;
    this._finance = finance;
    this._manageWindow = manageWindow;
    
    this._projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/QueryForFundDescend', undefined);
    this._queryPanel = new Srims.fund.FundBatchDescendWindow_ProjectSimpleQueryPanel(this._projectStore)
    this._editorGridPanelFundDescend = new Srims.fund.FundBatchDescendWindow_EditGridPanel(finance, this._projectStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '下 拨',
        window: this
    });
    
    Srims.fund.FundBatchDescendWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费批量下拨',
        width: 650,
        height: 400,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._queryPanel, this._editorGridPanelFundDescend],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    var descendProjectCount = 0;//统计下拨项目的数目
    this.validate = function(){
        var projectStore = this._projectStore;
        var projects = projectStore.getRange();
        var fundDescendTotal = 0;
        for (var i = 0; i < projects.length; i++) {
            var fundDescendAmount = projects[i].get('fundDescend');
            if (fundDescendAmount != null && fundDescendAmount != undefined && fundDescendAmount != 0) {
                fundDescendTotal += Money.toMoney(projects[i].get('fundDescend'));
                descendProjectCount++;
            }
        }
        if (fundDescendTotal > finance.get('amount') - finance.get('descendAmount')) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '下拨总额不能大于经费的未下拨总额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        if (descendProjectCount == 0) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '请选择下拨项目',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        return true;
    }
    
    var saveCount = 0;
    this.save = function(projects, i){
        if (i > projects.length) 
            return;
        var fundDescendAmount = projects[i].get('fundDescend');
        if (fundDescendAmount == null || fundDescendAmount == undefined || fundDescendAmount <= 0) {
            this.save(projects, ++i);
            return;
        }
        
        fundDescendAmount = Money.toMoney(fundDescendAmount);
        var params = {};
        params.projectID = projects[i].get('id');
        params.amount = fundDescendAmount;
        params.financeId = this._finance.get('id');
        params.isLent = false;
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(response){
                saveCount++;
                if (saveCount < descendProjectCount) {
                    this.save(projects, ++i);
                    return;
                }
                Srims.fund.FundDescendCallBack(this._manageWindow, response, store, this, true);
            }
        })
    }
    this.buttonSave_click = function(button, e){
        var window = this.window;
        if (!window.validate()) 
            return;
        
        window.save(window._projectStore.getRange(), 0);
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.FundBatchDescendWindow, Ext.Window);


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundBatchDescendWindow_EditGridPanel = function(finance, store){

    this._store = store;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FundBatchDescendWindow_EditGridPanel_ColumnModel();
    Srims.fund.FundBatchDescendWindow_EditGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        height: 258,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        autoExpand: true,
        autoExpandColumn: 'fundDescend',
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });
    
    this.validateedit = function(obj){
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;
        
        var descendAmount = Money.toMoney(editor.getValue());
        if (descendAmount <= 0) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '下拨金额必须大于0',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        if (descendAmount > finance.get('amount') - finance.get('descendAmount')) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '下拨金额必须大于经费到帐的未下拨金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        var canDescendAmount = record.get('fundCanDescend');
        if (descendAmount > canDescendAmount) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '下拨金额不能大于项目的未到金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        return true;
    }
    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.fund.FundBatchDescendWindow_EditGridPanel, Ext.grid.EditorGridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundBatchDescendWindow_EditGridPanel_ColumnModel = function(){
    Srims.fund.FundBatchDescendWindow_EditGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "下拨项目名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        width: 170,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "到校经费(万元)",
        dataIndex: 'fundTotal',
        width: 75,
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        header: "可下拨经费（万元）",
        dataIndex: 'fundCanDescend',
        width: 80,
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        id: 'fundDescend',
        header: '下拨金额(万元)',
        dataIndex: 'fundDescend',
        sortable: false,
        editor: new Srims.component.MoneyField({
            allowNegative: false
        })
    }])
}
Ext.extend(Srims.fund.FundBatchDescendWindow_EditGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundBatchDescendWindow_ProjectSimpleQueryPanel = function(store){
    this._store = store;
    
    this._comboBoxRank = new Srims.component.EntityComboBox({
        fieldLabel: '项目级别',
        store: new Srims.type.ProjectRankStore(Srims.service.type.ProjectRankService + '/GetForQuery'),
        displayField: 'name',
        allowBlank: false,
        editable: false,
        width: 150,
        listWidth: 150
    });
    this._comboBoxType = new Srims.component.EntityComboBox({
        fieldLabel: '项目类型',
        mode: 'local',
        store: new Srims.type.ProjectTypeStore(Srims.service.type.ProjectTypeService + '/GetForEdit'),
        displayField: 'name',
        allowBlank: false,
        editable: false,
        width: 280,
        listWidth: 280
    });
    this._dateFieldStartDateBegin = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 150,
        editable: false,
        allowBlank: false
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150,
        editable: false
    });
    this._buttonQuery = new Ext.Button({
        text: '查 询',
        minWidth: 50,
        panel: this,
        store: this._store,
        handler: function(){
            var panel = this.panel;
            if (!panel.isValid(false)) 
                return;
            panel.query();
        }
    });
    this._buttonReset = new Ext.Button({
        text: '重 置',
        minWidth: 50,
        panel: this,
        handler: function(){
            this.panel.reset();
        }
    });
    Srims.fund.FundBatchDescendWindow_ProjectSimpleQueryPanel.superclass.constructor.call(this, {
        autoHeight: true,
        frame: true,
        labelWidth: 60,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        items: [new Ext.Panel({
            labelWidth: 60,
            layout: 'column',
            items: [new Ext.Panel({
                width: 240,
                labelWidth: 60,
                layout: 'form',
                items: [this._comboBoxRank, this._dateFieldStartDateBegin]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                items: [this._comboBoxType, new Ext.Panel({
                    labelWidth: 60,
                    layout: 'column',
                    items: [new Ext.Panel({
                        labelWidth: 60,
                        layout: 'form',
                        items: [this._dateFieldStartDateEnd]
                    }), new Ext.Panel({
                        style: 'padding-left: 20px',
                        layout: 'form',
                        items: [this._buttonQuery]
                    }), new Ext.Panel({
                        layout: 'form',
                        style: 'padding-left: 10px',
                        items: [this._buttonReset]
                    })]
                })]
            })]
        })]
    });
    //项目等级和项目类型的联动
    this._comboBoxRank.comboBoxType = this._comboBoxType;
    this._onComboBoxRank_select = function(comboBox){
        var projectRankId = comboBox.getValue();
        var comboBoxType = comboBox.comboBoxType;
        
        comboBoxType.setValue(undefined);
        if (projectRankId == undefined) {
            comboBoxType.disable();
            comboBoxType.store.removeAll();
        }
        else {
            comboBoxType.enable();
            comboBoxType.store.load({
                params: {
                    projectRankId: projectRankId
                }
            });
        }
    }
    this.reset = function(){
        this._comboBoxRank.reset();
        this._comboBoxType.reset();
        this._dateFieldStartDateBegin.reset();
        this._dateFieldStartDateEnd.reset();
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._comboBoxRank.isValid(preventMark) && result;
        result = this._comboBoxType.isValid(preventMark) && result;
        result = this._dateFieldStartDateBegin.isValid(preventMark) && result;
        
        return result;
    }
    this.query = function(){
        this._store.load({
            params: {
                rankName: this._comboBoxRank.getText(),
                typeName: this._comboBoxType.getText(),
                startDateStart: Date.format(this._dateFieldStartDateBegin.getValue()),
                startDateEnd: Date.format(this._dateFieldStartDateEnd.getValue())
            }
        })
    }
    //event
    this._comboBoxRank.on('select', this._onComboBoxRank_select);
}
Ext.extend(Srims.fund.FundBatchDescendWindow_ProjectSimpleQueryPanel, Ext.Panel)


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

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FianceFundDescendGridPanel = function(FianceFundDescendStore){
}
Ext.extend(Srims.fund.FianceFundDescendGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendGridPanel_ToolBar = function(selection, store, panelId, queryParams, isDescendPage){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">经费还款信息</b>',
        minWidth: 60
    });
    
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除还款记录', '你确定要删除这个还款记录吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.fund.deleteFundReturn(this.selection.getSelected(), this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除经费下拨</b><br/>删除选中的经费下拨'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费下拨列表'
    });
    
    var items = [this._buttonHeader, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh];
    
    Srims.fund.FinanceFundDescendGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    
    this._buttonHeader.setVisible(isDescendPage);
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }
        
        var financeFundDescend = selection.getSelected();
        
        buttonDelete.setVisible(financeFundDescend.get('hasPermission_DeleteReturn') && isDescendPage == true);
        buttonDelete.setDisabled(!financeFundDescend.get('canDeleteReturn'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FinanceFundDescendGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendGridPanel_ColumnModel = function(isNotNeedProjectName, isShowFinanceInfo){
    Srims.fund.FinanceFundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '经费凭单号',
        dataIndex: 'financeVoucherNumber',
        sortable: false,
        hidden: !isShowFinanceInfo
    }, {
        header: '经费说明',
        dataIndex: 'financeAbstract',
        sortable: false,
        hidden: !isShowFinanceInfo,
        width: 200
    }, {
        header: '还款项目',
        dataIndex: 'projectName',
        sortable: false,
        hidden: isNotNeedProjectName,
        width: 300
    }, {
        header: '还款金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        renderer: Money.render
    }, {
        header: '还款时间',
        dataIndex: 'operateDateTime',
        sortable: true,
        renderer: Date.render
    }, {
        id: 'operator',
        header: '还款人',
        dataIndex: 'operator'
    }])
}
Ext.extend(Srims.fund.FinanceFundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FinanceFundDescendStore.superclass.constructor.call(this, new Srims.fund.FinanceFundDescendXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceFundDescendXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FinanceFundDescendXmlReader.superclass.constructor.call(this, Srims.fund.FinanceFundDescend);
    }
});
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'allocationDateTime',
    type: 'date',
    mapping: 'AllocationDateTime'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'projectNumber',
    type: 'string',
    mapping: 'ProjectNumber'
}, {
    name: 'allocationTotal',
    type: 'int',
    mapping: 'AllocationTotal'
}, {
    name: 'allocationIn',
    type: 'int',
    mapping: 'AllocationIn'
}, {
    name: 'allocationOut',
    type: 'int',
    mapping: 'AllocationOut'
},
{
    name: 'allocationWantOut',
    type: 'int',
    mapping: 'AllocationWantOut'
}, {
    name: 'performanceTotal',
    type: 'int',
    mapping: 'PerformanceTotal'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'allocationHardware',
    type: 'int',
    mapping: 'AllocationHardware'
}, {
    name: 'overheadExpensesOut',
    type: 'int',
    mapping: 'OverheadExpensesOut'
}, {
    name: 'overheadPerformancePay',
    type: 'int',
    mapping: 'OverheadPerformancePay'
}, {
    name: 'state',
    type: 'string',
    mapping: 'CurrentState'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPricinpalName',
    type: 'string',
    mapping: 'ProjectPricinpalName'
}, {
    name: 'projectTypeName',
    type: 'string',
    mapping: 'ProjectTypeName'
}, {
    name: 'isHorizontal',
    type: 'bool',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'financeID',
    type: 'int',
    mapping: 'FinanceID'
}, {
    name: 'financeAmount',
    type: 'int',
    mapping: 'FinanceAmount'
}, {
    name: 'financeReceivedDate',
    type: 'date',
    mapping: 'FinanceReceivedDate'
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'isBorrow',
    type: 'bool',
    mapping: 'IsBorrow',
    convert: Boolean.toBoolean
}, {
    name: 'fundDescendID',
    type: 'int',
    mapping: 'FundDescendID'
}, {
    name: 'hasPermission_Allocation',
    type: 'bool',
    mapping: 'HasPermission_Allocation',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Canel',
    type: 'bool',
    mapping: 'HasPermission_Canel',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Censor',
    type: 'bool',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Submit',
    type: 'bool',
    mapping: 'HasPermission_Submit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UndoSubmit',
    type: 'bool',
    mapping: 'HasPermission_UndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Correct',
    type: 'bool',
    mapping: 'HasPermission_Correct',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocation',
    type: 'bool',
    mapping: 'CanAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canCancel',
    type: 'bool',
    mapping: 'CanCancel',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'bool',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'bool',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmit',
    type: 'bool',
    mapping: 'CanSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoSubmit',
    type: 'bool',
    mapping: 'CanUndoSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canCorrect',
    type: 'bool',
    mapping: 'CanCorrect',
    convert: Boolean.toBoolean
}, {
    name: 'canAllocationPerformancePay',
    type: 'bool',
    mapping: 'CanAllocationPerformancePay',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesMiddle',
    type: 'int',
    mapping: 'OverheadExpensesMiddle'
}, {
    name: 'overheadExpensesExpert',
    type: 'int',
    mapping: 'OverheadExpensesExpert'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}
]);

Srims.data.Entity.apply(Srims.fund.FundAllocation);
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.listWaitingCensorFundAllocation_Horizontal = function(){
    Srims.fund.listFundAllocation('fundAllocationGridPanel_WaitingCensor_Horizontal', '审核横向经费分配', 'icon-fund-allocation-waiting-censor-horizontal-project', true, Srims.fund.fundAllocationState.WaitingCensor);
}
Srims.fund.listWaitingCensorFundAllocation_Vertical = function(){
    Srims.fund.listFundAllocation('fundAllocationGridPanel_WaitingCensor_Vertical', '审核纵向经费分配', 'icon-fund-allocation-waiting-censor-vertical-project', false, Srims.fund.fundAllocationState.WaitingCensor);
}
Srims.fund.listFundAllcation = function(){
    Srims.fund.listFundAllocation('fundAllocationGridPanel_All', '经费分配记录', 'icon-fund-allocation-list', undefined, undefined);
}

Srims.fund.listFundAllocation = function(panelId, title, iconcls, isHorizontal, state){
    var fundAllocationStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (!panel) {
        queryParams = getFundAllocationQueryParams(isHorizontal, state);
        fundAllocationStore = new Srims.fund.FundAllocationStore(Srims.service.fund.FundAllocationService + '/Query', queryParams);
        panel = new Srims.fund.FundAllocationGridPanel(panelId, fundAllocationStore, title, iconcls, queryParams);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
function getFundAllocationQueryParams(isHorizontal, state){
    var params = {};
    
    if (state != undefined) 
        params.fundAllocationState = state;
    if (isHorizontal != undefined) 
        params.isHorizontal = isHorizontal;
    
    return params;
}

Srims.fund.showFundAllocationQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) {
        var window = new Srims.fund.FundAllocationQueryWindow(id, store, queryParams);
    }
    gridPanel.queryWindow = window;
    window.show();
    
    new Ext.KeyMap(id, {
        key: 13,
        scope: this,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
Srims.fund.showFundAllocationOutWindow = function(fundAllocation) {
    var windowId = 'fundAllocaitonOutWindow';
    var window = Ext.getCmp(windowId);
    if (!window) {
        var window = new Srims.fund.FundAllocationOutWindow(windowId, fundAllocation);
    }
    window.show();

}
Srims.fund.showFundAllocationInfoByFundDescend = function(fundDescend){
    Ext.Ajax.request({
        url: Srims.service.fund.FundAllocationService + '/GetByFundDescend',
        params: {
            fundDescendId: fundDescend.get('id')
        },
        success: function(response){
        
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.fund.FundAllocationXmlReader()
            });
            
            var fundAllocation = store.getAt(0);
            Srims.fund.showFundAllocationInfo(fundAllocation);
        }
    });
}
Srims.fund.showFundAllocationInfo = function(fundAllocation){
    var panelId = 'showFundAllocation' + fundAllocation.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        panel = new Srims.fund.FundAllocationShowPanel(panelId, fundAllocation);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.fund.showFundAllocationCensorWindow = function(fundAllocation, isCensorPass){
    var windowId = isCensorPass ? 'fundAllocationCensorPassWindow' + fundAllocation.get('id') : 'fundAllocationCensorRejectWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        var window = new Srims.fund.FundAllocationCensorWindow(id, fundAllocation, isCensorPass);
    }
    window.show();
}
Srims.fund.submitFundAllocation = function(fundAllocation, panel){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') 
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
    
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/Submit', undefined, poolAction, undefined, panel);
}
Srims.fund.undoSubmitFundAllocation = function(fundAllocation,panel){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') 
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
    
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/UndoSubmit', undefined, poolAction, undefined, panel);
}
Srims.fund.censorPassFundAllocation = function(fundAllocation, remark, censorWindow){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') {
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend : Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend;
    }
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/CensorPass', remark, poolAction, censorWindow, undefined);
}
Srims.fund.censorRejectFundAllocation = function(fundAllocation, remark, censorWindow){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') 
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingCensorHorizontalProjectFundAllocation : Srims.Poll.getPollAction_WaitingCensorVerticalProjectFundAllocation;
    
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/CensorReject', remark, poolAction, censorWindow, undefined);
}
Srims.fund.cancelFundAllocation = function(fundAllocation, remark){
    var isHorizontal = fundAllocation.get('isHorizontal');
    var poolAction = [];
    var user = Srims.currentLoginLog.user;
    if (user.userRoleType != 'Expert') 
        poolAction[poolAction.length] = isHorizontal ? Srims.Poll.getPollAction_WaitingAllocationHorizontalProjectFundDescend : Srims.Poll.getPollAction_WaitingAllocationVerticalProjectFundDescend;
    
    Srims.fund.SaveFundAllocationForChangeState(fundAllocation, '/Cancel', remark, poolAction, undefined, undefined);
}
Srims.fund.SaveFundAllocationForChangeState = function(fundAllocation, subUrl, remark, pollAction, censorWindow, expertGuidPanel){
    var params = {};
    params.fundAllocationId = fundAllocation.get('id');
    if (remark != undefined) 
        params.remark = remark;
    
    Ext.Ajax.request({
        url: Srims.service.fund.FundAllocationService + subUrl,
        params: params,
        success: function(){
            if (censorWindow) 
                censorWindow.close();
            
            if (pollAction != null) 
                for (var i = 0; i < pollAction.length; i++) 
                    Srims.Poll.startPollAction(pollAction[i]);
            
            var panelId = fundAllocation.get('isHorizontal') ? 'fundAllocationGridPanel_WaitingCensor_Horizontal' : 'fundAllocationGridPanel_WaitingCensor_Vertical';
            var panel = Ext.getCmp(panelId);
            if (panel) 
                panel.getStore().load();
            
            if (!expertGuidPanel) 
                fundAllocation.panel.refresh();
            //仅用于专家向导
            if (expertGuidPanel) 
            {
                if(fundAllocation.get('state') == Srims.fund.fundAllocationState.WaitingCensor)
                    fundAllocation.panel.refresh();
                else
                    Srims.expertGuide.next(expertGuidPanel);
             }
        }
    });
}
Srims.fund.clearFundMemberAccountBookNumber = function(fundMember, store){
    Ext.Ajax.request({
        url: Srims.service.fund.FundMemberService + '/ClearAccountBookNumber',
        params: {
            fundMemberId: fundMember.get('id')
        },
        success: function(){
            store.load();
        }
    });
}
Srims.fund.CorrectAllocationDateTime = function(fundAllocation){
    var windowId = 'fundAllocationCorrectDateTimeWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        var window = new Srims.fund.FundAllocationCorrectDateTimeWindow(fundAllocation);
    }
    window.show();
}
Srims.fund.CorrectAllocation = function(fundAllocation){
    var windowId = 'fundAllocationCorrectWindow' + fundAllocation.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        var window = new Srims.fund.FundAllocationCorrectWindow(fundAllocation);
    }
    window.show();
}




if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundAllocationXmlReader.superclass.constructor.call(this, Srims.fund.FundAllocation);
    }
    
});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundAllocationStore.superclass.constructor.call(this, new Srims.fund.FundAllocationXmlReader(), load_url, params);
    }
});



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Ext.namespace('Srims.fund.fundAllocationState');

Srims.fund.fundAllocationState.UnSubmit = 'UnSubmit';
Srims.fund.fundAllocationState.WaitingCensor = 'WaitingCensor';
Srims.fund.fundAllocationState.Reject = 'Reject';
Srims.fund.fundAllocationState.Passed = 'Passed';
Srims.fund.fundAllocationState.Canceled = 'Canceled';

Srims.fund.fundAllocationStateRender = function(value){
    switch (value) {
        case 'UnSubmit':
            return '未提交/待分配';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '未知';
    }
}
Srims.fund.fundAllocationStateFilterItems = [{
    id: 'UnSubmit',
    text: '未提交'
}, {
    id: 'WaitingCensor',
    text: '等待审核'
}, {
    id: 'Reject',
    text: '审核驳回'
}, {
    id: 'Passed',
    text: '审核通过'
}, {
    id: 'Canceled',
    text: '作废'
}];

Srims.fund.fundAllocationStore = [['UnSubmit', '未提交'], ['WaitingCensor', '等待审核'], ['Reject', '审核驳回'], ['Passed', '审核通过'], ['Canceled', '作废']];

if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationOutWindow = function(id, fundAllocation) {

    this._id = id;
    this._fundAllocation = fundAllocation;
    this._currentAllocationTotal = fundAllocation.get('allocationTotal') / 1000000;
    this._currentRest = (fundAllocation.get('fundPlanOut') - fundAllocation.get('fundAlreadyOut')) / 1000000;
    this._canInputRange = this._currentAllocationTotal > this._currentRest ? this._currentRest : this._currentAllocationTotal;
    this._title = '填写外协分配(填写范围0-' + this._canInputRange + '万元)';

    this._fundAllocationOutNumberField = new Ext.form.NumberField({
        //blankText: this._title,
        width: 200,
        fieldLabel: '指定外协分配额度',
        window: this,
        allowNegative: false,
        decimalPrecision: 6,
        labelStyle: 'margin-top:20px;margin-left:80px',
        style: 'margin-top:20px;margin-left:20px',
        maxValue: this._currentAllocationTotal > this._currentRest ? this._currentRest : this._currentAllocationTotal,
        minValue: 0
    })
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        handler: function() {


            var window = this.window;
            if (!window.isValid(false))
                return;
            var fundOut = window._fundAllocationOutNumberField.getValue() * 10000 * 1000000 / 10000;
            Ext.Ajax.request({
                url: Srims.service.fund.FundAllocationService + '/ChangeAllocationOut',
                params: {
                    FundAllocationId: fundAllocation.get('id'),
                    AllocationWantOut: fundOut
                },
                scope: this,
                success: function(response) {
                    window._fundAllocation.panel.refresh();

                    Ext.Ajax.request({
                        url: Srims.service.fund.FundAllocationService + '/GetById',
                        params: {
                            fundAllocationId: fundAllocation.get('id')
                        },
                        scope: this,
                        success: function(response) {
                            var store = new Ext.data.Store({
                                data: response.responseXML,
                                reader: new Srims.fund.FundAllocationXmlReader()
                            });
                            var currentFundAllocation = store.getAt(0);
                            currentFundAllocation.panel = window._fundAllocation.panel;
                            Srims.fund.newVoucher(currentFundAllocation, false, "校内");

                            window.close();
                        }
                    });

                }
            });
        }

    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });

    Srims.fund.FundAllocationOutWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: 'icon-finance-query',
        width: 500,
        height: 150,
        style: 'padding:5px',
        layout: 'form',
        resizable: false,
        items: [this._fundAllocationOutNumberField],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fundAllocationOutNumberField.isValid(preventMark) && result;
        return result;
    }


}
Ext.extend(Srims.fund.FundAllocationOutWindow, Ext.Window);
if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_BasicForm = function(fundAllocation, isVoucher) {

    this._fundAllocation = fundAllocation;
    this._textFieldProjectNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        value: fundAllocation.get('projectNumber'),
        readOnly: true,
        width: 620
    });
    this._textFieldProject = new Ext.form.TextField({
        fieldLabel: '项目名称',
        value: fundAllocation.get('projectName'),
        readOnly: true,
        width: 620
    });
    this._textFieldProjectPrincipal = new Ext.form.TextField({
        fieldLabel: '项目负责人',
        value: fundAllocation.get('projectPricinpalName'),
        readOnly: true,
        width: 220
    });
    this._textFieldProjectType = new Ext.form.TextField({
        fieldLabel: '项目类型',
        value: fundAllocation.get('projectTypeName'),
        readOnly: true,
        width: 220
    });
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '分配金额',
        value: Money.render(fundAllocation.get('allocationTotal')) + '(校内间接费：' + Money.render(fundAllocation.get('overheadExpenses')) + ')',
        readOnly: true,
        width: 220
    });
    this._textFieldAllocateTime = new Ext.form.TextField({
        fieldLabel: '分配时间',
        value: Date.render(fundAllocation.get('allocationDateTime')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationIn = new Ext.form.TextField({
        fieldLabel: '校内分配',
        value: Money.render(fundAllocation.get('allocationIn')) ,
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationOut = new Ext.form.TextField({
        fieldLabel: '外协分配',
        value: Money.render(fundAllocation.get('allocationOut')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesOut')) + ')',
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationHardware = new Ext.form.TextField({
        fieldLabel: '硬件费',
        value: Money.render(fundAllocation.get('allocationHardware')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationOverheadPerformancePay = new Ext.form.TextField({
        fieldLabel: '绩效',
        value: Money.render(fundAllocation.get('overheadPerformancePay')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationPerformancePay = new Ext.form.TextField({
        fieldLabel: '已分课题组间接费用',
        value: Money.render(fundAllocation.get('performancePay')),
        readOnly: true,
        disabled: isVoucher,
        width: 220
    });
    this._textFieldAllocationShoolIn = new Ext.form.TextField({
        fieldLabel: '校内间接费用',
        value: Money.render(fundAllocation.get('overheadExpenses')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationShool = new Ext.form.TextField({
        fieldLabel: '学校间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesIn')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationCompus = new Ext.form.TextField({
        fieldLabel: '二级单位间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesMiddle')),
        readOnly: true,
        width: 220
    });
    this._textFieldAllocationExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接费用',
        value: Money.render(fundAllocation.get('overheadExpensesExpert')),
        readOnly: true,
        width: 220
    });
    this._textFieldFundState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.fund.fundAllocationStateRender(fundAllocation.get('state')),
        readOnly: true,
        width: 220
    });
    this._textFieldOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: fundAllocation.get('operator'),
        readOnly: true,
        width: 220
    });
    this._textFieldOperateTime = new Ext.form.TextField({
        fieldLabel: '操作时间',
        value: Date.render(fundAllocation.get('dateTime')),
        readOnly: true,
        width: 220
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '审核备注',
        value: fundAllocation.get('remark'),
        readOnly: true,
        width: 620
    });

    var columnFirstItems = [this._textFieldProjectPrincipal, this._textFieldAmount, this._textFieldAllocationIn, this._textFieldAllocationHardware, this._textFieldAllocationOverheadPerformancePay, this._textFieldAllocationShool, this._textFieldAllocationExpert, this._textFieldOperator];
    var columnSecondItems = [this._textFieldProjectType, this._textFieldAllocateTime, this._textFieldAllocationOut, this._textFieldFundState, this._textFieldAllocationShoolIn, this._textFieldAllocationCompus, this._textFieldAllocationPerformancePay,this._textFieldOperateTime];

    Srims.fund.FundAllocationShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配基本信息',
        frame: true,
        labelWidth: 70,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        layout: 'form',
        items: [this._textFieldProjectNumber, this._textFieldProject, new Ext.Panel({
            labelWidth: 70,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                items: columnFirstItems
            }), new Ext.Panel({
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldRemark]
    });
    this.resetComponnentsValue = function(fundAllocation) {
        this._textFieldAmount.setValue(Money.render(fundAllocation.get('allocationTotal')) + '(校内间接费：' + Money.render(fundAllocation.get('overheadExpenses')) + ')');
        this._textFieldAllocateTime.setValue(Date.render(fundAllocation.get('allocationDateTime')));
        this._textFieldAllocationIn.setValue(Money.render(fundAllocation.get('allocationIn')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesIn')) + ')');
        this._textFieldAllocationOut.setValue(Money.render(fundAllocation.get('allocationOut')) + '(管理费：' + Money.render(fundAllocation.get('overheadExpensesOut')) + ')');
        this._textFieldAllocationHardware.setValue(Money.render(fundAllocation.get('allocationHardware')));
        this._textFieldFundState.setValue(Srims.fund.fundAllocationStateRender(fundAllocation.get('state')));
        this._textFieldOperator.setValue(fundAllocation.get('operator'));
        this._textFieldOperateTime.setValue(Date.render(fundAllocation.get('dateTime')));
        this._textFieldRemark.setValue(fundAllocation.get('remark'));
        this._textFieldAllocationOverheadPerformancePay.setValue(Money.render(fundAllocation.get('overheadPerformancePay')));
    }
}
Ext.extend(Srims.fund.FundAllocationShowPanel_BasicForm, Ext.form.FormPanel, {});
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_FundMemberForm = function(projectId){

    var load_url = Srims.service.fund.FundMemberService + '/GetByProject';
    this._store = new Srims.fund.FundMemberStore(load_url, {
        projectId: projectId
    });
    this._columnModel = new Srims.fund.FundMemberGridPanel_ColumnModel();
    
    this._gridPanelFundMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        autoExpandColumn: 'remark',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有经费成员信息'
        }
    });
    
    Srims.fund.FundAllocationShowPanel_FundMemberForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费成员信息（双击经费成员清空账本号）',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundMember]
    });
    
    this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundMember = grid.getStore().getAt(rowIndex);
        
        if (!fundMember.get('canResetAccountBookNumber')) {
            Ext.Msg.show({
                title: '清空账本号错误',
                msg: '您没有清空账本号的权限或该经费成员不能清空账本号',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        Ext.MessageBox.confirm('清空经费成员账本号', '你确定要清除这个经费成员的账本号吗，此操作不可撤销？', function(buttonId){
            if (buttonId == 'yes') 
                Srims.fund.clearFundMemberAccountBookNumber(fundMember, grid.getStore());
        }, this);
    };
    this._gridPanelFundMember.on('celldblclick', onCellDblClick);
}
Ext.extend(Srims.fund.FundAllocationShowPanel_FundMemberForm, Ext.form.FormPanel, {});


if (!Srims.fund) 
    Ext.namespace("Srims.fund");
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.FundAllocationShowPanel_ProjectInforForm = function(projectId){

    this._fieldName = new Ext.form.Field({
        fieldLabel: '项目名称',
        readOnly: true,
        width: 560
    });
    this._fieldPrincipal = new Ext.form.Field({
        fieldLabel: '项目负责人',
        readOnly: true,
        width: 160
    });
    this._fieldLevel = new Ext.form.Field({
        fieldLabel: '项目级别',
        readOnly: true,
        width: 160
    });
    this._fieldState = new Ext.form.Field({
        fieldLabel: '项目状态',
        readOnly: true,
        width: 160
    });
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '项目等级',
        readOnly: true,
        width: 160
    });
    this._fieldType = new Ext.form.Field({
        fieldLabel: '项目类型',
        readOnly: true,
        width: 300
    });
    this._fieldFundContract = new Ext.form.Field({
        fieldLabel: '项目合同额',
        readOnly: true,
        width: 160
    });
    this._fieldFundTotal = new Ext.form.Field({
        fieldLabel: '到校经费',
        readOnly: true,
        width: 160
    });
    this._fieldFundPlanIn = new Ext.form.Field({
        fieldLabel: '计划校内分配',
        readOnly: true,
        width: 160
    });
    this._fieldFundPlanOut = new Ext.form.Field({
        fieldLabel: '计划外协分配',
        readOnly: true,
        width: 160
    });
    this._fieldFundReceived = new Ext.form.Field({
        fieldLabel: '已到经费',
        readOnly: true,
        width: 160
    });
    this._fieldFundAlreadyIn = new Ext.form.Field({
        fieldLabel: '已分配校内经费',
        readOnly: true,
        width: 160
    });
    this._fieldfundAlreadyOut = new Ext.form.Field({
        fieldLabel: '已分配外协经费',
        readOnly: true,
        width: 160
    });
    
    var columnFirstItems = [this._fieldPrincipal, this._fieldState, this._fieldFundTotal, this._fieldFundPlanIn, this._fieldFundAlreadyIn, this._fieldRank];
    var columnSecondItems = [this._fieldLevel, this._fieldFundContract, this._fieldFundReceived, this._fieldFundPlanOut, this._fieldfundAlreadyOut];
    
    Srims.fund.FundAllocationShowPanel_ProjectInforForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配项目信息',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldName, new Ext.Panel({
            labelWidth: 100,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                items: columnFirstItems
            }), new Ext.Panel({
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._fieldType]
    });
    
    this.setCompontentValue = function(projectId){
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/GetById',
            params: {
                projectId: projectId
            },
            scope: this,
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.projects.ProjectSimpleXmlReader()
                });
                var project = store.getAt(0);
                this._fieldName.setValue(project.get('name'));
                this._fieldPrincipal.setValue(project.get('principal'));
                this._fieldLevel.setValue(Srims.projects.projectLevelRender(project.get('level')));
                this._fieldState.setValue(Srims.projects.projectStateRender(project.get('state')));
                this._fieldRank.setValue(project.get('rankName'));
                this._fieldType.setValue(project.get('typeName'));
                this._fieldFundContract.setValue(Money.render(project.get('fundContract')));
                this._fieldFundTotal.setValue(Money.render(project.get('fundTotal')));
                this._fieldFundPlanIn.setValue(Money.render(project.get('fundPlanIn')));
                this._fieldFundPlanOut.setValue(Money.render(project.get('fundPlanOut')));
                this._fieldFundReceived.setValue(Money.render(project.get('fundReceived')));
                this._fieldFundAlreadyIn.setValue(Money.render(project.get('fundAlreadyIn')));
                this._fieldfundAlreadyOut.setValue(Money.render(project.get('fundAlreadyOut')));
            }
        });
    }
    this.setCompontentValue(projectId);
}

Ext.extend(Srims.fund.FundAllocationShowPanel_ProjectInforForm, Ext.form.FormPanel, {});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_StateHistoryForm = function(fundAllocation){

    var load_url = Srims.service.fund.FundAllocationStateHistoryService + '/GetByFundAllocation';
    this._store = new Srims.fund.FundAllocationStateHistoryStore(load_url, {
        fundAllocationID: fundAllocation.get('id')
    });
    this._columnModel = new Srims.fund.FundAllocationStateHistoryGridPanel_ColumnModel();
    
    this._gridPanelFundAllocationStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'accountBookNumber',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有状态历史信息'
        }
    });
    
    Srims.fund.FundAllocationShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配状态历史信息',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundAllocationStateHistory]
    });
    
    this._store.load();
}
Ext.extend(Srims.fund.FundAllocationShowPanel_StateHistoryForm, Ext.form.FormPanel, {});


if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_FundDescendStateHistoryForm = function(fundAllocation){

    var load_url = Srims.service.fund.FundDescendStateHistoryService + '/GetByFundDescend';
    this._store = new Srims.fund.FundDescendStateHistoryStore(load_url, {
        fundDescendID: fundAllocation.get('fundDescendID')
    });
    this._columnModel = new Srims.fund.FundDescendStateHistoryGridPanel_ColumnModel();
    
    this._gridPanelFundDescendStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 700,
        autoExpand: true,
        autoExpandColumn: 'accountBookNumber',
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有状态历史信息'
        }
    });
    
    Srims.fund.FundAllocationShowPanel_FundDescendStateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '对应经费下拨状态历史信息',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelFundDescendStateHistory]
    });
    
    this._store.load();
}
Ext.extend(Srims.fund.FundAllocationShowPanel_FundDescendStateHistoryForm, Ext.form.FormPanel, {});

if (!Srims.fund)
	Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel_VoucherForm = function(fundAllocation, isExpertGuid) {

	var load_url = Srims.service.fund.VoucherService + '/GetByFundAllocation';
	this._store = new Srims.fund.VoucherStore(load_url, {
		fundAllocationId: fundAllocation.get('id')
	});
	this._selections = new Ext.grid.RowSelectionModel();
	this._columnModel = new Ext.grid.ColumnModel([{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber',
		hidden: isExpertGuid
	},{
		header: "经费成员",
		dataIndex: 'expertName'
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		renderer: Money.render
	},{
		header: "直接费用(万元)",
		dataIndex: 'allocationIn',
		renderer: Money.render
//	},{
//		header: "绩效金额(万元)",
//		dataIndex: 'performancePay',
//		renderer: Money.render
	},{
		header: "外协金额(万元)",
		dataIndex: 'allocationOut',
		renderer: Money.render
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber'
	},{
		id: 'voucherState',
		header: "状态",
		dataIndex: 'voucherState',
		hidden: isExpertGuid,
		renderer: Srims.fund.VoucherStateRender
	}]);
	this._tbar = new Srims.fund.VoucherGridPanel_ToolBar(this._selections, this._store, undefined, undefined, false, true, fundAllocation, isExpertGuid, false);

	this._gridPanelVoucher = new Ext.grid.GridPanel({
		store: this._store,
		colModel: this._columnModel,
		enableColumnHide: false,
		enableColumnMove: true,
		enableHdMenu: false,
		border: false,
		tbar: this._tbar,
		sm: this._selections,
		width: 700,
		autoExpand: true,
		autoExpandColumn: 'voucherState',
		style: isExpertGuid == true ? 'padding:10px' : '',
		stripeRows: true,
		loadMask: true,
		autoHeight: true,
		stateful: false,
		viewConfig: {
			autoFill: true,
			scrollOffset: 0,
			forceFit: true,
			emptyText: '没有凭单信息'
		}
	});

	Srims.fund.FundAllocationShowPanel_VoucherForm.superclass.constructor.call(this, {
		collapsible: true,
		title: '经费分配凭单信息',
		frame: true,
		labelWidth: 100,
		layout: 'form',
		bodyStyle: 'padding:0 5px 0',
		style: 'margin-bottom: 2px',
		defaultType: 'textfield',
		titleCollapse: true,
		items: [this._gridPanelVoucher]
	});

	this._store.load();
	//仅专家向导使用
	this._gridPanelVoucher.form = this;
	this._gridPanelVoucher.refresh = function() {

		Ext.Ajax.request({
			url: Srims.service.fund.FundAllocationService + '/GetById',
			params: {
				fundAllocationId: this.fundAllocation.get('id')
			},
			scope: this,
			success: function(response) {
				var store = new Ext.data.Store({
					data: response.responseXML,
					reader: new Srims.fund.FundAllocationXmlReader()
				});
				var currentFundAllocation = store.getAt(0);
				this._fundAllocation = currentFundAllocation;
				currentFundAllocation.panel = this;

				this.getStore().load();
				this.form._tbar.resetComponentFundAllocation(currentFundAllocation);
				if (currentFundAllocation.get('canAllocation')) {
					this.button.panel.next();
					this.button.setText('分配');
				} else if(currentFundAllocation.get('canSubmit'))
					this.button.setText('提交');
				else
					this.button.setText('撤销提交');
			}
		});
	}
	function onCellDblClick(grid, rowIndex, columnIndex, e) {
		var voucher = grid.getStore().getAt(rowIndex);
		if (!voucher.get('canEdit'))
			return;

//Srims.fund.editVoucher(fundAllocation, voucher);//Srims.fund.showVoucher(fundAllocation, voucher,false);
	};

	this._gridPanelVoucher.on('celldblclick', onCellDblClick);
}
Ext.extend(Srims.fund.FundAllocationShowPanel_VoucherForm, Ext.form.FormPanel, {});if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationShowPanel_ToolBar = function(fundAllocation, panel) {
    var isAllocationOut;
    if (fundAllocation.get('fundPlanOut') == 0)
    { isAllocationOut == false; }
    else if (fundAllocation.get('allocationOut') == 0 && fundAllocation.get('allocationIn') == 0 && fundAllocation.get('allocationWantOut') == 0) {
        Ext.MessageBox.show({
            title: '是否分配外协',
            msg: '您的本次分配是否有外协分配？<br />注意：如需要分配外协，请将外协经费分配在负责人名下！',
            buttons: Ext.MessageBox.YESNO,
            scope: this,
            fn: function(button) {
                if (button == 'no')
                    isAllocationOut = false;
                else
                    isAllocationOut = true;
                panel.refresh();
            },
            icon: Ext.MessageBox.QUESTION
        });
    }
    else {
        isAllocationOut = true;
    }
    this._fundAllocation = fundAllocation;
    var fundOut = false;
    this._buttonAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '经费分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            var currentFundAllocation = panel._fundAllocation;
            var allocationOut = currentFundAllocation.get('allocationOut');
            var b = currentFundAllocation.get('allocationWantOut');
            if (currentFundAllocation.get('allocationOut') == 0 && fundAllocation.get('allocationIn') == 0 && currentFundAllocation.get('allocationWantOut') == 0 && isAllocationOut == true)
                Srims.fund.showFundAllocationOutWindow(fundAllocation);
            else
                Srims.fund.newVoucher(this.fundAllocation, false, "校内");
        },
        hidden: true,
        tooltip: '<b>分配经费</b><br/>对所选经费下拨进行分配，<br/>已分配：' + Money.render(fundAllocation.get('allocationIn')) + '，未分配：' + Money.render(fundAllocation.get('allocationTotal') - fundAllocation.get('overheadExpenses') - fundAllocation.get('allocationOut') - fundAllocation.get('allocationIn')) + '，可分配总额：' + Money.render(fundAllocation.get('allocationTotal') - fundAllocation.get('overheadExpenses') - fundAllocation.get('allocationOut'))
    });

    this._buttonSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-submit',
        text: '提交',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.fund.FundAllocationService + '/CheckOutsourcing',
                params: { fundAllocationId: this.fundAllocation.get('id') },
                scope: this,
                success: function(response) {
                    var result = response.responseText;
                    if (result == 'true') {
                        Ext.MessageBox.confirm('提交经费分配', '你确定要提交这次经费分配吗？', function(buttonId) {
                            if (buttonId == 'yes')
                                Srims.fund.submitFundAllocation(this.fundAllocation);
                        }, this);

                    }
                    else {
                        //                        Ext.Msg.show({
                        //                            title: '提交警告',
                        //                            msg: '存在某外协公司分配金额超过当年允许分配最大额。详情如下：<br/>' + result,
                        //                            buttons: Ext.Msg.OK,
                        //                            icon: Ext.MessageBox.WARNING
                        //                        });
                        Ext.MessageBox.confirm('提交经费分配', '存在某外协公司分配金额超过当年允许分配最大额。详情如下：<br/>' + result + '<br/>你确定要提交这次经费分配吗？', function(buttonId) {
                            if (buttonId == 'yes')
                                Srims.fund.submitFundAllocation(this.fundAllocation);
                        }, this);
                    }
                }
            });

        },
        hidden: true,
        tooltip: '<b>提交经费分配</b><br/>提交本次经费分配'
    });
    this._PTextLabel = new Ext.form.Label({
        style: "font-size:12px;color:#FF0000",
        text: '     本次计划分配外协费用：' + Money.render(this._fundAllocation.get('allocationWantOut')) + '。     请注意：外协费用只能分配给项目负责人！'
    });
    this._buttonOutAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '填写/修改外协分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            var fundAllocation = this.fundAllocation;
            fundAllocation.panel = panel;
            Srims.fund.showFundAllocationOutWindow(fundAllocation);
        },
        hidden: true,
        tooltip: '<b>填写外协分配</b><br/>若有外协单位，必须先指定外协分配，才能进行经费分配。'
    });

    this._buttonUndoSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-undo-submit',
        text: '撤销提交',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('撤销经费分配', '你确定要撤销这次经费分配吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.fund.undoSubmitFundAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>撤销提交经费分配</b><br/>撤销提交本次经费分配'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        panel: panel,
        handler: function() {
            var islegal = true;
            var vouchers = this.panel._formVoucher._gridPanelVoucher.store.getRange();
            for (var i = 0; i < vouchers.length; i++) {
                if (String.isEmpty(vouchers[i].get('accountBookNumber')) ||
				String.Trim(vouchers[i].get('accountBookNumber')) == '新建') {
                    islegal = false;
                    break;
                }
            }

            if (!islegal) {
                Ext.Msg.show({
                    title: '凭单审核通过错误',
                    msg: '分配生成的凭单中有凭单号为空或新建，请输入正确的账本号后，再审核通过',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return;
            }
            Srims.fund.showFundAllocationCensorWindow(this.fundAllocation, true);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过本次经费分配'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        handler: function() {
            Srims.fund.showFundAllocationCensorWindow(this.fundAllocation, false);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回本次经费分配'
    });
    this._buttonCancel = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel',
        text: '作废',
        fundAllocation: this._fundAllocation,
        minWidth: 60,
        handler: function() {

            Ext.MessageBox.confirm('作废经费分配', '你确定要作废这次经费分配吗？此操作不可撤销', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.fund.cancelFundAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>作废</b><br/>作废本次经费分配'
    });
    this._buttonAllocationCorrect = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配纠正',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Ext.MessageBox.confirm('纠正经费分配', '纠正经费分配前，请先确认经费分配时间是否正确。', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.fund.CorrectAllocation(this.fundAllocation);
            }, this);
        },
        hidden: true,
        tooltip: '<b>纠正经费分配</b><br/>对经费分配进行纠正'
    });
    this._buttonAllocationDateTimeCorrect = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation-datetime-correct',
        text: '分配日期纠正',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.fund.CorrectAllocationDateTime(this.fundAllocation)
        },
        hidden: true,
        tooltip: '<b>纠正经费分配日期</b><br/>对经费分配的日期进行纠正'
    });

    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            panel.refresh();
        },
        tooltip: '<b>刷新经费分配信息</b><br/>刷新经费分配信息'
    });

    items = [this._buttonOutAllocation, this._buttonAllocation, this._buttonSubmit, this._buttonUndoSubmit, this._buttonCensorPass, this._buttonCensorReject, this._buttonCancel, this._buttonAllocationDateTimeCorrect, this._buttonAllocationCorrect, this._PTextLabel, new Ext.Toolbar.Fill(), this._buttonRefresh];

    Srims.fund.FundAllocationShowPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    this._buttonAllocationDateTimeCorrect.setVisible(fundAllocation.get('canCorrect'));
    this._buttonAllocationDateTimeCorrect.setDisabled(!fundAllocation.get('canCorrect'));

    this._buttonAllocationCorrect.setVisible(fundAllocation.get('canCorrect'));
    this._buttonAllocationCorrect.setDisabled(!fundAllocation.get('canCorrect'));

    this.resetButtonVisibleAndDisabled = function(fundAllocation) {

        this._fundAllocation = fundAllocation;
        //刷新本次外协分配额度
        this._PTextLabel.setText('     本次计划分配外协费用：' + Money.render(this._fundAllocation.get('allocationWantOut')) + '。     请注意：外协费用只能分配给项目负责人！');
        if (fundAllocation.get('canAllocation') || fundAllocation.get('canSubmit') || fundAllocation.get('canAllocationPerformancePay')) {

            this._buttonOutAllocation.setVisible(fundAllocation.get('hasPermission_Allocation'));
            this._buttonOutAllocation.setDisabled(!fundAllocation.get('canAllocation') || fundAllocation.get('allocationOut') > 0 || fundAllocation.get('allocationIn') > 0 || fundAllocation.get('fundPlanOut') == 0 || isAllocationOut == false);

            this._buttonAllocation.setDisabled(!fundAllocation.get('canAllocation'));
            this._buttonAllocation.setVisible(fundAllocation.get('hasPermission_Allocation'));


            this._buttonSubmit.setVisible(fundAllocation.get('hasPermission_Submit'));
            this._buttonSubmit.setDisabled(!fundAllocation.get('canSubmit'));
        } else {
            this._buttonOutAllocation.setVisible(false);
            this._buttonAllocation.setVisible(false);
            this._buttonSubmit.setVisible(false);
        }
        var user = Srims.currentLoginLog.user;
        this._buttonUndoSubmit.setVisible(fundAllocation.get('canUndoSubmit') && user.userRoleType == Srims.users.UserRoleType.Expert);
        this._buttonUndoSubmit.setDisabled(!fundAllocation.get('canUndoSubmit'));

        this._buttonCensorPass.setVisible(fundAllocation.get('canCensorPass'));
        this._buttonCensorPass.setDisabled(!fundAllocation.get('canCensorPass'));

        this._buttonCensorReject.setVisible(fundAllocation.get('canCensorReject'));
        this._buttonCensorReject.setDisabled(!fundAllocation.get('canCensorReject'));

        this._buttonCancel.setVisible(fundAllocation.get('canCancel') || user.isSuper);
        this._buttonCancel.setDisabled(!fundAllocation.get('canCancel') && !user.isSuper);

        this._buttonAllocationDateTimeCorrect.setVisible(fundAllocation.get('canCorrect'));
        this._buttonAllocationDateTimeCorrect.setDisabled(!fundAllocation.get('canCorrect'));

        this._buttonAllocationCorrect.setVisible(fundAllocation.get('canCorrect'));
        this._buttonAllocationCorrect.setDisabled(!fundAllocation.get('canCorrect'));
    }
    this.resetButtonFundAllocation = function(fundAllocation) {
        this._buttonAllocation.fundAllocation = fundAllocation;
        this._buttonSubmit.fundAllocation = fundAllocation;
        this._buttonUndoSubmit.fundAllocation = fundAllocation;
        this._buttonCensorPass.fundAllocation = fundAllocation;
        this._buttonCensorReject.fundAllocation = fundAllocation;
        this._buttonCancel.fundAllocation = fundAllocation;
        this._buttonAllocationCorrect.fundAllocation = fundAllocation;
        this._buttonAllocationDateTimeCorrect.fundAllocation = fundAllocation;
    }
    this.resetButtonVisibleAndDisabled(fundAllocation);
}
Ext.extend(Srims.fund.FundAllocationShowPanel_ToolBar, Ext.Toolbar);
if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationShowPanel = function(id, fundAllocation) {

    this._fundAllocation = fundAllocation;
    this._fundAllocation.panel = this;
    this._isAjaxRequestCompleted = false;

    this._toolBar = new Srims.fund.FundAllocationShowPanel_ToolBar(this._fundAllocation, this);
    this._formPanelBasic = new Srims.fund.FundAllocationShowPanel_BasicForm(this._fundAllocation,false);
    this._formPanelProjectInfor = new Srims.fund.FundAllocationShowPanel_ProjectInforForm(this._fundAllocation.get('projectID'));
    this._formPanelProjectContract = new Srims.projects.ProjectShowPanel_ContractForm(this._fundAllocation.get('projectID'));

    var finance = new Srims.fund.Finance({});
    finance.set('amount', this._fundAllocation.get('financeAmount'));
    finance.set('receivedDate', this._fundAllocation.get('financeReceivedDate'));
    finance.set('voucherNumber', this._fundAllocation.get('financeVoucherNumber'));
    finance.set('abstract', this._fundAllocation.get('financeAbstract'));
    this._formPanelFinance = new Srims.fund.FinanceShowForm(finance, this._fundAllocation.get('isBorrow'));

    this._formPanelFundAllocationStateHistory = new Srims.fund.FundAllocationShowPanel_StateHistoryForm(this._fundAllocation);
    this._formPanelFundMember = new Srims.fund.FundAllocationShowPanel_FundMemberForm(this._fundAllocation.get('projectID'));
    this._formVoucher = new Srims.fund.FundAllocationShowPanel_VoucherForm(this._fundAllocation, false);
    this._formFundDescendStateHistory = new Srims.fund.FundAllocationShowPanel_FundDescendStateHistoryForm(this._fundAllocation);
    var user = Srims.currentLoginLog.user;
    var items = [];

    if (user.userRoleType == 'Expert')
        items = [this._formPanelBasic, this._formVoucher, this._formPanelProjectInfor];
    else
        items = [this._formPanelBasic, this._formVoucher, this._formPanelFundMember, this._formPanelFundAllocationStateHistory, this._formFundDescendStateHistory, this._formPanelProjectInfor, this._formPanelProjectContract, this._formPanelFinance];

    Srims.fund.FundAllocationShowPanel.superclass.constructor.call(this, {
        id: id,
        title: '经费分配',
        tbar: this._toolBar,
        frame: true,
        iconCls: 'icon-fund-allocation-show',
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        items: items
    });
    //下载合同方法
    Srims.projects.downLoadContract = function(contract) {
        Srims.documents.downLoadResource(contract.get('contractResource'),'/GetContract');
    }

    this.refresh = function() {
        // this._isAjaxRequestCompleted = false;
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/GetById',
            params: {
                fundAllocationId: fundAllocation.get('id')
            },
            scope: this,
            success: function(response) {
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.fund.FundAllocationXmlReader()
                });
                var currentFundAllocation = store.getAt(0);
                this._fundAllocation = currentFundAllocation;
                currentFundAllocation.panel = this;
                //this._isAjaxRequestCompleted = true;

                this._formPanelBasic.resetComponnentsValue(currentFundAllocation);
                this._formPanelFundAllocationStateHistory._store.load();
                this._formPanelFundMember._store.load();
                this._formVoucher._store.load();
                this._formVoucher._tbar.resetComponentFundAllocation(currentFundAllocation);
                this._formFundDescendStateHistory._store.load();
                this._formPanelProjectContract._store.load();
                this._formPanelProjectInfor.setCompontentValue(fundAllocation.get('projectID'));
                this._toolBar.resetButtonVisibleAndDisabled(currentFundAllocation);
                this._toolBar.resetButtonFundAllocation(currentFundAllocation);
                if (currentFundAllocation.get('canSubmit') == true && Srims.currentLoginLog.user.userRoleType == 'Expert') {
                    Ext.MessageBox.show({
                        title: '请提交经费分配！',
                        msg: '注意：本次经费分配已经完成，如果不需要修改请点击提交按钮,等待管理员审核。',
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        fn: function(button) {
                            if (button == 'yes')
                                return true;
                        },
                        icon: Ext.MessageBox.QUESTION
                    });
                }
            }
        });
    }
}

Ext.extend(Srims.fund.FundAllocationShowPanel, Ext.Panel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationCensorWindow = function(id, fundAllocation, isCensorPass){

    this._fundAllocation = fundAllocation;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonCensor = new Ext.Button({
        minWidth: 80,
        text: isCensorPass ? '审核通过' : '审核驳回',
        window: this
    });
    
    this._fieldCensorState = new Ext.form.Field({
        fieldLabel: '审核状态',
        value: isCensorPass ? '审核通过' : '审核驳回',
        readOnly: true,
        width: 160
    });
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        height: 60,
        width: 230
    });
    
    Srims.fund.FundAllocationCensorWindow.superclass.constructor.call(this, {
        id: this._id,
        title: isCensorPass ? '审核通过绩效分配' : '审核驳回绩效分配',
        width: 370,
        autoHeight: true,
        labelWidth: 60,
        bodyStyle: 'padding:10px 10px 20px 10px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._fieldCensorState, this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });
    
    this.buttonCensor_click = function(button, e){
        var window = this.window;
        
        if (isCensorPass) 
            Srims.fund.censorPassFundAllocation(window._fundAllocation, window._textRemark.getValue(), window);
        else 
            Srims.fund.censorRejectFundAllocation(window._fundAllocation, window._textRemark.getValue(), window);
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.fund.FundAllocationCensorWindow, Ext.Window);
if (!Srims.fund)
    Ext.namespace('Srims.fund');
Srims.fund.FundAllocationGridPanel_ColumnModel = function(isShowProjectName) {
    Srims.fund.FundAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true
    }, {
        header: '项目编号',
        dataIndex: 'projectNumber',
        width: 300,
        hidden: !isShowProjectName
    }, {
        header: '分配项目',
        dataIndex: 'projectName',
        width: 300,
        hidden: !isShowProjectName
    }, {
        header: '分配时间',
        dataIndex: 'allocationDateTime',
        sortable: true,
        width: 100,
        renderer: Date.render
    }, {
        header: '分配总额',
        dataIndex: 'allocationTotal',
        sortable: true,
        width: 80,
        renderer: Money.render
    }, {
        header: '直接费用',
        dataIndex: 'allocationIn',
        width: 80,
        renderer: Money.render
    }, {
        header: '项目总绩效',
        dataIndex: 'PerformanceTotal',
        width: 80,
        renderer: Money.render,
        hidden: !isShowProjectName
    }, {
        header: '校内绩效',
        dataIndex: 'overheadPerformancePay',
        width: 80,
        renderer: Money.render,
        hidden: !isShowProjectName
    }, {
        header: '课题组间接费用及绩效',
        dataIndex: 'overheadExpensesExpert',
        width: 80,
        renderer: Money.render
    }, {
        header: '外协分配',
        dataIndex: 'allocationOut',
        width: 80,
        renderer: Money.render
    }, {
        header: '当前状态',
        dataIndex: 'state',
        sortable: true,
        width: 60,
        renderer: Srims.fund.fundAllocationStateRender
    }, {
        header: '当前状态时间',
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        id: 'operator',
        header: '当前状态操作人',
        dataIndex: 'operator'
}])
    }
    Ext.extend(Srims.fund.FundAllocationGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationGridPanel_ToolBar = function(selection, store, panelId, queryParams){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.fund.showFundAllocationQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>经费分配查询</b><br/>对经费分配信息进行查询'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.fund.showFundAllocationInfo(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看分配</b><br/>显示所选经费分配的详细信息'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费分配列表'
    });
    
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token', 'fundAllocationState', 'isHorizontal', 'IsStatistic'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    
    var items = [this._buttonQuery, this._buttonShow, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    
    Srims.fund.FundAllocationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType != 'Expert');
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            return;
        }
        
        var fundAllocation = selection.getSelected();
        
        buttonShow.setVisible(true);
        buttonShow.setDisabled(false);
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FundAllocationGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationGridPanel = function(id, fundDescendStore, title, iconCls, queryParams){

    this._store = fundDescendStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FundAllocationGridPanel_ColumnModel(true);
    
    this._toolBar = new Srims.fund.FundAllocationGridPanel_ToolBar(this._selections, this._store, id, queryParams);
    
    var params = {};
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    Srims.fund.FundAllocationGridPanel.superclass.constructor.call(this, params);
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var fundAllocation = grid.getStore().getAt(rowIndex);
        Srims.fund.showFundAllocationInfo(fundAllocation);
    }
}
Ext.extend(Srims.fund.FundAllocationGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationQueryWindow = function(id, store, queryParams){

    this._id = id;
    this._store = store;
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            this.window.buildParams();
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    this._textFieldProjectName = new Ext.form.TextField({
        fieldLabel: '分配项目',
        width: 300
    });
    this._numberFieldAllocationAmountBegin = new Srims.component.MoneyField({
        fieldLabel: '分配金额(万元)',
        allowNegative: false,
        width: 130
    });
    this._numberFieldAllocationAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 130
    });
    this._checkboxFundAllocationStates = new Srims.component.CheckBoxGroup({
        fieldLabel: '状态',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.fund.fundAllocationStore),
        cls: 'srims-checkboxGroup'
    });
    
    Srims.fund.FundAllocationQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费分配查询',
        iconCls: 'icon-query',
        width: 500,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            border: false,
            frame: true,
            height: 140,
            items: [this._textFieldProjectName, new Ext.Panel({
                layout: 'column',
                items: [new Ext.Panel({
                    width: 240,
                    layout: 'form',
                    labelWidth: 90,
                    items: this._numberFieldAllocationAmountBegin
                }), new Ext.Panel({
                    layout: 'form',
                    labelWidth: 20,
                    items: this._numberFieldAllocationAmountEnd
                })]
            }), this._checkboxFundAllocationStates]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.buildParams = function(){
        queryParams.projectName = this._textFieldProjectName.getValue();
        queryParams.fundAmountStart = this._numberFieldAllocationAmountBegin.getMoney();
        queryParams.fundAmountEnd = this._numberFieldAllocationAmountEnd.getMoney();
        queryParams.fundAllocationState = this._checkboxFundAllocationStates.getSelecetedValue();
    }
    this.clearParams = function(){
        this._textFieldProjectName.reset();
        this._numberFieldAllocationAmountBegin.reset();
        this._numberFieldAllocationAmountEnd.reset();
        this._checkboxFundAllocationStates.reset();
    }
    this.query = function(button, e){
        var window = button.window;
        window.buildParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.fund.FundAllocationQueryWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStateHistoryGridPanel_ColumnModel = function(){
    Srims.fund.FundAllocationStateHistoryGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.fund.fundAllocationStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        id: 'remark',
        header: "备注",
        dataIndex: 'remark'
    }])
}
Ext.extend(Srims.fund.FundAllocationStateHistoryGridPanel_ColumnModel, Ext.grid.ColumnModel);


if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FundAllocationStateHistory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.fund.FundAllocationStateHistory);


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundAllocationStateHistoryStore.superclass.constructor.call(this, new Srims.fund.FundAllocationStateHistoryXmlReader(), load_url, params);
    }
});



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundAllocationStateHistoryXmlReader.superclass.constructor.call(this, Srims.fund.FundAllocationStateHistory);
    }
});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.FundMemberXmlReader.superclass.constructor.call(this, Srims.fund.FundMember);
    }
});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.FundMemberStore.superclass.constructor.call(this, new Srims.fund.FundMemberXmlReader(), load_url, params);
    }
});


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
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberGridPanel_ColumnModel = function(){
    Srims.fund.FundMemberGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true
    }, {
        header: '专家姓名',
        dataIndex: 'expertName',
        width: 100
    }, {
        header: '工作证号',
        dataIndex: 'expertNumber',
        width: 100
    }, {
        id: 'accountBookNumber',
        header: '账本号',
        dataIndex: 'accountBookNumber'
    }])
}
Ext.extend(Srims.fund.FundMemberGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.listVoucher = function() {
    Srims.fund._listVoucher('VoucherList', '凭单列表', 'icon-fund-voucher');
}
Srims.fund.listMyVoucher = function() {
    Srims.fund._listVoucher('MyVoucherList', '我的凭单列表', 'icon-fund-voucher');
}
Srims.fund._listVoucher = function(id, name, iconCls, queryParams) {
    var panelId = 'VoucherGridPanel_' + id;
    var voucherStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        voucherStore = panel.getStore();
        voucherStore.load();
    }
    else {
        voucherStore = new Srims.fund.VoucherStore(Srims.service.fund.VoucherService + '/Query', queryParams);
        panel = new Srims.fund.VoucherGridPanel(panelId, voucherStore, name, iconCls, queryParams);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
//carlsirce 2013.6.28 更新新旧外协名称
Srims.fund.showOutsourcingNameImportWindow = function(store) {
    var windowId = 'OutsourcingNameImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.fund.VoucherService + '/ImportOutsourcingName', '导入外协映射数据', false);

    window.show();
}

Srims.fund.showVoucherQueryWindow = function(id, store, queryParams, isFinanceManage, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.fund.VoucherQueryWindow(id, store, queryParams, isFinanceManage);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
Srims.fund.changeVoucherState = function(voucher, store, title, message, action, methodName, isFinanceManage) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.voucherID = voucher.get('id');
            Ext.Ajax.request({
                url: Srims.service.fund.VoucherService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.fund.VoucherXmlReader()
                    });
                    var editedVoucher = newstore.getAt(0);
                    var panelId = (isFinanceManage ? 'VoucherFinanceShowPanel' : 'VoucherShowPanel') + editedVoucher.get('id');
                    if (Ext.getCmp(panelId))
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                    Srims.fund.showVoucher(editedVoucher, store, isFinanceManage);
                    if (action == 'print') {
                        if (voucher.get('isHorizontal') == true)
                            window.open('HorizonVoucherPrint.aspx?VoucherID=' + voucher.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                        else
                            window.open('VoucherPrint.aspx?VoucherID=' + voucher.get('id'), 'newwindow', 'height=500, width=750, top=100, left=100,resizable=no,location=no, status=no');
                    }
                }
            });
        }
    }, this);
}
Srims.fund.SetIsReadAndshowVoucher = function(voucher, store, isFinanceManage, fundAllocation) {
    var params = {
        voucherID: voucher.get('id')
    }

    Ext.Ajax.request({
        url: Srims.service.fund.VoucherService + '/SetIsRead',
        params: params,
        scope: this,
        success: function() {
            store.load();
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_MyUnReadVoucher());
            Srims.fund.showVoucher(voucher, store, isFinanceManage, fundAllocation);
        }
    });

}
Srims.fund.showVoucher = function(voucher, store, isFinanceManage, fundAllocation) {
    var panelId = (isFinanceManage ? 'VoucherFinanceShowPanel' : 'VoucherShowPanel') + voucher.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    var panel = new Srims.fund.VoucherShowPanel(panelId, voucher, store, isFinanceManage, fundAllocation);
    Srims.WorkSpace.addPanel(panel);
}
Srims.fund.newVoucher = function(fundAllocation, isCorrect, allocationName) {
    var windowId = 'NewVoucher' + allocationName;
    var voucher = new Srims.fund.Voucher({});
    Srims.fund.ShowVoucherEditWindow(fundAllocation, voucher, windowId, isCorrect, allocationName);
}
Srims.fund.editVoucher = function(fundAllocation, voucher, isCorrect, allocationName) {
    var windowId = 'EditVoucher' + voucher.get('id');
    Srims.fund.ShowVoucherEditWindow(fundAllocation, voucher, windowId, isCorrect, allocationName);
}

Srims.fund.ShowVoucherEditWindow = function(fundAllocation, voucher, windowId, isCorrect, allocationName) {
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: fundAllocation.get('projectID')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectSimpleXmlReader()
            });
            var project = store.getAt(0);

            var window = Ext.getCmp(windowId);

            if (!window)
                var window = new Srims.fund.VoucherEditWindow(id, fundAllocation, voucher, project, isCorrect, allocationName);

            window._editGridPanel.getStore().load();
            window.show();
        }
    })
}

Srims.fund.deleteVoucher = function(voucher, fundAllocation, isCorrect) {
    Ext.Ajax.request({
        url: Srims.service.fund.VoucherService + '/Delete',
        params: {
            voucherId: voucher.get('id'),
            isCorrect: isCorrect
        },
        success: function() {
            //仅用于专家向导
            fundAllocation.panel.fundAllocation = fundAllocation;
            fundAllocation.panel.refresh();

            if (fundAllocation.store)
                fundAllocation.store.load();

            //用于数据纠错
            if (isCorrect)
                Ext.Ajax.request({
                    url: Srims.service.fund.FundAllocationService + '/GetById',
                    params: {
                        fundAllocationId: fundAllocation.get('id')
                    },
                    scope: this,
                    success: function(response) {
                        var store = new Ext.data.Store({
                            data: response.responseXML,
                            reader: new Srims.fund.FundAllocationXmlReader()
                        });
                        var currentFundAllocation = store.getAt(0);
                        currentFundAllocation.panel = fundAllocation.panel;
                        currentFundAllocation.store = fundAllocation.store;
                        currentFundAllocation.toobBar = fundAllocation.toobBar;
                        currentFundAllocation.toobBar.resetComponentFundAllocation(currentFundAllocation);
                    }
                });
        }
    });
}

Srims.fund.showEditAccountBookNumberWindow = function(voucher, fundAllocation) {
    var windowId = 'ResetAccountBookNumber' + voucher.get('id');
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.fund.VoucherEditAccountBookNumberWindow(windowId, voucher, fundAllocation);

    window.show();
}
Srims.fund.showVoucherFundAllocationInfo = function(voucher) {
    Ext.Ajax.request({
        url: Srims.service.fund.FundAllocationService + '/GetById',
        params: {
            fundAllocationId: voucher.get('fundAllocationID')
        },
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.fund.FundAllocationXmlReader()
            });
            var currentFundAllocation = store.getAt(0);
            Srims.fund.showFundAllocationInfo(currentFundAllocation);
        }
    });
}
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.Voucher = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'allocationHardware',
    type: 'int',
    mapping: 'AllocationHardware'
}, {
    name: 'allocationIn',
    type: 'int',
    mapping: 'AllocationIn'
}, {
    name: 'allocationOut',
    type: 'int',
    mapping: 'AllocationOut'
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'
}, {
    name: 'overheadPerformancePay',
    type: 'int',
    mapping: 'OverheadPerformancePay'
}, {
    name: 'performanceAccountBookNumber',
    type: 'string',
    mapping: 'PerformanceAccountBookNumber'
}, {
    name: 'financeNumber',
    type: 'string',
    mapping: 'FinanceNumber'
}, {
    name: 'isRead',
    type: 'bool',
    mapping: 'IsRead',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesOut',
    type: 'int',
    mapping: 'OverheadExpensesOut'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'overheadExpenses',
    type: 'int',
    mapping: 'OverheadExpenses'
}, {
    name: 'voucherNumber',
    type: 'string',
    mapping: 'VoucherNumber'
}, {
    name: 'currentStateID',
    type: 'int',
    mapping: 'CurrentStateID'
}, {
    name: 'voucherState',
    type: 'string',
    mapping: 'VoucherState'
}, {
    name: 'financeAllocationDateTime',
    type: 'date',
    mapping: 'FinanceAllocationDateTime'
}, {
    name: 'stateDateTime',
    type: 'date',
    mapping: 'StateDateTime'
}, {
    name: 'stateOperator',
    type: 'string',
    mapping: 'StateOperator'
}, {
    name: 'stateRemark',
    type: 'string',
    mapping: 'StateRemark'
}, {
    name: 'fundAllocationID',
    type: 'int',
    mapping: 'FundAllocationID'
}, {
    name: 'fundAllocationHardware',
    type: 'int',
    mapping: 'FundAllocationHardware'
}, {
    name: 'fundAllocationAllocationIn',
    type: 'int',
    mapping: 'FundAllocationAllocationIn'
}, {
    name: 'fundAllocationAllocationOut',
    type: 'int',
    mapping: 'FundAllocationAllocationOut'
}, {
    name: 'fundAllocationAllocationTotal',
    type: 'int',
    mapping: 'FundAllocationAllocationTotal'
}, {
    name: 'fundAllocationOverheadExpenses',
    type: 'int',
    mapping: 'FundAllocationOverheadExpenses'
}, {
    name: 'fundAllocationDateTime',
    type: 'date',
    mapping: 'FundAllocationDateTime'
}, {
    name: 'fundAllocationOverheadExpensesIn',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesIn'
}, {
    name: 'fundAllocationOverheadExpensesOut',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesOut'
}, {
    name: 'fundAllocationStateDateTime',
    type: 'date',
    mapping: 'FundAllocationStateDateTime'
}, {
    name: 'fundAllocationStateOperator',
    type: 'string',
    mapping: 'FundAllocationStateOperator'
}, {
    name: 'fundAllocationStateRemark',
    type: 'string',
    mapping: 'FundAllocationStateRemark'
}, {
    name: 'fundAllocationState',
    type: 'string',
    mapping: 'FundAllocationState'
}, {
    name: 'projectID',
    type: 'int',
    mapping: 'ProjectID'
}, {
    name: 'isHorizontal',
    type: 'bool',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'projectPrincipal',
    type: 'string',
    mapping: 'ProjectPrincipal'
}, {
    name: 'projectIsSecret',
    type: 'bool',
    mapping: 'ProjectIsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'projectTypePreCode',
    type: 'string',
    mapping: 'ProjectTypePreCode'
}, {
    name: 'financeID',
    type: 'int',
    mapping: 'FinanceID'
}, {
    name: 'financeAmount',
    type: 'int',
    mapping: 'FinanceAmount'
}, {
    name: 'financeReceivedDate',
    type: 'date',
    mapping: 'FinanceReceivedDate'
}, {
    name: 'financeVoucherNumber',
    type: 'string',
    mapping: 'FinanceVoucherNumber'
}, {
    name: 'financeAbstract',
    type: 'string',
    mapping: 'FinanceAbstract'
}, {
    name: 'isBorrow',
    type: 'bool',
    mapping: 'IsBorrow',
    convert: Boolean.toBoolean
}, {
    name: 'userIsExpert',
    type: 'bool',
    mapping: 'UserIsExpert',
    convert: Boolean.toBoolean
}, {
    name: 'fundMemberID',
    type: 'int',
    mapping: 'FundMemberID'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'isExpertSecondCollege',
    type: 'string',
    mapping: 'IsExpertSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'deparment',
    type: 'string',
    mapping: 'Deparment'
}, {
    name: 'expertCollegeCode',
    type: 'string',
    mapping: 'ExpertCollegeCode'
}, {
    name: 'hasPermission_Show',
    type: 'bool',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'bool',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'bool',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Print',
    type: 'bool',
    mapping: 'HasPermission_Print',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetPrint',
    type: 'bool',
    mapping: 'HasPermission_ResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetAccountBookNumber',
    type: 'bool',
    mapping: 'HasPermission_ResetAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_SignIn',
    type: 'bool',
    mapping: 'HasPermission_SignIn',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ReturnVoucher',
    type: 'bool',
    mapping: 'HasPermission_ReturnVoucher',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_FinanceAllocate',
    type: 'bool',
    mapping: 'HasPermission_FinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_CancelFinanceAllocate',
    type: 'bool',
    mapping: 'HasPermission_CancelFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Print',
    type: 'bool',
    mapping: 'HasPermission_Print',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ResetPrint',
    type: 'bool',
    mapping: 'HasPermission_ResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowFundAllocation',
    type: 'bool',
    mapping: 'HasPermission_ShowFundAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'bool',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'bool',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'bool',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canPrint',
    type: 'bool',
    mapping: 'CanPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canResetPrint',
    type: 'bool',
    mapping: 'CanResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canResetAccountBookNumber',
    type: 'bool',
    mapping: 'CanResetAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canSignIn',
    type: 'bool',
    mapping: 'CanSignIn',
    convert: Boolean.toBoolean
}, {
    name: 'canReturnVoucher',
    type: 'bool',
    mapping: 'CanReturnVoucher',
    convert: Boolean.toBoolean
}, {
    name: 'canFinanceAllocate',
    type: 'bool',
    mapping: 'CanFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canFinanceAllocate',
    type: 'bool',
    mapping: 'CanFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canCancelFinanceAllocate',
    type: 'bool',
    mapping: 'CanCancelFinanceAllocate',
    convert: Boolean.toBoolean
}, {
    name: 'canResetPrint',
    type: 'bool',
    mapping: 'CanResetPrint',
    convert: Boolean.toBoolean
}, {
    name: 'canShowFundAllocation',
    type: 'bool',
    mapping: 'CanShowFundAllocation',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpensesIn',
    type: 'int',
    mapping: 'OverheadExpensesIn'
}, {
    name: 'overheadExpensesMiddle',
    type: 'int',
    mapping: 'OverheadExpensesMiddle'
}, {
    name: 'overheadExpensesExpert',
    type: 'int',
    mapping: 'OverheadExpensesExpert'
}, {
    name: 'fundAllocationOverheadExpensesMiddle',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesMiddle'
}, {
    name: 'fundAllocationOverheadExpensesExpert',
    type: 'int',
    mapping: 'FundAllocationOverheadExpensesExpert'
}, {
    name: 'fundAllocationOverheadExpenses',
    type: 'int',
    mapping: 'FundAllocationOverheadExpenses'
}]);

    Srims.data.Entity.apply(Srims.fund.Voucher);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherXmlReader.superclass.constructor.call(this, Srims.fund.Voucher);
    }
});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.fund.VoucherStore.superclass.constructor.call(this, new Srims.fund.VoucherXmlReader(), load_url, params);
    }
});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Ext.namespace('Srims.fund.VoucherState');

Srims.fund.VoucherState.UnPrinted = 'UnPrinted';
Srims.fund.VoucherState.NotSignIn = 'NotSignIn';
Srims.fund.VoucherState.SignIn = 'SignIn';
Srims.fund.VoucherState.Allocated = 'Allocated';

Srims.fund.VoucherStateRender = function(value, metadata){
    switch (value) {
        case 'UnPrinted':
            return '审核通过/未打印';
        case 'NotSignIn':
            return '已打印/未签收';
        case 'SignIn':
            return '签收/未分配';
        case 'Allocated':
            return '已分配';
        case 'WaitingCensor':
            return '未审核';
        case 'Canceled':
            return '作废';
        case 'Reject':
            return '审核驳回';
        default:
            return '未知';
    }
}
Srims.fund.FinanceVoucherState = "NotSignIn,SignIn,Allocated";
Srims.fund.VoucherStateFilterItems = [{
    id: 'UnPrinted',
    text: '未打印'
}, {
    id: 'NotSignIn',
    text: '已打印/未签收'
}, {
    id: 'SignIn',
    text: '签收/未分配'
}, {
    id: 'Allocated',
    text: '已分配'
}];

Srims.fund.VoucherStateStore = [['UnPrinted', '未打印'], ['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
Srims.fund.VoucherStateForFinanceStore = [['NotSignIn', '已打印/未签收'], ['SignIn', '签收/未分配'], ['Allocated', '已分配']];
if (!Srims.fund)
	Ext.namespace('Srims.fund');
Srims.fund.VoucherGridPanel_ColumnModel_Renderer = function(value, metadata, record) {

	if (record.get('isRead') == false)
		metadata.css = "voucher_unread " + metadata.css;

	return value;
};
Srims.fund.VoucherGridPanel_ColumnModel = function(isFinanceManage, isExpert) {
	Srims.fund.VoucherGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber',
		sortable: true,
		width: 40,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "专家",
		dataIndex: 'expertName',
		sortable: true,
		width: 30,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "项目名称",
		dataIndex: 'projectName',
		sortable: true,
		hidden: false,
		width: 90,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "状态",
		dataIndex: 'voucherState',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Srims.fund.VoucherStateRender(value);
		}
	},{
		header: "财务分配时间",
		dataIndex: 'financeAllocationDateTime',
		width: 20,
		sortable: true,
		hidden: !isFinanceManage,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Date.render(value);
		}
	},{
		header: "制单号",
		dataIndex: 'financeNumber',
		width: 40,
		sortable: true,
		hidden: !isFinanceManage,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "硬件费(万元)",
		dataIndex: 'allocationHardware',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "校内分配(万元)",
		dataIndex: 'allocationIn',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "绩效账本号",
		dataIndex: 'performanceAccountBookNumber',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return value;
		}
	},{
		header: "绩效分配(万元)",
		dataIndex: 'performancePay',
		width: 40,
		sortable: true,
		hidden: false,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "外协分配(万元)",
		dataIndex: 'allocationOut',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "已读",
		dataIndex: 'isRead',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Boolean.render(value);
		}
	},{
		header: "校内分配管理费(万元)",
		dataIndex: 'overheadExpensesIn',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "外协分配管理费(万元)",
		dataIndex: 'overheadExpensesOut',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "绩效管理费(万元)",
		dataIndex: 'overheadPerformancePay',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	},{
		header: "管理费(万元)",
		dataIndex: 'overheadExpenses',
		width: 40,
		sortable: true,
		hidden: true,
		renderer: function(value, metadata, record) {
			if (isExpert && record.get('isRead') == false)
				Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
			return Money.render(value);
		}
	}]);

	this.defaultSortable = false;
}
Ext.extend(Srims.fund.VoucherGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherGridPanel_ToolBar = function(selection, store, panelId, queryParams, isFinanceManage, isFundAllocation, fundAllocation, isExpertGuid, isCorrect) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._fundAllocation = fundAllocation;
    if (this._fundAllocation) {
        this._fundAllocation.store = store;
        this._fundAllocation.toobBar = this;
    }
    var user = Srims.currentLoginLog.user;
    this._isExpert = user.userRoleType == 'Expert' ? true : false;
    //controls
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">分配产生的凭单信息</b>',
        minWidth: 60
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '更新外协单位名称',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.fund.showOutsourcingNameImportWindow(this.store);
        },
        tooltip: '<b>项目导入</b><br/>将项目从excel表导入到数据库中',
        hidden: !user.isSuper
    });
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.fund.showVoucherQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, isFinanceManage, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>凭单查询</b><br/>对凭单信息进行复杂查询'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.fund.editVoucher(this.fundAllocation, this.selection.getSelected(), isCorrect);
        },
        hidden: true,
        tooltip: '<b>编辑凭单</b><br/>编辑选中的凭单'
    });
    this._buttonResetAccountBookNumber = new Ext.Toolbar.Button({
        iconCls: 'icon-edit-account-book-nunber',
        text: '编辑账本号',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.fund.showEditAccountBookNumberWindow(this.selection.getSelected(), this.fundAllocation);
        },
        hidden: true,
        tooltip: '<b>编辑凭单账本号</b><br/>当凭单账本号为新建时，编辑凭单账本号'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        fundAllocation: this._fundAllocation,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除凭单', '你确定要删除这个凭单吗？', function(buttonId) {
                if (buttonId == 'yes')
                    Srims.fund.deleteVoucher(this.selection.getSelected(), this.fundAllocation, isCorrect);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除凭单</b><br/>删除选中的凭单'
    });
    this._buttonShowVoucher = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        isExpert: this._isExpert,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            if (this.isExpert)
                Srims.fund.SetIsReadAndshowVoucher(this.selection.getSelected(), this.store, isFinanceManage,fundAllocation);
            else
                Srims.fund.showVoucher(this.selection.getSelected(), this.store, isFinanceManage,fundAllocation);
        },
        tooltip: '<b>查看凭单信息</b>'
    });
    this._buttonFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配',
        minWidth: 60,
        fundAllocation: this._fundAllocation,
        handler: function() {
            Srims.fund.newVoucher(this.fundAllocation, isCorrect);
        },
        tooltip: '<b>分配经费</b><br/>对所选经费下拨进行分配'
    });
    this._buttonShowFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '查看分配信息',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.fund.showVoucherFundAllocationInfo(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看该凭单对应的经费分配情况</b>'
    });
    this._buttonSignIn = new Ext.Toolbar.Button({
        iconCls: 'icon-sign-in',
        text: '签收',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '签收凭单';
            message = '你确定要签收这张凭单吗？';
            action = 'signIn';
            methodName = '/VoucherSignIn';
            Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>签收凭单</b><br/>签收凭单'
    });

    this._buttonReturn = new Ext.Toolbar.Button({
        iconCls: 'icon-return',
        text: '退回',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '退回凭单';
            message = '你确定要退回这张凭单吗？';
            action = 'return';
            methodName = '/VoucherReturn';
            Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>退回凭单</b>、'
    });

    this._buttonAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-allocate',
        text: '分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.finance.allocateVoucher(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>分配</b>'
    });

    this._buttonCancleAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel-allocate',
        text: '取消分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '取消分配凭单';
            message = '你确定要取消这张凭单的分配吗？';
            action = 'cancel';
            methodName = '/VoucherCancleAllocate';
            Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>取消分配</b>'
    });
    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '打印凭单';
            message = '你确定要打印这张凭单吗？';
            action = 'print';
            methodName = '/VoucherPrint';

            if (this.selection.getSelected().get('accountBookNumber').substring(0, 4) == "9999") {
                Ext.Msg.show({
                    title: '不能打印',
                    msg: '账本号对应的学院为其它，请找超级管理员手动修改账本号。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
                Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
            }
        },
        tooltip: '<b>打印凭单</b>'
    });
    this._buttonResetPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print-reset',
        text: '重置打印',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '重置打印';
            message = '你确定要重置打印这张凭单吗？';
            action = 'resetPrint';
            methodName = '/VoucherResetPrint';
            Srims.fund.changeVoucherState(this.selection.getSelected(), this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>重置打印</b>'
    });
    this._buttonExport = new Ext.Toolbar.Button({
        iconCls: 'icon-export',
        text: '导出已签收凭单',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.finance.exportSignInVoucher(queryParams);
        },
        tooltip: '<b>导出已签收凭单</b><br/>导出已签收凭单'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        toolbar: this,
        fundAllocation: this._fundAllocation,
        handler: function() {
            this.store.load();

            //用于数据纠错
            if (isCorrect)
                Ext.Ajax.request({
                    url: Srims.service.fund.FundAllocationService + '/GetById',
                    params: {
                        fundAllocationId: fundAllocation.get('id')
                    },
                    scope: this,
                    success: function(response) {
                        var fundAllocationstore = new Ext.data.Store({
                            data: response.responseXML,
                            reader: new Srims.fund.FundAllocationXmlReader()
                        });
                        var currentFundAllocation = fundAllocationstore.getAt(0);
                        currentFundAllocation.panel = this.fundAllocation.panel;
                        currentFundAllocation.store = this.store;
                        currentFundAllocation.toobBar = this.toobBar;
                        this.toolbar.resetComponentFundAllocation(currentFundAllocation);
                    }
                });
        },
        tooltip: '<b>刷新列表</b><br/>更新凭单财务列表列表'
    });

    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            if (isFinanceManage)
                queryParams.voucherState = Srims.fund.FinanceVoucherState;
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    var items;
    if (isFundAllocation) {
        if (isExpertGuid)
            items = [this._buttonHeader, this._buttonShowVoucher, this._buttonDelete, this._buttonResetAccountBookNumber]//3-_buttonEdit
        else {
            if (isCorrect)
                items = [this._buttonFundAllocation, this._buttonShowVoucher, this._buttonDelete, this._buttonResetAccountBookNumber, new Ext.Toolbar.Fill(), this._buttonRefresh]; //3-this._buttonEdit,
            else
                items = [this._buttonShowVoucher, this._buttonDelete, this._buttonResetAccountBookNumber]; //2-this._buttonEdit,
        }
    }
    else {
        if (isFinanceManage)
            items = [this._buttonQuery,this._buttonImport , this._buttonShowVoucher, this._buttonSignIn, this._buttonReturn, this._buttonAllocate, this._buttonCancleAllocate, new Ext.Toolbar.Fill(), this._buttonExport, this._buttonRefresh, this._buttonReset];
        else
            items = [this._buttonQuery,this._buttonImport , this._buttonShowVoucher, this._buttonPrint, this._buttonResetPrint, this._buttonShowFundAllocation, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    }
    Srims.fund.VoucherGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items,
        height: 25
    });
    //initial
    this._selection.buttonShowVoucher = this._buttonShowVoucher;
    this._selection.buttonPrint = this._buttonPrint;
    this._selection.buttonResetPrint = this._buttonResetPrint;
    this._selection.buttonSignIn = this._buttonSignIn;
    this._selection.buttonReturn = this._buttonReturn;
    this._selection.buttonAllocate = this._buttonAllocate;
    this._selection.buttonCancleAllocate = this._buttonCancleAllocate;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonResetAccountBookNumber = this._buttonResetAccountBookNumber;
    this._selection.buttonShowFundAllocation = this._buttonShowFundAllocation;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShowVoucher = selection.buttonShowVoucher;
        var buttonPrint = selection.buttonPrint;
        var buttonResetPrint = selection.buttonResetPrint;
        var buttonSignIn = selection.buttonSignIn;
        var buttonReturn = selection.buttonReturn;
        var buttonAllocate = selection.buttonAllocate;
        var buttonCancleAllocate = selection.buttonCancleAllocate;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonResetAccountBookNumber = selection.buttonResetAccountBookNumber;
        var buttonShowFundAllocation = selection.buttonShowFundAllocation;

        if (selection.getCount() == 0) {
            buttonShowVoucher.hide();
            buttonPrint.hide();
            buttonResetPrint.hide();
            buttonSignIn.hide();
            buttonReturn.hide();
            buttonAllocate.hide();
            buttonCancleAllocate.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonResetAccountBookNumber.hide();
            buttonShowFundAllocation.hide();
            return;
        }

        var voucher = selection.getSelected();

        buttonResetAccountBookNumber.setVisible(voucher.get('hasPermission_ResetAccountBookNumber'));
        buttonResetAccountBookNumber.setDisabled(!voucher.get('canResetAccountBookNumber'));

        if (!isCorrect) {
            buttonEdit.setVisible(voucher.get('hasPermission_Edit'));
            buttonEdit.setDisabled(!voucher.get('canEdit'));

            buttonDelete.setVisible(voucher.get('hasPermission_Delete'));
            buttonDelete.setDisabled(!voucher.get('canDelete'));
        }
        else {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);

            buttonDelete.setVisible(true);
            buttonDelete.setDisabled(false);
        }

        buttonShowFundAllocation.setVisible(voucher.get('hasPermission_ShowFundAllocation'));
        buttonShowFundAllocation.setDisabled(!voucher.get('canShowFundAllocation'));

        buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
        buttonSignIn.setDisabled(!voucher.get('canSignIn'));

        buttonShowVoucher.setVisible(voucher.get('hasPermission_Show'));
        buttonShowVoucher.setDisabled(!voucher.get('canShow'));

        buttonPrint.setVisible(voucher.get('hasPermission_Print'));
        buttonPrint.setDisabled(!voucher.get('canPrint'));

        buttonResetPrint.setVisible(voucher.get('hasPermission_ResetPrint'));
        buttonResetPrint.setDisabled(!voucher.get('canResetPrint'));

        buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
        buttonSignIn.setDisabled(!voucher.get('canSignIn'));

        buttonReturn.setVisible(voucher.get('hasPermission_ReturnVoucher'));
        buttonReturn.setDisabled(!voucher.get('canReturnVoucher'));

        buttonAllocate.setVisible(voucher.get('hasPermission_FinanceAllocate'));
        buttonAllocate.setDisabled(!voucher.get('canFinanceAllocate'));

        buttonCancleAllocate.setVisible(voucher.get('hasPermission_CancelFinanceAllocate'));
        buttonCancleAllocate.setDisabled(!voucher.get('canCancelFinanceAllocate'));
    }
    this.resetComponentFundAllocation = function(currentFundAllocation) {
        this._buttonEdit.fundAllocation = currentFundAllocation;
        this._buttonDelete.fundAllocation = currentFundAllocation;
        this._buttonFundAllocation.fundAllocation = currentFundAllocation;
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.VoucherGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.finance) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherGridPanel = function(id, voucherStore, title, iconCls, queryParams, isFinanceManage){

    //fields
    this._store = voucherStore;
    this._store.grid = this;
    var user = Srims.currentLoginLog.user;
    var isExpert = user.userRoleType == 'Expert' ? true : false;
    //controls    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.VoucherGridPanel_ColumnModel(isFinanceManage, isExpert);
    this._toolbar = new Srims.fund.VoucherGridPanel_ToolBar(this._selections, this._store, id, queryParams, isFinanceManage, false, undefined);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    //constructor
    Srims.fund.VoucherGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var voucher = grid.getStore().getAt(rowIndex);
        Srims.fund.showVoucher(voucher, grid._store, isFinanceManage);
    }
}
Ext.extend(Srims.fund.VoucherGridPanel, Srims.component.GridPanel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherQueryWindow_InforPanel = function(isFinanceManage){

    var voucherStateStore = isFinanceManage ? Srims.fund.VoucherStateForFinanceStore : Srims.fund.VoucherStateStore;
    
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        width: 150
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家',
        width: 167
    });
    this._comboBoxProject = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目名称',
        width: 167
    });
    this._dateFieldFinanceAllocationDateBegin = new Ext.form.DateField({
        fieldLabel: '财务分配时间',
        width: 150
    });
    this._dateFieldFinanceAllocationDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        width: 150
    });
    this._numberFieldFinanceNumber = new Ext.form.NumberField({
        fieldLabel: '财务制单号',
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false,
        minLength: 5,
        maxLength: 5,
        width: 150
    });
    this._checkBoxIsHorizontal = new Ext.form.Checkbox({
        fieldLabel: '是否横向项目'
    });
    this._checkboxGroupVoucherStates = new Srims.component.CheckBoxGroup({
        fieldLabel: '凭单状态',
        cls: 'srims-checkboxGroup',
        columns: isFinanceManage ? 3 : 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(voucherStateStore)
    });
    var columnFirstItems = [this._textFieldVoucherNumber, this._comboBoxProject, this._textFieldAccountBookNumber, this._dateFieldFinanceAllocationDateBegin];
    var columnSecondItems = [this._comboBoxExpert, this._checkBoxIsHorizontal, this._numberFieldFinanceNumber, this._dateFieldFinanceAllocationDateEnd];
    
    Srims.fund.VoucherQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 252,
                layout: 'form',
                labelWidth: 80,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 90,
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._checkboxGroupVoucherStates]
    });
    
    this.buildParams = function(params){
        params.voucherNumber = this._textFieldVoucherNumber.getValue();
        params.accountBookNumber = this._textFieldAccountBookNumber.getValue();
        params.financeNumber = this._numberFieldFinanceNumber.getValue();
        params.isHorizontal = this._checkBoxIsHorizontal.checked ? "true" : "";
        params.allocationDateTimeStart = Date.format(this._dateFieldFinanceAllocationDateBegin.getValue());
        params.allocationDateTimeEnd = Date.format(this._dateFieldFinanceAllocationDateEnd.getValue());
        params.voucherState = this._checkboxGroupVoucherStates.getSelecetedValue();
        params.expertName = this._comboBoxExpert.getText();
        params.projectName = this._comboBoxProject.getText();
    }
    
    this.clearParams = function(){
        this._textFieldVoucherNumber.reset();
        this._textFieldAccountBookNumber.reset();
        this._numberFieldFinanceNumber.reset();
        this._checkBoxIsHorizontal.reset();
        this._dateFieldFinanceAllocationDateBegin.reset();
        this._dateFieldFinanceAllocationDateEnd.reset();
        this._checkboxGroupVoucherStates.reset();
        this._comboBoxExpert.reset();
        this._comboBoxProject.reset();
    }
}
Ext.extend(Srims.fund.VoucherQueryWindow_InforPanel, Ext.FormPanel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherQueryWindow = function(id, store, queryParams, isFinanceManage){

    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.fund.VoucherQueryWindow_InforPanel(isFinanceManage);
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.fund.VoucherQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '凭单查询',
        iconCls: 'icon-voucher-query',
        width: 603,
        height: 226,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 600,
            layout: 'form',
            labelWidth: 90,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        this._basicPanel.buildParams(params);
        if (isFinanceManage && !params.voucherState) 
            params.voucherState = Srims.fund.FinanceVoucherState;
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    
    this.query = function(button){
        var window = button.window;
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.fund.VoucherQueryWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOut = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'alamount',
    type: 'int',
    mapping: 'AlAmount'
}, {
    name: 'plamount',
    type: 'int',
    mapping: 'PlAmount'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'corporation',
    type: 'string',
    mapping: 'Corporation'
}, {
    name: 'voucherID',
    type: 'int',
    mapping: 'VoucherID'
    }, {
    name: 'outsourcingID',
    type: 'int',
    mapping: 'OutsourcingID'
}]);

Srims.data.Entity.apply(Srims.fund.VoucherOut);



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOutXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherOutXmlReader.superclass.constructor.call(this, Srims.fund.VoucherOut);
    }
});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherOutStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(voucherId){
        Srims.fund.VoucherOutStore.superclass.constructor.call(this, new Srims.fund.VoucherOutXmlReader(), Srims.service.fund.VoucherOutService + '/GetByVoucherID', {
            voucherID: voucherId
        });
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherOutColumnModel = function(){
    Srims.fund.VoucherOutColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "外协单位",
        dataIndex: 'corporation',
        width: 80,
        hidden: false
    }, {
        header: "金额(万元)",
        dataIndex: 'amount',
        width: 40,
        renderer: Money.render,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.fund.VoucherOutColumnModel, Ext.grid.ColumnModel);

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherStateHistory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.fund.VoucherStateHistory);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryColumnModel = function(){
    Srims.fund.VoucherStateHistoryColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.fund.VoucherStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 100,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        header: "备注",
        dataIndex: 'remark'
    }])
}
Ext.extend(Srims.fund.VoucherStateHistoryColumnModel, Ext.grid.ColumnModel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.fund.VoucherStateHistoryXmlReader.superclass.constructor.call(this, Srims.fund.VoucherStateHistory);
    }
});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(voucherId){
        Srims.fund.VoucherStateHistoryStore.superclass.constructor.call(this, new Srims.fund.VoucherStateHistoryXmlReader(),  Srims.service.fund.VoucherStateHistoryService + '/GetVoucherStateHistories', {
            voucherID: voucherId
        });
    }
});if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_BasicForm = function(voucher) {
    this._voucher = voucher;

    this._textFieldFundMember = new Ext.form.TextField({
        fieldLabel: '经费成员',
        value: voucher.get('expertName'),
        readOnly: true,
        width: 200
    });
    this._textFieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: voucher.get('overheadPerformancePay') > 0 ? '绩效账本号' : '账本号',
        value: voucher.get('accountBookNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldFinanceNumber = new Ext.form.TextField({
        fieldLabel: '财务制单号',
        value: voucher.get('financeNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '总金额',
        value: Money.render(voucher.get('amount')) + '(校内间接费：' + Money.render(voucher.get('overheadExpenses')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationIn = new Ext.form.TextField({
        fieldLabel: '校内分配',
        value: Money.render(voucher.get('allocationIn')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationOut = new Ext.form.TextField({
        fieldLabel: '外协分配',
        value: Money.render(voucher.get('allocationOut')) + '(间接费：' + Money.render(voucher.get('overheadExpensesOut')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationHardware = new Ext.form.TextField({
        fieldLabel: '硬件费',
        value: Money.render(voucher.get('allocationHardware')),
        readOnly: true,
        width: 200
    });
    this._textFieldPerformanceAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '绩效账本号',
        value: voucher.get('performanceAccountBookNumber'),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationPerformancePay = new Ext.form.TextField({
        fieldLabel: '绩效分配',
        value: Money.render(voucher.get('overheadPerformancePay')) + '(绩效管理费：' + Money.render(voucher.get('performancePay')) + ')',
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.fund.VoucherStateRender(voucher.get('voucherState')),
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentStateTime = new Ext.form.TextField({
        fieldLabel: '当前状态时间',
        value: Date.render(voucher.get('stateDateTime')),
        readOnly: true,
        width: 200
    });
    this._textFieldCurrentStateOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: voucher.get('stateOperator'),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationShoolIn = new Ext.form.TextField({
        fieldLabel: '校内间接费用',
        value: Money.render(voucher.get('overheadExpenses')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationShool = new Ext.form.TextField({
        fieldLabel: '学校间接费用',
        value: Money.render(voucher.get('overheadExpensesIn')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationCompus = new Ext.form.TextField({
        fieldLabel: '二级单位间接费用',
        value: Money.render(voucher.get('overheadExpensesMiddle')),
        readOnly: true,
        width: 200
    });
    this._textFieldAllocationExpert = new Ext.form.TextField({
        fieldLabel: '课题组间接费用',
        value: Money.render(voucher.get('overheadExpensesExpert')),
        readOnly: true,
        width: 200
    });
    var columnFirstItems = [this._textFieldFundMember, this._textFieldAmount, this._textFieldAllocationOut, this._textFieldAllocationShoolIn, this._textFieldAllocationCompus, this._textFieldFinanceNumber, this._textFieldCurrentStateTime, this._textFieldCurrentStateOperator];
    var columnSecondItems = [this._textFieldAccountBookNumber, this._textFieldAllocationIn, this._textFieldAllocationHardware, this._textFieldAllocationShool, this._textFieldAllocationExpert, this._textFieldAllocationPerformancePay, this._textFieldCurrentState];

    Srims.fund.VoucherShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '凭单基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });

    //方法
    this.resetValues = function(voucher) {
        this._textFieldFundMember.setValue(voucher.get('expertName'));
        this._textFieldAccountBookNumber.setValue(voucher.get('accountBookNumber'));
        this._textFieldFinanceNumber.setValue(voucher.get('financeNumber'));
        this._textFieldAmount.setValue(Money.render(voucher.get('amount')) + '(校内间接费：' + Money.render(voucher.get('overheadExpenses')) + ')');
        this._textFieldAllocationIn.setValue(Money.render(voucher.get('allocationIn')) + '(管理费：' + Money.render(voucher.get('overheadExpensesIn')) + ')');
        this._textFieldAllocationOut.setValue(Money.render(voucher.get('allocationOut')) + '(间接费：' + Money.render(voucher.get('overheadExpensesOut')) + ')');
        this._textFieldAllocationHardware.setValue(Money.render(voucher.get('allocationHardware')));
        this._textFieldCurrentState.setValue(Srims.fund.VoucherStateRender(voucher.get('voucherState')));
        this._textFieldCurrentStateTime.setValue(Date.render(voucher.get('stateDateTime')));
        this._textFieldCurrentStateOperator.setValue(voucher.get('stateOperator'));
        this._textFieldPerformanceAccountBookNumber.setValue(voucher.get('performanceAccountBookNumber'));
        this._textFieldAllocationPerformancePay.setValue(Money.render(voucher.get('overheadPerformancePay')) + '(绩效管理费：' + Money.render(voucher.get('performancePay')) + ')');
        this._textFieldAllocationShool.setValue(Money.render(voucher.get('overheadExpensesIn')));
        this._textFieldAllocationShoolIn.setValue(Money.render(voucher.get('overheadExpenses')));
        this._textFieldAllocationCompus.setValue(Money.render(voucher.get('overheadExpensesMiddle')));
        this._textFieldAllocationExpert.setValue(Money.render(voucher.get('overheadExpensesExpert')));
    }
}
Ext.extend(Srims.fund.VoucherShowPanel_BasicForm, Ext.form.FormPanel, {});
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_StateHistoryForm = function(voucher){
    this._voucher = voucher;
    this._store = new Srims.fund.VoucherStateHistoryStore(voucher.get('id'));
    
    this._columnModel = new Srims.fund.VoucherStateHistoryColumnModel();
    
    this._gridPanelVoucherStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有凭单状态历史信息'
        }
    });
    
    Srims.fund.VoucherShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '凭单状态历史信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelVoucherStateHistory]
    });
    
    this._store.load();
}

Ext.extend(Srims.fund.VoucherShowPanel_StateHistoryForm, Ext.form.FormPanel, {});

if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_FundAllocationForm = function(voucher) {
    this._voucher = voucher;
    this._voucherFundAllocation = Srims.fund.getFundAllocationFromVoucher(this._voucher, this._fundAllocations);
    return new Srims.fund.FundAllocationShowPanel_BasicForm(this._voucherFundAllocation, true);
}
Srims.fund.getFundAllocationFromVoucher = function(voucher) {
    var fundAllocation = new Srims.fund.FundAllocation({});
    fundAllocation.set('allocationDateTime', voucher.get('fundAllocationDateTime'));
    fundAllocation.set('allocationTotal', voucher.get('fundAllocationAllocationTotal'));
    fundAllocation.set('allocationIn', voucher.get('fundAllocationAllocationIn'));
    fundAllocation.set('allocationOut', voucher.get('fundAllocationAllocationOut'));
    fundAllocation.set('allocationHardware', voucher.get('fundAllocationHardware'));


    fundAllocation.set('overheadExpenses', voucher.get('fundAllocationOverheadExpenses'));

    fundAllocation.set('dateTime', voucher.get('fundAllocationStateDateTime'));
    fundAllocation.set('operator', voucher.get('fundAllocationStateOperator'));
    fundAllocation.set('remark', voucher.get('fundAllocationStateRemark'));
    fundAllocation.set('state', voucher.get('fundAllocationState'));
    fundAllocation.set('overheadExpensesOut', voucher.get('fundAllocationOverheadExpensesOut'));
    fundAllocation.set('projectName', voucher.get('projectName'));
    fundAllocation.set('projectTypeName', voucher.get('projectType'));
    fundAllocation.set('projectPricinpalName', voucher.get('projectPrincipal'));

    fundAllocation.set('overheadPerformancePay', voucher.get('overheadPerformancePay'));
    fundAllocation.set('overheadExpensesMiddle', voucher.get('fundAllocationOverheadExpensesMiddle'));
    fundAllocation.set('overheadExpensesExpert', voucher.get('fundAllocationOverheadExpensesExpert'));
    fundAllocation.set('overheadExpensesIn', voucher.get('fundAllocationOverheadExpensesIn'));
    return fundAllocation;
}

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherShowPanel_VoucherOutForm = function(voucher){

    this._voucher = voucher;
    this._store = new Srims.fund.VoucherOutStore(voucher.get('id'));
    
    this._columnModel = new Srims.fund.VoucherOutColumnModel();
    
    this._gridPanelVoucherOut = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有外协分配信息'
        }
    });
    
    Srims.fund.VoucherShowPanel_VoucherOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协分配信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelVoucherOut]
    });
    
    this._store.load();
}
Ext.extend(Srims.fund.VoucherShowPanel_VoucherOutForm, Ext.FormPanel, {});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel_FinanceForm = function(voucher){
    this._voucher = voucher;
    this._voucherFinance = Srims.fund.getFinanceFromVoucher(this._voucher);
    this._isBorrow = voucher.get('isBorrow');
    return new Srims.fund.FinanceShowForm(this._voucherFinance, this._isBorrow);
}
Srims.fund.getFinanceFromVoucher = function(voucher){
    var finance = new Srims.fund.Finance({});
    finance.set('amount', voucher.get('financeAmount'));
    finance.set('receivedDate', voucher.get('financeReceivedDate'));
    finance.set('voucherNumber', voucher.get('financeVoucherNumber'));
    finance.set('abstract', voucher.get('financeAbstract'));
    
    return finance;
}

if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherShowPanel_ToolBar = function(voucher, store, panelId, isFinanceManage, panel) {

    //fields
    this._voucher = voucher;
    this._panelId = panelId;
    this._store = store;
    //controls
    this._buttonSignIn = new Ext.Toolbar.Button({
        iconCls: 'icon-sign-in',
        text: '签收',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        handler: function() {
            titile = '签收凭单';
            message = '你确定要签收这张凭单吗？';
            action = 'signIn';
            methodName = '/VoucherSignIn';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>签收凭单</b><br/>签收凭单'
    });

    this._buttonReturn = new Ext.Toolbar.Button({
        iconCls: 'icon-return',
        text: '退回',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        hidden: true,
        handler: function() {
            titile = '退回凭单';
            message = '你确定要退回这张凭单吗？';
            action = 'return';
            methodName = '/VoucherReturn';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>退回凭单</b>、'
    });

    this._buttonAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-allocate',
        text: '分配',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        hidden: true,
        handler: function() {
            Srims.finance.allocateVoucher(this.voucher, this.store);
        },
        tooltip: '<b>分配</b>'
    });

    this._buttonCancleAllocate = new Ext.Toolbar.Button({
        iconCls: 'icon-cancel-allocate',
        text: '取消分配',
        minWidth: 60,
        voucher: this._voucher,
        store: this._store,
        handler: function() {
            titile = '取消分配凭单';
            message = '你确定要取消这张凭单的分配吗？';
            action = 'cancel';
            methodName = '/VoucherCancleAllocate';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        hidden: true,
        tooltip: '<b>取消分配</b>'
    });

    this._buttonPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print',
        text: '打印',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        hidden: true,
        handler: function() {
            titile = '打印凭单';
            message = '你确定要打印这张凭单吗？';
            action = 'print';
            methodName = '/VoucherPrint';
            if (this.voucher.get('accountBookNumber').substring(0, 4) == "9999") {
                Ext.Msg.show({
                    title: '不能打印',
                    msg: '账本号对应的学院为其它，请找超级管理员手动修改账本号。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else {
                Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
            }
        },
        tooltip: '<b>打印凭单</b>'
    });
    this._buttonResetPrint = new Ext.Toolbar.Button({
        iconCls: 'icon-print-reset',
        text: '重置打印',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        disabled:!voucher.get('canResetPrint'),
        hidden: true,
        handler: function() {
            titile = '重置打印';
            message = '你确定要重置打印这张凭单吗？';
            action = 'resetPrint';
            methodName = '/VoucherResetPrint';
            Srims.fund.changeVoucherState(this.voucher, this.store, titile, message, action, methodName, isFinanceManage);
        },
        tooltip: '<b>重置打印</b>'
    });
    this._buttonShowFundAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '查看分配信息',
        minWidth: 60,
        voucher: this._voucher,
        handler: function() {
            Srims.fund.showVoucherFundAllocationInfo(this.voucher);
        },
        hidden: true,
        tooltip: '<b>查看该凭单对应的经费分配情况</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        voucher: this._voucher,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.fund.VoucherService + '/GetById',
                params: {
                    voucherId: this.voucher.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.fund.VoucherXmlReader()
                    });
                    var currentVoucher = store.getAt(0);
                    //var panel = Ext.getCmp(isFinanceManage ? 'PerformanceVoucherFinanceShowPanel' : 'PerformanceVoucherShowPanel' + currentVoucher.get('id'));
                    panel.resetValues(currentVoucher);
                    panel._stateHistoryForm._store.load();
                    panel._voucherOutForm._store.load();
                }
            });
        },
        tooltip: '<b>刷新凭单</b><br/>更新凭单显示信息'
    });
    //initial
    this._buttonPrint.setVisible(voucher.get('hasPermission_Print'));
    this._buttonPrint.setDisabled(!voucher.get('canPrint'));

    this._buttonResetPrint.setVisible(voucher.get('hasPermission_ResetPrint'));
    this._buttonResetPrint.setDisabled(!voucher.get('canResetPrint'));

    this._buttonShowFundAllocation.setVisible(voucher.get('hasPermission_ShowFundAllocation'));
    this._buttonShowFundAllocation.setDisabled(!voucher.get('canShowFundAllocation'));

    this._buttonSignIn.setVisible(voucher.get('hasPermission_SignIn'));
    this._buttonSignIn.setDisabled(!voucher.get('canSignIn'));

    this._buttonReturn.setVisible(voucher.get('hasPermission_ReturnVoucher'));
    this._buttonReturn.setDisabled(!voucher.get('canReturnVoucher'));

    this._buttonAllocate.setVisible(voucher.get('hasPermission_FinanceAllocate'));
    this._buttonAllocate.setDisabled(!voucher.get('canFinanceAllocate'));

    this._buttonCancleAllocate.setVisible(voucher.get('hasPermission_CancelFinanceAllocate'));
    this._buttonCancleAllocate.setDisabled(!voucher.get('canCancelFinanceAllocate'));

    var items;
    if (isFinanceManage)
        items = [this._buttonSignIn, this._buttonReturn, this._buttonAllocate, this._buttonCancleAllocate, new Ext.Toolbar.Fill(), this._buttonRefresh];
    else
        items = [this._buttonPrint, this._buttonResetPrint, this._buttonShowFundAllocation, new Ext.Toolbar.Fill(), this._buttonRefresh];
    Srims.fund.VoucherShowPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });

}
Ext.extend(Srims.fund.VoucherShowPanel_ToolBar, Ext.Toolbar);

if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherShowPanel = function(panelId, voucher, store, isFinanceManage,fundAllocation) {

    this._id = panelId;
    this._voucher = voucher;
    this._store = store;

    this._basicForm = new Srims.fund.VoucherShowPanel_BasicForm(voucher);
    this._stateHistoryForm = new Srims.fund.VoucherShowPanel_StateHistoryForm(voucher);
    this._voucherOutForm = new Srims.fund.VoucherShowPanel_VoucherOutForm(voucher);
    this._fundAllocationForm = new Srims.fund.VoucherShowPanel_FundAllocationForm(voucher);
    this._financeForm = new Srims.fund.VoucherShowPanel_FinanceForm(voucher);
    this._toolBar = new Srims.fund.VoucherShowPanel_ToolBar(voucher, this._store, this._id, isFinanceManage, this);

    var user = Srims.currentLoginLog.user;
    this._isExpert = user.userRoleType == 'Expert' ? true : false;

    var items = [];
    if (this._isExpert)
        items = [this._basicForm, this._voucherOutForm, this._stateHistoryForm];
    else
        items = [this._basicForm, this._voucherOutForm, this._fundAllocationForm, this._financeForm, this._stateHistoryForm];

    Srims.fund.VoucherShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '凭单' + this._voucher.get('voucherNumber'),
        iconCls: 'icon-show',
        tbar: this._isExpert ? undefined : this._toolBar,
        items: items
    });
    this.resetValues = function(voucher) {
        var fundAllocation = Srims.fund.getFundAllocationFromVoucher(voucher,fundAllocation);
        var finance = Srims.fund.getFinanceFromVoucher(voucher);
        this._basicForm.resetValues(voucher);
        this._fundAllocationForm.resetComponnentsValue(fundAllocation);
        this._financeForm.resetComponnentsValue(finance);
    }
}
Ext.extend(Srims.fund.VoucherShowPanel, Ext.Panel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherPrintWindow = function(id, voucher){
    this._id = id;
    this._voucher = voucher;
    
    this._buttonPrint = new Ext.Button({
        id: 'voucher-print-button',
        minWidth: 80,
        text: '打 印',
        window: this,
        handler: function(){
            this.window.print();
        }
    });
    
    
    Srims.fund.VoucherPrintWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '打印凭单' + voucher.get('voucherNumber'),
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        width: 800,
        autoHeight: true,
        closeAction: 'hide',
        layout: 'form',
        buttonAlign: 'center',
        resizable: false,
        items: new Ext.TabPanel({
            activeTab: 0,
            border: false,
            items: [{
                html: getTableElement(voucher)
            }]
        }),
        buttons: [this._buttonPrint]
    });
    
}
Ext.extend(Srims.fund.VoucherPrintWindow, Ext.Window);

getTableElement = function(voucher){
    var now = new Date();
    var voucherPrintTable = new Ext.ux.StringBuilder('<style type="text/css">');
    
   voucherPrintTable.append('#TableVoucherDetial{ width: 700px;height: 180px; border-bottom: solid 1px Black;border-right: solid 1px Black;}');
    voucherPrintTable.append('.tableDetial{width: 698px;height: 30px;}');
    voucherPrintTable.append('.label{text-align: center;border-left: solid 1px Black;border-top: solid 1px Black;}');
    voucherPrintTable.append('.data{border-top: solid 1px Black;text-align: left;padding-left: 5px;border-left: solid 1px Black;}');
    voucherPrintTable.append('</style>');
    voucherPrintTable.append('<form id="MainForm" runat="server">');
    
    voucherPrintTable.append('<div id="title" class="print" style="padding-top: 30px">');
    voucherPrintTable.append('<div id="title1" style="text-align: center; font-size: large"><p>中国海洋大学科技经费下款通知书</p></div>');
    voucherPrintTable.append('<div id="title2"><label id="LabelTime" runat="server" style="padding-left: 35px;">');
    voucherPrintTable.append(now.toUTCString());
    voucherPrintTable.append('</label><label id="LabelVacherNumber" runat="server" style="padding-left: 150px;">');
    voucherPrintTable.append('凭单号：' + voucher.get('voucherNumber'));
    voucherPrintTable.append('</label><label id="LabelUnit" runat="server" style="padding-left: 150px;">单位：万元</label></div></div>');
    
    voucherPrintTable.append('<div id="DivVoucherDetail" style="margin-left: 15px;">');
    voucherPrintTable.append('<table id="TableVoucherDetial" cellpadding="0" cellspacing="0">');
    
    voucherPrintTable.append('<tr><td>');
    voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
    voucherPrintTable.append('<tr>');
    voucherPrintTable.append('<td class="label " style="width: 65px;">负责人</td>');
    voucherPrintTable.append('<td class="data " style="width: 65px;">');
    voucherPrintTable.append(voucher.get('expertName'));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label" style="width: 70px;">课题名称</td>');
    voucherPrintTable.append('<td class="data " colspan="3">');
    if (voucher.get('projectIsSecret')) 
        voucherPrintTable.append('******');
    else 
        voucherPrintTable.append(voucher.get('projectName'));
    voucherPrintTable.append('</td></tr></table></td></tr>');
    
    voucherPrintTable.append('<tr><td>');
    voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
    voucherPrintTable.append('<tr>');
    voucherPrintTable.append('<td class="label " style="width: 70px;">所在院系</td>');
    voucherPrintTable.append('<td class="data " colspan="2">');
    voucherPrintTable.append(voucher.get('deparment'));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label " style="width: 70px;">项目种类</td>');
    voucherPrintTable.append('<td class="data" colspan="2">');
    voucherPrintTable.append(voucher.get('projectType'));
    voucherPrintTable.append('</td></tr></table></td></tr>');
    
    voucherPrintTable.append('<tr><td>');
    voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
    voucherPrintTable.append('<tr>');
    voucherPrintTable.append('<td class="label" style="width: 70px;">到款时间</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(Date.render(voucher.get('financeReceivedDate')));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label">凭证编号</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(voucher.get('financeVoucherNumber'));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label " style="width: 40px;">摘要</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(voucher.get('financeAbstract'));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label " style="width: 40px;">金额</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(Money.render(voucher.get('financeAmount'), false));
    voucherPrintTable.append('</td></tr></table></td></tr>');
    
    voucherPrintTable.append('<tr><td>');
    voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
    voucherPrintTable.append('<tr>');
    voucherPrintTable.append('<td class="label" style="width: 120px;">本帐卡分配经费</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(Money.render(voucher.get('amount'), false));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label " style="width: 65px;">帐本号</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(voucher.get('accountBookNumber'));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class=" label " style="width: 70px;">校内分配</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(Money.render(voucher.get('allocationIn'), false));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label" style="width: 90px;">校内管理费</td>');
    voucherPrintTable.append('<td class="data">');
    voucherPrintTable.append(Money.render(voucher.get('overheadExpensesIn'), false));
    voucherPrintTable.append('</td></tr></table></td></tr>');
    
    voucherPrintTable.append('<tr><td>');
    voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
    voucherPrintTable.append('<tr>');
    voucherPrintTable.append('<td class="label " style="width: 80px;">外协分配</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(Money.render(voucher.get('allocationOut'), false));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label " style="width: 90px;">外协管理费</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(Money.render(voucher.get('overheadExpensesOut'), false));
    voucherPrintTable.append('</td>');
    voucherPrintTable.append('<td class="label " style="width: 90px;">总管理费</td>');
    voucherPrintTable.append('<td class="data ">');
    voucherPrintTable.append(Money.render(voucher.get('overheadExpenses'), false));
    voucherPrintTable.append('</td></tr></table></td></tr>');
    
    ////外协单位列表
    var store = new Srims.fund.VoucherOutStore(voucher.get('id'));
    for (var i = 0; i < store.getCount(); i++) {
        var voucherOut = store.getAt(i);
        voucherPrintTable.append('<tr><td>');
        voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
        voucherPrintTable.append('<tr>');
        voucherPrintTable.append('<td class="label " style="height: 28px; width: 80px;">外协单位</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(voucherOut.get('corporation'));
        voucherPrintTable.append('</td>');
        voucherPrintTable.append('td class="label " style="height: 28px; width: 50px;">金额</td>');
        voucherPrintTable.append('<td class="data ">');
        voucherPrintTable.append(Money.render(voucherOut.get('amount'), false));
        voucherPrintTable.append('</td></tr></table></td></tr>');
    }
    
    voucherPrintTable.append('<tr><td>');
    voucherPrintTable.append('<table class="tableDetial" cellpadding="0" cellspacing="0">');
    voucherPrintTable.append('<tr>');
    voucherPrintTable.append('<td class="label " style="width: 65px;">备注</td>');
    voucherPrintTable.append('<td class="data " colspan="5">请于10个工作日内到财务处办理手续</td>');
    voucherPrintTable.append('</tr></table></td></tr></table></div>');
    
    voucherPrintTable.append('<label id="LabelCachet" runat="server" style="padding-left: 35px;">公章</label>');
    voucherPrintTable.append('<label id="LabelVacherMaker" runat="server" style="padding-left: 110px;">');
    voucherPrintTable.append('制单人：' + voucher.get('fundAllocationStateOperator'));
    voucherPrintTable.append('</label>');
    voucherPrintTable.append('<label id="LabelVoucnerCensor" runat="server" style="padding-left: 110px;">审核：</label>');
    voucherPrintTable.append('<label id="LabelTransactor" runat="server" style="padding-left: 110px;">经办人：</label>');
    voucherPrintTable.append('</form>');
    
    
    return voucherPrintTable.toString();
    
}

if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.ProjectOut = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'amount',
    type: 'int',
    mapping: 'Amount'
}, {
    name: 'outsourcingName',
    type: 'string',
    mapping: 'OutsourcingName'
}, {
    name: 'outsourcingID',
    type: 'int',
    mapping: 'OutsourcingID'
}, {
    name: 'alreadyAllocated',
    type: 'int',
    mapping: 'AlreadyAllocated'
}, {
    name: 'wantAllocated',
    type: 'int',
    mapping: 'WantAllocated'
}, {
    name: 'remainAllocated',
    type: 'int',
    mapping: 'RemainAllocated'
}]);

    Srims.data.Entity.apply(Srims.fund.ProjectOut);



if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.ProjectOutStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(allocationId) {
    Srims.fund.ProjectOutStore.superclass.constructor.call(this, new Srims.fund.ProjectOutXmlReader(), Srims.service.fund.VoucherOutService + '/GetOutInfo', {
            FundAllocationID: allocationId
        });
    }
});

if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.ProjectOutXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.fund.ProjectOutXmlReader.superclass.constructor.call(this, Srims.fund.ProjectOut);
    }
});
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditWindow = function(id, fundAllocation, voucher, project, isCorrect, allocatinName) {

    this._fundAllocation = fundAllocation;
    this._project = project;
    this._voucher = voucher;
    voucherEditWindow = this.window;

    if (allocatinName == "校内") {
        var fundAllocationAmount = fundAllocation.get('allocationTotal') - fundAllocation.get('allocationIn') - fundAllocation.get('allocationWantOut') - fundAllocation.get('allocationHardware') - fundAllocation.get('overheadExpensesMiddle') - fundAllocation.get('overheadExpensesExpert') - fundAllocation.get('overheadExpensesIn') - fundAllocation.get('overheadExpensesOut');
        this._canAllocationAmount = voucher.isNew() ? fundAllocationAmount : fundAllocationAmount + voucher.get('allocationIn') + voucher.get('allocationOut');
    } else {
        //绩效分配
        var fundAllocationAmount = fundAllocation.get('arrivedPerformance') - fundAllocation.get('allocatedPerformance');
        this._canAllocationAmount = voucher.isNew() ? fundAllocationAmount : fundAllocationAmount + voucher.get('overheadPerformancePay');
    }

    if (isCorrect) {
        //当为数据纠错功能时，经费一经分配便计入项目已分配经费
        this._projectCanAllocationInAmount = voucher.isNew() ? project.get('fundPlanIn') - project.get('fundAlreadyIn') : project.get('fundPlanIn')
         - project.get('fundAlreadyIn') + voucher.get('allocationIn');
        //this._projectCanAllocationOutAmount = voucher.isNew() ? project.get('fundPlanOut') - project.get('fundAlreadyOut') : project.get('fundPlanOut') - project.get('fundAlreadyOut') + voucher.get('allocationOut');
        this._projectCanAllocationOutAmount = fundAllocation.get('allocationWantOut');
    } else {
        this._projectCanAllocationInAmount = voucher.isNew() ? project.get('fundPlanIn') - project.get('fundAlreadyIn') - fundAllocation.get('allocationIn') : project.get('fundPlanIn') - project.get('fundAlreadyIn') - fundAllocation.get('allocationIn') + voucher.get('allocationIn');
        //this._projectCanAllocationOutAmount = voucher.isNew() ? project.get('fundPlanOut') - project.get('fundAlreadyOut') - fundAllocation.get('allocationWantOut') : project.get('fundPlanOut') - project.get('fundAlreadyOut') - fundAllocation.get('allocationWantOut') + voucher.get('allocationOut');
        this._projectCanAllocationOutAmount = fundAllocation.get('allocationWantOut');
    }
    this._inForm = new Srims.fund.VoucherEditWindow_InForm(fundAllocation, voucher, project, this._canAllocationAmount, this._projectCanAllocationInAmount, isCorrect, allocatinName);
    this._voucherOutStore = new Srims.fund.VoucherOutStore(voucher.get('id'));
    this._projectOutStore = new Srims.fund.ProjectOutStore(fundAllocation.get('id'));

    if (fundAllocation.get('allocationOut') > 0)
        this._projectCanAllocationOutAmount = 0;

    this._editGridPanel = new Srims.fund.VoucherEditWindow_Out_EditGridPanel(fundAllocation, project, this._projectOutStore, this._canAllocationAmount, this._projectCanAllocationOutAmount);

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });

    Srims.fund.VoucherEditWindow.superclass.constructor.call(this, {
        id: id,
        title: '编辑凭单',
        width: 750,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._inForm, this._editGridPanel],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._inForm.focus();
    this._voucherOutStore.on('load', function() {
        var voucherOuts = this.getRange();
        for (var i = 0; i < voucherOuts.length; i++) {
            voucherOuts[i].set('amount', Money.render(voucherOuts[i].get('amount'), false));
        }
    })
    this._voucherOutStore.load();

    this.validateAllocationOut = function() {
        //carlsircfe2012.2.28 去掉验证，外协单位为系统加载
        //        var voucherOuts = this._voucherOutStore.getRange();

        //        for (var i = 0; i < voucherOuts.length; i++) {
        //            var corporation = voucherOuts[i].get('corporation');
        //            if (String.isEmpty(corporation)) {

        //                Ext.Msg.show({
        //                    title: '外协分配错误',
        //                    msg: '外协分配中有外协公司为空的分配，请修改或删除此外协分配',
        //                    buttons: Ext.Msg.OK,
        //                    icon: Ext.MessageBox.INFO
        //                });

        //                return false;
        //            }
        //            var allocationAmount = voucherOuts[i].get('amount');
        //            if (allocationAmount == null || allocationAmount == undefined || allocationAmount == 0) {
        //                Ext.Msg.show({
        //                    title: '外协分配错误',
        //                    msg: '外协分配中有分配金额等于0或为空的分配，请修改或删除此外协分配',
        //                    buttons: Ext.Msg.OK,
        //                    icon: Ext.MessageBox.INFO
        //                });
        //                return false;
        //            }
        //        }
        return true;
    }
    this.validateExpert = function() {

        var expertID = this._inForm._comboBoxFundMember.getEntity().get('expertID');
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/GetByExpertId',
            params: {
                expertID: expertID
            },
            scope: this,
            success: function(response) {
                if (!Boolean.toBoolean(responseText))
                    Ext.MessageBox.show({
                        title: '确认经费成员',
                        msg: '注意：您添加的经费成员不在项目成员中！',
                        buttons: Ext.MessageBox.YESNO,
                        scope: this,
                        fn: function(button) {
                            if (button == 'yes')
                                return true;
                        },
                        icon: Ext.MessageBox.QUESTION
                    });
            }
        });

    }
    this.validateAllocationTotal = function() {
        //var voucherOuts = this._voucherOutStore.getRange();
        var projectOuts = this._projectOutStore.getRange();
        var fundAllocationOutTotal = 0;
        for (var i = 0; i < projectOuts.length; i++) {
            //var allocationAmount = voucherOuts[i].get('amount');
            var allocationAmount = projectOuts[i].get('wantAllocated');
            if (allocationAmount != null && allocationAmount != undefined && allocationAmount != 0)
                fundAllocationOutTotal += Money.toMoney(projectOuts[i].get('wantAllocated'));
        }
        if (fundAllocationOutTotal > this._projectCanAllocationOutAmount) {
            Ext.Msg.show({
                title: '外协分配错误',
                msg: '外协分配总额不能大于经费分配的最高外协分配金额：' + Money.render(this._projectCanAllocationOutAmount),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        if (fundAllocationOutTotal + this._inForm._numberFieldFundAmount.getMoney() == 0) {
            Ext.Msg.show({
                title: '经费分配错误',
                msg: '凭单总额必须大于零',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });

            return false;
        }
        if (this._inForm._numberFieldFundAmount.getMoney() > this._canAllocationAmount) {
            Ext.Msg.show({
                title: '经费分配错误',
                msg: '分配总额不能大于经费未分配总额：' + Money.render(this._canAllocationAmount),
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }

        return true;
    }
    this.validate = function(preventMark) {
        var result = true;

        result = this._inForm.validate(preventMark) && result;
        result = this.validateAllocationOut() && result;
        result = this.validateAllocationTotal() && result;
        //result = this.validateExpert() && result;

        return result;
    }
    this.save = function() {
        var voucher = this._voucher;
        //var voucherOuts = this._voucherOutStore.getRange();
        var projectOuts = this._projectOutStore.getRange();
        var voucherOutString = '';
        for (var i = 0; i < projectOuts.length; i++) {
            if (projectOuts[i].get('wantAllocated') > 0) {
                voucherOutString += Money.toMoney(projectOuts[i].get('wantAllocated'));
                voucherOutString += '###';
                voucherOutString += projectOuts[i].get('outsourcingName');
                voucherOutString += '|||';
            }

        }

        voucher.beginEdit();
        this._inForm.assginValues();
        voucher.commit();

        var params = voucher.data;
        params.voucherOutString = voucherOutString;
        params.isCorrect = isCorrect;
        //判断是否已经给这个专家分配过经费了

        if (allocatinName == "校内" && fundAllocation.get('overheadExpensesIn') == 0 && fundAllocation.get('allocationWantOut') != 0 && voucherOutString == "") {

            // Ext.MessageBox.confirm("提示", "您确定不用分配外协了吗？", function(button, text) {
            //  if (button == 'yes') {
            Ext.Ajax.request({
                url: Srims.service.fund.VoucherService + '/Save',
                params: params,
                scope: this,
                async: false,
                success: function() {
                    var panel = fundAllocation.panel;
                    if (panel == undefined) {
                        voucherEditWindow.close();
                        return;
                    }

                    panel.fundAllocation = fundAllocation;
                    panel.refresh();


                    //以下仅用于数据纠错
                    if (isCorrect) {
                        if (fundAllocation.store) {
                            fundAllocation.store.load();
                        }

                        Ext.Ajax.request({
                            url: Srims.service.fund.FundAllocationService + '/GetById',
                            params: {
                                fundAllocationId: fundAllocation.get('id')
                            },
                            scope: this,
                            success: function(response) {
                                var store = new Ext.data.Store({
                                    data: response.responseXML,
                                    reader: new Srims.fund.FundAllocationXmlReader()
                                });
                                var currentFundAllocation = store.getAt(0);
                                currentFundAllocation.panel = panel;
                                currentFundAllocation.panel = fundAllocation.panel;
                                currentFundAllocation.store = fundAllocation.store;
                                currentFundAllocation.toobBar = fundAllocation.toobBar;
                                currentFundAllocation.toobBar.resetComponentFundAllocation(currentFundAllocation);
                            }
                        });
                    }

                    voucherEditWindow.close();
                }
            });
            //        }
            // });
            this.close();
        } else {
            Ext.Ajax.request({
                url: Srims.service.fund.VoucherService + '/CheckIsPrinciple',
                params: params,
                scope: this,
                async: false,
                success: function(response) {
                    if (Boolean.toBoolean(response.responseText)) {
                        //var voucherOuts = this._voucherOutStore.getRange();
                        var projectOuts = this._projectOutStore.getRange();
                        var fundAllocationOutTotal = 0;
                        for (var i = 0; i < projectOuts.length; i++) {
                            var allocationAmount = projectOuts[i].get('wantAllocated');
                            if (allocationAmount != null && allocationAmount != undefined && allocationAmount != 0)
                                fundAllocationOutTotal += Money.toMoney(projectOuts[i].get('wantAllocated'));
                        }
                        if (projectOuts.length != 0 && fundAllocationOutTotal < this._projectCanAllocationOutAmount) {
                            Ext.Msg.show({
                                title: '经费分配错误',
                                msg: '当前已分配外协总额小于应分配额：' + Money.render(this._projectCanAllocationOutAmount),
                                buttons: Ext.Msg.OK,
                                icon: Ext.MessageBox.INFO
                            });
                            this._buttonSave.enable();
                            return;
                        }
                        Ext.Ajax.request({
                            url: Srims.service.fund.VoucherService + '/Save',
                            params: params,
                            scope: this,
                            success: function() {
                                var panel = this._fundAllocation.panel;
                                if (panel == undefined) {
                                    this.close();
                                    return;
                                }

                                panel.fundAllocation = this._fundAllocation;
                                panel.refresh();


                                //以下仅用于数据纠错
                                if (isCorrect) {
                                    if (this._fundAllocation.store) {
                                        this._fundAllocation.store.load();
                                    }

                                    Ext.Ajax.request({
                                        url: Srims.service.fund.FundAllocationService + '/GetById',
                                        params: {
                                            fundAllocationId: fundAllocation.get('id')
                                        },
                                        scope: this,
                                        success: function(response) {
                                            var store = new Ext.data.Store({
                                                data: response.responseXML,
                                                reader: new Srims.fund.FundAllocationXmlReader()
                                            });
                                            var currentFundAllocation = store.getAt(0);
                                            currentFundAllocation.panel = panel;
                                            currentFundAllocation.panel = this._fundAllocation.panel;
                                            currentFundAllocation.store = this._fundAllocation.store;
                                            currentFundAllocation.toobBar = this._fundAllocation.toobBar;
                                            currentFundAllocation.toobBar.resetComponentFundAllocation(currentFundAllocation);
                                        }
                                    });
                                }
                                this.close();
                            }
                        });
                    }
                    else {
                        Ext.MessageBox.show({
                            title: '所选专家不是项目负责人！',
                            msg: '注意：您添加外协经费的成员不是项目负责人！请选择项目负责人重新填写。',
                            buttons: Ext.MessageBox.OK,
                            scope: this,
                            fn: function(button) {
                                if (button == 'yes')
                                    return true;
                            },
                            icon: Ext.MessageBox.QUESTION
                        });
                        this._buttonSave.enable();
                    }
                }
            });
        }
    }
    this.buttonSave_click = function(button, e) {
        var window = this.window;
        if (!window.validate(false))
            return;

        button.setText('保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.VoucherEditWindow, Ext.Window);if (!Srims.fund)
    Ext.namespace("Srims.fund");

Srims.fund.VoucherEditWindow_InForm = function(fundAllocation, voucher, project, canAllocationAmount, projectCanAllocationInAmount, isCorrect, allocatinName) {

    this._fundAllocation = fundAllocation;
    this._voucher = voucher;
    this._project = project;
    this._allocatinName = allocatinName;

    this._comboBoxFundMember = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '经费成员',
        value: this._voucher.get('expertName'),
        selectEntityId: this._voucher.get('expertID'),
        allowBlank: false,
        panel: this,
        width: 160
    });
    this._checkboxIsSecondCollege = new Ext.form.Checkbox({
        fieldLabel: '双聘单位',
        checked: this._voucher.get('isExpertSecondCollege'),
        disabled: true
    });
    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: this._allocatinName + '分配(万元)',
        value: this._allocatinName == "校内" ? this._voucher.get('allocationIn') : this._voucher.get('performancePay'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });

    this._fieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        allowBlank: false,
        value: this._voucher.get('accountBookNumber'),
        width: 160
    });
    this._fieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        allowBlank: false,
        value: this._voucher.get('voucherNumber'),
        width: 160
    });
    this._PTextLabel = new Ext.form.Label({
        style: "color:#FF0000",
        text: '本次最高分配：' + Money.render(canAllocationAmount)
    });
    var items;
    if (!isCorrect)
        items = [this._comboBoxFundMember, this._checkboxIsSecondCollege, this._numberFieldFundAmount];
    else
        items = [this._comboBoxFundMember, this._checkboxIsSecondCollege, this._numberFieldFundAmount, this._fieldAccountBookNumber, this._fieldVoucherNumber];
    var totle = fundAllocation.get('allocationTotal') - fundAllocation.get('overheadExpenses') - fundAllocation.get('allocationWantOut');
    var direct = fundAllocation.get('allocationTotal') - fundAllocation.get('allocationWantOut') - fundAllocation.get('allocationHardware') - fundAllocation.get('overheadExpensesExpert') - fundAllocation.get('overheadExpensesMiddle') - fundAllocation.get('overheadExpensesIn') - fundAllocation.get('overheadExpensesOut');
    var indirect = fundAllocation.get('overheadExpensesExpert') + fundAllocation.get('overheadExpensesMiddle') + fundAllocation.get('overheadExpensesIn');
    var outmanagefee = fundAllocation.get('overheadExpensesOut');
    if (project.get('isHorizontal'))
        var h_title = '注意：本次到款' + Money.render(fundAllocation.get('allocationTotal')) + '，其中外协' + Money.render(fundAllocation.get('allocationWantOut')) + '。直接费用' + Money.render(direct) + '，间接费用' + Money.render(indirect) + '，外协管理费' + Money.render(outmanagefee) + '万元，<br />间接费用将自动分配到项目负责人名下。本次分配还可分直接费用为：' + '<font color="red">' + Money.render(canAllocationAmount) + '</font>。<br />如果本次有外协分配，请首先分配项目负责人。';

    else
        var h_title = '注意：本次到款' + Money.render(fundAllocation.get('allocationTotal')) + '，其中外协' + Money.render(fundAllocation.get('allocationWantOut')) + '。直接费用' + Money.render(direct) + '，间接费用' + Money.render(indirect) + '，<br />间接费用将自动分配到项目负责人名下。本次分配还可分直接费用为：' + '<font color="red">' + Money.render(canAllocationAmount) + '</font>。<br />如果本次有外协分配，请首先分配项目负责人。';

    Srims.fund.VoucherEditWindow_InForm.superclass.constructor.call(this, {
        //title: this._allocatinName + '分配',//：即扣除间接费和外协分配之后可分配：'+Money.render(totle)+'，已分配：'+Money.render(fundAllocation.get('allocationIn'))+'，未分配：' + Money.render(canAllocationAmount),
        //本次到款？万元，其中外协？万元。直接费用？万元，间接费用？万元，间接费用将自动分配到负责人名下，本次分配还可分直接费用为？万
        title: h_title,
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 100,
        items: items
    });
    this._comboBoxFundMember.checkboxIsSecondCollege = this._checkboxIsSecondCollege;
    this.comboBoxFundMember_Change = function(comboBox) {
        //若此人已分配过经费，如需继续为其分配经费，请删除原分配纪录后重新分配
        var expertID = comboBox.getEntity().get('id');
        Ext.Ajax.request({
            url: Srims.service.fund.VoucherService + '/CheckExpertIsAllocated',
            params: {
                ExpertId: expertID,
                FundAllocationId: fundAllocation.get('id')
            },
            scope: this,
            success: function(response) {
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.MessageBox.show({
                        title: '用户已有分配',
                        msg: '此人已分配过经费，如需继续为其分配经费，请删除原分配纪录后重新分配。',
                        buttons: Ext.MessageBox.OK,
                        scope: this,
                        fn: function(button) {
                            if (button == 'yes')
                                return true;

                        },
                        icon: Ext.MessageBox.QUESTION
                    });
                    comboBox.setValue('');
                }
                else {
                    //检查经费成员是否是项目成员

                    Ext.Ajax.request({
                        url: Srims.service.fund.FundAllocationService + '/CheckExpertByID',
                        params: {
                            ExpertId: expertID,
                            FundAllocationId: fundAllocation.get('id')
                        },
                        scope: this,
                        success: function(response) {
                            if (!Boolean.toBoolean(response.responseText))
                                Ext.MessageBox.show({
                                    title: '确认经费成员',
                                    msg: '注意：您添加的经费成员不在项目成员中！<br />保存后该专家将自动添加至项目成员中,位次将从999起始逆序排列。',
                                    buttons: Ext.MessageBox.OK,
                                    scope: this,
                                    fn: function(button) {
                                        if (button == 'yes')
                                            return true;

                                    },
                                    icon: Ext.MessageBox.QUESTION
                                });
                        }
                    });
                }

            }
        });
        //        Ext.Ajax.request({
        //            url: Srims.service.fund.VoucherService + '/CheckExpertIsAllocated',
        //            params: {
        //                ExpertId: expertID,
        //                FundAllocationId: fundAllocation.get('id')
        //            },
        //            scope: this,
        //            success: function() {
        //                if (Boolean.toBoolean(response.responseText)) {
        //                    Ext.Msg.show({
        //                        title: '用户已有分配',
        //                        msg: '此人已分配过经费，如需继续为其分配经费，请删除原分配纪录后重新分配：',
        //                        buttons: Ext.Msg.OK,
        //                        icon: Ext.MessageBox.INFO
        //                    });
        //                    comboBox.setValue('');
        //                }
        //            }
        //        });

        //检查专家是否是项目负责人，将外协框置灰
        Ext.Ajax.request({
            url: Srims.service.fund.VoucherService + '/DecideOutsourcingGrid',
            params: {
                ExpertId: expertID,
                FundAllocationId: fundAllocation.get('id')
            },
            scope: this,
            async: false,
            success: function(response) {
                if (Boolean.toBoolean(response.responseText) && fundAllocation.get('allocationWantOut') != 0) {
                    comboBox.ownerCt.ownerCt._editGridPanel.enable();
                }
                else {
                    comboBox.ownerCt.ownerCt._editGridPanel.disable();
                }
            }
        });
        //处理专家变化
        var expertSecondCollege = comboBox.getEntity().get('college2');
        if (expertSecondCollege != '') {
            comboBox.checkboxIsSecondCollege.setDisabled(false);
        };
    }
    this._comboBoxFundMember.on('change', this.comboBoxFundMember_Change);

    this.validateFundAmount = function() {
        var panel = this.panel;

        var fundAmount = this.getMoney();

        if (fundAmount > canAllocationAmount) {
            this.invalidText = '分配金额不能大于经费未分配总额：' + Money.render(canAllocationAmount);
            return false;
        }
        if (this._allocatinName == "校内" && fundAmount > projectCanAllocationInAmount) {
            this.invalidText = '分配金额不能大于经费分配的最高校内分配金额：' + Money.render(projectCanAllocationInAmount);
            return false;
        }

        return true;
    }
    this._numberFieldFundAmount.panel = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;

    //this._numberFieldFundContract.on('change',this._onNumberFieldFundContract_Change);
    //    this._comboBoxFundMember.on('change', this._oncomboBoxFundMember_Change);
    //    var memberId = this._comboBoxFundMember.getEntity().get('expertID');
    //    this._oncomboBoxFundMember_Change = function() {

    //    }

    this.validate = function(preventMark) {
        var result = true;

        result = this._comboBoxFundMember.isValid(preventMark) && result;
        result = this._numberFieldFundAmount.isValid(preventMark) && result;

        if (isCorrect) {
            result = this._numberFieldFundAmount.isValid(preventMark) && result;
            result = this._numberFieldFundAmount.isValid(preventMark) && result;
        }

        return result;
    }
    this.assginValues = function() {
        if (this._allocatinName == '校内') {
            this._voucher.set('allocationIn', this._numberFieldFundAmount.getMoney());
            this._voucher.set('performancePay', "");
        } else {
            this._voucher.set('allocationIn', "");
            this._voucher.set('performancePay', this._numberFieldFundAmount.getMoney());
            this._voucher.set('projectID', this._fundAllocation.get('projectID'));
        }
        this._voucher.set('expertID', this._comboBoxFundMember.getValue());
        this._voucher.set('expertName', this._comboBoxFundMember.getText());
        this._voucher.set('isExpertSecondCollege', this._checkboxIsSecondCollege.getValue());
        this._voucher.set('fundAllocationID', this._fundAllocation.get('id'));

        if (isCorrect) {
            this._voucher.set('accountBookNumber', this._fieldAccountBookNumber.getValue());
            this._voucher.set('voucherNumber', this._fieldVoucherNumber.getValue());
        }

    }
    this.focus = function() {
        this._comboBoxFundMember.focus(false, true);
    }
}
Ext.extend(Srims.fund.VoucherEditWindow_InForm, Ext.form.FormPanel, {})
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditWindow_Out_EditGridPanel = function(fundAllocation, project, store, canAllocationAmount, projectCanAllocationOutAmount) {

    this._fundAllocation = fundAllocation;
    this._project = project;
    this._store = store;
    

    this._selections = new Ext.grid.RowSelectionModel();
    /** 复选框
    this._selections = new Ext.grid.CheckboxSelectionModel({ handleMouseDown: Ext.emptyFn });
    this._selections.grid = this;
    */
    this._columnModel = new Srims.fund.VoucherEditWindow_Out_EditGridPanel_ColumnModel(this._fundAllocation);
    this._tbar = new Srims.fund.VoucherEditWindow_Out_EditGridPanel_ToolBar(this, this._store, this._selections);
    Srims.fund.VoucherEditWindow_Out_EditGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        tbar: this._tbar,
        height: 170,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        loadMask: true,
        disabled: projectCanAllocationOutAmount == 0,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });
    this.validateedit = function(obj) {
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;

        if (column == 4) {
            var allocationAmount = Money.toMoney(editor.getValue());
            var maxAmount = record.get('amount');
            var alreadyAllocated = record.get('alreadyAllocated');
            var remainAmount = maxAmount - alreadyAllocated;


            if (allocationAmount > remainAmount) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配金额不能大于经费未分配总额：' + Money.render(remainAmount),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }
            if (allocationAmount > projectCanAllocationOutAmount) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配金额不能大于经费分配的最高外协分配金额：' + Money.render(projectCanAllocationOutAmount),
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }

            record.set('remainAllocated', remainAmount - allocationAmount);
        }
        return true;
    }
    /** 只有复选框选中，才能够被编辑
    this.beforeedit = function(e) {
    switch (e.column) {   // e.column可以判定激活了那一列的编辑器
    case 5:
    {
    if (!this.getSelectionModel().isIdSelected(e.row + 1)) {
    e.cancel = true; // 取消用户编辑操作 
    }

                    break;
    }
    default:
    break;
    }
    }*/

    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.fund.VoucherEditWindow_Out_EditGridPanel, Ext.grid.EditorGridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditWindow_Out_EditGridPanel_ToolBar = function(grid, store, selection){

    this._selection = selection;
    
    this._buttonHeader = new Ext.Toolbar.Button({
    text: '<b style="color:#15428B">外协分配，</b>' + '<b style="color:#FF0000">注意：请在“本次分配”列中添加本次需分配的外协单位额度！</b>',
        minWidth: 60
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        grid: grid,
        store: store,
        handler: function(){
        
            if (this.store.getCount() >= 10) {
                Ext.Msg.show({
                    title: '添加外协错误',
                    msg: '一张凭单最多添加5个外协公司',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            
            var voucherOut = new Srims.fund.VoucherOut({
                corporation: '',
                amount: ''
            });
            
            this.grid.stopEditing();
            this.store.insert(0, voucherOut);
            this.grid.startEditing(0, 0);
            
        },
        tooltip: '<b>添加外拨公司</b><br/>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        selection: selection,
        store: store,
        minWidth: 60,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除外协分配', '你确定要删除这个外协分配吗？', function(buttonId){
                if (buttonId == 'yes') 
                    this.store.remove(this.selection.getSelected());
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除外拨公司</b><br/>删除选中的外拨公司'
    });
    
    var items = [this._buttonHeader];
    Srims.fund.VoucherEditWindow_Out_EditGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items,
        height: 25
    });
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = this.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }
        
        buttonDelete.setVisible(true);
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.VoucherEditWindow_Out_EditGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditWindow_Out_EditGridPanel_ColumnModel = function(fundAllocation) {
Srims.fund.VoucherEditWindow_Out_EditGridPanel_ColumnModel.superclass.constructor.call(this, [{
    header: "id",
    dataIndex: 'ID',
    hidden: true
}, {
        header: "外协公司",
        dataIndex: 'outsourcingName',
        sortable: false,
        hidden: false,
        width: 160
    }, {
        header: "分配定额(万元)",
        dataIndex: 'amount',
        sortable: false,
        hidden: false,
        renderer: Money.render,
        width: 160
    }, {
        header: "已分配(万元)",
        dataIndex: 'alreadyAllocated',
        sortable: false,
        hidden: false,
        renderer: Money.render,
        width: 160
    }, {
    header: '<span style="color:#FF0000">本次分配(万元)</span>',
        dataIndex: 'wantAllocated',
        sortable: false,
        isCellEditable: false,
        editor: new Srims.component.MoneyField({
            allowNegative: false
            
        })
    }, {
        header: "剩余配额(万元)",
        dataIndex: 'remainAllocated',
        sortable: false,
        hidden: false,
        renderer: Money.render,
        width: 160
}])
    }
    Ext.extend(Srims.fund.VoucherEditWindow_Out_EditGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditAccountBookNumberWindow = function(id, voucher, fundAllocation){

    this._voucher = voucher;
    this._fundAllocation = fundAllocation;
    
    this._InforPanel = new Srims.fund.VoucherEditAccountBookNumberWindow_InforPanel();
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '修 改',
        window: this
    });
    
    this._fieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        allowBlank: false,
        value: this._voucher.get('accountBookNumber'),
        width: 160
    });
    
    Srims.fund.VoucherEditAccountBookNumberWindow.superclass.constructor.call(this, {
        id: id,
        title: '编辑账本号',
        width: 400,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._InforPanel, new Ext.Panel({
            layout: 'form',
            bodyStyle: 'padding:5px 10px 0 10px',
            height: 70,
            frame: true,
            labelWidth: 50,
            items: [this._fieldAccountBookNumber]
        })],
        
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.validateAccountBookNumber = function(){
        var accountBookNumber = this.getValue();
        var fundMemberCollegeCode = String.isEmpty(this.window._voucher.get('expertCollegeCode')) ? '' : this.window._voucher.get('expertCollegeCode').substr(0, 1);
        var projectTypePreCode = this.window._voucher.get('projectTypePreCode');
        
        //账本号只能是数字和字母
        var accountBookNumberpattern = /^[A-Z|a-z|0-9]{10}$/;
        var accountBookNumberWithDivisionpattern = /^[A-Z|a-z|0-9]{4}-[A-Z|a-z|0-9]{6}$/;
        
        var fundMemberStore = this.window._fundAllocation.panel._formPanelFundMember._store;
        var fundMembers = fundMemberStore.getRange();
        
        for (var i = 0; i < fundMembers.length; i++) {
            if (this.window._voucher.get('expertID') == fundMembers[i].get('expertId')) 
                continue;
            
            if (accountBookNumber == fundMembers[i].get('accountBookNumber')) {
                this.invalidText = '账本号不能重复';
                return false;
            }
        }
        //设定特殊用户
        var user = Srims.currentLoginLog.user;
        if (user.loginId == 'yuandong' || user.loginId == 'admin') 
            return true;
        
        var DivisionPosition = accountBookNumber.indexOf('-');
        var hasDivision = DivisionPosition >= 0;
        
        if (!hasDivision && !accountBookNumberpattern.test(accountBookNumber) || hasDivision && !accountBookNumberWithDivisionpattern.test(accountBookNumber)) {
            this.invalidText = '账本号格式不对：账本号长度必须为10位；除第五位可以为为"-"外，账本号只能是数字或字母';
            return false;
        }
        if (fundMemberCollegeCode != '' && accountBookNumber.substr(0, 1) != fundMemberCollegeCode) {
            this.invalidText = '账本号的前四位必须是专家的院系代码';
            return false;
        }
        
        var accountBookNumberProjectTypeCode = hasDivision ? accountBookNumber.substr(5, 2) : accountBookNumber.substr(4, 2);
        if (!String.isEmpty(projectTypePreCode) && accountBookNumberProjectTypeCode != projectTypePreCode) {
            this.invalidText = '第五位和第六位必须是项目类型代码：' + projectTypePreCode;
            return false;
        }
        
        return true;
    }
    
    this._fieldAccountBookNumber.window = this;
    this._fieldAccountBookNumber.validator = this.validateAccountBookNumber;
    
    this.validate = function(preventMark){
        var result = true;
        result = this._fieldAccountBookNumber.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.fund.VoucherService + '/SaveForSetAccountBookNumber',
            params: {
                voucherId: this._voucher.get('id'),
                accountBookNumber: this._fieldAccountBookNumber.getValue()
            },
            scope: this,
            success: function(){
                this._fundAllocation.panel.refresh();
                this.close();
            }
        });
    }
    this.buttonSave_click = function(button, e){
        var window = button.window;
        
        if (!window.validate(false)) 
            return;
        
        Ext.MessageBox.confirm('编辑账本号', '你确定输入的账本号正确吗？此操作不可撤销，不可修改。', function(buttonId){
            if (buttonId == 'yes') {
                button.setText('正在修改');
                button.disable();
                
                window.save();
            }
        }, this);
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.VoucherEditAccountBookNumberWindow, Ext.Window);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditAccountBookNumberWindow_InforPanel = function(){
    Srims.fund.VoucherEditAccountBookNumberWindow_InforPanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">警告：账本号编辑操作不可撤销，编辑后不可修改，请仔细填写！</span>'
    });
}
Ext.extend(Srims.fund.VoucherEditAccountBookNumberWindow_InforPanel, Ext.Panel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.MyWaitingAllocationFundDescendGridPanel = function(){

    this._selection = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });
    this._columnModel = new Srims.fund.MyWaitingAllocationFundDescendGridPanel_ColumnModel(this._selection);
    this._store = new Srims.fund.FundDescendStore(Srims.service.fund.FundDescendService + '/GetMyWaitingAllocationFundDescend', undefined);
    
    var params = {};
    params.sm = this._selection;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.defaultBBar = false;
    params.autoHeight = true;
    params.stateful = false;
    
    Srims.fund.MyWaitingAllocationFundDescendGridPanel.superclass.constructor.call(this, params);
    
    this._store.load();
    this.next = function(){
        var records = this._selection.getSelections();
        if (records.length == 0) {
            Ext.Msg.show({
                title: '请选择经费下拨',
                msg: '请选择要分配的经费下拨',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            return;
        }
        this.button.setText('正在执行下一步...');
        this.button.disable();
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/GetByFundDescend',
            scope: this,
            params: {
                fundDescendId: records[0].get('id')
            },
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.fund.FundAllocationXmlReader()
                });
                
                var fundAllocation = store.getAt(0);
                var vocherPanel = new Srims.fund.FundAllocationShowPanel_VoucherForm(fundAllocation, true)._gridPanelVoucher;
                Ext.getDom('divExpertGuidAllocationPanel').innerHTML = ' ';
                vocherPanel.render(Ext.get('divExpertGuidAllocationPanel'));
                //下一步操作给fundAllocation 赋值
                this.panel.fundAllocation = fundAllocation;
                this.panel.fundAllocation.panel = vocherPanel;
                this.panel.fundAllocation.panel.button = this.button;
                this.panel.fundAllocation.panel.button.panel = this.panel.panel._allocationPanel;
                
                Srims.expertGuide.next(this);
                if (fundAllocation.get('canSubmit')) 
                    this.button.setText('提交');
                
                if (fundAllocation.get('canUndoSubmit')) 
                    this.button.setText('撤销提交');
            }
        })
    }
}
Ext.extend(Srims.fund.MyWaitingAllocationFundDescendGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.MyWaitingAllocationFundDescendGridPanel_ColumnModel = function(sm){
    Srims.fund.MyWaitingAllocationFundDescendGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '下拨项目',
        dataIndex: 'projectName',
        sortable: false,
        width: 300
    }, {
        header: '下拨金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        renderer: Money.render
    }, {
        header: '经费凭单号',
        dataIndex: 'financeVoucherNumber',
        sortable: false
    }, {
        header: '经费说明',
        dataIndex: 'financeAbstract',
        sortable: false,
        width: 200
    }, {
        header: '下拨时间',
        dataIndex: 'descendDateTime',
        sortable: true,
        renderer: Date.render
    }])
}
Ext.extend(Srims.fund.MyWaitingAllocationFundDescendGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceSelectPanel = function(){

    this._store = new Srims.fund.FinanceSimpleStore(Srims.service.fund.FinanceService + '/Query', undefined);
    this._queryPanel = new Srims.fund.FinanceSelectPanel_QueryPanel(this._store);
    this._financeGridPanel = new Srims.fund.FinanceSelectGridPanel(this._store);
    
    Srims.fund.FinanceSelectPanel.superclass.constructor.call(this, {
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        layout: 'form',
        style: 'padding:10px;',
        items: [this._queryPanel, this._financeGridPanel]
    });
    this.next = function(){
        var records = this._financeGridPanel._selection.getSelections();
        if (records.length == 0) {
            Ext.Msg.show({
                title: '请选择经费到帐信息',
                msg: '请选择要下拨的经费到帐信息',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        this.panel._params.finance = records[0];
        
        Srims.expertGuide.next(this);
    };
    this.focus = function(){
        this._queryPanel.focus();
    }
}
Ext.extend(Srims.fund.FinanceSelectPanel, Ext.Panel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceSelectPanel_QueryPanel = function(store){

    this._store = store;
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            window.query()
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.reset();
        }
    });
    this._numberFieldAmountBegin = new Srims.component.MoneyField({
        fieldLabel: '经费额(万元)',
        allowNegative: false,
        width: 100
    });
    this._numberFieldAmountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        allowNegative: false,
        width: 100
    });
    
    this._textFieldAbstract = new Ext.form.TextField({
        fieldLabel: '摘要',
        width: 180
    });
    
    Srims.fund.FinanceSelectPanel_QueryPanel.superclass.constructor.call(this, {
        layout: 'form',
        labelWidth: 80,
        items: [new Ext.Panel({
            layout: 'column',
            labelWidth: 80,
            items: [new Ext.Panel({
                labelWidth: 80,
                layout: 'form',
                items: [this._numberFieldAmountBegin]
            }), new Ext.Panel({
                labelWidth: 20,
                style: 'padding-left: 20px',
                layout: 'form',
                items: [this._numberFieldAmountEnd]
            }), new Ext.Panel({
                labelWidth: 40,
                layout: 'form',
                style: 'padding-left: 10px',
                items: [this._textFieldAbstract]
            }), new Ext.Panel({
                layout: 'form',
                style: 'padding-left: 10px',
                items: [this._buttonQuery]
            }), new Ext.Panel({
                layout: 'form',
                style: 'padding-left: 10px',
                items: [this._buttonReset]
            })]
        })]
    });
    this.reset = function(){
        this._numberFieldAmountBegin.reset();
        this._numberFieldAmountEnd.reset();
        this._textFieldAbstract.reset();
    }
    this.query = function(){
        if (this._numberFieldAmountBegin.getMoney() == '' && this._numberFieldAmountEnd.getMoney() == '' && this._textFieldAbstract.getValue() == '') {
            Ext.Msg.show({
                title: '请输入查询条件',
                msg: '至少需要输入一个查询条件',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        this._store.load({
            params: {
                amountStart: this._numberFieldAmountBegin.getMoney(),
                amountEnd: this._numberFieldAmountEnd.getMoney(),
                financeAbstract: this._textFieldAbstract.getValue(),
                IsDescendAll: false
            }
        })
    }
    this.focus = function(){
        this._numberFieldAmountBegin.focus(false, true);
    }
}
Ext.extend(Srims.fund.FinanceSelectPanel_QueryPanel, Ext.Panel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceSelectGridPanel = function(store){

    this._selection = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });
    this._columnModel = new Srims.fund.FinanceSelectGridPanel_ColumnModel(this._selection);
    this._store = store;
    
    var params = {};
    params.sm = this._selection;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.height = 300;
    params.defaultBBar = true;
    params.autoExpand = true;
    params.deferredRender = true;
    params.stateful = false;
    params.autoScroll = true;
    params.autoExpandColumn = 'abstract';
    
    Srims.fund.FinanceSelectGridPanel.superclass.constructor.call(this, params);
    this._store.load({
        params: {
            amountEnd: -1
        }
    });
}
Ext.extend(Srims.fund.FinanceSelectGridPanel, Srims.component.GridPanel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceSelectGridPanel_ColumnModel = function(sm){
    Srims.fund.FinanceSelectGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: 'id',
        dataIndex: 'ID',
        sortable: false,
        hidden: true
    }, {
        header: '到账凭单号',
        dataIndex: 'voucherNumber',
        sortable: true
    }, {
        header: '到款时间',
        dataIndex: 'receivedDate',
        sortable: true,
        renderer: Date.render
    }, {
        header: '金额(万元)',
        dataIndex: 'amount',
        sortable: true,
        renderer: Money.render
    }, {
        header: '已下拨金额(万元)',
        dataIndex: 'descendAmount',
        sortable: true,
        renderer: Money.render
    }, {
        id: 'abstract',
        header: '说明',
        dataIndex: 'abstract',
        width: 300
    }])
}
Ext.extend(Srims.fund.FinanceSelectGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel = function(){

    this._projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/SearchForFundDescend', undefined);
    
    this._selection = new Ext.grid.CheckboxSelectionModel({
        singleSelect: true
    });
    this._columnModel = new Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel(this._selection);
    
    this.params = {};
    this.params.sm = this._selection;
    this.params.store = this._projectStore;
    this.params.colModel = this._columnModel;
    this.params.defaultBBar = false;
    this.params.style = 'padding:10px;';
    this.params.deferRender = false;
    this.params.autoHeight = true;
    this.params.stateful = false;
    
    Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel.superclass.constructor.call(this, this.params);
    
    this._projectStore.load();
    this.next = function(){
        var records = this._selection.getSelections();
        if (records.length == 0) {
            Ext.Msg.show({
                title: '下拨的项目不能为空',
                msg: '请选择要下拨的项目',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        this.panel._params.project = records[0];
        
        var project = this.panel._params.project;
        var finance = this.panel._params.finance;
        
        var financeCanDescendAmount = finance.get('amount') - finance.get('descendAmount');
        var projectCanDescendAmount = project.get('fundCanDescend');
        var canDescendAmount = financeCanDescendAmount > projectCanDescendAmount ? projectCanDescendAmount : financeCanDescendAmount;
        
        this.panel.panel._amountPanel._labelAmountHint.setText('(最高下拨金额：' + Money.render(canDescendAmount) + '元)');
        
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel, Srims.component.GridPanel, {});



if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel = function(sm){
    Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: 'id',
        dataIndex: 'ID',
        hidden: true
    }, {
        id: 'name',
        header: '项目名称',
        dataIndex: 'name',
        width: 300
    }, {
        header: '项目编号',
        dataIndex: 'number'
    }, {
        header: '到校经费',
        dataIndex: 'fundTotal',
        renderer: Money.render
    }, {
        header: '已到经费',
        dataIndex: 'fundReceived',
        renderer: Money.render
    }]);
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel, Ext.grid.ColumnModel)

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel = function(){

    this._numberFieldDescendAmount = new Srims.component.MoneyField({
        fieldLabel: '下拨金额(万元)',
        allowNegative: false,
        width: 150
    });
    this._labelAmountHint = new Ext.form.Label({})
    Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel.superclass.constructor.call(this, {
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        layout: 'form',
        style: 'padding:10px;',
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 260,
                items: this._numberFieldDescendAmount
            }), new Ext.Panel({
                layout: 'form',
                items: this._labelAmountHint
            })]
        })]
    });
    this.focus = function(){
        this._numberFieldDescendAmount.focus(false, true);
    }
    this.next = function(){
        var descendAmount = this._numberFieldDescendAmount.getMoney();
        var project = this.panel._params.project;
        var finance = this.panel._params.finance;
        
        if (descendAmount == '') {
            Ext.Msg.show({
                title: '下拨金额不能为空',
                msg: '请输入下拨金额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        if (descendAmount <= 0) {
            Ext.Msg.show({
                title: '下拨金额必须大于零',
                msg: '下拨金额必须大于零',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        if (descendAmount > finance.get('amount') - finance.get('descendAmount')) {
            Ext.Msg.show({
                title: '下拨金额不能大于经费的未下拨金额',
                msg: '下拨金额不能大于经费的未下拨金额：' + Money.render(finance.get('amount') - finance.get('descendAmount')) + '元',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        if (descendAmount > project.get('fundTotal') - project.get('fundReceived')) {
            Ext.Msg.show({
                title: '下拨金额不能大于项目的未到金额',
                msg: '下拨金额不能大于项目的未到金额:' + Money.render(project.get('fundTotal') - project.get('fundReceived')) + '元',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        
        this.panel._params.descendAmount = descendAmount;
        this.panel.panel._confirmPanel.setValue(this.panel._params);
        
        Srims.expertGuide.next(this);
    };
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel, Ext.Panel, {});

if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel = function(){

    this._textFieldProjectName = new Ext.form.TextField({
        fieldLabel: '下拨项目名称',
        readOnly: true,
        width: 300
    });
    this._textFieldDescend = new Ext.form.TextField({
        fieldLabel: '下拨金额',
        width: 150,
        readOnly: true
    });
    
    this._numberFieldFinanceVoucherNumber = new Ext.form.TextField({
        fieldLabel: '下拨经费凭单号',
        readOnly: true,
        width: 150
    });
    this._textAreaAbstract = new Ext.form.TextField({
        fieldLabel: '下拨经费说明说明',
        readOnly: true,
        width: 350
    });
    Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel.superclass.constructor.call(this, {
        deferHeight: false,
        layout: 'form',
        style: 'padding:10px;',
        items: [this._textFieldProjectName, this._textFieldDescend, this._numberFieldFinanceVoucherNumber, this._textAreaAbstract]
    });
    this.setValue = function(params){
        this._numberFieldFinanceVoucherNumber.setValue(params.finance.get('voucherNumber'));
        this._textAreaAbstract.setValue(params.finance.get('abstract'));
        this._textFieldProjectName.setValue(params.project.get('name'));
        this._textFieldDescend.setValue(Money.render(params.descendAmount));
    }
    this.next = function(){
        var params = {};
        params.isLent = false;
        params.projectID = this.panel._params.project.get('id');
        params.amount = this.panel._params.descendAmount;
        params.financeId = this.panel._params.finance.get('id');
        
        this.button.setText('正在执行下一步...');
        this.button.disable();
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(){
                Srims.expertGuide.next(this);
            }
        });
    }
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel, Ext.Panel, {});

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.ExpertGuidFundAllocationPanel = function(id, iconCls){

    this._waitingAllocationFundDescendSelectPanel = new Srims.fund.MyWaitingAllocationFundDescendGridPanel();
    this._allocationPanel = new Ext.Panel({
        html: '<div id=divExpertGuidAllocationPanel></div>'
    });
    this._processPanels = [this._waitingAllocationFundDescendSelectPanel, this._allocationPanel];
    
    this._processDescriptionStore = Srims.expertGuide.fundAllocation_ProcessDescriptionStore;
    
    this._processesShowPanel = new Srims.expertGuide.ProcessesShowForm(this._processDescriptionStore, '经费分配流程');
    this._allocationSingleProcessOperatePanel = new Srims.expertGuide.SingleProcessOperatePanel('fundAllocation', this._processDescriptionStore, this._processPanels);
    
    this._allocationSingleProcessOperatePanel.panel = this;
    Srims.fund.ExpertGuidFundAllocationPanel.superclass.constructor.call(this, {
        id: id,
        frame: true,
        style: 'padding:5px; width:1200px',
        title: '经费分配',
        closable: true,
        deferredRender: false,
        deferHeight: false,
        layout: 'form',
        buttonAlign: 'center',
        iconCls: iconCls,
        items: [this._processesShowPanel, this._allocationSingleProcessOperatePanel],
        buttons: []
    });
    
    this._allocationPanel.next = function(){
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/GetById',
            params: {
                fundAllocationId: this.panel.fundAllocation.get('id')
            },
            scope: this,
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.fund.FundAllocationXmlReader()
                });
                var currentFundAllocation = store.getAt(0);
                //控制列表的显示和按钮的刷新
                currentFundAllocation.panel = this.panel.fundAllocation.panel;
                currentFundAllocation.panel.fundAllocation = currentFundAllocation;
                currentFundAllocation.panel.button = this.button;
                currentFundAllocation.panel.button.panel = this;
                
                
                if (currentFundAllocation.get('canAllocation')) 
                    Srims.fund.newVoucher(currentFundAllocation, false);
                else if(currentFundAllocation.get('canSubmit'))
                    Srims.fund.submitFundAllocation(currentFundAllocation, this);
                else
                   Srims.fund.undoSubmitFundAllocation(currentFundAllocation,this);
            }
        });
    }
}
Ext.extend(Srims.fund.ExpertGuidFundAllocationPanel, Ext.Panel, {});


if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.ExpertGuidFundDescendPanel = function(id, iconCls){

    this._financeSelectPanel = new Srims.fund.FinanceSelectPanel();
    this._projectSelectPanel = new Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel();
    this._amountPanel = new Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendAmountPanel();
    this._confirmPanel = new Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel();
    this._processPanels = [this._financeSelectPanel, this._projectSelectPanel, this._amountPanel, this._confirmPanel];
    
    this._processDescriptionStore = Srims.expertGuide.fundDescend_ProcessDescriptionStore;
    
    this._processesShowPanel = new Srims.expertGuide.ProcessesShowForm(this._processDescriptionStore, '经费下拨流程');
    this._descendSingleProcessOperatePanel = new Srims.expertGuide.SingleProcessOperatePanel('fundDeScend', this._processDescriptionStore, this._processPanels);
    
    this._descendSingleProcessOperatePanel.panel = this;
    this._processDescriptionStore.panel = this;
    Srims.fund.ExpertGuidFundDescendPanel.superclass.constructor.call(this, {
        id: id,
        frame: true,
        style: 'padding:5px; width:1200px',
        title: '经费下拨',
        closable: true,
        deferredRender: false,
        deferHeight: false,
        layout: 'form',
        buttonAlign: 'center',
        iconCls: iconCls,
        items: [this._processesShowPanel, this._descendSingleProcessOperatePanel]
    });
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel, Ext.Panel, {});


if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceVouchersShowWindow = function(id, finance){

    this._id = id;
    this._finance = finance;
    
    var load_url = Srims.service.fund.FinanceService + '/GetVouchers';
    this._store = new Srims.fund.VoucherStore(load_url, {
        financeID: this._finance.get('id')
    });
    
    this._gridPanelVoucher = new Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel(this._store);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.fund.FinanceVouchersShowWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费到帐凭单信息',
        iconCls: 'icon-fund-voucher',
        width: 750,
        labelWidth: 90,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._gridPanelVoucher],
        buttons: [this._buttonClose]
    });
    this._store.load();
}
Ext.extend(Srims.fund.FinanceVouchersShowWindow, Ext.Window)


if (!Srims.finance) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel = function(voucherStore){

    //fields
    this._store = voucherStore;
    this._store.grid = this;
    //controls    
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel_ColumnModel();
    this._toolbar = new Srims.fund.FinanceVouchesShowWindow_VoucherGridPanel_ToolBar(this._store, this._selections);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.height = 270;
    params.defaultBBar = false;
    //constructor
    Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var voucher = grid.getStore().getAt(rowIndex);
        Srims.fund.showVoucher(voucher, grid._store, false);
    }
}
Ext.extend(Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel, Srims.component.GridPanel);

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FinanceVouchesShowWindow_VoucherGridPanel_ToolBar = function(store, selection){
    //fields
    this._store = store;
    this._selection = selection;
    
    //controls
    this._buttonShowVoucher = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.fund.showVoucher(this.selection.getSelected(), this.store, false);
        },
        tooltip: '<b>查看凭单信息</b>'
    });
    
    Srims.fund.FinanceVouchesShowWindow_VoucherGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShowVoucher],
        height: 25
    });
    //initial
    this._selection.buttonShowVoucher = this._buttonShowVoucher;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShowVoucher = selection.buttonShowVoucher;
        
        if (selection.getCount() == 0) {
            buttonShowVoucher.hide();
            return;
        }
        
        var voucher = selection.getSelected();
        
        buttonShowVoucher.setVisible(true);
        buttonShowVoucher.setDisabled(false);
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FinanceVouchesShowWindow_VoucherGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel_ColumnModel = function() {
	Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber'
	},{
		header: "经费成员",
		dataIndex: 'expertName'
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		renderer: Money.render
	},{
		header: "校内金额(万元)",
		dataIndex: 'allocationIn',
		renderer: Money.render
	},{
		header: "外协金额(万元)",
		dataIndex: 'allocationOut',
		renderer: Money.render
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber'
	},{
		header: "分配时间",
		dataIndex: 'fundAllocationDateTime',
		renderer: Date.render
	},{
		id: 'voucherState',
		header: "状态",
		dataIndex: 'voucherState',
		renderer: Srims.fund.VoucherStateRender
	}]);
}
Ext.extend(Srims.fund.FinanceVouchersShowWindow_VoucherGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationCorrectDateTimeWindow = function(fundallocation){

    this._fundAllocation = fundallocation;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._dateFieldDateTime = new Ext.form.DateField({
        fieldLabel: '分配时间',
        value: this._fundAllocation.get('allocationDateTime'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });
    Srims.fund.FundAllocationCorrectDateTimeWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '纠正经费分配时间',
        width: 300,
        labelWidth: 70,
        height: 160,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._dateFieldDateTime],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._dateFieldDateTime.isValid(preventMark) && result;
        
        return result;
    }
    this._save = function(){
        var fundAllocationDateTime = this._dateFieldDateTime.getValue().format("Y-m-d H:i:s");
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundAllocationService + '/CorrectDateTime',
            params: {
                fundAllocationId: this._fundAllocation.get('id'),
                fundAllocationDateTime: fundAllocationDateTime
            },
            scope: this,
            success: function(){
                var panel = this._fundAllocation.panel;
                panel.fundAllocation = this._fundAllocation;
                panel.refresh();
                
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.fund.FundAllocationCorrectDateTimeWindow, Ext.Window, {})
if (!Srims.fund)
	Ext.namespace('Srims.fund');

Srims.fund.FundAllocationCorrectWindow = function(fundAllocation) {

	this._fundAllocation = fundAllocation;

	this._buttonClose = new Ext.Button({
		minWidth: 70,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.close();
		}
	});
	var load_url = Srims.service.fund.VoucherService + '/GetByFundAllocation';
	this._store = new Srims.fund.VoucherStore(load_url, {
		fundAllocationId: this._fundAllocation.get('id')
	});
	this._selections = new Ext.grid.RowSelectionModel();
	this._columnModel = new Ext.grid.ColumnModel([{
		header: "id",
		dataIndex: 'id',
		hidden: true,
		hideable: false
	},{
		header: "凭单号",
		dataIndex: 'voucherNumber'
	},{
		header: "经费成员",
		dataIndex: 'expertName'
	},{
		header: "金额(万元)",
		dataIndex: 'amount',
		renderer: Money.render
	},{
		header: "校内金额(万元)",
		dataIndex: 'allocationIn',
		renderer: Money.render
	},{
		header: "外协金额(万元)",
		dataIndex: 'allocationOut',
		renderer: Money.render
	},{
		header: "账本号",
		dataIndex: 'accountBookNumber'
	},{
		id: 'voucherState',
		header: "状态",
		dataIndex: 'voucherState',
		hidden: false,
		renderer: Srims.fund.VoucherStateRender
	}]);
	this._tbar = new Srims.fund.VoucherGridPanel_ToolBar(this._selections, this._store, undefined, undefined, false, true, fundAllocation, false, true);

	this._gridPanelVoucher = new Ext.grid.GridPanel({
		store: this._store,
		colModel: this._columnModel,
		enableColumnHide: false,
		enableColumnMove: true,
		enableHdMenu: false,
		border: false,
		tbar: this._tbar,
		sm: this._selections,
		width: 700,
		height: 200,
		autoExpand: true,
		autoExpandColumn: 'voucherState',
		stripeRows: true,
		loadMask: true,
		stateful: false,
		viewConfig: {
			autoFill: true,
			scrollOffset: 0,
			forceFit: true,
			emptyText: '没有凭单信息'
		}
	});

	this._store.load();
	function onCellDblClick(grid, rowIndex, columnIndex, e) {
		var voucher = grid.getStore().getAt(rowIndex);
		if (!voucher.get('canEdit'))
			return;

		Srims.fund.editVoucher(fundAllocation, voucher);
	};

	this._gridPanelVoucher.on('celldblclick', onCellDblClick);

	Srims.fund.FundAllocationCorrectWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '纠正经费分配',
		autoHeight: true,
		width: 710,
		modal: true,
		deferredRender: false,
		stateful: false,
		frame: true,
		closeAction: 'close',
		layout: 'form',
		resizable: false,
		items: [this._gridPanelVoucher],
		buttons: [this._buttonClose]
	});
}
Ext.extend(Srims.fund.FundAllocationCorrectWindow, Ext.Window, {})
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleType = new function(){
};

Srims.users.UserRoleType.Administrator = 'Administrator';
Srims.users.UserRoleType.Expert = 'Expert';


if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.ImportWindow = function(id, store, importUrl, description, isMagazienInformation) {

    this._id = id;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '导 入',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            window.formPanel = window._formPanelData;
            window.store = window._store;

            var params = {};
            if (isMagazienInformation)
                params.year = window._numberFieldYear.getValue();

            window.formPanel.getForm().submit({
                params: params,
                url: importUrl,
                waitMsg: '正在导入数据，请耐心等候....',
                success: function(form, action) {
                    Ext.Msg.show({
                        title: '成功导入数据',
                        msg: '导入数据成功',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });

                    if (window.store)
                        window.store.load();

                    window.close();

                    var jsonData = Ext.util.JSON.decode(action.response.responseText);
                    var logDocumentName = jsonData.LogDocumentName;

                    Srims.documents.downLoadResource(logDocumentName, '/GetImportLog');
                }
            });
        }
    });
    this._fieldDesprition = new Ext.form.Field({
        fieldLabel: '说明',
        value: description,
        readOnly: true,
        width: 180
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 180,
        allowBlank: false
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'ImportData',
        fieldLabel: '选择数据文件',
        width: 180,
        emptyText: '请选择要导入的数据文件',
        allowBlank: false,
        fileTypes: ['xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });

    var items = [];
    if (isMagazienInformation)
        items = [this._fieldDesprition, this._numberFieldYear, this._fileUploadField];
    else
        items = [this._fieldDesprition, this._fileUploadField];

    this._formPanelData = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        autoHeight: true,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: items
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        if (isMagazienInformation)
            result = this._numberFieldYear.isValid(preventMark) && result;

        return result;
    }

    Srims.component.ImportWindow.superclass.constructor.call(this, {
        id: this._id,
        title: description,
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelData],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.component.ImportWindow, Ext.Window, {})
