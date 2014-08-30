
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Statistic = function(){
    this._numberFieldAwardCountStart = new Ext.form.NumberField({
        fieldLabel: '奖励数目',
        width: 120
    });
    this._numberFieldAwardCountEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120
    });
    this._numberFieldPaperCountStart = new Ext.form.NumberField({
        fieldLabel: '论文总数',
        width: 120
    });
    this._numberFieldPaperCountEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120
    });
    this._NumberFieldPatentCountStart = new Ext.form.NumberField({
        fieldLabel: '专利总数',
        width: 120
    });
    this._NumberFieldPatentCountEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120
    });
    this._numberFieldProjectCountStart = new Ext.form.NumberField({
        fieldLabel: '项目数目',
        width: 120
    });
    this._numberFieldProjectCountEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        width: 120
    });
    this._numberFieldFundCountStart = new Srims.component.MoneyField({
        fieldLabel: '经费数额',
        width: 120
    });
    this._numberFieldFundCountEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120
    });
    this._checkboxIsFundTotalOrProjectCount = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '项目数目与经费数额是“或”的关系'
    });
    
    Srims.experts.ExpertQueryPanel_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '统计条件',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 230,
                items: [this._numberFieldProjectCountStart, this._numberFieldFundCountStart, this._numberFieldPaperCountStart, this._numberFieldAwardCountStart, this._NumberFieldPatentCountStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 20,
                width: 180,
                items: [this._numberFieldProjectCountEnd, this._numberFieldFundCountEnd, this._numberFieldPaperCountEnd, this._numberFieldAwardCountEnd, this._NumberFieldPatentCountEnd]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                width: 270,
                items: [this._checkboxIsFundTotalOrProjectCount]
            })]
        })]
    }))
    this.buildParams = function(params){
        params.awardCountStart = this._numberFieldAwardCountStart.getValue();
        params.awardCountEnd = this._numberFieldAwardCountEnd.getValue();
        params.paperCountStart = this._numberFieldPaperCountStart.getValue();
        params.paperCountEnd = this._numberFieldPaperCountEnd.getValue();
        params.patentCountStart = this._NumberFieldPatentCountStart.getValue();
        params.patentCountEnd = this._NumberFieldPatentCountEnd.getValue();
        params.projectCountStart = this._numberFieldProjectCountStart.getValue();
        params.projectCountEnd = this._numberFieldProjectCountEnd.getValue();
        params.fundCountStart = this._numberFieldFundCountStart.getMoney();
        params.fundCountEnd = this._numberFieldFundCountEnd.getMoney();
        params.isFundTotalOrProjectCount = this._checkboxIsFundTotalOrProjectCount.checked ? "true" : "";
    }
    this.clearParams = function(){
        this._numberFieldAwardCountStart.reset();
        this._numberFieldAwardCountEnd.reset();
        this._numberFieldPaperCountStart.reset();
        this._numberFieldPaperCountEnd.reset();
        this._NumberFieldPatentCountStart.reset();
        this._NumberFieldPatentCountEnd.reset();
        this._numberFieldProjectCountStart.reset();
        this._numberFieldProjectCountEnd.reset();
        this._numberFieldFundCountStart.reset();
        this._numberFieldFundCountEnd.reset();
        this._checkboxIsFundTotalOrProjectCount.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Statistic, Ext.Panel, {});
