
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardWinnerManageWindow_AddWinner = function(award, awardWinner, store, isExpert) {
    this._awardWinner = awardWinner;
    this._award = award;
    this._store = store;
    this._isExpert = isExpert;

    if (awardWinner.isNew())
        this._title = '添加';
    else
        this._title = '编辑';
    if (isExpert)
        this._title += '专家';
    else
        this._title += '非专家';


    this._buttonClose = new Ext.Button({
        minWidth: 60,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 60,
        text: '保 存',
        window: this
    });
    this._winnerRank = new Ext.form.NumberField({
        fieldLabel: '位次',
        width: 100,
        value: awardWinner.get('order'),
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        maxValue: 10000
    });
    this._winnerNormalName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: awardWinner.get('name'),
        width: 180,
        allowBlank: false
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家',
        width: 140,
        value: this._awardWinner.get('name'),
        selectEntityId: this._awardWinner.get('expertID'),
        allowBlank: false
    });
    if (this._isExpert)
        this._items = [this._comboBoxExpert, this._winnerRank];
    else
        this._items = [this._winnerNormalName, this._winnerRank];

    //constructor
    Srims.awards.AwardWinnerManageWindow_AddWinner.superclass.constructor.call(this, {
        title: this._title,
        iconCls: award.isNew() ? 'icon-new' : 'icon-edit',
        width: 300,
        labelWidth: 40,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: this._items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function() {
        if (this._isExpert)
            this._awardWinner.set('expertID', this._comboBoxExpert.getValue());       
        else
            this._awardWinner.set('name', this._winnerNormalName.getValue());
        this._awardWinner.set('order', this._winnerRank.getValue());
        this._awardWinner.set('awardID', this._award.get('id'));
    }

    this._ValidateOrder = function() {
        var winners = this._store.getRange();
        var winnerOrder = this._winnerRank.getValue();

        for (var i = 0; i < winners.length; i++) {
            if (this._awardWinner == winners[i])
                continue;
            if (winnerOrder == winners[i].get('order')) {
                Ext.Msg.show({
                    title: '获奖者位次错误',
                    msg: '获奖者位次不能重复，请重新输入位次。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._ValidateExpert = function() {
        var winners = this._store.getRange();
        var expertID = this._comboBoxExpert.getValue();
        for (var i = 0; i < winners.length; i++) {
            if (this._awardWinner == winners[i])
                continue;
            if (this._isExpert && expertID == winners[i].get('expertID')) {
                Ext.Msg.show({
                    title: '专家错误',
                    msg: '该专家已经是获奖人，请重新选择专家。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._ValidateNormal = function() {
        if (this._winnerNormalName.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: '名称错误',
                msg: '您输入的名称只有空格，请重新输入有意义的名称。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }

    //输入数据验证
    this.isValid = function(preventMark) {
        var result = true;

        if (this._isExpert) {
            result = this._comboBoxExpert.isValid(preventMark) && result;
            result = this._ValidateExpert() && result;
        }
        else {
            result = this._winnerNormalName.isValid(preventMark) && result;
            result = this._ValidateNormal() && result;
        }
        result = this._winnerRank.isValid(preventMark) && result;
        result = this._ValidateOrder() && result;

        return result;
    }
    this.save = function() {
        var awardWinner = this._awardWinner;
        awardWinner.beginEdit();
        this.assignValues();
        awardWinner.commit();
        var award = this._award;

        Ext.Ajax.request({
            url: Srims.service.awards.AwardWinnerService + '/SaveAwardWinner',
            params: awardWinner.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                //新建获奖人后，奖励列表，奖励显示，获奖人管理都刷新
                var panelID = 'AwardShowPanel' + award.get('id');
                Srims.awards.listAward(false, false);
                var showPanelID = 'AwardShowPanel' + award.get('id');
                if (Ext.getCmp(showPanelID)) {
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(showPanelID), true);
                    Srims.awards.showAward(award);
                }
                Srims.awards.showAwardWinnerManageWindow(award);
            }
        })
    }
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
Ext.extend(Srims.awards.AwardWinnerManageWindow_AddWinner, Ext.Window);
