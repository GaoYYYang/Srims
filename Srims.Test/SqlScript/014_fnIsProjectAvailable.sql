IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnIsProjectAvailable]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnIsProjectAvailable]
GO

CREATE FUNCTION fnIsProjectAvailable 
(
	@ProjectState int
)
RETURNS bit
AS
BEGIN
	DECLARE @Result bit

	SELECT @Result = (CASE @ProjectState
		WHEN 4 THEN 1
		WHEN 5 THEN 1
		WHEN 6 THEN 1
		ELSE 0
	END)


	RETURN @Result
END
GO

