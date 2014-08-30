IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnGetPaperIndexedString]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnGetPaperIndexedString]
GO

CREATE FUNCTION fnGetPaperIndexedString
(
	@PaperID	int
)
RETURNS nvarchar(MAX)
AS
BEGIN
	DECLARE @Result nvarchar(MAX)
	SET @Result = ''
	
	SELECT		@Result = @Result + dbo.fnShowPaperIndexed(PaperIndexed.Indexed) + ' '
	FROM		PaperIndexed
	WHERE		PaperIndexed.PaperID = @PaperID AND PaperIndexed.Indexed IN (1, 4, 7)
	
	IF LEN(@Result) = 0 
		BEGIN
			SET @Result = NULL 
		END

	RETURN @Result
END
GO

