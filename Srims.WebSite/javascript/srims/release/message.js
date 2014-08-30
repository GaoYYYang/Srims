
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.Message = new Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'receiver',
    type: 'string',
    mapping: 'Receiver'
}, {
    name: 'receiverID',
    type: 'int',
    mapping: 'ReceiverID'
}, {
    name: 'sender',
    type: 'string',
    mapping: 'Sender'
}, {
    name: 'senderID',
    type: 'int',
    mapping: 'SenderID'
}, {
    name: 'title',
    type: 'string',
    mapping: 'Title'
}, {
    name: 'content',
    type: 'string',
    mapping: 'Content'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'isRead',
    type: 'boolean',
    mapping: 'IsRead',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowMessage',
    type: 'boolean',
    mapping: 'HasPermission_ShowMessage',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditMessage',
    type: 'boolean',
    mapping: 'HasPermission_EditMessage',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DeleteMessage',
    type: 'boolean',
    mapping: 'HasPermission_DeleteMessage',
    convert: Boolean.toBoolean
}, {
    name: 'canShowMessage',
    type: 'boolean',
    mapping: 'CanShowMessage',
    convert: Boolean.toBoolean
}, {
    name: 'canEditMessage',
    type: 'boolean',
    mapping: 'CanEditMessage',
    convert: Boolean.toBoolean
}, {
    name: 'canDeleteMessage',
    type: 'boolean',
    mapping: 'CanDeleteMessage',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.users.Message);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.users.MessageXmlReader.superclass.constructor.call(this, Srims.users.Message);
    }
});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.users.MessageStore.superclass.constructor.call(this, new Srims.users.MessageXmlReader(), load_url, params);
    }
});
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageGridPanel = function(id, messageStore, title, iconCls, isUnRead){
    //fields
    
    this._messageStore = messageStore;
    this._messageStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.users.MessageGridPanel_ColumnModel();
    this._toolbar = new Srims.users.MessageGridPanel_ToolBar(id, this._selections, this._messageStore, isUnRead);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: isUnRead ? '没有未读短消息' : '没有满足条件的短消息'
    });
    
    //public methods
    this.getMessageStore = function(){
        return this._messageStore;
    };
    //constructor
    Srims.users.MessageGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._messageStore,
        sm: this._selections,
        enableColumnHide: true,
        height: 200,
        enableColumnMove: true,
        border: false,
        title: isUnRead ? '' : title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: isUnRead ? undefined : new Ext.PagingToolbar({
            pageSize: 40,
            store: this._messageStore,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var message = grid.getStore().getAt(rowIndex);
        Srims.users.MessageAction.showMessage(message, id);
    };
    }
Ext.extend(Srims.users.MessageGridPanel, Ext.grid.GridPanel);

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


