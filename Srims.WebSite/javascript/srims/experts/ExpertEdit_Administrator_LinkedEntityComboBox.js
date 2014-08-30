
if (!Srims.experts) 
    Ext.namespace("Srims.experts");

Srims.experts.ExpertEdit_Administrator_LinkedEntityComboBox = function(id, expert, panel, item){
    this._id = id;
    this._expert = expert;
    this._panel = panel;
    this._item = item;
    
    this._fieldNewValueFirst = new Srims.component.EntityComboBox({
        fieldLabel: item[3][0].fieldLabel,
        store: new Srims.common.SubjectFirstLevelStoreForApply(),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        width: 300
    });
    this._fieldNewValueSecond = new Srims.component.EntityComboBox({
        fieldLabel: item[3][1].fieldLabel,
        store: new Srims.common.SubjectSecondLevelStoreForApply(),
        displayField: 'name',
        emptyText: '请选择',
        editable: true,
        triggerAction: 'all',
        mode: 'local',
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
    
    Srims.experts.ExpertEdit_Administrator_LinkedEntityComboBox.superclass.constructor.call(this, {
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
        items: [this._fieldNewValueFirst, this._fieldNewValueSecond],
        buttons: [this._buttonSave, this._buttonCancle]
    });
    
    this.clearParams = function(){
        this._fieldNewValueFirst.reset();
        this._fieldNewValueSecond.disable();
        this._fieldNewValueSecond.setValue(undefined);
        this._fieldNewValueSecond.store.removeAll();
    }
    
    this.isValid = function(preventMark, item){
        var result = true;
        result = this._fieldNewValueFirst.isValid(preventMark) && result;
        result = this._fieldNewValueSecond.isValid(preventMark) && result;
        return result;
    }
    
    //学科的级联选择
    this._fieldNewValueFirst.comboBoxSecondLevelSubject = this._fieldNewValueSecond;
    var idLable = item[3];
    if (expert.get(idLable) != undefined && expert.get(idLable) != '') {
        this._fieldNewValueSecond.store.load({
            params: {
                firstLevelSubjectId: expert.get(idLable)
            }
        });
    }
    else 
        this._fieldNewValueSecond.disable();
    this._fieldNewValueFirst.comboBoxSecondLevelSubject = this._fieldNewValueSecond;
    //处理学科的联动
    this.onComboBoxFirstLevelSubject_Select = function(comboBox){
        var firstLevelSubjectId = comboBox.getValue();
        var comboBoxSecondLevelSubject = comboBox.comboBoxSecondLevelSubject;
        if (firstLevelSubjectId == undefined) {
            return;
        }
        comboBoxSecondLevelSubject.enable();
        comboBoxSecondLevelSubject.setValue(undefined);
        comboBoxSecondLevelSubject.store.load({
            params: {
                firstLevelSubjectId: firstLevelSubjectId
            }
        });
    }
    //处理一级学科为空的情况
    this.onComboBoxFirstLevelSubject_Change = function(comboBox){
        var firstLevelSubjectId = comboBox.getValue();
        var comboBoxSecondLevelSubject = comboBox.comboBoxSecondLevelSubject;
        if (firstLevelSubjectId != undefined) {
            return;
        }
        comboBoxSecondLevelSubject.disable();
        comboBoxSecondLevelSubject.setValue(undefined);
        comboBoxSecondLevelSubject.store.removeAll();
    }
    this._fieldNewValueFirst.on('select', this.onComboBoxFirstLevelSubject_Select);
    this._fieldNewValueFirst.on('change', this.onComboBoxFirstLevelSubject_Change);
    
    //保存
    this.save = function(){
        var expert = this._expert;
        var isNew = false;
        var item = this._item;
        var showPanel = this._panel;
        var showValue1 = this._fieldNewValueFirst.getText();
        var showValue2 = this._fieldNewValueSecond.getText();
        
        var data = {};
        data[item[3][2]] = this._fieldNewValueSecond.getText();
        data[item[3][3]] = this._fieldNewValueSecond.getValue();
        data['paramID'] = item[3][3];
        data['paramName'] = item[3][2];
        data['expertID'] = expert.get('id');
        data['field'] = 'LinkEntityCB';
        
        expert.beginEdit();
        expert.commit();
        
        Ext.Ajax.request({
        url: Srims.service.experts.ExpertService + '/SaveEditExpert',
            params: data,
            scope: this,
            success: function(response){
                //编辑完，列表刷新，列表刷新
                item[3][0].getEl().dom.value = showValue1;
                item[3][1].getEl().dom.value = showValue2;
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
    
    
    
    
}

Ext.extend(Srims.experts.ExpertEdit_Administrator_LinkedEntityComboBox, Ext.Window);

