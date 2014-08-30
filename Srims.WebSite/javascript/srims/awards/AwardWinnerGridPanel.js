if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerGridPanel = function(isEdit, isShow, award, store) {

    this._award = award;
    this._store = store;
    this._columnModel = new Srims.awards.AwardWinnerGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.awards.AwardWinnerManageWindow_ToolBar(this._selections, this._store, this._award);

    if (isEdit) this._width = 400;
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
    params.autoHeight = true;
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
    Srims.awards.AwardWinnerGridPanel.superclass.constructor.call(this, params);

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    }
    this.on('celldblclick', onCellDblClick);
}

Ext.extend(Srims.awards.AwardWinnerGridPanel, Srims.component.GridPanel, {});