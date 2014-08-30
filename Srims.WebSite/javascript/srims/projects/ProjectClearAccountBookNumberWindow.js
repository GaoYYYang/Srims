
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectClearAccountBookNumberWindow = function(id, project){

    this._project = project;
    
    this._WarningPanel = new Srims.projects.ProjectClearAccountBookNumberWindow_WarningPanel();
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonClear = new Ext.Button({
        minWidth: 80,
        text: '清 空',
        window: this
    });
    
    this._textClearAccountBookNumberReason = new Ext.form.TextArea({
        fieldLabel: '清空账本号理由',
        height: 60,
        allowBlank: false,
        width: 230
    });
    Srims.projects.ProjectClearAccountBookNumberWindow.superclass.constructor.call(this, {
        id: id,
        title: '清空项目账本号',
        width: 430,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._WarningPanel, new Ext.Panel({
            layout: 'form',
            bodyStyle: 'padding:5px 10px 0 10px',
            height: 85,
            frame: true,
            labelWidth: 100,
            items: [this._textClearAccountBookNumberReason]
        })],
        
        buttons: [this._buttonClear, this._buttonClose]
    });
    
    this.validate = function(preventMark){
        var result = true;
        result = this._textClearAccountBookNumberReason.isValid(preventMark) && result;
        return result;
    }
    this.clear = function(){
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/ClearProjectAccountBookNumber',
            params: {
                projectId: this._project.get('id'),
                clearReason: this._textClearAccountBookNumberReason.getValue()
            },
            scope: this,
            success: function(){
                Ext.Msg.show({
                    title: '清空项目账本号',
                    msg: '成功清空项目的账本号',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                this.close();
            }
        });
    }
    this._buttonClear_Click = function(button, e){
        var window = button.window;
        
        if (!window.validate(false)) 
            return;
        
        Ext.MessageBox.confirm('清空项目账本号确认', '你确定要清空这个项目的账本号吗？', function(buttonId){
            if (buttonId == 'yes') {
                button.setText('正在清空');
                button.disable();
                
                window.clear();
            }
        }, this);
    }
    this._buttonClear.on('click', this._buttonClear_Click);
}
Ext.extend(Srims.projects.ProjectClearAccountBookNumberWindow, Ext.Window);
