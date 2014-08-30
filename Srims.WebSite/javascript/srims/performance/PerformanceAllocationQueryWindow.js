
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationQueryWindow = function(id, store, queryParams) {

    this._id = id;
    this._store = store;
    this._params = queryParams;

    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function() {
            this.window.clearParams();
            this.window.buildParams();
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
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
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    this._comboBoxProjectName = new Srims.component.ProjectSearch.SearchComboBox({
        fieldLabel: '项目名称',
        width: 180
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '负责人',
        width: 180
    });
    this._comboBoxProjectNumber = new Ext.form.TextField({
        fieldLabel: '项目编号',
        width: 180
    });
    this._checkboxFundAllocationStates = new Srims.component.CheckBoxGroup({
        fieldLabel: '状态',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.performance.fundAllocationStore),
        cls: 'srims-checkboxGroup'
    });
    this._checkBoxCanAllocate = new Ext.form.Checkbox({
        fieldLabel: '是否允许分配',
        width: 180
    });
    Srims.performance.PerformanceAllocationQueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '查询',
        iconCls: 'icon-query',
        width: 500,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        style: 'padding:10px',
        resizable: false,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            border: false,
            frame: true,
            height: 180,
            items: [this._comboBoxProjectName, this._comboBoxExpert, this._comboBoxProjectNumber]//, this._checkboxFundAllocationStates, this._checkBoxCanAllocate]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });

    this.buildParams = function(queryParams) {
        queryParams.projectName = this._comboBoxProjectName.getText();
        queryParams.expertName = this._comboBoxExpert.getText();
        queryParams.projectNumber = this._comboBoxProjectNumber.getValue();
        // queryParams.canAllocate = this._checkBoxCanAllocate.getValue();
        //  queryParams.performanceAllocationState = this._checkboxFundAllocationStates.getSelecetedValue();
    }
    this.clearParams = function() {
        this._comboBoxProjectName.reset();
        this._comboBoxExpert.reset();
        this._comboBoxProjectNumber.reset();
        //   this._checkBoxCanAllocate.reset();
        // this._checkboxFundAllocationStates.reset();
    }
    this.query = function(button, e) {
        var window = button.window;
        var params = window._params;
        window.buildParams(params);

        Srims.SetQueryParams.removeNullparams(params);
        window._store.load();
        window.hide();
    }
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.performance.PerformanceAllocationQueryWindow, Ext.Window);
