if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerFormPanel = function(award, isEdit, isShow) {

    this._award = award;
    this._store = new Srims.awards.AwardWinnerStore(award.get('id'));
    this._gridPanelAwardWinner = new Srims.awards.AwardWinnerGridPanel(isEdit, isShow, award, this._store);

    //constructor
    Srims.awards.AwardWinnerFormPanel.superclass.constructor.call(this, {
        collapsible: true,
        titleCollapse: true,
        title: '奖励成员信息',
        autoHeight: true,
        autoWidth: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        items: [this._gridPanelAwardWinner]
    });
    this._store.load();
}
Ext.extend(Srims.awards.AwardWinnerFormPanel, Ext.form.FormPanel, {});
