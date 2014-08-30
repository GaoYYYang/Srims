
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_RemarkForm = function(project){
    this._project = project;
    
    this._textAreaRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        hideLabel: true,
        value: project.get('remark'),
        readOnly: true,
        width: 570
    });
    Srims.projects.ProjectShowPanel_RemarkForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '备注',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._textAreaRemark]
    });
    this.resetComponentValue = function(project){
        this._textAreaRemark = this._project.get('remark');
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_RemarkForm, Ext.FormPanel);
