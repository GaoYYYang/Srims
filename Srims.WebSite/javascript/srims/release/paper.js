
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.Language');

Srims.papers.Language.others = 'others';
Srims.papers.Language.Chinese = 'Chinese';
Srims.papers.Language.English = 'English';
Srims.papers.Language.GerMan = 'GerMan';
Srims.papers.Language.Japanese = 'Japanese';
Srims.papers.Language.Rumanian = 'Rumanian';
Srims.papers.Language.Spanish = 'Spanish';

Srims.papers.LanguageRender = function(value, metadata){
    switch (value) {
        case 'others':
            return '其他';
        case 'Chinese':
            return '中文';
        case 'English':
            return '英语';
        case 'GerMan':
            return '德语';
        case 'Japanese':
            return '日语';
        case 'Rumanian':
            return '俄语';
        case 'Spanish':
            return '西班牙语';
        default:
            return '未知';
    }
}

Srims.papers.languageFilterItems = [{
    id: 'others',
    text: '其他'
}, {
    id: 'Chinese',
    text: '中文'
}, {
    id: 'English',
    text: '英语'
}, {
    id: 'GerMan',
    text: '德语'
}, {
    id: 'Japanese',
    text: '日语'
}, {
    id: 'Rumanian',
    text: '俄语'
}, {
    id: 'Spanish',
    text: '西班牙语'
}];

Srims.papers.languageStore = [['others', '其他'], ['Chinese', '中文'], ['English', '英语'], ['GerMan', '德语'], ['Japanese', '日语'], ['Rumanian', '俄语'], ['Spanish', '西班牙语']];

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

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.SystemSettingStore.superclass.constructor.call(this, new Srims.common.SystemSettingXmlReader(), load_url, params);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');
	
	Srims.common.SystemSettingXmlReader = Ext.extend(Srims. data.XmlReader,{
		constructor: function(){
			Srims.common.SystemSettingXmlReader.superclass.constructor.call(this,Srims.common.SystemSetting);
		}
	});
if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.SystemSetting = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'fundOutRatio',
    type: 'int',
    mapping: 'FundOutRatio'
}, {
    name: 'horizontalVoucher',
    type: 'int',
    mapping: 'HorizontalVoucher'
}, {
    name: 'verticalVoucher',
    type: 'int',
    mapping: 'VerticalVoucher'
}, {
    name: 'defaultOverheadExpenseInRateHorizonal',
    type: 'int',
    mapping: 'DefaultOverheadExpenseInRateHorizonal'
}, {
    name: 'defaultOverheadExpenseOutRateHorizonal',
    type: 'int',
    mapping: 'DefaultOverheadExpenseOutRateHorizonal'
}, {
    name: 'defaultOverheadExpenseInRateVertical',
    type: 'int',
    mapping: 'DefaultOverheadExpenseInRateVertical'
}, {
    name: 'defaultOverheadExpenseOutRateVertical',
    type: 'int',
    mapping: 'DefaultOverheadExpenseOutRateVertical'
}, {
    name: 'logType',
    type: 'string',
    mapping: 'LogType'
}, {
    name: 'emailAddress',
    type: 'string',
    mapping: 'EmailAddress'
}, {
    name: 'smtpHost',
    type: 'string',
    mapping: 'SmtpHost'
}, {
    name: 'smtpPort',
    type: 'string',
    mapping: 'SmtpPort'
}, {
    name: 'smtpPassword',
    type: 'string',
    mapping: 'SmtpPassword'
}, {
    name: 'smtpUsername',
    type: 'string',
    mapping: 'SmtpUsername'
}, {
    name: 'financeWebAddress',
    type: 'string',
    mapping: 'FinanceWebAddress'
}, {
    name: 'expertWebAddress',
    type: 'string',
    mapping: 'ExpertWebAddress'
}, {
    name: 'windowsServiceType',
    type: 'string',
    mapping: 'WindowsServiceType'
}, {
    name: 'paperDescription',
    type: 'string',
    mapping: 'PaperDescription'
}]);
Srims.data.Entity.apply(Srims.common.SystemSetting);


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

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace("Srims.papers.PublishType");

Srims.papers.PublishType.B = 'B';
Srims.papers.PublishType.J = 'J';
Srims.papers.PublishType.S = 'S';
Srims.papers.PublishType.C = 'C';

Srims.papers.PublishTypeRender = function(value, metadata){
    switch (value) {
        case 'B':
            return 'B';
        case 'J':
            return 'J';
        case 'S':
            return 'S';
        case 'C':
            return 'C';
        default:
            return '未知';
    }
}

Srims.papers.publishTypeStore = [['B', 'B'], ['J', 'J'], ['S', 'S'], ['C', 'C'], ['UnKnown', '未知']];

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.Magazine = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'fullName',
    type: 'string',
    mapping: 'FullName'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
}, {
    name: 'isDelete',
    type: 'boolean',
    mapping: 'IsDelete',
    convert: Boolean.toBoolean
}, {
    name: 'issn',
    type: 'string',
    mapping: 'ISSN'
}, {
    name: 'language',
    type: 'string',
    mapping: 'Language'
}, {
    name: 'publishCompany',
    type: 'string',
    mappping: 'PublishCompany'
}, {
    name: 'publishCompanyAddress',
    type: 'string',
    mapping: 'PublishCompanyAddress'
}, {
    name: 'publishCompanyCity',
    type: 'string',
    mapping: 'PublishCompanyCity'
}, {
    name: 'publishType',
    type: 'string',
    mapping: 'PublishType'
}, {
    name: 'subjectRank',
    type: 'string',
    mapping: 'SubjectRank'
}, {
    name: 'subjectClass',
    type: 'string',
    mapping: 'SubjectClass'
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowMagazineInformation',
    type: 'boolean',
    mapping: 'HasPermission_ShowMagazineInformation',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditMagazineInformation',
    type: 'boolean',
    mapping: 'HasPermission_EditMagazineInformation',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_MagazineInformation',
    type: 'boolean',
    mapping: 'CanEdit_MagazineInformation',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_MagazineInformation',
    type: 'boolean',
    mapping: 'CanShow_MagazineInformation',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditMagazineOccupation',
    type: 'boolean',
    mapping: 'HasPermission_EditMagazineOccupation',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_MagazineOccupation',
    type: 'boolean',
    mapping: 'CanEdit_MagazineOccupation',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.papers.Magazine);
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.MagazineXmlReader.superclass.constructor.call(this, Srims.papers.Magazine);
    }
});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.papers.MagazineStore.superclass.constructor.call(this, new Srims.papers.MagazineXmlReader(), load_url, params);
    }
});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.listMagazine = function(showQueryWindow){
    Srims.papers._listMagazine('MagazineList', '杂志列表', 'icon-magazine-list', showQueryWindow);
}

Srims.papers._listMagazine = function(id, name, iconCls, showQueryWindow){
    var panelId = 'MagazineGridPanel_' + id;
    var magazineStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (panel) {
        magazineStore = panel.getStore();
        magazineStore.load();
    }
    else {
        magazineStore = new Srims.papers.MagazineStore(Srims.service.papers.MagazineService + '/Query', queryParams);
        panel = new Srims.papers.MagazineGridPanel(panelId, magazineStore, name, iconCls, queryParams);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        Srims.papers.showMagazineQueryWindow(panelId + '_QueryWindow', magazineStore, true, queryParams, panel);
    }
}
Srims.papers.listMagazineOccupation = function(){
    Srims.papers._listMagazineOccupation('MagazineOccupationList', '杂志任职列表', 'icon-magazine-Occupation');
}

Srims.papers._listMagazineOccupation = function(id, name, iconCls){
    var panelId = 'MagazineOccupationGridPanel_' + id;
    var magazineOccupationStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (panel) {
        magazineOccupationStore = panel.getStore();
        magazineOccupationStore.load();
    }
    else {
        magazineOccupationStore = new Srims.papers.MagazineOccupationStore(Srims.service.papers.MagazineOccupationService + '/Query');
        panel = new Srims.papers.MagazineOccupationManageGridPanel(panelId, magazineOccupationStore, name, iconCls);
        panel.getStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.papers.showMagazineQueryWindow = function(id, store, isMagazineQuery, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.papers.MagazineQueryWindow(id, store, isMagazineQuery, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}
Srims.papers.showMagazine = function(magazine, store){
    var panelId = 'MagazineShowPanel' + magazine.get('id');
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.papers.MagazineShowPanel(panelId, magazine, store);
    Srims.WorkSpace.addPanel(panel);
}
Srims.papers.newMagazine = function(){
    var Id = "NewMagazineWindow";
    var window = Ext.getCmp(id);
    if (!window) {
        var magazine = new Srims.papers.Magazine({});
        var window = new Srims.papers.MagazineEditWindow(Id, magazine);
    }
    window.show();
}
Srims.papers.editMagazine = function(magazine){
    var Id = "MagazineEditWindow" + magazine.get('id');
    var window = Ext.getCmp(id);
    if (!window) 
        var window = new Srims.papers.MagazineEditWindow(Id, magazine);
    window.show();
}
Srims.papers.deleteMagazine = function(magazine, store){
    Ext.MessageBox.confirm('删除杂志', '你确定要删除这个杂志吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.magazineID = magazine.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.papers.MagazineService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    var panelId = "MagazineShowPanel" + magazine.get('id');
                    closePanel(panelId);
                    var windowId = "MagazineEditWindow" + magazine.get('id');
                    closeWindow(windowId);
                    var windowId = "MagazineYearInforManageWindow_" + magazine.get('id');
                    closeWindow(windowId);
                    var windowId = "MagazineOccupationManageWindow_" + magazine.get('id');
                    closeWindow(windowId);
                    Srims.papers.listMagazine(false);
                }
            });
        }
    }, this);
}
Srims.papers.showMagazineYearInforMagazineWindow = function(magazine){
    var windowId = 'MagazineYearInforManageWindow_' + magazine.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) 
        window = new Srims.papers.MagazineInformationWindow(windowId, magazine);
    else 
        window._magazineInformationGridPanel.getStore().load();
    window.show();
}
Srims.papers.newMagazineInformation = function(magazine, store){
    var windowId = 'NewMagazineInformation' + magazine.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        var magazineInformation = new Srims.papers.MagazineInformation({});
        window = new Srims.papers.MagazineInformationEditWindow(windowId, magazineInformation, magazine, store);
    }
    window.show();
}
Srims.papers.editMagazineInformation = function(magazine, magazineInformation, store){
    var windowId = 'EditMagazineInformation' + magazineInformation.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.papers.MagazineInformationEditWindow(windowId, magazineInformation, magazine, store);
    }
    window.show();
}
Srims.papers.deleteMagazineInformation = function(magazineInformation, store, magazine){
    Ext.MessageBox.confirm('删除杂志年度信息', '你确定要删除这项信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.magazineInforID = magazineInformation.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.papers.MagazineInformationService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    var panelId = 'MagazineShowPanel' + magazine.get('id');
                    closePanel(panelId);
                    Srims.papers.showMagazine(magazine);
                    store.load();
                }
            });
        }
    }, this);
}
Srims.papers.showMagazineOccupationManageWindow = function(magazine){
    var windowId = 'MagazineOccupationManageWindow_' + magazine.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) 
        window = new Srims.papers.MagazineOccupationWindow(windowId, magazine);
    else 
        window._magazineOccupationGridPanel.getStore().load();
    window.show();
}
Srims.papers.newMagazineOccupation = function(magazine, store){
    var windowId = 'NewMagazineOccupation';
    var window = Ext.getCmp(windowId);
    if (!window) {
        var magazineOccupation = new Srims.papers.MagazineOccupation({});
        window = new Srims.papers.MagazineOccupationEditWindow(windowId, magazineOccupation, magazine, store);
    }
    window.show();
}
Srims.papers.editMagazineOccupation = function(magazine, magazineOccupation, store){
    var windowId = 'EditMagazineOccupation' + magazineOccupation.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.papers.MagazineOccupationEditWindow(windowId, magazineOccupation, magazine, store);
    }
    window.show();
}
Srims.papers.deleteMagazineOccupation = function(magazineOccupation, store, magazine){
    Ext.MessageBox.confirm('删除杂志任职信息', '你确定要删除这项信息吗？', function(buttonId){
        if (buttonId == 'yes') {
            var params = {};
            params.magazineOccupationID = magazineOccupation.get('id');
            
            Ext.Ajax.request({
                url: Srims.service.papers.MagazineOccupationService + '/Delete',
                params: params,
                scope: this,
                success: function(){
                    var panelId = 'MagazineShowPanel' + magazine.get('id');
                    closePanel(panelId);
                    Srims.papers.showMagazine(magazine);
                    store.load();
                }
            });
        }
    }, this);
}
Srims.papers.showImportMagazineWindow = function(store){
    var windowId = 'MagazineImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.papers.MagazineService + '/Import', '导入杂志数据', false);
    
    window.show();
}
Srims.papers.showImportMagazineInformationWindow = function(store){
    var windowId = 'MagazineInformationImportWindow';
    var window = Ext.getCmp(windowId);
    
    if (!window) 
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.papers.MagazineInformationService + '/Import', '导入杂志年度信息数据', true);
    
    window.show();
}
function closePanel(panelId){
    if (Srims.WorkSpace.active(panelId)) {
        var panel = Ext.getCmp(panelId);
        Srims.WorkSpace.getWorkSpace().remove(panel);
    }
}

function closeWindow(windowId){
    var window = Ext.getCmp(windowId);
    if (window) 
        window.close();
}

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineGridPanel_ColumnModel = function(){
    Srims.papers.MagazineGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "杂志名称",
        dataIndex: 'fullName',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "ISSN",
        dataIndex: 'issn',
        sortable: true,
        width: 30,
        hidden: false
    }, {
        header: "语言",
        dataIndex: 'language',
        sortable: true,
        hidden: false,
        width: 30,
        renderer: Srims.papers.LanguageRender
    }, {
        header: "学科等级",
        dataIndex: 'subjectRank',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "简称",
        dataIndex: 'shortName',
        width: 40,
        sortable: true,
        hidden: true
    }, {
        header: "已删除",
        dataIndex: 'isDelete',
        width: 20,
        sortable: true,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "出版公司",
        dataIndex: 'publishCompany',
        width: 40,
        sortable: true,
        hidden: true
    }, {
        header: "出版公司地址",
        dataIndex: 'publishCompanyAddress',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "出版公司所在城市",
        dataIndex: 'publishCompanyCity',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "出版类型",
        dataIndex: 'publishType',
        width: 40,
        sortable: true,
        hidden: true,
        renderer: Srims.papers.PublishTypeRender
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.MagazineGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineGridPanel_GridFilters = function(){
    Srims.papers.MagazineGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'fullName'
        }, {
            type: 'string',
            dataIndex: 'issn'
        }, {
            type: 'list',
            dataIndex: 'language',
            options: Srims.papers.languageFilterItems,
            phpMode: true
        }, {
            type: 'list',
            labelField: 'value',
            dataIndex: 'subjectRank',
            store: new Srims.data.IDValueRecordStore(Srims.service.papers.MagazineService + '/GetSubjectRank'),
            phpMode: true
        }]
    });
}
Ext.extend(Srims.papers.MagazineGridPanel_GridFilters, Ext.grid.GridFilters);


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineGridPanel_ToolBar = function(selection, store, panelId, isMagazineQuery, queryParams){

    //fields
    this._panelId = panelId;
    this._isMagazineQuery = isMagazineQuery;
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        isManageQuery: this._isMagazineQuery,
        handler: function(){
            Srims.papers.showMagazineQueryWindow(this.panelId + '_QueryWindow', this.store, this.isManageQuery, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>杂志查询</b><br/>对杂志信息进行复杂查询'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.papers.newMagazine();
        },
        tooltip: '<b>添加杂志</b><br/>输入杂志信息以添加杂志'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.papers.showImportMagazineWindow(this.store);
        },
        tooltip: '<b>杂志导入</b><br/>将杂志从excel表导入到数据库中'
    });
    this._buttonImportMagazineInformation = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入年度信息',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.papers.showImportMagazineInformationWindow(this.store);
        },
        tooltip: '<b>杂志年度信息导入</b><br/>将杂志的年度信息从excel表导入到数据库中'
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
            Srims.papers.showMagazine(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看杂志</b><br/>显示所选杂志的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editMagazine(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑杂志</b><br/>编辑选中杂志的信息'
    });
    this._buttonYearInforManage = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '年度信息管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.showMagazineYearInforMagazineWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑杂志年度信息</b><br/>编辑选中杂志的年度信息'
    });
    this._buttonOccupationManage = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '任职信息管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.showMagazineOccupationManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑杂志任职信息</b><br/>编辑选中杂志的任职信息'
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
            Srims.papers.deleteMagazine(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>删除杂志</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新杂志列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    this._buttonImport.setVisible(user.userRoleType == 'Administrator');
    this._buttonImportMagazineInformation.setVisible(user.userRoleType == 'Administrator');
    
    Srims.papers.MagazineGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonNew, this._buttonImport, this._buttonImportMagazineInformation, this._buttonShow, this._buttonEdit, this._buttonYearInforManage, this._buttonOccupationManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonYearInforManage = this._buttonYearInforManage;
    this._selection.buttonOccupationManage = this._buttonOccupationManage;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonYearInforManage = selection.buttonYearInforManage;
        var buttonOccupationManage = selection.buttonOccupationManage;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonYearInforManage.hide();
            buttonOccupationManage.hide();
            return;
        }
        
        var magazine = selection.getSelected();
        
        buttonShow.setVisible(magazine.get('hasPermission_Show'));
        buttonShow.setDisabled(!magazine.get('canShow'));
        
        buttonEdit.setVisible(magazine.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!magazine.get('canEdit'));
        
        buttonDelete.setVisible(magazine.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!magazine.get('canEdit'));
        
        buttonYearInforManage.setVisible(magazine.get('hasPermission_EditMagazineInformation'));
        buttonYearInforManage.setDisabled(!magazine.get('canEdit_MagazineInformation'));

        buttonOccupationManage.setVisible(magazine.get('hasPermission_EditMagazineOccupation'));
        buttonOccupationManage.setDisabled(!magazine.get('canEdit_MagazineOccupation'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.MagazineGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineGridPanel = function(id, magazineStore, title, iconCls, queryParams){

    //fields
    this._magazineStore = magazineStore;
    this._magazineStore.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.papers.MagazineGridPanel_ColumnModel();
    
    this._filters = new Srims.papers.MagazineGridPanel_GridFilters();
    this._toolbar = new Srims.papers.MagazineGridPanel_ToolBar(this._selections, this._magazineStore, id, true, queryParams);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._magazineStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.papers.MagazineGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var magazine = grid.getStore().getAt(rowIndex);
        Srims.papers.showMagazine(magazine);
    }
}
Ext.extend(Srims.papers.MagazineGridPanel, Srims.component.GridPanel);

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineInformation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'year',
    type: 'int',
    mapping: 'Year'
}, {
    name: 'influenceFactor',
    type: 'int',
    mapping: 'InfluenceFactor'
}, {
    name: 'citeFrequency',
    type: 'int',
    mapping: 'CiteFrequency'
}, {
    name: 'subAirer',
    type: 'int',
    mapping: 'SubAirer'
}, {
    name: 'instantExponent',
    type: 'int',
    mapping: 'InstantExponent'
}, {
    name: 'paperCount',
    type: 'int',
    mapping: 'PaperCount'
}, {
    name: 'citeHalfLife',
    type: 'string',
    mapping: 'CiteHalfLife'
}])

