
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperShowPanel_AbstractForm = function(paper) {
    this._paper = paper;

    this._KeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._paper.get('keyWord'),
        readOnly: true,
        width: 460
    });
    this._Mark = new Ext.form.TextField({
        fieldLabel: '标志',
        value: this._paper.get('mark'),
        readOnly: true,
        width: 460
    });
    this._References = new Ext.form.TextArea({
        fieldLabel: '参考文献',
        value: this._paper.get('references'),
        readOnly: true,
        Height: 300,
        width: 460
    });

    Srims.papers.LiberalArtsPaperShowPanel_AbstractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '摘要信息',
        Height: 320,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._KeyWord, this._Mark, this._References]
    });
}
Ext.extend(Srims.papers.LiberalArtsPaperShowPanel_AbstractForm, Ext.form.FormPanel, {});
