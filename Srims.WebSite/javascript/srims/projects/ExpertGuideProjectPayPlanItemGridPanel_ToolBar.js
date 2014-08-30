
if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.ExpertGuideProjectPayPlanItemGridPanel_ToolBar = function(panel){

    //fields
    this._panel = panel;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            Srims.projects.newProjectPayPlanItem(this.panel._project, this.panel._store);
        },
        hidden: true,
        tooltip: '<b>新建付款计划</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            Srims.projects.editProjectPayPlanItem(this.panel._project, this.panel._selections.getSelected(), this.panel._store);
        },
        hidden: true,
        tooltip: '<b>编辑付款计划</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        panel: this._panel,
        handler: function(){
            if (this.panel._selections.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('删除付款计划', '你确定要删除这个付款计划吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.projetPayPlanItemID = this.panel._selections.getSelected().get('id');
                    
                    Ext.Ajax.request({
                        url: Srims.service.fund.PayPlanItemService + '/Delete',
                        params: _params,
                        scope: this,
                        success: function(){
                            this.panel._store.load();
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
        panel: this._panel,
        handler: function(){
            this.panel._store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费到帐计划列表'
    });
    Srims.projects.ExpertGuideProjectPayPlanItemGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonRefresh]
    });
    
    this.setProject = function(project){
        this._buttonNew.setVisible(this._panel._project.get('hasPermission_EditProjectPayPlanItem'));
        this._buttonNew.setDisabled(!this._panel._project.get('canEdit_ProjectPayPlanItem'));
    }
    
    
    //initial
    this._panel._selections.buttonEdit = this._buttonEdit;
    this._panel._selections.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        buttonEdit.setVisible(buttonEdit.panel._project.get('hasPermission_EditProjectPayPlanItem'));
        buttonEdit.setDisabled(!buttonEdit.panel._project.get('canEdit_ProjectPayPlanItem'));
        
        buttonDelete.setVisible(buttonDelete.panel._project.get('hasPermission_EditProjectPayPlanItem'));
        buttonDelete.setDisabled(!buttonDelete.panel._project.get('canEdit_ProjectPayPlanItem'));
    }
    //events
    this._panel._selections.on('selectionchange', this._onSelection_selectionChagne);
    this._panel._store.toolBar = this;
    this._panel._store.on('load', function(){
        var projectPayPlanItems = this.getRange();
        var projectFundTotal = this.toolBar._panel._project.get('fundTotal');
        var projectPayPlanAmountTotal = 0;
        for (var i = 0; i < projectPayPlanItems.length; i++) 
            projectPayPlanAmountTotal += projectPayPlanItems[i].get('amount');
        
        this.toolBar._buttonNew.setDisabled(projectFundTotal <= projectPayPlanAmountTotal);
    });
}
Ext.extend(Srims.projects.ExpertGuideProjectPayPlanItemGridPanel_ToolBar, Ext.Toolbar);
