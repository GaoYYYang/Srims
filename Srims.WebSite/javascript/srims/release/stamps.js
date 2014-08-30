
if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplication = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'canCensorPassComplete',
    type: 'boolean',
    mapping: 'CanCensorPassComplete',
    convert: Boolean.toBoolean
}, {
    name: 'stampStuffFromID',
    type: 'int',
    mapping: 'StampStuffFromID'
}, {
    name: 'stampStuffFromName',
    type: 'string',
    mapping: 'StampStuffFromName'
}, {
    name: ' administrator',
    type: 'string',
    mapping: 'Administrator'
}, {
    name: 'stampApplicationTypeID',
    type: 'int',
    mapping: 'StampApplicationTypeID'
}, {
    name: 'stampApplicationTypeName',
    type: 'string',
    mapping: 'StampApplicationTypeName'
},{
    name: 'stampApplicationTypeGroupID',
    type: 'int',
    mapping: 'StampApplicationTypeGroupID'
}, {
    name: 'stampApplicationTypeGroupName',
    type: 'string',
    mapping: 'StampApplicationTypeGroupName'
}, {
    name: 'isProjectRelated',
    type: 'boolean',
    mapping: 'IsProjectRelated',
    convert: Boolean.toBoolean
}, {
    name: 'stuffNumber',
    type: 'int',
    mapping: 'StuffNumber'
}, {
    name: 'stampReason',
    type: 'string',
    mapping: 'StampReason'
}, {
    name: 'keyWord',
    type: 'string',
    mapping: 'KeyWord'
}, {
    name: 'manager',
    type: 'string',
    mapping: 'Manager'
}, {
    name: 'managerPhone',
    type: 'string',
    mapping: 'ManagerPhone'
}, {
    name: 'managerEmail',
    type: 'string',
    mapping: 'ManagerEmail'
}, {
    name: 'expertPrint',
    type: 'boolean',
    mapping: 'ExpertPrint',
    convert: Boolean.toBoolean
}, {
    name: 'sealPerforation',
    type: 'boolean',
    mapping: 'SealPerforation',
    convert: Boolean.toBoolean
}, {
    name: 'isDuplexPrint',
    type: 'boolean',
    mapping: 'IsDuplexPrint',
    convert: Boolean.toBoolean
}, {
    name: 'principalID',
    type: 'int',
    mapping: 'PrincipalID'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'currentStateID',
    type: 'string',
    mapping: 'CurrentState'
}, {
    name: 'currentState',
    type: 'string',
    mapping: 'CurrentState'
}, {
    name: 'currentStateTime',
    type: 'date',
    mapping: 'CurrentStateTime'
}, {
    name: 'operator',
    type: 'string',
    mapping: 'Operator'
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Censor',
    type: 'boolean',
    mapping: 'HasPermission_Censor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_DepartmentCensor',
    type: 'boolean',
    mapping: 'HasPermission_DepartmentCensor',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Stamp',
    type: 'boolean',
    mapping: 'HasPermission_Stamp',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_CancleSubmit',
    type: 'boolean',
    mapping: 'HasPermission_CancleSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Submit',
    type: 'boolean',
    mapping: 'HasPermission_Submit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageStampStuff',
    type: 'boolean',
    mapping: 'HasPermission_ManageStampStuff',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'canCensor',
    type: 'boolean',
    mapping: 'CanCensor',
    convert: Boolean.toBoolean
}, {
    name: 'canCensorPassComplete',
    type: 'boolean',
    mapping: 'CanCensorPassComplete',
    convert: Boolean.toBoolean
}, {
    name: 'canDepartmentCensor',
    type: 'boolean',
    mapping: 'CanDepartmentCensor',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canStamp',
    type: 'boolean',
    mapping: 'CanStamp',
    convert: Boolean.toBoolean
}, {
    name: 'canSubmit',
    type: 'boolean',
    mapping: 'CanSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canCancleSubmit',
    type: 'boolean',
    mapping: 'CanCancleSubmit',
    convert: Boolean.toBoolean
}, {
    name: 'canManageStampStuff',
    type: 'boolean',
    mapping: 'CanManageStampStuff',
    convert: Boolean.toBoolean
}]);
    Srims.data.Entity.apply(Srims.stamp.StampApplication);

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
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.listStamps = function() {
    Srims.stamp._listStamps('StampList', '文印列表', 'icon-stamp-list', '/Query', undefined);
}
Srims.stamp.listDepartmentStamps = function() {
    Srims.stamp._listStamps('DepartmentStampList', '文印列表', 'icon-stamp-list', '/Query', Srims.stamp.StampState.CensorPass);
}
Srims.stamp.listMyStamps = function() {
    Srims.stamp._listStamps('MyStampList', '我的文印列表', 'icon-stamp-list', '/Query', undefined);
}
Srims.stamp.listWaitingCensorStamps = function() {
    Srims.stamp._listStamps('WaitingCensorStampList', '待审核文印列表', 'icon-stamp-list', '/QueryForCensor', Srims.stamp.StampState.UnSubmit);
}
Srims.stamp.listWaitingStampStamps = function() {
    Srims.stamp._listStamps('WaitingStampStampList', '待盖章文印列表', 'icon-stamp-list', '/QueryForStampFeedback', Srims.stamp.StampState.DepartmentCensorPass);
}
Srims.stamp.listWaitingDepartmentCensorStamps = function() {
    Srims.stamp._listStamps('WaitingDepartmentCensorStampList', '部门待审核文印列表', 'icon-stamp-list', '/QueryForDepartmentCensor', Srims.stamp.StampState.WaitDepartmentCensor);
}
Srims.stamp._listStamps = function(id, name, iconCls, queryMethodName, stampState, showApplyWindow) {
    var panelId = 'StampApplicationGridPanel_' + id;
    var store = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    if (panel) {
        store = panel.getStore();
        store.load();
    } else {
        store = new Srims.stamp.StampApplicationStore(Srims.service.stamp.StampApplicationService + queryMethodName, queryParams);
        panel = new Srims.stamp.StampApplicationGridPanel(panelId, store, name, iconCls, queryParams, stampState);
        panel.getStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}
Srims.stamp.showStampApplicationQueryWindow = function(id, store, queryParams, gridPanel, stampState) {
    var window = Ext.getCmp(id);

    if (!window)
        window = new Srims.stamp.StampApplicationQueryWindow(id, store, queryParams, stampState);

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
Srims.stamp.newStampApplication = function(store) {
    var panelId = 'NewStampApplication';
    if (Srims.WorkSpace.active(panelId))
        return;
    var stampApplication = new Srims.stamp.StampApplication({});

    var panel = new Srims.stamp.StampApplicationEditPanel(panelId, stampApplication, store);
    Srims.WorkSpace.addPanel(panel);
}
Srims.stamp.editStampApplication = function(stampApplication, store) {
    var panelId = 'EditStamp' + stampApplication.get('id');
    if (Srims.WorkSpace.active(panelId))
        return;
    var panel = new Srims.stamp.StampApplicationEditPanel(panelId, stampApplication, store);
    Srims.WorkSpace.addPanel(panel);
}
Srims.stamp.editStampApplicationBasicInfor = function(stampApplication, store) {
    var windowId = 'EditStamp' + stampApplication.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StampApplicationEditWindow(windowId, stampApplication, store);
    window.show();
}
Srims.stamp.showStampApplication = function(stampApplication, store, stampState) {
    var panelId = '';
    if (stampState == undefined)
        panelId = 'StampApplicationShowPanel' + stampApplication.get('id');
    if (stampState == Srims.stamp.StampState.UnSubmit)
        panelId = 'StampApplicationShowPanelForCensor' + stampApplication.get('id');
    if (stampState == Srims.stamp.StampState.DepartmentCensorPass)
        panelId = 'StampApplicationShowPanelForStamp' + stampApplication.get('id');
    if (stampState == Srims.stamp.StampState.CensorPass)
        panelId = 'StampApplicationShowPanelForDepartmentCensorPassStamp' + stampApplication.get('id');

    if (Srims.WorkSpace.active(panelId))
        return;
    var panel = new Srims.stamp.StampApplicationShowPanel(panelId, stampApplication, store, stampState);
    Srims.WorkSpace.addPanel(panel);
}
Srims.stamp.showStuffManangeWindow = function(stampApplication, stampApplicationStore) {
    var windowId = "StuffManageWindow" + stampApplication.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StuffManageWindow(windowId, stampApplication, stampApplicationStore);
    else
        window._stuffGridPanel.getStuffStore().load();
    window.show();
}
Srims.stamp.deleteStampApplication = function(stampApplication, store) {
    Ext.MessageBox.confirm('删除文印', '你确定要删除这个文印吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stampApplicationID = stampApplication.get('id');

            Ext.Ajax.request({
                url: Srims.service.stamp.StampApplicationService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                    closePanel(panelId);
                    var windowId = "EditStampApplication" + stampApplication.get('id');
                    closeWindow(windowId);
                    if (store)
                        store.load();
                }
            });
        }
    }, this);
}
Srims.stamp.addStuffAndStampInfor = function(stampApplication, stuffStore) {
    var windowId = "AddStuffAndStamp";
    var window = Ext.getCmp(windowId);
    if (!window) {
        var stuff = new Srims.stamp.Stuff({});
        window = new Srims.stamp.StampApplicationEditPanel_StuffStampForm(windowId, stuffStore, stuff, stampApplication);
    }
    window.show();
}
Srims.stamp.editStuffAndStampInfor = function(stuff, stampApplication, stuffStore) {
    var windowId = "EditStuffAndStamp" + stuff.get('id');
    var window = Ext.getCmp(windowId)
    if (!window) {
        window = new Srims.stamp.StampApplicationEditPanel_StuffStampForm(windowId, stuffStore, stuff, stampApplication);
    }
    window.show();
}
Srims.stamp.newStuff = function(store, stampApplication, stampApplicationStore) {
    var windowId = "NewStuff";
    var window = Ext.getCmp(windowId)
    if (!window) {
        var stuff = new Srims.stamp.Stuff({});
        window = new Srims.stamp.StuffEditWindow(windowId, stuff, stampApplication, store, stampApplicationStore);
    }
    window.show();
}
Srims.stamp.editStuff = function(stuff, store, stampApplication, stampApplicationStore) {
    if (!stuff.isNew()) {
        var windowId = "EditStuff" + stuff.get('id');
        var window = Ext.getCmp(windowId)
        if (!window)
            window = new Srims.stamp.StuffEditWindow(windowId, stuff, stampApplication, store, stampApplicationStore);
        window.show();
    }
}
Srims.stamp.deleteStuff = function(stuff, store, stampApplication, stampApplicationStore) {
    Ext.MessageBox.confirm('删除用印文件', '你确定要删除这个用印文件吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stuffID = stuff.get('id');

            Ext.Ajax.request({
                url: Srims.service.stamp.StuffService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                    if (stampApplicationStore)
                        stampApplicationStore.load();
                    var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                    closePanel(panelId);
                    var windowId = "EditStamp" + stampApplication.get('id');
                    closeWindow(windowId);
                    Srims.stamp.showStampApplication(stampApplication, stampApplicationStore);
                }
            });
        }
    }, this);
}
Srims.stamp.removeStuff = function(stuff, stuffStore) {
    stuffStore.remove(stuff);
}
Srims.stamp.showStuffStampManageWindow = function(stuff, stuffStore, stampApplication, stampApplicationStore) {
    var windowId = "StuffStampManageWindow" + stuff.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StuffStampManageWindow(windowId, stuff, stuffStore, stampApplication, stampApplicationStore);
    else
        window._stuffStampGridPanel.getStuffStampStore().load();
    window.show();
}
Srims.stamp.newStuffStamp = function(store, stuff, stuffStore, stampApplication, stampApplicationStore) {
    var windowId = "NewStuffStamp";
    var window = Ext.getCmp(windowId)
    if (!window) {
        var stuffStamp = new Srims.stamp.StuffStamp({});
        window = new Srims.stamp.StuffStampEditWindow(windowId, stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore);
    }
    window.show();
}
Srims.stamp.editStuffStamp = function(stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore) {
    var windowId = "EditStuffStamp" + stuffStamp.get('id');
    var window = Ext.getCmp(windowId)
    if (!window)
        window = new Srims.stamp.StuffStampEditWindow(windowId, stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore);
    window.show();
}
Srims.stamp.deleteStuffStamp = function(stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore) {
    Ext.MessageBox.confirm('删除文件用印', '你确定要删除这个文件用印吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stuffStampID = stuffStamp.get('id');

            Ext.Ajax.request({
                url: Srims.service.stamp.StuffStampService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                    stuffStore.load();
                    if (stampApplicationStore)
                        stampApplicationStore.load();
                    var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                    closePanel(panelId);
                    var windowId = "EditStampApplication" + stampApplication.get('id');
                    closeWindow(windowId);
                    Srims.stamp.showStampApplication(stampApplication, stampApplicationStore);
                }
            });
        }
    }, this);
}
Srims.stamp.changeStampState = function(stampApplication, store, title, message, methodName, stampState, remark) {
    Ext.MessageBox.confirm(title, message, function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stampApplicationID = stampApplication.get('id');
            params.remark = String.isEmpty(remark) ? '' : remark;
            Ext.Ajax.request({
                url: Srims.service.stamp.StampApplicationService + methodName,
                params: params,
                scope: this,
                success: function(response) {
                    if (store)
                        store.load();
                    var newstore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.stamp.StampApplicationXmlReader()
                    });
                    var editedStampApplication = newstore.getAt(0);
                    var panelId = '';
                    if (!stampState)
                        panelId = 'StampApplicationShowPanel' + editedStampApplication.get('id');
                    if (stampState == Srims.stamp.StampState.UnSubmit)
                        panelId = 'StampApplicationShowPanelForCensor' + editedStampApplication.get('id');
                    if (stampState == Srims.stamp.StampState.DepartmentCensorPass)
                        panelId = 'StampApplicationShowPanelForStamp' + editedStampApplication.get('id');
                    if (stampState == Srims.stamp.StampState.CensorPass)
                        panelId = 'StampApplicationShowPanelForDepartmentCensor' + editedStampApplication.get('id');
                    closePanel(panelId);
                    var windowId = "EditStampApplication" + editedStampApplication.get('id');
                    closeWindow(windowId);
                    if (!stampState || stampState == Srims.stamp.StampState.UnSubmit)
                        Srims.Poll.startPollAction(Srims.Poll.getPollAction_WaitingCensorStamp());
                    Srims.stamp.showStampApplication(editedStampApplication, store, stampState);
                }
            });
        }
    }, this);
}
Srims.stamp.showStampManageWindow = function() {
    var windowId = "StampManageWindow";
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StampManageWindow(windowId);
    else
        window._stampGridPanel.getStampStore().load();
    window.show();
}
Srims.stamp.newStamp = function(store) {
    var windowId = "NewStamp";
    var window = Ext.getCmp(windowId)
    if (!window) {
        var stamp = new Srims.stamp.Stamp({});
        window = new Srims.stamp.StampEditWindow(windowId, stamp, store);
    }
    window.show();
}
Srims.stamp.editStamp = function(stamp, store) {
    var windowId = "EditStamp" + stamp.get('id');
    var window = Ext.getCmp(windowId)
    if (!window)
        window = new Srims.stamp.StampEditWindow(windowId, stamp, store);
    window.show();
}
Srims.stamp.deleteStamp = function(stamp, store) {
    Ext.MessageBox.confirm('删除图章', '你确定要删除这个图章吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var params = {};
            params.stampID = stamp.get('id');

            Ext.Ajax.request({
                url: Srims.service.stamp.StampService + '/Delete',
                params: params,
                scope: this,
                success: function() {
                    store.load();
                }
            });
        }
    }, this);
}
Srims.stamp.showStampRejectWindow = function(stampApplication, store, methodName, stampState) {
    var windowId = "RejectStamp" + stampApplication.get('id');
    var window = Ext.getCmp(windowId)
    if (!window)
        window = new Srims.stamp.StampCensorRejectWindow(windowId, stampApplication, store, methodName, stampState);
    window.show();
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

Srims.stamp.downLoadStuffDoucment = function(stuff) {
    var stuffResource = stuff.get('stuffDocument');
    if (stuffResource == '' || stuffResource == null || stuffResource == undefined) {
        Ext.Msg.show({
            title: '文档查看失败',
            msg: '该文档还没有上传',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    Srims.documents.downLoadResource(stuff.get('stuffDocument'), '/GetStuffDocument');
};

if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationGridPanel_ColumnModel = function() {
    Srims.stamp.StampApplicationGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "项目来源",
        dataIndex: 'stampStuffFromName',
        sortable: true,
        hidden: false
    }, {
        header: "材料份数",
        dataIndex: 'stuffNumber',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "盖章事由",
        dataIndex: 'stampReason',
        sortable: true,
        hidden: false
    }, {
        header: "骑缝章",
        dataIndex: 'sealPerforation',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "专家打印",
        dataIndex: 'expertPrint',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "双面打印",
        dataIndex: 'isDuplexPrint',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "关键字",
        dataIndex: 'keyWord',
        sortable: true,
        hidden: true
    }, {
        header: "文印申请类型",
        dataIndex: 'stampApplicationTypeName',
        sortable: true,
        hidden: false
    }, {
        header: "文印申请类型对应组",
        dataIndex: 'stampApplicationTypeGroupName',
        sortable: true,
        hidden: false
    }, {
        header: "经办人",
        dataIndex: 'manager',
        sortable: true,
        width: 30,
        hidden: false
    }, {
        header: "经办人电话",
        dataIndex: 'managerPhone',
        sortable: true,
        hidden: false,
        width: 30
    }, {
        header: "经办人邮箱",
        dataIndex: 'managerEmail',
        sortable: true,
        hidden: false,
        width: 30
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 30,
        sortable: true,
        hidden: false
    }, {
        header: "当前状态",
        dataIndex: 'currentState',
        width: 30,
        sortable: true,
        renderer: Srims.stamp.StampStateRender,
        hidden: false
    }, {
        header: "当前状态时间",
        dataIndex: 'currentStateTime',
        width: 30,
        sortable: true,
        renderer: Date.render,
        hidden: true
}]);

        this.defaultSortable = false;
    }
    Ext.extend(Srims.stamp.StampApplicationGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.stamp)
    Ext.namespace('Srims.stamp')

Srims.stamp.StampApplicationGridPanel_ToolBar = function(selection, store, panelId, queryParams, stampState) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._queryParams = queryParams;
    this._stampState = stampState;

    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            Srims.stamp.showStampApplicationQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId), this.stampState);
        },
        tooltip: '<b>文印查询</b><br/>对文印进行查询'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '申请',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.stamp.newStampApplication(this.store);
        },
        Hidden: true,
        tooltip: '<b>申请盖章</b><br/>申请盖章'
    });

    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        stampState: this._stampState,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.stamp.showStampApplication(this.selection.getSelected(), this.store, this.stampState);
        },
        hidden: true,
        tooltip: '<b>查看文印</b><br/>显示所选文印的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.editStampApplication(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑文印</b><br/>编辑选中文印的信息'
    });
    //  this._buttonEditBasic = new Ext.Toolbar.Button({
    //     iconCls: 'icon-edit',
    //      text: '编辑基本信息',
    //      minWidth: 60,
    //     selection: this._selection,
    //     store: this._store,
    //     handler: function(){
    //         Srims.stamp.editStampApplicationBasicInfor(this.selection.getSelected(), this.store);
    //     },
    //     hidden: true,
    //      tooltip: '<b>编辑文印基本信息</b><br/>编辑选中文印的基本信息'
    //  });
    // this._buttonSubmit = new Ext.Toolbar.Button({
    //     iconCls: 'icon-submit',
    //     text: '提交',
    //     minWidth: 60,
    //     selection: this._selection,
    //     store: this._store,
    //    isForCensor: this._isForCensor,
    //     handler: function(){
    //         if (this.selection.getCount() == 0)
    //             return;
    //         titile = '文印提交';
    //          message = '你确定要提交用印申请吗？';
    //          methodName = '/SubmitStamp';
    //         Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
    //      },
    //     hidden: true,
    //      tooltip: '<b>提交文印申请</b><br/>提交文印申请'
    //  });
    this._buttonCancleSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-return',
        text: '撤销提交',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '撤销文印提交';
            message = '你确定要撤销用印申请吗？';
            methodName = '/CancleSubmitStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>撤销文印申请</b><br/>撤销文印申请'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '初审通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/CensorPassStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核通过</b><br/>文印申请审核通过'
    });
    this._buttonCensorPassComplete = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '初审直接通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '审核直接通过';
            message = '你确定要直接通过此用印申请吗？';
            methodName = '/CensorPassCompleteStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核直接通过</b><br/>文印申请审核直接通过'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '初审驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            // titile = '审核驳回';
            // message = '你确定要驳回此用印申请吗？';
            // Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
            methodName = '/CensorRejectStamp';
            Srims.stamp.showStampRejectWindow(this.selection.getSelected(), this.store, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonDepToCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '初审驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            methodName = '/CensorRejectStamp';
            Srims.stamp.showStampRejectWindow(this.selection.getSelected(), this.store, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonStamp = new Ext.Toolbar.Button({
        iconCls: 'icon-stamp',
        text: '已盖章',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '已盖章';
            message = '你确定已对此用印盖章吗？';
            methodName = '/StampStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印盖章</b><br/>文印盖章'
    });
    // this._buttonStampStuffManage = new Ext.Toolbar.Button({
    //      iconCls: 'icon-project-document',
    //     text: '文印材料管理',
    //     minWidth: 60,
    //     selection: this._selection,
    //     store: this._store,
    //     handler: function(){
    //         if (this.selection.getCount() == 0)
    //              return;
    //          Srims.stamp.showStuffManangeWindow(this.selection.getSelected(), this.store);
    //     },
    //     hidden: true,
    //      tooltip: '<b>文印材料管理</b><br/>文印材料管理'
    //  });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.deleteStampApplication(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除项目分类</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新文印列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        stampState: this._stampState,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    this._buttonDepartmentCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '部门审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/DepartmentCensorPassStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核通过</b><br/>文印申请审核通过'
    });
    this._buttonDepartmentCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '部门审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            // titile = '审核驳回';
            // message = '你确定要驳回此用印申请吗？';
            // methodName = '/CensorRejectStamp';
            // Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
            methodName = '/DepartmentCensorRejectStamp';
            Srims.stamp.showStampRejectWindow(this.selection.getSelected(), this.store, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });

    var user = Srims.currentLoginLog.user;


    var Items;
    if (this._stampState == undefined)
        Items = [this._buttonQuery, this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonCancleSubmit, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    if (this._stampState == Srims.stamp.StampState.UnSubmit)
        Items = [this._buttonQuery, this._buttonShow, this._buttonEdit, this._buttonCensorPass, this._buttonCensorReject, this._buttonCensorPassComplete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    if (this._stampState == Srims.stamp.StampState.DepartmentCensorPass)
        Items = [this._buttonQuery, this._buttonShow, this._buttonEdit, this._buttonStamp, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    if (this._stampState == Srims.stamp.StampState.WaitDepartmentCensor)
        Items = [this._buttonQuery, this._buttonShow, this._buttonEdit, this._buttonDepartmentCensorPass, this._buttonDepartmentCensorReject, this._buttonDepToCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];

    Srims.stamp.StampApplicationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: Items
    });

    //initial
    this._selection.buttonCancleSubmit = this._buttonCancleSubmit;
    // this._selection.buttonSubmit = this._buttonSubmit;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    // this._selection.buttonEditBasic = this._buttonEditBasic;
    // this._selection.buttonStampStuffManage = this._buttonStampStuffManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonStamp = this._buttonStamp;
    this._selection.buttonDepartmentCensorPass = this._buttonDepartmentCensorPass;
    this._selection.buttonDepartmentCensorReject = this._buttonDepartmentCensorReject;

    this._selection.buttonDepToCensorReject = this._buttonDepToCensorReject;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    this._selection.buttonCensorPassComplete = this._buttonCensorPassComplete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonCancleSubmit = selection.buttonCancleSubmit;
        // var buttonSubmit = selection.buttonSubmit;
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        // var buttonStampStuffManage = selection.buttonStampStuffManage;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorPassComplete = selection.buttonCensorPassComplete;
        var buttonCensorReject = selection.buttonCensorReject;
        var buttonStamp = selection.buttonStamp;
        var buttonDepartmentCensorPass = selection.buttonDepartmentCensorPass;
        var buttonDepartmentCensorReject = selection.buttonDepartmentCensorReject;
        // var buttonEditBasic = selection.buttonEditBasic;
        var buttonDepToCensorReject = selection.buttonDepToCensorReject;
        if (selection.getCount() == 0) {
            buttonCancleSubmit.hide();
            // buttonSubmit.hide();
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            // buttonStampStuffManage.hide();
            buttonCensorPass.hide();
            buttonCensorPassComplete.hide();
            buttonCensorReject.hide();
            buttonStamp.hide();
            // buttonEditBasic.hide();
            buttonDepartmentCensorPass.hide();
            buttonDepartmentCensorReject.hide();
            buttonDepToCensorReject.hide();
            return;
        }

        var stampApplication = selection.getSelected();

        buttonCancleSubmit.setVisible(stampApplication.get('hasPermission_CancleSubmit'));
        buttonCancleSubmit.setDisabled(!stampApplication.get('canCancleSubmit'));

        //  buttonSubmit.setVisible(stampApplication.get('hasPermission_Submit'));
        //  buttonSubmit.setDisabled(!stampApplication.get('canSubmit'));

        buttonShow.setVisible(stampApplication.get('hasPermission_Show'));
        buttonShow.setDisabled(!stampApplication.get('canShow'));

        buttonEdit.setVisible(stampApplication.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!stampApplication.get('canEdit'));

        // buttonEditBasic.setVisible(stampApplication.get('hasPermission_Edit'));
        //  buttonEditBasic.setDisabled(!stampApplication.get('canEdit'));

        buttonDelete.setVisible(stampApplication.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!stampApplication.get('canEdit'));

        // buttonStampStuffManage.setVisible(stampApplication.get('hasPermission_ManageStampStuff'));
        //  buttonStampStuffManage.setDisabled(!stampApplication.get('canManageStampStuff'));

        buttonCensorPass.setVisible(stampApplication.get('hasPermission_Censor'));
        buttonCensorPass.setDisabled(!stampApplication.get('canCensor'));

        buttonCensorReject.setVisible(stampApplication.get('hasPermission_Censor')|| stampApplication.get('canCensorPassComplete'));
        buttonCensorReject.setDisabled(!(stampApplication.get('canCensor') || stampApplication.get('canCensorPassComplete')));

        buttonCensorPassComplete.setVisible(stampApplication.get('canCensorPassComplete'));
     //   buttonCensorPassComplete.setDisabled(!stampApplication.get('canCensorPassComplete'));

        buttonStamp.setVisible(stampApplication.get('hasPermission_Stamp'));
        buttonStamp.setDisabled(!stampApplication.get('canStamp'));

        buttonDepartmentCensorPass.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
        buttonDepartmentCensorPass.setDisabled(!stampApplication.get('canDepartmentCensor'));
        

        buttonDepartmentCensorReject.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
        buttonDepartmentCensorReject.setDisabled(!stampApplication.get('canDepartmentCensor'));

        buttonDepToCensorReject.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
        buttonDepToCensorReject.setDisabled(!stampApplication.get('canDepartmentCensor'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StampApplicationGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationGridPanel = function(id, store, title, iconCls, queryParams, stampState){

    //fields
    this._store = store;
    this._store.gird = this;
    this._stampState = stampState;
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls    
    this._columnModel = new Srims.stamp.StampApplicationGridPanel_ColumnModel();
    this._toolbar = new Srims.stamp.StampApplicationGridPanel_ToolBar(this._selections, this._store, id, queryParams, this._stampState);
    
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
    Srims.stamp.StampApplicationGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stampApplication = grid.getStore().getAt(rowIndex);
        Srims.stamp.showStampApplication(stampApplication, grid._store, stampState);
    }
}
Ext.extend(Srims.stamp.StampApplicationGridPanel, Srims.component.GridPanel);

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel_ShowPanel = function(stampApplication, stampApplicationStore){

    var stuffStore = new Srims.stamp.StuffStore(stampApplication.get('id'));
    var isNew = stampApplication.isNew();
    this._basicPanel = new Srims.stamp.StampApplicationShowPanel_BasicForm(stampApplication);
    this._stuffGridPanel = new Srims.stamp.StampApplicationEditPanel_StuffGridForm(stampApplication, stampApplicationStore, stuffStore, false);
    
    Srims.stamp.StampApplicationEditPanel_ShowPanel.superclass.constructor.call(this, {
        title: '',
        // Height: 900,
        autoHeight: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        layout: 'form',
        items: [this._basicPanel, this._stuffGridPanel]
    });
    
    //保存材料章型
    this._SaveStuffStamp = function(stuffStamp){
        Ext.Ajax.request({
            url: Srims.service.stamp.StuffStampService + '/Save',
            params: stuffStamp.data
        });
    }
    //保存材料
    this._SaveStuff = function(stuff){
        stuff._SaveStuffStamp = this._SaveStuffStamp;
        Ext.Ajax.request({
            url: Srims.service.stamp.StuffService + '/Save',
            params: stuff.data,
            scope: stuff,
            success: function(response){
                if (stampApplicationStore) 
                    stampApplicationStore.load();
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.stamp.StuffXmlReader()
                });
                var newStuff = newstore.getAt(0);
                var sutffStampStore = this.stuffStamps;
                for (var i = 0; i < sutffStampStore.length; i++) {
                    sutffStampStore[i].set('stuffID', newStuff.get('id'));
                    this._SaveStuffStamp(sutffStampStore[i]);
                }
            }
        });
    }
    
    //保存基本信息
    this._save = function(stampApplication){
        Ext.Ajax.request({
            url: Srims.service.stamp.StampApplicationService + '/Save',
            params: stampApplication.data,
            scope: this,
            success: function(response){
            
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.stamp.StampApplicationXmlReader()
                });
                var newStampApplication = newstore.getAt(0);
                
                var sutffStore = this.panel.panel._panelStuff._stuffGridPanel._stuffGridPanel.getStuffs();
                for (var i = 0; i < sutffStore.length; i++) {
                    var record = sutffStore[i].copy();
                    record.set('stampApplicationID', newStampApplication.get('id'));
                    record.stuffStamps = sutffStore[i].stuffStamps;
                    this._SaveStuff(record);
                }
            }
        });
    }
    this.next = function(){
    
        this._save(this.panel.panel._panelBasic._stampApplication);
        if (isNew == false) 
            Srims.WorkSpace.getWorkSpace().remove(this.panel.panel);
        else 
            Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_ShowPanel, Ext.Panel, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel_StuffPanel = function(stampApplication, stampApplicationStore){

    var stuffStore = new Srims.stamp.StuffStore(stampApplication.get('id'));
    //?
    stuffStore.on('load', function(){
        for (var i = 0; i < this.getCount(); i++) {
            var stuff = this.getAt(i);
            stuff.stuffStamps = new Array();
            
            var stuffStampStore = new Srims.stamp.StuffStampStore(stuff.get('id'));
            stuffStampStore.stuff = stuff;
            
            stuffStampStore.on('load', function(){
                var stuff = this.stuff;
                for (var j = 0; j < this.getCount(); j++) {
                    var stuffStamp = this.getAt(j);
                    var newStuffStamp = new Srims.stamp.StuffStamp({});
                    newStuffStamp.set('stampID', stuffStamp.get('stampID'));
                    newStuffStamp.set('number', stuffStamp.get('number'));
                    newStuffStamp.set('pagination', stuffStamp.get('pagination'));
                    stuff.stuffStamps[stuff.stuffStamps.length] = newStuffStamp;
                }
            });
            stuffStampStore.load();
        }
    });
    stuffStore.load();
    
    this._stuffGridPanel = new Srims.stamp.StampApplicationEditPanel_StuffGridForm(stampApplication, stampApplicationStore, stuffStore, true);
    
    Srims.stamp.StampApplicationEditPanel_StuffPanel.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        //Height: 900,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        layout: 'form',
        items: [this._stuffGridPanel]
    });
    
    this.next = function(){
        if (this._stuffGridPanel._stuffGridPanel.getStuffStore().getCount() == 0) {
            Ext.Msg.show({
                title: '文印材料不能为空',
                msg: '请添加文印材料',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        this.panel.panel._panelShow._stuffGridPanel._stuffGridPanel._store.removeAll();
        this.panel.panel._panelShow._stuffGridPanel._stuffGridPanel._store.add(this._stuffGridPanel._stuffGridPanel.getStuffStore().getRange());
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffPanel, Ext.Panel, {});
if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel_BasicForm = function(stampApplication, isNew) {

    this._stampApplication = stampApplication;
    var user = Srims.currentLoginLog.user;
    this._isNew = isNew;
    var userIsExpert = user.userRoleType == 'Expert';


    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._stampApplication.get('keyWord'),
        width: 150
    });
    this._comboBoxStuffComingFrom = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目来源',
        // isReturn: undefined,
        value: this._stampApplication.get('stampStuffFromID') == 0 ? '' : this._stampApplication.get('stampStuffFromName'),
        disabled: !this._stampApplication.get('isProjectRelated'),
        selectEntityId: this._stampApplication.get('stampStuffFromID'),
        allowBlank: false,
        listWidth: 370,
        width: 360
    });
    this._textFieldStuffComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源(其他)',
        value: this._stampApplication.get('stampStuffFromName'),
        //   disabled: !this._stampApplication.get('isProjectRelated'),
        allowBlank: false,
        width: 360
    });

    this._textFieldManager = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '经办人',
        value: !stampApplication.isNew() ? stampApplication.get('manager') : userIsExpert ? user.name : stampApplication.get('manager'),
        allowBlank: false,
        selectEntityId: 0,
        width: 168
    });
    this._numberFieldManagerPhone = new Ext.form.NumberField({
        fieldLabel: '经办人电话',
        value: this._stampApplication.get('managerPhone'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 150
    });
    this._textFieldManagerEmail = new Ext.form.TextField({
        fieldLabel: '经办人邮箱',
        value: this._stampApplication.get('managerEmail'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 168
    });
    this._numberFieldNUmber = new Ext.form.NumberField({
        fieldLabel: '材料份数',
        value: this._stampApplication.isNew() ? '1' : this._stampApplication.get('stuffNumber'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 150
    });
    this._comboBoxPrincipal = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '负责人',
        width: 168,
        value: !stampApplication.isNew() ? stampApplication.get('principal') : userIsExpert ? user.name : stampApplication.get('principal'),
        selectEntityId: !stampApplication.isNew() ? stampApplication.get('principalID') : userIsExpert ? user.expertId : stampApplication.get('principalID'),
        allowBlank: false,
        disabled: userIsExpert,
        editable: !userIsExpert
    });

    this._comboBoxGroup = new Srims.component.EntityComboBox({
        fieldLabel: '文印申请类型组',
        editable: false,
        store: new Srims.stamp.StampApplicationTypeGroupStore(Srims.service.stamp.StampApplicationTypeGroupService + '/Query', {}),
        displayField: 'name',
        value: this._stampApplication.get('stampApplicationTypeGroupName'),
        entityId: this._stampApplication.get('stampApplicationTypeGroupID'),
        allowBlank: false,
        width: 150
    });
    this._comboBoxProjectRelated = new Srims.component.EntityComboBox({
        fieldLabel: '文印申请类型',
        editable: false,
        store: new Srims.stamp.StampApplicationTypeStoreForGroup(),
        displayField: 'name',
        mode: 'local',
        value: this._stampApplication.get('stampApplicaitonTypeName'),
        entityId: this._stampApplication.get('stampApplicaitonTypeID'),
        allowBlank: false,
        width: 150
    });

    this._isDuplexPrint = new Ext.form.Checkbox({
        fieldLabel: '双面打印',
        checked: this._stampApplication.get('isDuplexPrint')
    });
    this._sealPerforation = new Ext.form.Checkbox({
        fieldLabel: '骑缝章',
        checked: this._stampApplication.get('sealPerforation')
    });
    this._expertPrint = new Ext.form.Checkbox({
        fieldLabel: '专家自行打印',
        checked: this._stampApplication.get('expertPrint')
    });

    var columnFirstItems = [this._comboBoxPrincipal, this._textFieldManager, this._textFieldManagerEmail, this._expertPrint];
    var columnSecondItems = [this._textFieldKeyWord, this._numberFieldManagerPhone, this._numberFieldNUmber, this._sealPerforation, this._isDuplexPrint];

    Srims.stamp.StampApplicationEditPanel_BasicForm.superclass.constructor.call(this, {
        title: '文印基本信息',
        widht: 600,
        Height: 450,
        frame: true,
        labelWidth: 90,
        layout: 'form',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._comboBoxGroup, this._comboBoxProjectRelated, this._comboBoxStuffComingFrom, this._textFieldStuffComingFrom, new Ext.Panel({
            labelWidth: 90,
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:350px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:350px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });
    // //级联选择
    this._comboBoxGroup.comboBoxProjectRelated = this._comboBoxProjectRelated;

    if (stampApplication.get('stampApplicationTypeGroupID')) {
        this._comboBoxProjectRelated.store.load({
            params: {
                ID: stampApplication.get('stampApplicationTypeID')
            }
        });
    }
    else {
        this._comboBoxProjectRelated.disable();
    }

    //method
    this.assginValues = function() {
        this._stampApplication.set('keyWord', this._textFieldKeyWord.getValue());
        this._stampApplication.set('stampStuffFromID', this._comboBoxStuffComingFrom.getValue());
        this._stampApplication.set('stampStuffFromName', this._textFieldStuffComingFrom.getValue());
        this._stampApplication.set('stuffNumber', this._numberFieldNUmber.getValue());
        // this._stampApplication.set('stampReason', this._comboBoxStampReason.getValue());
        this._stampApplication.set('manager', this._textFieldManager.getText());
        this._stampApplication.set('managerPhone', this._numberFieldManagerPhone.getValue());
        this._stampApplication.set('managerEmail', this._textFieldManagerEmail.getValue());
        this._stampApplication.set('principalID', this._comboBoxPrincipal.getValue());
        this._stampApplication.set('principal', this._comboBoxPrincipal.getText());
        this._stampApplication.set('isDuplexPrint', this._isDuplexPrint.getValue());
        this._stampApplication.set('sealPerforation', this._sealPerforation.getValue());
        this._stampApplication.set('expertPrint', this._expertPrint.getValue());
        this._stampApplication.set('stampApplicationTypeID', this._comboBoxProjectRelated.getValue());
        this._stampApplication.set('stampApplicationTypeName', this._comboBoxProjectRelated.getText());
        this._stampApplication.set('stampApplicationTypeGroupID', this._comboBoxGroup.getValue());
        this._stampApplication.set('stampApplicationTypeGroupName', this._comboBoxGroup.getText());
    }
    this._setTextFieldStuffComingFrom = function() {
        if (this._comboBoxStuffComingFrom.getText() == '其他') {
            this._comboBoxStuffComingFrom.clearValue();
            Ext.Msg.show({
                title: '请选择项目',
                msg: '请输入项目名称或者负责人，选择一个具体的项目。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
        } else {
            this._textFieldStuffComingFrom.setValue(this._comboBoxStuffComingFrom.getText());
        }
    }
    this._comboBoxStuffComingFrom.panel = this;
    this._comboBoxStuffComingFrom.on('select', function() {
        var panel = this.panel;
        panel._setTextFieldStuffComingFrom();
    });
    this._setManager = function() {
        var manager = this._textFieldManager.getText();
        if (!manager || manager.trim().length == 0)
            this._textFieldManager.setValue(this._comboBoxPrincipal.getText());
    }
    this._comboBoxPrincipal.panel = this;
    this._comboBoxPrincipal.on('select', function() {
        var panel = this.panel;
        panel._setManager();
    });
    this.validTextField = function(component, value) {
        if (value && value.trim().length == 0) {
            Ext.Msg.show({
                title: component.fieldLabel + '错误',
                msg: '您输入的值只有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;

    }
    this._validMananger = function() {
        if (!this._textFieldManager.getText()) {
            Ext.Msg.show({
                title: '',
                msg: '经办人不能为空，请输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;

    }
    this.isValid = function(preventMark) {
        var result = true;

        result = this._textFieldKeyWord.isValid(preventMark) && result;
        if (!this._stampApplicationChange) {
            result = this._comboBoxStuffComingFrom.isValid(preventMark) && result;
        }
        result = this._textFieldStuffComingFrom.isValid(preventMark) && result;
        result = this._numberFieldNUmber.isValid(preventMark) && result;
        result = this._validMananger() && result;
        result = this._numberFieldManagerPhone.isValid(preventMark) && result;
        result = this._textFieldManagerEmail.isValid(preventMark) && result;
        result = this._comboBoxPrincipal.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldKeyWord, this._textFieldKeyWord.getValue()) && result;
        result = this.validTextField(this._textFieldManager, this._textFieldManager.getText()) && result;
        result = this.validTextField(this._textFieldStuffComingFrom, this._textFieldStuffComingFrom.getValue()) && result;
        result = this._comboBoxGroup.isValid(preventMark) && result;
        if (this._stampApplicationChange) {
            result = this._comboBoxProjectRelated.isValid(preventMark) && result;
        }

        return result;
    }

    this._onComboBoxGroup_select = function(comboBox) {
        var GroupId = comboBox.getValue();
        var comboBoxProjectRelated = comboBox.comboBoxProjectRelated;

        comboBoxProjectRelated.setValue(undefined);
        if (GroupId == undefined) {
            comboBoxProjectRelated.disable();
            comboBoxProjectRelated.store.removeAll();
        }
        else {
            comboBoxProjectRelated.enable();
            comboBoxProjectRelated.setValue(undefined);
            comboBoxProjectRelated.store.load({
                params: {
                    stampApplicationTypeGroupID: GroupId
                }
            });
        }
    }


    //event
    this._comboBoxProjectRelated.setSelectEntityId(this._stampApplication.get('stampApplicationTypeID'));
    this._comboBoxProjectRelated.setValue(this._stampApplication.get('stampApplicationTypeName'));
    this._comboBoxGroup.on('select', this._onComboBoxGroup_select);
    this._comboBoxGroup.on('change', function(comboBox) {
        comboBox.fireEvent('select', comboBox);
    });

    this._stampApplicationChange = function(comboBox) {
        var stampApplicationType = comboBox.getEntity();
        if (stampApplicationType.get('isProjectRelated')) {
            this._textFieldStuffComingFrom.disable();
            this._comboBoxStuffComingFrom.enable();
        }
        else {
            this._comboBoxStuffComingFrom.disable();
            this._textFieldStuffComingFrom.enable();
            this._comboBoxStuffComingFrom.setSelectEntityId(undefined);
            this._comboBoxStuffComingFrom.setValue(undefined);


        }
        return stampApplicationType.get('isProjectRelated');
    }
    this._comboBoxProjectRelated._comboBoxStuffComingFrom = this._comboBoxStuffComingFrom;
    this._comboBoxProjectRelated._textFieldStuffComingFrom = this._textFieldStuffComingFrom;

    this._comboBoxProjectRelated.on('select', this._stampApplicationChange);

    this._comboBoxProjectRelated.on('select', this._stampApplicationChange);

    this.next = function() {
        if (this.isValid(false) == false)
            return;
        this.assginValues();
        this.panel.panel._panelShow._basicPanel.resetValues(this._stampApplication);
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_BasicForm, Ext.form.FormPanel, {});
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationEditPanel_StuffGridForm = function(stampApplication, stampApplicationStore, stuffStore, isforStampApplicationEditPanel){

    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    
    this._stuffGridPanel = new Srims.stamp.StuffGridPanel(this._stampApplication, this._stampApplicationStore, stuffStore, isforStampApplicationEditPanel);
    
    Srims.stamp.StampApplicationEditPanel_StuffGridForm.superclass.constructor.call(this, {
        title: '材料列表',
        widht: 500,
        //Height: 380,
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._stuffGridPanel]
    });
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffGridForm, Ext.Panel, {});
if (!Srims.stamp)
	Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel = function(sm) {
	Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel.superclass.constructor.call(this, [sm,{
		header: "id",
		dataIndex: 'id',
		sortable: false,
		hidden: true
	},{
		header: "图章类型",
		dataIndex: 'type',
		width: 200,
		sortable: false,
		hidden: false
	},{
		id: 'number',
		header: '数量',
		dataIndex: 'number',
		width: 200,
		sortable: false,
		editor: new Ext.form.NumberField({
			allowDecimals: false,
			allowNegative: false,
			allowBlank: false,
			minValue: 1
		})
	},{
		id: 'pagination',
		header: '盖章页',
		dataIndex: 'pagination',
		width: 200,
		sortable: false,
		editor: new Ext.form.TextField({
			allowDecimals: false,
			allowNegative: false,
			allowBlank: false,
			minValue: 1
		})
	}])
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel = function(stuff){

        this._selections = new Ext.grid.CheckboxSelectionModel({
        singleSelect: false,
        checkOnly: true,
        handleMouseDown: Ext.emptyFn
    });
    this._selections.grid = this;
    this._columnModel = new Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel(this._selections);
    
    var url = Srims.service.stamp.StampService + '/Search';
    var params = {};
    params.stuffID = stuff.isNew() ? 0 : stuff.get('id');
    this._store = new Srims.stamp.StampStore(params, url);
    this._store.grid = this;
    this._store.stuff = stuff;
    
    //初始化已选择的章
    this._store.on('load', function(){
    
        if (this.stuff.stampStore != undefined) {
            for (var j = 0; j < this.getCount(); j++) {
                var stamp = this.getAt(j);
                for (var k = 0; k < this.stuff.stampStore.getCount(); k++) {
                    if (stamp.get('id') == this.stuff.stampStore.getAt(k).get('id')) {
                        stamp.set('number', this.stuff.stampStore.getAt(k).get('number'));
                        stamp.set('pagination', this.stuff.stampStore.getAt(k).get('pagination'));
                        break;
                    }
                }
            }
        }
        var selectedRows = new Array();
        for (var i = 0; i < this.getCount(); i++) {
            var stamp = this.getAt(i);
            if (stamp.get('number') != '' &&stamp.get('pagination') != '') {
                selectedRows[selectedRows.length] = i;
            }
        }
        this.grid._selections.selectRows(selectedRows);
    })
    this._store.load();
    
    Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        autoHeight: true,
        width: 500,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        autoExpand: true,
        autoExpandColumn: 'number',
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });
    //取得store
    this.getStore = function(){
        return this._store;
    }
    //是否是新建的材料
    this.isNewStuff = function(){
        return stuff.isNew() && stuff.stampStore == undefined;
    }
    //判断是否有章的数量为空
    this.validEditor = function(){
        var result = true;
        for (var i = 0; i < this._selections.getSelections().length; i++) {
            var stamp = this._selections.getSelections()[i];
            if (stamp.get('number') == '') {
                result = false;
                break;
            }
        }
        return result;
    }
     //判断是否有章的盖章页为空
    this.validEditorPagination = function(){
        var result = true;
        for (var i = 0; i < this._selections.getSelections().length; i++) {
            var stamp = this._selections.getSelections()[i];
            if (stamp.get('pagination') == '') {
                result = false;
                break;
            }
        }
        return result;
    }
    
    this._rowSelect = function(selection, rowIndex, stamp){
        selection.grid._columnModel.setEditable(3, true);
    }
    this._selections.on('rowselect', this._rowSelect);
    this._rowdeSelect = function(selection, rowIndex, stamp){
        stamp.set('number', '');
        stamp.set('pagination', '');
        selection.grid._columnModel.setEditable(3, false);
    }
    this._selections.on('rowdeselect', this._rowdeSelect);
    
    }
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel, Ext.grid.EditorGridPanel, {});
if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel_StuffStampForm = function(id, stuffStore, stuff, stampApplication) {

	this._id = id;
	this._stuffStore = stuffStore;
	this._stampApplication = stampApplication;
	this._stuff = stuff;
	this._isNew = this._stuff.isNew();

	this._buttonClose = new Ext.Button({
		minWidth: 80,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.close();
		}
	});
	this._buttonSave = new Ext.Button({
		minWidth: 80,
		text: '保 存',
		window: this
	});

	this._textFieldName = new Ext.form.TextField({
		fieldLabel: '文件名称',
		value: this._isNew ? "" : this._stuff.get('stuffName'),
		allowBlank: false,
		width: 250
	});
	this._comboBoxStuffTypes = new Srims.component.NoticeTextComboBox({
		fieldLabel: '文件类型',
		value: this._stuff.get('stuffType'),
		displayField: 'name',
		noticeTextType: 'StuffType',
		editable: true,
		triggerAction: 'all',
		allowBlank: true,
		listWidth: 150,
		width: 140
	});

	this._textFieldStuffType = new Ext.form.TextField({
		fieldLabel: '文件类型(其他)',
		value: this._stuff.get('stuffType'),
		allowBlank: false,
		disabled: true,
		width: 140
	});
	this._fileUploadField = new Srims.component.FileUploadField({
		id: 'upLoadStuffDocument',
		fieldLabel: '上传文印材料',
		width: 140,
		emptyText: '请选择要上传的文印材料',
		allowBlank: !String.isEmpty(this._stuff.get('stuffDocument')) ? true : false,
		fileTypes: ['pdf'],
		buttonCfg: {
			text: '',
			iconCls: 'icon-upload'
		}
	});
	this._labelDoucmentHint = new Ext.form.Label({
		html: !String.isEmpty(this._stuff.get('stuffDocument')) ? '<span style="color:#FF0000">您已经上传了该申请材料的文档。可重新上传。</span>' : ''
	})

	this._StampEditGridPnel = new Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel(this._stuff);
	var items1 = [this._comboBoxStuffTypes];
	var items2 = [this._textFieldStuffType];

	this._StuffPanel = new Ext.Panel({
		widht: 600,
		Height: 300,
		labelWidth: 90,
		layout: 'form',
		bodyStyle: 'padding:0 5px 0',
		style: 'margin-bottom: 2px',
		defaultType: 'textfield',
		items: [this._textFieldName, new Ext.Panel({
			width: 600,
			layout: 'column',
			items: [new Ext.Panel({
				labelWidth: 90,
				width: 300,
				layout: 'form',
				items: items1
			}), new Ext.Panel({
				labelWidth: 90,
				width: 300,
				style: 'width:350px',
				layout: 'form',
				items: items2
			})]
		}), new Ext.Panel({
			width: 600,
			layout: 'column',
			items: [new Ext.Panel({
				labelWidth: 90,
				width: 240,
				layout: 'form',
				items: this._fileUploadField
			}), new Ext.Panel({
				labelWidth: 5,
				width: 300,
				layout: 'form',
				items: this._labelDoucmentHint
			})]
		})]
	});

	this._formPanelStuff = new Ext.FormPanel({
		fileUpload: true, //标志此表单数据中包含文件数据
		frame: true,
		layout: 'form',
		labelWidth: 60,
		autoHeight: true,
		bodyStyle: 'padding: 10px 0 10px 10px',
		items: [this._StuffPanel, this._StampEditGridPnel]
	});
	Srims.stamp.StampApplicationEditPanel_StuffStampForm.superclass.constructor.call(this, {
		id: this._id,
		title: '添加材料信息',
		iconCls: 'icon-new',
		width: 600,
		autoHeight: true,
		labelWidth: 80,
		modal: true,
		deferredRender: false,
		frame: true,
		closeAction: 'close',
		layout: 'form',
		items: [this._formPanelStuff],
		buttons: [this._buttonSave, this._buttonClose]
	});

	//取得材料
	this.getStuff = function(documentGuid) {
		this._stuff.set("stuffName", this._textFieldName.getValue());
		this._stuff.set("stuffType", this._textFieldStuffType.getValue());

		if (!String.isEmpty(documentGuid))
			this._stuff.set("stuffDocument", documentGuid);

		return this._stuff;
	}
	//新建材料章型
	this.newStuffStamp = function(newStuffStamp) {
		var stuffStamp = new Srims.stamp.StuffStamp({});
		stuffStamp.set('stampID', newStuffStamp.get('id'));
		stuffStamp.set('type', newStuffStamp.get('type'));
		stuffStamp.set('number', newStuffStamp.get('number'));
		stuffStamp.set('pagination', newStuffStamp.get('pagination'));
		return stuffStamp;
	}
	this.validTextField = function(component, value) {
		if (value && value.trim().length == 0) {
			Ext.Msg.show({
				title: component.fieldLabel + '错误',
				msg: '您输入的值只有空格，请重新输入。',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.WARNING
			});
			return false;
		}
		return true;

	}
	this._setTextFieldStuffType = function() {
		if (this._comboBoxStuffTypes.getValue() == '其他') {
			this._textFieldStuffType.enable();
			this._textFieldStuffType.setValue('');
		} else {
			this._textFieldStuffType.disable();
			this._textFieldStuffType.setValue(this._comboBoxStuffTypes.getValue());
		}
	}
	this._comboBoxStuffTypes.panel = this;
	this._comboBoxStuffTypes.on('select', function() {
		var panel = this.panel;
		panel._setTextFieldStuffType();
	});
	this.isValid = function(preventMark) {
		var result = true;
		result = this._textFieldName.isValid(preventMark) && result;
		result = this._textFieldStuffType.isValid(preventMark) && result;
		result = this._comboBoxStuffTypes.isValid(preventMark) && result;
		result = this.validTextField(this._textFieldName) && result;
		result = this.validTextField(this._textFieldStuffType) && result;
		result = this._fileUploadField.isValid(preventMark) && result;
		return result;
	}
	this.reset = function() {
		this._textFieldName.reset();
		this._textFieldStuffType.reset();
		this._comboBoxStuffTypes.reset();
		this._StampEditGridPnel._store.load();
		this._StampEditGridPnel._selections.clearSelections()
	}
	this.save = function() {
		this._formPanelStuff.getForm().submit({
			url: Srims.service.stamp.StuffService + '/UpLoadDocument',
			waitMsg: '正在上传文印材料，请耐心等待',
			scope: this,
			success: function(form, action) {

				var jsonData = Ext.util.JSON.decode(action.response.responseText);
				var documentGuid = jsonData.guid;

				this.stuff = this.getStuff(documentGuid);
				var isNewStuff = this._StampEditGridPnel.isNewStuff();
				this.stuff.stampStore = this._StampEditGridPnel.getStore();
				this.stuff.stuffStamps = new Array();
				var stuffStamps = this._StampEditGridPnel._selections.getSelections();
				this.stuff.set('stampTypes', '');
				for (var i = 0; i < stuffStamps.length; i++) {
					var stuffStamp = this.newStuffStamp(stuffStamps[i]);
					this.stuff.stuffStamps[this.stuff.stuffStamps.length] = stuffStamp;
					var stampType = (this.stuff.get('stampTypes') ? (this.stuff.get('stampTypes') + ',') : '') + stuffStamp.get('type') + '(' + stuffStamp.get('number') + ')'
					this.stuff.set('stampTypes', stampType);
				}

				if (isNewStuff)
					this._stuffStore.add(stuff);

				this.close();
			}
		});
	}
	this._onButonSave_Click = function(button, e) {
		var window = button.window;

		if (!window.isValid(false))
			return;
		if (window._StampEditGridPnel._selections.getSelections().length == 0) {
			Ext.Msg.show({
				title: '材料章型不能为空',
				msg: '请添加材料章型',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		if (window._StampEditGridPnel.validEditor() == false) {
			Ext.Msg.show({
				title: '章数不能为空',
				msg: '请填写章型的数量',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		if (window._StampEditGridPnel.validEditorPagination() == false) {
			Ext.Msg.show({
				title: '盖章页不能为空',
				msg: '请填写盖章页',
				buttons: Ext.Msg.OK,
				icon: Ext.MessageBox.INFO
			});
			return;
		}
		button.setText('正在保存');
		button.disable();
		window.save();
	}
	this._buttonSave.on('click', this._onButonSave_Click);
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffStampForm, Ext.Window, {});
if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel = function(id, stampApplication, store) {

    this._id = id;
    this._stampApplication = stampApplication;
    this._store = store;
  //  this._isProject = isProject;
    var isNew = this._stampApplication.isNew();
    this._title = this._stampApplication.isNew() ? "文印申请" : "编辑文印";


    this._panelBasic = new Srims.stamp.StampApplicationEditPanel_BasicForm(this._stampApplication, isNew);
    this._panelStuff = new Srims.stamp.StampApplicationEditPanel_StuffPanel(this._stampApplication, this._store);
    this._panelShow = new Srims.stamp.StampApplicationEditPanel_ShowPanel(this._stampApplication, this._store);

    this._processPanels = [this._panelBasic, this._panelStuff, this._panelShow];

    this._processDescriptionStore = Srims.expertGuide.StampApply_ProcessDescriptionStore;
    this._processesShowPanel = new Srims.expertGuide.ProcessesShowForm(this._processDescriptionStore, '文印申请流程');
    this._StampApplySingleProcessOperatePanel = new Srims.expertGuide.SingleProcessOperatePanel('stampApply', this._processDescriptionStore, this._processPanels);

    this._StampApplySingleProcessOperatePanel.panel = this;
    this._processDescriptionStore.panel = this;

    Srims.stamp.StampApplicationEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        height: 224,
        width: 650,
        iconCls: 'icon-stamp',
        buttonAlign: 'center',
        title: this._title,
        items: [this._processesShowPanel, this._StampApplySingleProcessOperatePanel]
    });
    this.onDestroy = function(panel) {
        var panelId = 'StampApplicationShowPanel' + this._stampApplication.get('id');
        if (Ext.getCmp(panelId)) {
            Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
            //Srims.stamp.showStampApplication(this._stampApplication, this._store);
        }
    }
    this.on('destroy', this.onDestroy);
}
Ext.extend(Srims.stamp.StampApplicationEditPanel, Ext.Panel, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditWindow_InforForm = function(stampApplication){

    this._stampApplication = stampApplication;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    
    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._stampApplication.get('keyWord'),
        minLength: 3,
        maxLength: 5,
        width: 150
    });
    this._comboBoxStuffComingFrom = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目来源',
        // isReturn: undefined,
        value: this._stampApplication.get('stampStuffFromID') == 0 ? '' : this._stampApplication.get('stampStuffFromName'),
        selectEntityId: this._stampApplication.get('stampStuffFromID'),
        allowBlank: false,
        listWidth: 370,
        width: 350
    });
    this._textFieldStuffComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源',
        value: this._stampApplication.get('stampStuffFromName'),
        enabled: this._stampApplication.get('stampStuffFromID') == 0,
        disabled: this._stampApplication.get('stampStuffFromID') > 0,
        allowBlank: false,
        width: 350
    });
    this._textFieldManager = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '经办人',
        value: !stampApplication.isNew() ? stampApplication.get('manager') : userIsExpert ? user.name : stampApplication.get('manager'),
        allowBlank: true,
        selectEntityId: 0,
        width: 168
    });
    this._numberFieldManagerPhone = new Ext.form.NumberField({
        fieldLabel: '经办人电话',
        value: this._stampApplication.get('managerPhone'),
        allowDecimals: false,
        allowNegative: false,
        width: 150
    });
    this._numberFieldNUmber = new Ext.form.NumberField({
        fieldLabel: '材料份数',
        value: this._stampApplication.get('stuffNumber'),
        allowDecimals: false,
        allowNegative: false,
        allowBlank: false,
        width: 150
    });
    this._comboBoxPrincipal = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '负责人',
        width: 168,
        value: !stampApplication.isNew() ? stampApplication.get('principal') : userIsExpert ? user.name : stampApplication.get('principal'),
        selectEntityId: !stampApplication.isNew() ? stampApplication.get('principalID') : userIsExpert ? user.expertId : stampApplication.get('principalID'),
        allowBlank: false,
        disabled: userIsExpert,
        editable: !userIsExpert
    });
    this._comboBoxStampReason = new Srims.component.NoticeTextComboBox({
        fieldLabel: '盖章事由',
        value: this._stampApplication.get('stampReason'),
        displayField: 'name',
        noticeTextType: 'StampReason',
        editable: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    var columnFirstItems = [this._comboBoxPrincipal, this._textFieldManager, this._comboBoxStampReason];
    var columnSecondItems = [this._textFieldKeyWord, this._numberFieldManagerPhone, this._numberFieldNUmber];
    
    Srims.stamp.StampApplicationEditWindow_InforForm.superclass.constructor.call(this, {
        title: '',
        widht: 600,
        Height: 600,
        frame: true,
        labelWidth: 90,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._comboBoxStuffComingFrom, this._textFieldStuffComingFrom, new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width:300,
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
    
    this.assginValues = function(){
        this._stampApplication.set('keyWord', this._textFieldKeyWord.getValue());
        this._stampApplication.set('stampStuffFromID', this._comboBoxStuffComingFrom.getValue());
        this._stampApplication.set('stampStuffFromName', this._textFieldStuffComingFrom.getValue());
        this._stampApplication.set('stuffNumber', this._numberFieldNUmber.getValue());
        this._stampApplication.set('stampReason', this._comboBoxStampReason.getValue());
        this._stampApplication.set('manager', this._textFieldManager.getText());
        this._stampApplication.set('managerPhone', this._numberFieldManagerPhone.getValue());
        this._stampApplication.set('principalID', this._comboBoxPrincipal.getValue());
    }
    this._setTextFieldStuffComingFrom = function(){
        if (this._comboBoxStuffComingFrom.getText() == '其他') {
            this._textFieldStuffComingFrom.enable();
            this._textFieldStuffComingFrom.setValue('');
        }
        else {
            this._textFieldStuffComingFrom.disable();
            this._textFieldStuffComingFrom.setValue(this._comboBoxStuffComingFrom.getText());
        }
    }
    this._comboBoxStuffComingFrom.panel = this;
    this._comboBoxStuffComingFrom.on('select', function(){
        var panel = this.panel;
        panel._setTextFieldStuffComingFrom();
    });
    this._setManager = function(){
        var manager = this._textFieldManager.getText();
        if (!manager || manager.trim().length == 0) 
            this._textFieldManager.setValue(this._comboBoxPrincipal.getText());
    }
    this._comboBoxPrincipal.panel = this;
    this._comboBoxPrincipal.on('select', function(){
        var panel = this.panel;
        panel._setManager();
    });
    this.validTextField = function(component, value){
        if (value && value.trim().length == 0) {
            Ext.Msg.show({
                title: component.fieldLabel + '错误',
                msg: '您输入的值只有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
        
    }
    this._validMananger = function(){
        if (!this._textFieldManager.getText()) {
            Ext.Msg.show({
                title: '',
                msg: '经办人不能为空，请输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
        
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldKeyWord.isValid(preventMark) && result;
        result = this._comboBoxStuffComingFrom.isValid(preventMark) && result;
        result = this._textFieldStuffComingFrom.isValid(preventMark) && result;
        result = this._numberFieldNUmber.isValid(preventMark) && result;
        result = this._comboBoxStampReason.isValid(preventMark) && result;
        result = this._validMananger() && result;
        result = this._numberFieldManagerPhone.isValid(preventMark) && result;
        result = this._comboBoxPrincipal.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldKeyWord, this._textFieldKeyWord.getValue()) && result;
        result = this.validTextField(this._textFieldManager, this._textFieldManager.getText()) && result;
        result = this.validTextField(this._textFieldStuffComingFrom, this._textFieldStuffComingFrom.getValue()) && result;
        return result;
    }
}

Ext.extend(Srims.stamp.StampApplicationEditWindow_InforForm, Ext.form.FormPanel, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditWindow = function(id, stampApplication, store){

    this._id = id;
    this._stampApplication = stampApplication;
    this._store = store;
    
    var isNew = this._stampApplication.isNew();
    this._title = this._stampApplication.isNew() ? "文印申请" : "编辑文印";
    
    this._formPanelBasic = new Srims.stamp.StampApplicationEditWindow_InforForm(this._stampApplication);
    
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    
    Srims.stamp.StampApplicationEditWindow.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 224,
        width: 650,
        buttonAlign: 'center',
        title: this._title,
        iconCls: stampApplication.isNew() ? 'icon-new' : 'icon-edit',
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
        var stampApplication = this._stampApplication;
        stampApplication.beginEdit();
        this.assginValues();
        stampApplication.commit();
        Ext.Ajax.request({
            url: Srims.service.stamp.StampApplicationService + '/Save',
            params: stampApplication.data,
            scope: this,
            success: function(response){
            
                Srims.WorkSpace.getWorkSpace().remove(this);
                if (store) 
                    store.load();
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.stamp.StampApplicationXmlReader()
                });
                var newStampApplication = newstore.getAt(0);
                if (!isNew) {
                    var panelId = 'StampApplicationShowPanel' + newStampApplication.get('id');
                    if (Ext.getCmp(panelId)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.stamp.showStampApplication(newStampApplication, store);
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
Ext.extend(Srims.stamp.StampApplicationEditWindow, Ext.Window, {});
if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationShowPanel_BasicForm = function(stampApplication) {
    this._stampApplication = stampApplication;

    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._stampApplication.get('keyWord'),
        readOnly: true,
        width: 160
    });
    this._textFieldStuffComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源',
        value: this._stampApplication.get('stampStuffFromName'),
        readOnly: true,
        width: 360
    });
    this._textFieldManager = new Ext.form.TextField({
        fieldLabel: '经办人',
        value: this._stampApplication.get('manager'),
        readOnly: true,
        width: 160
    });
    this._textFieldManagerPhone = new Ext.form.TextField({
        fieldLabel: '经办人电话',
        value: this._stampApplication.get('managerPhone'),
        readOnly: true,
        width: 160
    });
    this._textFieldManagerEmail = new Ext.form.TextField({
        fieldLabel: '经办人邮箱',
        value: this._stampApplication.get('managerEmail'),
        readOnly: true,
        width: 160
    });
    this._textFieldNUmber = new Ext.form.TextField({
        fieldLabel: '材料份数',
        value: this._stampApplication.get('stuffNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 160,
        value: this._stampApplication.get('principal'),
        readOnly: true
    });
    
    this._textFieldCurrentState = new Ext.form.TextField({
        fieldLabel: '当前状态',
        value: Srims.stamp.StampStateRender(this._stampApplication.get('currentState')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentStateTime = new Ext.form.TextField({
        fieldLabel: '当前状态时间',
        value: Date.render(this._stampApplication.get('currentStateTime')),
        readOnly: true,
        width: 160
    });
    this._textFieldCurrentStateOperator = new Ext.form.TextField({
        fieldLabel: '操作人',
        value: this._stampApplication.get('operator'),
        readOnly: true,
        width: 160
    });
    this._isDuplexPrint = new Ext.form.Checkbox({
        fieldLabel: '双面打印',
        readOnly: true,
        checked: this._stampApplication.get('isDuplexPrint')
    });
    this._sealPerforation = new Ext.form.Checkbox({
        fieldLabel: '骑缝章',
        readOnly: true,
        checked: this._stampApplication.get('sealPerforation')
    });
    this._expertPrint = new Ext.form.Checkbox({
        fieldLabel: '专家自行打印',
        readOnly: true,
        checked: this._stampApplication.get('expertPrint')
    });
    this._textFieldStampApplicationType = new Ext.form.TextField({
        fieldLabel: '文印申请类型',
        value: this._stampApplication.get('stampApplicationTypeName'),
        readOnly: true,
        width: 360
    });
    this._textFieldStampApplicationTypeGroup = new Ext.form.TextField({
        fieldLabel: '文印申请类型组',
        value: this._stampApplication.get('stampApplicationTypeGroupName'),
        readOnly: true,
        width: 360
    });
    var columnFirstItems = [this._textFieldPrincipal, this._textFieldManager,  this._textFieldCurrentState, this._expertPrint, this._isDuplexPrint, this._sealPerforation];
    var columnSecondItems = [this._textFieldKeyWord, this._textFieldManagerPhone, this._textFieldManagerEmail, this._textFieldNUmber, this._textFieldCurrentStateOperator, this._textFieldCurrentStateTime];

    Srims.stamp.StampApplicationShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 90,
        layout: 'form',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldStuffComingFrom, this._textFieldStampApplicationTypeGroup, this._textFieldStampApplicationType,new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                labelWidth: 90,
                width: 300,
                layout: 'form',
                style: 'width:350px',
                items: columnFirstItems
            }), new Ext.Panel({
                labelWidth: 90,
                width: 300,
                style: 'width:350px',
                layout: 'form',
                items: columnSecondItems
            })]
        })]
    });

    //方法
    this.resetValues = function(stamp) {
        this._textFieldStuffComingFrom.setValue(stamp.get('stampStuffFromName'));
        this._textFieldPrincipal.setValue(stamp.get('principal'));
        this._textFieldKeyWord.setValue(stamp.get('keyWord'));
        this._textFieldManager.setValue(stamp.get('manager'));
        this._textFieldManagerPhone.setValue(stamp.get('managerPhone'));
        this._textFieldManagerEmail.setValue(stamp.get('managerEmail'));
       // this._textFieldStampReason.setValue(stamp.get('stampReason'));
        this._textFieldNUmber.setValue(stamp.get('stuffNumber'));
        this._textFieldCurrentState.setValue(Srims.stamp.StampStateRender(stamp.get('currentState')));
        this._textFieldCurrentStateTime.setValue(Date.render(stamp.get('currentStateTime')));
        this._textFieldCurrentStateOperator.setValue(stamp.get('operator'));
        this._isDuplexPrint.setValue(stamp.get('isDuplexPrint'));
        this._sealPerforation.setValue(stamp.get('sealPerforation'));
        this._expertPrint.setValue(stamp.get('expertPrint'));
        this._textFieldStampApplicationType.setValue(stamp.get('stampApplicationTypeName'));
        this._textFieldStampApplicationTypeGroup.setValue(stamp.get('stampApplicationTypeGroupName'));

    }
}
Ext.extend(Srims.stamp.StampApplicationShowPanel_BasicForm, Ext.Panel, {});
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationShowPanel_StateHistoryForm = function(stampApplication){
    this._stampApplication = stampApplication;
    this._store = new Srims.stamp.StampStateHistoryStore(stampApplication.get('id'));
    
    this._columnModel = new Srims.stamp.StateStateHistoryColumnModel();
    
    this._gridPanelStampStateHistory = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 550,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有文印状态历史信息'
        }
    });
    
    Srims.stamp.StampApplicationShowPanel_StateHistoryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '文印状态历史信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelStampStateHistory]
    });
    
    this._store.load();
}

Ext.extend(Srims.stamp.StampApplicationShowPanel_StateHistoryForm, Ext.form.FormPanel, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationShowPanel_StuffForm = function(stampApplication){
    this._stampApplication = stampApplication;
    this._store = new Srims.stamp.StuffStore(stampApplication.get('id'));
    
    this._columnModel = new Srims.stamp.StuffGridPanel_ColumnModel();
    
    this._gridPanelStuff = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 550,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有文印材料信息'
        }
    });
    
    Srims.stamp.StampApplicationShowPanel_StuffForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '文印材料信息(双击查看文印材料)',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelStuff]
    });
    this._store.load();
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stuff = grid.getStore().getAt(rowIndex);
        Srims.stamp.downLoadStuffDoucment(stuff);
    }
    this._gridPanelStuff.on('celldblclick', onCellDblClick);
}

