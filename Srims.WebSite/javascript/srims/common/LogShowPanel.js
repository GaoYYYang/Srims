
if (!Srims.common)
    Ext.namespace("Srims.common");

Srims.common.LogShowPanel = function(panelId, log, store) {
    this._log = log;
    this._formPanelBasic = new Srims.common.LogShowPanel_BasicForm(log);
    //constructor
    Srims.common.LogShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: '日志查看——' + this._log.get('action'),
        iconCls: 'icon-show',
        tbar: this._ToolBar,
        items: [this._formPanelBasic]
    });
}
Ext.extend(Srims.common.LogShowPanel, Ext.Panel, {});


Srims.common.LogShowPanel_BasicForm = function(log) {
    this._log = log;
    this._fieldUser = new Ext.form.Field({
        fieldLabel: '用户名称',
        value: log.get('user'),
        readOnly: true,
        width: 160
    });
    this._fieldTime = new Ext.form.Field({
        fieldLabel: '写入时间',
        value: log.get('dateTime'),
        readOnly: true,
        width: 510
    });
    this._fieldIP = new Ext.form.Field({
        fieldLabel: 'IP地址',
        value: log.get('userIP'),
        readOnly: true,
        width: 160
    });
    this._fieldAction = new Ext.form.Field({
        fieldLabel: '操作',
        value: log.get('action'),
        readOnly: true,
        width: 510
    });
    this._textDescription = new Ext.form.TextArea({
        fieldLabel: '操作描述',
        scroll: true,
        value: log.get('description'),
        readOnly: true,
        height: 220,
        width: 850
    });
    //constructor
    Srims.common.LogShowPanel_BasicForm.superclass.constructor.call(this, {
        title: '日志详细信息',
        collapsible: true,
        //autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldUser, this._fieldTime, this._fieldIP, this._fieldAction, this._textDescription]
    });

}
Ext.extend(Srims.common.LogShowPanel_BasicForm, Ext.form.FormPanel, {});