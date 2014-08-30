IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fnShowPaperType]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fnShowPaperType]
GO

CREATE FUNCTION fnShowPaperType 
(
	@PaperType int
)
RETURNS nvarchar(255)
AS
BEGIN
	DECLARE @Result nvarchar(255)

	SELECT @Result = CASE @PaperType		
		WHEN 1 THEN '����'
		WHEN 2 THEN '����'
		WHEN 3 THEN '�༭����'
		WHEN 4 THEN '����'
		WHEN 5 THEN '����ժҪ'
		WHEN 6 THEN '�ʼ�'
		WHEN 7 THEN '�ع�'
		ELSE 'δ֪'
	END

	RETURN @Result
END
GO

