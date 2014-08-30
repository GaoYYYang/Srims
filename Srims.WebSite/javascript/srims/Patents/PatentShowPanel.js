
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentShowPanel = function(panelId, patent, store) {
    //field
    this._patent = patent;
    this._id = panelId;
    this._store = store;

    //controls
    this._formPanelBasic = new Srims.patents.PatentShowPanel_BasicForm(patent);
    this._formPanelInventer = new Srims.patents.PatentInventerFormPanel(patent, false, true);
    this._formPanelIntroduction = new Srims.patents.PatentShowPanel_IntroductionForm(patent);

    //constructor
    Srims.patents.PatentShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._patent.get('name'),
        iconCls: 'icon-show',
        items: [this._formPanelBasic, this._formPanelInventer,
				this._formPanelIntroduction]
    });
}

Ext.extend(Srims.patents.PatentShowPanel, Ext.Panel, {});
















