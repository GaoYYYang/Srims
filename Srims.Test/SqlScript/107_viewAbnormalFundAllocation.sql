IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewAbnormalFundAllocation]'))
DROP VIEW [dbo].[viewAbnormalFundAllocation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewAbnormalFundAllocation]
AS

SELECT 
	fa.ID AS FundAllocationID,
	p.Name AS '项目名称', 
	e.Name AS '项目负责人',
	f.Abstract AS '到账描述',
	f.VoucherNumber AS '财务凭单号',
	fd.Amount / 100 / 10000 AS '数额',
	f.ReceivedDate AS '到款时间',
	fd.DescendDateTime AS '下拨时间',
	SubmitState.DateTime AS '分配时间',
	PassState.DateTime AS '审核时间',
	PassState.Operator AS '审核人',
	fa.AllocationIn / 100 / 10000 AS '校内分配',
	fa.AllocationOut / 100 / 10000 AS '外协分配',
	fa.AllocationHardware / 100 / 10000 AS '硬件费',
	(fa.AllocationIn + fa.AllocationOut + fa.AllocationHardware - fd.Amount) / 100 / 10000 AS '差额'

FROM	
	FundAllocation AS fa

	LEFT JOIN FundDescend AS fd ON fa.FundDescendID = fd.ID
	LEFT JOIN FinanceFundDescend AS ffd ON fd.ID = ffd.FundDescendID
	LEFT JOIN Finance AS f ON ffd.FinanceID = f.ID

	LEFT JOIN ProjectInfo_Fund AS pif ON fd.ProjectInfo_FundID = pif.ID
	LEFT JOIN Project AS p ON pif.ID = p.FundID
	LEFT JOIN Expert AS e ON e.ID = p.PrincipalID

	LEFT JOIN FundAllocationStateHistory AS CurrentState ON CurrentState.FundAllocationID = fa.ID
	LEFT JOIN FundAllocationStateHistory AS SubmitState ON SubmitState.FundAllocationID = fa.ID AND SubmitState.State = 2
	LEFT JOIN FundAllocationStateHistory AS PassState ON PassState.FundAllocationID = fa.ID AND PassState.State = 4

WHERE 
	(fa.AllocationIn + fa.AllocationOut + fa.AllocationHardware <> fd.Amount 
		AND CurrentState.State = 4)
	OR (fa.AllocationIn + fa.AllocationOut + fa.AllocationHardware > fd.Amount)
GO