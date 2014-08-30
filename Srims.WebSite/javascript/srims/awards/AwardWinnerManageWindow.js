if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerManageWindow = function(ID, award) {

    this._award = award;
    this._title = award.get('name');
    this._WindowID = ID;
    this._store = new Srims.awards.AwardWinnerStore(award.get('id'));
    this._MemberPanel = new Srims.awards.AwardWinnerGridPanel(true, false, this._award, this._store);

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    //public methods
    this.getAwardWinnerStore = function() {
        return this._MemberPanel.getStore();
    }

    //constructor
    Srims.awards.AwardWinnerManageWindow.superclass.constructor.call(this, {
        id: this._WindowID,
        title: this._title,
        iconCls: 'icon-member-manage',
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        width: 460,
        frame: true,
        height: 300,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 436,
            layout: 'form',
            frame: true,
            height: 220,
            autoScroll: true,
            deferredRender: false,
            items: [this._MemberPanel]
        })],
        buttons: [this._buttonClose]
    });
    this._store.load();
}
Ext.extend(Srims.awards.AwardWinnerManageWindow, Ext.Window);