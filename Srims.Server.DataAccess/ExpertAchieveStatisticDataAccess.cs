using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business.Experts;
using MIS.Common;

namespace Srims.Server.DataAccess
{
    internal class ExpertAchieveStatisticDataAccess : EntityDataAccessAdapter<ExpertAchieveStatistic>, IExpertAchieveStatisticDataAccess
    {
        public ExpertAchieveStatisticDataAccess(Database database)
            : base(database)
        { }

        #region IExpertAchieveStatisticDataAccess Members

        public void UpdateExpertAchieveStatistic(ExpertAchieveStatisticUpdateParameters parameters)
        {
            clearIDTable();

            var isStatisticProject = insertIDArray(parameters.Project_IDArray, ExpertAchieveStatisticType.Project);
            var isStatisticFund = insertIDArray(parameters.Project_IDArray, ExpertAchieveStatisticType.Fund); ;
            var isStatisticPaper = insertIDArray(parameters.Paper_IDArray, ExpertAchieveStatisticType.Paper); ;
            var isStatisticAward = insertIDArray(parameters.Award_IDArray, ExpertAchieveStatisticType.Award); ;
            var isStatisticPatent = insertIDArray(parameters.Patent_IDArray, ExpertAchieveStatisticType.Patent); ;

            if (!isStatisticProject && !isStatisticFund && !isStatisticPaper && !isStatisticAward && !isStatisticPatent)
                return;

            executeUpdateStoredProcedure(parameters);
        }

        private void clearIDTable()
        {
            Database.Execute("TRUNCATE TABLE ExpertAchieveStatisticIDArray");
        }
        private bool insertIDArray(int[] idArray, ExpertAchieveStatisticType expertAchieveStatisticType)
        {
            if (idArray == null)
                return false;


            var type = Convert.ToInt32(expertAchieveStatisticType);
            for (int i = 0; i < idArray.Length; i++)
                Database.Execute("INSERT INTO ExpertAchieveStatisticIDArray VALUES ({0},{1})", idArray[i], type);

            return true;
        }

        private void executeUpdateStoredProcedure(ExpertAchieveStatisticUpdateParameters parameters)
        {
            //EXEC 	[dbo].[spUpdateExpertAchieveStatistic]
            //        @Paper_IsLinkMan = NULL,
            //        @Paper_AuthorOrderStart = NULL,
            //        @Paper_AuthorOrderEnd = 3,
            //        @Patent_IsPrincipal = 1,
            //        @Patent_InvertorOrderStart = NULL,
            //        @Patent_InvertorOrderEnd = NULL,
            //        @Award_WinnerOrderStart = 1,
            //        @Award_WinnerOrderEnd = 5

            var commandBuilder = new StringBuilder();

            commandBuilder.AppendFormat(" EXEC 	[dbo].[spUpdateExpertAchieveStatistic] ");

            commandBuilder.AppendFormat("        @Paper_IsLinkMan = {0}, ", convertBoolean(parameters.Paper_IsLinkMan));
            commandBuilder.AppendFormat("        @Paper_AuthorOrderStart = {0}, ", convertRangeStart(parameters.Paper_AuthorOrder));
            commandBuilder.AppendFormat("        @Paper_AuthorOrderEnd = {0}, ", convertRangeEnd(parameters.Paper_AuthorOrder));

            commandBuilder.AppendFormat("        @Patent_IsPrincipal = {0}, ", convertBoolean(parameters.Patent_IsPrincipal));
            commandBuilder.AppendFormat("        @Patent_InvertorOrderStart = {0}, ", convertRangeStart(parameters.Patent_InvertorOrder));
            commandBuilder.AppendFormat("        @Patent_InvertorOrderEnd = {0}, ", convertRangeEnd(parameters.Patent_InvertorOrder));

            commandBuilder.AppendFormat("        @Award_WinnerOrderStart = {0}, ", convertRangeStart(parameters.Award_WinnerOrder));
            commandBuilder.AppendFormat("        @Award_WinnerOrderEnd = {0} ", convertRangeEnd(parameters.Award_WinnerOrder));

            Database.Execute(commandBuilder.ToString());
        }

        private string convertBoolean(bool? value)
        {
            if (value.HasValue)
                return Convert.ToInt32(value).ToString();
            else
                return "NULL";
        }
        private string convertRangeStart(Range<int> range)
        {
            if (range == null || !range.Start.HasValue)
                return "NULL";

            return range.Start.Value.ToString();
        }
        private string convertRangeEnd(Range<int> range)
        {
            if (range == null || !range.End.HasValue)
                return "NULL";

            return range.End.Value.ToString();
        }

        #endregion
    }
}
