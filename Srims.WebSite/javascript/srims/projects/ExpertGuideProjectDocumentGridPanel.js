
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectDocumentGridPanel = function(){

    this._project = new Srims.projects.Project({});
    
    var load_url = Srims.service.documents.DocumentService + '/GetByProjectID';
    var params = {
        projectId: 0
    };
    this._store = new Srims.documents.DocumentStore(load_url, params);
    this._columnModel = new Srims.documents.DocumentGridPanel_ColumnModel();
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectDocumentGridPanel_ToolBar(this);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 270;
    params.width = 900;
    
    Srims.projects.ExpertGuideProjectDocumentGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var document = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadDocument(document);
    };
    this.on('celldblclick', onCellDblClick);
    
    
    this.setProject = function(project){
        this._project = project;
        
        this._toolBar.setProject(project);
        
        this._store.params.projectId = this._project.get('id');
        this._store.load();
    }
    
    this.next = function(){
        if (this._store.getCount() == 0) {
            Ext.MessageBox.confirm('请上传文档', '您未上传任何文档，您的立项申请可能会被驳回，是否上传文档？', function(buttonId){
                if (buttonId == 'yes') {
                    return;
                }
                else {
                    this.panel.panel._payPlanItemManangePanel.setProject(this._project);
                    Srims.expertGuide.next(this);
                }
                
            }, this);
        }
        else {
            this.panel.panel._payPlanItemManangePanel.setProject(this._project);
            Srims.expertGuide.next(this);
        }
    }
    
};
Ext.extend(Srims.projects.ExpertGuideProjectDocumentGridPanel, Srims.component.GridPanel, {});
