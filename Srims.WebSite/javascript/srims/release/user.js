
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.User = new Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'userRoleID',
    type: 'int',
    mapping: 'UserRoleID'
}, {
    name: 'userRole',
    type: 'string',
    mapping: 'UserRole'
}, {
    name: 'userRoleType',
    type: 'string',
    mapping: 'UserRoleType'
}, {
    name: 'loginID',
    type: 'string',
    mapping: 'LoginID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'password',
    type: 'string',
    mapping: 'Password'
}, {
    name: 'email',
    type: 'string',
    mapping: 'Email'
}, {
    name: 'homePhone',
    type: 'string',
    mapping: 'HomePhone'
}, {
    name: 'officePhone',
    type: 'string',
    mapping: 'OfficePhone'
}, {
    name: 'mobilePhone',
    type: 'string',
    mapping: 'MobilePhone'
}, {
    name: 'fax',
    type: 'string',
    mapping: 'Fax'
}, {
    name: 'isSuper',
    type: 'boolean',
    mapping: 'IsSuper',
    convert: Boolean.toBoolean
}, {
    name: 'allowMultiLogin',
    type: 'boolean',
    mapping: 'AllowMultiLogin',
    convert: Boolean.toBoolean
}, {
    name: 'isCustomPermission',
    type: 'boolean',
    mapping: 'IsCustomPermission',
    convert: Boolean.toBoolean
}, {
    name: 'extClientState',
    type: 'string',
    mapping: 'ExtClientState'
}, {
    name: 'normalPermission',
    type: 'string',
    mapping: 'NormalPermission'
}, {
    name: 'isLocked',
    type: 'boolean',
    mapping: 'IsLocked',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowUser',
    type: 'boolean',
    mapping: 'HasPermission_ShowUser',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditUser',
    type: 'boolean',
    mapping: 'HasPermission_EditUser',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DeleteUser',
    type: 'boolean',
    mapping: 'HasPermission_DeleteUser',
    convert: Boolean.toBoolean
}, {
    name: 'canShowUser',
    type: 'boolean',
    mapping: 'CanShowUser',
    convert: Boolean.toBoolean
}, {
    name: 'canEditUser',
    type: 'boolean',
    mapping: 'CanEditUser',
    convert: Boolean.toBoolean
}, {
    name: 'canDeleteUser',
    type: 'boolean',
    mapping: 'CanDeleteUser',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.users.User);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.users.UserStore.superclass.constructor.call(this, new Srims.users.UserXmlReader(), load_url, params);
    }
});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.users.UserXmlReader.superclass.constructor.call(this, Srims.users.User);
    }
});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRole = new Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}])
Srims.data.Entity.apply(Srims.users.UserRole);
 
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.users.UserRoleStore.superclass.constructor.call(this, new Srims.users.UserRoleXmlReader(), load_url, params);
    }
});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.users.UserRoleXmlReader.superclass.constructor.call(this, Srims.users.UserRole);
    }
});


if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleType = new function(){
};

Srims.users.UserRoleType.Administrator = 'Administrator';
Srims.users.UserRoleType.Expert = 'Expert';

if (!Srims.users)
	Ext.namespace('Srims.users');

Srims.users.UserPermissionItem = function() {
}
Srims.users.UserPermissionItem.store = [['ManageFund', '经费信息管理'], ['ManageType', '分类信息管理'], ['ManageFinishProject', '结项项目管理'], ['ManagePaper', '论文信息管理'], ['ManagePatent', '专利信息管理'], ['ManageScienceAward', '理科奖励信息管理'],['ManageLiteralAward', '文科奖励信息管理'], ['ManageBase', '基地信息管理'], ['ManageAnnouncement', '通知信息管理'], ['ManageFinance', '财务管理权限'], ['MangageSubjectLevel', '学科管理'], ['Statistic', '统计'], ['ExportFinanceData', '导出财务数据'], ['ExpertShow', '查看专家'], ['ExpertEdit', '编辑专家'], ['ExpertLinkWayEdit', '编辑专家联系方式'], ['ManageStamp', '管理文印'], ['ResetUserPassword', '重置用户密码'], ['StampDepartmentPrincipal', '文印部门负责人']]
Srims.users.UserPermissionItem.render = function(value) {
	switch (value) {
		case 'ManageFund':
			return '管理经费信息';
		case 'ManageType':
			return '管理分类信息';
		case 'ManageFinishProject':
			return '管理结项项目';
		case 'ManagePaper':
			return '管理论文信息';
		case 'ManagePatent':
			return '管理专利信息';
		case 'ManageLiteralAward':
			return '管理文科奖励信息';
		case 'ManageScienceAward':
			return '管理理科奖励信息';
		case 'ManageBase':
			return '管理基地信息';
		case 'ManageAnnouncement':
			return '管理通知信息';
		case 'ManageFinance':
			return '管理财务';
		case 'MangageSubjectLevel':
			return '管理学科';
		case 'Statistic':
			return '统计';
		case 'ExportFinanceData':
			return '导出财务数据';
		case 'ExpertShow':
			return '查看专家';
		case 'ExpertEdit':
			return '编辑专家';
		case 'ExpertLinkWayEdit':
			return '编辑专家联系方式';
		case 'ManageStamp':
			return '管理文印';
		case 'ResetUserPassword':
			return '重置用户密码';
		case 'StampDepartmentPrincipal':
			return '文印部门负责人';
		default:
			return value;
	}
}
if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserGridPanel = function(id, userStore, title, iconCls){
    //fields
    this._userStore = userStore;
    this._userStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    
    this._columnModel = new Srims.users.UserGridPanel_ColumnModel();
    this._filters = new Srims.users.UserGridPanel_GridFilters();
    this._toolbar = new Srims.users.UserGridPanel_ToolBar(this._userStore, this._selections, id);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的用户'
    });
    
    //public methods
    this.getUserStore = function(){
        return this._userStore;
    };
    
    //constructor
    Srims.users.UserGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._userStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._userStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._userStore.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var user = grid.getStore().getAt(rowIndex);
        Srims.users.UserAction.basicInfoEditUser(user);
    };
    }
