
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

Srims.bases.listBase = function(isShowNewWindow){
    Srims.bases._listBase('BaseList', '基地列表', 'icon-base-list', isShowNewWindow);
};

//列表显示
Srims.bases._listBase = function(id, name, iconCls, ShowNewWindow){

    var panelId = 'BaseGridPanel_' + id;
    var baseStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};
    
    if (panel) {
        baseStore = panel.getBaseStore();
        baseStore.load();
    }
    else {
        baseStore = new Srims.bases.BaseStore(Srims.service.bases.BaseService + '/Query', queryParams);
        panel = new Srims.bases.BaseGridPanel(panelId, baseStore, name, iconCls, queryParams);
        panel.getBaseStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
    //新建
    if (ShowNewWindow) {
        Srims.bases.newBase('NewBaseWindow');
    }
};
Srims.bases.newBase = function(){
    var windowId = 'new_base_window';
    
    var base = new Srims.bases.Base({});
    base.set('isDirectorSchoolExpert', true);
    base.set('isAcademyDirectorSchoolExpert', true);
    
    var window = Ext.getCmp(windowId);
    if (!window) 
        window = new Srims.bases.BaseEditWindow(windowId, base);
    
    window.show();
}
Srims.bases.showBase = function(currentBase){
    var panelId = 'BaseShowPanel' + currentBase.get('id');
    if (Srims.WorkSpace.active(panelId)) {
        Ext.getCmp(panelId).reset(currentBase);
        return;
    }
    var panel = new Srims.bases.BaseShowPanel(panelId, currentBase);
    
    Srims.WorkSpace.addPanel(panel);
}
Srims.bases.editBase = function(currentBase){
    var windowId = 'baseEditwindow_' + currentBase.get('id');
    
    var window = Ext.getCmp(windowId);
    if (!window) 
        window = new Srims.bases.BaseEditWindow(windowId, currentBase);
    
    window.show();
}
Srims.bases.deleteBase = function(currentBase){
    Ext.Ajax.request({
        url: Srims.service.bases.BaseService + '/Delete',
        params: {
            baseId: currentBase.get('id')
        },
        scope: this,
        success: function(response){
            Srims.bases.listBase(false);
            if (currentBase.showPanel) 
                Srims.WorkSpace.getWorkSpace().remove(currentBase.showPanel);
        }
    })
}

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

if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseGridPanel = function(id, baseStore, title, iconCls, queryParams){

    //fields
    this._baseStore = baseStore;
    this._selections = new Ext.grid.RowSelectionModel();
    
    //controls
    this._columnModel = new Srims.bases.BaseGridPanel_ColumnModel();
    this._filters = new Srims.bases.BaseGridPanel_GridFilters();
    this._toolbar = new Srims.bases.BaseGridPanel_ToolBar(this, this._selections, queryParams);
    
    //public methods
    this.getBaseStore = function(){
        return this._baseStore;
    }
    
    var params = {};
    params.sm = this._selections;
    params.store = this._baseStore;
    params.id = id;
    params.title = title;
    params.iconCls = iconCls;
    params.colModel = this._columnModel;
    params.plugins = this._filters;
    params.tbar = this._toolbar;
    params.defaultBBar = true;
    
    //constructor
    Srims.bases.BaseGridPanel.superclass.constructor.call(this, params);
    
    //event
    this.on('celldblclick', onCellDblClick);
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
    
        var base = grid.getStore().getAt(rowIndex);
        var store = grid.getStore();
        Srims.bases.showBase(base);
    }
}
Ext.extend(Srims.bases.BaseGridPanel, Srims.component.GridPanel);

