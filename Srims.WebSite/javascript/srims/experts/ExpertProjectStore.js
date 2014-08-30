
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertProjectStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.ExpertStore.superclass.constructor.call(this, new Srims.experts.ExpertProjectXmlReader(), load_url, params);
    }
})

Srims.experts.projectLevelRender = function(value, metadata){
    switch (value) {
        case 'Join':
            return '参与';
        case 'Perside':
            return '主持';
        case 'Addition':
            return '附加';
        default:
            return '未知';
    }
}
