
if (!Srims.papers)
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperEditPanel_AbstractForm = function(liberalartspaper) {
this._paper = liberalartspaper;

this._KeyWord = new Ext.form.TextField({
        fieldLabel: '关键词',
        value: this._paper.get('keyWord'),
        width: 460
    });
    this._Mark = new Ext.form.TextField({
        fieldLabel: '标志',
        value: this._paper.get('mark'),
        width: 460
    });
    this._References = new Ext.form.TextArea({
        fieldLabel: '参考文献',
        value: this._paper.get('references'),
        Height: 300,
        width: 460
    });
    Srims.papers.LiberalArtsPaperEditPanel_AbstractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '摘要信息',
        Height: 400,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._KeyWord, this._Mark, this._References]
    });

    this.assginValues = function() {
    this._paper.set('keyWord', this._KeyWord.getValue());
    this._paper.set('mark', this._Mark.getValue());
    this._paper.set('references', this._References.getValue());
    }

    this.isValid = function(preventMark) {
        var result = true;
        return result;
    }
}
Ext.extend(Srims.papers.LiberalArtsPaperEditPanel_AbstractForm, Ext.form.FormPanel, {});