if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseGridPanel_ToolBar = function(grid, queryParams){
    //fields
    this._grid = grid;
    this._selection = grid._selections;
    this._store = grid._baseStore;
    this._queryParams = queryParams;
    
    //controls
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加',
        minWidth: 60,
        handler: function(){
            Srims.bases.newBase();
        },
        hidden: true,
        tooltip: '<b>添加基地</b><br/>输入基地信息以添加基地'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Srims.bases.showBase(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>查看基地</b><br/>显示所选基地的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.bases.editBase(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>编辑基地</b><br/>编辑选中基地的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除基地', '你确定要删除这个基地吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.bases.deleteBase(this.selection.getSelected());
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除基地</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新基地列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        menuAlign: 'right',
        minWidth: 60,
        store: this._store,
        grid: this._grid,
        handler: function(){
            //清空筛选条件
            var filters = grid._filters;
            filters.clearFilters();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    //根据用户权限显示查询按钮
    var user = Srims.currentLoginLog.user;
    this._buttonNew.setVisible(user.hasPermission_ManageBase);
    
    Srims.bases.BaseGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        var currentBase = selection.getSelected();
        //根据权限显示按钮
        buttonShow.setVisible(currentBase.get('hasPermission_Show'));
        buttonShow.setDisabled(!currentBase.get('canShow'));
        
        buttonEdit.setVisible(currentBase.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!currentBase.get('canEdit'));
        
        buttonDelete.setVisible(currentBase.get('hasPermission_Delete'));
        buttonDelete.setDisabled(!currentBase.get('canDelete'));
    }
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.bases.BaseGridPanel_ToolBar, Ext.Toolbar);











if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseGridPanel_GridFilters = function(){
    Srims.bases.BaseGridPanel_GridFilters.superclass.constructor.call(this, {
        filters: [{
            type: 'string',
            dataIndex: 'name'
        }, {
            type: 'string',
            dataIndex: 'rank'
        }]
    });
}
Ext.extend(Srims.bases.BaseGridPanel_GridFilters, Ext.grid.GridFilters);


if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseGridPanel_ColumnModel = function(){

    Srims.bases.BaseGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        hidden: true,
        hideable: false
    }, {
        header: "基地名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false
    }, {
        header: "负责人",
        dataIndex: 'directorName',
        sortable: false,
        hidden: false
    }, {
        header: "学术负责人",
        dataIndex: 'academyDirectorName',
        sortable: false,
        hidden: true
    }, {
        header: "主管部门",
        dataIndex: 'administration',
        sortable: false,
        hidden: false
    }, {
        header: "等级",
        dataIndex: 'rank',
        sortable: true,
        hidden: false
    }, {
        header: "地址",
        dataIndex: 'address',
        sortable: false,
        hidden: true
    }, {
        header: "电话",
        dataIndex: 'phone',
        sortable: false,
        hidden: false
    }, {
        header: "传真",
        dataIndex: 'fax',
        sortable: false,
        hidden: true
    }, {
        header: "邮编",
        dataIndex: 'zip',
        sortable: false,
        hidden: true
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.bases.BaseGridPanel_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseEditWindow = function(windowlId, base){
    this._base = base;
    this._id = windowlId;
    
    this._editBasicForm = new Srims.bases.BaseEditWindow_BasicPanel(this._base);
    
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
    this._buttonCancle = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    
    Srims.bases.BaseEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: base.isNew() ? '新建基地' : '编辑基地',
        iconCls: base.isNew() ? 'icon-base-new' : 'icon-edit',
        autoWidth: true,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._editBasicForm],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancle]
    });
    
    //method
    this.assignValues = function(){
        this._editBasicForm.assignValues();
    }
    this.clearParams = function(){
    
        this._editBasicForm.clearParams();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = result && this._editBasicForm.isValid(preventMark);
        return result;
    }
    this.save = function(){
        var base = this._base;
        var isNew = this._isNew;
        base.beginEdit();
        this.assignValues();
        base.commit();
        
        Ext.Ajax.request({
            url: Srims.service.bases.BaseService + '/Save',
            params: base.data,
            scope: this,
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.bases.BaseXmlReader()
                });
                var newBase = store.getAt(0);
                
                Srims.bases.listBase(false);
                Srims.bases.showBase(newBase);
				
                this.close();
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
Ext.extend(Srims.bases.BaseEditWindow, Ext.Window);

if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseEditWindow_BasicPanel = function(base){
    this._base = base;
    
    this._fieldName = new Ext.form.TextField({
        fieldLabel: '基地名称',
        noticeTextType: "AwardName",
        value: this._base.get('name'),
        allowBlank: false,
        width: 160
    });
    this._fieldAdministration = new Ext.form.TextField({
        fieldLabel: '主管部门',
        value: this._base.get('administration'),
        width: 160
    });
    this._fieldAddress = new Ext.form.TextField({
        fieldLabel: '地址',
        value: this._base.get('address'),
        width: 160
    });
    this._fieldPhone = new Ext.form.NumberField({
        fieldLabel: '电话',
        value: this._base.get('phone'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._fieldFax = new Ext.form.NumberField({
        fieldLabel: '传真',
        value: this._base.get('fax'),
        allowDecimals: false,
        allowNegative: false,
        width: 160
    });
    this._fieldZip = new Ext.form.NumberField({
        fieldLabel: '邮编',
        value: this._base.get('zip'),
        allowDecimals: false,
        allowNegative: false,
        regex: /^[1-9]\d{5}(?!\d)$/,
        width: 160
    });
    this._fieldRank = new Srims.component.NoticeTextComboBox({
        fieldLabel: '等级',
        value: this._base.get('rank'),
        emptyText: '请选择基地等级',
        noticeTextType: "BaseRank",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        listWidth: 160,
        width: 160
    });
    this._checkboxAcademyDirectorIsSchool = new Ext.form.Checkbox({
        fieldLabel: '学术负责人是否是校内专家',
        itemCls: 'base_is_school_expert_checkbox',
        checked: this._base.get('isAcademyDirectorSchoolExpert')
    });
    
    this._comboBoxAcademyDirectorSchoolExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '校内学术负责人',
        value: this._base.get('isAcademyDirectorSchoolExpert') ? this._base.get('academyDirectorName') : null,
        selectEntityId: this._base.get('isAcademyDirectorSchoolExpert') ? this._base.get('academyDirectorID') : null,
        width: 160,
        disabled: !this._base.get('isAcademyDirectorSchoolExpert')
    });
    this._fieldAcademyDirector = new Ext.form.TextField({
        fieldLabel: '校外学术负责人',
        value: this._base.get('isAcademyDirectorSchoolExpert') ? null : this._base.get('academyDirectorName'),
        width: 160,
        disabled: this._base.get('isAcademyDirectorSchoolExpert')
    });
    this._checkboxDirectorIsSchool = new Ext.form.Checkbox({
        fieldLabel: '负责人是否是校内专家',
        itemCls: 'base_is_school_expert_checkbox',
        checked: this._base.get('isDirectorSchoolExpert')
    });
    this._comboBoxDirectorSchoolExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '校内负责人',
        value: this._base.get('isDirectorSchoolExpert') ? this._base.get('directorName') : null,
        selectEntityId: this._base.get('isDirectorSchoolExpert') ? this._base.get('directorID') : null,
        width: 160,
        disabled: !this._base.get('isDirectorSchoolExpert')
    });
    this._fieldDirector = new Ext.form.TextField({
        fieldLabel: '校外负责人',
        value: this._base.get('isDirectorSchoolExpert') ? null : this._base.get('directorName'),
        width: 160,
        disabled: this._base.get('isDirectorSchoolExpert')
    });
    //constructor
    var columnOneItems = [this._fieldName, this._fieldRank, this._fieldPhone, this._fieldZip];
    var columnTwoItems = [this._fieldAdministration, this._fieldAddress, this._fieldFax];
    
    Srims.bases.BaseEditWindow_BasicPanel.superclass.constructor.call(this, {
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 150,
        
        width: 660,
        items: [new Ext.Panel({
            widht: 660,
            labelWidth: 80,
            style: 'padding:5px 0 0 10px',
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: columnOneItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: columnTwoItems
            })]
        }), this._checkboxDirectorIsSchool, new Ext.Panel({
            widht: 660,
            layout: 'column',
            labelWidth: 80,
            style: 'padding:0 0 0 10px',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: this._comboBoxDirectorSchoolExpert
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: this._fieldDirector
            })]
        }), this._checkboxAcademyDirectorIsSchool, new Ext.Panel({
            widht: 660,
            layout: 'column',
            labelWidth: 80,
            style: 'padding:0 0 0 10px',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: this._comboBoxAcademyDirectorSchoolExpert
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 80,
                items: this._fieldAcademyDirector
            })]
        })]
    });
    
    this.enableComponnent = function(checkbox, checked){
        checkbox.enableComponnent.setDisabled(!checked);
        checkbox.disableComponnent.setDisabled(checked);
    }
    this._checkboxAcademyDirectorIsSchool.enableComponnent = this._comboBoxAcademyDirectorSchoolExpert;
    this._checkboxAcademyDirectorIsSchool.disableComponnent = this._fieldAcademyDirector;
    this._checkboxAcademyDirectorIsSchool.on('check', this.enableComponnent);
    
    this._checkboxDirectorIsSchool.enableComponnent = this._comboBoxDirectorSchoolExpert;
    this._checkboxDirectorIsSchool.disableComponnent = this._fieldDirector;
    this._checkboxDirectorIsSchool.on('check', this.enableComponnent);
    //method
    this.assignValues = function(){
        this._base.set('name', this._fieldName.getValue());
        this._base.set('address', this._fieldAddress.getValue());
        this._base.set('administration', this._fieldAdministration.getValue());
        this._base.set('fax', this._fieldFax.getValue());
        this._base.set('phone', this._fieldPhone.getValue());
        this._base.set('rank', this._fieldRank.getValue());
        this._base.set('zip', this._fieldZip.getValue());
        
        if (this._checkboxAcademyDirectorIsSchool.checked) 
            this._base.set('academyDirectorID', this._comboBoxAcademyDirectorSchoolExpert.getValue());
        else 
            this._base.set('academyDirectorName', this._fieldAcademyDirector.getValue());
        
        if (this._checkboxDirectorIsSchool.checked) 
            this._base.set('directorID', this._comboBoxDirectorSchoolExpert.getValue());
        else 
            this._base.set('directorName', this._fieldDirector.getValue());
    }
    
    this.clearParams = function(){
        this._fieldName.reset();
        this._fieldAddress.reset();
        this._fieldAdministration.reset();
        this._fieldFax.reset();
        this._fieldPhone.reset();
        this._fieldRank.reset();
        this._fieldZip.reset();
        
        this._checkboxAcademyDirectorIsSchool.reset();
        this._comboBoxAcademyDirectorSchoolExpert.reset();
        this._fieldAcademyDirector.reset();
        
        this._checkboxDirectorIsSchool.reset();
        this._comboBoxDirectorSchoolExpert.reset();
        this._fieldDirector.reset();
    }
    
    this.isValid = function(preventMark){
        var result = true;
        result = this._fieldName.isValid(preventMark) && result;
        result = this._fieldZip.isValid(preventMark) && result;
        return result;
    }
}

