using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;

using Srims.Server.Business;
using Srims.Server.Business.Papers;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.DataAccess;
namespace Srims.Server.DataExchange.PaperImport
{
    public static class LiberalArtsPaperImport
    {
        /// <summary>
        /// 论文导入
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        public static string ImportLiberalArtsPaper(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "LiberalArtsPaperImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);

            string fileName = "LiberalArtsPaper";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder importLog = new StringBuilder();
            StringBuilder paperImportLog = new StringBuilder();
            StringBuilder paperImportId = new StringBuilder();
            StringBuilder paperUpdateLog = new StringBuilder();

            StringBuilder paperIndexLog = new StringBuilder();



            StringBuilder expertMatchString = new StringBuilder();

            int importPaperCount = 0;//导入论文个数
            int updatePaperCount = 0;//更新论文个数（论文收录）

            database = Database.New();
            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
               
                string PublishDateYear = row[0].ToString().Trim();
                string SerialNumbe = row[1].ToString();
                string ResultsName = row[2].ToString();
                string Type = row[3].ToString().Trim();
                string EnglishName = row[4].ToString();
                string Degree = row[5].ToString();
                string AuthorList = row[6].ToString().Trim();
                string ResultsForm = row[7].ToString();
                string Fund = row[8].ToString().Trim();
                string Publisher = row[9].ToString();
                string ISSN = row[10].ToString();
                string FirstOrganization = row[11].ToString();
                string OurSchoolSignRank = row[12].ToString();
                string OrganizationName = row[13].ToString();
                string Region = row[14].ToString();
                string SubjectClass = row[15].ToString();
                string FirstAuthor = row[16].ToString();
                string College = row[17].ToString().Trim();
                string CODEN = row[18].ToString().Trim();
                string IssuesDate = row[19].ToString().Trim();
                string KeyWord = row[20].ToString().Trim();
                string Mark = row[21].ToString().Trim();
                string DegreeType = row[22].ToString().Trim();
                string FundType = row[23].ToString().Trim();
                string References = row[24].ToString().Trim();
                string CiteTime = row[25].ToString().Trim();
                bool isPaperNew = false;

                try
                {


                    
                    //根据论文的序号取得论文
                    LiberalArtsPaper paper = getPaperBySerialNumbe(SerialNumbe, database);

                    if (paper == null)
                    {
                        paper = new LiberalArtsPaper();
                        isPaperNew = true;
                    }


                    //保存论文基本信息
                    if (!string.IsNullOrEmpty(PublishDateYear))
                        paper.PublishDateYear = Convert.ToInt32(PublishDateYear);


                    if (!string.IsNullOrEmpty(SerialNumbe))
                        paper.SerialNumbe = SerialNumbe;


                    if (!string.IsNullOrEmpty(Degree))
                        paper.Degree = Degree;

                    if (!string.IsNullOrEmpty(ResultsName))
                        paper.ResultsName = ResultsName;


                    if (!string.IsNullOrEmpty(Type))
                    {
                        if (Type == "著作")
                            paper.Type = ResultsType.Book;
                        else if (Type == "CSSCI")
                            paper.Type = ResultsType.CSSCI;
                        else if (Type == "CSSCI扩展版")
                            paper.Type = ResultsType.CSSCIExten;


                    }


                    if (!string.IsNullOrEmpty(EnglishName))
                        paper.EnglishName = EnglishName;

                    if (!string.IsNullOrEmpty(ResultsForm))
                        paper.ResultsForm = ResultsForm;

                    if (!string.IsNullOrEmpty(Fund))
                        paper.Fund = Fund;

                    if (!string.IsNullOrEmpty(Publisher))
                        paper.Publisher = Publisher;



                    if (!string.IsNullOrEmpty(ISSN))
                        paper.ISSN = ISSN;

                    if (!string.IsNullOrEmpty(FirstOrganization))
                        paper.FirstOrganization = FirstOrganization;

                    if (!string.IsNullOrEmpty(OurSchoolSignRank))
                        paper.OurSchoolSignRank = Convert.ToInt32(OurSchoolSignRank);

                    if (!string.IsNullOrEmpty(OrganizationName))
                        paper.OrganizationName = OrganizationName;

                    if (!string.IsNullOrEmpty(Region))
                        paper.Region = Region;

                    if (!string.IsNullOrEmpty(SubjectClass))
                        paper.SubjectClass = SubjectClass;

                    if (!string.IsNullOrEmpty(College))
                        paper.College = database.Departments.SingleOrDefault(p => p.Name == College);

                    if (!string.IsNullOrEmpty(CODEN))
                        paper.CODEN = CODEN;

                    if (!string.IsNullOrEmpty(IssuesDate))
                        paper.IssuesDate = IssuesDate;

                    if (!string.IsNullOrEmpty(KeyWord))
                        paper.KeyWord = KeyWord;

                    if (!string.IsNullOrEmpty(Mark))
                        paper.Mark = Mark;


                    if (!string.IsNullOrEmpty(DegreeType))
                        paper.DegreeType = DegreeType;
                    if (!string.IsNullOrEmpty(FundType))
                        paper.FundType = FundType;
                    if (!string.IsNullOrEmpty(References))
                        paper.References = References;
                    if (!string.IsNullOrEmpty(CiteTime))
                        paper.CiteTime = Convert.ToInt32(CiteTime);
                    if (!string.IsNullOrEmpty(DegreeType))
                        paper.DegreeType = DegreeType;
                    if (paper.SerialNumbe == "11G041200205004")
                    {
                        var a = 1;
                    }
                    paper.Save(database);

                    if (isPaperNew)
                    {
                        paperImportLog.AppendFormat("成功导入论文：{0}，论文的序列号为：{1}\n", paper.ResultsName, paper.SerialNumbe);
                        importPaperCount++;
                        paperImportId.AppendFormat("{0}；", paper.ID);
                    }

                    if (!isPaperNew)
                    {
                        
                            updatePaperCount++;
                            paperUpdateLog.AppendFormat("成功编辑论文：{0}，论文的序列号为：{1}\n", paper.ResultsName, paper.SerialNumbe);
                        
                    }

                    //保存论文作者信息
                    
                    int order = 1;

                    string[] paperAuthorArray = AuthorList.Split(new char[] { '/' }, StringSplitOptions.RemoveEmptyEntries);

                    if (paperAuthorArray.Count() > 0)
                    {
                        //如果论文已经存在，删除原来的作者
                        if (!isPaperNew)
                        {
                            var LiberalArtsPaperAuthors = database.LiberalArtsPaperAuthors.GetByPaperID(paper.ID);
                            foreach (var LiberalArtsPaperAuthor in LiberalArtsPaperAuthors)
                                LiberalArtsPaperAuthor.Delete(database);
                        }

                        foreach (var paperAuthor in paperAuthorArray)
                        {
                            LiberalArtsPaperAuthor author = new LiberalArtsPaperAuthor();

                            author.Name = paperAuthor;


                            author.Expert = string.IsNullOrEmpty(author.Name) ? null : database.Experts.FirstOrDefault(p => p.Name == paperAuthor);
                            if (author.Expert != null)
                            {
                                author.EnglishName = author.Expert.NameSpell;
                            }
                            author.LiberalArtsPaper = paper;
                            author.Order = order++;

                            author.Save(database);
                        }
                    }

                    
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入论文发生错误，论文名称为{0}，错误信息为：{1}", ResultsName, e.Message));
                }
            }

