
if (!Srims.experts)
    Ext.namespace('Srims.experts');


Srims.experts.ExpertShowPanel_ToolBar = function(expert, showPanel) {
    //fields
    this._expert = expert;
    this._showPanel = showPanel;
    this._editing = false;
    var user = Srims.currentLoginLog.user;

    this._buttonStartEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: user.isExpert ? '编辑个人信息' : '编辑专家信息',
        minWidth: 60,
        expert: this._expert,
        panel: this._showPanel,
        hidden: false,
        editing: this._editing,
        func: this.buttonChange,
        tooltip: '<b>点此按钮开始编辑</b>您可以对保持高亮的字段进行编辑<br/>',
        handler: function() {
            this.panel.getUserEditPower(this.expert, this.panel);
        }
    })

    this._buttonEditFinish = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '结束编辑',
        minWidth: 60,
        expert: this._expert,
        panel: this._showPanel,
        editing: this._editing,
        hidden: true,
        func: this.buttonChange,
        tooltip: '<b>点此按钮结束编辑</b>如果您已经完成了编辑，请点击此按钮<br/>',
        handler: function() {
            Srims.experts.ExpertAction.finishEdit(this.panel, this.panel._basicInformation.administratorEditItems, this.panel._basicInformation.administratorCanNotEditItems);
            Srims.experts.ExpertAction.finishEdit(this.panel, this.panel._basicInformation.linkWayEditItems, this.panel._basicInformation.linkWayAdministratorCanNotEditItems);
            Srims.experts.ExpertAction.finishEdit(this.panel, this.panel._basicInformation.expertSelfEditItems, this.panel._basicInformation.expertSelfCanNotEditItems);
            Ext.Msg.show({
                title: '信息提示',
                msg: '所有修改信息，需等系统管理员审核通过后才能生效。',
                buttons: Ext.Msg.OK
            });
        }
    })

    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        expert: this._expert,
        hiden: true,
        handler: function() {
            Ext.Ajax.request({
                url: Srims.service.experts.ExpertService + '/GetById',
                params: {
                    expertId: this.expert.get('id')
                },
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.experts.ExpertXmlReader()
                    });
                    var currentExpert = store.getAt(0);
                    var panel = Ext.getCmp('ExpertShowPanel' + currentExpert.get('id'));

                    panel.resetComponentValue(currentExpert);
                    panel._expertParticipantProjects._store.load();
                    panel._expertChargeProjects._store.load();
                    panel._expertPapers._store.load();
                    panel._expertPatents._store.load();
                    panel._expertAwards._store.load();
                }
            });
        },
        tooltip: '<b>刷新专家信息</b><br/>刷新专家的全部信息'
    })

    Srims.experts.ExpertShowPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonStartEdit, this._buttonEditFinish, new Ext.Toolbar.Fill(), this._buttonRefresh],
        height: 25
    });

    //event
    this._onbuttonStartEdit_Click = function(button, e) {
        button.editing = true;
        button.buttonChange(button, button.editing);
    }
    this._buttonStartEdit.on('click', this._onbuttonStartEdit_Click);
    this._buttonStartEdit.other = this._buttonEditFinish;

    this._onbuttonEditFinish = function(button, e) {
        button.editing = false;
        button.buttonChange(button, button.editing);
    }
    this._buttonEditFinish.on('click', this._onbuttonEditFinish);
    this._buttonEditFinish.other = this._buttonStartEdit;

    this.buttonChange = function(button, editing) {
        button.panel._message.setVisible(editing);
        button.panel._expertParticipantProjects.setVisible(!editing);
        button.panel._expertChargeProjects.setVisible(!editing);
        button.panel._expertPapers.setVisible(!editing);
        button.panel._expertPatents.setVisible(!editing);
        button.panel._expertAwards.setVisible(!editing);
        button.other.setVisible(true);
        button.hide();
    }
    this._buttonStartEdit.buttonChange = this.buttonChange;
    this._buttonEditFinish.buttonChange = this.buttonChange;
}
Ext.extend(Srims.experts.ExpertShowPanel_ToolBar, Ext.Toolbar);
