
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardShowPanel_ToolBar = function(award, store){
    //fields
    this._award = award;
    this._store = store;
    
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        hidden: true,
        award: this._award,
        handler: function(){
            Srims.awards.showEditAwardWindow(this.award);
        },
        tooltip: '<b>编辑奖励</b><br/>编辑该奖励的信息'
    });
    this._buttonWinnerManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '获奖人管理',
        minWidth: 60,
        hidden: true,
        award: this._award,
        handler: function(){
            Srims.awards.showAwardWinnerManageWindow(this.award);
        },
        tooltip: '<b>奖励成员管理</b><br/>管理该奖励的奖励成员'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-award-document-manage',
        text: '文档管理',
        minWidth: 60,
        award: this._award,
        handler: function(){
            Srims.awards.showAwardDocumentManageWindow(this.award);
        },
        hidden: true,
        tooltip: '<b>奖励文档管理</b><br/>管理选中奖励的奖励文档'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        hidden: true,
        award: this._award,
        store: this._store,
        handler: function(){
            Srims.awards.deleteAward(this.award, this.store);
        },
        tooltip: '<b>删除奖励</b>'
    });
    
    Srims.awards.AwardShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonWinnerManage, this._buttonDocumentManage, this._buttonDelete]
    });
    
    //根据权限显示按钮
    this._buttonEdit.setVisible(award.get('hasPermission_EditAward'));
    this._buttonEdit.setDisabled(!award.get('canEditAward'));
    this._buttonWinnerManage.setVisible(award.get('hasPermission_EditAward'));
    this._buttonWinnerManage.setDisabled(!award.get('canEditAward'));
    this._buttonDelete.setVisible(award.get('hasPermission_EditAward'));
    this._buttonDelete.setDisabled(!award.get('canEditAward'));
    this._buttonDocumentManage.setVisible(award.get('hasPermission_ShowAwardDocument'));
    this._buttonDocumentManage.setDisabled(!award.get('canShowAwardDocument'));
    
}
Ext.extend(Srims.awards.AwardShowPanel_ToolBar, Ext.Toolbar);










