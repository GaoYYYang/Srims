String.isEmpty = function(str){
    return str == undefined || str == null || String.Trim(str).length == 0;
}
String.LTrim = function(str){
    for (var i = 0; i < str.length; i++) 
        if (str.charAt(i) != ' ') 
            break;
    
    str = str.substring(i, str.length);
    return str;
}
String.RTrim = function(str){
    for (var i = str.length - 1; i >= 0; i--) 
        if (str.charAt(i) != " ") 
            break;
    
    str = str.substring(0, i + 1);
    return str;
}
String.Trim = function(str){
    return String.LTrim(String.RTrim(str));
}