            importLog.AppendFormat("成功更新论和导入论文{0}篇：其中更新论文{1}篇；添加论文{2}篇。\n", importPaperCount + updatePaperCount, updatePaperCount, importPaperCount);
            importLog.AppendFormat("更新论文详细信息为：\n{0}", paperUpdateLog.ToString());
           
            importLog.AppendFormat("添加论文ID为：\n{0}\n", paperImportId.ToString());
        
            Log.Write(user.Name, (int)(LogType.paperImport), paperImportLog.ToString(), request.UserHostAddress, "文科论文导入", database);

            writer.WriteLine("成功更新论和导入论文{0}篇：其中更新论文{1}篇；添加论文{2}篇。\n", importPaperCount + updatePaperCount, updatePaperCount, importPaperCount);
            writer.WriteLine();
            writer.WriteLine("添加论文详细信息为：\n{0}", paperImportLog.ToString());
            writer.WriteLine("更新论文详细信息为：\n{0}", paperUpdateLog.ToString());
           
        
            writer.WriteLine();
            writer.WriteLine();
         


            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }

        private static LiberalArtsPaper getPaperBySerialNumbe(string SerialNumbe, IDatabase database)
        {
            if (string.IsNullOrEmpty(SerialNumbe))
                return null;

            return database
                .LiberalArtsPapers
                .FirstOrDefault(p => p.SerialNumbe.Trim() == SerialNumbe);
        }

    }
}
