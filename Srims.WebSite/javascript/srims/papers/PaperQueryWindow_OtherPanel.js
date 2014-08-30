
if (!Srims.papers) 
    Ext.namespace('Srims.papers');

Srims.papers.PaperQueryWindow_OtherPanel = function(){
    this._checkboxGroupIndexed = new Srims.component.CheckBoxGroup({
        fieldLabel: '论文收录',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.paperIndexedTypeStore)
    });
    this._checkboxGroupType = new Srims.component.CheckBoxGroup({
        fieldLabel: '文章类型',
        cls: 'srims-checkboxGroup-paperType',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.paperTypeStore)
    });
    this._checkboxGroupLinkManSignUnit = new Srims.component.CheckBoxGroup({
        fieldLabel: '通讯作者署名单位',
        cls: 'srims-checkboxGroup-signUnit',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.signUnitStore)
    });
    this._checkboxGroupFirstAuthorSignUnit = new Srims.component.CheckBoxGroup({
        fieldLabel: '第一作者署名单位',
        cls: 'srims-checkboxGroup-signUnit',
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.papers.signUnitStore)
    });
    this._checkBoxIsFistAuthorOrLinkManSignUnit = new Ext.form.Checkbox({
        fieldLabel: '查询设置',
        boxLabel: '设置通讯作者与第一作者署名单位为或的关系'
    });
    var columnItems = [this._checkboxGroupIndexed, this._checkboxGroupType, this._checkboxGroupLinkManSignUnit, this._checkboxGroupFirstAuthorSignUnit, this._checkBoxIsFistAuthorOrLinkManSignUnit];
    
    Srims.papers.PaperQueryWindow_OtherPanel.superclass.constructor.call(this, {
        title: '其他信息',
        frame: true,
        layout: 'form',
        labelWidth: 100,
        width: 680,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: columnItems
        })]
    });
    
    this.buildParams = function(params){
        params.indexed = this._checkboxGroupIndexed.getSelecetedValue();
        params.type = this._checkboxGroupType.getSelecetedValue();
        params.linkManSignUnit = this._checkboxGroupLinkManSignUnit.getSelecetedValue();
        params.firstAuthorSignUnit = this._checkboxGroupFirstAuthorSignUnit.getSelecetedValue();
        params.isFistAuthorOrLinkManSignUnit = this._checkBoxIsFistAuthorOrLinkManSignUnit.checked ? "true" : "";
    }
    
    this.clearParams = function(params){
        this._checkboxGroupIndexed.reset();
        this._checkboxGroupType.reset();
        this._checkboxGroupLinkManSignUnit.reset();
        this._checkboxGroupFirstAuthorSignUnit.reset();
        this._checkBoxIsFistAuthorOrLinkManSignUnit.reset();
    }
}
Ext.extend(Srims.papers.PaperQueryWindow_OtherPanel, Ext.FormPanel);
