
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Ext.namespace('Srims.patents.PatentLevel');

Srims.patents.PatentLevel.Unknown = 'Unknown';
Srims.patents.PatentLevel.TheFirstResponsibleUnion = 'TheFirstResponsibleUnion';
Srims.patents.PatentLevel.Join = 'Join';

Srims.patents.PatentLevelRender = function(value, metadata) {
    switch (value) {
        case 'TheFirstResponsibleUnion':
            return '第一责任单位';
        case 'Join':
            return '参加';
        default:
            return '未识别';
    }
}


Srims.patents.PatentLevelStore = [['TheFirstResponsibleUnion', '第一责任单位'], ['Join', '参加'], ['Unknown', '未识别']];





