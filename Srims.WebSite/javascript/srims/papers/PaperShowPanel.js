
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel = function(panelId, paper, store,systemSetting){
    this._panelId = panelId;
    this._paper = paper;
    this._store = store;
    this._basicForm = new Srims.papers.PaperShowPanel_BasicForm(this._paper);
    this._otherBasicForm = new Srims.papers.PaperShowPanel_OtherBasicForm(this._paper);
    this._abstractFrom = new Srims.papers.PaperShowPanel_AbstractForm(this._paper);
    this._paperAuthorForm = new Srims.papers.PaperShowPanel_AuthorForm(this._paper);
    this._magazineInforForm = new Srims.papers.PaperShowPanel_MagazineForm(this._paper);
    this._magazineYearInforForm = new Srims.papers.PaperShowPanel_MagazineYearInforForm(this._paper);
    this._toolBar = new Srims.papers.PaperShowPanel_ToolBar(paper, this._store);
    this._MessagePanel = new Srims.papers.PaperEditPanel_MessagePanel(systemSetting);
    
    var items = [];
    items = [this._MessagePanel, this._basicForm, this._otherBasicForm, this._abstractFrom, this._paperAuthorForm];
    if (paper.get("magazineID") != undefined && paper.get("magazineID") > 0) 
        items = [this._MessagePanel, this._basicForm, this._otherBasicForm, this._abstractFrom, this._paperAuthorForm, this._magazineInforForm, this._magazineYearInforForm];
    
    Srims.papers.PaperShowPanel.superclass.constructor.call(this, {
        id: this._panelId,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._paper.get('name'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: items
    });
    
}
Ext.extend(Srims.papers.PaperShowPanel, Ext.Panel, {});
