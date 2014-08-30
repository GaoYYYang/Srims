if (!Srims.stamp)
	Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationQueryWindow = function(id, store, queryParams, stampState) {
	this._id = id;
	this._store = store;
	this._params = queryParams;

	this._basicPanel = new Srims.stamp.StampApplicationQueryWindow_BasicPanel(stampState);
	this._principalPanel = new Srims.stamp.StampApplicationQueryWindow_PrincipalPanel();

	this._buttonShowAll = new Ext.Button({
		minWidth: 80,
		text: '显示全部',
		window: this,
		handler: function() {
			this.window.clearParams();
			queryParams = this.window.getParams();
			this.window._store.load();
			this.window.hide();
		}
	});
	this._buttonQuery = new Ext.Button({
		minWidth: 80,
		text: '查 询',
		window: this,
		handler: function() {
			var window = this.window;
			queryParams = window.getParams();
			window._store.load();
			window.hide();
		}
	});
	this._buttonReset = new Ext.Button({
		minWidth: 80,
		text: '重 置',
		window: this,
		handler: function() {
			var window = this.window;
			window.clearParams();
		}
	});
	this._buttonClose = new Ext.Button({
		minWidth: 80,
		text: '关 闭',
		window: this,
		handler: function() {
			var window = this.window;
			window.hide();
		}
	});
	Srims.stamp.StampApplicationQueryWindow.superclass.constructor.call(this, {
		id: this._id,
		title: '文印查询',
		iconCls: 'icon-stamp-query',
		width: 723,
		style: 'padding:5px',
		deferredRender: false,
		frame: true,
		//autoHeight: true,
		height: stampState == undefined ? 435 : 380,
		closeAction: 'hide',
		layout: 'column',
		resizable: false,
		items: [new Ext.Panel({
			width: 700,
			layout: 'form',
			labelWidth: 100,
			autoHeight: false,
			height: 480,
			deferredRender: false,
			autoScroll: true,
			items: [this._basicPanel,this._principalPanel]
		})],
		buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
	});

	this.getParams = function() {
		var params = this._params;
		this._basicPanel.buildParams(params);
		this._principalPanel.buildParams(params);
		return params;
	}
	this.clearParams = function() {

		this._basicPanel.clearParams();
		this._principalPanel.clearParams();
	}
	this.query = function(button) {
		var window = button.window;
		window.getParams();

		Srims.SetQueryParams.removeNullparams(queryParams);
		window._store.load();
		window.hide();
	}
}
Ext.extend(Srims.stamp.StampApplicationQueryWindow, Ext.Window);