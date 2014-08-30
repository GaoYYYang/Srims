
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerFormPanel = function(patent, isEdit, isShow) {

    this._patent = patent;
    this._store = new Srims.patents.PatentInventerStore(patent.get('id'));
    this._gridPanelPatentInventer = new Srims.patents.PatentInventerGridPanel(isEdit, isShow, patent, this._store);

    //constructor
    Srims.patents.PatentInventerFormPanel.superclass.constructor.call(this, {
        collapsible: true,
        titleCollapse: true,
        title: '专利发明者信息',
        autoHeight: true,
        autoWidth: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        items: [this._gridPanelPatentInventer]
    });
    this._store.load();
}
Ext.extend(Srims.patents.PatentInventerFormPanel, Ext.form.FormPanel, {});







