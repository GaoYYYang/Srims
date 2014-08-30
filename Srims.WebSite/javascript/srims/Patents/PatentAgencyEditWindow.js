
if (!Srims.patents) 
    Ext.namespace('Srims.patents');

Srims.patents.PatentAgencyEditWindow = function(id, patentAgency){

    this._id = id;
    this._patentAgency = patentAgency;
    
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
    
    this._textFieldAgencyName = new Ext.form.TextField({
        fieldLabel: '机构名称',
        value: this._patentAgency.get('agencyName'),
        allowBlank: false,
        width: 180
    });
    
    this._textFieldContract = new Ext.form.TextField({
        fieldLabel: '联系方式',
        value: this._patentAgency.get('contract'),
        width: 180
    });
    
    var Items = [this._textFieldAgencyName, this._textFieldContract];
    
    Srims.patents.PatentAgencyEditWindow.superclass.constructor.call(this, {
        id: this._id,
        title: patentAgency.isNew() ? '新建专利代理机构' : '编辑专利代理机构',
        iconCls: patentAgency.isNew() ? 'icon-new' : 'icon-edit',
        width: 350,
        labelWidth: 90,
        height: 160,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: Items,
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this._save = function(){
        var patentAgency = this._patentAgency;
        patentAgency.beginEdit();
        this._assignValues();
        patentAgency.commit();
        
        Ext.Ajax.request({
            url: Srims.service.patents.PatentAgencyService + '/Save',
            params: patentAgency.data,
            scope: this,
            success: function(response){
                Srims.WorkSpace.getWorkSpace().remove(this);
                Srims.patents.listPatentAgency();
            }
        })
    }
    this.validateAgencyName = function(){
        Ext.Ajax.request({
            url: Srims.service.patents.PatentAgencyService + '/GetPatentAgencyWithSameName',
            params: {
                name: this._textFieldAgencyName.getValue()
            },
            scope: this,
            success: function(response){
                this._onValidateAgencyName(response, this);
            }
        });
    }
    this._onValidateAgencyName = function(response, window){
        if (parseInt(response.responseText) > 0) {
            Ext.MessageBox.confirm('专利机构重名', '目前已存在该专利机构，请重新输入！', function(buttonId){
                if (buttonId == 'yes') {
                    this._buttonSave.setText('保 存');
                    this._buttonSave.enable();
                }
                else {
                    Srims.WorkSpace.getWorkSpace().remove(window);
                }
            }, this);
        }
        else {
            this._save();
        }
    }
    
    this.validTextField = function(textField){
        if (textField.getValue().trim().length == 0) {
            Ext.Msg.show({
                title: textField.fieldLabel + '错误',
                msg: '您输入的值只有空格，请重新输入。',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
        return true;
    }
    this._isValid = function(preventMark){
        var result = true;
        result = this._textFieldAgencyName.isValid(preventMark) && result;
        result = this.validTextField(this._textFieldAgencyName) && result;
        
        return result;
    }
    this._assignValues = function(){
        this._patentAgency.set('agencyName', this._textFieldAgencyName.getValue());
        this._patentAgency.set('contract', this._textFieldContract.getValue());
    }
    
    //event
    this._buttonSave_Click = function(button){
        var window = button.window;
        if (!window._isValid(false)) 
            return;
        
        button.setText('正在保存');
        button.disable();
        
        window.validateAgencyName();
    }
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.patents.PatentAgencyEditWindow, Ext.Window, {})
