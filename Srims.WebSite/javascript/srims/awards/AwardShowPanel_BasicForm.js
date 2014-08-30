
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardShowPanel_BasicForm = function(award){
    //field
    this._award = award;
    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '奖励名称',
        value: award.get('name'),
        readOnly: true,
        width: 350
    });
    this._fieldProjectName = new Ext.form.Field({
        fieldLabel: '奖励项目名称',
        value: award.get('projectName'),
        readOnly: true,
        width: 510
    });
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '奖励级别',
        value: award.get('rank'),
        readOnly: true,
        width: 160
    });
    this._fieldAttendType = new Ext.form.Field({
        fieldLabel: '参与类型',
        value: award.get('attendType'),
        readOnly: true,
        width: 160
    });
    this._fieldAuthorisedUnit = new Ext.form.Field({
        fieldLabel: '授奖单位',
        value: award.get('authorisedUnit'),
        readOnly: true,
        width: 160
    });
    this._fieldCollegeName = new Ext.form.Field({
        fieldLabel: '所属学院',
        value: award.get('collegeName'),
        readOnly: true,
        width: 160
    });
    
    this._fieldClassification = new Ext.form.Field({
        fieldLabel: '奖种',
        value: award.get('classification'),
        readOnly: true,
        width: 160
    });
    this._fieldYear = new Ext.form.Field({
        fieldLabel: '年度',
        value: award.get('year'),
        readOnly: true,
        width: 160
    });
    this._fieldClass = new Ext.form.Field({
        fieldLabel: '等级',
        value: award.get('class'),
        readOnly: true,
        width: 160
    });
    this._fieldSubjectNature = new Ext.form.Field({
        fieldLabel: '学科性质',
        value: Srims.subjectNatureRender(award.get('subjectNature')),
        readOnly: true,
        width: 160
    });
    this._fieldRemark = new Ext.form.Field({
        fieldLabel: '奖励备注',
        value: award.get('remark'),
        readOnly: true,
        width: 300
    });
    //constructor        
    var columnOneItems = [this._fieldRank, this._fieldAttendType, this._fieldAuthorisedUnit, this._fieldCollegeName];
    var columnTwoItems = [this._fieldYear, this._fieldClass, this._fieldClassification, this._fieldSubjectNature];
    
    Srims.awards.AwardShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldName, new Ext.Panel({
            widht: 700,
            layout: 'column',
            items: [new Ext.Panel({
                width: 350,
                layout: 'form',
                style: 'width:300px',
                items: columnOneItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnTwoItems
            })]
        }), this._fieldRemark, this._fieldProjectName]
    });
    
}
Ext.extend(Srims.awards.AwardShowPanel_BasicForm, Ext.form.FormPanel, {});
