
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineGridPanel_GridFilters = function(){
    Srims.papers.MagazineGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'fullName'
        }, {
            type: 'string',
            dataIndex: 'issn'
        }, {
            type: 'list',
            dataIndex: 'language',
            options: Srims.papers.languageFilterItems,
            phpMode: true
        }, {
            type: 'list',
            labelField: 'value',
            dataIndex: 'subjectRank',
            store: new Srims.data.IDValueRecordStore(Srims.service.papers.MagazineService + '/GetSubjectRank'),
            phpMode: true
        }]
    });
}
Ext.extend(Srims.papers.MagazineGridPanel_GridFilters, Ext.grid.GridFilters);

