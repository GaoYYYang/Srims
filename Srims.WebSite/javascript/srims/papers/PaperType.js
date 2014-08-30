
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.PaperType');

Srims.papers.PaperType.Article = 'Article';
Srims.papers.PaperType.Correction = 'Correction';
Srims.papers.PaperType.Editiorial_Material = 'Editiorial_Material';
Srims.papers.PaperType.Letter = 'Letter';
Srims.papers.PaperType.Meeting_Abstract = 'Meeting_Abstract';
Srims.papers.PaperType.Note = 'Note';
Srims.papers.PaperType.Riview = 'Riview';
Srims.papers.PaperType.ProceedingsPaper = 'ProceedingsPaper';

Srims.papers.PaperTypeRender = function(value, metadata){
    switch (value) {
        case 'Article':
            return 'Article(文章)';
        case 'Correction':
            return 'Correction(更正)';
        case 'Editiorial_Material':
            return 'Editiorial_Material(编者按，社论)';
        case 'Letter':
            return 'Letter(简讯)';
        case 'Meeting_Abstract':
            return 'Meeting_Abstract(会议摘要)';
        case 'Note':
            return 'Note(纪要)';
        case 'Riview':
            return 'Riview(评论)';
        case 'ProceedingsPaper':
            return 'ProceedingsPaper';
        default:
            return '未知';
    }
}

Srims.papers.paperTypeFilterItems = [{
    id: 'Article',
    text: 'Article(文章)'
}, {
    id: 'Correction',
    text: 'Correction(更正)'
}, {
    id: 'Editiorial_Material',
    text: 'Editiorial_Material(编者按，社论)'
}, {
    id: 'Letter',
    text: 'Letter(简讯)'
}, {
    id: 'Meeting_Abstract',
    text: 'Meeting_Abstract(会议摘要)'
}, {
    id: 'Note',
    text: 'Note(纪要)'
}, {
    id: 'Riview',
    text: 'Riview(评论)'
}, {
    id: 'ProceedingsPaper',
    text: 'ProceedingsPaper'
}];

Srims.papers.paperTypeStore = [['Article', 'Article(文章)'], ['Correction', 'Correction(更正)'], ['Editiorial_Material', 'Editiorial_Material(编者按，社论)'], ['Letter', 'Letter(简讯)'], ['Meeting_Abstract', 'Meeting_Abstract(会议摘要)'], ['Note', 'Note(纪要)'], ['Riview', 'Riview(评论)'], ['ProceedingsPaper', 'ProceedingsPaper'], ['Unknown', '未知']];
