
if (!Srims.fund) 
    Ext.namespace("Srims.fund");

Srims.fund.FinanceShowForm = function(finance, isBorrow){

    this._finance = finance;
    
    this._textFieldAmount = new Ext.form.TextField({
        fieldLabel: '金额',
        value: Money.render(finance.get('amount')),
        readOnly: true,
        width: 160
    });
    this._textFieldReceivedTime = new Ext.form.TextField({
        fieldLabel: '到帐时间',
        value: Date.render(finance.get('receivedDate')),
        readOnly: true,
        width: 160
    });
    this._textFieldVoucherNumber = new Ext.form.TextField({
        fieldLabel: '凭单号',
        value: finance.get('voucherNumber'),
        readOnly: true,
        width: 160
    });
    this._textFieldRemark = new Ext.form.TextField({
        fieldLabel: '描述',
        value: finance.get('abstract'),
        readOnly: true,
        width: 300
    });
    this._textFieldIsBorrowReamrk = new Ext.form.TextField({
        fieldLabel: '特别说明：',
        value: '此经费来源于借款',
        readOnly: true,
        width: 300
    });
    var columnFirstItems = [this._textFieldReceivedTime, this._textFieldAmount];
    var columnSecondItems = [this._textFieldVoucherNumber];
    
    Srims.fund.FinanceShowForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: isBorrow ? [this._textFieldIsBorrowReamrk] : [new Ext.Panel({
            labelWidth: 100,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:300px',
                items: columnFirstItems
            }), new Ext.Panel({
                width: 400,
                style: 'width:300px',
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._textFieldRemark]
    });
    
    this.resetComponnentsValue = function(finance){
        this._textFieldAmount.setValue(Money.render(finance.get('amount')));
        this._textFieldReceivedTime.setValue(Date.render(finance.get('receivedDate')));
        this._textFieldVoucherNumber.setValue(finance.get('voucherNumber'));
        this._textFieldRemark.setValue(finance.get('abstract'));
    }
}

Ext.extend(Srims.fund.FinanceShowForm, Ext.form.FormPanel, {});
