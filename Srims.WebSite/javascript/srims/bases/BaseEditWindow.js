
if (!Srims.bases) 
    Ext.namespace('Srims.bases');

Srims.bases.BaseEditWindow = function(windowlId, base){
    this._base = base;
    this._id = windowlId;
    
    this._editBasicForm = new Srims.bases.BaseEditWindow_BasicPanel(this._base);
    
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
    this._buttonCancle = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    
    
    Srims.bases.BaseEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: base.isNew() ? '新建基地' : '编辑基地',
        iconCls: base.isNew() ? 'icon-base-new' : 'icon-edit',
        autoWidth: true,
        autoHeight: true,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'column',
        resizable: false,
        items: [this._editBasicForm],
        buttons: [this._buttonSave, this._buttonReset, this._buttonCancle]
    });
    
    //method
    this.assignValues = function(){
        this._editBasicForm.assignValues();
    }
    this.clearParams = function(){
    
        this._editBasicForm.clearParams();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = result && this._editBasicForm.isValid(preventMark);
        return result;
    }
    this.save = function(){
        var base = this._base;
        var isNew = this._isNew;
        base.beginEdit();
        this.assignValues();
        base.commit();
        
        Ext.Ajax.request({
            url: Srims.service.bases.BaseService + '/Save',
            params: base.data,
            scope: this,
            success: function(response){
                var store = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.bases.BaseXmlReader()
                });
                var newBase = store.getAt(0);
                
                Srims.bases.listBase(false);
                Srims.bases.showBase(newBase);
				
                this.close();
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
Ext.extend(Srims.bases.BaseEditWindow, Ext.Window);
