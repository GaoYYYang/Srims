
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEmailGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonEmail = new Ext.Toolbar.Button({
        iconCls: 'icon-email',
        text: '发送邮件',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            var records = this.selection.getSelections();
            var emails = [];
            for (var i = 0; i < records.length; i++) {
                var email = records[i].get('principalEmail');
                if (!Array.itemIsExistInArray(emails, email)) 
                    emails[emails.length] = email;
            }
            Srims.emailAction.sendEmail(emails.toString());
        },
        tooltip: '<b>发送邮件</b><br/>给查询项目的负责人发送邮件'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    
    Srims.projects.ProjectEmailGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEmail, new Ext.Toolbar.Fill(), this._buttonRefresh],
        height: 25
    });
}
Ext.extend(Srims.projects.ProjectEmailGridPanel_ToolBar, Ext.Toolbar);
