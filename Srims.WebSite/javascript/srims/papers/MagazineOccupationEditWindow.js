
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineOccupationEditWindow = function(id, magazineOccupation, magazine, store){

    this._id = id;
    this._magazineOccupation = magazineOccupation;
    this._magazine = magazine;
    this._store = store;
    this.basicFormPanel = new Srims.papers.MagazineOccupationEditPanel(this._magazineOccupation, this._magazine, this._store);
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    Srims.papers.MagazineOccupationEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: magazineOccupation.isNew() ? '新建杂志任职信息' : '编辑杂志任职信息',
        iconCls: magazineOccupation.isNew() ? 'icon-new' : 'icon-edit',
        width: 550,
        autoHeight: true,
        closable: true,
        style: 'padding:5px; width:1200px',
        items: [this.basicFormPanel],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._save = function(){
        var magazine = this._magazine;
        var magazineOccupation = this.basicFormPanel._magazineOccupation;
        magazineOccupation.beginEdit();
        this.basicFormPanel._assignValues();
        magazineOccupation.commit();
        
        Ext.Ajax.request({
            url: Srims.service.papers.MagazineOccupationService + '/Save',
            params: magazineOccupation.data,
            scope: this,
            success: function(){
                this._store.load();
                if (magazine != undefined) {
                    var panelId = 'MagazineShowPanel' + magazine.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                    Srims.papers.showMagazine(magazine);
                }
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window.basicFormPanel._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.papers.MagazineOccupationEditWindow, Ext.Window, {})
