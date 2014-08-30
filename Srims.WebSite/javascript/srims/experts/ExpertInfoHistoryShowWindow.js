
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertInfoHistoryShowWindow = function(id, expertInfoHistory, store){

    this._id = id;
    this._expertInfoHistory = expertInfoHistory;
    this._store = store;
    
    this._buttonCensorPass = new Ext.Button({
        minWidth: 80,
        text: '审核通过',
        window: this,
        handler: function(){
            var window = this.window;
            var titile = "审核通过";
            var message = "你确定要通过此专家编辑信息吗？";
            var methodName = "/CensorExpertEditInformation";
            Srims.experts.ExpertAction.CensorExpertInfoHistory(window._expertInfoHistory, window._store, titile, message, methodName);
            window.close();
        }
    });
    this._buttonCensorReject = new Ext.Button({
        minWidth: 80,
        text: '审核驳回',
        window: this,
        handler: function(){
            var window = this.window;
            var titile = "审核驳回";
            var message = "你确定要驳回此专家编辑信息吗？";
            var methodName = "/RejectExpertEditInformation";
            Srims.experts.ExpertAction.CensorExpertInfoHistory(window._expertInfoHistory, window._store, titile, message, methodName);
            window.close();
        }
    });
    
    this._textFieldExpert = new Ext.form.TextField({
        fieldLabel: '专家',
        value: this._expertInfoHistory.get('expertName'),
        readOnly: true,
        width: 160
    });
    this._textFieldPropertyName = new Ext.form.TextField({
        fieldLabel: '修改字段',
        value: Srims.experts.ExpertInfoHistoryPropertyValueNameRender(this._expertInfoHistory.get('propertyName')),
        readOnly: true,
        width: 160
    });
    this._textFieldPropertyOldValue = new Ext.form.TextField({
        fieldLabel: '字段旧值',
        value: this._expertInfoHistory.get('propertyOldValue'),
        readOnly: true,
        width: 160
    });
    this._textFieldPropertyNewValue = new Ext.form.TextField({
        fieldLabel: '字段新值',
        value: this._expertInfoHistory.get('propertyValue'),
        readOnly: true,
        width: 160
    });
    this._textFieldPropertyNewValueRender = new Ext.form.TextField({
        fieldLabel: '字段新值说明',
        value: this._expertInfoHistory.get('propertyValueRender'),
        readOnly: true,
        width: 160
    });
    var items1 = [];
    var items2 = [];
    if (this._expertInfoHistory.get('propertyValueType') == 'Guid') {
        this._textFieldOldPhoto = new Ext.form.Label({
            fieldLabel: '字段旧值',
            readOnly: true,
            // html: expert.get('photo') == '' ? '<div style="height:100px;width:200px; display: table-cell; text-align:center; vertical-align:middle;"> <span id="SpanExpertImg_' + expert.get('id') + '">该专家暂时没有照片</span><img id="ImgExpert_' + expert.get('id') + '" height="100px" /></div>' : '<div width="160px" style="text-align:center;"><img id="ImgExpert_' + expert.get('id') + '" height="100px" src="../' + expert.get('photo') + '" /></div></div>',
            width: 160
        });
        this._textFieldNewPhoto = new Ext.form.Label({
            fieldLabel: '字段新值',
            readOnly: true,
            // html: expert.get('photo') == '' ? '<div style="height:100px;width:200px; display: table-cell; text-align:center; vertical-align:middle;"> <span id="SpanExpertImg_' + expert.get('id') + '">该专家暂时没有照片</span><img id="ImgExpert_' + expert.get('id') + '" height="100px" /></div>' : '<div width="160px" style="text-align:center;"><img id="ImgExpert_' + expert.get('id') + '" height="100px" src="../' + expert.get('photo') + '" /></div></div>',
            width: 160
        });
        items1 = [this._textFieldExpert, this._textFieldOldPhoto];
        items2 = [this._textFieldPropertyName, this._textFieldNewPhoto];
    }
    else {
        items1 = [this._textFieldExpert, this._textFieldPropertyOldValue,this._textFieldPropertyNewValueRender ];
        items2 = [this._textFieldPropertyName, this._textFieldPropertyNewValue];
    }
    Srims.experts.ExpertInfoHistoryShowWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '专家修改信息' + this._expertInfoHistory.get('expertName'),
        iconCls: 'icon-show',
        width: 650,
        labelWidth: 90,
        height: 400,
        modal: true,
        bodyStyle: 'padding:10px 10px 0',
        deferredRender: false,
        frame: true,
        closeAction: 'close',
        layout: 'form',
        resizable: false,
        items: [new Ext.Panel({
            frame: true,
            layout: 'column',
            items: [new Ext.Panel({
                layout: 'form',
                width: 300,
                items: items1
            }), new Ext.Panel({
                layout: 'form',
                width: 300,
                items: items2
            })]
        })],
        buttons: [this._buttonCensorPass, this._buttonCensorReject]
    });
}
Ext.extend(Srims.experts.ExpertInfoHistoryShowWindow, Ext.Window, {})
