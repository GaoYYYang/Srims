
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.PayPlanItemWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._payPlanItemGridPanel = new Srims.fund.PayPlanItemGridPanel(this._project);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.fund.PayPlanItemWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目：' + this._project.get('name') + '付款计划管理',
        iconCls: 'icon-project-pay-plan-item',
        width: 500,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._payPlanItemGridPanel],
        buttons: [this._buttonClose]
    });
    this._payPlanItemGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelPayPlanItem._store.load();
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.fund.PayPlanItemWindow, Ext.Window, {});

