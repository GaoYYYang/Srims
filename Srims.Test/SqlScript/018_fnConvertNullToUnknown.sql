IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnConvertNullToUnknown]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnConvertNullToUnknown]
GO

CREATE FUNCTION fnConvertNullToUnknown
(
	@Input	nvarchar(MAX)
)
RETURNS nvarchar(MAX)
AS
BEGIN

	RETURN CASE 
		WHEN @Input IS NULL THEN '��δ֪��'
		WHEN LEN(@Input) = 0 THEN '��δ֪��'
		ELSE @Input
	END

END
GO