Srims.data.Entity.apply(Srims.papers.MagazineInformation);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationGridPanel_ColumnModel = function(){
    Srims.papers.MagazineInformationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '年份',
        dataIndex: 'year',
        width: 100
    }, {
        header: '影响因子',
        dataIndex: 'influenceFactor',
        renderer: InfluenceFactor.render,
        width: 100
    }, {
        header: '被引频次',
        dataIndex: 'citeFrequency',
        width: 100
    }, {
        header: '分区',
        dataIndex: 'subAirer',
        width: 100
    }, {
        header: '即年指数',
        dataIndex: 'instantExponent',
        width: 100,
        renderer: InfluenceFactor.render
    }, {
        header: '论文数',
        dataIndex: 'paperCount',
        width: 100
    }, {
        header: '引用半衰期',
        dataIndex: 'citeHalfLife',
        width: 100
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.MagazineInformationGridPanel_ColumnModel, Ext.grid.ColumnModel);


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationGridPanel_ToolBar = function(selection, store, magazine){

    //fields
    this._selection = selection;
    this._store = store;
    this._magazine = magazine;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        magazine: this._magazine,
        handler: function(){
            Srims.papers.newMagazineInformation(this.magazine, this.store);
        },
        hidden: true,
        tooltip: '<b>新建杂志年度信息</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        magazine: this._magazine,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editMagazineInformation(this.magazine, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑杂志年度信息</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        magazine: this._magazine,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deleteMagazineInformation(this.selection.getSelected(), this.store, this.magazine);
        },
        hidden: true,
        tooltip: '<b>删除杂志年度信息</b>'
    });
    
    
    
    Srims.papers.MagazineInformationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
    this._buttonNew.setVisible(true);
    this._buttonNew.setVisible(magazine.get('hasPermission_EditMagazineInformation'));
    this._buttonNew.setDisabled(!magazine.get('canEdit_MagazineInformation'));
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
        }
        
        buttonEdit.setVisible(magazine.get('hasPermission_EditMagazineInformation'));
        buttonEdit.setDisabled(!magazine.get('canEdit_MagazineInformation'));
        
        buttonDelete.setVisible(magazine.get('hasPermission_EditMagazineInformation'));
        buttonDelete.setDisabled(!magazine.get('canEdit_MagazineInformation'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.MagazineInformationGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationGridPanel = function(magazine){

    this._magazine = magazine;
    this._store = new Srims.papers.MagazineInformationStore(magazine.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.papers.MagazineInformationGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.papers.MagazineInformationGridPanel_ToolBar(this._selections, this._store, this._magazine)
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        autoFill: true,
        emptyText: '该杂志目前无年度信息'
    });
    
    //public methods
    this.getMagazineInformationStore = function(){
        return this._store;
    }
    
    Srims.papers.MagazineInformationGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var magazineInformation = grid.getMagazineInformationStore().getAt(rowIndex);
        Srims.papers.editMagazineInformation(this._magazine, magazineInformation, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.papers.MagazineInformationGridPanel, Ext.grid.GridPanel, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(magazineID){
        Srims.papers.MagazineStore.superclass.constructor.call(this, new Srims.papers.MagazineInformationXmlReader(), Srims.service.papers.MagazineInformationService + '/GetByMagazineID', {
            magazineId: magazineID
        });
    }
});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineInformationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.MagazineInformationXmlReader.superclass.constructor.call(this, Srims.papers.MagazineInformation);
    }
});


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineQueryWindow = function(id, store, isMagazineQuery, queryParams){

    this._id = id;
    this._store = store;
    this._isMagazineQuery = isMagazineQuery;
    this._params = queryParams;
    
    this._basicPanel = new Srims.papers.MagazineQueryWindow_InforPanel(this._isMagazineQuery);
    
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
    
    Srims.papers.MagazineQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '杂志查询',
        iconCls: 'icon-magazine-query',
        width: 720,
        height: 400,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 500,
            layout: 'form',
            labelWidth: 100,
            items: [this._basicPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        this._basicPanel.buildParams(params);
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    
    this.getGridPanel = function(){
        var gridPanelID = "MagazineGridPanel_MagazineList";
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
Ext.extend(Srims.papers.MagazineQueryWindow, Ext.Window);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineShowPanel_BasicForm = function(magazine, isPaperShow){
    this._magazine = magazine;
    this._isPaperShow = isPaperShow;
    this._fieldFullName = new Ext.form.Field({
        fieldLabel: '全称',
        value: magazine.get('fullName'),
        readOnly: true,
        width: 500,
        hidden: this._isPaperShow,
        hideLabel: this._isPaperShow
    });
    this._fieldShortName = new Ext.form.Field({
        fieldLabel: '简称',
        value: magazine.get('shortName'),
        readOnly: true,
        width: 160
    });
    this._fieldISSN = new Ext.form.Field({
        fieldLabel: 'ISSN',
        value: magazine.get('issn'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguage = new Ext.form.Field({
        fieldLabel: '语种',
        value: Srims.papers.LanguageRender(magazine.get('language')),
        readOnly: true,
        width: 160
    });
    this._fieldPublishType = new Ext.form.Field({
        fieldLabel: '出版类型',
        value: Srims.papers.PublishTypeRender(magazine.get('publishType')),
        readOnly: true,
        width: 160
    });
    this._fieldSubjectClass = new Ext.form.Field({
        fieldLabel: '学科分类',
        value: magazine.get('subjectClass'),
        readOnly: true,
        width: 160
    });
    this._fieldSubjectRank = new Ext.form.Field({
        fieldLabel: '期刊等级',
        value: magazine.get('subjectRank'),
        readOnly: true,
        width: 160
    });
    this._fieldPublishCompany = new Ext.form.Field({
        fieldLabel: '出版公司',
        value: magazine.get('publishCompany'),
        readOnly: true,
        width: 160,
        hidden: this._isPaperShow,
        hideLabel: this._isPaperShow
    });
    this._fieldPublishCompanyCity = new Ext.form.Field({
        fieldLabel: '公司所在城市',
        value: magazine.get('publishCompanyCity'),
        readOnly: true,
        width: 160,
        hidden: this._isPaperShow,
        hideLabel: this._isPaperShow
    });
    this._fieldPublishCompanyAddress = new Ext.form.Field({
        fieldLabel: '公司地址',
        value: magazine.get('publishCompanyAddress'),
        readOnly: true,
        width: 500,
        hidden: this._isPaperShow,
        hideLabel: this._isPaperShow
    });
    var columnFirstItems = [this._fieldShortName, this._fieldLanguage, this._fieldSubjectClass, this._fieldPublishCompany];
    var columnSecondItems = [this._fieldISSN, this._fieldPublishType, this._fieldSubjectRank, this._fieldPublishCompanyCity];
    
    Srims.papers.MagazineShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '杂志基本信息',
        Height: 500,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldFullName, new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._fieldPublishCompanyAddress]
    });
}

Ext.extend(Srims.papers.MagazineShowPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineShowPanel_YearInforForm = function(magazineId, isPaperShow){
    this._magazineId = magazineId;
    this._isPaperShow = isPaperShow;
    
    this._store = new Srims.papers.MagazineInformationStore(magazineId);
    this._columnModel = new Srims.papers.MagazineInformationGridPanel_ColumnModel();
    
    this._gridPanelMagazineInformation = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 720,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有年度信息'
        }
    });
    Srims.papers.MagazineShowPanel_YearInforForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '杂志年度信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelMagazineInformation]
    });
    
    this._store.load();
}
Ext.extend(Srims.papers.MagazineShowPanel_YearInforForm, Ext.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineShowPanel_OccupationForm = function(magazine){

    this._magazine = magazine;
    this._store = new Srims.papers.MagazineOccupationStore(Srims.service.papers.MagazineOccupationService + '/GetByMagazineID', magazine.get('id'));
    
    this._columnModel = new Srims.papers.MagazineOccupationGridPanel_ColumnModel();
    
    this._gridPanelMagazineOccupation = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 720,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有杂志任职信息'
        }
    });
    
    Srims.papers.MagazineShowPanel_OccupationForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '任职信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelMagazineOccupation]
    });
    
    this._store.load();
}
Ext.extend(Srims.papers.MagazineShowPanel_OccupationForm, Ext.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineShowPanel_ToolBar = function(magazine, store){

    //fields
    this._magazine = magazine;
    this._store = store;
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        magazine: this._magazine,
        store: this._store,
        handler: function(){
            Srims.papers.editMagazine(this.magazine);
        },
        hidden: true,
        tooltip: '<b>编辑杂志</b><br/>编辑选中杂志的信息'
    });
    this._buttonYearInforManage = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '年度信息管理',
        minWidth: 60,
        magazine: this._magazine,
        handler: function(){
            Srims.papers.showMagazineYearInforMagazineWindow(this.magazine);
        },
        hidden: true,
        tooltip: '<b>编辑杂志年度信息</b><br/>编辑选中杂志的年度信息'
    });
    this._buttonOccupationManage = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '任职信息管理',
        minWidth: 60,
        magazine: this._magazine,
        handler: function(){
            Srims.papers.showMagazineOccupationManageWindow(this.magazine);
        },
        hidden: true,
        tooltip: '<b>编辑杂志任职信息</b><br/>编辑选中杂志的任职信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        magazine: this._magazine,
        store: this._store,
        handler: function(){
            Srims.papers.deleteMagazine(this.magazine, this.store);
        }
    });
    
    Srims.papers.MagazineShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonYearInforManage, this._buttonOccupationManage, this._buttonDelete]
    });
    
    
    this._buttonEdit.setVisible(this._magazine.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!this._magazine.get('canEdit'));
    
    this._buttonDelete.setVisible(this._magazine.get('hasPermission_Edit'));
    this._buttonDelete.setDisabled(!this._magazine.get('canEdit'));
    
    this._buttonYearInforManage.setVisible(this._magazine.get('hasPermission_ShowMagazineInformation'));
    this._buttonYearInforManage.setDisabled(!this._magazine.get('canShow_MagazineInformation'));
    
    this._buttonOccupationManage.setVisible(this._magazine.get('hasPermission_EditMagazineOccupation'));
    this._buttonOccupationManage.setDisabled(!this._magazine.get('canEdit_MagazineOccupation'));
}
Ext.extend(Srims.papers.MagazineShowPanel_ToolBar, Ext.Toolbar);


