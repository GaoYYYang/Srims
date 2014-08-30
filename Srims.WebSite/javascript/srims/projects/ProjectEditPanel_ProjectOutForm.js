
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_ProjectOutForm = function(project) {
    this._project = project;
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();

    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar(this, this._store, this._selections);
    this._toolBar.parentPanel = this;
    Srims.projects.ProjectEditPanel_ProjectOutForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '外协信息',
        store: this._store,
        cm: this._columnModel,
        tbar: this._toolBar,
        height: 170,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });

    this._store.load();
    this.validateedit = function(obj) {
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;

        var amountB = 0;
        var outStore = this._store;
        var projectOuts = outStore.getRange();
        for (var i = 0; i < projectOuts.length; i++) {
            if (projectOuts[i].get('amount')) {
                amountB += projectOuts[i].get('amount') * 1000000;
            }
        }
        amountB = amountB / 1000000;

        if (column == 0) {
            var corporation = editor.getValue();
            if (String.isEmpty(corporation)) {

                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协单位不能为空',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }
        }
        if (column == 1) {
            var allocationAmount = Money.toMoney(editor.getValue());
            if (grid.length > outStore.getRange().length) {
                var a = 0;
                a += obj.value;
                this.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(amountB + a);
            }
            else {
                var newValue = amountB * 1000000 + (obj.value * 1000000 - obj.originalValue * 1000000);
                this.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(newValue/1000000);
            }
            this.parentPanel._formPanelFund._numberFieldFundPlanIn.setValue(this.parentPanel._formPanelFund._numberFieldFundTotal.getValue() - this.parentPanel._formPanelFund._numberFieldFundPlanOut.getValue());

            if (allocationAmount <= 0) {
                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协分配必须大于0',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }

        }
        return true;
    }
    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.project = project;
        this._store.toolBar = this._toolBar;
        this._store.load();
    }

    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.projects.ProjectEditPanel_ProjectOutForm, Ext.grid.EditorGridPanel, {});
