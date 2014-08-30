
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.projectRankVerticalFilterItems = [{
    id: '国家级',
    text: '国家级'
}, {
    id: '省部级',
    text: '省部级'
}, {
    id: '校级',
    text: '校级'
}, {
    id: '市厅级',
    text: '市厅级'
},{
    id: '其它',
    text: '其它'
}];

Srims.projects.ProjectGridPanel_GridFilters = function(){
    Srims.projects.ProjectGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'number'
        }, {
            type: 'string',
            dataIndex: 'principal'
        }, {
            type: 'date',
            dataIndex: 'startDate'
        }, {
            type: 'date',
            dataIndex: 'endDate'
        }, {
            type: 'numeric',
            money: true,
            dataIndex: 'fundTotal'
        }, {
            type: 'list',
            dataIndex: 'rankName',
            options: Srims.projects.projectRankVerticalFilterItems,
            phpMode: true
        }, {
            type: 'string',
            dataIndex: 'typeName'
        }, {
            type: 'string',
            dataIndex: 'typeShortName'
        }, {
            type: 'list',
            dataIndex: 'state',
            options: Srims.projects.projectStateFilterItems,
            phpMode: true
        }]
    });
}
Ext.extend(Srims.projects.ProjectGridPanel_GridFilters, Ext.grid.GridFilters);
