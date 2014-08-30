
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.Patent = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'lawState',
    type: 'string',
    mapping: 'LawState'
}, {
    name: 'lawStateTime',
    type: 'date',
    mapping: 'LawStateTime'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'mainCategoryNumber',
    type: 'string',
    mapping: 'MainCategoryNumber'
}, {
    name: 'allCategoryNumber',
    type: 'string',
    mapping: 'AllCategoryNumber'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'applicationDateTime',
    type: 'date',
    mapping: 'ApplicationDateTime'
}, {
    name: 'authorizeDateTime',
    type: 'date',
    mapping: 'AuthorizeDateTime'
}, {
    name: 'category',
    type: 'string',
    mapping: 'Category'
}, {
    name: 'country',
    type: 'string',
    mapping: 'Country'
}, {
    name: 'introduction',
    type: 'string',
    mapping: 'Introduction'
}, {
    name: 'collegeName',
    type: 'string',
    mapping: 'CollegeName'
}, {
    name: 'collegeID',
    type: 'int',
    mapping: 'CollegeID'
}, {
    name: 'patentInventersName',
    type: 'string',
    mapping: 'PatentInventersName'
}, {
    name: 'patentPrincipalName',
    type: 'string',
    mapping: 'PatentPrincipalName'
}, {
    name: 'hasPermission_ShowPatent',
    type: 'boolean',
    mapping: 'HasPermission_ShowPatent',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditPatent',
    type: 'boolean',
    mapping: 'HasPermission_EditPatent',
    convert: Boolean.toBoolean
}, {
    name: 'canShowPatent',
    type: 'boolean',
    mapping: 'CanShowPatent',
    convert: Boolean.toBoolean
}, {
    name: 'canEditPatent',
    type: 'boolean',
    mapping: 'CanEditPatent',
    convert: Boolean.toBoolean
}, {
    name: 'agencyName',
    type: 'string',
    mapping: 'AgencyName'
}, {
    name: 'agencyID',
    type: 'int',
    mapping: 'AgencyID'
}, {
    name: 'agent',
    type: 'string',
    mapping: 'Agent'
}, {
    name: 'contract',
    type: 'string',
    mapping: 'Contract'
}]);
Srims.data.Entity.apply(Srims.patents.Patent);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.Department = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isCollege',
    type: 'boolean',
    mapping: 'IsCollege',
    convert: Boolean.TureOrFalseToYesOrNo
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
},{
    name: 'haspermissin_Add',
    type: 'boolean',
    mapping: 'Haspermissin_Add',
    convert: Boolean.toBoolean
},{
    name: 'canadd',
    type: 'boolean',
    mapping: 'Canadd',
    convert: Boolean.toBoolean
},{
    name: 'haspermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.experts.Department);


if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.DepartmentStore.superclass.constructor.call(this, new Srims.experts.DepartmentXmlReader(), load_url, params);
    }
});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.DepartmentXmlReader.superclass.constructor.call(this, Srims.experts.Department);
    }
});

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeText = Ext.data.Record.create([{
    name: 'value',
    type: 'string',
    mapping: 'Value'
}, {
    name: 'valueSpell',
    type: 'string',
    mapping: 'ValueSpell'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}]);
Srims.data.Entity.apply(Srims.common.NoticeText);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeTextStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(url, type){
        Srims.common.NoticeTextStore.superclass.constructor.call(this, new Srims.common.NoticeTextXmlReader(), url, {
            type: type
        });
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.NoticeTextXmlReader.superclass.constructor.call(this, Srims.common.NoticeText);
    }
});
if (!Srims.component)
	Ext.namespace('Srims.component');

Srims.component.ExpertSearch = function() {
}
Srims.component.ExpertSearch.Record = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'name',
	type: 'string',
	mapping: 'Name'
},{
	name: 'number',
	type: 'string',
	mapping: 'Number'
},{
	name: 'college',
	type: 'string',
	mapping: 'College'
},{
	name: 'college2',
	type: 'string',
	mapping: 'College2'
},{
	name: 'post',
	type: 'string',
	mapping: 'Post'
}]);
Srims.component.ExpertSearch.Store = Ext.extend(Ext.data.Store, {
	url: Srims.service.experts.ExpertService + '/SearchExpert',
	reader: new Ext.data.XmlReader({
		record: 'Record',
		idProperty: 'ID'
	}, Srims.component.ExpertSearch.Record)
});
Srims.component.ExpertSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
	store: new Srims.component.ExpertSearch.Store(),
	displayField: 'name',
	tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{name}({number}): {college} {post}', '</div></tpl>'),
	onRender: function(B, A) {
		var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);

		new Ext.ToolTip({
			target: this.getId(),
			html: '您可以通过输入专家<span style="color: Red;">姓名</span>或专家<span style="color: Red;">姓名首字母缩写</span>查找并选择专家'
		});

		return result;
	}
})
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.patents.PatentStore.superclass.constructor.call(this, new Srims.patents.PatentXmlReader(), load_url, params);
    }
});









if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.patents.PatentXmlReader.superclass.constructor.call(this, Srims.patents.Patent);
    }
});









if (!Srims.patents) 
    Ext.namespace("Srims.patents");

//列表显示
Srims.patents.listPatent = function(showQueryWindow, ShowNewWindow){
    Srims.patents._listPatent('PatentList', '专利列表', 'icon-patent-list', showQueryWindow, ShowNewWindow);
};

Srims.patents._listPatent = function(id, name, iconCls, showQueryWindow, ShowNewWindow){
    var panelId = 'PatentGridPanel_' + id;
    var patentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (panel) {
        patentStore = panel.getPatentStore();
        patentStore.load();
    }
    else {
        patentStore = new Srims.patents.PatentStore(Srims.service.patents.PatentService + '/Query', queryParams);
        panel = new Srims.patents.PatentGridPanel(panelId, patentStore, name, iconCls, queryParams);
        panel.getPatentStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    //查询
    if (showQueryWindow) {
        queryParams = patentStore.getExtraParams();
        Srims.patents.showPatentQueryWindow(panelId + '_QueryWindow', patentStore, queryParams, panel);
    }
    //新建
    if (ShowNewWindow) {
        Srims.patents.showNewPatentWindow(panelId + '_NewPatentWindow');
    }
};

//从store导出所查询到的专利
Srims.patents.exportPatent = function(filterParams, queryParams){
    var windowId = 'PatentExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.patents.PatentService + '/Query';
    var items = [];
    items[0] = new Srims.component.ExportWindow_EntityColumnForm('基本信息', Srims.patents.PatentExport_Column.basic);
    items[1] = new Srims.component.ExportWindow_EntityColumnForm('发明人', Srims.patents.PatentExport_Column.inventer);
    items[2] = new Srims.component.ExportWindow_EntityColumnForm('代理机构', Srims.patents.PatentExport_Column.agency);
    
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Patent');
};

//显示专利的详细信息
Srims.patents.showPatent = function(patent, store){
    var panelId = 'PatentShowPanel' + patent.get('id');
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.patents.PatentShowPanel(panelId, patent, store);
    Srims.WorkSpace.addPanel(panel);
};

//显示查询窗口
Srims.patents.showPatentQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.patents.PatentQueryWindow(id, store, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
};

//新建专利
Srims.patents.showNewPatentWindow = function(id){
    var patent = new Srims.patents.Patent({});
    var window = Ext.getCmp(id);
    
    if (!window) 
        window = new Srims.patents.PatentEditWindow(id, patent);
    window.show();
};

//编辑专利
Srims.patents.showEditPatentWindow = function(patent){
    var ID = 'PatentGridPanel_PatentList_EditPatentWindow' + patent.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.patents.PatentEditWindow(ID, patent);
    window.show();
};

//删除专利
Srims.patents.deletePatent = function(patent, store){
    Ext.MessageBox.confirm('删除专利', '你确定要删除这个专利吗？', function(buttonId){
        if (buttonId == 'yes') {
            var _params = {};
            _params.patentID = patent.get('id');
            
            var panelID = 'PatentShowPanel' + patent.get('id');
            var patentEditWindowID = 'PatentGridPanel_PatentList_EditPatentWindow' + patent.get('id');
            var patentInventerWindowID = 'PatentInventerManageWindow' + patent.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.patents.PatentService + '/DeletePatent',
                params: _params,
                scope: this,
                success: function(){
                    //从列表中删除时，关闭相应的查看页面 编辑窗口  发明人管理窗口 。
                    if (Ext.getCmp(panelID)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    if (Ext.getCmp(patentEditWindowID)) 
                        Ext.getCmp(patentEditWindowID).close();
                    if (Ext.getCmp(patentInventerWindowID)) 
                        Ext.getCmp(patentInventerWindowID).close();
                    store.load();
                }
            });
        }
    }, this);
};


