
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.SignUnit');

Srims.papers.SignUnit.School = 'School';
Srims.papers.SignUnit.UnitOut = 'UnitOut';
Srims.papers.SignUnit.SchoolUnitOut = 'SchoolUnitOut';
Srims.papers.SignUnit.UnitOutSchool = 'UnitOutSchool';

Srims.papers.SignUnitRender = function(value, metadata){
    switch (value) {
        case 'School':
            return '中国海洋大学';
        case 'UnitOut':
            return '外单位';
        case 'SchoolUnitOut':
            return '中国海洋大学+外单位';
        case 'UnitOutSchool':
            return '外单位+中国海洋大学';
        default:
            return '未知';
    }
}
Srims.papers.signUnitFilterItems = [{
    id: 'School',
    text: '中国海洋大学'
}, {
    id: 'UnitOut',
    text: '外单位'
}, {
    id: 'SchoolUnitOut',
    text: '中国海洋大学+外单位'
}, {
    id: 'UnitOutSchool',
    text: '外单位+中国海洋大学'
}];

Srims.papers.signUnitStore = [['School', '中国海洋大学'], ['UnitOut', '外单位'], ['SchoolUnitOut', '中国海洋大学+外单位'], ['UnitOutSchool', '外单位+中国海洋大学']];
