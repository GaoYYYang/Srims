
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineShowPanel = function(panelId, magazine, store){
    this._id = panelId;
    this._magazine = magazine;
    this._magazineId = this._magazine.get('id');
    this._store = store;
    this._basicForm = new Srims.papers.MagazineShowPanel_BasicForm(magazine, false);
    this._yearInforForm = new Srims.papers.MagazineShowPanel_YearInforForm(this._magazineId, false);
    this._occupationForm = new Srims.papers.MagazineShowPanel_OccupationForm(magazine);
    this._toolBar = new Srims.papers.MagazineShowPanel_ToolBar(magazine, this._store);
    
    Srims.papers.MagazineShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._magazine.get('fullName'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: [this._basicForm, this._yearInforForm, this._occupationForm]
    });
    
}
Ext.extend(Srims.papers.MagazineShowPanel, Ext.Panel, {});
