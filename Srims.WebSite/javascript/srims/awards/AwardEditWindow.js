
if (!Srims.awards) 
    Ext.namespace('Srims.awards');

Srims.awards.AwardEditWindow = function(panelId, award){
    this._award = award;
    this._params = {};
    this._id = panelId;
    
    this._basicPanel = new Srims.awards.AwardEditWindow_BasicPanel(award);
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '经费成员所在学院',
        emptyText: '请选择所属学院',
        value: award.get('collegeName'),
        store: new Srims.experts.DepartmentStore(Srims.service.experts.DepartmentService + '/GetAllColleges'),
        displayField: 'name',
        entityId: award.get('collegeID'),
        editable: false,
        triggerAction: 'all',
        width: 160
    });
    this._buttonCancle = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
            window.close();
        }
    });
    
    Srims.awards.AwardEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: award.isNew() ? '新建奖励' : '编辑奖励',
        iconCls: award.isNew() ? 'icon-award-new' : 'icon-edit',
        width: 570,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        resizable: false,
        items: [this._basicPanel],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancle]
    });
    
    //method
    this.assignValues = function(){
        this._basicPanel.assignValues();
    }
    this.clearParams = function(){
        this._basicPanel.clearParams();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._basicPanel.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var award = this._award;
        var isNew = this._isNew;
        award.beginEdit();
        this.assignValues();
        award.commit();
        
        Ext.Ajax.request({
            url: Srims.service.awards.AwardService + '/SaveAward',
            params: award.data,
            scope: this,
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.awards.AwardXmlReader()
                });
                var newAward = store.getAt(0);
                if (isNew) {
                    //新建完，列表刷新，显示新建奖励
                    Srims.WorkSpace.getWorkSpace().remove(this);
                    Srims.awards.listAward(false, false);
                    Srims.awards.showAward(newAward);
                }
                else {
                    //编辑完，列表刷新，显示奖励刷新
                    var panelID = 'AwardShowPanel' + award.get('id');
                    Srims.WorkSpace.getWorkSpace().remove(this);
                    Srims.awards.listAward(false, false);
                    if (Ext.getCmp(panelID)) 
                        Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);
                    Srims.awards.showAward(newAward, store);
                }
            }
        })
    }
    
    //event
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.awards.AwardEditWindow, Ext.Window);
