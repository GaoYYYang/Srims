
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.Language');

Srims.papers.Language.others = 'others';
Srims.papers.Language.Chinese = 'Chinese';
Srims.papers.Language.English = 'English';
Srims.papers.Language.GerMan = 'GerMan';
Srims.papers.Language.Japanese = 'Japanese';
Srims.papers.Language.Rumanian = 'Rumanian';
Srims.papers.Language.Spanish = 'Spanish';

Srims.papers.LanguageRender = function(value, metadata){
    switch (value) {
        case 'others':
            return '其他';
        case 'Chinese':
            return '中文';
        case 'English':
            return '英语';
        case 'GerMan':
            return '德语';
        case 'Japanese':
            return '日语';
        case 'Rumanian':
            return '俄语';
        case 'Spanish':
            return '西班牙语';
        default:
            return '未知';
    }
}

Srims.papers.languageFilterItems = [{
    id: 'others',
    text: '其他'
}, {
    id: 'Chinese',
    text: '中文'
}, {
    id: 'English',
    text: '英语'
}, {
    id: 'GerMan',
    text: '德语'
}, {
    id: 'Japanese',
    text: '日语'
}, {
    id: 'Rumanian',
    text: '俄语'
}, {
    id: 'Spanish',
    text: '西班牙语'
}];

Srims.papers.languageStore = [['others', '其他'], ['Chinese', '中文'], ['English', '英语'], ['GerMan', '德语'], ['Japanese', '日语'], ['Rumanian', '俄语'], ['Spanish', '西班牙语']];
