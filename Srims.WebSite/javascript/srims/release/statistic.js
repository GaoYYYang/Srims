
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.statisticProjectCount = function(){
    var actionParams = {};
    actionParams.name = 'ProjectCount';
    actionParams.window = Srims.statistic.ProjectCountStatisticWindow;
    actionParams.hasManagePermission = Srims.currentUser.hasPermission_ProjectCountStatisticViewManage;
    
    var id = 'window_statistic_project_count';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.ProjectCountStatisticWindow);
}
Srims.statistic.statisticFundTotal = function(){
    var id = 'window_statistic_fund_total';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.FundTotalWindow);
}
Srims.statistic.statisticFundDescend = function(){
    var id = 'window_statistic_fund_descend';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.FundDescendWindow);
}
Srims.statistic.statisticVoucher = function(){
    var id = 'window_statistic_voucher';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.VoucherWindow);
}
Srims.statistic.statisticPaper = function(){
    var id = 'window_statistic_paper';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.PaperStatisticWindow);
}
Srims.statistic.statisticPatent = function(){
    var id = 'window_statistic_patent';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.PatentStatisticWindow);
}
Srims.statistic.statisticAward = function(){
    var id = 'window_statistic_award';
    Srims.statistic._showStatisticWindow(id, Srims.statistic.AwardStatisticWindow);
}
Srims.statistic._showStatisticWindow = function(id, window){
    var win = Ext.getCmp(id);
    if (!win) 
        win = new window(id);
    win.show();
}

Srims.statistic.showLoadingAnimation = function(name){
    Srims.statistic._loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在进行' + name + '...'
    });
    Srims.statistic._loadingAnimation.show();
};

Srims.statistic.showResult = function(title, iconCls, response, renderer){

    if (String.isEmpty(response.responseText)) {
        Srims.statistic._hideLoadingAnimation();
        Ext.Msg.show({
            title: '无数据',
            msg: '统计结果中不包含任何数据。请核对统计条件。',
            buttons: Ext.Msg.OK,
            mode: true
        });
        return;
    }
    
    var store = Srims.statistic._getStore(response);
    
    var params = {};
    params.store = store;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = Srims.statistic._getColumnModel(response.responseXML, renderer);
    var girdPanel = new Srims.component.GridPanel(params);
    
    Srims.WorkSpace.addPanel(girdPanel);
    
    Srims.statistic._hideLoadingAnimation();
}
Srims.statistic.exportToExcel = function(title, response, renderer){

    if (String.isEmpty(response.responseText)) {
        Srims.statistic._hideLoadingAnimation();
        Ext.Msg.show({
            title: '无数据',
            msg: '统计结果中不包含任何数据。请核对统计条件。',
            buttons: Ext.Msg.OK,
            mode: true
        });
        return;
    }
    
    var store = Srims.statistic._getStore(response);
    var columns = Srims.statistic._getExportColumns(response.responseXML, renderer);
    
    Srims.exportAction.exportToExcel(store, columns, title);
    
    Srims.statistic._hideLoadingAnimation();
}

Srims.statistic._getStore = function(response){
    var responseXML = response.responseXML;
    var record = Srims.statistic._getRecord(responseXML);
    var store = new Srims.statistic.Store(record);
    
    store.loadData(responseXML);
    return store;
}

Srims.statistic._getRecord = function(responseXML){

    var domQuery = Ext.DomQuery;
    var columnNodes = domQuery.select('Statistic/Columns/Column', responseXML);
    
    var recordString = 'Ext.data.Record.create([';
    for (var i = 0; i < columnNodes.length; i++) {
        var columnName = domQuery.selectValue('/Name', columnNodes[i]);
        var columnType = i == 0 ? 'string' : 'int';
        
        recordString = i == 0 ? recordString : recordString + ',';
        recordString = recordString + String.format('{name: \'{0}\', type: \'{1}\', mapping: \'{0}\'}', columnName, columnType);
    }
    
    recordString = recordString + ']);';
    
    //alert(recordString);
    return eval(recordString);
}
Srims.statistic._getColumnModel = function(responseXML, renderer){
    var domQuery = Ext.DomQuery;
    var columnNodes = domQuery.select('Statistic/Columns/Column', responseXML);
    
    var columnModelString = 'new Ext.grid.ColumnModel(['
    
    for (var i = 0; i < columnNodes.length; i++) {
        columnModelString = i == 0 ? columnModelString : columnModelString + ',';
        var renderString = (i == 0 || String.isEmpty(renderer)) ? '' : ',renderer:' + renderer;
        
        columnName = domQuery.selectValue('/Name', columnNodes[i])
        columnTitle = domQuery.selectValue('/Title', columnNodes[i])
        columnModelString = columnModelString + String.format('{header: \'{0}\',dataIndex:\'{1}\' , sortable: true {2}}', columnTitle, columnName, renderString);
    }
    
    columnModelString = columnModelString + ']);';
    
    //alert(columnModelString);
    return eval(columnModelString)
}
Srims.statistic._getExportColumns = function(responseXML, renderer){
    var domQuery = Ext.DomQuery;
    var columnNodes = domQuery.select('Statistic/Columns/Column', responseXML);
    
    var column = {};
    column.Name = [];
    column.BoxLabel = [];
    column.Renderer = [];
    
    for (var i = 0; i < columnNodes.length; i++) {
        var renderString = (i == 0 || String.isEmpty(renderer)) ? '' : renderer;
        
        columnName = domQuery.selectValue('/Name', columnNodes[i])
        columnTitle = domQuery.selectValue('/Title', columnNodes[i])
        
        column.Name = column.Name.concat(columnName);
        column.BoxLabel = column.BoxLabel.concat(columnTitle);
        column.Renderer = column.Renderer.concat(eval(renderString));
    }
    
    return column;
}

Srims.statistic._hideLoadingAnimation = function(){
    if (Srims.statistic._loadingAnimation) 
        Srims.statistic._loadingAnimation.hide();
}

Srims.CensorState = new function(){
};

Srims.CensorState.unSubmited='UnSubmited';
Srims.CensorState.waitingCensor='WaitingCensor';
Srims.CensorState.reject='Reject';
Srims.CensorState.passed='Passed';
Srims.CensorState.canceled='Canceled';

Srims.CensorState.Render = function(value){
    switch (value) {
        case 'UnSubmited':
            return '未提交';
        case 'WaitingCensor':
            return '等待审核';
        case 'Reject':
            return '审核驳回';
        case 'Passed':
            return '审核通过';
        case 'Canceled':
            return '作废';
        default:
            return '<span class="error">未知</span>';
    }
};

if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.UserRoleType = new function(){
};

Srims.users.UserRoleType.Administrator = 'Administrator';
Srims.users.UserRoleType.Expert = 'Expert';


if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.ProvinceCityPanel = function(fieldLabel, province, city, allowBlank){
    this._fieldLabel = fieldLabel;
    this._province = province;
    this._city = city;
    this._allowBlank = allowBlank;
    
    this._comboBox_Province = new Ext.form.ComboBox({
        fieldLabel: this._fieldLabel,
        store: Provinces,
        allowBlank: true,
        forceSelection: true,
        triggerAction: 'all',
        mode: 'local',
        lazyLoad: false,
        width: 100
    });
    this._comboBox_City = new Ext.form.ComboBox({
        fieldLabel: this._fieldLabel,
        hideLabel: true,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: this._province == undefined ? new Array() : Provinces.getCities(this._province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: true,
        forceSelection: true,
        mode: 'local',
        triggerAction: 'all',
        lazyLoad: false,
        width: 100
    });
    
    this._comboBox_Province.comboBox_City = this._comboBox_City;
    
    this.onComboBox_Province_Select = function(comboBox){
        var province = comboBox.getValue();
        var comboBox_City = comboBox.comboBox_City;
        var cityStore = comboBox_City.store;
        var cities = Provinces.getCities(province);
        
        cityStore.loadData(cities);
        
        if (cityStore.getCount() == 1) {
            comboBox_City.setValue(cities[0][0]);
        }
        else {
            comboBox_City.setValue(undefined);
        }
    };
    this._comboBox_Province.on('select', this.onComboBox_Province_Select);
    Srims.component.ProvinceCityPanel.superclass.constructor.call(this, {
        widht: 300,
        layout: 'column',
        labelWidth: 60,
        items: [new Ext.Panel({
            width: 180,
            labelWidth: 60,
            layout: 'form',
            items: this._comboBox_Province
        }), new Ext.Panel({
            width: 100,
            layout: 'form',
            items: this._comboBox_City
        })]
    });
}
Ext.extend(Srims.component.ProvinceCityPanel, Ext.Panel);

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

if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.Base = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'academyDirectorID',
    type: 'int',
    mapping: 'AcademyDirectorID'
}, {
    name: 'academyDirectorName',
    type: 'string',
    mapping: 'AcademyDirectorName'
}, {
    name: 'address',
    type: 'string',
    mapping: 'Address'
}, {
    name: 'administration',
    type: 'string',
    mapping: 'Administration'
}, {
    name: 'directorID',
    type: 'int',
    mapping: 'DirectorID'
}, {
    name: 'directorName',
    type: 'string',
    mapping: 'DirectorName'
}, {
    name: 'fax',
    type: 'string',
    mapping: 'Fax'
}, {
    name: 'phone',
    type: 'string',
    mapping: 'Phone'
}, {
    name: 'rank',
    type: 'string',
    mapping: 'Rank'
}, {
    name: 'zip',
    type: 'string',
    mapping: 'Zip'
}, {
    name: 'isDirectorSchoolExpert',
    type: 'boolean',
    mapping: 'IsDirectorSchoolExpert',
    convert: Boolean.toBoolean
}, {
    name: 'isAcademyDirectorSchoolExpert',
    type: 'boolean',
    mapping: 'IsAcademyDirectorSchoolExpert',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.bases.Base);

