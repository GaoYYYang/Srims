
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardShowPanel = function(panelId, award, store) {
    //field
    this._award = award;
    this._id = panelId;
    this._store = store;

    //controls
    this._formPanelBasic = new Srims.awards.AwardShowPanel_BasicForm(award);
    this._formPanelMember = new Srims.awards.AwardWinnerFormPanel(award, false, true);
    this._formPanelIntroduction = new Srims.awards.AwardShowPanel_IntroductionForm(award);
    this._ToolBar = new Srims.awards.AwardShowPanel_ToolBar(this._award, this._store);

    //constructor    
    Srims.awards.AwardShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._award.get('name'),
        iconCls: 'icon-show',
        tbar: this._ToolBar,
        items: [this._formPanelBasic,
		        this._formPanelMember,
				this._formPanelIntroduction]
    });
}

Ext.extend(Srims.awards.AwardShowPanel, Ext.Panel, {});








