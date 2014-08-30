
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ProjectSetDelegatePrincipalWindow = function(id, projects, store){

    this._projects = projects;
    this._store = store;
    this._id = id;
    
    this._helpPanel = new Ext.Panel({
        style: 'margin-bottom: 2px',
        frame: true,
        hidden: false,
        html: '提示：<ul style="text-indent:2em"><li>在下面的输入框中输入专家<span style="color: Red;">姓名</span>或专家<span style="color: Red;">姓名首字母缩写</span>查找并选择专家</li></ul>'
    });
    
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保 存',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isvalidate(false)) 
                return false;
            Srims.projects.setDeletatePrincipal(window._projects, window._comboBoxExpert.getValue(), window._store);
            window.close();
        }
    });
    
    this._comboBoxExpert = new Srims.component.ExpertSearch.SearchComboBox({
        fieldLabel: '委托负责人',
        width: 150,
        itemCls: 'combox-set-delegate',
        allowBlank: false
    });
    
    this.isvalidate = function(preventMark){
        var result = true;
        
        result = this._comboBoxExpert.isValid(preventMark) && result;
        result = this.vidateDelegatePrincipal() && result;
        
        return result;
    }
    this.vidateDelegatePrincipal = function(){
        for (var i = 0; i < this._projects.length; i++) {
            var project = this._projects[i];
            var principalId = project.get('principalId');
            if (principalId == this._comboBoxExpert.getValue()) {
                Ext.Msg.show({
                    title: '指定委托负责人错误',
                    msg: '项目的委托负责人不能是项目的负责人',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                return false;
            }
        }
        return true;
    }
    Srims.projects.ProjectSetDelegatePrincipalWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '指定项目委托负责人',
        iconCls: 'icon-set-delegate-principal',
        width: 450,
        labelWidth: 70,
        autoHeight: true,
        modal: true,
        closeAction: 'close',
        deferredRender: false,
        layout: 'form',
        items: [this._helpPanel, this._comboBoxExpert],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.focus = function(){
        this._comboBoxExpert.focus(false, true);
    }
    this.focus();
}
Ext.extend(Srims.projects.ProjectSetDelegatePrincipalWindow, Ext.Window, {});