if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineShowPanel = function(panelId, magazine, store){
    this._id = panelId;
    this._magazine = magazine;
    this._magazineId = this._magazine.get('id');
    this._store = store;
    this._basicForm = new Srims.papers.MagazineShowPanel_BasicForm(magazine, false);
    this._yearInforForm = new Srims.papers.MagazineShowPanel_YearInforForm(this._magazineId, false);
    this._occupationForm = new Srims.papers.MagazineShowPanel_OccupationForm(magazine);
    this._toolBar = new Srims.papers.MagazineShowPanel_ToolBar(magazine, this._store);
    
    Srims.papers.MagazineShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._magazine.get('fullName'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: [this._basicForm, this._yearInforForm, this._occupationForm]
    });
    
}
Ext.extend(Srims.papers.MagazineShowPanel, Ext.Panel, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineEditPanel_BasicForm = function(magazine){
    this._magazine = magazine;
    
    this._textFieldFullName = new Ext.form.TextField({
        fieldLabel: '全称',
        value: magazine.get('fullName'),
        allowBlank: false,
        width: 400
    });
    this._textFieldShortName = new Ext.form.TextField({
        fieldLabel: '简称',
        value: magazine.get('shortName'),
        width: 150
    });
    this._textFieldISSN = new Ext.form.TextField({
        fieldLabel: 'ISSN',
        value: magazine.get('issn'),
        allowBlank: false,
        width: 150
    });
    this._comboBoxLanguage = new Ext.form.ComboBox({
        fieldLabel: '语种',
        value: magazine.get('language'),
        store: Srims.papers.languageStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 150,
        width: 150
    });
    this._comboBoxPublishType = new Ext.form.ComboBox({
        fieldLabel: '出版类型',
        value: magazine.get('publishType'),
        store: Srims.papers.publishTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 150,
        width: 150
    });
    this._textFieldSubjectClass = new Srims.component.NoticeTextSearch.SearchComboBox({
        fieldLabel: '学科分类',
        value: magazine.get('subjectClass'),
        noticeTextType: "SubjectClass",
        width: 418
    });
    this._comboBoxSubjectRank = new Srims.component.NoticeTextComboBox({
        fieldLabel: '期刊等级',
        noticeTextType: 'SubjectRank',
        value: magazine.get('subjectRank'),
        allowBlank: true,
        listWidth: 150,
        width: 150
    });
    this._textFieldPublishCompany = new Ext.form.TextField({
        fieldLabel: '出版公司',
        value: magazine.get('publishCompany'),
        width: 150
    });
    this._textFieldPublishCompanyCity = new Ext.form.TextField({
        fieldLabel: '公司所在城市',
        value: magazine.get('publishCompanyCity'),
        width: 400
    });
    this._textFieldPublishCompanyAddress = new Ext.form.TextField({
        fieldLabel: '公司地址',
        value: magazine.get('publishCompanyAddress'),
        width: 400
    });
    var columnFirstItems = [this._textFieldShortName, this._comboBoxLanguage, this._comboBoxSubjectRank];
    var columnSecondItems = [this._textFieldISSN, this._comboBoxPublishType, this._textFieldPublishCompany];
    
    Srims.papers.MagazineEditPanel_BasicForm.superclass.constructor.call(this, {
        title: '',
        Height: 350,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldFullName, new Ext.Panel({
            widht: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 250,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldSubjectClass, this._textFieldPublishCompanyCity, this._textFieldPublishCompanyAddress]
    });
    
    this.assginValues = function(){
        this._magazine.set('fullName', this._textFieldFullName.getValue());
        this._magazine.set('shortName', this._textFieldShortName.getValue());
        this._magazine.set('issn', this._textFieldISSN.getValue());
        this._magazine.set('language', this._comboBoxLanguage.getValue());
        this._magazine.set('publishType', this._comboBoxPublishType.getValue());
        this._magazine.set('subjectRank', this._comboBoxSubjectRank.getValue());
        this._magazine.set('publishCompany', this._textFieldPublishCompany.getValue());
        this._magazine.set('publishCompanyCity', this._textFieldPublishCompanyCity.getValue());
        this._magazine.set('publishCompanyAddress', this._textFieldPublishCompanyAddress.getValue());
        this._magazine.set('subjectClass', this._textFieldSubjectClass.getValue());
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
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldFullName.isValid(preventMark) && result;
        result = this._textFieldShortName.isValid(preventMark) && result;
        result = this._textFieldISSN.isValid(preventMark) && result;
        result = this._comboBoxLanguage.isValid(preventMark) && result;
        result = this._comboBoxPublishType.isValid(preventMark) && result;
        result = this._comboBoxSubjectRank.isValid(preventMark) && result;
        result = this._textFieldPublishCompany.isValid(preventMark) && result;
        result = this._textFieldPublishCompanyCity.isValid(preventMark) && result;
        result = this._textFieldPublishCompanyAddress.isValid(preventMark) && result;
        result = this._textFieldSubjectClass.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldFullName) && result;
        result = this.validTextField(this._textFieldISSN) && result;
        return result;
    }
}

Ext.extend(Srims.papers.MagazineEditPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineEditWindow = function(panelId, magazine){

    this._id = panelId;
    this._magazine = magazine;
    this._title = magazine.isNew() ? "新建杂志" : magazine.get('fullName');
    var isNew = magazine.isNew();
    this._formPanelBasic = new Srims.papers.MagazineEditPanel_BasicForm(this._magazine);
    
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    
    Srims.papers.MagazineEditWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 278,
        width: 580,
        buttonAlign: 'center',
        title: this._title,
        iconCls: magazine.isNew() ? 'icon-magazine-new' : 'icon-edit',
        items: [this._formPanelBasic],
        buttons: [this._buttonSave]
    });
    
    this.assginValues = function(){
        this._formPanelBasic.assginValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelBasic.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var magazine = this._magazine;
        magazine.beginEdit();
        this.assginValues();
        magazine.commit();
        Ext.Ajax.request({
            url: Srims.service.papers.MagazineService + '/Save',
            params: magazine.data,
            scope: this,
            success: function(response){
                Srims.WorkSpace.getWorkSpace().remove(this);
                Srims.papers.listMagazine(false);
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.papers.MagazineXmlReader()
                });
                var newMagazine = store.getAt(0);
                if (!isNew) {
                    var panelId = 'MagazineShowPanel' + newMagazine.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.papers.showMagazine(newMagazine);
            }
        });
    }
    this._onButonSave_Click = function(button, e){
        var panel = button.panel;
        
        if (!panel.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButonSave_Click);
}
Ext.extend(Srims.papers.MagazineEditWindow, Ext.Window, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationEditPanel = function(magazineInformation, magazine, store){

    this._magazineInformation = magazineInformation;
    this._magazine = magazine;
    this._store = store;
    
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        value: this._magazineInformation.get('year'),
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        minValue: 1900,
        width: 150
    });
    this._numberFieldInfluenceFactor = new Srims.component.ThousandPercentField({
        fieldLabel: '影响因子',
        value: this._magazineInformation.get('influenceFactor'),
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequency = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        value: this._magazineInformation.get('citeFrequency'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirer = new Ext.form.NumberField({
        fieldLabel: '分区',
        value: this._magazineInformation.get('subAirer'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldinstantExponent = new Ext.form.NumberField({
        fieldLabel: '即年指数',
        value: this._magazineInformation.get('instantExponent'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldpaperCount = new Ext.form.NumberField({
        fieldLabel: '论文数',
        vlaue: this._magazineInformation.get('paperCount'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._textFieldciteHalfLife = new Ext.form.TextField({
        fieldLabel: '引用半衰期',
        value: this._magazineInformation.get('citeHalfLife'),
        width: 150
    });
    
    var columnFirstItems = [this._numberFieldYear, this._numberFieldinstantExponent, this._numberFieldInfluenceFactor, this._numberFieldpaperCount];
    var columnSecondItems = [this._numberFieldCiteFrequency, this._textFieldciteHalfLife, this._numberFieldSubAirer];
    
    Srims.papers.MagazineInformationEditPanel.superclass.constructor.call(this, {
        // collapsible: true,
        title: '',
        widht: 450,
        Height: 300,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            width: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 250,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    
    this._validYear = function(){
        var magazineInformations = this._store.getRange();
        var year = this._numberFieldYear.getValue();
        
        for (i = 0; i < magazineInformations.length; i++) {
            if (this._magazineInformation == magazineInformations[i]) 
                continue;
            
            if (year == magazineInformations[i].get('year')) {
                Ext.Msg.show({
                    title: '杂志年份错误',
                    msg: '杂志年份不能重复，请重新输入年份',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._validInputValues = function(){
        if (this._numberFieldYear.getValue() == '' &&
        this._numberFieldCiteFrequency.getValue() == '' &&
        this._numberFieldInfluenceFactor.getValue() == '' &&
        this._numberFieldinstantExponent.getValue() == '' &&
        this._numberFieldpaperCount.getValue() == '' &&
        this._numberFieldSubAirer.getValue() == '' &&
        this._textFieldciteHalfLife.getValue() == '') {
            Ext.Msg.show({
                title: '编辑信息为空',
                msg: '杂志年份信息为空，不能进行保存，请继续编辑或关闭退出',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._validYear() && result;
        result = this._numberFieldYear.isValid(preventMark) && result;
        result = this._numberFieldCiteFrequency.isValid(preventMark) && result;
        result = this._numberFieldSubAirer.isValid(preventMark) && result;
        result = this._numberFieldinstantExponent.isValid(preventMark) && result;
        result = this._numberFieldpaperCount.isValid(preventMark) && result;
        result = this._textFieldciteHalfLife.isValid(preventMark) && result;
        result = this._validInputValues() && result;
        return result;
    }
    
    this._assignValues = function(){
        this._magazineInformation.set('magazineID', this._magazine.get('id'));
        this._magazineInformation.set('year', this._numberFieldYear.getValue());
        this._magazineInformation.set('citeFrequency', this._numberFieldCiteFrequency.getValue());
        this._magazineInformation.set('influenceFactor', this._numberFieldInfluenceFactor.getValue());
        this._magazineInformation.set('instantExponent', this._numberFieldinstantExponent.getValue());
        this._magazineInformation.set('paperCount', this._numberFieldpaperCount.getValue());
        this._magazineInformation.set('subAirer', this._numberFieldSubAirer.getValue());
        this._magazineInformation.set('citeHalfLife', this._textFieldciteHalfLife.getValue());
    }
}

Ext.extend(Srims.papers.MagazineInformationEditPanel, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineInformationEditWindow = function(id, magazineInformation, magazine, store){

    this._id = id;
    this._magazineInformation = magazineInformation;
    this._magazine = magazine;
    this._store = store;
    this.basicFormPanel = new Srims.papers.MagazineInformationEditPanel(this._magazineInformation, this._magazine, this._store);
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
    Srims.papers.MagazineInformationEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: magazineInformation.isNew() ? '新建杂志年度信息' : '编辑杂志年度信息',
        iconCls: magazineInformation.isNew() ? 'icon-new' : 'icon-edit',
        width: 600,
        height: 200,
        closable: true,
        style: 'padding:5px; width:1200px',
        items: [this.basicFormPanel],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._save = function(){
        var magazine = this._magazine;
        var magazineInformation = this.basicFormPanel._magazineInformation;
        magazineInformation.beginEdit();
        this.basicFormPanel._assignValues();
        magazineInformation.commit();
        
        Ext.Ajax.request({
            url: Srims.service.papers.MagazineInformationService + '/Save',
            params: magazineInformation.data,
            scope: this,
            success: function(){
                this._store.load();
                var panelId = 'MagazineShowPanel' + magazine.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.papers.showMagazine(magazine);
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window.basicFormPanel._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.papers.MagazineInformationEditWindow, Ext.Window, {})


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineInformationWindow = function(id, magazine){

    this._id = id;
    this._magazine = magazine;
    this._magazineInformationGridPanel = new Srims.papers.MagazineInformationGridPanel(magazine);
    this._magazineInformationGridPanel.getStore().load();
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.papers.MagazineInformationWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '杂志' + this._magazine.get('fullName') + '年度信息管理',
        iconCls: 'icon-magazineInformation-manage',
        width: 680,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._magazineInformationGridPanel],
        buttons: [this._buttonClose]
    });
    
}
Ext.extend(Srims.papers.MagazineInformationWindow, Ext.Window, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineOccupation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'expertName',
    type: 'string',
    mapping: 'ExpertName'
}, {
    name: 'expertDepartment',
    type: 'string',
    mapping: 'ExpertDepartment'
}, {
    name: 'magazineID',
    type: 'int',
    mapping: 'MagazineID'
}, {
    name: 'magazineName',
    type: 'string',
    mapping: 'MagazineName'
}, {
    name: 'magazineISSN',
    type: 'string',
    mapping: 'MagazineISSN'
}, {
    name: 'magazinePublishCompanyCity',
    type: 'string',
    mapping: 'MagazinePublishCompanyCity'
}, {
    name: 'occupation',
    type: 'string',
    mapping: 'Occupation'
}, {
    name: 'engageStartYear',
    type: 'int',
    mapping: 'EngageStartYear'
}, {
    name: 'engageEndYear',
    type: 'string',
    mapping: 'EngageEndYear'
}, {
    name: 'hasPermission_EditMagazineOccupation',
    type: 'boolean',
    mapping: 'HasPermission_EditMagazineOccupation',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_MagazineOccupation',
    type: 'boolean',
    mapping: 'CanEdit_MagazineOccupation',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.papers.MagazineOccupation);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationGridPanel_ColumnModel = function(){
    Srims.papers.MagazineOccupationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '专家',
        dataIndex: 'expertName',
        width: 100
    }, {
        header: '期刊全称',
        dataIndex: 'magazineName',
        width: 150
    }, {
        header: 'ISSN',
        dataIndex: 'magazineISSN',
        width: 100
    }, {
        header: '担任职务',
        dataIndex: 'occupation',
        width: 100
    }, {
        header: '聘期起始年份',
        dataIndex: 'engageStartYear',
        width: 100
    }, {
        header: '聘期终止年份',
        dataIndex: 'engageEndYear',
        width: 100
    }]);
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.MagazineOccupationGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationGridPanel_ToolBar = function(selection, store, magazine){

    //fields
    this._selection = selection;
    this._store = store;
    this._magazine = magazine;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        magazine: this._magazine,
        handler: function(){
            Srims.papers.newMagazineOccupation(this.magazine, this.store);
        },
        hidden: true,
        tooltip: '<b>新建杂志任职信息</b>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        magazine: this._magazine,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editMagazineOccupation(this.magazine, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑杂志任职信息</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        magazine: this._magazine,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deleteMagazineOccupation(this.selection.getSelected(), this.store, this.magazine);
        },
        hidden: true,
        tooltip: '<b>删除杂志任职信息</b>'
    });
    
    
    
    Srims.papers.MagazineOccupationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
    this._buttonNew.setVisible(true);
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
        }
        var magazineOccupation = selection.getSelected();
        
        buttonEdit.setVisible(magazineOccupation.get('hasPermission_EditMagazineOccupation'));
        buttonEdit.setDisabled(!magazineOccupation.get('canEdit_MagazineOccupation'));
        
        buttonDelete.setVisible(magazineOccupation.get('hasPermission_EditMagazineOccupation'));
        buttonDelete.setDisabled(!magazineOccupation.get('canEdit_MagazineOccupation'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.MagazineOccupationGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationGridPanel = function(magazine){

    this._magazine = magazine;
    this._store = new Srims.papers.MagazineOccupationStore(Srims.service.papers.MagazineOccupationService + '/GetByMagazineID', magazine.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.papers.MagazineOccupationGridPanel_ColumnModel();
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.papers.MagazineOccupationGridPanel_ToolBar(this._selections, this._store, this._magazine)
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        autoFill: true,
        emptyText: '该杂志目前无主编信息'
    });
    
    //public methods
    this.getMagazineOccupationStore = function(){
        return this._store;
    }
    
    Srims.papers.MagazineOccupationGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var magazineOccupation = grid.getMagazineOccupationStore().getAt(rowIndex);
        Srims.papers.editMagazineOccupation(this._magazine, magazineOccupation, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.papers.MagazineOccupationGridPanel, Ext.grid.GridPanel, {});
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(url,magazineId){
        Srims.papers.MagazineOccupationStore.superclass.constructor.call(this, new Srims.papers.MagazineOccupationXmlReader(),url, {
            magazineID: magazineId
        });
    }
});if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.MagazineOccupationXmlReader.superclass.constructor.call(this, Srims.papers.MagazineOccupation);
    }
});
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationEditPanel = function(magazineOccupation, magazine, store){

    this._magazineOccupation = magazineOccupation;
    this._magazine = magazine;
    this._store = store;
    
    this._entitySearchComboBoxMagazine = new Srims.component.MagazineSearch.SearchComboBox({
        fieldLabel: '杂志期刊',
        value: this._magazineOccupation.get('magazineName'),
        store: new Srims.papers.MagazineStore(Srims.service.papers.MagazineService + "/SearchMagazine"),
        listWidth: 400,
        selectEntityId: this._magazineOccupation.get('magazineID'),
        width: 400
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家姓名',
        width: 150,
        value: this._magazineOccupation.get('expertID'),
        selectEntityId: this._magazineOccupation.get('expertID'),
        allowBlank: false
    });
    this._comboBoxOccupation = new Srims.component.NoticeTextComboBox({
        fieldLabel: '担任职务',
        value: this._magazineOccupation.get('occupation'),
        displayField: 'name',
        noticeTextType: 'MagazineOccupation',
        editable: false,
        triggerAction: 'all',
        listWidth: 160,
        allowBlank: false,
        width: 134
    });
    this._numberFieldEngageStartYear = new Ext.form.NumberField({
        fieldLabel: '聘期起始年份',
        value: this._magazineOccupation.get('engageStartYear'),
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        allowBlank: false,
        width: 133
    });
    this._textFieldEngageEndYear = new Ext.form.TextField({
        fieldLabel: '聘期终止年份',
        value: this._magazineOccupation.get('engageEndYear'),
        width: 133
    });
    
    var columnFirstItems = [this._comboBoxExpert, this._numberFieldEngageStartYear];
    var columnSecondItems = [this._comboBoxOccupation, this._textFieldEngageEndYear];
    var panel = new Ext.Panel({
        width: 500,
        layout: 'column',
        items: [new Ext.Panel({
            width: 250,
            layout: 'form',
            style: 'width:300px',
            items: columnFirstItems
        }), new Ext.Panel({
            width: 250,
            style: 'width:300px',
            layout: 'form',
            items: columnSecondItems
        })]
    });
    var items = [this._entitySearchComboBoxMagazine, panel];
    if (magazine != undefined) 
        items = [panel];
    Srims.papers.MagazineOccupationEditPanel.superclass.constructor.call(this, {
        // collapsible: true,
        title: '',
        widht: 450,
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: items
    });
    
    this._isValid = function(preventMark){
        var result = true;
        
        result = this._comboBoxExpert.isValid(preventMark) && result;
        result = this._comboBoxOccupation.isValid(preventMark) && result;
        result = this._numberFieldEngageStartYear.isValid(preventMark) && result;
        return result;
    }
    
    this._assignValues = function(){
        if (magazine != undefined) 
            this._magazineOccupation.set('magazineID', this._magazine.get('id'));
        else 
            this._magazineOccupation.set('magazineID', this._entitySearchComboBoxMagazine.getValue());
        this._magazineOccupation.set('expertID', this._comboBoxExpert.getValue());
        this._magazineOccupation.set('occupation', this._comboBoxOccupation.getValue());
        this._magazineOccupation.set('engageStartYear', this._numberFieldEngageStartYear.getValue());
        this._magazineOccupation.set('engageEndYear', this._textFieldEngageEndYear.getValue());
    }
}

Ext.extend(Srims.papers.MagazineOccupationEditPanel, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineOccupationEditWindow = function(id, magazineOccupation, magazine, store){

    this._id = id;
    this._magazineOccupation = magazineOccupation;
    this._magazine = magazine;
    this._store = store;
    this.basicFormPanel = new Srims.papers.MagazineOccupationEditPanel(this._magazineOccupation, this._magazine, this._store);
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
    Srims.papers.MagazineOccupationEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: magazineOccupation.isNew() ? '新建杂志任职信息' : '编辑杂志任职信息',
        iconCls: magazineOccupation.isNew() ? 'icon-new' : 'icon-edit',
        width: 550,
        autoHeight: true,
        closable: true,
        style: 'padding:5px; width:1200px',
        items: [this.basicFormPanel],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._save = function(){
        var magazine = this._magazine;
        var magazineOccupation = this.basicFormPanel._magazineOccupation;
        magazineOccupation.beginEdit();
        this.basicFormPanel._assignValues();
        magazineOccupation.commit();
        
        Ext.Ajax.request({
            url: Srims.service.papers.MagazineOccupationService + '/Save',
            params: magazineOccupation.data,
            scope: this,
            success: function(){
                this._store.load();
                if (magazine != undefined) {
                    var panelId = 'MagazineShowPanel' + magazine.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                    Srims.papers.showMagazine(magazine);
                }
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window.basicFormPanel._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.papers.MagazineOccupationEditWindow, Ext.Window, {})

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationWindow = function(id, magazine){

    this._id = id;
    this._magazine = magazine;
    this._magazineOccupationGridPanel = new Srims.papers.MagazineOccupationGridPanel(magazine);
    this._magazineOccupationGridPanel.getStore().load();
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.papers.MagazineOccupationWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '杂志' + this._magazine.get('fullName') + '任职信息管理',
        iconCls: 'icon-magazineOccupation-manage',
        width: 680,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._magazineOccupationGridPanel],
        buttons: [this._buttonClose]
    });
    
}
Ext.extend(Srims.papers.MagazineOccupationWindow, Ext.Window, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.MagazineOccupationManageGridPanel = function(id, magazineOccupationStore, title, iconCls){

    //fields
    this._magazineOccupationStore = magazineOccupationStore;
    this._magazineOccupationStore.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.papers.MagazineOccupationGridPanel_ColumnModel();
    this._toolbar = new Srims.papers.MagazineOccupationGridPanel_ToolBar(this._selections, this._magazineOccupationStore, undefined);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._magazineOccupationStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.papers.MagazineOccupationManageGridPanel.superclass.constructor.call(this, params);
    //event
    
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var magazineOccupation = grid.getStore().getAt(rowIndex);
        // Srims.papers.showMagazineOccupation(magazineOccupation);
    }
}
Ext.extend(Srims.papers.MagazineOccupationManageGridPanel, Srims.component.GridPanel);

if (!Srims.papers)
    Ext.namespace("Srims.papers");

Srims.papers.Paper = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'influenceFactorOfPaper',
    type: 'int',
    mapping: 'InfluenceFactorOfPaper'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'citeFrequencyOfPaper',
    type: 'int',
    mapping: 'CiteFrequencyOfPaper'
}, {
    name: 'publishYear',
    type: 'int',
    mapping: 'PublishYear'
}, {
    name: 'publishDate',
    type: 'string',
    mapping: 'PublishDate'
}, {
    name: 'documentNumber',
    type: 'string',
    mapping: 'DocumentNumber'
}, {
    name: 'volume',
    type: 'string',
    mapping: 'Volume'
}, {
    name: 'startPage',
    type: 'int',
    mapping: 'StartPage'
}, {
    name: 'endPage',
    type: 'int',
    mapping: 'EndPage'
}, {
    name: 'pages',
    type: 'int',
    mapping: 'Pages'
}, {
    name: 'subAirer',
    type: 'int',
    mapping: 'SubAirer'
}, {
    name: 'authorKeyWord',
    type: 'string',
    mapping: 'AuthorKeyWord'
}, {
    name: 'keyWord',
    type: 'string',
    mapping: 'KeyWord'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}, {
    name: 'linkManAddress',
    type: 'string',
    mapping: 'LinkManAddress'
}, {
    name: 'linkManEmail',
    type: 'string',
    mapping: 'LinkManEmail'
}, {
    name: 'linkManSignUnit',
    type: 'string',
    mapping: 'LinkManSignUnit'
}, {
    name: 'firstAuthorSignUnit',
    type: 'string',
    mapping: 'FirstAuthorSignUnit'
}, {
    name: 'signOrder',
    type: 'int',
    mapping: 'SignOrder'
}, {
    name: 'lab',
    type: 'string',
    mapping: 'Lab'
}, {
    name: 'isiUniqueArticleIdentifier',
    type: 'string',
    mapping: 'ISIUniqueArticleIdentifier'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'magazineID',
    type: 'int',
    mapping: 'MagazineID'
}, {
    name: 'fullName',
    type: 'string',
    mapping: 'FullName'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
}, {
    name: 'issn',
    type: 'string',
    mapping: 'ISSN'
}, {
    name: 'subjectRank',
    type: 'string',
    mapping: 'SubjectRank'
}, {
    name: 'subjectClass',
    type: 'string',
    mapping: 'SubjectClass'
}, {
    name: 'publishType',
    type: 'string',
    mapping: 'PublishType'
}, {
    name: 'language',
    type: 'string',
    mapping: 'Language'
}, {
    name: 'collegeID',
    type: 'int',
    mapping: 'CollegeID'
}, {
    name: 'collegeName',
    type: 'string',
    mapping: 'CollegeName'
}, {
    name: 'firstAuthorID',
    type: 'int',
    mapping: 'FirstAuthorID'
}, {
    name: 'firstAuthorName',
    type: 'string',
    mapping: 'FirstAuthorName'
}, {
    name: 'linkManID',
    type: 'int',
    mapping: 'LinkManID'
}, {
    name: 'linkManName',
    type: 'string',
    mapping: 'LinkManName'
}, {
    name: 'authors',
    type: 'string',
    mapping: 'Authors'
}, {
    name: 'indexed',
    type: 'string',
    mapping: 'Indexed'
}, {
    name: 'indexedString',
    type: 'string',
    mapping: 'IndexedString'
}, {
    name: 'resourceName',
    type: 'string',
    mapping: 'ResourceName'
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditPaperAuhtor',
    type: 'boolean',
    mapping: 'HasPermission_EditPaperAuhtor',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canEditPaperAuthor',
    type: 'boolean',
    mapping: 'CanEditPaperAuthor',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}]);
    Srims.data.Entity.apply(Srims.papers.Paper);


if (!Srims.papers)
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaper = Ext.data.Record.create([
{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
},  {
    name: 'publishYear',
    type: 'int',
    mapping: 'PublishYear'
}, {
    name: 'publishDate',
    type: 'string',
    mapping: 'PublishDate'
}, {
    name: 'documentNumber',
    type: 'string',
    mapping: 'DocumentNumber'
},  {
    name: 'subAirer',
    type: 'int',
    mapping: 'SubAirer'
}, {
    name: 'authorKeyWord',
    type: 'string',
    mapping: 'AuthorKeyWord'
}, {
    name: 'keyWord',
    type: 'string',
    mapping: 'KeyWord'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}, {
    name: 'linkManAddress',
    type: 'string',
    mapping: 'LinkManAddress'
}, {
    name: 'linkManEmail',
    type: 'string',
    mapping: 'LinkManEmail'
}, {
    name: 'linkManSignUnit',
    type: 'string',
    mapping: 'LinkManSignUnit'
}, {
    name: 'firstAuthorSignUnit',
    type: 'string',
    mapping: 'FirstAuthorSignUnit'
}, {
    name: 'signOrder',
    type: 'int',
    mapping: 'SignOrder'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'magazineID',
    type: 'int',
    mapping: 'MagazineID'
}, {
    name: 'fullName',
    type: 'string',
    mapping: 'FullName'
}, {
    name: 'issn',
    type: 'string',
    mapping: 'ISSN'
}, {
    name: 'subjectRank',
    type: 'string',
    mapping: 'SubjectRank'
}, {
    name: 'subjectClass',
    type: 'string',
    mapping: 'SubjectClass'
}, {
    name: 'publishType',
    type: 'string',
    mapping: 'PublishType'
}, {
    name: 'language',
    type: 'string',
    mapping: 'Language'
},   {
    name: 'firstAuthorID',
    type: 'int',
    mapping: 'FirstAuthorID'
}, {
    name: 'firstAuthorName',
    type: 'string',
    mapping: 'FirstAuthorName'
}, {
    name: 'authors',
    type: 'string',
    mapping: 'Authors'
}, {
    name: 'indexed',
    type: 'string',
    mapping: 'Indexed'
}, {
    name: 'indexedString',
    type: 'string',
    mapping: 'IndexedString'
}, {
    name: 'resourceName',
    type: 'string',
    mapping: 'ResourceName'
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditPaperAuhtor',
    type: 'boolean',
    mapping: 'HasPermission_EditPaperAuhtor',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canEditPaperAuthor',
    type: 'boolean',
    mapping: 'CanEditPaperAuthor',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'publishDateYear',
    type: 'int',
    mapping: 'PublishDateYear'
},
{
    name: 'serialNumbe',
    type: 'string',
    mapping: 'SerialNumbe'
},
{
    name: 'resultsName',
    type: 'string',
    mapping: 'ResultsName'
},
{
    name: 'englishName',
    type: 'string',
    mapping: 'EnglishName'
},
{
    name: 'degree',
    type: 'string',
    mapping: 'Degree'
},

{
    name: 'resultsType',
    type: 'string',
    mapping: 'ResultsType'
},
{
    name: 'resultsForm',
    type: 'string',
    mapping: 'ResultsForm'
},
{
    name: 'fund',
    type: 'string',
    mapping: 'Fund'
},
{
    name: 'publisher',
    type: 'string',
    mapping: 'Publisher'
},
{
    name: 'firstOrganization',
    type: 'string',
    mapping: 'FirstOrganization'
},
{
    name: 'ourSchoolSignRank',
    type: 'int',
    mapping: 'OurSchoolSignRank'
},
{
    name: 'organizationName',
    type: 'string',
    mapping: 'OrganizationName'
},
{
    name: 'region',
    type: 'string',
    mapping: 'Region'
},

{
    name: 'collegeID',
    type: 'int',
    mapping: 'CollegeID'
},
{
    name: 'collegeName',
    type: 'string',
    mapping: 'CollegeName'
},
{
    name: 'coden',
    type: 'string',
    mapping: 'CODEN'
},
{
    name: 'issuesDate',
    type: 'string',
    mapping: 'IssuesDate'
},
{
    name: 'mark',
    type: 'string',
    mapping: 'Mark'
},
{
    name: 'degreeType',
    type: 'string',
    mapping: 'DegreeType'
},
{
    name: 'fundType',
    type: 'string',
    mapping: 'FundType'
},
{
    name: 'references',
    type: 'string',
    mapping: 'References'
},
{
    name: 'citeTime',
    type: 'int',
    mapping: 'CiteTime'
}

]);
Srims.data.Entity.apply(Srims.papers.LiberalArtsPaper);


if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.listPaper = function(showQueryWindow) {
    Srims.papers._listPaper('PaperList', '论文列表', 'icon-paper-list', showQueryWindow);
}
Srims.papers.listLiberalArtsPaper = function(showQueryWindow) {
    Srims.papers._listLiberalArtsPaper('LiberalArtsPaperList', '文科论文列表', 'icon-paper-list', showQueryWindow);
}
Srims.papers._listPaper = function(id, name, iconCls, showQueryWindow) {
    var panelId = 'PaperGridPanel_' + id;
    var paperStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        paperStore = panel.getStore();
        paperStore.load();
    }
    else {
        paperStore = new Srims.papers.PaperStore(Srims.service.papers.PaperService + '/Query', queryParams);
        panel = new Srims.papers.PaperGridPanel(panelId, paperStore, name, iconCls, queryParams);///////
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        Srims.papers.showPaperQueryWindow(panelId + '_QueryWindow', paperStore, false, queryParams, panel);
    }
}

Srims.papers._listLiberalArtsPaper = function(id, name, iconCls, showQueryWindow) {
var panelId = 'LiberalArtsPaperGridPanel_' + id;
    var paperStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        paperStore = panel.getStore();
        paperStore.load();
    }
    else {
        paperStore = new Srims.papers.LiberalArtsPaperStore(Srims.service.papers.LiberalArtsPaperService + '/Query', queryParams); ////获取数据
        panel = new Srims.papers.LiberalArtsPaperGridPanel(panelId, paperStore, name, iconCls, queryParams); /////
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
    if (showQueryWindow) {
        Srims.papers.showLiberalArtsPaperQueryWindow(panelId + '_QueryWindow', paperStore, false, queryParams, panel);
    }
}

Srims.papers.showPaperQueryWindow = function(id, store, isMagazineQuery, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window) {
        window = new Srims.papers.PaperQueryWindow(id, store, isMagazineQuery, queryParams);
    }
    gridPanel.queryWindow = window;
    window.show();
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}

Srims.papers.showLiberalArtsPaperQueryWindow = function(id, store, isMagazineQuery, queryParams, gridPanel) {
    var window = Ext.getCmp(id);
    if (!window) {
        window = new Srims.papers.LiberalArtsPaperQueryWindow(id, store, isMagazineQuery, queryParams);
    }
    gridPanel.queryWindow = window;
    window.show();
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}

Srims.papers.showPaper = function(paper, store) {
    var panelId = "PaperShowPanel_" + paper.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
            var panel = new Srims.papers.PaperShowPanel(panelId, paper, store, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });

}

Srims.papers.showLiberalArtsPaper = function(paper, store) {
var panelId = "LiberalArtsPaperShowPanel_" + paper.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
        var panel = new Srims.papers.LiberalArtsPaperShowPanel(panelId, paper, store, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}



Srims.papers.newPaper = function() {
    var panelId = "NewPaperEditPanel";
    if (Srims.WorkSpace.active(panelId))
        return;
    var paper = new Srims.papers.Paper({});

    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
            var panel = new Srims.papers.PaperEditPanel(panelId, paper, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}
Srims.papers.newLiberalArtsPaper = function() {

    var panelId = "newLiberalArtsPaperEditPanel";
    if (Srims.WorkSpace.active(panelId))
        return;
    var paper = new Srims.papers.LiberalArtsPaper({});

    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
        var panel = new Srims.papers.LiberalArtsPaperEditPanel(panelId, paper, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}

Srims.papers.editPaper = function(paper) {
    var panelId = 'PaperEditPanel' + paper.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
            var panel = new Srims.papers.PaperEditPanel(panelId, paper, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}

Srims.papers.editLiberalArtsPaper = function(paper) {
var panelId = 'LiberalArtsPaperEditPanel' + paper.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    Ext.Ajax.request({
        url: Srims.service.common.SystemSettingService + '/GetPaperDescript',
        scope: this,
        success: function(response) {
        var panel = new Srims.papers.LiberalArtsPaperEditPanel(panelId, paper, response.responseText);
            Srims.WorkSpace.addPanel(panel);
        }
    });
}

Srims.papers.deletePaper = function(paper) {

    Ext.MessageBox.confirm('删除论文', '你确定要删除这个论文吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.paperID = paper.get('id');
            Ext.Ajax.request({
                url: Srims.service.papers.PaperService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    var panelEditId = "PaperEditPanel" + paper.get('id');
                    var panelShowId = "PaperShowPanel_" + paper.get('id');
                    closePanel(panelShowId);
                    closePanel(panelEditId);
                    var windowId = "PaperAuthorManageWindow_" + paper.get('id');
                    closeWindow(windowId);
                    Srims.papers.listPaper(false);
                }
            });
        }
    }, this);
}

Srims.papers.deleteLiberalArtsPaper = function(paper) {

    Ext.MessageBox.confirm('删除论文', '你确定要删除这个论文吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.paperID = paper.get('id');
            Ext.Ajax.request({
            url: Srims.service.papers.LiberalArtsPaperService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                var panelEditId = "LiberalArtsPaperEditPanel" + paper.get('id');
                var panelShowId = "LiberalArtsPaperShowPanel_" + paper.get('id');
                    closePanel(panelShowId);
                    closePanel(panelEditId);
                    var windowId = "LiberalArtsPaperAuthorManageWindow_" + paper.get('id');
                    closeWindow(windowId);
                    Srims.papers.listLiberalArtsPaper(false);
                }
            });
        }
    }, this);
}
Srims.papers.showPaperAuthorManageWindow = function(paper) {
    var windowId = 'PaperAuthorManageWindow_' + paper.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.papers.PaperAuthorWindow(windowId, paper);
    else
        window._paperAuthorGridPanel.getPaperAuthorStore().load();
    window.show();
}

Srims.papers.showLiberalArtsPaperAuthorManageWindow = function(paper) {
var windowId = 'LiberalArtsPaperAuthorManageWindow_' + paper.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.papers.LiberalArtsPaperAuthorWindow(windowId, paper);
    else
        window._paperAuthorGridPanel.getLiberalArtsPaperAuthorStore().load();
    window.show();
}

Srims.papers.newPaperAuthor = function(paper, store, isExpert) {
    var windowId = 'NewPaperAuthor' + paper.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        var paperAuthor = new Srims.papers.PaperAuthor({});
        window = new Srims.papers.PaperAuthorEditWindow(windowId, paperAuthor, paper, store, isExpert);
    }
    window.show();
}
Srims.papers.editPaperAuthor = function(paper, paperAuthor, store) {
    var windowId = 'EditPaperAuthor' + paperAuthor.get('id');
    var isExpert = false;
    if (paperAuthor.get('expertID'))
        isExpert = true;
    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.papers.PaperAuthorEditWindow(windowId, paperAuthor, paper, store, isExpert);
    }
    window.show();
}
Srims.papers.deletePaperAuthor = function(paper, paperAuthor, store) {

    Ext.MessageBox.confirm('删除论文作者信息', '你确定要删除这项信息吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.paperAuthorID = paperAuthor.get('id');

            Ext.Ajax.request({
                url: Srims.service.papers.PaperAuthorService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                    var panelId = "PaperShowPanel_" + paper.get('id');
                    closePanel(panelId);
                    Srims.papers.showPaper(paper, store);
                }
            });
        }
    }, this);
}


Srims.papers.newLiberalArtsPaperAuthor = function(paper, store, isExpert) {
var windowId = 'NewLiberalArtsPaperAuthor' + paper.get('id');
    var window = Ext.getCmp(windowId);
    if (!window) {
        var paperAuthor = new Srims.papers.LiberalArtsPaperAuthor({});
        window = new Srims.papers.LiberalArtsPaperAuthorEditWindow(windowId, paperAuthor, paper, store, isExpert);
    }
    window.show();
}
Srims.papers.editLiberalArtsPaperAuthor = function(paper, paperAuthor, store) {
var windowId = 'EditLiberalArtsPaperAuthor' + paperAuthor.get('id');
    var isExpert = false;
    if (paperAuthor.get('expertID'))
        isExpert = true;
    var window = Ext.getCmp(windowId);
    if (!window) {
        window = new Srims.papers.LiberalArtsPaperAuthorEditWindow(windowId, paperAuthor, paper, store, isExpert);
    }
    window.show();
}
Srims.papers.deleteLiberalArtsPaperAuthor = function(paper, paperAuthor, store) {

    Ext.MessageBox.confirm('删除论文作者信息', '你确定要删除这项信息吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.liberalArtsPaperAuthorID = paperAuthor.get('id');

            Ext.Ajax.request({
            url: Srims.service.papers.LiberalArtsPaperAuthorService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                    var panelId = "LiberalArtsPaperShowPanel_" + paper.get('id');
                    closePanel(panelId);
                    Srims.papers.showLiberalArtsPaper(paper, store);
                }
            });
        }
    }, this);
}




Srims.papers.exportPaper = function(filterParams, queryParams) {
    var windowId = 'PaperExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.papers.PaperService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('基本信息字段', Srims.papers.PaperExport_Column.basic);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('作者信息字段', Srims.papers.PaperExport_Column.author);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('杂志信息字段', Srims.papers.PaperExport_Column.magazine);

    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Paper');
}

Srims.papers.exportLiberalArtsPaper = function(filterParams, queryParams) {
    var windowId = 'LiberalArtsPaperExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.papers.LiberalArtsPaperService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('所有信息字段', Srims.papers.LiberalArtsPaperExport_Column.basic);
   
    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'LiberalArtsPaper');
}
function closePanel(panelId) {
    if (Srims.WorkSpace.active(panelId)) {
        var panel = Ext.getCmp(panelId);
        Srims.WorkSpace.getWorkSpace().remove(panel);
    }
}

