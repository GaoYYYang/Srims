
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserBasicInformationEditWindow = function(id, user){

    this._user = user;
    this._title = user.isNew() ? "新建用户" : user.get('name');
    
    this._textFieldLoginID = new Ext.form.TextField({
        fieldLabel: '登陆ID',
        value: user.get('loginID'),
        allowBlank: false,
        width: 160
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '用户名',
        value: user.get('name'),
        allowBlank: false,
        width: 160
    });
    this._textFieldPassword = new Ext.form.TextField({
        fieldLabel: '密码',
        value: user.get('password'),
        allowBlank: !user.isNew(),
        blankText: '密码不能为空！',
        inputType: 'password',
        width: 160
    });
    this._textFieldConfirmPassword = new Ext.form.TextField({
        fieldLabel: '确认密码',
        value: user.get('password'),
        allowBlank: !user.isNew(),
        blankText: '密码不能为空！',
        validator: this.passwordValidate,
        inputType: 'password',
        width: 160
    });
    this._comboBoxUserRole = new Srims.component.EntityComboBox({
        fieldLabel: '所属用户组',
        store: new Srims.users.UserRoleStore(Srims.service.users.UserService + '/GetUserRoleByType', {
            userRoleType: user.get('userRoleType')
        }),
        displayField: 'name',
        value: user.get('userRole'),
        entityId: user.get('userRoleID'),
        editable: true,
        allowBlank: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 160
    });
    this._textFieldFax = new Ext.form.TextField({
        fieldLabel: '传真',
        value: user.get('fax'),
        width: 160
    });
    this._textFieldEmail = new Ext.form.TextField({
        fieldLabel: 'Email',
        value: user.get('email'),
        width: 160
    });
    this._textFieldOfficePhone = new Ext.form.TextField({
        fieldLabel: '办公电话',
        value: user.get('officePhone'),
        width: 160
    });
    this._textFieldMobilePhone = new Ext.form.TextField({
        fieldLabel: '移动电话',
        value: user.get('mobilePhone'),
        width: 160
    });
    this._textFieldHomePhone = new Ext.form.TextField({
        fieldLabel: '家庭电话',
        value: user.get('homePhone'),
        width: 160
    });
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        window: this
    });
    
    var columnOneItems = [this._textFieldLoginID, this._textFieldPassword, this._comboBoxUserRole, this._textFieldEmail, this._textFieldMobilePhone];
    var columnTwoItems = [this._textFieldName, this._textFieldConfirmPassword, this._textFieldFax, this._textFieldOfficePhone, this._textFieldHomePhone];
    Srims.users.UserBasicInformationEditWindow.superclass.constructor.call(this, {
        id: id,
        style: 'padding:5px',
        width: 600,
        height: 244,
        frame: true,
        closeAction: 'close',
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        title: this._title,
        iconCls: user.isNew() ? 'icon-new' : 'icon-user-basic-edit',
        items: [new Ext.Panel({
            title: '基本信息',
            layout: 'column',
            frame: true,
            items: [new Ext.Panel({
                width: 280,
                layout: 'form',
                border: false,
                items: columnOneItems
            }), new Ext.Panel({
                width: 280,
                layout: 'form',
                border: false,
                items: columnTwoItems
            })]
        })],
        buttons: [this._buttonSave]
    
    });
    
    this.assignValues = function(){
        this._user.set('loginID', this._textFieldLoginID.getValue());
        this._user.set('name', this._textFieldName.getValue());
        this._user.set('password', this._textFieldPassword.getValue());
        this._user.set('userRoleID', this._comboBoxUserRole.getValue());
        this._user.set('email', this._textFieldEmail.getValue());
        this._user.set('officePhone', this._textFieldOfficePhone.getValue());
        this._user.set('mobilePhone', this._textFieldMobilePhone.getValue());
        this._user.set('homePhone', this._textFieldHomePhone.getValue());
        this._user.set('fax', this._textFieldFax.getValue());
    };
    this.isValid = function(preventMark){
        result = true;
        result = this._textFieldLoginID.isValid(preventMark) && result;
        result = this._textFieldName.isValid(preventMark) && result;
        if (this._user.isNew()) 
            result = this._textFieldPassword.isValid(preventMark) && result;
        result = this._textFieldConfirmPassword.isValid(preventMark) && result;
        result = this._comboBoxUserRole.isValid(preventMark) && result;
        
        return result;
    };
    this.passwordValidate = function(){
        if (this._textFieldPassword.getValue() == this._textFieldConfirmPassword.getValue()) 
            return true;
        else 
            return false;
    };
    this.save = function(){
        var user = this._user;
        
        user.beginEdit();
        this.assignValues();
        user.commit();
        
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/Save',
            params: user.data,
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
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        })
    };
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        if (!window.isValid(false)) 
            return;
        if (!window.passwordValidate()) {
            Ext.Msg.show({
                title: '确认密码错误',
                msg: '二次密码输入不一致',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            })
            return false;
        }
        
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/IsUserExist',
            params: {
                loginID: window._textFieldLoginID.getValue(),
                userID: window._user.get('id') == undefined ? '' : window._user.get('id')
            },
            scope: this,
            success: function(response){
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.Msg.show({
                        title: '用户已存在',
                        msg: '该用户登陆ID已经存在，请重新输入！',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    })
                }
                else {
                    button.setText('正在保存');
                    button.disable();
                    
                    window.save();
                }
            }
        })
    };
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.UserBasicInformationEditWindow, Ext.Window);
