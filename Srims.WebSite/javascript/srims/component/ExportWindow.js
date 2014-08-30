

if (!Srims.component)
    Ext.namespace("Srims.component");

Srims.component.ExportWindow = function(id, queryUrl, params, items, title) {
    this._id = id;
    this._title = title;
    this._items = items;
    this._queryUrl = queryUrl;
    this._params = params;

    this._buttonClose = new Ext.Button({
        minWidth: 80,
        text: '取 消',
        window: this,
        handler: function() {
            var window = this.window;
            window.close();
        }
    });
    this._buttonReset = new Ext.Button({
        minWidth: 80,
        text: '重 置',
        window: this,
        handler: function() {
            var window = this.window;
            window.clearParams();
        }
    });
    this._buttonAll = new Ext.Button({
        minWidth: 80,
        text: '全 选',
        window: this,
        handler: function() {
            var window = this.window;
            window.selectAll();
        }
    });
    this._buttonExport = new Ext.Button({
        id: 'grid-excel-button',
        minWidth: 80,
        text: '导 出',
        window: this,
        storeQueryParams: this._params,
        storeQueryUrl: this._queryUrl,
        title: this._title,
        handler: function() {
            Ext.MessageBox.confirm('导出确认', '您将要进行的操作可能需要很长的时间，是否继续？', function(buttonId) {
                if (buttonId == 'yes') {
                    this.window.beginExport(this.title, this.storeQueryUrl, this.storeQueryParams, this.window);
                }
                else {
                    this.window.close();
                }
            }, this);

        }
    });

    Srims.component.ExportWindow.superclass.constructor.call(this, {
        id: this._id,
        title: '请选择要导出的列',
        style: 'padding:5px',
        deferredRender: false,
        frame: true,
        width: 800,
        autoHeight: true,
        closeAction: 'close',
        layout: 'form',
        buttonAlign: 'center',
        resizable: false,
        items: this._items,
        buttons: [this._buttonAll, this._buttonReset, this._buttonClose, this._buttonExport]
    });

    this.clearParams = function() {
        for (var i = 0; i < this._items.length; i++) {
            this._items[i]._checkboxGroup.reset();
            this._items[i].checkBox.reset();
        }
    }
    this.beginExport = function(title, storeQueryUrl, storeQueryParams, window) {
        var exportStoreXml = undefined;
        Srims.Load._showLoadingAnimation('数据');
        Ext.Ajax.request({
            url: storeQueryUrl,
            scope: this,
            method: 'POST',
            timeout: 1200000,
            params: storeQueryParams,
            failure: function(response) {
                var a = response.responseText;
                alert('导出失败，请重新导出');
            },
            success: function(response) {
                var storeXml = response.responseText;
                window.sendData(storeXml, title);
            }
        })
        window.close();
    }
    this.getSelectedColumns = function() {
        var selectedCoummns = {};
        selectedCoummns.Name = [];
        selectedCoummns.BoxLabel = [];
        selectedCoummns.Renderer = [];
        selectedCoummns.Width = [];
        for (var i = 0; i < this._items.length; ) {
            selectedCoummns.Name = selectedCoummns.Name.concat(this._items[i]._checkboxGroup.getSelecetedValueNameAndBoxLabel().Name);
            selectedCoummns.BoxLabel = selectedCoummns.BoxLabel.concat(this._items[i]._checkboxGroup.getSelecetedValueNameAndBoxLabel().BoxLabel);
            selectedCoummns.Renderer = selectedCoummns.Renderer.concat(this._items[i]._checkboxGroup.getSelecetedValueNameAndBoxLabel().Renderer);
            selectedCoummns.Width = selectedCoummns.Width.concat(this._items[i]._checkboxGroup.getSelecetedValueNameAndBoxLabel().Width);
            i++;
        }
        var selectedColumnsString = '<selectedCoummns>' + '<selectedCount>' + selectedCoummns.Name.length.toString() + '</selectedCount>';
        selectedColumnsString += '<selectedName>' + selectedCoummns.Name.toString() + '</selectedName>';
        selectedColumnsString += '<selectedBoxLabel>' + selectedCoummns.BoxLabel.toString() + '</selectedBoxLabel>';
        selectedColumnsString += '<selectedRenderer>' + selectedCoummns.Renderer.toString() + '</selectedRenderer>';
        selectedColumnsString += '<selectedWidth>' + selectedCoummns.Width.toString() + '</selectedWidth>' + '</selectedCoummns>';

        return selectedColumnsString;
    }
    this.selectAll = function() {
        for (var i = 0; i < this._items.length; i++)
            this._items[i]._checkboxGroup.setAllValueSelectedNameAndBoxLabel();
    }


    this.URLencode = function(sStr) {
        return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
    }
    this.sendData = function(storeXml, title) {
        var columnsString = this.getSelectedColumns();
        var date = new Date();
        //var fileName = title + date.toLocaleString();
        var fileName = title;
        Ext.Ajax.request({
            url: Srims.service.ExportService + '/SendData',
            method: 'POST',
            scope: this,
            params: {
                contentStoreXml: storeXml,
                selectColumns: columnsString,
                excelTitle: title
            },
            success: function(response) {
                Srims.Load._hideLoadingAnimation();
                var guid = response.responseText;
                document.location.href = Srims.service.ExportService + '/GetData?FileName=' + this.URLencode(fileName) + '.xls&guid=' + guid;
            }
        })
    }
}
Ext.extend(Srims.component.ExportWindow, Ext.Window);
