/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingEditPanel = function(IsInformation, id, outsourcing, store, IsExpert) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._id = id;
    var clickTimes = 0;
    this._outsourcing = outsourcing;
    this._store = store;
    this._title = outsourcing.isNew() ? "新建外协单位" : '编辑外协单位-'
			+ outsourcing.get('name');
    this.importUrl = "";
    this._basicForm = new Srims.common.OutsourcingEditPanel_Basic(IsInformation, outsourcing); // 位于文件Srims.common.OutsourcingEditPanel_Basic.js中
    //this._documentForm = new Srims.common.OutsourcingEditPanel_Document(outsourcing);
    //this._tabDocument = new Srims.common.OutsourcingEditPanel_tabDocument(outsourcing);
    this._buttonSubmitDocument = new Srims.common.OutsourcingEditPanel_ToolBar(this);
    this._newbuttonSubmitDocument = new Srims.common.OutsourcingEditPanel_newToolBar(this);
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保存',
        panel: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 100,
        text: '重置',
        panel: this,
        handler: function() {
            var panel = this.panel;
            panel.clearParams();
        }
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
    Srims.common.OutsourcingEditPanel.superclass.constructor.call(this, {
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
        items: [this._basicForm, this._newbuttonSubmitDocument, this._buttonSubmitDocument],
        buttons: [this._buttonSave, this._buttonCanel]
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
        var Isexpert = IsExpert;
        outsourcing.beginEdit();
        this.assignValues();
        outsourcing.commit();
        if (userIsExpert)
            if (!(outsourcing.get('taxCard') && outsourcing.get('companyCard') && outsourcing.get('groupCard')))
            Ext.Msg.show({
                title: '提示',
                msg: '您有为填完的空或者未提交的文件！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        if (!userIsExpert)
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService + '/Save',
                params: outsourcing.data,
                scope: this,
                success: function(response) {
                    //if (this._store)
                    //  this._store.load();//reflesh grid
                    Srims.WorkSpace.getWorkSpace().remove(this);

                    var newStore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.common.OutsourcingXmlReader()
                    });

                    var newOutsourcing = newStore.getAt(0);

                    if (!Isexpert) {
                        if (!isNew) {
                            var panelID = 'OutsourcingShowPanel' + newOutsourcing.get('id');
                            if (Ext.getCmp(panelID))
                                Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);

                        }
                        var gridPanel = Ext.getCmp('OutourcingGridPanel');
                        if (gridPanel) {
                            Srims.WorkSpace.active('OutourcingGridPanel');
                            Ext.getCmp('OutourcingGridPanel').getStore().load();
                        }
                        Srims.common.ShowOutsourcing(newOutsourcing, newOutsourcing);
                    }
                    if (Isexpert) {
                        var projectOut = new Srims.projects.ProjectOut({ outSourcingName: newOutsourcing.get('name'), amount: '' });
                        store.insert(0, projectOut);
                        store.grid.startEditing(0, 0);
                    }
                }
            });

            if (userIsExpert)
                Ext.Ajax.request({
                    url: Srims.service.common.OutsourcingService + '/Save',
                    params: outsourcing.data,
                    scope: this,
                    success: function(response) {
                        if (this._store)
                            this._store.load(); //reflesh grid
                        Srims.WorkSpace.getWorkSpace().remove(this);
                    }
                });
    }
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;
        if (!panel.isValid(false))
            return;

        //        button.setText('正在保存');
        //        button.disable();
        panel.save();
    }

    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.OutsourcingEditPanel, Ext.Panel, {});