/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.Outsourcing = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'legalRepresentativeName',
    type: 'string',
    mapping: 'LegalRepresentativeName'
}, {
    name: 'registeredCapital',
    type: 'string',
    mapping: 'RegisteredCapital'
}, {
    name: 'registeredCardNumber',
    type: 'string',
    mapping: 'RegisteredCardNumber'
}, {
    name: 'organizationCode',
    type: 'string',
    mapping: 'OrganizationCode'
}, {
    name: 'taxNumber',
    type: 'string',
    mapping: 'TaxNumber'
}, {
    name: 'companyType',
    type: 'string',
    mapping: 'CompanyType'
},
 {
     name: 'managementType',
     type: 'string',
     mapping: 'ManagementType'
 },
  {
      name: 'businessScope',
      type: 'string',
      mapping: 'BusinessScope'
  },
  {
      name: 'createDateTime',
      type: 'date',
      mapping: 'CreateDateTime'
  },
  {
      name: 'dealDateTimeStart',
      type: 'date',
      mapping: 'DealDateTimeStart'
  },
   {
       name: 'dealDateTimeEnd',
       type: 'date',
       mapping: 'DealDateTimeEnd'
   },
  {
      name: 'remark',
      type: 'string',
      mapping: 'Remark'
  }, {
      name: 'isVerify',
      type: 'string',
      mapping: 'IsVerify'
  }, {
      name: 'hasPermission_Edit',
      type: 'boolean',
      mapping: 'HasPermission_Edit',
      convert: Boolean.toBoolean
  }, {
      name: 'hasPermission_Delete',
      type: 'boolean',
      mapping: 'HasPermission_Delete',
      convert: Boolean.toBoolean
  }, {
      name: 'canEdit',
      type: 'boolean',
      mapping: 'CanEdit',
      convert: Boolean.toBoolean
  }, {
      name: 'vefiy',
      type: 'string',
      mapping: 'Vefiy'
  }, {
      name: 'currentUserID',
      type: 'string',
      mapping: '  CurrentUserID'
  },
   {
       name: 'userID',
       type: 'string',
       mapping: '  UserID'
   }, {
   name: 'address',
       type: 'string',
       mapping: 'Address'
   },
 {
     name: 'canDelete',
     type: 'boolean',
     mapping: 'CanDelete'
 },
 {
     name: 'taxCard',
     type: 'string',
     mapping: 'TaxCard'
 },
 {
     name: 'companyCard',
     type: 'string',
     mapping: 'CompanyCard'
 },
 {
     name: 'groupCard',
     type: 'string',
     mapping: 'GroupCard'
 },
 {
     name: 'projectNumber',
     type: 'string',
     mapping: 'ProjectNumber'
 },
 {
     name: 'projectName',
     type: 'string',
     mapping: 'ProjectName'
 },
 {
     name: 'projectRank',
     type: 'string',
     mapping: 'ProjectRank'
 },
 {
     name: 'projectType',
     type: 'string',
     mapping: 'ProjectType'
 },
 {
     name: 'projectOutAmount',
     type: 'int',
     mapping: 'ProjectOutAmount'
 },
 {
     name: 'allocatedAmount',
     type: 'int',
     mapping: 'AllocatedAmount'
}]);
Srims.data.Entity.apply(Srims.common.Outsourcing);
if (!Srims.component)
    Ext.namespace('Srims.component');

Srims.component.FileUploadWindow = function(id, store, importUrl, description, isMagazienInformation, outsourcing) {

    this._id = id;
    this._store = store;
    this._outsourcing = outsourcing;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '导 入',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            window.formPanel = window._formPanelData;
            window.store = window._store;
            window.outsourcing = window._outsourcing;

            var params = {};
            if (isMagazienInformation)
                params.year = window._numberFieldYear.getValue();

            window.formPanel.getForm().submit({
                params: params,
                url: importUrl,
                //                waitMsg: '正在导入数据，请耐心等候....',
                success: function(form, action) {
                    //                    //                success: function(response) {
                    //                    if (window.store)
                    //                        window.store.load();
                    var nam = action.result.data[0].name;
                    if (description == '企业法人证书') {
  
                        window.outsourcing.set('companyCard', nam);
                    }
                    if (description == '组织机构代码证')
                        window.outsourcing.set('groupCard', action.result.data[0].name);
                    if (description == '税务登记证')
                        window.outsourcing.set('taxCard', action.result.data[0].name);
                    Ext.Msg.show({
                        title: '成功导入数据',
                        msg: '导入数据成功',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.INFO
                    });

                    window.close();
                }
            });
        }
    });
    this._fieldDesprition = new Ext.form.Field({
        fieldLabel: '说明',
        value: description,
        readOnly: true,
        width: 180
    });
    this._numberFieldYear = new Ext.form.NumberField({
        fieldLabel: '年份',
        allowDecimals: false,
        allowNegative: false,
        minLength: 4,
        maxLength: 4,
        maxValue: (new Date()).getFullYear(),
        minValue: 1900,
        width: 180,
        allowBlank: false
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'ImportData',
        fieldLabel: '选择数据文件',
        width: 180,
        emptyText: '请选择要导入的数据文件',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc', 'docx'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });

    var items = [];
    if (isMagazienInformation)
        items = [this._fieldDesprition, this._numberFieldYear, this._fileUploadField];
    else
        items = [this._fieldDesprition, this._fileUploadField];

    this._formPanelData = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 80,
        autoHeight: true,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: items
    });

    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        if (isMagazienInformation)
            result = this._numberFieldYear.isValid(preventMark) && result;

        return result;
    }

    Srims.component.FileUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: description,
        fileUpload: true,
        width: 350,
        labelWidth: 80,
        autoHeight: true,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelData],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.component.FileUploadWindow, Ext.Window, {});

if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.FileUploadField = function(params){
    Srims.component.FileUploadField.superclass.constructor.call(this, params);
}
Ext.extend(Srims.component.FileUploadField, Ext.form.FileUploadField, {
    validator: function(){
        var x = this.getValue();
        if (!x) 
            return;
        if (this.fileTypes.length == 0) 
            return true;
        
        var patn = '/'
        var docType = '';
        for (var i = 0; i < this.fileTypes.length; i++) {
            patn += '\.' + this.fileTypes[i] + '$|';
            docType += this.fileTypes[i] + '，';
        }
        patn = patn.substring(0, patn.length - 1);
        patn += '/i';
        patn = eval(patn);
        
        docType = docType.substring(0, docType.length - 1);
        if (!patn.test(x)) {
            this.invalidText = '只能上传' + docType + '文档。';
            return false;
        }
        return true;
    }
});

/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingVerfiyPanel = function(IsInformation,id, outsourcing, store) {
    this._id = id;
    var clickTimes = 0;
    this._outsourcing = outsourcing;
    this._store = store;
    this._title = outsourcing.isNew() ? "新建外协单位" : '编辑外协单位-'
			+ outsourcing.get('name');

    this._basicForm = new Srims.common.OutsourcingEditPanel_Basic(IsInformation,outsourcing); // 位于文件Srims.common.OutsourcingEditPanel_Basic.js中
    this._buttonDownFile = new Ext.Button({
        minWidth: 100,
        text: '下载企业法人证书',
        panel: this,
        outsourcing: this._outsourcing,
        handler: function() {
            var id = outsourcing.get('id');
                Srims.documents.downLoadResource(id, '/GetOutSoucingFile1');
        }
    });
    this._buttonDownFile2 = new Ext.Button({
        minWidth: 100,
        text: '下载组织机构代码证',
        panel: this,
        outsourcing: this._outsourcing,
        handler: function() {
            var id = outsourcing.get('id');
                Srims.documents.downLoadResource(id, '/GetOutSoucingFile2');
        }
    });
    this._buttonDownFile3 = new Ext.Button({
        minWidth: 100,
        text: '下载税务登记证',
        panel: this,
        outsourcing: this._outsourcing,
        handler: function() {
            var id = outsourcing.get('id');
                Srims.documents.downLoadResource(id, '/GetOutSoucingFile3');
        }
    });
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '审核通过',
        panel: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 100,
        text: '驳回',
        outsourcing: this._outsourcing,
        panel: this//,
        //        handler: function() {
        //            var panel = this.panel;
        //            panel.clearParams();
        //        }
    });
    this._buttonCanel = new Ext.Button({
        minWidth: 100,
        text: '取消',
        panel: this,
        handler: function() {
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });
    if (this._outsourcing.get('isVerify') != "审核驳回")
        var items = [this._buttonDownFile, this._buttonDownFile2, this._buttonDownFile3, this._buttonSave, this._buttonReset, this._buttonCanel];
    if (this._outsourcing.get('isVerify') == "审核驳回")
        var items = [this._buttonDownFile, this._buttonDownFile2, this._buttonDownFile3, this._buttonSave, this._buttonCanel];
    
    Srims.common.OutsourcingVerfiyPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px;width:1200px;',
        closable: true,
        frame: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._title,
        iconCls: this._outsourcing.isNew()
						? 'icon-outsourcing-new'
						: 'icon-outsourcing-edit',
        items: [this._basicForm],
        buttons: items
    });
    // method
    this.assignValues = function() {
        this._basicForm.assignValues();
    }
    this.clearParams = function() {
        this._basicForm.clearParams();
    }
    this.isValid = function(preventMark) {
        var result = true;

        result = this._basicForm.isValid(preventMark) && result;

        return result;
    }
    this.save = function() {
        var outsourcing = this._outsourcing;
        var isNew = this._outsourcing.isNew();

        outsourcing.beginEdit();
        this.assignValues();
        outsourcing.commit();

        Ext.Ajax.request({
            url: Srims.service.common.OutsourcingService + '/Verfiy',
            params: outsourcing.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.common.OutsourcingXmlReader()
                });
                var newOutsourcing = newStore.getAt(0);
                if (!isNew) {
                    var panelID = 'OutsourcingShowPanel'
									+ newOutsourcing.get('id');
                    if (Ext.getCmp(panelID))
                        Srims.WorkSpace.getWorkSpace().remove(
										Ext.getCmp(panelID), true);
                    var gridPanel = Ext.getCmp('OutourcingGridPanel');
                    if (gridPanel) {
                        Srims.WorkSpace.active('OutourcingGridPanel');
                        Ext.getCmp('OutourcingGridPanel').getStore().load();
                    }
                }

                Srims.common.ShowOutsourcing(newOutsourcing);
            }
        });
    }
    this.resetsave = function() {
        var outsourcing = this._outsourcing;
        var isNew = this._outsourcing.isNew();

        outsourcing.beginEdit();
        this.assignValues();
        outsourcing.commit();

        Ext.Ajax.request({
            url: Srims.service.common.OutsourcingService + '/DisVerfiy',
            params: outsourcing.data,
            scope: this,
            success: function(response) {
                Srims.WorkSpace.getWorkSpace().remove(this);
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.common.OutsourcingXmlReader()
                });
                var newOutsourcing = newStore.getAt(0);
                if (!isNew) {
                    var panelID = 'OutsourcingShowPanel'
									+ newOutsourcing.get('id');
                    if (Ext.getCmp(panelID))
                        Srims.WorkSpace.getWorkSpace().remove(
										Ext.getCmp(panelID), true);
                }

                Srims.common.ShowOutsourcing(newOutsourcing);
            }
        });
    }
    this.down = function() {
        var outsourcing = this._outsourcing;
        var isNew = this._outsourcing.isNew();

        Srims.common.outsourcing.downLoadDocument(this._id);

    }
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;
        if (!panel.isValid(false))
            return;
        button.disable();
        panel.save();
    }
    this._onButtonReset_Click = function(button, e) {
        var panel = button.panel;

        Srims.common.rejectOutsourcingCensor(this.outsourcing);
        button.disable();
        //panel.resetsave();
    }
    this._onbuttonDownFile_Click = function(button, e) {
        var outsourcing = this._outsourcing;

        button.disable();

    }
    this._buttonSave.on('click', this._onButtonSave_Click);

    this._buttonReset.on('click', this._onButtonReset_Click);

}
Ext.extend(Srims.common.OutsourcingVerfiyPanel, Ext.Panel, {});
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.submitResource = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){
    var user = Srims.currentLoginLog.user;
    
    window.formPanel.getForm().submit({
        params: saveParams,
        url: Srims.service.ResourceService + '/IsSizeable',
        failure: function(){
            if (user.userRoleType == 'Administrator' && user.isSuper) {
                Ext.MessageBox.confirm('上传文件大于100M', '上传文件大于20M，你确定要上传文件吗？', function(buttonId){
                    if (buttonId == 'yes') 
                        Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
                }, this);
            }
            else 
                Ext.Msg.show({
                    title: '不能上传文件',
                    msg: '每个文件不能大于100M，请联系超级管理员上传大于20M的文件。',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.WARNING
                })
        },
        success: function(form, action){
            Srims.documents.submitResources(window, saveParams, requestUrl, waitMsg, msg, msgInfo);
        }
        
    });
}
Srims.documents.submitResources = function(window, saveParams, requestUrl, waitMsg, msg, msgInfo){

    window.formPanel.getForm().submit({
        params: saveParams,
        url: requestUrl,
        waitMsg: waitMsg,
        method: 'post',
        success: function(form, action){
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            
            if (window.store) 
                window.store.load();
            
            window.close();
        }
    });
    
}
Srims.documents.deleteResource = function(documentGuid, id, url, store, msg, msgInfo){
    var _params = {
        guid: documentGuid,
        id: id
    }
    Ext.Ajax.request({
        url: url,
        params: _params,
        success: function(){
            store.load();
            Ext.Msg.show({
                title: msg,
                msg: msgInfo,
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }
    });
}

Srims.documents.downLoadResource = function(guid, subUrl){
    var isIE = window.navigator.userAgent.indexOf("MSIE") >= 1
    
    document.location.href = '/Service/Resource.asmx' + subUrl + '?guid=' + guid + '&isIE=' + isIE;
}



if (!Srims.component) 
    Ext.namespace('Srims.component');

Srims.component.ProvinceCityPanel = function(fieldLabel, province, city, allowBlank){
    this._fieldLabel = fieldLabel;
    this._province = province;
    this._city = city;
    this._allowBlank = allowBlank;
    
    this._comboBox_Province = new Ext.form.ComboBox({
        fieldLabel: this._fieldLabel,
        store: Provinces,
        allowBlank: true,
        forceSelection: true,
        triggerAction: 'all',
        mode: 'local',
        lazyLoad: false,
        width: 100
    });
    this._comboBox_City = new Ext.form.ComboBox({
        fieldLabel: this._fieldLabel,
        hideLabel: true,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: this._province == undefined ? new Array() : Provinces.getCities(this._province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: true,
        forceSelection: true,
        mode: 'local',
        triggerAction: 'all',
        lazyLoad: false,
        width: 100
    });
    
    this._comboBox_Province.comboBox_City = this._comboBox_City;
    
    this.onComboBox_Province_Select = function(comboBox){
        var province = comboBox.getValue();
        var comboBox_City = comboBox.comboBox_City;
        var cityStore = comboBox_City.store;
        var cities = Provinces.getCities(province);
        
        cityStore.loadData(cities);
        
        if (cityStore.getCount() == 1) {
            comboBox_City.setValue(cities[0][0]);
        }
        else {
            comboBox_City.setValue(undefined);
        }
    };
    this._comboBox_Province.on('select', this.onComboBox_Province_Select);
    Srims.component.ProvinceCityPanel.superclass.constructor.call(this, {
        widht: 300,
        layout: 'column',
        labelWidth: 60,
        items: [new Ext.Panel({
            width: 180,
            labelWidth: 60,
            layout: 'form',
            items: this._comboBox_Province
        }), new Ext.Panel({
            width: 100,
            layout: 'form',
            items: this._comboBox_City
        })]
    });
}
Ext.extend(Srims.component.ProvinceCityPanel, Ext.Panel);

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectLevel');

Srims.projects.ProjectLevel.Perside = 'Perside';
Srims.projects.ProjectLevel.Join = 'Join';
Srims.projects.ProjectLevel.Addition = 'Addition';
Srims.projects.ProjectLevel.Coordinate='Coordinate';

Srims.projects.projectLevelRender = function(value, metadata){
    switch (value) {
        case 'Join':
            return '参与';
        case 'Perside':
            return '主持';
        case 'Addition':
            return '附加';
        case 'Coordinate':
        	return '配套';
        default:
            return '未知';
    }
}
Srims.projects.projectLevelStore = [['Perside', '主持'], ['Join', '参与'], ['Addition', '附加'],['Coordinate','配套']];

if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Ext.namespace('Srims.projects.ProjectState');

Srims.projects.ProjectState.WaitingStartInformation = 'WaitingStartInformation';
Srims.projects.ProjectState.WaitingStartCensor = 'WaitingStartCensor';
Srims.projects.ProjectState.ProjectProcessing = 'ProjectProcessing';
Srims.projects.ProjectState.WaitingEndCensor = 'WaitingEndCensor';
Srims.projects.ProjectState.ProjectEnd = 'ProjectEnd';
Srims.projects.ProjectState.ProjectDelete = 'Deleted';
Srims.projects.ProjectState.WithDraw = 'WithDraw';
Srims.projects.ProjectState.Terminate = 'Terminate';

Srims.projects.projectStateRender = function(value, metadata){
    switch (value) {
        case 'WaitingStartInformation':
            return '填写立项信息';
        case 'WaitingStartCensor':
            return '等待立项审核';
        case 'ProjectProcessing':
            return '在研';
        case 'WaitingEndCensor':
            return '等待结项审核';
        case 'ProjectEnd':
            return '已结项';
        case 'WithDraw':
            return '撤销';
        case 'Terminate':
            return '终止';
        case 'Defer':
            return '延期';
        case 'DeferEnd':
            return '延期结题';
        default:
            return '未知';
    }
}
Srims.projects.projectStateFilterItems = [{
    id: 'WaitingStartInformation',
    text: '填写立项信息'
}, {
    id: 'WaitingStartCensor',
    text: '等待立项审核'
}, {
    id: 'ProjectProcessing',
    text: '在研'
}, {
    id: 'WaitingEndCensor',
    text: '等待结项审核'
}, {
    id: 'ProjectEnd',
    text: '已结项'
}, {
    id: 'Defer',
    text: '延期'
}, {
    id: 'DeferEnd',
    text: '延期结题'
}];

Srims.projects.projectStateStore = [['WaitingStartInformation', '填写立项信息'], ['WaitingStartCensor', '等待立项审核'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateEditStore = [['WaitingStartInformation', '填写立项信息'], ['ProjectProcessing', '在研'], ['ProjectEnd', '已结项'], ['Defer', '延期'], ['DeferEnd', '延期结题']];
Srims.projects.projectStateQueryStore = [['WaitingStartInformation', '未提交'], ['ProjectProcessing', '在研'], ['WaitingEndCensor', '等待结项审核'], ['ProjectEnd', '已结项'], ['WithDraw', '撤销'], ['Terminate', '终止'], ['Defer', '延期'], ['DeferEnd', '延期结题']];

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.Department = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'code',
    type: 'string',
    mapping: 'Code'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'isCollege',
    type: 'boolean',
    mapping: 'IsCollege',
    convert: Boolean.TureOrFalseToYesOrNo
}, {
    name: 'nameSpell',
    type: 'string',
    mapping: 'NameSpell'
}, {
    name: 'shortName',
    type: 'string',
    mapping: 'ShortName'
},{
    name: 'haspermissin_Add',
    type: 'boolean',
    mapping: 'Haspermissin_Add',
    convert: Boolean.toBoolean
},{
    name: 'canadd',
    type: 'boolean',
    mapping: 'Canadd',
    convert: Boolean.toBoolean
},{
    name: 'haspermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.experts.Department);


if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params){
        Srims.experts.DepartmentStore.superclass.constructor.call(this, new Srims.experts.DepartmentXmlReader(), load_url, params);
    }
});

if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.experts.DepartmentXmlReader.superclass.constructor.call(this, Srims.experts.Department);
    }
});
if (!Srims.common)
    Ext.namespace('Srims.common');
