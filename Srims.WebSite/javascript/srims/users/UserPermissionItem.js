if (!Srims.users)
	Ext.namespace('Srims.users');

Srims.users.UserPermissionItem = function() {
}
Srims.users.UserPermissionItem.store = [['ManageFund', '经费信息管理'], ['ManageType', '分类信息管理'], ['ManageFinishProject', '结项项目管理'], ['ManagePaper', '论文信息管理'], ['ManagePatent', '专利信息管理'], ['ManageScienceAward', '理科奖励信息管理'],['ManageLiteralAward', '文科奖励信息管理'], ['ManageBase', '基地信息管理'], ['ManageAnnouncement', '通知信息管理'], ['ManageFinance', '财务管理权限'], ['MangageSubjectLevel', '学科管理'], ['Statistic', '统计'], ['ExportFinanceData', '导出财务数据'], ['ExpertShow', '查看专家'], ['ExpertEdit', '编辑专家'], ['ExpertLinkWayEdit', '编辑专家联系方式'], ['ManageStamp', '管理文印'], ['ResetUserPassword', '重置用户密码'], ['StampDepartmentPrincipal', '文印部门负责人']]
Srims.users.UserPermissionItem.render = function(value) {
	switch (value) {
		case 'ManageFund':
			return '管理经费信息';
		case 'ManageType':
			return '管理分类信息';
		case 'ManageFinishProject':
			return '管理结项项目';
		case 'ManagePaper':
			return '管理论文信息';
		case 'ManagePatent':
			return '管理专利信息';
		case 'ManageLiteralAward':
			return '管理文科奖励信息';
		case 'ManageScienceAward':
			return '管理理科奖励信息';
		case 'ManageBase':
			return '管理基地信息';
		case 'ManageAnnouncement':
			return '管理通知信息';
		case 'ManageFinance':
			return '管理财务';
		case 'MangageSubjectLevel':
			return '管理学科';
		case 'Statistic':
			return '统计';
		case 'ExportFinanceData':
			return '导出财务数据';
		case 'ExpertShow':
			return '查看专家';
		case 'ExpertEdit':
			return '编辑专家';
		case 'ExpertLinkWayEdit':
			return '编辑专家联系方式';
		case 'ManageStamp':
			return '管理文印';
		case 'ResetUserPassword':
			return '重置用户密码';
		case 'StampDepartmentPrincipal':
			return '文印部门负责人';
		default:
			return value;
	}
}