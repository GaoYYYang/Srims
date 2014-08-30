if (!Srims.common)
    Ext.namespace('Srims.common');
Ext.namespace('Srims.common.OutsourcingCompanyType');
Srims.common.OutsourcingCompanyType.institution = 'institution';
Srims.common.OutsourcingCompanyType.collectively_owned = 'collectively_owned';
Srims.common.OutsourcingCompanyType.joint_equity = 'joint_equity ';
Srims.common.OutsourcingCompanyType.associated = 'associated';
Srims.common.OutsourcingCompanyType.LLC = 'LLC';
Srims.common.OutsourcingCompanyType.LTD = 'LTD';
Srims.common.OutsourcingCompanyType.privateC = 'privateC';
Srims.common.OutsourcingCompanyType.GOT_joint_venture = 'GOT_joint_venture';
Srims.common.OutsourcingCompanyType.GOT_cooperative_venture = 'GOT_cooperative_venture';
Srims.common.OutsourcingCompanyType.GOT_private_venture = 'GOT_private_venture';
Srims.common.OutsourcingCompanyType.GOT_ownjoint_venture = 'GOT_ownjoint_venture';
Srims.common.OutsourcingCompanyType.cf_joint = 'cf_joint';
Srims.common.OutsourcingCompanyType.cf_cooperation = 'cf_cooperation';
Srims.common.OutsourcingCompanyType.overseas = 'overseas';
Srims.common.OutsourcingCompanyType.FICLS = 'FICLS';

Srims.common.outsourcingCompanyTypeRender = function(value, metadata) {
    switch (value) {
        case 'institution':
            return '事业单位';
        case 'collectively_owned':
            return '集体企业';
        case 'joint_equity':
            return '股份合作企业';
        case 'associated':
            return '联营企业';
        case 'LLC':
            return '有限责任公司';
        case 'LTD':
            return '股份有限公司';
        case 'privateC':
            return '私营企业';
        case 'GOT_joint_venture':
            return '合资经营企业(港或澳、台资)';
        case 'GOT_cooperative_venture':
            return '合作经营企业(港或澳、台资)';
        case 'GOT_private_venture':
            return '港、澳、台商独资经营企业';
        case 'GOT_ownjoint_venture':
            return '港、澳、台商投资股份有限公司';
        case 'cf_joint':
            return '中外合资经营企业';
        case 'cf_cooperation':
            return '中外合作经营企业';
        case 'overseas':
            return '外资企业';
        case 'FICLS':
            return '外商投资股份有限公司';
        default:
            return '未知';
    }
}
//Srims.common.outsourcingCompanyTypeStore = [['事业单位', '事业单位'], ['collectively_owned', '集体企业'], ['joint_equity ', '股份合作企业'], ['associated', '联营企业'], ['LLC', '有限责任公司'], ['LTD', '股份有限公司'], ['privateC', '私营企业'], ['GOT_joint_venture', '合资经营企业(港或澳、台资)'], ['GOT_cooperative_venture', '合作经营企业(港或澳、台资)'], ['GOT_private_venture', '港、澳、台商独资经营企业'], ['GOT_ownjoint_venture', '港、澳、台商投资股份有限公司'], ['cf_joint', '中外合资经营企业'], ['cf_cooperation', '中外合作经营企业'], ['overseas', '外资企业'], ['FICLS', '外商投资股份有限公司']];
Srims.common.outsourcingCompanyTypeStore = [['事业单位', '事业单位'], ['集体企业', '集体企业'], ['股份合作企业 ', '股份合作企业'], ['联营企业', '联营企业'], ['有限责任公司', '有限责任公司'], ['股份有限公司', '股份有限公司'], ['私营企业', '私营企业'], ['合资经营企业(港或澳、台资)', '合资经营企业(港或澳、台资)'], ['合作经营企业(港或澳、台资)', '合作经营企业(港或澳、台资)'], ['港、澳、台商独资经营企业', '港、澳、台商独资经营企业'], ['港、澳、台商投资股份有限公司', '港、澳、台商投资股份有限公司'], ['中外合资经营企业', '中外合资经营企业'], ['中外合作经营企业', '中外合作经营企业'], ['外资企业', '外资企业'], ['外商投资股份有限公司', '外商投资股份有限公司']];
