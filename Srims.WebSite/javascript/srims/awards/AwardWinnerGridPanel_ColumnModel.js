if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerGridPanel_ColumnModel = function() {
    Srims.awards.AwardWinnerGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "获奖人id",
        dataIndex: 'id',
        hidden: true
    }, {
        header: "位次",
        dataIndex: 'order',
        width: 1
    }, {
        header: "姓名",
        dataIndex: 'name',
        width: 2
    }, {
        header: "工作证号",
        dataIndex: 'number',
        width: 2
    }, {
        header: "专家ID",
        dataIndex: 'expertID',
        width: 2,
        hidden: true
}]);
    }

    Ext.extend(Srims.awards.AwardWinnerGridPanel_ColumnModel, Ext.grid.ColumnModel);
