
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.ActiveUsersGridPanel_ToolBar = function(store, selection, panelId){
    //fields
    this._panelId = panelId;
    this._store = store;
    this._selection = selection;
    this._permission = selection.getSelected();
    
    //controlls
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '注销',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('注销用户', '你确定要注销这个用户吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.userID = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.users.UserService + '/LogoutUser',
                        scope: this,
                        params: _params,
                        success: function(){
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel) 
                                panel.getUserStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除用户</b><br/>删除所选用户'
    })
    Srims.users.ActiveUsersGridPanel_ToolBar.superclass.constructor.call(this, {
        height: 25,
        items: [this._buttonDelete]
    });
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    //event methods
    this._onSelection_selectionChange = function(selection){
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }
        
        buttonDelete.show();
    };
    
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.users.ActiveUsersGridPanel_ToolBar, Ext.Toolbar);

