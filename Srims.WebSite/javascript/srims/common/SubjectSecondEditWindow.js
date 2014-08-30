
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectSecondEditWindow = function(id, subjectsecondlevel, store){

    this._id = id;
    this._subjectsecondlevel = subjectsecondlevel;
    this._title = subjectsecondlevel.isNew() ? '新建二级学科' : subjectsecondlevel.get('name');
    this._store = store;
    
    this._comboBoxFirstLevelSubject = new Srims.component.EntityComboBox({
        fieldLabel: '一级学科名称',
        store: new Srims.common.SubjectFirstLevelStoreForApply(),
        displayField: 'name',
        value: subjectsecondlevel.get('subjectFirstLevelName'),
        entityId: subjectsecondlevel.get('subjectFirstLevelId'),
        triggerAction: 'all',
        allowBlank: false,
        width: 160
    });
    this._textFieldSecondLevelTitle = new Ext.form.TextField({
        fieldLabel: '二级学科名称',
        value: this._subjectsecondlevel.get('name'),
        allowBlank: false,
        width: 160
    });
    
    this._textFieldSecondLevelCode = new Ext.form.TextField({
        fieldLabel: '二级学科代码',
        readOnly: true,
        value: subjectsecondlevel.isNew() ? this._subjectsecondlevel.get('code') : this._subjectsecondlevel.get('code').substring(0, 3),
        allowBlank: false,
        width: 55
    });
    this._textFieldSecondLevelCodeChildCode = new Ext.form.NumberField({
        fieldLabel: '二级学科子代码',
        hideLabel: true,
		maxLength:'2',
        value: this._subjectsecondlevel.get('childCode'),
        allowBlank: false,
        width: 100
    });
    this._subjectCode = new Ext.Panel({
        layout: 'column',
        labelWidth: 200,
        items: [new Ext.Panel({
            width: 165,
            layout: 'form',
            items: this._textFieldSecondLevelCode
        }), new Ext.Panel({
            width: 125,
            layout: 'form',
            items: this._textFieldSecondLevelCodeChildCode
        })]
    })
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保存',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    Srims.common.SubjectSecondEditWindow.superclass.constructor.call(this, {
        id: id,
        bodyStyle: 'padding:10px 10px 0',
        width: 350,
        height: 180,
        labelWidth: 85,
        deferredRender: false,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        modal: true,
        iconCls: subjectsecondlevel.isNew() ? 'icon-subject-secondlevel-new' : 'icon-subject-secondlevel-edit',
        resizable: false,
        items: [new Ext.Panel({
            frame: true,
            layout: 'form',
            items: [this._comboBoxFirstLevelSubject, this._textFieldSecondLevelTitle, this._subjectCode]
        })],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function(){
        this._subjectsecondlevel.set('firstLevelSubjectName', this._comboBoxFirstLevelSubject.getValue());
        this._subjectsecondlevel.set('subjectFirstLevelId', this._comboBoxFirstLevelSubject.getValue());
        this._subjectsecondlevel.set('name', this._textFieldSecondLevelTitle.getValue());
        this._subjectsecondlevel.set('childCode', this._textFieldSecondLevelCodeChildCode.getValue());
        this._subjectsecondlevel.set('code', this._textFieldSecondLevelCode.getValue());
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._comboBoxFirstLevelSubject.isValid(preventMark) && result;
        result = this._textFieldSecondLevelTitle.isValid(preventMark) && result;
        result = this._textFieldSecondLevelCode.isValid(preventMark) && result;
        result = this._textFieldSecondLevelCodeChildCode.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var subjectsecondlevel = this._subjectsecondlevel;
        subjectsecondlevel.beginEdit();
        this.assignValues();
        subjectsecondlevel.commit();
        
        Ext.Ajax.request({
            url: Srims.service.common.SubjectService + '/SaveSecondLevel',
            params: subjectsecondlevel.data,
            scope: this,
            success: function(){
                this.close();
            }
        })
    }
    //initial
    this._comboBoxFirstLevelSubject.textFieldSecondLevelCode = this._textFieldSecondLevelCode;
    //event method
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        if (!window.isValid(false)) 
            return;
        
        Ext.Ajax.request({
            url: Srims.service.common.SubjectService + '/IsSubjectSecondLevelNameExist',
            params: {
                name: window._textFieldSecondLevelTitle.getValue(),
                subjectSecondLevelID: window._subjectsecondlevel.get('id') == undefined ? '' : window._subjectsecondlevel.get('id')
            },
            success: function(response){
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.Msg.show({
                        title: '二级学科名称已经被占用',
                        msg: '二级学科名称不能重复，请重新输入',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    Ext.Ajax.request({
                        url: Srims.service.common.SubjectService + '/IsSubjectSecondLevelCodeExist',
                        params: {
                            code: window._textFieldSecondLevelCode.getValue() + window._textFieldSecondLevelCodeChildCode.getValue(),
                            subjectSecondLevelID: window._subjectsecondlevel.get('id') == undefined ? '' : window._subjectsecondlevel.get('id')
                        },
                        success: function(response){
                            if (Boolean.toBoolean(response.responseText)) {
                                Ext.Msg.show({
                                    title: '二级学科代码已经被占用',
                                    msg: '二级学科代码不能重复，请重新输入',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                            else {
                                button.setText('正在保存');
                                button.disable();
                                
                                window.save();
                                window._store.load();
                            }
                        }
                    })
                }
            }
        })
    }
    this._onComboBoxFirstLevelSubject_Select = function(){
        this.textFieldSecondLevelCode.setValue(this.getEntity().get('code'));
    }
    //event
    this._buttonSave.on('click', this._onButtonSave_Click);
    this._comboBoxFirstLevelSubject.on('select', this._onComboBoxFirstLevelSubject_Select);
}
Ext.extend(Srims.common.SubjectSecondEditWindow, Ext.Window);
