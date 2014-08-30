
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Paper = function(){
    this._numberFieldOrderStart = new Ext.form.NumberField({
        fieldLabel: '作者位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        maxLength: 6,
        width: 120
    });
    this._numberFieldOrderEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        maxLength: 6,
        width: 120
    });
    this._checkBoxIsLinkMan = new Ext.form.Checkbox({
        fieldLabel: '是否通讯作者'
    });
    this._numberFieldInfluenceFactorStart = new Srims.component.ThousandPercentField({
        fieldLabel: '影响因子',
        maxLength: 6,
        width: 120
    });
    this._numberFieldInfluenceFactorEnd = new Srims.component.ThousandPercentField({
        fieldLabel: '至',
        maxLength: 6,
        width: 120
    });
    this._numberFieldPublishYearStart = new Ext.form.NumberField({
        fieldLabel: '发表年份',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 120
    });
    this._numberFieldPublishYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 120
    });
    this._checkboxGroupIndexed = new Srims.component.CheckBoxGroup({
        fieldLabel: '论文收录',
        cls: 'srims-checkboxGroup',
        columns: Srims.papers.paperIndexedTypeStore.length > 6 ? 5 : Srims.papers.paperIndexedTypeStore.length,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.paperIndexedTypeStore)
    });
    
    Srims.experts.ExpertQueryPanel_Paper.superclass.constructor.call(this, ({
        title: '论文',
        collapsible: true,
        autoHeight: true,
        frame: true,
        labelWidth: 60,
        layout: 'form',
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                labelWidth: 60,
                layout: 'form',
                items: [this._numberFieldOrderStart, this._numberFieldInfluenceFactorStart, this._numberFieldPublishYearStart]
            }), new Ext.Panel({
                width: 200,
                labelWidth: 20,
                layout: 'form',
                items: [this._numberFieldOrderEnd, this._numberFieldInfluenceFactorEnd, this._numberFieldPublishYearEnd]
            }), new Ext.Panel({
                width: 240,
                labelWidth: 80,
                layout: 'form',
                items: [this._checkBoxIsLinkMan]
            })]
        }), this._checkboxGroupIndexed]
    }))
    
    this.buildParams = function(params){
        params.authorOrderStart = this._numberFieldOrderStart.getValue();
        params.authorOrderEnd = this._numberFieldOrderEnd.getValue();
        params.isLinkMan = this._checkBoxIsLinkMan.checked ? "true" : "";
        params.influenceFactorStart = this._numberFieldInfluenceFactorStart.getValue();
        params.influenceFactorEnd = this._numberFieldInfluenceFactorEnd.getValue();
        params.publishYearStart = this._numberFieldPublishYearStart.getValue();
        params.publishYearEnd = this._numberFieldPublishYearEnd.getValue();
        params.paperIndexed = this._checkboxGroupIndexed.getSelecetedValue();
    }
    
    this.clearParams = function(){
        this._numberFieldOrderStart.reset();
        this._numberFieldOrderEnd.reset();
        this._checkBoxIsLinkMan.reset();
        this._numberFieldInfluenceFactorStart.reset();
        this._numberFieldInfluenceFactorEnd.reset();
        this._numberFieldPublishYearStart.reset();
        this._numberFieldPublishYearEnd.reset();
        this._checkboxGroupIndexed.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Paper, Ext.Panel, {});

