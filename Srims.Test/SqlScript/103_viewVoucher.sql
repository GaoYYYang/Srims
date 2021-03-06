IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewVoucher]'))
DROP VIEW [dbo].[viewVoucher]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewVoucher]
AS

SELECT 
	Voucher.ID AS ID,
	Voucher.FundAllocationID AS FundAllocationID,
	Voucher.VoucherNumber AS VoucherNumber,
	Voucher.AccountBookNumber AS AccountBookNumber,
	Voucher.AllocationIn AS AllocationIn,
	Voucher.AllocationOut AS AllocationOut,
	Voucher.AllocationHardware AS AllocationHardware,
	Voucher.OverheadExpensesIn AS OverheadExpensesIn,
	Voucher.OverheadExpensesOut AS OverheadExpensesOut,
	Voucher.IsRead AS IsReadValue,
	dbo.fnShowBoolean(Voucher.IsRead) AS IsRead,
	Voucher.FinanceNumber AS FinanceNumber,

	Expert.ID AS ExpertID,
	Expert.Name AS ExpertName,
	Expert.NameSpell AS ExpertNameSpell,
	Expert.Number AS ExpertNumber,
	Department.ID AS CollegeID,
	Department.Name AS College,

	VoucherState.ID AS CurrentStateID,
	VoucherState.State AS CurrentStateValue,
	dbo.fnShowVoucherState(VoucherState.State) AS CurrentState

FROM         
	Voucher As Voucher

	LEFT OUTER JOIN FundMember AS FundMember ON Voucher.FundMemberID = FundMember.ID
	LEFT OUTER JOIN Expert As Expert ON FundMember.ExpertID = Expert.ID 
	LEFT OUTER JOIN Department As Department ON Expert.CollegeID = Department.ID 
	
	LEFT OUTER JOIN VoucherStateHistory AS VoucherState ON Voucher.CurrentStateID = VoucherState.ID
GO