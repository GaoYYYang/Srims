
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertQueryPanel_Patent = function(){
    this._PatentInventerOrderStart = new Ext.form.NumberField({
        fieldLabel: '发明人位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 120
    });
    this._PatentInventerOrderEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 120
    });
    this._IsAccredited = new Ext.form.Checkbox({
        fieldLabel: '是否已授权'
    });
    this._IsPrincipal = new Ext.form.Checkbox({
        fieldLabel: '是否负责人'
    });
    this._ApplicationTimeStart = new Ext.form.DateField({
        fieldLabel: '申请时间',
        width: 120
    });
    this._ApplicationTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 120
    });
    this._AuthorisedTimeStart = new Ext.form.DateField({
        fieldLabel: '授权时间',
        width: 120
    });
    this._AuthorisedTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 120
    });
    this._patentLawState = new Srims.component.CheckBoxGroup({
        fieldLabel: '法律状态',
        cls: 'srims-checkboxGroup',
        columns: Srims.patents.PatentLawStateStore.length > 7 ? 6 : Srims.patents.PatentLawStateStore.length,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentLawStateStore)
    });
    this._patentTypes = new Srims.component.CheckBoxGroup({
        fieldLabel: '专利类别',
        cls: 'srims-checkboxGroup',
        columns: Srims.patents.PatentTypeStore.length > 5 ? 4 : Srims.patents.PatentTypeStore.length,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.patents.PatentTypeStore)
    });
    
    Srims.experts.ExpertQueryPanel_Patent.superclass.constructor.call(this, ({
        collapsible: true,
        title: '专利',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 70,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 240,
                labelWidth: 70,
                items: [this._PatentInventerOrderStart, this._ApplicationTimeStart, this._AuthorisedTimeStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 20,
                width: 200,
                items: [this._PatentInventerOrderEnd, this._ApplicationTimeEnd, this._AuthorisedTimeEnd]
            }), new Ext.Panel({
                layout: 'form',
                width: 200,
                labelWidth: 70,
                items: [this._IsAccredited, this._IsPrincipal]
            })]
        }), this._patentLawState, this._patentTypes]
    }))
    
    this.buildParams = function(params){
        params.inventorOrderStart = this._PatentInventerOrderStart.getValue();
        params.inventorOrderEnd = this._PatentInventerOrderEnd.getValue();
        params.isAccredited = this._IsAccredited.checked ? "true" : "";
        params.isPrincipal = this._IsPrincipal.checked ? "true" : "";
        params.applicationTimeStart = Date.format(this._ApplicationTimeStart.getValue());
        params.applicationTimeEnd = Date.format(this._ApplicationTimeEnd.getValue());
        params.authorizedTimeStart = Date.format(this._AuthorisedTimeStart.getValue());
        params.authorizedTimeEnd = Date.format(this._AuthorisedTimeEnd.getValue());
        params.patentLawState = this._patentLawState.getSelecetedValue();
        params.patentTypes = this._patentTypes.getSelecetedValue();
    }
    
    this.clearParams = function(){
        this._PatentInventerOrderStart.reset();
        this._PatentInventerOrderEnd.reset();
        this._IsAccredited.reset();
        this._IsPrincipal.reset();
        this._ApplicationTimeStart.reset();
        this._ApplicationTimeEnd.reset();
        this._AuthorisedTimeStart.reset();
        this._AuthorisedTimeEnd.reset();
        this._patentLawState.reset();
        this._patentTypes.reset();
    }
}
Ext.extend(Srims.experts.ExpertQueryPanel_Patent, Ext.Panel, {});
