
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
