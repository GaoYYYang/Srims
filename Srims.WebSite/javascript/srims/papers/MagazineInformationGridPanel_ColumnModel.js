
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationGridPanel_ColumnModel = function(){
    Srims.papers.MagazineInformationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '年份',
        dataIndex: 'year',
        width: 100
    }, {
        header: '影响因子',
        dataIndex: 'influenceFactor',
        renderer: InfluenceFactor.render,
        width: 100
    }, {
        header: '被引频次',
        dataIndex: 'citeFrequency',
        width: 100
    }, {
        header: '分区',
        dataIndex: 'subAirer',
        width: 100
    }, {
        header: '即年指数',
        dataIndex: 'instantExponent',
        width: 100,
        renderer: InfluenceFactor.render
    }, {
        header: '论文数',
        dataIndex: 'paperCount',
        width: 100
    }, {
        header: '引用半衰期',
        dataIndex: 'citeHalfLife',
        width: 100
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.MagazineInformationGridPanel_ColumnModel, Ext.grid.ColumnModel);