Srims.common.OutsourcingCensorRejectWindow = function(id, outsourcing) {
this._id = id;
this._outsourcing = outsourcing;

this._buttonReject = new Ext.Button({
    minWidth: 80,
    text: '驳回',
    window: this,
    handler: function() {
        var window = this.window;
        var remark = '驳回理由：' + window._comboBoxRejectReson.getValue() + '(' + window._textRejectRemark.getValue() + ')';

            Ext.MessageBox.show({
                title: '审核驳回立项申请：外协单位的添加',
                msg: '您确定驳回该外协单位的添加吗？<br />点击“是”按钮，驳回该外协单位；<br />点击“否”按钮，取消审核外协单位的立项申请。',
                buttons: Ext.MessageBox.YESNO,
                scope: this,
                fn: function(button) {
                    if (button == 'yes')
                        Srims.common.censorStart_Reject(window._outsourcing, remark);
                },
                icon: Ext.MessageBox.QUESTION
            });

        window.close();
    }
});
this._buttonClose = new Ext.Button({
    minWidth: 80,
    text: '取消',
    window: this,
    handler: function() {
        var window = this.window;
        window.close();
    }
});
this._comboBoxRejectReson = new Srims.component.NoticeTextComboBox({
    fieldLabel: '驳回理由',
    noticeTextType: 'ProjectCensorRejectReason',
    listWidth: 160,
    width: 130
});
this._textRejectRemark = new Ext.form.TextArea({
    fieldLabel: '详细说明',
    height: 60,
    width: 200
});

Srims.common.OutsourcingCensorRejectWindow.superclass.constructor.call(this, {
    id: this._id,
    title:  '驳回项目立项申请:外协单位的添加' ,
    iconCls: 'icon-censor-reject',
    width: 320,
    labelWidth: 70,
    height: 180,
    modal: true,
    bodyStyle: 'padding:10px 10px 0',
    deferredRender: false,
    frame: true,
    closeAction: 'hide',
    layout: 'form',
    resizable: false,
    items: [this._comboBoxRejectReson, this._textRejectRemark],
    buttons: [this._buttonReject, this._buttonClose]
});
}
Ext.extend(Srims.common.OutsourcingCensorRejectWindow, Ext.Window, {});
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingInquiryPanel_Basic = function() {
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        width: 200
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
        fieldLabel: '法定代表人',
        width: 200
    });
    this._numberFieldRegisteredCapitalStart = new Ext.form.NumberField({
        fieldLabel: '注册资本',
        width: 200
    });
    this._numberFieldRegisteredCapitalEnd = new Ext.form.NumberField({
        fieldLabel: '至',
        allowNegative: false,
        allowDecimals: false,
        width: 200
    });
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        width: 200
    });
    //    this._textFieldOrganizationCode = new Ext.form.TextField({
    //        fieldLabel: '组织代码',
    //        width: 200
    //    });

    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        labelWidth: 120,
        maxLength: 8,
        width: 65,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '8' }
    });
    this._codeShortLine = new Ext.form.Label({
        text: '    —'
    });
    this._codeNinethNumber = new Ext.form.TextField({
        fieldLabel: '第九位',
        hideLabel: true,
        width: 20,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '1' }
    });

    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        width: 200
    });
    this._textFieldCompanyType = new Ext.form.ComboBox({
        fieldLabel: '公司类型',
        store: Srims.common.outsourcingCompanyTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        emptyText: '请选择公司类型',
        listWidth: 200,
        allowBlank: true,
        width: 180
    });
    var scheduleType = [
    ['1', '一级', ''],
    ['2', '二级', ''],
    ['3', '三级', ''],
    ['4', '四级', ''],
    ['5', '五级', '']
];
    this._textFieldManagementType = new Ext.form.ComboBox({
        store: scheduleType,
        displayField: 'lb',
        fieldLabel: '管理类别',
        triggerAction: 'all',
        typeAhead: true,
        mode: 'local',
        emptyText: '请选择类别',
        selectOnFocus: true,
        width: 180
    });
    this._textFieldBusinessScope = new Ext.form.TextField({
        fieldLabel: '经营范围',
        allowBlank: false,
        width: 200
    });

    this.items = new Ext.Panel({
        widht: 500,
        labelWidth: 120,
        layout: 'column',
        items: [new Ext.Panel({
            width: 200,
            labelWidth: 120,
            layout: 'form',
            items: this._textFieldOrganizationCode
        }), new Ext.Panel({
            width: 20,
            layout: 'form',
            items: this._codeShortLine
        }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
    });

    Srims.common.OutsourcingInquiryPanel_Basic.superclass.constructor.call(this, ({
        collapsible: true,
        title: '基本信息',
        autoHeight: true,
        frame: true,
        layout: 'form',
        labelWidth: 120,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldName, this._numberFieldRegisteredCapitalStart]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldLegalRepresentativeName, this._numberFieldRegisteredCapitalEnd]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldRegisteredCardNumber, this.items]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldCompanyType, this._textFieldTaxNumber]
            }), new Ext.Panel({
                layout: 'form',
                labelWidth: 120,
                width: 400,
                items: [this._textFieldManagementType]
            })]
        })]
    }))

    this.buildParams = function(params) {
        params.name = this._textFieldName.getValue();
        params.RegisteredCapitalStart = this._numberFieldRegisteredCapitalStart.getValue();
        params.RegisteredCapitalEnd = this._numberFieldRegisteredCapitalEnd.getValue();
        params.legalRepresentativeName = this._textFieldLegalRepresentativeName.getValue();
        params.ManagementType = this._textFieldManagementType.getRawValue();
        params.RegisteredCardNumber = this._textFieldRegisteredCardNumber.getValue();
        if (this._textFieldOrganizationCode.getValue() != "")
            params.OrganizationCode = this._textFieldOrganizationCode.getValue() + '-' + this._codeNinethNumber.getValue();
        else
            params.OrganizationCode = "";
        params.FieldCompanyType = this._textFieldCompanyType.getValue();
        params.TaxNumber = this._textFieldTaxNumber.getValue();

    }

    this.clearParams = function(params) {
        this._textFieldName.reset();
        this._numberFieldRegisteredCapitalStart.reset();
        this._numberFieldRegisteredCapitalEnd.reset();
        this._textFieldLegalRepresentativeName.reset();
        this._textFieldManagementType.reset();
        this._textFieldRegisteredCardNumber.reset();
        this._codeNinethNumber.reset();
        this._textFieldOrganizationCode.reset();
        this._textFieldCompanyType.reset();
        this._textFieldTaxNumber.reset();
    }
}
Ext.extend(Srims.common.OutsourcingInquiryPanel_Basic, Ext.Panel, {});
if (!Srims.common)
    Ext.namespace('Srims.common');
Srims.common.IsOutsourcingExistWindow = function(store) {

    this._inForm = new Srims.common.OutsourcingIsExistWindow_InForm();
    //this._editGridPanel = new Srims.common.OutsourcingIsExistWindow_GridPanel();

    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查询',
        window: this,
        handler: function() {
            var window = this.window;
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService + '/WeatherExistOutsourcing',
                params: {
                    Name: window._inForm._textFieldName.getValue(),
                    OrganizationCode: window._inForm._textFieldOrganizationCode.getRawValue() + '-' + window._inForm._codeNinethNumber.getRawValue()
                },
                scope: this,
                success: function(response) {
                    window.close();
                    if (response.responseText != "")
                        Ext.Msg.show({
                            title: '已存在相应外协单位,请不要重复添加！信息如下：',
                            msg: response.responseText,
                            buttons: Ext.Msg.OK
                        });
                    else {
                        Ext.Msg.show({
                            title: '系统中不存在相应外协单位',
                            msg: '系统中不存在相应外协单位，您可以选择新建，添加您需要的外协单位',
                            buttons: Ext.Msg.OK
                        });
                        var IsInformation = window._inForm._textFieldName.getValue() + '?;' + window._inForm._textFieldOrganizationCode.getRawValue() + '?;' + window._inForm._codeNinethNumber.getRawValue();
                        Srims.common.NewOutsourcing(IsInformation, store, false);
                    }

                }
            });
        }
    });
    this.web = new Ext.Button({
        style: "font-size:12px;color:#FF0000",
        text: '全国组织机构代码管理中心'
    });
    this.webcilick = function() {
        window.open('http://www.nacao.org.cn/', '_blank');

    };
    this.web.on('click', this.webcilick, this);
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    Srims.common.IsOutsourcingExistWindow.superclass.constructor.call(this, {
        id: "IsOutsourcingExist",
        title: '<b style="color:#FF0000">请先输入"外协单位全称"或"组织代码"来查询欲添加的外协单位是否存在!</b>',
        width: 500,
        autoHeight: true,
        style: 'padding:5px',
        layout: 'form',
        items: [this._inForm],
        buttons: [this.web, this._buttonQuery, this._buttonClose]
    });
}
Ext.extend(Srims.common.IsOutsourcingExistWindow, Ext.Window);if (!Srims.common)
    Ext.namespace("Srims.common");
Srims.common.OutsourcingIsExistWindow_InForm = function() {
    this._notice = new Ext.form.Label({
        style: "font-size:12px;color:#FF0000",
        text: '您可以输入"外协单位全称"或"组织代码"来查询欲添加的外协单位是否存在!'
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        allowBlank: true,
        width: 200
    });
    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        allowBlank: true,
        width: 90,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '8' }
    });
    this._codeShortLine = new Ext.form.Label({
        text: '-'
    });
    this._codeNinethNumber = new Ext.form.NumberField({
        fieldLabel: '第九位',
        hideLabel: true,
        allowBlank: true,
        width: 20,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '1' }
    });
    this.items = [this._textFieldName];

    this.items[this.items.length] = new Ext.Panel({
        width: 500,
        layout: 'column',
        items: [new Ext.Panel({
            width: 200,
            layout: 'form',
            items: this._textFieldOrganizationCode
        }), new Ext.Panel({
            width: 10,
            layout: 'form',
            items: this._codeShortLine
        }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
    });



    this.web1 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '如果您不知道新建外协单位的组织机构代码，可在'
    });
    this.web2 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '全国组织机构代码管理中心'
    });
    this.web3 = new Ext.form.Label({
        style: "font-size:12px;",
        text: '网站查询。'
    });
    
    this.items[this.items.length] = new Ext.Panel({
        layout: 'column',
        items: [new Ext.Panel({
            layout: 'form',
            items: this.web1
        }), new Ext.Panel({

            layout: 'form',
            items: this.web2
        }), new Ext.Panel({

            layout: 'form',
            items: this.web3
        })
            ]
    });
    



    Srims.common.OutsourcingIsExistWindow_InForm.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        frame: true,
        bodyStyle: 'padding:5px 0 0 5px',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        layout: 'form',
        labelWidth: 100,
        items: this.items
    });
}
Ext.extend(Srims.common.OutsourcingIsExistWindow_InForm, Ext.form.FormPanel, {});
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingInquiryPanel = function(id, store, queryParams, gridPanel) {

    this._id = id;
    this._store = store;
    this._params = queryParams;

    //this._relation = new Srims.experts.ExpertQueryPanel_Relation();
    this._basic = new Srims.common.OutsourcingInquiryPanel_Basic();

    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        panel: this,
        handler: function() {
            this.panel.clearParams();
            queryParams = this.panel.getParams();
            this.panel._store.load();
            Srims.WorkSpace.active(gridPanel._id);
        }
    });
    //查询外协单位
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        panel: this,
        handler: function() {
            var panel = this.panel;
            queryParams = panel.getParams();
            panel._store.load();
            Srims.WorkSpace.active(gridPanel._id);
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        panel: this,
        handler: function() {
            var panel = this.panel;
            panel.clearParams();
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        panel: this,
        handler: function() {
            var panel = this.panel;

            panel.getParams();
            Srims.common.newView(Srims.common.ViewType.ExpertQuery, Srims.SetQueryParams.toJSON(queryParams));
        }
    })
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        panel: this,
        handler: function() {
            var panel = this.panel;

            Srims.common.showViewWindow(Srims.common.ViewType.ExpertQuery);
            panel.hide();
        }
    })
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        panel: this,
        handler: function() {
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });

    var user = Srims.currentLoginLog.user;
    var items = [this._basic];

    Srims.common.OutsourcingInquiryPanel.superclass.constructor.call(this, ({
        id: id,
        title: '外协单位查询',
        iconCls: 'icon-expert-query',
        closable: true,
        collapsible: true,
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        deferHeight: false,
        titleCollapse: true,
        items: items,
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonSaveAsView, this._buttonShowView, this._buttonClose]
    }))

    this.getParams = function() {
        var params = this._params;
        this._basic.buildParams(params);
        return params;
    }
    this.clearParams = function() {
        this._basic.clearParams();
    }

    this.getGridPanel = function() {
        var gridPanelID = "OutourcingGridPanel";
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._filters.clearFilters();
    }
    this.query = function(button) {
        var panel = button.panel;
        panel.getGridPanel();
        panel.getParams();

        Srims.SetQueryParams.removeNullparams(queryParams);
        panel._store.load();
    }
}
Ext.extend(Srims.common.OutsourcingInquiryPanel, Ext.Panel, {});
/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingXmlReader = Ext.extend(Srims.data.XmlReader, {
			constructor : function() {
				Srims.common.OutsourcingXmlReader.superclass.constructor.call(
						this, Srims.common.Outsourcing);
			}
		});if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
    Srims.common.OutsourcingProvinceXmlReader.superclass.constructor.call(
						this, Srims.common.OutsourcingProvinceCities);
    }
});/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceCities = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}]);
Srims.data.Entity.apply(Srims.common.OutsourcingProvinceCities);/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingProvinceStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
    Srims.common.OutsourcingProvinceStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingProvinceXmlReader(), load_url,
						params);
    }
});/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingStore = Ext.extend(Srims.data.XmlStore, {
			constructor : function(load_url, params) {
				Srims.common.OutsourcingStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingXmlReader(), load_url,
						params);
			}
		});/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');
Srims.common.OutsourcingGridPanel_GridFilters = function() {
	Srims.common.OutsourcingGridPanel_GridFilters.superclass.constructor.call(
			this, {
	filters: [
				{
							type : 'string',
							dataIndex : 'name'
			}, 
			{
			    type: 'string',
			    dataIndex: 'legalRepresentativeName'
			}, 
//			{
//							type : 'date',
//							dataIndex: 'createDateTime'
//							},  
						{
			    type: 'string',
			    dataIndex: 'isVerify'
			    }]
			});
}
Ext.extend(Srims.common.OutsourcingGridPanel_GridFilters, Ext.grid.GridFilters);/**
 * @author dulintao
 */
if (!Srims.common)
	Ext.namespace('Srims.common');

