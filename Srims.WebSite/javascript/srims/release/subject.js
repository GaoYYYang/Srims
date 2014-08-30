
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

if (!Srims.common) 
    Ext.namespace('Srims.common');

//一级学科新建编辑
Srims.common.AddnewSubjectFirstLevel = function(store){
    var id = 'AddnewSubjectFirstLevel';
    var window = Ext.getCmp(id);
    
    if (!window) {
        var subjectfirstlevel = new Srims.common.SubjectFirstLevel({});
        window = new Srims.common.SubjectFirstLevelEditWindow(id, subjectfirstlevel, store);
    }
    
    window.show();
};
Srims.common.editSubjectFirstLevel = function(subjectfirstlevel, store){
    var id = 'SubjectFirstLevelEditWindow' + subjectfirstlevel.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        window = new Srims.common.SubjectFirstLevelEditWindow(id, subjectfirstlevel, store);
    }
    window.show();
};

//二级学科新建编辑
Srims.common.AddnewSubjectSecondLevel = function(store){
    var id = 'AddnewSubjectSecondLevel';
    var window = Ext.getCmp(id);
    
    if (!window) {
        var subjectsecondlevel = new Srims.common.SubjectSecondLevel({});
        window = new Srims.common.SubjectSecondEditWindow(id, subjectsecondlevel, store);
    }
    window.show();
};
Srims.common.editSubjectSecondLevel = function(subjectsecondlevel, store){
    var id = 'SubjectsecondEditWindow' + subjectsecondlevel.get('id');
    var window = Ext.getCmp(id);
    
    if (!window) {
        window = new Srims.common.SubjectSecondEditWindow(id, subjectsecondlevel, store);
    }
    window.show();
};

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

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelEditWindow = function(id, subjectfirstlevel, store){

    this._id = id;
    this._subjectfirstlevel = subjectfirstlevel;
    this._title = subjectfirstlevel.isNew() ? '新建一级学科' : subjectfirstlevel.get('name');
    this._store = store;
    
    this._textFieldFirstLevelTitle = new Ext.form.TextField({
        fieldLabel: '一级学科名称',
        value: subjectfirstlevel.get('name'),
        allowBlank: false,
        width: 160
    });
    this._textFieldFirstLevelCode = new Ext.form.NumberField({
        fieldLabel: '一级学科代码',
		maxLength : '3',
        value: subjectfirstlevel.get('code'),
        allowBlank: false,
        width: 160
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
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    Srims.common.SubjectFirstLevelEditWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 300,
        height: 160,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls: subjectfirstlevel.isNew() ? 'icon-subject-firstLevel-new' : 'icon-subject-firstLevel-edit',
        resizable: false,
        modal: true,
        items: [this._textFieldFirstLevelTitle, this._textFieldFirstLevelCode],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function(){
        this._subjectfirstlevel.set('name', this._textFieldFirstLevelTitle.getValue());
        this._subjectfirstlevel.set('code', this._textFieldFirstLevelCode.getValue());
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldFirstLevelTitle.isValid(preventMark) && result;
        result = this._textFieldFirstLevelCode.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var subjectfirstlevel = this._subjectfirstlevel;
        subjectfirstlevel.beginEdit();
        this.assignValues();
        subjectfirstlevel.commit();
        
        Ext.Ajax.request({
            url: Srims.service.common.SubjectService + '/SaveFirstLevel',
            params: subjectfirstlevel.data,
            scope: this,
            success: function(){
                this.close();
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        Ext.Ajax.request({
            url: Srims.service.common.SubjectService + '/IsSubjectFirstLevelNameExist',
            params: {
                name: window._textFieldFirstLevelTitle.getValue(),
                subjectFirstLevelID: window._subjectfirstlevel.get('id') == undefined ? '' : window._subjectfirstlevel.get('id')
            },
            success: function(response){
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.Msg.show({
                        title: '一级学科名称已经被占用',
                        msg: '一级学科名称不能重复，请重新输入',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    Ext.Ajax.request({
                        url: Srims.service.common.SubjectService + '/IsSubjectFirstLevelCodeExist',
                        params: {
                            code: window._textFieldFirstLevelCode.getValue(),
                            subjectFirstLevelID: window._subjectfirstlevel.get('id') == undefined ? '' : window._subjectfirstlevel.get('id')
                        },
                        success: function(response){
                            if (Boolean.toBoolean(response.responseText)) {
                                Ext.Msg.show({
                                    title: '一级学科代码已经被占用',
                                    msg: '一级学科代码不能重复，请重新输入',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                            else {
                                button.setText('正在保存');
                                button.disable();
                                
                                window.save();
                                window._store.load();
                            }
                        }
                    })
                }
            }
        })
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.SubjectFirstLevelEditWindow, Ext.Window);
if (!Srims.common)
    Ext.namespace('Srims.common');


Srims.common.SubjectFirstLevelGridPanel = function(id, subjectStore, title, iconCls) {
    //fields
    this._subjectStore = subjectStore;
    this._subjectStore.grid = this;

    //control
    this._selection = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.common.SubjectFirstLevelGridPanel_ColumnModel();
    this._filters = new Srims.common.SubjectFirstLevelGridPanel_GridFilters();
    this._toolbar = new Srims.common.SubjectFirstLevelGridPanel_ToolBar(this._selection, this._subjectStore, id);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的学科'
    })

    //public methods
    this.getSubjectStore = function() {
        return this._subjectStore;
    }

    //constructor
    Srims.common.SubjectFirstLevelGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._subjectStore,
        sm: this._selection,
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
            store: this._subjectStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
};
Ext.extend(Srims.common.SubjectFirstLevelGridPanel, Ext.grid.GridPanel);
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelGridPanel_ColumnModel = function() {
    Srims.common.SubjectFirstLevelGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "学科名称",
        dataIndex: 'name',
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "学科代码",
        dataIndex: 'code',
        width: 100,
        sortable: false,
        hidden: false
}]);
        this.defaultSortable = false;
    }
    Ext.extend(Srims.common.SubjectFirstLevelGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelGridPanel_GridFilters = function() {
    Srims.common.SubjectFirstLevelGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'code'
}]
        });
    }
    Ext.extend(Srims.common.SubjectFirstLevelGridPanel_GridFilters, Ext.grid.GridFilters);if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.common.AddnewSubjectFirstLevel(this.store);
        },
        tooltip: '新建一级学科'
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
            Srims.common.editSubjectFirstLevel(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '编辑一级学科'
    });
    Srims.common.SubjectFirstLevelGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit]
    });
    //initial
    this._selection.buttonEdit = this._buttonEdit;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;

        if (selection.getCount() == 0) {
            buttonEdit.hide();
            return;
        }
        buttonEdit.show();
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.common.SubjectFirstLevelGridPanel_ToolBar, Ext.Toolbar);if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.common.SubjectFirstLevelStore.superclass.constructor.call(this, new Srims.common.SubjectFirstLevelXmlReader(), load_url, params);
    }
});
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.common.SubjectFirstLevelXmlReader.superclass.constructor.call(this, Srims.common.SubjectFirstLevel);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.listSubjectFirstLevel = function(){
    Srims.common._listSubjectFirsLevel('FirstLevel', 'icon-subject-level-first-list', '一级学科列表');
};
Srims.common._listSubjectFirsLevel = function(id, iconCls, name){
    var panelId = 'SubjectGridPanel_' + id;
    var subjectFirstLevelStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (panel) {
        subjectFirstLevelStore = panel.getSubjectStore();
    }
    else {
        subjectFirstLevelStore = new Srims.common.SubjectFirstLevelStore(Srims.service.common.SubjectService + '/QuerySubjectFirstLevel');
        panel = new Srims.common.SubjectFirstLevelGridPanel(panelId, subjectFirstLevelStore, name, iconCls);
        panel.getSubjectStore().load();
        
        Srims.WorkSpace.addPanel(panel);
    }
};
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevelStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.common.SubjectSecondLevelStore.superclass.constructor.call(this, new Srims.common.SubjectSecondLevelXmlReader(), load_url, params);
    }
});
if (!Srims.common)
    Ext.namespace('Srims.common');


