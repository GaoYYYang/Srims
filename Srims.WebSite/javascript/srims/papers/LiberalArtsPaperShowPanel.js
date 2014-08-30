
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel = function(panelId, paper, store, systemSetting) {
    this._panelId = panelId;
    this._paper = paper;
    this._store = store;
    this._basicForm = new Srims.papers.LiberalArtsPaperShowPanel_BasicForm(this._paper);
    this._otherBasicForm = new Srims.papers.LiberalArtsPaperShowPanel_OtherBasicForm(this._paper);
    this._abstractFrom = new Srims.papers.LiberalArtsPaperShowPanel_AbstractForm(this._paper);
    this._paperAuthorForm = new Srims.papers.LiberalArtsPaperShowPanel_AuthorForm(this._paper);
    this._toolBar = new Srims.papers.LiberalArtsPaperShowPanel_ToolBar(paper, this._store);
    this._MessagePanel = new Srims.papers.LiberalArtsPaperEditPanel_MessagePanel(systemSetting);
    
    var items = [];
    items = [this._MessagePanel, this._basicForm, this._otherBasicForm, this._abstractFrom, this._paperAuthorForm];

    Srims.papers.LiberalArtsPaperShowPanel.superclass.constructor.call(this, {
        id: this._panelId,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._paper.get('resultsName'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: items
    });
    
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel, Ext.Panel, {});
