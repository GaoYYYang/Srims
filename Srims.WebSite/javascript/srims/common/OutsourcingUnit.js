/**
* @author dulintao
*/
if (!Srims.data)
    Ext.namespace('Srims.data');
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingUnit = Ext.data.Record.create([{
    name: 'id',
    type: 'int',
    mapping: 'ID'
}, {
    name: 'name',
    type: 'date',
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
      type: 'string',
      mapping: 'CreateDateTime'
  },
  {
      name: 'dealDateTimeStart',
      type: 'string',
      mapping: 'DealDateTimeStart'
  },
   {
       name: 'dealDateTimeEnd',
       type: 'string',
       mapping: 'DealDateTimeEnd'
   },
  {
      name: 'remark',
      type: 'string',
      mapping: 'Remark'
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
      name: 'canDelete',
      type: 'boolean',
      mapping: 'CanDelete',
      convert: Boolean.toBoolean
}]);
Srims.data.Entity.apply(Srims.common.OutsourcingUnit);