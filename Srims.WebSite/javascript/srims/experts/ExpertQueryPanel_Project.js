
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Project = function(){
    this._basic = new Srims.experts.ExpertQueryPanel_Project_Basic();
    this._fund = new Srims.experts.ExpertQueryPanel_Project_Fund();
    this._type = new Srims.experts.ExpertQueryPanel_Project_Type();
    
    Srims.experts.ExpertQueryPanel_Project.superclass.constructor.call(this, ({
        collapsible: true,
        title: '项目',
        autoHeight: true,
        frame: true,
        layout: 'form',
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._basic, this._fund, this._type]
    }))
    
    this.buildParams = function(params){
        this._basic.buildParams(params);
        this._fund.buildParams(params);
        this._type.buildParams(params);
    }
    this.clearParams = function(){
        this._basic.clearParams();
        this._fund.clearParams();
        this._type.clearParams();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Project, Ext.Panel, {});
