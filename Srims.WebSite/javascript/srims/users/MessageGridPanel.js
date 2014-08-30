
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
