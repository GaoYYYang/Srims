
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.Award = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'rank',
    type: 'string',
    mapping: 'Rank'
}, {
    name: 'class',
    type: 'string',
    mapping: 'Class'
}, {
    name: 'attendType',
    type: 'string',
    mapping: 'AttendType'
}, {
    name: 'introduction',
    type: 'string',
    mapping: 'Introduction'
}, {
    name: 'authorisedUnit',
    type: 'string',
    mapping: 'AuthorisedUnit'
}, {
    name: 'classification',
    type: 'string',
    mapping: 'Classification'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'year',
    type: 'int',
    mapping: 'Year'
}, {
    name: 'awardFirstWinnerName',
    type: 'string',
    mapping: 'AwardFirstWinnerName'
}, {
    name: 'awardSecondWinnerName',
    type: 'string',
    mapping: 'AwardSecondWinnerName'
}, {
    name: 'awardThirdWinnerName',
    type: 'string',
    mapping: 'AwardThirdWinnerName'
}, {
    name: 'awardFourthWinnerName',
    type: 'string',
    mapping: 'AwardFourthWinnerName'
}, {
    name: 'awardFifthWinnerName',
    type: 'string',
    mapping: 'AwardFifthWinnerName'
}, {
    name: 'projectName',
    type: 'string',
    mapping: 'ProjectName'
}, {
    name: 'collegeName',
    type: 'string',
    mapping: 'CollegeName'
}, {
    name: 'collegeID',
    type: 'int',
    mapping: 'CollegeID'
}, {
    name: 'subjectNature',
    type: 'string',
    mapping: 'SubjectNature'
}, {
    name: 'hasPermission_ShowAward',
    type: 'boolean',
    mapping: 'HasPermission_ShowAward',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditAward',
    type: 'boolean',
    mapping: 'HasPermission_EditAward',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowAwardDocument',
    type: 'boolean',
    mapping: 'HasPermission_ShowAwardDocument',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UploadAwardDocument',
    type: 'boolean',
    mapping: 'HasPermission_UploadAwardDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canShowAward',
    type: 'boolean',
    mapping: 'CanShowAward',
    convert: Boolean.toBoolean
}, {
    name: 'canEditAward',
    type: 'boolean',
    mapping: 'CanEditAward',
    convert: Boolean.toBoolean
}, {
    name: 'canShowAwardDocument',
    type: 'boolean',
    mapping: 'CanShowAwardDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canUploadAwardDocument',
    type: 'boolean',
    mapping: 'CanUploadAwardDocument',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.awards.Award);


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
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.awards.AwardStore.superclass.constructor.call(this, new Srims.awards.AwardXmlReader(), load_url, params);
    }
});


if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.awards.AwardXmlReader.superclass.constructor.call(this, Srims.awards.Award);
    }
});

if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinner = Ext.data.Record.create([{
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
    name: 'number',
    type: 'string',
    mapping: 'Number'
}
]);
Srims.data.Entity.apply(Srims.awards.AwardWinner);

if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(awardId) {
        Srims.awards.AwardWinnerStore.superclass.constructor.call(this, new Srims.awards.AwardWinnerXmlReader(), Srims.service.awards.AwardWinnerService + '/GetByAwardID', {
            awardId: awardId
        });
    }
});
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.awards.AwardWinnerXmlReader.superclass.constructor.call(this, Srims.awards.AwardWinner);
    }
});



if (!Srims.awards) 
    Ext.namespace("Srims.awards");

//列表显示
Srims.awards.listAward = function(showQueryWindow, ShowNewWindow){
    Srims.awards._listAward('AwardList', '奖励列表', 'icon-award-list', showQueryWindow, ShowNewWindow);
};

//列表显示
Srims.awards._listAward = function(id, name, iconCls, showQueryWindow, ShowNewWindow){

    var panelId = 'AwardGridPanel_' + id;
    var awardStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (panel) {
        awardStore = panel.getAwardStore();
        awardStore.load();
    }
    else {
        awardStore = new Srims.awards.AwardStore(Srims.service.awards.AwardService + '/Query', queryParams);
        panel = new Srims.awards.AwardGridPanel(panelId, awardStore, name, iconCls, queryParams);
        panel.getAwardStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    //查询
    if (showQueryWindow) {
        queryParams = awardStore.getExtraParams();
        Srims.awards.showAwardQueryWindow(panelId + '_QueryWindow', awardStore, queryParams, panel);
    }
    //新建
    if (ShowNewWindow) {
        Srims.awards.showNewAwardWindow(panelId + '_NewAwardWindow');
    }
};

//显示查询窗口
Srims.awards.showAwardQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.awards.AwardQueryWindow(id, store, queryParams);
    
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

//从store导出所查询到的奖励
Srims.awards.exportAward = function(filterParams, queryParams){
    var windowId = 'AwardExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.awards.AwardService + '/Query';
    var items = [];
    items[0] = new Srims.component.ExportWindow_EntityColumnForm('', Srims.awards.AwardExportColumns);
    
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Awards');
};

//显示奖励详细信息
Srims.awards.showAward = function(award, store){
    var panelId = 'AwardShowPanel' + award.get('id');
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.awards.AwardShowPanel(panelId, award, store);
    Srims.WorkSpace.addPanel(panel);
};

//删除奖励
Srims.awards.deleteAward = function(award, store){
    Ext.MessageBox.confirm('删除奖励', '你确定要删除这个奖励吗？', function(buttonId){
        if (buttonId == 'yes') {
            var _params = {};
            _params.awardID = award.get('id');
            
            var panelID = 'AwardShowPanel' + award.get('id');
            var awardEditWindowID = 'AwardGridPanel_AwardList_EditAwardWindow' + award.get('id');
            var winnerManageWindowID = 'AwardWinnerManageWindow' + award.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.awards.AwardService + '/DeleteAward',
                params: _params,
                scope: this,
                success: function(){
                    //从列表中删除时，关闭相应的查看页面 编辑窗口  获奖人管理窗口 。
                    if (Ext.getCmp(panelID)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    if (Ext.getCmp(awardEditWindowID)) 
                        Ext.getCmp(awardEditWindowID).close();
                    if (Ext.getCmp(winnerManageWindowID)) 
                        Ext.getCmp(winnerManageWindowID).close();
                    store.load();
                }
            });
        }
    }, this);
};