function closeWindow(windowId) {
    var window = Ext.getCmp(windowId);
    if (window)
        window.close();
}


Srims.papers.showImportWindow = function(store) {
    var windowId = 'PaperImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.papers.PaperService + '/Import', '导入论文数据', false);

    window.show();
}
Srims.papers.showLiberalArtsImportWindow = function(store) {
var windowId = 'LiberalArtsPaperImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.papers.LiberalArtsPaperService + '/Import', '导入论文数据', false);

    window.show();
}

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperAuthor = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'paperID ',
    type: 'int',
    mapping: 'PaperID'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'englishName',
    type: 'string',
    mapping: 'EnglishName'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'expertNumber',
    type: 'string',
    mapping: 'ExpertNumber'
}, {
    name: 'isLinkMan',
    type: 'boolean',
    mapping: 'IsLinkMan',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.papers.PaperAuthor);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(paperId){
        Srims.papers.PaperAuthorStore.superclass.constructor.call(this, new Srims.papers.PaperAuthorXmlReader(), Srims.service.papers.PaperAuthorService + '/GetByPaperID', {
            paperID: paperId
        });
    }
});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.PaperAuthorXmlReader.superclass.constructor.call(this, Srims.papers.PaperAuthor);
    }
});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorGridPanel_ColumnModel = function(){
    Srims.papers.PaperGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '位次',
        dataIndex: 'order',
        width: 100
    }, {
        header: '姓名',
        dataIndex: 'name',
        width: 100
    }, {
        header: '英文名',
        dataIndex: 'englishName',
        width: 100
    }, {
        header: '工作证号',
        dataIndex: 'expertNumber',
        width: 100
    }, {
        header: '是否通信作者',
        dataIndex: 'isLinkMan',
        width: 100,
        renderer: Boolean.render
    }]);
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.PaperAuthorGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorGridPanel_ToolBar = function(selection, store, paper){

    //fields
    this._selection = selection;
    this._store = store;
    this._paper = paper;
    
    //controls
    this._buttonNewExpert = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            Srims.papers.newPaperAuthor(this.paper, this.store, true);
        },
        hidden: true,
        tooltip: '<b>添加论文作者信息</b>'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加非专家作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            Srims.papers.newPaperAuthor(this.paper, this.store, false);
        },
        hidden: true,
        tooltip: '<b>添加论文作者信息</b>'
    });
    this._buttonEditAuthor = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editPaperAuthor(this.paper, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deletePaperAuthor(this.paper, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除论文作者信息</b>'
    });
    
    Srims.papers.PaperAuthorGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNewExpert, this._buttonNew, this._buttonEditAuthor, this._buttonDelete]
    });
    
    this._buttonNewExpert.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonNewExpert.setDisabled(!paper.get('canEditPaperAuthor'));
    this._buttonNew.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonNew.setDisabled(!paper.get('canEditPaperAuthor'));
    //initial
    this._selection.buttonEditAuthor = this._buttonEditAuthor;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEditAuthor;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
        }
        
        buttonEdit.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonEdit.setDisabled(!paper.get('canEditPaperAuthor'));
        
        buttonDelete.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonDelete.setDisabled(!paper.get('canEditPaperAuthor'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.PaperAuthorGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperAuthorGridPanel = function(paper){

    this._paper = paper;
    this._store = new Srims.papers.PaperAuthorStore(paper.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.papers.PaperAuthorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.papers.PaperAuthorGridPanel_ToolBar(this._selections, this._store, this._paper);
    
    //public methods
    this.getPaperAuthorStore = function(){
        return this._store;
    }
    
    Srims.papers.PaperAuthorGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var paperAuthor = grid.getPaperAuthorStore().getAt(rowIndex);
        Srims.papers.editPaperAuthor(this._paper, paperAuthor, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.papers.PaperAuthorGridPanel, Srims.component.GridPanel, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorEditWindow = function(id, paperAuthor, paper, store, isExpert){

    this._id = id;
    this._paperAuthor = paperAuthor;
    this._paper = paper;
    this._store = store;
    
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
    
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '作者姓名',
        width: 140,
        value: (isExpert && this._paperAuthor.get('expertID')) ? this._paperAuthor.get('name') : undefined,
        selectEntityId: isExpert ? this._paperAuthor.get('expertID') : undefined,
        allowBlank: false
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '作者姓名',
        value: this._paperAuthor.get('name'),
        allowBlank: false,
        width: 180
    });
    this._textFieldEnglishName = new Ext.form.TextField({
        fieldLabel: '英文名',
        value: this._paperAuthor.get('englishName'),
        width: 180
    });
    this._numberFieldOrder = new Ext.form.NumberField({
        fieldLabel: '位次',
        width: 80,
        value: this._paperAuthor.get('order'),
        maxValue: 100,
        minValue: 1,
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false
    });
    this._checkBoxIsLinkMan = new Ext.form.Checkbox({
        fieldLabel: '是否通讯作者',
        checked: this._paperAuthor.get('isLinkMan')
    });
    var Items = [this._numberFieldOrder];
    if (isExpert) 
        Items[Items.length] = this._comboBoxExpert;
    else 
        Items[Items.length] = this._textFieldName;
    Items[Items.length] = this._textFieldEnglishName;
    Items[Items.length] = this._checkBoxIsLinkMan;
    
    Srims.papers.PaperAuthorEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: paperAuthor.isNew() ? '新建论文作者信息' : '编辑论文作者信息',
        iconCls: paperAuthor.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 200,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._validateOrderAndExpert = function(){
        var paperAuthors = this._store.getRange();
        var paperAuthorOrder = this._numberFieldOrder.getValue();
        var expertID = this._comboBoxExpert.getValue();
        
        for (var i = 0; i < paperAuthors.length; i++) {
            if (this._paperAuthor == paperAuthors[i]) 
                continue;
            
            if (paperAuthorOrder == paperAuthors[i].get('order')) {
                Ext.Msg.show({
                    title: '作者位次错误',
                    msg: '作者位次不能重复，请重新输入位次',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
            if (paperAuthors[i].get('expertID') && expertID == paperAuthors[i].get('expertID')) {
                Ext.Msg.show({
                    title: '专家错误',
                    msg: '该专家已经是这个论文的作者，请重新选择专家或手动编辑非专家作者',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._validateLinkMan = function(){
        var paperAuthors = this._store.getRange();
        if (this._checkBoxIsLinkMan.checked) {
            for (var i = 0; i < paperAuthors.length; i++) {
                if (this._paperAuthor == paperAuthors[i]) 
                    continue;
                if (paperAuthors[i].get('isLinkMan')) {
                    Ext.Msg.show({
                        title: '已有通讯作者',
                        msg: '通讯作者有且仅有一位',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    this._checkBoxIsLinkMan.checked = false;
                    return false;
                }
            }
        }
        return true;
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
        result = this._numberFieldOrder.isValid(preventMark) && result;
        if (isExpert) {
            result = this._comboBoxExpert.isValid(preventMark) && result;
            result = this._validateOrderAndExpert() && result;
        }
        else {
            result = this._textFieldName.isValid(preventMark) && result;
            result = this.validTextField(this._textFieldName) && result;
        }
        result = this._textFieldEnglishName.isValid(preventMark) && result;
        result = this._checkBoxIsLinkMan.isValid(preventMark) && result;
        
        result = this._validateLinkMan() && result;
        return result;
    }
    this._assignValues = function(){
        this._paperAuthor.set('expertID', this._comboBoxExpert.getValue());
        this._paperAuthor.set('name', this._textFieldName.getValue());
        this._paperAuthor.set('order', this._numberFieldOrder.getValue());
        this._paperAuthor.set('englishName', this._textFieldEnglishName.getValue());
        this._paperAuthor.set('isLinkMan', this._checkBoxIsLinkMan.checked ? "true" : "false");
        this._paperAuthor.set('paperID', this._paper.get('id'));
    }
    this._save = function(){
        var paperAuthor = this._paperAuthor;
        paperAuthor.beginEdit();
        this._assignValues();
        paperAuthor.commit();
        
        Ext.Ajax.request({
            url: Srims.service.papers.PaperAuthorService + '/Save',
            params: paperAuthor.data,
            scope: this,
            success: function(){
                this._store.load();
                var panelId = "PaperShowPanel_" + paper.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.papers.showPaper(paper);
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.papers.PaperAuthorEditWindow, Ext.Window, {})

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorWindow = function(id, paper){

    this._id = id;
    this._paper = paper;
    this._paperAuthorGridPanel = new Srims.papers.PaperAuthorGridPanel(paper);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.papers.PaperAuthorWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '论文' + this._paper.get('name') + '作者管理',
        iconCls: 'icon-member-manage',
        width: 680,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._paperAuthorGridPanel],
        buttons: [this._buttonClose]
    });
    this._paperAuthorGridPanel.getPaperAuthorStore().load();
}
Ext.extend(Srims.papers.PaperAuthorWindow, Ext.Window, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperAuthor = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'liberalArtsPaperID ',
    type: 'int',
    mapping: 'LiberalArtsPaperID'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'englishName',
    type: 'string',
    mapping: 'EnglishName'
}, {
    name: 'expertID',
    type: 'int',
    mapping: 'ExpertID'
}, {
    name: 'expertNumber',
    type: 'string',
    mapping: 'ExpertNumber'
}, {
    name: 'isLinkMan',
    type: 'boolean',
    mapping: 'IsLinkMan',
    convert: Boolean.toBoolean
}])

Srims.data.Entity.apply(Srims.papers.LiberalArtsPaperAuthor);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(paperId){
    Srims.papers.LiberalArtsPaperAuthorStore.superclass.constructor.call(this, new Srims.papers.LiberalArtsPaperAuthorXmlReader(), Srims.service.papers.LiberalArtsPaperAuthorService + '/GetByPaperID', {
            paperID: paperId
        });
    }
});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
    Srims.papers.LiberalArtsPaperAuthorXmlReader.superclass.constructor.call(this, Srims.papers.LiberalArtsPaperAuthor);
    }
});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorGridPanel_ColumnModel = function() {
Srims.papers.LiberalArtsPaperGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: '位次',
        dataIndex: 'order',
        width: 100
    }, {
        header: '姓名',
        dataIndex: 'name',
        width: 100
    }, {
        header: '英文名',
        dataIndex: 'englishName',
        width: 100
    }, {
        header: '工作证号',
        dataIndex: 'expertNumber',
        width: 100
    }, {
        header: '是否通信作者',
        dataIndex: 'isLinkMan',
        width: 100,
        renderer: Boolean.render
    }]);
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.LiberalArtsPaperAuthorGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorGridPanel_ToolBar = function(selection, store, paper) {

    //fields
    this._selection = selection;
    this._store = store;
    this._paper = paper;
    
    //controls
    this._buttonNewExpert = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
        Srims.papers.newLiberalArtsPaperAuthor(this.paper, this.store, true);
        },
        hidden: true,
        tooltip: '<b>添加论文作者信息</b>'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加非专家作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
        Srims.papers.newLiberalArtsPaperAuthor(this.paper, this.store, false);
        },
        hidden: true,
        tooltip: '<b>添加论文作者信息</b>'
    });
    this._buttonEditAuthor = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑作者',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editLiberalArtsPaperAuthor(this.paper, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        paper: this._paper,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deleteLiberalArtsPaperAuthor(this.paper, this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除论文作者信息</b>'
    });

    Srims.papers.LiberalArtsPaperAuthorGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNewExpert, this._buttonNew, this._buttonEditAuthor, this._buttonDelete]
    });
    
    this._buttonNewExpert.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonNewExpert.setDisabled(!paper.get('canEditPaperAuthor'));
    this._buttonNew.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonNew.setDisabled(!paper.get('canEditPaperAuthor'));
    //initial
    this._selection.buttonEditAuthor = this._buttonEditAuthor;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEditAuthor;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
        }
        
        buttonEdit.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonEdit.setDisabled(!paper.get('canEditPaperAuthor'));
        
        buttonDelete.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonDelete.setDisabled(!paper.get('canEditPaperAuthor'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.LiberalArtsPaperAuthorGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperAuthorGridPanel = function(paper) {

    this._paper = paper;
    this._store = new Srims.papers.LiberalArtsPaperAuthorStore(paper.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.papers.LiberalArtsPaperAuthorGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.papers.LiberalArtsPaperAuthorGridPanel_ToolBar(this._selections, this._store, this._paper);
    
    //public methods
    this.getLiberalArtsPaperAuthorStore = function(){
        return this._store;
    }

    Srims.papers.LiberalArtsPaperAuthorGridPanel.superclass.constructor.call(this, {
        stateful: true,
        store: this._store,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220,
        view: this._view
    });
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var paperAuthor = grid.getLiberalArtsPaperAuthorStore().getAt(rowIndex);
        Srims.papers.editLiberalArtsPaperAuthor(this._paper, paperAuthor, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.papers.LiberalArtsPaperAuthorGridPanel, Srims.component.GridPanel, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorEditWindow = function(id, paperAuthor, paper, store, isExpert) {

    this._id = id;
    this._paperAuthor = paperAuthor;
    this._paper = paper;
    this._store = store;
    
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
    
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '作者姓名',
        width: 140,
        value: (isExpert && this._paperAuthor.get('expertID')) ? this._paperAuthor.get('name') : undefined,
        selectEntityId: isExpert ? this._paperAuthor.get('expertID') : undefined,
        allowBlank: false
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '作者姓名',
        value: this._paperAuthor.get('name'),
        allowBlank: false,
        width: 180
    });
    this._textFieldEnglishName = new Ext.form.TextField({
        fieldLabel: '英文名',
        value: this._paperAuthor.get('englishName'),
        width: 180
    });
    this._numberFieldOrder = new Ext.form.NumberField({
        fieldLabel: '位次',
        width: 80,
        value: this._paperAuthor.get('order'),
        maxValue: 100,
        minValue: 1,
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false
    });
    this._checkBoxIsLinkMan = new Ext.form.Checkbox({
        fieldLabel: '是否通讯作者',
        checked: this._paperAuthor.get('isLinkMan')
    });
    var Items = [this._numberFieldOrder];
    if (isExpert) 
        Items[Items.length] = this._comboBoxExpert;
    else 
        Items[Items.length] = this._textFieldName;
    Items[Items.length] = this._textFieldEnglishName;
    Items[Items.length] = this._checkBoxIsLinkMan;

    Srims.papers.LiberalArtsPaperAuthorEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: paperAuthor.isNew() ? '新建文科论文作者信息' : '编辑文科论文作者信息',
        iconCls: paperAuthor.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 200,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._validateOrderAndExpert = function(){
        var paperAuthors = this._store.getRange();
        var paperAuthorOrder = this._numberFieldOrder.getValue();
        var expertID = this._comboBoxExpert.getValue();
        
        for (var i = 0; i < paperAuthors.length; i++) {
            if (this._paperAuthor == paperAuthors[i]) 
                continue;
            
            if (paperAuthorOrder == paperAuthors[i].get('order')) {
                Ext.Msg.show({
                    title: '作者位次错误',
                    msg: '作者位次不能重复，请重新输入位次',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
            if (paperAuthors[i].get('expertID') && expertID == paperAuthors[i].get('expertID')) {
                Ext.Msg.show({
                    title: '专家错误',
                    msg: '该专家已经是这个论文的作者，请重新选择专家或手动编辑非专家作者',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._validateLinkMan = function(){
        var paperAuthors = this._store.getRange();
        if (this._checkBoxIsLinkMan.checked) {
            for (var i = 0; i < paperAuthors.length; i++) {
                if (this._paperAuthor == paperAuthors[i]) 
                    continue;
                if (paperAuthors[i].get('isLinkMan')) {
                    Ext.Msg.show({
                        title: '已有通讯作者',
                        msg: '通讯作者有且仅有一位',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    this._checkBoxIsLinkMan.checked = false;
                    return false;
                }
            }
        }
        return true;
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
        result = this._numberFieldOrder.isValid(preventMark) && result;
        if (isExpert) {
            result = this._comboBoxExpert.isValid(preventMark) && result;
            result = this._validateOrderAndExpert() && result;
        }
        else {
            result = this._textFieldName.isValid(preventMark) && result;
            result = this.validTextField(this._textFieldName) && result;
        }
        result = this._textFieldEnglishName.isValid(preventMark) && result;
        result = this._checkBoxIsLinkMan.isValid(preventMark) && result;
        
        result = this._validateLinkMan() && result;
        return result;
    }
    this._assignValues = function(){
        this._paperAuthor.set('expertID', this._comboBoxExpert.getValue());
        this._paperAuthor.set('name', this._textFieldName.getValue());
        this._paperAuthor.set('order', this._numberFieldOrder.getValue());
        this._paperAuthor.set('englishName', this._textFieldEnglishName.getValue());
        this._paperAuthor.set('isLinkMan', this._checkBoxIsLinkMan.checked ? "true" : "false");
        this._paperAuthor.set('LiberalArtsPaperID', this._paper.get('id'));
    }
    this._save = function(){
        var paperAuthor = this._paperAuthor;
        paperAuthor.beginEdit();
        this._assignValues();
        paperAuthor.commit();
        
        Ext.Ajax.request({
        url: Srims.service.papers.LiberalArtsPaperAuthorService + '/Save',
            params: paperAuthor.data,
            scope: this,
            success: function(){
                this._store.load();
                var panelId = "LiberalArtsPaperShowPanel_" + paper.get('id');
                if (Ext.getCmp(panelId))
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.papers.listLiberalArtsPaper(false);
                Srims.papers.showLiberalArtsPaper(paper);
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.papers.LiberalArtsPaperAuthorEditWindow, Ext.Window, {})

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperAuthorWindow = function(id, paper) {

    this._id = id;
    this._paper = paper;
    this._paperAuthorGridPanel = new Srims.papers.LiberalArtsPaperAuthorGridPanel(paper);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });

    Srims.papers.LiberalArtsPaperAuthorWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '文科论文' + this._paper.get('name') + '作者管理',
        iconCls: 'icon-member-manage',
        width: 680,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._paperAuthorGridPanel],
        buttons: [this._buttonClose]
    });
    this._paperAuthorGridPanel.getLiberalArtsPaperAuthorStore().load();
}
Ext.extend(Srims.papers.LiberalArtsPaperAuthorWindow, Ext.Window, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperGridPanel_ColumnModel = function(){
    Srims.papers.PaperGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "论文名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "magazineID",
        dataIndex: "magazineID",
        hidden: true,
        hideable: false
    }, {
        header: "发表杂志",
        dataIndex: 'fullName',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "发表年份",
        dataIndex: 'publishYear',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "影响因子",
        dataIndex: 'influenceFactorOfPaper',
        width: 60,
        sortable: true,
        renderer: InfluenceFactor.render,
        hidden: false
    }, {
        header: "收录",
        dataIndex: 'indexed',
        width: 60,
        sortable: false,
        hidden: false
    }, {
        header: "所属学院",
        dataIndex: 'collegeName',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "通讯作者",
        dataIndex: 'linkManName',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "第一作者",
        dataIndex: 'firstAuthorName',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'type',
        width: 60,
        sortable: true,
        hidden: true,
        renderer: Srims.papers.PaperTypeRender
    }, {
        header: "引用频次",
        dataIndex: 'citeFrequencyOfPaper',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "发表日期",
        dataIndex: 'publishDate',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "期次",
        dataIndex: 'documentNumber',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "卷号",
        dataIndex: 'volume',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "起始页码",
        dataIndex: 'startPage',
        width: 60,
        sortable: false,
        hidden: true
    }, {
        header: "结束页码",
        dataIndex: 'endPage',
        width: 60,
        sortable: false,
        hidden: true
    }, {
        header: "页数",
        dataIndex: 'pages',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "分区",
        dataIndex: 'subAirer',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "作者关键词",
        dataIndex: 'authorKeyWord',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "关键词",
        dataIndex: 'keyWord',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "通讯作者地址",
        dataIndex: 'linkManAddress',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "通讯作者Email",
        dataIndex: 'linkManEmail',
        width: 60,
        sortable: false,
        hidden: true
    }, {
        header: "通讯作者署名单位",
        dataIndex: 'linkManSignUnit',
        width: 60,
        sortable: true,
        hidden: true,
        renderer: Srims.papers.SignUnitRender
    }, {
        header: "第一作者署名单位",
        dataIndex: 'firstAuthorSignUnit',
        width: 60,
        sortable: true,
        hidden: true,
        renderer: Srims.papers.SignUnitRender
    }, {
        header: "我校署名位次",
        dataIndex: 'signOrder',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "所属实验室",
        dataIndex: 'lab',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "ISIUniqueArticleIdentifier",
        dataIndex: 'isiUniqueArticleIdentifier',
        width: 60,
        sortable: true,
        hidden: true
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.PaperGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperGridPanel_GridFilters = function(){
    Srims.papers.PaperGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'numeric',
            dataIndex: 'influenceFactorOfPaper',
            influenceFactor: true
        }, {
            type: 'numeric',
            dataIndex: 'publishYear'
        }, {
            type: 'string',
            dataIndex: 'fullName'
        }, {
            type: 'string',
            dataIndex: 'collegeName'
        }, {
            type: 'list',
            dataIndex: 'type',
            options: Srims.papers.paperTypeFilterItems,
            phpMode: true
        }, {
            type: 'numeric',
            dataIndex: 'citeFrequencyOfPaper'
        }, {
            type: 'list',
            dataIndex: 'linkManSignUnit',
            options: Srims.papers.signUnitFilterItems,
            phpMode: true
        }, {
            type: 'list',
            dataIndex: 'firstAuthorSignUnit',
            options: Srims.papers.signUnitFilterItems,
            phpMode: true
        }, {
            type: 'string',
            dataIndex: 'lab'
        }, {
            type: 'string',
            dataIndex: 'keyWord'
        }, {
            type: 'numeric',
            dataIndex: 'subAirer'
        }, {
            type: 'string',
            dataIndex: 'firstAuthorName'
        }, {
            type: 'string',
            dataIndex: 'linkManName'
        }, {
            type: 'list',
            dataIndex: 'indexed',
            options: Srims.papers.PaperIndexedTypeFilterItems,
            phpMode: true
        }]
    });
}
Ext.extend(Srims.papers.PaperGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperGridPanel_ToolBar = function(selection, store, grid, panelId, isMagazineQuery, queryParams){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._isMagazineQuery = isMagazineQuery;
    this._store = store;
    this._queryParams = queryParams;
    this._grid = grid;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        isMagazineQuery: this._isMagazineQuery,
        handler: function(){
            Srims.papers.showPaperQueryWindow(this.panelId + '_QueryWindow', this.store, this.isMagazineQuery, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>论文查询</b><br/>对论文信息进行复杂查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
        Srims.papers.showImportWindow(this.store);
        },
        tooltip: '<b>论文导入</b><br/>将论文从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            Srims.papers.newPaper();
        },
        tooltip: '<b>添加论文</b><br/>输入论文信息以添加论文'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.papers.showPaper(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看论文</b><br/>显示所选论文的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editPaper(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑论文</b><br/>编辑选中论文的基本、杂志、作者等信息'
    });
    this._buttonPaperAuthorManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '论文作者管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.showPaperAuthorManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b><br/>编辑选中论文的作者信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deletePaper(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>删除论文</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新论文列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
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
        params: this._queryParams,
        handler: function(){
            Srims.papers.exportPaper(this.store.lastOptions.params, this.params);
        }
    });
    var user = Srims.currentLoginLog.user;
    //  this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    this._buttonNew.setVisible(user.hasPermission_EditPaper);
    this._buttonImport.setVisible(user.hasPermission_EditPaper);
    
    Srims.papers.PaperGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonImport, this._buttonExport, this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonPaperAuthorManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonPaperAuthorManage = this._buttonPaperAuthorManage;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonPaperAuthorManage = selection.buttonPaperAuthorManage;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonPaperAuthorManage.hide();
            return;
        }
        
        var paper = selection.getSelected();
        
        buttonShow.setVisible(paper.get('hasPermission_Show'));
        buttonShow.setDisabled(!paper.get('canShow'));
        
        buttonEdit.setVisible(paper.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!paper.get('canEdit'));
        
        buttonDelete.setVisible(paper.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!paper.get('canEdit'));
        
        buttonPaperAuthorManage.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonPaperAuthorManage.setDisabled(!paper.get('canEditPaperAuthor'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.PaperGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperGridPanel = function(id, paperStore, title, iconCls, queryParams){

    //fields
    this._paperStore = paperStore;
    this._paperStore.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.papers.PaperGridPanel_ColumnModel();
    
    this._filters = new Srims.papers.PaperGridPanel_GridFilters();
    this._toolbar = new Srims.papers.PaperGridPanel_ToolBar(this._selections, this._paperStore, this, id, false, queryParams);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._paperStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.papers.PaperGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var paper = grid.getStore().getAt(rowIndex);
        Srims.papers.showPaper(paper);
    }
};
Ext.extend(Srims.papers.PaperGridPanel, Srims.component.GridPanel);

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.PaperIndexedType');

Srims.papers.PaperIndexedType.SCICD = 'SCICD';
Srims.papers.PaperIndexedType.SCINetWork = 'SCINetWork';
Srims.papers.PaperIndexedType.EICore = 'EICore';
Srims.papers.PaperIndexedType.EINetWork = 'EINetWork';
Srims.papers.PaperIndexedType.ISTP = 'ISTP';
Srims.papers.PaperIndexedType.ISTP = 'SSCI';
Srims.papers.PaperIndexedType.ISTP = 'ISTP_S';

Srims.papers.PaperIndexedType = function(value, metadata){
    switch (value) {
        case 'SCICD':
            return 'SCI光盘';
        case 'SCINetWork':
            return 'SCI网络';
        case 'EICore':
            return 'EI核心';
        case 'EINetWork':
            return 'EI网络';
        case 'SSCI':
            return 'SSCI';
        case 'ISTP':
            return 'ISTP';
        case 'ISTP_S':
            return 'ISTP_S';
        default:
            return '未知';
    }
}
Srims.papers.PaperIndexedTypeFilterItems = [{
    id: 'SCICD',
    text: 'SCI光盘'
}, {
    id: 'SCINetWork',
    text: 'SCI网络'
}, {
    id: 'EICore',
    text: 'EI核心'
}, {
    id: 'EINetWork',
    text: 'EI网络'
}, {
    id: 'ISTP',
    text: 'ISTP'
}, {
    id: 'SSCI',
    text: 'SSCI'
}, {
    id: 'ISTP_S',
    text: 'ISTP_S'
}];
Srims.papers.paperIndexedTypeStore = [['SCICD', 'SCI光盘'], ['SCINetWork', 'SCI网络'], ['EICore', 'EI核心'], ['EINetWork', 'EI网络'], ['ISTP', 'ISTP'],['SSCI', 'SSCI'],['ISTP_S', 'ISTP_S']];



if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.papers.PaperStore.superclass.constructor.call(this, new Srims.papers.PaperXmlReader(), load_url, params);
    }
});
if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.papers.LiberalArtsPaperStore.superclass.constructor.call(this, new Srims.papers.LiberalArtsPaperXmlReader(), load_url, params);
    }
});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.PaperType');

Srims.papers.PaperType.Article = 'Article';
Srims.papers.PaperType.Correction = 'Correction';
Srims.papers.PaperType.Editiorial_Material = 'Editiorial_Material';
Srims.papers.PaperType.Letter = 'Letter';
Srims.papers.PaperType.Meeting_Abstract = 'Meeting_Abstract';
Srims.papers.PaperType.Note = 'Note';
Srims.papers.PaperType.Riview = 'Riview';
Srims.papers.PaperType.ProceedingsPaper = 'ProceedingsPaper';

Srims.papers.PaperTypeRender = function(value, metadata){
    switch (value) {
        case 'Article':
            return 'Article(文章)';
        case 'Correction':
            return 'Correction(更正)';
        case 'Editiorial_Material':
            return 'Editiorial_Material(编者按，社论)';
        case 'Letter':
            return 'Letter(简讯)';
        case 'Meeting_Abstract':
            return 'Meeting_Abstract(会议摘要)';
        case 'Note':
            return 'Note(纪要)';
        case 'Riview':
            return 'Riview(评论)';
        case 'ProceedingsPaper':
            return 'ProceedingsPaper';
        default:
            return '未知';
    }
}

Srims.papers.paperTypeFilterItems = [{
    id: 'Article',
    text: 'Article(文章)'
}, {
    id: 'Correction',
    text: 'Correction(更正)'
}, {
    id: 'Editiorial_Material',
    text: 'Editiorial_Material(编者按，社论)'
}, {
    id: 'Letter',
    text: 'Letter(简讯)'
}, {
    id: 'Meeting_Abstract',
    text: 'Meeting_Abstract(会议摘要)'
}, {
    id: 'Note',
    text: 'Note(纪要)'
}, {
    id: 'Riview',
    text: 'Riview(评论)'
}, {
    id: 'ProceedingsPaper',
    text: 'ProceedingsPaper'
}];

Srims.papers.paperTypeStore = [['Article', 'Article(文章)'], ['Correction', 'Correction(更正)'], ['Editiorial_Material', 'Editiorial_Material(编者按，社论)'], ['Letter', 'Letter(简讯)'], ['Meeting_Abstract', 'Meeting_Abstract(会议摘要)'], ['Note', 'Note(纪要)'], ['Riview', 'Riview(评论)'], ['ProceedingsPaper', 'ProceedingsPaper'], ['Unknown', '未知']];

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.PaperXmlReader.superclass.constructor.call(this, Srims.papers.Paper);
    }
});

if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.papers.LiberalArtsPaperXmlReader.superclass.constructor.call(this, Srims.papers.LiberalArtsPaper);
    }
});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.SignUnit');