Srims.common.SubjectSecondLevelGridPanel = function(id, subjectSecStore, title, iconCls) {
    //fields
    this._subjectStore = subjectSecStore;
    this._subjectStore.grid = this;

    //control
    this._selection = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.common.SubjectSecondLevelGridPanel_ColumnModel();
    this._filters = new Srims.common.SubjectSecondLevelGridPanel_GridFilters();
    this._toolbar = new Srims.common.SubjectSecondLevelGridPanel_ToolBar(this._selection, this._subjectStore, id);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的学科'
    })

    //public methods
    this.getSubjectStore = function() {
        return this._subjectStore;
    }

    //constructor
    Srims.common.SubjectSecondLevelGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._subjectStore,
        sm: this._selection,
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
            store: this._subjectStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
};
Ext.extend(Srims.common.SubjectSecondLevelGridPanel, Ext.grid.GridPanel);
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevelGridPanel_ColumnModel = function(){
    Srims.common.SubjectSecondLevelGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "学科名称",
        dataIndex: 'name',
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "所属一级学科",
        dataIndex: "subjectFirstLevelName",
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "学科代码",
        dataIndex: 'code',
        width: 100,
        sortable: false,
        hidden: false
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.common.SubjectSecondLevelGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevelGridPanel_GridFilters = function() {
    Srims.common.SubjectSecondLevelGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'subjectFirstLevelName'
        }, {
            type: 'string',
            dataIndex: 'code'
}]
        });
    }
    Ext.extend(Srims.common.SubjectSecondLevelGridPanel_GridFilters, Ext.grid.GridFilters);
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondLevelGridPanel_ToolBar = function(selection, store, panelId) {
    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.common.AddnewSubjectSecondLevel(this.store);
        },
        tooltip: '新建二级学科'
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
            Srims.common.editSubjectSecondLevel(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '编辑二级学科'
    });

    Srims.common.SubjectSecondLevelGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit]
    });
    //initial
    this._selection.buttonEdit = this._buttonEdit;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonEdit = selection.buttonEdit;

        if (selection.getCount() == 0) {
            buttonEdit.hide();
            return;
        }
        buttonEdit.show();
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.common.SubjectSecondLevelGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondEditWindow = function(id, subjectsecondlevel, store){

    this._id = id;
    this._subjectsecondlevel = subjectsecondlevel;
    this._title = subjectsecondlevel.isNew() ? '新建二级学科' : subjectsecondlevel.get('name');
    this._store = store;
    
    this._comboBoxFirstLevelSubject = new Srims.component.EntityComboBox({
        fieldLabel: '一级学科名称',
        store: new Srims.common.SubjectFirstLevelStoreForApply(),
        displayField: 'name',
        value: subjectsecondlevel.get('subjectFirstLevelName'),
        entityId: subjectsecondlevel.get('subjectFirstLevelId'),
        triggerAction: 'all',
        allowBlank: false,
        width: 160
    });
    this._textFieldSecondLevelTitle = new Ext.form.TextField({
        fieldLabel: '二级学科名称',
        value: this._subjectsecondlevel.get('name'),
        allowBlank: false,
        width: 160
    });
    
    this._textFieldSecondLevelCode = new Ext.form.TextField({
        fieldLabel: '二级学科代码',
        readOnly: true,
        value: subjectsecondlevel.isNew() ? this._subjectsecondlevel.get('code') : this._subjectsecondlevel.get('code').substring(0, 3),
        allowBlank: false,
        width: 55
    });
    this._textFieldSecondLevelCodeChildCode = new Ext.form.NumberField({
        fieldLabel: '二级学科子代码',
        hideLabel: true,
		maxLength:'2',
        value: this._subjectsecondlevel.get('childCode'),
        allowBlank: false,
        width: 100
    });
    this._subjectCode = new Ext.Panel({
        layout: 'column',
        labelWidth: 200,
        items: [new Ext.Panel({
            width: 165,
            layout: 'form',
            items: this._textFieldSecondLevelCode
        }), new Ext.Panel({
            width: 125,
            layout: 'form',
            items: this._textFieldSecondLevelCodeChildCode
        })]
    })
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保存',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    Srims.common.SubjectSecondEditWindow.superclass.constructor.call(this, {
        id: id,
        bodyStyle: 'padding:10px 10px 0',
        width: 350,
        height: 180,
        labelWidth: 85,
        deferredRender: false,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        modal: true,
        iconCls: subjectsecondlevel.isNew() ? 'icon-subject-secondlevel-new' : 'icon-subject-secondlevel-edit',
        resizable: false,
        items: [new Ext.Panel({
            frame: true,
            layout: 'form',
            items: [this._comboBoxFirstLevelSubject, this._textFieldSecondLevelTitle, this._subjectCode]
        })],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function(){
        this._subjectsecondlevel.set('firstLevelSubjectName', this._comboBoxFirstLevelSubject.getValue());
        this._subjectsecondlevel.set('subjectFirstLevelId', this._comboBoxFirstLevelSubject.getValue());
        this._subjectsecondlevel.set('name', this._textFieldSecondLevelTitle.getValue());
        this._subjectsecondlevel.set('childCode', this._textFieldSecondLevelCodeChildCode.getValue());
        this._subjectsecondlevel.set('code', this._textFieldSecondLevelCode.getValue());
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._comboBoxFirstLevelSubject.isValid(preventMark) && result;
        result = this._textFieldSecondLevelTitle.isValid(preventMark) && result;
        result = this._textFieldSecondLevelCode.isValid(preventMark) && result;
        result = this._textFieldSecondLevelCodeChildCode.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var subjectsecondlevel = this._subjectsecondlevel;
        subjectsecondlevel.beginEdit();
        this.assignValues();
        subjectsecondlevel.commit();
        
        Ext.Ajax.request({
            url: Srims.service.common.SubjectService + '/SaveSecondLevel',
            params: subjectsecondlevel.data,
            scope: this,
            success: function(){
                this.close();
            }
        })
    }
    //initial
    this._comboBoxFirstLevelSubject.textFieldSecondLevelCode = this._textFieldSecondLevelCode;
    //event method
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        if (!window.isValid(false)) 
            return;
        
        Ext.Ajax.request({
            url: Srims.service.common.SubjectService + '/IsSubjectSecondLevelNameExist',
            params: {
                name: window._textFieldSecondLevelTitle.getValue(),
                subjectSecondLevelID: window._subjectsecondlevel.get('id') == undefined ? '' : window._subjectsecondlevel.get('id')
            },
            success: function(response){
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.Msg.show({
                        title: '二级学科名称已经被占用',
                        msg: '二级学科名称不能重复，请重新输入',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    Ext.Ajax.request({
                        url: Srims.service.common.SubjectService + '/IsSubjectSecondLevelCodeExist',
                        params: {
                            code: window._textFieldSecondLevelCode.getValue() + window._textFieldSecondLevelCodeChildCode.getValue(),
                            subjectSecondLevelID: window._subjectsecondlevel.get('id') == undefined ? '' : window._subjectsecondlevel.get('id')
                        },
                        success: function(response){
                            if (Boolean.toBoolean(response.responseText)) {
                                Ext.Msg.show({
                                    title: '二级学科代码已经被占用',
                                    msg: '二级学科代码不能重复，请重新输入',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                            else {
                                button.setText('正在保存');
                                button.disable();
                                
                                window.save();
                                window._store.load();
                            }
                        }
                    })
                }
            }
        })
    }
    this._onComboBoxFirstLevelSubject_Select = function(){
        this.textFieldSecondLevelCode.setValue(this.getEntity().get('code'));
    }
    //event
    this._buttonSave.on('click', this._onButtonSave_Click);
    this._comboBoxFirstLevelSubject.on('select', this._onComboBoxFirstLevelSubject_Select);
}
Ext.extend(Srims.common.SubjectSecondEditWindow, Ext.Window);
if (!Srims.common)
    Ext.namespace('Srims.common');

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
if (!Srims.common)
    Ext.namespace('Srims.common');


Srims.common.SubjectSecondLevelXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.common.SubjectSecondLevelXmlReader.superclass.constructor.call(this, Srims.common.SubjectSecondLevel);
    }
});
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.listSubjectSecondLevel = function() {
    Srims.common._listSubjectSecondLevel('SecondLevel', 'icon-subject-level-second-list', '二级学科列表');
}
Srims.common._listSubjectSecondLevel = function(id, iconCls, name) {
    var panelId = 'SubjectGridPanel_' + id;
    var subjectSecStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);

    if (panel) {
        subjectSecStore = panel.getSubjectStore();
    }
    else {
        subjectSecStore = new Srims.common.SubjectSecondLevelStore(Srims.service.common.SubjectService + '/QuerySubjectSecondLevel');
        panel = new Srims.common.SubjectSecondLevelGridPanel(panelId, subjectSecStore, name, iconCls);
        panel.getSubjectStore().load();

        Srims.WorkSpace.addPanel(panel);
    }
}

