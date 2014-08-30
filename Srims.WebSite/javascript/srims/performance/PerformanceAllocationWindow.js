
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceAllocationWindow = function(id, fundAllocation) {

    this._id = id;
    this._fundAllocation = fundAllocation;
    this._currentAllocationTotal = fundAllocation.get('arrivedOverheadexpensesExpert') / 1000000;

    this._title = '填写绩效分配(填写范围0-' + this._currentAllocationTotal + '万元)' + '。<br/><font color=red>注意：可分配金额与绩效分配额度差值为课题组间接费用，</br>课题组间接费用自动划分到课题负责人名下.。</font>';

    this._fundAllocationOutNumberField = new Ext.form.NumberField({
        //blankText: this._title,
        width: 200,
        fieldLabel: '指定绩效分配额度',
        window: this,
        allowNegative: false,
        decimalPrecision: 6,
        labelStyle: 'margin-top:20px;margin-left:80px',
        style: 'margin-top:20px;margin-left:20px',
        maxValue: this._currentAllocationTotal,
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
            var fundOut = window._fundAllocationOutNumberField.getValue() * 1000000;
            Ext.Ajax.request({
                url: Srims.service.performance.PerformanceAllocationService + '/GetPerformanceAmountForAllocate',
                params: {
                    ID: fundAllocation.get('id'),
                    Amount: fundOut
                },
                scope: this,
                success: function(response) {
                    window._fundAllocation.panel.refresh();


                    window.close();

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

    Srims.performance.PerformanceAllocationWindow.superclass.constructor.call(this, {
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
Ext.extend(Srims.performance.PerformanceAllocationWindow, Ext.Window);