Ext.extend(Srims.stamp.StampApplicationShowPanel_StuffForm, Ext.form.FormPanel, {});
if (!Srims.stamp)
    Ext.namespace('Srims.stamp')

Srims.stamp.StampApplicationShowPanel_ToolBar = function(stampApplication, store, panelId, stampState) {

    //fields
    this._panelId = panelId;
    this._stampApplication = stampApplication;
    this._store = store;
    this._stampState = stampState;

    //controls

    // this._buttonEdit = new Ext.Toolbar.Button({
    //     iconCls: 'icon-edit',
    //     text: '编辑基本信息',
    //     minWidth: 60,
    //     stampApplication: this._stampApplication,
    //     store: this._store,
    //     handler: function(){
    //         Srims.stamp.editStampApplicationBasicInfor(this.stampApplication, this.store);
    //     },
    //    hidden: true,
    //     tooltip: '<b>编辑文印</b><br/>编辑选中文印的信息'
    // });
    // this._buttonSubmit = new Ext.Toolbar.Button({
    //     iconCls: 'icon-submit',
    //     text: '提交',
    //     minWidth: 60,
    //     stampApplication: this._stampApplication,
    //     store: this._store,
    //      isForCensor: this._isForCensor,
    //      handler: function(){
    //          titile = '文印申请提交';
    //         message = '你确定要提交用印申请吗？';
    //         methodName = '/SubmitStamp';
    //        Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.isForCensor);
    //     },
    //    hidden: true,
    //    tooltip: '<b>提交文印申请</b><br/>提交文印申请'
    // });
    //this._buttonStampStuffManage = new Ext.Toolbar.Button({
    //    iconCls: 'icon-project-document',
    //   text: '文印材料管理',
    //   minWidth: 60,
    //    stampApplication: this._stampApplication,
    //    store: this._store,
    //    handler: function(){
    //        Srims.stamp.showStuffManangeWindow(this.stampApplication, this.store);
    //    },
    //    hidden: true,
    //    tooltip: '<b>文印材料管理</b><br/>文印材料管理'
    // });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        stampApplication: this._stampApplication,
        store: this._store,
        handler: function() {
            Srims.stamp.editStampApplication(this.stampApplication, this.store);
        },
        hidden: true,
        tooltip: '<b>编辑文印</b><br/>编辑选中文印的信息'
    });
    this._buttonCancleSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-cancle',
        text: '撤销提交',
        minWidth: 60,
        stampApplication: this._stampApplication,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '撤销文印提交';
            message = '你确定要撤销用印申请吗？';
            methodName = '/CancleSubmitStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>撤销文印申请</b><br/>撤销文印申请'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/CensorPassStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核通过</b><br/>文印申请审核通过'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '审核驳回';
            message = '你确定要驳回此用印申请吗？';
            methodName = '/CensorRejectStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonDepartmentCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '部门审核通过',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/DepartmentCensorPassStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核通过</b><br/>文印申请审核通过'
    });
    this._buttonDepartmentCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '部门审核驳回',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/DepartmentCensorRejectStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonCensorPassComplete = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '初审最终通过',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/CensorPassCompleteStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonWaitDepartmentCensor = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '提交部门审核',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/WaitDepartmentCensorStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonStamp = new Ext.Toolbar.Button({
        iconCls: 'icon-stamp',
        text: '已盖章',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '已盖章';
            message = '你确定已对此用印盖章吗？';
            methodName = '/StampStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印盖章</b><br/>文印盖章'
    });

    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        stampApplication: this._stampApplication,
        handler: function() {
            Srims.stamp.deleteStampApplication(this.stampApplication, this.store);
        },
        hidden: true,
        tooltip: '<b>删除项目分类</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        stampApplication: this._stampApplication,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.stamp.StampApplicationService + '/GetById',
                params: {
                    stampApplicationId: this.stampApplication.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.stamp.StampApplicationXmlReader()
                    });
                    var currentStampApplication = store.getAt(0);

                    var panel = Ext.getCmp(this.panelId);
                    panel.resetValues(currentStampApplication);
                    panel._stateHistoryForm._store.load();
                    panel._stuffForm._store.load();
                }
            });
        },
        tooltip: '<b>刷新列表</b><br/>更新文印列表'
    });
    var user = Srims.currentLoginLog.user;

    var Items;
    if (stampState == undefined)
        Items = [this._buttonEdit, this._buttonCancleSubmit, this._buttonDelete, this._buttonCensorPass, this._buttonCensorReject, this._buttonCensorPassComplete, this._buttonWaitDepartmentCensor, new Ext.Toolbar.Fill(), this._buttonRefresh];

    if (stampState == Srims.stamp.StampState.UnSubmit)
        Items = [this._buttonEdit, this._buttonCensorPass, this._buttonCensorReject, this._buttonCensorPassComplete, this._buttonWaitDepartmentCensor, new Ext.Toolbar.Fill(), this._buttonRefresh];
    if (stampState == Srims.stamp.StampState.DepartmentCensorPass)
        Items = [this._buttonEdit, this._buttonStamp, new Ext.Toolbar.Fill(), this._buttonRefresh];
    if (stampState == Srims.stamp.StampState.WaitDepartmentCensor)
        Items = [this._buttonEdit, this._buttonDepartmentCensorPass, this._buttonDepartmentCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh];


    Srims.stamp.StampApplicationShowPanel_ToolBar.superclass.constructor.call(this, {
        items: Items
    });

    //initial

    this._buttonCancleSubmit.setVisible(stampApplication.get('hasPermission_CancleSubmit'));
    this._buttonCancleSubmit.setDisabled(!stampApplication.get('canCancleSubmit'));
    this._buttonDepartmentCensorPass.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
    this._buttonDepartmentCensorPass.setDisabled(!stampApplication.get('canDepartmentCensor'));

    this._buttonCensorPassComplete.setVisible(stampApplication.get('hasPermission_Censor'));
    this._buttonCensorPassComplete.setDisabled(!stampApplication.get('canCensorPassComplete'));
    this._buttonWaitDepartmentCensor.setVisible(stampApplication.get('hasPermission_Censor'));
    this._buttonWaitDepartmentCensor.setDisabled(!stampApplication.get('canCensorPassComplete'));

    this._buttonDepartmentCensorReject.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
    this._buttonDepartmentCensorReject.setDisabled(!stampApplication.get('canDepartmentCensor'));
    //  this._buttonSubmit.setVisible(stampApplication.get('hasPermission_Submit'));
    //  this._buttonSubmit.setDisabled(!stampApplication.get('canSubmit'));

    this._buttonEdit.setVisible(stampApplication.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!stampApplication.get('canEdit'));

    this._buttonDelete.setVisible(stampApplication.get('hasPermission_Edit'));
    this._buttonDelete.setDisabled(!stampApplication.get('canEdit'));

    // this._buttonStampStuffManage.setVisible(stampApplication.get('hasPermission_ManageStampStuff'));
    // this._buttonStampStuffManage.setDisabled(!stampApplication.get('canManageStampStuff'));

    this._buttonCensorPass.setVisible(stampApplication.get('hasPermission_Censor'));
    this._buttonCensorPass.setDisabled(!stampApplication.get('canCensor'));

    this._buttonCensorReject.setVisible(stampApplication.get('hasPermission_Censor'));
    this._buttonCensorReject.setDisabled(!stampApplication.get('canCensor'));

    this._buttonStamp.setVisible(stampApplication.get('hasPermission_Stamp'));
    this._buttonStamp.setDisabled(!stampApplication.get('canStamp'));

}
Ext.extend(Srims.stamp.StampApplicationShowPanel_ToolBar, Ext.Toolbar);
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationShowPanel = function(panelId, stampApplication, store, stampState){

    this._id = panelId;
    this._stampApplication = stampApplication;
    this._store = store;
    this._stampState = stampState;
    
    this._basicForm = new Srims.stamp.StampApplicationShowPanel_BasicForm(stampApplication);
    this._stateHistoryForm = new Srims.stamp.StampApplicationShowPanel_StateHistoryForm(stampApplication);
    this._stuffForm = new Srims.stamp.StampApplicationShowPanel_StuffForm(stampApplication);
    this._toolBar = new Srims.stamp.StampApplicationShowPanel_ToolBar(stampApplication, this._store, this._id, stampState);
    
    Srims.stamp.StampApplicationShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        frame: true,
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '文印' + this._stampApplication.get('id'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: [this._basicForm, this._stuffForm, this._stateHistoryForm]
    });
    
    this.resetValues = function(stampApplication){
        this._basicForm.resetValues(stampApplication);
    }
}
Ext.extend(Srims.stamp.StampApplicationShowPanel, Ext.Panel, {});
if (!Srims.stanp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationQueryWindow_BasicPanel = function(stampState) {

    this._textFieldKeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        width: 150
    });
    this._textFieldStuffComingFrom = new Ext.form.TextField({
        fieldLabel: '项目来源',
        width: 300
    });
    this._textFieldStampApplicationType = new Ext.form.TextField({
        fieldLabel: '文印申请类型',
        width: 300
    });
    this._textFieldStampApplicationTypeGroup = new Ext.form.TextField({
        fieldLabel: '文印申请类型组',
        width: 300
    });
    this._textFieldManager = new Ext.form.TextField({
        fieldLabel: '经办人',
        width: 150
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 150
    });
    this._comboBoxStampReasons = new Srims.component.NoticeTextComboBox({
        fieldLabel: '盖章事由',
        displayField: 'name',
        noticeTextType: 'StampReason',
        editable: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._checkBoxGroupCurrentState = new Srims.component.CheckBoxGroup({
        fieldLabel: '当前状态',
        cls: 'srims-checkboxGroup',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.stamp.StampStateStore),
        columns: 4
    });
    this._comboBoxStuffTypes = new Srims.component.NoticeTextComboBox({
        fieldLabel: '材料类型',
        displayField: 'name',
        noticeTextType: 'StuffType',
        editable: false,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._comboBoxStampTypes = new Srims.component.EntityComboBox({
        fieldLabel: '盖章类型',
        store: new Srims.stamp.StampStore({}, Srims.service.stamp.StampService + '/Query'),
        displayField: 'type',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });

    this._dateFieldStateDateStart = new Ext.form.DateField({
        fieldLabel: '操作时间',
        width: 150
    });
    this._dateFieldStateDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._textFieldAdministrator = new Ext.form.TextField({
        fieldLabel: '初审管理员',
        width: 150
    });
    this._textFieldDepartmentAdminiatrator = new Ext.form.TextField({
        fieldLabel: '部门管理员',
        width: 150
    });
    var items1 = [this._textFieldPrincipal, this._textFieldAdministrator, this._comboBoxStampReasons, this._comboBoxStampTypes, this._dateFieldStateDateStart];
    var items2 = [this._textFieldManager, this._textFieldDepartmentAdminiatrator, this._textFieldKeyWord, this._comboBoxStuffTypes, this._dateFieldStateDateEnd];
    var items = [];

    if (stampState == undefined)
        items = [this._textFieldStuffComingFrom, this._textFieldStampApplicationType, this._textFieldStampApplicationTypeGroup, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: items1
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: items2
            })]
        }), this._checkBoxGroupCurrentState];
    else
        items = [this._textFieldStuffComingFrom, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 100,
                items: items1
            }), new Ext.Panel({
                labelWidth: 100,
                layout: 'form',
                items: items2
            })]
        })];

    Srims.stamp.StampApplicationQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: items
    });

    this.buildParams = function(params) {
        params.keyWord = this._textFieldKeyWord.getValue();
        params.manager = this._textFieldManager.getValue();
        params.principal = this._textFieldPrincipal.getValue();
        params.stampStuffFromName = this._textFieldStuffComingFrom.getValue();
        params.stampAdministrator = this._textFieldAdministrator.getValue();
        params.stampDepartmentAdministrator = this._textFieldDepartmentAdminiatrator.getValue();
        params.stampApplicationType = this._textFieldStampApplicationType.getValue();
        params.stampApplicationTypeGroup = this._textFieldStampApplicationTypeGroup.getValue();
        if (stampState == undefined)
            params.currentState = this._checkBoxGroupCurrentState.getSelecetedValue();
        params.stampStuffs = this._comboBoxStuffTypes.getValue();
        params.stampTypes = this._comboBoxStampTypes.getText();
        params.stampReasons = this._comboBoxStampReasons.getValue();

        params.StateDateStart = Date.format(this._dateFieldStateDateStart.getValue());
        params.StateDateEnd = Date.format(this._dateFieldStateDateEnd.getValue());
    }
    this.clearParams = function() {
        this._textFieldKeyWord.reset();
        this._textFieldManager.reset();
        this._textFieldManager.reset();
        this._textFieldStuffComingFrom.reset();
        if (stampState == undefined)
            this._checkBoxGroupCurrentState.reset();
        this._comboBoxStuffTypes.reset();
        this._comboBoxStampTypes.reset();
        this._textFieldStampApplicationType.reset();
        this._textFieldStampApplicationTypeGroup.reset();
        this._comboBoxStampReasons.reset();
    }
}
Ext.extend(Srims.stamp.StampApplicationQueryWindow_BasicPanel, Ext.FormPanel);
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationQueryWindow_PrincipalPanel = function(){
    return new Srims.component.QueryWindow_MemberPanel('负责人信息');
}
if (!Srims.stamp)
	Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationQueryWindow = function(id, store, queryParams, stampState) {
	this._id = id;
	this._store = store;
	this._params = queryParams;

	this._basicPanel = new Srims.stamp.StampApplicationQueryWindow_BasicPanel(stampState);
	this._principalPanel = new Srims.stamp.StampApplicationQueryWindow_PrincipalPanel();

	this._buttonShowAll = new Ext.Button({
		minWidth: 80,
		text: '显示全部',
		window: this,
		handler: function() {
			this.window.clearParams();
			queryParams = this.window.getParams();
			this.window._store.load();
			this.window.hide();
		}
	});
	this._buttonQuery = new Ext.Button({
		minWidth: 80,
		text: '查 询',
		window: this,
		handler: function() {
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
		handler: function() {
			var window = this.window;
			window.clearParams();
		}
	});
	this._buttonClose = new Ext.Button({
		minWidth: 80,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.hide();
		}
	});
	Srims.stamp.StampApplicationQueryWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '文印查询',
		iconCls: 'icon-stamp-query',
		width: 723,
		style: 'padding:5px',
		deferredRender: false,
		frame: true,
		//autoHeight: true,
		height: stampState == undefined ? 435 : 380,
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
			items: [this._basicPanel,this._principalPanel]
		})],
		buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
	});

	this.getParams = function() {
		var params = this._params;
		this._basicPanel.buildParams(params);
		this._principalPanel.buildParams(params);
		return params;
	}
	this.clearParams = function() {

		this._basicPanel.clearParams();
		this._principalPanel.clearParams();
	}
	this.query = function(button) {
		var window = button.window;
		window.getParams();

		Srims.SetQueryParams.removeNullparams(queryParams);
		window._store.load();
		window.hide();
	}
}
Ext.extend(Srims.stamp.StampApplicationQueryWindow, Ext.Window);
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.stamp.StampApplicationStore.superclass.constructor.call(this, new Srims.stamp.StampApplicationXmlReader(), load_url, params);
    }
});

