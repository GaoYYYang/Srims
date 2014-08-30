
if (!Srims.awards) 
    Ext.namespace("Srims.awards");

Srims.awards.AwardGridPanel_ColumnModel = function(){

    Srims.awards.AwardGridPanel_ColumnModel.superclass.constructor.call(this, [{
        header: "id",
        dataIndex: 'id',
        //sortable: true,
        //hideable: true
        hidden: true,
        hideable: false
    }, {
        header: "奖励名称",
        dataIndex: 'name',
        sortable: true,
        hidden: false,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "年度",
        dataIndex: 'year',
        width: 30,
        sortable: true,
        hidden: false
    }, {
        header: "获奖项目名称",
        dataIndex: 'projectName',
        sortable: true,
        hidden: true,
        renderer: function(value){
            return String.format('<span title="{0}">{0}</span>', value);
        }
    }, {
        header: "奖种",
        dataIndex: 'classification',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "等级",
        dataIndex: 'class',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "奖励级别",
        dataIndex: 'rank',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "第一获奖人",
        dataIndex: 'awardFirstWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "第二获奖人",
        dataIndex: 'awardSecondWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "第三获奖人",
        dataIndex: 'awardThirdWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "第四获奖人",
        dataIndex: 'awardFourthWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "第五获奖人",
        dataIndex: 'awardFifthWinnerName',
        width: 40,
        sortable: false,
        hidden: false
    }, {
        header: "参与类型",
        dataIndex: 'attendType',
        width: 40,
        sortable: true,
        hidden: false
    }, {
        header: "授奖单位",
        dataIndex: 'authorisedUnit',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "学科性质",
        dataIndex: 'subjectNature',
        width: 60,
        renderer: Srims.subjectNatureRender,
        hidden: true
    }, {
        header: "所属学院",
        dataIndex: 'collegeName',
        width: 60,
        sortable: true,
        hidden: true
    }, {
        header: "简介",
        dataIndex: 'introduction',
        width: 60,
        sortable: false,
        hidden: true
    }]);
    
    this.defaultSortable = false;
}
Ext.extend(Srims.awards.AwardGridPanel_ColumnModel, Ext.grid.ColumnModel);
