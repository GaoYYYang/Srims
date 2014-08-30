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
    /// <summary>
    /// 论文导入
    /// </summary>
    public static class PaperImport
    {
        /// <summary>
        /// 论文导入
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        public static string ImportPaper(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "PaperImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();
            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Paper";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder importLog = new StringBuilder();
            StringBuilder paperImportLog = new StringBuilder();
            StringBuilder paperImportId = new StringBuilder();
            StringBuilder paperUpdateLog = new StringBuilder();

            StringBuilder paperIndexLog = new StringBuilder();

            StringBuilder magazineId = new StringBuilder();
            StringBuilder magazineImportLog = new StringBuilder();
            StringBuilder magazineUpdateLog = new StringBuilder();

            StringBuilder expertMatchString = new StringBuilder();

            int importPaperCount = 0;//导入论文个数
            int updatePaperCount = 0;//更新论文个数（论文收录）
            int importMagazineCount = 0;//导入杂志数目
            int updateMagazineCount = 0;//更新杂志数目

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                #region 取出字段值
                string magazinePublishType = row[0].ToString().Trim();
                string authorList = row[1].ToString();
                string authorNameChinaList = row[2].ToString().Trim();
                string firstAuthorSignUnit = row[3].ToString().Trim();
                string signUnitOrder = row[4].ToString().Trim();
                string collegeName = row[5].ToString().Trim();
                string lab = row[6].ToString().Trim();
                string authorPinList = row[7].ToString();
                string paperName = row[8].ToString();
                string magazineName = row[9].ToString().Replace("&", "and");
                string serires = row[10].ToString();
                string magazineLanguage = row[11].ToString().Trim();
                string paperType = row[12].ToString();
                string authorKeyword = row[13].ToString();
                string keyword = row[14].ToString();
                string paperAbstract = row[15].ToString();
                string linkManAddress = row[16].ToString();
                string linkMan = row[17].ToString();
                string linkManChinese = row[18].ToString();
                string linkManSignUnit = row[19].ToString();
                string linkManEmail = row[20].ToString();
                string bibliography = row[21].ToString();//参考文献
                string bibliographyCount = row[22].ToString();
                string citeFrequency = row[23].ToString().Trim();
                string publishCompany = row[24].ToString().Trim();
                string publishCompanyCity = row[25].ToString().Trim();
                string publishCompanyAddress = row[26].ToString().Trim();
                string ISSN = row[27].ToString().Trim();
                string DI = row[28].ToString().Trim();
                string magazineShortName = row[29].ToString().Trim();
                string magazineISIShortName = row[30].ToString().Trim();
                string publisdDate = row[31].ToString();
                string publichYear = row[32].ToString().Trim();
                string volume = row[33].ToString().Trim();//卷
                string documentNumber = row[34].ToString().Trim();//期
                string partNumber = row[35].ToString().Trim();
                string supplement = row[36].ToString().Trim();
                string specialIssue = row[37].ToString().Trim();
                string pageBegin = row[38].ToString().Trim();
                string pageEnd = row[39].ToString().Trim();
                string articleNumber = row[40].ToString().Trim();
                string pages = row[41].ToString().Trim();
                string subjectClass = row[42].ToString().Trim();
                string indexes = row[43].ToString().Trim();
                string ISIDocumentDeliveryNO = row[44].ToString().Trim();
                string ISIUnique = row[45].ToString().Trim();
                #endregion

                database = Database.New();

                bool isPaperNew = false;
                bool isMagazineNew = false;

                Object oldPaper = new Object();
                Object oldMagazine = new Object();

                try
                {
                    #region 保存杂志信息

                    Magazine magazine = null;
                    //保存杂志基本信息
                    if (!string.IsNullOrEmpty(ISSN))
                    {
                        magazine = getMagazine(ISSN, database);
                        if (magazine == null)
                        {
                            isMagazineNew = true;
                            magazine = new Magazine();
                        }
                        else
                            oldMagazine = magazine.Clone();

                        if (!string.IsNullOrEmpty(magazineName))
                            magazine.FullName = magazineName;

                        if (!string.IsNullOrEmpty(ISSN))
                            magazine.ISSN = ISSN;

                        if (!string.IsNullOrEmpty(magazineLanguage))
                            magazine.Language = magazineLanguage.GetLanguage();

                        if (!string.IsNullOrEmpty(publishCompany))
                            magazine.PublishCompany = publishCompany;

                        if (!string.IsNullOrEmpty(publishCompanyAddress))
                            magazine.PublishCompanyAddress = publishCompanyAddress;

                        if (!string.IsNullOrEmpty(publishCompanyCity))
                            magazine.PublishCompanyCity = publishCompanyCity;

                        if (!string.IsNullOrEmpty(magazinePublishType))
                            magazine.PublishType = magazinePublishType.GetPublishType();

                        if (!string.IsNullOrEmpty(magazineShortName))
                            magazine.ShortName = magazineShortName;

                        magazine.Save(database);

                        if (isMagazineNew)
                        {
                            importMagazineCount++;
                            magazineImportLog.AppendFormat("成功导入杂志：{0}，杂志的ISSN为：{1}\n", magazine.FullName, magazine.ISSN);
                            magazineId.AppendFormat("{0},", magazine.ID);
                        }

                        if (!isMagazineNew)
                        {
                            var description = Log.GetEditOperationDescription(oldMagazine, magazine, Magazine.GetMagazineDescriptionItems(), false);

                            if (!string.IsNullOrEmpty(description.Trim()))
                            {
                                updateMagazineCount++;
                                magazineUpdateLog.AppendFormat("编辑杂志的ISSN为：{0}，编辑详细信息为：{1}", magazine.ISSN, description);
                            }
                        }


                        //保存杂志的学科分类
                        var subjectClasses = database.MagazineSubjectClasses.Where(q => q.Magazine.ISSN == ISSN).Select(q => q.SubjectClass).Distinct().ToList();
                        var subjectClassChineseEnglish = database.SubjectClassChineseEnglishs.SingleOrDefault(q => q.EnglishName.Trim() == subjectClass);

                        if (subjectClassChineseEnglish != null)
                        {
                            var subjectClassChinese = subjectClassChineseEnglish.ChineseName;
                            if (!subjectClasses.Contains(subjectClassChinese))
                            {
                                MagazineSubjectClass magazineSubjectClass = new MagazineSubjectClass
                                {
                                    Magazine = magazine,
                                    SubjectClass = subjectClassChinese
                                };

                                magazineSubjectClass.Save(database);
                            }
                        }
                    }
                    #endregion

                    List<PaperIndexedType> paperIndexTypeArray = indexes.GetPaperIndex();

                    //根据论文的ISI号取得论文
                    Paper paper = getPaperByISI(ISIUnique, database);

                    if (paper == null)
                    {
                        paper = new Paper();
                        isPaperNew = true;
                    }
                    else
                    {
                        oldPaper = paper.Clone();
                        //如果论文已经存在，增加收录
                        if (!string.IsNullOrEmpty(indexes))
                            addPaperIndexed(paper, paperIndexTypeArray, paperIndexLog, database);
                    }

                    //保存论文基本信息
                    if (!string.IsNullOrEmpty(paperName))
                        paper.Name = paperName;
                    if (string.IsNullOrEmpty(paper.Name))
                        continue;

                    if (!string.IsNullOrEmpty(citeFrequency))
                        paper.CiteFrequency = Convert.ToInt32(citeFrequency);

                    if (!string.IsNullOrEmpty(documentNumber))
                        paper.DocumentNumber = documentNumber;

                    int endPage;
                    if (!string.IsNullOrEmpty(pageEnd))
                    {
                        if (int.TryParse(pageEnd, out endPage))
                            paper.EndPage = Convert.ToInt32(pageEnd);
                    }

                    if (!string.IsNullOrEmpty(linkManAddress))
                        paper.LinkManAddress = linkManAddress;

                    if (!string.IsNullOrEmpty(linkMan))
                        paper.LinkManEmail = linkManEmail;

                    if (!string.IsNullOrEmpty(pages))
                        paper.Pages = Convert.ToInt32(pages);

                    if (!string.IsNullOrEmpty(publichYear))
                        paper.PublishDateYear = Convert.ToInt32(publichYear);

                    if (!string.IsNullOrEmpty(publisdDate))
                        paper.PublishDate = publisdDate;

                    int startPage;
                    if (!string.IsNullOrEmpty(pageBegin))
                        if (int.TryParse(pageEnd, out startPage))
                            paper.StartPage = Convert.ToInt32(pageBegin);

                    if (!string.IsNullOrEmpty(paperType))
                        paper.Type = paperType.GetPaperType();

                    if (!string.IsNullOrEmpty(volume))
                        paper.Volume = volume;

                    if (!string.IsNullOrEmpty(collegeName))
                        paper.College = collegeName.GetCollege(database);

                    if (!string.IsNullOrEmpty(linkManSignUnit))
                        paper.LinkManSignUnit = linkManSignUnit.GetSignUnit();

                    if (!string.IsNullOrEmpty(firstAuthorSignUnit))
                        paper.FirstAuthorSignUnit = firstAuthorSignUnit.GetSignUnit();

                    if (!string.IsNullOrEmpty(signUnitOrder))
                        paper.SignOrder = Convert.ToInt32(signUnitOrder);

                    if (!string.IsNullOrEmpty(ISIUnique))
                        paper.ISIUniqueArticleIdentifier = ISIUnique;

                    if (!string.IsNullOrEmpty(keyword))
                        paper.KeyWord = keyword;

                    if (!string.IsNullOrEmpty(authorKeyword))
                        paper.AuthorKeyWord = authorKeyword;

                    if (!string.IsNullOrEmpty(paperAbstract))
                        paper.Abstract = paperAbstract;

                    if (!string.IsNullOrEmpty(lab))
                        paper.Lab = lab;

                    string remark = string.Empty;
                    if (!string.IsNullOrEmpty(articleNumber))
                        remark += "ArticleNumber:" + articleNumber + ";";
                    if (!string.IsNullOrEmpty(bibliography))
                        remark += "参考文献：" + bibliography + ";";
                    if (!string.IsNullOrEmpty(bibliographyCount))
                        remark += "参考文献数目：" + bibliographyCount + ";";
                    if (!string.IsNullOrEmpty(DI))
                        remark += "DI:" + DI + ";";
                    if (!string.IsNullOrEmpty(ISIDocumentDeliveryNO))
                        remark += "ISIDocumentDeliveryNO:" + ISIDocumentDeliveryNO + ";";

                    if (!string.IsNullOrEmpty(remark))
                        paper.Remark = remark;

                    //保存论文的杂志冗余
                    if (magazine == null && !string.IsNullOrEmpty(magazineName))
                        paper.ResourceName = magazineName;
                    else if (magazine != null)
                    {
                        paper.Magazine = magazine;
                        var magazineInformation = database.MagazineInformations.SingleOrDefault(q => q.MagazineID == magazine.ID && q.Year == Convert.ToInt32(publichYear));

                        paper.InfluenceFactor = magazineInformation == null ? null : magazineInformation.InfluenceFactor;
                        paper.SubAirer = magazineInformation == null ? null : magazineInformation.SubAirer;
                    }

                    paper.Save(database);

                    if (isPaperNew)
                    {
                        paperImportLog.AppendFormat("成功导入论文：{0}，论文的ISI为：{1}\n", paper.Name, paper.ISIUniqueArticleIdentifier);
                        importPaperCount++;
                        paperImportId.AppendFormat("{0}；", paper.ID);
                    }

                    if (!isPaperNew)
                    {
                        var description = Log.GetEditOperationDescription(oldPaper, paper, Paper.GetPaperDescriptionItems(), false);

                        if (!string.IsNullOrEmpty(description.Trim()))
                        {
                            updatePaperCount++;
                            paperUpdateLog.AppendFormat("编辑论文的ISI为：{0}，编辑详细信息为：{1}", paper.ISIUniqueArticleIdentifier, description);
                        }
                    }

                    //保存论文作者信息
                    linkMan = linkMan.GetLinkMan();
                    int order = 1;
                    bool hasLinkMan = false;
                    string[] paperAuthorArray = authorList.Split(new char[] { ';' }, StringSplitOptions.RemoveEmptyEntries);
                    string[] paperAuthorChinaNameArray = authorNameChinaList.Split(new char[] { '；' }, StringSplitOptions.RemoveEmptyEntries);

                    if (paperAuthorArray.Count() > 0)
                    {
                        //如果论文已经存在，删除原来的作者
                        if (!isPaperNew)
                        {
                            var paperAuthors = database.PaperAuthors.GetByPaperID(paper.ID);
                            foreach (var paperAuthor in paperAuthors)
                                paperAuthor.Delete(database);
                        }

                        foreach (var paperAuthor in paperAuthorArray)
                        {
                            PaperAuthor author = new PaperAuthor();

                            author.EnglishName = paperAuthor;

                            if (paperAuthorChinaNameArray.Length >= order)
                                author.Name = paperAuthorChinaNameArray[order - 1].ToString();

                            if (!string.IsNullOrEmpty(author.Name))
                            {
                                author.IsLinkMan = author.Name.Trim() == linkManChinese.Trim() && !hasLinkMan;
                                if (author.IsLinkMan)
                                    hasLinkMan = true;
                            }

                            author.Expert = string.IsNullOrEmpty(author.Name) ? null : author.Name.GetExpert(paper.CollegeID, database, expertMatchString, paper.Name);
                            author.Paper = paper;
                            author.Order = order++;

                            author.Save(database);
                        }
                    }

                    //当论文为新添加时，保存论文收录信息
                    if (isPaperNew && !string.IsNullOrEmpty(indexes))
                        foreach (var paperIndexType in paperIndexTypeArray)
                        {
                            PaperIndexed paperIndexed = new PaperIndexed();
                            paperIndexed.Indexed = paperIndexType;
                            paperIndexed.Paper = paper;

                            paperIndexed.Save(database);
                        }
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入论文发生错误，论文名称为{0}，错误信息为：{1}", paperName, e.Message));
                }
            }

            importLog.AppendFormat("成功更新论和导入论文{0}篇：其中更新论文{1}篇；添加论文{2}篇。添加杂志{3},更新杂志{4}。\n", importPaperCount + updatePaperCount, updatePaperCount, importPaperCount, importMagazineCount, updateMagazineCount);
            importLog.AppendFormat("更新论文详细信息为：\n{0}", paperUpdateLog.ToString());
            importLog.AppendFormat("更新论文收录的详细信息为：\n{0}", paperIndexLog.ToString());
            importLog.AppendFormat("更新杂志的详细信息为：\n{0}", magazineUpdateLog.ToString());
            importLog.AppendFormat("添加杂志的详细信息为：\n{0}", magazineImportLog.ToString());
            importLog.AppendFormat("添加论文ID为：\n{0}\n", paperImportId.ToString());
            importLog.AppendFormat("添加杂志ID为：\n{0}\n", magazineId.ToString());
            Log.Write(user.Name, (int)(LogType.paperImport), paperImportLog.ToString(), request.UserHostAddress, "论文导入", database);

            writer.WriteLine("成功更新论和导入论文{0}篇：其中更新论文{1}篇；添加论文{2}篇。添加杂志{3},更新杂志{4}。\n", importPaperCount + updatePaperCount, updatePaperCount, importPaperCount, importMagazineCount, updateMagazineCount);
            writer.WriteLine();
            writer.WriteLine();
            writer.WriteLine("更新论文详细信息为：\n{0}", paperUpdateLog.ToString());
            writer.WriteLine("更新论文收录的详细信息为：\n{0}", paperIndexLog.ToString());
            writer.WriteLine("更新杂志的详细信息为：\n{0}", magazineUpdateLog.ToString());
            writer.WriteLine("添加杂志的详细信息为：\n{0}", magazineImportLog.ToString());
            writer.WriteLine();
            writer.WriteLine();
            writer.WriteLine("论文作者匹配情况：{0}", expertMatchString);


            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }

        private static Paper getPaperByISI(string ISIUnique, IDatabase database)
        {
            if (string.IsNullOrEmpty(ISIUnique))
                return null;

            return database
                .Papers
                .SingleOrDefault(p => p.ISIUniqueArticleIdentifier.Trim() == ISIUnique);
        }
        private static void addPaperIndexed(Paper paper, List<PaperIndexedType> paperIndexedTypeArray, StringBuilder paperIndexLog, IDatabase database)
        {
            List<PaperIndexedType> paperAlreadyIndexedTypes = paper.GetPaperIndexeds(database.PaperIndexeds).Select(q => q.Indexed).ToList();

            foreach (var newPaperIndexedType in paperIndexedTypeArray)
            {
                if (paperAlreadyIndexedTypes.Contains(newPaperIndexedType))
                    continue;

                //当收录文SCICD时，则将SCI网络升级为SCICD
                if (newPaperIndexedType == PaperIndexedType.SCICD)
                {
                    var oldPaperIndexed = database.PaperIndexeds.SingleOrDefault(q => q.PaperID == paper.ID && q.Indexed == PaperIndexedType.SCINetWork);
                    if (oldPaperIndexed != null)
                    {
                        oldPaperIndexed.Indexed = PaperIndexedType.SCICD;
                        oldPaperIndexed.Save(database);
                        paperIndexLog.AppendFormat("更新论文收录：SCI网络升级为SCICD。论文名为：{0}，论文ISI为：{1}。\n", paper.Name, paper.ISIUniqueArticleIdentifier);
                        continue;
                    }
                }

                PaperIndexed paperIndexed = new PaperIndexed();
                paperIndexed.Indexed = newPaperIndexedType;
                paperIndexed.Paper = paper;
                paperIndexed.Save(database);
                paperIndexLog.AppendFormat("添加论文收录：{0}。论文名为：{1}，论文ISI为：{2}。\n", newPaperIndexedType, paper.Name, paper.ISIUniqueArticleIdentifier);
            }
        }
        private static Magazine getMagazine(string ISSN, IDatabase database)
        {
            return database.Magazines.SingleOrDefault(m => m.ISSN == ISSN && m.IsDelete == false);
        }
    }
}
