
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

Srims.experts.DepartmentGridPanel_ColumnModel = function() {
	Srims.experts.DepartmentGridPanel_ColumnModel.superclass.constructor.call(this, [{
		header: "id",
		hidden: true,
		hideable: false
	},{
		header: "部门代码",
		dataIndex: 'code',
		width: 100,
		sortable: true,
		hidden: false
	},{
		header: "部门名称",
		dataIndex: 'name',
		width: 100,
		sortable: true,
		hidden: false
	},{
		header: "部门简称",
		dataIndex: 'shortName',
		width: 100,
		sortable: false,
		hidden: false
	},{
		header: "是否学院",
		dataIndex: 'isCollege',
		width: 100,
		sortable: false,
		hidden: false
	}]);
	this.defaultSortable = false;
}
Ext.extend(Srims.experts.DepartmentGridPanel_ColumnModel, Ext.grid.ColumnModel);
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentGridPanel = function(id, departmentStore, title, iconCls){
    //fields
    this._departmentStore = departmentStore;
    this._departmentStore.grid = this;
    
    //control
    this._selection = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.DepartmentGridPanel_ColumnModel();
	this._filters = new Srims.experts.DepartmentGridPanel_GridFilters();
	this._toolbar= new Srims.experts.DepartmentGridPanel_ToolBar(this._selection,departmentStore,id);
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的部门'
    })
    
    //public methods
    this.getDepartmentStore = function(){
        return this._departmentStore;
    }
    
    //constructor
    Srims.experts.DepartmentGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._departmentStore,
        sm: this._selection,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins:this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._departmentStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条 - 第{1}条，共{2}条',
            emptyMsg: "没有可以显示的记录"
        })
    });
};
Ext.extend(Srims.experts.DepartmentGridPanel, Ext.grid.GridPanel);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.listDepartment = function() {   
    var panelId = 'Department';
    var iconCls = 'icon-department-list';
    var name = '部门管理';
    var departmentStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    
    if (panel) {
        departmentStore = panel.getDepartmentStore();
    }
    else {
        departmentStore = new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/QueryDepartment');
		panel = new Srims.experts.DepartmentGridPanel(panelId,departmentStore,name,iconCls);
		panel.getDepartmentStore().load();
		
		Srims.WorkSpace.addPanel(panel);
    }
};
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

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentGridPanel_GridFilters = function(){
    Srims.experts.DepartmentGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'code'
        }]
    });
}
Ext.extend(Srims.experts.DepartmentGridPanel_GridFilters, Ext.grid.GridFilters);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentGridPanel_ToolBar = function(selection, store, panelId){
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
        handler: function(){
            Srims.experts.addDepartment(this.store);
        },
        tooltip: '新建部门'
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
            Srims.experts.editDepartment(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '编辑部门'
    });
    Srims.experts.DepartmentGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonEdit]
    });
    //initial   
    this._selection.buttonNew = this._buttonNew;
    this._selection.buttonEdit = this._buttonEdit;
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonNew = selection.buttonNew;
        var buttonEdit = selection.buttonEdit;
        if (selection.getCount() == 0) {
            buttonNew.hide();
            buttonEdit.hide();
            return;
        }       
        var department = selection.getSelected();
        buttonNew.setVisible(department.get('haspermissin_Add'));
        buttonNew.setDisabled(!department.get('canadd'));
        buttonEdit.setVisible(department.get('haspermission_Edit'));
        buttonEdit.setDisabled(!department.get('canEdit'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.experts.DepartmentGridPanel_ToolBar, Ext.Toolbar);

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

//部门新建编辑
Srims.experts.addDepartment = function(store){
    var id = 'DepartmentAddWindow'; 
    var window = Ext.getCmp(id);
    
    if (!window) {
        var department = new Srims.experts.Department({});
        window = new Srims.experts.DepartmentEditWindow(id, department, store);
    }
    window.show();
};
Srims.experts.editDepartment = function(department,store){
    var id = 'DepartmentEditWindow';
    var window = Ext.getCmp(id);
    
    if (!window) {
        window = new Srims.experts.DepartmentEditWindow(id, department, store);
    }
    window.show();
};

if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentEditWindow = function(id, department, store) {

    this._id = id;
    this._department = department;
    this._title = department.isNew() ? '新建部门' : department.get('name');
    this._store = store;

    this._textFieldDepartmentCode = new Ext.form.TextField({
        fieldLabel: '部门代码',
        value: department.get('code'),
        maxLength: '4',
        minLength: '4',
        allowBlank: false,
        width: 160
    });
    this._textFieldDepartmentName = new Ext.form.TextField({
        fieldLabel: '部门名称',
        value: department.get('name'),
        allowBlank: false,
        width: 160
    });
    this._textFieldDepartmentShortName = new Ext.form.TextField({
        fieldLabel: '部门简称',
        value: department.get('shortName'),
        width: 160
    });
    this._checkBoxDepartment = new Ext.form.Checkbox({
        fieldLabel: '是否是学院',
        checked: department.get('isCollege') == '是' ? true : false
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
    Srims.experts.DepartmentEditWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 300,
        height: 250,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls: department.isNew() ? 'icon-department-new' : 'icon-department-edit',
        resizable: false,
        modal: true,
        items: [this._textFieldDepartmentCode, this._textFieldDepartmentName, this._textFieldDepartmentShortName, this._checkBoxDepartment],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function() {
        this._department.set('code', this._textFieldDepartmentCode.getValue());
        this._department.set('name', this._textFieldDepartmentName.getValue());
        this._department.set('shortName', this._textFieldDepartmentShortName.getValue());
        this._department.set('isCollege', this._checkBoxDepartment.getValue());
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._textFieldDepartmentCode.isValid(preventMark) && result;
        result = this._textFieldDepartmentName.isValid(preventMark) && result;
        return result;
    }
    this.IsCollegeUsing = function() {
        if (department.isNew()) {
            this._checkBoxDepartment.setDisabled(false);
            return true;
        }

        Ext.Ajax.request({
            url: Srims.service.experts.DepartmentService + '/CanCollegeEdit',
            params: {
                departmentId: department.get('id')
            },
            scope: this,
            success: function(response) {
                this._checkBoxDepartment.setDisabled(!Boolean.toBoolean(response.responseText));
            }
        })
    }
    this.IsCollegeUsing();
    this.save = function() {
        var department = this._department;
        department.beginEdit();
        this.assignValues();
        department.commit();
        Ext.Ajax.request({
            url: Srims.service.experts.DepartmentService + '/SaveDepartment',
            params: department.data,
            scope: this,
            success: function() {
                this.close();
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        if (!window.isValid(false))
            return;

        Ext.Ajax.request({
            url: Srims.service.experts.DepartmentService + '/IsDepartmentCodeExist',
            params: {
                code: window._textFieldDepartmentCode.getValue(),
                departmentID: window._department.get('id') == undefined ? '' : window._department.get('id')
            },
            success: function(response) {
                //TODO：能否一次验证？·
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.Msg.show({
                        title: '部门代码已经被占用',
                        msg: '部门代码不能重复，请重新输入',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    Ext.Ajax.request({
                        url: Srims.service.experts.DepartmentService + '/IsDepartmentNameExist',
                        params: {
                            name: window._textFieldDepartmentName.getValue(),
                            departmentID: window._department.get('id') == undefined ? '' : window._department.get('id')
                        },
                        success: function(response) {
                            if (Boolean.toBoolean(response.responseText)) {
                                Ext.Msg.show({
                                    title: '部门名称已经被占用',
                                    msg: '部门名称不能重复，请重新输入',
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
Ext.extend(Srims.experts.DepartmentEditWindow, Ext.Window);
