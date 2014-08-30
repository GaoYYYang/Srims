Ext.namespace('Array');

Array.itemIsExistInArray = function(array, item){
    if (array == undefined || array == null || array.length == 0) 
        return false;
    
    for (var i = 0; i < array.length; i++) {
        if (array[i] == item) 
            return true;
    }
    return false;
}
