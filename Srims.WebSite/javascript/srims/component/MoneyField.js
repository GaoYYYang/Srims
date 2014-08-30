
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.MoneyField = function(params){
    params.value = Money.render(params.value, false);
    params.allowNegative = false;
    params.decimalPrecision = 6;
    params.maxValue = 99999;
    
    Srims.component.MoneyField.superclass.constructor.call(this, params);
}
Ext.extend(Srims.component.MoneyField, Ext.form.NumberField, {
    getMoney: function(){
        var value = this.getRawValue();
        if (value == '' || value == undefined) 
            return '';
        
        return parseFloat(value).mul(100).mul(10000);
    }
});
