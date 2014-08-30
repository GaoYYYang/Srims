if (!Srims.stamp)
    Ext.namespace('Srims.stamp')

Srims.stamp.StampApplicationGridPanel_ToolBar = function(selection, store, panelId, queryParams, stampState) {

    //fields
    this._panelId = panelId;
    this._selection = selection;
    this._store = store;
    this._queryParams = queryParams;
    this._stampState = stampState;

    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        selection: this._selection,
        panelId: this._panelId,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            Srims.stamp.showStampApplicationQueryWindow(this.panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(this.panelId), this.stampState);
        },
        tooltip: '<b>文印查询</b><br/>对文印进行查询'
    });
    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '申请',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            Srims.stamp.newStampApplication(this.store);
        },
        Hidden: true,
        tooltip: '<b>申请盖章</b><br/>申请盖章'
    });

    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        stampState: this._stampState,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;

            Srims.stamp.showStampApplication(this.selection.getSelected(), this.store, this.stampState);
        },
        hidden: true,
        tooltip: '<b>查看文印</b><br/>显示所选文印的详细信息'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.editStampApplication(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>编辑文印</b><br/>编辑选中文印的信息'
    });
    //  this._buttonEditBasic = new Ext.Toolbar.Button({
    //     iconCls: 'icon-edit',
    //      text: '编辑基本信息',
    //      minWidth: 60,
    //     selection: this._selection,
    //     store: this._store,
    //     handler: function(){
    //         Srims.stamp.editStampApplicationBasicInfor(this.selection.getSelected(), this.store);
    //     },
    //     hidden: true,
    //      tooltip: '<b>编辑文印基本信息</b><br/>编辑选中文印的基本信息'
    //  });
    // this._buttonSubmit = new Ext.Toolbar.Button({
    //     iconCls: 'icon-submit',
    //     text: '提交',
    //     minWidth: 60,
    //     selection: this._selection,
    //     store: this._store,
    //    isForCensor: this._isForCensor,
    //     handler: function(){
    //         if (this.selection.getCount() == 0)
    //             return;
    //         titile = '文印提交';
    //          message = '你确定要提交用印申请吗？';
    //          methodName = '/SubmitStamp';
    //         Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
    //      },
    //     hidden: true,
    //      tooltip: '<b>提交文印申请</b><br/>提交文印申请'
    //  });
    this._buttonCancleSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-return',
        text: '撤销提交',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '撤销文印提交';
            message = '你确定要撤销用印申请吗？';
            methodName = '/CancleSubmitStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>撤销文印申请</b><br/>撤销文印申请'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '初审通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/CensorPassStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核通过</b><br/>文印申请审核通过'
    });
    this._buttonCensorPassComplete = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '初审直接通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '审核直接通过';
            message = '你确定要直接通过此用印申请吗？';
            methodName = '/CensorPassCompleteStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核直接通过</b><br/>文印申请审核直接通过'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '初审驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            // titile = '审核驳回';
            // message = '你确定要驳回此用印申请吗？';
            // Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
            methodName = '/CensorRejectStamp';
            Srims.stamp.showStampRejectWindow(this.selection.getSelected(), this.store, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonDepToCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '初审驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            methodName = '/CensorRejectStamp';
            Srims.stamp.showStampRejectWindow(this.selection.getSelected(), this.store, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonStamp = new Ext.Toolbar.Button({
        iconCls: 'icon-stamp',
        text: '已盖章',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '已盖章';
            message = '你确定已对此用印盖章吗？';
            methodName = '/StampStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印盖章</b><br/>文印盖章'
    });
    // this._buttonStampStuffManage = new Ext.Toolbar.Button({
    //      iconCls: 'icon-project-document',
    //     text: '文印材料管理',
    //     minWidth: 60,
    //     selection: this._selection,
    //     store: this._store,
    //     handler: function(){
    //         if (this.selection.getCount() == 0)
    //              return;
    //          Srims.stamp.showStuffManangeWindow(this.selection.getSelected(), this.store);
    //     },
    //     hidden: true,
    //      tooltip: '<b>文印材料管理</b><br/>文印材料管理'
    //  });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.stamp.deleteStampApplication(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除项目分类</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新文印列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        stampState: this._stampState,
        handler: function() {
            //清空查询条件
            var params = ['token'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    this._buttonDepartmentCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '部门审核通过',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/DepartmentCensorPassStamp';
            Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核通过</b><br/>文印申请审核通过'
    });
    this._buttonDepartmentCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '部门审核驳回',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            // titile = '审核驳回';
            // message = '你确定要驳回此用印申请吗？';
            // methodName = '/CensorRejectStamp';
            // Srims.stamp.changeStampState(this.selection.getSelected(), this.store, titile, message, methodName, this.stampState);
            methodName = '/DepartmentCensorRejectStamp';
            Srims.stamp.showStampRejectWindow(this.selection.getSelected(), this.store, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });

    var user = Srims.currentLoginLog.user;


    var Items;
    if (this._stampState == undefined)
        Items = [this._buttonQuery, this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonCancleSubmit, this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    if (this._stampState == Srims.stamp.StampState.UnSubmit)
        Items = [this._buttonQuery, this._buttonShow, this._buttonEdit, this._buttonCensorPass, this._buttonCensorReject, this._buttonCensorPassComplete, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    if (this._stampState == Srims.stamp.StampState.DepartmentCensorPass)
        Items = [this._buttonQuery, this._buttonShow, this._buttonEdit, this._buttonStamp, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];
    if (this._stampState == Srims.stamp.StampState.WaitDepartmentCensor)
        Items = [this._buttonQuery, this._buttonShow, this._buttonEdit, this._buttonDepartmentCensorPass, this._buttonDepartmentCensorReject, this._buttonDepToCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset];

    Srims.stamp.StampApplicationGridPanel_ToolBar.superclass.constructor.call(this, {
        items: Items
    });

    //initial
    this._selection.buttonCancleSubmit = this._buttonCancleSubmit;
    // this._selection.buttonSubmit = this._buttonSubmit;
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    // this._selection.buttonEditBasic = this._buttonEditBasic;
    // this._selection.buttonStampStuffManage = this._buttonStampStuffManage;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonStamp = this._buttonStamp;
    this._selection.buttonDepartmentCensorPass = this._buttonDepartmentCensorPass;
    this._selection.buttonDepartmentCensorReject = this._buttonDepartmentCensorReject;

    this._selection.buttonDepToCensorReject = this._buttonDepToCensorReject;
    this._selection.buttonCensorPass = this._buttonCensorPass;
    this._selection.buttonCensorReject = this._buttonCensorReject;
    this._selection.buttonCensorPassComplete = this._buttonCensorPassComplete;

    //event methods
    this._onSelection_selectionChagne = function(selection) {
        var buttonCancleSubmit = selection.buttonCancleSubmit;
        // var buttonSubmit = selection.buttonSubmit;
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        // var buttonStampStuffManage = selection.buttonStampStuffManage;
        var buttonCensorPass = selection.buttonCensorPass;
        var buttonCensorPassComplete = selection.buttonCensorPassComplete;
        var buttonCensorReject = selection.buttonCensorReject;
        var buttonStamp = selection.buttonStamp;
        var buttonDepartmentCensorPass = selection.buttonDepartmentCensorPass;
        var buttonDepartmentCensorReject = selection.buttonDepartmentCensorReject;
        // var buttonEditBasic = selection.buttonEditBasic;
        var buttonDepToCensorReject = selection.buttonDepToCensorReject;
        if (selection.getCount() == 0) {
            buttonCancleSubmit.hide();
            // buttonSubmit.hide();
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            // buttonStampStuffManage.hide();
            buttonCensorPass.hide();
            buttonCensorPassComplete.hide();
            buttonCensorReject.hide();
            buttonStamp.hide();
            // buttonEditBasic.hide();
            buttonDepartmentCensorPass.hide();
            buttonDepartmentCensorReject.hide();
            buttonDepToCensorReject.hide();
            return;
        }

        var stampApplication = selection.getSelected();

        buttonCancleSubmit.setVisible(stampApplication.get('hasPermission_CancleSubmit'));
        buttonCancleSubmit.setDisabled(!stampApplication.get('canCancleSubmit'));

        //  buttonSubmit.setVisible(stampApplication.get('hasPermission_Submit'));
        //  buttonSubmit.setDisabled(!stampApplication.get('canSubmit'));

        buttonShow.setVisible(stampApplication.get('hasPermission_Show'));
        buttonShow.setDisabled(!stampApplication.get('canShow'));

        buttonEdit.setVisible(stampApplication.get('hasPermission_Edit'));
        buttonEdit.setDisabled(!stampApplication.get('canEdit'));

        // buttonEditBasic.setVisible(stampApplication.get('hasPermission_Edit'));
        //  buttonEditBasic.setDisabled(!stampApplication.get('canEdit'));

        buttonDelete.setVisible(stampApplication.get('hasPermission_Edit'));
        buttonDelete.setDisabled(!stampApplication.get('canEdit'));

        // buttonStampStuffManage.setVisible(stampApplication.get('hasPermission_ManageStampStuff'));
        //  buttonStampStuffManage.setDisabled(!stampApplication.get('canManageStampStuff'));

        buttonCensorPass.setVisible(stampApplication.get('hasPermission_Censor'));
        buttonCensorPass.setDisabled(!stampApplication.get('canCensor'));

        buttonCensorReject.setVisible(stampApplication.get('hasPermission_Censor')|| stampApplication.get('canCensorPassComplete'));
        buttonCensorReject.setDisabled(!(stampApplication.get('canCensor') || stampApplication.get('canCensorPassComplete')));

        buttonCensorPassComplete.setVisible(stampApplication.get('canCensorPassComplete'));
     //   buttonCensorPassComplete.setDisabled(!stampApplication.get('canCensorPassComplete'));

        buttonStamp.setVisible(stampApplication.get('hasPermission_Stamp'));
        buttonStamp.setDisabled(!stampApplication.get('canStamp'));

        buttonDepartmentCensorPass.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
        buttonDepartmentCensorPass.setDisabled(!stampApplication.get('canDepartmentCensor'));
        

        buttonDepartmentCensorReject.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
        buttonDepartmentCensorReject.setDisabled(!stampApplication.get('canDepartmentCensor'));

        buttonDepToCensorReject.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
        buttonDepToCensorReject.setDisabled(!stampApplication.get('canDepartmentCensor'));
    }
    //events
    this._selection.on('selectionchange', this._onSelection_selectionChagne);
}
Ext.extend(Srims.stamp.StampApplicationGridPanel_ToolBar, Ext.Toolbar);