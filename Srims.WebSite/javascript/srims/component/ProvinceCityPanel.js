
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.ProvinceCityPanel = function(fieldLabel, province, city, allowBlank){
    this._fieldLabel = fieldLabel;
    this._province = province;
    this._city = city;
    this._allowBlank = allowBlank;
    
    this._comboBox_Province = new Ext.form.ComboBox({
        fieldLabel: this._fieldLabel,
        store: Provinces,
        allowBlank: true,
        forceSelection: true,
        triggerAction: 'all',
        mode: 'local',
        lazyLoad: false,
        width: 100
    });
    this._comboBox_City = new Ext.form.ComboBox({
        fieldLabel: this._fieldLabel,
        hideLabel: true,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: this._province == undefined ? new Array() : Provinces.getCities(this._province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: true,
        forceSelection: true,
        mode: 'local',
        triggerAction: 'all',
        lazyLoad: false,
        width: 100
    });
    
    this._comboBox_Province.comboBox_City = this._comboBox_City;
    
    this.onComboBox_Province_Select = function(comboBox){
        var province = comboBox.getValue();
        var comboBox_City = comboBox.comboBox_City;
        var cityStore = comboBox_City.store;
        var cities = Provinces.getCities(province);
        
        cityStore.loadData(cities);
        
        if (cityStore.getCount() == 1) {
            comboBox_City.setValue(cities[0][0]);
        }
        else {
            comboBox_City.setValue(undefined);
        }
    };
    this._comboBox_Province.on('select', this.onComboBox_Province_Select);
    Srims.component.ProvinceCityPanel.superclass.constructor.call(this, {
        widht: 300,
        layout: 'column',
        labelWidth: 60,
        items: [new Ext.Panel({
            width: 180,
            labelWidth: 60,
            layout: 'form',
            items: this._comboBox_Province
        }), new Ext.Panel({
            width: 100,
            layout: 'form',
            items: this._comboBox_City
        })]
    });
}
Ext.extend(Srims.component.ProvinceCityPanel, Ext.Panel);
