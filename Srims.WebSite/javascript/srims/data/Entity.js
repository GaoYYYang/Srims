
if (!Srims.data) 
    Ext.namespace('Srims.data');

Srims.data.Entity = function(){
}
Srims.data.Entity.isNew = function(){
    return this.get('id') == undefined || this.get('id') == 0;
}
Srims.data.Entity.apply = function(subClass){
    subClass.prototype.isNew = Srims.data.Entity.isNew;
}
