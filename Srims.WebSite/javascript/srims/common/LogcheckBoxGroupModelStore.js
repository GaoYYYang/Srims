
if (!Srims.common)
    Ext.namespace("Srims.common");

Srims.common.checkBoxGroupUserModelStore = [['UserNew', '添加新用户'],
['UserEdit', '修改用户信息'],
 ['UserDelete', '删除用户'],

 ['SaveForPermission', '权限保存'],
  ['SaveForCollegeRelatedPermission', '保存用户院系相关授权'],
['SaveForTemporaryAuthorizationPermissions', '保存用户临时授权'],
['DeleteTemporaryAuthorizationPermissions', '取消临时授权'],
['DeleteAllPermissions', '删除用户所有权限'],
 ['CancelUserLockLog', '解除用户登录锁定'],
 ['UserLockLog', '用户登录锁定'],
 ['AdminWorkRemind', '管理员工作提醒']
 ];

Srims.common.checkBoxGroupProjectModelStore = [
['ProjectNew', '新建项目'],
 ['ProjectMemberNew', '添加项目成员'],
['ProjectMemberEdit', '修改项目成员'],
['ProjectMemberDelete', '删除项目成员'],

['ProjectStartSubmit', '提交项目立项申请'],
['ProjectStartCancel', '撤销项目立项申请'],
 ['ProjectStartPass', '通过项目立项申请'],
  ['ProjectStartReject', '驳回项目立项申请'],

['ProjectEndSubmit', '提交项目结项申请'],
['ProjectEndReject', '驳回项目结项申请'],
['ProjectEndCancel', '撤销项目结项申请'],
 ['ProjectEndPass', '通过项目结项申请'],
 ['ProjectDelete', '删除项目'],

 ['ClearProjectAccountBookNumber', '清空项目账本号'],
      ['ProjectEdit', '编辑项目'],
 ['ProjectWithDraw', '撤销项目'],
  ['ProjectTerminate', '终止项目'],
   ['SetDelegatePrincipal', '设置项目委托负责人'],
    ['ClearDelegatePrincipal', '取消项目委托负责人'],
	 ['ProjectEndRemind', '项目结项邮件提醒'],
	 ['CensorVerticalProjectRemind', '审核纵向项目提醒'],
	 ['CensorHorizontalProjectRemind', '审核横向项目提醒'],
	 ['CensorProjectRemaind','审核项目立项提醒']

 ];

Srims.common.checkBoxGroupTextModelStore = [
 ['ProjectContractDelete', '删除项目合同'],
 ['ProjectDocumentSubmit', '提交项目文档'],
 ['CensorPassProjectContract', '审核通过项目合同'],
 ['CensorRejectProjectContract', '审核驳回项目文档'],
 ['ProjectDocumentRequire', '催缴项目文档'],
 ['ProjectDocumentCensorReject', '项目文档审核驳回'],
 ['ProjectDocumentCensorPass', '项目文档审核通过'],
 ['ProjectDocumentDelete', '删除项目文档'],
 ['UpLoadContract', '上传项目合同'],
 ['UpLoadDocumentModel', '上传文档模板'],
 ['DeleteDocumentModel', '删除文档模板'],
  ['RequiredDocumentRecordDelete', '删除催缴文档记录'],
  ['CensorDocumentRemaind', '审核文档提醒'],
  ['CensorContractRemaind','审核合同提醒']
   ];

Srims.common.checkBoxGroupTypeModelStore = [
['ProjectTypeNew', '添加项目类别'],
['ProjectTypeEdit', '修改项目类别'],
['ProjectTypeDelete', '删除项目类别'],

['ProjectSupportCategoryNew', '添加项目资助类别'],
['ProjectSupportCategoryEdit', '修改项目资助类别'],
 ['ProjectSupportCategoryDelete', '删除项目资助类别'],
['ProjectSupportFieldNew', '添加项目资助领域'],
 ['ProjectSupportFieldEdit', '修改项目资助领域'],
 ['ProjectSupportFiedDelete', '删除项目资助领域'],

['ProjectSupportSubFieldNew', '添加项目资助子领域'],
['ProjectSupportSubFieldEdit', '修改项目资助子领域'],
['ProjectSupportSubFieldDelete', '删除项目资助子领域']];



Srims.common.checkBoxGroupFundModelStore = [['FinanceNew', '新经费到帐'], ['FinanceEdit', '编辑经费到帐信息'],
 ['FinanceDelete', '删除经费到帐信息'], ['FundDescend', '经费下拨'], ['FinanceDescendDelete', '删除经费下拨'],
  ['FundAllocationSubmit', '提交经费分配'],
 ['FundAllocationCensorPass', '经费分配审核通过'],
 ['FundAllocationCensorReject', '经费分配审核驳回'], ['FundAllocationCancel', '经费分配作废'],
  ['VoucherPrint', '凭单打印'],
 ['VoucherSetPrint', '凭单打印计数器归零'],
   ['FinanceInvoiceNew', '新建项目经费的发票'],
 ['FinanceInvoiceDelete', '删除项目经费的发票'],

   ['fundDescendLent', '凭单打印'],
 ['FinanceDescendCensorPass', '经费下拨审核通过'],
   ['FinanceDescendCensorReject', '经费下拨审核驳回'],
 ['FundAllocationUndoSubmit', '经费分配撤销'],

  ['PayPlanNew', '新建经费到账计划'],
   ['PayPlanEdit', '编辑经费到账计划'],
 ['PayPlanDelete', '删除经费到账计划'],

    ['VoucherAllocate', '财务分配'],
 ['VoucherNew', '新建凭单'],
   ['VoucherEdit', '编辑凭单'],
 ['VoucherDelete', '删除凭单'],
  ['SetAccountBookNumber', '修改凭单账本号'],
   ['FinanceFundDescend', '归还欠款'],
 ['FinanceFundDescendDelete', '删除还款记录'],
   ['VoucherSignIn', '凭单状态设置为签收'],
   ['VoucherReturn', '凭单状态设置为退回'],
 ['VoucherCancelAllocate', '凭单状态设置为取消分配'],
  ['ClearExpertAccountNumber', '清空专家账本号'],

 ['FundAutoImport', '经费信息自动导入'],
 ['VoucherPrintRemind', '凭单打印提醒'],
 ['FundAllocationRemind', '经费分配提醒'],
 ['VoucherPrintedRemind', '凭单已经打印提醒'],
 ['CensorFundAllocationRemaind','审核经费分配提醒'],
 ['CensorFundDescendRemaind','审核经费下拨提醒']
 ];


