
if (!Srims.projects) 
    Ext.namespace("Srims.projects");

Srims.projects.ProjectShowPanel_SystemForm = function(project){

    this._project = project;
    
    this._fieldCreator = new Ext.form.Field({
        fieldLabel: '创建人',
        value: project.get('creator'),
        readOnly: true,
        width: 160
    });
    
    this._fieldCreatorDate = new Ext.form.Field({
        fieldLabel: '创建时间',
        value: Date.render(project.get('createDate')),
        readOnly: true,
        width: 160
    });
    
    Srims.projects.ProjectShowPanel_SystemForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '系统信息',
        autoHeight: true,
        frame: true,
        labelWidth: 70,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldCreator]
            }), new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldCreatorDate]
            })]
        })]
    });
    
    this.setProject = function(project){
        this._project = project;
        this._fieldCreator.setValue(project.get('creator'));
        this._fieldCreatorDate.setValue(Date.render(project.get('createDate')));
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_SystemForm, Ext.form.FormPanel, {});

