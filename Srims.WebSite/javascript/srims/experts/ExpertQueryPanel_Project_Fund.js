
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Project_Fund = function(){
    this._textFieldFundFrom = new Ext.form.TextField({
        fieldLabel: '资金来源',
        width: 300
    });
    this._numberFieldFundContractStart = new Srims.component.MoneyField({
        fieldLabel: '合同额(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundTotalStart = new Srims.component.MoneyField({
        fieldLabel: '总额(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundTotalEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    
    Srims.experts.ExpertQueryPanel_Project_Fund.superclass.constructor.call(this, ({
        collapsible: true,
        title: '经费信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textFieldFundFrom, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 240,
                labelWidth: 80,
                items: [this._numberFieldFundContractStart, this._numberFieldFundTotalStart]
            }), new Ext.Panel({
                layout: 'form',
                width: 220,
                labelWidth: 20,
                items: [this._numberFieldFundContractEnd, this._numberFieldFundTotalEnd]
            })]
        })]
    }))
    
    this.buildParams = function(params){
        params.projectFundFrom = this._textFieldFundFrom.getValue();
        params.projectFundContractStart = this._numberFieldFundContractStart.getMoney();
        params.projectFundContractEnd = this._numberFieldFundContractEnd.getMoney();
        params.projectFundTotalStart = this._numberFieldFundTotalStart.getMoney();
        params.projectFundTotalEnd = this._numberFieldFundTotalEnd.getMoney();
    }
    
    this.clearParams = function(){
        this._textFieldFundFrom.reset();
        this._numberFieldFundContractStart.reset();
        this._numberFieldFundContractEnd.reset();
        this._numberFieldFundTotalStart.reset();
        this._numberFieldFundTotalEnd.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Project_Fund, Ext.Panel, {});
