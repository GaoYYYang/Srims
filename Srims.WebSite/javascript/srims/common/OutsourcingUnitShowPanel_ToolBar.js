/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace(Srims.common);
Srims.common.OutsourcingUnitShowPanel_ToolBar = function(outsourcing, panelID,store) {
	this._outsourcing = outsourcing;
	this._panelID = panelID;
	this._store=store;

	this._buttonEdit = new Ext.Toolbar.Button({
				iconCls : 'icon-edit',
				text : '编辑',
				minWidth : 60,
				outsourcing : this._outsourcing,
				store:this._store,
				handler : function() {
					if (!this.outsourcing)
						return;
					Srims.common.EditOutsourcing(this.outsourcing,this.store);
				},
				hidden : true,
				tooltip : '<b>编辑外协单位</b><br/>编辑外协单位的名称、地址、电话、负责人、负责人邮箱等详细信息'
			})
	this._buttonDelete = new Ext.Toolbar.Button({
		iconCls : 'icon-delete',
		text : '删除',
		minWidth : 60,
		outsourcing : this._outsourcing,
		store:this._store,
		handler : function() {
			if (!this.outsourcing)
				return;
			Srims.common.DeleteOutsourcing(this.outsourcing,this.store);
		},
		hidden : true,
		tooltip : '<b>删除该外协单位</b><br/>删除该外协单位所有信息'
	});
	this._buttonRefresh = new Ext.Toolbar.Button({
		iconCls : 'icon-refresh',
		text : '刷新',
		minWidth : 60,
		outsourcing : this._outsourcing,
		panelID:this._panelID,
		handler : function() {
			var params = {};
			params.id = this.outsourcing.get('id');
			Ext.Ajax.request({
						url : Srims.service.common.OutsourcingService
								+ '/GetById',
						params : params,
						scope : this,
						success : function(response) {
							var store = new Ext.data.Store({
										data : response.responseXML,
										reader : new Srims.common
												.OutsourcingXmlReader()
									});
							var currentOutsourcing = store.getAt(0);
							var panel = Ext.getCmp(this.panelID)
							panel.resetComponentValue(currentOutsourcing);
							panel._toolBar
									._resetButtonVisibleAndDisabled(currentOutsourcing);
							panel._toolBar._resetButtonOutsourcing(currentOutsourcing);
						}
					});
		},
		tooltip : '<b>刷新外协单位信息</b><br/>刷新外协单位全部信息'
	});
	var buttonItems = [this._buttonEdit, this._buttonDelete, new Ext.Toolbar.Fill(),
			this._buttonRefresh];
	Srims.common.OutsourcingShowPanel_ToolBar.superclass.constructor.call(this,
			{
				items : buttonItems,
				height : 25
			});
	// 重设button属性
	this._resetButtonVisibleAndDisabled = function(outsourcing) {
		this._buttonEdit.setVisible(outsourcing.get('hasPermission_Edit'));
		this._buttonEdit.setDisabled(!outsourcing.get('canEdit'));

		this._buttonDelete.setVisible(outsourcing.get('hasPermission_Delete'));
		this._buttonDelete.setDisabled(!outsourcing.get('canDelete'));
	}
	this._resetButtonOutsourcing = function(outsourcing) {
		this._buttonEdit.outsourcing = outsourcing;
		this._buttonDelete.outsourcing = outsourcing;
		this._buttonRefresh.outsourcing = outsourcing;
	}
	this._resetButtonVisibleAndDisabled(this._outsourcing);
}
Ext.extend(Srims.common.OutsourcingUnitShowPanel_ToolBar, Ext.Toolbar);