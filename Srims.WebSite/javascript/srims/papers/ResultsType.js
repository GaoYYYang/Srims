
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.ResultsType');

Srims.papers.ResultsType.Book = 'Book';
Srims.papers.ResultsType.CSSCI = 'CSSCI';
Srims.papers.ResultsType.CSSCIExten = 'CSSCIExten';

Srims.papers.ResultsTypeRender = function(value, metadata) {
    switch (value) {
        case 'Book':
            return '著作';
        case 'CSSCI':
            return 'CSSCI';
        case 'CSSCIExten':
            return 'CSSCI扩展版';
        default:
            return '未知';
    }
}

Srims.papers.ResultsTypeFilterItems = [{
id: 'Book',
text: '著作'
}, {
id: 'CSSCI',
text: 'CSSCI'
}, {
id: 'CSSCIExten',
text: 'CSSCI扩展版'
}];

Srims.papers.ResultsType = [['Book', '著作'], ['CSSCI', 'CSSCI'], ['CSSCIExten', 'CSSCI扩展版']];

