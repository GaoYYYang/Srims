
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.StatisticViewGridPanel_ColumnModel = function(){
    Srims.statistic.StatisticViewGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'name'
    }]);
}
Ext.extend(Srims.statistic.StatisticViewGridPanel_ColumnModel, Ext.grid.ColumnModel)
