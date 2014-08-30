
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectLevel');

Srims.projects.ProjectLevel.Perside = 'Perside';
Srims.projects.ProjectLevel.Join = 'Join';
Srims.projects.ProjectLevel.Addition = 'Addition';
Srims.projects.ProjectLevel.Coordinate='Coordinate';

Srims.projects.projectLevelRender = function(value, metadata){
    switch (value) {
        case 'Join':
            return '参与';
        case 'Perside':
            return '主持';
        case 'Addition':
            return '附加';
        case 'Coordinate':
        	return '配套';
        default:
            return '未知';
    }
}
Srims.projects.projectLevelStore = [['Perside', '主持'], ['Join', '参与'], ['Addition', '附加'],['Coordinate','配套']];
