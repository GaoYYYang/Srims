
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserGridPanel_ToolBar = function(store, selection, panelId){
    //fields
    this._panelId = panelId;
    this._store = store;
    this._selection = selection;
    this._user = selection.getSelected();
    var user = Srims.currentLoginLog.user;
    
    //controlls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加用户',
        handler: function(){
            Srims.users.UserAction.newUser();
        },
        hidden: !user.isSuper,
        tooltip: '<b>新建用户</b><br/>输入用户基本信息以新建用户'
    })
    this._buttonBasicInfoEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-user-basic-edit',
        text: '信息编辑',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.users.UserAction.basicInfoEditUser(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑用户基本信息</b><br/>修改所选用户的基本信息'
    })
    this._buttonPasswordReset = new Ext.Toolbar.Button({
        iconCls: 'icon-user-password-reset',
        text: '重置密码',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('重置用户的密码', '你确定要重置这个用户的密码吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.userID = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.users.UserService + '/ResetUserPassword',
                        scope: this,
                        params: _params,
                        success: function(){
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel) 
                                panel.getUserStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>重置密码</b><br/>重置用户的密码'
    })
    this._buttonPermissionEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-user-permission-edit',
        text: '权限编辑',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.users.UserAction.permissionEditUser(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑用户权限信息</b><br/>修改所选用户的基本信息'
    })
    this._buttonAppointCollegeAdministrator = new Ext.Toolbar.Button({
        iconCls: 'icon-user-permission-edit',
        text: '指定院系管理员',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.users.UserAction.appointCollegeAdministrator(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>指定院系管理员</b><br/>设置院系管理权限'
    })
    this._buttonTemporaryAuthorization = new Ext.Toolbar.Button({
        iconCls: 'icon-user-temporary-authorization',
        text: '临时授权',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.users.UserAction.UserTemporaryAuthorization(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>临时授权</b><br/>授予用户某些权限'
    })
    this._buttonRetractTemporaryAuthorization = new Ext.Toolbar.Button({
        iconCls: 'icon-user-temporary-authorization-cancel',
        text: '收回授权',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.users.UserAction.listTemporaryPermission(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>收回授权</b><br/>收回授予用户的某些权限'
    })
    this._buttonUserLock = new Ext.Toolbar.Button({
        iconCls: 'icon-user-lock',
        text: '用户锁定',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.users.UserAction.lockUser(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>用户锁定</b><br>锁定用户'
    })
    this._buttonUserCancelLock = new Ext.Toolbar.Button({
        iconCls: 'icon-user-cancel-lock',
        text: '取消锁定',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Ext.MessageBox.confirm('取消用户锁定', '你确定要取消对这个用户的锁定吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.userID = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.users.UserService + '/CancelLockUser',
                        scope: this,
                        params: _params,
                        success: function(){
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel) 
                                panel.getUserStore().load();
                        }
                    })
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>取消锁定</b><br>取消锁定用户'
    })
    this._buttonShowActiveUsers = new Ext.Toolbar.Button({
        iconCls: 'icon-activeuser-list',
        text: '当前在线用户',
        selection: this._selection,
        handler: function(){
            Srims.users.UserAction.listActiveUsers();
        },
        hidden: !user.isSuper,
        tooltip: '<b>当前在线用户</b><br>显示当前在线用户'
    })
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除用户', '你确定要删除这个用户吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.userID = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.users.UserService + '/Delete',
                        scope: this,
                        params: _params,
                        success: function(){
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel) 
                                panel.getUserStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除用户</b><br/>删除所选用户'
    })
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新用户列表'
    })
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    Srims.users.UserGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonShowActiveUsers, this._buttonBasicInfoEdit, this._buttonPasswordReset, this._buttonPermissionEdit, this._buttonAppointCollegeAdministrator, this._buttonTemporaryAuthorization, this._buttonRetractTemporaryAuthorization, this._buttonUserLock, this._buttonUserCancelLock, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonNew = this._buttonNew;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonBasicInfoEdit = this._buttonBasicInfoEdit;
    this._selection.buttonPasswordReset = this._buttonPasswordReset;
    this._selection.buttonPermissionEdit = this._buttonPermissionEdit;
    this._selection.buttonAppointCollegeAdministrator = this._buttonAppointCollegeAdministrator;
    this._selection.buttonUserLock = this._buttonUserLock;
    this._selection.buttonUserCancelLock = this._buttonUserCancelLock;
    this._selection.buttonShowUsersOnline = this._buttonShowUsersOnline;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonTemporaryAuthorization = this._buttonTemporaryAuthorization;
    this._selection.buttonRetractTemporaryAuthorization = this._buttonRetractTemporaryAuthorization;
    
    this._selection.hasPermission_ResetPassword = user.hasPermission_ResetUserPassword;
    //event methods
    this._onSelection_selectionChange = function(selection){
        var buttonBasicInfoEdit = selection.buttonBasicInfoEdit;
        var buttonPasswordReset = selection.buttonPasswordReset;
        var buttonPermissionEdit = selection.buttonPermissionEdit;
        var buttonAppointCollegeAdministrator = selection.buttonAppointCollegeAdministrator;
        var buttonUserLock = selection.buttonUserLock;
        var buttonUserCancelLock = selection.buttonUserCancelLock;
        var buttonDelete = selection.buttonDelete;
        var buttonTemporaryAuthorization = selection.buttonTemporaryAuthorization;
        var buttonRetractTemporaryAuthorization = selection.buttonRetractTemporaryAuthorization;
        
        var hasPermission_ResetUserPassword = selection.hasPermission_ResetPassword;
        
        if (selection.getCount() == 0) {
            buttonBasicInfoEdit.hide();
            buttonPasswordReset.hide();
            buttonPermissionEdit.hide();
            buttonAppointCollegeAdministrator.hide();
            buttonTemporaryAuthorization.hide();
            buttonRetractTemporaryAuthorization.hide();
            buttonUserLock.setVisible(false);
            buttonUserCancelLock.setVisible(false);
            buttonDelete.hide();
            return;
        }
        
        var user = selection.getSelected();
        
        buttonDelete.setVisible(user.get('hasPermission_DeleteUser'));
        buttonDelete.setDisabled(!user.get('canDeleteUser'));
        
        buttonUserLock.setVisible(user.get('hasPermission_EditUser') && !user.get('isLocked'));
        buttonUserCancelLock.setVisible(user.get('hasPermission_EditUser') && user.get('isLocked'));
        
        buttonPasswordReset.setVisible(hasPermission_ResetUserPassword);
        
        buttonBasicInfoEdit.setVisible(user.get('hasPermission_EditUser'));
        buttonBasicInfoEdit.setDisabled(!user.get('canEditUser'));
        
        buttonPermissionEdit.setVisible(user.get('hasPermission_EditUser'));
        buttonPermissionEdit.setDisabled(!user.get('canEditUser'));
        
        buttonAppointCollegeAdministrator.setVisible(user.get('hasPermission_EditUser'));
        buttonAppointCollegeAdministrator.setDisabled(!user.get('canEditUser'));
        
        buttonTemporaryAuthorization.setVisible(user.get('hasPermission_EditUser'));
        buttonTemporaryAuthorization.setDisabled(!user.get('canEditUser'));
        
        buttonRetractTemporaryAuthorization.setVisible(user.get('hasPermission_EditUser'));
        buttonRetractTemporaryAuthorization.setDisabled(!user.get('canEditUser'));
    };
    
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.users.UserGridPanel_ToolBar, Ext.Toolbar);
