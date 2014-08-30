
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperGridPanel_GridFilters = function(){
    Srims.papers.PaperGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'numeric',
            dataIndex: 'influenceFactorOfPaper',
            influenceFactor: true
        }, {
            type: 'numeric',
            dataIndex: 'publishYear'
        }, {
            type: 'string',
            dataIndex: 'fullName'
        }, {
            type: 'string',
            dataIndex: 'collegeName'
        }, {
            type: 'list',
            dataIndex: 'type',
            options: Srims.papers.paperTypeFilterItems,
            phpMode: true
        }, {
            type: 'numeric',
            dataIndex: 'citeFrequencyOfPaper'
        }, {
            type: 'list',
            dataIndex: 'linkManSignUnit',
            options: Srims.papers.signUnitFilterItems,
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'firstAuthorSignUnit',
            options: Srims.papers.signUnitFilterItems,
            phpMode: true
        }, {
            type: 'string',
            dataIndex: 'lab'
        }, {
            type: 'string',
            dataIndex: 'keyWord'
        }, {
            type: 'numeric',
            dataIndex: 'subAirer'
        }, {
            type: 'string',
            dataIndex: 'firstAuthorName'
        }, {
            type: 'string',
            dataIndex: 'linkManName'
        }, {
            type: 'list',
            dataIndex: 'indexed',
            options: Srims.papers.PaperIndexedTypeFilterItems,
            phpMode: true
        }]
    });
}
Ext.extend(Srims.papers.PaperGridPanel_GridFilters, Ext.grid.GridFilters);
