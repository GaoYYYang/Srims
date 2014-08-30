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
		WHEN 1 THEN '����'
		WHEN 2 THEN '������'
		WHEN 3 THEN '�μ�'
		WHEN 4 THEN '����'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

