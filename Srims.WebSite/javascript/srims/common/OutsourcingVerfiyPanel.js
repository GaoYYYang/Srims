/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingVerfiyPanel = function(IsInformation,id, outsourcing, store) {
    this._id = id;
    var clickTimes = 0;
    this._outsourcing = outsourcing;
    this._store = store;
    this._title = outsourcing.isNew() ? "新建外协单位" : '编辑外协单位-'
			+ outsourcing.get('name');

    this._basicForm = new Srims.common.OutsourcingEditPanel_Basic(IsInformation,outsourcing); // 位于文件Srims.common.OutsourcingEditPanel_Basic.js中
    this._buttonDownFile = new Ext.Button({
        minWidth: 100,
        text: '下载企业法人证书',
        panel: this,
        outsourcing: this._outsourcing,
        handler: function() {
            var id = outsourcing.get('id');
                Srims.documents.downLoadResource(id, '/GetOutSoucingFile1');
        }
    });
    this._buttonDownFile2 = new Ext.Button({
        minWidth: 100,
        text: '下载组织机构代码证',
        panel: this,
        outsourcing: this._outsourcing,
        handler: function() {
            var id = outsourcing.get('id');
                Srims.documents.downLoadResource(id, '/GetOutSoucingFile2');
        }
    });
    this._buttonDownFile3 = new Ext.Button({
        minWidth: 100,
        text: '下载税务登记证',
        panel: this,
        outsourcing: this._outsourcing,
        handler: function() {
            var id = outsourcing.get('id');
                Srims.documents.downLoadResource(id, '/GetOutSoucingFile3');
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '审核通过',
        panel: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 100,
        text: '驳回',
        outsourcing: this._outsourcing,
        panel: this//,
        //        handler: function() {
        //            var panel = this.panel;
        //            panel.clearParams();
        //        }
    });
    this._buttonCanel = new Ext.Button({
        minWidth: 100,
        text: '取消',
        panel: this,
        handler: function() {
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });
    if (this._outsourcing.get('isVerify') != "审核驳回")
        var items = [this._buttonDownFile, this._buttonDownFile2, this._buttonDownFile3, this._buttonSave, this._buttonReset, this._buttonCanel];
    if (this._outsourcing.get('isVerify') == "审核驳回")
        var items = [this._buttonDownFile, this._buttonDownFile2, this._buttonDownFile3, this._buttonSave, this._buttonCanel];
    
    Srims.common.OutsourcingVerfiyPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px;width:1200px;',
        closable: true,
        frame: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._title,
        iconCls: this._outsourcing.isNew()
						? 'icon-outsourcing-new'
						: 'icon-outsourcing-edit',
        items: [this._basicForm],
        buttons: items
    });
    // method
    this.assignValues = function() {
        this._basicForm.assignValues();
    }
    this.clearParams = function() {
        this._basicForm.clearParams();
    }
    this.isValid = function(preventMark) {
        var result = true;

        result = this._basicForm.isValid(preventMark) && result;

        return result;
    }
    this.save = function() {
        var outsourcing = this._outsourcing;
        var isNew = this._outsourcing.isNew();

        outsourcing.beginEdit();
        this.assignValues();
        outsourcing.commit();

        Ext.Ajax.request({
            url: Srims.service.common.OutsourcingService + '/Verfiy',
            params: outsourcing.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.common.OutsourcingXmlReader()
                });
                var newOutsourcing = newStore.getAt(0);
                if (!isNew) {
                    var panelID = 'OutsourcingShowPanel'
									+ newOutsourcing.get('id');
                    if (Ext.getCmp(panelID))
                        Srims.WorkSpace.getWorkSpace().remove(
										Ext.getCmp(panelID), true);
                    var gridPanel = Ext.getCmp('OutourcingGridPanel');
                    if (gridPanel) {
                        Srims.WorkSpace.active('OutourcingGridPanel');
                        Ext.getCmp('OutourcingGridPanel').getStore().load();
                    }
                }

                Srims.common.ShowOutsourcing(newOutsourcing);
            }
        });
    }
    this.resetsave = function() {
        var outsourcing = this._outsourcing;
        var isNew = this._outsourcing.isNew();

        outsourcing.beginEdit();
        this.assignValues();
        outsourcing.commit();

        Ext.Ajax.request({
            url: Srims.service.common.OutsourcingService + '/DisVerfiy',
            params: outsourcing.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.common.OutsourcingXmlReader()
                });
                var newOutsourcing = newStore.getAt(0);
                if (!isNew) {
                    var panelID = 'OutsourcingShowPanel'
									+ newOutsourcing.get('id');
                    if (Ext.getCmp(panelID))
                        Srims.WorkSpace.getWorkSpace().remove(
										Ext.getCmp(panelID), true);
                }

                Srims.common.ShowOutsourcing(newOutsourcing);
            }
        });
    }
    this.down = function() {
        var outsourcing = this._outsourcing;
        var isNew = this._outsourcing.isNew();

        Srims.common.outsourcing.downLoadDocument(this._id);

    }
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;
        if (!panel.isValid(false))
            return;
        button.disable();
        panel.save();
    }
    this._onButtonReset_Click = function(button, e) {
        var panel = button.panel;

        Srims.common.rejectOutsourcingCensor(this.outsourcing);
        button.disable();
        //panel.resetsave();
    }
    this._onbuttonDownFile_Click = function(button, e) {
        var outsourcing = this._outsourcing;

        button.disable();

    }
    this._buttonSave.on('click', this._onButtonSave_Click);

    this._buttonReset.on('click', this._onButtonReset_Click);

}
Ext.extend(Srims.common.OutsourcingVerfiyPanel, Ext.Panel, {});