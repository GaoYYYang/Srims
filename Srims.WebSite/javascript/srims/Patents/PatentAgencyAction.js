

if (!Srims.patents)
    Ext.namespace("Srims.patents");


//专利代理机构列表显示
Srims.patents.listPatentAgency = function() {
    Srims.patents._listPatentAgency('PatentAgencyList', '专利代理机构列表', 'icon-patentAgency-list');
};

Srims.patents._listPatentAgency = function(id, name, iconCls) {
    var panelId = 'PatentAgencyGridPanel_' + id;
    var patentAgencyStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        patentAgencyStore = panel.getStore();
        patentAgencyStore.load();
    }
    else {
        patentAgencyStore = new Srims.patents.PatentAgencyStore(Srims.service.patents.PatentAgencyService + '/Query', queryParams);
        panel = new Srims.patents.PatentAgencyGridPanel(panelId, patentAgencyStore, name, iconCls, queryParams);
        panel.getStore().load();
        Srims.WorkSpace.addPanel(panel);
    }
};
//新建专利机构
Srims.patents.showNewPatentAgencyWindow = function(windowId, store) {
    var patentAgency = new Srims.patents.PatentAgency({});
    var window = Ext.getCmp(windowId);
    if (!window)
        var window = new Srims.patents.PatentAgencyEditWindow(windowId, patentAgency, store);
    window.show();
};
//编辑专利机构
Srims.patents.showEditPatentAgencyWindow = function(patentAgency) {
    var windowId = "PatentAgencyEditWindow" + patentAgency.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        var window = new Srims.patents.PatentAgencyEditWindow(windowId, patentAgency);
    window.show();
};

//删除专利机构
Srims.patents.deletePatentAgency = function(patentAgency, store) {
    Ext.MessageBox.confirm('删除专利机构', '你确定要删除这个专利机构吗？', function(buttonId) {
        if (buttonId == 'yes') {
            var _params = {};
            _params.patentAgencyID = patentAgency.get('id');

            var patentAgencyWindowID = 'PatentAgencyEditWindow' + patentAgency.get('id');

            Ext.Ajax.request({
                url: Srims.service.patents.PatentAgencyService + '/DeletePatentAgency',
                params: _params,
                scope: this,
                success: function() {
                    //从列表中删除时，关闭相应的编辑窗口               
                    if (Ext.getCmp(patentAgencyWindowID)) Ext.getCmp(patentAgencyWindowID).close();
                    store.load();

                }
            });
        }
    }, this);
};
