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

using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.Common;
using Srims.Server.UI.HttpExtension;

namespace Srims.WebSite.Service.Common
{
    [WebService(Namespace = "http://srims.ouc.edu.cn/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [ToolboxItem(false)]
    public class NoticeTextService : WebServiceBase
    {
        [WebMethod]
        public void Get()
        {
            Response.WriteXmlHead();
            Database
                .NoticeTexts
                .Get(Request.GetEnum<NoticeTextType>("Type"))
                .Show(Response);
        }
        [WebMethod]
        public void GetTreeLoaderUrl()
        {
            NoticeTextExtension.ShowTreeNode(Response, Database);
        }

        [WebMethod]
        public void SearchNoticeText()
        {
            var noticeType = Request.GetEnum<NoticeTextType>("type");
            string keyWord = Request.GetString("Query");
            if (!string.IsNullOrEmpty(keyWord) && keyWord.Contains(","))
                keyWord = keyWord.Substring(keyWord.LastIndexOf(',') + 1);

            Response.WriteXmlHead();
            Database
                .NoticeTexts
                .SearchNoticeText(noticeType, keyWord)
                .Show(Response);
        }
        [WebMethod]
        public void Save()
        {
            var noticeTextType = Request.GetEnum<NoticeTextType>("Type");
            var noticeTexts = Request.GetString("Value");
            //首先将原来提示文本删除
            var oldNoticeTexts = Database.NoticeTexts.Get(noticeTextType);
            foreach (var oldNoticeText in oldNoticeTexts)
                oldNoticeText.Delete(Database);

            var noticeTextList = Database.NoticeTexts.NoticeTexts(noticeTextType, noticeTexts);
            foreach (var noticeText in noticeTextList)
                noticeText.Save(Database);
        }
    }
}
