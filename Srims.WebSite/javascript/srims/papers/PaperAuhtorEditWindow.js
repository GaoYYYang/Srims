
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperAuthorEditWindow = function(id, paperAuthor, paper, store, isExpert){

    this._id = id;
    this._paperAuthor = paperAuthor;
    this._paper = paper;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '作者姓名',
        width: 140,
        value: (isExpert && this._paperAuthor.get('expertID')) ? this._paperAuthor.get('name') : undefined,
        selectEntityId: isExpert ? this._paperAuthor.get('expertID') : undefined,
        allowBlank: false
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '作者姓名',
        value: this._paperAuthor.get('name'),
        allowBlank: false,
        width: 180
    });
    this._textFieldEnglishName = new Ext.form.TextField({
        fieldLabel: '英文名',
        value: this._paperAuthor.get('englishName'),
        width: 180
    });
    this._numberFieldOrder = new Ext.form.NumberField({
        fieldLabel: '位次',
        width: 80,
        value: this._paperAuthor.get('order'),
        maxValue: 100,
        minValue: 1,
        allowBlank: false,
        allowDecimals: false,
        allowNegative: false
    });
    this._checkBoxIsLinkMan = new Ext.form.Checkbox({
        fieldLabel: '是否通讯作者',
        checked: this._paperAuthor.get('isLinkMan')
    });
    var Items = [this._numberFieldOrder];
    if (isExpert) 
        Items[Items.length] = this._comboBoxExpert;
    else 
        Items[Items.length] = this._textFieldName;
    Items[Items.length] = this._textFieldEnglishName;
    Items[Items.length] = this._checkBoxIsLinkMan;
    
    Srims.papers.PaperAuthorEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: paperAuthor.isNew() ? '新建论文作者信息' : '编辑论文作者信息',
        iconCls: paperAuthor.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 200,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._validateOrderAndExpert = function(){
        var paperAuthors = this._store.getRange();
        var paperAuthorOrder = this._numberFieldOrder.getValue();
        var expertID = this._comboBoxExpert.getValue();
        
        for (var i = 0; i < paperAuthors.length; i++) {
            if (this._paperAuthor == paperAuthors[i]) 
                continue;
            
            if (paperAuthorOrder == paperAuthors[i].get('order')) {
                Ext.Msg.show({
                    title: '作者位次错误',
                    msg: '作者位次不能重复，请重新输入位次',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
            if (paperAuthors[i].get('expertID') && expertID == paperAuthors[i].get('expertID')) {
                Ext.Msg.show({
                    title: '专家错误',
                    msg: '该专家已经是这个论文的作者，请重新选择专家或手动编辑非专家作者',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                });
                return false;
            }
        }
        return true;
    }
    this._validateLinkMan = function(){
        var paperAuthors = this._store.getRange();
        if (this._checkBoxIsLinkMan.checked) {
            for (var i = 0; i < paperAuthors.length; i++) {
                if (this._paperAuthor == paperAuthors[i]) 
                    continue;
                if (paperAuthors[i].get('isLinkMan')) {
                    Ext.Msg.show({
                        title: '已有通讯作者',
                        msg: '通讯作者有且仅有一位',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                    this._checkBoxIsLinkMan.checked = false;
                    return false;
                }
            }
        }
        return true;
    }
    this.validTextField = function(textField){
        if (textField.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: textField.fieldLabel + '错误',
                msg: '您输入的值只有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
        
    }
    this._isValid = function(preventMark){
        var result = true;
        result = this._numberFieldOrder.isValid(preventMark) && result;
        if (isExpert) {
            result = this._comboBoxExpert.isValid(preventMark) && result;
            result = this._validateOrderAndExpert() && result;
        }
        else {
            result = this._textFieldName.isValid(preventMark) && result;
            result = this.validTextField(this._textFieldName) && result;
        }
        result = this._textFieldEnglishName.isValid(preventMark) && result;
        result = this._checkBoxIsLinkMan.isValid(preventMark) && result;
        
        result = this._validateLinkMan() && result;
        return result;
    }
    this._assignValues = function(){
        this._paperAuthor.set('expertID', this._comboBoxExpert.getValue());
        this._paperAuthor.set('name', this._textFieldName.getValue());
        this._paperAuthor.set('order', this._numberFieldOrder.getValue());
        this._paperAuthor.set('englishName', this._textFieldEnglishName.getValue());
        this._paperAuthor.set('isLinkMan', this._checkBoxIsLinkMan.checked ? "true" : "false");
        this._paperAuthor.set('paperID', this._paper.get('id'));
    }
    this._save = function(){
        var paperAuthor = this._paperAuthor;
        paperAuthor.beginEdit();
        this._assignValues();
        paperAuthor.commit();
        
        Ext.Ajax.request({
            url: Srims.service.papers.PaperAuthorService + '/Save',
            params: paperAuthor.data,
            scope: this,
            success: function(){
                this._store.load();
                var panelId = "PaperShowPanel_" + paper.get('id');
                if (Ext.getCmp(panelId)) 
                    Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                Srims.papers.showPaper(paper);
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.papers.PaperAuthorEditWindow, Ext.Window, {})
