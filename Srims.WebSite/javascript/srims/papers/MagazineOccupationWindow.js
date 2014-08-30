
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationWindow = function(id, magazine){

    this._id = id;
    this._magazine = magazine;
    this._magazineOccupationGridPanel = new Srims.papers.MagazineOccupationGridPanel(magazine);
    this._magazineOccupationGridPanel.getStore().load();
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.papers.MagazineOccupationWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '杂志' + this._magazine.get('fullName') + '任职信息管理',
        iconCls: 'icon-magazineOccupation-manage',
        width: 680,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._magazineOccupationGridPanel],
        buttons: [this._buttonClose]
    });
    
}
Ext.extend(Srims.papers.MagazineOccupationWindow, Ext.Window, {});
