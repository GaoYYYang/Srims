
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel_AuthorForm = function(paper) {

    this._paper = paper;
    this._store = new Srims.papers.LiberalArtsPaperAuthorStore(paper.get('id'));

    this._columnModel = new Srims.papers.LiberalArtsPaperAuthorGridPanel_ColumnModel();
    
    this._gridPanelPaperAuthor = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有作者信息'
        }
    });

    Srims.papers.LiberalArtsPaperShowPanel_AuthorForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '作者信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelPaperAuthor]
    });
    
    this._store.load();
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_AuthorForm, Ext.FormPanel, {});
