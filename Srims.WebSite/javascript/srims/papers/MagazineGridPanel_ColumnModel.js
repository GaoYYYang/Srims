
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineGridPanel_ColumnModel = function(){
    Srims.papers.MagazineGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "杂志名称",
        dataIndex: 'fullName',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "ISSN",
        dataIndex: 'issn',
        sortable: true,
        width: 30,
        hidden: false
    }, {
        header: "语言",
        dataIndex: 'language',
        sortable: true,
        hidden: false,
        width: 30,
        renderer: Srims.papers.LanguageRender
    }, {
        header: "学科等级",
        dataIndex: 'subjectRank',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "简称",
        dataIndex: 'shortName',
        width: 40,
        sortable: true,
        hidden: true
    }, {
        header: "已删除",
        dataIndex: 'isDelete',
        width: 20,
        sortable: true,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "出版公司",
        dataIndex: 'publishCompany',
        width: 40,
        sortable: true,
        hidden: true
    }, {
        header: "出版公司地址",
        dataIndex: 'publishCompanyAddress',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "出版公司所在城市",
        dataIndex: 'publishCompanyCity',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "出版类型",
        dataIndex: 'publishType',
        width: 40,
        sortable: true,
        hidden: true,
        renderer: Srims.papers.PublishTypeRender
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.MagazineGridPanel_ColumnModel, Ext.grid.ColumnModel);
