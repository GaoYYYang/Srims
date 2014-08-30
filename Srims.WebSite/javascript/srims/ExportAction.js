Srims.exportAction = function(){
}

Srims.exportAction.setExportQueryParams = function(filterParams, queryParams){
    var exportParams = {};
    Object.clone(exportParams, [filterParams, queryParams]);
    exportParams.limit = 10000;
    exportParams.token = null;
    return exportParams;
}
Srims.exportAction.showExportWindow = function(windowId, queryUrl, params, columns, excelTitle){
    var window = new Srims.component.ExportWindow(windowId, queryUrl, params, columns, excelTitle);
    window.show();
}


Srims.exportAction.exportToExcel = function(store, columns, excelTitle){

    var contentXML = Srims.exportAction.getExcelXml(columns, store, excelTitle);
    
    Ext.Ajax.request({
        url: Srims.service.ExportService + '/SendDataForStatisticExport',
        method: 'POST',
        params: {
            content: contentXML
        },
        success: function(response){
            var guid = response.responseText;
            document.location.href = Srims.service.ExportService + '/GetDataForStatisticExport?guid=' + guid;
        }
    })
}


//将要导出的数据拼成Excel格式的XML
//columns:选择导出的列
//exportStore:需要独处的数据
//excelTitle:导出的Excel的名称
Srims.exportAction.getExcelXml = function(columns, exportStore, excelTitle){
    var worksheet = Srims.exportAction.createWorksheet(columns, exportStore, excelTitle);
    
    var exportExcelXml = new Ext.ux.StringBuilder('<?xml version="1.0" encoding="utf-8"?>');
    
    exportExcelXml.append('<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">').append('<o:DocumentProperties><o:Title>').append(excelTitle).append('</o:Title></o:DocumentProperties>').append('<ss:ExcelWorkbook>').append('<ss:WindowHeight>').append(worksheet.height).append('</ss:WindowHeight>').append('<ss:WindowWidth>').append(worksheet.width).append('</ss:WindowWidth>').append('<ss:ProtectStructure>False</ss:ProtectStructure>').append('<ss:ProtectWindows>False</ss:ProtectWindows>').append('</ss:ExcelWorkbook>').append('<ss:Styles>').append('<ss:Style ss:ID="Default">').append('<ss:Alignment ss:Vertical="Top" ss:WrapText="1" />').append('<ss:Font ss:FontName="arial" ss:Size="10" />').append('<ss:Borders>').append('<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Top" />').append('<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Bottom" />').append('<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Left" />').append('<ss:Border ss:Color="#e4e4e4" ss:Weight="1" ss:LineStyle="Continuous" ss:Position="Right" />').append('</ss:Borders>').append('<ss:Interior />').append('<ss:NumberFormat />').append('<ss:Protection />').append('</ss:Style>').append('<ss:Style ss:ID="title">').append('<ss:Borders />').append('<ss:Font />').append('<ss:Alignment ss:WrapText="1" ss:Vertical="Center" ss:Horizontal="Center" />').append('<ss:NumberFormat ss:Format="@" />').append('</ss:Style>').append('<ss:Style ss:ID="headercell">').append('<ss:Font ss:Bold="1" ss:Size="10" />').append('<ss:Alignment ss:WrapText="1" ss:Horizontal="Center" />').append('<ss:Interior ss:Pattern="Solid" ss:Color="#A3C9F1" />').append('</ss:Style>').append('</ss:Styles>').append(worksheet.xml).append('</ss:Workbook>');
    
    return exportExcelXml.toString();
}

