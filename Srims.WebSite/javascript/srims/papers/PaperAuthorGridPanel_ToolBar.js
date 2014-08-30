
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorGridPanel_ToolBar = function(selection, store, paper){

    //fields
    this._selection = selection;
    this._store = store;
    this._paper = paper;
    
    //controls
    this._buttonNewExpert = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            Srims.papers.newPaperAuthor(this.paper, this.store, true);
        },
        hidden: true,
        tooltip: '<b>添加论文作者信息</b>'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加非专家作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            Srims.papers.newPaperAuthor(this.paper, this.store, false);
        },
        hidden: true,
        tooltip: '<b>添加论文作者信息</b>'
    });
    this._buttonEditAuthor = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editPaperAuthor(this.paper, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deletePaperAuthor(this.paper, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除论文作者信息</b>'
    });
    
    Srims.papers.PaperAuthorGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNewExpert, this._buttonNew, this._buttonEditAuthor, this._buttonDelete]
    });
    
    this._buttonNewExpert.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonNewExpert.setDisabled(!paper.get('canEditPaperAuthor'));
    this._buttonNew.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonNew.setDisabled(!paper.get('canEditPaperAuthor'));
    //initial
    this._selection.buttonEditAuthor = this._buttonEditAuthor;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEditAuthor;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
        }
        
        buttonEdit.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonEdit.setDisabled(!paper.get('canEditPaperAuthor'));
        
        buttonDelete.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonDelete.setDisabled(!paper.get('canEditPaperAuthor'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.PaperAuthorGridPanel_ToolBar, Ext.Toolbar);