if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.bases.BaseStore.superclass.constructor.call(this, new Srims.bases.BaseXmlReader(), load_url, params);
    }
});

if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.bases.BaseXmlReader.superclass.constructor.call(this, Srims.bases.Base);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRank = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}]);
Srims.data.Entity.apply(Srims.type.ProjectRank);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectRankXmlReader.superclass.constructor.call(this, Srims.type.ProjectRank);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectRankStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.type.ProjectRankStore.superclass.constructor.call(this, new Srims.type.ProjectRankXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectType = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isBudget',
    type: 'boolean',
    mapping: 'IsBudget',
    convert: Boolean.toBoolean
}, {
    name: 'overheadExpenseInRate',
    type: 'int',
    mapping: 'OverheadExpenseInRate'
}, {
    name: 'overheadExpenseOutRate',
    type: 'int',
    mapping: 'OverheadExpenseOutRate'
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'administration',
    type: 'string',
    mapping: 'Administration'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'bakCode',
    type: 'string',
    mapping: 'BakCode'
}, {
    name: 'perCode',
    type: 'string',
    mapping: 'PerCode'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'isExploit',
    type: 'boolean',
    mapping: 'IsExploit',
    convert: Boolean.toBoolean
}, {
    name: 'isHorizontalType',
    type: 'boolean',
    mapping: 'IsHorizontalType',
    convert: Boolean.toBoolean
}, {
    name: 'projectComingFrom',
    type: 'string',
    mapping: 'ProjectComingFrom'
}, {
    name: 'projectRankID',
    type: 'int',
    mapping: 'ProjectRankID'
}, {
    name: 'projectRank',
    type: 'string',
    mapping: 'ProjectRank'
}, {
    name: 'subjectNature',
    type: 'string',
    mapping: 'SubjectNatrue'
}, {
	name: 'managementFeesType',
	type: 'string',
	mapping: 'ManagementFeesType'
},{
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageProjectSupportField',
    type: 'boolean',
    mapping: 'HasPermission_ManageProjectSupportField',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageProjectSupportCategory',
    type: 'boolean',
    mapping: 'HasPermission_ManageProjectSupportCategory',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_UploadDocumentModel',
    type: 'boolean',
    mapping: 'HasPermission_UploadDocumentModel',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canManageProjectSupportField',
    type: 'boolean',
    mapping: 'CanManageProjectSupportField',
    convert: Boolean.toBoolean
}, {
    name: 'canManageProjectSupportCategory',
    type: 'boolean',
    mapping: 'CanManageProjectSupportCategory',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectType);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectTypeXmlReader.superclass.constructor.call(this, Srims.type.ProjectType);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.type.ProjectTypeStore.superclass.constructor.call(this, new Srims.type.ProjectTypeXmlReader(), load_url, params);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategory = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isGetOverheadExpense',
    type: 'boolean',
    mapping: 'IsGetOverheadExpense',
    convert: Boolean.toBoolean
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectSupportCategory);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportCategoryXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportCategory);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportCategoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportCategoryService + '/Query';
        Srims.type.ProjectSupportCategoryStore.superclass.constructor.call(this, new Srims.type.ProjectSupportCategoryXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportField = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'projectType',
    type: 'string',
    mapping: 'ProjectType'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageSubField',
    type: 'boolean',
    mapping: 'HasPermission_ManageSubField',
    convert: Boolean.toBoolean
}, {
    name: 'canManageSubField',
    type: 'boolean',
    mapping: 'CanManageSubField',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectSupportField);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportFieldXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportField);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportFieldStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportFieldService + '/Query';
        Srims.type.ProjectSupportFieldStore.superclass.constructor.call(this, new Srims.type.ProjectSupportFieldXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubField = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'projectSupportField',
    type: 'string',
    mapping: 'ProjectSupportField'
}, {
    name: 'isAvailable',
    type: 'boolean',
    mapping: 'IsAvailable',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.type.ProjectSupportSubField);

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.type.ProjectSupportSubFieldXmlReader.superclass.constructor.call(this, Srims.type.ProjectSupportSubField);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectSupportSubFieldStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(){
    
        var load_url = Srims.service.type.ProjectSupportSubFieldService + '/Query';
        Srims.type.ProjectSupportSubFieldStore.superclass.constructor.call(this, new Srims.type.ProjectSupportSubFieldXmlReader(), load_url);
    }
});

if (!Srims.type) 
    Ext.namespace('Srims.type');

Ext.namespace('Srims.type.ProjectSubjectNature');

Srims.type.ProjectSubjectNature.Science = 'Science';
Srims.type.ProjectSubjectNature.Liberal = 'Liberal';


Srims.type.projectSubjectNatureRender = function(value, metadata){
    switch (value) {
        case 'Science':
            return '理工科';
        case 'Liberal':
            return '文科';
        default:
            return '未知';
    }
}
Srims.type.projectSubjectNatureStore = [['Science', '理工科'], ['Liberal', '文科'], ['Unknown', '未知']];

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.GridPanl_VerticalProjectList_ID = 'ProjectGridPanel_VerticalList';
Srims.projects.GridPanl_HorizontalProjectList_ID = 'ProjectGridPanel_HorizontalList';
Srims.projects.GridPanel_WaitingStartCensorVerticalProjectList_ID = 'ProjectGridPanel_VerticalWaitingStartCensorList';
Srims.projects.GridPanel_WaitingEndCensorVericalProjectList_ID = 'ProjectGridPanel_VerticalWaitingEndCensorList';
Srims.projects.GridPanel_WaitingStartCensorHorizontalProjectList_ID = 'ProjectGridPanel_HorizontalWaitingStartCensorList';
Srims.projects.GridPanel_WaitingEndCensorHorizontalProjectList_ID = 'ProjectGridPanel_HorizontalWaitingEndCensorList';
Srims.projects.GridPanel_MyPrincipalProjectList = 'MyPrincipalProjectList';
Srims.projects.GridPanel_MyParticipateProjectList = 'MyParticipateProjectList';
Srims.projects.GridPanel_MyDelegateProjectList = 'MyDelegateProjectList';


Srims.projects.Panel_NewVerticalProject_ID = 'NewVerticalPrjectPanel';
Srims.projects.Panel_NewHorizontalProject_ID = 'NewHorizontalPrjectPanel';

Srims.projects.Panel_ShowProject_ID = 'ProjectShowPanel';

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectLevel');

Srims.projects.ProjectLevel.Perside = 'Perside';
Srims.projects.ProjectLevel.Join = 'Join';
Srims.projects.ProjectLevel.Addition = 'Addition';
Srims.projects.ProjectLevel.Coordinate='Coordinate';

Srims.projects.projectLevelRender = function(value, metadata){
    switch (value) {
        case 'Join':
            return '参与';
        case 'Perside':
            return '主持';
        case 'Addition':
            return '附加';
        case 'Coordinate':
        	return '配套';
        default:
            return '未知';
    }
}
Srims.projects.projectLevelStore = [['Perside', '主持'], ['Join', '参与'], ['Addition', '附加'],['Coordinate','配套']];

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectState');

Srims.projects.ProjectState.WaitingStartInformation = 'WaitingStartInformation';
Srims.projects.ProjectState.WaitingStartCensor = 'WaitingStartCensor';
Srims.projects.ProjectState.ProjectProcessing = 'ProjectProcessing';
Srims.projects.ProjectState.WaitingEndCensor = 'WaitingEndCensor';
Srims.projects.ProjectState.ProjectEnd = 'ProjectEnd';
Srims.projects.ProjectState.ProjectDelete = 'Deleted';
Srims.projects.ProjectState.WithDraw = 'WithDraw';
Srims.projects.ProjectState.Terminate = 'Terminate';

