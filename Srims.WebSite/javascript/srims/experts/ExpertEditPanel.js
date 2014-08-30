
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertEditPanel = function(id, expert) {

    this._id = id;
    this._expert = expert;
    this._title = '新建专家';
    var isNew = expert.isNew();
    var emptyTextField = '';

    this._basicForm = new Srims.experts.ExpertEditPanel_Basic(expert, isNew);

    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        panel: this,
        handler: function() {
            var panel = this.panel;
            panel.clearParams();
        }
    });
    this._buttonCancel = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        panel: this,
        handler: function() {
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });
    Srims.experts.ExpertEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        buttonAlign: 'center',
        title: this._title,
        iconCls: 'icon-expert-new',
        items: [this._basicForm],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancel]
    });

    //method
    this.assignValues = function() {
        this._basicForm.assignValues();
    }
    this.clearParams = function() {
        this._basicForm.clearParams();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._basicForm.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var expert = this._expert;
        var isNew = true;

        expert.beginEdit();
        this.assignValues();
        expert.commit();
        expert.data.birthdayValue = expert.data.birthday.format("Y-m-d H:i:s");

        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/SaveAddExpert',
            params: expert.data,
            scope: this,
            success: function(response) {
                var expert = this._expert;
                delete expert.data.birthdayValue;
                Srims.WorkSpace.getWorkSpace().remove(this);

                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.experts.ExpertXmlReader()
                });               
                var newExpert = store.getAt(0);
                Srims.experts.ExpertAction.showExpert(newExpert, null);
            }
        });
    }
    this.validateNumberIsExist = function() {
        Ext.Ajax.request({
            url: Srims.service.experts.ExpertService + '/GetExpertWithSameNumber',
            params: {
                number: this._basicForm._textFieldNumber.getValue()
            },
            scope: this,
            success: function(response) {
                this._onValidateNumberIsExist(response, this);
            }
        });
    }
    this._onValidateNumberIsExist = function(response, panel) {
        if (parseInt(response.responseText) > 0) {
            Ext.MessageBox.confirm('职工号重复', '目前已存在该职工号，请重新输入！', function(buttonId) {
                if (buttonId == 'yes') {
                    this._buttonSave.setText('保 存');
                    this._buttonSave.enable();
                }
                else {
                    Srims.WorkSpace.getWorkSpace().remove(panel);
                }
            }, this);
        }
        else {
            this.save();
        }
    }
    //event
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;

        if (!panel.isValid(false, emptyTextField))
            return;

        button.setText('正在保存');
        button.disable();

        panel.validateNumberIsExist();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);

}
Ext.extend(Srims.experts.ExpertEditPanel, Ext.Panel, {});

