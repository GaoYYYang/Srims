IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowPaperIndexed]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowPaperIndexed]
GO

CREATE FUNCTION fnShowPaperIndexed 
(
	@PaperIndexed int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @PaperIndexed		
		WHEN 1 THEN 'SCI'
		WHEN 2 THEN 'SCI����'
		WHEN 3 THEN 'SCI����'
		WHEN 4 THEN 'EI'
		WHEN 5 THEN 'EI����'
		WHEN 6 THEN 'EI����'
		WHEN 7 THEN 'ISTP'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