Ext.extend(Srims.users.UserGridPanel, Ext.grid.GridPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserGridPanel_ColumnModel = function(){
    Srims.users.UserGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "用户名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false
    }, {
        header: "登陆账号",
        dataIndex: 'loginID',
        sortable: true,
        hidden: false
    }, {
        header: "电子邮箱",
        dataIndex: 'email',
        hidden: false
    }, {
        header: "家庭电话",
        dataIndex: 'homePhone',
        hidden: false
    }, {
        header: "移动电话",
        dataIndex: 'mobilePhone',
        hidden: false
    }, {
        header: "办公电话",
        dataIndex: 'officePhone',
        hidden: false
    }, {
        header: "所属用户组",
        dataIndex: 'userRole',
        hidden: false
    }, {
        header: "是否自定义权限",
        dataIndex: 'isCustomPermission',
        hidden: false,
        renderer: Boolean.render
    }, {
        header: "姓名全拼",
        dataIndex: 'nameSpell',
        hidden: true
    }, {
        header: "传真",
        dataIndex: 'fax',
        hidden: true
    }, {
        header: "是否超级用户",
        dataIndex: 'isSuper',
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "是否被锁定",
        dataIndex: 'isLocked',
        hidden: true,
        renderer: Boolean.render
    }]);
    this.defaultSortable = false;
};
Ext.extend(Srims.users.UserGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserGridPanel_GridFilters = function(){
    Srims.users.UserGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'loginID'
        }, {
            type: 'list',
            labelField: 'value',
            dataIndex: 'userRole',
            store: new Srims.data.IDValueRecordStore(Srims.service.users.UserService + '/GetUserRolesForFilter'),
            phpmode: true
        }, {
            type: 'boolean',
            dataIndex: 'isSuper'
        }]
    })
};
Ext.extend(Srims.users.UserGridPanel_GridFilters, Ext.grid.GridFilters);


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

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel = function(id, user){
    this._user = user;
    this._permissionManage = new Srims.users.UserPermissionEditPanel_PermissionManage(user, this);
    this._customPermission = new Srims.users.UserPermissionEditPanel_CustomPermission(user);
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        panel: this
    });
    
    Srims.users.UserPermissionEditPanel.superclass.constructor.call(this, {
        id: id,
        closable: true,
        title: user.get('name') + '权限编辑',
        labelWidth: 80,
        frame: true,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        deferHeight: false,
        iconCls: 'icon-user-permission-edit',
        items: [this._permissionManage, this._customPermission],
        buttons: [this._buttonSave]
    });
    
    //methods
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/SaveForPermission',
            params: this.getParams(),
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
    }
    this.getParams = function(){
        var params = {};
        this._permissionManage.buildParams(params);
        this._customPermission.buildParams(params);
        params.UserID = this._user.get('id');
        return params;
    }
    this.clearParams = function(){
        this._customPermission.clearParams();
    }
    //event
    this._permissionManage._checkBoxIsCustomPower.on('check', check);
    
    function check(checkbox, checked){
        var panel = checkbox.panel;
        if (!checked) {
            Ext.Ajax.request({
                url: Srims.service.users.UserService + '/ClearUserAllPermissions',
                params: {
                    userID: user.get('id')
                },
                scope: this,
                success: function(){
                    panel.clearParams();
                }
            })
        }
        this.panel._customPermission.setDisabled(!checked);
    }
    this._onButtonSave_Click = function(button, e){
        var panel = button.panel;
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.UserPermissionEditPanel, Ext.Panel, {});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_PermissionManage = function(user, panel){
    this._user = user;
    this._checkBoxAllowMultiLogin = new Ext.form.Checkbox({
        fieldLabel: '允许多人登陆',
        checked: user.get('allowMultiLogin')
    });
    this._checkBoxIsSuper = new Ext.form.Checkbox({
        fieldLabel: '是否超级用户',
        checked: user.get('isSuper'),
        disabled: user.get('userRoleType') == Srims.users.UserRoleType.Expert
    });
    this._checkBoxIsCustomPower = new Ext.form.Checkbox({
        fieldLabel: '自定义权限',
        checked: user.get('isCustomPermission'),
        panel: panel,
        disabled: user.get('userRoleType') == Srims.users.UserRoleType.Expert
    });
    
    Srims.users.UserPermissionEditPanel_PermissionManage.superclass.constructor.call(this, {
        collapsible: true,
        title: '用户权限管理',
        autoHeight: true,
        frame: true,
        layout: 'form',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            width: 600,
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                width: 180,
                items: [this._checkBoxAllowMultiLogin]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                width: 180,
                items: [this._checkBoxIsSuper]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: [this._checkBoxIsCustomPower]
            })]
        })]
    })
    
    //method
    this.buildParams = function(params){
        params.AllowMultiLogin = this._checkBoxAllowMultiLogin.getValue();
        params.IsSuper = this._checkBoxIsSuper.getValue();
        params.IsCustomPermission = this._checkBoxIsCustomPower.getValue();
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_PermissionManage, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_CustomPermission_PermissionNormal = function(user){
    this._user = user;
    this._checkBoxPowerItem = new Srims.component.CheckBoxGroup({
        hideLabel: true,
        cls: 'srims-checkboxGroup-userPermission',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.users.UserPermissionItem.store, user.get('normalPermission'))
    })
    Srims.users.UserPermissionEditPanel_CustomPermission_PermissionNormal.superclass.constructor.call(this, {
        collapsible: true,
        title: '一般权限',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._checkBoxPowerItem]
    })
    
    this.buildParams = function(params){
        params.customPermission_PermissionNormal = this._checkBoxPowerItem.getSelecetedValue();
    }
    this.clearParams = function(){
        this._checkBoxPowerItem.reset();
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission_PermissionNormal, Ext.form.FormPanel);


