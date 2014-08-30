
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertEditPanel_MessagePanel = function() {
    Srims.experts.ExpertEditPanel_MessagePanel.superclass.constructor.call(this, {
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: true,
        html: '<span style="color:#FF0000">注意：您已经进入了编辑状态。您可以对‘基本信息’中未进行加灰处理的字段进行编辑，点击您想编辑的字段，即可在弹出的编辑框完成编辑。点击‘结束编辑’按钮退出编辑。</span>'
    });
}
Ext.extend(Srims.experts.ExpertEditPanel_MessagePanel, Ext.Panel);