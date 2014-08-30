IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewNotBorrowFundAllocation]'))
DROP VIEW [dbo].[viewNotBorrowFundAllocation]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewNotBorrowFundAllocation]
AS

	SELECT 
		fa.*
	FROM 
		viewAvailableFundAllocation AS fa
	WHERE
		EXISTS (
			SELECT * 
			FROM viewNotBorrowFundDescend AS fd
			WHERE fa.FundDescendID = fd.ID
		)
GO