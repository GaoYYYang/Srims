Srims.WorkSpace = new function() {
}
Ext.ux.TabCloseMenu = function() {
	var tabs, menu, ctxItem;
	this.init = function(tp) {
		tabs = tp;
		tabs.on('contextmenu', onContextMenu);
	}
	function onContextMenu(ts, item, e) {
		if (!menu) { // create context menu on first right click
			menu = new Ext.menu.Menu([{
				id: tabs.id + '-close',
				text: '关闭该页',
				handler: function() {
					tabs.remove(ctxItem);
				}
			},{
				id: tabs.id + '-close-others',
				text: '关闭其他页',
				handler: function() {
					tabs.items.each( function(item) {
						if (item.closable && item != ctxItem) {
							tabs.remove(item);
						}
					});
				}
			},{
				id: tabs.id + '-close-all',
				text: '关闭所有页',
				handler: function() {
					tabs.items.each( function(item) {
						if (item.closable) {
							tabs.remove(item);
						}
					});
				}
			}]);
		}
		ctxItem = item;
		var items = menu.items;
		items.get(tabs.id + '-close').setDisabled(!item.closable);
		var disableOthers = true;
		tabs.items.each( function() {
			if (this != item && this.closable) {
				disableOthers = false;
				return false;
			}
		});
		items.get(tabs.id + '-close-others').setDisabled(disableOthers);
		menu.showAt(e.getPoint());
	}

};
Srims.WorkSpace.getWorkSpace = function() {

	if (Srims.WorkSpace._workSpace)
		return Srims.WorkSpace._workSpace;

	var items = [];

	var myUnReadMessagePanel = new Ext.form.FormPanel({
		collapsible: true,
		style: 'margin-bottom: 2px; width:100%',
		title: '未读短消息',
		frame: true,
		autoHeight: true,
		items: [{
			html: '<div id="divUnReadMesseages" style="width:100%"></div>'
		}]
	});

	if (Srims.currentUser.userRoleType == 'Expert') {
		items = [new Srims.ExpertNavigatePanel(), myUnReadMessagePanel];
	} else {
		items = [myUnReadMessagePanel];
	}

	Srims.WorkSpace._workSpace = new Ext.TabPanel({
		deferredRender: false,
		frame: true,
		enableTabScroll: true,
		autoScroll: true,
		defaults: {
			autoScroll: true
		},
		layoutOnTabChange: true,
		plugins: new Ext.ux.TabCloseMenu(),
		region: 'center',
		items: [{
			frame: true,
			title: '首页',
			style: 'padding:2px;',
			iconCls: 'icon-task',
			items: items
		}],
		activeItem: 0
	});

	return Srims.WorkSpace._workSpace;
}
Srims.WorkSpace.active = function(panelId) {
	var workSpace = Srims.WorkSpace.getWorkSpace();
	var panel = workSpace.findById(panelId);
	if (panel) {
		workSpace.scrollToTab(panel, true);
		workSpace.setActiveTab(panel);
		return panel;
	}

	return undefined;
}
Srims.WorkSpace.addPanel = function(panel) {
	var workSpace = Srims.WorkSpace.getWorkSpace();
	workSpace.add(panel);
	workSpace.doLayout();
	workSpace.scrollToTab(panel, true);
	workSpace.setActiveTab(panel);
};