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
   public static  class LiberalArtsPaperQueryInformationExtension
    {
        /// <summary>
        /// 取得论文查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>public
        public static LiberalArtsPaperQueryInformation GetLiberalArtsPaperQueryInformation(this HttpRequest request)
        {
            var paperQueryInformation = new LiberalArtsPaperQueryInformation();
            paperQueryInformation.Start = request.GetQueryInformation_Start();
            paperQueryInformation.Limit = request.GetQueryInformation_Limit();
            paperQueryInformation.SortInfo = request.GetQueryCondition_SortInfo();

            paperQueryInformation.Basic = request.getLiberalArtsPaperQueryInformation_Basic();
            paperQueryInformation.Author = request.getPaperQueryInformation_Author();
            paperQueryInformation.OtherBasic = request.getLiberalArtsPaperQueryInformation_OtherBasic();

            return paperQueryInformation;
        }
        private static LiberalArtsPaperQueryInformation_Basic getLiberalArtsPaperQueryInformation_Basic(this HttpRequest request)
        {
            var basic = new LiberalArtsPaperQueryInformation_Basic();
            basic.PublishDateYear = request.GetString("PublishDateYear");
            basic.Degree = request.GetString("Degree");
            basic.ResultsName = request.GetString("ResultsName");
            basic.ResultsForm = request.GetString("ResultsForm");
            basic.Publisher = request.GetString("Publisher");
            
            basic.Type = request.GetEnumList<ResultsType>("ResultsType");
            basic.OurSchoolSignRank = request.GetIntRange("OurSchoolSignRank");
            if (basic.isSetQueryInformation())
                return basic;

            return null;
        }
        private static LiberalArtsPaperQueryInformation_OtherBasic getLiberalArtsPaperQueryInformation_OtherBasic(this HttpRequest request)
        {
            var basic = new LiberalArtsPaperQueryInformation_OtherBasic();
            basic.CODEN = request.GetString("CODEN");
            basic.DegreeType = request.GetString("DegreeType");
            basic.EnglishName = request.GetString("EnglishName");
            basic.FirstOrganization = request.GetString("FirstOrganization");
            basic.Fund = request.GetString("Fund");
            basic.ISSN = request.GetString("ISSN");
            basic.IssuesDate = request.GetString("IssuesDate");
            basic.KeyWord = request.GetString("KeyWord");
            basic.Mark = request.GetString("Mark");
            basic.OrganizationName = request.GetString("OrganizationName");
            basic.Region = request.GetString("Region");
            basic.CiteTime = request.GetIntRange("CiteTime");
            basic.SerialNumbe = request.GetString("SerialNumbe");
            basic.SubjectClass = request.GetString("SubjectClass");
            basic.CollegeName = request.GetString("collegeName");
            if (basic.isSetQueryInformation())
                return basic;

            return null;
        }
        private static bool isSetQueryInformation(this LiberalArtsPaperQueryInformation_Basic queryInformation)
        {
            return !queryInformation.PublishDateYear.IsEmptyOrNull()
                || !queryInformation.ResultsName.IsEmptyOrNull()
                || !queryInformation.OurSchoolSignRank.IsEmptyOrNull<int>()
               
                || !queryInformation.ResultsForm.IsEmptyOrNull()
                || !queryInformation.Publisher.IsEmptyOrNull()

                || !queryInformation.Type.IsEmptyOrNull();
                
        }
        private static bool isSetQueryInformation(this LiberalArtsPaperQueryInformation_OtherBasic queryInformation)
        {
            return !queryInformation.CODEN.IsEmptyOrNull()
                || !queryInformation.DegreeType.IsEmptyOrNull()
                || !queryInformation.EnglishName.IsEmptyOrNull()

                || !queryInformation.FirstOrganization.IsEmptyOrNull()
                || !queryInformation.IssuesDate.IsEmptyOrNull()
                || !queryInformation.KeyWord.IsEmptyOrNull()
                || !queryInformation.Fund.IsEmptyOrNull()
                || !queryInformation.ISSN.IsEmptyOrNull()
                || !queryInformation.Mark.IsEmptyOrNull()
                || !queryInformation.OrganizationName.IsEmptyOrNull()
                || !queryInformation.SerialNumbe.IsEmptyOrNull()
                || !queryInformation.SubjectClass.IsEmptyOrNull()
                || !queryInformation.CiteTime.IsEmptyOrNull<int>()
                || !queryInformation.CollegeName.IsEmptyOrNull()
                || !queryInformation.ISSN.IsEmptyOrNull();

        }
        

        private static PaperQueryInformation_Author getPaperQueryInformation_Author(this HttpRequest request)
        {
            var author = new PaperQueryInformation_Author();

            var firstAuthorName = request.GetString("FirstAuthorName");
            
            author.AuthorOrder = firstAuthorName.IsEmptyOrNull() ? request.GetInt("AuthorOrder"):1 ;
         
            author.PaperAuthorName = firstAuthorName.IsEmptyOrNull() ?  request.GetString("authors")  : firstAuthorName;
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

       
        
    }
}
