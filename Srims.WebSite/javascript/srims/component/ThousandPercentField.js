
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.ThousandPercentField = Ext.extend(Ext.form.NumberField, {
    constructor: function(params){
        params.value = InfluenceFactor.render(params.value);
        params.allowNegative = false;
        params.decimalPrecision = 3;
        Srims.component.ThousandPercentField.superclass.constructor.call(this, params);
    },
    getValue: function(){
        var value = this.getRawValue();
        if (value == '' || value == undefined) 
            return '';
        
        return parseFloat(value).mul(1000);
    }
})

