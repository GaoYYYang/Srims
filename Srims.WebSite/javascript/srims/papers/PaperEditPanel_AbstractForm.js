
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.PaperEditPanel_AbstractForm = function(paper){
    this._paper = paper;
    
    this._abstract = new Ext.form.TextArea({
        fieldLabel: '摘要',
        value: this._paper.get('abstract'),
        Height: 380,
        width: 460
    });
    
    Srims.papers.PaperEditPanel_AbstractForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '摘要信息',
        Height: 400,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._abstract]
    });
    
    this.assginValues = function(){
        this._paper.set('abstract', this._abstract.getValue());
    }
    
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._abstract.isValid(preventMark) && result;
        
        return result;
    }
}
Ext.extend(Srims.papers.PaperEditPanel_AbstractForm, Ext.form.FormPanel, {});
