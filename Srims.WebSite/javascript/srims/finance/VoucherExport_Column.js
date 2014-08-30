
if (!Srims.finance) 
    Ext.namespace("Srims.finance");

Srims.finance.VoucherExport_Column = function(){
}

Srims.finance.VoucherExport_Column.basic = [['VoucherNumber', '凭单号', , '150'], ['ExpertName', '专家', , '50'], ['ProjectName', '项目', , '150'], ['Amount', '总额', 'moneyRender', '60'],
 ['VoucherState', '状态', 'enum', '60'], ['FinanceAllocationDateTime', '财务分配日期', 'Date', '60'], ['FinanceNumber', '财务制单号', , '60'], ['AccountBookNumber', '账本号', , '80'], 
 ['AllocationHardware', '硬件费', 'moneyRender', '60'], ['AllocationIn', '校内分配', 'moneyRender', '60'], ['AllocationOut', '外协分配', 'moneyRender', '60'], ['OverheadExpensesIn', '校内分配管理费', 'moneyRender', '80'],
  ['OverheadExpensesOut', '外协分配管理费', 'moneyRender', '100'], ['OverheadExpenses', '管理费', 'moneyRender', '100'],
   ['IsRead', '已读', 'Boolean', '80']];
