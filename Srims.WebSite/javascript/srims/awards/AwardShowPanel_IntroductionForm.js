
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardShowPanel_IntroductionForm = function(award) {
    this._award = award;

    this._textContent = new Ext.form.TextArea({
        fieldLabel: '简介',
        hideLabel: true,
        scroll: true,
        value: award.get('introduction'),
        readOnly: true,
        height: 220,
        width: 850
    });

    Srims.awards.AwardShowPanel_IntroductionForm.superclass.constructor.call(this, {
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
Ext.extend(Srims.awards.AwardShowPanel_IntroductionForm, Ext.form.FormPanel, {});