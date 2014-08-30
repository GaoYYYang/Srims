
if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel = function(id, stampApplication, store) {

    this._id = id;
    this._stampApplication = stampApplication;
    this._store = store;
  //  this._isProject = isProject;
    var isNew = this._stampApplication.isNew();
    this._title = this._stampApplication.isNew() ? "文印申请" : "编辑文印";


    this._panelBasic = new Srims.stamp.StampApplicationEditPanel_BasicForm(this._stampApplication, isNew);
    this._panelStuff = new Srims.stamp.StampApplicationEditPanel_StuffPanel(this._stampApplication, this._store);
    this._panelShow = new Srims.stamp.StampApplicationEditPanel_ShowPanel(this._stampApplication, this._store);

    this._processPanels = [this._panelBasic, this._panelStuff, this._panelShow];

    this._processDescriptionStore = Srims.expertGuide.StampApply_ProcessDescriptionStore;
    this._processesShowPanel = new Srims.expertGuide.ProcessesShowForm(this._processDescriptionStore, '文印申请流程');
    this._StampApplySingleProcessOperatePanel = new Srims.expertGuide.SingleProcessOperatePanel('stampApply', this._processDescriptionStore, this._processPanels);

    this._StampApplySingleProcessOperatePanel.panel = this;
    this._processDescriptionStore.panel = this;

    Srims.stamp.StampApplicationEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        height: 224,
        width: 650,
        iconCls: 'icon-stamp',
        buttonAlign: 'center',
        title: this._title,
        items: [this._processesShowPanel, this._StampApplySingleProcessOperatePanel]
    });
    this.onDestroy = function(panel) {
        var panelId = 'StampApplicationShowPanel' + this._stampApplication.get('id');
        if (Ext.getCmp(panelId)) {
            Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
            //Srims.stamp.showStampApplication(this._stampApplication, this._store);
        }
    }
    this.on('destroy', this.onDestroy);
}
Ext.extend(Srims.stamp.StampApplicationEditPanel, Ext.Panel, {});
