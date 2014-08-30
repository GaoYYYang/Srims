
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.ViewDefineWindow = function(id, view, store){

    this._id = id;
    this._view = view;
    
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
        window: this
    });
    
    this._textFieldViewName = new Ext.form.TextField({
        fieldLabel: '视图说明',
        width: 300,
        maxValue: 200,
        minValue: 1,
        value: view.get('name'),
        allowBlank: false
    });
    this._checkboxIsPublic = new Ext.form.Checkbox({
        fieldLabel: '是否公开',
        disabled: !Srims.common.ViewType.isCanPublic(view.get('type'))
    });
    
    Srims.common.ViewDefineWindow.superclass.constructor.call(this, {
        id: this._id,
        title: view.isNew() ? ('新建' + Srims.common.viewTypeRender(view.get('type')) + '视图') : '编辑视图：' + view.get('name'),
        width: 450,
        labelWidth: 70,
        height: 150,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._textFieldViewName, this._checkboxIsPublic],
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldViewName.isValid(preventMark) && result;
        return result;
    }
    this._assignValues = function(){
        this._view.set('isPublic', this._checkboxIsPublic.getValue());
        this._view.set('name', this._textFieldViewName.getValue());
    }
    this._save = function(){
        this._assignValues();
        Ext.Ajax.request({
            url: Srims.service.common.ViewService + '/Save',
            params: {
                definition: this._view.get('definition'),
                isPublic: this._view.get('isPublic'),
                name: this._view.get('name'),
                viewType: this._view.get('type'),
                viewId: this._view.isNew() ? '' : this._view.get('id')
            },
            scope: this,
            success: function(){
                Ext.Msg.show({
                    title: '保存视图成功',
                    msg: '成功保存视图',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
                if (store) 
                    store.load();
                
                this.close();
            }
        });
    }
    this._buttonSave_Click = function(button){
        var window = button.window;
        
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window._save();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.common.ViewDefineWindow, Ext.Window, {})
