
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.Expert = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'userID',
    type: 'int',
    mapping: 'UserID'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'sex',
    type: 'string',
    mapping: 'Sex'
}, {
    name: 'birthday',
    type: 'date',
    mapping: 'Birthday'
}, {
    name: 'nation',
    type: 'string',
    mapping: 'Nation'
}, {
    name: 'policy',
    type: 'string',
    mapping: 'Policy'
}, {
    name: 'majorCodeID',
    type: 'int',
    mapping: 'MajorCodeID'
}, {
    name: 'majorCode',
    type: 'string',
    mapping: 'MajorCode'
}, {
    name: 'idCardNumber',
    type: 'string',
    mapping: 'IDCardNumber'
}, {
    name: 'comeDate',
    type: 'date',
    mapping: 'ComeDate'
}, {
    name: 'fileNumber',
    type: 'string',
    mapping: 'FileNumber'
}, {
    name: 'academyDegree',
    type: 'string',
    mapping: 'AcademyDegree'
}, {
    name: 'post',
    type: 'string',
    mapping: 'PostNew'
}, {
    name: 'postLevel',
    type: 'int',
    mapping: 'PostLevel'
}, {
    name: 'occupation',
    type: 'string',
    mapping: 'Occupation'
}, {
    name: 'vocationLevel',
    type: 'int',
    mapping: 'VocationLevel'
}, {
    name: 'isDoctorDirector',
    type: 'boolean',
    mapping: 'IsDoctorDirector',
    convert: Boolean.toNullEnableBoolean
}, {
    name: 'isAcademician',
    type: 'boolean',
    mapping: 'IsAcademician',
    convert: Boolean.toNullEnableBoolean
}, {
    name: 'isOnjob',
    type: 'boolean',
    mapping: 'IsOnjob',
    convert: Boolean.toNullEnableBoolean
}, {
    name: 'isChinese',
    type: 'boolean',
    mapping: 'IsChinese',
    convert: Boolean.toNullEnableBoolean
}, {
    name: 'mobilePhone',
    type: 'string',
    mapping: 'MobilePhone'
}, {
    name: 'officePhone',
    type: 'string',
    mapping: 'OfficePhone'
}, {
    name: 'homePhone',
    type: 'string',
    mapping: 'HomePhone'
}, {
    name: 'fax',
    type: 'string',
    mapping: 'Fax'
}, {
    name: 'address',
    type: 'string',
    mapping: 'Address'
}, {
    name: 'zip',
    type: 'string',
    mapping: 'Zip'
}, {
    name: 'email',
    type: 'string',
    mapping: 'Email'
}, {
    name: 'collegeID',
    type: 'int',
    mapping: 'CollegeID'
}, {
    name: 'college',
    type: 'string',
    mapping: 'College'
    }, {
    name: 'college2ID',
    type: 'int',
    mapping: 'College2ID'
}, {
    name: 'college2',
    type: 'string',
    mapping: 'College2'  
}, {
    name: 'departmentID',
    type: 'int',
    mapping: 'DepartmentID'
}, {
    name: 'department',
    type: 'string',
    mapping: 'Department'
}, {
    name: 'specialty',
    type: 'string',
    mapping: 'Specialty'
}, {
    name: 'photo',
    type: 'string',
    mapping: 'Photo'
}, {
    name: 'researchSubjectFirstLevel1ID',
    type: 'int',
    mapping: 'ResearchSubjectFirstLevel1ID'
}, {
    name: 'researchSubjectFirstLevel1Name',
    type: 'string',
    mapping: 'ResearchSubjectFirstLevel1Name'
}, {
    name: 'researchSubjectSecondLevel1ID',
    type: 'int',
    mapping: 'ResearchSubjectSecondLevel1ID'
}, {
    name: 'researchSubjectSecondLevel1Name',
    type: 'string',
    mapping: 'ResearchSubjectSecondLevel1Name'
}, {
    name: 'researchSubjectFirstLevel2ID',
    type: 'int',
    mapping: 'ResearchSubjectFirstLevel2ID'
}, {
    name: 'researchSubjectFirstLevel2Name',
    type: 'string',
    mapping: 'ResearchSubjectFirstLevel2Name'
}, {
    name: 'researchSubjectSecondLevel2ID',
    type: 'int',
    mapping: 'ResearchSubjectSecondLevel2ID'
}, {
    name: 'researchSubjectSecondLevel2Name',
    type: 'string',
    mapping: 'ResearchSubjectSecondLevel2Name'
}, {
    name: 'researchSubjectFirstLevel3ID',
    type: 'int',
    mapping: 'ResearchSubjectFirstLevel3ID'
}, {
    name: 'researchSubjectFirstLevel3Name',
    type: 'string',
    mapping: 'ResearchSubjectFirstLevel3Name'
}, {
    name: 'researchSubjectSecondLevel3ID',
    type: 'int',
    mapping: 'ResearchSubjectSecondLevel3ID'
}, {
    name: 'researchSubjectSecondLevel3Name',
    type: 'string',
    mapping: 'ResearchSubjectSecondLevel3Name'
}, {
    name: 'majorSubejctFirstLevelID',
    type: 'int',
    mapping: 'MajorSubejctFirstLevelID'
}, {
    name: 'majorSubejctFirstLevelName',
    type: 'string',
    mapping: 'MajorSubejctFirstLevelName'
}, {
    name: 'majorSubjectSecondLevelID',
    type: 'int',
    mapping: 'MajorSubjectSecondLevelID'
}, {
    name: 'majorSubjectSecondLevelName',
    type: 'string',
    mapping: 'MajorSubjectSecondLevelName'
}, {
    name: 'language1',
    type: 'string',
    mapping: 'Language1'
}, {
    name: 'languageLevel1',
    type: 'string',
    mapping: 'LanguageLevel1'
}, {
    name: 'language2',
    type: 'string',
    mapping: 'Language2'
}, {
    name: 'languageLevel2',
    type: 'string',
    mapping: 'LanguageLevel2'
}, {
    name: 'societyPost',
    type: 'string',
    mapping: 'SocietyPost'
}, {
    name: 'workExperience',
    type: 'string',
    mapping: 'WorkExperience'
}, {
    name: 'researchExperience',
    type: 'string',
    mapping: 'ResearchExperience'
}, {
    name: 'isAgreeLicence',
    type: 'boolean',
    mapping: 'IsAgreeLicence',
    convert: Boolean.toBoolean
}, {
    name: 'agreeLicenceDateTime',
    type: 'date',
    mapping: 'AgreeLicenceDateTime'
}, {
    name: 'agreeLicenceIP',
    type: 'string',
    mapping: 'AgreeLicenceIP'
}, {
    name: 'isDeleted',
    type: 'boolean',
    mapping: 'IsDeleted',
    convert: Boolean.toBoolean
}, {
    name: 'projectCount',
    type: 'int',
    mapping: 'ProjectCount'
}, {
    name: 'paperCount',
    type: 'int',
    mapping: 'PaperCount'
}, {
    name: 'patentCount',
    type: 'int',
    mapping: 'PatentCount'
}, {
    name: 'awardCount',
    type: 'int',
    mapping: 'AwardCount'
}, {
    name: 'hasPermission_ShowExpert',
    type: 'boolean',
    mapping: 'HasPermission_ShowExpert',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditExpert',
    type: 'boolean',
    mapping: 'HasPermission_EditExpert',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditExpertLinkWay',
    type: 'boolean',
    mapping: 'HasPermission_EditExpertLinkWay',
    convert: Boolean.toBoolean
}, {
    name: 'canShowExpert',
    type: 'boolean',
    mapping: 'CanShowExpert',
    convert: Boolean.toBoolean
}, {
    name: 'canEditExpert',
    type: 'boolean',
    mapping: 'CanEditExpert',
    convert: Boolean.toBoolean
}, {
    name: 'canEditExpertLinkWay',
    type: 'boolean',
    mapping: 'CanEditExpertLinkWay',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.Expert);


if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevel = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}]);
Srims.data.Entity.apply(Srims.common.SubjectFirstLevel);

Srims.common.SubjectFirstLevelStoreForApply = function(){
    Srims.common.SubjectFirstLevelStoreForApply.superclass.constructor.call(this, {
        url: Srims.service.common.SubjectService + '/GetSubjectFirstLevel',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            id: 'ID'
        }, Srims.common.SubjectFirstLevel)
    });
}
Ext.extend(Srims.common.SubjectFirstLevelStoreForApply, Ext.data.Store);

Srims.common.SubjectSecondLevel = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'childCode',
    type: 'string',
    mapping: 'ChildCode'
}, {
    name: 'subjectFirstLevelId',
    type: 'string',
    mapping: 'SubjectFirstLevelID'
}, {
    name: 'subjectFirstLevelName',
    type: 'string',
    mapping: 'SubjectFirstLevelName'
}]);
Srims.data.Entity.apply(Srims.common.SubjectSecondLevel);

Srims.common.SubjectSecondLevelStoreForApply = function(){
    Srims.common.SubjectSecondLevelStoreForApply.superclass.constructor.call(this, {
        url: Srims.service.common.SubjectService + '/GetSubjectSecondLevel',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            id: 'ID'
        }, Srims.common.SubjectSecondLevel),
        autoLoad: false
    });
}
Ext.extend(Srims.common.SubjectSecondLevelStoreForApply, Ext.data.Store);

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.NoticeTextComboBox = Ext.extend(Ext.form.ComboBox, {
    constructor: function(params){
        params.store = new Srims.common.NoticeTextStore(Srims.service.common.NoticeTextService + "/SearchNoticeText", params.noticeTextType);
        params.displayField = 'value';
        params.valueFiled = 'value';
        params.mode = 'remote';
        params.lazyInit = false;
        params.editable = false;
        params.triggerAction = 'all';
        params.forceSelection = true;
        Srims.component.NoticeTextComboBox.superclass.constructor.call(this, params);
    },
    getStore: function(){
        return this.store;
    }
})

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

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertStore.superclass.constructor.call(this, new Srims.experts.ExpertXmlReader(), load_url, params);
    }
});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertXmlReader.superclass.constructor.call(this, Srims.experts.Expert);
    },
    readRecords: function(responseXML){
        var result = Srims.experts.ExpertXmlReader.superclass.readRecords.call(this, responseXML);
        
        result.records.showProjectCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowProjectCount", responseXML));
        result.records.showPaperCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowPaperCount", responseXML));
        result.records.showPatentCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowPatentCount", responseXML));
        result.records.showAwardCount = Boolean.toBoolean(Ext.DomQuery.selectValue("ShowAwardCount", responseXML));
        
        return result;
    }
});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertGridPanel = function(id, expertStore, title, iconCls, queryParams){
    //fields
    this._id = id;
    this._expertStore = expertStore;
    this._expertStore.grid = this;
    //controls
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._filters = new Srims.experts.ExpertGridPanel_GridFilters();
    this._columnModel = new Srims.experts.ExpertGridPanel_ColumnModel(expertStore);
    this._toolbar = new Srims.experts.ExpertGridPanel_ToolBar(this._expertStore, this._selections, id, queryParams);
    
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的专家'
    });
    
    //public methods
    this.getStore = function(){
        return this._expertStore;
    };
    this.onDestroy = function(){
        if (this.queryPanel) {
            Srims.WorkSpace.getWorkSpace().remove(this.queryPanel);
        }
        Srims.experts.ExpertGridPanel.superclass.onDestroy.call(this);
    }
    //constructor
    Srims.experts.ExpertGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._expertStore,
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
            store: this._expertStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._expertStore.columnModel = this._columnModel;
    this._expertStore.on('load', function(store, records){
        var columnModel = store.columnModel;
        var showProjectIndex = columnModel.findColumnIndex('projectCount');
        var showPaperIndex = columnModel.findColumnIndex('paperCount');
        var showPatentIndex = columnModel.findColumnIndex('patentCount');
        var showAwardIndex = columnModel.findColumnIndex('awardCount');
        
        columnModel.setHidden(showProjectIndex, !records.showProjectCount);
        columnModel.setHidden(showPaperIndex, !records.showPaperCount);
        columnModel.setHidden(showPatentIndex, !records.showPatentCount);
        columnModel.setHidden(showAwardIndex, !records.showAwardCount);
    });
    this._expertStore.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var expert = grid.getStore().getAt(rowIndex);
        Srims.experts.ExpertAction.showExpert(expert);
    };
    }
Ext.extend(Srims.experts.ExpertGridPanel, Ext.grid.GridPanel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertGridPanel_GridFilters = function(){
    Srims.experts.ExpertGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'number'
        }, {
            type: 'string',
            dataIndex: 'college'
        }]
    })
};
Ext.extend(Srims.experts.ExpertGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertGridPanel_ColumnModel = function(store){
    Srims.experts.ExpertGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: 'id',
        hidden: true,
        hideable: false
    }, {
        header: '工作证号',
        dataIndex: 'number',
        hidden: false,
        sortable: true
    }, {
        header: '姓名',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '职称',
        dataIndex: 'post',
        hidden: false,
        sortable: true
    }, {
        header: '所在学院',
        dataIndex: 'college',
        hidden: false
        }, {
        header: '双聘单位',
        dataIndex: 'college2',
        hidden: false
    }, {
        header: '家庭电话',
        dataIndex: 'homePhone',
        hidden: false
    }, {
        header: '办公电话',
        dataIndex: 'officePhone',
        hidden: false
    }, {
        header: '手机',
        dataIndex: 'mobilePhone',
        hidden: false
    }, {
        header: 'Email',
        dataIndex: 'email',
        hidden: false
    }, {
        header: '所在部门',
        dataIndex: 'department',
        hidden: true
    }, {
        header: '民族',
        dataIndex: 'nation',
        hidden: true
    }, {
        header: '政治面貌',
        dataIndex: 'policy',
        hidden: true
    }, {
        header: '外语语种1',
        dataIndex: 'language1',
        hidden: true
    }, {
        header: '是否在职',
        dataIndex: 'isOnjob',
        hidden: false,
        renderer: Boolean.nullAbleRender
    }, {
        header: '项目数目',
        dataIndex: 'projectCount',
        hidden: true,
        sortable: true
    }, {
        header: '论文数目',
        dataIndex: 'paperCount',
        hidden: true,
        sortable: true
    }, {
        header: '专利数目',
        dataIndex: 'patentCount',
        hidden: true,
        sortable: true
    }, {
        header: '奖励数目',
        dataIndex: 'awardCount',
        hidden: true,
        sortable: true
    }]);
    this.defaultSortable = false;
};
Ext.extend(Srims.experts.ExpertGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.experts)
    Ext.namespace('Srims.experts');


Srims.experts.ExpertGridPanel_ToolBar = function(expertStore, selection, panelId, queryParams) {
    this._panelId = panelId;
    this._store = expertStore;
    this._selection = selection;
    this._expert = selection.getSelected();
    this._gridPanel = Ext.getCmp(panelId);

    var user = Srims.currentLoginLog.user;

    //controlls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加专家',
        handler: function() {
            Srims.experts.ExpertAction.newExpert();
        },
        hidden: !user.hasPermission_EditExpert,
        tooltip: '<b>新建专家</b><br/>输入专家基本信息以新建专家'
    })
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.experts.ExpertAction.showExpert(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看专家</b><br/>显示专家的相关信息'
    })
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.DeleteExpert(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查询专家</b><br/>查询相关专家'
    })
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-expert-query',
        text: '查询',
        panelId: this._panelId,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.showExpertQueryPanel(this.store, queryParams, Ext.getCmp(this.panelId));
        },
        hidden: !(user.hasPermission_ShowExpert || user.hasPermission_EditExpert || user.hasPermission_EditExpertLinkWay),
        tooltip: '<b>查询专家</b><br/>查询相关专家'
    })
    this._buttonExport = new Ext.Toolbar.Button({
        text: '导出',
        iconCls: 'icon-export',
        minWidth: 60,
        grid: this._gridPanel,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.exportExpert(this.store.lastOptions.params, queryParams);
        },
        hidden: !(user.hasPermission_ShowExpert || user.hasPermission_EditExpert || user.hasPermission_EditExpertLinkWay),
        tooltip: '<b>导出专家</b><br/>导出所查询的专家'
    })
    this._buttonImport = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '导入',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.showImportExpertWindow(this.store);
        },
        tooltip: '<b>专家导入</b><br/>将专家从excel表导入到数据库中'
    });
    this._buttonUpdate = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '更新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.showUpdateExpertWindow(this.store);
        },
        tooltip: '<b>专家更新</b><br/>将专家从excel表更新到数据库中'
    });
    this._buttonUpdateIDCard = new Ext.Toolbar.Button({
        iconCls: 'icon-import',
        text: '更新身份证',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.experts.ExpertAction.showUpdateExpertIDCardWindow(this.store);
        },
        hidden: !user.isSuper,
        tooltip: '<b>专家更新身份证</b><br/>将专家从excel表更新到数据库中'
    });
    this._buttonImportAuto = new Ext.Toolbar.Button({
        iconCls: 'icon-finance-auto-import',
        text: '自动从人事处导入专家',
        minWidth: 60,
        store: this._store,
        handler: function() {
            Srims.experts.atuoImportExpert(this.store);
        },
        tooltip: '<b>自动从人事处导入专家</b>、'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新专家列表'
    })
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
            //清空筛选条件
            var filters = Ext.getCmp(this.panelId)._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    })

    Srims.experts.ExpertGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonQuery, this._buttonExport, this._buttonImport, this._buttonUpdate, this._buttonUpdateIDCard, this._buttonImportAuto, this._buttonShow, this._buttonDelete, /*this._buttonEdit, this._buttonEditLinkWay,*/new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    })

    //根据用户权限显示按钮
    var user = Srims.currentLoginLog.user;
    this._buttonNew.setVisible(user.hasPermission_EditExpert);
    this._buttonImport.setVisible(user.hasPermission_EditExpert);
    this._buttonImportAuto.setVisible(user.hasPermission_EditExpert);

    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChange = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonDelete = selection.buttonDelete;

        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonDelete.hide();
            return;
        }
        var expert = selection.getSelected();

        buttonShow.setVisible(expert.get('hasPermission_ShowExpert'));
        buttonShow.setDisabled(!expert.get('canShowExpert'));
        buttonDelete.setVisible(expert.get('hasPermission_EditExpert'));
        buttonDelete.setDisabled(!expert.get('canEditExpert'));
    }

    //event
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.experts.ExpertGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertExport_Column = function(){
}
Srims.experts.ExpertExport_Column.basic = [['UserID', '登陆ID', , '100'], ['Number', '工作证号', , '100'], ['Name', '姓名', , '100'], ['NameSpell', '姓名拼音缩写', , '80'], ['Sex', '性别', 'sex', '60'], ['Birthday', '出生日期', 'Date', '100'], ['Nation', '民族', , '60'], ['Policy', '政治面貌', , '100'], ['MajorCode', '专业代码', , '100'], ['IDCardNumber', '身份证号', , '100'], ['ComeDate', '来校日期', 'Date', '100'], ['FileNumber', '档案号', , '100'], ['AcademyDegree', '学历', , '100'], ['Post', '职称', , '100'], ['PostLevel', '职称级别', , '80'], ['Occupation', '职业', , '100'], ['VocationLevel', '职业等级', , '40'], ['IsDoctorDirector', '是否博导', 'Boolean', '30'], ['IsOnjob', '是否在职', 'Boolean', '30'], ['IsChinese', '是否中国国籍', 'Boolean', '30'], ['College', '所在学院', , '100'], ['Department', '所在部门', , '100']];

