
if (!Srims.type) 
    Ext.namespace("Srims.type");

Srims.type.ProjectTypeEditWindow = function(id, projectType, store){

    this._id = id;
    this._projectType = projectType;
    this._store = store;
    
    var isNew = this._projectType.isNew();
    this._title = this._projectType.isNew() ? "新建项目类型" : this._projectType.get('name');
    this._formPanelBasic = new Srims.type.ProjectTypeEditWindow_BasicForm(this._projectType);
    
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    
    Srims.type.ProjectTypeEditWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 304,
        width: 680,
        buttonAlign: 'center',
        title: this._title,
        iconCls: projectType.isNew() ? 'icon-new' : 'icon-edit',
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
        var projectType = this._projectType;
        projectType.beginEdit();
        this.assginValues();
        projectType.commit();
        Ext.Ajax.request({
            url: Srims.service.type.ProjectTypeService + '/Save',
            params: projectType.data,
            scope: this,
            success: function(response){
            
                Srims.WorkSpace.getWorkSpace().remove(this);
                store.load();
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.type.ProjectTypeXmlReader()
                });
                var newProjectType = newstore.getAt(0);
                if (!isNew) {
                    var panelId = 'ProjectTypeShowPanel' + newProjectType.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.type.showProjectType(newProjectType, store);
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
Ext.extend(Srims.type.ProjectTypeEditWindow, Ext.Window, {});