if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StampApplicationXmlReader.superclass.constructor.call(this, Srims.stamp.StampApplication);
    }
});
if (!Srims.stamp)
    Ext.namespace("Srims.stamp");

Ext.namespace('Srims.stamp.StampState');

Srims.stamp.StampState.UnSubmit = 'UnSubmit';
Srims.stamp.StampState.Submit = 'Submit';
Srims.stamp.StampState.CensorPass = 'CensorPass';
Srims.stamp.StampState.CensorReject = 'CensorReject';
Srims.stamp.StampState.DepartmentCensorPass = 'DepartmentCensorPass';
Srims.stamp.StampState.DepartmentCensorReject = 'DepartmentCensorReject';
Srims.stamp.StampState.Stamp = 'Stamp';
Srims.stamp.StampState.CensorPassComplete = 'CensorPassComplete';
Srims.stamp.StampState.WaitDepartmentCensor = 'WaitDepartmentCensor';

Srims.stamp.StampStateRender = function(value, metadata) {
    switch (value) {
        case 'UnSubmit':
            return '未提交';
        case 'Submit':
            return '已提交';
        case 'CensorPass':
            return '初审通过';
        case 'CensorReject':
            return '初审驳回';
        case 'Stamp':
            return '已盖章';
        case 'DepartmentCensorPass':
            return '部门审核通过';
        case 'DepartmentCensorReject':
            return '部门审核驳回';
        case 'CensorPassComplete':
            return '初审最终完成';
        case 'WaitDepartmentCensor':
            return '提交部门审核';

        default:
            return '未提交';
    }
}
Srims.stamp.StampStateStore = [['UnSubmit', '未提交'], ['Submit', '已提交'], ['CensorPass', '初审通过'], ['CensorPassComplete', '初审最终完成'], ['CensorReject', '初审驳回'], ['Stamp', '已盖章'], ['WaitDepartmentCensor', '提交部门审核'], ['DepartmentCensorPass', '部门审核通过'], ['DepartmentCensorReject', '部门审核驳回']];if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.StampStateHistory = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'StampID',
	type: 'int',
	mapping: 'StampID'
},{
	name: 'state',
	type: 'string',
	mapping: 'State'
},{
	name: 'operator',
	type: 'string',
	mapping: 'Operator'
},{
	name: 'remark',
	type: 'string',
	mapping: 'Remark'
},{
	name: 'dateTime',
	type: 'string',
	mapping: 'DateTime'
}]);
Srims.data.Entity.apply(Srims.stamp.StampStateHistory);
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampStateHistoryStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(stampApplicationId){
        Srims.stamp.StampStateHistoryStore.superclass.constructor.call(this, new Srims.stamp.StampStateHistoryXmlReader(), Srims.service.stamp.StampStateHistoryService + '/GetByStampID', {
            stampApplicationID: stampApplicationId
        });
    }
});

