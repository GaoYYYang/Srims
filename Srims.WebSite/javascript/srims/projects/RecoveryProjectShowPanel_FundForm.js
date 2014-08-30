
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.RecoveryProjectShowPanel_FundForm = function(panelId, project) {
    this._project = project;
    this._fieldName = new Ext.form.Field({
        fieldLabel: '项目名称',
        value: project.get('name'),
        readOnly: true,
        width: 440
    }); //
    this._fieldNumber = new Ext.form.Field({
        fieldLabel: '项目编号',
        value: project.get('number'),
        readOnly: true,
        width: 140
    }); //
    this._fieldPrincipal = new Ext.form.Field({
        fieldLabel: '项目负责人',
        value: project.get('principal'),
        readOnly: true,
        width: 140
    }); //
    this._fieldVoucher = new Ext.form.Field({
        fieldLabel: '凭单号',
        value: project.get('voucherNumber'),
        readOnly: true,
        width: 140
    });
    this._fieldFundAlreadyIn = new Ext.form.Field({
        fieldLabel: '已分配校内经费',
        value: Money.render(project.get('fundAlreadyIn')),
        readOnly: true,
        width: 140
    }); //
    this._numberFieldPerformance = new Ext.form.Field({
        fieldLabel: '绩效金额',
        value: Money.render(project.get('performanceAmount')),
        readOnly: true,
        width: 140
    });
    this._fieldBorrowAmount = new Ext.form.Field({
        fieldLabel: '校内已收间接费用',
        value: Money.render(project.get('overheadExpensesAlreadyIn')),
        readOnly: true,
        width: 140
    }); //
    this._fieldReturnAmount = new Ext.form.Field({
        fieldLabel: '校内应收间接费用',
        value: Money.render(project.get('overheadExpensesAmount')),
        readOnly: true,
        width: 140
    }); //
    this._numberFieldRecovery = new Ext.form.Field({
        fieldLabel: '校内补缴间接费用',
        value: Money.render(project.get('recoveryAmount')),
        readOnly: true,
        width: 140
    }); //
    this._fieldMark = new Ext.form.Field({
        fieldLabel: '添加备注',
        value: project.get('remark'),
        allowBlank: false,
        readOnly: false,
        width: 440
    }); //
    this._checkboxIsChangeByHand = new Ext.form.Checkbox({
        fieldLabel: '是否手动修改',
        checked: project.get('isChangeByHand')
    });
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        hidden: false,
        panel: this,
        handler: function() {
        var panel = this.panel;
        if (!panel.isValid(false))
            return;
        this.setText('已保存');
        this.disable();
        panel.save();
        }
    }); //
    Srims.projects.RecoveryProjectShowPanel_FundForm.superclass.constructor.call(this, {

        collapsible: true,
        title: '间接费用调整信息',
        autoHeight: true,
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        items: [new Ext.Panel({
            width: 600,
            layout: 'column',
            items: [
             new Ext.Panel({
                 width: 600,
                 layout: 'form',
                 style: 'width:450px',
                 items: [this._fieldName]
             }),
            new Ext.Panel({
                width: 300,
                layout: 'form',
                style: 'width:300px',
                items: [this._fieldNumber, this._fieldVoucher, this._fieldBorrowAmount, this._fieldReturnAmount]

            }), new Ext.Panel({
                width: 300,
                style: 'width:300px',
                layout: 'form',

                items: [this._fieldPrincipal, this._numberFieldPerformance, this._fieldFundAlreadyIn, this._numberFieldRecovery]
            }), new Ext.Panel({
                width: 600,
                layout: 'form',
                style: 'width:450px',
                items: [this._fieldMark]
               // items: [this._fieldMark, this._checkboxIsChangeByHand]
            })]
        })
        ], buttons: [this._buttonSave]
    });

        this.save = function() {
        var project = this._project;
        
        project.beginEdit();
        this.assginValues();
        project.commit();
     
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/RecoverySave',
            params: project.data,
            scope: this,
            success: function(response) {
            Srims.WorkSpace.getWorkSpace().remove(panelId);
//                var newstore = new Ext.data.Store({
//                    data: response.responseXML,
//                    reader: new Srims.projects.RecoveryProjectXmlReader()
//                });
//                var newproject = newstore.getAt(0);
                Srims.projects.showRecoveryProject(project);
            }
        });

    }

    this.assginValues = function() {
        this._project.set('remark', this._fieldMark.getValue());
        this._project.set('isChangeByHand', this._checkboxIsChangeByHand.getValue());
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fieldMark.isValid(preventMark) && result;
        result = this._checkboxIsChangeByHand.isValid(preventMark) && result;
        return result;
    }
}
Ext.extend(Srims.projects.RecoveryProjectShowPanel_FundForm, Ext.FormPanel);
