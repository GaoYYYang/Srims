IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowBoolean]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowBoolean]
GO

CREATE FUNCTION fnShowBoolean 
(
	@Boolean bit
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @Boolean
		WHEN 0 THEN '·ñ'
		WHEN 1 THEN 'ÊÇ'
	END

	RETURN @Result
END
GO