Srims.projects.projectStateRender = function(value, metadata){
    switch (value) {
        case 'WaitingStartInformation':
            return '填写立项信息';
        case 'WaitingStartCensor':
            return '等待立项审核';
        case 'ProjectProcessing':
            return '在研';
        case 'WaitingEndCensor':
            return '等待结项审核';
        case 'ProjectEnd':
            return '已结项';
        case 'WithDraw':
            return '撤销';
        case 'Terminate':
            return '终止';
        case 'Defer':
            return '延期';
        case 'DeferEnd':
            return '延期结题';
        default:
            return '未知';
    }
}
Srims.projects.projectStateFilterItems = [{
    id: 'WaitingStartInformation',
    text: '填写立项信息'
}, {
    id: 'WaitingStartCensor',
    text: '等待立项审核'
}, {
    id: 'ProjectProcessing',
    text: '在研'
}, {
    id: 'WaitingEndCensor',
    text: '等待结项审核'
}, {
    id: 'ProjectEnd',
    text: '已结项'
}, {
    id: 'Defer',
    text: '延期'
}, {
    id: 'DeferEnd',
    text: '延期结题'
}];

Srims.projects.projectStateStore = [['WaitingStartInformation', '填写立项信息'], ['WaitingStartCensor', '等待立项审核'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateEditStore = [['WaitingStartInformation', '填写立项信息'], ['ProjectProcessing', '在研'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateQueryStore = [['WaitingStartInformation', '未提交'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['WithDraw', '撤销'], ['Terminate', '终止'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.Project = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'outsourcingAlreadyAmountString',
    type: 'string',
    mapping: 'OutsourcingAlreadyAmountString'
}, {
    name: 'trueOverheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'TrueOverheadExpensesAlreadyIn'
}, {
    name: 'outsourcingPlanAmountString',
    type: 'string',
    mapping: 'OutsourcingPlanAmountString'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'recoveryvoucherNumber',
    type: 'string',
    mapping: 'RecoveryvoucherNumber'
}, {
    name: 'roverheadExpensesAmount',
    type: 'string',
    mapping: 'RoverheadExpensesAmount'
}, {
    name: 'recoveryAmount',
    type: 'string',
    mapping: 'RecoveryAmount'
}, {
    name: 'rremark',
    type: 'string',
    mapping: 'Rremark'
}, {
    name: 'recoveryPrintState',
    type: 'string',
    mapping: 'RecoveryPrintState'
}, {
    name: 'recoveryPrintDate',
    type: 'string',
    mapping: 'RecoveryPrintDate'
},
{
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'principalNumber',
    type: 'string',
    mapping: 'PrincipalNumber'
}, {
    name: 'principalEmail',
    type: 'string',
    mapping: 'PrincipalEmail'
}, {
    name: 'isPrincipalSecondCollege',
    type: 'string',
    mapping: 'IsPrincipalSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'principalCollege',
    type: 'string',
    mapping: 'PrincipalCollege'
}, {
    name: 'principalId',
    type: 'string',
    mapping: 'PrincipalID'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'subjectName',
    type: 'string',
    mapping: 'SubjectName'
}, {
    name: 'firstLevelSubjectId',
    type: 'string',
    mapping: 'FirstLevelSubjectID'
}, {
    name: 'firstLevelSubjectName',
    type: 'string',
    mapping: 'FirstLevelSubjectName'
}, {
    name: 'secondLevelSubjectId',
    type: 'string',
    mapping: 'SecondLevelSubjectID'
}, {
    name: 'secondLevelSubjectName',
    type: 'string',
    mapping: 'SecondLevelSubjectName'
}, {
    name: 'researchType',
    type: 'string',
    mapping: 'ResearchType'
}, {
    name: 'cooperationType',
    type: 'string',
    mapping: 'CooperationType'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'isSecret',
    type: 'boolean',
    mapping: 'IsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'baseId',
    type: 'string',
    mapping: 'BaseID'
}, {
    name: 'baseName',
    type: 'string',
    mapping: 'BaseName'
}, {
    name: 'principalDelegate',
    type: 'string',
    mapping: 'PrincipalDelegate'
}, {
    name: 'principalDelegateId',
    type: 'string',
    mapping: 'PrincipalDelegateID'
}, {
    name: 'creator',
    type: 'string',
    mapping: 'Creator'
}, {
    name: 'createDate',
    type: 'date',
    mapping: 'CreateDate'
}, {
    name: 'corporationPlace',
    type: 'string',
    mapping: 'CorporationPlace'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'taskComingFrom',
    type: 'string',
    mapping: 'TaskComingFrom'
}, {
    name: 'isHorizontal',
    type: 'boolean',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'rankId',
    type: 'int',
    mapping: 'RankID'
}, {
    name: 'rankName',
    type: 'string',
    mapping: 'RankName'
}, {
    name: 'typeId',
    type: 'int',
    mapping: 'TypeID'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'typeShortName',
    type: 'string',
    mapping: 'TypeShortName'
}, {
    name: 'supportCategoryId',
    type: 'int',
    mapping: 'SupportCategoryID'
}, {
    name: 'supportCategoryName',
    type: 'string',
    mapping: 'SupportCategoryName'
}, {
    name: 'supportFieldId',
    type: 'int',
    mapping: 'SupportFieldID'
}, {
    name: 'supportFieldName',
    type: 'string',
    mapping: 'SupportFieldName'
}, {
    name: 'supportSubFieldId',
    type: 'int',
    mapping: 'SupportSubFieldID'
}, {
    name: 'supportSubFieldName',
    type: 'string',
    mapping: 'SupportSubFieldName'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'fundAlreadyHardware',
    type: 'int',
    mapping: 'FundAlreadyHardware'
}, {
    name: 'fundAlreadyIn',
    type: 'int',
    mapping: 'FundAlreadyIn'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'fundAlreadyTotal',
    type: 'int',
    mapping: 'FundAlreadyTotal'
}, {
    name: 'fundContract',
    type: 'int',
    mapping: 'FundContract'
}, {
    name: 'fundFrom',
    type: 'string',
    mapping: 'FundFrom'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}, {
    name: 'fundPlanHardware',
    type: 'int',
    mapping: 'FundPlanHardware'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'fundPlanIn',
    type: 'int',
    mapping: 'FundPlanIn'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'overheadExpenseInTotal',
    type: 'int',
    mapping: 'OverheadExpenseInTotal'
}, {
    name: 'overheadExpenseOutTotal',
    type: 'int',
    mapping: 'OverheadExpenseOutTotal'
}, {
    name: 'overheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyIn'
}, {
    name: 'overheadExpensesAlreadyOut',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyOut'
}, {
    name: 'overheadExpensesInStandard',
    type: 'int',
    mapping: 'OverheadExpensesInStandard'
}, {
    name: 'performancePayStandard',
    type: 'int',
    mapping: 'PerformancePayStandard'
}, {
    name: 'fundManageProportion',
    type: 'int',
    mapping: 'FundManageProportion'	//国家规定管理费比例
}, {
    name: 'performancePay',
    type: 'int',
    mapping: 'PerformancePay'//校内绩效工资
}, {
    name: 'performancePayAlready',
    type: 'int',
    mapping: 'PerformancePayAlready'//已分配绩效工资
}, {
    name: 'receivedOverheadExpenses',
    type: 'int',
    mapping: 'ReceivedOverheadExpenses'	//追缴单-已收管理费
}, {
    name: 'overheadExpensesAmount',
    type: 'int',
    mapping: 'OverheadExpensesAmount'	//追缴单-应收管理费
}, {
    name: 'recoveryAmount',
    type: 'int',
    mapping: 'RecoveryAmount'	//追缴金额 
}, {
    name: 'printDateTime',
    type: 'string',
    mapping: 'PrintDateTime'	//追缴单-打印时间
}, {
    name: 'isPrint',
    type: 'string',
    mapping: 'IsPrint'	//追缴单-是否已打印
}, {
    name: 'equipmentCost',
    type: 'int',
    mapping: 'EquipmentCost'
}, {
    name: 'borrowAmount',
    type: 'int',
    mapping: 'BorrowAmount'
}, {
    name: 'returnAmount',
    type: 'int',
    mapping: 'ReturnAmount'
}, {
    name: 'projectAccountNumber',
    type: 'string',
    mapping: 'ProjectAccountNumber'
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
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Delete',
    type: 'boolean',
    mapping: 'HasPermission_Delete',
    convert: Boolean.toBoolean
}, {
    name: 'canDelete',
    type: 'boolean',
    mapping: 'CanDelete',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_WithDraw',
    type: 'boolean',
    mapping: 'HasPermission_WithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'canWithDraw',
    type: 'boolean',
    mapping: 'CanWithDraw',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Terminate',
    type: 'boolean',
    mapping: 'HasPermission_Terminate',
    convert: Boolean.toBoolean
}, {
    name: 'canTerminate',
    type: 'boolean',
    mapping: 'CanTerminate',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectMember',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMember',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectMember',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectMember',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectMember',
    type: 'boolean',
    mapping: 'CanShow_ProjectMember',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanEdit_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectPayPlanItem',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectPayPlanItem',
    type: 'boolean',
    mapping: 'CanShow_ProjectPayPlanItem',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectContract',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectMainContract',
    type: 'boolean',
    mapping: 'CanEdit_ProjectMainContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectContract',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectContract',
    type: 'boolean',
    mapping: 'CanShow_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectContract',
    type: 'boolean',
    mapping: 'CanCensor_ProjectContract',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditProjectDoucment',
    type: 'boolean',
    mapping: 'HasPermission_EditProjectDoucment',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit_ProjectDocument',
    type: 'boolean',
    mapping: 'CanEdit_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ShowProejectDocument',
    type: 'boolean',
    mapping: 'HasPermission_ShowProejectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canShow_ProjectDocument',
    type: 'boolean',
    mapping: 'CanShow_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor_ProjectDocument',
    type: 'boolean',
    mapping: 'CanCensor_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canRequire_ProjectDocument',
    type: 'boolean',
    mapping: 'CanRequire_ProjectDocument',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitStart',
    type: 'boolean',
    mapping: 'CanSubmitStart',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmitEnd',
    type: 'boolean',
    mapping: 'CanSubmitEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoStart',
    type: 'boolean',
    mapping: 'CanUndoStart',
    convert: Boolean.toBoolean
}, {
    name: 'canUndoEnd',
    type: 'boolean',
    mapping: 'CanUndoEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorStart',
    type: 'boolean',
    mapping: 'CanCensorStart',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorEnd',
    type: 'boolean',
    mapping: 'CanCensorEnd',
    convert: Boolean.toBoolean
}, {
    name: 'canSetDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanSetDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearDelegatePrincipal',
    type: 'boolean',
    mapping: 'CanClearDelegatePrincipal',
    convert: Boolean.toBoolean
}, {
    name: 'canClearProjectAccountBookNumber',
    type: 'boolean',
    mapping: 'CanClearProjectAccountBookNumber',
    convert: Boolean.toBoolean
}, {
    name: 'canCompleteIn',
    type: 'boolean',
    mapping: 'CanCompleteIn',
    convert: Boolean.toBoolean
}, {
    name: 'campusIndirectCosts',
    type: 'int',
    mapping: 'CampusIndirectCosts'
}, {
    name: 'overheadExpenseMiddleTotal',
    type: 'int',
    mapping: 'OverheadExpenseMiddleTotal'
}, {
    name: 'overheadExpenseExpertTotal',
    type: 'int',
    mapping: 'OverheadExpenseExpertTotal'
}

]);
Srims.data.Entity.apply(Srims.projects.Project);
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectStore.superclass.constructor.call(this, new Srims.projects.ProjectXmlReader(), load_url, params);
    },
});

Srims.projects.ProjectSimpleStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.projects.ProjectSimpleStore.superclass.constructor.call(this, new Srims.projects.ProjectSimpleXmlReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectXmlReader.superclass.constructor.call(this, Srims.projects.Project);
    },
    readRecords: function(responseXML){
        var result = Srims.projects.ProjectXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.fundSum = parseInt(Ext.DomQuery.selectValue("FundSum", responseXML), 10);
        result.records.fundReceivedSum = parseInt(Ext.DomQuery.selectValue("FundReceivedSum", responseXML), 10);
        
        return result;
    }
});
Srims.projects.ProjectSimpleXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectXmlReader.superclass.constructor.call(this, Srims.projects.Project);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryState = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'date',
    mapping: 'DateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}]);

