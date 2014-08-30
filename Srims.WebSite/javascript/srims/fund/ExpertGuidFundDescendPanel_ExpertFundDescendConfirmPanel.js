
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel = function(){

    this._textFieldProjectName = new Ext.form.TextField({
        fieldLabel: '下拨项目名称',
        readOnly: true,
        width: 300
    });
    this._textFieldDescend = new Ext.form.TextField({
        fieldLabel: '下拨金额',
        width: 150,
        readOnly: true
    });
    
    this._numberFieldFinanceVoucherNumber = new Ext.form.TextField({
        fieldLabel: '下拨经费凭单号',
        readOnly: true,
        width: 150
    });
    this._textAreaAbstract = new Ext.form.TextField({
        fieldLabel: '下拨经费说明说明',
        readOnly: true,
        width: 350
    });
    Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel.superclass.constructor.call(this, {
        deferHeight: false,
        layout: 'form',
        style: 'padding:10px;',
        items: [this._textFieldProjectName, this._textFieldDescend, this._numberFieldFinanceVoucherNumber, this._textAreaAbstract]
    });
    this.setValue = function(params){
        this._numberFieldFinanceVoucherNumber.setValue(params.finance.get('voucherNumber'));
        this._textAreaAbstract.setValue(params.finance.get('abstract'));
        this._textFieldProjectName.setValue(params.project.get('name'));
        this._textFieldDescend.setValue(Money.render(params.descendAmount));
    }
    this.next = function(){
        var params = {};
        params.isLent = false;
        params.projectID = this.panel._params.project.get('id');
        params.amount = this.panel._params.descendAmount;
        params.financeId = this.panel._params.finance.get('id');
        
        this.button.setText('正在执行下一步...');
        this.button.disable();
        
        Ext.Ajax.request({
            url: Srims.service.fund.FundDescendService + '/Save',
            params: params,
            scope: this,
            success: function(){
                Srims.expertGuide.next(this);
            }
        });
    }
}
Ext.extend(Srims.fund.ExpertGuidFundDescendPanel_ExpertFundDescendConfirmPanel, Ext.Panel, {});