//新建奖励
Srims.awards.showNewAwardWindow = function(id){
    var award = new Srims.awards.Award({});
    var window = Ext.getCmp(id);
    
    if (!window) 
        window = new Srims.awards.AwardEditWindow(id, award);
    window.show();
};

//编辑奖励
Srims.awards.showEditAwardWindow = function(award){
    var ID = 'AwardGridPanel_AwardList_EditAwardWindow' + award.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.awards.AwardEditWindow(ID, award);
    window.show();
};
//成员管理
Srims.awards.showAwardWinnerManageWindow = function(award){
    var ID = 'AwardWinnerManageWindow' + award.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.awards.AwardWinnerManageWindow(ID, award);
    if (window) {
        awardWinnerStore = window.getAwardWinnerStore();
        awardWinnerStore.load();
    }
    window.show();
};
//添加成员
Srims.awards.addWinner = function(award, store, isExpert){
    var ID = 'addWinner' + award.get('id');
    var window = Ext.getCmp(ID);
    var awardWinner = new Srims.awards.AwardWinner({});
    
    if (!window) 
        window = new Srims.awards.AwardWinnerManageWindow_AddWinner(award, awardWinner, store, isExpert);
    window.show();
};

//编辑成员 
Srims.awards.editWinner = function(winner, award, store, isExpert){
    var ID = 'editWinner' + award.get('id') + winner.get('id');
    var window = Ext.getCmp(ID);
    
    if (!window) 
        window = new Srims.awards.AwardWinnerManageWindow_AddWinner(award, winner, store, isExpert);
    window.show();
};

//删除成员
Srims.awards.deleteWinner = function(awardWinner, store, award){
    Ext.MessageBox.confirm('删除获奖者', '你确定要删除这个获奖者吗？', function(buttonId){
        if (buttonId == 'yes') {
            var _params = {};
            _params.awardWinnerID = awardWinner.get('id');
            _params.awardID = award.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.awards.AwardWinnerService + '/DeleteAwardWinner',
                params: _params,
                scope: this,
                success: function(){
                    //从获奖人管理窗口中删除获奖人时，相应奖励列表、奖励显示、获奖人管理窗口都更新。 
                    Srims.awards.listAward(false, false);
                    var showPanelID = 'AwardShowPanel' + award.get('id');
                    if (Ext.getCmp(showPanelID)) {
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(showPanelID), true);
                        Srims.awards.showAward(award);
                    }
                    store.load();
                }
            });
        }
    }, this);
};
Srims.awards.showAwardDocumentManageWindow = function(award){
    var windowId = 'AwardDocumentManageWindow' + award.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.documents.AwardDocumentManageWindow(windowId, award);
    }
    
    window.show();
}
Srims.awards.showAwardDocumentUploadWindow = function(award, store){
    var windowId = 'AwardDocumentUploadeWindow' + award.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.documents.AwardDocumentUploadWindow(windowId, award, store);
    }
    
    window.show();
}
Srims.awards.downLoadAwardDocument = function(awardDocument){
    var awardDocumentResource = awardDocument.get('resource');
    Srims.documents.downLoadResource(awardDocumentResource, '/GetAwardDocument');
}
Srims.awards.deleteAwardDocument = function(awardDocument, store){
    Srims.documents.deleteResource(awardDocument.get('resource'), awardDocument.get('id'), Srims.service.documents.AwardDocumentService + '/Delete', store, '成功删除奖励文档', '成功删除奖励文档');
}
Srims.awards.censorPassAwardDoucment = function(awardDocument, store){
    Srims.awards.saveForChangeState(awardDocument, Srims.CensorState.passed, store, '/CensorPass', undefined);
}
Srims.awards.showAwardDocumentCensorRejctWindow = function(awardDocuemnt, store){
    var windowId = 'AwardDocumentCensorRejectWindow' + awardDocuemnt.get('id');
    var window = Ext.getCmp(windowId);
    
    if (!window) {
        window = new Srims.documents.AwardDocumentCensorRejectWindow(windowId, awardDocuemnt, store);
    }
    
    window.show();
}
Srims.awards.censorRejectAwardDocument = function(awardDocument, store, remark){
    Srims.awards.saveForChangeState(awardDocument, Srims.CensorState.reject, store, '/CensorReject', remark);
}
Srims.awards.saveForChangeState = function(awardDocument, state, store, subUrl, remark){
    var params = {};
    params.awardDocumentId = awardDocument.get('id');
    if (remark != undefined) 
        params.remark = remark;
    
    Ext.Ajax.request({
        url: Srims.service.documents.AwardDocumentService + subUrl,
        params: params,
        success: function(){
        
            Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorAwardDocument);
            store.load();
        }
    });
}
Srims.awards.listWaitingCensorDocument = function(){
    var panelId = 'WaitingCensorAwardDocumentListPanel';
    var panel = Srims.WorkSpace.active(panelId);
    
    if (!panel) {
        var load_url = Srims.service.documents.AwardDocumentService + '/GetWaitingCensor';
        var store = new Srims.documents.AwardDocumentStore(load_url, undefined);
        
        panel = new Srims.documents.AwardDocumentGridPanel(panelId, undefined, true, store);
        Srims.WorkSpace.addPanel(panel);
        
        store.load();
    }
}
Srims.awards.showImportWindow = function(store){
    var windowId = 'AwardImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.awards.AwardService + '/Import', '导入奖励数据', false);
    
    window.show();
}
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardGridPanel = function(id, awardStore, title, iconCls, queryParams) {

    //fields
    this._awardStore = awardStore;
    this._selections = new Ext.grid.RowSelectionModel();

    //controls
    this._columnModel = new Srims.awards.AwardGridPanel_ColumnModel();
    this._filters = new Srims.awards.AwardGridPanel_GridFilters();
    this._toolbar = new Srims.awards.AwardGridPanel_ToolBar(this, this._selections, this._awardStore, id, queryParams);

    //public methods
    this.getAwardStore = function() {
        return this._awardStore;
    }

    var params = {};
    params.sm = this._selections;
    params.store = this._awardStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;

    //constructor
    Srims.awards.AwardGridPanel.superclass.constructor.call(this, params);

    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {

        var award = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        Srims.awards.showAward(award, store);
    }
}
Ext.extend(Srims.awards.AwardGridPanel, Srims.component.GridPanel);

