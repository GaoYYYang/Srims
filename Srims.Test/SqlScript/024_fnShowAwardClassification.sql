IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowAwardClassification]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowAwardClassification]
GO

CREATE FUNCTION [fnShowAwardClassification](@Classification nvarchar(MAX)) 
	RETURNS nvarchar(MAX)
AS
	BEGIN
		RETURN CASE 
			WHEN @Classification IS NULL THEN '不分奖种'
			WHEN LEN(@Classification) = 0 THEN '不分奖种'
			ELSE @Classification
		END
	END
GO
