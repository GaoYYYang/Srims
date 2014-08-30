
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SubjectFirstLevelEditWindow = function(id, subjectfirstlevel, store){

    this._id = id;
    this._subjectfirstlevel = subjectfirstlevel;
    this._title = subjectfirstlevel.isNew() ? '新建一级学科' : subjectfirstlevel.get('name');
    this._store = store;
    
    this._textFieldFirstLevelTitle = new Ext.form.TextField({
        fieldLabel: '一级学科名称',
        value: subjectfirstlevel.get('name'),
        allowBlank: false,
        width: 160
    });
    this._textFieldFirstLevelCode = new Ext.form.NumberField({
        fieldLabel: '一级学科代码',
		maxLength : '3',
        value: subjectfirstlevel.get('code'),
        allowBlank: false,
        width: 160
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
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
    Srims.common.SubjectFirstLevelEditWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 300,
        height: 160,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls: subjectfirstlevel.isNew() ? 'icon-subject-firstLevel-new' : 'icon-subject-firstLevel-edit',
        resizable: false,
        modal: true,
        items: [this._textFieldFirstLevelTitle, this._textFieldFirstLevelCode],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function(){
        this._subjectfirstlevel.set('name', this._textFieldFirstLevelTitle.getValue());
        this._subjectfirstlevel.set('code', this._textFieldFirstLevelCode.getValue());
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldFirstLevelTitle.isValid(preventMark) && result;
        result = this._textFieldFirstLevelCode.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var subjectfirstlevel = this._subjectfirstlevel;
        subjectfirstlevel.beginEdit();
        this.assignValues();
        subjectfirstlevel.commit();
        
        Ext.Ajax.request({
            url: Srims.service.common.SubjectService + '/SaveFirstLevel',
            params: subjectfirstlevel.data,
            scope: this,
            success: function(){
                this.close();
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        Ext.Ajax.request({
            url: Srims.service.common.SubjectService + '/IsSubjectFirstLevelNameExist',
            params: {
                name: window._textFieldFirstLevelTitle.getValue(),
                subjectFirstLevelID: window._subjectfirstlevel.get('id') == undefined ? '' : window._subjectfirstlevel.get('id')
            },
            success: function(response){
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.Msg.show({
                        title: '一级学科名称已经被占用',
                        msg: '一级学科名称不能重复，请重新输入',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    Ext.Ajax.request({
                        url: Srims.service.common.SubjectService + '/IsSubjectFirstLevelCodeExist',
                        params: {
                            code: window._textFieldFirstLevelCode.getValue(),
                            subjectFirstLevelID: window._subjectfirstlevel.get('id') == undefined ? '' : window._subjectfirstlevel.get('id')
                        },
                        success: function(response){
                            if (Boolean.toBoolean(response.responseText)) {
                                Ext.Msg.show({
                                    title: '一级学科代码已经被占用',
                                    msg: '一级学科代码不能重复，请重新输入',
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
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.SubjectFirstLevelEditWindow, Ext.Window);
