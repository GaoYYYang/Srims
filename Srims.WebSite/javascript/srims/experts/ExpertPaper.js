
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertPaper = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'magazineShortName',
    type: 'string',
    mapping: 'MagazineShortName'
}, {
    name: 'publishDateYear',
    type: 'int',
    mapping: 'PublishDateYear'
}, {
    name: 'influenceFactor',
    type: 'int',
    mapping: 'InfluenceFactor'
}, {
    name: 'paperIndexeds',
    type: 'string',
    mapping: 'PaperIndexeds'
}, {
    name: 'authorLink',
    type: 'string',
    mapping: 'AuthorLink'
}, {
    name: 'firstAuthor',
    type: 'string',
    mapping: 'FirstAuthor'
}, {
    name: 'order',
    type: 'int',
    mapping: 'Order'
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.experts.ExpertPaper);