if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampStateHistoryXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StampStateHistoryXmlReader.superclass.constructor.call(this, Srims.stamp.StampStateHistory);
    }
});
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StateStateHistoryColumnModel = function() {
    Srims.stamp.StateStateHistoryColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 80,
        renderer: Srims.stamp.StampStateRender
    }, {
        header: "状态时间",
        dataIndex: 'dateTime',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "操作人",
        dataIndex: 'operator',
        width: 80
    }, {
        header: "备注",
        dataIndex: 'remark',
        width: 80
}])
    }
    Ext.extend(Srims.stamp.StateStateHistoryColumnModel, Ext.grid.ColumnModel);
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.Stuff = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'stampApplicationID',
    type: 'int',
    mapping: 'StampApplicationID'
}, {
    name: 'stuffType',
    type: 'string',
    mapping: 'StuffType'
}, {
    name: 'stuffName',
    type: 'string',
    mapping: 'StuffName'
}, {
    name: 'stampTypes',
    type: 'string',
    mapping: 'StampTypes'
}, {
    name: 'stuffDocument',
    type: 'string',
    mapping: 'StuffDocument'
}, {
    name: 'haspermission_Edit',
    type: 'boolean',
    mapping: 'Haspermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_ManageStampType',
    type: 'boolean',
    mapping: 'HasPermission_ManageStampType',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canManageStampType',
    type: 'boolean',
    mapping: 'CanManageStampType',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.stamp.Stuff);
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(stampApplicationId){
        Srims.stamp.StuffStore.superclass.constructor.call(this, new Srims.stamp.StuffXmlReader(), Srims.service.stamp.StuffService + '/GetByStampID', {
            stampApplicationID: stampApplicationId
        });
    }
});
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StuffXmlReader.superclass.constructor.call(this, Srims.stamp.Stuff);
    }
});
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffGridPanel_ColumnModel = function(){
    Srims.stamp.StuffGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "文件名称",
        dataIndex: 'stuffName',
        width: 200,
        sortable: false,
        hidden: false
    }, {
        header: "文件类型",
        dataIndex: 'stuffType',
        sortable: false,
        hidden: false
    }, {
        header: "盖章类型",
        dataIndex: 'stampTypes',
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.stamp.StuffGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffGridPanel_ToolBar = function(selection, store, stampApplication, stampApplicationStore, isforStampApplicationEditPanel){

    //fields
    this._selection = selection;
    this._store = store;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    this._isforStampApplicationEditPanel = isforStampApplicationEditPanel;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        isforStampApplicationEditPanel: this._isforStampApplicationEditPanel,
        hidden: isforStampApplicationEditPanel == false,
        handler: function(){
            if (this.isforStampApplicationEditPanel) 
                Srims.stamp.addStuffAndStampInfor(this.stampApplication, this.store);
            else 
                Srims.stamp.newStuff(this.store, this.stampApplication, this.stampApplicationStore);
        },
        tooltip: '<b>添加用印文件</b><br/>输入用印文件信息以添加用印文件'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        isforStampApplicationEditPanel: this._isforStampApplicationEditPanel,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            if (this.isforStampApplicationEditPanel) 
                Srims.stamp.editStuffAndStampInfor(this.selection.getSelected(), this.stampApplication, this.store);
            else 
                Srims.stamp.editStuff(this.selection.getSelected(), this.store, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>编辑用印文件</b><br/>编辑选中用印文件的信息'
    });
    this._buttonShowDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-document',
        text: '查看文档',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        isforStampApplicationEditPanel: this._isforStampApplicationEditPanel,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.downLoadStuffDoucment(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看文档</b><br/>'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        isforStampApplicationEditPanel: this._isforStampApplicationEditPanel,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            if (this.isforStampApplicationEditPanel) 
                Srims.stamp.removeStuff(this.selection.getSelected(), this.store);
            else 
                Srims.stamp.deleteStuff(this.selection.getSelected(), this.store, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>删除用印文件</b>'
    });
    this._buttonStuffStampManage = new Ext.Toolbar.Button({
        iconCls: 'icon-stamp-stamp-type',
        text: '文件用印管理',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.showStuffStampManageWindow(this.selection.getSelected(), this.store, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>文件用印管理</b><br/>文件用印管理'
    });
    var user = Srims.currentLoginLog.user;
    Srims.stamp.StuffGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonStuffStampManage, this._buttonShowDocument, this._buttonDelete]
    });
    
    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonStuffStampManage = this._buttonStuffStampManage;
    this._selection.buttonShowDocument = this._buttonShowDocument;
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonStuffStampManage = selection.buttonStuffStampManage;
        var buttonShowDocument = selection.buttonShowDocument;
        
        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            buttonStuffStampManage.hide();
            buttonShowDocument.hide();
            return;
        }
        
        var stuff = selection.getSelected();
        if (isforStampApplicationEditPanel == undefined) {
            buttonEdit.setVisible(stuff.get('haspermission_Edit'));
            buttonEdit.setDisabled(!stuff.get('canEdit'));
            
            buttonStuffStampManage.setVisible(stuff.get('hasPermission_ManageStampType'));
            buttonStuffStampManage.setDisabled(!stuff.get('canManageStampType'));
            
            buttonDelete.setVisible(stuff.get('haspermission_Edit'));
            buttonDelete.setDisabled(!stuff.get('canEdit'));
            
            buttonShowDocument.setVisible(true);
        }
        if (isforStampApplicationEditPanel) {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);
            buttonDelete.setVisible(true);
            buttonDelete.setDisabled(false);
            buttonShowDocument.setVisible(true);
        }
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StuffGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffGridPanel = function(stampApplication, stampApplicationStore, stuffStore, isforStampApplicationEditPanel){

    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    
    this._store = stuffStore;
    this._store.gird = this;
    
    this.stuffs = new Array();
    
    this._columnModel = new Srims.stamp.StuffGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.stamp.StuffGridPanel_ToolBar(this._selections, this._store, this._stampApplication, this._stampApplicationStore, isforStampApplicationEditPanel);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的记录'
    });
    
    //public methods
    this.getStuffStore = function(){
        return this._store;
    }
    
    this.getStuffs = function(){
        for (i = 0; i < this._store.getCount(); i++) {
            var stuff = this._store.getAt(i);
            stuff.set('id', '');
            this.stuffs[this.stuffs.length] = stuff;
        }
        
        return this.stuffs;
    }
    this.setToolBar = function(visible){
        this._toolBar.setVisible(visible);
    }
    
    Srims.stamp.StuffGridPanel.superclass.constructor.call(this, {
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
        width: 500,
        view: this._view,
        autoHeight: true
    });
    
    this._store.load();
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stuff = grid.getStuffStore().getAt(rowIndex);
        Srims.stamp.editStuff(stuff, this._store, this._stampApplication, this._stampApplicationStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.stamp.StuffGridPanel, Srims.component.GridPanel, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffEditWindow = function(id, stuff, stampApplication, store, stampApplicationStore){

    this._id = id;
    this._stuff = stuff;
    this._stampApplication = stampApplication;
    this._store = store;
    this._stampApplicationStore = stampApplicationStore;
    
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
    
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '文件名称',
        value: this._stuff.get('stuffName'),
        allowBlank: false,
        width: 160
    });
    this._comboBoxStuffTypes = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文件类型',
        value: this._stuff.get('stuffType'),
        displayField: 'name',
        noticeTextType: 'StuffType',
        editable: true,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    
    this._textFieldStuffType = new Ext.form.TextField({
        fieldLabel: '文件类型',
        value: this._stuff.get('stuffType'),
        allowBlank: false,
        disabled: true,
        width: 160
    });
    var Items = [this._textFieldName, this._comboBoxStuffTypes, this._textFieldStuffType];
    
    Srims.stamp.StuffEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: stuff.isNew() ? '新建用印文件信息' : '编辑用印文件信息',
        iconCls: stuff.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 170,
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
    
    this.validTextField = function(textField){
        if (textField.getValue() && textField.getValue().trim().length == 0) {
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
        result = this._textFieldName.isValid(preventMark) && result;
        result = this._textFieldStuffType.isValid(preventMark) && result;
        result = this._comboBoxStuffTypes.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldName) && result;
        result = this.validTextField(this._textFieldStuffType) && result;
        return result;
    }
    this._assignValues = function(){
        this._stuff.set("stuffName", this._textFieldName.getValue());
        this._stuff.set("stuffType", this._textFieldStuffType.getValue());
        this._stuff.set("stampApplicationID", this._stampApplication.get('id'));
    }
    this._setTextFieldStuffType = function(){
        if (this._comboBoxStuffTypes.getValue() == '其他') {
            this._textFieldStuffType.enable();
            this._textFieldStuffType.setValue('');
        }
        else {
            this._textFieldStuffType.disable();
            this._textFieldStuffType.setValue(this._comboBoxStuffTypes.getValue());
        }
    }
    this._comboBoxStuffTypes.panel = this;
    this._comboBoxStuffTypes.on('select', function(){
        var panel = this.panel;
        panel._setTextFieldStuffType();
    });
    this._save = function(){
        var stuff = this._stuff;
        stuff.beginEdit();
        this._assignValues();
        stuff.commit();
        
        Ext.Ajax.request({
            url: Srims.service.stamp.StuffService + '/Save',
            params: stuff.data,
            scope: this,
            success: function(){
                this._store.load();
                if (this._stampApplicationStore) 
                    this._stampApplicationStore.load();
                var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.stamp.showStampApplication(stampApplication, stampApplicationStore);
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
Ext.extend(Srims.stamp.StuffEditWindow, Ext.Window, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffManageWindow = function(id, stampApplication, stampApplicationStore){

    this._id = id;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    var stuffStore = new Srims.stamp.StuffStore(stampApplication.get('id'));
    this._stuffGridPanel = new Srims.stamp.StuffGridPanel(this._stampApplication, this._stampApplicationStore, stuffStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.stamp.StuffManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '用印文件管理',
        iconCls: 'icon-stamp-stuff',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._stuffGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.stamp.StuffManageWindow, Ext.Window, {});

if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.StuffStamp = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'stuffID',
	type: 'int',
	mapping: 'StuffID'
},{
	name: 'stampID',
	type: 'int',
	mapping: 'StampID'
},{
	name: 'stampOwner',
	type: 'string',
	mapping: 'StampOwner'
},{
	name: 'type',
	type: 'string',
	mapping: 'Type'
},{
	name: 'number',
	type: 'int',
	mapping: 'Number'
},{
	name: 'pagination',
	type: 'int',
	mapping: 'Pagination'
},{
	name: 'haspermission_Edit',
	type: 'boolean',
	mapping: 'Haspermission_Edit',
	convert: Boolean.toBoolean
},{
	name: 'canEdit',
	type: 'boolean',
	mapping: 'CanEdit',
	convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.stamp.StuffStamp);
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffStampStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(stuffId){
        Srims.stamp.StuffStampStore.superclass.constructor.call(this, new Srims.stamp.StuffStampXmlReader(), Srims.service.stamp.StuffStampService + '/GetByStampStuffID', {
            stuffID: stuffId
        });
    }
});

if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffStampXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StuffStampXmlReader.superclass.constructor.call(this, Srims.stamp.StuffStamp);
    }
});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffStampEditWindow = function(id, stuffStamp, store, stuff, stuffStore, stampApplication, stampApplicationStore){

    this._id = id;
    this._stuffStamp = stuffStamp;
    this._stuff = stuff;
    this._stuffStore = stuffStore;
    this._stampApplication = stampApplication;
    this._store = store;
    this._stampApplicationStore = stampApplicationStore;
    
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
    
    this._numberFieldNumber = new Ext.form.NumberField({
        fieldLabel: '盖章数量',
        value: this._stuffStamp.get('number'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    ///待修改
    this._comboBoxStampTypes = new Srims.component.EntityComboBox({
        fieldLabel: '图章类型',
        value: this._stuffStamp.get('type'),
        store: new Srims.stamp.StampStore(Srims.service.stamp.StampService + '/Query'),
        entityId: this._stuffStamp.get('stampID'),
        displayField: 'type',
        editable: true,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    var Items = [this._comboBoxStampTypes, this._numberFieldNumber];
    
    Srims.stamp.StuffStampEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: stuffStamp.isNew() ? '新建文件用印信息' : '编辑文件用印信息',
        iconCls: stuffStamp.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 135,
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
    
    this._isValid = function(preventMark){
        var result = true;
        result = this._comboBoxStampTypes.isValid(preventMark) && result;
        result = this._numberFieldNumber.isValid(preventMark) && result;
        return result;
    }
    this._assignValues = function(){
        this._stuffStamp.set("number", this._numberFieldNumber.getValue());
        this._stuffStamp.set("stampID", this._comboBoxStampTypes.getValue());
        this._stuffStamp.set("stuffID", this._stuff.get('id'));
    }
    this._save = function(){
        var stuffStamp = this._stuffStamp;
        stuffStamp.beginEdit();
        this._assignValues();
        stuffStamp.commit();
        
        Ext.Ajax.request({
            url: Srims.service.stamp.StuffStampService + '/Save',
            params: stuffStamp.data,
            scope: this,
            success: function(){
                this._store.load();
                this._stuffStore.load();
                if (this._stampApplicationStore) 
                    this._stampApplicationStore.load();
                var panelId = "StampApplicationShowPanel" + stampApplication.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.stamp.showStampApplication(stampApplication, stampApplicationStore);
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
Ext.extend(Srims.stamp.StuffStampEditWindow, Ext.Window, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffStampGridPanel_ColumnModel = function(){
    Srims.stamp.StuffStampGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "盖章类型",
        dataIndex: 'type',
        sortable: false,
        hidden: false
    }, {
        header: "盖章数量",
        dataIndex: 'number',
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.stamp.StuffStampGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StuffStampGridPanel_ToolBar = function(selection, store, stuff, stuffStore, stampApplication, stampApplicationStore){

    //fields
    this._selection = selection;
    this._store = store;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    this._stuff = stuff;
    this._stuffStore = store;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stuff: this._stuff,
        stuffStore: this._stuffStore,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        handler: function(){
            Srims.stamp.newStuffStamp(this.store, this.stuff, this.stuffStore, this.stampApplication, this.stampApplicationStore);
        },
        tooltip: '<b>添加文件用印</b><br/>输入文件用印信息以添加文件用印'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stuff: this._stuff,
        stuffStore: this._stuffStore,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.editStuffStamp(this.selection.getSelected(), this.store, this.stuff, this.stuffStore, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>编辑文件用印</b><br/>编辑选中文件用印的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        stuff: this._stuff,
        stuffStore: this._stuffStore,
        stampApplication: this._stampApplication,
        stampApplicationStore: this._stampApplicationStore,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.stamp.deleteStuffStamp(this.selection.getSelected(), this.store, this.stuff, this.stuffStore, this.stampApplication, this.stampApplicationStore);
        },
        hidden: true,
        tooltip: '<b>删除文件用印</b>'
    });
    var user = Srims.currentLoginLog.user;
    Srims.stamp.StuffStampGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
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
            return;
        }
        
        var stuffStamp = selection.getSelected();
        
        buttonEdit.setVisible(stuffStamp.get('haspermission_Edit'));
        buttonEdit.setDisabled(!stuffStamp.get('canEdit'));
        
        buttonDelete.setVisible(stuffStamp.get('haspermission_Edit'));
        buttonDelete.setDisabled(!stuffStamp.get('canEdit'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StuffStampGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffStampGridPanel = function(stuff, stuffStore, stampApplication, stampApplicationStore){

    this._stuff = stuff;
    this._stuffStore = stuffStore;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    
    this._store = new Srims.stamp.StuffStampStore(this._stuff.get('id'));
    this._store.gird = this;
    this._columnModel = new Srims.stamp.StuffStampGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.stamp.StuffStampGridPanel_ToolBar(this._selections, this._store, this._stuff, this._stuffStore, this._stampApplication, this._stampApplicationStore);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的记录'
    });
    //public methods
    this.getStuffStampStore = function(){
        return this._store;
    }
    
    Srims.stamp.StuffStampGridPanel.superclass.constructor.call(this, {
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
    this._store.load();
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stuffStamp = grid.getStuffStampStore().getAt(rowIndex);
        Srims.type.editStuffStamp(stuffStamp, this._store, this._stuff, this._stuffStore, this._stampApplication, this._stampApplicationStore);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.stamp.StuffStampGridPanel, Srims.component.GridPanel, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StuffStampManageWindow = function(id, stuff, stuffStore, stampApplication, stampApplicationStore){
    this._id = id;
    this._stuff = stuff;
    this._stuffStore = stuffStore;
    this._stampApplication = stampApplication;
    this._stampApplicationStore = stampApplicationStore;
    
    this._stuffStampGridPanel = new Srims.stamp.StuffStampGridPanel(this._stuff, this._stuffStore, this._stampApplication, this._stampApplicationStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.stamp.StuffStampManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '文件用印管理',
        iconCls: 'icon-stamp-stuff',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._stuffStampGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.stamp.StuffStampManageWindow, Ext.Window, {});
if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.Stamp = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'type',
	type: 'string',
	mapping: 'Type'
},{
	name: 'ownerID',
	type: 'int',
	mapping: 'OwnerID'
},{
	name: 'owner',
	type: 'string',
	mapping: 'Owner'
},{
	name: 'number',
	type: 'int',
	mapping: 'Number'
},{
	name: 'pagination',
	type: 'int',
	mapping: 'Pagination'
},{
	name: 'hasPermission_Edit',
	type: 'boolean',
	mapping: 'HasPermission_Edit',
	convert: Boolean.toBoolean
},{
	name: 'canEdit',
	type: 'boolean',
	mapping: 'CanEdit',
	convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.stamp.Stamp);
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(params, url){
        Srims.stamp.StampStore.superclass.constructor.call(this, new Srims.stamp.StampXmlReader(), url, params);
    }
});

if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.stamp.StampXmlReader.superclass.constructor.call(this, Srims.stamp.Stamp);
    }
});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampGridPanel = function(){

    var url = Srims.service.stamp.StampService + '/Query';
	var params = {};
    this._store = new Srims.stamp.StampStore(params,url);
    this._store.gird = this;
    this._columnModel = new Srims.stamp.StampGridPanle_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.stamp.StampGridPanel_ToolBar(this._selections, this._store);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的记录'
    });
    //public methods
    this.getStampStore = function(){
        return this._store;
    }
    
    Srims.stamp.StampGridPanel.superclass.constructor.call(this, {
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
    this._store.load();
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var stamp = grid.getStampStore().getAt(rowIndex);
        Srims.stamp.editStamp(stamp, this._store);
    }
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.stamp.StampGridPanel, Srims.component.GridPanel, {});

if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampGridPanle_ColumnModel = function(){
    Srims.stamp.StampGridPanle_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "图章类型",
        dataIndex: 'type',
        width: 80
    }, {
        header: "图章拥有者",
        dataIndex: 'owner',
        width: 100
    }])
}
Ext.extend(Srims.stamp.StampGridPanle_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampGridPanel_ToolBar = function(selection, store){

    //fields
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.stamp.newStamp(this.store);
        },
        tooltip: '<b>添加图章</b><br/>输入图章信息以添加图章'
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
            Srims.stamp.editStamp(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑图章</b><br/>编辑选中图章的信息'
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
            Srims.stamp.deleteStamp(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除用印文件</b>'
    });
    var user = Srims.currentLoginLog.user;
    Srims.stamp.StampGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete]
    });
    
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
            return;
        }
        
        var stamp = selection.getSelected();
        
        buttonEdit.setVisible(stamp.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!stamp.get('canEdit'));
        
        buttonDelete.setVisible(stamp.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!stamp.get('canEdit'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StampGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampManageWindow = function(id){

    this._id = id;
    
    this._stampGridPanel = new Srims.stamp.StampGridPanel();
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.stamp.StampManageWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '图章管理',
        iconCls: 'icon-stamp-stamp',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._stampGridPanel],
        buttons: [this._buttonClose]
    });
}
Ext.extend(Srims.stamp.StampManageWindow, Ext.Window, {});