Srims.experts.ExpertExport_Column.contact = [['MobilePhone', '移动电话', , '120'], ['OfficePhone', '办公电话', , '120'], ['HomePhone', '家庭电话', , '100'], ['Fax', '传真', , '100'], ['Address', '通讯地址', , '200'], ['Zip', '邮编', , '100'], ['Email', 'Email', , '100']];

Srims.experts.ExpertExport_Column.major = [['ResearchSubjectFirstLevel1Name', '从事专业1一级学科', , '100'], ['ResearchSubjectSecondLevel1Name', '从事专业1二级学科', , '100'], ['ResearchSubjectFirstLevel2Name', '从事专业2一级学科', , '100'], ['ResearchSubjectSecondLevel2Name', '从事专业2二级学科', , '100'], ['ResearchSubjectFirstLevel3Name', '从事专业3一级学科', , '100'], ['ResearchSubjectSecondLevel3Name', '从事专业3二级学科', , '100'], ['MajorSubejctFirstLevelName', '所学专业一级学科', , '100'], ['MajorSubjectSecondLevelName', '所学专业二级学科', , '100']];

Srims.experts.ExpertExport_Column.resume = [['Language1', '外语语种1', , '100'], ['LanguageLevel1', '外语1熟练程度', , '40'], ['Language2', '外语语种2', , '100'], ['LanguageLevel2', '外语2熟练程度', , '40'], ['Specialty', '特长', , '200'], ['SocietyPost', '社会兼职', , '1000'], ['WorkExperience', '工作简历', , '2000'], ['ResearchExperience', '科研简历', , '1000']];

Srims.experts.ExpertExport_Column.statistic = [['ProjectCount', '项目数目', , '40'], ['PaperCount', '论文数目', , '40'], ['PatentCount', '专利数目', , '40'], ['AwardCount', '奖励数目', , '40']];

if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertProject = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'rank',
    type: 'string',
    mapping: 'Rank'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.ExpertProject);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertStore.superclass.constructor.call(this, new Srims.experts.ExpertProjectXmlReader(), load_url, params);
    }
})

Srims.experts.projectLevelRender = function(value, metadata){
    switch (value) {
        case 'Join':
            return '参与';
        case 'Perside':
            return '主持';
        case 'Addition':
            return '附加';
        default:
            return '未知';
    }
}

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertProjectXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertProjectXmlReader.superclass.constructor.call(this, Srims.experts.ExpertProject);
    }
});

if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertAward = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'year',
    type: 'int',
    mapping: 'Year'
}, {
    name: 'rank',
    type: 'string',
    mapping: 'Rank'
}, {
    name: 'class',
    type: 'string',
    mapping: 'Class'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'project',
    type: 'string',
    mapping: 'Project'
}, {
    name: 'canShowAward',
    type: 'boolean',
    mapping: 'CanShowAward',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.ExpertAward);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertAwardStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertAwardStore.superclass.constructor.call(this, new Srims.experts.ExpertAwardXmlReader(), load_url, params);
    }
})

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertAwardXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertAwardXmlReader.superclass.constructor.call(this, Srims.experts.ExpertAward);
    }
})

if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPaper = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'magazineShortName',
    type: 'string',
    mapping: 'MagazineShortName'
}, {
    name: 'publishDateYear',
    type: 'int',
    mapping: 'PublishDateYear'
}, {
    name: 'influenceFactor',
    type: 'int',
    mapping: 'InfluenceFactor'
}, {
    name: 'paperIndexeds',
    type: 'string',
    mapping: 'PaperIndexeds'
}, {
    name: 'authorLink',
    type: 'string',
    mapping: 'AuthorLink'
}, {
    name: 'firstAuthor',
    type: 'string',
    mapping: 'FirstAuthor'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.experts.ExpertPaper);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPaperStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertPaperStore.superclass.constructor.call(this, new Srims.experts.ExpertPaperXmlReader(), load_url, params);
    }
})

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertPaperXmlReader.superclass.constructor.call(this, Srims.experts.ExpertPaper);
    }
})

if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLiberalArtsPaper = Ext.data.Record.create([{
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
}, {
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
}]);
Srims.data.Entity.apply(Srims.experts.ExpertLiberalArtsPaper);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLiberalArtsPaperStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
    Srims.experts.ExpertLiberalArtsPaperStore.superclass.constructor.call(this, new Srims.experts.ExpertLiberalArtsPaperXmlReader(), load_url, params);
    }
})

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLiberalArtsPaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
    Srims.experts.ExpertLiberalArtsPaperXmlReader.superclass.constructor.call(this, Srims.experts.ExpertLiberalArtsPaper);
    }
})

if (!Srims.papers)
    Ext.namespace('Srims.papers');

Srims.papers.LiberalArtsPaperXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.papers.LiberalArtsPaperXmlReader.superclass.constructor.call(this, Srims.papers.LiberalArtsPaper);
    }
});

if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPatent = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'lawState',
    type: 'string',
    mapping: 'LawState'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'authorizeDateTime',
    type: 'date',
    mapping: 'AuthorizeDateTime'
}, {
    name: 'canShowPatent',
    type: 'boolean',
    mapping: 'CanShowPatent',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.ExpertPatent);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPatentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertPatentStore.superclass.constructor.call(this, new Srims.experts.ExpertPatentXmlReader(), load_url, params);
    }
});



if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPatentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertPatentXmlReader.superclass.constructor.call(this, Srims.experts.ExpertPatent);
    }
});


if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel = function(panelId, expert, listStore){
    this._id = panelId;
    this._expert = expert;
    this._listStore = listStore;
    
    this._basicInformation = new Srims.experts.ExpertShowPanel_Basic(expert);
    this._expertParticipantProjects = new Srims.experts.ExpertShowPanel_ParticipantProjects(expert);
    this._expertChargeProjects = new Srims.experts.ExpertShowPanel_ChargeProjects(expert);
    this._expertPapers = new Srims.experts.ExpertShowPanel_Papers(expert);
    this._expertLiberalArtsPapers = new Srims.experts.ExpertShowPanel_LiberalArtsPapers(expert);
    this._expertPatents = new Srims.experts.ExpertShowPanel_Patents(expert);
    this._expertAwards = new Srims.experts.ExpertShowPanel_Awards(expert);
    this._toolbar = new Srims.experts.ExpertShowPanel_ToolBar(expert, this);
    this._message = new Srims.experts.ExpertEditPanel_MessagePanel();
    Srims.experts.ExpertShowPanel.superclass.constructor.call(this, ({
        id: this._id,
        iconCls: 'icon-show',
        closable: true,
        collapsible: true,
        title: expert.get('name'),
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        style: 'padding:5px; width:1200px',
        defaultType: 'textfield',
        titleCollapse: true,
        tbar: this._toolbar,
        items: [this._message, this._basicInformation, this._expertChargeProjects, this._expertParticipantProjects, this._expertAwards, this._expertPapers, this._expertLiberalArtsPapers, this._expertPatents]
    }))
    
    this.resetComponentValue = function(expert){
        this._basicInformation.resetComponentValue(expert);
    }
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var expert = grid.getStore().getAt(rowIndex);
        Srims.experts.ExpertAction.showExpert(expert);
    };
    
    
    this.getUserEditPower = function(expert, panel){
        if (expert.get('hasPermission_EditExpert') && expert.get('canEditExpert')) 
            Srims.experts.ExpertAction.expertEdit(expert, panel, panel._basicInformation.administratorEditItems, panel._basicInformation.administratorCanNotEditItems);
        
        else 
            if (expert.get('hasPermission_EditExpertLinkWay') && expert.get('canEditExpertLinkWay')) 
                Srims.experts.ExpertAction.expertLinkWayEdit(expert, panel, panel._basicInformation.linkWayEditItems, panel._basicInformation.linkWayAdministratorCanNotEditItems);
            else 
                Srims.experts.ExpertAction.expertSelfEdit(expert, panel, panel._basicInformation.expertSelfEditItems, panel._basicInformation.expertSelfCanNotEditItems);
    }
    
}
Ext.extend(Srims.experts.ExpertShowPanel, Ext.Panel, {});

if (!Srims.experts)
    Ext.namespace('Srims.experts');


