
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel = function(sm){
    Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: 'id',
        dataIndex: 'ID',
        hidden: true
    }, {
        id: 'name',
        header: '项目名称',
        dataIndex: 'name',
        width: 300
    }, {
        header: '项目编号',
        dataIndex: 'number'
    }, {
        header: '到校经费',
        dataIndex: 'fundTotal',
        renderer: Money.render
    }, {
        header: '已到经费',
        dataIndex: 'fundReceived',
        renderer: Money.render
    }]);
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel_MyFundDescendProjectSelectGridPanel_ColumnModel, Ext.grid.ColumnModel)
