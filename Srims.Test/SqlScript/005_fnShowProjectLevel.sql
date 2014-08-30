IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowProjectLevel]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowProjectLevel]
GO

CREATE FUNCTION fnShowProjectLevel 
(
	@ProjectLevel int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @ProjectLevel
		WHEN 1 THEN '主持'
		WHEN 2 THEN '副主持'
		WHEN 3 THEN '参加'
		WHEN 4 THEN '附加'
		ELSE '未知'
	END

	RETURN @Result
END
GO

