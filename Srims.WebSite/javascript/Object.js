Ext.namespace('Object');

Object.clone = function(newObject, cloneObjects){
    for (var i = 0; i < cloneObjects.length; i++) {
        var cloneObject = cloneObjects[i];
        for (var param in cloneObject) 
            newObject[param] = cloneObject[param];
    }
}
