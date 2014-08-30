
if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyGridPanel_ColumnModel = function(){
    Srims.patents.PatentAgencyGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        sortable: false,
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'agencyName',
        sortable: true,
        width: 100
    }, {
        header: "联系方式",
        dataIndex: 'contract',
        sortable: true,
        width: 60
    }]);
}

Ext.extend(Srims.patents.PatentAgencyGridPanel_ColumnModel, Ext.grid.ColumnModel);
