
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeGroupEditWindow = function(id, stampApplicationTypeGroup) {

    this._id = id;
    this._stampApplicationTypeGroup = stampApplicationTypeGroup;
    this._title = stampApplicationTypeGroup.isNew() ? '新建文印申请类型组' : stampApplicationTypeGroup.get('name');

    this._textTitle = new Ext.form.TextField({
        fieldLabel: '名称',
        value: stampApplicationTypeGroup.get('name'),
        allowBlank: false,
        width: 150
    });
    this._buttonSave = new Ext.Button({
        minWidth: 70,
        text: '保 存',
        window: this
    });
    this._buttonClose = new Ext.Button({
        minWidth: 70,
        text: '关 闭',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    Srims.stamp.StampApplicationTypeGroupEditWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 300,
        height: 100,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        //   title: this._title,
        iconCls: stampApplicationTypeGroup.isNew() ? 'icon-subject-firstLevel-new' : 'icon-subject-firstLevel-edit',
        resizable: false,
        modal: true,
        items: [this._textTitle],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.assignValues = function() {
 
    this._stampApplicationTypeGroup.set('name', this._textTitle.getValue());
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._textTitle.isValid(preventMark) && result;
        return result;
    }
    this.save = function() {
        var params = {};
        var stampApplicationTypeGroup = this._stampApplicationTypeGroup;
        stampApplicationTypeGroup.beginEdit();
        //  this.assignValues(params);
        this.assignValues();
        stampApplicationTypeGroup.commit();

        Ext.Ajax.request({
            url: Srims.service.stamp.StampApplicationTypeGroupService + '/Save',
            params: stampApplicationTypeGroup.data,
            // params: { Name: params.name, IsTwiceCancer: params.isTwiceCancer, IsProjectRelated: params.isProjectRelated },
            scope: this,
            success: function() {
            panel = Srims.WorkSpace.active('StampApplicationTypeGroupGridPanel');
                if (panel)
                    panel.getStampApplicationTypeGroupStore().load();
                else {
                    stampApplicationTypeGroupStore = new Srims.stamp.StampApplicationTypeGroupStore(Srims.service.stamp.StampApplicationTypeGroupService + '/Query');
                    panel = new Srims.stamp.StampApplicationTypeGroupGridPanel('StampApplicationTypeGroupGridPanel', stampApplicationTypeGroupStore, '文印申请类型列表', 'icon-announcement-list');
                    Srims.WorkSpace.addPanel(panel);
                }
                Srims.WorkSpace.getWorkSpace().remove(this);
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;

        if (!window.isValid(false))
            return;

        button.setText('正在保存');
        button.disable();


        window.save();

    }
    this._buttonSave.on('click', this._onButtonSave_Click);
    this.assignValues = function() {
    this._stampApplicationTypeGroup.set('name', this._textTitle.getValue());
      
    }
}
Ext.extend(Srims.stamp.StampApplicationTypeGroupEditWindow, Ext.Window);

