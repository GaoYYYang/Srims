
if (!Srims.statistic) 
    Ext.namespace('Srims.statistic');

Srims.statistic.PaperStatisticWindow = function(id){

    this._id = id;
    this._title = '论文统计';
    this._url = Srims.service.statistic.StatisticsService + '/Paper';
    this._iconCls = iconCls = 'icon-statistic-paper';
    
    this._dimensionPanel = new Srims.statistic.DimensionSelectForm(Srims.statistic.PaperStatisticWindow.dimension);
    this._basicPanel = new Srims.papers.PaperQueryWindow_BasicPanel();
    this._otherPanel = new Srims.papers.PaperQueryWindow_OtherPanel();
    this._magazinePanel = new Srims.papers.PaperQueryWindow_MagazinePanel();
    this._expertPanel = new Srims.papers.PaperQueryWindow_ExpertPanel();
    
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
            Srims.common.newView(Srims.common.ViewType.PaperStatic, Srims.SetQueryParams.toJSON(params));
        }
    });
    this._buttonShowView = new Ext.Button({
        minWidth: 80,
        text: '使用视图',
        window: this,
        handler: function(){
            Srims.common.showViewWindow(Srims.common.ViewType.PaperStatic);
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
    
    Srims.statistic.PaperStatisticWindow.superclass.constructor.call(this, {
        id: this._id,
        title: this._title,
        iconCls: this._iconCls,
        width: 728,
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        height: 550,
        closeAction: 'hide',
        layout: 'column',
        stateful: false,
        resizable: false,
        items: [new Ext.Panel({
            width: 700,
            layout: 'form',
            labelWidth: 100,
            autoHeight: false,
            height: 480,
            deferredRender: false,
            autoScroll: true,
            items: [this._dimensionPanel, this._basicPanel, this._otherPanel, this._magazinePanel, this._expertPanel]
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
        this._magazinePanel.buildParams(params);
        this._expertPanel.buildParams(params);
        
        return params;
    }
    this.clearParams = function(){
        this._dimensionPanel.clearParams();
        this._basicPanel.clearParams();
        this._otherPanel.clearParams();
        this._magazinePanel.clearParams();
        this._expertPanel.clearParams();
    }
}
Ext.extend(Srims.statistic.PaperStatisticWindow, Ext.Window);

Srims.statistic.PaperStatisticWindow.dimension = new Array(['发表年份', 'PublishDateYear'], ['SCI&EI收录', 'Indexed'], ['所属学院', 'College'], ['通讯作者', 'LinkMan'], ['第一作者', 'FirstAuthor'], ['类型', 'Type'], ['分区', 'SubAirer']);
Srims.statistic.PaperStatisticWindow.dimension.sizes = new Array();
Srims.statistic.PaperStatisticWindow.dimension.sizes[0] = new Array(['年', 'Year']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[1] = new Array(['SCI&EI收录', 'Indexed']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[2] = new Array(['所属学院', 'College']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[3] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[4] = new Array(['专家', 'Expert'], ['学院', 'College']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[5] = new Array(['类型', 'Type']);
Srims.statistic.PaperStatisticWindow.dimension.sizes[6] = new Array(['分区', 'SubAirer']);
