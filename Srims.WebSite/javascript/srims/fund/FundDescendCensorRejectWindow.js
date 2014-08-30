
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundDescendCensorRejectWindow = function(id, fundDescend, store){

    this._id = id;
    this._fundDescend = fundDescend;
    this._store = store;
    
    this._buttonReject = new Ext.Button({
        minWidth: 80,
        text: '驳回',
        window: this,
        handler: function(){
            var window = this.window;
            var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '（' + window._textRejectRemark.getValue() + ')';
            Srims.fund.FundDescend_CensorReject(window._fundDescend, window._store, remark);
            window.close();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
        fieldLabel: '驳回理由',
        noticeTextType: 'FundDescendRejectReason',
        listWidth: 160,
        width: 130
    });
    this._textRejectRemark = new Ext.form.TextArea({
        fieldLabel: '详细说明',
        height: 60,
        width: 200
    });
    
    Srims.fund.FundDescendCensorRejectWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '驳回经费下拨申请',
        iconCls: 'icon-censor-reject',
        width: 320,
        labelWidth: 70,
        height: 180,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxRejectReson, this._textRejectRemark],
        buttons: [this._buttonReject, this._buttonClose]
    });
}
Ext.extend(Srims.fund.FundDescendCensorRejectWindow, Ext.Window, {})
