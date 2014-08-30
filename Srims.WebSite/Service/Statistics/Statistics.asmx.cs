using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Xml.Linq;
using System.Transactions;

using Srims.Server.Business.Users;
using Srims.Server.Business.Statistics;
using Srims.Server.Business.Projects;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Awards;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.Statistic;
using Srims.Server.UI.Projects;
using Srims.Server.UI.Papers;
using Srims.Server.UI.Patents;
using Srims.Server.UI.Awards;
using Srims.Server.UI.Fund;

namespace Srims.WebSite.Service.Statistics
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class StatisticsService : WebServiceBase
    {
        [WebMethod]
        public void ProjectCount()
        {
            if (!User.HasPermission_ProjectCountStatistic(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .StatisticProjectCount(Request.GetProjectQueryInformation(User), Request.GetDimension("Column"), Request.GetDimension("Row"))
                .ShowAsXml(Response);
        }
        [WebMethod]
        public void FundTotal()
        {
            if (!User.HasPermission_FundTotalStatistic(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .StatisticFundTotal(Request.GetProjectQueryInformation(User), Request.GetDimension("Column"), Request.GetDimension("Row"))
                .ShowAsXml(Response);
        }
        [WebMethod]
        public void FundDescend()
        {
            if (!User.HasPermission_FundDescendStatistic(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .StatisticFundDescend(Request.GetFundDescendQueryInformation(User), Request.GetDimension("Column"), Request.GetDimension("Row"))
                .ShowAsXml(Response);
        }
        [WebMethod]
        public void Voucher()
        {
            if (!User.HasPermission_VoucherStatistic(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .StatisticVoucher(Request.GetVoucherQueryInformation(User), Request.GetDimension("Column"), Request.GetDimension("Row"))
                .ShowAsXml(Response);
        }
        [WebMethod]
        public void Paper()
        {
            if (!User.HasPermission_PaperStatistic(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .StatisticPaper(Request.GetPaperQueryInformation(), Request.GetDimension("Column"), Request.GetDimension("Row"))
                .ShowAsXml(Response);
        }
        [WebMethod]
        public void Award()
        {
            if (!User.HasPermission_AwardStatistic(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .StatisticAward(Request.GetAwardQueryInformation(), Request.GetDimension("Column"), Request.GetDimension("Row"))
                .ShowAsXml(Response);
        }
        [WebMethod]
        public void Patent()
        {
            if (!User.HasPermission_PatentStatistic(Database))
                throw new HasNoPermissionException();

            Response.WriteXmlHead();
            Database
                .StatisticPatent(Request.GetPatentQueryInformation(), Request.GetDimension("Column"), Request.GetDimension("Row"))
                .ShowAsXml(Response);
        }
    }
}