Srims.common.OutsourcingPanel_ColumnModel = function() {
	Srims.common.OutsourcingPanel_ColumnModel.superclass.constructor.call(this,
			[{
			    header: 'id',
			    hidden: true,
			    hideable: false
			}, {
			    header: '外协单位名称',
			    dataIndex: 'name',
			    width: 40,
			    sortable: true,
			    hidden: false
			}, {
			    header: '代表人姓名',
			    dataIndex: 'legalRepresentativeName',
			    width: 40,
			    sortable: false,
			    hidden: false
			}, {
			    header: '注册资本',
			    dataIndex: 'registeredCapital',
			    width: 40,
			    sortable: true,
			    hidden: false
			}, {
			    header: '注册号',
			    dataIndex: 'registeredCardNumber',
			    width: 40,
			    sortable: false,
			    hidden: false
			}, {
			    header: '组织代码',
			    dataIndex: 'organizationCode',
			    width: 40,
			    sortable: false,
			    hidden: false
			}, {
			    header: '税号',
			    dataIndex: 'taxNumber',
			    width: 40,
			    sortable: false,
			    hidden: false
			},
			 {
			     header: '公司类型',
			     dataIndex: 'companyType',
			     width: 40,
			     sortable: false,
			    // renderer: Srims.common.outsourcingCompanyTypeRender,
			     hidden: false
			 },
			 {
			     header: '管理类别',
			     dataIndex: 'managementType',
			     width: 40,
			     sortable: false,
			     hidden: false
			 },
			  {
			      header: '营业开始时间',
			      dataIndex: 'dealDateTimeStart',
			      width: 40,
			      sortable: false,
			      hidden: false,
			       renderer: Date.render
			  }, {
			      header: '营业结束时间',
			      dataIndex: 'dealDateTimeEnd',
			      width: 40,
			      sortable: false,
			      hidden: false,
			      renderer: Date.render
			  }, {
			      header: '成立时间',
			      dataIndex: 'createDateTime',
			      width: 40,
			      sortable: true,
			      hidden: false,
			      renderer: Date.render
			  },
			  {
			      header: '是否审核',
			      dataIndex: 'isVerify',
			      width: 40,
			      sortable: true,
			      hidden: false,
			  },
			  {
			      header: '备注',
			      dataIndex: 'Remark',
			      width: 40,
			      sortable: false,
			      hidden: false
}]);
}
Ext.extend(Srims.common.OutsourcingPanel_ColumnModel, Ext.grid.ColumnModel);/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingGridPanel_ToolBar = function(store, selection,
		queryParams, panelID) {
    this._store = store;
    this._panelID = panelID;
    this._selection = selection;
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';

    this._buttonNew = new Ext.Toolbar.Button({
        iconCls: 'icon-new',
        text: '新建',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            //Srims.common.NewOutsourcing(this.store, false);
            Srims.common.showIsExistWindow(this.store);
        },
        tooltip: '<b>新建外协单位</b><br/>填写相应外协单位信息建立新的外协单位'
    });
    this._buttonIsExist = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查重',
        minWidth: 60,
        handler: function() {
            Srims.common.showIsExistWindow();
        },
        tooltip: '<b>查询欲添加的外协单位是否存在</b><br/>填写相应外协单位信息查询系统外协单位库中的外协单位'
    });
    this._buttonShow = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '查看',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.ShowOutsourcing(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>查看外协单位<b/><br/>显示所选外协单位的详细信息'
    });
    this._buttonUpFile1 = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传企业法人证书',
        minWidth: 60,
        selection: this._selection,

        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.showOutsourcingImportWindow(this.selection.getSelected(), store, '上传企业法人证书');
        },
        hidden: true,
        tooltip: '<b>上传企业法人证书<b/><br/>'
    });
    this._buttonUpFile2 = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传机构代码证',
        minWidth: 60,
        selection: this._selection,

        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.showOutsourcingImportWindow(this.selection.getSelected(), store, '上传机构代码证');
        },
        hidden: true,
        tooltip: '<b>上传机构代码证<b/><br/>'
    });
    this._buttonUpFile3 = new Ext.Toolbar.Button({
        iconCls: 'icon-show',
        text: '上传税务登记证',
        selection: this._selection,
        minWidth: 60,

        store: this._store,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.showOutsourcingImportWindow(this.selection.getSelected(), store, '上传税务登记证');
        },
        hidden: true,
        tooltip: '<b>上传税务登记证<b/><br/>'
    });
    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.EditOutsourcing(this.selection.getSelected(), store, false);
        },
        hidden: true,
        tooltip: '<b>编辑</b><br/>编辑所选外协单位'
    });
    this._buttonVerfiy = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '审核',
        minWidth: 60,
        selection: this._selection,
        handler: function() {
            if (this.selection.getCount() == 0)
                return;
            Srims.common.VerfiyOutsourcing(this.selection.getSelected());
        },
        hidden: true,
        tooltip: '<b>审核外协单位</b><br/>审核外协单位的名称、地址、电话、负责人、负责人邮箱等详细信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        selection: this._selection,
        store: this._store,
        handler: function() {
            if (this.selection.getCount == 0)
                return;
            Srims.common.DeleteOutsourcing(this.selection.getSelected(), this.store);
        },
        hidden: true,
        tooltip: '<b>删除</b><br/>删除所选外协单位'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新外协单位列表'
    });
    Srims.common.OutsourcingGridPanel_ToolBar.superclass.constructor.call(this,
			{
			    items: [this._buttonNew, this._buttonShow, this._buttonEdit, this._buttonVerfiy,
						this._buttonDelete, new Ext.Toolbar.Fill(), this._buttonRefresh]
			});
    // initial
    this._selection.buttonShow = this._buttonShow;
    this._selection.buttonEdit = this._buttonEdit;
    this._selection.buttonDelete = this._buttonDelete;
    this._selection.buttonVerfiy = this._buttonVerfiy;
    this._selection.buttonUpFile1 = this._buttonUpFile1;
    this._selection.buttonUpFile2 = this._buttonUpFile2;
    this._selection.buttonUpFile3 = this._buttonUpFile3;
    // 外协选择变化
    this._onSelection_selectionChange = function(selection) {
        var buttonShow = selection.buttonShow;
        var buttonEdit = selection.buttonEdit;
        var buttonDelete = selection.buttonDelete;
        var buttonVerfiy = selection.buttonVerfiy;
        var buttonUpFile1 = selection.buttonUpFile1;

        var buttonUpFile2 = selection.buttonUpFile2;

        var buttonUpFile3 = selection.buttonUpFile3;
        if (selection.getCount() == 0) {
            buttonShow.hide();
            buttonEdit.hide();
            buttonDelete.hide();
            buttonVerfiy.hide();
            buttonUpFile1.hide();
            buttonUpFile2.hide();
            buttonUpFile3.hide();
            return;
        }
        var outsourcing = selection.getSelected();
        var d = outsourcing.get('hasPermission_Edit');
        buttonShow.show();



        if ((outsourcing.get('currentUserID') == outsourcing.get('userID')) || (outsourcing.get('hasPermission_Edit'))) {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);
            buttonDelete.setVisible(true);
            buttonDelete.setDisabled(false);
            buttonUpFile3.setVisible(true);
            buttonUpFile2.setVisible(true);
            buttonUpFile1.setVisible(true);

        }
        else {

            buttonEdit.setVisible(false);
            buttonEdit.setDisabled(true);
            buttonDelete.setVisible(false);
            buttonDelete.setDisabled(true);

        }
        if (outsourcing.get('hasPermission_Edit')) {
            buttonVerfiy.setVisible(true);
            buttonVerfiy.setDisabled(false);
        }
        if (outsourcing.get('isVerify') == "审核通过")   //
        {
            buttonVerfiy.hide();
            buttonUpFile1.hide();
            buttonUpFile2.hide();
            buttonUpFile3.hide();
        }
        if (outsourcing.get('companyCard'))
            buttonUpFile1.setDisabled(true);
        if (outsourcing.get('groupCard'))
            buttonUpFile2.setDisabled(true);
        if (outsourcing.get('taxCard'))
            buttonUpFile3.setDisabled(true);

        if (userIsExpert && (outsourcing.get('isVerify') == "审核驳回")) {
            buttonEdit.setVisible(true);
            buttonEdit.setDisabled(false);        //
        }
    }
    this._selection.on('selectionchange', this._onSelection_selectionChange);
}
Ext.extend(Srims.common.OutsourcingGridPanel_ToolBar, Ext.Toolbar);/**
* @author dulintao
*/
if (!Srims.common)
    ext.namespace('Srims.common');
