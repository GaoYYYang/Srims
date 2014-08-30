
if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.MagazineSearch = function(){
}
Srims.component.MagazineSearch.SearchComboBox = Ext.extend(Srims.component.EntitySearch.SearchComboBox, {
    displayField: 'fullName',
    tpl: new Ext.XTemplate('<tpl for="."><div class="search-item" style="padding: 1px">', '{fullName},{shortName},{ISSN}', '</div></tpl>'),
    onRender: function(B, A) {
        var result = Srims.component.EntityComboBox.superclass.onRender.call(this, B, A);
        new Ext.ToolTip({
            target: this.getId(),
            html: '您可以通过输入杂志<span style="color:Red;">全称</span>或简称<span style="color:Red;">或ISSN</span>查找并选择杂志'
        });
        return result;
    }
});
