IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowPatentType]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowPatentType]
GO

CREATE FUNCTION fnShowPatentType 
(
	@PatentType int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @PatentType		
		WHEN 1 THEN '发明专利'
		WHEN 2 THEN '实用新型'
		WHEN 3 THEN '外观设计'
		ELSE '未知'
	END

	RETURN @Result
END
GO

