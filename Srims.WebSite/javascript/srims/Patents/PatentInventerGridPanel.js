
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerGridPanel = function(isEdit, isShow, patent, store) {

    this._patent = patent;
    this._store = store;

    this._columnModel = new Srims.patents.PatentInventerGridPanel_ColumnModel();   
    this._selections = new Ext.grid.RowSelectionModel(); 
    this._toolBar = new Srims.patents.PatentInventerGridPanel_ToolBar(this._selections, this._store, this._patent);
   
    if (isEdit) this._width = 425;
    else this._width = 850;

    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    if (isEdit) params.tbar = this._toolBar;
    params.enableColumnHide = false;
    params.enableColumnMove = true;
    params.enableHdMenu = false;
    params.border = false;
    params.height = 220;
    params.width = this._width;
    params.stripeRows = true;
    params.loadMask = true;
    params.stateful = false;
    params.viewConfig = {
        autoFill: true,
        scrollOffset: 0,
        forceFit: true,
        emptyText: '暂时没有奖励成员'
    };
    //constructor
    Srims.patents.PatentInventerGridPanel.superclass.constructor.call(this, params);

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    }
    this.on('celldblclick', onCellDblClick);
}

Ext.extend(Srims.patents.PatentInventerGridPanel, Srims.component.GridPanel, {});







