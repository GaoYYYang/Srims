if (!Srims.common)
    Ext.namespace("Srims.common");
Srims.common.OutsourcingIsExistWindow_InForm = function() {
    this._notice = new Ext.form.Label({
        style: "font-size:12px;color:#FF0000",
        text: '您可以输入"外协单位全称"或"组织代码"来查询欲添加的外协单位是否存在!'
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        allowBlank: true,
        width: 200
    });
    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        allowBlank: true,
        width: 90,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '8' }
    });
    this._codeShortLine = new Ext.form.Label({
        text: '-'
    });
    this._codeNinethNumber = new Ext.form.NumberField({
        fieldLabel: '第九位',
        hideLabel: true,
        allowBlank: true,
        width: 20,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '1' }
    });
    this.items = [this._textFieldName];

    this.items[this.items.length] = new Ext.Panel({
        width: 500,
        layout: 'column',
        items: [new Ext.Panel({
            width: 200,
            layout: 'form',
            items: this._textFieldOrganizationCode
        }), new Ext.Panel({
            width: 10,
            layout: 'form',
            items: this._codeShortLine
        }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
    });



    this.web1 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '如果您不知道新建外协单位的组织机构代码，可在'
    });
    this.web2 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '全国组织机构代码管理中心'
    });
    this.web3 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '网站查询。'
    });
    
    this.items[this.items.length] = new Ext.Panel({
        layout: 'column',
        items: [new Ext.Panel({
            layout: 'form',
            items: this.web1
        }), new Ext.Panel({

            layout: 'form',
            items: this.web2
        }), new Ext.Panel({

            layout: 'form',
            items: this.web3
        })
            ]
    });
    



    Srims.common.OutsourcingIsExistWindow_InForm.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 100,
        items: this.items
    });
}
Ext.extend(Srims.common.OutsourcingIsExistWindow_InForm, Ext.form.FormPanel, {});