

if (!Srims.common)
    Ext.namespace('Srims.common');

if (!Srims.documents)
    Ext.namespace('Srims.documents');


Srims.common.OutsourcingEditPanel_ToolBar = function(panel) {

    //fields
    this._panel = panel;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传企业法人证书',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '企业法人证书');
    },
        hidden: false,
        tooltip: '<b>上传外协单位文档：企业法人证书</b>'
    });
    this._buttonupOrganizationCodeLoadDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传组织机构代码证',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '组织机构代码证');
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：组织机构代码证</b>'
    });
    this._buttonupTaxLoadDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传税务登记证',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '税务登记证');
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：税务登记证</b>'
    });

    Srims.common.OutsourcingEditPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitMainContract,this._buttonupOrganizationCodeLoadDocument,this._buttonupTaxLoadDocument]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_ToolBar, Ext.Toolbar);
