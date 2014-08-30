
if (!Srims.experts)
    Ext.namespace('Srims.experts');

//获得帮助
Srims.experts.getHelp = function() {
    var id = 'GetHelpWindow';
    window.open('http://211.64.142.67/kjc/jigou.asp?catid=a00010008', '_blank');
    //    var window = Ext.getCmp(id);
    //    
    //    if (!window) {
    //        window = new Srims.experts.GetHelpWindow(id);
    //    }
    //    window.show();
};
