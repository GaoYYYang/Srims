
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.DateTimeForm = function(title, paramName){

    this._title = title;
    this._paramName = paramName;
    
    this._dateTimeBegin = new Ext.form.DateField({
        fieldLabel: '时间',
        width: 150
    });
    this._dateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    
    Srims.statistic.DateTimeForm.superclass.constructor.call(this, {
        title: this._title,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: this._dateTimeBegin
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: this._dateTimeEnd
            })]
        })]
    });
    
    this.buildParams = function(params){
        params[this._paramName + 'Start'] = Date.format(this._dateTimeBegin.getValue());
        params[this._paramName + 'End'] = Date.format(this._dateTimeEnd.getValue());
    }
    this.clearParams = function(){
        this._dateTimeBegin.reset();
        this._dateTimeEnd.reset();
    }
}

Ext.extend(Srims.statistic.DateTimeForm, Ext.form.FormPanel);
