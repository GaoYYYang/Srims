
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.PatentStatisticWindow = function(id){

    this._id = id;
    this._title = '专利统计';
    this._url = Srims.service.statistic.StatisticsService + '/Patent';
    this._iconCls = iconCls = 'icon-statistic-patent';
    
    this._dimensionPanel = new Srims.statistic.DimensionSelectForm(Srims.statistic.PatentStatisticWindow.dimension);
    this._basicPanel = new Srims.patents.PatentQueryWindow_BasicPanel();
    this._otherPanel = new Srims.patents.PatentQueryWindow_OtherPanel();
    this._expertPanel = new Srims.patents.PatentQueryWindow_ExpertPanel();
    
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
            Srims.common.newView(Srims.common.ViewType.PatentStatic, Srims.SetQueryParams.toJSON(params));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            Srims.common.showViewWindow(Srims.common.ViewType.PatentStatic);
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
    
    Srims.statistic.PatentStatisticWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: this._iconCls,
        width: 725,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        height: 560,
        closeAction: 'hide',
        stateful: false,
        layout: 'column',
        resizable: false,
        items: [new Ext.Panel({
            width: 700,
            layout: 'form',
            labelWidth: 100,
            autoHeight: false,
            height: 480,
            deferredRender: false,
            autoScroll: true,
            items: [this._dimensionPanel, this._basicPanel, this._otherPanel, this._expertPanel]
        })],
        buttons: [this._buttonStatistic, this._buttonExport, this._buttonSaveAsView, this._buttonShowView, this._buttonReset, this._buttonClose]
    });
    
    this.isValid = function(){
        var result = true;
        
        result = this._dimensionPanel.isValid() && result;
        
        return result;
    }
    this.getParams = function(){
        var params = {};
        
        this._dimensionPanel.buildParams(params);
        this._basicPanel.buildParams(params);
        this._otherPanel.buildParams(params);
        this._expertPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._dimensionPanel.clearParams();
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._expertPanel.clearParams();
    }
}
Ext.extend(Srims.statistic.PatentStatisticWindow, Ext.Window);

Srims.statistic.PatentStatisticWindow.dimension = new Array(['申请时间', 'ApplicationDateTime'], ['授权时间', 'AuthorizeDateTime'], ['法律状态', 'LawState'], ['法律状态时间', 'LawStateTime'], ['分类', 'Category'], ['类别', 'Type'], ['等级', 'Level'], ['所属学院', 'College'], ['发明人', 'Principal']);
Srims.statistic.PatentStatisticWindow.dimension.sizes = new Array();
Srims.statistic.PatentStatisticWindow.dimension.sizes[0] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[1] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[2] = new Array(['法律状态', 'LawState']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[3] = new Array(['年', 'Year'], ['年月', 'YearMonth'], ['年月日', 'YearMonthDay']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[4] = new Array(['分类', 'Category']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[5] = new Array(['类别', 'Type']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[6] = new Array(['等级', 'Level']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[7] = new Array(['所属学院', 'College']);
Srims.statistic.PatentStatisticWindow.dimension.sizes[8] = new Array(['专家', 'Expert'], ['学院', 'College']);
