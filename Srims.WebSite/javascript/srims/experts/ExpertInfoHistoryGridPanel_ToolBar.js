
if (!Srims.experts) 
    Ext.namespace('Srims.experts');


Srims.experts.ExpertInfoHistoryGridPanel_ToolBar = function(store, selection, queryParams){

    this._store = store;
    this._selection = selection;
    
    //controlls
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.experts.ExpertAction.showExpertInfoHistory(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看专家历史信息</b><br/>显示专家的相关历史信息'
    })
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) {
                Ext.Msg.show({
                    title: '请选择要审核的专家信息',
                    msg: '请选择要审核的专家信息',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            
            var records = this.selection.getSelections();
            
            Ext.MessageBox.confirm('审核通过专家编辑信息', '你确定要审核通过所选择的专家编辑信息吗？', function(buttonId){
                if (buttonId == 'yes') 
                    for (var i = 0; i < records.length; i++) {
                    
                        var methodName = "/CensorExpertEditInformation";
                        Srims.experts.ExpertAction.CensorExpertInfoHistory(records[i], this.store, methodName);
                    }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过</b><br/>审核通过'
    })
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        panelId: this._panelId,
        selection: this._selection,
        store: this._store,
        handler: function(){
        
            if (this.selection.getCount() == 0) {
                Ext.Msg.show({
                    title: '请选择要审核的专家信息',
                    msg: '请选择要审核的专家信息',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return;
            }
            
            var records = this.selection.getSelections();
            
            Ext.MessageBox.confirm('审核驳回专家编辑信息', '你确定要审核驳回所选择的专家编辑信息吗？', function(buttonId){
                if (buttonId == 'yes') 
                    for (var i = 0; i < records.length; i++) {
                    
                        var methodName = "/RejectExpertEditInformation";
                        Srims.experts.ExpertAction.CensorExpertInfoHistory(records[i], this.store, methodName);
                    }
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核驳回</b><br/>审核驳回'
    })
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新专家列表'
    })
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    })
    
    Srims.experts.ExpertInfoHistoryGridPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonShow, this._buttonCensorPass, this._buttonCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    })
    
    //initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    
    //event methods
    this._onSelection_selectionChange = function(selection){
        var buttonShow = selection.buttonShow;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            return;
        }
        var expertInfoHistory = selection.getSelected();
        
        buttonShow.setVisible(expertInfoHistory.get('hasPermission_Show'));
        buttonShow.setDisabled(!expertInfoHistory.get('canShow'));
        buttonCensorPass.setVisible(expertInfoHistory.get('hasPermission_CensorPass'));
        buttonCensorPass.setDisabled(!expertInfoHistory.get('canCensorPass'));
        buttonCensorReject.setVisible(expertInfoHistory.get('hasPermission_CensorReject'));
        buttonCensorReject.setDisabled(!expertInfoHistory.get('canCensorReject'));
    }
    
    //event
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.experts.ExpertInfoHistoryGridPanel_ToolBar, Ext.Toolbar);
