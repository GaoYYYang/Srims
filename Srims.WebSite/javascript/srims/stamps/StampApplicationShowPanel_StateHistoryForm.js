
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationShowPanel_StateHistoryForm = function(stampApplication){
    this._stampApplication = stampApplication;
    this._store = new Srims.stamp.StampStateHistoryStore(stampApplication.get('id'));
    
    this._columnModel = new Srims.stamp.StateStateHistoryColumnModel();
    
    this._gridPanelStampStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 550,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有文印状态历史信息'
        }
    });
    
    Srims.stamp.StampApplicationShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '文印状态历史信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelStampStateHistory]
    });
    
    this._store.load();
}

Ext.extend(Srims.stamp.StampApplicationShowPanel_StateHistoryForm, Ext.form.FormPanel, {});
