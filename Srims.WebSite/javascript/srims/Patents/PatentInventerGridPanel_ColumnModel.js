
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerGridPanel_ColumnModel = function() {
    Srims.patents.PatentInventerGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "发明人id",
        dataIndex: 'id',
        hidden: true
    }, {
        header: "位次",
        dataIndex: 'order',
        width: 1
    }, {
        header: "姓名",
        dataIndex: 'name',
        width: 2
    }, {
        header: "工作证号",
        dataIndex: 'expertNumber',
        width: 2
    }, {
        header: "专家ID",
        dataIndex: 'expertID',
        width: 2,
        hidden: true
    }, {
        header: "是否负责人",
        dataIndex: 'isPrincipal',
        width: 1.5,
        renderer: Boolean.render
    }
]);
}

Ext.extend(Srims.patents.PatentInventerGridPanel_ColumnModel, Ext.grid.ColumnModel);



