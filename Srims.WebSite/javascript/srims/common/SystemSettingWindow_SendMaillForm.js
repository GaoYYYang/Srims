if (!Srims.common)
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