
if (!Srims.projects)
    Ext.namespace('Srims.projects');

Srims.projects.ProjectCompleteInWindow = function(id, project, gridPanel) {

    this._id = id;
    this._project = project;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '提交',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });


    this._textFieldOverheadExpenceInStandard = new Srims.component.MoneyField({
        fieldLabel: '校内基准间接费',
        value: project.get('overheadExpensesInStandard'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300,
        readOnly: true
    });
    this._textFieldPerformanceInStandard = new new Srims.component.MoneyField({
        fieldLabel: '校内基准绩效',
        value: project.get('performancePayStandard'),
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300,
        readOnly: true
    });
    this._textFieldPerformanceIn = new new Srims.component.MoneyField({
        fieldLabel: '校内绩效',
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300,
        allowBlank: false
    });
    this._textFieldOverheadExpenceIn = new new Srims.component.MoneyField({
        fieldLabel: '校内间接费',
        hidden: userIsExpert && project.get('isHorizontal'),
        hideLabel: userIsExpert && project.get('isHorizontal'),
        width: 300,
        allowBlank: false
    });


    Srims.projects.ProjectCompleteInWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '完善校内间接费和校内绩效',
        iconCls: 'icon-censor-reject',
        width: 320,
        labelWidth: 70,
        height: 180,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        resizable: false,
        items: [this._textFieldOverheadExpenceInStandard, this._textFieldPerformanceInStandard, this._textFieldOverheadExpenceIn, this._textFieldPerformanceIn],
        buttons: [this._buttonSave, this._buttonClose]
    });
    this.assginValues = function() {
        this._project.set('performancePay', this._textFieldPerformanceIn.getValue());
        this._project.set('overheadExpenseInTotal', this._textFieldOverheadExpenceIn.getValue() - this._textFieldPerformanceIn.getValue());
    }
    this.isValid = function(preventMark) {
        var result = true;

        result = this._textFieldOverheadExpenceIn.isValid(preventMark) && result;
        result = this._textFieldPerformanceIn.isValid(preventMark) && result;

        return result;
    }
    //event method
    this._onButonSave_Click = function(button, e) {
        var window = button.window;

        if (!window.isValid(false))
            return;

        var project = window._project;
        window.assginValues();

        window.saveAction(button);
    }
    this.saveAction = function(button) {
        button.setText('正在保存');
        button.disable();

        this.save();
    }
    this.save = function() {

        var project = this._project;
        project.beginEdit();
        this.assginValues();
        project.commit();


        Ext.Ajax.request({
            url: Srims.service.projects.ProjectService + '/Save',
            params: project.data,
            scope: this,
            success: function(response) {
                gridPanel.store.load();
                this.close();
            }
        });

    }

    //event
    this._buttonSave.on('click', this._onButonSave_Click);

}
Ext.extend(Srims.projects.ProjectCompleteInWindow, Ext.Window, {})
