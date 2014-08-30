/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.Outsourcing = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'string',
    mapping: 'Name'
}, {
    name: 'legalRepresentativeName',
    type: 'string',
    mapping: 'LegalRepresentativeName'
}, {
    name: 'registeredCapital',
    type: 'string',
    mapping: 'RegisteredCapital'
}, {
    name: 'registeredCardNumber',
    type: 'string',
    mapping: 'RegisteredCardNumber'
}, {
    name: 'organizationCode',
    type: 'string',
    mapping: 'OrganizationCode'
}, {
    name: 'taxNumber',
    type: 'string',
    mapping: 'TaxNumber'
}, {
    name: 'companyType',
    type: 'string',
    mapping: 'CompanyType'
},
 {
     name: 'managementType',
     type: 'string',
     mapping: 'ManagementType'
 },
  {
      name: 'businessScope',
      type: 'string',
      mapping: 'BusinessScope'
  },
  {
      name: 'createDateTime',
      type: 'date',
      mapping: 'CreateDateTime'
  },
  {
      name: 'dealDateTimeStart',
      type: 'date',
      mapping: 'DealDateTimeStart'
  },
   {
       name: 'dealDateTimeEnd',
       type: 'date',
       mapping: 'DealDateTimeEnd'
   },
  {
      name: 'remark',
      type: 'string',
      mapping: 'Remark'
  }, {
      name: 'isVerify',
      type: 'string',
      mapping: 'IsVerify'
  }, {
      name: 'hasPermission_Edit',
      type: 'boolean',
      mapping: 'HasPermission_Edit',
      convert: Boolean.toBoolean
  }, {
      name: 'hasPermission_Delete',
      type: 'boolean',
      mapping: 'HasPermission_Delete',
      convert: Boolean.toBoolean
  }, {
      name: 'canEdit',
      type: 'boolean',
      mapping: 'CanEdit',
      convert: Boolean.toBoolean
  }, {
      name: 'vefiy',
      type: 'string',
      mapping: 'Vefiy'
  }, {
      name: 'currentUserID',
      type: 'string',
      mapping: '  CurrentUserID'
  },
   {
       name: 'userID',
       type: 'string',
       mapping: '  UserID'
   }, {
   name: 'address',
       type: 'string',
       mapping: 'Address'
   },
 {
     name: 'canDelete',
     type: 'boolean',
     mapping: 'CanDelete'
 },
 {
     name: 'taxCard',
     type: 'string',
     mapping: 'TaxCard'
 },
 {
     name: 'companyCard',
     type: 'string',
     mapping: 'CompanyCard'
 },
 {
     name: 'groupCard',
     type: 'string',
     mapping: 'GroupCard'
 },
 {
     name: 'projectNumber',
     type: 'string',
     mapping: 'ProjectNumber'
 },
 {
     name: 'projectName',
     type: 'string',
     mapping: 'ProjectName'
 },
 {
     name: 'projectRank',
     type: 'string',
     mapping: 'ProjectRank'
 },
 {
     name: 'projectType',
     type: 'string',
     mapping: 'ProjectType'
 },
 {
     name: 'projectOutAmount',
     type: 'int',
     mapping: 'ProjectOutAmount'
 },
 {
     name: 'allocatedAmount',
     type: 'int',
     mapping: 'AllocatedAmount'
}]);
Srims.data.Entity.apply(Srims.common.Outsourcing);