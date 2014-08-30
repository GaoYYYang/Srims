
if (!Srims.experts) 
    Ext.namespace('Srims.experts');


Srims.experts.patent = undefined;
Srims.experts.showPatent = function(){
    Ext.Ajax.request({
        url: Srims.service.patents.PatentService + '/GetById',
        params: {
            patentId: Srims.experts.patent.get('id')
        },
        success: function(response){
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.patents.PatentXmlReader()
            });
            var patent = store.getAt(0);
            Srims.patents.showPatent(patent);
        }
    })
    Srims.patents.showPatent(Srims.experts.patent);
}
Srims.experts.ExpertShowPanel_Patents = function(expert){
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有专利'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_Patents_ColumnModel();
    this._store = new Srims.experts.ExpertPatentStore(Srims.service.experts.ExpertService + '/GetExpertPatents', {
        expertId: expert.get('id')
    });
    Srims.experts.ExpertShowPanel_Patents.superclass.constructor.call(this, {
        id: 'ExpertPatentsS' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        sm: this._selections,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: '专利',
        region: 'center',
        closable: true,
        loadMask: true,
        autoHeight: true,
        colModel: this._columnModel,
        view: this._view
    })
    this._store.load();
    this.on('celldblclick', onCellDblClick);
    
    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e){
        var patent = grid.getStore().getAt(rowIndex);
        if (!patent.get('canShowPatent')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该专利的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.patent = patent;
        Srims.Load.loadPatentModule('Srims.experts.showPatent();');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_Patents, Ext.grid.GridPanel);
