
if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperGridPanel_GridFilters = function() {
    Srims.papers.LiberalArtsPaperGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'publishDateYear'
        }, {
            type: 'string',
            dataIndex: 'resultsName',
            influenceFactor: true
        }, {
            type: 'list',
            dataIndex: 'resultsType',
            options: Srims.papers.ResultsTypeFilterItems,
            phpMode: true
        }, {
            type: 'string',
            dataIndex: 'authors'
        }, {
            type: 'string',
            dataIndex: 'degree'
        }, {
            type: 'string',
            dataIndex: 'publishDateYear'
        }, {
            type: 'string',
            dataIndex: 'resultsForm'
        }, {
            type: 'string',
            dataIndex: 'publisher'
        }, {
            type: 'string',
            dataIndex: 'firstAuthorName'
        }, {
            type: 'string',
            dataIndex: 'ourSchoolSignRank'
}]
        });
    }
    Ext.extend(Srims.papers.LiberalArtsPaperGridPanel_GridFilters, Ext.grid.GridFilters);