//成员管理
Srims.patents.showPatentInventerManageWindow = function(patent){
    var ID = 'PatentInventerManageWindow' + patent.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.patents.PatentInventerManageWindow(ID, patent);
    else 
        window.getPatentInventerStore().load();
    
    window.show();
};
//添加成员
Srims.patents.addInventer = function(patent, store, isExpert, hasPrincipal){
    var ID = 'addWinner' + patent.get('id');
    var window = Ext.getCmp(ID);
    var patentInventer = new Srims.patents.PatentInventer({});
    
    if (!window) 
        window = new Srims.patents.PatentInventerManageWindow_AddInventer(patent, patentInventer, store, isExpert);
    window.show();
};

//编辑成员
Srims.patents.editInventer = function(inventer, patent, store, isExpert, hasPrincipal){
    var ID = 'editInventer' + patent.get('id') + inventer.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.patents.PatentInventerManageWindow_AddInventer(patent, inventer, store, isExpert);
    window.show();
};

//删除成员
Srims.patents.deleteInventer = function(patentInventer, store, patent){
    Ext.MessageBox.confirm('删除专利发明者', '你确定要删除这个发明者吗？', function(buttonId){
        if (buttonId == 'yes') {
            var _params = {};
            _params.patentInventerID = patentInventer.get('id');
            _params.patentID = patent.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.patents.PatentInventerService + '/DeletePatentInventer',
                params: _params,
                scope: this,
                success: function(){
                    //从获奖人管理窗口中删除发明人时，相应专利列表、专利显示、发明人管理窗口都更新。
                    Srims.patents.listPatent(false, false);
                    var showPanelID = 'PatentShowPanel' + patent.get('id');
                    if (Ext.getCmp(showPanelID)) {
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(showPanelID), true);
                        Srims.patents.showPatent(patent);
                    }
                    store.load();
                }
            });
        }
    }, this);
};
Srims.patents.showImportPatentWindow = function(store){
    var windowId = 'PatentImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.patents.PatentService + '/Import', '导入专利数据', false);
    
    window.show();
}






if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentGridPanel = function(id, patentStore, title, iconCls, queryParams) {
    //field
    this._patentStore = patentStore;
    this._selections = new Ext.grid.RowSelectionModel();

    //controls
    this._columnModel = new Srims.patents.PatentGridPanel_ColumnModel();
    this._toolBar = new Srims.patents.PatentGridPanel_ToolBar(this, this._selections, this._patentStore, id, queryParams);

    //public methods
    this.getPatentStore = function() {
        return this._patentStore;
    }

    var params = {};
    params.sm = this._selections;
    params.store = this._patentStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;

    //constructor
    Srims.patents.PatentGridPanel.superclass.constructor.call(this, params);

    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var patent = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        Srims.patents.showPatent(patent, store);
    }
}
Ext.extend(Srims.patents.PatentGridPanel, Srims.component.GridPanel);





if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentGridPanel_ColumnModel = function(){

    Srims.patents.PatentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        //sortable: true,
        //hideable: true
        hidden: true,
        hideable: false
    }, {
        header: "专利号",
        dataIndex: 'number',
        sortable: true,
        hidden: false
    }, {
        header: "专利名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "法律状态",
        dataIndex: 'lawState',
        width: 30,
        sortable: true,
        hidden: false,
        renderer: Srims.patents.PatentLawStateRender
    }, {
        header: "专利类型",
        dataIndex: 'type',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Srims.patents.PatentTypeRender
    }, {
        header: "负责人",
        dataIndex: 'patentPrincipalName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "所属学院",
        dataIndex: 'collegeName',
        sortable: true,
        hidden: false
    }, {
        header: "授权时间",
        dataIndex: 'authorizeDateTime',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "法律状态时间",
        dataIndex: 'lawStateTime',
        width: 80,
        sortable: true,
        hidden: true,
        renderer: Date.render
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: true,
        hidden: true,
        renderer: Srims.patents.PatentLevelRender
    }, {
        header: "专利主分类号",
        dataIndex: 'mainCategoryNumber',
        sortable: true,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "专利备注",
        dataIndex: 'remark',
        sortable: false,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "申请时间",
        dataIndex: 'applicationDateTime',
        sortable: true,
        width: 80,
        hidden: true,
        renderer: Date.render
    }, {
        header: "专利分类",
        dataIndex: 'category',
        sortable: true,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "国别",
        dataIndex: 'country',
        sortable: true,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "简介",
        dataIndex: 'introduction',
        sortable: false,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "专利发明人",
        dataIndex: 'patentInventersName',
        sortable: false,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }]);
    
    
    this.defaultSortable = false;
}
Ext.extend(Srims.patents.PatentGridPanel_ColumnModel, Ext.grid.ColumnModel);




if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentGridPanel_ToolBar = function(grid, selection, store, panelId, queryParams){
    //fields
    this._grid = grid;
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._queryParams = queryParams;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.patents.showPatentQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>专利查询</b><br/>对专利的信息进行复杂查询'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        panelId: this._panelId,
        hidden: true,
        handler: function(){
            Srims.patents.showNewPatentWindow(this.panelId + '_NewWindow');
        },
        hidden: true,
        tooltip: '<b>添加专利</b><br/>输入专利信息以添加专利'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.patents.showImportPatentWindow(this.store);
        },
        tooltip: '<b>专利导入</b><br/>将专利从excel表导入到数据库中'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.patents.showPatent(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看专利</b><br/>显示所选专利的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.patents.showEditPatentWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑专利</b><br/>编辑选中专利的信息'
    });
    this._buttonInventerManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '发明人管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.patents.showPatentInventerManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>专利发明者管理</b><br/>管理选中专利的发明人员'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.patents.deletePatent(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除专利</b>'
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
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        menuAlign: 'right',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    this._buttonExport = new Ext.Toolbar.Button({
        text: '导出',
        iconCls: 'icon-export',
        minWidth: 60,
        grid: this._grid,
        store: this._store,
        handler: function(){
            Srims.patents.exportPatent(this.store.lastOptions.params, queryParams);
        },
        tooltip: '<b>导出专利</b><br/>导出所查询的专利'
    });
    
    
    //根据用户权限显示查询按钮
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    
    Srims.patents.PatentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonNew, this._buttonImport, this._buttonShow, this._buttonEdit, this._buttonInventerManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset, this._buttonExport]
    });
    
    var user = Srims.currentLoginLog.user;
    this._buttonImport.setVisible(user.hasPermission_EditPatent);
    this._buttonNew.setVisible(user.hasPermission_EditPatent);
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonInventerManage = this._buttonInventerManage;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonInventerManage = selection.buttonInventerManage;
        var buttonDelete = selection.buttonDelete;
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonInventerManage.hide();
            buttonDelete.hide();
            return;
        }
        
        var patent = selection.getSelected();
        //根据权限显示按钮
        buttonShow.setVisible(patent.get('hasPermission_ShowPatent'));
        buttonShow.setDisabled(!patent.get('canShowPatent'));
        buttonEdit.setVisible(patent.get('hasPermission_EditPatent'));
        buttonEdit.setDisabled(!patent.get('canEditPatent'));
        buttonInventerManage.setVisible(patent.get('hasPermission_EditPatent'));
        buttonInventerManage.setDisabled(!patent.get('canEditPatent'));
        buttonDelete.setVisible(patent.get('hasPermission_EditPatent'));
        buttonDelete.setDisabled(!patent.get('canEditPatent'));
        
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.patents.PatentGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(patentId) {
        Srims.patents.PatentInventerStore.superclass.constructor.call(this, new Srims.patents.PatentInventerXmlReader(), Srims.service.patents.PatentInventerService + '/GetByPatentID', {
            patentId: patentId
        });
    }
});








