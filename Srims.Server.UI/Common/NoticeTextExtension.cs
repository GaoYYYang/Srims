using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

using Srims.Server.Business;
using Srims.Server.Business.Common;

using Srims.Server.UI.HttpExtension;
using Srims.Server.UI.MISExtension;

namespace Srims.Server.UI.Common
{
    /// <summary>
    /// 提示文本相关扩展
    /// </summary>
    public static class NoticeTextExtension
    {
        private class treeNode
        {
            public string _id;
            public string _text;
            public string _value;
            public bool _leaf;
            public List<treeNode> _child;
            public treeNode(string id, string text, bool leaf, List<treeNode> child, string value)
            {
                this._id = id;
                this._text = text;
                this._leaf = leaf;
                this._child = child;
                this._value = value;
            }
        }
        /// <summary>
        /// 提示文本显示扩展
        /// </summary>
        /// <param name="noticeText"></param>
        /// <param name="response"></param>
        public static void ShowNoticeText(NoticeText noticeText, HttpResponse response)
        {
            response.WriteTagWithValue("Value", noticeText.Value);
            response.WriteTagWithValue("ValueSpell", noticeText.ValueSpell);
            response.WriteTagWithValue("Type", noticeText.Type);
        }
        /// <summary>
        /// 提示文本列表显示扩展
        /// </summary>
        /// <param name="noticeTextList"></param>
        /// <param name="response"></param>
        public static void Show(this IList<NoticeText> noticeTextList, HttpResponse response)
        {
            ShowDelegate<NoticeText> showDelegate = new ShowDelegate<NoticeText>(ShowNoticeText);
            noticeTextList.Show<NoticeText>(response, showDelegate);
        }
        /// <summary>
        /// 提示文本书的显示扩展
        /// </summary>
        /// <param name="response"></param>
        /// <param name="database"></param>
        public static void ShowTreeNode(HttpResponse response, IDatabase database)
        {
            List<treeNode> treeNodesProject = new List<treeNode> { new treeNode("11", "项目研究类型", true, null, "ProjectResearchType"), new treeNode("12", "项目合作类型", true, null, "ProjectCooperationType")
                , new treeNode("13", "驳回理由", true, null, "RejectReason") };

            List<treeNode> treeNodesExpert = new List<treeNode> { new treeNode("21", "民族", true, null, "Nation"), new treeNode("22", "政治面貌", true, null, "Policy")
                , new treeNode("23", "专家学历", true, null, "AcaedemyDegree"), new treeNode("24", "专家职称", true, null, "ExpertPost")
                , new treeNode("25", "外语语种", true, null, "ForeignLanguage"), new treeNode("26", "熟练程度", true, null, "LanguageLevel") };

            List<treeNode> treeNodesBase = new List<treeNode> { new treeNode("41", "基地主管部门", true, null, "BaseAdministration"), new treeNode("42", "基地级别", true, null, "BaseRank") };

            List<treeNode> treeNodesAward = new List<treeNode> { new treeNode("51", "奖励级别", true, null,"AwardRank"), new treeNode("52", "奖励等级", true, null,"AwardClass")
                , new treeNode("53", "奖励参与类型", true, null,"AwardAttendType") ,new treeNode("54", "奖励种类", true, null,"AwardClassification")
                ,new treeNode("55", "奖励授奖单位", true, null,"AwardAuthorisedUnit")};

            List<treeNode> treeNodesPatent = new List<treeNode> { new treeNode("71", "专利国别", true, null, "PatentCountry"), new treeNode("72", "专利分类", true, null, "PatentCategory") };

            List<treeNode> treeNodesSubject = new List<treeNode> { new treeNode("81", "学科等级", true, null, "SubjectRank"), new treeNode("82", "学科分类", true, null, "SubjectClass") };
            List<treeNode> treeNodes = new List<treeNode> { new treeNode("1", "项目", false, treeNodesProject,""), new treeNode("2", "专家", false, treeNodesExpert,"")
                , new treeNode("3", "文档名称", true, null,"DocumentName"),new treeNode("4","基地",false,treeNodesBase,"")
                ,new treeNode("5","奖励",false,treeNodesAward,""),new treeNode("6","论文级别",true,null,"PaperRank")
                ,new treeNode("7","专利分类",true,treeNodesPatent,"PatentCategory"),new treeNode("8", "学科", true, treeNodesSubject,"")
                ,new treeNode("9", "所属学院", true, null,"Lab"),new treeNode("10", "发票类型", true, null,"InvoiceType")};

            response.WriteBegin();

            foreach (var nodes in treeNodes)
            {

                response.WriteChildBegin();
                response.WriteIdAndText(nodes._id, nodes._text);
                if (nodes._child != null)
                {
                    response.WriteChildrenWithNoValue();
                    showTreeNodeChild(response, nodes._child, database);

                }
                else
                {
                    try
                    {
                        NoticeTextType type = (NoticeTextType)Enum.Parse(typeof(NoticeTextType), nodes._value);
                        if (NoticeTextQueryExtension.Get(database.NoticeTexts, type).Count() == 0)
                            response.WriteLeaf();
                        else
                        {
                            response.WriteChildrenWithNoValue();
                            showNoticeTypeLeaf(database, type, response);
                        }
                    }
                    catch
                    {
                        response.WriteLeaf();
                    }
                }

                response.WriteChildEnd(nodes._id == treeNodes.Last()._id);
            }
            response.WriteEnd();
        }

        private static void showNoticeTypeLeaf(IDatabase database, NoticeTextType type, HttpResponse response)
        {
            IList<NoticeText> noticeText = NoticeTextQueryExtension.Get(database.NoticeTexts, type);
            response.WriteBegin();
            foreach (var noticeTextNode in noticeText)
            {
                response.WriteChildBegin();
                response.WriteIdAndText(noticeTextNode.ID.ToString(), noticeTextNode.Value);
                response.WriteLeaf();
                response.WriteChildEnd(noticeTextNode.ID == noticeText.Last().ID);
            }
            response.WriteEnd();
        }
        private static void showTreeNodeChild(HttpResponse response, List<treeNode> child, IDatabase database)
        {
            response.WriteBegin();
            foreach (var nodes in child)
            {
                response.WriteChildBegin();
                response.WriteIdAndText(nodes._id, nodes._text);
                if (nodes._child == null)
                {
                    try
                    {
                        NoticeTextType type = (NoticeTextType)Enum.Parse(typeof(NoticeTextType), nodes._value);
                        if (NoticeTextQueryExtension.Get(database.NoticeTexts, type).Count() == 0)
                            response.WriteLeaf();
                        else
                        {
                            response.WriteChildrenWithNoValue();
                            showNoticeTypeLeaf(database, type, response);
                        }
                    }
                    catch
                    {
                        response.WriteLeaf();
                    }
                }
                else
                {
                    response.WriteChildrenWithNoValue();
                    showTreeNodeChild(response, nodes._child, database);
                }
                response.WriteChildEnd(nodes._id == child.Last()._id);
            }
            response.WriteEnd();
        }
    }
}
