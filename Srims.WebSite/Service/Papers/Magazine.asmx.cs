using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Transactions;
using System.Web;
using System.Web.Services;

using Srims.Server.Business.Common;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Users;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.UI.Papers;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.MagazineImport;

namespace Srims.WebSite.Service.Papers
{

    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]

    public class MagazineService : WebServiceBase
    {
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Magazines
               .Query(Request.GetMagazineQueryInformation(), Database)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetSubjectRank()
        {
            Response.WriteXmlHead();
            Database
               .Magazines
               .GetSubjectRank()
               .Show(Response);
        }
        [WebMethod]
        public void Save()
        {
            var oldMagazine = Request.GetOldMagazine(Database);
            var magazine = Request.GetMagazine(Database);
            if (!User.CanEditMagazine(Database))
                throw new HasNoPermissionException();

            using (TransactionScope ts = new TransactionScope())
            {
                var description = magazine.IsNew ? "添加" : "编辑";
                description += string.Format("杂志\n  杂志的全称为：{0}。\n", magazine.FullName) +
                    Log.GetEditOperationDescription(oldMagazine, magazine, Magazine.GetMagazineDescriptionItems(), magazine.IsNew);
                Log.Write(User.Name, magazine.IsNew ? (int)LogType.MagazineAdd : (int)LogType.MagazineEdit, description, Request.UserHostAddress, magazine.IsNew ? "添加杂志" : "编辑杂志", Database);
                magazine.Save(Database);

                foreach (var magazineSubjectClass in magazine.GetSubjectClass(Database.MagazineSubjectClasses))
                {
                    description = string.Format("删除杂志：{0}的杂志学科分类信息‘{1}’。 \n", magazine.FullName, magazineSubjectClass.SubjectClass);
                    Log.Write(User.Name, (int)LogType.MagazineSubjectClassDelete, description, Request.UserHostAddress, "删除杂志学科分类信息", Database);
                    magazineSubjectClass.Delete(Database);
                }

                var subjectClassArray = Request.GetString("SubjectClass").Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (var subjectClass in subjectClassArray)
                {
                    MagazineSubjectClass magazineSubjectClass = new MagazineSubjectClass();
                    magazineSubjectClass.Magazine = magazine;
                    magazineSubjectClass.SubjectClass = subjectClass;

                    description = string.Format("添加杂志：{0}的杂志学科分类信息‘{1}’。 \n", magazine.FullName, magazineSubjectClass.SubjectClass)
                        + Log.GetEditOperationDescription(new MagazineSubjectClass(), magazineSubjectClass, MagazineSubjectClass.GetDescriptionItems(), magazineSubjectClass.IsNew);
                    Log.Write(User.Name, (int)LogType.MagazineSubjectClassAdd, description, Request.UserHostAddress, "添加杂志学科分类信息", Database);

                    magazineSubjectClass.Save(Database);
                }
                ts.Complete();
            }

            Response.WriteXmlHead();
            magazine.ShowInList(Response, User, Database, MagazineExtension.ShowMagazine);
        }
        [WebMethod]
        public void Delete()
        {
            var magazine = Request.GetEntity<Magazine>(Database.Magazines, "magazineID");

            if (magazine != null)
            {
                var description = string.Format("删除杂志：{0}。 ", magazine.FullName);
                Log.Write(User.Name, (int)LogType.MagazineDelete, description, Request.UserHostAddress, "删除杂志", Database);
                magazine.Delete(Database);
            }
        }
        [WebMethod]
        public void SearchMagazine()
        {
            Response.WriteXmlHead();
            Database
                .Magazines
                .SearchMagazine(Request.GetString("query"))
                .ShowAsSearchRecord(Response);
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            string logName = Context.ImportMagazine(postedFiles[0], Request, User);

            Response.Write("<html><body>{ success: true, LogDocumentName: '" + logName + "' }</body></html>");
        }
    }
}
