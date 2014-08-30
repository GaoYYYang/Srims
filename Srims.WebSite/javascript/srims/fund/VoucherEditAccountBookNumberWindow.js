
if (!Srims.fund) 
    Ext.namespace('Srims.fund');

Srims.fund.VoucherEditAccountBookNumberWindow = function(id, voucher, fundAllocation){

    this._voucher = voucher;
    this._fundAllocation = fundAllocation;
    
    this._InforPanel = new Srims.fund.VoucherEditAccountBookNumberWindow_InforPanel();
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
        text: '修 改',
        window: this
    });
    
    this._fieldAccountBookNumber = new Ext.form.TextField({
        fieldLabel: '账本号',
        allowBlank: false,
        value: this._voucher.get('accountBookNumber'),
        width: 160
    });
    
    Srims.fund.VoucherEditAccountBookNumberWindow.superclass.constructor.call(this, {
        id: id,
        title: '编辑账本号',
        width: 400,
        autoHeight: true,
        deferredRender: false,
        frame: true,
        modal: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._InforPanel, new Ext.Panel({
            layout: 'form',
            bodyStyle: 'padding:5px 10px 0 10px',
            height: 70,
            frame: true,
            labelWidth: 50,
            items: [this._fieldAccountBookNumber]
        })],
        
        buttons: [this._buttonSave, this._buttonClose]
    });
    
    this.validateAccountBookNumber = function(){
        var accountBookNumber = this.getValue();
        var fundMemberCollegeCode = String.isEmpty(this.window._voucher.get('expertCollegeCode')) ? '' : this.window._voucher.get('expertCollegeCode').substr(0, 1);
        var projectTypePreCode = this.window._voucher.get('projectTypePreCode');
        
        //账本号只能是数字和字母
        var accountBookNumberpattern = /^[A-Z|a-z|0-9]{10}$/;
        var accountBookNumberWithDivisionpattern = /^[A-Z|a-z|0-9]{4}-[A-Z|a-z|0-9]{6}$/;
        
        var fundMemberStore = this.window._fundAllocation.panel._formPanelFundMember._store;
        var fundMembers = fundMemberStore.getRange();
        
        for (var i = 0; i < fundMembers.length; i++) {
            if (this.window._voucher.get('expertID') == fundMembers[i].get('expertId')) 
                continue;
            
            if (accountBookNumber == fundMembers[i].get('accountBookNumber')) {
                this.invalidText = '账本号不能重复';
                return false;
            }
        }
        //设定特殊用户
        var user = Srims.currentLoginLog.user;
        if (user.loginId == 'yuandong' || user.loginId == 'admin') 
            return true;
        
        var DivisionPosition = accountBookNumber.indexOf('-');
        var hasDivision = DivisionPosition >= 0;
        
        if (!hasDivision && !accountBookNumberpattern.test(accountBookNumber) || hasDivision && !accountBookNumberWithDivisionpattern.test(accountBookNumber)) {
            this.invalidText = '账本号格式不对：账本号长度必须为10位；除第五位可以为为"-"外，账本号只能是数字或字母';
            return false;
        }
        if (fundMemberCollegeCode != '' && accountBookNumber.substr(0, 1) != fundMemberCollegeCode) {
            this.invalidText = '账本号的前四位必须是专家的院系代码';
            return false;
        }
        
        var accountBookNumberProjectTypeCode = hasDivision ? accountBookNumber.substr(5, 2) : accountBookNumber.substr(4, 2);
        if (!String.isEmpty(projectTypePreCode) && accountBookNumberProjectTypeCode != projectTypePreCode) {
            this.invalidText = '第五位和第六位必须是项目类型代码：' + projectTypePreCode;
            return false;
        }
        
        return true;
    }
    
    this._fieldAccountBookNumber.window = this;
    this._fieldAccountBookNumber.validator = this.validateAccountBookNumber;
    
    this.validate = function(preventMark){
        var result = true;
        result = this._fieldAccountBookNumber.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        Ext.Ajax.request({
            url: Srims.service.fund.VoucherService + '/SaveForSetAccountBookNumber',
            params: {
                voucherId: this._voucher.get('id'),
                accountBookNumber: this._fieldAccountBookNumber.getValue()
            },
            scope: this,
            success: function(){
                this._fundAllocation.panel.refresh();
                this.close();
            }
        });
    }
    this.buttonSave_click = function(button, e){
        var window = button.window;
        
        if (!window.validate(false)) 
            return;
        
        Ext.MessageBox.confirm('编辑账本号', '你确定输入的账本号正确吗？此操作不可撤销，不可修改。', function(buttonId){
            if (buttonId == 'yes') {
                button.setText('正在修改');
                button.disable();
                
                window.save();
            }
        }, this);
    }
    this._buttonSave.on('click', this.buttonSave_click);
}
Ext.extend(Srims.fund.VoucherEditAccountBookNumberWindow, Ext.Window);
