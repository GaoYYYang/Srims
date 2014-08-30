
if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceAllocationGridPanel_ColumnModel = function(isCheckBox, selectModel) {
    if (isCheckBox) {
        Srims.performance.PerformanceAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [selectModel, {
            header: 'id',
            hidden: true
        }, {
            header: '项目编号',
            dataIndex: 'projectNumber',
            width: 20,
            sortable: false,
            hidden: false
        }, {
            header: '项目名称',
            dataIndex: 'projectName',
            sortable: true,
            width: 300
        }, {
            header: '项目类型',
            dataIndex: 'typeName',
            sortable: true,
            width: 300
        }, {
            header: '项目负责人',
            dataIndex: 'projectPricinpalName',
            sortable: true,
            width: 300
        }, {
            header: '项目间接费',
            dataIndex: 'indirectCosts',
            width: 40,
            renderer: Money.render,
            hidden: true

        }, {
            header: '项目绩效',
            dataIndex: 'projectPerformancePay',
            width: 40,
            renderer: Money.render,
            hidden: true
        }, {
            header: '校内绩效',
            dataIndex: 'performancePay',
            width: 40,
            renderer: Money.render,
            hidden: true
        }, {
            header: '本次校内分配',
            dataIndex: 'fundAllocationIn',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '已到课题组间接费用及绩效',
            dataIndex: 'arrivedOverheadexpensesExpert',
            width: 80,
            renderer: Money.render
        }, {
            header: '课题组间接费用',
            dataIndex: 'expertIndirectFee',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '绩效',
            dataIndex: 'arrivedPerformance',
            width: 80,
            renderer: Money.render,
            hidden: true
        }, {
            header: '是否允许分配',
            dataIndex: 'canAllocate',
            width: 40,
            renderer: function(value) {
                return value == true ? '是' : '否';
            },
            sortable: true,
            hidden: true
        }, {
            header: '当前状态',
            dataIndex: 'state',
            sortable: true,
            width: 60,
            renderer: Srims.performance.fundAllocationStateRender,
            hidden: true
        }, {
            header: '当前状态时间',
            dataIndex: 'dateTime',
            width: 100,
            renderer: Date.render,
            hidden: true
        }, {
            id: 'operator',
            header: '当前状态操作人',
            dataIndex: 'operator',
            hidden: true
}])
        }
        else {
            Srims.performance.PerformanceAllocationGridPanel_ColumnModel.superclass.constructor.call(this, [{
                header: 'id',
                hidden: true
            }, {
                header: '项目编号',
                dataIndex: 'projectNumber',
                width: 20,
                sortable: false,
                hidden: false
            }, {
                header: '项目名称',
                dataIndex: 'projectName',
                sortable: true,
                width: 300
            }, {
                header: '项目类型',
                dataIndex: 'typeName',
                sortable: true,
                width: 300
            }, {
                header: '项目负责人',
                dataIndex: 'projectPricinpalName',
                sortable: true,
                width: 300
            }, {
                header: '本次校内分配',
                dataIndex: 'fundAllocationIn',
                sortable: false,
                width: 80,
                renderer: Money.render,
                hidden: true
            }, {
                header: '已到课题组间接费用及绩效',
                dataIndex: 'arrivedOverheadexpensesExpert',
                width: 80,
                renderer: Money.render
            }, {
                header: '是否允许分配',
                dataIndex: 'canAllocate',
                width: 40,
                renderer: function(value) {
                    return value == true ? '是' : '否';
                },
                sortable: true,
                hidden: true
            }, {
                header: '分配时间',
                dataIndex: 'allocationDateTime',
                sortable: true,
                width: 100,
                renderer: Date.render,
                hidden: true
            }, {
                header: '当前状态',
                dataIndex: 'state',
                sortable: true,
                width: 60,
                renderer: Srims.performance.fundAllocationStateRender,
                hidden: true
            }, {
                header: '当前状态时间',
                dataIndex: 'dateTime',
                width: 100,
                renderer: Date.render,
                hidden: true
            }, {
                id: 'operator',
                header: '当前状态操作人',
                dataIndex: 'operator',
                hidden: true
}])
            }
        }
        Ext.extend(Srims.performance.PerformanceAllocationGridPanel_ColumnModel, Ext.grid.ColumnModel);