IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnGetPaperSubArier]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnGetPaperSubArier]
GO

CREATE FUNCTION fnGetPaperSubArier
(
	@SubArier			int,
	@PaperMagazineID	int
)
RETURNS int
AS
BEGIN
	
	RETURN
		(
			CASE
				WHEN @SubArier IS NOT NULL THEN
					@SubArier
				ELSE
					(
						SELECT	SubAirer 
						FROM	MagazineInformation
						WHERE	MagazineInformation.MagazineID = @PaperMagazineID AND MagazineInformation.[Year] = 2007
					)
			END
		)
END
GO

