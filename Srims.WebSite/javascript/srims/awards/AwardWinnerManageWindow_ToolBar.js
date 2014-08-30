if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerManageWindow_ToolBar = function(selection, store, award) {
    this._store = store;
    this._selection = selection;
    this._award = award;

    this._buttonAdd = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加非专家',
        minWidth: 40,
        store: this._store,
        handler: function() {
            Srims.awards.addWinner(award, store, false);
        },
        tooltip: '<b>获奖人非专家</b>'
    });
    this._buttonAddExpert = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家',
        minWidth: 40,
        store: this._store,
        handler: function() {
            Srims.awards.addWinner(award, store, true);
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
            if (this.selection.getSelected().get('expertID')) isExpert = true;
            Srims.awards.editWinner(this.selection.getSelected(), award, store, isExpert);
        },
        tooltip: '<b>编辑获奖人</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 40,
        store: this._store,
        selection: this._selection,
        award: this._award,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.awards.deleteWinner(this.selection.getSelected(), this.store, award);
        },
        tooltip: '<b>删除获奖人</b>'
    });

    //constructor
    Srims.awards.AwardWinnerManageWindow_ToolBar.superclass.constructor.call(this, {
        width: 400,
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
        var awardWinner = selection.getSelected();

        buttonEdit.setVisible(true);
        buttonDelete.show();
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.awards.AwardWinnerManageWindow_ToolBar, Ext.Toolbar);