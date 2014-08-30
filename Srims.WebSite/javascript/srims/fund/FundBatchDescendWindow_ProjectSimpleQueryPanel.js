
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.FundBatchDescendWindow_ProjectSimpleQueryPanel = function(store){
    this._store = store;
    
    this._comboBoxRank = new Srims.component.EntityComboBox({
        fieldLabel: '项目级别',
        store: new Srims.type.ProjectRankStore(Srims.service.type.ProjectRankService + '/GetForQuery'),
        displayField: 'name',
        allowBlank: false,
        editable: false,
        width: 150,
        listWidth: 150
    });
    this._comboBoxType = new Srims.component.EntityComboBox({
        fieldLabel: '项目类型',
        mode: 'local',
        store: new Srims.type.ProjectTypeStore(Srims.service.type.ProjectTypeService + '/GetForEdit'),
        displayField: 'name',
        allowBlank: false,
        editable: false,
        width: 280,
        listWidth: 280
    });
    this._dateFieldStartDateBegin = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 150,
        editable: false,
        allowBlank: false
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150,
        editable: false
    });
    this._buttonQuery = new Ext.Button({
        text: '查 询',
        minWidth: 50,
        panel: this,
        store: this._store,
        handler: function(){
            var panel = this.panel;
            if (!panel.isValid(false)) 
                return;
            panel.query();
        }
    });
    this._buttonReset = new Ext.Button({
        text: '重 置',
        minWidth: 50,
        panel: this,
        handler: function(){
            this.panel.reset();
        }
    });
    Srims.fund.FundBatchDescendWindow_ProjectSimpleQueryPanel.superclass.constructor.call(this, {
        autoHeight: true,
        frame: true,
        labelWidth: 60,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        items: [new Ext.Panel({
            labelWidth: 60,
            layout: 'column',
            items: [new Ext.Panel({
                width: 240,
                labelWidth: 60,
                layout: 'form',
                items: [this._comboBoxRank, this._dateFieldStartDateBegin]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 60,
                items: [this._comboBoxType, new Ext.Panel({
                    labelWidth: 60,
                    layout: 'column',
                    items: [new Ext.Panel({
                        labelWidth: 60,
                        layout: 'form',
                        items: [this._dateFieldStartDateEnd]
                    }), new Ext.Panel({
                        style: 'padding-left: 20px',
                        layout: 'form',
                        items: [this._buttonQuery]
                    }), new Ext.Panel({
                        layout: 'form',
                        style: 'padding-left: 10px',
                        items: [this._buttonReset]
                    })]
                })]
            })]
        })]
    });
    //项目等级和项目类型的联动
    this._comboBoxRank.comboBoxType = this._comboBoxType;
    this._onComboBoxRank_select = function(comboBox){
        var projectRankId = comboBox.getValue();
        var comboBoxType = comboBox.comboBoxType;
        
        comboBoxType.setValue(undefined);
        if (projectRankId == undefined) {
            comboBoxType.disable();
            comboBoxType.store.removeAll();
        }
        else {
            comboBoxType.enable();
            comboBoxType.store.load({
                params: {
                    projectRankId: projectRankId
                }
            });
        }
    }
    this.reset = function(){
        this._comboBoxRank.reset();
        this._comboBoxType.reset();
        this._dateFieldStartDateBegin.reset();
        this._dateFieldStartDateEnd.reset();
    }
    this.isValid = function(preventMark){
        var result = true;
        
        result = this._comboBoxRank.isValid(preventMark) && result;
        result = this._comboBoxType.isValid(preventMark) && result;
        result = this._dateFieldStartDateBegin.isValid(preventMark) && result;
        
        return result;
    }
    this.query = function(){
        this._store.load({
            params: {
                rankName: this._comboBoxRank.getText(),
                typeName: this._comboBoxType.getText(),
                startDateStart: Date.format(this._dateFieldStartDateBegin.getValue()),
                startDateEnd: Date.format(this._dateFieldStartDateEnd.getValue())
            }
        })
    }
    //event
    this._comboBoxRank.on('select', this._onComboBoxRank_select);
}
Ext.extend(Srims.fund.FundBatchDescendWindow_ProjectSimpleQueryPanel, Ext.Panel)

