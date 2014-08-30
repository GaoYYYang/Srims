
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundMemberGridPanel_ColumnModel = function(){
    Srims.fund.FundMemberGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true
    }, {
        header: '专家姓名',
        dataIndex: 'expertName',
        width: 100
    }, {
        header: '工作证号',
        dataIndex: 'expertNumber',
        width: 100
    }, {
        id: 'accountBookNumber',
        header: '账本号',
        dataIndex: 'accountBookNumber'
    }])
}
Ext.extend(Srims.fund.FundMemberGridPanel_ColumnModel, Ext.grid.ColumnModel);
