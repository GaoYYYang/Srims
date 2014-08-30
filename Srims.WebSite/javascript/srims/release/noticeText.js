
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
    Ext.namespace('Srims.common');

Srims.common.noticeTextManage = function(){
    Srims.common._noticeTextManage('NoticeText', 'icon-noticetext', '提示文本管理');
}
Srims.common._noticeTextManage = function(id, iconCls, name){
    var panelId = id;
    if (Srims.WorkSpace.active(panelId)) 
        return;
    var panel = new Srims.common.NoticeTextManagePanel(panelId);
    Srims.WorkSpace.addPanel(panel);
}

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextManagePanel = function(panelId){
    this._id = panelId;
    this._title = "提示文本管理";
    var noticeTextCountPerRow = 3;
    
    this._formPanelNoticeTextInforManage = new Srims.common.NoticeTextInforManage(noticeTextCountPerRow);
    
    this._buttonAddNoticeText = new Ext.Button({
        minWidth: 100,
        text: '新建提示文本',
        panel: this._formPanelNoticeTextInforManage
    });
    this._buttonSave = new Ext.Button({
        minWidth: 100,
        text: '保 存',
        panel: this
    });
    Srims.common.NoticeTextManagePanel.superclass.constructor.call(this, {
        id: this._id,
        style: 'padding:5px; width:1200px',
        closable: true,
        height: 700,
        frame: true,
        layout: 'form',
        buttonAlign: 'center',
        title: this._title,
        iconCls: 'icon-notice-text-manage',
        items: [this._formPanelNoticeTextInforManage],
        buttons: [this._buttonAddNoticeText, this._buttonSave]
    });
    this._onButtonAddNoticeText_Click = function(button, e){
        if (this.panel._comboBoxNoticeText.getValue() == '' || this.panel._comboBoxNoticeText.getValue() == undefined) {
            Ext.Msg.show({
                title: '新建提示文本错误',
                msg: '请先选择提示文本类型',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        this.panel.items.add(this.panel.items.length, new Srims.common.NoticeTextInforManageForAddText(undefined, noticeTextCountPerRow));
        this.panel.doLayout();
    };
    this.isValid = function(preventMark){
        var result = true;
        result = this._formPanelNoticeTextInforManage.isValid(preventMark) && result;
        return result;
    }
    this._buttonSave_Click = function(button, e){
        var noticeTexts = this.panel._formPanelNoticeTextInforManage.getNoticeTexts();
        var panel = button.panel;
        if (!panel.isValid(false)) 
            return;
        
        Ext.Ajax.request({
            url: Srims.service.common.NoticeTextService + '/Save',
            scope: this,
            params: {
                type: this.panel._formPanelNoticeTextInforManage._comboBoxNoticeText.getValue(),
                value: noticeTexts
            },
            success: function(){
                Ext.Msg.show({
                    title: '保存成功',
                    msg: '提示文本保存成功',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        });
    }
    this._buttonAddNoticeText.on('click', this._onButtonAddNoticeText_Click);
    this._buttonSave.on('click', this._buttonSave_Click);
}
Ext.extend(Srims.common.NoticeTextManagePanel, Ext.Panel, {});

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

Srims.common.NoticeTextTypeStore = [['ProjectResearchType', '项目研究类型'], ['ProjectCooperationType', '项目合作类型'], ['ProjectCensorRejectReason', '项目审核驳回理由'], ['DocumentName', '文档名称'], ['BaseAdministration', '基地主管部门'], ['BaseRank', '基地级别'], ['AwardName', '奖励名称'], ['AwardRank', '奖励级别'], ['AwardClass', '奖励等级'], ['AwardAttendType', '奖励参与类型'], ['AwardDocumentName', '奖励文档名称'], ['AwardClassification', '奖励种类'], ['AwardAuthorisedUnit', '奖励授奖单位'], ['PatentCountry', '专利国别'], ['PatentCategory', '专利分类'], ['PaperRank', '论文级别'], ['Lab', '所属实验室'], ['SubjectRank', '学科等级'], ['SubjectClass', '学科分类'], ['AcaedemyDegree', '专家学历'], ['ExpertPost', '专家职称'], ['ForeignLanguage', '外语语种'], ['LanguageLevel', '熟练程度'], ['Nation', '民族'], ['Policy', '政治面貌'], ['InvoiceType', '发票类型'], ['FundDescendRejectReason', '经费下拨驳回理由'], ['DocumentModelName', '文档模板名称'], ['StampReason', '盖章事由'], ['StampRejectReason', '文印驳回理由'], ['StampType', '图章类型'], ['StuffType', '盖章材料类型'], ['MagazineOccupation', '期刊任职职务'], ['PerformanceAllocation', '绩效分配最小额度'], ['Administrator', '文印管理员']];
if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.common.NoticeTextXmlReader.superclass.constructor.call(this, Srims.common.NoticeText);
    }
});

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextInforManage = function(noticeTextCountPerRow){
    
    this._comboBoxNoticeText = new Ext.form.ComboBox({
        fieldLabel: '提示文本类型',
        store: Srims.common.NoticeTextTypeStore,
        triggerAction: 'all',
        displayField: 'type',
        emptyText: '请选择提示文本类型',
        allowBlank: false,
        editable: false,
        panel: this,
        listWidth: 147,
        width: 147
    });
    
    Srims.common.NoticeTextInforManage.superclass.constructor.call(this, {
        title: '提示信息管理',
        frame: true,
        layout: 'form',
        items: [this._comboBoxNoticeText]
    });
    this._comboBoxNoticeText_Select = function(){
        var noticeTextStore = new Srims.common.NoticeTextStore(Srims.service.common.NoticeTextService + "/Get", this.getValue());
        
        noticeTextStore.on('load', function(){
            //清除原来的提示文本
            for (var i = 1; i < this.panel.items.length; i++) {
                (this.panel.items.getRange()[i]).destroy();
            }
            
            var noticeTexts = this.getRange();
            var count = this.getCount();
            var rowCount;
            
            if (count % 3 == 0) 
                rowCount = count / 3;
            else 
                rowCount = parseInt(count / 3) + 1;
            
            for (var i = 0; i < rowCount; i++) {
                var rowNoticeTexts = [];
                for (var j = 0; j < noticeTextCountPerRow; j++) 
                    rowNoticeTexts[rowNoticeTexts.length] = noticeTexts[i * noticeTextCountPerRow + j];
                
                this.panel.items.add(this.panel.items.length, new Srims.common.NoticeTextInforManageForAddText(rowNoticeTexts, noticeTextCountPerRow));
            }
            this.panel.doLayout();
        });
        noticeTextStore.panel = this.panel;
        noticeTextStore.load();
    };
    this.isValid = function(preventMark){
        var result = true;
        result = this._comboBoxNoticeText.isValid(preventMark) && result;
        return result;
    }
    this.getNoticeTexts = function(){
        var textFields = document.getElementsByName('NoticeTexttextField');
        var noticeTexts = '';
        for (var i = 0; i < textFields.length; i++) {
            if (String.Trim(textFields[i].value) != '' && String.Trim(textFields[i].value) != '请输入提示文本') 
                noticeTexts += String.Trim(textFields[i].value) + ',';
        }
        
        return noticeTexts;
        
    }
    this._comboBoxNoticeText.on('select', this._comboBoxNoticeText_Select);
}
Ext.extend(Srims.common.NoticeTextInforManage, Ext.form.FormPanel);

if (!Srims.common) 
    Ext.namespace('Srims.common');

Srims.common.NoticeTextInforManageForAddText = function(noticeTexts, noticeTextCountPerRow){
    var items = [];
    for (var i = 0; i < noticeTextCountPerRow; i++) {
        items[items.length] = new Ext.Panel({
            width: 300,
            layout: 'form',
            style: 'width:300px',
            items: new Ext.form.TextField({
                name: 'NoticeTexttextField',
                hideLabel: true,
                width: 160,
				emptyText:'请输入提示文本',
                value: noticeTexts == undefined ? '' : noticeTexts[i] == undefined ? '' : noticeTexts[i].get('value')
            })
        })
    }
    Srims.common.NoticeTextInforManageForAddText.superclass.constructor.call(this, {
        border: false,
        bodyStyle: 'padding:0px 0px 0',
        layout: 'form',
        items: [new Ext.Panel({
            layout: 'column',
            items: items
        })]
    });
}
Ext.extend(Srims.common.NoticeTextInforManageForAddText, Ext.Panel);
