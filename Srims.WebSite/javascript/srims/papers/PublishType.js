
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace("Srims.papers.PublishType");

Srims.papers.PublishType.B = 'B';
Srims.papers.PublishType.J = 'J';
Srims.papers.PublishType.S = 'S';
Srims.papers.PublishType.C = 'C';

Srims.papers.PublishTypeRender = function(value, metadata){
    switch (value) {
        case 'B':
            return 'B';
        case 'J':
            return 'J';
        case 'S':
            return 'S';
        case 'C':
            return 'C';
        default:
            return '未知';
    }
}

Srims.papers.publishTypeStore = [['B', 'B'], ['J', 'J'], ['S', 'S'], ['C', 'C'], ['UnKnown', '未知']];
