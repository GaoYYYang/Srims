
if (!Srims.expertGuide) 
    Ext.namespace('Srims.expertGuide');

Srims.expertGuide.SingleProcessOperatePanel = function(guidName, processesDescriptionStore, processesPanels) {

    this._buttonPreviousStep = new Ext.Button({
        minWidth: 80,
        text: '上一步',
        form: this
    });
    this._buttonNextStep = new Ext.Button({
        minWidth: 80,
        text: '下一步',
        form: this
    });
    this._buttonComplete = new Ext.Button({
        minWidth: 80,
        text: '完成',
        form: this
    });
    this._params = {};
    this._processesDescriptionStore = processesDescriptionStore;
    this._processesPanels = processesPanels;
    this._processStep = 0;

    var divId = 'DivExpertGuid_' + guidName;
    this._helpDescriptionPanel = new Ext.Panel({
        bodyStyle: 'padding:10px 5px 10px 5px',
        style: 'margin-bottom: 2px',
        html: '<div id=' + divId + '>'
    });

    var items = [this._helpDescriptionPanel];
    for (var i = 0; i < this._processesPanels.length; i++) {
        this._processesPanels[i].panel = this;
        this._processesPanels[i].button = this._buttonNextStep;
        items[items.length] = this._processesPanels[i];
    }

    Srims.expertGuide.SingleProcessOperatePanel.superclass.constructor.call(this, {
        deferHeight: false,
        buttonAlign: 'left',
        title: '占用',
        items: items,
        buttons: [this._buttonPreviousStep, this._buttonNextStep, this._buttonComplete]
    });

    //控制按钮的显示
    this.setButtonVisible = function() {

        this._buttonPreviousStep.setVisible(this._processStep + 1 != this._processesDescriptionStore.length);
        this._buttonPreviousStep.setDisabled(this._processStep == 0);

        this._buttonNextStep.setVisible(this._processStep + 1 != this._processesDescriptionStore.length);
        this._buttonComplete.setVisible(this._processStep + 1 == this._processesDescriptionStore.length);
    }
    this.setButtonVisible();
    //控制panel的显示
    this.setPanelVisible = function() {
        for (var i = 1; i < this.items.length; i++) {
            if (this.items.get(i))
                this.items.get(i).setVisible(this._processStep + 1 == i);
        }
        //控制控件获得焦点
        if (this.items.get(this._processStep + 1) && this.items.get(this._processStep + 1).focus)
            this.items.get(this._processStep + 1).focus();

        this.doLayout();
    }
    this.setPanelVisible();
    //控制title的显示
    this.setPanelTitle = function() {
        var title = this._processesDescriptionStore[this._processStep].name;
        this.setTitle(title);
    }
    this.setPanelTitle();
    //控制帮助说明的显示
    this.setHelpDescription = function() {
        if (!Ext.getDom(divId))
            this._helpDescriptionPanel.html = '<div id=' + divId + '>' + this._processesDescriptionStore[this._processStep].description + '</div>';
        else {
            Ext.getDom(divId).innerHTML = ' ';
            Ext.getDom(divId).innerHTML = this._processesDescriptionStore[this._processStep].description;
        }
    }
    this.setHelpDescription();
    //控制按钮文字的显示
    this.setButtonText = function() {
        if (this._processesDescriptionStore[this._processStep].buttonNextText)
            this._buttonNextStep.setText(this._processesDescriptionStore[this._processStep].buttonNextText);
        else
            this._buttonNextStep.setText('下一步');

        if (this._processesDescriptionStore[this._processStep].buttonPreviousText)
            this._buttonPreviousStep.setText(this._processesDescriptionStore[this._processStep].buttonNextText);
        else
            this._buttonPreviousStep.setText('上一步');

        this._buttonNextStep.setDisabled(false);
    }
    this.setButtonText();
    //控制进度图标的显示
    this.setProcessesIcons = function() {
        this.panel._processesShowPanel.setCurrentStep(this._processStep + 1);
    }
    //重置页面
    this.reset = function() {
        this.setButtonVisible();
        this.setPanelVisible();
        this.setProcessesIcons();
        this.setPanelTitle();
        this.setHelpDescription();
        this.setProcessesIcons();
        this.setButtonText();
    }

    this.buttonPreviousStep_click = function(button, e) {
        var form = this.form;
        if (form._processesPanels[form._processStep].previous) {
            form._processesPanels[form._processStep].previous();
        }

        form._processStep = form._processStep - 1;
        form.reset();
    }
    this.buttonNextStep_click = function(button, e) {
        var form = this.form;
            form._processesPanels[form._processStep].next();
        
    }
    this.buttonComplete_click = function(button, e) {
        var form = this.form;
        Srims.WorkSpace.getWorkSpace().remove(form.panel);
    }
    this._buttonPreviousStep.on('click', this.buttonPreviousStep_click);
    this._buttonNextStep.on('click', this.buttonNextStep_click);
    this._buttonComplete.on('click', this.buttonComplete_click);
}
Ext.extend(Srims.expertGuide.SingleProcessOperatePanel, Ext.Panel, {});

