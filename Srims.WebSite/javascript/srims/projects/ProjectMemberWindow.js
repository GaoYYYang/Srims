
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectMemberWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._projectMemberGridPanel = new Srims.projects.ProjectMemberGridPanel(this._project);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.projects.ProjectMemberWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目“' + this._project.get('name') + '”成员管理',
        iconCls: 'icon-project-member-manage',
        width: 600,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._projectMemberGridPanel],
        buttons: [this._buttonClose]
    });
    this._projectMemberGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelMember._store.load();
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.projects.ProjectMemberWindow, Ext.Window, {});

