
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentManageWindow = function(id, award){

    this._id = id;
    this._award = award;
    
    var load_url = Srims.service.documents.AwardDocumentService + '/GetByAwardID';
    var params = {
        awardId: award.get('id')
    };
    this._store = new Srims.documents.AwardDocumentStore(load_url, params);
    
    this._DocumentGridPanel = new Srims.documents.AwardDocumentGridPanel('awardDocumentList' + award.get('id'), award, false, this._store);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.documents.AwardDocumentManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: award.get('name') + '文档模板管理',
        width: 700,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._DocumentGridPanel],
        buttons: [this._buttonClose]
    });
    
    this._store.load();
}
Ext.extend(Srims.documents.AwardDocumentManageWindow, Ext.Window, {});