Srims.common.OutsourcingGridPanel = function(id, outsourcingStore, title,
		iconCls, queryParams) {
    // fields
    this._id = id;
    this._outsourcingStore = outsourcingStore;
    this._outsourcingStore.grid = this;

    // public method
    this.GetOutsourcingStore = function() {
        return this._outsourcingStore;
    };

    // controls
    this._selections = new Ext.grid.RowSelectionModel();

    this._columnModel = new Srims.common.OutsourcingPanel_ColumnModel(); // 位于文件outsourcingPanel_ColumnModel.js
    this._filters = new Srims.common.OutsourcingGridPanel_GridFilters(); // 位于文件outsourcingGridPanel_GridFilters.js
    this._toolbar = new Srims.common.OutsourcingGridPanel_ToolBar(
			this._outsourcingStore, this._selections, queryParams, id); // 位于文件outsourcingGridPanel_ToolBar.js
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '没有满足条件的外协单位'
    });
    // constructor
    Srims.common.OutsourcingGridPanel.superclass.constructor.call(this, {
        id: id,
        stateful: true,
        store: this._outsourcingStore,
        sm: this._selections,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: title,
        iconCls: iconCls,
        region: 'center',
        closable: true,
        loadMask: true,
        plugins: this._filters,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._outsourcingStore,
            plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录'
        })
    });
    this._outsourcingStore.load();
    // event
    this.on('celldblclick', onCellDblClick);
    // private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var outsourcing = grid.getStore().getAt(rowIndex);
        Srims.common.ShowOutsourcing(outsourcing, this._outsourcingStore);
    }
}
Ext.extend(Srims.common.OutsourcingGridPanel, Ext.grid.GridPanel);/**
* @author dulintao
*/
Srims.common.OutsourcingEditPanel_Basic = function(IsInformation, outsourcing) {

    this._user = Srims.currentLoginLog.user;
    this._userIsExpert = this._user.userRoleType == 'Expert';
    this._outsourcing = outsourcing;

    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        value: outsourcing.isNew() ? IsInformation.split('?;')[0] : outsourcing.get('name'),
        allowBlank: false,
        width: 200
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
        fieldLabel: '法人代表',
        value: outsourcing.get('legalRepresentativeName'),
        allowBlank: false,
        width: 200
    });
    this._textFieldRegisteredCapital = new Ext.form.NumberField({
        fieldLabel: '注册资本(万元)',
        value: outsourcing.get('registeredCapital'),
        allowBlank: false,
        width: 200
    });
    this.validatCardNumber = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        var lCardNumber = value.length;
        if (!isNaN(value))
            if (lCardNumber == 12 || lCardNumber == 15) {

            return true;
        }
        else {
            this.invalidText = '请正确输入12或15位的注册号！';
            return false;
        }
    }
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        value: outsourcing.get('registeredCardNumber'),
        allowBlank: true,
        validator: this.validatCardNumber,
        width: 200
    });
    this._textFieldRegisteredCardNumber.panel = this;
    this._textFieldRegisteredCardNumber.validator = this.validatCardNumber;

    this.validatOrganizationCode = function() {
        var panel = this.panel;
        var value = this.getRawValue();
        var lCodeNumber = String(value).length;
        if (!isNaN(value))
            if (lCodeNumber == 8) {
            return true;
        }
        else {
            this.invalidText = '请正确输入8位本体代码！';
            return false;
        }
    }
    this.validatNinethNumber = function() {
        var panel = this.panel;
        var valueNine = this.getValue();
        var nineIsOne = valueNine.length;
        if (nineIsOne != 1) {
            this.invalidText = '请输入一位校验码！';
            return false;
        }
        else {
            var code = panel._textFieldOrganizationCode.getRawValue();
            var totleCode = 0;
            totleCode = code[0] * 3 + code[1] * 7 + code[2] * 9 + code[3] * 10 + code[4] * 5 + code[5] * 8 + code[6] * 4 + code[7] * 2;
            var compare = 11 - totleCode % 11;

            if ((valueNine >= 0 && valueNine <= 9) || (valueNine >= 'a' && valueNine <= 'z') || (valueNine >= 'A' && valueNine <= 'Z')) {
                if (compare == 0 || compare == 11)
                    if (valueNine == 0)
                    return true;
                if (compare == 10)
                    if (valueNine == "x" || valueNine == "X")
                    return true;
                if (compare < 10 && compare >= 1)
                    if (valueNine == compare)
                    return true;
                else {
                    this.invalidText = '校验码输入错误！';
                    return false;
                }
            }
            else {
                this.invalidText = '校验码必须为数字或字母！';
                return false;
            }
        }
    }

    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        value: outsourcing.isNew() ? IsInformation.split('?;')[1] : outsourcing.get('organizationCode') ? outsourcing.get('organizationCode').split('-')[0] : '',
        allowBlank: false,
        maxLength: 8,
        width: 65,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '8' }
    });
    this._codeShortLine = new Ext.form.Label({
        text: '    —'
    });
    this._codeNinethNumber = new Ext.form.TextField({
        fieldLabel: '第九位',
        hideLabel: true,
        value: outsourcing.isNew() ? IsInformation.split('?;')[2] : outsourcing.get('organizationCode') ? outsourcing.get('organizationCode').split('-')[1] : '',
        allowBlank: false,
        width: 20,
        autoCreate: { tag: 'input', type: 'text', size: '20', autocomplete: 'off', maxlength: '1' }
    });
    this._textFieldOrganizationCode.panel = this;
    this._textFieldOrganizationCode.validator = this.validatOrganizationCode;
    this._codeNinethNumber.panel = this;
    this._codeNinethNumber.validator = this.validatNinethNumber;

    this.validatTaxNumber = function() {
        var panel = this.panel;
        var value = this.getValue();
        var lTaxNumber = value.length;
        //        if (!outsourcing.isNew()) {
        //            var provincecity = panel._comboBoxTaskCorporationPlace_Town.getRawValue() + ' ' + panel._comboBoxTaskCorporationPlace_City.getRawValue();
        //            //////////////////////////
        //            Ext.Ajax.request(this, {
        //                url: Srims.service.common.OutsourcingService + '/GetByCityName',
        //                params: { provincecity: provincecity },
        //                scope: this,
        //                success: function(response) {
        //                var adv = response.responseText; 
        //                }
        //            });
        //        }
        //        else
        var adv = panel._comboBoxTaskCorporationPlace_City.getValue();
        var OCode = panel._textFieldOrganizationCode.getValue() + panel._codeNinethNumber.getValue();
        if (lTaxNumber != 15) {
            this.invalidText = '您输入的税号位数不等于15位！';
            return false;
        }
        else {
            if (outsourcing.isNew()) {
                if (value.substring(0, 6) == adv) {
                    var lastNine = value.substring(6, 15);
                    if (lastNine == OCode) {
                        return true;
                    }
                    else {
                        this.invalidText = '后九位必须与组织代码相符合！';
                        return false;
                    }
                }

                else {
                    this.invalidText = '前六位必须与选择的地区代码一致！';
                    return false;
                }
            }
            if (!outsourcing.isNew()) {
                var lastNine = value.substring(6, 15);
                if (lastNine == OCode) {
                    return true;
                }
                else {
                    this.invalidText = '后九位必须与组织代码相符合！';
                    return false;
                }
            }
        }
    }

    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        value: outsourcing.get('taxNumber'),
        allowBlank: false,
        width: 200
    });
    this._textFieldTaxNumber.panel = this;

    this._textFieldTaxNumber.validator = this.validatTaxNumber;


    this._textFieldCompanyType = new Ext.form.ComboBox({
        fieldLabel: '公司类型',
        value: outsourcing.get('companyType'),
        store: Srims.common.outsourcingCompanyTypeStore,
        displayField: 'name',
        editable: false,
        triggerAction: 'all',
        emptyText: '请选择公司类型',
        listWidth: 200,
        allowBlank: false,
        width: 200
    });
    var scheduleType = [
    ['1', '一级', ''],
    ['2', '二级', ''],
    ['3', '三级', ''],
    ['4', '四级', ''],
    ['5', '五级', '']
];
    this._textFieldManagementType = new Ext.form.ComboBox({
        store: scheduleType,
        displayField: 'lb',
        fieldLabel: '管理类别',
        value: outsourcing.get('managementType'),
        triggerAction: 'all',
        typeAhead: true,
        mode: 'local',
        emptyText: '请选择类别',
        selectOnFocus: true,
        width: 200
    });

    this._textFieldCreateDateTime = new Ext.form.DateField({
        fieldLabel: '成立时间',
        value: outsourcing.get('createDateTime'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this.validatStart = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        if (this.getValue() < panel._textFieldCreateDateTime.getValue()) {
            this.invalidText = '营业期限初始时间在成立时间之后！';
            return false;
        }
        else {
            return true;
        }
    };
    this._textFieldDealDateTimeStart = new Ext.form.DateField({
        fieldLabel: '营业期限',
        value: outsourcing.get('dealDateTimeStart'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this._textFieldDealDateTimeStart.panel = this;
    this._textFieldDealDateTimeStart.validator = this.validatStart;

    this.validatEndTime = function() {
        var panel = this.panel;
        var value = this.getValue();
        if (value == "") {
            return true;
        }
        if (this.getValue() > panel._textFieldDealDateTimeStart.getValue()) {

            return true;
        }
        else {
            this.invalidText = '营业期限结束时间在开始时间之后！';
            return false;
        }
    }
    this._textFieldDealDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        value: outsourcing.get('dealDateTimeEnd'),
        format: 'Y-m-d',
        allowBlank: true,
        readOnly: true,
        width: 200
    });
    this._textFieldDealDateTimeEnd.panel = this;
    this._textFieldDealDateTimeEnd.validator = this.validatEndTime;

    this._textFieldBusinessScope = new Ext.form.TextArea({
        fieldLabel: '经营范围',
        value: outsourcing.get('businessScope'),
        allowBlank: true,
        width: 600,
        height: 100
    });
    this._textFieldRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        value: outsourcing.get('remark'),
        allowBlank: true,
        width: 600,
        height: 100
    });
    this._textFieldIsVerify = new Ext.form.TextField({
        fieldLabel: '审核状态',
        value: outsourcing.get('isVerify'),
        allowBlank: false,
        width: 600,
        height: 100
    });

    //取得所在省份或城市
    this._getProvinceOrCity = function(outsourcing, index) {
        var outsourcing_taskCorporationPlace = outsourcing.get('address');
        if (outsourcing_taskCorporationPlace != undefined && outsourcing_taskCorporationPlace.toString().trim() != '')
            outsourcing_taskCorporationPlace = outsourcing_taskCorporationPlace.split(' ')[index];
        else
            outsourcing_taskCorporationPlace = undefined;
        return outsourcing_taskCorporationPlace
    }
    var outsourcing_taskCorporationPlace_province = this._getProvinceOrCity(outsourcing, 0); //? this._getProvinceOrCity(outsourcing, 0) : "";
    this._comboBoxTaskCorporationPlace_Province = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        value: outsourcing_taskCorporationPlace_province,
        store: newProvinces,
        allowBlank: false,
        emptyText: '选择省',
        editable: false,
        triggerAction: 'all',
        listWidth: 65,
        panel: this,
        width: 50
    });
    var outsourcing_taskCorporationPlace_town = this._getProvinceOrCity(outsourcing, 1); //? this._getProvinceOrCity(outsourcing, 1) : "";
    this._comboBoxTaskCorporationPlace_Town = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        hideLabel: true,
        value: outsourcing_taskCorporationPlace_town,
        store: new Ext.data.SimpleStore({
            fields: new Array('city'),
            data: outsourcing_taskCorporationPlace_province == undefined ? new Array() : newProvinces.getCities(outsourcing_taskCorporationPlace_province)
        }),
        valueField: 'city',
        displayField: 'city',
        allowBlank: false,
        emptyText: '选择市',
        editable: false,
        mode: 'local',
        triggerAction: 'all',
        listWidth: 65,
        width: 50
    });
    var outsourcing_taskCorporationPlace_city = this._getProvinceOrCity(outsourcing, 2); //? this._getProvinceOrCity(outsourcing, 2) : "";
    this._comboBoxTaskCorporationPlace_City = new Ext.form.ComboBox({
        fieldLabel: '单位所在地',
        hideLabel: true,
        value: outsourcing_taskCorporationPlace_city,
        store: new Srims.common.OutsourcingProvinceStore(Srims.service.common.OutsourcingService + '/GetProvinceAreasByProvinceName'),
        valueField: 'id',
        displayField: 'name',
        allowBlank: false,
        emptyText: '选择区',
        editable: false,
        mode: 'local',
        triggerAction: 'all',
        listWidth: 65,
        width: 50
    });
    //城市之间的联动

    this.onComboBoxTaskCorporationPlace_Town_Select = function(comboBox) {
        var province = comboBox.getValue();
        comboBox.comboBoxTaskCorporationPlace_City.setValue("");
        comboBox.comboBoxTaskCorporationPlace_City.store.load({ params: { provinceName: province} });
    }
    this.onComboBoxTaskCorporationPlace_Province_Select = function(comboBox) {
        var province = comboBox.getValue();
        comboBox.comboBoxTaskCorporationPlace_Town.setValue("");
        comboBox.comboBoxTaskCorporationPlace_Town.comboBoxTaskCorporationPlace_City.setValue("");

        var comboBoxTaskCorporationPlace_Town = comboBox.comboBoxTaskCorporationPlace_Town;
        var cityStore = comboBoxTaskCorporationPlace_Town.store;
        var cities = newProvinces.getCities(province);
        cityStore.loadData(cities);
        comboBoxTaskCorporationPlace_Town.setValue(undefined);

    }
    this._comboBoxTaskCorporationPlace_Town.comboBoxTaskCorporationPlace_City = this._comboBoxTaskCorporationPlace_City;
    this._comboBoxTaskCorporationPlace_Town.on('select', this.onComboBoxTaskCorporationPlace_Town_Select);
    this._comboBoxTaskCorporationPlace_Province.comboBoxTaskCorporationPlace_Town = this._comboBoxTaskCorporationPlace_Town;
    this._comboBoxTaskCorporationPlace_Province.on('select', this.onComboBoxTaskCorporationPlace_Province_Select);

    if (this._userIsExpert) {
        this.items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart];

        this.items2 = [this._textFieldCompanyType]//, this._textFieldTaxNumber, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd];
        this.items2[this.items2.length] = new Ext.Panel({
            widht: 400,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Province
            }), new Ext.Panel({
                width: 75,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Town
            }), new Ext.Panel({
                width: 80,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_City
            })]
        });
        this.items2[this.items2.length] = this._textFieldTaxNumber;
        this.items2[this.items2.length] = this._textFieldCreateDateTime;
        this.items2[this.items2.length] = this._textFieldDealDateTimeEnd;



        this.items1[this.items1.length] = new Ext.Panel({
            widht: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._textFieldOrganizationCode
            }), new Ext.Panel({
                width: 20,
                layout: 'form',
                items: this._codeShortLine
            }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
        });
    }
    else {
        this.items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldTaxNumber];
        this.items2 = [this._textFieldCompanyType]//, this._textFieldManagementType, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd];

        this.items2[this.items2.length] = new Ext.Panel({
            widht: 400,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Province
            }), new Ext.Panel({
                width: 75,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_Town
            }), new Ext.Panel({
                width: 80,
                layout: 'form',
                items: this._comboBoxTaskCorporationPlace_City
            })]
        });

        this.items2[this.items2.length] = this._textFieldManagementType;
        this.items2[this.items2.length] = this._textFieldCreateDateTime;
        this.items2[this.items2.length] = this._textFieldDealDateTimeEnd;
        this.items2[this.items2.length] = new Ext.Panel({
            widht: 500,
            layout: 'column',
            items: [new Ext.Panel({
                width: 200,
                layout: 'form',
                items: this._textFieldOrganizationCode
            }), new Ext.Panel({
                width: 20,
                layout: 'form',
                items: this._codeShortLine
            }),
            new Ext.Panel({
                width: 30,
                layout: 'form',
                items: this._codeNinethNumber
            })
            ]
        });
    }

    Srims.common.OutsourcingEditPanel_Basic.superclass.constructor.call(this, {
        title: '基本信息',
        Height: 350,
        frame: true,
        labelWidth: 120,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:400px',
                items: this.items1
            }), new Ext.Panel({
                width: 400,
                style: 'width:300px',
                layout: 'form',
                items: this.items2
            })]
        }), this._textFieldBusinessScope, this._textFieldRemark]
    });
    this.assignValues = function() {
        this._outsourcing.set('name', this._textFieldName.getValue());
        this._outsourcing.set('legalRepresentativeName', this._textFieldLegalRepresentativeName.getValue());
        this._outsourcing.set('registeredCapital', this._textFieldRegisteredCapital.getValue());
        this._outsourcing.set('registeredCardNumber', this._textFieldRegisteredCardNumber.getValue());
        this._outsourcing.set('organizationCode', this._textFieldOrganizationCode.getRawValue() + "-" + this._codeNinethNumber.getValue());
        this._outsourcing.set('taxNumber', this._textFieldTaxNumber.getValue());
        this._outsourcing.set('companyType', this._textFieldCompanyType.getValue());
        this._outsourcing.set('managementType', this._textFieldManagementType.getRawValue());
        if (this._textFieldCreateDateTime.getValue() == null || this._textFieldCreateDateTime.getValue() == "" || this._textFieldCreateDateTime.getValue() == undefined)
            this._outsourcing.set('createDateTime', null);
        else
            this._outsourcing.set('createDateTime', this._textFieldCreateDateTime.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeStart.getValue() == null || this._textFieldDealDateTimeStart.getValue() == "" || this._textFieldDealDateTimeStart.getValue() == undefined)
            this._outsourcing.set('dealDateTimeStart', null);
        else
            this._outsourcing.set('dealDateTimeStart', this._textFieldDealDateTimeStart.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeEnd.getValue() == null || this._textFieldDealDateTimeEnd.getValue() == "" || this._textFieldDealDateTimeEnd.getValue() == undefined)
            this._outsourcing.set('dealDateTimeEnd', null);
        else
            this._outsourcing.set('dealDateTimeEnd', this._textFieldDealDateTimeEnd.getValue().format('Y/m/d'));
        this._outsourcing.set('businessScope', this._textFieldBusinessScope.getValue());
        this._outsourcing.set('remark', this._textFieldRemark.getValue());
        if (!this._userIsExpert)
            this._outsourcing.set('isVerify', "审核通过");
        else {
            if (this._textFieldIsVerify.getValue() == null || this._textFieldIsVerify.getValue() == "" || this._textFieldIsVerify.getValue() == undefined)
                this._outsourcing.set('isVerify', "未审核");
            else
                this._outsourcing.set('isVerify', this._textFieldIsVerify.getValue());
        }
        this._outsourcing.set('address', this._comboBoxTaskCorporationPlace_Province.getValue() + ' ' + this._comboBoxTaskCorporationPlace_Town.getRawValue() + ' ' + this._comboBoxTaskCorporationPlace_City.getRawValue());

    }
    //清除所有输入框
    this.clearParams = function() {
        this._textFieldName.reset();
        this._textFieldLegalRepresentativeName.reset();
        this._textFieldRegisteredCapital.reset();
        this._textFieldRegisteredCardNumber.reset();
        this._textFieldOrganizationCode.reset();
        this._textFieldTaxNumber.reset();
        this._textFieldCompanyType.reset();
        this._textFieldManagementType.reset();
        this._textFieldCreateDateTime.reset();
        this._textFieldDealDateTimeStart.reset();
        this._textFieldDealDateTimeEnd.reset();
        this._textFieldBusinessScope.reset();
        this._textFieldRemark.reset();
        this._comboBoxTaskCorporationPlace_Province.reset();
        this._comboBoxTaskCorporationPlace_Town.reset();
        this._comboBoxTaskCorporationPlace_City.reset();
    }
    //对各输入框进行验证结果进行统计
    this.isValid = function(preventMark) {
        var result = true;
        if (this._userIsExpert) {
            result = this._textFieldName.isValid() && result;
            result = this._textFieldLegalRepresentativeName.isValid() && result;
            result = this._textFieldRegisteredCapital.isValid() && result;
            result = this._textFieldRegisteredCardNumber.isValid(preventMark) && result;
            result = this._textFieldOrganizationCode.isValid() && result;
            result = this._textFieldTaxNumber.isValid() && result;
            result = this._textFieldCompanyType.isValid() && result;
            //result = this._textFieldManagementType.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_Province.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_Town.isValid() && result;
            result = this._comboBoxTaskCorporationPlace_City.isValid() && result;
            //result = this._textFieldCreateDateTime.isValid() && result;
            result = this._textFieldDealDateTimeStart.isValid() && result;
            result = this._textFieldDealDateTimeEnd.isValid() && result;
            //result = this._textFieldBusinessScope.isValid() && result;
            return result;
        }
        else
            return result;
    }
}
Ext.extend(Srims.common.OutsourcingEditPanel_Basic, Ext.form.FormPanel);
Srims.common.OutsourcingEditPanel_Document = function(outsourcing) {

    this._outsourcing = outsourcing;

    this._LegalRepresentativefileUploadField = new Srims.component.FileUploadField({
    id: 'upLegalRepresentativeLoadDocument',
        fieldLabel: '上传企业法人证书',
        width: 300,
        emptyText: '请选择要上传的法人证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._LegalRepresentativebuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });

    this._OrganizationCodefileUploadField = new Srims.component.FileUploadField({
    id: 'upOrganizationCodeLoadDocument',
        fieldLabel: '上传机构代码证书',
        width: 300,
        emptyText: '请选择要上传的机构代码证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._OrganizationCodebuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });
    this._TaxfileUploadField = new Srims.component.FileUploadField({
        id: 'upTaxLoadDocument',
        fieldLabel: '上传税务登记证书',
        width: 300,
        emptyText: '请选择要上传的税务登记证书',
        allowBlank: false,
        fileTypes: ['jpg', 'gif', 'pdf', 'doc'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._TaxbuttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        handler: function() { }
    });
    var items1 = [this._LegalRepresentativefileUploadField, this._LegalRepresentativebuttonUpload];
    var items2 = [this._OrganizationCodefileUploadField, this._OrganizationCodebuttonUpload];
    var items3 = [this._TaxfileUploadField, this._TaxbuttonUpload];
    Srims.common.OutsourcingEditPanel_Basic.superclass.constructor.call(this, {

    activeTab: 0,
    title: '上传外协文档',
        Height: 150,
        frame: true,
        labelWidth: 120,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:400px',
                items: [this._LegalRepresentativefileUploadField]
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: [this._LegalRepresentativebuttonUpload]
            })]
        }),

        new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:400px',
                items: this._OrganizationCodefileUploadField
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: this._OrganizationCodebuttonUpload
            })]
        }),

        new Ext.Panel({
            widht: 600,
            layout: 'column',
            items: [new Ext.Panel({
                width: 450,
                layout: 'form',
                style: 'width:400px',
                items: this._TaxfileUploadField
            }), new Ext.Panel({
                width: 100,
                style: 'width:300px',
                layout: 'form',
                items: this._TaxbuttonUpload
            })]
        })
        
        ]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_Document, Ext.TabPanel);

if (!Srims.common)
    Ext.namespace('Srims.common');

if (!Srims.documents)
    Ext.namespace('Srims.documents');


Srims.common.OutsourcingEditPanel_ToolBar = function(panel) {

    //fields
    this._panel = panel;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传企业法人证书',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '企业法人证书');
    },
        hidden: false,
        tooltip: '<b>上传外协单位文档：企业法人证书</b>'
    });
    this._buttonupOrganizationCodeLoadDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传组织机构代码证',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '组织机构代码证');
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：组织机构代码证</b>'
    });
    this._buttonupTaxLoadDocument = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传税务登记证',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
        Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store, '税务登记证');
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：税务登记证</b>'
    });

    Srims.common.OutsourcingEditPanel_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonSubmitMainContract,this._buttonupOrganizationCodeLoadDocument,this._buttonupTaxLoadDocument]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_ToolBar, Ext.Toolbar);


if (!Srims.common)
    Ext.namespace('Srims.common');

if (!Srims.documents)
    Ext.namespace('Srims.documents');


