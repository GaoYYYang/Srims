Ext.namespace("InfluenceFactor");

InfluenceFactor.render = function(value){
    if (value == '' || value == undefined) 
        return '';
    
    return value / 1000;
}
