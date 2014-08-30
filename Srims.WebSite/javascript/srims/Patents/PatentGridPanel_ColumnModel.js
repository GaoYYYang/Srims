

if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentGridPanel_ColumnModel = function(){

    Srims.patents.PatentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        //sortable: true,
        //hideable: true
        hidden: true,
        hideable: false
    }, {
        header: "专利号",
        dataIndex: 'number',
        sortable: true,
        hidden: false
    }, {
        header: "专利名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "法律状态",
        dataIndex: 'lawState',
        width: 30,
        sortable: true,
        hidden: false,
        renderer: Srims.patents.PatentLawStateRender
    }, {
        header: "专利类型",
        dataIndex: 'type',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Srims.patents.PatentTypeRender
    }, {
        header: "负责人",
        dataIndex: 'patentPrincipalName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "所属学院",
        dataIndex: 'collegeName',
        sortable: true,
        hidden: false
    }, {
        header: "授权时间",
        dataIndex: 'authorizeDateTime',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "法律状态时间",
        dataIndex: 'lawStateTime',
        width: 80,
        sortable: true,
        hidden: true,
        renderer: Date.render
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: true,
        hidden: true,
        renderer: Srims.patents.PatentLevelRender
    }, {
        header: "专利主分类号",
        dataIndex: 'mainCategoryNumber',
        sortable: true,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "专利备注",
        dataIndex: 'remark',
        sortable: false,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "申请时间",
        dataIndex: 'applicationDateTime',
        sortable: true,
        width: 80,
        hidden: true,
        renderer: Date.render
    }, {
        header: "专利分类",
        dataIndex: 'category',
        sortable: true,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "国别",
        dataIndex: 'country',
        sortable: true,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "简介",
        dataIndex: 'introduction',
        sortable: false,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "专利发明人",
        dataIndex: 'patentInventersName',
        sortable: false,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }]);
    
    
    this.defaultSortable = false;
}
Ext.extend(Srims.patents.PatentGridPanel_ColumnModel, Ext.grid.ColumnModel);



