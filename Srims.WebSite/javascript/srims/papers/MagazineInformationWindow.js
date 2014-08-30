
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationWindow = function(id, magazine){

    this._id = id;
    this._magazine = magazine;
    this._magazineInformationGridPanel = new Srims.papers.MagazineInformationGridPanel(magazine);
    this._magazineInformationGridPanel.getStore().load();
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.papers.MagazineInformationWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '杂志' + this._magazine.get('fullName') + '年度信息管理',
        iconCls: 'icon-magazineInformation-manage',
        width: 680,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._magazineInformationGridPanel],
        buttons: [this._buttonClose]
    });
    
}
Ext.extend(Srims.papers.MagazineInformationWindow, Ext.Window, {});
