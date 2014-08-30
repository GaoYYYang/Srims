if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_AdminRateForm = function(systemSetting) {
	this._systemSetting= systemSetting;

   this._textFieldHorizontalRateIn = new Ext.form.NumberField({
        fieldLabel: '横向校内管理费率',
		minValue : 0,
		maxValue :100,
        value: systemSetting.get('defaultOverheadExpenseInRateHorizonal')/100,
        allowBlank: false,
        width: 160
    });
	this._textFieldHorizontalRateOut = new Ext.form.NumberField({
        fieldLabel: '横向校外管理费率',
		minValue : 0,
		maxValue :100,
        value: systemSetting.get('defaultOverheadExpenseOutRateHorizonal')/100,
        allowBlank: false,
        width: 160
    });
	this._textFieldVerticalRateIn = new Ext.form.NumberField({
        fieldLabel: '纵向校内管理费率',
		minValue : 0,
		maxValue :100,
        value: systemSetting.get('defaultOverheadExpenseInRateVertical')/100,
        allowBlank: false,
        width: 160
    });
	this._textFieldVerticalRateOut = new Ext.form.NumberField({
        fieldLabel: '纵向校外管理费率',
		minValue : 0,
		maxValue :100,
        value: systemSetting.get('defaultOverheadExpenseOutRateVertical')/100,
        allowBlank: false,
        width: 160
    });
    this._textFieldHorizontalRate = new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldHorizontalRateIn
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldHorizontalRateOut
        })]
    });
	this._textFieldVerticalRate = new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldVerticalRateIn
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldVerticalRateOut
        })]
    });
    Srims.common.SystemSettingWindow_AdminRateForm.superclass.constructor.call(this, {
        title: '管理费率设置(百分比)',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: [this._textFieldHorizontalRate,this._textFieldVerticalRate]
        })]
    });
	//method
	this.isValid = function(preventMark){
        var result = true;       
        result = this._textFieldHorizontalRateIn.isValid(preventMark) && result;
		result = this._textFieldHorizontalRateOut.isValid(preventMark) && result;
		result = this._textFieldVerticalRateIn.isValid(preventMark) && result;
		result = this._textFieldVerticalRateOut.isValid(preventMark) && result;
        return result;
    }
	this.assignValues = function (){
		this._systemSetting.set('defaultOverheadExpenseInRateHorizonal',this._textFieldHorizontalRateIn.getValue());
		this._systemSetting.set('defaultOverheadExpenseOutRateHorizonal',this._textFieldHorizontalRateOut.getValue());
		this._systemSetting.set('defaultOverheadExpenseInRateVertical',this._textFieldVerticalRateIn.getValue());
		this._systemSetting.set('defaultOverheadExpenseOutRateVertical',this._textFieldVerticalRateOut.getValue());	
	}
}
Ext.extend(Srims.common.SystemSettingWindow_AdminRateForm, Ext.form.FormPanel);	