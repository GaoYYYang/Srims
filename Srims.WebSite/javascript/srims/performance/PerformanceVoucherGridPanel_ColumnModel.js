if (!Srims.performance)
    Ext.namespace('Srims.performance');
Srims.performance.PerformanceVoucherGridPanel_ColumnModel = function(value, metadata, record) {

    if (record.get('isRead') == false)
        metadata.css = "voucher_unread " + metadata.css;

    return value;
};
Srims.performance.PerformanceVoucherGridPanel_ColumnModel = function(isFinanceManage, isExpert) {
    Srims.performance.PerformanceVoucherGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return value;
        }
    }, {
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
    }, {
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
    }, {
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
    }, {
        header: "状态",
        dataIndex: 'voucherState',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value) {
            return Srims.performance.VoucherStateRender(value);
        }
    }, {
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
    }, {
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
    }, {
        header: "账本号",
        dataIndex: 'accountBookNumber',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return value;
        }
    }, {
        header: "课题组间接费用及绩效(万元)",
        dataIndex: 'overheadExpensesExpert',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Money.render(value);
        }
    }, {
        header: "课题组间接费用(万元)",
        dataIndex: 'overheadExpensesExpertRest',
        width: 40,
        sortable: true,
        hidden: false,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Money.render(value);
        }
    }, {
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
    }, {
        header: "是否已读",
        dataIndex: 'isRead',
        width: 40,
        sortable: true,
        hidden: true,
        renderer: function(value, metadata, record) {
            if (isExpert && record.get('isRead') == false)
                Srims.fund.VoucherGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Boolean.render(value);
        }
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.performance.PerformanceVoucherGridPanel_ColumnModel, Ext.grid.ColumnModel);