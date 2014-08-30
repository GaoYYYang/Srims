
if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseShowPanel = function(panelId, base){
    //field
    this._base = base;
    this._id = panelId;
    
    //controls
    this._formPanelBasic = new Srims.bases.BaseShowPanel_BasicForm(this._base);
    this._formProject = new Srims.bases.BaseShowPanel_ProjectForm(this._base);
    this._ToolBar = new Srims.bases.BaseShowPanel_ToolBar(this, this._base)
    //constructor    
    Srims.bases.BaseShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._base.get('name'),
        iconCls: 'icon-show',
        tbar: this._ToolBar,
        items: [this._formPanelBasic, this._formProject]
    });
    this.reset = function(base){
        this._formPanelBasic.resetComponentValue(base);
        this._ToolBar._resetButtonBase(base);
        this._formProject.store.load();
    }
}

Ext.extend(Srims.bases.BaseShowPanel, Ext.Panel, {});








