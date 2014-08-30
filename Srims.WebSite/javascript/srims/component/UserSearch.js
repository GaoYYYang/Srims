
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.UserSearch = function(){
}
Srims.component.UserSearch.Record = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'email',
    type: 'string',
    mapping: 'Email'
}, {
    name: 'officePhone',
    type: 'string',
    mapping: 'OfficePhone'
}]);
Srims.component.UserSearch.Store = Ext.extend(Ext.data.Store, {
    url: Srims.service.users.UserService + '/SearchUser',
    reader: new Ext.data.XmlReader({
        record: 'Record',
        idProperty: 'ID'
    }, Srims.component.UserSearch.Record)
});
Srims.component.UserSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
    store: new Srims.component.UserSearch.Store(),
    displayField: 'name',
    tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{name}', '<tpl if="this.isEmpty(email)==false">', ':邮箱 {email}', '</tpl>', '<tpl if="this.isEmpty(officePhone)==false">', ',电话 {officePhone}', '</tpl>', '</div></tpl>', {
        isEmpty: function(str){
            return String.isEmpty(str);
        }
    }),
    onRender: function(B, A){
        var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
        
        new Ext.ToolTip({
            target: this.getId(),
            html: '您可以通过输入用户<span style="color:Red;">姓名</span>或用户<span style="color:Red;">姓名首字母拼音</span>查找并选择用户'
        });
        return result;
    }
});