Srims.data.Entity.apply(Srims.projects.ProjectHistoryState);


if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryStateStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(project){
    
        var load_url = Srims.service.projects.StateHistoryService + '/GetByProjectID';
        var params = {};
        if (project.get('id') != undefined) {
            params["projectId"] = project.isNew() ? 0 : project.get('id')
        }
        Srims.projects.ProjectHistoryStateStore.superclass.constructor.call(this, new Srims.projects.ProjectHistoryStateXmLReader(), load_url, params);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectHistoryStateXmLReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.projects.ProjectHistoryStateXmLReader.superclass.constructor.call(this, Srims.projects.ProjectHistoryState);
    }
});

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectQueryWindow_BasicPanel = function(isHorizontal){
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '编号',
        width: 150
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        width: 150
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._dateFieldStartDateBegin = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 150
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._dateFieldEndDateBegin = new Ext.form.DateField({
        fieldLabel: '结束时间',
        width: 150
    });
    this._dateFieldEndDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._checkboxGroupLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectLevelStore, Srims.projects.ProjectLevel.Perside)
    });
    this._checkboxGroupState = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectStateQueryStore)
    });
    this._textFieldTaskFroms = new Ext.form.TextField({
        fieldLabel: '任务来源',
        width: 150
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密'
    });
    this._comboBoxProjectSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        store: Srims.type.projectSubjectNatureStore,
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._panelCorporationPlace = new Srims.component.ProvinceCityPanel('单位地址', undefined, undefined, true);
    
    
    var columnOneItems = [this._textFieldNumber, this._textFieldPrincipal, this._dateFieldStartDateBegin, this._dateFieldEndDateBegin, this._checkboxIsSecret];
    var columnTwoItems = [this._textFieldName, this._comboBoxCollege, this._dateFieldStartDateEnd, this._dateFieldEndDateEnd];
    var columnItems = [];
    if (isHorizontal || isHorizontal == undefined) {
        columnTwoItems[columnTwoItems.length] = this._textFieldTaskFroms;
        columnOneItems[columnOneItems.length] = this._comboBoxProjectSubjectNature;
        columnItems[columnItems.length] = this._panelCorporationPlace;
    }
    else 
        columnTwoItems[columnTwoItems.length] = this._comboBoxProjectSubjectNature;
    
    columnItems[columnItems.length] = this._checkboxGroupLevel;
    columnItems[columnItems.length] = this._checkboxGroupState;
    
    Srims.projects.ProjectQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoWidth: true,
        autoHeight: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnTwoItems
            })]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: columnItems
        })]
    });
    
    this.buildParams = function(params){
        params.number = this._textFieldNumber.getValue();
        params.name = this._textFieldName.getValue();
        params.principal = this._textFieldPrincipal.getValue();
        params.principalCollege = this._comboBoxCollege.getText();
        
        var subjectNatureName = this._comboBoxProjectSubjectNature.getRawValue();
        if (!String.isEmpty(subjectNatureName)) 
            params.subjectNature = this._comboBoxProjectSubjectNature.getValue();
        else 
            params.subjectNature = ''
        
        params.startDateStart = Date.format(this._dateFieldStartDateBegin.getValue());
        params.startDateEnd = Date.format(this._dateFieldStartDateEnd.getValue());
        params.endDateStart = Date.format(this._dateFieldEndDateBegin.getValue());
        params.endDateEnd = Date.format(this._dateFieldEndDateEnd.getValue());
        params.level = this._checkboxGroupLevel.getSelecetedValue();
        params.state = this._checkboxGroupState.getSelecetedValue();
        params.isSecret = this._checkboxIsSecret.checked ? this._checkboxIsSecret.getValue() : '';
        
        if (isHorizontal || isHorizontal == undefined) {
            params.taskFroms = this._textFieldTaskFroms.getValue();
            params.corporationPlace = '';
            if (this._panelCorporationPlace._comboBox_Province.getRawValue() != '') 
                params.corporationPlace = this._panelCorporationPlace._comboBox_Province.getRawValue() + ' ' + this._panelCorporationPlace._comboBox_City.getRawValue();
        }
    }
    this.clearParams = function(){
        this._textFieldNumber.reset();
        this._textFieldName.reset();
        this._textFieldPrincipal.reset();
        this._comboBoxCollege.reset();
        this._dateFieldStartDateBegin.reset();
        this._dateFieldStartDateEnd.reset();
        this._dateFieldEndDateBegin.reset();
        this._dateFieldEndDateEnd.reset();
        this._textFieldTaskFroms.reset();
        this._checkboxGroupLevel.reset();
        this._checkboxGroupState.reset();
        this._comboBoxProjectSubjectNature.reset();
        
        if (isHorizontal) {
            this._checkboxIsSecret.reset();
            this._panelCorporationPlace._comboBox_Province.reset();
            this._panelCorporationPlace._comboBox_City.reset();
        }
    }
}
Ext.extend(Srims.projects.ProjectQueryWindow_BasicPanel, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.projects.ProjectQueryWindow_TypePanel = function(isHorizonal, isPermission){

    this._isHorizonal = isHorizonal;
    
    var loader = new Ext.tree.TreeLoader({
        dataUrl: Srims.service.type.ProjectRankService + '/GetTypeString',
        baseParams: {
            isPermission: isPermission == false ? false : true
        },
        baseAttrs: {
            uiProvider: Ext.tree.TreeCheckNodeUI
        }
    });
    var root = new Ext.tree.AsyncTreeNode({
        id: isHorizonal == undefined ? ' ' : isHorizonal ? 'true' : 'false',
        text: '项目类型选择',
        leaf: false,
        loader: loader,
        expandable: true,
        expanded: true
    });
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        root: root,
        singleExpand: false,
        autoWidth: true,
        height: isHorizonal ? 523 : 496,
        autoScroll: true,
        checkModel: 'multiple',
        onlyLeafCheckable: false,
        animate: true
    });
    tree.on('checkchange', function(node, checked){
        node.attributes.checked = checked;
        //处理父节点
        var nodeparent = node.parentNode;
        while (nodeparent != null) {
            var isChecked = isHasChildNodeChecked(nodeparent)
            nodeparent.ui.toggleCheck(isChecked);
            nodeparent.attributes.checked = isChecked;
            nodeparent = nodeparent.parentNode;
        }
        //处理子节点
        setAllChildNodeCheckedToFlase(node, checked);
        //以后学习参考，勿删
        //node.eachChild(function(child){
        //  child.ui.toggleCheck(false);
        // child.attributes.checked = false;
        // child.fireEvent('checkchange', child, false);
        //});
    
    }, tree);
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
    function isHasChildNodeChecked(node){
        var childNodes = node.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].attributes.checked) 
                return true;
        }
        
        return false;
    }
    
    Srims.projects.ProjectQueryWindow_TypePanel.superclass.constructor.call(this, {
        title: '类型信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoScroll: true,
        width: 300,
        items: tree
    });
    
    this.buildParams = function(params){
        params.rankName = '';
        params.typeName = '';
        params.supportCategoryName = '';
        params.supportFieldName = '';
        params.supportSubFieldName = '';
        
        var rankNodes = root.childNodes;
        if (rankNodes == null) 
            return;
        for (var i = 0; i < rankNodes.length; i++) {
            if (rankNodes[i].attributes.checked) {
                params.rankName += rankNodes[i].text + ',';
                var typeNodes = rankNodes[i].childNodes;
                if (typeNodes == null) 
                    continue;
                for (var j = 0; j < typeNodes.length; j++) {
                    if (typeNodes[j].attributes.checked) {
                        params.typeName += typeNodes[j].text + ',';
                        
                        var supportCategoryNodes = null;
                        var supportFieldNodes = null;
                        if (typeNodes[j].firstChild != null) 
                            supportCategoryNodes = typeNodes[j].firstChild.childNodes;
                        if (typeNodes[j].lastChild != null) 
                            supportFieldNodes = typeNodes[j].lastChild.childNodes;
                        if (supportCategoryNodes == null && supportFieldNodes == null) 
                            continue;
                        if (supportCategoryNodes != null) 
                            for (var k = 0; k < supportCategoryNodes.length; k++) {
                                if (supportCategoryNodes[k].attributes.checked) {
                                    params.supportCategoryName += supportCategoryNodes[k].text + ',';
                                }
                            }
                        if (supportFieldNodes != null) 
                            for (var m = 0; m < supportFieldNodes.length; m++) {
                                if (supportFieldNodes[m].attributes.checked) {
                                    params.supportFieldName += supportFieldNodes[m].text + ',';
                                    var supportSubFieldNodes = supportFieldNodes[m].childNodes;
                                    if (supportSubFieldNodes == null) 
                                        continue;
                                    for (var n = 0; n < supportSubFieldNodes.length; n++) {
                                        if (supportSubFieldNodes[n].attributes.checked) {
                                            params.supportSubFieldName += supportSubFieldNodes[n].text + ',';
                                        }
                                    }
                                }
                            }
                    }
                }
            }
        }
    }
    this.clearParams = function(){
        setAllChildNodeCheckedToFlase(root, false);
        
    }
}
Ext.extend(Srims.projects.ProjectQueryWindow_TypePanel, Ext.FormPanel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectQueryWindow_FundPanel = function(){

    this._textFieldFundFroms = new Ext.form.TextField({
        fieldLabel: '资金来源',
        width: 280
    });
    this._numberFieldFundTotalBegin = new Srims.component.MoneyField({
        fieldLabel: '到校经费(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundTotalEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractBegin = new Srims.component.MoneyField({
        fieldLabel: '合同额(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundReceiedBegin = new Srims.component.MoneyField({
        fieldLabel: '已到经费(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundReceivedEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._checkboxIsBorrowMoney = new Ext.form.Checkbox({
        fieldLabel: '借款'
    });
    this._checkboxIsNotReturnAll = new Ext.form.Checkbox({
        fieldLabel: '未还清借款'
    });
    Srims.projects.ProjectQueryWindow_FundPanel.superclass.constructor.call(this, {
        title: '经费信息',
        frame: true,
        layout: 'form',
        labelWidth: 100,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 100,
                items: [this._numberFieldFundTotalBegin, this._numberFieldFundContractBegin, this._numberFieldFundReceiedBegin, this._checkboxIsNotReturnAll]
            }), new Ext.Panel({
                labelWidth: 30,
                layout: 'form',
                items: [this._numberFieldFundTotalEnd, this._numberFieldFundContractEnd, this._numberFieldFundReceivedEnd, this._checkboxIsBorrowMoney]
            })]
        }), this._textFieldFundFroms]
    });
    
    this.buildParams = function(params){
        params.fundFroms = this._textFieldFundFroms.getValue();
        params.fundTotalStart = this._numberFieldFundTotalBegin.getMoney();
        params.fundTotalEnd = this._numberFieldFundTotalEnd.getMoney();
        params.fundContractStart = this._numberFieldFundContractBegin.getMoney();
        params.fundContractEnd = this._numberFieldFundContractEnd.getMoney();
        params.fundReceivedStart = this._numberFieldFundReceiedBegin.getMoney();
        params.fundReceivedEnd = this._numberFieldFundReceivedEnd.getMoney();
        params.isBorrowMoney = this._checkboxIsBorrowMoney.checked ? this._checkboxIsBorrowMoney.getValue() : '';
        params.isNotReturnAll = this._checkboxIsNotReturnAll.checked ? this._checkboxIsNotReturnAll.getValue() : '';
    }
    this.clearParams = function(){
        this._textFieldFundFroms.reset();
        this._numberFieldFundTotalBegin.reset();
        this._numberFieldFundTotalEnd.reset();
        this._numberFieldFundContractBegin.reset();
        this._numberFieldFundContractEnd.reset();
    }
}
Ext.extend(Srims.projects.ProjectQueryWindow_FundPanel, Ext.FormPanel);


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

