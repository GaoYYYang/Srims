
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.Log = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'dateTime',
    type: 'string',
    mapping: 'DataTime'
}, {
    name: 'user',
    type: 'string',
    mapping: 'User'
}, {
    name: 'userIP',
    type: 'string',
    mapping: 'UserIP'
}, {
    name: 'action',
    type: 'string',
    mapping: 'Action'
}, {
    name: 'description',
    type: 'string',
    mapping: 'Description'
},{
    name: 'logType',
    type: 'string',
    mapping: 'LogType'
},{
    name: 'logTypeUser',
    type: 'string',
    mapping: 'LogTypeUser'
},{
    name: 'logTypeProject',
    type: 'string',
    mapping: 'LogTypeProject'
}]);
Srims.data.Entity.apply(Srims.common.Log);

if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.IDValueRecord = Ext.data.Record.create([{
    name: 'id',
    type: 'string',
    mapping: 'ID'
}, {
    name: 'value',
    type: 'string',
    mapping: 'Value'
}]);
Srims.data.Entity.apply(Srims.data.IDValueRecord);

Srims.data.IDValueRecordXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.data.IDValueRecordXmlReader.superclass.constructor.call(this, Srims.data.IDValueRecord);
    }
});

Srims.data.IDValueRecordStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url){
        Srims.data.IDValueRecordStore.superclass.constructor.call(this, (new Srims.data.IDValueRecordXmlReader()), load_url);
    },
    buildGridFilterItems: function(){
        this.gridFilterItems = [];
        for (var i = 0; i < this.getCount(); i++) {
            this.gridFilterItems[this.gridFilterItems.length] = {
                id: this.getAt(i).get('id'),
                text: this.getAt(i).get('value')
            };
        }
    },
    buildCheckboxGroupItems: function(){
        this.checkboxGroupItems = [];
        for (var i = 0; i < this.getCount(); i++) {
            this.checkboxGroupItems[this.checkboxGroupItems.length] = {
                boxLabel: this.getAt(i).get('value'),
                name: this.getAt(i).get('id')
            };
        }
    }
});

if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.XmlStore = Ext.extend(Ext.data.Store, {
    constructor: function(reader, load_url, params){
    
        if (params == undefined) 
            params = {};
        
        params.token = 'undefined';
        if (Srims.currentLoginLog) 
            params.token = Srims.currentLoginLog.token;
        this.params = params;
        
        Srims.data.XmlStore.superclass.constructor.call(this, {
        
            remoteSort: true,
            totalProperty: 'total',
            proxy: new Ext.data.HttpProxy(new Ext.data.Connection({
                url: load_url,
                method: 'POST',
                extraParams: params
            })),
            reader: reader
        });
    },
    getExtraParams: function(){
        return this.params;
    }
});

if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.XmlReader = Ext.extend(Ext.data.XmlReader, {
    constructor: function(record){
        Srims.data.XmlReader.superclass.constructor.call(this, {
            totalRecords: 'Total',
            record: 'Record',
            id: 'ID'
        }, record);
    }
});

if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.Entity = function(){
}
Srims.data.Entity.isNew = function(){
    return this.get('id') == undefined || this.get('id') == 0;
}
Srims.data.Entity.apply = function(subClass){
    subClass.prototype.isNew = Srims.data.Entity.isNew;
}

if (!Srims.common) 
    ext.namespace('Srims.common');

