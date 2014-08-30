
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentShowPanel_IntroductionForm = function(patent) {
    this._patent = patent;

    this._textContent = new Ext.form.TextArea({
        fieldLabel: '简介',
        hideLabel: true,
        scroll: true,
        value: patent.get('introduction'),
        readOnly: true,
        height: 120,
        width: 850
    });

    Srims.patents.PatentShowPanel_IntroductionForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '简介',
        autoHeight: true,
        frame: true,
        labelWidth: 50,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom:2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textContent]
    });
}
Ext.extend(Srims.patents.PatentShowPanel_IntroductionForm, Ext.form.FormPanel, {});