Ext.extend(Srims.bases.BaseEditWindow_BasicPanel, Ext.FormPanel);


if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseShowPanel = function(panelId, base){
    //field
    this._base = base;
    this._id = panelId;
    
    //controls
    this._formPanelBasic = new Srims.bases.BaseShowPanel_BasicForm(this._base);
    this._formProject = new Srims.bases.BaseShowPanel_ProjectForm(this._base);
    this._ToolBar = new Srims.bases.BaseShowPanel_ToolBar(this, this._base)
    //constructor    
    Srims.bases.BaseShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._base.get('name'),
        iconCls: 'icon-show',
        tbar: this._ToolBar,
        items: [this._formPanelBasic, this._formProject]
    });
    this.reset = function(base){
        this._formPanelBasic.resetComponentValue(base);
        this._ToolBar._resetButtonBase(base);
        this._formProject.store.load();
    }
}

Ext.extend(Srims.bases.BaseShowPanel, Ext.Panel, {});









if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseShowPanel_BasicForm = function(base){
    //field
    this._base = base;
    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '基地名称',
        value: this._base.get('name'),
        readOnly: true,
        width: 300
    });
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '基地等级',
        value: this._base.get('rank'),
        readOnly: true,
        width: 160
    });
    this._fieldAdministration = new Ext.form.Field({
        fieldLabel: '主管部门',
        value: this._base.get('administration'),
        readOnly: true,
        width: 160
    });
    this._fieldAcademyDirectorName = new Ext.form.Field({
        fieldLabel: '学术负责人',
        value: this._base.get('academyDirectorName'),
        readOnly: true,
        width: 160
    });
    this._fieldDirectorName = new Ext.form.Field({
        fieldLabel: '负责人',
        value: this._base.get('directorName'),
        readOnly: true,
        width: 160
    });
    this._fieldPhone = new Ext.form.Field({
        fieldLabel: '电话',
        value: this._base.get('phone'),
        readOnly: true,
        width: 160
    });
    this._fieldZip = new Ext.form.Field({
        fieldLabel: '邮编',
        value: this._base.get('zip'),
        readOnly: true,
        width: 160
    });
    this._fieldAddress = new Ext.form.Field({
        fieldLabel: '地址',
        value: this._base.get('address'),
        readOnly: true,
        width: 160
    });
    this._fieldFax = new Ext.form.Field({
        fieldLabel: '传真',
        value: this._base.get('fax'),
        readOnly: true,
        width: 160
    });
    //constructor        
    var columnOneItems = [this._fieldAdministration, this._fieldAcademyDirectorName, this._fieldZip, this._fieldFax];
    var columnTwoItems = [this._fieldRank, this._fieldDirectorName, this._fieldPhone, this._fieldAddress];
    Srims.bases.BaseShowPanel_BasicForm.superclass.constructor.call(this, {
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
        })]
    });
    this.resetComponentValue = function(base){
        this._fieldName.setValue(base.get('name'));
        this._fieldAdministration.setValue(base.get('administration'));
        this._fieldAcademyDirectorName.setValue(base.get('academyDirectorName'));
        this._fieldZip.setValue(base.get('zip'));
        this._fieldFax.setValue(base.get('fax'));
        this._fieldRank.setValue(base.get('rank'));
        this._fieldDirectorName.setValue(base.get('directorName'));
        this._fieldPhone.setValue(base.get('phone'));
        this._fieldAddress.setValue(base.get('address'));
    }
}
Ext.extend(Srims.bases.BaseShowPanel_BasicForm, Ext.form.FormPanel, {});