Srims.common.OutsourcingEditPanel_newToolBar = function(panel) {

    //fields
    this._panel = panel;

    //controls
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
        iconCls: 'icon-upload',
        text: '上传外协单位文档',
        minWidth: 60,
        panel: this._panel,
        handler: function() {
            //Srims.common.uploadDocument(this.panel._outsourcing, this.panel._store);
        },
        hidden: false,
        tooltip: '<b>上传外协单位文档：企业法人证书、组织机构代码证、税务登记证</b>'
    });
    this._newTextLabel = new Ext.form.Label({
        style: "font-size:12px;color:blue",
        text: '上传外协单位文档，    '
    });
    this._PTextLabel = new Ext.form.Label({
        style: "font-size:12px;color:#FF0000",
        text: '         请注意：上传文件要求加盖对方单位的公章，以彩色扫描件形式上传！'
    });

    Srims.common.OutsourcingEditPanel_newToolBar.superclass.constructor.call(this, {
        items: [this._newTextLabel,this._PTextLabel]
    });

}
Ext.extend(Srims.common.OutsourcingEditPanel_newToolBar, Ext.Toolbar);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.DocumentUploadWindow = function(id, outsourcing, store) {

    this._id = id;
    this._outsourcing = outsourcing;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
            projectId: window._outsourcing.get('id'),
                documentName: window._comboBoxDocumentName.getValue()
            }

            window.formPanel = window._formPanelDocument;
            window.store = window._store;

            Srims.documents.submitResource(window, saveParams, Srims.service.common.OutsourcingService + '/Import', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._project.get('name') + '的文档')
        }
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传企业法人证书',
        width: 360,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 100,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [ this._fileUploadField]
    });
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        return result;
    }
    Srims.common.DocumentUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传企业法人证书',
        fileUpload: true,
        width: 510,
        labelWidth: 100,
        height: 120,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.common.DocumentUploadWindow, Ext.Window, {})

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.DocumentUploadWindow2 = function(id, outsourcing, store) {

    this._id = id;
    this._outsourcing = outsourcing;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
            projectId: window._outsourcing.get('id'),
                documentName: window._comboBoxDocumentName.getValue()
            }

            window.formPanel = window._formPanelDocument;
            window.store = window._store;

            Srims.documents.submitResource(window, saveParams, Srims.service.common.OutsourcingService + '/Import', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._project.get('name') + '的文档')
        }
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传机构代码证',
        width: 360,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 100,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fileUploadField]
    });
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        return result;
    }
    Srims.common.DocumentUploadWindow2.superclass.constructor.call(this, {
        id: this._id,
        title: '上传组织机构代码证',
        fileUpload: true,
        width: 510,
        labelWidth: 100,
        height: 120,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.common.DocumentUploadWindow2, Ext.Window, {})

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.DocumentUploadWindow3 = function(id, outsourcing, store) {

    this._id = id;
    this._outsourcing = outsourcing;
    this._store = store;

    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function() {
            var window = this.window;
            if (!window.isValid(false))
                return false;

            var saveParams = {
            projectId: window._outsourcing.get('id')
            }

            window.formPanel = window._formPanelDocument;
            window.store = window._store;

            Srims.documents.submitResource(window, saveParams, Srims.service.common.OutsourcingService + '/Import', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._outsourcing.get('name') + '的文档')
        }
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传税务登记证',
        width: 360,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf', 'ppt', 'xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 100,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._fileUploadField]
    });
    this.isValid = function(preventMark) {
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        return result;
    }
    Srims.common.DocumentUploadWindow3.superclass.constructor.call(this, {
        id: this._id,
        title: '上传税务登记证',
        fileUpload: true,
        width: 510,
        labelWidth: 100,
        height: 120,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.common.DocumentUploadWindow3, Ext.Window, {})
/**
* @author gy
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingAllocation = Ext.data.Record.create([{
    name: 'projectId',
    type: 'int',
    mapping: 'ProjectId'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'voucherCount',
    type: 'string',
    mapping: 'VoucherCount'
}, {
    name: 'voucherDetail',
    type: 'string',
    mapping: 'VoucherDetail'
}, {
    name: 'outsourcingAlreadyAmountString',
    type: 'string',
    mapping: 'OutsourcingAlreadyAmountString'
}, {
    name: 'trueOverheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'TrueOverheadExpensesAlreadyIn'
}, {
    name: 'outsourcingPlanAmountString',
    type: 'string',
    mapping: 'OutsourcingPlanAmountString'
}, {
    name: 'indirectCosts',
    type: 'int',
    mapping: 'IndirectCosts'
}, {
    name: 'projectPerformancePay',
    type: 'int',
    mapping: 'ProjectPerformancePay'
}, {
    name: 'recoveryvoucherNumber',
    type: 'string',
    mapping: 'RecoveryvoucherNumber'
}, {
    name: 'roverheadExpensesAmount',
    type: 'string',
    mapping: 'RoverheadExpensesAmount'
}, {
    name: 'recoveryAmount',
    type: 'string',
    mapping: 'RecoveryAmount'
}, {
    name: 'rremark',
    type: 'string',
    mapping: 'Rremark'
}, {
    name: 'recoveryPrintState',
    type: 'string',
    mapping: 'RecoveryPrintState'
}, {
    name: 'recoveryPrintDate',
    type: 'string',
    mapping: 'RecoveryPrintDate'
},
{
    name: 'number',
    type: 'string',
    mapping: 'Number'
}, {
    name: 'state',
    type: 'string',
    mapping: 'State'
}, {
    name: 'principal',
    type: 'string',
    mapping: 'Principal'
}, {
    name: 'principalNumber',
    type: 'string',
    mapping: 'PrincipalNumber'
}, {
    name: 'principalEmail',
    type: 'string',
    mapping: 'PrincipalEmail'
}, {
    name: 'isPrincipalSecondCollege',
    type: 'string',
    mapping: 'IsPrincipalSecondCollege',
    convert: Boolean.toBoolean
}, {
    name: 'principalCollege',
    type: 'string',
    mapping: 'PrincipalCollege'
}, {
    name: 'principalId',
    type: 'string',
    mapping: 'PrincipalID'
}, {
    name: 'level',
    type: 'string',
    mapping: 'Level'
}, {
    name: 'subjectName',
    type: 'string',
    mapping: 'SubjectName'
}, {
    name: 'firstLevelSubjectId',
    type: 'string',
    mapping: 'FirstLevelSubjectID'
}, {
    name: 'firstLevelSubjectName',
    type: 'string',
    mapping: 'FirstLevelSubjectName'
}, {
    name: 'secondLevelSubjectId',
    type: 'string',
    mapping: 'SecondLevelSubjectID'
}, {
    name: 'secondLevelSubjectName',
    type: 'string',
    mapping: 'SecondLevelSubjectName'
}, {
    name: 'researchType',
    type: 'string',
    mapping: 'ResearchType'
}, {
    name: 'cooperationType',
    type: 'string',
    mapping: 'CooperationType'
}, {
    name: 'startDate',
    type: 'date',
    mapping: 'StartDate'
}, {
    name: 'endDate',
    type: 'date',
    mapping: 'EndDate'
}, {
    name: 'isSecret',
    type: 'boolean',
    mapping: 'IsSecret',
    convert: Boolean.toBoolean
}, {
    name: 'baseId',
    type: 'string',
    mapping: 'BaseID'
}, {
    name: 'baseName',
    type: 'string',
    mapping: 'BaseName'
}, {
    name: 'principalDelegate',
    type: 'string',
    mapping: 'PrincipalDelegate'
}, {
    name: 'principalDelegateId',
    type: 'string',
    mapping: 'PrincipalDelegateID'
}, {
    name: 'creator',
    type: 'string',
    mapping: 'Creator'
}, {
    name: 'createDate',
    type: 'date',
    mapping: 'CreateDate'
}, {
    name: 'corporationPlace',
    type: 'string',
    mapping: 'CorporationPlace'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'taskComingFrom',
    type: 'string',
    mapping: 'TaskComingFrom'
}, {
    name: 'isHorizontal',
    type: 'boolean',
    mapping: 'IsHorizontal',
    convert: Boolean.toBoolean
}, {
    name: 'rankId',
    type: 'int',
    mapping: 'RankID'
}, {
    name: 'rankName',
    type: 'string',
    mapping: 'RankName'
}, {
    name: 'typeId',
    type: 'int',
    mapping: 'TypeID'
}, {
    name: 'typeName',
    type: 'string',
    mapping: 'TypeName'
}, {
    name: 'typeShortName',
    type: 'string',
    mapping: 'TypeShortName'
}, {
    name: 'supportCategoryId',
    type: 'int',
    mapping: 'SupportCategoryID'
}, {
    name: 'supportCategoryName',
    type: 'string',
    mapping: 'SupportCategoryName'
}, {
    name: 'supportFieldId',
    type: 'int',
    mapping: 'SupportFieldID'
}, {
    name: 'supportFieldName',
    type: 'string',
    mapping: 'SupportFieldName'
}, {
    name: 'supportSubFieldId',
    type: 'int',
    mapping: 'SupportSubFieldID'
}, {
    name: 'supportSubFieldName',
    type: 'string',
    mapping: 'SupportSubFieldName'
}, {
    name: 'accountBookNumber',
    type: 'string',
    mapping: 'AccountBookNumber'
}, {
    name: 'fundAlreadyHardware',
    type: 'int',
    mapping: 'FundAlreadyHardware'
}, {
    name: 'fundAlreadyIn',
    type: 'int',
    mapping: 'FundAlreadyIn'
}, {
    name: 'fundAlreadyOut',
    type: 'int',
    mapping: 'FundAlreadyOut'
}, {
    name: 'fundAlreadyTotal',
    type: 'int',
    mapping: 'FundAlreadyTotal'
}, {
    name: 'fundContract',
    type: 'int',
    mapping: 'FundContract'
}, {
    name: 'fundFrom',
    type: 'string',
    mapping: 'FundFrom'
}, {
    name: 'fundFromUnit',
    type: 'string',
    mapping: 'FundFromUnit'
}, {
    name: 'fundFromUnitAddress',
    type: 'string',
    mapping: 'FundFromUnitAddress'
}, {
    name: 'fundPlanHardware',
    type: 'int',
    mapping: 'FundPlanHardware'
}, {
    name: 'allocatedPerformance',
    type: 'int',
    mapping: 'AllocatedPerformance'
}, {
    name: 'fundPlanIn',
    type: 'int',
    mapping: 'FundPlanIn'
}, {
    name: 'fundPlanOut',
    type: 'int',
    mapping: 'FundPlanOut'
}, {
    name: 'fundReceived',
    type: 'int',
    mapping: 'FundReceived'
}, {
    name: 'fundTotal',
    type: 'int',
    mapping: 'FundTotal'
}, {
    name: 'fundCanDescend',
    type: 'int',
    mapping: 'FundCanDescend'
}, {
    name: 'overheadExpenseInTotal',
    type: 'int',
    mapping: 'OverheadExpenseInTotal'
}, {
    name: 'overheadExpenseOutTotal',
    type: 'int',
    mapping: 'OverheadExpenseOutTotal'
}, {
    name: 'overheadExpensesAlreadyIn',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyIn'
}, {
    name: 'overheadExpensesAlreadyOut',
    type: 'int',
    mapping: 'OverheadExpensesAlreadyOut'
}, {
    name: 'overheadExpensesInStandard',
    type: 'int',
    mapping: 'OverheadExpensesInStandard'
}, {
    name: 'performancePayStandard',
    type: 'int',
    mapping: 'PerformancePayStandard'
}, {
    name: 'projectOutAmount',
    type: 'int',
    mapping: 'ProjectOutAmount'
}, {
    name: 'allocatedAmount',
    type: 'int',
    mapping: 'AllocatedAmount'
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, ]);
Srims.data.Entity.apply(Srims.common.OutsourcingAllocation);
/**
* @author gy
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingAllocationStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(load_url, params) {
        Srims.common.OutsourcingAllocationStore.superclass.constructor.call(this,
						new Srims.common.OutsourcingAllocationXmlReader(), load_url,
						params);
    }
});/**
* @author gy
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingAllocationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function() {
        Srims.common.OutsourcingAllocationXmlReader.superclass.constructor.call(
						this, Srims.common.OutsourcingAllocation);
    },
    readRecords: function(responseXML) {
        var result = Srims.common.OutsourcingAllocationXmlReader.superclass.readRecords.call(this, responseXML);
        result.records.ProjectOutAllAmount = parseInt(Ext.DomQuery.selectValue("ProjectOutAllAmount", responseXML), 10);
        result.records.AllocatedAllAmount = parseInt(Ext.DomQuery.selectValue("AllocatedAllAmount", responseXML), 10);
        return result;
    }
});

if (!Srims.common)
    Ext.namespace('Srims.common');

//用于查看外协的详细项目信息
Srims.common.allocationinfoRecord = undefined;
Srims.common.showProject = function() {
    Ext.Ajax.request({
        url: Srims.service.projects.ProjectService + '/GetById',
        params: {
            projectId: Srims.common.allocationinfoRecord.get('projectId')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.projects.ProjectXmlReader()
            });
            var project = store.getAt(0);
            Srims.projects.showProject(project);
        }
    });
}
Srims.common.OutsourcingShowPanel_AllocationInfo = function(outsourcing, id, queryParams) {
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该外协暂时没有分到经费'
    });
    this._showPanelID = id;
    this._panelID = 'OutsourcingAllocationInfo' + outsourcing.get('id');
    this._outsourcing = outsourcing;
    if (!queryParams) {
        this._queryParams = {};
        this._queryParams.ID = this._outsourcing.get('id');
    }
    this._expander = new Ext.grid.RowExpander({
        tpl: new Ext.Template(
            '<br><p style="padding-left:20px;">凭单明细: 该外协单位在该项目下生成了{voucherCount}张凭单。</p><br><p  style="padding-left:20px;line-height:1.5em;">{voucherDetail}</p><br><br>'
        )
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.common.OutsourcingShowPanel_AllocationInfo_ColumnModel(this._expander);
    this._store = new Srims.common.OutsourcingAllocationStore(Srims.service.common.OutsourcingService + '/GetAllocatedInfo', this._queryParams);
    this._toolbar = new Srims.common.OutsourcingShowPanel_AllocationInfo_ToolBar(this._showPanelID, this._store, this._queryParams, this._outsourcing);
    this._filters = new Srims.common.OutsourcingShowPanel_AllocationInfo_GridFilters();
    this._textItemFundSum = new Ext.Toolbar.TextItem('');

    Srims.common.OutsourcingShowPanel_AllocationInfo.superclass.constructor.call(this, {
        id: this._panelID,
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        sm: this._selections,
        store: this._store,
        plugins: [this._filters, this._expander],
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        autoHeight: true,
        title: '该外协公司的相关项目',
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        view: this._view,
        tbar: this._toolbar,
        bbar: new Ext.PagingToolbar({
            pageSize: 40,
            store: this._store,
            // plugins: this._filters,
            displayInfo: true,
            displayMsg: '当前是第{0}条-第{1}条，共{2}条',
            emptyMsg: '没有可以显示的记录',
            items: [this._textItemFundSum]
        })
    })
    this._store.load();
    this._store.grid = this;
    this.on('celldblclick', onCellDblClick);
    this._store.on('load', function(store, records) {
        if (records.ProjectOutAllAmount == undefined || records.AllocatedAllAmount == null)
            records.ProjectOutAllAmount = records.AllocatedAllAmount = 0;

        var fundSumMessage = String.format(" 外协计划分配总额：<strong>{0}</strong>，已分配外协总额：<strong>{1}</strong>", Money.render(records.ProjectOutAllAmount), Money.render(records.AllocatedAllAmount));
        Ext.get(store.grid._textItemFundSum.id).update(fundSumMessage);
    });
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var allocationinfoRecord = grid.getStore().getAt(rowIndex);
        if (!allocationinfoRecord.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该项目的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.common.allocationinfoRecord = allocationinfoRecord;
        Srims.Load.loadProjectModule('Srims.common.showProject();');
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo, Ext.grid.GridPanel);
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_ColumnModel = function(expander) {
    Srims.common.OutsourcingShowPanel_AllocationInfo_ColumnModel.superclass.constructor.call(this, [expander,{
        header: 'ID',
        dataIndex: 'projectID',
        hidden: true
    }, {
        header: "编号",
        dataIndex: 'number',
        width: 100,
        sortable: true,
        hidden: false
    }, {
        header: "名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false,
        renderer: function(value) {
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "负责人",
        dataIndex: 'principal',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "所属学院",
        dataIndex: 'principalCollege',
        width: 40,
        sortable: false,
        hidden: true
    }, {
        header: "等级",
        dataIndex: 'rankName',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "类型",
        dataIndex: 'typeName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "类型（简称）",
        dataIndex: 'typeShortName',
        width: 80,
        sortable: true,
        hidden: false
    }, {
        header: "到校经费",
        dataIndex: 'fundTotal',
        width: 60,
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "已到经费",
        dataIndex: 'fundReceived',
        width: 60,
        sortable: true,
        hidden: false,
        renderer: Money.render
    }, {
        header: "开始日期",
        dataIndex: 'startDate',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "结束日期",
        dataIndex: 'endDate',
        width: 80,
        sortable: true,
        hidden: false,
        renderer: Date.render
    }, {
        header: "负责人工作证号",
        dataIndex: 'principalNumber',
        sortable: false,
        hidden: true
    }, {
        header: "状态",
        dataIndex: 'state',
        width: 30,
        sortable: false,
        hidden: true,
        renderer: Srims.projects.projectStateRender
    }, {
        header: "级别",
        dataIndex: 'level',
        sortable: false,
        hidden: true,
        width: 10,
        renderer: Srims.projects.projectLevelRender
    }, {
        header: "所属学科",
        dataIndex: 'subjectName',
        sortable: false,
        hidden: true
    }, {
        header: "研究类型",
        dataIndex: 'researchType',
        sortable: false,
        hidden: true
    }, {
        header: "合作类型",
        dataIndex: 'cooperationType',
        sortable: false,
        hidden: true
    }, {
        header: "所属基地",
        dataIndex: 'baseName',
        sortable: false,
        hidden: true
    }, {
        header: "保密",
        dataIndex: 'isSecret',
        sortable: false,
        hidden: true,
        renderer: Boolean.render
    }, {
        header: "委托负责人",
        dataIndex: 'principalDelegate',
        sortable: false,
        hidden: true
    }, {
        header: "建立人",
        dataIndex: 'creator',
        sortable: false,
        hidden: true
    }, {
        header: "建立日期",
        dataIndex: 'createDate',
        sortable: true,
        hidden: true,
        renderer: Date.render
    }, {
        header: "公司所在地",
        dataIndex: 'corporationPlace',
        sortable: false,
        hidden: true
    }, {
        header: "资助类别",
        dataIndex: 'supportCategoryName',
        sortable: false,
        hidden: true
    }, {
        header: "资助领域",
        dataIndex: 'supportField',
        sortable: false,
        hidden: true
    }, {
        header: "资助子领域",
        dataIndex: 'supportField',
        sortable: false,
        hidden: true
    }, {
        header: '项目计划分配外协额度',
        dataIndex: 'projectOutAmount',
        hidden: false,
        renderer: Money.render
    }, {
        header: '项目已分外协',
        dataIndex: 'allocatedAmount',
        hidden: false,
        renderer: Money.render
}])
    }
    Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_ColumnModel, Ext.grid.ColumnModel);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_ToolBar = function(panelId, store, queryParams, outsourcing) {

    //fields
    this._GridID = panelId;
    this._panelId = panelId + '_AllocationInfo_Toolbar';
    this._store = store;
    this._queryParams = queryParams;
    this._outsourcing = outsourcing;
    //controls
    this._buttonQuery = new Ext.Toolbar.Button({
        iconCls: 'icon-query',
        text: '查询',
        minWidth: 60,
        outsourcing: this._outsourcing,
        queryParams: this._queryParams,
        panelId: this._GridID,
        store: this._store,
        handler: function() {
            Srims.common.showOutsourcingShowPanel_AllocationInfo_QueryWindow(panelId + '_QueryWindow', this.store, queryParams, Ext.getCmp(panelId), outsourcing);
        },
        tooltip: '<b>项目类别查询</b><br/>对项目类别进行查询'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        store: this._store,
        handler: function() {
            this.store.load();
        },
        tooltip: '<b>刷新列表</b><br/>更新项目分类列表'
    });
    this._buttonReset = new Ext.Toolbar.Button({
        iconCls: 'icon-reset',
        text: '重置',
        minWidth: 60,
        store: this._store,
        outsourcing:this._outsourcing,
        panelId: this._panelId,
        handler: function() {
            //清空查询条件
            var params = ['token','ID'];
            Srims.SetQueryParams.clearParams(queryParams, params);
            this.store.load();
        },
        tooltip: '<b>重置列表</b><br/>清空查询条件，重置列表'
    });
    var user = Srims.currentLoginLog.user;
    this._buttonQuery.setVisible(user.userRoleType == 'Administrator');

    Srims.common.OutsourcingShowPanel_AllocationInfo_ToolBar.superclass.constructor.call(this, {
        items: [this._buttonQuery, new Ext.Toolbar.Fill(), this._buttonRefresh, this._buttonReset]
    });

}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_ToolBar, Ext.Toolbar);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow = function(id, store, queryParams, gridPanel, outsourcing) {

    this._id = id;
    this._store = store;
    this._gridPanel = gridPanel;
    this._outsoucing = outsourcing;
    this._queryParams = queryParams;
    this._basicPanel = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel();
    this._typePanel = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_TypePanel(true);
    this._fundPanel = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel();
    this._memberPanel = new Srims.component.QueryWindow_MemberPanel('项目成员信息');

    this._buttonShowAll = new Ext.Button({
        minWidth: 80,
        text: '显示全部',
        window: this,
        handler: function() {
            this.window.getGridPanel();
            this.window.clearParams();

            Srims.SetQueryParams.clearParams(queryParams, new Array('token', 'ID'));
            this.window._store.load();
            this.window.hide();
        }
    });
    this._buttonQuery = new Ext.Button({
        minWidth: 80,
        text: '查 询',
        window: this
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function() {
            var window = this.window;

            window.getParams();

            Srims.common.newView(Srims.common.ViewType.OutsourcingAllocationInfoQuery, Srims.SetQueryParams.toJSON(queryParams));

        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function() {
            Srims.common.showViewWindow(Srims.common.ViewType.OutsourcingAllocationInfoQuery);

            this.window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.hide();
        }
    });

    Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '项目查询',
        iconCls: 'icon-project-horizontal-query',
        width: 850,
        height: 610,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        closeAction: 'hide',
        layout: 'column',
        stateful: false,
        resizable: false,
        items: [new Ext.Panel({
            width: 520,
            layout: 'form',
            autoScroll: true,
            height: 535,
            labelWidth: 100,
            autoScroll: true,
            items: [this._basicPanel, this._fundPanel, this._memberPanel]
        }), new Ext.Panel({
            layout: 'form',
            autoScroll: true,
            labelWidth: 100,
            items: [this._typePanel]
        })],
        buttons: [this._buttonQuery, this._buttonShowAll, this._buttonReset, this._buttonClose]
    });

    this.getParams = function() {
        this._basicPanel.buildParams(this._queryParams);
        this._fundPanel.buildParams(this._queryParams);
        this._memberPanel.buildParams(this._queryParams);
        this._typePanel.buildParams(this._queryParams);
    }
    this.clearParams = function() {
        this._basicPanel.clearParams();
        this._fundPanel.clearParams();
        this._memberPanel.clearParams();
        this._typePanel.clearParams();
    }
    this.getGridPanel = function() {
        var gridPanelID = this._gridPanel.id;
        Srims.WorkSpace.active(gridPanelID);
        Ext.getCmp(gridPanelID)._OutsourcingAllocationInfoForm._filters.clearFilters();
    }
    this.query = function(button) {
        var window = button.window;
        window.getGridPanel();
        window.getParams();

        Srims.SetQueryParams.removeNullparams(this._queryParams);
        window._store.load();
        window.hide();
    }
    //event
    this._buttonQuery.on('click', this.query);
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow, Ext.Window);


if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel = function() {
    this._textFieldNumber = new Ext.form.TextField({
        fieldLabel: '编号',
        width: 150
    });
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '名称',
        width: 150
    });
    this._textFieldPrincipal = new Ext.form.TextField({
        fieldLabel: '负责人',
        width: 150
    });
    this._comboBoxCollege = new Srims.component.EntityComboBox({
        fieldLabel: '所属学院',
        store: new Srims.experts.DepartmentStore(Srims.service.common.ProjectService + '/GetProjectColleges'),
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._dateFieldStartDateBegin = new Ext.form.DateField({
        fieldLabel: '开始时间',
        width: 150
    });
    this._dateFieldStartDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._dateFieldEndDateBegin = new Ext.form.DateField({
        fieldLabel: '结束时间',
        width: 150
    });
    this._dateFieldEndDateEnd = new Ext.form.DateField({
        fieldLabel: '至',
        width: 150
    });
    this._checkboxGroupLevel = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目级别',
        cls: 'srims-checkboxGroup',
        columns: 3,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectLevelStore, Srims.projects.ProjectLevel.Perside)
    });
    this._checkboxGroupState = new Srims.component.CheckBoxGroup({
        fieldLabel: '项目状态',
        cls: 'srims-checkboxGroup',
        columns: 4,
        items: Srims.component.CheckBoxGroup.getCheckboxGroupItemsFromArray(Srims.projects.projectStateQueryStore)
    });
    this._textFieldTaskFroms = new Ext.form.TextField({
        fieldLabel: '任务来源',
        width: 150
    });
    this._checkboxIsSecret = new Ext.form.Checkbox({
        fieldLabel: '是否涉密'
    });
    this._comboBoxProjectSubjectNature = new Ext.form.ComboBox({
        fieldLabel: '学科分类',
        store: Srims.type.projectSubjectNatureStore,
        displayField: 'name',
        editable: true,
        triggerAction: 'all',
        listWidth: 150,
        width: 150
    });
    this._panelCorporationPlace = new Srims.component.ProvinceCityPanel('单位地址', undefined, undefined, true);


    var columnOneItems = [this._textFieldNumber, this._textFieldPrincipal, this._dateFieldStartDateBegin, this._dateFieldEndDateBegin, this._checkboxIsSecret];
    var columnTwoItems = [this._textFieldName, this._comboBoxCollege, this._dateFieldStartDateEnd, this._dateFieldEndDateEnd];
    var columnItems = [];
    columnTwoItems[columnTwoItems.length] = this._textFieldTaskFroms;
    columnOneItems[columnOneItems.length] = this._comboBoxProjectSubjectNature;
    columnItems[columnItems.length] = this._panelCorporationPlace;


    columnItems[columnItems.length] = this._checkboxGroupLevel;
    columnItems[columnItems.length] = this._checkboxGroupState;

    Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel.superclass.constructor.call(this, {
        title: '基本信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoWidth: true,
        autoHeight: true,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 60,
                items: columnOneItems
            }), new Ext.Panel({
                labelWidth: 60,
                layout: 'form',
                items: columnTwoItems
            })]
        }), new Ext.Panel({
            labelWidth: 60,
            layout: 'form',
            items: columnItems
        })]
    });

    this.buildParams = function(params) {
        params.number = this._textFieldNumber.getValue();
        params.name = this._textFieldName.getValue();
        params.principal = this._textFieldPrincipal.getValue();
        params.principalCollege = this._comboBoxCollege.getText();

        var subjectNatureName = this._comboBoxProjectSubjectNature.getRawValue();
        if (!String.isEmpty(subjectNatureName))
            params.subjectNature = this._comboBoxProjectSubjectNature.getValue();
        else
            params.subjectNature = ''

        params.startDateStart = Date.format(this._dateFieldStartDateBegin.getValue());
        params.startDateEnd = Date.format(this._dateFieldStartDateEnd.getValue());
        params.endDateStart = Date.format(this._dateFieldEndDateBegin.getValue());
        params.endDateEnd = Date.format(this._dateFieldEndDateEnd.getValue());
        params.level = this._checkboxGroupLevel.getSelecetedValue();
        params.state = this._checkboxGroupState.getSelecetedValue();
        params.isSecret = this._checkboxIsSecret.checked ? this._checkboxIsSecret.getValue() : '';


        params.taskFroms = this._textFieldTaskFroms.getValue();
        params.corporationPlace = '';
        if (this._panelCorporationPlace._comboBox_Province.getRawValue() != '')
            params.corporationPlace = this._panelCorporationPlace._comboBox_Province.getRawValue() + ' ' + this._panelCorporationPlace._comboBox_City.getRawValue();

    }
    this.clearParams = function() {
        this._textFieldNumber.reset();
        this._textFieldName.reset();
        this._textFieldPrincipal.reset();
        this._comboBoxCollege.reset();
        this._dateFieldStartDateBegin.reset();
        this._dateFieldStartDateEnd.reset();
        this._dateFieldEndDateBegin.reset();
        this._dateFieldEndDateEnd.reset();
        this._textFieldTaskFroms.reset();
        this._checkboxGroupLevel.reset();
        this._checkboxGroupState.reset();
        this._comboBoxProjectSubjectNature.reset();


        this._checkboxIsSecret.reset();
        this._panelCorporationPlace._comboBox_Province.reset();
        this._panelCorporationPlace._comboBox_City.reset();

    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_BasicPanel, Ext.FormPanel);

if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel = function() {

    this._textFieldFundFroms = new Ext.form.TextField({
        fieldLabel: '资金来源',
        width: 280
    });
    this._numberFieldFundTotalBegin = new Srims.component.MoneyField({
        fieldLabel: '到校经费(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundTotalEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractBegin = new Srims.component.MoneyField({
        fieldLabel: '合同额(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundContractEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundReceiedBegin = new Srims.component.MoneyField({
        fieldLabel: '已到经费(万元)',
        width: 120,
        allowNegative: false
    });
    this._numberFieldFundReceivedEnd = new Srims.component.MoneyField({
        fieldLabel: '至',
        width: 120,
        allowNegative: false
    });
    this._checkboxIsBorrowMoney = new Ext.form.Checkbox({
        fieldLabel: '借款'
    });
    this._checkboxIsNotReturnAll = new Ext.form.Checkbox({
        fieldLabel: '未还清借款'
    });
    Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel.superclass.constructor.call(this, {
        title: '经费信息',
        frame: true,
        layout: 'form',
        labelWidth: 100,
        items: [new Ext.Panel({
            layout: 'column',
            items: [new Ext.Panel({
                width: 250,
                layout: 'form',
                labelWidth: 100,
                items: [this._numberFieldFundTotalBegin, this._numberFieldFundContractBegin, this._numberFieldFundReceiedBegin, this._checkboxIsNotReturnAll]
            }), new Ext.Panel({
                labelWidth: 30,
                layout: 'form',
                items: [this._numberFieldFundTotalEnd, this._numberFieldFundContractEnd, this._numberFieldFundReceivedEnd, this._checkboxIsBorrowMoney]
            })]
        }), this._textFieldFundFroms]
    });

    this.buildParams = function(params) {
        params.fundFroms = this._textFieldFundFroms.getValue();
        params.fundTotalStart = this._numberFieldFundTotalBegin.getMoney();
        params.fundTotalEnd = this._numberFieldFundTotalEnd.getMoney();
        params.fundContractStart = this._numberFieldFundContractBegin.getMoney();
        params.fundContractEnd = this._numberFieldFundContractEnd.getMoney();
        params.fundReceivedStart = this._numberFieldFundReceiedBegin.getMoney();
        params.fundReceivedEnd = this._numberFieldFundReceivedEnd.getMoney();
        params.isBorrowMoney = this._checkboxIsBorrowMoney.checked ? this._checkboxIsBorrowMoney.getValue() : '';
        params.isNotReturnAll = this._checkboxIsNotReturnAll.checked ? this._checkboxIsNotReturnAll.getValue() : '';
    }
    this.clearParams = function() {
        this._textFieldFundFroms.reset();
        this._numberFieldFundTotalBegin.reset();
        this._numberFieldFundTotalEnd.reset();
        this._numberFieldFundContractBegin.reset();
        this._numberFieldFundContractEnd.reset();
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_FundPanel, Ext.FormPanel);


if (!Srims.common)
    Ext.namespace('Srims.common');
if (!Srims.type)
    Ext.namespace('Srims.type');

Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_TypePanel = function(isPermission) {


    var loader = new Ext.tree.TreeLoader({
        dataUrl: Srims.service.type.ProjectRankService + '/GetTypeString',
        baseParams: {
            isPermission: isPermission == false ? false : true
        },
        baseAttrs: {
            uiProvider: Ext.tree.TreeCheckNodeUI
        }
    });
    var root = new Ext.tree.AsyncTreeNode({
        id:' ',
        text: '项目类型选择',
        leaf: false,
        loader: loader,
        expandable: true,
        expanded: true
    });
    var tree = new Ext.tree.TreePanel({
        id: "tree",
        root: root,
        singleExpand: false,
        autoWidth: true,
        height:  523,
        autoScroll: true,
        checkModel: 'multiple',
        onlyLeafCheckable: false,
        animate: true
    });
    tree.on('checkchange', function(node, checked) {
        node.attributes.checked = checked;
        //处理父节点
        var nodeparent = node.parentNode;
        while (nodeparent != null) {
            var isChecked = isHasChildNodeChecked(nodeparent)
            nodeparent.ui.toggleCheck(isChecked);
            nodeparent.attributes.checked = isChecked;
            nodeparent = nodeparent.parentNode;
        }
        //处理子节点
        setAllChildNodeCheckedToFlase(node, checked);
        //以后学习参考，勿删
        //node.eachChild(function(child){
        //  child.ui.toggleCheck(false);
        // child.attributes.checked = false;
        // child.fireEvent('checkchange', child, false);
        //});

    }, tree);
    function setAllChildNodeCheckedToFlase(node, checked) {
        node.ui.toggleCheck(checked);
        node.attributes.checked = checked;

        var childNodes = node.childNodes;
        if (childNodes.length == 0)
            return;

        for (var i = 0; i < childNodes.length; i++) {
            childNodes[i].ui.toggleCheck(false);
            childNodes[i].attributes.checked = false;
            setAllChildNodeCheckedToFlase(childNodes[i], false);
        }
    }
    function isHasChildNodeChecked(node) {
        var childNodes = node.childNodes;
        for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i].attributes.checked)
                return true;
        }

        return false;
    }

    Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_TypePanel.superclass.constructor.call(this, {
        title: '类型信息',
        frame: true,
        layout: 'form',
        labelWidth: 60,
        autoScroll: true,
        width: 300,
        items: tree
    });

    this.buildParams = function(params) {
        params.rankName = '';
        params.typeName = '';
        params.supportCategoryName = '';
        params.supportFieldName = '';
        params.supportSubFieldName = '';

        var rankNodes = root.childNodes;
        if (rankNodes == null)
            return;
        for (var i = 0; i < rankNodes.length; i++) {
            if (rankNodes[i].attributes.checked) {
                params.rankName += rankNodes[i].text + ',';
                var typeNodes = rankNodes[i].childNodes;
                if (typeNodes == null)
                    continue;
                for (var j = 0; j < typeNodes.length; j++) {
                    if (typeNodes[j].attributes.checked) {
                        params.typeName += typeNodes[j].text + ',';

                        var supportCategoryNodes = null;
                        var supportFieldNodes = null;
                        if (typeNodes[j].firstChild != null)
                            supportCategoryNodes = typeNodes[j].firstChild.childNodes;
                        if (typeNodes[j].lastChild != null)
                            supportFieldNodes = typeNodes[j].lastChild.childNodes;
                        if (supportCategoryNodes == null && supportFieldNodes == null)
                            continue;
                        if (supportCategoryNodes != null)
                            for (var k = 0; k < supportCategoryNodes.length; k++) {
                            if (supportCategoryNodes[k].attributes.checked) {
                                params.supportCategoryName += supportCategoryNodes[k].text + ',';
                            }
                        }
                        if (supportFieldNodes != null)
                            for (var m = 0; m < supportFieldNodes.length; m++) {
                            if (supportFieldNodes[m].attributes.checked) {
                                params.supportFieldName += supportFieldNodes[m].text + ',';
                                var supportSubFieldNodes = supportFieldNodes[m].childNodes;
                                if (supportSubFieldNodes == null)
                                    continue;
                                for (var n = 0; n < supportSubFieldNodes.length; n++) {
                                    if (supportSubFieldNodes[n].attributes.checked) {
                                        params.supportSubFieldName += supportSubFieldNodes[n].text + ',';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    this.clearParams = function() {
        setAllChildNodeCheckedToFlase(root, false);

    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow_TypePanel, Ext.FormPanel);
/**
* @author gy
*/
if (!Srims.common)
    Ext.namespace('Srims.common');
Srims.common.OutsourcingShowPanel_AllocationInfo_GridFilters = function() {
    Srims.common.OutsourcingShowPanel_AllocationInfo_GridFilters.superclass.constructor.call(
			this, {
    filters: [{
        type: 'string',
        dataIndex: 'name'
    }, {
        type: 'string',
        dataIndex: 'number'
    }, {
        type: 'string',
        dataIndex: 'principal'
    }, {
        type: 'date',
        dataIndex: 'startDate'
    }, {
        type: 'date',
        dataIndex: 'endDate'
    },  {
        type: 'string',
        dataIndex: 'typeName'
    }, {
        type: 'string',
        dataIndex: 'typeShortName'
}]
			    });
}
Ext.extend(Srims.common.OutsourcingShowPanel_AllocationInfo_GridFilters, Ext.grid.GridFilters);
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.DocumentUploadWindow = function(id, project, store){

    this._id = id;
    this._project = project;
    this._store = store;
    
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.close();
        }
    });
    this._buttonUpload = new Ext.Button({
        minWidth: 70,
        text: '上 传',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid(false)) 
                return false;
            
            var saveParams = {
                projectId: window._project.get('id'),
                documentName: window._comboBoxDocumentName.getValue()
            }
            
            window.formPanel = window._formPanelDocument;
            window.store = window._store;
            
            Srims.documents.submitResource(window, saveParams, Srims.service.documents.DocumentService + '/UpLoad', '正在上传项目文档', '上传文档成功', '成功上传项目：' + window._project.get('name') + '的文档')
        }
    });
    this._comboBoxDocumentName = new Srims.component.NoticeTextComboBox({
        fieldLabel: '文档名称',
        noticeTextType: 'DocumentName',
        allowBlank: false,
        listWidth: 160,
        width: 160
    });
    this._fileUploadField = new Srims.component.FileUploadField({
        id: 'upLoadDocument',
        fieldLabel: '上传文档',
        width: 160,
        emptyText: '请选择要上传的文档',
        allowBlank: false,
        fileTypes: ['doc', 'pdf','ppt','xls'],
        buttonCfg: {
            text: '',
            iconCls: 'icon-upload'
        }
    });
    this._formPanelDocument = new Ext.FormPanel({
        fileUpload: true, //标志此表单数据中包含文件数据
        frame: true,
        layout: 'form',
        labelWidth: 60,
        height: 120,
        bodyStyle: 'padding: 10px 0 0 10px',
        items: [this._comboBoxDocumentName, this._fileUploadField]
    });
    this.isValid = function(preventMark){
        var result = true;
        result = this._fileUploadField.isValid(preventMark) && result;
        result = this._comboBoxDocumentName.isValid(preventMark) && result;
        
        return result;
    }
    Srims.documents.DocumentUploadWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '上传项目文档',
        fileUpload: true,
        width: 310,
        labelWidth: 60,
        height: 160,
        modal: true,
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [this._formPanelDocument],
        buttons: [this._buttonUpload, this._buttonClose]
    });
}
Ext.extend(Srims.documents.DocumentUploadWindow, Ext.Window, {})

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeText = Ext.data.Record.create([{
    name: 'value',
    type: 'string',
    mapping: 'Value'
}, {
    name: 'valueSpell',
    type: 'string',
    mapping: 'ValueSpell'
}, {
    name: 'type',
    type: 'int',
    mapping: 'Type'
}]);
Srims.data.Entity.apply(Srims.common.NoticeText);

