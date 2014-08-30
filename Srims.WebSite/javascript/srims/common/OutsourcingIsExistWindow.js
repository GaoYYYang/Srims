if (!Srims.common)
    Ext.namespace('Srims.common');
Srims.common.IsOutsourcingExistWindow = function(store) {

    this._inForm = new Srims.common.OutsourcingIsExistWindow_InForm();
    //this._editGridPanel = new Srims.common.OutsourcingIsExistWindow_GridPanel();

    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查询',
        window: this,
        handler: function() {
            var window = this.window;
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService + '/WeatherExistOutsourcing',
                params: {
                    Name: window._inForm._textFieldName.getValue(),
                    OrganizationCode: window._inForm._textFieldOrganizationCode.getRawValue() + '-' + window._inForm._codeNinethNumber.getRawValue()
                },
                scope: this,
                success: function(response) {
                    window.close();
                    if (response.responseText != "")
                        Ext.Msg.show({
                            title: '已存在相应外协单位,请不要重复添加！信息如下：',
                            msg: response.responseText,
                            buttons: Ext.Msg.OK
                        });
                    else {
                        Ext.Msg.show({
                            title: '系统中不存在相应外协单位',
                            msg: '系统中不存在相应外协单位，您可以选择新建，添加您需要的外协单位',
                            buttons: Ext.Msg.OK
                        });
                        var IsInformation = window._inForm._textFieldName.getValue() + '?;' + window._inForm._textFieldOrganizationCode.getRawValue() + '?;' + window._inForm._codeNinethNumber.getRawValue();
                        Srims.common.NewOutsourcing(IsInformation, store, false);
                    }

                }
            });
        }
    });
    this.web = new Ext.Button({
        style: "font-size:12px;color:#FF0000",
        text: '全国组织机构代码管理中心'
    });
    this.webcilick = function() {
        window.open('http://www.nacao.org.cn/', '_blank');

    };
    this.web.on('click', this.webcilick, this);
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    Srims.common.IsOutsourcingExistWindow.superclass.constructor.call(this, {
        id: "IsOutsourcingExist",
        title: '<b style="color:#FF0000">请先输入"外协单位全称"或"组织代码"来查询欲添加的外协单位是否存在!</b>',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        layout: 'form',
        items: [this._inForm],
        buttons: [this.web, this._buttonQuery, this._buttonClose]
    });
}
Ext.extend(Srims.common.IsOutsourcingExistWindow, Ext.Window);