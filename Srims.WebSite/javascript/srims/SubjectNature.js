Ext.namespace('Srims.SubjectNature');

Srims.SubjectNature.Science = 'Science';
Srims.SubjectNature.Liberal = 'Liberal';


Srims.subjectNatureRender = function(value, metadata){
    switch (value) {
        case 'Science':
            return '理工科';
        case 'Liberal':
            return '文科';
        default:
            return '未知';
    }
}
Srims.subjectNatureStore = [['Science', '理工科'], ['Liberal', '文科']];
