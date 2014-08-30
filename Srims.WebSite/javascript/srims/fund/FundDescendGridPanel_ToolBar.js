
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendGridPanel_ToolBar = function(selection, store, panelId, queryParams, isDescendPage, isBorrow, isExpert, isCensor){

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        panelId: this._panelId,
        store: this._store,
        handler: function(){
            Srims.fund.showFundDescendQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, isBorrow, Ext.getCmp(this.panelId));
        },
        tooltip: '<b>经费下拨查询</b><br/>对经费下拨信息进行查询'
    });
    this._buttonDescend = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-descend',
        text: '经费查询与下拨',
        minWidth: 60,
        store: this._store,
        handler: function(){
            Srims.expertGuide.showFundDescendProcessPanel();
        },
        hidden: !isExpert,
        tooltip: '<b>下拨经费</b><br/>对所选经费进行下拨'
    });
    this._buttonHeader = new Ext.Toolbar.Button({
        text: '<b style="color:#15428B">经费下拨信息</b>',
        minWidth: 60
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.fund.editFundDescend(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑经费下拨</b><br/>编辑选中经费下拨信息'
    });
    this._buttonAllocation = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-allocation',
        text: '分配',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            var user = Srims.currentLoginLog.user;
            if (user.userRoleType == 'Administrator') {
                Srims.fund.showFundAllocationInfoByFundDescend(this.selection.getSelected());
                //从经费下拨上直接点分配
                var window = this.store.window;
                if (window) 
                    window.hide();
            }
            else
                Srims.fund.showFundAllocationInfoByFundDescend(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>分配经费</b><br/>对所选经费下拨进行分配'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        panelID: this._panelId,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('删除经费下拨', '你确定要删除这个经费下拨吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.fund.fundDescend_delete(this.selection.getSelected(), this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>删除经费下拨</b><br/>删除选中的经费下拨'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            
            Ext.MessageBox.confirm('审核通过经费下拨', '你确定要审核通过这个经费下拨吗？', function(buttonId){
                if (buttonId == 'yes') 
                    Srims.fund.FundDesend_CenorPass(this.selection.getSelected(), this.store);
            }, this);
        },
        hidden: true,
        tooltip: '<b>审核通过经费下拨</b><br/>如果不能审核通过，可能的原因为：对应的经费到帐已经被下拨过，请查看对应的经费到帐的下拨信息'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            if (this.selection.getCount() == 0) 
                return;
            Srims.fund.showFundDescendCensorRejectWindow(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>审核驳回经费下拨</b>'
    });
    this._buttonLent = new Ext.Toolbar.Button({
        iconCls: 'icon-fund-lent',
        text: '借款',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function(){
            Srims.fund.newFundLent(store);
        },
        tooltip: '<b>借款</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function(){
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新经费下拨列表'
    });
    
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        handler: function(){
            //清空查询条件
            var params = ['token', 'isStaticstics', 'fundDescendState', 'isHorizontal', 'isExpertDescend'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    
    var user = Srims.currentLoginLog.user;
    var items = [this._buttonQuery, this._buttonDescend, this._buttonHeader, this._buttonLent, this._buttonAllocation, this._buttonEdit, this._buttonDelete];
    
    if (user.userRoleType == 'Administrator') {
        items[items.length] = this._buttonCensorPass;
        items[items.length] = this._buttonCensorReject;
    }
    items[items.length] = new Ext.Toolbar.Fill();
    items[items.length] = this._buttonRefresh;
    items[items.length] = this._buttonReset;
    
    Srims.fund.FundDescendGridPanel_ToolBar.superclass.constructor.call(this, {
        items: items
    });
    
    this._buttonQuery.setVisible(isDescendPage == false);
    this._buttonReset.setVisible(isDescendPage == false);
    this._buttonLent.setVisible(isBorrow == true);
    
    this._buttonHeader.setVisible(isDescendPage);
    
    //initial
    this._selection.buttonAllocation = this._buttonAllocation;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    
    //event methods
    this._onSelection_selectionChagne = function(selection){
        var buttonAllocation = selection.buttonAllocation;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorReject = selection.buttonCensorReject;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        
        if (selection.getCount() == 0) {
            buttonAllocation.hide();
            buttonCensorPass.hide();
            buttonCensorReject.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            return;
        }
        
        var fundDescend = selection.getSelected();
        
        buttonAllocation.setVisible(fundDescend.get('hasPermission_ShowAlloction') && (!isCensor || isDescendPage));
        buttonAllocation.setDisabled(!fundDescend.get('canShowAllocation'));
        
        buttonCensorPass.setVisible(fundDescend.get('hasPermission_Censor') && isCensor == true);
        buttonCensorPass.setDisabled(!fundDescend.get('canCensorPass'));
        
        buttonCensorReject.setVisible(fundDescend.get('hasPermission_Censor') && isCensor == true);
        buttonCensorReject.setDisabled(!fundDescend.get('canCensorReject'));
        
        buttonEdit.setVisible(fundDescend.get('hasPermission_Edit') && isDescendPage == true);
        buttonEdit.setDisabled(!fundDescend.get('canEdit'));
        
        buttonDelete.setVisible(fundDescend.get('hasPermission_Delete') && (isDescendPage == true || isBorrow == true || isExpert == true));
        buttonDelete.setDisabled(!fundDescend.get('canDelete'));
    }
    
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.fund.FundDescendGridPanel_ToolBar, Ext.Toolbar);
