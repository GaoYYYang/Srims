
if (!Srims.patents)
    Ext.namespace("Srims.patents");

Srims.patents.PatentShowPanel_BasicForm = function(patent) {
    //field
    this._patent = patent;

    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '专利名称',
        value: patent.get('name'),
        readOnly: true,
        width: 392
    });

    this._fieldNumber = new Ext.form.Field({
        fieldLabel: '专利号',
        value: patent.get('number'),
        readOnly: true,
        width: 200
    });
    this._fieldType = new Ext.form.Field({
        fieldLabel: '专利类型',
        value: Srims.patents.PatentTypeRender(patent.get('type')),
        readOnly: true,
        width: 200
    });
    this._fieldLevel = new Ext.form.Field({
        fieldLabel: '专利级别',
        value: Srims.patents.PatentLevelRender(patent.get('level')),
        readOnly: true,
        width: 200
    });
    this._fieldLawState = new Ext.form.Field({
        fieldLabel: '法律状态',
        value: Srims.patents.PatentLawStateRender(patent.get('lawState')),
        readOnly: true,
        width: 200
    });
    this._fieldCategory = new Ext.form.Field({
        fieldLabel: '专利分类',
        value: patent.get('category'),
        readOnly: true,
        width: 200
    });
    this._fieldCollegeName = new Ext.form.Field({
        fieldLabel: '所属学院',
        value: patent.get('collegeName'),
        readOnly: true,
        width: 200
    });
    this._fieldMainCategoryNumber = new Ext.form.Field({
        fieldLabel: '主分类号',
        value: patent.get('mainCategoryNumber'),
        readOnly: true,
        width: 200
    });

    this._fieldCountry = new Ext.form.Field({
        fieldLabel: '国家',
        value: patent.get('country'),
        readOnly: true,
        width: 200
    });
    this._fieldApplicationDateTime = new Ext.form.Field({
        fieldLabel: '申请时间',
        value: Date.render(patent.get('applicationDateTime')),
        readOnly: true,
        width: 200
    });
    this._fieldAuthorizeDateTime = new Ext.form.Field({
        fieldLabel: '授权时间',
        value: Date.render(patent.get('authorizeDateTime')),
        readOnly: true,
        width: 200
    });
    this._fieldLawStateTime = new Ext.form.Field({
        fieldLabel: '法律状态时间',
        value: Date.render(patent.get('lawStateTime')),
        readOnly: true,
        width: 200
    });
    this._fieldAgencyName = new Ext.form.Field({
        fieldLabel: '代理机构',
        value: patent.get('agencyName'),
        readOnly: true,
        width: 200
    });
    this._fieldAgent = new Ext.form.Field({
        fieldLabel: '代理人',
        value: patent.get('agent'),
        readOnly: true,
        width: 200
    });
    this._fieldContract = new Ext.form.Field({
        fieldLabel: '联系方式',
        value: patent.get('contract'),
        readOnly: true,
        width: 200
    });

    this._fieldAllCategoryNumber = new Ext.form.Field({
        fieldLabel: '全部分类号',
        value: patent.get('allCategoryNumber'),
        readOnly: true,
        width: 590
    });
    this._fieldRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        value: patent.get('remark'),
        readOnly: true,
        height: 40,
        width: 590
    });
    //constructor
    var columnOneItems = [this._fieldNumber, this._fieldType, this._fieldLevel, this._fieldLawState, this._fieldCategory,
                                          this._fieldCollegeName, this._fieldMainCategoryNumber];
    var columnTwoItems = [this._fieldCountry, this._fieldApplicationDateTime, this._fieldAuthorizeDateTime, this._fieldLawStateTime, this._fieldAgencyName,
                                         this._fieldAgent, this._fieldContract];

    Srims.patents.PatentShowPanel_BasicForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        labelWidth: 80,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldName, new Ext.Panel({
            widht: 780,
            layout: 'column',
            items: [new Ext.Panel({
                width: 390,
                layout: 'form',
                style: 'width:300px',
                items: columnOneItems
            }), new Ext.Panel({
                width: 340,
                style: 'width:300px',
                layout: 'form',
                items: columnTwoItems
            })]
        }), this._fieldAllCategoryNumber, this._fieldRemark]
    });

}
Ext.extend(Srims.patents.PatentShowPanel_BasicForm, Ext.form.FormPanel, {});









