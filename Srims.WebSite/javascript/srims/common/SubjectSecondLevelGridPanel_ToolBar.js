if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevelGridPanel_ToolBar = function(selection, store, panelId) {
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
            Srims.common.AddnewSubjectSecondLevel(this.store);
        },
        tooltip: '新建二级学科'
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
            Srims.common.editSubjectSecondLevel(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '编辑二级学科'
    });

    Srims.common.SubjectSecondLevelGridPanel_ToolBar.superclass.constructor.call(this, {
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
Ext.extend(Srims.common.SubjectSecondLevelGridPanel_ToolBar, Ext.Toolbar);