if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardGridPanel_ColumnModel = function(){

    Srims.awards.AwardGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        //sortable: true,
        //hideable: true
        hidden: true,
        hideable: false
    }, {
        header: "奖励名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "年度",
        dataIndex: 'year',
        width: 30,
        sortable: true,
        hidden: false
    }, {
        header: "获奖项目名称",
        dataIndex: 'projectName',
        sortable: true,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "奖种",
        dataIndex: 'classification',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "等级",
        dataIndex: 'class',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "奖励级别",
        dataIndex: 'rank',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "第一获奖人",
        dataIndex: 'awardFirstWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "第二获奖人",
        dataIndex: 'awardSecondWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "第三获奖人",
        dataIndex: 'awardThirdWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "第四获奖人",
        dataIndex: 'awardFourthWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "第五获奖人",
        dataIndex: 'awardFifthWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "参与类型",
        dataIndex: 'attendType',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "授奖单位",
        dataIndex: 'authorisedUnit',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "学科性质",
        dataIndex: 'subjectNature',
        width: 60,
        renderer: Srims.subjectNatureRender,
        hidden: true
    }, {
        header: "所属学院",
        dataIndex: 'collegeName',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "简介",
        dataIndex: 'introduction',
        width: 60,
        sortable: false,
        hidden: true
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.awards.AwardGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardGridPanel_ToolBar = function(grid, selection, store, panelId, queryParams){
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
            Srims.awards.showAwardQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>奖励查询</b><br/>对奖励的信息进行复杂查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.awards.showImportWindow(this.store);
        },
        tooltip: '<b>奖励导入</b><br/>将奖励从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        panelId: this._panelId,
        handler: function(){
            Srims.awards.showNewAwardWindow(this.panelId + '_NewWindow');
        },
        hidden: true,
        tooltip: '<b>添加奖励</b><br/>输入奖励信息以添加奖励'
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
            Srims.awards.showAward(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看奖励</b><br/>显示所选奖励的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.awards.showEditAwardWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑奖励</b><br/>编辑选中奖励的信息'
    });
    this._buttonWinnerManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '获奖人管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.awards.showAwardWinnerManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>奖励成员管理</b><br/>管理选中奖励的奖励成员'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-award-document-manage',
        text: '文档管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.awards.showAwardDocumentManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>奖励文档管理</b><br/>管理选中奖励的奖励文档'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.awards.deleteAward(this.selection.getSelected(), store);
        },
        hidden: true,
        tooltip: '<b>删除奖励</b>'
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
            //清空筛选条件
            var filters = Ext.getCmp(panelId)._filters;
            filters.clearFilters();
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
            Srims.awards.exportAward(this.store.lastOptions.params, queryParams);
        },
        tooltip: '<b>导出奖励</b><br/>导出所查询的奖励'
    });
    
    //根据用户权限显示查询按钮
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    this._buttonNew.setVisible(user.hasPermission_editLiteralAward || user.hasPermission_editScienceAward);
    
    Srims.awards.AwardGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonWinnerManage, this._buttonDocumentManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset, this._buttonExport]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonNew = this._buttonNew;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonWinnerManage = this._buttonWinnerManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonDocumentManage = this._buttonDocumentManage;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonNew = selection.buttonNew;
        var buttonEdit = selection.buttonEdit;
        var buttonWinnerManage = selection.buttonWinnerManage;
        var buttonDelete = selection.buttonDelete;
        var buttonDocumentManage = selection.buttonDocumentManage;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonNew.hide();
            buttonEdit.hide();
            buttonWinnerManage.hide();
            buttonDelete.hide();
            buttonDocumentManage.hide();
            return;
        }
        
        var award = selection.getSelected();
        //根据权限显示按钮
        buttonShow.setVisible(award.get('hasPermission_ShowAward'));
        buttonShow.setDisabled(!award.get('canShowAward'));
        
        buttonEdit.setVisible(award.get('hasPermission_EditAward'));
        buttonEdit.setDisabled(!award.get('canEditAward'));
        
        buttonWinnerManage.setVisible(award.get('hasPermission_EditAward'));
        buttonWinnerManage.setDisabled(!award.get('canEditAward'));
        
        buttonDelete.setVisible(award.get('hasPermission_EditAward'));
        buttonDelete.setDisabled(!award.get('canEditAward'));
        
        buttonDocumentManage.setVisible(award.get('hasPermission_ShowAwardDocument'));
        buttonDocumentManage.setDisabled(!award.get('canShowAwardDocument'));
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.awards.AwardGridPanel_ToolBar, Ext.Toolbar);











if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardGridPanel_GridFilters = function() {
    Srims.awards.AwardGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'remark'
        }, {
            type: 'numeric',
            dataIndex: 'year'
        }, {
            type: 'string',
            dataIndex: 'awardFirstWinnerName'
        }, {
            type: 'string',
            dataIndex: 'projectName'
        }, {
            type: 'string',
            dataIndex: 'collegeName'
        }, {
            type: 'list',
            dataIndex: 'attendType',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetAttendTypeItems'),
            labelField: 'value',
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'authorisedUnit',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetAuthorUnitItems'),
            labelField: 'value',
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'rank',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetRankItems'),
            labelField: 'value',
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'class',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetClassItems'),
            labelField: 'value',
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'classification',
            store: new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetClassificationItems'),
            labelField: 'value',
            phpMode: true

}]
        });

    }
    Ext.extend(Srims.awards.AwardGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerGridPanel_ColumnModel = function() {
    Srims.awards.AwardWinnerGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "获奖人id",
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
        dataIndex: 'number',
        width: 2
    }, {
        header: "专家ID",
        dataIndex: 'expertID',
        width: 2,
        hidden: true
}]);
    }

    Ext.extend(Srims.awards.AwardWinnerGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardShowPanel = function(panelId, award, store) {
    //field
    this._award = award;
    this._id = panelId;
    this._store = store;

    //controls
    this._formPanelBasic = new Srims.awards.AwardShowPanel_BasicForm(award);
    this._formPanelMember = new Srims.awards.AwardWinnerFormPanel(award, false, true);
    this._formPanelIntroduction = new Srims.awards.AwardShowPanel_IntroductionForm(award);
    this._ToolBar = new Srims.awards.AwardShowPanel_ToolBar(this._award, this._store);

    //constructor    
    Srims.awards.AwardShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._award.get('name'),
        iconCls: 'icon-show',
        tbar: this._ToolBar,
        items: [this._formPanelBasic,
		        this._formPanelMember,
				this._formPanelIntroduction]
    });
}

Ext.extend(Srims.awards.AwardShowPanel, Ext.Panel, {});









