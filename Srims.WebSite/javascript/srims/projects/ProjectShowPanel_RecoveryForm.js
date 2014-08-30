
//if (!Srims.projects) 
//    Ext.namespace('Srims.projects');

//Srims.projects.ProjectShowPanel_RecoveryForm = function(project){

//    this._project = project;
//    this._recoveryvoucherNumber = new Ext.form.Field({
//        fieldLabel: '追缴凭单号',
//        value: project.get('recoveryvoucherNumber'),
//        readOnly: true,
//        width: 140
//    });//
//    this._roverheadExpensesAmount = new Ext.form.Field({
//        fieldLabel: '应收间接费',
//        value: Money.render(project.get('roverheadExpensesAmount')),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryAmount = new Ext.form.Field({
//        fieldLabel: '追缴间接费',
//        value: Money.render(project.get('recoveryAmount')),
//        readOnly: true,
//        width: 140
//    }); //
//    this._fieldMark = new Ext.form.Field({
//        fieldLabel: '备注',
//        value: project.get('rremark'),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryPrintState = new Ext.form.Field({
//        fieldLabel: '打印状态',
//        value: project.get('recoveryPrintState'),
//        readOnly: true,
//        width: 140
//    }); //
//    this._recoveryPrintDate = new Ext.form.Field({
//        fieldLabel: '打印日期',
//        value: Date.render(project.get('recoveryPrintDate')),
//        readOnly: true,
//        width: 140
//    }); //

//    var items = [ new Ext.Panel({
//        widht: 600,
//        layout: 'column',
//        items: [new Ext.Panel({
//            width: 300,
//            layout: 'form',
//            style: 'width:300px',
//            items: [this._roverheadExpensesAmount, this._recoveryPrintState, this._recoveryvoucherNumber]
//        }), new Ext.Panel({
//            width: 300,
//            style: 'width:300px',
//            layout: 'form',
//            items: [this._recoveryAmount, this._recoveryPrintDate, this._fieldMark]
//        })]
//    })];
//    if (project.get('isHorizontal')) 
//        items.shift();
//    
//    Srims.projects.ProjectShowPanel_RecoveryForm.superclass.constructor.call(this, {
//        collapsible: true,
//        title: '项目追缴单信息',
//        autoHeight: true,
//        frame: true,
//        labelWidth: 80,
//        bodyStyle: 'padding:5px 5px 0',
//        style: 'margin-bottom: 2px',
//        defaultType: 'textfield',
//        titleCollapse: true,
//        items: items
//    });
//    //method
//    this.resetComponentValue = function(project){
//    this._roverheadExpensesAmount.setValue(project.get('roverheadExpensesAmount'));
//    this._recoveryAmount.setValue(project.get('recoveryAmount'));
//    this._recoveryPrintState.setValue(project.get('recoveryPrintState'));
//    this._recoveryPrintDate.setValue(project.get('recoveryPrintDate'));
//    this._recoveryvoucherNumber.setValue(project.get('recoveryvoucherNumber'));
//    this._fieldMark.setValue(project.get('rremark'));
//    }
//}
//Ext.extend(Srims.projects.ProjectShowPanel_RecoveryForm, Ext.form.FormPanel);
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectShowPanel_RecoveryForm = function(project) {
this._project = project;
var params = {};
    params = {
        projectId: project.get('id') == undefined ? 0 : project.get('id')
    };
    var load_url = Srims.service.projects.ProjectService + '/GetRecoveryByPID';
    this._store = new Srims.projects.RecoveryProjectStore(load_url, params);
    this._columnModel = new Srims.projects.RecoveryprojectGridPanel_ShowColumnModel();

    this._gridPanelProjectMember = new Ext.grid.GridPanel({
        store: this._store,
        colModel: this._columnModel,
        enableColumnHide: false,
        enableColumnMove: true,
        enableHdMenu: false,
        border: false,
        width: 600,
        autoExpandColumn: 'taskName',
        autoExpand: true,
        stripeRows: true,
        autoHeight: true,
        loadMask: true,
        stateful: false,
        viewConfig: {
            autoFill: true,
            scrollOffset: 0,
            forceFit: true,
            emptyText: '没有追缴单记录'
        }
    });

    Srims.projects.ProjectShowPanel_RecoveryForm.superclass.constructor.call(this, {
        collapsible: true,
        title: '项目间接费用调整信息',
        autoHeight: true,
        frame: true,
        labelWidth: 140,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [this._gridPanelProjectMember]
    });
    if (project.get('id'))
        this._store.load();

    this.setProject = function(project) {
        this._project = project;
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
}
Ext.extend(Srims.projects.ProjectShowPanel_RecoveryForm, Ext.FormPanel, {});