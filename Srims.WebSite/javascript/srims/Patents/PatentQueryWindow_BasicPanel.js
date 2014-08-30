
if (!Srims.patents)
    Ext.namespace("Srims.patents");
if (!Srims.experts)
    Ext.namespace("Srims.experts");

Srims.patents.PatentQueryWindow_BasicPanel = function() {
    this._PatentName = new Ext.form.TextField({
        fieldLabel: '专利名称',
        width: 300
    });
    this._PatentNumber = new Ext.form.TextField({
        fieldLabel: '专利号',
        width: 150
    });
    this._PatentInventer = new Ext.form.TextField({
        fieldLabel: '发明人',
        width: 150
    });
    this._PatentInventerOrder = new Ext.form.NumberField({
        fieldLabel: '位次',
        allowNegative: false,
        allowDecimals: false,
        minValue: 1,
        width: 150
    });
    this._IsPrincipal = new Ext.form.Checkbox({
        fieldLabel: '是否负责人'
    });
    this._IsAccredited = new Ext.form.Checkbox({
        fieldLabel: '是否已授权'
    });
    this._ApplicationTimeStart = new Ext.form.DateField({
        fieldLabel: '申请时间',
        width: 150
    });
    this._ApplicationTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._AuthorisedTimeStart = new Ext.form.DateField({
        fieldLabel: '授权时间',
        width: 150
    });
    this._AuthorisedTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._LawStateTimeStart = new Ext.form.DateField({
        fieldLabel: '法律状态时间',
        width: 150
    });
    this._LawStateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._College = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.projects.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        emptyText: '请选择学院',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });

    this._columnOne = [this._PatentNumber, this._PatentInventer, this._IsPrincipal,
                                   this._ApplicationTimeStart, this._AuthorisedTimeStart, this._LawStateTimeStart];
    this._columnTwo = [this._College, this._PatentInventerOrder, this._IsAccredited,
                                    this._ApplicationTimeEnd, this._AuthorisedTimeEnd, this._LawStateTimeEnd];

    Srims.patents.PatentQueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 681,
        items: [this._PatentName, new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 300,
                layout: 'form',
                labelWidth: 90,
                items: this._columnOne
            }), new Ext.Panel({
                labelWidth: 75,
                layout: 'form',
                items: this._columnTwo
            })]
        })]
    });
    this.buildParams = function(params) {
        params.Name = this._PatentName.getValue();
        params.Number = this._PatentNumber.getValue();
        params.PatentInventer = this._PatentInventer.getValue();
        params.InventerOrder = this._PatentInventerOrder.getValue();
        params.IsPrincipal = this._IsPrincipal.checked ? "true" : "";
        params.ApplicationDateTimeStart = Date.format(this._ApplicationTimeStart.getValue());
        params.AuthorizeDateTimeStart = Date.format(this._AuthorisedTimeStart.getValue());
        params.LawStateTimeStart = Date.format(this._LawStateTimeStart.getValue());
        params.IsAccredited = this._IsAccredited.checked ? "true" : "";
        params.ApplicationDateTimeEnd = Date.format(this._ApplicationTimeEnd.getValue());
        params.AuthorizeDateTimeEnd = Date.format(this._AuthorisedTimeEnd.getValue());
        params.LawStateTimeEnd = Date.format(this._LawStateTimeEnd.getValue());
        params.CollegeName = this._College.getText();
    }
    this.clearParams = function(params) {
        this._PatentName.reset();
        this._PatentNumber.reset();
        this._PatentInventer.reset();
        this._IsPrincipal.reset();
        this._ApplicationTimeStart.reset();
        this._AuthorisedTimeStart.reset();
        this._LawStateTimeStart.reset();
        this._PatentInventerOrder.reset();
        this._IsAccredited.reset();
        this._ApplicationTimeEnd.reset();
        this._AuthorisedTimeEnd.reset();
        this._LawStateTimeEnd.reset();
        this._College.reset();
    }
}
Ext.extend(Srims.patents.PatentQueryWindow_BasicPanel, Ext.FormPanel);







