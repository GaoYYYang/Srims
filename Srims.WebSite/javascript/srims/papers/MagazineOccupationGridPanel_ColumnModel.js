
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationGridPanel_ColumnModel = function(){
    Srims.papers.MagazineOccupationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '专家',
        dataIndex: 'expertName',
        width: 100
    }, {
        header: '期刊全称',
        dataIndex: 'magazineName',
        width: 150
    }, {
        header: 'ISSN',
        dataIndex: 'magazineISSN',
        width: 100
    }, {
        header: '担任职务',
        dataIndex: 'occupation',
        width: 100
    }, {
        header: '聘期起始年份',
        dataIndex: 'engageStartYear',
        width: 100
    }, {
        header: '聘期终止年份',
        dataIndex: 'engageEndYear',
        width: 100
    }]);
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.MagazineOccupationGridPanel_ColumnModel, Ext.grid.ColumnModel);