Srims.papers.MagazineQueryWindow_InforPanel = function(isMagazineQuery){

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '杂志名称',
        width: 150
    });
    this._textFieldISSN = new Ext.form.TextField({
        fieldLabel: 'ISSN',
        width: 150
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLengthText: 4,
        maxLengthText: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
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
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldCiteFrequencyEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirerBegin = new Ext.form.NumberField({
        fieldLabel: '分区',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._numberFieldSubAirerEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowDecimals: false,
        allowNegative: false,
        maxLength: 6,
        width: 150
    });
    this._textFieldSubjectClass = new Srims.component.NoticeTextSearch.SearchComboBox({
        fieldLabel: '学科分类',
        noticeTextType: "SubjectClass",
        width: 168
    });
    this._checkboxGroupLanguages = new Srims.component.CheckBoxGroup({
        fieldLabel: '语种',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.languageStore)
    });
    this._checkboxGroupSubjectRanks = new Srims.component.CheckBoxGroup({
        fieldLabel: '期刊等级',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.checkboxGroupItems
    });
    
    var columnFirstItems = [this._textFieldName, this._textFieldSubjectClass];
    var columnSecondItems = [this._textFieldISSN];
    var columnItems = [this._checkboxGroupLanguages];
    if (isMagazineQuery) {
        columnFirstItems[columnFirstItems.length] = this._numberFieldInfluenceFactorBegin;
        columnFirstItems[columnFirstItems.length] = this._numberFieldCiteFrequencyBegin;
        columnFirstItems[columnFirstItems.length] = this._numberFieldSubAirerBegin;
        
        columnSecondItems[columnSecondItems.length] = this._numberFieldYear;
        columnSecondItems[columnSecondItems.length] = this._numberFieldInfluenceFactorEnd;
        columnSecondItems[columnSecondItems.length] = this._numberFieldCiteFrequencyEnd;
        columnSecondItems[columnSecondItems.length] = this._numberFieldSubAirerEnd;
        
        columnItems[columnItems.length] = this._checkboxGroupSubjectRanks;
    }
    
    Srims.papers.MagazineQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '杂志信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnSecondItems
            })]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: columnItems
        })]
    });
    
    this.buildParams = function(params){
        params.fullName = this._textFieldName.getValue();
        params.iSSN = this._textFieldISSN.getValue();
        params.language = this._checkboxGroupLanguages.getSelecetedValue();
        params.subjectClass = this._textFieldSubjectClass.getValue();
        
        if (isMagazineQuery) {
            params.subjectRank = this._checkboxGroupSubjectRanks.getSelecetedValue();
            params.citeFrequencyStart = this._numberFieldCiteFrequencyBegin.getValue();
            params.citeFrequencyEnd = this._numberFieldCiteFrequencyEnd.getValue();
            params.influenceFactorStart = this._numberFieldInfluenceFactorBegin.getValue();
            params.influenceFactorEnd = this._numberFieldInfluenceFactorEnd.getValue();
            params.subAirerStart = this._numberFieldSubAirerBegin.getValue();
            params.subAirerEnd = this._numberFieldSubAirerEnd.getValue();
            params.year = this._numberFieldYear.getValue();
        }
    }
    
    this.clearParams = function(){
        this._textFieldName.reset();
        this._textFieldISSN.reset();
        this._checkboxGroupLanguages.reset();
        this._textFieldSubjectClass.reset();
        if (isMagazineQuery) {
            this._checkboxGroupSubjectRanks.reset();
            this._numberFieldCiteFrequencyBegin.reset();
            this._numberFieldCiteFrequencyEnd.reset();
            this._numberFieldInfluenceFactorBegin.reset();
            this._numberFieldInfluenceFactorEnd.reset();
            this._numberFieldYear.reset();
        }
    }
}
Ext.extend(Srims.papers.MagazineQueryWindow_InforPanel, Ext.FormPanel);

Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore = new Srims.data.IDValueRecordStore(Srims.service.papers.MagazineService + '/GetSubjectRank');
Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.load({
    callback: Srims.papers.MagazineQueryWindow_InforPanel.SubjectRankStore.buildCheckboxGroupItems
});


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








