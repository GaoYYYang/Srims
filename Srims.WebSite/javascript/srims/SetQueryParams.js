Srims.SetQueryParams = new function(){

}
Srims.SetQueryParams.removeNullparams = function(queryParams){
    for (var q in queryParams) {
        queryParams[q] = queryParams[q].toString().trim();
        if (queryParams[q] == '' || queryParams[q] == undefined || queryParams[q] == null) 
            queryParams[q] = null;
    }
}
Srims.SetQueryParams.clearParams = function(queryParams, noClearParams){
    for (var q in queryParams) 
        if (!Array.itemIsExistInArray(noClearParams, q)) {
            queryParams[q] = null;
        }
}
Srims.SetQueryParams.toJSON = function(queryParams){
    Srims.SetQueryParams.removeNullparams(queryParams);
    
    var queryParamsJSON = '{';
    for (var q in queryParams) {
        if (queryParams[q] != null && q != 'token') 
            queryParamsJSON += q + ':\'' + queryParams[q] + '\',';
    }
    
    if (queryParamsJSON.length > 1) 
        queryParamsJSON = queryParamsJSON.substring(0, queryParamsJSON.length - 1);
    queryParamsJSON += '}';
    
    return queryParamsJSON;
}