if (!Srims.common) 
    Ext.namespace("Srims.common");

Srims.common.NoticeTextStore = Ext.extend(Srims.data.XmlStore, {
    constructor: function(url, type){
        Srims.common.NoticeTextStore.superclass.constructor.call(this, new Srims.common.NoticeTextXmlReader(), url, {
            type: type
        });
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.NoticeTextXmlReader.superclass.constructor.call(this, Srims.common.NoticeText);
    }
});
if (!Srims.common)
    Ext.namespace('Srims.common');
Ext.namespace('Srims.common.OutsourcingCompanyType');
Srims.common.OutsourcingCompanyType.institution = 'institution';
Srims.common.OutsourcingCompanyType.collectively_owned = 'collectively_owned';
Srims.common.OutsourcingCompanyType.joint_equity = 'joint_equity ';
Srims.common.OutsourcingCompanyType.associated = 'associated';
Srims.common.OutsourcingCompanyType.LLC = 'LLC';
Srims.common.OutsourcingCompanyType.LTD = 'LTD';
Srims.common.OutsourcingCompanyType.privateC = 'privateC';
Srims.common.OutsourcingCompanyType.GOT_joint_venture = 'GOT_joint_venture';
Srims.common.OutsourcingCompanyType.GOT_cooperative_venture = 'GOT_cooperative_venture';
Srims.common.OutsourcingCompanyType.GOT_private_venture = 'GOT_private_venture';
Srims.common.OutsourcingCompanyType.GOT_ownjoint_venture = 'GOT_ownjoint_venture';
Srims.common.OutsourcingCompanyType.cf_joint = 'cf_joint';
Srims.common.OutsourcingCompanyType.cf_cooperation = 'cf_cooperation';
Srims.common.OutsourcingCompanyType.overseas = 'overseas';
Srims.common.OutsourcingCompanyType.FICLS = 'FICLS';

