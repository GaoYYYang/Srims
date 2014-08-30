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
Ext.extend(Srims.common.OutsourcingShowPanel, Ext.Panel, {});