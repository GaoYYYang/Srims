
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationShowPanel = function(panelId, stampApplication, store, stampState){

    this._id = panelId;
    this._stampApplication = stampApplication;
    this._store = store;
    this._stampState = stampState;
    
    this._basicForm = new Srims.stamp.StampApplicationShowPanel_BasicForm(stampApplication);
    this._stateHistoryForm = new Srims.stamp.StampApplicationShowPanel_StateHistoryForm(stampApplication);
    this._stuffForm = new Srims.stamp.StampApplicationShowPanel_StuffForm(stampApplication);
    this._toolBar = new Srims.stamp.StampApplicationShowPanel_ToolBar(stampApplication, this._store, this._id, stampState);
    
    Srims.stamp.StampApplicationShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '文印' + this._stampApplication.get('id'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: [this._basicForm, this._stuffForm, this._stateHistoryForm]
    });
    
    this.resetValues = function(stampApplication){
        this._basicForm.resetValues(stampApplication);
    }
}
Ext.extend(Srims.stamp.StampApplicationShowPanel, Ext.Panel, {});
