/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingUnitEditPanel = function(id, outsourcing, store) {
    this._id = id;
    this._outsourcing = outsourcing;
    this._store = store;
    this._title = outsourcing.isNew() ? "新建外协单位" : '编辑外协单位-'
			+ outsourcing.get('name');

    this._basicForm = new Srims.common.OutsourcingUnitEditPanel_Basic(outsourcing); // 位于文件Srims.common.OutsourcingsEditPanesls_Basic.js中

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
    Srims.common.OutsourcingUnitEditPanel.superclass.constructor.call(this, {
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
        buttons: [this._buttonSave, this._buttonReset,
						this._buttonCanel]
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
            url: Srims.service.common.OutsourcingUnitService + '/Save',
            params: outsourcing.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.common.OutsourcingUnitXmlReader()
                });
                var newOutsourcing = newStore.getAt(0);
                if (!isNew) {
                    var panelID = 'OutsourcingUnitShowPanel'
									+ newOutsourcing.get('id');
                    if (Ext.getCmp(panelID))
                        Srims.WorkSpace.getWorkSpace().remove(
										Ext.getCmp(panelID), true);
                }

                Srims.common.ShowOutsourcingUnit(newOutsourcing);
            }
        });
    }
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;
        if (!panel.isValid(false))
            return;

        button.setText('正在保存');
        button.disable();
        panel.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.OutsourcingUnitEditPanel, Ext.Panel, {});