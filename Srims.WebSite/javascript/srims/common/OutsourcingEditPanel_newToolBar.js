

if (!Srims.common)
    Ext.namespace('Srims.common');

if (!Srims.documents)
    Ext.namespace('Srims.documents');


Srims.common.OutsourcingEditPanel_newToolBar = function(panel) {

    //fields
    this._panel = panel;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传外协单位文档',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
            //Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store);
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：企业法人证书、组织机构代码证、税务登记证</b>'
    });
    this._newTextLabel = new Ext.form.Label({
        style: "font-size:12px;color:blue",
        text: '上传外协单位文档，    '
    });
    this._PTextLabel = new Ext.form.Label({
        style: "font-size:12px;color:#FF0000",
        text: '         请注意：上传文件要求加盖对方单位的公章，以彩色扫描件形式上传！'
    });

    Srims.common.OutsourcingEditPanel_newToolBar.superclass.constructor.call(this, {
        items: [this._newTextLabel,this._PTextLabel]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_newToolBar, Ext.Toolbar);
