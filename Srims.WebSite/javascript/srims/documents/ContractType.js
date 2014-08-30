
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Ext.namespace('Srims.documents.ContractType');

Srims.documents.ContractType.MainContract = 'MainContract';
Srims.documents.ContractType.OutContract = 'OutContract';

Srims.documents.contractTypeRender = function(value){
    switch (value) {
        case 'MainContract':
            return '主合同';
        case 'OutContract':
            return '外协合同';
        default:
            return '未知';
    }
}
Srims.documents.contractTypeFilterItems = [{
    id: 'MainContract',
    text: '主合同'
}, {
    id: 'OutContract',
    text: '外协合同'
}];

Srims.documents.contractTypeStore = [['MainContract', '主合同'], ['OutContract', '外协合同']];
Srims.documents.contractTypeEditStore = [['MainContract', '主合同'], ['OutContract', '外协合同']];