if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.patents.PatentInventerXmlReader.superclass.constructor.call(this, Srims.patents.PatentInventer);
    }
});









if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventer = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'patentID',
    type: 'int',
    mapping: 'PatentID'
}, {
    name: 'expertNumber',
    type: 'string',
    mapping: 'ExpertNumber'
}, {
    name: 'isPrincipal',
    type: 'boolean',
    mapping: 'IsPrincipal',
    convert: Boolean.toBoolean
}
]);
Srims.data.Entity.apply(Srims.patents.PatentInventer);



if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.patents.PatentAgencyStore.superclass.constructor.call(this, new Srims.patents.PatentAgencyXmlReader(), load_url, params);
    }
});


if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.patents.PatentAgencyXmlReader.superclass.constructor.call(this, Srims.patents.PatentAgency);
    }
});


if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgency = Ext.data.Record.create([{
    name: 'agencyName',
    type: 'string',
    mapping: 'AgencyName'
}, {
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'contract',
    type: 'string',
    mapping: 'Contract'
}, {
    name: 'hasPermission_EditPatentAgency',
    type: 'boolean',
    mapping: 'HasPermission_EditPatentAgency',
    convert: Boolean.toBoolean
}, {
    name: 'canEditPatentAgency',
    type: 'boolean',
    mapping: 'CanEditPatentAgency',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.patents.PatentAgency);

if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentShowPanel = function(panelId, patent, store) {
    //field
    this._patent = patent;
    this._id = panelId;
    this._store = store;

    //controls
    this._formPanelBasic = new Srims.patents.PatentShowPanel_BasicForm(patent);
    this._formPanelInventer = new Srims.patents.PatentInventerFormPanel(patent, false, true);
    this._formPanelIntroduction = new Srims.patents.PatentShowPanel_IntroductionForm(patent);

    //constructor
    Srims.patents.PatentShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._patent.get('name'),
        iconCls: 'icon-show',
        items: [this._formPanelBasic, this._formPanelInventer,
				this._formPanelIntroduction]
    });
}

Ext.extend(Srims.patents.PatentShowPanel, Ext.Panel, {});

















if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentShowPanel_BasicForm = function(patent) {
    //field
    this._patent = patent;

    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '专利名称',
        value: patent.get('name'),
        readOnly: true,
        width: 392
    });

    this._fieldNumber = new Ext.form.Field({
        fieldLabel: '专利号',
        value: patent.get('number'),
        readOnly: true,
        width: 200
    });
    this._fieldType = new Ext.form.Field({
        fieldLabel: '专利类型',
        value: Srims.patents.PatentTypeRender(patent.get('type')),
        readOnly: true,
        width: 200
    });
    this._fieldLevel = new Ext.form.Field({
        fieldLabel: '专利级别',
        value: Srims.patents.PatentLevelRender(patent.get('level')),
        readOnly: true,
        width: 200
    });
    this._fieldLawState = new Ext.form.Field({
        fieldLabel: '法律状态',
        value: Srims.patents.PatentLawStateRender(patent.get('lawState')),
        readOnly: true,
        width: 200
    });
    this._fieldCategory = new Ext.form.Field({
        fieldLabel: '专利分类',
        value: patent.get('category'),
        readOnly: true,
        width: 200
    });
    this._fieldCollegeName = new Ext.form.Field({
        fieldLabel: '所属学院',
        value: patent.get('collegeName'),
        readOnly: true,
        width: 200
    });
    this._fieldMainCategoryNumber = new Ext.form.Field({
        fieldLabel: '主分类号',
        value: patent.get('mainCategoryNumber'),
        readOnly: true,
        width: 200
    });

    this._fieldCountry = new Ext.form.Field({
        fieldLabel: '国家',
        value: patent.get('country'),
        readOnly: true,
        width: 200
    });
    this._fieldApplicationDateTime = new Ext.form.Field({
        fieldLabel: '申请时间',
        value: Date.render(patent.get('applicationDateTime')),
        readOnly: true,
        width: 200
    });
    this._fieldAuthorizeDateTime = new Ext.form.Field({
        fieldLabel: '授权时间',
        value: Date.render(patent.get('authorizeDateTime')),
        readOnly: true,
        width: 200
    });
    this._fieldLawStateTime = new Ext.form.Field({
        fieldLabel: '法律状态时间',
        value: Date.render(patent.get('lawStateTime')),
        readOnly: true,
        width: 200
    });
    this._fieldAgencyName = new Ext.form.Field({
        fieldLabel: '代理机构',
        value: patent.get('agencyName'),
        readOnly: true,
        width: 200
    });
    this._fieldAgent = new Ext.form.Field({
        fieldLabel: '代理人',
        value: patent.get('agent'),
        readOnly: true,
        width: 200
    });
    this._fieldContract = new Ext.form.Field({
        fieldLabel: '联系方式',
        value: patent.get('contract'),
        readOnly: true,
        width: 200
    });

    this._fieldAllCategoryNumber = new Ext.form.Field({
        fieldLabel: '全部分类号',
        value: patent.get('allCategoryNumber'),
        readOnly: true,
        width: 590
    });
    this._fieldRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        value: patent.get('remark'),
        readOnly: true,
        height: 40,
        width: 590
    });
    //constructor
    var columnOneItems = [this._fieldNumber, this._fieldType, this._fieldLevel, this._fieldLawState, this._fieldCategory,
                                          this._fieldCollegeName, this._fieldMainCategoryNumber];
    var columnTwoItems = [this._fieldCountry, this._fieldApplicationDateTime, this._fieldAuthorizeDateTime, this._fieldLawStateTime, this._fieldAgencyName,
                                         this._fieldAgent, this._fieldContract];

    Srims.patents.PatentShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldName, new Ext.Panel({
            widht: 780,
            layout: 'column',
            items: [new Ext.Panel({
                width: 390,
                layout: 'form',
                style: 'width:300px',
                items: columnOneItems
            }), new Ext.Panel({
                width: 340,
                style: 'width:300px',
                layout: 'form',
                items: columnTwoItems
            })]
        }), this._fieldAllCategoryNumber, this._fieldRemark]
    });

}
Ext.extend(Srims.patents.PatentShowPanel_BasicForm, Ext.form.FormPanel, {});










if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentShowPanel_IntroductionForm = function(patent) {
    this._patent = patent;

    this._textContent = new Ext.form.TextArea({
        fieldLabel: '简介',
        hideLabel: true,
        scroll: true,
        value: patent.get('introduction'),
        readOnly: true,
        height: 120,
        width: 850
    });

    Srims.patents.PatentShowPanel_IntroductionForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '简介',
        autoHeight: true,
        frame: true,
        labelWidth: 50,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textContent]
    });
}
Ext.extend(Srims.patents.PatentShowPanel_IntroductionForm, Ext.form.FormPanel, {});











if (!Srims.patents)
    Ext.namespace("Srims.patents");

Ext.namespace('Srims.patents.PatentLawState');

Srims.patents.PatentLawState.Unknown = 'Unknown';
Srims.patents.PatentLawState.PCT = 'PCT';
Srims.patents.PatentLawState.Reject = 'Reject';
Srims.patents.PatentLawState.Cancel = 'Cancel';
Srims.patents.PatentLawState.Publish = 'Publish';
Srims.patents.PatentLawState.Censor = 'Censor';
Srims.patents.PatentLawState.TreatCancel = 'TreatCancel';
Srims.patents.PatentLawState.AcceptCase = 'AcceptCase';
Srims.patents.PatentLawState.Accredit = 'Accredit';
Srims.patents.PatentLawState.Abandon = 'Abandon';
Srims.patents.PatentLawState.Resume = 'Resume';
Srims.patents.PatentLawState.End = 'End';

