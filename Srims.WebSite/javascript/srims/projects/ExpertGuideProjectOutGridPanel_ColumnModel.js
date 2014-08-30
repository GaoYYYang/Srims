if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel = function() {
    Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "外拨单位",
        dataIndex: 'outSourcingName',
        sortable: false,
        hidden: false,
        width: 300,
        editor: new Srims.component.OutsourcingSearch.SearchComboBox({
            getValue: function() {
                return this.getText();
            },
            allowBlank: false,
            width: 300
        })
    }, {
        header: '外协分配合同额(万元)',
        dataIndex: 'amount',
         allowDecimals :true,
        sortable: false,
        width: 200,
        editor: new Srims.component.MoneyField({
            allowNegative: false,
            width: 200
        })
}]);
    }
    Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel, Ext.grid.ColumnModel);