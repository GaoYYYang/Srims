using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Srims.Server.Business.Experts
{
    public interface IExpertAchieveStatisticDataAccess : IEntityDataAccess<ExpertAchieveStatistic>
    {
        void UpdateExpertAchieveStatistic(ExpertAchieveStatisticUpdateParameters parameters);
    }
}