//拼WorkSheet部分的XML
Srims.exportAction.createWorksheet = function(columns, exportStore, title){
    // Calculate cell data types and extra class names which affect formatting
    var columnsArray = columns.Name;
    var columnLabelsArray = columns.BoxLabel;
    var columnRendererArray = columns.Renderer;
    
    var cellType = [];
    var collumnsCount = columnsArray.length;
    var totalWidth = 0;
    
    var columnXmlArray = new Array();
    var headerXmlArray = new Array();
    for (var i = 0; i < collumnsCount; i++) {
        var field = exportStore.recordType.prototype.fields.get(columnsArray[i]);
        var thisColumnWidth = field.width == null ? 100 : field.width;
        totalWidth += thisColumnWidth;
        
        columnXmlArray.push('<ss:Column ss:AutoFitWidth="1" ss:Width="');
        columnXmlArray.push(thisColumnWidth);
        columnXmlArray.push('" />');
        headerXmlArray.push('<ss:Cell ss:StyleID="headercell">');
        headerXmlArray.push('<ss:Data ss:Type="String">');
        headerXmlArray.push(columnLabelsArray[i]);
        headerXmlArray.push('</ss:Data>');
        headerXmlArray.push('<ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>');
    }
    var columnXml = columnXmlArray.join("");
    columnXmlArray = null;
    var headerXml = headerXmlArray.join("");
    headerXmlArray = null;
    var result = {
        height: 9000,
        width: Math.floor(totalWidth * 30) + 50
    };
    
    
    // Generate worksheet header details.
    var headerDetailXml = new Array();
    headerDetailXml.push('<ss:Worksheet ss:Name="' + title + '">');
    headerDetailXml.push('<ss:Names>');
    headerDetailXml.push('<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'');
    headerDetailXml.push(title);
    headerDetailXml.push('\'!R1:R2" />');
    headerDetailXml.push('</ss:Names>');
    headerDetailXml.push('<ss:Table x:FullRows="1" x:FullColumns="1"');
    headerDetailXml.push(' ss:ExpandedColumnCount="');
    headerDetailXml.push(collumnsCount + 2);
    headerDetailXml.push('" ss:ExpandedRowCount="');
    headerDetailXml.push(exportStore.getCount() + 1);
    headerDetailXml.push('">');
    headerDetailXml.push(columnXml);
    headerDetailXml.push('<ss:Row ss:AutoFitHeight="1">');
    headerDetailXml.push(headerXml);
    headerDetailXml.push('</ss:Row>');
    
    // Generate the data rows from the data in the Store
    var rowsDataXml = new Array();
    for (var i = 0; i < exportStore.data.items.length; i++) {
    
        var cellDataXml = new Array();
        
        for (var j = 0; j < collumnsCount; j++) {
            var renderer = columnRendererArray[j];
            
            if (renderer == '' || renderer == null || renderer == undefined) 
                var cellData = exportStore.data.items[i].data[columnsArray[j]];
            else 
                var cellData = renderer(exportStore.data.items[i].data[columnsArray[j]]);
            
            cellDataXml[j] = '<ss:Cell ss:StyleID="Default"><ss:Data ss:Type="' + 'String' + '">' + '<![CDATA[' + cellData + ']]>' + '</ss:Data></ss:Cell>';
        }
        
        rowsDataXml[i] = '<ss:Row>' + cellDataXml.join('') + '</ss:Row>';
    }
    headerDetailXml.push(rowsDataXml.join(''));
    var headerDetail = new Ext.ux.StringBuilder(headerDetailXml.join(''));
    result.xml = headerDetail.append('</ss:Table>').append('<x:WorksheetOptions>').append('<x:PageSetup>').append('<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />').append('<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />').append('<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />').append('</x:PageSetup>').append('<x:FitToPage />').append('<x:Print>').append('<x:PrintErrors>Blank</x:PrintErrors>').append('<x:FitWidth>1</x:FitWidth>').append('<x:FitHeight>32767</x:FitHeight>').append('<x:ValidPrinterInfo />').append('<x:VerticalResolution>600</x:VerticalResolution>').append('</x:Print>').append('<x:Selected />').append('<x:DoNotDisplayGridlines />').append('<x:ProtectObjects>False</x:ProtectObjects>').append('<x:ProtectScenarios>False</x:ProtectScenarios>').append('</x:WorksheetOptions>').append('</ss:Worksheet>');
    return result;
};