Srims.common.outsourcingCompanyTypeRender = function(value, metadata) {
    switch (value) {
        case 'institution':
            return '事业单位';
        case 'collectively_owned':
            return '集体企业';
        case 'joint_equity':
            return '股份合作企业';
        case 'associated':
            return '联营企业';
        case 'LLC':
            return '有限责任公司';
        case 'LTD':
            return '股份有限公司';
        case 'privateC':
            return '私营企业';
        case 'GOT_joint_venture':
            return '合资经营企业(港或澳、台资)';
        case 'GOT_cooperative_venture':
            return '合作经营企业(港或澳、台资)';
        case 'GOT_private_venture':
            return '港、澳、台商独资经营企业';
        case 'GOT_ownjoint_venture':
            return '港、澳、台商投资股份有限公司';
        case 'cf_joint':
            return '中外合资经营企业';
        case 'cf_cooperation':
            return '中外合作经营企业';
        case 'overseas':
            return '外资企业';
        case 'FICLS':
            return '外商投资股份有限公司';
        default:
            return '未知';
    }
}
//Srims.common.outsourcingCompanyTypeStore = [['事业单位', '事业单位'], ['collectively_owned', '集体企业'], ['joint_equity ', '股份合作企业'], ['associated', '联营企业'], ['LLC', '有限责任公司'], ['LTD', '股份有限公司'], ['privateC', '私营企业'], ['GOT_joint_venture', '合资经营企业(港或澳、台资)'], ['GOT_cooperative_venture', '合作经营企业(港或澳、台资)'], ['GOT_private_venture', '港、澳、台商独资经营企业'], ['GOT_ownjoint_venture', '港、澳、台商投资股份有限公司'], ['cf_joint', '中外合资经营企业'], ['cf_cooperation', '中外合作经营企业'], ['overseas', '外资企业'], ['FICLS', '外商投资股份有限公司']];
Srims.common.outsourcingCompanyTypeStore = [['事业单位', '事业单位'], ['集体企业', '集体企业'], ['股份合作企业 ', '股份合作企业'], ['联营企业', '联营企业'], ['有限责任公司', '有限责任公司'], ['股份有限公司', '股份有限公司'], ['私营企业', '私营企业'], ['合资经营企业(港或澳、台资)', '合资经营企业(港或澳、台资)'], ['合作经营企业(港或澳、台资)', '合作经营企业(港或澳、台资)'], ['港、澳、台商独资经营企业', '港、澳、台商独资经营企业'], ['港、澳、台商投资股份有限公司', '港、澳、台商投资股份有限公司'], ['中外合资经营企业', '中外合资经营企业'], ['中外合作经营企业', '中外合作经营企业'], ['外资企业', '外资企业'], ['外商投资股份有限公司', '外商投资股份有限公司']];
/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingEditPanel = function(IsInformation, id, outsourcing, store, IsExpert) {
    var user = Srims.currentLoginLog.user;
    var userIsExpert = user.userRoleType == 'Expert';
    this._id = id;
    var clickTimes = 0;
    this._outsourcing = outsourcing;
    this._store = store;
    this._title = outsourcing.isNew() ? "新建外协单位" : '编辑外协单位-'
			+ outsourcing.get('name');
    this.importUrl = "";
    this._basicForm = new Srims.common.OutsourcingEditPanel_Basic(IsInformation, outsourcing); // 位于文件Srims.common.OutsourcingEditPanel_Basic.js中
    //this._documentForm = new Srims.common.OutsourcingEditPanel_Document(outsourcing);
    //this._tabDocument = new Srims.common.OutsourcingEditPanel_tabDocument(outsourcing);
    this._buttonSubmitDocument = new Srims.common.OutsourcingEditPanel_ToolBar(this);
    this._newbuttonSubmitDocument = new Srims.common.OutsourcingEditPanel_newToolBar(this);
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保存',
        panel: this
    });
    this._buttonReset = new Ext.Button({
        minWidth: 100,
        text: '重置',
        panel: this,
        handler: function() {
            var panel = this.panel;
            panel.clearParams();
        }
    });
    this._buttonCanel = new Ext.Button({
        minWidth: 100,
        text: '取消',
        panel: this,
        handler: function() {
            var panel = this.panel;
            Srims.WorkSpace.getWorkSpace().remove(panel);
        }
    });
    Srims.common.OutsourcingEditPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px;width:1200px;',
        closable: true,
        frame: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._title,
        iconCls: this._outsourcing.isNew()
						? 'icon-outsourcing-new'
						: 'icon-outsourcing-edit',
        items: [this._basicForm, this._newbuttonSubmitDocument, this._buttonSubmitDocument],
        buttons: [this._buttonSave, this._buttonCanel]
    });
    // method
    this.assignValues = function() {
        this._basicForm.assignValues();
    }
    this.clearParams = function() {
        this._basicForm.clearParams();
    }
    this.isValid = function(preventMark) {
        var result = true;

        result = this._basicForm.isValid(preventMark) && result;

        return result;
    }
    this.save = function() {
        var outsourcing = this._outsourcing;
        var isNew = this._outsourcing.isNew();
        var Isexpert = IsExpert;
        outsourcing.beginEdit();
        this.assignValues();
        outsourcing.commit();
        if (userIsExpert)
            if (!(outsourcing.get('taxCard') && outsourcing.get('companyCard') && outsourcing.get('groupCard')))
            Ext.Msg.show({
                title: '提示',
                msg: '您有为填完的空或者未提交的文件！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        if (!userIsExpert)
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService + '/Save',
                params: outsourcing.data,
                scope: this,
                success: function(response) {
                    //if (this._store)
                    //  this._store.load();//reflesh grid
                    Srims.WorkSpace.getWorkSpace().remove(this);

                    var newStore = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.common.OutsourcingXmlReader()
                    });

                    var newOutsourcing = newStore.getAt(0);

                    if (!Isexpert) {
                        if (!isNew) {
                            var panelID = 'OutsourcingShowPanel' + newOutsourcing.get('id');
                            if (Ext.getCmp(panelID))
                                Srims.WorkSpace.getWorkSpace().remove(Ext.getCmp(panelID), true);

                        }
                        var gridPanel = Ext.getCmp('OutourcingGridPanel');
                        if (gridPanel) {
                            Srims.WorkSpace.active('OutourcingGridPanel');
                            Ext.getCmp('OutourcingGridPanel').getStore().load();
                        }
                        Srims.common.ShowOutsourcing(newOutsourcing, newOutsourcing);
                    }
                    if (Isexpert) {
                        var projectOut = new Srims.projects.ProjectOut({ outSourcingName: newOutsourcing.get('name'), amount: '' });
                        store.insert(0, projectOut);
                        store.grid.startEditing(0, 0);
                    }
                }
            });

            if (userIsExpert)
                Ext.Ajax.request({
                    url: Srims.service.common.OutsourcingService + '/Save',
                    params: outsourcing.data,
                    scope: this,
                    success: function(response) {
                        if (this._store)
                            this._store.load(); //reflesh grid
                        Srims.WorkSpace.getWorkSpace().remove(this);
                    }
                });
    }
    this._onButtonSave_Click = function(button, e) {
        var panel = button.panel;
        if (!panel.isValid(false))
            return;

        //        button.setText('正在保存');
        //        button.disable();
        panel.save();
    }

    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.common.OutsourcingEditPanel, Ext.Panel, {});/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace(Srims.common);
