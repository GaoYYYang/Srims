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

namespace Srims.Server.DataExchange.ExpertUpdate
{
    public static class ExpertUpdate
    {
        /// <summary>
        /// 导入专家
        /// </summary>
        /// <param name="httpContext"></param>
        /// <param name="postedFile"></param>
        /// <param name="request"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static string UpdateExpert(this HttpContext httpContext, HttpPostedFile postedFile, HttpRequest request, User user)
        {
            IDatabase database = Database.New();
            string logName = "ExpertUpdateLog" + DateTime.Now.ToLongDateString().ToString() + Guid.NewGuid().ToString();

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

                string expertNumber = row[5].ToString().Trim();
                string expertName = row[0].ToString().Trim();

                string expertDepartment = row[4].ToString().Trim();
                //  string nation = row[8].ToString().Trim();


                string expertOfficePhone = row[1].ToString().Trim();

                string expertMobilePhone = row[2].ToString().Trim();
                string expertEmail = row[3].ToString().Trim();

                try
                {
                    if (expertNumber == "")
                    {
                        //保存专家信息
                        Expert expert = database.Experts.SingleOrDefault(q => q.Name == expertName && q.College.Name == expertDepartment);

                        if (expert == null)
                        {
                            Expert expert2 = database.Experts.SingleOrDefault(q => q.Name == expertName);
                            if (expert2 == null)
                            {
                                writer.WriteLine(string.Format("更新专家发生错误，专家职工名为{0}，在数据库中没有找到此专家或者专家的学院不对应！", expertName));
                            }
                            else
                            {
                                expert = expert2;
                                expert.Name = expertName;


                                expert.Department = expertDepartment.ConfirmValue(expert.Department == null ? string.Empty : expert.Department.Name, expert.IsNew).GetDepartment(database);
                                //   expert.College = expertCollege.ConfirmValue(expert.College == null ? string.Empty : expert.College.Name, expert.IsNew).GetCollege(database);

                                //   expert.AcademyDegree = expertAcademyDegree.ConfirmValue(expert.AcademyDegree, expert.IsNew);





                                expert.OfficePhone = expertOfficePhone == null ? expert.OfficePhone : expertOfficePhone;
                                expert.MobilePhone = expertMobilePhone == null ? expert.MobilePhone : expertMobilePhone;
                                expert.Email = expertEmail == null ? expert.Email : expertEmail;




                                expert.Save(database);


                                updateExpertCount++;
                                ExpertUpdateLog.AppendFormat("更新专家职工名为：{0}。\n", expert.Name);

                            }
                        }
                        else
                        {
                            //    expert.Number = expertNumber;
                            expert.Name = expertName;


                            expert.Department = expertDepartment.ConfirmValue(expert.Department == null ? string.Empty : expert.Department.Name, expert.IsNew).GetDepartment(database);
                            //   expert.College = expertCollege.ConfirmValue(expert.College == null ? string.Empty : expert.College.Name, expert.IsNew).GetCollege(database);

                            //   expert.AcademyDegree = expertAcademyDegree.ConfirmValue(expert.AcademyDegree, expert.IsNew);





                            expert.OfficePhone = expertOfficePhone == null ? expert.OfficePhone : expertOfficePhone;
                            expert.MobilePhone = expertMobilePhone == null ? expert.MobilePhone : expertMobilePhone;
                            expert.Email = expertEmail == null ? expert.Email : expertEmail;




                            expert.Save(database);


                            updateExpertCount++;
                            ExpertUpdateLog.AppendFormat("更新专家职工名为：{0}。\n", expert.Name);

                            //if (expert.Department == null)
                            //   ExpertDepartmentNotMatchLog.AppendFormat("部门不匹配专家职工号为：{0}；部门名称为：{1}。\n", expert.Number, expertDepartment);
                        }
                    }
                    else
                    {
                        Expert expert3 = database.Experts.SingleOrDefault(q => q.Number == expertNumber);
                        if (expert3 == null)
                        {
                            writer.WriteLine(string.Format("更新专家发生错误，专家职工名为{0}，根据学号在数据库中没有找到此专家！", expertName));
                        }
                        else {
                           
                            expert3.Name = expertName;


                            expert3.Department = expertDepartment.ConfirmValue(expert3.Department == null ? string.Empty : expert3.Department.Name, expert3.IsNew).GetDepartment(database);
                            //   expert.College = expertCollege.ConfirmValue(expert.College == null ? string.Empty : expert.College.Name, expert.IsNew).GetCollege(database);

                            //   expert.AcademyDegree = expertAcademyDegree.ConfirmValue(expert.AcademyDegree, expert.IsNew);





                            expert3.OfficePhone = expertOfficePhone == null ? expert3.OfficePhone : expertOfficePhone;
                            expert3.MobilePhone = expertMobilePhone == null ? expert3.MobilePhone : expertMobilePhone;
                            expert3.Email = expertEmail == null ? expert3.Email : expertEmail;




                            expert3.Save(database);


                            updateExpertCount++;
                            ExpertUpdateLog.AppendFormat("更新专家职工名为：{0}。\n", expert3.Name);
                        }
                    }
                }

                catch (Exception e)
                {
                    writer.WriteLine(string.Format("导入专家发生错误，专家职工名为{0}，错误信息为：{1}", expertName, e.Message));
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