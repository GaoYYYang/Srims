
if (!Srims.papers) 
    Ext.namespace("Srims.papers");

Srims.papers.MagazineInformation = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'year',
    type: 'int',
    mapping: 'Year'
}, {
    name: 'influenceFactor',
    type: 'int',
    mapping: 'InfluenceFactor'
}, {
    name: 'citeFrequency',
    type: 'int',
    mapping: 'CiteFrequency'
}, {
    name: 'subAirer',
    type: 'int',
    mapping: 'SubAirer'
}, {
    name: 'instantExponent',
    type: 'int',
    mapping: 'InstantExponent'
}, {
    name: 'paperCount',
    type: 'int',
    mapping: 'PaperCount'
}, {
    name: 'citeHalfLife',
    type: 'string',
    mapping: 'CiteHalfLife'
}])

Srims.data.Entity.apply(Srims.papers.MagazineInformation);
