
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementState = function(){
};

Srims.common.AnnouncementState.unknown = 'Unknown';
Srims.common.AnnouncementState.Normal = 'Normal';
Srims.common.AnnouncementState.Top = 'Top';
Srims.common.AnnouncementState.Overdue = 'Overdue';

Srims.common.AnnouncementState.render = function(value, metadata){
    switch (value) {
        case 'Unknown':
            return '未知';
        case 'Normal':
            return '正常';
        case 'Top':
            return '置顶';
        case 'Overdue':
            return '过期';
        default:
            return '未知';
    }
}
Srims.common.AnnouncementState.filterItems = [{
    id: 'Unknown',
    text: '未知'
}, {
    id: 'Normal',
    text: '正常'
}, {
    id: 'Top',
    text: '置顶'
}, {
    id: 'Overdue',
    text: '过期'
}];

Srims.common.AnnouncementState.store = [['Unknown', '未知'], ['Normal', '正常'], ['Top', '置顶'], ['Overdue', '过期']];
Srims.common.AnnouncementState.editStore = [['Normal', '正常'], ['Top', '置顶'], ['Overdue', '过期']];
