
if (!Srims.type) 
    Ext.namespace('Srims.type');

Ext.namespace('Srims.type.ProjectSubjectNature');

Srims.type.ProjectSubjectNature.Science = 'Science';
Srims.type.ProjectSubjectNature.Liberal = 'Liberal';


Srims.type.projectSubjectNatureRender = function(value, metadata){
    switch (value) {
        case 'Science':
            return '理工科';
        case 'Liberal':
            return '文科';
        default:
            return '未知';
    }
}
Srims.type.projectSubjectNatureStore = [['Science', '理工科'], ['Liberal', '文科'], ['Unknown', '未知']];
