/**
* @author dulintao
*/
if (!Srims.common)
    Ext.namespace('Srims.common');

Srims.common.OutsourcingUnitPanel_ColumnModel = function() {
    Srims.common.OutsourcingUnitPanel_ColumnModel.superclass.constructor.call(this,
			[{
			    header: 'id',
			    hidden: true,
			    hideable: false
			}, {
			    header: '外协单位名称',
			    dataIndex: 'name',
			    width: 40,
			    sortable: true,
			    hidden: false
			}, {
			    header: '代表人姓名',
			    dataIndex: 'legalRepresentativeName',
			    width: 40,
			    sortable: false,
			    hidden: false
			}, {
			    header: '注册资本',
			    dataIndex: 'registeredCapital',
			    width: 40,
			    sortable: true,
			    hidden: false
			}, {
			    header: '注册号',
			    dataIndex: 'registeredCardNumber',
			    width: 40,
			    sortable: false,
			    hidden: false
			}, {
			    header: '组织代码',
			    dataIndex: 'organizationCode',
			    width: 40,
			    sortable: false,
			    hidden: false
			}, {
			    header: '税号',
			    dataIndex: 'taxNumber',
			    width: 40,
			    sortable: false,
			    hidden: false
			},
			 {
			     header: '公司类型',
			     dataIndex: 'companyType',
			     width: 40,
			     sortable: false,
			     hidden: false
			 },
			 {
			     header: '管理类别',
			     dataIndex: 'managementType',
			     width: 40,
			     sortable: false,
			     hidden: false
			 },
			  {
			      header: '营业开始时间',
			      dataIndex: 'dealDateTimeStart',
			      width: 40,
			      sortable: false,
			      hidden: false
			  }, {
			      header: '营业结束时间',
			      dataIndex: 'dealDateTimeEnd',
			      width: 40,
			      sortable: false,
			      hidden: false
			  }, {
			      header: '成立时间',
			      dataIndex: 'createDateTime',
			      width: 40,
			      sortable: true,
			      hidden: false
			  },
			  {
			      header: '备注',
			      dataIndex: 'Remark',
			      width: 40,
			      sortable: false,
			      hidden: false
}]);
}
Ext.extend(Srims.common.OutsourcingUnitPanel_ColumnModel, Ext.grid.ColumnModel);