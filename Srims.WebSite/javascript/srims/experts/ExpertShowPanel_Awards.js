
if (!Srims.experts)
    Ext.namespace('Srims.experts');

//用于显示专家信息中的奖励
Srims.experts.award = undefined;
Srims.experts.showAward = function() {
    Ext.Ajax.request({
        url: Srims.service.awards.AwardService + '/GetById',
        params: {
            awardId: Srims.experts.award.get('id')
        },
        success: function(response) {
            var store = new Ext.data.Store({
                data: response.responseXML,
                reader: new Srims.awards.AwardXmlReader()
            });
            var award = store.getAt(0);
            Srims.awards.showAward(award);
        }
    });
}
Srims.experts.ExpertShowPanel_Awards = function(expert) {
    this._view = new Ext.grid.GridView({
        forceFit: true,
        ignoreAdd: true,
        emptyText: '该专家暂时没有奖励'
    });
    this._selections = new Ext.grid.RowSelectionModel();
    this._columnModel = new Srims.experts.ExpertShowPanel_Awards_ColumnModel();
    this._store = new Srims.experts.ExpertAwardStore(Srims.service.experts.ExpertService + '/GetExpertAwards', {
        expertId: expert.get('id')
    });

    Srims.experts.ExpertShowPanel_Awards.superclass.constructor.call(this, {
        id: 'ExpertAwards' + expert.get('id'),
        stateful: true,
        collapsible: true,
        titleCollapse: true,
        sm: this._selections,
        store: this._store,
        enableColumnHide: true,
        enableColumnMove: true,
        border: false,
        title: '奖励',
        autoHeight: true,
        region: 'center',
        closable: true,
        loadMask: true,
        colModel: this._columnModel,
        view: this._view
    });

    this._store.load();
    this.on('celldblclick', onCellDblClick);

    //private methods
    function onCellDblClick(grid, rowIndex, columnIndex, e) {
        var award = grid.getStore().getAt(rowIndex);
        if (!award.get('canShowAward')) {
            Ext.Msg.show({
                title: '无查看权限',
                msg: '该用户名没有查看该奖励的权限！',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.WARNING
            });
            return;
        }
        Srims.experts.award = award;
        Srims.Load.loadAwardModule('Srims.experts.showAward();');
    }
}
Ext.extend(Srims.experts.ExpertShowPanel_Awards, Ext.grid.GridPanel);
