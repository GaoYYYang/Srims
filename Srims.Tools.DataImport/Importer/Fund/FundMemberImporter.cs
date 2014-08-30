using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;
using Srims.Server.Business.Users;
using Srims.Server.Business.Experts;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class FundMemberImporter : ImporterBase<FundMember_Old, FundMember>
    {
        protected override string EntityName
        {
            get { return "经费成员"; }
        }

        protected override string GetEntityDescription(FundMember_Old oldEntity)
        {
            if (oldEntity.ProjectInfo_FundID.HasValue)
                return string.Format("{0} - {1}({2})", oldEntity.ProjectInfo_Fund_Old.Project_Old.Name, oldEntity.ExpertName, oldEntity.ExpertNumber);
            else
                return string.Format("{0} - {1}({2})", "已删除项目", oldEntity.ExpertName, oldEntity.ExpertNumber);
        }

        protected override FundMember GetNewEntity(FundMember_Old oldEntity)
        {
            var fundMember = new FundMember();

            fundMember.AccountBookNumber = oldEntity.AccountBookNumber;
            fundMember.Expert = getExpret(oldEntity);
            fundMember.ProjectInfo_Fund = GetNewProjectInfo_FundByOld(oldEntity.ProjectInfo_FundID);
            fundMember.OldID = oldEntity.ID;

            return fundMember;
        }

        private Expert getExpret(FundMember_Old oldEntity)
        {
            if (oldEntity.ExpertID.HasValue)
                return NewDatabase
                    .Experts
                    .Single(e => e.Number == oldEntity.Expert_Old.Number);
            else
                return NewDatabase
                    .Experts
                    .Single(e => e.Number == oldEntity.ExpertNumber);
        }
    }
}
