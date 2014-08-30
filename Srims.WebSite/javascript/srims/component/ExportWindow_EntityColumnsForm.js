
if (!Srims.component) 
    Ext.namespace("Srims.component");

Srims.component.ExportWindow_EntityColumnForm = function(title, array){

    this._checkboxGroup = new Srims.component.CheckBoxGroup({
        hideLabel: true,
        columns: array.length > 4 ? 5 : array.length,
        width: 700,
        cls: 'srims-checkboxGroup-export-Column',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(array)
    });
    this.checkBox = new Ext.form.Checkbox({
        hideLabel: true,
        checkboxGroup: this._checkboxGroup,
        width: 20,
        handler: function(){
            if (this.checked) 
                this.checkboxGroup.setAllValueSelectedNameAndBoxLabel();
            else 
                this.checkboxGroup.reset();
        }
    })
    Srims.component.ExportWindow_EntityColumnForm.superclass.constructor.call(this, {
        title: title,
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        titleCollapse: true,
        layout: 'form',
        items: [new Ext.Panel({
            layout: 'column',
            autoWidth: true,
            items: [new Ext.Panel({
                layout: 'form',
                items: this.checkBox
            }), new Ext.Panel({
                layout: 'form',
                autoWidth: true,
                items: this._checkboxGroup
            })]
        })]
    });
}
Ext.extend(Srims.component.ExportWindow_EntityColumnForm, Ext.form.FormPanel, {});
