
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageGridPanel_ToolBar = function(panelId, selection, store, isUnRead){
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-message-send',
        text: '发送',
        minWidth: 60,
        panelId: this._panelId,
        handler: function(){
            Srims.users.MessageAction.sendMessage(this.panelId);
        },
        hidden: isUnRead,
        tooltip: '<b>发送短消息</b><br/>输入新的短消息内容'
    });
    this._buttonMarkAllAsRead = new Ext.Toolbar.Button({
        iconCls: 'icon-message-markallasread',
        text: '全部标记为已读',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            Ext.Ajax.request({
                url: Srims.service.users.MessageService + '/MarkAllAsRead',
                scope: this,
                success: function(){
                    panel = Ext.getCmp(panelId);
                    if (panel) 
                        panel.getMessageStore().load();
                    Srims.Poll.startPollAction(Srims.Poll.getPollAction_UnreadMessagesCount);
                }
            });
        },
        tooltip: '<b>全部标记为已读</b><br/>将所有短消息全部标记为已读'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.users.MessageAction.showMessage(this.selection.getSelected(), this.panelId);
        },
        hidden: true,
        tooltip: '<b>查看短消息</b><br/>显示所选短消息的详细信息'
    });
    this._buttonMarkAsRead = new Ext.Toolbar.Button({
        iconCls: 'icon-message-markasread',
        text: '标记为已读',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.Ajax.request({
                url: Srims.service.users.MessageService + '/MarkAsRead',
                scope: this,
                params: this.selection.getSelected(),
                success: function(){
                    panel = Ext.getCmp(panelId);
                    if (panel) 
                        panel.getMessageStore().load();
                    Srims.Poll.startPollAction(Srims.Poll.getPollAction_UnreadMessagesCount);
                }
            });
        },
        hidden: true,
        tooltip: '<b>标记为已读</b><br/>将所选短消息标记为已读'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('删除短消息', '你确定要删除该短消息吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.messageID = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.users.MessageService + '/Delete',
                        scope: this,
                        params: _params,
                        success: function(){
                            panel = Ext.getCmp(panelId);
                            if (panel) 
                                panel.getMessageStore().load();
                        }
                    });
                }
            }, this)
        },
        hidden: true,
        tooltip: '<b>删除短消息</b><br/>将所选短消息删除'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新短消息列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    Srims.users.MessageGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonShow, this._buttonMarkAllAsRead, this._buttonMarkAsRead, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    })
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonMarkAsRead = this._buttonMarkAsRead;
    this._selection.buttonMarkAllAsRead = this._buttonMarkAllAsRead;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonMarkAsRead = selection.buttonMarkAsRead;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonMarkAsRead.setVisible(false);
            buttonDelete.hide();
            return;
        }
        var message = selection.getSelected();
        buttonShow.setVisible(message.get('hasPermission_ShowMessage'));
        buttonShow.setDisabled(!message.get('canShowMessage'));
        
        buttonMarkAsRead.setVisible(message.get('hasPermission_EditMessage'));
        buttonMarkAsRead.setDisabled(!message.get('canEditMessage'))
        
        buttonDelete.setVisible(message.get('hasPermission_DeleteMessage') && !isUnRead);
        buttonDelete.setDisabled(!message.get('canDeleteMessage'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.users.MessageGridPanel_ToolBar, Ext.Toolbar);

