
if (!Srims.experts) 
    Ext.namespace('Srims.experts');
Srims.experts.ExpertQueryPanel_Project_Type = function(){

    var projectRankItems = Srims.experts.ExpertQueryPanel_Project_Type.RankStore.checkboxGroupItems;
    this._checkBoxGroupProjectRank = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目类型',
        cls: 'srims-checkboxGroup',
        columns: projectRankItems.length > 6 ? 5 : projectRankItems.length,
        items: projectRankItems
    })
    
    Srims.experts.ExpertQueryPanel_Project_Type.superclass.constructor.call(this, ({
        collapsible: true,
        title: '类型信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._checkBoxGroupProjectRank]
    }))
    
    this.buildParams = function(params){
        params.projectRank = this._checkBoxGroupProjectRank.getSelecetedValue();
    }
    this.clearParams = function(){
        this._checkBoxGroupProjectRank.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Project_Type, Ext.Panel, {});

Srims.experts.ExpertQueryPanel_Project_Type.RankStore = new Srims.data.IDValueRecordStore(Srims.service.type.ProjectRankService + '/GetRankString');
Srims.experts.ExpertQueryPanel_Project_Type.RankStore.load({
    callback: Srims.experts.ExpertQueryPanel_Project_Type.RankStore.buildCheckboxGroupItems
});
