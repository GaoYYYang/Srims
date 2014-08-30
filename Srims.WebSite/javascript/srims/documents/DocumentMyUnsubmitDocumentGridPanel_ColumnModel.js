
if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel = function(){
    Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '项目名称',
        dataIndex: 'projectName'
    }, {
        header: '催缴文档名称',
        dataIndex: 'name'
    }, {
        header: '催缴截止时间',
        dataIndex: 'deadline',
        width: 110,
        renderer: Date.render
    }, {
        header: '是否必须',
        dataIndex: 'isRequire',
        width: 70,
        renderer: Boolean.render
    }])
};

Ext.extend(Srims.documents.DocumentMyUnsubmitDoucmentGridPanel_ColumnModel, Ext.grid.ColumnModel)

