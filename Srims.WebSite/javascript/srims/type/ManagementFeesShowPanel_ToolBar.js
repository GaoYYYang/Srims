if (!Srims.type)
	Ext.namespace("Srims.type");

Srims.type.ManagementFeesShowPanel_ToolBar = function(managementFee, store) {
	// field
	this._managementFee = managementFee;
	this._store = store;

	// controls
	this._buttonEdit = new Ext.Toolbar.Button({
				iconCls : 'icon-edit',
				text : '编辑',
				minEidth : 60,
				managementFee : this._managementFee,
				store : this._store,
				handler : function() {
					Srims.type
							.editManagementFee(this.managementFee, this.store);
				}
			});
	this._buttonDelete = new Ext.Toolbar.Button({
				iconCls : 'icon-delete',
				text : '删除',
				minEidth : 60,
				managementFee : this._managementFee,
				store : this._store,
				handler : function() {
					Srims.type.deleteManagementFee(this.managementFee,
							this.store)
				},
				//hidden : true,
				tooltip : '<b>删除类别信息</b>'
			});

	Srims.type.ManagementFeesShowPanel_ToolBar.superclass.constructor.call(
			this, {
				items : [this._buttonEdit,this._buttonDelete]
			});

	// 权限控制 未完成
}
Ext.extend(Srims.type.ManagementFeesShowPanel_ToolBar, Ext.Toolbar);