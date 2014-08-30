
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_Patents_ColumnModel = function() {
    Srims.experts.ExpertShowPanel_Patents_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '专利号',
        dataIndex: 'number',
        hidden: false
    }, {
        header: '专利名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '法律状态',
        dataIndex: 'lawState',
        renderer: Srims.patents.PatentLawStateRender,
        hidden: false
    }, {
        header: '专利类型',
        dataIndex: 'type',
        hidden: false,
        renderer: Srims.patents.PatentTypeRender
    }, {
        header: '位次',
        dataIndex: 'order',
        hidden: false
    }, {
        header: '负责人',
        dataIndex: 'principal',
        hidden: false
    }, {
        header: '授权年度',
        dataIndex: 'authorizeDateTime',
        renderer: Date.render,
        hidden: false
}])
    }
    Ext.extend(Srims.experts.ExpertShowPanel_Patents_ColumnModel, Ext.grid.ColumnModel);
