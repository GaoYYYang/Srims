
if (!Srims.projects) 
    Ext.namespace("Srims.projects");

Srims.projects.ProjectRankSelectWindow = function(id){

    this._newProject = new Srims.projects.Project({});
    var startDate = new Date();
    var endDate = new Date(startDate.getFullYear() + 2, 11, 31);
    this._newProject.set('level', Srims.projects.ProjectLevel.Perside);
    this._newProject.set('state', Srims.projects.ProjectState.WaitingStartInformation);
    this._newProject.set('startDate', startDate);
    this._newProject.set('endDate', endDate);
    
    this._id = id;
    
    this._buttonClose = new Ext.Button({
        minWidth: 60,
        text: '确 定',
        window: this
    });
    
    this._projectRankRadioGroup = new Srims.component.RadioGroup({
        allowBlank: false,
        items: Srims.component.RadioGroup.ProjectRankStoreFunction(),
        width: 300
    });
    
    Srims.projects.ProjectRankSelectWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '请选择项目等级',
        width: 300,
        height: 100,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        resizable: false,
        items: [new Ext.Panel({
            width: 300,
            autoHeight: true,
            titile: '',
            frame: true,
            items: this._projectRankRadioGroup
        })],
        buttonAlign: 'center',
        buttons: [this._buttonClose]
    });
    this.assignValue = function(){
        this._newProject.set('isHorizontal', this._projectRankRadioGroup.getValue() == 'true' ? true : false);
        
    }
    this._buttonClose_Click = function(button){
        var window = button.window;
        if (window._projectRankRadioGroup.getValue() == 'false' && window._projectRankRadioGroup.getRadio(1).checked == false) {
            Ext.Msg.show({
                title: '项目横纵向不能为空',
                msg: '请选择项目横纵向',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        window.assignValue();
        window.close();
        Srims.projects.showExpertGuidProjectEditPanel(window._newProject);
    }
    this._buttonClose.on('click', this._buttonClose_Click)
}
Ext.extend(Srims.projects.ProjectRankSelectWindow, Ext.Window, {});
