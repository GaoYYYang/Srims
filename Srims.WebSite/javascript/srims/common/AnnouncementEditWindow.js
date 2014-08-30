
if (!Srims.common) 
    Ext.namespace('Srims.common');
Srims.common.AnnouncementEditWindow = function(id, announcement){

    this._announcement = announcement;
    this._title = announcement.isNew() ? '新建通知' : announcement.get('title');

    this._formPanelBasic = new Srims.common.AnnouncementEditWindow_BasicForm(announcement);
    this._formPanelContent = new Srims.common.AnnouncementEditWindow_ContentForm(announcement);
            					
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        window: this
    });

    Srims.common.AnnouncementEditWindow.superclass.constructor.call(this, {
        id: id,
        style: 'padding:5px',
        width: 600,
        height: 500,
        closeAction: 'close',
        buttonAlign: 'center',
        title: this._title,
        iconCls: announcement.isNew() ? 'icon-announcement-new' : 'icon-announcement-edit',
        resizable: false,
        items: [this._formPanelBasic, this._formPanelContent],
        buttons: [this._buttonSave]
    });
    //method
    this.assignValues = function(){
        this._formPanelBasic.assignValues();
        this._formPanelContent.assignValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._formPanelBasic.isValid(preventMark) && result;
        result = this._formPanelContent.isValid(preventMark) && result;
        
        return result;
    }
    this.save = function(){
        var announcement = this._announcement;
        announcement.beginEdit();
        this.assignValues();
        announcement.commit();
        
        Ext.Ajax.request({
            url: Srims.service.common.AnnouncementService + '/Save',
            params: announcement.data,
            scope: this,
            success: function(){
                panel = Srims.WorkSpace.active('AnnouncementGridPanel');
                if (panel) 
                    panel.getAnnouncementStore().load();
                else {
                    announcementStore = new Srims.common.AnnouncementStore(Srims.service.common.AnnouncementService + '/Query');
                    panel = new Srims.common.AnnouncementGridPanel('AnnouncementGridPanel', announcementStore, '通知列表', 'icon-announcement-list');
                    Srims.WorkSpace.addPanel(panel);
                }
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.AnnouncementEditWindow, Ext.Window);
