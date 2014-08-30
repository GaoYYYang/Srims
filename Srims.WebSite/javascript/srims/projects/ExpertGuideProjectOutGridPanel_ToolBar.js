if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar = function(grid, store, selection) {

    this._selection = selection;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">外协分配</b>',
        minWidth: 60
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '添加外协预算',
        minWidth: 60,
        grid: grid,
        store: store,
        handler: function() {


            var voucherOut = new Srims.projects.ProjectOut({
                outSourcingName: '',
                amount: ''
            });

            this.grid.stopEditing();
            this.store.insert(0, voucherOut);
            this.grid.startEditing(0, 0);

        },
        tooltip: '<b>添加外协预算</b><br/>'
    });
    this._buttonNew2 = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建外协单位',
        minWidth: 60,
        store: store,
        handler: function() {
            this.store.grid = grid;
            //Srims.common.NewOutsourcing(this.store, true);
            Srims.common.showIsExistWindow(this.store);
        },
        tooltip: '<b>新建外协单位</b><br/>填写相应外协单位信息建立新的外协单位'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        selection: selection,
        store: store,
        minWidth: 60,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Ext.MessageBox.confirm('删除外协分配', '你确定要删除这个外协分配吗？', function(buttonId) {
                if (buttonId == 'yes') {
                    this.store.remove(this.selection.getSelected());
                    if (userIsExpert) {
                        this.panel.parentPanel._amounts = 0;
                        var outStore = this.store;
                        var projectOuts = outStore.getRange();
                        for (var i = 0; i < projectOuts.length; i++) {
                            this.panel.parentPanel._amounts += projectOuts[i].get('amount');
                        }
                    }
                    if (!userIsExpert) {
                        var amountB = 0;
                        var outStore = this.store;
                        var projectOuts = outStore.getRange();
                        for (var i = 0; i < projectOuts.length; i++) {
                            amountB += projectOuts[i].get('amount');
                        }
                        this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanOut.setValue(amountB);
                        this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanIn.setValue(this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundTotal.getValue() - this.panel.parentPanel.parentPanel._formPanelFund._numberFieldFundPlanOut.getValue())
                    }
                }

            }, this);
        },
        hidden: true,
        tooltip: '<b>删除外协预算</b><br/>删除选中的外协预算'
    });
    this._buttonDelete.panel = this;
    var items = [this._buttonHeader, this._buttonNew, this._buttonNew2, this._buttonDelete];
    Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items,
        height: 25
    });

    //initial
    this._selection.buttonDelete = this._buttonDelete;
    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonDelete = this.buttonDelete;

        if (selection.getCount() == 0) {
            buttonDelete.hide();
            return;
        }

        buttonDelete.setVisible(true);
    }

    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.projects.ExpertGuideProjectOutGridPanel_ToolBar, Ext.Toolbar);