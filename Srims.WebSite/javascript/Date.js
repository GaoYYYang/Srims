Date.render = function(v){
    if (v == undefined || v == null || Ext.type(v.format) != 'function') 
        return null;
    
    return v.format('Y年m月d日')
}
Date.renderAsAge = function(value){
    if (value == '' || value == undefined) 
        return '';
    
    var today = new Date();
    var year = today.getFullYear();
    
    return (year - value) + '年' + '1月1日';
}
Date.format = function(value){
    if (value == '' || value == undefined) 
        return '';
    
    return value.format("Y-m-d H:i:s");
}
