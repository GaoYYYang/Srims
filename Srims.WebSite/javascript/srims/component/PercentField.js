
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.PercentField = Ext.extend(Ext.form.NumberField, {
    constructor: function(params){
        params.value = ExpenseRate.render(params.value);
        params.allowNegative = false;
        params.decimalPrecision = 2;
        Srims.component.PercentField.superclass.constructor.call(this, params);
    },
    getValue: function(){
        var value = this.getRawValue();
        if (value == '' || value == undefined) 
            return '';
        
        return parseFloat(value).mul(100);
    }
})
