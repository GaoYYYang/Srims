if (!Srims.common)
    Ext.namespace('Srims.common');
Srims.common.OutsourcingCensorRejectWindow = function(id, outsourcing) {
this._id = id;
this._outsourcing = outsourcing;

this._buttonReject = new Ext.Button({
    minWidth: 80,
    text: '驳回',
    window: this,
    handler: function() {
        var window = this.window;
        var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '(' + window._textRejectRemark.getValue() + ')';

            Ext.MessageBox.show({
                title: '审核驳回立项申请：外协单位的添加',
                msg: '您确定驳回该外协单位的添加吗？<br />点击“是”按钮，驳回该外协单位；<br />点击“否”按钮，取消审核外协单位的立项申请。',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                fn: function(button) {
                    if (button == 'yes')
                        Srims.common.censorStart_Reject(window._outsourcing, remark);
                },
                icon: Ext.MessageBox.QUESTION
            });

        window.close();
    }
});
this._buttonClose = new Ext.Button({
    minWidth: 80,
    text: '取消',
    window: this,
    handler: function() {
        var window = this.window;
        window.close();
    }
});
this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
    fieldLabel: '驳回理由',
    noticeTextType: 'ProjectCensorRejectReason',
    listWidth: 160,
    width: 130
});
this._textRejectRemark = new Ext.form.TextArea({
    fieldLabel: '详细说明',
    height: 60,
    width: 200
});

Srims.common.OutsourcingCensorRejectWindow.superclass.constructor.call(this, {
    id: this._id,
    title:  '驳回项目立项申请:外协单位的添加' ,
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
Ext.extend(Srims.common.OutsourcingCensorRejectWindow, Ext.Window, {});