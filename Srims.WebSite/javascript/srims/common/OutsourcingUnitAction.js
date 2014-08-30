/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.ListOutsourcingUnit = function() {
    var panelID = 'OutsourcingUnitGridPanel';
    var outsourcingStore = undefined;
    var panel = Srims.WorkSpace.active(panelID);

    if (panel) {
        outsourcingStore = panel.GetOutsourcingUnitStore();
    } else {
        outsourcingStore = new Srims.common.OutsourcingUnitStore(Srims.service.common.OutsourcingUnitService
				+ '/Query');
        panel = new Srims.common.OutsourcingUnitGridPanel(panelID,
				outsourcingStore, '外协单位列表', 'icon-outsourcing-list');
        Srims.WorkSpace.addPanel(panel);
    }
};
// 查看外协单位
Srims.common.ShowOutsourcingUnit = function(outsourcing, store) {
    var panelID = 'OutsourcingUnitShowPanel' + outsourcing.get('id');
    var panel = Srims.WorkSpace.active(panelID);

    if (panel) {
        panel = new Srims.common.OutsourcingUnitShowPanel(store, panelID,
				outsourcing);
    } else {
        panel = new Srims.common.OutsourcingUnitShowPanel(store, panelID,
				outsourcing)
        Srims.WorkSpace.addPanel(panel);
    }
};
// 新建外协单位1
Srims.common.NewOutsourcingUnit = function(store) {
    var panelID = 'NewOutsourcing';
    var outsourcing = new Srims.common.OutsourcingUnit({});

    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingUnitEditPanel(panelID, outsourcing,
			store);
    Srims.WorkSpace.addPanel(panel);
};
// 编辑外协单位
Srims.common.EditOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingEditPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingEditPanel(panelID, outsourcing,
			store);
    Srims.WorkSpace.addPanel(panel);
};
// 删除外协单位
Srims.common.DeleteOutsourcing = function(outsourcing, store) {
    Ext.MessageBox.confirm('删除该外协单位', '你确定要删除这个外协单位吗？', function(buttonID) {
        if (buttonID == 'yes') {
            var _params = {};
            _params.id = outsourcing.get('id');
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService
										+ '/Delete',
                scope: this,
                params: _params,
                success: function() {
                    var showPanelID = 'OutsourcingShowPanel'
											+ outsourcing.get('id');
                    showPanel = Ext.getCmp(showPanelID);
                    if (showPanel)
                        Srims.WorkSpace.getWorkSpace()
												.remove(showPanel);
                    var editPanelID = 'OutsourcingEditPanel'
											+ outsourcing.get('id');
                    editPanel = Ext.getCmp(editPanelID);
                    if (editPanel)
                        Srims.WorkSpace.getWorkSpace()
												.remove(editPanel);
                    store.load();
                },
                failure: function() {
                    Ext.Msg.show({
                        title: '删除失败',
                        msg: '服务器删除错误，请重新删除！',
                        buttons: Ext.Msg.OK
                    });

                }
            });
        }
    }, this);
};