if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampEditWindow = function(id, stamp, store){

    this._id = id;
    this._stamp = stamp;
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
    
    this._textFieldType = new Ext.form.TextField({
        fieldLabel: '图章类型',
        value: this._stamp.get('type'),
        allowBlank: false,
        width: 160
    });
    this._comboBoxOwner = new Srims.component.UserSearch.SearchComboBox({
        fieldLabel: '拥有者',
        value: this._stamp.get('owner'),
        selectEntityId: this._stamp.get('ownerID'),
        editable: true,
        triggerAction: 'all',
        allowBlank: false,
        listWidth: 300,
        width: 178
    });
    var Items = [this._textFieldType, this._comboBoxOwner];
    
    Srims.stamp.StampEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: stamp.isNew() ? '新建图章信息' : '编辑图章信息',
        iconCls: stamp.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 135,
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
    
    this.validTextField = function(textField){
        if (textField.getValue() && String.Trim(textField.getValue()).length == 0) {
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
    this._validateType = function(){
        var stamps = this._store.getRange();
        var type = String.Trim(this._textFieldType.getValue());
        
        for (var i = 0; i < stamps.length; i++) {
            if (this._stamp == stamps[i]) 
                continue;
            
            if (type == stamps[i].get('type')) {
                Ext.Msg.show({
                    title: '印章类型已存在',
                    msg: '印章类型不能重复，请重新输入',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldType.isValid(preventMark) && result;
        result = this._comboBoxOwner.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldType) && result;
        result = this._validateType() && result;
        return result;
    }
    this._assignValues = function(){
        this._stamp.set("type", String.Trim(this._textFieldType.getValue()));
        this._stamp.set("ownerID", this._comboBoxOwner.getValue());
    }
    
    this._save = function(){
        var stamp = this._stamp;
        stamp.beginEdit();
        this._assignValues();
        stamp.commit();
        
        Ext.Ajax.request({
            url: Srims.service.stamp.StampService + '/Save',
            params: stamp.data,
            scope: this,
            success: function(){
                this._store.load();
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
Ext.extend(Srims.stamp.StampEditWindow, Ext.Window, {})
if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.StampCensorRejectWindow = function(id, stampApplication, store, methodName,stampState) {

	this._id = id;
	this._stampApplication = stampApplication;
	this._store = store;
	this._stampState = stampState;
	this._methodName=methodName;

	this._buttonReject = new Ext.Button({
		minWidth: 80,
		text: '驳回',
		stampApplication: this._stampApplication,
		store: this._store,
		stampState: this._stampState,
		methodName:this._methodName,
		window: this,
		handler: function() {
			var window = this.window;
			var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '(' + window._textRejectRemark.getValue() + ')';
			var titile = '审核驳回';
			var message = '你确定要驳回此用印申请吗？';
			Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, this.methodName, this.stampState, remark);
			window.close();
		}
	});
	this._buttonClose = new Ext.Button({
		minWidth: 80,
		text: '取消',
		window: this,
		handler: function() {
			var window = this.window;
			window.close();
		}
	});
	this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
		fieldLabel: '驳回理由',
		noticeTextType: 'StampRejectReason',
		listWidth: 160,
		width: 130
	});
	this._textRejectRemark = new Ext.form.TextArea({
		fieldLabel: '详细说明',
		height: 60,
		width: 200
	});

	Srims.stamp.StampCensorRejectWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '驳回文印申请',
		iconCls: 'icon-censor-reject',
		width: 320,
		labelWidth: 70,
		height: 180,
		modal: true,
		bodyStyle: 'padding:10px 10px 0',
		deferredRender: false,
		frame: true,
		closeAction: 'hide',
		layout: 'form',
		resizable: false,
		items: [this._comboBoxRejectReson, this._textRejectRemark],
		buttons: [this._buttonReject, this._buttonClose]
	});
}
Ext.extend(Srims.stamp.StampCensorRejectWindow, Ext.Window, {})
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeAction = function() {
};

Srims.stamp.StampApplicationTypeAction.listStampApplicationTypeGroup = function() {
    var panelId = 'StampApplicationTypeGroupGridPanel';
    var stampApplicationTypeGroupStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {};

    if (panel) {
        stampApplicationTypeGroupStore = panel.getStampApplicationGroupTypeGroupStore();
    }
    else {
        stampApplicationTypeGroupStore = new Srims.stamp.StampApplicationTypeGroupStore(Srims.service.stamp.StampApplicationTypeGroupService + '/Query', params);
        stampApplicationTypeGroupStore.load();
        panel = new Srims.stamp.StampApplicationTypeGroupGridPanel(panelId, stampApplicationTypeGroupStore, '文印申请类型组列表', 'icon-stamp-list');
        Srims.WorkSpace.addPanel(panel);
    }


}


Srims.stamp.StampApplicationTypeAction.editStampApplicationTypeGroup = function(stampApplicationTypeGroup) {
    var id = 'StampApplicationTypeGroupEditWindow' + stampApplicationTypeGroup.get('id');
    var window = Ext.getCmp(id);

    if (!window)
        window = new Srims.stamp.StampApplicationTypeGroupEditWindow(id, stampApplicationTypeGroup);

    window.show();
}

Srims.stamp.StampApplicationTypeAction.listStampApplicationType = function() {
var panelId = 'StampApplicationTypeGridPanel';
var stampApplicationTypeStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var params = {};

    if (panel) {
        stampApplicationTypeStore = panel.getStampApplicationTypeStore();
    }
    else {
        stampApplicationTypeStore = new Srims.stamp.StampApplicationTypeStore(Srims.service.stamp.StampApplicationTypeService + '/Query', params);
      //  stampApplicationTypeStore.load();
        panel = new Srims.stamp.StampApplicationTypeGridPanel(panelId, stampApplicationTypeStore, '文印申请类型列表', 'icon-stamp-list');
        Srims.WorkSpace.addPanel(panel);
    }


}

Srims.stamp.StampApplicationTypeAction.newStampApplicationTypeGroup = function() {
    var id = 'NewStampApplicationTypeGroupWindow';
    var window = Ext.getCmp(id);

    if (!window) {
        var stampApplicationTypeGroup = new Srims.stamp.StampApplicationTypeGroup({});
        window = new Srims.stamp.StampApplicationTypeGroupEditWindow(id, stampApplicationTypeGroup);
    }

    window.show();
}
Srims.stamp.StampApplicationTypeAction.newStampApplicationType = function() {
    var id = 'NewStampApplicationTypeWindow';
    var window = Ext.getCmp(id);

    if (!window) {
        var stampApplicationType = new Srims.stamp.StampApplicationType({});
        window = new Srims.stamp.StampApplicationTypeEditWindow(id, stampApplicationType);
    }

    window.show();
}
Srims.stamp.StampApplicationTypeAction.showStampApplicationType = function(stampApplicationType) {
    var id = 'ShowStampApplicationTypeWindow' + stampApplicationType.get('id');
    var window = Ext.getCmp(id);
    if (!window) {
        window = new Srims.stamp.StampApplicationTypeShowWindow(id, stampApplicationType);
    }
    window.show();
}

Srims.stamp.StampApplicationTypeAction.editStampApplicationType = function(stampApplicationType) {
    var id = 'StampApplicationTypeEditWindow' + stampApplicationType.get('id');
    var window = Ext.getCmp(id);

    if (!window)
        window = new Srims.stamp.StampApplicationTypeEditWindow(id, stampApplicationType);

    window.show();
}
Srims.stamp.StampApplicationTypeAction.showFirstAdminWindow = function(stampApplicationType) {
    var windowId = 'StampFirstAdminMemberWindow' + stampApplicationType.get('id');
    var title = '一级审核管理员管理';
    var sign = true;
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StampAdminMemberWindow(windowId, stampApplicationType,title,sign);
    else
        window._stampAdminMemberGridPanel.getStore().load();
    window.show();
}
Srims.stamp.StampApplicationTypeAction.newStampAdminMember = function(stampApplicationType, store, sign) {
    var windowId = 'NewStampAdminMemberWindow' + stampApplicationType.get('id');
    this._sign = sign;
    var window = Ext.getCmp(windowId);
    if (!window) {
        var stampAdminMember = new Srims.stamp.StampAdminMember({});
        window = new Srims.stamp.StampAdminMemberEditWindow(windowId, stampAdminMember, stampApplicationType, store,this._sign);
    }
    window.show();
}
Srims.stamp.StampApplicationTypeAction.showSecondAdminWindow = function(stampApplicationType) {
    var windowId = 'StampSecondAdminMemberWindow' + stampApplicationType.get('id');
    var title = '二级审核管理员管理';
    var sign = false;
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.stamp.StampAdminMemberWindow(windowId, stampApplicationType, title,sign);
    else
        window._stampAdminMemberGridPanel.getStore().load();
    window.show();
}

//Srims.stamp.editProjectMember = function(project, projectMember, store) {
//    var windowId = 'EditProjectMemberWindow' + projectMember.get('id');

//    var window = Ext.getCmp(windowId);
//    if (!window) {
//        window = new Srims.stamp.ProjectMemberEditWindow(windowId, projectMember, project, store);
//    }
//    window.show();
//}
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationType = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'stampApplicationTypeGroupID',
    type: 'string',
    mapping: 'StampApplicationTypeGroupID'
}, {
    name: 'stampApplicationTypeGroupName',
    type: 'string',
    mapping: 'StampApplicationTypeGroupName'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isTwiceCancer',
    type: 'boolean',
    mapping: 'IsTwiceCancer',
    convert: Boolean.toBoolean
}, {
    name: 'isProjectRelated',
    type: 'boolean',
    mapping: 'IsProjectRelated',
    convert: Boolean.toBoolean
}, {
    name: 'can_Delete',
    type: 'boolean',
    mapping: 'Can_Delete',
    convert: Boolean.toBoolean
}]);
    Srims.data.Entity.apply(Srims.stamp.StampApplicationType);

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.stamp.StampApplicationTypeXmlReader.superclass.constructor.call(this, Srims.stamp.StampApplicationType);
    }
});

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.stamp.StampApplicationTypeStore.superclass.constructor.call(this, new Srims.stamp.StampApplicationTypeXmlReader(), load_url, params);
    }
});

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeStoreForGroup = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        var load_url = Srims.service.stamp.StampApplicationTypeService + '/Query';
        Srims.stamp.StampApplicationTypeStoreForGroup.superclass.constructor.call(this, new Srims.stamp.StampApplicationTypeXmlReader(), load_url, params);
    }
});

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGridPanel = function(id, stampApplicationTypeStore, title, iconCls) {

    //fields
    this._stampApplicationTypeStore = stampApplicationTypeStore;
  
    this._stampApplicationTypeStore.grid = this;

    //controls
    this._selections = new Ext.grid.RowSelectionModel();

    this._columnModel = new Srims.stamp.StampApplicationTypeGridPanel_ColumnModel();
    // this._filters = new Srims.stamp.StampApplicationTypeGridPanel_GridFilters();
    this._toolbar = new Srims.stamp.StampApplicationTypeGridPanel_ToolBar(this._selections, this._stampApplicationTypeStore, id);

    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的文印申请类型'
    });

    //public methods
    this.getStampApplicationTypeStore = function() {
        return this._stampApplicationTypeStore;
    }

    //constructor
    Srims.stamp.StampApplicationTypeGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._stampApplicationTypeStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        //   plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._stampApplicationTypeStore,
            //    plugins: this._filters,
            displayInfo: false,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._stampApplicationTypeStore.load();
    /*this.on('celldblclick', onCellDblClick);

    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    var stampApplicationType = grid.getStore().getAt(rowIndex);
    Srims.stamp.AnnouncementAction.editAnnouncement(announcement);
    }*/
}
Ext.extend(Srims.stamp.StampApplicationTypeGridPanel, Ext.grid.GridPanel);

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;

  //  var user = Srims.currentLoginLog.user;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.stamp.StampApplicationTypeAction.newStampApplicationType();
        },
        tooltip: '<b>新建文印申请类型</b><br/>输入新建的文印申请类型的信息'
    });
   
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.StampApplicationTypeAction.editStampApplicationType(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑文印申请类型</b><br/>编辑所选文印申请类型'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除文印申请类型', '你确定要删除这个文印申请类型吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.id = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.stamp.StampApplicationTypeService + '/Delete',
                        scope: this,
                        params: _params,
                        success: function() {
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel)
                                panel.getStampApplicationTypeStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文印申请类型</b><br/>删除所选文印申请类型'
    });
    this._buttonFirstAdmin = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '编辑一级审核管理员',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.StampApplicationTypeAction.showFirstAdminWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑一级审核管理员</b><br/>编辑选中文印申请类型的一级审核管理员'
    });
    this._buttonSecondAdmin = new Ext.Toolbar.Button({
        iconCls: 'icon-member-manage',
        text: '编辑二级审核管理员',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.StampApplicationTypeAction.showSecondAdminWindow(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑二级审核管理员</b><br/>编辑选中文印申请类型的二级审核管理员'
    });

    Srims.stamp.StampApplicationTypeGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit, this._buttonDelete, this._buttonFirstAdmin, this._buttonSecondAdmin]
    });

    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonFirstAdmin = this._buttonFirstAdmin;
    this._selection.buttonSecondAdmin = this._buttonSecondAdmin;

    //event methods
    this._onSelection_selectionChange = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonFirstAdmin = selection.buttonFirstAdmin;
        var buttonSecondAdmin = selection.buttonSecondAdmin;

        if (selection.getCount() == 0) {
            buttonEdit.hide();
            buttonDelete.hide();
            buttonFirstAdmin.hide();
            buttonSecondAdmin.hide();
            return;
        }

        var stampApplicationType = selection.getSelected();


        buttonDelete.setDisabled(!stampApplicationType.get('can_Delete'));
        
        buttonDelete.show();
        buttonEdit.show();
        buttonFirstAdmin.show();
        buttonSecondAdmin.show();


    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.stamp.StampApplicationTypeGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGridPanel_ColumnModel = function() {
    Srims.stamp.StampApplicationTypeGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: true,
        width: 60
    }, {
        header: "对应组",
        dataIndex: 'stampApplicationTypeGroupName',
        sortable: true,
        width: 60
    }, {
        header: "是否二次审核",
        dataIndex: 'isTwiceCancer',
        width: 60,
        sortable: true,
        hidden: false,
        renderer: function(value) {
            return value == true ? '<span>是</span>' : '<span>否</span>';
        }
    }, {
        header: "是否项目相关",
        dataIndex: 'isProjectRelated',
        width: 60,
        sortable: true,
        renderer: function(value) {
            return value == true ? '<span>是</span>' : '<span>否</span>';
        }
}]);
    }
    Ext.extend(Srims.stamp.StampApplicationTypeGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeEditWindow = function(id, stampApplicationType) {

    this._id = id;
    this._stampApplicationType = stampApplicationType;
    this._title = stampApplicationType.isNew() ? '新建文印申请类型' : stampApplicationType.get('name');

    this._textTitle = new Ext.form.TextField({
        fieldLabel: '名称',
        value: stampApplicationType.get('name'),
        allowBlank: false,
        width: 150
    });

    this._comboBoxGroup = new Srims.component.EntityComboBox({
        fieldLabel: '文印申请类型组',
        editable: false,
        store: new Srims.stamp.StampApplicationTypeGroupStore(Srims.service.stamp.StampApplicationTypeGroupService + '/Query', {}),
        displayField: 'name',
        value: this._stampApplicationType.get('stampApplicationTypeGroupName'),
        entityId: this._stampApplicationType.get('stampApplicationTypeGroupID'),
        allowBlank: false,
        width: 150
    });

    this._textTwice = new Ext.form.Checkbox({
        fieldLabel: '是否二级审核',
        checked: this._stampApplicationType.get('isTwiceCancer')
    });
    this._textProject = new Ext.form.Checkbox({
        fieldLabel: '是否项目相关',
        checked: this._stampApplicationType.get('isProjectRelated')
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    Srims.stamp.StampApplicationTypeEditWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 320,
        height: 200,
        deferredRender: false,
        labelWidth:95,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        //   title: this._title,
        iconCls: stampApplicationType.isNew() ? 'icon-subject-firstLevel-new' : 'icon-subject-firstLevel-edit',
        resizable: false,
        modal: true,
        items: [this._textTitle, this._comboBoxGroup, this._textTwice, this._textProject],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.assignValues = function() {
        this._textTitle.assignValues();
        this._textTwice.assignValues();
        this._textProject.assignValues();
        this._comboBoxGroup.assignValues();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._textTitle.isValid(preventMark) && result;
        result = this._textTwice.isValid(preventMark) && result;
        result = this._textProject.isValid(preventMark) && result;
        result = this._comboBoxGroup.isValid(preventMark) && result;


        return result;
    }
    this.save = function() {
        var params = {};
        var stampApplicationType = this._stampApplicationType;
        stampApplicationType.beginEdit();
        //  this.assignValues(params);
        this.assignValues();
        stampApplicationType.commit();

        Ext.Ajax.request({
            url: Srims.service.stamp.StampApplicationTypeService + '/Save',
            params: stampApplicationType.data,
            // params: { Name: params.name, IsTwiceCancer: params.isTwiceCancer, IsProjectRelated: params.isProjectRelated },
            scope: this,
            success: function() {
                panel = Srims.WorkSpace.active('StampApplicationTypeGridPanel');
                if (panel)
                    panel.getStampApplicationTypeStore().load();
                else {
                    stampApplicationTypeStore = new Srims.stamp.StampApplicationTypeStore(Srims.service.stamp.StampApplicationTypeService + '/Query');
                    panel = new Srims.stamp.StampApplicationTypeGridPanel('StampApplicationTypeGridPanel', stampApplicationTypeStore, '文印申请类型列表', 'icon-announcement-list');
                    Srims.WorkSpace.addPanel(panel);
                }
                Srims.WorkSpace.getWorkSpace().remove(this);
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
    this.assignValues = function() {
        this._stampApplicationType.set('name', this._textTitle.getValue());
        this._stampApplicationType.set('stampApplicationTypeGroupID', this._comboBoxGroup.getValue());
        this._stampApplicationType.set('stampApplicationTypeGroupName', this._comboBoxGroup.getText());
        this._stampApplicationType.set('isTwiceCancer', this._textTwice.getValue());
        this._stampApplicationType.set('isProjectRelated', this._textProject.getValue());
    }
}
Ext.extend(Srims.stamp.StampApplicationTypeEditWindow, Ext.Window);


if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberWindow = function(id, stampApplicationType, title, sign) {

    this._id = id;
    this._sign = sign;
    this._title = title;
    this._stampApplicationType = stampApplicationType;
    if (this._sign) {
        this._stampAdminMemberGridPanel = new Srims.stamp.StampAdminMemberGridPanel(this._stampApplicationType,this._sign);
    }
    else {
        this._stampAdminMemberGridPanel = new Srims.stamp.StampAdminMemberGridPanel(this._stampApplicationType,this._sign);
    }

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    Srims.stamp.StampAdminMemberWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '文印申请类型“' + this._stampApplicationType.get('name') + '“' + this._title,
        iconCls: 'icon-project-member-manage',
        width: 500,
        height: 300,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        resizable: false,
        modal: true,
        items: [this._stampAdminMemberGridPanel],
        buttons: [this._buttonClose]
    });
    this._stampAdminMemberGridPanel.getStore().load();
    //    this.hideWindow = function() {
    //        var panel = Ext.getCmp(Srims.stamp.Panel_ShowProject_ID + project.get('id'));
    //        if (panel)
    //            panel._formPanelMember._store.load();
    //    }
    //    this.on('hide', this.hideWindow);
}
Ext.extend(Srims.stamp.StampAdminMemberWindow, Ext.Window, {});




if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberGridPanel = function(stampApplicationType, sign) {
    this._sign = sign;
    this._stampApplicationType = stampApplicationType;
    this._store = new Srims.stamp.StampAdminMemberStore(stampApplicationType, this._sign);
    this._store.load();
    this._columnModel = new Srims.stamp.StampAdminMemberGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.stamp.StampAdminMemberGridPanel_ToolBar(this._selections, this._store, this._stampApplicationType, this._sign);

    //    this.params = {};
    //    this.params.sm = this._selections;
    //    this.params.store = this._store;
    //    this.params.colModel = this._columnModel;
    //    this.params.tbar = this._toolBar;
    //    this.params.height = 220;

    //    //constructor
    //    Srims.stamp.StampAdminMemberGridPanel.superclass.constructor.call(this, this.params);

    Srims.stamp.StampAdminMemberGridPanel.superclass.constructor.call(this, {
        store: this._store,
        sm: this._selections,
        closable: true,
        colModel: this._columnModel,
        tbar: this._toolBar,
        height: 220
    });

    //    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    //        var projectMember = grid.getStore().getAt(rowIndex);
    //        Srims.stamp.editProjectMember(this._project, projectMember, this._store);
    //    }
    //    this.on('celldblclick', onCellDblClick);

    //    this._reset = function(stampApplicationType) {
    //        this._stampApplicationType = stampApplicationType;
    //        this._store.load({
    //            params: {
    //                stampApplicationTypeID: stampApplicationType.get('id')
    //            }
    //        });
    //        this._toolBar._reset(this._store, this._stampApplicationType);
    //    }

};
Ext.extend(Srims.stamp.StampAdminMemberGridPanel, Srims.component.GridPanel, {});
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMember = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'userName',
    type: 'string',
    mapping: 'UserName'
}]);
    Srims.data.Entity.apply(Srims.stamp.StampAdminMember);
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.stamp.StampAdminMemberXmlReader.superclass.constructor.call(this, Srims.stamp.StampAdminMember);
    }
});


