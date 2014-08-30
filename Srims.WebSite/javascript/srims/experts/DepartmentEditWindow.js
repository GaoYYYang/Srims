
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.DepartmentEditWindow = function(id, department, store) {

    this._id = id;
    this._department = department;
    this._title = department.isNew() ? '新建部门' : department.get('name');
    this._store = store;

    this._textFieldDepartmentCode = new Ext.form.TextField({
        fieldLabel: '部门代码',
        value: department.get('code'),
        maxLength: '4',
        minLength: '4',
        allowBlank: false,
        width: 160
    });
    this._textFieldDepartmentName = new Ext.form.TextField({
        fieldLabel: '部门名称',
        value: department.get('name'),
        allowBlank: false,
        width: 160
    });
    this._textFieldDepartmentShortName = new Ext.form.TextField({
        fieldLabel: '部门简称',
        value: department.get('shortName'),
        width: 160
    });
    this._checkBoxDepartment = new Ext.form.Checkbox({
        fieldLabel: '是否是学院',
        checked: department.get('isCollege') == '是' ? true : false
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
    Srims.experts.DepartmentEditWindow.superclass.constructor.call(this, {
        id: this._id,
        bodyStyle: 'padding:10px 10px 0',
        width: 300,
        height: 250,
        deferredRender: false,
        labelWidth: 85,
        frame: true,
        layout: 'form',
        buttonAlign: 'right',
        title: this._title,
        iconCls: department.isNew() ? 'icon-department-new' : 'icon-department-edit',
        resizable: false,
        modal: true,
        items: [this._textFieldDepartmentCode, this._textFieldDepartmentName, this._textFieldDepartmentShortName, this._checkBoxDepartment],
        buttons: [this._buttonSave, this._buttonClose]
    });
    //method
    this.assignValues = function() {
        this._department.set('code', this._textFieldDepartmentCode.getValue());
        this._department.set('name', this._textFieldDepartmentName.getValue());
        this._department.set('shortName', this._textFieldDepartmentShortName.getValue());
        this._department.set('isCollege', this._checkBoxDepartment.getValue());
    }
    this.isValid = function(preventMark) {
        var result = true;
        result = this._textFieldDepartmentCode.isValid(preventMark) && result;
        result = this._textFieldDepartmentName.isValid(preventMark) && result;
        return result;
    }
    this.IsCollegeUsing = function() {
        if (department.isNew()) {
            this._checkBoxDepartment.setDisabled(false);
            return true;
        }

        Ext.Ajax.request({
            url: Srims.service.experts.DepartmentService + '/CanCollegeEdit',
            params: {
                departmentId: department.get('id')
            },
            scope: this,
            success: function(response) {
                this._checkBoxDepartment.setDisabled(!Boolean.toBoolean(response.responseText));
            }
        })
    }
    this.IsCollegeUsing();
    this.save = function() {
        var department = this._department;
        department.beginEdit();
        this.assignValues();
        department.commit();
        Ext.Ajax.request({
            url: Srims.service.experts.DepartmentService + '/SaveDepartment',
            params: department.data,
            scope: this,
            success: function() {
                this.close();
            }
        })
    }
    //event
    this._onButtonSave_Click = function(button, e) {
        var window = button.window;
        if (!window.isValid(false))
            return;

        Ext.Ajax.request({
            url: Srims.service.experts.DepartmentService + '/IsDepartmentCodeExist',
            params: {
                code: window._textFieldDepartmentCode.getValue(),
                departmentID: window._department.get('id') == undefined ? '' : window._department.get('id')
            },
            success: function(response) {
                //TODO：能否一次验证？·
                if (Boolean.toBoolean(response.responseText)) {
                    Ext.Msg.show({
                        title: '部门代码已经被占用',
                        msg: '部门代码不能重复，请重新输入',
                        buttons: Ext.Msg.OK,
                        icon: Ext.MessageBox.WARNING
                    });
                }
                else {
                    Ext.Ajax.request({
                        url: Srims.service.experts.DepartmentService + '/IsDepartmentNameExist',
                        params: {
                            name: window._textFieldDepartmentName.getValue(),
                            departmentID: window._department.get('id') == undefined ? '' : window._department.get('id')
                        },
                        success: function(response) {
                            if (Boolean.toBoolean(response.responseText)) {
                                Ext.Msg.show({
                                    title: '部门名称已经被占用',
                                    msg: '部门名称不能重复，请重新输入',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.MessageBox.WARNING
                                });
                            }
                            else {
                                button.setText('正在保存');
                                button.disable();

                                window.save();
                                window._store.load();
                            }
                        }
                    })
                }
            }
        })
    }
    this._buttonSave.on('click', this._onButtonSave_Click);
}
Ext.extend(Srims.experts.DepartmentEditWindow, Ext.Window);
