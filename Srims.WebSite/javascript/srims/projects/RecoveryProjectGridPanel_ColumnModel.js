
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryprojectGridPanel_ColumnModel = function() {
    Srims.projects.RecoveryprojectGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "凭单号",
        dataIndex: 'voucherNumber',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "项目编号",
        dataIndex: 'number',
        width: 60,
        sortable: false,
        hidden: false
    }, {
        header: "项目名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        renderer: function(value) {
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "所属学院",
        dataIndex: 'principalCollege',
        width: 40,
        sortable: true,
        hidden: true
    }, {
        header: "已分配校内经费",
        dataIndex: 'currentAllocationIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已收学校间接费用",
        dataIndex: 'receivedOverheadExpensesIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "应收学校间接费用",
        dataIndex: 'planedOverheadExpensesIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "学校间接费用差值",
        dataIndex: 'overheadExpensesInAmount',
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        header: "已收二级单位间接费用",
        dataIndex: 'receivedOverheadExpensesMiddle',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "应收二级单位间接费用",
        dataIndex: 'planedOverheadExpensesMiddle',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "二级单位间接费用差值",
        dataIndex: 'overheadExpensesMiddleAmount',
        sortable: false,
     
        renderer: Money.render
    },{
        header: "应发课题组间接费用及绩效金额",
        dataIndex: 'planedPerformancePay',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "已发课题组间接费用及绩效金额",
        dataIndex: 'receivedPerformancePay',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "课题组间接费用及绩效差值",
        dataIndex: 'performancePayAmount',
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        header: "校内调整间接费用",
        dataIndex: 'recoveryAmount',
        sortable: false,
        hidden: false,
        renderer: Money.render
    }, {
        header: "调整前学校间接费用",
        dataIndex: 'oldOverheadExpensesIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整后学校间接费用",
        dataIndex: 'newOverheadExpensesIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    },  {
        header: "调整前项目校内课题组间接费用及绩效",
        dataIndex: 'oldPerformancePay',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整后项目校内课题组间接费用及绩效",
        dataIndex: 'newPerformancePay',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整前校内计划分配",
        dataIndex: 'oldFundPlanIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整后校内计划分配",
        dataIndex: 'newFundPlanIn',
        sortable: false,
        hidden: true,
        renderer: Money.render
    }, {
        header: "调整时间",
        dataIndex: 'operateTime',
        sortable: true,
        hidden: true,
        renderer: Date.render
    }, {
        header: "操作人",
        dataIndex: 'operator',
        sortable: true,
        hidden: true,
    }, {
        header: "备注",
        dataIndex: 'remark',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "账本号",
        dataIndex: 'accountBookNumber',
        width: 40,
        sortable: false,
        hidden: true
    },{
        header: "是否作废",
        dataIndex: 'isCanceled',
        width: 40,
        sortable: true,
        hidden: false,
            renderer: function(value) {
            return value == true ? '<span>是</span>' : '<span>否</span>';
        }
    }, {
        header: "是否打印",
        dataIndex: 'isPrint',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "打印日期",
        dataIndex: 'printDateTime',
        width: 40,
        sortable: true,
        hidden: true,
        renderer: Date.render
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.projects.RecoveryprojectGridPanel_ColumnModel, Ext.grid.ColumnModel);