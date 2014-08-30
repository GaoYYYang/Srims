using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business.Common;
using Srims.Server.Business.Projects;
using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.UI.Projects;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.Users;
using Srims.Server.UI.MISExtension;
using Srims.Server.DataExchange.OutsourcingImport;

namespace Srims.WebSite.Service.Common
{
    /// <summary>
    /// Summary description for Outsourcing
    /// </summary>
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class OutsourcingService : WebServiceBase
    {
        private static int _CurrentOutsoucingID;
        [WebMethod]
        public void Query()
        {
            Response.WriteXmlHead();
            Database
                .Outsourcings
                .Query(Request.GetOutsourcingUnitQueryInformation(), Database, User)
                .Show(Response, User, Database);
        }
        [WebMethod]
        public void GetById()
        {
            var outsourcing = Request.GetOutsourcingUnitByID(Database);

            outsourcing.ShowInList(Response, User, Database, OutsourcingUnitExtension.ShowOutsourcingUnit);
        }
        [WebMethod]
        public void GetCompanyManangeType()
        {
            Response.WriteXmlHead();
            CompanyManangeType companyManangeType = new CompanyManangeType();
            companyManangeType.Show(Response);
        }
        [WebMethod]
        public void Save()
        {
            var oldOutsourcing = Request.GetOldOutsourcingUnit(Database, User);

            var outsourcing = Request.GetOutsourcingUnit(Database, User);

            using (TransactionScope ts = new TransactionScope())
            {
                var description = outsourcing.IsNew ? "新建" : "编辑";
                description += string.Format("外协单位名称为：{0}", outsourcing.Name)
                    + Log.GetEditOperationDescription(oldOutsourcing, outsourcing, Outsourcing.GetDescriptionItems(), outsourcing.IsNew);
                Log.Write(User.Name, outsourcing.IsNew ? (int)LogType.OutsourcingAdd : (int)LogType.OutsourcingEdit, description, Request.UserHostAddress, outsourcing.IsNew ? "添加外协单位" : "编辑外协单位", Database);
                var outsourcingExist = Database.Outsourcings.Where(c => c.Name == outsourcing.Name || (c.OrganizationCode == outsourcing.OrganizationCode && c.OrganizationCode != "") || (c.TaxNumber == outsourcing.TaxNumber && c.TaxNumber != "")).ToList();
                if (outsourcingExist.Count == 0)
                {
                    outsourcing.Save(Database);
                }
                outsourcing.ShowInList(Response, User, Database, OutsourcingUnitExtension.ShowOutsourcingUnit);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Verfiy()
        {
            var oldOutsourcing = Request.GetOldOutsourcingUnit(Database, User);
            var outsourcing = Request.GetOutsourcingUnit(Database);

            using (TransactionScope ts = new TransactionScope())
            {
                var description = outsourcing.IsNew ? "审核编辑" : "审核";
                description += string.Format("外协单位名称为：{0}", outsourcing.Name)
                    + Log.GetEditOperationDescription(oldOutsourcing, outsourcing, Outsourcing.GetDescriptionItems(), outsourcing.IsNew);
                Log.Write(User.Name, outsourcing.IsNew ? (int)LogType.OutsourcingAdd : (int)LogType.OutsourcingVerfy, description, Request.UserHostAddress, outsourcing.IsNew ? "添加外协单位" : "编辑外协单位", Database);
                outsourcing.IsVerify = "审核通过";
                outsourcing.Save(Database);
                Response.WriteXmlHead();
                outsourcing.ShowInList(Response, User, Database, OutsourcingUnitExtension.ShowOutsourcingUnit);
                ts.Complete();
            }
        }
        [WebMethod]
        public void DisVerfiy()
        {
            var oldOutsourcing = Request.GetOldOutsourcingUnit(Database, User);
            var outsourcing = Request.GetOutsourcingUnit(Database);

            using (TransactionScope ts = new TransactionScope())
            {
                var description = outsourcing.IsNew ? "审核编辑" : "审核驳回";
                description += string.Format("外协单位名称为：{0}", outsourcing.Name)
                    + Log.GetEditOperationDescription(oldOutsourcing, outsourcing, Outsourcing.GetDescriptionItems(), outsourcing.IsNew);
                Log.Write(User.Name, outsourcing.IsNew ? (int)LogType.OutsourcingAdd : (int)LogType.OutsourcingVerfy, description, Request.UserHostAddress, outsourcing.IsNew ? "添加外协单位" : "编辑外协单位", Database);
                outsourcing.IsVerify = "审核驳回";
                outsourcing.Save(Database);
                Response.WriteXmlHead();
                outsourcing.ShowInList(Response, User, Database, OutsourcingUnitExtension.ShowOutsourcingUnit);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Delete()
        {
            var outsourcing = Request.GetOutsourcingUnitByID(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = string.Format("删除外协单位：{0}", outsourcing.Name);
                Log.Write(User.Name, (int)LogType.OutsourcingDelete, description, Request.UserHostAddress, "删除外协单位", Database);

                outsourcing.Delete(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void Import()
        {
            var postedFiles = Request.GetHttpFiles();
            for (int iFile = 0; iFile < postedFiles.Count; iFile++)
            {
                var guid = postedFiles[iFile].Save(HttpContext.Current, Database);

                using (TransactionScope ts = new TransactionScope())
                {
                    var resouces = Database.Resources.First(ps => ps.Guid == guid);
                    Response.Write("<html><body>{ success: true,data:[{id:1, name:'" + resouces.Guid.ToString() + "'}]}</body></html>");
                    ts.Complete();
                }
            }
        }
        [WebMethod]
        public void SetCurrentSelectSourcingID()
        {
            var outsourcing = Request.GetOutsourcingUnitByID(Database);
            _CurrentOutsoucingID = outsourcing.ID;
        }
        [WebMethod]
        public void SearchOutsourcing()
        {
            Response.WriteXmlHead();
            Database
                .Outsourcings
                .SearchOutsourcing(Request.GetString("query"))
                .ShowAsSearchRecord(Response);
        }
        [WebMethod]
        public void WeatherExistOutsourcing()
        {

            //Response.WriteXmlHead();
            var oursorcing = new List<Outsourcing>();
            if (Request.GetString("OrganizationCode").Trim() != "-" && Request.GetString("Name").Trim() != "")
                oursorcing = Database.Outsourcings.Where(ps => ps.Name == Request.GetString("Name") || ps.OrganizationCode == Request.GetString("OrganizationCode")).ToList();
            else if (Request.GetString("OrganizationCode").Trim() != "-")
                oursorcing = Database.Outsourcings.Where(ps => ps.OrganizationCode == Request.GetString("OrganizationCode")).ToList();
            else if (Request.GetString("Name").Trim() != "")
                oursorcing = Database.Outsourcings.Where(ps => ps.Name == Request.GetString("Name")).ToList();
            else if (Request.GetString("OrganizationCode").Trim() == "-" && Request.GetString("Name").Trim() == "")
            {
                Response.Write("请输入外协单位名称或者外协单位组织代码以进行验证！");
                return;
            }
            if (oursorcing.Count != 0)
            {
                foreach (var item in oursorcing)
                {
                    Response.Write("外协单位：" + item.Name + ",组织代码：" + item.OrganizationCode + ";<br />");
                }
            }
            else
                Response.Write("");
        }
        [WebMethod]
        public void GetProvinceAreasByProvinceName()
        {
            var provinceName = Request.GetString("provinceName");
            var provinceFilePath = Server.MapPath(@"/Province.txt");

            var provinceReader = new ProvinceFileReader(provinceFilePath);
            var provinceAreas = provinceReader.GetByProvinceName(provinceName);
            Response.WriteXmlHead();
            Response.Write(provinceAreas);
        }
        [WebMethod]
        public void GetByCityName()
        {
            var provincecityName = Request.GetString("provincecity");
            var provinceFilePath = Server.MapPath(@"/Province.txt");

            var provinceReader = new ProvinceFileReader(provinceFilePath);
            var cityCode = provinceReader.GetByProvinceCityName(provincecityName);
            var code = cityCode.Substring(0, 6);
            Response.Write(code);
        }
        [WebMethod]
        public void GetAllocatedInfo()
        {
            var outsourcingID = Request.GetInt("ID") == null ? 0 : Request.GetInt("ID").Value;
            Database
                .Projects
                .GetByOutsourcingID(outsourcingID, Database)
                 .Query(Request.GetProjectQueryInformation(User), User, Database)
                .Show(outsourcingID, User, Database, Response);
        }
    }
}
