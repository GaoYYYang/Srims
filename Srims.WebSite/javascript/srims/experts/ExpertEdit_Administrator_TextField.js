
if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_TextField = function(id, expert, panel, item) {
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;
    var idCardNumberExp = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
    var emailExp = /\w+([-+.]\w+)*@\w+([-.]\w+)+/;
    //var emailExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/;
    var phoneExp = /(\d{3}-\d{8})$|(\d{4}-\d{8})$|(\d{4}-\d{7})$|(^\d{11}|^\d{12})$/;
    var mobileExp = /^1\d{10}$/;
    var zipExp = /^\d{6}$/;

    this._fieldNewValue = new Ext.form.TextField({
        fieldLabel: item[0].fieldLabel,
        value: item[0].getValue(),
        allowBlank: item[3] == 'NameSpell' || item[3] == 'MobilePhone' ? false : true,
        width: 300
    });

    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        item: this._item
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

    Srims.experts.ExpertEdit_Administrator_TextField.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 400,
        labelWidth: 60,
        height: 135,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue],
        buttons: [this._buttonSave, this._buttonCancle]
    });

    this.assignValues = function() {
        this._expert.set(this._item[3], this._fieldNewValue.getValue());
    }
    this.clearParams = function() {
        this._fieldNewValue.reset();
    }

    this.isValid = function(preventMark, item) {
        var result = true;
        result = this._fieldNewValue.isValid(preventMark) && result;
        if (item[3] == 'NameSpell')
            result = this._ValidateNameSpell() && result;
        else
            if (item[3] == 'IDCardNumber')
            result = this._ValidateIDdCardNumber() && result;
        else
            if (item[3] == 'Email')
            result = this._ValidateEmail() && result;
        else
            if (item[3] == 'OfficePhone' || item[3] == 'HomePhone')
            result = this._ValidatePhone() && result;
        else
            if (item[3] == 'MobilePhone')
            result = this._ValidateMobilePhone() && result;
        else
            if (item[3] == 'Zip')
            result = this._ValidateZip() && result;
        return result;
    }
    this._ValidateZip = function() {
        if (!zipExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '邮编错误',
                msg: '您输入的邮编有误，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidatePhone = function() {
        if (!mobileExp.test(this._fieldNewValue.getValue()) && !phoneExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '电话号码错误',
                msg: '您输入的电话号码有误，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidateMobilePhone = function() {
        if (!mobileExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '手机号码错误',
                msg: '您输入手机号码有误，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidateNameSpell = function() {
        if (this._fieldNewValue.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: '名称拼音缩写错误',
                msg: '您输入的只有空格，请重新输入有意义的缩写。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidateIDdCardNumber = function() {
        if (!idCardNumberExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '身份证号码错误',
                msg: '您输入的身份证号码有误，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._ValidateEmail = function() {
        if (!emailExp.test(this._fieldNewValue.getValue())) {
            Ext.Msg.show({
                title: '邮箱地址错误',
                msg: '您输入邮箱地址的格式有误，请重新输入正确的邮箱地址。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }

    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._fieldNewValue.getValue();
        var data = {};
        data[item[3]] = newValue;
        data['expertID'] = expert.get('id');
        data['paramName'] = item[3];
        data['field'] = 'TextField';

        expert.beginEdit();
        this.assignValues();
        expert.commit();
        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response) {
                //编辑完，列表刷新，列表刷新
                item[0].getEl().dom.value = newValue;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        var item = button.item;

        if (!window.isValid(false, item))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);


}

Ext.extend(Srims.experts.ExpertEdit_Administrator_TextField, Ext.Window);

