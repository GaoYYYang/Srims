if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerManageWindow = function(ID, patent) {

    this._patent = patent;
    this._title = patent.get('name');
    this._WindowID = ID;
    this._store = new Srims.patents.PatentInventerStore(patent.get('id'));

    this._MemberPanel = new Srims.patents.PatentInventerGridPanel(true, false, this._patent, this._store);

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });

    //public methods
    this.getPatentInventerStore = function() {
        return this._MemberPanel.getStore();
    }

    //constructor
    Srims.patents.PatentInventerManageWindow.superclass.constructor.call(this, {
        id: this._WindowID,
        title: this._title,
        iconCls: 'icon-member-manage',
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        width: 460,
        frame: true,
        height: 314,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._MemberPanel],
        buttons: [this._buttonClose]
    });
    this._store.load();
}
Ext.extend(Srims.patents.PatentInventerManageWindow, Ext.Window);








