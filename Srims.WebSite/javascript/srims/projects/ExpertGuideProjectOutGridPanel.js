
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel = function() {
    this._project = new Srims.projects.Project({});
    var load_url = Srims.service.projects.ProjectService + '/GetProjectOutByProjectID';
    var params = {
        projectId: this._project.get("id")
    };
    var a = this._project.get("id");
    this._store = new Srims.projects.ProjectOutStore(load_url, params);
    this._columnModel = new Srims.projects.ExpertGuideProjectOutGridPanel_ColumnModel();
    this._amounts = 0;
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar(this, this._store, this._selections);
    this._toolBar.parentPanel = this;
    Srims.projects.ExpertGuideProjectOutGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        tbar: this._toolBar,
        width: 500,
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

    this.validateedit = function(obj) {
        var grid = obj.grid;
        var row = obj.row;
        var column = obj.column;
        var editor = grid.getColumnModel().getCellEditor(column, row);
        var record = obj.record;
        //        var newstore=this._store.load();
        if (column == 0) {
            var corporation = editor.getValue();
            if (String.isEmpty(corporation)) {

                Ext.Msg.show({
                    title: '外协分配错误',
                    msg: '外协公司不能为空',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });

                return false;
            }
        }
        if (column == 1) {
            var allocationAmount = Money.toMoney(editor.getValue());
            if (grid.length > this._store.getRange().length)
                grid._amounts += allocationAmount;
            else
                grid._amounts += obj.value - obj.originalValue;
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

    this.next = function() {
        var projectOuts = this._store.getRange();
        var flag = 1;
        for (var i = 0; i < projectOuts.length; i++) {
            if (projectOuts[i].get('amount') <= 0 || projectOuts[i].get('outSourcingName') == '')
                flag = 0;
        }
        if (flag == 0) {
            Ext.Msg.show({
                title: '外协填写错误',
                msg: '请检查所有外协单位不为空且分配数额大于0！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }
        else {
            Srims.expertGuide.next(this);
        }
    }
    this.on('validateedit', this.validateedit);
}
Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel, Ext.grid.EditorGridPanel, {});
