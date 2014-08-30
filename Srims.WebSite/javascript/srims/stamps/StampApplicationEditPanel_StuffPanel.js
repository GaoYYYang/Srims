
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel_StuffPanel = function(stampApplication, stampApplicationStore){

    var stuffStore = new Srims.stamp.StuffStore(stampApplication.get('id'));
    //?
    stuffStore.on('load', function(){
        for (var i = 0; i < this.getCount(); i++) {
            var stuff = this.getAt(i);
            stuff.stuffStamps = new Array();
            
            var stuffStampStore = new Srims.stamp.StuffStampStore(stuff.get('id'));
            stuffStampStore.stuff = stuff;
            
            stuffStampStore.on('load', function(){
                var stuff = this.stuff;
                for (var j = 0; j < this.getCount(); j++) {
                    var stuffStamp = this.getAt(j);
                    var newStuffStamp = new Srims.stamp.StuffStamp({});
                    newStuffStamp.set('stampID', stuffStamp.get('stampID'));
                    newStuffStamp.set('number', stuffStamp.get('number'));
                    newStuffStamp.set('pagination', stuffStamp.get('pagination'));
                    stuff.stuffStamps[stuff.stuffStamps.length] = newStuffStamp;
                }
            });
            stuffStampStore.load();
        }
    });
    stuffStore.load();
    
    this._stuffGridPanel = new Srims.stamp.StampApplicationEditPanel_StuffGridForm(stampApplication, stampApplicationStore, stuffStore, true);
    
    Srims.stamp.StampApplicationEditPanel_StuffPanel.superclass.constructor.call(this, {
        title: '',
        autoHeight: true,
        //Height: 900,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        layout: 'form',
        items: [this._stuffGridPanel]
    });
    
    this.next = function(){
        if (this._stuffGridPanel._stuffGridPanel.getStuffStore().getCount() == 0) {
            Ext.Msg.show({
                title: '文印材料不能为空',
                msg: '请添加文印材料',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
            return;
        }
        this.panel.panel._panelShow._stuffGridPanel._stuffGridPanel._store.removeAll();
        this.panel.panel._panelShow._stuffGridPanel._stuffGridPanel._store.add(this._stuffGridPanel._stuffGridPanel.getStuffStore().getRange());
        Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_StuffPanel, Ext.Panel, {});