Srims.patents.PatentLawStateRender = function(value, metadata) {
    switch (value) {
        case 'PCT':
            return 'PCT阶段';
        case 'Reject':
            return '驳回';
        case 'Cancel':
            return '撤回';
        case 'Publish':
            return '公开';
        case 'Censor':
            return '实审';
        case 'TreatCancel':
            return '视为撤回';
        case 'AcceptCase':
            return '受理';
        case 'Accredit':
            return '授权';
        case 'Abandon':
            return '专利权放弃';
        case 'Resume':
            return '专利权恢复';
        case 'End':
            return '专利权终止';
        default:
            return '未知';
    }
}


Srims.patents.PatentLawStateStore = [['PCT', 'PCT阶段'], ['Reject', '驳回'],
['Cancel', '撤回'], ['Publish', '公开'],
['Censor', '实审'], ['TreatCancel', '视为撤回'],
['AcceptCase', '受理'], ['Accredit', '授权'],
['Abandon', '专利权放弃'], ['Resume', '专利权恢复'],
['End', '专利权终止'], ['Unknown', '未知']];









if (!Srims.patents)
    Ext.namespace("Srims.patents");

Ext.namespace('Srims.patents.PatentLevel');

Srims.patents.PatentLevel.Unknown = 'Unknown';
Srims.patents.PatentLevel.TheFirstResponsibleUnion = 'TheFirstResponsibleUnion';
Srims.patents.PatentLevel.Join = 'Join';

Srims.patents.PatentLevelRender = function(value, metadata) {
    switch (value) {
        case 'TheFirstResponsibleUnion':
            return '第一责任单位';
        case 'Join':
            return '参加';
        default:
            return '未识别';
    }
}


Srims.patents.PatentLevelStore = [['TheFirstResponsibleUnion', '第一责任单位'], ['Join', '参加'], ['Unknown', '未识别']];






if (!Srims.patents)
    Ext.namespace("Srims.patents");

Ext.namespace('Srims.patents.PatentType');

Srims.patents.PatentType.Unknown = 'Unknown';
Srims.patents.PatentType.Invention = 'Invention';
Srims.patents.PatentType.Application = 'Application';
Srims.patents.PatentType.Design = 'Design';

Srims.patents.PatentTypeRender = function(value, metadata) {
    switch (value) {
        case 'Invention':
            return '发明专利';
        case 'Application':
            return '实用新型';
        case 'Design':
            return '外观设计';
        default:
            return '未知类型';
    }
}


Srims.patents.PatentTypeStore = [['Invention', '发明专利'], ['Application', '实用新型'], ['Design', '外观设计'], ['Unknown', '未知类型']];





if (!Srims.patents)
    Ext.namespace('Srims.patents');

Srims.patents.PatentExport_Column = function() {
}

Srims.patents.PatentExport_Column.basic = [['Name', '专利名称', , '200'], ['Number', '专利号', , '100'],
    ['LawState', '法律状态', 'enum', '80'], ['Type', '专利类型', 'enum', '100'],
    ['LawStateTime', '法律状态时间', 'Date', '100'],
    ['Level', '级别', 'enum', '50'], ['MainCategoryNumber', '主分类号', , '50'],
    ['AllCategoryNumber', '全部分类号', , '180'],
    ['ApplicationDateTime', '申请时间', 'Date', '120'],
    ['AuthorizeDateTime', '授权时间', 'Date', '120'],
    ['Category', '专利分类', , '80'], ['Country', '国别', , '30'], ['Introduction', '简介', , '800'],
     ['CollegeName', '所属学院', , '100'],
    ['Remark', '备注', , '190']];

Srims.patents.PatentExport_Column.inventer = [['PatentInventersName', '所有发明人', , '150'], ['PatentPrincipalName', '负责人', , '50']];

Srims.patents.PatentExport_Column.agency = [['AgencyName', '专利代理机构名称', , '80'], ['Agent', '代理人', , '100'],
     ['Contract', '联系方式', , '150']];

if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerFormPanel = function(patent, isEdit, isShow) {

    this._patent = patent;
    this._store = new Srims.patents.PatentInventerStore(patent.get('id'));
    this._gridPanelPatentInventer = new Srims.patents.PatentInventerGridPanel(isEdit, isShow, patent, this._store);

    //constructor
    Srims.patents.PatentInventerFormPanel.superclass.constructor.call(this, {
        collapsible: true,
        titleCollapse: true,
        title: '专利发明者信息',
        autoHeight: true,
        autoWidth: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        items: [this._gridPanelPatentInventer]
    });
    this._store.load();
}
Ext.extend(Srims.patents.PatentInventerFormPanel, Ext.form.FormPanel, {});








if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerGridPanel = function(isEdit, isShow, patent, store) {

    this._patent = patent;
    this._store = store;

    this._columnModel = new Srims.patents.PatentInventerGridPanel_ColumnModel();   
    this._selections = new Ext.grid.RowSelectionModel(); 
    this._toolBar = new Srims.patents.PatentInventerGridPanel_ToolBar(this._selections, this._store, this._patent);
   
    if (isEdit) this._width = 425;
    else this._width = 850;

    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    if (isEdit) params.tbar = this._toolBar;
    params.enableColumnHide = false;
    params.enableColumnMove = true;
    params.enableHdMenu = false;
    params.border = false;
    params.height = 220;
    params.width = this._width;
    params.stripeRows = true;
    params.loadMask = true;
    params.stateful = false;
    params.viewConfig = {
        autoFill: true,
        scrollOffset: 0,
        forceFit: true,
        emptyText: '暂时没有奖励成员'
    };
    //constructor
    Srims.patents.PatentInventerGridPanel.superclass.constructor.call(this, params);

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    }
    this.on('celldblclick', onCellDblClick);
}

Ext.extend(Srims.patents.PatentInventerGridPanel, Srims.component.GridPanel, {});








if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerGridPanel_ColumnModel = function() {
    Srims.patents.PatentInventerGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "发明人id",
        dataIndex: 'id',
        hidden: true
    }, {
        header: "位次",
        dataIndex: 'order',
        width: 1
    }, {
        header: "姓名",
        dataIndex: 'name',
        width: 2
    }, {
        header: "工作证号",
        dataIndex: 'expertNumber',
        width: 2
    }, {
        header: "专家ID",
        dataIndex: 'expertID',
        width: 2,
        hidden: true
    }, {
        header: "是否负责人",
        dataIndex: 'isPrincipal',
        width: 1.5,
        renderer: Boolean.render
    }
]);
}

Ext.extend(Srims.patents.PatentInventerGridPanel_ColumnModel, Ext.grid.ColumnModel);



if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerGridPanel_ToolBar = function(selection, store, patent) {
    this._store = store;
    this._selection = selection;
    this._patent = patent;

    this._buttonAdd = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加非专家',
        minWidth: 40,
        store: this._store,
        handler: function() {
            Srims.patents.addInventer(patent, store, false);
        },
        tooltip: '<b>获奖人非专家</b>'
    });
    this._buttonAddExpert = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家',
        minWidth: 40,
        store: this._store,
        handler: function() {
            Srims.patents.addInventer(patent, store, true);
        },
        tooltip: '<b>获奖人专家</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 40,
        store: this._store,
        selection: this._selection,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            var isExpert = false;
            if (this.selection.getSelected().get('expertID'))
                isExpert = true;

            Srims.patents.editInventer(this.selection.getSelected(), patent, store, isExpert);
        },
        tooltip: '<b>编辑发明人</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 40,
        store: this._store,
        selection: this._selection,
        patent: this._patent,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.patents.deleteInventer(this.selection.getSelected(), this.store, patent);
        },
        tooltip: '<b>删除发明人</b>'
    });

    //constructor
    Srims.patents.PatentInventerGridPanel_ToolBar.superclass.constructor.call(this, {
        width: 425,
        items: [this._buttonAdd, this._buttonAddExpert, this._buttonEdit, this._buttonDelete]
    });

    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;

        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonEdit.hide();
            return;
        }
        //var awardWinner = selection.getSelected();
        buttonEdit.setVisible(true);
        buttonDelete.show();
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.patents.PatentInventerGridPanel_ToolBar, Ext.Toolbar);










