
if (!Srims.performance)
    Ext.namespace("Srims.performance");

Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel = function(performance) {

    this._performance = performance;

    this._textFieldProjectName = new Ext.form.TextField({
        fieldLabel: '对应项目',
        value: performance.get('projectName'),
        width: 300,
        readOnly: true
    });
    this._dateFieldReceiveDate = new Ext.form.TextField({
        fieldLabel: '到帐日期',
        value: Date.render(performance.get('foundationTime')),
        readOnly: true,
        width: 200
    });
    this._numberFieldArrivedPerformance = new Ext.form.TextField({
        fieldLabel: '到帐金额',
        value: Money.render(performance.get('arrivedPerformance')),
        readOnly: true,
        width: 300
    });
    this._numberFieldDescendPerformance = new Ext.form.TextField({
        fieldLabel: '已下拨金额',
        value: Money.render(performance.get('descendPerformance')),
        readOnly: true,
        width: 200
    });

    this._checkboxIsCancel = new Ext.form.Checkbox({
        fieldLabel: '是否作废',
        checked: performance.get('isCancel'),
        readOnly: true
    });
    this._checkboxIsAllocated = new Ext.form.Checkbox({
        fieldLabel: '是否全部下拨',
        checked: performance.get('isAllocated'),
        readOnly: true
    });


    this._toolBar = new Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel_ToolBar(performance, this);

    var columnOneItems = [this._textFieldProjectName, this._numberFieldArrivedPerformance, this._checkboxIsAllocated];
    var columnTowItems = [this._dateFieldReceiveDate, this._numberFieldDescendPerformance, this._checkboxIsCancel];
    Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 70,
        tbar: this._toolBar,
        items: [new Ext.Panel({
            width: 900,
            layout: 'column',
            items: [new Ext.Panel({
                columnWidth: .6,
                labelWidth: 90,
                layout: 'form',
                items: columnOneItems
            }), new Ext.Panel({
                columnWidth: .4,
                labelWidth: 90,
                layout: 'form',
                items: columnTowItems
            })]
        })]
    });

    this.resetComponentValues = function(currentperformance) {
        this._numberFieldDescendPerformance.setValue(Money.render(currentperformance.get('descendPerformance')));
        this._checkboxIsCancel.setValue(currentperformance.get('isCancel'));
        this._checkboxIsAllocated.setValue(currentperformance.get('isAllocated'));
        this._performance = currentperformance;
        if (this.ownerCt) {
            this.ownerCt._performance = currentperformance;
        }
    }
}
Ext.extend(Srims.performance.PerformanceDescendManageWindow_PerformanceInfoPanel, Ext.form.FormPanel, {})

