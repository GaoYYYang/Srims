
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorWindow = function(id, paper){

    this._id = id;
    this._paper = paper;
    this._paperAuthorGridPanel = new Srims.papers.PaperAuthorGridPanel(paper);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.papers.PaperAuthorWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '论文' + this._paper.get('name') + '作者管理',
        iconCls: 'icon-member-manage',
        width: 680,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._paperAuthorGridPanel],
        buttons: [this._buttonClose]
    });
    this._paperAuthorGridPanel.getPaperAuthorStore().load();
}
Ext.extend(Srims.papers.PaperAuthorWindow, Ext.Window, {});
