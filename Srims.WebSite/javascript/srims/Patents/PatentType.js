
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Ext.namespace('Srims.patents.PatentType');

Srims.patents.PatentType.Unknown = 'Unknown';
Srims.patents.PatentType.Invention = 'Invention';
Srims.patents.PatentType.Application = 'Application';
Srims.patents.PatentType.Design = 'Design';

Srims.patents.PatentTypeRender = function(value, metadata) {
    switch (value) {
        case 'Invention':
            return '发明专利';
        case 'Application':
            return '实用新型';
        case 'Design':
            return '外观设计';
        default:
            return '未知类型';
    }
}


Srims.patents.PatentTypeStore = [['Invention', '发明专利'], ['Application', '实用新型'], ['Design', '外观设计'], ['Unknown', '未知类型']];




