using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;

using Srims.Server.UI;
using Srims.Server.UI.Experts;
using Srims.Server.Business.Experts;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.Users;
using Srims.Server.UI.MISExtension;
using MIS.Common.Query;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Experts
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    public class DepartmentWebService : WebServiceBase
    {

        [WebMethod]
        public void GetAllColleges()
        {
            Response.WriteXmlHead();
            Database
              .Departments
              .GetColleges()
              .Show(Response);
        }
        [WebMethod]
        public void GetAllDepartment()
        {
            Response.WriteXmlHead();
            Database
                .Departments
                .ToList()
                .Show(Response);
        }
        [WebMethod]
        public void QueryDepartment()
        {
            Response.WriteXmlHead();
            Database.Departments.Query(Request.GetDepartmentQueryInformation()).Show(Response, User, Database);
        }
        [WebMethod]
        public void SaveDepartment()
        {
            var oldDepartment = Request.GetOldEntity(Database, User);
            var department = Request.GetDepartment(Database, User);
            using (TransactionScope ts = new TransactionScope())
            {
                var description = department.IsNew ? "添加" : "编辑";
                description += string.Format("部门\n   对应的部门名称为：{0}。", department.Name)
                    + Log.GetEditOperationDescription(oldDepartment, department, Department.GetDescriptionItems(), department.IsNew);
                Log.Write(User.Name, department.IsNew ? (int)LogType.DepartmentAdd : (int)LogType.DepartmentEdit, description, Request.UserHostAddress, department.IsNew ? "添加学院" : "编辑学院", Database);
                department.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void IsDepartmentCodeExist()
        {
            Database.Departments
                .IsDepartmentCodeUsed(Request.GetString("Code"), Request.GetInt("departmentID"))
                .Show(Response);
        }
        [WebMethod]
        public void IsDepartmentNameExist()
        {
            Database.Departments
                .IsDepartmentNameExist(Request.GetString("Name"), Request.GetInt("departmentID"))
                .Show(Response);
        }
        [WebMethod]
        public void CanCollegeEdit()
        {
            var department = Request.GetEntity(Database.Departments, "departmentId");
            User.CanClearCollege(department, Database).Show(Response);
        }
    }
}