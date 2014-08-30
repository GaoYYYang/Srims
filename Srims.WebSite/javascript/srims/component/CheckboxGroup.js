
if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.CheckBoxGroup = Ext.extend(Ext.form.CheckboxGroup, {

    getSelecetedValue: function() {
        var returnValue = '';
        var checkboxGroupItems = this.items;

        for (var i = 0; i < checkboxGroupItems.length; i++) {
            if (checkboxGroupItems.itemAt(i).checked) {
                returnValue += checkboxGroupItems.itemAt(i).name + ',';
            }
        }
        return returnValue;
    },
    getSelecetedValueNameAndBoxLabel: function() {

        var returnValue = {};
        returnValue.Name = [];
        returnValue.BoxLabel = [];
        returnValue.Renderer = [];
        returnValue.Width = [];
        var checkboxGroupItems = this.items;

        for (var i = 0; i < checkboxGroupItems.length; i++) {
            if (checkboxGroupItems.itemAt(i).checked) {
                returnValue.Name.push(checkboxGroupItems.itemAt(i).name);
                returnValue.BoxLabel.push(checkboxGroupItems.itemAt(i).boxLabel);
                returnValue.Renderer.push(checkboxGroupItems.itemAt(i).renderFunction == undefined ? '' : checkboxGroupItems.itemAt(i).renderFunction);
                returnValue.Width.push(checkboxGroupItems.itemAt(i).columnsWidth);
            }
        }
        return returnValue;
    },
    setAllValueSelectedNameAndBoxLabel: function() {
        var checkboxGroupItems = this.items;

        for (var i = 0; i < checkboxGroupItems.length; i++)
            checkboxGroupItems.itemAt(i).setValue(true);
    }
});


Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray = function(array, checkedValues) {

    var items = [];
    for (var i = 0; i < array.length; i++) {
        items[i] = {
            boxLabel: array[i][1],
            name: array[i][0],
            renderFunction: array[i][2],
            columnsWidth: array[i][3]
        };
    }
    if (checkedValues && checkedValues.length > 0) {
        var checkedValuesArray = checkedValues.split(",");
        if (checkedValuesArray && checkedValuesArray.length > 0) {
            for (var j = 0; j < checkedValuesArray.length; j++) {
                for (var k = 0; k < items.length; k++) {
                    if (checkedValuesArray[j] == items[k].name) {
                        items[k].checked = true;
                        break;
                    }
                }
            }
        }
    }
    return items;
}
