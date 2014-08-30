

if (!Srims.papers)
    Ext.namespace("Srims.papers");

Srims.papers.LiberalArtsPaperEditPanel = function(panelId, paper, systemSetting) {
    this._id = panelId;
    this._paper = paper;
    this._title = paper.isNew() ? "添加文科论文" : paper.get('resultsName');
    var isNew = paper.isNew();
    this._formPanelBasic = new Srims.papers.LiberalArtsPaperEditPanel_BasicForm(this._paper);
    this._formPanelOtherBasic = new Srims.papers.LiberalArtsPaperEditPanel_OtherBasicForm(this._paper);
    this._formPanelAbstract = new Srims.papers.LiberalArtsPaperEditPanel_AbstractForm(this._paper);
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });

    Srims.papers.LiberalArtsPaperEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        buttonAlign: 'center',
        title: this._title,
        iconCls: paper.isNew() ? 'icon-paper-new' : 'icon-edit',
        items: [this._formPanelBasic, this._formPanelOtherBasic, this._formPanelAbstract],
        buttons: [this._buttonSave]
    });

    this.assginValues = function() {
        this._formPanelBasic.assginValues();
        this._formPanelOtherBasic.assginValues();
        this._formPanelAbstract.assginValues();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._formPanelBasic.isValid(preventMark) && result;
        result = this._formPanelOtherBasic.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var paper = this._paper;
        paper.beginEdit();
        this.assginValues();
        paper.commit();
        Ext.Ajax.request({
        url: Srims.service.papers.LiberalArtsPaperService + '/Save',
            params: paper.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                Srims.papers.listLiberalArtsPaper(false);
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.papers.LiberalArtsPaperXmlReader()
                });
                var newPaper = newStore.getAt(0);
                if (!isNew) {
                    var panelId = "LiberalArtsPaperShowPanel_" + newPaper.get('id');
                    if (Ext.getCmp(panelId))
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelId), true);
                }
                Srims.papers.showLiberalArtsPaper(newPaper);
            }
        });
    }
    this._onButonSave_Click = function(button, e) {
        var panel = button.panel;

        if (!panel.isValid(false))
            return;

        button.setText('正在保存');
        button.disable();
        panel.save();
    }

    this._buttonSave.on('click', this._onButonSave_Click);
}

Ext.extend(Srims.papers.LiberalArtsPaperEditPanel, Ext.Panel, {});