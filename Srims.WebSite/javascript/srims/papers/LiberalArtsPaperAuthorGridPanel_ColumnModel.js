
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorGridPanel_ColumnModel = function() {
Srims.papers.LiberalArtsPaperGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '位次',
        dataIndex: 'order',
        width: 100
    }, {
        header: '姓名',
        dataIndex: 'name',
        width: 100
    }, {
        header: '英文名',
        dataIndex: 'englishName',
        width: 100
    }, {
        header: '工作证号',
        dataIndex: 'expertNumber',
        width: 100
    }, {
        header: '是否通信作者',
        dataIndex: 'isLinkMan',
        width: 100,
        renderer: Boolean.render
    }]);
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.LiberalArtsPaperAuthorGridPanel_ColumnModel, Ext.grid.ColumnModel);
