
if (!Srims.expertGuide) 
    Ext.namespace('Srims.expertGuide');

Srims.expertGuide.testProcessDescriptionStore1 = [{
    name: '选择经费分配',
    icon: 'test/step1'
}, {
    name: '经费分配',
    icon: 'test/step2'
}, {
    name: '确认提交',
    icon: 'test/step3'
}, {
    name: '完成',
    icon: 'test/step4'
}];

Srims.expertGuide.testProcessDescriptionStore2 = [{
    name: '单步骤',
    icon: 'test/step1'
}];

Srims.expertGuide.ProcessesShowForm = function(processesDescriptionStore, title){

    this._title = title;
    this._processesDescriptionStore = processesDescriptionStore;
    this._stepIdArray = Srims.expertGuide.ProcessesShowForm._getStepIdArray(processesDescriptionStore);
    
    Srims.expertGuide.ProcessesShowForm.superclass.constructor.call(this, {
        closable: false,
        height: 80,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._title,
        collapsible: true,
        frame: true,
        bodyStyle: 'padding:0px 15px 0',
        style: 'margin-bottom: 5px',
        html: Srims.expertGuide.ProcessesShowForm._getItemsHtml(processesDescriptionStore, this._stepIdArray)
    });
    
    this.setCurrentStep = function(stepNumber){
        for (var i = 0; i < processesDescriptionStore.length; i++) {
            var current_id = this._stepIdArray[i];
            
            if (i == 0) {
                if (stepNumber > 0) 
                    this._setImage(current_id, processesDescriptionStore[i].icon);
                else 
                    this._setImage(current_id, processesDescriptionStore[i].icon + '-unfinished');
                
                continue;
            }
            
            var sepereter_id = this._stepIdArray[i - 1] + '-' + current_id;
            
            if (i < stepNumber) {
                this._setImage(current_id, processesDescriptionStore[i].icon);
                this._setImage(sepereter_id, 'step-sepereter');
            }
            else {
                this._setImage(current_id, processesDescriptionStore[i].icon + '-unfinished');
                this._setImage(sepereter_id, 'step-sepereter-unfinished');
            }
            
        }
    };
    
    this._setImage = function(id, src){
        Ext.getDom(id).src = 'images/expert-navigate/' + src + '.png';
    }
}
Ext.extend(Srims.expertGuide.ProcessesShowForm, Ext.Panel, {});

Srims.expertGuide.ProcessesShowForm._getStepIdArray = function(processesDescriptionStore){
    var idArray = [];
    for (var i = 0; i < processesDescriptionStore.length; i++) {
        var id = Ext.id();
        idArray[idArray.length] = id;
        processesDescriptionStore[i].elementId = id;
    }
    return idArray;
}

Srims.expertGuide.ProcessesShowForm._getItemsHtml = function(processesDescriptionStore, stepIdArray){
    var html = '<div style="float: right">';
    
    html += Srims.expertGuide.ProcessesShowForm._ProcessesItemHtmlTemplate.apply(processesDescriptionStore[0]);
    for (var i = 1; i < processesDescriptionStore.length; i++) {
        html += '<div style="text-align:center; width: 20px; float:left;"><image id="' + stepIdArray[i - 1] + '-' + stepIdArray[i] + '" src="images/expert-navigate/step-sepereter-unfinished.png"></div>';
        html += Srims.expertGuide.ProcessesShowForm._ProcessesItemHtmlTemplate.apply(processesDescriptionStore[i]);
    }
    
    html += '</div>';
    return html;
}

Srims.expertGuide.ProcessesShowForm._ProcessesItemHtmlTemplate = new Ext.XTemplate('<div style="text-align:center; width: 80px; float:left;">', '<image width="24" height="24" id="{elementId}" src="images/expert-navigate/{icon}-unfinished.png">', '<br />', '{name}', '</div>');
