
if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceDescendWindow = function(id, performance, performanceAllocation, store, manageWindow) {

    this._id = id;
    this._store = store;
    this._performance = performance;
    this._performanceAllocation = performanceAllocation;
    this._manageWindow = manageWindow;

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });


    this._numberFieldFundAmount = new Srims.component.MoneyField({
        fieldLabel: '下拨金额(万元)',
        value: this._performanceAllocation.get('amount'),
        allowBlank: false,
        allowNegative: false,
        width: 160
    });

    Srims.performance.PerformanceDescendWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '课题组间接费用和绩效',
        width: 440,
        height: 160,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._numberFieldFundAmount],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.validateFundAmount = function() {
        var performance = this.window._performance;
        var performanceAllocation = this.window.__performanceAllocation;

        if (this.getMoney() <= 0) {
            this.invalidText = '下拨金额必须大于0';
            return false;
        }
        var UndescendAmount = performance.get('arrivedPerformance') - performance.get('descendPerformance')
        if (this.getMoney() > UndescendAmount) {
            this.invalidText = '下拨金额不能大于经费到帐信息的未下拨金额' + Money.render(UndescendAmount);
            return false;
        }

        return true;
    }

    this._numberFieldFundAmount.window = this;
    this._numberFieldFundAmount.validator = this.validateFundAmount;

    this.validate = function(preventMark) {
        var result = true;

        result = this._numberFieldFundAmount.isValid(preventMark) && result;

        return result;
    }
    this.assginValues = function(params) {
        params.performanceID = this._performance.get('id');
        params.amount = this._numberFieldFundAmount.getMoney();
    }
    this.save = function() {
        var params = {};
        this.assginValues(params);

        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceAllocationService + '/Save',
            params: params,
            scope: this,
            success: function(response) {
                Srims.performance.PerformanceCallBack(this._manageWindow, response, store, this, true);
            }
        });
    }
    this.buttonSave_click = function(button, e) {
        var window = button.window;

        if (!window.validate(false))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();

        store.load();
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.performance.PerformanceDescendWindow, Ext.Window);
