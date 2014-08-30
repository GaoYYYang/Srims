
if (Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.GetHelpWindow = function(id){

    this._id = id;
    this._title = '获得帮助-科技处管理机构信息';
    
    this._basicPanel = new Srims.experts.GetHelpWindow_BasicPanel();
    this._basicPanelPlan = new Srims.experts.GetHelpWindow_BasicPanelPlan();
    this._basicPanelBase = new Srims.experts.GetHelpWindow_BasicPanelBase();
    this._basicPanelexploit = new Srims.experts.GetHelpWindow_BasicPanelexploit();
    this._basicPanelAchieve = new Srims.experts.GetHelpWindow_BasicPanelAchieve();
    this._basicPanelImp = new Srims.experts.GetHelpWindow_BasicPanelImportSpecial();
    this._basicPanelScience = new Srims.experts.GetHelpWindow_BasicPanelScience();
    
    
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    Srims.experts.GetHelpWindow_BasicPanel.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 700,
        autoHeight: true,
        autoScroll: true,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls: 'icon-expert-help',
        resizable: false,
        modal: true,
        items: [this._basicPanel, this._basicPanelPlan, this._basicPanelBase, this._basicPanelexploit, this._basicPanelAchieve, this._basicPanelImp, this._basicPanelScience],
        buttons: [this._buttonClose]
    })
}
Ext.extend(Srims.experts.GetHelpWindow, Ext.Window);
