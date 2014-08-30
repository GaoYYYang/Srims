
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserLockEditWindow = function(id, user){
    this._user = user;
    this._dateFieldLockStartDate = new Ext.form.DateField({
        fieldLabel: '起始时间',
        allowBlank: false,
        width: 200
    })
    this._dateFieldLockEndDate = new Ext.form.DateField({
        fieldLabel: '终止时间',
        width: 200
    })
    this._textAreaLockReason = new Ext.form.TextArea({
        hideLabel: true,
        width: 463,
        height: 95
    })
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        window: this
    })
    var lockDate = [this._dateFieldLockStartDate, this._dateFieldLockEndDate];
    
    Srims.users.UserLockEditWindow.superclass.constructor.call(this, {
        style: 'padding:5px',
        width: 500,
        height: 300,
        frame: true,
        layout: 'form',
        closeAction: 'close',
        buttonAlign: 'center',
        title: '锁定用户' + user.get('name'),
        resizable: false,
        iconCls: 'icon-user-lock',
        items: [new Ext.form.FormPanel({
            title: '设置锁定日期',
            frame: true,
            items: lockDate
        }), new Ext.form.FormPanel({
            title: '锁定原因',
            frame: true,
            items: [this._textAreaLockReason]
        })],
        buttons: [this._buttonSave]
    })
    
    //methods
    this.getParams = function(){
        var params = {};
        params.lockStartDate = this._dateFieldLockStartDate.getValue();
        params.lockStartDate = params.lockStartDate.format("Y-m-d H:i:s");
        params.lockEndDate = this._dateFieldLockEndDate.getValue();
        if (params.lockEndDate != null && params.lockEndDate != '') 
            params.lockEndDate = params.lockEndDate.format("Y-m-d H:i:s");
        params.lockReason = this._textAreaLockReason.getValue();
        params.userID = this._user.get('id');
        return params;
    }
    this.isValidate = function(preventMark){
        return this._dateFieldLockStartDate.isValidate(preventMark);
    }
    this.isDateValidate = function(){
        return this._dateFieldLockEndDate.getValue() >= this._dateFieldLockStartDate.getValue();
    }
    
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        if (!window.isValidate) 
            return;
        if (window._dateFieldLockEndDate.getValue() != null && window._dateFieldLockEndDate.getValue() != '') 
            if (!window.isDateValidate()) {
                Ext.Msg.show({
                    title: '用户锁定日期设置错误',
                    msg: '用户锁定终止时间不能小于开始时间！',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
                return false;
            }
        
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/SaveUserLockLog',
            params: window.getParams(),
            scope: this,
            success: function(){
                panel = Srims.WorkSpace.active('UserGridPanel');
                if (panel) 
                    panel.getUserStore().load();
                else {
                    userStore = new Srims.users.UserStore(Srims.service.users.UserService + '/Query');
                    panel = new Srims.users.UserGridPanel('UserGridPanel', userStore, '用户模块', 'icon-user-list');
                    Srims.WorkSpace.addPanel(panel);
                }
                Srims.WorkSpace.getWorkSpace().remove(window);
            }
        })
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.UserLockEditWindow, Ext.Window);
