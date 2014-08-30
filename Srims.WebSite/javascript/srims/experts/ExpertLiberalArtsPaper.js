
if (!Srims.data) 
    Ext.namespace('Srims.data');
if (!Srims.experts) 
    Ext.namespace('Srims.experts');

Srims.experts.ExpertLiberalArtsPaper = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'type',
    type: 'string',
    mapping: 'Type'
}, {
    name: 'publishYear',
    type: 'int',
    mapping: 'PublishYear'
}, {
    name: 'publishDate',
    type: 'string',
    mapping: 'PublishDate'
}, {
    name: 'documentNumber',
    type: 'string',
    mapping: 'DocumentNumber'
}, {
    name: 'subAirer',
    type: 'int',
    mapping: 'SubAirer'
}, {
    name: 'authorKeyWord',
    type: 'string',
    mapping: 'AuthorKeyWord'
}, {
    name: 'keyWord',
    type: 'string',
    mapping: 'KeyWord'
}, {
    name: 'abstract',
    type: 'string',
    mapping: 'Abstract'
}, {
    name: 'linkManAddress',
    type: 'string',
    mapping: 'LinkManAddress'
}, {
    name: 'linkManEmail',
    type: 'string',
    mapping: 'LinkManEmail'
}, {
    name: 'linkManSignUnit',
    type: 'string',
    mapping: 'LinkManSignUnit'
}, {
    name: 'firstAuthorSignUnit',
    type: 'string',
    mapping: 'FirstAuthorSignUnit'
}, {
    name: 'signOrder',
    type: 'int',
    mapping: 'SignOrder'
}, {
    name: 'remark',
    type: 'string',
    mapping: 'Remark'
}, {
    name: 'magazineID',
    type: 'int',
    mapping: 'MagazineID'
}, {
    name: 'fullName',
    type: 'string',
    mapping: 'FullName'
}, {
    name: 'issn',
    type: 'string',
    mapping: 'ISSN'
}, {
    name: 'subjectRank',
    type: 'string',
    mapping: 'SubjectRank'
}, {
    name: 'subjectClass',
    type: 'string',
    mapping: 'SubjectClass'
}, {
    name: 'publishType',
    type: 'string',
    mapping: 'PublishType'
}, {
    name: 'language',
    type: 'string',
    mapping: 'Language'
}, {
    name: 'firstAuthorID',
    type: 'int',
    mapping: 'FirstAuthorID'
}, {
    name: 'firstAuthorName',
    type: 'string',
    mapping: 'FirstAuthorName'
}, {
    name: 'authors',
    type: 'string',
    mapping: 'Authors'
}, {
    name: 'indexed',
    type: 'string',
    mapping: 'Indexed'
}, {
    name: 'indexedString',
    type: 'string',
    mapping: 'IndexedString'
}, {
    name: 'resourceName',
    type: 'string',
    mapping: 'ResourceName'
}, {
    name: 'hasPermission_Show',
    type: 'boolean',
    mapping: 'HasPermission_Show',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_Edit',
    type: 'boolean',
    mapping: 'HasPermission_Edit',
    convert: Boolean.toBoolean
}, {
    name: 'hasPermission_EditPaperAuhtor',
    type: 'boolean',
    mapping: 'HasPermission_EditPaperAuhtor',
    convert: Boolean.toBoolean
}, {
    name: 'canEdit',
    type: 'boolean',
    mapping: 'CanEdit',
    convert: Boolean.toBoolean
}, {
    name: 'canEditPaperAuthor',
    type: 'boolean',
    mapping: 'CanEditPaperAuthor',
    convert: Boolean.toBoolean
}, {
    name: 'canShow',
    type: 'boolean',
    mapping: 'CanShow',
    convert: Boolean.toBoolean
}, {
    name: 'publishDateYear',
    type: 'int',
    mapping: 'PublishDateYear'
},
{
    name: 'serialNumbe',
    type: 'string',
    mapping: 'SerialNumbe'
},
{
    name: 'resultsName',
    type: 'string',
    mapping: 'ResultsName'
},
{
    name: 'englishName',
    type: 'string',
    mapping: 'EnglishName'
},

{
    name: 'resultsType',
    type: 'string',
    mapping: 'ResultsType'
},
{
    name: 'resultsForm',
    type: 'string',
    mapping: 'ResultsForm'
},
{
    name: 'fund',
    type: 'string',
    mapping: 'Fund'
},
{
    name: 'publisher',
    type: 'string',
    mapping: 'Publisher'
},
{
    name: 'firstOrganization',
    type: 'string',
    mapping: 'FirstOrganization'
},
{
    name: 'ourSchoolSignRank',
    type: 'int',
    mapping: 'OurSchoolSignRank'
},
{
    name: 'organizationName',
    type: 'string',
    mapping: 'OrganizationName'
},
{
    name: 'region',
    type: 'string',
    mapping: 'Region'
},

{
    name: 'collegeID',
    type: 'int',
    mapping: 'CollegeID'
},
{
    name: 'collegeName',
    type: 'string',
    mapping: 'CollegeName'
},
{
    name: 'coden',
    type: 'string',
    mapping: 'CODEN'
},
{
    name: 'issuesDate',
    type: 'string',
    mapping: 'IssuesDate'
},
{
    name: 'mark',
    type: 'string',
    mapping: 'Mark'
},
{
    name: 'degreeType',
    type: 'string',
    mapping: 'DegreeType'
},
{
    name: 'fundType',
    type: 'string',
    mapping: 'FundType'
},
{
    name: 'references',
    type: 'string',
    mapping: 'References'
},
{
    name: 'citeTime',
    type: 'int',
    mapping: 'CiteTime'
}]);
Srims.data.Entity.apply(Srims.experts.ExpertLiberalArtsPaper);
