
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.FundDescendDateTimeForm = function(){

    this._financeDateTimeBegin = new Ext.form.DateField({
        fieldLabel: '到账时间',
        width: 150
    });
    this._financeDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._descendDateTimeBegin = new Ext.form.DateField({
        fieldLabel: '下拨时间',
        width: 150
    });
    this._descendDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    
    Srims.statistic.DateTimeForm.superclass.constructor.call(this, {
        title: '时间范围',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: [this._financeDateTimeBegin, this._descendDateTimeBegin]
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: [this._financeDateTimeEnd, this._descendDateTimeEnd]
            })]
        })]
    });
    
    this.buildParams = function(params){
        params['FinanceDateTimeStart'] = Date.format(this._financeDateTimeBegin.getValue());
        params['FinanceDateTimeEnd'] = Date.format(this._financeDateTimeEnd.getValue());
        params['DescendDateTimeStart'] = Date.format(this._descendDateTimeBegin.getValue());
        params['DescendDateTimeEnd'] = Date.format(this._descendDateTimeEnd.getValue());
    }
    this.clearParams = function(){
        this._financeDateTimeBegin.reset();
        this._financeDateTimeEnd.reset();
        this._descendDateTimeBegin.reset();
        this._descendDateTimeEnd.reset();
    }
}

Ext.extend(Srims.statistic.FundDescendDateTimeForm, Ext.form.FormPanel);
