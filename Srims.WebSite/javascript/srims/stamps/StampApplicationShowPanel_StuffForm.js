
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationShowPanel_StuffForm = function(stampApplication){
    this._stampApplication = stampApplication;
    this._store = new Srims.stamp.StuffStore(stampApplication.get('id'));
    
    this._columnModel = new Srims.stamp.StuffGridPanel_ColumnModel();
    
    this._gridPanelStuff = new Ext.grid.GridPanel({
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
            emptyText: '没有文印材料信息'
        }
    });
    
    Srims.stamp.StampApplicationShowPanel_StuffForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '文印材料信息(双击查看文印材料)',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelStuff]
    });
    this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stuff = grid.getStore().getAt(rowIndex);
        Srims.stamp.downLoadStuffDoucment(stuff);
    }
    this._gridPanelStuff.on('celldblclick', onCellDblClick);
}

Ext.extend(Srims.stamp.StampApplicationShowPanel_StuffForm, Ext.form.FormPanel, {});
