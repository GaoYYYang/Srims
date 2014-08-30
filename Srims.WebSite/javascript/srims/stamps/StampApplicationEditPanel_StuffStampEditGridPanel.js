
if (!Srims.stamp) 
    Ext.namespace('Srims.stamp');

Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel = function(stuff){

        this._selections = new Ext.grid.CheckboxSelectionModel({
        singleSelect: false,
        checkOnly: true,
        handleMouseDown: Ext.emptyFn
    });
    this._selections.grid = this;
    this._columnModel = new Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel_ColumnModel(this._selections);
    
    var url = Srims.service.stamp.StampService + '/Search';
    var params = {};
    params.stuffID = stuff.isNew() ? 0 : stuff.get('id');
    this._store = new Srims.stamp.StampStore(params, url);
    this._store.grid = this;
    this._store.stuff = stuff;
    
    //初始化已选择的章
    this._store.on('load', function(){
    
        if (this.stuff.stampStore != undefined) {
            for (var j = 0; j < this.getCount(); j++) {
                var stamp = this.getAt(j);
                for (var k = 0; k < this.stuff.stampStore.getCount(); k++) {
                    if (stamp.get('id') == this.stuff.stampStore.getAt(k).get('id')) {
                        stamp.set('number', this.stuff.stampStore.getAt(k).get('number'));
                        stamp.set('pagination', this.stuff.stampStore.getAt(k).get('pagination'));
                        break;
                    }
                }
            }
        }
        var selectedRows = new Array();
        for (var i = 0; i < this.getCount(); i++) {
            var stamp = this.getAt(i);
            if (stamp.get('number') != '' &&stamp.get('pagination') != '') {
                selectedRows[selectedRows.length] = i;
            }
        }
        this.grid._selections.selectRows(selectedRows);
    })
    this._store.load();
    
    Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel.superclass.constructor.call(this, {
        store: this._store,
        cm: this._columnModel,
        autoHeight: true,
        width: 500,
        deferredRender: true,
        sm: this._selections,
        clicksToEdit: 1,
        autoExpand: true,
        autoExpandColumn: 'number',
        loadMask: true,
        stateful: false,
        region: 'center',
        autoScroll: true,
        viewConfig: {
            autoFill: true,
            forceFit: true
        }
    });
    //取得store
    this.getStore = function(){
        return this._store;
    }
    //是否是新建的材料
    this.isNewStuff = function(){
        return stuff.isNew() && stuff.stampStore == undefined;
    }
    //判断是否有章的数量为空
    this.validEditor = function(){
        var result = true;
        for (var i = 0; i < this._selections.getSelections().length; i++) {
            var stamp = this._selections.getSelections()[i];
            if (stamp.get('number') == '') {
                result = false;
                break;
            }
        }
        return result;
    }
     //判断是否有章的盖章页为空
    this.validEditorPagination = function(){
        var result = true;
        for (var i = 0; i < this._selections.getSelections().length; i++) {
            var stamp = this._selections.getSelections()[i];
            if (stamp.get('pagination') == '') {
                result = false;
                break;
            }
        }
        return result;
    }
    
    this._rowSelect = function(selection, rowIndex, stamp){
        selection.grid._columnModel.setEditable(3, true);
    }
    this._selections.on('rowselect', this._rowSelect);
    this._rowdeSelect = function(selection, rowIndex, stamp){
        stamp.set('number', '');
        stamp.set('pagination', '');
        selection.grid._columnModel.setEditable(3, false);
    }
    this._selections.on('rowdeselect', this._rowdeSelect);
    
    }
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffStampEditGridPanel, Ext.grid.EditorGridPanel, {});