if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(stampApplicationType, sign) {
        if (sign) {
            var load_url = Srims.service.stamp.StampFirstAdminService + '/Query';
        }
        else {
            var load_url = Srims.service.stamp.StampSecondAdminService + '/Query';
        }
        var params = {};
   
        if (stampApplicationType.get('id') != undefined) {
            params["stampApplicationTypeID"] = stampApplicationType.get('id');
        }
        Srims.stamp.StampAdminMemberStore.superclass.constructor.call(this, new Srims.stamp.StampAdminMemberXmlReader(), load_url, params);
    }
});

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberGridPanel_ColumnModel = function() {
    Srims.stamp.StampAdminMemberGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "姓名",
        dataIndex: 'userName',
        width: 70
    }]);
    }
    Ext.extend(Srims.stamp.StampAdminMemberGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberGridPanel_ToolBar = function(selection, store, stampApplicationType, sign) {

    //fields
    this._selection = selection;
    this._store = store;
    this._stampApplicationType = stampApplicationType;
    this._sign = sign;

    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        sign: this._sign,
        stampApplicationType: this._stampApplicationType,
        handler: function() {
            Srims.stamp.StampApplicationTypeAction.newStampAdminMember(this.stampApplicationType, this.store, this.sign);
        },
        
        tooltip: '<b>新建一级审核管理员</b>'
    });
    //    this._buttonEdit = new Ext.Toolbar.Button({
    //        iconCls: 'icon-edit',
    //        text: '编辑',
    //        minWidth: 60,
    //        selection: this._selection,
    //        store: this._store,
    //        project: this._stampApplicationType,
    //        handler: function() {
    //            if (this.selection.getCount() == 0)
    //                return;
    //            Srims.stamp.editStampAdminMember(this.stampApplicationType, this.selection.getSelected(), this.store);
    //        },
    //        hidden: true,
    //        tooltip: '<b>编辑项目成员</b>'
    //    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        sign: this._sign,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除该文印申请类型一级审核管理员', '你确定要删除这个文印申请类型的一级审核管理员吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.ID = this.selection.getSelected().get('id');
                    if (this.sign) {
                        Ext.Ajax.request({
                            url: Srims.service.stamp.StampFirstAdminService + '/Delete',
                            params: _params,
                            scope: this,
                            success: function() {
                                this.store.load();
                            }
                        });
                    }
                    else {
                        Ext.Ajax.request({
                            url: Srims.service.stamp.StampSecondAdminService + '/Delete',
                            params: _params,
                            scope: this,
                            success: function() {
                                this.store.load();
                            }
                        });
                    }
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>编辑一级审核管理员</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        stampApplicationType: this._stampApplicationType,
        handler: function() {
            this.store = new Srims.stamp.StampAdminMemberStore(stampApplicationType);
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新一级审核管理员列表'
    });
    Srims.stamp.StampAdminMemberGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonDelete, this._buttonRefresh]
    });


  
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        this._selection = selection;
       
        var buttonDelete = this._selection.buttonDelete;

        if (this._selection.getCount() == 0) {
           
            buttonDelete.hide();
            return;
        }
        buttonDelete.show();
       
    }

    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StampAdminMemberGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberEditWindow = function(id, stampAdminMember, stampApplicationType, store, sign) {

    this._sign = sign;
    this._id = id;
    this._stampAdminMember = stampAdminMember;
    this._stampApplicationType = stampApplicationType;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });

    this._comboBoxExpert = new Srims.component.AdministratorSearch.SearchComboBox({
        fieldLabel: '管理员',
        width: 140,
        value: this._stampAdminMember.get('Name'),
        selectEntityId: this._stampAdminMember.get('UserID'),
        allowBlank: false
    });

    Srims.stamp.StampAdminMemberEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '编辑一级审核管理员信息',
        width: 300,
        labelWidth: 70,
        height: 200,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxExpert],
        buttons: [this._buttonSave, this._buttonClose]
    });


    this._isValid = function(preventMark) {
        var result = true;
        result = this._comboBoxExpert.isValid(preventMark) && result;
        return result;
    }
    var params = {};
    this._assignValues = function(params) {
        params.StampApplicationTypeID = this._stampApplicationType.get('id');
        params.UserID = this._comboBoxExpert.getValue();

    }
    this._save = function() {
        var stampAdminMember = this._stampAdminMember;
        stampAdminMember.beginEdit();
        this._assignValues(params);
        stampAdminMember.commit();
        if (this._sign) {
            Ext.Ajax.request({
                url: Srims.service.stamp.StampFirstAdminService + '/Save',
                params: { StampApplicationTypeID: params.StampApplicationTypeID, UserID: params.UserID },
                scope: this,
                success: function() {
                    this._store.load();
                    this.close();
                }
            });
        }
        else {
            Ext.Ajax.request({
                url: Srims.service.stamp.StampSecondAdminService + '/Save',
                params: { StampApplicationTypeID: params.StampApplicationTypeID, UserID: params.UserID },
                scope: this,
                success: function() {
                    this._store.load();
                    this.close();
                }
            });
        }
    }
    this._buttonSave_Click = function(button) {
        var window = button.window;

        if (!window._isValid(false))
            return;

        button.setText('正在保存');
        button.disable();

        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.stamp.StampAdminMemberEditWindow, Ext.Window, {});