Srims.common.LogGridPanel = function(id, LogStore, title, iconCls, queryParams){

    //fields
    this._logStore = LogStore;
    this._logStore.grid = this;
    
    //controls
    this._selections = new Ext.grid.RowSelectionModel();
    
    this._columnModel = new Srims.common.LogGridPanel_ColumnModel();
    this._filters = new Srims.common.LogGridPanel_GridFilters();
    this._toolbar = new Srims.common.LogGridPanel_ToolBar(LogStore, this._selections, queryParams, id);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的日志'
    });
    //public methods
    this.getLogStore = function(){
        return this._logStore;
    }
    //constructor
    Srims.common.LogGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._logStore,
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
            store: this._logStore,
            plugins: this._filters,
            displayInfo: false,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录'
        })
    });
    
    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
    
        var log = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        Srims.common.showLog(log, store);
    }
    
}
Ext.extend(Srims.common.LogGridPanel, Ext.grid.GridPanel);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogGridPanel_ColumnModel = function() {
    Srims.common.LogGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "用户",
        dataIndex: 'user',
        width: 10,
        sortable: false,
        hidden: false
    }, {
        header: "写入时间",
        dataIndex: 'dateTime',
        width: 20,
        sortable: true,
        hidden: false
    }, {
        header: "IP地址",
        dataIndex: 'userIP',
        width: 20,
        sortable: true,
        hidden: false
    }, {
        header: "操作",
        dataIndex: 'action',
        width: 20,
        sortable: false,
        hidden: false
    }, {
        header: "操作描述",
        dataIndex: 'description',
        sortable: false,
        hidden: false
}]);
        this.defaultSortable = false;
    }
    Ext.extend(Srims.common.LogGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogGridPanel_GridFilters = function(){
    Srims.common.LogGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'user'
        }, {
            type: 'date',
            dataIndex: 'dateTime'
        }]
    });
}
Ext.extend(Srims.common.LogGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogGridPanel_ToolBar = function(store, selection, queryParams, panelId) {
    this._store = store;
    this._panelId = panelId;
    this._selection = selection;
    this._buttonSet = new Ext.Toolbar.Button({
        iconCls: 'icon-log-Set',
        text: '日志设置',
        minWidth: 60,
        handler: function() {
            Srims.common.LogSet();
        },
        tooltip: '日志设置'
    });
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        store: this._store,
        isHorizontal: this._isHorizontal,
        handler: function() {
            Srims.common.showLogQueryWindow('Log_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>日志查询</b><br/>对日志信息进行复杂查询'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.showLog(this.selection.getSelected(), this.store);
        },
        tooltip: '<b>查看日志</b><br/>显示该条日志的详细信息'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        //buttonAlign: 'center',
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新日志列表'
    });
    this._buttonRemindAndSendEmail = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '执行提醒功能',
        handler: function() {
            Ext.MessageBox.confirm('执行提醒功能', '确定执行吗，每天执行一次即可！', function(buttonId) {
                if (buttonId == 'yes') {
                    Ext.Ajax.request({
                        url: Srims.service.common.SystemSettingService + '/RemindAndSendEmail',
                        scope: this,
                        success: function(response) {
                            Ext.Msg.alert(response.responseText);
                        }
                    });
                }
            });

        },
        tooltip: '<b>执行提醒功能</b><br/>'
    });
    Srims.common.LogGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSet, this._buttonQuery, this._buttonShow, this._buttonRemindAndSendEmail, this._buttonRefresh]
    });
}
Ext.extend(Srims.common.LogGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.common)
    Ext.namespace("Srims.common");

Srims.common.LogShowPanel = function(panelId, log, store) {
    this._log = log;
    this._formPanelBasic = new Srims.common.LogShowPanel_BasicForm(log);
    //constructor
    Srims.common.LogShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '日志查看——' + this._log.get('action'),
        iconCls: 'icon-show',
        tbar: this._ToolBar,
        items: [this._formPanelBasic]
    });
}
Ext.extend(Srims.common.LogShowPanel, Ext.Panel, {});


