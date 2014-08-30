using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Srims.Server.Business;
using Srims.Server.Business.Patents;

namespace Srims.Server.DataExchange.PatentImport
{
    public static class PatentImportHelper
    {
        /// <summary>
        /// 取得专利类型
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public static PatentType GetPatentType(this string type)
        {
            switch (type)
            {
                case "发明专利": return PatentType.Invention;
                case "实用新型": return PatentType.Application;
                case "外观设计": return PatentType.Design;
                default: return PatentType.Unknown;

            }
        }
        /// <summary>
        /// 取得专利法律状态
        /// </summary>
        /// <param name="lawState"></param>
        /// <returns></returns>
        public static PatentLawState GetPatentLawState(this string lawState)
        {
            switch (lawState)
            {
                case "PCT阶段": return PatentLawState.PCT;
                case "驳回": return PatentLawState.Reject;
                case "撤回": return PatentLawState.Cancel;
                case "公开": return PatentLawState.Publish;
                case "实审": return PatentLawState.Censor;
                case "视为撤回": return PatentLawState.TreatCancel;
                case "受理": return PatentLawState.AcceptCase;
                case "授权": return PatentLawState.Accredit;
                case "专利权放弃": return PatentLawState.Abandon;
                case "专利权恢复": return PatentLawState.Resume;
                case "专利权终止": return PatentLawState.End;
                default: return PatentLawState.Unknown;

            }
        }
    }
}
