
if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.FileUploadWindow = function(id, store, importUrl, description, isMagazienInformation, outsourcing) {

    this._id = id;
    this._store = store;
    this._outsourcing = outsourcing;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '导 入',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            window.formPanel = window._formPanelData;
            window.store = window._store;
            window.outsourcing = window._outsourcing;

            var params = {};
            if (isMagazienInformation)
                params.year = window._numberFieldYear.getValue();

            window.formPanel.getForm().submit({
                params: params,
                url: importUrl,
                //                waitMsg: '正在导入数据，请耐心等候....',
                success: function(form, action) {
                    //                    //                success: function(response) {
                    //                    if (window.store)
                    //                        window.store.load();
                    var nam = action.result.data[0].name;
                    if (description == '企业法人证书') {
  
                        window.outsourcing.set('companyCard', nam);
                    }
                    if (description == '组织机构代码证')
                        window.outsourcing.set('groupCard', action.result.data[0].name);
                    if (description == '税务登记证')
                        window.outsourcing.set('taxCard', action.result.data[0].name);
                    Ext.Msg.show({
                        title: '成功导入数据',
                        msg: '导入数据成功',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });

                    window.close();
                }
            });
        }
    });
    this._fieldDesprition = new Ext.form.Field({
        fieldLabel: '说明',
        value: description,
        readOnly: true,
        width: 180
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 180,
        allowBlank: false
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'ImportData',
        fieldLabel: '选择数据文件',
        width: 180,
        emptyText: '请选择要导入的数据文件',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc', 'docx'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });

    var items = [];
    if (isMagazienInformation)
        items = [this._fieldDesprition, this._numberFieldYear, this._fileUploadField];
    else
        items = [this._fieldDesprition, this._fileUploadField];

    this._formPanelData = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        autoHeight: true,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: items
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        if (isMagazienInformation)
            result = this._numberFieldYear.isValid(preventMark) && result;

        return result;
    }

    Srims.component.FileUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: description,
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelData],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.component.FileUploadWindow, Ext.Window, {});
