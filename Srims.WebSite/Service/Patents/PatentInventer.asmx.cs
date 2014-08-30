using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.ComponentModel;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.Patents;
using Srims.Server.Business;
using Srims.Server.Business.Patents;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;
using System.Transactions;

namespace Srims.WebSite.Service.Patents
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class PatentInventerService : WebServiceBase
    {
        [WebMethod]
        public void GetByPatentID()
        {
            var patentID = Request.GetInt("patentId").Value;

            var patent = Database.Patents.GetByID(patentID);
            if (!User.CanShowPatentInventer(patent, Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .PatentInventers
                .GetByPatentID(patentID)
               .Show(Response);
        }
        [WebMethod]
        public void SavePatentInventer()
        {
            var oldPatentInventer = Request.GetOldPatentInventer(Database);
            var patentInventer = Request.GetPatentInventer(Database);
            using (TransactionScope ts = new TransactionScope())
            {
                var patent = Database.Patents.GetByID(Request.GetInt("patentId").Value);
                var description = "";
                if (patentInventer.IsNew)
                    description = string.Format("添加专利号为：{0}的专利的发明人", patent.Number) + Log.GetEditOperationDescription(oldPatentInventer, patentInventer, PatentInventer.GetPatentInventerDescriptionItems(), patentInventer.IsNew);
                else
                    description = string.Format("对ID为：{0}的发明人做如下修改：\n", patentInventer.ID)
                       + Log.GetEditOperationDescription(oldPatentInventer, patentInventer, PatentInventer.GetPatentInventerDescriptionItems(), patentInventer.IsNew)
                       + string.Format("\n此发明人对应的专利号为：{0}，ID为：{1}。", patent.Number, patent.ID);
                Log.Write(User.Name, patentInventer.IsNew ? (int)LogType.PatentInventerAdd : (int)LogType.PatentInventerEdit, description, Request.UserHostAddress, patentInventer.IsNew ? "添加发明者" : "编辑发明者", Database);

                patentInventer.Save(Database);
                ts.Complete();
            }
        }
        [WebMethod]
        public void DeletePatentInventer()
        {
            var patentInventer = Request.GetEntity<PatentInventer>(Database.PatentInventers, "patentInventerID");

            if (patentInventer != null)
            {
                using (TransactionScope ts = new TransactionScope())
                {
                    var patent = Database.Patents.GetByID(Request.GetInt("patentId").Value);
                    var description = string.Format("删除专利号为：{0}的专利的发明者；\n 删除的发明者名称为：{1}，位次为：{2}。", patent.Number, patentInventer.Name, patentInventer.Order);
                    Log.Write(User.Name, (int)LogType.PatentInventerDelete, description, Request.UserHostAddress, "删除专利发明者", Database);

                    patentInventer.Delete(Database);
                    ts.Complete();
                }
            }
        }
    }
}
