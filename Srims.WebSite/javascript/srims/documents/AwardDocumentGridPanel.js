
if (!Srims.documents) 
    Ext.namespace('Srims.documents');

Srims.documents.AwardDocumentGridPanel = function(id, award, isCensor, store){

    this._award = award;
    
    this._columnModel = new Srims.documents.AwardDocumentGridPanel_ColumnModel(isCensor);
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.documents.AwardDocumentGridPanel_ToolBar(this._selections, store, this._award, isCensor)
    
    var params = {};
    params.id = id;
    params.sm = this._selections;
    params.store = store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    if (!isCensor) 
        params.height = 270;
    if (isCensor) 
        params.title = '待审核奖励文档列表';
    
    Srims.documents.AwardDocumentGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.awards.downLoadAwardDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
};
Ext.extend(Srims.documents.AwardDocumentGridPanel, Srims.component.GridPanel, {});
