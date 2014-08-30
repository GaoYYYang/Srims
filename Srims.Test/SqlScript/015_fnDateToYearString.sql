IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnDateToYearString]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnDateToYearString]
GO

CREATE FUNCTION fnDateToYearString
(
	@Input	datetime
)
RETURNS nvarchar(255)
AS
BEGIN

	RETURN CASE WHEN @Input IS NULL THEN 'δ֪' ELSE CONVERT(char(4), @Input, 112) END;

END
GO

