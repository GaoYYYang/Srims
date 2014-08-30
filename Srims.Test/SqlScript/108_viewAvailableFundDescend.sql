IF  EXISTS (SELECT * FROM sys.views WHERE object_id = OBJECT_ID(N'[dbo].[viewAvailableFundDescend]'))
DROP VIEW [dbo].[viewAvailableFundDescend]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[viewAvailableFundDescend]
AS

	SELECT 
		fd.*
	FROM 
		FundDescend AS fd
		LEFT JOIN FundDescendStateHistory AS fdsh ON fd.CurrentStateID = fdsh.ID
	WHERE
		fdsh.State IN (4, 5)
GO