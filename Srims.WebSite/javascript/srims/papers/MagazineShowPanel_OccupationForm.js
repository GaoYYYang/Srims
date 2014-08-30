
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineShowPanel_OccupationForm = function(magazine){

    this._magazine = magazine;
    this._store = new Srims.papers.MagazineOccupationStore(Srims.service.papers.MagazineOccupationService + '/GetByMagazineID', magazine.get('id'));
    
    this._columnModel = new Srims.papers.MagazineOccupationGridPanel_ColumnModel();
    
    this._gridPanelMagazineOccupation = new Ext.grid.GridPanel({
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
            emptyText: '没有杂志任职信息'
        }
    });
    
    Srims.papers.MagazineShowPanel_OccupationForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '任职信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelMagazineOccupation]
    });
    
    this._store.load();
}
Ext.extend(Srims.papers.MagazineShowPanel_OccupationForm, Ext.FormPanel, {});
