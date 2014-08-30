
if (!Srims.fund)
    Ext.namespace('Srims.fund');

Srims.fund.FundAllocationOutWindow = function(id, fundAllocation) {

    this._id = id;
    this._fundAllocation = fundAllocation;
    this._currentAllocationTotal = fundAllocation.get('allocationTotal') / 1000000;
    this._currentRest = (fundAllocation.get('fundPlanOut') - fundAllocation.get('fundAlreadyOut')) / 1000000;
    this._canInputRange = this._currentAllocationTotal > this._currentRest ? this._currentRest : this._currentAllocationTotal;
    this._title = '填写外协分配(填写范围0-' + this._canInputRange + '万元)';

    this._fundAllocationOutNumberField = new Ext.form.NumberField({
        //blankText: this._title,
        width: 200,
        fieldLabel: '指定外协分配额度',
        window: this,
        allowNegative: false,
        decimalPrecision: 6,
        labelStyle: 'margin-top:20px;margin-left:80px',
        style: 'margin-top:20px;margin-left:20px',
        maxValue: this._currentAllocationTotal > this._currentRest ? this._currentRest : this._currentAllocationTotal,
        minValue: 0
    })
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        handler: function() {


            var window = this.window;
            if (!window.isValid(false))
                return;
            var fundOut = window._fundAllocationOutNumberField.getValue() * 10000 * 1000000 / 10000;
            Ext.Ajax.request({
                url: Srims.service.fund.FundAllocationService + '/ChangeAllocationOut',
                params: {
                    FundAllocationId: fundAllocation.get('id'),
                    AllocationWantOut: fundOut
                },
                scope: this,
                success: function(response) {
                    window._fundAllocation.panel.refresh();

                    Ext.Ajax.request({
                        url: Srims.service.fund.FundAllocationService + '/GetById',
                        params: {
                            fundAllocationId: fundAllocation.get('id')
                        },
                        scope: this,
                        success: function(response) {
                            var store = new Ext.data.Store({
                                data: response.responseXML,
                                reader: new Srims.fund.FundAllocationXmlReader()
                            });
                            var currentFundAllocation = store.getAt(0);
                            currentFundAllocation.panel = window._fundAllocation.panel;
                            Srims.fund.newVoucher(currentFundAllocation, false, "校内");

                            window.close();
                        }
                    });

                }
            });
        }

    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });

    Srims.fund.FundAllocationOutWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: 'icon-finance-query',
        width: 500,
        height: 150,
        style: 'padding:5px',
        layout: 'form',
        resizable: false,
        items: [this._fundAllocationOutNumberField],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fundAllocationOutNumberField.isValid(preventMark) && result;
        return result;
    }


}
Ext.extend(Srims.fund.FundAllocationOutWindow, Ext.Window);
