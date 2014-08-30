
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineShowPanel_YearInforForm = function(magazineId, isPaperShow){
    this._magazineId = magazineId;
    this._isPaperShow = isPaperShow;
    
    this._store = new Srims.papers.MagazineInformationStore(magazineId);
    this._columnModel = new Srims.papers.MagazineInformationGridPanel_ColumnModel();
    
    this._gridPanelMagazineInformation = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 720,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有年度信息'
        }
    });
    Srims.papers.MagazineShowPanel_YearInforForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '杂志年度信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelMagazineInformation]
    });
    
    this._store.load();
}
Ext.extend(Srims.papers.MagazineShowPanel_YearInforForm, Ext.FormPanel, {});
