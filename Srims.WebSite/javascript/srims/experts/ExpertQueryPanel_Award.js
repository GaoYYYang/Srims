
if (!Srims.experts) 
    Ext.namespace('Srims.experts');
Srims.experts.ExpertQueryPanel_Award = function(){
    this._numberFieldAwardWinnerOderStart = new Ext.form.NumberField({
        fieldLabel: '获奖人位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 120
    });
    this._numberFieldAwardWinnerOderEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 120
    });
    this._numberFieldAwardYearStart = new Ext.form.NumberField({
        fieldLabel: '获奖年度',
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 120
    });
    this._numberFieldAwardYearEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 120
    });
    
    var awardRankItems = Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore.checkboxGroupItems;
    this._checkboxGroupAwardRank = new Srims.component.CheckBoxGroup({
        fieldLabel: '级别',
        cls: 'srims-checkboxGroup',
        columns: awardRankItems.length > 6 ? 5 : awardRankItems.length,
        items: awardRankItems
    });
    
    var awardClassItems = Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore.checkboxGroupItems;
    this._checkboxGroupClass = new Srims.component.CheckBoxGroup({
        fieldLabel: '等级',
        cls: 'srims-checkboxGroup',
        columns: awardClassItems.length > 6 ? 5 : awardClassItems.length,
        items: awardClassItems
    });
    
    var awardClassificationItems = Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore.checkboxGroupItems;
    this._checkboxGroupClassification = new Srims.component.CheckBoxGroup({
        fieldLabel: '奖种',
        cls: 'srims-checkboxGroup',
        columns: awardClassificationItems.length > 6 ? 5 : awardClassificationItems.length,
        items: awardClassificationItems
    });
    
    Srims.experts.ExpertQueryPanel_Award.superclass.constructor.call(this, ({
        collapsible: true,
        title: '奖励',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 70,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 220,
                labelWidth: 70,
                layout: 'form',
                items: [this._numberFieldAwardWinnerOderStart, this._numberFieldAwardYearStart]
            }), new Ext.Panel({
                width: 200,
                labelWidth: 20,
                layout: 'form',
                items: [this._numberFieldAwardWinnerOderEnd, this._numberFieldAwardYearEnd]
            })]
        }), this._checkboxGroupAwardRank, this._checkboxGroupClass, this._checkboxGroupClassification]
    }));
    
    this.buildParams = function(params){
        params.awardWinnerOderStart = this._numberFieldAwardWinnerOderStart.getValue();
        params.awardWinnerOderEnd = this._numberFieldAwardWinnerOderEnd.getValue();
        params.awardYearStart = this._numberFieldAwardYearStart.getValue();
        params.awardYearEnd = this._numberFieldAwardYearEnd.getValue();
        params.awardRank = this._checkboxGroupAwardRank.getSelecetedValue();
        params.awardClass = this._checkboxGroupClass.getSelecetedValue();
        params.awardClassification = this._checkboxGroupClassification.getSelecetedValue();
    }
    
    this.clearParams = function(){
        this._numberFieldAwardWinnerOderStart.reset();
        this._numberFieldAwardWinnerOderEnd.reset();
        this._numberFieldAwardYearStart.reset();
        this._numberFieldAwardYearEnd.reset();
        this._checkboxGroupAwardRank.reset();
        this._checkboxGroupClass.reset();
        this._checkboxGroupClassification.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Award, Ext.Panel, {});
