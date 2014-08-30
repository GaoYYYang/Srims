/**
* @author dulintao
*/
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformancePanel_ColumnModel = function(selectModel) {
    Srims.performance.PerformancePanel_ColumnModel.superclass.constructor.call(this, [selectModel, {
        header: 'id',
        hidden: true,
        dataIndex: 'id',
    }, {
        header: '项目编号',
        dataIndex: 'projectNumber',
        width: 20,
        sortable: false,
        hidden: false
    }, {
        header: '项目名称',
        dataIndex: 'projectName',
        width: 20,
        sortable: false,
        hidden: false
    }, {
        header: '项目类型',
        dataIndex: 'typeName',
        width: 20,
        sortable: true,
        hidden: false
    }, {
        header: '负责人',
        dataIndex: 'expertName',
        width: 20,
        sortable: true,
        hidden: false
    },  {
        header: '本次分配校内经费',
        dataIndex: 'fundAllocationIn',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    },  {
        header: '本次分配学校间接费',
        dataIndex: 'fundAllocationOverheadExpensesIn',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    },  {
        header: '本次分配二级单位间接费',
        dataIndex: 'fundAllocationOverheadExpensesMiddle',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    }, {
        header: '本次课题组间接费和绩效',
        dataIndex: 'arrivedPerformance',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    }, {
        header: '已下拨课题组间接费和绩效',
        dataIndex: 'descendPerformance',
        width: 40,
        renderer: Money.render,
        sortable: true,
        hidden: false
    },  {
        header: '已下拨课题组间接费',
        dataIndex: 'allocatedOverheadExpensesExpert',
        width: 40,
        renderer: Money.render,
        sortable: false,
        hidden: false
    },{
        header: '已分绩效',
        dataIndex: 'allocatedPerformance',
        width: 40,
        renderer: Money.render,
        sortable: false,
        hidden: false
    }, {
        header: '是否作废',
        dataIndex: 'isCancel',
        width: 40,
        renderer: function(value) {
            return value == true ? '是' : '否';
        },
        sortable: true,
        hidden: false
    }, {
        header: '是否下拨完成',
        dataIndex: 'isAllocated',
        width: 40,
        renderer: function(value) {
            return value == true ? '是' : '否';
        },
        sortable: true,
        hidden: false
    }, {
        header: "产生日期",
        dataIndex: 'foundationTime',
        width: 80,
        sortable: true,
        hidden: true,
        renderer: Date.render

    }, {
        header: "经费来源",
        dataIndex: 'fundFromUnit',
        width: 80,
        sortable: true,
        hidden: true

    }, {
        header: "来款单位",
        dataIndex: 'fundFromUnitAddress',
        width: 80,
        sortable: true,
        hidden: true
    }
]);
}
Ext.extend(Srims.performance.PerformancePanel_ColumnModel, Ext.grid.ColumnModel);