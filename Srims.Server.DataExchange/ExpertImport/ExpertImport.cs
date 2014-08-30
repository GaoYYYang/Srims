using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Data;
using System.IO;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.DataExchange;
using Srims.Server.DataExchange.PaperImport;

using Srims.Server.DataAccess;

namespace Srims.Server.DataExchange.ExpertImport
{
    public static class ExpertImport
    {
        /// <summary>
        /// 导入专家
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string ImportExpert(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "ExpertImportLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();

            var writer = httpContext.GetLogWriter(logName);

            string fileName = "Expert";
            DataSet ds = postedFile.GetDataFromUploadFile(httpContext, fileName);

            StringBuilder ExpertImportLog = new StringBuilder();
            StringBuilder ExpertImportId = new StringBuilder();
            StringBuilder ExpertUpdateLog = new StringBuilder();
            StringBuilder ExpertDepartmentNotMatchLog = new StringBuilder();
            StringBuilder ExpertNumberAndNameNotMatchLog = new StringBuilder();

            int importExpertCount = 0;//导入专家个数
            int updateExpertCount = 0;//更新专家个数

            foreach (DataRow row in ds.Tables[fileName].Rows)
            {
                database = Database.New();

                string expertNumber = row[0].ToString().Trim();
                string expertName = row[1].ToString().Trim();
                string expertBirthdayString = row[7].ToString().Trim();
                string expertSex = row[6].ToString().Trim();
                string expertIDCardNumber = row[5].ToString().Trim();
                string expertCollege = row[2].ToString().Trim();
                string expertDepartment = row[3].ToString().Trim();
                //  string nation = row[8].ToString().Trim();
                string policy = row[8].ToString().Trim();
                string expertAcademyDegree = row[10].ToString().Trim();

                string expertPost = row[15].ToString().Trim();

                string expertOfficePhone = row[12].ToString().Trim();

                string expertMobilePhone = row[13].ToString().Trim();
                string expertEmail = row[14].ToString().Trim();

                try
                {
                    //保存专家信息
                    Expert expert = database.Experts.SingleOrDefault(q => q.Number == expertNumber);
                    if (expert == null)
                        expert = new Expert();

                    bool expertIsNew = expert.IsNew;

                    if (!expert.IsNew)
                    {
                        if (expert.Name != expertName)
                        {
                            ExpertNumberAndNameNotMatchLog.AppendFormat("专家姓名和工作证号不一致，工作证号为：{0}，原专家姓名为：{1}，现在专家姓名为：{2}\n", expert.Number, expert.Name, expertName);

                            continue;
                        }
                    }

                    expert.Number = expertNumber;
                    expert.Name = expertName;

                    if (string.IsNullOrEmpty(expertBirthdayString))
                        expert.Birthday = expert.IsNew ? null : expert.Birthday;
                    else
                        expert.Birthday = Convert.ToDateTime(expertBirthdayString);

                    expert.Sex = expert.IsNew ? expertSex.GetSexType() : string.IsNullOrEmpty(expertSex) ? expert.Sex : expertSex.GetSexType();
                    expert.IDCardNumber = expertIDCardNumber.ConfirmValue(expert.IDCardNumber, expert.IsNew);

                    expert.Department = expertDepartment.ConfirmValue(expert.Department == null ? string.Empty : expert.Department.Name, expert.IsNew).GetDepartment(database);
                    expert.College = expertCollege.ConfirmValue(expert.College == null ? string.Empty : expert.College.Name, expert.IsNew).GetCollege(database);

                    expert.AcademyDegree = expertAcademyDegree.ConfirmValue(expert.AcademyDegree, expert.IsNew);

                    if (string.IsNullOrEmpty(expertPost))
                        expert.PostNew = expert.IsNew ? null : expert.PostNew;
                    else
                        expert.PostNew = expertPost;



                    expert.IsAgreeLicence = expert.IsNew ? false : expert.IsAgreeLicence;
                    expert.IsChinese = expert.IsNew ? true : expert.IsChinese;
                    expert.IsDeleted = expert.IsNew ? false : expert.IsDeleted;
                    expert.IsDoctorDirector = expert.IsNew ? false : expert.IsDoctorDirector;
                    expert.IsOnjob = expert.IsNew ? true : expert.IsOnjob;
                    expert.OfficePhone = expertOfficePhone == null ? expert.OfficePhone : expertOfficePhone;
                    expert.MobilePhone = expertMobilePhone == null ? expert.MobilePhone : expertMobilePhone;
                    expert.Email = expertEmail == null ? expert.Email : expertEmail;


                    expert.Policy = policy == null ? expert.Policy : policy;

                    expert.Save(database);

                    if (expertIsNew)
                    {
                        importExpertCount++;
                        ExpertImportId.AppendFormat("Id为：{0}，职工号为：{1}\n；", expert.ID, expert.Number);
                    }
                    else
                    {
                        updateExpertCount++;
                        ExpertUpdateLog.AppendFormat("更新专家职工号为：{0}。\n", expert.Number);
                    }
                    //if (expert.Department == null)
                    //   ExpertDepartmentNotMatchLog.AppendFormat("部门不匹配专家职工号为：{0}；部门名称为：{1}。\n", expert.Number, expertDepartment);
                }
                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入专家发生错误，专家职工号为{0}，错误信息为：{1}", expertNumber, e.Message));
                }
            }
            ExpertImportLog.AppendFormat("成功更新和导入专家{0}位：其中更新专家{1}位；添加专家{2}位。\n", importExpertCount + updateExpertCount, updateExpertCount, importExpertCount);
            ExpertImportLog.AppendFormat("添加专家ID为：\n{0}\n", ExpertImportId.ToString());
            ExpertImportLog.AppendFormat("更新专家详细信息为：\n{0}", ExpertUpdateLog.ToString());
            ExpertImportLog.AppendFormat("以下专家对应所属部门不匹配，请检查写法是否规范。\n{0}", ExpertDepartmentNotMatchLog.ToString());
            ExpertImportLog.AppendFormat("以下专家工作证号和姓名不匹配的信息\n{0}", ExpertNumberAndNameNotMatchLog.ToString());


            Log.Write(user.Name, (int)(LogType.ExpertImport), ExpertImportLog.ToString(), request.UserHostAddress, "专家导入", database);

            writer.WriteLine("成功更新和导入专家{0}位：其中更新专家{1}位；添加专家{2}位。\n", importExpertCount + updateExpertCount, updateExpertCount, importExpertCount);
            writer.WriteLine();
            writer.WriteLine();
            writer.WriteLine("添加专家ID为：\n{0}\n", ExpertImportId.ToString());
            writer.WriteLine();
            writer.WriteLine();
            writer.WriteLine("更新专家详细信息为：\n{0}", ExpertUpdateLog.ToString());
            writer.WriteLine("以下专家对应所属部门不匹配，请检查写法是否规范。\n{0}", ExpertDepartmentNotMatchLog.ToString());
            writer.WriteLine("以下专家工作证号和姓名不匹配的信息。\n{0}", ExpertNumberAndNameNotMatchLog.ToString());


            httpContext.DeleteFile(postedFile.FileName);
            writer.Close();

            return logName;
        }
    }
}