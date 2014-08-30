
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperEditPanel_OtherBasicForm = function(paper){

    this._paper = paper;
    var emailExpr = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    
    this._textFieldlinkManEmail = new Ext.form.TextField({
        fieldLabel: '通讯作者Email',
        value: this._paper.get('linkManEmail'),
        regex: emailExpr,
        regexText: '邮箱格式有误，请重新输入',
        width: 460
    });
    this._textFieldlinkManAddress = new Ext.form.TextField({
        fieldLabel: '作者地址',
        value: this._paper.get('linkManAddress'),
        width: 460
    });
    this._textFieldAuthorkeyWord = new Ext.form.TextField({
        fieldLabel: '作者关键词',
        value: this._paper.get('authorKeyWord'),
        width: 460
    });
    this._textFieldkeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._paper.get('keyWord'),
        width: 460
    });
    this._textFieldremark = new Ext.form.TextField({
        fieldLabel: '备注',
        value: this._paper.get('remark'),
        width: 460
    });
    
    Srims.papers.PaperEditPanel_OtherBasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '其他基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldlinkManAddress, this._textFieldlinkManEmail, this._textFieldAuthorkeyWord, this._textFieldkeyWord, this._textFieldremark]
    });
    
    this.assginValues = function(){
        this._paper.set('linkManEmail', this._textFieldlinkManEmail.getValue());
        this._paper.set('linkManAddress', this._textFieldlinkManAddress.getValue());
        this._paper.set('authorKeyWord', this._textFieldAuthorkeyWord.getValue());
        this._paper.set('keyWord', this._textFieldkeyWord.getValue());
        this._paper.set('remark', this._textFieldremark.getValue());
    }
    
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._textFieldlinkManEmail.isValid(preventMark) && result;
        result = this._textFieldlinkManAddress.isValid(preventMark) && result;
        result = this._textFieldAuthorkeyWord.isValid(preventMark) && result;
        result = this._textFieldkeyWord.isValid(preventMark) && result;
        result = this._textFieldremark.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.papers.PaperEditPanel_OtherBasicForm, Ext.form.FormPanel, {});
