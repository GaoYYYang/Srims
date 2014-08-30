IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowSignUnit]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowSignUnit]
GO

CREATE FUNCTION fnShowSignUnit 
(
	@SignUnit int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @SignUnit		
		WHEN 1 THEN '本校'
		WHEN 2 THEN '外单位'
		WHEN 3 THEN '我校+外单位'
		WHEN 4 THEN '外单位+我校'
		ELSE '未知'
	END

	RETURN @Result
END
GO

