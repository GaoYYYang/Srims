
if (!Srims.experts)
    Ext.namespace('Srims.experts');

Srims.experts.LiberalArtspaper = undefined;
Srims.experts.showLiberalArtsPaper = function() {
    Ext.Ajax.request({
    url: Srims.service.papers.LiberalArtsPaperService + '/GetByPaperId',
        params: {
        paperId: Srims.experts.LiberalArtspaper.get('id')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.papers.LiberalArtsPaperXmlReader()
            });
            var paper = store.getAt(0);
            Srims.papers.showLiberalArtsPaper(paper);
        }
    });
}
Srims.experts.ExpertShowPanel_LiberalArtsPapers = function(expert) {
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有发表论文'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_LiberalArtsPapers_ColumnModel();
    this._store = new Srims.experts.ExpertLiberalArtsPaperStore(Srims.service.experts.ExpertService + '/GetExpertLiberalArtsPapers', {
        expertId: expert.get('id')
    });
    Srims.experts.ExpertShowPanel_LiberalArtsPapers.superclass.constructor.call(this, {
        id: 'ExpertLiberalArtsPapers' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: '文科论文',
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
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var paper = grid.getStore().getAt(rowIndex);
        if (!paper.get('canShow')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '您没有查看该论文的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.LiberalArtspaper = paper;

        //Srims.papers.showLiberalArtsPaper(paper);
        Srims.Load.loadPaperModule('Srims.experts.showLiberalArtsPaper(Srims.experts.LiberalArtspaper);');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_LiberalArtsPapers, Ext.grid.GridPanel);
