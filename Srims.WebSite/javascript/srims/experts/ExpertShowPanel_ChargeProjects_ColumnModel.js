
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_ChargeProjects_ColumnModel = function(){
    Srims.experts.ExpertShowPanel_ChargeProjects_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '项目编号',
        dataIndex: 'number',
        hidden: false
    }, {
        header: '名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '项目等级',
        dataIndex: 'rank',
        hidden: false
    }, {
        header: '项目类别',
        dataIndex: 'type',
        hidden: false
    }, {
        header: '项目级别',
        dataIndex: 'level',
        hidden: false,
        renderer: Srims.experts.projectLevelRender
    }, {
        header: '总经费（万）',
        dataIndex: 'fundTotal',
        hidden: false,
        renderer: Money.render
    }, {
        header: '已到经费（万）',
        dataIndex: 'fundReceived',
        hidden: false,
        renderer: Money.render
    }, {
        header: '起始年月',
        dataIndex: 'startDate',
        hidden: false,
        renderer: Date.render
    }, {
        header: '结束年月',
        dataIndex: 'endDate',
        hidden: false,
        renderer: Date.render
    }])
}
Ext.extend(Srims.experts.ExpertShowPanel_ChargeProjects_ColumnModel, Ext.grid.ColumnModel);