if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.Store = function(record){
    Srims.statistic.Store.superclass.constructor.call(this, {
        autoLoad: false,
        remoteSort: false,
        reader: new Ext.data.XmlReader({
            record: "Row"
        }, record)
    });
}
Ext.extend(Srims.statistic.Store, Ext.data.Store);

if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.DateTimeForm = function(title, paramName){

    this._title = title;
    this._paramName = paramName;
    
    this._dateTimeBegin = new Ext.form.DateField({
        fieldLabel: '时间',
        width: 150
    });
    this._dateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    
    Srims.statistic.DateTimeForm.superclass.constructor.call(this, {
        title: this._title,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: this._dateTimeBegin
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: this._dateTimeEnd
            })]
        })]
    });
    
    this.buildParams = function(params){
        params[this._paramName + 'Start'] = Date.format(this._dateTimeBegin.getValue());
        params[this._paramName + 'End'] = Date.format(this._dateTimeEnd.getValue());
    }
    this.clearParams = function(){
        this._dateTimeBegin.reset();
        this._dateTimeEnd.reset();
    }
}

Ext.extend(Srims.statistic.DateTimeForm, Ext.form.FormPanel);

if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.FundDescendDateTimeForm = function(){

    this._financeDateTimeBegin = new Ext.form.DateField({
        fieldLabel: '到账时间',
        width: 150
    });
    this._financeDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._descendDateTimeBegin = new Ext.form.DateField({
        fieldLabel: '下拨时间',
        width: 150
    });
    this._descendDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    
    Srims.statistic.DateTimeForm.superclass.constructor.call(this, {
        title: '时间范围',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: [this._financeDateTimeBegin, this._descendDateTimeBegin]
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: [this._financeDateTimeEnd, this._descendDateTimeEnd]
            })]
        })]
    });
    
    this.buildParams = function(params){
        params['FinanceDateTimeStart'] = Date.format(this._financeDateTimeBegin.getValue());
        params['FinanceDateTimeEnd'] = Date.format(this._financeDateTimeEnd.getValue());
        params['DescendDateTimeStart'] = Date.format(this._descendDateTimeBegin.getValue());
        params['DescendDateTimeEnd'] = Date.format(this._descendDateTimeEnd.getValue());
    }
    this.clearParams = function(){
        this._financeDateTimeBegin.reset();
        this._financeDateTimeEnd.reset();
        this._descendDateTimeBegin.reset();
        this._descendDateTimeEnd.reset();
    }
}

Ext.extend(Srims.statistic.FundDescendDateTimeForm, Ext.form.FormPanel);

if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.DimensionSelectForm = function(dimensions){

    this._dimensions = dimensions;
    
    this._comboBoxColumnDimension = new Ext.form.ComboBox({
        fieldLabel: '统计列',
        store: new Ext.data.SimpleStore({
            fields: new Array('name', 'value'),
            data: this._dimensions
        }),
        valueField: 'value',
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        mode: 'local',
        listWidth: 150,
        width: 150
    });
    this._comboBoxColumnDimensionSize = new Ext.form.ComboBox({
        fieldLabel: '列单位',
        store: new Ext.data.SimpleStore({
            fields: new Array('name', 'value'),
            data: new Array()
        }),
        displayField: 'name',
        valueField: 'value',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        mode: 'local',
        listWidth: 150,
        width: 150
    });
    this._comboBoxRowDimension = new Ext.form.ComboBox({
        fieldLabel: '统计行',
        store: new Ext.data.SimpleStore({
            fields: new Array('name', 'value'),
            data: this._dimensions
        }),
        valueField: 'value',
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        mode: 'local',
        listWidth: 150,
        width: 150
    });
    this._comboBoxRowDimensionSize = new Ext.form.ComboBox({
        fieldLabel: '行单位',
        store: new Ext.data.SimpleStore({
            fields: new Array('name', 'value'),
            data: new Array()
        }),
        displayField: 'name',
        valueField: 'value',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        mode: 'local',
        listWidth: 150,
        width: 150
    });
    
    var columnOneItems = [this._comboBoxColumnDimension, this._comboBoxRowDimension]
    var columnTwoItems = [this._comboBoxColumnDimensionSize, this._comboBoxRowDimensionSize]
    
    Srims.statistic.DimensionSelectForm.superclass.constructor.call(this, {
        title: '统计维度',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnTwoItems
            })]
        })]
    });
    
    this.clearParams = function(){
        this._comboBoxColumnDimension.reset();
        this._comboBoxColumnDimensionSize.reset();
        this._comboBoxRowDimension.reset();
        this._comboBoxRowDimensionSize.reset();
    }
    this.buildParams = function(params){
        params.columnDimension = this._comboBoxColumnDimension.getValue();
        params.columnDimensionSize = this._comboBoxColumnDimensionSize.getValue();
        params.rowDimension = this._comboBoxRowDimension.getValue();
        params.rowDimensionSize = this._comboBoxRowDimensionSize.getValue();
    }
    this.isValid = function(){
        var result = true;
        
        result = this._comboBoxColumnDimension.isValid(false) && result;
        result = this._comboBoxColumnDimensionSize.isValid(false) && result;
        result = this._comboBoxRowDimension.isValid(false) && result;
        result = this._comboBoxRowDimensionSize.isValid(false) && result;
        
        return result;
    }
    this._comboBoxColumnDimension.dimensions = this._dimensions;
    this._comboBoxColumnDimension.comboBoxSize = this._comboBoxColumnDimensionSize;
    
    this._comboBoxRowDimension.dimensions = this._dimensions;
    this._comboBoxRowDimension.comboBoxSize = this._comboBoxRowDimensionSize;
    
    this._onComboBoxDimension_Select = function(comboBox){
        var dimensions = comboBox.dimensions;
        var deminsion = comboBox.getValue();
        
        var deminsionIndex = 0;
        for (var i = 0; i < dimensions.length; i++) 
            if (dimensions[i][1] == deminsion) 
                deminsionIndex = i;
        
        var sizes = dimensions.sizes[deminsionIndex];
        var comboBoxSize = comboBox.comboBoxSize;
        var sizeStore = comboBoxSize.store;
        
        sizeStore.loadData(sizes);
        
        if (sizeStore.getCount() == 1) {
            comboBoxSize.setValue(sizes[0][1]);
        }
        else {
            comboBoxSize.setValue(undefined);
        }
    };
    
    this._comboBoxColumnDimension.on('select', this._onComboBoxDimension_Select)
    this._comboBoxRowDimension.on('select', this._onComboBoxDimension_Select)
}

Ext.extend(Srims.statistic.DimensionSelectForm, Ext.form.FormPanel);

