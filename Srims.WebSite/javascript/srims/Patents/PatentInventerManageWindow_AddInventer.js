
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentInventerManageWindow_AddInventer = function(patent, patentInventer, store, isExpert) {
    this._patentInventer = patentInventer;
    this._patent = patent;
    this._store = store;
    this._isExpert = isExpert;

    var hasPrincipal = false;
    var inventerList = this._store.getRange();
    for (var i = 0; i < inventerList.length; i++) {
        if (inventerList[i].get('isPrincipal'))
            hasPrincipal = true;
    }

    if (patentInventer.isNew())
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
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 60,
        text: '保 存',
        window: this
    });
    this._inventerRank = new Ext.form.NumberField({
        fieldLabel: '位次',
        width: 100,
        value: patentInventer.get('order'),
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false,
        minValue: 1,
        maxValue: 10000
    });
    this._inventerNormalName = new Ext.form.TextField({
        fieldLabel: '名称',
        value: patentInventer.get('name'),
        width: 180,
        allowBlank: false
    });
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '专家',
        width: 140,
        value: this._patentInventer.get('name'),
        selectEntityId: this._patentInventer.get('expertID'),
        allowBlank: false
    });
    this._IsPrincipal = new Ext.form.Checkbox({
        fieldLabel: '是否负责人',
        window: this,
        disabled: patentInventer.get('isPrincipal') == true ? false : (hasPrincipal == true ? true : false)
    });

    if (this._isExpert)
        this._items = [this._comboBoxExpert, this._inventerRank, this._IsPrincipal];
    else
        this._items = [this._inventerNormalName, this._inventerRank, this._IsPrincipal];

    //constructor
    Srims.patents.PatentInventerManageWindow_AddInventer.superclass.constructor.call(this, {
        title: this._title,
        iconCls: patentInventer.isNew() ? 'icon-new' : 'icon-edit',
        width: 300,
        labelWidth: 80,
        height: 165,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: this._items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function() {
        if (this._isExpert)
            this._patentInventer.set('expertID', this._comboBoxExpert.getValue());
        else
            this._patentInventer.set('name', this._inventerNormalName.getValue());
        this._patentInventer.set('order', this._inventerRank.getValue());
        this._patentInventer.set('patentID', this._patent.get('id'));
        this._patentInventer.set('isPrincipal', this._IsPrincipal.getValue());
    }
    this._ValidatePrincipal = function() {
        var inventers = this._store.getRange();
        var isPrincapal = this._IsPrincipal.getValue();

        for (var i = 0; i < inventers.length; i++) {
            if (this._patentInventer == inventers[i])
                continue;
            if (isPrincapal == inventers[i].get('isPrincipal') && isPrincapal == true) {
                Ext.Msg.show({
                    title: '负责人位次错误',
                    msg: '已有一位负责人，不能有多位负责人，请重新输入。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._ValidateOrder = function() {
        var inventers = this._store.getRange();
        var inventerOrder = this._inventerRank.getValue();

        for (var i = 0; i < inventers.length; i++) {
            if (this._patentInventer == inventers[i])
                continue;
            if (inventerOrder == inventers[i].get('order')) {
                Ext.Msg.show({
                    title: '发明人位次错误',
                    msg: '发明人位次不能重复，请重新输入位次。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._ValidateExpert = function() {
        var inventers = this._store.getRange();
        var expertID = this._comboBoxExpert.getValue();
        for (var i = 0; i < inventers.length; i++) {
            if (this._patentInventer == inventers[i])
                continue;
            if (this._isExpert && expertID == inventers[i].get('expertID')) {
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
        if (this._inventerNormalName.getValue().trim().length == 0) {
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
            result = this._inventerNormalName.isValid(preventMark) && result;
            result = this._ValidateNormal() && result;
        }
        result = this._inventerRank.isValid(preventMark) && result;
        result = this._ValidateOrder() && result;
        result = this._ValidatePrincipal() && result;

        return result;
    }
    this.save = function() {
        var patentInventer = this._patentInventer;
        var getPatentPrincipal = this._getPatentPrincipal;
        patentInventer.beginEdit();
        this.assignValues();
        patentInventer.commit();
        var patent = this._patent;
        var store = this._store;

        Ext.Ajax.request({
            url: Srims.service.patents.PatentInventerService + '/SavePatentInventer',
            params: patentInventer.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                //新建发明人后，专利列表，专利显示，专利发明人管理都刷新                
                Srims.patents.listPatent(false, false);
                var showPanelID = 'PatentShowPanel' + patent.get('id');
                if (Ext.getCmp(showPanelID)) {
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(showPanelID), true);
                    Srims.patents.showPatent(patent);
                }
                Srims.patents.showPatentInventerManageWindow(patent);
                store.load();
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
Ext.extend(Srims.patents.PatentInventerManageWindow_AddInventer, Ext.Window);









