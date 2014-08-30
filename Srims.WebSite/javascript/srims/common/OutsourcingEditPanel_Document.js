
Srims.common.OutsourcingEditPanel_Document = function(outsourcing) {

    this._outsourcing = outsourcing;

    this._LegalRepresentativefileUploadField = new Srims.component.FileUploadField({
    id: 'upLegalRepresentativeLoadDocument',
        fieldLabel: '上传企业法人证书',
        width: 300,
        emptyText: '请选择要上传的法人证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._LegalRepresentativebuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });

    this._OrganizationCodefileUploadField = new Srims.component.FileUploadField({
    id: 'upOrganizationCodeLoadDocument',
        fieldLabel: '上传机构代码证书',
        width: 300,
        emptyText: '请选择要上传的机构代码证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._OrganizationCodebuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });
    this._TaxfileUploadField = new Srims.component.FileUploadField({
        id: 'upTaxLoadDocument',
        fieldLabel: '上传税务登记证书',
        width: 300,
        emptyText: '请选择要上传的税务登记证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._TaxbuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });
    var items1 = [this._LegalRepresentativefileUploadField, this._LegalRepresentativebuttonUpload];
    var items2 = [this._OrganizationCodefileUploadField, this._OrganizationCodebuttonUpload];
    var items3 = [this._TaxfileUploadField, this._TaxbuttonUpload];
    Srims.common.OutsourcingEditPanel_Basic.superclass.constructor.call(this, {

    activeTab: 0,
    title: '上传外协文档',
        Height: 150,
        frame: true,
        labelWidth: 120,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:400px',
                items: [this._LegalRepresentativefileUploadField]
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: [this._LegalRepresentativebuttonUpload]
            })]
        }),

        new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:400px',
                items: this._OrganizationCodefileUploadField
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: this._OrganizationCodebuttonUpload
            })]
        }),

        new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:400px',
                items: this._TaxfileUploadField
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: this._TaxbuttonUpload
            })]
        })
        
        ]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_Document, Ext.TabPanel);