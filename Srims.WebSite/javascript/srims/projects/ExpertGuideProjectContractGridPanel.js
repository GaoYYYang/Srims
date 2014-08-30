
if (!Srims.projects) 
    Ext.namespace('Srims.projects');

Srims.projects.ExpertGuideProjectContractGridPanel = function(isHorizontal){

    this._project = new Srims.projects.Project({});
    
    var load_url = Srims.service.documents.ContractService + '/GetByProjectID';
    var params = {
        projectId: 0
    };
    this._store = new Srims.documents.ContractStore(load_url, params);
    this._columnModel = new Srims.documents.ContractGridPanel_ColumnModel(isHorizontal);
    
    this._selections = new Ext.grid.RowSelectionModel();
    this._toolBar = new Srims.projects.ExpertGuideProjectContractGridPanel_ToolBar(this);
    
    var params = {};
    params.sm = this._selections;
    params.store = this._store;
    params.colModel = this._columnModel;
    params.tbar = this._toolBar;
    params.height = 220;
    params.width = 600;
    
    Srims.projects.ExpertGuideProjectContractGridPanel.superclass.constructor.call(this, params);
    
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var contract = grid.getStore().getAt(rowIndex);
        Srims.projects.downLoadContract(contract);
    };
    this.on('celldblclick', onCellDblClick);
    
    this.setProject = function(project){
        this._project = project;
        
        this._store.params.projectId = this._project.get('id');
        this._store.project = project;
        this._store.toolBar = this._toolBar;
        this._store.on('load', function(){
            this.toolBar.setProject(project);
        });
        this._store.load();
    }
    
    this.next = function(){
        if (this._store.getCount() == 0) {
            Ext.MessageBox.confirm('请上传合同', '您未上传任何合同，您的立项申请可能会被驳回，是否上传合同？', function(buttonId){
                if (buttonId == 'yes') {
                    return;
                }
                else {
                    this.panel.panel._documentManagePanel.setProject(this._project);
                    Srims.expertGuide.next(this);
                }
                
            }, this);
        }
        else {
            this.panel.panel._documentManagePanel.setProject(this._project);
            Srims.expertGuide.next(this);
        }
    }
};
Ext.extend(Srims.projects.ExpertGuideProjectContractGridPanel, Srims.component.GridPanel, {});