Srims.common.OutsourcingShowPanel_ToolBar = function(outsourcing, panelID, store) {
    this._outsourcing = outsourcing;
    this._panelID = panelID;
    this._store = store;

    this._buttonEdit = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '编辑',
        minWidth: 60,
        outsourcing: this._outsourcing,
        store: this._store,
        handler: function() {
            if (!this.outsourcing)
                return;
            Srims.common.EditOutsourcing(this.outsourcing, this.store, false);
        },
        hidden: true,
        tooltip: '<b>编辑外协单位</b><br/>编辑外协单位的名称、地址、电话、负责人、负责人邮箱等详细信息'
    });
    this._buttonVerfiy = new Ext.Toolbar.Button({
        iconCls: 'icon-edit',
        text: '审核',
        minWidth: 60,
        outsourcing: this._outsourcing,
        store: this._store,
        handler: function() {
            if (!this.outsourcing)
                return;
            Srims.common.VerfiyOutsourcing(this.outsourcing, this.store);
        },
        hidden: true,
        tooltip: '<b>审核外协单位</b><br/>审核外协单位的名称、地址、电话、负责人、负责人邮箱等详细信息'
    });
    this._buttonDelete = new Ext.Toolbar.Button({
        iconCls: 'icon-delete',
        text: '删除',
        minWidth: 60,
        outsourcing: this._outsourcing,
        store: this._store,
        handler: function() {
            if (!this.outsourcing)
                return;
            Srims.common.DeleteOutsourcing(this.outsourcing, this.store);
        },
        hidden: true,
        tooltip: '<b>删除该外协单位</b><br/>删除该外协单位所有信息'
    });
    this._buttonSubmitMainContract = new Ext.Toolbar.Button({
    iconCls: 'icon-Document-model-manage',
    text: '下载企业法人证书',
    outsourcing: this._outsourcing,
    minWidth: 60,
    disabled: !outsourcing.get('companyCard'),
        panel: this._panel,
        handler: function() {
                var id = outsourcing.get('id');
                Srims.documents.downLoadResource(id, '/GetOutSoucingFile1');
                return;
        },
        hidden: false,
        tooltip: '<b>下载外协单位文档：企业法人证书</b>'
    });
    this._buttonupOrganizationCodeLoadDocument = new Ext.Toolbar.Button({
    iconCls: 'icon-Document-model-manage',
    text: '下载组织机构代码证',
    outsourcing: this._outsourcing,
    minWidth: 60,
    disabled: !outsourcing.get('groupCard'),
        panel: this._panel,
        handler: function() {
            var id = outsourcing.get('id');
        Srims.documents.downLoadResource(id, '/GetOutSoucingFile2');
        },
        hidden: false,
        tooltip: '<b>下载外协单位文档：组织机构代码证</b>'
    });
    this._buttonupTaxLoadDocument = new Ext.Toolbar.Button({
    iconCls: 'icon-Document-model-manage',
    text: '下载税务登记证',
    outsourcing: this._outsourcing,
    minWidth: 60,
    disabled: !outsourcing.get('taxCard'),
        panel: this._panel,
        handler: function() {
            var id = outsourcing.get('id');
        Srims.documents.downLoadResource(id, '/GetOutSoucingFile3');
        },
        hidden: false,
        tooltip: '<b>下载外协单位文档：税务登记证</b>'
    });
    this._buttonRefresh = new Ext.Toolbar.Button({
        iconCls: 'icon-refresh',
        text: '刷新',
        minWidth: 60,
        outsourcing: this._outsourcing,
        panelID: this._panelID,
        handler: function() {
            var params = {};
            params.id = this.outsourcing.get('id');
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService
								+ '/GetById',
                params: params,
                scope: this,
                success: function(response) {
                    var store = new Ext.data.Store({
                        data: response.responseXML,
                        reader: new Srims.common
												.OutsourcingXmlReader()
                    });
                    var currentOutsourcing = store.getAt(0);
                    var panel = Ext.getCmp(this.panelID)
                    panel.resetComponentValue(currentOutsourcing);
                    panel._toolBar
									._resetButtonVisibleAndDisabled(currentOutsourcing);
                    panel._toolBar._resetButtonOutsourcing(currentOutsourcing);
                }
            });
        },
        tooltip: '<b>刷新外协单位信息</b><br/>刷新外协单位全部信息'
    });
    var buttonItems = [this._buttonEdit, this._buttonVerfiy, this._buttonDelete,this._buttonSubmitMainContract,this._buttonupOrganizationCodeLoadDocument,this._buttonupTaxLoadDocument, new Ext.Toolbar.Fill(),
			this._buttonRefresh];
    Srims.common.OutsourcingShowPanel_ToolBar.superclass.constructor.call(this,
			{
			    items: buttonItems,
			    height: 25
			});
    // 重设button属性
    this._resetButtonVisibleAndDisabled = function(outsourcing) {
        var ture = outsourcing.get('hasPermission_Vefiy');
        this._buttonVerfiy.setVisible(outsourcing.get('hasPermission_Vefiy'));
        this._buttonVerfiy.setDisabled(!outsourcing.get('hasPermission_Vefiy'));
        this._buttonEdit.setVisible(outsourcing.get('hasPermission_Edit'));
        this._buttonEdit.setDisabled(!outsourcing.get('canEdit'));

        this._buttonDelete.setVisible(outsourcing.get('hasPermission_Delete'));
        this._buttonDelete.setDisabled(!outsourcing.get('canDelete'));
    }
    this._resetButtonOutsourcing = function(outsourcing) {
        this._buttonEdit.outsourcing = outsourcing;
        this._buttonDelete.outsourcing = outsourcing;
        this._buttonVerfiy.outsourcing = outsourcing;
        this._buttonRefresh.outsourcing = outsourcing;
    }
    this._resetButtonVisibleAndDisabled(this._outsourcing);
}
Ext.extend(Srims.common.OutsourcingShowPanel_ToolBar, Ext.Toolbar);/**
* @author dulintao
*/
Srims.common.OutsourcingShowPanel_Basic = function(outsourcing) {
this._outsourcing = outsourcing;
this._user = Srims.currentLoginLog.user;
this._userIsExpert = this._user.userRoleType == 'Expert';
    this._textFieldName = new Ext.form.TextField({
        fieldLabel: '外协单位名称',
        value: outsourcing.get('name'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldLegalRepresentativeName = new Ext.form.TextField({
    fieldLabel: '法人代表',
        value: outsourcing.get('legalRepresentativeName'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldRegisteredCapital = new Ext.form.TextField({
    fieldLabel: '注册资本(万元)',
        value: outsourcing.get('registeredCapital'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldRegisteredCardNumber = new Ext.form.TextField({
        fieldLabel: '注册号',
        value: outsourcing.get('registeredCardNumber'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldOrganizationCode = new Ext.form.TextField({
        fieldLabel: '组织代码',
        value: outsourcing.get('organizationCode'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldTaxNumber = new Ext.form.TextField({
        fieldLabel: '税号',
        value: outsourcing.get('taxNumber'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldCompanyType = new Ext.form.TextField({
        fieldLabel: '公司类型',
        value: outsourcing.get('companyType'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldManagementType = new Ext.form.TextField({
        fieldLabel: '管理类别',
        value: outsourcing.get('managementType'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });

    this._textFieldCreateDateTime = new Ext.form.DateField({
        fieldLabel: '成立时间',
        value: outsourcing.get('createDateTime'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200,
        readOnly: true
    });

    this._textFieldDealDateTimeStart = new Ext.form.DateField({
    fieldLabel: '营业期限',
        value: outsourcing.get('dealDateTimeStart'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldDealDateTimeEnd = new Ext.form.DateField({
        fieldLabel: '至',
        value: outsourcing.get('dealDateTimeEnd'),
        format: 'Y-m-d',
        allowBlank: true,
        width: 200
    });
    this._textFieldBusinessScope = new Ext.form.TextArea({
        fieldLabel: '经营范围',
        value: outsourcing.get('businessScope'),
        allowBlank: true,
        width: 600,
        height: 100,
        readOnly: true
    });
    this._textFieldRemark = new Ext.form.TextArea({
        fieldLabel: '备注',
        value: outsourcing.get('remark'),
        allowBlank: true,
        width: 600,
        height: 100,
        readOnly: true
    });
    this._textFieldIsVerify = new Ext.form.TextField({
        fieldLabel: '审核状态',
        value: outsourcing.get('isVerify'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    this._textFieldAddress = new Ext.form.TextField({
        fieldLabel: '单位所在地',
        value: outsourcing.get('address'),
        allowBlank: true,
        width: 200,
        readOnly: true
    });
    if (this._userIsExpert) {
        var items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldIsVerify];
        var items2 = [this._textFieldOrganizationCode, this._textFieldCompanyType, this._textFieldTaxNumber, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd, this._textFieldAddress];
    }
    else {
        var items1 = [this._textFieldName, this._textFieldLegalRepresentativeName, this._textFieldRegisteredCapital, this._textFieldRegisteredCardNumber, this._textFieldDealDateTimeStart, this._textFieldTaxNumber, this._textFieldAddress];
        var items2 = [this._textFieldOrganizationCode, this._textFieldCompanyType, this._textFieldManagementType, this._textFieldCreateDateTime, this._textFieldDealDateTimeEnd, this._textFieldIsVerify];
    }
    Srims.common.OutsourcingShowPanel_Basic.superclass.constructor.call(this, {
        collapsible: true,
        title: '基本信息',
        Height: 500,
        frame: true,
        labelWidth: 130,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        defaultType: 'textfield',
        titleCollapse: true,
        items: [new Ext.Panel({
            labelWidth: 130,
            widht: 800,
            layout: 'column',
            items: [new Ext.Panel({
                width: 400,
                layout: 'form',
                style: 'width:400px',
                items: items1
            }), new Ext.Panel({
                width: 400,
                style: 'width:400px',
                layout: 'form',
                items: items2
            })]
        }), this._textFieldBusinessScope, this._textFieldRemark]
    });
    this.resetComponentValue = function(outsourcing) {
        this._outsourcing.set('name', this._textFieldName.getValue());
        this._outsourcing.set('legalRepresentativeName', this._textFieldLegalRepresentativeName.getValue());
        this._outsourcing.set('registeredCapital', this._textFieldRegisteredCapital.getValue());
        this._outsourcing.set('registeredCardNumber', this._textFieldRegisteredCardNumber.getValue());
        this._outsourcing.set('organizationCode', this._textFieldOrganizationCode.getValue());
        this._outsourcing.set('taxNumber', this._textFieldTaxNumber.getValue());
        this._outsourcing.set('companyType', this._textFieldCompanyType.getValue());
        this._outsourcing.set('managementType', this._textFieldManagementType.getValue());
        if (this._textFieldCreateDateTime.getValue() == null || this._textFieldCreateDateTime.getValue() == "" || this._textFieldCreateDateTime.getValue() == undefined)
        this._outsourcing.set('createDateTime', null);
        else
        this._outsourcing.set('createDateTime', this._textFieldCreateDateTime.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeStart.getValue() == null || this._textFieldDealDateTimeStart.getValue() == "" || this._textFieldDealDateTimeStart.getValue() == undefined)
        this._outsourcing.set('dealDateTimeStart', null);
        else
        this._outsourcing.set('dealDateTimeStart', this._textFieldDealDateTimeStart.getValue().format('Y/m/d'));
        if (this._textFieldDealDateTimeEnd.getValue() == null || this._textFieldDealDateTimeEnd.getValue() == "" || this._textFieldDealDateTimeEnd.getValue() == undefined)
        this._outsourcing.set('dealDateTimeEnd', null);
        else
        this._outsourcing.set('dealDateTimeEnd', this._textFieldDealDateTimeEnd.getValue().format('Y/m/d'));
        this._outsourcing.set('businessScope', this._textFieldBusinessScope.getValue());
        this._outsourcing.set('remark', this._textFieldRemark.getValue());
        this._outsourcing.set('isVerify', this._textFieldIsVerify.getValue());

        this._outsourcing.set('corporationPlace', this._textFieldAddress.getValue());
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel_Basic, Ext.form.FormPanel, {});
/**
* @author dulintao
*/
Srims.common.OutsourcingShowPanel = function(outsourcingStore, panelID,
		outsourcing, queryParams) {
    this._outsourcing = outsourcing;
    this._id = panelID;
    this._outsourcingStore = outsourcingStore;
    // control
    this._basicForm = new Srims.common.OutsourcingShowPanel_Basic(this._outsourcing); // 位于文件OutsourcingShowPanel_Basic.js中
    this._OutsourcingAllocationInfoForm = new Srims.common.OutsourcingShowPanel_AllocationInfo(this._outsourcing, this._id, queryParams);
    this._toolBar = new Srims.common.OutsourcingShowPanel_ToolBar(
			this._outsourcing, this._id, this._outsourcingStore); // 位于文件OutsourcingShowPanel_Toolbar.js中

    Srims.common.OutsourcingShowPanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px;width:1200px',
        closable: true,
        frame: true,
        deferHeight: false,
        buttonAlign: 'center',
        title: this._outsourcing.get('name'),
        iconCls: 'icon-show',
        tbar: this._toolBar,
        items: [this._basicForm, this._OutsourcingAllocationInfoForm]
    });
    //重置所有控件值
    this.resetComponentValue = function(outsourcing) {
        this._basicForm.resetComponentValue(outsourcing);
    }
}
Ext.extend(Srims.common.OutsourcingShowPanel, Ext.Panel, {});/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');
//列出外协单位
Srims.common.ListOutsourcing = function(showOutsourcingQueryPanel) {
    var panelId = 'OutourcingGridPanel';
    var outsourcingStore = undefined;
    var panel = Srims.WorkSpace.active(panelId);
    var queryParams = {};

    if (panel) {
        outsourcingStore = panel.GetOutsourcingStore();
    } else {
        outsourcingStore = new Srims.common.OutsourcingStore(Srims.service.common.OutsourcingService
				+ '/Query', queryParams);
        panel = new Srims.common.OutsourcingGridPanel(panelId,
				outsourcingStore, '外协单位列表', 'icon-outsourcing-list', queryParams);
        Srims.WorkSpace.addPanel(panel);
    }
    if (showOutsourcingQueryPanel)
        Srims.common.showOutsourcingQueryPanel(outsourcingStore, queryParams, panel);
};
//查重
Srims.common.showIsExistWindow = function(store) {
    var window = Ext.getCmp("IsOutsourcingExist");
    if (!window)
        var window = new Srims.common.IsOutsourcingExistWindow(store);
    // window._editGridPanel.getStore().load();
    window.show();
}
Srims.common.showOutsourcingQueryPanel = function(store, queryParams, gridPanel) {
    var panelId = 'OutsourcingInquiryPanel'
    var panel = Srims.WorkSpace.active(panelId);
    if (!panel) {
        panel = new Srims.common.OutsourcingInquiryPanel(panelId, store, queryParams, gridPanel)
        Srims.WorkSpace.addPanel(panel);
    }

    gridPanel.queryPanel = panel;

    var map = new Ext.KeyMap(panelId, {
        key: 13,
        fn: function() {
            if (!panel.hidden)
                panel.query(panel._buttonQuery);
        }
    });
};
Srims.common.StatisticsOutsourcing = function() {

};
// 查看外协单位
Srims.common.ShowOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingShowPanel' + outsourcing.get('id');
    var panel = Srims.WorkSpace.active(panelID);

    if (panel) {
        panel = new Srims.common.OutsourcingShowPanel(store, panelID,
				outsourcing);
    } else {
        panel = new Srims.common.OutsourcingShowPanel(store, panelID,
				outsourcing)
        Srims.WorkSpace.addPanel(panel);
    }
};
// 新建外协单位
Srims.common.NewOutsourcing = function(IsInformation, store, IsExpert) {
    var panelID = 'NewOutsourcing';
    var outsourcing = new Srims.common.Outsourcing({});

    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingEditPanel(IsInformation, panelID, outsourcing,
			store, IsExpert);
    Srims.WorkSpace.addPanel(panel);
};
// 编辑外协单位
Srims.common.EditOutsourcing = function(outsourcing, store, IsExpert) {
    var panelID = 'OutsourcingEditPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingEditPanel(' ?; ?; ', panelID, outsourcing,
			store, IsExpert);
    Srims.WorkSpace.addPanel(panel);
};
Srims.common.VerfiyOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingVerfiyPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingVerfiyPanel(' ?; ?; ', panelID, outsourcing,
			store);
    Srims.WorkSpace.addPanel(panel);
};

Srims.common.InquiryOneOutsourcing = function(outsourcing, store) {
    var panelID = 'OutsourcingInquiryPanel' + outsourcing.get('id');
    if (Srims.WorkSpace.active(panelID))
        return;
    var panel = new Srims.common.OutsourcingInquiryPanel(panelID, outsourcing,
			store);
    Srims.WorkSpace.addPanel(panel);
};
Srims.common.setSelectOutsourcingID = function(outsourcing, store) {
    var _params = {};
    _params.id = outsourcing.get('id');
    Ext.Ajax.request({
        url: Srims.service.common.OutsourcingService
										+ '/SetCurrentSelectSourcingID',
        scope: this,
        params: _params
    });
};
//通过注册上传外协单位相关文档
Srims.common.uploadDocument = function(outsourcing, store, title) {
    var windowId = 'newOutsourcingImportWindow' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.component.FileUploadWindow(windowId, store, Srims.service.common.OutsourcingService + '/Import', title, false, outsourcing);

    window.show();
}

//驳回外协单位
Srims.common.saveForChangeState = function(outsourcing, outsourcingState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo) {

    //    var _params = {};
    //    _params.outsourcingID = outsourcing.get('id');
    //    _params.remark = remark;

    //    outsourcing.beginEdit();
    //    outsourcing.set('isVerify', outsourcingState); //
    //    outsourcing.commit();

    Ext.Ajax.request({
        url: Srims.service.common.OutsourcingService + subUrl,
        params: outsourcing.data,
        success: function(response) {
            //从showPanel上改变外协状态

            //执行轮询
            if (pollActions) {
                for (var i = 0; i < pollActions.length; i++)
                    Srims.Poll.startPollAction(pollActions[i]);
            }

            //刷新GridPanel
            var gridPanel = Ext.getCmp(gridPanelID);
            if (gridPanel) {
                Srims.WorkSpace.active(gridPanelID);
                Ext.getCmp(gridPanelID).getStore().load({
                    callback: function() {
                        Ext.Msg.show({
                            title: msg,
                            msg: msgInfo,
                            buttons: Ext.Msg.OK,
                            icon: Ext.MessageBox.INFO
                        });
                    }
                });
            }
            var showPanel = 'OutsourcingVerfiyPanel' + outsourcing.get('id'); ;
            if (showPanel) {
                Srims.WorkSpace.getWorkSpace().remove(showPanel);

                //取得外协
                var newStore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.common.OutsourcingXmlReader()
                });

                var newOutsourcing = newStore.getAt(0);
                Srims.common.ShowOutsourcing(newOutsourcing);
            }
            else {
                Ext.Msg.show({
                    title: msg,
                    msg: msgInfo,
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    });
}

Srims.common.censorStart = function(outsourcing, remark, outsourcingState, subUrl, msg, msgInfo) {
    var gridPanelID = 'OutourcingGridPanel';
    var pollActions = [];
    pollActions[pollActions.length] = Srims.Poll.getPollAction_WaitingStartCensorOutsourcingCount;

    Srims.common.saveForChangeState(outsourcing, outsourcingState, remark, subUrl, pollActions, gridPanelID, msg, msgInfo);
}
Srims.common.censorStart_Reject = function(outsourcing, remark) {
    Srims.common.censorStart(outsourcing, remark, '审核驳回', '/DisVerfiy', '审核驳回立项：外协单位的添加申请成功', '成功审核驳回外协单位：' + outsourcing.get('name') + '的申请');
}
Srims.common.rejectOutsourcingCensor = function(outsourcing) {
    var windowId = 'rejectOutsourcingCensorWindow_start' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    if (!window)
        window = new Srims.common.OutsourcingCensorRejectWindow(windowId, outsourcing);
    window.show();
}

// 删除外协单位
Srims.common.DeleteOutsourcing = function(outsourcing, store) {
    Ext.MessageBox.confirm('删除该外协单位', '你确定要删除这个外协单位吗？', function(buttonID) {
        if (buttonID == 'yes') {
            var _params = {};
            _params.id = outsourcing.get('id');
            Ext.Ajax.request({
                url: Srims.service.common.OutsourcingService
										+ '/Delete',
                scope: this,
                params: _params,
                success: function() {
                    var showPanelID = 'OutsourcingShowPanel'
											+ outsourcing.get('id');
                    showPanel = Ext.getCmp(showPanelID);
                    if (showPanel)
                        Srims.WorkSpace.getWorkSpace()
												.remove(showPanel);
                    var editPanelID = 'OutsourcingEditPanel'
											+ outsourcing.get('id');
                    editPanel = Ext.getCmp(editPanelID);
                    if (editPanel)
                        Srims.WorkSpace.getWorkSpace()
												.remove(editPanel);
                    store.load();
                },
                failure: function() {
                    Ext.Msg.show({
                        title: '删除失败',
                        msg: '服务器删除错误，请重新删除！',
                        buttons: Ext.Msg.OK
                    });

                }
            });
        }
    }, this);
};
//通过表格导入外协相关文档
Srims.common.showOutsourcingImportWindow = function(outsourcing, store, title) {
    var windowId = 'OutsourcingImportWindow' + outsourcing.get('id');
    var window = Ext.getCmp(windowId);
    Srims.common.setSelectOutsourcingID(outsourcing, store);
    if (!window)
        window = new Srims.component.FileUploadWindow(windowId, store, Srims.service.common.OutsourcingService + '/Import', title, false);

    window.show();
}

Srims.common.downLoadDocument = function(document) {
    var documentResource = document;
    if (documentResource == '' || documentResource == null || documentResource == undefined) {
        Ext.Msg.show({
            title: '文档查看失败',
            msg: '该文档还没有上传',
            buttons: Ext.Msg.OK,
            icon: Ext.MessageBox.INFO
        });
        return;
    }
    Srims.documents.downLoadResource(document, '/GetOutsourcingDocument');
}

Srims.common.showOutsourcingShowPanel_AllocationInfo_QueryWindow = function(id, store, queryParams, gridPanel,outsourcing) {
    var window = Ext.getCmp(id);
    if (!window)
        window = new Srims.common.OutsourcingShowPanel_AllocationInfo_QueryWindow(id, store, queryParams, gridPanel,outsourcing);

    gridPanel.queryWindow = window;
    window.show();

    var map = new Ext.KeyMap(id, {
        key: 13,
        fn: function() {
            if (!window.hidden)
                window.query(window._buttonQuery);
        }
    });
}