Srims.experts.ExpertShowPanel_ToolBar = function(expert, showPanel) {
    //fields
    this._expert = expert;
    this._showPanel = showPanel;
    this._editing = false;
    var user = Srims.currentLoginLog.user;

    this._buttonStartEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: user.isExpert ? '编辑个人信息' : '编辑专家信息',
        minWidth: 60,
        expert: this._expert,
        panel: this._showPanel,
        hidden: false,
        editing: this._editing,
        func: this.buttonChange,
        tooltip: '<b>点此按钮开始编辑</b>您可以对保持高亮的字段进行编辑<br/>',
        handler: function() {
            this.panel.getUserEditPower(this.expert, this.panel);
        }
    })

    this._buttonEditFinish = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '结束编辑',
        minWidth: 60,
        expert: this._expert,
        panel: this._showPanel,
        editing: this._editing,
        hidden: true,
        func: this.buttonChange,
        tooltip: '<b>点此按钮结束编辑</b>如果您已经完成了编辑，请点击此按钮<br/>',
        handler: function() {
            Srims.experts.ExpertAction.finishEdit(this.panel, this.panel._basicInformation.administratorEditItems, this.panel._basicInformation.administratorCanNotEditItems);
            Srims.experts.ExpertAction.finishEdit(this.panel, this.panel._basicInformation.linkWayEditItems, this.panel._basicInformation.linkWayAdministratorCanNotEditItems);
            Srims.experts.ExpertAction.finishEdit(this.panel, this.panel._basicInformation.expertSelfEditItems, this.panel._basicInformation.expertSelfCanNotEditItems);
            Ext.Msg.show({
                title: '信息提示',
                msg: '所有修改信息，需等系统管理员审核通过后才能生效。',
                buttons: Ext.Msg.OK
            });
        }
    })

    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        expert: this._expert,
        hiden: true,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.experts.ExpertService + '/GetById',
                params: {
                    expertId: this.expert.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.experts.ExpertXmlReader()
                    });
                    var currentExpert = store.getAt(0);
                    var panel = Ext.getCmp('ExpertShowPanel' + currentExpert.get('id'));

                    panel.resetComponentValue(currentExpert);
                    panel._expertParticipantProjects._store.load();
                    panel._expertChargeProjects._store.load();
                    panel._expertPapers._store.load();
                    panel._expertPatents._store.load();
                    panel._expertAwards._store.load();
                }
            });
        },
        tooltip: '<b>刷新专家信息</b><br/>刷新专家的全部信息'
    })

    Srims.experts.ExpertShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonStartEdit, this._buttonEditFinish, new Ext.Toolbar.Fill(), this._buttonRefresh],
        height: 25
    });

    //event
    this._onbuttonStartEdit_Click = function(button, e) {
        button.editing = true;
        button.buttonChange(button, button.editing);
    }
    this._buttonStartEdit.on('click', this._onbuttonStartEdit_Click);
    this._buttonStartEdit.other = this._buttonEditFinish;

    this._onbuttonEditFinish = function(button, e) {
        button.editing = false;
        button.buttonChange(button, button.editing);
    }
    this._buttonEditFinish.on('click', this._onbuttonEditFinish);
    this._buttonEditFinish.other = this._buttonStartEdit;

    this.buttonChange = function(button, editing) {
        button.panel._message.setVisible(editing);
        button.panel._expertParticipantProjects.setVisible(!editing);
        button.panel._expertChargeProjects.setVisible(!editing);
        button.panel._expertPapers.setVisible(!editing);
        button.panel._expertPatents.setVisible(!editing);
        button.panel._expertAwards.setVisible(!editing);
        button.other.setVisible(true);
        button.hide();
    }
    this._buttonStartEdit.buttonChange = this.buttonChange;
    this._buttonEditFinish.buttonChange = this.buttonChange;
}
Ext.extend(Srims.experts.ExpertShowPanel_ToolBar, Ext.Toolbar);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_Basic = function(expert){
    this._expert = expert;
    
    this._radioSex = new Ext.form.TextField({
        fieldLabel: '性别',
        value: Srims.experts.SexType.render(expert.get('sex')),
        readOnly: true,
        width: 160
    });
    this._radioIsDoctorDirector = new Ext.form.TextField({
        fieldLabel: '是否博导',
        value: Boolean.nullAbleRender(expert.get('isDoctorDirector')),
        readOnly: true,
        width: 160
    });
    this._radioIsAcademician = new Ext.form.TextField({
        fieldLabel: '是否院士',
        value: Boolean.nullAbleRender(expert.get('isAcademician')),
        readOnly: true,
        width: 160
    });
    this._radioIsChinese = new Ext.form.TextField({
        fieldLabel: '是否中国籍',
        value: Boolean.nullAbleRender(expert.get('isChinese')),
        readOnly: true,
        width: 160
    });
    this._radioIsOnjob = new Ext.form.TextField({
        fieldLabel: '是否在职',
        value: Boolean.nullAbleRender(expert.get('isOnjob')),
        readOnly: true,
        width: 160
    });
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '姓名',
        value: expert.get('name'),
        readOnly: true,
        expert: this._expert,
        width: 160
    });
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '工作证号',
        value: expert.get('number'),
        readOnly: true,
        width: 160
    });
    this._textFieldIdCardNumber = new Ext.form.TextField({
        fieldLabel: '身份证号',
        value: expert.get('idCardNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldOccupation = new Ext.form.TextField({
        fieldLabel: '职务',
        value: expert.get('occupation'),
        readOnly: true,
        width: 160
    });
    this._textFieldPhoto = new Ext.form.Label({
        fieldLabel: '照片',
        readOnly: true,
        html: expert.get('photo') == '' ? '<div style="height:100px;width:200px; display: table-cell; text-align:center; vertical-align:middle;"> <span id="SpanExpertImg_' + expert.get('id') + '">该专家暂时没有照片</span><img id="ImgExpert_' + expert.get('id') + '" height="100px" /></div>' : '<div width="160px" style="text-align:center;"><img id="ImgExpert_' + expert.get('id') + '" height="100px" src="../' + expert.get('photo') + '" /></div></div>',
        width: 160
    });
    this._textFieldVocationLevel = new Ext.form.TextField({
        fieldLabel: '职业等级',
        value: expert.get('vocationLevel'),
        readOnly: true,
        width: 160
    });
    this._fieldCollege = new Ext.form.Field({
        fieldLabel: '所属学院',
        value: expert.get('college'),
        readOnly: true,
        width: 160
    });
        this._fieldCollege2 = new Ext.form.Field({
        fieldLabel: '双聘单位',
        value: expert.get('college2'),
        readOnly: true,
        width: 160
    });
    this._textFieldDepartment = new Ext.form.TextField({
        fieldLabel: '所在部门',
        value: expert.get('department'),
        readOnly: true,
        width: 160
    });
    this._textFieldFileNumber = new Ext.form.TextField({
        fieldLabel: '档案号',
        value: expert.get('fileNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldOfficePhone = new Ext.form.TextField({
        fieldLabel: '办公电话',
        value: expert.get('officePhone'),
        readOnly: true,
        width: 160
    });
    this._textFieldHomePhone = new Ext.form.TextField({
        fieldLabel: '家庭电话',
        value: expert.get('homePhone'),
        readOnly: true,
        width: 160
    });
    this._textFieldFax = new Ext.form.TextField({
        fieldLabel: '传真',
        value: expert.get('fax'),
        readOnly: true,
        width: 160
    });
    this._textFieldMobilePhone = new Ext.form.TextField({
        fieldLabel: '手机',
        value: expert.get('mobilePhone'),
        readOnly: true,
        width: 160
    });
    this._textFieldEmail = new Ext.form.TextField({
        fieldLabel: '电子邮件',
        value: expert.get('email'),
        readOnly: true,
        width: 160
    });
    this._textFieldAddress = new Ext.form.TextField({
        fieldLabel: '通信地址',
        value: expert.get('address'),
        readOnly: true,
        width: 760
    });
    this._textFieldZip = new Ext.form.TextField({
        fieldLabel: '邮编',
        value: expert.get('zip'),
        readOnly: true,
        width: 160
    });
    this._textFieldSocietyPost = new Ext.form.TextField({
        fieldLabel: '社会兼职',
        value: expert.get('societyPost'),
        readOnly: true,
        width: 760
    });
    this._textFieldSpecialty = new Ext.form.TextField({
        fieldLabel: '专长',
        value: expert.get('specialty'),
        width: 760,
        readOnly: true
    });
    this._dateFieldBirthday = new Ext.form.Field({
        fieldLabel: '出生日期',
        value: Date.render(expert.get('birthday')),
        readOnly: true,
        width: 160
    });
    this._dateFieldComeDate = new Ext.form.Field({
        fieldLabel: '来校时间',
        value: Date.render(expert.get('comeDate')),
        readOnly: true,
        width: 160
    });
    this._textAreaWorkExperience = new Ext.form.TextArea({
        fieldLabel: '工作简历',
        value: expert.get('workExperience'),
        width: 760,
        readOnly: true
    });
    this._textAreaResearchExperience = new Ext.form.TextArea({
        fieldLabel: '科研简历',
        value: expert.get('researchExperience'),
        width: 760,
        readOnly: true
    });
    this._fieldNation = new Ext.form.Field({
        fieldLabel: '民族',
        value: expert.get('nation'),
        readOnly: true,
        width: 160
    });
    this._fieldPolicy = new Ext.form.Field({
        fieldLabel: '政治面貌',
        value: expert.get('policy'),
        readOnly: true,
        width: 160
    });
    this._fieldAcaedemyDegree = new Ext.form.Field({
        fieldLabel: '学历',
        value: expert.get('academyDegree'),
        readOnly: true,
        width: 160
    });
    this._fieldExpertPost = new Ext.form.Field({
        fieldLabel: '职称',
        value: expert.get('post'),
        readOnly: true,
        width: 160
    });
    this._textFieldPostLevel = new Ext.form.TextField({
        fieldLabel: '职称等级',
        value: expert.get('postLevel'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguage1 = new Ext.form.Field({
        fieldLabel: '外语语种1',
        value: expert.get('language1'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguage2 = new Ext.form.Field({
        fieldLabel: '外语语种2',
        value: expert.get('language2'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguageLevel1 = new Ext.form.Field({
        fieldLabel: '熟练程度',
        value: expert.get('languageLevel1'),
        readOnly: true,
        width: 160
    });
    this._fieldLanguageLevel2 = new Ext.form.Field({
        fieldLabel: '熟练程度',
        value: expert.get('languageLevel2'),
        readOnly: true,
        width: 160
    });
    this._fieldFirstLevelSubject1 = new Ext.form.Field({
        fieldLabel: '从事专业一级学科',
        readOnly: true,
        value: expert.get('researchSubjectFirstLevel1Name'),
        width: 160
    });
    this._fieldSecondLevelSubject1 = new Ext.form.Field({
        fieldLabel: '从事专业二级学科',
        readOnly: true,
        value: expert.get('researchSubjectSecondLevel1Name'),
        width: 160
    });
    this._fieldFirstLevelSubject2 = new Ext.form.Field({
        fieldLabel: '从事专业一级学科',
        readOnly: true,
        value: expert.get('researchSubjectFirstLevel2Name'),
        width: 160
    });
    this._fieldSecondLevelSubject2 = new Ext.form.Field({
        fieldLabel: '从事专业二级学科',
        readOnly: true,
        value: expert.get('researchSubjectSecondLevel2Name'),
        width: 160
    });
    this._fieldFirstLevelSubject3 = new Ext.form.Field({
        fieldLabel: '从事专业一级学科',
        readOnly: true,
        value: expert.get('researchSubjectFirstLevel3Name'),
        width: 160
    });
    this._fieldSecondLevelSubject3 = new Ext.form.Field({
        fieldLabel: '从事专业二级学科',
        readOnly: true,
        value: expert.get('researchSubjectSecondLevel3Name'),
        width: 160
    });
    this._fieldFirstLevelSubject = new Ext.form.Field({
        fieldLabel: '所学专业一级学科',
        readOnly: true,
        value: expert.get('majorSubejctFirstLevelName'),
        width: 160
    });
    this._fieldSecondLevelSubject = new Ext.form.Field({
        fieldLabel: '所学专业二级学科',
        readOnly: true,
        value: expert.get('majorSubjectSecondLevelName'),
        width: 160
    });
    this._textFieldNameSpell = new Ext.form.TextField({
        fieldLabel: '姓名拼音缩写',
        readOnly: true,
        value: expert.get('nameSpell'),
        width: 160
    });
    
    var item1 = [this._fieldExpertPost, this._textFieldOccupation, this._textFieldDepartment, this._fieldLanguage1, this._fieldLanguage2, this._fieldFirstLevelSubject1, this._fieldFirstLevelSubject2, this._fieldFirstLevelSubject3, this._fieldFirstLevelSubject, this._radioIsDoctorDirector];
    var item2 = [this._textFieldPostLevel,  this._fieldCollege,this._fieldCollege2, this._fieldLanguageLevel1, this._fieldLanguageLevel2, this._fieldSecondLevelSubject1, this._fieldSecondLevelSubject2, this._fieldSecondLevelSubject3, this._fieldSecondLevelSubject, this._radioIsChinese,this._textFieldVocationLevel];
    var item3 = [this._textFieldFileNumber, this._radioSex, this._textFieldMobilePhone, this._textFieldOfficePhone, this._textFieldHomePhone, this._textFieldFax, this._textFieldZip, this._textFieldEmail, this._dateFieldComeDate, this._radioIsOnjob];
    
    Srims.experts.ExpertShowPanel_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 300,
                items: [this._textFieldName, this._textFieldNameSpell, this._fieldNation, this._fieldAcaedemyDegree]
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: [this._textFieldNumber, this._textFieldIdCardNumber, this._fieldPolicy, this._dateFieldBirthday]
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: [this._textFieldPhoto]
            })]
        }), new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 300,
                items: item1
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: item2
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: item3
            })]
        }), new Ext.Panel({
            layout: 'form',
            width: 900,
            items: [this._radioIsAcademician, this._textFieldSpecialty, this._textFieldSocietyPost, this._textFieldAddress, this._textAreaResearchExperience, this._textAreaWorkExperience]
        })]
    }))
    
    this.resetComponentValue = function(expert){
        this._textFieldName.setValue(expert.get('name'));
        this._textFieldNumber.setValue(expert.get('number'));
        this._textFieldIdCardNumber.setValue(expert.get('idCardNumber'));
        this._textFieldOccupation.setValue(expert.get('occupation'));
        this._fieldCollege.setValue(expert.get('college'));
        this._textFieldVocationLevel.setValue(expert.get('vocationLevel'));
        this._textFieldDepartment.setValue(expert.get('department'));
        this._textFieldFileNumber.setValue(expert.get('fileNumber'));
        this._textFieldOfficePhone.setValue(expert.get('officePhone'));
        this._textFieldHomePhone.setValue(expert.get('homePhone'));
        this._textFieldFax.setValue(expert.get('fax'));
        this._textFieldMobilePhone.setValue(expert.get('mobilePhone'));
        this._textFieldAddress.setValue(expert.get('address'));
        this._textFieldZip.setValue(expert.get('zip'));
        this._textFieldSocietyPost.setValue(expert.get('societyPost'));
        this._textFieldSpecialty.setValue(expert.get('specialty'));
        this._dateFieldBirthday.setValue(Date.render(expert.get('birthday')));
        this._dateFieldComeDate.setValue(Date.render(expert.get('comeDate')));
        this._textAreaWorkExperience.setValue(expert.get('workExperience'));
        this._textAreaResearchExperience.setValue(expert.get('researchExperience'));
        this._fieldNation.setValue(expert.get('nation'));
        this._fieldPolicy.setValue(expert.get('policy'));
        this._fieldAcaedemyDegree.setValue(expert.get('academyDegree'));
        this._fieldExpertPost.setValue(expert.get('post'));
        this._textFieldPostLevel.setValue(expert.get('postLevel'));
        this._fieldLanguage1.setValue(expert.get('language1'));
        this._fieldLanguage2.setValue(expert.get('language2'));
        this._fieldLanguageLevel1.setValue(expert.get('languageLevel1'));
        this._fieldLanguageLevel2.setValue(expert.get('languageLevel2'));
        this._textFieldEmail.setValue(expert.get('email'));
        
        this._fieldFirstLevelSubject1.setValue(expert.get('researchSubjectFirstLevel1Name'));
        this._fieldSecondLevelSubject1.setValue(expert.get('researchSubjectSecondLevel1Name'));
        this._fieldFirstLevelSubject2.setValue(expert.get('researchSubjectFirstLevel2Name'));
        this._fieldSecondLevelSubject2.setValue(expert.get('researchSubjectSecondLevel2Name'));
        this._fieldFirstLevelSubject3.setValue(expert.get('researchSubjectFirstLevel3Name'));
        this._fieldSecondLevelSubject3.setValue(expert.get('researchSubjectSecondLevel3Name'));
        this._fieldFirstLevelSubject.setValue(expert.get('majorSubejctFirstLevelName'));
        this._fieldSecondLevelSubject.setValue(expert.get('majorSubjectSecondLevelName'));
    }
    
    //管理员不能编辑的字段
    this.administratorCanNotEditItems = [this._textFieldName, this._textFieldNumber, this._textFieldFileNumber, this._radioIsAcademician];
    //联系方式管理员不能编辑的字段
    this.linkWayAdministratorCanNotEditItems = [this._textFieldNameSpell, this._radioSex, this._fieldNation, this._fieldAcaedemyDegree, this._fieldExpertPost, this._textFieldOccupation, this._textFieldIdCardNumber, this._fieldPolicy, this._textFieldPostLevel, this._textFieldVocationLevel, this._dateFieldBirthday, this._dateFieldComeDate, this._fieldCollege,this._fieldCollege2, this._textFieldDepartment, this._textFieldPhoto, this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, this._radioIsDoctorDirector, this._radioIsChinese, this._radioIsOnjob, this._textFieldSocietyPost, this._textFieldSpecialty, this._textAreaWorkExperience, this._textAreaResearchExperience, this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, this._fieldLanguage1, this._fieldLanguageLevel1, this._fieldLanguage2, this._fieldLanguageLevel2, this._textFieldName, this._textFieldNumber, this._textFieldFileNumber, this._radioIsAcademician];
    //专家不能编辑的
    this.expertSelfCanNotEditItems = [this._textFieldName, this._textFieldNumber, this._dateFieldComeDate, this._fieldExpertPost, this._radioIsChinese, this._radioIsOnjob, this._textFieldOccupation, this._textFieldPostLevel, this._textFieldVocationLevel, this._fieldAcaedemyDegree, this._textFieldFileNumber, this._radioIsAcademician];
    
    //管理员可以编辑的项目
    this.administratorEditItems = [[this._textFieldNameSpell, 'TextField', 'TextField', 'NameSpell'], [this._radioSex, 'RadioGroup', 'ComboBox', 'Sex'], [this._fieldNation, 'Field', 'NoticeTextComboBox', 'Nation', 'Nation'], [this._fieldAcaedemyDegree, 'Field', 'NoticeTextComboBox', 'AcademyDegree', 'AcaedemyDegree'], [this._fieldExpertPost, 'Field', 'NoticeTextComboBox', 'PostNew', 'ExpertPost'], [this._textFieldOccupation, 'TextField', 'TextField', 'Occupation'], [this._textFieldIdCardNumber, 'TextField', 'TextField', 'IDCardNumber'], [this._fieldPolicy, 'Field', 'NoticeTextComboBox', 'Policy', 'Policy'], [this._textFieldPostLevel, 'TextField', 'NumberField', 'PostLevel'], [this._textFieldVocationLevel, 'TextField', 'NumberField', 'VocationLevel'], [this._dateFieldBirthday, 'Field', 'DateField', 'Birthday'], [this._dateFieldComeDate, 'TextField', 'DateField', 'ComeDate'], [this._fieldCollege, 'Field', 'EntityComboBox', 'College', 'CollegeID'],[this._fieldCollege2, 'Field', 'EntityComboBox', 'College2', 'College2ID'], [this._textFieldDepartment, 'TextField', 'EntityComboBox', 'Department', 'DepartmentID'], [this._textFieldPhoto, 'Label', 'Label', 'Photo'], [this._radioIsDoctorDirector, 'RadioGroup', 'ComboBox', 'IsDoctorDirector'], [this._radioIsChinese, 'RadioGroup', 'ComboBox', 'IsChinese'], [this._radioIsOnjob, 'RadioGroup', 'ComboBox', 'IsOnjob'], [this._textFieldOfficePhone, 'TextField', 'TextField', 'OfficePhone'], [this._textFieldHomePhone, 'TextField', 'TextField', 'HomePhone'], [this._textFieldMobilePhone, 'TextField', 'TextField', 'MobilePhone'], [this._textFieldFax, 'TextField', 'TextField', 'Fax'], [this._textFieldAddress, 'TextField', 'TextField', 'Address'], [this._textFieldZip, 'TextField', 'TextField', 'Zip'], [this._textFieldEmail, 'TextField', 'TextField', 'Email'], [this._textFieldSocietyPost, 'TextField', 'TextField', 'SocietyPost'], [this._textFieldSpecialty, 'TextField', 'TextField', 'Specialty'], [this._textAreaWorkExperience, 'TextArea', 'TextArea', 'WorkExperience'], [this._textAreaResearchExperience, 'TextArea', 'TextArea', 'ResearchExperience'], [this._fieldFirstLevelSubject, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, 'MajorCode', 'MajorCodeID']], [this._fieldSecondLevelSubject, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, 'MajorCode', 'MajorCodeID']], [this._fieldFirstLevelSubject1, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, 'ResearchCode1', 'ResearchCode1ID']], [this._fieldSecondLevelSubject1, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, 'ResearchCode1', 'ResearchCode1ID']], [this._fieldFirstLevelSubject2, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, 'ResearchCode2', 'ResearchCode2ID']], [this._fieldSecondLevelSubject2, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, 'ResearchCode2', 'ResearchCode2ID']], [this._fieldFirstLevelSubject3, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, 'ResearchCode3', 'ResearchCode3ID']], [this._fieldSecondLevelSubject3, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, 'ResearchCode3', 'ResearchCode3ID']], [this._fieldLanguage1, 'Field', 'LanguageNoticeTextComboBox', 'language1', [this._fieldLanguage1, this._fieldLanguageLevel1, 'Language1', 'LanguageLevel1']], [this._fieldLanguageLevel1, 'Field', 'LanguageNoticeTextComboBox', 'languageLevel1', [this._fieldLanguage1, this._fieldLanguageLevel1, 'Language1', 'LanguageLevel1']], [this._fieldLanguage2, 'Field', 'LanguageNoticeTextComboBox', 'language2', [this._fieldLanguage2, this._fieldLanguageLevel2, 'Language2', 'LanguageLevel2']], [this._fieldLanguageLevel2, 'Field', 'LanguageNoticeTextComboBox', 'languageLevel2', [this._fieldLanguage2, this._fieldLanguageLevel2, 'Language2', 'LanguageLevel2']]];
    
    
    //联系方式管理员可编辑的字段
    this.linkWayEditItems = [[this._textFieldOfficePhone, 'TextField', 'TextField', 'OfficePhone'], [this._textFieldHomePhone, 'TextField', 'TextField', 'HomePhone'], [this._textFieldMobilePhone, 'TextField', 'TextField', 'MobilePhone'], [this._textFieldFax, 'TextField', 'TextField', 'Fax'], [this._textFieldAddress, 'TextField', 'TextField', 'Address'], [this._textFieldZip, 'TextField', 'TextField', 'Zip'], [this._textFieldEmail, 'TextField', 'TextField', 'Email']];
    //专家可编辑的字段
    this.expertSelfEditItems = [[this._textFieldNameSpell, 'TextField', 'TextField', 'NameSpell'], [this._radioSex, 'RadioGroup', 'ComboBox', 'Sex'], [this._fieldNation, 'Field', 'NoticeTextComboBox', 'Nation', 'Nation'], [this._textFieldIdCardNumber, 'TextField', 'TextField', 'IDCardNumber'], [this._fieldPolicy, 'Field', 'NoticeTextComboBox', 'Policy', 'Policy'], [this._dateFieldBirthday, 'Field', 'DateField', 'Birthday'], [this._fieldFirstLevelSubject, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, 'MajorCode', 'MajorCodeID']], [this._fieldSecondLevelSubject, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject, this._fieldSecondLevelSubject, 'MajorCode', 'MajorCodeID']], [this._radioIsDoctorDirector, 'RadioGroup', 'ComboBox', 'IsDoctorDirector'], [this._textFieldOfficePhone, 'TextField', 'TextField', 'OfficePhone'], [this._textFieldHomePhone, 'TextField', 'TextField', 'HomePhone'], [this._textFieldMobilePhone, 'TextField', 'TextField', 'MobilePhone'], [this._textFieldFax, 'TextField', 'TextField', 'Fax'], [this._textFieldAddress, 'TextField', 'TextField', 'Address'], [this._textFieldZip, 'TextField', 'TextField', 'Zip'], [this._textFieldEmail, 'TextField', 'TextField', 'Email'], [this._fieldCollege, 'Field', 'EntityComboBox', 'College', 'CollegeID'],[this._fieldCollege2, 'Field', 'EntityComboBox', 'College2', 'College2ID'], [this._textFieldDepartment, 'TextField', 'EntityComboBox', 'Department', 'DepartmentID'], [this._textFieldPhoto, 'Label', 'Label', 'Photo'], [this._textFieldSocietyPost, 'TextField', 'TextField', 'SocietyPost'], [this._textFieldSpecialty, 'TextField', 'TextField', 'Specialty'], [this._textAreaWorkExperience, 'TextArea', 'TextArea', 'WorkExperience'], [this._textAreaResearchExperience, 'TextArea', 'TextArea', 'ResearchExperience'], [this._fieldFirstLevelSubject1, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, 'ResearchCode1', 'ResearchCode1ID']], [this._fieldSecondLevelSubject1, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject1, this._fieldSecondLevelSubject1, 'ResearchCode1', 'ResearchCode1ID']], [this._fieldFirstLevelSubject2, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, 'ResearchCode2', 'ResearchCode2ID']], [this._fieldSecondLevelSubject2, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject2, this._fieldSecondLevelSubject2, 'ResearchCode2', 'ResearchCode2ID']], [this._fieldFirstLevelSubject3, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, 'ResearchCode3', 'ResearchCode3ID']], [this._fieldSecondLevelSubject3, 'Field', 'LinkedEntityComboBox', [this._fieldFirstLevelSubject3, this._fieldSecondLevelSubject3, 'ResearchCode3', 'ResearchCode3ID']], [this._fieldLanguage1, 'Field', 'LanguageNoticeTextComboBox', 'language1', [this._fieldLanguage1, this._fieldLanguageLevel1, 'Language1', 'LanguageLevel1']], [this._fieldLanguageLevel1, 'Field', 'LanguageNoticeTextComboBox', 'languageLevel1', [this._fieldLanguage1, this._fieldLanguageLevel1, 'Language1', 'LanguageLevel1']], [this._fieldLanguage2, 'Field', 'LanguageNoticeTextComboBox', 'language2', [this._fieldLanguage2, this._fieldLanguageLevel2, 'Language2', 'LanguageLevel2']], [this._fieldLanguageLevel2, 'Field', 'LanguageNoticeTextComboBox', 'languageLevel2', [this._fieldLanguage2, this._fieldLanguageLevel2, 'Language2', 'LanguageLevel2']]];
}
Ext.extend(Srims.experts.ExpertShowPanel_Basic, Ext.Panel, {});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_ParticipantProjects_ColumnModel = function(){
    Srims.experts.ExpertShowPanel_ParticipantProjects_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '项目编号',
        dataIndex: 'number',
        hidden: false
    }, {
        header: '名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '项目类别',
        dataIndex: 'type',
        hidden: false
    }, {
        header: '项目级别',
        dataIndex: 'level',
        hidden: false,
        renderer: Srims.experts.projectLevelRender
    }, {
        header: '负责人',
        dataIndex: 'principal',
        hidden: false
    }, {
        header: '位次',
        dataIndex: 'order',
        hidden: false
    }])
}
Ext.extend(Srims.experts.ExpertShowPanel_ParticipantProjects_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

//用户查看项目详细信息
Srims.experts.project = undefined;
Srims.experts.showProject = function(){
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: Srims.experts.project.get('id')
        },
        success: function(response){
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectXmlReader()
            });
            var project = store.getAt(0);
            Srims.projects.showProject(project);
        }
    });
}

