
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Relation = function(){
    this._modelRelation = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '专家查询各个模块（基本信息、论文、奖励、专利和项目）之间是或的关系'
    })
    Srims.experts.ExpertQueryPanel_Relation.superclass.constructor.call(this, ({
        title: '选择关系',
        collapsible: true,
        autoHeight: true,
        labelWidth: 400,
        frame: true,
        layout: 'form',
        labelWidth: 60,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._modelRelation]
    }))
    
    this.buildParams = function(params){
        params.isOr = this._modelRelation.getValue();
    }
    this.clearParams = function(){
        this._modelRelation.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Relation, Ext.Panel, {});
