if (!Srims.users) 
    Ext.namespace('Srims.users');

Srims.users.changePassword = function(){
    var id = 'ChangPassword';
    var window = Ext.getCmp(id);
	
    if (!window) {
        window = new Srims.users.ChangePasswordWindow(id);
    }
    window.show();
};

