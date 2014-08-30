
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoGridGridPanel_ColumnModel = function(sm){
    Srims.experts.ExpertInfoGridGridPanel_ColumnModel.superclass.constructor.call(this, [sm, {
        header: 'id',
        hidden: true,
        hideable: false
    }, {
        header: '专家',
        dataIndex: 'expertName',
        hidden: false
    }, {
        header: '编辑字段',
        dataIndex: 'propertyName',
        renderer: Srims.experts.ExpertInfoHistoryPropertyValueNameRender,
        hidden: false
    }, {
        header: '字段类型',
        dataIndex: 'propertyValueType',
        renderer: Srims.experts.ExpertInfoHistoryPropertyValueTypeRender,
        hidden: false
    }, {
        header: '字段旧值',
        dataIndex: 'propertyOldValue',
        hidden: false
    }, {
        header: '字段新值',
        dataIndex: 'propertyValue',
        hidden: false
    }, {
        header: '字段新值说明',
        dataIndex: 'propertyValueRender',
        hidden: false
    }]);
};
Ext.extend(Srims.experts.ExpertInfoGridGridPanel_ColumnModel, Ext.grid.ColumnModel);
