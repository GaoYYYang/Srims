IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnIsPaperIndexed]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnIsPaperIndexed]
GO

CREATE FUNCTION fnIsPaperIndexed 
(
	@PaperID int,
	@Indexed int
)
RETURNS bit
AS
BEGIN
	DECLARE @Result bit

	SELECT @Result = CAST(
			(
				SELECT COUNT(*) 
				FROM PaperIndexed AS PaperIndexed
				WHERE PaperIndexed.PaperID = @PaperID AND PaperIndexed.Indexed = @Indexed
			)
		AS bit)

	RETURN @Result
END
GO

