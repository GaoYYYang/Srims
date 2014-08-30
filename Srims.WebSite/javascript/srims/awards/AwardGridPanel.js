if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardGridPanel = function(id, awardStore, title, iconCls, queryParams) {

    //fields
    this._awardStore = awardStore;
    this._selections = new Ext.grid.RowSelectionModel();

    //controls
    this._columnModel = new Srims.awards.AwardGridPanel_ColumnModel();
    this._filters = new Srims.awards.AwardGridPanel_GridFilters();
    this._toolbar = new Srims.awards.AwardGridPanel_ToolBar(this, this._selections, this._awardStore, id, queryParams);

    //public methods
    this.getAwardStore = function() {
        return this._awardStore;
    }

    var params = {};
    params.sm = this._selections;
    params.store = this._awardStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;

    //constructor
    Srims.awards.AwardGridPanel.superclass.constructor.call(this, params);

    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {

        var award = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        Srims.awards.showAward(award, store);
    }
}
Ext.extend(Srims.awards.AwardGridPanel, Srims.component.GridPanel);