Srims.experts.ExpertShowPanel_ParticipantProjects = function(expert){
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有参与的项目'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_ParticipantProjects_ColumnModel();
    this._store = new Srims.experts.ExpertProjectStore(Srims.service.experts.ExpertService + '/GetExpertParticipantProjects', {
        expertId: expert.get('id')
    });
    Srims.experts.ExpertShowPanel_ParticipantProjects.superclass.constructor.call(this, {
        id: 'ExpertPaticipantProjects' + expert.get('id'),
        collapsible: true,
        stateful: true,
        sm: this._selections,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        autoHeight: true,
        title: '参与的项目',
        region: 'center',
        titleCollapse: true,
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        viewConfig: this._view
    })
    this._store.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var project = grid.getStore().getAt(rowIndex);
        if (!project.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '该用户名没有查看该项目的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.project = project;
        Srims.Load.loadProjectModule('Srims.experts.showProject();');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_ParticipantProjects, Ext.grid.GridPanel);


if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_ChargeProjects_ColumnModel = function(){
    Srims.experts.ExpertShowPanel_ChargeProjects_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '项目编号',
        dataIndex: 'number',
        hidden: false
    }, {
        header: '名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '项目等级',
        dataIndex: 'rank',
        hidden: false
    }, {
        header: '项目类别',
        dataIndex: 'type',
        hidden: false
    }, {
        header: '项目级别',
        dataIndex: 'level',
        hidden: false,
        renderer: Srims.experts.projectLevelRender
    }, {
        header: '总经费（万）',
        dataIndex: 'fundTotal',
        hidden: false,
        renderer: Money.render
    }, {
        header: '已到经费（万）',
        dataIndex: 'fundReceived',
        hidden: false,
        renderer: Money.render
    }, {
        header: '起始年月',
        dataIndex: 'startDate',
        hidden: false,
        renderer: Date.render
    }, {
        header: '结束年月',
        dataIndex: 'endDate',
        hidden: false,
        renderer: Date.render
    }])
}
Ext.extend(Srims.experts.ExpertShowPanel_ChargeProjects_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

//用于查看专家的详细项目信息
Srims.experts.project = undefined;
Srims.experts.showProject = function(){
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: Srims.experts.project.get('id')
        },
        success: function(response){
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectXmlReader()
            });
            var project = store.getAt(0);
            Srims.projects.showProject(project);
        }
    });
}
Srims.experts.ExpertShowPanel_ChargeProjects = function(expert){
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有负责的项目'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_ChargeProjects_ColumnModel();
    this._store = new Srims.experts.ExpertProjectStore(Srims.service.experts.ExpertService + '/GetExpertChargeProjects', {
        expertId: expert.get('id')
    });
    Srims.experts.ExpertShowPanel_ChargeProjects.superclass.constructor.call(this, {
        id: 'ExpertChargeProjects' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        sm: this._selections,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        autoHeight: true,
        title: '负责的项目',
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        view: this._view
    })
    this._store.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var project = grid.getStore().getAt(rowIndex);
        if (!project.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该项目的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.project = project;
        Srims.Load.loadProjectModule('Srims.experts.showProject();');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_ChargeProjects, Ext.grid.GridPanel);

if (!Srims.experts)
    Ext.namespace('Srims.experts');

//用于显示专家信息中的奖励
Srims.experts.award = undefined;
Srims.experts.showAward = function() {
    Ext.Ajax.request({
        url: Srims.service.awards.AwardService + '/GetById',
        params: {
            awardId: Srims.experts.award.get('id')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.awards.AwardXmlReader()
            });
            var award = store.getAt(0);
            Srims.awards.showAward(award);
        }
    });
}
Srims.experts.ExpertShowPanel_Awards = function(expert) {
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有奖励'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_Awards_ColumnModel();
    this._store = new Srims.experts.ExpertAwardStore(Srims.service.experts.ExpertService + '/GetExpertAwards', {
        expertId: expert.get('id')
    });

    Srims.experts.ExpertShowPanel_Awards.superclass.constructor.call(this, {
        id: 'ExpertAwards' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        sm: this._selections,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: '奖励',
        autoHeight: true,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        view: this._view
    });

    this._store.load();
    this.on('celldblclick', onCellDblClick);

    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var award = grid.getStore().getAt(rowIndex);
        if (!award.get('canShowAward')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '该用户名没有查看该奖励的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.award = award;
        Srims.Load.loadAwardModule('Srims.experts.showAward();');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_Awards, Ext.grid.GridPanel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_Awards_ColumnModel = function(){
    Srims.experts.ExpertShowPanel_Awards_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '奖项名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '获奖年份',
        dataIndex: 'year',
        hidden: false
    }, {
        header: '奖项级别',
        dataIndex: 'rank',
        hidden: false
    }, {
        header: '奖项等级',
        dataIndex: 'class',
        hidden: false
    }, {
        header: '位次',
        dataIndex: 'order',
        hidden: false
    }, {
        header: '项目名称',
        dataIndex: 'project',
        hidden: false
    }])
}
Ext.extend(Srims.experts.ExpertShowPanel_Awards_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.paper = undefined;
Srims.experts.showPaper = function(){
    Ext.Ajax.request({
        url: Srims.service.papers.PaperService + '/GetById',
        params: {
            paperId: Srims.experts.paper.get('id')
        },
        success: function(response){
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.papers.PaperXmlReader()
            });
            var paper = store.getAt(0);
            Srims.papers.showPaper(paper);
        }
    });
}
Srims.experts.ExpertShowPanel_Papers = function(expert){
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有发表论文'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_Papers_ColumnModel();
    this._store = new Srims.experts.ExpertPaperStore(Srims.service.experts.ExpertService + '/GetExpertPapers', {
        expertId: expert.get('id')
    });
    Srims.experts.ExpertShowPanel_Papers.superclass.constructor.call(this, {
        id: 'ExpertPapers' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: '论文',
        region: 'center',
        closable: true,
        loadMask: true,
        autoHeight: true,
        colModel: this._columnModel,
        view: this._view
    })
    this._store.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var paper = grid.getStore().getAt(rowIndex);
        if (!paper.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该论文的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.paper = paper;
        Srims.Load.loadPaperModule('Srims.experts.showPaper();');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_Papers, Ext.grid.GridPanel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_Papers_ColumnModel = function(){
    Srims.experts.ExpertShowPanel_Papers_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '论文名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '发表杂志',
        dataIndex: 'magazineShortName',
        hidden: false
    }, {
        header: '发表年份',
        dataIndex: 'publishDateYear',
        hidden: false
    }, {
        header: '影响因子',
        dataIndex: 'influenceFactor',
        renderer: InfluenceFactor.render,
        hidden: false
    }, {
        header: '收录',
        dataIndex: 'paperIndexeds',
        hidden: false
    }, {
        header: '通讯作者',
        dataIndex: 'authorLink',
        hidden: false
    }, {
        header: '第一作者',
        dataIndex: 'firstAuthor',
        hidden: false
    }, {
        header: '位次',
        dataIndex: 'order',
        hidden: false
    }])
}
Ext.extend(Srims.experts.ExpertShowPanel_Papers_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.LiberalArtspaper = undefined;
Srims.experts.showLiberalArtsPaper = function() {
    Ext.Ajax.request({
    url: Srims.service.papers.LiberalArtsPaperService + '/GetByPaperId',
        params: {
        paperId: Srims.experts.LiberalArtspaper.get('id')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.papers.LiberalArtsPaperXmlReader()
            });
            var paper = store.getAt(0);
            Srims.papers.showLiberalArtsPaper(paper);
        }
    });
}
Srims.experts.ExpertShowPanel_LiberalArtsPapers = function(expert) {
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有发表论文'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_LiberalArtsPapers_ColumnModel();
    this._store = new Srims.experts.ExpertLiberalArtsPaperStore(Srims.service.experts.ExpertService + '/GetExpertLiberalArtsPapers', {
        expertId: expert.get('id')
    });
    Srims.experts.ExpertShowPanel_LiberalArtsPapers.superclass.constructor.call(this, {
        id: 'ExpertLiberalArtsPapers' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: '文科论文',
        region: 'center',
        closable: true,
        loadMask: true,
        autoHeight: true,
        colModel: this._columnModel,
        view: this._view
    })
    this._store.load();
    this.on('celldblclick', onCellDblClick);

    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var paper = grid.getStore().getAt(rowIndex);
        if (!paper.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该论文的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.LiberalArtspaper = paper;

        //Srims.papers.showLiberalArtsPaper(paper);
        Srims.Load.loadPaperModule('Srims.experts.showLiberalArtsPaper(Srims.experts.LiberalArtspaper);');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_LiberalArtsPapers, Ext.grid.GridPanel);

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_LiberalArtsPapers_ColumnModel = function() {
Srims.experts.ExpertShowPanel_LiberalArtsPapers_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    },     {
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
    }
])
    }
    Ext.extend(Srims.experts.ExpertShowPanel_LiberalArtsPapers_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');


Srims.experts.patent = undefined;
Srims.experts.showPatent = function(){
    Ext.Ajax.request({
        url: Srims.service.patents.PatentService + '/GetById',
        params: {
            patentId: Srims.experts.patent.get('id')
        },
        success: function(response){
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.patents.PatentXmlReader()
            });
            var patent = store.getAt(0);
            Srims.patents.showPatent(patent);
        }
    })
    Srims.patents.showPatent(Srims.experts.patent);
}
Srims.experts.ExpertShowPanel_Patents = function(expert){
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有专利'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_Patents_ColumnModel();
    this._store = new Srims.experts.ExpertPatentStore(Srims.service.experts.ExpertService + '/GetExpertPatents', {
        expertId: expert.get('id')
    });
    Srims.experts.ExpertShowPanel_Patents.superclass.constructor.call(this, {
        id: 'ExpertPatentsS' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        sm: this._selections,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: '专利',
        region: 'center',
        closable: true,
        loadMask: true,
        autoHeight: true,
        colModel: this._columnModel,
        view: this._view
    })
    this._store.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var patent = grid.getStore().getAt(rowIndex);
        if (!patent.get('canShowPatent')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该专利的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.patent = patent;
        Srims.Load.loadPatentModule('Srims.experts.showPatent();');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_Patents, Ext.grid.GridPanel);

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel_Patents_ColumnModel = function() {
    Srims.experts.ExpertShowPanel_Patents_ColumnModel.superclass.constructor.call(this, [{
        header: 'ID',
        dataIndex: 'id',
        hidden: true
    }, {
        header: '专利号',
        dataIndex: 'number',
        hidden: false
    }, {
        header: '专利名称',
        dataIndex: 'name',
        hidden: false
    }, {
        header: '法律状态',
        dataIndex: 'lawState',
        renderer: Srims.patents.PatentLawStateRender,
        hidden: false
    }, {
        header: '专利类型',
        dataIndex: 'type',
        hidden: false,
        renderer: Srims.patents.PatentTypeRender
    }, {
        header: '位次',
        dataIndex: 'order',
        hidden: false
    }, {
        header: '负责人',
        dataIndex: 'principal',
        hidden: false
    }, {
        header: '授权年度',
        dataIndex: 'authorizeDateTime',
        renderer: Date.render,
        hidden: false
}])
    }
    Ext.extend(Srims.experts.ExpertShowPanel_Patents_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel = function(id, store, queryParams, gridPanel){

    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    //this._relation = new Srims.experts.ExpertQueryPanel_Relation();
    this._basic = new Srims.experts.ExpertQueryPanel_Basic();
    this._paper = new Srims.experts.ExpertQueryPanel_Paper();
    this._award = new Srims.experts.ExpertQueryPanel_Award();
    this._patent = new Srims.experts.ExpertQueryPanel_Patent();
    this._project = new Srims.experts.ExpertQueryPanel_Project();
    this._statistic = new Srims.experts.ExpertQueryPanel_Statistic();
    
    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        panel: this,
        handler: function(){
            this.panel.clearParams();
            queryParams = this.panel.getParams();
            this.panel._store.load();
            Srims.WorkSpace.active(gridPanel._id);
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        panel: this,
        handler: function(){
            var panel = this.panel;
            queryParams = panel.getParams();
            panel._store.load();
            Srims.WorkSpace.active(gridPanel._id);
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        panel: this,
        handler: function(){
            var panel = this.panel;
            panel.clearParams();
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        panel: this,
        handler: function(){
            var panel = this.panel;
            
            panel.getParams();
            Srims.common.newView(Srims.common.ViewType.ExpertQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    })
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        panel: this,
        handler: function(){
            var panel = this.panel;
            
            Srims.common.showViewWindow(Srims.common.ViewType.ExpertQuery);
            panel.hide();
        }
    })
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        panel: this,
        handler: function(){
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });
    
    var user = Srims.currentLoginLog.user;
    var items = [this._basic];
    if (user.hasPermission_ShowAnyVerticalProject || user.hasPermission_ShowAnyHorizontalProject) 
        items[items.length] = this._project;
    if (user.hasPermission_ManagePaper) 
        items[items.length] = this._paper;
    if (user.hasPermission_ManageAward) 
        items[items.length] = this._award;
    if (user.hasPermission_ManagePatent) 
        items[items.length] = this._patent;
    if (user.hasPermission_Statistic) 
        items[items.length] = this._statistic;
    
    Srims.experts.ExpertQueryPanel.superclass.constructor.call(this, ({
        id: id,
        title: '专家查询',
        iconCls: 'icon-expert-query',
        closable: true,
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        deferHeight: false,
        titleCollapse: true,
        items: items,
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    }))
    
    this.getParams = function(){
        var params = this._params;
        
        //this._relation.buildParams(params);
        this._basic.buildParams(params);
        this._paper.buildParams(params);
        this._award.buildParams(params);
        this._patent.buildParams(params);
        this._project.buildParams(params);
        this._statistic.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        //this._relation.clearParams();
        this._basic.clearParams();
        this._paper.clearParams();
        this._award.clearParams();
        this._patent.clearParams();
        this._project.clearParams();
        this._statistic.clearParams();
    }
    
    this.getGridPanel = function(){
        var gridPanelID = "ExpertGridPanel";
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
    }
    this.query = function(button){
        var panel = button.panel;
        panel.getGridPanel();
        panel.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        panel._store.load();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel, Ext.Panel, {});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Basic = function(){
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '姓名',
        width: 120
    })
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '工作证号',
        width: 120
    })
    
    this._numberFieldAgeStart = new Ext.form.NumberField({
        fieldLabel: '年龄',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 2,
        minLength: 2,
        maxValue: 99,
        minValue: 18,
        width: 120
    })
    this._numberFieldAgeEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxLength: 2,
        minLength: 2,
        maxValue: 60,
        minValue: 18,
        width: 120
    })
    
    var academyDegreeItems = Srims.component.QueryWindow_MemberPanel.ExpertAcademyDegreeStore.checkboxGroupItems;
    this._checkboxGroupAcademyDegree = new Srims.component.CheckBoxGroup({
        fieldLabel: '学历',
        columns: academyDegreeItems.length > 6 ? 5 : academyDegreeItems.length,
        items: academyDegreeItems,
        cls: 'srims-checkboxGroup-expert'
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
    this._textFieldPostLevelStart = new Ext.form.NumberField({
        fieldLabel: '职称级别',
        width: 120,
        allowDecimals: false,
        allowNegative: false
    });
    this._textFieldPostLevelEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120,
        allowDecimals: false,
        allowNegative: false
    });
    this._checkboxIsPostOrAcademyDegree = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '学历和职称是“或”的关系'
    });
    //    var yes = new Ext.form.Radio({
    //        name: 'radioIsDoctorDirector',
    //        boxLabel: '是'
    //    });
    //    var no = new Ext.form.Radio({
    //        name: 'radioIsDoctorDirector',
    //        boxLabel: '否'
    //    });
    //    var unknown = new Ext.form.Radio({
    //        name: 'radioIsDoctorDirector',
    //        boxLabel: '未知'
    //    });
    this._checkboxIsDoctorDirector = new Ext.form.Checkbox({
        fieldLabel: '是否博导'
    });
    
    Srims.experts.ExpertQueryPanel_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 220,
                items: [this._textFieldName, this._numberFieldAgeStart, this._textFieldPostLevelStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 220,
                items: [this._textFieldNumber, this._numberFieldAgeEnd, this._textFieldPostLevelEnd]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 260,
                items: [this._checkboxIsDoctorDirector, this._checkboxIsPostOrAcademyDegree, this._comboBoxCollege]
            })]
        }), this._checkboxGroupAcademyDegree]
    }))
    
    this.buildParams = function(params){
        params.name = this._textFieldName.getValue();
        params.number = this._textFieldNumber.getValue();
        params.birthdayStart = Date.renderAsAge(this._numberFieldAgeStart.getValue());
        params.birthdayEnd = Date.renderAsAge(this._numberFieldAgeEnd.getValue());
        params.academyDegree = this._checkboxGroupAcademyDegree.getSelecetedValue();
        params.college = this._comboBoxCollege.getText();
        params.postLevelStart = this._textFieldPostLevelStart.getValue();
        params.postLevelEnd = this._textFieldPostLevelEnd.getValue();
        params.isPostOrDegree = this._checkboxIsPostOrAcademyDegree.checked ? "true" : "";
        params.isDoctorDirector = this._checkboxIsDoctorDirector.checked ? "true" : "";
    }
    
    this.clearParams = function(params){
        this._textFieldName.reset();
        this._textFieldNumber.reset();
        this._numberFieldAgeStart.reset();
        this._numberFieldAgeEnd.reset();
        this._checkboxGroupAcademyDegree.reset();
        this._textFieldPostLevelStart.reset();
        this._textFieldPostLevelEnd.reset();
        this._checkboxIsPostOrAcademyDegree.reset();
        this._checkboxIsDoctorDirector.reset();
        this._comboBoxCollege.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Basic, Ext.Panel, {});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');
