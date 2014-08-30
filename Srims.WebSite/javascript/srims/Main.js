Srims.Main = new function() {
}
//var projectOutAmount = 0;
Srims.Main.render = function() {

	this._viewport = new Ext.Viewport({
		layout: 'border',
		items: [Srims.TopBar.getTopBar(), Srims.MenuBar.getMenuBar(), Srims.WorkSpace.getWorkSpace()]
	});

	//执行轮询
	Srims.Poll.startPolls()

	var ab = Srims.MenuBar.getMenuBar().body;
	ab.on('mousedown', Srims.Action.doAction, null, {
		delegate: 'a'
	});
	ab.on('click', Ext.emptyFn, null, {
		delegate: 'a',
		preventDefault: true
	});
};