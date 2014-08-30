if (!Srims.performance)
    Ext.namespace('Srims.performance');

Srims.performance.PerformanceVoucherEditWindow = function(id, fundAllocation, voucher, project, allocatinName, minAllocationMoney) {

    this._fundAllocation = fundAllocation;
    this._project = project;
    this._voucher = voucher;
    PerformanceVoucherEditWindow = this.window;
    this._allocatinName = allocatinName;

    //绩效分配
    var fundAllocationAmount = fundAllocation.get('arrivedPerformance') - fundAllocation.get('allocatedPerformance');
    this._canAllocationAmount = voucher.isNew() ? fundAllocationAmount : fundAllocationAmount + voucher.get('performancePay');



    this._inForm = new Srims.performance.PerformanceVoucherEditWindow_InForm(fundAllocation, voucher, project, this._canAllocationAmount, this._projectCanAllocationInAmount, allocatinName, minAllocationMoney);


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

    Srims.performance.PerformanceVoucherEditWindow.superclass.constructor.call(this, {
        id: id,
        title: this._allocatinName+'分配',
        width: 950,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._inForm],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this._inForm.focus();


    this.validate = function(preventMark) {
        var result = true;

        result = this._inForm.validate(preventMark) && result;

        return result;
    }
    this.save = function() {
        var voucher = this._voucher;

        voucher.beginEdit();
        this._inForm.assginValues();
        voucher.commit();

        var params = voucher.data;


        Ext.Ajax.request({
            url: Srims.service.performance.PerformanceVoucherService + '/Save',
            params: params,
            scope: this,
            success: function() {
                var panel = this._fundAllocation.panel;
                if (panel == undefined) {
                    this.close();
                    return;
                }

                panel.fundAllocation = this._fundAllocation;
                panel.refresh();


                this.close();
            }
        });
    }
    this.buttonSave_click = function(button, e) {
        var window = this.window;
        if (!window.validate(false))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.performance.PerformanceVoucherEditWindow, Ext.Window);