Srims.experts.ExpertQueryPanel_Award = function(){
    this._numberFieldAwardWinnerOderStart = new Ext.form.NumberField({
        fieldLabel: '获奖人位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 120
    });
    this._numberFieldAwardWinnerOderEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 120
    });
    this._numberFieldAwardYearStart = new Ext.form.NumberField({
        fieldLabel: '获奖年度',
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 120
    });
    this._numberFieldAwardYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 120
    });
    
    var awardRankItems = Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore.checkboxGroupItems;
    this._checkboxGroupAwardRank = new Srims.component.CheckBoxGroup({
        fieldLabel: '级别',
        cls: 'srims-checkboxGroup',
        columns: awardRankItems.length > 6 ? 5 : awardRankItems.length,
        items: awardRankItems
    });
    
    var awardClassItems = Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore.checkboxGroupItems;
    this._checkboxGroupClass = new Srims.component.CheckBoxGroup({
        fieldLabel: '等级',
        cls: 'srims-checkboxGroup',
        columns: awardClassItems.length > 6 ? 5 : awardClassItems.length,
        items: awardClassItems
    });
    
    var awardClassificationItems = Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore.checkboxGroupItems;
    this._checkboxGroupClassification = new Srims.component.CheckBoxGroup({
        fieldLabel: '奖种',
        cls: 'srims-checkboxGroup',
        columns: awardClassificationItems.length > 6 ? 5 : awardClassificationItems.length,
        items: awardClassificationItems
    });
    
    Srims.experts.ExpertQueryPanel_Award.superclass.constructor.call(this, ({
        collapsible: true,
        title: '奖励',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 70,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 220,
                labelWidth: 70,
                layout: 'form',
                items: [this._numberFieldAwardWinnerOderStart, this._numberFieldAwardYearStart]
            }), new Ext.Panel({
                width: 200,
                labelWidth: 20,
                layout: 'form',
                items: [this._numberFieldAwardWinnerOderEnd, this._numberFieldAwardYearEnd]
            })]
        }), this._checkboxGroupAwardRank, this._checkboxGroupClass, this._checkboxGroupClassification]
    }));
    
    this.buildParams = function(params){
        params.awardWinnerOderStart = this._numberFieldAwardWinnerOderStart.getValue();
        params.awardWinnerOderEnd = this._numberFieldAwardWinnerOderEnd.getValue();
        params.awardYearStart = this._numberFieldAwardYearStart.getValue();
        params.awardYearEnd = this._numberFieldAwardYearEnd.getValue();
        params.awardRank = this._checkboxGroupAwardRank.getSelecetedValue();
        params.awardClass = this._checkboxGroupClass.getSelecetedValue();
        params.awardClassification = this._checkboxGroupClassification.getSelecetedValue();
    }
    
    this.clearParams = function(){
        this._numberFieldAwardWinnerOderStart.reset();
        this._numberFieldAwardWinnerOderEnd.reset();
        this._numberFieldAwardYearStart.reset();
        this._numberFieldAwardYearEnd.reset();
        this._checkboxGroupAwardRank.reset();
        this._checkboxGroupClass.reset();
        this._checkboxGroupClassification.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Award, Ext.Panel, {});

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



if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Paper = function(){
    this._numberFieldOrderStart = new Ext.form.NumberField({
        fieldLabel: '作者位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        maxLength: 6,
        width: 120
    });
    this._numberFieldOrderEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        maxLength: 6,
        width: 120
    });
    this._checkBoxIsLinkMan = new Ext.form.Checkbox({
        fieldLabel: '是否通讯作者'
    });
    this._numberFieldInfluenceFactorStart = new Srims.component.ThousandPercentField({
        fieldLabel: '影响因子',
        maxLength: 6,
        width: 120
    });
    this._numberFieldInfluenceFactorEnd = new Srims.component.ThousandPercentField({
        fieldLabel: '至',
        maxLength: 6,
        width: 120
    });
    this._numberFieldPublishYearStart = new Ext.form.NumberField({
        fieldLabel: '发表年份',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 120
    });
    this._numberFieldPublishYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 120
    });
    this._checkboxGroupIndexed = new Srims.component.CheckBoxGroup({
        fieldLabel: '论文收录',
        cls: 'srims-checkboxGroup',
        columns: Srims.papers.paperIndexedTypeStore.length > 6 ? 5 : Srims.papers.paperIndexedTypeStore.length,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.paperIndexedTypeStore)
    });
    
    Srims.experts.ExpertQueryPanel_Paper.superclass.constructor.call(this, ({
        title: '论文',
        collapsible: true,
        autoHeight: true,
        frame: true,
        labelWidth: 60,
        layout: 'form',
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                labelWidth: 60,
                layout: 'form',
                items: [this._numberFieldOrderStart, this._numberFieldInfluenceFactorStart, this._numberFieldPublishYearStart]
            }), new Ext.Panel({
                width: 200,
                labelWidth: 20,
                layout: 'form',
                items: [this._numberFieldOrderEnd, this._numberFieldInfluenceFactorEnd, this._numberFieldPublishYearEnd]
            }), new Ext.Panel({
                width: 240,
                labelWidth: 80,
                layout: 'form',
                items: [this._checkBoxIsLinkMan]
            })]
        }), this._checkboxGroupIndexed]
    }))
    
    this.buildParams = function(params){
        params.authorOrderStart = this._numberFieldOrderStart.getValue();
        params.authorOrderEnd = this._numberFieldOrderEnd.getValue();
        params.isLinkMan = this._checkBoxIsLinkMan.checked ? "true" : "";
        params.influenceFactorStart = this._numberFieldInfluenceFactorStart.getValue();
        params.influenceFactorEnd = this._numberFieldInfluenceFactorEnd.getValue();
        params.publishYearStart = this._numberFieldPublishYearStart.getValue();
        params.publishYearEnd = this._numberFieldPublishYearEnd.getValue();
        params.paperIndexed = this._checkboxGroupIndexed.getSelecetedValue();
    }
    
    this.clearParams = function(){
        this._numberFieldOrderStart.reset();
        this._numberFieldOrderEnd.reset();
        this._checkBoxIsLinkMan.reset();
        this._numberFieldInfluenceFactorStart.reset();
        this._numberFieldInfluenceFactorEnd.reset();
        this._numberFieldPublishYearStart.reset();
        this._numberFieldPublishYearEnd.reset();
        this._checkboxGroupIndexed.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Paper, Ext.Panel, {});


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





if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Patent = function(){
    this._PatentInventerOrderStart = new Ext.form.NumberField({
        fieldLabel: '发明人位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 120
    });
    this._PatentInventerOrderEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 120
    });
    this._IsAccredited = new Ext.form.Checkbox({
        fieldLabel: '是否已授权'
    });
    this._IsPrincipal = new Ext.form.Checkbox({
        fieldLabel: '是否负责人'
    });
    this._ApplicationTimeStart = new Ext.form.DateField({
        fieldLabel: '申请时间',
        width: 120
    });
    this._ApplicationTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 120
    });
    this._AuthorisedTimeStart = new Ext.form.DateField({
        fieldLabel: '授权时间',
        width: 120
    });
    this._AuthorisedTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 120
    });
    this._patentLawState = new Srims.component.CheckBoxGroup({
        fieldLabel: '法律状态',
        cls: 'srims-checkboxGroup',
        columns: Srims.patents.PatentLawStateStore.length > 7 ? 6 : Srims.patents.PatentLawStateStore.length,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentLawStateStore)
    });
    this._patentTypes = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利类别',
        cls: 'srims-checkboxGroup',
        columns: Srims.patents.PatentTypeStore.length > 5 ? 4 : Srims.patents.PatentTypeStore.length,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentTypeStore)
    });
    
    Srims.experts.ExpertQueryPanel_Patent.superclass.constructor.call(this, ({
        collapsible: true,
        title: '专利',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 70,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 240,
                labelWidth: 70,
                items: [this._PatentInventerOrderStart, this._ApplicationTimeStart, this._AuthorisedTimeStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 20,
                width: 200,
                items: [this._PatentInventerOrderEnd, this._ApplicationTimeEnd, this._AuthorisedTimeEnd]
            }), new Ext.Panel({
                layout: 'form',
                width: 200,
                labelWidth: 70,
                items: [this._IsAccredited, this._IsPrincipal]
            })]
        }), this._patentLawState, this._patentTypes]
    }))
    
    this.buildParams = function(params){
        params.inventorOrderStart = this._PatentInventerOrderStart.getValue();
        params.inventorOrderEnd = this._PatentInventerOrderEnd.getValue();
        params.isAccredited = this._IsAccredited.checked ? "true" : "";
        params.isPrincipal = this._IsPrincipal.checked ? "true" : "";
        params.applicationTimeStart = Date.format(this._ApplicationTimeStart.getValue());
        params.applicationTimeEnd = Date.format(this._ApplicationTimeEnd.getValue());
        params.authorizedTimeStart = Date.format(this._AuthorisedTimeStart.getValue());
        params.authorizedTimeEnd = Date.format(this._AuthorisedTimeEnd.getValue());
        params.patentLawState = this._patentLawState.getSelecetedValue();
        params.patentTypes = this._patentTypes.getSelecetedValue();
    }
    
    this.clearParams = function(){
        this._PatentInventerOrderStart.reset();
        this._PatentInventerOrderEnd.reset();
        this._IsAccredited.reset();
        this._IsPrincipal.reset();
        this._ApplicationTimeStart.reset();
        this._ApplicationTimeEnd.reset();
        this._AuthorisedTimeStart.reset();
        this._AuthorisedTimeEnd.reset();
        this._patentLawState.reset();
        this._patentTypes.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Patent, Ext.Panel, {});

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

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Project = function(){
    this._basic = new Srims.experts.ExpertQueryPanel_Project_Basic();
    this._fund = new Srims.experts.ExpertQueryPanel_Project_Fund();
    this._type = new Srims.experts.ExpertQueryPanel_Project_Type();
    
    Srims.experts.ExpertQueryPanel_Project.superclass.constructor.call(this, ({
        collapsible: true,
        title: '项目',
        autoHeight: true,
        frame: true,
        layout: 'form',
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._basic, this._fund, this._type]
    }))
    
    this.buildParams = function(params){
        this._basic.buildParams(params);
        this._fund.buildParams(params);
        this._type.buildParams(params);
    }
    this.clearParams = function(){
        this._basic.clearParams();
        this._fund.clearParams();
        this._type.clearParams();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Project, Ext.Panel, {});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Project_Basic = function(){
    this._dateFieldStartDateStart = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 120
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 120
    });
    this._dateFieldEndDateStart = new Ext.form.DateField({
        fieldLabel: '结束时间',
        width: 120
    });
    this._dateFieldEndDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 120
    });
    this._checkboxGroupLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectLevelStore)
    });
    this._checkboxGroupState = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectStateQueryStore)
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密'
    });
    
    Srims.experts.ExpertQueryPanel_Project_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 230,
                items: [this._dateFieldStartDateStart, this._dateFieldEndDateStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 20,
                width: 200,
                items: [this._dateFieldStartDateEnd, this._dateFieldEndDateEnd]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 200,
                items: [this._checkboxIsSecret]
            })]
        }), this._checkboxGroupLevel, this._checkboxGroupState]
    }))
    
    
    this.buildParams = function(params){
        params.projectStartDateStart = Date.format(this._dateFieldStartDateStart.getValue());
        params.projectStartDateEnd = Date.format(this._dateFieldStartDateEnd.getValue());
        params.projectEndDateStart = Date.format(this._dateFieldEndDateStart.getValue());
        params.projectEndDateEnd = Date.format(this._dateFieldEndDateEnd.getValue());
        params.projectLevel = this._checkboxGroupLevel.getSelecetedValue();
        params.projectState = this._checkboxGroupState.getSelecetedValue();
        params.projectIsSecret = this._checkboxIsSecret.checked ? "true" : "";
    }
    
    this.clearParams = function(){
        this._dateFieldStartDateStart.reset();
        this._dateFieldStartDateEnd.reset();
        this._dateFieldEndDateStart.reset();
        this._dateFieldEndDateEnd.reset();
        this._checkboxGroupLevel.reset();
        this._checkboxGroupState.reset();
        this._checkboxIsSecret.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Project_Basic, Ext.Panel, {});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Project_Fund = function(){
    this._textFieldFundFrom = new Ext.form.TextField({
        fieldLabel: '资金来源',
        width: 300
    });
    this._numberFieldFundContractStart = new Srims.component.MoneyField({
        fieldLabel: '合同额(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundTotalStart = new Srims.component.MoneyField({
        fieldLabel: '总额(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundTotalEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    
    Srims.experts.ExpertQueryPanel_Project_Fund.superclass.constructor.call(this, ({
        collapsible: true,
        title: '经费信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldFundFrom, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 240,
                labelWidth: 80,
                items: [this._numberFieldFundContractStart, this._numberFieldFundTotalStart]
            }), new Ext.Panel({
                layout: 'form',
                width: 220,
                labelWidth: 20,
                items: [this._numberFieldFundContractEnd, this._numberFieldFundTotalEnd]
            })]
        })]
    }))
    
    this.buildParams = function(params){
        params.projectFundFrom = this._textFieldFundFrom.getValue();
        params.projectFundContractStart = this._numberFieldFundContractStart.getMoney();
        params.projectFundContractEnd = this._numberFieldFundContractEnd.getMoney();
        params.projectFundTotalStart = this._numberFieldFundTotalStart.getMoney();
        params.projectFundTotalEnd = this._numberFieldFundTotalEnd.getMoney();
    }
    
    this.clearParams = function(){
        this._textFieldFundFrom.reset();
        this._numberFieldFundContractStart.reset();
        this._numberFieldFundContractEnd.reset();
        this._numberFieldFundTotalStart.reset();
        this._numberFieldFundTotalEnd.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Project_Fund, Ext.Panel, {});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Statistic = function(){
    this._numberFieldAwardCountStart = new Ext.form.NumberField({
        fieldLabel: '奖励数目',
        width: 120
    });
    this._numberFieldAwardCountEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120
    });
    this._numberFieldPaperCountStart = new Ext.form.NumberField({
        fieldLabel: '论文总数',
        width: 120
    });
    this._numberFieldPaperCountEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120
    });
    this._NumberFieldPatentCountStart = new Ext.form.NumberField({
        fieldLabel: '专利总数',
        width: 120
    });
    this._NumberFieldPatentCountEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120
    });
    this._numberFieldProjectCountStart = new Ext.form.NumberField({
        fieldLabel: '项目数目',
        width: 120
    });
    this._numberFieldProjectCountEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120
    });
    this._numberFieldFundCountStart = new Srims.component.MoneyField({
        fieldLabel: '经费数额',
        width: 120
    });
    this._numberFieldFundCountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120
    });
    this._checkboxIsFundTotalOrProjectCount = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '项目数目与经费数额是“或”的关系'
    });
    
    Srims.experts.ExpertQueryPanel_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '统计条件',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 230,
                items: [this._numberFieldProjectCountStart, this._numberFieldFundCountStart, this._numberFieldPaperCountStart, this._numberFieldAwardCountStart, this._NumberFieldPatentCountStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 20,
                width: 180,
                items: [this._numberFieldProjectCountEnd, this._numberFieldFundCountEnd, this._numberFieldPaperCountEnd, this._numberFieldAwardCountEnd, this._NumberFieldPatentCountEnd]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 270,
                items: [this._checkboxIsFundTotalOrProjectCount]
            })]
        })]
    }))
    this.buildParams = function(params){
        params.awardCountStart = this._numberFieldAwardCountStart.getValue();
        params.awardCountEnd = this._numberFieldAwardCountEnd.getValue();
        params.paperCountStart = this._numberFieldPaperCountStart.getValue();
        params.paperCountEnd = this._numberFieldPaperCountEnd.getValue();
        params.patentCountStart = this._NumberFieldPatentCountStart.getValue();
        params.patentCountEnd = this._NumberFieldPatentCountEnd.getValue();
        params.projectCountStart = this._numberFieldProjectCountStart.getValue();
        params.projectCountEnd = this._numberFieldProjectCountEnd.getValue();
        params.fundCountStart = this._numberFieldFundCountStart.getMoney();
        params.fundCountEnd = this._numberFieldFundCountEnd.getMoney();
        params.isFundTotalOrProjectCount = this._checkboxIsFundTotalOrProjectCount.checked ? "true" : "";
    }
    this.clearParams = function(){
        this._numberFieldAwardCountStart.reset();
        this._numberFieldAwardCountEnd.reset();
        this._numberFieldPaperCountStart.reset();
        this._numberFieldPaperCountEnd.reset();
        this._NumberFieldPatentCountStart.reset();
        this._NumberFieldPatentCountEnd.reset();
        this._numberFieldProjectCountStart.reset();
        this._numberFieldProjectCountEnd.reset();
        this._numberFieldFundCountStart.reset();
        this._numberFieldFundCountEnd.reset();
        this._checkboxIsFundTotalOrProjectCount.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Statistic, Ext.Panel, {});

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.SexType = function() {
}
Srims.experts.SexType.store = [['Man', '男'], ['Women', '女']];

Srims.experts.SexType.render = function(v) {
    return v == 'Man' ? '男' : '女';
}

if (!Srims.component)
    Ext.namespace('Srims.component');


Srims.component.RadioGroup = Ext.extend(Ext.form.RadioGroup, {
    getName: function() {
        return this.items.first().getName();
    },
    getValue: function() {
        var v;
        this.items.each(function(item) {
            v = item.getRawValue();
            return !item.getValue();
        });
        return v;
    },
    setValue: function(v) {
        this.items.each(function(item) {
            item.setValue(item.getRawValue() == v);
        });
    },
    getRadio: function(i) {
        return this.items.get(i);
    }



});
Srims.component.RadioGroup.StoreFunction = function(nameString, expert, isShow) {
    var items = [{
        readOnly: isShow == true ? true : false,
        boxLabel: '是',
        name: nameString,
        inputValue: true,
        checked: isShow == true ? true : (expert.get(nameString) == 'True' ? true : false)
    }, {
        readOnly: isShow == true ? true : false,
        boxLabel: '否',
        name: nameString,
        inputValue: false,
        checked: expert.get(nameString) == 'False' ? true : false
    }, {
        readOnly: isShow == true ? true : false,
        boxLabel: '未知',
        name: nameString,
        inputValue: null,
        checked: expert.get(nameString) != 'True' && expert.get(nameString) != 'False' ? true : false
}];
        return items;
    }

    Srims.component.RadioGroup.SexStoreFunction = function(nameString, expert, isShow) {
        var items = [{
            readOnly: isShow == true ? true : false,
            boxLabel: '男',
            name: nameString,
            inputValue: 'Man',
            checked: expert.get(nameString) == 'Man' ? true : false
        }, {
            readOnly: isShow == true ? true : false,
            boxLabel: '女',
            name: nameString,
            inputValue: 'Woman',
            checked: expert.get(nameString) == 'Woman' ? true : false
}];
            return items;
        }
        Srims.component.RadioGroup.ProjectRankStoreFunction = function() {
            var items = [{
                boxLabel: '横向',
                name: 'ProjectRank',
                inputValue: 'true'
            }, {
                boxLabel: '纵向',
                name: 'ProjectRank',
                inputValue: 'false'
}];
                return items;
            }

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertEditPanel = function(id, expert) {

    this._id = id;
    this._expert = expert;
    this._title = '新建专家';
    var isNew = expert.isNew();
    var emptyTextField = '';

    this._basicForm = new Srims.experts.ExpertEditPanel_Basic(expert, isNew);

    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        panel: this,
        handler: function() {
            var panel = this.panel;
            panel.clearParams();
        }
    });
    this._buttonCancel = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        panel: this,
        handler: function() {
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });
    Srims.experts.ExpertEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        buttonAlign: 'center',
        title: this._title,
        iconCls: 'icon-expert-new',
        items: [this._basicForm],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancel]
    });

    //method
    this.assignValues = function() {
        this._basicForm.assignValues();
    }
    this.clearParams = function() {
        this._basicForm.clearParams();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._basicForm.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var expert = this._expert;
        var isNew = true;

        expert.beginEdit();
        this.assignValues();
        expert.commit();
        expert.data.birthdayValue = expert.data.birthday.format("Y-m-d H:i:s");

        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/SaveAddExpert',
            params: expert.data,
            scope: this,
            success: function(response) {
                var expert = this._expert;
                delete expert.data.birthdayValue;
                Srims.WorkSpace.getWorkSpace().remove(this);

                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.experts.ExpertXmlReader()
                });               
                var newExpert = store.getAt(0);
                Srims.experts.ExpertAction.showExpert(newExpert, null);
            }
        });
    }
    this.validateNumberIsExist = function() {
        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/GetExpertWithSameNumber',
            params: {
                number: this._basicForm._textFieldNumber.getValue()
            },
            scope: this,
            success: function(response) {
                this._onValidateNumberIsExist(response, this);
            }
        });
    }
    this._onValidateNumberIsExist = function(response, panel) {
        if (parseInt(response.responseText) > 0) {
            Ext.MessageBox.confirm('职工号重复', '目前已存在该职工号，请重新输入！', function(buttonId) {
                if (buttonId == 'yes') {
                    this._buttonSave.setText('保 存');
                    this._buttonSave.enable();
                }
                else {
                    Srims.WorkSpace.getWorkSpace().remove(panel);
                }
            }, this);
        }
        else {
            this.save();
        }
    }
    //event
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;

        if (!panel.isValid(false, emptyTextField))
            return;

        button.setText('正在保存');
        button.disable();

        panel.validateNumberIsExist();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);

}
Ext.extend(Srims.experts.ExpertEditPanel, Ext.Panel, {});


