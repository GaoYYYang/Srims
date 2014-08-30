
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_Awards_ColumnModel = function(){
    Srims.experts.ExpertShowPanel_Awards_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '奖项名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '获奖年份',
        dataIndex: 'year',
        hidden: false
    }, {
        header: '奖项级别',
        dataIndex: 'rank',
        hidden: false
    }, {
        header: '奖项等级',
        dataIndex: 'class',
        hidden: false
    }, {
        header: '位次',
        dataIndex: 'order',
        hidden: false
    }, {
        header: '项目名称',
        dataIndex: 'project',
        hidden: false
    }])
}
Ext.extend(Srims.experts.ExpertShowPanel_Awards_ColumnModel, Ext.grid.ColumnModel);
