
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffGridPanel_ToolBar = function(selection, store, stampApplication, stampApplicationStore, isforStampApplicationEditPanel){

    //fields
    this._selection = selection;
    this._store = store;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    this._isforStampApplicationEditPanel = isforStampApplicationEditPanel;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        isforStampApplicationEditPanel: this._isforStampApplicationEditPanel,
        hidden: isforStampApplicationEditPanel == false,
        handler: function(){
            if (this.isforStampApplicationEditPanel) 
                Srims.stamp.addStuffAndStampInfor(this.stampApplication, this.store);
            else 
                Srims.stamp.newStuff(this.store, this.stampApplication, this.stampApplicationStore);
        },
        tooltip: '<b>添加用印文件</b><br/>输入用印文件信息以添加用印文件'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        isforStampApplicationEditPanel: this._isforStampApplicationEditPanel,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            if (this.isforStampApplicationEditPanel) 
                Srims.stamp.editStuffAndStampInfor(this.selection.getSelected(), this.stampApplication, this.store);
            else 
                Srims.stamp.editStuff(this.selection.getSelected(), this.store, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>编辑用印文件</b><br/>编辑选中用印文件的信息'
    });
    this._buttonShowDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-document',
        text: '查看文档',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        isforStampApplicationEditPanel: this._isforStampApplicationEditPanel,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.downLoadStuffDoucment(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        isforStampApplicationEditPanel: this._isforStampApplicationEditPanel,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            if (this.isforStampApplicationEditPanel) 
                Srims.stamp.removeStuff(this.selection.getSelected(), this.store);
            else 
                Srims.stamp.deleteStuff(this.selection.getSelected(), this.store, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>删除用印文件</b>'
    });
    this._buttonStuffStampManage = new Ext.Toolbar.Button({
        iconCls: 'icon-stamp-stamp-type',
        text: '文件用印管理',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.showStuffStampManageWindow(this.selection.getSelected(), this.store, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>文件用印管理</b><br/>文件用印管理'
    });
    var user = Srims.currentLoginLog.user;
    Srims.stamp.StuffGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonStuffStampManage, this._buttonShowDocument, this._buttonDelete]
    });
    
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonStuffStampManage = this._buttonStuffStampManage;
    this._selection.buttonShowDocument = this._buttonShowDocument;
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonStuffStampManage = selection.buttonStuffStampManage;
        var buttonShowDocument = selection.buttonShowDocument;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            buttonStuffStampManage.hide();
            buttonShowDocument.hide();
            return;
        }
        
        var stuff = selection.getSelected();
        if (isforStampApplicationEditPanel == undefined) {
            buttonEdit.setVisible(stuff.get('haspermission_Edit'));
            buttonEdit.setDisabled(!stuff.get('canEdit'));
            
            buttonStuffStampManage.setVisible(stuff.get('hasPermission_ManageStampType'));
            buttonStuffStampManage.setDisabled(!stuff.get('canManageStampType'));
            
            buttonDelete.setVisible(stuff.get('haspermission_Edit'));
            buttonDelete.setDisabled(!stuff.get('canEdit'));
            
            buttonShowDocument.setVisible(true);
        }
        if (isforStampApplicationEditPanel) {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);
            buttonDelete.setVisible(true);
            buttonDelete.setDisabled(false);
            buttonShowDocument.setVisible(true);
        }
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StuffGridPanel_ToolBar, Ext.Toolbar);