Srims.papers.SignUnit.School = 'School';
Srims.papers.SignUnit.UnitOut = 'UnitOut';
Srims.papers.SignUnit.SchoolUnitOut = 'SchoolUnitOut';
Srims.papers.SignUnit.UnitOutSchool = 'UnitOutSchool';

Srims.papers.SignUnitRender = function(value, metadata){
    switch (value) {
        case 'School':
            return '中国海洋大学';
        case 'UnitOut':
            return '外单位';
        case 'SchoolUnitOut':
            return '中国海洋大学+外单位';
        case 'UnitOutSchool':
            return '外单位+中国海洋大学';
        default:
            return '未知';
    }
}
Srims.papers.signUnitFilterItems = [{
    id: 'School',
    text: '中国海洋大学'
}, {
    id: 'UnitOut',
    text: '外单位'
}, {
    id: 'SchoolUnitOut',
    text: '中国海洋大学+外单位'
}, {
    id: 'UnitOutSchool',
    text: '外单位+中国海洋大学'
}];

Srims.papers.signUnitStore = [['School', '中国海洋大学'], ['UnitOut', '外单位'], ['SchoolUnitOut', '中国海洋大学+外单位'], ['UnitOutSchool', '外单位+中国海洋大学']];

if (!Srims.papers)
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperEditPanel_AbstractForm = function(liberalartspaper) {
this._paper = liberalartspaper;

this._KeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._paper.get('keyWord'),
        width: 460
    });
    this._Mark = new Ext.form.TextField({
        fieldLabel: '标志',
        value: this._paper.get('mark'),
        width: 460
    });
    this._References = new Ext.form.TextArea({
        fieldLabel: '参考文献',
        value: this._paper.get('references'),
        Height: 300,
        width: 460
    });
    Srims.papers.LiberalArtsPaperEditPanel_AbstractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '摘要信息',
        Height: 400,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._KeyWord, this._Mark, this._References]
    });

    this.assginValues = function() {
    this._paper.set('keyWord', this._KeyWord.getValue());
    this._paper.set('mark', this._Mark.getValue());
    this._paper.set('references', this._References.getValue());
    }

    this.isValid = function(preventMark) {
        var result = true;
        return result;
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperEditPanel_AbstractForm, Ext.form.FormPanel, {});

if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperEditPanel_BasicForm = function(liberalartspaper) {
    this._paper = liberalartspaper;
    /////必须填的
    this._textFieldSerialNumbe = new Ext.form.TextField({
        fieldLabel: '序列号',
        value: liberalartspaper.get('serialNumbe'),
        width: 160
    });
    this._numberFieldPublishDateYear = new Ext.form.NumberField({
        fieldLabel: '发表年',
        value: liberalartspaper.get('publishDateYear'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 160
    });
    this._textFieldResultsName = new Ext.form.TextField({
        fieldLabel: '成果名',
        value: liberalartspaper.get('resultsName'),
        allowBlank: false,
        width: 160
    });
    this._comboBoxResultsType = new Ext.form.ComboBox({
        fieldLabel: '成果类别',
        value: liberalartspaper.get('resultsType'),
        store: Srims.papers.ResultsType,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 144
    });

//    this._textFieldSourceAuthor = new Ext.form.TextField({
//        fieldLabel: '来源作者',
//        value: liberalartspaper.get('sourceAuthor'),
//        allowBlank: false,
//        width: 160
//    });
//    this._textFieldFirstAuthor = new Ext.form.TextField({
//        fieldLabel: '第一作者',
//        value: liberalartspaper.get('firstAuthor'),
//        allowBlank: false,
//        width: 160
//    });
    /////不必须填的
    this._numberFieldCiteTime = new Ext.form.NumberField({
        fieldLabel: '总被引用次数',
        value: liberalartspaper.get('citeTime'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 160
    });
    this._textFieldResultsForm = new Ext.form.TextField({
        fieldLabel: '成果形式',
        value: liberalartspaper.get('resultsForm'),
        width: 160
    });
    this._textFieldEnglishName = new Ext.form.TextField({
        fieldLabel: '英文篇名',
        value: liberalartspaper.get('englishName'),
        width: 460
    });
    this._textFieldDegree = new Ext.form.TextField({
        fieldLabel: '文章等级',
        value: liberalartspaper.get('degree'),
        width: 460
    });
    var columnFirstItems = [this._numberFieldPublishDateYear, this._textFieldResultsName,  this._textFieldResultsForm];
    var columnSecondItems = [this._textFieldSerialNumbe, this._comboBoxResultsType, this._numberFieldCiteTime];

    Srims.papers.LiberalArtsPaperEditPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 900,
        frame: true,
        labelWidth: 110,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldEnglishName,this._textFieldDegree,
                new Ext.Panel({
                   widht: 600,
                   layout: 'column',
                   items: [new Ext.Panel({
                       width: 300,
                       layout: 'form',
                       style: 'width:300px',
                       items: columnFirstItems
                   }), new Ext.Panel({
                       width: 300,
                       style: 'width:300px',
                       layout: 'form',
                       items: columnSecondItems
                   })]
               })]
    });

    this.assginValues = function() {
        this._paper.set('serialNumbe', this._textFieldSerialNumbe.getValue());
        this._paper.set('publishDateYear', this._numberFieldPublishDateYear.getValue());
        this._paper.set('resultsName', this._textFieldResultsName.getValue());
        this._paper.set('resultsType', this._comboBoxResultsType.getValue());
//        this._paper.set('sourceAuthor', this._textFieldSourceAuthor.getValue());
//        this._paper.set('firstAuthor', this._textFieldFirstAuthor.getValue());
        this._paper.set('citeTime', this._numberFieldCiteTime.getValue());
        this._paper.set('resultsForm', this._textFieldResultsForm.getValue());
        this._paper.set('englishName', this._textFieldEnglishName.getValue());
        this._paper.set('degree', this._textFieldDegree.getValue());
    }
    this.validTextField = function(textField) {
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
    this.isValid = function(preventMark) {
        var result = true;
        result = this._numberFieldPublishDateYear.isValid(preventMark) && result;
        result = this._textFieldResultsName.isValid(preventMark) && result;
        result = this._comboBoxResultsType.isValid(preventMark) && result;
//        result = this._textFieldSourceAuthor.isValid(preventMark) && result;
//        result = this._textFieldFirstAuthor.isValid(preventMark) && result;
        return result;
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperEditPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.papers)
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperEditPanel_OtherBasicForm = function(liberalartspaper) {

this._paper = liberalartspaper;

this._textFieldPublisher = new Ext.form.TextField({
    fieldLabel: '期刊名或出版社',
    value: liberalartspaper.get('publisher'),
    allowBlank: false,
    width: 460
});
this._textFieldISSN = new Ext.form.TextField({
    fieldLabel: 'ISSN',
    value: liberalartspaper.get('issn'),
    width: 160
});
this._textFieldIssuesDate = new Ext.form.TextField({
    fieldLabel: '年代卷期 ',
    value: liberalartspaper.get('issuesDate'),
    width: 160
});
this._textFieldCODEN = new Ext.form.TextField({
    fieldLabel: '期刊代码',
    value: liberalartspaper.get('coden'),
    width: 160
});
this._textFieldDegreeType = new Ext.form.TextField({
    fieldLabel: '学位分类 ',
    value: liberalartspaper.get('degreeType'),
    width: 160
});


this._textFieldFirstOrganization = new Ext.form.TextField({
    fieldLabel: '第一机构',
    value: liberalartspaper.get('firstOrganization'),
    width: 160
});
this._textFieldOrganizationName = new Ext.form.TextField({
    fieldLabel: '机构名称',
    value: liberalartspaper.get('organizationName'),
    width: 160
});
this._textFieldRegion = new Ext.form.TextField({
    fieldLabel: '地区',
    value: liberalartspaper.get('region'),
    width: 160
});
this._textFieldSubjectClass = new Ext.form.TextField({
    fieldLabel: '学科分类',
    value: liberalartspaper.get('subjectClass'),
    width: 160
});
this._numberFieldOurSchoolSignRank = new Ext.form.NumberField({
    fieldLabel: '我校署名位次',
    value: liberalartspaper.get('ourSchoolSignRank'),
    allowDecimals: false,
    allowNegative: false,
    maxLength: 6,
    width: 160
});
this._comboBoxCollege = new Srims.component.EntityComboBox({
    fieldLabel: '所属学院',
    value: liberalartspaper.get('collegeName'),
    store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
    displayField: 'name',
    entityId: liberalartspaper.get('collegeID'),
    editable: true,
    triggerAction: 'all',
    listWidth: 160,
    width: 144
});

this._textFieldFund = new Ext.form.TextField({
    fieldLabel: '基金',
    value: liberalartspaper.get('fund'),
    width: 160
});
this._textFieldFundType = new Ext.form.TextField({
    fieldLabel: '基金类别',
    value: liberalartspaper.get('fundType'),
    width: 160
});



var columnFirstItems = [this._textFieldISSN, this._textFieldCODEN, this._textFieldFirstOrganization, this._textFieldRegion, this._numberFieldOurSchoolSignRank, this._textFieldFund];
var columnSecondItems = [this._textFieldIssuesDate, this._textFieldDegreeType, this._textFieldOrganizationName, this._textFieldSubjectClass, this._comboBoxCollege, this._textFieldFundType];


    Srims.papers.LiberalArtsPaperEditPanel_OtherBasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '其他基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldPublisher, new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });

    this.assginValues = function() {

    this._paper.set('publisher', this._textFieldPublisher.getValue());
    this._paper.set('issn', this._textFieldISSN.getValue());
    this._paper.set('issuesDate', this._textFieldIssuesDate.getValue());
    this._paper.set('coden', this._textFieldCODEN.getValue());
    this._paper.set('degreeType', this._textFieldDegreeType.getValue());
        
        this._paper.set('firstOrganization', this._textFieldFirstOrganization.getValue());
        this._paper.set('organizationName', this._textFieldOrganizationName.getValue());
        this._paper.set('region', this._textFieldRegion.getValue());
        this._paper.set('subjectClass', this._textFieldSubjectClass.getValue());
        this._paper.set('ourSchoolSignRank', this._numberFieldOurSchoolSignRank.getValue());
        this._paper.set('collegeID', this._comboBoxCollege.getValue());

        this._paper.set('fund', this._textFieldFund.getValue());
        this._paper.set('fundType', this._textFieldFundType.getValue());
    }

    this.isValid = function(preventMark) {
        var result = true;
        result = this._textFieldPublisher.isValid(preventMark) && result;
        return result;
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperEditPanel_OtherBasicForm, Ext.form.FormPanel, {});


if (!Srims.papers)
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperEditPanel = function(panelId, paper, systemSetting) {
    this._id = panelId;
    this._paper = paper;
    this._title = paper.isNew() ? "添加文科论文" : paper.get('resultsName');
    var isNew = paper.isNew();
    this._formPanelBasic = new Srims.papers.LiberalArtsPaperEditPanel_BasicForm(this._paper);
    this._formPanelOtherBasic = new Srims.papers.LiberalArtsPaperEditPanel_OtherBasicForm(this._paper);
    this._formPanelAbstract = new Srims.papers.LiberalArtsPaperEditPanel_AbstractForm(this._paper);
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });

    Srims.papers.LiberalArtsPaperEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        buttonAlign: 'center',
        title: this._title,
        iconCls: paper.isNew() ? 'icon-paper-new' : 'icon-edit',
        items: [this._formPanelBasic, this._formPanelOtherBasic, this._formPanelAbstract],
        buttons: [this._buttonSave]
    });

    this.assginValues = function() {
        this._formPanelBasic.assginValues();
        this._formPanelOtherBasic.assginValues();
        this._formPanelAbstract.assginValues();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._formPanelBasic.isValid(preventMark) && result;
        result = this._formPanelOtherBasic.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var paper = this._paper;
        paper.beginEdit();
        this.assginValues();
        paper.commit();
        Ext.Ajax.request({
        url: Srims.service.papers.LiberalArtsPaperService + '/Save',
            params: paper.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                Srims.papers.listLiberalArtsPaper(false);
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.papers.LiberalArtsPaperXmlReader()
                });
                var newPaper = newStore.getAt(0);
                if (!isNew) {
                    var panelId = "LiberalArtsPaperShowPanel_" + newPaper.get('id');
                    if (Ext.getCmp(panelId))
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.papers.showLiberalArtsPaper(newPaper);
            }
        });
    }
    this._onButonSave_Click = function(button, e) {
        var panel = button.panel;

        if (!panel.isValid(false))
            return;

        button.setText('正在保存');
        button.disable();
        panel.save();
    }

    this._buttonSave.on('click', this._onButonSave_Click);
}