if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageEditWindow = function(id, message, gridPnaelId){

    this._message = message;
    this._title = '发送短消息';
    
    this._formPanelBasic = new Srims.users.MessageEditWindow_BasicForm(message);
    this._formPanelContent = new Srims.users.MessageEditWindow_ContentForm(message);
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '发送',
        formPanelBasic: this._formPanelBasic,
        window: this
    });
    
    Srims.users.MessageEditWindow.superclass.constructor.call(this, {
        id: id,
        style: 'padding:5px',
        width: 600,
        autoHeight: true,
        closeAction: 'close',
        buttonAlign: 'center',
        title: this._title,
        iconCls: 'icon-message-send',
        resizable: false,
        items: [this._formPanelBasic, this._formPanelContent],
        buttons: [this._buttonSave]
    });
    //method
    this.assignValues = function(){
        this._formPanelBasic.assignValues();
        this._formPanelContent.assignValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._formPanelBasic.isValid(preventMark) && result;
        
        return result;
    }
    this.save = function(){
        var message = this._message;
        message.beginEdit();
        this.assignValues();
        message.commit();
        
        Ext.Ajax.request({
            url: Srims.service.users.MessageService + '/Sender',
            params: message.data,
            scope: this,
            success: function(){
                var panel = Ext.getCmp(gridPnaelId);
                if (panel) 
                    panel.getMessageStore().load();
                
                this.close();
                Srims.Poll.startPollAction(Srims.Poll.getPollAction_UnreadMessagesCount);
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/IsUserNameExist',
            params: {
                name: this.formPanelBasic._comboBoxReceiver.getText()
            },
            success: function(response){
                if (Boolean.toBoolean(response.responseText)) {
                    button.setText('正在保存');
                    button.disable();
                    
                    window.save();
                }
                else {
                    Ext.Msg.show({
                        title: '用户名错误',
                        msg: '该用户名不存在，请重新输入！',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
            }
        })
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.MessageEditWindow, Ext.Window);


if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageEditWindow_BasicForm = function(message){
    this.message = message;
    
    this._comboBoxReceiver = new Srims.component.UserSearch.SearchComboBox({
        fieldLabel: '收信人',
        value: message.get('receiver'),
        selectEntityId: message.get('receiverID'),
        allowBlank: false,
        width: 160
    })
    this._textFieldTitle = new Ext.form.TextField({
        fieldLabel: '标题',
        value: message.get('title'),
        allowBlank: false,
        width: 465
    });
    Srims.users.MessageEditWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._comboBoxReceiver, this._textFieldTitle]
    });
    //method
    this.assignValues = function(){
        this.message.set('receiver', this._comboBoxReceiver.getText());
        this.message.set('receiverID', this._comboBoxReceiver.getValue());
        this.message.set('title', this._textFieldTitle.getValue());
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldTitle.isValid(preventMark) && result;
        result = this._comboBoxReceiver.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.users.MessageEditWindow_BasicForm, Ext.form.FormPanel);


if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageEditWindow_ContentForm = function(message){
    this.message = message;
    
    this._htmlEditor = new Ext.form.HtmlEditor({
        fieldLabel: '内容',
        hideLabel: true,
        value: message.get('content'),
        height: 200,
        width: 550
    })
    Srims.users.MessageEditWindow_ContentForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '内容',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._htmlEditor]
    });
    
    //method
    this.assignValues = function(){
        message.set('content', this._htmlEditor.getValue());
    }
}
Ext.extend(Srims.users.MessageEditWindow_ContentForm, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageShowWindow = function(id, message, gridPanelId){
    //field
    this._message = message;
    this._id = id;
    this._title = message.get('title');
    
    //controls
    this._formPanelBasic = new Srims.users.MessageShowWindow_BasicForm(message);
    this._formPanelContent = new Srims.users.MessageShowWindow_ContentForm(message);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    })
    
    //constructor
    Srims.users.MessageShowWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px 5px 0 5px',
        width: 600,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        buttonAlign: 'center',
        title: this._message.get('title'),
        resizable: false,
        iconCls: 'icon-message-show',
        items: [this._formPanelBasic, this._formPanelContent],
        buttons: [this._buttonClose]
    });
    //event
    this.on('close', onClose);
    //event method
    function onClose(){
        Ext.Ajax.request({
            url: Srims.service.users.MessageService + '/MarkAsRead',
            scope: this,
            params: this._message,
            success: function(){
                var panel = Ext.getCmp(gridPanelId);
                if (panel) 
                    panel.getMessageStore().load();
                Srims.Poll.startPollAction(Srims.Poll.getPollAction_UnreadMessagesCount);
            }
        });
    }
}
Ext.extend(Srims.users.MessageShowWindow, Ext.Window);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageShowWindow_BasicForm = function(message){
    this._message = message;
    
    this._textFieldTitle = new Ext.form.TextField({
        fieldLabel: '标题',
        value: message.get('title'),
        readOnly: true,
        width: 465
    })
    this._textFieldSender = new Ext.form.TextField({
        fieldLabel: '发信人',
        value: message.get('sender'),
        readOnly: true,
        width: 120
    })
    this._textFieldData = new Ext.form.TextField({
        fieldLabel: '日期',
        value: Date.render(message.get('dateTime')),
        readOnly: true,
        width: 120
    })
    this._textFieldIsRead = new Ext.form.TextField({
        fieldLabel: '是否已读',
        value: Boolean.render(message.get('isRead')),
        readOnly: true,
        width: 120
    })
    Srims.users.MessageShowWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldTitle, this._textFieldSender, this._textFieldData, this._textFieldIsRead]
    });
}
Ext.extend(Srims.users.MessageShowWindow_BasicForm, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageShowWindow_ContentForm = function(message){
    this._message = message;
    
    this._labelContent = new Ext.form.Label({
        scroll: true,
        html: message.get('content'),
        width: 550
    })
    Srims.users.MessageShowWindow_ContentForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '内容',
        height: 200,
        autoScroll: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._labelContent]
    });
}
Ext.extend(Srims.users.MessageShowWindow_ContentForm, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.MessageAction = function(){
}
Srims.users.MessageAction.listMyMessages = function(){
    Srims.users.MessageAction.listMessage('MyMessageGridPanel', '我的短消息', 'icon-message-list', false);
}
Srims.users.MessageAction.listMyUnReadMessages = function(){
    Srims.users.MessageAction.listMessage('MyUnReadMessageGridPanel', '未读短消息', '', true);
}
Srims.users.MessageAction.listMessage = function(panelId, title, concls, isUnRead){
    var messageStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        var loadUrl = isUnRead ? Srims.service.users.MessageService + '/GetUnReadMessages' : Srims.service.users.MessageService + '/GetMessages';
        messageStore = new Srims.users.MessageStore(loadUrl);
        panel = new Srims.users.MessageGridPanel(panelId, messageStore, title, concls, isUnRead);
        if (!isUnRead) 
            Srims.WorkSpace.addPanel(panel);
        else 
            panel.render('divUnReadMesseages');
        
        messageStore.load();
    }
}
Srims.users.MessageAction.sendMessage = function(gridPanelId){
    var id = 'NewMessageWindow';
    var window = Ext.getCmp(id);
    
    if (!window) {
        var message = new Srims.users.Message({});
        window = new Srims.users.MessageEditWindow(id, message, gridPanelId);
    }
    
    window.show();
}
Srims.users.MessageAction.showMessage = function(message, gridPanelId){
    var id = 'ShowMessageWindow' + message.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        window = new Srims.users.MessageShowWindow(id, message, gridPanelId);
    }
    
    window.show();
}
