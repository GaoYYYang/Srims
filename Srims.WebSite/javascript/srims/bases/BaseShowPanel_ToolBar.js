
if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseShowPanel_ToolBar = function(panel, base){
    //fields
    this._panel = panel;
    
    //controls
    
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        base: base,
        handler: function(){
        
            Srims.bases.editBase(this.base);
        },
        hidden: true,
        tooltip: '<b>编辑基地</b><br/>编辑选中基地的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        base: base,
        handler: function(){
        
            Ext.MessageBox.confirm('删除基地', '你确定要删除这个基地吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.bases.deleteBase(this.base);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除基地</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        panel: panel,
        handler: function(){
            this.panel.reset(base);
        },
        tooltip: '<b>刷新列表</b><br/>更新基地列表'
    });
    
    //根据用户权限显示查询按钮
    Srims.bases.BaseShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    //event methods
    this._resetButtonVisibleAndDisabled = function(currentBase){
        //根据权限显示按钮        
        this._buttonEdit.setVisible(currentBase.get('hasPermission_Edit'));
        this._buttonEdit.setDisabled(!currentBase.get('canEdit'));
        
        this._buttonDelete.setVisible(currentBase.get('hasPermission_Delete'));
        this._buttonDelete.setDisabled(!currentBase.get('canDelete'));
    }
    this._resetButtonBase = function(currentBase){
        this._buttonEdit.base = currentBase;
        this._buttonDelete.base = currentBase;
    }
    this._resetButtonVisibleAndDisabled(base);
}
Ext.extend(Srims.bases.BaseShowPanel_ToolBar, Ext.Toolbar);