Ext.extend(Srims.papers.LiberalArtsPaperEditPanel, Ext.Panel, {});
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperGridPanel_ColumnModel = function() {
Srims.papers.LiberalArtsPaperGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, 
    //必须显示的 
    {
        header: "发表年",
        dataIndex: 'publishDateYear',
        width: 60,
        sortable: true,
        hidden: false
    },
     {
        header: "成果名",
        dataIndex: 'resultsName',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "成果类别",
        dataIndex: 'resultsType',
        width: 60,
        sortable: true,
        renderer: Srims.papers.ResultsTypeRender,
        hidden: false
    },
     {
        header: "来源作者",
        dataIndex: 'authors',
        width: 60,
        sortable: true,
        hidden: false
    }, 
    {
        header: "成果形式",
        dataIndex: 'resultsForm',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "期刊名或出版社",
        dataIndex: 'publisher',
        width: 60,
        sortable: true,
        hidden: false
    }, 
    {
        header: "第一作者",
        dataIndex: 'firstAuthorName',
        width: 60,
        sortable: true,
        hidden: false
    },
     {
        header: "我校署名位次",
        dataIndex: 'ourSchoolSignRank',
        width: 60,
        sortable: true,
        hidden: false
    }, 
    
    //选择显示的

    {
        header: "序列号",
        dataIndex: 'serialNumbe',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "总被引次数",
        dataIndex: 'citeTime',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "英文篇名",
        dataIndex: 'englishName',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "文章等级",
        dataIndex: 'degree',
        width: 60,
        sortable: true,
        hidden: false
    }, {
        header: "第一机构",
        dataIndex: 'firstOrganization',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "机构名称",
        dataIndex: 'organizationName',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "地区",
        dataIndex: 'region',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "所属院系",
        dataIndex: 'collegeName',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "学科分类",
        dataIndex: 'subjectClass',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "学位分类",
        dataIndex: 'degreeType',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "关键词",
        dataIndex: 'keyWord',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "标志",
        dataIndex: 'mark',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "参考文献",
        dataIndex: 'references',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "基金",
        dataIndex: 'fund',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "基金类别",
        dataIndex: 'fundType',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "期刊代码",
        dataIndex: 'coden',
        width: 60,
        sortable: false,
        hidden: true
    }, {
        header: "ISSN",
        dataIndex: 'issn',
        width: 60,
        sortable: true,
        hidden: true,
       
    }, {
        header: "年代卷期",
        dataIndex: 'issuesDate',
        width: 60,
        sortable: true,
        hidden: true,
        
    }
    ]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.papers.LiberalArtsPaperGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperGridPanel_GridFilters = function() {
    Srims.papers.LiberalArtsPaperGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'publishDateYear'
        }, {
            type: 'string',
            dataIndex: 'resultsName',
            influenceFactor: true
        }, {
            type: 'list',
            dataIndex: 'resultsType',
            options: Srims.papers.ResultsTypeFilterItems,
            phpMode: true
        }, {
            type: 'string',
            dataIndex: 'authors'
        }, {
            type: 'string',
            dataIndex: 'degree'
        }, {
            type: 'string',
            dataIndex: 'publishDateYear'
        }, {
            type: 'string',
            dataIndex: 'resultsForm'
        }, {
            type: 'string',
            dataIndex: 'publisher'
        }, {
            type: 'string',
            dataIndex: 'firstAuthorName'
        }, {
            type: 'string',
            dataIndex: 'ourSchoolSignRank'
}]
        });
    }
    Ext.extend(Srims.papers.LiberalArtsPaperGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperGridPanel_ToolBar = function(selection, store, grid, panelId, isMagazineQuery, queryParams) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._isMagazineQuery = isMagazineQuery;
    this._store = store;
    this._queryParams = queryParams;
    this._grid = grid;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        isMagazineQuery: this._isMagazineQuery,
        handler: function(){
        Srims.papers.showLiberalArtsPaperQueryWindow(this.panelId + '_QueryWindow', this.store, this.isMagazineQuery, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>论文查询</b><br/>对论文信息进行复杂查询'
    });
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function(){
        Srims.papers.showLiberalArtsImportWindow(this.store);
        },
        tooltip: '<b>论文导入</b><br/>将论文从excel表导入到数据库中'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
        Srims.papers.newLiberalArtsPaper();
        },
        tooltip: '<b>添加论文</b><br/>输入论文信息以添加论文'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;

            Srims.papers.showLiberalArtsPaper(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看论文</b><br/>显示所选论文的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.editLiberalArtsPaper(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑论文</b><br/>编辑选中论文的基本、杂志、作者等信息'
    });
    this._buttonPaperAuthorManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '文科论文作者管理',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.showLiberalArtsPaperAuthorManageWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b><br/>编辑选中论文的作者信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.papers.deleteLiberalArtsPaper(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>删除论文</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新论文列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
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
        params: this._queryParams,
        handler: function(){
            Srims.papers.exportLiberalArtsPaper(this.store.lastOptions.params, this.params);
        }
    });
    var user = Srims.currentLoginLog.user;
    //  this._buttonQuery.setVisible(user.userRoleType == 'Administrator');
    this._buttonNew.setVisible(user.hasPermission_EditPaper);
    this._buttonImport.setVisible(user.hasPermission_EditPaper);

    Srims.papers.LiberalArtsPaperGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, this._buttonImport, this._buttonExport, this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonPaperAuthorManage, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonPaperAuthorManage = this._buttonPaperAuthorManage;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonPaperAuthorManage = selection.buttonPaperAuthorManage;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonPaperAuthorManage.hide();
            return;
        }
        
        var paper = selection.getSelected();
        
        buttonShow.setVisible(paper.get('hasPermission_Show'));
        buttonShow.setDisabled(!paper.get('canShow'));
        
        buttonEdit.setVisible(paper.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!paper.get('canEdit'));
        
        buttonDelete.setVisible(paper.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!paper.get('canEdit'));
        
        buttonPaperAuthorManage.setVisible(paper.get('hasPermission_EditPaperAuhtor'));
        buttonPaperAuthorManage.setDisabled(!paper.get('canEditPaperAuthor'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.papers.LiberalArtsPaperGridPanel_ToolBar, Ext.Toolbar);


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperGridPanel = function(id, paperStore, title, iconCls, queryParams) {

    //fields
    this._paperStore = paperStore;
    this._paperStore.gird = this;
    
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls
    this._columnModel = new Srims.papers.LiberalArtsPaperGridPanel_ColumnModel();

    this._filters = new Srims.papers.LiberalArtsPaperGridPanel_GridFilters();
    this._toolbar = new Srims.papers.LiberalArtsPaperGridPanel_ToolBar(this._selections, this._paperStore, this, id, false, queryParams);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._paperStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.papers.LiberalArtsPaperGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var paper = grid.getStore().getAt(rowIndex);
        Srims.papers.showLiberalArtsPaper(paper);
    }
};
Ext.extend(Srims.papers.LiberalArtsPaperGridPanel, Srims.component.GridPanel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperShowPanel_ToolBar = function(paper, store) {

    //fields
    this._paper = paper;
    this._store = store;
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        paper: this._paper,
        handler: function(){
        Srims.papers.editLiberalArtsPaper(this.paper);
        },
        hidden: true,
        tooltip: '<b>编辑论文</b><br/>编辑选中论文的基本、杂志、作者等信息'
    });
    this._buttonPaperAuthorManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '文科论文作者管理',
        minWidth: 60,
        paper: this._paper,
        panel: this._panel,
        handler: function(){
            Srims.papers.showLiberalArtsPaperAuthorManageWindow(this.paper);
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b><br/>编辑选中论文的作者信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        paper: this._paper,
        store: this._store,
        handler: function(){
        Srims.papers.deleteLiberalArtsPaper(this.paper, this.store);
        },
        hidden: true,
        tooltip: '<b>删除论文</b>'
    });

    Srims.papers.LiberalArtsPaperShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonPaperAuthorManage, this._buttonDelete]
    });
    
    this._buttonEdit.setVisible(this._paper.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!this._paper.get('canEdit'));
    
    this._buttonDelete.setVisible(this._paper.get('hasPermission_Edit'));
    this._buttonDelete.setDisabled(!this._paper.get('canEdit'));
    
    this._buttonPaperAuthorManage.setVisible(this._paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonPaperAuthorManage.setDisabled(!this._paper.get('canEditPaperAuthor'));
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_ToolBar, Ext.Toolbar);


