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
		WHEN 1 THEN '����ר��'
		WHEN 2 THEN 'ʵ������'
		WHEN 3 THEN '������'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