if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroup = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'can_Delete',
    type: 'boolean',
    mapping: 'Can_Delete',
    convert: Boolean.toBoolean
}]);
    Srims.data.Entity.apply(Srims.stamp.StampApplicationTypeGroup);

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.stamp.StampApplicationTypeGroupXmlReader.superclass.constructor.call(this, Srims.stamp.StampApplicationTypeGroup);
    }
});

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.stamp.StampApplicationTypeGroupStore.superclass.constructor.call(this, new Srims.stamp.StampApplicationTypeGroupXmlReader(), load_url, params);
    }
});

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupGridPanel = function(id, stampApplicationTypeGroupStore, title, iconCls) {

    //fields
    this._stampApplicationTypeGroupStore = stampApplicationTypeGroupStore;

    this._stampApplicationTypeGroupStore.grid = this;

    //controls
    this._selections = new Ext.grid.RowSelectionModel();

    this._columnModel = new Srims.stamp.StampApplicationTypeGroupGridPanel_ColumnModel();
    // this._filters = new Srims.stamp.StampApplicationTypeGridPanel_GridFilters();
    this._toolbar = new Srims.stamp.StampApplicationTypeGroupGridPanel_ToolBar(this._selections, this._stampApplicationTypeGroupStore, id);

    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的文印申请类型组'
    });

    //public methods
    this.getStampApplicationTypeGroupStore = function() {
        return this._stampApplicationTypeGroupStore;
    }

    //constructor
    Srims.stamp.StampApplicationTypeGroupGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._stampApplicationTypeGroupStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        //   plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._stampApplicationTypeGroupStore,
            //    plugins: this._filters,
            displayInfo: false,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
    this._stampApplicationTypeGroupStore.load();
    /*this.on('celldblclick', onCellDblClick);

    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
    var stampApplicationTypeGroup = grid.getStore().getAt(rowIndex);
    Srims.stamp.AnnouncementAction.editAnnouncement(announcement);
    }*/
}
Ext.extend(Srims.stamp.StampApplicationTypeGroupGridPanel, Ext.grid.GridPanel);