if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel_OtherBasicForm = function(paper) {

    this._paper = paper;

    this._textFieldPublisher = new Ext.form.Field({
    fieldLabel: '期刊名或出版社',
    value: this._paper.get('publisher'),
        readOnly: true,
        width: 460
    });
    this._textFieldISSN = new Ext.form.Field({
    fieldLabel: 'ISSN',
    value: this._paper.get('issn'),
        readOnly: true,
        width: 160
    });
    this._textFieldIssuesDate = new Ext.form.Field({
    fieldLabel: '年代卷期',
    value: this._paper.get('issuesDate'),
        readOnly: true,
        width: 160
    });
    this._textFieldCODEN = new Ext.form.Field({
    fieldLabel: '期刊代码',
    value: this._paper.get('coden'),
        readOnly: true,
        width: 160
    });
    this._textFieldDegreeType = new Ext.form.Field({
    fieldLabel: '学位分类',
    value: this._paper.get('degreeType'),
        readOnly: true,
        width: 160
    });

    this._textFieldFirstOrganization = new Ext.form.Field({
    fieldLabel: '第一机构',
    value: this._paper.get('firstOrganization'),
        readOnly: true,
        width: 160
    });
    this._textFieldOrganizationName = new Ext.form.Field({
    fieldLabel: '机构名称',
    value: this._paper.get('organizationName'),
        readOnly: true,
        width: 160
    });
    this._textFieldRegion = new Ext.form.Field({
    fieldLabel: '地区',
    value: this._paper.get('region'),
        readOnly: true,
        width: 160
    });
    this._textFieldSubjectClass = new Ext.form.Field({
    fieldLabel: '学科分类',
    value: this._paper.get('subjectClass'),
        readOnly: true,
        width: 160
    });
    this._numberFieldOurSchoolSignRank = new Ext.form.Field({
    fieldLabel: '我校署名位次',
    value: this._paper.get('ourSchoolSignRank'),
        readOnly: true,
        width: 160
    });


    this._comboBoxCollege = new Ext.form.Field({
        fieldLabel: '所属院系',
        value: this._paper.get('collegeName'),
        readOnly: true,
        width: 160
    });
    this._textFieldFund = new Ext.form.Field({
    fieldLabel: '基金',
    value: this._paper.get('fund'),
        readOnly: true,
        width: 160
    });
    this._textFieldFundType = new Ext.form.Field({
    fieldLabel: '基金类别',
    value: this._paper.get('fundType'),
        readOnly: true,
        width: 160
    });



    var columnFirstItems = [this._textFieldISSN, this._textFieldCODEN, this._textFieldFirstOrganization, this._textFieldRegion, this._numberFieldOurSchoolSignRank, this._textFieldFund];
    var columnSecondItems = [this._textFieldIssuesDate, this._textFieldDegreeType, this._textFieldOrganizationName, this._textFieldSubjectClass, this._comboBoxCollege, this._textFieldFundType];

    Srims.papers.LiberalArtsPaperShowPanel_OtherBasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '其他基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldPublisher, new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_OtherBasicForm, Ext.form.FormPanel, {});


if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel_BasicForm = function(paper) {
    this._paper = paper;

    this._textFieldSerialNumbe = new Ext.form.Field({
    fieldLabel: '序列号',
    value: this._paper.get('serialNumbe'),
        readOnly: true,
        width: 160
    });
    this._numberFieldPublishDateYear = new Ext.form.Field({
    fieldLabel: '发表年',
    value: this._paper.get('publishDateYear'),
        readOnly: true,
        width: 160
    });
    this._textFieldResultsName = new Ext.form.Field({
    fieldLabel: '成果名',
    value: this._paper.get('resultsName'),
        readOnly: true,
        width: 160
    });
    this._comboBoxResultsType = new Ext.form.Field({
    fieldLabel: '成果类别',
    value: Srims.papers.ResultsTypeRender(this._paper.get('resultsType')),
        readOnly: true,
        width: 160
    });
    this._textFieldSourceAuthor = new Ext.form.Field({
    fieldLabel: '来源作者',
    value: this._paper.get('sourceAuthor'),
        readOnly: true,
        width: 160
    });
    this._publishDate = new Ext.form.Field({
    fieldLabel: '第一作者',
    value: this._paper.get('firstAuthor'),
        readOnly: true,
        width: 160
    });
    this._numberFieldCiteTime = new Ext.form.Field({
    fieldLabel: '总被引用次数',
    value: this._paper.get('citeTime'),
        readOnly: true,
        width: 160
    });
    this._textFieldResultsForm = new Ext.form.Field({
    fieldLabel: '成果形式',
    value: this._paper.get('resultsForm'),
        readOnly: true,
        width: 160
    });
    this._textFieldEnglishName = new Ext.form.Field({
    fieldLabel: '英文篇名',
    value: this._paper.get('englishName'),
        readOnly: true,
        width: 460
    });
    this._textFieldDegree = new Ext.form.Field({
        fieldLabel: '文章等级',
        value: this._paper.get('degree'),
        readOnly: true,
        width: 460
    });
    var columnFirstItems = [this._numberFieldPublishDateYear, this._textFieldResultsName,  this._textFieldResultsForm];
    var columnSecondItems = [this._textFieldSerialNumbe, this._comboBoxResultsType, this._numberFieldCiteTime];
    
    Srims.papers.LiberalArtsPaperShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldEnglishName,this._textFieldDegree,
                new Ext.Panel({
                    widht: 600,
                    layout: 'column',
                    items: [new Ext.Panel({
                        width: 300,
                        layout: 'form',
                        style: 'width:300px',
                        items: columnFirstItems
                    }), new Ext.Panel({
                        width: 300,
                        style: 'width:300px',
                        layout: 'form',
                        items: columnSecondItems
                    })]
                })]
    });
}

Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel_AuthorForm = function(paper) {

    this._paper = paper;
    this._store = new Srims.papers.LiberalArtsPaperAuthorStore(paper.get('id'));

    this._columnModel = new Srims.papers.LiberalArtsPaperAuthorGridPanel_ColumnModel();
    
    this._gridPanelPaperAuthor = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有作者信息'
        }
    });

    Srims.papers.LiberalArtsPaperShowPanel_AuthorForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '作者信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelPaperAuthor]
    });
    
    this._store.load();
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_AuthorForm, Ext.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel_AbstractForm = function(paper) {
    this._paper = paper;

    this._KeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._paper.get('keyWord'),
        readOnly: true,
        width: 460
    });
    this._Mark = new Ext.form.TextField({
        fieldLabel: '标志',
        value: this._paper.get('mark'),
        readOnly: true,
        width: 460
    });
    this._References = new Ext.form.TextArea({
        fieldLabel: '参考文献',
        value: this._paper.get('references'),
        readOnly: true,
        Height: 300,
        width: 460
    });

    Srims.papers.LiberalArtsPaperShowPanel_AbstractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '摘要信息',
        Height: 320,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._KeyWord, this._Mark, this._References]
    });
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_AbstractForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel = function(panelId, paper, store, systemSetting) {
    this._panelId = panelId;
    this._paper = paper;
    this._store = store;
    this._basicForm = new Srims.papers.LiberalArtsPaperShowPanel_BasicForm(this._paper);
    this._otherBasicForm = new Srims.papers.LiberalArtsPaperShowPanel_OtherBasicForm(this._paper);
    this._abstractFrom = new Srims.papers.LiberalArtsPaperShowPanel_AbstractForm(this._paper);
    this._paperAuthorForm = new Srims.papers.LiberalArtsPaperShowPanel_AuthorForm(this._paper);
    this._toolBar = new Srims.papers.LiberalArtsPaperShowPanel_ToolBar(paper, this._store);
    this._MessagePanel = new Srims.papers.LiberalArtsPaperEditPanel_MessagePanel(systemSetting);
    
    var items = [];
    items = [this._MessagePanel, this._basicForm, this._otherBasicForm, this._abstractFrom, this._paperAuthorForm];

    Srims.papers.LiberalArtsPaperShowPanel.superclass.constructor.call(this, {
        id: this._panelId,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._paper.get('resultsName'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: items
    });
    
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel, Ext.Panel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Ext.namespace('Srims.papers.ResultsType');

Srims.papers.ResultsType.Book = 'Book';
Srims.papers.ResultsType.CSSCI = 'CSSCI';
Srims.papers.ResultsType.CSSCIExten = 'CSSCIExten';

Srims.papers.ResultsTypeRender = function(value, metadata) {
    switch (value) {
        case 'Book':
            return '著作';
        case 'CSSCI':
            return 'CSSCI';
        case 'CSSCIExten':
            return 'CSSCI扩展版';
        default:
            return '未知';
    }
}

Srims.papers.ResultsTypeFilterItems = [{
id: 'Book',
text: '著作'
}, {
id: 'CSSCI',
text: 'CSSCI'
}, {
id: 'CSSCIExten',
text: 'CSSCI扩展版'
}];

Srims.papers.ResultsType = [['Book', '著作'], ['CSSCI', 'CSSCI'], ['CSSCIExten', 'CSSCI扩展版']];


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperQueryWindow_OtherPanel = function() {
this._textFieldPublisher = new Ext.form.TextField({
    fieldLabel: '期刊名或出版社',
    allowBlank: false,
    width: 460
});
this._textFieldISSN = new Ext.form.TextField({
    fieldLabel: 'ISSN',
    width: 160
});
this._textFieldIssuesDate = new Ext.form.TextField({
    fieldLabel: '年代卷期 ',
    width: 160
});
this._textFieldCODEN = new Ext.form.TextField({
    fieldLabel: '期刊代码',
    width: 160
});
this._textFieldDegreeType = new Ext.form.TextField({
    fieldLabel: '学位分类 ',
    width: 160
});


this._textFieldFirstOrganization = new Ext.form.TextField({
    fieldLabel: '第一机构',
    width: 160
});
this._textFieldOrganizationName = new Ext.form.TextField({
    fieldLabel: '机构名称',
    width: 160
});
this._textFieldRegion = new Ext.form.TextField({
    fieldLabel: '地区',
    width: 160
});
this._textFieldSubjectClass = new Ext.form.TextField({
    fieldLabel: '学科分类',
    width: 160
});



this._textFieldFund = new Ext.form.TextField({
    fieldLabel: '基金',
    width: 160
});
this._textFieldFundType = new Ext.form.TextField({
    fieldLabel: '基金类别',
    width: 160
});



var columnFirstItems = [this._textFieldISSN, this._textFieldCODEN, this._textFieldFirstOrganization, this._textFieldRegion,  this._textFieldFund];
var columnSecondItems = [this._textFieldIssuesDate, this._textFieldDegreeType, this._textFieldOrganizationName, this._textFieldSubjectClass,  this._textFieldFundType];


    Srims.papers.LiberalArtsPaperQueryWindow_OtherPanel.superclass.constructor.call(this, {
        title: '其他信息',
        frame: true,
        layout: 'form',
        labelWidth: 100,
        width: 710,
        items: [this._textFieldPublisher, new Ext.Panel({
            widht: 700,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    this.buildParams = function(params){
    params.publisher= this._textFieldPublisher.getValue();
    params.issn=this._textFieldISSN.getValue();
    params.issuesDate= this._textFieldIssuesDate.getValue();
    params.coden= this._textFieldCODEN.getValue();
    params.degreeType= this._textFieldDegreeType.getValue();

    params.firstOrganization= this._textFieldFirstOrganization.getValue();
    params.organizationName=this._textFieldOrganizationName.getValue();
    params.region=this._textFieldRegion.getValue();
    params.subjectClass=this._textFieldSubjectClass.getValue();

    params.fund=this._textFieldFund.getValue();
    params.fundType=this._textFieldFundType.getValue();

    }

    this.clearParams = function(params) {
    this._textFieldPublisher.reset();
    this._textFieldISSN.reset();
    this._textFieldIssuesDate.reset();
    this._textFieldCODEN.reset();
    this._textFieldDegreeType.reset();

    this._textFieldFirstOrganization.reset();
    this._textFieldOrganizationName.reset();
    this._textFieldRegion.reset();
    this._textFieldSubjectClass.reset();

    this._textFieldFund.reset();
    this._textFieldFundType.reset();
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperQueryWindow_OtherPanel, Ext.FormPanel);

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperQueryWindow_ExpertPanel = function() {
    return new Srims.component.QueryWindow_MemberPanel('专家信息');
}

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperQueryWindow_BasicPanel = function() {

    this._textFieldEnglishName = new Ext.form.TextField({
        fieldLabel: '英文篇名',
        width: 300
    });

    this._textFieldSerialNumbe = new Ext.form.TextField({
        fieldLabel: '序列号',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 144
    });


    this._textFieldResultsForm = new Ext.form.TextField({
        fieldLabel: '成果形式',
        width: 150
    });
    this._numberFieldPublishDateYearBegin = new Ext.form.NumberField({
        fieldLabel: '发表年',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldPublishDateYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });

    this._numberFieldOurSchoolSignRankBegin = new Ext.form.NumberField({
        fieldLabel: '我校署名位次',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldOurSchoolSignRankEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });

    this._numberFieldCiteTimeBegin = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteTimeEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    
    this._textFieldResultsName = new Ext.form.TextField({
        fieldLabel: '成果名',
        width: 150
    });
    this._checkboxGroupResultsType = new Srims.component.CheckBoxGroup({
        fieldLabel: '成果类别',
        cls: 'srims-checkboxGroup-signUnit',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.ResultsType)
    });


    var columnFirstItems = [this._comboBoxCollege, this._numberFieldPublishDateYearBegin, this._numberFieldOurSchoolSignRankBegin, this._numberFieldCiteTimeBegin, this._textFieldResultsName];
    var columnSecondItems = [this._textFieldSerialNumbe, this._numberFieldPublishDateYearEnd, this._numberFieldOurSchoolSignRankEnd, this._numberFieldCiteTimeEnd, this._textFieldResultsForm];

    Srims.papers.LiberalArtsPaperQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 710,
        items: [this._textFieldEnglishName,
                this._checkboxGroupResultsType,
                new Ext.Panel({
                    widht: 700,
                    layout: 'column',
                    items: [new Ext.Panel({
                        width: 300,
                        layout: 'form',
                        style: 'width:300px',
                        items: columnFirstItems
                    }), new Ext.Panel({
                        width: 300,
                        style: 'width:300px',
                        layout: 'form',
                        items: columnSecondItems
                    })]
                })]
    });

    this.buildParams = function(params) {
        params.englishName = this._textFieldEnglishName.getValue();
        params.publishDateYearStart = this._numberFieldPublishDateYearBegin.getValue();
        params.publishDateYearEnd = this._numberFieldPublishDateYearEnd.getValue();
        params.citeTimeStart = this._numberFieldCiteTimeBegin.getValue();
        params.citeTimeEnd = this._numberFieldCiteTimeEnd.getValue();
        params.resultsType = this._checkboxGroupResultsType.getSelecetedValue();
        params.resultsName = this._textFieldResultsName.getValue();
        params.resultsForm = this._textFieldResultsForm.getValue();
        params.serialNumbe = this._textFieldSerialNumbe.getValue();
        params.collegeName = this._comboBoxCollege.getText();

        params.ourSchoolSignRankStart = this._numberFieldOurSchoolSignRankBegin.getValue();
        params.ourSchoolSignRankEnd = this._numberFieldOurSchoolSignRankEnd.getValue();
    }

    this.clearParams = function(params) {
        this._textFieldEnglishName.reset();
        this._numberFieldPublishDateYearBegin.reset();
        this._numberFieldPublishDateYearEnd.reset();
        this._checkboxGroupResultsType.reset();
        this._textFieldResultsName.reset();
        this._textFieldResultsForm.reset();
        this._textFieldSerialNumbe.reset();
        this._numberFieldCiteTimeBegin.reset();
        this._numberFieldCiteTimeEnd.reset();
        this._comboBoxCollege.reset();

        this._numberFieldOurSchoolSignRankBegin.reset();
        this._numberFieldOurSchoolSignRankEnd.reset();
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperQueryWindow_BasicPanel, Ext.FormPanel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperQueryWindow = function(id, store, isMagazineQuery, queryParams) {

    this._id = id;
    this._store = store;
    this._params = queryParams;
    this._basicPanel = new Srims.papers.LiberalArtsPaperQueryWindow_BasicPanel();
    this._otherPanel = new Srims.papers.LiberalArtsPaperQueryWindow_OtherPanel();
    this._expertPanel = new Srims.component.QueryWindow_MemberPanel('专家信息');
    
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
            Srims.common.newView(Srims.common.ViewType.PaperQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){

        Srims.common.showViewWindow(Srims.common.ViewType.PaperQuery);
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

    Srims.papers.LiberalArtsPaperQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '文科论文查询',
        iconCls: 'icon-paper-query',
        width: 716,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        autoHeight: true,
        stateful: false,
        //height: 550,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 760,
            layout: 'form',
            labelWidth: 100,
            autoHeight: false,
            height: 550,
            deferredRender: false,
            autoScroll: true,
            items: [this._basicPanel, this._otherPanel, this._expertPanel]
        })],
       // buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
   
    });
    
    this.getParams = function(){
        var params = this._params;
        
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._expertPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._expertPanel.clearParams();
    }
    
    this.getGridPanel = function(){
    var gridPanelID = "LiberalArtsPaperGridPanel_LiberalArtsPaperList";
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
    }
    this.query = function(button){
        var window = button.window;
              window.getGridPanel();
              queryParams = window.getParams();

        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperQueryWindow, Ext.Window);

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperEditPanel_AbstractForm = function(paper){
    this._paper = paper;
    
    this._abstract = new Ext.form.TextArea({
        fieldLabel: '摘要',
        value: this._paper.get('abstract'),
        Height: 380,
        width: 460
    });
    
    Srims.papers.PaperEditPanel_AbstractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '摘要信息',
        Height: 400,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._abstract]
    });
    
    this.assginValues = function(){
        this._paper.set('abstract', this._abstract.getValue());
    }
    
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._abstract.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.papers.PaperEditPanel_AbstractForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperEditPanel_BasicForm = function(paper){
    this._paper = paper;
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '论文名称',
        value: paper.get('name'),
        allowBlank: false,
        width: 460
    });
    this._entitySearchComboBoxMagazine = new Srims.component.MagazineSearch.SearchComboBox({
        fieldLabel: '杂志期刊',
        value: paper.get('fullName'),
        store: new Srims.papers.MagazineStore(Srims.service.papers.MagazineService + "/SearchMagazine"),
        listWidth: 460,
        selectEntityId: paper.get('magazineID'),
        width: 460
    });
    this._textFieldResourceName = new Ext.form.TextField({
        fieldLabel: '会议名称',
        value: paper.get('resourceName'),
        width: 460
    });
    this._numberFieldPublishYear = new Ext.form.NumberField({
        fieldLabel: '发表年份',
        value: paper.get('publishYear'),
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 160
    });
    this._textFieldPublishDate = new Ext.form.TextField({
        fieldLabel: '发表日期',
        value: paper.get('publishDate'),
        width: 160
    });
    // this._numberFieldInfluenceFactor = new Srims.component.ThousandPercentField({
    //     fieldLabel: '影响因子',
    //     value: paper.get('influenceFactorOfPaper'),
    //     maxLength: 6,
    //    width: 160
    // });
    this._numberFieldCiteFrequency = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        value: paper.get('citeFrequencyOfPaper'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 160
    });
    this._textFieldDocumentNumber = new Ext.form.TextField({
        fieldLabel: '文档编号',
        value: paper.get('documentNumber'),
        width: 160
    });
    this._textFieldVolume = new Ext.form.TextField({
        fieldLabel: '期/卷',
        value: paper.get('volume'),
        width: 160
    });
    this._numberFieldStartPage = new Ext.form.NumberField({
        fieldLabel: '起始页码',
        value: paper.get('startPage'),
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        maxLength: 6,
        width: 160
    });
    this._numberFieldEndPage = new Ext.form.NumberField({
        fieldLabel: '终止页码',
        value: paper.get('endPage'),
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        maxLength: 6,
        width: 160
    });
    this._numberFieldPages = new Ext.form.NumberField({
        fieldLabel: '页数',
        value: paper.get('pages'),
        allowDecimals: false,
        allowNegative: false,
        readOnly: true,
        maxLength: 6,
        width: 160
    });
    this._textFieldIsiUniqueArticleIdentifier = new Ext.form.TextField({
        fieldLabel: 'ISIIdentifier',
        value: paper.get('isiUniqueArticleIdentifier'),
        width: 160
    });
    this._comboBoxType = new Ext.form.ComboBox({
        fieldLabel: '文章类型',
        value: paper.get('type'),
        store: Srims.papers.paperTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 144
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        value: paper.get('collegeName'),
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        entityId: paper.get('collegeID'),
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 144
    });
    this._comboBoxLab = new Srims.component.NoticeTextComboBox({
        fieldLabel: '所属实验室',
        value: paper.get('lab'),
        displayField: 'name',
        noticeTextType: 'Lab',
        editable: false,
        triggerAction: 'all',
        listWidth: 160,
        width: 144
    });
    this._comboBoxLinkManSignUnit = new Ext.form.ComboBox({
        fieldLabel: '通讯作者署名单位',
        value: paper.get('linkManSignUnit'),
        store: Srims.papers.signUnitStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 144
    });
  
    this._comboBoxFirstAuthorSignUnit = new Ext.form.ComboBox({
        fieldLabel: '第一作者署名单位',
        value: paper.get('firstAuthorSignUnit'),
        store: Srims.papers.signUnitStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 144
    });
    this._numberFieldSignOrder = new Ext.form.NumberField({
        fieldLabel: '我校署名位次',
        value: paper.get('signOrder'),
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 160
    });
    // this._numberFieldSubAirer = new Ext.form.NumberField({
    //     fieldLabel: '所属分区',
    //     value: paper.get('subAirer'),
    //     allowDecimals: false,
    //     allowNegative: false,
    //    maxLength: 6,
    //width: 160
    //  });
    this._checkboxGroupIndexed = new Srims.component.CheckBoxGroup({
        fieldLabel: '论文收录',
        cls: 'srims-checkboxGroup',
        columns: 5,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.paperIndexedTypeStore, this._paper.get("indexedString"))
    });
    var columnFirstItems = [this._comboBoxType, this._numberFieldPublishYear, this._textFieldDocumentNumber, this._numberFieldStartPage, this._numberFieldPages, this._comboBoxCollege, this._comboBoxLinkManSignUnit, this._numberFieldSignOrder];
    var columnSecondItems = [this._textFieldPublishDate, this._numberFieldCiteFrequency, this._textFieldVolume, this._numberFieldEndPage, this._textFieldIsiUniqueArticleIdentifier, this._comboBoxLab, this._comboBoxFirstAuthorSignUnit];
    
    Srims.papers.PaperEditPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 900,
        frame: true,
        labelWidth: 110,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldName, this._entitySearchComboBoxMagazine,this._textFieldResourceName, new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._checkboxGroupIndexed]
    });
    
    this.assginValues = function(){
        this._paper.set('name', this._textFieldName.getValue());
        this._paper.set('magazineID', this._entitySearchComboBoxMagazine.getValue());
        this._paper.set('resourceName', this._textFieldResourceName.getValue()); 
        this._paper.set('publishYear', this._numberFieldPublishYear.getValue());
        this._paper.set('publishDate', this._textFieldPublishDate.getValue());
        // this._paper.set('influenceFactorOfPaper', this._numberFieldInfluenceFactor.getValue());
        this._paper.set('citeFrequencyOfPaper', this._numberFieldCiteFrequency.getValue());
        this._paper.set('documentNumber', this._textFieldDocumentNumber.getValue());
        this._paper.set('volume', this._textFieldVolume.getValue());
        this._paper.set('startPage', this._numberFieldStartPage.getValue());
        this._paper.set('endPage', this._numberFieldEndPage.getValue());
        this._paper.set('pages', this._numberFieldPages.getValue());
        this._paper.set('isiUniqueArticleIdentifier', this._textFieldIsiUniqueArticleIdentifier.getValue());
        this._paper.set('type', this._comboBoxType.getValue());
        this._paper.set('collegeID', this._comboBoxCollege.getValue());
        this._paper.set('lab', this._comboBoxLab.getValue());
        this._paper.set('linkManSignUnit', this._comboBoxLinkManSignUnit.getValue());
        this._paper.set('firstAuthorSignUnit', this._comboBoxFirstAuthorSignUnit.getValue());
        this._paper.set('signOrder', this._numberFieldSignOrder.getValue());
        // this._paper.set('subAirer', this._numberFieldSubAirer.getValue());
        this._paper.set('indexedString', this._checkboxGroupIndexed.getSelecetedValue());
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
    
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldName.isValid(preventMark) && result;
        result = this._entitySearchComboBoxMagazine.isValid(preventMark) && result;
        result = this._numberFieldPublishYear.isValid(preventMark) && result;
        result = this._textFieldPublishDate.isValid(preventMark) && result;
        // result = this._numberFieldInfluenceFactor.isValid(preventMark) && result;
        result = this._numberFieldCiteFrequency.isValid(preventMark) && result;
        result = this._textFieldVolume.isValid(preventMark) && result;
        result = this._textFieldIsiUniqueArticleIdentifier.isValid(preventMark) && result;
        result = this._comboBoxType.isValid(preventMark) && result;
        result = this._comboBoxCollege.isValid(preventMark) && result;
        result = this._comboBoxLab.isValid(preventMark) && result;
        result = this._comboBoxLinkManSignUnit.isValid(preventMark) && result;
        result = this._comboBoxFirstAuthorSignUnit.isValid(preventMark) && result;
        result = this._numberFieldSignOrder.isValid(preventMark) && result;
        // result = this._numberFieldSubAirer.isValid(preventMark) && result;
        result = this._checkboxGroupIndexed.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        return result;
    }
    this._setPages = function(){
        var result = true;
        var preventMark = false;
        result = this.isValid(preventMark) && result;
        result = this._numberFieldStartPage.isValid(preventMark) && result;
        if (result && this._numberFieldEndPage.getValue() && this._numberFieldStartPage.getValue()) {
            if (this._numberFieldStartPage.getValue() - this._numberFieldEndPage.getValue() > 0) {
                Ext.Msg.show({
                    title: '页码错误',
                    msg: '起始页码大于终止页码，请重新输入。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            else 
                this._numberFieldPages.setValue(this._numberFieldEndPage.getValue() - this._numberFieldStartPage.getValue() + 1);
        }
        else 
            this._numberFieldPages.setValue(undefined);
    }
    this._numberFieldEndPage.panel = this;
    this._numberFieldEndPage.on('blur', function(){
        var panel = this.panel;
        panel._setPages();
    });
    this._numberFieldStartPage.panel = this;
    this._numberFieldStartPage.on('blur', function(){
        var panel = this.panel;
        panel._setPages();
    });
}
Ext.extend(Srims.papers.PaperEditPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperEditPanel_OtherBasicForm = function(paper){

    this._paper = paper;
    var emailExpr = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
    this._textFieldlinkManEmail = new Ext.form.TextField({
        fieldLabel: '通讯作者Email',
        value: this._paper.get('linkManEmail'),
        regex: emailExpr,
        regexText: '邮箱格式有误，请重新输入',
        width: 460
    });
    this._textFieldlinkManAddress = new Ext.form.TextField({
        fieldLabel: '作者地址',
        value: this._paper.get('linkManAddress'),
        width: 460
    });
    this._textFieldAuthorkeyWord = new Ext.form.TextField({
        fieldLabel: '作者关键词',
        value: this._paper.get('authorKeyWord'),
        width: 460
    });
    this._textFieldkeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._paper.get('keyWord'),
        width: 460
    });
    this._textFieldremark = new Ext.form.TextField({
        fieldLabel: '备注',
        value: this._paper.get('remark'),
        width: 460
    });
    
    Srims.papers.PaperEditPanel_OtherBasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '其他基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldlinkManAddress, this._textFieldlinkManEmail, this._textFieldAuthorkeyWord, this._textFieldkeyWord, this._textFieldremark]
    });
    
    this.assginValues = function(){
        this._paper.set('linkManEmail', this._textFieldlinkManEmail.getValue());
        this._paper.set('linkManAddress', this._textFieldlinkManAddress.getValue());
        this._paper.set('authorKeyWord', this._textFieldAuthorkeyWord.getValue());
        this._paper.set('keyWord', this._textFieldkeyWord.getValue());
        this._paper.set('remark', this._textFieldremark.getValue());
    }
    
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldlinkManEmail.isValid(preventMark) && result;
        result = this._textFieldlinkManAddress.isValid(preventMark) && result;
        result = this._textFieldAuthorkeyWord.isValid(preventMark) && result;
        result = this._textFieldkeyWord.isValid(preventMark) && result;
        result = this._textFieldremark.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.papers.PaperEditPanel_OtherBasicForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperEditPanel = function(panelId, paper, systemSetting){
    this._id = panelId;
    this._paper = paper;
    this._title = paper.isNew() ? "添加论文" : paper.get('name');
    var isNew = paper.isNew();
    this._formPanelBasic = new Srims.papers.PaperEditPanel_BasicForm(this._paper);
    this._formPanelOtherBasic = new Srims.papers.PaperEditPanel_OtherBasicForm(this._paper);
    this._formPanelAbstract = new Srims.papers.PaperEditPanel_AbstractForm(this._paper);
    this._MessagePanel = new Srims.papers.PaperEditPanel_MessagePanel(systemSetting);
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    
    Srims.papers.PaperEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        buttonAlign: 'center',
        title: this._title,
        iconCls: paper.isNew() ? 'icon-paper-new' : 'icon-edit',
        items: [this._MessagePanel, this._formPanelBasic, this._formPanelOtherBasic, this._formPanelAbstract],
        buttons: [this._buttonSave]
    });
    
    this.assginValues = function(){
        this._formPanelBasic.assginValues();
        this._formPanelOtherBasic.assginValues();
        this._formPanelAbstract.assginValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelBasic.isValid(preventMark) && result;
        result = this._formPanelOtherBasic.isValid(preventMark) && result;
        result = this._formPanelAbstract.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var paper = this._paper;
        paper.beginEdit();
        this.assginValues();
        paper.commit();
        Ext.Ajax.request({
            url: Srims.service.papers.PaperService + '/Save',
            params: paper.data,
            scope: this,
            success: function(response){
                Srims.WorkSpace.getWorkSpace().remove(this);
                Srims.papers.listPaper(false);
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.papers.PaperXmlReader()
                });
                var newPaper = newStore.getAt(0);
                if (!isNew) {
                    var panelId = "PaperShowPanel_" + newPaper.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.papers.showPaper(newPaper);
            }
        });
    }
    this._onButonSave_Click = function(button, e){
        var panel = button.panel;
        
        if (!panel.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    
    this._buttonSave.on('click', this._onButonSave_Click);
}



Ext.extend(Srims.papers.PaperEditPanel, Ext.Panel, {});

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperQueryWindow_BasicPanel = function(){

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '论文名称',
        width: 300
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.papers.PaperService + '/GetPaperColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._comboBoxLab = new Srims.component.EntityComboBox({
        fieldLabel: '所属实验室',
        store: new Srims.data.IDValueRecordStore(Srims.service.papers.PaperService + '/GetLabs'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._textFieldAuthor = new Ext.form.TextField({
        fieldLabel: '论文作者',
        width: 150
    });
    this._numberFieldOrder = new Ext.form.NumberField({
        fieldLabel: '作者位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        maxLength: 6,
        width: 150
    });
    this._checkBoxIsLinkMan = new Ext.form.Checkbox({
        fieldLabel: '是否通讯作者'
    });
    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        width: 150
    });
    this._numberFieldInfluenceFactorBegin = new Srims.component.ThousandPercentField({
        fieldLabel: '影响因子',
        maxLength: 6,
        width: 150
    });
    this._numberFieldInfluenceFactorEnd = new Srims.component.ThousandPercentField({
        fieldLabel: '至',
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequencyBegin = new Ext.form.NumberField({
        fieldLabel: '被引频次',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequencyEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldPublishYearBegin = new Ext.form.NumberField({
        fieldLabel: '发表年份',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldPublishYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 150
    });
    this._numberFieldSubAirerBegin = new Ext.form.NumberField({
        fieldLabel: '分区',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirerEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 6,
        width: 150
    });
    
    var columnFirstItems = [this._comboBoxCollege, this._textFieldAuthor, this._checkBoxIsLinkMan, this._numberFieldInfluenceFactorBegin, this._numberFieldCiteFrequencyBegin, this._numberFieldPublishYearBegin, this._numberFieldSubAirerBegin];
    var columnSecondItems = [this._comboBoxLab, this._numberFieldOrder, this._textFieldKeyWord, this._numberFieldInfluenceFactorEnd, this._numberFieldCiteFrequencyEnd, this._numberFieldPublishYearEnd, this._numberFieldSubAirerEnd];
    
    Srims.papers.PaperQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 680,
        items: [this._textFieldName, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 260,
                layout: 'form',
                labelWidth: 90,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 100,
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    
    this.buildParams = function(params){
        params.name = this._textFieldName.getValue();
        params.collegeName = this._comboBoxCollege.getText();
        params.lab = this._comboBoxLab.getText();
        params.paperAuthorName = this._textFieldAuthor.getValue();
        params.authorOrder = this._numberFieldOrder.getValue();
        params.isLinkMan = this._checkBoxIsLinkMan.checked ? "true" : "";
        params.keyWord = this._textFieldKeyWord.getValue();
        params.influenceFactorOfPaperStart = this._numberFieldInfluenceFactorBegin.getValue();
        params.influenceFactorOfPaperEnd = this._numberFieldInfluenceFactorEnd.getValue();
        params.citeFrequencyOfPaperStart = this._numberFieldCiteFrequencyBegin.getValue();
        params.citeFrequencyOfPaperEnd = this._numberFieldCiteFrequencyEnd.getValue();
        params.publishYearStart = this._numberFieldPublishYearBegin.getValue();
        params.publishYearEnd = this._numberFieldPublishYearEnd.getValue();
        params.SubAirerStart = this._numberFieldSubAirerBegin.getValue();
        params.SubAirerEnd = this._numberFieldSubAirerEnd.getValue();
    }
    
    this.clearParams = function(params){
        this._textFieldName.reset();
        this._comboBoxCollege.reset();
        this._comboBoxLab.reset();
        this._textFieldAuthor.reset();
        this._numberFieldOrder.reset();
        this._checkBoxIsLinkMan.reset();
        this._textFieldKeyWord.reset();
        this._numberFieldInfluenceFactorBegin.reset();
        this._numberFieldInfluenceFactorEnd.reset();
        this._numberFieldCiteFrequencyBegin.reset();
        this._numberFieldCiteFrequencyEnd.reset();
        this._numberFieldPublishYearBegin.reset();
        this._numberFieldPublishYearEnd.reset();
        this._numberFieldSubAirerBegin.reset();
        this._numberFieldSubAirerEnd.reset();
    }
}
Ext.extend(Srims.papers.PaperQueryWindow_BasicPanel, Ext.FormPanel);

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperQueryWindow_ExpertPanel = function(){
    return new Srims.component.QueryWindow_MemberPanel('专家信息');
}

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperQueryWindow_MagazinePanel = function(){
    return new Srims.papers.MagazineQueryWindow_InforPanel(false);
}

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperQueryWindow_OtherPanel = function(){
    this._checkboxGroupIndexed = new Srims.component.CheckBoxGroup({
        fieldLabel: '论文收录',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.paperIndexedTypeStore)
    });
    this._checkboxGroupType = new Srims.component.CheckBoxGroup({
        fieldLabel: '文章类型',
        cls: 'srims-checkboxGroup-paperType',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.paperTypeStore)
    });
    this._checkboxGroupLinkManSignUnit = new Srims.component.CheckBoxGroup({
        fieldLabel: '通讯作者署名单位',
        cls: 'srims-checkboxGroup-signUnit',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.signUnitStore)
    });
    this._checkboxGroupFirstAuthorSignUnit = new Srims.component.CheckBoxGroup({
        fieldLabel: '第一作者署名单位',
        cls: 'srims-checkboxGroup-signUnit',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.signUnitStore)
    });
    this._checkBoxIsFistAuthorOrLinkManSignUnit = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '设置通讯作者与第一作者署名单位为或的关系'
    });
    var columnItems = [this._checkboxGroupIndexed, this._checkboxGroupType, this._checkboxGroupLinkManSignUnit, this._checkboxGroupFirstAuthorSignUnit, this._checkBoxIsFistAuthorOrLinkManSignUnit];
    
    Srims.papers.PaperQueryWindow_OtherPanel.superclass.constructor.call(this, {
        title: '其他信息',
        frame: true,
        layout: 'form',
        labelWidth: 100,
        width: 680,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: columnItems
        })]
    });
    
    this.buildParams = function(params){
        params.indexed = this._checkboxGroupIndexed.getSelecetedValue();
        params.type = this._checkboxGroupType.getSelecetedValue();
        params.linkManSignUnit = this._checkboxGroupLinkManSignUnit.getSelecetedValue();
        params.firstAuthorSignUnit = this._checkboxGroupFirstAuthorSignUnit.getSelecetedValue();
        params.isFistAuthorOrLinkManSignUnit = this._checkBoxIsFistAuthorOrLinkManSignUnit.checked ? "true" : "";
    }
    
    this.clearParams = function(params){
        this._checkboxGroupIndexed.reset();
        this._checkboxGroupType.reset();
        this._checkboxGroupLinkManSignUnit.reset();
        this._checkboxGroupFirstAuthorSignUnit.reset();
        this._checkBoxIsFistAuthorOrLinkManSignUnit.reset();
    }
}
Ext.extend(Srims.papers.PaperQueryWindow_OtherPanel, Ext.FormPanel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperQueryWindow = function(id, store, isMagazineQuery, queryParams){

    this._id = id;
    this._store = store;
    this._params = queryParams;
    this._basicPanel = new Srims.papers.PaperQueryWindow_BasicPanel();
    this._otherPanel = new Srims.papers.PaperQueryWindow_OtherPanel();
    this._magazinePanel = new Srims.papers.PaperQueryWindow_MagazinePanel();
    this._expertPanel = new Srims.papers.PaperQueryWindow_ExpertPanel();
    
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
            Srims.common.newView(Srims.common.ViewType.PaperQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
        
            Srims.common.showViewWindow(Srims.common.ViewType.PaperQuery);
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
    
    Srims.papers.PaperQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '论文查询',
        iconCls: 'icon-paper-query',
        width: 723,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        autoHeight: true,
        stateful: false,
        // height: 550,
        closeAction: 'hide',
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
            items: [this._basicPanel, this._otherPanel, this._magazinePanel, this._expertPanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    });
    
    this.getParams = function(){
        var params = this._params;
        
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._magazinePanel.buildParams(params);
        this._expertPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._magazinePanel.clearParams();
        this._expertPanel.clearParams();
    }
    
    this.getGridPanel = function(){
        var gridPanelID = "PaperGridPanel_PaperList";
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
    }
    this.query = function(button){
        var window = button.window;
        window.getGridPanel();
        queryParams=window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.papers.PaperQueryWindow, Ext.Window);

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_AbstractForm = function(paper){
    this._paper = paper;
    
    this._abstract = new Ext.form.TextArea({
        fieldLabel: '摘要',
        value: this._paper.get('abstract'),
        readOnly: true,
        width: 460
    });
    
    Srims.papers.PaperShowPanel_AbstractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '摘要信息',
        Height: 320,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._abstract]
    });
}
Ext.extend(Srims.papers.PaperShowPanel_AbstractForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_AuthorForm = function(paper){

    this._paper = paper;
    this._store = new Srims.papers.PaperAuthorStore(paper.get('id'));
    
    this._columnModel = new Srims.papers.PaperAuthorGridPanel_ColumnModel();
    
    this._gridPanelPaperAuthor = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 500,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有作者信息'
        }
    });
    
    Srims.papers.PaperShowPanel_AuthorForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '作者信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelPaperAuthor]
    });
    
    this._store.load();
}
Ext.extend(Srims.papers.PaperShowPanel_AuthorForm, Ext.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_BasicForm = function(paper){
    this._paper = paper;
    
    this._paperName = new Ext.form.Field({
        fieldLabel: '论文名称',
        value: this._paper.get('name'),
        readOnly: true,
        width: 460
    });
    this._magazineName = new Ext.form.Field({
        fieldLabel: '杂志名称',
        value: this._paper.get('fullName'),
        readOnly: true,
        width: 460
    });
    this._textFieldResourceName = new Ext.form.Field({
        fieldLabel: '会议名称',
        value: this._paper.get('resourceName'),
        readOnly: true,
        width: 460
    });
    this._paperType = new Ext.form.Field({
        fieldLabel: '文章类型',
        value: Srims.papers.PaperTypeRender(this._paper.get('type')),
        readOnly: true,
        width: 160
    });
    this._paperIndexed = new Ext.form.Field({
        fieldLabel: '论文收录',
        value: this._paper.get('indexed'),
        readOnly: true,
        width: 160
    });
    this._publishYear = new Ext.form.Field({
        fieldLabel: '发表年份',
        value: this._paper.get('publishYear'),
        readOnly: true,
        width: 160
    });
    this._publishDate = new Ext.form.Field({
        fieldLabel: '发表日期',
        value: this._paper.get('publishDate'),
        readOnly: true,
        width: 160
    });
    this._influenceFactor = new Ext.form.Field({
        fieldLabel: '影响因子',
        value: InfluenceFactor.render(this._paper.get('influenceFactorOfPaper')),
        readOnly: true,
        width: 160
    });
    this._citeFrequency = new Ext.form.Field({
        fieldLabel: '被引频次',
        value: this._paper.get('citeFrequencyOfPaper'),
        readOnly: true,
        width: 160
    });
    this._documentNumber = new Ext.form.Field({
        fieldLabel: '期次',
        value: this._paper.get('documentNumber'),
        readOnly: true,
        width: 160
    });
    this._volume = new Ext.form.Field({
        fieldLabel: '卷号',
        value: this._paper.get('volume'),
        readOnly: true,
        width: 160
    });
    this._startPage = new Ext.form.Field({
        fieldLabel: '起始页码',
        value: this._paper.get('startPage'),
        readOnly: true,
        width: 160
    });
    this._endPage = new Ext.form.Field({
        fieldLabel: '终止页码',
        value: this._paper.get('endPage'),
        readOnly: true,
        width: 160
    });
    this._pages = new Ext.form.Field({
        fieldLabel: '页数',
        value: this._paper.get('pages'),
        readOnly: true,
        width: 160
    });
    this._isiIdentifier = new Ext.form.Field({
        fieldLabel: 'ISIIdentifier',
        value: this._paper.get('isiUniqueArticleIdentifier'),
        readOnly: true,
        width: 160
    });
    this._collegeName = new Ext.form.Field({
        fieldLabel: '所属院系',
        value: this._paper.get('collegeName'),
        readOnly: true,
        width: 160
    });
    this._lab = new Ext.form.Field({
        fieldLabel: '所属实验室',
        value: this._paper.get('lab'),
        readOnly: true,
        width: 160
    });
    this._linkManSignUnit = new Ext.form.Field({
        fieldLabel: '通讯作者署名单位',
        value: Srims.papers.SignUnitRender(this._paper.get('linkManSignUnit')),
        readOnly: true,
        width: 160
    });
   
    this._firstAuthorSignUnit = new Ext.form.Field({
        fieldLabel: '第一作者署名单位',
        value: Srims.papers.SignUnitRender(this._paper.get('firstAuthorSignUnit')),
        readOnly: true,
        width: 160
    });
    this._signOrder = new Ext.form.Field({
        fieldLabel: '中国海洋大学位次',
        value: this._paper.get('signOrder'),
        readOnly: true,
        width: 160
    });
    var columnFirstItems = [this._paperType, this._publishYear, this._influenceFactor, this._documentNumber, this._startPage, this._pages, this._collegeName, this._linkManSignUnit];
    var columnSecondItems = [this._paperIndexed, this._publishDate, this._citeFrequency, this._volume, this._endPage, this._isiIdentifier, this._lab, this._firstAuthorSignUnit];
    
    var items = [this._paperName];
    if (paper.get("magazineID") != undefined && paper.get("magazineID")) 
        items[items.length] = this._magazineName;
    else 
        items[items.length] = this._textFieldResourceName;
    
    items[items.length] = new Ext.Panel({
        labelWidth: 100,
        widht: 600,
        layout: 'column',
        items: [new Ext.Panel({
            width: 300,
            layout: 'form',
            style: 'width:300px',
            items: columnFirstItems
        }), new Ext.Panel({
            width: 300,
            style: 'width:300px',
            layout: 'form',
            items: columnSecondItems
        })]
    });
    items[items.length] = this._signOrder;
    
    Srims.papers.PaperShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: items
    });
}

