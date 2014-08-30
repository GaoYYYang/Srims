
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.PaperIndexedType');

Srims.papers.PaperIndexedType.SCICD = 'SCICD';
Srims.papers.PaperIndexedType.SCINetWork = 'SCINetWork';
Srims.papers.PaperIndexedType.EICore = 'EICore';
Srims.papers.PaperIndexedType.EINetWork = 'EINetWork';
Srims.papers.PaperIndexedType.ISTP = 'ISTP';
Srims.papers.PaperIndexedType.ISTP = 'SSCI';
Srims.papers.PaperIndexedType.ISTP = 'ISTP_S';

Srims.papers.PaperIndexedType = function(value, metadata){
    switch (value) {
        case 'SCICD':
            return 'SCI光盘';
        case 'SCINetWork':
            return 'SCI网络';
        case 'EICore':
            return 'EI核心';
        case 'EINetWork':
            return 'EI网络';
        case 'SSCI':
            return 'SSCI';
        case 'ISTP':
            return 'ISTP';
        case 'ISTP_S':
            return 'ISTP_S';
        default:
            return '未知';
    }
}
Srims.papers.PaperIndexedTypeFilterItems = [{
    id: 'SCICD',
    text: 'SCI光盘'
}, {
    id: 'SCINetWork',
    text: 'SCI网络'
}, {
    id: 'EICore',
    text: 'EI核心'
}, {
    id: 'EINetWork',
    text: 'EI网络'
}, {
    id: 'ISTP',
    text: 'ISTP'
}, {
    id: 'SSCI',
    text: 'SSCI'
}, {
    id: 'ISTP_S',
    text: 'ISTP_S'
}];
Srims.papers.paperIndexedTypeStore = [['SCICD', 'SCI光盘'], ['SCINetWork', 'SCI网络'], ['EICore', 'EI核心'], ['EINetWork', 'EI网络'], ['ISTP', 'ISTP'],['SSCI', 'SSCI'],['ISTP_S', 'ISTP_S']];


