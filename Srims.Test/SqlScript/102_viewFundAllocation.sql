IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewFundAllocation]'))
DROP VIEW [dbo].[viewFundAllocation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewFundAllocation]
AS

SELECT 
	FundAllocation.ID AS ID,
	FundAllocation.AllocationIn AS AllocationIn,
	FundAllocation.AllocationOut AS AllocationOut,
	FundAllocation.AllocationHardware AS AllocationHardware,
	FundAllocation.OverheadExpensesIn AS OverheadExpensesIn,
	FundAllocation.OverheadExpensesOut AS OverheadExpensesOut,

	FundDescend.ID AS FundDescendID,
	FundDescend.ProjectInfo_FundID AS ProjectInfo_FundID,
	FundDescend.DescendDateTime AS DescendDateTime,
	FundDescend.Amount AS Amount,
	FundDescend.Operator AS DescendOperator,

	FundDescendState.ID AS FundDescendStateID,
	FundDescendState.State AS FundDescendStateValue,
	dbo.fnShowFundDescendState(FundDescendState.State) AS FundDescendState,

	FundAllocationState.ID AS FundAllocationStateID,
	FundAllocationState.State AS FundAllocationStateValue,
	dbo.fnShowFundAllocationState(FundAllocationState.State) AS FundAllocationState

FROM         
	FundAllocation AS FundAllocation

	LEFT OUTER JOIN FundDescend As FundDescend ON FundAllocation.FundDescendID = FundDescend.ID 
	LEFT OUTER JOIN FundDescendStateHistory As FundDescendState ON FundDescend.CurrentStateID = FundDescendState.ID 
	LEFT OUTER JOIN FundAllocationStateHistory As FundAllocationState ON FundAllocation.CurrentStateID = FundAllocationState.ID 
GO