Ext.extend(Srims.papers.PaperShowPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_MagazineForm = function(paper){
    this._paper = paper;
    this.getMagazineFromPaper = function(paper){
        var magazine = new Srims.papers.Magazine({});
        magazine.set('shortName', paper.get('shortName'));
        magazine.set('issn', paper.get('issn'));
        magazine.set('subjectClass', paper.get('subjectClass'));
        magazine.set('subjectRank', paper.get('subjectRank'));
        magazine.set('publishType', paper.get('publishType'));
        magazine.set('language', paper.get('language'));
        return magazine;
    }
    this._paperMagazine = this.getMagazineFromPaper(this._paper);
    return new Srims.papers.MagazineShowPanel_BasicForm(this._paperMagazine, true);
}

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_MagazineYearInforForm = function(paper){
    this._paper = paper;
    this._magazineId = this._paper.get('magazineID');
    return new Srims.papers.MagazineShowPanel_YearInforForm(this._magazineId, true);
}

if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_OtherBasicForm = function(paper){

    this._paper = paper;
    
    this._linkMan = new Ext.form.Field({
        fieldLabel: '通讯作者',
        value: this._paper.get('linkManName'),
        readOnly: true,
        width: 460
    });
    this._linkManEmail = new Ext.form.Field({
        fieldLabel: '通讯作者Email',
        value: this._paper.get('linkManEmail'),
        readOnly: true,
        width: 460
    });
    this._linkManAddress = new Ext.form.Field({
        fieldLabel: '作者地址',
        value: this._paper.get('linkManAddress'),
        readOnly: true,
        width: 460
    });
    this._keyWord = new Ext.form.Field({
        fieldLabel: '关键词',
        value: this._paper.get('keyWord'),
        readOnly: true,
        width: 460
    });
    this._remark = new Ext.form.Field({
        fieldLabel: '备注',
        value: this._paper.get('remark'),
        readOnly: true,
        width: 460
    });
    
    Srims.papers.PaperShowPanel_OtherBasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '其他基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._linkManAddress, this._linkMan, this._linkManEmail, this._keyWord, this._remark]
    });
}
Ext.extend(Srims.papers.PaperShowPanel_OtherBasicForm, Ext.form.FormPanel, {});


if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperShowPanel_ToolBar = function(paper, store){

    //fields
    this._paper = paper;
    this._store = store;
    //controls
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        paper: this._paper,
        handler: function(){
            Srims.papers.editPaper(this.paper);
        },
        hidden: true,
        tooltip: '<b>编辑论文</b><br/>编辑选中论文的基本、杂志、作者等信息'
    });
    this._buttonPaperAuthorManage = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '论文作者管理',
        minWidth: 60,
        paper: this._paper,
        panel: this._panel,
        handler: function(){
            Srims.papers.showPaperAuthorManageWindow(this.paper);
        },
        hidden: true,
        tooltip: '<b>编辑论文作者信息</b><br/>编辑选中论文的作者信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        paper: this._paper,
        store: this._store,
        handler: function(){
            Srims.papers.deletePaper(this.paper, this.store);
        },
        hidden: true,
        tooltip: '<b>删除论文</b>'
    });
    
    Srims.papers.PaperShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonPaperAuthorManage, this._buttonDelete]
    });
    
    this._buttonEdit.setVisible(this._paper.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!this._paper.get('canEdit'));
    
    this._buttonDelete.setVisible(this._paper.get('hasPermission_Edit'));
    this._buttonDelete.setDisabled(!this._paper.get('canEdit'));
    
    this._buttonPaperAuthorManage.setVisible(this._paper.get('hasPermission_EditPaperAuhtor'));
    this._buttonPaperAuthorManage.setDisabled(!this._paper.get('canEditPaperAuthor'));
}
Ext.extend(Srims.papers.PaperShowPanel_ToolBar, Ext.Toolbar);


if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel = function(panelId, paper, store,systemSetting){
    this._panelId = panelId;
    this._paper = paper;
    this._store = store;
    this._basicForm = new Srims.papers.PaperShowPanel_BasicForm(this._paper);
    this._otherBasicForm = new Srims.papers.PaperShowPanel_OtherBasicForm(this._paper);
    this._abstractFrom = new Srims.papers.PaperShowPanel_AbstractForm(this._paper);
    this._paperAuthorForm = new Srims.papers.PaperShowPanel_AuthorForm(this._paper);
    this._magazineInforForm = new Srims.papers.PaperShowPanel_MagazineForm(this._paper);
    this._magazineYearInforForm = new Srims.papers.PaperShowPanel_MagazineYearInforForm(this._paper);
    this._toolBar = new Srims.papers.PaperShowPanel_ToolBar(paper, this._store);
    this._MessagePanel = new Srims.papers.PaperEditPanel_MessagePanel(systemSetting);
    
    var items = [];
    items = [this._MessagePanel, this._basicForm, this._otherBasicForm, this._abstractFrom, this._paperAuthorForm];
    if (paper.get("magazineID") != undefined && paper.get("magazineID") > 0) 
        items = [this._MessagePanel, this._basicForm, this._otherBasicForm, this._abstractFrom, this._paperAuthorForm, this._magazineInforForm, this._magazineYearInforForm];
    
    Srims.papers.PaperShowPanel.superclass.constructor.call(this, {
        id: this._panelId,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._paper.get('name'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: items
    });
    
}
Ext.extend(Srims.papers.PaperShowPanel, Ext.Panel, {});

if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.PaperExport_Column = function() {
}

Srims.papers.PaperExport_Column.basic = [['Name', '名称', , '200'], ['FullName', '杂志名称', , '150'], ['PublishYear', '出版年份', , '50'],
    ['InfluenceFactorOfPaper', '影响因子', 'influenceFactor', '50'], ['Indexed', '收录', , '50'], ['CollegeName', '所属学院', , '80'], ['Type', '类型', 'enum', '80'],
    ['CiteFrequencyOfPaper', '引用频次', , '50'], ['PublishDate', '发表日期', , '50'], ['DocumentNumber', '文档号', , '80'], ['Volume', '卷号', , '80'],
    ['StartPage', '起始页码', , '30'], ['EndPage', '终止页码', , '30'], ['Pages', '页数', , '30'], ['SubAirer', '分区', , '50'], ['SignOrder', '我校位次', , '10'], ['Lab', '实验室', , '80'],
    ['ISIUniqueArticleIdentifier', 'ISIIdentifier', , '80'], ['Abstract', '摘要', , '500']];

Srims.papers.PaperExport_Column.magazine = [['FullName', '发表杂志', , '150'], ['ShortName', '杂志简称', , '100'], ['ISSN', 'ISSN', , '80'],
    ['SubjectRank', '学科等级', , '50'], ['SubjectClass', '学科分类', , '80'], ['PublishType', '出版类型', 'enum', '80'],
    ['Language', '语种', 'enum', '50']];

Srims.papers.PaperExport_Column.author = [['LinkManName', '通讯作者', , '80'], ['LinkManSignUnit', '通讯作者署名单位', 'enum', '100'],
     ['LinkManAddress', '通讯作者地址', , '150'], ['LinkManEmail', '通讯作者Email', , '150'], ['FirstAuthorName', '第一作者', , '50'],
     ['FirstAuthorSignUnit', '第一作者署名单位', 'enum', '100'], ['AuthorKeyWord', '作者关键词', , '80'], ['Authors', '所有作者', , '250']];

if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperExport_Column = function() {
}

Srims.papers.LiberalArtsPaperExport_Column.basic = [['PublishDateYear', '发表年', , '40'], ['SerialNumbe', '序列号', , '50'], ['ResultsName', '成果名', , '100'],
    ['ResultsType', '成果类别', 'enum', '50'], ['EnglishName', '英文篇名', , '150'], ['Authors', '来源作者', , '100'],['ResultsForm', '成果形式', , '50'], ['Fund', '基金', , '80'], 
    ['Publisher', '期刊名或出版社', , '150'], ['ISSN', 'ISSN', , '50'], ['FirstOrganization', '第一机构', , '80'], ['OurSchoolSignRank', '我校署名位次', , '50'],['OrganizationName', '机构名称', , '80'],
    ['Region', '地区', , '30'], ['SubjectClass', '学科分类', , '30'], ['FirstAuthorName', '第一作者', , '50'], ['CollegeName', '所属院系', , '100'], ['CODEN', '期刊代码', , '50'], ['IssuesDate', '年代卷期', , '100'], ['KeyWord', '关键词', , '80'],
    ['Mark', '标志', , '80'], ['DegreeType', '学位分类', , '50'], ['FundType', '基金类别', , '50'], ['References', '参考文献', , '800'], ['CiteTime', '总被引次数', , '50']];



if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperEditPanel_MessagePanel = function(systemSetting) {
    Srims.papers.LiberalArtsPaperEditPanel_MessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">' + systemSetting + '</span>'
    });
}
Ext.extend(Srims.papers.LiberalArtsPaperEditPanel_MessagePanel, Ext.Panel);

if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperEditPanel_MessagePanel = function(systemSetting){
    Srims.papers.PaperEditPanel_MessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '<span style="color:#FF0000">' + systemSetting + '</span>'
    });
}
Ext.extend(Srims.papers.PaperEditPanel_MessagePanel, Ext.Panel);

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
