
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_Papers_ColumnModel = function(){
    Srims.experts.ExpertShowPanel_Papers_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '论文名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '发表杂志',
        dataIndex: 'magazineShortName',
        hidden: false
    }, {
        header: '发表年份',
        dataIndex: 'publishDateYear',
        hidden: false
    }, {
        header: '影响因子',
        dataIndex: 'influenceFactor',
        renderer: InfluenceFactor.render,
        hidden: false
    }, {
        header: '收录',
        dataIndex: 'paperIndexeds',
        hidden: false
    }, {
        header: '通讯作者',
        dataIndex: 'authorLink',
        hidden: false
    }, {
        header: '第一作者',
        dataIndex: 'firstAuthor',
        hidden: false
    }, {
        header: '位次',
        dataIndex: 'order',
        hidden: false
    }])
}
Ext.extend(Srims.experts.ExpertShowPanel_Papers_ColumnModel, Ext.grid.ColumnModel);