if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;

    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            Srims.stamp.StampApplicationTypeAction.newStampApplicationTypeGroup();
        },
        tooltip: '<b>新建文印申请类型组</b><br/>输入新建的文印申请类型组的信息'
    });

    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.StampApplicationTypeAction.editStampApplicationTypeGroup(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑文印申请类型组</b><br/>编辑所选文印申请类型组的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除文印申请类型组', '你确定要删除这个文印申请类型组吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    var _params = {};
                    _params.id = this.selection.getSelected().get('id');
                    Ext.Ajax.request({
                        url: Srims.service.stamp.StampApplicationTypeGroupService + '/Delete',
                        scope: this,
                        params: _params,
                        success: function() {
                            panel = Srims.WorkSpace.active(panelId);
                            if (panel)
                                panel.getStampApplicationTypeGroupStore().load();
                        }
                    });
                }
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除文印申请类型组</b><br/>删除所选文印申请类型组的信息'
    });


    Srims.stamp.StampApplicationTypeGroupGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonDelete, this._buttonEdit]
    });

    //initial
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;

    //event methods
    this._onSelection_selectionChange = function(selection) {
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;


        if (selection.getCount() == 0) {
            buttonDelete.hide();
            buttonEdit.hide();
            return;
        }

        var stampApplicationTypeGroup = selection.getSelected();
        buttonDelete.setDisabled(!stampApplicationTypeGroup.get('can_Delete'));
        buttonDelete.show();
        buttonEdit.show();
      
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.stamp.StampApplicationTypeGroupGridPanel_ToolBar, Ext.Toolbar);
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupGridPanel_ColumnModel = function() {
Srims.stamp.StampApplicationTypeGroupGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: true,
        width: 80
    }]);
    }
    Ext.extend(Srims.stamp.StampApplicationTypeGroupGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupEditWindow = function(id, stampApplicationTypeGroup) {

    this._id = id;
    this._stampApplicationTypeGroup = stampApplicationTypeGroup;
    this._title = stampApplicationTypeGroup.isNew() ? '新建文印申请类型组' : stampApplicationTypeGroup.get('name');

    this._textTitle = new Ext.form.TextField({
        fieldLabel: '名称',
        value: stampApplicationTypeGroup.get('name'),
        allowBlank: false,
        width: 150
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    Srims.stamp.StampApplicationTypeGroupEditWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 300,
        height: 100,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        //   title: this._title,
        iconCls: stampApplicationTypeGroup.isNew() ? 'icon-subject-firstLevel-new' : 'icon-subject-firstLevel-edit',
        resizable: false,
        modal: true,
        items: [this._textTitle],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.assignValues = function() {
 
    this._stampApplicationTypeGroup.set('name', this._textTitle.getValue());
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._textTitle.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var params = {};
        var stampApplicationTypeGroup = this._stampApplicationTypeGroup;
        stampApplicationTypeGroup.beginEdit();
        //  this.assignValues(params);
        this.assignValues();
        stampApplicationTypeGroup.commit();

        Ext.Ajax.request({
            url: Srims.service.stamp.StampApplicationTypeGroupService + '/Save',
            params: stampApplicationTypeGroup.data,
            // params: { Name: params.name, IsTwiceCancer: params.isTwiceCancer, IsProjectRelated: params.isProjectRelated },
            scope: this,
            success: function() {
            panel = Srims.WorkSpace.active('StampApplicationTypeGroupGridPanel');
                if (panel)
                    panel.getStampApplicationTypeGroupStore().load();
                else {
                    stampApplicationTypeGroupStore = new Srims.stamp.StampApplicationTypeGroupStore(Srims.service.stamp.StampApplicationTypeGroupService + '/Query');
                    panel = new Srims.stamp.StampApplicationTypeGroupGridPanel('StampApplicationTypeGroupGridPanel', stampApplicationTypeGroupStore, '文印申请类型列表', 'icon-announcement-list');
                    Srims.WorkSpace.addPanel(panel);
                }
                Srims.WorkSpace.getWorkSpace().remove(this);
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
    this.assignValues = function() {
    this._stampApplicationTypeGroup.set('name', this._textTitle.getValue());
      
    }
}
Ext.extend(Srims.stamp.StampApplicationTypeGroupEditWindow, Ext.Window);

