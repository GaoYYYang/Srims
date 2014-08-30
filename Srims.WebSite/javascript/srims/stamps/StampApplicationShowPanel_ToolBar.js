if (!Srims.stamp)
    Ext.namespace('Srims.stamp')

Srims.stamp.StampApplicationShowPanel_ToolBar = function(stampApplication, store, panelId, stampState) {

    //fields
    this._panelId = panelId;
    this._stampApplication = stampApplication;
    this._store = store;
    this._stampState = stampState;

    //controls

    // this._buttonEdit = new Ext.Toolbar.Button({
    //     iconCls: 'icon-edit',
    //     text: '编辑基本信息',
    //     minWidth: 60,
    //     stampApplication: this._stampApplication,
    //     store: this._store,
    //     handler: function(){
    //         Srims.stamp.editStampApplicationBasicInfor(this.stampApplication, this.store);
    //     },
    //    hidden: true,
    //     tooltip: '<b>编辑文印</b><br/>编辑选中文印的信息'
    // });
    // this._buttonSubmit = new Ext.Toolbar.Button({
    //     iconCls: 'icon-submit',
    //     text: '提交',
    //     minWidth: 60,
    //     stampApplication: this._stampApplication,
    //     store: this._store,
    //      isForCensor: this._isForCensor,
    //      handler: function(){
    //          titile = '文印申请提交';
    //         message = '你确定要提交用印申请吗？';
    //         methodName = '/SubmitStamp';
    //        Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.isForCensor);
    //     },
    //    hidden: true,
    //    tooltip: '<b>提交文印申请</b><br/>提交文印申请'
    // });
    //this._buttonStampStuffManage = new Ext.Toolbar.Button({
    //    iconCls: 'icon-project-document',
    //   text: '文印材料管理',
    //   minWidth: 60,
    //    stampApplication: this._stampApplication,
    //    store: this._store,
    //    handler: function(){
    //        Srims.stamp.showStuffManangeWindow(this.stampApplication, this.store);
    //    },
    //    hidden: true,
    //    tooltip: '<b>文印材料管理</b><br/>文印材料管理'
    // });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        stampApplication: this._stampApplication,
        store: this._store,
        handler: function() {
            Srims.stamp.editStampApplication(this.stampApplication, this.store);
        },
        hidden: true,
        tooltip: '<b>编辑文印</b><br/>编辑选中文印的信息'
    });
    this._buttonCancleSubmit = new Ext.Toolbar.Button({
        iconCls: 'icon-cancle',
        text: '撤销提交',
        minWidth: 60,
        stampApplication: this._stampApplication,
        store: this._store,
        stampState: this._stampState,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            titile = '撤销文印提交';
            message = '你确定要撤销用印申请吗？';
            methodName = '/CancleSubmitStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>撤销文印申请</b><br/>撤销文印申请'
    });
    this._buttonCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '审核通过',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/CensorPassStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核通过</b><br/>文印申请审核通过'
    });
    this._buttonCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '审核驳回',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '审核驳回';
            message = '你确定要驳回此用印申请吗？';
            methodName = '/CensorRejectStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonDepartmentCensorPass = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-pass',
        text: '部门审核通过',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/DepartmentCensorPassStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核通过</b><br/>文印申请审核通过'
    });
    this._buttonDepartmentCensorReject = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '部门审核驳回',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/DepartmentCensorRejectStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonCensorPassComplete = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '初审最终通过',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/CensorPassCompleteStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonWaitDepartmentCensor = new Ext.Toolbar.Button({
        iconCls: 'icon-censor-reject',
        text: '提交部门审核',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '部门审核通过';
            message = '你确定要通过此用印申请吗？';
            methodName = '/WaitDepartmentCensorStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印申请审核驳回</b><br/>文印申请审核驳回'
    });
    this._buttonStamp = new Ext.Toolbar.Button({
        iconCls: 'icon-stamp',
        text: '已盖章',
        minWidth: 60,
        stampApplication: this._stampApplication,
        stampState: this._stampState,
        store: this._store,
        handler: function() {
            titile = '已盖章';
            message = '你确定已对此用印盖章吗？';
            methodName = '/StampStamp';
            Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, methodName, this.stampState);
        },
        hidden: true,
        tooltip: '<b>文印盖章</b><br/>文印盖章'
    });

    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        store: this._store,
        stampApplication: this._stampApplication,
        handler: function() {
            Srims.stamp.deleteStampApplication(this.stampApplication, this.store);
        },
        hidden: true,
        tooltip: '<b>删除项目分类</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        panelId: this._panelId,
        stampApplication: this._stampApplication,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.stamp.StampApplicationService + '/GetById',
                params: {
                    stampApplicationId: this.stampApplication.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.stamp.StampApplicationXmlReader()
                    });
                    var currentStampApplication = store.getAt(0);

                    var panel = Ext.getCmp(this.panelId);
                    panel.resetValues(currentStampApplication);
                    panel._stateHistoryForm._store.load();
                    panel._stuffForm._store.load();
                }
            });
        },
        tooltip: '<b>刷新列表</b><br/>更新文印列表'
    });
    var user = Srims.currentLoginLog.user;

    var Items;
    if (stampState == undefined)
        Items = [this._buttonEdit, this._buttonCancleSubmit, this._buttonDelete, this._buttonCensorPass, this._buttonCensorReject, this._buttonCensorPassComplete, this._buttonWaitDepartmentCensor, new Ext.Toolbar.Fill(), this._buttonRefresh];

    if (stampState == Srims.stamp.StampState.UnSubmit)
        Items = [this._buttonEdit, this._buttonCensorPass, this._buttonCensorReject, this._buttonCensorPassComplete, this._buttonWaitDepartmentCensor, new Ext.Toolbar.Fill(), this._buttonRefresh];
    if (stampState == Srims.stamp.StampState.DepartmentCensorPass)
        Items = [this._buttonEdit, this._buttonStamp, new Ext.Toolbar.Fill(), this._buttonRefresh];
    if (stampState == Srims.stamp.StampState.WaitDepartmentCensor)
        Items = [this._buttonEdit, this._buttonDepartmentCensorPass, this._buttonDepartmentCensorReject, new Ext.Toolbar.Fill(), this._buttonRefresh];


    Srims.stamp.StampApplicationShowPanel_ToolBar.superclass.constructor.call(this, {
        items: Items
    });

    //initial

    this._buttonCancleSubmit.setVisible(stampApplication.get('hasPermission_CancleSubmit'));
    this._buttonCancleSubmit.setDisabled(!stampApplication.get('canCancleSubmit'));
    this._buttonDepartmentCensorPass.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
    this._buttonDepartmentCensorPass.setDisabled(!stampApplication.get('canDepartmentCensor'));

    this._buttonCensorPassComplete.setVisible(stampApplication.get('hasPermission_Censor'));
    this._buttonCensorPassComplete.setDisabled(!stampApplication.get('canCensorPassComplete'));
    this._buttonWaitDepartmentCensor.setVisible(stampApplication.get('hasPermission_Censor'));
    this._buttonWaitDepartmentCensor.setDisabled(!stampApplication.get('canCensorPassComplete'));

    this._buttonDepartmentCensorReject.setVisible(stampApplication.get('hasPermission_DepartmentCensor'));
    this._buttonDepartmentCensorReject.setDisabled(!stampApplication.get('canDepartmentCensor'));
    //  this._buttonSubmit.setVisible(stampApplication.get('hasPermission_Submit'));
    //  this._buttonSubmit.setDisabled(!stampApplication.get('canSubmit'));

    this._buttonEdit.setVisible(stampApplication.get('hasPermission_Edit'));
    this._buttonEdit.setDisabled(!stampApplication.get('canEdit'));

    this._buttonDelete.setVisible(stampApplication.get('hasPermission_Edit'));
    this._buttonDelete.setDisabled(!stampApplication.get('canEdit'));

    // this._buttonStampStuffManage.setVisible(stampApplication.get('hasPermission_ManageStampStuff'));
    // this._buttonStampStuffManage.setDisabled(!stampApplication.get('canManageStampStuff'));

    this._buttonCensorPass.setVisible(stampApplication.get('hasPermission_Censor'));
    this._buttonCensorPass.setDisabled(!stampApplication.get('canCensor'));

    this._buttonCensorReject.setVisible(stampApplication.get('hasPermission_Censor'));
    this._buttonCensorReject.setDisabled(!stampApplication.get('canCensor'));

    this._buttonStamp.setVisible(stampApplication.get('hasPermission_Stamp'));
    this._buttonStamp.setDisabled(!stampApplication.get('canStamp'));

}
Ext.extend(Srims.stamp.StampApplicationShowPanel_ToolBar, Ext.Toolbar);