Srims.AnnouncementIndexRender = function(){
};
Srims.AnnouncementIndexRender.render = function(container){
    var store = new Srims.common.AnnouncementStore(Srims.service.common.AnnouncementService + '/GetAvailable');
    store.container = container;
    store.load({
        callback: Srims.AnnouncementIndexRender._onGetAvailableLoad
    });
}
Srims.AnnouncementIndexRender._onGetAvailableLoad = function(){
    Srims.AnnouncementIndexRender._availableAnnouncementStore = this;
	
    var divAnnouncementContent = document.createElement('div');
    divAnnouncementContent.id = 'DivAnnouncementContent';
    divAnnouncementContent.onmouseover = Srims.AnnouncementIndexRender._ScrollUpTask_stop;
    divAnnouncementContent.onmouseout = Srims.AnnouncementIndexRender._ScrollUpTask_start;
    
    var divAnnouncement = document.createElement('div');
    divAnnouncement.id = 'DivAnnouncement';
    divAnnouncement.appendChild(divAnnouncementContent);
    
    this.each(function(r){
        var div = document.createElement('div');
        div.className = 'announcement';
        
        var a = document.createElement('a');
        if (r.get('state') == 'Top') 
            a.className = 'announcement top';
        
        a.announcementId = r.id;
        a.innerHTML = r.get('title');
        a.id = 'announcement_' + r.get('id');
        a.href = '#';
        a.onclick = Srims.AnnouncementIndexRender._onAnnouncementClick;
        
        div.appendChild(a);
        this.appendChild(div);
    }, divAnnouncementContent);
    
    this.container.appendChild(divAnnouncement);
    
    Srims.AnnouncementIndexRender._scrollUpTask_switch_t = setTimeout("Srims.AnnouncementIndexRender._ScrollUpTask_start();", 1000);
}
Srims.AnnouncementIndexRender._onAnnouncementClick = function(){
    Srims.AnnouncementIndexRender._ScrollUpTask_stop();
    
    var store = Srims.AnnouncementIndexRender._availableAnnouncementStore;
    var record = store.getById(this.announcementId);
    
    Ext.Msg.show({
        title: record.get('title'),
        msg: record.get('content').replace(/\n/g, '<br />') + '<br /><br /><div style="width: 100%; text-align: right">中国海洋大学 科技处<br />' + record.get('dateTime').format('Y-m-d') + '&nbsp;&nbsp;&nbsp;</div>',
        buttons: Ext.Msg.OK,
        fn: Srims.AnnouncementIndexRender._ScrollUpTask_start,
        animEl: this.id,
        width: 400
    });
};
Srims.AnnouncementIndexRender._scrollUp = function(){
    if (Ext.get('DivAnnouncement') == undefined) {
        Ext.TaskMgr.stop(Srims.AnnouncementIndexRender._scrollUpTask);
        return;
    }
    
    if (Ext.get('DivAnnouncement').dom.scrollTop < 18) {
        Ext.get('DivAnnouncement').dom.scrollTop++;
    }
    else {
        Ext.TaskMgr.stop(Srims.AnnouncementIndexRender._scrollUpTask);
        var item = Ext.get('DivAnnouncementContent').down('div');
        Ext.get('DivAnnouncementContent').appendChild(item);
        Ext.get('DivAnnouncement').dom.scrollTop = 0;
        if (Srims.AnnouncementIndexRender._scrollUpTask_switch) 
            Srims.AnnouncementIndexRender._scrollUpTask_switch_t = setTimeout("Srims.AnnouncementIndexRender._ScrollUpTask_start();", 3000);
    }
}
Srims.AnnouncementIndexRender._scrollUpTask_switch = true;
Srims.AnnouncementIndexRender._scrollUpTask_switch_t = null;
Srims.AnnouncementIndexRender._scrollUpTask = {
    run: function(){
        Srims.AnnouncementIndexRender._scrollUp();
    },
    interval: 20
}

Srims.AnnouncementIndexRender._ScrollUpTask_start = function(){
    Srims.AnnouncementIndexRender._scrollUpTask_switch = true;
    Ext.TaskMgr.start(Srims.AnnouncementIndexRender._scrollUpTask);
}
Srims.AnnouncementIndexRender._ScrollUpTask_stop = function(){
    Ext.TaskMgr.stop(Srims.AnnouncementIndexRender._scrollUpTask);
    Srims.AnnouncementIndexRender._scrollUpTask_switch = false;
    if (Srims.AnnouncementIndexRender._scrollUpTask_switch_t) 
        clearTimeout(Srims.AnnouncementIndexRender._scrollUpTask_switch_t);
};

