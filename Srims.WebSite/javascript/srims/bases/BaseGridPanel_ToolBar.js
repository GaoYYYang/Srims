
if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseGridPanel_ToolBar = function(grid, queryParams){
    //fields
    this._grid = grid;
    this._selection = grid._selections;
    this._store = grid._baseStore;
    this._queryParams = queryParams;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        handler: function(){
            Srims.bases.newBase();
        },
        hidden: true,
        tooltip: '<b>添加基地</b><br/>输入基地信息以添加基地'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.bases.showBase(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看基地</b><br/>显示所选基地的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.bases.editBase(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑基地</b><br/>编辑选中基地的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除基地', '你确定要删除这个基地吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.bases.deleteBase(this.selection.getSelected());
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除基地</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新基地列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        menuAlign: 'right',
        minWidth: 60,
        store: this._store,
        grid: this._grid,
        handler: function(){
            //清空筛选条件
            var filters = grid._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    //根据用户权限显示查询按钮
    var user = Srims.currentLoginLog.user;
    this._buttonNew.setVisible(user.hasPermission_ManageBase);
    
    Srims.bases.BaseGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        var currentBase = selection.getSelected();
        //根据权限显示按钮
        buttonShow.setVisible(currentBase.get('hasPermission_Show'));
        buttonShow.setDisabled(!currentBase.get('canShow'));
        
        buttonEdit.setVisible(currentBase.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!currentBase.get('canEdit'));
        
        buttonDelete.setVisible(currentBase.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!currentBase.get('canDelete'));
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.bases.BaseGridPanel_ToolBar, Ext.Toolbar);










