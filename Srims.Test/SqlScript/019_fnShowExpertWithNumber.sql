IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowExpertWithNumber]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowExpertWithNumber]
GO

CREATE FUNCTION fnShowExpertWithNumber
(
	@Name	nvarchar(MAX),
	@Number	nvarchar(MAX)
)
RETURNS nvarchar(MAX)
AS
BEGIN
	
	DECLARE @Result nvarchar(MAX)

	SET @Result = @Name

	IF(@Number IS NOT NULL)
		SET @Result = @Result + '(' + @Number + ')'

	RETURN dbo.fnConvertNullToUnknown(@Result)

END
GO

