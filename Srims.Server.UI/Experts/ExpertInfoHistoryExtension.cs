using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Experts;
using Srims.Server.Business.Users;
using Srims.Server.Business.Common;

using Srims.Server.UI;
using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;
using Srims.Server.DataAccess;
using System.Web;
using MIS.Common.Query;

namespace Srims.Server.UI.Experts
{
    /// <summary>
    /// 专家历史信息扩展
    /// </summary>
    public static class ExpertInfoHistoryExtension
    {
        /// <summary>
        /// 显示专家历史信息
        /// </summary>
        /// <param name="expertInfoHistory"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void ShowExpertInfoHistory(this ExpertInfoHistory expertInfoHistory, HttpResponse response, User user, IDatabase database)
        {
            response.WriteTagWithValue("ID", expertInfoHistory.ID);
            response.WriteTagWithValue("ExpertID", expertInfoHistory.ExpertID);
            response.WriteTagWithValue("ExpertName", expertInfoHistory.Expert.Name);
            response.WriteTagWithValue("PropertyName", expertInfoHistory.PropertyName);
            var expert = database.Experts.GetByID(expertInfoHistory.ExpertID);
            var propertyOldValue = expertInfoHistory.GetHistoryOldValue(expert, expertInfoHistory.PropertyName);
            response.WriteTagWithValue("PropertyValueType", expertInfoHistory.PropertyValueType);
            switch (expertInfoHistory.PropertyValueType)
            {
                case ExpertInfoHistoryPropertyValueType.Boolean:
                    {
                        string oldValue = (propertyOldValue as bool?).HasValue ? ((propertyOldValue as bool?).Value ? "是" : "否") : "未知";
                        string newValue = expertInfoHistory.PropertyBooleanValue.HasValue ? expertInfoHistory.PropertyBooleanValue.Value.ToString() : string.Empty;
                        writeValue(response, oldValue, newValue);
                        response.WriteTagWithValue("PropertyValueRender", expertInfoHistory.PropertyStringValue);
                        break;
                    }
                case ExpertInfoHistoryPropertyValueType.DateTime:
                    {
                        string oldValue = (propertyOldValue as DateTime?).HasValue ? string.Format("{0:yyyy年MM月dd日}", (propertyOldValue as DateTime?).Value) : string.Empty;
                        string newValue = expertInfoHistory.PropertyDateTimeValue.HasValue ? expertInfoHistory.PropertyDateTimeValue.Value.ToString() : string.Empty;
                        writeValue(response, oldValue, newValue);
                        break;
                    }
                case ExpertInfoHistoryPropertyValueType.Entity:
                    {
                        string oldValue = propertyOldValue == null ? string.Empty : propertyOldValue.ToString();
                        string newValue = expertInfoHistory.PropertyIntValue.HasValue ? expertInfoHistory.PropertyIntValue.Value.ToString() : string.Empty;
                        writeValue(response, oldValue, newValue);
                        response.WriteTagWithValue("PropertyValueRender", expertInfoHistory.PropertyStringValue);
                        break;
                    }
                case ExpertInfoHistoryPropertyValueType.Guid:
                    {
                        string oldValue = propertyOldValue == null ? string.Empty : propertyOldValue.ToString();
                        string newValue = expertInfoHistory.PropertyGuildValue.HasValue ? expertInfoHistory.PropertyGuildValue.Value.ToString() : string.Empty;
                        writeValue(response, oldValue, newValue);
                        break;
                    }
                case ExpertInfoHistoryPropertyValueType.Int:
                    {
                        string oldValue = propertyOldValue == null ? string.Empty : propertyOldValue.ToString();
                        string newValue = expertInfoHistory.PropertyIntValue.HasValue ? expertInfoHistory.PropertyIntValue.Value.ToString() : string.Empty;
                        writeValue(response, oldValue, newValue);
                        break;
                    }
                case ExpertInfoHistoryPropertyValueType.LongText:
                    {
                        string oldValue = propertyOldValue == null ? string.Empty : propertyOldValue.ToString();
                        string newValue = expertInfoHistory.PropertyLongStringValue;
                        writeValue(response, oldValue, newValue);
                        break;
                    }
                case ExpertInfoHistoryPropertyValueType.Text:
                    {
                        string oldValue = propertyOldValue == null ? string.Empty : propertyOldValue.ToString();
                        string newValue = expertInfoHistory.PropertyStringValue;
                        writeValue(response, oldValue, newValue);
                        break;
                    }
                default: break;
            }
            
            response.WriteTagWithValue("HasPermission_CensorReject", user.HasPermisssion_CensorRejectExpertEdit(database));
            response.WriteTagWithValue("HasPermission_CensorPass", user.HasPermisssion_CensorPassExpertEdit(database));
            response.WriteTagWithValue("CanCensorReject", user.CanCensorRejectExpertEdit(expertInfoHistory, database));
            response.WriteTagWithValue("CanCensorPass", user.CanCensorPassExpertEdit(expertInfoHistory, database));
            response.WriteTagWithValue("HasPermission_Show", user.HasPermisssion_ShowExpertInfoHistory(database));
            response.WriteTagWithValue("CanShow", user.CanShowExpertInfoHistory(expertInfoHistory, database));
        }

        private static void writeValue(HttpResponse response, string oldValue, string newValue)
        {
            response.WriteTagWithValue("PropertyOldValue", oldValue);
            response.WriteTagWithValue("PropertyValue", newValue);
        }
        /// <summary>
        /// 显示专家历史信息查询结果
        /// </summary>
        /// <param name="resultList"></param>
        /// <param name="response"></param>
        /// <param name="user"></param>
        /// <param name="database"></param>
        public static void Show(this QueryResult<ExpertInfoHistory> resultList, HttpResponse response, User user, IDatabase database)
        {
            ShowDelegateWithUserAndDatabase<ExpertInfoHistory> showDelegate = new ShowDelegateWithUserAndDatabase<ExpertInfoHistory>(ShowExpertInfoHistory);
            resultList.Show<ExpertInfoHistory>(response, user, database, showDelegate);
        }
        /// <summary>
        /// 取得查询信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static ExpertInfoHistoryQueryInformation GetExpertInfoHistoryQueryInformation(this HttpRequest request)
        {
            ExpertInfoHistoryQueryInformation queryInformation = new ExpertInfoHistoryQueryInformation();
            queryInformation.Start = request.GetQueryInformation_Start();
            queryInformation.Limit = request.GetQueryInformation_Limit();

            return queryInformation;
        }
    }
}
