
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectCensorRejectWindow = function(id, project, isStart){

    this._id = id;
    this._project = project;
    this._isStart = isStart;
    
    this._buttonReject = new Ext.Button({
        minWidth: 80,
        text: '驳回',
        window: this,
        handler: function(){
            var window = this.window;
            var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '(' + window._textRejectRemark.getValue() + ')';
            
            if (window._isStart) 
                Ext.MessageBox.show({
                    title: '审核驳回立项申请',
                    msg: '您需要同时审核驳回该项目的合同和文档吗？<br />点击“是”按钮，同时审核驳回项目的合同和文档；<br />点击“否”按钮，仅审核驳回项目的立项申请;<br />点击“取消”按钮，取消审核项目的立项申请。',
                    buttons: Ext.MessageBox.YESNOCANCEL,
                    scope: this,
                    fn: function(button){
                        if (button == 'yes') 
                            Srims.projects.censorStart_Reject(window._project, remark, true);
                        if (button == 'no') 
                            Srims.projects.censorStart_Reject(wndow._project, remark, false);
                    },
                    icon: Ext.MessageBox.QUESTION
                });
            else 
                Srims.projects.censortEnd_Reject(window._project, remark);
            
            window.close();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
        fieldLabel: '驳回理由',
        noticeTextType: 'ProjectCensorRejectReason',
        listWidth: 160,
        width: 130
    });
    this._textRejectRemark = new Ext.form.TextArea({
        fieldLabel: '详细说明',
        height: 60,
        width: 200
    });
    
    Srims.projects.ProjectCensorRejectWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._isStart ? '驳回项目立项申请' : '驳回项目结项申请',
        iconCls: 'icon-censor-reject',
        width: 320,
        labelWidth: 70,
        height: 180,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxRejectReson, this._textRejectRemark],
        buttons: [this._buttonReject, this._buttonClose]
    });
}
Ext.extend(Srims.projects.ProjectCensorRejectWindow, Ext.Window, {})
