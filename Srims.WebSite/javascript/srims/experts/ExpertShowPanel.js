
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertShowPanel = function(panelId, expert, listStore){
    this._id = panelId;
    this._expert = expert;
    this._listStore = listStore;
    
    this._basicInformation = new Srims.experts.ExpertShowPanel_Basic(expert);
    this._expertParticipantProjects = new Srims.experts.ExpertShowPanel_ParticipantProjects(expert);
    this._expertChargeProjects = new Srims.experts.ExpertShowPanel_ChargeProjects(expert);
    this._expertPapers = new Srims.experts.ExpertShowPanel_Papers(expert);
    this._expertLiberalArtsPapers = new Srims.experts.ExpertShowPanel_LiberalArtsPapers(expert);
    this._expertPatents = new Srims.experts.ExpertShowPanel_Patents(expert);
    this._expertAwards = new Srims.experts.ExpertShowPanel_Awards(expert);
    this._toolbar = new Srims.experts.ExpertShowPanel_ToolBar(expert, this);
    this._message = new Srims.experts.ExpertEditPanel_MessagePanel();
    Srims.experts.ExpertShowPanel.superclass.constructor.call(this, ({
        id: this._id,
        iconCls: 'icon-show',
        closable: true,
        collapsible: true,
        title: expert.get('name'),
        frame: true,
        layout: 'form',
        labelWidth: 80,
        buttonAlign: 'center',
        style: 'padding:5px; width:1200px',
        defaultType: 'textfield',
        titleCollapse: true,
        tbar: this._toolbar,
        items: [this._message, this._basicInformation, this._expertChargeProjects, this._expertParticipantProjects, this._expertAwards, this._expertPapers, this._expertLiberalArtsPapers, this._expertPatents]
    }))
    
    this.resetComponentValue = function(expert){
        this._basicInformation.resetComponentValue(expert);
    }
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var expert = grid.getStore().getAt(rowIndex);
        Srims.experts.ExpertAction.showExpert(expert);
    };
    
    
    this.getUserEditPower = function(expert, panel){
        if (expert.get('hasPermission_EditExpert') && expert.get('canEditExpert')) 
            Srims.experts.ExpertAction.expertEdit(expert, panel, panel._basicInformation.administratorEditItems, panel._basicInformation.administratorCanNotEditItems);
        
        else 
            if (expert.get('hasPermission_EditExpertLinkWay') && expert.get('canEditExpertLinkWay')) 
                Srims.experts.ExpertAction.expertLinkWayEdit(expert, panel, panel._basicInformation.linkWayEditItems, panel._basicInformation.linkWayAdministratorCanNotEditItems);
            else 
                Srims.experts.ExpertAction.expertSelfEdit(expert, panel, panel._basicInformation.expertSelfEditItems, panel._basicInformation.expertSelfCanNotEditItems);
    }
    
}
Ext.extend(Srims.experts.ExpertShowPanel, Ext.Panel, {});
