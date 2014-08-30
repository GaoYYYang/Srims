
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.VoucherInformationForm = function(){

    this._dateTimeBegin = new Ext.form.DateField({
        fieldLabel: '分配时间',
        width: 150
    });
    this._dateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '经费成员所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    Srims.statistic.VoucherInformationForm.superclass.constructor.call(this, {
        title: '凭单信息',
        frame: true,
        layout: 'form',
        labelWidth: 80,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 280,
                layout: 'form',
                labelWidth: 60,
                items: [this._dateTimeBegin, this._comboBoxCollege]
            }), new Ext.Panel({
                labelWidth: 30,
                layout: 'form',
                items: [this._dateTimeEnd]
            })]
        })]
    });
    
    this.buildParams = function(params){
        params['fundAllocationCensorPassDateTimeStart'] = Date.format(this._dateTimeBegin.getValue());
        params['fundAllocationCensorPassDateTimeEnd'] = Date.format(this._dateTimeEnd.getValue());
        params['fundMemberCollegeName'] = this._comboBoxCollege.getText();
    }
    this.clearParams = function(){
        this._dateTimeBegin.reset();
        this._dateTimeEnd.reset();
        this._comboBoxCollege.reset();
    }
}

Ext.extend(Srims.statistic.VoucherInformationForm, Ext.form.FormPanel);
