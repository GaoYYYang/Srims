IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewStatisticFundTotal]'))
DROP VIEW [dbo].[viewStatisticFundTotal]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewStatisticFundTotal]
AS
SELECT 
	ID AS ID,
	FundTotal AS Amount,
	
	dbo.fnDateToYearString(StartDate) AS StartDate_Year,
	dbo.fnDateToYearMonthString(StartDate) AS StartDate_YearMonth,
	dbo.fnDateToYearMonthDayString(StartDate) AS StartDate_YearMonthDay,

	dbo.fnShowExpertWithNumber(PrincipalName, PrincipalNumber) AS Principal_Expert,
	dbo.fnConvertNullToUnknown(PrincipalCollege) AS Principal_College,

	ProjectRankName AS ProjectType_Rank,
	dbo.fnConvertNullToUnknown(ProjectTypeName) AS ProjectType_Type,

	CurrentState AS ProjectState_State

FROM         
	viewProject AS Project
GO
