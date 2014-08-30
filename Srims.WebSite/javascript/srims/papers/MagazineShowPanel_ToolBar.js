
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineShowPanel_ToolBar = function(magazine, store){

    //fields
    this._magazine = magazine;
    this._store = store;
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        magazine: this._magazine,
        store: this._store,
        handler: function(){
            Srims.papers.editMagazine(this.magazine);
        },
        hidden: true,
        tooltip: '<b>编辑杂志</b><br/>编辑选中杂志的信息'
    });
    this._buttonYearInforManage = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '年度信息管理',
        minWidth: 60,
        magazine: this._magazine,
        handler: function(){
            Srims.papers.showMagazineYearInforMagazineWindow(this.magazine);
        },
        hidden: true,
        tooltip: '<b>编辑杂志年度信息</b><br/>编辑选中杂志的年度信息'
    });
    this._buttonOccupationManage = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '任职信息管理',
        minWidth: 60,
        magazine: this._magazine,
        handler: function(){
            Srims.papers.showMagazineOccupationManageWindow(this.magazine);
        },
        hidden: true,
        tooltip: '<b>编辑杂志任职信息</b><br/>编辑选中杂志的任职信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        magazine: this._magazine,
        store: this._store,
        handler: function(){
            Srims.papers.deleteMagazine(this.magazine, this.store);
        }
    });
    
    Srims.papers.MagazineShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonYearInforManage, this._buttonOccupationManage, this._buttonDelete]
    });
    
    
    this._buttonEdit.setVisible(this._magazine.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!this._magazine.get('canEdit'));
    
    this._buttonDelete.setVisible(this._magazine.get('hasPermission_Edit'));
    this._buttonDelete.setDisabled(!this._magazine.get('canEdit'));
    
    this._buttonYearInforManage.setVisible(this._magazine.get('hasPermission_ShowMagazineInformation'));
    this._buttonYearInforManage.setDisabled(!this._magazine.get('canShow_MagazineInformation'));
    
    this._buttonOccupationManage.setVisible(this._magazine.get('hasPermission_EditMagazineOccupation'));
    this._buttonOccupationManage.setDisabled(!this._magazine.get('canEdit_MagazineOccupation'));
}
Ext.extend(Srims.papers.MagazineShowPanel_ToolBar, Ext.Toolbar);

