IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowPatentLevel]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowPatentLevel]
GO

CREATE FUNCTION fnShowPatentLevel 
(
	@PatentLevel int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @PatentLevel		
		WHEN 1 THEN '第一责任单位'
		WHEN 2 THEN '参加'
		ELSE '未知'
	END

	RETURN @Result
END
GO

