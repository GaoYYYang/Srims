
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegateGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonSetDelegate = new Ext.Toolbar.Button({
        iconCls: 'icon-set-delegate-principal',
        text: '指定项目委托负责人',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            var records = this.selection.getSelections();
            if (records.length == 0) {
                Ext.Msg.show({
                    title: '项目不能为空',
                    msg: '请选择至少一个项目',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            Srims.projects.showSetDelegatePrincipalWindow(records, this.store);
        },
        tooltip: '<b>指定项目委托负责人</b><br/>指定选中项目的委托负责人'
    });
    this._buttonClearDelegate = new Ext.Toolbar.Button({
        iconCls: 'icon-clear-delegate-principal',
        text: '取消项目委托负责人',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            var records = this.selection.getSelections();
            if (records.length == 0) {
                Ext.Msg.show({
                    title: '项目不能为空',
                    msg: '请选择至少一个项目',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            Ext.MessageBox.confirm('取消委托负责人', '你确定要取消所选择项目的委托负责人吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.projects.clearDeletatePrincipal(records, this.store);
            }, this);
            
        },
        tooltip: '<b>取消项目委托负责人</b><br/>取消选中项目的委托负责人'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    
    Srims.projects.ProjectSetDelegateGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSetDelegate, this._buttonClearDelegate, new Ext.Toolbar.Fill(), this._buttonRefresh],
        height: 25
    });
}
Ext.extend(Srims.projects.ProjectSetDelegateGridPanel_ToolBar, Ext.Toolbar);
