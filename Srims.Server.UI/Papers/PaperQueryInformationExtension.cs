using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business.Papers;

using Srims.Server.UI.Experts;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Papers
{
    /// <summary>
    /// 论文查询信息扩展
    /// </summary>
    public static class PaperQueryInformationExtension
    {
        /// <summary>
        /// 取得论文查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static PaperQueryInformation GetPaperQueryInformation(this HttpRequest request)
        {
            var paperQueryInformation = new PaperQueryInformation();
            paperQueryInformation.Start = request.GetQueryInformation_Start();
            paperQueryInformation.Limit = request.GetQueryInformation_Limit();
            paperQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            paperQueryInformation.Basic = request.getPaperQueryInformation_Basic();
            paperQueryInformation.Author = request.getPaperQueryInformation_Author();
            paperQueryInformation.Indexed = request.getPaperQueryInformation_Indexted();
            paperQueryInformation.Magazine = request.getPaperQueryInformation_Magazine();

            return paperQueryInformation;
        }
        private static PaperQueryInformation_Basic getPaperQueryInformation_Basic(this HttpRequest request)
        {
            var basic = new PaperQueryInformation_Basic();
            basic.CiteFrequency = request.GetIntRange("CiteFrequencyOfPaper");
            basic.College = request.GetString("CollegeName");
            basic.FistAuthorSignUnit = request.GetEnumList<SignUnit>("FirstAuthorSignUnit");
            basic.InfluenceFactor = request.GetIntRange("InfluenceFactorOfPaper");
            basic.Lab = request.GetString("Lab");
            basic.LinkManSingUnit = request.GetEnumList<SignUnit>("LinkManSignUnit");
            basic.Name = request.GetString("Name");
            basic.PaoerKeyWord = request.GetString("KeyWord");
            basic.PulishDateTimeYear = request.GetIntRange("PublishYear");
            basic.Type = request.GetEnumList<PaperType>("Type");
            basic.SubAirer = request.GetIntRange("SubAirer");
            basic.IsFistAuthorOrLinkManSignUnit = request.GetBoolean("IsFistAuthorOrLinkManSignUnit");

            if (basic.isSetQueryInformation())
                return basic;

            return null;
        }
        private static bool isSetQueryInformation(this PaperQueryInformation_Basic queryInformation)
        {
            return !queryInformation.CiteFrequency.IsEmptyOrNull<int>()
                || !queryInformation.College.IsEmptyOrNull()
                || !queryInformation.InfluenceFactor.IsEmptyOrNull<int>()
                || !queryInformation.Lab.IsEmptyOrNull()
                || !queryInformation.Name.IsEmptyOrNull()
                || !queryInformation.PaoerKeyWord.IsEmptyOrNull()
                || !queryInformation.PulishDateTimeYear.IsEmptyOrNull<int>()
                || !queryInformation.SubAirer.IsEmptyOrNull<int>()
                || !queryInformation.Type.IsEmptyOrNull()
                || !queryInformation.FistAuthorSignUnit.IsEmptyOrNull()
                || !queryInformation.LinkManSingUnit.IsEmptyOrNull()
                || !queryInformation.IsFistAuthorOrLinkManSignUnit.IsEmptyOrNull();
        }

        private static PaperQueryInformation_Indexed getPaperQueryInformation_Indexted(this HttpRequest request)
        {
            var indexed = new PaperQueryInformation_Indexed();
            indexed.Indexed = request.GetEnumList<PaperIndexedType>("Indexed");

            if (indexed.isSetQueryInformation())
                return indexed;

            return null;
        }
        private static bool isSetQueryInformation(this PaperQueryInformation_Indexed queryInformation)
        {
            return !queryInformation.Indexed.IsEmptyOrNull();
        }

        private static PaperQueryInformation_Author getPaperQueryInformation_Author(this HttpRequest request)
        {
            var author = new PaperQueryInformation_Author();

            var firstAuthorName = request.GetString("FirstAuthorName");
            var linkManName = request.GetString("LinkManName");
            author.AuthorOrder = firstAuthorName.IsEmptyOrNull() ? request.GetInt("AuthorOrder") : 1;
            author.IsLinkMan = linkManName.IsEmptyOrNull() ? request.GetBoolean("IsLinkMan") : true;
            author.PaperAuthorName = firstAuthorName.IsEmptyOrNull() ? (linkManName.IsEmptyOrNull() ? request.GetString("PaperAuthorName") : linkManName) : firstAuthorName;
            author.ExpertAuthorQueryInformation = request.GetExpertQueryInformation_Basic();

            if (author.isSetQueryInformation())
                return author;

            return null;
        }
        private static bool isSetQueryInformation(this PaperQueryInformation_Author queryInformation)
        {
            return !queryInformation.AuthorOrder.IsEmptyOrNull()
                || !queryInformation.IsLinkMan.IsEmptyOrNull()
                || !queryInformation.PaperAuthorName.IsEmptyOrNull()
                || queryInformation.ExpertAuthorQueryInformation != null;
        }

        private static PaperQueryInformation_Magazine getPaperQueryInformation_Magazine(this HttpRequest request)
        {
            var magazine = new PaperQueryInformation_Magazine();
            magazine.MagazineBasic = request.getMagazineQueryInformation_Basic();
            magazine.MagazineInfor = request.getMagazineQueryInformation_Infor();
            magazine.SubjectClass = request.getMagazineQueryInformation_SubjectClass();

            if (magazine.isSetQueryInformation())
                return magazine;

            return null;
        }
        private static bool isSetQueryInformation(this PaperQueryInformation_Magazine queryInformation)
        {
            return queryInformation.MagazineBasic != null
                || queryInformation.MagazineInfor != null
                || queryInformation.SubjectClass != null;
        }
    }
}