if (!Srims.users) 
    Ext.namespace('Srims.users');
Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType = function(user){

    this._user = user;
    this._hasPermissionShow = new Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Show(user);
    this._hasPermissionEdit = new Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Edit(user);
    
    Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType.superclass.constructor.call(this, {
        title: '项目管理权限',
        frame: true,
        layout: 'column',
        labelWidth: 150,
        items: [this._hasPermissionShow, this._hasPermissionEdit]
    })
    
    this.buildParams = function(params){
        this._hasPermissionShow.buildParams(params);
        this._hasPermissionEdit.buildParams(params);
    }
    this.clearParams = function(){
        this._hasPermissionShow.clearParams();
        this._hasPermissionEdit.clearParams();
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType, Ext.Panel, {});


if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Show = function(user){
    this._user = user;
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        width: 475,
        height: 460,
        autoScroll: true,
        checkModel: 'cascade',
        onlyLeafCheckable: false,
        animate: true,
        loader: new Ext.tree.TreeLoader({
            dataUrl: Srims.service.users.UserService + '/GetDataForTreePermissionShow',
            baseAttrs: {
                uiProvider: Ext.tree.TreeCheckNodeUI
            },
            baseParams: {
                userID: user.get('id')
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            id: '0',
            text: '项目类型-查看权限'
        })
    })
    tree.expandAll();
    Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Show.superclass.constructor.call(this, {
        frame: true,
        labelWidth: 150,
        items: tree
    })
    function setAllChildNodeCheckedToFlase(node, checked){
        node.ui.toggleCheck(checked);
        node.attributes.checked = checked;
        
        var childNodes = node.childNodes;
        if (childNodes.length == 0) 
            return;
        
        for (var i = 0; i < childNodes.length; i++) {
            childNodes[i].ui.toggleCheck(false);
            childNodes[i].attributes.checked = false;
            setAllChildNodeCheckedToFlase(childNodes[i], false);
        }
    }
    this.buildParams = function(params){
        params.typeID_hasPermissionShow = '';
        
        var rankNodes = tree.root.childNodes;
        params.allHorizontalProject_PermissionShow = rankNodes[0].attributes.checked;
        params.allVerticalProject_PermissionShow = rankNodes[1].attributes.checked;
        
        if (rankNodes.length < 3) 
            return;
        for (i = 2; i < rankNodes.length; i++) {
            var typeNodes = rankNodes[i].childNodes;
            if (typeNodes == null) 
                continue;
            for (j = 0; j < typeNodes.length; j++) {
                if (typeNodes[j].attributes.checked) 
                    params.typeID_hasPermissionShow += typeNodes[j].id + ',';
            }
        }
    }
    this.clearParams = function(){
        setAllChildNodeCheckedToFlase(tree.root, false);
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Show, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Edit = function(user){
    this._user = user;
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        width: 475,
        height: 460,
        autoScroll: true,
        checkModel: 'cascade',
        onlyLeafCheckable: false,
        animate: true,
        loader: new Ext.tree.TreeLoader({
            dataUrl: Srims.service.users.UserService + '/GetDataForTreePermissionEdit',
            baseAttrs: {
                uiProvider: Ext.tree.TreeCheckNodeUI
            },
            baseParams: {
                userID: user.get('id')
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            id: '0',
            text: '项目类型-编辑权限'
        })
    })
    tree.expandAll();
    Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Edit.superclass.constructor.call(this, {
        frame: true,
        labelWidth: 150,
        items: tree
    })
    function setAllChildNodeCheckedToFlase(node, checked){
        node.ui.toggleCheck(checked);
        node.attributes.checked = checked;
        
        var childNodes = node.childNodes;
        if (childNodes.length == 0) 
            return;
        
        for (var i = 0; i < childNodes.length; i++) {
            childNodes[i].ui.toggleCheck(false);
            childNodes[i].attributes.checked = false;
            setAllChildNodeCheckedToFlase(childNodes[i], false);
        }
    }
    this.buildParams = function(params){
        params.typeID_hasPermissionEdit = '';
        
        var rankNodes = tree.root.childNodes;
        params.allHorizontalProject_PermissionEdit = rankNodes[0].attributes.checked;
        params.allVerticalProject_PermissionEdit = rankNodes[1].attributes.checked;
        
        if (rankNodes.length < 3) 
            return;
        for (i = 2; i < rankNodes.length; i++) {
            var typeNodes = rankNodes[i].childNodes;
            if (typeNodes == null) 
                continue;
            for (j = 0; j < typeNodes.length; j++) {
                if (typeNodes[j].attributes.checked) 
                    params.typeID_hasPermissionEdit += typeNodes[j].id + ',';
            }
        }
    }
    this.clearParams = function(){
        setAllChildNodeCheckedToFlase(tree.root, false);
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType_Edit, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserPermissionEditPanel_CustomPermission = function(user){
    this._user = user;
    this._permissionNormal = new Srims.users.UserPermissionEditPanel_CustomPermission_PermissionNormal(user);
    this._permissionByType = new Srims.users.UserPermissionEditPanel_CustomPermission_PermissionByType(user);
    
    Srims.users.UserPermissionEditPanel_CustomPermission.superclass.constructor.call(this, {
        collapsible: true,
        title: '自定义权限',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        disabled: !user.get('isCustomPermission'),
        titleCollapse: true,
        items: [this._permissionNormal, this._permissionByType]
    })
    
    this.buildParams = function(params){
        this._permissionNormal.buildParams(params);
        this._permissionByType.buildParams(params);
    }
    this.clearParams = function(){
        this._permissionNormal.clearParams();
        this._permissionByType.clearParams();
    }
}
Ext.extend(Srims.users.UserPermissionEditPanel_CustomPermission, Ext.Panel, {});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserAppointCollegeAdministratorGridPanel = function(id, user){
    this._user = user;
    this._selections = new Ext.grid.RowSelectionModel();
    this._store = new Ext.data.Store({
        url: Srims.service.users.UserService + '/GetDataForAppointCollegeAdministrator',
        baseParams: {
            userID: user.get('id')
        },
        reader: new Ext.data.XmlReader({
            record: 'AppointCollegeAdministrator'
        }, Srims.users.AppointCollegeAdministrator)
    })
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的学科'
    })
    
    this._checkColumnManageAllHorizontalProjects = new Ext.grid.CheckColumn({
        header: "管理所有横向项目",
        dataIndex: 'manageAllHorizontalProjects'
    })
    this._checkColumnManageAllVerticalProjects = new Ext.grid.CheckColumn({
        header: "管理所有纵向项目",
        dataIndex: 'manageAllVerticalProjects'
    })
    this._checkColumnScienceAward = new Ext.grid.CheckColumn({
        header: "理科奖励",
        dataIndex: 'manageScienceAward'
    })
    this._checkColumnLiteralAward = new Ext.grid.CheckColumn({
        header: "文科奖励",
        dataIndex: 'manageLiteralAward'
    })
    this._checkColumnPaper = new Ext.grid.CheckColumn({
        header: "论文",
        dataIndex: 'managePaper'
    })
    this._checkColumnPatent = new Ext.grid.CheckColumn({
        header: "专利",
        dataIndex: 'managePatent'
    })
    this._columnModel = new Ext.grid.ColumnModel([{
        id: 'college',
        header: "学院",
        dataIndex: 'deparmentName'
    }, this._checkColumnManageAllHorizontalProjects, this._checkColumnManageAllVerticalProjects, this._checkColumnLiteralAward, this._checkColumnScienceAward, this._checkColumnPaper, this._checkColumnPatent])
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        panel: this
    });
    
    Srims.users.UserAppointCollegeAdministratorGridPanel.superclass.constructor.call(this, ({
        store: this._store,
        iconCls: 'icon-user-permission-edit',
        cm: this._columnModel,
        sm: this._selections,
        stateful: true,
        closable: true,
        border: false,
        title: '指定' + this._user.get('name') + '院系管理权限',
        frame: true,
        view: this._view,
        region: 'center',
        buttonAlign: 'center',
        plugins: [this._checkColumnManageAllHorizontalProjects, this._checkColumnManageAllVerticalProjects, this._checkColumnScienceAward, this._checkColumnLiteralAward, this._checkColumnPaper, this._checkColumnPatent],
        clicksToEdit: 1,
        buttons: [this._buttonSave]
    }))
    this._store.load();
    
    //methods
    this.getStore = function(){
        return this._store;
    }
    this.getCheckBoxSelectedValues = function(){
        var store = this._store;
        var storeCount = store.getCount();
        var values = '';
        
        for (i = 0; i < storeCount; i++) {
            var record = store.getAt(i);
            values = values + record.get('deparmentID') + ',';
            
            if (record.get('manageAllHorizontalProjects')) 
                values = values + '1,';
            else 
                values = values + '0,';
            if (record.get('manageAllVerticalProjects')) 
                values = values + '1,';
            else 
                values = values + '0,';
            if (record.get('manageScienceAward')) 
                values = values + '1,';
            else 
                values = values + '0,';
            if (record.get('managePaper')) 
                values = values + '1,';
            else 
                values = values + '0,';
            if (record.get('managePatent')) 
                values = values + '1,';
            else 
                values = values + '0,';
            if (record.get('manageLiteralAward')) 
                values = values + '1';
            else 
                values = values + '0';
            
            values = values + ';';
        }
        return values;
    }
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/SaveForCollegeRelatedPermission',
            scope: this,
            params: {
                userID: user.get('id'),
                permissionValues: this.getCheckBoxSelectedValues()
            },
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
    }
    //event methods
    this._onButtonSave_Click = function(button, e){
        var panel = button.panel;
        
        button.setText('正在保存');
        button.disable();
        
        panel.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.UserAppointCollegeAdministratorGridPanel, Ext.grid.EditorGridPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.AppointCollegeAdministrator = Ext.data.Record.create([{
    name: 'deparmentID',
    mapping: 'DeparmentID',
    type: 'string'
}, {
    name: 'deparmentName',
    mapping: 'DeparmentName',
    type: 'string'
}, {
    name: 'manageAllHorizontalProjects',
    mapping: 'ManageAllHorizontalProjects',
    type: 'boolean',
    convert: Boolean.toBoolean
}, {
    name: 'manageAllVerticalProjects',
    mapping: 'ManageAllVerticalProjects',
    type: 'boolean',
    convert: Boolean.toBoolean
}, {
    name: 'manageScienceAward',
    mapping: 'ManageScienceAward',
    type: 'boolean',
    convert: Boolean.toBoolean
}, {
    name: 'manageLiteralAward',
    mapping: 'ManageLiteralAward',
    type: 'boolean',
    convert: Boolean.toBoolean
},{
    name: 'managePaper',
    mapping: 'ManagePaper',
    type: 'boolean',
    convert: Boolean.toBoolean
}, {
    name: 'managePatent',
    mapping: 'ManagePatent',
    type: 'boolean',
    convert: Boolean.toBoolean
}]);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryAuthorizationPanel = function(id, user){
    this._user = user;
    this._normalPermissionPanel = new Srims.users.UserTemporaryAuthorizationPanel_NormalPermission();
    this._manageProjectsByTypePanel = new Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType();
    this._permissionEndDatePanel = new Srims.users.UserTemporaryAuthorizationPanel_EndDate();
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存',
        panel: this
    });
    
    Srims.users.UserTemporaryAuthorizationPanel.superclass.constructor.call(this, {
        id: id,
        closable: true,
        title: '临时授权于用户' + user.get('name'),
        labelWidth: 80,
        frame: true,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        deferHeight: false,
        iconCls: 'icon-user-permission-edit',
        items: [this._permissionEndDatePanel, this._normalPermissionPanel, this._manageProjectsByTypePanel],
        buttons: [this._buttonSave]
    });
    
    //methods
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/SaveForTemporaryAuthorizationPermissions',
            params: this.getParams(),
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
    }
    this.getParams = function(){
        var params = {};
        this._normalPermissionPanel.buildParams(params);
        this._manageProjectsByTypePanel.buildParams(params);
        this._permissionEndDatePanel.buildParams(params);
        if (params.accreditDateTime != null && params.accreditDateTime != '') 
            params.accreditDateTime = params.accreditDateTime.format("Y-m-d H:i:s");
        params.permissionEndDate = params.permissionEndDate.format("Y-m-d H:i:s");
        params.UserID = this._user.get('id');
        return params;
    }
    this.isValid = function(preventMark){
        return this._permissionEndDatePanel.isValid(preventMark);
    }
    this.isDateValidate = function(){
        return this._permissionEndDatePanel._dateFieldEndDate.getValue() >= this._permissionEndDatePanel._dateFieldAccreditDateTime.getValue();
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var panel = button.panel;
        if (!panel.isValid(false)) 
            return;
        if (!panel.isDateValidate()) {
            Ext.Msg.show({
                title: '权限有效期设置错误',
                msg: '权限终止时间不能小于权限开始时间！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            })
            return false;
        }
        
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel, Ext.Panel, {});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryAuthorizationPanel_NormalPermission = function(){
    this._checkBoxPowerItem = new Srims.component.CheckBoxGroup({
        hideLabel: true,
        cls: 'srims-checkboxGroup-userPermission',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.users.UserPermissionItem.store)
    })
    Srims.users.UserTemporaryAuthorizationPanel_NormalPermission.superclass.constructor.call(this, {
        collapsible: true,
        title: '一般权限',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._checkBoxPowerItem]
    })
    
    this.buildParams = function(params){
        params.customPermission_PermissionNormal = this._checkBoxPowerItem.getSelecetedValue();
    }
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel_NormalPermission, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType = function(){
    this._manageProjectsByType_Show = new Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Show();
    this._manageProjectsByType_Edit = new Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Edit();
    
    Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType.superclass.constructor.call(this, {
        title: '项目管理权限',
        frame: true,
        layout: 'column',
        labelWidth: 150,
        items: [this._manageProjectsByType_Show, this._manageProjectsByType_Edit]
    })
    
    this.buildParams = function(params){
        this._manageProjectsByType_Show.buildParams(params);
        this._manageProjectsByType_Edit.buildParams(params);
    }
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType, Ext.Panel, {});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Show = function(){
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        width: 475,
        height: 460,
        autoScroll: true,
        checkModel: 'cascade',
        onlyLeafCheckable: false,
        animate: true,
        loader: new Ext.tree.TreeLoader({
            dataUrl: Srims.service.users.UserService + '/GetDataForTreeUserTemporaryAuthorization',
            baseAttrs: {
                uiProvider: Ext.tree.TreeCheckNodeUI
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            id: '0',
            text: '项目类型-查看权限'
        })
    })
    tree.expandAll();
    Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Show.superclass.constructor.call(this, {
        frame: true,
        labelWidth: 150,
        items: tree
    })
    this.buildParams = function(params){
        params.typeID_hasPermissionShow = '';
        
        var rankNodes = tree.root.childNodes;
        params.allHorizontalProject_PermissionShow = rankNodes[0].attributes.checked;
        params.allVerticalProject_PermissionShow = rankNodes[1].attributes.checked;
        
        if (rankNodes.length < 3) 
            return;
        for (i = 2; i < rankNodes.length; i++) {
            var typeNodes = rankNodes[i].childNodes;
            if (typeNodes == null) 
                continue;
            for (j = 0; j < typeNodes.length; j++) {
                if (typeNodes[j].attributes.checked) 
                    params.typeID_hasPermissionShow += typeNodes[j].id + ',';
            }
        }
    }
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Show, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Edit = function(){
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        width: 475,
        height: 460,
        autoScroll: true,
        checkModel: 'cascade',
        onlyLeafCheckable: false,
        animate: true,
        loader: new Ext.tree.TreeLoader({
            dataUrl: Srims.service.users.UserService + '/GetDataForTreeUserTemporaryAuthorization',
            baseAttrs: {
                uiProvider: Ext.tree.TreeCheckNodeUI
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            id: '0',
            text: '项目类型-编辑权限'
        })
    })
    tree.expandAll();
    Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Edit.superclass.constructor.call(this, {
        frame: true,
        labelWidth: 150,
        items: tree
    })
    this.buildParams = function(params){
        params.typeID_hasPermissionEdit = '';
        
        var rankNodes = tree.root.childNodes;
        params.allHorizontalProject_PermissionEdit = rankNodes[0].attributes.checked;
        params.allVerticalProject_PermissionEdit = rankNodes[1].attributes.checked;
        
        if (rankNodes.length < 3) 
            return;
        for (i = 2; i < rankNodes.length; i++) {
            var typeNodes = rankNodes[i].childNodes;
            if (typeNodes == null) 
                continue;
            for (j = 0; j < typeNodes.length; j++) {
                if (typeNodes[j].attributes.checked) 
                    params.typeID_hasPermissionEdit += typeNodes[j].id + ',';
            }
        }
    }
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel_ManageProjectsByType_Edit, Ext.form.FormPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');


Srims.users.UserTemporaryAuthorizationPanel_EndDate = function(){
    this._dateFieldAccreditDateTime = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 120
    })
    this._dateFieldEndDate = new Ext.form.DateField({
        fieldLabel: '有效期至',
        allowBlank: false,
        width: 120
    })
    Srims.users.UserTemporaryAuthorizationPanel_EndDate.superclass.constructor.call(this, ({
        title: '设置权限有效期',
        frame: true,
        layout: 'column',
        items: [new Ext.Panel({
            width: 280,
            layout: 'form',
            border: false,
            items: [this._dateFieldAccreditDateTime]
        }), new Ext.Panel({
            width: 280,
            layout: 'form',
            border: false,
            items: [this._dateFieldEndDate]
        })]
    }))
    //methods
    this.buildParams = function(params){
        params.accreditDateTime = this._dateFieldAccreditDateTime.getValue();
        params.permissionEndDate = this._dateFieldEndDate.getValue();
    }
    this.isValid = function(preventMark){
        return this._dateFieldEndDate.isValid(preventMark);
    }
}
Ext.extend(Srims.users.UserTemporaryAuthorizationPanel_EndDate, Ext.Panel, {});

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

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryPermission = Ext.data.Record.create([{
    name: 'id',
    mapping: 'ID',
    type: 'int'
}, {
    name: 'permissionID',
    mapping: 'PermissionID',
    type: 'int'
}, {
    name: 'permissionName',
    mapping: 'PermissionName',
    type: 'string'
}, {
    name: 'accreditDateTime',
    mapping: 'AccreditDateTime',
    type: 'date'
}, {
    name: 'endDateTime',
    mapping: 'EndDateTime',
    type: 'date'
}]);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryPermissionStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.users.UserTemporaryPermissionStore.superclass.constructor.call(this, new Srims.users.UserTemporaryPermissionXmlReader(), load_url, params);
    }
});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserTemporaryPermissionXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.users.UserTemporaryPermissionXmlReader.superclass.constructor.call(this, Srims.users.UserTemporaryPermission);
    }
});

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRetractTemporaryAuthorizationGridPanel = function(id, permissionStore, title, iconCls){
    //fields
    this._permissionStore = permissionStore;
    this._permissionStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.users.UserRetractTemporaryAuthorizationGridPanel_ColumnModel();
    this._toolbar = new Srims.users.UserRetractTemporaryAuthorizationGridPanel_ToolBar(this._permissionStore, this._selections, id);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该用户没有临时权限'
    });
    
    //public methods
    this.getpermissionStore = function(){
        return this._permissionStore;
    };
    
    //constructor
    Srims.users.UserRetractTemporaryAuthorizationGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._permissionStore,
        sm: this._selections,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        colModel: this._columnModel,
        loadMask: true,
        view: this._view,
        tbar: this._toolbar
    });
    this._permissionStore.load();
}
Ext.extend(Srims.users.UserRetractTemporaryAuthorizationGridPanel, Ext.grid.GridPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRetractTemporaryAuthorizationGridPanel_ColumnModel = function(){
    Srims.users.UserRetractTemporaryAuthorizationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    },{
        header: "permissionID",
        hidden: true,
        hideable: false
    }, {
        header: "权限",
        dataIndex: 'permissionName',
        hidden: false,
        renderer: Srims.users.UserPermissionItem.render
    }, {
        header: "开始时间",
        dataIndex: 'accreditDateTime',
        hidden: false,
        renderer: Date.render
    }, {
        header: "终止时间",
        dataIndex: 'endDateTime',
        hidden: false,
        renderer: Date.render
    }]);
    this.defaultSortable = false;
};
Ext.extend(Srims.users.UserRetractTemporaryAuthorizationGridPanel_ColumnModel, Ext.grid.ColumnModel);


