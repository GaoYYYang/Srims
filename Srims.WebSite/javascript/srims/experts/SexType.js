
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.SexType = function() {
}
Srims.experts.SexType.store = [['Man', '男'], ['Women', '女']];

Srims.experts.SexType.render = function(v) {
    return v == 'Man' ? '男' : '女';
}
