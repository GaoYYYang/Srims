
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
