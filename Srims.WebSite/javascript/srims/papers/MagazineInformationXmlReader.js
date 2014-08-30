
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineInformationXmlReader = Ext.extend(Srims.data.XmlReader, {
    constructor: function(){
        Srims.papers.MagazineInformationXmlReader.superclass.constructor.call(this, Srims.papers.MagazineInformation);
    }
});

