
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.AwardStatisticWindow = function(id){

    this._id = id;
    this._title = '奖励统计';
    this._url = Srims.service.statistic.StatisticsService + '/Award';
    this._iconCls = iconCls = 'icon-statistic-award';
    
    this._dimensionPanel = new Srims.statistic.DimensionSelectForm(Srims.statistic.AwardStatisticWindow.dimension);
    this._basicPanel = new Srims.awards.AwardQueryWindow_BasicPanel();
    this._otherPanel = new Srims.awards.AwardQueryWindow_OtherPanel();
    this._winnerPanel = new Srims.awards.AwardQueryWindow_ExpertPanel();
    
    this._buttonStatistic = new Ext.Button({
        minWidth: 80,
        text: '统 计',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.showResult(this._title, this._iconCls, response, this._renderer);
                }
            });
        }
    });
    this._buttonExport = new Ext.Button({
        minWidth: 80,
        text: '导 出',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            Srims.statistic.showLoadingAnimation(window._title);
            Ext.Ajax.request({
                url: window._url,
                scope: window,
                params: window.getParams(),
                success: function(response){
                    Srims.statistic.exportToExcel(this._title, response, this._renderer);
                }
            });
        }
    });
    this._buttonSaveAsView = new Ext.Button({
        minWidth: 80,
        text: '保存为视图',
        window: this,
        handler: function(){
            var window = this.window;
            if (!window.isValid()) 
                return;
            
            var params = window.getParams();
            Srims.common.newView(Srims.common.ViewType.AwardStatic, Srims.SetQueryParams.toJSON(params));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            Srims.common.showViewWindow(Srims.common.ViewType.AwardStatic);
            this.window.hide();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function(){
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '关 闭',
        window: this,
        handler: function(){
            var window = this.window;
            window.hide();
        }
    });
    
    Srims.statistic.AwardStatisticWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: this._iconCls,
        width: 725,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        height: 500,
        closeAction: 'hide',
        stateful: false,
        autoScroll: true,
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            layout: 'form',
            labelWidth: 100,
            deferredRender: false,
            items: [this._dimensionPanel, this._basicPanel, this._otherPanel, this._winnerPanel]
        })],
        buttons: [this._buttonStatistic, this._buttonExport, this._buttonSaveAsView, this._buttonShowView, this._buttonReset, this._buttonClose]
    });
    
    this.isValid = function(){
        var result = true;
        
        result = this._dimensionPanel.isValid() && result;
        result = this._basicPanel.isValid(false) && result;
        
        return result;
    }
    this.getParams = function(){
        var params = {};
        
        this._dimensionPanel.buildParams(params);
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._winnerPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._dimensionPanel.clearParams();
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._winnerPanel.clearParams();
    }
}
Ext.extend(Srims.statistic.AwardStatisticWindow, Ext.Window);

Srims.statistic.AwardStatisticWindow.dimension = new Array(['获奖年份', 'Year'], ['级别', 'RankClass'], ['参与类型', 'AttendType'], ['授奖单位', 'AuthorisedUnit'], ['奖种', 'Classification'], ['获奖人', 'Winner']);
Srims.statistic.AwardStatisticWindow.dimension.sizes = new Array();
Srims.statistic.AwardStatisticWindow.dimension.sizes[0] = new Array(['年', 'Year']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[1] = new Array(['等级', 'Rank'], ['类别', 'Class'], ['类别与奖种', 'Classification']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[2] = new Array(['参与类型', 'AttendType']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[3] = new Array(['授奖单位', 'AuthorisedUnit']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[4] = new Array(['奖种', 'Classification']);
Srims.statistic.AwardStatisticWindow.dimension.sizes[5] = new Array(['专家', 'Expert'], ['学院', 'College']);
