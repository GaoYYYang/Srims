
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_TypeForm = function(project){

    this._project = project;
    
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '项目级别',
        value: project.get('rankName'),
        readOnly: true,
        width: 160
    });
    this._fieldType = new Ext.form.Field({
        fieldLabel: '项目类型',
        value: project.get('typeName'),
        readOnly: true,
        width: 300
    });
    this._fieldSupportCategory = new Ext.form.Field({
        fieldLabel: '资助类别',
        value: project.get('supportCategoryName'),
        readOnly: true,
        width: 160
    });
    this._fieldSupportField = new Ext.form.Field({
        fieldLabel: '资助领域',
        value: project.get('supportFieldName'),
        readOnly: true,
        width: 160
    });
    this._fieldSupportSubField = new Ext.form.Field({
        fieldLabel: '资助子领域',
        value: project.get('supportSubFieldName'),
        readOnly: true,
        width: 160
    });
    
    var items = [this._fieldRank, this._fieldType, this._fieldSupportCategory, new Ext.Panel({
        widht: 600,
        layout: 'column',
        items: [new Ext.Panel({
            width: 300,
            layout: 'form',
            style: 'width:300px',
            items: [this._fieldSupportField]
        }), new Ext.Panel({
            width: 300,
            style: 'width:300px',
            layout: 'form',
            items: [this._fieldSupportSubField]
        })]
    })];
    if (project.get('isHorizontal')) 
        items.shift();
    
    Srims.projects.ProjectShowPanel_TypeForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '分类信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: items
    });
    //method
    this.resetComponentValue = function(project){
        this._fieldRank.setValue(project.get('rankName'));
        this._fieldType.setValue(project.get('typeName'));
        this._fieldSupportCategory.setValue(project.get('supportCategoryName'));
        this._fieldSupportField.setValue(project.get('supportFieldName'));
        this._fieldSupportSubField.setValue(project.get('supportSubFieldName'));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_TypeForm, Ext.form.FormPanel);
