
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.DimensionSelectForm = function(dimensions){

    this._dimensions = dimensions;
    
    this._comboBoxColumnDimension = new Ext.form.ComboBox({
        fieldLabel: '统计列',
        store: new Ext.data.SimpleStore({
            fields: new Array('name', 'value'),
            data: this._dimensions
        }),
        valueField: 'value',
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        mode: 'local',
        listWidth: 150,
        width: 150
    });
    this._comboBoxColumnDimensionSize = new Ext.form.ComboBox({
        fieldLabel: '列单位',
        store: new Ext.data.SimpleStore({
            fields: new Array('name', 'value'),
            data: new Array()
        }),
        displayField: 'name',
        valueField: 'value',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        mode: 'local',
        listWidth: 150,
        width: 150
    });
    this._comboBoxRowDimension = new Ext.form.ComboBox({
        fieldLabel: '统计行',
        store: new Ext.data.SimpleStore({
            fields: new Array('name', 'value'),
            data: this._dimensions
        }),
        valueField: 'value',
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        mode: 'local',
        listWidth: 150,
        width: 150
    });
    this._comboBoxRowDimensionSize = new Ext.form.ComboBox({
        fieldLabel: '行单位',
        store: new Ext.data.SimpleStore({
            fields: new Array('name', 'value'),
            data: new Array()
        }),
        displayField: 'name',
        valueField: 'value',
        editable: false,
        triggerAction: 'all',
        allowBlank: false,
        mode: 'local',
        listWidth: 150,
        width: 150
    });
    
    var columnOneItems = [this._comboBoxColumnDimension, this._comboBoxRowDimension]
    var columnTwoItems = [this._comboBoxColumnDimensionSize, this._comboBoxRowDimensionSize]
    
    Srims.statistic.DimensionSelectForm.superclass.constructor.call(this, {
        title: '统计维度',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnTwoItems
            })]
        })]
    });
    
    this.clearParams = function(){
        this._comboBoxColumnDimension.reset();
        this._comboBoxColumnDimensionSize.reset();
        this._comboBoxRowDimension.reset();
        this._comboBoxRowDimensionSize.reset();
    }
    this.buildParams = function(params){
        params.columnDimension = this._comboBoxColumnDimension.getValue();
        params.columnDimensionSize = this._comboBoxColumnDimensionSize.getValue();
        params.rowDimension = this._comboBoxRowDimension.getValue();
        params.rowDimensionSize = this._comboBoxRowDimensionSize.getValue();
    }
    this.isValid = function(){
        var result = true;
        
        result = this._comboBoxColumnDimension.isValid(false) && result;
        result = this._comboBoxColumnDimensionSize.isValid(false) && result;
        result = this._comboBoxRowDimension.isValid(false) && result;
        result = this._comboBoxRowDimensionSize.isValid(false) && result;
        
        return result;
    }
    this._comboBoxColumnDimension.dimensions = this._dimensions;
    this._comboBoxColumnDimension.comboBoxSize = this._comboBoxColumnDimensionSize;
    
    this._comboBoxRowDimension.dimensions = this._dimensions;
    this._comboBoxRowDimension.comboBoxSize = this._comboBoxRowDimensionSize;
    
    this._onComboBoxDimension_Select = function(comboBox){
        var dimensions = comboBox.dimensions;
        var deminsion = comboBox.getValue();
        
        var deminsionIndex = 0;
        for (var i = 0; i < dimensions.length; i++) 
            if (dimensions[i][1] == deminsion) 
                deminsionIndex = i;
        
        var sizes = dimensions.sizes[deminsionIndex];
        var comboBoxSize = comboBox.comboBoxSize;
        var sizeStore = comboBoxSize.store;
        
        sizeStore.loadData(sizes);
        
        if (sizeStore.getCount() == 1) {
            comboBoxSize.setValue(sizes[0][1]);
        }
        else {
            comboBoxSize.setValue(undefined);
        }
    };
    
    this._comboBoxColumnDimension.on('select', this._onComboBoxDimension_Select)
    this._comboBoxRowDimension.on('select', this._onComboBoxDimension_Select)
}

Ext.extend(Srims.statistic.DimensionSelectForm, Ext.form.FormPanel);
