Ext.namespace('Money');

Money.render = function(v, withUnit) {
    if (Ext.type(v) != 'number')
        return undefined;
    var result = 0;
    if (v == 0)
        return result;
    if (v > 0) {
        result = Money._renderValue(v);
    }
    else {
        result = v / 1000000;
    }
    withUnit = withUnit == undefined ? true : withUnit;

    return withUnit ? result + '万' : result;
}
Money._renderValue = function(v){

    var result = v.toString();
    
    if (result.lastIndexOf('000000') != -1) 
        return result.slice(0, result.length - 6);
    
    var chars = [];
    if (result.length > 6) {
        var pointPosition = result.length - 6;
        for (var i = 0; i < result.length; i++) {
            if (chars.length == pointPosition) {
                chars[chars.length] = '.';
            }
            chars[chars.length] = result.charAt(i);
        }
    }
    else {
        chars[chars.length] = '0';
        chars[chars.length] = '.';
        
        var pointPosition = 6 - result.length;
        for (var i = 0; i < pointPosition; i++) {
            chars[chars.length] = '0';
        }
        
        for (var i = 0; i < result.length; i++) {
            chars[chars.length] = result.charAt(i);
        }
    }
    
    
    for (var i = chars.length - 1; i > 0; i--) {
        if (chars[i] == '0') 
            chars.pop();
        else 
            break;
    }
    return chars.join('');
}

Money.toMoney = function(v){

    if (Ext.type(parseFloat(v)) != 'number') 
        return undefined;
    
    if (v == 0) 
        return 0;
    
    return parseFloat(v).mul(100).mul(10000);
}
