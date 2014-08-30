
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.Announcement = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'title',
    type: 'string',
    mapping: 'Title'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'userName',
    type: 'string',
    mapping: 'UserName'
}, {
    name: 'content',
    type: 'string',
    mapping: 'Content'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.common.Announcement);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.AnnouncementXmlReader.superclass.constructor.call(this, Srims.common.Announcement);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.AnnouncementStore.superclass.constructor.call(this, new Srims.common.AnnouncementXmlReader(), load_url, params);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementState = function(){
};

Srims.common.AnnouncementState.unknown = 'Unknown';
Srims.common.AnnouncementState.Normal = 'Normal';
Srims.common.AnnouncementState.Top = 'Top';
Srims.common.AnnouncementState.Overdue = 'Overdue';

Srims.common.AnnouncementState.render = function(value, metadata){
    switch (value) {
        case 'Unknown':
            return '未知';
        case 'Normal':
            return '正常';
        case 'Top':
            return '置顶';
        case 'Overdue':
            return '过期';
        default:
            return '未知';
    }
}
Srims.common.AnnouncementState.filterItems = [{
    id: 'Unknown',
    text: '未知'
}, {
    id: 'Normal',
    text: '正常'
}, {
    id: 'Top',
    text: '置顶'
}, {
    id: 'Overdue',
    text: '过期'
}];

