if (!Srims.component)
	Ext.namespace('Srims.component');

Srims.component.ExpertSearch = function() {
}
Srims.component.ExpertSearch.Record = Ext.data.Record.create([{
	name: 'id',
	type: 'int',
	mapping: 'ID'
},{
	name: 'name',
	type: 'string',
	mapping: 'Name'
},{
	name: 'number',
	type: 'string',
	mapping: 'Number'
},{
	name: 'college',
	type: 'string',
	mapping: 'College'
},{
	name: 'college2',
	type: 'string',
	mapping: 'College2'
},{
	name: 'post',
	type: 'string',
	mapping: 'Post'
}]);
Srims.component.ExpertSearch.Store = Ext.extend(Ext.data.Store, {
	url: Srims.service.experts.ExpertService + '/SearchExpert',
	reader: new Ext.data.XmlReader({
		record: 'Record',
		idProperty: 'ID'
	}, Srims.component.ExpertSearch.Record)
});
Srims.component.ExpertSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
	store: new Srims.component.ExpertSearch.Store(),
	displayField: 'name',
	tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{name}({number}): {college} {post}', '</div></tpl>'),
	onRender: function(B, A) {
		var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);

		new Ext.ToolTip({
			target: this.getId(),
			html: '您可以通过输入专家<span style="color: Red;">姓名</span>或专家<span style="color: Red;">姓名首字母缩写</span>查找并选择专家'
		});

		return result;
	}
})