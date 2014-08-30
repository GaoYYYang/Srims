using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Documents;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.HttpExtension;

namespace Srims.Server.UI.Documents
{
    /// <summary>
    /// 合同的显示扩展
    /// </summary>
    public static class ContractExtension
    {
        /// <summary>
        /// 合同的显示扩展
        /// </summary>
        /// <param name="contract"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowContract(Contract contract, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", contract.ID);
            response.WriteTagWithValue("ContractNumber", contract.ContractNumber);
            response.WriteTagWithValue("ContractResource", contract.ContractResource);
            response.WriteTagWithValue("Type", contract.Type);
            response.WriteTagWithValue("Author", contract.Author);
            response.WriteTagWithValue("SubmitDateTime", contract.SubmitDateTime);
            response.WriteTagWithValue("State", contract.State);
           response.WriteTagWithValue("Censor", contract.Censor);
            response.WriteTagWithValue("CensorDateTime", contract.CensorDateTime);

            response.WriteTagWithValue("ProjectName", contract.Project.Name);
            response.WriteTagWithValue("ProjectId", contract.Project.ID);
            response.WriteTagWithValue("ProjectIsHorizontal", contract.Project.Type.Rank.IsHorizontal);


            response.WriteTagWithValue("HasPermission_Delete", user.HasPermission_Delete(contract, database));
            response.WriteTagWithValue("CanDelete", user.CanDelete(contract, database));
        }
        /// <summary>
        /// 合同列表的显示扩展
        /// </summary>
        /// <param name="contractList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this IList<Contract> contractList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<Contract> showDelegate = new ShowDelegateWithUserAndDatabase<Contract>(ShowContract);
            contractList.Show<Contract>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得合同
        /// </summary>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        /// <returns></returns>
        public static Contract GetContract(this HttpRequest request, User user, IDatabase database)
        {
            Contract contract = new Contract();
            contract.Project = request.GetEntity(database.Projects, "ProjectId");
            contract.Type = request.GetEnum<ContractType>("contractType");
            contract.Author = user.Name;
            contract.SubmitDateTime = DateTime.Now;
            if (!user.IsExpert)
            {
                contract.State = CensorState.Passed;
                contract.Censor = user.Name;
                contract.CensorDateTime = DateTime.Now;
            }
            else
                contract.State = CensorState.WaitingCensor;

            return contract;
        }
    }
}