Srims.common.LogShowPanel_BasicForm = function(log) {
    this._log = log;
    this._fieldUser = new Ext.form.Field({
        fieldLabel: '用户名称',
        value: log.get('user'),
        readOnly: true,
        width: 160
    });
    this._fieldTime = new Ext.form.Field({
        fieldLabel: '写入时间',
        value: log.get('dateTime'),
        readOnly: true,
        width: 510
    });
    this._fieldIP = new Ext.form.Field({
        fieldLabel: 'IP地址',
        value: log.get('userIP'),
        readOnly: true,
        width: 160
    });
    this._fieldAction = new Ext.form.Field({
        fieldLabel: '操作',
        value: log.get('action'),
        readOnly: true,
        width: 510
    });
    this._textDescription = new Ext.form.TextArea({
        fieldLabel: '操作描述',
        scroll: true,
        value: log.get('description'),
        readOnly: true,
        height: 220,
        width: 850
    });
    //constructor
    Srims.common.LogShowPanel_BasicForm.superclass.constructor.call(this, {
        title: '日志详细信息',
        collapsible: true,
        //autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldUser, this._fieldTime, this._fieldIP, this._fieldAction, this._textDescription]
    });

}
Ext.extend(Srims.common.LogShowPanel_BasicForm, Ext.form.FormPanel, {});
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.listLog = function(){
    Srims.common._listLog('Log', 'icon-log-list', '日志列表');
}
Srims.common._listLog = function(id, iconCls, name){
    var panelId = 'LogPanel_' + id;
    var logStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
	
    if (panel) {
        logStore = panel.getLogStore();
		logStore.load();
    }
    else {
        logStore = new Srims.common.LogStore(Srims.service.common.LogService + '/Query',queryParams);
        panel = new Srims.common.LogGridPanel(panelId, logStore, name, iconCls,queryParams);
        panel.getLogStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
}

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.LogXmlReader.superclass.constructor.call(this, Srims.common.Log);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.LogStore.superclass.constructor.call(this, new Srims.common.LogXmlReader(), load_url, params);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

//日志设置
Srims.common.LogSet = function(){
    var panelId = 'LogSet';
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        systemSettingStore = new Srims.common.SystemSettingStore(Srims.service.common.SystemSettingService + '/Query');
        systemSettingStore.panel = panel;
        systemSettingStore.on('load', function(){
            this.panel = new Srims.common.LogSetPanel(panelId, this.getAt(0));
            Srims.WorkSpace.addPanel(this.panel);
        })
        
        systemSettingStore.load();
    }
}, //显示该条日志的详细信息
 Srims.common.showLog = function(log, store){
    var panelId = 'LogShowPanel' + log.get('id');
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.common.LogShowPanel(panelId, log, store);
    Srims.WorkSpace.addPanel(panel);
};

Srims.common.showLogQueryWindow = function(id, store, queryParams, gridPanel){
    var window = Ext.getCmp(id);
    if (!window) 
        window = new Srims.common.LogQueryWindow(id, store, queryParams);
    
    gridPanel.queryWindow = window;
    window.show();
    window.center();
    
    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function(){
            if (!window.hidden) 
                window.query(window._buttonQuery);
        }
    });
}

if (!Srims.common)
    Ext.namespace('Srims.common');