if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentQueryWindow = function(id, store, queryParams){
    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.patents.PatentQueryWindow_BasicPanel();
    this._otherPanel = new Srims.patents.PatentQueryWindow_OtherPanel();
    this._ExpertPanel = new Srims.patents.PatentQueryWindow_ExpertPanel();
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function(){
            this.window.clearParams();
            queryParams = this.window.getParams();
            this.window._store.load();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this,
        handler: function(){
            var window = this.window;
            
            queryParams = window.getParams();
            window._store.load();
            window.hide();
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            
            window.getParams();
            Srims.common.newView(Srims.common.ViewType.PatentQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
        
            Srims.common.showViewWindow(Srims.common.ViewType.PatentQuery);
            this.window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.patents.PatentQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '专利查询',
        iconCls: 'icon-patent-query',
        width: 725,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        height: 560,
        closeAction: 'close',
        stateful: false,
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 700,
            layout: 'form',
            labelWidth: 100,
            autoHeight: false,
            height: 480,
            deferredRender: false,
            autoScroll: true,
            items: [this._basicPanel, this._otherPanel, this._ExpertPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._ExpertPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._ExpertPanel.clearParams();
    }
    
    this.getGridPanel = function(){
        var gridPanelID = "PatentGridPanel_PatentList";
        Srims.WorkSpace.active(gridPanelID);
    }
    this.query = function(button){
        var window = button.window;
        window.getGridPanel();
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}

Ext.extend(Srims.patents.PatentQueryWindow, Ext.Window);










if (!Srims.patents)
    Ext.namespace("Srims.patents");
if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.patents.PatentQueryWindow_BasicPanel = function() {
    this._PatentName = new Ext.form.TextField({
        fieldLabel: '专利名称',
        width: 300
    });
    this._PatentNumber = new Ext.form.TextField({
        fieldLabel: '专利号',
        width: 150
    });
    this._PatentInventer = new Ext.form.TextField({
        fieldLabel: '发明人',
        width: 150
    });
    this._PatentInventerOrder = new Ext.form.NumberField({
        fieldLabel: '位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 150
    });
    this._IsPrincipal = new Ext.form.Checkbox({
        fieldLabel: '是否负责人'
    });
    this._IsAccredited = new Ext.form.Checkbox({
        fieldLabel: '是否已授权'
    });
    this._ApplicationTimeStart = new Ext.form.DateField({
        fieldLabel: '申请时间',
        width: 150
    });
    this._ApplicationTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._AuthorisedTimeStart = new Ext.form.DateField({
        fieldLabel: '授权时间',
        width: 150
    });
    this._AuthorisedTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._LawStateTimeStart = new Ext.form.DateField({
        fieldLabel: '法律状态时间',
        width: 150
    });
    this._LawStateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._College = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        emptyText: '请选择学院',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });

    this._columnOne = [this._PatentNumber, this._PatentInventer, this._IsPrincipal,
                                   this._ApplicationTimeStart, this._AuthorisedTimeStart, this._LawStateTimeStart];
    this._columnTwo = [this._College, this._PatentInventerOrder, this._IsAccredited,
                                    this._ApplicationTimeEnd, this._AuthorisedTimeEnd, this._LawStateTimeEnd];

    Srims.patents.PatentQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 681,
        items: [this._PatentName, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 90,
                items: this._columnOne
            }), new Ext.Panel({
                labelWidth: 75,
                layout: 'form',
                items: this._columnTwo
            })]
        })]
    });
    this.buildParams = function(params) {
        params.Name = this._PatentName.getValue();
        params.Number = this._PatentNumber.getValue();
        params.PatentInventer = this._PatentInventer.getValue();
        params.InventerOrder = this._PatentInventerOrder.getValue();
        params.IsPrincipal = this._IsPrincipal.checked ? "true" : "";
        params.ApplicationDateTimeStart = Date.format(this._ApplicationTimeStart.getValue());
        params.AuthorizeDateTimeStart = Date.format(this._AuthorisedTimeStart.getValue());
        params.LawStateTimeStart = Date.format(this._LawStateTimeStart.getValue());
        params.IsAccredited = this._IsAccredited.checked ? "true" : "";
        params.ApplicationDateTimeEnd = Date.format(this._ApplicationTimeEnd.getValue());
        params.AuthorizeDateTimeEnd = Date.format(this._AuthorisedTimeEnd.getValue());
        params.LawStateTimeEnd = Date.format(this._LawStateTimeEnd.getValue());
        params.CollegeName = this._College.getText();
    }
    this.clearParams = function(params) {
        this._PatentName.reset();
        this._PatentNumber.reset();
        this._PatentInventer.reset();
        this._IsPrincipal.reset();
        this._ApplicationTimeStart.reset();
        this._AuthorisedTimeStart.reset();
        this._LawStateTimeStart.reset();
        this._PatentInventerOrder.reset();
        this._IsAccredited.reset();
        this._ApplicationTimeEnd.reset();
        this._AuthorisedTimeEnd.reset();
        this._LawStateTimeEnd.reset();
        this._College.reset();
    }
}
Ext.extend(Srims.patents.PatentQueryWindow_BasicPanel, Ext.FormPanel);








if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentQueryWindow_ExpertPanel = function() {
    return new Srims.component.QueryWindow_MemberPanel('专家信息');
};







if (!Srims.patents)
    Ext.namespace('Srims.patents');

Srims.patents.PatentEditWindow = function(panelId, patent) {
    this._patent = patent;
    this._params = {};
    this._id = panelId;

    this._basicPanel = new Srims.patents.PatentEditWindow_BasicPanel(patent);
    this._basicPanel_MustWriteItems = new Srims.patents.PatentEditWindow_BasicPanel_MustWrite(patent);

    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonCancle = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
            window.close();
        }
    });

    Srims.patents.PatentEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: patent.isNew() ? "添加专利" : "编辑专利",
        iconCls: patent.isNew() ? 'icon-patent-new' : 'icon-edit',
        width: 608,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 585,
            layout: 'form',
            labelWidth: 100,
            deferredRender: false,
            items: [this._basicPanel_MustWriteItems, this._basicPanel]
        })],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancle]
    });

    //method
    this.assignValues = function() {
        this._basicPanel_MustWriteItems.assignValues();
        this._basicPanel.assignValues();
    }
    this.clearParams = function() {
        this._basicPanel_MustWriteItems.clearParams();
        this._basicPanel.clearParams();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._basicPanel_MustWriteItems.isValid(preventMark) && result;
        result = this._basicPanel.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var patent = this._patent;
        var isNew = this._isNew;
        patent.beginEdit();
        this.assignValues();
        patent.commit();

        Ext.Ajax.request({
            url: Srims.service.patents.PatentService + '/SavePatent',
            params: patent.data,
            scope: this,
            success: function(response) {
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.patents.PatentXmlReader()
                });
                var newPatent = store.getAt(0);
                if (isNew) {
                    //新建完，列表刷新，显示新建专利
                    Srims.WorkSpace.getWorkSpace().remove(this);
                    Srims.patents.listPatent(false, false);
                    Srims.patents.showPatent(newPatent);
                }
                else {
                    //编辑完，列表刷新，显示专利刷新
                    var panelID = 'PatentShowPanel' + patent.get('id');
                    Srims.WorkSpace.getWorkSpace().remove(this);
                    Srims.patents.listPatent(false, false);
                    if (Ext.getCmp(panelID)) Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    Srims.patents.showPatent(newPatent);
                }
            }
        })
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;

        if (!window.isValid(false))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.patents.PatentEditWindow, Ext.Window);




