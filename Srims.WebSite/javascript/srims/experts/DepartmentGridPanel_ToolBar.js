
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
