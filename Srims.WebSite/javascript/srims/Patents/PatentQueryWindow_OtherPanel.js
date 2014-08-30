
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentQueryWindow_OtherPanel = function() {

    this._patentTypes = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利类别',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentTypeStore)
    });
    this._patentLawState = new Srims.component.CheckBoxGroup({
        fieldLabel: '法律状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentLawStateStore)
    });
    this._patentLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentLevelStore)
    });

    this._PatentCategory = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利分类',
        cls: 'srims-checkboxGroup-signUnit',
        columns: 3,
        items: Srims.patents.PatentQueryWindow_OtherPanel.PatentCategoryStore.checkboxGroupItems
    });
    this._Country = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利国别',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.patents.PatentQueryWindow_OtherPanel.CountryStore.checkboxGroupItems
    });

    Srims.patents.PatentQueryWindow_OtherPanel.superclass.constructor.call(this, {
        title: '其他信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 681,
        autoHeight: true,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            items: [this._PatentCategory, this._patentLevel, this._Country, this._patentTypes, this._patentLawState]
        })]
    });

    this.buildParams = function(params) {
        params.Types = this._patentTypes.getSelecetedValue();
        params.LawStates = this._patentLawState.getSelecetedValue();
        params.Levels = this._patentLevel.getSelecetedValue();
        params.Countrys = this._Country.getSelecetedValue();
        params.Categorys = this._PatentCategory.getSelecetedValue();
    }

    this.clearParams = function(params) {
        this._patentTypes.reset();
        this._patentLevel.reset();
        this._patentLawState.reset();
        this._Country.reset();
        this._PatentCategory.reset();
    }
}
Ext.extend(Srims.patents.PatentQueryWindow_OtherPanel, Ext.FormPanel);

Srims.patents.PatentQueryWindow_OtherPanel.PatentCategoryStore = new Srims.data.IDValueRecordStore(Srims.service.patents.PatentService + '/GetCategoryItems');
Srims.patents.PatentQueryWindow_OtherPanel.PatentCategoryStore.load({
    callback: Srims.patents.PatentQueryWindow_OtherPanel.PatentCategoryStore.buildCheckboxGroupItems
});
Srims.patents.PatentQueryWindow_OtherPanel.CountryStore = new Srims.data.IDValueRecordStore(Srims.service.patents.PatentService + '/GetCountryItems');
Srims.patents.PatentQueryWindow_OtherPanel.CountryStore.load({
    callback: Srims.patents.PatentQueryWindow_OtherPanel.CountryStore.buildCheckboxGroupItems
});




