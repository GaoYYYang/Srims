
if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_NoticeTextComboBox = function(id, expert, panel, item) {
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;

    this._fieldNewValue = new Srims.component.NoticeTextComboBox({
        fieldLabel: item[0].fieldLabel,
        allowBlank: true,
        emptyText: '请选择',
        noticeTextType: item[4],
        displayField: 'value',
        editable: true,
        triggerAction: 'all',
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

    Srims.experts.ExpertEdit_Administrator_NoticeTextComboBox.superclass.constructor.call(this, {
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
        return result;
    }
    this.save = function() {
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue = this._fieldNewValue.getValue();
        var data = {};
        data['expertID'] = expert.get('id');
        data[item[3]] = newValue;
        data['NoticeTextCBox'] = newValue;
        data['field'] = 'NoticeTextCBox';
        data['paramName'] = item[3];

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

Ext.extend(Srims.experts.ExpertEdit_Administrator_NoticeTextComboBox, Ext.Window);

