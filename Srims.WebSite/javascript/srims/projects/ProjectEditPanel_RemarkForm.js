
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectEditPanel_RemarkForm = function(project){
    this._project = project;
    
    this._textAreaRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        hideLabel: true,
        value: project.get('remark'),
        width: 570
    });
    Srims.projects.ProjectEditPanel_RemarkForm.superclass.constructor.call(this, {
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
    
    //method
    this.assginValues = function(){
        this._project.set('remark', this._textAreaRemark.getValue());
    }
    this.isValid = function(preventMark){
        return true;
    }
    //刷新
    this._resetFormPanel = function(project){
    
        this._project = project;
        this._textAreaRemark.setValue(project.get('remark'));
    }
}
Ext.extend(Srims.projects.ProjectEditPanel_RemarkForm, Ext.FormPanel);