if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardShowPanel_BasicForm = function(award){
    //field
    this._award = award;
    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '奖励名称',
        value: award.get('name'),
        readOnly: true,
        width: 350
    });
    this._fieldProjectName = new Ext.form.Field({
        fieldLabel: '奖励项目名称',
        value: award.get('projectName'),
        readOnly: true,
        width: 510
    });
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '奖励级别',
        value: award.get('rank'),
        readOnly: true,
        width: 160
    });
    this._fieldAttendType = new Ext.form.Field({
        fieldLabel: '参与类型',
        value: award.get('attendType'),
        readOnly: true,
        width: 160
    });
    this._fieldAuthorisedUnit = new Ext.form.Field({
        fieldLabel: '授奖单位',
        value: award.get('authorisedUnit'),
        readOnly: true,
        width: 160
    });
    this._fieldCollegeName = new Ext.form.Field({
        fieldLabel: '所属学院',
        value: award.get('collegeName'),
        readOnly: true,
        width: 160
    });
    
    this._fieldClassification = new Ext.form.Field({
        fieldLabel: '奖种',
        value: award.get('classification'),
        readOnly: true,
        width: 160
    });
    this._fieldYear = new Ext.form.Field({
        fieldLabel: '年度',
        value: award.get('year'),
        readOnly: true,
        width: 160
    });
    this._fieldClass = new Ext.form.Field({
        fieldLabel: '等级',
        value: award.get('class'),
        readOnly: true,
        width: 160
    });
    this._fieldSubjectNature = new Ext.form.Field({
        fieldLabel: '学科性质',
        value: Srims.subjectNatureRender(award.get('subjectNature')),
        readOnly: true,
        width: 160
    });
    this._fieldRemark = new Ext.form.Field({
        fieldLabel: '奖励备注',
        value: award.get('remark'),
        readOnly: true,
        width: 300
    });
    //constructor        
    var columnOneItems = [this._fieldRank, this._fieldAttendType, this._fieldAuthorisedUnit, this._fieldCollegeName];
    var columnTwoItems = [this._fieldYear, this._fieldClass, this._fieldClassification, this._fieldSubjectNature];
    
    Srims.awards.AwardShowPanel_BasicForm.superclass.constructor.call(this, {
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
            widht: 700,
            layout: 'column',
            items: [new Ext.Panel({
                width: 350,
                layout: 'form',
                style: 'width:300px',
                items: columnOneItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnTwoItems
            })]
        }), this._fieldRemark, this._fieldProjectName]
    });
    
}
Ext.extend(Srims.awards.AwardShowPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardShowPanel_ToolBar = function(award, store){
    //fields
    this._award = award;
    this._store = store;
    
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        hidden: true,
        award: this._award,
        handler: function(){
            Srims.awards.showEditAwardWindow(this.award);
        },
        tooltip: '<b>编辑奖励</b><br/>编辑该奖励的信息'
    });
    this._buttonWinnerManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '获奖人管理',
        minWidth: 60,
        hidden: true,
        award: this._award,
        handler: function(){
            Srims.awards.showAwardWinnerManageWindow(this.award);
        },
        tooltip: '<b>奖励成员管理</b><br/>管理该奖励的奖励成员'
    });
    this._buttonDocumentManage = new Ext.Toolbar.Button({
        iconCls: 'icon-award-document-manage',
        text: '文档管理',
        minWidth: 60,
        award: this._award,
        handler: function(){
            Srims.awards.showAwardDocumentManageWindow(this.award);
        },
        hidden: true,
        tooltip: '<b>奖励文档管理</b><br/>管理选中奖励的奖励文档'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        hidden: true,
        award: this._award,
        store: this._store,
        handler: function(){
            Srims.awards.deleteAward(this.award, this.store);
        },
        tooltip: '<b>删除奖励</b>'
    });
    
    Srims.awards.AwardShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonWinnerManage, this._buttonDocumentManage, this._buttonDelete]
    });
    
    //根据权限显示按钮
    this._buttonEdit.setVisible(award.get('hasPermission_EditAward'));
    this._buttonEdit.setDisabled(!award.get('canEditAward'));
    this._buttonWinnerManage.setVisible(award.get('hasPermission_EditAward'));
    this._buttonWinnerManage.setDisabled(!award.get('canEditAward'));
    this._buttonDelete.setVisible(award.get('hasPermission_EditAward'));
    this._buttonDelete.setDisabled(!award.get('canEditAward'));
    this._buttonDocumentManage.setVisible(award.get('hasPermission_ShowAwardDocument'));
    this._buttonDocumentManage.setDisabled(!award.get('canShowAwardDocument'));
    
}
Ext.extend(Srims.awards.AwardShowPanel_ToolBar, Ext.Toolbar);










if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerFormPanel = function(award, isEdit, isShow) {

    this._award = award;
    this._store = new Srims.awards.AwardWinnerStore(award.get('id'));
    this._gridPanelAwardWinner = new Srims.awards.AwardWinnerGridPanel(isEdit, isShow, award, this._store);

    //constructor
    Srims.awards.AwardWinnerFormPanel.superclass.constructor.call(this, {
        collapsible: true,
        titleCollapse: true,
        title: '奖励成员信息',
        autoHeight: true,
        autoWidth: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        items: [this._gridPanelAwardWinner]
    });
    this._store.load();
}
Ext.extend(Srims.awards.AwardWinnerFormPanel, Ext.form.FormPanel, {});
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerGridPanel = function(isEdit, isShow, award, store) {

    this._award = award;
    this._store = store;
    this._columnModel = new Srims.awards.AwardWinnerGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.awards.AwardWinnerManageWindow_ToolBar(this._selections, this._store, this._award);

    if (isEdit) this._width = 400;
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
    params.autoHeight = true;
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
    Srims.awards.AwardWinnerGridPanel.superclass.constructor.call(this, params);

    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    }
    this.on('celldblclick', onCellDblClick);
}