Srims.common.LogSetPanel = function(id, systemSetting) {
    this._title = '日志设置';
    this._systemSetting = systemSetting;
    this._formPanelUser = new Srims.common.LogSetPanel_UserForm(systemSetting);
    this._formPanelProject = new Srims.common.LogSetPanel_ProjectForm(systemSetting);
    this._formPanelText = new Srims.common.LogSetPanel_TextForm(systemSetting);
    this._formPanelType = new Srims.common.LogSetPanel_TypeForm(systemSetting);
    this._formPanelFund = new Srims.common.LogSetPanel_FundForm(systemSetting);
    this._formPanelPaper = new Srims.common.LogSetPanel_PaperForm(systemSetting);
    this._formPanelPatent = new Srims.common.LogSetPanel_PatentForm(systemSetting);
    this._formPanelAward = new Srims.common.LogSetPanel_AwardForm(systemSetting);
    this._formPanelBase = new Srims.common.LogSetPanel_BaseForm(systemSetting);
    this._formPanelCommon = new Srims.common.LogSetPanel_CommonForm(systemSetting);
    this._formPanelExperts = new Srims.common.LogSetPanel_ExpertsForm(systemSetting);
    this._formPanelStamp = new Srims.common.LogSetPanel_StampForm(systemSetting);

    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保存设置',
        panel: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        panel: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    Srims.common.LogSetPanel.superclass.constructor.call(this, {
        id: id,
        width: 815,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        buttonAlign: 'center',
        title: this._title,
        iconCls: 'icon-log-Set',
        resizable: false,
        modal: true,
        autoScroll: true,
        items: [this._formPanelUser, this._formPanelProject, this._formPanelText, this._formPanelType,
        this._formPanelFund, this._formPanelPaper, this._formPanelPatent, this._formPanelAward,
         this._formPanelBase, this._formPanelCommon, this._formPanelExperts, this._formPanelStamp],
        buttons: [this._buttonSave]
    });
    //method 
    this.assignValues = function() {
        this._systemSetting.set('logType', this._formPanelUser._checkboxGroupUser.getSelecetedValue() +
        this._formPanelProject._checkboxGroupProject.getSelecetedValue() +
        this._formPanelText._checkboxGroupText.getSelecetedValue() +
        this._formPanelType._checkboxGroupType.getSelecetedValue() +
        this._formPanelFund._checkboxGroupFund.getSelecetedValue() +
        this._formPanelPaper._checkboxGroupPaper.getSelecetedValue() +
        this._formPanelPatent._checkboxGroupPatent.getSelecetedValue() +
        this._formPanelAward._checkboxGroupAward.getSelecetedValue() +
        this._formPanelBase._checkboxGroupBase.getSelecetedValue() +
          this._formPanelExperts._checkboxGroupExperts.getSelecetedValue() +
           this._formPanelStamp._checkboxGroupStamp.getSelecetedValue() +
         this._formPanelCommon._checkboxGroupCommon.getSelecetedValue());
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._formPanelUser.isValid(preventMark) && result;
        return result;
    }


    this.save = function() {
        var systemSetting = this._systemSetting;

        systemSetting.beginEdit();
        this.assignValues();
        systemSetting.commit();

        Ext.Ajax.request({
            url: Srims.service.common.LogService + '/Save',
            params: systemSetting.data,
            scope: this,
            success: function() {
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        })
    }
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;
        if (!panel.isValid(false))
            return;

        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.LogSetPanel, Ext.Panel, {});

if (!Srims.common)
    Ext.namespace("Srims.common");

Srims.common.checkBoxGroupUserModelStore = [['UserNew', '添加新用户'],
['UserEdit', '修改用户信息'],
 ['UserDelete', '删除用户'],

 ['SaveForPermission', '权限保存'],
  ['SaveForCollegeRelatedPermission', '保存用户院系相关授权'],
['SaveForTemporaryAuthorizationPermissions', '保存用户临时授权'],
['DeleteTemporaryAuthorizationPermissions', '取消临时授权'],
['DeleteAllPermissions', '删除用户所有权限'],
 ['CancelUserLockLog', '解除用户登录锁定'],
 ['UserLockLog', '用户登录锁定'],
 ['AdminWorkRemind', '管理员工作提醒']
 ];

Srims.common.checkBoxGroupProjectModelStore = [
['ProjectNew', '新建项目'],
 ['ProjectMemberNew', '添加项目成员'],
['ProjectMemberEdit', '修改项目成员'],
['ProjectMemberDelete', '删除项目成员'],

['ProjectStartSubmit', '提交项目立项申请'],
['ProjectStartCancel', '撤销项目立项申请'],
 ['ProjectStartPass', '通过项目立项申请'],
  ['ProjectStartReject', '驳回项目立项申请'],

['ProjectEndSubmit', '提交项目结项申请'],
['ProjectEndReject', '驳回项目结项申请'],
['ProjectEndCancel', '撤销项目结项申请'],
 ['ProjectEndPass', '通过项目结项申请'],
 ['ProjectDelete', '删除项目'],

 ['ClearProjectAccountBookNumber', '清空项目账本号'],
      ['ProjectEdit', '编辑项目'],
 ['ProjectWithDraw', '撤销项目'],
  ['ProjectTerminate', '终止项目'],
   ['SetDelegatePrincipal', '设置项目委托负责人'],
    ['ClearDelegatePrincipal', '取消项目委托负责人'],
	 ['ProjectEndRemind', '项目结项邮件提醒'],
	 ['CensorVerticalProjectRemind', '审核纵向项目提醒'],
	 ['CensorHorizontalProjectRemind', '审核横向项目提醒'],
	 ['CensorProjectRemaind','审核项目立项提醒']

 ];

Srims.common.checkBoxGroupTextModelStore = [
 ['ProjectContractDelete', '删除项目合同'],
 ['ProjectDocumentSubmit', '提交项目文档'],
 ['CensorPassProjectContract', '审核通过项目合同'],
 ['CensorRejectProjectContract', '审核驳回项目文档'],
 ['ProjectDocumentRequire', '催缴项目文档'],
 ['ProjectDocumentCensorReject', '项目文档审核驳回'],
 ['ProjectDocumentCensorPass', '项目文档审核通过'],
 ['ProjectDocumentDelete', '删除项目文档'],
 ['UpLoadContract', '上传项目合同'],
 ['UpLoadDocumentModel', '上传文档模板'],
 ['DeleteDocumentModel', '删除文档模板'],
  ['RequiredDocumentRecordDelete', '删除催缴文档记录'],
  ['CensorDocumentRemaind', '审核文档提醒'],
  ['CensorContractRemaind','审核合同提醒']
   ];

Srims.common.checkBoxGroupTypeModelStore = [
['ProjectTypeNew', '添加项目类别'],
['ProjectTypeEdit', '修改项目类别'],
['ProjectTypeDelete', '删除项目类别'],

['ProjectSupportCategoryNew', '添加项目资助类别'],
['ProjectSupportCategoryEdit', '修改项目资助类别'],
 ['ProjectSupportCategoryDelete', '删除项目资助类别'],
['ProjectSupportFieldNew', '添加项目资助领域'],
 ['ProjectSupportFieldEdit', '修改项目资助领域'],
 ['ProjectSupportFiedDelete', '删除项目资助领域'],

['ProjectSupportSubFieldNew', '添加项目资助子领域'],
['ProjectSupportSubFieldEdit', '修改项目资助子领域'],
['ProjectSupportSubFieldDelete', '删除项目资助子领域']];



Srims.common.checkBoxGroupFundModelStore = [['FinanceNew', '新经费到帐'], ['FinanceEdit', '编辑经费到帐信息'],
 ['FinanceDelete', '删除经费到帐信息'], ['FundDescend', '经费下拨'], ['FinanceDescendDelete', '删除经费下拨'],
  ['FundAllocationSubmit', '提交经费分配'],
 ['FundAllocationCensorPass', '经费分配审核通过'],
 ['FundAllocationCensorReject', '经费分配审核驳回'], ['FundAllocationCancel', '经费分配作废'],
  ['VoucherPrint', '凭单打印'],
 ['VoucherSetPrint', '凭单打印计数器归零'],
   ['FinanceInvoiceNew', '新建项目经费的发票'],
 ['FinanceInvoiceDelete', '删除项目经费的发票'],

   ['fundDescendLent', '凭单打印'],
 ['FinanceDescendCensorPass', '经费下拨审核通过'],
   ['FinanceDescendCensorReject', '经费下拨审核驳回'],
 ['FundAllocationUndoSubmit', '经费分配撤销'],

  ['PayPlanNew', '新建经费到账计划'],
   ['PayPlanEdit', '编辑经费到账计划'],
 ['PayPlanDelete', '删除经费到账计划'],

    ['VoucherAllocate', '财务分配'],
 ['VoucherNew', '新建凭单'],
   ['VoucherEdit', '编辑凭单'],
 ['VoucherDelete', '删除凭单'],
  ['SetAccountBookNumber', '修改凭单账本号'],
   ['FinanceFundDescend', '归还欠款'],
 ['FinanceFundDescendDelete', '删除还款记录'],
   ['VoucherSignIn', '凭单状态设置为签收'],
   ['VoucherReturn', '凭单状态设置为退回'],
 ['VoucherCancelAllocate', '凭单状态设置为取消分配'],
  ['ClearExpertAccountNumber', '清空专家账本号'],

 ['FundAutoImport', '经费信息自动导入'],
 ['VoucherPrintRemind', '凭单打印提醒'],
 ['FundAllocationRemind', '经费分配提醒'],
 ['VoucherPrintedRemind', '凭单已经打印提醒'],
 ['CensorFundAllocationRemaind','审核经费分配提醒'],
 ['CensorFundDescendRemaind','审核经费下拨提醒']
 ];


Srims.common.checkBoxGroupPaperModelStore = [
['PaperAdd', '添加论文'], ['PaperEdit', '修改论文'],
['PaperDelete', '删除论文'], ['PaperAuthorAdd', '添加论文作者'], ['PaperAuthorEdit', '编辑论文作者'],
['PaperAuthorDelete', '删除论文作者'],
['MagazineSubjectClassAdd', '添加杂志学科分类信息'], ['MagazineSubjectClassDelete', '删除杂志学科分类信息'],
['PaperIndexAdd', '添加论文收录信息'], ['PaperIndexDelete', '删除论文收录信息'],
['MagazineAdd', '添加杂志'], ['MagazineEdit', '编辑杂志'], ['MagazineDelete', '删除杂志'],
['MagazineInformationAdd', '添加杂志信息'], ['MagazineInformationEdit', '编辑杂志信息'],
['MagazineInformationDelete', '删除杂志信息'], ['paperImport', '论文导入'],['MagazineImport', '杂志导入'],['MagazineInformationImport', '杂志年度信息导入']
];

Srims.common.checkBoxGroupPatentModelStore = [['PatentAdd', '添加专利'],
['PatentEdit', '修改专利'],
['PatentDelete', '删除专利'],
['PatentInventerAdd', '添加专利发明者'],
['PatentInventerEdit', '编辑专利发明者'],
['PatentInventerDelete', '删除专利发明者'],
['PatentAgencyAdd', '添加专利代理机构'],
['PatentAgencyEdit', '编辑专利代理机构'],
 ['PatentAgencyDelete', '删除专利代理机构'],
 ['PatentFeeAutoRemind', '专利费自动提醒']];

Srims.common.checkBoxGroupAwardModelStore = [['AwardAdd', '添加奖励'],
['AwardEdit', '修改奖励'],
['AwardDelete', '删除奖励'],
['AwardWinnerAdd', '添加奖励获奖人'],
['AwardWinnerEdit', '修改奖励获奖人'],

['AwardDocumentSubmit', '上传奖励文档'],
['AwardDocumentDelete', '删除奖励文档'],
['AwardDocumentCensorPass', '奖励文档审核通过'],
['AwardDocumentCensorReject', '奖励文档审核驳回'],

 ['AwardWinnerDelete', '删除奖励获奖人']];

Srims.common.checkBoxGroupBaseModelStore = [['BaseAdd', '添加基地'], ['BaseEdit', '修改基地'],
 ['BaseDelete', '删除基地']];

Srims.common.checkBoxGroupCommonModelStore = [['AnnouncementAdd', '新建通知'],
 ['AnnouncementEdit', '编辑通知'],
 ['AnnouncementDelete', '删除通知'],
  ['AnnouncementSetTop', '通知置顶'],
   ['AnnouncementCancelTop', '取消通知置顶'],
   ['AnnouncementSetOverdue', '设置通知过期'],
   ['AnnouncementCancelOverdue', '取消设置通知过期'],
  ['SubjectFirstLevelAdd', '添加一级学科分类'],
   ['SubjectFirstLevelEdit', '编辑一级学科分类'],
   ['SubjectSecondLevelAdd', '添加二级学科分类'],
   ['SubjectSecondLevelEdit', '编辑二级学科分类'],
     ['SystemSettingEdit', '编辑系统设置'],
             ['SendEmail', '发送邮件']
       ];

Srims.common.checkBoxGroupExpertsModelStore = [
      ['DepartmentAdd', '添加学院'], ['DepartmentEdit', '编辑学院'], ['ExpertImport', '专家导入'], ['ExpertAutoImport', '专家自动导入'], ['ExpertCensorRemind', '专家审核提醒']];

Srims.common.checkBoxGroupStampModelStore = [
      ['SubmitStamp', '提交文印'],
            ['CensorPassStamp', '文印审核通过'],
                  ['CensorRejectStamp', '文印审核驳回'],
                        ['StampStamp', '文印已盖章'],
                              ['DeleteStamp', '删除印章'],
                                    ['AddStamp', '添加印章'],
                                          ['EditStamp', '修改印章'],
            ['NewStampStuff', '新建盖章材料'],
                  ['EditStampStuff', '编辑盖章材料'],
                        ['DeleteStampStuff', '删除盖章材料'],
                              ['NewStampType', '新建材料章型'],
                                    ['EditStampType', '编辑材料章型'],
                                          ['DeleteStampType', '删除材料章型'],
                                             ['NewStampStateHistory', '新建文印状态历史']
                                          ];
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_UserForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupUser = new Srims.component.CheckBoxGroup({
        fieldLabel: '用户',
        hideLabel: true,
        cls: 'srims-checkboxGroup',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupUserModelStore, this._systemSetting.get("logType"))
    });

    var columnItems = [this._checkboxGroupUser];

    Srims.common.LogSetPanel_UserForm.superclass.constructor.call(this, {
        title: '用户模块',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: columnItems
        })]
    });
    //method
    this.assignValues = function() {
        this._systemSetting.set('logTypeUser', this._checkboxGroupUser.getSelecetedValue());
    }

    this.isValid = function(preventMark) {
        var result = true;

        result = this._checkboxGroupUser.isValid(preventMark) && result;
        return result;
    }


}
Ext.extend(Srims.common.LogSetPanel_UserForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_ProjectForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupProject = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupProjectModelStore, this._systemSetting.get("logType"))
    });
    
    var columnItems = [this._checkboxGroupProject];
    
    Srims.common.LogSetPanel_ProjectForm.superclass.constructor.call(this, {
        title: '项目模块',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: columnItems
        })]
    });
	//method
    this.assignValues = function(){
        this._systemSetting.set('logTypeProject',this._checkboxGroupProject.getSelecetedValue());		
    }
 }
