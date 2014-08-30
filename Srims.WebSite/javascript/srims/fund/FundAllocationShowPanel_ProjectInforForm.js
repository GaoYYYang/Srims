
if (!Srims.fund) 
    Ext.namespace("Srims.fund");
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.fund.FundAllocationShowPanel_ProjectInforForm = function(projectId){

    this._fieldName = new Ext.form.Field({
        fieldLabel: '项目名称',
        readOnly: true,
        width: 560
    });
    this._fieldPrincipal = new Ext.form.Field({
        fieldLabel: '项目负责人',
        readOnly: true,
        width: 160
    });
    this._fieldLevel = new Ext.form.Field({
        fieldLabel: '项目级别',
        readOnly: true,
        width: 160
    });
    this._fieldState = new Ext.form.Field({
        fieldLabel: '项目状态',
        readOnly: true,
        width: 160
    });
    this._fieldRank = new Ext.form.Field({
        fieldLabel: '项目等级',
        readOnly: true,
        width: 160
    });
    this._fieldType = new Ext.form.Field({
        fieldLabel: '项目类型',
        readOnly: true,
        width: 300
    });
    this._fieldFundContract = new Ext.form.Field({
        fieldLabel: '项目合同额',
        readOnly: true,
        width: 160
    });
    this._fieldFundTotal = new Ext.form.Field({
        fieldLabel: '到校经费',
        readOnly: true,
        width: 160
    });
    this._fieldFundPlanIn = new Ext.form.Field({
        fieldLabel: '计划校内分配',
        readOnly: true,
        width: 160
    });
    this._fieldFundPlanOut = new Ext.form.Field({
        fieldLabel: '计划外协分配',
        readOnly: true,
        width: 160
    });
    this._fieldFundReceived = new Ext.form.Field({
        fieldLabel: '已到经费',
        readOnly: true,
        width: 160
    });
    this._fieldFundAlreadyIn = new Ext.form.Field({
        fieldLabel: '已分配校内经费',
        readOnly: true,
        width: 160
    });
    this._fieldfundAlreadyOut = new Ext.form.Field({
        fieldLabel: '已分配外协经费',
        readOnly: true,
        width: 160
    });
    
    var columnFirstItems = [this._fieldPrincipal, this._fieldState, this._fieldFundTotal, this._fieldFundPlanIn, this._fieldFundAlreadyIn, this._fieldRank];
    var columnSecondItems = [this._fieldLevel, this._fieldFundContract, this._fieldFundReceived, this._fieldFundPlanOut, this._fieldfundAlreadyOut];
    
    Srims.fund.FundAllocationShowPanel_ProjectInforForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '经费分配项目信息',
        frame: true,
        labelWidth: 100,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._fieldName, new Ext.Panel({
            labelWidth: 100,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                items: columnFirstItems
            }), new Ext.Panel({
                layout: 'form',
                items: columnSecondItems
            })]
        }), this._fieldType]
    });
    
    this.setCompontentValue = function(projectId){
        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/GetById',
            params: {
                projectId: projectId
            },
            scope: this,
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.projects.ProjectSimpleXmlReader()
                });
                var project = store.getAt(0);
                this._fieldName.setValue(project.get('name'));
                this._fieldPrincipal.setValue(project.get('principal'));
                this._fieldLevel.setValue(Srims.projects.projectLevelRender(project.get('level')));
                this._fieldState.setValue(Srims.projects.projectStateRender(project.get('state')));
                this._fieldRank.setValue(project.get('rankName'));
                this._fieldType.setValue(project.get('typeName'));
                this._fieldFundContract.setValue(Money.render(project.get('fundContract')));
                this._fieldFundTotal.setValue(Money.render(project.get('fundTotal')));
                this._fieldFundPlanIn.setValue(Money.render(project.get('fundPlanIn')));
                this._fieldFundPlanOut.setValue(Money.render(project.get('fundPlanOut')));
                this._fieldFundReceived.setValue(Money.render(project.get('fundReceived')));
                this._fieldFundAlreadyIn.setValue(Money.render(project.get('fundAlreadyIn')));
                this._fieldfundAlreadyOut.setValue(Money.render(project.get('fundAlreadyOut')));
            }
        });
    }
    this.setCompontentValue(projectId);
}

Ext.extend(Srims.fund.FundAllocationShowPanel_ProjectInforForm, Ext.form.FormPanel, {});
