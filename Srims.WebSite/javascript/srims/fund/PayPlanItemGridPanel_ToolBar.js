
if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.PayPlanItemGridPanel_ToolBar = function(selection, store, project){

    //fields
    this._selection = selection;
    this._store = store;
    this._project = project;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            Srims.projects.newProjectPayPlanItem(this.project, this.store);
        },
        hidden: true,
        tooltip: '<b>新建付款计划</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        project: this._project,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.projects.editProjectPayPlanItem(this.project, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑付款计划</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('删除付款计划', '你确定要删除这个付款计划吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projetPayPlanItemID = this.selection.getSelected().get('id');
                    
                    Ext.Ajax.request({
                        url: Srims.service.fund.PayPlanItemService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function(){
                            this.store.load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除付款计划</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费到帐计划列表'
    });
    Srims.fund.PayPlanItemGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });
    
    this._buttonNew.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
    this._buttonNew.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
    
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        buttonEdit.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
        buttonEdit.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
        
        buttonDelete.setVisible(project.get('hasPermission_EditProjectPayPlanItem'));
        buttonDelete.setDisabled(!project.get('canEdit_ProjectPayPlanItem'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
    this._store.toolBar = this;
    this._store.on('load', function(){
        var projectPayPlanItems = this.getRange();
        var projectFundTotal = this.toolBar._project.get('fundTotal');
        var projectPayPlanAmountTotal = 0;
        for (var i = 0; i < projectPayPlanItems.length; i++) 
            projectPayPlanAmountTotal += projectPayPlanItems[i].get('amount');
        
        this.toolBar._buttonNew.setDisabled(projectFundTotal <= projectPayPlanAmountTotal);
    });
}
Ext.extend(Srims.fund.PayPlanItemGridPanel_ToolBar, Ext.Toolbar);
