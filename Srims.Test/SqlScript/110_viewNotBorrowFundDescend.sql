IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewNotBorrowFundDescend]'))
DROP VIEW [dbo].[viewNotBorrowFundDescend]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewNotBorrowFundDescend]
AS

	SELECT 
		fd.*
	FROM 
		viewAvailableFundDescend AS fd
	WHERE
		(EXISTS 
			(
				SELECT * 
				FROM FinanceFundDescend 
				WHERE FinanceFundDescend.FundDescendID = fd.ID
					AND FinanceFundDescend.IsReturn = 0
			)
		) 
GO