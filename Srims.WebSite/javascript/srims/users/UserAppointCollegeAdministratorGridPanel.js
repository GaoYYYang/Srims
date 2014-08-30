
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
