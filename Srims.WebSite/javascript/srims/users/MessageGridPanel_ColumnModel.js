
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageGridPanel_ColumnModel_Renderer = function(value, metadata, record){

    if (record.get('isRead') == false) 
        metadata.css = "message_unread " + metadata.css;
    
    return value;
};
Srims.users.MessageGridPanel_ColumnModel = function(){
    Srims.users.MessageGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true,
        hideable: false,
        renderer: Srims.users.MessageGridPanel_ColumnModel_Renderer
    }, {
        header: '发信人',
        dataIndex: 'sender',
        hidden: false,
        renderer: Srims.users.MessageGridPanel_ColumnModel_Renderer
    }, {
        header: '标题',
        dataIndex: 'title',
        hidden: false,
        renderer: Srims.users.MessageGridPanel_ColumnModel_Renderer
    }, {
        header: '发送时间',
        dataIndex: 'dateTime',
        hidden: false,
        sortable: true,
        renderer: function(value, metadata, record){
            Srims.users.MessageGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Date.render(value);
        }
    }, {
        header: '内容',
        dataIndex: 'content',
        hidden: true
    }, {
        header: '是否已读',
        dataIndex: 'isRead',
        hidden: false,
        renderer: function(value, metadata, record){
            Srims.users.MessageGridPanel_ColumnModel_Renderer(value, metadata, record);
            return Boolean.render(value);
        }
    }]);
    this.defaultSortable = false;
};
Ext.extend(Srims.users.MessageGridPanel_ColumnModel, Ext.grid.ColumnModel);
