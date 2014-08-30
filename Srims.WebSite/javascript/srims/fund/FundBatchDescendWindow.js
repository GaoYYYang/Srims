
if (!Srims.fund) 
    Ext.namespace('Srims.fund');
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.FundBatchDescendWindow = function(id, finance, store, manageWindow){

    this._id = id;
    this._store = store;
    this._finance = finance;
    this._manageWindow = manageWindow;
    
    this._projectStore = new Srims.projects.ProjectSimpleStore(Srims.service.projects.ProjectService + '/QueryForFundDescend', undefined);
    this._queryPanel = new Srims.fund.FundBatchDescendWindow_ProjectSimpleQueryPanel(this._projectStore)
    this._editorGridPanelFundDescend = new Srims.fund.FundBatchDescendWindow_EditGridPanel(finance, this._projectStore);
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '下 拨',
        window: this
    });
    
    Srims.fund.FundBatchDescendWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '经费批量下拨',
        width: 650,
        height: 400,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._queryPanel, this._editorGridPanelFundDescend],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    var descendProjectCount = 0;//统计下拨项目的数目
    this.validate = function(){
        var projectStore = this._projectStore;
        var projects = projectStore.getRange();
        var fundDescendTotal = 0;
        for (var i = 0; i < projects.length; i++) {
            var fundDescendAmount = projects[i].get('fundDescend');
            if (fundDescendAmount != null && fundDescendAmount != undefined && fundDescendAmount != 0) {
                fundDescendTotal += Money.toMoney(projects[i].get('fundDescend'));
                descendProjectCount++;
            }
        }
        if (fundDescendTotal > finance.get('amount') - finance.get('descendAmount')) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '下拨总额不能大于经费的未下拨总额',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        if (descendProjectCount == 0) {
            Ext.Msg.show({
                title: '经费下拨错误',
                msg: '请选择下拨项目',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return false;
        }
        return true;
    }
    
    var saveCount = 0;
    this.save = function(projects, i){
        if (i > projects.length) 
            return;
        var fundDescendAmount = projects[i].get('fundDescend');
        if (fundDescendAmount == null || fundDescendAmount == undefined || fundDescendAmount <= 0) {
            this.save(projects, ++i);
            return;
        }
        
        fundDescendAmount = Money.toMoney(fundDescendAmount);
        var params = {};
        params.projectID = projects[i].get('id');
        params.amount = fundDescendAmount;
        params.financeId = this._finance.get('id');
        params.isLent = false;
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(response){
                saveCount++;
                if (saveCount < descendProjectCount) {
                    this.save(projects, ++i);
                    return;
                }
                Srims.fund.FundDescendCallBack(this._manageWindow, response, store, this, true);
            }
        })
    }
    this.buttonSave_click = function(button, e){
        var window = this.window;
        if (!window.validate()) 
            return;
        
        window.save(window._projectStore.getRange(), 0);
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.FundBatchDescendWindow, Ext.Window);

