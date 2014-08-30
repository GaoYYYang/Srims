
if (!Srims.stamp)
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationTypeEditWindow = function(id, stampApplicationType) {

    this._id = id;
    this._stampApplicationType = stampApplicationType;
    this._title = stampApplicationType.isNew() ? '新建文印申请类型' : stampApplicationType.get('name');

    this._textTitle = new Ext.form.TextField({
        fieldLabel: '名称',
        value: stampApplicationType.get('name'),
        allowBlank: false,
        width: 150
    });

    this._comboBoxGroup = new Srims.component.EntityComboBox({
        fieldLabel: '文印申请类型组',
        editable: false,
        store: new Srims.stamp.StampApplicationTypeGroupStore(Srims.service.stamp.StampApplicationTypeGroupService + '/Query', {}),
        displayField: 'name',
        value: this._stampApplicationType.get('stampApplicationTypeGroupName'),
        entityId: this._stampApplicationType.get('stampApplicationTypeGroupID'),
        allowBlank: false,
        width: 150
    });

    this._textTwice = new Ext.form.Checkbox({
        fieldLabel: '是否二级审核',
        checked: this._stampApplicationType.get('isTwiceCancer')
    });
    this._textProject = new Ext.form.Checkbox({
        fieldLabel: '是否项目相关',
        checked: this._stampApplicationType.get('isProjectRelated')
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
    Srims.stamp.StampApplicationTypeEditWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 320,
        height: 200,
        deferredRender: false,
        labelWidth:95,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        //   title: this._title,
        iconCls: stampApplicationType.isNew() ? 'icon-subject-firstLevel-new' : 'icon-subject-firstLevel-edit',
        resizable: false,
        modal: true,
        items: [this._textTitle, this._comboBoxGroup, this._textTwice, this._textProject],
        buttons: [this._buttonSave, this._buttonClose]
    });

    this.assignValues = function() {
        this._textTitle.assignValues();
        this._textTwice.assignValues();
        this._textProject.assignValues();
        this._comboBoxGroup.assignValues();
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._textTitle.isValid(preventMark) && result;
        result = this._textTwice.isValid(preventMark) && result;
        result = this._textProject.isValid(preventMark) && result;
        result = this._comboBoxGroup.isValid(preventMark) && result;


        return result;
    }
    this.save = function() {
        var params = {};
        var stampApplicationType = this._stampApplicationType;
        stampApplicationType.beginEdit();
        //  this.assignValues(params);
        this.assignValues();
        stampApplicationType.commit();

        Ext.Ajax.request({
            url: Srims.service.stamp.StampApplicationTypeService + '/Save',
            params: stampApplicationType.data,
            // params: { Name: params.name, IsTwiceCancer: params.isTwiceCancer, IsProjectRelated: params.isProjectRelated },
            scope: this,
            success: function() {
                panel = Srims.WorkSpace.active('StampApplicationTypeGridPanel');
                if (panel)
                    panel.getStampApplicationTypeStore().load();
                else {
                    stampApplicationTypeStore = new Srims.stamp.StampApplicationTypeStore(Srims.service.stamp.StampApplicationTypeService + '/Query');
                    panel = new Srims.stamp.StampApplicationTypeGridPanel('StampApplicationTypeGridPanel', stampApplicationTypeStore, '文印申请类型列表', 'icon-announcement-list');
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
        this._stampApplicationType.set('name', this._textTitle.getValue());
        this._stampApplicationType.set('stampApplicationTypeGroupID', this._comboBoxGroup.getValue());
        this._stampApplicationType.set('stampApplicationTypeGroupName', this._comboBoxGroup.getText());
        this._stampApplicationType.set('isTwiceCancer', this._textTwice.getValue());
        this._stampApplicationType.set('isProjectRelated', this._textProject.getValue());
    }
}
Ext.extend(Srims.stamp.StampApplicationTypeEditWindow, Ext.Window);

