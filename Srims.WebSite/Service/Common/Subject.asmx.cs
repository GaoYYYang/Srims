using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;

using Srims.Server.Business.Common;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.UI.Users;
using Srims.Server.UI.HttpExtension;
using MIS.Common.Query;

namespace Srims.WebSite.Service.Common
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class SubjectService : WebServiceBase
    {
        [WebMethod]
        public void GetSubjectFirstLevel()
        {
            Response.WriteXmlHead();
            Database
                .SubjectFirstLevels
                .ToList()
                .Show(Response);
        }

        [WebMethod]
        public void GetSubjectSecondLevel()
        {
            Response.WriteXmlHead();
            Database
                .SubjectSecondLevels
                .GetSubjectSecondLevel(Request.GetInt("firstLevelSubjectId"))
                .Show(Response);
        }
        [WebMethod]
        public void QuerySubjectFirstLevel()
        {
            Response.WriteXmlHead();
            Database.SubjectFirstLevels.Query(Request.GetSubjectFirstQueryInformation()).Show(Response);
        }
        [WebMethod]
        public void QuerySubjectSecondLevel()
        {
            Response.WriteXmlHead();
            Database.SubjectSecondLevels.Query(Request.GetSubjectSecondQueryInformation()).Show(Response);
        }
        [WebMethod]
        public void IsSubjectFirstLevelCodeExist()
        {
            Database.SubjectFirstLevels
                .IsFirstLevelCodeUsed(Request.GetString("Code"), Request.GetInt("subjectFirstLevelID"))
                .Show(Response);
        }
        [WebMethod]
        public void IsSubjectFirstLevelNameExist()
        {
            Database
                .SubjectFirstLevels
                .IsSubjectFirstLevelNameExist(Request.GetString("Name"), Request.GetInt("subjectFirstLevelID"))
                .Show(Response);
        }
        [WebMethod]
        public void SaveFirstLevel()
        {
            var oldSubjectFirstLevel = Request.GetOldSubjectFirstLevel(Database, User);
            var subjectfirstlevel = Request.GetSubjectFirstLevel(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = subjectfirstlevel.IsNew ? "添加" : "编辑";
                description += string.Format("一级学科\n   对应一级学科的名称为：{0}。", subjectfirstlevel.Name)
                    + Log.GetEditOperationDescription(oldSubjectFirstLevel, subjectfirstlevel, SubjectFirstLevel.GetDescriptionItems(), subjectfirstlevel.IsNew);
                Log.Write(User.Name, subjectfirstlevel.IsNew ? (int)LogType.SubjectFirstLevelAdd : (int)LogType.SubjectFirstLevelEdit, description, Request.UserHostAddress, subjectfirstlevel.IsNew ? "添加一级学科分类" : "编辑一级学科分类", Database);

                subjectfirstlevel.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void SaveSecondLevel()
        {
            var oldSubjectSecondLevel = Request.GetOldSubjectSecondLevel(Database, User);
            var subjectsecondlevel = Request.GetSubjectSecondLevel(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = subjectsecondlevel.IsNew ? "添加" : "编辑";
                description += string.Format("二级学科\n   对应二级学科的名称为：{0}。", subjectsecondlevel.Name)
                    + Log.GetEditOperationDescription(oldSubjectSecondLevel, subjectsecondlevel, SubjectSecondLevel.GetDescriptionItems(), subjectsecondlevel.IsNew);
                Log.Write(User.Name, subjectsecondlevel.IsNew ? (int)LogType.SubjectSecondLevelAdd : (int)LogType.SubjectSecondLevelEdit, description, Request.UserHostAddress, subjectsecondlevel.IsNew ? "添加二级学科分类" : "编辑二级学科分类", Database);

                subjectsecondlevel.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void IsSubjectSecondLevelNameExist()
        {
            Database
                .SubjectSecondLevels
                .IsSubjectSecondLevelNameExist(Request.GetString("Name"), Request.GetInt("subjectSecondLevelID"))
                .Show(Response);
        }
        [WebMethod]
        public void IsSubjectSecondLevelCodeExist()
        {
            Database
                .SubjectSecondLevels
                .IsSecondLevelCodeUsed(Request.GetString("Code"), Request.GetInt("subjectSecondLevelID"))
                .Show(Response);
        }
    }
}
