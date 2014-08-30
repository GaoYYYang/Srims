
if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.XmlStore = Ext.extend(Ext.data.Store, {
    constructor: function(reader, load_url, params){
    
        if (params == undefined) 
            params = {};
        
        params.token = 'undefined';
        if (Srims.currentLoginLog) 
            params.token = Srims.currentLoginLog.token;
        this.params = params;
        
        Srims.data.XmlStore.superclass.constructor.call(this, {
        
            remoteSort: true,
            totalProperty: 'total',
            proxy: new Ext.data.HttpProxy(new Ext.data.Connection({
                url: load_url,
                method: 'POST',
                extraParams: params
            })),
            reader: reader
        });
    },
    getExtraParams: function(){
        return this.params;
    }
});