if (!Srims.experts)
    Ext.namespace('Srims.experts');

//添加专家的时候，仅编辑专家的以下信息；其它信息待添加完后再编辑。
Srims.experts.ExpertEditPanel_Basic = function(expert, isNew) {
    this._expert = expert;
    this._textFieldNumber = new Ext.form.NumberField({
        fieldLabel: '工作证号',
        allowBlank: false,
        regex: /^20\d{5}$/,
        allowDecimals: false,
        allowNegative: false,
        width: 200
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '姓名',
        allowBlank: false,
        width: 200
    });
    this._textFieldNameSpell = new Ext.form.TextField({
        fieldLabel: '姓名拼音缩写',
        allowBlank: false,
        width: 200
    });
    this._comboBoxSex = new Ext.form.ComboBox({
        fieldLabel: '性别',
        store: Srims.experts.SexType.store,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 200,
        width: 184
    });
    this._dateFieldBirthday = new Ext.form.DateField({
        fieldLabel: '出生日期',
        allowBlank: false,
        width: 200
    });
    this._radioIsOnjob = new Srims.component.RadioGroup({
        fieldLabel: '是否在职',
        allowBlank: false,
        items: Srims.component.RadioGroup.StoreFunction('isOnjob', expert, false)
    });
    this._radioIsChinese = new Srims.component.RadioGroup({
        fieldLabel: '是否中国国籍',
        allowBlank: false,
        items: Srims.component.RadioGroup.StoreFunction('isChinese', expert, false)
    });
    this._numberFieldMobilePhone = new Ext.form.NumberField({
        fieldLabel: '移动电话',
        regex: /^1[3,5]\d{9}$/,
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 200
    });
    this._fieldCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        allowBlank: false,
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 200
    });
        this._fieldCollege2 = new Srims.component.EntityComboBox({
        fieldLabel: '双聘单位',
        allowBlank: false,
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 200
    });
    this._fieldDepartment = new Srims.component.EntityComboBox({
        fieldLabel: '所属部门',
        allowBlank: false,
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllDepartment'),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 200
    });

    var items1 = [this._textFieldName, this._textFieldNameSpell, this._fieldCollege,this._fieldCollege2, this._fieldDepartment, this._radioIsChinese];
    var items2 = [this._comboBoxSex, this._dateFieldBirthday, this._textFieldNumber, this._numberFieldMobilePhone, this._radioIsOnjob];

    Srims.experts.ExpertEditPanel_Basic.superclass.constructor.call(this, {
        title: '基本信息',
        Height: 350,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:300px',
                items: items1
            }), new Ext.Panel({
                width: 450,
                style: 'width:300px',
                layout: 'form',
                items: items2
            })]
        })]
    });

    this.assignValues = function() {
        this._expert.set('name', this._textFieldName.getValue());
        this._expert.set('nameSpell', this._textFieldNameSpell.getValue());
        this._expert.set('sex', this._comboBoxSex.getValue());
        this._expert.set('number', this._textFieldNumber.getValue());
        this._expert.set('birthday', this._dateFieldBirthday.getValue());
        this._expert.set('collegeID', this._fieldCollege.getValue());
         this._expert.set('college2ID', this._fieldCollege2.getValue());
        this._expert.set('departmentID', this._fieldDepartment.getValue());
        this._expert.set('isOnjob', this._radioIsOnjob.getValue());
        this._expert.set('isChinese', this._radioIsChinese.getValue());
        this._expert.set('mobilePhone', this._numberFieldMobilePhone.getValue());
    }
    this.clearParams = function() {
        this._textFieldName.reset();
        this._comboBoxSex.reset();
        this._textFieldNumber.reset();
        this._dateFieldBirthday.reset();
        this._fieldCollege.reset();
         this._fieldCollege2.reset();
        this._fieldDepartment.reset();
        this._textFieldNameSpell.reset();
        this._radioIsOnjob.reset();
        this._numberFieldMobilePhone.reset();
        this._radioIsChinese.reset();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._textFieldName.isValid(preventMark) && result;
        result = this._comboBoxSex.isValid(preventMark) && result;
        result = this._textFieldNumber.isValid(preventMark) && result;
        result = this._dateFieldBirthday.isValid(preventMark) && result;
        result = this._fieldCollege.isValid(preventMark) && result;
        result = this._fieldCollege2.isValid(preventMark) && result;
        result = this._fieldDepartment.isValid(preventMark) && result;
        result = this._textFieldNameSpell.isValid(preventMark) && result;
        result = this._radioIsOnjob.isValid(preventMark) && result;
        result = this._numberFieldMobilePhone.isValid(preventMark) && result;
        result = this._radioIsChinese.isValid(preventMark) && result;
        return result;
    }



}
Ext.extend(Srims.experts.ExpertEditPanel_Basic, Ext.form.FormPanel);
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLinkWayEditWindow = function(panelId, expert) {
    this._expert = expert;
    this._params = {};
    this._id = panelId;

    this._linkWayForm = new Srims.experts.ExpertLinkWayEditWindow_LinkWayForm(expert);

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

    Srims.experts.ExpertLinkWayEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '编辑专家联系方式',
        iconCls: 'icon-linkWay-edit',
        width: 600,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._linkWayForm],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancle]
    });

    //method
    this.assignValues = function() {
        this._linkWayForm.assignValues();
    }
    this.clearParams = function() {
        this._linkWayForm.clearParams();
    }

    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        expert.beginEdit();
        this.assignValues();
        expert.commit();

        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/SaveExpertLinkWay',
            params: award.data,
            scope: this,
            success: function(response) {
                //                var store = new Ext.data.Store({
                //                    data: response.responseXML,
                //                    reader: new Srims.awards.AwardXmlReader()
                //                });
                //                var newAward = store.getAt(0);
                //                if (isNew) {
                //                    //新建完，列表刷新，显示新建奖励
                //                    Srims.WorkSpace.getWorkSpace().remove(this);
                //                    Srims.awards.listAward(false, false);
                //                    Srims.awards.showAward(newAward);
                //                }
                //                else {
                //                    //编辑完，列表刷新，显示奖励刷新
                //                    var panelID = 'AwardShowPanel' + award.get('id');
                //                    Srims.WorkSpace.getWorkSpace().remove(this);
                //                    Srims.awards.listAward(false, false);
                //                    if (Ext.getCmp(panelID)) Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                //                    Srims.awards.showAward(newAward, store);
                //                }
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
Ext.extend(Srims.experts.ExpertLinkWayEditWindow, Ext.Window);
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLinkWayEditWindow_LinkWayForm = function(expert) {
    this._expert = expert;
    var emailExpr = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    this._numberFieldMobilePhone = new Ext.form.NumberField({
        fieldLabel: '    手机',
        value: expert.get('mobilePhone'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._textFieldFax = new Ext.form.TextField({
        fieldLabel: '    传真',
        value: expert.get('fax'),
        width: 160
    });
    this._numberFieldZip = new Ext.form.NumberField({
        fieldLabel: '    邮编',
        value: expert.get('zip'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });

    this._numberFieldOfficePhone = new Ext.form.NumberField({
        fieldLabel: '办公电话',
        value: expert.get('officePhone'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._numberFieldHomePhone = new Ext.form.NumberField({
        fieldLabel: '家庭电话',
        value: expert.get('homePhone'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._textFieldEmail = new Ext.form.TextField({
        fieldLabel: '电子邮件',
        value: expert.get('email'),
        regex: emailExpr,
        regexText: '邮箱格式有误，请重新输入',
        width: 160
    });

    this._textFieldAddress = new Ext.form.TextArea({
        fieldLabel: '通信地址',
        value: expert.get('address'),
        scroll: true,
        height: 50,
        width: 450
    });

    //constructor
    var columnOneItems = [this._numberFieldMobilePhone, this._textFieldFax, this._numberFieldZip];
    var columnTwoItems = [this._numberFieldOfficePhone, this._numberFieldHomePhone, this._textFieldEmail];

    Srims.experts.ExpertLinkWayEditWindow_LinkWayForm.superclass.constructor.call(this, {
        title: '联系方式信息',
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        width: 576,
        items: [new Ext.Panel({
            widht: 570,
            layout: 'column',
            items: [new Ext.Panel({
                width: 290,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                items: columnTwoItems
            })]
        }), this._textFieldAddress]
    });

    //method
    this.assginValues = function() {
        this._expert.set('mobilePhone', this._numberFieldMobilePhone.getValue());
        this._expert.set('fax', this._textFieldFax.getValue());
        this._expert.set('officePhone', this._numberFieldOfficePhone.getValue());
        this._expert.set('zip', this._numberFieldZip.getValue());
        this._expert.set('homePhone', this._numberFieldHomePhone.getValue());
        this._expert.set('email', this._textFieldEmail.getValue());
        this._expert.set('address', this._textFieldAddress.getValue());
    }
    this.clearParams = function() {
        this._numberFieldMobilePhone.reset();
        this._textFieldFax.reset();
        this._numberFieldOfficePhone.reset();
        this._numberFieldZip.reset();
        this._numberFieldHomePhone.reset();
        this._textFieldEmail.reset();
        this._textFieldAddress.reset();
    }  
}

Ext.extend(Srims.experts.ExpertLinkWayEditWindow_LinkWayForm, Ext.FormPanel);


if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_TextField = function(id, expert, panel, item) {
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;
    var idCardNumberExp = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
    var emailExp = /\w+([-+.]\w+)*@\w+([-.]\w+)+/;
    //var emailExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    var phoneExp = /(\d{3}-\d{8})$|(\d{4}-\d{8})$|(\d{4}-\d{7})$|(^\d{11}|^\d{12})$/;
    var mobileExp = /^1\d{10}$/;
    var zipExp = /^\d{6}$/;

    this._fieldNewValue = new Ext.form.TextField({
        fieldLabel: item[0].fieldLabel,
        value: item[0].getValue(),
        allowBlank: item[3] == 'NameSpell' || item[3] == 'MobilePhone' ? false : true,
        width: 300
    });

    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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

    Srims.experts.ExpertEdit_Administrator_TextField.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 400,
        labelWidth: 60,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue],
        buttons: [this._buttonSave, this._buttonCancle]
    });

    this.assignValues = function() {
        this._expert.set(this._item[3], this._fieldNewValue.getValue());
    }
    this.clearParams = function() {
        this._fieldNewValue.reset();
    }

    this.isValid = function(preventMark, item) {
        var result = true;
        result = this._fieldNewValue.isValid(preventMark) && result;
        if (item[3] == 'NameSpell')
            result = this._ValidateNameSpell() && result;
        else
            if (item[3] == 'IDCardNumber')
            result = this._ValidateIDdCardNumber() && result;
        else
            if (item[3] == 'Email')
            result = this._ValidateEmail() && result;
        else
            if (item[3] == 'OfficePhone' || item[3] == 'HomePhone')
            result = this._ValidatePhone() && result;
        else
            if (item[3] == 'MobilePhone')
            result = this._ValidateMobilePhone() && result;
        else
            if (item[3] == 'Zip')
            result = this._ValidateZip() && result;
        return result;
    }
    this._ValidateZip = function() {
        if (!zipExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '邮编错误',
                msg: '您输入的邮编有误，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidatePhone = function() {
        if (!mobileExp.test(this._fieldNewValue.getValue()) && !phoneExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '电话号码错误',
                msg: '您输入的电话号码有误，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidateMobilePhone = function() {
        if (!mobileExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '手机号码错误',
                msg: '您输入手机号码有误，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidateNameSpell = function() {
        if (this._fieldNewValue.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: '名称拼音缩写错误',
                msg: '您输入的只有空格，请重新输入有意义的缩写。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidateIDdCardNumber = function() {
        if (!idCardNumberExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '身份证号码错误',
                msg: '您输入的身份证号码有误，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidateEmail = function() {
        if (!emailExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '邮箱地址错误',
                msg: '您输入邮箱地址的格式有误，请重新输入正确的邮箱地址。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }

    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._fieldNewValue.getValue();
        var data = {};
        data[item[3]] = newValue;
        data['expertID'] = expert.get('id');
        data['paramName'] = item[3];
        data['field'] = 'TextField';

        expert.beginEdit();
        this.assignValues();
        expert.commit();
        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response) {
                //编辑完，列表刷新，列表刷新
                item[0].getEl().dom.value = newValue;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        var item = button.item;

        if (!window.isValid(false, item))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);


}

Ext.extend(Srims.experts.ExpertEdit_Administrator_TextField, Ext.Window);


if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_TextArea = function(id, expert, panel, item) {
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;

    this._fieldNewValue = new Ext.form.TextArea({
        fieldLabel: item[0].fieldLabel,
        value: item[0].getValue(),
        height: 120,
        width: 441
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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

    Srims.experts.ExpertEdit_Administrator_TextArea.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 600,
        labelWidth: 60,
        height: 220,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue],
        buttons: [this._buttonSave, this._buttonCancle]
    });

    this.assignValues = function() {
        this._expert.set(this._item[3], this._fieldNewValue.getValue());
    }
    this.clearParams = function() {
        this._fieldNewValue.reset();
    }

    this.isValid = function(preventMark, item) {
        var result = true;
        return result;
    }
    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._fieldNewValue.getValue();
        var data = {};
        data['expertID'] = expert.get('id');
        data[item[3]] = newValue;
        data['paramName'] = item[3];
        data['field'] = 'TextArea';

        expert.beginEdit();
        this.assignValues();
        expert.commit();

        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response) {
                //编辑完，列表刷新，列表刷新     
                item[0].getEl().dom.value = newValue;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        var item = button.item;

        if (!window.isValid(false, item))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);


}

Ext.extend(Srims.experts.ExpertEdit_Administrator_TextArea, Ext.Window);


if (!Srims.experts) 
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_NumberField = function(id, expert, panel, item){
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;
    
    this._fieldNewVocationLevel = new Ext.form.NumberField({
        fieldLabel: item[0].fieldLabel,
        allowDecimals: false,
        allowNegative: false,
        maxValue: 14,
        minValue: 1,
        width: 300
    });
    this._fieldPostLevel = new Ext.form.NumberField({
        fieldLabel: item[0].fieldLabel,
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        width: 300
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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
    this._getItem = function(){
        if (this._item[3] == 'PostLevel') 
            return this._fieldPostLevel;
        else 
            return this._fieldNewVocationLevel;
    }
    
    Srims.experts.ExpertEdit_Administrator_NumberField.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 400,
        labelWidth: 60,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._getItem()],
        buttons: [this._buttonSave, this._buttonCancle]
    });
    
    this.assignValues = function(){
        this._expert.set(this._item[3], this._getItem().getValue());
    }
    this.clearParams = function(){
        this._getItem().reset();
    }
    
    this.isValid = function(preventMark, item){
        var result = true;
        result = this._getItem().isValid(preventMark) && result;
        return result;
    }
    
    this.save = function(){
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._getItem().getValue();
        var data = {};
        data['expertID'] = expert.get('id');
        data[item[3]] = newValue;
        data['paramName'] = item[3];
        data['field'] = 'NumberField';
        
        expert.beginEdit();
        this.assignValues();
        expert.commit();
        
        Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response){
                //编辑完，列表刷新，列表刷新     
                item[0].getEl().dom.value = newValue;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
            
        });
    }
    
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        var item = button.item;
        
        if (!window.isValid(false, item)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
    
    
}

Ext.extend(Srims.experts.ExpertEdit_Administrator_NumberField, Ext.Window);


if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_DateField = function(id, expert, panel, item) {
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;

    this._fieldNewValue = new Ext.form.DateField({
        fieldLabel: item[0].fieldLabel,
        allowBlank: item[3] == 'Birthday' ? false : true,
        width: 300
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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

    Srims.experts.ExpertEdit_Administrator_DateField.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 400,
        labelWidth: 60,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue],
        buttons: [this._buttonSave, this._buttonCancle]
    });

    this.assignValues = function() {
        this._expert.set(this._item[3], this._fieldNewValue.getValue());
    }
    this.clearParams = function() {
        this._fieldNewValue.reset();
    }

    this.isValid = function(preventMark, item) {
        var result = true;
        result = this._fieldNewValue.isValid(preventMark) && result;
        return result;
    }

    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._fieldNewValue.getValue();
        var data = {};
        data['expertID'] = expert.get('id');
        data[item[3]] = newValue.format("Y-m-d H:i:s");
        data['field'] = 'DateField';
        data['paramName'] = item[3];

        expert.beginEdit();
        this.assignValues();
        expert.commit();

        Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response) {
                item[0].getEl().dom.value = Date.render(newValue);
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        var item = button.item;

        if (!window.isValid(false, item))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);


}

Ext.extend(Srims.experts.ExpertEdit_Administrator_DateField, Ext.Window);


if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_EntityComboBox = function(id, expert, panel, item) {
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;
    if (item[3] == 'College')
        this._store = new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges');
    else
        this._store = new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllDepartment');

    this._fieldNewValue = new Srims.component.EntityComboBox({
        fieldLabel: item[0].fieldLabel,
        allowBlank: false,
        store: this._store,
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 300
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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

    Srims.experts.ExpertEdit_Administrator_EntityComboBox.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 400,
        labelWidth: 60,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue],
        buttons: [this._buttonSave, this._buttonCancle]
    });

    this.assignValues = function() {
        this._expert.set(this._item[3], this._fieldNewValue.getValue());
    }
    this.clearParams = function() {
        this._fieldNewValue.reset();
    }

    this.isValid = function(preventMark, item) {
        var result = true;
        result = this._fieldNewValue.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._fieldNewValue.getText();
        var data = {};
        data[item[3]] = newValue;
        data[item[4]] = this._fieldNewValue.getValue();
        data['expertID'] = expert.get('id');
        data['paramName'] = item[3];
        data['paramID'] = item[4];
        data['field'] = 'EntityComboBox';

        expert.beginEdit();
        this.assignValues();
        expert.commit();

        Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response) {
                //编辑完，列表刷新，列表刷新
                item[0].getEl().dom.value = newValue;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        var item = button.item;

        if (!window.isValid(false, item))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);


}

Ext.extend(Srims.experts.ExpertEdit_Administrator_EntityComboBox, Ext.Window);


if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertUploadWindow = function(id, expert) {

    this._id = id;
    this._expert = expert;

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
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
                expertID: window._expert.get('id')
            }

            window._formPanelExpertPhoto.getForm().submit({
                params: saveParams,
                url: Srims.service.experts.ExpertService + '/UpLoadImage',
                waitMsg: '正在上传专家照片',
                scope: this,
                success: function(form, action) {
                    var jsonData = Ext.util.JSON.decode(action.response.responseText);
                    var photoPath = jsonData.guid;

                    if (Ext.getDom('SpanExpertImg_' + expert.get('id')))
                        Ext.getDom('SpanExpertImg_' + expert.get('id')).innerHTML = '';

                    Ext.getDom('ImgExpert_' + expert.get('id')).src = '../' + photoPath;

                    //执行其他操作

                    window.close();
                }
            });
        }
    });
    this._fieldAbstract = new Ext.form.Field({
        fieldLabel: '编辑字段',
        value: '专家照片',
        readOnly: true,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadContract',
        fieldLabel: '上传照片',
        width: 160,
        emptyText: '请选择要上传的专家照片',
        allowBlank: false,
        fileTypes: ['jpg', 'gif'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelExpertPhoto = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fieldAbstract, this._fileUploadField]
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;

        return result;
    }

    Srims.experts.ExpertUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传专家照片',
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
        items: [this._formPanelExpertPhoto],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.experts.ExpertUploadWindow, Ext.Window, {})

if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_NoticeTextComboBox = function(id, expert, panel, item) {
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;

    this._fieldNewValue = new Srims.component.NoticeTextComboBox({
        fieldLabel: item[0].fieldLabel,
        allowBlank: true,
        emptyText: '请选择',
        noticeTextType: item[4],
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        width: 300
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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

    Srims.experts.ExpertEdit_Administrator_NoticeTextComboBox.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 400,
        labelWidth: 60,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue],
        buttons: [this._buttonSave, this._buttonCancle]
    });

    this.assignValues = function() {
        this._expert.set(this._item[3], this._fieldNewValue.getValue());
    }
    this.clearParams = function() {
        this._fieldNewValue.reset();
    }

    this.isValid = function(preventMark, item) {
        var result = true;
        result = this._fieldNewValue.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._fieldNewValue.getValue();
        var data = {};
        data['expertID'] = expert.get('id');
        data[item[3]] = newValue;
        data['NoticeTextCBox'] = newValue;
        data['field'] = 'NoticeTextCBox';
        data['paramName'] = item[3];

        expert.beginEdit();
        this.assignValues();
        expert.commit();

        Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response) {
                //编辑完，列表刷新，列表刷新
                item[0].getEl().dom.value = newValue;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        var item = button.item;

        if (!window.isValid(false, item))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);


}

Ext.extend(Srims.experts.ExpertEdit_Administrator_NoticeTextComboBox, Ext.Window);


if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_ComboBox = function(id, expert, panel, item) {
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;

    this._fieldNewValue = new Ext.form.ComboBox({
        fieldLabel: item[0].fieldLabel,
        allowBlank: item[3] == 'IsDoctorDirector' ? false : true,
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        store: item[3] == 'Sex' ? Srims.experts.SexType.store : Srims.experts.BoolStore,
        width: 300
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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

    Srims.experts.ExpertEdit_Administrator_ComboBox.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 400,
        labelWidth: 60,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue],
        buttons: [this._buttonSave, this._buttonCancle]
    });

    this.assignValues = function() {
        this._expert.set(this._item[3], this._fieldNewValue.getValue());
    }
    this.clearParams = function() {
        this._fieldNewValue.reset();
    }

    this.isValid = function(preventMark, item) {
        var result = true;
        result = this._fieldNewValue.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._fieldNewValue.getValue();
        var data = {};
        data[item[3]] = newValue;
        data['expertID'] = expert.get('id');
        data['field'] = 'ComboBox';
        data['paramName'] = item[3];
        data['valueType'] = 'bool';

        expert.beginEdit();
        this.assignValues();
        expert.commit();

        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response) {
                //编辑完，列表刷新，列表刷新
                item[0].getEl().dom.value = item[3] == 'Sex' ? Srims.experts.SexType.render(newValue) : Srims.experts.BoolStore.Render(newValue);
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        var item = button.item;

        if (!window.isValid(false, item))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);


}

Ext.extend(Srims.experts.ExpertEdit_Administrator_ComboBox, Ext.Window);

Srims.experts.BoolStore = [['true', '是'], ['false', '否'], ['', '未知']];
Srims.experts.BoolStore.Render = function(v) {
    if (v == 'true')
        return '是';
    if (v == 'false')
        return '否';
    if (v == '')
        return '未知';
}

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertEditPanel_MessagePanel = function() {
    Srims.experts.ExpertEditPanel_MessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: true,
        html: '<span style="color:#FF0000">注意：您已经进入了编辑状态。您可以对‘基本信息’中未进行加灰处理的字段进行编辑，点击您想编辑的字段，即可在弹出的编辑框完成编辑。点击‘结束编辑’按钮退出编辑。</span>'
    });
}
Ext.extend(Srims.experts.ExpertEditPanel_MessagePanel, Ext.Panel);
if (!Srims.experts) 
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_LinkedEntityComboBox = function(id, expert, panel, item){
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;
    
    this._fieldNewValueFirst = new Srims.component.EntityComboBox({
        fieldLabel: item[3][0].fieldLabel,
        store: new Srims.common.SubjectFirstLevelStoreForApply(),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 300
    });
    this._fieldNewValueSecond = new Srims.component.EntityComboBox({
        fieldLabel: item[3][1].fieldLabel,
        store: new Srims.common.SubjectSecondLevelStoreForApply(),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        mode: 'local',
        width: 300
    });
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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
    
    Srims.experts.ExpertEdit_Administrator_LinkedEntityComboBox.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 500,
        labelWidth: 120,
        height: 185,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValueFirst, this._fieldNewValueSecond],
        buttons: [this._buttonSave, this._buttonCancle]
    });
    
    this.clearParams = function(){
        this._fieldNewValueFirst.reset();
        this._fieldNewValueSecond.disable();
        this._fieldNewValueSecond.setValue(undefined);
        this._fieldNewValueSecond.store.removeAll();
    }
    
    this.isValid = function(preventMark, item){
        var result = true;
        result = this._fieldNewValueFirst.isValid(preventMark) && result;
        result = this._fieldNewValueSecond.isValid(preventMark) && result;
        return result;
    }
    
    //学科的级联选择
    this._fieldNewValueFirst.comboBoxSecondLevelSubject = this._fieldNewValueSecond;
    var idLable = item[3];
    if (expert.get(idLable) != undefined && expert.get(idLable) != '') {
        this._fieldNewValueSecond.store.load({
            params: {
                firstLevelSubjectId: expert.get(idLable)
            }
        });
    }
    else 
        this._fieldNewValueSecond.disable();
    this._fieldNewValueFirst.comboBoxSecondLevelSubject = this._fieldNewValueSecond;
    //处理学科的联动
    this.onComboBoxFirstLevelSubject_Select = function(comboBox){
        var firstLevelSubjectId = comboBox.getValue();
        var comboBoxSecondLevelSubject = comboBox.comboBoxSecondLevelSubject;
        if (firstLevelSubjectId == undefined) {
            return;
        }
        comboBoxSecondLevelSubject.enable();
        comboBoxSecondLevelSubject.setValue(undefined);
        comboBoxSecondLevelSubject.store.load({
            params: {
                firstLevelSubjectId: firstLevelSubjectId
            }
        });
    }
    //处理一级学科为空的情况
    this.onComboBoxFirstLevelSubject_Change = function(comboBox){
        var firstLevelSubjectId = comboBox.getValue();
        var comboBoxSecondLevelSubject = comboBox.comboBoxSecondLevelSubject;
        if (firstLevelSubjectId != undefined) {
            return;
        }
        comboBoxSecondLevelSubject.disable();
        comboBoxSecondLevelSubject.setValue(undefined);
        comboBoxSecondLevelSubject.store.removeAll();
    }
    this._fieldNewValueFirst.on('select', this.onComboBoxFirstLevelSubject_Select);
    this._fieldNewValueFirst.on('change', this.onComboBoxFirstLevelSubject_Change);
    
    //保存
    this.save = function(){
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var showValue1 = this._fieldNewValueFirst.getText();
        var showValue2 = this._fieldNewValueSecond.getText();
        
        var data = {};
        data[item[3][2]] = this._fieldNewValueSecond.getText();
        data[item[3][3]] = this._fieldNewValueSecond.getValue();
        data['paramID'] = item[3][3];
        data['paramName'] = item[3][2];
        data['expertID'] = expert.get('id');
        data['field'] = 'LinkEntityCB';
        
        expert.beginEdit();
        expert.commit();
        
        Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response){
                //编辑完，列表刷新，列表刷新
                item[3][0].getEl().dom.value = showValue1;
                item[3][1].getEl().dom.value = showValue2;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }
    
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        var item = button.item;
        if (!window.isValid(false, item)) 
            return;
        button.setText('正在保存');
        button.disable();
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
    
    
    
    
}

