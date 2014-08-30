if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampAdminMemberEditWindow = function(id, stampAdminMember, stampApplicationType, store, sign) {

    this._sign = sign;
    this._id = id;
    this._stampAdminMember = stampAdminMember;
    this._stampApplicationType = stampApplicationType;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });

    this._comboBoxExpert = new Srims.component.AdministratorSearch.SearchComboBox({
        fieldLabel: '管理员',
        width: 140,
        value: this._stampAdminMember.get('Name'),
        selectEntityId: this._stampAdminMember.get('UserID'),
        allowBlank: false
    });

    Srims.stamp.StampAdminMemberEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '编辑一级审核管理员信息',
        width: 300,
        labelWidth: 70,
        height: 200,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._comboBoxExpert],
        buttons: [this._buttonSave, this._buttonClose]
    });


    this._isValid = function(preventMark) {
        var result = true;
        result = this._comboBoxExpert.isValid(preventMark) && result;
        return result;
    }
    var params = {};
    this._assignValues = function(params) {
        params.StampApplicationTypeID = this._stampApplicationType.get('id');
        params.UserID = this._comboBoxExpert.getValue();

    }
    this._save = function() {
        var stampAdminMember = this._stampAdminMember;
        stampAdminMember.beginEdit();
        this._assignValues(params);
        stampAdminMember.commit();
        if (this._sign) {
            Ext.Ajax.request({
                url: Srims.service.stamp.StampFirstAdminService + '/Save',
                params: { StampApplicationTypeID: params.StampApplicationTypeID, UserID: params.UserID },
                scope: this,
                success: function() {
                    this._store.load();
                    this.close();
                }
            });
        }
        else {
            Ext.Ajax.request({
                url: Srims.service.stamp.StampSecondAdminService + '/Save',
                params: { StampApplicationTypeID: params.StampApplicationTypeID, UserID: params.UserID },
                scope: this,
                success: function() {
                    this._store.load();
                    this.close();
                }
            });
        }
    }
    this._buttonSave_Click = function(button) {
        var window = button.window;

        if (!window._isValid(false))
            return;

        button.setText('正在保存');
        button.disable();

        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.stamp.StampAdminMemberEditWindow, Ext.Window, {});
