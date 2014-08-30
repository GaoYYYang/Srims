
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_OtherBasicForm = function(paper){

    this._paper = paper;
    
    this._linkMan = new Ext.form.Field({
        fieldLabel: '通讯作者',
        value: this._paper.get('linkManName'),
        readOnly: true,
        width: 460
    });
    this._linkManEmail = new Ext.form.Field({
        fieldLabel: '通讯作者Email',
        value: this._paper.get('linkManEmail'),
        readOnly: true,
        width: 460
    });
    this._linkManAddress = new Ext.form.Field({
        fieldLabel: '作者地址',
        value: this._paper.get('linkManAddress'),
        readOnly: true,
        width: 460
    });
    this._keyWord = new Ext.form.Field({
        fieldLabel: '关键词',
        value: this._paper.get('keyWord'),
        readOnly: true,
        width: 460
    });
    this._remark = new Ext.form.Field({
        fieldLabel: '备注',
        value: this._paper.get('remark'),
        readOnly: true,
        width: 460
    });
    
    Srims.papers.PaperShowPanel_OtherBasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '其他基本信息',
        Height: 500,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._linkManAddress, this._linkMan, this._linkManEmail, this._keyWord, this._remark]
    });
}
Ext.extend(Srims.papers.PaperShowPanel_OtherBasicForm, Ext.form.FormPanel, {});