Ext.extend(Srims.experts.ExpertEdit_Administrator_LinkedEntityComboBox, Ext.Window);


if (!Srims.experts) 
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_LanguageNoticeTextComboBox = function(id, expert, panel, item){
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;
    
    this._fieldNewValue = new Srims.component.NoticeTextComboBox({
        fieldLabel: item[0].fieldLabel,
        noticeTextType: 'ForeignLanguage',
        emptyText: '请选择',
        displayField: 'value',
        triggerAction: 'all',
        editable: true,
        width: 300
    });
    this._fieldNewValueLevel = new Srims.component.NoticeTextComboBox({
        fieldLabel: item[4][1].fieldLabel,
        noticeTextType: 'LanguageLevel',
        emptyText: '请选择',
        displayField: 'value',
        triggerAction: 'all',
        editable: true,
        width: 300
    });
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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
    
    Srims.experts.ExpertEdit_Administrator_LanguageNoticeTextComboBox.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 500,
        labelWidth: 120,
        height: 185,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue, this._fieldNewValueLevel],
        buttons: [this._buttonSave, this._buttonCancle]
    });
    
    this.assignValues = function(){
    }
    this.clearParams = function(){
        this._fieldNewValue.reset();
        this._fieldNewValueLevel.disable();
        this._fieldNewValueLevel.setValue(undefined);
    }
    
    this.isValid = function(preventMark, item){
        var result = true;
        result = this._fieldNewValue.isValid(preventMark) && result;
        result = this._fieldNewValueLevel.isValid(preventMark) && result;
        return result;
    }
    
    //保存
    this.save = function(){
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue1 = this._fieldNewValue.getValue();
        var newValue2 = this._fieldNewValueLevel.getValue();
        var data = {};
        data[item[4][2]] = newValue1;
        data[item[4][3]] = newValue2;
        data['language'] = item[4][2];
        data['level'] = item[4][3];
        data['expertID'] = expert.get('id');
        data['field'] = 'LanguageNoticeTextCB';
        //data['paramName'] = item[3];
        
        expert.beginEdit();
        this.assignValues();
        expert.commit();
        
        Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response){
                //编辑完，列表刷新，列表刷新
                item[4][0].getEl().dom.value = newValue1;
                item[4][1].getEl().dom.value = newValue2;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }
    
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        var item = button.item;
        if (!window.isValid(false, item)) 
            return;
        button.setText('正在保存');
        button.disable();
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
    this._fieldNewValue.languageLevel = this._fieldNewValueLevel;
    
    if (this._fieldNewValue.getValue() != null && this._fieldNewValue.getValue() != undefined && this._fieldNewValue.getValue() != '') 
        this._fieldNewValueLevel.setVisible(true);
    this._fieldNewValueLevel.disable();
    //select event
    this._onFieldNewValue_select = function(comboBox){
        var language = comboBox.getValue();
        var level = comboBox.languageLevel;
        if (language == undefined) 
            return;
        level.enable();
        level.setValue(undefined);
    }
    this._fieldNewValue.on('select', this._onFieldNewValue_select);
    //change event
    this._onFieldNewValue_change = function(comboBox){
        var language = comboBox.getValue();
        var level = comboBox.languageLevel;
        if (language != undefined) 
            return;
        level.disable();
        level.setValue(undefined);
    }
    this._fieldNewValue.on('change', this._onFieldNewValue_change);
}

Ext.extend(Srims.experts.ExpertEdit_Administrator_LanguageNoticeTextComboBox, Ext.Window);


if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistory = Ext.data.Record.create([{
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
    name: 'propertyName',
    type: 'string',
    mapping: 'PropertyName'
}, {
    name: 'propertyValueType',
    type: 'string',
    mapping: 'PropertyValueType'
}, {
    name: 'propertyValue',
    type: 'string',
    mapping: 'PropertyValue'
}, {
    name: 'propertyValueRender',
    type: 'string',
    mapping: 'PropertyValueRender'
}, {
    name: 'propertyOldValue',
    type: 'string',
    mapping: 'PropertyOldValue'
}, {
    name: 'hasPermission_CensorReject',
    type: 'boolean',
    mapping: 'HasPermission_CensorReject',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_CensorPass',
    type: 'boolean',
    mapping: 'HasPermission_CensorPass',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorReject',
    type: 'boolean',
    mapping: 'CanCensorReject',
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
    name: 'canCensorPass',
    type: 'boolean',
    mapping: 'CanCensorPass',
    convert: Boolean.toBoolean
}])
Srims.data.Entity.apply(Srims.experts.ExpertInfoHistory);

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.experts.ExpertInfoHistoryStore.superclass.constructor.call(this, new Srims.experts.ExpertInfoHistoryXmlReader(), load_url, params);
    }
});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.ExpertInfoHistoryXmlReader.superclass.constructor.call(this, Srims.experts.ExpertInfoHistory);
    }
});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistoryGridPanel = function(id, expertInfoHistoryStore, title, iconCls, queryParams){
    //fields
    this._store = expertInfoHistoryStore;
    this._store.gird = this;
    
    this._selections = new Ext.grid.CheckboxSelectionModel();
    
    //controls    
    this._columnModel = new Srims.experts.ExpertInfoGridGridPanel_ColumnModel(this._selections);
    this._toolbar = new Srims.experts.ExpertInfoHistoryGridPanel_ToolBar(this._store, this._selections, queryParams);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.experts.ExpertInfoHistoryGridPanel.superclass.constructor.call(this, params);
    
    this._store.load();
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var expertInfoHistory = grid.getStore().getAt(rowIndex);
        Srims.experts.ExpertAction.showExpertInfoHistory(expertInfoHistory, grid.getStore());
    }
    //event
    this.on('celldblclick', onCellDblClick);
    
}
Ext.extend(Srims.experts.ExpertInfoHistoryGridPanel, Srims.component.GridPanel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoGridGridPanel_ColumnModel = function(sm){
    Srims.experts.ExpertInfoGridGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: 'id',
        hidden: true,
        hideable: false
    }, {
        header: '专家',
        dataIndex: 'expertName',
        hidden: false
    }, {
        header: '编辑字段',
        dataIndex: 'propertyName',
        renderer: Srims.experts.ExpertInfoHistoryPropertyValueNameRender,
        hidden: false
    }, {
        header: '字段类型',
        dataIndex: 'propertyValueType',
        renderer: Srims.experts.ExpertInfoHistoryPropertyValueTypeRender,
        hidden: false
    }, {
        header: '字段旧值',
        dataIndex: 'propertyOldValue',
        hidden: false
    }, {
        header: '字段新值',
        dataIndex: 'propertyValue',
        hidden: false
    }, {
        header: '字段新值说明',
        dataIndex: 'propertyValueRender',
        hidden: false
    }]);
};
Ext.extend(Srims.experts.ExpertInfoGridGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');


Srims.experts.ExpertInfoHistoryGridPanel_ToolBar = function(store, selection, queryParams){

    this._store = store;
    this._selection = selection;
    
    //controlls
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.experts.ExpertAction.showExpertInfoHistory(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看专家历史信息</b><br/>显示专家的相关历史信息'
    })
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) {
                Ext.Msg.show({
                    title: '请选择要审核的专家信息',
                    msg: '请选择要审核的专家信息',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            
            var records = this.selection.getSelections();
            
            Ext.MessageBox.confirm('审核通过专家编辑信息', '你确定要审核通过所选择的专家编辑信息吗？', function(buttonId){
                if (buttonId == 'yes') 
                    for (var i = 0; i < records.length; i++) {
                    
                        var methodName = "/CensorExpertEditInformation";
                        Srims.experts.ExpertAction.CensorExpertInfoHistory(records[i], this.store, methodName);
                    }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过'
    })
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        panelId: this._panelId,
        selection: this._selection,
        store: this._store,
        handler: function(){
        
            if (this.selection.getCount() == 0) {
                Ext.Msg.show({
                    title: '请选择要审核的专家信息',
                    msg: '请选择要审核的专家信息',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            
            var records = this.selection.getSelections();
            
            Ext.MessageBox.confirm('审核驳回专家编辑信息', '你确定要审核驳回所选择的专家编辑信息吗？', function(buttonId){
                if (buttonId == 'yes') 
                    for (var i = 0; i < records.length; i++) {
                    
                        var methodName = "/RejectExpertEditInformation";
                        Srims.experts.ExpertAction.CensorExpertInfoHistory(records[i], this.store, methodName);
                    }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回'
    })
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新专家列表'
    })
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
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    })
    
    Srims.experts.ExpertInfoHistoryGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    })
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChange = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        var expertInfoHistory = selection.getSelected();
        
        buttonShow.setVisible(expertInfoHistory.get('hasPermission_Show'));
        buttonShow.setDisabled(!expertInfoHistory.get('canShow'));
        buttonCensorPass.setVisible(expertInfoHistory.get('hasPermission_CensorPass'));
        buttonCensorPass.setDisabled(!expertInfoHistory.get('canCensorPass'));
        buttonCensorReject.setVisible(expertInfoHistory.get('hasPermission_CensorReject'));
        buttonCensorReject.setDisabled(!expertInfoHistory.get('canCensorReject'));
    }
    
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.experts.ExpertInfoHistoryGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Ext.namespace('Srims.experts.ExpertInfoHistoryPropertyValueType');

