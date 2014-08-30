if exists (select * from dbo.sysobjects where id = object_id(N'[dbo].[spUpdateStatistic]') and OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure [dbo].[spUpdateStatistic]
GO

CREATE PROCEDURE [spUpdateStatistic]
AS

-- Update Table Voucher
UPDATE 
	Voucher
SET
	Voucher.AllocationOut = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(Amount) 
		FROM	VoucherOut 
		WHERE	VoucherOut.VoucherID = Voucher.ID))
;

-- Update FundAllocation
UPDATE 
	FundAllocation
SET
	FundAllocation.AllocationIn = dbo.fnConvertNullNumberToZero((
		SELECT SUM(AllocationIn) 
		FROM Voucher 
		WHERE Voucher.FundAllocationID = FundAllocation.ID)),		
	FundAllocation.AllocationOut = dbo.fnConvertNullNumberToZero((
		SELECT SUM(AllocationOut) 
		FROM Voucher 
		WHERE Voucher.FundAllocationID = FundAllocation.ID)),		
	FundAllocation.AllocationHardware = dbo.fnConvertNullNumberToZero((
		SELECT SUM(AllocationHardware) 
		FROM Voucher 
		WHERE Voucher.FundAllocationID = FundAllocation.ID)),
	FundAllocation.OverheadExpensesIn = dbo.fnConvertNullNumberToZero((
		SELECT SUM(OverheadExpensesIn) 
		FROM Voucher 
		WHERE Voucher.FundAllocationID = FundAllocation.ID)),		
	FundAllocation.OverheadExpensesOut = dbo.fnConvertNullNumberToZero((
		SELECT SUM(OverheadExpensesOut) 
		FROM Voucher 
		WHERE Voucher.FundAllocationID = FundAllocation.ID))
;
	
--Update Finance
UPDATE 
	Finance
SET
	Finance.DescendAmount = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(Amount) 
		FROM	FinanceFundDescend 
		WHERE	FinanceFundDescend.FinanceID = Finance.ID))
;

--Update FundDescend
UPDATE 
	FundDescend
SET
	FundDescend.ReceivedAmount = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(Amount) 
		FROM	FinanceFundDescend 
		WHERE	FinanceFundDescend.FundDescendID = FundDescend.ID))
;

--Update ProjectInfo_Fund 
WITH cteFundAllocation(AllocationIn, AllocationOut, AllocationHardware, OverheadExpensesIn, OverheadExpensesOut, ProjectInfo_FundID) AS 
(
	SELECT 
		fa.AllocationIn,
		fa.AllocationOut,
		fa.AllocationHardware,
		fa.OverheadExpensesIn,
		fa.OverheadExpensesOut,
		fd.ProjectInfo_FundID
	FROM
		viewNotBorrowFundAllocation AS fa
		LEFT JOIN FundDescend AS fd ON fa.FundDescendID = fd.ID
)
UPDATE 
	ProjectInfo_Fund
SET
	ProjectInfo_Fund.FundReceived = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(fd.Amount) 
		FROM	viewNotBorrowFundDescend AS fd
		WHERE	fd.ProjectInfo_FundID = ProjectInfo_Fund.ID 
	)),
	ProjectInfo_Fund.BorrowAmount = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(fd.Amount) 
		FROM	viewBorrowFundDescend AS fd
		WHERE	fd.ProjectInfo_FundID = ProjectInfo_Fund.ID 
	)),
	ProjectInfo_Fund.ReturnAmount = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(fd.ReceivedAmount) 
		FROM	viewBorrowFundDescend AS fd
		WHERE	fd.ProjectInfo_FundID = ProjectInfo_Fund.ID 
	)),
	ProjectInfo_Fund.FundAlreadyIn = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(fa.AllocationIn) 
		FROM	cteFundAllocation AS fa
		WHERE	fa.ProjectInfo_FundID = ProjectInfo_Fund.ID 
	)),
	ProjectInfo_Fund.FundAlreadyOut = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(fa.AllocationOut) 
		FROM	cteFundAllocation AS fa
		WHERE	fa.ProjectInfo_FundID = ProjectInfo_Fund.ID 
	)),
	ProjectInfo_Fund.FundAlreadyHardware = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(fa.AllocationHardware) 
		FROM	cteFundAllocation AS fa
		WHERE	fa.ProjectInfo_FundID = ProjectInfo_Fund.ID 
	)),
	ProjectInfo_Fund.OverheadExpensesAlreadyIn = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(fa.OverheadExpensesIn) 
		FROM	cteFundAllocation AS fa
		WHERE	fa.ProjectInfo_FundID = ProjectInfo_Fund.ID 
	)),
	ProjectInfo_Fund.OverheadExpensesAlreadyOut = dbo.fnConvertNullNumberToZero((
		SELECT	SUM(fa.OverheadExpensesOut) 
		FROM	cteFundAllocation AS fa
		WHERE	fa.ProjectInfo_FundID = ProjectInfo_Fund.ID 
	))
