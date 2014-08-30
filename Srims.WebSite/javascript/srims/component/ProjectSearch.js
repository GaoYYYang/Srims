
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.ProjectSearch = function(){
}
Srims.component.ProjectSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'borrowAmount',
    type: 'int',
    mapping: 'BorrowAmount'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'returnAmount',
    type: 'int',
    mapping: 'ReturnAmount'
}]);

Srims.component.ProjectSearch.Store = function(isReturn){
    Srims.component.ProjectSearch.Store.superclass.constructor.call(this, {
        url: isReturn == undefined ? Srims.service.projects.ProjectService + '/Search' : isReturn ? Srims.service.projects.ProjectService + '/SearchForReturn' : Srims.service.projects.ProjectService + '/SearchForFundDescend',
        reader: new Ext.data.XmlReader({
            record: 'Record',
            idProperty: 'ID'
        }, Srims.component.ProjectSearch.Record)
    })
};
Ext.extend(Srims.component.ProjectSearch.Store, Ext.data.Store);

Srims.component.ProjectSearch.SearchComboBox = function(params){
    if (params.isReturn == undefined) 
        params.tpl = new Ext.XTemplate('<table border="1" class="searchTable" cellpadding="0" cellspacing="0"><tr><td>项目名称</td><td>项目编号</td><td>负责人</td></tr>', '<tpl for="."><tr class="search-item" style="padding: 1px">', '<td style="width:300px">{name}</td><td style="width:120px">{number}</td><td style="width:60px">{principal}</td>', '</tr></tpl>', '</table>');
    else 
        if (params.isReturn) 
            params.tpl = new Ext.XTemplate('<table border="1" class="searchTable" cellpadding="0" cellspacing="0"><tr><td>项目名称</td><td>项目编号</td><td>负责人</td><td>借款金额</td><td>已还金额</td></tr>', '<tpl for="."><tr class="search-item" style="padding: 1px">', '<td style="width:300px">{name}</td><td style="width:120px">{number}</td><td style="width:60px">{principal}</td> <td style="width:60px">{[Money.render(values.borrowAmount)]}</td><td style="width:60px">{[Money.render(values.returnAmount)]}</td>', '</tr></tpl>', '</table>');
        else 
            params.tpl = new Ext.XTemplate('<table border="1" class="searchTable" cellpadding="0" cellspacing="0"><tr><td>项目名称</td><td>项目编号</td><td>负责人</td><td>到校经费</td><td>可下拨金额</td></tr>', '<tpl for="."><tr class="search-item" style="padding: 1px">', '<td style="width:300px">{name}</td><td style="width:120px">{number}</td><td style="width:60px">{principal}</td> <td style="width:60px">{[Money.render(values.fundTotal)]}</td><td style="width:80px">{[Money.render(values.fundCanDescend)]}</td>', '</tr></tpl>', '</table>');
    
    params.store = new Srims.component.ProjectSearch.Store(params.isReturn);
    Srims.component.ProjectSearch.SearchComboBox.superclass.constructor.call(this, params);
};
Ext.extend(Srims.component.ProjectSearch.SearchComboBox, Srims.component.EntitySearch.SearchComboBox, {
    displayField: 'name',
    listWidth: 620,
    itemSelector: 'tr.search-item',
    onRender: function(B, A){
        var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
        
        new Ext.ToolTip({
            target: this.getId(),
            html: '您可以通过输入项目<span style="color: Red;">名称，编号</span>或负责人<span style="color: Red;">姓名首字母缩写</span>查找并选择项目'
        });
        return result;
    }
});