Srims.experts.ExpertInfoHistoryPropertyValueType.String = 'Text';
Srims.experts.ExpertInfoHistoryPropertyValueType.Int = 'Int';
Srims.experts.ExpertInfoHistoryPropertyValueType.DateTime = 'DateTime';
Srims.experts.ExpertInfoHistoryPropertyValueType.Guid = 'Guid';
Srims.experts.ExpertInfoHistoryPropertyValueType.LongText = 'LongText';
Srims.experts.ExpertInfoHistoryPropertyValueType.Entity = 'Entity';
Srims.experts.ExpertInfoHistoryPropertyValueType.Boolean = 'Boolean';

Srims.experts.ExpertInfoHistoryPropertyValueTypeRender = function(value, metadata){
    switch (value) {
        case 'Text':
            return '字符串';
        case 'Int':
            return '整数';
        case 'DateTime':
            return '时间';
        case 'Guid':
            return 'Guid';
        case 'LongText':
            return '长文本';
        case 'Entity':
            return '外键';
        case 'Boolean':
            return '布尔';
        default:
            return '未知';
    }
}

Srims.experts.ExpertInfoHistoryPropertyValueTypeStore = [['Text', '字符串'], ['Int', '整数'], ['DateTime', '时间'], ['Guid', 'Guid'], ['LongText', '长文本'], ['Entity', '外键'], ['Boolean', '布尔']];

Srims.experts.ExpertInfoHistoryPropertyValueNameRender = function(value, metadata){
    switch (value) {
        case 'IsDoctorDirector':
            return '是否博导';
        case 'MobilePhone':
            return '移动电话';
        case 'OfficePhone':
            return '办公电话';
        case 'HomePhone':
            return '家庭电话';
        case 'Fax':
            return '传真';
        case 'Address':
            return '通讯地址';
        case 'Zip':
            return '邮政编码';
        case 'Email':
            return '电子邮件';
        case 'College':
            return '所在学院';
        case 'Department':
            return '所在部门';
        case 'Specialty':
            return '专长';
        case 'Photo':
            return '照片资源';
        case 'ResearchCode1':
            return '从事专业代码1';
        case 'ResearchCode2':
            return '从事专业代码2';
        case 'ResearchCode3':
            return '从事专业代码3';
        case 'Language1':
            return '外语语种1';
        case 'LanguageLevel1':
            return '熟练程度1';
        case 'Language2':
            return '外语语种2';
        case 'LanguageLevel2':
            return '熟练程度2';
        case 'SocietyPost':
            return '社会兼职';
        case 'WorkExperience':
            return '工作简历';
        case 'ResearchExperience':
            return '科研简历';
        default:
            return '未知';
    }
}
Srims.experts.editEntityTypeIsSubject = function(value){
    switch (value) {
        case 'ResearchCode1':
            return true;
        case 'ResearchCode2':
            return true;
        case 'ResearchCode3':
            return true;
        default:
            return false;
    }
}


if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistoryShowWindow = function(id, expertInfoHistory, store){

    this._id = id;
    this._expertInfoHistory = expertInfoHistory;
    this._store = store;
    
    this._buttonCensorPass = new Ext.Button({
        minWidth: 80,
        text: '审核通过',
        window: this,
        handler: function(){
            var window = this.window;
            var titile = "审核通过";
            var message = "你确定要通过此专家编辑信息吗？";
            var methodName = "/CensorExpertEditInformation";
            Srims.experts.ExpertAction.CensorExpertInfoHistory(window._expertInfoHistory, window._store, titile, message, methodName);
            window.close();
        }
    });
    this._buttonCensorReject = new Ext.Button({
        minWidth: 80,
        text: '审核驳回',
        window: this,
        handler: function(){
            var window = this.window;
            var titile = "审核驳回";
            var message = "你确定要驳回此专家编辑信息吗？";
            var methodName = "/RejectExpertEditInformation";
            Srims.experts.ExpertAction.CensorExpertInfoHistory(window._expertInfoHistory, window._store, titile, message, methodName);
            window.close();
        }
    });
    
    this._textFieldExpert = new Ext.form.TextField({
        fieldLabel: '专家',
        value: this._expertInfoHistory.get('expertName'),
        readOnly: true,
        width: 160
    });
    this._textFieldPropertyName = new Ext.form.TextField({
        fieldLabel: '修改字段',
        value: Srims.experts.ExpertInfoHistoryPropertyValueNameRender(this._expertInfoHistory.get('propertyName')),
        readOnly: true,
        width: 160
    });
    this._textFieldPropertyOldValue = new Ext.form.TextField({
        fieldLabel: '字段旧值',
        value: this._expertInfoHistory.get('propertyOldValue'),
        readOnly: true,
        width: 160
    });
    this._textFieldPropertyNewValue = new Ext.form.TextField({
        fieldLabel: '字段新值',
        value: this._expertInfoHistory.get('propertyValue'),
        readOnly: true,
        width: 160
    });
    this._textFieldPropertyNewValueRender = new Ext.form.TextField({
        fieldLabel: '字段新值说明',
        value: this._expertInfoHistory.get('propertyValueRender'),
        readOnly: true,
        width: 160
    });
    var items1 = [];
    var items2 = [];
    if (this._expertInfoHistory.get('propertyValueType') == 'Guid') {
        this._textFieldOldPhoto = new Ext.form.Label({
            fieldLabel: '字段旧值',
            readOnly: true,
            // html: expert.get('photo') == '' ? '<div style="height:100px;width:200px; display: table-cell; text-align:center; vertical-align:middle;"> <span id="SpanExpertImg_' + expert.get('id') + '">该专家暂时没有照片</span><img id="ImgExpert_' + expert.get('id') + '" height="100px" /></div>' : '<div width="160px" style="text-align:center;"><img id="ImgExpert_' + expert.get('id') + '" height="100px" src="../' + expert.get('photo') + '" /></div></div>',
            width: 160
        });
        this._textFieldNewPhoto = new Ext.form.Label({
            fieldLabel: '字段新值',
            readOnly: true,
            // html: expert.get('photo') == '' ? '<div style="height:100px;width:200px; display: table-cell; text-align:center; vertical-align:middle;"> <span id="SpanExpertImg_' + expert.get('id') + '">该专家暂时没有照片</span><img id="ImgExpert_' + expert.get('id') + '" height="100px" /></div>' : '<div width="160px" style="text-align:center;"><img id="ImgExpert_' + expert.get('id') + '" height="100px" src="../' + expert.get('photo') + '" /></div></div>',
            width: 160
        });
        items1 = [this._textFieldExpert, this._textFieldOldPhoto];
        items2 = [this._textFieldPropertyName, this._textFieldNewPhoto];
    }
    else {
        items1 = [this._textFieldExpert, this._textFieldPropertyOldValue,this._textFieldPropertyNewValueRender ];
        items2 = [this._textFieldPropertyName, this._textFieldPropertyNewValue];
    }
    Srims.experts.ExpertInfoHistoryShowWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '专家修改信息' + this._expertInfoHistory.get('expertName'),
        iconCls: 'icon-show',
        width: 650,
        labelWidth: 90,
        height: 400,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [new Ext.Panel({
            frame: true,
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 300,
                items: items1
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: items2
            })]
        })],
        buttons: [this._buttonCensorPass, this._buttonCensorReject]
    });
}
Ext.extend(Srims.experts.ExpertInfoHistoryShowWindow, Ext.Window, {})

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertAction = function() {
};
//专家查询
Srims.experts.ExpertAction.listExpert = function(showExpertQueryPanel) {
    var panelId = 'ExpertGridPanel';
    var expertStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        expertStore = panel.getStore();
    }
    else {
        expertStore = new Srims.experts.ExpertStore(Srims.service.experts.ExpertService + '/Query', queryParams);
        panel = new Srims.experts.ExpertGridPanel(panelId, expertStore, '专家', 'icon-expert-list', queryParams);
        Srims.WorkSpace.addPanel(panel);
    }

    if (showExpertQueryPanel) {
        Srims.experts.ExpertAction.showExpertQueryPanel(expertStore, queryParams, panel);
    }
};

Srims.experts.ExpertAction.exportExpert = function(filterParams, queryParams) {
    var windowId = 'ExpertExportWindow';
    //生成新Store
    var exportParams = Srims.exportAction.setExportQueryParams(filterParams, queryParams);
    var queryUrl = Srims.service.experts.ExpertService + '/Query';
    var items = [];
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('基本信息', Srims.experts.ExpertExport_Column.basic);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('专业信息', Srims.experts.ExpertExport_Column.major);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('联系方式', Srims.experts.ExpertExport_Column.contact);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('简历信息', Srims.experts.ExpertExport_Column.resume);
    items[items.length] = new Srims.component.ExportWindow_EntityColumnForm('统计信息', Srims.experts.ExpertExport_Column.statistic);

    Srims.exportAction.showExportWindow(windowId, queryUrl, exportParams, items, 'Expert');
};
Srims.experts.ExpertAction.showImportExpertWindow = function(store) {
    var windowId = 'ExpertImportWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.experts.ExpertService + '/Import', '导入专家数据', false);

    window.show();
}

Srims.experts.ExpertAction.showUpdateExpertWindow = function(store) {
    var windowId = 'ExpertUpdateWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.experts.ExpertService + '/Update', '更新专家数据', false);

    window.show();
}
Srims.experts.ExpertAction.showUpdateExpertIDCardWindow = function(store) {
    var windowId = 'ExpertUpdateWindow';
    var window = Ext.getCmp(windowId);

    if (!window)
        window = new Srims.component.ImportWindow(windowId, store, Srims.service.experts.ExpertService + '/UpdateIdCard', '更新专家数据', false);

    window.show();
}

Srims.experts.ExpertAction.showExpertQueryPanel = function(store, queryParams, gridPanel) {
    var panelId = 'ExpertQueryPanel'
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        panel = new Srims.experts.ExpertQueryPanel(panelId, store, queryParams, gridPanel)
        Srims.WorkSpace.addPanel(panel);
    }

    gridPanel.queryPanel = panel;

    var map = new Ext.KeyMap(panelId, {
        key: 13,
        fn: function() {
            if (!panel.hidden)
                panel.query(panel._buttonQuery);
        }
    });
};
Srims.experts.ExpertAction.showExpertSelfInfo = function() {
    var user = Srims.currentLoginLog.user;
    var params = {};
    params.expertId = user.expertId;
    Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/GetById',
        params: params,
        scope: this,
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.experts.ExpertXmlReader()
            });
            var expert = store.getAt(0);
            Srims.experts.ExpertAction.showExpert(expert, undefined);
        }
    })
};
Srims.experts.ExpertAction.showExpert = function(expert, listStore) {
    var panelId = 'ExpertShowPanel' + expert.get('id');
    var panel = Srims.WorkSpace.active(panelId);

    if (!panel) {
        panel = new Srims.experts.ExpertShowPanel(panelId, expert, listStore);
        Srims.WorkSpace.addPanel(panel);
    }
};
//删除专家
Srims.experts.ExpertAction.DeleteExpert = function(expert, store) {
    Ext.MessageBox.confirm('删除专家', '你确定要删除这个专家吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var _params = {};
            _params.expertID = expert.get('id');
            var panelID = 'ExpertShowPanel' + expert.get('id');

            Ext.Ajax.request({
                url: Srims.service.experts.ExpertService + '/DeleteExpert',
                params: _params,
                scope: this,
                success: function() {
                    if (Ext.getCmp(panelID))
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    store.load();
                }
            });
        }
    }, this);
};

//添加专家
Srims.experts.ExpertAction.newExpert = function() {
    var panelId = 'NewExpertEditPanel';
    if (Srims.WorkSpace.active(panelId))
        return;
    var expert = new Srims.experts.Expert({});
    var panel = new Srims.experts.ExpertEditPanel(panelId, expert);

    Srims.WorkSpace.addPanel(panel);
};
Srims.experts.atuoImportExpert = function(store) {
    var loadingAnimation = new Ext.LoadMask(Ext.getBody(), {
        msg: '正在从人事处下载数据，请耐心等待...'
    });
    loadingAnimation.show();

    Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/AutoImport',
        scope: this,
        timeout: 1800000,
        success: function() {
            store.load();
            loadingAnimation.hide();
        }
    });
}
//编辑专家信息——管理员编辑
Srims.experts.ExpertAction.expertEdit = function(expert, expertShowPanel, items, cantEditItems) {
    for (var j = 0; j < cantEditItems.length; j++) {
        var item = cantEditItems[j];
        item.setDisabled(true);
    }

    for (var i = 0; i < items.length; i++) {
        var control = items[i][0].getEl().dom;
        control.expert = expert;
        control.panel = expertShowPanel;
        control.item = items[i];
        control.onclick = function() {
            var winID = 'expertEdit' + this.name;
            var window = Ext.getCmp(winID);
            if (!window) {
                window = Srims.experts.ExpertAction.GetExpertEditComponentWindow(winID, this);
                window.show();
            }
        };
    }
};

//编辑专家信息——联系方式管理员编辑联系方式
Srims.experts.ExpertAction.expertLinkWayEdit = function(expert, expertShowPanel, items, cantEditItems) {
    for (var j = 0; j < cantEditItems.length; j++) {
        var item = cantEditItems[j];
        item.setDisabled(true);
    }
    for (var i = 0; i < items.length; i++) {
        var control = items[i][0].getEl().dom;
        control.expert = expert;
        control.panel = expertShowPanel;
        control.item = items[i];
        control.onclick = function() {
            var winID = 'expertEdit' + this.name;
            var window = Ext.getCmp(winID);
            if (!window) {
                if (this.item[2] == 'TextField')
                    window = new Srims.experts.ExpertEdit_Administrator_TextField(winID, this.expert, this.panel, this.item);
                window.show();
            }
        };
    }
};

//编辑专家信息——专家自己编辑
Srims.experts.ExpertAction.expertSelfEdit = function(expert, expertShowPanel, items, cantEditItems) {
    for (var j = 0; j < cantEditItems.length; j++) {
        var item = cantEditItems[j];
        item.setDisabled(true);
    }

    for (var i = 0; i < items.length; i++) {
        var control = items[i][0].getEl().dom;
        control.expert = expert;
        control.panel = expertShowPanel;
        control.item = items[i];
        control.onclick = function() {
            var winID = 'expertEdit' + this.name;
            var window = Ext.getCmp(winID);
            if (!window) {
                window = Srims.experts.ExpertAction.GetExpertEditComponentWindow(winID, this);
                window.show();
            }
        };
    }
};
Srims.experts.ExpertAction.GetExpertEditComponentWindow = function(winID, control) {
    var window;
    switch (control.item[2]) {
        case 'TextField': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_TextField(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'TextArea': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_TextArea(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'NumberField': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_NumberField(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'EntityComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_EntityComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'NoticeTextComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_NoticeTextComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'DateField': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_DateField(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'ComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_ComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'LinkedEntityComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_LinkedEntityComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'LanguageNoticeTextComboBox': 
            {
                window = new Srims.experts.ExpertEdit_Administrator_LanguageNoticeTextComboBox(winID, control.expert, control.panel, control.item);
                break;
            }
        case 'Label': 
            {
                window = new Srims.experts.ExpertUploadWindow(winID, control.expert);
                break;
            }
    }
    return window;
}
//结束编辑
Srims.experts.ExpertAction.finishEdit = function(expertShowPanel, items, cantEditItems) {
    for (var j = 0; j < cantEditItems.length; j++) {
        var item = cantEditItems[j];
        item.setDisabled(false);
    }
    for (var i = 0; i < items.length; i++) {
        var item = items[i][0];
        var control = item.getEl().dom;
        control.onclick = function() {
        };
    }

};

//Srims.experts.ExpertAction.queryExpert = function(){
//    var panelId = 'ExpertQueryPanel';
//    var panel = Srims.WorkSpace.active(panelId);
//    var expertStore = undefined;
//    var queryParams = {};
//    
//    if (!panel) {
//        expertStore = new Srims.experts.ExpertStore(Srims.service.experts.ExpertService + '/Query', queryParams);
//        panel = new Srims.experts.ExpertQueryPanel(expertStore, queryParams);
//        Srims.WorkSpace.addPanel(panel);
//    }
//    
//    //    var map = new Ext.KeyMap(id, {
//    //        key: 13,
//    //        fn: function(){
//    //            if (!panel.hidden) 
//    //                panel.query(panel._buttonQuery);
//    //        }
//    //    })
//}
Srims.experts.ExpertAction.showWaitingCensorExpertInfoHistories = function() {
    var panelId = 'WaitingCensorExpertInfoHistoriesGridPanel';
    var store = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        store = panel.getStore();
    }
    else {
        store = new Srims.experts.ExpertInfoHistoryStore(Srims.service.experts.ExpertInfoHistoryService + '/Query', queryParams);
        panel = new Srims.experts.ExpertInfoHistoryGridPanel(panelId, store, '专家历史信息', 'icon-expert-list', queryParams);
        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.experts.ExpertAction.showExpertInfoHistory = function(expertInfoHistory, store) {
    var id = 'ExpertInfoHistoryShowWindow' + expertInfoHistory.get('id');
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.experts.ExpertInfoHistoryShowWindow(id, expertInfoHistory, store);

    window.show();
}
Srims.experts.ExpertAction.CensorExpertInfoHistory = function(expertInfoHistory, store, methodName) {
    expertInfoHistory.data.isSubject = Srims.experts.editEntityTypeIsSubject(expertInfoHistory.data.propertyName);
    Ext.Ajax.request({
        url: Srims.service.experts.ExpertInfoHistoryService + methodName,
        params: expertInfoHistory.data,
        scope: this,
        success: function() {
            store.load();
        }
    });
}

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
