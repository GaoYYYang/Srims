
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectWaitringSetDelegateWindow = function(id){

    this._id = id;
    this._projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/GetMyProcessingProject');
    this._setDelegateGridPanel = new Srims.projects.ProjectSetDelegateGridPanel(this._projectStore);
    this._helpPanel = new Ext.Panel({
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '提示：<ul style="text-indent:2em"><li>1、委托项目：选择您要委托的项目，点击<span style="color:#FF0000">“指定项目委托负责人”</span>按钮，进行项目委托。</li><li>2、取消委托：选择项目，点击<span style="color:#FF0000">“取消项目委托负责人”</span>按钮，取消项目委托</li></ul>'
    });
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.projects.ProjectWaitringSetDelegateWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '委托项目管理',
        iconCls: 'icon-set-delegate-principal',
        width: 700,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._helpPanel, this._setDelegateGridPanel],
        buttons: [this._buttonClose]
    });
    this._projectStore.load();
}
Ext.extend(Srims.projects.ProjectWaitringSetDelegateWindow, Ext.Window, {});