Srims.common.checkBoxGroupPaperModelStore = [
['PaperAdd', '添加论文'], ['PaperEdit', '修改论文'],
['PaperDelete', '删除论文'], ['PaperAuthorAdd', '添加论文作者'], ['PaperAuthorEdit', '编辑论文作者'],
['PaperAuthorDelete', '删除论文作者'],
['MagazineSubjectClassAdd', '添加杂志学科分类信息'], ['MagazineSubjectClassDelete', '删除杂志学科分类信息'],
['PaperIndexAdd', '添加论文收录信息'], ['PaperIndexDelete', '删除论文收录信息'],
['MagazineAdd', '添加杂志'], ['MagazineEdit', '编辑杂志'], ['MagazineDelete', '删除杂志'],
['MagazineInformationAdd', '添加杂志信息'], ['MagazineInformationEdit', '编辑杂志信息'],
['MagazineInformationDelete', '删除杂志信息'], ['paperImport', '论文导入'],['MagazineImport', '杂志导入'],['MagazineInformationImport', '杂志年度信息导入']
];

Srims.common.checkBoxGroupPatentModelStore = [['PatentAdd', '添加专利'],
['PatentEdit', '修改专利'],
['PatentDelete', '删除专利'],
['PatentInventerAdd', '添加专利发明者'],
['PatentInventerEdit', '编辑专利发明者'],
['PatentInventerDelete', '删除专利发明者'],
['PatentAgencyAdd', '添加专利代理机构'],
['PatentAgencyEdit', '编辑专利代理机构'],
 ['PatentAgencyDelete', '删除专利代理机构'],
 ['PatentFeeAutoRemind', '专利费自动提醒']];

Srims.common.checkBoxGroupAwardModelStore = [['AwardAdd', '添加奖励'],
['AwardEdit', '修改奖励'],
['AwardDelete', '删除奖励'],
['AwardWinnerAdd', '添加奖励获奖人'],
['AwardWinnerEdit', '修改奖励获奖人'],

['AwardDocumentSubmit', '上传奖励文档'],
['AwardDocumentDelete', '删除奖励文档'],
['AwardDocumentCensorPass', '奖励文档审核通过'],
['AwardDocumentCensorReject', '奖励文档审核驳回'],

 ['AwardWinnerDelete', '删除奖励获奖人']];

Srims.common.checkBoxGroupBaseModelStore = [['BaseAdd', '添加基地'], ['BaseEdit', '修改基地'],
 ['BaseDelete', '删除基地']];

Srims.common.checkBoxGroupCommonModelStore = [['AnnouncementAdd', '新建通知'],
 ['AnnouncementEdit', '编辑通知'],
 ['AnnouncementDelete', '删除通知'],
  ['AnnouncementSetTop', '通知置顶'],
   ['AnnouncementCancelTop', '取消通知置顶'],
   ['AnnouncementSetOverdue', '设置通知过期'],
   ['AnnouncementCancelOverdue', '取消设置通知过期'],
  ['SubjectFirstLevelAdd', '添加一级学科分类'],
   ['SubjectFirstLevelEdit', '编辑一级学科分类'],
   ['SubjectSecondLevelAdd', '添加二级学科分类'],
   ['SubjectSecondLevelEdit', '编辑二级学科分类'],
     ['SystemSettingEdit', '编辑系统设置'],
             ['SendEmail', '发送邮件']
       ];

Srims.common.checkBoxGroupExpertsModelStore = [
      ['DepartmentAdd', '添加学院'], ['DepartmentEdit', '编辑学院'], ['ExpertImport', '专家导入'], ['ExpertAutoImport', '专家自动导入'], ['ExpertCensorRemind', '专家审核提醒']];

Srims.common.checkBoxGroupStampModelStore = [
      ['SubmitStamp', '提交文印'],
            ['CensorPassStamp', '文印审核通过'],
                  ['CensorRejectStamp', '文印审核驳回'],
                        ['StampStamp', '文印已盖章'],
                              ['DeleteStamp', '删除印章'],
                                    ['AddStamp', '添加印章'],
                                          ['EditStamp', '修改印章'],
            ['NewStampStuff', '新建盖章材料'],
                  ['EditStampStuff', '编辑盖章材料'],
                        ['DeleteStampStuff', '删除盖章材料'],
                              ['NewStampType', '新建材料章型'],
                                    ['EditStampType', '编辑材料章型'],
                                          ['DeleteStampType', '删除材料章型'],
                                             ['NewStampStateHistory', '新建文印状态历史']
                                          ];