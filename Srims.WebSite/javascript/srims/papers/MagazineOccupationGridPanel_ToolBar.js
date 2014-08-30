
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationGridPanel_ToolBar = function(selection, store, magazine){

    //fields
    this._selection = selection;
    this._store = store;
    this._magazine = magazine;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        magazine: this._magazine,
        handler: function(){
            Srims.papers.newMagazineOccupation(this.magazine, this.store);
        },
        hidden: true,
        tooltip: '<b>新建杂志任职信息</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        magazine: this._magazine,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editMagazineOccupation(this.magazine, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑杂志任职信息</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        magazine: this._magazine,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deleteMagazineOccupation(this.selection.getSelected(), this.store, this.magazine);
        },
        hidden: true,
        tooltip: '<b>删除杂志任职信息</b>'
    });
    
    
    
    Srims.papers.MagazineOccupationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
    this._buttonNew.setVisible(true);
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
        }
        var magazineOccupation = selection.getSelected();
        
        buttonEdit.setVisible(magazineOccupation.get('hasPermission_EditMagazineOccupation'));
        buttonEdit.setDisabled(!magazineOccupation.get('canEdit_MagazineOccupation'));
        
        buttonDelete.setVisible(magazineOccupation.get('hasPermission_EditMagazineOccupation'));
        buttonDelete.setDisabled(!magazineOccupation.get('canEdit_MagazineOccupation'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.MagazineOccupationGridPanel_ToolBar, Ext.Toolbar);
