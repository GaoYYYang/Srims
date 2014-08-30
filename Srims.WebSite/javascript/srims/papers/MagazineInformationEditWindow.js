
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineInformationEditWindow = function(id, magazineInformation, magazine, store){

    this._id = id;
    this._magazineInformation = magazineInformation;
    this._magazine = magazine;
    this._store = store;
    this.basicFormPanel = new Srims.papers.MagazineInformationEditPanel(this._magazineInformation, this._magazine, this._store);
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
    Srims.papers.MagazineInformationEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: magazineInformation.isNew() ? '新建杂志年度信息' : '编辑杂志年度信息',
        iconCls: magazineInformation.isNew() ? 'icon-new' : 'icon-edit',
        width: 600,
        height: 200,
        closable: true,
        style: 'padding:5px; width:1200px',
        items: [this.basicFormPanel],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._save = function(){
        var magazine = this._magazine;
        var magazineInformation = this.basicFormPanel._magazineInformation;
        magazineInformation.beginEdit();
        this.basicFormPanel._assignValues();
        magazineInformation.commit();
        
        Ext.Ajax.request({
            url: Srims.service.papers.MagazineInformationService + '/Save',
            params: magazineInformation.data,
            scope: this,
            success: function(){
                this._store.load();
                var panelId = 'MagazineShowPanel' + magazine.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.papers.showMagazine(magazine);
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
Ext.extend(Srims.papers.MagazineInformationEditWindow, Ext.Window, {})

