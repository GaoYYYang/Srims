IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnGetFinanceDateTime]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnGetFinanceDateTime]
GO

CREATE FUNCTION fnGetFinanceDateTime
(
	@FundDescendID	int
)
RETURNS datetime
AS
BEGIN
	RETURN (
		SELECT
			TOP 1 f.ReceivedDate
		FROM
			FundDescend AS fd 
			LEFT JOIN FinanceFundDescend AS ffd ON fd.ID = ffd.FundDescendID
			LEFT JOIN Finance AS f ON f.ID = ffd.FinanceID
		WHERE
			fd.ID = @FundDescendID
		ORDER BY
			fd.ID ASC
	)
END
GO


IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewStatisticVoucher]'))
DROP VIEW [dbo].[viewStatisticVoucher]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewStatisticVoucher]
AS

SELECT 
	Voucher.ID AS ID,
	Voucher.AllocationIn AS Amount,
	
	dbo.fnDateToYearString(FundAllocationCensorPassState.DateTime) AS DateTime_Year,
	dbo.fnDateToYearMonthString(FundAllocationCensorPassState.DateTime) AS DateTime_YearMonth,
	dbo.fnDateToYearMonthDayString(FundAllocationCensorPassState.DateTime) AS DateTime_YearMonthDay,

	dbo.fnDateToYearString(dbo.fnGetFinanceDateTime(FundAllocation.ID)) AS FinanceDateTime_Year,
	dbo.fnDateToYearMonthString(dbo.fnGetFinanceDateTime(FundAllocation.ID)) AS FinanceDateTime_YearMonth,
	dbo.fnDateToYearMonthDayString(dbo.fnGetFinanceDateTime(FundAllocation.ID)) AS FinanceDateTime_YearMonthDay,
	
	dbo.fnDateToYearString(Project.StartDate) AS StartDate_Year,
	dbo.fnDateToYearMonthString(Project.StartDate) AS StartDate_YearMonth,
	dbo.fnDateToYearMonthDayString(Project.StartDate) AS StartDate_YearMonthDay,

	dbo.fnShowExpertWithNumber(Voucher.ExpertName, Voucher.ExpertNumber) AS Expert_Expert,
	dbo.fnConvertNullToUnknown(Voucher.College) AS Expert_College,

	Project.ProjectRankName AS ProjectType_Rank,
	dbo.fnConvertNullToUnknown(Project.ProjectTypeName) AS ProjectType_Type

FROM         
	viewVoucher AS Voucher 

	LEFT JOIN viewFundAllocation As FundAllocation ON Voucher.FundAllocationID = FundAllocation.ID
	LEFT JOIN FundAllocationStateHistory As FundAllocationCensorPassState ON FundAllocationCensorPassState.State = 4 AND FundAllocationCensorPassState.FundAllocationID = FundAllocation.ID
	
	LEFT JOIN viewProject As Project ON FundAllocation.ProjectInfo_FundID= Project.FundID

GO
