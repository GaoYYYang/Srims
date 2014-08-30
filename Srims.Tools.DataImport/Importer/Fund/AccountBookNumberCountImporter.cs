using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Fund;

namespace Srims.Tools.DataImport.Importer.Fund
{
    public class AccountBookNumberCountImporter : ImporterBase<AccountBookNumberCount_Old, AccountBookNumberCount>
    {
        protected override string EntityName
        {
            get { return "账本号计数器"; }
        }

        protected override string GetEntityDescription(AccountBookNumberCount_Old oldEntity)
        {
            return oldEntity.CharacterNumber;
        }

        protected override AccountBookNumberCount GetNewEntity(AccountBookNumberCount_Old oldEntity)
        {
            var accountBookNumberCount = new AccountBookNumberCount();

            accountBookNumberCount.CharacterNumber = oldEntity.CharacterNumber;
            accountBookNumberCount.Count = oldEntity.Count;

            return accountBookNumberCount;
        }
    }
}