if (!Srims.bases) 
    Ext.namespace("Srims.bases");

//用户查看项目详细信息
Srims.bases.project = undefined;
Srims.bases.showProject = function(){
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: Srims.bases.project.get('id')
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

Srims.bases.BaseShowPanel_ProjectForm = function(base){

    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.projects.projectGridPanel_MyJoinProject_ColumnModel();
    this._store = new Srims.projects.ProjectSimpleStore(Srims.service.bases.BaseService + '/GetProjects', {
        baseId: base.get('id')
    });
    Srims.bases.BaseShowPanel_ProjectForm.superclass.constructor.call(this, {
        store: this._store,
        colModel: this._columnModel,
        sm: this._selections,
        enableColumnHide: false,
        title: '承担的项目',
        enableColumnMove: true,
        enableHdMenu: false,
        border: true,
        autoExpand: true,
        stripeRows: true,
        loadMask: true,
        autoHeight: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有项目信息'
        }
    });
    
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
        Srims.bases.project = project;
        Srims.Load.loadProjectModule('Srims.bases.showProject();');
    }
}
Ext.extend(Srims.bases.BaseShowPanel_ProjectForm, Ext.grid.GridPanel);


if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseShowPanel_ToolBar = function(panel, base){
    //fields
    this._panel = panel;
    
    //controls
    
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        base: base,
        handler: function(){
        
            Srims.bases.editBase(this.base);
        },
        hidden: true,
        tooltip: '<b>编辑基地</b><br/>编辑选中基地的信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        base: base,
        handler: function(){
        
            Ext.MessageBox.confirm('删除基地', '你确定要删除这个基地吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.bases.deleteBase(this.base);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除基地</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        panel: panel,
        handler: function(){
            this.panel.reset(base);
        },
        tooltip: '<b>刷新列表</b><br/>更新基地列表'
    });
    
    //根据用户权限显示查询按钮
    Srims.bases.BaseShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonEdit, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
    });
    
    //event methods
    this._resetButtonVisibleAndDisabled = function(currentBase){
        //根据权限显示按钮        
        this._buttonEdit.setVisible(currentBase.get('hasPermission_Edit'));
        this._buttonEdit.setDisabled(!currentBase.get('canEdit'));
        
        this._buttonDelete.setVisible(currentBase.get('hasPermission_Delete'));
        this._buttonDelete.setDisabled(!currentBase.get('canDelete'));
    }
    this._resetButtonBase = function(currentBase){
        this._buttonEdit.base = currentBase;
        this._buttonDelete.base = currentBase;
    }
    this._resetButtonVisibleAndDisabled(base);
}
Ext.extend(Srims.bases.BaseShowPanel_ToolBar, Ext.Toolbar);










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

Srims.projects.projectGridPanel_MyJoinProject_ColumnModel = function(){
    Srims.projects.projectGridPanel_MyJoinProject_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        hidden: true,
        hideable: false
    }, {
        header: "编号",
        dataIndex: 'number',
        width: 100,
        sortable: false,
        hidden: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: false,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'typeName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: false,
        hidden: false,
        width: 30,
        renderer: Srims.projects.projectLevelRender
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.projects.projectGridPanel_MyJoinProject_ColumnModel, Ext.grid.ColumnModel);

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
