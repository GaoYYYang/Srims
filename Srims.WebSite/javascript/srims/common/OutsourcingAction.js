/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');
//列出外协单位
Srims.common.ListOutsourcing = function(showOutsourcingQueryPanel) {
    var panelId = 'OutourcingGridPanel';
    var outsourcingStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        outsourcingStore = panel.GetOutsourcingStore();
    } else {
        outsourcingStore = new Srims.common.OutsourcingStore(Srims.service.common.OutsourcingService
				+ '/Query', queryParams);
        panel = new Srims.common.OutsourcingGridPanel(panelId,
				outsourcingStore, '外协单位列表', 'icon-outsourcing-list', queryParams);
        Srims.WorkSpace.addPanel(panel);
    }
    if (showOutsourcingQueryPanel)
        Srims.common.showOutsourcingQueryPanel(outsourcingStore, queryParams, panel);
};
//查重
Srims.common.showIsExistWindow = function(store) {
    var window = Ext.getCmp("IsOutsourcingExist");
    if (!window)
        var window = new Srims.common.IsOutsourcingExistWindow(store);
    // window._editGridPanel.getStore().load();
    window.show();
}
Srims.common.showOutsourcingQueryPanel = function(store, queryParams, gridPanel) {
    var panelId = 'OutsourcingInquiryPanel'
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        panel = new Srims.common.OutsourcingInquiryPanel(panelId, store, queryParams, gridPanel)
        Srims.WorkSpace.addPanel(panel);
    }

    gridPanel.queryPanel = panel;

    var map = new Ext.KeyMap(panelId, {
        key: 13,
        fn: function() {
            if (!panel.hidden)
                panel.query(panel._buttonQuery);
        }
    });
};
Srims.common.StatisticsOutsourcing = function() {

};
// 查看外协单位
Srims.common.ShowOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingShowPanel' + outsourcing.get('id');
    var panel = Srims.WorkSpace.active(panelID);

    if (panel) {
        panel = new Srims.common.OutsourcingShowPanel(store, panelID,
				outsourcing);
    } else {
        panel = new Srims.common.OutsourcingShowPanel(store, panelID,
				outsourcing)
        Srims.WorkSpace.addPanel(panel);
    }
};
// 新建外协单位
Srims.common.NewOutsourcing = function(IsInformation, store, IsExpert) {
    var panelID = 'NewOutsourcing';
    var outsourcing = new Srims.common.Outsourcing({});

    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingEditPanel(IsInformation, panelID, outsourcing,
			store, IsExpert);
    Srims.WorkSpace.addPanel(panel);
};
// 编辑外协单位
Srims.common.EditOutsourcing = function(outsourcing, store, IsExpert) {
    var panelID = 'OutsourcingEditPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingEditPanel(' ?; ?; ', panelID, outsourcing,
			store, IsExpert);
    Srims.WorkSpace.addPanel(panel);
};
Srims.common.VerfiyOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingVerfiyPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingVerfiyPanel(' ?; ?; ', panelID, outsourcing,
			store);
    Srims.WorkSpace.addPanel(panel);
};

Srims.common.InquiryOneOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingInquiryPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingInquiryPanel(panelID, outsourcing,
			store);
    Srims.WorkSpace.addPanel(panel);
};
Srims.common.setSelectOutsourcingID = function(outsourcing, store) {
    var _params = {};
    _params.id = outsourcing.get('id');
    Ext.Ajax.request({
        url: Srims.service.common.OutsourcingService
										+ '/SetCurrentSelectSourcingID',
        scope: this,
        params: _params
    });
};
//通过注册上传外协单位相关文档
Srims.common.uploadDocument = function(outsourcing, store, title) {
    var windowId = 'newOutsourcingImportWindow' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.component.FileUploadWindow(windowId, store, Srims.service.common.OutsourcingService + '/Import', title, false, outsourcing);

    window.show();
}

//驳回外协单位
Srims.common.saveForChangeState = function(outsourcing, outsourcingState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo) {

    //    var _params = {};
    //    _params.outsourcingID = outsourcing.get('id');
    //    _params.remark = remark;

    //    outsourcing.beginEdit();
    //    outsourcing.set('isVerify', outsourcingState); //
    //    outsourcing.commit();

    Ext.Ajax.request({
        url: Srims.service.common.OutsourcingService + subUrl,
        params: outsourcing.data,
        success: function(response) {
            //从showPanel上改变外协状态

            //执行轮询
            if (pollActions) {
                for (var i = 0; i < pollActions.length; i++)
                    Srims.Poll.startPollAction(pollActions[i]);
            }

            //刷新GridPanel
            var gridPanel = Ext.getCmp(gridPanelID);
            if (gridPanel) {
                Srims.WorkSpace.active(gridPanelID);
                Ext.getCmp(gridPanelID).getStore().load({
                    callback: function() {
                        Ext.Msg.show({
                            title: msg,
                            msg: msgInfo,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                });
            }
            var showPanel = 'OutsourcingVerfiyPanel' + outsourcing.get('id'); ;
            if (showPanel) {
                Srims.WorkSpace.getWorkSpace().remove(showPanel);

                //取得外协
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.common.OutsourcingXmlReader()
                });

                var newOutsourcing = newStore.getAt(0);
                Srims.common.ShowOutsourcing(newOutsourcing);
            }
            else {
                Ext.Msg.show({
                    title: msg,
                    msg: msgInfo,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    });
}

Srims.common.censorStart = function(outsourcing, remark, outsourcingState, subUrl, msg, msgInfo) {
    var gridPanelID = 'OutourcingGridPanel';
    var pollActions = [];
    pollActions[pollActions.length] = Srims.Poll.getPollAction_WaitingStartCensorOutsourcingCount;

    Srims.common.saveForChangeState(outsourcing, outsourcingState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo);
}
Srims.common.censorStart_Reject = function(outsourcing, remark) {
    Srims.common.censorStart(outsourcing, remark, '审核驳回', '/DisVerfiy', '审核驳回立项：外协单位的添加申请成功', '成功审核驳回外协单位：' + outsourcing.get('name') + '的申请');
}
Srims.common.rejectOutsourcingCensor = function(outsourcing) {
    var windowId = 'rejectOutsourcingCensorWindow_start' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.common.OutsourcingCensorRejectWindow(windowId, outsourcing);
    window.show();
}

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
//通过表格导入外协相关文档
Srims.common.showOutsourcingImportWindow = function(outsourcing, store, title) {
    var windowId = 'OutsourcingImportWindow' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    Srims.common.setSelectOutsourcingID(outsourcing, store);
    if (!window)
        window = new Srims.component.FileUploadWindow(windowId, store, Srims.service.common.OutsourcingService + '/Import', title, false);

    window.show();
}

Srims.common.downLoadDocument = function(document) {
    var documentResource = document;
    if (documentResource == '' || documentResource == null || documentResource == undefined) {
        Ext.Msg.show({
            title: '文档查看失败',
            msg: '该文档还没有上传',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    Srims.documents.downLoadResource(document, '/GetOutsourcingDocument');
}

Srims.common.showOutsourcingShowPanel_AllocationInfo_QueryWindow = function(id, store, queryParams, gridPanel,outsourcing) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow(id, store, queryParams, gridPanel,outsourcing);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
