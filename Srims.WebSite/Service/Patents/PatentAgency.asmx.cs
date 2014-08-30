using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Users;
using Srims.Server.UI.Patents;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Patents
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class PatentAgencyService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database.PatentAgencys
                .GetPatentAgency(Request.GetPatentAgencyQueryInformation())
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetPatentAgencyWithSameName()
        {
            string name = Request.GetString("Name");
            int? id = Request.GetInt("id");

            Response.Write(Database.PatentAgencys.GetPatentAgencyOfSameName(name, id));

        }
        [WebMethod]
        public void Save()
        {
            var oldPatentAgency = Request.GetOldPatentAgency(Database);
            var patentAgency = PatentAgencyExtension.GetPatentAgency(Request, Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = patentAgency.IsNew ? "新建" : "编辑";
                description += string.Format("专利代理机构\n 机构名称为{0}", patentAgency.Name)
                    + Log.GetEditOperationDescription(oldPatentAgency, patentAgency, PatentAgency.GetpatentAgencyDescriptionItems(), patentAgency.IsNew);
                Log.Write(User.Name, patentAgency.IsNew ? (int)LogType.PatentAgencyAdd : (int)LogType.PatentAgencyEdit, description, Request.UserHostAddress, patentAgency.IsNew ? "添加专利机构" : "编辑专利机构", Database);

                patentAgency.Save(Database);
                ts.Complete();
            }
        }

        [WebMethod]
        public void DeletePatentAgency()
        {
            var patentAgency = Request.GetEntity<PatentAgency>(Database.PatentAgencys, "patentAgencyID");
            if (patentAgency != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    int id = patentAgency.ID;
                    foreach (Patent patent in Database.Patents)
                        if (patent.AgencyID == id)
                            patent.Agency = null;
                    string description = string.Format("删除专利代理机构：{0}。", patentAgency.Name);
                    Log.Write(User.Name, (int)LogType.PatentAgencyDelete, description, Request.UserHostAddress, "删除专利代理机构", Database);
                    patentAgency.Delete(Database);
                    ts.Complete();
                }
            }
        }
    }
}
