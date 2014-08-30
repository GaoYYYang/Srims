
if (!Srims.common)
    Ext.namespace('Srims.common');


Srims.common.LogSetPanel = function(id, systemSetting) {
    this._title = '日志设置';
    this._systemSetting = systemSetting;
    this._formPanelUser = new Srims.common.LogSetPanel_UserForm(systemSetting);
    this._formPanelProject = new Srims.common.LogSetPanel_ProjectForm(systemSetting);
    this._formPanelText = new Srims.common.LogSetPanel_TextForm(systemSetting);
    this._formPanelType = new Srims.common.LogSetPanel_TypeForm(systemSetting);
    this._formPanelFund = new Srims.common.LogSetPanel_FundForm(systemSetting);
    this._formPanelPaper = new Srims.common.LogSetPanel_PaperForm(systemSetting);
    this._formPanelPatent = new Srims.common.LogSetPanel_PatentForm(systemSetting);
    this._formPanelAward = new Srims.common.LogSetPanel_AwardForm(systemSetting);
    this._formPanelBase = new Srims.common.LogSetPanel_BaseForm(systemSetting);
    this._formPanelCommon = new Srims.common.LogSetPanel_CommonForm(systemSetting);
    this._formPanelExperts = new Srims.common.LogSetPanel_ExpertsForm(systemSetting);
    this._formPanelStamp = new Srims.common.LogSetPanel_StampForm(systemSetting);

    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保存设置',
        panel: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        panel: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    Srims.common.LogSetPanel.superclass.constructor.call(this, {
        id: id,
        width: 815,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        buttonAlign: 'center',
        title: this._title,
        iconCls: 'icon-log-Set',
        resizable: false,
        modal: true,
        autoScroll: true,
        items: [this._formPanelUser, this._formPanelProject, this._formPanelText, this._formPanelType,
        this._formPanelFund, this._formPanelPaper, this._formPanelPatent, this._formPanelAward,
         this._formPanelBase, this._formPanelCommon, this._formPanelExperts, this._formPanelStamp],
        buttons: [this._buttonSave]
    });
    //method 
    this.assignValues = function() {
        this._systemSetting.set('logType', this._formPanelUser._checkboxGroupUser.getSelecetedValue() +
        this._formPanelProject._checkboxGroupProject.getSelecetedValue() +
        this._formPanelText._checkboxGroupText.getSelecetedValue() +
        this._formPanelType._checkboxGroupType.getSelecetedValue() +
        this._formPanelFund._checkboxGroupFund.getSelecetedValue() +
        this._formPanelPaper._checkboxGroupPaper.getSelecetedValue() +
        this._formPanelPatent._checkboxGroupPatent.getSelecetedValue() +
        this._formPanelAward._checkboxGroupAward.getSelecetedValue() +
        this._formPanelBase._checkboxGroupBase.getSelecetedValue() +
          this._formPanelExperts._checkboxGroupExperts.getSelecetedValue() +
           this._formPanelStamp._checkboxGroupStamp.getSelecetedValue() +
         this._formPanelCommon._checkboxGroupCommon.getSelecetedValue());
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._formPanelUser.isValid(preventMark) && result;
        return result;
    }


    this.save = function() {
        var systemSetting = this._systemSetting;

        systemSetting.beginEdit();
        this.assignValues();
        systemSetting.commit();

        Ext.Ajax.request({
            url: Srims.service.common.LogService + '/Save',
            params: systemSetting.data,
            scope: this,
            success: function() {
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        })
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
Ext.extend(Srims.common.LogSetPanel, Ext.Panel, {});
