
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.submitResource = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){
    var user = Srims.currentLoginLog.user;
    
    window.formPanel.getForm().submit({
        params: saveParams,
        url: Srims.service.ResourceService + '/IsSizeable',
        failure: function(){
            if (user.userRoleType == 'Administrator' && user.isSuper) {
                Ext.MessageBox.confirm('上传文件大于100M', '上传文件大于20M，你确定要上传文件吗？', function(buttonId){
                    if (buttonId == 'yes') 
                        Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
                }, this);
            }
            else 
                Ext.Msg.show({
                    title: '不能上传文件',
                    msg: '每个文件不能大于100M，请联系超级管理员上传大于20M的文件。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
        },
        success: function(form, action){
            Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
        }
        
    });
}
Srims.documents.submitResources = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){

    window.formPanel.getForm().submit({
        params: saveParams,
        url: requestUrl,
        waitMsg: waitMsg,
        method: 'post',
        success: function(form, action){
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            if (window.store) 
                window.store.load();
            
            window.close();
        }
    });
    
}
Srims.documents.deleteResource = function(documentGuid, id, url, store, msg, msgInfo){
    var _params = {
        guid: documentGuid,
        id: id
    }
    Ext.Ajax.request({
        url: url,
        params: _params,
        success: function(){
            store.load();
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    });
}

Srims.documents.downLoadResource = function(guid, subUrl){
    var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1
    
    document.location.href = '/Service/Resource.asmx' + subUrl + '?guid=' + guid + '&isIE=' + isIE;
}


