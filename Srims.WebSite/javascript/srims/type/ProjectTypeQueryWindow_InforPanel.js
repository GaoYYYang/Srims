
if (!Srims.type) 
    Ext.namespace('Srims.type');

Srims.type.ProjectTypeQueryWindow_InforPanel = function(){

    this._checkboxGroupProjectRanks = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目等级',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.type.ProjectTypeQueryWindow_InforPanel.ProjectRankStore.checkboxGroupItems
    });
    Srims.type.ProjectTypeQueryWindow_InforPanel.superclass.constructor.call(this, {
        title: '',
        frame: true,
        layout: 'form',
        widht: 500,
        labelWidth: 90,
        items: [this._checkboxGroupProjectRanks]
    });
    
    this.buildParams = function(params){
        params.projectRank = this._checkboxGroupProjectRanks.getSelecetedValue();
    }
    
    this.clearParams = function(){
        this._checkboxGroupProjectRanks.reset();
    }
}
Ext.extend(Srims.type.ProjectTypeQueryWindow_InforPanel, Ext.FormPanel);

Srims.type.ProjectTypeQueryWindow_InforPanel.ProjectRankStore = new Srims.data.IDValueRecordStore(Srims.service.type.ProjectRankService + '/GetAllRanksForFilter');
Srims.type.ProjectTypeQueryWindow_InforPanel.ProjectRankStore.load({
    callback: Srims.type.ProjectTypeQueryWindow_InforPanel.ProjectRankStore.buildCheckboxGroupItems
});
