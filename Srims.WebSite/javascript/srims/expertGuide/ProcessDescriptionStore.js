
if (!Srims.expertGuide) 
    Ext.namespace('Srims.expertGuide');

Srims.expertGuide.fundAllocation_ProcessDescriptionStore = [{
    name: '选择经费',
    icon: 'fund-allocation/fund-select',
    description: '<fieldset><legend>帮助</legend><div class="expert-guide-description">请在下面的列表中选择您要分配的项目，然后点击"下一步"。<br />如果下面的列表中没有您要分配经费的项目，可能的原因是经费还没有下拨到这个项目，请<a href="#" onclick="Srims.ExpertNavigatePanel.Action.fundDescend()">单击此处进行经费下拨</a>（仅限横向项目）。如有其它疑问，请与管理员联系。</div></fieldset>'
}, {
    name: '分配/提交',
    icon: 'fund-allocation/allocate',
    buttonNextText: '分配',
    description: '<fieldset><legend>帮助</legend><div class="expert-guide-description">点击“分配”按钮将经费分配到经费成员。<br />分配完所有经费后，点击“提交”按钮提交经费分配。</div></fieldset>'
}, {
    name: '完成',
    icon: 'fund-allocation/complete',
    description: Srims.expertGuide.getCompleteHtml('<div class="expert-guide-description"><ul><li>您的经费分配申请已提交成功！请等待管理员审核。</li></li>管理员审核通过后，将给您发送提醒邮件，请注意的查收。</li><li><br />请点击”完成“按钮，退出本向导</li></ul></div>')
}];

Srims.expertGuide.fundDescend_ProcessDescriptionStore = [{
    name: '选择经费',
    icon: 'fund-descend/finance-select',
    description: '<fieldset><legend>提示信息</legend><div  class="expert-guide-description"><ul><li>请输入您的经费来款信息的基本信息（至少填写一个查询项），点击“查询”按钮进行查询。</li></li>然后在查询结果中选择您的经费到来款信息。点击“下一步”继续。</li></ul></div></fieldset>'
}, {
    name: '选择下拨项目',
    icon: 'fund-descend/project-select',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>在下面的列表中选择您要下拨的项目。您只能对横向项目进行经费下拨。</li><li>如果列表中没有您要下拨的项目，请确定这个项目是否立项。如果没有立项，<a href="#">点进这里</a>进行项目立项；如果已经立项，请确定您的立项申请是否被管理员审核通过。</li></ul></div></fieldset>'
}, {
    name: '填写下拨金额',
    icon: 'fund-descend/amount-edit',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>请输入下拨金额。</li><li>下拨金额必须大于零且不能大于项目的未到金额。</li></ul></div></fieldset>'
}, {
    name: '确认提交',
    icon: 'fund-descend/confirm',
    buttonNextText: '提交',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>请确认下拨信息是否正确。确认无误后，点击“提交”按钮提交审核申请，等待管理员审核。</li><li>如果需要修改，请点击“上一步”，进行修改。</li></ul></div></fieldset>'
}, {
    name: '完成',
    icon: 'fund-descend/complete',
    description: Srims.expertGuide.getCompleteHtml('<div class="expert-guide-description"><ul><li>您的经费下拨申请已提交成功！请等待管理员审核。</li></li>管理员审核通过后，将给您发送提醒邮件，请注意的查收。审核通过后，您即可分配此笔经费。</li><li><br />请点击”完成“按钮，退出本向导</li></ul></div>')
}];

