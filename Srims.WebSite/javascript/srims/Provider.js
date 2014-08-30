Srims.Provider = Ext.extend(Ext.state.Provider, {
    _state: new function(){
    },
    get: function(name, defaultValue){
        //alert('get:' + name + ' : ' + this._state[name]);
        //return defaultValue;
        
        if (this._state[name]) 
            return Ext.util.JSON.decode(this._state[name]);
        
        return defaultValue;
    },
    set: function(name, value){
        //alert('set:' + name + ' ' + Ext.util.JSON.encode(value));
        var valueString = Ext.util.JSON.encode(value)
        this._state[name] = valueString;
        
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/SetExtClientState',
            method: 'POST',
            params: {
                key: name,
                value: valueString
            }
        });
    },
    clear: function(name){
        this._state[name] = undefined;
    },
    loadState: function(callback){
        this.callback = callback;
        Ext.Ajax.request({
            url: Srims.service.users.UserService + '/GetExtClientState',
            method: 'POST',
            success: this._onLoadState,
            scope: this
        });
    },
    _onLoadState: function(response){
    
        var rootNode = Ext.DomQuery.selectNode('/ExtClientState', response.responseXML);
        var nodes = Ext.DomQuery.select('*', rootNode);
        
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            this._state[node.tagName] = Ext.DomQuery.selectValue('/', node);
            //alert(node.tagName + Srims.provider._state[node.tagName]);
        }
        
        this.callback();
    }
});
Srims.Provider.instance = new Srims.Provider();
Ext.state.Manager.setProvider(Srims.Provider.instance);
