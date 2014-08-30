IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewAvailableFundAllocation]'))
DROP VIEW [dbo].[viewAvailableFundAllocation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewAvailableFundAllocation]
AS

	SELECT 
		fa.*
	FROM 
		FundAllocation AS fa
		LEFT JOIN FundAllocationStateHistory AS fash ON fa.CurrentStateID = fash.ID
	WHERE
		fash.State = 4
GO