Ext.extend(Srims.common.LogSetPanel_ProjectForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_TextForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupText = new Srims.component.CheckBoxGroup({
        fieldLabel: '文档',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupTextModelStore, this._systemSetting.get("logType"))
    });
    
    var columnItems = [this._checkboxGroupText];
    
    Srims.common.LogSetPanel_TextForm.superclass.constructor.call(this, {
        title: '文档模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
	//method
    this.assignValues = function(){
        this._systemSetting.set('logType',this._checkboxGroupText.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_TextForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_TypeForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupType = new Srims.component.CheckBoxGroup({
        fieldLabel: '类型',
        hideLabel: true,
        labelWidth: 700,
        cls: 'srims-checkboxGroup-logSetModel',
        columns:6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupTypeModelStore, this._systemSetting.get("logType"))
    });
    
    var columnItems = [this._checkboxGroupType];
    
    Srims.common.LogSetPanel_TypeForm.superclass.constructor.call(this, {
        title: '类型模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: columnItems
        })]
    });
    //method
    this.assignValues = function(){
        this._systemSetting.set('logType', this._checkboxGroupType.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_TypeForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_FundForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupFund = new Srims.component.CheckBoxGroup({
        fieldLabel: '经费',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupFundModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupFund];
    Srims.common.LogSetPanel_FundForm.superclass.constructor.call(this, {
        title: '经费模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
	//method
    this.assignValues = function(){
        this._systemSetting.set('logType', this._checkboxGroupFund.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_FundForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_PaperForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupPaper = new Srims.component.CheckBoxGroup({
        fieldLabel: '论文',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupPaperModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupPaper];
    Srims.common.LogSetPanel_PaperForm.superclass.constructor.call(this, {
        title: '论文模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
	//method
    this.assignValues = function(){
        this._systemSetting.set('logType', this._checkboxGroupPaper.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_PaperForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_PatentForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupPatent = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupPatentModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupPatent];
    Srims.common.LogSetPanel_PatentForm.superclass.constructor.call(this, {
        title: '专利模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
	//method
    this.assignValues = function(){
        this._systemSetting.set('logType', this._checkboxGroupPatent.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_PatentForm, Ext.form.FormPanel);
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_AwardForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupAward = new Srims.component.CheckBoxGroup({
        fieldLabel: '奖励',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns:6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupAwardModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupAward];
    Srims.common.LogSetPanel_AwardForm.superclass.constructor.call(this, {
        title: '奖励模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
    //method
    this.assignValues = function() {
        this._systemSetting.set('logType', this._checkboxGroupAward.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_AwardForm, Ext.form.FormPanel);


if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_BaseForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._checkboxGroupBase = new Srims.component.CheckBoxGroup({
        fieldLabel: '基地',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupBaseModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupBase];
    Srims.common.LogSetPanel_BaseForm.superclass.constructor.call(this, {
        title: '基地模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
	//method
    this.assignValues = function(){
        this._systemSetting.set('logType', this._checkboxGroupBase.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_BaseForm, Ext.form.FormPanel);
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_CommonForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupCommon = new Srims.component.CheckBoxGroup({
        fieldLabel: '公共',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupCommonModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupCommon];
    Srims.common.LogSetPanel_CommonForm.superclass.constructor.call(this, {
        title: '公共模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
    //method
    this.assignValues = function() {
    this._systemSetting.set('logType', this._checkboxGroupCommon.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_CommonForm, Ext.form.FormPanel);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_ExpertsForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupExperts = new Srims.component.CheckBoxGroup({
        fieldLabel: '专家',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupExpertsModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupExperts];
    Srims.common.LogSetPanel_ExpertsForm.superclass.constructor.call(this, {
        title: '专家模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
    //method
    this.assignValues = function() {
        this._systemSetting.set('logType', this._checkboxGroupExperts.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_ExpertsForm, Ext.form.FormPanel);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.LogSetPanel_StampForm = function(systemSetting) {
    this._systemSetting = systemSetting;

    this._checkboxGroupStamp = new Srims.component.CheckBoxGroup({
        fieldLabel: '文印',
        hideLabel: true,
        cls: 'srims-checkboxGroup-logSetModel',
        columns: 6,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.checkBoxGroupStampModelStore, this._systemSetting.get("logType"))
    });
    var columnItems = [this._checkboxGroupStamp];
    Srims.common.LogSetPanel_StampForm.superclass.constructor.call(this, {
        title: '文印模块',
        frame: true,
        layout: 'form',
        labelWidth: 150,
        //width: 770,
        items: [new Ext.Panel({
            labelWidth: 150,
            layout: 'form',
            items: columnItems
        })]
    });
    //method
    this.assignValues = function() {
        this._systemSetting.set('logType', this._checkboxGroupStamp.getSelecetedValue());
    }
}
Ext.extend(Srims.common.LogSetPanel_StampForm, Ext.form.FormPanel);


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
    Ext.namespace('Srims.common');

Srims.common.LogQueryWindow_InforPanel = function(){

    this._textFieldUser = new Ext.form.TextField({
        fieldLabel: '用户',
        width: 150
    });
    this._dateFieldDateTime = new Ext.form.DateField({
        fieldLabel: '写入日期',
        width: 150
    });
    this._dateFieldDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    var typeItems = Srims.common.LogQueryWindow_InforPanel.LogTypeStore.checkboxGroupItems;
    this._comboBoxAction2 = new Srims.component.CheckBoxGroup({
        fieldLabel: '操作类型',
        columns: typeItems.length > 9 ? 8 : typeItems.length,
        items: typeItems,
        cls: 'srims-checkboxGroup-expert'
    });
    this._comboBoxAction = new Ext.form.TextField({
        fieldLabel: '操作描述',
        width: 150
    });
    Srims.common.LogQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        //  autoWidth: true,
        width: 500,
        layout: 'form',
        // labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            labelWidth: 60,
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: [this._dateFieldDateTime, this._textFieldUser]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: [this._dateFieldDateTimeEnd, this._comboBoxAction]
            }) ]
        })]
    });
    
    this.buildParams = function(params){
        params.user = this._textFieldUser.getValue();
        params.dateTimeStart = Date.format(this._dateFieldDateTime.getValue());
        params.dateTimeEnd = Date.format(this._dateFieldDateTimeEnd.getValue());
        params.action = this._comboBoxAction.getValue();
    }
    
    this.clearParams = function(){
        this._textFieldUser.reset();
        this._dateFieldDateTime.reset();
        this._dateFieldDateTimeEnd.reset();
        this._comboBoxAction.reset();
    }
}
Ext.extend(Srims.common.LogQueryWindow_InforPanel, Ext.FormPanel);

Srims.common.LogQueryWindow_InforPanel.LogTypeStore = new Srims.data.IDValueRecordStore(Srims.service.common.LogService + '/GetLogType');
Srims.common.LogQueryWindow_InforPanel.LogTypeStore.load({
    callback: Srims.common.LogQueryWindow_InforPanel.LogTypeStore.buildCheckboxGroupItems
});


if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.LogQueryWindow = function(id, store, queryParams){
    this._id = id;
    this._store = store;
    this._params = queryParams;
    
    this._basicPanel = new Srims.common.LogQueryWindow_InforPanel();
    
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
    
    Srims.common.LogQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '日志查询',
        iconCls: 'icon-finance-query',
        autoHeight: true,
        autoWidth: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            layout: 'form',
            width: 500,
            labelWidth: 80,
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
    
    this.query = function(button){
        var window = button.window;
        window.getParams();
        
        Srims.SetQueryParams.removeNullparams(queryParams);
        window._store.load();
        window.hide();
    }
}
Ext.extend(Srims.common.LogQueryWindow, Ext.Window);



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

