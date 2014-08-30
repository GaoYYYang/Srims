
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

//我的成果查看
 Srims.experts.myAchieveView = function(){
    var id = 'MyAchieveViewWindow';
    var window = Ext.getCmp(id);
    	
    if (!window) {  
        window = new Srims.experts.MyAchieveViewWindow(id);	
    }
    window.show();
};