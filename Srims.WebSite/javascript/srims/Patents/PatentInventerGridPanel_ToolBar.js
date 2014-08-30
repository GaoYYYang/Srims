if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerGridPanel_ToolBar = function(selection, store, patent) {
    this._store = store;
    this._selection = selection;
    this._patent = patent;

    this._buttonAdd = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加非专家',
        minWidth: 40,
        store: this._store,
        handler: function() {
            Srims.patents.addInventer(patent, store, false);
        },
        tooltip: '<b>获奖人非专家</b>'
    });
    this._buttonAddExpert = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家',
        minWidth: 40,
        store: this._store,
        handler: function() {
            Srims.patents.addInventer(patent, store, true);
        },
        tooltip: '<b>获奖人专家</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 40,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var isExpert = false;
            if (this.selection.getSelected().get('expertID'))
                isExpert = true;

            Srims.patents.editInventer(this.selection.getSelected(), patent, store, isExpert);
        },
        tooltip: '<b>编辑发明人</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 40,
        store: this._store,
        selection: this._selection,
        patent: this._patent,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.patents.deleteInventer(this.selection.getSelected(), this.store, patent);
        },
        tooltip: '<b>删除发明人</b>'
    });

    //constructor
    Srims.patents.PatentInventerGridPanel_ToolBar.superclass.constructor.call(this, {
        width: 425,
        items: [this._buttonAdd, this._buttonAddExpert, this._buttonEdit, this._buttonDelete]
    });

    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;

        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonEdit.hide();
            return;
        }
        //var awardWinner = selection.getSelected();
        buttonEdit.setVisible(true);
        buttonDelete.show();
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.patents.PatentInventerGridPanel_ToolBar, Ext.Toolbar);









