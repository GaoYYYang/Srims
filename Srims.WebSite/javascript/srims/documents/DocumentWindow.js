
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentWindow = function(id, project){

    this._id = id;
    this._project = project;
    this._documentGridPanel = new Srims.documents.DocumentGridPanel(this._project);
    this._requireMessage = new Srims.documents.DocumentWindow_RequireMessage();
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.documents.DocumentWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目：' + this._project.get('name') + '文档管理',
        iconCls: 'icon-project-contract',
        width: 780,
        height: 380,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._requireMessage, this._documentGridPanel],
        buttons: [this._buttonClose]
    });
    this._documentGridPanel.getStore().load();
    this.hideWindow = function(){
        var panel = Ext.getCmp(Srims.projects.Panel_ShowProject_ID + project.get('id'));
        if (panel) 
            panel._formPanelDocument._store.load();
        //如果用户是专家，刷新专家待提交的文档列表
        var user = Srims.currentLoginLog.user;
        if (user.userRoleType == 'Expert') {
            var panel = Srims.WorkSpace.active('MyUnsubmitDocumentGridPanel');
            if (panel) {
                documentStore = panel.getStore();
                documentStore.load();
            }
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_ExpertUnsubmitDocumentCount);
        }
    }
    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.documents.DocumentWindow, Ext.Window, {});

