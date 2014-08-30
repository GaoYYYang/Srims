
if (!Srims.stamp) 
    Ext.namespace("Srims.stamp");

Srims.stamp.StampApplicationEditPanel_ShowPanel = function(stampApplication, stampApplicationStore){

    var stuffStore = new Srims.stamp.StuffStore(stampApplication.get('id'));
    var isNew = stampApplication.isNew();
    this._basicPanel = new Srims.stamp.StampApplicationShowPanel_BasicForm(stampApplication);
    this._stuffGridPanel = new Srims.stamp.StampApplicationEditPanel_StuffGridForm(stampApplication, stampApplicationStore, stuffStore, false);
    
    Srims.stamp.StampApplicationEditPanel_ShowPanel.superclass.constructor.call(this, {
        title: '',
        // Height: 900,
        autoHeight: true,
        bodyStyle: 'padding:5px 5px 0',
        style: 'margin-bottom: 2px',
        titleCollapse: true,
        layout: 'form',
        items: [this._basicPanel, this._stuffGridPanel]
    });
    
    //保存材料章型
    this._SaveStuffStamp = function(stuffStamp){
        Ext.Ajax.request({
            url: Srims.service.stamp.StuffStampService + '/Save',
            params: stuffStamp.data
        });
    }
    //保存材料
    this._SaveStuff = function(stuff){
        stuff._SaveStuffStamp = this._SaveStuffStamp;
        Ext.Ajax.request({
            url: Srims.service.stamp.StuffService + '/Save',
            params: stuff.data,
            scope: stuff,
            success: function(response){
                if (stampApplicationStore) 
                    stampApplicationStore.load();
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.stamp.StuffXmlReader()
                });
                var newStuff = newstore.getAt(0);
                var sutffStampStore = this.stuffStamps;
                for (var i = 0; i < sutffStampStore.length; i++) {
                    sutffStampStore[i].set('stuffID', newStuff.get('id'));
                    this._SaveStuffStamp(sutffStampStore[i]);
                }
            }
        });
    }
    
    //保存基本信息
    this._save = function(stampApplication){
        Ext.Ajax.request({
            url: Srims.service.stamp.StampApplicationService + '/Save',
            params: stampApplication.data,
            scope: this,
            success: function(response){
            
                var newstore = new Ext.data.Store({
                    data: response.responseXML,
                    reader: new Srims.stamp.StampApplicationXmlReader()
                });
                var newStampApplication = newstore.getAt(0);
                
                var sutffStore = this.panel.panel._panelStuff._stuffGridPanel._stuffGridPanel.getStuffs();
                for (var i = 0; i < sutffStore.length; i++) {
                    var record = sutffStore[i].copy();
                    record.set('stampApplicationID', newStampApplication.get('id'));
                    record.stuffStamps = sutffStore[i].stuffStamps;
                    this._SaveStuff(record);
                }
            }
        });
    }
    this.next = function(){
    
        this._save(this.panel.panel._panelBasic._stampApplication);
        if (isNew == false) 
            Srims.WorkSpace.getWorkSpace().remove(this.panel.panel);
        else 
            Srims.expertGuide.next(this);
    }
}
Ext.extend(Srims.stamp.StampApplicationEditPanel_ShowPanel, Ext.Panel, {});
