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
		WHEN 1 THEN '��У'
		WHEN 2 THEN '�ⵥλ'
		WHEN 3 THEN '��У+�ⵥλ'
		WHEN 4 THEN '�ⵥλ+��У'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

