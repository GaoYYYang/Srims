
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_ParticipantProjects_ColumnModel = function(){
    Srims.experts.ExpertShowPanel_ParticipantProjects_ColumnModel.superclass.constructor.call(this, [{
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
        header: '项目类别',
        dataIndex: 'type',
        hidden: false
    }, {
        header: '项目级别',
        dataIndex: 'level',
        hidden: false,
        renderer: Srims.experts.projectLevelRender
    }, {
        header: '负责人',
        dataIndex: 'principal',
        hidden: false
    }, {
        header: '位次',
        dataIndex: 'order',
        hidden: false
    }])
}
Ext.extend(Srims.experts.ExpertShowPanel_ParticipantProjects_ColumnModel, Ext.grid.ColumnModel);
