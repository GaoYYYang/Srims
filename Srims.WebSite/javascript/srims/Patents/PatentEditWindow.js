if (!Srims.patents)
    Ext.namespace('Srims.patents');

Srims.patents.PatentEditWindow = function(panelId, patent) {
    this._patent = patent;
    this._params = {};
    this._id = panelId;

    this._basicPanel = new Srims.patents.PatentEditWindow_BasicPanel(patent);
    this._basicPanel_MustWriteItems = new Srims.patents.PatentEditWindow_BasicPanel_MustWrite(patent);

    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonCancle = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
            window.close();
        }
    });

    Srims.patents.PatentEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: patent.isNew() ? "添加专利" : "编辑专利",
        iconCls: patent.isNew() ? 'icon-patent-new' : 'icon-edit',
        width: 608,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 585,
            layout: 'form',
            labelWidth: 100,
            deferredRender: false,
            items: [this._basicPanel_MustWriteItems, this._basicPanel]
        })],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancle]
    });

    //method
    this.assignValues = function() {
        this._basicPanel_MustWriteItems.assignValues();
        this._basicPanel.assignValues();
    }
    this.clearParams = function() {
        this._basicPanel_MustWriteItems.clearParams();
        this._basicPanel.clearParams();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._basicPanel_MustWriteItems.isValid(preventMark) && result;
        result = this._basicPanel.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var patent = this._patent;
        var isNew = this._isNew;
        patent.beginEdit();
        this.assignValues();
        patent.commit();

        Ext.Ajax.request({
            url: Srims.service.patents.PatentService + '/SavePatent',
            params: patent.data,
            scope: this,
            success: function(response) {
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.patents.PatentXmlReader()
                });
                var newPatent = store.getAt(0);
                if (isNew) {
                    //新建完，列表刷新，显示新建专利
                    Srims.WorkSpace.getWorkSpace().remove(this);
                    Srims.patents.listPatent(false, false);
                    Srims.patents.showPatent(newPatent);
                }
                else {
                    //编辑完，列表刷新，显示专利刷新
                    var panelID = 'PatentShowPanel' + patent.get('id');
                    Srims.WorkSpace.getWorkSpace().remove(this);
                    Srims.patents.listPatent(false, false);
                    if (Ext.getCmp(panelID)) Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    Srims.patents.showPatent(newPatent);
                }
            }
        })
    }

    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;

        if (!window.isValid(false))
            return;

        button.setText('正在保存');
        button.disable();

        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.patents.PatentEditWindow, Ext.Window);



