
if (!Srims.awards)
    Ext.namespace("Srims.awards");

Srims.awards.AwardQueryWindow_OtherPanel = function() {

    this._checkboxGroupAwardRank = new Srims.component.CheckBoxGroup({
        fieldLabel: '奖励级别',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore.checkboxGroupItems
    });
    this._checkboxGroupAuthorizedUnit = new Srims.component.CheckBoxGroup({
        fieldLabel: '授奖单位',
        cls: 'srims-checkboxGroup-signUnit',
        columns: 4,
        items: Srims.awards.AwardQueryWindow_OtherPanel.AuthorizedUnitQueryStore.checkboxGroupItems
    });
    this._checkboxGroupAttendType = new Srims.component.CheckBoxGroup({
        fieldLabel: '参与类型',
        cls: 'srims-checkboxGroup',
        items: Srims.awards.AwardQueryWindow_OtherPanel.AttendTypeQueryStore.checkboxGroupItems
    });
    this._checkboxGroupClass = new Srims.component.CheckBoxGroup({
        fieldLabel: '等级',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore.checkboxGroupItems
    });
    this._checkboxGroupClassification = new Srims.component.CheckBoxGroup({
        fieldLabel: '奖种',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore.checkboxGroupItems
    });

    Srims.awards.AwardQueryWindow_OtherPanel.superclass.constructor.call(this, {
        title: '其他信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 681,
        autoHeight: true,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            items: [this._checkboxGroupClassification, this._checkboxGroupClass, this._checkboxGroupAwardRank, this._checkboxGroupAuthorizedUnit, this._checkboxGroupAttendType]
        })]
    });

    this.buildParams = function(params) {

        params.Rank = this._checkboxGroupAwardRank.getSelecetedValue();
        params.Class = this._checkboxGroupClass.getSelecetedValue();
        params.AuthorisedUnit = this._checkboxGroupAuthorizedUnit.getSelecetedValue();
        params.Classification = this._checkboxGroupClassification.getSelecetedValue();
        params.AttendType = this._checkboxGroupAttendType.getSelecetedValue();

    }

    this.clearParams = function(params) {

        this._checkboxGroupAwardRank.reset();
        this._checkboxGroupClass.reset();
        this._checkboxGroupClassification.reset();
        this._checkboxGroupAuthorizedUnit.reset();
        this._checkboxGroupAttendType.reset();
    }
}
Ext.extend(Srims.awards.AwardQueryWindow_OtherPanel, Ext.FormPanel);


Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetRankItems');
Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.RankQueryStore.buildCheckboxGroupItems
});
Srims.awards.AwardQueryWindow_OtherPanel.AttendTypeQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetAttendTypeItems');
Srims.awards.AwardQueryWindow_OtherPanel.AttendTypeQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.AttendTypeQueryStore.buildCheckboxGroupItems
});
Srims.awards.AwardQueryWindow_OtherPanel.AuthorizedUnitQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetAuthorUnitItems');
Srims.awards.AwardQueryWindow_OtherPanel.AuthorizedUnitQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.AuthorizedUnitQueryStore.buildCheckboxGroupItems
});
Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetClassItems');
Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.ClassQueryStore.buildCheckboxGroupItems
});
Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore = new Srims.data.IDValueRecordStore(Srims.service.awards.AwardService + '/GetClassificationItems');
Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore.load({
    callback: Srims.awards.AwardQueryWindow_OtherPanel.ClassificationQueryStore.buildCheckboxGroupItems
});







