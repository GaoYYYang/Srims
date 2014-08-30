
if (!Srims.bases) 
    Ext.namespace("Srims.bases");

Srims.bases.BaseShowPanel_BasicForm = function(base){
    //field
    this._base = base;
    //controls
    this._fieldName = new Ext.form.Field({
        fieldLabel: '基地名称',
        value: this._base.get('name'),
        readOnly: true,
        width: 300
    });
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '基地等级',
        value: this._base.get('rank'),
        readOnly: true,
        width: 160
    });
    this._fieldAdministration = new Ext.form.Field({
        fieldLabel: '主管部门',
        value: this._base.get('administration'),
        readOnly: true,
        width: 160
    });
    this._fieldAcademyDirectorName = new Ext.form.Field({
        fieldLabel: '学术负责人',
        value: this._base.get('academyDirectorName'),
        readOnly: true,
        width: 160
    });
    this._fieldDirectorName = new Ext.form.Field({
        fieldLabel: '负责人',
        value: this._base.get('directorName'),
        readOnly: true,
        width: 160
    });
    this._fieldPhone = new Ext.form.Field({
        fieldLabel: '电话',
        value: this._base.get('phone'),
        readOnly: true,
        width: 160
    });
    this._fieldZip = new Ext.form.Field({
        fieldLabel: '邮编',
        value: this._base.get('zip'),
        readOnly: true,
        width: 160
    });
    this._fieldAddress = new Ext.form.Field({
        fieldLabel: '地址',
        value: this._base.get('address'),
        readOnly: true,
        width: 160
    });
    this._fieldFax = new Ext.form.Field({
        fieldLabel: '传真',
        value: this._base.get('fax'),
        readOnly: true,
        width: 160
    });
    //constructor        
    var columnOneItems = [this._fieldAdministration, this._fieldAcademyDirectorName, this._fieldZip, this._fieldFax];
    var columnTwoItems = [this._fieldRank, this._fieldDirectorName, this._fieldPhone, this._fieldAddress];
    Srims.bases.BaseShowPanel_BasicForm.superclass.constructor.call(this, {
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
            widht: 700,
            layout: 'column',
            items: [new Ext.Panel({
                width: 350,
                layout: 'form',
                style: 'width:300px',
                items: columnOneItems
            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',
                items: columnTwoItems
            })]
        })]
    });
    this.resetComponentValue = function(base){
        this._fieldName.setValue(base.get('name'));
        this._fieldAdministration.setValue(base.get('administration'));
        this._fieldAcademyDirectorName.setValue(base.get('academyDirectorName'));
        this._fieldZip.setValue(base.get('zip'));
        this._fieldFax.setValue(base.get('fax'));
        this._fieldRank.setValue(base.get('rank'));
        this._fieldDirectorName.setValue(base.get('directorName'));
        this._fieldPhone.setValue(base.get('phone'));
        this._fieldAddress.setValue(base.get('address'));
    }
}
Ext.extend(Srims.bases.BaseShowPanel_BasicForm, Ext.form.FormPanel, {});
