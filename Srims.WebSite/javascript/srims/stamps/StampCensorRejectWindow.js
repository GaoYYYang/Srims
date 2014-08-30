if (!Srims.stamp)
	Ext.namespace("Srims.stamp");

Srims.stamp.StampCensorRejectWindow = function(id, stampApplication, store, methodName,stampState) {

	this._id = id;
	this._stampApplication = stampApplication;
	this._store = store;
	this._stampState = stampState;
	this._methodName=methodName;

	this._buttonReject = new Ext.Button({
		minWidth: 80,
		text: '驳回',
		stampApplication: this._stampApplication,
		store: this._store,
		stampState: this._stampState,
		methodName:this._methodName,
		window: this,
		handler: function() {
			var window = this.window;
			var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '(' + window._textRejectRemark.getValue() + ')';
			var titile = '审核驳回';
			var message = '你确定要驳回此用印申请吗？';
			Srims.stamp.changeStampState(this.stampApplication, this.store, titile, message, this.methodName, this.stampState, remark);
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
		noticeTextType: 'StampRejectReason',
		listWidth: 160,
		width: 130
	});
	this._textRejectRemark = new Ext.form.TextArea({
		fieldLabel: '详细说明',
		height: 60,
		width: 200
	});

	Srims.stamp.StampCensorRejectWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '驳回文印申请',
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
Ext.extend(Srims.stamp.StampCensorRejectWindow, Ext.Window, {})