Srims.common.AnnouncementState.store = [['Unknown', '未知'], ['Normal', '正常'], ['Top', '置顶'], ['Overdue', '过期']];
Srims.common.AnnouncementState.editStore = [['Normal', '正常'], ['Top', '置顶'], ['Overdue', '过期']];

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
Ext.extend(Srims.common.AnnouncementGridPanel_ColumnModel, Ext.grid.ColumnModel);/**
 * @author dulintao
 */
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementGridPanel_GridFilters = function(){
    Srims.common.AnnouncementGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'userName'
        }, {
            type: 'date',
            dataIndex: 'dateTime'
        }, {
            type: 'list',
            dataIndex: 'state',
            options: Srims.common.AnnouncementState.filterItems,
            phpMode: true
        }]
    });
}
Ext.extend(Srims.common.AnnouncementGridPanel_GridFilters, Ext.grid.GridFilters);
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;

    var user = Srims.currentLoginLog.user;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '发布',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.common.AnnouncementAction.newAnnouncement();
        },
        hidden: !user.hasPermission_ManageAnnouncement,
        tooltip: '<b>新建通知</b><br/>输入通知信息以新建通知'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.AnnouncementAction.showAnnouncement(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看通知</b><br/>显示所选通知的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.AnnouncementAction.editAnnouncement(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑通知</b><br/>编辑所选通知'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除通知', '你确定要删除这个通知吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.id = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.common.AnnouncementService + '/Delete',
                        scope: this,
                        params: _params,
                        success: function() {
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel)
                                panel.getAnnouncementStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除通知</b><br/>删除所选通知'
    });
    this._buttonSetTop = new Ext.Toolbar.Button({
        iconCls: 'icon-announcement-settop',
        text: '置顶',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.Ajax.request({
                url: Srims.service.common.AnnouncementService + '/SetTop',
                scope: this,
                params: this.selection.getSelected(),
                success: function() {
                    panel = Srims.WorkSpace.active(panelId);
                    if (panel)
                        panel.getAnnouncementStore().load();
                }
            });
        },
        hidden: true,
        tooltip: '<b>置顶</b><br/>置顶所选通知'
    });
    this._buttonCancelTop = new Ext.Toolbar.Button({
        iconCls: 'icon-announcement-canceltop',
        text: '取消置顶',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.Ajax.request({
                url: Srims.service.common.AnnouncementService + '/CancelTop',
                scope: this,
                params: this.selection.getSelected(),
                success: function() {
                    panel = Srims.WorkSpace.active(panelId);
                    if (panel)
                        panel.getAnnouncementStore().load();
                }
            });
        },
        hidden: true,
        tooltip: '<b>取消置顶</b><br/>取消置顶所选通知'
    });
    this._buttonSetOverdue = new Ext.Toolbar.Button({
        iconCls: 'icon-announcement-setoverdue',
        text: '过期',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.Ajax.request({
                url: Srims.service.common.AnnouncementService + '/SetOverdue',
                scope: this,
                params: this.selection.getSelected(),
                success: function() {
                    panel = Srims.WorkSpace.active(panelId);
                    if (panel)
                        panel.getAnnouncementStore().load();
                }
            });
        },
        hidden: true,
        tooltip: '<b>过期</b><br/>设置所选通知为过期'
    });
    this._buttonCancelOverdue = new Ext.Toolbar.Button({
        iconCls: 'icon-announcement-canceloverdue',
        text: '取消过期',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Ext.Ajax.request({
                url: Srims.service.common.AnnouncementService + '/CancelOverdue',
                scope: this,
                params: this.selection.getSelected(),
                success: function() {
                    panel = Srims.WorkSpace.active(panelId);
                    if (panel)
                        panel.getAnnouncementStore().load();
                }
            });
        },
        hidden: true,
        tooltip: '<b>取消过期</b><br/>取消所选通知过期'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新通知列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    Srims.common.AnnouncementGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonDelete, this._buttonSetTop, this._buttonCancelTop, this._buttonSetOverdue, this._buttonCancelOverdue, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });

    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonSetTop = this._buttonSetTop;
    this._selection.buttonCancelTop = this._buttonCancelTop;
    this._selection.buttonSetOverdue = this._buttonSetOverdue;
    this._selection.buttonCancelOverdue = this._buttonCancelOverdue;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonSetTop = selection.buttonSetTop;
        var buttonCancelTop = selection.buttonCancelTop;
        var buttonSetOverdue = selection.buttonSetOverdue;
        var buttonCancelOverdue = selection.buttonCancelOverdue;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonSetTop.setVisible(false);
            buttonCancelTop.setVisible(false);
            buttonSetOverdue.setVisible(false);
            buttonCancelOverdue.setVisible(false);
            return;
        }

        var announcement = selection.getSelected();
        buttonShow.show();
        buttonEdit.setVisible(announcement.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!announcement.get('canEdit'));
        buttonDelete.setVisible(announcement.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!announcement.get('canDelete'));
        buttonSetTop.setVisible(announcement.get('hasPermission_Edit') && announcement.get('state') != 'Top');
        buttonCancelTop.setVisible(announcement.get('hasPermission_Edit') && announcement.get('state') == 'Top');
        buttonSetOverdue.setVisible(announcement.get('hasPermission_Edit') && announcement.get('state') != 'Overdue');
        buttonCancelOverdue.setVisible(announcement.get('hasPermission_Edit') && announcement.get('state') == 'Overdue');
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.common.AnnouncementGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.AnnouncementGridPanel = function(id, announcementStore, title, iconCls){

    //fields
    this._announcementStore = announcementStore;
    this._announcementStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    
    this._columnModel = new Srims.common.AnnouncementGridPanel_ColumnModel();
    this._filters = new Srims.common.AnnouncementGridPanel_GridFilters();
    this._toolbar = new Srims.common.AnnouncementGridPanel_ToolBar(this._selections, this._announcementStore, id);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的通知'
    });
    
    //public methods
    this.getAnnouncementStore = function(){
        return this._announcementStore;
    }
    
    //constructor
    Srims.common.AnnouncementGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._announcementStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._announcementStore,
            plugins: this._filters,
            displayInfo: false,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._announcementStore.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var announcement = grid.getStore().getAt(rowIndex);
        Srims.common.AnnouncementAction.editAnnouncement(announcement);
    }
}
Ext.extend(Srims.common.AnnouncementGridPanel, Ext.grid.GridPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementEditWindow = function(id, announcement){

    this._announcement = announcement;
    this._title = announcement.isNew() ? '新建通知' : announcement.get('title');

    this._formPanelBasic = new Srims.common.AnnouncementEditWindow_BasicForm(announcement);
    this._formPanelContent = new Srims.common.AnnouncementEditWindow_ContentForm(announcement);
            					
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        window: this
    });

    Srims.common.AnnouncementEditWindow.superclass.constructor.call(this, {
        id: id,
        style: 'padding:5px',
        width: 600,
        height: 500,
        closeAction: 'close',
        buttonAlign: 'center',
        title: this._title,
        iconCls: announcement.isNew() ? 'icon-announcement-new' : 'icon-announcement-edit',
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
        result = this._formPanelContent.isValid(preventMark) && result;
        
        return result;
    }
    this.save = function(){
        var announcement = this._announcement;
        announcement.beginEdit();
        this.assignValues();
        announcement.commit();
        
        Ext.Ajax.request({
            url: Srims.service.common.AnnouncementService + '/Save',
            params: announcement.data,
            scope: this,
            success: function(){
                panel = Srims.WorkSpace.active('AnnouncementGridPanel');
                if (panel) 
                    panel.getAnnouncementStore().load();
                else {
                    announcementStore = new Srims.common.AnnouncementStore(Srims.service.common.AnnouncementService + '/Query');
                    panel = new Srims.common.AnnouncementGridPanel('AnnouncementGridPanel', announcementStore, '通知列表', 'icon-announcement-list');
                    Srims.WorkSpace.addPanel(panel);
                }
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.AnnouncementEditWindow, Ext.Window);

if (!Srims.common) 
    Ext.namespace('Srims.common');
	
	Srims.common.AnnouncementEditWindow_BasicForm = function(announcement){
    this._announcement = announcement;

    this._textFieldTitle = new Ext.form.TextField({
        fieldLabel: '通知标题',
        value: announcement.get('title'),
        allowBlank: false,
        width: 465
    });
    this._comboBoxState = new Ext.form.ComboBox({
        fieldLabel: '通知状态',
        value: announcement.get('state'),
        store: Srims.common.AnnouncementState.editStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    
    Srims.common.AnnouncementEditWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldTitle, this._comboBoxState]
    });
    //method
    this.assignValues = function(){
        this._announcement.set('title', this._textFieldTitle.getValue());
        this._announcement.set('state', this._comboBoxState.getValue());
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldTitle.isValid(preventMark) && result;
        result = this._comboBoxState.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.common.AnnouncementEditWindow_BasicForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementEditWindow_ContentForm = function(announcement){
    this._announcement = announcement;
    
    this._textContent = new Ext.form.TextArea({
        fieldLabel: '内容',
        hideLabel: true,
        value: announcement.get('content'),
        allowBlank: false,
        height: 280,
        width: 550
    });
    Srims.common.AnnouncementEditWindow_ContentForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '内容',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textContent]
    });
    
    //method
    this.assignValues = function(){
        announcement.set('content', this._textContent.getValue());
    }
    this.isValid = function(preventMark){
        return this._textContent.isValid(preventMark);
    }
}
Ext.extend(Srims.common.AnnouncementEditWindow_ContentForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementShowWindow = function(id, announcement){
    //field
    this._announcement = announcement;
    this._id = id;
    this._title = announcement.get('title');
    
    //controls
    this._formPanelBasic = new Srims.common.AnnouncementShowWindow_BasicForm(announcement);
    this._formPanelContent = new Srims.common.AnnouncementShowWindow_ContentForm(announcement);
    
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
    Srims.common.AnnouncementShowWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px',
        width: 600,
        height: 500,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        buttonAlign: 'center',
        title: this._announcement.get('title'),
        resizable: false,
        iconCls: 'icon-announcement-show',
        items: [this._formPanelBasic, this._formPanelContent],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.common.AnnouncementShowWindow, Ext.Window);
if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementShowWindow_BasicForm = function(announcement){
    this._announcement = announcement;
    
    this._textFieldTitle = new Ext.form.TextField({
        fieldLabel: '标题',
        value: announcement.get('title'),
        readOnly: true,
        width: 465
    });
    this._textFieldUserName = new Ext.form.TextField({
        fieldLabel: '作者',
        value: announcement.get('userName'),
        readOnly: true,
        width: 120
    })
    this._textFieldData = new Ext.form.TextField({
        fieldLabel: '日期',
        value: Date.render(announcement.get('dateTime')),
        readOnly: true,
        width: 120
    })
    this._textFieldState = new Ext.form.TextField({
        fieldLabel: '状态',
        value: Srims.common.AnnouncementState.render(announcement.get('state')),
        readOnly: true,
        width: 120
    })
    
    Srims.common.AnnouncementShowWindow_BasicForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 40,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldTitle, this._textFieldUserName, this._textFieldData, this._textFieldState]
    });
}
Ext.extend(Srims.common.AnnouncementShowWindow_BasicForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementShowWindow_ContentForm = function(announcement){
    this._announcement = announcement;
    
    this._textContent = new Ext.form.TextArea({
        fieldLabel: '内容',
        hideLabel: true,
        scroll: true,
        value: announcement.get('content'),
        readOnly: true,
        height: 220,
        width: 550
    });
    Srims.common.AnnouncementShowWindow_ContentForm.superclass.constructor.call(this, {
        collapsible: false,
        title: '内容',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textContent]
    });
}
Ext.extend(Srims.common.AnnouncementShowWindow_ContentForm, Ext.form.FormPanel);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.AnnouncementAction = function() {
};
Srims.common.AnnouncementAction.listAnnouncement = function(showNewWindow) {
    var panelId = 'AnnouncementGridPanel';
    var announcementStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);

    if (panel) {
        announcementStore = panel.getAnnouncementStore();
    }
    else {
        announcementStore = new Srims.common.AnnouncementStore(Srims.service.common.AnnouncementService + '/Query');
        panel = new Srims.common.AnnouncementGridPanel(panelId, announcementStore, '通知列表', 'icon-announcement-list');
        Srims.WorkSpace.addPanel(panel);
    }

    if (showNewWindow)
        Srims.common.AnnouncementAction.newAnnouncement();
}

Srims.common.AnnouncementAction.newAnnouncement = function() {
    var id = 'NewAnnouncementWindow';
    var window = Ext.getCmp(id);

    if (!window) {
        var announcement = new Srims.common.Announcement({});
        announcement.set('state', Srims.common.AnnouncementState.Normal);
        window = new Srims.common.AnnouncementEditWindow(id, announcement);
    }

    window.show();
}

Srims.common.AnnouncementAction.editAnnouncement = function(announcement) {
    var id = 'AnnouncementEditWindow' + announcement.get('id');
    var window = Ext.getCmp(id);

    if (!window)
        window = new Srims.common.AnnouncementEditWindow(id, announcement);

    window.show();
}

Srims.common.AnnouncementAction.showAnnouncement = function(announcement) {
    var id = 'ShowAnnouncementWindow' + announcement.get('id');
    var window = Ext.getCmp(id);
    if (!window) {
        window = new Srims.common.AnnouncementShowWindow(id, announcement);
    }
    window.show();
}

