
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperShowPanel_AbstractForm = function(paper){
    this._paper = paper;
    
    this._abstract = new Ext.form.TextArea({
        fieldLabel: '摘要',
        value: this._paper.get('abstract'),
        readOnly: true,
        width: 460
    });
    
    Srims.papers.PaperShowPanel_AbstractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '摘要信息',
        Height: 320,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._abstract]
    });
}
Ext.extend(Srims.papers.PaperShowPanel_AbstractForm, Ext.form.FormPanel, {});
