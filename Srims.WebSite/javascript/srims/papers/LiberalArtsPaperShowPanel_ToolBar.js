
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperShowPanel_ToolBar = function(paper, store) {

    //fields
    this._paper = paper;
    this._store = store;
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        paper: this._paper,
        handler: function(){
        Srims.papers.editLiberalArtsPaper(this.paper);
        },
        hidden: true,
        tooltip: '<b>编辑论文</b><br/>编辑选中论文的基本、杂志、作者等信息'
    });
    this._buttonPaperAuthorManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '文科论文作者管理',
        minWidth: 60,
        paper: this._paper,
        panel: this._panel,
        handler: function(){
            Srims.papers.showLiberalArtsPaperAuthorManageWindow(this.paper);
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b><br/>编辑选中论文的作者信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        paper: this._paper,
        store: this._store,
        handler: function(){
        Srims.papers.deleteLiberalArtsPaper(this.paper, this.store);
        },
        hidden: true,
        tooltip: '<b>删除论文</b>'
    });

    Srims.papers.LiberalArtsPaperShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonPaperAuthorManage, this._buttonDelete]
    });
    
    this._buttonEdit.setVisible(this._paper.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!this._paper.get('canEdit'));
    
    this._buttonDelete.setVisible(this._paper.get('hasPermission_Edit'));
    this._buttonDelete.setDisabled(!this._paper.get('canEdit'));
    
    this._buttonPaperAuthorManage.setVisible(this._paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonPaperAuthorManage.setDisabled(!this._paper.get('canEditPaperAuthor'));
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_ToolBar, Ext.Toolbar);

