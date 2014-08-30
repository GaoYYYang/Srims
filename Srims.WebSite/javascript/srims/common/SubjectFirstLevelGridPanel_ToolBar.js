if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.common.AddnewSubjectFirstLevel(this.store);
        },
        tooltip: '新建一级学科'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.editSubjectFirstLevel(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '编辑一级学科'
    });
    Srims.common.SubjectFirstLevelGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit]
    });
    //initial
    this._selection.buttonEdit = this._buttonEdit;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;

        if (selection.getCount() == 0) {
            buttonEdit.hide();
            return;
        }
        buttonEdit.show();
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.common.SubjectFirstLevelGridPanel_ToolBar, Ext.Toolbar);