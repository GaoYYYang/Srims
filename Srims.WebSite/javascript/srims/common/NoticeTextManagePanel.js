
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextManagePanel = function(panelId){
    this._id = panelId;
    this._title = "提示文本管理";
    var noticeTextCountPerRow = 3;
    
    this._formPanelNoticeTextInforManage = new Srims.common.NoticeTextInforManage(noticeTextCountPerRow);
    
    this._buttonAddNoticeText = new Ext.Button({
        minWidth: 100,
        text: '新建提示文本',
        panel: this._formPanelNoticeTextInforManage
    });
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    Srims.common.NoticeTextManagePanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        frame: true,
        layout: 'form',
        buttonAlign: 'center',
        title: this._title,
        iconCls: 'icon-notice-text-manage',
        items: [this._formPanelNoticeTextInforManage],
        buttons: [this._buttonAddNoticeText, this._buttonSave]
    });
    this._onButtonAddNoticeText_Click = function(button, e){
        if (this.panel._comboBoxNoticeText.getValue() == '' || this.panel._comboBoxNoticeText.getValue() == undefined) {
            Ext.Msg.show({
                title: '新建提示文本错误',
                msg: '请先选择提示文本类型',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        this.panel.items.add(this.panel.items.length, new Srims.common.NoticeTextInforManageForAddText(undefined, noticeTextCountPerRow));
        this.panel.doLayout();
    };
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelNoticeTextInforManage.isValid(preventMark) && result;
        return result;
    }
    this._buttonSave_Click = function(button, e){
        var noticeTexts = this.panel._formPanelNoticeTextInforManage.getNoticeTexts();
        var panel = button.panel;
        if (!panel.isValid(false)) 
            return;
        
        Ext.Ajax.request({
            url: Srims.service.common.NoticeTextService + '/Save',
            scope: this,
            params: {
                type: this.panel._formPanelNoticeTextInforManage._comboBoxNoticeText.getValue(),
                value: noticeTexts
            },
            success: function(){
                Ext.Msg.show({
                    title: '保存成功',
                    msg: '提示文本保存成功',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        });
    }
    this._buttonAddNoticeText.on('click', this._onButtonAddNoticeText_Click);
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.common.NoticeTextManagePanel, Ext.Panel, {});
