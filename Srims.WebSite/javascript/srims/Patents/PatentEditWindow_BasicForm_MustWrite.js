if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentEditWindow_BasicPanel_MustWrite = function(patent) {
    this.patent = patent;

    this._PatentName = new Ext.form.TextField({
        fieldLabel: '专利名称',
        allowBlank: false,
        value: patent.get('name'),
        width: 441
    });
    this._PatentNumber = new Ext.form.TextField({
        fieldLabel: '专利号',
        allowBlank: false,
        value: patent.get('number'),
        width: 160
    });
    this._PatentCountry = new Srims.component.NoticeTextComboBox({
        fieldLabel: '专利国别',
        value: patent.get('country'),
        allowBlank: false,
        emptyText: '请选择专利国别',
        noticeTextType: "PatentCountry",
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
        width: 160
    });
    this._patentType = new Ext.form.ComboBox({
        fieldLabel: '专利类别',
        value: patent.get('type'),
        store: Srims.patents.PatentTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        width: 160
    });
    this._patentLawState = new Ext.form.ComboBox({
        fieldLabel: '法律状态',
        value: patent.get('lawState'),
        store: Srims.patents.PatentLawStateStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        width: 160
    });

    //constructor
    var columnOneItems = [this._PatentNumber, this._PatentCountry];
    var columnTwoItems = [this._patentType, this._patentLawState];

    Srims.patents.PatentEditWindow_BasicPanel_MustWrite.superclass.constructor.call(this, {
        title: '必填信息',
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        width: 585,
        items: [this._PatentName, new Ext.Panel({
            widht:580,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 80,
                items: columnOneItems
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                items: columnTwoItems
            })]
        })]
    });

    //method
    this.assignValues = function() {
        this.patent.set('name', this._PatentName.getValue());
        this.patent.set('number', this._PatentNumber.getValue());
        this.patent.set('country', this._PatentCountry.getValue());
        this.patent.set('type', this._patentType.getValue());
        this.patent.set('lawState', this._patentLawState.getValue());
    }

    this.clearParams = function() {
        this._PatentName.reset();
        this._PatentNumber.reset();
        this._PatentCountry.reset();
        this._patentType.reset();
        this._patentLawState.reset();
    }

    this._ValidatePatentName = function() {
        if (this._PatentName.getValue().trim().length == 0) {
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
    this._ValidatePatentNumber = function() {
        if (!this._PatentNumberValidater()) {
            Ext.Msg.show({
                title: '专利号错误',
                msg: '您输入的专利号不符合规则，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    //专利号验证器
    this._PatentNumberValidater = function() {
        //只有中国的验证
        if (this._PatentCountry.getValue() != '中国')
            return true;

        //专利号的长度必须是10位或者是14位
        var number = this._PatentNumber.getValue();
        if (number.length != 10 && number.length != 14)
            return false;
        //倒数第二位必须是'.'
        if (number.indexOf('.') != number.length - 2)
            return false;

        //验证最后一位
        var validater = 0;
        //专利号为10位的情况
        for (var i = 0; i <= 7; i++)
            validater += number.substr(i, 1) * (i + 2) - 0;
        //专利号为14为的情况
        if (number.length == 14)
            for (var i = 8; i <= 11; i++)
            validater += number.substr(i, 1) * (i - 6) - 0;

        return number.substr(number.length - 1, 1) == (validater % 11 == 10 ? 'X' : (validater % 11).toString());

    }

    this.isValid = function(preventMark) {
        var result = true;
        result = this._PatentName.isValid(preventMark) && result;
        result = this._PatentNumber.isValid(preventMark) && result;
        result = this._patentLawState.isValid(preventMark) && result;
        result = this._PatentCountry.isValid(preventMark) && result;
        result = this._patentType.isValid(preventMark) && result;

        result = this._ValidatePatentName() && result;
        result = this._ValidatePatentNumber() && result;

        return result;
    }
}
Ext.extend(Srims.patents.PatentEditWindow_BasicPanel_MustWrite, Ext.FormPanel);




