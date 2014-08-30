if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLinkWayEditWindow = function(panelId, expert) {
    this._expert = expert;
    this._params = {};
    this._id = panelId;

    this._linkWayForm = new Srims.experts.ExpertLinkWayEditWindow_LinkWayForm(expert);

    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonCancle = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
            window.close();
        }
    });

    Srims.experts.ExpertLinkWayEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '编辑专家联系方式',
        iconCls: 'icon-linkWay-edit',
        width: 600,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._linkWayForm],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancle]
    });

    //method
    this.assignValues = function() {
        this._linkWayForm.assignValues();
    }
    this.clearParams = function() {
        this._linkWayForm.clearParams();
    }

    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        expert.beginEdit();
        this.assignValues();
        expert.commit();

        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/SaveExpertLinkWay',
            params: award.data,
            scope: this,
            success: function(response) {
                //                var store = new Ext.data.Store({
                //                    data: response.responseXML,
                //                    reader: new Srims.awards.AwardXmlReader()
                //                });
                //                var newAward = store.getAt(0);
                //                if (isNew) {
                //                    //新建完，列表刷新，显示新建奖励
                //                    Srims.WorkSpace.getWorkSpace().remove(this);
                //                    Srims.awards.listAward(false, false);
                //                    Srims.awards.showAward(newAward);
                //                }
                //                else {
                //                    //编辑完，列表刷新，显示奖励刷新
                //                    var panelID = 'AwardShowPanel' + award.get('id');
                //                    Srims.WorkSpace.getWorkSpace().remove(this);
                //                    Srims.awards.listAward(false, false);
                //                    if (Ext.getCmp(panelID)) Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                //                    Srims.awards.showAward(newAward, store);
                //                }
            }
        })
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;

        if (!window.isValid(false))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.experts.ExpertLinkWayEditWindow, Ext.Window);
