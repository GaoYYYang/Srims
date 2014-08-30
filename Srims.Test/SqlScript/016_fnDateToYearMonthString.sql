IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnDateToYearMonthString]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnDateToYearMonthString]
GO

CREATE FUNCTION fnDateToYearMonthString
(
	@Input	datetime
)
RETURNS nvarchar(255)
AS
BEGIN

	RETURN CASE WHEN @Input IS NULL THEN 'δ֪' ELSE CONVERT(char(6), @Input, 112) END;

END
GO

