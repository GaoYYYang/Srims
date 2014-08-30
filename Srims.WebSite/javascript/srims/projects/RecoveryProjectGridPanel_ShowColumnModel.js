
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryprojectGridPanel_ShowColumnModel = function() {
    Srims.projects.RecoveryprojectGridPanel_ShowColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "学校间接费用差值",
        dataIndex: 'overheadExpensesInAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "二级单位间接费用差值",
        dataIndex: 'overheadExpensesMiddleAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "课题组间接费用及绩效差值",
        dataIndex: 'performancePayAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "校内调整间接费用",
        dataIndex: 'recoveryAmount',
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "凭单号",
        dataIndex: 'voucherNumber',
        width: 100,
        sortable: true,
        hidden: false
    }, {
        header: "打印状态",
        dataIndex: 'isPrint',
        width: 90,
        sortable: true,
        hidden: false
    }, {
        header: "打印日期",
        dataIndex: 'printDateTime',
        width: 120,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: '是否作废',
        dataIndex: 'isCanceled',
        width: 40,
        renderer: function(value) {
            return value == true ? '是' : '否';
        },
        sortable: true,
        hidden: false
    }, {
        header: "备注",
        dataIndex: 'remark',
        width: 100,
        sortable: true,
        hidden: false
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.projects.RecoveryprojectGridPanel_ShowColumnModel, Ext.grid.ColumnModel);
