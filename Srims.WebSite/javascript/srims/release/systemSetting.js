
if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.SystemSetting = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'fundOutRatio',
    type: 'int',
    mapping: 'FundOutRatio'
}, {
    name: 'horizontalVoucher',
    type: 'int',
    mapping: 'HorizontalVoucher'
}, {
    name: 'verticalVoucher',
    type: 'int',
    mapping: 'VerticalVoucher'
}, {
    name: 'defaultOverheadExpenseInRateHorizonal',
    type: 'int',
    mapping: 'DefaultOverheadExpenseInRateHorizonal'
}, {
    name: 'defaultOverheadExpenseOutRateHorizonal',
    type: 'int',
    mapping: 'DefaultOverheadExpenseOutRateHorizonal'
}, {
    name: 'defaultOverheadExpenseInRateVertical',
    type: 'int',
    mapping: 'DefaultOverheadExpenseInRateVertical'
}, {
    name: 'defaultOverheadExpenseOutRateVertical',
    type: 'int',
    mapping: 'DefaultOverheadExpenseOutRateVertical'
}, {
    name: 'logType',
    type: 'string',
    mapping: 'LogType'
}, {
    name: 'emailAddress',
    type: 'string',
    mapping: 'EmailAddress'
}, {
    name: 'smtpHost',
    type: 'string',
    mapping: 'SmtpHost'
}, {
    name: 'smtpPort',
    type: 'string',
    mapping: 'SmtpPort'
}, {
    name: 'smtpPassword',
    type: 'string',
    mapping: 'SmtpPassword'
}, {
    name: 'smtpUsername',
    type: 'string',
    mapping: 'SmtpUsername'
}, {
    name: 'financeWebAddress',
    type: 'string',
    mapping: 'FinanceWebAddress'
}, {
    name: 'expertWebAddress',
    type: 'string',
    mapping: 'ExpertWebAddress'
}, {
    name: 'windowsServiceType',
    type: 'string',
    mapping: 'WindowsServiceType'
}, {
    name: 'paperDescription',
    type: 'string',
    mapping: 'PaperDescription'
}]);
Srims.data.Entity.apply(Srims.common.SystemSetting);


if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.systemSettingWindows = function(){
    var id = 'SystemSet';
    var window = Ext.getCmp(id);
    
    if (!window) {
        systemSettingStore = new Srims.common.SystemSettingStore(Srims.service.common.SystemSettingService + '/Query');
        systemSettingStore.window = window;
        systemSettingStore.on('load', function(){
            this.window = new Srims.common.SystemSettingWindow(this.getAt(0));
            this.window.show();
        })
        systemSettingStore.load();
    }
    else 
        window.show();
};

if (!Srims.common) 
    Ext.namespace('Srims.common');


