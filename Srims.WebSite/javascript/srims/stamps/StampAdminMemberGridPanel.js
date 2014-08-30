
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberGridPanel = function(stampApplicationType, sign) {
    this._sign = sign;
    this._stampApplicationType = stampApplicationType;
    this._store = new Srims.stamp.StampAdminMemberStore(stampApplicationType, this._sign);
    this._store.load();
    this._columnModel = new Srims.stamp.StampAdminMemberGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.stamp.StampAdminMemberGridPanel_ToolBar(this._selections, this._store, this._stampApplicationType, this._sign);

    //    this.params = {};
    //    this.params.sm = this._selections;
    //    this.params.store = this._store;
    //    this.params.colModel = this._columnModel;
    //    this.params.tbar = this._toolBar;
    //    this.params.height = 220;

    //    //constructor
    //    Srims.stamp.StampAdminMemberGridPanel.superclass.constructor.call(this, this.params);

    Srims.stamp.StampAdminMemberGridPanel.superclass.constructor.call(this, {
        store: this._store,
        sm: this._selections,
        closable: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220
    });

    //    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    //        var projectMember = grid.getStore().getAt(rowIndex);
    //        Srims.stamp.editProjectMember(this._project, projectMember, this._store);
    //    }
    //    this.on('celldblclick', onCellDblClick);

    //    this._reset = function(stampApplicationType) {
    //        this._stampApplicationType = stampApplicationType;
    //        this._store.load({
    //            params: {
    //                stampApplicationTypeID: stampApplicationType.get('id')
    //            }
    //        });
    //        this._toolBar._reset(this._store, this._stampApplicationType);
    //    }

};
Ext.extend(Srims.stamp.StampAdminMemberGridPanel, Srims.component.GridPanel, {});
