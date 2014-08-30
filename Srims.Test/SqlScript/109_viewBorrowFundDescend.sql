IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewBorrowFundDescend]'))
DROP VIEW [dbo].[viewBorrowFundDescend]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewBorrowFundDescend]
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
					AND FinanceFundDescend.IsReturn = 1
			)
		) 
		OR 
		(
			fd.Amount > fd.ReceivedAmount
		)
GO