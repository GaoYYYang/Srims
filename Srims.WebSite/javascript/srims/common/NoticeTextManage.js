
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.noticeTextManage = function(){
    Srims.common._noticeTextManage('NoticeText', 'icon-noticetext', '提示文本管理');
}
Srims.common._noticeTextManage = function(id, iconCls, name){
    var panelId = id;
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.common.NoticeTextManagePanel(panelId);
    Srims.WorkSpace.addPanel(panel);
}