if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRetractTemporaryAuthorizationGridPanel_ToolBar = function(store, selection, panelId){
    //fields
    this._panelId = panelId;
    this._store = store;
    this._selection = selection;
    this._permission = selection.getSelected();
    
    //controlls
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '收回权限',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除权限', '你确定要删除这项权限吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.id = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.users.UserService + '/DeleteTemporaryPermission',
                        scope: this,
                        params: _params,
                        success: function(){
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel) 
                                panel.getpermissionStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除权限</b><br/>删除所选用户权限'
    })
    Srims.users.UserRetractTemporaryAuthorizationGridPanel_ToolBar.superclass.constructor.call(this, {
        height: 25,
        items: [this._buttonDelete]
    });
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    //event methods
    this._onSelection_selectionChange = function(selection){
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }
        
        buttonDelete.show();
    };
    
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.users.UserRetractTemporaryAuthorizationGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.ActiveUsersGridPanel = function(id, userStore, title, iconCls){
    //fields
    this._userStore = userStore;
    this._userStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    
    this._columnModel = new Srims.users.UserGridPanel_ColumnModel();
    this._filters = new Srims.users.UserGridPanel_GridFilters();
    this._toolbar = new Srims.users.ActiveUsersGridPanel_ToolBar(this._userStore, this._selections, id);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的用户'
    });
    
    //public methods
    this.getUserStore = function(){
        return this._userStore;
    };
    
    //constructor
    Srims.users.ActiveUsersGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._userStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._userStore,
            plugins: this._filters,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._userStore.load();
}
Ext.extend(Srims.users.ActiveUsersGridPanel, Ext.grid.GridPanel);

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.ActiveUsersGridPanel_ToolBar = function(store, selection, panelId){
    //fields
    this._panelId = panelId;
    this._store = store;
    this._selection = selection;
    this._permission = selection.getSelected();
    
    //controlls
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '注销',
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('注销用户', '你确定要注销这个用户吗？', function(buttonId){
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.userID = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.users.UserService + '/LogoutUser',
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
    Srims.users.ActiveUsersGridPanel_ToolBar.superclass.constructor.call(this, {
        height: 25,
        items: [this._buttonDelete]
    });
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    //event methods
    this._onSelection_selectionChange = function(selection){
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }
        
        buttonDelete.show();
    };
    
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.users.ActiveUsersGridPanel_ToolBar, Ext.Toolbar);


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

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserAction = function(){
}
Srims.users.UserAction.listUser = function(showNewWindow){
    panelId = 'UserGridPanel';
    userStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    if (panel) {
        userStore = panel.getUserStore();
    }
    else {
        userStore = new Srims.users.UserStore(Srims.service.users.UserService + '/Query');
        panel = new Srims.users.UserGridPanel(panelId, userStore, '用户模块', 'icon-user-list');
        Srims.WorkSpace.addPanel(panel);
    }
    
    if (showNewWindow) 
        Srims.users.UserAction.newUser();
};
Srims.users.UserAction.basicInfoEditUser = function(user){
    var id = 'EditBasicInfoUserWindow' + user.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) 
        window = new Srims.users.UserBasicInformationEditWindow(id, user);
    
    window.show();
};
Srims.users.UserAction.permissionEditUser = function(user){
    var panelId = 'EditPermissionUserPanel' + user.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        panel = new Srims.users.UserPermissionEditPanel(panelId, user);
        Srims.WorkSpace.addPanel(panel);
    }
};
Srims.users.UserAction.newUser = function(){
    var id = 'NewUserWindow';
    var window = Ext.getCmp(id);
    
    if (!window) {
        user = new Srims.users.User({});
        window = new Srims.users.UserBasicInformationEditWindow(id, user);
    }
    
    window.show();
};
Srims.users.UserAction.appointCollegeAdministrator = function(user){
    var panelId = 'AppointCollegeAdministratorGridPanel' + user.get('id');
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        panel = new Srims.users.UserAppointCollegeAdministratorGridPanel(panelId, user);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.users.UserAction.UserTemporaryAuthorization = function(user){
    var panelId = 'UserTemporaryAuthorization' + user.get('id');
    var panel = Srims.WorkSpace.active(panel);
    
    if (!panel) {
        panel = new Srims.users.UserTemporaryAuthorizationPanel(panelId, user);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.users.UserAction.listTemporaryPermission = function(user){
    panelId = 'TemporaryPermissionGridPanel' + user.get('id');
    temporaryPermissionStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (panel) {
        temporaryPermissionStore = panel.getpermissionStore();
    }
    else {
        temporaryPermissionStore = new Srims.users.UserTemporaryPermissionStore(Srims.service.users.UserService + '/GetTemporaryUserPermissions', {
            userID: user.get('id')
        });
        panel = new Srims.users.UserRetractTemporaryAuthorizationGridPanel(panelId, temporaryPermissionStore, user.get('name') + '的临时权限', 'icon-userTemporary-list');
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.users.UserAction.lockUser = function(user){
    var panelId = 'LockUserEditWindow' + user.get('id');
    var window = Ext.getCmp(panelId);
    
    if (!window) {
        window = new Srims.users.UserLockEditWindow(panelId, user);
    }
    window.show();
}
Srims.users.UserAction.listActiveUsers = function(){
    panelId = 'ActiveUserGridPanel';
    userStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    if (panel) {
        userStore = panel.getUserStore();
    }
    else {
        userStore = new Srims.users.UserStore(Srims.service.users.UserService + '/ActiveUsersQuery');
        panel = new Srims.users.ActiveUsersGridPanel(panelId, userStore, '当前在线用户', 'icon-activeuser-list');
        Srims.WorkSpace.addPanel(panel);
    }
}
