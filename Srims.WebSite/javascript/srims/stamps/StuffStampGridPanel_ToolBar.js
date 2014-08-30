
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffStampGridPanel_ToolBar = function(selection, store, stuff, stuffStore, stampApplication, stampApplicationStore){

    //fields
    this._selection = selection;
    this._store = store;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    this._stuff = stuff;
    this._stuffStore = store;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stuff: this._stuff,
        stuffStore: this._stuffStore,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        handler: function(){
            Srims.stamp.newStuffStamp(this.store, this.stuff, this.stuffStore, this.stampApplication, this.stampApplicationStore);
        },
        tooltip: '<b>添加文件用印</b><br/>输入文件用印信息以添加文件用印'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stuff: this._stuff,
        stuffStore: this._stuffStore,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.editStuffStamp(this.selection.getSelected(), this.store, this.stuff, this.stuffStore, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>编辑文件用印</b><br/>编辑选中文件用印的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        stuff: this._stuff,
        stuffStore: this._stuffStore,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.deleteStuffStamp(this.selection.getSelected(), this.store, this.stuff, this.stuffStore, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>删除文件用印</b>'
    });
    var user = Srims.currentLoginLog.user;
    Srims.stamp.StuffStampGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
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
            return;
        }
        
        var stuffStamp = selection.getSelected();
        
        buttonEdit.setVisible(stuffStamp.get('haspermission_Edit'));
        buttonEdit.setDisabled(!stuffStamp.get('canEdit'));
        
        buttonDelete.setVisible(stuffStamp.get('haspermission_Edit'));
        buttonDelete.setDisabled(!stuffStamp.get('canEdit'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StuffStampGridPanel_ToolBar, Ext.Toolbar);
