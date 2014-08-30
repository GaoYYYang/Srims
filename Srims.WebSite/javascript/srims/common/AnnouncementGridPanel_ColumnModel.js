
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementGridPanel_ColumnModel = function(){
    Srims.common.AnnouncementGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "标题",
        dataIndex: 'title',
        sortable: false,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "作者",
        dataIndex: 'userName',
        sortable: true,
        hidden: false
    }, {
        header: "更新时间",
        dataIndex: 'dateTime',
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "內容",
        dataIndex: 'content',
        sortable: false,
        hidden: false
    }, {
        header: "状态",
        dataIndex: 'state',
        sortable: true,
        hidden: false,
        renderer: Srims.common.AnnouncementState.render
    }]);
    this.defaultSortable = false;
}
Ext.extend(Srims.common.AnnouncementGridPanel_ColumnModel, Ext.grid.ColumnModel);