Ext.extend(Srims.awards.AwardWinnerGridPanel, Srims.component.GridPanel, {});if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerManageWindow = function(ID, award) {

    this._award = award;
    this._title = award.get('name');
    this._WindowID = ID;
    this._store = new Srims.awards.AwardWinnerStore(award.get('id'));
    this._MemberPanel = new Srims.awards.AwardWinnerGridPanel(true, false, this._award, this._store);

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    //public methods
    this.getAwardWinnerStore = function() {
        return this._MemberPanel.getStore();
    }

    //constructor
    Srims.awards.AwardWinnerManageWindow.superclass.constructor.call(this, {
        id: this._WindowID,
        title: this._title,
        iconCls: 'icon-member-manage',
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        width: 460,
        frame: true,
        height: 300,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 436,
            layout: 'form',
            frame: true,
            height: 220,
            autoScroll: true,
            deferredRender: false,
            items: [this._MemberPanel]
        })],
        buttons: [this._buttonClose]
    });
    this._store.load();
}
Ext.extend(Srims.awards.AwardWinnerManageWindow, Ext.Window);if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerManageWindow_ToolBar = function(selection, store, award) {
    this._store = store;
    this._selection = selection;
    this._award = award;

    this._buttonAdd = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加非专家',
        minWidth: 40,
        store: this._store,
        handler: function() {
            Srims.awards.addWinner(award, store, false);
        },
        tooltip: '<b>获奖人非专家</b>'
    });
    this._buttonAddExpert = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家',
        minWidth: 40,
        store: this._store,
        handler: function() {
            Srims.awards.addWinner(award, store, true);
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
            if (this.selection.getSelected().get('expertID')) isExpert = true;
            Srims.awards.editWinner(this.selection.getSelected(), award, store, isExpert);
        },
        tooltip: '<b>编辑获奖人</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 40,
        store: this._store,
        selection: this._selection,
        award: this._award,
        hidden: true,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.awards.deleteWinner(this.selection.getSelected(), this.store, award);
        },
        tooltip: '<b>删除获奖人</b>'
    });

    //constructor
    Srims.awards.AwardWinnerManageWindow_ToolBar.superclass.constructor.call(this, {
        width: 400,
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
        var awardWinner = selection.getSelected();

        buttonEdit.setVisible(true);
        buttonDelete.show();
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.awards.AwardWinnerManageWindow_ToolBar, Ext.Toolbar);
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerManageWindow_AddWinner = function(award, awardWinner, store, isExpert) {
    this._awardWinner = awardWinner;
    this._award = award;
    this._store = store;
    this._isExpert = isExpert;

    if (awardWinner.isNew())
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
            window.hide();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 60,
        text: '保 存',
        window: this
    });
    this._winnerRank = new Ext.form.NumberField({
        fieldLabel: '位次',
        width: 100,
        value: awardWinner.get('order'),
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        maxValue: 10000
    });
    this._winnerNormalName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: awardWinner.get('name'),
        width: 180,
        allowBlank: false
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家',
        width: 140,
        value: this._awardWinner.get('name'),
        selectEntityId: this._awardWinner.get('expertID'),
        allowBlank: false
    });
    if (this._isExpert)
        this._items = [this._comboBoxExpert, this._winnerRank];
    else
        this._items = [this._winnerNormalName, this._winnerRank];

    //constructor
    Srims.awards.AwardWinnerManageWindow_AddWinner.superclass.constructor.call(this, {
        title: this._title,
        iconCls: award.isNew() ? 'icon-new' : 'icon-edit',
        width: 300,
        labelWidth: 40,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: this._items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function() {
        if (this._isExpert)
            this._awardWinner.set('expertID', this._comboBoxExpert.getValue());       
        else
            this._awardWinner.set('name', this._winnerNormalName.getValue());
        this._awardWinner.set('order', this._winnerRank.getValue());
        this._awardWinner.set('awardID', this._award.get('id'));
    }

    this._ValidateOrder = function() {
        var winners = this._store.getRange();
        var winnerOrder = this._winnerRank.getValue();

        for (var i = 0; i < winners.length; i++) {
            if (this._awardWinner == winners[i])
                continue;
            if (winnerOrder == winners[i].get('order')) {
                Ext.Msg.show({
                    title: '获奖者位次错误',
                    msg: '获奖者位次不能重复，请重新输入位次。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._ValidateExpert = function() {
        var winners = this._store.getRange();
        var expertID = this._comboBoxExpert.getValue();
        for (var i = 0; i < winners.length; i++) {
            if (this._awardWinner == winners[i])
                continue;
            if (this._isExpert && expertID == winners[i].get('expertID')) {
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
        if (this._winnerNormalName.getValue().trim().length == 0) {
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
            result = this._winnerNormalName.isValid(preventMark) && result;
            result = this._ValidateNormal() && result;
        }
        result = this._winnerRank.isValid(preventMark) && result;
        result = this._ValidateOrder() && result;

        return result;
    }
    this.save = function() {
        var awardWinner = this._awardWinner;
        awardWinner.beginEdit();
        this.assignValues();
        awardWinner.commit();
        var award = this._award;

        Ext.Ajax.request({
            url: Srims.service.awards.AwardWinnerService + '/SaveAwardWinner',
            params: awardWinner.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                //新建获奖人后，奖励列表，奖励显示，获奖人管理都刷新
                var panelID = 'AwardShowPanel' + award.get('id');
                Srims.awards.listAward(false, false);
                var showPanelID = 'AwardShowPanel' + award.get('id');
                if (Ext.getCmp(showPanelID)) {
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(showPanelID), true);
                    Srims.awards.showAward(award);
                }
                Srims.awards.showAwardWinnerManageWindow(award);
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
Ext.extend(Srims.awards.AwardWinnerManageWindow_AddWinner, Ext.Window);

if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardShowPanel_IntroductionForm = function(award) {
    this._award = award;

    this._textContent = new Ext.form.TextArea({
        fieldLabel: '简介',
        hideLabel: true,
        scroll: true,
        value: award.get('introduction'),
        readOnly: true,
        height: 220,
        width: 850
    });

    Srims.awards.AwardShowPanel_IntroductionForm.superclass.constructor.call(this, {
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
Ext.extend(Srims.awards.AwardShowPanel_IntroductionForm, Ext.form.FormPanel, {});
if (!Srims.awards) 
    Ext.namespace("Srims.awards");
if (!Srims.experts) 
    Ext.namespace("Srims.experts");

Srims.awards.AwardQueryWindow_BasicPanel = function(){
    this._textFieldAwardProjectName = new Ext.form.TextField({
        fieldLabel: '奖励项目名称',
        width: 300
    });
    this._textFieldAwardName = new Ext.form.TextField({
        fieldLabel: '奖励名称',
        width: 150
    });
    this._textFieldAwardWinner = new Ext.form.TextField({
        fieldLabel: '获奖人',
        width: 150
    });
    this._numberFieldAwardWinnerRank = new Ext.form.NumberField({
        fieldLabel: '位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 150
    });
    this._numberFieldAwardYearStart = new Ext.form.NumberField({
        fieldLabel: '年度',
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldAwardYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._comboBoxSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        store: Srims.subjectNatureStore,
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    
    this._columnOne = [this._textFieldAwardName, this._numberFieldAwardYearStart, this._textFieldAwardWinner, this._comboBoxSubjectNature];
    this._columnTwo = [this._numberFieldAwardWinnerRank, this._numberFieldAwardYearEnd, this._comboBoxCollege];
    
    Srims.awards.AwardQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 681,
        items: [this._textFieldAwardProjectName, new Ext.Panel({
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
    this.buildParams = function(params){
        var subjectNatureName = this._comboBoxSubjectNature.getRawValue();
        if (!String.isEmpty(subjectNatureName)) 
            params.subjectNature = this._comboBoxSubjectNature.getValue();
        else 
            params.subjectNature = ''
        
        params.Name = this._textFieldAwardName.getValue();
        params.ProjectName = this._textFieldAwardProjectName.getValue();
        params.AwardWinnerName = this._textFieldAwardWinner.getValue();
        params.AwardWinnerOrder = this._numberFieldAwardWinnerRank.getValue();
        params.YearStart = this._numberFieldAwardYearStart.getValue();
        params.YearEnd = this._numberFieldAwardYearEnd.getValue();
        params.collegeName = this._comboBoxCollege.getText();
    }
    this.clearParams = function(params){
        this._textFieldAwardName.reset();
        this._textFieldAwardProjectName.reset();
        this._textFieldAwardWinner.reset();
        this._numberFieldAwardWinnerRank.reset();
        this._numberFieldAwardYearStart.reset();
        this._numberFieldAwardYearEnd.reset();
        this._comboBoxSubjectNature.reset();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._numberFieldAwardYearStart.isValid(preventMark) && result;
        result = this._numberFieldAwardYearEnd.isValid(preventMark) && result;
        return result;
    }
}
Ext.extend(Srims.awards.AwardQueryWindow_BasicPanel, Ext.FormPanel);


if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardQueryWindow_ExpertPanel = function() {
    return new Srims.component.QueryWindow_MemberPanel('专家信息');
};
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardQueryWindow = function(id, store, queryParams){
    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.awards.AwardQueryWindow_BasicPanel();
    this._otherPanel = new Srims.awards.AwardQueryWindow_OtherPanel();
    this._winnerPanel = new Srims.awards.AwardQueryWindow_ExpertPanel();
    
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
            if (!window.isValid(false)) 
                return;
            //清空筛选条件
            var filters = Ext.getCmp('AwardGridPanel_AwardList')._filters;
            filters.clearFilters();
            
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
            Srims.common.newView(Srims.common.ViewType.AwardQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
        
            Srims.common.showViewWindow(Srims.common.ViewType.AwardQuery);
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
            window.close();
        }
    });
    
    Srims.awards.AwardQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '奖励查询',
        iconCls: 'icon-award-query',
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
            items: [this._basicPanel, this._otherPanel, this._winnerPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._winnerPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._winnerPanel.clearParams();
    }
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._basicPanel.isValid(preventMark) && result;
        return result;
    }
    
    
    this.getGridPanel = function(){
        var gridPanelID = "AwardGridPanel_AwardList";
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
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

Ext.extend(Srims.awards.AwardQueryWindow, Ext.Window);

if (!Srims.awards) 
    Ext.namespace('Srims.awards');

Srims.awards.AwardEditWindow = function(panelId, award){
    this._award = award;
    this._params = {};
    this._id = panelId;
    
    this._basicPanel = new Srims.awards.AwardEditWindow_BasicPanel(award);
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
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
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '经费成员所在学院',
        emptyText: '请选择所属学院',
        value: award.get('collegeName'),
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        entityId: award.get('collegeID'),
        editable: false,
        triggerAction: 'all',
        width: 160
    });
    this._buttonCancle = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
            window.close();
        }
    });
    
    Srims.awards.AwardEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: award.isNew() ? '新建奖励' : '编辑奖励',
        iconCls: award.isNew() ? 'icon-award-new' : 'icon-edit',
        width: 570,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._basicPanel],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancle]
    });
    
    //method
    this.assignValues = function(){
        this._basicPanel.assignValues();
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._basicPanel.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var award = this._award;
        var isNew = this._isNew;
        award.beginEdit();
        this.assignValues();
        award.commit();
        
        Ext.Ajax.request({
            url: Srims.service.awards.AwardService + '/SaveAward',
            params: award.data,
            scope: this,
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.awards.AwardXmlReader()
                });
                var newAward = store.getAt(0);
                if (isNew) {
                    //新建完，列表刷新，显示新建奖励
                    Srims.WorkSpace.getWorkSpace().remove(this);
                    Srims.awards.listAward(false, false);
                    Srims.awards.showAward(newAward);
                }
                else {
                    //编辑完，列表刷新，显示奖励刷新
                    var panelID = 'AwardShowPanel' + award.get('id');
                    Srims.WorkSpace.getWorkSpace().remove(this);
                    Srims.awards.listAward(false, false);
                    if (Ext.getCmp(panelID)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    Srims.awards.showAward(newAward, store);
                }
            }
        })
    }
    
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.awards.AwardEditWindow, Ext.Window);

if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardEditWindow_BasicPanel = function(award){
    this.award = award;
    
    this._fieldName = new Srims.component.NoticeTextSearch.SearchComboBox({
        fieldLabel: '奖励名称',
        noticeTextType: "AwardName",
        value: award.get('name'),
        width: 300
    });
    this._fieldProjectName = new Ext.form.TextField({
        fieldLabel: '奖励项目名称',
        value: award.get('projectName'),
        width: 441
    });
    this._fieldRank = new Srims.component.NoticeTextComboBox({
        fieldLabel: '奖励级别',
        value: award.get('rank'),
        emptyText: '请选择奖励级别',
        noticeTextType: "AwardRank",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldAttendType = new Srims.component.NoticeTextComboBox({
        fieldLabel: '参与类型',
        value: award.get('attendType'),
        allowBlank: false,
        emptyText: '请选择参与类型',
        noticeTextType: "AwardAttendType",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldAuthorisedUnit = new Srims.component.NoticeTextComboBox({
        fieldLabel: '授奖单位',
        value: award.get('authorisedUnit'),
        emptyText: '请选择授奖单位',
        noticeTextType: "AwardAuthorisedUnit",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldClassification = new Srims.component.NoticeTextComboBox({
        fieldLabel: '奖种',
        value: award.get('classification'),
        emptyText: '请选择奖种',
        noticeTextType: "AwardClassification",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldYear = new Ext.form.NumberField({
        fieldLabel: '年度',
        value: award.get('year'),
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 160
    });
    this._fieldClass = new Srims.component.NoticeTextComboBox({
        fieldLabel: '等级',
        value: award.get('class'),
        emptyText: '请选择等级',
        noticeTextType: "AwardClass",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._fieldRemark = new Ext.form.TextField({
        fieldLabel: '奖励备注',
        value: award.get('remark'),
        width: 441
    });
    this._fieldIntroduction = new Ext.form.TextArea({
        fieldLabel: '奖励简介',
        value: award.get('introduction'),
        scroll: true,
        height: 120,
        width: 441
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        emptyText: '请选择所属学院',
        value: award.get('collegeName'),
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        entityId: award.get('collegeID'),
        editable: false,
        triggerAction: 'all',
        width: 160
    });
    
    var user = Srims.currentLoginLog.user;
    var value = award.get('subjectNature');
    
    if (user.hasPermission_editLiteralAward && !user.hasPermission_editScienceAward) 
        value = Srims.SubjectNature.Liberal;
    if (!user.hasPermission_editLiteralAward && user.hasPermission_editScienceAward) 
        value = Srims.SubjectNature.Science;
    
    this._comboBoxSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科性质',
        value: value,
        store: Srims.subjectNatureStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        disabled: !(user.hasPermission_editLiteralAward && user.hasPermission_editScienceAward),
        width: 160
    });
    
    //constructor
    var columnOneItems = [this._fieldRank, this._fieldAttendType, this._fieldAuthorisedUnit, this._comboBoxCollege];
    var columnTwoItems = [this._fieldYear, this._fieldClass, this._fieldClassification, this._comboBoxSubjectNature];
    
    Srims.awards.AwardQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        width: 660,
        items: [this._fieldName, new Ext.Panel({
            widht: 660,
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
        }), this._fieldRemark, this._fieldProjectName, this._fieldIntroduction]
    });
    
    //method
    this.assignValues = function(){
        this.award.set('name', this._fieldName.getValue());
        this.award.set('projectName', this._fieldProjectName.getValue());
        this.award.set('attendType', this._fieldAttendType.getValue());
        this.award.set('rank', this._fieldRank.getValue());
        this.award.set('attendType', this._fieldAttendType.getValue());
        this.award.set('authorisedUnit', this._fieldAuthorisedUnit.getValue());
        this.award.set('collegeID', this._comboBoxCollege.getValue());
        this.award.set('classification', this._fieldClassification.getValue());
        this.award.set('year', this._fieldYear.getValue());
        this.award.set('class', this._fieldClass.getValue());
        this.award.set('remark', this._fieldRemark.getValue());
        this.award.set('introduction', this._fieldIntroduction.getValue());
        this.award.set('subjectNature', this._comboBoxSubjectNature.getValue());
    }
    
    this.clearParams = function(){
        this._fieldName.reset();
        this._fieldProjectName.reset();
        this._fieldAttendType.reset();
        this._fieldRank.reset();
        this._fieldAttendType.reset();
        this._fieldAuthorisedUnit.reset();
        this._fieldClassification.reset();
        this._fieldYear.reset();
        this._fieldClass.reset();
        this._fieldRemark.reset();
        this._fieldIntroduction.reset();
    }
    
    this._ValidateAwardName = function(){
        if (this._fieldName.getValue().trim().length == 0) {
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
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._fieldName.isValid(preventMark) && result;
        result = this._fieldAttendType.isValid(preventMark) && result;
        result = this._fieldYear.isValid(preventMark) && result;
        result = this._ValidateAwardName() && result;
        return result;
    }
}

Ext.extend(Srims.awards.AwardEditWindow_BasicPanel, Ext.FormPanel);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocument = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'authorName',
    type: 'string',
    mapping: 'AuthorName'
}, {
    name: 'authorId',
    type: 'string',
    mapping: 'AuthorId'
}, {
    name: 'awardName',
    type: 'string',
    mapping: 'AwardName'
}, {
    name: 'censor',
    type: 'string',
    mapping: 'Censor'
}, {
    name: 'awardFirstWinnerName',
    type: 'string',
    mapping: 'AwardFirstWinnerName'
}, {
    name: 'censorDateTime',
    type: 'date',
    mapping: 'CensorDateTime'
}, {
    name: 'resource',
    type: 'string',
    mapping: 'Resource'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'submitDateTime',
    type: 'date',
    mapping: 'SubmitDateTime'
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_CensorPass',
    type: 'boolean',
    mapping: 'HasPermission_CensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_CensorReject',
    type: 'boolean',
    mapping: 'HasPermission_CensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'boolean',
    mapping: 'CanCensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPass',
    type: 'boolean',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.documents.AwardDocument);

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.documents.AwardDocumentXmlReader.superclass.constructor.call(this, Srims.documents.AwardDocument);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.documents.AwardDocumentStore.superclass.constructor.call(this, new Srims.documents.AwardDocumentXmlReader(), load_url, params);
    }
});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentManageWindow = function(id, award){

    this._id = id;
    this._award = award;
    
    var load_url = Srims.service.documents.AwardDocumentService + '/GetByAwardID';
    var params = {
        awardId: award.get('id')
    };
    this._store = new Srims.documents.AwardDocumentStore(load_url, params);
    
    this._DocumentGridPanel = new Srims.documents.AwardDocumentGridPanel('awardDocumentList' + award.get('id'), award, false, this._store);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    Srims.documents.AwardDocumentManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: award.get('name') + '文档模板管理',
        width: 700,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._DocumentGridPanel],
        buttons: [this._buttonClose]
    });
    
    this._store.load();
}
Ext.extend(Srims.documents.AwardDocumentManageWindow, Ext.Window, {});


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentGridPanel = function(id, award, isCensor, store){

    this._award = award;
    
    this._columnModel = new Srims.documents.AwardDocumentGridPanel_ColumnModel(isCensor);
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.AwardDocumentGridPanel_ToolBar(this._selections, store, this._award, isCensor)
    
    var params = {};
    params.id = id;
    params.sm = this._selections;
    params.store = store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    if (!isCensor) 
        params.height = 270;
    if (isCensor) 
        params.title = '待审核奖励文档列表';
    
    Srims.documents.AwardDocumentGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.awards.downLoadAwardDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.AwardDocumentGridPanel, Srims.component.GridPanel, {});

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentGridPanel_ToolBar = function(selection, store, award, isCensor){

    //fields
    this._selection = selection;
    this._store = store;
    this._award = award;
    
    this._buttonSubmitDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传奖励文档',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        award: this._award,
        handler: function(){
            Srims.awards.showAwardDocumentUploadWindow(this.award, this.store);
        },
        tooltip: '<b>上传奖励文档文档</b>'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.awards.downLoadAwardDocument(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>查看选中的奖励文档'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('审核通过文档', '你确定要审核通过这个奖励文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.awards.censorPassAwardDoucment(this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过文档</b>'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.awards.showAwardDocumentCensorRejctWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>审核驳回文档</b>'
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
            
            Ext.MessageBox.confirm('删除文档', '你确定要删除这个奖励文档吗？', function(buttonId){
                if (buttonId == 'yes') {
                    Srims.awards.deleteAwardDocument(this.selection.getSelected(), this.store);
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文档</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>刷新奖励文档列表'
    });
    Srims.documents.AwardDocumentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitDocument, this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    
    this._buttonSubmitDocument.setVisible(!isCensor && award.get('hasPermission_UploadAwardDocument'));
    if (award) 
        this._buttonSubmitDocument.setDisabled(!award.get('canUploadAwardDocument'));
    
    
    //initial
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonDelete = selection.buttonDelete;
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        var document = selection.getSelected();
        
        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        
        buttonDelete.setVisible(document.get('hasPermission_Delete') && !isCensor);
        buttonDelete.setDisabled(!document.get('canDelete'));
        
        buttonShow.setVisible(true);
        buttonShow.setDisabled(false);
        
        buttonCensorPass.setVisible(document.get('canCensorPass'));
        buttonCensorReject.setVisible(document.get('canCensorReject'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.documents.AwardDocumentGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.documents) 
    Ext.namespace('Srims.documents');
Srims.documents.AwardDocumentGridPanel_ColumnModel = function(isCensor){
    Srims.documents.AwardDocumentGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '奖励名称',
        dataIndex: 'awardName',
        hidden: !isCensor,
        width: 260
    }, {
        header: '第一获奖人',
        dataIndex: 'awardFirstWinnerName',
        hidden: !isCensor
    }, {
        header: '文档名称',
        dataIndex: 'name'
    }, {
        header: '提交时间',
        dataIndex: 'submitDateTime',
        renderer: Date.render
    }, {
        header: '提交人',
        dataIndex: 'authorName'
    }, {
        header: '状态',
        dataIndex: 'state',
        renderer: Srims.CensorState.Render
    }, {
        header: '审核时间',
        dataIndex: 'censorDateTime',
        renderer: Date.render
    }, {
        header: '审核人',
        dataIndex: 'censor'
    }])
};

Ext.extend(Srims.documents.AwardDocumentGridPanel_ColumnModel, Ext.grid.ColumnModel)


if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentUploadWindow = function(id, award, store){

    this._id = id;
    this._award = award;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
        }
    });
    this._comboBoxDocumentName = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文档名称',
        noticeTextType: 'AwardDocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传文档',
        width: 160,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        
        return result;
    }
    Srims.documents.AwardDocumentUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目文档',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
    this._buttonUpload_click = function(){
        var window = this.window;
        
        if (!window.isValid(false)) 
            return;
        
        this.setText('正在保存');
        this.disable();
        
        var saveParams = {
            awardId: window._award.get('id'),
            name: window._comboBoxDocumentName.getValue()
        }
        
        window.formPanel = window._formPanelDocument;
        window.store = window._store;
        
        Srims.documents.submitResource(window, saveParams, Srims.service.documents.AwardDocumentService + '/UpLoad', '正在上传奖励文档', '上传文档奖励成功', '成功上传奖励文档');
    }
    this._buttonUpload.window = this;
    this._buttonUpload.on('click', this._buttonUpload_click);
}
Ext.extend(Srims.documents.AwardDocumentUploadWindow, Ext.Window, {})

if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentCensorRejectWindow = function(id, awardDocument, store){

    this._awardDocument = awardDocument;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonCensor = new Ext.Button({
        minWidth: 80,
        text: '审核驳回',
        window: this
    });
    
    this._textRemark = new Ext.form.TextArea({
        fieldLabel: '驳回理由',
        height: 60,
        width: 240
    });
    
    Srims.documents.AwardDocumentCensorRejectWindow.superclass.constructor.call(this, {
        id: id,
        title: '审核驳回奖励文档：' + this._awardDocument.get('name'),
        width: 370,
        autoHeight: true,
        labelWidth: 60,
        bodyStyle: 'padding:10px 10px 20px 10px',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._textRemark],
        buttons: [this._buttonCensor, this._buttonClose]
    });
    
    this.buttonCensor_click = function(button, e){
        var window = this.window;
        var remark = window._textRemark.getValue();
        
        Srims.awards.censorRejectAwardDocument(window._awardDocument, store, remark);
        window.close();
    }
    this._buttonCensor.on('click', this.buttonCensor_click);
}
Ext.extend(Srims.documents.AwardDocumentCensorRejectWindow, Ext.Window);

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

if (!Srims.awards)
    Ext.namespace("Srims.awards");
Ext.namespace('Srims.awards.AwardColumns');

Srims.awards.AwardExportColumns = [['Name', '奖励名称', , '200'],
['Rank', '奖励级别', , '80'],
['Class', '等级', , '100'],
['AttendType', '参与类型', , '50'],
['AuthorisedUnit', '授权单位', , '150'],
['Classification', '奖种', , '100'],
['Year', '年度', , '50'],
['CollegeName', '所属学院', , '150'],
['AwardFirstWinnerName', '第一获奖人', , '40'],
['AwardSecondWinnerName', '第二获奖人', , '40'],
['AwardThirdWinnerName', '第三获奖人', , '40'],
['AwardFourthWinnerName', '第四获奖人', , '40'],
['AwardFifthWinnerName', '第五获奖人', , '40'],
['ProjectName', '奖励项目名称', , '200'],
['Remark', '奖励备注', , '100'],
['Introduction', '简介', , '800']];