if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.ProjectStatisticWindow = function(id, iconCls, title, url, dimension, renderer, additionalPanel, viewType){

    this._title = title;
    this._url = url;
    this._iconCls = iconCls;
    this._renderer = renderer;
    this._additionalPanel = additionalPanel;
    
    this._dimensionPanel = new Srims.statistic.DimensionSelectForm(dimension);
    this._basicPanel = new Srims.projects.ProjectQueryWindow_BasicPanel();
    this._typePanel = new Srims.projects.ProjectQueryWindow_TypePanel(undefined, false);
    this._fundPanel = new Srims.projects.ProjectQueryWindow_FundPanel();
    this._memberPanel = new Srims.component.QueryWindow_MemberPanel('项目成员信息');
    
    this._buttonStatistic = new Ext.Button({
        minWidth: 80,
        text: '统 计',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.showResult(this._title, this._iconCls, response, this._renderer);
                }
            });
        }
    });
    this._buttonExport = new Ext.Button({
        minWidth: 80,
        text: '导 出',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.exportToExcel(this._title, response, this._renderer);
                }
            });
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            var params = window.getParams();
            Srims.common.newView(viewType, Srims.SetQueryParams.toJSON(params));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            Srims.common.showViewWindow(viewType);
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
    
    var items = [this._dimensionPanel, this._basicPanel, this._fundPanel, this._memberPanel];
    if (this._additionalPanel) 
        items = [this._dimensionPanel, this._additionalPanel, this._basicPanel, this._fundPanel, this._memberPanel];
    
    Srims.statistic.ProjectStatisticWindow.superclass.constructor.call(this, {
        id: id,
        title: title,
        iconCls: iconCls,
        width: 836,
        height: 560,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        stateful: false,
        resizable: false,
        items: [new Ext.Panel({
            width: 510,
            layout: 'form',
            autoScroll: true,
            height: 482,
            labelWidth: 100,
            items: items
        }), new Ext.Panel({
            layout: 'form',
            autoScroll: true,
            labelWidth: 100,
            items: [this._typePanel]
        })],
        buttons: [this._buttonStatistic, this._buttonExport, this._buttonSaveAsView, this._buttonShowView, this._buttonReset, this._buttonClose]
    });
    this.isValid = function(){
        var result = true;
        
        result = this._dimensionPanel.isValid() && result;
        
        if (this._additionalPanel && this._additionalPanel.isValid) 
            result = this._additionalPanel.isValid() && result;
        
        return result;
    }
    this.getParams = function(){
        var params = {};
        
        this._dimensionPanel.buildParams(params);
        this._basicPanel.buildParams(params);
        this._fundPanel.buildParams(params);
        this._memberPanel.buildParams(params);
        this._typePanel.buildParams(params);
        
        if (this._additionalPanel) 
            this._additionalPanel.buildParams(params);
        
        params.isStatistic = true;
        return params;
    }
    this.clearParams = function(){
        this._dimensionPanel.clearParams();
        this._basicPanel.clearParams();
        this._fundPanel.clearParams();
        this._memberPanel.clearParams();
        this._typePanel.clearParams();
        
        if (this._additionalPanel) 
            this._additionalPanel.clearParams();
    }
}
Ext.extend(Srims.statistic.ProjectStatisticWindow, Ext.Window);


if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.FundTotalWindow = function(id){
    var iconCls = 'icon-statistic-fund-total';
    var title = '总经费统计';
    var url = Srims.service.statistic.StatisticsService + '/FundTotal';
    var dimension = Srims.statistic.FundTotalWindow.dimension;
    var renderer = 'Money.render'
    Srims.statistic.FundTotalWindow.superclass.constructor.call(this, id, iconCls, title, url, dimension, renderer, undefined, Srims.common.ViewType.ProjectFundTotalStatic);
}
Ext.extend(Srims.statistic.FundTotalWindow, Srims.statistic.ProjectStatisticWindow);

Srims.statistic.FundTotalWindow.dimension = new Array(['开始时间', 'StartDate'], ['负责人', 'Principal'], ['项目类型', 'ProjectType'], ['项目状态', 'ProjectState']);
Srims.statistic.FundTotalWindow.dimension.sizes = new Array();
Srims.statistic.FundTotalWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.FundTotalWindow.dimension.sizes[1] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.FundTotalWindow.dimension.sizes[2] = new Array(['等级', 'Rank'], ['类型', 'Type']);
Srims.statistic.FundTotalWindow.dimension.sizes[3] = new Array(['状态', 'State']);



if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.FundDescendWindow = function(id){
    var iconCls = 'icon-statistic-fund-descend';
    var title = '经费到账统计';
    var url = Srims.service.statistic.StatisticsService + '/FundDescend';
    var dimension = Srims.statistic.FundDescendWindow.dimension;
    var renderer = 'Money.render'
    var additonalPanel = new Srims.statistic.FundDescendDateTimeForm();
    
    Srims.statistic.FundDescendWindow.superclass.constructor.call(this, id, iconCls, title, url, dimension, renderer, additonalPanel, Srims.common.ViewType.FundDescendStatic);
}
Ext.extend(Srims.statistic.FundDescendWindow, Srims.statistic.ProjectStatisticWindow);

Srims.statistic.FundDescendWindow.dimension = new Array(['到账时间', 'FinanceDateTime'], ['下拨时间', 'DescendDateTime'], ['负责人', 'Principal'], ['项目类型', 'ProjectType'], ['项目开始时间', 'StartDate']);
Srims.statistic.FundDescendWindow.dimension.sizes = new Array();
Srims.statistic.FundDescendWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.FundDescendWindow.dimension.sizes[1] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.FundDescendWindow.dimension.sizes[2] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.FundDescendWindow.dimension.sizes[3] = new Array(['等级', 'Rank'], ['类型', 'Type']);
Srims.statistic.FundDescendWindow.dimension.sizes[4] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);

if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.VoucherWindow = function(id){
    var iconCls = 'icon-statistic-voucher';
    var title = '经费分配（凭单）统计';
    var url = Srims.service.statistic.StatisticsService + '/Voucher';
    var dimension = Srims.statistic.VoucherWindow.dimension;
    var renderer = 'Money.render'
    var additonalPanel = new Srims.statistic.VoucherInformationForm();
    
    Srims.statistic.VoucherWindow.superclass.constructor.call(this, id, iconCls, title, url, dimension, renderer, additonalPanel, Srims.common.ViewType.FundAllocationStatic);
}
Ext.extend(Srims.statistic.VoucherWindow, Srims.statistic.ProjectStatisticWindow);

Srims.statistic.VoucherWindow.dimension = new Array(['分配（审核通过）时间', 'DateTime'], ['专家', 'Expert'], ['项目类型', 'ProjectType'], ['项目开始时间', 'StartDate'], ['经费到帐时间', 'FinanceDateTime']);
Srims.statistic.VoucherWindow.dimension.sizes = new Array();
Srims.statistic.VoucherWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.VoucherWindow.dimension.sizes[1] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.VoucherWindow.dimension.sizes[2] = new Array(['等级', 'Rank'], ['类型', 'Type']);
Srims.statistic.VoucherWindow.dimension.sizes[3] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.VoucherWindow.dimension.sizes[4] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);



if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.ProjectCountStatisticWindow = function(id){
    var iconCls = 'icon-statistic-project-count';
    var title = '项目数目统计';
    var url = Srims.service.statistic.StatisticsService + '/ProjectCount';
    var dimension = Srims.statistic.ProjectCountStatisticWindow.dimension;
    Srims.statistic.ProjectCountStatisticWindow.superclass.constructor.call(this, id, iconCls, title, url, dimension, undefined, undefined, Srims.common.ViewType.ProjectCountStatic);
}
Ext.extend(Srims.statistic.ProjectCountStatisticWindow, Srims.statistic.ProjectStatisticWindow);

Srims.statistic.ProjectCountStatisticWindow.dimension = new Array(['开始时间', 'StartDate'], ['负责人', 'Principal'], ['项目类型', 'ProjectType'], ['项目状态', 'ProjectState']);
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes = new Array();
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes[1] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes[2] = new Array(['等级', 'Rank'], ['类型', 'Type']);
Srims.statistic.ProjectCountStatisticWindow.dimension.sizes[3] = new Array(['状态', 'State']);



if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.PaperStatisticWindow = function(id){

    this._id = id;
    this._title = '论文统计';
    this._url = Srims.service.statistic.StatisticsService + '/Paper';
    this._iconCls = iconCls = 'icon-statistic-paper';
    
    this._dimensionPanel = new Srims.statistic.DimensionSelectForm(Srims.statistic.PaperStatisticWindow.dimension);
    this._basicPanel = new Srims.papers.PaperQueryWindow_BasicPanel();
    this._otherPanel = new Srims.papers.PaperQueryWindow_OtherPanel();
    this._magazinePanel = new Srims.papers.PaperQueryWindow_MagazinePanel();
    this._expertPanel = new Srims.papers.PaperQueryWindow_ExpertPanel();
    
    this._buttonStatistic = new Ext.Button({
        minWidth: 80,
        text: '统 计',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.showResult(this._title, this._iconCls, response, this._renderer);
                }
            });
        }
    });
    this._buttonExport = new Ext.Button({
        minWidth: 80,
        text: '导 出',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.exportToExcel(this._title, response, this._renderer);
                }
            });
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            var params = window.getParams();
            Srims.common.newView(Srims.common.ViewType.PaperStatic, Srims.SetQueryParams.toJSON(params));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            Srims.common.showViewWindow(Srims.common.ViewType.PaperStatic);
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
    
    Srims.statistic.PaperStatisticWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: this._iconCls,
        width: 728,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        height: 550,
        closeAction: 'hide',
        layout: 'column',
        stateful: false,
        resizable: false,
        items: [new Ext.Panel({
            width: 700,
            layout: 'form',
            labelWidth: 100,
            autoHeight: false,
            height: 480,
            deferredRender: false,
            autoScroll: true,
            items: [this._dimensionPanel, this._basicPanel, this._otherPanel, this._magazinePanel, this._expertPanel]
        })],
        buttons: [this._buttonStatistic, this._buttonExport, this._buttonSaveAsView, this._buttonShowView, this._buttonReset, this._buttonClose]
    });
    
    this.isValid = function(){
        var result = true;
        result = this._dimensionPanel.isValid() && result;
        return result;
    }
    this.getParams = function(){
        var params = {};
        
        this._dimensionPanel.buildParams(params);
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._magazinePanel.buildParams(params);
        this._expertPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._dimensionPanel.clearParams();
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._magazinePanel.clearParams();
        this._expertPanel.clearParams();
    }
}
Ext.extend(Srims.statistic.PaperStatisticWindow, Ext.Window);

