
if (!Srims.experts) 
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_LanguageNoticeTextComboBox = function(id, expert, panel, item){
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;
    
    this._fieldNewValue = new Srims.component.NoticeTextComboBox({
        fieldLabel: item[0].fieldLabel,
        noticeTextType: 'ForeignLanguage',
        emptyText: '请选择',
        displayField: 'value',
        triggerAction: 'all',
        editable: true,
        width: 300
    });
    this._fieldNewValueLevel = new Srims.component.NoticeTextComboBox({
        fieldLabel: item[4][1].fieldLabel,
        noticeTextType: 'LanguageLevel',
        emptyText: '请选择',
        displayField: 'value',
        triggerAction: 'all',
        editable: true,
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
        handler: function(){
            var window = this.window;
            window.clearParams();
            window.close();
        }
    });
    
    Srims.experts.ExpertEdit_Administrator_LanguageNoticeTextComboBox.superclass.constructor.call(this, {
        title: '编辑专家信息——' + this._expert.get('name'),
        iconCls: 'icon-edit',
        width: 500,
        labelWidth: 120,
        height: 185,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._fieldNewValue, this._fieldNewValueLevel],
        buttons: [this._buttonSave, this._buttonCancle]
    });
    
    this.assignValues = function(){
    }
    this.clearParams = function(){
        this._fieldNewValue.reset();
        this._fieldNewValueLevel.disable();
        this._fieldNewValueLevel.setValue(undefined);
    }
    
    this.isValid = function(preventMark, item){
        var result = true;
        result = this._fieldNewValue.isValid(preventMark) && result;
        result = this._fieldNewValueLevel.isValid(preventMark) && result;
        return result;
    }
    
    //保存
    this.save = function(){
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var newValue1 = this._fieldNewValue.getValue();
        var newValue2 = this._fieldNewValueLevel.getValue();
        var data = {};
        data[item[4][2]] = newValue1;
        data[item[4][3]] = newValue2;
        data['language'] = item[4][2];
        data['level'] = item[4][3];
        data['expertID'] = expert.get('id');
        data['field'] = 'LanguageNoticeTextCB';
        //data['paramName'] = item[3];
        
        expert.beginEdit();
        this.assignValues();
        expert.commit();
        
        Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response){
                //编辑完，列表刷新，列表刷新
                item[4][0].getEl().dom.value = newValue1;
                item[4][1].getEl().dom.value = newValue2;
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        });
    }
    
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        var item = button.item;
        if (!window.isValid(false, item)) 
            return;
        button.setText('正在保存');
        button.disable();
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
    this._fieldNewValue.languageLevel = this._fieldNewValueLevel;
    
    if (this._fieldNewValue.getValue() != null && this._fieldNewValue.getValue() != undefined && this._fieldNewValue.getValue() != '') 
        this._fieldNewValueLevel.setVisible(true);
    this._fieldNewValueLevel.disable();
    //select event
    this._onFieldNewValue_select = function(comboBox){
        var language = comboBox.getValue();
        var level = comboBox.languageLevel;
        if (language == undefined) 
            return;
        level.enable();
        level.setValue(undefined);
    }
    this._fieldNewValue.on('select', this._onFieldNewValue_select);
    //change event
    this._onFieldNewValue_change = function(comboBox){
        var language = comboBox.getValue();
        var level = comboBox.languageLevel;
        if (language != undefined) 
            return;
        level.disable();
        level.setValue(undefined);
    }
    this._fieldNewValue.on('change', this._onFieldNewValue_change);
}

Ext.extend(Srims.experts.ExpertEdit_Administrator_LanguageNoticeTextComboBox, Ext.Window);