Srims.expertGuide.StampApply_ProcessDescriptionStore = [{
    name: '基本信息',
    icon: 'stamp-apply/edit-basic',
    description: '<fieldset><legend>提示信息</legend><div  class="expert-guide-description"><ul><li>请输入您的文印申请的基本信息<font color="#FF0000">（涉密材料不用提交)</font>，其中<font color="#FF0000">项目</font>来源可查询，若<font color="#FF0000">填写\'其它\'</font>，则在下面的项目来源输入框中手动添加；<font color="#FF0000">经办人默认为负责人</font>，也可填写他人。点击“下一步”继续。上传盖章文档必须为pdf格式，不大于20M。如果您想重新选择文印是否与项目相关，请关闭本页面后重新打开。</li></ul></div></fieldset>'
}, {
    name: '材料/章型',
    icon: 'stamp-apply/edit-stuff',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>在下面的材料列表中点击添加在弹出的窗口中添加新的材料信息；如要删除已有的材料信息，在列表中选择此材料，点击删除按钮即可。</li><li>点击”下一步“按钮，进行文印的提交。</li></ul></div></fieldset>'
}, {
    name: '确认提交',
    icon: 'stamp-apply/confirm',
    buttonNextText: '提交',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>请确认文印信息是否正确。确认无误后，点击“提交”按钮提交审核申请，等待管理员审核。</li><li>如果需要修改，请点击“上一步”，进行修改。</li></ul></div></fieldset>'
}, {
    name: '完成',
    icon: 'stamp-apply/complete',
    description: Srims.expertGuide.getCompleteHtml('<div class="expert-guide-description"><ul><li>您的文印申请已提交成功！请等待管理员审核。</li></li>管理员审核通过后，将给您发送提醒邮件，请注意查收。审核通过后，您即可进行文印盖章。</li><li><br />请点击”完成“按钮，退出本向导</li></ul></div>')
}];

Srims.expertGuide.ProjectEdit_ProcessDescriptionStore = [{
    name: '选择/新建',
    icon: 'project-new/select-or-new',
    description: '<fieldset><legend>提示信息</legend><div  class="expert-guide-description"><ul><li>请选择待提交列表中一个的项目，点击“下一步”继续编辑提交，或者直接点击“下一步”新建一个项目。</li></ul></div></fieldset>'
}, {
    name: '外协信息',
    icon: 'project-new/basic',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>如项目有外协经费，请先填写“外协分配”，“外协单位”名称在系统数据库中没有的请点击“新建外协单位”添加，须经管理员审核通过后方可完成该项目立项。</li><li><span style="color:red">如项目类型为“科技成果转让”或没有外协分配，则直接点击“下一步”按钮，进行项目基本信息录入。</span></li><li><span style="color:red">外协单位可进行模糊查询，查询的内容必须连续。例如，“中国海洋大学”可以输入“中国”或“海洋”或“大学”或“中国海”等等，不能输入“海大”等简称。如果外协单位中查找不到你所需要的单位，请点击“新建外协单位”。</span></li></ul></div></fieldset>'
},{
    name: '基本信息',
    icon: 'project-new/basic',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>编辑项目的基本信息</li><li>点击”下一步“按钮，进行项目成员管理。</li></ul></div></fieldset>'
}, {
    name: '成员管理',
    icon: 'project-new/member',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>管理项目成员。请严格按照项目批复或合同任务书中位次添加完成人员，该信息将导入人事处岗位评聘系统，作为职称评定的依据，若之前未全部添加，请联系项目管理员补充。</li><li>点击”下一步“按钮，进行项目合同的管理。</li></ul></div></fieldset>'
}, {
    name: '合同管理',
    icon: 'project-new/contract',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>管理项目合同。</li><li>点击”下一步“按钮，进行项目的文档管理。</li></ul></div></fieldset>'
}, {
    name: '文档管理',
    icon: 'project-new/document',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>管理项目文档。</li><li>点击”下一步“按钮，进行项目的付款计划管理。</li></ul></div></fieldset>'
}, {
    name: '付款计划',
    icon: 'project-new/pay-plan',
    description: '<fieldset><legend>提示信息</legend><div class="expert-guide-description"><ul><li>管理项目的付款计划。</li><li>点击”下一步“按钮，确认已编辑的信息。</li></ul></div></fieldset>'
}, {
    name: '确认提交',
    icon: 'project-new/confirm',
    buttonNextText: '提交立项申请',
    description: '<fieldset><legend>提示信息</legend><div style="margin: 10px; color:Red">请注意：您还有最后一步需要操作：</div><div class="expert-guide-description"><ul><li>请确认项目信息是否正确。确认无误后，点击“提交”按钮提交项目，等待管理员审核。</li><li>如果需要修改，请点击“上一步”，进行修改。</li></ul></div></fieldset>'
}, {
    name: '完成',
    icon: 'project-new/complete',
    description: Srims.expertGuide.getCompleteHtml('<div class="expert-guide-description"><ul><li>您的项目已提交成功！请等待管理员审核。</li></li>管理员审核通过后，将给您发送提醒邮件，请注意查收。</li><li><br />请点击”完成“按钮，退出本向导</li></ul></div>')
}];