if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentEditWindow_BasicPanel = function(patent){
    this.patent = patent;
    
    
    this._ApplicationTime = new Ext.form.DateField({
        fieldLabel: '申请时间',
        value: patent.get('applicationDateTime'),
        width: 160
    });
    this._AuthorizedTime = new Ext.form.DateField({
        fieldLabel: '授权时间',
        value: patent.get('authorizeDateTime'),
        width: 160
    });
    this._LawStateTime = new Ext.form.DateField({
        fieldLabel: '法律状态时间',
        value: patent.get('lawStateTime'),
        width: 160
    });
    this._College = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        value: patent.get('collegeName'),
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        emptyText: '请选择学院',
        entityId: patent.get('collegeID'),
        editable: true,
        triggerAction: 'all',
        width: 160
    });
    this._PatentCategory = new Srims.component.NoticeTextComboBox({
        fieldLabel: '专利分类',
        value: patent.get('category'),
        emptyText: '请选择专利分类',
        noticeTextType: "PatentCategory",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        width: 160
    });
    this._patentLevel = new Ext.form.ComboBox({
        fieldLabel: '专利级别',
        value: patent.get('level'),
        store: Srims.patents.PatentLevelStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        width: 160
    });
    
    this._PatentAgency = new Srims.component.EntityComboBox({
        fieldLabel: '代理机构',
        value: patent.get('agencyName'),
        store: new Srims.patents.PatentAgencyStore(Srims.service.patents.PatentAgencyService + '/Query'),
        displayField: 'agencyName',
        emptyText: '请选择代理机构',
        entityId: patent.get('agencyID'),
        editable: true,
        triggerAction: 'all',
        width: 220
    });
    this._textFieldAgent = new Ext.form.TextField({
        fieldLabel: '代理人',
        value: patent.get('agent'),
        width: 160
    });
    this._PatentMainCategoryNumber = new Ext.form.TextField({
        fieldLabel: '主分类号',
        value: patent.get('mainCategoryNumber'),
        width: 441
    });
    this._PatentAllCategoryNumber = new Ext.form.TextField({
        fieldLabel: '全部分类号',
        value: patent.get('allCategoryNumber'),
        width: 441
    });
    
    this._fieldRemark = new Ext.form.TextArea({
        fieldLabel: '专利备注',
        value: patent.get('remark'),
        height: 40,
        width: 441
    });
    this._fieldIntroduction = new Ext.form.TextArea({
        fieldLabel: '专利简介',
        value: patent.get('introduction'),
        scroll: true,
        height: 120,
        width: 441
    });
    
    //constructor
    var columnOneItems = [this._ApplicationTime, this._LawStateTime, this._College, this._textFieldAgent];
    var columnTwoItems = [this._PatentCategory, this._AuthorizedTime, this._patentLevel];
    
    Srims.patents.PatentEditWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        width: 585,
        items: [new Ext.Panel({
            widht: 580,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: columnOneItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                items: columnTwoItems
            })]
        }), this._PatentAgency, this._PatentMainCategoryNumber, this._PatentAllCategoryNumber, this._fieldRemark, this._fieldIntroduction]
    });
    
    //method
    this.assignValues = function(){
        this.patent.set('applicationDateTime', Date.format(this._ApplicationTime.getValue()));
        this.patent.set('authorizeDateTime', Date.format(this._AuthorizedTime.getValue()));
        this.patent.set('lawStateTime', Date.format(this._LawStateTime.getValue()));
        this.patent.set('collegeID', this._College.getValue());
        this.patent.set('agencyID', this._PatentAgency.getValue());
        this.patent.set('agent', this._textFieldAgent.getValue());
        this.patent.set('category', this._PatentCategory.getValue());
        this.patent.set('level', this._patentLevel.getValue());
        this.patent.set('remark', this._fieldRemark.getValue());
        this.patent.set('introduction', this._fieldIntroduction.getValue());
        
        this.patent.set('mainCategoryNumber', this._PatentMainCategoryNumber.getValue());
        this.patent.set('allCategoryNumber', this._PatentAllCategoryNumber.getValue());
    }
    
    this.clearParams = function(){
        this._ApplicationTime.reset();
        this._AuthorizedTime.reset();
        this._LawStateTime.reset();
        this._College.reset();
        this._PatentCategory.reset();
        this._fieldIntroduction.reset();
        this._patentLevel.reset();
        this._fieldRemark.reset();
        this._PatentAgency.reset();
        
        this._PatentMainCategoryNumber.reset();
        this._PatentAllCategoryNumber.reset();
    }
    
    this._ValidateTime = function(){
        var result = true;
        if (this._AuthorizedTime.getValue() && this._ApplicationTime.getValue()) {
            result = (this._ApplicationTime.getValue() < this._AuthorizedTime.getValue()) && result;
            if (this._ApplicationTime.getValue() >= this._AuthorizedTime.getValue()) {
                Ext.Msg.show({
                    title: '您输入的时间有错误',
                    msg: '申请时间应早于授权时间，请重新输入。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        }
        
        if (this._LawStateTime.getValue() && this._ApplicationTime.getValue()) {
            result = (this._ApplicationTime.getValue() < this._LawStateTime.getValue()) && result;
            if (this._ApplicationTime.getValue() >= this._LawStateTime.getValue()) {
                Ext.Msg.show({
                    title: '您输入的时间有错误',
                    msg: '申请时间应早于法律状态时间，请重新输入。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        }
        
        return result;
    }
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._ValidateTime() && result;
        
        return result;
    }
}
Ext.extend(Srims.patents.PatentEditWindow_BasicPanel, Ext.FormPanel);




if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentEditWindow_BasicPanel_MustWrite = function(patent) {
    this.patent = patent;

    this._PatentName = new Ext.form.TextField({
        fieldLabel: '专利名称',
        allowBlank: false,
        value: patent.get('name'),
        width: 441
    });
    this._PatentNumber = new Ext.form.TextField({
        fieldLabel: '专利号',
        allowBlank: false,
        value: patent.get('number'),
        width: 160
    });
    this._PatentCountry = new Srims.component.NoticeTextComboBox({
        fieldLabel: '专利国别',
        value: patent.get('country'),
        allowBlank: false,
        emptyText: '请选择专利国别',
        noticeTextType: "PatentCountry",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        width: 160
    });
    this._patentType = new Ext.form.ComboBox({
        fieldLabel: '专利类别',
        value: patent.get('type'),
        store: Srims.patents.PatentTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        width: 160
    });
    this._patentLawState = new Ext.form.ComboBox({
        fieldLabel: '法律状态',
        value: patent.get('lawState'),
        store: Srims.patents.PatentLawStateStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        width: 160
    });

    //constructor
    var columnOneItems = [this._PatentNumber, this._PatentCountry];
    var columnTwoItems = [this._patentType, this._patentLawState];

    Srims.patents.PatentEditWindow_BasicPanel_MustWrite.superclass.constructor.call(this, {
        title: '必填信息',
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        width: 585,
        items: [this._PatentName, new Ext.Panel({
            widht:580,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: columnOneItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                items: columnTwoItems
            })]
        })]
    });

    //method
    this.assignValues = function() {
        this.patent.set('name', this._PatentName.getValue());
        this.patent.set('number', this._PatentNumber.getValue());
        this.patent.set('country', this._PatentCountry.getValue());
        this.patent.set('type', this._patentType.getValue());
        this.patent.set('lawState', this._patentLawState.getValue());
    }

    this.clearParams = function() {
        this._PatentName.reset();
        this._PatentNumber.reset();
        this._PatentCountry.reset();
        this._patentType.reset();
        this._patentLawState.reset();
    }

    this._ValidatePatentName = function() {
        if (this._PatentName.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: '名称错误',
                msg: '您输入的名称只有空格，请重新输入有意义的名称。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidatePatentNumber = function() {
        if (!this._PatentNumberValidater()) {
            Ext.Msg.show({
                title: '专利号错误',
                msg: '您输入的专利号不符合规则，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    //专利号验证器
    this._PatentNumberValidater = function() {
        //只有中国的验证
        if (this._PatentCountry.getValue() != '中国')
            return true;

        //专利号的长度必须是10位或者是14位
        var number = this._PatentNumber.getValue();
        if (number.length != 10 && number.length != 14)
            return false;
        //倒数第二位必须是'.'
        if (number.indexOf('.') != number.length - 2)
            return false;

        //验证最后一位
        var validater = 0;
        //专利号为10位的情况
        for (var i = 0; i <= 7; i++)
            validater += number.substr(i, 1) * (i + 2) - 0;
        //专利号为14为的情况
        if (number.length == 14)
            for (var i = 8; i <= 11; i++)
            validater += number.substr(i, 1) * (i - 6) - 0;

        return number.substr(number.length - 1, 1) == (validater % 11 == 10 ? 'X' : (validater % 11).toString());

    }

    this.isValid = function(preventMark) {
        var result = true;
        result = this._PatentName.isValid(preventMark) && result;
        result = this._PatentNumber.isValid(preventMark) && result;
        result = this._patentLawState.isValid(preventMark) && result;
        result = this._PatentCountry.isValid(preventMark) && result;
        result = this._patentType.isValid(preventMark) && result;

        result = this._ValidatePatentName() && result;
        result = this._ValidatePatentNumber() && result;

        return result;
    }
}
Ext.extend(Srims.patents.PatentEditWindow_BasicPanel_MustWrite, Ext.FormPanel);




if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerManageWindow = function(ID, patent) {

    this._patent = patent;
    this._title = patent.get('name');
    this._WindowID = ID;
    this._store = new Srims.patents.PatentInventerStore(patent.get('id'));

    this._MemberPanel = new Srims.patents.PatentInventerGridPanel(true, false, this._patent, this._store);

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });

    //public methods
    this.getPatentInventerStore = function() {
        return this._MemberPanel.getStore();
    }

    //constructor
    Srims.patents.PatentInventerManageWindow.superclass.constructor.call(this, {
        id: this._WindowID,
        title: this._title,
        iconCls: 'icon-member-manage',
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        width: 460,
        frame: true,
        height: 314,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._MemberPanel],
        buttons: [this._buttonClose]
    });
    this._store.load();
}
Ext.extend(Srims.patents.PatentInventerManageWindow, Ext.Window);









if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerManageWindow_AddInventer = function(patent, patentInventer, store, isExpert) {
    this._patentInventer = patentInventer;
    this._patent = patent;
    this._store = store;
    this._isExpert = isExpert;

    var hasPrincipal = false;
    var inventerList = this._store.getRange();
    for (var i = 0; i < inventerList.length; i++) {
        if (inventerList[i].get('isPrincipal'))
            hasPrincipal = true;
    }

    if (patentInventer.isNew())
        this._title = '添加';
    else
        this._title = '编辑';
    if (isExpert)
        this._title += '专家';
    else
        this._title += '非专家';

    this._buttonClose = new Ext.Button({
        minWidth: 60,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 60,
        text: '保 存',
        window: this
    });
    this._inventerRank = new Ext.form.NumberField({
        fieldLabel: '位次',
        width: 100,
        value: patentInventer.get('order'),
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        maxValue: 10000
    });
    this._inventerNormalName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: patentInventer.get('name'),
        width: 180,
        allowBlank: false
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家',
        width: 140,
        value: this._patentInventer.get('name'),
        selectEntityId: this._patentInventer.get('expertID'),
        allowBlank: false
    });
    this._IsPrincipal = new Ext.form.Checkbox({
        fieldLabel: '是否负责人',
        window: this,
        disabled: patentInventer.get('isPrincipal') == true ? false : (hasPrincipal == true ? true : false)
    });

    if (this._isExpert)
        this._items = [this._comboBoxExpert, this._inventerRank, this._IsPrincipal];
    else
        this._items = [this._inventerNormalName, this._inventerRank, this._IsPrincipal];

    //constructor
    Srims.patents.PatentInventerManageWindow_AddInventer.superclass.constructor.call(this, {
        title: this._title,
        iconCls: patentInventer.isNew() ? 'icon-new' : 'icon-edit',
        width: 300,
        labelWidth: 80,
        height: 165,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: this._items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function() {
        if (this._isExpert)
            this._patentInventer.set('expertID', this._comboBoxExpert.getValue());
        else
            this._patentInventer.set('name', this._inventerNormalName.getValue());
        this._patentInventer.set('order', this._inventerRank.getValue());
        this._patentInventer.set('patentID', this._patent.get('id'));
        this._patentInventer.set('isPrincipal', this._IsPrincipal.getValue());
    }
    this._ValidatePrincipal = function() {
        var inventers = this._store.getRange();
        var isPrincapal = this._IsPrincipal.getValue();

        for (var i = 0; i < inventers.length; i++) {
            if (this._patentInventer == inventers[i])
                continue;
            if (isPrincapal == inventers[i].get('isPrincipal') && isPrincapal == true) {
                Ext.Msg.show({
                    title: '负责人位次错误',
                    msg: '已有一位负责人，不能有多位负责人，请重新输入。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._ValidateOrder = function() {
        var inventers = this._store.getRange();
        var inventerOrder = this._inventerRank.getValue();

        for (var i = 0; i < inventers.length; i++) {
            if (this._patentInventer == inventers[i])
                continue;
            if (inventerOrder == inventers[i].get('order')) {
                Ext.Msg.show({
                    title: '发明人位次错误',
                    msg: '发明人位次不能重复，请重新输入位次。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._ValidateExpert = function() {
        var inventers = this._store.getRange();
        var expertID = this._comboBoxExpert.getValue();
        for (var i = 0; i < inventers.length; i++) {
            if (this._patentInventer == inventers[i])
                continue;
            if (this._isExpert && expertID == inventers[i].get('expertID')) {
                Ext.Msg.show({
                    title: '专家错误',
                    msg: '该专家已经是获奖人，请重新选择专家。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._ValidateNormal = function() {
        if (this._inventerNormalName.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: '名称错误',
                msg: '您输入的名称只有空格，请重新输入有意义的名称。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }

    //输入数据验证
    this.isValid = function(preventMark) {
        var result = true;

        if (this._isExpert) {
            result = this._comboBoxExpert.isValid(preventMark) && result;
            result = this._ValidateExpert() && result;
        }
        else {
            result = this._inventerNormalName.isValid(preventMark) && result;
            result = this._ValidateNormal() && result;
        }
        result = this._inventerRank.isValid(preventMark) && result;
        result = this._ValidateOrder() && result;
        result = this._ValidatePrincipal() && result;

        return result;
    }
    this.save = function() {
        var patentInventer = this._patentInventer;
        var getPatentPrincipal = this._getPatentPrincipal;
        patentInventer.beginEdit();
        this.assignValues();
        patentInventer.commit();
        var patent = this._patent;
        var store = this._store;

        Ext.Ajax.request({
            url: Srims.service.patents.PatentInventerService + '/SavePatentInventer',
            params: patentInventer.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                //新建发明人后，专利列表，专利显示，专利发明人管理都刷新                
                Srims.patents.listPatent(false, false);
                var showPanelID = 'PatentShowPanel' + patent.get('id');
                if (Ext.getCmp(showPanelID)) {
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(showPanelID), true);
                    Srims.patents.showPatent(patent);
                }
                Srims.patents.showPatentInventerManageWindow(patent);
                store.load();
            }
        })
    }
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        if (!window.isValid(false))
            return;
        button.setText('正在保存');
        button.disable();
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.patents.PatentInventerManageWindow_AddInventer, Ext.Window);











if (!Srims.patents)
    Ext.namespace("Srims.patents");


//专利代理机构列表显示
Srims.patents.listPatentAgency = function() {
    Srims.patents._listPatentAgency('PatentAgencyList', '专利代理机构列表', 'icon-patentAgency-list');
};

Srims.patents._listPatentAgency = function(id, name, iconCls) {
    var panelId = 'PatentAgencyGridPanel_' + id;
    var patentAgencyStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        patentAgencyStore = panel.getStore();
        patentAgencyStore.load();
    }
    else {
        patentAgencyStore = new Srims.patents.PatentAgencyStore(Srims.service.patents.PatentAgencyService + '/Query', queryParams);
        panel = new Srims.patents.PatentAgencyGridPanel(panelId, patentAgencyStore, name, iconCls, queryParams);
        panel.getStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
};
//新建专利机构
Srims.patents.showNewPatentAgencyWindow = function(windowId, store) {
    var patentAgency = new Srims.patents.PatentAgency({});
    var window = Ext.getCmp(windowId);
    if (!window)
        var window = new Srims.patents.PatentAgencyEditWindow(windowId, patentAgency, store);
    window.show();
};
//编辑专利机构
Srims.patents.showEditPatentAgencyWindow = function(patentAgency) {
    var windowId = "PatentAgencyEditWindow" + patentAgency.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        var window = new Srims.patents.PatentAgencyEditWindow(windowId, patentAgency);
    window.show();
};

//删除专利机构
Srims.patents.deletePatentAgency = function(patentAgency, store) {
    Ext.MessageBox.confirm('删除专利机构', '你确定要删除这个专利机构吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var _params = {};
            _params.patentAgencyID = patentAgency.get('id');

            var patentAgencyWindowID = 'PatentAgencyEditWindow' + patentAgency.get('id');

            Ext.Ajax.request({
                url: Srims.service.patents.PatentAgencyService + '/DeletePatentAgency',
                params: _params,
                scope: this,
                success: function() {
                    //从列表中删除时，关闭相应的编辑窗口               
                    if (Ext.getCmp(patentAgencyWindowID)) Ext.getCmp(patentAgencyWindowID).close();
                    store.load();

                }
            });
        }
    }, this);
};

if (!Srims.patents) 
    Ext.namespace('Srims.patents');

Srims.patents.PatentAgencyEditWindow = function(id, patentAgency){

    this._id = id;
    this._patentAgency = patentAgency;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    
    this._textFieldAgencyName = new Ext.form.TextField({
        fieldLabel: '机构名称',
        value: this._patentAgency.get('agencyName'),
        allowBlank: false,
        width: 180
    });
    
    this._textFieldContract = new Ext.form.TextField({
        fieldLabel: '联系方式',
        value: this._patentAgency.get('contract'),
        width: 180
    });
    
    var Items = [this._textFieldAgencyName, this._textFieldContract];
    
    Srims.patents.PatentAgencyEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: patentAgency.isNew() ? '新建专利代理机构' : '编辑专利代理机构',
        iconCls: patentAgency.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 160,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._save = function(){
        var patentAgency = this._patentAgency;
        patentAgency.beginEdit();
        this._assignValues();
        patentAgency.commit();
        
        Ext.Ajax.request({
            url: Srims.service.patents.PatentAgencyService + '/Save',
            params: patentAgency.data,
            scope: this,
            success: function(response){
                Srims.WorkSpace.getWorkSpace().remove(this);
                Srims.patents.listPatentAgency();
            }
        })
    }
    this.validateAgencyName = function(){
        Ext.Ajax.request({
            url: Srims.service.patents.PatentAgencyService + '/GetPatentAgencyWithSameName',
            params: {
                name: this._textFieldAgencyName.getValue()
            },
            scope: this,
            success: function(response){
                this._onValidateAgencyName(response, this);
            }
        });
    }
    this._onValidateAgencyName = function(response, window){
        if (parseInt(response.responseText) > 0) {
            Ext.MessageBox.confirm('专利机构重名', '目前已存在该专利机构，请重新输入！', function(buttonId){
                if (buttonId == 'yes') {
                    this._buttonSave.setText('保 存');
                    this._buttonSave.enable();
                }
                else {
                    Srims.WorkSpace.getWorkSpace().remove(window);
                }
            }, this);
        }
        else {
            this._save();
        }
    }
    
    this.validTextField = function(textField){
        if (textField.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: textField.fieldLabel + '错误',
                msg: '您输入的值只有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldAgencyName.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldAgencyName) && result;
        
        return result;
    }
    this._assignValues = function(){
        this._patentAgency.set('agencyName', this._textFieldAgencyName.getValue());
        this._patentAgency.set('contract', this._textFieldContract.getValue());
    }
    
    //event
    this._buttonSave_Click = function(button){
        var window = button.window;
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.validateAgencyName();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.patents.PatentAgencyEditWindow, Ext.Window, {})

if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyGridPanel = function(id, patentAgencyStore, title, iconCls, queryParams){
    //field
    this._patentAgencyStore = patentAgencyStore;
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls
    this._columnModel = new Srims.patents.PatentAgencyGridPanel_ColumnModel();
    this._toolBar = new Srims.patents.PatentAgencyGridPanel_ToolBar(this, this._selections, this._patentAgencyStore, id, queryParams);
    this._filters = new Srims.patents.PatentAgencyGridPanel_GridFilter();
    
    var params = {};
    params.sm = this._selections;
    params.store = this._patentAgencyStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.plugins = this._filters;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.defaultBBar = true;
    
    //constructor
    Srims.patents.PatentAgencyGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var patentAgency = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        //  Srims.patents.showEditPatentAgencyWindow(patentAgency, store);
    }
}
Ext.extend(Srims.patents.PatentAgencyGridPanel, Srims.component.GridPanel);

if (!Srims.patents) 
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyGridPanel_ColumnModel = function(){
    Srims.patents.PatentAgencyGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        sortable: false,
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'agencyName',
        sortable: true,
        width: 100
    }, {
        header: "联系方式",
        dataIndex: 'contract',
        sortable: true,
        width: 60
    }]);
}

Ext.extend(Srims.patents.PatentAgencyGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.patents) 
    Ext.namespace('Srims.patents');

Srims.patents.PatentAgencyGridPanel_GridFilter = function(){
    Srims.patents.PatentAgencyGridPanel_GridFilter.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'agencyName'
        }, {
            type: 'string',
            dataIndex: 'contract'
        }]
    });
}
Ext.extend(Srims.patents.PatentAgencyGridPanel_GridFilter, Ext.grid.GridFilters);

if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentAgencyGridPanel_ToolBar = function(grid, selection, store, panelId, queryParams) {
    //fields
    this._grid = grid;
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._queryParams = queryParams;

    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        panelId: this._panelId,
        hidden: false,
        handler: function() {
            Srims.patents.showNewPatentAgencyWindow(this.panelId + '_NewWindow');
        },
        tooltip: '<b>添加专利代理机构</b><br/>输入专利代理机构信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.patents.showEditPatentAgencyWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑专利代理机构</b><br/>编辑选中专利代理机构的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.patents.deletePatentAgency(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除专利代理机构</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        menuAlign: 'right',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });

    //根据用户权限显示查询按钮
    var user = Srims.currentLoginLog.user;
    this._buttonNew.setVisible(user.hasPermission_ManagePatent);

    Srims.patents.PatentAgencyGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });

    //initial

    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }

        var patentAgency = selection.getSelected();
        //根据权限显示按钮
        buttonEdit.setVisible(patentAgency.get('hasPermission_EditPatentAgency'));
        buttonEdit.setDisabled(!patentAgency.get('canEditPatentAgency'));

        buttonDelete.setVisible(patentAgency.get('hasPermission_EditPatentAgency'));
        buttonDelete.setDisabled(!patentAgency.get('canEditPatentAgency'));

    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.patents.PatentAgencyGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.ImportWindow = function(id, store, importUrl, description, isMagazienInformation) {

    this._id = id;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '导 入',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            window.formPanel = window._formPanelData;
            window.store = window._store;

            var params = {};
            if (isMagazienInformation)
                params.year = window._numberFieldYear.getValue();

            window.formPanel.getForm().submit({
                params: params,
                url: importUrl,
                waitMsg: '正在导入数据，请耐心等候....',
                success: function(form, action) {
                    Ext.Msg.show({
                        title: '成功导入数据',
                        msg: '导入数据成功',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });

                    if (window.store)
                        window.store.load();

                    window.close();

                    var jsonData = Ext.util.JSON.decode(action.response.responseText);
                    var logDocumentName = jsonData.LogDocumentName;

                    Srims.documents.downLoadResource(logDocumentName, '/GetImportLog');
                }
            });
        }
    });
    this._fieldDesprition = new Ext.form.Field({
        fieldLabel: '说明',
        value: description,
        readOnly: true,
        width: 180
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 180,
        allowBlank: false
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'ImportData',
        fieldLabel: '选择数据文件',
        width: 180,
        emptyText: '请选择要导入的数据文件',
        allowBlank: false,
        fileTypes: ['xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });

    var items = [];
    if (isMagazienInformation)
        items = [this._fieldDesprition, this._numberFieldYear, this._fileUploadField];
    else
        items = [this._fieldDesprition, this._fileUploadField];

    this._formPanelData = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        autoHeight: true,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: items
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        if (isMagazienInformation)
            result = this._numberFieldYear.isValid(preventMark) && result;

        return result;
    }

    Srims.component.ImportWindow.superclass.constructor.call(this, {
        id: this._id,
        title: description,
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelData],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.component.ImportWindow, Ext.Window, {})
