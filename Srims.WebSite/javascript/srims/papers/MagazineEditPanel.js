
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineEditWindow = function(panelId, magazine){

    this._id = panelId;
    this._magazine = magazine;
    this._title = magazine.isNew() ? "新建杂志" : magazine.get('fullName');
    var isNew = magazine.isNew();
    this._formPanelBasic = new Srims.papers.MagazineEditPanel_BasicForm(this._magazine);
    
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    
    Srims.papers.MagazineEditWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 278,
        width: 580,
        buttonAlign: 'center',
        title: this._title,
        iconCls: magazine.isNew() ? 'icon-magazine-new' : 'icon-edit',
        items: [this._formPanelBasic],
        buttons: [this._buttonSave]
    });
    
    this.assginValues = function(){
        this._formPanelBasic.assginValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelBasic.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var magazine = this._magazine;
        magazine.beginEdit();
        this.assginValues();
        magazine.commit();
        Ext.Ajax.request({
            url: Srims.service.papers.MagazineService + '/Save',
            params: magazine.data,
            scope: this,
            success: function(response){
                Srims.WorkSpace.getWorkSpace().remove(this);
                Srims.papers.listMagazine(false);
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.papers.MagazineXmlReader()
                });
                var newMagazine = store.getAt(0);
                if (!isNew) {
                    var panelId = 'MagazineShowPanel' + newMagazine.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.papers.showMagazine(newMagazine);
            }
        });
    }
    this._onButonSave_Click = function(button, e){
        var panel = button.panel;
        
        if (!panel.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButonSave_Click);
}
Ext.extend(Srims.papers.MagazineEditWindow, Ext.Window, {});
