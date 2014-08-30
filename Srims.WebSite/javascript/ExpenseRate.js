Ext.namespace("ExpenseRate");

ExpenseRate.render = function(value){
    if (value == 0) 
        return 0;
    
    if (value == '' || value == undefined) 
        return 0;
    
    return value / 100;
}