Srims.statistic.PaperStatisticWindow.dimension = new Array(['发表年份', 'PublishDateYear'], ['SCI&EI收录', 'Indexed'], ['所属学院', 'College'], ['通讯作者', 'LinkMan'], ['第一作者', 'FirstAuthor'], ['类型', 'Type'], ['分区', 'SubAirer']);
Srims.statistic.PaperStatisticWindow.dimension.sizes = new Array();
Srims.statistic.PaperStatisticWindow.dimension.sizes[0] = new Array(['年', 'Year']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[1] = new Array(['SCI&EI收录', 'Indexed']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[2] = new Array(['所属学院', 'College']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[3] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[4] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[5] = new Array(['类型', 'Type']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[6] = new Array(['分区', 'SubAirer']);

if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.PatentStatisticWindow = function(id){

    this._id = id;
    this._title = '专利统计';
    this._url = Srims.service.statistic.StatisticsService + '/Patent';
    this._iconCls = iconCls = 'icon-statistic-patent';
    
    this._dimensionPanel = new Srims.statistic.DimensionSelectForm(Srims.statistic.PatentStatisticWindow.dimension);
    this._basicPanel = new Srims.patents.PatentQueryWindow_BasicPanel();
    this._otherPanel = new Srims.patents.PatentQueryWindow_OtherPanel();
    this._expertPanel = new Srims.patents.PatentQueryWindow_ExpertPanel();
    
    this._buttonStatistic = new Ext.Button({
        minWidth: 80,
        text: '统 计',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.showResult(this._title, this._iconCls, response, this._renderer);
                }
            });
        }
    });
    this._buttonExport = new Ext.Button({
        minWidth: 80,
        text: '导 出',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.exportToExcel(this._title, response, this._renderer);
                }
            });
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            var params = window.getParams();
            Srims.common.newView(Srims.common.ViewType.PatentStatic, Srims.SetQueryParams.toJSON(params));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            Srims.common.showViewWindow(Srims.common.ViewType.PatentStatic);
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
    
    Srims.statistic.PatentStatisticWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: this._iconCls,
        width: 725,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        height: 560,
        closeAction: 'hide',
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
            items: [this._dimensionPanel, this._basicPanel, this._otherPanel, this._expertPanel]
        })],
        buttons: [this._buttonStatistic, this._buttonExport, this._buttonSaveAsView, this._buttonShowView, this._buttonReset, this._buttonClose]
    });
    
    this.isValid = function(){
        var result = true;
        
        result = this._dimensionPanel.isValid() && result;
        
        return result;
    }
    this.getParams = function(){
        var params = {};
        
        this._dimensionPanel.buildParams(params);
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._expertPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._dimensionPanel.clearParams();
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._expertPanel.clearParams();
    }
}
Ext.extend(Srims.statistic.PatentStatisticWindow, Ext.Window);

Srims.statistic.PatentStatisticWindow.dimension = new Array(['申请时间', 'ApplicationDateTime'], ['授权时间', 'AuthorizeDateTime'], ['法律状态', 'LawState'], ['法律状态时间', 'LawStateTime'], ['分类', 'Category'], ['类别', 'Type'], ['等级', 'Level'], ['所属学院', 'College'], ['发明人', 'Principal']);
Srims.statistic.PatentStatisticWindow.dimension.sizes = new Array();
Srims.statistic.PatentStatisticWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[1] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[2] = new Array(['法律状态', 'LawState']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[3] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[4] = new Array(['分类', 'Category']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[5] = new Array(['类别', 'Type']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[6] = new Array(['等级', 'Level']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[7] = new Array(['所属学院', 'College']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[8] = new Array(['专家', 'Expert'], ['学院', 'College']);

if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.AwardStatisticWindow = function(id){

    this._id = id;
    this._title = '奖励统计';
    this._url = Srims.service.statistic.StatisticsService + '/Award';
    this._iconCls = iconCls = 'icon-statistic-award';
    
    this._dimensionPanel = new Srims.statistic.DimensionSelectForm(Srims.statistic.AwardStatisticWindow.dimension);
    this._basicPanel = new Srims.awards.AwardQueryWindow_BasicPanel();
    this._otherPanel = new Srims.awards.AwardQueryWindow_OtherPanel();
    this._winnerPanel = new Srims.awards.AwardQueryWindow_ExpertPanel();
    
    this._buttonStatistic = new Ext.Button({
        minWidth: 80,
        text: '统 计',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.showResult(this._title, this._iconCls, response, this._renderer);
                }
            });
        }
    });
    this._buttonExport = new Ext.Button({
        minWidth: 80,
        text: '导 出',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.exportToExcel(this._title, response, this._renderer);
                }
            });
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            var params = window.getParams();
            Srims.common.newView(Srims.common.ViewType.AwardStatic, Srims.SetQueryParams.toJSON(params));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            Srims.common.showViewWindow(Srims.common.ViewType.AwardStatic);
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
    
    Srims.statistic.AwardStatisticWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: this._iconCls,
        width: 725,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        height: 500,
        closeAction: 'hide',
        stateful: false,
        autoScroll: true,
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            layout: 'form',
            labelWidth: 100,
            deferredRender: false,
            items: [this._dimensionPanel, this._basicPanel, this._otherPanel, this._winnerPanel]
        })],
        buttons: [this._buttonStatistic, this._buttonExport, this._buttonSaveAsView, this._buttonShowView, this._buttonReset, this._buttonClose]
    });
    
    this.isValid = function(){
        var result = true;
        
        result = this._dimensionPanel.isValid() && result;
        result = this._basicPanel.isValid(false) && result;
        
        return result;
    }
    this.getParams = function(){
        var params = {};
        
        this._dimensionPanel.buildParams(params);
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._winnerPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._dimensionPanel.clearParams();
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._winnerPanel.clearParams();
    }
}
Ext.extend(Srims.statistic.AwardStatisticWindow, Ext.Window);

Srims.statistic.AwardStatisticWindow.dimension = new Array(['获奖年份', 'Year'], ['级别', 'RankClass'], ['参与类型', 'AttendType'], ['授奖单位', 'AuthorisedUnit'], ['奖种', 'Classification'], ['获奖人', 'Winner']);
Srims.statistic.AwardStatisticWindow.dimension.sizes = new Array();
Srims.statistic.AwardStatisticWindow.dimension.sizes[0] = new Array(['年', 'Year']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[1] = new Array(['等级', 'Rank'], ['类别', 'Class'], ['类别与奖种', 'Classification']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[2] = new Array(['参与类型', 'AttendType']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[3] = new Array(['授奖单位', 'AuthorisedUnit']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[4] = new Array(['奖种', 'Classification']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[5] = new Array(['专家', 'Expert'], ['学院', 'College']);

if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.VoucherInformationForm = function(){

    this._dateTimeBegin = new Ext.form.DateField({
        fieldLabel: '分配时间',
        width: 150
    });
    this._dateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '经费成员所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    Srims.statistic.VoucherInformationForm.superclass.constructor.call(this, {
        title: '凭单信息',
        frame: true,
        layout: 'form',
        labelWidth: 80,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 280,
                layout: 'form',
                labelWidth: 60,
                items: [this._dateTimeBegin, this._comboBoxCollege]
            }), new Ext.Panel({
                labelWidth: 30,
                layout: 'form',
                items: [this._dateTimeEnd]
            })]
        })]
    });
    
    this.buildParams = function(params){
        params['fundAllocationCensorPassDateTimeStart'] = Date.format(this._dateTimeBegin.getValue());
        params['fundAllocationCensorPassDateTimeEnd'] = Date.format(this._dateTimeEnd.getValue());
        params['fundMemberCollegeName'] = this._comboBoxCollege.getText();
    }
    this.clearParams = function(){
        this._dateTimeBegin.reset();
        this._dateTimeEnd.reset();
        this._comboBoxCollege.reset();
    }
}

Ext.extend(Srims.statistic.VoucherInformationForm, Ext.form.FormPanel);