Srims.common.SystemSettingWindow = function(systemSetting){
    this._title = '系统设置';
    this._systemSetting = systemSetting;
    
    this._formPanelFund = new Srims.common.SystemSettingWindow_FundForm(systemSetting);
    this._formPanelAdminRate = new Srims.common.SystemSettingWindow_AdminRateForm(systemSetting);
    this._formPanelSendMaill = new Srims.common.SystemSettingWindow_SendMaillForm(systemSetting);
    this._formPanelWindowsServer = new Srims.common.SystemSettingWindow_WindowsServerForm(systemSetting);
    this._formPanelPaper = new Srims.common.SystemSettingWindow_PaperDescriptionForm(systemSetting);
    
    this._buttonSave = new Ext.Button({
        minWidth: 80,
        text: '保存设置',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取消',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    Srims.common.SystemSettingWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 805,
        height: 700,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        closeAction: 'hide',
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls: 'icon-log-Set',
        resizable: false,
        modal: true,
        autoScroll: true,
        items: [this._formPanelFund, this._formPanelAdminRate, this._formPanelSendMaill, this._formPanelPaper, this._formPanelWindowsServer],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function(){
        this._formPanelFund.assignValues();
        this._formPanelAdminRate.assignValues();
        this._formPanelSendMaill.assignValues();
        this._formPanelWindowsServer.assignValues();
        this._formPanelPaper.assignValues();
    }
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelFund.isValid(preventMark) && result;
        result = this._formPanelAdminRate.isValid(preventMark) && result;
        result = this._formPanelSendMaill.isValid(preventMark) && result;
        return result;
    }
    this.save = function(){
        var systemSetting = this._systemSetting;
        systemSetting.beginEdit();
        this.assignValues();
        systemSetting.commit();
        
        Ext.Ajax.request({
            url: Srims.service.common.SystemSettingService + '/Save',
            params: systemSetting.data,
            scope: this,
            success: function(){
                this.close();
            }
        })
    }
    this.passwordValidate = function(){
        if (this._formPanelSendMaill._textFieldSmtpPassword.getValue() == this._formPanelSendMaill._textFieldSmtpPasswordConfirm.getValue()) 
            return true;
        else 
            return false;
    };
    this._onButtonSave_Click = function(button, e){
        var window = button.window;
        
        if (!window.isValid(false)) 
            return;
        if (!window.passwordValidate()) {
            Ext.Msg.show({
                title: '确认密码错误',
                msg: '二次密码输入不一致，请重新输入！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            })
            return false;
        }
        button.setText('正在保存');
        button.disable();
        
        window.save();
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.SystemSettingWindow, Ext.Window);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_FundForm = function(systemSetting){
	this._systemSetting = systemSetting;
	
    this._textFieldFund = new Ext.form.NumberField({
        fieldLabel: '外协经费在总经费中所占的最大比例',
        minValue: 0,
        maxValue: 100,     
        value: systemSetting.get('fundOutRatio'),
        columns: 1,
        width: 160
    });
    
    Srims.common.SystemSettingWindow_FundForm.superclass.constructor.call(this, {
        title: '经费设置',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 200,
            layout: 'form',
            items: [this._textFieldFund]
        })]
    });
	//method
	this.isValid = function(preventMark){
        var result = true;       
        result = this._textFieldFund.isValid(preventMark) && result;
        return result;
    }	
    this.assignValues = function(){
        this._systemSetting.set('fundOutRatio', this._textFieldFund.getValue());
    }
}
Ext.extend(Srims.common.SystemSettingWindow_FundForm, Ext.form.FormPanel);
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_AdminRateForm = function(systemSetting) {
	this._systemSetting= systemSetting;

   this._textFieldHorizontalRateIn = new Ext.form.NumberField({
        fieldLabel: '横向校内管理费率',
		minValue : 0,
		maxValue :100,
        value: systemSetting.get('defaultOverheadExpenseInRateHorizonal')/100,
        allowBlank: false,
        width: 160
    });
	this._textFieldHorizontalRateOut = new Ext.form.NumberField({
        fieldLabel: '横向校外管理费率',
		minValue : 0,
		maxValue :100,
        value: systemSetting.get('defaultOverheadExpenseOutRateHorizonal')/100,
        allowBlank: false,
        width: 160
    });
	this._textFieldVerticalRateIn = new Ext.form.NumberField({
        fieldLabel: '纵向校内管理费率',
		minValue : 0,
		maxValue :100,
        value: systemSetting.get('defaultOverheadExpenseInRateVertical')/100,
        allowBlank: false,
        width: 160
    });
	this._textFieldVerticalRateOut = new Ext.form.NumberField({
        fieldLabel: '纵向校外管理费率',
		minValue : 0,
		maxValue :100,
        value: systemSetting.get('defaultOverheadExpenseOutRateVertical')/100,
        allowBlank: false,
        width: 160
    });
    this._textFieldHorizontalRate = new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldHorizontalRateIn
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldHorizontalRateOut
        })]
    });
	this._textFieldVerticalRate = new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldVerticalRateIn
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldVerticalRateOut
        })]
    });
    Srims.common.SystemSettingWindow_AdminRateForm.superclass.constructor.call(this, {
        title: '管理费率设置(百分比)',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: [this._textFieldHorizontalRate,this._textFieldVerticalRate]
        })]
    });
	//method
	this.isValid = function(preventMark){
        var result = true;       
        result = this._textFieldHorizontalRateIn.isValid(preventMark) && result;
		result = this._textFieldHorizontalRateOut.isValid(preventMark) && result;
		result = this._textFieldVerticalRateIn.isValid(preventMark) && result;
		result = this._textFieldVerticalRateOut.isValid(preventMark) && result;
        return result;
    }
	this.assignValues = function (){
		this._systemSetting.set('defaultOverheadExpenseInRateHorizonal',this._textFieldHorizontalRateIn.getValue());
		this._systemSetting.set('defaultOverheadExpenseOutRateHorizonal',this._textFieldHorizontalRateOut.getValue());
		this._systemSetting.set('defaultOverheadExpenseInRateVertical',this._textFieldVerticalRateIn.getValue());
		this._systemSetting.set('defaultOverheadExpenseOutRateVertical',this._textFieldVerticalRateOut.getValue());	
	}
}
Ext.extend(Srims.common.SystemSettingWindow_AdminRateForm, Ext.form.FormPanel);	if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_SendMaillForm = function(systemSetting) {
	this._systemSetting = systemSetting;

   this._textFieldMaillAdress = new Ext.form.TextField({
        fieldLabel: '邮箱地址',
        value: systemSetting.get('emailAddress'),
		regex: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        width: 160
    });
	this._textFieldSmtpHost= new Ext.form.TextField({
        fieldLabel: 'SMTP域',
        value: systemSetting.get('smtpHost'),
        width: 160
    });
	this._textFieldSmtpPort = new Ext.form.TextField({
        fieldLabel: 'SMTP端口',
        value: systemSetting.get('smtpPort'),
        width: 160
    });
	this._textFieldSmtpUserName = new Ext.form.TextField({
        fieldLabel: 'SMTP用户名',
        value: systemSetting.get('smtpUsername'),
        width: 160
    });
	this._textFieldSmtpPassword = new Ext.form.TextField({
        fieldLabel: 'SMTP密码',
        value: systemSetting.get('smtpPassword'),
		inputType:'password',
        width: 160
    });
	this._textFieldSmtpPasswordConfirm = new Ext.form.TextField({
        fieldLabel: '确认SMTP密码',
        value: systemSetting.get('smtpPassword'),
		inputType:'password',
        width: 160
    });
    this._textFieldMaillAndSmtpHost = new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldMaillAdress
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldSmtpHost
        })]
    });
	this._textFieldSmtpPostAndSmtpUserName= new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldSmtpPort
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldSmtpUserName
        })]
    });
	this._textFieldSmtpPasswordAndSmtpPasswordConfirm= new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldSmtpPassword
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldSmtpPasswordConfirm
        })]
    });
    Srims.common.SystemSettingWindow_SendMaillForm.superclass.constructor.call(this, {
        title: '发送邮件设置',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 100,
            layout: 'form',
            items: [this._textFieldMaillAndSmtpHost,this._textFieldSmtpPostAndSmtpUserName,this._textFieldSmtpPasswordAndSmtpPasswordConfirm]
        })]
    });
	//method
	  this.isValid = function(preventMark){
        var result = true;    
        result = this._textFieldMaillAdress.isValid(preventMark) && result;
        return result;
    }
	this.assignValues = function () {
		this._systemSetting.set('emailAddress',this._textFieldMaillAdress.getValue());
		this._systemSetting.set('smtpHost', this._textFieldSmtpHost.getValue());
		this._systemSetting.set('smtpPort', this._textFieldSmtpPort.getValue());
		this._systemSetting.set('smtpUsername',this._textFieldSmtpUserName.getValue());
		this._systemSetting.set('smtpPassword',this._textFieldSmtpPassword.getValue());
	}
}
Ext.extend(Srims.common.SystemSettingWindow_SendMaillForm, Ext.form.FormPanel);	
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_WindowsServerForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._textFieldFinanceWebAddress = new Ext.form.TextField({
        fieldLabel: '财务处网站',
        value: systemSetting.get('financeWebAddress'),
        columns: 1,
        width: 160
    });
    this._textFieldExpertWebAddress = new Ext.form.TextField({
        fieldLabel: '人事处网站',
        value: systemSetting.get('expertWebAddress'),
        columns: 1,
        width: 160
    });
    this._textFieldFinanceAndExpertWebAddress = new Ext.Panel({
        layout: 'column',
        labelWidth: 120,
        items: [new Ext.Panel({
            width: 400,
            layout: 'form',
            items: this._textFieldFinanceWebAddress
        }), new Ext.Panel({
            width: 300,
            layout: 'form',
            items: this._textFieldExpertWebAddress
        })]
    });
    this._checkboxGroupWindowsService = new Srims.component.CheckBoxGroup({
        fieldLabel: 'Windows服务',
        cls: 'srims-checkboxGroup-logSetModel',
        bodyStyle: 'padding:10px 10px 0',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.common.WindowsServiceStore, this._systemSetting.get("windowsServiceType"))
    });
    Srims.common.SystemSettingWindow_WindowsServerForm.superclass.constructor.call(this, {
        title: 'Windows服务设置',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            items: [this._textFieldFinanceAndExpertWebAddress, this._checkboxGroupWindowsService]
        })]
    });
    this.assignValues = function(){
        this._systemSetting.set('financeWebAddress', this._textFieldFinanceWebAddress.getValue());
        this._systemSetting.set('expertWebAddress', this._textFieldExpertWebAddress.getValue());
        this._systemSetting.set('windowsServiceType', this._checkboxGroupWindowsService.getSelecetedValue());
    }
}
Ext.extend(Srims.common.SystemSettingWindow_WindowsServerForm, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.WindowsServiceStore = [['PatentEmailAutoSent', '专利费自动提醒'], ['FinanceAutoImport', '经费自动导入'], ['ExpertAutoImport', '专家自动导入'], ['ProjectEndAwoke', '项目结项邮件提醒'], ['VoucherPrint', '凭单打印邮件提醒'], ['FundAllocation', '经费分配邮件提醒'], ['AdminWorkAwoke', '管理员审核工作邮件提醒'], ['ExpertCensorRemind', '专家审核提醒'], ['VoucherPrintedRemind', '凭单已经打印提醒'],['CensorVerticalProjectRemind', '审核纵向项目提醒'],
['CensorHorizontalProjectRemind', '审核横向项目提醒'],
['CensorDocumentRemaind', '审核文档提醒'],
['CensorContractRemaind','审核合同提醒'],
['CensorFundAllocationRemaind','审核经费分配提醒'],
['CensorProjectRemaind','审核项目立项提醒'],
['CensorFundDescendRemaind','审核经费下拨提醒']
];

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.common.SystemSettingStore.superclass.constructor.call(this, new Srims.common.SystemSettingXmlReader(), load_url, params);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');
	
	Srims.common.SystemSettingXmlReader = Ext.extend(Srims. data.XmlReader,{
		constructor: function(){
			Srims.common.SystemSettingXmlReader.superclass.constructor.call(this,Srims.common.SystemSetting);
		}
	});
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.SystemSettingWindow_PaperDescriptionForm = function(systemSetting){
    this._systemSetting = systemSetting;
    
    this._textFieldFund = new Ext.form.TextArea({
        fieldLabel: '论文库界面上文字说明',
        minValue: 0,
        maxValue: 100,
        labelWidth: 90,
        value: systemSetting.get('paperDescription'),
        height: 80,
        width: 600
    });
    
    Srims.common.SystemSettingWindow_PaperDescriptionForm.superclass.constructor.call(this, {
        title: '论文库说明',
        frame: true,
        layout: 'form',
        labelWidth: 90,
        width: 770,
        items: [new Ext.Panel({
            labelWidth: 90,
            layout: 'form',
            items: [this._textFieldFund]
        })]
    });
    //method
    this.isValid = function(preventMark){
        var result = true;
        result = this._textFieldFund.isValid(preventMark) && result;
        return result;
    }
    this.assignValues = function(){
        this._systemSetting.set('paperDescription', this._textFieldFund.getValue());
    }
}
Ext.extend(Srims.common.SystemSettingWindow_PaperDescriptionForm, Ext.form.FormPanel);
