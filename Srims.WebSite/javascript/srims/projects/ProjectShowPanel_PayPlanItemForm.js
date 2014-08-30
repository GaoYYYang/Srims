
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.projects.projectShowPanel_PayPlanItemForm = function(project){

    this._project = project;
    this._store = new Srims.fund.PayPlanItemStore(project);
    this._columnModel = new Srims.fund.PayPlanItemGridPanel_ColumnModel();
    
    
    this._gridPanelPayPlanItem = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 300,
        autoExpand: true,
        autoExpandColumn: 'amount',
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有经费到帐计划'
        }
    });
    
    Srims.projects.projectShowPanel_PayPlanItemForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费到帐计划',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelPayPlanItem]
    });
    if (project.get('id')) 
        this._store.load();
    
    this.setProject = function(project){
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.projectShowPanel_PayPlanItemForm, Ext.FormPanel, {});

