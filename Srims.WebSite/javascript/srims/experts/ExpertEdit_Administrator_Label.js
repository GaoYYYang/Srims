
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.ExpertUploadWindow = function(id, expert) {

    this._id = id;
    this._expert = expert;

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
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
                expertID: window._expert.get('id')
            }

            window._formPanelExpertPhoto.getForm().submit({
                params: saveParams,
                url: Srims.service.experts.ExpertService + '/UpLoadImage',
                waitMsg: '正在上传专家照片',
                scope: this,
                success: function(form, action) {
                    var jsonData = Ext.util.JSON.decode(action.response.responseText);
                    var photoPath = jsonData.guid;

                    if (Ext.getDom('SpanExpertImg_' + expert.get('id')))
                        Ext.getDom('SpanExpertImg_' + expert.get('id')).innerHTML = '';

                    Ext.getDom('ImgExpert_' + expert.get('id')).src = '../' + photoPath;

                    //执行其他操作

                    window.close();
                }
            });
        }
    });
    this._fieldAbstract = new Ext.form.Field({
        fieldLabel: '编辑字段',
        value: '专家照片',
        readOnly: true,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadContract',
        fieldLabel: '上传照片',
        width: 160,
        emptyText: '请选择要上传的专家照片',
        allowBlank: false,
        fileTypes: ['jpg', 'gif'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelExpertPhoto = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fieldAbstract, this._fileUploadField]
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;

        return result;
    }

    Srims.experts.ExpertUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传专家照片',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelExpertPhoto],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.experts.ExpertUploadWindow, Ext.Window, {})
